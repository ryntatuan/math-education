# Những gì tôi TỰ QUYẾT ĐỊNH — Giai đoạn 3c + 3d

> **Ngày:** 2026-09-20 · **Người quyết:** trợ lý (theo yêu cầu "tự thực hiện, note lại để kiểm tra sau")
> **Trạng thái:** đã code xong · **đã chạy trên DB THẬT** · **`43/43` mục tự kiểm xanh** (2026-09-20).
>
> Mỗi mục ghi 3 phần: **quyết định** · **vì sao** · **đổi thế nào nếu bạn muốn khác**.
> Xếp theo mức độ ảnh hưởng: nhóm A là thứ khó đổi về sau, nhóm B đổi dễ.

---

## 🔴 A. Quyết định về CẤU TRÚC (khó đổi về sau — đọc kỹ nhóm này)

### A1. Bản nháp nằm ở **bảng riêng**, không phải cột `draft_payload`

- **Quyết định:** bảng `content_lesson_drafts`, mỗi bài tối đa 1 bản nháp. **Không có policy nào cho `anon`.**
- **Vì sao:** đường dễ hơn là thêm cột `draft_payload` vào `content_lessons`. Nhưng **RLS lọc theo DÒNG, không lọc theo CỘT** — mà `content_lessons_public_read` cho khách đọc mọi dòng `status='published'`, nên bản nháp nằm chung dòng là lộ ra theo. Đây đúng loại lỗ hổng đã phải vá ở GĐ 0 với `leaderboard`.
- **Đây là quyết định #6 đã được duyệt** trong `phase_3a_plan.md` §10, tôi chỉ thực hiện đúng.
- **Đổi thế nào:** muốn gộp chung bảng thì phải chấp nhận bản nháp lộ cho khách — **không nên**.

### A2. Publish / hoàn tác / rút bài là **hàm SQL**, không phải chuỗi lệnh từ trình duyệt

- **Quyết định:** `publish_lesson` · `rollback_lesson` · `set_lesson_status` · `save_lesson_draft` (4 hàm), cộng 2 hàm nội bộ `bump_content_version` · `ghi_vet_bai_hoc`.
- **Vì sao:** publish phải làm 4 việc (ghi phiên bản · cập nhật bài · xoá bản nháp · tăng `content_version`). Gọi lần lượt từ trình duyệt thì **đứt giữa chừng là có thật** — mất 4G ở việc thứ 3 là bài đã đổi mà phiên bản chưa ghi. Hàm SQL chạy trong một transaction.
- **Kèm theo:** **vết kiểm toán ghi NGAY TRONG hàm**, không gọi từ JS. Nhờ vậy thao tác và vết của nó không thể tách rời: không có chuyện "đổi rồi mà log ghi hụt".
- **Đổi thế nào:** muốn ghi vết bằng `logAudit` từ JS như các trang khác thì sửa 3 hàm — nhưng mất tính "không thể tách rời".

### A3. Dùng `SECURITY INVOKER`, và **cấp EXECUTE cho `authenticated`**

- **Quyết định:** cả 6 hàm chạy `SECURITY INVOKER` (quyền người gọi) + `REVOKE ALL ... FROM PUBLIC` rồi `GRANT EXECUTE ... TO authenticated`.
- **Vì sao không dùng `SECURITY DEFINER`:** DEFINER bỏ qua RLS, nên **toàn bộ** việc canh admin chỉ còn một dòng `IF NOT is_admin()` — mất một lớp chặn. INVOKER thì RLS vẫn là lớp thứ hai.
- **⚠️ Cái giá phải trả:** vì hàm con được kiểm quyền theo người gọi, tôi phải cấp luôn `bump_content_version` và `ghi_vet_bai_hoc` cho `authenticated`. Nghĩa là người đã đăng nhập gọi thẳng được 2 hàm này:
  - `ghi_vet_bai_hoc` — vô hại: RLS của `admin_audit_log` đòi `is_admin() AND actor_id = auth.uid()`.
  - `bump_content_version` — người thường gọi được sẽ làm mọi máy bé tải lại nội dung. Không sửa được nội dung, chỉ tốn băng thông.
- **Đổi thế nào:** nếu bạn không muốn lộ 2 hàm đó, chuyển 4 hàm chính sang `SECURITY DEFINER` và **giữ nguyên** dòng `IF NOT is_admin()` — nhưng như đã nói, mất lớp RLS.

### A4. **Không** có phát hiện xung đột / không có `draft_version`

- **Quyết định:** không lưu "bản nháp này dựa trên phiên bản nào". Ai publish sau thì thắng.
- **Vì sao:** dự án có **một** admin. Thêm cột đó là thêm một trường hợp lỗi phải xử lý ở mọi chỗ, cho một tình huống chưa tồn tại.
- **⚠️ Rủi ro thật:** nếu sau này có 2 admin cùng sửa 1 bài, người publish sau **đè** người trước mà không được cảnh báo. Bản nháp của người trước **vẫn còn** (publish chỉ xoá bản nháp của chính nó), nên không mất dữ liệu — chỉ là người trước không được báo.
- **Đổi thế nào:** thêm cột `draft_version INT` + so trong `publish_lesson`, báo lỗi `40001` khi lệch.

### A5. Hoàn tác = **ghi một phiên bản MỚI**, không sửa lịch sử

- **Quyết định:** `rollback_lesson(bài, phiên bản)` lấy nội dung cũ rồi ghi thành phiên bản `max+1`.
- **Vì sao:** nhờ vậy lịch sử chỉ ghi thêm — không mất dấu "đã từng publish bản lỗi", và **hoàn tác được chính việc hoàn tác** (quay lại bản vừa bị bỏ). Nếu xoá/sửa thì bản vừa bị bỏ biến mất.
- **Đổi thế nào:** gần như không nên đổi.

### A6. **Rút bài** chứ không xoá bài

- **Quyết định:** `set_lesson_status(bài, 'draft'|'published')`. Không có chức năng xoá bài.
- **Vì sao:** `question_attempts.lesson_id` và `support_tickets.lesson_id` đang trỏ tới id đó — xoá là làm hỏng lịch sử. Và khi một bài lộ lỗi thì việc cần làm là **rút xuống ngay** (5 giây), không phải sửa cho đúng rồi mới đăng (có thể 10 phút, mà suốt 10 phút đó hàng trăm bé vẫn thấy câu sai).
- **Đổi thế nào:** thêm hàm `delete_lesson` — nhưng nên cân nhắc kỹ vì lý do trên.

---

## 📐 B. Quyết định về GIAO DIỆN / CÁCH LÀM (đổi dễ)

### B1. Form sửa bài **sinh từ `SLIDE_TYPES`**, không viết tay 6 form

- **Vì sao:** 6 kiểu slide × 24 khoá. Viết tay là 6 chỗ để quên một khoá — mà khoá bị quên thì editor **ĂM THẦM NUỐT** nó khi bấm Lưu (slide vẫn hợp lệ, chỉ là phần đó biến mất). Cổng `S-23` canh đúng điều này.
- **Kèm theo:** tôi thêm `mangObject` vào `contentSchema.js` — khai khoá nào là **mảng chứa object**. Cần vì `array` một mình không nói được điều đó, mà đoán sai thì editor ghi ra `["a"]` ở chỗ `LessonPage` cần `[{...}]` ⇒ slide hỏng âm thầm. Có cổng đo lại trên 1505 slide thật.

