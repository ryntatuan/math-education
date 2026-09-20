-- ====================================================================
-- 0006_question_attempts.sql
-- Giai đoạn 2b — Lát 2b-1: tầng dữ liệu phân tích
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN:
--   Hôm nay chỉ biết % sao đạt được theo TỪNG BUỔI, không biết độ chính xác
--   của TỪNG CÂU TRẢ LỜI. Nên không trả lời được 3 câu hỏi:
--     A. Câu hỏi / khuôn sinh câu nào HỎNG?   (đáp án sai, đáp án nhiễu gây nhầm)
--     B. Bé sai vì ĐOÁN BỪA hay vì KHÔNG HIỂU? (cần `ms`)
--     C. KỸ NĂNG nào bé yếu thật sự?           (cần đúng/sai ở mức từng câu)
--   Bảng này ghi lại mỗi lượt trả lời để trả lời được 3 câu đó.
--   Kế hoạch đầy đủ: `docs/phase_2b_plan.md`.
--
-- ⚠️ KHÁC HẲN `support_tickets` — ĐÂY LÀ BẢNG GHI RẤT NHIỀU.
--   `support_tickets` hiếm khi có dòng mới nên đã mở cho `anon` ghi. Bảng này
--   thì mỗi câu trả lời là một dòng (~50 dòng/bé/ngày) → mở quyền ghi ẩn danh
--   là mở đường spam làm hỏng số liệu và đầy quota 500 MB.
--   NÊN: KHÁCH KHÔNG GHI. `child_id` là NOT NULL, và KHÔNG có policy nào cho
--   `anon`. Đổi ý sau này thì chỉ cần thêm 1 policy, không đổi schema — nhưng
--   hãy đọc lại `TC-2.11` trước khi mở bất cứ quyền ghi ẩn danh nào.
--
-- ⚠️ KHÔNG CÓ POLICY UPDATE / DELETE CHO BẤT KỲ AI.
--   Cùng nguyên tắc với `admin_audit_log`: dữ liệu phân tích chỉ được ghi thêm.
--   Hệ quả: việc xoá dữ liệu cũ phải đi qua hàm `purge_old_attempts()` bên dưới
--   (SECURITY DEFINER), và hàm đó bị REVOKE khỏi API — chỉ chạy từ SQL Editor.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. Bảng
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.question_attempts (
  -- BIGSERIAL chứ không phải UUID: bảng này ghi liên tục, khoá số nguyên nhỏ
  -- hơn và chèn nhanh hơn. Không có lý do gì cần UUID ở đây.
  id BIGSERIAL PRIMARY KEY,

  -- KHÔNG NULL: khách không ghi (xem ghi chú đầu file)
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,

  -- Danh tính câu hỏi. Hai dạng:
  --   'tmpl:<khuôn>'              câu sinh tự động, VD 'tmpl:g1_count'
  --   'lesson:<bài>:<số slide>'   câu viết tay trong bài học, VD 'lesson:g1-c1-l1:4'
  -- Vì sao theo KHUÔN chứ không theo từng câu: câu sinh tự động không thể hỏng
  -- riêng lẻ — cái hỏng là khuôn (đáp án nhiễu trùng, sinh số âm, quên trộn đáp án).
  question_ref TEXT NOT NULL,

  source TEXT NOT NULL
    CHECK (source IN ('lesson', 'practice', 'review', 'challenge', 'game')),

  lesson_id TEXT,      -- chỉ có khi source = 'lesson'
  topic TEXT,          -- kỹ năng; chỉ có với câu sinh tự động
  grade SMALLINT
    CHECK (grade IS NULL OR grade BETWEEN 1 AND 5),

  -- Bé có thể bỏ máy đi chơi rồi quay lại → số này thành rác.
  -- Client ghi NULL khi vượt trần 300 giây; CHECK ở đây là chốt chặn thứ hai.
  ms INT
    CHECK (ms IS NULL OR ms BETWEEN 0 AND 300000),

  is_correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 2. Index — CHỈ 2 cái.
--    Bảng ghi liên tục nên mỗi index thêm vào đều làm chậm mọi lần ghi.
-- --------------------------------------------------------------------

-- Câu hỏi B và C: tra theo từng bé
CREATE INDEX IF NOT EXISTS question_attempts_child_idx
  ON public.question_attempts (child_id, created_at DESC);

-- Câu hỏi A: gộp theo câu / khuôn để tính tỉ lệ sai
CREATE INDEX IF NOT EXISTS question_attempts_ref_idx
  ON public.question_attempts (question_ref, is_correct);

-- Cố ý KHÔNG đặt index riêng trên `created_at`: `purge_old_attempts()` chạy rất
-- thưa, quét toàn bảng một lần là chấp nhận được, còn index thì phải trả giá
-- ở MỌI lần ghi.


-- --------------------------------------------------------------------
-- 3. Bật RLS
-- --------------------------------------------------------------------
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;


-- --------------------------------------------------------------------
-- 4. Phụ huynh: ghi và đọc lượt trả lời của CHÍNH bé mình
--    Cố ý KHÔNG cho UPDATE/DELETE — dữ liệu phân tích chỉ được ghi thêm.
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "question_attempts_parent_insert" ON public.question_attempts;
CREATE POLICY "question_attempts_parent_insert" ON public.question_attempts
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.question_attempts.child_id
        AND public.child_profiles.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "question_attempts_parent_select" ON public.question_attempts;
CREATE POLICY "question_attempts_parent_select" ON public.question_attempts
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.question_attempts.child_id
        AND public.child_profiles.parent_id = auth.uid()
    )
  );


