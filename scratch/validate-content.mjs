// Kiểm một file dữ liệu lớp trước khi đưa vào app.
//
//   node scratch/validate-content.mjs scratch/grade2Data.new.js grade2Data
//
// Kiểm: khoá bắt buộc của từng kiểu slide · đáp án phải nằm trong lựa chọn và đúng kiểu ·
// id bài không trùng · id chương không trùng · số bài thật khớp `totalLessons`.

import { pathToFileURL } from "node:url";
import path from "node:path";

const [, , fileArg, exportName] = process.argv;
if (!fileArg || !exportName) {
  console.error("Dùng: node scratch/validate-content.mjs <file> <tên-export>");
  process.exit(2);
}

const mod = await import(pathToFileURL(path.resolve(fileArg)).href);
const data = mod[exportName];
if (!data) {
  console.error(`Không thấy export "${exportName}" trong ${fileArg}`);
  process.exit(2);
}

// Khoá BẮT BUỘC — chép từ admin/src/lib/contentSchema.js (đo trên dữ liệu thật).
const BAT_BUOC = {
  story: { mascotMood: "string", text: "string" },
  summary: { title: "string", points: "array" },
  visual: { text: "string" },
  concept: { badge: "string", title: "string" },
  quiz: {
    question: "string",
    options: "array",
    answer: "any",
    mascotHint: "string",
  },
};

const KIEM = {
  string: (v) => typeof v === "string",
  array: (v) => Array.isArray(v),
  any: () => true,
};

const loi = [];
const canhBao = [];
const thieuSlide = [];
const demSlide = {};
let soBai = 0;
let soSlide = 0;
const idBai = new Map();
const idChuong = new Map();

for (const ch of data.chapters) {
  if (idChuong.has(ch.id)) loi.push(`id chương trùng: ${ch.id}`);
  idChuong.set(ch.id, ch.name);

  const soThat = ch.lessons.length;
  if (ch.totalLessons !== 0 && ch.totalLessons !== soThat) {
    canhBao.push(
      `${ch.id}: totalLessons=${ch.totalLessons} nhưng có ${soThat} bài`,
    );
  }

  for (const bai of ch.lessons) {
    soBai++;
    if (idBai.has(bai.id)) loi.push(`id bài trùng: ${bai.id}`);
    idBai.set(bai.id, bai.title);

    if (!bai.id.startsWith(ch.id + "-")) {
      loi.push(`${bai.id}: id không khớp chương ${ch.id}`);
    }
    for (const khoa of ["id", "title", "type", "description", "slides"]) {
      if (!(khoa in bai)) loi.push(`${bai.id}: thiếu khoá "${khoa}"`);
    }
    if (!Array.isArray(bai.slides) || bai.slides.length === 0) {
      loi.push(`${bai.id}: không có slide nào`);
      continue;
    }

    const kinds = new Set(bai.slides.map((s) => s.type));
    for (const can of ["story", "concept", "quiz", "summary"]) {
      if (!kinds.has(can)) thieuSlide.push(`${bai.id} thiếu slide "${can}"`);
    }

    bai.slides.forEach((slide, i) => {
      const vi = `${bai.id} slide ${i + 1} (${slide.type})`;
      soSlide++;
      demSlide[slide.type] = (demSlide[slide.type] ?? 0) + 1;

      const yeuCau = BAT_BUOC[slide.type];
      if (!yeuCau) {
        loi.push(`${vi}: kiểu slide không có trong danh sách đóng`);
        return;
      }
      if (!slide.content || typeof slide.content !== "object") {
        loi.push(`${vi}: thiếu content`);
        return;
      }
      for (const [khoa, kieu] of Object.entries(yeuCau)) {
        if (!(khoa in slide.content)) {
          loi.push(`${vi}: thiếu "${khoa}"`);
        } else if (!KIEM[kieu](slide.content[khoa])) {
          loi.push(`${vi}: "${khoa}" sai kiểu (phải là ${kieu})`);
        }
      }

      if (slide.type === "quiz") {
        const { options, answer } = slide.content;
        if (Array.isArray(options)) {
          if (!options.some((o) => o === answer)) {
            loi.push(
              `${vi}: đáp án ${JSON.stringify(answer)} không nằm trong lựa chọn`,
            );
          }
          if (
            new Set(options.map((o) => JSON.stringify(o))).size !==
            options.length
          ) {
            loi.push(`${vi}: có lựa chọn bị lặp`);
          }
          if (options.length < 2) loi.push(`${vi}: cần ít nhất 2 lựa chọn`);
        }
      }
    });
  }
}

console.log(
  `Lớp : ${data.name} — ${data.chapters.length} chương · ${soBai} bài · ${soSlide} slide`,
);
console.log(`Slide theo kiểu: ${JSON.stringify(demSlide)}`);
console.log(
  `Số chương có bài: ${data.chapters.filter((c) => c.lessons.length).length}/${data.chapters.length}`,
);
console.log(
  `Số chương còn trống: ${
    data.chapters
      .filter((c) => !c.lessons.length)
      .map((c) => c.id)
      .join(", ") || "không"
  }`,
);
if (canhBao.length) {
  console.log(`\nCẢNH BÁO (${canhBao.length}):`);
  for (const c of canhBao) console.log("  - " + c);
}
if (thieuSlide.length) {
  console.log(`\nBÀI THIẾU SLIDE CHUẨN (${thieuSlide.length}):`);
  for (const t of thieuSlide) console.log("  - " + t);
}
if (loi.length) {
  console.log(`\nLỖI (${loi.length}):`);
  for (const l of loi.slice(0, 40)) console.log("  - " + l);
  if (loi.length > 40) console.log(`  ... và ${loi.length - 40} lỗi nữa`);
  process.exit(1);
}
console.log("\nKHÔNG CÓ LỖI CẤU TRÚC.");
