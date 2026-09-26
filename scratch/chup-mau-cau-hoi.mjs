// CHỤP MẪU CÂU HỎI — thước so TRƯỚC/SAU khi tách `exerciseGenerator.js` (đợt 3.3).
//
//   node scratch/chup-mau-cau-hoi.mjs --ghi scratch/mau-truoc.json     # chụp trước khi tách
//   node scratch/chup-mau-cau-hoi.mjs --so  scratch/mau-truoc.json     # chụp lại rồi SO (mong đợi 0 khác)
//
// VÌ SAO CẦN: tách file là việc **di chuyển mã**, nhưng bộ sinh có `Math.random()` nên chỉ so
// bằng mắt là vô nghĩa. Ở đây `Math.random` được THAY bằng bộ sinh giả có hạt cố định ⇒ cùng
// đầu vào cho ra CÙNG dãy câu hỏi, nên so từng câu được.
//
// Mẫu gồm 3 đường mã thật của app:
//   · mỗi topic của từng lớp (đường PracticePage chọn chủ đề)
//   · mỗi chủ đề "tự làm" trong PRACTICE_EXTRA_TOPICS (thẻ chấm, mê cung)
//   · generateQuestion(grade) KHÔNG truyền topic (đường ChallengePage + 6 mini game)
//   · generateCalculation(grade) (game tính nhẩm)
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const SO_MAU = 25;

// ── Bộ sinh giả có hạt cố định: cùng hạt ⇒ cùng dãy số ⇒ so sánh được ────────
let hat = 987654321;
Math.random = () => {
  hat = (hat * 1664525 + 1013904223) >>> 0;
  return hat / 4294967296;
};

const mod = await import("../client/src/utils/exerciseGenerator.js");
const { TOPICS, PRACTICE_EXTRA_TOPICS, generateQuestion, generateCalculation } =
  mod;

const goi = (fn) => {
  try {
    return { kq: JSON.parse(JSON.stringify(fn() ?? null)) };
  } catch (e) {
    return { loi: String(e && e.message ? e.message : e) };
  }
};

const kho = [];
const them = (nhan, fn) => {
  const r = goi(fn);
  kho.push({ nhan, ...r });
};

// 1) Từng topic của từng lớp
const soLopTopic = {};
for (const [khoa, arr] of Object.entries(TOPICS)) {
  if (!Array.isArray(arr)) continue;
  const lop = Number(khoa.replace(/\D/g, ""));
  soLopTopic[khoa] = arr.length;
  for (const t of arr) {
    for (let i = 0; i < SO_MAU; i++)
      them(`${khoa}|${t.id}|${i}`, () => generateQuestion(lop, t.id));
  }
}

// 2) Chủ đề "tự làm" của trang Luyện tập
const soExtra = {};
for (const [khoa, arr] of Object.entries(PRACTICE_EXTRA_TOPICS)) {
  if (!Array.isArray(arr)) continue;
  soExtra[khoa] = arr.length;
  const lop = Number(khoa.replace(/\D/g, "")) || 1;
  for (const t of arr) {
    for (let i = 0; i < SO_MAU; i++)
      them(`EXTRA|${t.id}|${i}`, () => generateQuestion(lop, t.id));
  }
}

// 3) Đường KHÔNG truyền topic
for (let lop = 1; lop <= 5; lop++) {
  for (let i = 0; i < 60; i++)
    them(`NGRADE${lop}|${i}`, () => generateQuestion(lop));
  for (let i = 0; i < 60; i++)
    them(`CALC${lop}|${i}`, () => generateCalculation(lop));
}

const args = process.argv.slice(2);
const iGhi = args.indexOf("--ghi");
const iSo = args.indexOf("--so");

if (iGhi >= 0) {
  const f = args[iGhi + 1];
  writeFileSync(f, JSON.stringify(kho), "utf8");
  console.log(`Đã ghi ${kho.length} mẫu → ${f}`);
  console.log(`  topic theo lớp: ${JSON.stringify(soLopTopic)}`);
  console.log(`  chủ đề tự làm : ${JSON.stringify(soExtra)}`);
  process.exit(0);
}

if (iSo >= 0) {
  const f = args[iSo + 1];
  if (!existsSync(f)) {
    console.error(`✗ Không thấy mẫu gốc ${f}`);
    process.exit(2);
  }
  const truoc = JSON.parse(readFileSync(f, "utf8"));
  if (truoc.length !== kho.length) {
    console.error(`✗ SỐ MẪU KHÁC: trước ${truoc.length} · sau ${kho.length}`);
    process.exit(1);
  }
  const khac = [];
  for (let i = 0; i < kho.length; i++) {
    const a = JSON.stringify(truoc[i]),
      b = JSON.stringify(kho[i]);
    if (a !== b)
      khac.push({
        nhan: kho[i].nhan,
        truoc: a.slice(0, 150),
        sau: b.slice(0, 150),
      });
  }
  console.log(`So ${kho.length} mẫu: ${khac.length} khác`);
  for (const k of khac.slice(0, 10)) {
    console.log(
      `  ✗ ${k.nhan}\n      trước: ${k.truoc}\n      sau  : ${k.sau}`,
    );
  }
  process.exit(khac.length ? 1 : 0);
}

console.log("Chưa chọn việc: dùng --ghi <file> hoặc --so <file>");
console.log(`Mẫu sẽ chụp: ${kho.length}`);
