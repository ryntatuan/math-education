#!/usr/bin/env node
/** Liệt kê chỗ có tấn/tạ/yến/ml/hm/dam/giây trong Lớp 2–3 (đơn vị học ở lớp sau). */
import fs from "node:fs";
import path from "node:path";

const RE = /(\btấn\b|\btạ\b|\byến\b|\bml\b|\bhm\b|\bdam\b|\bgiây\b)/i;
const LOP = ["grade2", "grade3"];
const out = [];
for (const d of LOP) {
  const p = path.join("client/src/data", d);
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const dong = fs.readFileSync(path.join(p, f), "utf8").split("\n");
    let bai = "?";
    dong.forEach((l, i) => {
      const m = l.match(/"?id"?: "(g[^"]+)"/);
      if (m) bai = m[1];
      const k = l.match(RE);
      if (k)
        out.push(
          `${d}/${f}:${i + 1}\t[${bai}]\t${k[1]}\t${l.trim().slice(0, 140)}`,
        );
    });
  }
}
fs.writeFileSync("scratch/lop23-don-vi-som.txt", out.join("\n"), "utf8");
console.log(out.length, "dòng → scratch/lop23-don-vi-som.txt");
