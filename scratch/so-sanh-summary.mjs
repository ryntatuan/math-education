// So sánh slide `summary` giữa BẢN GỐC (sao lưu) và bản hiện tại, cho một danh sách bài.
// Mục đích: phát hiện việc ghi đè nhầm — regex thay MỌI mảng `points` trong bài nên có thể
// đã đè cả `summary` (nội dung tóm tắt riêng của bài) bằng gạch đầu dòng của `concept`.
//
// DÙNG: node scratch/so-sanh-summary.mjs <file-gốc> <file-hiện-tại> <id…|--het>

import fs from "node:fs";

const [gocFile, hienFile, ...ids] = process.argv.slice(2);

function khoiBai(src) {
  const ra = new Map();
  for (const k of src.split(/(?=["']?id["']?: "g\d+-c\d+-l\d+",)/g)) {
    const id = k.match(/["']?id["']?: "(g\d+-c\d+-l\d+)",/)?.[1];
    if (id) ra.set(id, k);
  }
  return ra;
}

/** Lấy mảng `points` của slide summary (chịu cả mảng một dòng lẫn nhiều dòng). */
function summaryPoints(k) {
  const i = k.indexOf('type: "summary"');
  if (i < 0) return null;
  const j = k.indexOf('type: "quiz"', i);
  const khoi = k.slice(i, j < 0 ? k.length : j);
  const m = khoi.match(/["']?points["']?: \[([^[\]]*)\]/);
  if (!m) return null;
  return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
}

const goc = khoiBai(fs.readFileSync(gocFile, "utf8"));
const hien = khoiBai(fs.readFileSync(hienFile, "utf8"));

const canh = ids.length && ids[0] !== "--het" ? new Set(ids) : null;
let doi = 0;
let giong = 0;
for (const [id, k] of goc) {
  if (canh && !canh.has(id)) continue;
  const a = summaryPoints(k);
  const b = summaryPoints(hien.get(id) ?? "");
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja === jb) {
    giong += 1;
    continue;
  }
  doi += 1;
  console.log(`✏️  ${id}`);
  console.log(
    `    gốc: ${a ? a.map((x) => `“${x}”`).join(" · ") : "(không có points)"}`,
  );
  console.log(
    `    nay: ${b ? b.map((x) => `“${x}”`).join(" · ") : "(không có points)"}`,
  );
}
console.log(`\n  ⇒ summary ĐỔI: ${doi} bài · giữ nguyên: ${giong} bài.`);
