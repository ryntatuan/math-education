/**
 * SOÁT PHÉP TÍNH — `node scratch/soat-phep-tinh.mjs [--het]`
 *
 * Vì sao có file này: nhóm lỗi **C (số liệu sai)** là nhóm tốn thời gian nhất khi rà bằng ảnh —
 * mà máy kiểm được **chắc chắn hơn mắt người**. Công cụ đọc thẳng dữ liệu 5 lớp và kiểm:
 *
 *   1. `operation`  — `{left, sign, right, result}`: `left ± right` phải bằng `result`.
 *   2. `comparison` — dạng object `{left, sign, right}` hoặc chuỗi “8  >  5”: dấu phải ĐÚNG.
 *   3. MỌI câu “a + b = c” / “a − b = c” viết trong chữ của slide (`text`, `rule`, `question`,
 *      `explanation`, `mascotHint`, ô bảng…) phải ĐÚNG.
 *   4. Câu hỏi dạng “a + b = ?” (hoặc “a − b = ?”) thì `answer` phải bằng kết quả.
 *
 * ⚠️ Bỏ qua: chuỗi có `#` (mã màu), số có dấu cách phân nghìn (`1 234` — đã gộp lại trước khi
 * tính), và các dạng KHÔNG phải số học (so sánh chuỗi, đơn vị đo, phân số dạng `a/b`).
 * Mã thoát 0 = không có lỗi.
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const HET = process.argv.includes("--het");
const NGUON = [
  ["Lớp 1", grade1Data],
  ["Lớp 2", grade2Data],
  ["Lớp 3", grade3Data],
  ["Lớp 4", grade4Data],
  ["Lớp 5", grade5Data],
];

const loi = [];
const soLan = { operation: 0, comparison: 0, cauTrongChu: 0, cauHoi: 0 };

/** Bỏ dấu cách phân nghìn: “1 234” → 1234.
 *  🔴 CHỈ gộp DẤU CÁCH THƯỜNG — không được để `\s` gộp qua XUỐNG DÒNG:
 *  “256 + 173 = 429\n429 − 173 = 256” mà gộp thì thành “= 429429” ⇒ BÁO OAN (đã mắc).
 */
const gonSo = (s) => String(s).replace(/(\d) (?=\d{3}\b)/g, "$1");
const so = (v) => {
  const n = Number(gonSo(v));
  return Number.isFinite(n) ? n : null;
};
const tinh = (a, op, b) => {
  if (op === "+") return a + b;
  if (op === "−" || op === "-") return a - b;
  if (op === "×" || op === "x") return a * b;
  if (op === ":" || op === "/") return b === 0 ? null : a / b;
  return null;
};

/**
 * So kết quả — CHẤP NHẬN cả **thương của phép chia có dư**: SGK lớp 3 viết “13 : 3 = 4” rồi mới
 * ghi “(dư 1)”, nên chỉ so `a / b` là báo oan. Dùng cho HẾT các phép chia ({ du: true }).
 */
const khop = (dung, ghi, op) => {
  if (dung === null) return true;
  if (dung === ghi) return true;
  if ((op === ":" || op === "/") && Math.floor(dung) === ghi) return true;
  return false;
};

/**
 * Kiểm mọi câu “a op b = c” trong MỘT chuỗi. Trả về danh sách mô tả lỗi.
 * Tách thành hàm để CANARY ở cuối file gọi được (canary phải có hai vế: bắt được mẫu sai và
 * KHÔNG bắt nhầm chuỗi hợp lệ — xem `canary()`).
 */
