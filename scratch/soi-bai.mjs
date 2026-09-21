// Soi MOT bài: in ra từng slide (thứ tự, kiểu, các khoá của content).
// CÁCH DÙNG: node scratch/soi-bai.mjs g5-c4-l6
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const id = process.argv[2];
const lop = Number(id.match(/^g(\d)/)?.[1]);

const mod = await import(
  pathToFileURL(
    path.join(ROOT, "client", "src", "data", `grade${lop}Data.js`),
  ).href
);
const data = mod[`grade${lop}Data`];

for (const ch of data.chapters ?? []) {
  for (const l of ch.lessons ?? []) {
    if (l.id !== id) continue;
    console.log(`${l.id} | ${l.title}`);
    (l.slides ?? []).forEach((s, i) => {
      const keys = Object.keys(s.content ?? {});
      console.log(`  ${i + 1}. ${String(s.type).padEnd(9)} [${keys.join(", ")}]`);
    });
    process.exit(0);
  }
}
console.error("không thấy bài", id);
process.exit(1);
