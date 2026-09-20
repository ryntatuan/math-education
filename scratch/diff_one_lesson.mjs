// Chẩn đoán: vì sao `--verify` báo CẢ 362 bài "có nội dung khác" trong khi đếm
// đúng hết. Nghi phép SO SÁNH sai, không nghi dữ liệu — khi mọi thứ đều lệch thì
// cái thước là chỗ đáng ngờ trước tiên.
//
// Chạy: node scratch/diff_one_lesson.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function napEnv() {
  for (const f of ["admin/.env.local", "client/.env.local"]) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) continue;
    const env = {};
    for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
      if (m) env[m[1]] = m[2];
    }
    if (env.VITE_SUPABASE_URL?.startsWith("https://")) return env;
  }
  return null;
}

const ENV = napEnv();
const URL_SB = ENV.VITE_SUPABASE_URL;
const anon = ENV.VITE_SUPABASE_ANON_KEY;

const mod = await import(
  new URL("../client/src/data/grade1Data.js", import.meta.url)
);
const lesson = mod.grade1Data.chapters[0].lessons[0];

const r = await fetch(
  `${URL_SB}/rest/v1/content_lessons?id=eq.${lesson.id}` +
    `&select=id,title,lesson_type,description,payload`,
  { headers: { apikey: anon, Authorization: `Bearer ${anon}` } },
);
const db = (await r.json())[0];

console.log("Bài:", lesson.id, "\n");

console.log("── So từng trường vô hướng ──");
for (const [ten, a, b] of [
  ["title", db.title, lesson.title],
  ["lesson_type", db.lesson_type, lesson.type],
  ["description", db.description ?? null, lesson.description ?? null],
]) {
  console.log(
    `  ${ten.padEnd(12)} ${JSON.stringify(a) === JSON.stringify(b) ? "KHỚP" : "KHÁC"}`,
  );
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    console.log(`     DB  : ${JSON.stringify(a)}`);
    console.log(`     File: ${JSON.stringify(b)}`);
  }
}

console.log("\n── payload: 160 ký tự đầu ──");
const tuFile = JSON.stringify({ slides: lesson.slides });
const tuDb = JSON.stringify(db.payload);
console.log(`  DB  : ${tuDb.slice(0, 160)}`);
console.log(`  File: ${tuFile.slice(0, 160)}`);
console.log(`\n  Chuỗi bằng nhau?            ${tuDb === tuFile}`);

// Nếu chỉ khác THỨ TỰ KHOÁ thì sắp xếp lại khoá (giữ nguyên thứ tự MẢNG) sẽ bằng nhau.
const chuanHoa = (v) => {
  if (Array.isArray(v)) return v.map(chuanHoa);
  if (v && typeof v === "object")
    return Object.fromEntries(
      Object.keys(v)
        .sort()
        .map((k) => [k, chuanHoa(v[k])]),
    );
  return v;
};
const a = JSON.stringify(chuanHoa(db.payload));
const b = JSON.stringify(chuanHoa({ slides: lesson.slides }));
console.log(`  Sau khi sắp xếp khoá?        ${a === b}`);

if (a !== b) {
  // Tìm vị trí khác nhau đầu tiên để biết chính xác cái gì lệch.
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  console.log(`\n  Lệch ở ký tự ${i}:`);
  console.log(`     DB  : ...${a.slice(Math.max(0, i - 60), i + 80)}`);
  console.log(`     File: ...${b.slice(Math.max(0, i - 60), i + 80)}`);
}
