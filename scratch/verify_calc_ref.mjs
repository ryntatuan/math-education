// Kiểm chứng `generateCalculation` sau khi bọc (GĐ 2b-2, mục 5.1 của phase_2b_plan.md).
// Chạy: node scratch/verify_calc_ref.mjs
//
// Câu hỏi cần trả lời: MỌI kết quả của generateCalculation(1..5) có
//   - `ref` bắt đầu bằng `tmpl:calc_g`
//   - `topic` khớp phần sau dấu `:` của `ref`
//   - KHÔNG rơi vào `other`
//   - không làm mất/đổi các trường cũ (question, equation, options, answer)
import { generateCalculation } from "../client/src/utils/exerciseGenerator.js";

const ROUNDS = 300; // mỗi lớp 300 lần → 1500 lượt
const seen = new Map(); // topic -> số lượt
let failures = 0;

function fail(msg) {
  failures++;
  console.error("  ❌ " + msg);
}

for (let grade = 1; grade <= 5; grade++) {
  for (let i = 0; i < ROUNDS; i++) {
    const q = generateCalculation(grade);

    // 1. Các trường cũ phải còn nguyên
    if (!q.question) fail(`lớp ${grade}: thiếu question`);
    if (!q.equation) fail(`lớp ${grade}: thiếu equation — không suy được ref`);
    if (!Array.isArray(q.options) || q.options.length !== 4)
      fail(
        `lớp ${grade}: options không phải 4 phần tử: ${JSON.stringify(q.options)}`,
      );
    if (!q.options?.includes(q.answer))
      fail(`lớp ${grade}: đáp án "${q.answer}" không nằm trong options`);

    // 2. ref đúng dạng
    if (!q.ref?.startsWith("tmpl:calc_g"))
      fail(`lớp ${grade}: ref sai dạng: ${q.ref} (equation="${q.equation}")`);

    // 3. topic khớp ref
    if (q.ref !== `tmpl:${q.topic}`)
      fail(`lớp ${grade}: topic không khớp ref: ref=${q.ref} topic=${q.topic}`);

    // 4. KHÔNG rơi vào nhánh lạ
    if (q.topic?.endsWith("_other"))
      fail(`lớp ${grade}: rơi vào "other" — equation="${q.equation}"`);

    // 5. topic phải mang đúng số lớp
    if (!q.topic?.startsWith(`calc_g${grade}_`))
      fail(`lớp ${grade}: topic sai lớp: ${q.topic}`);

    seen.set(q.topic, (seen.get(q.topic) ?? 0) + 1);
  }
}

console.log(
  `\nĐã chạy ${ROUNDS} lượt × 5 lớp = ${ROUNDS * 5} lượt sinh câu.\n`,
);
console.log("Các khuôn (topic) đã gặp:");
for (const [topic, count] of [...seen.entries()].sort()) {
  console.log(`  ${topic.padEnd(20)} ${String(count).padStart(4)} lượt`);
}

// Phép tính nào chưa từng xuất hiện ở một lớp? Không phải lỗi, nhưng cần biết
// để tránh kết luận sai khi đọc số liệu sau này.
console.log("\nSố khuôn khác nhau:", seen.size);
console.log(
  failures === 0
    ? "\n✅ PASS — không có lỗi nào."
    : `\n❌ FAIL — ${failures} lỗi.`,
);
process.exit(failures === 0 ? 0 : 1);
