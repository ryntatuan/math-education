// PHÉP THỬ HÌNH THẬT — render CHÍNH dữ liệu trong 5 file gradeNData.js.
//
// 🔴 VÌ SAO CẦN, khác gì `test-visuals-entry.jsx`:
//   `test-visuals-entry.jsx` thử bộ vẽ với dữ liệu TÔI TỰ VIẾT. Nó trả lời được
//   "bộ vẽ có chịu được dữ liệu không" — nhưng KHÔNG trả lời được "dữ liệu tôi vừa
//   tiêm vào 459 bài có đúng không". Một khoá gõ sai tên (`numberline` thay vì
//   `numberLine`) thì `test-visuals-entry` vẫn XANH, mà slide thì KHÔNG CÓ HÌNH:
//   `VisualBlocks` chỉ bỏ qua khoá nó không biết, không báo gì. Đúng loại hỏng ÂM
//   THẦM mà dự án này đã gặp nhiều lần.
//
//   Phép thử này đi thẳng vào dữ liệu thật: với MỖI slide, với MỖI khoá hình, render
//   riêng khoá đó rồi bắt lỗi. Nhờ vậy báo được đúng `bài nào · khoá nào`.
//
// CÁCH DÙNG: node scratch/visual-bundle-that.cjs
import { renderToStaticMarkup } from "react-dom/server";
import VisualBlocks from "../client/src/components/visuals/VisualBlock.jsx";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const GRADES = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];

// Khoá mà bộ vẽ CŨ của `LessonPage.jsx` xử lý — không thuộc phép thử này, NHƯNG vẫn
// phải đếm vào "bài có hình": app VẼ chúng thật (`ClockGraphic`, `ShapeGraphic`, khối
// `operation`/`comparison`/`gallery`…). Không đếm thì báo cáo sẽ nói "bài này không có
// hình" trong khi bé vẫn thấy hình — sai lệch kiểu đó làm người đọc mất tin vào số đo.
const KEYS_CU = [
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
];

// Khoá không phải hình — chỉ để lọc khi tìm "khoá lạ".
const KHONG_PHAI_HINH = new Set([
  "shapeLabel",
  "galleryTitle",
  "items",
  "number",
  "text",
  "title",
  "badge",
  "explanation",
  "points",
  "rule",
  "steps",
  "mascotMood",
  "mascotHint",
  "question",
  "options",
  "answer",
  "correctAnswer",
  "dialogueList",
  "focusGraphic",
  "example",
]);

let dat = 0;
let hong = 0;
let slideCoHinh = 0;
let baiCoHinh = 0;
let tongBai = 0;
let slideRong = 0;
const hongList = [];
const demTheoKhoa = {};
const khoaLaDem = new Map(); // khoá lạ nghi là hình
const baiThieu = [];

for (const g of GRADES) {
  for (const ch of g.chapters ?? []) {
    for (const l of ch.lessons ?? []) {
      tongBai++;
      let baiNayCoHinh = false;

      for (const s of l.slides ?? []) {
        const c = s.content ?? {};

        // Khoá CÓ trong content mà `VisualBlocks` KHÔNG biết và cũng không phải khoá cũ
        // ⇒ nghi gõ sai tên khoá hình.
        for (const k of Object.keys(c)) {
          if (HINH_KEYS.includes(k)) continue;
          if (KEYS_CU.includes(k)) continue;
          if (KHONG_PHAI_HINH.has(k)) continue;
          khoaLaDem.set(k, (khoaLaDem.get(k) ?? 0) + 1);
        }

        // Đếm cả hai hệ — đây mới là con số "bài có hình" đúng như bé thấy.
        const coHinhBatKy = [...HINH_KEYS, ...KEYS_CU].some(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        if (coHinhBatKy) baiNayCoHinh = true;

        const coMat = HINH_KEYS.filter(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        if (!coMat.length) continue;

        slideCoHinh++;

        // Render RIÊNG từng khoá để biết chính xác khoá nào hỏng.
        for (const k of coMat) {
          const nhan = `${l.id} · slide ${s.type} · ${k}`;
          try {
            const html = renderToStaticMarkup(
              <VisualBlocks content={{ [k]: c[k] }} />,
            );
            demTheoKhoa[k] = (demTheoKhoa[k] ?? 0) + 1;
            if (!html || html.length < 40) {
              hong++;
              slideRong++;
              hongList.push(`${nhan}: render ra RỖNG (${html.length} ký tự)`);
            } else {
              dat++;
            }
          } catch (e) {
            hong++;
            hongList.push(`${nhan}: NÉM LỖI — ${e.message}`);
          }
        }

        // Render CẢ slide một lượt — bắt lỗi chỉ xuất hiện khi nhiều hình đứng cạnh nhau.
        try {
          const html = renderToStaticMarkup(<VisualBlocks content={c} />);
          if (!html || html.length < 40) {
            hong++;
            hongList.push(
              `${l.id} · slide ${s.type} · CẢ slide: render ra RỖNG`,
            );
          }
        } catch (e) {
          hong++;
          hongList.push(
            `${l.id} · slide ${s.type} · CẢ slide: NÉM LỖI — ${e.message}`,
          );
        }
      }

      if (baiNayCoHinh) baiCoHinh++;
      else baiThieu.push(`${l.id} | ${l.title}`);
    }
  }
}

console.log("═".repeat(74));
console.log(`  PHÉP THỬ HÌNH THẬT: ${dat} đạt · ${hong} hỏng`);
console.log("═".repeat(74));
console.log(
  `  ${baiCoHinh}/${tongBai} bài có ít nhất một hình · ${slideCoHinh} slide mang hình`,
);
console.log("");

if (hongList.length) {
  console.log(`DANH SÁCH HỎNG (${hongList.length}):`);
  for (const h of hongList.slice(0, 40)) console.log(`  ✗ ${h}`);
  if (hongList.length > 40)
    console.log(`  … và ${hongList.length - 40} chỗ nữa`);
  console.log("");
}

console.log("Số lần dùng từng bộ vẽ (trong dữ liệu THẬT):");
const ds = Object.entries(demTheoKhoa).sort((a, b) => b[1] - a[1]);
if (!ds.length) console.log("  (chưa bài nào dùng hình)");
for (const [k, n] of ds) console.log(`  ${k.padEnd(16)} ${n}`);
console.log("");

if (khoaLaDem.size) {
  console.log("⚠️  KHOÁ LẠ trong `content` (không phải khoá hình đã biết):");
  const la = [...khoaLaDem.entries()].sort((a, b) => b[1] - a[1]);
  for (const [k, n] of la) console.log(`  ${k.padEnd(20)} ${n}`);
  console.log(
    "  → Nếu khoá nào trong đây ĐÁNG LẼ là hình thì đó là gõ sai tên khoá: hình sẽ KHÔNG hiện.",
  );
  console.log("");
}

console.log(`Bài CHƯA có hình nào: ${baiThieu.length}`);
for (const b of baiThieu.slice(0, 30)) console.log(`  · ${b}`);
if (baiThieu.length > 30) console.log(`  … và ${baiThieu.length - 30} bài nữa`);

if (hong) process.exit(1);
