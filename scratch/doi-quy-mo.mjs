/**
 * ĐỔI QUY MÔ ĐÃ GHI CỨNG — dùng cho MỌI lần thêm/bớt slide.
 *
 *   node scratch/doi-quy-mo.mjs <slideCu> <slideMoi> <l1Cu> <l1Moi>
 *
 * Ví dụ: `node scratch/doi-quy-mo.mjs 2659 2671 637 649`
 *
 * ⚠️ BẢN CŨ CỦA FILE NÀY THAY CHUỖI SỐ MỘT CÁCH MÙ QUÁN ⇒ nó cũng sửa cả những dòng GHI LỊCH SỬ
 * (“2547 → 2656”, “2656 → 2659”…) — tức là làm sai hồ sơ. Bản này:
 *   1. Chỉ thay các MẪU CÓ NGỮ CẢNH (không bao giờ thay một con số trần).
 *   2. BỎ QUA mọi dòng có dạng “số → số” (dấu vết của một lần đổi trước) ⇒ lịch sử còn nguyên.
 *   3. Ghi bằng `fs.writeFileSync(..., "utf8")` — KHÔNG dùng PowerShell (bẫy encoding).
 */
import fs from "node:fs";

const [slideCu, slideMoi, l1Cu, l1Moi] = process.argv.slice(2);
if (!slideCu || !slideMoi || !l1Cu || !l1Moi) {
  console.error(
    "Dùng: node scratch/doi-quy-mo.mjs <slideCu> <slideMoi> <l1Cu> <l1Moi>\n" +
      "  ví dụ: node scratch/doi-quy-mo.mjs 2659 2671 637 649",
  );
  process.exit(1);
}

const FILES = [
  "scripts/migrate-content.mjs",
  "scripts/test-admin-portal.mjs",
  "supabase/content-seed/100-tang-phien-ban-sau-bo-sung.sql",
  "docs/content_reload_steps.md",
  "docs/curriculum_audit.md",
  "docs/admin_portal_test_cases.md",
  "docs/lesson_visuals_plan.md",
  "docs/sgk_curriculum_standardization_plan.md",
  "docs/sgk_map_lop1.md",
];

/** Mẫu có ngữ cảnh: [tìm, thay]. Không bao giờ đặt một con số trần ở đây. */
const MAU = [
  [`${slideCu} slide`, `${slideMoi} slide`], // "2659 slide", "**2659 slide**"
  [`5/51/459/${slideCu}`, `5/51/459/${slideMoi}`], // trong câu in của script
  [`slide: ${slideCu}`, `slide: ${slideMoi}`], // MONG_DOI
  [`soSlide === ${slideCu}`, `soSlide === ${slideMoi}`], // cổng S-15/S-23
  [`d.slide === ${slideCu}`, `d.slide === ${slideMoi}`], // cổng S-24
  [`459 · ${slideCu}`, `459 · ${slideMoi}`], // bảng nguồn số liệu
  [`**${slideCu}**`, `**${slideMoi}**`], // ô bảng trong content_reload_steps
  [`97 bài · ${l1Cu} slide`, `97 bài · ${l1Moi} slide`],
  [`97 bài / ${l1Cu} slide`, `97 bài / ${l1Moi} slide`],
];

/** Dòng ghi lại MỘT LẦN ĐỔI TRƯỚC (ví dụ “2547 → 2656”, “2656 → **2659**”) — không đụng tới. */
const LA_LICH_SU = /\d[\d\s]*\s*→\s*\*{0,2}\d/;

let tongDoi = 0;
for (const f of FILES) {
  if (!fs.existsSync(f)) {
    console.log(`${f}: KHÔNG CÓ FILE`);
    continue;
  }
  const dong = fs.readFileSync(f, "utf8").split("\n");
  let n = 0;
  const sau = dong.map((d) => {
    if (LA_LICH_SU.test(d)) return d; // giữ nguyên dòng lịch sử
    let x = d;
    for (const [a, b] of MAU) {
      const dem = x.split(a).length - 1;
      if (dem) {
        x = x.split(a).join(b);
        n += dem;
      }
    }
    return x;
  });
  if (n) {
    fs.writeFileSync(f, sau.join("\n"), "utf8");
    console.log(`${f}: đổi ${n} chỗ`);
  } else {
    console.log(`${f}: không có gì để đổi`);
  }
  tongDoi += n;
}
console.log(`\nTổng: ${tongDoi} chỗ. Nhớ chạy: migrate --sql → cổng → build.`);
