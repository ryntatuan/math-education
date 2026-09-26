/**
 * CỔNG KIỂM THỨ TỰ Ô ĐIỀN — chạy: `node scratch/kiem-tra-thu-tu-o-dien.mjs`
 *
 * Vì sao có file này: người dùng báo 2026-09-26 *“phép cộng là từ phải qua trái, tại sao đáp án
 * lại điền từ trái qua phải?”*. Lỗi nằm ở chỗ giao diện đếm ô trống theo thứ tự VẼ còn đáp án
 * xếp ngược lại ⇒ bé điền đúng số vào sai hàng vẫn được báo đúng. Cổng tĩnh không thấy được,
 * nên thứ tự nay là hàm thuần `thuTuOTrong()` và bị kiểm ở đây.
 *
 * Luật kiểm:
 *   1. CỘNG · TRỪ · NHÂN: thứ tự điền PHẢI → TRÁI (vị trí chữ số giảm dần).
 *      CHIA: TRÁI → PHẢI (vị trí chữ số thương tăng dần); ô SỐ DƯ ở cuối cùng.
 *   2. Mỗi ô “nhớ” phải đi NGAY SAU hàng sinh ra nó (nhớ ở vị trí p đi sau chữ số ở p + 1).
 *
 * Kiểm hai vế: (1) bắt được thứ tự SAI, (2) không báo oan thứ tự đúng.
 */
import { thuTuOTrong } from "../client/src/components/visuals/columnMath.js";

let dung = 0;
const sai = [];

const viTriChuSo = (ds) =>
  ds
    .filter((x) => x.loai === "chuSo" || x.loai === "thuong")
    .map((x) => x.viTri);

/** Lỗi của một bộ ô — trả về câu mô tả, hoặc null nếu hợp lệ. */
function loiCuaBo(ds, op) {
  if (!ds.length) return "không có ô nào để điền";
  const vt = viTriChuSo(ds);
  const tangDan = vt.every((v, i) => i === 0 || v > vt[i - 1]);
  const giamDan = vt.every((v, i) => i === 0 || v < vt[i - 1]);
  if (op === ":") {
    if (!tangDan)
      return `phép CHIA phải đi TRÁI → PHẢI, đang là ${vt.join(",")}`;
    const iDu = ds.findIndex((x) => x.loai === "du");
    if (iDu >= 0 && iDu !== ds.length - 1) return "ô SỐ DƯ phải ở cuối cùng";
  } else if (!giamDan) {
    return `cộng/trừ/nhân phải đi PHẢI → TRÁI, đang là ${vt.join(",")}`;
  }
  for (let i = 0; i < ds.length; i++) {
    const x = ds[i];
    if (x.loai !== "nho") continue;
    const truoc = ds[i - 1];
    if (!truoc || truoc.loai !== "chuSo" || truoc.viTri !== x.viTri + 1)
      return `ô “nhớ” ở vị trí ${x.viTri} phải đi NGAY SAU hàng ${x.viTri + 1}`;
  }
  return null;
}

const kiem = (a, op, b, remember, mongDoi) => {
  const ds = thuTuOTrong(a, b, op, remember);
  const loi = loiCuaBo(ds, op);
  const got = ds.map((x) => x.v ?? x.loai);
  if (loi) {
    sai.push(`${a} ${op} ${b}: ${loi} — ${JSON.stringify(got)}`);
    return;
  }
  if (JSON.stringify(got) !== JSON.stringify(mongDoi)) {
    sai.push(
      `${a} ${op} ${b}: thứ tự ${JSON.stringify(got)} ≠ mong đợi ${JSON.stringify(mongDoi)}`,
    );
    return;
  }
  dung += 1;
};

// ---- Cộng / trừ / nhân: phải → trái, ô nhớ xen đúng lúc ----
kiem(256, "+", 173, true, [9, 2, 1, 4]); // 9 (đv) · 2 (chục) · 1 (nhớ) · 4 (trăm)
kiem(25, "+", 4, false, [9, 2]);
kiem(32, "+", 14, false, [6, 4]);
kiem(6, "+", 8, true, [4, 1, 1]); // 6 + 8 = 14: 4 (đv) · 1 (nhớ) · 1 (chục)
kiem(534, "−", 268, false, [6, 6, 2]);
kiem(57, "−", 23, false, [4, 3]);
kiem(26, "×", 3, true, [8, 1, 7]);
kiem(216, "×", 3, true, [8, 1, 4, 6]);
kiem(639, "+", 0, false, [9, 3, 6]);

// ---- Chia: trái → phải, số dư sau cùng ----
kiem(639, ":", 3, false, [2, 1, 3]);
kiem(48, ":", 4, false, [1, 2]);
kiem(19, ":", 3, false, [6, 1]);
kiem(128472, ":", 6, false, [2, 1, 4, 1, 2]);

// ---- CANARY vế 1: thứ tự SAI phải bị bắt ----
// ⚠️ `thuTuOTrong(left, right, sign, remember)` — viết sai thứ tự tham số thì canary rỗng
// và “không bắt được gì” (đã mắc đúng lần đầu: canary tự hỏng chứ mã app không sai).
const thatCong = thuTuOTrong(256, 173, "+", true); // [9, 2, nhớ 1, 4]
const thatNhan = thuTuOTrong(26, 3, "×", true); // [8, nhớ 1, 7]
const thatChia = thuTuOTrong(639, 3, ":", false); // [2, 1, 3]
const canary = [
  ["đảo ngược phép cộng (trái → phải)", [...thatCong].reverse(), "+"],
  // đẩy ô “nhớ” xuống cuối: [8 (đv), 7 (chục), nhớ 1]
  [
    "ô nhớ điền SAU CÙNG thay vì xen vào",
    [thatNhan[0], thatNhan[2], thatNhan[1]],
    "×",
  ],
  ["phép chia đi ngược (phải → trái)", [...thatChia].reverse(), ":"],
  [
    "ô số dư đặt TRƯỚC thương",
    [{ loai: "du", v: 1 }, ...thuTuOTrong(19, 3, ":", false)],
    ":",
  ],
];
for (const [ten, ds, op] of canary) {
  const l = loiCuaBo(ds, op);
  if (process.argv.includes("--ro"))
    console.log(`   [canary] ${ten}: ${l ?? "KHÔNG BẮT ĐƯỢC"}`);
  if (l) dung += 1;
  else sai.push(`CANARY không bắt được: ${ten}`);
}

// ---- CANARY vế 2: thứ tự ĐÚNG không được báo oan ----
if (!loiCuaBo(thuTuOTrong(26, 3, "×", true), "×")) dung += 1;
else sai.push("CANARY báo oan thứ tự đúng");

console.log("--- Thứ tự điền thật ---");
for (const [a, op, b, nho] of [
  [256, "+", 173, true],
  [26, "×", 3, true],
  [639, ":", 3, false],
  [19, ":", 3, false],
]) {
  const ds = thuTuOTrong(a, b, op, nho);
  console.log(
    `${a} ${op} ${b}: ${ds
      .map((x) => (x.loai === "nho" ? `nhớ ${x.v}` : (x.v ?? "dư")))
      .join(" → ")}`,
  );
}
console.log(`\nĐã kiểm ${dung + sai.length} ca (gồm canary).`);
if (sai.length) {
  console.log(`\n❌ ${sai.length} ca SAI:`);
  for (const s of sai) console.log("  • " + s);
  process.exitCode = 1;
} else {
  console.log(`\n✅ ${dung}/${dung} ca đúng — cổng XANH.`);
}
