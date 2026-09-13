-- ========================================================
-- TOÁN VUI - SUPABASE DATABASE SCHEMA (POSTGRESQL)
-- Copy & Paste vào mục SQL Editor trên Supabase Dashboard và bấm RUN
-- ========================================================

-- 1. BẢNG HỒ SƠ PHỤ HUYNH (Liên kết trực tiếp với auth.users của Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BẢNG HỒ SƠ CÁC BÉ TRONG GIA ĐÌNH (1 Phụ huynh - Nhiều Bé)
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

-- 3. BẢNG TIẾN ĐỘ HỌC TẬP CỦA BÉ
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

-- 4. BẢNG THÚ CƯNG CỦA BÉ
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

-- 5. BẢNG CÂU HỎI LÀM SAI (Spaced Repetition)
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

-- ========================================================
-- PHÂN QUYỀN ROW LEVEL SECURITY (RLS) - BẢO VỆ DỮ LIỆU GIA ĐÌNH
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.child_mistakes ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
DROP POLICY IF EXISTS "Users can view own parent profile" ON public.profiles;
CREATE POLICY "Users can view own parent profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- 2. Child Profiles Policies (Chỉ xem và sửa hồ sơ các bé của chính mình)
DROP POLICY IF EXISTS "Parents can manage own children" ON public.child_profiles;
CREATE POLICY "Parents can manage own children" ON public.child_profiles
  FOR ALL USING (auth.uid() = parent_id);

-- 3. Child Progress Policies
DROP POLICY IF EXISTS "Parents can manage child progress" ON public.child_progress;
CREATE POLICY "Parents can manage child progress" ON public.child_progress
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_progress.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- 4. Child Pets Policies
DROP POLICY IF EXISTS "Parents can manage child pets" ON public.child_pets;
CREATE POLICY "Parents can manage child pets" ON public.child_pets
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_pets.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- 5. Child Mistakes Policies
DROP POLICY IF EXISTS "Parents can manage child mistakes" ON public.child_mistakes;
CREATE POLICY "Parents can manage child mistakes" ON public.child_mistakes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.child_profiles
      WHERE public.child_profiles.id = public.child_mistakes.child_id
      AND public.child_profiles.parent_id = auth.uid()
    )
  );

-- ========================================================
-- TRIGGER TỰ ĐỘNG TẠO HỒ SƠ KHI ĐĂNG KÝ GOOGLE OAUTH
-- ========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_child_id UUID;
BEGIN
  -- Tạo hồ sơ phụ huynh
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Phụ huynh'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Tự động tạo hồ sơ bé đầu tiên
  INSERT INTO public.child_profiles (parent_id, nickname, grade, avatar, is_active)
  VALUES (NEW.id, 'Bé Yêu', 1, '👦', TRUE)
  RETURNING id INTO new_child_id;

  -- Tạo sẵn bản ghi tiến độ cho bé
  INSERT INTO public.child_progress (child_id)
  VALUES (new_child_id);

  -- Tạo sẵn bản ghi thú cưng cho bé
  INSERT INTO public.child_pets (child_id)
  VALUES (new_child_id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kích hoạt trigger khi auth.users có người dùng mới
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