### B2. Ô "đáp án" là **ô chọn**, không cho gõ tự do

- **Vì sao:** `contentSchema` kiểm `options.includes(answer)` — so sánh **nghiêm ngặt**. Ô chọn lấy giá trị TỪ chính mảng `options` nên luôn khớp; gõ tay thì `"4"` và `4` là hai thứ khác nhau, và câu đó sẽ không bao giờ chấm đúng.

### B3. Ô bắt buộc để trống → **cảnh báo, KHÔNG chặn lưu**

- **Vì sao:** `contentSchema` chỉ kiểm KIỂU nên `""` vẫn hợp lệ. Nếu chặn thì một bài **đang có sẵn** ô trống sẽ **khoá luôn** việc sửa những chỗ khác của bài đó — biến một cảnh báo thành bế tắc.
- **Đổi thế nào:** đổi `canhBaoRong` thành `loiCung` trong `LessonEditor` — nhưng nên kiểm trước xem DB có ô trống nào không.

### B4. Trình sửa **trước chỉ** sửa bài đã có — nay ĐÃ CÓ tạo bài mới (đổi ngày 2026-09-20)

- **Quyết định ban đầu:** chỉ sửa bài đang có, không tạo bài mới, không sửa Lớp/Chương.
- **Vì sao lúc đó:** việc cần nhất của GĐ 3 là **sửa lỗi trong bài đang có** (5 chương còn thiếu nội dung vì mới viết 2–3 trên 10–12 bài). Tạo bài mới cần thêm giao diện đặt `chapter_id`, `sort_order`, và một chỗ để **xoá** bài tạo nhầm — mà chưa chắc đã cần.
- **✅ ĐỔI (2026-09-20, `0013`):** người dùng yêu cầu _"thêm tính năng thêm bài học để tôi có thể bổ sung bài học trong tương lai"_ ⇒ đã làm nút **➕ Thêm bài học vào chương này** + hàm `create_lesson`. Chi tiết ở nhóm **D** bên dưới.
- ⛔ **Vẫn KHÔNG làm:** sửa/tạo **Lớp** và **Chương**. Chúng là metadata khung chương trình (5 lớp · 41 chương), hiếm khi đổi, và sửa sai thì hỏng cả cây. Muốn thì nói một câu — việc này đơn giản hơn tạo bài (chỉ có `id`, `name`, `sort_order`).

### B5. Lịch sử phiên bản **không** hiện số slide

- **Vì sao:** muốn hiện số slide thì phải tải `payload` của **mọi** phiên bản. Một bài 10 phiên bản × 20 KB = 200 KB mỗi lần mở. Chưa cần thông tin đó để chọn hoàn tác.
- **Đổi thế nào:** nếu bạn muốn xem trước nội dung từng phiên bản rồi mới hoàn tác, nói một câu.

### B6. Đổi kiểu slide thì **giữ lại `content` cũ**

- **Vì sao:** đổi `quiz` → `concept` rồi xoá sạch `content` là mất công gõ. Giữ lại thì khoá trùng tên (`title`, `question`) giữ nguyên giá trị, khoá thiếu sẽ được bộ kiểm tra báo — **báo lỗi rõ ràng** tốt hơn **mất chữ âm thầm**.

### B7. Editor gọi `onDaGhi` chứ không tự tải lại khung chi tiết

- **Vì sao:** tải lại khung chi tiết trong lúc đang sửa sẽ khiến trình sửa bị **tháo ra dựng lại** — mất thông báo vừa hiện và mất chỗ đang đứng. Nên tôi tách 2 số đếm: `phienCay` (tải lại cây, an toàn) và `phienChiTiet` (chỉ tăng khi ĐÓNG trình sửa).
- Đây là lỗi cùng loại đã gặp ở lát 2c với `admin_audit_log` (sửa xong mà số vẫn cũ vì không ai tải lại).

---

## 📦 C. Quyết định về 3d — app của bé đọc từ DB

### C1. Bốn hàm tra cứu **GIỮ NGUYÊN chữ ký ĐỒNG BỘ**

- **Quyết định:** `getGrade` · `getChapter` · `getLesson` · `findLessonById` vẫn đồng bộ, vẫn cùng tham số, vẫn cùng kiểu trả về.
- **Vì sao:** 5 màn hình đang gọi chúng. Đổi sang `async` là phải sửa cả 5 — mà sửa 5 màn hình **cùng lúc** với việc đổi nguồn dữ liệu là hai thay đổi rủi ro chồng lên nhau, hỏng thì không biết do cái nào.
- **Làm được vì:** cache đọc **ĐỒNG BỘ** ngay lúc nạp module, nên cây có sẵn từ khung hình đầu tiên.

### C2. 🔴 Đổi trong lúc app đang mở — **quyết định ban đầu của tôi đã SAI một nửa, đây là bản đã sửa**

**Bản đầu tôi quyết:** tải ở nền, ghi cây mới vào bộ nhớ, **không** báo cho giao diện. Cây mới chỉ có hiệu lực ở lần đọc kế tiếp. Lý do: muốn React đọc lại thì phải dựng lại cây, bé đang học dở sẽ **bị đẩy về slide 1** — tôi cho là không đáng.

**Đo thật thì hậu quả TỆ HƠN tôi viết, ở hai điểm:**

1. "Lần đọc kế tiếp" hoá ra là **lần mở app thứ HAI**, không phải lần kế tiếp. Bé mở app vào thẳng một bài (deep link, hoặc tải lại trang đang ở trong bài) thì trang render **trước khi** bản mới tải xong ⇒ lần đó vẫn là nội dung cũ.
2. Nặng hơn: `taiNoiDung()` chỉ chạy **một lần lúc khởi động**. Nên nếu app đang mở mà admin publish thì app **không bao giờ biết** — không phải "chậm vài phút", mà là **mãi mãi**, cho tới khi tắt hẳn app. Đo được: bé mở app ở trang chương, admin publish, chờ 6 giây ⇒ tiêu đề vẫn cũ, và **không có request nào** được gửi đi.

**Bản đã sửa (hai nửa, làm cùng nhau):**

- `contentSource.js` phát thông báo khi cây **vừa đổi** ⇒ `App.jsx` render lại ⇒ màn hình đang mở đọc cây mới.
- **Nhưng chốt lại: đang mở bài học thì KHÔNG báo** (`baoDangTrongBaiHoc`). Đây là phần giữ đúng ý định ban đầu — không cắt ngang bé đang học.
- `App.jsx` gọi thêm `taiNoiDung()` khi **quay lại tab**, cùng chỗ với `refreshRewardConfigs()`. Lần gọi này chỉ đọc `content_version`; tải cả cây **chỉ khi số đó đã đổi**.

