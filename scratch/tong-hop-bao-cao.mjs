#!/usr/bin/env node
/** Tổng hợp báo cáo sửa đổi: đếm theo TÊN phép sửa, và in các dòng của một file. */
import fs from "node:fs";

const bao = fs
  .readFileSync("scratch/sua-kien-thuc-chua-hoc.txt", "utf8")
  .split("\n");
const dem = {};
for (const l of bao) {
  const m = l.match(/·\s+\S+\s+(.+?):\s+(\d+)/);
  if (!m) continue;
  const ten = m[1].replace(/\(\w+\)$/, "").trim();
  dem[ten] = (dem[ten] ?? 0) + 1;
}
console.log("THEO PHÉP SỬA:");
for (const [k, v] of Object.entries(dem).sort((a, b) => b[1] - a[1]))
  console.log(`  ${v}\t${k}`);

const loc = process.argv[2];
if (loc) {
  console.log(`\nDÒNG KHỚP “${loc}”:`);
  console.log(bao.filter((l) => l.includes(loc)).join("\n") || "(không có)");
}
