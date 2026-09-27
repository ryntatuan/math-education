/**
 * ĐẨY NHIỀU PHIÊN BẢN LIÊN TIẾP — mỗi phiên bản là MỘT lần build thật (web + APK) rồi commit + push.
 *
 * Chạy: `node scratch/day-nhieu-phien-ban.mjs auto auto auto auto auto auto 1.1.0`
 *   • `auto`       = để `scripts/build-apk.mjs` tự tăng số cuối (1.0.49 → 1.0.50 → 1.0.51 …)
 *   • `1.1.0`      = đặt ĐÚNG phiên bản đó (`bump-version.mjs` nhận tham số dạng `x.y.z`)
 *
 * VÌ SAO CÓ FILE NÀY (yêu cầu người dùng 2026-09-28): họ muốn đi hết dãy 1.0.50…1.0.55 rồi mới
 * sang 1.1.0, tức **7 lần build + commit + push**. Gõ tay 7 lần thì dễ sót một bước (quên push,
 * hoặc push nhầm khi build lỗi), mà mỗi lần sót là một tag GitHub sai phiên bản.
 *
 * ⚠️ DỪNG NGAY NẾU MỘT BƯỚC LỖI (`execSync` ném lỗi ⇒ script thoát) — thà phát hành thiếu còn
 * hơn commit một phiên bản mà APK không khớp. Ví dụ: build đỏ thì KHÔNG có commit nào cho bước đó.
 * ⚠️ Chỉ chạy khi người dùng đã cho phép commit + push (quy ước của dự án).
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const appVersionFile = path.join(root, "client/src/config/appVersion.js");
const gradleFile = path.join(root, "client/android/app/build.gradle");
const apkFile = path.join(root, "client/public/downloads/ToanVui.apk");

const readFile = (p) => fs.readFileSync(p, "utf-8");
const readVersion = () => (readFile(appVersionFile).match(/'([^']+)'/) ?? [])[1] ?? "?";
const readVersionCode = () => (readFile(gradleFile).match(/versionCode\s+(\d+)/) ?? [])[1] ?? "?";

const run = (cmd) => execSync(cmd, { cwd: root, stdio: "inherit" });

const targets = process.argv.slice(2);
if (!targets.length) {
  console.log(
    "Thiếu danh sách phiên bản.\n" +
      "Ví dụ: node scratch/day-nhieu-phien-ban.mjs auto auto auto auto auto auto 1.1.0",
  );
  process.exit(1);
}

console.log(
  `\nSẽ đẩy ${targets.length} phiên bản, bắt đầu từ ${readVersion()}: ${targets.join(" → ")}`,
);

for (const [i, target] of targets.entries()) {
  const nhan = target === "auto" ? "(tự tăng số cuối)" : target;
  console.log(
    `\n${"=".repeat(60)}\n[${i + 1}/${targets.length}] BUILD ${nhan}\n${"=".repeat(60)}`,
  );

  const truoc = readVersion();
  run(`npm run build${target === "auto" ? "" : ` -- ${target}`}`);

  const ver = readVersion();
  if (ver === truoc) {
    console.log(`❌ Phiên bản KHÔNG đổi (vẫn ${ver}) — dừng, không commit.`);
    process.exit(1);
  }
  const apkSize = fs.statSync(apkFile).size;
  console.log(
    `\n✅ Build xong: ${truoc} → ${ver} · versionCode ${readVersionCode()} · APK ${apkSize} byte`,
  );

  run("git add -A");
  run(`git commit -q -m "chore(release): ${ver}"`);
  run("git push origin main");
  console.log(`✓ Đã commit + push ${ver}`);
}

console.log(`\n${"=".repeat(60)}\nXONG — phiên bản hiện tại: ${readVersion()}\n${"=".repeat(60)}`);
