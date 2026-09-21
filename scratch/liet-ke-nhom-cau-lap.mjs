// Gom các bài có CÙNG một "chữ ký" câu lặp — để biết bài nào đang dùng khối câu nào.
//
// VÌ SAO: Lớp 2 không dùng một khối câu chung cho cả lớp như Lớp 3, mà mỗi CHƯƠNG (hoặc
// mỗi nhóm chủ đề) có một khối câu riêng bị lặp ở mọi bài trong nhóm. Muốn viết lại thì
// phải biết chính xác: bài nào → khối câu nào → chủ đề gì.
//
// DÙNG: node scratch/liet-ke-nhom-cau-lap.mjs client/src/data/grade2Data.js

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const NGUONG = 5; // câu xuất hiện ở từ 5 bài trở lên thì coi là văn bản sinh hàng loạt
const DAI = 25;

const file = process.argv[2];
if (!file) {
  console.error(
    "Thiếu tham số. Ví dụ: node scratch/liet-ke-nhom-cau-lap.mjs client/src/data/grade2Data.js",
  );
  process.exit(2);
}

const ten = path.basename(file, ".js");
// ⚠️ Trên Windows, import() KHÔNG nhận đường dẫn tuyệt đối kiểu `D:\...`
// (ERR_UNSUPPORTED_ESM_URL_SCHEME) — phải đổi sang URL dạng `file://`.
const mod = await import(pathToFileURL(path.resolve(file)).href);
const goc = mod[ten];

// Chuyển cây thành danh sách phẳng các bài.
const bai = [];
for (const chuong of goc.chapters)
  for (const b of chuong.lessons) bai.push({ chuong: chuong.id, ...b });

const chuoiTrong = (obj, ra = []) => {
  if (typeof obj === "string") ra.push(obj);
  else if (Array.isArray(obj)) for (const x of obj) chuoiTrong(x, ra);
  else if (obj && typeof obj === "object")
    for (const v of Object.values(obj)) chuoiTrong(v, ra);
  return ra;
};

// Đếm số bài chứa mỗi câu.
const dem = new Map();
for (const b of bai) {
  const thay = new Set();
  for (const s of b.slides ?? [])
    for (const t of chuoiTrong(s.content ?? {}))
      if (t.length >= DAI) thay.add(t);
  for (const t of thay) dem.set(t, (dem.get(t) ?? 0) + 1);
}
const laLap = (t) => (dem.get(t) ?? 0) >= NGUONG;

// Mỗi bài → "chữ ký" = danh sách câu lặp của nó (đã sắp xếp để gom nhóm được).
const nhom = new Map();
for (const b of bai) {
  const cau = new Set();
  for (const s of b.slides ?? [])
    for (const t of chuoiTrong(s.content ?? {}))
      if (t.length >= DAI && laLap(t)) cau.add(t);
  if (cau.size === 0) continue;
  const khoa = [...cau].sort().join(" ‖ ");
  if (!nhom.has(khoa)) nhom.set(khoa, []);
  nhom.get(khoa).push(b);
}

const xep = [...nhom.entries()].sort((a, b) => b[1].length - a[1].length);
console.log(
  `${ten}: ${bai.length} bài, trong đó ${xep.reduce((s, [, v]) => s + v.length, 0)} bài nằm trong ${xep.length} nhóm câu lặp.\n`,
);

xep.forEach(([khoa, ds], i) => {
  const cau = khoa.split(" ‖ ");
  console.log(
    `═══ NHÓM ${i + 1} — ${ds.length} bài (${[...new Set(ds.map((b) => b.chuong))].join(", ")}) ═══`,
  );
  cau.forEach((c) => console.log(`   ▪ ${c}`));
  for (const b of ds) console.log(`     ${b.id.padEnd(12)} ${b.title}`);
  console.log("");
});
