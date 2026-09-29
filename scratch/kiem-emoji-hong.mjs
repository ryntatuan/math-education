/**
 * KIỂM KÝ TỰ EMOJI trong file dữ liệu bài học.
 *
 * Vì sao cần: công cụ ghi file có thể biến emoji thành U+FFFD (ký tự hỏng) mà KHÔNG báo gì —
 * đã mắc thật. Một khi đã hỏng thì sửa lại rất khó, nên phải kiểm NGAY sau mỗi lần ghi file.
 *
 * Chạy: `node scratch/kiem-emoji-hong.mjs`
 * Mã thoát 0 = sạch · 1 = có ký tự hỏng / thiếu emoji.
 *
 * Mã emoji mong đợi ghi bằng escape (không viết emoji trực tiếp) để chính file kiểm này
 * không thể bị hỏng theo.
 */
import fs from "node:fs";

const FILES = [
  "client/src/data/grade1/g1c1.js",
  "client/src/data/grade1Data.js",
  "client/src/data/grade2Data.js",
  "client/src/data/grade3Data.js",
  "client/src/data/grade4Data.js",
  "client/src/data/grade5Data.js",
  "client/src/components/visuals/Grade1NumberVisuals.jsx",
  "docs/huong-dan-tu-ve-hinh-minh-hoa.md",
  "docs/ban-do-hinh-minh-hoa.md",
];

/** Emoji bắt buộc phải còn trong `g1c1.js` — khoá là MÃ code point. */
const MONG_G1C1 = {
  "1f431": "mèo (manyGroups)",
  "1f436": "chó (manyGroups)",
  "1f41f": "cá (manyGroups)",
  "1f414": "gà (manyGroups)",
  "1f955": "cà rốt (manyGroups)",
  "1f41d": "ong (Khám phá 6)",
  "1f426": "chim (Khám phá 7)",
  "1f338": "hoa (Khám phá 8)",
  "2b50": "sao biển (Khám phá 9)",
  "1f41e": "bọ rùa (Khám phá 10)",
};

let loi = 0;

for (const f of FILES) {
  const t = fs.readFileSync(f, "utf8");
  const hong = (t.match(/\uFFFD/g) || []).length;
  if (hong > 0) loi += hong;
  console.log(`${hong === 0 ? "OK  " : "HỎNG"} ${f}: U+FFFD = ${hong}`);
}

const g1c1 = fs.readFileSync("client/src/data/grade1/g1c1.js", "utf8");
const coMa = new Set(
  [...g1c1]
    .map((c) => c.codePointAt(0))
    // Lấy từ U+2000 trở lên — KHÔNG lọc theo độ dài hex, vì ⭐ (2b50) chỉ có 4 ký tự
    // nên bản đầu bỏ sót nó (thước sai, không phải file sai).
    .filter((cp) => cp >= 0x2000)
    .map((cp) => cp.toString(16)),
);
for (const [ma, ten] of Object.entries(MONG_G1C1)) {
  const co = coMa.has(ma);
  if (!co) loi += 1;
  console.log(`${co ? "OK  " : "THIẾU"} ${ma} — ${ten}`);
}

console.log(
  loi === 0 ? "\nSẠCH — không có ký tự hỏng, emoji còn đủ." : `\nCÓ ${loi} LỖI`,
);
process.exit(loi === 0 ? 0 : 1);
