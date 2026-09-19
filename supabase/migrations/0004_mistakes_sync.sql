-- ====================================================================
-- 0004_mistakes_sync.sql
-- Cho phép đồng bộ Sổ tay lỗi sai của bé lên Supabase
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- VÌ SAO CẦN:
--   Bảng `child_mistakes` đã có từ `schema.sql` và có policy cho phụ huynh,
--   nhưng **client chưa bao giờ ghi vào** → bảng luôn rỗng. Giai đoạn 2a cần
--   dữ liệu này để hiện "danh sách lỗi sai" trong hồ sơ bé.
--
--   Khi bắt đầu ghi thật thì lộ ra một lỗi kiểu dữ liệu: cột `answer` khai báo
--   là INT, nhưng câu hỏi dạng so sánh (khuôn `g1_compare` trong
--   `client/src/utils/exerciseGenerator.js`) có đáp án là '>', '<' hoặc '='.
--   Ghi vào sẽ lỗi `invalid input syntax for type integer`.
--   → Đổi sang TEXT. Không mất dữ liệu (bảng đang rỗng).
--
-- LƯU Ý: sau migration này, `answer` là TEXT. Client ghi thẳng giá trị đáp án
--   dạng chuỗi, không cần ép kiểu.
-- ====================================================================


-- --------------------------------------------------------------------
-- 1. Sửa kiểu dữ liệu cột answer
-- --------------------------------------------------------------------
ALTER TABLE public.child_mistakes
  ALTER COLUMN answer TYPE TEXT;


-- --------------------------------------------------------------------
-- 2. Index cho truy vấn của màn hình hồ sơ bé
--    Truy vấn: WHERE child_id = ? ORDER BY failed_count DESC
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS child_mistakes_child_failed_idx
  ON public.child_mistakes (child_id, failed_count DESC);
