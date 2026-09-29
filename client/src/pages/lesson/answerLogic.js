/**
 * LUẬT CHẤM của ba dạng bài mới lấy ý từ **Duolingo Math** (người dùng gửi ảnh 2026-09-28):
 *   • `multiQuiz`       — “Chọn TẤT CẢ các phương án thích hợp”   (ảnh 2)
 *   • `buildExpression` — ghép thẻ số/dấu thành phép tính đúng    (ảnh 1)
 *   • `matchPairs`      — nối cặp                                 (dạng “tap the pairs”)
 *
 * VÌ SAO TÁCH RA HÀM THUẦN: ba dạng này chấm bằng LUẬT (tập hợp, thứ tự, cặp) chứ không bằng
 * “so một chuỗi”. Luật mà nằm lẫn trong JSX thì không test được, không đo được, và mỗi lần sửa
 * giao diện là một lần có thể đổi luật chấm mà không ai biết. Ở đây có unit test +
 * canary hai vế (xem `client/src/__tests__/dangBaiMoi.test.js`), và **cổng soạn bài**
 * (`admin/src/lib/contentSchema.js`) dùng lại chính các hàm này để chặn dữ liệu vô nghiệm.
 */

/** Chuẩn hoá một phương án để so: bỏ khoảng trắng thừa, không phân biệt hoa/thường. */
export const chuanHoa = (v) =>
  String(v ?? "")
    .trim()
    .replace(/\s+/g, " ");

/**
 * CHỌN NHIỀU ĐÁP ÁN: đúng khi tập hợp đã chọn TRÙNG KHÍT tập hợp đáp án.
 * Thứ tự bấm không quan trọng; thiếu một đáp án hoặc chọn thêm một đáp án sai đều là SAI.
 */
export function dungTatCa(daChon, dapAn) {
  const chon = new Set((daChon || []).map(chuanHoa));
  const dung = new Set((dapAn || []).map(chuanHoa));
  if (dung.size === 0) return false;
  if (chon.size !== dung.size) return false;
  for (const x of dung) if (!chon.has(x)) return false;
  return true;
}

/** Phương án nào bé chọn SAI (để tô đỏ đúng chỗ, không tô đỏ cả câu). */
export function phuongAnChonSai(daChon, dapAn) {
  const dung = new Set((dapAn || []).map(chuanHoa));
  return (daChon || []).filter((x) => !dung.has(chuanHoa(x)));
}

/** Phương án ĐÚNG mà bé bỏ sót (để tô xanh cho bé thấy mình thiếu gì). */
export function phuongAnBoSot(daChon, dapAn) {
  const chon = new Set((daChon || []).map(chuanHoa));
  return (dapAn || []).filter((x) => !chon.has(chuanHoa(x)));
}

/**
 * ⚙️ THẺ CỦA `buildExpression` PHẢI LÀ **MỘT SỐ** HOẶC **MỘT DẤU** — không được trộn.
 *
 * 🔴 BÀI HỌC THẬT (người dùng báo 2026-09-28): bản đầu tôi viết thẻ kiểu `"25 ×"` (dấu dính
 * vào số) rồi chấm bằng cách so chuỗi với `solutions`. Hệ quả kép:
 *   1. Bé **KHÔNG THỂ** ghép `4 × 25` — trong khay không có thẻ `"×"` rời, mà cũng không có
 *      thẻ `"25"` rời. Ghi chú “một đề nhiều cách đúng” của tôi khi đó là nói dối: bé chỉ có
 *      đúng một đường đi do người soạn vạch sẵn.
 *   2. Muốn `4 × 25` cũng đúng thì phải kể hết mọi hoán vị vào `solutions` — quên một hoán vị
 *      là bé làm ĐÚNG mà bị báo SAI, im lặng.
 * ⇒ Nay: thẻ tách rời, và chấm bằng **GIÁ TRỊ** (`matchesTarget`) nên `25 × 4` và `4 × 25`
 *   đều đúng mà không phải kê từng cách.
 */

