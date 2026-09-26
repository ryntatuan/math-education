-- ============================================================================
-- 0020 — GIỚI HẠN PHẦN THƯỞNG Ở PHÍA SERVER  (kế hoạch §3 đợt 1.1)
-- ============================================================================
--
-- VÌ SAO CẦN: app là client CÔNG KHAI (anon key nằm sẵn trong gói tải về). Trước migration này:
--   • ai mở DevTools cũng gọi được `.from("child_profiles").update({ coins: 999999 })`;
--   • hoặc ghi một dòng 999 999 vào sổ cái `coin_transactions`.
--   ⇒ bảng xếp hạng / giải đấu bị gian lận, mà app không có cách nào biết.
--
-- CÁCH LÀM — cố ý KHÔNG chặn nhầm thao tác hợp lệ:
--   1. Sổ cái `coin_transactions` / `xp_events`: chặn dòng VÔ LÝ (|amount| quá trần) và chặn GHI ẦM
--      (quá nhiều dòng trong 1 phút cho cùng một bé).
--   2. `child_profiles`: chặn con số tuyệt đối vô lý; còn khi một lần lưu làm xu/XP NHẢY LỚN thì
--      KHÔNG chặn (offline lâu rồi đồng bộ có thể nhảy thật) mà GHI LẠI vào `reward_anomalies`
--      để admin xem.
--
-- Trần chọn theo `REWARD_DEFAULTS` của app (cao nhất 50 xu · 60 XP cho một lần thưởng) × 4
-- ⇒ rộng rãi, không thể chặn nhầm phần thưởng bình thường.
--
-- ⚠️ GIỚI HẠN CÒN LẠI — nói rõ để không tưởng là đã kín:
--    Trần chỉ chặn những con số VÔ LÝ. Muốn chống gian lận triệt để thì SỐ DƯ phải do SERVER tính
--    từ sổ cái (hàm `grant_reward()` + gọi qua RPC, client không được UPDATE `coins` trực tiếp).
--    Việc đó đổi kiến trúc đồng bộ và luồng offline ⇒ để đợt sau, xem
--    `docs/Plan/ke-hoach-tu-phan-tich-nguon.md` §3 đợt 1.1 (bước 2).
--
-- Chạy file này trong Supabase SQL Editor. An toàn khi chạy lại nhiều lần.
-- ============================================================================