**Kết quả đo được:** bé mở app ở trang chương → admin publish (phiên bản 10) → bé quay lại tab ⇒ app đọc `app_config`, thấy phiên bản đổi, tải `content_grades` + `content_chapters` + `content_lessons`, cache `9 → 10`, và **tiêu đề mới hiện ra ngay, không tải lại trang**.

**Còn lại một ca chưa đẹp (tôi biết và chấp nhận):** mở app **vào thẳng một bài** ngay sau khi admin publish thì lần đó vẫn là nội dung cũ, vì cache được đọc đồng bộ lúc khởi động và lúc đó chốt "đang học" đã bật nên không được phép thay. Bé chỉ cần **đi ra** là thấy ngay (rời bài = đổi màn hình = có mốc kiểm lại — trước đây phải đổi tab hoặc tải lại). Sửa triệt để ca này thì phải cho phép thay cây giữa bài — đúng thứ tôi không muốn.

**Còn một ca hiếm, ghi lại để không phải đoán lần sau:** nếu **cache đang thiếu hẳn bài đó** (cache được ghi lúc bài còn bị rút) mà bé vào thẳng bài bằng link, `LessonPage` hiện màn hình **"Không tìm thấy bài học"** và — vì màn hình đó cũng bật chốt "đang học" — bản mới về cũng **không** tự render lại. Bé phải bấm một cái (màn hình đó có sẵn nút **Về trang chủ**). **Đo được thật** trong lúc thử ở lượt này. Không sửa vì: (a) đi vào bài được chỉ có thể từ danh sách — mà danh sách đọc từ chính cây đó nên bài đã rút không hiện; chỉ lộ ra khi vào bằng link đã lưu; (b) chốt `dangTrongBaiHoc` mà nới ra là mở lại đúng cái lỗ vừa vá. Cách thoát luôn có sẵn và chỉ mất 1 cú bấm.

**TC-3d.8 đo được sau khi thêm mốc đổi màn hình (2026-09-20):** bé đang ở **slide 3/6** → admin **rút một bài khác** (phiên bản 20) → chờ 7 giây: **vẫn `3/6`**, đúng tiêu đề slide cũ, cache đứng ở 19 → bấm **Tiếp tục**: lên **`4/6`** bình thường, không bị đẩy về đầu → **rời bài**: trang chủ hiện và cache lên **20** ngay. Tức chốt "đang học" giữ nguyên tác dụng, và việc cập nhật chỉ hoãn tới lúc bé rời bài.

**Có cổng canh:** `S-25` kiểm cả hai chiều — có chốt `dangTrongBaiHoc` (và canary chứng minh cổng nhận ra khi chốt bị xoá), có gọi kiểm lại khi quay về tab, và `LessonPage` khai đúng lúc vào/ra bài.

### C3. Công tắc `static` = **quay về file tĩnh VÀ xoá cache**

- **Quyết định:** khi `content_source` không phải `"remote"`, app không chỉ "không tải thêm" mà **xoá cache nội dung** và quay về file tĩnh.
- **Vì sao:** chỉ "không tải thêm" là **chưa đủ**: máy nào đã tải cây từ DB rồi thì vẫn dùng cây đó, và công tắc thành vô dụng. Đây là chỗ dễ hiểu sai nhất của cơ chế kill switch — mà nó lại là thứ duy nhất để tắt GĐ 3 khi có sự cố.
- **Đổi thế nào:** không nên đổi.

### C4. Cache **cả cây nội dung** trong `localStorage` (~800 KB)

- **Vì sao:** nhờ vậy app offline vẫn có nội dung **mới nhất đã tải**, không phải rơi về file tĩnh cũ. Hạn mức `localStorage` ~5 MB nên còn chỗ.
- **⚠️ Rủi ro:** hết dung lượng thì `ghiCache` **thất bại im lặng** (có `try/catch`) — lần sau phải tải lại. Chậm hơn, nhưng vẫn đúng.
- **Đổi thế nào:** muốn nhẹ hơn thì chỉ cache phần "khung" (lớp/chương/tên bài) và tải slide theo nhu cầu — nhưng mất khả năng học offline.

### C5. Thêm cột `age_range` (migration `0010`) thay vì để mất dữ liệu

- **Quyết định:** thêm cột `age_range` vào `content_grades` và điền 5 giá trị.
- **Vì sao:** `ParentDashboard.jsx` in `{gr.name} ({gr.ageRange})`. Không bù cột này thì phụ huynh thấy **`Lớp 1 ()`** — không lỗi, không cảnh báo, chỉ là một chỗ hiện rỗng. Và nó chỉ lộ ra ở màn hình ít được mở nhất.
- **Cách tìm ra:** `scratch/print_tree_shape.mjs` (script tôi viết thêm) in tập khoá của grade/chapter/lesson trong file tĩnh rồi đối chiếu với cột trong `0008`. Suy luận từ trí nhớ thì **không tìm ra**.
- **Đổi thế nào:** nếu bạn thấy `ageRange` không cần nữa thì xoá khỏi giao diện + bỏ cột.

### C6. `curriculum.grades` là **getter**

- **Quyết định:** `const curriculum = { get grades() { return layGrades(); } }`.
- **Vì sao:** gán `curriculum.grades = [...]` một lần lúc nạp module thì khi nguồn đổi, **mọi chỗ** đọc `curriculum.grades` vẫn thấy mảng CŨ — mà đó là 5 màn hình. Cổng `S-24` canh điều này.

### C7. Kiểm lại nội dung khi bé **quay lại app** — đã ĐỔI so với bản đầu

- **Bản đầu:** chỉ tải một lần lúc mở app, không làm mới khi quay lại tab. Lý do khi đó: nội dung không đổi trong lúc bé học, mà tải lại là 800 KB.
- **Vì sao đổi:** lý do trên chỉ đúng với **việc tải cả cây**, không đúng với **việc hỏi phiên bản**. Đã tách hai thứ ra: quay lại tab ⇒ đọc 2 khoá của `app_config` (rất nhẹ); tải cả cây **chỉ khi `content_version` đã đổi**. Giữ nguyên bản cũ nghĩa là admin publish xong app đang mở không bao giờ biết (xem C2).
- **Ngưỡng chống gọi liên tục:** `MIN_REFRESH_MS = 5_000`, giống `rewardService` — che trường hợp bật/tắt tab liên tục.
- **🔴 Bổ sung 2026-09-20 — còn thiếu một mốc, đã đo ra:** hai mốc trên vẫn không đủ. App **không có kênh đẩy**, nó chỉ biết khi **hỏi**, mà bé thì có thể **ngồi yên một màn hình** rất lâu — đo được: rút bài xong chờ **8 giây**, cây không đổi, cache đứng ở 12, bài đã rút **vẫn hiện**. Thêm mốc thứ ba: **hỏi mỗi lần bé ĐỔI MÀN HÌNH** (trang chủ → chương → bài). Chọn mốc này vì bé bấm đổi màn liên tục, nên nó bắt được ca "ngồi yên rồi bấm đi" mà không tốn gì khi app để yên (khác hẳn hẹn giờ dò theo nhịp, vốn tốn request kể cả lúc không ai dùng).
- **Đo lại sau khi thêm:** bé ở trang danh sách bài (12 bài, cache 15) → admin rút bài (`content_version` 16) → bé chỉ **đổi màn hình** ⇒ cache **16**, bài biến mất, còn **11 bài** — không tải lại trang, không đổi tab. Cổng `S-25` canh cả **ba** mốc (khởi động · quay lại tab · đổi màn hình), mỗi mốc có canary riêng.

