/**
 * SOÁT MỌI SLIDE “PHẢI TRẢ LỜI” XEM CÓ ĐƯỜNG ĐI TIẾP KHÔNG (script tạm, chỉ đọc).
 *
 * NGHI VẤN: `LessonPage.jsx` khoá nút “Tiếp tục” với các kiểu trong `PHAI_TRA_LOI`, nhưng chỉ
 * `quiz` (qua `answerFeedback`) và 5 kiểu mới (qua `interactiveDone`) là THẬT SỰ báo “đã trả lời”.
 * `dialogue` cũng nằm trong danh sách đó mà callback của nó không set gì ⇒ nếu có slide hội thoại
 * nào kèm câu hỏi thì bé bị KẸT (không sang slide sau được).
 *
 * Chạy: `node scratch/soat-nghen-slide.mjs`
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

/** Kiểu BÁO “đã trả lời” qua `interactiveDone` (xem `handleInteractiveAnswer`). */
const BAO_QUA_INTERACTIVE = new Set([
  "multiQuiz",
  "buildExpression",
  "matchPairs",
  "typeAnswer",
  "numberLineAnswer",
]);
/** Kiểu BÁO qua `answerFeedback`. */
const BAO_QUA_FEEDBACK = new Set(["quiz"]);
/** Kiểu `LessonPage` COI như phải trả lời (khớp hằng `PHAI_TRA_LOI`). */
const PHAI_TRA_LOI = new Set([
  "quiz",
  "dialogue",
  ...BAO_QUA_INTERACTIVE,
]);

let soSlide = 0;
const demKieu = new Map();
const ket = [];

for (const [file, key] of NGUON) {
  const full = path.join(ROOT, "client/src/data", file);
  const mod = await import(new URL(`file://${full.replace(/\\/g, "/")}`).href);
  for (const ch of mod[key].chapters ?? []) {
    for (const b of ch.lessons ?? []) {
      for (const [i, s] of (b.slides ?? []).entries()) {
        soSlide++;
        demKieu.set(s.type, (demKieu.get(s.type) ?? 0) + 1);
        if (!PHAI_TRA_LOI.has(s.type)) continue;
        const c = s.content ?? {};
        const bao =
          BAO_QUA_INTERACTIVE.has(s.type) || BAO_QUA_FEEDBACK.has(s.type);
        if (!bao && s.type === "dialogue" && c.question) {
          ket.push(
            `${b.id} · slide ${i + 1}: dialogue CÓ câu hỏi nhưng KHÔNG báo “đã trả lời” ⇒ nút Tiếp tục khoá`,
          );
        }
      }
    }
  }
}

console.log(`Tổng ${soSlide} slide.`);
console.log(
  [...demKieu.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t, n]) => `${t}: ${n}`)
    .join(" · "),
);
console.log(`\nCa NGHI KẸT: ${ket.length}`);
for (const k of ket.slice(0, 20)) console.log("  " + k);
