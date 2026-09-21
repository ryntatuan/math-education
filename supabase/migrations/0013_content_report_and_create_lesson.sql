-- ====================================================================
-- 0013_content_report_and_create_lesson.sql
-- Hai việc, cùng một file vì cùng phục vụ Giai đoạn 3 (CMS):
--   PHẦN A — Đóng nốt DoD #6: biết MỘT BÉ CỤ THỂ đang dùng phiên bản nội
--            dung nào, và đang chạy nội dung từ NGUỒN nào.
--   PHẦN B — `create_lesson()`: tạo bài học MỚI từ Admin Portal.
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
-- ====================================================================


-- ====================================================================
-- PHẦN A — BÉ ĐANG DÙNG PHIÊN BẢN NỘI DUNG NÀO
--
-- VÌ SAO CẦN (lý do đã ghi từ `0008`, tới giờ mới làm):
--   Khi có khiếu nại "bài này vẫn sai", câu hỏi đầu tiên là **máy bé đang
--   thấy bản nào**. Trước file này, `content_version` chỉ nằm trong
--   `localStorage` của máy bé — Admin KHÔNG nhìn thấy, nên không phân biệt
--   được hai ca hoàn toàn khác nhau:
--     (a) nội dung trên DB vẫn sai  -> phải sửa nội dung
--     (b) nội dung đã đúng, nhưng máy bé còn cache/bundle cũ
--         -> chỉ cần bé mở app lên mạng, KHÔNG phải sửa gì
--
-- ⚠️ ĐỌC KỸ GIỚI HẠN CỦA 3 CỘT NÀY — ĐỪNG HIỂU SAI:
--   Chúng là **báo cáo của máy bé lần cuối còn mạng**, KHÔNG phải trạng thái
--   trực tiếp. Máy đang offline thì không báo lên được (đúng lúc cần biết
--   nhất!). Nên `content_seen_at` phải được đọc CÙNG với con số:
--     "bé này báo phiên bản 12, lúc 3 ngày trước"  -> có thể còn thấy bản cũ
--     "bé này báo phiên bản 21, lúc 5 phút trước" -> đang thấy bản mới nhất
--   `content_source = 'static'` là ca đáng nghi nhất: máy bé đang chạy nội
--   dung NẰM TRONG BUNDLE (bản lúc build app), không phải cache, không phải DB.
--
-- Vì sao không đẩy lên ngay lúc nạp nội dung mà lại theo nhịp đồng bộ tiến độ:
--   1 request nhỏ thêm mỗi lần mở app là không cần thiết — máy bé đã có sẵn
--   nhịp đồng bộ tiến độ (bắn rồi quên), và một bé ĐANG DÙNG thì chắc chắn
--   có nhịp đó. Đổi lại: con số có thể trễ vài phút so với thời điểm nạp.
-- ====================================================================

ALTER TABLE public.child_progress
  ADD COLUMN IF NOT EXISTS content_version INT,
  ADD COLUMN IF NOT EXISTS content_source  TEXT,
  ADD COLUMN IF NOT EXISTS content_seen_at TIMESTAMPTZ;

COMMENT ON COLUMN public.child_progress.content_version IS
  'Số content_version máy bé báo lên lần cuối. NULL = máy bé đang dùng file tĩnh trong bundle (không có số), hoặc chưa từng báo.';

COMMENT ON COLUMN public.child_progress.content_source IS
  'Nguồn cây nội dung máy bé đang dùng: db | cache | static. static = đang chạy bản trong bundle (build app), đáng nghi nhất khi có khiếu nại nội dung cũ.';

COMMENT ON COLUMN public.child_progress.content_seen_at IS
  'Lúc máy bé BÁO LÊN (lần cuối còn mạng) — KHÔNG phải lúc nạp nội dung. Đọc kèm content_version: số cũ + mốc cũ = bé lâu rồi chưa nhận bản mới.';

