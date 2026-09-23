-- ══════════════════════════════════════════════════════════════════════════════════
-- MIGRATION: 0018_pet_economy
-- MỤC ĐÍCH: Hỗ trợ hệ thống kinh tế thú cưng mới (Đồ chơi, hộp quà bùa XP).
-- LƯU Ý KỸ THUẬT:
-- 1. KHÔNG DROP `stage`: Vẫn giữ để các phiên bản APK cũ gọi API `upsert` không bị lỗi PGRST204.
-- 2. ADD KHÔNG DEFAULT: Tránh Postgres kích hoạt backfill đồng loạt làm mất/chết đói dữ liệu cũ.
-- 3. BACKFILL CHỌN LỌC: Chỉ backfill (cứu đói, gộp mảng) cho những user đã có thú cưng (`has_pet = true`).
-- ══════════════════════════════════════════════════════════════════════════════════

-- 1. Thêm cột MỚI
ALTER TABLE public.child_pets 
  ADD COLUMN IF NOT EXISTS unlocked_pets JSONB,
  ADD COLUMN IF NOT EXISTS last_fed_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS unopened_gift_boxes INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_free_food_date DATE;

-- Cứu hộ thú cưng tránh chết đói 0% đồng loạt:
UPDATE public.child_pets SET last_fed_time = NOW() WHERE last_fed_time IS NULL;

-- Hợp nhất pet_type vào mảng (chỉ người có thú cưng)
UPDATE public.child_pets 
SET unlocked_pets = CASE 
    WHEN pet_type = 'owl' THEN '["owl"]'::jsonb
    ELSE jsonb_build_array(COALESCE(pet_type, 'owl'), 'owl') 
END
WHERE has_pet = true AND unlocked_pets IS NULL;

-- Default
ALTER TABLE public.child_pets ALTER COLUMN unlocked_pets SET DEFAULT '["owl"]'::jsonb;
ALTER TABLE public.child_pets ALTER COLUMN pet_type SET DEFAULT 'owl';
ALTER TABLE public.child_pets ALTER COLUMN last_fed_time SET DEFAULT NOW();
