// Tiêm dữ liệu HÌNH vào slide "visual" của LỚP 1.
//
// ══════════════════════════════════════════════════════════════════════════════
// VÌ SAO ĐẶT DỮ LIỆU TRONG CHÍNH `grade1Data.js`
//
// `contentSource.js` lấy cây tĩnh từ 5 file `gradeNData.js`. Khi bật
// `content_source = "remote"` thì cây từ DB **THAY THẾ** cây tĩnh. Nên nếu để dữ
// liệu hình ở một file rời thì vừa không chảy vào DB (migrate lưu
// `payload: { slides }` nguyên khối), vừa BIẾN MẤT khi app đọc DB.
// ⇒ Bắt buộc nằm trong `slide.content` của chính 5 file đó.
//
// ══════════════════════════════════════════════════════════════════════════════
// VÌ SAO SỬA BẰNG VĂN BẢN, KHÔNG GHI LẠI CẢ FILE
//
// 5 file này nặng 112–304 KB và chứa rất nhiều ghi chú giải thích (`// ═══ CHỦ ĐỀ 1 …`,
// các khối "VÌ SAO DỰNG LẠI"). Đọc bằng `import()` rồi `JSON.stringify` để ghi lại sẽ
// **XOÁ SẠCH mọi ghi chú** và đổi định dạng toàn file — không thể soát lại bằng mắt.
// Nên chỉ chèn thêm dòng vào ĐÚNG một chỗ, phần còn lại của file không bị chạm.
//
// CHỐT AN TOÀN (có chủ đích, không phải trang trí):
//   1. Số mục trong bảng phải KHỚP hằng số mong đợi, nếu không thì thoát, KHÔNG ghi.
//   2. Mỗi bài trong bảng phải tìm thấy ĐÚNG MỘT lần trong file.
//   3. Mỗi bài phải có ĐÚNG MỘT slide `type: "visual"` khớp mẫu chèn.
//   4. Sau khi ghi, ĐỌC LẠI file bằng `import()` và đối chiếu từng khoá đã chèn.
//      Sai một chỗ ⇒ báo lỗi rõ ràng (file đã ghi rồi thì in hướng dẫn khôi phục).
//
// CÁCH DÙNG:
//   node scratch/tiem-hinh-tat-ca.mjs 1           # xem thử, KHÔNG ghi
//   node scratch/tiem-hinh-tat-ca.mjs 1 --ghi     # ghi thật (tự sao lưu trước)
// ══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// Bảng dữ liệu hình cho LỚP 1 — 97 bài
// ─────────────────────────────────────────────────────────────────────────────
const SPECS_LOP1 = {
  // ═══ Chủ đề 1: Các số từ 0 đến 10 ═══
  "g1-c1-l1": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: "Bé sẽ học các số từ 0 đến 10",
    },
  },
  "g1-c1-l2": {
    tenFrame: { filled: 3, total: 5, emoji: "🍎", label: "3 quả táo — số 3" },
    numberLine: { from: 1, to: 3, step: 1, marks: [1, 2, 3], label: "Các số 1, 2, 3" },
  },
  "g1-c1-l3": {
    tenFrame: { filled: 5, total: 5, emoji: "🍒", label: "5 quả — số 5" },
    numberLine: {
      from: 1,
      to: 5,
      step: 1,
      marks: [1, 2, 3, 4, 5],
      label: "Các số 4, 5",
    },
  },
  "g1-c1-l4": {
    tenFrame: { filled: 10, total: 10, emoji: "🍒", label: "10 quả — số 10" },
    numberLine: {
      from: 6,
      to: 10,
      step: 1,
      marks: [6, 7, 8, 9, 10],
      label: "Các số 6, 7, 8, 9, 10",
    },
  },
  "g1-c1-l5": {
    tenFrame: {
      filled: 0,
      total: 5,
      emoji: "🍽️",
      label: "Đĩa trống — không có quả nào, đó là số 0",
    },
    numberLine: {
      from: 0,
      to: 5,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5],
      label: "Số 0 đứng đầu dãy số",
    },
  },
  "g1-c1-l6": {
    comparison: { left: 4, sign: ">", right: 3 },
    tenFrame: {
      filled: 4,
      total: 5,
      emoji: "🎈",
      label: "4 quả bóng nhiều hơn 3 quả bóng",
    },
  },
  "g1-c1-l7": {
    comparison: { left: 4, sign: "=", right: 4 },
    tenFrame: {
      filled: 4,
      total: 5,
      emoji: "✏️",
      label: "4 bút chì bằng 4 quyển vở",
    },
  },
  "g1-c1-l8": {
    comparison: { left: 5, sign: ">", right: 2 },
    table: {
      headers: ["Bên trái", "Dấu", "Bên phải"],
      rows: [
        ["5", ">", "2"],
        ["2", "<", "5"],
        ["5", "=", "5"],
      ],
      label: "Ba dấu cần nhớ: > , < , =",
    },
  },
  "g1-c1-l9": {
    tenFrame: { filled: 2, total: 5, emoji: "🟠", extra: 3, label: "5 gồm 2 và 3" },
  },
  "g1-c1-l10": {
    tenFrame: { filled: 6, total: 10, emoji: "🖐️", extra: 4, label: "10 gồm 6 và 4" },
  },
  "g1-c1-l11": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: "Đủ 11 số từ 0 đến 10",
    },
  },
  "g1-c1-l12": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hops: [
        { from: 0, to: 10, label: "đếm xuôi" },
        { from: 10, to: 0, label: "đếm ngược" },
      ],
      label: "Đếm xuôi 0 → 10, đếm ngược 10 → 0",
    },
  },

  // ═══ Chủ đề 2: Hình phẳng ═══
  "g1-c2-l1": {
    planeShape: {
      kind: "square",
      labels: ["cạnh"],
      formula: "4 cạnh dài bằng nhau · 4 đỉnh",
    },
  },
  "g1-c2-l2": {
    planeShape: {
      kind: "circle",
      formula: "Đường bao cong · không có cạnh, không có đỉnh",
    },
  },
  "g1-c2-l3": {
    planeShape: { kind: "triangle", labels: ["cạnh"], formula: "3 cạnh · 3 đỉnh" },
  },
  "g1-c2-l4": {
    planeShape: {
      kind: "rectangle",
      labels: ["chiều dài", "chiều rộng"],
      formula: "2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",
    },
  },
  "g1-c2-l5": {
    planeShape: { kind: "square" },
    table: {
      headers: ["Đồ vật", "Có dạng hình"],
      rows: [
        ["Mặt đồng hồ", "Hình tròn"],
        ["Viên gạch lát nền", "Hình vuông"],
        ["Mái nhà", "Hình tam giác"],
        ["Quyển sách", "Hình chữ nhật"],
      ],
      label: "Tìm hình trong đồ vật quanh em",
    },
  },
  "g1-c2-l6": {
    planeShape: {
      kind: "square",
      formula: "🔺 + 🔺 = ▢  (ghép 2 tam giác vuông thành 1 hình vuông)",
      showName: false,
    },
  },
  "g1-c2-l7": {
    planeShape: {
      kind: "rectangle",
      formula: "1 hình tam giác (mái) · 1 hình chữ nhật (thân) · 1 hình vuông (cửa sổ)",
    },
  },
  "g1-c2-l8": {
    table: {
      headers: ["Hình", "Đặc điểm"],
      rows: [
        ["Hình vuông", "4 cạnh dài bằng nhau"],
        ["Hình tròn", "Đường bao cong, không cạnh"],
        ["Hình tam giác", "3 cạnh, 3 đỉnh"],
        ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
      ],
      label: "Bốn hình phẳng bé đã học",
    },
  },

  // ═══ Chủ đề 3: Cộng trừ trong phạm vi 10 ═══
  "g1-c3-l1": {
    operation: { left: 3, sign: "+", right: 2, result: 5 },
    tenFrame: {
      filled: 3,
      total: 5,
      emoji: "🎈",
      extra: 2,
      label: "3 quả bóng thêm 2 quả = 5 quả",
    },
  },
  "g1-c3-l2": {
    numberLine: {
      from: 4,
      to: 7,
      step: 1,
      marks: [4, 5, 6, 7],
      hops: [{ from: 4, to: 7, label: "+3" }],
      label: "4 + 3: đếm tiếp 4 → 5 → 6 → 7",
    },
  },
  "g1-c3-l3": {
    operation: { left: 5, sign: "+", right: 2, result: 7 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 + 5", "7"],
        ["5 + 2", "7"],
      ],
      label: "Đổi chỗ hai số, kết quả không đổi",
    },
  },
  "g1-c3-l4": {
    operation: { left: 5, sign: "+", right: 0, result: 5 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["5 + 0", "5"],
        ["0 + 3", "3"],
      ],
      label: "Cộng với 0 thì giữ nguyên số đó",
    },
  },
  "g1-c3-l5": {
    operation: { left: 6, sign: "−", right: 2, result: 4 },
    tenFrame: {
      filled: 4,
      total: 6,
      emoji: "🍬",
      label: "6 cái kẹo bớt 2 còn 4 cái",
    },
  },
  "g1-c3-l6": {
    numberLine: {
      from: 6,
      to: 9,
      step: 1,
      marks: [6, 7, 8, 9],
      hops: [{ from: 9, to: 6, label: "−3" }],
      label: "9 − 3: đếm lùi 9 → 8 → 7 → 6",
    },
  },
  "g1-c3-l7": {
    operation: { left: 4, sign: "−", right: 0, result: 4 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["4 − 0", "4"],
        ["4 − 4", "0"],
      ],
      label: "Trừ 0 thì giữ nguyên · trừ hết thì bằng 0",
    },
  },
  "g1-c3-l8": {
    table: {
      headers: ["Phép cộng", "Kết quả"],
      rows: [
        ["1 + 1", "2"],
        ["2 + 2", "4"],
        ["3 + 3", "6"],
        ["4 + 4", "8"],
        ["5 + 5", "10"],
        ["2 + 3", "5"],
      ],
      label: "Bảng cộng trong phạm vi 10",
    },
  },
  "g1-c3-l9": {
    operation: { left: 9, sign: "−", right: 5, result: 4 },
    table: {
      headers: ["Phép trừ", "Kết quả"],
      rows: [
        ["9 − 5", "4"],
        ["9 − 4", "5"],
        ["8 − 3", "5"],
        ["10 − 4", "6"],
      ],
      label: "Bảng trừ trong phạm vi 10",
    },
  },
  "g1-c3-l10": {
    operation: { left: 5, sign: "+", right: 3, result: 8 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["5 + 3", "8"],
        ["8 − 3", "5"],
        ["8 − 5", "3"],
      ],
      label: "Từ một phép cộng suy ra hai phép trừ",
    },
  },
  "g1-c3-l11": {
    numberLine: {
      from: 3,
      to: 7,
      step: 1,
      marks: [3, 4, 5, 6, 7],
      hops: [{ from: 3, to: 7, label: "? bước" }],
      label: "3 + ? = 7 — đếm từ 3 đến 7 được 4 bước",
    },
  },
  "g1-c3-l12": {
    operation: { left: 5, sign: "+", right: 2, result: 7 },
    barModel: {
      rows: [
        { label: "Có sẵn", parts: 5 },
        { label: "Thêm vào", parts: 2 },
      ],
      braceLabel: "7 con chim",
    },
  },
  "g1-c3-l13": {
    operation: { left: 6, sign: "+", right: 3, result: 9 },
    numberLine: {
      from: 6,
      to: 9,
      step: 1,
      marks: [6, 7, 8, 9],
      label: "Đếm tiếp từ 6 thêm 3 bước được 9",
    },
  },
  "g1-c3-l14": {
    operation: { left: 4, sign: "+", right: 6, result: 10 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["4 + 6", "10"],
        ["10 − 4", "6"],
        ["10 − 6", "4"],
      ],
      label: "Một phép cộng, hai phép trừ",
    },
  },

  // ═══ Chủ đề 4: Hình khối và vị trí ═══
  "g1-c4-l1": {
    solid: {
      kind: "cube",
      dims: { a: 3 },
      label: "Khối lập phương",
      formula: "6 mặt đều là hình vuông bằng nhau",
    },
  },
  "g1-c4-l2": {
    solid: {
      kind: "cuboid",
      dims: { a: 4, b: 3, c: 2 },
      label: "Khối hộp chữ nhật",
      formula: "6 mặt, các mặt không đều nhau",
    },
  },
  "g1-c4-l3": {
    solid: { kind: "cuboid", dims: { a: 3, b: 2, c: 2 } },
    table: {
      headers: ["Đồ vật", "Là khối gì"],
      rows: [
        ["Xúc xắc", "Khối lập phương"],
        ["Hộp quà", "Khối hộp chữ nhật"],
      ],
      label: "Nhận biết hai khối quanh em",
    },
  },
  "g1-c4-l4": {
    table: {
      headers: ["Vị trí", "Ví dụ"],
      rows: [
        ["Trên", "Con chim ở trên cành"],
        ["Dưới", "Con mèo ở dưới gốc cây"],
        ["Trước", "Rô-bốt ở phía trước"],
        ["Sau", "Cái cặp ở phía sau"],
      ],
      label: "Trên · dưới · trước · sau",
    },
  },
  "g1-c4-l5": {
    table: {
      headers: ["Bên", "Ví dụ"],
      rows: [
        ["Bên phải", "Tay phải của bé"],
        ["Bên trái", "Tay trái của bé"],
      ],
      label: "Trái và phải",
    },
  },
  "g1-c4-l6": {
    table: {
      headers: ["Đồ vật", "Ở đâu"],
      rows: [
        ["Quả bóng", "Ở trên bàn"],
        ["Quyển sách", "Ở bên phải"],
        ["Rô-bốt", "Ở phía trước"],
      ],
      label: "Định hướng trong không gian",
    },
  },
  "g1-c4-l7": {
    solid: { kind: "cube", dims: { a: 3 } },
    table: {
      headers: ["Từ chỉ vị trí", "Nghĩa"],
      rows: [
        ["Trên", "cao hơn"],
        ["Dưới", "thấp hơn"],
        ["Trái", "bên tay trái"],
        ["Phải", "bên tay phải"],
      ],
      label: "Ôn lại các từ chỉ vị trí",
    },
  },

  // ═══ Chủ đề 5: Ôn tập học kì 1 ═══
  "g1-c5-l1": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: "Ôn lại các số từ 0 đến 10",
    },
  },
  "g1-c5-l2": {
    comparison: { left: 8, sign: ">", right: 5 },
    table: {
      headers: ["So sánh", "Dấu"],
      rows: [
        ["8 với 5", ">"],
        ["5 với 8", "<"],
        ["8 với 8", "="],
      ],
      label: "Ôn tập so sánh số",
    },
  },
  "g1-c5-l3": {
    operation: { left: 4, sign: "+", right: 5, result: 9 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["4 + 5", "9"],
        ["9 − 4", "5"],
        ["9 − 5", "4"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 10",
    },
  },
  "g1-c5-l4": {
    planeShape: { kind: "square" },
    table: {
      headers: ["Hình", "Đặc điểm"],
      rows: [
        ["Hình vuông", "4 cạnh dài bằng nhau"],
        ["Hình tròn", "Đường bao cong"],
        ["Hình tam giác", "3 cạnh, 3 đỉnh"],
        ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
      ],
      label: "Ôn tập hình học",
    },
  },
  "g1-c5-l5": {
    table: {
      headers: ["Đồ vật", "Vị trí"],
      rows: [
        ["Đèn bàn", "Ở trên bàn"],
        ["Cặp sách", "Ở dưới bàn"],
      ],
      label: "Ôn tập vị trí trong không gian",
    },
  },
  "g1-c5-l6": {
    table: {
      headers: ["Nội dung ôn", "Ví dụ"],
      rows: [
        ["Số đến 10", "0 → 10"],
        ["Cộng trừ", "4 + 5 = 9"],
        ["Hình học", "vuông · tròn · tam giác"],
        ["Vị trí", "trên · dưới · trái · phải"],
      ],
      label: "Ôn tập chung học kì 1",
    },
  },

  // ═══ Chủ đề 6: Các số đến 100 ═══
  "g1-c6-l1": {
    baseTen: { tens: 1, ones: 0, label: "10 que rời = 1 bó chục" },
  },
  "g1-c6-l2": {
    baseTen: { tens: 1, ones: 4, label: "14 gồm 1 chục và 4 đơn vị" },
    numberLine: {
      from: 11,
      to: 20,
      step: 1,
      marks: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      label: "Các số từ 11 đến 20",
    },
  },
  "g1-c6-l3": {
    numberLine: {
      from: 10,
      to: 100,
      step: 10,
      marks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      label: "Các số tròn chục",
    },
  },
  "g1-c6-l4": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 4],
      label: "34 gồm 3 chục và 4 đơn vị",
    },
    baseTen: { tens: 3, ones: 4 },
  },
  "g1-c6-l5": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [4, 5],
      label: "45 đọc là bốn mươi lăm",
    },
  },
  "g1-c6-l6": {
    comparison: { left: 34, sign: "<", right: 43 },
    table: {
      headers: ["So sánh", "Vì sao"],
      rows: [
        ["34 < 43", "3 chục bé hơn 4 chục"],
        ["43 > 34", "4 chục lớn hơn 3 chục"],
      ],
      label: "So sánh số có hai chữ số: so hàng chục trước",
    },
  },
  "g1-c6-l7": {
    table: {
      headers: ["Câu hỏi", "Đáp số"],
      rows: [
        ["Số lớn nhất có hai chữ số", "99"],
        ["Số bé nhất có hai chữ số", "10"],
        ["Số lớn nhất có một chữ số", "9"],
      ],
      label: "Số lớn nhất và số bé nhất",
    },
  },
  "g1-c6-l8": {
    numberLine: {
      from: 33,
      to: 35,
      step: 1,
      marks: [33, 34, 35],
      label: "33 là số liền trước của 34 · 35 là số liền sau của 34",
    },
  },
  "g1-c6-l9": {
    table: {
      headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      rows: [
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
      ],
      label: "Bảng các số từ 1 đến 100 (năm chục đầu)",
    },
  },
  "g1-c6-l10": {
    numberLine: {
      from: 25,
      to: 35,
      step: 1,
      marks: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      hops: [
        { from: 25, to: 26, label: "+1" },
        { from: 25, to: 35, label: "+10" },
      ],
      label: "Thêm 1 thì sang phải 1 ô · thêm 10 thì xuống 1 hàng",
    },
  },
  "g1-c6-l11": {
    numberLine: {
      from: 30,
      to: 33,
      step: 1,
      marks: [30, 31, 32, 33],
      label: "30 · 31 · ? · 33 — hai số cách nhau 1, nên ? = 32",
    },
  },
  "g1-c6-l12": {
    baseTen: { tens: 3, ones: 4, label: "34 = 3 chục và 4 đơn vị" },
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 4],
      label: "34 = 30 + 4",
    },
  },

  // ═══ Chủ đề 7: Độ dài và đo độ dài ═══
  "g1-c7-l1": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Bút xanh dài 5 cm, bút đỏ dài 3 cm — bút xanh dài hơn",
    },
  },
  "g1-c7-l2": {
    table: {
      headers: ["Vật", "Số gang tay"],
      rows: [
        ["Bàn học", "3"],
        ["Cửa sổ", "2"],
      ],
      label: "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay → bàn dài hơn",
    },
  },
  "g1-c7-l3": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Mỗi khoảng trên thước dài 1 cm",
    },
  },
  "g1-c7-l4": {
    ruler: {
      lengthCm: 8,
      measure: { from: 0, to: 8 },
      label: "Đầu vật đặt ở vạch 0, đầu kia ở vạch 8 → vật dài 8 cm",
    },
  },
  "g1-c7-l5": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Đoạn thẳng dài 5 cm: hai điểm ở vạch 0 và vạch 5",
    },
  },
  "g1-c7-l6": {
    ruler: {
      lengthCm: 20,
      measure: { from: 0, to: 20 },
      label: "Ước lượng 20 cm — đo thật 20 cm ✓",
    },
  },
  "g1-c7-l7": {
    table: {
      headers: ["Cách đo", "Đo được"],
      rows: [
        ["Gang tay", "Bàn học, quyển sách"],
        ["Bước chân", "Nền nhà, sân"],
      ],
      label: "Đo độ dài bằng gang tay, bước chân",
    },
  },
  "g1-c7-l8": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "1 cm = 1 khoảng trên thước — nhớ đặt vạch 0 vào đầu vật",
    },
  },

  // ═══ Chủ đề 8: Cộng trừ (không nhớ) trong phạm vi 100 ═══
  "g1-c8-l1": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [2, 5],
      label: "25 gồm 2 chục và 5 đơn vị",
    },
    operation: { left: 25, sign: "+", right: 4, result: 29 },
  },
  "g1-c8-l2": {
    operation: { left: 34, sign: "+", right: 5, result: 39 },
  },
  "g1-c8-l3": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [3, 2],
      label: "32 + 14: cộng từng hàng một, bắt đầu từ hàng đơn vị",
    },
    operation: { left: 32, sign: "+", right: 14, result: 46 },
  },
  "g1-c8-l4": {
    operation: { left: 24, sign: "+", right: 15, result: 39 },
  },
  "g1-c8-l5": {
    operation: { left: 39, sign: "−", right: 5, result: 34 },
  },
  "g1-c8-l6": {
    operation: { left: 48, sign: "−", right: 6, result: 42 },
  },
  "g1-c8-l7": {
    operation: { left: 57, sign: "−", right: 23, result: 34 },
  },
  "g1-c8-l8": {
    operation: { left: 46, sign: "−", right: 24, result: 22 },
  },
  "g1-c8-l9": {
    baseTen: {
      tens: 5,
      ones: 0,
      label: "30 + 20 = 50 nghĩa là 3 chục + 2 chục = 5 chục",
    },
    operation: { left: 30, sign: "+", right: 20, result: 50 },
  },
  "g1-c8-l10": {
    operation: { left: 23, sign: "+", right: 15, result: 38 },
    barModel: {
      rows: [
        { label: "Có sẵn", parts: 23 },
        { label: "Thêm vào", parts: 15 },
      ],
      braceLabel: "38 quả trứng",
    },
  },
  "g1-c8-l11": {
    operation: { left: 65, sign: "−", right: 24, result: 41 },
    barModel: {
      rows: [
        { label: "Có sẵn", parts: 65 },
        { label: "Bớt đi", parts: 24 },
      ],
      braceLabel: "41 hộp sữa",
    },
  },
  "g1-c8-l12": {
    operation: { left: 32, sign: "+", right: 14, result: 46 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["25 + 4", "29"],
        ["32 + 14", "46"],
        ["57 − 23", "34"],
      ],
      label: "Luyện tập chung cộng trừ trong phạm vi 100",
    },
  },

  // ═══ Chủ đề 9: Thời gian — giờ và lịch ═══
  "g1-c9-l1": {
    clock: {
      hour: 3,
      minute: 0,
      timeText: "Mặt đồng hồ có 12 số — kim ngắn chỉ giờ, kim dài chỉ phút",
    },
  },
  "g1-c9-l2": {
    clock: { hour: 7, minute: 0, timeText: "7 giờ" },
  },
  "g1-c9-l3": {
    table: {
      headers: ["Buổi", "Giờ"],
      rows: [
        ["Sáng", "6 giờ → 10 giờ"],
        ["Trưa", "11 giờ → 12 giờ"],
        ["Chiều", "1 giờ → 5 giờ"],
        ["Tối", "7 giờ → 9 giờ"],
      ],
      label: "Các buổi trong ngày",
    },
  },
  "g1-c9-l4": {
    clock: { hour: 8, minute: 0, timeText: "8 giờ — bé vào lớp" },
    table: {
      headers: ["Giờ", "Việc của bé"],
      rows: [
        ["7 giờ", "Ngủ dậy"],
        ["8 giờ", "Vào lớp"],
        ["11 giờ", "Tan học buổi sáng"],
        ["9 giờ tối", "Đi ngủ"],
      ],
      label: "Thực hành xem giờ đúng",
    },
  },
  "g1-c9-l5": {
    table: {
      headers: ["Thứ", "Trong tuần"],
      rows: [
        ["Thứ Hai", "ngày đầu tuần"],
        ["Thứ Ba", "ngày thứ hai"],
        ["Thứ Tư", "ngày thứ ba"],
        ["Thứ Năm", "ngày thứ tư"],
        ["Thứ Sáu", "ngày thứ năm"],
        ["Thứ Bảy", "ngày thứ sáu"],
        ["Chủ nhật", "ngày cuối tuần"],
      ],
      label: "Một tuần có 7 ngày",
    },
  },
  "g1-c9-l6": {
    table: {
      headers: ["Ngày", "Là thứ"],
      rows: [
        ["Hôm qua", "Thứ Hai"],
        ["Hôm nay", "Thứ Ba"],
        ["Ngày mai", "Thứ Tư"],
      ],
      label: "Hôm nay thứ Ba → hôm qua thứ Hai → ngày mai thứ Tư",
    },
  },
  "g1-c9-l7": {
    table: {
      headers: [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ nhật",
      ],
      rows: [
        [1, 2, 3, 4, 5, 6, 7],
        [8, 9, 10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19, 20, 21],
      ],
      label: "Tờ lịch tháng 9 — mỗi cột là một thứ, mỗi ô là một ngày",
    },
  },
  "g1-c9-l8": {
    table: {
      headers: [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ nhật",
      ],
      rows: [[13, 14, 15, 16, 17, 18, 19]],
      label: "Ngày 15 nằm ở cột Thứ Tư → ngày 15 là thứ Tư",
    },
  },
  "g1-c9-l9": {
    clock: {
      hour: 9,
      minute: 0,
      timeText: "9 giờ — kim dài chỉ 12, kim ngắn chỉ 9",
    },
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 tuần", "7 ngày"],
        ["1 ngày", "24 giờ"],
      ],
      label: "Thực hành và luyện tập chung",
    },
  },

  // ═══ Chủ đề 10: Ôn tập cuối năm ═══
  "g1-c10-l1": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: "Liền sau của 9 là 10 · liền trước của 10 là 9",
    },
  },
  "g1-c10-l2": {
    operation: { left: 6, sign: "+", right: 4, result: 10 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["6 + 4", "10"],
        ["10 − 6", "4"],
        ["10 − 4", "6"],
      ],
      label: "6 + 4 = 10 → 10 − 6 = 4 và 10 − 4 = 6",
    },
  },
  "g1-c10-l3": {
    placeValue: {
      headers: ["Chục", "Đơn vị"],
      digits: [4, 7],
      label: "47 = 40 + 7",
    },
    comparison: { left: 35, sign: "<", right: 53 },
  },
  "g1-c10-l4": {
    operation: { left: 32, sign: "+", right: 14, result: 46 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["25 + 4", "29"],
        ["32 + 14", "46"],
        ["57 − 23", "34"],
      ],
      label: "Ôn tập cộng trừ trong phạm vi 100",
    },
  },
  "g1-c10-l5": {
    planeShape: { kind: "square" },
    solid: {
      kind: "cube",
      dims: { a: 3 },
      label: "Khối lập phương",
      formula: "6 mặt đều là hình vuông bằng nhau",
    },
  },
  "g1-c10-l6": {
    ruler: {
      lengthCm: 5,
      measure: { from: 0, to: 5 },
      label: "Đoạn thẳng dài 5 cm nếu đầu kia trùng vạch 5 của thước",
    },
  },
  "g1-c10-l7": {
    clock: { hour: 8, minute: 0, timeText: "8 giờ" },
    table: {
      headers: ["Đại lượng", "Bằng"],
      rows: [
        ["1 tuần", "7 ngày"],
        ["1 ngày", "24 giờ"],
      ],
      label: "Ôn tập thời gian — giờ và lịch",
    },
  },
  "g1-c10-l8": {
    table: {
      headers: ["Mạch kiến thức", "Ví dụ"],
      rows: [
        ["Số đến 100", "47 = 40 + 7"],
        ["Cộng trừ", "32 + 14 = 46"],
        ["Hình học", "hình vuông · khối lập phương"],
        ["Đo độ dài", "đoạn thẳng 5 cm"],
        ["Giờ và lịch", "8 giờ · 1 tuần = 7 ngày"],
      ],
      label: "Ôn tập chung cuối năm",
    },
  },
  "g1-c10-l9": {
    table: {
      headers: ["Dạng bài", "Ví dụ"],
      rows: [
        ["Đọc số", "47"],
        ["So sánh", "35 < 53"],
        ["Đặt tính", "32 + 14 = 46"],
        ["Giải toán", "5 + 2 = 7"],
        ["Hình học", "hình tam giác"],
        ["Xem giờ", "7 giờ"],
      ],
      label: "Luyện đề cuối năm Lớp 1",
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Máy móc: không cần sửa từ đây trở xuống
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SPECS_LOP2 } from "./hinh-lop2.mjs";
import { SPECS_LOP3 } from "./hinh-lop3.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAFE_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const khoa = (k) => (SAFE_KEY.test(k) ? k : JSON.stringify(k));

/** In ra mã JS theo lối giống file (2 dấu cách, chuỗi nháy kép, dấu phẩy cuối). */
function fmt(v, ind) {
  const pad = " ".repeat(ind);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (v === null) return "null";
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    const motDong = "[" + v.map((x) => fmt(x, 0)).join(", ") + "]";
    if (!motDong.includes("\n") && motDong.length + ind <= 78) return motDong;
    return (
      "[\n" +
      v.map((x) => pad + "  " + fmt(x, ind + 2)).join(",\n") +
      ",\n" +
      pad +
      "]"
    );
  }
  if (typeof v === "object") {
    const ks = Object.keys(v);
    if (!ks.length) return "{}";
    const motDong =
      "{ " + ks.map((k) => khoa(k) + ": " + fmt(v[k], 0)).join(", ") + " }";
    if (!motDong.includes("\n") && motDong.length + ind <= 78) return motDong;
    return (
      "{\n" +
      ks.map((k) => pad + "  " + khoa(k) + ": " + fmt(v[k], ind + 2)).join(",\n") +
      ",\n" +
      pad +
      "}"
    );
  }
  throw new Error(`không in được giá trị kiểu ${typeof v}`);
}

