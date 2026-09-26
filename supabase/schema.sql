-- ====================================================================
-- [!!] FILE LỊCH SỬ — ĐỪNG CHẠY LẠI. ĐỌC KHỐI NÀY TRƯỚC KHI TIN NỘI DUNG BÊN DƯỚI.
-- ====================================================================
-- Đây là bản CÀI ĐẶT BAN ĐẦU (chạy một lần, đầu dự án). Nó giữ NGUYÊN các lỗi đã được
-- vá về sau, nên CHẠY LẠI FILE NÀY SẼ MỞ LẠI LỖ HỔNG và làm DB lệch khỏi trạng thái đúng.
--
-- Hai chỗ trong file này ĐÃ LỖI THỜI — không được quay về bản ở đây:
--   1. `leaderboard`: policy "Anyone can upsert leaderboard" (FOR ALL USING (true))
--      cho phép bất kỳ ai có anon key ghi đè điểm của bé khác.
--      -> đã vá ở `supabase/migrations/0001_admin_foundation.sql`
--   2. `child_mistakes.answer` khai `INT`, nhưng đáp án câu so sánh là '>', '<', '='.
--      -> đã đổi thành `TEXT` ở `supabase/migrations/0004_mistakes_sync.sql`
--
-- MUỐN BIẾT TRẠNG THÁI THẬT CỦA DB: đọc `supabase/migrations/` theo thứ tự số
-- (0001 -> 0017), và lấy bản ĐỊNH NGHĨA CUỐI CÙNG của mỗi hàm/policy — `CREATE OR REPLACE`
-- ở migration sau là chuyện thường. Quyền của hàm, các bảng CMS (`content_*`), bảng nháp,
-- và hàm tạo/xoá bài đều CHỈ nằm trong `migrations/`, không có trong file này.
--
-- Dựng DB mới: chạy các migration theo thứ tự số, rồi nạp seed trong `supabase/content-seed/`.
-- ====================================================================

-- ── CHỐT AN TOÀN (thêm 2026-09-26) ──────────────────────────────────────────
-- Cảnh báo bằng chữ ở trên là chưa đủ: dán nhầm cả file vào SQL Editor vẫn chạy và vẫn mở lại
-- hai lỗ hổng đã vá. Chốt dưới đây chặn việc đó: nếu DB ĐÃ có schema (bảng `child_profiles`),
-- file này DỪNG ngay; DB trống (cài mới từ đầu) thì vẫn chạy bình thường.
-- Muốn bỏ qua chốt (chỉ khi thật sự cài mới trên DB còn sót bảng rác): xoá tạm khối này.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'child_profiles'
  ) THEN
    RAISE EXCEPTION
      'schema.sql là FILE LỊCH SỬ — DB này đã có dữ liệu. Đừng chạy lại (sẽ mở lại lỗ hổng leaderboard + kiểu child_mistakes.answer). Dùng supabase/migrations/ theo thứ tự số.'
      USING ERRCODE = 'feature_not_supported';
  END IF;
END
$$;

-- ====================================================================

-- ====================================================================
-- TOÁN VUI TIỂU HỌC - HỆ THỐNG CƠ SỞ DỮ LIỆU TOÀN DIỆN (SUPABASE SQL)
-- Hướng dẫn: Mở Supabase Dashboard -> Vào mục "SQL Editor" -> Dán toàn bộ file này và bấm "Run"
-- ====================================================================

