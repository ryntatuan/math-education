#!/usr/bin/env node
/**
 * In mọi slide của một bài để soi nhanh: loại slide · khoá của `content` · câu hỏi.
 *
 *   node scratch/xem-slide-bai.mjs g1-c7-l8
 */
import fs from "node:fs";
import path from "node:path";

const [maBai] = process.argv.slice(2);
const GOC = "client/src/data";

let ra = [];
for (const d of fs.readdirSync(GOC)) {
  const p = path.join(GOC, d);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const mod = await import(
      `file:///${path.resolve(p, f).replace(/\\/g, "/")}`
    );
    // ⚠ File chương (`g1c7.js`) export `{ ..., lessons: [...] }`; file `gradeNData.js` mới có `chapters`.
    const data = Object.values(mod).find(
      (v) => v && (Array.isArray(v.chapters) || Array.isArray(v.lessons)),
    );
    if (!data) continue;
    const chuong = Array.isArray(data.chapters) ? data.chapters : [data];
    for (const c of chuong) {
      for (const l of c.lessons ?? []) {
        if (!l.id.startsWith(maBai)) continue;
        ra.push(`=== ${l.id} · ${l.title} · ${(l.slides || []).length} slide`);
        (l.slides || []).forEach((s, i) => {
          const k = s.content || {};
          ra.push(
            `  #${i} [${s.type}] khoá=${Object.keys(k).join(",")}\n      ${String(
              k.question || k.text || k.title || "",
            )
              .replace(/\s+/g, " ")
              .slice(0, 130)}`,
          );
        });
      }
    }
  }
}
console.log(ra.join("\n") || `(không thấy bài ${maBai})`);
