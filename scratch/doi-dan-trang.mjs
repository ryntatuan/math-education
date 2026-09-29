#!/usr/bin/env node
/**
 * DỌN DẪN TRANG TRƠ (“tr.8”, “(tr.94 · tr.100)”) TRONG GHI CHÚ MÃ NGUỒN.
 *
 * VÌ SAO CÒN SÓT: lượt trước chỉ sửa những DÒNG có chữ “SGK”. Nhiều ghi chú chỉ ghi dẫn trang
 * trơ — sau khi bỏ chữ SGK thì “(tr.8)” vẫn là dẫn tới sách giấy ⇒ vẫn phải dọn.
 * Chỉ áp dụng cho 3 dạng dính dẫn trang (có ngoặc, có “và/·/, ” ở trước) nên không đụng chữ khác.
 *
 *   node scratch/doi-dan-trang.mjs          # chạy thử
 *   node scratch/doi-dan-trang.mjs --ghi    # ghi thật
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

const RULES = [
  // "(tr.8)", "(tr.94 · tr.100)", "(Lớp 1 tr.46–71)"
  [/\s*\(\s*tr\.?\s*\d+(?:\s*[·,]\s*(?:và\s+)?tr\.?\s*\d+)*\s*\)/gi, ""],
  // "(Lớp 1 tr.46–71 và tr.88–105 gần như …)" ⇒ dọn từng dẫn trang một
  [/\s*(?:·|và|,)?\s*tr\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi, ""],
];

const GOP = [
  [/[ \t]{2,}/g, " "],
  [/[ \t]*,?[ \t]*\./g, "."],
  [/[ \t]+([.,;])/g, "$1"],
  [/\s*[:]\s*\)/g, ")"],
  [/,\s*\)/g, ")"],
  [/\(\s*\)/g, ""],
  [/[ \t]+$/g, ""],
];

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
  if (!/tr\.?\s*\d/.test(raw)) continue;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  let doi = false;

  const moi = raw.split(/\r?\n/).map((l) => {
    if (!/tr\.?\s*\d/.test(l)) return l;
    const m = l.match(/^([ \t]*)([\s\S]*)$/);
    let than = m[2];
    for (const [re, thay] of RULES) than = than.replace(re, thay);
    for (const [re, thay] of GOP) than = than.replace(re, thay);
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

fs.writeFileSync("scratch/doi-dan-trang.txt", ra.join("\n\n"), "utf8");
console.log(`${GHI ? "Đã đổi" : "Sẽ đổi"} ${soDong} dòng trong ${soFile} file`);
