// Chạy bộ cổng động và in kết quả bằng UTF-8 sạch.
//
// 🔴 VÌ SAO CẦN FILE NÀY. PowerShell 5.1 làm hỏng dấu tiếng Việt khi ống output
// (`... | Select-Object`) và ghi `>` bằng UTF-16. Cách duy nhất đọc sạch là để
// Node tự bắt output rồi in ra (hoặc ghi file UTF-8).
//
// CÁCH DÙNG:  node scratch/run-portal-test.mjs [--static]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = ["scripts/test-admin-portal.mjs", ...process.argv.slice(2)];

let out = "";
let code = 0;
try {
  out = execFileSync(process.execPath, args, { encoding: "utf8", cwd: ROOT });
} catch (e) {
  out = (e.stdout ?? "") + (e.stderr ?? "");
  code = e.status ?? 1;
}

fs.writeFileSync(
  path.join(ROOT, "scratch", "portal-test-output.txt"),
  out,
  "utf8",
);

const lines = out.split(/\r?\n/);
const tomTat = lines.filter((l) => /PASS.*FAIL.*SKIP|PASS ·|FAIL|LỖI/i.test(l));
const chiTiet = lines
  .map((l, i) => (l.includes("CHI TIẾT LỖI") ? i : -1))
  .filter((i) => i >= 0);

console.log("=== TÓM TẮT ===");
console.log(tomTat.slice(0, 6).join("\n") || "(không thấy dòng tóm tắt)");

for (const i of chiTiet) {
  console.log("\n=== CHI TIẾT LỖI ===");
  console.log(lines.slice(i, i + 30).join("\n"));
}

console.log(`\n(exit=${code} — output đầy đủ: scratch/portal-test-output.txt)`);
