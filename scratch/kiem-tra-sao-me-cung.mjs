/**
 * KIỂM TRA MỐC SAO CỦA TRÒ CHƠI “MÊ CUNG VỀ NHÀ”.
 *
 * Người dùng chốt 2026-09-25 (đổi từ 15/30 thành 20/40): ≤ 20 giây = 3 sao · 21–40 giây = 2 sao ·
 * hơn 40 giây = 1 sao. Mép là chỗ dễ sai nhất nên kiểm ĐÚNG mép: 0, 19, 20, 21, 39, 40, 41, 60
 * giây — và 20,999 giây (phải ra 3 sao vì hiện lên màn hình là “20 giây”), 21,001 giây (phải ra 2 sao).
 *
 * Còn kiểm: bậc thưởng theo sao phải là khoá CÓ THẬT trong `reward_configs`
 * (đọc thẳng file migration SQL, không tin lời khai trong mã).
 *
 * Chạy: npx esbuild scratch/kiem-tra-sao-me-cung.mjs --bundle --platform=node --format=esm
 *        --outfile=scratch/kiem-tra-sao-me-cung.bundle.mjs ; node scratch/kiem-tra-sao-me-cung.bundle.mjs
 */
import { readFileSync } from "node:fs";

import {
  BAND_ROWS,
  BANDS_TEXT,
  STAR_BANDS,
  starsForMs,
  starsForSeconds,
  TIER_BY_STARS,
} from "../client/src/utils/mazeStarBands.js";

const loi = [];
const kiem = (moTa, thuc, mongDoi) => {
  if (thuc !== mongDoi) loi.push(`${moTa}: được ${thuc}, phải là ${mongDoi}`);
};

// ── 1. Mép theo GIÂY ──────────────────────────────────────────────────────────
const theoSec = [
  [0, 3],
  [1, 3],
  [12, 3],
  [19, 3],
  [20, 3],
  [21, 2],
  [30, 2],
  [39, 2],
  [40, 2],
  [41, 1],
  [55, 1],
  [60, 1],
  [600, 1],
];
for (const [giay, mongDoi] of theoSec)
  kiem(`${giay} giây`, starsForSeconds(giay), mongDoi);

// ── 2. Mép theo MILI-GIÂY (đồng hồ trong app đếm bằng ms) ─────────────────────
const theoMs = [
  [0, 3],
  [19999, 3],
  [20000, 3],
  [20999, 3], // hiện ra “20 giây” ⇒ phải 3 sao, không được 2
  [21000, 2],
  [21001, 2],
  [39999, 2],
  [40000, 2],
  [40999, 2], // hiện ra “40 giây” ⇒ 2 sao
  [41000, 1],
  [60000, 1],
];
for (const [ms, mongDoi] of theoMs) kiem(`${ms} ms`, starsForMs(ms), mongDoi);
// Chốt lại điều quan trọng nhất: số giây HIỆN RA và số sao luôn khớp nhau
for (let ms = 0; ms <= 82000; ms += 137) {
  const hienRa = Math.floor(ms / 1000);
  if (starsForMs(ms) !== starsForSeconds(hienRa))
    loi.push(`không khớp: ${ms} ms hiện “${hienRa} giây” nhưng lệch số sao`);
}

// ── 3. Mốc phải đúng con số người dùng chốt ──────────────────────────────────
kiem("mốc 3 sao", STAR_BANDS.three, 20);
kiem("mốc 2 sao", STAR_BANDS.two, 40);
// Chữ HIỆN RA phải khớp hằng số đang dùng — đổi mốc mà quên đổi chữ là lỗi rất dễ mắc.
const mongDoi = [
  { stars: 3, label: `≤ ${STAR_BANDS.three} giây` },
  { stars: 2, label: `${STAR_BANDS.three + 1} – ${STAR_BANDS.two} giây` },
  { stars: 1, label: `hơn ${STAR_BANDS.two} giây` },
];
if (BAND_ROWS.length !== 3)
  loi.push(`phải có đúng 3 thẻ mốc, đang có ${BAND_ROWS.length}`);
BAND_ROWS.forEach((row, i) => {
  if (row.stars !== mongDoi[i].stars || row.label !== mongDoi[i].label)
    loi.push(`thẻ mốc ${i + 1} sai: “${row.stars} sao — ${row.label}”`);
});
if (BANDS_TEXT !== mongDoi.map((r) => `${r.stars} sao: ${r.label}`).join(" · "))
  loi.push(`BANDS_TEXT lệch với mốc: “${BANDS_TEXT}”`);

// ── 4. Bậc thưởng theo sao phải có thật trong reward_configs ─────────────────
let sql = "";
try {
  sql = readFileSync("supabase/migrations/0002_reward_economy.sql", "utf8");
} catch {
  loi.push("không đọc được supabase/migrations/0002_reward_economy.sql");
}
for (const [sao, bac] of Object.entries(TIER_BY_STARS)) {
  if (!sql.includes(`'game.tier_${bac}'`))
    loi.push(
      `bậc thưởng của ${sao} sao là 'game.tier_${bac}' nhưng không có trong reward_configs`,
    );
}
// Ba bậc phải KHÁC nhau (đừng để 3 sao và 1 sao cùng một bậc)
if (new Set(Object.values(TIER_BY_STARS)).size !== 3)
  loi.push(`ba bậc thưởng bị trùng: ${JSON.stringify(TIER_BY_STARS)}`);

// ── KẾT QUẢ ──────────────────────────────────────────────────────────────────
const dem = Object.values(theoSec).length + Object.values(theoMs).length;
console.log(
  `Mốc sao             : ≤ ${STAR_BANDS.three}s → 3 sao · ${STAR_BANDS.three + 1}–${STAR_BANDS.two}s → 2 sao · > ${STAR_BANDS.two}s → 1 sao`,
);
console.log(
  `Số mốc đã kiểm      : ${theoSec.length} mốc giây + ${theoMs.length} mốc ms + quét 599 mốc lẻ (0…82 giây)`,
);
console.log(
  `Bậc thưởng theo sao : ${Object.entries(TIER_BY_STARS)
    .map(([s, b]) => `${s} sao → game.tier_${b}`)
    .join(" · ")}`,
);
void dem;
if (loi.length) {
  console.log(`\n❌ ${loi.length} LỖI:`);
  [...new Set(loi)].slice(0, 20).forEach((l) => console.log("  - " + l));
  process.exit(1);
}
console.log("\n✅ Mốc sao và bậc thưởng của trò chơi Mê Cung Về Nhà: 0 lỗi");
