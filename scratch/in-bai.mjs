// In nội dung vài bài học ra dạng đọc được (để sửa tay cho chính xác).
//
// Chạy: node scratch/in-bai.mjs g1-c2-l1 g1-c2-l2 ...   (hoặc để trống = cả chương g1-c2)
//
// VÌ SAO CẦN: dữ liệu bài học nằm trong file .js khổng lồ, mở bằng mắt rất dễ lạc. Script này
// in ra đúng những gì cần để sửa: loại slide, các khoá hình, và nội dung JSON của slide.

import { writeFileSync } from "node:fs";

const NGUON = {
  g1: ["grade1Data.js", "grade1Data"],
  g2: ["grade2Data.js", "grade2Data"],
  g3: ["grade3Data.js", "grade3Data"],
  g4: ["grade4Data.js", "grade4Data"],
  g5: ["grade5Data.js", "grade5Data"],
};

const thamSo = process.argv.slice(2);
const loc = thamSo.length ? thamSo : ["g1-c2-l"];
const theo = [...new Set(loc.map((x) => x.split("-")[0]))];

const ra = [];
for (const g of theo) {
  const [file, key] = NGUON[g];
  const mod = await import(`../client/src/data/${file}`);
  const data = mod[key];
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      if (!loc.some((l) => bai.id.startsWith(l))) continue;
      ra.push(
        `\n${"=".repeat(90)}\nBÀI ${bai.id} — ${bai.title}\n${"=".repeat(90)}`,
      );
      const slides = bai.slides || [];
      slides.forEach((sl, i) => {
        const c = sl.content || {};
        ra.push(`\n--- slide #${i} (${sl.type}) ---`);
        for (const [k, v] of Object.entries(c)) {
          const s = typeof v === "string" ? v : JSON.stringify(v);
          ra.push(`  ${k}: ${s.length > 400 ? s.slice(0, 400) + "…" : s}`);
        }
      });
    }
  }
}

const out = ra.join("\n");
writeFileSync("scratch/in-bai.txt", out, "utf8");
console.log(`Đã ghi scratch/in-bai.txt (${out.split("\n").length} dòng)`);
