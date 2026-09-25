/**
 * SOÁT NHÓM E — “chữ gọi tên mà hình không ghi” (quy trình §11, nhóm E).
 *
 * Vì sao có file này: kế hoạch §10 ghi rõ bẫy đã xảy ra THẬT — Lớp 2 có **11 chỗ** hình gọi
 * tên điểm (A, B, C, D, M, O) mà trên hình không ghi tên, người dùng từng báo nguyên văn:
 * “mô tả hình chữ nhật có cạnh AB và BC và 4 đỉnh A, B, C, D nhưng lại không ghi chú A, B, C, D
 * lên trên hình thì làm sao trẻ hiểu được?”.
 *
 * Cách soi: tìm mọi TÊN ĐIỂM được nhắc trong chữ của slide (điểm A, đỉnh B, cạnh AB, đoạn thẳng
 * MN, tam giác ABC, trung điểm M, hình chữ nhật ABCD…) rồi kiểm xem **có chỗ nào trong hình của
 * chính slide đó in ra những chữ cái ấy** hay không (vertexLabels, labels, names, text của bộ vẽ).
 *
 * Chạy: `node scratch/soat-ten-diem.mjs`   (thoát 0 = sạch, 1 = có ca nghi ngờ)
 */
import fs from "node:fs";

const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

/** Bộ vẽ nào in được chữ cái tên điểm, và in từ khoá nào. */
const KHOA_CO_TEN = [
  "vertexLabels",
  "vertexLabel",
  "labels",
  "points",
  "names",
  "name",
  "diem",
  "dinh",
  "text",
  "label",
  "title",
  "note",
  "caption",
  "formula",
  "sub",
];

const goTen = (s) => String(s ?? "");

/** Lấy mọi chuỗi trong một object (đệ quy) — để tìm chữ cái nào đó có được IN RA không. */
function moiChuoi(v, out = []) {
  if (v == null) return out;
  if (typeof v === "string") {
    out.push(v);
    return out;
  }
  if (Array.isArray(v)) {
    v.forEach((x) => moiChuoi(x, out));
    return out;
  }
  if (typeof v === "object") {
    Object.entries(v).forEach(([k, x]) => {
      if (k === "options" || k === "points") {
        // `points` của concept là gạch đầu dòng CHỮ, không phải hình — nhưng vẫn nên xét
        moiChuoi(x, out);
        return;
      }
      moiChuoi(x, out);
    });
  }
  return out;
}

/**
 * ⚠️ MẪU PHẢI BÁM SÁT TỪ KHOÁ: chữ cái tên điểm đứng NGAY SAU “điểm/đỉnh/cạnh/đoạn thẳng/…”.
 * Lần đầu tôi viết `(?:điểm|hình…)\s*([A-Z])` ⇒ bắt oan **14 ca** vì “Hình tam giác” cho ra
 * chữ H, “Hình chữ nhật” cho ra D, N, G, K, H… (đều là chữ ĐẦU của từ tiếng Việt).
 * Nay: sau từ khoá phải là **một cụm chữ cái in hoa đứng riêng** (`AB`, `ABCD`) hoặc **danh sách
 * ngăn bằng dấu phẩy** (`A, B, C, D`); `\b` chặn trường hợp “Hình” (H + chữ thường).
 */
const MAU = [
  /(?:đoạn thẳng|trung điểm|cạnh|đỉnh|điểm|tam giác|tứ giác|góc|hình thang|hình bình hành|hình thoi)\s*\(?\s*([A-Z]{2,4}|[A-Z](?:\s*,\s*[A-Z])+)\b/g,
  /\b([A-Z]{2,4})\s*(?:dài|bằng|có|gồm|tạo|và)\b/g, // “AB dài 4 m”, “ABCD gồm…”
];

const nghi = [];
let soSlideCoTen = 0;

for (const [file, key, lop] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  for (const ch of g.chapters ?? [])
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        // Slide TỔNG KẾT vốn chỉ có chữ (không bao giờ có hình) ⇒ bỏ qua, không báo oan.
        if (s.type === "summary") return;
        const c = s.content ?? {};
        // Chỉ lấy chữ NGƯỜI HỌC ĐỌC: lời dẫn, câu hỏi, tiêu đề, quy tắc, gạch đầu dòng
        const chuNguoi = [
          c.text,
          c.question,
          c.title,
          c.rule,
          c.explanation,
          c.mascotHint,
          ...(Array.isArray(c.points) ? c.points : []),
        ]
          .map(goTen)
          .join(" \n ");

        const ten = new Set();
        for (const re of MAU) {
          re.lastIndex = 0;
          for (const m of chuNguoi.matchAll(re)) {
            m[1]
              .split(/\s*,\s*|\s+/)
              .filter((t) => /^[A-Z]{1,4}$/.test(t))
              .forEach((t) => {
                if (t.length > 1) [...t].forEach((ch) => ten.add(ch));
                else ten.add(t);
              });
          }
        }
        if (ten.size === 0) return;
        soSlideCoTen++;

        // Chữ do HÌNH in ra: mọi chuỗi trong content TRỪ chính những trường chữ ở trên
        const chuHinh = [];
        for (const [k, v] of Object.entries(c)) {
          if (
            [
              "text",
              "question",
              "title",
              "rule",
              "explanation",
              "mascotHint",
              "points",
              "options",
              "answer",
            ].includes(k)
          )
            continue;
          moiChuoi(v, chuHinh);
        }
        const chuHinhGop = chuHinh.join(" ");
        const thieu = [...ten].filter(
          (t) => !new RegExp(`\\b${t}\\b`).test(chuHinhGop),
        );
        if (thieu.length)
          nghi.push(
            `L${lop} ${bai.id} #${i} [${s.type}] thiếu tên trên hình: ${thieu.join(",")} :: ${chuNguoi.replace(/\s+/g, " ").slice(0, 80)}`,
          );
      });
    }
}

console.log(
  `${soSlideCoTen} slide có nhắc tên điểm · ${nghi.length} ca NGHI thiếu tên trên hình:`,
);
for (const x of nghi) console.log("  " + x);
process.exit(nghi.length ? 1 : 0);
