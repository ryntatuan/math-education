/**
 * Đổi quy mô đã ghi cứng từ 2635 → 2656 (vòng tách thứ hai: thêm 21 slide `concept`/`story`).
 * Chỉ thay CHUỖI SỐ, không đụng gì khác; ghi bằng UTF-8 (Node, không dùng PowerShell).
 *   node scratch/doi-quy-mo.mjs
 */
import fs from "node:fs";

const FILES = [
  "scripts/migrate-content.mjs",
  "scripts/test-admin-portal.mjs",
  "supabase/content-seed/100-tang-phien-ban-sau-bo-sung.sql",
  "docs/content_reload_steps.md",
  "docs/curriculum_audit.md",
  "docs/admin_portal_test_cases.md",
  "docs/sgk_curriculum_standardization_plan.md",
];

const CAP = [
  ["2635", "2656"],
  ["2 635", "2 656"],
];

for (const f of FILES) {
  const truoc = fs.readFileSync(f, "utf8");
  let sau = truoc;
  let n = 0;
  for (const [a, b] of CAP) {
    const dem = sau.split(a).length - 1;
    if (dem) {
      sau = sau.split(a).join(b);
      n += dem;
    }
  }
  if (n) {
    fs.writeFileSync(f, sau, "utf8");
    console.log(`${f}: đổi ${n} chỗ`);
  } else {
    console.log(`${f}: không có gì để đổi`);
  }
}
