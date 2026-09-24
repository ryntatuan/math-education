/**
 * Tự kiểm nội dung Lớp 1 — Chủ đề 1 (chạy bằng Node).
 * Cùng bộ kiểm với `kiem-tra-g1c4.mjs`, thêm danh sách `mode` của `numberScene`.
 */
import { g1c1 } from "../client/src/data/grade1/g1c1.js";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import fs from "node:fs";

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
const NUMBER_MODES = [
  "fiveFriends",
  "numberShow",
  "manyGroups",
  "addToReach",
  "countFiltered",
  "sceneCount",
  "numberTrain",
  "numberBond",
  "matchEqual",
  "numberMaze",
  "dotCards",
  "comparePairs",
];
const SPATIAL_MODES = [
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
const dong = [];
let soSlide = 0;
let soHinh = 0;

for (const lesson of g1c1.lessons) {
  let hinh = 0;
  for (const [i, s] of lesson.slides.entries()) {
    soSlide += 1;
    const where = `${lesson.id} slide ${i + 1}`;
    if (!SLIDE_TYPES.includes(s.type))
      loi.push(`${where}: kiểu slide lạ "${s.type}"`);
    const c = s.content || {};
    for (const k of Object.keys(c)) {
      if (SKIP_KEYS.includes(k)) continue;
      if (!HINH_KEYS.includes(k))
        loi.push(`${where}: khoá "${k}" không có trong HINH_KEYS`);
      else {
        hinh += 1;
        soHinh += 1;
      }
    }
    if (c.numberScene && !NUMBER_MODES.includes(c.numberScene.mode))
      loi.push(`${where}: numberScene mode "${c.numberScene.mode}" chưa viết`);
    if (c.spatialScene && !SPATIAL_MODES.includes(c.spatialScene.mode))
      loi.push(
        `${where}: spatialScene mode "${c.spatialScene.mode}" chưa viết`,
      );
    if (s.type === "visual" && !c.text)
      loi.push(`${where}: slide hình thiếu "text"`);
    if (s.type === "visual" && hinh === 0)
      loi.push(`${where}: slide hình không có hình nào`);
    if (s.type === "quiz") {
      if (!c.question) loi.push(`${where}: thiếu câu hỏi`);
      if (!Array.isArray(c.options) || c.options.length < 2)
        loi.push(`${where}: thiếu lựa chọn`);
      else if (!c.options.some((o) => o === c.answer))
        loi.push(`${where}: đáp án "${c.answer}" không nằm trong lựa chọn`);
      if (!c.mascotHint) loi.push(`${where}: thiếu mascotHint`);
    }
  }
  dong.push(
    `${lesson.id}  ${String(lesson.slides.length).padStart(2)} slide  ${String(hinh).padStart(2)} hình  ${lesson.description}`,
  );
}
dong.push(
  `\nTổng: ${g1c1.lessons.length} bài · ${soSlide} slide · ${soHinh} lượt hình`,
);
dong.push(
  loi.length === 0 ? "KHONG CO LOI CAU TRUC" : `LOI:\n- ${loi.join("\n- ")}`,
);
dong.forEach((d) => console.log(d));
fs.writeFileSync("scratch/kt-g1c1-out.txt", dong.join("\n"), "utf8");
