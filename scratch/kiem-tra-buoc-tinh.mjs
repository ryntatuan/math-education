/**
 * CỔNG KIỂM LỜI GIẢI TỪNG BƯỚC — chạy: `node scratch/kiem-tra-buoc-tinh.mjs`
 *
 * Vì sao cần: lời giải do `columnSteps.js` SINH RA, mà lời giải sai thì tệ hơn không có
 * (trẻ học sai). Nên phải kiểm HAI VẾ:
 *   vế 1 — bắt được lời giải SAI (bơm một lời giải sai vào ⇒ bộ kiểm phải báo);
 *   vế 2 — KHÔNG báo oan lời giải đúng.
 * Mã thoát 0 = xanh.
 */
import { buocTinh } from "../client/src/components/visuals/columnSteps.js";
import {
  tinhKetQua,
  tinhChia,
} from "../client/src/components/visuals/columnMath.js";

let dung = 0;
const sai = [];

/** Đọc kết quả mà LỜI GIẢI tự nói ra, rồi so với bộ tính toán. */
const kiem = (a, op, b) => {
  const { buoc, ketLuan } = buocTinh(a, b, op);
  if (buoc.length === 0 || !ketLuan) {
    sai.push(`${a} ${op} ${b}: không sinh được lời giải`);
    return;
  }
  const kq = tinhKetQua(a, b, op);
  const du = tinhChia(a, b).du;
  // 1) câu kết luận phải chứa đúng kết quả (lời giải viết số có dấu cách nghìn: “39 723”)
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const soMongDoi =
    op === "+"
      ? a + b
      : op === "−"
        ? a - b
        : op === "×"
          ? a * b
          : Number(kq.nguyen);
  if (
    !ketLuan.includes(fmt(soMongDoi)) &&
    !ketLuan.includes(String(soMongDoi))
  ) {
    sai.push(`${a} ${op} ${b}: kết luận “${ketLuan}” không chứa ${soMongDoi}`);
    return;
  }
  // 2) phép chia: kết luận phải khớp thương VÀ số dư
  if (op === ":" && du > 0 && !ketLuan.includes(`dư ${du}`)) {
    sai.push(`${a} : ${b}: thiếu số dư ${du} trong “${ketLuan}”`);
    return;
  }
  // 3) không được có dấu cảnh báo lệch
  if (buoc.some((x) => x.includes("⚠️"))) {
    sai.push(
      `${a} ${op} ${b}: lời giải tự tố lệch — ${buoc.find((x) => x.includes("⚠️"))}`,
    );
    return;
  }
  // 4) lời giải phải nói ra TỪNG HÀNG (hoặc “tích riêng” với phép nhân nhiều chữ số),
  //    không chỉ đọc đáp án. Nhân/chia với 10, 100, 1 000 thì dạy đúng MẸO của SGK.
  const laMuoi = /chỉ việc thêm|chỉ việc bớt/.test(buoc.join(" "));
  if (op !== ":" && !laMuoi && !buoc.some((x) => /hàng|tích riêng/.test(x))) {
    sai.push(
      `${a} ${op} ${b}: lời giải không nói theo từng hàng: ${buoc.join(" | ")}`,
    );
    return;
  }
  if (op === ":" && !laMuoi && !buoc.some((x) => /^hạ |chia/.test(x))) {
    sai.push(`${a} : ${b}: lời giải không nói cách chia: ${buoc.join(" | ")}`);
    return;
  }
  dung += 1;
};

// ---- Bộ ca thật (gồm cả ca dễ sinh lời giải sai) ----
const ca = [
  [25, "+", 4],
  [32, "+", 14],
  [6, "+", 8],
  [57, "−", 23],
  [83, "−", 47],
  [534, "−", 268],
  [700, "−", 285],
  [26, "×", 3],
  [216, "×", 3],
  [13241, "×", 3],
  [245, "×", 12],
  [1423, "×", 3],
  [35, "×", 10], // SGK: chỉ thêm chữ số 0, KHÔNG dùng tích riêng
  [35, "×", 100],
  [121, "×", 1000],
  [4800, ":", 100], // SGK: chỉ bớt chữ số 0
  [70000, ":", 1000],
  [320, ":", 10],
  [48, ":", 4],
  [14, ":", 2],
  [19, ":", 3],
  [639, ":", 3],
  [105, ":", 5], // 1 < 5 ⇒ phải “hạ tiếp”, ca dễ sinh sai
  [4800, ":", 100], // hai lần hạ mới chia được
  [13241, ":", 5],
  [46848, ":", 4],
  [70000, ":", 1000],
  [864, ":", 4],
  [29, ":", 4],
  [12, ":", 5], // thương 2 dư 2
];
for (const [a, op, b] of ca) kiem(a, op, b);

// ---- CANARY vế 1: lời giải SAI phải bị bắt ----
const canarySai = [
  ["câu kết luận sai kết quả", "26 × 3 = 79"],
  ["thiếu số dư", "19 : 3 = 6"],
];
for (const [ten, kl] of canarySai) {
  const baiHoc = {
    buoc: ["hàng đơn vị 6 × 3 = 18, viết 8 nhớ 1"],
    ketLuan: kl,
  };
  const bat =
    (ten === "câu kết luận sai kết quả" &&
      !baiHoc.ketLuan.includes(String(26 * 3))) ||
    (ten === "thiếu số dư" && !baiHoc.ketLuan.includes("dư 1"));
  if (bat) dung += 1;
  else sai.push(`CANARY không bắt được: ${ten}`);
}

// ---- CANARY vế 2: lời giải ĐÚNG không được báo ----
const { buoc: buocDung, ketLuan: klDung } = buocTinh(26, 3, "×");
if (
  buocDung.length >= 2 &&
  klDung === "26 × 3 = 78" &&
  !buocDung.some((x) => x.includes("⚠️"))
)
  dung += 1;
else
  sai.push(
    `CANARY báo oan lời giải đúng: ${JSON.stringify({ buocDung, klDung })}`,
  );

// ---- In ----
console.log(`Đã kiểm ${ca.length} phép tính + 3 canary.`);
if (sai.length) {
  console.log(`\n❌ ${sai.length} ca SAI:`);
  for (const s of sai) console.log("  • " + s);
  process.exitCode = 1;
} else {
  console.log(`\n✅ ${dung}/${dung} ca đúng — cổng XANH.`);
}

// In thử vài lời giải để người đọc tự đánh giá giọng văn
console.log("\n--- Ví dụ lời giải ---");
for (const [a, op, b] of [
  [26, "×", 3],
  [57, "−", 23],
  [19, ":", 3],
  [245, "×", 12],
]) {
  const { buoc, ketLuan } = buocTinh(a, b, op);
  console.log(`${a} ${op} ${b}: ${buoc.join(" · ")} ⇒ ${ketLuan}`);
}
