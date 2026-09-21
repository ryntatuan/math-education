-- ====================================================================
-- 0012_chan_quyen_ham_noi_bo.sql
-- Vá lỗi quyền phát hiện SAU KHI chạy 0009 — do cổng `D-16` bắt được
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- ══════════════════════════════════════════════════════════════════════════
-- 🐞 LỖI LÀ GÌ (đo được, không phải suy đoán)
--
-- `supabase/migrations/0009` kết thúc mỗi hàm bằng:
--
--     REVOKE ALL ON FUNCTION public.<hàm>(...) FROM PUBLIC;
--     GRANT  EXECUTE ON FUNCTION public.<hàm>(...) TO authenticated;
--
-- Tôi tưởng `REVOKE ... FROM PUBLIC` là đủ để chặn `anon` — **SAI**.
--
-- Supabase cấp `EXECUTE` cho `anon` bằng **DEFAULT PRIVILEGES** của schema `public`,
-- tức là một grant **trực tiếp cho vai trò `anon`**, KHÔNG đi qua `PUBLIC`. Gỡ
-- `PUBLIC` không đụng tới nó.
--
-- Bằng chứng: cổng `D-16` gọi `rpc/bump_content_version` bằng anon key và nhận về
-- **HTTP 200** — hàm đã CHẠY, không phải bị chặn.
--
-- ⚠️ Mức độ ảnh hưởng — nói đúng, không phóng đại:
--   • `bump_content_version` — khách gọi được ⇒ **tăng `content_version` tuỳ ý**.
--     Không sửa được nội dung, nhưng mỗi lần tăng là mọi máy bé coi cache của mình
--     là cũ và **tải lại ~800 KB**. Gọi vòng lặp thì thành khuếch đại băng thông.
--   • `ghi_vet_bai_hoc` — khách gọi được nhưng **vẫn không ghi được gì**: RLS của
--     `admin_audit_log` đòi `is_admin() AND actor_id = auth.uid()`. Không có đường
--     giả mạo vết kiểm toán. (Vẫn vá cho chắc.)
--   • 4 hàm còn lại (`save_lesson_draft` · `publish_lesson` · `rollback_lesson` ·
--     `set_lesson_status`) — **đã bị chặn đúng**, vì bên trong mỗi hàm có
--     `IF NOT public.is_admin() THEN RAISE`. Cổng `D-16` xác nhận cả 4 đều trả lỗi.
--
-- 💡 Bài học: lớp bảo vệ duy nhất đang thật sự chặn khách là **`if not is_admin()`
--    viết TRONG hàm**, không phải `REVOKE`. Nên vá theo CẢ HAI hướng: gỡ quyền cho
--    tường minh, VÀ thêm chốt bên trong. Quyền có thể trôi (default privileges, một
--    lần `GRANT` lơ đãng); còn dòng `if` thì nằm ngay trong hàm.
-- ══════════════════════════════════════════════════════════════════════════
--
-- 📌 VÌ SAO TẠO FILE MỚI MÀ KHÔNG SỬA `0009`: `0009` **đã chạy** rồi. Sửa một
--    migration đã áp dụng là cách chắc chắn nhất để môi trường này lệch môi trường
--    kia — đúng lý do đã tách `0003` ra khỏi `0002` ở GĐ 1. Môi trường cài mới sẽ
--    chạy `0009` rồi `0012` và ra ĐÚNG trạng thái cuối.


-- --------------------------------------------------------------------
-- 1. Gỡ quyền gọi của `anon` — TƯỜNG MINH, không dựa vào PUBLIC
--
-- Mẫu này chép từ `0006_question_attempts.sql` (hàm `purge_old_attempts`), chỗ đã
-- gỡ quyền cho cả `anon` lẫn `authenticated` bằng hai dòng riêng.
-- --------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.bump_content_version() FROM anon;
REVOKE ALL ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  FROM anon;

-- Vẫn giữ `authenticated`: hai hàm này được gọi TỪ BÊN TRONG các hàm admin, mà
-- quyền gọi hàm con được kiểm theo **quyền của người gọi** (các hàm đó chạy
-- `SECURITY INVOKER`). Gỡ luôn là admin cũng không publish được.
GRANT EXECUTE ON FUNCTION public.bump_content_version() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  TO authenticated;


-- --------------------------------------------------------------------
-- 2. Chốt bên trong hàm — lớp chặn KHÔNG THỂ trôi
--
-- Thân hàm giống hệt `0009`, chỉ thêm dòng `IF NOT public.is_admin()`.
-- Dùng `CREATE OR REPLACE` với ĐÚNG chữ ký cũ nên không phá gì.
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.bump_content_version()
RETURNS INT
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  v_moi INT;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được đổi phiên bản nội dung'
      USING ERRCODE = '42501';
  END IF;

  UPDATE public.app_config
     SET value = to_jsonb(
           COALESCE(
             CASE WHEN jsonb_typeof(value) = 'number' THEN (value #>> '{}')::INT END,
             CASE WHEN jsonb_typeof(value) = 'object' THEN (value ->> 'value')::INT END,
             0
           ) + 1
         ),
         updated_at = NOW()
   WHERE key = 'content_version'
  RETURNING (value #>> '{}')::INT INTO v_moi;

  RETURN COALESCE(v_moi, 0);
END;
$$;

CREATE OR REPLACE FUNCTION public.ghi_vet_bai_hoc(
  p_action TEXT,
  p_lesson_id TEXT,
  p_before JSONB,
  p_after JSONB,
  p_reason TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Chỉ admin được ghi vết kiểm toán'
      USING ERRCODE = '42501';
  END IF;

  INSERT INTO public.admin_audit_log
    (actor_id, action, entity, entity_id, before, after, reason)
  VALUES
    (auth.uid(), p_action, 'content_lessons', p_lesson_id, p_before, p_after, p_reason);
END;
$$;

-- Cấp lại sau `CREATE OR REPLACE`: PostgreSQL gỡ quyền cũ khi tạo lại hàm.
REVOKE ALL ON FUNCTION public.bump_content_version() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.bump_content_version() FROM anon;
GRANT EXECUTE ON FUNCTION public.bump_content_version() TO authenticated;

REVOKE ALL ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  FROM PUBLIC;
REVOKE ALL ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  FROM anon;
GRANT EXECUTE ON FUNCTION public.ghi_vet_bai_hoc(TEXT, TEXT, JSONB, JSONB, TEXT)
  TO authenticated;


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
-- 1. `anon` KHÔNG còn trong danh sách quyền của 2 hàm nội bộ:
--
--      SELECT proname, proacl FROM pg_proc
--      WHERE pronamespace = 'public'::regnamespace
--        AND proname IN ('bump_content_version','ghi_vet_bai_hoc');
--      -- Mong đợi: KHÔNG dòng nào có `anon=` trong proacl
--
-- 2. Từ Console app của bé (đang là Khách) — cả hai phải bị chặn:
--
--      const a = await __sb.rpc('bump_content_version');
--      const b = await __sb.rpc('ghi_vet_bai_hoc', {
--        p_action: 'test', p_lesson_id: 'g1-c1-l1', p_before: null, p_after: null });
--      console.log(a.error?.message, b.error?.message);
--      -- Mong đợi: CẢ HAI đều có lỗi (không phải null)
--
-- 3. Publish vẫn chạy được (đây là điều dễ làm hỏng nhất khi siết quyền):
--      vào Admin -> Sửa một bài -> Lưu nháp -> Publish.
--      Mong đợi: publish thành công, `content_version` tăng 1.
-- ====================================================================
