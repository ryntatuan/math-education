// Dữ liệu HÌNH cho LỚP 2 — 120 bài.
//
// Tách khỏi `tiem-hinh-tat-ca.mjs` cho dễ soát: mỗi lớp một file, đọc là thấy ngay
// bài nào được vẽ gì.
//
// Nguyên tắc chọn hình (giữ cho cả 5 lớp):
//   • Chọn hình KHỚP với phép tính đang dạy, không chọn hình cho đẹp.
//   • "Đếm thêm / đếm lùi / gấp lên" ⇒ `numberLine` có `hops` — bé THẤY được bước nhảy.
//   • "Gồm mấy chục mấy đơn vị" ⇒ `placeValue` hoặc `baseTen`.
//   • "Cộng trừ đặt tính" ⇒ `operation` (khối cũ của `LessonPage`, đã chạy ổn định).
//   • Liệt kê / bảng đối chiếu ⇒ `table`.
//   • Toán có lời văn ⇒ `barModel` để bé thấy hai đoạn dài ngắn khác nhau.
//   • Đồng hồ ⇒ `clock` (khối cũ). Tiền ⇒ `money`. Thống kê ⇒ `barChart`.
//
// Một bài được phép có 2–3 hình: `VisualBlocks` vẽ lần lượt theo thứ tự đã định.

