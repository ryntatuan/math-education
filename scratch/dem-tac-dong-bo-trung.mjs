/**
 * ĐẾM TÁC ĐỘNG CỦA LUẬT "BỎ CHỮ ĐÃ BỊ HÌNH NÓI LẠI" + LUẬT "BỎ KHỐI TRÙNG TRONG SLIDE KHÁI NIỆM".
 *
 * Chạy: `node scratch/dem-tac-dong-bo-trung.mjs`
 *
 * VÌ SAO CẦN: hai luật này là luật HIỂN THỊ (không sửa dữ liệu), nên phải in ra con số thật
 * để người dùng biết chúng chạm vào bao nhiêu slide — chứ không chỉ nói "đã sửa toàn hệ thống".
 */
import { planVisualText } from "../client/src/pages/lesson/slideDedupe.js";
import { coversAll } from "../client/src/utils/textCompare.js";

const SOURCES = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

const dem = {
  slide: 0,
  visual: 0,
  boDong: 0,
  boTieuDe: 0,
  concept: 0,
  boRule: 0,
  boGiaiThich: 0,
};
const viDu = { boDong: [], boTieuDe: [], boRule: [] };

for (const [file, key, grade] of SOURCES) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        dem.slide++;
        const c = s.content ?? {};

        if (s.type === "visual" && c.text) {
          dem.visual++;
          const truoc = String(c.text).split("\n").length;
          const { title, steps, hideCaption } = planVisualText(c);
          const sau = (title ? 1 : 0) + steps.length;
          if (sau < truoc) {
            dem.boDong++;
            if (viDu.boDong.length < 5) {
              viDu.boDong.push(
                `${bai.id} slide ${i + 1}: ${truoc} → ${sau} dòng`,
              );
            }
          }
          if (hideCaption) {
            dem.boTieuDe++;
            if (viDu.boTieuDe.length < 5) {
              viDu.boTieuDe.push(
                `${bai.id} slide ${i + 1}: tiêu đề lấy từ nhãn hình`,
              );
            }
          }
        }

        if (s.type === "concept") {
          dem.concept++;
          const rule = String(c.rule ?? "");
          const points = Array.isArray(c.points) ? c.points.join(" · ") : "";
          const steps = Array.isArray(c.steps)
            ? c.steps.map((x) => `${x.title ?? ""} ${x.desc ?? ""}`).join(" · ")
            : "";
          if (
            rule &&
            ((points && coversAll(points, rule)) ||
              (steps && coversAll(steps, rule)))
          ) {
            dem.boRule++;
            if (viDu.boRule.length < 6) {
              viDu.boRule.push(
                `${bai.id} slide ${i + 1}: "${rule.slice(0, 46)}…"`,
              );
            }
          }
          if (rule && c.explanation && coversAll(rule, c.explanation))
            dem.boGiaiThich++;
        }
      });
    }
  }
}

console.log(`Tổng số slide đã soi: ${dem.slide}`);
console.log(
  `\nA. Slide "Quan sát" (visual) có text: ${dem.visual}` +
    `\n   • bỏ bớt dòng vì hình đã nói y hệt: ${dem.boDong}` +
    `\n   • tiêu đề cũ là bản sao ⇒ lấy nhãn hình làm tiêu đề: ${dem.boTieuDe}`,
);
console.log(
  `\nB. Slide khái niệm (concept): ${dem.concept}` +
    `\n   • bỏ ô nhấn mạnh (rule) vì danh sách bên dưới đã nói đủ: ${dem.boRule}` +
    `\n   • bỏ câu giải thích vì ô nhấn mạnh đã nói đủ: ${dem.boGiaiThich}`,
);
console.log("\nVí dụ A (bỏ dòng):");
for (const v of viDu.boDong) console.log("   " + v);
console.log("Ví dụ A (đổi tiêu đề):");
for (const v of viDu.boTieuDe) console.log("   " + v);
console.log("Ví dụ B (bỏ ô nhấn mạnh trùng):");
for (const v of viDu.boRule) console.log("   " + v);
