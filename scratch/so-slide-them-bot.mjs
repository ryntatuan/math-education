#!/usr/bin/env node
/**
 * SO TỪNG SLIDE giữa BẢN HIỆN TẠI và BẢN MỐC HEAD (`git worktree add .head-check HEAD`).
 *
 * Mục đích: tổng slide nay là 4944, mốc đúng cần là 4937 (lệch 7). So SỐ LƯỢNG không đủ vì
 * nhiều bài vừa bớt vừa thêm; phải so NỘI DUNG TỪNG SLIDE để chỉ ra cái nào THÊM / BỚT.
 * Chạy: `node scratch/so-slide-them-bot.mjs`
 */
const LOP = [1, 2, 3, 4, 5];

const dau = (s) => {
  const c = s.content ?? s;
  const t =
    c.title ??
    c.question ??
    c.text ??
    c.rule ??
    c.explanation ??
    c.label ??
    Object.values(c).find((v) => typeof v === "string") ??
    "";
  return `${s.type}: ${String(t).slice(0, 64).replace(/\n/g, " / ")}`;
};

async function cay(goc) {
  const ra = new Map();
  for (const n of LOP) {
    const mod = await import(
      new URL(`../${goc}/client/src/data/grade${n}Data.js`, import.meta.url)
    );
    const data = mod[`grade${n}Data`];
    for (const ch of data.chapters ?? []) {
      for (const bai of ch.lessons ?? []) {
        ra.set(
          bai.id,
          (bai.slides ?? []).map((s) => JSON.stringify(s.content ?? s)),
        );
      }
    }
  }
  return ra;
}

const nay = await cay(".");
const head = await cay(".head-check");

let tongThem = 0;
let tongBot = 0;
const dongThem = [];
const dongBot = [];

for (const [id, dsNay] of nay) {
  const dsHead = head.get(id) ?? [];
  const demHead = new Map();
  for (const k of dsHead) demHead.set(k, (demHead.get(k) ?? 0) + 1);
  const demNay = new Map();
  for (const k of dsNay) demNay.set(k, (demNay.get(k) ?? 0) + 1);
  for (const [k, n] of demNay) {
    const co = demHead.get(k) ?? 0;
    if (n > co) {
      tongThem += n - co;
      dongThem.push(`  +${n - co} ${id} · ${dau(JSON.parse(k))}`);
    }
  }
  for (const [k, n] of demHead) {
    const co = demNay.get(k) ?? 0;
    if (n > co) {
      tongBot += n - co;
      dongBot.push(`  -${n - co} ${id} · ${dau(JSON.parse(k))}`);
    }
  }
}

console.log(`SLIDE THÊM so với HEAD: ${tongThem}`);
console.log(dongThem.join("\n"));
console.log(`\nSLIDE BỚT so với HEAD: ${tongBot}`);
console.log(dongBot.join("\n"));
