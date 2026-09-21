-- ============================================================================
-- 0014 — XOÁ BÀI HỌC THẲNG TRONG DB THÌ APP PHẢI TỰ LÀNH
--
-- 🔴 KHÔNG có file này để thêm một đường xoá từ giao diện. Admin vẫn chỉ có
--    **Rút bài** (về `draft`), cố ý — xem `docs/phase_3c_3d_decisions.md` mục `D4`.
--    File này lo phần ngược lại: **khi ai đó xoá bằng SQL**, thì app của bé và
--    trang Admin không được vỡ, và cũng không được "im lặng sai".
--
-- ────────────────────────────────────────────────────────────────────────────
-- 🔴 VẤN ĐỀ 1 — XOÁ BẰNG SQL THÌ KHÔNG AI TĂNG `content_version`
--
-- `content_version` là thứ DUY NHẤT khiến app của bé biết nội dung đã đổi. Ba đường
-- ghi qua giao diện (publish · hoàn tác · rút bài) đều gọi `bump_content_version()`.
--
-- Một lệnh `DELETE FROM public.content_lessons WHERE id = 'g1-c1-l13'` dán vào SQL
-- Editor thì **không gọi ai cả** ⇒ số phiên bản không đổi ⇒ mọi máy bé giữ nguyên
-- cache ⇒ **bài đã xoá vẫn hiện trên máy bé, mãi mãi**, cho tới khi có ai đó publish
-- một bài khác. Không có lỗi nào hiện ra ở đâu: không exception, không log, không
-- màn hình đỏ. Đúng loại lỗi tệ nhất — sai mà không có triệu chứng.
--
-- ────────────────────────────────────────────────────────────────────────────
-- 🔴 VẤN ĐỀ 2 — KHÔNG AI GHI LẠI VIỆC XOÁ
--
-- `admin_audit_log` là sổ chỉ-thêm và là bằng chứng duy nhất cho "chuyện gì đã xảy
-- ra với nội dung". Mọi thao tác qua giao diện đều có vết; xoá bằng SQL thì không.
--
-- ────────────────────────────────────────────────────────────────────────────
-- CÁCH CHỮA — MỘT TRIGGER `AFTER DELETE`
--
-- Trigger chạy trong **CÙNG transaction** với lệnh xoá, nên không có cửa sổ nào để
-- quên: không thể xoá xong mà chưa tăng số, và không thể tăng số mà việc xoá lại
-- thất bại (cùng sống cùng chết).
--
-- ⚠️ **Vì sao `SECURITY DEFINER`:** người xoá có thể là SQL Editor (chạy bằng
--    `postgres`), hoặc một admin đã đăng nhập. Hàm này ghi vào `app_config` và
--    `admin_audit_log` — **cả hai đều bật RLS**. Chạy `SECURITY DEFINER` với
--    `search_path` ghim để nó chỉ phụ thuộc vào chính nó, không phụ thuộc quyền của
--    người bấm xoá. Mục tiêu của file này là *"xoá được, và app tự lành"* — KHÔNG
--    phải *"thêm một lý do nữa để lệnh xoá thất bại"*.
--
-- ⚠️ **Xoá một CHƯƠNG sẽ xoá dây chuyền các bài của nó** (`ON DELETE CASCADE` ở
--    `content_lessons.chapter_id`), và trigger chạy **cho TỪNG bài** ⇒ trong một
--    transaction, `content_version` có thể nhảy nhiều lần. Vô hại (số này chỉ để
--    SO, không phải số đếm chính xác) nhưng cố ý ghi lại để người sau không tưởng
--    là lỗi rồi đi "sửa".
--
-- 📌 Ba bảng trỏ tới mã bài mà **cố ý không có khoá ngoại**:
--    `question_attempts.lesson_id` · `support_tickets.lesson_id` (xem ghi chú trong
--    `0008_content_schema.sql`). Nhờ vậy xoá bài **không bị chặn** và **không mất**
--    lịch sử học tập — hai bảng đó vẫn giữ nguyên mã bài cũ. Giao diện đã phải chịu
--    được mã bài không còn tồn tại (xem ghi chú ở `AdminPage`/hồ sơ bé).
--
-- 📌 `content_lesson_drafts` và `content_lesson_versions` đều `ON DELETE CASCADE`
--    theo `content_lessons`: xoá bài là xoá luôn bản nháp và lịch sử phiên bản của
--    nó — đúng ý (không còn bài thì lịch sử của bài đó vô nghĩa). Tạo lại cùng mã
--    (`g1-c1-l13`) thì `publish_lesson` đếm `MAX(version)+1` = 1, không xung đột.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.sau_khi_xoa_bai_hoc()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  -- ── 1. Bài ĐÃ PUBLISH bị xoá ⇒ nội dung mà bé đang thấy vừa thay đổi ─────────
  --    Phải tăng số phiên bản, nếu không máy bé không bao giờ biết mà tải lại.
  --    Bài `draft` thì KHÔNG tăng: bé chưa từng thấy nó, mà tăng lại bắt mọi máy
  --    tải lại ~800 KB vô ích.
  IF OLD.status = 'published' THEN
    PERFORM public.bump_content_version();
  END IF;

  -- ── 2. Ghi vết ───────────────────────────────────────────────────────────────
  --    Đây là đường xoá duy nhất còn lại (giao diện không có nút xoá), nên thiếu
  --    vết ở đây là sổ kiểm toán thủng đúng chỗ nguy hiểm nhất.
  --    `before` chỉ ghi HÌNH DẠNG, không ghi payload: một slide có thể nặng hàng
  --    chục KB, nhân lên vài trăm bài là sổ phình vô ích.
  --
  --    🔴 Bọc trong khối `EXCEPTION` **có chủ ý**: ghi vết hỏng KHÔNG được phép
  --       chặn việc xoá. Khối này là một subtransaction nên bắt lỗi ở đây không
  --       làm hỏng transaction ngoài. Đánh đổi đã cân: mất một dòng vết còn hơn
  --       "không xoá được bài" — cái sau chặn hẳn công việc của người dùng.
  BEGIN
    INSERT INTO public.admin_audit_log
      (actor_id, action, entity, entity_id, before, after, reason)
    VALUES
      (
        auth.uid(),
        'lesson.delete',
        'content_lessons',
        OLD.id,
        jsonb_build_object(
          'chapter_id', OLD.chapter_id,
          'title', OLD.title,
          'status', OLD.status,
          'slides',
          CASE
            WHEN jsonb_typeof(OLD.payload -> 'slides') = 'array'
              THEN jsonb_array_length(OLD.payload -> 'slides')
            ELSE 0
          END
        ),
        NULL,
        'Xoá thẳng trong DB (không qua giao diện)'
      );
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS xoa_bai_hoc_an_toan ON public.content_lessons;
CREATE TRIGGER xoa_bai_hoc_an_toan
  AFTER DELETE ON public.content_lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.sau_khi_xoa_bai_hoc();

