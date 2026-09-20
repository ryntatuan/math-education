-- ====================================================================
-- 0008_content_schema.sql
-- Giai đoạn 3 — Lát 3a: ĐƯA NỘI DUNG BÀI HỌC VÀO DB
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN:
--   Toàn bộ nội dung bài học hiện nằm trong 6 file JS tĩnh (~797 KB) nằm trong
--   bundle của app. Muốn sửa một lỗi chính tả cũng phải build lại và phát hành
--   bản mới — mà trẻ đã cài app thì có thể không bao giờ nhận được bản đó.
--   Bảng ở đây đưa nội dung lên DB để sửa được không cần build.
--
-- ⚠️ LÁT 3a CHỈ DỰNG CHỖ CHỨA — CHƯA ĐỔI HÀNH VI CỦA APP.
--   Sau khi chạy file này và chạy script migrate, app VẪN đọc file tĩnh như cũ,
--   vì `app_config.content_source` vẫn là 'static'. Không có gì thay đổi với
--   người dùng cho tới lát 3d. Đây là chủ ý: dựng và kiểm dữ liệu trước, bật sau.
--
-- SỐ ĐO THẬT (bằng `node scratch/inspect_content_shape.mjs`):
--   5 lớp · 41 chương · 362 bài · 1505 slide
--   Sáu kiểu slide: quiz, story, summary, concept, visual, dialogue
--   🔴 Truyện (`storyData.js`) KHÔNG nằm trong phạm vi này — đó là hệ riêng.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. Lớp
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_grades (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- --------------------------------------------------------------------
-- 2. Chương
--
-- ⚠️ CỐ Ý KHÔNG CÓ CỘT `total_lessons`.
--   File tĩnh có trường `totalLessons`, nhưng **5 chương ghi sai**:
--     g2-c8 khai 10 / thật 2 · g2-c9 khai 10 / thật 2 · g2-c10 khai 12 / thật 3
--     g3-c9 khai 10 / thật 2 · g3-c10 khai 12 / thật 3
--   Hiện tại không gây lỗi, vì `GradePage.jsx` và `HomePage.jsx` đều viết
--   `chapter.lessons?.length || chapter.totalLessons` — số thật luôn thắng.
--   Nhưng nếu chép con số sai đó vào DB thì nó thành "sự thật" trong DB, và lần
--   sau ai đọc DB cũng sẽ tin. Số bài phải ĐẾM TỪ dữ liệu, không lưu lại.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_chapters (
  id TEXT PRIMARY KEY,
  grade_id INT NOT NULL REFERENCES public.content_grades(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS content_chapters_grade_idx
  ON public.content_chapters (grade_id, sort_order);


-- --------------------------------------------------------------------
-- 3. Bài học
--
-- Vì sao id là TEXT mà không phải SERIAL: id thật đã có sẵn và CÓ Ý NGHĨA —
-- `g1-c1-l1` nói ngay ra lớp 1, chương 1, bài 1. Đổi sang số tự tăng là ném
-- thông tin đó đi và làm mọi log/lỗi khó đọc hơn. `question_attempts.lesson_id`
-- cũng đang lưu đúng dạng text này nên khớp sẵn, không phải chuyển đổi.
--
-- `payload` CHỈ chứa `{ slides: [...] }`. Tiêu đề, mô tả, kiểu bài đã có cột
-- riêng — để chúng trong payload nữa là hai nguồn sự thật cho cùng một thứ,
-- và hai nguồn sự thật thì sớm muộn cũng lệch nhau.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_lessons (
  id TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL REFERENCES public.content_chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  lesson_type TEXT NOT NULL DEFAULT 'learn',
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,

  -- Mặc định 'draft': an toàn hơn. Một bài lỡ tạo mà quên đặt trạng thái thì
  -- KHÔNG lộ ra cho khách, thay vì lộ ra rồi mới phát hiện.
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),

  payload JSONB NOT NULL,

  published_at TIMESTAMPTZ,
  published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

  -- Chốt chặn THÔ ở tầng DB. Cố ý không chép lại toàn bộ luật chi tiết vào SQL:
  -- luật chi tiết nằm ở `admin/src/lib/contentSchema.js`, và viết cả hai nơi là
  -- cách chắc chắn để hai nơi lệch nhau. DB chỉ canh hình dạng lớn.
  CONSTRAINT content_lessons_payload_la_object
    CHECK (jsonb_typeof(payload) = 'object'),
  CONSTRAINT content_lessons_payload_co_slides
    CHECK (jsonb_typeof(payload -> 'slides') = 'array')
);

CREATE INDEX IF NOT EXISTS content_lessons_chapter_idx
  ON public.content_lessons (chapter_id, sort_order);

-- KHÔNG thêm index cho `status`. Bảng chỉ vài trăm dòng và app đọc gần như toàn
-- bộ, nên quét tuần tự là tức thời. Thêm index bây giờ chỉ làm chậm mỗi lần ghi.


-- --------------------------------------------------------------------
-- 4. Lịch sử phiên bản — CHỈ GHI THÊM
--
-- Cùng nguyên tắc với `admin_audit_log` và `question_attempts`: lịch sử mà sửa
-- được thì không còn là lịch sử. KHÔNG có policy UPDATE / DELETE cho bất kỳ ai.
--
-- Lưu cả tiêu đề, mô tả, kiểu bài — không chỉ slides. Mục đích của bảng này là
-- trả lời "bài này lúc trước trông thế nào" và khôi phục được; mà khôi phục nửa
-- vời (có slides cũ nhưng tiêu đề mới) thì không phải khôi phục.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_lesson_versions (
  lesson_id TEXT NOT NULL REFERENCES public.content_lessons(id) ON DELETE CASCADE,
  version INT NOT NULL CHECK (version >= 1),
  title TEXT NOT NULL,
  description TEXT,
  lesson_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  PRIMARY KEY (lesson_id, version)
);


-- --------------------------------------------------------------------
-- 5. RLS
-- --------------------------------------------------------------------
ALTER TABLE public.content_grades          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_chapters        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_lessons         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_lesson_versions ENABLE ROW LEVEL SECURITY;

-- 5.1. Lớp và Chương: đọc công khai.
--   Đây là metadata khung chương trình (tên lớp, icon, màu) — không có gì bí mật,
--   và app của bé cần nó để dựng cây bài học. Khách chưa đăng nhập cũng phải đọc
--   được, nếu không thì chế độ Khách không mở nổi danh sách lớp.
DROP POLICY IF EXISTS "content_grades_public_read" ON public.content_grades;
CREATE POLICY "content_grades_public_read" ON public.content_grades
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "content_chapters_public_read" ON public.content_chapters;
CREATE POLICY "content_chapters_public_read" ON public.content_chapters
  FOR SELECT USING (true);

-- 5.2. 🔴 BÀI HỌC — yêu cầu bảo mật quan trọng nhất của lát 3a.
--   Người thường CHỈ thấy bài đã publish. Admin thấy tất cả.
--
--   Nếu viết `USING (true)` ở đây thì MỌI BÀI NHÁP lộ ra cho bất kỳ ai có anon
--   key — mà anon key vốn công khai trong bundle của app. Đây đúng loại lỗ hổng
--   `USING (true)` đã phải vá ở GĐ 0 với bảng `leaderboard`.
--
--   Hai policy dưới đây là permissive nên PostgreSQL OR chúng lại:
--     - anon/user  : policy 1 cho bài published; policy 2 không thỏa (không phải admin)
--     - admin      : cả hai đều thỏa
DROP POLICY IF EXISTS "content_lessons_public_read" ON public.content_lessons;
CREATE POLICY "content_lessons_public_read" ON public.content_lessons
  FOR SELECT USING (status = 'published' OR public.is_admin());

DROP POLICY IF EXISTS "content_lessons_admin_write" ON public.content_lessons;
CREATE POLICY "content_lessons_admin_write" ON public.content_lessons
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5.3. Ghi cho Lớp và Chương (chỉ admin)
DROP POLICY IF EXISTS "content_grades_admin_write" ON public.content_grades;
CREATE POLICY "content_grades_admin_write" ON public.content_grades
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "content_chapters_admin_write" ON public.content_chapters;
CREATE POLICY "content_chapters_admin_write" ON public.content_chapters
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5.4. ⛔ PHIÊN BẢN — CỐ Ý KHÔNG CÓ POLICY NÀO CHO `anon`.
--   Không có policy nghĩa là RLS chặn hết với người thường. Chỉ admin (policy
--   dưới) đọc/ghi được. Dùng lại đúng cách đã kiểm chứng ở `0006` với
--   `question_attempts`, và `D-13` là mẫu test tự động cho cách kiểm.
--   KHÔNG thêm policy nào cho `anon` ở đây, kể cả `SELECT`.
DROP POLICY IF EXISTS "content_lesson_versions_admin_all"
  ON public.content_lesson_versions;
CREATE POLICY "content_lesson_versions_admin_all"
  ON public.content_lesson_versions
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());


-- --------------------------------------------------------------------
-- 6. Cấu hình nội dung trong `app_config`
--
--   `content_source` đã có sẵn từ `0001` với giá trị '"static"' — KHÔNG đụng vào.
--   Kill switch phải chỉ có một chỗ để bật, và chỗ đó đang đúng.
--
--   `content_version` là số nguyên tăng mỗi lần publish. Client lưu số này cùng
--   cache nội dung; lệch số thì biết cache đã cũ và tải lại. Nó cũng trả lời được
--   "một bé cụ thể đang dùng phiên bản nội dung nào" khi cần debug khiếu nại.
-- --------------------------------------------------------------------
INSERT INTO public.app_config (key, value, description)
VALUES (
  'content_version',
  '0'::jsonb,
  'Số phiên bản nội dung, tăng mỗi lần admin publish. Client so số này để biết cache đã cũ. GĐ 3.'
)
ON CONFLICT (key) DO NOTHING;


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
-- 1. Bốn bảng đã có:
--      SELECT tablename FROM pg_tables
--      WHERE schemaname = 'public' AND tablename LIKE 'content%' ORDER BY 1;
--      -- Mong đợi: content_chapters, content_grades,
--      --           content_lesson_versions, content_lessons
--
-- 2. 🔴 Không có policy nào cho `anon` trên bảng phiên bản:
--      SELECT policyname, roles::text FROM pg_policies
--      WHERE tablename = 'content_lesson_versions';
--      -- Mong đợi: đúng 1 dòng, vai trò KHÔNG chứa `anon`
--
-- 3. Bài học chỉ lộ bản published:
--      SELECT policyname, cmd, qual FROM pg_policies
--      WHERE tablename = 'content_lessons';
--      -- Mong đợi: content_lessons_public_read có qual chứa `status = 'published'`
--
-- 4. Cấu hình vẫn là nguồn tĩnh (app chưa đổi hành vi):
--      SELECT key, value FROM public.app_config
--      WHERE key IN ('content_source', 'content_version') ORDER BY key;
--      -- Mong đợi: content_source = "static", content_version = 0
-- ====================================================================
