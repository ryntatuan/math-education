-- ====================================================================
-- 0005_support_tickets.sql
-- Giai đoạn 2c — Hộp thư báo lỗi câu hỏi
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN:
--   Khi phụ huynh phát hiện một câu hỏi sai đáp án / sai chính tả / khó hiểu,
--   hiện không có cách nào báo lại — họ phải nhắn riêng. Bảng này biến việc đó
--   thành một hàng đợi cho Admin xử lý.
--
-- LƯU Ý VỀ PHẠM VI:
--   GĐ 2c KHÔNG sửa được nội dung tại chỗ — nội dung bài học còn nằm trong file
--   tĩnh (`client/src/data/gradeXData.js`). Việc sửa nóng là GĐ 3 (CMS).
--   Nên ticket phải chụp lại ĐỦ thông tin để sau này tìm và sửa: câu hỏi, đáp
--   án đúng, bài nào, slide thứ mấy.
--
-- ⚠️ VỀ QUYỀN GHI ẨN DANH:
--   App có chế độ Khách, và khách chiếm phần lớn người dùng ban đầu — chặn họ
--   báo lỗi là mất phần lớn phản hồi. Nhưng GĐ 0 vừa vá một lỗ hổng đúng loại
--   này (policy `USING (true)` trên `leaderboard`), nên TUYỆT ĐỐI không mở
--   `WITH CHECK (true)`.
--   Thay vào đó policy của `anon` bị khoá chặt: chỉ được INSERT, `child_id`
--   phải NULL, `status` phải là 'new', không được tự đặt `admin_note` /
--   `resolved_*`, và độ dài bị giới hạn. Blast radius tối đa = thêm được dòng
--   rác vào ĐÚNG bảng này; không đọc, không sửa, không xoá được gì.
--   Nếu sau này bị spam: đổi policy `anon` thành không cho INSERT, và bắt đăng
--   nhập mới báo lỗi — chỉ cần sửa 1 policy, không đổi schema.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. Bảng
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- NULL = khách báo (chưa đăng nhập). Xem ghi chú về quyền ẩn danh ở trên.
  child_id UUID REFERENCES public.child_profiles(id) ON DELETE SET NULL,

  -- Vị trí câu hỏi để Admin tìm lại trong file nội dung
  lesson_id TEXT,
  slide_index INT,

  -- Ảnh chụp nội dung tại thời điểm báo — KHÔNG phụ thuộc vào việc sau này
  -- nội dung có bị sửa hay không.
  question_text TEXT NOT NULL,
  correct_answer TEXT,

  report_type TEXT NOT NULL DEFAULT 'other'
    CHECK (report_type IN ('wrong_answer', 'typo', 'unclear', 'other')),
  message TEXT,

  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in_progress', 'resolved', 'rejected')),
  admin_note TEXT,
  resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  resolved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Chặn dữ liệu rác ngay ở tầng DB, không chỉ ở tầng app
  CONSTRAINT support_tickets_message_len CHECK (
    message IS NULL OR char_length(message) <= 1000
  ),
  CONSTRAINT support_tickets_question_len CHECK (
    char_length(question_text) <= 2000
  )
);

-- Danh sách của Admin: lọc theo trạng thái rồi sắp mới nhất trước
CREATE INDEX IF NOT EXISTS support_tickets_status_created_idx
  ON public.support_tickets (status, created_at DESC);

-- Hồ sơ bé (sau này có thể hiện "bé này đã báo gì")
CREATE INDEX IF NOT EXISTS support_tickets_child_idx
  ON public.support_tickets (child_id, created_at DESC);


-- --------------------------------------------------------------------
-- 2. Bật RLS
-- --------------------------------------------------------------------
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;


-- --------------------------------------------------------------------
-- 3. Phụ huynh: xem và tạo ticket cho CHÍNH bé của mình
--    Cố ý KHÔNG cho UPDATE/DELETE — phụ huynh không được sửa hay xoá ticket.
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "support_tickets_parent_select" ON public.support_tickets;
CREATE POLICY "support_tickets_parent_select" ON public.support_tickets
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.support_tickets.child_id
        AND public.child_profiles.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "support_tickets_parent_insert" ON public.support_tickets;
CREATE POLICY "support_tickets_parent_insert" ON public.support_tickets
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.support_tickets.child_id
        AND public.child_profiles.parent_id = auth.uid()
    )
    AND status = 'new'
    AND resolved_by IS NULL
    AND resolved_at IS NULL
    AND admin_note IS NULL
  );


-- --------------------------------------------------------------------
-- 4. Khách: CHỈ được tạo ticket, và bị khoá chặt (xem ghi chú đầu file)
--
-- ⚠️ CỐ Ý KHÔNG CÓ POLICY SELECT CHO `anon` — ĐỪNG THÊM VÀO.
--    Đây không phải thiếu sót: cho khách SELECT nghĩa là ai cũng đọc được
--    báo lỗi của người khác.
--
--    Hệ quả thực tế cần nhớ: khi khách ghi ticket thì TUYỆT ĐỐI không gọi
--    `.select()` sau `.insert()` (tức đừng dùng `Prefer: return=representation`).
--    Muốn trả về dòng vừa ghi thì PostgREST phải ĐỌC LẠI dòng đó, và bước đọc
--    lại bị policy SELECT chặn → lỗi trả về là "new row violates row-level
--    security policy", rất dễ chẩn đoán nhầm thành lỗi ở policy INSERT.
--    Đã đo thực tế: cùng payload, `.insert({...})` → 201 OK;
--    `.insert({...}).select("id")` → 42501 vi phạm RLS.
--
--    `client/src/components/report/ReportQuestionButton.jsx` đang làm đúng:
--    `.insert({...})` không kèm `.select()`.
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "support_tickets_anon_insert" ON public.support_tickets;
CREATE POLICY "support_tickets_anon_insert" ON public.support_tickets
  FOR INSERT TO anon
  WITH CHECK (
    child_id IS NULL
    AND status = 'new'
    AND resolved_by IS NULL
    AND resolved_at IS NULL
    AND admin_note IS NULL
    AND char_length(question_text) BETWEEN 1 AND 2000
    AND (message IS NULL OR char_length(message) <= 1000)
  );


-- --------------------------------------------------------------------
-- 5. Admin: xem tất cả
--    (UPDATE đã có sẵn từ 0001 — policy `*_admin_all` theo bảng;
--     nếu 0001 chưa tạo cho bảng này thì thêm ở đây)
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "support_tickets_admin_read" ON public.support_tickets;
CREATE POLICY "support_tickets_admin_read" ON public.support_tickets
  FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "support_tickets_admin_update" ON public.support_tickets;
CREATE POLICY "support_tickets_admin_update" ON public.support_tickets
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
