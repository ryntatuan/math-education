#!/usr/bin/env node
/**
 * SOI PHÉP TÍNH VIẾT SAI TRONG NỘI DUNG — cổng mới, sinh ra từ một lỗi THẬT phát hiện bằng mắt:
 * `g5-c11-l3` slide 4 viết “Ví dụ: 1 + 3 + 320 = 324.” trong khi bảng chỉ có 3, 5, 4
 * ⇒ bài đang DẠY TRẺ MỘT PHÉP TÍNH SAI.
 *
 * CÁCH SOI: tìm CHUỖI ĐẲNG THỨC (`vế = vế = vế…`, mỗi vế là dãy số và phép tính), tự tính lại và
 * đòi MỌI VẾ BẰNG NHAU.
 *
 * 🔴 ĐÃ MẤT BA BẢN MỚI RA ĐƯỢC BẢN NÀY — cả ba đều là “thước sai”, ghi lại để khỏi lặp:
 *   1. Ánh xạ thiếu dấu `×` ⇒ phép nhân bị tính thành phép chia ⇒ 239 “ca sai” GIẢ.
 *   2. Để `:` chung nhóm với `+ −` ⇒ “mượn 1: 10 − 7 = 3” bị cắt thành “1 : 10”.
 *   3. Khớp từng cụm rời `a + b = c` ⇒ cắt một KHÚC của biểu thức dài:
 *      “9 + 4 = 9 + 1 + 3 = 10 + 3 = 13” thành “9 + 4 = 9” (sai giả), “3 + 1 + 2 = 6” thành
 *      “1 + 2 = 6” (sai giả), và bắc cầu qua hai đẳng thức liền nhau “1+1=2  2+2=4”.
 *      ⇒ Nay so NGUYÊN CHUỖI ĐẲNG THỨC, và CHẶN HAI ĐẦU (không cho khớp khi ký tự sát trước/sau
 *      là chữ số hay dấu phép tính).
 *
 * MIỄN TRỪ: dòng có “không / sai / nhầm / lỗi / dư / còn / ?” (ví dụ CỐ Ý sai để dạy phân tích lỗi,
 * phép chia có dư) và **cả slide `quiz`** — phương án nhiễu của câu hỏi trắc nghiệm CỐ Ý sai
 * (đo được: 5/10 “ca nghi” cuối cùng đều nằm trong các phương án nhiễu của `g2-c8-l12`).
 *
 * Chạy: node scratch/soat-phep-tinh-sai.mjs   (0 = sạch · 1 = có ca nghi sai)
 */
const LOP = [1, 2, 3, 4, 5];

/** Dấu phép tính viết trong nội dung → phép tính. */
const PHEP = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};
const LA_NHAN = (d) => d === "×";
const LA_CHIA = (d) => d === "÷";

/**
 * Tính một VẾ (mảng xen kẽ [số, dấu, số, dấu, số…]) — CÓ THỨ TỰ PHÉP TÍNH:
 * `×` và `÷` trước, rồi mới `+` và `−`.
 */
function tinhVe(ve) {
  const t = [...ve];
  for (let i = 1; i < t.length - 1; ) {
    if (LA_NHAN(t[i]) || LA_CHIA(t[i])) {
      const v = PHEP[t[i]](t[i - 1], t[i + 1]);
      t.splice(i - 1, 3, v);
    } else i += 2;
  }
  let v = t[0];
  for (let i = 1; i < t.length; i += 2) v = PHEP[t[i]](v, t[i + 1]);
  return v;
}

/** “1 000” → 1000 (bỏ dấu cách nghìn). */
const so = (s) => Number(String(s).replace(/\s/g, ""));

/**
 * Tách một VẾ thành mảng [số, dấu, số…]. Trả `null` nếu vế không hợp lệ.
 */
function tachVe(text) {
  const manh = String(text)
    .trim()
    .split(/\s*([+\-×÷])\s*/)
    .filter((x) => x !== "");
  const ra = [];
  for (let i = 0; i < manh.length; i++) {
    if (i % 2 === 0) {
      const n = so(manh[i]);
      if (!Number.isFinite(n)) return null;
      ra.push(n);
    } else {
      if (!PHEP[manh[i]]) return null;
      ra.push(manh[i]);
    }
  }
  return ra.length >= 1 && ra.length % 2 === 1 ? ra : null;
}

const MIEN = /(không|sai|nhầm|lỗi|dư|còn|\?)/i;

function chu(value, out) {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (typeof value === "number") return;
  if (Array.isArray(value)) {
    for (const v of value) chu(v, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const v of Object.values(value)) chu(v, out);
  }
}

const nghi = [];
let soChuoi = 0;

/**
 * SỐ HẠNG: chữ số, cho phép dấu cách nghìn (nhóm 3 chữ số) và SỐ THẬP PHÂN dấu phẩy (“2,5”).
 * 🔴 Ba lần vá cần nhớ: `\d[\d\s]*` (gộp hai đẳng thức) · thiếu `,` (cắt “2,5 × 3 = 7,5” thành
 * “5 × 3 = 7”) · thiếu chặn `/` và `(` `)` (cắt “3 : 4 = 3/4” và chuỗi có ngoặc).
 */
