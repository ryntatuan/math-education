/**
 * SOÁT “SLIDE DỒN NHIỀU PHÉP TÍNH” — chạy: `node scratch/soat-slide-don-phep-tinh.mjs [lớp]`
 *
 * VÌ SAO CÓ FILE NÀY (người dùng báo 2026-09-26, kèm ảnh slide `g3-c7-l1`):
 *   *“các slide như này quá chung chung, không hướng dẫn cũng như chỉ cho bé thấy làm sao để ra
 *   kết quả; gộp nhiều phép tính vào 1 slide gây rối, tại sao không tách ra và giải thích từng
 *   bước cho trẻ hiểu?”*
 *
 * Slide bị báo có 2 dấu hiệu:
 *   • có **≥ 2 PHÉP TÍNH KHÁC NHAU đã ra kết quả** (trong `rule`/`text`/bảng…) — trẻ chỉ ĐỌC,
 *     không có gì để làm, không thấy cách làm;
 *   • **không có hình cho bé điền** (`cotTinh` / `bangTinh`) ⇒ không tương tác.
 *
 * Phân nhóm:
 *   [A] ≥ 2 phép tính đã ra kết quả + KHÔNG có hình điền  → nặng nhất (ảnh người dùng gửi).
 *   [B] ≥ 2 phép tính + CÓ hình điền                     → vẫn nên tách (bảng + hình một slide).
 *   [C] nhiều DÒNG BẢNG kết quả (mỗi dòng một phép tính)  → dạng “ôn tập” dồn bài.
 *
 * Cột `HD` = có chữ HƯỚNG DẪN cách làm không (nhớ · hạ · viết · từng hàng · từ trái sang phải ·
 * từ phải sang trái · bước · thử lại). Trẻ chỉ thấy đáp án mà không thấy cách ⇒ HD=0.
 *
 * Kết quả ghi ra `scratch/out-soat-don-phep-tinh.txt` (xem bằng `Get-Content … -Tail`).
 */
import { writeFileSync, readdirSync } from "node:fs";

const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

/** Chữ cho thấy slide CÓ chỉ cách làm (không chỉ đưa đáp án). */
const HD_RE =
  /nhớ|hạ|viết|từ phải sang trái|từ trái sang phải|từng hàng|bước|thử lại|lấy|trừ đi|đếm|nhân từng|chia từng|đặt tính|nhẩm|tách|gộp|đổi|quy đồng|giữ nguyên|quy tắc|cách|bảng nhân|bảng chia|nhận xét|ta có|gọi là|ví dụ|mẹo|bí quyết|liền trước|liền sau/i;

/** Bắt một phép tính ĐÃ RA KẾT QUẢ trong chuỗi: `26 × 3 = 78`.
 *  ⚠️ PHẢI bỏ các mạch bằng nhau kiểu SGK `9 + 4 = 9 + 1 + 3 = 10 + 3 = 13`:
 *  bản đầu tôi không bỏ ⇒ cắt vụn thành “9 + 4 = 9”, “1 + 3 = 10” ⇒ **báo oan** hàng loạt
 *  slide đang DẠY RẤT TỐT (đúng cách làm từng bước). Luật: sau kết quả KHÔNG được là
 *  dấu phép tính hay dấu “=” (nghĩa là còn phần biểu thức nữa).
 *  Dùng lookahead, và nhóm `khongCham` không cho số dính liền dấu phẩy câu. */
const PT_RE =
  /(?<![\d.,])(\d{1,3}(?:[\u00a0 ]\d{3})*(?:[.,]\d+)?)\s*([+\-−–×x*:÷])\s*(\d{1,3}(?:[\u00a0 ]\d{3})*(?:[.,]\d+)?)\s*=\s*(\d{1,3}(?:[\u00a0 ]\d{3})*(?:[.,]\d+)?)(?![\d.,])(?!\s*[+\-−–×x*:÷=])/g;

/** Chuẩn hoá số: bỏ dấu cách (phân tách nghìn), đổi phẩy thành chấm. */
const so = (s) => {
  if (s === undefined || s === null) return NaN;
  let t = String(s)
    .replace(/[\u00a0 ]/g, "")
    .trim();
  if (/,\d+$/.test(t) || (t.includes(",") && !t.includes("."))) {
    t = t.replace(/\./g, "").replace(",", ".");
  } else {
    t = t.replace(/,/g, "");
  }
  return Number(t);
};
const dau = (op) =>
  op === "-" || op === "−" || op === "–"
    ? "−"
    : op === "x" || op === "*" || op === "×"
      ? "×"
      : op === ":" || op === "÷"
        ? ":"
        : "+";

