-- ============================================================================
-- 0021 — SỰ KIỆN HỌC TỐI THIỂU (kế hoạch §3 đợt 5.1)
-- ============================================================================
--
-- VÌ SAO CẦN: hiện không biết **bé bỏ dở bài nào**. Biết được thì mới biết nên sửa bài nào
-- trước (bài mở nhiều mà ít hoàn thành = bài khó hiểu / slide lỗi / quá dài).
--
-- CÁCH LÀM: ghi 3 sự kiện vào chính Supabase — KHÔNG dùng dịch vụ ngoài (PostHog/GA), không
-- tốn tiền, không gửi dữ liệu cá nhân:
--   • `lesson_open`  — bé mở bài
--   • `slide_reach`  — bé tới slide thứ n (biết dừng ở slide nào)
--   • `lesson_done`  — bé làm xong bài (kèm `stars`)
--
-- AN TOÀN:
--   • Chỉ có policy INSERT cho `anon` + `authenticated`: app ghi được, KHÔNG đọc lại được.
--   • Đọc: chỉ admin (`public.is_admin()` — hàm đã có từ trước, dùng chung với `reward_anomalies`).
--   • Chặn ghi ầm: tên sự kiện phải nằm trong danh sách cho phép; mã bài/giới hạn độ dài;
--     trigger chặn khi bảng đã nhận quá nhiều dòng trong 1 giờ (chỉ chặn GHI, không ảnh hưởng gì khác).
--   • Bảng này là DỮ LIỆU PHỤ: xoá lúc nào cũng được, không ảnh hưởng tiến độ/xu/XP của bé.
--
-- Chạy file này trong Supabase SQL Editor. An toàn khi chạy lại nhiều lần.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.app_events (
  id         BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  event      TEXT NOT NULL,
  child_id   UUID REFERENCES public.child_profiles(id) ON DELETE SET NULL,
  lesson_id  TEXT,          -- vd "g1-c1-l1"; KHÔNG dùng khoá ngoại: nội dung có thể đổi mã
  grade_id   INT,           -- 1..5
  slide      INT,           -- slide_reach: số thứ tự slide (0-based)
  stars      INT,           -- lesson_done: số sao đạt được (1..3)
  CONSTRAINT app_events_event_hop_le CHECK (
    event IN ('lesson_open', 'slide_reach', 'lesson_done')
  ),
  CONSTRAINT app_events_lesson_id_ngan CHECK (
    lesson_id IS NULL OR length(lesson_id) <= 64
  ),
  CONSTRAINT app_events_grade_hop_le CHECK (
    grade_id IS NULL OR (grade_id BETWEEN 1 AND 5)
  ),
  CONSTRAINT app_events_slide_hop_le CHECK (slide IS NULL OR slide >= 0),
  CONSTRAINT app_events_stars_hop_le CHECK (stars IS NULL OR (stars BETWEEN 0 AND 5))
);

-- Truy vấn thường dùng: "bài nào mở nhiều mà ít hoàn thành" ⇒ lọc theo thời gian + bài.
CREATE INDEX IF NOT EXISTS app_events_time_idx ON public.app_events (created_at DESC);
CREATE INDEX IF NOT EXISTS app_events_lesson_idx ON public.app_events (lesson_id, event);

ALTER TABLE public.app_events ENABLE ROW LEVEL SECURITY;

-- ── Ai ĐỌC: chỉ admin ───────────────────────────────────────────────────────
DROP POLICY IF EXISTS "app_events_admin_read" ON public.app_events;
CREATE POLICY "app_events_admin_read" ON public.app_events
  FOR SELECT USING (public.is_admin());

-- ── Ai GHI: app (anon key / bé đã đăng nhập) — chỉ THÊM, không sửa, không xoá ──
DROP POLICY IF EXISTS "app_events_app_insert" ON public.app_events;
CREATE POLICY "app_events_app_insert" ON public.app_events
  FOR INSERT TO anon, authenticated WITH CHECK (TRUE);

-- Không có policy UPDATE/DELETE ⇒ không ai sửa/xoá được qua API (admin xoá bằng SQL Editor).

-- ── Trần chống ghi ầm ───────────────────────────────────────────────────────
-- Đây là dữ liệu phụ: thà mất vài sự kiện còn hơn bị spam làm phình DB.
CREATE OR REPLACE FUNCTION public.chan_ghi_su_kien_am()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  tran_moi_gio CONSTANT INT := 20000;   -- toàn bộ app trong 1 giờ (thực tế vài trăm)
  so_dong INT;
BEGIN
  SELECT COUNT(*) INTO so_dong
  FROM public.app_events
  WHERE created_at > NOW() - INTERVAL '1 hour';

  IF so_dong >= tran_moi_gio THEN
    RAISE EXCEPTION 'app_events: đã vượt trần ghi trong 1 giờ (%)', tran_moi_gio
      USING ERRCODE = 'check_violation';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS app_events_chan_ghi_am ON public.app_events;
CREATE TRIGGER app_events_chan_ghi_am
  BEFORE INSERT ON public.app_events
  FOR EACH ROW EXECUTE FUNCTION public.chan_ghi_su_kien_am();

-- ============================================================================
-- CÂU TRUY VẤN ĐỂ XEM (dán vào SQL Editor khi cần)
-- ============================================================================
--
-- 1) Bài nào mở nhiều mà ít hoàn thành — 30 ngày gần đây:
--
--    SELECT lesson_id,
--           COUNT(*) FILTER (WHERE event = 'lesson_open') AS mo,
--           COUNT(*) FILTER (WHERE event = 'lesson_done') AS xong,
--           ROUND(
--             100.0 * COUNT(*) FILTER (WHERE event = 'lesson_done')
--               / GREATEST(COUNT(*) FILTER (WHERE event = 'lesson_open'), 1)
--           ) AS ty_le_xong_pct
--    FROM public.app_events
--    WHERE created_at > NOW() - INTERVAL '30 days'
--    GROUP BY lesson_id
--    HAVING COUNT(*) FILTER (WHERE event = 'lesson_open') >= 10
--    ORDER BY ty_le_xong_pct ASC, mo DESC
--    LIMIT 50;
--
-- 2) Bé dừng lại ở slide nào (bài nào có slide "chết"):
--
--    SELECT lesson_id, slide,
--           COUNT(*) FILTER (WHERE event = 'slide_reach') AS so_lan_toi
--    FROM public.app_events
--    WHERE event = 'slide_reach' AND created_at > NOW() - INTERVAL '30 days'
--    GROUP BY lesson_id, slide
--    ORDER BY lesson_id, slide;
--
-- 3) Tỷ lệ đạt 3 sao của từng bài (bài nào khó nhất):
--
--    SELECT lesson_id,
--           ROUND(AVG(stars), 2) AS sao_trung_binh,
--           COUNT(*) AS so_lan_xong
--    FROM public.app_events
--    WHERE event = 'lesson_done' AND created_at > NOW() - INTERVAL '30 days'
--    GROUP BY lesson_id
--    HAVING COUNT(*) >= 5
--    ORDER BY sao_trung_binh ASC
--    LIMIT 30;
--
-- 4) Số bé đang dùng thật (đếm bé khác nhau trong 7 ngày):
--
--    SELECT COUNT(DISTINCT child_id) AS so_be
--    FROM public.app_events
--    WHERE created_at > NOW() - INTERVAL '7 days' AND child_id IS NOT NULL;
--
-- 5) Dọn dữ liệu cũ (chạy tay khi cần):
--
--    DELETE FROM public.app_events WHERE created_at < NOW() - INTERVAL '180 days';
-- ============================================================================
