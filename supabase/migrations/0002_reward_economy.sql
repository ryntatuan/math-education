-- ====================================================================
-- 0002_reward_economy.sql
-- Giai đoạn 1 — Sổ cái & Cấu hình kinh tế Xu/XP
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- NGUYÊN TẮC: mọi giá trị seed bên dưới ĐÚNG BẰNG giá trị đang hardcode
-- trong code. Nhờ vậy việc refactor client không làm thay đổi hành vi
-- của app — chỉ chuyển nguồn dữ liệu từ hằng số sang DB.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. reward_configs — bảng tra cứu phần thưởng
--
--    coins_max: nếu khác NULL thì phần thưởng là ngẫu nhiên trong
--    khoảng [coins, coins_max]. Dùng cho rương bí ẩn.
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reward_configs (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  group_name TEXT NOT NULL DEFAULT 'Khác',
  coins INT NOT NULL DEFAULT 0 CHECK (coins >= 0),
  coins_max INT CHECK (coins_max IS NULL OR coins_max >= coins),
  xp INT NOT NULL DEFAULT 0 CHECK (xp >= 0),
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reward_configs ENABLE ROW LEVEL SECURITY;

-- App client (kể cả guest) phải đọc được để tra cứu phần thưởng
DROP POLICY IF EXISTS "reward_configs_public_read" ON public.reward_configs;
CREATE POLICY "reward_configs_public_read" ON public.reward_configs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "reward_configs_admin_write" ON public.reward_configs;
CREATE POLICY "reward_configs_admin_write" ON public.reward_configs
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());


-- --------------------------------------------------------------------
-- 2. coin_transactions — sổ cái Xu (chỉ ghi thêm, không sửa/xoá)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.coin_transactions (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  reason TEXT NOT NULL,
  ref_id TEXT,
  balance_after INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS coin_transactions_child_time_idx
  ON public.coin_transactions (child_id, created_at DESC);

ALTER TABLE public.coin_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "coin_tx_owner_insert" ON public.coin_transactions;
CREATE POLICY "coin_tx_owner_insert" ON public.coin_transactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.id = coin_transactions.child_id
        AND cp.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "coin_tx_read" ON public.coin_transactions;
CREATE POLICY "coin_tx_read" ON public.coin_transactions
  FOR SELECT USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.id = coin_transactions.child_id
        AND cp.parent_id = auth.uid()
    )
  );

-- Cố ý KHÔNG có policy UPDATE/DELETE -> sổ cái là append-only.


-- --------------------------------------------------------------------
-- 3. xp_events — sổ cái XP (chỉ ghi thêm)
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.xp_events (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  amount INT NOT NULL,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS xp_events_child_time_idx
  ON public.xp_events (child_id, created_at DESC);

ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "xp_events_owner_insert" ON public.xp_events;
CREATE POLICY "xp_events_owner_insert" ON public.xp_events
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.id = xp_events.child_id
        AND cp.parent_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "xp_events_read" ON public.xp_events;
CREATE POLICY "xp_events_read" ON public.xp_events
  FOR SELECT USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.child_profiles cp
      WHERE cp.id = xp_events.child_id
        AND cp.parent_id = auth.uid()
    )
  );


-- --------------------------------------------------------------------
-- 4. Cấu hình toàn cục trong app_config
--    - level_curve: công thức lên cấp (đang hardcode trong useUserStore)
--    - reward_multiplier: hệ số nhân toàn bộ Xu/XP (bật sự kiện X2)
-- --------------------------------------------------------------------
INSERT INTO public.app_config (key, value, description)
VALUES
  (
    'level_curve',
    '{"base": 100, "growth": 1.3}'::jsonb,
    'XP cần để lên cấp: bắt đầu ở base, mỗi cấp nhân thêm growth.'
  ),
  (
    'reward_multiplier',
    '{"value": 1}'::jsonb,
    'Hệ số nhân áp cho TOÀN BỘ Xu/XP. Đặt 2 để bật sự kiện X2.'
  )
ON CONFLICT (key) DO NOTHING;


