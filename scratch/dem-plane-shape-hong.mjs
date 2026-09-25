/**
 * Đếm chính xác các slide dùng `planeShape` với `kind` mà bộ vẽ KHÔNG có toạ độ
 * (`SHAPE_POINTS`) ⇒ React sẽ ném lỗi và CẢ SLIDE không hiện.
 * Chạy: `node scratch/dem-plane-shape-hong.mjs`
 */
import fs from "node:fs";

const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

// Đọc thẳng từ mã nguồn bộ vẽ để KHÔNG chép tay (chép tay là nguồn lỗi).
const src = fs.readFileSync(
  "client/src/components/visuals/GeometryVisuals.jsx",
  "utf8",
);
const block = src.slice(
  src.indexOf("const SHAPE_POINTS = {"),
  src.indexOf("const FILL = {"),
);
const coToaDo = new Set(
  [...block.matchAll(/^\s{2}(\w+):\s*\[/gm)].map((m) => m[1]),
);
console.log("Bộ vẽ CÓ toạ độ cho:", [...coToaDo].join(", "), "\n");

let soSlide = 0;
const hong = [];
for (const [file, key, lop] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  for (const ch of g.chapters ?? [])
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        const c = s.content ?? {};
        const ds = [];
        if (c.planeShape) ds.push(c.planeShape);
        if (Array.isArray(c.planeShapes)) ds.push(...c.planeShapes);
        ds.forEach((p) => {
          if (!p?.kind) return;
          soSlide++;
          if (!coToaDo.has(p.kind))
            hong.push(`L${lop} ${bai.id} #${i} [${s.type}] kind=${p.kind}`);
        });
      });
    }
}
console.log(
  `Tổng ${soSlide} lượt planeShape · ${hong.length} lượt KHÔNG vẽ được:`,
);
for (const h of hong) console.log("  " + h);
