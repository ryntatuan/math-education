// In GỌN danh sách bài của một lớp: mỗi bài một dòng, để soạn dữ liệu hình cho nhanh.
// CÁCH DÙNG: node scratch/in-gon.mjs 1
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const n = Number(process.argv[2] || 1);
const file = path.join(ROOT, "client", "src", "data", `grade${n}Data.js`);
const mod = await import(pathToFileURL(file).href);
const data = mod[`grade${n}Data`];

for (const ch of data.chapters ?? []) {
  console.log(`\n## ${ch.id} | ${ch.name}`);
  for (const l of ch.lessons ?? []) {
    const vis = (l.slides ?? []).find((s) => s.type === "visual");
    const t = String(vis?.content?.text ?? "").replace(/\n/g, " ⏎ ");
    const con = (l.slides ?? []).find((s) => s.type === "concept");
    const rule = String(con?.content?.rule ?? "").replace(/\n/g, " ⏎ ");
    console.log(
      `${l.id} | ${l.title} | HINH: ${t} | RULE: ${rule.slice(0, 150)}`,
    );
  }
}