// Mẫu nhận slide "hình" CHỈ có `text` — chèn ngay SAU dòng `text` (đọc dễ hơn):
//   type: "visual",
//   content: {
//     text: "…",
//
// 🔴 PHẢI NHẬN CẢ NHÁY ĐƠN `'…'` LẪN NHÁY KÉP `"…"`. Đã đo được ở Lớp 3: slide
// `g3-c16-l6` viết `text: '"tất cả" → cộng …'` bằng nháy ĐƠN, vì chuỗi bên trong chứa
// nháy kép nên Prettier KHÔNG đổi được sang nháy kép. Mẫu chỉ nhận nháy kép đã bỏ sót
// slide đó (rồi lặng lẽ nhảy sang slide của bài sau để chèn — xem chú thích `m.index`).
// Cũng KHÔNG cho `[^"\\]` khớp xuống dòng: chuỗi trong file luôn viết `\n` bằng hai ký tự.
const MAU_VISUAL =
  /type: "visual",\r?\n(\s*)content: \{\r?\n(\s*)text: (?:"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'),\r?\n/;

// Mẫu dự phòng cho slide "khái niệm" — khi bài KHÔNG có slide "hình" nào.
// Chèn ngay sau dòng `content: {`, tức là các khoá hình đứng ĐẦU object.
const MAU_CONCEPT = /type: "concept",\r?\n(\s*)content: \{\r?\n(\s*)/;

const MONG_DOI = { 1: 97, 2: 120, 3: 123 };
const SPECS = { 1: SPECS_LOP1, 2: SPECS_LOP2, 3: SPECS_LOP3 };

const lop = Number(process.argv[2]);
const ghiThat = process.argv.includes("--ghi");

if (!SPECS[lop]) {
  console.error(`Chưa có bảng dữ liệu cho lớp ${lop}.`);
  process.exit(1);
}

const specs = SPECS[lop];
const soBai = Object.keys(specs).length;
const file = path.join(ROOT, "client", "src", "data", `grade${lop}Data.js`);

console.log("═".repeat(74));
console.log(`  TIÊM HÌNH VÀO LỚP ${lop}${ghiThat ? "" : "   (CHẠY THỬ — KHÔNG GHI)"}`);
console.log("═".repeat(74));

// ── CHỐT 1: số lượng ────────────────────────────────────────────────────────
if (soBai !== MONG_DOI[lop]) {
  console.error(
    `\n❌ DỪNG: bảng có ${soBai} bài, nhưng phải là ${MONG_DOI[lop]}.\n` +
      `   Không ghi gì cả. Sửa bảng cho đủ rồi chạy lại.`,
  );
  process.exit(1);
}
console.log(`\n  Chốt 1 OK — bảng có đúng ${soBai} bài.`);

let text = fs.readFileSync(file, "utf8");
if (text.includes("\uFFFD")) {
  console.error("\n❌ DỪNG: file ĐÃ có ký tự hỏng U+FFFD từ trước. Sửa trước đã.");
  process.exit(1);
}

// ── CHỐT 2 + 3: tìm đúng bài, đúng slide hình ──────────────────────────────
const edits = [];
const loi = [];
const daChiem = new Map(); // vị trí chèn -> id bài đã chiếm (để báo được TRÙNG VỚI BÀI NÀO)
const baiKhongCoSlideHinh = [];

for (const [id, spec] of Object.entries(specs)) {
  const dau = `id: "${id}"`;
  const i1 = text.indexOf(dau);
  if (i1 < 0) {
    loi.push(`${id}: KHÔNG thấy bài này trong file`);
    continue;
  }
  if (text.indexOf(dau, i1 + 1) >= 0) {
    loi.push(`${id}: xuất hiện NHIỀU HƠN MỘT lần trong file`);
    continue;
  }

  // 🔴 Ranh giới của bài này: `id:` kế tiếp. Không có ranh giới này thì khi bài KHÔNG
  // có slide "hình", phép tìm sẽ nhảy sang slide hình của BÀI SAU — và ta sẽ tiêm hình
  // của bài này vào bài khác, im lặng. Đã đo được đúng ca này ở Lớp 2.
  const sauBai = text.indexOf('id: "', i1 + dau.length);
  const hetBai = sauBai < 0 ? text.length : sauBai;

  const iVis = text.indexOf('type: "visual"', i1);
  const coSlideHinh = iVis >= 0 && iVis < hetBai;

  let moc;
  let mau;
  if (coSlideHinh) {
    moc = iVis;
    mau = MAU_VISUAL;
  } else {
    const iCon = text.indexOf('type: "concept"', i1);
    if (iCon < 0 || iCon >= hetBai) {
      loi.push(`${id}: không có slide hình, cũng không có slide khái niệm`);
      continue;
    }
    baiKhongCoSlideHinh.push(id);
    moc = iCon;
    mau = MAU_CONCEPT;
  }

  // 🔴 BẮT BUỘC `m.index === 0`: `exec` quét TỚI TRƯỚC vô hạn, nên nếu slide của bài
  // này không khớp mẫu thì nó lặng lẽ nhảy sang slide của BÀI SAU rồi chèn hình sai chỗ.
  // Buộc khớp ngay tại đầu slide thì sai định dạng là LỖI, không phải chèn nhầm.
  const m = mau.exec(text.slice(moc));
  if (!m || m.index !== 0) {
    const doan = text.slice(moc, moc + 160).replace(/\n/g, " ⏎ ");
    loi.push(
      `${id}: slide không khớp mẫu chèn — đầu slide thực tế là: ${doan}`,
    );
    continue;
  }

  const indent = m[2];
  const them =
    Object.entries(spec)
      .map(([k, v]) => indent + khoa(k) + ": " + fmt(v, indent.length))
      .join(",\n") + ",\n";

  const at = moc + m.index + m[0].length;
  if (daChiem.has(at)) {
    loi.push(
      `${id}: chỗ chèn trùng với bài ${daChiem.get(at)} — cùng một slide ` +
        `(bài này ${coSlideHinh ? "CÓ" : "KHÔNG có"} slide hình)`,
    );
    continue;
  }
  daChiem.set(at, id);
  edits.push({ id, at, them, vaoConcept: !coSlideHinh });
}

if (loi.length) {
  console.error(`\n❌ DỪNG — ${loi.length} lỗi, KHÔNG ghi gì cả:`);
  for (const l of loi) console.error(`   • ${l}`);
  process.exit(1);
}
console.log(`  Chốt 2 OK — ${edits.length} bài đều tìm thấy đúng một lần.`);
console.log(`  Chốt 3 OK — ${edits.length} slide đều khớp mẫu chèn.`);
if (baiKhongCoSlideHinh.length) {
  console.log(
    `  ↳ ${baiKhongCoSlideHinh.length} bài KHÔNG có slide "hình" ⇒ tiêm vào slide "khái niệm":\n` +
      `     ${baiKhongCoSlideHinh.join(", ")}`,
  );
}

// Chèn từ CUỐI về ĐẦU để vị trí các chỗ trước không bị lệch.
edits.sort((a, b) => b.at - a.at);
for (const e of edits) text = text.slice(0, e.at) + e.them + text.slice(e.at);

if (text.includes("\uFFFD")) {
  console.error("\n❌ DỪNG: nội dung sau khi chèn có ký tự hỏng U+FFFD. Không ghi.");
  process.exit(1);
}

if (!ghiThat) {
  console.log(
    `\n  (chạy thử) Sẽ chèn ${edits.length} khối, mỗi khối là các khoá hình của một bài.`,
  );
  console.log(`  Ví dụ 3 bài đầu:\n`);
  for (const e of edits.slice(-3).reverse()) {
    console.log(`  ── ${e.id}`);
    for (const line of e.them.trimEnd().split("\n")) console.log(`  ${line}`);
  }
  console.log(`\n  Muốn ghi thật thì thêm --ghi`);
  process.exit(0);
}

// ── Ghi (có sao lưu) ────────────────────────────────────────────────────────
const backup = path.join(ROOT, "scratch", `grade${lop}Data.truoc-hinh.js`);
fs.copyFileSync(file, backup);
fs.writeFileSync(file, text, "utf8");
console.log(`\n  Đã ghi. Sao lưu: ${path.relative(ROOT, backup)}`);

// ── CHỐT 4: đọc lại file vừa ghi và đối chiếu ───────────────────────────────
const mod = await import(pathToFileURL(file).href + `?v=${Date.now()}`);
const data = mod[`grade${lop}Data`];
const theoId = new Map();
for (const ch of data.chapters ?? [])
  for (const l of ch.lessons ?? []) theoId.set(l.id, l);

let sai = 0;
for (const [id, spec] of Object.entries(specs)) {
  const bai = theoId.get(id);
  if (!bai) {
    console.error(`   ✗ ${id}: đọc lại không thấy bài`);
    sai++;
    continue;
  }
  // Hình có thể nằm ở slide "hình" hoặc (với bài không có slide hình) ở slide "khái niệm".
  const slides = bai.slides ?? [];
  const coHinh =
    slides.find((s) => s.type === "visual") ??
    slides.find((s) => s.type === "concept");
  for (const [k, v] of Object.entries(spec)) {
    const got = coHinh?.content?.[k];
    if (JSON.stringify(got) !== JSON.stringify(v)) {
      console.error(
        `   ✗ ${id}.${k}: đọc lại thấy ${JSON.stringify(got)} — mong đợi ${JSON.stringify(v)}`,
      );
      sai++;
    }
  }
}
const fffd = (text.match(/\uFFFD/g) || []).length;
console.log(`  Chốt 4: ${sai === 0 ? "OK" : `${sai} SAI`} · U+FFFD = ${fffd}`);

if (sai) {
  console.error(
    `\n❌ File đã ghi nhưng đọc lại thấy sai. KHÔI PHỤC bằng:\n` +
      `   Copy-Item ${path.relative(ROOT, backup)} ${path.relative(ROOT, file)} -Force`,
  );
  process.exit(1);
}
console.log(`\n✅ Xong. Giờ chạy: cổng kiểm, scratch/kiem-tra-hinh-anh.mjs, rồi build.\n`);