/** Gom các chuỗi chữ của slide (bỏ `options` — lựa chọn trả lời không phải “bài dồn”).
 *  ⚠️ KHÔNG gom `mascotHint`: gợi ý của Cú Mèo CHÍNH LÀ phần chỉ cách làm (từng bước),
 *  gom vào thì mọi câu hỏi đều bị báo oan. Đó là bài học lần đầu tôi làm file này (457 ca giả). */
const chuCuaSlide = (c) => {
  const out = [];
  const them = (v) => {
    if (typeof v === "string" && v.trim()) out.push(v);
  };
  them(c.text);
  them(c.rule);
  them(c.explanation);
  them(c.formula);
  them(c.label);
  them(c.title);
  them(c.badge);
  them(c.question);
  them(c.note);
  them(c.remember);
  for (const k of ["points", "bullets", "steps", "notes", "keywords"])
    if (Array.isArray(c[k])) c[k].forEach(them);
  if (c.table && typeof c.table === "object") {
    them(c.table.title);
    them(c.table.label);
    if (Array.isArray(c.table.headers)) c.table.headers.forEach(them);
    if (Array.isArray(c.table.rows))
      for (const r of c.table.rows)
        if (Array.isArray(r)) r.forEach((x) => them(x === null ? "" : x));
  }
  if (c.placeValue && typeof c.placeValue === "object") {
    them(c.placeValue.label);
    if (Array.isArray(c.placeValue.headers)) c.placeValue.headers.forEach(them);
  }
  return out;
};

/** Chuỗi có chữ chỉ cách làm (kể cả lời gợi ý của Cú Mèo). */
const chuHuongDan = (c) => {
  const out = [];
  if (typeof c.mascotHint === "string") out.push(c.mascotHint);
  return out.concat(chuCuaSlide(c));
};

/** “Họ” = một MẠCH phép tính dính nhau (dùng chung một số). */
const hoPhepTinh = (a, op, b) => `${a}|${op}|${b}`;

/** Đếm số MẠCH RỜI RẠC: hai phép tính CÙNG MẠCH nếu chúng dùng chung một con số.
 *  Nhờ vậy “46 − 3 = 43; 43 − 6 = 37” là MỘT mạch (một bài giải từng bước), còn
 *  “26 × 3 … 216 × 3 … 639 : 3 … 48 : 4” là BỐN mạch (bốn bài khác nhau dồn một slide). */
const demMach = (ds) => {
  const cha = ds.map((_, i) => i);
  const tim = (i) => (cha[i] === i ? i : (cha[i] = tim(cha[i])));
  const hop = (i, j) => {
    const x = tim(i);
    const y = tim(j);
    if (x !== y) cha[y] = x;
  };
  const soCua = ds.map((x) =>
    [x.a, x.b, x.kq].filter((v) => Number.isFinite(v)),
  );
  for (let i = 0; i < ds.length; i++)
    for (let j = i + 1; j < ds.length; j++) {
      // “2 × 1 = 2”: kết quả trùng một thừa số — vẫn cùng mạch (bảng cửu chương)
      const chung = soCua[i].some((v) => soCua[j].includes(v));
      const cungOp = ds[i].op === ds[j].op && ds[i].a === ds[j].a;
      if (chung || cungOp) hop(i, j);
    }
  return new Set(ds.map((_, i) => tim(i))).size;
};

const chiLop = process.argv[2] ? Number(process.argv[2]) : null;
const lopCan = chiLop ? [chiLop] : [1, 2, 3, 4, 5];

const theoLop = {};
const hang = [];

