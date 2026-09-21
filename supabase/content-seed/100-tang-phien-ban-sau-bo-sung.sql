-- ════════════════════════════════════════════════════════════════════════════
-- BƯỚC CUỐI: ĐẨY PHIÊN BẢN NỘI DUNG — viết tay, KHÔNG do script sinh.
--
-- VÌ SAO PHẢI CÓ FILE NÀY (lỗi âm thầm nếu thiếu):
--   Các file `0X-bai-lop-*.sql` chỉ GHI bài vào bảng. File `99-...` chỉ đặt
--   `content_version = 1` KHI ĐANG NHỎ HƠN 1 (cố ý, để chạy lại không kéo lùi
--   phiên bản admin đã publish). Nghĩa là chạy lại seed KHÔNG làm phiên bản tăng
--   ⇒ máy các bé vẫn dùng cây đã cache và KHÔNG BAO GIỜ thấy bài mới.
--   App chỉ tải lại nội dung khi `content_version` đổi. Bước này bù đúng chỗ đó.
--
-- KHI NÀO CHẠY: sau khi dán lại seed, mỗi lần nội dung thay đổi. Chạy SAU cùng.
-- CHẠY LẠI NHIỀU LẦN: chỉ làm phiên bản tăng thêm 1 mỗi lần — vô hại (các bé tải
--   lại nội dung thêm một lần), không sinh dòng trùng, không mất dữ liệu.
--
-- BỐI CẢNH LẦN NÀY (2026-09-22, lần 3): SỬA LỖI HIỂN THỊ HÌNH + THÊM HÌNH CHO CÂU HỎI.
--   Người dùng tự nhìn màn hình rồi báo 4 lỗi, và soát thêm ra 4 lỗi nữa cùng họ:
--     • Khung 10 ô khai THIẾU số liệu: bài 9 + 4 khai `extra: 3` trong khi phải là 4
--       (4 = 1 + 3) ⇒ dự liệu cũ vẽ ra 12 ô. Nay `extra: 4` ⇒ 13 ô, khớp lời giảng.
--     • 16 câu hỏi nay CÓ HÌNH để nhìn: 1 câu đếm con chim, 8 câu "trên biểu đồ",
--       7 câu lời văn (thước đo / sơ đồ hai băng giấy 20 cm và 17 cm).
--     • Hai câu hỏi trỏ vào hình không tồn tại ("Trong hình chữ nhật ABCD",
--       "Vật nào dưới đây") đã bỏ phần trỏ sai — không đổi đáp án.
--   Số bài và số slide KHÔNG đổi; hình nằm THÊM trong `content` của slide đã có.
--   ⇒ Quy mô vẫn là: 5 lớp · 51 chương · **459 bài · 2438 slide**.
--   ⚠️ LẦN NÀY BẮT BUỘC dán `02`, `03`, `04` VÀ `05` (cả bốn đều có thay đổi).
--      `01` và `06` không đổi. `00-don-noi-dung-cu.sql` KHÔNG cần (không bài nào bị bỏ),
--      nhưng chạy nó vẫn VÔ HẠI — nó chỉ xoá bài không còn trong file tĩnh.
--
-- 📌 LẦN TRƯỚC (lần 2): bổ sung HÌNH MINH HOẠ — thêm 17 kiểu hình vẽ SVG (trục số, khung
--   10 ô, bảng hàng, thước đo, tiền Việt Nam, hình phẳng/khối, phân số, sơ đồ đoạn thẳng,
--   sơ đồ chuyển động, biểu đồ cột/quạt…) vào cả 459 bài. DB nào chưa từng nạp lần 2 thì các
--   file seed dưới đây vẫn bao trùm đủ cả hai lần — cứ dán theo đúng thứ tự là xong.
-- 📌 LẦN TRƯỚC NỮA: dựng lại chương trình Lớp 1–3 theo đúng số chủ đề SGK (Lớp 1: 10 ·
--   Lớp 2: 10 → 14 · Lớp 3: 10 → 16). Khi đó số bài ĐỔI và có **79 bài mồ côi** buộc phải
--   dọn bằng `00-don-noi-dung-cu.sql` chạy TRƯỚC seed (seed chỉ upsert).
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Kiểm TRƯỚC khi đẩy: số bài từng lớp ───────────────────────────────
SELECT split_part(id, '-', 1) AS lop, COUNT(*) AS so_bai
FROM public.content_lessons
GROUP BY 1
ORDER BY 1;
-- Mong đợi: g1 = 97 · g2 = 120 · g3 = 123 · g4 = 65 · g5 = 54 (tổng 459).

-- Tổng toàn hệ thống và số bài nháp (phải là 0 — seed luôn ghi `published`).
SELECT
  (SELECT COUNT(*) FROM public.content_lessons) AS tong_bai,
  (SELECT COUNT(*) FROM public.content_lessons WHERE status = 'draft') AS so_nhap,
  (SELECT COUNT(*) FROM public.content_lesson_versions) AS so_phien_ban;
-- Mong đợi: tong_bai = 459 · so_nhap = 0 · so_phien_ban >= 459 (mỗi bài ít nhất một
--   dòng v1; một số bài có thể có thêm v2, v3 … nếu admin từng publish).

