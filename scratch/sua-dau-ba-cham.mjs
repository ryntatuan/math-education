#!/usr/bin/env node
/**
 * VÁ DẤU “…” TRONG CÁC SLIDE DO CÔNG CỤ SỬA CỦA TÔI THÊM VÀO (2026-09-29).
 *
 * VÌ SAO: app coi “…” trong ô bảng là Ô TRỐNG cần điền. Slide “Ba bước…” tôi thêm chỉ để ĐỌC
 * ⇒ trẻ chỉ nhìn mà không bấm được gì. Cổng `scratch/soat-o-trong.mjs` báo ĐỎ 5 ca, cả 5 đều
 * do bản sửa của tôi. Người dùng phát hiện ra điều này khi tự kiểm lại.
 *
 *   node scratch/sua-dau-ba-cham.mjs          # chạy thử
 *   node scratch/sua-dau-ba-cham.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

const VIE = [
  [
    "client/src/data/grade1/g1c9.js",
    "nói cả câu: … giờ đúng",
    "nói đủ câu: bấy nhiêu giờ đúng",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "nói cả câu: … giờ đúng",
    "nói đủ câu: bấy nhiêu giờ đúng",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '— Nói cả câu","… giờ đúng',
    '— Nói cả câu","nói đủ câu: bấy nhiêu giờ đúng',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "(thứ Hai, thứ Ba, …)",
    "(thứ Hai, thứ Ba, thứ Tư)",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "Các ngày trong tuần đọc lần lượt: thứ Hai, thứ Ba, … Chủ nhật.",
    "Các ngày trong tuần đọc lần lượt từ thứ Hai đến Chủ nhật.",
  ],
  [
    "client/src/data/grade2/g2c6.js",
    "nói cả câu: … giờ … phút",
    "nói đủ câu: bấy nhiêu giờ, bấy nhiêu phút",
  ],
  [
    "client/src/data/grade2/g2c6.js",
    "đọc cả câu: thứ … ngày … tháng …",
    "đọc đủ ba phần: thứ, ngày rồi tháng",
  ],
  [
    "client/src/data/grade2/g2c6.js",
    "thứ Hai, thứ Ba, … thứ Năm",
    "thứ Hai, thứ Ba, thứ Tư, thứ Năm",
  ],
];

const theoFile = new Map();
for (const [f, tu, den] of VIE) {
  if (!theoFile.has(f)) theoFile.set(f, []);
  theoFile.get(f).push([tu, den]);
}

let loi = 0;
for (const [f, ds] of theoFile) {
  const raw = fs.readFileSync(f, "utf8");
  let ra = raw;
  for (const [tu, den] of ds) {
    const n = ra.split(tu).length - 1;
    if (n === 0) continue; // đã sửa rồi hoặc không có
    if (ra.split(tu).join(den).includes(tu)) {
      // mẫu này còn khớp chính nó sau khi thay ⇒ thay chồng, phải dừng
      console.log(
        `  ✗ ${f}: mẫu “${tu.slice(0, 40)}” tự khớp lại sau khi thay — BỎ QUA`,
      );
      loi++;
      continue;
    }
    ra = ra.split(tu).join(den);
    console.log(`  · ${f}: “${tu.slice(0, 40)}…” ${n} chỗ`);
  }
  if (ra !== raw && GHI) fs.writeFileSync(f, ra, "utf8");
}
console.log(
  GHI ? `ĐÃ GHI (lệch: ${loi})` : `chạy thử (lệch: ${loi}) — thêm --ghi để ghi`,
);
