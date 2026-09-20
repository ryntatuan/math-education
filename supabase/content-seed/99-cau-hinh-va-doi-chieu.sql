-- SINH TỰ ĐỘNG bởi scripts/migrate-content.mjs — ĐỪNG SỬA TAY.
-- Chạy trong Supabase SQL Editor, theo thứ tự tên file.
-- Chạy lại được nhiều lần (ON CONFLICT … DO UPDATE) nên không sinh dòng trùng.

-- Cấu hình và đối chiếu

-- Đánh dấu phiên bản nội dung = 1. CHỈ đặt khi đang nhỏ hơn 1, để chạy lại
-- không kéo lùi phiên bản mà admin đã publish sau đó.
UPDATE public.app_config
SET value = '1'::jsonb, updated_at = NOW()
WHERE key = 'content_version'
  AND COALESCE((value #>> '{}')::int, 0) < 1;

-- 🔴 KHÔNG đụng tới content_source. App phải tiếp tục đọc file tĩnh.
-- Kiểm để chắc chắn:
SELECT key, value FROM public.app_config
WHERE key IN ('content_source', 'content_version') ORDER BY key;
-- Mong đợi: content_source = "static" · content_version = 1

-- Đối chiếu số dòng (phải khớp 5 / 41 / 362):
SELECT
  (SELECT COUNT(*) FROM public.content_grades)   AS so_lop,
  (SELECT COUNT(*) FROM public.content_chapters) AS so_chuong,
  (SELECT COUNT(*) FROM public.content_lessons)  AS so_bai,
  (SELECT COUNT(*) FROM public.content_lesson_versions) AS so_phien_ban;

-- Kiểm số bài mỗi chương là số THẬT, không phải metadata sai:
-- (5 chương từng khai sai: g2-c8, g2-c9, g2-c10, g3-c9, g3-c10)
SELECT chapter_id, COUNT(*) AS so_bai
FROM public.content_lessons
WHERE chapter_id IN ('g2-c8','g2-c9','g2-c10','g3-c9','g3-c10')
GROUP BY chapter_id ORDER BY chapter_id;
-- Mong đợi: g2-c8=2, g2-c9=2, g2-c10=3, g3-c9=2, g3-c10=3
