#!/usr/bin/env node
/** Đếm các “dấu vết” nội dung sai còn sót trong dữ liệu (để biết còn phải sửa gì). */
import fs from "node:fs";
import path from "node:path";

const GOC = "client/src/data";
const MAU = {
  "ê-ke (Lớp 3)": /ê-ke/,
  "Bước 3 — Kiểm tra": /Bước 3 — Kiểm tra/,
  "4 góc vuông (Lớp 3)": /4 góc vuông/,
  "đường chéo (Lớp 4)": /đường chéo/,
  "tia số (Lớp 2)": /tia số/,
  "Bậc thang đơn vị (Lớp 2+)": /Bậc thang đơn vị/,
  "Số liền sau = …": /Số liền sau = số đó thêm 1/,
  "quiz liền sau": /Số liền sau của số \d+ là số nào/,
  "quiz so sánh (“lớn hơn”)": /Số nào lớn hơn: \d+ hay \d+\?/,
  "nhân (Lớp 2)": /×|[^ẽ] nhân /,
  "gấp/chia đều (Lớp 2)": /gấp mấy lần|chia đều/,
  "phân số (Lớp 3)": /phân số/,
  "làm tròn (Lớp 3)": /làm tròn/,
  "chu vi (Lớp 3)": /chu vi/,
  "diện tích (Lớp 3)": /diện tích/,
  "hình tứ giác (Lớp 2)": /tứ giác/,
  "phần trăm (Lớp 5)": /phần trăm/,
};

const rows = [];
for (const d of fs.readdirSync(GOC)) {
  const p = path.join(GOC, d);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const s = fs.readFileSync(path.join(p, f), "utf8");
    for (const [ten, re] of Object.entries(MAU)) {
      const n = (s.match(new RegExp(re.source, "g")) || []).length;
      if (n) rows.push([`${d}/${f}`, ten, n]);
    }
  }
}
const out = [];
const theoDau = {};
for (const [, ten, n] of rows) theoDau[ten] = (theoDau[ten] ?? 0) + n;
out.push("TỔNG THEO DẤU VẾT:");
for (const [ten, n] of Object.entries(theoDau)) out.push(`  ${n}\t${ten}`);
out.push("\nTHEO FILE:");
for (const r of rows) out.push(`  ${r[0]}\t${r[1]}\t${r[2]}`);
fs.writeFileSync("scratch/dau-vet.txt", out.join("\n"), "utf8");
console.log("→ scratch/dau-vet.txt");
