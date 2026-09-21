// Soi nội dung tìm loại lỗi mà CỔNG KHÔNG BẮT ĐƯỢC: "hợp lệ nhưng vô nghĩa".
//
// VÌ SAO: `contentSchema.js` kiểm khoá/kiểu/đáp án — nên một slide chứa câu đệm
// ("Nắm chắc quy tắc toán học chuẩn SGK.") vẫn là slide HỢP LỆ. Đã mắc thật: 38 bài
// Lớp 3 dùng đúng hai gạch đầu dòng giống hệt nhau mà mọi cổng đều xanh.
// Công cụ này tìm sáu dấu hiệu, xếp theo mức đáng ngờ:
//
//   (1) CÂU LẶP giữa nhiều bài   — dấu hiệu mạnh nhất của văn bản sinh hàng loạt.
//   (2) Slide khái niệm RỖNG     — chỉ có nhãn + tiêu đề, không có gì để học.
//   (3) MÔ TẢ bài trùng nhau     — nhiều bài "giống hệt" nhau về lời giới thiệu.
//   (4) ĐÁP ÁN trùng trong options — quiz không chấm được rõ ràng.
//   (5) Tiêu đề khái niệm LỆCH bài — bắt được ca `Hình học hai bước:` (đã sửa).
//   (6) Bài KHÔNG có câu hỏi nào — bé học xong không được kiểm tra gì.
//
// DÙNG: node scratch/soi-noi-dung.mjs
// Chỉ ĐỌC. In báo cáo, không sửa gì.

const LOP = [1, 2, 3, 4, 5];
const NGUONG_LAP = 5; // cùng một câu xuất hiện ở từ 5 bài trở lên thì đáng soi
const DAI_TOI_THIEU = 25; // bỏ qua nhãn ngắn ("Ghi nhớ:", "Đúc kết:"…)

const duLieu = {};
for (const n of LOP) {
  const mod = await import(`../client/src/data/grade${n}Data.js`);
  duLieu[n] = mod[`grade${n}Data`];
}

// Gom mọi bài lại kèm lớp/chương để báo cáo cho dễ tìm.
const bai = [];
for (const n of LOP) {
  for (const chuong of duLieu[n].chapters) {
    for (const b of chuong.lessons) {
      bai.push({ lop: n, chuong: chuong.id, ...b });
    }
  }
}
console.log(`Đã đọc ${bai.length} bài từ 5 file tĩnh.\n`);

/** Lấy mọi giá trị chuỗi trong một object (đệ quy). */
function chuoiTrong(obj, ra = []) {
  if (typeof obj === "string") ra.push(obj);
  else if (Array.isArray(obj)) for (const x of obj) chuoiTrong(x, ra);
  else if (obj && typeof obj === "object")
    for (const v of Object.values(obj)) chuoiTrong(v, ra);
  return ra;
}

const chuanHoa = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const TU_DUNG = new Set([
  "cua",
  "cac",
  "cho",
  "voi",
  "trong",
  "mot",
  "hai",
  "theo",
  "bang",
  "khi",
]);
const tuYNghia = (s) =>
  chuanHoa(s)
    .split(" ")
    .filter((t) => t.length >= 4 && !TU_DUNG.has(t));

// ── (1) Câu lặp giữa nhiều bài ───────────────────────────────────────────────
// Ngoại lệ đã kiểm chứng bằng tay: câu hỏi mở đầu của nhân vật Rô-bốt
// ("Bạn Rô-bốt nói đúng hay sai?") được CỐ Ý dùng lại ở 5 lớp — đây là câu dẫn của
// một dạng quiz, không phải văn bản đệm sao chép. Không tính vào cảnh báo.
//
// Ba câu dưới đây cũng là ngoại lệ CỐ Ý (thêm 2026-09-21 khi dựng lại lớp 1–3):
// chúng là NGUYÊN TẮC TOÁN HỌC chuẩn, lặp lại ở mọi bài cùng dạng là đúng sư phạm.
// "Miệng dấu quay về số lớn hơn" là câu ghi nhớ kinh điển của dấu > và <;
// "Số dư luôn bé hơn số chia" là điều kiện bắt buộc của phép chia có dư;
// "Thử lại bằng phép tính ngược" là bước kiểm tra chuẩn. Viết lại cho khác chữ
// sẽ làm nội dung YẾU ĐI, nên xếp vào ngoại lệ thay vì sửa.
const NGOAI_LE = new Set([
  "ban ro bot noi ung hay sai",
  "thu lai bang phep tinh nguoc",
  "so du luon be hon so chia",
  "mieng dau quay ve so lon hon",
]);
const dem = new Map();
for (const b of bai) {
  const thay = new Set();
  for (const s of b.slides ?? [])
    for (const t of chuoiTrong(s.content ?? {})) {
      if (t.length >= DAI_TOI_THIEU) thay.add(t);
    }
  for (const t of thay) {
    if (!dem.has(t)) dem.set(t, []);
    dem.get(t).push(b.id);
  }
}
const lap = [...dem.entries()]
  .filter(([, ids]) => ids.length >= NGUONG_LAP)
  .filter(([t]) => !NGOAI_LE.has(chuanHoa(t)))
  .sort((a, b) => b[1].length - a[1].length);

