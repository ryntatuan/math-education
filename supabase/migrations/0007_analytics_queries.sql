-- ====================================================================
-- 0007_analytics_queries.sql
-- Giai đoạn 2b — Lát 2b-2: hàm đọc số liệu cho màn hình /analytics
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN HÀM NÀY (chứ không gọi PostgREST thẳng từ trình duyệt):
--   Ba khối A/B/C đều là GROUP BY. PostgREST KHÔNG làm được GROUP BY.
--   Cách duy nhất để dựng 3 khối đó từ trình duyệt là tải TOÀN BỘ dòng về rồi
--   gộp bằng JavaScript — và PostgREST mặc định chỉ trả tối đa 1000 dòng một
--   lần. Hệ quả: khi dữ liệu vượt 1000 dòng, màn hình vẫn hiện số, vẫn trông
--   bình thường, nhưng số SAI. Đúng kiểu hỏng âm thầm mà cả dự án đang tránh.
--   Nên phép gộp chạy trong database, chỉ trả về vài chục dòng đã tổng hợp.
--
-- BẢO MẬT:
--   SECURITY INVOKER (mặc định) — hàm chạy dưới quyền người gọi, nên RLS của
--   `question_attempts` vẫn là thứ quyết định. Admin thấy dữ liệu nhờ policy
--   `question_attempts_admin_read`. Phụ huynh chỉ thấy bé của mình (policy
--   `question_attempts_parent_select`) — không rò rỉ gì thêm. `anon` nhận 0
--   dòng, và bị REVOKE thêm một lớp nữa cho chắc.
--   Hàm chỉ ĐỌC — không có nhánh ghi nào, nên KHÔNG cần audit log.
--
-- ponytail: KHÔNG thêm index cho `created_at`. Mọi truy vấn ở đây đều phải
--   quét rồi gộp toàn bộ khoảng ngày, nên index `created_at` không giúp được
--   gì ngoài việc làm chậm mỗi lần ghi — mà bảng này ghi rất nhiều. Vài nghìn
--   dòng thì quét tuần tự là tức thời. Khi nào thấy chậm thật thì mới thêm.
-- ====================================================================


