import { supabase, isSupabaseConfigured } from "./supabaseClient";

/**
 * Tra cứu cấu hình phần thưởng Xu/XP.
 *
 * Thiết kế:
 *  - Đọc ĐỒNG BỘ từ cache localStorage -> dùng được ngay trong event handler.
 *  - Làm mới BẤT ĐỒNG BỘ từ DB ở nền.
 *  - File này CỐ Ý không import store nào, để tránh vòng import.
 */

const CACHE_KEY = "toan-vui-reward-configs";
const MULTIPLIER_KEY = "toan-vui-reward-multiplier";
const CURVE_KEY = "toan-vui-level-curve";

/** Công thức lên cấp mặc định — ĐÚNG BẰNG hardcode cũ trong useUserStore. */
const DEFAULT_LEVEL_CURVE = { base: 100, growth: 1.3 };

/**
 * Giá trị mặc định — ĐÂY LÀ LƯỚI AN TOÀN, không phải giá gốc lịch sử.
 * Offline, chưa đăng nhập, hoặc DB lỗi đều rơi về đây, nên nó PHẢI khớp giá
 * đang chạy thật trên DB — nếu không, bé chơi lúc mất mạng sẽ nhận sai số Xu.
 *
 * Giá trị dưới đây = seed 0002 + điều chỉnh ở 0003 (chốt 2026-09-20).
 * Test `S-11` giữ cho file này không lệch migration.
 */
export const REWARD_DEFAULTS = {
  "lesson.complete": { coins: 20, xp: 50 },
  "lesson.relearn": { coins: 5, xp: 10 },
  "lesson.quiz_correct": { coins: 10, xp: 0 },

  // 0003: hạ cả 3 mốc luyện tập về 2/5 để bài học vẫn là nguồn chính
  "practice.correct": { coins: 2, xp: 5 },
  "practice.streak_correct": { coins: 2, xp: 5 },
  "practice.mistake_review": { coins: 2, xp: 5 },

  "challenge.task_1": { coins: 10, xp: 30 },
  "challenge.task_2": { coins: 15, xp: 30 },
  "challenge.task_3": { coins: 25, xp: 30 },
  // coinsMax: phần thưởng ngẫu nhiên trong [coins, coinsMax]
  "challenge.chest": { coins: 20, coinsMax: 49, xp: 50 },

  "quest.daily_lesson": { coins: 15, xp: 30 },
  "quest.daily_game": { coins: 10, xp: 20 },
  "quest.daily_pet": { coins: 10, xp: 20 },
  "quest.daily_claim": { coins: 50, xp: 60 },

  "mascot.mini_quiz": { coins: 5, xp: 0 },

  // 4 bậc dùng chung cho cả 6 mini game — 0003 hạ xuống thang 5/10/15/20
  "game.tier_gold": { coins: 20, xp: 50 },
  "game.tier_silver": { coins: 15, xp: 30 },
  "game.tier_bronze": { coins: 10, xp: 20 },
  "game.tier_participation": { coins: 5, xp: 10 },

  "story.story_picnic": { coins: 40, xp: 80 },
  "story.story_ocean": { coins: 45, xp: 90 },
  "story.story_space": { coins: 50, xp: 100 },
  "story.story_bakery": { coins: 50, xp: 100 },
  "story.story_detective": { coins: 60, xp: 120 },
  "story.story_kingdom": { coins: 65, xp: 130 },
  "story.story_fraction_island": { coins: 70, xp: 140 },
  "story.story_time_travel": { coins: 80, xp: 160 },
};

/** Nguồn sự thật trong bộ nhớ: key -> { coins, coinsMax, xp, enabled } */
let table = new Map();
let multiplier = 1;
let levelCurve = { ...DEFAULT_LEVEL_CURVE };

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      for (const row of JSON.parse(raw)) {
        table.set(row.key, {
          coins: row.coins,
          coinsMax: row.coins_max ?? null,
          xp: row.xp,
          enabled: row.enabled !== false,
        });
      }
    }
    const m = Number(localStorage.getItem(MULTIPLIER_KEY));
    if (Number.isFinite(m) && m > 0) multiplier = m;

    const c = JSON.parse(localStorage.getItem(CURVE_KEY) || "null");
    if (c && Number.isFinite(c.base) && Number.isFinite(c.growth))
      levelCurve = c;
  } catch {
    // Cache hỏng -> dùng REWARD_DEFAULTS, không cần làm gì thêm
  }
}

// Nạp cache ngay khi module được import -> getReward dùng được ở lần gọi đầu tiên
readCache();

function writeCache(rows, mult, curve) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rows));
    localStorage.setItem(MULTIPLIER_KEY, String(mult));
    localStorage.setItem(CURVE_KEY, JSON.stringify(curve));
  } catch {
    // Hết dung lượng localStorage -> bỏ qua, không ảnh hưởng tính đúng đắn
  }
}

