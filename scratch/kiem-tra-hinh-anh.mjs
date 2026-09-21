// Đo mức dùng HÌNH ẢNH trong nội dung bài học.
//
// 🔴 VÌ SAO CẦN. `LessonPage.jsx` đã dựng sẵn cả một hệ thống hình vẽ đọc từ dữ liệu
// (`content.clock`, `content.shape` + `shapeLabel`, `content.operation`,
// `content.comparison`, `content.activityGrid`, `content.gallery` + `galleryTitle`,
// `content.dialogue`, và `visualDisplay` trên slide quiz). Nhưng nếu nội dung KHÔNG
// khai những khoá đó thì không có gì được vẽ — slide chỉ còn chữ.
// Script này đo xem thực tế có bao nhiêu slide dùng hình, và bao nhiêu bài hoàn toàn
// không có hình nào.
//
// CÁCH DÙNG:  node scratch/kiem-tra-hinh-anh.mjs [--theo-lop]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// Các khoá mà `LessonPage.jsx` biết cách VẼ thành hình.
const VISUAL_KEYS = [
  // bộ vẽ CŨ (đã có trong LessonPage từ trước)
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
  // bộ vẽ MỚI (Giai đoạn 1) — `client/src/components/visuals/*`
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

const gradeFiles = [1, 2, 3, 4, 5].map((n) => ({
  grade: n,
  file: path.join(ROOT, "client", "src", "data", `grade${n}Data.js`),
}));

const perGrade = [];
let totalSlides = 0;
let totalVisualSlides = 0;
let totalLessons = 0;
let lessonsWithoutAnyVisual = 0;
const lessonsWithoutVisual = [];
const fieldUse = Object.fromEntries(VISUAL_KEYS.map((k) => [k, 0]));

for (const { grade, file } of gradeFiles) {
  const mod = await import(pathToFileURL(file).href);
  const data = mod[`grade${grade}Data`];
  if (!data) {
    console.error(`⚠️  ${path.basename(file)} không export grade${grade}Data`);
    continue;
  }

  let slides = 0;
  let visualSlides = 0;
  let lessons = 0;
  let lessonsBlank = 0;

  for (const chapter of data.chapters ?? []) {
    for (const lesson of chapter.lessons ?? []) {
      lessons++;
      let lessonHasVisual = false;
      for (const slide of lesson.slides ?? []) {
        slides++;
        const c = slide.content ?? {};
        const used = VISUAL_KEYS.filter(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        if (used.length) {
          visualSlides++;
          lessonHasVisual = true;
          for (const k of used) fieldUse[k]++;
        }
      }
      if (!lessonHasVisual) {
        lessonsBlank++;
        lessonsWithoutVisual.push({
          id: lesson.id,
          title: lesson.title,
          chapter: chapter.name,
        });
      }
    }
  }

  totalSlides += slides;
  totalVisualSlides += visualSlides;
  totalLessons += lessons;
  lessonsWithoutAnyVisual += lessonsBlank;
  perGrade.push({ grade, slides, visualSlides, lessons, lessonsBlank });
}

const pct = (a, b) => (b ? ((a / b) * 100).toFixed(1) : "0.0");

console.log(
  "══════════════════════════════════════════════════════════════════════",
);
console.log("  HÌNH ẢNH TRONG BÀI HỌC — đo 5 lớp");
console.log(
  "══════════════════════════════════════════════════════════════════════\n",
);

console.log("  Lớp   slide   slide có hình   bài   bài KHÔNG có hình nào");
console.log("  ─────────────────────────────────────────────────────────────");
for (const g of perGrade)
  console.log(
    `   ${g.grade}    ${String(g.slides).padStart(5)}` +
      `   ${String(g.visualSlides).padStart(5)} (${pct(g.visualSlides, g.slides)}%)` +
      `   ${String(g.lessons).padStart(4)}` +
      `   ${String(g.lessonsBlank).padStart(5)} (${pct(g.lessonsBlank, g.lessons)}%)`,
  );
console.log("  ─────────────────────────────────────────────────────────────");
console.log(
  `  TỔNG  ${String(totalSlides).padStart(5)}` +
    `   ${String(totalVisualSlides).padStart(5)} (${pct(totalVisualSlides, totalSlides)}%)` +
    `   ${String(totalLessons).padStart(4)}` +
    `   ${String(lessonsWithoutAnyVisual).padStart(5)} (${pct(lessonsWithoutAnyVisual, totalLessons)}%)`,
);

console.log(`\n  Số slide dùng từng loại hình:`);
for (const k of VISUAL_KEYS)
  console.log(`    ${k.padEnd(14)} ${String(fieldUse[k]).padStart(5)}`);

if (process.argv.includes("--theo-lop") || lessonsWithoutVisual.length <= 40) {
  const showAll = lessonsWithoutVisual.length <= 40;
  const list = showAll
    ? lessonsWithoutVisual
    : lessonsWithoutVisual.slice(0, 0);
  if (list.length) {
    console.log(
      `\n  Bài KHÔNG có hình nào (${lessonsWithoutVisual.length} bài):`,
    );
    for (const l of list) console.log(`    ${l.id.padEnd(14)} ${l.title}`);
  }
}
