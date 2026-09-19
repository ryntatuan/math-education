-- ====================================================================
-- 0001_admin_foundation.sql
-- Giai đoạn 0 — Vá nền & bảo mật cho Admin Portal
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- ⚠️ TỪ NAY KHÔNG CHẠY LẠI `supabase/schema.sql`.
--    File đó chứa policy leaderboard lỗi mà migration này vừa vá.
--    Mọi thay đổi schema đi qua thư mục `supabase/migrations/`.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. profiles: role, is_banned, last_seen_at
-- --------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS is_banned BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ;

-- Ràng buộc giá trị role (tách riêng để chạy lại an toàn)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check CHECK (role IN ('user', 'admin'));


-- --------------------------------------------------------------------
-- 2. child_profiles: phục vụ Ban + phân biệt nguồn tạo tài khoản
-- --------------------------------------------------------------------
ALTER TABLE public.child_profiles
  ADD COLUMN IF NOT EXISTS ban_reason TEXT,
  ADD COLUMN IF NOT EXISTS created_from TEXT DEFAULT 'oauth';


-- --------------------------------------------------------------------
-- 3. Chỉ mục cho parent_id
--    Mọi policy bên dưới đều lọc theo parent_id = auth.uid(),
--    mà Postgres KHÔNG tự tạo index cho cột khoá ngoại.
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS child_profiles_parent_id_idx
  ON public.child_profiles (parent_id);


-- --------------------------------------------------------------------
-- 4. is_admin()
--    BẮT BUỘC SECURITY DEFINER: nếu không, hàm đọc bảng profiles
--    sẽ đi qua RLS của chính bảng đó -> đệ quy vô hạn.
--    SET search_path để chống search_path hijacking.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND is_banned = FALSE
  );
$$;

-- Cấp cho cả anon: policy admin có thể được Postgres đánh giá
-- ngay cả với request ẩn danh, thiếu quyền sẽ gây lỗi thay vì trả false.
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;


-- --------------------------------------------------------------------
-- 5. 🔴 VÁ LỖ HỔNG leaderboard
--
-- Policy cũ: FOR ALL USING (true) WITH CHECK (true)
--   -> BẤT KỲ AI có anon key đều ghi đè được weekly_xp của người khác.
--
-- Policy mới: chỉ ghi được (a) dòng bot, hoặc (b) dòng của bé
-- thuộc tài khoản đang đăng nhập. Đọc vẫn công khai như thiết kế.
--
-- Lưu ý: id của leaderboard là TEXT (có thể là 'bot_bronze_1'), còn
-- child_profiles.id là UUID -> phải so sánh dạng text, nếu cast sang
-- uuid sẽ ném lỗi runtime khi gặp dòng bot.
-- --------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can upsert leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "Public can view leaderboard" ON public.leaderboard;
DROP POLICY IF EXISTS "leaderboard_public_read" ON public.leaderboard;
DROP POLICY IF EXISTS "leaderboard_insert_own_or_bot" ON public.leaderboard;
DROP POLICY IF EXISTS "leaderboard_update_own_or_bot" ON public.leaderboard;

CREATE POLICY "leaderboard_public_read" ON public.leaderboard
  FOR SELECT USING (true);

CREATE POLICY "leaderboard_insert_own_or_bot" ON public.leaderboard
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND is_bot = TRUE)
    OR EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.parent_id = auth.uid()
        AND cp.id::text = leaderboard.id
    )
  );

CREATE POLICY "leaderboard_update_own_or_bot" ON public.leaderboard
  FOR UPDATE
  USING (
    (auth.uid() IS NOT NULL AND is_bot = TRUE)
    OR EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.parent_id = auth.uid()
        AND cp.id::text = leaderboard.id
    )
  )
  WITH CHECK (
    (auth.uid() IS NOT NULL AND is_bot = TRUE)
    OR EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.parent_id = auth.uid()
        AND cp.id::text = leaderboard.id
    )
  );

-- Không tạo policy DELETE -> không ai xoá được dòng bảng xếp hạng.


-- --------------------------------------------------------------------
-- 6. Policy ADMIN
--    Policy cũ vẫn giữ nguyên; policy mới được OR thêm vào.
-- --------------------------------------------------------------------

