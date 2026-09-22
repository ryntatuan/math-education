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
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

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
/**
 * Đọc file rồi bỏ BOM (U+FEFF) ở đầu.
 * 🔴 VÌ SAO CẦN: `JSON.parse` gặp BOM là ném `Unexpected token '\uFEFF'` — cổng đỏ với
 * một câu vô nghĩa thay vì câu hướng dẫn thật. BOM xuất hiện khi file bị ghi bằng công cụ
 * tự thêm BOM (PowerShell `Out-File -Encoding utf8` chẳng hạn). Đã gặp thật khi thử cổng S-32.
 * `fs.writeFileSync(..., "utf8")` của Node KHÔNG thêm BOM ⇒ phía ghi đã sạch.
 */
const readJson = (rel) => JSON.parse(read(rel).replace(/^\uFEFF/, ""));
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

  await test(
    "S-12",
    "TC-2.7 — Không có biến chưa khai báo (oxlint `no-undef`)",
    () => {
      // VÌ SAO CẦN: `isUuid is not defined` từng lọt ra trình duyệt dù
      // `vite build` **và** chẩn đoán của editor đều báo sạch. Đây là lỗi lúc
      // CHẠY, không phải lỗi cú pháp — build không bao giờ bắt được.
      //
      // ⚠️ oxlint MẶC ĐỊNH KHÔNG bật `no-undef` (đã đo: exit 0, không in gì).
      // Phải có `"no-undef": "deny"` trong `.oxlintrc.json` của từng app.
      // Thiếu file cấu hình thì test này xanh mà chẳng bảo vệ được gì —
      // nên kiểm tra luôn sự tồn tại của cấu hình.
      const configs = ["client/.oxlintrc.json", "admin/.oxlintrc.json"];
      const missing = configs.filter((c) => !exists(c));
      assert(
        missing.length === 0,
        `Thiếu cấu hình oxlint: ${missing.join(", ")} — thiếu nó thì \`no-undef\` không được bật`,
      );

      // Dùng binary có sẵn trong client/node_modules, không cài thêm gì.
      const binRel =
        process.platform === "win32"
          ? "client/node_modules/.bin/oxlint.cmd"
          : "client/node_modules/.bin/oxlint";
      if (!exists(binRel))
        return {
          skip: true,
          detail: `Không thấy ${binRel} — chạy 'npm install' trong client/ rồi thử lại`,
        };

      const bin = path.join(ROOT, binRel);
      const offenders = [];

      for (const dir of ["client", "admin"]) {
        // cwd = thư mục app để oxlint đọc đúng .oxlintrc.json của app đó
        const r = spawnSync(bin, ["--quiet", "src"], {
          cwd: path.join(ROOT, dir),
          encoding: "utf8",
          shell: process.platform === "win32",
        });
        if (r.status !== 0) {
          const out = `${r.stdout || ""}${r.stderr || ""}`;
          const errs = out
            .split(/\r?\n/)
            .filter((l) => l.includes("error"))
            .slice(0, 3)
            .join(" | ");
          offenders.push(`${dir}: ${errs || `thoát với mã ${r.status}`}`);
        }
      }

      assert(
        offenders.length === 0,
        `oxlint báo lỗi — ${offenders.join(" ;; ")}`,
      );
      return { detail: "client + admin: không có biến chưa khai báo" };
    },
  );

  await test(
    "S-13",
    "TC-2.15 — Chỗ ghi câu sai nào cũng ghi kèm lượt trả lời",
    () => {
      // VÌ SAO CẦN: GĐ 2b ghi từng lượt trả lời vào `question_attempts` để biết
      // câu hỏi nào hỏng / kỹ năng nào yếu. Quên gắn `recordAttempt` thì KHÔNG có
      // lỗi nào bung ra — chỉ là dữ liệu thiếu âm thầm, rồi ta kết luận "kỹ năng
      // này ổn" trong khi thực ra chưa từng đo. Đúng loại lỗi build không bắt được.
      //
      // Chỗ nào gọi `recordMistake(` (ghi câu sai) thì cũng phải gọi
      // `recordAttempt(` — cả hai nằm trong cùng nhánh trả lời sai.
      const callers = CLIENT_SRC.filter((f) =>
        read(f).includes("recordMistake("),
      );

      // Canary: bộ dò PHẢI nhìn thấy 2 trang đã biết là có gọi `recordMistake`.
      // Nếu glob hỏng thì `callers` rỗng và test sẽ xanh giả.
      // Chuẩn hoá dấu "\" -> "/" vì `walk()` dùng path.join (khác nhau tuỳ hệ điều hành).
      const names = callers.map((f) => f.replace(/\\/g, "/"));
      const must = [
        "client/src/pages/LessonPage.jsx",
        "client/src/pages/PracticePage.jsx",
      ];
      const missed = must.filter((m) => !names.includes(m));
      assert(
        missed.length === 0,
        `Bộ dò không thấy ${missed.join(", ")} — glob có thể đã hỏng`,
      );

      const missing = callers.filter(
        (f) => !read(f).includes("recordAttempt("),
      );
      assert(
        missing.length === 0,
        `Gọi recordMistake nhưng thiếu recordAttempt: ${missing.join(", ")}`,
      );
      return { detail: `${callers.length} file đều có recordAttempt` };
    },
  );

  await test(
    "S-14",
    "TC-2.25 — Mọi game có sinh câu hỏi đều ghi lượt trả lời",
    () => {
      // VÌ SAO CẦN: 6 mini game, mỗi game sinh câu theo một cách riêng. Gắn sót
      // một game thì KHÔNG có lỗi nào bung ra — chỉ là bảng `question_attempts`
      // thiếu hẳn một nguồn, rồi màn hình /analytics lặng lẽ kết luận thiếu.
      // Lint và build đều không thấy.
      //
      // 🔴 Bộ dò này CỐ TÌNH không tìm theo tên hàm sinh câu. Lần khảo sát đầu
      // tiên đã kết luận SAI rằng `MathBalanceGame` không sinh câu, chỉ vì nó
      // dùng hàm riêng `generatePuzzle()` mà grep `generateCalculation` không
      // thấy. Nên ở đây nhận diện theo HÌNH DẠNG: component game nào gọi một
      // hàm tên bắt đầu bằng `generate` thì cũng phải gọi `recordAttempt`.
      const rel = "client/src/pages/GamesPage.jsx";
      const src = read(rel);

      const starts = [...src.matchAll(/\nfunction (\w+Game)\(/g)].map((m) => ({
        name: m[1],
        at: m.index + 1,
      }));
      assert(starts.length > 0, `Không thấy component game nào trong ${rel}`);

      const generate = [];
      const missing = [];
      starts.forEach((s, i) => {
        const end = i + 1 < starts.length ? starts[i + 1].at : src.length;
        const body = src.slice(s.at, end);
        if (!/\bgenerate[A-Z]\w*\(/.test(body)) return; // không sinh câu thì không cần ghi
        generate.push(s.name);
        if (!body.includes("recordAttempt(")) missing.push(s.name);
      });

      // Canary: 6 game đều sinh câu. Con số này đổi thì hoặc có game mới (tốt —
      // nhớ kiểm tra nó có ghi lượt trả lời), hoặc bộ dò đã hỏng.
      assert(
        generate.length === 6,
        `Mong đợi 6 game sinh câu, thấy ${generate.length}: ${generate.join(", ")}`,
      );
      // Canary riêng cho game từng bị bỏ sót. Bộ dò bỏ sót được nó thì bỏ sót
      // được cả game khác.
      assert(
        generate.includes("MathBalanceGame"),
        "Bộ dò không thấy `MathBalanceGame` — game này sinh câu bằng hàm riêng " +
          "`generatePuzzle()`, đúng chỗ bộ dò từng bỏ sót",
      );
      assert(
        missing.length === 0,
        `Game sinh câu nhưng thiếu recordAttempt: ${missing.join(", ")}`,
      );

      return { detail: `${generate.length} game đều ghi lượt trả lời` };
    },
  );

  await test(
    "S-15",
    "TC-3a.4 — Mọi slide trong file tĩnh đều qua được bộ kiểm tra nội dung",
    async () => {
      // VÌ SAO CẦN: nội dung sắp được đưa vào DB và sửa được từ Admin Portal (GĐ 3).
      // Bộ kiểm tra trong `admin/src/lib/contentSchema.js` là thứ chặn nội dung hỏng.
      // Nếu chính nội dung HIỆN TẠI không qua nổi nó thì hoặc bộ kiểm tra sai, hoặc
      // dữ liệu đã hỏng — cả hai đều phải biết TRƯỚC khi migrate, không phải sau.
      //
      // Cổng này chạy hoàn toàn tĩnh (không cần mạng) và canh dữ liệu tĩnh khỏi hỏng
      // lúc sửa tay về sau.
      const { validateLesson } = await import(
        new URL("../admin/src/lib/contentSchema.js", import.meta.url)
      );

      const files = [
        ["grade1Data.js", "grade1Data"],
        ["grade2Data.js", "grade2Data"],
        ["grade3Data.js", "grade3Data"],
        ["grade4Data.js", "grade4Data"],
        ["grade5Data.js", "grade5Data"],
      ];

      let soBai = 0;
      let soSlide = 0;
      const loi = [];
      const gapKieu = new Set();

      for (const [file, key] of files) {
        const mod = await import(
          new URL(`../client/src/data/${file}`, import.meta.url)
        );
        for (const ch of mod[key].chapters) {
          for (const lesson of ch.lessons) {
            soBai++;
            soSlide += lesson.slides?.length ?? 0;
            for (const err of validateLesson(lesson))
              loi.push(`${lesson.id}: ${err}`);
            for (const s of lesson.slides ?? []) gapKieu.add(s.type);
          }
        }
      }

      // Canary: con số đổi thì hoặc có nội dung mới (tốt — hãy cập nhật), hoặc bộ
      // đọc đã hỏng. Cả hai đều phải lộ ra, không được im lặng.
      assert(soBai === 459, `Mong đợi 459 bài, đọc được ${soBai}`);
      assert(soSlide === 2455, `Mong đợi 2455 slide, đọc được ${soSlide}`);
      assert(
        gapKieu.size === 6,
        `Mong đợi 6 kiểu slide, gặp ${gapKieu.size}: ${[...gapKieu].join(", ")}`,
      );

      assert(
        loi.length === 0,
        `${loi.length} lỗi nội dung — 3 lỗi đầu: ${loi.slice(0, 3).join(" ;; ")}`,
      );

      return {
        detail: `${soBai} bài · ${soSlide} slide · ${gapKieu.size} kiểu — hợp lệ hết`,
      };
    },
  );

  await test(
    "S-16",
    "TC-3a.8+9 — Bộ kiểm tra nội dung BẮT ĐƯỢC nội dung hỏng",
    async () => {
      // 🔴 VÌ SAO PHẢI ĐO CHIỀU NÀY: `S-15` chỉ chứng minh bộ kiểm tra KHÔNG báo oan.
      // Nó KHÔNG chứng minh bộ kiểm tra bắt được lỗi — một hàm luôn trả về mảng rỗng
      // cũng qua được `S-15` một cách hoàn hảo. Một bộ dò hỏng mà ai cũng tin là
      // đang bảo vệ thì tệ hơn không có bộ dò nào.
      // Nên phải cho nó ăn nội dung hỏng đã biết, và xem nó có kêu đúng chỗ không.
      const { validateSlide } = await import(
        new URL("../admin/src/lib/contentSchema.js", import.meta.url)
      );

      const hopLe = {
        type: "story",
        content: { mascotMood: "happy", text: "Chào bé!" },
      };

      const caHong = [
        ["kiểu slide lạ", { type: "video", content: {} }, /kiểu slide lạ/],
        ["thiếu type", { content: {} }, /thiếu .type./],
        ["thiếu content", { type: "story" }, /content. không phải một object/],
        [
          "story thiếu text",
          { type: "story", content: { mascotMood: "happy" } },
          /thiếu khoá bắt buộc .text./,
        ],
        [
          "story text sai kiểu",
          { type: "story", content: { mascotMood: "x", text: 123 } },
          /text. phải là chuỗi/,
        ],
        [
          "quiz đáp án ngoài options",
          {
            type: "quiz",
            content: {
              question: "2+2?",
              options: [3, 4, 5],
              answer: 7,
              mascotHint: "h",
            },
          },
          /KHÔNG nằm trong .options./,
        ],
        [
          "quiz options rỗng",
          {
            type: "quiz",
            content: {
              question: "2+2?",
              options: [],
              answer: 4,
              mascotHint: "h",
            },
          },
          /options. rỗng/,
        ],
        // 🔴 Ca quan trọng nhất: `dialogue` từng bị bỏ sót vì kế hoạch mô tả nó là
        // "có scene" chứ không phải câu hỏi. Nếu ai đó xoá nhánh này khỏi bộ kiểm
        // tra, đúng ca này sẽ lộ ra.
        [
          "dialogue đáp án ngoài options",
          {
            type: "dialogue",
            content: {
              badge: "b",
              title: "t",
              dialogueList: [],
              question: "q",
              options: ["a", "b"],
              correctAnswer: "zzz",
              explanation: "e",
            },
          },
          /KHÔNG nằm trong .options./,
        ],
        [
          "concept có shape mà thiếu shapeLabel",
          {
            type: "concept",
            content: { badge: "b", title: "t", shape: "square" },
          },
          /phải đi cùng nhau/,
        ],
        [
          "visual number sai kiểu",
          { type: "visual", content: { text: "x", number: "ba" } },
          /number. phải là số/,
        ],
      ];

      const hong = [];
      for (const [ten, slide, mau] of caHong) {
        const loi = validateSlide(slide);
        if (loi.length === 0) hong.push(`${ten} — KHÔNG báo lỗi gì`);
        else if (!loi.some((l) => mau.test(l)))
          hong.push(`${ten} — báo lỗi không đúng: ${loi[0]}`);
      }

      // Chiều ngược lại: slide hợp lệ KHÔNG được bị báo oan.
      if (validateSlide(hopLe).length > 0) hong.push("slide hợp lệ bị báo oan");

      assert(hong.length === 0, `Bộ dò hỏng: ${hong.join(" | ")}`);

      return {
        detail: `${caHong.length} ca hỏng đều bị bắt · slide hợp lệ vẫn qua`,
      };
    },
  );
  await test(
    "S-17",
    "TC-3a.2 — 0008 chỉ cho anon đọc bài đã publish, và không hở bảng phiên bản",
    () => {
      // 🔴 VÌ SAO KIỂM Ở TẦNG NGUỒN: đây là yêu cầu bảo mật quan trọng nhất của lát 3a.
      // Kiểm lúc chạy là KHÔNG đủ: khi chưa có bài nháp nào trong DB thì phép thử
      // "anon không thấy bài nháp" luôn đúng — kể cả khi policy hở hoàn toàn. Một
      // phép thử luôn đúng thì không bảo vệ được gì.
      // Nên phải đọc thẳng định nghĩa policy trong file migration.
      const sql = read("supabase/migrations/0008_content_schema.sql");

      const docBai = sql.match(
        /CREATE POLICY "content_lessons_public_read"[\s\S]*?;/,
      );
      assert(
        docBai,
        "Không thấy policy content_lessons_public_read trong 0008",
      );
      assert(
        /status\s*=\s*'published'/.test(docBai[0]),
        "Policy đọc công khai của content_lessons KHÔNG giới hạn theo status — " +
          "bài nháp sẽ lộ ra cho mọi người có anon key.",
      );

      const phienBan = sql.match(
        /CREATE POLICY "content_lesson_versions_admin_all"[\s\S]*?;/,
      );
      assert(
        phienBan,
        "Không thấy policy content_lesson_versions_admin_all trong 0008",
      );
      assert(
        /is_admin\(\)/.test(phienBan[0]),
        "Policy của content_lesson_versions không gọi is_admin()",
      );

      // Bảng phiên bản phải KHÔNG có policy nào khác — thêm một policy cho `anon`
      // là mở đường đọc toàn bộ lịch sử nội dung.
      const soPolicy = (
        sql.match(/CREATE POLICY "content_lesson_versions/g) || []
      ).length;
      assert(
        soPolicy === 1,
        `content_lesson_versions có ${soPolicy} policy — mong đợi đúng 1 (chỉ admin)`,
      );

      // Không được có `USING (true)` cho bất kỳ bảng nội dung nào ngoài lớp/chương.
      for (const bang of [
        "content_lessons_public_read",
        "content_lesson_versions_admin_all",
      ]) {
        const block = sql.match(
          new RegExp(`CREATE POLICY "${bang}"[\\s\\S]*?;`),
        );
        assert(
          block && !/USING\s*\(\s*true\s*\)/.test(block[0]),
          `Policy ${bang} dùng USING (true) — đúng loại lỗ hổng đã vá ở GĐ 0`,
        );
      }

      return {
        detail:
          "bài học chỉ lộ bản published · phiên bản chỉ admin · không có USING(true)",
      };
    },
  );

  await test(
    "S-18",
    "TC-3b.5 — Màn hình nội dung: CHỈ ĐỌC, và đọc từ DB chứ không từ file tĩnh",
    () => {
      // Hai yêu cầu của lát 3b, cả hai đều vi phạm được mà không ai thấy:
      //
      // 1. ĐỌC TỪ DB. Nếu màn hình đọc file tĩnh thì nó vẫn hiện đúng nội dung, vẫn
      //    trông bình thường — nhưng không phải thứ app của bé sẽ nhận ở lát 3d. Hai
      //    nguồn lệch nhau âm thầm, đúng cái rủi ro mà cả GĐ 3 đang xử lý.
      // 2. CHỈ ĐỌC. Lát 3b không được ghi. Thêm một `.update()` vào đây là mở đường
      //    ghi khi chưa có bản nháp, chưa có publish, chưa có vết kiểm toán.
      const rel = "admin/src/pages/ContentPage.jsx";
      assert(exists(rel), `Không thấy ${rel}`);

      const src = read(rel);

      assert(
        /from\(\s*["']content_(grades|chapters|lessons)["']\s*\)/.test(src),
        `${rel} không truy vấn bảng content_* nào`,
      );
      assert(
        !/grade\dData|data\/curriculum/.test(src),
        `${rel} tham chiếu dữ liệu TĨNH — lát 3b phải đọc từ DB`,
      );

      const mauGhi = `supabase.from("content_lessons").update({ title: "x" })`;
      const regexGhi =
        /\.from\(\s*["'][^"']+["']\s*\)\s*\.\s*(insert|update|upsert|delete)\s*\(/;
      assert(
        regexGhi.test(mauGhi),
        "Cổng S-18 không bắt được mẫu ghi giả — cổng đang vô dụng",
      );

      // Chỉ soi thao tác ghi NỐI THẲNG sau `.from(...)`. Không thể chỉ tìm chuỗi
      // `.delete(`: `Set.delete()` lúc đóng/mở nhánh cũng viết y hệt — đã bắt nhầm
      // đúng một lần. Một cổng báo động giả thì lần sau sẽ bị bỏ qua, tệ hơn là
      // không có cổng.
      const chuoiGhi = src.match(regexGhi);
      assert(
        !chuoiGhi,
        `${rel} có thao tác ghi nối sau truy vấn: ${chuoiGhi?.[0]} — lát 3b là chỉ đọc`,
      );
      assert(
        !src.includes("logAudit"),
        `${rel} có gọi logAudit — lát 3b chỉ đọc, chưa có gì để ghi vết`,
      );

      return {
        detail: "chỉ đọc · truy vấn bảng content_* · không đụng file tĩnh",
      };
    },
  );

  await test(
    "S-19",
    "TC-L.1 — Truy vấn không treo vô hạn: hẹn giờ phải chạy THẬT, không chỉ nằm trong source",
    async () => {
      // Lỗi gốc: khi request rơi vào "hố đen" (kết nối mở được nhưng server KHÔNG
      // bao giờ trả lời — đúng kiểu mất sóng 4G), promise của supabase-js KHÔNG BAO
      // GIỜ settle. Màn hình treo ở "Đang tải…" mãi mãi. Đo được: **40,6s vẫn treo**.
      //
      // 🔴 Một điều đã đo và rất dễ thử sai: chặn ở tầng `fetch` bằng
      // `AbortController` KHÔNG chữa được. Abort có bắn `net::ERR_ABORTED` thật,
      // nhưng supabase-js nuốt `AbortError` rồi im lặng ⇒ **vẫn treo 40,6s**.
      // Nên hẹn giờ PHẢI ở tầng promise. Cổng này giữ đúng điều đó.
      const rel = "admin/src/lib/henGio.js";
      assert(exists(rel), `Không thấy ${rel}`);

      // `import()` được chính là LÝ DO file này tách khỏi `supabase.js`: nó THUẦN,
      // không đọc `import.meta.env`, nên Node nạp thẳng được để thử thật.
      const { coHen, HEN_GIO_MS } = await import(
        pathToFileURL(path.join(ROOT, rel)).href
      );

      assert(
        Number.isFinite(HEN_GIO_MS) && HEN_GIO_MS > 0 && HEN_GIO_MS <= 60000,
        `HEN_GIO_MS = ${HEN_GIO_MS} — phải là số hữu hạn trong khoảng (0, 60000]`,
      );

      // 1. Treo vô hạn → phải TỰ kết thúc, và kết thúc bằng lỗi HET_GIO.
      const moc = 150;
      const t0 = Date.now();
      const rTreo = await coHen(new Promise(() => {}), moc);
      const ms = Date.now() - t0;
      assert(ms < 2000, `Hẹn giờ không cắt: chờ ${ms}ms cho mốc ${moc}ms`);
      assert(
        rTreo?.error?.code === "HET_GIO",
        `Khi hết giờ phải có error.code = HET_GIO, nhận ${JSON.stringify(rTreo)?.slice(0, 140)}`,
      );
      assert(
        rTreo.data === null && rTreo.count === null,
        "Khi hết giờ phải giữ hình dạng PostgREST: data và count đều null",
      );

      // 2. Promise reject → trả { error } chứ KHÔNG ném. Ném lỗi sẽ tạo promise bị
      //    bỏ rơi ở chỗ không có try/catch → lỗi im lặng, đúng thứ đang chữa.
      const rLoi = await coHen(Promise.reject(new Error("mạng hỏng")), 1000);
      assert(
        rLoi?.error?.message === "mạng hỏng",
        `Promise reject phải thành { error.message }, nhận ${JSON.stringify(rLoi)?.slice(0, 140)}`,
      );

      // 3. Kết quả THẬT phải đi qua nguyên vẹn — nếu không thì lớp bọc này phá app.
      const that = { data: [{ id: "g1-c1-l1" }], count: 1, error: null };
      const rThat = await coHen(Promise.resolve(that), 1000);
      assert(
        rThat === that,
        "Kết quả thật bị lớp bọc làm biến dạng — phải đi qua nguyên vẹn",
      );

      // ── Canary ──
      // Ba phép thử trên chỉ chứng minh `coHen` đúng. Nếu ai đó "chữa" bằng cách
      // bọc ở tầng fetch như tôi từng làm — hoặc gỡ luôn lớp bọc client — thì
      // chúng vẫn xanh trong khi app treo lại. Nên phải kiểm cả chỗ nối.
      const sb = read("admin/src/lib/supabase.js");
      assert(
        /bocHenGio\(\s*createClient\(/.test(sb),
        "supabase.js không bọc client — hẹn giờ đang là CODE CHẾT, app vẫn treo",
      );

      const taoClientKhac = ADMIN_SRC.filter(
        (f) =>
          !f.replace(/\\/g, "/").endsWith("lib/supabase.js") &&
          read(f).includes("createClient("),
      );
      assert(
        taoClientKhac.length === 0,
        `${taoClientKhac.join(", ")} tự tạo Supabase client — đi vòng qua lớp hẹn giờ`,
      );

      return {
        detail: `cắt sau ${ms}ms · reject thành {error} · kết quả thật nguyên vẹn · client đã bọc`,
      };
    },
  );

  await test(
    "S-20",
    "TC-M.6 — Không màn hình nào tự bó hẹp bề rộng, và sidebar không kéo dài trang",
    () => {
      // Hai lỗi đã ĐO trên giao diện thật, cả hai đều vô hình trong source:
      //
      // 1. BÓ HẸP BỀ RỘNG. 6 trong 7 màn hình có `mx-auto max-w-{4,5,6}xl` ở thẻ gốc.
      //    Ở màn 2560px, `max-w-4xl` để lại **608px trống mỗi bên** — đúng cái "thừa
      //    khoảng trống hai bên" mà người dùng thấy. Đo sau khi bỏ (1920/2560): thừa = 0.
      // 2. SIDEBAR KÉO DÀI TRANG. Ở desktop sidebar là `static` nên cao theo nội dung
      //    menu (~550px). Khung cửa sổ thấp hơn 550px thì nó kéo CẢ HÀNG flex cao theo
      //    ⇒ cả trang cuộn, dù lẽ ra chỉ phần menu cần cuộn. Đo ở khung 420px:
      //    sidebar 550px, trang 550px. Ảnh hưởng CẢ 6 trang, không riêng trang nào.
      //
      // Luật chỉ cấm `max-w-{2..7}xl` — cỡ LỚN dùng làm khung trang. Các cỡ nhỏ còn
      // lại đều HỢP LỆ và đã đối chiếu hết: `max-w-xs` (gợi ý), `max-w-sm` (thẻ đăng
      // nhập), `max-w-md` (ô bảng, hộp thoại), `max-w-[180px]` (ô bảng). Cấm cả họ
      // `max-w-*` sẽ báo động giả — mà cổng báo động giả thì lần sau sẽ bị bỏ qua.
      const chuKyLon = /\bmax-w-(?:2|3|4|5|6|7)xl\b/g;

      // ── Canary ──
      // Phải chứng minh luật CÒN bắt được đúng thứ nó sinh ra để bắt, và KHÔNG bắt
      // nhầm cỡ nhỏ. Thiếu vế thứ hai thì một regex hỏng (bắt mọi thứ) vẫn xanh.
      const bat = [...'<div class="mx-auto max-w-4xl p-4">'.matchAll(chuKyLon)];
      assert(
        bat.length === 1,
        "Cổng S-20 không bắt được `max-w-4xl` giả — cổng đang vô dụng",
      );
      // `matchAll` dùng CHUNG `lastIndex` với regex gốc, nên phải trả về 0 trước khi
      // quét thật — nếu không, phép quét sẽ bỏ qua đoạn đầu của file đầu tiên.
      chuKyLon.lastIndex = 0;
      for (const coNho of [
        "max-w-xs",
        "max-w-sm",
        "max-w-md",
        "max-w-[180px]",
      ]) {
        assert(
          !new RegExp(chuKyLon.source).test(`class="${coNho}"`),
          `Cổng S-20 bắt nhầm cỡ nhỏ hợp lệ \`${coNho}\` — cổng đang báo động giả`,
        );
      }

      const conLai = [];
      for (const f of ADMIN_SRC) {
        const src = read(f);
        for (const m of src.matchAll(chuKyLon)) {
          const dong = src.slice(0, m.index).split("\n").length;
          conLai.push(`${f}:${dong} (${m[0]})`);
        }
      }
      assert(
        conLai.length === 0,
        `Còn khung bề rộng lớn — màn hình rộng sẽ thừa hai bên: ${conLai.join(", ")}`,
      );

      // Sidebar: phải cao ĐÚNG bằng màn hình ở desktop, tự cuộn bên trong, và dính lại
      // khi trang dài. Phải soi trong thẻ <aside> chứ không cả file — `Layout.jsx` còn
      // `lg:hidden` ở thanh trên cùng, quét cả file là so nhầm chỗ.
      //
      // 🔴 KHÔNG parse thẻ bằng regex. Bản đầu tôi dùng `/<aside[\s\S]*?>/` và nó
      // **FAIL sai**: trong file có một ghi chú viết đúng chuỗi `` `<aside>` `` ở
      // dòng 96, nên regex khớp vào chính ghi chú đó rồi dừng ngay tại dấu `>` của
      // nó — cửa sổ soi được chỉ là chuỗi `` `<aside> `` và cổng báo thiếu `lg:h-dvh`
      // dù mã hoàn toàn đúng. Một cổng FAIL sai cũng tệ như cổng xanh giả: lần sau
      // người ta sẽ bỏ qua nó. Nên nhận diện thẻ bằng `id` (thứ duy nhất, không thể
      // trùng với ghi chú) rồi mở một cửa sổ đủ rộng — không phụ thuộc việc parse.
      const layout = read("admin/src/components/Layout.jsx");
      const mocId = [...layout.matchAll(/(?:^|[\s{])id="admin-sidebar"/g)];
      assert(
        mocId.length === 1,
        `Layout.jsx có ${mocId.length} chỗ khai \`id="admin-sidebar"\` — phải đúng 1`,
      );
      const theAside = layout.slice(mocId[0].index, mocId[0].index + 1200);
      assert(
        theAside.includes("className={"),
        "Cửa sổ soi sidebar không chứa `className` — cổng đang soi nhầm chỗ",
      );
      assert(
        /\blg:h-dvh\b/.test(theAside),
        "Sidebar thiếu `lg:h-dvh` — ở cửa sổ thấp nó sẽ kéo cả trang cao theo",
      );
      assert(
        /\blg:sticky\b/.test(theAside) && /\blg:top-0\b/.test(theAside),
        "Sidebar thiếu `lg:sticky lg:top-0` — trang dài thì nền sidebar sẽ hụt dưới đáy",
      );
      assert(
        !/\blg:static\b/.test(theAside),
        "Sidebar vẫn còn `lg:static` — nó cao theo nội dung menu và kéo dài cả trang",
      );
      assert(
        /\boverflow-y-auto\b/.test(theAside),
        "Sidebar thiếu `overflow-y-auto` — cửa sổ thấp thì menu bị cắt, không cuộn được",
      );

      return {
        detail:
          "0 khung bề rộng lớn · sidebar cao bằng màn hình, tự cuộn, dính khi cuộn",
      };
    },
  );

  await test(
    "S-21",
    "TC-M.7 — Nhiều bảng cạnh nhau phải khớp cột (không để `table-layout: auto`)",
    () => {
      // `/economy` vẽ **7 `<table>` riêng** (một bảng cho mỗi nhóm phần thưởng).
      // `table-layout: auto` cho MỖI bảng tự chia cột theo nội dung riêng của nó:
      // đo được cột "Xu" rộng **318px** ở nhóm Bài học, **355px** ở nhóm Khác,
      // **339px** ở nhóm Luyện tập ⇒ cùng một ô nhập nằm ở ba vị trí khác nhau
      // (825 / 873 / 934) và cả trang trông như cột bị lệch.
      //
      // Cổng này giữ cách chữa: `table-fixed` + `<colgroup>` khai theo **phần trăm**
      // (không dùng px, để bảng vẫn co giãn theo màn hình), và tổng phải đúng 100%.
      const rel = "admin/src/pages/EconomyPage.jsx";
      assert(exists(rel), `Không thấy ${rel}`);
      const src = read(rel);

      // ── Canary 1: phải bắt được mẫu <col> giả ──
      const chuKyCol = /<col\s+className="w-\[([\d.]+)%\]"\s*\/>/g;
      const bat = [...'<col className="w-[50%]" />'.matchAll(chuKyCol)];
      assert(
        bat.length === 1,
        "Cổng S-21 không bắt được mẫu `<col>` giả — cổng đang vô dụng",
      );
      // `matchAll` dùng CHUNG `lastIndex` với regex gốc; không trả về 0 thì lượt
      // quét thật sẽ bỏ qua đoạn đầu file.
      chuKyCol.lastIndex = 0;

      const cols = [...src.matchAll(chuKyCol)].map((m) => Number(m[1]));
      assert(
        cols.length === 5,
        `${rel} phải khai đúng 5 <col> theo %, thấy ${cols.length} — thiếu colgroup thì mỗi bảng lại tự chia cột`,
      );
      const tong = cols.reduce((a, b) => a + b, 0);
      assert(
        Math.abs(tong - 100) < 0.001,
        `Tổng bề rộng cột = ${tong}% — phải đúng 100% (lệch thì trình duyệt tự chuẩn hoá, cột lại lệch nhau)`,
      );
      assert(
        /<table[^>]*\btable-fixed\b/.test(src),
        `${rel} thiếu \`table-fixed\` — mỗi bảng sẽ tự chia cột theo nội dung riêng và lệch nhau`,
      );

      // ── Canary 2: regex trên KHÔNG được bắt bảng thiếu `table-fixed` ──
      assert(
        !/<table[^>]*\btable-fixed\b/.test(
          '<table className="w-full text-sm">',
        ),
        "Cổng S-21 bắt nhầm cả bảng KHÔNG có `table-fixed` — cổng đang báo động giả",
      );

      // Ràng buộc thật, tính từ số đo chứ không phải chọn cho đẹp: cột số phải chứa
      // được ô nhập 96px + đệm 2×12px = 120px. Cột hẹp nhất trong 3 cột số là cột
      // quyết định. `min-w` phải đủ lớn để tỉ lệ đó không bóp ô nhập.
      const mw = src.match(/<table[^>]*min-w-\[(\d+)px\]/);
      assert(
        mw,
        `${rel}: thẻ <table> thiếu \`min-w-[Npx]\` — màn hẹp sẽ bóp cột`,
      );
      const minW = Number(mw[1]);
      const pctNhoNhat = Math.min(...cols.slice(1, 4));
      const rongCot = (minW * pctNhoNhat) / 100;
      assert(
        rongCot >= 120,
        `min-w ${minW}px × ${pctNhoNhat}% = ${rongCot.toFixed(1)}px < 120px — ô nhập (96px + đệm 2×12px) sẽ tràn khỏi ô`,
      );
      // Và `min-w` không được lớn hơn khung hẹp nhất có sidebar thật, nếu không sẽ
      // sinh cuộn ngang. Đo ở màn 1024px: 1024 − 256 − 2×32 − 15 (thanh cuộn) − 2.
      const khungHepNhat = 1024 - 256 - 64 - 15 - 2;
      assert(
        minW <= khungHepNhat,
        `min-w ${minW}px > ${khungHepNhat}px (khung hẹp nhất ở màn 1024px) — bảng phải cuộn ngang`,
      );

      return {
        detail: `table-fixed · 5 cột ${cols.join("/")}% · min-w ${minW}px ≥ ${rongCot.toFixed(0)}px/cột`,
      };
    },
  );

  await test(
    "S-22",
    "TC-3c.3 — Trình sửa bài chỉ ghi qua HÀM, không ghi thẳng bảng nội dung",
    () => {
      // 🔴 VÌ SAO PHẢI CÓ CỔNG NÀY. `content_lessons` có policy `FOR ALL` cho admin,
      // nên một `.update()` viết thẳng từ trình duyệt **vẫn chạy trơn**. Nhưng nó đổi
      // bài mà KHÔNG sinh phiên bản và KHÔNG tăng `content_version` ⇒ mất đường hoàn
      // tác, và app của bé không biết nội dung đã đổi nên vẫn dùng cache cũ.
      // Không có triệu chứng nào để nhìn ra: màn hình admin hiện đúng nội dung mới.
      //
      // Cách kiểm: dò THẲNG CHUỖI GỌI, không cắt theo đoạn.
      //
      // 🔴 Luật phải đòi thao tác ghi "nối sau một dấu `)` " — tức là nối tiếp một
      // lời gọi trước đó. Bản đầu tôi chỉ tìm `.delete(` trong đoạn chứa
      // `.from("content_lessons")` và nó **bắt nhầm `Set.delete()`** dùng để đóng/mở
      // nhánh trong `doiMo` — y hệt cái bẫy đã gặp ở `S-18`. `Set.prototype.delete`
      // viết ra giống hệt một lệnh xoá của PostgREST; chỗ khác nhau duy nhất là
      // trước dấu `.` — ở chuỗi gọi thật luôn là `)`.
      const BANG_CAM =
        "content_lessons|content_lesson_versions|content_grades|content_chapters";

      const quet = (src) => [
        ...src.matchAll(
          new RegExp(
            `\\.from\\(\\s*["'](?:${BANG_CAM})["']\\s*\\)(?:[\\s\\S]{0,300}?\\))?\\s*\\.\\s*(insert|update|upsert|delete)\\s*\\(`,
            "g",
          ),
        ),
      ];

      // ── Canary bốn vế ──
      assert(
        quet(`await supabase.from("content_lessons").update({ title: "x" })`)
          .length === 1,
        "Cổng S-22 không bắt được mẫu ghi thẳng giả — cổng đang vô dụng",
      );
      assert(
        quet(`await supabase.from("content_lessons").eq("id", 1).delete()`)
          .length === 1,
        "Cổng S-22 không bắt được mẫu ghi thẳng có lọc ở giữa",
      );
      assert(
        quet(
          `await supabase.from("content_lessons").select("id");\n` +
            `const moi = new Set(cu); moi.delete(id);`,
        ).length === 0,
        "Cổng S-22 bắt nhầm `Set.delete()` — cổng đang báo động giả, sẽ bị bỏ qua",
      );
      assert(
        quet(`await supabase.from("content_lesson_drafts").delete().eq("a", 1)`)
          .length === 0,
        "Cổng S-22 bắt nhầm thao tác HỢP LỆ trên bảng nháp",
      );

      const viPham = [];
      for (const rel of [
        "admin/src/components/LessonEditor.jsx",
        "admin/src/pages/ContentPage.jsx",
      ]) {
        assert(exists(rel), `Không thấy ${rel}`);
        if (quet(read(rel)).length > 0) viPham.push(rel);
      }
      assert(
        viPham.length === 0,
        `${viPham.join(", ")} ghi THẲNG vào bảng nội dung — phải gọi hàm ` +
          `(save_lesson_draft / publish_lesson / rollback_lesson / set_lesson_status) ` +
          `để còn sinh phiên bản và tăng content_version`,
      );

      // Phải THẬT SỰ gọi đủ 4 hàm, nếu không thì cổng trên chỉ là "không làm gì cả"
      const editor = read("admin/src/components/LessonEditor.jsx");
      for (const ten of [
        "save_lesson_draft",
        "publish_lesson",
        "rollback_lesson",
        "set_lesson_status",
      ])
        assert(
          editor.includes(`rpc("${ten}"`),
          `LessonEditor.jsx không gọi \`${ten}\``,
        );

      // ── Migration 0009 ──
      const sql = read("supabase/migrations/0009_content_drafts.sql");

      assert(
        /ALTER TABLE public\.content_lesson_drafts ENABLE ROW LEVEL SECURITY/.test(
          sql,
        ),
        "0009 chưa bật RLS cho bảng nháp",
      );
      assert(
        /CREATE POLICY "content_lesson_drafts_admin_all"[\s\S]{0,200}?public\.is_admin\(\)/.test(
          sql,
        ),
        "0009 thiếu policy chỉ-admin cho bảng nháp",
      );
      assert(
        !/\bTO anon\b/.test(sql),
        "0009 cấp quyền cho `anon` — bảng nháp và các hàm publish phải chặn khách",
      );

      // 🔴 Cặp REVOKE/GRANT. `REVOKE ALL ... FROM PUBLIC` lấy LUÔN quyền gọi của
      // `authenticated`, nên nếu không cấp lại thì **admin cũng không gọi được hàm
      // nào** — tính năng chết với "permission denied for function". Đã mắc đúng lỗi
      // này khi viết 0009; mẫu đúng nằm ở `0007` (revoke PUBLIC rồi grant authenticated).
      const soRevoke = (sql.match(/REVOKE ALL ON FUNCTION/g) || []).length;
      const soGrant = (sql.match(/GRANT EXECUTE ON FUNCTION/g) || []).length;
      assert(
        soRevoke === 6 && soGrant === 6,
        `0009 có ${soRevoke} REVOKE nhưng ${soGrant} GRANT — hàm bị revoke mà không ` +
          `cấp lại thì ADMIN cũng không gọi được`,
      );

      return {
        detail:
          "0 chỗ ghi thẳng bảng nội dung · 4 hàm RPC · 0009: 6 revoke + 6 grant, không cấp cho anon",
      };
    },
  );

  await test(
    "S-23",
    "TC-3c.2 — Trình sửa bài: form sinh từ schema, và không làm biến dạng dữ liệu",
    async () => {
      // 🔴 HAI RỦI RO THẬT CỦA MỘT EDITOR, VÀ KHÔNG CÁI NÀO LỘ RA KHI NHÌN:
      //
      // (1) NUỐT KHOÁ. Form viết tay mà quên một khoá thì khi bấm Lưu, khoá đó biến
      //     mất khỏi slide. Slide vẫn hợp lệ, vẫn qua `contentSchema` — chỉ là phần
      //     nội dung đó không còn. Nên form phải SINH TỪ `SLIDE_TYPES`.
      // (2) ĐỔI KIỂU. `options` là `array<number>` ở phần lớn câu hỏi. Nếu editor ghi
      //     ra `["4"]` thay vì `[4]` thì `options.includes(answer)` không khớp nữa ⇒
      //     câu đó KHÔNG BAO GIỜ chấm đúng, mà không có lỗi nào hiện ra.
      //
      // Nên cổng này `import()` thẳng `soanBai.js` và thử hành vi thật.
      const sb = await import(
        new URL("../admin/src/lib/soanBai.js", import.meta.url)
      );
      const { SLIDE_TYPES, SLIDE_TYPE_NAMES, validateSlide } = await import(
        new URL("../admin/src/lib/contentSchema.js", import.meta.url)
      );

      // ── (1) Form phải có ĐỦ khoá của schema ──
      const thieu = [];
      for (const type of SLIDE_TYPE_NAMES) {
        const kieu = SLIDE_TYPES[type];
        const can = new Set([
          ...Object.keys(kieu.batBuoc),
          ...Object.keys(kieu.tuyChon ?? {}),
        ]);
        const co = new Set(
          sb.truongCuaSlide({ type, content: {} }).map((t) => t.khoa),
        );
        for (const k of can) if (!co.has(k)) thieu.push(`${type}.${k}`);
      }
      assert(
        thieu.length === 0,
        `Form sửa bài THIẾU khoá (bấm Lưu là mất nội dung): ${thieu.join(", ")}`,
      );

      // ── (2) `mauMangObject` phải khai đúng theo DỮ LIỆU THẬT ──
      // Đo trên 1505 slide thật: khoá nào đang chứa mảng OBJECT thì phải được khai
      // trong `mangObject`, nếu không editor sẽ cho sửa bằng "mỗi dòng một ý" và ghi
      // ra mảng CHUỖI ở chỗ `LessonPage` cần object.
      const saiKieu = new Set();
      const files = [
        ["grade1Data.js", "grade1Data"],
        ["grade2Data.js", "grade2Data"],
        ["grade3Data.js", "grade3Data"],
        ["grade4Data.js", "grade4Data"],
        ["grade5Data.js", "grade5Data"],
      ];
      let soSlide = 0;
      for (const [file, key] of files) {
        const mod = await import(
          new URL(`../client/src/data/${file}`, import.meta.url)
        );
        for (const ch of mod[key].chapters) {
          for (const lesson of ch.lessons) {
            for (const s of lesson.slides ?? []) {
              soSlide++;
              const khai = SLIDE_TYPES[s.type]?.mangObject ?? [];
              for (const [k, v] of Object.entries(s.content ?? {})) {
                if (!Array.isArray(v) || v.length === 0) continue;
                if (
                  v.every((x) => x && typeof x === "object") &&
                  !khai.includes(k)
                )
                  saiKieu.add(`${s.type}.${k}`);
              }
            }
          }
        }
      }
      assert(
        soSlide === 2455,
        `Mong đợi 2455 slide, đọc được ${soSlide} — bộ đọc dữ liệu tĩnh đã hỏng`,
      );
      assert(
        saiKieu.size === 0,
        `Khoá chứa mảng OBJECT nhưng KHÔNG khai trong \`mangObject\` ⇒ editor sẽ ghi ` +
          `sai kiểu: ${[...saiKieu].join(", ")}`,
      );

      // ── (3) Giữ nguyên kiểu số của `options` ──
      const quizSo = {
        type: "quiz",
        content: {
          question: "2+2?",
          options: [3, 4, 5],
          answer: 4,
          mascotHint: "h",
        },
      };
      const rt = sb.phanTich(
        sb.DANG.MANG_CHUOI,
        "3\n4\n5",
        sb.mangToanSo(quizSo, "options"),
      );
      assert(rt.ok, `Phân tích mảng số bị từ chối: ${rt.loi}`);
      assert(
        JSON.stringify(rt.giaTri) === JSON.stringify([3, 4, 5]),
        `Mảng số bị đổi kiểu thành ${JSON.stringify(rt.giaTri)} — đáp án sẽ không còn ` +
          `khớp \`options\`, câu hỏi không bao giờ chấm đúng`,
      );

      const quizChuoi = {
        type: "quiz",
        content: {
          question: "q",
          options: ["a", "b"],
          answer: "a",
          mascotHint: "h",
        },
      };
      const rtChuoi = sb.phanTich(
        sb.DANG.MANG_CHUOI,
        "a\nb",
        sb.mangToanSo(quizChuoi, "options"),
      );
      assert(
        JSON.stringify(rtChuoi.giaTri) === JSON.stringify(["a", "b"]),
        `Mảng chuỗi bị đổi kiểu: ${JSON.stringify(rtChuoi.giaTri)}`,
      );

      // Gõ chữ vào mảng số ⇒ phải TỪ CHỐI, không được âm thầm ghi ra chuỗi
      const loiKieu = sb.phanTich(sb.DANG.MANG_CHUOI, "3\nbốn", true);
      assert(
        !loiKieu.ok,
        "Gõ chữ vào mảng toàn số mà KHÔNG báo lỗi — kiểu sẽ bị đổi âm thầm",
      );

      // ── (4) JSON hỏng phải bị từ chối, JSON đúng phải đi qua nguyên vẹn ──
      assert(
        !sb.phanTich(sb.DANG.JSON, "{ hỏng", []).ok,
        "JSON hỏng mà không báo lỗi",
      );
      const obj = sb.phanTich(sb.DANG.JSON, '[{"a":1,"b":[2,3]}]', []);
      assert(
        obj.ok && obj.giaTri[0].b[1] === 3,
        "JSON hợp lệ bị làm biến dạng khi đi qua ô nhập",
      );

      // ── (5) Xoá khoá có CẶP phải xoá cả hai ──
      const coCap = {
        type: "concept",
        content: {
          badge: "b",
          title: "t",
          shape: "cube",
          shapeLabel: "Khối lập phương",
        },
      };
      const sau = sb.boTruong(coCap, "shape");
      assert(
        !("shape" in sau.slide.content) && !("shapeLabel" in sau.slide.content),
        "Xoá `shape` mà để lại `shapeLabel` — cặp khoá lệch, bộ kiểm tra sẽ báo lỗi",
      );
      assert(
        "shape" in coCap.content,
        "`boTruong` sửa thẳng object gốc — sửa hỏng thì không lùi lại được",
      );

      // ── (6) Slide mới phải có ĐỦ khoá bắt buộc (không thì Lưu là lỗi ngay) ──
      const thieuMoi = [];
      for (const type of SLIDE_TYPE_NAMES) {
        const moi = sb.slideMoi(type);
        if (!moi) {
          thieuMoi.push(`${type}: không tạo được`);
          continue;
        }
        for (const k of Object.keys(SLIDE_TYPES[type].batBuoc))
          if (!(k in moi.content)) thieuMoi.push(`${type}.${k}`);
        // và phải qua được bộ kiểm tra ở mức "không thiếu khoá / đúng kiểu"
        const loi = validateSlide(moi, "slide mới").filter(
          (l) => !/rỗng|KHÔNG nằm trong/.test(l),
        );
        if (loi.length) thieuMoi.push(`${type}: ${loi[0]}`);
      }
      assert(
        thieuMoi.length === 0,
        `Slide mới tạo ra không hợp lệ: ${thieuMoi.join(", ")}`,
      );

      // ── (7) Cảnh báo ô trống phải có, mà vẫn phải LƯU ĐƯỢC ──
      const trong = {
        id: "g1-c1-l1",
        title: "T",
        description: "",
        lesson_type: "learn",
        payload: {
          slides: [
            { type: "story", content: { mascotMood: "happy", text: "  " } },
          ],
        },
      };
      assert(
        sb.canhBaoRong(trong).length === 1,
        "Ô bắt buộc để trống mà không cảnh báo gì",
      );
      assert(
        sb.kiemTraBai(trong).length === 0,
        "Cảnh báo ô trống lại CHẶN lưu — sẽ khoá luôn việc sửa những chỗ khác của bài",
      );

      return {
        detail: `${SLIDE_TYPE_NAMES.length} kiểu · ${soSlide} slide · không nuốt khoá · giữ nguyên kiểu số`,
      };
    },
  );

  await test(
    "S-24",
    "TC-3d.2 — Cây dựng từ DÒNG DB giống hệt cây FILE TĨNH (so từng khoá)",
    async () => {
      // 🔴 VÌ SAO PHẢI SO TỪNG KHOÁ, KHÔNG CHỈ ĐẾM TỔNG:
      // Cây dựng từ DB là thứ app của bé ĐỌC THAY cho file tĩnh ở lát 3d. Thiếu một
      // khoá thì **không có lỗi nào hiện ra** — chỉ là chỗ đó `undefined`. Ví dụ có
      // thật trong dự án: `ParentDashboard` in `{gr.name} ({gr.ageRange})`, nên thiếu
      // `ageRange` là phụ huynh thấy `Lớp 1 ()`. Phải thêm hẳn migration `0010` chỉ
      // vì một khoá đó — nên cổng này tồn tại để lần sau không phải phát hiện bằng
      // cách mở màn hình phụ huynh ra xem.
      //
      // Cách kiểm: lấy CHÍNH 5 file tĩnh, trải ra thành đúng hình dạng dòng DB mà
      // `scripts/migrate-content.mjs` ghi (chép lại y hệt cách map), dựng cây, rồi so
      // với cây gốc. Không cần DB, không cần mạng.
      const { cayHopLe, demCay, dungCay } = await import(
        new URL("../client/src/data/dungCayNoiDung.js", import.meta.url)
      );

      const files = [
        ["grade1Data.js", "grade1Data"],
        ["grade2Data.js", "grade2Data"],
        ["grade3Data.js", "grade3Data"],
        ["grade4Data.js", "grade4Data"],
        ["grade5Data.js", "grade5Data"],
      ];

      const gradeRows = [];
      const chapterRows = [];
      const lessonRows = [];
      const goc = [];

      for (const [file, key] of files) {
        const mod = await import(
          new URL(`../client/src/data/${file}`, import.meta.url)
        );
        const g = mod[key];
        goc.push(g);

        gradeRows.push({
          id: g.id,
          name: g.name,
          description: g.description ?? null,
          icon: g.icon ?? null,
          color: g.color ?? null,
          age_range: g.ageRange ?? null,
          sort_order: gradeRows.length,
        });

        g.chapters.forEach((ch, iCh) => {
          chapterRows.push({
            id: ch.id,
            grade_id: g.id,
            name: ch.name,
            description: ch.description ?? null,
            icon: ch.icon ?? null,
            color: ch.color ?? null,
            sort_order: iCh,
            // 🔴 CỐ Ý không có `totalLessons` — khớp với quyết định ở `0008`.
          });

          ch.lessons.forEach((l, iL) => {
            lessonRows.push({
              id: l.id,
              chapter_id: ch.id,
              title: l.title,
              lesson_type: l.type ?? "learn",
              description: l.description ?? null,
              sort_order: iL,
              status: "published",
              payload: { slides: l.slides },
            });
          });
        });
      }

      /** So từng khoá, trả về danh sách chỗ lệch. */
      const soSanh = (a, b) => {
        const lech = [];
        const khac = (nhan, x, y) => {
          if (x !== y)
            lech.push(
              `${nhan}: tĩnh=${JSON.stringify(x)} DB=${JSON.stringify(y)}`,
            );
        };
        for (let i = 0; i < a.length; i++) {
          const ga = a[i];
          const gb = b[i];
          if (!gb) {
            lech.push(`thiếu hẳn lớp ${ga.id}`);
            continue;
          }
          for (const k of [
            "id",
            "name",
            "description",
            "icon",
            "color",
            "ageRange",
          ])
            khac(`lớp ${ga.id}.${k}`, ga[k], gb[k]);

          for (let j = 0; j < ga.chapters.length; j++) {
            const ca = ga.chapters[j];
            const cb = gb.chapters?.[j];
            if (!cb) {
              lech.push(`thiếu chương ${ca.id}`);
              continue;
            }
            for (const k of ["id", "name", "description", "icon", "color"])
              khac(`chương ${ca.id}.${k}`, ca[k], cb[k]);
            if ("totalLessons" in cb)
              lech.push(
                `chương ${cb.id}: cây DB có \`totalLessons\` — phải bỏ`,
              );
            if ((ca.lessons?.length ?? 0) !== (cb.lessons?.length ?? 0)) {
              lech.push(
                `chương ${ca.id}: ${ca.lessons?.length ?? 0} bài tĩnh vs ${cb.lessons?.length ?? 0} bài DB`,
              );
              continue;
            }
            for (let k2 = 0; k2 < ca.lessons.length; k2++) {
              const la = ca.lessons[k2];
              const lb = cb.lessons[k2];
              for (const k of ["id", "title", "type", "description"])
                khac(`bài ${la.id}.${k}`, la[k], lb[k]);
              if (JSON.stringify(la.slides) !== JSON.stringify(lb.slides))
                lech.push(`bài ${la.id}: nội dung slide khác`);
            }
          }
        }
        return lech;
      };

      const cay = dungCay(gradeRows, chapterRows, lessonRows);

      assert(cayHopLe(cay), "Cây dựng từ dòng DB không hợp lệ");

      const d = demCay(cay);
      assert(
        d.lop === 5 && d.chuong === 51 && d.bai === 459 && d.slide === 2455,
        `Cây DB sai quy mô: ${d.lop}/${d.chuong}/${d.bai}/${d.slide} — mong đợi 5/51/459/2455`,
      );

      const lech = soSanh(goc, cay);
      assert(
        lech.length === 0,
        `${lech.length} chỗ lệch giữa cây DB và cây tĩnh — 3 chỗ đầu: ${lech.slice(0, 3).join(" ;; ")}`,
      );

      // ── Canary: phép so sánh PHẢI bắt được đúng lỗi mà `0010` sinh ra để chữa ──
      const thieuTuoi = soSanh(
        goc,
        dungCay(
          gradeRows.map((g) => ({ ...g, age_range: null })),
          chapterRows,
          lessonRows,
        ),
      );
      assert(
        thieuTuoi.some((l) => l.includes("ageRange")),
        "Cổng S-24 không bắt được lỗi thiếu `ageRange` — mà đó chính là lỗi đã có thật",
      );
      const thieuSlide = soSanh(
        goc,
        dungCay(
          gradeRows,
          chapterRows,
          lessonRows.map((l, i) =>
            i === 0 ? { ...l, payload: { slides: [] } } : l,
          ),
        ),
      );
      assert(
        thieuSlide.some((l) => l.includes("slide")),
        "Cổng S-24 không bắt được slide bị mất",
      );

      // ── `curriculum.js` phải LẤY DỮ LIỆU QUA `contentSource.js` ──
      const cur = read("client/src/data/curriculum.js");
      assert(
        /from "\.\/contentSource\.js"/.test(cur),
        "curriculum.js không lấy dữ liệu qua contentSource.js — lát 3d chưa nối vào",
      );
      assert(
        /get grades\(\)/.test(cur),
        "`curriculum.grades` không phải getter — nguồn đổi xong app vẫn đọc mảng cũ",
      );
      assert(
        !/grade\dData\.js/.test(cur),
        "curriculum.js vẫn import trực tiếp file tĩnh — hai nguồn sự thật cho cùng một thứ",
      );

      return {
        detail: `${d.lop} lớp · ${d.chuong} chương · ${d.bai} bài · ${d.slide} slide — khớp từng khoá · canary bắt được lỗi ageRange`,
      };
    },
  );

  await test(
    "S-25",
    "TC-3d.7 — Nội dung mới hiện ra khi bé quay lại app, nhưng KHÔNG cắt ngang bài đang học",
    async () => {
      // 🔴 VÌ SAO CỔNG NÀY TỒN TẠI — đây là lỗi đo được, không phải lo xa:
      // Bản đầu chỉ nạp nội dung MỘT lần lúc khởi động. Đo thật: bé mở app ở trang
      // chương, admin publish, chờ 6 giây → tiêu đề vẫn cũ, mãi mãi. Admin sửa bài mà
      // app không bao giờ biết thì tính năng 3c coi như vô nghĩa.
      // Bản vá có hai nửa, và nửa nào cũng dễ bị xoá nhầm khi refactor:
      //   (a) quay lại tab ⇒ kiểm lại `content_version`  → `App.jsx`
      //   (b) đổi cây xong ⇒ báo render lại, TRỪ KHI đang mở bài → `contentSource.js`
      // Nửa (b) mà thiếu điều kiện loại trừ thì đang học dở mà cây đổi, bé bị đẩy về
      // slide 1 — nên phải kiểm cả hai chiều.
      const src = read("client/src/data/contentSource.js");
      const app = read("client/src/App.jsx");
      const bai = read("client/src/pages/LessonPage.jsx");

      const coChan = (t) => /if \(dangTrongBaiHoc\) return;/.test(t);
      assert(
        coChan(src),
        "`phatThayDoi()` thiếu chốt `if (dangTrongBaiHoc) return;` — publish giữa lúc bé đang học sẽ đẩy bé về slide 1",
      );
      assert(
        !coChan(src.replace(/if \(dangTrongBaiHoc\) return;/, "")),
        "Cổng S-25 không nhận ra chốt `dangTrongBaiHoc` bị xoá",
      );

      const demBao = (t) => (t.match(/^\s*phatThayDoi\(\);/gm) ?? []).length;
      assert(
        demBao(src) >= 2,
        `Chỉ thấy ${demBao(src)} chỗ gọi \`phatThayDoi()\` — cần cả nhánh nạp từ DB lẫn nhánh quay về nội dung tĩnh`,
      );
      const bot1 = src.replace(/\n\s*phatThayDoi\(\);/, "");
      assert(
        demBao(bot1) < 2,
        "Cổng S-25 đếm sai: bỏ hẳn 1 lời gọi mà vẫn coi là đủ",
      );

      assert(
        /export function ngheNoiDung/.test(src) &&
          /export function baoDangTrongBaiHoc/.test(src),
        "contentSource.js thiếu `ngheNoiDung`/`baoDangTrongBaiHoc` — app không có cách nào biết nội dung đã đổi",
      );

      const coKiemLai = (t) =>
        /visibilityState === "visible"[\s\S]{0,240}?taiNoiDung\(\)/.test(t);
      assert(
        coKiemLai(app),
        "`App.jsx` không gọi `taiNoiDung()` khi quay lại tab — nội dung mới chỉ hiện sau khi tải lại trang",
      );
      assert(
        !coKiemLai(app.replace(/taiNoiDung\(\);/g, "preloadRewardConfigs();")),
        "Cổng S-25 không nhận ra lời gọi kiểm lại nội dung bị gỡ",
      );
      assert(
        /ngheNoiDung\(/.test(app),
        "`App.jsx` không đăng ký nghe thay đổi nội dung — cây đổi trong bộ nhớ mà màn hình đứng yên",
      );

      // ── Nửa (c): kiểm lại khi bé ĐỔI MÀN HÌNH ──
      // 🔴 Đo được: app chỉ hỏi lúc khởi động và lúc quay lại tab, nên bé ngồi ở một
      // màn hình thì bài admin vừa rút **vẫn hiện** mãi (chờ 8s, cây không đổi, cache
      // đứng ở 12). Bé thì bấm đổi màn hình liên tục — hỏi thêm ở đó là mốc rẻ nhất.
      const demEffect = (t) =>
        [
          ...t.matchAll(/useEffect\(\(\) => \{([\s\S]*?)\}, \[([^\]]*)\]\);/g),
        ].map((m) => ({ body: m[1], deps: m[2] }));
      const coKiemTheoManHinh = (t) =>
        demEffect(t).some(
          (e) =>
            /taiNoiDung\(\)/.test(e.body) && /location\.pathname/.test(e.deps),
        );
      assert(
        coKiemTheoManHinh(app),
        "`App.jsx` không gọi `taiNoiDung()` khi bé đổi màn hình — bé ngồi ở một màn hình là không bao giờ thấy nội dung vừa sửa",
      );
      assert(
        !coKiemTheoManHinh(app.replace("}, [location.pathname]);", "}, []);")),
        "Cổng S-25 không nhận ra lời gọi kiểm lại theo màn hình bị gỡ",
      );

      // 🔴 Cờ `dangTrongBaiHoc` phải được KHAI lúc vào và GỠ lúc ra.
      //    Bản đầu khai cứng `baoDangTrongBaiHoc(true)`. Từ `TC-3d.10` nó khai theo
      //    `coBaiHoc` — cố ý, và cổng này giữ đúng ý đó: `true` khi bài CÓ THẬT (đang
      //    học thì cây không được đổi giữa bài), nhưng phải `false` khi KHÔNG tìm thấy
      //    bài — nếu khai cứng `true` thì màn hình "không tìm thấy bài" tự khoá luôn
      //    đường tự chữa của nó (cây mới về mà không ai vẽ lại).
      const coKhaiCo = (src) =>
        /baoDangTrongBaiHoc\((true|coBaiHoc)\)/.test(src) &&
        /return \(\) => baoDangTrongBaiHoc\(false\)/.test(src);

      assert(
        coKhaiCo(bai),
        "`LessonPage.jsx` không khai lúc vào/ra bài — cờ `dangTrongBaiHoc` sẽ đứng nguyên một giá trị",
      );
      assert(
        !coKhaiCo(
          bai.replace(
            /baoDangTrongBaiHoc\(coBaiHoc\)/,
            "baoDangTrongBaiHoc(false)",
          ),
        ),
        "Cổng S-25 không nhận ra việc khai cờ bị gỡ",
      );
      assert(
        /const coBaiHoc = Boolean\(found\)/.test(bai) &&
          /if \(coBaiHoc\) return;/.test(bai),
        '`LessonPage` phải khai cờ theo `coBaiHoc` — màn hình "không tìm thấy bài" cần cờ `false` để cây mới về được và tự vẽ lại',
      );

      return {
        detail: `chốt đang-học ✓ · ${demBao(src)} chỗ báo đổi · kiểm lại: quay về tab ✓ + đổi màn hình ✓`,
      };
    },
  );

  await test(
    "S-26",
    "TC-3c.10 — Trang Tham khảo: chỉ ĐỌC, và KHÔNG nói sai về app",
    async () => {
      // 🔴 VÌ SAO CẦN CỔNG NÀY. Trang `/reference` tồn tại để người dùng tra cứu
      // trước khi chọn trong trình sửa bài. Nó chỉ có giá trị khi nói ĐÚNG về app —
      // mà một trang chữ nghĩa thì không ai phát hiện được là đã sai. Ba thứ dễ
      // hỏng âm thầm nhất:
      //   (1) bảng "Biểu cảm linh vật" lệch với từ vựng chung `mascotFaces.js` —
      //       hoặc đúng giá trị nhưng ghi sai MẶT của giá trị đó
      //   (2) thiếu nhãn tiếng Việt cho một kiểu slide ⇒ ô chọn hiện chữ tiếng Anh
      //   (3) trang tra cứu bị nối vào DB / gọi ghi ⇒ nạp ~800 KB vô ích, và
      //       "trang chỉ đọc" biến thành trang sửa được
      const { MASCOT_MOODS, SLIDE_TYPE_LABELS } = await import(
        new URL("../admin/src/lib/referenceData.js", import.meta.url)
      );
      const { SLIDE_TYPES } = await import(
        new URL("../admin/src/lib/contentSchema.js", import.meta.url)
      );
      const { MASCOT_FACES } = await import(
        new URL("../client/src/data/mascotFaces.js", import.meta.url)
      );
      const page = read("admin/src/pages/ReferencePage.jsx");
      const bai = read("client/src/pages/LessonPage.jsx");

      // ── (1) Bảng biểu cảm ở trang phải KHỚP từ vựng của app: CẢ danh sách giá trị
      //        LẪN mặt của từng giá trị. Một trong hai lệch là người dùng tra sai.
      const giongNhau = (a, b) => a.join("|") === b.join("|");
      const trang = MASCOT_MOODS.map((m) => m.value).sort();
      const app = Object.keys(MASCOT_FACES).sort();
      assert(
        giongNhau(trang, app),
        `Danh sách biểu cảm LỆCH: trang có [${trang.join(", ")}] · từ vựng của app có [${app.join(", ")}]`,
      );
      // Canary hai vế: thừa một giá trị, và thiếu một giá trị.
      assert(
        !giongNhau([...trang, "sad"], app) && !giongNhau(trang, app.slice(1)),
        "Cổng S-26 không phát hiện danh sách biểu cảm bị lệch",
      );

      const saiMat = MASCOT_MOODS.filter(
        (m) => m.face !== MASCOT_FACES[m.value],
      );
      assert(
        saiMat.length === 0,
        `Trang ghi SAI MẶT cho: ${saiMat
          .map(
            (m) =>
              `${m.value} (trang ${m.face} · app ${MASCOT_FACES[m.value]})`,
          )
          .join(", ")} — bé sẽ thấy mặt khác với thứ trang nói`,
      );
      // Canary: đổi mặt của 1 dòng thì phép kiểm phải bắt được ĐÚNG 1 dòng.
      assert(
        MASCOT_MOODS.map((m, i) => (i === 0 ? { ...m, face: "?" } : m)).filter(
          (m) => m.face !== MASCOT_FACES[m.value],
        ).length === 1,
        "Cổng S-26 không phát hiện mặt bị ghi sai",
      );

      // Trang nói "bé thấy mặt này" — nên slide PHẢI tra qua đúng từ vựng đó.
      assert(
        /faceOf\(content\.mascotMood\)/.test(bai),
        "`StorySlide` không tra mặt qua `faceOf` — trang Tham khảo nói bé thấy mặt trong bảng, nhưng slide có thể đang tự chọn mặt riêng",
      );

      // ── (2) Nhãn kiểu slide phải phủ ĐỦ mọi kiểu trong schema ──
      const thieuNhan = Object.keys(SLIDE_TYPES).filter(
        (t) => !SLIDE_TYPE_LABELS[t],
      );
      assert(
        thieuNhan.length === 0,
        `Thiếu nhãn tiếng Việt cho kiểu slide: ${thieuNhan.join(", ")}`,
      );
      const bo1 = { ...SLIDE_TYPE_LABELS };
      delete bo1[Object.keys(SLIDE_TYPES)[0]];
      assert(
        Object.keys(SLIDE_TYPES).some((t) => !bo1[t]),
        "Cổng S-26 không nhận ra nhãn kiểu slide bị thiếu",
      );

      // ── (3) Trang tra cứu KHÔNG được chạm DB ──
      assert(
        !/from\s*\(\s*["']/.test(page) && !/supabase/i.test(page),
        "Trang Tham khảo có truy vấn Supabase — nạp cả 362 payload (~800 KB) cho một trang tra cứu là không đáng, và 'trang chỉ đọc' sẽ thành trang sửa được",
      );
      assert(
        !/logAudit/.test(page) &&
          !/\b(insert|update|upsert|delete)\s*\(/.test(page),
        "Trang Tham khảo có thao tác ghi",
      );

      return {
        detail: `chỉ đọc ✓ · ${app.length} biểu cảm khớp app (cả mặt) · ${Object.keys(SLIDE_TYPES).length} kiểu slide đủ nhãn`,
      };
    },
  );

  await test(
    "S-27",
    "TC-3c.11 — Tạo bài mới: qua HÀM, khoá cho khách, và luôn ở trạng thái `nháp`",
    () => {
      // 🔴 VÌ SAO PHẢI CÓ CỔNG NÀY. Nút "Thêm bài" là thao tác GHI đầu tiên tạo ra
      // DÒNG MỚI trong bảng nội dung. Ba thứ có thể hỏng mà KHÔNG có triệu chứng nào:
      //   (1) quên `REVOKE ... FROM anon` ⇒ khách tạo được bài. Đúng cái bẫy đã sập ở
      //       `0012`: Supabase cấp EXECUTE thẳng cho `anon` bằng DEFAULT PRIVILEGES,
      //       nên `REVOKE ... FROM PUBLIC` KHÔNG gỡ được.
      //   (2) quên `GRANT ... TO authenticated` ⇒ admin cũng không tạo được, nút chết
      //       với "permission denied for function". Bẫy đã sập ở `0009`.
      //   (3) bài mới lỡ để `status = 'published'` ⇒ bài 1 slide giữ chỗ LỘ RA CHO BÉ
      //       ngay lúc bấm Tạo.
      const sql = read(
        "supabase/migrations/0013_content_report_and_create_lesson.sql",
      );
      const page = read("admin/src/pages/ContentPage.jsx");

      const chanAnon =
        /REVOKE ALL ON FUNCTION public\.create_lesson\([^)]*\)\s+FROM anon;/;
      const capAuth =
        /GRANT EXECUTE ON FUNCTION public\.create_lesson\([^)]*\)\s+TO authenticated;/;
      const laNhap = /v_sort,\s*'draft',\s*v_payload/;

      assert(
        chanAnon.test(sql),
        "0013 thiếu `REVOKE ... FROM anon` cho create_lesson — Supabase cấp EXECUTE thẳng cho anon bằng DEFAULT PRIVILEGES, nên REVOKE khỏi PUBLIC KHÔNG gỡ được",
      );
      assert(
        capAuth.test(sql),
        "0013 thiếu `GRANT EXECUTE ... TO authenticated` cho create_lesson — admin sẽ không tạo được bài nào",
      );
      assert(
        laNhap.test(sql),
        "create_lesson không chèn bài mới ở trạng thái 'draft' — bài 1 slide giữ chỗ sẽ lộ ra cho bé",
      );

      // Canary ba vế: gỡ từng thứ thì phép kiểm phải bắt được.
      assert(
        !chanAnon.test(sql.replace(/FROM anon;/, "FROM PUBLIC;")),
        "Cổng S-27 không nhận ra `REVOKE ... FROM anon` bị gỡ",
      );
      assert(
        !capAuth.test(sql.replace(/TO authenticated;/, "TO PUBLIC;")),
        "Cổng S-27 không nhận ra `GRANT ... TO authenticated` bị gỡ",
      );
      assert(
        !laNhap.test(
          sql.replace(/'draft',\s*v_payload/, "'published', v_payload"),
        ),
        "Cổng S-27 không nhận ra trạng thái `nháp` của bài mới bị đổi",
      );

      // Và nút phải THẬT SỰ gọi hàm — nếu không thì cổng trên chỉ đang canh một hàm chết.
      assert(
        /rpc\(\s*"create_lesson"/.test(page),
        "ContentPage.jsx không gọi `create_lesson` — nút Thêm bài chưa nối vào đâu",
      );
      assert(
        /Thêm bài học vào chương này/.test(page),
        "Không thấy nút `Thêm bài học vào chương này` trong ContentPage.jsx",
      );
      assert(
        /createLesson\(c\.id\)/.test(page),
        "Nút `Tạo bài` không gọi hàm `createLesson`",
      );

      return {
        detail:
          "khoá cho khách ✓ · cấp lại cho admin ✓ · bài mới luôn `draft` ✓ · nút có gọi hàm ✓",
      };
    },
  );

  await test(
    "S-28",
    "TC-3d.9 — Bé BÁO phiên bản nội dung lên DB (không chỉ là có cột)",
    () => {
      // 🔴 VÌ SAO CẦN CỔNG NÀY. `D-19` chỉ chứng minh **3 cột đã tồn tại**. Có cột mà
      // không ai ghi vào thì tính năng im lặng không chạy: hồ sơ bé luôn hiện "chưa
      // báo", và KHÔNG có triệu chứng nào khác để lần ra. Cái dễ bị gỡ nhất khi refactor
      // `syncService` là dòng `...contentReport()` trong câu upsert `child_progress` —
      // gỡ nó đi thì code vẫn chạy, build vẫn xanh, cổng DB vẫn xanh.
      const sync = read("client/src/services/syncService.js");
      const sql = read(
        "supabase/migrations/0013_content_report_and_create_lesson.sql",
      );

      // Điều kiện đủ: (a) có hàm dựng báo cáo, (b) nó đọc ĐÚNG hai nguồn sự thật đã có
      // từ lát 3d, (c) báo cáo được trải vào câu upsert của `child_progress`.
      // 🔴 Nhận CẢ HAI kiểu nháy: prettier của repo này chuẩn hoá `'…'` → `"…"`, nên một
      // cổng chỉ nhận nháy đơn sẽ đỏ oan ngay sau lần format đầu tiên — đúng cái đã xảy
      // ra ở bản đầu của chính cổng này.
      const coBao = (src) =>
        /function contentReport\(\)/.test(src) &&
        /content_version:\s*layPhienBan\(\)/.test(src) &&
        /content_source:\s*layNguon\(\)/.test(src) &&
        /\.from\(["']child_progress["']\)[\s\S]{0,500}?\.upsert\(\{[\s\S]{0,800}?\.\.\.contentReport\(\)/.test(
          src,
        );

      assert(
        coBao(sync),
        '`syncService.js` không gửi phiên bản nội dung lên `child_progress` — 3 cột sẽ mãi rỗng và hồ sơ bé luôn hiện "chưa báo"',
      );

      // `syncService` ghi vào `child_progress` ở HAI đường: đường nhập dữ liệu máy khách
      // lên tài khoản, và đường đồng bộ thường. Một cổng chỉ kiểm "có ít nhất một chỗ báo"
      // sẽ xanh oan khi refactor gỡ mất chỗ còn lại — mà thiếu chỗ đó thì chính đường bé
      // dùng hằng ngày lại không báo gì. Nên đếm: số chỗ báo phải bằng số chỗ ghi.
      const soChoGhi = (
        sync.match(
          /\.from\(["']child_progress["']\)[\s\S]{0,400}?\.upsert\(\{/g,
        ) || []
      ).length;
      const soChoBao = (sync.match(/\.\.\.contentReport\(\),/g) || []).length;

      assert(
        soChoGhi >= 1,
        "`syncService.js` không còn câu upsert nào vào `child_progress` — cổng S-28 cần đọc lại mã mới",
      );
      assert(
        soChoBao === soChoGhi,
        `có ${soChoGhi} chỗ ghi vào \`child_progress\` nhưng ${soChoBao} chỗ gửi kèm phiên bản nội dung — chỗ còn thiếu sẽ để 3 cột rỗng`,
      );

      // Canary 1: gỡ HẾT dòng trải ra (không phải một chỗ) thì phép kiểm phải đỏ.
      const goHet = sync.replace(/\.\.\.contentReport\(\),/g, "");
      assert(
        !coBao(goHet) &&
          (goHet.match(/\.\.\.contentReport\(\),/g) || []).length === 0,
        "Cổng S-28 không nhận ra dòng `...contentReport()` bị gỡ",
      );
      // Canary 2: giữ đủ số chỗ báo nhưng gỡ ở MỘT chỗ (đúng kiểu refactor sót) — phép
      // đếm phải đỏ.
      const sotMotCho = sync.replace(/\.\.\.contentReport\(\),/, "");
      const soChoBaoSot = (sotMotCho.match(/\.\.\.contentReport\(\),/g) || [])
        .length;
      assert(
        soChoBaoSot !== soChoGhi,
        "Cổng S-28 không nhận ra một chỗ ghi `child_progress` bị sót báo cáo",
      );
      // Canary 3: đổi nguồn số sang một giá trị cứng cũng phải bắt được — nếu không thì
      // cổng chỉ canh chữ, không canh ý.
      assert(
        !coBao(
          sync.replace(
            /content_version:\s*layPhienBan\(\)/,
            "content_version: 21",
          ),
        ),
        "Cổng S-28 không nhận ra số phiên bản bị gán cứng",
      );

      for (const cot of [
        "content_version",
        "content_source",
        "content_seen_at",
      ])
        assert(
          new RegExp(`ADD COLUMN IF NOT EXISTS ${cot}\\b`).test(sql),
          `0013 thiếu cột \`${cot}\` trên child_progress`,
        );

      return {
        detail:
          "có hàm báo cáo ✓ · đọc đúng nguồn từ lát 3d ✓ · trải vào upsert `child_progress` ✓ · đủ 3 cột ✓",
      };
    },
  );

  await test(
    "S-29",
    "TC-3d.10 — Xoá bài thẳng trong DB thì app KHÔNG vỡ (và không im lặng sai)",
    () => {
      // 🔴 VÌ SAO CẦN CỔNG NÀY. Giao diện KHÔNG có nút xoá bài (cố ý — xem `D4`), nên
      // không cổng nào ở trên chạm tới đường xoá. Nhưng xoá bằng SQL thì luôn làm được,
      // và ba thứ dưới đây là điều duy nhất giữ cho việc đó không thành sự cố:
      //
      //   (1) trigger `0014` tăng `content_version` ⇒ máy bé biết mà tải lại. Thiếu nó
      //       thì bài đã xoá VẪN nằm trên máy bé mãi mãi, không lỗi nào hiện ra.
      //   (2) máy bé chịu được `payload` rỗng ⇒ không trắng trang vì `slide.type`.
      //   (3) Admin không coi "0 dòng" là lỗi kỹ thuật ⇒ người dùng hiểu chuyện gì
      //       vừa xảy ra thay vì đọc `PGRST116 … contains 0 rows`.
      const sql = read("supabase/migrations/0014_xoa_bai_hoc_trong_db.sql");
      const baiHoc = read("client/src/pages/LessonPage.jsx");
      const nha = read("client/src/pages/HomePage.jsx");
      const admin = read("admin/src/pages/ContentPage.jsx");

      // ── (1) Trigger ──
      const coTrigger = (src) =>
        /AFTER DELETE ON public\.content_lessons/.test(src) &&
        /PERFORM public\.bump_content_version\(\)/.test(src) &&
        /OLD\.status[^\n]*'published'/.test(src) &&
        /REVOKE ALL ON FUNCTION public\.sau_khi_xoa_bai_hoc\(\) FROM anon;/.test(
          src,
        );

      assert(
        coTrigger(sql),
        "`0014` thiếu một trong bốn phần: trigger `AFTER DELETE` · gọi `bump_content_version()` · chỉ tăng khi bài đã publish · chặn `anon`",
      );
      // Canary 1: đổi sang `AFTER UPDATE` (trigger không bao giờ chạy khi xoá).
      assert(
        !coTrigger(sql.replace("AFTER DELETE ON", "AFTER UPDATE ON")),
        "Cổng S-29 không nhận ra trigger bị đổi thành `AFTER UPDATE`",
      );
      // Canary 2: bỏ `REVOKE ... FROM anon` — đúng bẫy đã sập ở `0012`.
      assert(
        !coTrigger(
          sql.replace(
            "REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM anon;",
            "",
          ),
        ),
        "Cổng S-29 không nhận ra dòng `REVOKE ... FROM anon` bị gỡ",
      );

      // ── (1c) `0017`: trigger KHÔNG được phụ thuộc phiên đăng nhập ─────────────
      // 🔴 Lỗi thật, đo 2026-09-20: `0012` bọc `bump_content_version()` bằng chốt
      // `is_admin()` (để bịt `D-16`), mà `0014`/`0016` cho trigger gọi CHÍNH hàm đó.
      // `is_admin()` = `role='admin' AND id = auth.uid()`; SQL Editor KHÔNG có JWT ⇒
      // `auth.uid()` NULL ⇒ RAISE 42501 — mà lời gọi nằm NGOÀI khối `EXCEPTION` của
      // trigger ⇒ **huỷ luôn cả câu DELETE**. Tức là "xoá bài published bằng SQL thô"
      // thất bại, trái với chính mục tiêu của `0014`.
      // Chú ý mâu thuẫn CÓ CHỦ Ý với khối (1): (1) khẳng định `0014` ĐÃ gọi hàm có
      // chốt admin (đúng sử thi, giữ nguyên), còn (1c) khẳng định bản ĐANG DÙNG
      // (`0017`) thì KHÔNG được gọi như vậy nữa.
      const va = read(
        "supabase/migrations/0017_tang_phien_ban_khong_can_jwt.sql",
      );
      // Chỉ soi từ chỗ ĐỊNH NGHĨA trigger trở đi — phần đầu file là chú thích tả lại
      // lỗi cũ, có trích đúng câu lệnh sai nên không được tính.
      const thanTrigger = (src) =>
        src.slice(src.indexOf("FUNCTION public.sau_khi_xoa_bai_hoc"));
      const coVaI17 = (src) =>
        /CREATE OR REPLACE FUNCTION public\._tang_phien_ban_noi_dung\(\)/.test(
          src,
        ) &&
        /SECURITY DEFINER/.test(src) &&
        /REVOKE ALL ON FUNCTION public\._tang_phien_ban_noi_dung\(\) FROM anon;/.test(
          src,
        ) &&
        /REVOKE ALL ON FUNCTION public\._tang_phien_ban_noi_dung\(\) FROM authenticated;/.test(
          src,
        ) &&
        /IF NOT public\.is_admin\(\) THEN/.test(src) &&
        /PERFORM public\._tang_phien_ban_noi_dung\(\);/.test(src) &&
        !/PERFORM public\.bump_content_version\(\)/.test(thanTrigger(src));

      assert(
        coVaI17(va),
        "`0017` thiếu phần bắt buộc: hàm nội bộ `SECURITY DEFINER` có thu hồi quyền cho cả `anon` lẫn `authenticated` · hàm công khai vẫn giữ chốt `is_admin()` · trigger gọi hàm NỘI BỘ (không gọi hàm có chốt admin)",
      );
      // Canary 3: trigger quay lại gọi hàm có chốt admin ⇒ cổng phải đỏ. Đây đúng là
      // ca `42501` khi xoá bài published bằng SQL thô.
      assert(
        !coVaI17(
          va.replace(
            /PERFORM public\._tang_phien_ban_noi_dung\(\);/g,
            "PERFORM public.bump_content_version();",
          ),
        ),
        "Cổng S-29 không nhận ra trigger quay lại gọi hàm có chốt admin (ca 42501 khi xoá bằng SQL thô)",
      );
      // Canary 4: hở quyền hàm nội bộ cho `anon` ⇒ cổng phải đỏ.
      assert(
        !coVaI17(
          va.replace(
            "REVOKE ALL ON FUNCTION public._tang_phien_ban_noi_dung() FROM anon;",
            "",
          ),
        ),
        "Cổng S-29 không nhận ra hàm nội bộ bị hở quyền cho `anon`",
      );

      // ── (1b) Chữ trong vết xoá phải SUY TỪ `auth.uid()`, không được viết cứng ──
      // Bản đầu của `0014` ghi cứng `reason = 'Xoá thẳng trong DB (không qua giao diện)'`:
      // đúng với SQL Editor, nhưng thành NÓI DỐI ngay khi `0015` thêm nút xoá trên giao
      // diện — đo được thật: dòng vết mới nhất nói "không qua giao diện" trong khi lần
      // xoá đó đi từ giao diện. `0016` sửa bằng `CASE WHEN auth.uid() IS NULL` — cùng
      // nguồn sự thật với `actor_id`, nên hai trường không thể mâu thuẫn.
      const suaVet = read(
        "supabase/migrations/0016_vet_xoa_noi_dung_nguon.sql",
      );
      const coNguonVet = (src) =>
        /CREATE OR REPLACE FUNCTION public\.sau_khi_xoa_bai_hoc\(\)/.test(
          src,
        ) &&
        /WHEN auth\.uid\(\) IS NULL THEN/.test(src) &&
        /REVOKE ALL ON FUNCTION public\.sau_khi_xoa_bai_hoc\(\) FROM anon;/.test(
          src,
        ) &&
        /GRANT EXECUTE ON FUNCTION public\.sau_khi_xoa_bai_hoc\(\) TO authenticated;/.test(
          src,
        );

      assert(
        coNguonVet(suaVet),
        "`0016` thiếu phần bắt buộc: `CREATE OR REPLACE` hàm trigger · nguồn vết suy từ `auth.uid()` · và cặp `REVOKE`/`GRANT` cấp lại sau khi replace",
      );
      // Canary: bỏ phần suy nguồn ⇒ cổng phải đỏ.
      assert(
        !coNguonVet(
          suaVet.replace("WHEN auth.uid() IS NULL THEN", "WHEN true THEN"),
        ),
        "Cổng S-29 không nhận ra phần suy nguồn vết xoá bị gỡ",
      );

      // ── (2) Máy bé chịu được bài 0 slide ──
      assert(
        /totalSlides === 0/.test(baiHoc),
        "`LessonPage` thiếu chốt chặn bài 0 slide — `payload` rỗng sẽ làm trắng trang với `Cannot read properties of undefined (reading 'type')`",
      );
      assert(
        /LOAI_SLIDE_HOP_LE\.includes\(slide\.type\)/.test(baiHoc),
        "`LessonPage` không nhận ra slide KIỂU LẠ — slide lạ sẽ vẽ ra thẻ trắng, trông y như app hỏng",
      );
      // Canary: gỡ chốt chặn ra thì phải bắt được.
      assert(
        !/totalSlides === 0/.test(baiHoc.replace("totalSlides === 0", "false")),
        "Cổng S-29 không nhận ra chốt chặn bài 0 slide bị gỡ",
      );

      // ── (3) Không còn mặc định `12` cho chương trống ──
      // `chapter.lessons?.length || 12` biến một chương ĐÃ BỊ XOÁ HẾT BÀI thành
      // "0/12 bài" — đọc như thể chương còn bài mà bé chưa học.
      assert(
        !/\|\|\s*chapter\.totalLessons\s*\|\|\s*12/.test(nha),
        "`HomePage` vẫn còn mặc định `|| 12` — chương đã xoá hết bài sẽ hiện `0/12 bài`",
      );
      assert(
        /chapter\.lessons\?\.length \?\? chapter\.totalLessons \?\? 0/.test(
          nha,
        ),
        "`HomePage` phải dùng `??` (không phải `||`) để số 0 của chương trống không bị ghi đè",
      );

      // ── (4) Admin: bài biến mất khỏi DB ──
      assert(
        /\.maybeSingle\(\)/.test(admin) &&
          /khongCon: true/.test(admin) &&
          !/\.eq\("id", dangChon\)\s*\.single\(\)/.test(admin),
        "`ContentPage` phải dùng `maybeSingle` + nhánh `khongCon` — nếu không, xoá bài trong DB thì Admin hiện lỗi kỹ thuật `PGRST116` và giữ lại bài đã xoá trong cây",
      );
      // Canary: quay lại `.single()` thì phải bắt được.
      assert(
        !/\.maybeSingle\(\)/.test(
          admin.replace(/\.maybeSingle\(\)/, ".single()"),
        ),
        "Cổng S-29 không nhận ra `.maybeSingle()` bị đổi về `.single()`",
      );

      return {
        detail:
          "trigger `AFTER DELETE` ✓ · chỉ tăng số khi bài đã publish ✓ · khoá cho khách ✓ · vết xoá suy đúng nguồn ✓ · `0017`: không phụ thuộc JWT ✓ · chặn bài 0 slide ✓ · nhận slide lạ ✓ · bỏ mặc định `12` ✓ · Admin dùng `maybeSingle` ✓",
      };
    },
  );

  await test(
    "S-30",
    "TC-3c.12 — Nút XOÁ BÀI HỌC: có chốt gõ chữ, và KHÔNG có đường xoá chương",
    () => {
      // 🔴 VÌ SAO CẦN CỔNG NÀY. Đây là thao tác phá huỷ **không hoàn tác được** đầu tiên
      // của cả CMS — trước nó chỉ có "Rút bài". Ba thứ dưới đây là toàn bộ thứ khiến nó
      // an toàn, và cả ba đều tháo ra được bằng một dòng sửa rất vô hại trong mắt người
      // đọc diff:
      //
      //   (1) hàm SQL có chốt `is_admin()` + chốt "bài phải tồn tại" (không có chốt thứ
      //       hai thì hàm "thành công" mà chẳng xoá gì),
      //   (2) chốt gõ chữ ở giao diện — nút xoá **mờ** cho tới khi khớp từng ký tự,
      //   (3) và điều người dùng nói rõ: **không xoá chương**.
      const sql = read("supabase/migrations/0015_xoa_bai_hoc_tu_giao_dien.sql");
      const trang = read("admin/src/pages/ContentPage.jsx");

      // ── (1) Hàm SQL: chỉ xoá MỘT BÀI, chỉ admin ──
      const coHamXoa = (src) =>
        /CREATE OR REPLACE FUNCTION public\.delete_lesson\(p_lesson_id TEXT\)/.test(
          src,
        ) &&
        /IF NOT public\.is_admin\(\) THEN/.test(src) &&
        /IF NOT FOUND THEN/.test(src) &&
        /DELETE FROM public\.content_lessons WHERE id = p_lesson_id;/.test(
          src,
        ) &&
        !/DELETE\s+FROM\s+public\.content_chapters/i.test(src) &&
        !/TRUNCATE/i.test(src);

      assert(
        coHamXoa(sql),
        "`0015` thiếu phần bắt buộc: hàm `delete_lesson` · chốt `is_admin()` · chốt bài-không-tồn-tại · lệnh xoá đúng bảng `content_lessons` · không đụng `content_chapters`",
      );
      // Canary 1: thêm một đường xoá CHƯƠNG ⇒ phải đỏ (yêu cầu rõ: "không xóa chương").
      assert(
        !coHamXoa(
          sql + "\nDELETE FROM public.content_chapters WHERE id = 'x';\n",
        ),
        "Cổng S-30 không nhận ra đường xoá CHƯƠNG bị thêm vào",
      );
      // Canary 2: bỏ chốt admin ⇒ phải đỏ.
      assert(
        !coHamXoa(
          sql.replace("IF NOT public.is_admin() THEN", "IF false THEN"),
        ),
        "Cổng S-30 không nhận ra chốt `is_admin()` bị gỡ",
      );

      // ── (2) Quyền: khách KHÔNG gọi được (bẫy Supabase cấp thẳng cho `anon`) ──
      assert(
        /REVOKE ALL ON FUNCTION public\.delete_lesson\(TEXT\) FROM anon;/.test(
          sql,
        ) &&
          /GRANT EXECUTE ON FUNCTION public\.delete_lesson\(TEXT\) TO authenticated;/.test(
            sql,
          ),
        "`0015` thiếu cặp `REVOKE … FROM anon` + `GRANT … TO authenticated` — thiếu vế đầu là khách xoá được bài, thiếu vế sau là nút xoá chết với `permission denied`",
      );
      assert(
        !/REVOKE ALL ON FUNCTION public\.delete_lesson\(TEXT\) FROM anon;/.test(
          sql.replace(
            "REVOKE ALL ON FUNCTION public.delete_lesson(TEXT) FROM anon;",
            "",
          ),
        ),
        "Cổng S-30 không nhận ra dòng `REVOKE … FROM anon` bị gỡ",
      );

      // ── (3) Chốt gõ chữ ở giao diện ──
      const coChotGoChu = (src) =>
        /const CHU_XAC_NHAN_XOA = "delete this lesson";/.test(src) &&
        /go\.trim\(\) === CHU_XAC_NHAN_XOA/.test(src) &&
        /disabled=\{!dungChu \|\| busy\}/.test(src);

      assert(
        coChotGoChu(trang),
        "`ContentPage` thiếu chốt gõ chữ: hằng `delete this lesson` · phép so khớp · và nút xoá phải **mờ** cho tới khi khớp",
      );
      // Canary 3: nút xoá bỏ điều kiện khớp chữ (chỉ còn `busy`) ⇒ đúng loại sửa làm
      // mất toàn bộ tác dụng của chốt, mà diff trông rất "dọn dẹp".
      assert(
        !coChotGoChu(
          trang.replace("disabled={!dungChu || busy}", "disabled={busy}"),
        ),
        "Cổng S-30 không nhận ra chốt gõ chữ bị vô hiệu (nút xoá không còn mờ)",
      );
      // Canary 4: đổi cụm chữ khoá ⇒ phải đỏ, nếu không thì cổng chỉ canh chữ, không canh ý.
      assert(
        !coChotGoChu(trang.replace('"delete this lesson"', '"xoa bai nay"')),
        "Cổng S-30 không nhận ra cụm chữ xác nhận bị đổi",
      );

      // ── (4) Đường ghi phải qua RPC, không `.delete()` từ trình duyệt ──
      assert(
        /supabase\.rpc\("delete_lesson"/.test(trang) &&
          /🗑️ Xoá bài này/.test(trang),
        "`ContentPage` phải gọi `delete_lesson` qua `supabase.rpc` (cổng `S-22` cấm `.delete()` thẳng từ trình duyệt) và phải có nút `🗑️ Xoá bài này`",
      );

      return {
        detail:
          "hàm SQL chỉ admin ✓ · không đụng chương ✓ · khoá cho khách ✓ · chốt gõ chữ `delete this lesson` ✓ · nút mờ tới khi khớp ✓ · đi qua RPC ✓",
      };
    },
  );

  await test(
    "S-31",
    "TC-R.9 — Chế độ Khách KHÔNG ghi gì xuống máy (và vẫn phải ghi khi chưa cấu hình Supabase)",
    async () => {
      // Luật nằm ở `client/src/store/sessionMode.js`, nhưng phần QUYẾT ĐỊNH được tách ra
      // file THUẦN `persistRule.js` — cùng bài học với `henGio.js` (cổng `S-19`): tách
      // phần thuần ra thì cổng `import()` được và thử HÀNH VI THẬT. Một cổng chỉ grep chuỗi
      // sẽ vẫn xanh kể cả khi hàm trả `undefined`.
      const rel = "client/src/store/persistRule.js";
      assert(exists(rel), `Không thấy ${rel}`);
      const { shouldPersist } = await import(
        pathToFileURL(path.join(ROOT, rel)).href
      );
      assert(
        typeof shouldPersist === "function",
        `${rel} không export hàm shouldPersist`,
      );

      // 1. Khách + đã cấu hình Supabase ⇒ KHÔNG ghi gì.
      assert(
        shouldPersist({ guestMode: true, supabaseConfigured: true }) === false,
        "Chế độ Khách phải KHÔNG ghi xuống máy",
      );

      // 2. Đã đăng nhập ⇒ ghi bình thường (nếu không thì tính năng offline vỡ).
      assert(
        shouldPersist({ guestMode: false, supabaseConfigured: true }) === true,
        "Đã đăng nhập thì phải ghi xuống máy như trước",
      );

      // 3. 🔴 Ca dễ chết nhất: CHƯA cấu hình Supabase ⇒ cả app luôn là Khách và
      //    `localStorage` là chỗ lưu DUY NHẤT. Áp luật "khách không ghi" vào đây là
      //    xoá sạch tiến độ của bé sau mỗi lần mở lại app.
      assert(
        shouldPersist({ guestMode: true, supabaseConfigured: false }) === true,
        "Chưa cấu hình Supabase thì KHÔNG được chặn ghi — localStorage là chỗ lưu duy nhất",
      );

      // ── Canary hai vế ──
      // Vế 1: luật "ngây thơ" (`!guestMode`) phải CHO KẾT QUẢ KHÁC ở ca (3) — chứng minh
      //        phép kiểm PHÂN BIỆT được hai cách cài đặt, không phải cổng bắt-mọi-thứ.
      const ngayTho = ({ guestMode }) => !guestMode;
      assert(
        ngayTho({ guestMode: true, supabaseConfigured: false }) !==
          shouldPersist({ guestMode: true, supabaseConfigured: false }),
        "Canary: luật ngây thơ `!guestMode` cho cùng kết quả — phép kiểm không phân biệt được ca chưa cấu hình",
      );

      // Vế 2: cả 4 store persist phải thật sự dùng storage đã bọc. Kiểm một chỗ thôi thì
      //        store bị bỏ sót sẽ lặng lẽ ghi dữ liệu của khách xuống máy.
      const STORES = [
        "client/src/store/useUserStore.js",
        "client/src/store/useProgressStore.js",
        "client/src/store/usePetStore.js",
        "client/src/store/useLeagueStore.js",
      ];
      const thieu = STORES.filter(
        (r) => !/storage:\s*createGuestAwareStorage\(\)/.test(read(r)),
      );
      assert(
        thieu.length === 0,
        `Store persist chưa bọc storage chống ghi ở chế độ Khách: ${thieu.join(", ")}`,
      );

      // Và `sessionMode.js` phải GỌI luật thuần, không chép lại luật ở chỗ thứ hai —
      // hai bản luật thì bản trong cổng test được chỉ là bản trang trí.
      assert(
        /shouldPersist\(/.test(read("client/src/store/sessionMode.js")),
        "sessionMode.js không dùng `persistRule.shouldPersist` — luật đã bị chép lại ở hai chỗ",
      );

      // Vế 3: tập khoá RIÊNG trong `PRIVATE_KEYS` phải KHỚP ĐÚNG tên của 4 store đang
      // persist. Đổi tên một store mà quên cập nhật danh sách ⇒ lúc vào chế độ Khách
      // KHÔNG xoá được khoá đó ⇒ khách nạp lại dữ liệu của người dùng trước.
      //
      // ⚠️ Và danh sách này CHỈ được chứa dữ liệu RIÊNG của bé. Bốn khoá cache
      //    (`toan-vui-reward-configs`, `toan-vui-reward-multiplier`, `toan-vui-level-curve`,
      //    `toan-vui-content`) phải NẰM NGOÀI: đó là bảng giá và cây nội dung — thứ giữ cho
      //    app học được khi offline. Lỗi thật đã xảy ra khi kiểm tay: lọc theo tiền tố
      //    `toan-vui-` sẽ bắt luôn 4 khoá này và làm tưởng luật đã hỏng.
      const srcMode = read("client/src/store/sessionMode.js");
      const khoiKhoa = srcMode.match(/const PRIVATE_KEYS = \[([\s\S]*?)\]/);
      assert(
        khoiKhoa,
        "sessionMode.js không còn khai `const PRIVATE_KEYS = [...]`",
      );
      const dsKhoa = [...khoiKhoa[1].matchAll(/["']([^"']+)["']/g)].map(
        (m) => m[1],
      );

      // Cửa sổ CỐ ĐỊNH quanh `createGuestAwareStorage()` — không quét cả file, vì
      // `usePetStore` có nhiều object khác cũng có khoá `name:` (PET_TYPES, FOOD_TYPES).
      const tenStore = (r) => {
        const src = read(r);
        const moc = src.indexOf("createGuestAwareStorage()");
        const cuaSo = src.slice(Math.max(0, moc - 400), moc + 120);
        return cuaSo.match(/name:\s*["']([^"']+)["']/)?.[1] ?? null;
      };
      const dsTen = STORES.map(tenStore);
      assert(
        dsTen.every(Boolean),
        `Không đọc được tên store quanh \`createGuestAwareStorage()\`: ${STORES.filter(
          (r, i) => !dsTen[i],
        ).join(", ")}`,
      );
      const thua = dsKhoa.filter((k) => !dsTen.includes(k));
      const thieuKhoa = dsTen.filter((k) => !dsKhoa.includes(k));

      // Bốn khoá CACHE (bảng giá + cây nội dung) hay bị nhầm là dữ liệu riêng của bé vì
      // chúng cũng bắt đầu bằng `toan-vui-`. Đưa chúng vào danh sách xoá là mất thứ giữ cho
      // app học được offline — nên câu báo lỗi phải nói rõ, không chỉ nói "thừa".
      const CACHE_KEYS = [
        "toan-vui-reward-configs",
        "toan-vui-reward-multiplier",
        "toan-vui-level-curve",
        "toan-vui-content",
      ];
      const thuaLaCache = thua.filter((k) => CACHE_KEYS.includes(k));

      assert(
        thua.length === 0 && thieuKhoa.length === 0,
        `PRIVATE_KEYS lệch với tên 4 store — thừa: [${thua.join(", ")}] · thiếu: [${thieuKhoa.join(", ")}]` +
          (thuaLaCache.length
            ? ` ⚠️ Khoá thừa là CACHE cấu hình/nội dung (${thuaLaCache.join(", ")}) — vào chế độ Khách là mất thứ giữ cho app học được offline.`
            : ""),
      );

      return {
        detail:
          "khách: KHÔNG ghi ✓ · đã đăng nhập: ghi ✓ · chưa cấu hình Supabase: VẪN ghi ✓ · cả 4 store đều bọc ✓ · khoá riêng khớp tên store, không đụng cache ✓",
      };
    },
  );

  await test(
    "S-32",
    "Seed SQL phải MỚI như dữ liệu (không được để seed cũ hơn bài học)",
    async () => {
      // 🔴 VÌ SAO CẦN. Ngày 2026-09-22 tôi sửa dữ liệu bài học ở hai vòng phát hành
      // (1.0.38 tứ giác thường, 1.0.39 chữ a/b/c trên cạnh khối) nhưng **quên chạy
      // `--sql`**. File seed trên đĩa vẫn là bản của vòng 1.0.37 ⇒ người dùng dán đúng
      // những file đó vào Supabase và `--verify` báo **6 bài lệch nội dung**; phải dán
      // lại lần nữa. Đây là lỗi IM LẶNG: seed cũ vẫn "hợp lệ", chỉ không khớp bài học.
      //
      // Cách canh: `migrate-content.mjs --sql` ghi kèm `.dau-van-tay.json` (băm sha256
      // của `lessons.map(l => [l.id, l.payload])`). Cổng này tính LẠI y hệt từ dữ liệu
      // hiện tại rồi so. Lệch ⇒ đỏ kèm đúng câu lệnh cần chạy.
      const dt = "supabase/content-seed/.dau-van-tay.json";
      assert(exists(dt), `Không thấy ${dt} — chạy: node scripts/migrate-content.mjs --sql`);
      const ghi = readJson(dt);

      const files = [
        ["grade1Data.js", "grade1Data"],
        ["grade2Data.js", "grade2Data"],
        ["grade3Data.js", "grade3Data"],
        ["grade4Data.js", "grade4Data"],
        ["grade5Data.js", "grade5Data"],
      ];
      const lessons = [];
      for (const [file, key] of files) {
        const mod = await import(
          new URL(`../client/src/data/${file}`, import.meta.url)
        );
        for (const ch of mod[key].chapters) {
          for (const lesson of ch.lessons) {
            lessons.push({ id: lesson.id, payload: { slides: lesson.slides } });
          }
        }
      }
      const { createHash } = await import("node:crypto");
      const tinhLai = createHash("sha256")
        .update(JSON.stringify(lessons.map((l) => [l.id, l.payload])))
        .digest("hex")
        .slice(0, 16);

      assert(
        tinhLai === ghi.dauVanTay,
        `Seed SQL đã CŨ so với dữ liệu bài học (dấu vân tay ${ghi.dauVanTay} ≠ ${tinhLai}). ` +
          `Dán file seed cũ vào Supabase thì app của bé KHÔNG thấy hình/chữ mới. ` +
          `Chạy: node scripts/migrate-content.mjs --sql  rồi commit lại file trong supabase/content-seed/.`,
      );

      // Canary: đổi một slide trong bản sao (trong bộ nhớ, KHÔNG chạm file thật) thì
      // dấu vân tay PHẢI khác — chứng minh phép băm thật sự nhìn vào nội dung bài học,
      // chứ không phải một hằng số vô nghĩa.
      const banSao = JSON.parse(JSON.stringify(lessons));
      banSao[0].payload.slides[0].content.text =
        (banSao[0].payload.slides[0].content.text ?? "") + " (canary)";
      const bamKhac = createHash("sha256")
        .update(JSON.stringify(banSao.map((l) => [l.id, l.payload])))
        .digest("hex")
        .slice(0, 16);
      assert(
        bamKhac !== ghi.dauVanTay,
        "Canary: đổi nội dung một slide mà dấu vân tay KHÔNG đổi — phép băm vô nghĩa",
      );

      return {
        detail: `dấu vân tay ${ghi.dauVanTay} khớp dữ liệu hiện tại (${ghi.bai} bài · ${ghi.slide} slide) · canary phân biệt được ✓`,
      };
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
          if (
            row.coins_max != null &&
            !(isUint(row.coins_max) && row.coins_max >= row.coins)
          )
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

    await test(
      "D-13",
      "TC-2.30 — Anon không đọc được số liệu phân tích",
      async () => {
        // Hàm này trả số liệu của MỌI bé. Nếu `anon` đọc được thì bất kỳ ai có anon
        // key — vốn công khai trong bundle — đều xem được hoạt động học tập của mọi
        // trẻ.
        //
        // Migration 0007 chặn bằng 2 lớp: REVOKE khỏi `anon`, và RLS (hàm là
        // SECURITY INVOKER nên `anon` không thấy dòng nào của `question_attempts`).
        // Nên phép thử phải chấp nhận CẢ HAI kiểu chặn — lỗi quyền, hoặc 0 dòng.
        // Khẳng định cứng "phải có lỗi" sẽ báo FAIL oan khi lớp RLS đỡ được một
        // mình, mà đó lại là kết quả an toàn.
        const r = await rest("rpc/get_question_analytics", {
          method: "POST",
          body: { p_days: 30 },
        });

        if (!r.ok) return { detail: `bị REVOKE chặn — HTTP ${r.status}` };

        const leaked =
          (r.body?.total_attempts ?? 0) > 0 ||
          (r.body?.broken?.length ?? 0) > 0 ||
          (r.body?.guessing?.length ?? 0) > 0 ||
          (r.body?.weak?.length ?? 0) > 0;

        assert(
          !leaked,
          `🔴 anon ĐỌC ĐƯỢC số liệu phân tích: ${JSON.stringify(r.body).slice(0, 200)}`,
        );
        return { detail: "gọi được nhưng RLS trả 0 dòng — không rò rỉ" };
      },
    );

    // ── Nhóm D cho GĐ 3 (lát 3a) — cần migration 0008 đã chạy ──
    // Chưa chạy thì SKIP kèm lý do rõ ràng, chứ không báo FAIL oan.

    await test(
      "D-14",
      "TC-3a.3 — Anon KHÔNG đọc được bảng phiên bản nội dung",
      async () => {
        // Phép thử này KHÔNG vô nghĩa khi bảng rỗng: sau khi chạy content-seed,
        // bảng phiên bản có 362 dòng. RLS hở một chút là anon đọc được ngay.
        // Cùng nguyên tắc "không có policy cho anon" đã dùng ở `question_attempts`.
        const r = await rest(
          "content_lesson_versions?select=lesson_id&limit=5",
        );
        if (r.status === 404)
          return {
            skip: true,
            detail:
              "Chưa chạy 0008_content_schema.sql — bỏ qua nhóm D của GĐ 3",
          };
        const so = Array.isArray(r.body) ? r.body.length : 0;
        assert(
          so === 0,
          r.ok
            ? `🔴 anon ĐỌC ĐƯỢC ${so} dòng của content_lesson_versions`
            : `HTTP ${r.status} — cần xác nhận là bị chặn quyền, không phải lỗi khác`,
        );
        return { detail: "bị RLS chặn — 0 dòng" };
      },
    );

    await test(
      "D-15",
      "TC-3a.5 — Anon đọc được bài đã publish, KHÔNG đọc được bài nháp",
      async () => {
        const pub = await rest("content_lessons?select=id&limit=3");
        if (pub.status === 404)
          return {
            skip: true,
            detail:
              "Chưa chạy 0008_content_schema.sql — bỏ qua nhóm D của GĐ 3",
          };
        assert(pub.ok, `HTTP ${pub.status} đọc content_lessons`);

        // Lọc thẳng `status=eq.draft`. Nếu policy đọc công khai hở thì truy vấn
        // này trả về bài nháp; nếu kín thì trả 0 dòng.
        const nhap = await rest(
          "content_lessons?select=id&status=eq.draft&limit=5",
        );
        const soNhap = Array.isArray(nhap.body) ? nhap.body.length : 0;
        assert(
          soNhap === 0,
          `🔴 anon ĐỌC ĐƯỢC ${soNhap} bài nháp: ${JSON.stringify(nhap.body).slice(0, 200)}`,
        );

        if (pub.body.length === 0)
          return {
            skip: true,
            detail:
              "0008 đã chạy nhưng chưa có bài — hãy chạy các file trong supabase/content-seed/",
          };
        return {
          detail: `đọc được bài published · 0 bài nháp lộ ra`,
        };
      },
    );

    // ── Nhóm D cho GĐ 3 (lát 3c) — cần migration 0009 đã chạy ──

    await test(
      "D-16",
      "TC-3c.1+9 — Bảng bản nháp và các hàm publish: KHÁCH bị chặn",
      async () => {
        // 🔴 Vì sao bảng nháp phải ở BẢNG RIÊNG: RLS lọc theo DÒNG chứ không theo CỘT.
        // Nếu bản nháp là một cột của `content_lessons` thì nó nằm chung dòng với bài
        // `published`, và `content_lessons_public_read` cho khách đọc nó theo.
        const nhap = await rest(
          "content_lesson_drafts?select=lesson_id&limit=5",
        );
        if (nhap.status === 404)
          return {
            skip: true,
            detail:
              "Chưa chạy 0009_content_drafts.sql — bỏ qua nhóm D của lát 3c",
          };
        const soNhap = Array.isArray(nhap.body) ? nhap.body.length : 0;
        assert(
          soNhap === 0,
          nhap.ok
            ? `🔴 anon ĐỌC ĐƯỢC ${soNhap} bản nháp: ${JSON.stringify(nhap.body).slice(0, 200)}`
            : `HTTP ${nhap.status} — cần xác nhận là bị chặn quyền, không phải lỗi khác`,
        );

        // Bốn hàm ghi phải bị chặn với khách. Cái nào chặn được cũng tốt — có HAI lớp
        // (REVOKE ở tầng quyền, và `IF NOT is_admin()` trong hàm), nên chỉ cần khẳng
        // định "không chạy được", và ghi lại LỚP NÀO đã chặn để còn biết đường soi.
        const chan = [];
        for (const [ten, body] of [
          ["publish_lesson", { p_lesson_id: "g1-c1-l1" }],
          ["rollback_lesson", { p_lesson_id: "g1-c1-l1", p_version: 1 }],
          ["set_lesson_status", { p_lesson_id: "g1-c1-l1", p_status: "draft" }],
          ["save_lesson_draft", { p_lesson_id: "g1-c1-l1", p_title: "x" }],
          // Hai hàm NỘI BỘ. Chúng không có `IF NOT is_admin()` trong 0009 — nên với
          // chúng, `REVOKE` là lớp chặn DUY NHẤT. Và `REVOKE ... FROM PUBLIC` **không**
          // gỡ được quyền của `anon` trên Supabase, vì Supabase cấp `EXECUTE` cho
          // `anon` bằng DEFAULT PRIVILEGES (một grant trực tiếp, không qua PUBLIC).
          // Đây đúng là lỗi cổng này bắt được sau khi chạy `0009` ⇒ vá ở `0012`.
          ["bump_content_version", {}],
          [
            "ghi_vet_bai_hoc",
            {
              p_action: "test",
              p_lesson_id: "g1-c1-l1",
              p_before: null,
              p_after: null,
            },
          ],
          // Hàm tạo bài mới (`0013`). Trước khi chạy 0013 thì hàm CHƯA tồn tại
          // ⇒ 404 ⇒ vẫn tính là "không gọi được", nên cổng không báo FAIL oan.
          ["create_lesson", { p_chapter_id: "g1-c1", p_title: "test" }],
        ]) {
          const r = await rest(`rpc/${ten}`, { method: "POST", body });
          assert(
            !r.ok,
            `🔴 khách GỌI ĐƯỢC \`${ten}\` — hàm ghi của CMS không được mở cho anon. ` +
              `Nhớ chạy 0012_chan_quyen_ham_noi_bo.sql (REVOKE ... FROM anon TƯỜNG MINH)`,
          );
          const t =
            typeof r.body === "string" ? r.body : JSON.stringify(r.body);
          chan.push(
            `${ten}:${r.status}${/permission denied/i.test(t) ? "(revoke)" : "(if is_admin)"}`,
          );
        }

        return {
          detail: `bảng nháp bị RLS chặn · 6 hàm ghi đều bị chặn [${chan.join(" ")}]`,
        };
      },
    );

    // ── Nhóm D cho GĐ 3 (lát 3d) — cần 0010 + 0011 đã chạy ──

    await test(
      "D-17",
      "TC-3d.1 — `age_range` đã bù đủ, và công tắc nội dung đã bật",
      async () => {
        const g = await rest("content_grades?select=id,age_range&order=id");
        if (g.status === 404)
          return { skip: true, detail: "Chưa chạy 0008 — bỏ qua" };

        const coCot =
          Array.isArray(g.body) && g.body.some((r) => "age_range" in r);
        if (!coCot)
          return {
            skip: true,
            detail:
              "Chưa chạy 0010_content_age_range.sql — bỏ qua nhóm D của lát 3d",
          };

        assert(g.ok, `HTTP ${g.status} đọc content_grades`);
        const thieu = g.body.filter((r) => !r.age_range).map((r) => r.id);
        assert(
          thieu.length === 0,
          `Khoá ${thieu.join(", ")} chưa có \`age_range\` — phụ huynh sẽ thấy "Lớp X ()"`,
        );

        const cfg = await rest(
          "app_config?select=key,value&key=in.(content_source,content_version)",
        );
        assert(cfg.ok, `HTTP ${cfg.status} đọc app_config`);
        const byKey = Object.fromEntries(cfg.body.map((r) => [r.key, r.value]));
        const boc = (v) =>
          v && typeof v === "object" && "value" in v ? v.value : v;

        return {
          detail: `${g.body.length} lớp có age_range · content_source = ${JSON.stringify(boc(byKey.content_source))} · content_version = ${JSON.stringify(boc(byKey.content_version))}`,
        };
      },
    );

    await test(
      "D-18",
      "TC-3d.6 — Khách đọc được CẢ CÂY từ DB, và không thấy bài đã rút",
      async () => {
        const [g, c, l] = await Promise.all([
          rest("content_grades?select=id&limit=10"),
          rest("content_chapters?select=id&limit=1000"),
          rest("content_lessons?select=id&limit=1000"),
        ]);
        if (g.status === 404)
          return { skip: true, detail: "Chưa chạy 0008 — bỏ qua" };
        assert(
          g.ok && c.ok && l.ok,
          `HTTP ${g.status}/${c.status}/${l.status}`,
        );

        // 🔴 Không đòi ĐÚNG 459 bài: rút một bài (TC-3c.8) là một TÍNH NĂNG, và nó
        // làm số bài khách thấy giảm đi — đúng như thiết kế. Đòi cứng 459 là tự tạo
        // FAIL oan ngay khi ai đó dùng tính năng đó. Số lớp và số chương thì không
        // đổi theo trạng thái bài, nên giữ được phép kiểm chặt.
        assert(
          g.body.length === 5,
          `Mong đợi 5 lớp, khách đọc được ${g.body.length}`,
        );
        assert(
          c.body.length === 51,
          `Mong đợi 51 chương, khách đọc được ${c.body.length}`,
        );
        assert(
          l.body.length >= 300,
          `Khách chỉ đọc được ${l.body.length} bài — cây gần như không tải được`,
        );

        const nhap = await rest(
          "content_lessons?select=id&status=eq.draft&limit=5",
        );
        assert(
          (nhap.body?.length ?? 0) === 0,
          `🔴 anon ĐỌC ĐƯỢC ${nhap.body?.length} bài nháp`,
        );

        return {
          detail: `khách đọc được ${g.body.length} lớp · ${c.body.length} chương · ${l.body.length} bài published · 0 bài nháp`,
        };
      },
    );

    await test(
      "D-19",
      "TC-3d.9 — `child_progress` có 3 cột báo cáo nội dung của máy bé (`0013`)",
      async () => {
        // Đo bằng cách HỎI ĐÚNG TÊN CỘT. PostgREST kiểm tên cột theo schema TRƯỚC khi
        // RLS lọc dòng, nên cột thiếu là lỗi `column ... does not exist` — kể cả khi
        // khách không đọc được dòng nào. Đó là lý do phép đo này chạy được bằng anon
        // key dù bảng `child_progress` bị RLS chặn với khách.
        const cot = "content_version,content_source,content_seen_at";
        const r = await rest(`child_progress?select=${cot}&limit=1`);
        const t = typeof r.body === "string" ? r.body : JSON.stringify(r.body);
        assert(
          !/does not exist/i.test(t),
          `Thiếu cột trong child_progress (${t.slice(0, 160)}) — nhớ chạy 0013_content_report_and_create_lesson.sql`,
        );

        // Canary: hỏi một cột KHÔNG có thì phải ra lỗi CÙNG KIỂU. Không có vế này thì
        // một PostgREST đổi cách báo lỗi là cổng xanh vĩnh viễn mà không ai biết.
        const xau = await rest(
          "child_progress?select=khong_co_cot_nay&limit=1",
        );
        const tx =
          typeof xau.body === "string" ? xau.body : JSON.stringify(xau.body);
        assert(
          /does not exist/i.test(tx),
          "Cổng D-19 không nhận ra cột không tồn tại — phép đo đang vô hiệu",
        );

        return {
          detail: `có đủ 3 cột (HTTP ${r.status}) · canary bắt được cột lạ ✓`,
        };
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

// SKIP phải HIỆN RA kèm lý do. Trước đây dòng SKIP bị bỏ qua khỏi báo cáo, nên
// chỉ thấy mỗi con số ở dòng tổng — không biết bài nào bị bỏ qua, vì sao, và có
// cần làm gì không. Một test bị bỏ qua mà không ai biết là một lỗ hổng che mất
// lỗ hổng khác: dòng "2 SKIP" trông y hệt nhau dù là "chưa cần chạy" hay
// "quên chạy migration".
if (skip > 0) {
  console.log("\n  ⏭️  ĐÃ BỎ QUA — và vì sao:");
  for (const r of results.filter((x) => x.status === "SKIP")) {
    console.log(`     ${r.id} — ${r.name}`);
    console.log(`        ${r.detail ?? "(không có lý do — hãy bổ sung)"}`);
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
