-- ====================================================================
-- 0009_content_drafts.sql
-- Giai đoạn 3 — Lát 3c: SỬA BÀI HỌC TỪ ADMIN PORTAL
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN:
--   Lát 3a đưa nội dung lên DB, lát 3b cho NHÌN thấy nó. Nhưng cho tới nay
--   muốn sửa một lỗi chính tả vẫn phải mở SQL Editor. Lát này mở đường sửa
--   bằng giao diện, CÓ bản nháp + publish + hoàn tác.
--
-- ══════════════════════════════════════════════════════════════════════
-- 🔴 QUYẾT ĐỊNH 1 — BẢN NHÁP NẰM Ở BẢNG RIÊNG, KHÔNG PHẢI CỘT `draft_payload`
--
--   Đường dễ hơn là thêm một cột `draft_payload` vào `content_lessons`. Nhưng
--   **RLS lọc theo DÒNG, không lọc theo CỘT**: `content_lessons_public_read` cho
--   `anon` đọc mọi dòng `status = 'published'`, nên nếu bản nháp nằm chung dòng
--   thì nó lộ ra theo — đúng loại lỗ hổng đã phải vá ở GĐ 0.
--
--   Bảng riêng + **không có policy nào cho `anon`** ⇒ RLS chặn hết với người
--   thường. Cùng cách đã kiểm chứng ở `0006` (`question_attempts`) và `0008`
--   (`content_lesson_versions`); `D-13`/`D-14`/`D-15` là mẫu test cho cách đó.
-- ══════════════════════════════════════════════════════════════════════
--
-- 🔴 QUYẾT ĐỊNH 2 — PUBLISH LÀ MỘT HÀM SQL, KHÔNG PHẢI MỘT CHUỖI LỆNH TỪ CLIENT
--
--   Publish phải làm 4 việc: ghi phiên bản mới, cập nhật bài, xoá bản nháp, tăng
--   `content_version`. Gọi lần lượt từ trình duyệt thì **đứt giữa chừng là có thật**
--   (mất 4G giữa việc thứ 3): bài đã đổi nhưng phiên bản chưa ghi, hoặc ngược lại.
--   Hàm SQL chạy trong MỘT transaction — hoặc xong hết, hoặc không gì cả.
--
--   Trong hàm chạy `SECURITY INVOKER` (quyền NGƯỜI GỌI), nên RLS vẫn là thứ quyết
--   định: chỉ admin qua được. Kèm `REVOKE ... FROM PUBLIC` vì PostgreSQL mặc định
--   cho PUBLIC gọi mọi hàm — bài học từ `0006`.
--
-- 📌 NHẬT KÝ KIỂM TOÁN nằm TRONG hàm, không gọi từ JS. Nhờ vậy thao tác và vết của
--   nó không thể tách rời: không có chuyện "đổi rồi mà log ghi hụt".
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. Bảng bản nháp — mỗi bài nhiều nhất MỘT bản nháp đang soạn
--
-- Giữ CẢ thông tin chung (tiêu đề, mô tả, kiểu bài) chứ không chỉ `payload`:
-- publish phải là "lấy bản nháp ra và ghi nguyên trạng", nếu không thì lại phải
-- trộn nửa bản nháp nửa dữ liệu cũ — mà trộn nửa vời thì không phải publish.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_lesson_drafts (
  lesson_id TEXT PRIMARY KEY
    REFERENCES public.content_lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL,
  payload JSONB NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Cùng chốt chặn thô như `content_lessons`: DB canh HÌNH DẠNG LỚN, còn luật
  -- chi tiết nằm ở `admin/src/lib/contentSchema.js`. Viết luật chi tiết ở cả hai
  -- nơi là cách chắc chắn nhất để hai nơi lệch nhau.
  CONSTRAINT content_lesson_drafts_payload_la_object
    CHECK (jsonb_typeof(payload) = 'object'),
  CONSTRAINT content_lesson_drafts_payload_co_slides
    CHECK (jsonb_typeof(payload -> 'slides') = 'array')
);

