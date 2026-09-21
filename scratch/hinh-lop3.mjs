// Dữ liệu HÌNH cho LỚP 3 — 123 bài.
//
// Lớp 3 dùng thêm mấy bộ vẽ mà Lớp 1–2 chưa cần:
//   • `angle`       — góc vuông / góc không vuông (Bài "Góc và góc vuông")
//   • `circleParts` — tâm, bán kính, đường kính (Bài "Hình tròn")
//   • `fractionBar` — "một phần mấy" (1/3 của 12…)
//   • `planeShape` kèm `formula` — chu vi và diện tích (Lớp 3 mới học)
//   • `money`       — tiền Việt Nam tới 200 000 đồng
//   • `barChart`    — biểu đồ tranh (thống kê)

export const SPECS_LOP3 = {
  // ═══ Chủ đề 1: Ôn tập và bổ sung ═══
  "g3-c1-l1": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [4, 7, 5],
      label: "475 = 400 + 70 + 5",
    },
    numberLine: {
      from: 999,
      to: 1000,
      step: 1,
      marks: [999, 1000],
      label: "999 rồi đến 1000",
    },
  },
  "g3-c1-l2": {
    operation: { left: 356, sign: "+", right: 127, result: 483 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["356 + 127", "483 (6+7=13 viết 3 nhớ 1)"],
        ["534 − 268", "266 (mượn hai lần)"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 1 000",
    },
  },
  "g3-c1-l3": {
    operation: { left: 175, sign: "+", right: 145, result: 320 },
    numberLine: {
      from: 145,
      to: 320,
      step: 5,
      marks: [145, 175, 320],
      hops: [{ from: 145, to: 320, label: "+175" }],
      label: "? + 145 = 320 ⇒ ? = 320 − 145 = 175",
    },
  },
  "g3-c1-l4": {
    operation: { left: 500, sign: "−", right: 260, result: 240 },
    table: {
      headers: ["Tìm gì", "Cách làm"],
      rows: [
        ["500 − ? = 260", "? = 500 − 260 = 240"],
        ["? − 130 = 70", "? = 70 + 130 = 200"],
      ],
      label: "Tìm thành phần trong phép trừ",
    },
  },
  "g3-c1-l5": {
    numberLine: {
      from: 2,
      to: 18,
      step: 2,
      marks: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      label: "Đếm thêm 2 rồi đếm thêm 5",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["2 × 7", "14"],
        ["2 × 9", "18"],
        ["5 × 6", "30"],
        ["5 × 8", "40"],
      ],
      label: "Ôn tập bảng nhân 2 và bảng nhân 5",
    },
  },
  "g3-c1-l6": {
    operation: { left: 40, sign: ":", right: 5, result: 8 },
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["14 : 2", "7"],
        ["40 : 5", "8"],
      ],
      label: "Ôn tập bảng chia 2 và bảng chia 5",
    },
  },
  "g3-c1-l7": {
    numberLine: {
      from: 3,
      to: 30,
      step: 3,
      marks: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
      label: "Đếm thêm 3: 3 · 6 · 9 · … · 30",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["3 × 1", "3"],
        ["3 × 4", "12"],
        ["3 × 7", "21"],
        ["3 × 10", "30"],
      ],
      label: "Bảng nhân 3",
    },
  },
  "g3-c1-l8": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["3 : 3", "1"],
        ["6 : 3", "2"],
        ["9 : 3", "3"],
        ["12 : 3", "4"],
        ["15 : 3", "5"],
        ["18 : 3", "6"],
        ["21 : 3", "7"],
        ["24 : 3", "8"],
        ["27 : 3", "9"],
        ["30 : 3", "10"],
      ],
      label: "Bảng chia 3",
    },
    operation: { left: 12, sign: ":", right: 3, result: 4 },
  },
  "g3-c1-l9": {
    numberLine: {
      from: 4,
      to: 40,
      step: 4,
      marks: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
      label: "Đếm thêm 4: 4 · 8 · 12 · … · 40",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["4 × 1", "4"],
        ["4 × 5", "20"],
        ["4 × 8", "32"],
        ["4 × 10", "40"],
      ],
      label: "Bảng nhân 4",
    },
  },
  "g3-c1-l10": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["4 : 4", "1"],
        ["8 : 4", "2"],
        ["12 : 4", "3"],
        ["16 : 4", "4"],
        ["20 : 4", "5"],
        ["24 : 4", "6"],
        ["28 : 4", "7"],
        ["32 : 4", "8"],
        ["36 : 4", "9"],
        ["40 : 4", "10"],
      ],
      label: "Bảng chia 4",
    },
    operation: { left: 24, sign: ":", right: 4, result: 6 },
  },
  "g3-c1-l11": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 dm", "10 cm"],
        ["1 m", "100 cm"],
        ["1 km", "1 000 m"],
      ],
      label: "Ôn tập đo độ dài — túi gạo nặng 5 kg, chai nước chứa 2 l",
    },
    planeShape: {
      kind: "square",
      formula: "▢ hình vuông · 🔺 hình tam giác · ▭ hình chữ nhật",
    },
  },
  "g3-c1-l12": {
    operation: { left: 3, sign: "×", right: 4, result: 12 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["3 × 4", "12"],
        ["12 : 3", "4"],
        ["4 × 6", "24"],
        ["24 : 4", "6"],
      ],
      label: "Luyện tập chung chủ đề 1",
    },
  },

  // ═══ Chủ đề 2: Bảng nhân, bảng chia ═══
  "g3-c2-l1": {
    numberLine: {
      from: 6,
      to: 60,
      step: 6,
      marks: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
      label: "Đếm thêm 6: 6 · 12 · 18 · … · 60",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["6 × 1", "6"],
        ["6 × 5", "30"],
        ["6 × 8", "48"],
        ["6 × 10", "60"],
      ],
      label: "Bảng nhân 6",
    },
  },
  "g3-c2-l2": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["6 : 6", "1"],
        ["12 : 6", "2"],
        ["18 : 6", "3"],
        ["24 : 6", "4"],
        ["30 : 6", "5"],
        ["36 : 6", "6"],
        ["42 : 6", "7"],
        ["48 : 6", "8"],
        ["54 : 6", "9"],
        ["60 : 6", "10"],
      ],
      label: "Bảng chia 6",
    },
    operation: { left: 42, sign: ":", right: 6, result: 7 },
  },
  "g3-c2-l3": {
    numberLine: {
      from: 7,
      to: 70,
      step: 7,
      marks: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
      label: "Đếm thêm 7: 7 · 14 · 21 · … · 70",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["7 × 1", "7"],
        ["7 × 5", "35"],
        ["7 × 8", "56"],
        ["7 × 10", "70"],
      ],
      label: "Bảng nhân 7",
    },
  },
  "g3-c2-l4": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["7 : 7", "1"],
        ["14 : 7", "2"],
        ["21 : 7", "3"],
        ["28 : 7", "4"],
        ["35 : 7", "5"],
        ["42 : 7", "6"],
        ["49 : 7", "7"],
        ["56 : 7", "8"],
        ["63 : 7", "9"],
        ["70 : 7", "10"],
      ],
      label: "Bảng chia 7",
    },
    operation: { left: 42, sign: ":", right: 7, result: 6 },
  },
  "g3-c2-l5": {
    numberLine: {
      from: 8,
      to: 80,
      step: 8,
      marks: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
      label: "Đếm thêm 8: 8 · 16 · 24 · … · 80",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["8 × 1", "8"],
        ["8 × 5", "40"],
        ["8 × 8", "64"],
        ["8 × 10", "80"],
      ],
      label: "Bảng nhân 8",
    },
  },
  "g3-c2-l6": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["8 : 8", "1"],
        ["16 : 8", "2"],
        ["24 : 8", "3"],
        ["32 : 8", "4"],
        ["40 : 8", "5"],
        ["48 : 8", "6"],
        ["56 : 8", "7"],
        ["64 : 8", "8"],
        ["72 : 8", "9"],
        ["80 : 8", "10"],
      ],
      label: "Bảng chia 8",
    },
    operation: { left: 48, sign: ":", right: 8, result: 6 },
  },
  "g3-c2-l7": {
    numberLine: {
      from: 9,
      to: 90,
      step: 9,
      marks: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
      label: "Đếm thêm 9: 9 · 18 · 27 · … · 90",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["9 × 1", "9"],
        ["9 × 5", "45"],
        ["9 × 7", "63"],
        ["9 × 10", "90"],
      ],
      label: "Bảng nhân 9",
    },
  },
  "g3-c2-l8": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["9 : 9", "1"],
        ["18 : 9", "2"],
        ["27 : 9", "3"],
        ["36 : 9", "4"],
        ["45 : 9", "5"],
        ["54 : 9", "6"],
        ["63 : 9", "7"],
        ["72 : 9", "8"],
        ["81 : 9", "9"],
        ["90 : 9", "10"],
      ],
      label: "Bảng chia 9",
    },
    operation: { left: 63, sign: ":", right: 9, result: 7 },
  },
  "g3-c2-l9": {
    operation: { left: 6, sign: "×", right: 7, result: 42 },
    table: {
      headers: ["Tìm gì", "Cách làm"],
      rows: [
        ["? × 7 = 42", "? = 42 : 7 = 6"],
        ["? : 6 = 5", "? = 5 × 6 = 30"],
        ["36 : ? = 4", "? = 36 : 4 = 9"],
      ],
      label: "Tìm thành phần trong phép nhân, phép chia",
    },
  },
  "g3-c2-l10": {
    fractionBar: {
      parts: 3,
      shaded: 1,
      label: "1/3 của 12 = 12 : 3 = 4",
    },
    fractionCircle: {
      parts: 4,
      shaded: 1,
      label: "1/4 của 20 = 20 : 4 = 5",
    },
  },
  "g3-c2-l11": {
    operation: { left: 8, sign: "×", right: 8, result: 64 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["8 × 8", "64"],
        ["64 : 8", "8"],
        ["9 × 7", "63"],
        ["63 : 9", "7"],
      ],
      label: "Luyện tập chung chủ đề 2",
    },
  },

  // ═══ Chủ đề 3: Hình phẳng, hình khối ═══
  "g3-c3-l1": {
    ruler: {
      lengthCm: 8,
      measure: { from: 0, to: 8 },
      label:
        "A · O · B thẳng hàng theo thứ tự A, O, B ⇒ O là điểm ở giữa A và B",
    },
  },
  "g3-c3-l2": {
    ruler: {
      lengthCm: 8,
      measure: { from: 0, to: 4 },
      label: "M là trung điểm của AB khi M nằm giữa A, B và AM = MB",
    },
  },
  "g3-c3-l3": {
    circleParts: {
      radius: 3,
      diameter: 6,
      showCenter: true,
      showCircumference: true,
      label: "Đường kính = 2 × bán kính (d = 2 × r)",
    },
  },
  "g3-c3-l4": {
    angle: {
      kind: "right",
      degrees: 90,
      label: "Góc vuông — đặt ê-ke khớp đúng",
    },
    table: {
      headers: ["Đỉnh", "Cạnh"],
      rows: [["A", "AB và AC"]],
      label:
        "Góc đỉnh A, cạnh AB và AC — bốn góc của hình chữ nhật đều là góc vuông",
    },
  },
  "g3-c3-l5": {
    angle: {
      kind: "acute",
      degrees: 45,
      label: "Góc không vuông — ê-ke không khớp",
    },
    table: {
      headers: ["Góc", "Ê-ke"],
      rows: [
        ["Vuông", "khớp"],
        ["Không vuông", "không khớp"],
      ],
      label: "Phân biệt góc vuông và góc không vuông",
    },
  },
  "g3-c3-l6": {
    planeShape: {
      kind: "triangle",
      labels: ["cạnh", "cạnh"],
      formula: "3 cạnh · 3 đỉnh · 3 góc",
    },
    table: {
      headers: ["Hình", "Cạnh", "Đỉnh", "Góc"],
      rows: [
        ["Tam giác", 3, 3, 3],
        ["Tứ giác", 4, 4, 4],
      ],
      label: "Hình tam giác và hình tứ giác",
    },
  },
  "g3-c3-l7": {
    planeShape: {
      kind: "square",
      labels: ["cạnh"],
      formula: "4 góc vuông · 4 cạnh bằng nhau",
    },
    table: {
      headers: ["Hình", "Đặc điểm"],
      rows: [
        [
          "Hình chữ nhật",
          "4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau",
        ],
        ["Hình vuông", "4 góc vuông, 4 cạnh bằng nhau"],
      ],
      label: "Hình chữ nhật và hình vuông",
    },
  },
  "g3-c3-l8": {
    planeShape: {
      kind: "square",
      labels: ["4 cm"],
      formula: "Vẽ hình vuông cạnh 4 cm bằng ê-ke",
    },
    circleParts: {
      radius: 3,
      showCenter: true,
      label: "Dùng compa để vẽ đường tròn",
    },
  },
  "g3-c3-l9": {
    solid: {
      kind: "cube",
      dims: { a: 3 },
      label: "Khối lập phương",
      formula: "6 mặt vuông bằng nhau",
    },
    table: {
      headers: ["Khối", "Mặt"],
      rows: [
        ["Khối lập phương", "6 mặt vuông bằng nhau"],
        ["Khối hộp chữ nhật", "6 mặt không đều nhau"],
      ],
      label: "Cả hai đều có 6 mặt, 8 đỉnh và 12 cạnh",
    },
  },
  "g3-c3-l10": {
    circleParts: { radius: 3, diameter: 6, label: "d = 2 × r" },
    planeShape: { kind: "square", formula: "4 góc vuông · 4 cạnh bằng nhau" },
  },

  // ═══ Chủ đề 4: Nhân, chia trong phạm vi 100 ═══
  "g3-c4-l1": {
    operation: { left: 32, sign: "×", right: 3, result: 96 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 2],
      label: "32 × 3: 2 × 3 = 6, viết 6; 3 × 3 = 9, viết 9",
    },
  },
  "g3-c4-l2": {
    operation: { left: 26, sign: "×", right: 3, result: 78 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [2, 6],
      label: "26 × 3: 6 × 3 = 18 viết 8 nhớ 1; 2 × 3 = 6 thêm 1 = 7",
    },
  },
  "g3-c4-l3": {
    numberLine: {
      from: 4,
      to: 12,
      step: 4,
      marks: [4, 8, 12],
      hops: [{ from: 4, to: 12, label: "gấp 3 lần" }],
      label: "4 cm gấp 3 lần là 4 × 3 = 12 cm",
    },
    operation: { left: 4, sign: "×", right: 3, result: 12 },
  },
  "g3-c4-l4": {
    operation: { left: 12, sign: ":", right: 3, result: 4 },
    table: {
      headers: ["Phép chia", "Thử lại"],
      rows: [["12 : 3 = 4 (không dư)", "4 × 3 = 12"]],
      label: "Phép chia hết — mỗi bạn 4 chiếc kẹo, không thừa chiếc nào",
    },
  },
  "g3-c4-l5": {
    operation: { left: 13, sign: ":", right: 3, result: 4 },
    table: {
      headers: ["Phép chia", "Thử lại"],
      rows: [["13 : 3 = 4 (dư 1)", "4 × 3 + 1 = 13"]],
      label: "Phép chia có dư — mười ba chia ba bằng bốn, dư một",
    },
  },
  "g3-c4-l6": {
    operation: { left: 48, sign: ":", right: 4, result: 12 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [4, 8],
      label: "48 : 4: 4 : 4 = 1; 8 : 4 = 2 ⇒ 12",
    },
  },
  "g3-c4-l7": {
    numberLine: {
      from: 4,
      to: 12,
      step: 4,
      marks: [4, 8, 12],
      hops: [{ from: 12, to: 4, label: "giảm 3 lần" }],
      label: "12 cm giảm 3 lần là 12 : 3 = 4 cm",
    },
    table: {
      headers: ["Thao tác", "Kết quả"],
      rows: [
        ["Gấp lên 3 lần", "4 × 3 = 12"],
        ["Giảm đi 3 lần", "12 : 3 = 4"],
      ],
      label: "Gấp lên và giảm đi",
    },
  },
  "g3-c4-l8": {
    operation: { left: 8, sign: "+", right: 12, result: 20 },
    barModel: {
      rows: [
        { label: "Hàng trên", parts: 8 },
        { label: "Hàng dưới", parts: 12 },
      ],
      braceLabel: "Cả hai hàng: 8 + 12 = 20 quả",
    },
  },
  "g3-c4-l9": {
    operation: { left: 19, sign: ":", right: 3, result: 6 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["1", "3 × 6 = 18 (không vượt quá 19)"],
        ["2", "Số dư = 19 − 18 = 1"],
        ["Kết quả", "19 : 3 = 6 (dư 1)"],
      ],
      label: "Luyện tập phép chia có dư",
    },
  },
  "g3-c4-l10": {
    operation: { left: 26, sign: "×", right: 3, result: 78 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["26 × 3", "78"],
        ["48 : 4", "12"],
        ["19 : 3", "6 (dư 1)"],
      ],
      label: "Luyện tập chung chủ đề 4",
    },
  },

  // ═══ Chủ đề 5: Đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ ═══
  "g3-c5-l1": {
    ruler: {
      lengthCm: 10,
      measure: { from: 0, to: 10 },
      label: "1 cm = 10 mm",
    },
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 cm", "10 mm"],
        ["1 m", "1 000 mm"],
      ],
      label: "Mi-li-mét (mm)",
    },
  },
  "g3-c5-l2": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 kg", "1 000 g"],
        ["500 g + 500 g", "1 kg"],
      ],
      label: "Gam (g) — đơn vị đo khối lượng",
    },
  },
  "g3-c5-l3": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 l", "1 000 ml"],
        ["2 l", "2 000 ml"],
      ],
      label: "Mi-li-lít (ml) — đơn vị đo dung tích",
    },
  },
  "g3-c5-l4": {
    table: {
      headers: ["Hiện tượng", "Nhiệt độ"],
      rows: [
        ["Nước đá đang tan", "0 °C"],
        ["Cơ thể người bình thường", "37 °C"],
        ["Nước sôi", "100 °C"],
      ],
      label: "Nhiệt độ và đơn vị đo nhiệt độ (độ C)",
    },
  },
  "g3-c5-l5": {
    table: {
      headers: ["Nhiệt kế chỉ", "Nghĩa là"],
      rows: [
        ["36 °C", "bình thường"],
        ["37 °C", "bình thường"],
        ["39 °C", "có thể bị sốt"],
      ],
      label: "Đọc nhiệt kế — 1 °C = 1 độ C",
    },
  },
  "g3-c5-l6": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Bề dày quyển vở khoảng 5 mm",
    },
    table: {
      headers: ["Đơn vị", "Đo cái gì"],
      rows: [
        ["mm", "bề dày: quyển vở"],
        ["g", "vật nhẹ: viên kẹo"],
        ["ml", "chất lỏng ít: hộp sữa 180 ml"],
        ["°C", "nhiệt độ: trà nóng 70 °C"],
      ],
      label: "Thực hành với mm, g, ml, °C",
    },
  },
  "g3-c5-l7": {
    table: {
      headers: ["Quan hệ", "Bằng"],
      rows: [
        ["1 cm", "10 mm"],
        ["1 m", "100 cm = 1 000 mm"],
        ["1 km", "1 000 m"],
        ["1 kg", "1 000 g"],
        ["1 l", "1 000 ml"],
      ],
      label: "Bảng quan hệ giữa các đơn vị đo",
    },
  },
  "g3-c5-l8": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 kg", "1 000 g"],
        ["1 l", "1 000 ml"],
        ["1 cm", "10 mm"],
        ["1 m", "1 000 mm"],
      ],
      label: "Luyện tập chung chủ đề 5",
    },
  },

  // ═══ Chủ đề 6: Nhân, chia trong phạm vi 1 000 ═══
  "g3-c6-l1": {
    operation: { left: 213, sign: "×", right: 3, result: 639 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 1, 3],
      label: "213 × 3: 3 × 3 = 9; 1 × 3 = 3; 2 × 3 = 6",
    },
  },
  "g3-c6-l2": {
    operation: { left: 216, sign: "×", right: 3, result: 648 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 1, 6],
      label: "216 × 3: 6 × 3 = 18 viết 8 nhớ 1; 1 × 3 = 3 thêm 1 = 4",
    },
  },
  "g3-c6-l3": {
    operation: { left: 639, sign: ":", right: 3, result: 213 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [6, 3, 9],
      label: "639 : 3: 6 : 3 = 2; 3 : 3 = 1; 9 : 3 = 3",
    },
  },
  "g3-c6-l4": {
    operation: { left: 640, sign: ":", right: 3, result: 213 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["1", "6 : 3 = 2"],
        ["2", "4 : 3 = 1 dư 1"],
        ["3", "hạ 0 xuống được 10; 10 : 3 = 3 dư 1"],
        ["Kết quả", "640 : 3 = 213 (dư 1)"],
      ],
      label: "Chia số có ba chữ số cho số có một chữ số (có dư)",
    },
  },
  "g3-c6-l5": {
    operation: { left: 12, sign: "+", right: 5, result: 17 },
    table: {
      headers: ["Biểu thức", "Giá trị"],
      rows: [
        ["12 + 5", "17"],
        ["20 − 8", "12"],
      ],
      label: "Biểu thức số",
    },
  },
  "g3-c6-l6": {
    operation: { left: 5, sign: "×", right: 2, result: 10 },
    table: {
      headers: ["Biểu thức", "Tính", "Giá trị"],
      rows: [
        ["12 + 5 × 2", "12 + 10", "22"],
        ["(12 + 5) × 2", "17 × 2", "34"],
      ],
      label:
        "Nhân chia trước, cộng trừ sau — có ngoặc thì làm trong ngoặc trước",
    },
  },
  "g3-c6-l7": {
    operation: { left: 12, sign: ":", right: 3, result: 4 },
    barModel: {
      rows: [
        { label: "Đoạn AB", parts: 12 },
        { label: "Đoạn CD", parts: 3 },
      ],
      braceLabel: "AB gấp 4 lần CD",
    },
  },
  "g3-c6-l8": {
    operation: { left: 213, sign: "×", right: 3, result: 639 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["213 × 3", "639"],
        ["639 : 3", "213"],
        ["12 + 5 × 2", "22"],
      ],
      label: "Luyện tập chung chủ đề 6",
    },
  },

  // ═══ Chủ đề 7: Ôn tập học kì 1 ═══
  "g3-c7-l1": {
    operation: { left: 216, sign: "×", right: 3, result: 648 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["26 × 3", "78"],
        ["216 × 3", "648"],
        ["639 : 3", "213"],
        ["48 : 4", "12"],
      ],
      label: "Ôn tập nhân chia trong phạm vi 100 và 1 000",
    },
  },
  "g3-c7-l2": {
    table: {
      headers: ["Biểu thức", "Giá trị"],
      rows: [
        ["12 + 5 × 2", "22"],
        ["(12 + 5) × 2", "34"],
        ["20 − 8 : 2", "16"],
      ],
      label: "Ôn tập biểu thức số",
    },
  },
  "g3-c7-l3": {
    circleParts: { radius: 3, diameter: 6, label: "Đường kính = 2 × bán kính" },
    planeShape: { kind: "square", formula: "4 góc vuông · 4 cạnh bằng nhau" },
  },
  "g3-c7-l4": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 cm", "10 mm"],
        ["1 m", "1 000 mm"],
        ["1 kg", "1 000 g"],
        ["1 l", "1 000 ml"],
      ],
      label: "Ôn tập đo lường",
    },
  },
  "g3-c7-l5": {
    table: {
      headers: ["Mạch kiến thức", "Ví dụ"],
      rows: [
        ["8 bảng nhân chia", "9 × 7 = 63"],
        ["Nhân chia", "216 × 3 = 648"],
        ["Hình học", "d = 2 × r"],
        ["Đo lường", "1 kg = 1 000 g"],
        ["Biểu thức", "12 + 5 × 2 = 22"],
      ],
      label: "Ôn tập chung học kì 1",
    },
  },

  // ═══ Chủ đề 8: Các số đến 10 000 ═══
  "g3-c8-l1": {
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 7, 5],
      label: "2 475 gồm 2 nghìn, 4 trăm, 7 chục và 5 đơn vị",
    },
  },
  "g3-c8-l2": {
    placeValue: {
      headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [1, 0, 0, 0, 0],
      label: "10 000 = 1 chục nghìn — đọc là mười nghìn",
    },
  },
  "g3-c8-l3": {
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [4, 0, 0, 5],
      label: "4 005 đọc là bốn nghìn không trăm linh năm",
    },
    table: {
      headers: ["Số", "Đọc là"],
      rows: [
        ["2 475", "hai nghìn bốn trăm bảy mươi lăm"],
        ["4 005", "bốn nghìn không trăm linh năm"],
      ],
      label: "Đọc và viết số có bốn chữ số",
    },
  },
  "g3-c8-l4": {
    comparison: { left: 3456, sign: "<", right: 3465 },
    table: {
      headers: ["Hàng", "So sánh"],
      rows: [
        ["Nghìn", "3 = 3"],
        ["Trăm", "4 = 4"],
        ["Chục", "5 < 6"],
      ],
      label: "3 456 < 3 465 vì hàng chục 5 < 6",
    },
  },
  "g3-c8-l5": {
    table: {
      headers: ["Chữ số La Mã", "Giá trị"],
      rows: [
        ["I", 1],
        ["V", 5],
        ["X", 10],
      ],
      label: "Làm quen với chữ số La Mã",
    },
  },
  "g3-c8-l6": {
    table: {
      headers: [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII",
      ],
      rows: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
      label: "Chữ số La Mã từ I đến XII — dùng để ghi giờ và số thứ tự",
    },
  },
  "g3-c8-l7": {
    numberLine: {
      from: 20,
      to: 30,
      step: 1,
      marks: [24, 25, 30],
      hops: [{ from: 24, to: 20, label: "4 < 5 ⇒ xuống" }],
      label: "24 làm tròn đến hàng chục = 20",
    },
    table: {
      headers: ["Làm tròn", "Vì sao"],
      rows: [
        ["24 → 20", "4 < 5, làm tròn xuống"],
        ["27 → 30", "7 ≥ 5, làm tròn lên"],
        ["320 → 300", "2 < 5, làm tròn xuống"],
        ["360 → 400", "6 ≥ 5, làm tròn lên"],
      ],
      label: "Làm tròn số đến hàng chục, hàng trăm",
    },
  },
  "g3-c8-l8": {
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 7, 5],
      label: "2 475 = 2 000 + 400 + 70 + 5",
    },
    table: {
      headers: ["Làm tròn", "Được"],
      rows: [
        ["27 đến hàng chục", "30"],
        ["24 300 đến hàng nghìn", "24 000"],
      ],
      label: "Luyện tập chung chủ đề 8",
    },
  },

  // ═══ Chủ đề 9: Chu vi, diện tích ═══
  "g3-c9-l1": {
    planeShape: {
      kind: "triangle",
      labels: ["3 cm", "4 cm", "5 cm"],
      formula: "Chu vi = 3 + 4 + 5 = 12 cm",
    },
    operation: { left: 7, sign: "+", right: 5, result: 12 },
  },
  "g3-c9-l2": {
    planeShape: {
      kind: "rectangle",
      labels: ["5 cm", "3 cm"],
      formula: "Chu vi = (5 + 3) × 2 = 16 cm",
    },
    operation: { left: 8, sign: "×", right: 2, result: 16 },
  },
  "g3-c9-l3": {
    planeShape: {
      kind: "square",
      labels: ["4 cm"],
      formula: "Chu vi = 4 × 4 = 16 cm",
    },
    operation: { left: 4, sign: "×", right: 4, result: 16 },
  },
  "g3-c9-l4": {
    table: {
      headers: ["Hình", "Số ô vuông"],
      rows: [
        ["Hình A", 9],
        ["Hình B", 6],
      ],
      label: "Diện tích hình A lớn hơn diện tích hình B",
    },
  },
  "g3-c9-l5": {
    planeShape: {
      kind: "square",
      labels: ["1 cm"],
      formula: "1 cm² là diện tích hình vuông cạnh 1 cm",
    },
    table: {
      headers: ["Số ô 1 cm²", "Diện tích"],
      rows: [
        ["1", "1 cm²"],
        ["5", "5 cm²"],
      ],
      label: "Xăng-ti-mét vuông",
    },
  },
  "g3-c9-l6": {
    planeShape: {
      kind: "rectangle",
      labels: ["5 cm", "3 cm"],
      formula: "Diện tích = 5 × 3 = 15 cm²",
    },
    operation: { left: 5, sign: "×", right: 3, result: 15 },
  },
  "g3-c9-l7": {
    planeShape: {
      kind: "square",
      labels: ["4 cm"],
      formula: "Diện tích = 4 × 4 = 16 cm²",
    },
    operation: { left: 4, sign: "×", right: 4, result: 16 },
  },
  "g3-c9-l8": {
    planeShape: {
      kind: "square",
      labels: ["4 cm"],
      formula: "Chu vi 4 × 4 = 16 cm · Diện tích 4 × 4 = 16 cm²",
    },
    table: {
      headers: ["Cần tính", "Công thức"],
      rows: [
        ["Chu vi hình vuông", "cạnh × 4"],
        ["Diện tích hình vuông", "cạnh × cạnh"],
        ["Chu vi hình chữ nhật", "(dài + rộng) × 2"],
      ],
      label: "Luyện tập chung chủ đề 9",
    },
  },

  // ═══ Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000 ═══
  "g3-c10-l1": {
    operation: { left: 2345, sign: "+", right: 1234, result: 3579 },
  },
  "g3-c10-l2": {
    operation: { left: 4568, sign: "−", right: 2345, result: 2223 },
  },
  "g3-c10-l3": {
    operation: { left: 2768, sign: "+", right: 1456, result: 4224 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 768 + 1 456", "4 224"],
        ["5 002 − 1 345", "3 657"],
      ],
      label: "Luyện tập cộng, trừ trong phạm vi 10 000",
    },
  },
  "g3-c10-l4": {
    operation: { left: 1234, sign: "×", right: 2, result: 2468 },
  },
  "g3-c10-l5": {
    operation: { left: 2468, sign: ":", right: 2, result: 1234 },
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 6, 8],
      label: "2 468 : 2 = 1 234",
    },
  },
  "g3-c10-l6": {
    operation: { left: 3215, sign: "×", right: 3, result: 9645 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["3 215 × 3", "9 645"],
        ["8 425 : 4", "2 106 (dư 1)"],
      ],
      label: "Luyện tập nhân, chia trong phạm vi 10 000",
    },
  },
  "g3-c10-l7": {
    operation: { left: 3250, sign: "−", right: 1480, result: 1770 },
    barModel: {
      rows: [
        { label: "Có sẵn", parts: 3250 },
        { label: "Bớt đi", parts: 1480 },
      ],
      braceLabel: "Còn lại 1 770",
    },
  },
  "g3-c10-l8": {
    operation: { left: 2345, sign: "+", right: 1234, result: 3579 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 345 + 1 234", "3 579"],
        ["1 234 × 2", "2 468"],
        ["2 468 : 2", "1 234"],
      ],
      label: "Luyện tập chung chủ đề 10",
    },
  },

  // ═══ Chủ đề 11: Các số đến 100 000 ═══
  "g3-c11-l1": {
    placeValue: {
      headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 5, 6, 8],
      label: "24 568 gồm 2 chục nghìn, 4 nghìn, 5 trăm, 6 chục và 8 đơn vị",
    },
  },
  "g3-c11-l2": {
    placeValue: {
      headers: ["Trăm nghìn", "Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [1, 0, 0, 0, 0, 0],
      label: "100 000 = 10 chục nghìn = 1 trăm nghìn",
    },
  },
  "g3-c11-l3": {
    placeValue: {
      headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [3, 0, 4, 0, 5],
      label: "30 405 đọc là ba mươi nghìn bốn trăm linh năm",
    },
    table: {
      headers: ["Số", "Đọc là"],
      rows: [
        ["24 568", "hai mươi tư nghìn năm trăm sáu mươi tám"],
        ["30 405", "ba mươi nghìn bốn trăm linh năm"],
      ],
      label: "Đọc và viết số có năm chữ số",
    },
  },
  "g3-c11-l4": {
    comparison: { left: 24568, sign: "<", right: 24586 },
    table: {
      headers: ["Hàng", "So sánh"],
      rows: [
        ["Chục nghìn", "2 = 2"],
        ["Nghìn", "4 = 4"],
        ["Trăm", "5 = 5"],
        ["Chục", "6 < 8"],
      ],
      label: "24 568 < 24 586 vì hàng chục 6 < 8",
    },
  },
  "g3-c11-l5": {
    table: {
      headers: ["Làm tròn", "Vì sao"],
      rows: [
        ["24 300 → 24 000", "hàng trăm 3 < 5, xuống"],
        ["24 800 → 25 000", "hàng trăm 8 ≥ 5, lên"],
      ],
      label: "Làm tròn số đến hàng nghìn, hàng chục nghìn",
    },
    numberLine: {
      from: 24000,
      to: 25000,
      step: 1000,
      marks: [24000, 24300, 24800, 25000],
      label: "24 300 gần 24 000 · 24 800 gần 25 000",
    },
  },
  "g3-c11-l6": {
    placeValue: {
      headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 5, 6, 8],
      label: "24 568 = 20 000 + 4 000 + 500 + 60 + 8",
    },
    table: {
      headers: ["Làm tròn", "Được"],
      rows: [
        ["24 800 đến hàng nghìn", "25 000"],
        ["24 568 đến hàng chục", "24 570"],
      ],
      label: "Luyện tập chung chủ đề 11",
    },
  },

  // ═══ Chủ đề 12: Cộng, trừ trong phạm vi 100 000 ═══
  "g3-c12-l1": {
    operation: { left: 23456, sign: "+", right: 12345, result: 35801 },
  },
  "g3-c12-l2": {
    operation: { left: 45678, sign: "−", right: 23456, result: 22222 },
  },
  "g3-c12-l3": {
    operation: { left: 35678, sign: "+", right: 24567, result: 60245 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["35 678 + 24 567", "60 245"],
        ["50 000 − 12 345", "37 655"],
      ],
      label: "Luyện tập cộng, trừ trong phạm vi 100 000",
    },
  },
  "g3-c12-l4": {
    operation: { left: 34560, sign: "+", right: 25430, result: 59990 },
    barModel: {
      rows: [
        { label: "Tháng trước", parts: 34560 },
        { label: "Tháng này", parts: 25430 },
      ],
      braceLabel: "Cả hai tháng 59 990 cái áo · hơn kém 9 130",
    },
  },
  "g3-c12-l5": {
    operation: { left: 23456, sign: "+", right: 12345, result: 35801 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["23 456 + 12 345", "35 801"],
        ["35 801 − 12 345", "23 456"],
      ],
      label: "Luyện tập chung chủ đề 12",
    },
  },

  // ═══ Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam ═══
  "g3-c13-l1": {
    clock: { hour: 7, minute: 15, timeText: "7 giờ 15 phút" },
    table: {
      headers: ["Kim dài chỉ số", "Phút"],
      rows: [
        ["3", "3 × 5 = 15 phút"],
        ["6", "6 × 5 = 30 phút"],
        ["12", "0 phút (đúng giờ)"],
      ],
      label: "Xem đồng hồ — 1 giờ = 60 phút",
    },
  },
  "g3-c13-l2": {
    clock: {
      hour: 2,
      minute: 40,
      timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
    },
    table: {
      headers: ["Kim dài chỉ số", "Nghĩa là"],
      rows: [
        ["8", "40 phút — còn 20 phút nữa là tới giờ"],
        ["9", "45 phút — kém 15 phút"],
      ],
      label: "Xem đồng hồ — giờ kém",
    },
  },
  "g3-c13-l3": {
    table: {
      headers: ["Số ngày", "Các tháng"],
      rows: [
        ["31 ngày", "1 · 3 · 5 · 7 · 8 · 10 · 12"],
        ["30 ngày", "4 · 6 · 9 · 11"],
        ["28 hoặc 29 ngày", "Tháng 2"],
      ],
      label: "1 năm = 12 tháng = 365 ngày (năm nhuận 366 ngày)",
    },
  },
  "g3-c13-l4": {
    table: {
      headers: ["Cách đọc", "Cách viết"],
      rows: [
        ["ngày 15 tháng 8", "15/8"],
        ["ngày 1 tháng 1", "1/1"],
      ],
      label: "Ngày trước, tháng sau, năm cuối cùng — ví dụ 15/8/2025",
    },
  },
  "g3-c13-l5": {
    money: {
      notes: [1000, 5000, 10000, 50000, 100000],
      label: "Các tờ tiền thường dùng",
    },
    table: {
      headers: ["Tờ tiền", "Mệnh giá"],
      rows: [
        ["100 000 đồng", "100 000"],
        ["200 000 đồng", "200 000"],
        ["500 000 đồng", "500 000"],
      ],
      label: "Tiền Việt Nam — nhận biết các tờ tiền",
    },
  },
  "g3-c13-l6": {
    operation: { left: 50000, sign: "−", right: 24000, result: 26000 },
    money: {
      notes: [50000, 15000, 9000],
      label: "Mua hết 24 000 đồng, trả 50 000 đồng, tiền thừa 26 000 đồng",
    },
  },
  "g3-c13-l7": {
    clock: {
      hour: 2,
      minute: 40,
      timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
    },
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 giờ", "60 phút"],
        ["1 năm", "12 tháng"],
        ["1 tuần", "7 ngày"],
      ],
      label: "Luyện tập chung chủ đề 13",
    },
  },

  // ═══ Chủ đề 14: Nhân, chia trong phạm vi 100 000 ═══
  "g3-c14-l1": {
    operation: { left: 12345, sign: "×", right: 2, result: 24690 },
  },
  "g3-c14-l2": {
    operation: { left: 46848, sign: ":", right: 4, result: 11712 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["1", "4 : 4 = 1"],
        ["2", "6 : 4 = 1 dư 2"],
        ["3", "28 : 4 = 7"],
        ["4", "4 : 4 = 1"],
        ["5", "8 : 4 = 2"],
      ],
      label: "Thử lại: 11 712 × 4 = 46 848 ✓",
    },
  },
  "g3-c14-l3": {
    operation: { left: 13241, sign: "×", right: 3, result: 39723 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["13 241 × 3", "39 723"],
        ["47 125 : 5", "9 425"],
      ],
      label: "Luyện tập nhân, chia trong phạm vi 100 000",
    },
  },
  "g3-c14-l4": {
    operation: { left: 12450, sign: "×", right: 5, result: 62250 },
    barModel: {
      rows: [
        { label: "Một thùng", parts: 12450 },
        { label: "5 thùng", parts: 62250 },
      ],
      braceLabel: "12 450 × 5 = 62 250 cái bánh",
    },
  },
  "g3-c14-l5": {
    operation: { left: 12345, sign: "×", right: 2, result: 24690 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["12 345 × 2", "24 690"],
        ["46 848 : 4", "11 712"],
      ],
      label: "Luyện tập chung chủ đề 14",
    },
  },

  // ═══ Chủ đề 15: Thống kê, xác suất ═══
  "g3-c15-l1": {
    table: {
      headers: ["Môn", "Số bạn"],
      rows: [
        ["Bóng đá", 12],
        ["Cầu lông", 8],
        ["Bơi", 5],
      ],
      label: "Bảng số liệu lớp 3A — môn được nhiều bạn thích nhất là bóng đá",
    },
  },
  "g3-c15-l2": {
    barChart: {
      title: "Số bạn thích bóng đá (mỗi 🍎 = 5 bạn)",
      items: [{ label: "Bóng đá", value: 20 }],
      unit: "bạn",
      highlight: 0,
    },
    table: {
      headers: ["Số ký hiệu", "Số bạn"],
      rows: [["4 × 5", "20 bạn"]],
      label: "Biểu đồ tranh",
    },
  },
  "g3-c15-l3": {
    table: {
      headers: ["Lấy ra", "Khả năng"],
      rows: [
        ["Bóng đỏ", "chắc chắn (hộp chỉ có bóng đỏ)"],
        ["Bóng xanh", "không thể"],
        ["Bóng vàng", "không thể"],
      ],
      label: "Khả năng xảy ra của một sự kiện",
    },
  },
  "g3-c15-l4": {
    barChart: {
      title: "Bảng số liệu lớp 3A",
      items: [
        { label: "Bóng đá", value: 12 },
        { label: "Cầu lông", value: 8 },
        { label: "Bơi", value: 5 },
      ],
      unit: "bạn",
      highlight: 0,
    },
    table: {
      headers: ["Sự kiện", "Khả năng"],
      rows: [
        ["Chắc chắn", "luôn xảy ra"],
        ["Có thể", "có lúc xảy ra, có lúc không"],
        ["Không thể", "không bao giờ xảy ra"],
      ],
      label: "Luyện tập chung chủ đề 15",
    },
  },

  // ═══ Chủ đề 16: Ôn tập cuối năm ═══
  "g3-c16-l1": {
    operation: { left: 23456, sign: "+", right: 12345, result: 35801 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["23 456 + 12 345", "35 801"],
        ["45 678 − 23 456", "22 222"],
      ],
      label: "Ôn tập số và phép cộng, trừ",
    },
  },
  "g3-c16-l2": {
    operation: { left: 12345, sign: "×", right: 2, result: 24690 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["6 × 7", "42"],
        ["42 : 6", "7"],
        ["12 345 × 2", "24 690"],
        ["46 848 : 4", "11 712"],
      ],
      label: "Ôn tập phép nhân, phép chia",
    },
  },
  "g3-c16-l3": {
    planeShape: {
      kind: "square",
      labels: ["5 cm"],
      formula: "Chu vi = 5 × 4 = 20 cm · Diện tích = 5 × 5 = 25 cm²",
    },
    table: {
      headers: ["Cần tính", "Công thức"],
      rows: [
        ["Chu vi hình vuông", "cạnh × 4"],
        ["Diện tích hình vuông", "cạnh × cạnh"],
        ["Chu vi hình chữ nhật", "(dài + rộng) × 2"],
        ["Diện tích hình chữ nhật", "dài × rộng"],
      ],
      label: "Ôn tập hình học — chu vi và diện tích",
    },
  },
  "g3-c16-l4": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 m", "1 000 mm"],
        ["1 kg", "1 000 g"],
        ["1 l", "1 000 ml"],
        ["1 giờ", "60 phút"],
      ],
      label: "Ôn tập đo lường",
    },
  },
  "g3-c16-l5": {
    barChart: {
      title: "Số bạn tham gia (mỗi ký hiệu = 5 bạn)",
      items: [
        { label: "Thứ Hai", value: 15 },
        { label: "Thứ Ba", value: 20 },
        { label: "Thứ Tư", value: 25 },
      ],
      unit: "bạn",
      highlight: 2,
    },
  },
  "g3-c16-l6": {
    operation: { left: 12450, sign: "×", right: 5, result: 62250 },
    table: {
      headers: ["Từ khoá trong đề", "Phép tính"],
      rows: [
        ["tất cả", "cộng"],
        ["còn lại", "trừ"],
        ["mỗi", "nhân"],
        ["chia đều", "chia"],
      ],
      label: "Ôn tập giải bài toán có lời văn",
    },
  },
  "g3-c16-l7": {
    table: {
      headers: ["Mạch", "Ví dụ"],
      rows: [
        ["Số", "24 568"],
        ["Bốn phép tính", "12 345 × 2 = 24 690"],
        ["Hình học", "diện tích = cạnh × cạnh"],
        ["Đo lường", "1 kg = 1 000 g"],
        ["Thống kê", "biểu đồ tranh"],
      ],
      label: "Luyện tập tổng hợp cuối năm",
    },
  },
  "g3-c16-l8": {
    numberLine: {
      from: 1,
      to: 5,
      step: 1,
      marks: [3, 4, 5],
      hops: [{ from: 3, to: 5, label: "lên lớp 4" }],
      label: "Lớp 3 xong rồi — sẵn sàng lên Lớp 4",
    },
    table: {
      headers: ["Mốc", "Trạng thái"],
      rows: [
        ["Lớp 3", "Hoàn thành ✅"],
        ["Lớp 4", "Sẵn sàng 🚀"],
      ],
      label: "Lễ tốt nghiệp lớp 3",
    },
  },
};
