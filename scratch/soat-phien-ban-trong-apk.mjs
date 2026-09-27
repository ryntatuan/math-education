/**
 * Soát chuỗi phiên bản BÊN TRONG file APK (nhị phân) và in ra ngữ cảnh xung quanh.
 * Chạy: `node scratch/soat-phien-ban-trong-apk.mjs <file.apk> <chuoi…>`
 * Mục đích: trả lời "APK có đúng phiên bản không" bằng bằng chứng, không đoán.
 */
import fs from "node:fs";

const [file, ...chuoi] = process.argv.slice(2);
if (!file || chuoi.length === 0) {
  console.log("Dùng: node scratch/soat-phien-ban-trong-apk.mjs <file.apk> <chuoi…>");
  process.exit(1);
}

const buf = fs.readFileSync(file);
const s = buf.toString("latin1");

for (const c of chuoi) {
  const vitri = [];
  let i = s.indexOf(c);
  while (i >= 0 && vitri.length < 6) {
    vitri.push(i);
    i = s.indexOf(c, i + 1);
  }
  const tong = s.split(c).length - 1;
  console.log(`\n"${c}": ${tong} chỗ`);
  for (const p of vitri) {
    const dau = Math.max(0, p - 45);
    console.log(
      "   …" + s.slice(dau, p + c.length + 45).replace(/[^\x20-\x7E]/g, "·") + "…",
    );
  }
}
