/**
 * KIỂM TRA 2 DẠNG BÀI MỚI CỦA TRANG LUYỆN TẬP.
 *
 * Bốn điều phải chứng minh:
 *  1. MÊ CUNG LUÔN CÓ ĐƯỜNG VỀ NHÀ (không thì bé bấm mãi không xong, tưởng app hỏng).
 *  2. Đường đi chỉ gồm ô có số lớn hơn 4 và các ô nối tiếp NẰM NGAY CẠNH nhau (luật của bé).
 *  3. THẺ CHẤM: dấu đáp án đúng với số chấm, và luôn nằm trong 3 lựa chọn.
 *  4. HAI DẠNG NÀY KHÔNG ĐƯỢC lọt vào `generateQuestion(grade)` không truyền chủ đề —
 *     vì Thử thách và Mini game gọi kiểu đó và chúng chỉ biết vẽ câu hỏi 4 lựa chọn.
 *
 * Chạy: npx esbuild scratch/kiem-tra-2-dang-luyen-tap.mjs --bundle --platform=node --format=esm
 *        --outfile=scratch/kiem-tra-2-dang-luyen-tap.bundle.mjs ; node scratch/kiem-tra-2-dang-luyen-tap.bundle.mjs
 */
import {
  TOPICS,
  PRACTICE_EXTRA_TOPICS,
  generateQuestion,
} from "../client/src/utils/exerciseGenerator.js";

const LAN = Number(process.argv[2] || 400);
const loi = [];

// ── 1+2. MÊ CUNG ──────────────────────────────────────────────────────────────
let itNhat = Infinity;
let nhieuNhat = 0;
/** Đếm số đường hợp lệ (dừng ở 5000 cho khỏi nổ). Luật có thể là "> N" hoặc "< N". */
function demDuong(grid, rows, cols, rule) {
  const hopLe = (r, c) =>
    rule.op === "<"
      ? Number(grid[r]?.[c]) < rule.value
      : Number(grid[r]?.[c]) > rule.value;
  let so = 0;
  const di = (r, c, daDi) => {
    if (so >= 5000) return;
    if (r === rows - 1 && c === cols - 1) {
      so++;
      return;
    }
    for (const [dr, dc] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      const k = `${nr}-${nc}`;
      if (daDi.has(k) || !hopLe(nr, nc)) continue;
      daDi.add(k);
      di(nr, nc, daDi);
      daDi.delete(k);
    }
  };
  if (hopLe(0, 0)) di(0, 0, new Set(["0-0"]));
  return so;
}

/** Dải số mê cung theo lớp — phải khớp `MAZE_MAX` trong bộ sinh. */
const GRADE_MAX = { 1: 20, 2: 99, 3: 99, 4: 99, 5: 99 };
const LOP = [1, 2, 3, 4, 5];
const MOI_LOP = Math.max(1, Math.round(LAN / LOP.length));

for (const lop of LOP) {
  for (let i = 0; i < MOI_LOP; i++) {
    const q = generateQuestion(lop, `g${lop}_number_maze`);
    if (q.type !== "maze") loi.push(`mê cung lớp ${lop}: type = ${q.type}`);
    const grid = q.maze?.grid;
    const rule = q.maze?.rule;
    if (!Array.isArray(grid) || grid.length !== 6 || grid[0].length !== 6)
      loi.push(`mê cung lớp ${lop}: bảng không phải 6x6 (${grid?.length})`);
    if (!["<", ">"].includes(rule?.op))
      loi.push(`mê cung lớp ${lop}: dấu lạ ${JSON.stringify(rule?.op)}`);
    // Số chặn cửa phải nằm trong dải của lớp và KHÔNG được sát mép (xem script kia)
    const maxNum = GRADE_MAX[lop];
    if (!(rule.value >= 1 && rule.value < maxNum))
      loi.push(
        `mê cung lớp ${lop}: số chặn cửa ${rule.value} ngoài 1–${maxNum}`,
      );
    if (rule.value - 1 < 5 || maxNum - rule.value < 5)
      loi.push(
        `mê cung lớp ${lop}: số chặn cửa ${rule.value} quá lệch trong 1–${maxNum}`,
      );
    if (!Number.isInteger(grid[0][0]) || grid[0][0] > maxNum || grid[0][0] < 1)
      loi.push(`mê cung lớp ${lop}: ô xuất phát lạ = ${grid[0][0]}`);
    // Ô xuất phát phải nối được (bé bắt đầu ở đó) — theo đúng dấu của luật
    const fit = (v) => (rule.op === "<" ? v < rule.value : v > rule.value);
    if (!fit(Number(grid[0][0])))
      loi.push(`mê cung lớp ${lop}: ô xuất phát không đi được = ${grid[0][0]}`);
    if (grid.flat().some((v) => !Number.isInteger(v) || v < 1 || v > maxNum))
      loi.push(`mê cung lớp ${lop}: có số ngoài dải 1–${maxNum}`);
    const soDuong = demDuong(grid, 6, 6, rule);
    if (soDuong === 0) loi.push("mê cung: KHÔNG có đường nào về nhà!");
    itNhat = Math.min(itNhat, soDuong);
    nhieuNhat = Math.max(nhieuNhat, soDuong);
    // Chữ phải khớp ĐÚNG dấu và ĐÚNG số chặn cửa đã sinh
    const clause =
      rule.op === "<" ? `nhỏ hơn ${rule.value}` : `lớn hơn ${rule.value}`;
    if (!String(q.note || "").includes(clause))
      loi.push(`mê cung lớp ${lop}: note lạ "${q.note}"`);
    if (!String(q.question || "").includes(clause))
      loi.push(`mê cung lớp ${lop}: câu hỏi lạ "${q.question}"`);
    if (q.answer !== "Đã nối xong")
      loi.push(`mê cung: answer lạ "${q.answer}"`);
    if (!Array.isArray(q.options) || !q.options.includes(q.answer))
      loi.push("mê cung: đáp án không nằm trong options");
  }
}

