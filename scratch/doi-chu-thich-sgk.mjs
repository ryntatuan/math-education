#!/usr/bin/env node
/**
 * ĐỔI CHỮ “SGK / sách giáo khoa” TRONG GHI CHÚ MÃ NGUỒN (2026-09-29, yêu cầu người dùng:
 * app phải là app độc lập, không nhắc tới sách giáo khoa).
 *
 * PHẠM VI: `client/src` TRỪ thư mục `data/` (đã xử lý riêng) và trừ chính bộ lọc
 * `utils/stripTextbookRefs.js` + test của nó — hai file đó BẢN CHẤT là để lọc nhãn sách
 * (lưới an toàn cho dữ liệu cũ trong DB/cache), xoá chữ đi là vô nghĩa.
 *
 *   node scratch/doi-chu-thich-sgk.mjs          # chạy thử, in ra các dòng sẽ đổi
 *   node scratch/doi-chu-thich-sgk.mjs --ghi    # ghi thật
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GOC = path.join(ROOT, "client/src");
const GHI = process.argv.includes("--ghi");

const MIEN = [
  `${path.sep}data${path.sep}`,
  `${path.sep}stripTextbookRefs.js`,
  `${path.sep}stripTextbookRefs.test.js`,
];

// Thứ tự QUAN TRỌNG: dọn cụm dài trước, "SGK" trơ sau cùng.
const RULES = [
  [/\s*\(\s*(?:theo\s+|đúng\s+)?SGK\b[^)]*\)/gi, ""],
  [
    /\s*(?:của|theo|đúng|như)?\s*SGK\s+(?:Toán\s+)?tr\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi,
    "",
  ],
  [/\s*\(\s*tr\.?\s*\d+(?:\s*[·,]\s*tr\.?\s*\d+)*\s*\)/gi, ""],
  [/\s*(?:·|và|,)?\s*tr\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi, ""],
  [/\s*SGK\s+Toán\b/g, " chương trình"],
  [/\s*SGK\s+(?=Lớp|lớp)/g, " "],
  [/,\s*\)/g, ")"],
  [/\s*[:\-–—]\s*\)/g, ")"],
  [/\(\s*(?:không thuộc|thuộc)\s*\)/g, ""],
  [/\bSGK\b/g, "chương trình"],
  [/\bcách chương trình\s+/g, "cách "], // "cách chương trình dạy" ⇒ "cách dạy"
  [/\bSách giáo khoa\b/g, "Chương trình"],
  [/\bsách giáo khoa\b/g, "chương trình"],
];

const GOP = [
  [/[ \t]{2,}/g, " "],
  [/[ \t]*,?[ \t]*\./g, "."],
  [/[ \t]+([.,;])/g, "$1"],
  [/\(\s*\)/g, ""],
  [/[ \t]+$/g, ""],
];

function doiDong(body) {
  let s = body;
  for (const [re, thay] of RULES) s = s.replace(re, thay);
  for (const [re, thay] of GOP) s = s.replace(re, thay);
  return s;
}

function lietKe(dir, ra = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) lietKe(f, ra);
    else if (/\.(js|jsx|css)$/.test(e.name)) ra.push(f);
  }
  return ra;
}

const ra = [];
let soFile = 0;
let soDong = 0;

for (const f of lietKe(GOC)) {
  if (MIEN.some((m) => f.includes(m))) continue;
  const raw = fs.readFileSync(f, "utf8");
  if (!/SGK|giáo khoa/i.test(raw)) continue;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  let doi = false;

  const moi = raw.split(/\r?\n/).map((l) => {
    if (!/SGK|giáo khoa/i.test(l)) return l;
    const m = l.match(/^([ \t]*)([\s\S]*)$/);
    const than = doiDong(m[2]);
    if (than === m[2]) return l;
    soDong++;
    doi = true;
    ra.push(
      `${path.relative(ROOT, f).replace(/\\/g, "/")}\n  - ${m[2].trim()}\n  + ${than.trim()}`,
    );
    return m[1] + than;
  });

  if (doi) {
    soFile++;
    if (GHI) fs.writeFileSync(f, moi.join(eol), "utf8");
  }
}

fs.writeFileSync("scratch/doi-chu-thich-sgk.txt", ra.join("\n\n"), "utf8");
console.log(`${GHI ? "Đã đổi" : "Sẽ đổi"} ${soDong} dòng trong ${soFile} file`);
