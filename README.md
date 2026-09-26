# 🧮 TOÁN VUI — Ứng Dụng Học Toán Tương Tác Cho Trẻ Em (Lớp 1 – 3)

<p align="center">
  <img src="./client/src/assets/hero.png" alt="Toán Vui Hero" width="600" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <strong>Nền tảng học toán thông minh, sinh động, chuẩn theo chương trình Giáo dục Phổ thông 2018 của Bộ Giáo dục & Đào tạo Việt Nam.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.0-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge" alt="Zustand" />
  <img src="https://img.shields.io/badge/Web_Audio_API-Native-success?style=for-the-badge" alt="Web Audio API" />
</p>

---

## 🌟 Giới Thiệu Dự Án

**Toán Vui** là ứng dụng web giáo dục được thiết kế dành riêng cho học sinh tiểu học (từ Lớp 1 đến Lớp 3), kết hợp giữa **phương pháp sư phạm trực quan** và **yếu tố Gamification (trò chơi hóa)** giúp trẻ xây dựng nền tảng tư duy toán học vững chắc, học mà chơi — chơi mà học mà không cảm thấy áp lực.

---

## ✨ Tính Năng Nổi Bật

### 1. 📚 Chương Trình Học Toàn Diện (Lớp 1 – 3)

- **Lớp 1:** Nhận biết số 1–100, phép cộng trừ phạm vi 10 & 20, so sánh lớn bé bằng, hình học trực quan (hình tròn, vuông, tam giác, chữ nhật), xem đồng hồ và đo độ dài cơ bản.
- **Lớp 2:** Bảng nhân & chia 2, 3, 4, 5; phép cộng trừ có nhớ phạm vi 100 & 1000; đo lường thực tế (mét, đề-xi-mét, xăng-ti-mét, ki-lô-gam, lít).
- **Lớp 3:** Bảng nhân & chia 6, 7, 8, 9; phép chia có dư; làm quen phân số đơn giản ($1/2, 1/3, 1/4...$); chu vi hình chữ nhật, hình vuông; tiền Việt Nam.

### 2. 🏎️ Mini Games Học Tập Đỉnh Cao

- **🏎️ Cuộc Đua Toán Học (Math Race):**
  - Bé đua xe cùng 3 đối thủ máy (Thỏ Tốc Độ, Rùa Chăm Chỉ, Mèo Vàng).
  - Trả lời đúng phép tính để nhấn ga tăng tốc về đích.
  - Giao diện thiết kế 2x2 chống xê dịch nút bấm, hỗ trợ câu hỏi đếm số lượng thông minh và câu hỏi hình học SVG.
  - Hệ thống huy chương vinh danh chuẩn: 🥇 Huy chương Vàng, 🥈 Huy chương Bạc, 🥉 Huy chương Đồng và 🎖️ Huy chương Nỗ lực.
- **🎯 Bắn Bóng Số Bay (Number Pop):**
  - Các quả bóng bay rực rỡ mang đáp số bay lơ lửng.
  - Bé nhẩm tính và bắn chính xác quả bóng mang kết quả đúng trong thời gian 45 giây.
- **🃏 Lật Thẻ Trí Nhớ (Memory Match):**
  - Rèn luyện trí nhớ không gian và phản xạ tính nhẩm bằng cách lật ghép cặp giữa phép tính và kết quả.

### 3. 🛍️ Cửa Hàng Phần Thưởng & Kinh Tế Game Bền Vững

- Bé tích lũy **Xu Vàng** từ việc hoàn thành bài học, giải thử thách và chiến thắng cuộc đua.
- Dùng xu mở khóa các nhân vật ngộ nghĩnh trong Cửa Hàng: _Cú Mèo Tri Thức 🦉, Siêu Nhân Toán Học 🦸, Kỳ Lân Cầu Vồng 🦄, Robot Tính Nhanh 🤖, Rồng Con May Mắn 🐲..._
- Lưu trữ dữ liệu vĩnh viễn qua `LocalStorage` (`Zustand Persist`), không lo mất nhân vật khi F5 trang.

### 4. 🏆 Thử Thách Mỗi Ngày (Daily Challenge) & Chuỗi Học Streak

- Mỗi ngày gồm 3 cấp độ thử thách: **Khởi động (Dễ)**, **Tăng tốc (Vừa)**, **Bứt phá (Khó)**.
- Duy trì chuỗi ngày học liên tục (Streak 🔥) để hình thành thói quen kỷ luật.
- Mở **Hộp Quà Bí Mật** nhận xu may mắn sau khi hoàn thành thử thách.
- Cơ chế tự động làm mới câu hỏi khi trả lời sai, không gây ức chế hay đóng băng giao diện.

### 5. 👨‍👩‍👧 Bảng Điều Khiển Dành Cho Phụ Huynh (Parent Dashboard)

- **Bảo mật mã PIN 4 số** ngăn trẻ tự ý thay đổi cài đặt.
- **Cơ chế khôi phục PIN thông minh:** Giải bài toán dành cho người lớn để mở khóa khi quên mã.
- **Biểu đồ đánh giá năng lực 5 trục:** Số học, Cộng trừ, Nhân chia, Hình học, Đo lường.
- Báo cáo chi tiết: Số bài hoàn thành, thời gian học tập ước tính, tỷ lệ xuất sắc, lịch sử làm bài và gợi ý lộ trình ôn tập.

### 6. 🔊 Hệ Thống Âm Thanh Zero-Latency (Web Audio API)

- Tự động tổng hợp âm thanh đa tần số tức thời (zero delay) không cần tải bất kỳ file MP3 nào từ bên ngoài:
  - Hợp âm vui tươi khi làm đúng (`playCorrect`).
  - Âm thanh nhẹ nhàng khi làm sai (`playWrong`).
  - Tiếng leng keng nhận xu (`playCoin`).
  - Điệp khúc chiến thắng hào hùng (`playFanfare`).
