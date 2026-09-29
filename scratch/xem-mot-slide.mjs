#!/usr/bin/env node
/** In nội dung đầy đủ của slide thứ N trong một bài (để chép đúng schema khi thêm hình).
 *
 *   node scratch/xem-mot-slide.mjs g1-c7-l8 8
 */
import fs from "node:fs";
import path from "node:path";

const [maBai, soSlide] = process.argv.slice(2);
const GOC = "client/src/data";
let ra = "(không thấy)";
for (const d of fs.readdirSync(GOC)) {
  const p = path.join(GOC, d);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const mod = await import(
      `file:///${path.resolve(p, f).replace(/\\/g, "/")}`
    );
    const data = Object.values(mod).find(
      (v) => v && (Array.isArray(v.chapters) || Array.isArray(v.lessons)),
    );
    if (!data) continue;
    for (const c of Array.isArray(data.chapters) ? data.chapters : [data]) {
      for (const l of c.lessons ?? []) {
        if (l.id !== maBai) continue;
        ra = JSON.stringify(l.slides[Number(soSlide)], null, 2);
      }
    }
  }
}
console.log(ra);
