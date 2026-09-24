/**
 * In cấu trúc chương/bài của một lớp (id · tên · mô tả) — dùng để dựng bảng ánh xạ trang→bài.
 *
 * Chạy: npx esbuild scratch/in-cau-truc-lop.mjs --bundle --platform=node --format=esm
 *        --outfile=scratch/in-cau-truc-lop.cjs ; node scratch/in-cau-truc-lop.cjs 1
 */
import fs from "node:fs";

import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const NGUON = {
  1: grade1Data,
  2: grade2Data,
  3: grade3Data,
  4: grade4Data,
  5: grade5Data,
};

const lop = Number(process.argv[2] || 1);
const d = NGUON[lop];
if (!d) {
  console.log(`❌ không có lớp ${lop}`);
  process.exit(1);
}

const dong = [];
const out = (s = "") => {
  dong.push(s);
  console.log(s);
};

let soBai = 0;
let soSlide = 0;
for (const ch of d.chapters) {
  const soSlideCh = ch.lessons.reduce((t, l) => t + (l.slides?.length || 0), 0);
  out(
    `\n[${ch.id}] ${ch.name} — ${ch.lessons.length} bài · ${soSlideCh} slide`,
  );
  for (const l of ch.lessons) {
    soBai++;
    soSlide += l.slides?.length || 0;
    out(`  ${l.id} | ${l.title} | ${l.description || "(không mô tả)"}`);
  }
}
out(
  `\nTỔNG lớp ${lop}: ${d.chapters.length} chương · ${soBai} bài · ${soSlide} slide`,
);

// Ghi thêmfile UTF-8 (đừng dựa vào `>` của PowerShell: PS 5.1 ghi UTF-16)
const ra = `scratch/cau-truc-lop${lop}.md`;
fs.writeFileSync(
  ra,
  `# Cấu trúc Lớp ${lop} (sinh tự động)\n\n\`\`\`\n${dong.join("\n")}\n\`\`\`\n`,
  "utf8",
);
console.log(`\nđã ghi ${ra}`);