-- Chốt giá trị hợp lệ cho `content_source`. Cố ý KHÔNG chốt `content_version`
-- theo một khoảng nào: số phiên bản chỉ tăng, và ép nó vào một trần cứng là
-- tự tạo lỗi vào ngày vượt trần.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'child_progress_content_source_hop_le'
  ) THEN
    ALTER TABLE public.child_progress
      ADD CONSTRAINT child_progress_content_source_hop_le
      CHECK (content_source IS NULL OR content_source IN ('static', 'db', 'cache'));
  END IF;
END $$;

-- ⛔ KHÔNG thêm policy nào cho 3 cột này. RLS của `child_progress` đã đúng:
--    phụ huynh ghi được hàng của bé mình (client đang dùng chính đường đó để
--    đồng bộ tiến độ), admin đọc được hết, khách không thấy gì. Cột mới thừa
--    hưởng nguyên các policy theo DÒNG — đó là lý do không cần cấp quyền thêm.


-- ====================================================================
-- PHẦN B — TẠO BÀI HỌC MỚI
--
-- 🔴 VÌ SAO LÀ HÀM SQL chứ không phải `.insert()` từ trình duyệt:
--   (1) MÃ BÀI phải sinh ra ở MỘT chỗ. Mã có ý nghĩa (`g1-c1-l13` = lớp 1,
--       chương 1, bài 13) và đang được `question_attempts.lesson_id` +
--       `support_tickets.lesson_id` trỏ tới. Hai trình duyệt cùng bấm "Tạo"
--       một lúc mà mỗi bên tự tính số thì cả hai ra `-l13` — người sau bị
--       khoá chính chặn, hoặc tệ hơn là ghi đè. Trong hàm thì việc tính số và
--       việc chèn nằm trong CÙNG một transaction.
--   (2) Vết kiểm toán ghi NGAY TRONG hàm — thao tác và vết không tách rời,
--       đúng như `publish_lesson` đang làm.
--   (3) Cổng `S-22` cấm Admin ghi thẳng vào bảng nội dung. Muốn tạo bài thì
--       phải có hàm — và có hàm thì cũng có luôn chỗ để kiểm quyền.
-- ====================================================================

