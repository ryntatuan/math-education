// Dynamic Exercise Generator for Grades 1, 2, 3, 4, 5
// Aligned 100% with Vietnam Primary Education Curriculum (SGK Chuan Bo Giao Duc)
import React from "react";

export const renderShapeVisual = (shapeType, params = {}) => {
  if (shapeType === "circle") {
    return React.createElement(
      "svg",
      {
        width: 90,
        height: 90,
        viewBox: "0 0 90 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("circle", {
        cx: 45,
        cy: 45,
        r: 38,
        fill: "#FF6B6B",
        stroke: "#C92A2A",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "square") {
    return React.createElement(
      "svg",
      {
        width: 90,
        height: 90,
        viewBox: "0 0 90 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 8,
        y: 8,
        width: 74,
        height: 74,
        rx: 6,
        fill: "#4DABF7",
        stroke: "#1864AB",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "rectangle") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 8,
        y: 12,
        width: 144,
        height: 66,
        rx: 6,
        fill: "#51CF66",
        stroke: "#2B8A3E",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "triangle") {
    return React.createElement(
      "svg",
      {
        width: 100,
        height: 90,
        viewBox: "0 0 100 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "50,8 92,80 8,80",
        fill: "#FFA94D",
        stroke: "#D9480F",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
    );
  }
  if (shapeType === "parallelogram") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "35,12 150,12 125,78 10,78",
        fill: "#E599F7",
        stroke: "#862E9C",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 35,
        y1: 12,
        x2: 35,
        y2: 78,
        stroke: "#495057",
        strokeWidth: 2,
        strokeDasharray: "4,4",
      }),
      React.createElement(
        "text",
        { x: 40, y: 50, fill: "#862E9C", fontSize: "13", fontWeight: "bold" },
        "h",
      ),
      React.createElement(
        "text",
        { x: 65, y: 88, fill: "#862E9C", fontSize: "13", fontWeight: "bold" },
        "a (đáy)",
      ),
    );
  }
  if (shapeType === "rhombus") {
    return React.createElement(
      "svg",
      {
        width: 120,
        height: 100,
        viewBox: "0 0 120 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "60,8 112,50 60,92 8,50",
        fill: "#63E6BE",
        stroke: "#0CA678",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 60,
        y1: 8,
        x2: 60,
        y2: 92,
        stroke: "#087F5B",
        strokeWidth: 2,
        strokeDasharray: "3,3",
      }),
      React.createElement("line", {
        x1: 8,
        y1: 50,
        x2: 112,
        y2: 50,
        stroke: "#087F5B",
        strokeWidth: 2,
        strokeDasharray: "3,3",
      }),
    );
  }
  if (shapeType === "trapezoid") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "40,15 120,15 150,78 10,78",
        fill: "#FFD43B",
        stroke: "#F59F00",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 40,
        y1: 15,
        x2: 40,
        y2: 78,
        stroke: "#495057",
        strokeWidth: 2,
        strokeDasharray: "4,4",
      }),
      React.createElement(
        "text",
        { x: 70, y: 12, fill: "#E67700", fontSize: "12", fontWeight: "bold" },
        "b (đáy bé)",
      ),
      React.createElement(
        "text",
        { x: 65, y: 88, fill: "#E67700", fontSize: "12", fontWeight: "bold" },
        "a (đáy lớn)",
      ),
      React.createElement(
        "text",
        { x: 44, y: 50, fill: "#495057", fontSize: "12", fontWeight: "bold" },
        "h",
      ),
    );
  }
  if (shapeType === "circle_r") {
    return React.createElement(
      "svg",
      {
        width: 100,
        height: 100,
        viewBox: "0 0 100 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("circle", {
        cx: 50,
        cy: 50,
        r: 42,
        fill: "#EBFBEE",
        stroke: "#40C057",
        strokeWidth: 4,
      }),
      React.createElement("circle", { cx: 50, cy: 50, r: 3, fill: "#2B8A3E" }),
      React.createElement("line", {
        x1: 50,
        y1: 50,
        x2: 92,
        y2: 50,
        stroke: "#2B8A3E",
        strokeWidth: 3,
      }),
      React.createElement(
        "text",
        { x: 42, y: 46, fill: "#2B8A3E", fontSize: "12", fontWeight: "bold" },
        "O",
      ),
      React.createElement(
        "text",
        { x: 66, y: 44, fill: "#2B8A3E", fontSize: "13", fontWeight: "bold" },
        "r",
      ),
    );
  }
  if (shapeType === "cuboid") {
    return React.createElement(
      "svg",
      {
        width: 130,
        height: 100,
        viewBox: "0 0 130 100",
        style: { display: "block", margin: "auto" },
      },
      // Front face
      React.createElement("rect", {
        x: 15,
        y: 35,
        width: 75,
        height: 50,
        fill: "#A5D8FF",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
      // Top face
      React.createElement("polygon", {
        points: "15,35 45,10 120,10 90,35",
        fill: "#D0EBFF",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
      // Side face
      React.createElement("polygon", {
        points: "90,35 120,10 120,60 90,85",
        fill: "#74C0FC",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
    );
  }
  if (shapeType === "cube") {
    return React.createElement(
      "svg",
      {
        width: 110,
        height: 100,
        viewBox: "0 0 110 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 15,
        y: 35,
        width: 55,
        height: 55,
        fill: "#FFD8A8",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
      React.createElement("polygon", {
        points: "15,35 40,12 95,12 70,35",
        fill: "#FFE8CC",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
      React.createElement("polygon", {
        points: "70,35 95,12 95,67 70,90",
        fill: "#FFA94D",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
    );
  }
  return null;
};

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

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateOptions(correctAnswer, range = 5, isString = false) {
  if (isString) {
    return [correctAnswer];
  }
  const options = new Set([correctAnswer]);
  let attempts = 0;
  const maxRange = Math.max(range, 3);
  while (options.size < 4 && attempts < 60) {
    attempts++;
    const delta = randInt(-maxRange, maxRange);
    const val = correctAnswer + delta;
    if (val >= 0 && val !== correctAnswer) {
      options.add(val);
    }
  }
  let fallback = Math.max(0, correctAnswer - 3);
  while (options.size < 4) {
    if (fallback !== correctAnswer && !options.has(fallback)) {
      options.add(fallback);
    }
    fallback++;
  }
  return shuffle(Array.from(options));
}

const EMOJIS = ["🍎", "🍊", "⭐", "🎈", "🚗", "🐱", "🐶", "🌸", "🍭", "⚽"];

/**
 * Rút ngẫu nhiên một khuôn khác RỒI sinh câu từ khuôn đó.
 *
 * Dùng cho hai việc:
 *  1. Các chủ đề "Ôn tập …" — ôn tập nghĩa là trộn kiến thức cả lớp, chứ không phải
 *     một dạng câu riêng. Trước đây các chủ đề này KHÔNG có nhánh `if` nên rơi xuống
 *     câu dự phòng cố định ⇒ bé nhận đúng một câu lặp lại mãi.
 *  2. Lưới an toàn cuối cùng của `buildQuestion` (xem cuối hàm).
 *
 * `depth` chặn đệ quy vô hạn: nếu cả lớp đều thiếu nhánh `if` thì vẫn phải dừng.
 */
function pickFromGrade(grade, topicIds, depth = 0) {
  const ids = topicIds?.length
    ? topicIds
    : (TOPICS[`GRADE_${grade}`] || TOPICS.GRADE_1).map((t) => t.id);
  return buildQuestion(grade, ids[randInt(0, ids.length - 1)], depth);
}

function buildQuestion(grade = 1, topicId = null, depth = 0) {
  const gNum = Number(grade);
  let topic = topicId;
  if (!topic) {
    const topicArr = TOPICS[`GRADE_${gNum}`] || TOPICS.GRADE_1;
    topic = topicArr[randInt(0, topicArr.length - 1)].id;
  }

  // ==========================================
  // --- GRADE 1 GENERATORS ---
  // ==========================================
  if (topic === "g1_count") {
    const count = randInt(1, 15);
    const emoji = EMOJIS[randInt(0, EMOJIS.length - 1)];
    const icons = Array(count).fill(emoji).join(" ");
    return {
      question: `Có bao nhiêu ${emoji} ở hình dưới?`,
      visualDisplay: icons,
      options: generateOptions(count, 3),
      answer: count,
      hint: "Hãy chạm tay đếm từng hình một nhé!",
      explanation: `Đếm được tất cả ${count} hình ${emoji}.`,
    };
  }

  if (topic === "g1_add_sub_10") {
    const isAdd = Math.random() > 0.4;
    if (isAdd) {
      const a = randInt(1, 7);
      const b = randInt(1, 10 - a);
      const ans = a + b;
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Bắt đầu từ ${a}, đếm thêm ${b} bước nhé!`,
        explanation: `${a} + ${b} = ${ans}.`,
      };
    } else {
      const a = randInt(2, 10);
      const b = randInt(1, a);
      const ans = a - b;
      return {
        question: `Tính nhẩm: ${a} - ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Có ${a}, bớt đi ${b} còn lại mấy?`,
        explanation: `${a} - ${b} = ${ans}.`,
      };
    }
  }

  if (topic === "g1_compare") {
    const a = randInt(0, 20);
    let b = randInt(0, 20);
    if (Math.random() < 0.25) b = a;
    let ans = "=";
    if (a > b) ans = ">";
    if (a < b) ans = "<";
    return {
      question: `Điền dấu thích hợp vào chỗ trống: ${a} ... ${b}`,
      options: [">", "<", "="],
      answer: ans,
      hint: "Mũi tên nhọn luôn chĩa về phía số bé hơn!",
      explanation: `${a} ${ans} ${b}.`,
    };
  }

  if (topic === "g1_add_sub_20") {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = randInt(6, 12);
      const b = randInt(2, 20 - a);
      const ans = a + b;
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 4),
        answer: ans,
        hint: `Tách số hoặc đếm thêm: ${a} + ${b} = ${ans}!`,
        explanation: `${a} + ${b} = ${ans}.`,
      };
    } else {
      const a = randInt(11, 20);
      const b = randInt(2, a - 1);
      const ans = a - b;
      return {
        question: `Tính nhẩm: ${a} - ${b} = ?`,
        options: generateOptions(ans, 4),
        answer: ans,
        hint: `Lấy ${a} trừ đi ${b} bằng bao nhiêu?`,
        explanation: `${a} - ${b} = ${ans}.`,
      };
    }
  }

  if (topic === "g1_numbers_100") {
    const chuc = randInt(2, 9);
    const donVi = randInt(0, 9);
    const num = chuc * 10 + donVi;
    return {
      question: `Số gồm ${chuc} chục và ${donVi} đơn vị là số nào?`,
      options: generateOptions(num, 10),
      answer: num,
      hint: `${chuc} chục là ${chuc * 10}, thêm ${donVi} đơn vị!`,
      explanation: `${chuc} chục và ${donVi} đơn vị viết là ${num}.`,
    };
  }

  if (topic === "g1_add_sub_100") {
    const a = randInt(20, 70);
    const b = randInt(1, 9);
    const ans = a + b;
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 5),
      answer: ans,
      hint: `Cộng hàng đơn vị trước: 0 + ${b} = ${b}!`,
      explanation: `${a} + ${b} = ${ans}.`,
    };
  }

  if (topic === "g1_shapes") {
    const shapes = [
      { name: "Hình tròn", type: "circle" },
      { name: "Hình vuông", type: "square" },
      { name: "Hình chữ nhật", type: "rectangle" },
      { name: "Hình tam giác", type: "triangle" },
    ];
    const chosen = shapes[randInt(0, shapes.length - 1)];
    return {
      question: "Hình dưới đây là hình gì?",
      visualDisplay: renderShapeVisual(chosen.type),
      options: shuffle([
        "Hình tròn",
        "Hình vuông",
        "Hình chữ nhật",
        "Hình tam giác",
      ]),
      answer: chosen.name,
      hint: "Quan sát các cạnh và góc của hình nhé!",
      explanation: `Đây chính là ${chosen.name}.`,
    };
  }

  if (topic === "g1_time_clock") {
    const hour = randInt(1, 12);
    return {
      question: `Đồng hồ có kim ngắn chỉ số ${hour}, kim dài chỉ số 12. Hỏi lúc đó là mấy giờ?`,
      options: shuffle([
        `${hour} giờ`,
        `${(hour % 12) + 1} giờ`,
        `${hour > 1 ? hour - 1 : 12} giờ`,
        "12 giờ",
      ]),
      answer: `${hour} giờ`,
      hint: "Kim ngắn chỉ số nào là đúng số giờ đó khi kim dài chỉ số 12!",
      explanation: `Kim ngắn chỉ ${hour}, kim dài chỉ 12 là ${hour} giờ đúng.`,
    };
  }

  // ==========================================
  // --- GRADE 2 GENERATORS ---
  // ==========================================
  if (topic === "g2_add_sub_100") {
    const a = randInt(25, 68);
    const b = randInt(15, 95 - a);
    const ans = a + b;
    return {
      question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options: generateOptions(ans, 5),
      answer: ans,
      hint: "Cộng hàng đơn vị trước, nhớ 1 sang hàng chục nhé!",
      explanation: `${a} + ${b} = ${ans}.`,
    };
  }

  if (topic === "g2_mul_2345") {
    const table = Math.random() > 0.5 ? 2 : 5;
    const multiplier = randInt(1, 10);
    const ans = table * multiplier;
    return {
      question: `Tính nhẩm: ${table} × ${multiplier} = ?`,
      options: generateOptions(ans, table * 2),
      answer: ans,
      hint: `Đếm thêm ${table} liên tiếp ${multiplier} lần!`,
      explanation: `${table} × ${multiplier} = ${ans}.`,
    };
  }

  if (topic === "g2_div_2345") {
    const divisor = Math.random() > 0.5 ? 2 : 5;
    const quotient = randInt(1, 10);
    const dividend = divisor * quotient;
    return {
      question: `Tính nhẩm: ${dividend} : ${divisor} = ?`,
      options: generateOptions(quotient, 3),
      answer: quotient,
      hint: `${divisor} nhân mấy thì bằng ${dividend}?`,
      explanation: `${dividend} : ${divisor} = ${quotient} (vì ${divisor} × ${quotient} = ${dividend}).`,
    };
  }

  if (topic === "g2_numbers_1000") {
    const num = randInt(100, 999);
    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const units = num % 10;
    return {
      question: `Số ${num} gồm mấy trăm, mấy chục và mấy đơn vị?`,
      options: shuffle([
        `${hundreds} trăm, ${tens} chục, ${units} đơn vị`,
        `${tens} trăm, ${hundreds} chục, ${units} đơn vị`,
        `${hundreds} trăm, ${units} chục, ${tens} đơn vị`,
        `${units} trăm, ${tens} chục, ${hundreds} đơn vị`,
      ]),
      answer: `${hundreds} trăm, ${tens} chục, ${units} đơn vị`,
      hint: "Đếm từ trái sang phải: hàng trăm, hàng chục, hàng đơn vị!",
      explanation: `${num} = ${hundreds} trăm + ${tens} chục + ${units} đơn vị.`,
    };
  }

  if (topic === "g2_add_sub_1000") {
    const a = randInt(200, 600);
    const b = randInt(100, 900 - a);
    const ans = a + b;
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 50),
      answer: ans,
      hint: "Cộng hàng đơn vị, hàng chục rồi hàng trăm nhé!",
      explanation: `${a} + ${b} = ${ans}.`,
    };
  }

  if (topic === "g2_measure") {
    const val = randInt(2, 9);
    return {
      question: `Đổi: ${val} m = ... dm`,
      options: shuffle([val * 10, val * 100, val, val * 5]),
      answer: val * 10,
      hint: "1 m = 10 dm!",
      explanation: `Vì 1 m = 10 dm nên ${val} m = ${val * 10} dm.`,
    };
  }

  if (topic === "g2_components") {
    const a = randInt(10, 40);
    const x = randInt(5, 20);
    const sum = a + x;
    return {
      question: `Tìm x, biết: ${a} + x = ${sum}`,
      options: generateOptions(x, 4),
      answer: x,
      hint: "Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết!",
      explanation: `x = ${sum} - ${a} = ${x}.`,
    };
  }

  if (topic === "g2_geometry") {
    const l1 = randInt(3, 8);
    const l2 = randInt(3, 8);
    const l3 = randInt(3, 8);
    const total = l1 + l2 + l3;
    return {
      question: `Đường gấp khúc ABC gồm 3 đoạn có độ dài lần lượt là ${l1} cm, ${l2} cm và ${l3} cm. Độ dài đường gấp khúc là:`,
      options: generateOptions(total, 5),
      answer: total,
      hint: "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng cộng lại!",
      explanation: `${l1} + ${l2} + ${l3} = ${total} cm.`,
    };
  }

  if (topic === "g2_time_calendar") {
    const drafts = [
      () => ({
        question: "Một tuần lễ có bao nhiêu ngày?",
        options: shuffle([7, 5, 6, 8]),
        answer: 7,
        hint: "Từ Thứ Hai đến Chủ Nhật có bao nhiêu ngày?",
        explanation: "Một tuần lễ có đúng 7 ngày.",
      }),
      () => {
        const hour = randInt(1, 12);
        const minute = randInt(0, 11) * 5;
        const read =
          minute === 0 ? `${hour} giờ` : `${hour} giờ ${minute} phút`;
        return {
          question: `Đồng hồ có kim ngắn qua số ${hour}, kim dài chỉ số ${minute / 5}. Hỏi lúc đó là mấy giờ?`,
          options: shuffle([
            read,
            `${(hour % 12) + 1} giờ ${minute} phút`,
            `${hour} giờ ${(minute + 5) % 60} phút`,
            `${hour === 1 ? 12 : hour - 1} giờ ${minute} phút`,
          ]),
          answer: read,
          hint: "Kim dài chỉ số nào thì lấy số đó nhân với 5 để ra số phút!",
          explanation: `Kim dài chỉ số ${minute / 5} ⇒ ${minute / 5} × 5 = ${minute} phút. Vậy là ${read}.`,
        };
      },
      () => {
        const days = [28, 29, 30, 31][randInt(0, 3)];
        const month = randInt(1, 12);
        return {
          question: `Tháng ${month} có thể có bao nhiêu ngày? (chọn đáp án có thể đúng)`,
          options: shuffle([28, 29, 30, 31]),
          answer: days,
          hint: "Tháng 2 có 28 hoặc 29 ngày; tháng 4, 6, 9, 11 có 30 ngày; các tháng còn lại có 31 ngày.",
          explanation: `Tháng ${month} có thể có ${days} ngày.`,
        };
      },
    ];
    return drafts[randInt(0, drafts.length - 1)]();
  }

  if (topic === "g2_stats_prob") {
    const suKien = [
      { q: "Mặt trời mọc ở hướng Đông", a: "Chắc chắn xảy ra" },
      { q: "Ngày mai trời có mưa", a: "Có thể xảy ra" },
      { q: "Tháng Hai có 32 ngày", a: "Không thể xảy ra" },
      { q: "Một tuần lễ có 7 ngày", a: "Chắc chắn xảy ra" },
      { q: "Tung một con xúc xắc được mặt 7 chấm", a: "Không thể xảy ra" },
      {
        q: "Lấy được một viên bi đỏ khi hộp có cả bi đỏ và bi xanh",
        a: "Có thể xảy ra",
      },
      { q: "Bé lớn lên thêm 1 tuổi sau một năm", a: "Chắc chắn xảy ra" },
      { q: "Tháng Sáu có 31 ngày", a: "Không thể xảy ra" },
    ];
    const chon = suKien[randInt(0, suKien.length - 1)];
    return {
      question: `Sự kiện "${chon.q}" là sự kiện:`,
      options: shuffle([
        "Chắc chắn xảy ra",
        "Có thể xảy ra",
        "Không thể xảy ra",
      ]),
      answer: chon.a,
      hint: "Hỏi xem sự việc đó luôn xảy ra, không bao giờ xảy ra, hay tuỳ lúc?",
      explanation: `"${chon.q}" là sự kiện ${chon.a.toLowerCase()}.`,
    };
  }

  // ==========================================
  // --- GRADE 3 GENERATORS ---
  // ==========================================
  if (topic === "g3_mul_6789") {
    const t = [6, 7, 8, 9][randInt(0, 3)];
    const m = randInt(2, 9);
    const ans = t * m;
    return {
      question: `Tính nhẩm: ${t} × ${m} = ?`,
      options: generateOptions(ans, 8),
      answer: ans,
      hint: `Nhẩm bảng nhân ${t}: ${t} × ${m} = ${ans}!`,
      explanation: `${t} × ${m} = ${ans}.`,
    };
  }

  if (topic === "g3_div_6789") {
    const d = [6, 7, 8, 9][randInt(0, 3)];
    const q = randInt(3, 9);
    const r = randInt(1, d - 1);
    const dividend = d * q + r;
    return {
      question: `Tính: ${dividend} : ${d} = ?`,
      options: shuffle([
        `${q} (dư ${r})`,
        `${q + 1} (dư ${r})`,
        `${q} (dư ${r + 1 >= d ? 1 : r + 1})`,
        `${q - 1} (dư ${r})`,
      ]),
      answer: `${q} (dư ${r})`,
      hint: `Tìm số lớn nhất nhân với ${d} mà bé hơn ${dividend}!`,
      explanation: `${dividend} = ${d} × ${q} + ${r}, thương là ${q} dư ${r}.`,
    };
  }

  if (topic === "g3_fraction") {
    const den = [2, 3, 4, 5, 6, 7, 8, 9][randInt(0, 7)];
    const total = den * randInt(2, 6);
    const ans = total / den;
    return {
      question: `Tìm 1/${den} của ${total} quả táo:`,
      options: generateOptions(ans, 3),
      answer: ans,
      hint: `Muốn tìm 1/${den} của ${total}, ta lấy ${total} chia cho ${den}!`,
      explanation: `${total} : ${den} = ${ans} quả táo.`,
    };
  }

  if (topic === "g3_mul_div_multi") {
    const a = randInt(12, 85);
    const b = randInt(2, 6);
    const ans = a * b;
    return {
      question: `Đặt tính rồi tính: ${a} × ${b} = ?`,
      options: generateOptions(ans, 15),
      answer: ans,
      hint: `Nhân hàng đơn vị trước: ${a % 10} × ${b}, nhớ hàng chục!`,
      explanation: `${a} × ${b} = ${ans}.`,
    };
  }

  if (topic === "g3_numbers_100k") {
    const roman = [
      { r: "IV", v: 4 },
      { r: "VI", v: 6 },
      { r: "IX", v: 9 },
      { r: "XI", v: 11 },
      { r: "XIV", v: 14 },
      { r: "XV", v: 15 },
      { r: "XIX", v: 19 },
      { r: "XX", v: 20 },
    ];
    const chosen = roman[randInt(0, roman.length - 1)];
    return {
      question: `Chữ số La Mã "${chosen.r}" biểu diễn số tự nhiên nào?`,
      options: generateOptions(chosen.v, 4),
      answer: chosen.v,
      hint: "X là 10, V là 5, I là 1. I đứng trước V là 4, đứng trước X là 9!",
      explanation: `Chữ số La Mã ${chosen.r} có giá trị là ${chosen.v}.`,
    };
  }

  if (topic === "g3_perimeter_area") {
    const isSquare = Math.random() > 0.5;
    if (isSquare) {
      const a = randInt(4, 12);
      const perim = a * 4;
      return {
        question: `Một hình vuông có cạnh dài ${a} cm. Chu vi hình vuông đó là:`,
        options: generateOptions(perim, 8),
        answer: perim,
        hint: "Chu vi hình vuông = Cạnh × 4!",
        explanation: `${a} × 4 = ${perim} cm.`,
      };
    } else {
      const d = randInt(5, 12);
      const r = randInt(2, d - 1);
      const area = d * r;
      return {
        question: `Hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm. Diện tích của hình chữ nhật là:`,
        options: generateOptions(area, 10),
        answer: area,
        hint: "Diện tích hình chữ nhật = Chiều dài × Chiều rộng!",
        explanation: `S = ${d} × ${r} = ${area} cm².`,
      };
    }
  }

  if (topic === "g3_measure_units") {
    const kg = randInt(2, 8);
    return {
      question: `Đổi: ${kg} kg = ... gam`,
      options: shuffle([kg * 1000, kg * 100, kg * 10, kg * 10000]),
      answer: kg * 1000,
      hint: "1 kg = 1000 g!",
      explanation: `${kg} kg = ${kg * 1000} g.`,
    };
  }

  if (topic === "g3_expressions") {
    const a = randInt(10, 50);
    const b = randInt(2, 9);
    const c = randInt(2, 5);
    const ans = a + b * c;
    return {
      question: `Tính giá trị biểu thức: ${a} + ${b} × ${c} = ?`,
      options: generateOptions(ans, 10),
      answer: ans,
      hint: "Nhớ thực hiện phép nhân trước, cộng sau!",
      explanation: `${a} + (${b} × ${c}) = ${a} + ${b * c} = ${ans}.`,
    };
  }

  if (topic === "g3_word_problems") {
    const a = randInt(5, 15);
    const times = randInt(2, 4);
    const b = a * times;
    const total = a + b;
    return {
      question: `Thùng thứ nhất có ${a} lít dầu. Thùng thứ hai có gấp ${times} lần thùng thứ nhất. Hỏi cả hai thùng có bao nhiêu lít dầu?`,
      options: generateOptions(total, 10),
      answer: total,
      hint: `Bước 1: Tìm thùng thứ hai = ${a} × ${times}. Bước 2: Cộng cả hai thùng!`,
      explanation: `Thùng 2 có: ${a} × ${times} = ${b} lít. Cả 2 thùng có: ${a} + ${b} = ${total} lít.`,
    };
  }

  if (topic === "g3_stats_prob") {
    const tinhHuong = [
      {
        q: "Trong hộp có 5 viên bi đỏ và 5 viên bi xanh, không nhìn vào hộp bốc 1 viên thì bốc được bi đỏ",
        a: "Có thể xảy ra",
      },
      {
        q: "Trong hộp chỉ có bi đỏ, bốc 1 viên thì bốc được bi đỏ",
        a: "Chắc chắn xảy ra",
      },
      {
        q: "Trong hộp chỉ có bi đỏ, bốc 1 viên thì bốc được bi xanh",
        a: "Không thể xảy ra",
      },
      { q: "Cây cao thêm sau một năm", a: "Chắc chắn xảy ra" },
      { q: "Ngày mai bé được điểm 10", a: "Có thể xảy ra" },
      { q: "Một tuần lễ có 10 ngày", a: "Không thể xảy ra" },
    ];
    const chon = tinhHuong[randInt(0, tinhHuong.length - 1)];
    return {
      question: `${chon.q}. Đó là sự kiện:`,
      options: shuffle([
        "Chắc chắn xảy ra",
        "Có thể xảy ra",
        "Không thể xảy ra",
      ]),
      answer: chon.a,
      hint: "Tự hỏi: việc đó luôn xảy ra, không bao giờ xảy ra, hay tuỳ lúc?",
      explanation: `Đó là sự kiện ${chon.a.toLowerCase()}.`,
    };
  }

  // ==========================================
  // --- GRADE 4 GENERATORS ---
  // ==========================================
  if (topic === "g4_numbers_million") {
    const num = randInt(1, 9);
    return {
      question: `Số ${num} triệu viết dưới dạng số tự nhiên là:`,
      options: shuffle([
        `${num} 000 000`,
        `${num}00 000`,
        `${num}0 000`,
        `${num} 000 000 000`,
      ]),
      answer: `${num} 000 000`,
      hint: "Số triệu có 6 chữ số 0 đứng sau!",
      explanation: `${num} triệu = ${num} 000 000.`,
    };
  }

  if (topic === "g4_add_sub_natural") {
    const a = randInt(23500, 84200);
    const b = randInt(12300, 95000 - a);
    const ans = a + b;
    return {
      question: `Tính: ${a.toLocaleString("vi-VN")} + ${b.toLocaleString("vi-VN")} = ?`,
      options: generateOptions(ans, 2000),
      answer: ans,
      hint: "Đặt tính thẳng cột từ phải sang trái!",
      explanation: `${a} + ${b} = ${ans}.`,
    };
  }

  if (topic === "g4_mul_div_natural") {
    // Mẹo nhân 11
    const n = randInt(21, 85);
    const d1 = Math.floor(n / 10);
    const d2 = n % 10;
    const ans = n * 11;
    return {
      question: `Tính nhanh: ${n} × 11 = ?`,
      options: generateOptions(ans, 20),
      answer: ans,
      hint: `Cộng 2 chữ số: ${d1} + ${d2} = ${d1 + d2}. Chèn kết quả vào giữa!`,
      explanation: `${n} × 11 = ${ans}.`,
    };
  }

  if (topic === "g4_sum_diff") {
    const be = randInt(10, 45);
    const hieu = randInt(4, 20);
    const lon = be + hieu;
    const tong = lon + be;
    const askLon = Math.random() > 0.5;
    return {
      question: `Tổng hai số là ${tong}, hiệu hai số là ${hieu}. ${askLon ? "Số lớn là:" : "Số bé là:"}`,
      options: shuffle([lon, be, lon + 2, be - 2]),
      answer: askLon ? lon : be,
      hint: askLon ? "Số lớn = (Tổng + Hiệu) : 2" : "Số bé = (Tổng - Hiệu) : 2",
      explanation: `Số lớn = (${tong} + ${hieu}) : 2 = ${lon}; Số bé = (${tong} - ${hieu}) : 2 = ${be}.`,
    };
  }

  if (topic === "g4_divisibility") {
    const base = randInt(12, 90) * 10;
    const addVal = [0, 2, 5, 8][randInt(0, 3)];
    const testNum = base + addVal;
    const isDiv2 = testNum % 2 === 0;
    const isDiv5 = testNum % 5 === 0;
    return {
      question: `Số ${testNum} có chia hết cho 5 không?`,
      options: shuffle([
        testNum % 5 === 0
          ? "Có, vì tận cùng là 0 hoặc 5"
          : "Không, vì tận cùng không phải 0 hoặc 5",
        testNum % 5 === 0 ? "Không" : "Có",
      ]),
      answer:
        testNum % 5 === 0
          ? "Có, vì tận cùng là 0 hoặc 5"
          : "Không, vì tận cùng không phải 0 hoặc 5",
      hint: "Dấu hiệu chia hết cho 5: chữ số tận cùng là 0 hoặc 5!",
      explanation: `Số ${testNum} có chữ số tận cùng là ${testNum % 10}.`,
    };
  }

  if (topic === "g4_fractions_basic") {
    const tu = randInt(2, 6);
    const mau = randInt(tu + 1, 9);
    const factor = randInt(2, 5);
    const tuL = tu * factor;
    const mauL = mau * factor;
    return {
      question: `Rút gọn phân số ${tuL}/${mauL} về phân số tối giản ta được:`,
      options: shuffle([
        `${tu}/${mau}`,
        `${tu + 1}/${mau}`,
        `${tu}/${mau + 1}`,
        `${tuL}/${mau}`,
      ]),
      answer: `${tu}/${mau}`,
      hint: `Chia cả tử và mẫu cho ${factor}!`,
      explanation: `${tuL}/${mauL} = (${tuL}:${factor}) / (${mauL}:${factor}) = ${tu}/${mau}.`,
    };
  }

  if (topic === "g4_fractions_calc") {
    const isMul = Math.random() > 0.5;
    if (isMul) {
      const a = randInt(1, 4);
      const b = randInt(5, 7);
      const c = randInt(1, 3);
      const d = randInt(4, 6);
      const tu = a * c;
      const mau = b * d;
      return {
        question: `Tính: (${a}/${b}) × (${c}/${d}) = ?`,
        options: shuffle([
          `${tu}/${mau}`,
          `${a + c}/${b + d}`,
          `${tu}/${b * c}`,
          `${a * d}/${mau}`,
        ]),
        answer: `${tu}/${mau}`,
        hint: "Nhân phân số: Tử nhân tử, mẫu nhân mẫu!",
        explanation: `(${a}/${b}) × (${c}/${d}) = (${a}×${c})/(${b}×${d}) = ${tu}/${mau}.`,
      };
    } else {
      const a = randInt(1, 5);
      const b = randInt(1, 5);
      const m = randInt(7, 12);
      const tu = a + b;
      return {
        question: `Tính: ${a}/${m} + ${b}/${m} = ?`,
        options: shuffle([
          `${tu}/${m}`,
          `${tu}/${m * 2}`,
          `${a * b}/${m}`,
          `${tu - 1}/${m}`,
        ]),
        answer: `${tu}/${m}`,
        hint: "Cộng hai phân số cùng mẫu: Cộng các tử số, giữ nguyên mẫu số!",
        explanation: `${a}/${m} + ${b}/${m} = (${a}+${b})/${m} = ${tu}/${m}.`,
      };
    }
  }

  if (topic === "g4_sum_ratio") {
    const pBe = randInt(1, 2);
    const pLon = randInt(3, 5);
    const unit = randInt(4, 12);
    const be = pBe * unit;
    const lon = pLon * unit;
    const tong = be + lon;
    return {
      question: `Tổng hai số là ${tong}, tỉ số của hai số là ${pBe}/${pLon}. Số bé là:`,
      options: shuffle([be, lon, be + 2, be - 2]),
      answer: be,
      hint: `Tổng số phần: ${pBe} + ${pLon} = ${pBe + pLon} phần. Giá trị 1 phần = ${tong} : ${pBe + pLon}!`,
      explanation: `Tổng số phần = ${pBe + pLon}. Giá trị 1 phần = ${tong} : ${pBe + pLon} = ${unit}. Số bé = ${unit} × ${pBe} = ${be}.`,
    };
  }

  if (topic === "g4_geometry") {
    const isParallelogram = Math.random() > 0.5;
    if (isParallelogram) {
      const a = randInt(8, 20);
      const h = randInt(4, 12);
      const s = a * h;
      return {
        question: `Một hình bình hành có độ dài đáy là ${a} cm và chiều cao ${h} cm. Diện tích hình bình hành là:`,
        visualDisplay: renderShapeVisual("parallelogram"),
        options: generateOptions(s, 20),
        answer: s,
        hint: "Diện tích hình bình hành S = Đáy × Chiều cao (a × h)!",
        explanation: `S = ${a} × ${h} = ${s} cm².`,
      };
    } else {
      const m = randInt(6, 16);
      const n = randInt(4, 12);
      const s = (m * n) / 2;
      return {
        question: `Một hình thoi có độ dài hai đường chéo là ${m} cm và ${n} cm. Diện tích hình thoi là:`,
        visualDisplay: renderShapeVisual("rhombus"),
        options: generateOptions(s, 15),
        answer: s,
        hint: "Diện tích hình thoi S = (m × n) : 2!",
        explanation: `S = (${m} × ${n}) : 2 = ${s} cm².`,
      };
    }
  }

  if (topic === "g4_measures_stats") {
    const tan = randInt(2, 9);
    const ta = randInt(1, 9);
    const ansKg = tan * 1000 + ta * 100;
    return {
      question: `Đổi: ${tan} tấn ${ta} tạ = ... kg`,
      options: shuffle([
        ansKg,
        tan * 100 + ta * 10,
        tan * 1000 + ta,
        ansKg + 100,
      ]),
      answer: ansKg,
      hint: "1 tấn = 1000 kg, 1 tạ = 100 kg!",
      explanation: `${tan} tấn = ${tan * 1000} kg; ${ta} tạ = ${ta * 100} kg -> ${ansKg} kg.`,
    };
  }

  // ==========================================
  // --- GRADE 5 GENERATORS ---
  // ==========================================
  if (topic === "g5_decimals_basic") {
    const n = randInt(12, 98);
    const d = randInt(1, 9);
    const val = parseFloat(`${n}.${d}`);
    return {
      question: `Trong số thập phân ${val}, phần thập phân là:`,
      options: shuffle([`0,${d}`, `${d}`, `${n}`, `0,0${d}`]),
      answer: `0,${d}`,
      hint: "Phần thập phân là phần đứng sau dấu phẩy!",
      explanation: `Số ${val} có phần nguyên là ${n} và phần thập phân là 0,${d}.`,
    };
  }

  if (topic === "g5_decimals_calc") {
    const a = (randInt(12, 85) / 10).toFixed(1);
    const b = (randInt(11, 45) / 10).toFixed(1);
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
      return {
        question: `Tính: ${a.replace(".", ",")} + ${b.replace(".", ",")} = ?`,
        options: shuffle([
          ans.replace(".", ","),
          (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
        ]),
        answer: ans.replace(".", ","),
        hint: "Đặt tính thẳng cột các dấu phẩy rồi cộng!",
        explanation: `${a} + ${b} = ${ans}.`,
      };
    } else {
      const big = Math.max(parseFloat(a), parseFloat(b));
      const small = Math.min(parseFloat(a), parseFloat(b));
      const ans = (big - small).toFixed(1);
      return {
        question: `Tính: ${big.toFixed(1).replace(".", ",")} - ${small.toFixed(1).replace(".", ",")} = ?`,
        options: shuffle([
          ans.replace(".", ","),
          (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
        ]),
        answer: ans.replace(".", ","),
        hint: "Đặt tính thẳng cột các dấu phẩy rồi trừ!",
        explanation: `${big} - ${small} = ${ans}.`,
      };
    }
  }

  if (topic === "g5_percentages") {
    const total = [20, 40, 50, 80, 100, 200][randInt(0, 5)];
    const pct = [10, 20, 25, 50, 75][randInt(0, 4)];
    const ans = (total * pct) / 100;
    return {
      question: `Tìm ${pct}% của ${total} kg:`,
      options: generateOptions(ans, 10),
      answer: ans,
      hint: `Lấy ${total} nhân với ${pct} rồi chia cho 100!`,
      explanation: `${total} × ${pct} : 100 = ${ans} kg.`,
    };
  }

  if (topic === "g5_fractions_mixed") {
    const whole = randInt(2, 5);
    const tu = randInt(1, 3);
    const mau = randInt(4, 5);
    const ansTu = whole * mau + tu;
    return {
      question: `Chuyển hỗn số ${whole} và ${tu}/${mau} thành phân số:`,
      options: shuffle([
        `${ansTu}/${mau}`,
        `${ansTu + 1}/${mau}`,
        `${whole * tu}/${mau}`,
        `${ansTu}/${mau + 1}`,
      ]),
      answer: `${ansTu}/${mau}`,
      hint: `Tử số = (Phần nguyên × Mẫu) + Tử = (${whole} × ${mau} + ${tu})!`,
      explanation: `${whole} ${tu}/${mau} = (${whole}×${mau}+${tu})/${mau} = ${ansTu}/${mau}.`,
    };
  }

  if (topic === "g5_geometry_plane") {
    const shapePick = ["triangle", "trapezoid", "circle"][randInt(0, 2)];
    if (shapePick === "triangle") {
      const a = randInt(6, 16);
      const h = randInt(4, 10);
      const s = (a * h) / 2;
      return {
        question: `Một hình tam giác có đáy ${a} cm và chiều cao ${h} cm. Diện tích tam giác là:`,
        visualDisplay: renderShapeVisual("triangle"),
        options: generateOptions(s, 10),
        answer: s,
        hint: "Diện tích tam giác S = (đáy × chiều cao) : 2!",
        explanation: `S = (${a} × ${h}) : 2 = ${s} cm².`,
      };
    } else if (shapePick === "trapezoid") {
      const a = randInt(10, 18);
      const b = randInt(4, 8);
      const h = randInt(4, 8);
      const s = ((a + b) * h) / 2;
      return {
        question: `Hình thang có đáy lớn ${a} cm, đáy bé ${b} cm và chiều cao ${h} cm. Diện tích là:`,
        visualDisplay: renderShapeVisual("trapezoid"),
        options: generateOptions(s, 15),
        answer: s,
        hint: "S = (đáy lớn + đáy bé) × chiều cao : 2!",
        explanation: `S = (${a} + ${b}) × ${h} : 2 = ${s} cm².`,
      };
    } else {
      const r = randInt(2, 6);
      const s = parseFloat((r * r * 3.14).toFixed(2));
      return {
        question: `Hình tròn có bán kính r = ${r} cm. Diện tích hình tròn đó là:`,
        visualDisplay: renderShapeVisual("circle_r"),
        options: shuffle([
          `${s} cm²`,
          `${(r * 2 * 3.14).toFixed(2)} cm²`,
          `${(s + 3.14).toFixed(2)} cm²`,
          `${(s - 3.14).toFixed(2)} cm²`,
        ]),
        answer: `${s} cm²`,
        hint: "Diện tích hình tròn S = r × r × 3,14!",
        explanation: `S = ${r} × ${r} × 3,14 = ${s} cm².`,
      };
    }
  }

  if (topic === "g5_geometry_solid") {
    const isCube = Math.random() > 0.5;
    if (isCube) {
      const a = randInt(2, 6);
      const v = a * a * a;
      return {
        question: `Một hình lập phương có cạnh dài ${a} cm. Thể tích của hình lập phương là:`,
        visualDisplay: renderShapeVisual("cube"),
        options: generateOptions(v, 15),
        answer: v,
        hint: "Thể tích hình lập phương V = a × a × a!",
        explanation: `V = ${a} × ${a} × ${a} = ${v} cm³.`,
      };
    } else {
      const a = randInt(4, 8);
      const b = randInt(2, 5);
      const c = randInt(3, 6);
      const v = a * b * c;
      return {
        question: `Một hình hộp chữ nhật có kích thước dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích là:`,
        visualDisplay: renderShapeVisual("cuboid"),
        options: generateOptions(v, 20),
        answer: v,
        hint: "Thể tích hình hộp chữ nhật V = a × b × c!",
        explanation: `V = ${a} × ${b} × ${c} = ${v} cm³.`,
      };
    }
  }

  if (topic === "g5_time_units") {
    const h = randInt(1, 4);
    const m = randInt(15, 45);
    const totalMinutes = h * 60 + m;
    return {
      question: `Đổi: ${h} giờ ${m} phút = ... phút`,
      options: generateOptions(totalMinutes, 20),
      answer: totalMinutes,
      hint: `1 giờ = 60 phút! Lấy ${h} × 60 + ${m}!`,
      explanation: `${h} giờ = ${h * 60} phút; ${h * 60} + ${m} = ${totalMinutes} phút.`,
    };
  }

  if (topic === "g5_motion_basic") {
    const type = ["v", "s", "t"][randInt(0, 2)];
    if (type === "v") {
      const s = [90, 120, 150, 180, 240][randInt(0, 4)];
      const t = [2, 3, 4][randInt(0, 2)];
      const v = s / t;
      return {
        question: `Một ô tô đi được quãng đường ${s} km trong ${t} giờ. Vận tốc của ô tô là:`,
        options: generateOptions(v, 10).map((x) => `${x} km/h`),
        answer: `${v} km/h`,
        hint: "Vận tốc = Quãng đường : Thời gian (v = s : t)!",
        explanation: `v = ${s} : ${t} = ${v} km/h.`,
      };
    } else if (type === "s") {
      const v = [35, 40, 45, 50, 60][randInt(0, 4)];
      const t = randInt(2, 4);
      const s = v * t;
      return {
        question: `Một xe máy chạy với vận tốc ${v} km/h trong ${t} giờ. Quãng đường xe máy đã đi là:`,
        options: generateOptions(s, 30).map((x) => `${x} km`),
        answer: `${s} km`,
        hint: "Quãng đường = Vận tốc × Thời gian (s = v × t)!",
        explanation: `s = ${v} × ${t} = ${s} km.`,
      };
    } else {
      const v = [30, 40, 50, 60][randInt(0, 3)];
      const t = randInt(2, 4);
      const s = v * t;
      return {
        question: `Quãng đường AB dài ${s} km, một ô tô đi với vận tốc ${v} km/h. Thời gian ô tô đi hết quãng đường là:`,
        options: generateOptions(t, 2).map((x) => `${x} giờ`),
        answer: `${t} giờ`,
        hint: "Thời gian = Quãng đường : Vận tốc (t = s : v)!",
        explanation: `t = ${s} : ${v} = ${t} giờ.`,
      };
    }
  }

  if (topic === "g5_motion_advanced") {
    const v1 = [40, 50, 60][randInt(0, 2)];
    const v2 = [30, 40, 50][randInt(0, 2)];
    const t = randInt(2, 3);
    const s = (v1 + v2) * t;
    return {
      question: `Hai thành phố cách nhau ${s} km. Hai ô tô khởi hành cùng lúc đi ngược chiều nhau với vận tốc lần lượt là ${v1} km/h và ${v2} km/h. Sau bao lâu hai xe gặp nhau?`,
      options: generateOptions(t, 2).map((x) => `${x} giờ`),
      answer: `${t} giờ`,
      hint: `Tổng vận tốc 2 xe = ${v1} + ${v2}. Thời gian gặp nhau = Quãng đường : Tổng vận tốc!`,
      explanation: `Tổng vận tốc = ${v1 + v2} km/h. Thời gian gặp nhau = ${s} : ${v1 + v2} = ${t} giờ.`,
    };
  }

  if (topic === "g5_charts_stats") {
    const mauSac = randInt(2, 5);
    const phanTram = [50, 25, 20, 40][randInt(0, 3)];
    const rutGon = ["1/2", "1/4", "1/5", "2/5"][
      [50, 25, 20, 40].indexOf(phanTram)
    ];
    return {
      question: `Biểu đồ hình quạt biểu thị 100% học sinh một trường. Nếu số học sinh thích môn Toán chiếm ${phanTram}% thì tương ứng với phân số nào?`,
      options: shuffle(["1/2", "1/4", "1/5", "2/5", "3/5", "1/10"]).slice(0, 4),
      answer: rutGon,
      hint: `${phanTram}% = ${phanTram}/100, rồi rút gọn phân số đó!`,
      explanation: `${phanTram}% = ${phanTram}/100 = ${rutGon}. (Biểu đồ có ${mauSac} phần.)`,
    };
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CÁC KHUÔN BỔ SUNG — viết 2026-09-22 sau khi ĐO được 13/57 khuôn HỎNG.
  //
  // Nhóm A: 9 khuôn THIẾU nhánh `if` ⇒ rơi xuống câu dự phòng cố định
  //   ("Tính: 10 + 5 = ?") ⇒ bé nhận ĐÚNG một câu lặp lại mãi, không lỗi nào hiện ra.
  // Nhóm B: 4 khuôn có nhánh nhưng ngân hàng chỉ có MỘT biến thể (đã sửa tại chỗ).
  //
  // Các khuôn "Ôn tập …" ủy quyền cho `pickFromGrade`: ôn tập là trộn kiến thức của
  // CẢ LỚP, không phải một dạng câu riêng. Danh sách id truyền vào chỉ gồm những
  // khuôn CHẮC CHẮN có nhánh, để không bao giờ đệ quy về chính chỗ dự phòng.
  //
  // ⚠️ Đặt ở CUỐI hàm là có chủ ý: mỗi nhánh đều `return`, nên vị trí không đổi
  //   kết quả, và tránh phải chèn vào giữa 5 khối lớp đang có sẵn.
  // ══════════════════════════════════════════════════════════════════════════

  // ── Lớp 1 ───────────────────────────────────────────────────────────────
  // Nhánh `g1_numbers_20` GIỮ LẠI dù chủ đề đã bỏ khỏi danh sách chọn: bé nào từng
  // làm dạng này sẽ còn thấy lại trong Sổ Tay Ôn Bài Sai.
  if (topic === "g1_numbers_20") {
    const n = randInt(11, 20);
    const chuc = Math.floor(n / 10);
    const dv = n % 10;
    return {
      question: `Số ${n} gồm mấy chục và mấy đơn vị?`,
      options: shuffle([
        `${chuc} chục và ${dv} đơn vị`,
        `${dv} chục và ${chuc} đơn vị`,
        `${chuc} chục và ${dv === 9 ? 8 : dv + 1} đơn vị`,
        `2 chục và ${dv} đơn vị`,
      ]),
      answer: `${chuc} chục và ${dv} đơn vị`,
      hint: "Số từ 11 đến 20 luôn gồm 1 chục và một số đơn vị!",
      explanation: `${n} = 10 + ${dv}, tức là ${chuc} chục và ${dv} đơn vị.`,
    };
  }

  if (topic === "g1_shapes_3d") {
    const cauHoi = [
      {
        q: "Đồ vật nào có dạng KHỐI LẬP PHƯƠNG?",
        a: "con xúc xắc 🎲",
        sai: ["quả bóng ⚽", "lon nước 🥫", "cái đĩa 🍽️"],
      },
      {
        q: "Đồ vật nào có dạng KHỐI HỘP CHỮ NHẬT?",
        a: "hộp sữa 🥛",
        sai: ["quả bóng ⚽", "viên bi 🔴", "cái nón 🧢"],
      },
      {
        q: "Khối lập phương có mấy mặt?",
        a: "6 mặt",
        sai: ["4 mặt", "8 mặt", "12 mặt"],
      },
      {
        q: "Khối hộp chữ nhật có mấy mặt?",
        a: "6 mặt",
        sai: ["4 mặt", "5 mặt", "8 mặt"],
      },
    ];
    const chon = cauHoi[randInt(0, cauHoi.length - 1)];
    return {
      question: chon.q,
      options: shuffle([chon.a, ...chon.sai]),
      answer: chon.a,
      hint: "Khối lập phương có 6 mặt đều là hình vuông; khối hộp chữ nhật có 6 mặt là hình chữ nhật!",
      explanation: `Đáp án đúng là: ${chon.a}.`,
    };
  }

  if (topic === "g1_final_review")
    return pickFromGrade(
      1,
      [
        "g1_count",
        "g1_add_sub_10",
        "g1_compare",
        "g1_numbers_100",
        "g1_add_sub_100",
        "g1_shapes",
        "g1_time_clock",
      ],
      depth,
    );

  // ── Lớp 2 ───────────────────────────────────────────────────────────────
  if (topic === "g2_review_100") {
    const n = randInt(10, 99);
    const kieu = randInt(0, 2);
    if (kieu === 0)
      return {
        question: `Số liền sau của ${n} là số nào?`,
        options: generateOptions(n + 1, 3),
        answer: n + 1,
        hint: "Số liền sau thì cộng thêm 1!",
        explanation: `Số liền sau của ${n} là ${n + 1}.`,
      };
    if (kieu === 1)
      return {
        question: `Số liền trước của ${n} là số nào?`,
        options: generateOptions(n - 1, 3),
        answer: n - 1,
        hint: "Số liền trước thì bớt đi 1!",
        explanation: `Số liền trước của ${n} là ${n - 1}.`,
      };
    const soSanh = [">", "<", "="][randInt(0, 2)];
    return {
      question: `Điền dấu thích hợp: ${n} ... ${soSanh === ">" ? n - randInt(1, 9) : soSanh === "<" ? n + randInt(1, 9) : n}`,
      options: [">", "<", "="],
      answer: soSanh,
      hint: "Mũi tên nhọn luôn chĩa về phía số bé hơn!",
      explanation: "So hàng chục trước, bằng nhau thì so hàng đơn vị.",
    };
  }

  if (topic === "g2_add_sub_20") {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = randInt(6, 9);
      const b = randInt(11 - a, 9);
      const ans = a + b;
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 4),
        answer: ans,
        hint: `Tách ${b} = ${10 - a} + ${b - (10 - a)}, rồi cộng cho đủ 10 trước!`,
        explanation: `${a} + ${b} = ${ans} (cộng qua 10).`,
      };
    }
    const a = randInt(12, 18);
    const b = randInt(3, 9);
    const ans = a - b;
    return {
      question: `Tính nhẩm: ${a} - ${b} = ?`,
      options: generateOptions(ans, 4),
      answer: ans,
      hint: `Tách ${b} để trừ cho tròn 10 trước, rồi trừ nốt phần còn lại!`,
      explanation: `${a} - ${b} = ${ans} (trừ qua 10).`,
    };
  }

  if (topic === "g2_measure_weight") {
    const kieu = randInt(0, 2);
    if (kieu === 0) {
      const kg = randInt(2, 9);
      return {
        question: `Bao gạo nặng ${kg} kg, bớt đi 1 kg thì còn bao nhiêu ki-lô-gam?`,
        options: generateOptions(kg - 1, 2),
        answer: kg - 1,
        hint: "Bớt đi thì làm phép trừ!",
        explanation: `${kg} - 1 = ${kg - 1} kg.`,
      };
    }
    if (kieu === 1) {
      const l = randInt(3, 9);
      return {
        question: `Can có ${l} lít nước, rót thêm ${randInt(1, 3)} lít nữa. Can có tất cả bao nhiêu lít?`,
        options: generateOptions(l + 2, 2),
        answer: l + 2,
        hint: "Rót thêm thì làm phép cộng!",
        explanation: `Đơn vị đo dung tích là lít.`,
      };
    }
    return {
      question: "Đơn vị nào dùng để đo KHỐI LƯỢNG?",
      options: shuffle([
        "ki-lô-gam (kg)",
        "lít (l)",
        "xăng-ti-mét (cm)",
        "giờ",
      ]),
      answer: "ki-lô-gam (kg)",
      hint: "Khối lượng là nặng nhẹ; dung tích là nhiều ít chất lỏng.",
      explanation: "Đo khối lượng bằng kg; đo dung tích bằng lít.",
    };
  }

  if (topic === "g2_review_hk1")
    return pickFromGrade(
      2,
      [
        "g2_review_100",
        "g2_add_sub_20",
        "g2_add_sub_100",
        "g2_geometry",
        "g2_time_calendar",
        "g2_components",
      ],
      depth,
    );

  if (topic === "g2_shapes_3d") {
    const cauHoi = [
      {
        q: "Vật nào có dạng KHỐI TRỤ?",
        a: "lon nước 🥫",
        sai: ["quả bóng ⚽", "con xúc xắc 🎲", "quyển sách 📕"],
      },
      {
        q: "Vật nào có dạng KHỐI CẦU?",
        a: "quả bóng ⚽",
        sai: ["lon nước 🥫", "hộp sữa 🥛", "cái hộp 📦"],
      },
      {
        q: "Khối trụ có hai mặt đáy là hình gì?",
        a: "hình tròn",
        sai: ["hình vuông", "hình tam giác", "hình chữ nhật"],
      },
      {
        q: "Quả địa cầu 🌍 có dạng khối gì?",
        a: "khối cầu",
        sai: ["khối trụ", "khối lập phương", "khối hộp chữ nhật"],
      },
    ];
    const chon = cauHoi[randInt(0, cauHoi.length - 1)];
    return {
      question: chon.q,
      options: shuffle([chon.a, ...chon.sai]),
      answer: chon.a,
      hint: "Khối trụ lăn được và có hai đáy tròn; khối cầu tròn xoe như quả bóng.",
      explanation: `Đáp án đúng là: ${chon.a}.`,
    };
  }

  if (topic === "g2_money") {
    const kieu = randInt(0, 3);
    if (kieu === 0) {
      const t = [10, 20, 50][randInt(0, 2)];
      return {
        question: `Tờ tiền ${t} 000 đồng đổi được mấy tờ 10 000 đồng?`,
        options: generateOptions(t / 10, 2),
        answer: t / 10,
        hint: "Lấy số tiền lớn chia cho 10 000!",
        explanation: `${t} 000 : 10 000 = ${t / 10} tờ.`,
      };
    }
    if (kieu === 1) {
      const a = randInt(2, 5) * 5000;
      const b = randInt(2, 5) * 5000;
      return {
        question: `Một hộp bút giá ${a} đồng, một quyển vở giá ${b} đồng. Mua cả hai hết bao nhiêu tiền?`,
        options: generateOptions(a + b, 5000),
        answer: a + b,
        hint: "Mua cả hai thì cộng hai số tiền lại!",
        explanation: `${a} + ${b} = ${a + b} đồng.`,
      };
    }
    if (kieu === 2) {
      const tong = randInt(4, 10) * 5000;
      const gia = randInt(1, 3) * 5000;
      return {
        question: `Bé có ${tong} đồng, mua quyển vở hết ${gia} đồng. Bé còn lại bao nhiêu tiền?`,
        options: generateOptions(tong - gia, 5000),
        answer: tong - gia,
        hint: "Còn lại thì làm phép trừ!",
        explanation: `${tong} - ${gia} = ${tong - gia} đồng.`,
      };
    }
    return {
      question: "Đơn vị tiền của Việt Nam là gì?",
      options: shuffle(["đồng", "đô-la", "yên", "nhân dân tệ"]),
      answer: "đồng",
      hint: "Trên mỗi tờ tiền Việt Nam đều ghi chữ “đồng”!",
      explanation: "Đơn vị tiền tệ của Việt Nam là ĐỒNG.",
    };
  }

  if (topic === "g2_final_review")
    return pickFromGrade(
      2,
      [
        "g2_review_100",
        "g2_components",
        "g2_add_sub_20",
        "g2_measure_weight",
        "g2_add_sub_100",
        "g2_geometry",
        "g2_time_calendar",
        "g2_mul_2345",
        "g2_div_2345",
        "g2_shapes_3d",
        "g2_numbers_1000",
        "g2_measure",
        "g2_money",
        "g2_add_sub_1000",
        "g2_stats_prob",
      ],
      depth,
    );

  // ── Lớp 3 ───────────────────────────────────────────────────────────────
  // 🔴 Đây là hai khuôn mà chủ app đã phát hiện thiếu: bảng nhân/chia 3 và 4 thuộc
  // LỚP 3 (chủ đề 1), không phải LỚP 2. Trước đây phần Luyện tập lớp 3 chỉ có bảng
  // 6, 7, 8, 9 nên bé lớp 3 không có chỗ luyện bảng 3 và 4.
  if (topic === "g3_mul_3_4") {
    const t = [3, 4][randInt(0, 1)];
    const m = randInt(1, 10);
    const ans = t * m;
    return {
      question: `Tính nhẩm: ${t} × ${m} = ?`,
      options: generateOptions(ans, t * 2),
      answer: ans,
      hint: `Đếm thêm ${t} liên tiếp ${m} lần: ${Array.from(
        { length: Math.min(m, 4) },
        (_, i) => t * (i + 1),
      ).join(", ")}${m > 4 ? ", …" : ""}`,
      explanation: `${t} × ${m} = ${ans}.`,
    };
  }

  if (topic === "g3_div_3_4") {
    const d = [3, 4][randInt(0, 1)];
    const q = randInt(2, 10);
    const dividend = d * q;
    return {
      question: `Tính nhẩm: ${dividend} : ${d} = ?`,
      options: generateOptions(q, 2),
      answer: q,
      hint: `${d} nhân mấy thì bằng ${dividend}?`,
      explanation: `${dividend} : ${d} = ${q} (vì ${d} × ${q} = ${dividend}).`,
    };
  }

  if (topic === "g3_geometry_flat") {
    if (Math.random() > 0.5) {
      const doan = randInt(6, 20);
      const dat = Math.random() > 0.5;
      return {
        question: `Đoạn thẳng AB dài ${doan} cm. M là trung điểm của AB. Hỏi AM dài bao nhiêu xăng-ti-mét?`,
        options: generateOptions(doan / 2, 3),
        answer: doan / 2,
        hint: "Trung điểm chia đoạn thẳng thành hai phần bằng nhau!",
        explanation: `AM = MB = ${doan} : 2 = ${doan / 2} cm${dat ? "" : ""}.`,
      };
    }
    const goc = [
      {
        q: "Góc bé hơn góc vuông gọi là gì?",
        a: "góc nhọn",
        sai: ["góc tù", "góc bẹt", "góc vuông"],
      },
      {
        q: "Góc lớn hơn góc vuông và bé hơn góc bẹt gọi là gì?",
        a: "góc tù",
        sai: ["góc nhọn", "góc vuông", "góc bẹt"],
      },
      {
        q: "Góc bằng hai góc vuông gọi là gì?",
        a: "góc bẹt",
        sai: ["góc nhọn", "góc tù", "góc vuông"],
      },
    ];
    const chon = goc[randInt(0, goc.length - 1)];
    return {
      question: chon.q,
      options: shuffle([chon.a, ...chon.sai]),
      answer: chon.a,
      hint: "Góc vuông tham chiếu là góc của cạnh ô vuông trong vở!",
      explanation: `Đáp án đúng: ${chon.a}.`,
    };
  }

  if (topic === "g3_review_hk1")
    return pickFromGrade(
      3,
      [
        "g3_review_1000",
        "g3_mul_3_4",
        "g3_div_3_4",
        "g3_mul_6789",
        "g3_div_6789",
        "g3_fraction",
        "g3_mul_div_multi",
        "g3_measure_units",
        "g3_expressions",
      ],
      depth,
    );

  if (topic === "g3_numbers_10k") {
    const n = randInt(1000, 9999);
    const nghin = Math.floor(n / 1000);
    const tram = Math.floor((n % 1000) / 100);
    const chuc = Math.floor((n % 100) / 10);
    const dv = n % 10;
    return {
      question: `Số ${n} gồm mấy nghìn, mấy trăm, mấy chục và mấy đơn vị?`,
      options: shuffle([
        `${nghin} nghìn, ${tram} trăm, ${chuc} chục, ${dv} đơn vị`,
        `${tram} nghìn, ${nghin} trăm, ${chuc} chục, ${dv} đơn vị`,
        `${nghin} nghìn, ${chuc} trăm, ${tram} chục, ${dv} đơn vị`,
        `${nghin} nghìn, ${tram} trăm, ${dv} chục, ${chuc} đơn vị`,
      ]),
      answer: `${nghin} nghìn, ${tram} trăm, ${chuc} chục, ${dv} đơn vị`,
      hint: "Đọc lần lượt từ trái sang phải: nghìn → trăm → chục → đơn vị!",
      explanation: `${n} = ${nghin}000 + ${tram}00 + ${chuc}0 + ${dv}.`,
    };
  }

  if (topic === "g3_roman") {
    const laMa = [
      { r: "I", v: 1 },
      { r: "II", v: 2 },
      { r: "III", v: 3 },
      { r: "IV", v: 4 },
      { r: "V", v: 5 },
      { r: "VI", v: 6 },
      { r: "IX", v: 9 },
      { r: "X", v: 10 },
      { r: "XI", v: 11 },
      { r: "XIV", v: 14 },
      { r: "XV", v: 15 },
      { r: "XIX", v: 19 },
      { r: "XX", v: 20 },
      { r: "XXI", v: 21 },
    ];
    const chon = laMa[randInt(0, laMa.length - 1)];
    return {
      question: `Chữ số La Mã “${chon.r}” biểu diễn số tự nhiên nào?`,
      options: generateOptions(chon.v, 4).map((x) => Math.max(1, x)),
      answer: chon.v,
      hint: "I = 1, V = 5, X = 10. I đứng TRƯỚC V hoặc X thì bớt đi 1!",
      explanation: `Chữ số La Mã ${chon.r} có giá trị là ${chon.v}.`,
    };
  }

  if (topic === "g3_add_sub_10k") {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = randInt(1000, 6000);
      const b = randInt(1000, 9999 - a);
      return {
        question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
        options: generateOptions(a + b, 50),
        answer: a + b,
        hint: "Đặt tính thẳng cột rồi cộng từ hàng đơn vị, nhớ sang hàng bên trái!",
        explanation: `${a} + ${b} = ${a + b}.`,
      };
    }
    const a = randInt(5000, 9999);
    const b = randInt(1000, a - 1);
    return {
      question: `Đặt tính rồi tính: ${a} - ${b} = ?`,
      options: generateOptions(a - b, 50),
      answer: a - b,
      hint: "Đặt tính thẳng cột rồi trừ từ phải sang trái, mượn khi cần!",
      explanation: `${a} - ${b} = ${a - b}.`,
    };
  }

  if (topic === "g3_add_sub_100k") {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = randInt(10000, 60000);
      const b = randInt(10000, 99999 - a);
      return {
        question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
        options: generateOptions(a + b, 500),
        answer: a + b,
        hint: "Cộng từ hàng đơn vị lên hàng chục nghìn!",
        explanation: `${a} + ${b} = ${a + b}.`,
      };
    }
    const a = randInt(50000, 99999);
    const b = randInt(10000, a - 1);
    return {
      question: `Đặt tính rồi tính: ${a} - ${b} = ?`,
      options: generateOptions(a - b, 500),
      answer: a - b,
      hint: "Trừ từ phải sang trái, mượn 1 từ hàng bên trái khi không đủ trừ!",
      explanation: `${a} - ${b} = ${a - b}.`,
    };
  }

  if (topic === "g3_mul_div_100k") {
    if (Math.random() > 0.5) {
      const a = randInt(10000, 40000);
      const b = randInt(2, 4);
      return {
        question: `Đặt tính rồi tính: ${a} × ${b} = ?`,
        options: generateOptions(a * b, 1000),
        answer: a * b,
        hint: "Nhân lần lượt từ hàng đơn vị lên hàng chục nghìn, nhớ sang trái!",
        explanation: `${a} × ${b} = ${a * b}.`,
      };
    }
    const b = randInt(2, 4);
    const q = randInt(10000, 20000);
    return {
      question: `Đặt tính rồi tính: ${b * q} : ${b} = ?`,
      options: generateOptions(q, 1000),
      answer: q,
      hint: "Chia lần lượt từ hàng chục nghìn xuống hàng đơn vị!",
      explanation: `${b * q} : ${b} = ${q}.`,
    };
  }

  if (topic === "g3_time_money") {
    const kieu = randInt(0, 2);
    if (kieu === 0) {
      const gio = randInt(1, 11);
      const phut = randInt(1, 11) * 5;
      return {
        question: `${gio} giờ ${phut} phút còn đọc là mấy giờ kém mấy phút?`,
        options: shuffle([
          `${gio + 1} giờ kém ${60 - phut} phút`,
          `${gio} giờ kém ${60 - phut} phút`,
          `${gio + 1} giờ kém ${phut} phút`,
          `${gio} giờ kém ${phut} phút`,
        ]),
        answer: `${gio + 1} giờ kém ${60 - phut} phút`,
        hint: "Còn bao nhiêu phút nữa là tới giờ tiếp theo thì gọi là “kém bấy nhiêu”!",
        explanation: `${gio} giờ ${phut} phút = ${gio + 1} giờ kém ${60 - phut} phút.`,
      };
    }
    if (kieu === 1) {
      return {
        question: "Một năm có bao nhiêu tháng?",
        options: generateOptions(12, 2),
        answer: 12,
        hint: "Đếm từ tháng 1 đến tháng 12!",
        explanation: "Một năm có 12 tháng.",
      };
    }
    const gia = randInt(3, 9) * 5000;
    const dua = Math.ceil((gia + 5000) / 10000) * 10000;
    return {
      question: `Bé mua hộp bút giá ${gia} đồng và đưa ${dua} đồng. Bé được trả lại bao nhiêu tiền?`,
      options: generateOptions(dua - gia, 5000),
      answer: dua - gia,
      hint: "Tiền thừa = số tiền đưa trừ số tiền phải trả!",
      explanation: `${dua} - ${gia} = ${dua - gia} đồng.`,
    };
  }

  if (topic === "g3_review_1000") {
    const n = randInt(100, 999);
    const tram = Math.floor(n / 100);
    const chuc = Math.floor((n % 100) / 10);
    const dv = n % 10;
    if (Math.random() > 0.5)
      return {
        question: `Số ${n} gồm mấy trăm, mấy chục và mấy đơn vị?`,
        options: shuffle([
          `${tram} trăm, ${chuc} chục, ${dv} đơn vị`,
          `${chuc} trăm, ${tram} chục, ${dv} đơn vị`,
          `${tram} trăm, ${dv} chục, ${chuc} đơn vị`,
          `${dv} trăm, ${chuc} chục, ${tram} đơn vị`,
        ]),
        answer: `${tram} trăm, ${chuc} chục, ${dv} đơn vị`,
        hint: "Đọc từ trái sang phải: hàng trăm → hàng chục → hàng đơn vị!",
        explanation: `${n} = ${tram} trăm + ${chuc} chục + ${dv} đơn vị.`,
      };
    const a = randInt(200, 700);
    const b = randInt(100, 999 - a);
    return {
      question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options: generateOptions(a + b, 20),
      answer: a + b,
      hint: "Cộng từ hàng đơn vị, nhớ 1 sang hàng chục rồi hàng trăm!",
      explanation: `${a} + ${b} = ${a + b}.`,
    };
  }

  if (topic === "g3_final_review")
    return pickFromGrade(
      3,
      [
        "g3_review_1000",
        "g3_mul_3_4",
        "g3_div_3_4",
        "g3_mul_6789",
        "g3_div_6789",
        "g3_fraction",
        "g3_geometry_flat",
        "g3_mul_div_multi",
        "g3_word_problems",
        "g3_measure_units",
        "g3_expressions",
        "g3_numbers_10k",
        "g3_roman",
        "g3_perimeter_area",
        "g3_add_sub_10k",
        "g3_stats_prob",
      ],
      depth,
    );

  // ── Lớp 4 ───────────────────────────────────────────────────────────────
  if (topic === "g4_final_review")
    return pickFromGrade(
      4,
      [
        "g4_numbers_million",
        "g4_measures_stats",
        "g4_add_sub_natural",
        "g4_mul_div_natural",
        "g4_sum_diff",
        "g4_divisibility",
        "g4_geometry",
        "g4_fractions_basic",
        "g4_fractions_calc",
        "g4_sum_ratio",
      ],
      depth,
    );

  // ── Lớp 5 ───────────────────────────────────────────────────────────────
  if (topic === "g5_final_review")
    return pickFromGrade(
      5,
      [
        "g5_fractions_mixed",
        "g5_decimals_basic",
        "g5_decimals_calc",
        "g5_percentages",
        "g5_geometry_plane",
        "g5_geometry_solid",
        "g5_time_units",
        "g5_motion_basic",
        "g5_motion_advanced",
        "g5_charts_stats",
      ],
      depth,
    );

  // ── Lớp 1 (tiếp) ────────────────────────────────────────────────────────
  if (topic === "g1_position") {
    const tinhHuong = [
      {
        q: "Ba bạn An, Bình, Cường đứng thành một hàng ngang. An đứng ngoài cùng bên trái, Cường đứng ngoài cùng bên phải. Hỏi Bình đứng bên phải bạn nào?",
        a: "bạn An",
        sai: ["bạn Cường", "không bên phải ai", "bên phải cả hai bạn"],
      },
      {
        q: "Trên bàn có quyển sách, trên quyển sách có một cái bút. Hỏi cái bút ở phía nào của quyển sách?",
        a: "ở phía trên",
        sai: ["ở phía dưới", "ở bên trái", "ở bên phải"],
      },
      {
        q: "Cái ghế nằm ở dưới cái bàn. Hỏi cái bàn ở phía nào của cái ghế?",
        a: "ở phía trên",
        sai: ["ở phía dưới", "ở bên trái", "ở bên phải"],
      },
      {
        q: "Bé giơ tay phải lên. Hỏi tay đó ở phía nào của cơ thể bé?",
        a: "phía bên phải",
        sai: ["phía bên trái", "phía trước", "phía sau"],
      },
      {
        q: "Bé đứng quay mặt về phía cửa ra vào, ba lô đeo sau lưng. Hỏi ba lô ở phía nào của bé?",
        a: "phía sau",
        sai: ["phía trước", "phía trên", "phía dưới"],
      },
    ];
    const chon = tinhHuong[randInt(0, tinhHuong.length - 1)];
    return {
      question: chon.q,
      options: shuffle([chon.a, ...chon.sai]),
      answer: chon.a,
      hint: "Đọc kĩ xem đồ vật này nằm ở đâu so với đồ vật kia!",
      explanation: `Đáp án đúng: ${chon.a}.`,
    };
  }

  if (topic === "g1_compare_2digit") {
    const a = randInt(10, 99);
    let b = randInt(10, 99);
    if (Math.random() < 0.25) b = a;
    const ans = a > b ? ">" : a < b ? "<" : "=";
    return {
      question: `Điền dấu thích hợp vào chỗ trống: ${a} ... ${b}`,
      options: [">", "<", "="],
      answer: ans,
      hint: "So hàng chục trước; hàng chục bằng nhau thì mới so hàng đơn vị!",
      explanation: `${a} ${ans} ${b}.`,
    };
  }

  if (topic === "g1_length_cm") {
    const kieu = randInt(0, 2);
    if (kieu === 0) {
      const a = randInt(3, 12);
      const b = randInt(2, 9);
      return {
        question: `Đoạn thẳng AB dài ${a} cm, đoạn thẳng BC dài ${b} cm. Hỏi đoạn thẳng AC (nối tiếp) dài bao nhiêu xăng-ti-mét?`,
        options: generateOptions(a + b, 3).map((x) => Math.max(1, x)),
        answer: a + b,
        hint: "Nối tiếp nhau thì cộng hai độ dài lại!",
        explanation: `${a} + ${b} = ${a + b} cm.`,
      };
    }
    if (kieu === 1) {
      const a = randInt(8, 15);
      const b = randInt(2, 7);
      return {
        question: `Băng giấy dài ${a} cm, cắt đi ${b} cm. Hỏi băng giấy còn lại dài bao nhiêu xăng-ti-mét?`,
        options: generateOptions(a - b, 3).map((x) => Math.max(1, x)),
        answer: a - b,
        hint: "Cắt đi thì làm phép trừ!",
        explanation: `${a} - ${b} = ${a - b} cm.`,
      };
    }
    return {
      question: "Đơn vị dùng để đo độ dài trong lớp học là gì?",
      options: shuffle([
        "xăng-ti-mét (cm)",
        "ki-lô-gam (kg)",
        "lít (l)",
        "giờ",
      ]),
      answer: "xăng-ti-mét (cm)",
      hint: "Độ dài là ngắn dài; đo bằng thước kẻ có vạch xăng-ti-mét!",
      explanation: "Đo độ dài bằng xăng-ti-mét (cm).",
    };
  }

  if (topic === "g1_review_hk1")
    return pickFromGrade(
      1,
      [
        "g1_count",
        "g1_compare",
        "g1_add_sub_10",
        "g1_shapes",
        "g1_shapes_3d",
        "g1_position",
      ],
      depth,
    );

  // ── Lớp 4 (tiếp) ────────────────────────────────────────────────────────
  if (topic === "g4_geometry_angles") {
    const kieu = randInt(0, 2);
    if (kieu === 0) {
      const cauHoi = [
        {
          q: "Góc bé hơn góc vuông gọi là gì?",
          a: "góc nhọn",
          sai: ["góc tù", "góc bẹt", "góc vuông"],
        },
        {
          q: "Góc lớn hơn góc vuông và bé hơn góc bẹt gọi là gì?",
          a: "góc tù",
          sai: ["góc nhọn", "góc vuông", "góc bẹt"],
        },
        {
          q: "Góc bằng hai góc vuông gọi là gì?",
          a: "góc bẹt",
          sai: ["góc nhọn", "góc tù", "góc vuông"],
        },
      ];
      const chon = cauHoi[randInt(0, cauHoi.length - 1)];
      return {
        question: chon.q,
        options: shuffle([chon.a, ...chon.sai]),
        answer: chon.a,
        hint: "Lấy góc vuông của ô li trong vở làm mốc để so!",
        explanation: `Đáp án đúng: ${chon.a}.`,
      };
    }
    if (kieu === 1)
      return {
        question:
          "Hai đường thẳng cắt nhau tạo thành bốn góc vuông. Hai đường thẳng đó gọi là gì?",
        options: shuffle([
          "hai đường thẳng vuông góc",
          "hai đường thẳng song song",
          "hai đường thẳng cắt nhau",
          "hai đường thẳng trùng nhau",
        ]),
        answer: "hai đường thẳng vuông góc",
        hint: "Vuông góc là cắt nhau tạo thành góc vuông!",
        explanation: "Hai đường thẳng vuông góc tạo thành bốn góc vuông.",
      };
    return {
      question:
        "Hai đường thẳng không bao giờ cắt nhau, dù kéo dài mãi, gọi là gì?",
      options: shuffle([
        "hai đường thẳng song song",
        "hai đường thẳng vuông góc",
        "hai đường thẳng cắt nhau",
        "hai đường thẳng xiên nhau",
      ]),
      answer: "hai đường thẳng song song",
      hint: "Hãy nhớ hai thanh ray đường tàu — chúng song song!",
      explanation: "Hai đường thẳng song song không bao giờ cắt nhau.",
    };
  }

  if (topic === "g4_area_units") {
    const kieu = randInt(0, 1);
    if (kieu === 0)
      return {
        question: "1 m² bằng bao nhiêu đề-xi-mét vuông?",
        options: shuffle([100, 10, 1000, 10000]),
        answer: 100,
        hint: "1 m = 10 dm, nên 1 m² = 10 × 10 dm²!",
        explanation: "1 m² = 100 dm².",
      };
    const n = randInt(2, 9);
    return {
      question: `Đổi: ${n} m² = ... dm²`,
      options: shuffle([n * 100, n * 10, n * 1000, n * 10000]),
      answer: n * 100,
      hint: "1 m² = 100 dm², nên lấy số mét vuông nhân với 100!",
      explanation: `${n} m² = ${n * 100} dm².`,
    };
  }

  if (topic === "g4_km2") {
    const kieu = randInt(0, 2);
    if (kieu === 0)
      return {
        question: "1 km² bằng bao nhiêu mét vuông?",
        options: shuffle([1000000, 1000, 10000, 100000]),
        answer: 1000000,
        hint: "1 km = 1000 m, nên 1 km² = 1000 × 1000 m²!",
        explanation: "1 km² = 1 000 000 m².",
      };
    if (kieu === 1) {
      const n = randInt(2, 9);
      return {
        question: `Đổi: ${n} km² = ... m²`,
        options: shuffle([n * 1000000, n * 1000, n * 10000, n * 100000]),
        answer: n * 1000000,
        hint: "1 km² = 1 000 000 m²!",
        explanation: `${n} km² = ${n * 1000000} m².`,
      };
    }
    const a = randInt(3, 9);
    const b = randInt(2, a - 1);
    return {
      question: `Một khu rừng hình chữ nhật dài ${a} km, rộng ${b} km. Diện tích khu rừng là bao nhiêu ki-lô-mét vuông?`,
      options: generateOptions(a * b, 3).map((x) => Math.max(1, x)),
      answer: a * b,
      hint: "Diện tích hình chữ nhật = chiều dài × chiều rộng!",
      explanation: `S = ${a} × ${b} = ${a * b} km².`,
    };
  }

  if (topic === "g4_map_scale") {
    const tiLe = [100, 200, 500, 1000][randInt(0, 3)];
    const kieu = randInt(0, 1);
    if (kieu === 0) {
      const trenBan = randInt(2, 9);
      const thuc = trenBan * tiLe;
      return {
        question: `Bản đồ có tỉ lệ 1 : ${tiLe}. Trên bản đồ đoạn đường dài ${trenBan} cm. Hỏi trên thực tế đoạn đường dài bao nhiêu xăng-ti-mét?`,
        options: generateOptions(thuc, tiLe).map((x) => Math.max(1, x)),
        answer: thuc,
        hint: `Tỉ lệ 1 : ${tiLe} nghĩa là 1 cm trên bản đồ ứng với ${tiLe} cm thực tế!`,
        explanation: `${trenBan} × ${tiLe} = ${thuc} cm trên thực tế.`,
      };
    }
    const trenBan = randInt(2, 8);
    return {
      question: `Bản đồ ghi tỉ lệ 1 : ${tiLe}. Hỏi 1 cm trên bản đồ ứng với bao nhiêu xăng-ti-mét trên thực tế?`,
      options: shuffle([tiLe, tiLe / 2, tiLe * 10, trenBan]),
      answer: tiLe,
      hint: "Tỉ lệ 1 : a nghĩa là 1 đơn vị trên bản đồ = a đơn vị thực tế.",
      explanation: `1 cm trên bản đồ ứng với ${tiLe} cm trên thực tế.`,
    };
  }

  // ── Lớp 5 (tiếp) ────────────────────────────────────────────────────────
  if (topic === "g5_area_units") {
    const bang = [
      { donVi: "dam²", heSo: 100 },
      { donVi: "hm²", heSo: 10000 },
      { donVi: "ha", heSo: 10000 },
    ];
    const chon = bang[randInt(0, bang.length - 1)];
    const n = randInt(2, 9);
    return {
      question: `Đổi: ${n} ${chon.donVi} = ... m²`,
      options: shuffle([
        n * chon.heSo,
        n * chon.heSo * 10,
        (n * chon.heSo) / 10,
        n * chon.heSo * 100,
      ]).map((x) => Math.round(x)),
      answer: n * chon.heSo,
      hint: "1 dam² = 100 m² · 1 hm² = 10 000 m² · 1 ha = 10 000 m²!",
      explanation: `${n} ${chon.donVi} = ${n * chon.heSo} m².`,
    };
  }

  // ── LƯỚI AN TOÀN CUỐI CÙNG ───────────────────────────────────────────────
  // KHÔNG trả một câu cố định nữa. Đã ĐO được hậu quả của bản cũ: 9/57 khuôn thiếu
  // nhánh nên bé nhận ĐÚNG một câu "Tính: 10 + 5 = ?" lặp lại mãi. Rút ngẫu nhiên
  // một khuôn khác của cùng lớp vừa hữu ích vừa không bao giờ để lộ câu vô nghĩa.
  // `depth` chặn đệ quy vô hạn nếu cả lớp đều thiếu nhánh.
  if (depth < 3) return pickFromGrade(gNum, null, depth + 1);
  return {
    question: `Tính nhẩm: ${gNum * 2} + ${gNum * 3} = ?`,
    options: generateOptions(gNum * 5, gNum),
    answer: gNum * 5,
    hint: "Cộng từng hàng một, bắt đầu từ hàng đơn vị!",
    explanation: `${gNum * 2} + ${gNum * 3} = ${gNum * 5}.`,
  };
}

/**
 * Sinh 1 câu hỏi, kèm `ref` (danh tính câu hỏi) và `topic` (kỹ năng).
 *
 * VÌ SAO CÓ `ref`: GĐ 2b ghi từng lượt trả lời vào `question_attempts` để trả lời
 * "khuôn nào hỏng / kỹ năng nào yếu". Câu sinh tự động KHÔNG có danh tính riêng —
 * mỗi câu chỉ tồn tại đúng 1 lần, nên đánh id cho từng câu là vô nghĩa. Cái có thể
 * hỏng là KHUÔN sinh câu, và khuôn chính là `topic`. Đánh id theo khuôn vừa đúng
 * bản chất, vừa trả lời thẳng được câu hỏi "kỹ năng nào yếu".
 *
 * Bọc hàm thay vì sửa từng `return` trong `buildQuestion`: hàm đó có hàng chục
 * nhánh, sửa từng nhánh là cách chắc chắn để sót.
 */
/**
 * Bảo đảm `options` KHÔNG có hai lựa chọn giống hệt nhau, và luôn chứa đáp án.
 *
 * 🔴 VÌ SAO CẦN MỘT CHỖ THAY VÌ SỬA TỪNG KHUÔN. Đo được **13/79 khuôn** sinh ra hai ô
 * giống hệt nhau — bé nhìn thấy hai đáp án y như nhau. Nguyên nhân có hai loại:
 *   1. Khuôn tự viết mảng lựa chọn bằng chuỗi (`"11 giờ", "12 giờ", "10 giờ", "12 giờ"`)
 *      → trùng khi hai giá trị tính ra bằng nhau.
 *   2. `.map(Math.max(1, x))` kéo một lựa chọn 0 thành 1, đụng vào lựa chọn 1 đã có.
 * `generateOptions` tự nó an toàn (`Set`), nhưng 13 khuôn kia không đi qua nó.
 * Sửa ở đây thì mọi khuôn hiện có VÀ mọi khuôn viết sau đều được bảo vệ.
 *
 * Không đòi đúng 4 lựa chọn: đáp án là CHUỖI thì không bù được cho an toàn, mà 2–3
 * lựa chọn vẫn là câu hỏi hợp lệ. Chỉ bù khi đáp án là SỐ.
 */
function withDistinctOptions(q) {
  if (!q || !Array.isArray(q.options)) return q;
  const key = (v) => String(v);
  const distinct = [];
  for (const o of q.options)
    if (!distinct.some((d) => key(d) === key(o))) distinct.push(o);
  // Đáp án phải LUÔN nằm trong lựa chọn — cổng `S-15` và bộ chấm điểm đều dựa vào đó.
  if (!distinct.some((d) => key(d) === key(q.answer)))
    distinct.unshift(q.answer);
  if (distinct.length < 3 && typeof q.answer === "number") {
    for (let offset = 1; offset < 60 && distinct.length < 4; offset++)
      for (const cand of [q.answer + offset, q.answer - offset])
        if (cand >= 0 && !distinct.some((d) => key(d) === key(cand)))
          distinct.push(cand);
  }
  return { ...q, options: shuffle(distinct) };
}

export function generateQuestion(grade = 1, topicId = null) {
  const gNum = Number(grade);
  const list = TOPICS[`GRADE_${gNum}`] || TOPICS.GRADE_1;
  const topic = topicId || list[randInt(0, list.length - 1)].id;
  const q = buildQuestion(gNum, topic);
  return { ...withDistinctOptions(q), ref: `tmpl:${topic}`, topic };
}

// Tên cũ của hàm này là `generateCalculation`. Đổi thành `buildCalculation` (nội bộ)
// ở GĐ 2b-2 để bọc thêm `ref` bên ngoài mà không phải đụng vào thân hàm.
function buildCalculation(grade = 1) {
  const g = Number(grade);
  if (g === 1) {
    const isAdd = Math.random() > 0.4;
    if (isAdd) {
      const a = randInt(1, 9);
      const b = randInt(1, Math.min(10 - a, 9));
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    } else {
      const a = randInt(2, 10);
      const b = randInt(1, a - 1);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    }
  } else if (g === 2) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(12, 49);
      const b = randInt(11, 49);
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(30, 95);
      const b = randInt(11, a - 10);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = [2, 5][randInt(0, 1)];
      const b = randInt(2, 9);
      const ans = a * b;
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 4),
        answer: ans,
      };
    } else {
      const a = [2, 5][randInt(0, 1)];
      const ans = randInt(2, 9);
      const dividend = a * ans;
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    }
  } else if (g === 3) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(110, 480);
      const b = randInt(110, 480);
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(300, 950);
      const b = randInt(110, a - 100);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = [6, 7, 8, 9][randInt(0, 3)];
      const b = randInt(3, 9);
      const ans = a * b;
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 6),
        answer: ans,
      };
    } else {
      const a = [6, 7, 8, 9][randInt(0, 3)];
      const ans = randInt(3, 9);
      const dividend = a * ans;
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 4),
        answer: ans,
      };
    }
  } else if (g === 4) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(1200, 8500);
      const b = randInt(1200, 8500);
      const ans = a + b;
      return {
        question: `${a.toLocaleString("vi-VN")} + ${b.toLocaleString("vi-VN")} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(5000, 9900);
      const b = randInt(1000, 4500);
      const ans = a - b;
      return {
        question: `${a.toLocaleString("vi-VN")} - ${b.toLocaleString("vi-VN")} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = randInt(15, 65);
      const ans = a * 11;
      return {
        question: `${a} × 11 = ?`,
        equation: `${a} × 11`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else {
      const a = randInt(120, 840);
      const b = [2, 3, 4, 5, 6][randInt(0, 4)];
      const rounded = a - (a % b);
      const ans = rounded / b;
      return {
        question: `${rounded} : ${b} = ?`,
        equation: `${rounded} : ${b}`,
        options: generateOptions(ans, 10),
        answer: ans,
      };
    }
  } else {
    // Grade 5
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = (randInt(15, 65) / 10).toFixed(1);
      const b = (randInt(12, 35) / 10).toFixed(1);
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
      return {
        question: `${a.replace(".", ",")} + ${b.replace(".", ",")} = ?`,
        equation: `${a.replace(".", ",")} + ${b.replace(".", ",")}`,
        options: shuffle([
          ans.replace(".", ","),
          (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
        ]),
        answer: ans.replace(".", ","),
      };
    } else {
      const a = randInt(2, 8);
      const ans = a * 10;
      return {
        question: `${a},5 × 10 = ?`,
        equation: `${a},5 × 10`,
        options: generateOptions(ans + 5, 5),
        answer: ans + 5,
      };
    }
  }
}

// Ký hiệu phép tính → tên kỹ năng. Dùng để suy `topic` từ `equation`.
const CALC_OP = { "+": "add", "-": "sub", "×": "mul", ":": "div" };

/**
 * Sinh 1 câu tính toán cho mini game, kèm `ref` (danh tính câu hỏi) và `topic`.
 *
 * Cùng lý do với `generateQuestion`: mini game cần ghi từng lượt trả lời vào
 * `question_attempts` để biết khuôn nào hỏng, kỹ năng nào yếu.
 *
 * VÌ SAO SUY TỪ `equation` MÀ KHÔNG SỬA TỪNG `return`: `buildCalculation` có **16 chỗ
 * `return`** trải trên 5 nhánh lớp. Sửa từng chỗ là cách chắc chắn để sót một chỗ, và
 * chỗ bị sót sẽ lặng lẽ ghi ra dòng thiếu `ref` mà không ai biết cho tới lúc đọc số liệu.
 * Mọi nhánh đều trả về `equation`, và mỗi câu chỉ chứa MỘT phép tính → suy ra từ chính
 * kết quả là đủ, và tự đúng cho cả những nhánh thêm sau này.
 *
 * Nhánh lạ (không khớp ký hiệu nào) rơi về `other` — không sập, chỉ thô hơn. Nhưng
 * `TC-2.24` khẳng định điều đó KHÔNG xảy ra với 5 lớp hiện có.
 */
export function generateCalculation(grade = 1) {
  const g = Number(grade);
  const q = buildCalculation(g);
  const symbol = Object.keys(CALC_OP).find((s) => q.equation.includes(s));
  const topic = `calc_g${g}_${CALC_OP[symbol] ?? "other"}`;
  return { ...withDistinctOptions(q), ref: `tmpl:${topic}`, topic };
}
