#!/usr/bin/env node
/**
 * SO SỐ SLIDE MỖI BÀI giữa BẢN HIỆN TẠI và BẢN MỐC HEAD (worktree `.head-check`).
 *
 * 🔴 VÌ SAO CẦN: sau khi `git checkout --` khôi phục 2 file Lớp 4 rồi chạy lại
 * `scratch/sua-kien-thuc-chua-hoc.mjs`, tổng số slide thành **4944** trong khi mốc đúng là
 * **4937** (cổng `test-admin-portal.mjs --static` bắt được: “Mong đợi 4937 slide, đọc được
 * 4944”). Script này chỉ ra CHÍNH XÁC bài nào thừa slide.
 *
 * Chạy: `git worktree add .head-check HEAD` rồi `node scratch/so-slide-voi-head.mjs`
 */
const LOP = [1, 2, 3, 4, 5];

async function cay(goc) {
  const ra = new Map();
  for (const n of LOP) {
    const mod = await import(
      new URL(`../${goc}/client/src/data/grade${n}Data.js`, import.meta.url)
    );
    const data = mod[`grade${n}Data`];
    for (const ch of data.chapters ?? []) {
      for (const bai of ch.lessons ?? []) {
        ra.set(bai.id, (bai.slides ?? []).length);
      }
    }
  }
  return ra;
}

const nay = await cay(".");
const head = await cay(".head-check");

let tongNay = 0;
let tongHead = 0;
for (const v of nay.values()) tongNay += v;
for (const v of head.values()) tongHead += v;

const thua = [];
const thieu = [];
for (const [id, n] of nay) {
  const h = head.get(id);
  if (h === undefined)
    thua.push([id, n, "(bài mới)"]); // bài mới chưa có ở HEAD
  else if (n > h) thua.push([id, n, `+${n - h}`]);
  else if (n < h) thieu.push([id, n, `${n - h}`]);
}

console.log(`Số bài   : NAY ${nay.size} · HEAD ${head.size}`);
console.log(
  `Số slide : NAY ${tongNay} · HEAD ${tongHead} (lệch ${tongNay - tongHead})`,
);
console.log(`\nBài THÊM slide (${thua.length}):`);
for (const [id, n, d] of thua) console.log(`  ${id}  ${n} slide  ${d}`);
console.log(`\nBài BỚT slide (${thieu.length}):`);
for (const [id, n, d] of thieu) console.log(`  ${id}  ${n} slide  ${d}`);