-- --------------------------------------------------------------------
-- 5. Admin: đọc tất cả (màn hình /analytics ở lát 2b-2)
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "question_attempts_admin_read" ON public.question_attempts;
CREATE POLICY "question_attempts_admin_read" ON public.question_attempts
  FOR SELECT TO authenticated
  USING (public.is_admin());


-- ⛔ KHÔNG có policy nào cho `anon` — cố ý. Xem ghi chú đầu file.


-- --------------------------------------------------------------------
-- 6. Hàm xoá dữ liệu cũ
--    Vì không ai có quyền DELETE qua API, đây là đường DUY NHẤT để dọn bảng.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.purge_old_attempts(keep_days INT DEFAULT 180)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted BIGINT;
BEGIN
  -- Chặn xoá nhầm: gọi purge_old_attempts(0) mà không có chốt này là mất sạch.
  IF keep_days IS NULL OR keep_days < 30 THEN
    RAISE EXCEPTION 'keep_days phải >= 30 (chặn xoá nhầm). Nhận được: %', keep_days;
  END IF;

  DELETE FROM public.question_attempts
  WHERE created_at < NOW() - make_interval(days => keep_days);

  GET DIAGNOSTICS deleted = ROW_COUNT;
  RETURN deleted;
END;
$$;

-- KHÔNG phơi hàm này ra API. Mặc định PostgreSQL cho PUBLIC gọi mọi hàm,
-- nên phải thu hồi tường minh — nếu không, bất kỳ ai có anon key cũng xoá được
-- toàn bộ dữ liệu phân tích qua /rest/v1/rpc/purge_old_attempts.
REVOKE ALL ON FUNCTION public.purge_old_attempts(INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.purge_old_attempts(INT) FROM anon;
REVOKE ALL ON FUNCTION public.purge_old_attempts(INT) FROM authenticated;


-- --------------------------------------------------------------------
-- 7. Kiểm chứng nhanh (chạy tay nếu muốn)
-- --------------------------------------------------------------------
-- SELECT policyname, cmd, roles::text FROM pg_policies
--  WHERE tablename = 'question_attempts' ORDER BY policyname;
--   -> 3 policy: admin_read, parent_insert, parent_select. KHÔNG có policy anon.
--
-- SELECT public.purge_old_attempts();       -- xoá dữ liệu cũ hơn 180 ngày
-- SELECT public.purge_old_attempts(365);    -- giữ 1 năm
-- SELECT public.purge_old_attempts(10);     -- PHẢI báo lỗi (chốt chặn xoá nhầm)