-- --------------------------------------------------------------------
-- Hàm gộp số liệu — trả về đúng 3 khối của kế hoạch (mục 5.3)
--
--   broken   — A: khuôn/câu nào sai nhiều bất thường (chỉ tính khi đủ 20 lượt)
--   guessing — B: sai vì VỘI (nhanh + sai) hay vì CHƯA HIỂU (chậm + sai)
--   weak     — C: kỹ năng nào yếu thật sự, gộp theo bé · kỹ năng
--
-- Ngưỡng 20 lượt được TRẢ VỀ trong kết quả (`min_attempts`) chứ không để màn
-- hình tự gán cứng — cùng bài học với `TC-R.8`: số hiển thị cho người dùng
-- không bao giờ được viết chết trong JSX.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_question_analytics(
  p_days INT DEFAULT 30,
  p_grade SMALLINT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH params AS (
    SELECT GREATEST(COALESCE(p_days, 30), 1) AS days,
           20 AS min_attempts
  ),
  base AS (
    SELECT a.question_ref, a.topic, a.child_id, a.ms, a.is_correct
    FROM public.question_attempts a, params p
    WHERE a.created_at >= NOW() - make_interval(days => p.days)
      AND (p_grade IS NULL OR a.grade = p_grade)
  ),
  -- A — khuôn hỏng. Sắp theo tỉ lệ sai, không theo số lượt: khuôn 5 lượt sai
  -- cả 5 đáng nhìn hơn khuôn 200 lượt sai 20%.
  --
  -- ⚠️ Ngưỡng lấy bằng TRUY VẤN CON, không phải `p.min_attempts` trực tiếp:
  -- `broken` có `GROUP BY question_ref`, nên trong `HAVING` mọi cột không phải
  -- tổng hợp đều phải nằm trong `GROUP BY`. PostgreSQL từ chối thẳng và báo
  -- `column "p.min_attempts" must appear in the GROUP BY clause`.
  broken AS (
    SELECT a.question_ref AS ref,
           COUNT(*)::INT AS attempts,
           ROUND(100.0 * COUNT(*) FILTER (WHERE NOT a.is_correct) / COUNT(*), 1)
             AS wrong_pct
    FROM base a
    GROUP BY a.question_ref
    HAVING COUNT(*) >= (SELECT min_attempts FROM params)
  ),

  -- B — chỉ tính lượt CÓ `ms`. Lượt bỏ dở (ms NULL) không nói gì về việc bé
  -- vội hay không hiểu, nên đưa vào là làm loãng tín hiệu.
  guessing AS (
    SELECT a.question_ref AS ref,
           (COUNT(*) FILTER (WHERE NOT a.is_correct AND a.ms < 3000))::INT
             AS rush_wrong,
           (COUNT(*) FILTER (WHERE NOT a.is_correct AND a.ms > 15000))::INT
             AS slow_wrong
    FROM base a
    WHERE a.ms IS NOT NULL
    GROUP BY a.question_ref
  ),

  -- C — chỉ câu SINH TỰ ĐỘNG mới có `topic`. Câu trong bài học để trống `topic`
  -- là đúng thiết kế (xem `TC-2.15`), nên khối này không gồm chúng.
  weak AS (
    SELECT cp.nickname,
           a.topic,
           COUNT(*)::INT AS attempts,
           ROUND(100.0 * (COUNT(*) FILTER (WHERE a.is_correct)) / COUNT(*), 1)
             AS correct_pct
    FROM base a
    JOIN public.child_profiles cp ON cp.id = a.child_id
    WHERE a.topic IS NOT NULL
    GROUP BY cp.nickname, a.topic
  ),

  -- Bao nhiêu khuôn đã có dữ liệu nhưng CHƯA đủ ngưỡng. Dùng cho thông báo
  -- "cần thêm bao nhiêu nữa" — bảng trống mà không giải thích thì bị hiểu nhầm
  -- là hỏng.
  below_min AS (
    SELECT COUNT(*)::INT AS refs_below_min
    FROM (
      SELECT a.question_ref
      FROM base a
      GROUP BY a.question_ref
      HAVING COUNT(*) < (SELECT min_attempts FROM params)
    ) t
  )

  SELECT jsonb_build_object(
    'days',           (SELECT days FROM params),
    'grade',          p_grade,
    'min_attempts',   (SELECT min_attempts FROM params),
    'total_attempts', (SELECT COUNT(*)::INT FROM base),
    'refs_below_min', (SELECT refs_below_min FROM below_min),
    'broken',   COALESCE(
      (SELECT jsonb_agg(to_jsonb(b) ORDER BY b.wrong_pct DESC, b.attempts DESC)
       FROM broken b), '[]'::jsonb),
    'guessing', COALESCE(
      (SELECT jsonb_agg(to_jsonb(g) ORDER BY g.rush_wrong DESC, g.slow_wrong DESC)
       FROM guessing g), '[]'::jsonb),
    'weak',     COALESCE(
      (SELECT jsonb_agg(to_jsonb(w) ORDER BY w.nickname, w.correct_pct)
       FROM weak w), '[]'::jsonb)
  );
$$;

COMMENT ON FUNCTION public.get_question_analytics(INT, SMALLINT) IS
  'GĐ 2b-2: gộp số liệu câu trả lời cho màn hình /analytics. Chỉ đọc, tôn trọng RLS.';


-- --------------------------------------------------------------------
-- Quyền: chỉ người ĐÃ ĐĂNG NHẬP mới gọi được.
--
-- PostgreSQL mặc định cho PUBLIC gọi mọi hàm, nên phải REVOKE tường minh —
-- cùng lý do với `purge_old_attempts` ở 0006. Revoke khỏi PUBLIC cũng lấy luôn
-- quyền của `authenticated`, nên phải GRANT lại cho họ.
-- --------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.get_question_analytics(INT, SMALLINT)
  FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_question_analytics(INT, SMALLINT)
  TO authenticated;
