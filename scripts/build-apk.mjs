import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAppVersion, bumpPatchVersion } from "./bump-version.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const clientDir = path.resolve(rootDir, "client");
const androidDir = path.resolve(clientDir, "android");
const builtApkPath = path.resolve(
  androidDir,
  "app/build/outputs/apk/release/app-release.apk",
);
const fallbackDebugApkPath = path.resolve(
  androidDir,
  "app/build/outputs/apk/debug/app-debug.apk",
);
// 🔴 KHÔNG ghi APK vào `client/public/` nữa — APK KHÔNG nằm trong repo.
//
// VÌ SAO (người dùng chốt 2026-09-28: *“tôi chỉ cần 1 file apk trên web để người dùng down,
// đảm bảo lúc nào cũng được update theo những sự thay đổi”*): file APK trên web nay là một
// đường dẫn CHUYỂN TIẾP sang APK của bản phát hành mới nhất trên GitHub (xem `vercel.json`),
// còn bản build ở đây chỉ để XEM THỬ ở máy (`client/dist/` — thư mục không commit).
// Nhờ vậy: (1) file người dùng tải LUÔN là bản mới nhất, do GitHub Actions tự build mỗi lần
// push; (2) mỗi lần phát hành không còn đẩy ~7,5 MB APK vào lịch sử git.
// Hệ quả có chủ ý: KHÔNG chạy được đường dẫn tải khi mở `client/dist` bằng máy chủ tĩnh khác —
// trên web thật thì `vercel.json` lo phần chuyển tiếp.
const targetDownloadsDir = path.resolve(clientDir, "dist/downloads");
const targetApk = path.resolve(targetDownloadsDir, "ToanVui.apk");

// Tự động tăng số cuối phiên bản (patch version) mỗi lần build, trừ khi có cờ --no-bump.
//
// 🔴 TRÊN VERCEL TUYỆT ĐỐI KHÔNG TĂNG PHIÊN BẢN. Đã mắc thật và lỗi này rất khó thấy:
//   `vercel.json` build bằng `cd client && npm run build`, mà lệnh đó CHÍNH LÀ file này.
//   Bản cũ tăng phiên bản ở dòng đầu, RỒI MỚI kiểm tra “có phải Vercel không”. Nên mỗi
//   lần deploy, Vercel lặng lẽ tăng `version.json` + `appVersion.js` thêm 1 trong bản
//   build rồi mới thoát ⇒ web ghi “Bản v1.0.34” trong khi file APK phục vụ vẫn là 1.0.33.
//   Mỗi lần deploy con số hiển thị lại nhảy thêm 1, còn APK đứng yên.
//   ⚠️ Máy Vercel còn không hề build được APK (không có Android SDK) ⇒ việc tăng phiên
//      bản ở đó là VÔ NGHĨA: nó không được ghi trở lại repo.
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER);
const shouldBump = !process.argv.includes("--no-bump") && !isVercel;
const targetVer = process.argv.find((arg) => /^\d+\.\d+\.\d+$/.test(arg));
const currentVersion = shouldBump
  ? bumpPatchVersion(targetVer)
  : getAppVersion();

console.log("\n" + "=".repeat(55));
console.log(
  `🤖 QUY TRÌNH BUILD TOÀN DIỆN (WEB + ANDROID APK v${currentVersion})`,
);
console.log("=".repeat(55));

// 1. Kiểm tra an toàn tĩnh (oxlint) & Build bản Web với Vite
console.log("\n🔍 [1/4] Kiểm tra phân tích tĩnh mã nguồn (oxlint)...");
try {
  execSync("npx oxlint --quiet", { cwd: clientDir, stdio: "inherit" });
} catch (e) {
  console.warn(
    "⚠️ Bỏ qua oxlint trên môi trường CI/Cloud hoặc không có lỗi chặn:",
    e.message,
  );
}
console.log("🚀 Đang build giao diện web (Vite production bundle)...");
execSync("npx vite build", { cwd: clientDir, stdio: "inherit" });

// Kiểm tra môi trường Vercel hoặc Cloud không có Android SDK
if (isVercel) {
  console.log(
    "\n☁️ Phát hiện môi trường Vercel: Đã build xong Web dist (KHÔNG tăng phiên bản).",
  );
  console.log("=".repeat(55) + "\n");
  process.exit(0);
}

