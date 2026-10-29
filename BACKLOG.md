# BACKLOG — Việc còn lại sau đợt rà soát 2026-10-29

Nguồn gốc: `docs/feedback/project-review.md` (nguồn chi tiết, **bị gitignore** — giữ trên máy).
File này là bản **được commit** để không bị mất khi đổi máy.

Trạng thái tính đến commit `9542f54`.

## ⛔ Quyết định sản phẩm — KHÔNG báo cáo lại

| Chủ đề | Quyết định | Ngày |
|---|---|---|
| Mã PIN phụ huynh | **Đã loại bỏ hoàn toàn.** Khu phụ huynh không yêu cầu PIN, không có màn hình khoá/đổi/quên PIN. Không đề xuất thêm PIN, hash PIN hay PIN mặc định nữa. | 2026-10-29 |

## ✅ Đã xong

| # | Việc | Commit |
|---|---|---|
| 1 | Revoke PAT GitHub lộ trong `.git/config`, đổi remote sạch, audit repo | (không phải code) |
| 2 | Khoá ngày theo giờ máy thay vì UTC (`utils/localDate.js`) + test | `cad9c57` |
| 5 | CI chạy `npm test` trước khi build APK | `e3eeb17` |
| 3 | TTS trong APK gọi proxy tuyệt đối + báo lỗi rõ ràng | `b25358e` |
| 4 | Bỏ PIN phụ huynh (quyết định sản phẩm) | `bd6660a` |
| 🟡 | `/api/tts`: chặn method lạ, giới hạn 200 ký tự, rate-limit 40/phút/IP, bỏ CORS `*` | `9542f54` |

## 🔴 Việc đang chặn

**Chưa push được 5 commit** (`main` ahead 5) — Credential Manager chưa có phiên đăng nhập sau khi revoke PAT.
Cần làm **một lần** trong terminal VS Code tại repo:

```powershell
git push origin main      # cửa sổ GCM hiện ra -> "Sign in with your browser" -> Authorize
```

Sau khi push xanh, bật branch protection cho `main` và chọn check `Build & Release Android APK` là required
(repo → Settings → Branches). **Chỉ bật required status check**, đừng bật "Require PR" vì quy trình hiện tại là push thẳng `main` để phát hành.

## 🟠 Chưa làm — cần quyết định

### 6. Khoá ký APK là khoá debug công khai, nằm trong repo
- **Hiện trạng:** `client/android/app/toanvui.keystore` **được track**, `storePassword`/`keyPassword` = `android`, alias `androiddebugkey`, `minifyEnabled false` ([build.gradle](client/android/app/build.gradle)).
- **Hệ quả:** ai cũng ký được APK cùng chữ ký; không thể lên Google Play; không bật được R8/minify vì thiếu cấu hình ProGuard an toàn.
- **Cần quyết định:** thời điểm đổi sang khoá riêng (đổi khoá ⇒ người dùng cũ **phải gỡ và cài lại**). Sau đó: nạp keystore + mật khẩu qua GitHub Secrets, truyền vào Gradle, bật `minifyEnabled`/`shrinkResources` và kiểm tra APK không vỡ.

### 7. Bundle web chính 2,3 MB
- **Hiện trạng:** `client/dist/assets/index-*.js` ≈ 2 390 kB; dữ liệu 5 lớp (~2,5 MB source: grade1 512, grade2 550, grade3 619, grade4 413, grade5 393 kB) import tĩnh qua [contentSource.js](client/src/data/contentSource.js) nên vào thẳng entry.
- **Cần làm:** nạp dữ liệu theo lớp bằng `import()` + cache theo lớp đang chọn; đo lại bundle sau khi tách. (APK không bị ảnh hưởng — chỉ web.)

## 🟡 Chưa làm — nhỏ, làm dần

| Việc | Ghi chú |
|---|---|
| README lỗi thời | Ghi "Lớp 1–3", React 18, Framer Motion 11, Zustand 4.5; thực tế Lớp 1–5, React 19.2, framer-motion 13, zustand 5. |
| Giảm chuyển động (a11y) | Chỉ `PetWidget.css` có `prefers-reduced-motion`. Animation framer-motion và confetti (28 chỗ) luôn chạy → thêm `<MotionConfig reducedMotion="user">` và tôn trọng cờ này ở confetti. |
| 44 cảnh báo oxlint | `--quiet` đang ẩn; không chặn CI. Dọn dần theo file (`GamesPage.jsx`, `Grade1NumberVisuals.jsx` nhiều nhất). |
| Gộp nhầm câu sai | `recordMistake` so theo `m.question` ⇒ hai câu khác nhau nhưng cùng lời hỏi bị gộp. Nên so theo `ref` trước, `question` chỉ là fallback cho dữ liệu cũ. |
| Dữ liệu trẻ em (NĐ13/2023) | Có đăng nhập Google + hồ sơ bé nhưng chỉ 1 dòng `auth-privacy-note`; chưa có chính sách bảo mật/đồng ý của phụ huynh. Bắt buộc phải có nếu phát hành công khai. |
| Rate-limit `/api/tts` chỉ best-effort | Bộ đếm nằm trong RAM từng instance serverless; muốn chính xác cần Vercel KV/Upstash. |
| Dev server không áp rate-limit | `vite.config.js` có middleware TTS riêng (chỉ dùng khi dev). Cân nhắc dùng chung một module để khỏi lệch logic. |
| `docs/build-mobile.yml` là bản nháp cũ | 1,4 kB, khác hoàn toàn bản thật 5,8 kB trong `.github/workflows/`. Có thể xoá để khỏi nhầm. |

## ⚪ Ghi chú kỹ thuật đã xác minh (không cần làm)

- RLS: 14 bảng bật RLS; bảng dữ liệu trẻ chỉ có policy `*_admin_*` + "Parents can manage own children". Không thấy hở quyền.
- Không có `service_role` key ở client/admin/api.
- `useLeagueStore`/`usePetStore` **không** dính lỗi múi giờ (league dùng `getDay()`, pet dùng epoch ms).
- File lớn (`Grade1NumberVisuals.jsx` 121 kB, `GamesPage.jsx` 76 kB, `khongGian.jsx` 73 kB) là nợ bảo trì, không phải bug.
