#!/usr/bin/env node
/**
 * Automation test cho Admin Portal — Toán Vui
 *
 * CHẠY:
 *   node scripts/test-admin-portal.mjs            # tất cả những gì tự động được
 *   node scripts/test-admin-portal.mjs --static   # chỉ kiểm tra source, không cần mạng
 *   node scripts/test-admin-portal.mjs --db       # chỉ kiểm tra database
 *   node scripts/test-admin-portal.mjs --verbose  # in chi tiết cả test PASS
 *
 * KHÔNG CẦN THƯ VIỆN NÀO. Dùng fetch có sẵn của Node 18+.
 *
 * PHẠM VI: script này kiểm tra tầng DỮ LIỆU và tính toàn vẹn của source code.
 * Những thứ cần trình duyệt (bấm nút, chơi game, đăng nhập Google) KHÔNG thể
 * tự động hoá — xem danh sách "CẦN TEST TAY" ở cuối. Lý do: Google chặn
 * đăng nhập từ trình duyệt điều khiển tự động.
 *
 * Mã test (TC-x.y) khớp với docs/admin_portal_test_cases.md
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const ONLY_STATIC = args.includes("--static");
const ONLY_DB = args.includes("--db");

// ─────────────────────────── Khung chạy test ───────────────────────────

const results = [];

async function test(id, name, fn) {
  try {
    const outcome = await fn();
    if (outcome?.manual) {
      results.push({ id, name, status: "MANUAL", detail: outcome.detail });
    } else if (outcome?.skip) {
      results.push({ id, name, status: "SKIP", detail: outcome.detail });
    } else {
      results.push({ id, name, status: "PASS", detail: outcome?.detail });
    }
  } catch (e) {
    results.push({ id, name, status: "FAIL", detail: e.message });
  }
}

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

// ─────────────────────────── Đọc source ───────────────────────────

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

function walk(dir, exts) {
  const out = [];
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return out;
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue;
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel, exts));
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(rel);
  }
  return out;
}

const CLIENT_SRC = walk("client/src", [".js", ".jsx"]);
const ADMIN_SRC = walk("admin/src", [".js", ".jsx"]);

/**
 * Các migration điều chỉnh giá thưởng, áp SAU file seed 0002.
 * `parseSeedValues()` chạy lần lượt các file này lên trên seed để ra trạng thái
 * cuối mà một project Supabase mới sẽ có. Thêm file mới ở đây khi tạo migration.
 */
const MIGRATION_OVERRIDES = ["supabase/migrations/0003_tune_rewards.sql"];

