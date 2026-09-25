/**
 * TÁCH OCR THEO TRANG — `node scratch/in-ocr-trang.mjs <tập 1|2> <từ> <đến>`
 * In ra: chỉ số khối (≈ trang PDF) + 400 ký tự đầu của trang.
 * Dùng để TRA NHANH nội dung một trang trước khi phải mở ảnh (ảnh đắt hơn nhiều).
 */
import fs from "node:fs";

const TAP = process.argv[2] || "2";
const TU = Number(process.argv[3] || 1);
const DEN = Number(process.argv[4] || 20);

const duong = `docs/Data Source/Grade 1/Math grade 1 part ${TAP}.md`;
const tho = fs.readFileSync(duong, "utf8");
// ⚠️ File ghi bằng CRLF ⇒ mẫu BẮT BUỘC có `\r?`, nếu không thì tách ra đúng 1 khối
// (đã mắc: regex `\n-{3,}\n` không khớp lần nào và công cụ báo "1 khối").
const khoi = tho.split(/\r?\n-{3,}\r?\n/);

let ra = `Tập ${TAP} — ${khoi.length} khối (≈ PDF page)\n\n`;
for (let i = TU - 1; i < Math.min(DEN, khoi.length); i++) {
  const chu = khoi[i].replace(/[ \t]+/g, " ").replace(/\n{2,}/g, " | ").trim();
  ra += `── khối ${i + 1} ──\n${chu.slice(0, 400)}\n\n`;
}
fs.writeFileSync("scratch/_ocr-trang.txt", ra, "utf8");
console.log(`Đã ghi scratch/_ocr-trang.txt (khối ${TU}..${DEN}/${khoi.length})`);
console.log(`Gợi ý: nếu khối 1 là bìa thì khối N ≈ trang PDF N; trang sách = PDF − 1.`);
