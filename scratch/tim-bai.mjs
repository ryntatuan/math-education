/**
 * Liệt kê bài học theo từ khoá (script TẠM, chỉ đọc dữ liệu, không sửa gì).
 * Chạy: `node scratch/tim-bai.mjs nhân 2` — in ra `id · lớp · chương · tiêu đề`.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

const tuKhoa = process.argv.slice(2).map((s) => s.toLowerCase());
if (tuKhoa.length === 0) {
  console.log("Cách dùng: node scratch/tim-bai.mjs <từ khoá> [từ khoá nữa…]");
  process.exit(0);
}

for (const [file, key, lop] of NGUON) {
  const full = path.join(ROOT, "client/src/data", file);
  if (!fs.existsSync(full)) continue;
  const mod = await import(new URL(`file://${full.replace(/\\/g, "/")}`).href);
  const g = mod[key];
  for (const ch of g.chapters ?? []) {
    for (const b of ch.lessons ?? []) {
      const t =
        `${b.title ?? ""} | ${ch.name ?? ""} | ${b.description ?? ""}`.toLowerCase();
      if (tuKhoa.some((k) => t.includes(k)))
        console.log(
          `${b.id} · L${lop} · ${ch.name} · "${b.title}" · ${(b.slides ?? []).length} slide`,
        );
    }
  }
}
