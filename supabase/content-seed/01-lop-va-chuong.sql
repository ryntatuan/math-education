-- SINH TỰ ĐỘNG bởi scripts/migrate-content.mjs — ĐỪNG SỬA TAY.
-- Chạy trong Supabase SQL Editor, theo thứ tự tên file.
-- Chạy lại được nhiều lần (ON CONFLICT … DO UPDATE) nên không sinh dòng trùng.

-- Lớp và chương

INSERT INTO public.content_grades (id, name, description, icon, color, sort_order)
VALUES
  (1, 'Lớp 1', 'Các số đến 100, phép cộng trừ trong phạm vi 10 và 100 (không nhớ), hình học, đo lường và thời gian', '🌱', '#4facfe', 0),
  (2, 'Lớp 2', 'Số đến 1000, cộng trừ có nhớ, phép nhân chia với bảng nhân 2 và 5, đo lường, hình học', '🌿', '#51CF66', 1),
  (3, 'Lớp 3', 'Số đến 100 000, bảng nhân chia 3–9, bốn phép tính, hình học, chu vi & diện tích, đo lường và thống kê', '🌸', '#FFE66D', 2),
  (4, 'Lớp 4', 'Số tự nhiên đến lớp triệu, bốn phép tính, phân số, hình bình hành, hình thoi, toán Tổng - Tỉ, Hiệu - Tỉ', '🌲', '#ec4899', 3),
  (5, 'Lớp 5', 'Phân số, số thập phân, tỉ số phần trăm, diện tích & thể tích hình khối, toán chuyển động đều', '🎓', '#6366f1', 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description,
  icon = EXCLUDED.icon, color = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order, updated_at = NOW();

INSERT INTO public.content_chapters
  (id, grade_id, name, description, icon, color, sort_order)
VALUES
  ('g1-c1', 1, 'Chủ đề 1: Các số từ 0 đến 10', 'Đếm, đọc, viết các số từ 0 đến 10; nhiều hơn, ít hơn, bằng nhau; so sánh số; tách và gộp số', '🔢', '#4facfe', 0),
  ('g1-c2', 1, 'Chủ đề 2: Làm quen với một số hình phẳng', 'Hình vuông, hình tròn, hình tam giác, hình chữ nhật; lắp ghép và xếp hình', '🔷', '#f6c23e', 1),
  ('g1-c3', 1, 'Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10', 'Phép cộng, phép trừ trong phạm vi 10; bảng cộng, bảng trừ; số 0 trong phép tính', '➕', '#ff8a65', 2),
  ('g1-c4', 1, 'Chủ đề 4: Làm quen với một số hình khối', 'Khối lập phương, khối hộp chữ nhật; vị trí và định hướng trong không gian', '🧊', '#8e7cc3', 3),
  ('g1-c5', 1, 'Chủ đề 5: Ôn tập học kì 1', 'Ôn tập các số trong phạm vi 10, phép cộng trừ trong phạm vi 10 và hình học', '📖', '#90be6d', 4),
  ('g1-c6', 1, 'Chủ đề 6: Các số đến 100', 'Số có hai chữ số, so sánh số có hai chữ số, bảng các số từ 1 đến 100', '💯', '#4361ee', 5),
  ('g1-c7', 1, 'Chủ đề 7: Độ dài và đo độ dài', 'Dài hơn ngắn hơn; đơn vị đo độ dài xăng-ti-mét; thực hành ước lượng và đo', '📏', '#ef476f', 6),
  ('g1-c8', 1, 'Chủ đề 8: Phép cộng, phép trừ (không nhớ) trong phạm vi 100', 'Cộng trừ số có hai chữ số với số có một chữ số và với số có hai chữ số — KHÔNG nhớ', '🔢', '#118ab2', 7),
  ('g1-c9', 1, 'Chủ đề 9: Thời gian. Giờ và lịch', 'Xem giờ đúng trên đồng hồ, các ngày trong tuần, thực hành xem lịch', '🕐', '#f4a261', 8),
  ('g1-c10', 1, 'Chủ đề 10: Ôn tập cuối năm', 'Ôn tập số và phép tính trong phạm vi 10 và 100, hình học, đo lường và thời gian', '🎓', '#06d6a0', 9),
  ('g2-c1', 2, 'Chủ đề 1: Ôn tập và bổ sung', 'Ôn tập số đến 100, tia số và số liền trước - liền sau, thành phần của phép cộng phép trừ, hơn kém nhau bao nhiêu', '🔄', '#4facfe', 0),
  ('g2-c2', 2, 'Chủ đề 2: Phép cộng, phép trừ trong phạm vi 20', 'Phép cộng, phép trừ qua 10; bảng cộng, bảng trừ qua 10; bài toán về thêm, bớt, nhiều hơn, ít hơn', '➕', '#f6c23e', 1),
  ('g2-c3', 2, 'Chủ đề 3: Làm quen với khối lượng, dung tích', 'Ki-lô-gam, lít và thực hành đo khối lượng, dung tích', '⚖️', '#38b6ff', 2),
  ('g2-c4', 2, 'Chủ đề 4: Phép cộng, phép trừ (có nhớ) trong phạm vi 100', 'Cộng trừ có nhớ số có hai chữ số với số có một chữ số và với số có hai chữ số', '🔢', '#ff8a65', 3),
  ('g2-c5', 2, 'Chủ đề 5: Làm quen với hình phẳng', 'Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc, hình tứ giác', '📐', '#8e7cc3', 4),
  ('g2-c6', 2, 'Chủ đề 6: Ngày - giờ, giờ - phút, ngày - tháng', 'Xem đồng hồ, xem lịch, ngày tháng và các ngày trong tuần', '🕐', '#f4a261', 5),
  ('g2-c7', 2, 'Chủ đề 7: Ôn tập học kì 1', 'Ôn tập phép cộng trừ trong phạm vi 20 và 100, hình phẳng, đo lường', '📖', '#90be6d', 6),
  ('g2-c8', 2, 'Chủ đề 8: Phép nhân, phép chia', 'Phép nhân, thừa số và tích, bảng nhân 2, bảng nhân 5, phép chia, số bị chia - số chia - thương, bảng chia 2, bảng chia 5', '✖️', '#e76f51', 7),
  ('g2-c9', 2, 'Chủ đề 9: Làm quen với hình khối', 'Khối trụ, khối cầu và nhận biết các vật có dạng khối trụ, khối cầu', '🥫', '#6a994e', 8),
  ('g2-c10', 2, 'Chủ đề 10: Các số trong phạm vi 1 000', 'Đơn vị, chục, trăm, nghìn; các số tròn trăm, tròn chục; số có ba chữ số; so sánh và viết số thành tổng', '💯', '#4361ee', 9),
  ('g2-c11', 2, 'Chủ đề 11: Độ dài và đơn vị đo độ dài. Tiền Việt Nam', 'Đề-xi-mét, mét, ki-lô-mét; giới thiệu tiền Việt Nam; thực hành đo độ dài', '📏', '#ef476f', 10),
  ('g2-c12', 2, 'Chủ đề 12: Phép cộng, phép trừ trong phạm vi 1 000', 'Cộng trừ không nhớ và có nhớ trong phạm vi 1 000', '🔢', '#118ab2', 11),
  ('g2-c13', 2, 'Chủ đề 13: Làm quen với yếu tố thống kê, xác suất', 'Thu thập, phân loại, kiểm đếm số liệu; biểu đồ tranh; chắc chắn, có thể, không thể', '📊', '#8338ec', 12),
  ('g2-c14', 2, 'Chủ đề 14: Ôn tập cuối năm', 'Ôn tập số trong phạm vi 1 000, bốn phép tính, hình học, đo lường, thống kê', '🎓', '#06d6a0', 13),
  ('g3-c1', 3, 'Chủ đề 1: Ôn tập và bổ sung', 'Ôn tập số đến 1 000, cộng trừ trong phạm vi 1 000, tìm thành phần chưa biết, ôn tập bảng nhân chia 2 và 5, bảng nhân chia 3 và 4', '🔄', '#4facfe', 0),
  ('g3-c2', 3, 'Chủ đề 2: Bảng nhân, bảng chia', 'Bảng nhân và bảng chia 6, 7, 8, 9; tìm thành phần trong phép nhân, phép chia; một phần mấy', '✖️', '#f6c23e', 1),
  ('g3-c3', 3, 'Chủ đề 3: Làm quen với hình phẳng, hình khối', 'Điểm ở giữa và trung điểm đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc và góc vuông; các hình phẳng; khối lập phương, khối hộp chữ nhật', '📐', '#ff8a65', 2),
  ('g3-c4', 3, 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100', 'Nhân số có hai chữ số với số có một chữ số; gấp một số lên nhiều lần; phép chia hết, phép chia có dư; giảm một số đi nhiều lần; bài toán giải bằng hai bước tính', '🔢', '#8e7cc3', 3),
  ('g3-c5', 3, 'Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ', 'Mi-li-mét, gam, mi-li-lít, nhiệt độ và đơn vị đo nhiệt độ (độ C)', '🌡️', '#90be6d', 4),
  ('g3-c6', 3, 'Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000', 'Nhân chia số có ba chữ số với số có một chữ số; biểu thức số; so sánh số lớn gấp mấy lần số bé', '🔢', '#4361ee', 5),
  ('g3-c7', 3, 'Chủ đề 7: Ôn tập học kì 1', 'Ôn tập phép nhân chia, biểu thức số, hình học và đo lường', '📖', '#ef476f', 6),
  ('g3-c8', 3, 'Chủ đề 8: Các số đến 10 000', 'Các số có bốn chữ số, số 10 000, so sánh số, chữ số La Mã, làm tròn số', '💯', '#118ab2', 7),
  ('g3-c9', 3, 'Chủ đề 9: Chu vi, diện tích một số hình phẳng', 'Chu vi hình tam giác, tứ giác, chữ nhật, vuông; diện tích của một hình; xăng-ti-mét vuông; diện tích hình chữ nhật và hình vuông', '📏', '#f4a261', 8),
  ('g3-c10', 3, 'Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000', 'Phép cộng, phép trừ trong phạm vi 10 000; nhân chia số có bốn chữ số với số có một chữ số', '➕', '#06d6a0', 9),
  ('g3-c11', 3, 'Chủ đề 11: Các số đến 100 000', 'Các số có năm chữ số, số 100 000, so sánh số, làm tròn số đến hàng nghìn và hàng chục nghìn', '🔢', '#e76f51', 10),
  ('g3-c12', 3, 'Chủ đề 12: Cộng, trừ trong phạm vi 100 000', 'Phép cộng, phép trừ trong phạm vi 100 000', '➖', '#6a994e', 11),
  ('g3-c13', 3, 'Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam', 'Xem đồng hồ, tháng và năm, thực hành xem lịch, giới thiệu tiền Việt Nam', '💵', '#8338ec', 12),
  ('g3-c14', 3, 'Chủ đề 14: Nhân, chia trong phạm vi 100 000', 'Nhân và chia số có năm chữ số cho số có một chữ số', '✖️', '#38b6ff', 13),
  ('g3-c15', 3, 'Chủ đề 15: Làm quen với yếu tố thống kê, xác suất', 'Thu thập, phân loại, ghi chép số liệu; bảng số liệu; khả năng xảy ra của một sự kiện', '📊', '#c77dff', 14),
  ('g3-c16', 3, 'Chủ đề 16: Ôn tập cuối năm', 'Ôn tập số, bốn phép tính, hình học, đo lường, bảng số liệu và khả năng xảy ra của một sự kiện', '🎓', '#ffd166', 15),
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
