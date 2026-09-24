/**
 * SOÁT CÂU HỎI SINH TỰ ĐỘNG: chủ đề nào sinh ra câu THIẾU LỰA CHỌN?
 *
 * Vì sao cần: bộ sinh có những khuôn tự viết 4 phương án bằng CHUỖI hoán vị các chữ số.
 * Khi số có chữ số lặp (222, 4444, 100…) thì các phương án **trùng nhau**; `withDistinctOptions`
 * gộp trùng lại và (vì đáp án là chuỗi nên không bù thêm được) câu hỏi chỉ còn **1 lựa chọn
 * là đáp án** — bé không có gì để chọn, mà bấm gì cũng đúng.
 *
 * Chạy: npx esbuild scratch/soat-cau-hoi-thieu-lua-chon.mjs --bundle --platform=node --format=esm
 *        --outfile=scratch/soat-cau-hoi-thieu-lua-chon.bundle.mjs ; node scratch/soat-cau-hoi-thieu-lua-chon.bundle.mjs [số_câu_mỗi_chủ_đề]
 */
import {
  TOPICS,
  PRACTICE_EXTRA_TOPICS,
  generateQuestion,
} from "../client/src/utils/exerciseGenerator.js";

const LAN = Number(process.argv[2] || 300);
const LOP = [1, 2, 3, 4, 5];
const ban = [];

for (const lop of LOP) {
  const ds = [
    ...(TOPICS[`GRADE_${lop}`] || []),
    ...(PRACTICE_EXTRA_TOPICS[`GRADE_${lop}`] || []),
  ];
  for (const t of ds) {
    let mot = 0;
    let hai = 0;
    let viDu = null;
    for (let i = 0; i < LAN; i++) {
      const q = generateQuestion(lop, t.id);
      // Hai dạng “bé tự làm” (mê cung, thẻ chấm) KHÔNG trả lời bằng nút lựa chọn —
      // `options` của chúng chỉ là giá trị đánh dấu cho bộ chấm điểm, không phải để bé bấm.
      if (["maze", "dotCards"].includes(q.type)) continue;
      const so = Array.isArray(q.options) ? q.options.length : 0;
      if (so < 2) {
        mot++;
        if (!viDu) viDu = { q: q.question, options: q.options };
      } else if (so < 3) hai++;
    }
    if (mot || hai) ban.push({ lop, id: t.id, ten: t.name, mot, hai, viDu });
  }
}

console.log(`Số câu thử mỗi chủ đề : ${LAN}`);
console.log(`Số chủ đề có vấn đề   : ${ban.length}`);
for (const b of ban) {
  console.log(
    `\n- lớp ${b.lop} · ${b.id} (${b.ten})` +
      `\n    1 lựa chọn: ${b.mot}/${LAN} · 2 lựa chọn: ${b.hai}/${LAN}` +
      (b.viDu
        ? `\n    ví dụ: "${b.viDu.q}" → options = ${JSON.stringify(b.viDu.options)}`
        : ""),
  );
}
if (!ban.length)
  console.log("\n✅ Mọi chủ đề đều sinh ra câu có ≥3 lựa chọn khác nhau");
