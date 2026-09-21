// Sửa 12 bài có MÔ TẢ (description) trùng nhau — mục (3) của công cụ soi nội dung.
//
// VÌ SAO: `description` là dòng giới thiệu bé nhìn thấy trong danh sách bài. Bộ sinh cũ dùng
// chung một câu cho nhiều bài khác lớp/khác chủ đề, ví dụ "Hoàn thành Chương 5" xuất hiện ở
// cả Lớp 2 (số đến 1000) lẫn Lớp 3 (phân số) — vô nghĩa với bé.
//
// DÙNG: node scratch/doi-mo-ta-trung.mjs
// ⚠️ Chỉ đổi `description` của ĐÚNG bài trong danh sách; bài nào không khớp đúng 1 dòng thì DỪNG.

import fs from "node:fs";
import path from "node:path";

const MOI = {
  // Luyện đề cuối năm: nói rõ đề của lớp nào
  "g1-c10-l8": "Luyện đề cuối năm Lớp 1 - Đề số 1",
  "g1-c10-l9": "Luyện đề cuối năm Lớp 1 - Đề số 2",
  "g4-c6-l9": "Luyện đề cuối năm Lớp 4 - Đề số 1",
  "g4-c6-l10": "Luyện đề cuối năm Lớp 4 - Đề số 2",
  // "Hoàn thành Chương N" ⇒ nói đúng nội dung ôn tập của lớp đó
  "g2-c5-l10": "Ôn tập tổng hợp các số đến 1000",
  "g3-c5-l10": "Ôn tập tổng hợp về phân số",
  "g2-c6-l10": "Ôn tập tổng hợp về đo lường",
  "g3-c6-l10": "Ôn tập tổng hợp chu vi và diện tích",
  // Thống kê / khả năng — cùng lớp nên phải khác nhau rõ
  "g2-c9-l9": "Luyện tập chung: bảng số liệu, biểu đồ tranh và khả năng",
  "g2-c10-l8": "Ôn tập kiểm đếm số liệu và lựa chọn khả năng",
  "g2-c9-l10": "Thử thách Trạng Nguyên Nhí Lớp 2: biểu đồ và khả năng",
  "g3-c9-l10": "Thử thách Trạng Nguyên Nhí Lớp 3: bảng số liệu và sự kiện",
};

const FILE = {
  g1: path.resolve("client/src/data/grade1Data.js"),
  g2: path.resolve("client/src/data/grade2Data.js"),
  g3: path.resolve("client/src/data/grade3Data.js"),
  g4: path.resolve("client/src/data/grade4Data.js"),
  g5: path.resolve("client/src/data/grade5Data.js"),
};

// Gom theo lớp để mỗi file chỉ đọc/ghi một lần.
const theoLop = new Map();
for (const [id, moTa] of Object.entries(MOI)) {
  const lop = id.slice(0, 2);
  if (!theoLop.has(lop)) theoLop.set(lop, []);
  theoLop.get(lop).push([id, moTa]);
}

const loi = [];
let soSua = 0;

for (const [lop, ds] of theoLop) {
  const file = FILE[lop];
  const src = fs.readFileSync(file, "utf8");
  const khuc = src.split(/(?=["']?id["']?: "g\d+-c\d+-l\d+",)/g);
  const conLai = new Set(ds.map(([id]) => id));

  const ra = khuc.map((k) => {
    const id = k.match(/["']?id["']?: "(g\d+-c\d+-l\d+)",/)?.[1];
    if (!id || !MOI[id]) return k;

    let n = 0;
    const moi = k.replace(
      /^([ \t]*)(["']?description["']?: )("(?:[^"\\]|\\.)*")(,?)$/gm,
      (_m, ws, dau, _cu, cuoi) => {
        n += 1;
        return `${ws}${dau}${JSON.stringify(MOI[id])}${cuoi}`;
      },
    );
    if (n !== 1) {
      loi.push(`${id} → tìm thấy ${n} dòng description (mong đợi 1)`);
      return k;
    }
    soSua += 1;
    conLai.delete(id);
    return moi;
  });

  for (const id of conLai) loi.push(`Không thấy bài: ${id}`);
  if (loi.length) continue;
  fs.writeFileSync(file, ra.join(""), "utf8");
  console.log(`✅ ${path.basename(file)}: sửa ${ds.length} mô tả.`);
}

if (loi.length) {
  console.error(
    "🔴 CÓ LỖI — cần xem lại (file chưa ghi nếu lỗi thuộc file đó):",
  );
  loi.forEach((t) => console.error(`   ${t}`));
  process.exit(1);
}
console.log(`   Tổng ${soSua} mô tả đã đổi.`);
