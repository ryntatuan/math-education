// ĐẶT TIỀN TỐ `_` CHO THAM SỐ KHÔNG DÙNG (quy ước "tôi biết là không dùng").
//
//   node scratch/dat-ten-tham-so-thua.mjs          # chạy thử
//   node scratch/dat-ten-tham-so-thua.mjs --ghi    # ghi thật (tự sao lưu .bak)
//
// VÌ SAO: 5 hàm `nhanhLopN(topic, gNum, grade, depth, topicId, pickFromGrade)` nhận ĐỦ ngữ cảnh
// cũ để thân nhánh giữ nguyên từng chữ — nhưng lớp nào không dùng tới tham số nào thì oxlint báo
// `no-unused-vars`. Đổi tên thành `_gNum`… + khai `argsIgnorePattern: "^_"` trong `.oxlintrc.json`
// là cách nói rõ "cố ý không dùng", thay vì thêm chú thích tắt luật ở từng dòng.
//
// AN TOÀN: chỉ đổi tên tham số khi tên đó KHÔNG xuất hiện ở bất kỳ chỗ nào khác trong file
// (ngoài dòng chữ ký) — còn xuất hiện thì giữ nguyên và báo lại.

import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

const GHI = process.argv.includes("--ghi");
const MUC = [
  {
    file: "client/src/utils/exercises/branchesLop1.js",
    chuKy: /^(export function nhanhLop\w+\()(.*)(\)\s*\{)$/m,
  },
  {
    file: "client/src/utils/exercises/branchesLop2.js",
    chuKy: /^(export function nhanhLop\w+\()(.*)(\)\s*\{)$/m,
  },
  {
    file: "client/src/utils/exercises/branchesLop3.js",
    chuKy: /^(export function nhanhLop\w+\()(.*)(\)\s*\{)$/m,
  },
  {
    file: "client/src/utils/exercises/branchesLop4.js",
    chuKy: /^(export function nhanhLop\w+\()(.*)(\)\s*\{)$/m,
  },
  {
    file: "client/src/utils/exercises/branchesLop5.js",
    chuKy: /^(export function nhanhLop\w+\()(.*)(\)\s*\{)$/m,
  },
  {
    file: "client/src/utils/exercises/helpers.js",
    chuKy: /^(export const renderShapeVisual = \()(.*)(\) => \{$)/m,
  },
];

let soDoi = 0;
for (const m of MUC) {
  const goc = readFileSync(m.file, "utf8");
  const khop = m.chuKy.exec(goc);
  if (!khop) {
    console.log(`  ? ${m.file}: không khớp chữ ký — bỏ qua`);
    continue;
  }
  const [caCau, dau, giua, cuoi] = khop;
  const ten = giua
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const than = goc.replace(caCau, ""); // bỏ dòng chữ ký khỏi phần soi
  const doi = [];
  const moi = ten.map((t) => {
    const tenThat = t.split("=")[0].trim();
    if (tenThat.startsWith("_")) return t;
    const dung = new RegExp(`\\b${tenThat}\\b`).test(than);
    if (dung) return t;
    doi.push(tenThat);
    return "_" + t;
  });
  if (!doi.length) continue;
  soDoi += doi.length;
  console.log(`  ${m.file}: ${doi.join(", ")} -> _...`);
  if (GHI) {
    copyFileSync(m.file, m.file + ".bak");
    writeFileSync(
      m.file,
      goc.replace(caCau, `${dau}${moi.join(", ")}${cuoi}`),
      "utf8",
    );
  }
}
console.log(`\nTổng: ${soDoi} tham số${GHI ? " (đã ghi)" : " (chạy thử)"}`);
