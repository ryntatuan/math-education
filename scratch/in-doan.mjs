#!/usr/bin/env node
/** In đoạn quanh một mốc trong file: node scratch/in-doan.mjs <file> <mốc> [số ký tự mỗi bên] [tên file ra] */
import fs from "node:fs";

const [f, moc, rong = "700", ra] = process.argv.slice(2);
const s = fs.readFileSync(f, "utf8");
const out = [];
let i = -1;
let dem = 0;
while ((i = s.indexOf(moc, i + 1)) >= 0 && dem < 8) {
  dem++;
  out.push(`\n===== ${f} · lần ${dem} · “${moc}”`);
  out.push(s.slice(Math.max(0, i - Number(rong)), i + Number(rong)));
}
if (!dem) out.push(`(KHÔNG THẤY “${moc}” trong ${f})`);
const noi = out.join("\n");
if (ra) {
  fs.writeFileSync(ra, noi, "utf8");
  console.log(`→ ${ra} (${dem} lần)`);
} else console.log(noi);
