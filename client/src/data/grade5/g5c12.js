export const g5c12 = {
  id: "g5-c12",
  name: "Chủ đề 12: Ôn tập cuối năm",
  description:
    "Ôn tập số tự nhiên, phân số, số thập phân; các phép tính; tỉ số, tỉ số phần trăm; hình học; đo lường; toán chuyển động đều; thống kê và xác suất",
  icon: "🎓",
  color: "#6366f1",
  totalLessons: 8,
  lessons: [
    {
      id: "g5-c12-l1",
      title: "Bài 68: Ôn tập số tự nhiên, phân số, số thập phân",
      type: "learn",
      description:
        "Ôn tập đọc viết, so sánh các loại số đã học ở Tiểu học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hết năm học rồi! Cùng ôn lại ba “họ số” đã học: số tự nhiên, phân số và số thập phân. 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Ba loại số đã học",
            explanation:
              "Số tự nhiên dùng để đếm; phân số dùng để biểu diễn một phần của một vật; số thập phân là cách viết khác của phân số thập phân. Ta có thể so sánh, sắp xếp và chuyển đổi giữa các loại số này.",
            points: [
              "Số tự nhiên: 0; 1; 2; 3…",
              "Phân số: 3/4; 7/5…",
              "Số thập phân: 0,75; 1,4… và 3/4 = 0,75.",
            ],
            rule: "3/4 = 75/100 = 0,75.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Liên hệ giữa phân số, số thập phân và phần trăm",
            table: {
              headers: ["Phân số", "Số thập phân", "Tỉ số phần trăm"],
              rows: [
                ["1/2", "0,5", "50%"],
                ["3/4", "0,75", "75%"],
                ["1/5", "0,2", "20%"],
                ["7/10", "0,7", "70%"],
              ],
              label: "Chuyển đổi qua lại giữa ba cách viết",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 3/4 thành số thập phân:",
            options: ["0,75", "0,34", "1,33", "0,075"],
            answer: "0,75",
            mascotHint: "3/4 = 75/100 = 0,75.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Sắp xếp 0,7; 3/4 và 2/3 theo thứ tự từ lớn đến bé:",
            options: ["3/4; 0,7; 2/3", "0,7; 3/4; 2/3", "2/3; 0,7; 3/4", "3/4; 2/3; 0,7"],
            answer: "3/4; 0,7; 2/3",
            mascotHint: "3/4 = 0,75 > 0,7 > 2/3 ≈ 0,667.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số thập phân viết được thành số thập phân.",
              "Đổi phân số thành phần trăm bằng cách nhân 100.",
              "So sánh bằng cách đưa về cùng một dạng số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l2",
      title: "Bài 69: Ôn tập các phép tính với số tự nhiên, phân số, số thập phân",
      type: "learn",
      description:
        "Ôn tập bốn phép tính với cả ba loại số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một cửa hàng có 1 200 kg gạo, đã bán 3/5 số gạo đó. Còn lại bao nhiêu ki-lô-gam? Bài toán dùng cả phân số và số tự nhiên! 🍚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn phép tính với ba loại số",
            explanation:
              "Cộng, trừ phân số phải đưa về cùng mẫu số; nhân phân số thì tử nhân tử, mẫu nhân mẫu; chia phân số thì nhân với phân số đảo ngược. Với số thập phân, chú ý vị trí dấu phẩy trong từng phép tính.",
            points: [
              "2/5 + 1/3 = 6/15 + 5/15 = 11/15.",
              "2/3 × 3/5 = 6/15 = 2/5.",
              "2,5 × 4 = 10; 9,6 : 1,2 = 8.",
            ],
            rule: "Tính giá trị biểu thức: ngoặc → nhân chia → cộng trừ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập bốn phép tính",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2/5 + 1/3", "11/15"],
                ["3/4 − 1/2", "1/4"],
                ["2/3 × 3/5", "2/5"],
                ["9,6 : 1,2", 8],
              ],
              label: "Kết quả phân số cần rút gọn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/5 + 1/3 = ?",
            options: ["11/15", "3/8", "3/15", "11/8"],
            answer: "11/15",
            mascotHint: "2/5 = 6/15; 1/3 = 5/15; 6/15 + 5/15 = 11/15.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Cửa hàng có 1 200 kg gạo, đã bán 3/5 số gạo. Số gạo còn lại là:",
            options: ["480 kg", "720 kg", "400 kg", "600 kg"],
            answer: "480 kg",
            mascotHint: "Đã bán: 1 200 : 5 × 3 = 720 kg; còn lại: 1 200 − 720 = 480 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số: cùng mẫu mới cộng, trừ.",
              "Số thập phân: đặt dấu phẩy đúng vị trí.",
              "Đọc kĩ đề để biết cần tính gì.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l3",
      title: "Bài 70: Ôn tập tỉ số, tỉ số phần trăm",
      type: "learn",
      description:
        "Ôn tập tỉ số, tỉ số phần trăm và các bài toán liên quan",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Giá một chiếc xe đạp 1 200 000 đồng, cửa hàng giảm 15%. Giảm bao nhiêu tiền nhỉ? 🚲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tỉ số và tỉ số phần trăm",
            explanation:
              "Ôn tập ba dạng bài: tìm tỉ số phần trăm của hai số, tìm giá trị phần trăm của một số và tìm một số khi biết giá trị phần trăm của nó.",
            points: [
              "Tỉ số phần trăm: 30 : 40 × 100 = 75%.",
              "Giá trị phần trăm: 15% của 1 200 000 = 180 000.",
              "Tìm số: 25% của một số là 50 ⇒ số đó là 50 : 25 × 100 = 200.",
            ],
            rule: "Ba dạng bài phần trăm cần phân biệt rõ đề hỏi gì.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba dạng bài về tỉ số phần trăm",
            table: {
              headers: ["Dạng bài", "Cách làm", "Ví dụ"],
              rows: [
                ["Tìm tỉ số phần trăm", "a : b × 100", "30 : 40 × 100 = 75%"],
                ["Tìm giá trị phần trăm", "số : 100 × số %", "15% của 1 200 000 = 180 000"],
                ["Tìm số khi biết %", "giá trị : số % × 100", "50 : 25 × 100 = 200"],
              ],
              label: "Đọc kĩ đề để chọn đúng dạng bài",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm tỉ số phần trăm của 30 và 40:",
            options: ["75%", "70%", "133%", "30%"],
            answer: "75%",
            mascotHint: "30 : 40 = 0,75 = 75%.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chiếc xe đạp giá 1 200 000 đồng được giảm 15%. Số tiền phải trả là:",
            options: ["1 020 000 đồng", "1 180 000 đồng", "180 000 đồng", "1 000 000 đồng"],
            answer: "1 020 000 đồng",
            mascotHint: "Giảm 1 200 000 : 100 × 15 = 180 000 đồng; 1 200 000 − 180 000 = 1 020 000 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân biệt ba dạng bài phần trăm.",
              "Giá sau khi giảm = giá gốc − tiền giảm.",
              "Kiểm tra kết quả bằng ước lượng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l4",
      title: "Bài 71: Ôn tập hình học",
      type: "learn",
      description:
        "Ôn tập chu vi, diện tích, diện tích xung quanh, toàn phần và thể tích các hình",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một bể nước hình hộp chữ nhật dài 2 m, rộng 1,5 m, cao 1 m chứa được 3 m³ nước. Cùng ôn lại công thức hình học! 💧",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Công thức hình học Lớp 5",
            explanation:
              "Ôn tập công thức tính diện tích hình tam giác, hình thang, hình tròn; diện tích xung quanh, diện tích toàn phần và thể tích hình hộp chữ nhật, hình lập phương.",
            points: [
              "Tam giác: S = a × h : 2; hình thang: S = (a + b) × h : 2.",
              "Hình tròn: C = d × 3,14; S = r × r × 3,14.",
              "Hình hộp chữ nhật: V = a × b × c; hình lập phương: V = a × a × a.",
            ],
            rule: "Đơn vị diện tích là cm², m²; đơn vị thể tích là cm³, m³.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng công thức hình học",
            table: {
              headers: ["Hình", "Công thức cần nhớ"],
              rows: [
                ["Tam giác", "S = đáy × cao : 2"],
                ["Hình thang", "S = (đáy lớn + đáy bé) × cao : 2"],
                ["Hình tròn", "C = d × 3,14; S = r × r × 3,14"],
                ["Hình hộp chữ nhật", "V = a × b × c"],
                ["Hình lập phương", "V = a × a × a"],
              ],
              label: "Chọn đúng công thức cho từng hình",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bể nước dài 2 m, rộng 1,5 m, cao 1 m. Thể tích bể là:",
            options: ["3 m³", "4,5 m³", "2,5 m³", "30 m³"],
            answer: "3 m³",
            mascotHint: "V = 2 × 1,5 × 1 = 3 (m³).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có bán kính 4 cm. Diện tích hình tròn là:",
            options: ["50,24 cm²", "25,12 cm²", "12,56 cm²", "16 cm²"],
            answer: "50,24 cm²",
            mascotHint: "S = 4 × 4 × 3,14 = 50,24 (cm²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thuộc các công thức hình phẳng và hình khối.",
              "Đổi đơn vị trước khi tính.",
              "Kiểm tra đơn vị của kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l5",
      title: "Bài 72: Ôn tập đo lường",
      type: "learn",
      description:
        "Ôn tập các đơn vị đo độ dài, khối lượng, diện tích, thể tích, thời gian",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "3 m³ 25 dm³ bằng bao nhiêu đề-xi-mét khối? Cần nhớ mỗi bậc đơn vị thể tích đổi 1 000 lần! 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bảng đơn vị đo lường",
            explanation:
              "Ôn tập quan hệ giữa các đơn vị đo độ dài (10 lần), đo khối lượng (10 lần), đo diện tích (100 lần) và đo thể tích (1 000 lần), cùng đơn vị đo thời gian.",
            points: [
              "1 m = 10 dm = 100 cm.",
              "1 m² = 100 dm²; 1 dm² = 100 cm².",
              "1 m³ = 1 000 dm³; 1 dm³ = 1 000 cm³.",
            ],
            rule: "Đổi đơn vị lớn sang bé thì nhân; bé sang lớn thì chia.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị đo",
            table: {
              headers: ["Số đo", "Đổi đơn vị"],
              rows: [
                ["3 m 25 cm", "3,25 m"],
                ["3 m³ 25 dm³", "3 025 dm³"],
                ["2 kg 5 g", "2,005 kg"],
                ["2 giờ 15 phút", "135 phút"],
              ],
              label: "Đơn vị thể tích đổi 1 000 lần mỗi bậc",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 m 25 cm bằng bao nhiêu mét?",
            options: ["3,25 m", "3,025 m", "32,5 m", "3,5 m"],
            answer: "3,25 m",
            mascotHint: "25 cm = 25/100 m = 0,25 m nên 3 m 25 cm = 3,25 m.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "2 giờ 15 phút bằng bao nhiêu phút?",
            options: ["135 phút", "125 phút", "215 phút", "150 phút"],
            answer: "135 phút",
            mascotHint: "2 giờ = 120 phút; 120 + 15 = 135 (phút).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Độ dài, khối lượng đổi 10 lần mỗi bậc.",
              "Diện tích đổi 100 lần; thể tích đổi 1 000 lần.",
              "Thời gian không theo quy luật 10, 100.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l6",
      title: "Bài 73: Ôn tập toán chuyển động đều",
      type: "learn",
      description:
        "Ôn tập ba công thức: vận tốc, quãng đường, thời gian và bài toán hai vật chuyển động",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hai bạn cùng xuất phát từ hai điểm cách nhau 60 km, đi ngược chiều nhau với vận tốc 20 km/giờ và 30 km/giờ. Sau 1 giờ 12 phút họ gặp nhau! 🚶🚴",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Ba công thức chuyển động đều",
            explanation:
              "Ôn tập công thức v = s : t; s = v × t; t = s : v. Với bài toán hai vật chuyển động ngược chiều cùng lúc, tổng quãng đường hai vật đi được bằng khoảng cách ban đầu, và tổng vận tốc bằng khoảng cách chia thời gian.",
            points: [
              "Xe đi 90 km trong 2 giờ ⇒ v = 45 km/giờ.",
              "Đi 45 km/giờ trong 3 giờ ⇒ s = 135 km.",
              "Hai vật ngược chiều: tổng vận tốc = khoảng cách : thời gian gặp nhau.",
            ],
            rule: "Đổi đơn vị thời gian cho khớp đơn vị vận tốc.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập công thức chuyển động",
            table: {
              headers: ["Đại lượng", "Công thức", "Ví dụ"],
              rows: [
                ["Vận tốc", "v = s : t", "90 km : 2 giờ = 45 km/giờ"],
                ["Quãng đường", "s = v × t", "45 km/giờ × 3 giờ = 135 km"],
                ["Thời gian", "t = s : v", "150 km : 50 km/giờ = 3 giờ"],
              ],
              label: "Xác định đề hỏi đại lượng nào trước khi tính",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ô tô đi 90 km trong 2 giờ. Vận tốc của ô tô là:",
            options: ["45 km/giờ", "90 km/giờ", "180 km/giờ", "40 km/giờ"],
            answer: "45 km/giờ",
            mascotHint: "v = 90 : 2 = 45 (km/giờ).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai xe cách nhau 60 km, đi ngược chiều với vận tốc 20 km/giờ và 30 km/giờ. Sau bao lâu hai xe gặp nhau?",
            options: ["1,2 giờ", "2 giờ", "1,5 giờ", "3 giờ"],
            answer: "1,2 giờ",
            mascotHint: "Tổng vận tốc 20 + 30 = 50 km/giờ; thời gian = 60 : 50 = 1,2 (giờ) = 1 giờ 12 phút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "v = s : t; s = v × t; t = s : v.",
              "Ngược chiều: cộng vận tốc.",
              "Đổi đơn vị thời gian trước khi tính.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l7",
      title: "Bài 74: Ôn tập một số yếu tố thống kê và xác suất",
      type: "learn",
      description:
        "Ôn tập đọc số liệu, biểu đồ và tính tỉ số của số lần lặp lại",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cùng ôn lại cách đọc biểu đồ và tính tỉ số của số lần lặp lại một sự kiện — kiến thức rất gần với cuộc sống! 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Thống kê và xác suất",
            explanation:
              "Ôn tập ba việc: đọc số liệu đã thu thập, đọc biểu đồ cột và biểu đồ quạt tròn, tính tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện.",
            points: [
              "Biểu đồ cột: cột cao hơn biểu diễn số lớn hơn.",
              "Biểu đồ quạt tròn: tổng các phần là 100%.",
              "Tỉ số lần lặp lại = số lần xảy ra : tổng số lần thực hiện.",
            ],
            rule: "Nhận xét phải dựa trên số liệu, không phỏng đoán.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số học sinh các lớp 5 tham gia trồng cây",
            barChart: {
              title: "Số cây lớp 5 trồng được",
              items: [
                { label: "5A", value: 30 },
                { label: "5B", value: 45 },
                { label: "5C", value: 40 },
                { label: "5D", value: 25 },
              ],
              unit: "cây",
              highlight: 1,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lớp nào trồng được nhiều cây nhất?",
            options: ["Lớp 5B", "Lớp 5A", "Lớp 5C", "Lớp 5D"],
            answer: "Lớp 5B",
            mascotHint: "Số cây của lớp 5B là 45 cây, lớn nhất trong bảng.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Gieo xúc xắc 30 lần, mặt 6 chấm xuất hiện 6 lần. Tỉ số của số lần xuất hiện mặt 6 chấm so với tổng số lần gieo là:",
            options: ["1/5", "1/6", "5/30", "6/5"],
            answer: "1/5",
            mascotHint: "6/30 rút gọn thành 1/5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc số liệu từ bảng và biểu đồ.",
              "Biểu đồ quạt tròn có tổng 100%.",
              "Tỉ số lần lặp lại = số lần : tổng số lần.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c12-l8",
      title: "Bài 75: Ôn tập chung",
      type: "learn",
      description:
        "Ôn tập tổng hợp toàn bộ kiến thức Toán Lớp 5",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Chặng cuối cùng của Tiểu học! Cùng nhìn lại toàn bộ kiến thức Toán Lớp 5 trước khi lên Trung học cơ sở. 🎉",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp kiến thức Toán Lớp 5",
            table: {
              headers: ["Chủ đề", "Điều cần nhớ"],
              rows: [
                ["Số tự nhiên, phân số, số thập phân", "đọc, viết, so sánh, chuyển đổi"],
                ["Bốn phép tính", "đặt tính, đặt dấu phẩy, thứ tự phép tính"],
                ["Tỉ số, tỉ số phần trăm", "ba dạng bài phần trăm"],
                ["Hình học", "công thức diện tích, chu vi, thể tích"],
                ["Đo lường", "đổi đơn vị theo bậc"],
                ["Chuyển động đều", "v = s : t; s = v × t; t = s : v"],
              ],
              label: "Ôn kĩ phần đặt tính và bài toán có lời văn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2,5 × 4 = ?",
            options: ["10", "1", "100", "9"],
            answer: "10",
            mascotHint: "25 × 4 = 100; một chữ số phần thập phân ⇒ 10,0 = 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một người đi xe đạp 15 km trong 1 giờ 15 phút. Vận tốc của người đó là:",
            options: ["12 km/giờ", "15 km/giờ", "10 km/giờ", "20 km/giờ"],
            answer: "12 km/giờ",
            mascotHint: "1 giờ 15 phút = 1,25 giờ; 15 : 1,25 = 12 (km/giờ).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 4 cm có thể tích là:",
            options: ["64 cm³", "48 cm³", "16 cm³", "96 cm³"],
            answer: "64 cm³",
            mascotHint: "V = 4 × 4 × 4 = 64 (cm³).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nắm chắc ba loại số và bốn phép tính.",
              "Thuộc công thức hình học và chuyển động đều.",
              "Đọc kĩ đề, trình bày đủ bước và ghi đơn vị.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
