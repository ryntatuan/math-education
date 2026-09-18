# Kế hoạch Triển khai (Implementation Plan) - Phương án 3

Dựa trên yêu cầu mới nhất, chúng ta sẽ tối ưu hóa không gian hiển thị trên cả Web và Mobile bằng cách lược bỏ và gom nhóm các tính năng lại với nhau.

## Mục tiêu cốt lõi
- **Giảm số lượng Tab:** Biến `Trang chủ` thành trung tâm học tập duy nhất (chứa danh sách Chương/Bài), xóa bỏ hoàn toàn tab `Học tập` dư thừa.
- **Dọn dẹp giao diện Mobile:** Đưa các Widget (Thú cưng, Nhiệm vụ) vốn chiếm nhiều diện tích trên màn hình nhỏ vào các Tab chuyên biệt (`Trò chơi`, `Thử thách`).
- **Phân phối APK thông minh:** Cho phép tải App trực tiếp từ trang Hồ sơ trên trình duyệt Mobile mà không cần rào cản.

## 🔴 User Review Required
Xin lỗi bạn, mình đã đếm nhầm số lượng Tab hiện tại! Menu dưới cùng (Bottom Nav) gốc của bạn có đến **6 Tab**: Trang chủ, Học, Luyện tập, Trò chơi, Thử thách, Hồ sơ. 
Khi chúng ta gộp trang Học bài vào làm 1 với Trang chủ, thanh điều hướng sẽ còn lại chính xác **5 Tab cân đối hoàn hảo**:
1. **Trang chủ** (Hiển thị các Chương bài học)
2. **Luyện tập** (Giữ nguyên)
3. **Trò chơi** (Có thêm tab phụ Nuôi Thú)
4. **Thử thách** (Có thêm tab phụ Quests)
5. **Hồ sơ** (Có thêm nút Tải APK)

Bạn vui lòng kiểm tra lại sự phân bổ mới nhất này. Nếu mọi thứ đã chính xác 100%, hãy bấm **Proceed** để mình bắt tay vào triển khai nhé!

## 🛠 Proposed Changes

### 1. Cấu trúc Tab & Trang (Web & Mobile)
- **Xóa trang Học tập (`/learn`):** Gỡ bỏ hoàn toàn định tuyến và code của trang Học tập dư thừa.
- **Giữ nguyên Trang chủ (`HomePage`):** Trang chủ sẽ là trung tâm hiển thị danh sách 10 Chương học. Khối `RightSidebar` trên Web sẽ được **giữ nguyên hoàn toàn**, chỉ tự động ẩn đi trên giao diện Mobile theo cơ chế Responsive đã có.

### 2. Di dời Tính năng 
- **Nuôi thú cưng ➡️ Tab Trò chơi (`GamesPage`) (Áp dụng TOÀN BỘ nền tảng):**
  - Chèn hệ thống 3 Tab nhỏ với tên rút gọn: `[Trò Chơi] | [Truyện Toán] | [Nuôi thú]` ở trên cùng của trang Trò chơi cho cả Web và Mobile.
  - Chuyển toàn bộ UI và logic của `PetWidget` vào tab phụ Nuôi thú này.

- **Nhiệm vụ hàng ngày ➡️ Tab Thử thách (`ChallengesPage`) (Áp dụng TOÀN BỘ nền tảng):**
  - Đổi tên tab `Nhiệm vụ hằng ngày` cũ (chứa 3 câu hỏi toán học) thành **`Thử thách mỗi ngày`**.
  - Thêm một tab MỚI tên là **`Nhiệm vụ mỗi ngày`**, bên trong tab này sẽ chứa component `DailyQuestsCard` (lấy từ RightSidebar).
  - Kết quả: Trang Thử thách sẽ có tổng cộng 3 tab: `[Đấu Trường Thi Đua] | [Thử thách mỗi ngày] | [Nhiệm vụ mỗi ngày]`.

### 3. Quy định về RightSidebar (Menu bên phải trên Web)
- **Trên Web (cả Desktop):** Tuyệt đối **GIỮ NGUYÊN** `RightSidebar` không thay đổi và không ẩn gì hết (Bao gồm thẻ Nhiệm vụ hàng ngày, Thú cưng, Bảng xếp hạng mini...).
- **Trên Mobile (Web & App):** `RightSidebar` tự động bị ẩn đi (như logic Responsive hiện tại).

### 4. Tải APK từ Hồ sơ (`ProfilePage`)
- **Vị trí mới:** Di chuyển nút "Tải App Android (APK)" từ Top Bar/Sidebar vào trong trang Hồ sơ (`ProfilePage`).
- **Logic hiển thị (Chỉ Mobile Web):** 
  - Chỉ hiện nút tải này nếu người dùng đang dùng Web trên thiết bị Mobile (Android). Nếu đang mở App (Native) thì tự động ẩn đi.
  - Cho phép người dùng bấm tải APK ngay lập tức mà không cần phải giải toán (Parent Gate) hoặc Đăng nhập. Nút tải sẽ nằm ở khu vực Public của trang Hồ sơ.

## 🧪 Verification Plan
1. **Routing:** Xóa hoàn toàn `/learn` dư thừa (nếu có), đảm bảo Trang chủ `/` load trơn tru danh sách bài học.
2. **Bottom Nav:** Trên Mobile hiển thị 5 nút: Trang chủ, Luyện tập, Trò chơi, Thử thách, Hồ sơ.
3. **Responsive Logic:** 
   - Check trên Desktop Web -> Thấy `RightSidebar` nguyên vẹn (không bị mất hay ẩn đi).
   - Check trên Mobile Web -> Thấy nút tải APK ở Hồ sơ, `RightSidebar` tự ẩn. 
   - Check trên Mobile App -> Không thấy nút tải APK ở Hồ sơ, `RightSidebar` tự ẩn.
4. **Games & Challenges (Mobile/Web):** Check Tab Thử thách -> Thấy 3 tabs: Đấu trường, Thử thách mỗi ngày, Nhiệm vụ mỗi ngày (chứa DailyQuestsCard). Check Tab Trò chơi -> Thấy 3 tabs: Trò Chơi || Truyện Toán || Nuôi thú.
