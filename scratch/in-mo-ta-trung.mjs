// Liệt kê các bài có MÔ TẢ trùng nhau (cùng một `description`), kèm tiêu đề để dễ xử lý.
// Đây là mục (3) của `soi-noi-dung.mjs` nhưng in chi tiết hơn.
// DÙNG: node scratch/in-mo-ta-trung.mjs

import fs from "node:fs";

const LOP = [1, 2, 3, 4, 5];
const bai = [];

for (const n of LOP) {
  const s = fs.readFileSync(`client/src/data/grade${n}Data.js`, "utf8");
  const khuc = s.split(/(?=["']?id["']?: "g\d+-c\d+-l\d+",)/g);
  for (const k of khuc) {
    const m = k.match(
      /["']?id["']?: "(g\d+-c\d+-l\d+)",[\s\S]{0,160}?title: "([^"]*)"[\s\S]{0,240}?description: "([^"]*)"/,
    );
    if (m) bai.push({ id: m[1], lop: n, tieuDe: m[2], moTa: m[3] });
  }
}

const nhom = new Map();
for (const b of bai) {
  const c = b.moTa
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  if (!nhom.has(c)) nhom.set(c, []);
  nhom.get(c).push(b);
}

let soNhom = 0;
for (const [, ds] of nhom) {
  if (ds.length < 2) continue;
  soNhom += 1;
  console.log(`✏️  ${ds.map((x) => x.id).join("  =  ")}`);
  for (const b of ds)
    console.log(`      Lớp ${b.lop} · ${b.id} · “${b.moTa}”  ←  ${b.tieuDe}`);
}
console.log(
  `\n  ⇒ ${soNhom} nhóm mô tả trùng (trên ${bai.length} bài đọc được).`,
);
