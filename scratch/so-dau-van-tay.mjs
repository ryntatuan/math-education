// So hai cách tính dấu vân tay seed: cách của cổng S-32 (đọc thẳng gradeNData.js)
// và giá trị đang ghi trong supabase/content-seed/.dau-van-tay.json.
import { createHash } from "node:crypto";
import fs from "node:fs";

const files = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];
const lessons = [];
for (const [file, key] of files) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  for (const ch of mod[key].chapters)
    for (const lesson of ch.lessons)
      lessons.push({ id: lesson.id, payload: { slides: lesson.slides } });
}
const bam = createHash("sha256")
  .update(JSON.stringify(lessons.map((l) => [l.id, l.payload])))
  .digest("hex")
  .slice(0, 16);
const ghi = JSON.parse(
  fs
    .readFileSync("supabase/content-seed/.dau-van-tay.json", "utf8")
    .replace(/^\uFEFF/, ""),
);
console.log("bài:", lessons.length);
console.log("băm thô (cách cổng):", bam);
console.log(
  "băm trong file  :",
  ghi.dauVanTay,
  "· bài",
  ghi.bai,
  "· slide",
  ghi.slide,
);
console.log(
  "slide (cách cổng):",
  lessons.reduce((s, l) => s + l.payload.slides.length, 0),
);
