-- ============================================================================
-- chay-mot-lan-reset-hoc-tu-dau.sql
-- TRẢ BÉ CỦA TÀI KHOẢN ADMIN VỀ MỚI TINH ĐỂ HỌC LẠI TỪ ĐẦU
--
-- Xoá/đặt lại: cấp, XP, xu, chuỗi ngày, tiến độ bài học, sổ tay lỗi sai, thú nuôi
-- (cả quà trong túi, cấp, độ đói/độ vui), thứ hạng giải đấu, cúp Vô Địch, sổ cái
-- xu/XP, lịch sử trả lời, sự kiện học. KHÔNG đụng tới: nội dung bài học, cấu hình,
-- nhật ký admin, các tài khoản khác (không còn ai), và KHÔNG xoá tài khoản/hồ sơ
-- (để vẫn đăng nhập được).
--
-- ============ THỨ TỰ LÀM - QUAN TRỌNG, ĐỪNG ĐẢO ==============================
-- B0. CHẠY MIGRATION `0022_luu_cup_vo_dich.sql` TRƯỚC (nếu chưa chạy lần nào).
--     Bước 3 có xoá cúp Vô Địch, mà cột `child_profiles.tournament_cups` chỉ có
--     sau migration đó - thiếu cột là bước 3 báo lỗi và không đặt lại được gì.
-- B1. TRONG APP, ĐĂNG XUẤT TRƯỚC: Hồ sơ -> "Đăng xuất khỏi thiết bị này".
--     (Hoặc DevTools -> Application -> Storage -> Clear site data)
--     Vì sao phải làm trước: thứ hạng giải đấu, nhiệm vụ mỗi ngày, bùa, rương thưởng
--     chỉ nằm trong localStorage của máy. Đăng xuất là app tự xoá 4 khoá riêng
--     (toan-vui-user, toan-vui-progress, toan-vui-pet, math_edu_league_storage).
--     Không xoá ở máy thì màn hình vẫn hiện số cũ, và hạng đấu cũ có thể bị ghi ngược
--     trở lại DB ở lần lưu kế tiếp.
-- B2. Chạy file này (Supabase -> SQL Editor -> dán -> Run).
-- B3. Mở app, đăng nhập lại. App sẽ KÉO số 0 từ DB về máy -> bé bắt đầu lại từ đầu.
--     (App chỉ ĐẨY dữ liệu máy lên DB khi tài khoản CHƯA có hồ sơ bé; tài khoản này
--      đã có hồ sơ nên không có chuyện số cũ quay lại.)
--
-- PHẠM VI: chỉ bé thuộc tài khoản có role = 'admin'.
--   Muốn áp cho MỌI bé của mọi tài khoản: ở mọi chỗ có
--     WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
--                        JOIN public.profiles p ON p.id = cp.parent_id
--                        WHERE p.role = 'admin')
--   thì thay bằng
--     WHERE child_id IN (SELECT id FROM public.child_profiles)
--   (hiện không còn tài khoản nào khác nên hai cách cho cùng kết quả).
-- ============================================================================


-- ============================================================================
-- BƯỚC 1 - XEM TRƯỚC (chạy trước, đọc kết quả, rồi mới sang bước 2)
-- ============================================================================

-- 1a. Bé nào sẽ bị đặt lại (phải là bé của bạn):
SELECT cp.id AS be_id, cp.nickname, cp.grade, cp.level, cp.xp, cp.coins,
       cp.total_xp_for_next_level, cp.unlocked_avatars
FROM public.child_profiles cp
JOIN public.profiles p ON p.id = cp.parent_id
WHERE p.role = 'admin';

