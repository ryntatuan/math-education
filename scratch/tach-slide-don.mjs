/**
 * TÁCH slide “DỒN NHIỀU BÀI” thành mỗi bài một slide, kèm LỜI GIẢI TỪNG BƯỚC.
 *
 * Chạy thử: `node scratch/tach-slide-don.mjs`            (KHÔNG ghi file, in ra bản xem trước)
 * Ghi thật: `node scratch/tach-slide-don.mjs --ghi`      (chỉ ghi khi mọi thứ hợp lệ)
 *
 * Danh sách việc lấy từ `scratch/out-soat-don-phep-tinh.txt` (do `soat-slide-don-phep-tinh.mjs`
 * sinh) — CHỈ những dòng nhóm [C] (bảng kết quả nhiều dòng, mỗi dòng một bài khác nhau).
 *
 * Vì sao phải quét ngoặc thay vì cắt chuỗi theo mẫu: mẫu `replace` rất dễ khớp nhầm (lần trước
 * tôi đã làm hỏng một file vì thế). Ở đây ta đi ĐÚNG chỉ số: tìm bài theo `id`, tìm `slides: [`,
 * rồi đếm từng object `{…}` cho tới slide cần sửa ⇒ cắt chính xác, kể cả khi nội dung có dấu
 * ngoặc hay dấu nháy.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import {
  buocTinh,
  loiGiaiGon,
} from "../client/src/components/visuals/columnSteps.js";

const GHI = process.argv.includes("--ghi");
const CHI_BAI = process.argv.find((x) => x.startsWith("--bai="))?.slice(6);

// ───────────────────────── quét ngoặc ─────────────────────────
/** Bỏ qua chuỗi ký tự (", ', `) và chú thích; trả về vị trí đóng của object bắt đầu ở `start`. */
function hetObject(src, start) {
  let i = start;
  let sau = 0;
  const mo = { "{": 1, "[": 1 };
  const dong = { "}": 1, "]": 1 };
  while (i < src.length) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      i = src.indexOf("*/", i + 2) + 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      const q = ch;
      i++;
      while (i < src.length) {
        if (src[i] === "\\") i += 2;
        else if (src[i] === q) break;
        else i++;
      }
      i++;
      continue;
    }
    if (mo[ch]) sau += 1;
    else if (dong[ch]) {
      sau -= 1;
      if (sau === 0) return i + 1;
    }
    i++;
  }
  throw new Error("không tìm thấy dấu đóng object");
}

/** Vị trí bắt đầu của `slides: [` trong bài có id đã cho. */
function viTriSlides(src, id) {
  const re = new RegExp(`["']?id["']?:\\s*["']${id}["']`);
  const m = re.exec(src);
  if (!m) throw new Error(`không thấy bài ${id}`);
  const reSlides = /["']?slides["']?:\s*\[/g;
  reSlides.lastIndex = m.index;
  const s = reSlides.exec(src);
  if (!s) throw new Error(`bài ${id} không có slides: [`);
  return s.index + s[0].length;
}

/** Cắt object slide thứ `soSlide` (1-based) của bài. */
function catSlide(src, id, soSlide) {
  let i = viTriSlides(src, id);
  let dem = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "]" && dem === 0) break;
    if (ch === "{") {
      const cuoi = hetObject(src, i);
      dem += 1;
      if (dem === soSlide) {
        // kèm dấu phẩy ngay sau object (nếu có) để câu lệnh vẫn hợp lệ
        let j = cuoi;
        while (j < src.length && /\s/.test(src[j])) j++;
        const kemPhay = src[j] === "," ? j + 1 : cuoi;
        // thụt lề = khoảng trắng đầu dòng của chính object này trong file gốc
        const truoc = src.slice(0, i);
        const le = /[ \t]*$/.exec(truoc)[0];
        return {
          start: i,
          end: kemPhay,
          text: src.slice(i, cuoi),
          le,
          coPhay: kemPhay !== cuoi,
        };
      }
      i = cuoi;
      continue;
    }
    i++;
  }
  throw new Error(`bài ${id} không có slide ${soSlide}`);
}

// ───────────────────── đọc danh sách việc ─────────────────────
const dong = readFileSync("scratch/out-soat-don-phep-tinh.txt", "utf8").split(
  "\n",
);
const viec = [];
for (const l of dong) {
  const m = /^\[C\].*?L(\d) (g(\d)-c(\d+)-l\d+) slide (\d+)/.exec(l);
  if (m)
    viec.push({
      lop: Number(m[1]), // số sau chữ “L”
      bai: m[2], // g3-c4-l10
      chuong: Number(m[4]),
      slide: Number(m[5]),
    });
}
if (!viec.length) {
  console.log(
    "Không có việc nào (nhóm [C]) — chạy `node scratch/soat-slide-don-phep-tinh.mjs` trước.",
  );
  process.exit(0);
}

// ───────────────────── dựng slide mới ─────────────────────
const so = (v) => {
  if (v === null || v === undefined) return NaN;
  let t = String(v)
    .replace(/[\u00a0 ]/g, "")
    .trim();
  if (t.includes(",") && !t.includes("."))
    t = t.replace(/\./g, "").replace(",", ".");
  else t = t.replace(/,/g, "");
  return Number(t);
};
const DẤU = {
  "+": "+",
  "-": "−",
  "−": "−",
  "×": "×",
  x: "×",
  "*": "×",
  ":": ":",
  "÷": ":",
};
const laSoNguyen = (v) => Number.isInteger(v);

