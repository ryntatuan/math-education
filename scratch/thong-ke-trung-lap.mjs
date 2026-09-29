#!/usr/bin/env node
/**
 * THỐNG KÊ các ca trùng lặp theo LOẠI CẶP — đọc lại chính kết quả của cổng
 * `scratch/soat-trung-lap-noi-dung.nay.out.txt` (không đo lại, chỉ gom nhóm).
 *
 * Dùng để trả lời người dùng: “399 ca trùng lặp là ca gì?”.
 */
import fs from "node:fs";

const f = "scratch/soat-trung-lap-noi-dung.nay.out.txt";
const t = fs.readFileSync(f, "utf8");
const L = t.split(/\r?\n/);

const dem = new Map();
let nhom = null;

for (const line of L) {
  if (/^=== /.test(line) || /^--- /.test(line)) {
    if (/A1\./.test(line)) nhom = "A1 (rule ↔ points)";
    else if (/A2\./.test(line)) nhom = "A2 (points/explanation ↔ table)";
    else if (/=== B\. Slide/.test(line)) nhom = "B (hai slide liền nhau)";
    else if (/^--- B\./.test(line)) nhom = "B (hai slide liền nhau)";
    else nhom = "A (khác)";
    continue;
  }
  if (!line.trim().startsWith("·")) continue;
  const m = line.match(/\[(\w+)\]\s+([^đ]+?)\s+điểm=/);
  const cap = m ? m[2].trim() : "(không rõ)";
  const kind = m ? m[1] : "?";
  const key = `${nhom} | ${kind} | ${cap}`;
  dem.set(key, (dem.get(key) ?? 0) + 1);
}

const rows = [...dem.entries()].sort((a, b) => b[1] - a[1]);
let tong = 0;
for (const [, n] of rows) tong += n;
console.log(`TỔNG CỘNG: ${tong} ca\n`);
for (const [k, n] of rows) console.log(`${String(n).padStart(4)}  ${k}`);