-- 🔴 Đây KHÔNG phải API cho client. Gọi nó qua REST đã vô nghĩa (`trigger functions
--    can only be called as triggers` → 400), nhưng vẫn chốt quyền cho rõ ràng: mẫu
--    `REVOKE ... FROM PUBLIC` rồi `GRANT ... TO authenticated` là mẫu đã dùng ở
--    `0009`/`0012`, và `REVOKE ... FROM anon` phải viết riêng vì Supabase cấp quyền
--    EXECUTE thẳng cho `anon` qua DEFAULT PRIVILEGES (bẫy đã sập ở `0012`).
REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM anon;
GRANT EXECUTE ON FUNCTION public.sau_khi_xoa_bai_hoc() TO authenticated;

COMMENT ON FUNCTION public.sau_khi_xoa_bai_hoc() IS
  'AFTER DELETE trên content_lessons: tăng content_version nếu bài đã publish, và ghi '
  'một dòng lesson.delete vào admin_audit_log. Để xoá bằng SQL không làm app của bé '
  'giữ lại bài đã xoá. SECURITY DEFINER vì app_config/admin_audit_log đều có RLS.';

COMMENT ON TRIGGER xoa_bai_hoc_an_toan ON public.content_lessons IS
  'Xoá bài bằng SQL ⇒ tự tăng content_version để mọi máy bé tải lại. Không tạo đường xoá từ UI.';

-- ============================================================================
-- KIỂM NGAY SAU KHI CHẠY (dán vào SQL Editor — chạy cả 4 câu, theo thứ tự)
--
--   -- (1) Trigger đã có mặt?
--   SELECT tgname FROM pg_trigger
--    WHERE tgrelid = 'public.content_lessons'::regclass AND NOT tgisinternal;
--   -- Mong đợi: 1 dòng `xoa_bai_hoc_an_toan`
--
--   -- (2) Tạo một bài ĐỂ THỬ rồi đẩy lên published (bài thật không bị đụng tới)
--   SELECT public.create_lesson('g1-c1', 'Bài để thử xoá');
--   UPDATE public.content_lessons SET status = 'published'
--    WHERE title = 'Bài để thử xoá';
--
--   -- (3) Ghi lại số cũ
--   SELECT value FROM public.app_config WHERE key = 'content_version';
--
--   -- (4) Xoá thẳng — KHÔNG qua giao diện
--   DELETE FROM public.content_lessons WHERE title = 'Bài để thử xoá';
--   SELECT value FROM public.app_config WHERE key = 'content_version';
--   -- Mong đợi: số TĂNG 1 so với (3)
--
--   SELECT action, entity_id, before, reason FROM public.admin_audit_log
--    WHERE action = 'lesson.delete' ORDER BY created_at DESC LIMIT 2;
--   -- Mong đợi: có dòng vừa xoá, `before` chỉ có hình dạng (không payload)
--
-- ⚠️ Câu (2) đẩy lên `published` nên bài thử **có thể lộ ra cho bé** trong vài giây
--    (nội dung chỉ là 1 slide giữ chỗ). Chạy lúc không có bé nào đang học.
-- ============================================================================
