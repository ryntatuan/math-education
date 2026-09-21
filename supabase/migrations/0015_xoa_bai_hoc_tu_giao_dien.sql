-- ============================================================================
-- 0015 — XOÁ BÀI HỌC TỪ TRANG QUẢN TRỊ (có chốt chặn gõ chữ)
--
-- 🔴 FILE NÀY ĐỔI MỘT QUYẾT ĐỊNH CŨ. `D4` (lát 3c) kết luận *"KHÔNG có chỗ xoá bài,
--    dùng Rút bài thay thế"*. Người dùng đã yêu cầu ngược lại: cần xoá được, nhưng
--    kèm một chốt chặn đủ mạnh để không bấm nhầm. Quyết định mới ở nhóm `F` trong
--    `docs/phase_3c_3d_decisions.md` — `D4` và `E2` đã được sửa lại cho khỏi mâu thuẫn.
--    **Vẫn KHÔNG có đường xoá CHƯƠNG** — cố ý, và cổng `S-30` canh đúng điều đó.
--
-- ────────────────────────────────────────────────────────────────────────────
-- VÌ SAO LÀ MỘT HÀM SQL, KHÔNG PHẢI `.delete()` TỪ TRÌNH DUYỆT
--
-- Cổng `S-22` cấm trang Admin ghi thẳng vào bảng nội dung (`content_lessons`,
-- `content_lesson_drafts`…): mọi thay đổi nội dung phải đi qua hàm SQL, nơi có
-- `is_admin()` và có ghi vết. Đây là hàm thứ NĂM của họ đó (`create_lesson`,
-- `save_lesson_draft`, `publish_lesson`, `rollback_lesson`, `set_lesson_status`).
--
-- 📌 Việc xoá KHÔNG tự ghi vết ở đây, và đó là cố ý: trigger `0014` đã ghi một dòng
--    `lesson.delete` cho MỌI đường xoá (SQL Editor hay giao diện). Ghi thêm ở đây là
--    mỗi lần bấm nút sẽ có **hai** dòng trùng — mà sổ kiểm toán thì chỉ-thêm, không
--    sửa lại được. `actor_id` trong dòng vết phân biệt sẵn hai đường: có `actor_id`
--    = xoá từ giao diện (biết ai), `NULL` = xoá bằng SQL Editor.
--
-- 📌 Cùng lý do, việc TĂNG `content_version` cũng do trigger `0014` lo.
--
-- ⚠️ **Chốt chặn "gõ đúng chữ" nằm ở GIAO DIỆN, không ở đây.** Một hàm SQL không thể
--    bắt người gọi gõ gì. Thứ bảo vệ ở tầng DB là: hàm chỉ admin gọi được, và
--    `REVOKE … FROM anon` (bẫy Supabase cấp `EXECUTE` thẳng cho `anon` — đã sập một
--    lần ở `0012`, nên lần nào cũng phải viết tường minh).
-- ============================================================================

