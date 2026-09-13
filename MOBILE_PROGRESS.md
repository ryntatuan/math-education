# 📱 TIẾN ĐỘ XÂY DỰNG MOBILE APP (ANDROID & iOS) - TOÁN VUI

> **Trạng thái hiện tại:** Đã hoàn thành 100% Giai đoạn 1, 2 và 3. Sẵn sàng mã nguồn Native Android & iOS, luồng CI/CD build APK tự động qua GitHub Actions.
> **Cập nhật lần cuối:** 13/09/2026

---

## 📊 Bảng Tiến Độ Tổng Thể (Progress Overview)

| Giai đoạn | Nội dung công việc | Trạng thái | Ghi chú kỹ thuật |
| :--- | :--- | :---: | :--- |
| **Giai đoạn 1** | Cài đặt Capacitor 7.x & khởi tạo Android/iOS Native |  **100% Xong** | `@capacitor/core@7`, `@capacitor/cli@7`, sinh `client/android` & `client/ios` |
| **Giai đoạn 2** | Tối ưu UI/UX Mobile, Safe Area Inset, Haptics & Lifecycle |  **100% Xong** | `--sat`, `--sab`, Header/BottomNav notch support, Hardware back button |
| **Giai đoạn 3** | Deep Linking `toanvui://`, Google Auth Native & Network Reconnect |  **100% Xong** | Intent Filter Android, URL Types iOS, tự động nhặt OAuth session token |
| **Giai đoạn 4** | Build bản cài đặt Android (.apk) & iOS (.ipa) |  **Sẵn sàng** | Có sẵn GitHub Actions CI/CD tự build `app-debug.apk` không cần cài Android SDK trên máy |

---

## 🛠️ Chi Tiết Các Hạng Mục Đã Triển Khai

### 1. Kiến Trúc Native & Công Nghệ Đã Cài Đặt
- **Framework:** Capacitor v7.x (tương thích tối ưu với Node v20 LTS trên máy phát triển).
- **Gói Native:**
  - `@capacitor/core` & `@capacitor/cli`
  - `@capacitor/android`: Dự án Android Gradle hoàn chỉnh tại `client/android/`.
  - `@capacitor/ios`: Dự án iOS Xcode hoàn chỉnh tại `client/ios/`.
  - `@capacitor/app`: Bắt sự kiện phím cứng Back trên Android, deep link URL open.
  - `@capacitor/haptics`: Phản hồi rung xúc giác cho trải nghiệm trẻ em (chọn đáp án, đúng, sai, thăng cấp).
  - `@capacitor/status-bar`: Đồng bộ màu thanh trạng thái máy với giao diện app.
  - `@capacitor/splash-screen`: Màn hình chờ chuyển mượt màu `#4ECDC4`.
  - `@capacitor/network`: Tự động kích hoạt đồng bộ dữ liệu (`syncService.scheduleCloudSync()`) khi thiết bị có mạng trở lại.

### 2. Tối Ưu Giao Diện & Tránh Lỗi Responsive Trên Điện Thoại
- **Safe Area Inset (Tai thỏ / Dynamic Island / Nốt ruồi):**
  - Đã cấu hình `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">` tại `client/index.html`.
  - Khởi tạo 4 biến toàn cục CSS tại `client/src/index.css`:
    ```css
    :root {
      --sat: env(safe-area-inset-top, 0px);
      --sab: env(safe-area-inset-bottom, 0px);
      --sal: env(safe-area-inset-left, 0px);
      --sar: env(safe-area-inset-right, 0px);
    }
    ```
  - `Header.css`: Chiều cao tự động tính `calc(60px + var(--sat))` và `padding-top: var(--sat)`. Tránh 100% trường hợp header bị tai thỏ đè lên trên iPhone / điện thoại Android tràn viền.
  - `BottomNav.css`: Sử dụng khoảng cách an toàn `padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px))` để không bị thanh vuốt Home bar của iOS/Android che khuất.
  - `.page-wrapper`: Tự động thêm khoảng đệm an toàn trên dưới cho toàn bộ các trang nội dung.
- **Rung phản hồi xúc giác (Tactile Haptics):**
  - Tạo `client/src/utils/hapticsManager.js` kết nối trực tiếp vào `soundManager.js`:
    - Nhấn nút, lật thẻ: Rung nhẹ (`Haptics.impact({ style: ImpactStyle.Light })`).
    - Trả lời đúng, nhận xu, hoàn thành: Rung mừng chiến thắng (`NotificationType.Success`).
    - Trả lời sai: Rung cảnh báo (`NotificationType.Error`).
    - Tự động fallback sang `navigator.vibrate` khi chạy trên trình duyệt web.

