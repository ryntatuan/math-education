// Liệt kê các bài còn phần "kiến thức trọng tâm" viết theo mẫu chung chung.
//
// VÌ SAO: bộ sinh nội dung cũ điền cho mọi bài hai gạch đầu dòng vô nghĩa
// ("Nắm chắc quy tắc toán học chuẩn SGK." / "Rèn luyện kỹ năng tư duy…") và một câu
// quy tắc chung. Bài học vẫn hợp lệ về kỹ thuật nên cổng không bắt được — nhưng với
// bé thì phần đó KHÔNG NÓI GÌ CẢ. Công cụ này chỉ ĐỌC và in ra danh sách để viết lại.
//
// DÙNG: node scratch/liet-ke-kien-thuc-chung.mjs client/src/data/grade3Data.js

import fs from "node:fs";
import path from "node:path";

// 🔴 KHÔNG tách khối theo `"id": "…"` (có nháy) như cách viết đầu — `grade3Data.js`
//    dùng LẪN LỘN hai kiểu khoá: phần lớn là `"badge": …` nhưng một số bài do bộ sinh
//    cũ ghi ra lại là `badge: …` KHÔNG nháy ⇒ mẫu có nháy bỏ sót sạch (ra 0 bài).
//    Cách dưới đây chỉ dựa vào CHUỖI GIÁ TRỊ nên không phụ thuộc kiểu khoá.
const MARK = "Nắm chắc quy tắc toán học chuẩn SGK.";
const layCuoi = (chuoi, mau) => [...chuoi.matchAll(mau)].at(-1)?.[1];

for (const file of process.argv.slice(2)) {
  const src = fs.readFileSync(path.resolve(file), "utf8");
  const khuc = src.split(MARK);
  console.log(
    `\n${path.basename(file)} — ${khuc.length - 1} chỗ còn kiến thức chung chung:`,
  );

  for (let i = 1; i < khuc.length; i += 1) {
    // Nhìn NGƯỢC lên: id bài gần nhất, rồi tới tiêu đề của chính slide khái niệm
    // (tiêu đề đó = tiêu đề bài bỏ tiền tố "Bài N:") và dòng giải thích của nó.
    const truoc = khuc[i - 1];
    const idBai = layCuoi(truoc, /["']?id["']?: "(g\d+-c\d+-l\d+)"/g);
    const tieuDe = layCuoi(truoc, /["']?title["']?: "([^"]*)"/g);
    const giaiThich = layCuoi(truoc, /["']?explanation["']?: "([^"]*)"/g);
    console.log(
      `  ${String(i).padStart(2)}. ${idBai ?? "?"}\n      chủ đề: ${tieuDe ?? "?"}` +
        `\n      giải thích: ${giaiThich ?? "?"}`,
    );
  }
}
