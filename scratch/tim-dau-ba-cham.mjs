#!/usr/bin/env node
/**
 * Tìm dấu “…” trong các file vừa sửa. Trong app, “…” trong ô bảng vẽ ra như Ô TRỐNG cần điền ⇒ nếu
 * slide chỉ để đọc mà có “…” thì trẻ chỉ nhìn, cổng `scratch/soat-o-trong.mjs` sẽ báo đỏ.
 * (Đã mắc thật 2026-09-29: 5 slide do chính công cụ sửa của tôi thêm vào.)
 *
 *   node scratch/tim-dau-ba-cham.mjs [--lop N]
 */
import fs from "node:fs";
import path from "node:path";

const chiLop = process.argv.includes("--lop")
  ? Number(process.argv[process.argv.indexOf("--lop") + 1])
  : null;
const out = [];
const GOC = "client/src/data";
for (const d of fs.readdirSync(GOC)) {
  const p = path.join(GOC, d);
  if (!fs.statSync(p).isDirectory()) continue;
  const lop = Number((d.match(/grade(\d)/) ?? [])[1] ?? 0);
  if (chiLop && lop !== chiLop) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const dong = fs.readFileSync(path.join(p, f), "utf8").split("\n");
    let bai = "?";
    dong.forEach((l, i) => {
      const m = l.match(/"?id"?: "(g[^"]+)"/);
      if (m) bai = m[1];
      if (l.includes("…"))
        out.push(`${p}/${f}:${i + 1}\t[${bai}]\t${l.trim().slice(0, 120)}`);
    });
  }
}
fs.writeFileSync("scratch/dau-ba-cham.txt", out.join("\n"), "utf8");
console.log(`${out.length} dòng có “…” → scratch/dau-ba-cham.txt`);
