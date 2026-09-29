#!/usr/bin/env node
/**
 * Chạy MỘT script và lưu TOÀN BỘ kết quả ra file UTF-8 (không qua ống của PowerShell — ống làm hỏng
 * dấu tiếng Việt và có thể cắt tiến trình).
 *
 *   node scratch/chay-mot-cong.mjs <tên-script> [nhãn]
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ten = process.argv[2];
const nhan = process.argv[3] ?? "nay";
let out = "";
let ma = 0;
try {
  out = execFileSync(process.execPath, [path.join("scratch", ten)], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch (e) {
  ma = e.status ?? -1;
  out = `${e.stdout ?? ""}${e.stderr ?? ""}`;
}
const f = `scratch/${ten.replace(/\.mjs$/, "")}.${nhan}.out.txt`;
fs.writeFileSync(f, `exit=${ma}\n${out}`, "utf8");
console.log(`${ten} [${nhan}] exit=${ma} → ${f}`);