-- 1b. Số dòng sẽ bị xoá ở từng bảng (ghi lại để đối chiếu sau):
SELECT
  (SELECT count(*) FROM public.child_mistakes WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS so_tay_loi,
  (SELECT count(*) FROM public.coin_transactions WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS dong_xu,
  (SELECT count(*) FROM public.xp_events WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS dong_xp,
  (SELECT count(*) FROM public.question_attempts WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS luot_tra_loi,
  (SELECT count(*) FROM public.app_events WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS su_kien,
  (SELECT count(*) FROM public.reward_anomalies WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS bat_thuong,
  (SELECT count(*) FROM public.support_tickets WHERE child_id IN (
     SELECT cp.id FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS bao_loi,
  (SELECT count(*) FROM public.leaderboard WHERE is_bot = FALSE AND id::text IN (
     SELECT cp.id::text FROM public.child_profiles cp JOIN public.profiles p ON p.id = cp.parent_id WHERE p.role = 'admin')) AS dong_bxh;


-- ============================================================================
-- BƯỚC 2 - CHỐT AN TOÀN (báo lỗi = không tìm thấy bé của admin, DỪNG, đọc lại bước 1a)
-- ============================================================================

DO $$
DECLARE so_be INT;
BEGIN
  SELECT count(*) INTO so_be
  FROM public.child_profiles cp
  JOIN public.profiles p ON p.id = cp.parent_id
  WHERE p.role = 'admin';

  IF so_be = 0 THEN
    RAISE EXCEPTION 'Không tìm thấy bé nào thuộc tài khoản admin - DỪNG, không đặt lại gì cả. Xem lại bước 1a và cột role trong bảng profiles.';
  END IF;

  RAISE NOTICE 'OK: sẽ đặt lại % hồ sơ bé của tài khoản admin.', so_be;
END $$;


-- ============================================================================
-- BƯỚC 3 - ĐẶT LẠI HỒ SƠ BÉ (cấp 1, 0 xu, 0 XP, xoá sạch cúp, mở khoá lại ảnh đại diện gốc)
--   Giữ nguyên: nickname, grade, created_from, parent_id (để còn đăng nhập được).
--   `= DEFAULT` lấy đúng giá trị mặc định của cột - khỏi chép tay emoji.
-- ============================================================================

UPDATE public.child_profiles
   SET level = 1,
       xp = 0,
       coins = 0,
       total_xp_for_next_level = 100,
       avatar = DEFAULT,
       unlocked_avatars = DEFAULT,
       tournament_cups = DEFAULT,
       ban_reason = NULL,
       is_active = TRUE,
       updated_at = NOW()
 WHERE parent_id IN (SELECT id FROM public.profiles WHERE role = 'admin');


-- ============================================================================
-- BƯỚC 4 - ĐẶT LẠI TIẾN ĐỘ HỌC
--   `exercise_results` chứa cả hạng đấu tuần (__league) và thử thách ngày
--   (__daily_challenge) -> đặt về {} là xong cả hai.
-- ============================================================================

UPDATE public.child_progress
   SET current_streak = 0,
       longest_streak = 0,
       last_active_date = NULL,
       completed_lessons = '{}'::jsonb,
       exercise_results = '{}'::jsonb,
       math_race_wins = 0,
       total_games_played = 0,
       updated_at = NOW()
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

-- 4b. Nếu vì lý do nào đó bé chưa có dòng tiến độ, tạo sẵn một dòng sạch.
--     (Trigger lúc đăng nhập thường đã tạo rồi, câu này chỉ để chắc.)
INSERT INTO public.child_progress (child_id)
SELECT cp.id FROM public.child_profiles cp
  JOIN public.profiles p ON p.id = cp.parent_id
 WHERE p.role = 'admin'
ON CONFLICT (child_id) DO NOTHING;


-- ============================================================================
-- BƯỚC 5 - SỔ TAY LỖI SAI
-- ============================================================================

DELETE FROM public.child_mistakes
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');


-- ============================================================================
-- BƯỚC 6 - THÚ NUÔI: xoá dòng cũ rồi tạo lại bằng ĐÚNG mặc định của bảng
--   (chưa nhận nuôi, cấp 1, độ đói 80, độ vui 90, túi quà gốc, chỉ mở khoá cú).
--   Tạo lại bằng câu INSERT (child_id) để khỏi chép tay, lệch khi schema đổi.
--   Vẫn xoá cả khoá 'toan-vui-pet' trên máy ở bước B1 - nếu không, bản trong máy
--   sẽ hiện con thú cũ cho tới khi app kéo xong dữ liệu từ DB.
-- ============================================================================

DELETE FROM public.child_pets
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

INSERT INTO public.child_pets (child_id)
SELECT cp.id FROM public.child_profiles cp
  JOIN public.profiles p ON p.id = cp.parent_id
 WHERE p.role = 'admin';


-- ============================================================================
-- BƯỚC 7 - SỔ CÁI XU/XP VÀ DỮ LIỆU PHỤ
-- ============================================================================

DELETE FROM public.coin_transactions
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

DELETE FROM public.xp_events
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

DELETE FROM public.question_attempts
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

DELETE FROM public.app_events
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

DELETE FROM public.reward_anomalies
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');

DELETE FROM public.support_tickets
 WHERE child_id IN (SELECT cp.id FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');


-- ============================================================================
-- BƯỚC 8 - THỨ HẠNG GIẢI ĐẤU
--   Xoá dòng của bé khỏi bảng xếp hạng (app sẽ tự tạo lại ở Giải Đồng, 0 XP tuần
--   khi bé học bài tiếp theo). 50 dòng bot giữ nguyên.
-- ============================================================================

DELETE FROM public.leaderboard
 WHERE is_bot = FALSE
   AND id::text IN (SELECT cp.id::text FROM public.child_profiles cp
                    JOIN public.profiles p ON p.id = cp.parent_id
                    WHERE p.role = 'admin');


-- ============================================================================
-- BƯỚC 9 - KIỂM TRA SAU KHI ĐẶT LẠI (phải thấy cấp 1, 0 xu, 0 XP, 0 ván, 0 lỗi)
-- ============================================================================

SELECT cp.nickname, cp.level, cp.xp, cp.coins, cp.total_xp_for_next_level,
       cp.tournament_cups,
       pr.current_streak, pr.longest_streak, pr.last_active_date,
       pr.completed_lessons, pr.exercise_results, pr.math_race_wins, pr.total_games_played,
       pe.has_pet, pe.level AS pet_level, pe.inventory,
       (SELECT count(*) FROM public.child_mistakes m WHERE m.child_id = cp.id)      AS so_tay_loi,
       (SELECT count(*) FROM public.coin_transactions c WHERE c.child_id = cp.id)  AS dong_xu,
       (SELECT count(*) FROM public.xp_events x WHERE x.child_id = cp.id)          AS dong_xp,
       (SELECT count(*) FROM public.question_attempts q WHERE q.child_id = cp.id)   AS luot_tra_loi,
       (SELECT count(*) FROM public.leaderboard l WHERE l.id::text = cp.id::text)  AS dong_bxh
FROM public.child_profiles cp
JOIN public.profiles p ON p.id = cp.parent_id
LEFT JOIN public.child_progress pr ON pr.child_id = cp.id
LEFT JOIN public.child_pets pe ON pe.child_id = cp.id
WHERE p.role = 'admin';

-- 9b. Sau đó mở app, đăng nhập lại: Trang chủ phải hiện 0 ngày liên tiếp, 0 xu,
--     0% mỗi chương và lời mời nhận nuôi thú cưng. Nếu vẫn còn số cũ -> chưa làm
--     bước B1 (Đăng xuất / Clear site data) ở đúng trình duyệt đó.