### C8. Thông báo thay đổi là **cơ chế đẩy**, không phải app tự dò

- **Quyết định:** `contentSource.js` giữ một danh sách hàm nghe (`ngheNoiDung`). Đổi cây xong thì gọi hết, **trừ khi** đang có bài mở.
- **Vì sao không để app tự dò (polling):** dò theo nhịp thì hoặc chậm (nhịp thưa), hoặc tốn request vô ích (nhịp dày). Đẩy chỉ chạy đúng lúc có việc.
- **Vì sao chỉ một chỗ biết trạng thái "đang học":** `LessonPage` là **nơi duy nhất** biết điều đó, nên nó tự khai (`baoDangTrongBaiHoc(true/false)`) trong `useEffect` lúc mount/unmount. Không suy ra từ URL ở chỗ khác — suy từ URL là đoán, mà đoán sai thì hoặc cắt ngang bài, hoặc tính năng im lặng hỏng.
- **Đổi thế nào:** muốn nội dung đổi nóng cả khi đang học thì bỏ chốt trong `phatThayDoi()` — nhưng phải chấp nhận bé bị đẩy về slide 1.

---

## 🆕 D. Quyết định 2026-09-20 — báo cáo phiên bản nội dung + tạo bài mới (`0013`)

### D1. Bé báo phiên bản nội dung **kèm nhịp đồng bộ tiến độ**, không thêm request riêng

- **Quyết định:** `syncService.js` gửi thêm 3 trường `content_version` · `content_source` · `content_seen_at` trong **cùng** câu `upsert` `child_progress` mà nó đã gửi từ trước. Không có cuộc gọi mới nào, không có cột nào phải cập nhật ở client.
- **Vì sao không đẩy ngay lúc nạp nội dung:** một request nhỏ nữa mỗi lần mở app là không cần thiết, vì bé **đang dùng** thì chắc chắn có nhịp đồng bộ tiến độ. Đổi lại, con số có thể trễ vài phút so với thời điểm nạp.
- 🔴 **Giới hạn đã ghi rõ ở hồ sơ bé + `TC-3d.9`:** đây là **báo cáo của lần cuối máy bé còn mạng**, KHÔNG phải trạng thái trực tiếp. Máy đang offline thì **không báo lên được** — đúng lúc cần biết nhất. Nên hồ sơ bé luôn hiện kèm `content_seen_at`, và `content_source = 'static'` (đang chạy nội dung trong **bundle**) là ca đáng nghi nhất.
- **Vì sao vẫn làm dù cơ chế tự cập nhật đã tốt:** vì cơ chế chỉ đúng cho bé **đang dùng + có mạng**. Câu hỏi còn lại khi có khiếu nại là _"máy này đã **thật sự** nhận bản mới chưa"_ — câu đó phải có dữ liệu mới trả lời được, và nó phân biệt hai cách xử lý rất khác nhau: **sửa nội dung** (nội dung sai thật) vs. **để bé mở app có mạng** (máy còn bản cũ).
- **Đổi thế nào:** muốn con số chính xác tới từng phút thì chuyển sang gọi riêng ngay lúc nạp nội dung (thêm 1 request mỗi lần mở app).

### D2. Mã bài mới sinh **trong cùng transaction với việc chèn**, và đếm theo **MÃ**

- **Quyết định:** `create_lesson` tự tính `v_so = MAX(số trong mã) + 1` rồi `v_id = <chương>-l<số>`, **trong cùng một hàm SQL** với `INSERT`.
- **Vì sao không tính ở trình duyệt:** mã bài có ý nghĩa (`g1-c1-l13` = lớp 1 · chương 1 · bài 13) và `question_attempts.lesson_id` + `support_tickets.lesson_id` đang trỏ tới đúng dạng mã này. Hai trình duyệt cùng bấm "Tạo" một lúc mà mỗi bên tự tính thì **cả hai ra `-l13`** — người sau bị khoá chính chặn hoặc tệ hơn là ghi đè.
- **Vì sao đếm theo MÃ chứ không đếm số dòng:** đếm số dòng sẽ sinh mã trùng khi có bài bị rút/ẩn. Đếm theo mã (chỉ lấy id khớp `-l<số>` và không bao giờ tái dùng mã đã có) thì mã luôn mới.
- **Vì sao là hàm SQL chứ không `.insert()`:** cổng `S-22` **cấm** Admin ghi thẳng bảng nội dung, và vết kiểm toán phải nằm trong cùng transaction (`ghi_vet_bai_hoc`) — đúng cách `publish_lesson` đang làm.

### D3. Bài mới: **luôn `draft`** + sẵn **1 slide `story`** giữ chỗ

- **Vì sao `draft`:** bài lúc mới tạo chỉ có slide giữ chỗ. Nếu để `published` thì bài đó **lộ ra cho bé ngay tích tắc bấm Tạo** — đúng loại lỗi không ai nhìn thấy vì màn hình admin trông vẫn bình thường.
- **Vì sao 1 slide thay vì 0 slide:** bài 0 slide mà lỡ bấm Đăng thì app của bé mở ra **màn hình trống**; và người tạo cũng không có chỗ nào để bắt đầu gõ. Slide giữ chỗ ghi rõ _"(Bài mới — chưa có nội dung…)"_ nên nếu bị đăng nhầm thì nhìn là biết ngay.
- **Vì sao slide đó là `story`:** kiểu đơn giản nhất, và `mascotMood` (khoá **bắt buộc** của `story`) có sẵn giá trị `happy` — để `query` thì slide đầu tiên đã không hợp lệ.
- **Tạo xong thì mở luôn trình sửa:** việc tiếp theo chắc chắn là thêm slide; bắt bấm thêm 2 lần nữa là vô nghĩa.

### D4. ⛔ Vẫn **chưa có chỗ XOÁ bài** — cố ý, dùng **Rút bài** thay thế — 🔴 **ĐÃ ĐỔI NGÀY 2026-09-20, xem nhóm `F`**

> 🔴 **Quyết định này đã bị ĐỔI.** Người dùng yêu cầu có nút xoá bài (kèm chốt gõ chữ).
> Bản mới ở **`F1`** (`supabase/migrations/0015_xoa_bai_hoc_tu_giao_dien.sql`). Phần **vẫn đúng**
> và vẫn được giữ: **không xoá CHƯƠNG** (cổng `S-30` canh), và vẫn khuyên dùng **Rút bài** khi
> muốn giữ nội dung. Phần lý do ở dưới được giữ nguyên để đọc lại mà không phải đoán.

