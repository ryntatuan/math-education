/**
 * LỜI GIẢI TỪNG BƯỚC cho một phép tính cột dọc — logic THUẦN, không React.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng báo 2026-09-26): *“slide quá chung chung, không hướng dẫn
 * cũng như chỉ cho bé thấy làm sao để ra kết quả”*. Trước đây slide chỉ kê đáp án. Nay mỗi
 * bài đều kèm lời giải từng hàng, SINH TỰ ĐỘNG từ chính con số ⇒ không thể lệch với kết quả
 * (cùng nguyên tắc với `columnMath.js`: đáp án không bao giờ khai bằng tay).
 *
 * Cách nói theo đúng SGK tiểu học:
 *   +  : “hàng đơn vị 6 + 8 = 14, viết 4 nhớ 1”
 *   −  : “hàng đơn vị 3 < 5 nên mượn 1: 13 − 5 = 8, viết 8”
 *   ×  : “hàng đơn vị 6 × 3 = 18, viết 8 nhớ 1” (nhân nhiều chữ số ⇒ hai tích riêng)
 *   :  : “hạ 8: 8 : 4 = 2, viết 2” rồi “dư 1” nếu còn
 *
 * Kiểm bằng `node scratch/kiem-tra-buoc-tinh.mjs` (đối chiếu với `tinhKetQua`/`tinhChia`).
 */
import { tachSo, tinhKetQua, tinhChia } from "./columnMath.js";

const TEN_HANG = [
  "hàng đơn vị",
  "hàng chục",
  "hàng trăm",
  "hàng nghìn",
  "hàng chục nghìn",
  "hàng trăm nghìn",
  "hàng triệu",
];

/** Chữ số của phần nguyên, viết từ TRÁI sang PHẢI. */
const chuSoCua = (x) => [...tachSo(x).nguyen];
const soCua = (x) => Number(tachSo(x).nguyen);
const vietSo = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Lời giải của phép CỘNG. */
function buocCong(a, b) {
  const A = chuSoCua(a).reverse();
  const B = chuSoCua(b).reverse();
  const n = Math.max(A.length, B.length);
  const ra = [];
  let nho = 0;
  for (let i = 0; i < n; i++) {
    const x = Number(A[i] ?? 0);
    const y = Number(B[i] ?? 0);
    const tong = x + y + nho;
    const chuSo = tong % 10;
    const nhoMoi = tong >= 10 ? 1 : 0;
    let cau = `${x} + ${y}`;
    if (nho) cau += ` + ${nho} (nhớ)`;
    cau += ` = ${tong}, viết ${chuSo}`;
    if (nhoMoi) cau += ` nhớ 1`;
    ra.push(`${TEN_HANG[i]} ${cau}`);
    nho = nhoMoi;
  }
  if (nho) ra.push(`còn nhớ 1 ở hàng cao hơn, viết 1`);
  return ra;
}

/** Lời giải của phép TRỪ (SGK: không dạy kết quả âm). */
function buocTru(a, b) {
  const A = chuSoCua(a).reverse();
  const B = chuSoCua(b).reverse();
  const n = A.length;
  const ra = [];
  let muon = 0;
  for (let i = 0; i < n; i++) {
    const x = Number(A[i] ?? 0);
    const y = Number(B[i] ?? 0) + muon;
    let cau;
    let hieu;
    if (x < y) {
      hieu = x + 10 - y;
      cau = `${x} < ${y} nên mượn 1: ${x + 10} − ${y} = ${hieu}, viết ${hieu}`;
      muon = 1;
    } else {
      hieu = x - y;
      cau = `${x} − ${y} = ${hieu}, viết ${hieu}`;
      muon = 0;
    }
    ra.push(`${TEN_HANG[i]} ${cau}`);
  }
  return ra;
}

/** 10, 100, 1 000… ⇒ số chữ số 0 (0 nếu không phải luỹ thừa của 10). */
const soChuSo0 = (n) => {
  if (!Number.isInteger(n) || n < 10) return 0;
  let t = n;
  let dem = 0;
  while (t % 10 === 0 && t > 1) {
    t /= 10;
    dem += 1;
  }
  return t === 1 ? dem : 0;
};

/** Lời giải của phép NHÂN: nhân từng hàng (thừa số thứ hai một chữ số), hoặc hai tích riêng. */
function buocNhan(a, b) {
  const A = chuSoCua(a).reverse();
  const B = chuSoCua(b);
  const soA = soCua(a);
  const soB = soCua(b);
  // SGK Lớp 3–4: nhân với 10, 100, 1 000… KHÔNG dùng tích riêng — chỉ thêm chữ số 0.
  const dem0 = soChuSo0(soB);
  if (dem0 > 0)
    return [
      `nhân với ${vietSo(soB)} chỉ việc thêm ${dem0} chữ số 0 vào bên phải: ${vietSo(soA)} ⇒ ${vietSo(soA * soB)}`,
    ];
  if (B.length > 1) {
    // SGK Lớp 4-5: nhân với số có nhiều chữ số = hai tích riêng rồi cộng lại.
    const tich1 = soA * Number(B[B.length - 1]);
    const tich2 = soA * Number(B[0]) * 10;
    return [
      `tích riêng thứ nhất: ${vietSo(soA)} × ${B[B.length - 1]} = ${vietSo(tich1)}`,
      `tích riêng thứ hai: ${vietSo(soA)} × ${B[0]} = ${vietSo(soA * Number(B[0]))}, viết lùi sang trái một cột (thành ${vietSo(tich2)})`,
      `cộng hai tích riêng: ${vietSo(tich1)} + ${vietSo(tich2)} = ${vietSo(tich1 + tich2)}`,
    ];
  }
  const ra = [];
  let nho = 0;
  for (let i = 0; i < A.length; i++) {
    const x = Number(A[i]);
    const tich = x * soB + nho;
    const chuSo = tich % 10;
    const nhoMoi = Math.floor(tich / 10);
    let cau = `${x} × ${soB}`;
    if (nho) cau += ` + ${nho} (nhớ)`;
    cau += ` = ${tich}, viết ${chuSo}`;
    if (nhoMoi) cau += ` nhớ ${nhoMoi}`;
    ra.push(`${TEN_HANG[i]} ${cau}`);
    nho = nhoMoi;
  }
  if (nho) ra.push(`còn nhớ ${nho} ở hàng cao hơn, viết ${nho}`);
  return ra;
}

