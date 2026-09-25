/**
 * Soi ký tự LỖI trong file văn bản: (1) U+FFFD, (2) dấu rời kiểu U+0300–U+036F
 * (dấu sắc/huyền bị tách khỏi chữ do gõ sai — đã gặp thật ở tài liệu kế hoạch),
 * (3) surrogate mồ côi (emoji bị cắt đôi).
 * Chạy: `node scratch/soi-ky-tu-loi.mjs <đường-dẫn 1> [đường-dẫn 2] ...`
 * (không truyền gì thì quét các file mặc định dưới đây)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";

const MAC_DINH = [
  "docs/sgk_audit_lop1.md",
  "docs/sgk_map_lop1.md",
  "docs/sgk_curriculum_standardization_plan.md",
  "supabase/content-seed/100-tang-phien-ban-sau-bo-sung.sql",
];

function fileTrong(dir, duoi) {
  const out = [];
  for (const ten of readdirSync(dir)) {
    const p = `${dir}/${ten}`;
    if (statSync(p).isDirectory()) out.push(...fileTrong(p, duoi));
    else if (duoi.some((d) => ten.endsWith(d))) out.push(p);
  }
  return out;
}

const muc = process.argv.slice(2);
const files = muc.length
  ? muc.flatMap((m) =>
      statSync(m).isDirectory() ? fileTrong(m, [".md", ".js", ".jsx", ".sql"]) : [m],
    )
  : MAC_DINH;

let tong = 0;
for (const f of files) {
  const t = readFileSync(f, "utf8");
  const bad = [];
  for (let i = 0; i < t.length; i++) {
    const cp = t[i].codePointAt(0);
    let nhan = null;
    if (cp === 0xfffd) nhan = "U+FFFD";
    else if (cp >= 0x300 && cp <= 0x36f) nhan = `dấu rời U+${cp.toString(16).toUpperCase()}`;
    else if (cp >= 0xd800 && cp <= 0xdbff) {
      const sau = t.charCodeAt(i + 1);
      if (!(sau >= 0xdc00 && sau <= 0xdfff)) nhan = "surrogate mồ côi";
    } else if (cp >= 0xdc00 && cp <= 0xdfff) {
      const truoc = t.charCodeAt(i - 1);
      if (!(truoc >= 0xd800 && truoc <= 0xdbff)) nhan = "surrogate mồ côi";
    }
    if (nhan) bad.push({ nhan, quanh: t.slice(i - 22, i + 22).replace(/\n/g, "⏎") });
  }
  if (bad.length) {
    tong += bad.length;
    console.log(`\n❌ ${f}: ${bad.length} chỗ`);
    for (const b of bad) console.log(`   ${b.nhan} :: ...${b.quanh}...`);
  }
}
console.log(
  `\nĐã soi ${files.length} file · ${tong ? `${tong} chỗ lỗi` : "✅ không có ký tự lỗi"}`,
);
process.exit(tong ? 1 : 0);
