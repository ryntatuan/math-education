#!/usr/bin/env node
/** Đếm chỗ có đơn vị NGOÀI chương trình của lớp đó (tấn · tạ · yến · ml · hm · dam · giây …). */
import fs from "node:fs";
import path from "node:path";

const MAU = {
  "tấn · tạ · yến (Lớp 4)": /\btấn\b|\btạ\b|\byến\b/i,
  "ml (mi-li-lít)": /\bml\b/i,
  "hm · dam (Lớp 3)": /\bhm\b|\bdam\b/i,
  giây: /\bgiây\b/i,
  "tia số": /tia số/i,
  "ê-ke": /ê-ke/i,
  "góc vuông": /góc vuông/i,
  "đường chéo": /đường chéo/i,
};

const out = [];
for (const d of fs.readdirSync("client/src/data")) {
  const p = path.join("client/src/data", d);
  if (!fs.statSync(p).isDirectory()) continue;
  const lop = Number((d.match(/grade(\d)/) ?? [])[1] ?? 0);
  if (!lop) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const s = fs.readFileSync(path.join(p, f), "utf8");
    for (const [ten, re] of Object.entries(MAU)) {
      const k = s.match(new RegExp(re.source, "gi")) || [];
      if (k.length) out.push(`Lớp ${lop}  ${d}/${f}  ${ten}: ${k.length}`);
    }
  }
}
fs.writeFileSync(
  "scratch/don-vi-ngoai-chuong-trinh.txt",
  out.join("\n"),
  "utf8",
);
console.log(out.join("\n") || "(sạch)");
