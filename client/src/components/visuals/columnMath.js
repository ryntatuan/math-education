/**
 * TOÁN THUẦN CHO “ĐẶT TÍNH DỌC” — tách riêng khỏi `.jsx` để **Node kiểm được thật**
 * (bài học trong `docs`: `supabase.js` đọc `import.meta.env` nên cổng chỉ grep được;
 * tách file thuần thì `import()` thẳng và thử được hành vi).
 *
 * Chạy cổng: `node scratch/kiem-tra-dat-tinh.mjs`
 */

/** Tách một số (number hoặc chuỗi "15,82") thành phần nguyên / phần thập phân. */
export function tachSo(x) {
  const s = String(x ?? "")
    .trim()
    .replace(".", ",");
  const [nguyen = "0", thap = ""] = s.split(",");
  return { nguyen: nguyen === "" ? "0" : nguyen, thap };
}

/**
 * Kết quả của `left sign right`, giữ ĐÚNG số chữ số thập phân của hai số hạng
 * (15,82 + 9,35 = 25,17; 4,2 − 1,35 = 2,85).
 *
 * 🔴 `"×"` CẦN ĐƯỜNG TÍNH RIÊNG: cộng/trừ quy về cùng một mẫu số thập phân, còn nhân thì
 * **số chữ số thập phân của tích = TỔNG số chữ số thập phân của hai thừa số** (SGK Lớp 5).
 * Dùng chung công thức của phép cộng cho phép nhân là sai (nhân đôi mẫu số).
 */
export function tinhKetQua(left, right, sign) {
  const a = tachSo(left);
  const b = tachSo(right);
  if (sign === "×" || sign === "*") {
    const cot = a.thap.length + b.thap.length;
    const A = Number(a.nguyen + a.thap);
    const B = Number(b.nguyen + b.thap);
    const K = A * B;
    const chu = String(K).padStart(cot + 1, "0");
    const nguyen = cot ? chu.slice(0, chu.length - cot) : chu;
    const thap = cot ? chu.slice(chu.length - cot) : "";
    return { nguyen, thap, cotThap: cot };
  }
  const cot = Math.max(a.thap.length, b.thap.length);
  const mu = 10 ** cot;
  const A = Math.round(Number(`${a.nguyen}.${a.thap || "0"}`) * mu);
  const B = Math.round(Number(`${b.nguyen}.${b.thap || "0"}`) * mu);
  const K = sign === "-" || sign === "−" ? A - B : A + B;
  const am = K < 0;
  const chu = String(Math.abs(K)).padStart(cot + 1, "0");
  const nguyen = cot ? chu.slice(0, chu.length - cot) : chu;
  const thap = cot ? chu.slice(chu.length - cot) : "";
  return { nguyen: (am ? "-" : "") + nguyen, thap, cotThap: cot };
}

/**
 * Chữ số “nhớ” của từng cột khi CỘNG — phần tử `[i]` là nhớ RA của cột i (đếm từ PHẢI),
 * SGK viết nó ở hàng trên, lệch sang TRÁI một cột.
 */
export function tinhNho(left, right, sign = "+") {
  const a = tachSo(left);
  const b = tachSo(right);
  const dayA = (a.nguyen + a.thap).split("").map(Number).reverse();
  const dayB = (b.nguyen + b.thap).split("").map(Number).reverse();
  const soCot = Math.max(dayA.length, dayB.length);
  const nho = [];
  if (sign === "×" || sign === "*") {
    // Chỉ vẽ hàng “nhớ” khi thừa số thứ hai có MỘT chữ số (dạng SGK Lớp 3–4 hay viết nhớ).
    if (dayB.length !== 1) return dayA.map(() => 0);
    let carry = 0;
    for (let i = 0; i < dayA.length; i++) {
      const t = dayA[i] * dayB[0] + carry;
      carry = Math.floor(t / 10);
      nho[i] = carry;
    }
    return nho;
  }
  let carry = 0;
  for (let i = 0; i < soCot; i++) {
    const t = (dayA[i] ?? 0) + (dayB[i] ?? 0) + carry;
    carry = t >= 10 ? Math.floor(t / 10) : 0;
    nho[i] = carry;
  }
  return nho;
}

/** Dãy chữ số của kết quả xếp theo thứ tự BÉ ĐIỀN (từ phải sang trái). */
export function dapAnDatTinh(left, right, sign) {
  const kq = tinhKetQua(left, right, sign);
  const chu = kq.nguyen.replace("-", "") + kq.thap;
  return [...chu].map(Number).reverse();
}