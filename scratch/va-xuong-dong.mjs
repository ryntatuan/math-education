#!/usr/bin/env node
/** Vá lỗi do công cụ sửa chèn XUỐNG DÒNG THẬT vào giữa một chuỗi trong dữ liệu.
 *  Trong dữ liệu, “xuống dòng” bên trong chuỗi phải là hai ký tự `\` + `n`.
 *
 *  node scratch/va-xuong-dong.mjs [--ghi]
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");
const FILE = "client/src/data/grade2/g2c6.js";

const raw = fs.readFileSync(FILE, "utf8");
const NL = raw.includes("\r\n") ? "\r\n" : "\n";
const tu = `(1 ngày = 24 giờ).${NL}Lên một bậc`;
const den = "(1 ngày = 24 giờ).\\nLên một bậc";

const n = raw.split(tu).length - 1;
console.log(`${FILE}: ${n} chỗ bị chèn xuống dòng thật`);
if (n) {
  if (GHI) fs.writeFileSync(FILE, raw.split(tu).join(den), "utf8");
  else console.log("(chạy thử — thêm --ghi để ghi)");
}
