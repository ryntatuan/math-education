-- ====================================================================
-- 0003_tune_rewards.sql
-- Điều chỉnh giá thưởng Xu/XP theo quyết định 2026-09-20
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent) — UPDATE về giá trị cố định.
--
-- VÌ SAO CẦN FILE NÀY:
--   Giai đoạn 1 để Admin sửa giá trực tiếp trên DB. Sau khi test, 7 khoá
--   đã được chỉnh và được CHỐT làm giá chính thức. File này chép lại các
--   giá trị đó thành migration để một project Supabase mới (hoặc môi
--   trường staging) cài xong là có ngay đúng giá, không phải sửa tay.
--
--   KHÔNG sửa 0002 vì file đó đã chạy — sửa migration đã áp dụng là cách
--   chắc chắn nhất để môi trường này lệch môi trường kia.
--
-- ĐỒNG BỘ: các giá trị dưới đây phải khớp `REWARD_DEFAULTS` trong
--   client/src/services/rewardService.js (lưới an toàn khi offline).
--   Test `S-11` kiểm tra đúng điều này.
--
-- THAY ĐỔI: hạ toàn bộ thang thưởng luyện tập và mini game xuống để
--   hoàn thành BÀI HỌC vẫn là nguồn Xu/XP chính (20/50), tránh việc
--   chơi mini game nhiều vòng lấn át việc học.
-- ====================================================================


-- --------------------------------------------------------------------
-- Luyện tập: 2 Xu / 5 XP cho cả 3 mốc
--   (trước: correct 10/20, streak 15/20, mistake_review 15/30)
-- --------------------------------------------------------------------
UPDATE public.reward_configs SET coins = 2, xp = 5, updated_at = NOW() WHERE key = 'practice.correct';
UPDATE public.reward_configs SET coins = 2, xp = 5, updated_at = NOW() WHERE key = 'practice.streak_correct';
UPDATE public.reward_configs SET coins = 2, xp = 5, updated_at = NOW() WHERE key = 'practice.mistake_review';


-- --------------------------------------------------------------------
-- Mini game — 4 bậc, giữ nguyên thứ tự tăng dần
--   Tham gia 5/10 < Đồng 10/20 < Bạc 15/30 < Vàng 20/50
--   (trước: 10/20, 30/50, 70/120, 120/200)
-- --------------------------------------------------------------------
UPDATE public.reward_configs SET coins = 5,  xp = 10, updated_at = NOW() WHERE key = 'game.tier_participation';
UPDATE public.reward_configs SET coins = 10, xp = 20, updated_at = NOW() WHERE key = 'game.tier_bronze';
UPDATE public.reward_configs SET coins = 15, xp = 30, updated_at = NOW() WHERE key = 'game.tier_silver';
UPDATE public.reward_configs SET coins = 20, xp = 50, updated_at = NOW() WHERE key = 'game.tier_gold';


-- --------------------------------------------------------------------
-- Ghi vết ai đã chốt thay đổi này.
-- Dùng INSERT ... SELECT ... WHERE NOT EXISTS để chạy lại KHÔNG sinh thêm
-- dòng trùng — giữ đúng tính chất idempotent của cả file.
-- `actor_id` để NULL: đây là migration, không phải thao tác của một người.
-- --------------------------------------------------------------------
INSERT INTO public.admin_audit_log (action, entity, entity_id, after, reason)
SELECT
  'reward_config.tune',
  'reward_configs',
  '0003_tune_rewards',
  '{"practice.correct": "2/5", "practice.streak_correct": "2/5", "practice.mistake_review": "2/5", "game.tier_participation": "5/10", "game.tier_bronze": "10/20", "game.tier_silver": "15/30", "game.tier_gold": "20/50"}'::jsonb,
  'Chốt giá thưởng sau test GĐ 1 (2026-09-20)'
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_audit_log WHERE entity_id = '0003_tune_rewards'
);
