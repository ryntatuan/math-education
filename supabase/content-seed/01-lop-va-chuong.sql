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
  (5, 'Lớp 5', 'Số tự nhiên, phân số, số thập phân; các phép tính với số thập phân; hình phẳng, hình khối; tỉ số phần trăm; chuyển động đều; thống kê và xác suất', '🎓', '#6366f1', 4)
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
  ('g4-c1', 4, 'Chủ đề 1: Ôn tập và bổ sung', 'Ôn lại số đến 100 000 và bốn phép tính trong phạm vi 100 000; số chẵn – số lẻ; biểu thức chữ; giải bài toán có ba bước tính', '🔢', '#3b82f6', 0),
  ('g4-c2', 4, 'Chủ đề 2: Góc và đơn vị đo góc', 'Làm quen với độ (đơn vị đo góc), cách đo góc bằng thước đo góc; nhận biết góc nhọn, góc vuông, góc tù, góc bẹt', '📐', '#0ea5e9', 1),
  ('g4-c3', 4, 'Chủ đề 3: Số có nhiều chữ số', 'Số có sáu chữ số, số 1 000 000; hàng và lớp; các số trong phạm vi lớp triệu; làm tròn số đến hàng trăm nghìn; so sánh số có nhiều chữ số; dãy số tự nhiên', '🔢', '#8b5cf6', 2),
  ('g4-c4', 4, 'Chủ đề 4: Một số đơn vị đo đại lượng', 'Đơn vị đo khối lượng yến, tạ, tấn; đơn vị đo diện tích đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây và thế kỉ', '⚖️', '#22c55e', 3),
  ('g4-c5', 4, 'Chủ đề 5: Phép cộng và phép trừ', 'Cộng, trừ các số có nhiều chữ số; tính chất giao hoán và kết hợp của phép cộng; tìm hai số biết tổng và hiệu của hai số đó', '➕', '#f59e0b', 4),
  ('g4-c6', 4, 'Chủ đề 6: Đường thẳng vuông góc. Đường thẳng song song', 'Hai đường thẳng vuông góc, hai đường thẳng song song, cách vẽ bằng ê-ke; hình bình hành và hình thoi với các cạnh đối diện song song', '📏', '#ef4444', 5),
  ('g4-c7', 4, 'Chủ đề 7: Ôn tập học kì 1', 'Ôn tập số tự nhiên, bốn phép tính, hình học, đo lường và yếu tố thống kê đã học trong học kì 1', '📚', '#6366f1', 6),
  ('g4-c8', 4, 'Chủ đề 8: Phép nhân và phép chia', 'Nhân, chia với số có một, hai chữ số; tính chất giao hoán, kết hợp, phân phối của phép nhân; nhân chia với 10, 100, 1000; ước lượng; số trung bình cộng; bài toán rút về đơn vị', '✖️', '#0ea5e9', 7),
  ('g4-c9', 4, 'Chủ đề 9: Làm quen với yếu tố thống kê, xác suất', 'Dãy số liệu thống kê, biểu đồ cột, số lần xuất hiện của một sự kiện', '📊', '#8b5cf6', 8),
  ('g4-c10', 4, 'Chủ đề 10: Phân số', 'Khái niệm phân số, phân số và phép chia số tự nhiên, tính chất cơ bản của phân số, rút gọn, quy đồng mẫu số và so sánh phân số', '🍕', '#f97316', 9),
  ('g4-c11', 4, 'Chủ đề 11: Phép cộng, phép trừ phân số', 'Cộng, trừ hai phân số cùng mẫu số và khác mẫu số; tìm thành phần chưa biết', '➕', '#ec4899', 10),
  ('g4-c12', 4, 'Chủ đề 12: Phép nhân, phép chia phân số', 'Nhân, chia hai phân số; tìm phân số của một số và luyện tập chung', '✖️', '#06b6d4', 11),
  ('g4-c13', 4, 'Chủ đề 13: Ôn tập cuối năm', 'Ôn tập số tự nhiên, các phép tính, phân số, hình học, đo lường và thống kê – xác suất', '🎓', '#22c55e', 12),
  ('g5-c1', 5, 'Chủ đề 1: Ôn tập và bổ sung', 'Ôn tập số tự nhiên, các phép tính, phân số; phân số thập phân, hỗn số; cộng trừ hai phân số; ôn tập hình học và đo lường', '🔄', '#6366f1', 0),
  ('g5-c2', 5, 'Chủ đề 2: Số thập phân', 'Khái niệm số thập phân, so sánh số thập phân, viết số đo đại lượng dưới dạng số thập phân, làm tròn số thập phân', '🔢', '#0ea5e9', 1),
  ('g5-c3', 5, 'Chủ đề 3: Một số đơn vị đo diện tích', 'Ki-lô-mét vuông, héc-ta và các đơn vị đo diện tích; thực hành, trải nghiệm với đơn vị đo đại lượng', '🗺️', '#14b8a6', 2),
  ('g5-c4', 5, 'Chủ đề 4: Các phép tính với số thập phân', 'Cộng, trừ, nhân, chia số thập phân; nhân chia với 10, 100, 1 000 và với 0,1; 0,01; 0,001', '🧮', '#f59e0b', 3),
  ('g5-c5', 5, 'Chủ đề 5: Một số hình phẳng. Chu vi và diện tích', 'Hình tam giác, hình thang, đường tròn; diện tích hình tam giác, hình thang, chu vi và diện tích hình tròn; thực hành đo, vẽ, lắp ghép', '📐', '#3b82f6', 4),
  ('g5-c6', 5, 'Chủ đề 6: Ôn tập học kì 1', 'Ôn tập số thập phân, các phép tính với số thập phân, hình phẳng, diện tích – chu vi và đo lường', '📚', '#a855f7', 5),
  ('g5-c7', 5, 'Chủ đề 7: Tỉ số và các bài toán liên quan', 'Tỉ số, tỉ số phần trăm, tỉ lệ bản đồ, tìm hai số khi biết tổng (hiệu) và tỉ số, tìm giá trị phần trăm của một số, máy tính cầm tay', '％', '#ef4444', 6),
  ('g5-c8', 5, 'Chủ đề 8: Thể tích. Đơn vị đo thể tích', 'Thể tích của một hình; xăng-ti-mét khối, đề-xi-mét khối, mét khối và quan hệ giữa các đơn vị', '🧊', '#0891b2', 7),
  ('g5-c9', 5, 'Chủ đề 9: Diện tích và thể tích của một số hình khối', 'Hình khai triển; diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật và hình lập phương; thể tích của hai hình đó', '📦', '#7c3aed', 8),
  ('g5-c10', 5, 'Chủ đề 10: Số đo thời gian, vận tốc. Các bài toán liên quan đến chuyển động đều', 'Các đơn vị đo thời gian; cộng, trừ, nhân, chia số đo thời gian; vận tốc, quãng đường, thời gian của chuyển động đều', '🚗', '#ea580c', 9),
  ('g5-c11', 5, 'Chủ đề 11: Một số yếu tố thống kê và xác suất', 'Thu thập, phân loại, sắp xếp số liệu; biểu đồ hình quạt tròn; tỉ số của số lần lặp lại một sự kiện', '📊', '#0d9488', 10),
  ('g5-c12', 5, 'Chủ đề 12: Ôn tập cuối năm', 'Ôn tập số tự nhiên, phân số, số thập phân; các phép tính; tỉ số, tỉ số phần trăm; hình học; đo lường; toán chuyển động đều; thống kê và xác suất', '🎓', '#6366f1', 11)
ON CONFLICT (id) DO UPDATE SET
  grade_id = EXCLUDED.grade_id, name = EXCLUDED.name,
  description = EXCLUDED.description, icon = EXCLUDED.icon,
  color = EXCLUDED.color, sort_order = EXCLUDED.sort_order,
  updated_at = NOW();
