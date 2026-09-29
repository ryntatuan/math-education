#!/usr/bin/env node
/**
 * TÌM 5 CA TRÙNG LẶP MỚI so với mốc HEAD (399 → 404).
 *
 * Bối cảnh: cổng `scratch/soat-trung-lap-noi-dung.mjs` ở mốc HEAD (4987 slide) và ở trạng thái
 * 4937 slide đều ra **399 ca** (A 265 · B 134). Nay (4944 slide) ra **404 ca** (A 267 · B 137)
 * ⇒ 5 ca mới, sinh ra cùng 7 slide thêm khi tôi khôi phục 2 file Lớp 4 rồi chạy lại bộ sửa.
 * Script này chỉ ra CHÍNH XÁC 5 ca đó (so theo bài + loại cặp + câu chữ).
 */
import fs from "node:fs";

const doc = (f) => {
  const buf = fs.readFileSync(f);
  /**
   * ⚠️ File do PowerShell ghi bằng `>` là **UTF-16LE** (có BOM `FF FE`). Đọc bằng utf8 thì
   * mọi ký tự ASCII bị xen byte 0 ⇒ regex không khớp gì (đã mắc: báo “NAY: 0 ca chi tiết”).
   */
  const t =
    buf[0] === 0xff && buf[1] === 0xfe
      ? buf.toString("utf16le")
      : buf.toString("utf8");
  const ra = [];
  for (const line of t.split(/\r?\n/)) {
    // Dòng nhóm A: `... [concept] rule ↔ points điểm=1.00`
    // Dòng nhóm B: `... [concept → visual]  điểm=0.88`  ⇒ cặp nằm TRONG ngoặc vuông.
    const m = line.match(
      /^  · (Lớp \d+ [\w-]+) slide ([\d/]+) \[([^\]]+)\](.*?)điểm=([\d.]+)/,
    );
    if (!m) continue;
    const trongNgoac = m[3].trim();
    const pair = m[4].trim() || trongNgoac;
    ra.push({
      bai: m[1],
      slide: m[2],
      type: trongNgoac,
      pair,
      score: m[5],
    });
  }
  return ra;
};

const head = doc("scratch/soat-trung-lap-noi-dung.head.out.txt");
const nay = doc("scratch/trung-lap-moi.txt");

/**
 * ⚠️ BẢN HEAD CŨ HƠN: nó chưa có mục “A3” nên KHÔNG in ca `title ↔ points` / `title ↔ rule`.
 * So cả hai chiều sẽ báo oan hàng loạt ca “mới”. Chỉ so những cặp mà BẢN HEAD CÓ IN:
 *   • `rule ↔ points` (mục A1), mọi cặp chứa `table` (mục A2), và mọi ca nhóm B (`A → B`).
 */
const soDuoc = (r) =>
  r.pair === "rule ↔ points" ||
  r.pair.includes("table") ||
  r.type.includes("→");
const headSo = head.filter(soDuoc);
const naySo = nay.filter(soDuoc);

const khoa = (r) => `${r.bai}|${r.pair}`;
const demHead = new Map();
for (const r of headSo) demHead.set(khoa(r), (demHead.get(khoa(r)) ?? 0) + 1);
const demNay = new Map();
for (const r of naySo) demNay.set(khoa(r), (demNay.get(khoa(r)) ?? 0) + 1);

console.log(
  `HEAD: ${head.length} ca chi tiết (${headSo.length} ca so được) · NAY: ${nay.length} ca chi tiết (${naySo.length} ca so được)`,
);
console.log("\nCA MỚI (có ở NAY, không có ở HEAD):");
for (const [k, n] of demNay) {
  const truoc = demHead.get(k) ?? 0;
  if (n > truoc) {
    const vd = naySo.filter((r) => khoa(r) === k);
    console.log(`  +${n - truoc}  ${k}`);
    for (const r of vd)
      console.log(`        slide ${r.slide} [${r.type}] điểm=${r.score}`);
  }
}
console.log("\nCA MẤT (có ở HEAD, không có ở NAY):");
for (const [k, n] of demHead) {
  const co = demNay.get(k) ?? 0;
  if (n > co) console.log(`  -${n - co}  ${k}`);
}
