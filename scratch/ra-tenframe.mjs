/**
 * Rà TOÀN BỘ chỗ dùng `tenFrame` (và `items`) trong dữ liệu 5 lớp.
 *
 * Vì sao: `tenFrame` vốn là KHUNG 10 Ô để dạy "gộp cho đủ 10". Nhưng nó bị dùng cho
 * những ý khác hẳn (3 khay mỗi khay 2 quả · 7 con cua mỗi con 2 càng · 6+7 gộp đủ 10
 * rồi còn 3). Những chỗ đó hình vẽ RA SAI so với lời của bài.
 *
 * Xuất ra bảng để phân loại: giữ được hay phải thay bằng hình khác.
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";
import fs from "node:fs";

const grades = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];
const dong = [];
let demTen = 0;
let demItems = 0;

grades.forEach((goi, gi) => {
  const g = goi.chapters || [];
  g.forEach((ch) => {
    (ch.lessons || []).forEach((l) => {
      (l.slides || []).forEach((s) => {
        const c = s.content || {};
        const coTen = c.tenFrame;
        const coItems = c.items;
        if (!coTen && !coItems) return;
        if (coTen) demTen += 1;
        if (coItems) demItems += 1;
        const text = (c.text || c.title || c.question || "")
          .replace(/\s+/g, " ")
          .trim();
        dong.push(`\n── lớp ${gi + 1} · ${l.id} [${s.type}]`);
        dong.push(`   lời: ${text.slice(0, 118)}`);
        if (coTen)
          dong.push(`   tenFrame: ${JSON.stringify(coTen).slice(0, 160)}`);
        if (coItems)
          dong.push(`   items: ${JSON.stringify(coItems).slice(0, 140)}`);
      });
    });
  });
});

dong.unshift(`TỔNG: tenFrame ${demTen} chỗ · items ${demItems} chỗ`);
dong.forEach((d) => console.log(d));
fs.writeFileSync("scratch/ra-tenframe.txt", dong.join("\n"), "utf8");
