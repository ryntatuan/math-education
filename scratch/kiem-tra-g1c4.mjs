/**
 * Tự kiểm nội dung Chủ đề 4 Lớp 1 (chạy bằng Node, không cần trình duyệt).
 *
 * Mục đích: bắt lỗi CẤU TRÚC trước khi nạp vào app —
 *  • kiểu slide phải nằm trong danh sách app hiểu được,
 *  • khoá hình phải có trong `HINH_KEYS`,
 *  • `mode` của spatialScene phải là mode đã viết,
 *  • mỗi câu hỏi phải có `answer` khớp đúng một lựa chọn.
 */
import { g1c4 } from "../client/src/data/grade1/g1c4.js";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import fs from "node:fs";

// Khoá KHÔNG phải hình (chữ, câu hỏi, ghi nhớ…) — chỉ soi các khoá còn lại.
const SLIDE_TYPES = ["story", "summary", "visual", "concept", "quiz"];
const SKIP_KEYS = [
  "text",
  "items",
  "number",
  "operation",
  "clock",
  "comparison",
  "badge",
  "question",
  "options",
  "answer",
  "mascotHint",
  "mascotMood",
  "title",
  "points",
  "explanation",
  "rule",
  "example",
  "shape",
  "shapeLabel",
  "activityGrid",
  "gallery",
  "galleryTitle",
  "dialogue",
];
const MODES = [
  "topBottom",
  "ballUnderTableQuiz",
  "leftRight",
  "carLeftQuiz",
  "maisCastle",
  "lettersTHC",
  "cubeComposite2x2",
  "patternSequence",
  "dollCatTable",
  "rabbitQueue",
  "rabbitTurtleLeftRight",
  "kidsLeftRight",
  "trainCars",
  "trafficLight",
  "solidSort",
  "movieRows",
  "brickRows",
  "diceFaces",
  "cubeWalls",
  "frontBack",
];

const loi = [];
let soSlide = 0;

const dong = [];
const ghi = (s) => {
  dong.push(s);
  console.log(s);
};

for (const lesson of g1c4.lessons) {
  let hinh = 0;
  for (const [i, s] of lesson.slides.entries()) {
    soSlide += 1;
    const where = `${lesson.id} slide ${i + 1}`;
    if (!SLIDE_TYPES.includes(s.type))
      loi.push(`${where}: kiểu slide lạ "${s.type}"`);
    const c = s.content || {};

    // Khoá hình
    for (const k of Object.keys(c)) {
      if (SKIP_KEYS.includes(k)) continue;
      if (!HINH_KEYS.includes(k)) {
        loi.push(`${where}: khoá "${k}" không có trong HINH_KEYS`);
      } else {
        hinh += 1;
      }
    }
    if (c.spatialScene && !MODES.includes(c.spatialScene.mode)) {
      loi.push(
        `${where}: spatialScene mode "${c.spatialScene.mode}" chưa viết`,
      );
    }
    if (s.type === "visual" && !c.text)
      loi.push(`${where}: slide hình thiếu "text"`);
    if (s.type === "visual" && hinh === 0)
      loi.push(`${where}: slide hình không có hình nào`);

    // Câu hỏi
    if (s.type === "quiz") {
      if (!c.question) loi.push(`${where}: thiếu câu hỏi`);
      if (!Array.isArray(c.options) || c.options.length < 2)
        loi.push(`${where}: thiếu lựa chọn`);
      else if (!c.options.some((o) => o === c.answer))
        loi.push(`${where}: đáp án "${c.answer}" không nằm trong lựa chọn`);
      if (!c.mascotHint) loi.push(`${where}: thiếu mascotHint`);
    }
  }
  ghi(
    `${lesson.id}  ${String(lesson.slides.length).padStart(2)} slide  ${String(hinh).padStart(2)} hình  ${lesson.description}`,
  );
}

ghi(`\nTổng: ${g1c4.lessons.length} bài · ${soSlide} slide`);
ghi(loi.length === 0 ? "KHONG CO LOI CAU TRUC" : `LOI:\n- ${loi.join("\n- ")}`);
fs.writeFileSync("scratch/kt-g1c4-out.txt", dong.join("\n"), "utf8");
