#!/usr/bin/env node
/**
 * TÌM SLIDE BỊ CHÈN HAI LẦN trong cùng một bài (JSON y hệt nhau).
 *
 * 🔴 VÌ SAO CẦN: cổng `test-admin-portal.mjs --static` (S-15/S-23/S-24) báo tổng slide là
 * **4944** trong khi mốc đúng là **4937** — lệch 7, sau khi tôi `git checkout` 2 file Lớp 4
 * rồi chạy lại `scratch/sua-kien-thuc-chua-hoc.mjs`. So với HEAD thì chỉ 1 bài tăng slide, nên
 * không thể nhìn bằng SỐ LƯỢNG; phải tìm slide TRÙNG KHÍT trong cùng bài.
 *
 * Chạy: node scratch/tim-slide-trung-trong-bai.mjs
 */
const LOP = [1, 2, 3, 4, 5];
let soBai = 0;
let soSlide = 0;
const nghi = [];

for (const n of LOP) {
  const mod = await import(
    new URL(`../client/src/data/grade${n}Data.js`, import.meta.url)
  );
  const data = mod[`grade${n}Data`];
  for (const ch of data.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      soBai++;
      const slides = bai.slides ?? [];
      soSlide += slides.length;
      const dem = new Map();
      slides.forEach((s, i) => {
        const k = JSON.stringify(s.content ?? s);
        if (!dem.has(k)) dem.set(k, []);
        dem.get(k).push(i);
      });
      for (const [k, ds] of dem) {
        if (ds.length > 1) nghi.push({ bai: bai.id, ds, tom: k.slice(0, 120) });
      }
    }
  }
}
console.log(`Đã quét: ${soBai} bài · ${soSlide} slide`);
console.log(`SLIDE TRÙNG KHÍT TRONG CÙNG BÀI: ${nghi.length} ca`);
for (const c of nghi) {
  console.log(`  ${c.bai} · slide #${c.ds.join(" = #")}`);
  console.log(`     ${c.tom}`);
}