- Đồng bộ mượt mà với nút bật/tắt âm thanh toàn cục trong ứng dụng.

---

## 🛠️ Công Nghệ Sử Dụng

| Hạng mục                 | Công nghệ                                                        |
| :----------------------- | :--------------------------------------------------------------- |
| **Frontend Framework**   | React 18 + Vite 6                                                |
| **Animation & Hiệu ứng** | Framer Motion + Canvas Confetti                                  |
| **Quản lý trạng thái**   | Zustand (Persistent LocalStorage)                                |
| **Biểu tượng (Icons)**   | Lucide React                                                     |
| **Hệ thống âm thanh**    | Native Web Audio API (`AudioContext`)                            |
| **Kiểu dáng (Styling)**  | Pure Vanilla CSS (Design Tokens, HSL colors, responsive layouts) |
| **Typography**           | Google Fonts (Baloo 2, Nunito) tối ưu cho trẻ em Việt Nam        |

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu cầu hệ thống:

- **Node.js** phiên bản 18.0.0 trở lên.
- **npm** hoặc **yarn / pnpm**.

### Các bước thực hiện:

1. **Clone repository về máy:**

   ```bash
   git clone https://github.com/ryntatuan/math-education.git
   cd math-education
   ```

2. **Cài đặt các gói phụ thuộc (Dependencies):**

   ```bash
   # Cài đặt cho client
   cd client
   npm install
   ```

3. **Khởi chạy môi trường phát triển (Development):**

   ```bash
   npm run dev
   ```

   Mở trình duyệt và truy cập: **`http://localhost:5173`**

4. **Đóng gói sản phẩm (Production Build):**
   ```bash
   npm run build
   ```
   Thư mục bản dựng sẵn sàng triển khai sẽ nằm tại `client/dist`.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```plaintext
math-education/
├── .gitignore                     # Cấu hình bỏ qua các file thừa khi commit
├── package.json                   # Cấu hình root project
├── README.md                      # Tài liệu giới thiệu dự án
└── client/
    ├── package.json               # Dependencies của React Client
    ├── vite.config.js             # Cấu hình Vite
    ├── index.html                 # Template HTML chính
    ├── public/                    # Assets tĩnh, favicon, icons SVG
    └── src/
        ├── assets/                # Hình ảnh minh họa, logo
        ├── components/
        │   ├── layout/            # Sidebar, Header, BottomNav
        │   ├── mascot/            # Nhân vật Cú Mèo trợ giảng
        │   └── ui/                # Button, Card, ProgressBar, Badge
        ├── data/                  # Dữ liệu giáo trình các khối lớp (Lớp 1, 2, 3)
        ├── pages/
        │   ├── HomePage.jsx       # Trang chủ giới thiệu & lộ trình
        │   ├── GradePage.jsx      # Danh sách chương bài học theo khối lớp
        │   ├── LessonPage.jsx     # Giao diện học lý thuyết & làm bài tập
        │   ├── PracticePage.jsx   # Luyện tập nhanh theo chủ đề
        │   ├── GamesPage.jsx      # 3 Mini Games (Đua xe, Bắn bóng, Lật thẻ)
        │   ├── ChallengePage.jsx  # Thử thách 3 nhiệm vụ mỗi ngày
        │   ├── ProfilePage.jsx    # Hồ sơ bé, huy hiệu, đổi avatar
        │   ├── ShopPage.jsx       # Cửa hàng đổi nhân vật bằng xu
        │   └── ParentDashboard.jsx# Bảng theo dõi phân tích cho phụ huynh
        ├── store/
        │   ├── useUserStore.js    # Store người dùng, cấp độ, xu, avatar (persist)
        │   └── useProgressStore.js# Store tiến độ học tập, sao, streak, race wins
        └── utils/
            ├── exerciseGenerator.js# Bộ sinh bài tập toán động chuẩn GDPT
            └── soundManager.js    # Bộ xử lý âm thanh Web Audio API thuần
```

---

## 📱 Lộ Trình Phát Triển Mobile App (Android & iOS)

Ứng dụng Toán Vui đã đóng gói cho mobile bằng **Capacitor** (tái sử dụng 95%+ code, hỗ trợ rung
Haptics, tai thỏ Safe Area, nút Back Android, xuất file `.apk` / `.ipa`):

- Mã nguồn phần mobile: `client/android/` · `client/ios/`
- Quy trình tự động đóng gói APK trên GitHub Actions: `.github/workflows/build-mobile.yml`
- Lệnh chạy trên máy: `npm --prefix client run mobile:sync` · `mobile:android` ·
  `mobile:build:android`

_(Ghi chú thiết kế/tiến độ mobile được giữ riêng trên máy, không đẩy lên GitHub.)_

---

## 🤝 Đóng Góp Phát Triển (Contributing)

Mọi đóng góp nhằm nâng cao chất lượng giáo dục và trải nghiệm của các bé đều được hoan nghênh:

1. Fork dự án.
2. Tạo branch mới (`git checkout -b feature/tinh-nang-moi`).
3. Commit thay đổi (`git commit -m 'feat: thêm bài toán có lời văn lớp 3'`).
4. Push lên branch (`git push origin feature/tinh-nang-moi`).
5. Mở một **Pull Request** trên GitHub.

---

## 📄 Bản Quyền & Giấy Phép

Dự án được xây dựng phục vụ mục đích giáo dục phi lợi nhuận. Mọi ý kiến đóng góp xin gửi về qua mục Issues của GitHub.

⭐ **Nếu bạn thấy dự án hữu ích, hãy tặng cho repository 1 Star nhé!** ⭐