- **Quyết định (bản cũ, đã bị đổi):** tạo nhầm bài thì bấm **Rút bài** (về `draft`), **không** có nút xoá.
- **Vì sao:** `question_attempts.lesson_id` và `support_tickets.lesson_id` trỏ tới mã bài — xoá là làm hỏng lịch sử, và `admin_audit_log` sẽ ghi "đã publish bài X" trong khi X không còn tồn tại. Rút bài đạt đúng mục đích (bé không thấy nữa) mà không mất dấu vết.
- **Nếu vẫn muốn xoá thật** (ví dụ bài tạo nhầm hoàn toàn, chưa ai học): phải là hàm riêng, có chốt "bài chưa từng có lượt trả lời nào", và **không** xoá dây chuyền — nói một câu nếu cần.
  → 📌 Bản mới đã làm **khác** điều này một chỗ, có chủ ý: **không** chốt "bài chưa từng có lượt trả lời" (sẽ chặn đúng yêu cầu của người dùng), mà **cảnh báo** số lịch sử đang trỏ tới — xem `F4`.
- **Điều này đổi so với lý do của `B4` bản cũ** (bản cũ nói "chưa làm vì còn thiếu chỗ xoá") — kết luận mới: **không cần** chỗ xoá, rút bài là đủ.

### D5. Chỗ vẽ phải **chịu được chi tiết chưa tải xong** — cái chọn định danh là **mã bài**, không phải "đang chọn"

- **Sự việc:** bấm **Tạo bài** thật thì sập: `Cannot read properties of null (reading 'id')`, cây nội dung **không vẽ lại**. Nguyên nhân: hàm tạo bài đặt _chương đang mở_ và _bài đang sửa_ trong **cùng một nhịp**, còn `chiTiet` tải **bất đồng bộ** ⇒ có đúng **một khung hình** nó còn `null`, và màn hình cố mở trình sửa bài với `null`.
- **Quyết định:** điều kiện vẽ nhánh chi tiết phải đòi **dữ liệu đã có**, không chỉ đòi **ý định đã chọn**: `dangSuaBai === dangChon && chiTiet?.id`.
- **Vì sao không sửa ở chỗ khác:** đường "✏️ Sửa bài này" không bao giờ sập vì nút đó chỉ hiện **khi chi tiết đã tải xong** — nên lỗi chỉ lộ ra ở đường **mới** (tạo bài). Sửa ở chỗ vẽ là sửa **một chỗ cho mọi đường vào**, kể cả đường sau này.
- **Bài học đo lường:** cổng tĩnh + build xanh **không** chứng minh được gì cho loại lỗi này. Nó chỉ hiện ra khi **bấm thật** ở đúng một khung hình. ⇒ Việc "đo tay bằng cách bấm" không phải phần trang trí của quy trình.

## 🗑️ E. Quyết định 2026-09-20 — xoá bài THẲNG TRONG DB (`0014`)

### E1. Xoá bằng SQL phải TỰ LÀM cho app của bé quên bài đó (trigger `AFTER DELETE`)

- **Vấn đề:** `content_version` là thứ DUY NHẤT khiến app của bé biết nội dung đã đổi. Ba đường ghi qua giao diện đều gọi `bump_content_version()`; một lệnh `DELETE` dán vào SQL Editor thì **không gọi ai cả** ⇒ máy bé giữ nguyên cache và **vẫn hiện bài đã xoá, mãi mãi**. Không exception, không log, không màn hình đỏ.
- **Quyết định:** trigger `AFTER DELETE` trên `content_lessons` — tăng số phiên bản **chỉ khi** bài đã `published` (bài nháp thì bé chưa từng thấy, tăng chỉ bắt mọi máy tải lại ~800 KB vô ích), và ghi một dòng `lesson.delete` vào sổ kiểm toán.
- **Vì sao trigger chứ không phải "nhớ chạy kèm một câu UPDATE":** quy trình dựa vào việc nhớ là quy trình sẽ quên. Trigger sống trong **cùng transaction** với lệnh xoá ⇒ không có cửa sổ nào để quên.
- **Vì sao `SECURITY DEFINER`:** hàm ghi vào `app_config` + `admin_audit_log`, **cả hai đều có RLS**. Mục tiêu là _"xoá được, và app tự lành"_, không phải _"thêm một lý do để lệnh xoá thất bại"_. Phần ghi vết còn được bọc `EXCEPTION` để nó **không bao giờ** chặn việc xoá.

### E2. `0014` không mở thêm đường ghi nào từ giao diện

- `0014` **không** mở thêm đường ghi nào: `REVOKE ALL … FROM anon` rồi chỉ `GRANT` cho `authenticated`, và gọi hàm trigger qua REST thì vô nghĩa (`trigger functions can only be called as triggers`).
- Nghĩa là: **bấm nhầm không xoá được gì**, nhưng **xoá bằng SQL thì app chịu được**.

> 🔴 **Cập nhật 2026-09-20:** sau `0014`, người dùng yêu cầu CÓ nút xoá trên giao diện ⇒ thêm
> `0015` (nhóm `F`). Câu "bấm nhầm không xoá được gì" nay không còn dựa vào việc _thiếu nút_, mà dựa
> vào **chốt gõ chữ** ở hộp xác nhận — đã đo: nút xoá **mờ** tới khi gõ đúng `delete this lesson`.

### E3. Máy bé phải chịu được dữ liệu "lạ", không chỉ dữ liệu đúng

Ba chốt chặn mới ở `LessonPage` — mỗi cái ứng với một cách dữ liệu trong DB có thể khác thường:

- `payload` rỗng hoặc thiếu `slides` ⇒ trước đây đọc thẳng `slide.type` với `slide === undefined` ⇒ **trắng trang** kèm `Cannot read properties of undefined (reading 'type')`. Nay: màn hình _"Bài này chưa có nội dung"_.
- Slide **kiểu lạ** ⇒ trước đây là một **thẻ trắng** (trông y như app hỏng, mà console không có lỗi nào). Nay: nói rõ kiểu lạ là gì.
- Mã bài **không có trong cây** ⇒ màn hình _"Không tìm thấy bài"_ nay **tự gọi tải lại nội dung một lần**, và tự vẽ lại khi cây mới về. Điều kiện để việc tự chữa đó chạy được: cờ `dangTrongBaiHoc` phải là `false` khi không tìm thấy bài — nên nó được khai theo `coBaiHoc`, **không** khai cứng `true`.

### E4. `completedLessons` KHÔNG bị gạch khi bài bị xoá — nên khi ĐẾM phải đối chiếu cây

- **Quyết định:** không xoá dấu "bé đã học bài X" khi bài X biến mất. Bé không được mất sao vì một thao tác của người lớn, và bài có thể được tạo lại đúng mã cũ.
- **Hệ quả bắt buộc:** mọi chỗ **đếm** phải đối chiếu với cây hiện tại (`demBaiDaHoc` · `tapMaBaiHoc` trong `curriculum.js`, và tham số `lessonIds` mới của `getChapterProgress`). Không đối chiếu thì: hồ sơ ghi _"13 bài đã học"_ khi chương trình chỉ còn 12, và chương đang hoàn thành tự tụt xuống **108%** ⇒ `isCompleted` (`=== 100`) thành `false` ⇒ **mất dấu ✅**.
- Sửa kèm một lỗi im lặng cùng họ: `chapter.lessons?.length || 12` — chương **đã bị xoá hết bài** có `length === 0` nên rơi vào `12` và hiện _"0/12 bài"_. Nay dùng `??`.

