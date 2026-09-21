-- ====================================================================
-- 0011_bat_doc_noi_dung_tu_db.sql
-- Giai đoạn 3 — Lát 3d: BẬT CÔNG TẮC ĐỂ APP CỦA BÉ ĐỌC NỘI DUNG TỪ DB
--
-- CÁCH CHẠY: Supabase Dashboard -> SQL Editor -> dán toàn bộ file -> Run.
-- An toàn khi chạy lại (idempotent).
--
-- ══════════════════════════════════════════════════════════════════════════
-- 🔴 ĐỌC TRƯỚC KHI CHẠY — ĐÂY LÀ FILE DUY NHẤT TRONG CẢ GĐ 3 LÀM ĐỔI HÀNH VI
--
-- Mọi thứ trước đây chỉ dựng thêm chỗ chứa dữ liệu. File này khiến app của bé
-- **THÔI đọc file tĩnh trong bundle** và bắt đầu đọc từ DB.
--
-- ✅ ĐÃ CHUẨN BỊ GÌ TRƯỚC ĐÓ:
--    • 3a — nội dung đã nằm trong DB và đối chiếu từng bài: `--verify` báo
--      "khớp hoàn toàn — 362 bài, 1505 slide".
--    • 3a — 5 chương khai sai `totalLessons` trong file tĩnh đã bị bỏ khỏi DB, nên
--      DB là bản ĐÚNG hơn file tĩnh ở đúng 5 chỗ đó.
--    • 3b — đã nhìn thấy cây trong DB bằng mắt: `5 lớp · 41 chương · 362 bài`.
--    • 3c — sửa/publish/hoàn tác chạy được qua giao diện.
--    • 0010 — cột `age_range` đã bù, cây trong DB khớp cây file tĩnh từng khoá.
--    • Cổng `S-24` chứng minh: dựng cây từ hình dạng dòng DB cho ra cây **GIỐNG
--      HỆT** cây file tĩnh (so từng khoá, không chỉ đếm tổng).
--
-- 🔙 CÁCH TẮT (kill switch) — chạy lại một câu, KHÔNG cần build lại:
--
--      UPDATE public.app_config SET value = '"static"'::jsonb WHERE key = 'content_source';
--
--    App sẽ quay về file tĩnh ngay ở lần mở kế tiếp, VÀ tự xoá cache nội dung đã
--    tải (xem `xoaCache()` trong `client/src/data/contentSource.js`). Chỉ "không bật
--    thêm" là chưa đủ — máy nào đã tải cây từ DB rồi thì vẫn dùng cây đó, và công
--    tắc thành vô dụng. Đây là chỗ dễ hiểu sai nhất của cơ chế kill switch.
--
-- ⚠️ NẾU CẦN TẮT KHẨN CẤP: gạt công tắc về `static` trước, đừng sửa nội dung trước.
--    Tắt là việc mất 5 giây; sửa cho đúng có thể mất 10 phút, và suốt 10 phút đó
--    hàng trăm bé vẫn đang thấy bài lỗi.
-- ══════════════════════════════════════════════════════════════════════════

UPDATE public.app_config
   SET value = '"remote"'::jsonb,
       updated_at = NOW()
 WHERE key = 'content_source'
   AND value IS DISTINCT FROM '"remote"'::jsonb;

-- ⚠️ CỐ Ý KHÔNG tăng `content_version` ở đây.
--    Số đó dùng để máy bé biết "cache nội dung của mình đã cũ". Bật công tắc KHÔNG
--    làm nội dung đổi — nó chỉ đổi chỗ lấy nội dung. Máy chưa có cache sẽ tải; máy
--    đã có cache đúng phiên bản thì giữ nguyên, và giữ nguyên là ĐÚNG.


-- ====================================================================
-- KIỂM TRA SAU KHI CHẠY
--
-- 1. Công tắc đã bật:
--      SELECT key, value FROM public.app_config
--      WHERE key IN ('content_source','content_version') ORDER BY key;
--      -- Mong đợi: content_source = "remote"
--
-- 2. Khách (chưa đăng nhập) đọc được cây — BẮT BUỘC, nếu không thì chế độ Khách
--    không mở nổi danh sách lớp. Mở Console Ở APP CỦA BÉ (5173) khi đang là Khách:
--
--      const g = await __sb.from('content_grades').select('id,name,age_range');
--      const c = await __sb.from('content_chapters').select('id').limit(1000);
--      const l = await __sb.from('content_lessons').select('id,status').limit(1000);
--      console.log(g.data?.length, c.data?.length, l.data?.length, g.error, l.error);
--      -- Mong đợi: 5 · 41 · 362 · null · null
--
-- 3. 🔴 BÀI NHÁP vẫn KHÔNG lộ ra cho khách (đây là lý do chính phải kiểm lại sau
--    khi bật công tắc — cho tới giờ chưa ai đọc bảng này bằng quyền khách):
--
--      const d = await __sb.from('content_lessons').select('id').eq('status','draft');
--      console.log(d.data);
--      -- Mong đợi: [] (rỗng)
--
-- 4. Trên app của bé: mở một bài học, nội dung phải NHƯ CŨ. Xem thêm dòng log
--    `[nội dung] đọc từ DB: 5 lớp · 41 chương · 362 bài · 1505 slide · phiên bản N`
--    (chỉ hiện khi chạy `npm run dev`).
-- ====================================================================