ALTER TABLE public.content_lesson_drafts ENABLE ROW LEVEL SECURITY;

-- ⛔ CỐ Ý KHÔNG CÓ POLICY NÀO CHO `anon`, kể cả `SELECT`.
--    Không có policy nghĩa là RLS chặn hết với người thường.
DROP POLICY IF EXISTS "content_lesson_drafts_admin_all"
  ON public.content_lesson_drafts;
CREATE POLICY "content_lesson_drafts_admin_all"
  ON public.content_lesson_drafts
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());


-- --------------------------------------------------------------------
-- 2. `bump_content_version()` — tăng số phiên bản nội dung
--
-- Client lưu số này kèm cache. Lệch số ⇒ cache cũ ⇒ tải lại. Đây là thứ duy nhất
-- khiến app của bé biết nội dung đã đổi mà không cần build.
--
-- `value` là JSONB và có thể là số trần (`0`) hoặc bọc trong object (`{value: 0}`)
-- — `rewardService.unwrapJsonb` ở client chấp nhận cả hai, nên ở đây cũng phải.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bump_content_version()
RETURNS INT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_moi INT;
BEGIN
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

REVOKE ALL ON FUNCTION public.bump_content_version() FROM PUBLIC;
-- 🔴 PHẢI CẤP LẠI, KHÔNG ĐƯNG CHỈ REVOKE. `REVOKE ... FROM PUBLIC` lấy luôn quyền
--    gọi của `authenticated` — tức là admin cũng không gọi được, và cả 4 hàm dưới
--    sẽ chết với lỗi "permission denied for function". Mẫu đúng đã kiểm chứng ở
--    `0007_analytics_queries.sql` (dòng 148-150): revoke khỏi PUBLIC rồi cấp lại
--    cho `authenticated`. KHÔNG cấp cho `anon`.
GRANT EXECUTE ON FUNCTION public.bump_content_version() TO authenticated;

-- 📌 `bump_content_version` và `ghi_vet_bai_hoc` là hàm NỘI BỘ, nhưng vẫn phải cấp
--    cho `authenticated`: các hàm dưới chạy `SECURITY INVOKER`, mà quyền gọi hàm con
--    được kiểm theo **quyền của người gọi**. Cấp rồi thì người đã đăng nhập gọi
--    thẳng được, đổi lại:
--      • `ghi_vet_bai_hoc`: vô hại — RLS của `admin_audit_log` đòi
--        `is_admin() AND actor_id = auth.uid()`, nên người thường chèn vào là bị chặn.
--      • `bump_content_version`: người thường gọi được sẽ làm mọi máy bé tải lại nội
--        dung. Không sửa được nội dung, chỉ tốn băng thông — chấp nhận được, và vẫn
--        hơn là để admin không gọi được hàm nào.
--    Chạy `SECURITY DEFINER` sẽ tránh được chuyện này, nhưng khi đó RLS bị bỏ qua và
--    **toàn bộ** việc canh admin chỉ còn dựa vào một dòng `IF NOT is_admin()` — mất
--    một lớp chặn. Giữ `SECURITY INVOKER`.


