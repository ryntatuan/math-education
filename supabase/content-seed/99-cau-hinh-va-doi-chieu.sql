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

-- Đối chiếu số dòng (phải khớp 5 / 51 / 460):
SELECT
  (SELECT COUNT(*) FROM public.content_grades)   AS so_lop,
  (SELECT COUNT(*) FROM public.content_chapters) AS so_chuong,
  (SELECT COUNT(*) FROM public.content_lessons)  AS so_bai,
  (SELECT COUNT(*) FROM public.content_lesson_versions) AS so_phien_ban;

-- Chương nào còn quá ít bài thì in ra (số bài là số THẬT, không phải metadata).
-- Mong đợi: 0 dòng. Danh sách này KHÔNG viết cứng theo id nên không lỗi thời khi
-- chương trình đổi — trước đây nó liệt kê 13 id cũ và đã sai sau lần dựng lại.
SELECT c.id, c.name, COUNT(l.id) AS so_bai
FROM public.content_chapters c
LEFT JOIN public.content_lessons l ON l.chapter_id = c.id
GROUP BY c.id, c.name
HAVING COUNT(l.id) < 3
ORDER BY c.id;