## 🗑️ F. Quyết định 2026-09-20 — NÚT XOÁ BÀI HỌC trên giao diện (`0015`) — **ĐỔI `D4`**

### F1. Có nút xoá MỘT BÀI, kèm chốt "gõ đúng cụm `delete this lesson`"

- **Đổi gì:** `D4` kết luận _"không có chỗ xoá, dùng Rút bài"_. Người dùng yêu cầu ngược lại: cần xoá được. Nay có nút `🗑️ Xoá bài này` trong khung XEM BÀI (không nằm trong trình sửa — nút chỉ hiện khi chi tiết đã tải xong, nên không thể bấm nhầm sang bài khác).
- **Giữ nguyên phần đúng của `D4`:** **không** xoá CHƯƠNG (không có đường nào, kể cả trong SQL — cổng `S-30` canh bằng canary), và hộp thoại vẫn nói câu **dùng Rút bài** nếu chỉ muốn giấu bài đi.
- **Vì sao "gõ chữ" chứ không `window.confirm`:** hộp thoại OK/Huỷ thì người ta bấm OK theo phản xạ — nó chặn **bấm hụt**, không chặn **bấm ẩu**. Cụm chữ để **tiếng Anh** một cách cố ý: nó không giống bất kỳ nhãn nào trong app, nên không thể gõ ra do bấm lụi; để tiếng Việt ("Xoá bài này") thì nó trùng nhãn nút và mất tác dụng.
- **Đo được (2026-09-20):** nút xoá **mờ** khi chưa gõ · vẫn **mờ** khi gõ sai một ký tự (`delete this lessonx`) + nhắc _"Chưa khớp"_ · **bật** khi khớp · Esc đóng hộp thoại mà không xoá gì.

### F2. Việc xoá đi qua hàm SQL `delete_lesson`, không `.delete()` từ trình duyệt

- Cổng `S-22` cấm trang Admin ghi thẳng vào bảng nội dung. Hàm này là chốt ở tầng DB: `is_admin()` · chốt "bài phải tồn tại" (không có chốt thứ hai thì hàm "thành công" mà chẳng xoá gì) · `REVOKE … FROM anon` (bẫy Supabase cấp `EXECUTE` thẳng cho `anon`, đã sập một lần ở `0012`).
- ⚠️ **Chốt "gõ chữ" không thể đặt trong hàm SQL** — một hàm không bắt được người gọi gõ gì. Nó nằm ở giao diện, còn tầng DB bảo vệ bằng quyền. Viết rõ điều này trong migration để lần sau không ai tưởng là thiếu sót.

### F3. Trigger `0014` là chỗ DUY NHẤT tăng số và ghi vết — `delete_lesson` cố ý **không** làm hai việc đó

- Nếu hàm RPC cũng ghi `lesson.delete` thì mỗi lần bấm nút sẽ có **hai** dòng trùng — mà sổ kiểm toán là bảng **chỉ-thêm**, không sửa lại được. Trigger đã chạy cho MỌI đường xoá (SQL Editor hay giao diện), nên nó là chỗ đúng.
- `actor_id` trong dòng vết phân biệt sẵn hai đường: có `actor_id` = xoá từ giao diện (biết **ai**), `NULL` = xoá bằng SQL Editor.

### F4. Hộp thoại ĐẾM và NÓI RA số lịch sử đang trỏ tới bài — nhưng **KHÔNG** chặn

- `question_attempts` và `support_tickets` cố ý không có khoá ngoại tới bài (xem `0008`), nên xoá **không mất lịch sử** và **không bị chặn**. Nhưng nếu hộp thoại im lặng thì người xoá không biết mình vừa xoá một bài đã có người học.
- **Quyết định:** **cảnh báo, không chặn**. Chặn (như bản nháp của `D4` đề nghị) là biến một yêu cầu rõ ràng của người dùng thành _"tại sao bài này không xoá được"_. Đếm hỏng thì thôi — việc phụ không được chặn việc chính.
- **Đo thật:** hộp thoại của `g1-c1-l1` hiện _"đang được lịch sử trỏ tới: **1 báo lỗi câu hỏi**"_ — dữ liệu thật, không phải số bịa.

### F5. Lỗi CÀI ĐẶT phải nói tên file migration, không đưa chuỗi kỹ thuật cho người dùng

- Chưa chạy `0015` thì PostgREST trả `PGRST202 Could not find the function public.delete_lesson(…) in the schema cache`. Câu đó không nói phải làm gì, mà đây lại là lỗi gặp đúng **một lần ở mỗi môi trường**.
- **Quyết định:** nhận diện hai ca riêng trong `catch` — _bài đã bị xoá ở chỗ khác_ (P0002 ⇒ đóng hộp thoại + tải lại cây) và _chưa chạy migration_ (⇒ chỉ thẳng tên file). Đo được: hộp thoại hiện _"Chưa chạy migration `0015_xoa_bai_hoc_tu_giao_dien.sql`…"_ và **không xoá gì**.

### F6. `reason` trong vết xoá phải SUY từ `auth.uid()`, không được viết cứng một nguồn (`0016`)

- **Phát hiện bằng cách ĐỌC dòng vết MỚI NHẤT sau khi bấm nút** (không phải đọc mã): `reason` ghi
  _"Xoá thẳng trong DB (không qua giao diện)"_ — trong khi lần xoá đó **đi từ giao diện**. `F3` chọn
  "trigger là chỗ duy nhất ghi vết" là **đúng**, nhưng để nguyên câu chữ của `0014` thì vết **nói dối
  về nguồn**.
- **Vì sao đáng sửa dù chỉ là chữ:** `admin_audit_log` là **bằng chứng duy nhất** cho _"chuyện gì đã
  xảy ra với nội dung"_. Một dòng chỉ sai nguồn làm người đi tìm sự cố loại trừ nhầm hướng — hỏng
  đúng lúc cần nó nhất.
- **Cách sửa:** `reason` suy từ `auth.uid()` (`NULL` = xoá bằng SQL · khác `NULL` = xoá từ giao diện) —
  **cùng nguồn sự thật** với `actor_id`, nên hai trường không thể mâu thuẫn. Đã cân nhắc và **KHÔNG**
  chọn: cờ phiên `set_config` (thêm trạng thái ẩn phải nhớ đặt và nhớ đọc) · để hàm RPC tự ghi vết
  (hai dòng trùng mỗi lần bấm — chính điều `F3` tránh) · bỏ hẳn `reason` (mất thông tin miễn phí).
- **Migration MỚI chứ không sửa `0014`** (đã chạy trên DB thật — sửa migration đã áp dụng là cách chắc
  nhất để môi trường lệch nhau, bài học ở `0002`/`0003`) ⇒ `0016` dùng `CREATE OR REPLACE` + **cấp lại**
  `REVOKE`/`GRANT` (replace xoá sạch quyền cũ).
- 📌 Các dòng `lesson.delete` đã ghi TRƯỚC `0016` vẫn giữ câu cũ — bảng chỉ-thêm, không sửa lại và cũng
  **không nên** sửa.
