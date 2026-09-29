#!/usr/bin/env node
/**
 * IN ĐẦY ĐỦ `rule` + `points` của các ca cần sửa (không bị cắt như cổng in ra) —
 * để viết lại ô ⭐ đúng nội dung bài.
 *
 * Chạy: node scratch/in-rule-points.mjs g1-c8-l4 1 g2-c1-l6 1 …
 */
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

const doi = process.argv.slice(2);
for (let i = 0; i < doi.length; i += 2) {
  const id = doi[i];
  const chiSo = Number(doi[i + 1]);
  const s = baiTheoId.get(id)?.slides?.[chiSo];
  console.log(`\n===== ${id} · slide #${chiSo} [${s?.type}] =====`);
  const c = s?.content ?? {};
  if (c.title) console.log(`title: ${c.title}`);
  if (c.explanation) console.log(`explanation: ${c.explanation}`);
  if (c.rule) console.log(`rule: ${c.rule}`);
  if (Array.isArray(c.points))
    c.points.forEach((p, k) => console.log(`point${k}: ${p}`));
}
