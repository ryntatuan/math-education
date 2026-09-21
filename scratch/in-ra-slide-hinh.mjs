// In ra nội dung của slide "hình ảnh" — những slide mang tên visual mà chỉ có chữ.
//
// CÁCH DÙNG: node scratch/in-ra-slide-hinh.mjs [lớp...]
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const grades = process.argv.slice(2).map(Number).filter(Boolean);
const list = grades.length ? grades : [1];

for (const n of list) {
  const file = path.join(ROOT, "client", "src", "data", `grade${n}Data.js`);
  const mod = await import(pathToFileURL(file).href);
  const data = mod[`grade${n}Data`];

  console.log("═".repeat(78));
  console.log(`  LỚP ${n} — slide "hình ảnh" đang chỉ có chữ`);
  console.log("═".repeat(78));

  for (const chapter of data.chapters ?? []) {
    console.log(`\n── ${chapter.name}`);
    for (const lesson of chapter.lessons ?? []) {
      const vis = (lesson.slides ?? []).find((s) => s.type === "visual");
      if (!vis) {
        console.log(`  ${lesson.id}  ⚠️ KHÔNG CÓ SLIDE HÌNH`);
        continue;
      }
      const text = vis.content?.text ?? "";
      console.log(`  ${lesson.id.padEnd(10)} ${lesson.title}`);
      console.log(`  ${" ".repeat(10)} hình: "${text}"`);
    }
  }
  console.log("");
}
