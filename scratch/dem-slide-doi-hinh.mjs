/**
 * Đếm slide VỪA ĐƯỢC HIỆN THÊM HÌNH (trước đây hình nằm trong dữ liệu mà không có chỗ vẽ).
 * Dùng để biết phạm vi thay đổi giao diện sau khi thêm `CalcFigures` vào story/concept/quiz.
 * Chạy: `node scratch/dem-slide-doi-hinh.mjs`
 */
const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];
const KHOA = ["number", "operation", "comparison", "clock"];
const co = (v) => v !== null && v !== undefined && v !== "";
const dem = {};
const dsBai = new Set();
for (const [file, key, lop] of NGUON) {
  const mod = await import(new URL(`../client/src/data/${file}`, import.meta.url));
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      for (const s of bai.slides ?? []) {
        const c = s.content ?? {};
        for (const k of KHOA) {
          if (!co(c[k])) continue;
          const kk = `${s.type} · ${k}`;
          dem[kk] = (dem[kk] ?? 0) + 1;
          dsBai.add(`${lop}|${bai.id}`);
        }
      }
    }
  }
}
const tong = Object.values(dem).reduce((a, b) => a + b, 0);
console.log(`Tổng lượt hình theo kiểu slide: ${tong} · số bài có hình: ${dsBai.size}\n`);
for (const [k, n] of Object.entries(dem).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${n}`);
}
