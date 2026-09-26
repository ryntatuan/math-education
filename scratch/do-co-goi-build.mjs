// Đo gói build: liệt kê các mảnh (chunk) lớn nhất sau `npm --prefix client run build:web`.
//
//   node scratch/do-co-goi-build.mjs
//
// Đọc `client/dist/.vite/manifest.json` (Vite 5+ ghi ở đây) để biết mảnh nào là
// mảnh chính (entry) — con số quan trọng nhất, vì đó là thứ bé phải tải trước khi
// thấy Trang chủ. Không có manifest thì đành đo theo tên file.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "client/dist/assets";
const MANIFEST = "client/dist/.vite/manifest.json";

if (!existsSync(DIST)) {
  console.error(
    "✗ Chưa có " + DIST + " — chạy `npm --prefix client run build:web` trước.",
  );
  process.exit(1);
}

const kb = (n) => (n / 1024).toFixed(0).padStart(6) + " KB";

/** Mảnh chính theo manifest (Vite 5/6), hoặc file `index-*.js` nếu không có manifest. */
function mainChunkName() {
  if (existsSync(MANIFEST)) {
    const m = JSON.parse(readFileSync(MANIFEST, "utf8"));
    for (const [file, info] of Object.entries(m)) {
      if (info.isEntry) return file.replace(/^assets\//, "");
    }
  }
  return readdirSync(DIST).find((f) => /^index-.*\.js$/.test(f)) ?? null;
}

const files = readdirSync(DIST).filter((f) => f.endsWith(".js"));
const rows = files
  .map((f) => ({ name: f, size: statSync(join(DIST, f)).size }))
  .sort((a, b) => b.size - a.size);

const main = mainChunkName();
const total = rows.reduce((s, r) => s + r.size, 0);

console.log("Mảnh chính (tải trước khi thấy Trang chủ): " + main);
console.log("Tổng JS: " + kb(total) + " trong " + rows.length + " mảnh\n");
console.log("5 mảnh lớn nhất:");
for (const r of rows.slice(0, 5)) {
  console.log(
    "  " +
      kb(r.size) +
      "  " +
      r.name +
      (r.name === main ? "   ← MẢNH CHÍNH" : ""),
  );
}

// Ngưỡng mục tiêu trong kế hoạch: mảnh chính < 600 KB.
const mainSize = rows.find((r) => r.name === main)?.size ?? 0;
const MUC_TIEU = 600 * 1024;
console.log(
  "\nMảnh chính: " +
    kb(mainSize) +
    " / mục tiêu < 600 KB ⇒ " +
    (mainSize < MUC_TIEU
      ? "ĐẠT"
      : "CHƯA ĐẠT (xem ghi chú trong kế hoạch: phần còn lại là dữ liệu 5 lớp)"),
);
