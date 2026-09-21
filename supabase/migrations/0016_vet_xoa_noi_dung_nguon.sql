-- ============================================================================
-- 0016 — VẾT XOÁ BÀI PHẢI NÓI ĐÚNG NGUỒN, KHÔNG ĐOÁN
--
-- 🔴 VẤN ĐỀ (phát hiện 2026-09-20, bằng cách ĐỌC DÒNG VẾT MỚI NHẤT sau khi bấm nút):
--    Trigger `0014` ghi cứng `reason = 'Xoá thẳng trong DB (không qua giao diện)'`.
--    Câu đó ĐÚNG khi ai đó dán `DELETE` vào SQL Editor — nhưng `0015` vừa thêm nút xoá
--    trên giao diện, nên từ giờ nó **nói dối**: bấm nút trong trang quản trị cũng ra
--    đúng câu "không qua giao diện".
--
--    Nguy hiểm không nằm ở chữ nghĩa: `admin_audit_log` là **bằng chứng duy nhất** cho
--    "chuyện gì đã xảy ra với nội dung". Một dòng vết chỉ sai nguồn sẽ khiến người đi
--    tìm sự cố loại trừ nhầm hướng — hỏng đúng lúc cần nó nhất.
--
-- ────────────────────────────────────────────────────────────────────────────
-- CÁCH CHỮA — SUY NGUỒN TỪ THỨ ĐÃ BIẾT, KHÔNG ĐOÁN
--
-- Người xoá từ trang quản trị LUÔN có JWT ⇒ `auth.uid()` khác NULL.
-- Người xoá bằng SQL Editor KHÔNG có JWT ⇒ `auth.uid()` là NULL.
-- Vậy `reason` được suy thẳng từ `auth.uid()` — cùng nguồn sự thật với `actor_id`,
-- nên hai trường không thể mâu thuẫn nhau.
--
-- 📌 Ba đường khác đã cân nhắc và KHÔNG chọn:
--    • Cờ phiên `set_config('app.nguon_xoa', …)` do hàm RPC đặt: chính xác hơn một
--      chút nhưng thêm một trạng thái ẩn phải nhớ đặt và phải nhớ đọc. `auth.uid()`
--      đã trả lời đúng câu hỏi này rồi.
--    • Để hàm RPC tự ghi một dòng vết riêng: mỗi lần bấm nút sẽ có **HAI** dòng trùng,
--      mà sổ kiểm toán là bảng chỉ-thêm, không sửa lại được (xem quyết định `F3`).
--    • Bỏ hẳn `reason`: mất thông tin, mà thông tin này miễn phí.
--
-- ⚠️ Vì sao là migration MỚI chứ không sửa `0014`: `0014` đã chạy trên DB thật. Sửa một
--    migration đã áp dụng là cách chắc nhất để môi trường này lệch môi trường kia (bài
--    học đã ghi ở `0002`/`0003`). Ở đây dùng `CREATE OR REPLACE` — đúng cách đổi một hàm
--    đã tồn tại.
--
-- ⚠️ `CREATE OR REPLACE` XOÁ SẠCH quyền cũ ⇒ phải cấp lại `REVOKE`/`GRANT` ở dưới, y như
--    `0009`/`0012`/`0014`/`0015`. Thiếu dòng `GRANT` là admin không xoá được nữa.
--
-- 📌 Các dòng `lesson.delete` ĐÃ GHI TRƯỚC migration này vẫn giữ câu cũ — bảng chỉ-thêm,
--    không sửa lại được, và cũng không nên sửa. Từ đây về sau mới đúng.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.sau_khi_xoa_bai_hoc()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_nguon CONSTANT TEXT := CASE
    WHEN auth.uid() IS NULL THEN 'Xoá bằng SQL (không có phiên đăng nhập)'
    ELSE 'Xoá từ trang quản trị'
  END;
BEGIN
  -- ── 1. Bài ĐÃ PUBLISH bị xoá ⇒ nội dung mà bé đang thấy vừa thay đổi ─────────
  --    Phải tăng số phiên bản, nếu không máy bé không bao giờ biết mà tải lại.
  --    Bài `draft` thì KHÔNG tăng: bé chưa từng thấy nó, mà tăng lại bắt mọi máy
  --    tải lại ~800 KB vô ích.
  IF OLD.status = 'published' THEN
    PERFORM public.bump_content_version();
  END IF;

  -- ── 2. Ghi vết ───────────────────────────────────────────────────────────────
  --    `before` chỉ ghi HÌNH DẠNG, không ghi payload: một slide có thể nặng hàng chục
  --    KB, nhân lên vài trăm bài là sổ phình vô ích.
  --
  --    🔴 Bọc trong khối `EXCEPTION` **có chủ ý**: ghi vết hỏng KHÔNG được phép chặn
  --       việc xoá. Khối này là một subtransaction nên bắt lỗi ở đây không làm hỏng
  --       transaction ngoài.
  BEGIN
    INSERT INTO public.admin_audit_log
      (actor_id, action, entity, entity_id, before, after, reason)
    VALUES
      (
        auth.uid(),
        'lesson.delete',
        'content_lessons',
        OLD.id,
        jsonb_build_object(
          'chapter_id', OLD.chapter_id,
          'title', OLD.title,
          'status', OLD.status,
          'slides',
          CASE
            WHEN jsonb_typeof(OLD.payload -> 'slides') = 'array'
              THEN jsonb_array_length(OLD.payload -> 'slides')
            ELSE 0
          END
        ),
        NULL,
        v_nguon
      );
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  RETURN OLD;
END;
$$;

REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.sau_khi_xoa_bai_hoc() FROM anon;
GRANT EXECUTE ON FUNCTION public.sau_khi_xoa_bai_hoc() TO authenticated;

COMMENT ON FUNCTION public.sau_khi_xoa_bai_hoc() IS
  'AFTER DELETE trên content_lessons: tăng content_version nếu bài đã publish, và ghi '
  'một dòng lesson.delete. reason suy từ auth.uid() (NULL = xoá bằng SQL) nên không '
  'bao giờ nói sai nguồn. Trigger vẫn giữ nguyên (0014) — chỉ đổi phần chữ.';

-- ============================================================================
-- KIỂM NGAY SAU KHI CHẠY
--
-- 🔴 QUY TẮC CHUNG, ĐỌC TRƯỚC KHI THỬ BẤT CỨ HÀM CMS NÀO TRONG SQL EDITOR:
--    SQL Editor chạy **KHÔNG có JWT** ⇒ `auth.uid()` là NULL ⇒ `is_admin()` false ⇒
--    **MỌI hàm CMS có chốt admin** (`create_lesson`, `save_lesson_draft`, `publish_lesson`,
--    `rollback_lesson`, `set_lesson_status`, `delete_lesson`) đều TỪ CHỐI bằng
--    `42501 … Chỉ admin …`. **ĐÓ LÀ ĐÚNG THIẾT KẾ, không phải hàm hỏng.**
--    ⇒ Trong SQL Editor, dựng dữ liệu để thử bằng **SQL THÔ** (`INSERT`/`UPDATE`/`DELETE`).
--      Trigger vẫn chạy như thường, nên vẫn thử được đúng thứ cần thử.
--    📌 Đã mắc lỗi hướng dẫn này **hai lần liên tiếp** (người dùng chạy đúng câu tôi viết
--      và nhận 42501): lần 1 ở `0015` câu (2), lần 2 ở chính file này câu (3). Từ giờ,
--      bất cứ câu tự kiểm nào gọi hàm CMS đều phải kèm cách thử KHÔNG cần JWT.
--
--   -- (1) Hàm đã đổi? (câu này in ra thân hàm — tìm chữ `Xoá từ trang quản trị`)
--   SELECT pg_get_functiondef('public.sau_khi_xoa_bai_hoc'::regproc);
--
--   -- (2) Quyền vẫn còn (thiếu `GRANT` là admin không xoá được nữa)
--   SELECT has_function_privilege('anon', 'public.sau_khi_xoa_bai_hoc()', 'EXECUTE') AS khach;
--   -- Mong đợi: false
--
--   -- (3) Đường thật — SQL THÔ, không gọi hàm CMS nào
--   INSERT INTO public.content_lessons
--     (id, chapter_id, title, lesson_type, status, payload, sort_order)
--   VALUES
--     ('g1-c1-thu-vet', 'g1-c1', 'Bài để thử vết xoá', 'learn', 'draft',
--      '{"slides": []}'::jsonb, 999);
--   DELETE FROM public.content_lessons WHERE id = 'g1-c1-thu-vet';
--   SELECT reason, actor_id FROM public.admin_audit_log
--    WHERE action = 'lesson.delete' ORDER BY created_at DESC LIMIT 1;
--   -- Mong đợi: reason = 'Xoá bằng SQL (không có phiên đăng nhập)' · actor_id = NULL
--   SELECT COUNT(*) FROM public.content_lessons;   -- phải về lại đúng 362
--   -- 📌 Mã `g1-c1-thu-vet` cố ý KHÔNG theo dạng `-l<số>` để nếu có sót lại thì
--   --    `create_lesson` cũng không bị nhảy số.
--
--   -- (4) Đường giao diện: bấm 🗑️ Xoá bài này trong trang quản trị ⇒ reason phải là
--   --     'Xoá từ trang quản trị' và actor_id khác NULL. (Xem `TC-3c.12`.)
-- ============================================================================