- ✅ **Đã đo (2026-09-20, sau khi chạy `0016`):** xoá một bài thử **từ nút** ⇒ `reason = "Xoá từ trang quản
trị"` ✓ và `actor_id` = admin ✓ — **khớp nhau**, đúng như thiết kế "cùng một nguồn sự thật".
  Phép đo còn kiểm luôn rủi ro của `CREATE OR REPLACE`: quyền được cấp lại đúng nên nút xoá **vẫn chạy**
  (không `permission denied`) ✓.
  ⏳ Nhánh `auth.uid() IS NULL` (`reason = 'Xoá bằng SQL…'`) **không đo được từ phía tôi** — phải có một
  lệnh `DELETE` không JWT, mà RLS chặn đường đó; dùng câu tự kiểm (3) ở cuối `0016` trong SQL Editor.

---

## ✅ Đã kiểm chứng được gì (và **chưa** được gì)

**Đã đo, chạy thật:**

| Việc                                                  | Bằng chứng                                                                                                                                                                                                                        |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cây dựng từ dòng DB **giống hệt** cây file tĩnh       | Cổng `S-24`: so **từng khoá** trên 5 lớp · 41 chương · 362 bài · 1505 slide; canary chứng minh phép so bắt được lỗi `ageRange`                                                                                                    |
| Form sửa bài không nuốt khoá, không đổi kiểu số       | Cổng `S-23`: thử hành vi thật trên `soanBai.js`                                                                                                                                                                                   |
| Trình sửa không ghi thẳng bảng nội dung               | Cổng `S-22`: canary 4 vế                                                                                                                                                                                                          |
| App của bé **không đổi gì** khi công tắc còn `static` | Mở thật `5173`: trang chủ 5 lớp, bài `g1-c1-l1` hiện đúng 6 slide                                                                                                                                                                 |
| Đường **cache** chạy thật                             | Bơm cây giả vào `localStorage` → trang chủ hiện `Tất cả (1)` + "Chương giả"; trang bài học hiện đúng tiêu đề + slide giả                                                                                                          |
| Xoá cache thì quay về file tĩnh                       | Sau khi xoá: hết "Lớp giả", Lớp 1 hiện lại `Tất cả (10)`                                                                                                                                                                          |
| **App đọc nội dung từ DB thật**                       | Log thật: `[nội dung] đọc từ DB: 5 lớp · 41 chương · 362 bài · 1505 slide · phiên bản 1`; cache ghi `{version, soLop:5, lop1Chuong:10}`                                                                                           |
| `age_range` đã bù đủ, công tắc đã bật                 | Cổng `D-17`: `5 lớp có age_range · content_source = "remote" · content_version = N`                                                                                                                                               |
| Khách đọc được **cả cây** từ DB, không thấy bài nháp  | Cổng `D-18`: `5 lớp · 41 chương · 362 bài published · 0 bài nháp`                                                                                                                                                                 |
| **Cả vòng sửa bài chạy thật trên DB thật**            | Sửa `g1-c1-l1` → `Đã lưu bản nháp` (app bé **không** thấy, đúng) → `Đã publish thành phiên bản 3` (app bé nhận) → `Đã quay về phiên bản 1, ghi thành phiên bản 4` (app bé nhận)                                                   |
| Nội dung mới hiện ra khi bé quay lại app              | Bé mở trang chương → admin publish `phiên bản 10` → bé quay lại tab ⇒ có request `app_config` + `content_*`, cache `9 → 10`, **tiêu đề mới hiện ngay không tải lại trang**                                                        |
| Build + lint + **48 mục tự kiểm**                     | **29 cổng tĩnh + 19 mục DB**; lượt cuối: `48 PASS · 0 FAIL · 0 SKIP` (sau `0013`, và sau khi thêm `S-29` cho việc xoá bài trong DB)                                                                                               |
| `0012` chặn được khách **và** không cắt quyền admin   | `D-16` xanh: `bump_content_version:401(revoke)` · `ghi_vet_bai_hoc:401(revoke)` · 4 hàm kia `401(if is_admin)`. Bấm thật trong trình sửa: `Đã lưu bản nháp` ⇒ admin VẪN gọi được hàm                                              |
| Dọn lịch sử thử                                       | Sau `DELETE`, trình sửa chỉ còn **`v1`** — 10 phiên bản thử đã sạch                                                                                                                                                               |
| **Tạo bài học MỚI chạy thật trên DB thật**            | Bấm `Tạo bài` ⇒ `g1-c1-l13` (`draft` · `sort_order = 12` · **1 slide** `story`) · `content_version` **không đổi** (21) · 1 dòng `lesson.create` (chỉ hình dạng) · app bé **không thấy** · xoá 2 bài thử ⇒ về `362 · 0 nháp · v21` |
| **Hồ sơ bé hiện đúng số phiên bản của MỘT bé**        | Đo **4 nhánh** trên hồ sơ Bé thật bằng **màn chắn `fetch` trong trang** (DB **không** bị ghi): chưa báo · `9999 · cache` không cảnh báo · `3 · static` ⚠️ vàng · `null · db` ⚠️ vàng; số **21** đọc thật từ `app_config`          |
| Bấm thật ở đường **mới** thì tìm ra lỗi thật          | `TC-3c.11` sập `Cannot read properties of null (reading 'id')` → sửa bằng `dangSuaBai === dangChon && chiTiet?.id` (xem `D5`)                                                                                                     |

**🆕 Đo thêm 2026-09-20 — xoá bài THẲNG TRONG DB (`0014` đã chạy trên DB và đo cả hai chiều ✓):**

| Việc                                                            | Bằng chứng đo được                                                                                                                            |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Máy bé chịu được bài **0 slide**                                | Bơm cây thử vào `localStorage` ⇒ hiện _"Bài này chưa có nội dung"_, **0 lỗi trang** (trước đây: trắng trang `reading 'type'`)                 |
| Máy bé nhận ra **slide kiểu lạ**                                | `🧩 Slide này có kiểu lạ (video-xyz)…`, nút Tiếp tục vẫn chạy (trước đây: một thẻ trắng)                                                      |
| Màn hình **"không tìm thấy bài" tự chữa**                       | Nút _"Thử tải lại nội dung"_ gọi mạng thật — đếm `app_config` **2 → 3**                                                                       |
| **Không cắt ngang bài đang học** (kiểm lại `C2` sau khi đổi cờ) | Cây cache ghi `v20` trong khi DB `v21` ⇒ tải cây mới NGAY khi đang mở bài: bé **vẫn ở `1/2`**, và cache sau đó thành `v21 · 362 bài`          |
| Admin gặp bài **bị xoá trong lúc đang mở**                      | Xoá thật `g1-c1-l13` trong DB ⇒ hiện _"Bài … không còn trong DB"_, cây tự tải lại **13 → 12**, đầu trang về **362 bài**, **không** `PGRST116` |
| Cả hai app vẫn chạy bình thường sau đó                          | Bé: trang chương + bài lành ✓ · Admin: Đóng → chọn `g1-c1-l1` → đủ 6 slide ✓ · **0 lỗi trang** ở cả hai                                       |

