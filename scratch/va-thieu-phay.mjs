/**
 * VÁ LỖI “THIẾU DẤU PHẨY” do `tach-slide-nhieu-hinh.mjs` gây ra (2026-09-24).
 *
 * Khi tách một slide thành hai, block thứ hai được chèn mà **quên dấu phẩy** ngăn cách với
 * slide kế tiếp ⇒ `SyntaxError: Unexpected token '{'`. Mẫu nhận diện rất chắc:
 *   một dòng `        }` (đóng slide, 8 dấu cách) rồi ngay sau là `        {` (mở slide mới).
 * KHÔNG thể khớp nhầm trong chuỗi, vì trong JavaScript chuỗi **không được xuống dòng thật**
 * (xuống dòng trong dữ liệu luôn viết là `\n` hai ký tự).
 *
 *   node scratch/va-thieu-phay.mjs          (chạy thử)
 *   node scratch/va-thieu-phay.mjs --ghi    (ghi thật, có tự kiểm sau khi ghi)
 */
import fs from "node:fs";
import path from "node:path";

const GHI = process.argv.includes("--ghi");
const DIR = "client/src/data";
const MAU = /\n {8}\}\n {8}\{/g;

const files = [];
for (const d of fs.readdirSync(DIR)) {
  const p = path.join(DIR, d);
  if (!fs.statSync(p).isDirectory() || !/^grade\d$/.test(d)) continue;
  for (const f of fs.readdirSync(p))
    if (/^g\d+c\d+\.js$/.test(f)) files.push(path.join(p, f));
}

let tong = 0;
for (const file of files) {
  const goc = fs.readFileSync(file, "utf8");
  const soLan = (goc.match(MAU) || []).length;
  if (soLan === 0) continue;
  tong += soLan;
  if (GHI) {
    fs.writeFileSync(file, goc.replace(MAU, "\n        },\n        {"), "utf8");
    const lai = fs.readFileSync(file, "utf8");
    const con = (lai.match(MAU) || []).length;
    console.log(`${path.basename(file)}: vá ${soLan} chỗ · còn lại ${con}`);
  } else {
    console.log(`${path.basename(file)}: sẽ vá ${soLan} chỗ`);
  }
}
console.log(`\nTỔNG: ${tong}${GHI ? " (đã ghi)" : " (chạy thử — thêm --ghi)"}`);
