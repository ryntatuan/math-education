/**
 * KIỂM CHỨNG file `docs/Plan/source_code_analysis.md` — chạy:
 *   `node scratch/kiem-tra-phan-tich-nguon.mjs`
 *
 * VÌ SAO CẦN: bản phân tích do công cụ khác viết; số liệu (số dòng, KB, số chương sai…) rất dễ
 * lỗi thời sau vài lần sửa. Đã có tiền lệ phải sửa lại kết luận vì tin số cũ ⇒ đo lại TRƯỚC khi lên kế hoạch.
 */
import { readFileSync, statSync, existsSync, readdirSync } from "node:fs";

const doFile = (p) => {
  if (!existsSync(p)) return null;
  const s = readFileSync(p, "utf8");
  return {
    dong: s.split("\n").length,
    kb: Math.round(statSync(p).size / 1024),
  };
};
console.log("=== A. KÍCH THƯỚC FILE (số liệu trong bản phân tích) ===");
const muc = [
  [
    "C-1 exerciseGenerator.js",
    "client/src/utils/exerciseGenerator.js",
    3507,
    125,
  ],
  ["C-2 GamesPage.jsx", "client/src/pages/GamesPage.jsx", 2331, 80],
  ["C-3 LessonPage.jsx", "client/src/pages/LessonPage.jsx", 2079, 72],
  [
    "C-4 GeometryVisuals.jsx",
    "client/src/components/visuals/GeometryVisuals.jsx",
    null,
    173,
  ],
  ["L-3 LessonPage.css", "client/src/pages/LessonPage.css", null, 42],
  ["L-3 GamesPage.css", "client/src/pages/GamesPage.css", null, 38],
  ["M-8 storyData.js", "client/src/data/storyData.js", null, 28],
];
for (const [ten, p, dong, kb] of muc) {
  const m = doFile(p);
  if (!m) {
    console.log(`  ⚠️ ${ten}: KHÔNG CÓ FILE ${p}`);
    continue;
  }
  const lech = [];
  if (dong !== null && m.dong !== dong) lech.push(`dòng ${dong} → ${m.dong}`);
  if (kb !== null && Math.abs(m.kb - kb) > 3) lech.push(`KB ${kb} → ${m.kb}`);
  console.log(
    `  ${lech.length ? "⚠️" : "✅"} ${ten}: ${m.dong} dòng · ${m.kb} KB${lech.length ? `   (bản phân tích ghi: ${lech.join(" · ")})` : ""}`,
  );
}

console.log(
  "\n=== B. M-2 `totalLessons` trong file tĩnh có khớp số bài thật không ===",
);
const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];
let lechTong = 0;
for (const [f, k, lop] of NGUON) {
  const mod = await import(new URL(`../client/src/data/${f}`, import.meta.url));
  const du = mod[k];
  for (const ch of du.chapters ?? []) {
    const that = (ch.lessons ?? []).length;
    if (ch.totalLessons !== undefined && ch.totalLessons !== that) {
      console.log(
        `  ⚠️ Lớp ${lop} ${ch.id}: totalLessons=${ch.totalLessons} nhưng thật ${that} bài`,
      );
      lechTong += 1;
    }
  }
}
console.log(
  lechTong === 0
    ? "  ✅ Không chương nào lệch."
    : `  ⇒ ${lechTong} chương lệch.`,
);

console.log("\n=== C. Vài lỗi cụ thể trong danh sách ===");
const docFile = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const pp = docFile("client/src/pages/PracticePage.jsx");
console.log(
  `H-5 PracticePage import HomePage.css: ${/import\s+["']\.\/HomePage\.css["']/.test(pp) ? "⚠️ CÒN" : "✅ đã sửa/không còn"}`,
);
const m19 = docFile("supabase/migrations/0019_pet_happiness_decay.sql");
console.log(
  `H-8 0019 idempotent: ${/ADD COLUMN IF NOT EXISTS/i.test(m19) ? "✅ có IF NOT EXISTS" : "⚠️ THIẾU IF NOT EXISTS"}`,
);
const sch = docFile("supabase/schema.sql").split("\n").slice(0, 24).join("\n");
console.log(
  `C-5 schema.sql có cảnh báo đầu file: ${/ĐỪNG CHẠY|LEGACY|KHÔNG chạy/i.test(sch) ? "✅ có" : "⚠️ không rõ"}`,
);
const app = docFile("client/src/App.jsx");
console.log(
  `E-1 App.jsx đã lazy-load page: ${/React\.lazy|lazy\(/.test(app) ? "✅ có" : "⚠️ CHƯA có lazy-load"}`,
);
const rw = docFile("client/src/services/rewardService.js");
console.log(
  `M-7 REWARD_DEFAULTS trong rewardService: ${/REWARD_DEFAULTS/.test(rw) ? "⚠️ còn hardcode (đối chiếu seed bằng cổng S-11)" : "✅ không còn"}`,
);
const lg = docFile("client/src/store/useLeagueStore.js");
const botTrongJs = (lg.match(/\{\s*(name|ten)\s*:/g) ?? []).length;
const botTrongSql = (docFile("supabase/schema.sql").match(/'bot_/g) ?? [])
  .length;
console.log(
  `H-2 bot hardcode: useLeagueStore ~${botTrongJs} object · schema.sql 'bot_' × ${botTrongSql}`,
);

console.log(
  "\n=== D. Cỡ gói build gần nhất (ước lượng trong bản phân tích: ~1,5 MB) ===",
);
const b = docFile("scratch/out-build.txt");
if (b) {
  const dong = b
    .split("\n")
    .filter((l) => /dist\/assets\/.*\.js\s/.test(l))
    .map((l) => l.trim())
    .slice(-8);
  console.log(
    dong.length
      ? dong.map((l) => "  " + l).join("\n")
      : "  (không đọc được danh sách chunk)",
  );
} else {
  console.log(
    "  (chưa có scratch/out-build.txt — chạy `npm --prefix client run build:web` rồi xem lại)",
  );
}

console.log("\n=== E. Test/kiểm thử hiện có (H-7: 'không có unit test') ===");
const c = (p) => (existsSync(p) ? readdirSync(p).length : 0);
console.log(
  `  vitest/jest trong client/package.json: ${/vitest|jest/.test(readFileSync("client/package.json", "utf8")) ? "✅ có" : "❌ không có"}`,
);
console.log(
  `  script kiểm trong scripts/: ${c("scripts")} file · trong scratch/: ${c("scratch")} file`,
);
