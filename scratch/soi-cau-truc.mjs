// Soi CẤU TRÚC slide khái niệm của các bài cần viết lại — để biết phải thay khoá nào.
// DÙNG: node scratch/soi-cau-truc.mjs client/src/data/grade3Data.js [id-bài-để-in-đầy-đủ…]
// ⚠️ `grade3Data.js` dùng LẪN LỘN khoá có nháy và không nháy ⇒ mọi mẫu đều phải chấp cả hai.

import fs from "node:fs";

const file = process.argv[2];
const inDayDu = new Set(process.argv.slice(3));
const src = fs.readFileSync(file, "utf8");

// Cắt theo id bài (chấp cả `id:` và `"id":`).
const khuc = src.split(/(?=["']?id["']?: "g\d+-c\d+-l\d+",)/g);

for (const k of khuc) {
  const id = k.match(/["']?id["']?: "(g\d+-c\d+-l\d+)",/)?.[1];
  if (!id) continue;

  // Khối concept: từ `type: "concept"` tới dòng đóng slide (`            },`).
  const i = k.indexOf('type: "concept"');
  if (i < 0) {
    console.log(`${id} — ⚠️ KHÔNG có slide concept`);
    continue;
  }
  const j = k.indexOf("\n            },", i);
  const khoi = k.slice(i, j < 0 ? k.length : j);
  const khoa = [...khoi.matchAll(/^[ \t]*["']?([a-zA-Z_]+)["']?:/gm)].map(
    (m) => m[1],
  );
  const rieng = [...new Set(khoa)].filter(
    (x) => !["type", "content", "badge", "title"].includes(x),
  );
  const soConcept = (k.match(/type: "concept"/g) || []).length;

  console.log(
    `${id.padEnd(12)} concept=${soConcept}  khoá: ${rieng.join(", ")}`,
  );
  if (inDayDu.has(id)) {
    console.log("──────── nguyên văn ────────");
    console.log(khoi);
    console.log("────────────────────────────");
  }
}
