/**
 * Lọc trong 97 chỗ dùng `items` những ca ĐÁNG NGỜ:
 *  • count > 5  → LessonPage vẽ bằng lưới 10 ô ⇒ cùng họ lỗi với `tenFrame`.
 *  • count == 1 mà lời bài nói "mỗi ... có k ..." ⇒ hình thiếu PHẦN (càng, cánh, bánh xe…).
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";
import fs from "node:fs";

const grades = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];
const khung = [];
const phan = [];
let dem = 0;

grades.forEach((goi, gi) => {
  (goi.chapters || []).forEach((ch) => {
    (ch.lessons || []).forEach((l) => {
      (l.slides || []).forEach((s) => {
        const c = s.content || {};
        if (!c.items) return;
        dem += 1;
        const text = (c.text || c.title || c.question || "")
          .replace(/\s+/g, " ")
          .trim();
        const counts = c.items.map((it) => it.count);
        const maxCount = Math.max(...counts.map((x) => Number(x) || 0));
        const dong = `lớp ${gi + 1} · ${l.id} [${s.type}] count=${JSON.stringify(counts)}\n   lời: ${text.slice(0, 112)}`;
        if (maxCount > 5 && !/từ 0 đến 10|0 → 10|đến 10|mười/.test(text))
          khung.push(dong);
        if (
          maxCount === 1 &&
          /mỗi\s+(con|khay|hộp|đĩa|bàn|xe|hàng|chiếc|bạn|em|tầng|can|chai|nhóm|rổ|giỏ|túi|bó|gói)/i.test(
            text,
          )
        )
          phan.push(dong);
      });
    });
  });
});

const out = [
  `Tổng items: ${dem}`,
  `\n=== A. LƯỚI 10 Ô nhưng KHÔNG phải bài đếm đến 10 (${khung.length}) ===`,
  ...khung,
  `\n=== B. "MỖI ... CÓ k ..." mà chỉ vẽ 1 vật (${phan.length}) ===`,
  ...phan,
];
out.forEach((d) => console.log(d));
fs.writeFileSync("scratch/ra-items-nghi-ngo.txt", out.join("\n"), "utf8");
