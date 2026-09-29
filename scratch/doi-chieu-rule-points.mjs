#!/usr/bin/env node
/**
 * ĐỐI CHIẾU “CỔNG BÁO TRÙNG” VỚI “APP CÓ ẨN KHÔNG” — cho cặp `rule` ↔ `points`.
 *
 * Cổng `scratch/soat-trung-lap-noi-dung.mjs` báo **48 ca** `rule ↔ points` (ô ⭐ lặp lại danh
 * sách, bao phủ ≥ 0,80). Nhưng app có luật HIỂN THỊ riêng: `slideDedupe.planConceptText` ẩn ô ⭐
 * khi danh sách đã chứa TRỌN nội dung ô đó (`coversAll` = 100%). Vậy bao nhiêu ca app đã ẩn,
 * bao nhiêu ca trẻ VẪN THẤY hai lần? — câu hỏi này phải trả lời bằng số đo, không bằng cảm giác.
 *
 * Chạy: node scratch/doi-chieu-rule-points.mjs
 */
import { planConceptText } from "../client/src/pages/lesson/slideDedupe.js";
import { contentWords } from "../client/src/utils/textCompare.js";

/** Độ bao phủ: bao nhiêu phần trăm từ của `rule` xuất hiện trong `points` (0..1). */
function coverageRuleInPoints(rule, points) {
  const wRule = contentWords(rule);
  const wPoints = contentWords(points);
  if (!wRule.size) return 0;
  let co = 0;
  for (const w of wRule) if (wPoints.has(w)) co++;
  return co / wRule.size;
}

const SOURCES = [
  "grade1Data",
  "grade2Data",
  "grade3Data",
  "grade4Data",
  "grade5Data",
];

let caCong = 0;
let daAn = 0;
let conHien = 0;
const dsConHien = [];

for (const [i, key] of SOURCES.entries()) {
  const mod = await import(
    new URL(`../client/src/data/grade${i + 1}Data.js`, import.meta.url)
  );
  const data = mod[key];
  for (const ch of data?.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, si) => {
        const c = s.content ?? {};
        const pointsText = Array.isArray(c.points) ? c.points.join(" · ") : "";
        const diem = coverageRuleInPoints(c.rule, pointsText);
        const coCong = c.rule && contentWords(c.rule).size >= 4 && diem >= 0.8;
        if (!coCong) return;
        caCong++;
        const { showRule } = planConceptText(c);
        if (!showRule) {
          daAn++;
          return;
        }
        conHien++;
        dsConHien.push({
          lop: i + 1,
          bai: bai.id,
          slide: si,
          diem,
          rule: String(c.rule),
          points: Array.isArray(c.points) ? c.points : [],
        });
      });
    }
  }
}

console.log(`Cổng báo (rule ↔ points, ≥0.8): ${caCong} ca`);
console.log(`  • app ĐÃ ẨN ô ⭐:            ${daAn} ca  (trẻ KHÔNG thấy lặp)`);
console.log(`  • app VẪN HIỆN ô ⭐:         ${conHien} ca  (trẻ thấy hai lần)`);
console.log("\n===== DANH SÁCH ĐẦY ĐỦ CA VẪN HIỆN =====");
for (const v of dsConHien) {
  console.log(
    `\n[Lớp ${v.lop}] ${v.bai} · slide #${v.slide} · bao phủ ${v.diem.toFixed(2)}`,
  );
  console.log(`  rule   : ${v.rule}`);
  v.points.forEach((p, k) => console.log(`  point${k} : ${p}`));
}