CREATE OR REPLACE FUNCTION public.delete_lesson(p_lesson_id TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_bai public.content_lessons;
BEGIN
  -- Chốt 1: chỉ quản trị viên. `SECURITY INVOKER` nên RLS cũng chặn, nhưng kiểm
  -- tường minh để thông báo lỗi đọc được thay vì "0 dòng bị ảnh hưởng".
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ quản trị viên được xoá bài học'
      USING ERRCODE = '42501';
  END IF;

  -- Chốt 2: bài phải đang tồn tại. Không có chốt này thì hàm "thành công" trong khi
  -- chẳng xoá gì, và người dùng tưởng đã xong.
  SELECT * INTO v_bai FROM public.content_lessons WHERE id = p_lesson_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Không có bài học %', p_lesson_id USING ERRCODE = 'P0002';
  END IF;

  -- Việc xoá thật. Trigger `0014` sẽ tăng `content_version` (nếu bài đã publish) và
  -- ghi vết `lesson.delete` — trong CÙNG transaction với lệnh này.
  --
  -- 📌 Xoá bài KHÔNG làm mất lịch sử học tập: `question_attempts.lesson_id` và
  --    `support_tickets.lesson_id` cố ý không có khoá ngoại (xem `0008`), nên các
  --    dòng đó vẫn giữ nguyên mã bài cũ. Đánh đổi đã biết: lịch sử cũ trỏ tới một mã
  --    bài không còn tồn tại — giao diện đã phải chịu được (xem `TC-3d.10`).
  DELETE FROM public.content_lessons WHERE id = p_lesson_id;

  RETURN p_lesson_id;
END;
$$;

-- Mẫu đã dùng ở `0009`/`0012`/`0014`: revoke khỏi PUBLIC **và** khỏi `anon` tường minh,
-- rồi cấp lại cho `authenticated`. `CREATE OR REPLACE` xoá sạch quyền cũ nên phải
-- cấp lại — thiếu dòng GRANT là nút xoá chết với `permission denied for function`.
REVOKE ALL ON FUNCTION public.delete_lesson(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_lesson(TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.delete_lesson(TEXT) TO authenticated;

COMMENT ON FUNCTION public.delete_lesson(TEXT) IS
  'Xoá một BÀI học (không xoá chương). Chỉ admin. Việc tăng content_version và ghi '
  'lesson.delete do trigger 0014 lo. Chốt chặn gõ chữ nằm ở giao diện.';

-- ============================================================================
-- KIỂM NGAY SAU KHI CHẠY (SQL Editor)
--
-- 🔴 SQL Editor chạy **KHÔNG có JWT** ⇒ `auth.uid()` là NULL ⇒ `is_admin()` false ⇒
--    **MỌI hàm CMS có chốt admin** đều TỪ CHỐI bằng `42501 … Chỉ admin …` — kể cả chính
--    `delete_lesson` của file này. **ĐÓ LÀ ĐÚNG THIẾT KẾ**, không phải hàm hỏng.
--    Trong SQL Editor: dựng dữ liệu bằng **SQL THÔ** (`INSERT`/`UPDATE`/`DELETE`).
--    (Bản hướng dẫn đầu của file này ghi sai đúng chỗ đó — sửa 2026-09-20.)
--
--   -- (1) Hàm đã có?
--   SELECT proname FROM pg_proc WHERE proname = 'delete_lesson';
--   -- Mong đợi: 1 dòng
--
--   -- (2) Quyền — ĐÚNG hai điều đáng canh, không cần JWT
--   SELECT
--     has_function_privilege('anon',          'public.delete_lesson(text)', 'EXECUTE') AS khach,
--     has_function_privilege('authenticated', 'public.delete_lesson(text)', 'EXECUTE') AS admin;
--   -- Mong đợi: khach = false · admin = true
--
--   -- (3) Đường xoá thật — SQL THÔ (trigger `0014` vẫn chạy)
--   INSERT INTO public.content_lessons
--     (id, chapter_id, title, lesson_type, status, payload, sort_order)
--   VALUES
--     ('g1-c1-thu-xoa', 'g1-c1', 'Bài để thử xoá', 'learn', 'draft',
--      '{"slides": []}'::jsonb, 999);
--   SELECT value FROM public.app_config WHERE key = 'content_version';   -- ghi lại số cũ
--   DELETE FROM public.content_lessons WHERE id = 'g1-c1-thu-xoa';
--   SELECT action, entity_id, before, actor_id FROM public.admin_audit_log
--    WHERE action = 'lesson.delete' ORDER BY created_at DESC LIMIT 2;
--   -- Mong đợi: ĐÚNG 1 dòng cho mã vừa xoá (KHÔNG phải 2), `actor_id` = NULL
--   SELECT COUNT(*) FROM public.content_lessons;   -- phải về lại đúng 362
--
--   -- (4) Muốn thử CHÍNH hàm `delete_lesson` thì thử từ trang quản trị đã đăng nhập
--   --     (`TC-3c.12`), KHÔNG thử ở đây.
-- ============================================================================
