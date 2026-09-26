/**
 * ĐẾM DẠNG BÀI TẬP trong SGK (theo file OCR) để đối chiếu với app:
 *   “Số ?” · “số thích hợp” · “điền” · “nối” · “viết” · “khoanh” · “đặt tính rồi tính”
 * Mục đích: tìm chương mà SGK dùng dạng bài điền/nối nhiều mà app KHÔNG có hình tương tác
 * tương ứng (`bangTinh` · `cotTinh` · `numberScene` · `patternRow`).
 *
 * Chạy: `node scratch/dem-dang-bai-sgk.mjs <lớp>`
 */
import { readFileSync } from "node:fs";
import { readdirSync } from "node:fs";

const NGUON_SGK = {
  1: ["Math grade 1 part 1.md", "Math grade 1 part 2.md"],
  2: ["Math grade 2 part 1.md", "Math grade 2 part 2.md"],
  3: ["Math grade 3 part 1.md", "Math grade 3 part 2.md"],
  4: ["Math grade 4.md"],
  5: ["Math grade 5.md"],
};

const DANG = [
  ["Số ?", /s[ốo]\s*\?/gi],
  ["số thích hợp", /s[ốo]\s*th[íi]ch\s*h[ợo]p/gi],
  ["điền", /đi[ềe]n/gi],
  ["nối", /\bn[ốo]i\b/gi],
  ["viết số", /vi[ếe]t\s*s[ốo]/gi],
  ["khoanh", /khoanh/gi],
  ["đặt tính rồi tính", /đ[ặa]t\s*t[íi]nh/gi],
  ["viết theo mẫu", /theo\s*m[ẫa]u/gi],
  ["đúng ghi Đ, sai ghi S", /\bĐ\b.*\bS\b|đ[úu]ng\s*ghi/gi],
];

const KHOAS_APP = [
  "bangTinh",
  "cotTinh",
  "numberScene",
  "patternRow",
  "groupScene",
];

const chiLop = process.argv[2] ? [Number(process.argv[2])] : [1, 2, 3, 4, 5];

for (const lop of chiLop) {
  const files = NGUON_SGK[lop] ?? [];
  let tong = 0;
  const dem = {};
  for (const f of files)
    try {
      tong += readFileSync(`docs/Data Source/Grade ${lop}/${f}`, "utf8").length;
      const t = readFileSync(`docs/Data Source/Grade ${lop}/${f}`, "utf8");
      for (const [ten, re] of DANG) {
        const n = (t.match(re) ?? []).length;
        dem[ten] = (dem[ten] ?? 0) + n;
      }
    } catch {
      /* thiếu file thì bỏ qua */
    }

  // Đếm hình tương tác trong app của lớp đó
  let app = {};
  try {
    const dir = `client/src/data/grade${lop}`;
    for (const f of readdirSync(dir).filter((x) => /^g\d+c\d+\.js$/.test(x))) {
      const src = readFileSync(`${dir}/${f}`, "utf8");
      for (const k of KHOAS_APP)
        // ⚠️ Nhận CẢ HAI kiểu khoá: `cotTinh:` và `"cotTinh":` — dữ liệu trong repo dùng lẫn lộn
        // (file thì có nháy, file thì không). Chỉ khớp một kiểu ⇒ đếm SAI (đã mắc 2026-09-26:
        // báo Lớp 5 “0 hình tương tác” trong khi vừa thêm 5 slide).
        app[k] =
          (app[k] ?? 0) +
          (src.match(new RegExp(`["']?\\b${k}["']?\\s*:`, "g")) ?? []).length;
    }
  } catch {
    app = {};
  }

  console.log(`\n=== Lớp ${lop} (${Math.round(tong / 1024)} KB chữ OCR) ===`);
  console.log(
    "  SGK:  " +
      Object.entries(dem)
        .map(([k, v]) => `${k}=${v}`)
        .join(" · "),
  );
  console.log(
    "  APP:  " +
      Object.entries(app)
        .map(([k, v]) => `${k}=${v}`)
        .join(" · "),
  );
}