function loiTrongChu(chu) {
  const ra = [];
  if (chu.includes("#")) return ra;
  const t = gonSo(chu);
  /**
   * Ba chốt của mẫu (mỗi chốt ứng với một lần BÁO OAN đã mắc thật):
   *  1. `(?![\d,?])` sau kết quả ⇒ KHÔNG cắt đôi số (“14 − 6 = 14 − 4 …” không được khớp
   *     thành “14 − 6 = 1”); và câu “45 + 9 = 36? Không!” là câu hỏi NÊU ĐIỀU SAI cho bé
   *     phát hiện ⇒ bỏ qua.
   *  2. `(?![\s]*[+\-−×x=])` ⇒ KHÔNG khớp mảnh của biểu thức nối tiếp.
   *  3. `,\d` / `/` bị chặn ⇒ bỏ qua SỐ THẬP PHÂN (“3,45 × 10”) và PHÂN SỐ (“2/5 × 10”).
   */
  const re =
    /(?<![\d,/])(-?\d+)(?!,\d)\s*([+−\-×x:])\s*(\d+)(?!,\d)\s*=\s*(-?\d+)(?![\d,?])(?![\s]*[+\-−×x=/,])/g;
  for (const m of t.matchAll(re)) {
    /**
     * VẾ TRƯỚC CÒN NỐI TIẾP ⇒ chỉ là mảnh của biểu thức dài (“3 + 4 + 5 = 12”).
     * ⚠️ Phải so bằng mẫu “SỐ rồi TOÁN TỬ ở cuối”: dấu `:` vừa là phép chia vừa là dấu câu,
     * nên không thể chặn `:` đơn thuần (chặn kiểu đó sẽ bỏ sót câu “Tính: 45 + 9 = 54”).
     * Và xét cả ký tự ngay trước khi đã bỏ dấu cách: nếu là `/` hoặc `,` thì đây là
     * PHÂN SỐ / SỐ THẬP PHẦN (“3×3 / 5×3 = 9/15” — đã từng báo oan).
     */
    const truoc = t.slice(0, m.index).replace(/\s+$/, "");
    if (/(\d)\s*[:+\-−×x]\s*$/.test(truoc)) continue;
    if (/[/,]$/.test(truoc)) continue;
    const a = Number(m[1]);
    const b2 = Number(m[3]);
    const r = Number(m[4]);
    const dung = tinh(a, m[2], b2);
    if (dung === null) continue;
    soLan.cauTrongChu++;
    if (!khop(dung, r, m[2])) ra.push(`“${m[0].trim()}” SAI (đúng là ${dung})`);
  }
  return ra;
}

function gomChuoi(v, duong = "", ra = []) {
  if (typeof v === "string") ra.push([duong, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => gomChuoi(x, `${duong}[${i}]`, ra));
  else if (v && typeof v === "object")
    for (const [k, x] of Object.entries(v)) gomChuoi(x, duong ? `${duong}.${k}` : k, ra);
  return ra;
}

for (const [tenLop, data] of NGUON) {
  for (const ch of data?.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((slide, iS) => {
        const c = slide.content ?? {};
        const viTri = `${tenLop} · ${bai.id} · slide ${iS + 1}`;

        // 1. operation
        if (c.operation && typeof c.operation === "object") {
          const { left, sign, right, result } = c.operation;
          const a = so(left);
          const b2 = so(right);
          const r = so(result);
          if (a !== null && b2 !== null && r !== null && sign) {
            soLan.operation++;
            const dung = tinh(a, sign, b2);
            if (!khop(dung, r, sign))
              loi.push(`[operation] ${viTri}: ${a} ${sign} ${b2} = ${dung} nhưng ghi ${r}`);
          }
        }

        // 2. comparison
        if (c.comparison !== undefined && c.comparison !== null) {
          const cp = c.comparison;
          if (typeof cp === "object" && !Array.isArray(cp)) {
            const a = so(cp.left);
            const b2 = so(cp.right);
            const d = cp.sign;
            if (a !== null && b2 !== null && [">", "<", "="].includes(d)) {
              soLan.comparison++;
              const dung = a > b2 ? ">" : a < b2 ? "<" : "=";
              if (dung !== d)
                loi.push(`[comparison] ${viTri}: chữ ghi ${a} ${d} ${b2} nhưng đúng phải là ${dung}`);
            }
          } else if (typeof cp === "string") {
            const m = gonSo(cp).match(/(-?\d+)\s*(>|<|=)\s*(-?\d+)/);
            if (m) {
              soLan.comparison++;
              const a = Number(m[1]);
              const b2 = Number(m[3]);
              const dung = a > b2 ? ">" : a < b2 ? "<" : "=";
              if (dung !== m[2])
                loi.push(`[comparison] ${viTri}: chuỗi “${cp}” SAI (đúng phải là ${dung})`);
            }
          }
        }

        // 3. mọi câu “a op b = c” trong chữ — luật nằm ở `loiTrongChu()` (đầu file)
        for (const [duong, chu] of gomChuoi(c)) {
          /** ⚠️ KHÔNG kiểm PHƯƠNG ÁN NHIỄU (`options`) — chúng SAI là CỐ Ý. */
          if (duong === "options" || duong.startsWith("options[")) continue;
          for (const mo of loiTrongChu(chu))
            loi.push(`[chữ] ${viTri} · ${duong}: ${mo}`);
        }

        // 4. câu hỏi “a op b = ?” (dấu ? ở CUỐI câu) ⇒ answer phải bằng kết quả
        if (slide.type === "quiz" && typeof c.question === "string") {
          const t = gonSo(c.question).trim();
          /**
           * ⚠️ Chỉ nhận khi dấu `?` nằm ở CUỐI: câu “9 + 4 = 9 + ?” (tìm số hạng còn thiếu) mà
           * khớp mẫu này thì sẽ báo oan, vì đáp án không phải kết quả của 9 + 4.
           */
          const m = t.match(
            /(?<![\d,/])(-?\d+)(?!,\d)\s*([+−\-×x:])\s*(\d+)(?!,\d)\s*=\s*(?:\?|…|\.\.\.)\s*$/,
          );
          /** Cùng luật với luật 3: bỏ qua nếu vế trước là số/ toán tử (biểu thức nhiều bước). */
          const truocQ = m ? t.slice(0, m.index).replace(/\s+$/, "").slice(-1) : "";
          const ans = so(c.answer);
          if (m && ans !== null && !/[\d+\-−×x=,/]/.test(truocQ || " ")) {
            const dung = tinh(Number(m[1]), m[2], Number(m[3]));
            soLan.cauHoi++;
            if (dung !== null && dung !== ans)
              loi.push(
                `[đáp án] ${viTri}: “${c.question.slice(0, 60)}” ⇒ phải là ${dung} nhưng đáp án ghi ${ans}`,
              );
          }
        }
      });
    }
  }
}