-- --------------------------------------------------------------------
-- 3. Vết kiểm toán dùng chung cho cả 3 hàm bên dưới
--
-- 🔴 Ghi hình dạng CHỨ KHÔNG ghi `payload` đầy đủ. Một bài 11 slide ≈ 20 KB; ghi
--    nguyên payload vào log thì mỗi lần publish lại nhân đôi khối lượng đó, và
--    `admin_audit_log` sẽ phình vì đúng những dữ liệu đã có bản đầy đủ ở
--    `content_lesson_versions`. Ở đây chỉ cần trả lời "ai đổi bài nào, lúc nào,
--    từ trạng thái nào sang trạng thái nào, còn bao nhiêu slide".
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.ghi_vet_bai_hoc(
  p_action TEXT,
  p_lesson_id TEXT,
  p_before JSONB,
  p_after JSONB,
  p_reason TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  INSERT INTO public.admin_audit_log
    (actor_id, action, entity, entity_id, before, after, reason)
  VALUES
    (auth.uid(), p_action, 'content_lessons', p_lesson_id, p_before, p_after, p_reason);
END;
$$;

REVOKE ALL ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  TO authenticated;


-- --------------------------------------------------------------------
-- 4. `save_lesson_draft()` — lưu bản nháp
--
-- Là hàm chứ không phải `.upsert()` thẳng từ client, để chỗ duy nhất ghi bản nháp
-- là chỗ này: đổi cách lưu về sau (thêm cột, thêm kiểm tra) chỉ phải sửa một nơi.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.save_lesson_draft(
  p_lesson_id TEXT,
  p_title TEXT,
  p_description TEXT,
  p_lesson_type TEXT,
  p_payload JSONB
)
RETURNS TIMESTAMPTZ
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_updated TIMESTAMPTZ;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được sửa bài học' USING ERRCODE = '42501';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.content_lessons WHERE id = p_lesson_id) THEN
    RAISE EXCEPTION 'Không có bài học %', p_lesson_id USING ERRCODE = 'P0002';
  END IF;

  IF p_title IS NULL OR btrim(p_title) = '' THEN
    RAISE EXCEPTION 'Tiêu đề không được để trống' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.content_lesson_drafts AS d
    (lesson_id, title, description, lesson_type, payload, updated_at, updated_by)
  VALUES
    (p_lesson_id, btrim(p_title), p_description, p_lesson_type, p_payload,
     NOW(), auth.uid())
  ON CONFLICT (lesson_id) DO UPDATE
    SET title = EXCLUDED.title,
        description = EXCLUDED.description,
        lesson_type = EXCLUDED.lesson_type,
        payload = EXCLUDED.payload,
        updated_at = NOW(),
        updated_by = auth.uid()
  RETURNING d.updated_at INTO v_updated;

  RETURN v_updated;
END;
$$;

REVOKE ALL ON FUNCTION public.save_lesson_draft(TEXT, TEXT, TEXT, TEXT, JSONB)
  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_lesson_draft(TEXT, TEXT, TEXT, TEXT, JSONB)
  TO authenticated;


-- --------------------------------------------------------------------
-- 5. `publish_lesson()` — publish bản nháp, atomic
--
-- ⚠️ KHÔNG có tham số "đè lên bản đang có" hay "bỏ qua kiểm tra". Một hàm publish
--    mà có cờ để tắt kiểm tra thì sớm muộn sẽ có người bật cờ đó.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.publish_lesson(p_lesson_id TEXT)
RETURNS INT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_nhap    public.content_lesson_drafts%ROWTYPE;
  v_cu      public.content_lessons%ROWTYPE;
  v_tiep    INT;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được publish bài học' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_nhap
    FROM public.content_lesson_drafts WHERE lesson_id = p_lesson_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Bài % chưa có bản nháp nào để publish', p_lesson_id
      USING ERRCODE = 'P0002';
  END IF;

  SELECT * INTO v_cu FROM public.content_lessons WHERE id = p_lesson_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Không có bài học %', p_lesson_id USING ERRCODE = 'P0002';
  END IF;

  -- Số phiên bản LUÔN là max+1: lịch sử chỉ ghi thêm, không bao giờ ghi đè.
  SELECT COALESCE(MAX(version), 0) + 1 INTO v_tiep
    FROM public.content_lesson_versions WHERE lesson_id = p_lesson_id;

  INSERT INTO public.content_lesson_versions
    (lesson_id, version, title, description, lesson_type, payload, published_by)
  VALUES
    (p_lesson_id, v_tiep, v_nhap.title, v_nhap.description, v_nhap.lesson_type,
     v_nhap.payload, auth.uid());

  UPDATE public.content_lessons
     SET title = v_nhap.title,
         description = v_nhap.description,
         lesson_type = v_nhap.lesson_type,
         payload = v_nhap.payload,
         status = 'published',
         published_at = NOW(),
         published_by = auth.uid(),
         updated_at = NOW(),
         updated_by = auth.uid()
   WHERE id = p_lesson_id;

  DELETE FROM public.content_lesson_drafts WHERE lesson_id = p_lesson_id;

  PERFORM public.bump_content_version();

  PERFORM public.ghi_vet_bai_hoc(
    'lesson.publish',
    p_lesson_id,
    jsonb_build_object(
      'title', v_cu.title,
      'status', v_cu.status,
      'slides', COALESCE(jsonb_array_length(v_cu.payload -> 'slides'), 0)
    ),
    jsonb_build_object(
      'title', v_nhap.title,
      'status', 'published',
      'slides', COALESCE(jsonb_array_length(v_nhap.payload -> 'slides'), 0)
    ),
    'phiên bản ' || v_tiep
  );

  RETURN v_tiep;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_lesson(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_lesson(TEXT) TO authenticated;


-- --------------------------------------------------------------------
-- 6. `rollback_lesson()` — quay về một phiên bản cũ
--
-- 🔴 HOÀN TÁC KHÔNG PHẢI LÀ XOÁ. Nó lấy nội dung của phiên bản cũ rồi ghi thành
--    một phiên bản MỚI (max+1). Nhờ vậy:
--      • lịch sử vẫn chỉ ghi thêm — không mất dấu "đã từng publish bản lỗi";
--      • hoàn tác được CHÍNH việc hoàn tác (quay lại bản vừa bị bỏ);
--      • không có nhánh nào phải xử lý riêng cho "bài đang là bản khôi phục".
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.rollback_lesson(
  p_lesson_id TEXT,
  p_version INT
)
RETURNS INT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_cu_phien public.content_lesson_versions%ROWTYPE;
  v_cu       public.content_lessons%ROWTYPE;
  v_tiep     INT;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được hoàn tác bài học' USING ERRCODE = '42501';
  END IF;

  SELECT * INTO v_cu_phien
    FROM public.content_lesson_versions
   WHERE lesson_id = p_lesson_id AND version = p_version;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Bài % không có phiên bản %', p_lesson_id, p_version
      USING ERRCODE = 'P0002';
  END IF;

  SELECT * INTO v_cu FROM public.content_lessons WHERE id = p_lesson_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Không có bài học %', p_lesson_id USING ERRCODE = 'P0002';
  END IF;

  SELECT COALESCE(MAX(version), 0) + 1 INTO v_tiep
    FROM public.content_lesson_versions WHERE lesson_id = p_lesson_id;

  INSERT INTO public.content_lesson_versions
    (lesson_id, version, title, description, lesson_type, payload, published_by)
  VALUES
    (p_lesson_id, v_tiep, v_cu_phien.title, v_cu_phien.description,
     v_cu_phien.lesson_type, v_cu_phien.payload, auth.uid());

  UPDATE public.content_lessons
     SET title = v_cu_phien.title,
         description = v_cu_phien.description,
         lesson_type = v_cu_phien.lesson_type,
         payload = v_cu_phien.payload,
         published_at = NOW(),
         published_by = auth.uid(),
         updated_at = NOW(),
         updated_by = auth.uid()
   WHERE id = p_lesson_id;

  -- Bản nháp đang soạn (nếu có) KHÔNG bị xoá: nó là việc đang làm dở của người
  -- khác. Giữ lại để không âm thầm ném công sức của họ đi.
  PERFORM public.bump_content_version();

  PERFORM public.ghi_vet_bai_hoc(
    'lesson.rollback',
    p_lesson_id,
    jsonb_build_object(
      'title', v_cu.title,
      'slides', COALESCE(jsonb_array_length(v_cu.payload -> 'slides'), 0)
    ),
    jsonb_build_object(
      'title', v_cu_phien.title,
      'slides', COALESCE(jsonb_array_length(v_cu_phien.payload -> 'slides'), 0)
    ),
    'quay về phiên bản ' || p_version || ' (thành phiên bản ' || v_tiep || ')'
  );

  RETURN v_tiep;
END;
$$;

REVOKE ALL ON FUNCTION public.rollback_lesson(TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rollback_lesson(TEXT, INT) TO authenticated;


-- --------------------------------------------------------------------
-- 7. `set_lesson_status()` — rút bài khỏi sóng / đăng lại
--
-- 🔴 Đây là VAN AN TOÀN. Khi một bài lộ lỗi trên app của bé, việc cần làm đầu tiên
--    là RÚT NÓ XUỐNG, không phải sửa cho đúng rồi mới đăng. Sửa có thể mất 10 phút;
--    mà suốt 10 phút đó hàng trăm bé vẫn đang thấy câu sai.
--
--    Không xoá bài: xoá là mất luôn id, mà `question_attempts.lesson_id` và
--    `support_tickets.lesson_id` đang trỏ tới id đó — xoá là làm hỏng lịch sử.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_lesson_status(
  p_lesson_id TEXT,
  p_status TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_cu public.content_lessons%ROWTYPE;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được đổi trạng thái bài học' USING ERRCODE = '42501';
  END IF;

  IF p_status NOT IN ('draft', 'published') THEN
    RAISE EXCEPTION 'Trạng thái "%" không hợp lệ (chỉ draft | published)', p_status
      USING ERRCODE = '22023';
  END IF;

  SELECT * INTO v_cu FROM public.content_lessons WHERE id = p_lesson_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Không có bài học %', p_lesson_id USING ERRCODE = 'P0002';
  END IF;

  UPDATE public.content_lessons
     SET status = p_status,
         -- Lần đầu đăng thì mới đặt `published_at`; các lần sau giữ nguyên ngày
         -- gốc, vì "bài này ra mắt khi nào" không đổi theo việc rút/đăng lại.
         published_at = CASE
           WHEN p_status = 'published' AND published_at IS NULL THEN NOW()
           ELSE published_at
         END,
         published_by = CASE
           WHEN p_status = 'published' AND published_by IS NULL THEN auth.uid()
           ELSE published_by
         END,
         updated_at = NOW(),
         updated_by = auth.uid()
   WHERE id = p_lesson_id;

  -- 🔴 Có tăng `content_version`: rút/đăng bài LÀM ĐỔI thứ app của bé nhận được,
  --    nên cache ở máy bé phải bị coi là cũ.
  PERFORM public.bump_content_version();

  PERFORM public.ghi_vet_bai_hoc(
    'lesson.status',
    p_lesson_id,
    jsonb_build_object('status', v_cu.status),
    jsonb_build_object('status', p_status),
    NULL
  );

  RETURN p_status;
END;
$$;

REVOKE ALL ON FUNCTION public.set_lesson_status(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.set_lesson_status(TEXT, TEXT) TO authenticated;


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
-- 1. Bảng đã có + BẢNG NHÁP KHÔNG CÓ POLICY NÀO CHO `anon`:
--      SELECT policyname, roles::text FROM pg_policies
--      WHERE tablename = 'content_lesson_drafts';
--      -- Mong đợi: đúng 1 dòng, vai trò KHÔNG chứa `anon`
--
-- 2. SÁU hàm đã có, `anon` KHÔNG gọi được, `authenticated` GỌI ĐƯỢC:
--      SELECT proname, proacl FROM pg_proc
--      WHERE pronamespace = 'public'::regnamespace
--        AND proname IN ('bump_content_version','ghi_vet_bai_hoc',
--                        'save_lesson_draft','publish_lesson',
--                        'rollback_lesson','set_lesson_status')
--      ORDER BY proname;
--      -- Mong đợi: 6 dòng, và `proacl` KHÔNG chứa `anon=`.
--
--    Thử từ Console (đang là Khách) — phải bị chặn:
--      await __sb.rpc('publish_lesson', { p_lesson_id: 'g1-c1-l1' })
--      -- Mong đợi: lỗi quyền (401) hoặc "Chỉ admin được publish bài học"
--
-- 3. `content_version` vẫn là 0 (chưa publish gì ở lát này):
--      SELECT key, value FROM public.app_config WHERE key = 'content_version';
-- ====================================================================
