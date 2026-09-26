// topics.js
// TÁCH RA TỪ: exerciseGenerator.js
// (di chuyển mã nguyên khối — không sửa nội dung)

export const TOPICS = {
  GRADE_1: [
    {
      id: "g1_count",
      name: "Các số từ 0 đến 10",
      icon: "🔢",
      chapter: "Chủ đề 1",
    },
    {
      id: "g1_compare",
      name: "So sánh số trong phạm vi 10 (>, <, =)",
      icon: "⚖️",
      chapter: "Chủ đề 1",
    },
    {
      id: "g1_shapes",
      name: "Hình phẳng: vuông, tròn, tam giác, chữ nhật",
      icon: "🔷",
      chapter: "Chủ đề 2",
    },
    {
      id: "g1_add_sub_10",
      name: "Cộng, trừ trong phạm vi 10",
      icon: "➕",
      chapter: "Chủ đề 3",
    },
    {
      id: "g1_shapes_3d",
      name: "Khối lập phương, khối hộp chữ nhật",
      icon: "📦",
      chapter: "Chủ đề 4",
    },
    {
      id: "g1_position",
      name: "Vị trí: trên – dưới, trước – sau, trái – phải",
      icon: "🧭",
      chapter: "Chủ đề 4",
    },
    {
      id: "g1_review_hk1",
      name: "Ôn tập học kì 1",
      icon: "📖",
      chapter: "Chủ đề 5",
    },
    {
      id: "g1_numbers_100",
      name: "Các số đến 100, chục và đơn vị",
      icon: "💯",
      chapter: "Chủ đề 6",
    },
    {
      id: "g1_compare_2digit",
      name: "So sánh số có hai chữ số",
      icon: "⚖️",
      chapter: "Chủ đề 6",
    },
    {
      id: "g1_length_cm",
      name: "Độ dài và đo độ dài (xăng-ti-mét)",
      icon: "📏",
      chapter: "Chủ đề 7",
    },
    {
      id: "g1_add_sub_100",
      name: "Cộng, trừ (không nhớ) trong phạm vi 100",
      icon: "🧮",
      chapter: "Chủ đề 8",
    },
    {
      id: "g1_time_clock",
      name: "Xem giờ đúng, các ngày trong tuần",
      icon: "⏰",
      chapter: "Chủ đề 9",
    },
    {
      id: "g1_final_review",
      name: "Ôn tập cuối năm Lớp 1",
      icon: "🏆",
      chapter: "Chủ đề 10",
    },
  ],
  GRADE_2: [
    {
      id: "g2_review_100",
      name: "Ôn tập số đến 100, tia số, liền trước – liền sau",
      icon: "🔙",
      chapter: "Chủ đề 1",
    },
    {
      id: "g2_components",
      name: "Thành phần của phép cộng, phép trừ",
      icon: "🔍",
      chapter: "Chủ đề 1",
    },
    {
      id: "g2_add_sub_20",
      name: "Cộng, trừ qua 10 trong phạm vi 20",
      icon: "➕",
      chapter: "Chủ đề 2",
    },
    {
      id: "g2_measure_weight",
      name: "Ki-lô-gam và lít",
      icon: "⚖️",
      chapter: "Chủ đề 3",
    },
    {
      id: "g2_add_sub_100",
      name: "Cộng, trừ (có nhớ) trong phạm vi 100",
      icon: "🧮",
      chapter: "Chủ đề 4",
    },
    {
      id: "g2_geometry",
      name: "Điểm, đoạn thẳng, đường gấp khúc, hình tứ giác",
      icon: "📐",
      chapter: "Chủ đề 5",
    },
    {
      id: "g2_time_calendar",
      name: "Ngày – giờ, giờ – phút, ngày – tháng",
      icon: "🕐",
      chapter: "Chủ đề 6",
    },
    {
      id: "g2_review_hk1",
      name: "Ôn tập học kì 1",
      icon: "📖",
      chapter: "Chủ đề 7",
    },
    {
      id: "g2_mul_2345",
      name: "Bảng nhân 2 và bảng nhân 5",
      icon: "✖️",
      chapter: "Chủ đề 8",
    },
    {
      id: "g2_div_2345",
      name: "Bảng chia 2 và bảng chia 5",
      icon: "➗",
      chapter: "Chủ đề 8",
    },
    {
      id: "g2_shapes_3d",
      name: "Khối trụ và khối cầu",
      icon: "🥫",
      chapter: "Chủ đề 9",
    },
    {
      id: "g2_numbers_1000",
      name: "Các số trong phạm vi 1 000",
      icon: "💯",
      chapter: "Chủ đề 10",
    },
    {
      id: "g2_measure",
      name: "Đề-xi-mét, mét, ki-lô-mét",
      icon: "📏",
      chapter: "Chủ đề 11",
    },
    {
      id: "g2_money",
      name: "Tiền Việt Nam",
      icon: "🪙",
      chapter: "Chủ đề 11",
    },
    {
      id: "g2_add_sub_1000",
      name: "Cộng, trừ trong phạm vi 1 000",
      icon: "🔢",
      chapter: "Chủ đề 12",
    },
    {
      id: "g2_stats_prob",
      name: "Biểu đồ tranh & khả năng xảy ra của sự kiện",
      icon: "📊",
      chapter: "Chủ đề 13",
    },
    {
      id: "g2_final_review",
      name: "Ôn tập cuối năm Lớp 2",
      icon: "🏆",
      chapter: "Chủ đề 14",
    },
  ],
  GRADE_3: [
    {
      id: "g3_review_1000",
      name: "Ôn tập số và cộng trừ trong phạm vi 1 000",
      icon: "🔙",
      chapter: "Chủ đề 1",
    },
    {
      id: "g3_mul_3_4",
      name: "Bảng nhân 3 và bảng nhân 4",
      icon: "✖️",
      chapter: "Chủ đề 1",
    },
    {
      id: "g3_div_3_4",
      name: "Bảng chia 3 và bảng chia 4",
      icon: "➗",
      chapter: "Chủ đề 1",
    },
    {
      id: "g3_mul_6789",
      name: "Bảng nhân 6, 7, 8, 9",
      icon: "✖️",
      chapter: "Chủ đề 2",
    },
    {
      id: "g3_div_6789",
      name: "Bảng chia 6, 7, 8, 9 và phép chia có dư",
      icon: "➗",
      chapter: "Chủ đề 2",
    },
    {
      id: "g3_fraction",
      name: "Một phần mấy (1/2, 1/3, 1/4…)",
      icon: "🍰",
      chapter: "Chủ đề 2",
    },
    {
      id: "g3_geometry_flat",
      name: "Trung điểm, hình tròn, góc và góc vuông",
      icon: "📐",
      chapter: "Chủ đề 3",
    },
    {
      id: "g3_mul_div_multi",
      name: "Nhân, chia số có hai, ba chữ số cho số có một chữ số",
      icon: "🧮",
      chapter: "Chủ đề 4",
    },
    {
      id: "g3_word_problems",
      name: "Bài toán giải bằng hai bước tính",
      icon: "💡",
      chapter: "Chủ đề 4",
    },
    {
      id: "g3_measure_units",
      name: "Mi-li-mét, gam, mi-li-lít, nhiệt độ (độ C)",
      icon: "🌡️",
      chapter: "Chủ đề 5",
    },
    {
      id: "g3_expressions",
      name: "Biểu thức số và thứ tự thực hiện phép tính",
      icon: "🔢",
      chapter: "Chủ đề 6",
    },
    {
      id: "g3_review_hk1",
      name: "Ôn tập học kì 1",
      icon: "📖",
      chapter: "Chủ đề 7",
    },
    {
      id: "g3_numbers_10k",
      name: "Các số đến 10 000",
      icon: "💯",
      chapter: "Chủ đề 8",
    },
    {
      id: "g3_roman",
      name: "Chữ số La Mã",
      icon: "🏛️",
      chapter: "Chủ đề 8",
    },
    {
      id: "g3_perimeter_area",
      name: "Chu vi, diện tích hình chữ nhật và hình vuông",
      icon: "📏",
      chapter: "Chủ đề 9",
    },
    {
      id: "g3_add_sub_10k",
      name: "Cộng, trừ trong phạm vi 10 000",
      icon: "➕",
      chapter: "Chủ đề 10",
    },
    {
      id: "g3_numbers_100k",
      name: "Các số đến 100 000",
      icon: "🔢",
      chapter: "Chủ đề 11",
    },
    {
      id: "g3_add_sub_100k",
      name: "Cộng, trừ trong phạm vi 100 000",
      icon: "➖",
      chapter: "Chủ đề 12",
    },
    {
      id: "g3_time_money",
      name: "Xem đồng hồ, tháng – năm, tiền Việt Nam",
      icon: "💵",
      chapter: "Chủ đề 13",
    },
    {
      id: "g3_mul_div_100k",
      name: "Nhân, chia số có năm chữ số cho số có một chữ số",
      icon: "✖️",
      chapter: "Chủ đề 14",
    },
    {
      id: "g3_stats_prob",
      name: "Bảng số liệu & khả năng xảy ra của sự kiện",
      icon: "📊",
      chapter: "Chủ đề 15",
    },
    {
      id: "g3_final_review",
      name: "Ôn tập cuối năm Lớp 3",
      icon: "🏆",
      chapter: "Chủ đề 16",
    },
  ],
  GRADE_4: [
    {
      id: "g4_numbers_million",
      name: "Số tự nhiên đến lớp triệu, hàng và lớp",
      icon: "🔢",
      chapter: "Chương 1",
    },
    {
      id: "g4_measures_stats",
      name: "Yến, tạ, tấn; giây, thế kỉ; trung bình cộng; biểu đồ cột",
      icon: "📊",
      chapter: "Chương 1",
    },
    {
      id: "g4_add_sub_natural",
      name: "Phép cộng, trừ số tự nhiên nhiều chữ số",
      icon: "➕",
      chapter: "Chương 2",
    },
    {
      id: "g4_geometry_angles",
      name: "Góc nhọn, góc tù, góc bẹt; vuông góc, song song",
      icon: "📐",
      chapter: "Chương 2",
    },
    {
      id: "g4_area_units",
      name: "Đề-xi-mét vuông và mét vuông",
      icon: "🟦",
      chapter: "Chương 2",
    },
    {
      id: "g4_mul_div_natural",
      name: "Nhân, chia số nhiều chữ số; nhân nhẩm với 11",
      icon: "✖️",
      chapter: "Chương 2",
    },
    {
      id: "g4_sum_diff",
      name: "Tìm hai số khi biết Tổng và Hiệu",
      icon: "⚖️",
      chapter: "Chương 2",
    },
    {
      id: "g4_divisibility",
      name: "Dấu hiệu chia hết cho 2, 5, 9, 3",
      icon: "🎯",
      chapter: "Chương 3",
    },
    {
      id: "g4_km2",
      name: "Ki-lô-mét vuông",
      icon: "🗺️",
      chapter: "Chương 3",
    },
    {
      id: "g4_geometry",
      name: "Diện tích hình bình hành và hình thoi",
      icon: "📐",
      chapter: "Chương 3",
    },
    {
      id: "g4_fractions_basic",
      name: "Phân số: rút gọn, quy đồng, so sánh",
      icon: "🍰",
      chapter: "Chương 4",
    },
    {
      id: "g4_fractions_calc",
      name: "Bốn phép tính với phân số (+, -, ×, ÷)",
      icon: "🧮",
      chapter: "Chương 4",
    },
    {
      id: "g4_sum_ratio",
      name: "Tìm hai số khi biết Tổng – Tỉ, Hiệu – Tỉ",
      icon: "💡",
      chapter: "Chương 5",
    },
    {
      id: "g4_map_scale",
      name: "Tỉ lệ bản đồ và ứng dụng",
      icon: "🗺️",
      chapter: "Chương 5",
    },
    {
      id: "g4_final_review",
      name: "Ôn tập cuối năm Lớp 4",
      icon: "🏆",
      chapter: "Chương 6",
    },
  ],
  GRADE_5: [
    {
      id: "g5_fractions_mixed",
      name: "Ôn tập phân số, hỗn số; toán tỉ lệ thuận – nghịch",
      icon: "🍰",
      chapter: "Chương 1",
    },
    {
      id: "g5_area_units",
      name: "Đề-ca-mét vuông, héc-tô-mét vuông, héc-ta",
      icon: "🟩",
      chapter: "Chương 1",
    },
    {
      id: "g5_decimals_basic",
      name: "Số thập phân: cấu tạo hàng, đổi đơn vị đo",
      icon: "🔢",
      chapter: "Chương 2",
    },
    {
      id: "g5_decimals_calc",
      name: "Cộng, trừ, nhân, chia số thập phân",
      icon: "🧮",
      chapter: "Chương 2",
    },
    {
      id: "g5_percentages",
      name: "Tỉ số phần trăm và ba bài toán tỉ số phần trăm",
      icon: "🏷️",
      chapter: "Chương 2",
    },
    {
      id: "g5_geometry_plane",
      name: "Diện tích hình tam giác, hình thang, hình tròn",
      icon: "📐",
      chapter: "Chương 3",
    },
    {
      id: "g5_geometry_solid",
      name: "Diện tích xung quanh, toàn phần và thể tích",
      icon: "📦",
      chapter: "Chương 3",
    },
    {
      id: "g5_charts_stats",
      name: "Biểu đồ hình quạt và đọc số liệu",
      icon: "📊",
      chapter: "Chương 3",
    },
    {
      id: "g5_time_units",
      name: "Đơn vị đo thời gian và phép tính thời gian",
      icon: "⏳",
      chapter: "Chương 4",
    },
    {
      id: "g5_motion_basic",
      name: "Vận tốc, quãng đường, thời gian",
      icon: "🏎️",
      chapter: "Chương 4",
    },
    {
      id: "g5_motion_advanced",
      name: "Hai chuyển động gặp nhau, đuổi kịp",
      icon: "🚀",
      chapter: "Chương 4",
    },
    {
      id: "g5_final_review",
      name: "Luyện đề chuyển cấp",
      icon: "🏆",
      chapter: "Chương 5",
    },
  ],
};