/**
 * CANARY HAI VẾ (bài học của repo: cổng chỉ có vế “bắt được mẫu sai” thì một regex
 * bắt-mọi-thứ vẫn xanh; phải có cả vế “KHÔNG bắt nhầm chuỗi hợp lệ”).
 */
const CANARY = [
  ["3 + 4 = 8", 1, "phép tính sai — phải bắt"],
  ["3 + 4 = 7", 0, "phép tính đúng — không được bắt"],
  ["3 + 4 + 5 = 12", 0, "biểu thức nhiều bước"],
  ["45 + 9 = 36? Không! Phải là 45 + 9 = 54.", 0, "câu nêu điều sai cho bé phát hiện"],
  ["Số bé = 40 : 4 × 1 = 10!", 0, "biểu thức nối tiếp có phép chia"],
  ["200 000 : 100 × 10 = 20 000 đồng.", 0, "số có dấu cách phân nghìn + nối tiếp"],
  ["Tính: 45 + 9 = 54", 0, "dấu hai chấm là dấu câu, không phải phép chia"],
  ["13 : 3 = 4 (dư 1)", 0, "thương của phép chia có dư"],
  ["3,45 × 10 = 34,5", 0, "số thập phân (dấu phẩy)"],
  ["2/5 × 10 = 4", 0, "phân số"],
  ["AB : CD = 4 : 7 = 4/7!", 0, "tỉ số viết bằng dấu hai chấm"],
  ["3×3 / 5×3 = 9/15!", 0, "nhân tử và mẫu — kết quả là phân số"],
  ["5 × 3 = 15", 0, "phép nhân đúng"],
];

let canaryHong = 0;
for (const [chu, mongDoi, ghiChu] of CANARY) {
  const n = loiTrongChu(chu).length;
  if (n !== mongDoi) {
    canaryHong++;
    console.log(`❌ CANARY: “${chu}” → bắt ${n} lỗi, mong đợi ${mongDoi} (${ghiChu})`);
  }
}
if (canaryHong === 0) console.log(`✅ Canary: ${CANARY.length}/${CANARY.length} ca đúng.`);

console.log(
  `Đã kiểm: ${soLan.operation} operation · ${soLan.comparison} comparison · ` +
    `${soLan.cauTrongChu} câu phép tính trong chữ · ${soLan.cauHoi} câu hỏi có phép tính.`,
);
if (HET) console.log("(chạy không có --het chỉ in lỗi)");
if (loi.length === 0) {
  console.log("✅ Không có phép tính nào sai.");
  process.exit(0);
}
console.log(`❌ ${loi.length} chỗ SAI:`);
loi.slice(0, 60).forEach((x) => console.log("  " + x));
if (loi.length > 60) console.log(`  … còn ${loi.length - 60} chỗ nữa`);
process.exit(1);
