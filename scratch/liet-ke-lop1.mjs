#!/usr/bin/env node
/** Liệt kê mọi chỗ trong Lớp 1 có dấu hiệu kiến thức Lớp 2+ (để quyết định bỏ/sửa). */
import fs from "node:fs";
import path from "node:path";

const RE =
  /(\d\s*×\s*\d|m bằng bao nhiêu|dm|mm|ki-lô-mét|\bnhân\b|\bchia\b|giây|phút|chu vi|diện tích|bảng nhân|phân số|tia số|ê-ke|góc vuông|đường chéo|liền sau|liền trước|tứ giác|làm tròn)/;

const out = [];
const GOC = "client/src/data/grade1";
for (const f of fs.readdirSync(GOC)) {
  if (!f.endsWith(".js")) continue;
  const dong = fs.readFileSync(path.join(GOC, f), "utf8").split("\n");
  let bai = "?";
  let loai = "";
  dong.forEach((l, i) => {
    const m = l.match(/"?id"?: "(g[^"]+)"/);
    if (m) bai = m[1];
    const t = l.match(/^\s*"?type"?: "([a-z]+)"/);
    if (t) loai = t[1];
    const k = l.match(RE);
    if (k)
      out.push(
        `${f}:${i + 1}\t[${bai}]\t${loai}\t${k[1]}\t${l.trim().slice(0, 130)}`,
      );
  });
}
fs.writeFileSync("scratch/lop1-nghi-ngo.txt", out.join("\n"), "utf8");

const dem = {};
for (const l of out) {
  const k = l.split("\t")[3];
  dem[k] = (dem[k] ?? 0) + 1;
}
console.log("THEO TỪ KHOÁ:", JSON.stringify(dem));
console.log("TỔNG:", out.length, "→ scratch/lop1-nghi-ngo.txt");
