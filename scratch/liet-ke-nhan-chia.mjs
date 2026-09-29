#!/usr/bin/env node
/** Liệt kê chỗ có dấu hiệu phép NHÂN / phép CHIA trong một lớp (mặc định Lớp 1). */
import fs from "node:fs";
import path from "node:path";

const LOP = process.argv[2] ?? "grade1";
const GOC = `client/src/data/${LOP}`;
const RE = /(\d\s*×\s*\d|\d\s*:\s*\d|\bnhân\b|\bchia\b|gấp mấy lần)/g;

const out = [];
for (const f of fs.readdirSync(GOC)) {
  if (!f.endsWith(".js")) continue;
  const dong = fs.readFileSync(path.join(GOC, f), "utf8").split("\n");
  let bai = "?";
  dong.forEach((l, i) => {
    const m = l.match(/"?id"?: "(g[^"]+)"/);
    if (m) bai = m[1];
    const k = l.match(RE);
    if (k)
      out.push(
        `${f}:${i + 1}  [${bai}]  ${[...new Set(k)].join(",")}  ::  ${l.trim().slice(0, 150)}`,
      );
  });
}
fs.writeFileSync(`scratch/phep-nhan-chia-${LOP}.txt`, out.join("\n"), "utf8");
console.log(`${LOP}: ${out.length} dòng → scratch/phep-nhan-chia-${LOP}.txt`);