export const SPECS_LOP2 = {
  // ═══ Chủ đề 1: Ôn tập và bổ sung ═══
  "g2-c1-l1": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [4, 7],
      label: "47 gồm 4 chục và 7 đơn vị — đọc là bốn mươi bảy",
    },
    baseTen: { tens: 4, ones: 7 },
  },
  "g2-c1-l2": {
    comparison: { left: 58, sign: "<", right: 85 },
    table: {
      headers: ["Số", "Chục", "Đơn vị"],
      rows: [
        ["58", 5, 8],
        ["85", 8, 5],
      ],
      label: "5 chục bé hơn 8 chục nên 58 < 85",
    },
  },
  "g2-c1-l3": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hops: [{ from: 0, to: 10, label: "sang phải: tăng dần" }],
      label: "Tia số — đi sang phải số tăng, đi sang trái số giảm",
    },
  },
  "g2-c1-l4": {
    numberLine: {
      from: 68,
      to: 70,
      step: 1,
      marks: [68, 69, 70],
      label: "68 là liền trước · 69 là chính nó · 70 là liền sau",
    },
  },
  "g2-c1-l5": {
    operation: { left: 35, sign: "+", right: 24, result: 59 },
    table: {
      headers: ["Số hạng", "Số hạng", "Tổng"],
      rows: [[35, 24, 59]],
      label: "Thành phần của phép cộng",
    },
  },
  "g2-c1-l6": {
    operation: { left: 57, sign: "−", right: 23, result: 34 },
    table: {
      headers: ["Số bị trừ", "Số trừ", "Hiệu"],
      rows: [[57, 23, 34]],
      label: "Thành phần của phép trừ",
    },
  },
  "g2-c1-l7": {
    operation: { left: 12, sign: "−", right: 8, result: 4 },
    barModel: {
      rows: [
        { label: "Mai", parts: 12 },
        { label: "Lan", parts: 8 },
      ],
      braceLabel: "Mai hơn Lan 4 cái kẹo",
    },
  },
  "g2-c1-l8": {
    operation: { left: 32, sign: "+", right: 14, result: 46 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["32 + 14", "46"],
        ["57 − 23", "34"],
      ],
      label: "Đặt tính rồi tính: cộng trừ từng hàng, bắt đầu từ hàng đơn vị",
    },
  },
  "g2-c1-l9": {
    numberLine: {
      from: 98,
      to: 100,
      step: 1,
      marks: [98, 99, 100],
      label: "98 liền trước · 99 là số lớn nhất có hai chữ số · 100 là số có ba chữ số",
    },
  },

  // ═══ Chủ đề 2: Cộng trừ trong phạm vi 20 ═══
  "g2-c2-l1": {
    tenFrame: {
      filled: 9,
      total: 10,
      emoji: "🔵",
      extra: 3,
      label: "9 + 1 = 10, rồi 10 + 3 = 13",
    },
    numberLine: {
      from: 9,
      to: 13,
      step: 1,
      marks: [9, 10, 11, 12, 13],
      hops: [{ from: 9, to: 13, label: "+4" }],
      label: "9 + 4 = 13",
    },
  },
  "g2-c2-l2": {
    tenFrame: {
      filled: 8,
      total: 10,
      emoji: "🟣",
      extra: 2,
      label: "8 còn thiếu 2 để đủ 10",
    },
    numberLine: {
      from: 8,
      to: 13,
      step: 1,
      marks: [8, 9, 10, 11, 12, 13],
      hops: [
        { from: 8, to: 10, label: "+2" },
        { from: 10, to: 13, label: "+3" },
      ],
      label: "8 + 5: tách 5 = 2 + 3, đi qua mốc 10",
    },
  },
  "g2-c2-l3": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["9 + 2", "11"],
        ["9 + 6", "15"],
        ["9 + 9", "18"],
        ["8 + 3", "11"],
        ["8 + 8", "16"],
        ["7 + 7", "14"],
      ],
      label: "Bảng cộng (qua 10) trong phạm vi 20",
    },
  },
  "g2-c2-l4": {
    operation: { left: 6, sign: "+", right: 7, result: 13 },
    tenFrame: {
      filled: 10,
      total: 10,
      emoji: "⚽",
      extra: 3,
      label: "6 quả + 7 quả: gộp đủ 10 rồi còn 3",
    },
  },
  "g2-c2-l5": {
    operation: { left: 7, sign: "+", right: 5, result: 12 },
    barModel: {
      rows: [
        { label: "Đã có", parts: 7 },
        { label: "Bay đến", parts: 5 },
      ],
      braceLabel: "12 con chim",
    },
  },
  "g2-c2-l6": {
    operation: { left: 14, sign: "−", right: 6, result: 8 },
    barModel: {
      rows: [
        { label: "Có sẵn", parts: 14 },
        { label: "Bớt đi", parts: 6 },
      ],
      braceLabel: "8 quả bóng",
    },
  },
  "g2-c2-l7": {
    operation: { left: 8, sign: "+", right: 5, result: 13 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["8 + 5", "13"],
        ["13 − 5", "8"],
        ["13 − 8", "5"],
      ],
      label: "Từ một phép cộng suy ra hai phép trừ",
    },
  },
  "g2-c2-l8": {
    numberLine: {
      from: 8,
      to: 13,
      step: 1,
      marks: [8, 9, 10, 11, 12, 13],
      hops: [
        { from: 13, to: 10, label: "−3" },
        { from: 10, to: 8, label: "−2" },
      ],
      label: "13 − 5: tách 5 = 3 + 2, đi lùi qua mốc 10",
    },
  },
  "g2-c2-l9": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["11 − 2", "9"],
        ["11 − 5", "6"],
        ["12 − 3", "9"],
        ["13 − 6", "7"],
        ["15 − 7", "8"],
        ["16 − 9", "7"],
      ],
      label: "Bảng trừ (qua 10)",
    },
  },
  "g2-c2-l10": {
    operation: { left: 14, sign: "−", right: 6, result: 8 },
    numberLine: {
      from: 6,
      to: 14,
      step: 1,
      marks: [6, 8, 10, 12, 14],
      hops: [{ from: 6, to: 14, label: "? = 8" }],
      label: "14 − ? = 6 ⇒ ? = 14 − 6 = 8",
    },
  },
  "g2-c2-l11": {
    operation: { left: 9, sign: "−", right: 5, result: 4 },
    barModel: {
      rows: [
        { label: "Mai", parts: 9 },
        { label: "Lan", parts: 5 },
      ],
      braceLabel: "Lan ít hơn Mai 4 nhãn vở",
    },
  },
  "g2-c2-l12": {
    operation: { left: 9, sign: "+", right: 5, result: 14 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["9 + 5", "14"],
        ["14 − 5", "9"],
        ["14 − 9", "5"],
      ],
      label: "Luyện tập chung chủ đề 2",
    },
  },

  // ═══ Chủ đề 3: Khối lượng, dung tích ═══
  "g2-c3-l1": {
    table: {
      headers: ["Vật", "Nặng"],
      rows: [
        ["Quả dưa hấu", "3 kg"],
        ["Bao gạo", "5 kg"],
        ["Cặp sách", "2 kg"],
      ],
      label: "Đơn vị đo khối lượng là ki-lô-gam (kg)",
    },
  },
  "g2-c3-l2": {
    table: {
      headers: ["Kim cân chỉ", "Vật nặng"],
      rows: [
        ["Vạch 2", "2 kg"],
        ["Vạch 4", "4 kg"],
        ["Vạch 5", "5 kg"],
      ],
      label: "Đọc số đo trên cân",
    },
  },
  "g2-c3-l3": {
    table: {
      headers: ["Vật", "Chứa được"],
      rows: [
        ["Chai nước", "2 l"],
        ["Can dầu", "5 l"],
        ["Ca đong", "1 l"],
      ],
      label: "Đơn vị đo dung tích là lít (l)",
    },
  },
  "g2-c3-l4": {
    comparison: { left: 3, sign: ">", right: 2 },
    table: {
      headers: ["Mực nước", "Có"],
      rows: [
        ["Vạch 2", "2 l"],
        ["Vạch 3", "3 l"],
      ],
      label: "Mực nước dâng đến vạch 3 thì có 3 l · 3 l > 2 l",
    },
  },
  "g2-c3-l5": {
    operation: { left: 2, sign: "+", right: 3, result: 5 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 kg + 3 kg", "5 kg"],
        ["2 l + 1 l", "3 l"],
      ],
      label: "Thực hành với ki-lô-gam và lít",
    },
  },
  "g2-c3-l6": {
    table: {
      headers: ["Đại lượng", "Đơn vị"],
      rows: [
        ["Khối lượng", "kg"],
        ["Dung tích", "l"],
      ],
      label: "Luyện tập chung chủ đề 3",
    },
  },

  // ═══ Chủ đề 4: Cộng trừ có nhớ trong phạm vi 100 ═══
  "g2-c4-l1": {
    operation: { left: 27, sign: "+", right: 5, result: 32 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [2, 7],
      label: "27 + 5: 7 + 5 = 12, viết 2 nhớ 1",
    },
  },
  "g2-c4-l2": {
    operation: { left: 36, sign: "+", right: 8, result: 44 },
  },
  "g2-c4-l3": {
    operation: { left: 38, sign: "+", right: 25, result: 63 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 8],
      label: "38 + 25: 8 + 5 = 13 viết 3 nhớ 1; 3 + 2 + 1 = 6",
    },
  },
  "g2-c4-l4": {
    operation: { left: 28, sign: "+", right: 17, result: 45 },
    barModel: {
      rows: [
        { label: "Đã có", parts: 28 },
        { label: "Thêm vào", parts: 17 },
      ],
      braceLabel: "45 hộp sữa",
    },
  },
  "g2-c4-l5": {
    operation: { left: 56, sign: "+", right: 27, result: 83 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["56 + 7", "63"],
        ["56 + 27", "83"],
      ],
      label: "Luyện tập chung phép cộng có nhớ",
    },
  },
  "g2-c4-l6": {
    operation: { left: 32, sign: "−", right: 7, result: 25 },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 2],
      label: "32 − 7: 2 không trừ được 7, mượn 1 chục thành 12; 12 − 7 = 5",
    },
  },
  "g2-c4-l7": {
    operation: { left: 51, sign: "−", right: 15, result: 36 },
  },
  "g2-c4-l8": {
    operation: { left: 52, sign: "−", right: 27, result: 25 },
  },
  "g2-c4-l9": {
    operation: { left: 74, sign: "−", right: 28, result: 46 },
    table: {
      headers: ["Phép tính", "Có mượn không?"],
      rows: [
        ["46 − 3", "không mượn"],
        ["43 − 6", "có mượn"],
        ["74 − 28", "có mượn"],
      ],
      label: "Luyện tập chung phép trừ có nhớ",
    },
  },
  "g2-c4-l10": {
    operation: { left: 27, sign: "+", right: 5, result: 32 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["27 + 5", "32"],
        ["32 − 5", "27"],
        ["32 − 27", "5"],
      ],
      label: "Ôn tập chung chủ đề 4",
    },
  },

  // ═══ Chủ đề 5: Hình phẳng ═══
  "g2-c5-l1": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Nối điểm A với điểm B ta được đoạn thẳng AB",
    },
  },
  "g2-c5-l2": {
    ruler: {
      lengthCm: 6,
      measure: { from: 0, to: 6 },
      label: "Đoạn thẳng AB có hai đầu mút",
    },
    table: {
      headers: ["Loại", "Đặc điểm"],
      rows: [
        ["Đoạn thẳng AB", "có hai đầu mút"],
        ["Đường thẳng AB", "kéo dài mãi về hai phía"],
        ["Đường cong", "uốn lượn, không thẳng"],
      ],
      label: "Đường thẳng và đường cong",
    },
  },
  "g2-c5-l3": {
    table: {
      headers: ["Ba điểm", "Kết luận"],
      rows: [
        ["A, B, C cùng nằm trên một đường thẳng", "thẳng hàng"],
        ["A, B cùng đường, C nằm ngoài", "không thẳng hàng"],
      ],
      label: "Ba điểm thẳng hàng",
    },
  },
  "g2-c5-l4": {
    ruler: {
      lengthCm: 10,
      measure: { from: 0, to: 10 },
      label: "Đường gấp khúc ABCD gồm ba đoạn AB, BC, CD nối tiếp nhau",
    },
  },
  "g2-c5-l5": {
    operation: { left: 7, sign: "+", right: 5, result: 12 },
    table: {
      headers: ["Đoạn", "Dài"],
      rows: [
        ["AB", "3 cm"],
        ["BC", "4 cm"],
        ["CD", "5 cm"],
        ["Cả đường gấp khúc", "3 + 4 + 5 = 12 cm"],
      ],
      label: "Độ dài đường gấp khúc bằng tổng độ dài các đoạn",
    },
  },
  "g2-c5-l6": {
    planeShape: {
      kind: "rectangle",
      labels: ["cạnh AB", "cạnh BC"],
      formula: "4 cạnh: AB, BC, CD, DA · 4 đỉnh: A, B, C, D",
    },
  },
  "g2-c5-l7": {
    ruler: {
      lengthCm: 4,
      measure: { from: 0, to: 4 },
      label: "Vẽ đoạn thẳng AB dài 4 cm: đặt vạch 0 tại A, chấm B ở vạch 4",
    },
  },
  "g2-c5-l8": {
    planeShape: { kind: "rectangle", formula: "Hình tứ giác: 4 cạnh · 4 đỉnh" },
    ruler: {
      lengthCm: 10,
      measure: { from: 0, to: 10 },
      label: "Đường gấp khúc: cộng độ dài các đoạn lại",
    },
  },

  // ═══ Chủ đề 6: Ngày - giờ, giờ - phút, ngày - tháng ═══
  "g2-c6-l1": {
    clock: { hour: 8, minute: 0, timeText: "8 giờ" },
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 ngày", "24 giờ"],
        ["Buổi sáng", "0 giờ → 11 giờ"],
        ["Buổi chiều", "12 giờ → 23 giờ"],
      ],
      label: "Ngày và giờ",
    },
  },
  "g2-c6-l2": {
    clock: { hour: 3, minute: 30, timeText: "3 giờ 30 phút" },
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 giờ", "60 phút"],
        ["Kim dài chỉ số 12", "đúng giờ"],
        ["Kim dài chỉ số 6", "30 phút"],
      ],
      label: "Giờ và phút",
    },
  },
  "g2-c6-l3": {
    clock: { hour: 3, minute: 30, timeText: "3 giờ 30 phút" },
    table: {
      headers: ["Kim dài chỉ", "Đọc là"],
      rows: [
        ["Số 12", "3 giờ 00 phút"],
        ["Số 3", "3 giờ 15 phút"],
        ["Số 6", "3 giờ 30 phút"],
        ["Số 9", "3 giờ 45 phút"],
      ],
      label: "Xem đồng hồ chỉ giờ và phút",
    },
  },
  "g2-c6-l4": {
    table: {
      headers: ["Số ngày", "Các tháng"],
      rows: [
        ["31 ngày", "1, 3, 5, 7, 8, 10, 12"],
        ["30 ngày", "4, 6, 9, 11"],
        ["28 hoặc 29 ngày", "Tháng 2"],
      ],
      label: "Ngày và tháng — một năm có 12 tháng",
    },
  },
  "g2-c6-l5": {
    table: {
      headers: ["Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],
      rows: [[14, 15, 16, 17, 18]],
      label: "Ngày 15 nằm ở cột Thứ Ba thì ngày 15 là thứ Ba",
    },
  },
  "g2-c6-l6": {
    clock: { hour: 7, minute: 0, timeText: "7 giờ tối = 19 giờ" },
    table: {
      headers: ["Từ", "Đến", "Được"],
      rows: [
        ["7 giờ", "8 giờ", "1 giờ"],
        ["19 giờ", "21 giờ", "2 giờ"],
      ],
      label: "Thực hành xem đồng hồ",
    },
  },
  "g2-c6-l7": {
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 ngày", "24 giờ"],
        ["1 giờ", "60 phút"],
        ["1 tuần", "7 ngày"],
        ["1 năm", "12 tháng"],
      ],
      label: "Luyện tập chung chủ đề 6",
    },
  },

  // ═══ Chủ đề 7: Ôn tập học kì 1 ═══
  "g2-c7-l1": {
    operation: { left: 9, sign: "+", right: 5, result: 14 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["9 + 5", "14"],
        ["14 − 5", "9"],
        ["14 − 9", "5"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 20",
    },
  },
  "g2-c7-l2": {
    operation: { left: 38, sign: "+", right: 25, result: 63 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["38 + 25", "63"],
        ["52 − 27", "25"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 100",
    },
  },
  "g2-c7-l3": {
    planeShape: { kind: "rectangle", formula: "Hình tứ giác: 4 cạnh · 4 đỉnh" },
    ruler: {
      lengthCm: 10,
      measure: { from: 0, to: 10 },
      label: "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng",
    },
  },
  "g2-c7-l4": {
    ruler: { lengthCm: 10, measure: { from: 0, to: 10 }, label: "1 dm = 10 cm" },
    table: {
      headers: ["Đại lượng", "Đơn vị đo"],
      rows: [
        ["Độ dài", "cm · dm · m · km"],
        ["Khối lượng", "kg"],
        ["Dung tích", "l"],
      ],
      label: "Ôn tập đo lường",
    },
  },
  "g2-c7-l5": {
    clock: { hour: 4, minute: 30, timeText: "4 giờ 30 phút" },
    table: {
      headers: ["Kim dài chỉ", "Đọc là"],
      rows: [
        ["Số 12", "4 giờ 00 phút"],
        ["Số 6", "4 giờ 30 phút"],
      ],
      label: "Ôn tập xem đồng hồ — một năm có 12 tháng",
    },
  },
  "g2-c7-l6": {
    table: {
      headers: ["Mạch kiến thức", "Ví dụ"],
      rows: [
        ["Số đến 100", "58 < 85"],
        ["Cộng trừ", "38 + 25 = 63"],
        ["Đo lường", "5 kg · 2 l"],
        ["Hình phẳng", "đường gấp khúc, tứ giác"],
        ["Giờ và lịch", "4 giờ 30 phút"],
      ],
      label: "Ôn tập chung học kì 1",
    },
  },

  // ═══ Chủ đề 8: Phép nhân, phép chia ═══
  "g2-c8-l1": {
    tenFrame: {
      filled: 6,
      total: 10,
      emoji: "🍊",
      label: "3 khay, mỗi khay 2 quả: 2 + 2 + 2 = 6",
    },
    table: {
      headers: ["Khay", "Số quả"],
      rows: [
        ["Khay 1", 2],
        ["Khay 2", 2],
        ["Khay 3", 2],
        ["Tổng", "2 × 3 = 6"],
      ],
      label: "Viết gọn 2 + 2 + 2 = 6 thành 2 × 3 = 6",
    },
  },
  "g2-c8-l2": {
    numberLine: {
      from: 0,
      to: 10,
      step: 2,
      marks: [0, 2, 4, 6, 8, 10],
      hops: [
        { from: 0, to: 2, label: "1" },
        { from: 2, to: 4, label: "2" },
        { from: 4, to: 6, label: "3" },
      ],
      label: "2 được lấy 5 lần: 2 × 5 = 10",
    },
    table: {
      headers: ["Tổng các số hạng bằng nhau", "Viết gọn"],
      rows: [
        ["2 + 2 + 2 + 2 + 2", "2 × 5 = 10"],
        ["4 + 4 + 4", "4 × 3 = 12"],
      ],
      label: "Viết phép nhân từ tổng các số hạng bằng nhau",
    },
  },
  "g2-c8-l3": {
    operation: { left: 2, sign: "×", right: 3, result: 6 },
    table: {
      headers: ["Thừa số", "Thừa số", "Tích"],
      rows: [[2, 3, 6]],
      label: "Thừa số và Tích",
    },
  },
  "g2-c8-l4": {
    numberLine: {
      from: 2,
      to: 10,
      step: 2,
      marks: [2, 4, 6, 8, 10],
      label: "Đếm thêm 2: 2 · 4 · 6 · 8 · 10",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["2 × 1", "2"],
        ["2 × 2", "4"],
        ["2 × 3", "6"],
        ["2 × 4", "8"],
        ["2 × 5", "10"],
      ],
      label: "Bảng nhân 2 (từ 2 × 1 đến 2 × 5)",
    },
  },
  "g2-c8-l5": {
    numberLine: {
      from: 12,
      to: 20,
      step: 2,
      marks: [12, 14, 16, 18, 20],
      label: "Đếm thêm 2: 12 · 14 · 16 · 18 · 20",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["2 × 6", "12"],
        ["2 × 7", "14"],
        ["2 × 8", "16"],
        ["2 × 9", "18"],
        ["2 × 10", "20"],
      ],
      label: "Bảng nhân 2 (từ 2 × 6 đến 2 × 10)",
    },
  },
  "g2-c8-l6": {
    operation: { left: 2, sign: "×", right: 7, result: 14 },
    tenFrame: {
      filled: 10,
      total: 10,
      emoji: "🦀",
      extra: 4,
      label: "7 con cua, mỗi con 2 càng: 2 × 7 = 14 cái càng",
    },
  },
  "g2-c8-l7": {
    numberLine: {
      from: 5,
      to: 25,
      step: 5,
      marks: [5, 10, 15, 20, 25],
      label: "Đếm thêm 5: 5 · 10 · 15 · 20 · 25",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["5 × 1", "5"],
        ["5 × 2", "10"],
        ["5 × 3", "15"],
        ["5 × 4", "20"],
        ["5 × 5", "25"],
      ],
      label: "Bảng nhân 5 (từ 5 × 1 đến 5 × 5)",
    },
  },
  "g2-c8-l8": {
    numberLine: {
      from: 30,
      to: 50,
      step: 5,
      marks: [30, 35, 40, 45, 50],
      label: "Đếm thêm 5: 30 · 35 · 40 · 45 · 50",
    },
    table: {
      headers: ["Phép nhân", "Kết quả"],
      rows: [
        ["5 × 6", "30"],
        ["5 × 7", "35"],
        ["5 × 8", "40"],
        ["5 × 9", "45"],
        ["5 × 10", "50"],
      ],
      label: "Bảng nhân 5 (từ 5 × 6 đến 5 × 10)",
    },
  },
  "g2-c8-l9": {
    operation: { left: 5, sign: "×", right: 3, result: 15 },
    table: {
      headers: ["Phép tính", "Tích"],
      rows: [
        ["5 × 3", "15"],
        ["3 × 5", "15"],
      ],
      label: "Đổi chỗ hai thừa số thì tích không đổi",
    },
  },
  "g2-c8-l10": {
    operation: { left: 10, sign: ":", right: 2, result: 5 },
    fractionCircle: {
      parts: 2,
      shaded: 1,
      label: "10 quả chia thành 2 phần bằng nhau, mỗi phần 5 quả",
    },
  },
  "g2-c8-l11": {
    operation: { left: 10, sign: ":", right: 2, result: 5 },
    table: {
      headers: ["Số bị chia", "Số chia", "Thương"],
      rows: [[10, 2, 5]],
      label: "Số bị chia – Số chia – Thương",
    },
  },
  "g2-c8-l12": {
    operation: { left: 2, sign: "×", right: 3, result: 6 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 × 3", "6"],
        ["6 : 2", "3"],
        ["6 : 3", "2"],
      ],
      label: "Từ một phép nhân viết được hai phép chia",
    },
  },
  "g2-c8-l13": {
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["2 : 2", "1"],
        ["4 : 2", "2"],
        ["6 : 2", "3"],
        ["8 : 2", "4"],
        ["10 : 2", "5"],
        ["12 : 2", "6"],
        ["14 : 2", "7"],
        ["16 : 2", "8"],
        ["18 : 2", "9"],
        ["20 : 2", "10"],
      ],
      label: "Bảng chia 2",
    },
    numberLine: {
      from: 2,
      to: 20,
      step: 2,
      marks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      label: "Bảng chia 2 dựa vào bảng nhân 2",
    },
  },
  "g2-c8-l14": {
    operation: { left: 40, sign: ":", right: 5, result: 8 },
    table: {
      headers: ["Phép chia", "Kết quả"],
      rows: [
        ["5 : 5", "1"],
        ["10 : 5", "2"],
        ["15 : 5", "3"],
        ["20 : 5", "4"],
        ["25 : 5", "5"],
        ["30 : 5", "6"],
        ["35 : 5", "7"],
        ["40 : 5", "8"],
        ["45 : 5", "9"],
        ["50 : 5", "10"],
      ],
      label: "Bảng chia 5 — 40 : 5 = 8 bó hoa",
    },
  },
  "g2-c8-l15": {
    operation: { left: 5, sign: "×", right: 10, result: 50 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["5 × 10", "50"],
        ["50 : 5", "10"],
        ["50 : 10", "5"],
      ],
      label: "Ô ăn quan: 10 ô, mỗi ô 5 viên sỏi",
    },
  },
  "g2-c8-l16": {
    table: {
      headers: ["Số chấm", "Phép tính có kết quả bằng số chấm"],
      rows: [
        ["6", "2 × 3 = 6"],
        ["6", "12 : 2 = 6"],
        ["15", "5 × 3 = 15"],
        ["8", "2 × 4 = 8"],
      ],
      label: "Trò chơi xúc xắc: gieo được mấy chấm thì tìm phép tính có kết quả bằng số đó",
    },
  },

  // ═══ Chủ đề 9: Hình khối ═══
  "g2-c9-l1": {
    solid: {
      kind: "cylinder",
      dims: { a: 2, b: 5 },
      label: "Khối trụ",
      formula: "Hai mặt tròn ở hai đầu",
    },
  },
  "g2-c9-l2": {
    solid: {
      kind: "sphere",
      dims: { a: 3 },
      label: "Khối cầu",
      formula: "Tròn đều, không có mặt phẳng",
    },
  },
  "g2-c9-l3": {
    solid: {
      kind: "cylinder",
      dims: { a: 2, b: 5 },
      label: "Khối trụ — đặt đứng và xếp chồng được",
    },
    table: {
      headers: ["Khối", "Đặc điểm"],
      rows: [
        ["Khối trụ", "đặt đứng được, xếp chồng được"],
        ["Khối cầu", "lăn mọi hướng, không xếp chồng được"],
      ],
      label: "So sánh khối trụ và khối cầu",
    },
  },
  "g2-c9-l4": {
    table: {
      headers: ["Khối", "Ví dụ quanh em"],
      rows: [
        ["Khối trụ", "hộp sữa · lon nước · cây nến"],
        ["Khối cầu", "quả bóng · viên bi · quả địa cầu"],
      ],
      label: "Luyện tập chung chủ đề 9",
    },
  },

  // ═══ Chủ đề 10: Các số trong phạm vi 1 000 ═══
  "g2-c10-l1": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [1, 0, 0],
      label: "1 trăm = 100",
    },
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["10 đơn vị", "1 chục"],
        ["10 chục", "1 trăm"],
        ["1 trăm", "100"],
      ],
      label: "Đơn vị, chục, trăm",
    },
  },
  "g2-c10-l2": {
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [1, 0, 0, 0],
      label: "10 trăm = 1 nghìn = 1000 — đọc là một nghìn",
    },
  },
  "g2-c10-l3": {
    numberLine: {
      from: 100,
      to: 1000,
      step: 100,
      marks: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      label: "Các số tròn trăm",
    },
  },
  "g2-c10-l4": {
    numberLine: {
      from: 110,
      to: 200,
      step: 10,
      marks: [110, 120, 130, 140, 150, 160, 170, 180, 190, 200],
      label: "Các số tròn chục từ 110 đến 200",
    },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 5, 0],
      label: "250 = 2 trăm + 5 chục + 0 đơn vị",
    },
  },
  "g2-c10-l5": {
    comparison: { left: 300, sign: "<", right: 500 },
    table: {
      headers: ["So sánh", "Vì sao"],
      rows: [
        ["300 < 500", "3 < 5"],
        ["240 < 260", "hàng chục 4 < 6"],
      ],
      label: "So sánh các số tròn trăm, tròn chục",
    },
  },
  "g2-c10-l6": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 5],
      label: "245 gồm 2 trăm, 4 chục và 5 đơn vị — đọc là hai trăm bốn mươi lăm",
    },
  },
  "g2-c10-l7": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [4, 0, 5],
      label: "405 đọc là bốn trăm linh năm",
    },
    table: {
      headers: ["Số", "Đọc là"],
      rows: [
        ["405", "bốn trăm linh năm"],
        ["450", "bốn trăm năm mươi"],
        ["520", "năm trăm hai mươi"],
      ],
      label: "Đọc và viết số có ba chữ số",
    },
  },
  "g2-c10-l8": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 4, 5],
      label: "245 = 200 + 40 + 5",
    },
    table: {
      headers: ["Số", "Viết thành tổng"],
      rows: [
        ["245", "200 + 40 + 5"],
        ["376", "300 + 70 + 6"],
        ["405", "400 + 5"],
      ],
      label: "Viết số thành tổng các trăm, chục, đơn vị",
    },
  },
  "g2-c10-l9": {
    comparison: { left: 245, sign: "<", right: 254 },
    table: {
      headers: ["So sánh", "Vì sao"],
      rows: [
        ["245 < 254", "hàng trăm đều là 2, hàng chục 4 < 5"],
        ["376 > 369", "hàng chục 7 > 6"],
      ],
      label: "So sánh số có ba chữ số: so từ hàng trăm trở xuống",
    },
  },
  "g2-c10-l10": {
    numberLine: {
      from: 199,
      to: 254,
      step: 1,
      marks: [199, 245, 254],
      label: "Bé đến lớn: 199 · 245 · 254 — lớn đến bé: 254 · 245 · 199",
    },
  },
  "g2-c10-l11": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["10 đơn vị", "1 chục"],
        ["10 chục", "1 trăm"],
        ["10 trăm", "1 nghìn = 1000"],
      ],
      label: "Luyện tập chung chủ đề 10",
    },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [3, 8, 6],
      label: "386 = 300 + 80 + 6",
    },
  },

  // ═══ Chủ đề 11: Độ dài và đơn vị đo độ dài. Tiền Việt Nam ═══
  "g2-c11-l1": {
    ruler: { lengthCm: 10, measure: { from: 0, to: 10 }, label: "1 dm = 10 cm" },
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 dm", "10 cm"],
        ["2 dm", "20 cm"],
        ["30 cm", "3 dm"],
      ],
      label: "Đề-xi-mét",
    },
  },
  "g2-c11-l2": {
    ruler: {
      lengthCm: 30,
      measure: { from: 0, to: 30 },
      label: "1 m = 100 cm = 10 dm",
    },
  },
  "g2-c11-l3": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 km", "1000 m"],
        ["2 km", "2000 m"],
      ],
      label: "Ki-lô-mét — quãng đường dài 2 km nghĩa là 2000 m",
    },
  },
  "g2-c11-l4": {
    money: {
      notes: [1000, 2000, 5000],
      label: "Các tờ tiền Việt Nam bé thường gặp",
    },
    table: {
      headers: ["Tờ tiền", "Mệnh giá"],
      rows: [
        ["100 đồng", "100"],
        ["500 đồng", "500"],
        ["1000 đồng", "1000"],
        ["5000 đồng", "5000"],
      ],
      label: "Giới thiệu tiền Việt Nam",
    },
  },
  "g2-c11-l5": {
    operation: { left: 2000, sign: "−", right: 1500, result: 500 },
    money: {
      notes: [2000, 1000, 500],
      label: "Mua bánh 1500 đồng, trả 2000 đồng, tiền thừa 500 đồng",
    },
  },
  "g2-c11-l6": {
    ruler: {
      lengthCm: 15,
      measure: { from: 0, to: 15 },
      label: "Bút chì dài 15 cm",
    },
    table: {
      headers: ["Đơn vị", "Đo vật"],
      rows: [
        ["cm", "vật nhỏ: bút chì"],
        ["dm", "vật vừa: bàn học"],
        ["m", "phòng học, sân"],
        ["km", "quãng đường"],
      ],
      label: "Chọn đơn vị đo cho phù hợp",
    },
  },
  "g2-c11-l7": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 m", "100 cm"],
        ["1 km", "1000 m"],
        ["2000 đồng − 1500 đồng", "500 đồng"],
      ],
      label: "Luyện tập chung chủ đề 11",
    },
    money: { notes: [1000, 500], label: "1000 đồng + 500 đồng = 1500 đồng" },
  },

  // ═══ Chủ đề 12: Cộng trừ trong phạm vi 1 000 ═══
  "g2-c12-l1": {
    operation: { left: 235, sign: "+", right: 412, result: 647 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 3, 5],
      label: "235 + 412: cộng từng hàng một, không nhớ",
    },
  },
  "g2-c12-l2": {
    operation: { left: 256, sign: "+", right: 173, result: 429 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [2, 5, 6],
      label: "256 + 173: 5 + 7 = 12, viết 2 nhớ 1",
    },
  },
  "g2-c12-l3": {
    operation: { left: 265, sign: "+", right: 148, result: 413 },
  },
  "g2-c12-l4": {
    operation: { left: 645, sign: "−", right: 213, result: 432 },
  },
  "g2-c12-l5": {
    operation: { left: 534, sign: "−", right: 268, result: 266 },
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [5, 3, 4],
      label: "534 − 268: mượn 1 chục rồi mượn 1 trăm",
    },
  },
  "g2-c12-l6": {
    operation: { left: 420, sign: "−", right: 165, result: 255 },
  },
  "g2-c12-l7": {
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
  "g2-c12-l8": {
    operation: { left: 245, sign: "+", right: 168, result: 413 },
    barModel: {
      rows: [
        { label: "Đội Một", parts: 245 },
        { label: "Đội Hai", parts: 168 },
      ],
      braceLabel: "Cả hai đội: 245 + 168 = 413 cây",
    },
  },
  "g2-c12-l9": {
    operation: { left: 534, sign: "−", right: 268, result: 266 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["256 + 173", "429"],
        ["429 − 173", "256"],
        ["534 − 268", "266"],
      ],
      label: "Luyện tập chung chủ đề 12",
    },
  },

  // ═══ Chủ đề 13: Thống kê, xác suất ═══
  "g2-c13-l1": {
    table: {
      headers: ["Nhóm", "Số bạn"],
      rows: [
        ["Thích màu đỏ", "?"],
        ["Thích màu xanh", "?"],
      ],
      label: "Hỏi từng bạn rồi xếp vào hai nhóm — mỗi bạn chỉ ở một nhóm",
    },
  },
  "g2-c13-l2": {
    table: {
      headers: ["Màu", "Số bạn"],
      rows: [
        ["Màu đỏ", 7],
        ["Màu xanh", 4],
      ],
      label: "Kiểm đếm bằng vạch: cứ 5 vạch thì gạch chéo một lần",
    },
  },
  "g2-c13-l3": {
    barChart: {
      title: "Bạn thích loại quả nào",
      items: [
        { label: "Táo", value: 5 },
        { label: "Cam", value: 3 },
      ],
      unit: "bạn",
      highlight: 0,
    },
  },
  "g2-c13-l4": {
    barChart: {
      title: "Mỗi hình là 2 bạn",
      items: [
        { label: "Táo", value: 6 },
        { label: "Cam", value: 4 },
      ],
      unit: "bạn",
      highlight: 0,
    },
  },
  "g2-c13-l5": {
    table: {
      headers: ["Điều", "Khả năng"],
      rows: [
        ["Mặt trời mọc ở hướng Đông", "chắc chắn"],
        ["Ngày mai trời mưa", "có thể"],
        ["Bé cao 3 mét", "không thể"],
      ],
      label: "Chắc chắn · có thể · không thể",
    },
  },
  "g2-c13-l6": {
    table: {
      headers: ["Bước", "Việc làm"],
      rows: [
        ["1", "Thu thập số liệu"],
        ["2", "Phân loại"],
        ["3", "Kiểm đếm"],
        ["4", "Vẽ biểu đồ tranh"],
      ],
      label: "Luyện tập chung chủ đề 13",
    },
  },

  // ═══ Chủ đề 14: Ôn tập cuối năm ═══
  "g2-c14-l1": {
    placeValue: {
      headers: ["Trăm", "Chục", "Đơn vị"],
      digits: [3, 8, 6],
      label: "386 = 300 + 80 + 6",
    },
    comparison: { left: 386, sign: "<", right: 396 },
  },
  "g2-c14-l2": {
    operation: { left: 46, sign: "+", right: 38, result: 84 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["46 + 38", "84"],
        ["83 − 47", "36"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 100",
    },
  },
  "g2-c14-l3": {
    operation: { left: 256, sign: "+", right: 173, result: 429 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["235 + 412", "647 (không nhớ)"],
        ["256 + 173", "429 (có nhớ)"],
        ["534 − 268", "266 (có mượn)"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 1 000",
    },
  },
  "g2-c14-l4": {
    operation: { left: 5, sign: "×", right: 7, result: 35 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 × 8", "16"],
        ["5 × 7", "35"],
        ["18 : 2", "9"],
        ["45 : 5", "9"],
      ],
      label: "Ôn tập phép nhân, phép chia",
    },
  },
  "g2-c14-l5": {
    planeShape: { kind: "rectangle", formula: "Hình tứ giác: 4 cạnh · 4 đỉnh" },
    solid: { kind: "sphere", dims: { a: 3 }, label: "Khối cầu lăn mọi hướng" },
  },
  "g2-c14-l6": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["1 dm", "10 cm"],
        ["1 m", "100 cm"],
        ["1 km", "1000 m"],
        ["1 giờ", "60 phút"],
        ["1 tuần", "7 ngày"],
      ],
      label: "Ôn tập đo lường",
    },
  },
  "g2-c14-l7": {
    barChart: {
      title: "Số quyển vở đã quyên góp (mỗi hình = 4 quyển)",
      items: [
        { label: "Nhóm 1", value: 12 },
        { label: "Nhóm 2", value: 8 },
      ],
      unit: "quyển",
      highlight: 0,
    },
  },
  "g2-c14-l8": {
    table: {
      headers: ["Mạch kiến thức", "Ví dụ"],
      rows: [
        ["Số đến 1000", "386 = 300 + 80 + 6"],
        ["Bốn phép tính", "5 × 7 = 35"],
        ["Đo lường", "1 m = 100 cm"],
        ["Hình học", "khối trụ, khối cầu"],
        ["Thống kê", "biểu đồ tranh"],
      ],
      label: "Ôn tập chung cuối năm",
    },
  },
  "g2-c14-l9": {
    table: {
      headers: ["Dạng bài", "Ví dụ"],
      rows: [
        ["Đọc số", "386"],
        ["So sánh", "386 < 396"],
        ["Đặt tính", "256 + 173 = 429"],
        ["Tìm x", "x + 145 = 320"],
        ["Giải toán", "245 + 168 = 413"],
        ["Hình học", "khối cầu"],
        ["Biểu đồ", "mỗi hình = 4 quyển"],
      ],
      label: "Luyện đề cuối năm Lớp 2",
    },
  },
};