-- ── 2. Đẩy phiên bản ───────────────────────────────────────────────────────
-- 🔴 ĐỪNG gọi `public.bump_content_version()` Ở ĐÂY. Đã mắc thật, nguyên văn:
--      Failed to run sql query: ERROR: 42501: Chỉ admin được đổi phiên bản nội dung
--      CONTEXT: PL/pgSQL function bump_content_version() line 6 at RAISE
--    Vì `0012` đã bọc hàm đó bằng `IF NOT public.is_admin() THEN RAISE` (để khách
--    không gọi được qua RPC — lỗ hổng `D-16` cũ), mà `is_admin()` là
--    `profiles.role = 'admin' AND id = auth.uid()`; SQL Editor KHÔNG có JWT nên
--    `auth.uid()` NULL ⇒ `is_admin()` false ⇒ hàm TỪ CHỐI. **Đúng thiết kế.**
--    ⇒ Trong SQL Editor phải làm việc TƯƠNG ĐƯƠNG bằng SQL thô dưới đây. Câu lệnh
--      này CHÍNH LÀ thân của hàm kia, chạy bằng quyền chủ sở hữu bảng nên không đi
--      qua chốt admin — kết quả y hệt, chỉ khác là không cần phiên đăng nhập.
UPDATE public.app_config
SET value = to_jsonb(
      COALESCE(
        CASE WHEN jsonb_typeof(value) = 'number' THEN (value #>> '{}')::INT END,
        CASE WHEN jsonb_typeof(value) = 'object' THEN (value ->> 'value')::INT END,
        0
      ) + 1
    ),
    updated_at = NOW()
WHERE key = 'content_version'
RETURNING (value #>> '{}')::INT AS phien_ban_moi;
-- Mong đợi: SỐ CŨ + 1. Con số CỤ THỂ không quan trọng — app chỉ cần thấy số **khác**
--   số cũ là sẽ tải lại nội dung. (Cố ý KHÔNG ghi số đo cụ thể ở đây: con số đó lệch
--   ngay sau lần chạy sau, và một "mong đợi" lỗi thời còn tệ hơn không có.)

-- ── 3. Kiểm SAU khi đẩy: công tắc vẫn phải là "remote" ─────────────────────
SELECT key, value FROM public.app_config
WHERE key IN ('content_source', 'content_version') ORDER BY key;
-- Mong đợi: content_source = "remote" · content_version = số cũ + 1.

-- ── 4. Kiểm trên app của bé (không cần SQL) ────────────────────────────────
-- Mở lại app (đúng tài khoản bé đã dùng trước đó) và xem log:
--   [nội dung] đọc từ DB: 5 lớp · 51 chương · 459 bài · 2438 slide · phiên bản N
--
-- Kiểm ĐÚNG những chỗ từng sai — đây là lỗi mà chủ app tự phát hiện:
--   • Lớp 2 → chương về phép nhân CHỈ được có bảng nhân 2 và bảng nhân 5.
--     KHÔNG còn bảng nhân 3, 4 (trước đây nằm sai ở Lớp 2).
--   • Lớp 3 → chương 1 và chương 2 PHẢI có bảng nhân/chia 3, 4 — đây mới là chỗ đúng SGK.
--   • Lớp 2 KHÔNG còn dạy "một phần mấy" (1/2, 1/3, 1/4, 1/5) — chủ đề đó thuộc Lớp 3.
--   • Lớp 1 và Lớp 3 không còn dạy "cộng trừ qua 10" / "phân số" nữa.
--
-- Kiểm HÌNH và CÂU HỎI — đúng những chỗ vừa sửa (2026-09-22 lần 3):
--   • Lớp 2 Bài 1 (g2-c2-l1) slide 3/5: khung 10 ô phải vẽ 9 ô xanh + 1 ô xanh lá TRONG
--     khung, rồi dấu "+" và 3 ô xanh lá NGOÀI khung ⇒ tổng 13 ô.
--     🔴 Nếu chỉ thấy 10 ô, hoặc thấy "+ 2" ⇒ DÁN THIẾU: chạy lại `03-bai-lop-2.sql`.
--   • Lớp 2 (g2-c2-l2) slide 3/5: 8 ô xanh + 2 ô xanh lá trong khung, "+" và 3 ô ngoài = 13.
--   • Lớp 1 Bài 2 (g1-c1-l2) slide câu hỏi "Hình dưới đây có mấy con chim?":
--     phải thấy 3 con chim để bé đếm. Dán thiếu thì câu hỏi không có gì để nhìn.
--   • Câu hỏi có chữ "trên biểu đồ" (Lớp 2: g2-c13-l3, g2-c13-l4, g2-c13-l6, g2-c14-l7;
--     Lớp 3: g3-c15-l2, g3-c15-l4, g3-c16-l5) phải có khay hình bên dưới câu hỏi.
--   • Câu hỏi lời văn có hình: Lớp 1 (g1-c7-l4, g1-c7-l8) và Lớp 2 (g2-c5-l7) có THƯỚC ĐO;
--     Lớp 2 (g2-c1-l7, g2-c1-l9) và Lớp 3 (g3-c4-l3) có SƠ ĐỒ ĐOẠN THẲNG.
--     Số của mỗi hàng ("20 cm", "17 cm") phải nằm BÊN TRÁI, ngay trước thanh.
--   • Trục số: số ở mốc cuối KHÔNG bị mũi tên đè lên; vòng cung "nhảy" (nếu có) nông,
--     không vượt ra ngoài khung.
--   • Sơ đồ đoạn thẳng (toán Tổng–Tỉ, Lớp 4 `g4-c5-l2`): nhãn "Tổng 35" phải HIỆN ĐỦ,
--     không bị cắt ở mép phải.
--   • Đầu mỗi thẻ slide: nút đọc CHỈ CÒN ICON LOA, nhãn loại slide ("Bài học", "Quan sát",
--     "Thử thách", "Tổng kết") nằm cùng hàng; ở slide câu hỏi thứ tự là [loa] rồi [cờ].
--   • Chữ dài trong slide "hình ảnh" phải xuống dòng đúng như dữ liệu
--     (ví dụ g2-c2-l1: dòng thứ hai là "↑ tách 4 thành 1 và 3").
