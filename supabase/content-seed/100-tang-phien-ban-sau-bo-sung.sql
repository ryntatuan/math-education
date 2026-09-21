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
-- BỐI CẢNH LẦN NÀY (2026-09-22, lần 2): bổ sung HÌNH MINH HOẠ cho bài học — thêm 17 kiểu
--   hình vẽ SVG (trục số, khung 10 ô, bảng hàng, thước đo, tiền Việt Nam, hình phẳng/hình
--   khối, phân số, sơ đồ đoạn thẳng, sơ đồ chuyển động, biểu đồ cột/quạt…) vào **cả 459
--   bài**. Số bài và số slide KHÔNG đổi — hình nằm THÊM trong `content` của slide đã có.
--   ⇒ Quy mô vẫn là: 5 lớp · 51 chương · **459 bài · 2438 slide**.
--   ✅ Lần này KHÔNG cần `00-don-noi-dung-cu.sql` (không có bài nào bị bỏ khỏi chương
--      trình), nhưng chạy nó vẫn VÔ HẠI — nó chỉ xoá bài không còn trong file tĩnh.
--
-- 📌 LẦN TRƯỚC (giữ lại để tra khi cần): dựng lại chương trình Lớp 1–3 theo đúng số chủ đề
--   SGK (Lớp 1: 10 · Lớp 2: 10 → 14 · Lớp 3: 10 → 16). Khi đó số bài ĐỔI và có **79 bài mồ
--   côi** buộc phải dọn bằng `00-don-noi-dung-cu.sql` chạy TRƯỚC seed (seed chỉ upsert).
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
-- Kiểm HÌNH MINH HOẠ (mới, 2026-09-22 lần 2) — vào slide "hình ảnh" của vài bài:
--   • Lớp 1 Bài 2 (g1-c1-l2): phải thấy KHUNG 10 Ô (3 quả táo) và TRỤC SỐ 1–2–3.
--   • Lớp 4 (g4-c5-l2): toán Tổng–Tỉ phải có SƠ ĐỒ ĐOẠN THẲNG hai đoạn dài ngắn.
--   • Lớp 5 (g5-c4-l6): sơ đồ chuyển động phải ghi "Hai xe đi NGƯỢC CHIỀU, gặp nhau".
--     🔴 Nếu thấy "Hai xe đi RA XA nhau" là DÁN THIẾU — chạy lại `06-bai-lop-5.sql`.
--   • Bảng số liệu KHÔNG được chồng chữ: bề rộng cột tự co theo nội dung.