export const PRACTICE_EXTRA_TOPICS = {
  GRADE_1: [
    {
      id: "g1_dot_cards",
      name: "So sánh bằng thẻ chấm — bé chọn dấu",
      icon: "🎲",
      chapter: "Chủ đề 1",
    },
    {
      id: "g1_number_maze",
      name: "Mê cung số (đến 20) — bé tự nối đường về nhà",
      icon: "🏫",
      chapter: "Chủ đề 1",
    },
  ],
  GRADE_2: [
    {
      id: "g2_number_maze",
      name: "Mê cung số (đến 99) — bé tự nối đường về nhà",
      icon: "🏫",
      chapter: "Chủ đề 1",
    },
  ],
  GRADE_3: [
    {
      id: "g3_number_maze",
      name: "Mê cung số (đến 99) — bé tự nối đường về nhà",
      icon: "🏫",
      chapter: "Chủ đề 1",
    },
  ],
  GRADE_4: [
    {
      id: "g4_number_maze",
      name: "Mê cung số (đến 99) — bé tự nối đường về nhà",
      icon: "🏫",
      chapter: "Chương 1",
    },
  ],
  GRADE_5: [
    {
      id: "g5_number_maze",
      name: "Mê cung số (đến 99) — bé tự nối đường về nhà",
      icon: "🏫",
      chapter: "Chương 1",
    },
  ],
};

export const MAZE_MAX = { 1: 20, 2: 99, 3: 99, 4: 99, 5: 99 };

export const EMOJIS = ["🍎", "🍊", "⭐", "🎈", "🚗", "🐱", "🐶", "🌸", "🍭", "⚽"];

export const CALC_OP = { "+": "add", "-": "sub", "×": "mul", ":": "div" };
