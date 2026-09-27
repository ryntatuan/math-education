// RÀ TÍNH ĐÚNG ĐẮN DỮ LIỆU BÀI HỌC — 5 lớp, đọc thẳng file trong repo.
//
// VÌ SAO CẦN: những lỗi dưới đây đều HỎNG ÂM THẦM — app không báo gì, bé chỉ thấy thiếu
// hoặc sai. Ví dụ thật đã gặp: gõ sai tên khoá hình (`numberline` thay vì `numberLine`) thì
// `VisualBlocks` bỏ qua khoá đó ⇒ slide KHÔNG CÓ HÌNH mà không ai biết.
//
// DÙNG: node scratch/soat-dung-dan-du-lieu.mjs [--ghi-bao-cao <file>]
import { writeFileSync } from "node:fs";

import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const GRADES = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];

// Khoá KHÔNG phải hình — để không tố oan. Gồm khoá chữ thường dùng và khoá hình của bộ vẽ cũ
// (xem danh sách khối hình cũ ở đầu `client/src/components/visuals/VisualBlock.jsx`).
const KHONG_PHAI_HINH = new Set([
  "text",
  "title",
  "badge",
  "explanation",
  "points",
  "rule",
  "steps",
  "note",
  "label",
  "question",
  "options",
  "answer",
  "correctAnswer",
  "answers",
  "questionType",
  "unit",
  "mascotMood",
  "mascotHint",
  "mascotLine",
  "hint",
  "tips",
  "tip",
  "subtitle",
  "heading",
  "example",
  "exampleText",
  "focusGraphic",
  "shapeLabel",
  "galleryTitle",
  "dialogueList",
  "number",
  "count",
  "value",
  "kind",
  "mode",
  "groups",
  "items",
  "emoji",
  "name",
  "id",
  "type",
  "content",
  "slides",
  "headers",
  "rows",
  "columns",
  "hintText",
  "afterText",
  "beforeText",
  "quote",
  "source",
  "author",
  "instruction",
  "task",
  "goal",
  "pair",
  "pairs",
  "left",
  "right",
  "top",
  "bottom",
  "highlight",
  "color",
  "size",
  "width",
  "height",
]);
const KHOA_HINH_CU = new Set([
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
  "shapePicture",
  // `planeShapes` (SỐ NHIỀU) là khoá hợp lệ, được vẽ thật ở `VisualBlock.jsx:80` và dùng ở
  // 17 file dữ liệu — thiếu nó thì cổng rà TỐ OAN (đã mắc).
  "planeShapes",
]);
const KHOA_HINH = new Set([...HINH_KEYS, ...KHOA_HINH_CU]);

// Chữ GIAO VIỆC — bé đọc xong phải làm gì đó ngay trên slide này.
const GIAO_VIEC =
  /chọn số|chọn hình|chọn đáp án|điền số|nối|đếm rồi|viết số|đặt tính|tô màu/i;

const loi = [];
const nghiNgo = [];
const demKhoaLa = new Map();
let soBai = 0;
let soSlide = 0;

