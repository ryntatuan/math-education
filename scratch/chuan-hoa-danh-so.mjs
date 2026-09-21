// Chuẩn hoá file dữ liệu lớp: đánh số bài theo TỪNG CHƯƠNG + cập nhật totalLessons.
//
// VÌ SAO CẦN: Lớp 4 và Lớp 5 đánh số bài LIÊN TỤC cả lớp (Bài 1…46 / 1…40), trong
// khi Lớp 1–3 đánh số THEO TỪNG CHƯƠNG. Chèn bài mới vào giữa một chương kiểu liên
// tục thì mọi bài phía sau bị lệch số — mà sửa tay 80+ tiêu đề là chắc chắn sót.
//
// Công cụ này đưa một file lớp về đúng quy ước của app: mỗi chương đánh số lại từ 1,
// và `totalLessons` luôn bằng số bài thật (không còn metadata khai sai).
//
// DÙNG:  node scratch/chuan-hoa-danh-so.mjs client/src/data/grade4Data.js [file2 ...]
// Chạy lại nhiều lần cho kết quả y hệt (idempotent). In báo cáo để đối chiếu.

import fs from "node:fs";
import path from "node:path";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error(
    "Thiếu tham số. Ví dụ: node scratch/chuan-hoa-danh-so.mjs client/src/data/grade4Data.js",
  );
  process.exit(2);
}

// Cắt văn bản thành các khúc, mỗi khúc bắt đầu ở DÒNG KHAI BÁO CHƯƠNG
// (`"id": "g4-c3",`). Cố ý KHÔNG cắt ở id bài học (`"id": "g4-c3-l1",`) — mẫu dưới
// đây đòi dấu phẩy ngay sau `c<số>` nên id bài học không khớp.
const CAT_CHUONG = /(?="id": "g\d+-c\d+",)/;

for (const file of files) {
  const duongDan = path.resolve(file);
  const truoc = fs.readFileSync(duongDan, "utf8");

  let soChuong = 0;
  const baoCao = [];

  const sau = truoc
    .split(CAT_CHUONG)
    .map((khuc, i) => {
      if (i === 0) return khuc; // phần đầu file, trước chương thứ nhất
      soChuong += 1;

      const idChuong = khuc.match(/"id": "(g\d+-c\d+)",/)?.[1] ?? `?${i}`;
      let dem = 0;
      let khucMoi = khuc.replace(
        /"title": "Bài \d+:/g,
        () => `"title": "Bài ${(dem += 1)}:`,
      );

      // `totalLessons` phải bằng số bài thật của chính chương này.
      const cu = khucMoi.match(/"totalLessons": (\d+),/)?.[1];
      khucMoi = khucMoi.replace(
        /"totalLessons": \d+,/,
        `"totalLessons": ${dem},`,
      );

      const tieuDeDau = khucMoi.match(/"title": "Bài 1: ([^"]*)"/)?.[1];
      const tieuDeCuoi = dem
        ? khucMoi.match(new RegExp(`"title": "Bài ${dem}: ([^"]*)"`))?.[1]
        : "(không có bài nào)";
      baoCao.push(
        `  ${idChuong}: totalLessons ${cu} → ${dem}` +
          `\n      bài 1 : ${tieuDeDau}` +
          `\n      bài ${dem}: ${tieuDeCuoi}`,
      );

      return khucMoi;
    })
    .join("");

  fs.writeFileSync(duongDan, sau, "utf8");
  console.log(`\n✅ ${path.basename(file)} — ${soChuong} chương:`);
  console.log(baoCao.join("\n"));
}
