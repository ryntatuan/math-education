-- ============================================================================
-- 0022 — LƯU CÚP VÔ ĐỊCH CỦA BÉ
-- ============================================================================
--
-- VÌ SAO CẦN: cúp Vàng / Bạc / Đồng trao ở "Chung Kết Vô Địch" trước đây CHỈ nằm
-- trong localStorage của máy (`math_edu_league_storage`). Ba hệ quả thật:
--   • Bé đăng xuất (hoặc xoá dữ liệu trình duyệt) là MẤT SẠCH bộ sưu tập cúp;
--   • Đổi máy / đổi trình duyệt là cúp không theo bé;
--   • Tài khoản đăng nhập sau trên CÙNG thiết bị có thể thấy cúp của người trước,
--     vì khoá localStorage đó là của chung cả trình duyệt, không theo tài khoản.
--
-- CÁCH LÀM: thêm 1 cột JSONB vào `child_profiles` — `{"gold":0,"silver":0,"bronze":0}`.
-- Một cột là đủ (đúng 3 loại cúp, mỗi loại một con số đếm) nên KHÔNG cần bảng riêng.
-- KHÔNG đụng tới dữ liệu hay cột nào khác.
--
-- QUYỀN: `child_profiles` đã có policy "Parents can manage own children"
-- (`auth.uid() = parent_id`, tạo ở `schema.sql`) ⇒ phụ huynh tự đọc/ghi cột này được.
-- KHÔNG cần policy mới, KHÔNG mở quyền gì cho khách.
--
-- APP ĐỌC/GHI Ở ĐÂU:
--   • Nạp lúc đăng nhập: `client/src/services/syncService.js` → `loadChildDataToLocalStores()`
--   • Cộng cúp khi kết toán tuần: `client/src/store/useLeagueStore.js` → `checkWeekReset()`
--   • Hiển thị: `client/src/pages/ProfilePage.jsx` (dải huy hiệu cúp)
-- Chưa chạy migration này thì app đọc ra 0-0-0 và lệnh ghi bị từ chối (chỉ ghi log,
-- không hỏng gì khác) ⇒ KHÔNG bắt buộc phải chạy ngay, nhưng nên chạy.
--
-- AN TOÀN KHI CHẠY LẠI: dùng `IF NOT EXISTS` / `DROP ... IF EXISTS` nên chạy bao nhiêu lần cũng được.
-- ĐỔI LẠI (khi muốn bỏ): ALTER TABLE public.child_profiles DROP COLUMN tournament_cups;
--
-- Chạy file này trong Supabase SQL Editor.
-- ============================================================================

ALTER TABLE public.child_profiles
  ADD COLUMN IF NOT EXISTS tournament_cups JSONB
  DEFAULT '{"gold": 0, "silver": 0, "bronze": 0}'::jsonb;

-- Dòng cũ (đã tạo trước migration): điền sẵn 0-0-0 để app khỏi phải đoán NULL.
UPDATE public.child_profiles
   SET tournament_cups = '{"gold": 0, "silver": 0, "bronze": 0}'::jsonb
 WHERE tournament_cups IS NULL;

-- Chốt hình dạng: chỉ nhận object.
-- Cố ý KHÔNG ràng buộc chặt hơn (bắt buộc đủ 3 khoá, đúng kiểu số): app luôn ghi đủ
-- 3 khoá, còn giá trị lạ thì app đọc thành 0 chứ không phá gì — ràng buộc chặt chỉ
-- làm lệnh ghi của app đổ vỡ vì một lý do vặt.
-- Mục đích của ràng buộc này là chặn ghi nhầm cả mảng/chuỗi/số vào cột.
ALTER TABLE public.child_profiles
  DROP CONSTRAINT IF EXISTS child_profiles_cup_hop_le;

ALTER TABLE public.child_profiles
  ADD CONSTRAINT child_profiles_cup_hop_le CHECK (
    tournament_cups IS NULL OR jsonb_typeof(tournament_cups) = 'object'
  );

-- ── KIỂM TRA SAU KHI CHẠY (chạy riêng, không đổi gì) ────────────────────────
-- Phải thấy đủ 1 dòng cho mỗi bé, cúp đang là 0-0-0 (hoặc số cúp bé đã đoạt):
--
-- SELECT nickname, tournament_cups FROM public.child_profiles ORDER BY created_at;
