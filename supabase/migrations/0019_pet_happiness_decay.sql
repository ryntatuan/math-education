-- 0019: Mốc thời gian cho ĐỘ VUI (happiness) để suy giảm theo giờ.
--
-- Trước đây chỉ ĐỘ NO suy giảm (dựa vào `last_fed_time`). Nay độ vui cũng
-- tụt 2%/giờ nên cần một mốc riêng, KHÔNG dùng chung `last_fed_time`
-- (cho ăn mà lại làm mới đồng hồ độ vui thì sai).
--
-- ⚠️ Chạy MỘT lần trong Supabase SQL Editor. Không có `IF NOT EXISTS`
--    nên dán lại lần 2 sẽ báo `42701` và dừng giữa file.
--
-- Thứ tự bắt buộc: ADD (không DEFAULT) -> backfill -> SET DEFAULT.
-- Nếu ADD kèm DEFAULT thì dòng cũ được điền luôn giá trị đó, khiến câu
-- `UPDATE ... WHERE col IS NULL` khớp 0 dòng (bẫy đã gặp ở 0018).

ALTER TABLE public.child_pets ADD COLUMN last_happy_time TIMESTAMPTZ;

-- Dòng cũ: coi như vừa được chăm sóc, tránh tụt oan về 0%.
UPDATE public.child_pets SET last_happy_time = NOW() WHERE last_happy_time IS NULL;

ALTER TABLE public.child_pets ALTER COLUMN last_happy_time SET DEFAULT NOW();
