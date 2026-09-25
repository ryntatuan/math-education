/**
 * ĐỔI SỐ BÀI 459 → 460 (và slide 2705 → 2712) — `node scratch/doi-so-bai.mjs [--ghi]`
 *
 * Vì sao cần script riêng: `scratch/doi-quy-mo.mjs` chỉ đổi SỐ SLIDE. Khi thêm một BÀI mới
 * (bài “Cao hơn, thấp hơn” của CĐ7) thì số bài cũng đổi, mà số bài bị ghi cứng ở 4 file
 * (`MONG_DOI` của migrate · 2 cổng của `test-admin-portal` · tài liệu nạp lại · audit).
 *
 * An toàn: mỗi phép thay ghi rõ SỐ LẦN MONG ĐỢI; lệch thì **dừng, không ghi file nào**.
 * Các con số 459 trong các mục “LẦN N” của `100-tang-phien-ban-...sql` là SỐ LỊCH SỬ — giữ nguyên.
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

const PHEP = [
  // 1. scripts/migrate-content.mjs — MONG_DOI + chuỗi thông báo
  [
    "scripts/migrate-content.mjs",
    "chuong: 51, bai: 459, slide: 2705",
    "chuong: 51, bai: 460, slide: 2712",
    1,
  ],
  ["scripts/migrate-content.mjs", "(5/51/459/2705)", "(5/51/460/2712)", 1],
  // 2. scripts/test-admin-portal.mjs — cổng đọc dữ liệu tĩnh + cổng cây DB
  [
    "scripts/test-admin-portal.mjs",
    "assert(soBai === 459,",
    "assert(soBai === 460,",
    1,
  ],
  [
    "scripts/test-admin-portal.mjs",
    "`Mong đợi 459 bài, đọc được ${soBai}`",
    "`Mong đợi 460 bài, đọc được ${soBai}`",
    1,
  ],
  [
    "scripts/test-admin-portal.mjs",
    "d.lop === 5 && d.chuong === 51 && d.bai === 459 && d.slide === 2705",
    "d.lop === 5 && d.chuong === 51 && d.bai === 460 && d.slide === 2712",
    1,
  ],
  [
    "scripts/test-admin-portal.mjs",
    "— mong đợi 5/51/459/2705",
    "— mong đợi 5/51/460/2712",
    1,
  ],
  // 3. Tài liệu nạp lại
  [
    "docs/content_reload_steps.md",
    "| **459**         |",
    "| **460**         |",
    1,
  ],
  [
    "docs/content_reload_steps.md",
    "`so_bai = 459` · `so_bai_da_xuat_ban = 459`",
    "`so_bai = 460` · `so_bai_da_xuat_ban = 460`",
    1,
  ],
  // 4. Audit chương trình (2 chỗ: dòng “Số đo hiện tại” và bảng tổng)
  [
    "docs/curriculum_audit.md",
    "459 bài · 2705 slide",
    "460 bài · 2712 slide",
    2,
  ],
  // 5. Ghi chú seed — CHỈ dòng quy mô HIỆN TẠI (các mục “LẦN N” là lịch sử, giữ nguyên)
  [
    "supabase/content-seed/100-tang-phien-ban-sau-bo-sung.sql",
    "vẫn 5 lớp · 51 chương · 459 bài · **2705 slide**.",
    "vẫn 5 lớp · 51 chương · 460 bài · **2712 slide**.",
    1,
  ],
];

const ketQua = [];
let ok = true;
for (const [f, cu, moi, mongDoi] of PHEP) {
  const t = fs.readFileSync(f, "utf8");
  const soLan = t.split(cu).length - 1;
  if (soLan !== mongDoi) {
    ok = false;
    ketQua.push(
      `❌ ${f}: khớp ${soLan} lần, mong đợi ${mongDoi} — “${cu.slice(0, 50)}…”`,
    );
    continue;
  }
  ketQua.push(`✓ ${f}: ${soLan} chỗ`);
  if (GHI) fs.writeFileSync(f, t.split(cu).join(moi), "utf8");
}
console.log(ketQua.join("\n"));
if (!ok) {
  console.log("\nDỪNG: có phép thay không khớp — KHÔNG ghi file nào.");
  process.exit(1);
}
console.log(GHI ? "\nĐã ghi tất cả." : "\n(chưa ghi — thêm `--ghi`)");
