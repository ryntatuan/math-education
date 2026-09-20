-- SINH TỰ ĐỘNG bởi scripts/migrate-content.mjs — ĐỪNG SỬA TAY.
-- Chạy trong Supabase SQL Editor, theo thứ tự tên file.
-- Chạy lại được nhiều lần (ON CONFLICT … DO UPDATE) nên không sinh dòng trùng.

-- Lớp và chương

INSERT INTO public.content_grades (id, name, description, icon, color, sort_order)
VALUES
  (1, 'Lớp 1', 'Các số đến 100, phép cộng trừ, hình học & đo lường cơ bản', '🌱', '#4facfe', 0),
  (2, 'Lớp 2', 'Số đến 1000, phép cộng trừ có nhớ, bảng nhân & chia 2, 3, 4, 5', '🌿', '#51CF66', 1),
  (3, 'Lớp 3', 'Số đến 100.000, bảng nhân chia 6-9, phân số, chu vi & diện tích', '🌸', '#FFE66D', 2),
  (4, 'Lớp 4', 'Số tự nhiên đến lớp triệu, bốn phép tính, phân số, hình bình hành, hình thoi, toán Tổng - Tỉ, Hiệu - Tỉ', '🌲', '#ec4899', 3),
  (5, 'Lớp 5', 'Phân số, số thập phân, tỉ số phần trăm, diện tích & thể tích hình khối, toán chuyển động đều', '🎓', '#6366f1', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  icon = EXCLUDED.icon, color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order, updated_at = NOW();

INSERT INTO public.content_chapters
  (id, grade_id, name, description, icon, color, sort_order)
VALUES
  ('g1-c1', 1, 'Chủ đề 1: Các số từ 0 đến 10', 'Đếm, đọc, viết số từ 0 đến 10, so sánh các số và tách gộp', '🔢', '#4facfe', 0),
  ('g1-c2', 1, 'Chủ đề 2: Phép cộng, phép trừ trong phạm vi 10', 'Ý nghĩa phép cộng (gộp), phép trừ (bớt) và bảng tính trong phạm vi 10', '➕', '#10b981', 1),
  ('g1-c3', 1, 'Chủ đề 3: Các số trong phạm vi 20', 'Số từ 11 đến 20, khái niệm chục và đơn vị, so sánh và thứ tự dãy số', '🌱', '#0284c7', 2),
  ('g1-c4', 1, 'Chủ đề 4: Phép cộng, phép trừ trong phạm vi 20', 'Phép cộng không nhớ và qua 10, phép trừ không nhớ và qua 10 trong phạm vi 20', '✨', '#ec4899', 3),
  ('g1-c5', 1, 'Chủ đề 5: Các số đến 100 & So sánh số', 'Số tròn chục, đọc viết số đến 100, bảng 100 số và cấu tạo số chục đơn vị', '💯', '#f59e0b', 4),
  ('g1-c6', 1, 'Chủ đề 6: Làm quen với một số hình phẳng & Đo độ dài', 'Hình vuông, hình tròn, tam giác, chữ nhật, thước kẻ cm và xem giờ đúng', '📐', '#8b5cf6', 5),
  ('g1-c7', 1, 'Chủ đề 7: Phép cộng, phép trừ (không nhớ) trong phạm vi 100', 'Cộng trừ số tròn chục và cộng trừ số có hai chữ số dạng đặt tính rồi tính', '🧮', '#059669', 6),
  ('g1-c8', 1, 'Chủ đề 8: Thời gian, giờ và lịch tuần lễ', 'Cấu tạo mặt đồng hồ, kim ngắn chỉ giờ, kim dài chỉ phút, xem giờ đúng và dòng thời gian', '⏱️', '#f59e0b', 7),
  ('g1-c9', 1, 'Chủ đề 9: Làm quen với một số hình khối & Xếp hình', 'Khối lập phương, khối hộp chữ nhật và ghép hình không gian', '📦', '#10b981', 8),
  ('g1-c10', 1, 'Chủ đề 10: Ôn tập cuối năm Lớp 1', 'Tổng kết toàn bộ kiến thức số học, hình học, đo lường và vinh danh Trạng Nguyên', '🏆', '#ec4899', 9),
  ('g2-c1', 2, 'Chủ đề 1: Ôn tập & Bổ sung (Tia số, Số liền trước - liền sau)', 'Ôn tập số học lớp 1, tia số, cộng trừ không nhớ trong phạm vi 100', '🔄', '#4facfe', 0),
  ('g2-c2', 2, 'Chủ đề 2: Phép cộng, phép trừ (có nhớ) trong phạm vi 100', 'Cộng có nhớ và trừ có mượn trong phạm vi 100', '🧮', '#FF6B6B', 1),
  ('g2-c3', 2, 'Chủ đề 3: Phép nhân & Bảng nhân 2, 3, 4, 5', 'Ý nghĩa phép nhân và học thuộc bảng nhân 2, 3, 4, 5', '✖️', '#FFE66D', 2),
  ('g2-c4', 2, 'Chủ đề 4: Phép chia & Bảng chia 2, 3, 4, 5', 'Làm quen phép chia, bảng chia và phân số một phần mấy', '➗', '#4facfe', 3),
  ('g2-c5', 2, 'Chủ đề 5: Các số trong phạm vi 1 000', 'Đơn vị, chục, trăm và số có 3 chữ số', '🏢', '#51CF66', 4),
  ('g2-c6', 2, 'Chủ đề 6: Khối lượng, dung tích & Đo độ dài (kg, lít, dm, m, km)', 'Các đơn vị đo độ dài, khối lượng và dung tích thực tế', '📏', '#FFE66D', 5),
  ('g2-c7', 2, 'Chủ đề 7: Hình phẳng & Hình khối (Đường gấp khúc, tứ giác, trụ, cầu)', 'Đường gấp khúc, hình tứ giác và bài toán thực tế', '📐', '#4ECDC4', 6),
  ('g2-c8', 2, 'Chủ đề 8: Phép cộng, phép trừ trong phạm vi 1 000', 'Cộng trừ các số có 3 chữ số có nhớ một lần', '🧮', '#06b6d4', 7),
  ('g2-c9', 2, 'Chủ đề 9: Làm quen với thống kê & xác suất (Biểu đồ tranh, khả năng xảy ra)', 'Làm quen bảng số liệu, phân loại đối tượng và biểu đồ tranh', '📊', '#f59e0b', 8),
  ('g2-c10', 2, 'Chủ đề 10: Ôn tập cuối năm Lớp 2', 'Tổng hợp toàn diện kiến thức Lớp 2, sẵn sàng bước vào Lớp 3', '🏆', '#eab308', 9),
  ('g3-c1', 3, 'Chủ đề 1: Ôn tập & Bổ sung (Số đến 1 000 & 10 000)', 'Mở rộng số có 4 chữ số: Hàng nghìn, trăm, chục, đơn vị', '🔢', '#4facfe', 0),
  ('g3-c2', 3, 'Chủ đề 2: Bảng nhân 6, 7, 8, 9 & Một phần mấy', 'Chinh phục toàn bộ bảng cửu chương nâng cao', '✖️', '#51CF66', 1),
  ('g3-c3', 3, 'Chủ đề 3: Bảng chia 6, 7, 8, 9 & Phép chia có dư', 'Phép chia hết và quy tắc phép chia có dư', '➗', '#FFE66D', 2),
  ('g3-c4', 3, 'Chủ đề 4: Các số đến 100 000 & Chữ số La Mã', 'Số có 5 chữ số: Hàng chục nghìn đến hàng trăm nghìn', '💯', '#FF6B6B', 3),
  ('g3-c5', 3, 'Chủ đề 5: Khái niệm phân số & Biểu thức số', 'Khái niệm phân số, tử số, mẫu số và so sánh phân số', '🍰', '#4facfe', 4),
  ('g3-c6', 3, 'Chủ đề 6: Chu vi & Diện tích một số hình phẳng (cm²)', 'Góc vuông, chu vi và diện tích hình chữ nhật, hình vuông', '📐', '#51CF66', 5),
  ('g3-c7', 3, 'Chủ đề 7: Đo lường (mm, gam, ml, °C) & Tiền Việt Nam', 'Đơn vị gam, ml, nhiệt độ và các mệnh giá tiền Việt Nam', '🪙', '#FFE66D', 6),
  ('g3-c8', 3, 'Chủ đề 8: Giải bài toán bằng hai bước tính', 'Phân tích đề bài, tìm đại lượng trung gian và tổng kết', '📝', '#FF6B6B', 7),
  ('g3-c9', 3, 'Chủ đề 9: Thống kê số liệu & Khả năng xảy ra của sự kiện', 'Đọc bảng số liệu, khả năng chắc chắn, có thể, không thể', '🎲', '#f59e0b', 8),
  ('g3-c10', 3, 'Chủ đề 10: Ôn tập cuối năm Lớp 3', 'Tổng hợp toàn diện kiến thức Lớp 3, vững bước bước vào Lớp 4', '🏆', '#eab308', 9),
  ('g4-c1', 4, 'Chương 1: Số tự nhiên & Bảng đơn vị đo khối lượng', 'Đọc, viết, so sánh số có nhiều chữ số đến lớp triệu; bảng khối lượng yến, tạ, tấn; giây, thế kỉ, trung bình cộng, biểu đồ cột', '🔢', '#3b82f6', 0),
  ('g4-c2', 4, 'Chương 2: Bốn phép tính số tự nhiên & Hình học', 'Cộng, trừ số nhiều chữ số; tính chất phép tính; toán Tổng - Hiệu; góc nhọn, tù, bẹt; vuông góc, song song; nhân chia số nhiều chữ số', '🧮', '#10b981', 1),
  ('g4-c3', 4, 'Chương 3: Dấu hiệu chia hết & Hình bình hành', 'Dấu hiệu chia hết cho 2, 5, 9, 3; đơn vị km²; hình bình hành và tính diện tích', '📐', '#f59e0b', 2),
  ('g4-c4', 4, 'Chương 4: Phân số, Bốn phép tính phân số & Hình thoi', 'Khái niệm phân số, rút gọn, quy đồng; cộng, trừ, nhân, chia phân số; tìm phân số của một số; hình thoi và diện tích hình thoi', '🍰', '#8b5cf6', 3),
  ('g4-c5', 4, 'Chương 5: Tỉ số, Toán Tổng - Tỉ, Hiệu - Tỉ & Bản đồ', 'Khái niệm tỉ số; bài toán Tìm hai số khi biết Tổng và Tỉ số, Hiệu và Tỉ số; tỉ lệ bản đồ và ứng dụng', '📊', '#ec4899', 4),
  ('g4-c6', 4, 'Chương 6: Ôn tập cuối năm', 'Hệ thống hóa toàn bộ kiến thức Toán lớp 4: Số tự nhiên, 4 phép tính, phân số, hình học, các bài toán có lời văn điển hình', '🏆', '#6366f1', 5),
  ('g5-c1', 5, 'Chương 1: Ôn tập phân số, Giải toán tỉ lệ & Bảng đơn vị diện tích', 'Ôn tập phân số, phân số thập phân, hỗn số; giải toán tỉ lệ thuận/nghịch; bảng đơn vị đo diện tích dam², hm², ha', '🍰', '#3b82f6', 0),
  ('g5-c2', 5, 'Chương 2: Số thập phân & Các phép tính số thập phân', 'Khái niệm, các hàng của số thập phân; cộng, trừ, nhân, chia số thập phân; tỉ số phần trăm và 3 bài toán tỉ số %', '🔢', '#10b981', 1),
  ('g5-c3', 5, 'Chương 3: Hình học & Thể tích hình khối', 'Diện tích hình tam giác, hình thang; chu vi & diện tích hình tròn; diện tích xung quanh, toàn phần và thể tích hình hộp chữ nhật, lập phương', '📐', '#f59e0b', 2),
  ('g5-c4', 5, 'Chương 4: Số đo thời gian & Toán chuyển động đều', 'Bảng đơn vị đo thời gian, phép tính thời gian; toán chuyển động đều: vận tốc, quãng đường, thời gian; hai chuyển động ngược chiều, cùng chiều', '🏎️', '#ec4899', 3),
  ('g5-c5', 5, 'Chương 5: Ôn tập cuối năm & Luyện thi chuyển cấp', 'Tổng ôn tập toàn bộ chương trình Toán tiểu học: Số học, hình học phẳng & khối, toán chuyển động, toán phần trăm', '🏆', '#6366f1', 4)
ON CONFLICT (id) DO UPDATE SET
  grade_id = EXCLUDED.grade_id, name = EXCLUDED.name,
  description = EXCLUDED.description, icon = EXCLUDED.icon,
  color = EXCLUDED.color, sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