for (const [file, key, lop] of NGUON) {
  if (!lopCan.includes(lop)) continue;
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const du = mod[key];
  theoLop[lop] = theoLop[lop] ?? { A: 0, B: 0, C: 0, D: 0, bai: new Set() };

  for (const ch of du.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        const c = s.content ?? {};
        const chu = chuCuaSlide(c);
        const danhSach = []; // các phép tính đã ra kết quả (đủ số + dấu)
        for (const t of chu) {
          PT_RE.lastIndex = 0;
          let m;
          while ((m = PT_RE.exec(t)) !== null) {
            const a = so(m[1]);
            const b = so(m[3]);
            const kq = so(m[4]);
            if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
            const k = hoPhepTinh(a, dau(m[2]), b);
            if (danhSach.some((x) => x.k === k)) continue;
            danhSach.push({ k, a, op: dau(m[2]), b, kq, nguon: "chu" });
          }
        }
        // bảng “phép tính | kết quả”: ô đầu là phép tính CHƯA có “=”, ô sau là đáp án
        let dongBang = 0;
        if (Array.isArray(c.table?.rows)) {
          for (const r of c.table.rows) {
            if (!Array.isArray(r) || r.length < 2) continue;
            const a0 = String(r[0] ?? "");
            const a1 = String(r[1] ?? "");
            if (a0.includes("=")) continue;
            const m =
              /^(\d{1,3}(?:[\u00a0 ]\d{3})*(?:[.,]\d+)?)\s*([+\-−–×x*:÷])\s*(\d{1,3}(?:[\u00a0 ]\d{3})*(?:[.,]\d+)?)$/.exec(
                a0.trim(),
              );
            if (m && /^\s*\d[\d\u00a0 .,]*\s*$/.test(a1)) {
              dongBang += 1;
              const k = hoPhepTinh(so(m[1]), dau(m[2]), so(m[3]));
              if (!danhSach.some((x) => x.k === k))
                danhSach.push({
                  k,
                  a: so(m[1]),
                  op: dau(m[2]),
                  b: so(m[3]),
                  kq: so(a1),
                  nguon: "bang",
                });
            }
          }
        }
        const soMach = demMach(danhSach);
        const coDien = !!(c.cotTinh || c.bangTinh);
        const coHD = chuHuongDan(c).some((t) => HD_RE.test(t));
        /**
         * ĐÁNG SỬA khi slide là một LOẠT BÀI RỜI NHAU:
         *   • BẢNG kết quả ≥2 dòng VÀ ≥2 mạch rời (mỗi dòng một bài khác nhau), hoặc
         *   • ≥3 mạch rời — kể cả khi slide có “hộp quy tắc”: hộp quy tắc liệt kê 4 đáp án
         *     `26 × 3 = 78; 216 × 3 = 648…` cũng là DỒN BÀI, không phải quy tắc.
         * Slide có 2 ví dụ minh hoạ một quy tắc, hay một mạch giải từng bước ⇒ KHÔNG báo.
         */
        const dangSua = (dongBang >= 2 && soMach >= 2) || soMach >= 3;
        if (!dangSua || coDien) return;
        let nhom;
        if (dongBang >= 2) nhom = "C";
        else if (!coHD) nhom = "A";
        else nhom = "D"; // hộp quy tắc / có lời giảng nhưng vẫn kê một loạt đáp án
        const cachSua = "TACH";
        theoLop[lop][nhom] = (theoLop[lop][nhom] ?? 0) + 1;
        theoLop[lop][cachSua] = (theoLop[lop][cachSua] ?? 0) + 1;
        theoLop[lop].bai.add(bai.id);
        hang.push({
          lop,
          file,
          bai: bai.id,
          slide: i + 1,
          type: s.type,
          nhom,
          cachSua,
          HD: coHD ? 1 : 0,
          soPhep: danhSach.length,
          soMach,
          chiTiet: danhSach
            .map(
              (x) =>
                `${x.a} ${x.op} ${x.b} = ${x.kq}${x.nguon === "bang" ? " (bảng)" : ""}`,
            )
            .join(" · "),
        });
      });
    }
  }
}

const dong = [];
dong.push(
  "=== SLIDE DỒN NHIỀU PHÉP TÍNH (≥2 phép tính KHÁC HỌ đã ra kết quả) ===",
);
dong.push(
  "[A] chỉ toàn đáp án, KHÔNG chỉ cách làm · [B] có hình cho bé điền · [C] bảng kết quả nhiều dòng · [D] còn lại (có chỉ cách nhưng vẫn dồn)",
);
dong.push("");
for (const lop of lopCan) {
  const t = theoLop[lop] ?? { A: 0, B: 0, C: 0, D: 0, bai: new Set() };
  dong.push(
    `Lớp ${lop}: A=${t.A ?? 0} · B=${t.B ?? 0} · C=${t.C ?? 0} · D=${t.D ?? 0} · tổng slide=${hang.filter((h) => h.lop === lop).length} · số bài dính=${t.bai.size}`,
  );
}
dong.push(`TỔNG slide: ${hang.length}`);
dong.push(
  `CÁCH SỬA: TACH=${hang.length} (mỗi bài một slide, kèm chỉ cách làm từng bước + hình cho bé điền)`,
);
dong.push("");
for (const h of hang) {
  dong.push(
    `[${h.nhom}]${h.HD ? "" : " HD=0"} L${h.lop} ${h.bai} slide ${h.slide} (${h.type}) — ${h.soPhep} phép / ${h.soMach} mạch: ${h.chiTiet}`,
  );
}
writeFileSync(
  "scratch/out-soat-don-phep-tinh.txt",
  dong.join("\n") + "\n",
  "utf8",
);
console.log(dong.slice(0, 9).join("\n"));
console.log(
  `\n(chi tiết: scratch/out-soat-don-phep-tinh.txt — ${hang.length} slide)`,
);