CREATE OR REPLACE FUNCTION public.create_lesson(
  p_chapter_id  TEXT,
  p_title       TEXT,
  p_description TEXT DEFAULT NULL,
  p_lesson_type TEXT DEFAULT 'learn'
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_id      TEXT;
  v_so      INT;
  v_sort    INT;
  v_payload JSONB;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được tạo bài học' USING ERRCODE = '42501';
  END IF;

  IF p_title IS NULL OR btrim(p_title) = '' THEN
    RAISE EXCEPTION 'Tiêu đề không được để trống' USING ERRCODE = '22023';
  END IF;

  IF p_lesson_type IS NULL OR btrim(p_lesson_type) = '' THEN
    RAISE EXCEPTION 'Kiểu bài không được để trống' USING ERRCODE = '22023';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.content_chapters WHERE id = p_chapter_id
  ) THEN
    RAISE EXCEPTION 'Không có chương %', p_chapter_id USING ERRCODE = 'P0002';
  END IF;

  -- Số bài kế tiếp: đếm theo MÃ (`<chương>-lN`), không đếm theo số dòng.
  -- Đếm dòng sẽ sinh mã trùng khi có bài bị rút/ẩn, còn đếm theo mã thì mã
  -- luôn là chưa-từng-dùng. `~ '-l[0-9]+$'` để bỏ qua mọi mã không đúng dạng.
  SELECT COALESCE(MAX((regexp_replace(id, '^.*-l', ''))::INT), 0)
    INTO v_so
    FROM public.content_lessons
   WHERE chapter_id = p_chapter_id
     AND id ~ '-l[0-9]+$';

  v_id := p_chapter_id || '-l' || (v_so + 1);

  -- Chỗ đứng trong chương: tính RIÊNG khỏi số mã. Nếu ai đó đã đổi thứ tự
  -- bằng tay thì bài mới vẫn vào CUỐI, không chen vào giữa.
  SELECT COALESCE(MAX(sort_order), 0) + 1
    INTO v_sort
    FROM public.content_lessons
   WHERE chapter_id = p_chapter_id;

  -- Bài mới bắt đầu với ĐÚNG MỘT slide `story` giữ chỗ.
  --   Vì sao không để 0 slide: một bài 0 slide mà lỡ bấm Đăng thì app của bé
  --   mở ra màn hình trống, và người tạo không có chỗ nào để bắt đầu gõ.
  --   `mascotMood` là khoá BẮT BUỘC của slide `story` (xem
  --   `admin/src/lib/contentSchema.js`) nên phải có sẵn, nếu không slide đầu
  --   tiên đã là slide không hợp lệ.
  v_payload := jsonb_build_object(
    'slides',
    jsonb_build_array(
      jsonb_build_object(
        'type', 'story',
        'content', jsonb_build_object(
          'text', '(Bài mới — chưa có nội dung. Sửa bài này rồi mới bấm Đăng.)',
          'mascotMood', 'happy'
        )
      )
    )
  );

  INSERT INTO public.content_lessons
    (id, chapter_id, title, lesson_type, description, sort_order, status,
     payload, updated_at, updated_by)
  VALUES
    (v_id, p_chapter_id, btrim(p_title), btrim(p_lesson_type),
     NULLIF(btrim(COALESCE(p_description, '')), ''),
     v_sort, 'draft', v_payload, NOW(), auth.uid());

  PERFORM public.ghi_vet_bai_hoc(
    'lesson.create',
    v_id,
    NULL,
    jsonb_build_object(
      'chapter_id', p_chapter_id,
      'title', btrim(p_title),
      'status', 'draft',
      'slides', 1
    ),
    'Tạo bài mới trong chương ' || p_chapter_id
  );

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_lesson(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
-- 🔴 PHẢI `REVOKE ... FROM anon` TƯỜNG MINH. Supabase đặt DEFAULT PRIVILEGES cấp
--    `EXECUTE` thẳng cho `anon`, nên `REVOKE ... FROM PUBLIC` KHÔNG gỡ được —
--    đúng cái bẫy đã sập ở `0012` với `bump_content_version` (khách gọi được,
--    HTTP 200). Xem `TC-3c.9` và dòng cuối bảng "Xử lý khi test FAIL".
REVOKE ALL ON FUNCTION public.create_lesson(TEXT, TEXT, TEXT, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.create_lesson(TEXT, TEXT, TEXT, TEXT) TO authenticated;


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
-- 1. Ba cột mới đã có:
--      SELECT column_name, data_type FROM information_schema.columns
--       WHERE table_name = 'child_progress'
--         AND column_name IN ('content_version','content_source','content_seen_at')
--       ORDER BY column_name;
--      -- Mong đợi: 3 dòng (integer, text, timestamp with time zone)
--
-- 2. 🔴 Khách ẩn danh KHÔNG gọi được `create_lesson` (phải lỗi quyền):
--      -- Trong Console app của bé, đang ở chế độ Khách:
--      const r = await __sb.rpc('create_lesson',
--        { p_chapter_id: 'g1-c1', p_title: 'Thử' });
--      console.log(r.error?.message ?? '⚠️ GỌI ĐƯỢC — LỖ HỔNG');
--      -- Mong đợi: lỗi quyền (HTTP 401)
--
-- 3. `create_lesson` chỉ ĐỌC + chèn 1 dòng, không xoá gì:
--      SELECT proname, proacl FROM pg_proc
--       WHERE proname = 'create_lesson';
--      -- Mong đợi: proacl KHÔNG chứa `anon=`
--
-- 4. Sau khi tạo thử một bài từ Admin, vết kiểm toán phải có:
--      SELECT created_at, action, entity_id, after, reason
--        FROM public.admin_audit_log
--       WHERE action = 'lesson.create' ORDER BY created_at DESC LIMIT 3;
-- ====================================================================