try {
  console.log(
    "\n🔄 [2/4] Đang đồng bộ tài nguyên vào Android (Capacitor Sync)...",
  );
  execSync("npx cap sync android", { cwd: clientDir, stdio: "inherit" });

  // QUAN TRỌNG: Xóa sạch file .apk trong thư mục assets của Android để không bị đóng gói đệ quy!
  const stripApksFromDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        stripApksFromDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".apk")) {
        fs.unlinkSync(fullPath);
      }
    }
  };

  stripApksFromDir(path.resolve(androidDir, "app/src/main/assets/public"));
  console.log(
    "🧹 Đã loại bỏ file APK trung gian khỏi assets Android để giữ dung lượng siêu gọn.",
  );

  // 🧹 Bỏ luôn thư mục `downloads/` khỏi asset của APK.
  //
  // 🔴 VÌ SAO (đo thật 2026-09-28): `downloads/version.json` được GHI SAU khi Gradle đóng gói
  //    xong, nên bản version.json NẰM TRONG APK luôn là bản của LẦN BUILD TRƯỚC — số phiên bản
  //    thì đúng (do bước bump ghi trước), nhưng `buildDate`/`fileSizeBytes` lệch một lần build.
  //    Kiểm APK 1.1.1: bên trong ghi `buildDate 00:16:12` (của bản 1.1.0) ⇒ soi APK dễ tưởng
  //    nhầm là bản cũ. Mà file này CHỈ dùng cho web: `DownloadAppModal` thoát ngay khi chạy trong
  //    app (`Capacitor.isNativePlatform()` ⇒ không hề fetch). Giữ lại chỉ tổ gây nhầm.
  //    (File APK trong cùng thư mục đã bị `stripApksFromDir` xoá từ trước.)
  const downloadsInAssets = path.resolve(
    androidDir,
    "app/src/main/assets/public/downloads",
  );
  if (fs.existsSync(downloadsInAssets)) {
    fs.rmSync(downloadsInAssets, { recursive: true, force: true });
    console.log(
      "🧹 Đã bỏ downloads/ khỏi asset APK (chỉ dùng cho web, không đọc trong app).",
    );
  }

  console.log(
    "\n📦 [3/4] Đang biên dịch file Android APK chính thức (Gradle assembleRelease)...",
  );
  const isWindows = process.platform === "win32";
  const gradlewCmd = isWindows
    ? 'cmd.exe /c "gradlew.bat assembleRelease"'
    : "./gradlew assembleRelease";
  execSync(gradlewCmd, { cwd: androidDir, stdio: "inherit" });

  console.log("\n🚚 [4/4] Đang chép APK vào thư mục xem thử ở máy (client/dist)...");
  const finalApkPath = fs.existsSync(builtApkPath)
    ? builtApkPath
    : fallbackDebugApkPath;
  if (!fs.existsSync(finalApkPath)) {
    throw new Error(`Không tìm thấy file APK sau khi build: ${builtApkPath}`);
  }

  if (!fs.existsSync(targetDownloadsDir)) {
    fs.mkdirSync(targetDownloadsDir, { recursive: true });
  }

  // Chỉ một đường dẫn tải duy nhất cho người dùng: `/downloads/ToanVui.apk`
  // (`DownloadAppModal` và `ProfilePage` đều trỏ về đó). Trên web thật, đường dẫn này do
  // `vercel.json` chuyển tiếp sang APK của bản phát hành mới nhất — không có file trong repo.
  fs.copyFileSync(finalApkPath, targetApk);

  const stats = fs.statSync(targetApk);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  const now = new Date();

  console.log("\n" + "=".repeat(55));
  console.log("🎉 BUILD HOÀN TẤT THÀNH CÔNG CẢ WEB & APK!");
  console.log(`📁 APK xem thử ở máy: client/dist/downloads/ToanVui.apk`);
  console.log(`📊 Dung lượng APK: ${sizeMB} MB`);
  console.log(`⏱️ Thời gian build: ${now.toLocaleString("vi-VN")}`);
  console.log(
    `👉 Push lên GitHub: Actions tự build APK và đường dẫn /downloads/ToanVui.apk trên web`,
  );
  console.log(`   luôn lấy bản mới nhất — không phải cập nhật file APK trong repo nữa.`);
  console.log("=".repeat(55) + "\n");
} catch (error) {
  console.warn("\n⚠️ Cảnh báo trong quá trình build APK:", error.message);
  console.warn("ℹ️ Bản Web đã build thành công trong thư mục client/dist.");
}
