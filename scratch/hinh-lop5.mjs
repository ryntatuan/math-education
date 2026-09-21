// Dữ liệu HÌNH cho LỚP 5 — 54 bài.
//
// Lớp 5 dùng nhiều nhất ba bộ vẽ "đặc sản" của chương trình:
//   • `motionDiagram` — toán chuyển động đều (ngược chiều / cùng chiều)
//   • `pieChart`      — tỉ số phần trăm và biểu đồ hình quạt
//   • `solid`         — hình hộp chữ nhật, lập phương, hình trụ, hình cầu (thể tích)
// cùng `fractionBar` (hỗn số, phân số thập phân), `planeShape` (tam giác, hình thang),
// `circleParts` (chu vi – diện tích hình tròn).
//
// Lớp 5 chỉ có 31 slide "hình" cho 54 bài ⇒ nhiều bài được tiêm vào slide "khái niệm".

export const SPECS_LOP5 = {
  // ═══ Chương 1: Ôn tập phân số, toán tỉ lệ & bảng đơn vị diện tích ═══
  "g5-c1-l1": {
    fractionBar: {
      rows: [
        { parts: 2, shaded: 1, label: "1/2 = 2/4" },
        { parts: 4, shaded: 2, label: "2/4 = 3/6" },
        { parts: 6, shaded: 3, label: "3/6" },
      ],
      label: "Nhân hoặc chia cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nó",
    },
    table: {
      headers: ["So sánh", "Cách làm"],
      rows: [
        ["Cùng mẫu", "tử số lớn hơn thì phân số lớn hơn"],
        ["Khác mẫu", "quy đồng mẫu số rồi so sánh"],
      ],
      label: "Khái niệm, tính chất cơ bản & so sánh phân số",
    },
  },
  "g5-c1-l2": {
    fractionBar: {
      rows: [
        { parts: 10, shaded: 5, label: "1/2 = 5/10" },
        { parts: 100, shaded: 75, label: "3/4 = 75/100" },
        { parts: 100, shaded: 35, label: "7/20 = 35/100" },
      ],
      label: "Phân số thập phân là phân số có mẫu số 10, 100, 1 000…",
    },
  },
  "g5-c1-l3": {
    fractionBar: {
      rows: [
        { parts: 12, shaded: 11, label: "2/3 + 1/4 = 8/12 + 3/12 = 11/12" },
        { parts: 15, shaded: 10, label: "3/5 × 10/9 = 30/45 = 2/3" },
        { parts: 14, shaded: 5, label: "2/7 : 4/5 = 10/28 = 5/14" },
      ],
      label: "Ôn tập bốn phép tính với phân số",
    },
  },
  "g5-c1-l4": {
    fractionCircle: {
      parts: 4,
      shaded: 3,
      label: "2 3/4 = (2 × 4 + 3) / 4 = 11/4",
    },
    table: {
      headers: ["Thành phần", "Tính"],
      rows: [
        ["Tử số mới", "(phần nguyên × mẫu số) + tử số cũ"],
        ["Mẫu số mới", "giữ nguyên mẫu số cũ"],
      ],
      label: "Chuyển hỗn số thành phân số",
    },
  },
  "g5-c1-l5": {
    barModel: {
      rows: [
        { label: "5 quyển", parts: 5 },
        { label: "8 quyển", parts: 8 },
      ],
      braceLabel: "40 000 đồng ⇒ 64 000 đồng",
    },
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Rút về đơn vị", "40 000 : 5 = 8 000 (đồng)"],
        ["Tính 8 quyển", "8 000 × 8 = 64 000 (đồng)"],
      ],
      label: "Giải toán về quan hệ tỉ lệ (tỉ lệ thuận)",
    },
  },
  "g5-c1-l6": {
    table: {
      headers: ["Bảng", "Các đơn vị (lớn đến bé)"],
      rows: [
        ["Độ dài", "km > hm > dam > m > dm > cm > mm"],
        ["Khối lượng", "tấn > tạ > yến > kg > hg > dag > g"],
      ],
      label: "Hai đơn vị liền nhau hơn kém nhau 10 lần",
    },
  },
  "g5-c1-l7": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 hm²", "100 dam²"],
        ["1 hm²", "10 000 m²"],
        ["1 dam²", "100 m²"],
      ],
      label: "km² > hm² > dam² > m² > dm² > cm² > mm² — hai đơn vị liền nhau hơn kém 100 lần",
    },
  },
  "g5-c1-l8": {
    table: {
      headers: ["Đổi", "Bằng"],
      rows: [
        ["1 ha", "1 hm² = 10 000 m²"],
        ["1 km²", "100 ha"],
      ],
      label: "Héc-ta — sân bóng đá tiêu chuẩn rộng gần bằng 1 ha",
    },
  },
  "g5-c1-l9": {
    table: {
      headers: ["Nội dung", "Ví dụ"],
      rows: [
        ["Phân số", "1/2 = 5/10"],
        ["Số thập phân", "3/4 = 0,75"],
        ["Đơn vị diện tích", "1 hm² = 10 000 m²"],
        ["Toán tỉ lệ", "5 quyển ⇒ 8 quyển"],
      ],
      label: "Luyện tập chung Chương 1",
    },
  },
  "g5-c1-l10": {
    fractionBar: {
      rows: [
        { parts: 5, shaded: 3, label: "3/5 < 1" },
        { parts: 5, shaded: 5, label: "5/5 = 1" },
      ],
      label: "So với 1 trước — mẹo nhanh nhất và ít sai nhất",
    },
  },
  "g5-c1-l11": {
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
        ["4", "tính từng số rồi thử lại"],
      ],
      label: "Ôn tập tìm hai số khi biết Tổng (Hiệu) và Tỉ số",
    },
  },
  "g5-c1-l12": {
    table: {
      headers: ["Đơn vị", "Hơn kém đơn vị liền sau"],
      rows: [
        ["km² ; hm² ; dam² ; m²", "100 lần"],
        ["m² ; dm² ; cm² ; mm²", "100 lần"],
      ],
      label: "Luyện tập bảng đơn vị đo diện tích",
    },
  },

  // ═══ Chương 2: Số thập phân & các phép tính ═══
  "g5-c2-l1": {
    table: {
      headers: ["Hàng", "Chữ số", "Giá trị"],
      rows: [
        ["trăm", 3, 300],
        ["chục", 7, 70],
        ["đơn vị", 5, 5],
        ["phần mười", 4, "0,4"],
        ["phần trăm", 2, "0,02"],
        ["phần nghìn", 9, "0,009"],
      ],
      label: "Số 375,429 — dấu phẩy ngăn cách phần nguyên và phần thập phân",
    },
  },
  "g5-c2-l2": {
    table: {
      headers: ["So sánh", "Kết luận"],
      rows: [
        ["0,5 và 0,50", "bằng nhau (thêm 0 vào cuối không đổi giá trị)"],
        ["0,5 và 0,15", "0,5 > 0,15"],
        ["2,35 và 2,4", "2,35 < 2,4"],
      ],
      label: "KHÔNG đếm số chữ số để so sánh — phải so từng hàng từ trái sang phải",
    },
  },
  "g5-c2-l3": {
    table: {
      headers: ["Đổi", "Được"],
      rows: [
        ["5 m 6 dm", "5,6 m"],
        ["4 km 250 m", "4,25 km"],
        ["2 kg 50 g", "2,05 kg"],
        ["3 tấn 500 kg", "3,5 tấn"],
        ["4 m² 25 dm²", "4,25 m²"],
      ],
      label: "Viết số đo đại lượng dưới dạng số thập phân",
    },
  },
  "g5-c2-l4": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["15,82 + 9,35", "25,17"],
        ["12,5 + 3,75 + 8,25", "24,50"],
      ],
      label: "Cộng số thập phân — đặt dấu phẩy thẳng cột rồi hạ xuống kết quả",
    },
  },
  "g5-c2-l5": {
    table: {
      headers: ["Phép tính", "Cách làm"],
      rows: [
        ["45,8 − 19,25", "viết 45,80 − 19,25"],
        ["Kết quả", "26,55"],
      ],
      label: "Trừ số thập phân — thêm chữ số 0 cho đủ hàng rồi trừ",
    },
  },
  "g5-c2-l6": {
    table: {
      headers: ["Bước", "Làm"],
      rows: [
        ["Nhân như số tự nhiên", "235 × 14 = 3 290"],
        ["Đếm chữ số thập phân", "2 + 1 = 3 chữ số"],
        ["Tách dấu phẩy", "3 290 ⇒ 3,290 = 3,29"],
      ],
      label: "2,35 × 1,4 = 3,29 — nhân với 10, 100 thì dịch dấu phẩy sang PHẢI",
    },
  },
  "g5-c2-l7": {
    table: {
      headers: ["Phép tính", "Cách làm"],
      rows: [
        ["12 : 2,5", "số chia có 1 chữ số thập phân ⇒ dịch phẩy cả hai số: 120 : 25"],
        ["Kết quả", "4,8"],
        ["Chia cho 10, 100", "dịch dấu phẩy sang TRÁI"],
      ],
      label: "Chia số thập phân",
    },
  },
  "g5-c2-l8": {
    pieChart: {
      title: "3/4 = 75% — tỉ số phần trăm là phân số có mẫu 100",
      items: [
        { label: "3/4 = 75%", percent: 75 },
        { label: "1/4 còn lại", percent: 25 },
      ],
    },
    table: {
      headers: ["Viết", "Nghĩa"],
      rows: [
        ["1/100 = 0,01 = 1%", "một phần trăm"],
        ["35/100 = 0,35 = 35%", "ba mươi lăm phần trăm"],
        ["3/4 = 75/100 = 75%", "bảy mươi lăm phần trăm"],
      ],
      label: "Tỉ số phần trăm của a và b: lấy a : b rồi nhân 100, thêm kí hiệu %",
    },
  },
  "g5-c2-l9": {
    pieChart: {
      title: "Lớp có 40 học sinh, 60% là nữ",
      items: [
        { label: "Nữ 60% = 24 bạn", percent: 60 },
        { label: "Nam 40% = 16 bạn", percent: 40 },
      ],
    },
    table: {
      headers: ["Dạng toán", "Cách làm"],
      rows: [
        ["Tìm % của một số", "số đó × số phần trăm : 100"],
        ["Tìm tỉ số % của hai số", "a : b × 100"],
        ["Tìm số khi biết % của nó", "giá trị : số phần trăm × 100"],
      ],
      label: "40 × 60 : 100 = 24 học sinh nữ",
    },
  },
  "g5-c2-l10": {
    table: {
      headers: ["Dạng", "Ví dụ"],
      rows: [
        ["Cộng", "15,82 + 9,35 = 25,17"],
        ["Trừ", "45,80 − 19,25 = 26,55"],
        ["Nhân", "2,35 × 1,4 = 3,29"],
        ["Chia", "12 : 2,5 = 4,8"],
        ["Phần trăm", "40 × 60 : 100 = 24"],
      ],
      label: "Máy tính chỉ để KIỂM TRA kết quả, không thay cho việc tự tính",
    },
  },

  // ═══ Chương 3: Hình học & thể tích ═══
  "g5-c3-l1": {
    planeShape: {
      kind: "triangle",
      labels: ["đáy a", "chiều cao h"],
      formula: "S = (a × h) : 2",
    },
    table: {
      headers: ["Cần tìm", "Công thức"],
      rows: [
        ["Diện tích tam giác", "S = (a × h) : 2"],
        ["Độ dài đáy", "a = S × 2 : h"],
        ["Chiều cao", "h = S × 2 : a"],
      ],
      label: "a và h phải cùng đơn vị đo",
    },
  },
  "g5-c3-l2": {
    planeShape: {
      kind: "trapezoid",
      labels: ["đáy lớn a", "đáy bé b", "chiều cao h"],
      formula: "S = (a + b) × h : 2",
    },
  },
  "g5-c3-l3": {
    circleParts: {
      radius: 3,
      diameter: 6,
      showCenter: true,
      showCircumference: true,
      label: "Chu vi C = d × 3,14 hoặc C = r × 2 × 3,14",
    },
  },
  "g5-c3-l4": {
    circleParts: {
      radius: 3,
      showCenter: true,
      label: "Diện tích S = r × r × 3,14",
    },
    table: {
      headers: ["Biết gì", "Tính"],
      rows: [
        ["bán kính r = 3 cm", "S = 3 × 3 × 3,14 = 28,26 cm²"],
        ["đường kính d = 6 cm", "r = 6 : 2 = 3 cm rồi mới tính S"],
      ],
      label: "Đọc kỹ đề cho BÁN KÍNH hay ĐƯỜNG KÍNH",
    },
  },
  "g5-c3-l5": {
    pieChart: {
      title: "Kết quả học tập của lớp",
      items: [
        { label: "Xuất sắc", percent: 50 },
        { label: "Tốt", percent: 30 },
        { label: "Hoàn thành", percent: 20 },
      ],
    },
    table: {
      headers: ["Phần", "Số đo góc tương ứng"],
      rows: [
        ["50%", "nửa hình tròn"],
        ["25%", "một phần tư hình tròn"],
        ["Tổng", "luôn bằng 100%"],
      ],
      label: "Biểu đồ hình quạt",
    },
  },
  "g5-c3-l6": {
    solid: {
      kind: "cuboid",
      dims: { a: 4, b: 3, c: 2 },
      label: "Hình hộp chữ nhật",
      formula: "6 mặt đều là hình chữ nhật · 8 đỉnh · 12 cạnh",
    },
    table: {
      headers: ["Hình", "Đặc điểm"],
      rows: [
        ["Hình hộp chữ nhật", "3 kích thước: dài a, rộng b, cao c; 6 mặt chữ nhật"],
        ["Hình lập phương", "6 mặt đều là hình vuông bằng nhau (a = b = c)"],
      ],
      label: "Hình hộp chữ nhật & hình lập phương",
    },
  },
  "g5-c3-l7": {
    solid: {
      kind: "cuboid",
      dims: { a: 4, b: 3, c: 2 },
      formula: "Sxq = (a + b) × 2 × c · Stp = Sxq + 2 × (a × b)",
    },
    table: {
      headers: ["Hình", "Diện tích xung quanh", "Diện tích toàn phần"],
      rows: [
        ["Hộp chữ nhật", "Sxq = (a + b) × 2 × c", "Stp = Sxq + 2 × a × b"],
        ["Lập phương", "Sxq = a × a × 4", "Stp = a × a × 6"],
      ],
      label: "Diện tích xung quanh & toàn phần",
    },
  },
  "g5-c3-l8": {
    solid: {
      kind: "cube",
      dims: { a: 3 },
      formula: "V = a × a × a · 1 dm³ = 1 lít",
    },
    table: {
      headers: ["Hình", "Thể tích"],
      rows: [
        ["Hộp chữ nhật", "V = a × b × c"],
        ["Lập phương", "V = a × a × a"],
        ["Đổi đơn vị", "1 m³ = 1 000 dm³ = 1 000 000 cm³"],
      ],
      label: "Thể tích hình hộp chữ nhật & hình lập phương",
    },
  },
  "g5-c3-l9": {
    solid: {
      kind: "cylinder",
      dims: { a: 2, b: 5 },
      label: "Hình trụ",
      formula: "Hai mặt đáy là hai hình tròn bằng nhau",
    },
    table: {
      headers: ["Hình", "Đặc điểm"],
      rows: [
        ["Hình trụ", "hai mặt đáy tròn, xếp chồng được"],
        ["Hình cầu", "tròn đều, lăn mọi hướng"],
      ],
      label: "Hình trụ, hình cầu & luyện tập chung",
    },
  },
  "g5-c3-l10": {
    planeShape: {
      kind: "trapezoid",
      labels: ["a", "b", "h"],
      formula: "S = (a + b) × h : 2",
    },
    table: {
      headers: ["Hình", "Công thức"],
      rows: [
        ["Tam giác", "S = đáy × chiều cao : 2"],
        ["Hình thang", "S = TỔNG hai đáy × chiều cao : 2"],
      ],
      label: "Luyện tập diện tích hình tam giác và hình thang",
    },
  },
  "g5-c3-l11": {
    circleParts: {
      radius: 5,
      diameter: 10,
      showCircumference: true,
      label: "Chu vi = d × 3,14 · Diện tích = r × r × 3,14",
    },
    table: {
      headers: ["Đề cho", "Chọn công thức"],
      rows: [
        ["bán kính r", "C = r × 2 × 3,14 ; S = r × r × 3,14"],
        ["đường kính d", "C = d × 3,14 ; S = (d : 2) × (d : 2) × 3,14"],
      ],
      label: "Luyện tập chu vi và diện tích hình tròn",
    },
  },
  "g5-c3-l12": {
    solid: {
      kind: "cuboid",
      dims: { a: 5, b: 4, c: 3 },
      formula: "V = 5 × 4 × 3 = 60 cm³",
    },
    table: {
      headers: ["Đại lượng", "Đơn vị"],
      rows: [
        ["Diện tích xung quanh", "cm²"],
        ["Diện tích toàn phần", "cm²"],
        ["Thể tích", "cm³"],
      ],
      label: "Luyện tập Sxq, Stp và thể tích",
    },
  },

  // ═══ Chương 4: Số đo thời gian & toán chuyển động đều ═══
  "g5-c4-l1": {
    clock: { hour: 3, minute: 15, timeText: "3 giờ 15 phút" },
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["3 giờ 15 phút + 2 giờ 35 phút", "5 giờ 50 phút"],
        ["4 giờ 20 phút − 1 giờ 35 phút", "3 giờ 80 phút − 1 giờ 35 phút = 2 giờ 45 phút"],
        ["1 ngày", "24 giờ"],
        ["1 giờ", "60 phút"],
      ],
      label: "Bảng đơn vị đo thời gian — hệ 60, đừng tính như số thập phân",
    },
  },
  "g5-c4-l2": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["1 giờ 25 phút × 3", "3 giờ 75 phút = 4 giờ 15 phút"],
        ["7 giờ 40 phút : 4", "1 giờ 55 phút"],
      ],
      label: "Nhân, chia số đo thời gian với một số",
    },
  },
  "g5-c4-l3": {
    motionDiagram: {
      mode: "toward",
      distance: 120,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Xe đạp", speed: 15 },
      note: "v = s : t — đơn vị vận tốc thường là km/giờ",
    },
    table: {
      headers: ["Đại lượng", "Công thức"],
      rows: [
        ["Vận tốc", "v = s : t"],
        ["Quãng đường", "s = v × t"],
        ["Thời gian", "t = s : v"],
      ],
      label: "Ba công thức chuyển động — nhớ một là suy ra được hai",
    },
  },
  "g5-c4-l4": {
    motionDiagram: {
      mode: "toward",
      distance: 30,
      unit: "km",
      a: { name: "Xe đạp", speed: 15 },
      b: null,
      note: "s = v × t = 15 × 2 = 30 km",
    },
    table: {
      headers: ["Cho", "Tính"],
      rows: [
        ["v = 15 km/giờ, t = 2 giờ", "s = 15 × 2 = 30 km"],
      ],
      label: "Quãng đường s = v × t",
    },
  },
  "g5-c4-l5": {
    motionDiagram: {
      mode: "toward",
      distance: 90,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: null,
      note: "t = s : v = 90 : 45 = 2 giờ",
    },
    table: {
      headers: ["Cho", "Tính"],
      rows: [
        ["s = 90 km, v = 45 km/giờ", "t = 90 : 45 = 2 giờ"],
      ],
      label: "Thời gian t = s : v",
    },
  },
  "g5-c4-l6": {
    motionDiagram: {
      mode: "apart",
      distance: 150,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Ô tô", speed: 60 },
      note: "Ngược chiều: gặp nhau sau 150 : (45 + 60) giờ",
    },
    table: {
      headers: ["Trường hợp", "Công thức thời gian"],
      rows: [
        ["Ngược chiều", "khoảng cách ban đầu : (v1 + v2)"],
        ["Cùng chiều (đuổi kịp)", "khoảng cách ban đầu : (v1 − v2)"],
      ],
      label: "Hai chuyển động cùng chiều & ngược chiều",
    },
  },
  "g5-c4-l7": {
    table: {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["1 giờ 25 phút × 3", "4 giờ 15 phút"],
        ["3 giờ 15 phút + 2 giờ 35 phút", "5 giờ 50 phút"],
        ["1 thế kỉ", "100 năm"],
      ],
      label: "Luyện tập số đo thời gian — đơn vị thời gian dùng hệ 60",
    },
  },
  "g5-c4-l8": {
    table: {
      headers: ["Cần tìm", "Công thức"],
      rows: [
        ["Vận tốc", "v = s : t"],
        ["Quãng đường", "s = v × t"],
        ["Thời gian", "t = s : v"],
      ],
      label: "Luyện tập ba bài toán chuyển động",
    },
    motionDiagram: {
      mode: "toward",
      distance: 90,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Xe đạp", speed: 15 },
      note: "Cùng quãng đường, vận tốc càng lớn thì thời gian càng nhỏ",
    },
  },
  "g5-c4-l9": {
    motionDiagram: {
      mode: "chase",
      distance: 36,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Xe đạp", speed: 15 },
      note: "Cùng chiều: đuổi kịp sau 36 : (45 − 15) giờ",
    },
    table: {
      headers: ["Trường hợp", "Dùng phép"],
      rows: [
        ["Ngược chiều", "cộng hai vận tốc"],
        ["Cùng chiều", "trừ hai vận tốc"],
      ],
      label: "Luyện tập chung: số đo thời gian và chuyển động đều",
    },
  },
  "g5-c4-l10": {
    table: {
      headers: ["Dạng toán", "Ghi nhớ"],
      rows: [
        ["Chuyển động", "v = s : t ; s = v × t ; t = s : v"],
        ["Đổi đơn vị", "đề cho phút thì đổi ra giờ trước khi tính"],
        ["Phần trăm", "a × b : 100"],
      ],
      label: "Luyện đề: toán chuyển động và tỉ số phần trăm",
    },
    motionDiagram: {
      mode: "toward",
      distance: 120,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Ô tô", speed: 60 },
      note: "Đơn vị vận tốc phải khớp đơn vị thời gian",
    },
  },

  // ═══ Chương 5: Ôn tập cuối năm & luyện thi chuyển cấp ═══
  "g5-c5-l1": {
    fractionBar: {
      rows: [
        { parts: 2, shaded: 1, label: "1/2 = 0,5 = 50%" },
      ],
      label: "Ba loại số viết qua lại được: phân số, số thập phân, phần trăm",
    },
    table: {
      headers: ["Viết dạng", "Ví dụ"],
      rows: [
        ["Phân số", "1/2"],
        ["Số thập phân", "0,5"],
        ["Phần trăm", "50%"],
      ],
      label: "Ôn tập về số tự nhiên, phân số, số thập phân",
    },
  },
  "g5-c5-l2": {
    table: {
      headers: ["Phép tính", "Ví dụ"],
      rows: [
        ["Cộng số thập phân", "15,82 + 9,35 = 25,17"],
        ["Nhân phân số", "3/5 × 10/9 = 2/3"],
        ["Chia số thập phân", "12 : 2,5 = 4,8"],
      ],
      label: "Ôn tập các phép tính — thử lại bằng phép tính ngược",
    },
  },
  "g5-c5-l3": {
    planeShape: {
      kind: "trapezoid",
      labels: ["a", "b", "h"],
      formula: "S = (a + b) × h : 2",
    },
    table: {
      headers: ["Hình", "Công thức diện tích"],
      rows: [
        ["Tam giác", "S = (a × h) : 2"],
        ["Hình thang", "S = (a + b) × h : 2"],
        ["Hình tròn", "S = r × r × 3,14"],
        ["Hình thoi", "S = (m × n) : 2"],
      ],
      label: "Ôn tập chu vi, diện tích hình phẳng",
    },
  },
  "g5-c5-l4": {
    solid: {
      kind: "cube",
      dims: { a: 3 },
      formula: "V = a × a × a",
    },
    table: {
      headers: ["Đại lượng", "Đơn vị"],
      rows: [
        ["Chu vi", "cm ; m"],
        ["Diện tích", "cm² ; m²"],
        ["Thể tích", "cm³ ; m³"],
      ],
      label: "Phân biệt diện tích (cm²) và thể tích (cm³) nhờ ĐƠN VỊ của đáp số",
    },
  },
  "g5-c5-l5": {
    motionDiagram: {
      mode: "toward",
      distance: 120,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Ô tô", speed: 60 },
      note: "Đơn vị vận tốc phải khớp đơn vị thời gian",
    },
    pieChart: {
      title: "Ba dạng toán tỉ số phần trăm",
      items: [
        { label: "Tìm % của một số", percent: 40 },
        { label: "Tìm tỉ số % của hai số", percent: 35 },
        { label: "Tìm số khi biết % của nó", percent: 25 },
      ],
    },
  },
  "g5-c5-l6": {
    pieChart: {
      title: "Hành trang lên Lớp 6",
      items: [
        { label: "Số học", percent: 40 },
        { label: "Hình học", percent: 30 },
        { label: "Đo lường & chuyển động", percent: 30 },
      ],
    },
    table: {
      headers: ["Điều bé mang theo", "Vì sao"],
      rows: [
        ["Tính cẩn thận", "đọc kỹ đề, ghi đúng đơn vị"],
        ["Thử lại kết quả", "kiểm tra bằng phép tính ngược"],
        ["Kiên trì", "bài khó thì tách thành từng bước nhỏ"],
      ],
      label: "Thử thách Trạng Nguyên Toán Lớp 5 — chinh phục Lớp 6",
    },
  },
  "g5-c5-l7": {
    table: {
      headers: ["Đại lượng", "Hai đơn vị liền nhau hơn kém"],
      rows: [
        ["Độ dài", "10 lần"],
        ["Khối lượng", "10 lần"],
        ["Diện tích", "100 lần"],
        ["Thể tích", "1 000 lần"],
        ["Thời gian", "hệ 60 (trừ ngày – giờ)"],
      ],
      label: "Ôn tập bảng đơn vị đo lường và số đo thời gian",
    },
  },
  "g5-c5-l8": {
    pieChart: {
      title: "Ba dạng toán về tỉ số phần trăm",
      items: [
        { label: "Tìm % của một số", percent: 40 },
        { label: "Tìm tỉ số % của hai số", percent: 35 },
        { label: "Tìm số khi biết % của nó", percent: 25 },
      ],
    },
    table: {
      headers: ["Dạng", "Cách làm"],
      rows: [
        ["Tìm % của một số", "số đó × số phần trăm : 100"],
        ["Tìm tỉ số % của hai số", "a : b × 100 rồi thêm %"],
        ["Tìm số khi biết % của nó", "giá trị : số phần trăm × 100"],
      ],
      label: "Ôn tập toán về tỉ số phần trăm",
    },
  },
  "g5-c5-l9": {
    table: {
      headers: ["Dạng bài", "Ví dụ"],
      rows: [
        ["Số thập phân", "2,35 × 1,4 = 3,29"],
        ["Phân số", "2/3 + 1/4 = 11/12"],
        ["Phần trăm", "40 × 60 : 100 = 24"],
        ["Chuyển động", "s = 15 × 2 = 30 km"],
        ["Hình học", "S = (a × h) : 2"],
      ],
      label: "Luyện đề chuyển cấp — Đề số 1: đọc đề, gạch chân dữ kiện, rồi mới tính",
    },
  },
  "g5-c5-l10": {
    motionDiagram: {
      mode: "toward",
      distance: 150,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Ô tô", speed: 60 },
      note: "Ngược chiều thì CỘNG vận tốc · cùng chiều thì TRỪ vận tốc",
    },
    table: {
      headers: ["Trường hợp", "Dùng phép"],
      rows: [
        ["Hai vật ngược chiều", "cộng hai vận tốc"],
        ["Hai vật cùng chiều", "trừ hai vận tốc"],
      ],
      label: "Luyện đề chuyển cấp — Đề số 2",
    },
  },
};
