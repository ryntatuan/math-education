import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const clientDir = path.resolve(rootDir, 'client')
const androidDir = path.resolve(clientDir, 'android')
const builtApkPath = path.resolve(androidDir, 'app/build/outputs/apk/debug/app-debug.apk')
const targetDownloadsDir = path.resolve(clientDir, 'public/downloads')
const targetApk = path.resolve(targetDownloadsDir, 'ToanVui.apk')
const versionFile = path.resolve(targetDownloadsDir, 'version.json')

console.log('\n' + '='.repeat(55))
console.log('🤖 QUY TRÌNH BUILD TOÀN DIỆN (WEB + ANDROID APK)')
console.log('='.repeat(55))

// 0. Dọn dẹp sạch mọi file APK cũ trong assets/public để tránh bị Capacitor copy lặp lồng nhau
const cleanOldApks = () => {
  const dirs = [
    path.resolve(clientDir, 'public'),
    path.resolve(clientDir, 'public/downloads'),
    path.resolve(clientDir, 'dist'),
    path.resolve(clientDir, 'dist/downloads'),
    path.resolve(androidDir, 'app/src/main/assets/public'),
    path.resolve(androidDir, 'app/src/main/assets/public/downloads')
  ]
  for (const d of dirs) {
    if (fs.existsSync(d)) {
      try {
        const files = fs.readdirSync(d)
        for (const f of files) {
          if (f.endsWith('.apk')) {
            fs.unlinkSync(path.join(d, f))
          }
        }
      } catch {}
    }
  }
}
cleanOldApks()

// 1. Luôn build bản Web với Vite trước
console.log('\n🚀 [1/4] Đang build giao diện web (Vite production bundle)...')
execSync('npx vite build', { cwd: clientDir, stdio: 'inherit' })

// Kiểm tra môi trường Vercel hoặc Cloud không có Android SDK
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER)
if (isVercel) {
  console.log('\n☁️ Phát hiện môi trường Vercel: Đã build xong Web dist.')
  console.log('📦 Sẽ chuyển hướng tải APK qua GitHub Releases (đã cấu hình trong vercel.json).')
  console.log('='.repeat(55) + '\n')
  process.exit(0)
}

try {
  console.log('\n🔄 [2/4] Đang đồng bộ tài nguyên vào Android (Capacitor Sync)...')
  execSync('npx cap sync android', { cwd: clientDir, stdio: 'inherit' })

  console.log('\n📦 [3/4] Đang biên dịch file Android APK (Gradle assembleDebug)...')
  const isWindows = process.platform === 'win32'
  const gradlewCmd = isWindows ? 'cmd.exe /c "gradlew.bat assembleDebug"' : './gradlew assembleDebug'
  execSync(gradlewCmd, { cwd: androidDir, stdio: 'inherit' })

  console.log('\n🚚 [4/4] Đang cập nhật file APK vào thư mục downloads...')
  if (!fs.existsSync(builtApkPath)) {
    throw new Error(`Không tìm thấy file APK sau khi build: ${builtApkPath}`)
  }

  if (!fs.existsSync(targetDownloadsDir)) {
    fs.mkdirSync(targetDownloadsDir, { recursive: true })
  }

  // Copy sang public/downloads và dist/downloads
  fs.copyFileSync(builtApkPath, targetApk)
  const distDownloadsDir = path.resolve(clientDir, 'dist/downloads')
  if (fs.existsSync(distDownloadsDir)) {
    fs.copyFileSync(builtApkPath, path.resolve(distDownloadsDir, 'ToanVui.apk'))
  }

  const stats = fs.statSync(targetApk)
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
  const now = new Date()

  const meta = {
    appName: 'Toán Vui',
    version: '1.0.0',
    buildDate: now.toISOString(),
    buildDateFormatted: now.toLocaleString('vi-VN'),
    fileSizeBytes: stats.size,
    fileSizeMB: `${sizeMB} MB`,
    downloadUrl: '/downloads/ToanVui.apk'
  }

  fs.writeFileSync(versionFile, JSON.stringify(meta, null, 2), 'utf-8')

  console.log('\n' + '='.repeat(55))
  console.log('🎉 BUILD HOÀN TẤT THÀNH CÔNG CẢ WEB & APK!')
  console.log(`📁 File APK: client/public/downloads/ToanVui.apk`)
  console.log(`📊 Dung lượng APK chuẩn: ${sizeMB} MB (gọn nhẹ, không bị phình to)`)
  console.log(`⏱️ Thời gian build: ${now.toLocaleString('vi-VN')}`)
  console.log(`✨ File APK đã được thêm vào .gitignore để Git luôn nhẹ & push cực nhanh!`)
  console.log(`👉 Bạn chỉ cần: git commit & git push origin main là xong!`)
  console.log('='.repeat(55) + '\n')
} catch (error) {
  console.warn('\n⚠️ Cảnh báo trong quá trình build APK:', error.message)
  console.warn('ℹ️ Bản Web đã build thành công trong thư mục client/dist.')
}