### 3. Xử Lý Phím Cứng & Vòng Đời Mobile (`useMobileLifecycle.js`)
- Tích hợp tại gốc ứng dụng `client/src/App.jsx`.
- **Phím Back phần cứng (Android):**
  - Nếu đang mở modal (như AuthModal): Tự động đóng modal trước.
  - Nếu đang ở trang chủ (`/`): Nhấn 2 lần trong 2 giây mới thoát ứng dụng (có thông báo rõ ràng, tránh trẻ lỡ tay bấm nhầm văng ra ngoài).
  - Nếu đang ở trang con (Bài học, Trò chơi, Xếp hạng...): Quay lại màn hình trước đó (`navigate(-1)`).
- **Deep Linking Google OAuth (`toanvui://`):**
  - Đã cấu hình Intent Filter trong `client/android/app/src/main/AndroidManifest.xml`.
  - Đã cấu hình `CFBundleURLTypes` trong `client/ios/App/App/Info.plist`.
  - Cập nhật `signInWithGoogle` trong `client/src/store/useAuthStore.js`: Tự động nhận biết nền tảng Native để đặt `redirectTo: 'toanvui://auth/callback'`, tự giải mã `access_token` và `refresh_token` khi app được kích hoạt từ trình duyệt.

---

## 🚀 Hướng Dẫn Biên Dịch & Chạy Thử Ứng Dụng

### Cách 1: Tự động Build file `app-debug.apk` trên GitHub Actions (Khuyên dùng - Không cần cài đặt máy)
Trong thư mục dự án đã tạo sẵn mẫu workflow tại `docs/build-mobile.yml`:
1. Trên giao diện web GitHub của repository: Bấm **Add file** -> **Create new file**.
2. Đặt đường dẫn tên file là `.github/workflows/build-mobile.yml`.
3. Copy toàn bộ nội dung từ file `docs/build-mobile.yml` dán vào và bấm **Commit changes**.
4. Vào tab **Actions** trên GitHub repository -> Chọn workflow **Build Mobile App (Android APK)** -> Bấm **Run workflow**.
5. Sau ~3 phút, tải file `ToanVui-Debug-APK.zip` (bên trong có file cài đặt `app-debug.apk`) tại mục **Artifacts** và cài đặt trực tiếp lên điện thoại Android!

### Cách 2: Mở & chạy bằng Android Studio trên máy cá nhân
*(Cần cài đặt Android Studio & Android SDK)*
```bash
cd client
npm run mobile:android
```
Sau đó bấm nút **Run** (biểu tượng tam giác xanh) trong Android Studio để chạy máy ảo hoặc cài lên máy thật kết nối qua cáp USB.

### Cách 3: Mở & chạy bằng Xcode trên máy Mac (dành cho iOS)
*(Cần máy tính macOS & Xcode)*
```bash
cd client
npm run mobile:ios
```
Trong Xcode, chọn thiết bị iPhone mô phỏng hoặc iPhone thật rồi bấm **Product -> Run**.

### Lệnh Đồng Bộ Nhanh Mỗi Khi Sửa Mã Nguồn Web:
```bash
cd client
npm run mobile:sync
```
*(Lệnh này sẽ tự động chạy `vite build` và chạy `cap sync` cập nhật ngay lập tức vào cả thư mục Android và iOS).*

---

## 📝 Nhật Ký Các Tệp Đã Tạo & Cập Nhật

1. `docs/build-mobile.yml` (Quy trình tự động đóng gói APK trên GitHub Actions)
2. `client/capacitor.config.json` (Cấu hình ứng dụng Toán Vui)
3. `client/src/hooks/useMobileLifecycle.js` (Quản lý nút back, thanh trạng thái, kết nối mạng, deep link)
4. `client/src/utils/hapticsManager.js` (Rung xúc giác bản địa)
5. `client/src/utils/soundManager.js` (Tích hợp haptics vào âm thanh)
6. `client/src/store/useAuthStore.js` (Hỗ trợ OAuth redirect toanvui:// trên native)
7. `client/src/index.css` (Cấu hình biến CSS Safe Area Inset)
8. `client/src/components/layout/Header.css` (Tối ưu padding tai thỏ)
9. `client/android/app/src/main/AndroidManifest.xml` (Khai báo scheme toanvui)
10. `client/android/app/src/main/res/values/strings.xml` (Cập nhật app scheme)
11. `client/ios/App/App/Info.plist` (Khai báo CFBundleURLTypes toanvui)
12. `client/package.json` (Bổ sung dependencies Capacitor 7 & các scripts `mobile:*`)
13. `MOBILE_PROGRESS.md` (Tài liệu ghi nhớ tiến độ này)

---

## 📌 Hướng Dẫn Tiếp Tục Cho Phiên Làm Việc Kế Tiếp (Khi Phục Hồi Token)
- Nếu muốn tùy biến thêm App Icon và Splash Screen: Có thể chuẩn bị 1 file ảnh logo `icon.png` (1024x1024px) và `splash.png` (2732x2732px) rồi chạy công cụ sinh tự động:
  ```bash
  npx @capacitor/assets generate --iconBackgroundColor "#ffffff" --splashBackgroundColor "#4ecdc4"
  ```
- Dự án đã hoàn toàn độc lập, sạch sẽ và sẵn sàng 100% cho việc kiểm thử và phân phối.