console.log(
  `── (1) CÂU LẶP ở từ ${NGUONG_LAP} bài trở lên: ${lap.length} câu ──`,
);
for (const [t, ids] of lap.slice(0, 25)) {
  console.log(
    `  · ${ids.length} bài — ${ids.slice(0, 4).join(", ")}${ids.length > 4 ? " …" : ""}`,
  );
  console.log(`      “${t.length > 110 ? t.slice(0, 110) + "…" : t}”`);
}
// Tổng hợp: bài nào dính BẤT KỲ câu lặp nào, và dồn theo chương.
// Con số này quan trọng hơn danh sách câu: nó cho biết phải viết lại bao nhiêu bài.
const dính = new Set();
for (const [, ids] of lap) for (const id of ids) dính.add(id);
const theoChuong = new Map();
for (const id of dính) {
  const k = id.replace(/-l\d+$/, "");
  theoChuong.set(k, (theoChuong.get(k) ?? 0) + 1);
}
console.log(
  `\n  ⇒ TỔNG: ${dính.size} bài dính ít nhất một câu lặp (trên ${bai.length} bài).`,
);
const xep = [...theoChuong.entries()].sort((a, b) => b[1] - a[1]);
console.log(
  `     Theo chương: ${xep.map(([k, v]) => `${k}=${v}`).join(" · ")}`,
);
// ── (2) Slide khái niệm rỗng ────────────────────────────────────────────────
const khaiNiemRong = [];
for (const b of bai) {
  for (const s of b.slides ?? []) {
    if (s.type !== "concept") continue;
    const c = s.content ?? {};
    const co =
      (Array.isArray(c.points) && c.points.length) ||
      c.explanation ||
      c.rule ||
      c.steps ||
      c.clock ||
      c.shape ||
      c.gallery;
    if (!co) khaiNiemRong.push(`${b.id} — “${c.title ?? "?"}”`);
  }
}
console.log(
  `\n── (2) Slide khái niệm RỖNG (không có gì để học): ${khaiNiemRong.length} ──`,
);
khaiNiemRong.slice(0, 20).forEach((x) => console.log(`  · ${x}`));

// ── (3) Mô tả bài trùng nhau ────────────────────────────────────────────────
const theoMoTa = new Map();
for (const b of bai) {
  const k = chuanHoa(b.description ?? "");
  if (!k) continue;
  if (!theoMoTa.has(k)) theoMoTa.set(k, []);
  theoMoTa.get(k).push(b.id);
}
const trungMoTa = [...theoMoTa.entries()].filter(([, ids]) => ids.length >= 2);
console.log(`\n── (3) MÔ TẢ trùng nhau: ${trungMoTa.length} nhóm ──`);
trungMoTa
  .slice(0, 15)
  .forEach(([, ids]) => console.log(`  · ${ids.join("  =  ")}`));

// ── (4) Đáp án trùng trong options ──────────────────────────────────────────
const dapAnTrung = [];
for (const b of bai) {
  for (const s of b.slides ?? []) {
    const d =
      s.type === "quiz"
        ? s.content?.answer
        : s.type === "dialogue"
          ? s.content?.correctAnswer
          : null;
    if (d === null || d === undefined) continue;
    const opts = s.content?.options ?? [];
    const trung = opts.filter((o) => o === d).length;
    const optsTrung = new Set(opts.map(String)).size !== opts.length;
    if (trung > 1 || optsTrung)
      dapAnTrung.push(`${b.id} — options có giá trị lặp`);
  }
}
console.log(`\n── (4) Quiz có OPTION/ĐÁP ÁN lặp: ${dapAnTrung.length} ──`);
dapAnTrung.slice(0, 15).forEach((x) => console.log(`  · ${x}`));

// ── (5) Tiêu đề khái niệm lệch hẳn tiêu đề bài ──────────────────────────────
const lech = [];
for (const b of bai) {
  const khaiNiem = (b.slides ?? []).find((s) => s.type === "concept")?.content
    ?.title;
  if (!khaiNiem) continue;
  const t1 = new Set(tuYNghia(b.title ?? ""));
  const t2 = tuYNghia(khaiNiem);
  const chung = t2.filter((t) => t1.has(t));
  if (t2.length >= 3 && chung.length === 0)
    lech.push(`${b.id} — bài: “${b.title}” · khái niệm: “${khaiNiem}”`);
}
console.log(
  `\n── (5) TIÊU ĐỀ khái niệm lệch hẳn tiêu đề bài: ${lech.length} ──`,
);
lech.slice(0, 20).forEach((x) => console.log(`  · ${x}`));

// ── (6) Bài không có câu hỏi nào ────────────────────────────────────────────
const khongHoi = bai
  .filter(
    (b) =>
      !(b.slides ?? []).some((s) => s.type === "quiz" || s.type === "dialogue"),
  )
  .map((b) => b.id);
console.log(`\n── (6) Bài KHÔNG có câu hỏi nào: ${khongHoi.length} ──`);
khongHoi.slice(0, 20).forEach((x) => console.log(`  · ${x}`));

console.log("\n(Xong. Không sửa gì.)");