-- profiles: xem + sửa (Ban/Khoá) --------------------------------
DROP POLICY IF EXISTS "profiles_admin_read" ON public.profiles;
CREATE POLICY "profiles_admin_read" ON public.profiles
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "profiles_admin_update" ON public.profiles;
CREATE POLICY "profiles_admin_update" ON public.profiles
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- child_profiles: xem + sửa (Ban/Khoá hồ sơ bé) ------------------
DROP POLICY IF EXISTS "child_profiles_admin_read" ON public.child_profiles;
CREATE POLICY "child_profiles_admin_read" ON public.child_profiles
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "child_profiles_admin_update" ON public.child_profiles;
CREATE POLICY "child_profiles_admin_update" ON public.child_profiles
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Dữ liệu học tập: chỉ ĐỌC ở GĐ 0-2 ------------------------------
DROP POLICY IF EXISTS "child_progress_admin_read" ON public.child_progress;
CREATE POLICY "child_progress_admin_read" ON public.child_progress
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "child_pets_admin_read" ON public.child_pets;
CREATE POLICY "child_pets_admin_read" ON public.child_pets
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "child_mistakes_admin_read" ON public.child_mistakes;
CREATE POLICY "child_mistakes_admin_read" ON public.child_mistakes
  FOR SELECT USING (public.is_admin());


-- --------------------------------------------------------------------
-- 7. admin_audit_log — nhật ký bất biến
--    Cố ý KHÔNG tạo policy UPDATE/DELETE -> không sửa, không xoá được.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id BIGSERIAL PRIMARY KEY,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT,
  entity_id TEXT,
  before JSONB,
  after JSONB,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx
  ON public.admin_audit_log (created_at DESC);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_audit_log_admin_read" ON public.admin_audit_log;
CREATE POLICY "admin_audit_log_admin_read" ON public.admin_audit_log
  FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "admin_audit_log_admin_insert" ON public.admin_audit_log;
CREATE POLICY "admin_audit_log_admin_insert" ON public.admin_audit_log
  FOR INSERT WITH CHECK (public.is_admin() AND actor_id = auth.uid());


-- --------------------------------------------------------------------
-- 8. app_config — cấu hình dùng chung (kinh tế + vận hành)
--    Một bảng duy nhất cho cả GĐ 1 và GĐ 3, không xây hai hệ thống.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT 'null'::jsonb,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- App client (kể cả guest) cần đọc: content_source, reward configs...
DROP POLICY IF EXISTS "app_config_public_read" ON public.app_config;
CREATE POLICY "app_config_public_read" ON public.app_config
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "app_config_admin_write" ON public.app_config;
CREATE POLICY "app_config_admin_write" ON public.app_config
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Seed: kill switch nội dung cho GĐ 3
INSERT INTO public.app_config (key, value, description)
VALUES (
  'content_source',
  '"static"'::jsonb,
  'Nguồn nội dung bài học: "static" (file cứng trong bundle) hoặc "remote" (đọc từ DB). Kill switch của GĐ 3.'
)
ON CONFLICT (key) DO NOTHING;


-- ====================================================================
-- 9. CẤP QUYỀN ADMIN
--    Chạy RIÊNG, SAU KHI tài khoản đã đăng nhập app ít nhất 1 lần
--    (trigger handle_new_user phải đã tạo dòng trong profiles).
--
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'you@example.com';
-- ====================================================================


-- ====================================================================
-- 10. KIỂM TRA SAU KHI CHẠY
-- ====================================================================
-- a) Đã tạo đủ cột và bảng chưa:
--    SELECT column_name FROM information_schema.columns
--     WHERE table_name = 'profiles' AND column_name IN ('role','is_banned','last_seen_at');
--
-- b) Policy leaderboard cũ đã biến mất chưa (kết quả phải là 0 dòng):
--    SELECT policyname FROM pg_policies
--     WHERE tablename = 'leaderboard' AND policyname = 'Anyone can upsert leaderboard';
--
-- c) Ai đang là admin:
--    SELECT id, email, role, is_banned FROM public.profiles WHERE role = 'admin';
--
-- d) Cấu hình đã seed:
--    SELECT key, value FROM public.app_config;
