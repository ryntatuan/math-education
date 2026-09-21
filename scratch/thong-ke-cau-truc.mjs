// Kiểm kê CẤU TRÚC slide của cả 5 lớp, để biết chính xác chỗ nào cần bổ sung hình.
//
// VÌ SAO CẦN: `docs/lesson_visuals_plan.md` giai đoạn 2-4 phải "tiêm" dữ liệu hình vào
// slide. Muốn tiêm đúng thì phải biết mỗi loại slide đang mang những khoá nào, với số
// lượng bao nhiêu. Đoán mò rất dễ sinh ra khoá mà `LessonPage.jsx` không hề đọc.
//
// CÁCH DÙNG:
//   node scratch/thong-ke-cau-truc.mjs             // in bản tóm tắt
//   node scratch/thong-ke-cau-truc.mjs --json      // ghi toàn bộ ra scratch/cau-truc-slide.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Khoá mà bộ vẽ MỚI đọc được (giai đoạn 1).
const NEW_VISUAL_KEYS = [
  "baseTen",
  "tenFrame",
  "numberLine",
  "placeValue",
  "ruler",
  "money",
  "table",
  "planeShape",
  "angle",
  "circleParts",
  "solid",
  "fractionBar",
  "fractionCircle",
  "barModel",
  "motionDiagram",
  "barChart",
  "pieChart",
];

// Khoá mà bộ vẽ CŨ của `LessonPage.jsx` đã đọc.
const OLD_VISUAL_KEYS = [
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
];

const report = {};
let grand = 0;

for (const n of [1, 2, 3, 4, 5]) {
  const file = path.join(ROOT, "client", "src", "data", `grade${n}Data.js`);
  const mod = await import(pathToFileURL(file).href);
  const data = mod[`grade${n}Data`];

  const byType = {}; // type -> { count, keysets: Map<keyset, {count, sample}> }
  let slides = 0;
  let lessons = 0;
  let chapters = 0;

  for (const chapter of data.chapters ?? []) {
    chapters++;
    for (const lesson of chapter.lessons ?? []) {
      lessons++;
      for (const slide of lesson.slides ?? []) {
        slides++;
        const t = slide.type ?? "(không có type)";
        const c = slide.content ?? {};
        const keys = Object.keys(c)
          .filter((k) => c[k] !== undefined && c[k] !== null)
          .sort();
        const sig = keys.join("+") || "(rỗng)";
        byType[t] ??= { count: 0, keysets: new Map() };
        byType[t].count++;
        const entry = byType[t].keysets.get(sig) ?? { count: 0, sample: null };
        entry.count++;
        if (!entry.sample) {
          entry.sample = {
            lesson: lesson.id,
            title: lesson.title,
            content: JSON.parse(JSON.stringify(c)),
          };
        }
        byType[t].keysets.set(sig, entry);
      }
    }
  }

  grand += slides;
  report[n] = { chapters, lessons, slides, byType };
}

// ── In bản tóm tắt ──────────────────────────────────────────────────────────
console.log("═".repeat(74));
console.log("  KIỂM KÊ CẤU TRÚC SLIDE — 5 LỚP");
console.log("═".repeat(74));
console.log("");

for (const n of [1, 2, 3, 4, 5]) {
  const g = report[n];
  console.log(
    `LỚP ${n}: ${g.chapters} chương · ${g.lessons} bài · ${g.slides} slide`,
  );
  const types = Object.entries(g.byType).sort((a, b) => b[1].count - a[1].count);
  for (const [type, info] of types) {
    console.log(`  ${type.padEnd(12)} ${String(info.count).padStart(5)}`);
    const sets = [...info.keysets.entries()].sort(
      (a, b) => b[1].count - a[1].count,
    );
    for (const [sig, s] of sets) {
      const mark =
        NEW_VISUAL_KEYS.some((k) => sig.split("+").includes(k)) ? " ★mới" : "";
      console.log(
        `      ${String(s.count).padStart(5)}  ${sig.slice(0, 100)}${mark}`,
      );
    }
  }
  console.log("");
}

// ── Đếm khả năng vẽ được ────────────────────────────────────────────────────
let withOld = 0;
let withNew = 0;
let drawable = 0;
let blank = 0;
for (const n of [1, 2, 3, 4, 5]) {
  for (const [type, info] of Object.entries(report[n].byType)) {
    for (const [sig, s] of info.keysets) {
      const keys = sig === "(rỗng)" ? [] : sig.split("+");
      const hasOld = keys.some((k) => OLD_VISUAL_KEYS.includes(k));
      const hasNew = keys.some((k) => NEW_VISUAL_KEYS.includes(k));
      if (hasOld) withOld += s.count;
      if (hasNew) withNew += s.count;
      // Slide "có thể vẽ" = có nội dung toán học để minh hoạ, không phải slide chữ suông.
      if (keys.length && type !== "summary") drawable += s.count;
      else blank += s.count;
    }
  }
}

console.log("─".repeat(74));
console.log(`  TỔNG: ${grand} slide`);
console.log(`  Dùng bộ vẽ CŨ : ${withOld}`);
console.log(`  Dùng bộ vẽ MỚI: ${withNew}`);
console.log(`  Có nội dung để vẽ (trừ summary/chữ suông): ${drawable}`);
console.log(`  Chữ suông / summary: ${blank}`);
console.log("─".repeat(74));

if (process.argv.includes("--json")) {
  const out = {};
  for (const n of [1, 2, 3, 4, 5]) {
    out[n] = {
      chapters: report[n].chapters,
      lessons: report[n].lessons,
      slides: report[n].slides,
      types: Object.fromEntries(
        Object.entries(report[n].byType).map(([t, info]) => [
          t,
          {
            count: info.count,
            keysets: [...info.keysets.entries()].map(([sig, s]) => ({
              keys: sig,
              count: s.count,
              sample: s.sample,
            })),
          },
        ]),
      ),
    };
  }
  const dest = path.join(ROOT, "scratch", "cau-truc-slide.json");
  fs.writeFileSync(dest, JSON.stringify(out, null, 2), "utf8");
  console.log(`  → đã ghi ${path.relative(ROOT, dest)}`);
}
