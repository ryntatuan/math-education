-- ════════════════════════════════════════════════════════════════════════════
-- `0017` — Đẩy phiên bản nội dung KHÔNG được phụ thuộc phiên đăng nhập
--
-- VÌ SAO CẦN (lỗi thật, đo được 2026-09-20):
--
--   `0012` bọc `bump_content_version()` bằng `IF NOT public.is_admin() THEN RAISE 42501`
--   — để bịt lỗ hổng khách ẩn danh gọi RPC tăng phiên bản tuỳ ý (`D-16`). Đúng.
--
--   Nhưng `0014`/`0016` lại cho trigger `sau_khi_xoa_bai_hoc` gọi CHÍNH hàm đó:
--
--       IF OLD.status = 'published' THEN
--         PERFORM public.bump_content_version();   -- ← nằm NGOÀI khối EXCEPTION
--       END IF;
--
--   `is_admin()` = `profiles.role = 'admin' AND id = auth.uid()`. Mà **SQL Editor
--   KHÔNG có JWT** ⇒ `auth.uid()` NULL ⇒ `is_admin()` false ⇒ hàm RAISE. Lời gọi
--   nằm ngoài khối `EXCEPTION` (khối đó chỉ bọc phần ghi vết) nên lỗi ném thẳng ra
--   ngoài và **huỷ cả câu DELETE**.
--
--   ⇒ Hệ quả: xoá một bài **ĐÃ PUBLISH** bằng SQL thô trong SQL Editor **THẤT BẠI**
--     với `42501 Chỉ admin được đổi phiên bản nội dung`. Trái hẳn với yêu cầu của
--     dự án: "xoá bài học trong database thì cũng không bị crash hay lỗi".
--
--   Vì sao trước đây không lộ ra: các phép đo ở `0014`/`0016` đều xoá bởi **admin
--   đã đăng nhập** (`actor_id` = admin ⇒ `is_admin()` true ⇒ không RAISE), hoặc xoá
--   bài `draft` (không đi vào nhánh tăng số). Ca "xoá bài published bằng SQL thô"
--   chưa từng được chạy — nên lỗi nằm im.
--
-- CÁCH CHỮA — tách phần THÂN ra khỏi phần CHỐT QUYỀN:
--
--   • `_tang_phien_ban_noi_dung()`  — hàm NỘI BỘ, `SECURITY DEFINER`, KHÔNG kiểm
--     quyền, không cấp cho `anon`/`authenticated`/`PUBLIC`.
--   • `bump_content_version()`      — hàm công khai: GIỮ NGUYÊN chốt admin của
--     `0012` rồi gọi hàm nội bộ (khách vẫn bị chặn như cũ).
--   • trigger                        — gọi THẲNG hàm nội bộ ⇒ không còn phụ thuộc
--     phiên đăng nhập.
--
--   Một chỗ duy nhất giữ luật "tăng số", hai lối vào với hai mức quyền khác nhau.
--
-- PHẠM VI ẢNH HƯỞNG: chỉ thay thân hàm. Trigger `xoa_bai_hoc_an_toan` (AFTER DELETE)
--   vẫn trỏ vào cùng tên hàm nên KHÔNG phải tạo lại.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Hàm NỘI BỘ: chỉ tăng số, không hỏi ai ─────────────────────────────────
CREATE OR REPLACE FUNCTION public._tang_phien_ban_noi_dung()
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_moi INT;
BEGIN
  -- Thân hàm lấy nguyên từ `0012`: chấp nhận cả jsonb number và jsonb object
  -- (`{"value": N}`) để không phụ thuộc hình dạng dữ liệu cũ.
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
  RETURNING (value #>> '{}')::INT INTO v_moi;

  RETURN COALESCE(v_moi, 0);
END;
$$;

-- 🔴 `REVOKE ... FROM PUBLIC` một mình là KHÔNG ĐỦ trên Supabase: DEFAULT PRIVILEGES
--    cấp `EXECUTE` thẳng cho `anon` và `authenticated` trên mọi hàm mới trong
--    `public`. Phải thu hồi TƯỜNG MINH từng role (đã mắc thật ở `0009`/`0012`).
REVOKE ALL ON FUNCTION public._tang_phien_ban_noi_dung() FROM PUBLIC;
REVOKE ALL ON FUNCTION public._tang_phien_ban_noi_dung() FROM anon;
REVOKE ALL ON FUNCTION public._tang_phien_ban_noi_dung() FROM authenticated;

COMMENT ON FUNCTION public._tang_phien_ban_noi_dung() IS
  'Hàm NỘI BỘ: tăng content_version lên 1. KHÔNG kiểm quyền (không cấp cho role nào) '
  'vì chỉ được gọi từ (a) hàm công khai bump_content_version() SAU khi đã qua chốt '
  'admin, và (b) trigger sau_khi_xoa_bai_hoc() — lúc đó không có JWT, mà việc tăng '
  'số là hệ quả bắt buộc của một lần xoá thật, không phải yêu cầu của người dùng.';

-- ── 2. Hàm CÔNG KHAI: giữ nguyên chốt admin của `0012` ───────────────────────
CREATE OR REPLACE FUNCTION public.bump_content_version()
RETURNS INT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được đổi phiên bản nội dung'
      USING ERRCODE = '42501';
  END IF;

  RETURN public._tang_phien_ban_noi_dung();
END;
$$;

-- Cấp lại sau `CREATE OR REPLACE` (Postgres gỡ quyền cũ khi tạo lại hàm).
REVOKE ALL ON FUNCTION public.bump_content_version() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.bump_content_version() FROM anon;
GRANT EXECUTE ON FUNCTION public.bump_content_version() TO authenticated;

-- ── 3. Trigger: gọi hàm NỘI BỘ, không còn phụ thuộc JWT ──────────────────────
CREATE OR REPLACE FUNCTION public.sau_khi_xoa_bai_hoc()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_nguon CONSTANT TEXT := CASE
    WHEN auth.uid() IS NULL THEN 'Xoá bằng SQL (không có phiên đăng nhập)'
    ELSE 'Xoá từ trang quản trị'
  END;
BEGIN
  -- ── 1. Bài ĐÃ PUBLISH bị xoá ⇒ nội dung mà bé đang thấy vừa thay đổi ───────
  --    Phải tăng số phiên bản, nếu không máy bé không bao giờ biết mà tải lại.
  --    Bài `draft` thì KHÔNG tăng: bé chưa từng thấy nó, mà tăng lại bắt mọi máy
  --    tải lại ~800 KB vô ích.
  --
  --    🔴 Gọi hàm NỘI BỘ (không kiểm quyền) — đây chính là chỗ `0016` hỏng. Gọi
  --       `bump_content_version()` ở đây thì khi xoá bằng SQL thô (không JWT) sẽ
  --       RAISE và **huỷ luôn câu DELETE**.
  --    ⚠️ KHÔNG bọc trong khối EXCEPTION: nếu việc tăng số hỏng thật thì phải ồn
  --       ào, đừng để rơi vào âm thầm — "xoá rồi mà máy bé vẫn giữ bài đó" đúng là
  --       lớp lỗi mà cả GĐ 3 này đang chống.
  IF OLD.status = 'published' THEN
    PERFORM public._tang_phien_ban_noi_dung();
  END IF;

  -- ── 2. Ghi vết ──────────────────────────────────────────────────────────────
  --    `before` chỉ ghi HÌNH DẠNG, không ghi payload: một slide có thể nặng hàng
  --    chục KB, nhân lên vài trăm bài là sổ phình vô ích.
  --
  --    🔴 Bọc trong khối `EXCEPTION` **có chủ ý**: ghi vết hỏng KHÔNG được phép
  --       chặn việc xoá. Khối này là một subtransaction nên bắt lỗi ở đây không
  --       làm hỏng transaction ngoài.
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
        v_nguon
      );
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  RETURN OLD;
END;
$$;

REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM anon;
GRANT EXECUTE ON FUNCTION public.sau_khi_xoa_bai_hoc() TO authenticated;

COMMENT ON FUNCTION public.sau_khi_xoa_bai_hoc() IS
  'AFTER DELETE trên content_lessons: tăng content_version nếu bài đã publish, và ghi '
  'một dòng lesson.delete. reason suy từ auth.uid() (NULL = xoá bằng SQL) nên không '
  'bao giờ nói sai nguồn. Từ 0017: phần tăng số gọi hàm NỘI BỘ '
  '_tang_phien_ban_noi_dung() — trước đó gọi bump_content_version() nên khi xoá bằng '
  'SQL thô (không JWT) thì RAISE 42501 và huỷ cả câu DELETE.';

-- ════════════════════════════════════════════════════════════════════════════
-- KIỂM NGAY SAU KHI CHẠY  (SQL thô — KHÔNG gọi hàm CMS nào có chốt admin,
-- vì SQL Editor không có JWT; xem `0015`/`0016` để biết đã mắc lỗi này 3 lần)
-- ════════════════════════════════════════════════════════════════════════════

-- (0) Quyền: hàm nội bộ phải KHÔNG ai gọi được; hàm công khai vẫn như cũ.
SELECT
  has_function_privilege('anon', 'public._tang_phien_ban_noi_dung()', 'EXECUTE')          AS anon_goi_noi_bo,     -- phải false
  has_function_privilege('authenticated', 'public._tang_phien_ban_noi_dung()', 'EXECUTE') AS auth_goi_noi_bo,     -- phải false
  has_function_privilege('anon', 'public.bump_content_version()', 'EXECUTE')              AS anon_goi_cong_khai,  -- phải false
  has_function_privilege('authenticated', 'public.bump_content_version()', 'EXECUTE')     AS auth_goi_cong_khai;  -- phải true