-- --------------------------------------------------------------------
-- 5. SEED reward_configs — giá trị ĐÚNG BẰNG code hiện tại
-- --------------------------------------------------------------------
INSERT INTO public.reward_configs (key, label, group_name, coins, coins_max, xp)
VALUES
  -- Bài học
  ('lesson.complete',            'Hoàn thành bài học',              'Bài học',      20,  NULL, 50),
  ('lesson.relearn',             'Học lại bài đã hoàn thành',       'Bài học',       5,  NULL, 10),
  ('lesson.quiz_correct',        'Trả lời đúng câu hỏi trong bài',  'Bài học',      10,  NULL,  0),

  -- Luyện tập
  ('practice.correct',           'Trả lời đúng (luyện tập)',        'Luyện tập',    10,  NULL, 20),
  ('practice.streak_correct',    'Đúng 3 câu liên tiếp',            'Luyện tập',    15,  NULL, 20),
  ('practice.mistake_review',    'Ôn lại câu từng làm sai',         'Luyện tập',    15,  NULL, 30),

  -- Thử thách
  ('challenge.task_1',           'Thử thách 1 — Khởi động',         'Thử thách',    10,  NULL, 30),
  ('challenge.task_2',           'Thử thách 2 — Tăng tốc',          'Thử thách',    15,  NULL, 30),
  ('challenge.task_3',           'Thử thách 3 — Bứt phá',           'Thử thách',    25,  NULL, 30),
  ('challenge.chest',            'Rương bí ẩn (ngẫu nhiên)',        'Thử thách',    20,    49, 50),

  -- Nhiệm vụ hằng ngày
  ('quest.daily_lesson',         'Nhiệm vụ: Hoàn thành 2 bài học',  'Nhiệm vụ ngày', 15, NULL, 30),
  ('quest.daily_game',           'Nhiệm vụ: Chơi 1 ván mini game',  'Nhiệm vụ ngày', 10, NULL, 20),
  ('quest.daily_pet',            'Nhiệm vụ: Cho thú cưng ăn',       'Nhiệm vụ ngày', 10, NULL, 20),
  ('quest.daily_claim',          'Rương hoàn thành ngày',           'Nhiệm vụ ngày', 50, NULL, 60),

  -- Khác
  ('mascot.mini_quiz',           'Đố vui cùng Mascot',              'Khác',          5,  NULL,  0),

  -- Mini game: 4 bậc dùng chung cho CẢ 6 game.
  -- Các con số 120/70/30/10 đang giống hệt nhau ở mọi game trong code,
  -- nên gom thành một thang bậc duy nhất. Đổi 1 dòng = đổi mọi game.
  ('game.tier_gold',             'Mini game — Bậc Vàng',            'Mini game',   120,  NULL, 200),
  ('game.tier_silver',           'Mini game — Bậc Bạc',             'Mini game',    70,  NULL, 120),
  ('game.tier_bronze',           'Mini game — Bậc Đồng',            'Mini game',    30,  NULL,  50),
  ('game.tier_participation',    'Mini game — Tham gia',            'Mini game',    10,  NULL,  20),

  -- Truyện tương tác
  ('story.story_picnic',          'Chuyến Dã Ngoại Của Thỏ Và Rùa',        'Truyện', 40, NULL,  80),
  ('story.story_ocean',           'Thám Hiểm Đại Dương & Rạn San Hô',      'Truyện', 45, NULL,  90),
  ('story.story_space',           'Phi Thuyền Vũ Trụ & Mật Mã Hành Tinh',  'Truyện', 50, NULL, 100),
  ('story.story_bakery',          'Tiệm Bánh Kỳ Diệu Của Bác Gấu',         'Truyện', 50, NULL, 100),
  ('story.story_detective',       'Thám Tử Rừng Xanh & Bí Mật Hình Học',   'Truyện', 60, NULL, 120),
  ('story.story_kingdom',         'Hiệp Sĩ Rồng & Tòa Tháp Phép Thuật',    'Truyện', 65, NULL, 130),
  ('story.story_fraction_island', 'Đảo Hoang Bí Ẩn & Lâu Đài Phân Số',     'Truyện', 70, NULL, 140),
  ('story.story_time_travel',     'Cỗ Máy Thời Gian & Cuộc Đua Vận Tốc',   'Truyện', 80, NULL, 160)
ON CONFLICT (key) DO NOTHING;


-- ====================================================================
-- 6. KIỂM TRA SAU KHI CHẠY
-- ====================================================================
-- a) Đã seed đủ 27 cấu hình chưa:
--    SELECT group_name, COUNT(*) FROM public.reward_configs GROUP BY group_name ORDER BY group_name;
--
-- b) Xem toàn bộ bảng phần thưởng:
--    SELECT key, label, coins, coins_max, xp, enabled FROM public.reward_configs ORDER BY group_name, key;
--
-- c) Cấu hình toàn cục:
--    SELECT key, value FROM public.app_config ORDER BY key;