/** Lời giải phép CHIA số nguyên (SGK Lớp 3–4: lần lượt hạ từng chữ số từ trái sang phải). */
function buocChia(a, b) {
  const soA = soCua(a);
  const soB = soCua(b);
  const A = chuSoCua(a).map(Number);
  const { nguyen, du } = tinhChia(soA, soB);
  const ra = [];
  // SGK: chia cho 10, 100, 1 000… chỉ việc bớt chữ số 0 ở bên phải.
  const dem0 = soChuSo0(soB);
  if (dem0 > 0 && soA % soB === 0)
    return [
      `chia cho ${vietSo(soB)} chỉ việc bớt ${dem0} chữ số 0 ở bên phải: ${vietSo(soA)} ⇒ ${vietSo(soA / soB)}`,
    ];
  let cur = 0;
  let daCoThuong = false;
  const thuong = [];
  for (let i = 0; i < A.length; i++) {
    cur = cur * 10 + A[i];
    if (!daCoThuong && cur < soB && i < A.length - 1) {
      ra.push(
        `hạ ${A[i]}: ${cur} chưa chia được cho ${soB}, hạ tiếp chữ số sau`,
      );
      continue;
    }
    daCoThuong = true;
    const q = Math.floor(cur / soB);
    const r = cur - q * soB;
    thuong.push(q);
    // “hạ”: từ lượt thứ hai trở đi phải nói rõ chữ số vừa hạ xuống, nếu không trẻ không
    // hiểu con số `cur` ở đâu ra.
    const daHa = i > 0 ? `hạ ${A[i]}: ` : "";
    ra.push(
      `${daHa}${cur} : ${soB} = ${q}, viết ${q}${q > 0 && r > 0 ? ` (còn ${r})` : ""}`,
    );
    cur = r;
  }
  if (thuong.join("") !== nguyen)
    ra.push(`⚠️ lời giải lệch thương: ${thuong.join("")} ≠ ${nguyen}`);
  if (du > 0) ra.push(`còn lại ${du} < ${soB} nên đây là số dư: ${du}`);
  return ra;
}

/**
 * Lời giải đầy đủ của `left sign right`.
 * @returns {{ buoc: string[], ketLuan: string }}
 */
export function buocTinh(left, right, sign) {
  const a = soCua(left);
  const b = soCua(right);
  const op =
    sign === "-" || sign === "−"
      ? "−"
      : sign === "*" || sign === "×"
        ? "×"
        : sign === ":" || sign === "÷"
          ? ":"
          : "+";
  let buoc;
  let ketLuan;
  if (op === "×") {
    buoc = buocNhan(a, b);
    ketLuan = `${vietSo(a)} × ${vietSo(b)} = ${vietSo(a * b)}`;
  } else if (op === ":") {
    buoc = buocChia(a, b);
    const { nguyen, du } = tinhChia(a, b);
    ketLuan = `${vietSo(a)} : ${vietSo(b)} = ${vietSo(nguyen)}${du > 0 ? ` (dư ${du})` : ""}`;
  } else if (op === "−") {
    if (a < b) return { buoc: [], ketLuan: "" };
    buoc = buocTru(a, b);
    ketLuan = `${vietSo(a)} − ${vietSo(b)} = ${vietSo(a - b)}`;
  } else {
    buoc = buocCong(a, b);
    ketLuan = `${vietSo(a)} + ${vietSo(b)} = ${vietSo(a + b)}`;
  }
  // Tự đối chiếu với bộ tính toán ở `columnMath` (một nguồn sự thật): lời giải KHÔNG được
  // nói một đằng còn bộ tính nói một nẻo. Chỉ so được với phép tính SỐ NGUYÊN.
  const kq = tinhKetQua(left, right, op);
  const mongDoi =
    op === "+"
      ? a + b
      : op === "−"
        ? a - b
        : op === "×"
          ? a * b
          : Number(tinhChia(a, b).nguyen);
  const kqNguyen = Number(kq.nguyen);
  if (kq.thap === "" && kqNguyen !== mongDoi)
    buoc = [
      ...buoc,
      `⚠️ kết quả không khớp bộ tính toán (${kqNguyen} ≠ ${mongDoi})`,
    ];
  return { buoc, ketLuan };
}

/** Một câu gọn dùng ngay làm `text` của slide (xuống dòng giữa các bước). */
export function loiGiaiGon(left, right, sign, moDau) {
  const { buoc, ketLuan } = buocTinh(left, right, sign);
  if (!ketLuan) return moDau ?? "";
  const dau = moDau ? `${moDau}\n` : "";
  return `${dau}${buoc.map((b, i) => `${i + 1}) ${b}`).join("\n")}\nVậy ${ketLuan}.`;
}
