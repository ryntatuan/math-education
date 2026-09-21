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
-- BỐI CẢNH LẦN NÀY (2026-09-22): dựng lại toàn bộ chương trình Lớp 1–3 theo đúng số chủ
--   đề của SGK (Lớp 1: 10 · Lớp 2: 10 → **14** · Lớp 3: 10 → **16**), Lớp 4–5 đã rà từng
--   bài và KHÔNG có lỗi chủ đề. Đây là lần đổi cấu trúc lớn nhất từ trước tới nay.
--   ⇒ Số bài ĐỔI: 5 lớp · 51 chương · **459 bài · 2438 slide**.
--   ⚠️ Lần này BẮT BUỘC chạy `00-don-noi-dung-cu.sql` TRƯỚC khi dán seed: có 79 bài bị
--      bỏ khỏi chương trình, mà seed chỉ upsert nên chúng sẽ ở lại DB và vẫn hiện trên app.
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
-- Mong đợi: SỐ CŨ + 1. Con số cụ thể KHÔNG quan trọng — app chỉ cần thấy số **khác**
--   số cũ là sẽ tải lại nội dung. (Đo ngày 2026-09-22: 27 → **28**.)

-- ── 3. Kiểm SAU khi đẩy: công tắc vẫn phải là "remote" ─────────────────────
SELECT key, value FROM public.app_config
WHERE key IN ('content_source', 'content_version') ORDER BY key;
-- Mong đợi: content_source = "remote" · content_version = số cũ + 1 (đo được: 28).

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