/** Bóc bảng REWARD_DEFAULTS ra khỏi rewardService.js (không cần Vite). */
function parseRewardDefaults() {
  const src = read("client/src/services/rewardService.js");
  const start = src.indexOf("export const REWARD_DEFAULTS");
  assert(start >= 0, "Không tìm thấy REWARD_DEFAULTS trong rewardService.js");
  const end = src.indexOf("\n}", start);
  const block = src.slice(start, end);

  const re =
    /['"]([\w.]+)['"]\s*:\s*\{\s*coins:\s*(\d+)\s*(?:,\s*coinsMax:\s*(\d+)\s*)?,\s*xp:\s*(\d+)\s*\}/g;
  const out = {};
  let m;
  while ((m = re.exec(block))) {
    out[m[1]] = {
      coins: Number(m[2]),
      coinsMax: m[3] ? Number(m[3]) : null,
      xp: Number(m[4]),
    };
  }
  assert(
    Object.keys(out).length > 0,
    "Bóc được 0 khoá từ REWARD_DEFAULTS — regex lệch",
  );
  return out;
}

/** Bóc danh sách khoá trong phần INSERT của migration seed. */
function parseSeedKeys() {
  const sql = read("supabase/migrations/0002_reward_economy.sql");
  const start = sql.indexOf("INSERT INTO public.reward_configs");
  assert(start >= 0, "Không tìm thấy INSERT seed trong 0002");
  const block = sql.slice(start);
  const re = /\(\s*'([\w.]+)'\s*,\s*'/g;
  const keys = [];
  let m;
  while ((m = re.exec(block))) keys.push(m[1]);
  assert(keys.length > 0, "Bóc được 0 khoá từ seed SQL — regex lệch");
  return keys;
}

/**
 * Bóc cả GIÁ TRỊ trong phần INSERT của migration seed.
 *
 * Vì sao cần: sau khi Admin chỉnh giá, DB **khác** code là ĐÚNG. Nên việc
 * "seed có khớp code không" phải kiểm tra trên **file SQL**, không phải trên
 * dữ liệu đang chạy.
 */
function parseSeedValues() {
  const sql = read("supabase/migrations/0002_reward_economy.sql");
  const start = sql.indexOf("INSERT INTO public.reward_configs");
  assert(start >= 0, "Không tìm thấy INSERT seed trong 0002");
  const block = sql.slice(start);
  const re =
    /\(\s*'([\w.]+)'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*,\s*(\d+)\s*,\s*(NULL|\d+)\s*,\s*(\d+)\s*\)/g;
  const out = {};
  let m;
  while ((m = re.exec(block))) {
    out[m[1]] = {
      coins: Number(m[2]),
      coinsMax: m[3] === "NULL" ? null : Number(m[3]),
      xp: Number(m[4]),
    };
  }
  assert(
    Object.keys(out).length > 0,
    "Bóc được 0 GIÁ TRỊ từ seed SQL — regex lệch",
  );

  // Áp thêm các migration điều chỉnh (0003, 0004…) lên trên seed, để ra
  // TRẠNG THÁI CUỐI mà một project Supabase mới sẽ có sau khi chạy hết.
  // Không có bước này thì sửa giá bằng migration mới sẽ làm S-11 báo sai.
  for (const file of MIGRATION_OVERRIDES) {
    if (!exists(file)) continue;
    const src = read(file);
    const upd =
      /UPDATE\s+public\.reward_configs\s+SET\s+([^;]+?)\s+WHERE\s+key\s*=\s*'([\w.]+)'/gi;
    let u;
    while ((u = upd.exec(src))) {
      const key = u[2];
      if (!out[key]) continue;
      for (const pair of u[1].split(",")) {
        const a = pair.match(/^\s*(\w+)\s*=\s*(NULL|\d+)\s*$/);
        if (!a) continue;
        const val = a[2] === "NULL" ? null : Number(a[2]);
        if (a[1] === "coins") out[key].coins = val;
        else if (a[1] === "xp") out[key].xp = val;
        else if (a[1] === "coins_max") out[key].coinsMax = val;
      }
    }
  }

  return out;
}

// ─────────────────────────── Gọi REST ───────────────────────────

function loadEnv() {
  for (const f of ["admin/.env.local", "client/.env.local"]) {
    if (!exists(f)) continue;
    const env = {};
    for (const line of read(f).split(/\r?\n/)) {
      const m = line.match(/^\s*(VITE_[A-Z_]+)\s*=\s*(.+?)\s*$/);
      if (m) env[m[1]] = m[2];
    }
    if (
      env.VITE_SUPABASE_URL?.startsWith("https://") &&
      env.VITE_SUPABASE_ANON_KEY?.length > 20
    ) {
      return env;
    }
  }
  return null;
}

const ENV = loadEnv();
const SUPABASE_URL = ENV?.VITE_SUPABASE_URL;
const ANON_KEY = ENV?.VITE_SUPABASE_ANON_KEY;

async function rest(pathname, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${pathname}`, {
    method,
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  return { status: res.status, ok: res.ok, body: parsed };
}

// ═══════════════════════════ STATIC TESTS ═══════════════════════════

if (!ONLY_DB) {
  await test("S-1", "TC-1.2 — Không còn phần thưởng gán cứng", () => {
    const offenders = [];
    for (const file of CLIENT_SRC) {
      const src = read(file);
      src.split(/\r?\n/).forEach((line, i) => {
        // addCoins(10) / addXp(20) — số trần, không phải biến
        if (/\badd(Coins|Xp)\(\s*\d/.test(line)) {
          offenders.push(`${file}:${i + 1}`);
        }
      });
    }
    assert(
      offenders.length === 0,
      `Còn ${offenders.length} chỗ gán cứng: ${offenders.slice(0, 5).join(", ")}`,
    );
    return { detail: `${CLIENT_SRC.length} file đã quét, sạch` };
  });

  await test(
    "S-2",
    "TC-R.5 — Không còn biến đã xoá trong dependency array",
    () => {
      const offenders = [];
      for (const file of CLIENT_SRC) {
        const src = read(file);
        src.split(/\r?\n/).forEach((line, i) => {
          // Mảng dependency còn tham chiếu addCoins/addXp -> ReferenceError lúc chạy.
          // Lint và build KHÔNG bắt được loại lỗi này.
          if (/^\s*\},\s*\[.*\badd(Coins|Xp)\b/.test(line))
            offenders.push(`${file}:${i + 1}`);
        });
      }
      assert(
        offenders.length === 0,
        `Còn ${offenders.length} dependency array tham chiếu biến đã xoá: ${offenders.join(", ")}`,
      );
      return { detail: "không còn tham chiếu mồ côi" };
    },
  );

  await test(
    "S-3",
    "TC-1.1 — Mọi khoá rewardService đều có trong seed SQL",
    () => {
      const defaults = parseRewardDefaults();
      const seeded = new Set(parseSeedKeys());
      const missing = Object.keys(defaults).filter((k) => !seeded.has(k));
      assert(
        missing.length === 0,
        `${missing.length} khoá có trong code nhưng thiếu trong seed: ${missing.join(", ")}`,
      );
      return { detail: `${Object.keys(defaults).length} khoá khớp` };
    },
  );

  await test("S-4", "TC-1.1 — Seed SQL không có khoá thừa", () => {
    const defaults = parseRewardDefaults();
    const seeded = parseSeedKeys();
    const extra = seeded.filter((k) => !(k in defaults));
    assert(
      extra.length === 0,
      `${extra.length} khoá seed không có trong code: ${extra.join(", ")}`,
    );
    return { detail: `${seeded.length} khoá seed đều được dùng` };
  });

  await test(
    "S-5",
    "TC-1.2 — Mọi lời gọi grantReward dùng khoá đã biết",
    () => {
      const defaults = parseRewardDefaults();
      const known = new Set(Object.keys(defaults));
      const unknown = [];
      const dynamicPrefixes = new Set();

      const staticRe = /(?:grantReward|getReward)\(\s*['"]([\w.]+)['"]/g;
      const tmplRe = /(?:grantReward|getReward)\(\s*`([^`]*)\$\{/g;

      for (const file of CLIENT_SRC) {
        const src = read(file);
        let m;
        while ((m = staticRe.exec(src))) {
          if (!known.has(m[1])) unknown.push(`${m[1]} (${file})`);
        }
        while ((m = tmplRe.exec(src))) {
          dynamicPrefixes.add(m[1]);
        }
      }

      assert(
        unknown.length === 0,
        `Khoá không tồn tại trong REWARD_DEFAULTS: ${unknown.join(", ")}`,
      );

      // Khoá dựng động (VD `game.tier_${tier}`) — kiểm tra tiền tố có khoá thật
      for (const prefix of dynamicPrefixes) {
        const hit = [...known].some((k) => k.startsWith(prefix));
        assert(
          hit,
          `Tiền tố động "${prefix}" không khớp khoá nào trong REWARD_DEFAULTS`,
        );
      }

      return {
        detail: `${known.size} khoá tĩnh hợp lệ, ${dynamicPrefixes.size} tiền tố động hợp lệ`,
      };
    },
  );

  await test("S-6", "TC-0.8 — Bundle admin tách biệt khỏi app chính", () => {
    const leaks = [];
    for (const file of ADMIN_SRC) {
      const src = read(file);
      if (/from\s+['"][^'"]*client\/src/.test(src))
        leaks.push(`${file} → client/src`);
    }
    for (const file of CLIENT_SRC) {
      const src = read(file);
      if (/from\s+['"][^'"]*admin\/src/.test(src))
        leaks.push(`${file} → admin/src`);
    }
    assert(leaks.length === 0, `Import chéo giữa 2 app: ${leaks.join(", ")}`);

    assert(exists("admin/package.json"), "Thiếu admin/package.json");
    assert(
      !exists("client/src/pages/EconomyPage.jsx"),
      "Trang admin lọt vào client/",
    );
    return { detail: "2 app độc lập" };
  });

  await test("S-7", "TC-0.6 — Không nhúng service_role key ở frontend", () => {
    const offenders = [];
    for (const file of [...CLIENT_SRC, ...ADMIN_SRC]) {
      if (/service_role/i.test(read(file))) offenders.push(file);
    }
    assert(
      offenders.length === 0,
      `Nhắc tới service_role trong source frontend: ${offenders.join(", ")}`,
    );
    return { detail: "không có service_role trong frontend" };
  });

  await test(
    "S-8",
    "TC-0.6 — AdminRoute ghi rõ đây là UX, không phải bảo mật",
    () => {
      const src = read("admin/src/auth/AdminRoute.jsx");
      assert(
        /UX|không phải bảo mật|khong phai bao mat/i.test(src),
        "AdminRoute thiếu ghi chú cảnh báo đây chỉ là lớp UX",
      );
      return { detail: "có ghi chú cảnh báo" };
    },
  );

  await test(
    "S-9",
    "TC-R.8 — Không gán cứng số Xu/XP ở màn hình kết quả",
    () => {
      // Lỗi thật đã xảy ra: JSX viết chết `? 120 : 70 : 30 : 10` Xu trong khi số
      // THỰC nhận lấy từ reward_configs. Đổi giá trên Admin thì Xu thực nhận
      // đúng nhưng dòng chữ vẫn ghi số cũ. Lint và build KHÔNG bắt được.
      //
      // Cách bắt: CHUỖI ternary trả về ≥2 nhánh là SỐ TRẦN, và trong ~300 ký tự
      // sau đó có chữ "Xu"/"XP" -> gần như chắc chắn là số thưởng hiển thị.
      // Bỏ qua client/src/data (đó là nội dung bài học, không phải UI).
      const chain = /\?\s*\d+\b[\s\S]{0,300}?\?\s*\d+\b/g;

      const scan = (raw) => {
        // Bỏ `??` và `?.` (nullish/optional chaining) — không phải ternary.
        // Thay bằng 2 khoảng trắng để giữ nguyên vị trí ký tự -> số dòng đúng.
        const s = raw.replace(/\?\?|\?\./g, "  ");
        const hits = [];
        let m;
        chain.lastIndex = 0;
        while ((m = chain.exec(s))) {
          const tail = s.slice(m.index, m.index + m[0].length + 300);
          if (/\b(Xu|XP)\b/.test(tail)) hits.push(m.index);
        }
        return hits;
      };

      // ── Kiểm tra chính bộ dò: mẫu lỗi THẬT đã từng có trong GamesPage ──
      // Không có bước này thì một regex hỏng sẽ khiến test xanh giả.
      const CANARY = [
        '{destroyedCount >= 15 ? 120 : destroyedCount >= 10 ? 70 : 30}{" "}',
        "Xu",
      ].join("\n");
      assert(
        scan(CANARY).length > 0,
        "Bộ dò S-9 KHÔNG phát hiện được mẫu lỗi đã biết — regex đã hỏng",
      );

      const offenders = [];
      for (const file of CLIENT_SRC) {
        if (/[\\/]data[\\/]/.test(file)) continue;
        const src = read(file);
        for (const idx of scan(src)) {
          offenders.push(`${file}:${src.slice(0, idx).split(/\r?\n/).length}`);
        }
      }

      assert(
        offenders.length === 0,
        `Còn ${offenders.length} chỗ gán cứng số Xu/XP: ${offenders.slice(0, 5).join(", ")}`,
      );
      return { detail: `${CLIENT_SRC.length} file đã quét, sạch` };
    },
  );

  await test(
    "S-11",
    "TC-1.1 — Trạng thái cuối của migration khớp REWARD_DEFAULTS",
    () => {
      // Kiểm tra trên FILE SQL chứ không phải DB đang chạy: sau khi Admin
      // chỉnh giá, DB khác code là đúng thiết kế.
      // `parseSeedValues()` đã áp cả các migration điều chỉnh (0003…) lên seed,
      // nên đây là so với trạng thái cuối của một cài đặt mới.
      const code = parseRewardDefaults();
      const seed = parseSeedValues();
      const diffs = [];

      for (const [key, want] of Object.entries(code)) {
        const got = seed[key];
        if (!got) {
          diffs.push(`${key}: thiếu trong seed SQL`);
          continue;
        }
        if (got.coins !== want.coins || got.xp !== want.xp)
          diffs.push(
            `${key}: seed ${got.coins}/${got.xp} vs code ${want.coins}/${want.xp}`,
          );
        if (got.coinsMax !== (want.coinsMax ?? null))
          diffs.push(
            `${key}: coins_max seed ${got.coinsMax} vs code ${want.coinsMax ?? null}`,
          );
      }

      assert(
        diffs.length === 0,
        `${diffs.length} dòng lệch: ${diffs.slice(0, 4).join(" | ")}`,
      );
      return { detail: `${Object.keys(code).length} khoá seed khớp giá trị` };
    },
  );

  await test(
    "S-10",
    "TC-R.8 — Không còn chuỗi hiển thị thưởng viết chết",
    () => {
      // Các chuỗi từng tồn tại trong GamesPage: `+120 Xu`, `+200 XP`, `120 Xu`
      const bad = /[+\s](120|200|70)\s*(Xu|XP)\b/;
      const offenders = CLIENT_SRC.filter((f) => bad.test(read(f)));
      assert(
        offenders.length === 0,
        `Chuỗi thưởng viết chết trong: ${offenders.join(", ")}`,
      );
      return { detail: "không còn chuỗi thưởng viết chết" };
    },
  );
}

// ═══════════════════════════ DB TESTS ═══════════════════════════

if (!ONLY_STATIC) {
  if (!SUPABASE_URL) {
    await test("D-0", "Kết nối Supabase", () => ({
      skip: true,
      detail: "Không tìm thấy .env.local — bỏ qua toàn bộ nhóm DB",
    }));
  } else {
    await test("D-1", "TC-1.1 — Seed đủ 27 cấu hình phần thưởng", async () => {
      const r = await rest("reward_configs?select=key,group_name");
      assert(r.ok, `HTTP ${r.status}: ${JSON.stringify(r.body).slice(0, 200)}`);
      const expected = parseRewardDefaults();
      const n = Object.keys(expected).length;
      assert(
        r.body.length === n,
        `DB có ${r.body.length} dòng, REWARD_DEFAULTS có ${n} — lệch nhau (migration 0002 chưa chạy đủ?)`,
      );

      const groups = {};
      for (const row of r.body)
        groups[row.group_name] = (groups[row.group_name] || 0) + 1;
      return { detail: `${n} dòng / ${Object.keys(groups).length} nhóm` };
    });

    await test(
      "D-2",
      "TC-1.1 — Giá trị trên DB hợp lệ (không đòi bằng mặc định)",
      async () => {
        // CỐ Ý KHÔNG so DB với REWARD_DEFAULTS. Sau khi Admin chỉnh giá, DB
        // khác mặc định là ĐÚNG — đó chính là tính năng của GĐ 1. Đòi bằng
        // nhau sẽ khiến test FAIL ngay khi tính năng chạy đúng.
        // Việc "seed khớp code" do S-11 lo (quét file SQL, không phụ thuộc
        // dữ liệu đang chạy). Ở đây chỉ kiểm tra dữ liệu SỐNG hợp lệ.
        const r = await rest(
          "reward_configs?select=key,coins,coins_max,xp,enabled",
        );
        assert(r.ok, `HTTP ${r.status}`);

        const isUint = (v) => Number.isInteger(v) && v >= 0;
        const bad = [];
        for (const row of r.body) {
          if (!isUint(row.coins)) bad.push(`${row.key}: coins=${row.coins}`);
          if (!isUint(row.xp)) bad.push(`${row.key}: xp=${row.xp}`);
          if (row.coins_max != null && !(isUint(row.coins_max) && row.coins_max >= row.coins))
            bad.push(
              `${row.key}: coins_max=${row.coins_max} < coins=${row.coins}`,
            );
          if (typeof row.enabled !== "boolean")
            bad.push(`${row.key}: enabled=${row.enabled}`);
        }
        assert(
          bad.length === 0,
          `${bad.length} dòng không hợp lệ: ${bad.slice(0, 4).join(" | ")}`,
        );

        const code = parseRewardDefaults();
        const drifted = r.body.filter((x) => {
          const w = code[x.key];
          return w && (x.coins !== w.coins || x.xp !== w.xp);
        });

        return {
          detail:
            `${r.body.length} dòng hợp lệ` +
            (drifted.length
              ? ` · Admin đã chỉnh khác mặc định: ${drifted
                  .map((d) => d.key)
                  .slice(0, 5)
                  .join(", ")}`
              : " · chưa khoá nào bị chỉnh khác mặc định"),
        };
      },
    );

    await test("D-3", "TC-1.1 — app_config có đủ 3 khoá", async () => {
      const r = await rest("app_config?select=key");
      assert(r.ok, `HTTP ${r.status}`);
      const keys = r.body.map((x) => x.key);
      for (const need of [
        "content_source",
        "level_curve",
        "reward_multiplier",
      ]) {
        assert(keys.includes(need), `Thiếu khoá app_config: ${need}`);
      }
      return { detail: keys.join(", ") };
    });

    await test(
      "D-4",
      "TC-0.2 — Anon KHÔNG ghi được leaderboard của người khác",
      async () => {
        const r = await rest("leaderboard", {
          method: "POST",
          headers: { Prefer: "resolution=merge-duplicates" },
          body: {
            id: "00000000-0000-0000-0000-000000000000",
            name: "HACK-TEST",
            weekly_xp: 999999,
            is_bot: false,
            tier: "bronze",
          },
        });
        assert(
          !r.ok,
          `🔴 LỖ HỔNG: anon GHI ĐƯỢC leaderboard (HTTP ${r.status}). Migration 0001 chưa chạy?`,
        );
        return { detail: `bị chặn — HTTP ${r.status}` };
      },
    );

    await test("D-5", "TC-0.3 — Anon KHÔNG đọc được profiles", async () => {
      const r = await rest("profiles?select=id,email,role&limit=10");
      assert(
        r.ok,
        `HTTP ${r.status} — đáng lẽ phải trả về mảng rỗng, không phải lỗi`,
      );
      assert(
        Array.isArray(r.body) && r.body.length === 0,
        `🔴 RÒ RỈ: anon đọc được ${r.body?.length} hồ sơ phụ huynh`,
      );
      return { detail: "trả về mảng rỗng" };
    });

    await test(
      "D-6",
      "TC-0.3 — Anon KHÔNG đọc được child_profiles",
      async () => {
        const r = await rest("child_profiles?select=id,nickname&limit=10");
        assert(r.ok, `HTTP ${r.status}`);
        assert(
          r.body.length === 0,
          `🔴 RÒ RỈ: anon đọc được ${r.body.length} hồ sơ bé`,
        );
        return { detail: "trả về mảng rỗng" };
      },
    );

    await test("D-7", "TC-1.7 — Anon KHÔNG đọc được sổ cái", async () => {
      const r = await rest("coin_transactions?select=child_id,amount&limit=10");
      assert(r.ok, `HTTP ${r.status}`);
      assert(
        r.body.length === 0,
        `🔴 RÒ RỈ: anon đọc được ${r.body.length} giao dịch Xu`,
      );
      return { detail: "trả về mảng rỗng" };
    });

    await test("D-8", "TC-0.4 — is_admin() trả false cho anon", async () => {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_admin`, {
        method: "POST",
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: "{}",
      });
      assert(res.ok, `HTTP ${res.status} — hàm is_admin() chưa tồn tại?`);
      const val = await res.json();
      assert(
        val === false,
        `Anon mà is_admin() trả ${JSON.stringify(val)} — SAI`,
      );
      return { detail: "false" };
    });

    await test(
      "D-9",
      "TC-0.5 — admin_audit_log là append-only với anon",
      async () => {
        // PostgREST trả 204 cho DELETE kể cả khi 0 dòng bị xoá (RLS lọc sạch).
        // Phải dùng return=representation để thấy SỐ DÒNG THẬT SỰ bị tác động.
        const del = await rest("admin_audit_log?id=gt.0", {
          method: "DELETE",
          headers: { Prefer: "return=representation" },
        });
        assert(
          !del.ok || (Array.isArray(del.body) && del.body.length === 0),
          `🔴 anon XOÁ được ${del.body?.length} dòng audit log`,
        );

        const upd = await rest("admin_audit_log?id=gt.0", {
          method: "PATCH",
          headers: { Prefer: "return=representation" },
          body: { action: "tampered" },
        });
        assert(
          !upd.ok || (Array.isArray(upd.body) && upd.body.length === 0),
          `🔴 anon SỬA được ${upd.body?.length} dòng audit log`,
        );

        return { detail: "DELETE và PATCH đều tác động 0 dòng" };
      },
    );

    await test("D-10", "TC-0.5 — Anon KHÔNG ghi được audit log", async () => {
      const r = await rest("admin_audit_log", {
        method: "POST",
        body: { action: "fake-entry-from-anon" },
      });
      assert(!r.ok, `🔴 anon GHI được audit log (HTTP ${r.status})`);
      return { detail: `bị chặn — HTTP ${r.status}` };
    });

    await test(
      "D-11",
      "TC-0.3 — reward_configs đọc công khai được (app cần)",
      async () => {
        const r = await rest("reward_configs?select=key&limit=1");
        assert(
          r.ok && r.body.length === 1,
          `App không đọc được reward_configs (HTTP ${r.status})`,
        );
        return { detail: "đọc được" };
      },
    );

    await test(
      "D-12",
      "TC-0.5 — Bảng admin_audit_log tồn tại và rỗng (chưa bị lộ)",
      async () => {
        const r = await rest("admin_audit_log?select=id&limit=1");
        assert(r.ok, `HTTP ${r.status} — bảng chưa tồn tại?`);
        assert(r.body.length === 0, "🔴 anon đọc được audit log");
        return { detail: "anon không đọc được" };
      },
    );
  }
}