/** Bóc giá trị thật ra khỏi JSONB của app_config (có thể là số trần hoặc {value: n}) */
function unwrapJsonb(raw) {
  if (raw == null) return null;
  const v = typeof raw === "object" && "value" in raw ? raw.value : raw;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

let loadPromise = null;
let lastLoadedAt = 0;

// Chặn spam API khi người dùng bật/tắt tab liên tục.
// Để ngắn (5s) vì Admin sửa giá thưởng xong thường quay lại app ngay —
// throttle 60s trước đây khiến app vẫn dùng giá cũ trong gần 1 phút.
const MIN_REFRESH_MS = 5_000;

/**
 * Làm mới cấu hình từ DB nếu cache đã cũ.
 *
 * VÌ SAO CẦN: `preloadRewardConfigs()` chỉ chạy 1 lần khi tải trang. Trong
 * một phiên SPA dài (hoặc app Capacitor mở nhiều ngày), người dùng sẽ mãi
 * dùng giá trị cũ dù Admin đã đổi.
 *
 * Gọi khi người dùng quay lại tab/app. Có chặn tối thiểu 60 giây để không
 * gọi API mỗi lần bật tab.
 */
export function refreshRewardConfigs({ force = false } = {}) {
  if (!force && Date.now() - lastLoadedAt < MIN_REFRESH_MS) {
    return Promise.resolve(false);
  }
  if (!isSupabaseConfigured() || !supabase) return Promise.resolve(false);
  // Xoá promise cũ để preloadRewardConfigs thực sự chạy lại
  loadPromise = null;
  return preloadRewardConfigs();
}

/**
 * Làm mới cấu hình từ DB. Gọi 1 lần khi app khởi động.
 * An toàn khi gọi nhiều lần — chỉ thực sự chạy 1 request.
 */
export function preloadRewardConfigs() {
  if (loadPromise) return loadPromise;
  if (!isSupabaseConfigured() || !supabase) return Promise.resolve(false);

  loadPromise = (async () => {
    try {
      const [{ data: rows, error: rowsErr }, { data: cfg, error: cfgErr }] =
        await Promise.all([
          supabase
            .from("reward_configs")
            .select("key, coins, coins_max, xp, enabled"),
          supabase
            .from("app_config")
            .select("key, value")
            .in("key", ["reward_multiplier", "level_curve"]),
        ]);

      if (rowsErr || !Array.isArray(rows)) {
        loadPromise = null;
        return false;
      }

      table = new Map(
        rows.map((row) => [
          row.key,
          {
            coins: row.coins,
            coinsMax: row.coins_max ?? null,
            xp: row.xp,
            enabled: row.enabled !== false,
          },
        ]),
      );

      let mult = 1;
      let curve = { ...DEFAULT_LEVEL_CURVE };

      if (!cfgErr && Array.isArray(cfg)) {
        const byKey = Object.fromEntries(cfg.map((r) => [r.key, r.value]));

        const m = unwrapJsonb(byKey.reward_multiplier);
        if (m && m > 0) mult = m;

        const c = byKey.level_curve;
        if (c && typeof c === "object") {
          const base = Number(c.base);
          const growth = Number(c.growth);
          if (
            Number.isFinite(base) &&
            base > 0 &&
            Number.isFinite(growth) &&
            growth > 1
          ) {
            curve = { base, growth };
          }
        }
      }

      multiplier = mult;
      levelCurve = curve;

      writeCache(rows, mult, curve);
      lastLoadedAt = Date.now();
      return true;
    } catch {
      // Mất mạng -> giữ nguyên cache cũ
      loadPromise = null;
      return false;
    }
  })();

  return loadPromise;
}

/**
 * Tra cứu phần thưởng. ĐỒNG BỘ.
 * Thứ tự ưu tiên: DB/cache -> REWARD_DEFAULTS.
 * Trả về { coins, xp } đã áp hệ số nhân toàn cục.
 */
export function getReward(key) {
  const row = table.get(key) || REWARD_DEFAULTS[key];
  if (!row || row.enabled === false) return { coins: 0, xp: 0 };

  const rawCoins =
    row.coinsMax != null ? randInt(row.coins, row.coinsMax) : row.coins;

  return {
    coins: Math.round((rawCoins || 0) * multiplier),
    xp: Math.round((row.xp || 0) * multiplier),
  };
}

/** Hệ số nhân hiện hành — dùng để hiển thị "sự kiện X2" trên UI nếu cần. */
export const getRewardMultiplier = () => multiplier;

/** Công thức lên cấp hiện hành: { base, growth } */
export const getLevelCurve = () => levelCurve;
