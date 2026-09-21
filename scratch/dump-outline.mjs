// In ra bản tóm tắt chương trình học (lớp -> chương -> bài -> slide) để đối chiếu với SGK.
// Ghi thẳng file UTF-8 để tránh lỗi mã hoá của PowerShell.
//
//   node scratch/dump-outline.mjs              -> tất cả các lớp
//   node scratch/dump-outline.mjs g2           -> chỉ lớp 2
//   node scratch/dump-outline.mjs g2 c4        -> chỉ chương 4 lớp 2
//   node scratch/dump-outline.mjs g2 c4 full   -> kèm toàn bộ nội dung slide

import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "client", "src", "data");

const [, , gradeArg, chapterArg, modeArg] = process.argv;
const full = modeArg === "full";

const lines = [];
const say = (s = "") => lines.push(s);

const SLIDE_LABEL = {
  story: "kể chuyện",
  concept: "khái niệm",
  visual: "hình ảnh",
  quiz: "câu hỏi",
  summary: "tóm tắt",
  practice: "luyện tập",
};

function slideText(slide) {
  const c = slide.content ?? {};
  const bits = [];
  if (c.badge) bits.push(`nhãn: ${c.badge}`);
  if (c.title) bits.push(`tiêu đề: ${c.title}`);
  if (c.explanation) bits.push(`giải thích: ${c.explanation}`);
  if (c.rule) bits.push(`quy tắc: ${c.rule}`);
  if (c.text) bits.push(`chữ: ${c.text}`);
  if (Array.isArray(c.points))
    bits.push(`gạch đầu dòng: ${c.points.join(" | ")}`);
  if (c.question) {
    bits.push(`hỏi: ${c.question}`);
    bits.push(
      `đáp án: ${JSON.stringify(c.answer)} · lựa chọn: ${JSON.stringify(c.options)}`,
    );
  }
  return bits;
}

for (const grade of [1, 2, 3, 4, 5]) {
  if (gradeArg && gradeArg !== `g${grade}`) continue;
  const mod = await import(
    pathToFileURL(path.join(DATA, `grade${grade}Data.js`)).href
  );
  const g = mod[`grade${grade}Data`];
  if (!g) continue;

  let lessonCount = 0;
  let slideCount = 0;
  for (const ch of g.chapters) {
    lessonCount += ch.lessons.length;
    for (const l of ch.lessons) slideCount += l.slides?.length ?? 0;
  }
  say(
    `================ LỚP ${grade} — ${g.chapters.length} chương · ${lessonCount} bài · ${slideCount} slide ================`,
  );
  say(`mô tả: ${g.description}`);
  say();

  for (const ch of g.chapters) {
    if (chapterArg && !ch.id.endsWith(`-${chapterArg}`)) continue;
    say(`--- ${ch.id} · ${ch.name}`);
    say(`    mô tả chương: ${ch.description}`);
    say(
      `    totalLessons khai báo: ${ch.totalLessons} · thực tế: ${ch.lessons.length}`,
    );
    for (const l of ch.lessons) {
      const slides = l.slides ?? [];
      const kinds = slides.map((s) => SLIDE_LABEL[s.type] ?? s.type).join(", ");
      say(`  [${l.id}] ${l.title}`);
      say(`      mô tả: ${l.description}`);
      say(`      ${slides.length} slide: ${kinds}`);
      if (full) {
        slides.forEach((s, i) => {
          say(`      · slide ${i + 1} (${s.type})`);
          for (const b of slideText(s)) say(`          ${b}`);
        });
      }
    }
    say();
  }
}

const out = path.join(ROOT, "scratch", "outline.txt");
writeFileSync(out, lines.join("\n") + "\n", "utf8");
console.log(`da ghi ${out} (${lines.length} dong)`);