const SO_HANG = String.raw`\d+(?:\s\d{3})*(?:,\d+)?`;
/**
 * VẾ: một hoặc nhiều số hạng — vế CUỐI của chuỗi đẳng thức thường chỉ là MỘT số
 * (“3 × 6 = 18”). 🔴 Đã mắc: bắt mọi vế phải có ≥ 2 số hạng ⇒ regex KHÔNG khớp được câu nào ra hồn
 * (chỉ 5 chuỗi trong cả 5 lớp) — may là tự kiểm bằng `scratch/thu-regex-dang-thuc.mjs` nên thấy ngay.
 */
const VE = String.raw`${SO_HANG}(?:\s*[+\-×÷]\s*${SO_HANG})*`;
/** Chuỗi đẳng thức: `vế = vế (= vế)…` — ít nhất hai vế. */
const CHUOI = new RegExp(`(${VE})(?:\\s*=\\s*(${VE}))+`, "g");
/** Ký tự không được đứng sát hai đầu (nếu có thì khớp là một KHÚC của biểu thức dài). */
const KHONG_SAT = /[\d+\-×÷=/(),]/;

for (const n of LOP) {
  const mod = await import(
    new URL(`../client/src/data/grade${n}Data.js`, import.meta.url)
  );
  const data = mod[`grade${n}Data`];
  for (const ch of data?.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, si) => {
        if (s.type === "quiz") return; // phương án nhiễu cố ý sai ⇒ không soi
        const ds = [];
        chu(s.content ?? {}, ds);
        for (const t of ds) {
          for (const dongGoc of String(t).split("\n")) {
            if (MIEN.test(dongGoc)) continue;
            // Dấu `:` chỉ là phép chia khi có DẤU CÁCH hai bên (“8 : 8”); “mượn 1:” thì không.
            const dong = dongGoc.replace(/\s+:\s+/g, " ÷ ").replace(/−/g, "-");
            for (const m of dong.matchAll(CHUOI)) {
              // Cả chuỗi phải có ÍT NHẤT MỘT phép tính (không thì chỉ là “3 = 3”).
              if (!/[+\-×÷]/.test(m[0])) continue;
              /**
               * VẾ TRÁI phải có phép tính: câu “1/3 của 12 = 12 : 3 = 4” có vế trái là MỘT SỐ
               * (12) đứng sau chữ “của” ⇒ không phải chuỗi đẳng thức (báo oan nếu nhận).
               */
              const veTrai = m[0].split(/\s*=\s*/)[0];
              if (!/[+\-×÷]/.test(veTrai)) continue;
              /**
               * 🔴 CHẶN “KHÚC ĐUÔI / KHÚC ĐẦU” — nhìn qua KHOẢNG TRẮNG hai bên mới đủ:
               *   “(12 + 8) × 5 : 2 = 20 × 5 : 2 = 50” → khớp “5 : 2 = 20 × 5 : 2 = 50” (thiếu đầu);
               *   “467 × 46 + 467 × 54 = 467 × (46 + 54) = …” → khớp tới “= 467” (thiếu đuôi).
               * Bản trước chỉ xét MỘT ký tự sát nên khoảng trắng làm luật vô hiệu.
               */
              const sauChuoi = dong
                .slice(m.index + m[0].length)
                .replace(/^\s+/, "")[0];
              const truocChuoi = dong
                .slice(0, m.index)
                .replace(/\s+$/, "")
                .slice(-1);
              const KHONG_SAT_RONG = /[+\-×÷=()]/;
              if (sauChuoi !== undefined && KHONG_SAT_RONG.test(sauChuoi))
                continue;
              if (truocChuoi !== undefined && KHONG_SAT_RONG.test(truocChuoi))
                continue;
              const truoc = dong[m.index - 1];
              const sau = dong[m.index + m[0].length];
              if (truoc !== undefined && KHONG_SAT.test(truoc)) continue;
              if (sau !== undefined && KHONG_SAT.test(sau)) continue;

              const ve = m[0].split(/\s*=\s*/);
              const daTach = ve.map(tachVe);
              if (daTach.some((v) => v === null)) continue;

              soChuoi++;
              const ket = daTach.map(tinhVe);
              const dau = ket[0];
              const lech = ket.some((k) => Math.abs(k - dau) > 1e-6);
              if (lech)
                nghi.push({
                  lop: n,
                  bai: bai.id,
                  slide: si + 1,
                  full: m[0].trim(),
                  ket: ket.join(" ≠ "),
                  dong: dongGoc.slice(0, 110),
                });
            }
          }
        }
      });
    }
  }
}

console.log(`Đã soi ${soChuoi} chuỗi đẳng thức trong 5 lớp.`);
console.log(`NGHI SAI: ${nghi.length} ca`);
for (const r of nghi) {
  console.log(
    `  · Lớp ${r.lop} ${r.bai} slide ${r.slide} · “${r.full}” — tính lại: ${r.ket}`,
  );
  console.log(`      ${r.dong}`);
}
process.exit(nghi.length ? 1 : 0);