-- ── 0. Bảng ghi lại các lần bất thường (để admin xem, không ai khác) ────────
CREATE TABLE IF NOT EXISTS public.reward_anomalies (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  detail JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reward_anomalies_time_idx
  ON public.reward_anomalies (created_at DESC);

ALTER TABLE public.reward_anomalies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reward_anomalies_admin_read" ON public.reward_anomalies;
CREATE POLICY "reward_anomalies_admin_read" ON public.reward_anomalies
  FOR SELECT USING (public.is_admin());

-- Không có policy INSERT/UPDATE/DELETE: chỉ trigger (SECURITY DEFINER) ghi được.

-- ── 1. Sổ cái Xu ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.chan_dong_xu_bat_thuong()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tran_amount CONSTANT INT := 200;      -- 4 × phần thưởng cao nhất (50 xu)
  tran_so_dong CONSTANT INT := 120;     -- rộng hơn nhiều so với thực tế 1 bé chơi liên tục
  so_dong INT;
BEGIN
  IF NEW.amount IS NULL OR NEW.amount = 0 THEN
    RAISE EXCEPTION 'Sổ cái Xu: số xu phải khác 0' USING ERRCODE = 'check_violation';
  END IF;
  IF ABS(NEW.amount) > tran_amount THEN
    RAISE EXCEPTION 'Sổ cái Xu: % vượt trần một dòng (%)', NEW.amount, tran_amount
      USING ERRCODE = 'check_violation';
  END IF;

  SELECT COUNT(*) INTO so_dong
  FROM public.coin_transactions
  WHERE child_id = NEW.child_id AND created_at > NOW() - INTERVAL '1 minute';
  IF so_dong >= tran_so_dong THEN
    RAISE EXCEPTION 'Sổ cái Xu: quá nhiều dòng trong 1 phút cho cùng một bé (%)', so_dong
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS chan_dong_xu_bat_thuong ON public.coin_transactions;
CREATE TRIGGER chan_dong_xu_bat_thuong
  BEFORE INSERT ON public.coin_transactions
  FOR EACH ROW EXECUTE FUNCTION public.chan_dong_xu_bat_thuong();

-- ── 2. Sổ cái XP ───────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.chan_dong_xp_bat_thuong()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tran_amount CONSTANT INT := 240;      -- 4 × mức XP cao nhất (60)
  tran_so_dong CONSTANT INT := 120;
  so_dong INT;
BEGIN
  IF NEW.amount IS NULL OR NEW.amount = 0 THEN
    RAISE EXCEPTION 'Sổ cái XP: số XP phải khác 0' USING ERRCODE = 'check_violation';
  END IF;
  IF ABS(NEW.amount) > tran_amount THEN
    RAISE EXCEPTION 'Sổ cái XP: % vượt trần một dòng (%)', NEW.amount, tran_amount
      USING ERRCODE = 'check_violation';
  END IF;

  SELECT COUNT(*) INTO so_dong
  FROM public.xp_events
  WHERE child_id = NEW.child_id AND created_at > NOW() - INTERVAL '1 minute';
  IF so_dong >= tran_so_dong THEN
    RAISE EXCEPTION 'Sổ cái XP: quá nhiều dòng trong 1 phút cho cùng một bé (%)', so_dong
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS chan_dong_xp_bat_thuong ON public.xp_events;
CREATE TRIGGER chan_dong_xp_bat_thuong
  BEFORE INSERT ON public.xp_events
  FOR EACH ROW EXECUTE FUNCTION public.chan_dong_xp_bat_thuong();

-- ── 3. child_profiles.coins / .xp — chặn trần tuyệt đối, ghi log khi nhảy lớn ─
CREATE OR REPLACE FUNCTION public.kiem_so_du_hop_ly()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tran_tuyet_doi CONSTANT INT := 5000000;   -- không bé nào học tới mức này là bình thường
  tran_nhay CONSTANT INT := 2000;           -- nhảy hơn mức này trong MỘT lần lưu ⇒ ghi log
  d_coins INT;
  d_xp INT;
BEGIN
  IF NEW.coins IS NULL OR NEW.xp IS NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.coins > tran_tuyet_doi OR NEW.xp > tran_tuyet_doi THEN
    RAISE EXCEPTION 'Số dư vượt trần cho phép (xu %, xp %)', NEW.coins, NEW.xp
      USING ERRCODE = 'check_violation';
  END IF;

  d_coins := NEW.coins - COALESCE(OLD.coins, 0);
  d_xp := NEW.xp - COALESCE(OLD.xp, 0);

  IF d_coins > tran_nhay OR d_xp > tran_nhay OR NEW.coins < 0 OR NEW.xp < 0 THEN
    INSERT INTO public.reward_anomalies (child_id, kind, detail)
    VALUES (
      NEW.id,
      'so_du_nhay_lon',
      jsonb_build_object(
        'coins_truoc', OLD.coins, 'coins_sau', NEW.coins, 'delta_coins', d_coins,
        'xp_truoc', OLD.xp, 'xp_sau', NEW.xp, 'delta_xp', d_xp
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS kiem_so_du_hop_ly ON public.child_profiles;
CREATE TRIGGER kiem_so_du_hop_ly
  BEFORE UPDATE ON public.child_profiles
  FOR EACH ROW EXECUTE FUNCTION public.kiem_so_du_hop_ly();

-- ── 4. Kiểm sau khi chạy ───────────────────────────────────────────────────
-- a) Liệt kê trigger vừa tạo:
--    SELECT tgname, relname FROM pg_trigger t
--    JOIN pg_class c ON c.oid = t.tgrelid
--    WHERE tgname IN ('chan_dong_xu_bat_thuong', 'chan_dong_xp_bat_thuong', 'kiem_so_du_hop_ly');
--    Mong đợi: 3 dòng.
--
-- b) Thử ghi một dòng xu vô lý (PHẢI bị chặn — thay <id-bé> bằng id thật nếu muốn thử):
--    -- INSERT INTO public.coin_transactions (child_id, amount, reason)
--    -- VALUES ('<id-bé>', 999999, 'thu-nghiem');   ⇒ mong đợi: ERROR vượt trần
--
-- c) Xem các lần nhảy lớn (mong đợi: rỗng nếu chưa ai gian lận):
--    SELECT * FROM public.reward_anomalies ORDER BY created_at DESC LIMIT 20;