-- (1) Dựng một bài `published` để thử. Id CỐ Ý không theo mẫu `-l<n>` để bộ đếm của
--     `create_lesson()` không bị nhảy.
INSERT INTO public.content_lessons
  (id, chapter_id, title, lesson_type, description, sort_order, status, payload)
VALUES
  ('g1-c1-thu-xoa-2', 'g1-c1', 'Bài thử xoá (0017)', 'learn', 'thử trigger',
   999, 'published',
   '{"slides":[{"type":"story","content":{"mascotMood":"happy","text":"Slide thử cho phép kiểm trigger xoá."}}]}'::jsonb)
ON CONFLICT (id) DO UPDATE
  SET status = 'published', payload = EXCLUDED.payload;

SELECT (value #>> '{}')::INT AS phien_ban_truoc
FROM public.app_config WHERE key = 'content_version';

-- (2) 🔴 CA TỪNG HỎNG: xoá bài published bằng SQL thô, KHÔNG có JWT.
--     Trước `0017`: `ERROR: 42501: Chỉ admin được đổi phiên bản nội dung` và câu
--     xoá bị huỷ (bài vẫn còn).
DELETE FROM public.content_lessons WHERE id = 'g1-c1-thu-xoa-2';

-- (3) Phải xoá ĐƯỢC, và phiên bản phải TĂNG đúng 1.
SELECT COUNT(*) AS con_lai FROM public.content_lessons WHERE id = 'g1-c1-thu-xoa-2';
-- Mong đợi: 0

SELECT (value #>> '{}')::INT AS phien_ban_sau
FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: bằng `phien_ban_truoc` + 1

SELECT action, entity_id, reason, actor_id
FROM public.admin_audit_log
WHERE entity_id = 'g1-c1-thu-xoa-2'
ORDER BY created_at DESC LIMIT 1;
-- Mong đợi: action = lesson.delete · reason = 'Xoá bằng SQL (không có phiên đăng nhập)'
--           · actor_id = NULL

-- (4) Bài `draft` bị xoá thì KHÔNG được tăng số (bé chưa từng thấy nó):
INSERT INTO public.content_lessons
  (id, chapter_id, title, lesson_type, description, sort_order, status, payload)
VALUES
  ('g1-c1-thu-xoa-3', 'g1-c1', 'Bài thử xoá nháp (0017)', 'learn', 'thử trigger',
   999, 'draft', '{"slides":[]}'::jsonb)
ON CONFLICT (id) DO UPDATE SET status = 'draft';

SELECT (value #>> '{}')::INT AS truoc_khi_xoa_nhap
FROM public.app_config WHERE key = 'content_version';

DELETE FROM public.content_lessons WHERE id = 'g1-c1-thu-xoa-3';

SELECT (value #>> '{}')::INT AS sau_khi_xoa_nhap
FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: KHÔNG đổi (bằng `truoc_khi_xoa_nhap`)
