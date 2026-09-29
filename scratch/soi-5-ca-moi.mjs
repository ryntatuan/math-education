#!/usr/bin/env node
/**
 * SOI 5 CA MỚI CÒN LẠI (sinh cùng 7 slide thêm ở đợt khôi phục 2 file Lớp 4):
 *   • 2 ca `text ↔ table`  : g1-c9-l2 slide 11 · g2-c11-l3 slide 9
 *   • 3 ca `visual → visual`: g1-c9-l1 (9/10) · g1-c9-l2 (10/11) · g1-c9-l4 (9/10)
 *
 * Câu hỏi cần trả lời bằng SỐ ĐO, không bằng cảm giác:
 *   1. Với `text ↔ table`: app có BỎ dòng chữ trùng bảng không (`planVisualText`)?
 *      Bỏ rồi ⇒ trẻ KHÔNG thấy lặp ⇒ không phải lỗi, không cần sửa dữ liệu.
 *   2. Với `visual → visual`: hai slide có NÓI LẠI câu nào không, hay chỉ dùng chung từ vựng?
 *
 * Chạy: node scratch/soi-5-ca-moi.mjs
 */
import { planVisualText } from "../client/src/pages/lesson/slideDedupe.js";

const CAN = [
  ["g1-c9-l2", 10],
  ["g2-c11-l3", 8],
];

const LOP = [1, 2, 3, 4, 5];
const baiTheoId = new Map();
for (const n of LOP) {
  const mod = await import(
    new URL(`../client/src/data/grade${n}Data.js`, import.meta.url)
  );
  const data = mod[`grade${n}Data`];
  for (const ch of data?.chapters ?? []) {
    for (const bai of ch.lessons ?? []) baiTheoId.set(bai.id, bai);
  }
}

console.log("=== 1. HAI CA `text ↔ table` — app có bỏ dòng trùng không? ===");
for (const [id, chiSo] of CAN) {
  const bai = baiTheoId.get(id);
  const s = bai?.slides?.[chiSo];
  console.log(`\n${id} · slide #${chiSo} [${s?.type}]`);
  console.log(`  text gốc: ${JSON.stringify(s?.content?.text)}`);
  const plan = planVisualText(s?.content ?? {});
  console.log(`  → tiêu đề vẽ ra : ${JSON.stringify(plan.title)}`);
  console.log(`  → dòng còn vẽ   : ${JSON.stringify(plan.steps)}`);
  console.log(`  → bỏ nhãn hình  : ${plan.hideCaption}`);
}

console.log("\n=== 2. BA CA `visual → visual` — nội dung hai slide ===");
const CAP = [
  ["g1-c9-l1", 8, 9],
  ["g1-c9-l2", 9, 10],
  ["g1-c9-l4", 8, 9],
];
for (const [id, a, b] of CAP) {
  const bai = baiTheoId.get(id);
  const s1 = bai?.slides?.[a];
  const s2 = bai?.slides?.[b];
  console.log(`\n${id} · #${a} [${s1?.type}] → #${b} [${s2?.type}]`);
  console.log(`  #${a} text: ${JSON.stringify(s1?.content?.text)}`);
  console.log(`  #${b} text: ${JSON.stringify(s2?.content?.text)}`);
  console.log(`  #${a} khoá: ${Object.keys(s1?.content ?? {}).join(", ")}`);
  console.log(`  #${b} khoá: ${Object.keys(s2?.content ?? {}).join(", ")}`);
}