for (const g of GRADES) {
  const chuongIds = new Set();
  for (const ch of g.chapters ?? []) {
    if (chuongIds.has(ch.id)) loi.push(`[trùng id chương] ${ch.id}`);
    chuongIds.add(ch.id);
    const baiIds = new Set();
    for (const b of ch.lessons ?? []) {
      soBai++;
      if (baiIds.has(b.id)) loi.push(`[trùng id bài] ${b.id}`);
      baiIds.add(b.id);
      if (!b.title) loi.push(`[thiếu title] ${b.id}`);
      const slides = b.slides ?? [];
      if (!slides.length) loi.push(`[bài không có slide] ${b.id}`);
      const cauHoi = [];
      for (const s of slides) {
        soSlide++;
        const c = s?.content;
        if (!c || typeof c !== "object" || !Object.keys(c).length) {
          loi.push(`[slide thiếu content] ${b.id} · ${s?.type ?? "?"}`);
          continue;
        }
        // Khoá lạ: nghi gõ sai tên khoá hình ⇒ hình không hiện mà không báo gì.
        for (const k of Object.keys(c)) {
          if (KHOA_HINH.has(k) || KHONG_PHAI_HINH.has(k)) continue;
          const key = `${k} (${b.id})`;
          if (!demKhoaLa.has(k)) demKhoaLa.set(k, []);
          if (demKhoaLa.get(k).length < 3) demKhoaLa.get(k).push(b.id);
          void key;
        }
        if (s.type === "quiz") {
          const q = c.question;
          if (typeof q !== "string" || !q.trim())
            loi.push(`[câu hỏi rỗng] ${b.id}`);
          else cauHoi.push(q);
          const opts = c.options;
          if (Array.isArray(opts)) {
            const chuoi = opts.map((o) => JSON.stringify(o));
            const trung = chuoi.filter((o, i) => chuoi.indexOf(o) !== i);
            if (trung.length)
              loi.push(
                `[đáp án trùng nhau] ${b.id} · ${q?.slice(0, 50)} · ${[...new Set(trung)].join(" / ")}`,
              );
            if (opts.length < 2)
              loi.push(`[quá ít lựa chọn] ${b.id} · ${q?.slice(0, 50)}`);
            const dap = c.answer ?? c.correctAnswer;
            if (dap !== undefined) {
              const co = chuoi.includes(JSON.stringify(dap));
              if (!co)
                loi.push(
                  `[ĐÁP ÁN KHÔNG NẰM TRONG LỰA CHỌN] ${b.id} · "${q?.slice(0, 60)}" · answer=${JSON.stringify(dap)} · options=${JSON.stringify(opts)}`,
                );
            } else {
              nghiNgo.push(
                `[quiz không có answer] ${b.id} · "${q?.slice(0, 60)}"`,
              );
            }
          } else if (opts !== undefined) {
            loi.push(`[options không phải mảng] ${b.id}`);
          }
        }
        // Slide "DOẠ SUÔNG": chữ giao việc mà không có chỗ cho bé làm (đã gặp thật:
        // "Đếm rồi chọn số thích hợp" nhưng bên dưới không có gì bấm).
        const chuGiaoViec = `${c.text ?? ""} ${c.title ?? ""}`;
        if (
          GIAO_VIEC.test(chuGiaoViec) &&
          typeof c.question !== "string" &&
          !Array.isArray(c.options) &&
          !Array.isArray(c.answers) &&
          c.answer === undefined &&
          !c.interactiveTable &&
          !c.dotCards &&
          !c.maze
        ) {
          loi.push(
            `[doạ suông] ${b.id} · ${s.type} · "${chuGiaoViec.trim().slice(0, 70)}"`,
          );
        }
        // Chuỗi rỗng / chỉ khoảng trắng ở các trường chữ chính.
        for (const k of [
          "text",
          "title",
          "question",
          "rule",
          "explanation",
          "label",
        ]) {
          const v = c[k];
          if (typeof v === "string" && v.trim() === "")
            loi.push(`[chuỗi rỗng] ${b.id} · ${s.type} · ${k}`);
        }
      }
      // Câu hỏi lặp y hệt trong cùng bài (bé gặp lại đúng câu cũ ⇒ chán).
      const dem = new Map();
      for (const q of cauHoi) dem.set(q, (dem.get(q) ?? 0) + 1);
      for (const [q, n] of dem)
        if (n > 1)
          nghiNgo.push(
            `[câu hỏi lặp ${n} lần trong bài] ${b.id} · "${q.slice(0, 70)}"`,
          );
    }
  }
}

if (demKhoaLa.size) {
  for (const [k, ds] of demKhoaLa)
    nghiNgo.push(
      `[khoá lạ, nghi gõ sai] "${k}" · ${ds.join(", ")}${ds.length >= 3 ? " …" : ""}`,
    );
}

const baoCao = [
  `# Rà dữ liệu bài học — ${new Date().toISOString().slice(0, 10)}`,
  "",
  `Đã quét: ${GRADES.length} lớp · ${soBai} bài · ${soSlide} slide.`,
  `LỖI CHẮC CHẮN: ${loi.length} · NGHI NGỜ: ${nghiNgo.length}`,
  "",
  "## Lỗi chắc chắn",
  ...loi.map((x) => `- ${x}`),
  "",
  "## Nghi ngờ (nên xem tay)",
  ...nghiNgo.map((x) => `- ${x}`),
  "",
].join("\n");

const iGhi = process.argv.indexOf("--ghi-bao-cao");
if (iGhi > 0 && process.argv[iGhi + 1]) {
  writeFileSync(process.argv[iGhi + 1], baoCao, "utf8");
  console.log(`Đã ghi báo cáo: ${process.argv[iGhi + 1]}`);
}
console.log(
  `Quét ${GRADES.length} lớp · ${soBai} bài · ${soSlide} slide ⇒ LỖI ${loi.length} · NGHI NGỜ ${nghiNgo.length}`,
);
for (const l of loi.slice(0, 25)) console.log("  ✗ " + l);
for (const n of nghiNgo.slice(0, 15)) console.log("  ? " + n);
