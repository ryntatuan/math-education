/**
 * ĐẾM DẠNG BÀI TẬP trong SGK (theo file OCR) để đối chiếu với app:
 *   “Số ?” · “số thích hợp” · “điền” · “nối” · “viết” · “khoanh” · “đặt tính rồi tính”
 * Mục đích: tìm chương mà SGK dùng dạng bài điền/nối nhiều mà app KHÔNG có hình tương tác
 * tương ứng (`bangTinh` · `cotTinh` · `numberScene` · `patternRow`).
 *
 * Chạy: `node scratch/dem-dang-bai-sgk.mjs <lớp>`
 */
import { readFileSync } from "node:fs";
import { readdirSync, existsSync } from "node:fs";

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

/**
 * Đường dẫn file OCR SGK — thư mục này ĐÃ ĐỔI TÊN một lần (`Data Source` → `DataSource`),
 * mà bản cũ nuốt lỗi trong `catch` nên công cụ in “0 KB chữ OCR” **mà không báo gì** ⇒ kết luận
 * “SGK không có dạng bài này” là SAI. Nay thử cả hai tên và KÊU khi không đọc được file nào.
 */
const DUONG_OCR = ["docs/DataSource", "docs/Data Source"];
const docOcr = (lop, f) => {
  for (const d of DUONG_OCR) {
    const p = `${d}/Grade ${lop}/${f}`;
    if (existsSync(p)) return readFileSync(p, "utf8");
  }
  return null;
};

for (const lop of chiLop) {
  const files = NGUON_SGK[lop] ?? [];
  let tong = 0;
  let soFileDoc = 0;
  const dem = {};
  for (const f of files) {
    const t = docOcr(lop, f);
    if (t === null) continue;
    soFileDoc += 1;
    tong += t.length;
    for (const [ten, re] of DANG) {
      const n = (t.match(re) ?? []).length;
      dem[ten] = (dem[ten] ?? 0) + n;
    }
  }
  if (soFileDoc === 0)
    console.log(
      `  ⚠️ KHÔNG đọc được file OCR nào của Lớp ${lop} (tìm ở ${DUONG_OCR.join(" · ")}) — số liệu SGK dưới đây VÔ NGHĨA.`,
    );

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