// ═══════════════════════════ BÁO CÁO ═══════════════════════════

const ICON = { PASS: "✅", FAIL: "❌", SKIP: "⏭️ ", MANUAL: "👤" };
const pad = (s, n) => String(s).padEnd(n);

console.log("\n" + "─".repeat(78));
console.log("  AUTOMATION TEST — ADMIN PORTAL");
console.log("─".repeat(78));

for (const r of results) {
  if (r.status === "SKIP") continue;
  console.log(
    `${ICON[r.status]} ${pad(r.id, 6)} ${pad(r.name, 55)} ${r.detail ?? ""}`,
  );
}

const pass = results.filter((r) => r.status === "PASS").length;
const fail = results.filter((r) => r.status === "FAIL").length;
const skip = results.filter((r) => r.status === "SKIP").length;

console.log("─".repeat(78));
console.log(`  ${pass} PASS · ${fail} FAIL · ${skip} SKIP`);

if (fail > 0) {
  console.log("\n  ❌ CHI TIẾT LỖI:");
  for (const r of results.filter((x) => x.status === "FAIL")) {
    console.log(`     ${r.id} — ${r.name}`);
    console.log(`        ${r.detail}`);
  }
}

const MANUAL = [
  ["TC-0.6", "Đăng nhập Google vào Admin Portal (không tự động hoá được)"],
  ["TC-0.7", "Thông báo lỗi phân biệt 3 nguyên nhân"],
  ["TC-1.2", "Chơi thật để đối chiếu số Xu/XP hiển thị với bảng ở docs"],
  ["TC-1.3", "🔴 Đổi config trên Admin → app nhận ngay (cần 2 trình duyệt)"],
  ["TC-1.4", "Hệ số nhân X2 hiển thị đúng trên UI"],
  ["TC-1.5", "Công thức lên cấp hiển thị đúng"],
  ["TC-1.6", "Tắt một mục → thưởng 0 trên UI"],
  ["TC-1.8", "Mua hàng ở Cửa hàng ghi sổ âm"],
  ["TC-1.9", "Audit log ghi thay đổi config (xem trên Admin)"],
  ["TC-1.10", "Validate form chặn dữ liệu sai"],
  ["TC-1.11", "Offline: tắt mạng trong DevTools rồi học bài"],
  ["TC-1.12", "Guest mode không nhận thưởng"],
  ["TC-1.13", "Danh sách người dùng hiển thị đúng"],
  ["TC-1.14", "Tìm kiếm theo tên bé / email phụ huynh"],
  ["TC-1.15", "Phân trang"],
  ["TC-1.16", "Khoá / Mở khoá tài khoản + audit log"],
  ["TC-1.17", "Cảnh báo Xu bất thường"],
  ["TC-R.1", "Guest mode vẫn học được"],
  ["TC-R.2", "Tiến độ guest chuyển lên cloud khi đăng nhập"],
  ["TC-R.3", "Đồng bộ localStorage ↔ Supabase"],
  ["TC-R.4", "Bảng xếp hạng vẫn chạy"],
  ["TC-R.5", "Chơi cả 6 mini game"],
  ["TC-R.6", "Thú cưng vẫn nuôi được"],
  ["TC-R.7", "🔴 Sổ Tay Ôn Bài Sai: phiên nhiều câu"],
  ["TC-R.8", "🔴 Số thưởng hiển thị khớp config (cả 6 mini game)"],
];

console.log("\n" + "─".repeat(78));
console.log(
  "  👤 CẦN TEST TAY (" +
    MANUAL.length +
    " mục — cần trình duyệt / đăng nhập Google)",
);
console.log("─".repeat(78));
for (const [id, name] of MANUAL) console.log(`     ${pad(id, 8)} ${name}`);
console.log("\n  Chi tiết từng bước: docs/admin_portal_test_cases.md\n");

process.exit(fail > 0 ? 1 : 0);
