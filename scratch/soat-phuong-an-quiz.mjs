/**
 * Rà PHƯƠNG ÁN của mọi câu hỏi trong toàn bộ dữ liệu bài học (5 lớp + truyện).
 *
 * Vì sao có file này: bé gặp câu “Điền dấu thích hợp: 6 ? 6” mà phương án có cả dấu `−`
 * (phép trừ) — dấu đó KHÔNG THỂ là đáp án của một phép so sánh, chỉ làm bé rối.
 * Rà bằng mắt không nổi (2656 slide) nên soi bằng máy.
 *
 *   node scratch/soat-phuong-an-quiz.mjs
 *
 * Read-only: chỉ đọc dữ liệu, không ghi gì.
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";
import { MATH_STORIES } from "../client/src/data/storyData.js";

const NGUON = [
  ["g1", grade1Data],
  ["g2", grade2Data],
  ["g3", grade3Data],
  ["g4", grade4Data],
  ["g5", grade5Data],
  ["truyen", MATH_STORIES],
];

/** Chỉ những ký tự NÀY mới là dấu so sánh. `+ − × :` là phép tính ⇒ không được lẫn vào. */
const DAU_SO_SANH = /^[<>=≤≥]$/;

const vanDe = [];
const demSoPhuongAn = {};
let soCau = 0;
let soCauDienDau = 0;

/** Luật 3: lời hỏi là “điền dấu” / có ô `?` giữa hai số ⇒ mọi phương án phải là dấu so sánh. */
const hoiDienDau = (q) => /điền dấu/i.test(q) || /\d\s*[?.…]{1,3}\s*\d/.test(q);

function xet(node, path) {
  const opts = node.options.map(String);
  const q = String(node.question ?? "");
  soCau++;
  demSoPhuongAn[opts.length] = (demSoPhuongAn[opts.length] ?? 0) + 1;

  // Luật 1: đáp án phải nằm trong phương án (sai thì bé bấm đúng vẫn bị chấm sai).
  if (!opts.some((o) => o === String(node.answer)))
    vanDe.push(["đáp án KHÔNG có trong phương án", q, opts, node.answer, path]);

  // Luật 2: hai phương án giống nhau ⇒ một lựa chọn vô nghĩa.
  if (new Set(opts).size !== opts.length)
    vanDe.push(["phương án TRÙNG nhau", q, opts, node.answer, path]);

  // Luật 4: dưới 3 phương án ⇒ bé đoán bừa cũng dễ đúng.
  if (opts.length < 3)
    vanDe.push(["quá ít phương án (<3)", q, opts, node.answer, path]);

  if (hoiDienDau(q)) {
    soCauDienDau++;
    const la = opts.filter((o) => !DAU_SO_SANH.test(o.trim()));
    if (la.length)
      vanDe.push([
        "câu ĐIỀN DẤU mà phương án không phải dấu so sánh",
        q,
        opts,
        node.answer,
        path,
      ]);
  }
}

/** Đi hết cây dữ liệu, không cần biết cấu trúc lớp/chương/bài. */
function duyet(node, path) {
  if (Array.isArray(node)) {
    node.forEach((n, i) => duyet(n, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node.options) && node.answer !== undefined) xet(node, path);
  for (const [k, v] of Object.entries(node))
    if (v && typeof v === "object") duyet(v, `${path}.${k}`);
}

for (const [ten, duLieu] of NGUON) duyet(duLieu, ten);

console.log(
  `Đã rà ${soCau} câu hỏi (trong đó ${soCauDienDau} câu “điền dấu”).`,
);
console.log(
  "Số phương án mỗi câu: " +
    Object.entries(demSoPhuongAn)
      .sort((a, b) => a[0] - b[0])
      .map(([k, v]) => `${k} phương án × ${v}`)
      .join(" · "),
);
if (!vanDe.length) {
  console.log("✅ KHÔNG có câu nào có vấn đề về phương án.");
} else {
  console.log(`\n⚠️  ${vanDe.length} câu cần xem lại:\n`);
  vanDe.forEach(([loai, q, opts, answer, path]) => {
    console.log(
      `• [${loai}]\n   hỏi : ${q}\n   chọn: ${opts.join(" | ")}   (đáp án: ${answer})\n   ở  : ${path}\n`,
    );
  });
}