export const OPERATORS = {
  "+": "+",
  "−": "-", // U+2212 dấu trừ (kiểu viết khác của phép trừ)
  "-": "-",
  "×": "*",
  x: "*",
  "*": "*",
  ":": "/",
  "÷": "/",
  "/": "/",
};

/** Thẻ này có phải MỘT dấu phép tính? */
export function isOperator(the) {
  return Object.hasOwn(OPERATORS, chuanHoa(the));
}

/**
 * Đọc một thẻ số thành giá trị. Trả `null` nếu không phải số.
 * Chịu được nhiều cách viết: `"1 000"` (cách nghìn), `"1.000"`, số thập phân `"0,5"`.
 */
export function parseNumber(the) {
  let s = chuanHoa(the).replace(/\s/g, "");
  if (!s) return null;
  if (s.includes(",")) {
    if (!/^[\d.]+(,\d+)?$/.test(s)) return null;
    s = s.replace(/\./g, "").replace(",", ".");
  } else {
    const m = s.match(/^(\d+)\.(\d+)$/);
    // `1.000` = một nghìn (dấu chấm phân cách nghìn), nhưng `0.5` = năm phần mười.
    if (m && m[2].length === 3 && m[1].length <= 3) s = m[1] + m[2];
  }
  if (!/^\d+(\.\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Thẻ này có phải một SỐ (không kèm dấu phép tính)? */
export function isNumberToken(the) {
  return !isOperator(the) && parseNumber(the) !== null;
}

/**
 * TÍNH giá trị của dãy thẻ đã đặt, ví dụ `["4", "×", "25"]` → `100`.
 *
 * Trả `null` khi dãy **không phải một biểu thức**: xen kẽ số–dấu sai chỗ, hai số cạnh nhau,
 * dấu lạ, chia cho 0. Trả `null` (chứ không ném lỗi) để nơi gọi chỉ việc coi là “chưa đúng”.
 *
 * Thứ tự tính ĐÚNG như toán học: nhân/chia trước, cộng/trừ sau. Cần vậy vì `2 + 3 × 4`
 * phải là 14; nếu tính từ trái sang phải thì bài học sẽ DẠY SAI mà không ai biết.
 */
export function evaluateTokens(tokens) {
  const ds = (tokens || []).map((t) =>
    t === null || t === undefined ? null : chuanHoa(t),
  );
  // Phải là số–dấu–số–… (số lượng lẻ, tối thiểu 3 thẻ = ít nhất một phép tính).
  if (ds.length < 3 || ds.length % 2 === 0) return null;
  if (ds.some((t) => !t)) return null;

  const so = [parseNumber(ds[0])];
  const op = [];
  if (so[0] === null) return null;
  for (let i = 1; i < ds.length; i += 2) {
    const dau = OPERATORS[ds[i]];
    const tiep = parseNumber(ds[i + 1]);
    if (!dau || tiep === null) return null;
    op.push(dau);
    so.push(tiep);
  }

  // Lượt 1: nhân/chia. Lượt 2: cộng/trừ.
  const giuSo = [so[0]];
  const giuDau = [];
  for (let i = 0; i < op.length; i++) {
    const b = so[i + 1];
    if (op[i] === "*" || op[i] === "/") {
      if (op[i] === "/" && b === 0) return null;
      const a = giuSo[giuSo.length - 1];
      giuSo[giuSo.length - 1] = op[i] === "*" ? a * b : a / b;
    } else {
      giuDau.push(op[i]);
      giuSo.push(b);
    }
  }
  let ket = giuSo[0];
  for (let i = 0; i < giuDau.length; i++)
    ket = giuDau[i] === "+" ? ket + giuSo[i + 1] : ket - giuSo[i + 1];
  return ket;
}

/**
 * GHÉP THẺ THÀNH BIỂU THỨC: đúng khi điền đủ ô **và** biểu thức tính ra ĐÚNG `target`.
 *
 * So theo GIÁ TRỊ, không so chuỗi: `25 × 4` và `4 × 25` đều đúng (đổi chỗ hai thừa số thì tích
 * không đổi — chính là điều chương trình dạy). Đây là lý do `solutions` không còn dùng để chấm.
 */
export function matchesTarget(tokensDaDien, target) {
  const o = tokensDaDien || [];
  if (o.length === 0 || o.some((x) => x === null || x === undefined))
    return false;
  const can = parseNumber(target);
  if (can === null) return false;
  const ket = evaluateTokens(o);
  return ket !== null && Math.abs(ket - can) < 1e-9;
}

/** Vị trí ô trống đầu tiên — chỗ bé sẽ đặt thẻ tiếp theo. `-1` khi đã đầy. */
export function oTrongDauTien(oDaDien) {
  const i = (oDaDien || []).findIndex((x) => x === null || x === undefined);
  return i;
}

/** Số ô đã điền — dùng cho thanh tiến độ “2/3 ô”. */
export const demODaDien = (oDaDien) =>
  (oDaDien || []).filter((x) => x !== null && x !== undefined).length;

/**
 * NỐI CẶP: một lượt nối đúng khi cặp `(trai, phai)` có trong dữ liệu **và** chưa được nối
 * trước đó. Trả về khoá cặp để component đánh dấu đã xong.
 */
export const khoaCap = (trai, phai) => `${chuanHoa(trai)}||${chuanHoa(phai)}`;

export function laCapDung(trai, phai, cap) {
  const t = chuanHoa(trai);
  const p = chuanHoa(phai);
  return (cap || []).some(
    (c) =>
      chuanHoa(Array.isArray(c) ? c[0] : c?.trai) === t &&
      chuanHoa(Array.isArray(c) ? c[1] : c?.phai) === p,
  );
}

/**
 * Đã nối hết chưa: số cặp đã nối (không trùng) bằng số cặp của đề bài.
 * Dùng `Set` khoá nên nối lại một cặp cũ không làm tăng tiến độ.
 */
export const daNoiHet = (daNoi, cap) =>
  new Set(daNoi || []).size >= (cap || []).length && (cap || []).length > 0;

/**
 * Tập các thẻ **TRÁI** đã nối xong — để KHOÁ/XÁM đúng thẻ đó.
 *
 * 🔴 BÀI HỌC THẬT (tự soát cuối, 2026-09-28): `daNoi` giữ **KHOÁ CẶP** (`"2 × 6||12"`), nhưng
 * `matchPairsSlide` lại hỏi `khoaDaNoi.has(trai)` — đem một giá trị trái ra so với một khoá
 * ghép, nên **không bao giờ** đúng. Hậu quả bé nhìn thấy: nối xong mà thẻ vẫn bấm được, nối
 * lại đúng cặp cũ vẫn được tính thêm ⇒ tiến độ nhảy sai và báo “xong” khi chưa nối hết.
 * Tách phần trái của khoá ra thành hàm riêng để không ai phải tự `split` ở chỗ khác.
 */
export const traiDaNoi = (daNoi) =>
  new Set((daNoi || []).map((k) => String(k).split("||")[0]));

/**
 * ══════════════════════════════════════════════════════════════════════════════════════════
 * HAI DẠNG “TỰ TRẢ LỜI” MỚI (2026-09-28, ảnh Duolingo người dùng gửi):
 *   • `typeAnswer`       — “Nhập câu trả lời”: bé TỰ BẤM SỐ trên bàn phím số.
 *   • `numberLineAnswer` — “Trả lời trên trục số”: bé KÉO con trỏ tới vạch đúng.
 *
 * Cả hai đều là “điền một giá trị đúng”, nên luật chấm chỉ có một câu hỏi: giá trị bé chọn có
 * BẰNG đáp án không. Vẫn theo nguyên tắc của đợt trước: **so theo GIÁ TRỊ, không so chuỗi**
 * (`1 6` ≠ `16`; `06` = `6`; `16 ` = `16`). So chuỗi ở đây là bẫy quen thuộc: bé gõ đúng mà
 * bị báo sai.
 * ══════════════════════════════════════════════════════════════════════════════════════════
 */

/**
 * Đọc chuỗi bé gõ thành số. Trả `null` nếu không phải một số (rỗng, có chữ, có dấu lạ).
 * Chỉ nhận CHỮ SỐ (bàn phím của app chỉ có 0–9), nên không lẫn với định dạng nghìn “1 000”.
 */
export function parseTypedNumber(chuoi) {
  const s = String(chuoi ?? "").trim();
  if (!/^\d+$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Bé gõ `chuoi` — có đúng bằng `dapAn`? So theo GIÁ TRỊ, chịu được số 0 đứng đầu. */
export function matchesNumber(chuoi, dapAn) {
  const go = parseTypedNumber(chuoi);
  const dung = parseNumber(dapAn);
  if (go === null || dung === null) return false;
  return Math.abs(go - dung) < 1e-9;
}

/**
 * Các VẠCH của trục số: `min → max` mỗi bước `step` (kể cả hai đầu).
 * Trả `[]` khi dữ liệu vô lý (step ≤ 0, max ≤ min) hoặc `step` không chia hết khoảng —
 * dữ liệu kiểu đó làm trục số vẽ ra vạch cuối lệch, và đáp án có thể rơi vào chỗ không có vạch
 * ⇒ **bài vô nghiệm**, bé kéo đúng cũng không bao giờ chạm tới.
 */
export function ticksOf(cau) {
  const { min, max, step } = cau ?? {};
  const a = parseNumber(min);
  const b = parseNumber(max);
  const s = parseNumber(step);
  if (a === null || b === null || s === null || s <= 0 || b <= a) return [];
  const soVach = Math.round((b - a) / s) + 1;
  if (soVach < 2 || Math.abs(a + (soVach - 1) * s - b) > 1e-9) return [];
  return Array.from({ length: soVach }, (_, i) => a + i * s);
}

/** Vạch GẦN một giá trị nhất (dùng khi bé kéo con trỏ — luôn bám vào vạch, không nằm giữa). */
export function nearestTick(giaTri, ticks) {
  const ds = ticks || [];
  if (ds.length === 0) return null;
  let gan = ds[0];
  for (const t of ds)
    if (Math.abs(t - giaTri) < Math.abs(gan - giaTri)) gan = t;
  return gan;
}

/** Con trỏ đang ở `giaTri` — có đúng bằng `dapAn`? (dùng cho `numberLineAnswer`) */
export function matchesNumberLine(giaTri, dapAn) {
  const chon = parseNumber(giaTri);
  const dung = parseNumber(dapAn);
  if (chon === null || dung === null) return false;
  return Math.abs(chon - dung) < 1e-9;
}

/**
 * ĐẢO VÒNG cho cột “nối cặp”: dữ liệu viết theo cặp (1–1, 2–2 …) nên nếu vẽ nguyên thứ tự thì
 * bé chỉ việc nối hàng trên với hàng dưới — hết bài mà không phải nghĩ.
 *
 * Hàm thuần và KHÔNG ngẫu nhiên: mỗi lần render lại mà thẻ đổi chỗ thì bé đang nhìn bị rối.
 * Đảo vòng một bậc là đủ để không hàng nào khớp hàng của nó, và bé nào để ý cũng đoán được
 * luật — chấp nhận được cho một bài học, không cần xáo trộn thật.
 */
export function xaoOnDinh(danhSach) {
  const a = [...(danhSach || [])];
  if (a.length < 3) return a;
  return [...a.slice(1), a[0]];
}
