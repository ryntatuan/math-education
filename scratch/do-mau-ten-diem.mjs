#!/usr/bin/env node
/** Chạy CHÍNH hai mẫu của `soat-ten-diem.mjs` trên chữ của một slide để biết nó bắt oan cái gì.
 *
 *   node scratch/do-mau-ten-diem.mjs g1-c2-l4 1
 */
import fs from "node:fs";
import path from "node:path";

const [maBai, soSlide] = process.argv.slice(2);
const MAU = [
  /(?:đoạn thẳng|trung điểm|cạnh|đỉnh|điểm|tam giác|tứ giác|góc|hình thang|hình bình hành|hình thoi)\s*\(?\s*([A-Z]{2,4}|[A-Z](?:\s*,\s*[A-Z])+)(?![\p{L}])/gu,
  /\b([A-Z]{2,4})\s*(?:dài|bằng|có|gồm|tạo|và)\b/gu,
];

let chu = "";
let viTri = "?";
for (const d of fs.readdirSync("client/src/data")) {
  const p = path.join("client/src/data", d);
  if (!fs.statSync(p).isDirectory()) continue;
  for (const f of fs.readdirSync(p)) {
    if (!f.endsWith(".js")) continue;
    const mod = await import(
      `file:///${path.resolve(p, f).replace(/\\/g, "/")}`
    );
    const data = Object.values(mod).find(
      (v) => v && (Array.isArray(v.chapters) || Array.isArray(v.lessons)),
    );
    for (const c of Array.isArray(data?.chapters)
      ? data.chapters
      : data
        ? [data]
        : []) {
      for (const l of c.lessons ?? []) {
        if (l.id !== maBai) continue;
        const c2 = l.slides[Number(soSlide)].content ?? {};
        chu = [
          c2.text,
          c2.question,
          c2.title,
          c2.rule,
          c2.explanation,
          c2.mascotHint,
          ...(c2.points || []),
        ]
          .map((x) => String(x ?? ""))
          .join(" \n ");
        viTri = `${p}/${f} · ${maBai} #${soSlide}`;
      }
    }
  }
}
console.log(`chữ đọc của ${viTri}:\n${chu}\n--- mẫu khớp:`);
MAU.forEach((re, i) => {
  re.lastIndex = 0;
  for (const m of chu.matchAll(re)) {
    console.log(
      `  mẫu ${i + 1}: khớp ${JSON.stringify(m[0])} tại vị trí ${m.index} · mã ký tự: ${[
        ...m[0],
      ]
        .map((c) => c.codePointAt(0).toString(16))
        .join(" ")}`,
    );
    console.log(
      `      ngữ cảnh: ${JSON.stringify(chu.slice(Math.max(0, m.index - 18), m.index + m[0].length + 12))}`,
    );
  }
});