✅ **Trigger đã đo hai chiều (2026-09-20):** tạo bài nháp ⇒ số `21 → 21` (**không đổi**) · xoá bài đã
`published` ⇒ số `22 → 23` (**tăng đúng 1**) · sổ kiểm toán có `lesson.delete` với `before` chỉ ghi hình
dạng và `actor_id` = đúng admin đã xoá · lệnh xoá của **admin đã đăng nhập** vẫn chạy được (cặp
`REVOKE`/`GRANT` trên hàm trigger không chặn trigger).
✅ **Vòng đầy đủ trên máy bé:** publish một bài thật ⇒ cache bé `v22 · 363 bài`, trang chương **13 bài**;
xoá bài đó trong DB ⇒ bé **chỉ mở lại app**, cache `v23 · 362 bài`, trang chương về **12 bài** — bài đã
xoá biến mất, không phải xoá cache tay hay bấm gì. (`content_version` hiện là **23**.)

**✅ Đã chạy xong `0012` (2026-09-20):** `D-16` **xanh**. Chi tiết: `bump_content_version: 401(revoke)` · `ghi_vet_bai_hoc: 401(revoke)` · 4 hàm còn lại bị chốt `IF NOT is_admin()`. Và điều quan trọng không kém: admin **vẫn gọi được** hàm (bấm thật `Lưu nháp` → `Đã lưu bản nháp`) — tức `CREATE OR REPLACE` đã được cấp lại quyền đúng như thiết kế. Đây đúng là cái bẫy đã sập ở `0009`, nên tôi kiểm riêng chứ không suy ra từ việc "khách bị chặn".

**✅ 5 mục "chưa kiểm chứng" của lượt trước — ĐÃ ĐO HẾT (2026-09-20):** `TC-3c.8` rút bài rồi đăng lại ✅ · `TC-3d.4` offline ✅ (xoá cache vẫn học được từ file tĩnh) · `TC-3d.5` công tắc về `static` ✅ (cache **bị xoá**) — **đã gạt THẬT trên DB, không chỉ mô phỏng** · `TC-3c.6` chặn đáp án ngoài `options` qua giao diện ✅ (nút **mờ** + khung đỏ) · `TC-3d.8` publish khi đang học dở ✅ (vẫn ở slide 3/6).

**✅ ĐÃ ĐO HẾT — không còn mục nào treo (2026-09-20, sau khi chạy `0013`):**

1. ✅ `0013` **đã chạy trên DB** — `D-19` từ **đỏ → xanh** (`có đủ 3 cột (HTTP 200) · canary bắt được cột lạ ✓`); `D-16` cũng xanh và in `create_lesson:401(revoke)`, tức `REVOKE … FROM anon` đã ăn.
2. ✅ `TC-3c.11` — **bấm tạo bài thật**: ra `g1-c1-l13` (`draft` · `sort_order = 12` · **1 slide** `story`), `content_version` **không đổi** (21), có 1 dòng `lesson.create` trong sổ kiểm toán, app của bé **không thấy** bài mới. Xoá 2 bài thử ⇒ DB về `362 bài · 0 nháp · v21`.
3. ✅ `TC-3d.9` — đo **cả 4 nhánh hiển thị** trên hồ sơ bé bằng **màn chắn `fetch` trong trang** (thay giá trị trong bộ nhớ nên **DB không bị ghi gì**): chưa báo · `9999 · cache` (không cảnh báo) · `3 · static` (⚠️ vàng) · `null · db` (⚠️ vàng). Số **21** trong dòng cảnh báo đọc thật từ `app_config`.
4. ✅ `TC-3d.10` — xoá thẳng trong DB: xem khối **"Đo thêm 2026-09-20"** ngay trên — `0014` **đã chạy** và trigger đã đo **cả hai chiều** (nháp: không tăng · publish: tăng 1), cộng vòng đầy đủ trên máy bé. Ba lỗ thật đã bịt ở app của bé + một ở Admin; việc của trigger trong `0014` thì ⏳ **còn chờ chạy trên DB** để đo.

🔴 **Lỗi thật bắt được khi bấm (không cổng tĩnh nào thấy):** `Cannot read properties of null (reading 'id')` — xem `D5`.

🔴 **Bốn lần THƯỚC tự kiểm sai trong hai lượt này** (ghi lại vì đúng loại bẫy đang gặp hoài):
(a) bản đầu cổng `S-28` **đỏ oan** vì viết cứng nháy đơn `'child_progress'` mà **prettier của repo đã đổi hết sang nháy kép** — cổng giờ nhận **cả hai**;
(b) canary của `S-28` chỉ gỡ **một** trong **hai** chỗ trải `...contentReport()`, nên cổng vẫn xanh dù đã gỡ — giờ canary gỡ hết, cộng thêm canary gỡ sót một chỗ;
(c) đếm request `app_config` ra **`0`** khi bấm nút _"Thử tải lại"_ vì trình duyệt **phục vụ từ cache** — phải đếm **trong `fetch` của trang** mới ra `2 → 3`;
(d) đọc khung chi tiết **quá sớm** nên thấy _"Đang tải bài…"_ và tưởng trang treo.
**Chờ theo TRẠNG THÁI, đừng chờ theo đồng hồ.**

---

## ✅ Lỗ sau khi chạy `0009` — đã chữa xong bằng `0012`

**Triệu chứng:** `D-16` báo `khách GỌI ĐƯỢC bump_content_version` — HTTP 200 cho người chưa đăng nhập.

**Nguyên nhân (khác với điều tôi tưởng):** trong `0009` tôi đã làm đúng \"`REVOKE ALL ... FROM PUBLIC` + `GRANT EXECUTE ... TO authenticated`\". Nhưng Supabase đặt **DEFAULT PRIVILEGES** cấp `EXECUTE` **trực tiếp** cho `anon` (và `authenticated`) trên mọi hàm mới trong schema `public`. Cấp trực tiếp thì `REVOKE ... FROM PUBLIC` **không gỡ được** — phải gỡ đúng tên `anon`. Vì vậy 4 hàm còn lại được chặn **chỉ nhờ** `IF NOT is_admin()` ở trong thân hàm, còn `bump_content_version` (không có chốt đó) lọt.

**Ảnh hưởng thật:** khách ẩn danh gọi liên tục `bump_content_version` ⇒ `content_version` nhảy lung tung ⇒ **mọi máy của bé phải tải lại ~800 KB** mỗi lần. Không đọc được dữ liệu gì, không sửa được gì — nhưng là một cách làm tốn băng thông.

**Cách chữa (`0012`):** `REVOKE ALL ON FUNCTION ... FROM anon` **tường minh** cho cả hai hàm, **và** thêm `IF NOT public.is_admin() THEN RAISE` vào chính thân hàm. Hai lớp, vì lớp `REVOKE` là thứ có thể bị mất khi `CREATE OR REPLACE` (nó **xoá** quyền đã cấp trước đó).

**Bài học đáng nhớ:** `REVOKE ... FROM PUBLIC` trên Supabase **không** có nghĩa là đã chặn `anon`. Và lớp duy nhất thật sự chặn được, trong ca này, là chốt **bên trong hàm**.
