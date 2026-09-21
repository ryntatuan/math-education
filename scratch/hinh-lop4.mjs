// Dữ liệu HÌNH cho LỚP 4 — 65 bài.
//
// Lớp 4 mạnh về: số có nhiều chữ số (`placeValue` 5–9 cột), biểu thức chứa chữ,
// góc nhọn/tù/bẹt (`angle`), hình bình hành (`planeShape` parallelogram),
// hình thoi (rhombus), phân số (`fractionBar` nhiều hàng), toán Tổng–Tỉ và Hiệu–Tỉ
// (`barModel` — đúng loại sơ đồ đoạn thẳng mà SGK dùng).
//
// Lưu ý: Lớp 4 chỉ có 40 slide "hình" cho 65 bài, nên 25 bài sẽ được tiêm vào slide
// "khái niệm" (script tự nhận ra và báo lại).

export const SPECS_LOP4 = {
  // ═══ Chương 1: Số tự nhiên & Bảng đơn vị đo khối lượng ═══
  "g4-c1-l1": {
    placeValue: {
      headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [6, 8, 3, 5, 2],
      label: "68 352 = 60 000 + 8 000 + 300 + 50 + 2",
    },
  },
  "g4-c1-l2": {
    table: {
      headers: ["a", "Giá trị của 15 + a"],
      rows: [
        [6, 21],
        [10, 25],
        [0, 15],
      ],
      label: "Mỗi lần thay chữ a bằng một số, ta tính được MỘT giá trị của biểu thức",
    },
    operation: { left: 15, sign: "+", right: 6, result: 21 },
  },
  "g4-c1-l3": {
    placeValue: {
      headers: ["Trăm nghìn", "Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [4, 3, 2, 5, 1, 6],
      label: "Số 432 516 — chữ số 4 ở hàng trăm nghìn, có giá trị 400 000",
    },
  },
  "g4-c1-l4": {
    table: {
      headers: ["Lớp", "Gồm các hàng"],
      rows: [
        ["Lớp nghìn", "trăm nghìn · chục nghìn · nghìn"],
        ["Lớp đơn vị", "trăm · chục · đơn vị"],
      ],
      label: "Bảng phân chia Hàng và Lớp — 3 hàng liền nhau hợp thành 1 lớp",
    },
  },
  "g4-c1-l5": {
    comparison: { left: 100000, sign: ">", right: 99999 },
    table: {
      headers: ["So sánh", "Vì sao"],
      rows: [
        ["100 000 > 99 999", "6 chữ số nhiều hơn 5 chữ số"],
        ["753 210 > 751 980", "cùng hàng trăm nghìn, chục nghìn; hàng nghìn 3 > 1"],
      ],
      label: "So sánh các số có nhiều chữ số: so từ hàng cao nhất",
    },
  },
  "g4-c1-l6": {
    placeValue: {
      headers: [
        "Trăm triệu",
        "Chục triệu",
        "Triệu",
        "Trăm nghìn",
        "Chục nghìn",
        "Nghìn",
        "Trăm",
        "Chục",
        "Đơn vị",
      ],
      digits: [3, 4, 5, 0, 0, 0, 0, 0, 0],
      label: "345 000 000 đọc là ba trăm bốn mươi lăm triệu",
    },
  },
  "g4-c1-l7": {
    numberLine: {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      label: "Số tự nhiên bé nhất là 0 · không có số tự nhiên lớn nhất · hai số liên tiếp hơn kém nhau 1",
    },
    table: {
      headers: ["Đặc điểm", "Nội dung"],
      rows: [
        ["Bé nhất", "số 0"],
        ["Lớn nhất", "không có"],
        ["Hai số liên tiếp", "hơn kém nhau 1 đơn vị"],
        ["Chữ số dùng để viết", "0, 1, 2, 3, 4, 5, 6, 7, 8, 9"],
      ],
      label: "Dãy số tự nhiên và hệ thập phân",
    },
  },
  "g4-c1-l8": {
    placeValue: {
      headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [7, 2, 4, 5],
      label: "7 245 = 7 000 + 200 + 40 + 5",
    },
    table: {
      headers: ["Chữ số", "Giá trị"],
      rows: [
        ["7", "7 000"],
        ["2", "200"],
        ["4", "40"],
        ["5", "5"],
      ],
      label: "Giá trị của mỗi chữ số phụ thuộc vào HÀNG của nó",
    },
  },
  "g4-c1-l9": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 yến", "10 kg"],
        ["1 tạ", "10 yến = 100 kg"],
        ["1 tấn", "10 tạ = 1 000 kg"],
      ],
      label: "Tấn > Tạ > Yến > kg > hg > dag > g — mỗi đơn vị gấp 10 lần đơn vị liền sau",
    },
  },
  "g4-c1-l10": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 giờ", "60 phút"],
        ["1 phút", "60 giây"],
        ["1 thế kỉ", "100 năm"],
      ],
      label: "Năm 2024 thuộc thế kỉ XXI (thứ hai mươi mốt)",
    },
  },
  "g4-c1-l11": {
    operation: { left: 42, sign: ":", right: 3, result: 14 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Tổng các số hạng", "12 + 14 + 16 = 42"],
        ["Số các số hạng", "3"],
        ["Trung bình cộng", "42 : 3 = 14"],
      ],
      label: "Trung bình cộng = Tổng các số hạng : Số các số hạng",
    },
  },
  "g4-c1-l12": {
    barChart: {
      title: "Số cây trồng được của các lớp",
      items: [
        { label: "Lớp 4A", value: 15 },
        { label: "Lớp 4B", value: 12 },
        { label: "Lớp 4C", value: 18 },
      ],
      unit: "cây",
      highlight: 2,
    },
    table: {
      headers: ["Trục", "Ghi gì"],
      rows: [
        ["Cột nằm ngang", "tên các đối tượng"],
        ["Cột thẳng đứng", "số lượng"],
        ["Cột càng cao", "số lượng càng nhiều"],
      ],
      label: "Đặc điểm biểu đồ cột",
    },
  },

  // ═══ Chương 2: Bốn phép tính & Hình học ═══
  "g4-c2-l1": {
    operation: { left: 483526, sign: "+", right: 254138, result: 737664 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["483 526 + 254 138", "737 664"],
        ["865 240 − 328 175", "537 065"],
      ],
      label: "Chú ý cộng thêm số nhớ vào hàng tiếp theo bên trái",
    },
  },
  "g4-c2-l2": {
    operation: { left: 5, sign: "×", right: 2, result: 10 },
    table: {
      headers: ["Biểu thức", "Thay số", "Giá trị"],
      rows: [["a + b × c", "10 + 5 × 2 = 10 + 10", "20"]],
      label: "Nhân chia trước, cộng trừ sau",
    },
  },
  "g4-c2-l3": {
    operation: { left: 200, sign: "+", right: 389, result: 589 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Đổi chỗ", "127 + 389 + 73 = (127 + 73) + 389"],
        ["Tính", "200 + 389 = 589"],
      ],
      label: "Dùng tính chất giao hoán và kết hợp để tính thuận tiện",
    },
  },
  "g4-c2-l4": {
    barModel: {
      rows: [
        { label: "Số lớn", parts: 8 },
        { label: "Số bé", parts: 5 },
      ],
      braceLabel: "Tổng 13 · Hiệu 3",
    },
    table: {
      headers: ["Cần tìm", "Công thức"],
      rows: [
        ["Số lớn", "(Tổng + Hiệu) : 2"],
        ["Số bé", "(Tổng − Hiệu) : 2"],
      ],
      label: "Tìm hai số khi biết Tổng và Hiệu",
    },
  },
  "g4-c2-l5": {
    angle: {
      kind: "acute",
      degrees: 45,
      label: "Góc nhọn — bé hơn góc vuông",
    },
    table: {
      headers: ["Loại góc", "Đặc điểm"],
      rows: [
        ["Góc nhọn", "bé hơn góc vuông (90°)"],
        ["Góc vuông", "bằng 90°"],
        ["Góc tù", "lớn hơn góc vuông"],
        ["Góc bẹt", "bằng hai góc vuông (180°)"],
      ],
      label: "Góc nhọn, góc tù, góc bẹt",
    },
  },
  "g4-c2-l6": {
    angle: {
      kind: "right",
      degrees: 90,
      label: "Hai đường thẳng vuông góc tạo thành góc 90° (kí hiệu ⊥)",
    },
    table: {
      headers: ["Quan hệ", "Đặc điểm"],
      rows: [
        ["Vuông góc", "cắt nhau tạo góc 90°"],
        ["Song song", "cách đều nhau, không bao giờ cắt nhau"],
      ],
      label: "Hai đường thẳng vuông góc & song song",
    },
  },
  "g4-c2-l7": {
    operation: { left: 142315, sign: "×", right: 3, result: 426945 },
    table: {
      headers: ["Tính chất", "Viết"],
      rows: [
        ["Giao hoán", "a × b = b × a"],
        ["Kết hợp", "(a × b) × c = a × (b × c)"],
      ],
      label: "Nhân với số có một chữ số",
    },
  },
  "g4-c2-l8": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["35 × 10", "350"],
        ["35 × 100", "3 500"],
        ["4 800 : 100", "48"],
        ["70 000 : 1 000", "70"],
      ],
      label: "Nhân với 10, 100, 1 000… chỉ việc thêm chữ số 0; chia thì bớt chữ số 0",
    },
  },
  "g4-c2-l9": {
    planeShape: {
      kind: "square",
      labels: ["1 dm"],
      formula: "1 dm² là diện tích hình vuông cạnh 1 dm",
    },
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 m²", "100 dm²"],
        ["1 dm²", "100 cm²"],
        ["1 m²", "10 000 cm²"],
      ],
      label: "Mỗi đơn vị diện tích gấp 100 lần đơn vị bé hơn liền kề",
    },
  },
  "g4-c2-l10": {
    operation: { left: 35, sign: "×", right: 11, result: 385 },
    table: {
      headers: ["Công thức", "Ví dụ"],
      rows: [
        ["a × (b + c) = a × b + a × c", "35 × 11 = 350 + 35 = 385"],
        ["a × (b − c) = a × b − a × c", "35 × 9 = 350 − 35 = 315"],
      ],
      label: "Nhân một số với một tổng, một hiệu",
    },
  },
  "g4-c2-l11": {
    table: {
      headers: ["Phép tính", "Mẹo", "Kết quả"],
      rows: [
        ["35 × 11", "3 + 5 = 8, chèn 8 vào giữa 3 và 5", "385"],
        ["48 × 11", "4 + 8 = 12, viết 2 nhớ 1 sang hàng trăm", "528"],
      ],
      label: "Mẹo nhân nhẩm với 11",
    },
  },
  "g4-c2-l12": {
    operation: { left: 128472, sign: ":", right: 6, result: 21412 },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["128 472 : 6", "21 412"],
        ["157 : 5", "31 (dư 2)"],
      ],
      label: "Chia cho số có một chữ số — số dư luôn bé hơn số chia",
    },
  },
  "g4-c2-l13": {
    operation: { left: 84, sign: ":", right: 21, result: 4 },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Làm tròn để đoán", "80 : 20 = 4"],
        ["Thử lại", "21 × 4 = 84 ⇒ thương là 4"],
        ["Chú ý", "số bị chia bé hơn số chia thì viết 0 vào thương"],
      ],
      label: "Chia cho số có hai, ba chữ số",
    },
  },

  // ═══ Chương 3: Dấu hiệu chia hết & Hình bình hành ═══
  "g4-c3-l1": {
    table: {
      headers: ["Chia hết cho", "Chữ số tận cùng"],
      rows: [
        ["2", "0, 2, 4, 6, 8 (số chẵn)"],
        ["5", "0 hoặc 5"],
        ["cả 2 và 5", "0"],
      ],
      label: "Chỉ cần nhìn chữ số tận cùng",
    },
  },
  "g4-c3-l2": {
    table: {
      headers: ["Chia hết cho", "Dấu hiệu"],
      rows: [
        ["9", "tổng các chữ số chia hết cho 9"],
        ["3", "tổng các chữ số chia hết cho 3"],
      ],
      label: "Số chia hết cho 9 thì chắc chắn chia hết cho 3 (điều ngược lại chưa chắc)",
    },
  },
  "g4-c3-l3": {
    planeShape: {
      kind: "square",
      labels: ["1 km"],
      formula: "1 km² là diện tích hình vuông cạnh 1 km",
    },
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [["1 km²", "1 000 000 m²"]],
      label: "Ki-lô-mét vuông",
    },
  },
  "g4-c3-l4": {
    planeShape: {
      kind: "parallelogram",
      labels: ["đáy a", "chiều cao h"],
      formula: "S = a × h (a và h cùng đơn vị đo)",
    },
  },
  "g4-c3-l5": {
    table: {
      headers: ["Số", "Chia hết cho", "Vì sao"],
      rows: [
        ["1 250", "2 và 5", "tận cùng là 0"],
        ["2 345", "5", "tận cùng là 5"],
        ["3 478", "2", "tận cùng là 8"],
      ],
      label: "Luyện tập dấu hiệu chia hết cho 2 và cho 5",
    },
  },
  "g4-c3-l6": {
    table: {
      headers: ["Số", "Tổng các chữ số", "Chia hết cho"],
      rows: [
        ["945", "9 + 4 + 5 = 18", "9 (và 3)"],
        ["1 245", "1 + 2 + 4 + 5 = 12", "3"],
        ["2 300", "2 + 3 + 0 + 0 = 5", "không chia hết cho 3, 9"],
      ],
      label: "Luyện tập dấu hiệu chia hết cho 9 và cho 3",
    },
  },
  "g4-c3-l7": {
    table: {
      headers: ["Đề", "Chọn chữ số"],
      rows: [
        ["2□5 chia hết cho 9", "2 + 5 = 7, cần thêm 2 ⇒ □ = 2"],
        ["4□0 chia hết cho cả 2 và 5", "tận cùng 0 ⇒ □ bất kỳ"],
        ["□□ chia hết cho 3 và 9", "tổng các chữ số phải chia hết cho 9"],
      ],
      label: "Tìm chữ số thay thế — phải thỏa mãn TẤT CẢ các dấu hiệu",
    },
  },
  "g4-c3-l8": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 km²", "1 000 000 m²"],
        ["3 km²", "3 000 000 m²"],
        ["500 000 m²", "0,5 km²"],
      ],
      label: "Đổi về cùng một đơn vị đo rồi mới so sánh",
    },
  },
  "g4-c3-l9": {
    planeShape: {
      kind: "parallelogram",
      labels: ["đáy 9 cm", "chiều cao 5 cm"],
      formula: "S = 9 × 5 = 45 cm²",
    },
    operation: { left: 9, sign: "×", right: 5, result: 45 },
  },
  "g4-c3-l10": {
    planeShape: {
      kind: "parallelogram",
      labels: ["đáy a", "chiều cao h"],
      formula: "S = a × h",
    },
    table: {
      headers: ["Dấu hiệu", "Chữ số tận cùng / tổng chữ số"],
      rows: [
        ["chia hết cho 2", "tận cùng 0, 2, 4, 6, 8"],
        ["chia hết cho 5", "tận cùng 0 hoặc 5"],
        ["chia hết cho 3", "tổng chữ số ⋮ 3"],
        ["chia hết cho 9", "tổng chữ số ⋮ 9"],
      ],
      label: "Luyện tập chung chương 3",
    },
  },

  // ═══ Chương 4: Phân số & Hình thoi ═══
  "g4-c4-l1": {
    fractionBar: {
      parts: 4,
      shaded: 3,
      label: "3/4 — tử số 3 là phần lấy đi, mẫu số 4 là số phần bằng nhau",
    },
    table: {
      headers: ["Thành phần", "Nghĩa"],
      rows: [
        ["Tử số a", "số phần lấy đi"],
        ["Mẫu số b", "số phần bằng nhau được chia ra (b khác 0)"],
      ],
      label: "Thương của a : b cũng viết được thành phân số a/b",
    },
  },
  "g4-c4-l2": {
    fractionBar: {
      rows: [
        { parts: 2, shaded: 1, label: "1/2" },
        { parts: 4, shaded: 2, label: "2/4" },
        { parts: 6, shaded: 3, label: "3/6" },
      ],
      label: "1/2 = 2/4 = 3/6 — cùng một lượng bánh pizza",
    },
  },
  "g4-c4-l3": {
    fractionBar: {
      rows: [
        { parts: 7, shaded: 5, label: "5/7" },
        { parts: 7, shaded: 3, label: "3/7" },
        { parts: 12, shaded: 8, label: "8/12 (tức 2/3)" },
        { parts: 12, shaded: 9, label: "9/12 (tức 3/4)" },
      ],
      label: "Cùng mẫu thì so tử số · khác mẫu thì quy đồng rồi so",
    },
  },
  "g4-c4-l4": {
    fractionBar: {
      rows: [
        { parts: 5, shaded: 3, label: "2/5 + 1/5 = 3/5" },
        { parts: 6, shaded: 5, label: "1/2 + 1/3 = 5/6" },
        { parts: 7, shaded: 3, label: "5/7 − 2/7 = 3/7" },
      ],
      label: "Cộng trừ phân số — khác mẫu thì quy đồng mẫu số trước",
    },
  },
  "g4-c4-l5": {
    fractionBar: {
      rows: [
        { parts: 15, shaded: 8, label: "2/3 × 4/5 = 8/15" },
        { parts: 4, shaded: 3, label: "3/4 của 20 = 15" },
      ],
      label: "Nhân tử với tử, mẫu với mẫu",
    },
    operation: { left: 20, sign: "×", right: 3, result: 60 },
  },
  "g4-c4-l6": {
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Đảo ngược", "1/2 : 1/4 = 1/2 × 4/1"],
        ["Nhân", "= (1 × 4) / (2 × 1) = 4/2"],
        ["Kết quả", "= 2"],
      ],
      label: "Chia phân số = nhân với phân số đảo ngược",
    },
    fractionCircle: { parts: 4, shaded: 2, label: "1/2 gồm 2 phần của 1/4" },
  },
  "g4-c4-l7": {
    planeShape: {
      kind: "rhombus",
      labels: ["chéo m", "chéo n"],
      formula: "S = (m × n) : 2 (m và n cùng đơn vị đo)",
    },
  },
  "g4-c4-l8": {
    fractionBar: {
      rows: [
        { parts: 12, shaded: 8, label: "8/12" },
        { parts: 3, shaded: 2, label: "rút gọn = 2/3" },
      ],
      label: "Rút gọn trước khi tính để số nhỏ, dễ tính hơn",
    },
  },
  "g4-c4-l9": {
    fractionBar: {
      rows: [
        { parts: 6, shaded: 5, label: "1/2 + 1/3 = 5/6" },
        { parts: 6, shaded: 1, label: "1/2 − 1/3 = 1/6" },
        { parts: 6, shaded: 3, label: "1/2 × 1/3 = 1/6" },
        { parts: 6, shaded: 3, label: "1/2 : 1/3 = 3/2" },
      ],
      label: "Bốn phép tính với phân số",
    },
  },
  "g4-c4-l10": {
    planeShape: {
      kind: "rhombus",
      labels: ["chéo m", "chéo n"],
      formula: "S = (m × n) : 2",
    },
    fractionBar: {
      rows: [
        { parts: 4, shaded: 2, label: "2/4" },
        { parts: 2, shaded: 1, label: "rút gọn = 1/2" },
      ],
      label: "Luyện tập chung chương 4",
    },
  },

  // ═══ Chương 5: Tỉ số, Tổng–Tỉ, Hiệu–Tỉ & Bản đồ ═══
  "g4-c5-l1": {
    fractionBar: {
      rows: [
        { parts: 18, shaded: 15, label: "nam 15 / nữ 18 = 5/6" },
      ],
      label: "Tỉ số của a và b là a : b hay a/b (b khác 0)",
    },
  },
  "g4-c5-l2": {
    barModel: {
      rows: [
        { label: "Số bé (2 phần)", parts: 2 },
        { label: "Số lớn (3 phần)", parts: 3 },
      ],
      braceLabel: "Tổng 35 · số bé 14 · số lớn 21",
    },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Tổng số phần", "2 + 3 = 5 phần"],
        ["Giá trị 1 phần", "35 : 5 = 7"],
        ["Số bé", "7 × 2 = 14"],
        ["Số lớn", "7 × 3 = 21"],
      ],
      label: "Tìm hai số khi biết Tổng và Tỉ số",
    },
  },
  "g4-c5-l3": {
    barModel: {
      rows: [
        { label: "Số bé (1 phần)", parts: 1 },
        { label: "Số lớn (4 phần)", parts: 4 },
      ],
      braceLabel: "Hiệu 24 · số bé 8 · số lớn 32",
    },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Hiệu số phần", "4 − 1 = 3 phần"],
        ["Giá trị 1 phần", "24 : 3 = 8"],
        ["Số bé", "8 × 1 = 8"],
        ["Số lớn", "8 + 24 = 32"],
      ],
      label: "Tìm hai số khi biết Hiệu và Tỉ số",
    },
  },
  "g4-c5-l4": {
    table: {
      headers: ["Cần tìm", "Công thức"],
      rows: [
        ["Độ dài thật", "độ dài trên bản đồ × mẫu số tỉ lệ"],
        ["Độ dài trên bản đồ", "độ dài thật : mẫu số tỉ lệ"],
      ],
      label: "Tỉ lệ bản đồ — nhớ đổi về cùng một đơn vị đo",
    },
    ruler: {
      lengthCm: 2,
      measure: { from: 0, to: 2 },
      label: "2 cm trên bản đồ tỉ lệ 1 : 1 000 ứng với 2 000 cm = 20 m thật",
    },
  },
  "g4-c5-l5": {
    fractionBar: {
      rows: [
        { label: "nam/nữ = 15/18 = 5/6", parts: 18, shaded: 15 },
        { label: "nữ/nam = 18/15 = 6/5", parts: 15, shaded: 15 },
      ],
      label: "Tỉ số luôn viết đúng thứ tự theo câu hỏi",
    },
  },
  "g4-c5-l6": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 3 },
      ],
      braceLabel: "Tổng 35 ⇒ 14 và 21",
    },
  },
  "g4-c5-l7": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 1 },
        { label: "Số lớn", parts: 4 },
      ],
      braceLabel: "Hiệu 24 ⇒ 8 và 32",
    },
    table: {
      headers: ["Dạng toán", "Chia cho"],
      rows: [
        ["Tổng – Tỉ", "TỔNG số phần"],
        ["Hiệu – Tỉ", "HIỆU số phần"],
      ],
      label: "Phân biệt Tổng–Tỉ và Hiệu–Tỉ",
    },
  },
  "g4-c5-l8": {
    table: {
      headers: ["Trên bản đồ", "Ngoài thực tế"],
      rows: [
        ["1 cm (tỉ lệ 1 : 1 000 000)", "1 000 000 cm = 10 km"],
        ["2 cm (tỉ lệ 1 : 1 000)", "2 000 cm = 20 m"],
      ],
      label: "Tỉ lệ bản đồ trong thực tế",
    },
    ruler: {
      lengthCm: 10,
      measure: { from: 0, to: 10 },
      label: "1 cm trên bản đồ tỉ lệ 1 : 1 000 000 ứng với 10 km thật",
    },
  },
  "g4-c5-l9": {
    barModel: {
      rows: [
        { label: "Tổng – Tỉ", parts: 5 },
        { label: "Hiệu – Tỉ", parts: 3 },
      ],
      braceLabel: "Tổng 5 phần · Hiệu 3 phần",
    },
    table: {
      headers: ["Đề cho", "Dạng toán"],
      rows: [
        ["tổng và tỉ số", "Tổng – Tỉ"],
        ["hiệu và tỉ số", "Hiệu – Tỉ"],
      ],
      label: "Xác định đúng dạng toán trước khi giải",
    },
  },
  "g4-c5-l10": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 3 },
      ],
      braceLabel: "Luyện tập chung chương 5",
    },
  },

  // ═══ Chương 6: Ôn tập cuối năm ═══
  "g4-c6-l1": {
    placeValue: {
      headers: ["Trăm nghìn", "Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [6, 8, 3, 5, 2, 0],
      label: "Ôn tập số tự nhiên — 683 520",
    },
    operation: { left: 483526, sign: "+", right: 254138, result: 737664 },
  },
  "g4-c6-l2": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 tấn", "1 000 kg"],
        ["1 tạ", "100 kg"],
        ["1 thế kỉ", "100 năm"],
        ["1 phút", "60 giây"],
      ],
      label: "Ôn tập đại lượng — đổi về cùng một đơn vị rồi mới tính",
    },
  },
  "g4-c6-l3": {
    fractionBar: {
      rows: [
        { parts: 6, shaded: 5, label: "1/2 + 1/3 = 5/6" },
        { parts: 12, shaded: 8, label: "2/3 = 8/12" },
      ],
      label: "Ôn tập phân số — khác mẫu thì quy đồng trước",
    },
  },
  "g4-c6-l4": {
    planeShape: {
      kind: "parallelogram",
      labels: ["đáy a", "chiều cao h"],
      formula: "S = a × h",
    },
    table: {
      headers: ["Hình", "Công thức diện tích"],
      rows: [
        ["Hình chữ nhật", "S = a × b"],
        ["Hình vuông", "S = a × a"],
        ["Hình bình hành", "S = a × h"],
        ["Hình thoi", "S = (m × n) : 2"],
      ],
      label: "Ôn tập hình học",
    },
  },
  "g4-c6-l5": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 3 },
      ],
      braceLabel: "Tóm tắt đề bằng sơ đồ đoạn thẳng trước khi giải",
    },
  },
  "g4-c6-l6": {
    table: {
      headers: ["Dạng bài", "Ví dụ"],
      rows: [
        ["Đọc số", "68 352"],
        ["So sánh", "100 000 > 99 999"],
        ["Tổng – Tỉ", "14 và 21"],
        ["Hiệu – Tỉ", "8 và 32"],
        ["Hình học", "S = a × h"],
      ],
      label: "Thử thách Trạng Nguyên Toán Lớp 4 — đọc kỹ đề, nhận dạng bài rồi mới giải",
    },
  },
  "g4-c6-l7": {
    table: {
      headers: ["Cần tìm", "Cách làm"],
      rows: [
        ["Số hạng chưa biết", "tổng − số hạng đã biết"],
        ["Số bị trừ", "hiệu + số trừ"],
        ["Số trừ", "số bị trừ − hiệu"],
      ],
      label: "Ôn tập dấu hiệu chia hết và tìm thành phần chưa biết",
    },
  },
  "g4-c6-l8": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 1 },
        { label: "Số lớn", parts: 4 },
      ],
      braceLabel: "Hiệu 24 ⇒ 8 và 32 · kiểm tra lại 8 + 24 = 32",
    },
    table: {
      headers: ["Dạng", "Công thức"],
      rows: [
        ["Tổng – Tỉ", "chia cho TỔNG số phần"],
        ["Hiệu – Tỉ", "chia cho HIỆU số phần"],
      ],
      label: "Ôn tập toán Tổng – Tỉ và Hiệu – Tỉ",
    },
  },
  "g4-c6-l9": {
    table: {
      headers: ["Nội dung", "Ví dụ"],
      rows: [
        ["Số tự nhiên", "432 516 = 400 000 + 30 000 + 2 000 + 500 + 10 + 6"],
        ["Bốn phép tính", "128 472 : 6 = 21 412"],
        ["Dấu hiệu chia hết", "1 250 chia hết cho 2 và 5"],
        ["Phân số", "1/2 + 1/3 = 5/6"],
        ["Hình học", "S hình thoi = (m × n) : 2"],
      ],
      label: "Luyện đề cuối năm Lớp 4 — Đề số 1",
    },
    operation: { left: 128472, sign: ":", right: 6, result: 21412 },
  },
  "g4-c6-l10": {
    barModel: {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 3 },
      ],
      braceLabel: "Tổng (hiệu) số phần ⇒ giá trị một phần ⇒ từng số",
    },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["1", "vẽ sơ đồ đoạn thẳng"],
        ["2", "tính tổng (hiệu) số phần"],
        ["3", "tính giá trị một phần"],
        ["4", "tính từng số và kiểm tra lại"],
      ],
      label: "Luyện đề cuối năm Lớp 4 — Đề số 2",
    },
  },
};
