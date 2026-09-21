-- ====================================================================
-- 0010_content_age_range.sql
-- Giai đoạn 3 — Lát 3d: BÙ MỘT CỘT CÒN THIẾU ĐỂ CÂY TRONG DB KHỚP CÂY FILE TĨNH
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- ⚠️ FILE NÀY KHÔNG ĐỔI HÀNH VI CỦA APP. Nó chỉ thêm dữ liệu còn thiếu. Công tắc
--    bật đọc từ DB nằm RIÊNG ở `0011` — cố ý tách, để còn đối chiếu trước khi bật.
--
-- ══════════════════════════════════════════════════════════════════════════
-- VÌ SAO CẦN: `ParentDashboard.jsx` in `{gr.name} ({gr.ageRange})`. File tĩnh có
-- `ageRange` ("6-7 tuổi"), còn `content_grades` thì KHÔNG có cột đó.
--
-- Nên nếu bật đọc từ DB mà không bù cột này, phụ huynh sẽ thấy:
--
--     Lớp 1 ()        ← dấu ngoặc rỗng, không có lỗi nào trong Console
--
-- Đây đúng loại lỗi mà lát 3a/3b loại trừ: app vẫn chạy, không cảnh báo, chỉ là một
-- chỗ hiện `undefined`. Và nó chỉ lộ ra ở MỘT màn hình mà người phát triển ít mở
-- nhất (bảng điều khiển phụ huynh).
--
-- 💡 Cách tìm ra: `scratch/print_tree_shape.mjs` in tập khoá của grade / chapter /
--    lesson trong file tĩnh, rồi đối chiếu với cột trong `0008`. Suy luận từ trí nhớ
--    thì không tìm ra chỗ này.
-- ══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.content_grades
  ADD COLUMN IF NOT EXISTS age_range TEXT;

-- Giá trị lấy ĐÚNG BẰNG file tĩnh (đo được, không suy ra). Có 5 dòng nên chép tay
-- được; nhiều hơn thì phải dùng script.
UPDATE public.content_grades AS g
   SET age_range = v.khoang_tuoi,
       updated_at = NOW()
  FROM (
    VALUES
      (1, '6-7 tuổi'),
      (2, '7-8 tuổi'),
      (3, '8-9 tuổi'),
      (4, '9-10 tuổi'),
      (5, '10-11 tuổi')
  ) AS v(ma_lop, khoang_tuoi)
 WHERE g.id = v.ma_lop
   -- Chỉ ghi khi KHÁC. Nhờ vậy chạy lại file này không sinh 5 lần `UPDATE` vô ích,
   -- và không đè lên giá trị nếu sau này admin sửa qua giao diện.
   AND g.age_range IS DISTINCT FROM v.khoang_tuoi;


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
--      SELECT id, name, age_range FROM public.content_grades ORDER BY id;
--      -- Mong đợi: 5 dòng, age_range lần lượt:
--      --   6-7 tuổi · 7-8 tuổi · 8-9 tuổi · 9-10 tuổi · 10-11 tuổi
--
-- Chạy lại file lần 2 -> vẫn 5 dòng, không đổi gì.
-- ====================================================================