/** Các bài (phép tính) trong bảng của một slide, theo thứ tự dòng. */
function baiTrongBang(c) {
  const ra = [];
  for (const r of c.table?.rows ?? []) {
    if (!Array.isArray(r) || r.length < 2) continue;
    const m = /^([\d\u00a0 .,]+)\s*([+\-−×x*:÷])\s*([\d\u00a0 .,]+)$/.exec(
      String(r[0]).trim(),
    );
    if (!m) continue;
    const a = so(m[1]);
    const b = so(m[3]);
    const kq = so(r[1]);
    const op = DẤU[m[2]];
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(kq))
      continue;
    ra.push({ a, b, op, kq });
  }
  return ra;
}

/** Có vẽ được cột dọc không (cotTinh chỉ nhận chia SỐ NGUYÊN, không ra số âm). */
const veDuoc = ({ a, b, op }) =>
  op === ":"
    ? laSoNguyen(a) && laSoNguyen(b) && a > b && b !== 0
    : !(op === "−" && a < b);

/** Có phải ghi hàng “nhớ” không (cổng chỉ cho phép với cộng và nhân một chữ số). */
function canNho({ a, b, op }) {
  if (op === "+") {
    const A = [...String(Math.trunc(a))].reverse();
    const B = [...String(Math.trunc(b))].reverse();
    let nho = 0;
    for (let i = 0; i < Math.max(A.length, B.length); i++) {
      const t = Number(A[i] ?? 0) + Number(B[i] ?? 0) + nho;
      nho = t >= 10 ? 1 : 0;
    }
    return nho > 0 || A.some((_, i) => Number(A[i]) + Number(B[i] ?? 0) >= 10);
  }
  if (op === "×") {
    const B = String(Math.trunc(b));
    if (B.length !== 1) return false;
    const A = [...String(Math.trunc(a))].reverse();
    return A.some((ch) => Number(ch) * Number(B) >= 10);
  }
  return false;
}

const goiY = (o) => {
  const ra = [o];
  for (const l of [1, -1, 10, -10, 2, -2]) {
    const v = o + l;
    if (v > 0 && !ra.includes(v) && ra.length < 4) ra.push(v);
  }
  return ra;
};

/** Slide mới cho MỘT bài. */
function slideCho(bai, nhan, laSlideDau) {
  const { a, b, op, kq } = bai;
  const soDep = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const moDau = laSlideDau && nhan ? nhan : undefined;
  if (veDuoc(bai)) {
    const v = {
      type: "visual",
      content: {
        text: loiGiaiGon(a, b, op, moDau),
        cotTinh: {
          left: a,
          right: b,
          sign: op,
          ...(canNho(bai) ? { remember: true } : {}),
        },
      },
    };
    return v;
  }
  const vnd = `${soDep(a)} ${op} ${soDep(b)}`;
  return {
    type: "visual",
    content: {
      text: loiGiaiGon(a, b, op, moDau),
      bangTinh: {
        headers: ["Phép tính", "Kết quả"],
        rows: [[vnd, null]],
        answers: [kq],
        options: goiY(kq),
        label: nhan ?? "Điền kết quả",
      },
    },
  };
}

// ───────────────────── áp dụng ─────────────────────
const theoFile = new Map();
for (const v of viec) {
  if (CHI_BAI && v.bai !== CHI_BAI) continue;
  const file = `client/src/data/grade${v.lop}/g${v.lop}c${v.chuong}.js`;
  theoFile.set(file, [...(theoFile.get(file) ?? []), v]);
}

let soTach = 0;
const xemTruoc = [];
let xemTruocChiTiet = "";
for (const [file, ds] of theoFile) {
  let src = readFileSync(file, "utf8");
  // dữ liệu của bài (để biết nội dung bảng)
  const mod = await import(new URL(`../${file}`, import.meta.url));
  const du = mod[`g${ds[0].lop}c${ds[0].chuong}`];
  const doi = [];
  for (const v of ds) {
    let baiDu = null;
    for (const b of du?.lessons ?? []) if (b.id === v.bai) baiDu = b;
    if (!baiDu) continue;
    const slideDu = baiDu.slides[v.slide - 1];
    const dsBai = baiTrongBang(slideDu.content ?? {});
    if (dsBai.length < 2) continue;
    const span = catSlide(src, v.bai, v.slide);
    const le = span.le;
    const nhan = slideDu.content?.table?.label ?? slideDu.content?.label;
    const moi =
      dsBai
        .map((b2, i) =>
          JSON.stringify(slideCho(b2, nhan, i === 0), null, 2).replace(
            /^/gm,
            le,
          ),
        )
        .join(",\n") + (span.coPhay ? "," : "");
    doi.push({ ...span, moi, bai: v.bai, soBai: dsBai.length });
    if (CHI_BAI) xemTruocChiTiet = moi;
    soTach += 1;
    xemTruoc.push(
      `${v.bai} slide ${v.slide}: ${dsBai.length} bài → ${dsBai.length} slide · ` +
        dsBai.map((b2) => `${b2.a} ${b2.op} ${b2.b} = ${b2.kq}`).join(" · "),
    );
  }
  doi.sort((x, y) => y.start - x.start);
  for (const d of doi) src = src.slice(0, d.start) + d.moi + src.slice(d.end);
  if (GHI && doi.length) writeFileSync(file, src, "utf8");
}

console.log(`===== ${soTach} slide sẽ được tách =====`);
for (const x of xemTruoc) console.log("  · " + x);
if (CHI_BAI && xemTruocChiTiet) {
  console.log(`\n----- NỘI DUNG MỚI của ${CHI_BAI} -----`);
  console.log(xemTruocChiTiet);
}
if (!GHI) {
  console.log(
    "\n(chạy thử — CHƯA ghi file. Xem bản xem trước của một bài: --bai=g1-c8-l12 rồi chạy lại.)",
  );
} else {
  console.log(
    "\n✅ ĐÃ GHI. Chạy: node --check <file> · kiem-tra-slide · soat-o-trong · cổng 32.",
  );
}
