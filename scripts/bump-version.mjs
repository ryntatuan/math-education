import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const clientDir = path.resolve(rootDir, 'client')

export function getAppVersion() {
  const versionFile = path.resolve(clientDir, 'src/config/appVersion.js')
  if (fs.existsSync(versionFile)) {
    const content = fs.readFileSync(versionFile, 'utf-8')
    const match = content.match(/APP_VERSION\s*=\s*['"]([^'"]+)['"]/)
    if (match) return match[1]
  }
  return '1.0.1'
}

export function bumpPatchVersion(customVersion) {
  let newVersion = customVersion
  const currentVersion = getAppVersion()

  if (!newVersion) {
    const parts = currentVersion.split('.').map(Number)
    if (parts.length === 3 && !parts.some(isNaN)) {
      parts[2] += 1
      newVersion = parts.join('.')
    } else {
      newVersion = '1.0.2'
    }
  }

  // 1. Cập nhật client/src/config/appVersion.js
  const appVersionPath = path.resolve(clientDir, 'src/config/appVersion.js')
  fs.writeFileSync(appVersionPath, `export const APP_VERSION = '${newVersion}'\nexport default APP_VERSION\n`, 'utf-8')

  // 2. Cập nhật client/public/downloads/version.json
  const versionJsonPath = path.resolve(clientDir, 'public/downloads/version.json')
  if (fs.existsSync(versionJsonPath)) {
    try {
      const vData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf-8'))
      vData.version = newVersion
      fs.writeFileSync(versionJsonPath, JSON.stringify(vData, null, 2), 'utf-8')
    } catch {}
  }

  // 3. Cập nhật các file package.json
  const updatePkg = (pkgPath) => {
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        pkg.version = newVersion
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
      } catch {}
    }
  }
  updatePkg(path.resolve(rootDir, 'package.json'))
  updatePkg(path.resolve(clientDir, 'package.json'))

  // 4. Cập nhật Android app/build.gradle
  const buildGradlePath = path.resolve(clientDir, 'android/app/build.gradle')
  if (fs.existsSync(buildGradlePath)) {
    let gradleContent = fs.readFileSync(buildGradlePath, 'utf-8')
    gradleContent = gradleContent.replace(/versionName\s+["'][^"']+["']/, `versionName "${newVersion}"`)
    const parts = newVersion.split('.').map(Number)
    if (parts.length === 3 && !parts.some(isNaN)) {
      const code = parts[0] * 10000 + parts[1] * 100 + parts[2]
      gradleContent = gradleContent.replace(/versionCode\s+\d+/, `versionCode ${code}`)
    }
    fs.writeFileSync(buildGradlePath, gradleContent, 'utf-8')
  }

  console.log(`✨ Đã cập nhật phiên bản: ${currentVersion} -> ${newVersion}`)
  return newVersion
}

if (process.argv[1] && process.argv[1].endsWith('bump-version.mjs')) {
  const target = process.argv[2]
  bumpPatchVersion(target)
}
