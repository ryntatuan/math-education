#!/usr/bin/env node
/**
 * CHẠY MỘT CỔNG VÀ GHI KẾT QUẢ RA FILE UTF-8 — thay cho `node x.mjs > file` của PowerShell.
 *
 * 🔴 VÌ SAO CẦN. `node scratch/x.mjs > scratch/kq.txt` trong PowerShell 5.1 ghi file **UTF-16**
 * *qua codepage console* ⇒ tiếng Việt bị hỏng hai lớp (`Đã` → `É├ú`), đọc lại bằng bất kỳ cách
 * nào cũng sai. Đã mắc thật khi so danh sách ca trùng lặp (báo oan “NAY: 0 ca chi tiết”).
 *
 * Dùng: `node scratch/chay-ghi-utf8.mjs <script.mjs> [file-ra.txt]`
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [, , script, out, ...thua] = process.argv;
if (!script) {
  console.log(
    "Dùng: node scratch/chay-ghi-utf8.mjs <script.mjs> [file-ra.txt] [tham số thêm…]",
  );
  process.exit(2);
}
const r = spawnSync(process.execPath, [script, ...thua], {
  encoding: "utf8",
  maxBuffer: 1024 * 1024 * 256,
});
const dich =
  out ??
  path.join(
    "scratch",
    path.basename(script).replace(/\.mjs$/, "") + ".utf8.txt",
  );
fs.writeFileSync(dich, (r.stdout ?? "") + (r.stderr ?? ""), "utf8");
console.log(`${script} → ${dich} · mã thoát ${r.status}`);