// ── 3. THẺ CHẤM ──────────────────────────────────────────────────────────────
for (let i = 0; i < LAN; i++) {
  const q = generateQuestion(1, "g1_dot_cards");
  if (q.type !== "dotCards") loi.push(`thẻ chấm: type = ${q.type}`);
  const { left, right } = q.dots || {};
  if (!(left >= 1 && left <= 6) || !(right >= 1 && right <= 6))
    loi.push(`thẻ chấm: số chấm ngoài 1..6 (${left}, ${right})`);
  const dung = left > right ? ">" : left < right ? "<" : "=";
  if (q.answer !== dung)
    loi.push(
      `thẻ chấm: đáp án sai (${left} ? ${right} → ${q.answer}, phải ${dung})`,
    );
  if (![">", "<", "="].every((o) => q.options.includes(o)))
    loi.push(`thẻ chấm: thiếu dấu trong options ${JSON.stringify(q.options)}`);
  if (!q.options.includes(q.answer)) loi.push("thẻ chấm: đáp án ngoài options");
}

// ── 4. KHÔNG ĐƯỢC LỌT VÀO CÂU HỎI CHUNG ──────────────────────────────────────
const idRieng = [];
for (const lop of LOP) {
  const ds = PRACTICE_EXTRA_TOPICS[`GRADE_${lop}`] || [];
  for (const t of ds) {
    idRieng.push(t.id);
    if ((TOPICS[`GRADE_${lop}`] || []).some((x) => x.id === t.id))
      loi.push(
        `TOPICS.GRADE_${lop} có chứa ${t.id} — Thử thách/Mini game sẽ gặp câu không có gì bấm`,
      );
  }
}
for (const lop of LOP) {
  for (let i = 0; i < 1000; i++) {
    const q = generateQuestion(lop);
    if (["dotCards", "maze"].includes(q.type))
      loi.push(
        `generateQuestion(${lop}) trả về ${q.type} (chủ đề ${q.topic}) — hai màn kia sẽ hỏng`,
      );
    if (!Array.isArray(q.options) || q.options.length < 2)
      loi.push(
        `generateQuestion(${lop}) ra câu không có lựa chọn (chủ đề ${q.topic})`,
      );
  }
}
// Mỗi chủ đề riêng phải sinh ĐÚNG loại câu của nó (không rơi xuống câu dự phòng)
for (const lop of LOP)
  for (const t of PRACTICE_EXTRA_TOPICS[`GRADE_${lop}`] || []) {
    const q = generateQuestion(lop, t.id);
    const dung = t.id.includes("dot_cards") ? "dotCards" : "maze";
    if (q.type !== dung)
      loi.push(`chủ đề ${t.id} sinh ra type = ${q.type} (phải là ${dung})`);
  }

// ── KẾT QUẢ ──────────────────────────────────────────────────────────────────
console.log(`Mê cung sinh ra     : ${MOI_LOP} bảng × ${LOP.length} lớp`);
console.log(`Số đường về nhà     : ít nhất ${itNhat}, nhiều nhất ${nhieuNhat}`);
console.log(
  `Câu hỏi chung thử   : 1000 lượt × ${LOP.length} lớp (không lớp nào ra mê cung/thẻ chấm)`,
);
console.log(`Chủ đề riêng        : ${idRieng.join(", ")}`);
console.log(
  `Chủ đề chung lớp 1  : ${TOPICS.GRADE_1.length} mục (KHÔNG chứa chủ đề riêng)`,
);
if (loi.length) {
  console.log(`\n❌ ${loi.length} LỖI:`);
  [...new Set(loi)].slice(0, 20).forEach((l) => console.log("  - " + l));
  process.exit(1);
}
console.log("\n✅ 2 dạng bài Luyện tập: 0 lỗi");