-- Kích hoạt tiện ích tạo UUID tự động
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 1. BẢNG HỒ SƠ PHỤ HUYNH (Liên kết trực tiếp với auth.users)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 2. BẢNG HỒ SƠ BÉ HỌC TẬP (Mỗi tài khoản phụ huynh quản lý bé học)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nickname TEXT NOT NULL DEFAULT 'Bé Học Giỏi',
  grade INT NOT NULL DEFAULT 1 CHECK (grade BETWEEN 1 AND 5),
  avatar TEXT NOT NULL DEFAULT '👦',
  unlocked_avatars TEXT[] DEFAULT ARRAY['👦', '👧'],
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  total_xp_for_next_level INT DEFAULT 100,
  coins INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 3. BẢNG TIẾN ĐỘ BÀI HỌC & CHUỖI NGÀY HỌC (STREAK) CỦA BÉ
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.child_progress (
  child_id UUID REFERENCES public.child_profiles(id) ON DELETE CASCADE PRIMARY KEY,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  last_active_date DATE,
  completed_lessons JSONB DEFAULT '{}'::jsonb,
  exercise_results JSONB DEFAULT '{}'::jsonb,
  math_race_wins INT DEFAULT 0,
  total_games_played INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 4. BẢNG THÚ CƯNG ẢO CỦA BÉ (Pet Nuôi Dưỡng)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.child_pets (
  child_id UUID REFERENCES public.child_profiles(id) ON DELETE CASCADE PRIMARY KEY,
  has_pet BOOLEAN DEFAULT FALSE,
  pet_type TEXT DEFAULT 'corgi',
  pet_name TEXT DEFAULT 'Bạn Cún Nhỏ',
  hunger INT DEFAULT 80,
  happiness INT DEFAULT 90,
  level INT DEFAULT 1,
  exp INT DEFAULT 0,
  stage TEXT DEFAULT 'baby',
  inventory JSONB DEFAULT '{"apple": 3, "croissant": 2, "candy": 2}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 5. BẢNG SỔ TAY LỖI SAI CỦA BÉ (Ôn Tập Ngắt Quãng)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.child_mistakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.child_profiles(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer INT NOT NULL,
  hint TEXT,
  explanation TEXT,
  visual_display TEXT,
  grade INT DEFAULT 1,
  stage INT DEFAULT 1,
  failed_count INT DEFAULT 1,
  next_review_date DATE DEFAULT (CURRENT_DATE + INTERVAL '1 day'),
  mastered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 6. BẢNG ĐẤU TRƯỜNG THI ĐUA & BẢNG XẾP HẠNG (Leaderboard Đồng Bộ)
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id TEXT PRIMARY KEY, -- ID của bot (vd: 'bot_bronze_1') hoặc ID của bé (UUID)
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🦉',
  grade INT DEFAULT 1,
  weekly_xp INT DEFAULT 0,
  is_bot BOOLEAN DEFAULT FALSE,
  tier TEXT DEFAULT 'bronze', -- 'bronze' | 'silver' | 'gold' | 'diamond' | 'master'
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- PHÂN QUYỀN BẢO MẬT ROW LEVEL SECURITY (RLS)
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- 1. Quyền trên bảng profiles
DROP POLICY IF EXISTS "Users can manage own parent profile" ON public.profiles;
CREATE POLICY "Users can manage own parent profile" ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 2. Quyền trên bảng child_profiles
DROP POLICY IF EXISTS "Parents can manage own children" ON public.child_profiles;
CREATE POLICY "Parents can manage own children" ON public.child_profiles
  FOR ALL USING (auth.uid() = parent_id) WITH CHECK (auth.uid() = parent_id);

-- 3. Quyền trên bảng child_progress
DROP POLICY IF EXISTS "Parents can manage child progress" ON public.child_progress;
CREATE POLICY "Parents can manage child progress" ON public.child_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_progress.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_progress.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- 4. Quyền trên bảng child_pets
DROP POLICY IF EXISTS "Parents can manage child pets" ON public.child_pets;
CREATE POLICY "Parents can manage child pets" ON public.child_pets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_pets.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_pets.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- 5. Quyền trên bảng child_mistakes
DROP POLICY IF EXISTS "Parents can manage child mistakes" ON public.child_mistakes;
CREATE POLICY "Parents can manage child mistakes" ON public.child_mistakes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_mistakes.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_mistakes.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- 6. Quyền trên bảng leaderboard: Mọi người đều được xem bảng xếp hạng và cập nhật điểm thi đua
DROP POLICY IF EXISTS "Public can view leaderboard" ON public.leaderboard;
CREATE POLICY "Public can view leaderboard" ON public.leaderboard
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can upsert leaderboard" ON public.leaderboard;
CREATE POLICY "Anyone can upsert leaderboard" ON public.leaderboard
  FOR ALL USING (true) WITH CHECK (true);

-- ====================================================================
-- TRIGGER TỰ ĐỘNG KHỞI TẠO TÀI KHOẢN KHI ĐĂNG KÝ GOOGLE OAUTH
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_child_id UUID;
BEGIN
  -- 1. Tạo hồ sơ phụ huynh
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Phụ huynh'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Tự động tạo hồ sơ bé đầu tiên (ưu tiên lấy tên tài khoản đăng nhập)
  INSERT INTO public.child_profiles (parent_id, nickname, grade, avatar, is_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Bé Yêu'),
    1,
    '👦',
    TRUE
  )
  RETURNING id INTO new_child_id;

  -- 3. Tạo sẵn tiến độ bài học cho bé
  INSERT INTO public.child_progress (child_id)
  VALUES (new_child_id)
  ON CONFLICT (child_id) DO NOTHING;

  -- 4. Tạo sẵn bản ghi thú cưng cho bé
  INSERT INTO public.child_pets (child_id)
  VALUES (new_child_id)
  ON CONFLICT (child_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kích hoạt trigger khi auth.users có người dùng đăng ký mới
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ====================================================================
-- 7. KHỞI TẠO SẴN 50 BOT THI ĐUA CHO TẤT CẢ 5 GIẢI ĐẤU (ĐỒNG, BẠC, VÀNG, KIM CƯƠNG, CAO THỦ)
-- Tất cả các bot bắt đầu tuần mới với weekly_xp = 0
-- ====================================================================

INSERT INTO public.leaderboard (id, name, avatar, grade, weekly_xp, is_bot, tier)
VALUES
  -- 1. Giải Đồng (Bronze)
  ('bot_bronze_1', 'Bảo Nam', '🚀', 1, 0, true, 'bronze'),
  ('bot_bronze_2', 'Tuệ Lâm', '🦄', 1, 0, true, 'bronze'),
  ('bot_bronze_3', 'Khánh Vy', '🍓', 1, 0, true, 'bronze'),
  ('bot_bronze_4', 'Minh Khang', '🦁', 1, 0, true, 'bronze'),
  ('bot_bronze_5', 'Mai Chi', '🌻', 1, 0, true, 'bronze'),
  ('bot_bronze_6', 'Quang Anh', '⚡', 1, 0, true, 'bronze'),
  ('bot_bronze_7', 'Anh Thư', '🎨', 1, 0, true, 'bronze'),
  ('bot_bronze_8', 'Gia Hân', '🌸', 1, 0, true, 'bronze'),
  ('bot_bronze_9', 'Hoàng Bách', '🦖', 1, 0, true, 'bronze'),
  ('bot_bronze_10', 'Hải Đăng', '🌟', 1, 0, true, 'bronze'),

  -- 2. Giải Bạc (Silver)
  ('bot_silver_1', 'Thanh Trúc', '🌿', 1, 0, true, 'silver'),
  ('bot_silver_2', 'Nhật Minh', '☀️', 1, 0, true, 'silver'),
  ('bot_silver_3', 'Thảo My', '🍀', 1, 0, true, 'silver'),
  ('bot_silver_4', 'Đức Trí', '🧠', 1, 0, true, 'silver'),
  ('bot_silver_5', 'Ngọc Diệp', '🍃', 1, 0, true, 'silver'),
  ('bot_silver_6', 'Trọng Khôi', '⚽', 1, 0, true, 'silver'),
  ('bot_silver_7', 'Quỳnh Anh', '🌷', 1, 0, true, 'silver'),
  ('bot_silver_8', 'Phúc An', '🎈', 1, 0, true, 'silver'),
  ('bot_silver_9', 'Lan Chi', '🌼', 1, 0, true, 'silver'),
  ('bot_silver_10', 'Tùng Dương', '🪁', 1, 0, true, 'silver'),

  -- 3. Giải Vàng (Gold)
  ('bot_gold_1', 'Hùng Dũng', '🐯', 1, 0, true, 'gold'),
  ('bot_gold_2', 'Thùy Dương', '🌞', 1, 0, true, 'gold'),
  ('bot_gold_3', 'Đăng Khoa', '📚', 1, 0, true, 'gold'),
  ('bot_gold_4', 'Ánh Tuyết', '❄️', 1, 0, true, 'gold'),
  ('bot_gold_5', 'Tuấn Kiệt', '🎯', 1, 0, true, 'gold'),
  ('bot_gold_6', 'Phương Linh', '🦚', 1, 0, true, 'gold'),
  ('bot_gold_7', 'Hoàng Nam', '🏆', 1, 0, true, 'gold'),
  ('bot_gold_8', 'Yến Nhi', '🕊️', 1, 0, true, 'gold'),
  ('bot_gold_9', 'Quốc Bảo', '🛡️', 1, 0, true, 'gold'),
  ('bot_gold_10', 'Hà Phương', '🌺', 1, 0, true, 'gold'),

  -- 4. Giải Kim Cương (Diamond)
  ('bot_diamond_1', 'Minh Triết', '🔮', 1, 0, true, 'diamond'),
  ('bot_diamond_2', 'Huyền Trang', '💎', 1, 0, true, 'diamond'),
  ('bot_diamond_3', 'Việt Anh', '🦅', 1, 0, true, 'diamond'),
  ('bot_diamond_4', 'Kim Ngân', '💰', 1, 0, true, 'diamond'),
  ('bot_diamond_5', 'Huy Hoàng', '👑', 1, 0, true, 'diamond'),
  ('bot_diamond_6', 'Bảo Ngọc', '💍', 1, 0, true, 'diamond'),
  ('bot_diamond_7', 'Thiên Phúc', '🌠', 1, 0, true, 'diamond'),
  ('bot_diamond_8', 'Thục Anh', '💫', 1, 0, true, 'diamond'),
  ('bot_diamond_9', 'Khôi Nguyên', '🎖️', 1, 0, true, 'diamond'),
  ('bot_diamond_10', 'Tường Vy', '🌹', 1, 0, true, 'diamond'),

  -- 5. Giải Cao Thủ (Master)
  ('bot_master_1', 'Long Vũ', '🐉', 1, 0, true, 'master'),
  ('bot_master_2', 'Thái Dương', '🔆', 1, 0, true, 'master'),
  ('bot_master_3', 'Diệu Linh', '🌌', 1, 0, true, 'master'),
  ('bot_master_4', 'Bá Tùng', '🌲', 1, 0, true, 'master'),
  ('bot_master_5', 'Minh Tuệ', '⚡', 1, 0, true, 'master'),
  ('bot_master_6', 'Thùy Tiên', '🧚', 1, 0, true, 'master'),
  ('bot_master_7', 'Nam Phong', '🌪️', 1, 0, true, 'master'),
  ('bot_master_8', 'Ngân Hà', '🪐', 1, 0, true, 'master'),
  ('bot_master_9', 'Anh Quân', '🏹', 1, 0, true, 'master'),
  ('bot_master_10', 'Cẩm Tú', '💐', 1, 0, true, 'master')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    avatar = EXCLUDED.avatar,
    tier = EXCLUDED.tier,
    weekly_xp = EXCLUDED.weekly_xp;
