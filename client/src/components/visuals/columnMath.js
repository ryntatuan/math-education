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
 * Phép CHIA có dư (số nguyên) — dùng cho dạng đặt tính chia của SGK Lớp 3–4.
 * Trả về thương (chuỗi) và số dư. Chia số thập phân KHÔNG dùng hàm này (bố cục khác).
 */
export function tinhChia(left, right) {
  const a = Number(String(left).replace(",", "."));
  const b = Number(String(right).replace(",", "."));
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0)
    return { nguyen: "0", thap: "", cotThap: 0, du: 0 };
  const thuong = Math.floor(a / b);
  return {
    nguyen: String(thuong),
    thap: "",
    cotThap: 0,
    du: +(a - thuong * b).toFixed(6),
  };
}

/**
 * THỨ TỰ Ô ĐIỀN của một cột dọc — NGUỒN SỰ THẬT duy nhất (giao diện và cổng kiểm dùng chung).
 *
 * 🔴 VÌ SAO CÓ HÀM NÀY (người dùng báo 2026-09-26: *“phép cộng là từ phải qua trái, tại sao đáp
 * án lại điền từ trái qua phải?”*): bản đầu, giao diện đếm ô trống theo THỨ TỰ VẼ (trái → phải)
 * còn đáp án lại xếp PHẢI → TRÁI ⇒ bé điền đúng số nhưng vào SAI HÀNG vẫn được báo đúng, và ô
 * sáng đầu tiên là ô hàng cao nhất. Lỗi này cổng tĩnh KHÔNG bắt được, nên nay thứ tự là một hàm
 * thuần để `scratch/kiem-tra-thu-tu-o-dien.mjs` kiểm được bằng Node.
 *
 *   • Cộng · trừ · nhân: TỪ PHẢI SANG TRÁI; ô “nhớ” điền NGAY SAU hàng sinh ra nó (đúng như lời
 *     giải “hàng đơn vị 6 × 3 = 18, viết 8 nhớ 1” rồi mới sang hàng chục).
 *   • Chia: TỪ TRÁI SANG PHẢI (các chữ số của thương), sau cùng là ô SỐ DƯ (nếu có).
 *
 * @returns {Array<{loai:"chuSo"|"nho"|"thuong"|"du", viTri?:number, v?:number}>}
 */
export function thuTuOTrong(left, right, sign, remember = false) {
  const op =
    sign === "-" || sign === "−"
      ? "−"
      : sign === "*" || sign === "×"
        ? "×"
        : sign === ":" || sign === "÷"
          ? ":"
          : "+";
  if (op === ":") {
    const { nguyen, du } = tinhChia(left, right);
    // ĐI TRÁI → PHẢI (các chữ số của thương), sau cùng là ô SỐ DƯ.
    return [
      ...[...nguyen].map((ch, i) => ({
        loai: "thuong",
        viTri: i,
        v: Number(ch),
      })),
      ...(du > 0 ? [{ loai: "du", v: du }] : []),
    ];
  }
  const a = tachSo(left);
  const b = tachSo(right);
  const kq = tinhKetQua(left, right, op);
  const cotNguyen = Math.max(
    a.nguyen.length,
    b.nguyen.length,
    kq.nguyen.length,
  );
  const canPhai = (s, n) => " ".repeat(Math.max(0, n - s.length)) + s;
  const hangKQ =
    canPhai(kq.nguyen, cotNguyen) + (kq.cotThap ? `,${kq.thap}` : "");
  const coNho = remember === true && (op === "+" || op === "×");
  const oNho = [];
  if (coNho) {
    const soCot = hangKQ.length;
    tinhNho(left, right, op).forEach((v, i) => {
      const viTri = soCot - 1 - i - 1; // nhớ của cột i viết lệch sang TRÁI một ô
      if (v > 0 && viTri >= 0) oNho.push({ viTri, v });
    });
  }
  const viTriChuSo = [...hangKQ]
    .map((ch, i) => (ch >= "0" && ch <= "9" ? i : -1))
    .filter((i) => i >= 0);
  const ra = [];
  for (let k = 0; k < hangKQ.length; k++) {
    const viTri = hangKQ.length - 1 - k; // PHẢI → TRÁI
    if (viTriChuSo.includes(viTri))
      ra.push({ loai: "chuSo", viTri, v: Number(hangKQ[viTri]) });
    for (const o of oNho)
      if (o.viTri === viTri - 1)
        ra.push({ loai: "nho", viTri: o.viTri, v: o.v });
  }
  return ra;
}

/**
 * Kết quả của `left sign right`.
 *
 * 🔴 Phép `×` cần đường tính RIÊNG (số chữ số thập phân của tích = TỔNG hai thừa số), và phép
 * `:` cũng vậy (có THƯƠNG và SỐ DƯ) — dùng chung công thức của phép cộng cho hai phép này là sai.
 */
export function tinhKetQua(left, right, sign) {
  const a = tachSo(left);
  const b = tachSo(right);
  if (sign === ":" || sign === "÷") return tinhChia(left, right);
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
