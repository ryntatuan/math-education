export const g5c7 = {
  id: "g5-c7",
  name: "Chủ đề 7: Tỉ số và các bài toán liên quan",
  description:
    "Tỉ số, tỉ số phần trăm, tỉ lệ bản đồ, tìm hai số khi biết tổng (hiệu) và tỉ số, tìm giá trị phần trăm của một số, máy tính cầm tay",
  icon: "％",
  color: "#ef4444",
  totalLessons: 9,
  lessons: [
    {
      id: "g5-c7-l1",
      title: "Bài 36: Tỉ số. Tỉ số phần trăm",
      type: "learn",
      description:
        "Nhận biết tỉ số của hai số và cách viết tỉ số dưới dạng phân số, tỉ số phần trăm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trong bến xe có 3 ô tô điện và 4 ô tô chạy bằng xăng. Tỉ số giữa số ô tô điện và số ô tô ở bến là 3 : 7. 🚌",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tỉ số. Tỉ số phần trăm",
            explanation:
              "Tỉ số của hai số a và b là kết quả so sánh số này với số kia, viết là a : b hoặc a/b (b khác 0). Tỉ số phần trăm là tỉ số được viết dưới dạng phần trăm, có mẫu số là 100.",
            points: [
              "Tỉ số của 3 và 7 là 3 : 7 hay 3/7.",
              "3 : 4 = 0,75 = 75%.",
              "1/2 = 50/100 = 50%.",
            ],
            rule: "Tỉ số phần trăm có mẫu số là 100.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tỉ số và tỉ số phần trăm",
            table: {
              headers: ["So sánh", "Tỉ số", "Tỉ số phần trăm"],
              rows: [
                ["3 so với 4", "3 : 4", "75%"],
                ["1 so với 2", "1 : 2", "50%"],
                ["1 so với 4", "1 : 4", "25%"],
                ["7 so với 10", "7 : 10", "70%"],
              ],
              label: "0,75 = 75/100 = 75%",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong bến có 3 ô tô điện và 4 ô tô chạy xăng. Tỉ số của số ô tô điện và số ô tô ở bến là:",
            options: ["3 : 7", "4 : 7", "3 : 4", "7 : 3"],
            answer: "3 : 7",
            mascotHint: "Số ô tô ở bến là 3 + 4 = 7 nên tỉ số là 3 : 7.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 3 : 4 thành tỉ số phần trăm:",
            options: ["75%", "34%", "43%", "25%"],
            answer: "75%",
            mascotHint: "3 : 4 = 0,75 = 75/100 = 75%.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tỉ số của a và b là a : b hay a/b.",
              "Tỉ số phần trăm có mẫu số 100.",
              "Đổi phân số, số thập phân thành phần trăm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l2",
      title: "Bài 37: Tỉ lệ bản đồ và ứng dụng",
      type: "learn",
      description:
        "Đọc tỉ lệ bản đồ và tính độ dài thật, độ dài thu nhỏ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bản đồ ghi tỉ lệ 1 : 1 000 000. Vậy 1 cm trên bản đồ tương ứng 1 000 000 cm ngoài thực tế — tức 10 km! 🗺️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tỉ lệ bản đồ",
            explanation:
              "Tỉ lệ bản đồ cho biết khoảng cách trên bản đồ đã được thu nhỏ bao nhiêu lần so với độ dài thật. Tỉ lệ 1 : a nghĩa là 1 đơn vị trên bản đồ ứng với a đơn vị ngoài thực tế.",
            points: [
              "Tỉ lệ 1 : 1 000 000 ⇒ 1 cm trên bản đồ = 1 000 000 cm = 10 km thực tế.",
              "Độ dài thật = độ dài trên bản đồ × mẫu số của tỉ lệ.",
              "Độ dài thu nhỏ = độ dài thật : mẫu số của tỉ lệ.",
            ],
            rule: "Tỉ lệ càng nhỏ thì bản đồ càng thu gọn nhiều.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ứng dụng tỉ lệ bản đồ",
            table: {
              headers: ["Tỉ lệ bản đồ", "Độ dài trên bản đồ", "Độ dài thực tế"],
              rows: [
                ["1 : 1 000 000", "1 cm", "10 km"],
                ["1 : 500", "2 cm", "10 m"],
                ["1 : 200", "3 cm", "6 m"],
                ["1 : 5 000", "4 cm", "200 m"],
              ],
              label: "Đổi đơn vị sau khi tính: 500 cm = 5 m",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bản đồ tỉ lệ 1 : 500, độ dài trên bản đồ 2 cm. Độ dài thực tế là:",
            options: ["10 m", "1 000 m", "10 cm", "1 m"],
            answer: "10 m",
            mascotHint: "2 × 500 = 1 000 cm = 10 m.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bản đồ tỉ lệ 1 : 1 000 000, độ dài thật 20 km thì độ dài trên bản đồ là:",
            options: ["2 cm", "20 cm", "2 m", "200 cm"],
            answer: "2 cm",
            mascotHint: "20 km = 2 000 000 cm; 2 000 000 : 1 000 000 = 2 (cm).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tỉ lệ bản đồ cho biết mức thu nhỏ.",
              "Độ dài thật = độ dài bản đồ × mẫu số tỉ lệ.",
              "Đổi về cùng đơn vị rồi mới kết luận.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l3",
      title: "Bài 38: Tìm hai số khi biết tổng và tỉ số của hai số đó",
      type: "learn",
      description:
        "Giải bài toán tìm hai số khi biết tổng và tỉ số bằng sơ đồ đoạn thẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Hai bạn có tất cả 45 viên bi, số bi của bạn thứ nhất bằng 2/3 số bi của bạn thứ hai. Mỗi bạn có bao nhiêu viên bi? 🔵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bài toán tổng – tỉ",
            explanation:
              "Để giải bài toán tìm hai số khi biết tổng và tỉ số, ta vẽ sơ đồ đoạn thẳng biểu diễn hai số theo tỉ số đã cho, tìm tổng số phần bằng nhau, rồi tìm giá trị một phần và từng số.",
            points: [
              "Bước 1: vẽ sơ đồ theo tỉ số.",
              "Bước 2: tìm tổng số phần bằng nhau.",
              "Bước 3: giá trị một phần = tổng : tổng số phần.",
              "Bước 4: số bé = giá trị một phần × số phần của số bé.",
            ],
            rule: "Kiểm tra: tổng hai số tìm được phải bằng tổng đã cho.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ví dụ: tổng 45, tỉ số 2/3",
            table: {
              headers: ["Bước", "Phép tính", "Kết quả"],
              rows: [
                ["Tổng số phần", "2 + 3", 5],
                ["Giá trị một phần", "45 : 5", 9],
                ["Số bé", "9 × 2", 18],
                ["Số lớn", "9 × 3", 27],
              ],
              label: "Thử lại: 18 + 27 = 45 ✓",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hai bạn có tất cả 45 viên bi, tỉ số là 2/3. Số bi của hai bạn lần lượt là:",
            options: ["18 viên và 27 viên", "15 viên và 30 viên", "20 viên và 25 viên", "9 viên và 36 viên"],
            answer: "18 viên và 27 viên",
            mascotHint: "Tổng số phần 5 ⇒ một phần 9 ⇒ 9 × 2 = 18 và 9 × 3 = 27.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một lớp có 35 học sinh, số học sinh nữ bằng 3/4 số học sinh nam. Số học sinh nam là:",
            options: ["20 bạn", "15 bạn", "21 bạn", "14 bạn"],
            answer: "20 bạn",
            mascotHint: "Tổng số phần 3 + 4 = 7 ⇒ một phần 5 ⇒ nam 4 × 5 = 20 (bạn).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Vẽ sơ đồ theo tỉ số.",
              "Tìm tổng số phần bằng nhau.",
              "Tính giá trị một phần rồi tính từng số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l4",
      title: "Bài 39: Tìm hai số khi biết hiệu và tỉ số của hai số đó",
      type: "learn",
      description:
        "Giải bài toán tìm hai số khi biết hiệu và tỉ số bằng sơ đồ đoạn thẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Số lớn hơn số bé 12 đơn vị, tỉ số giữa hai số là 5/3. Hai số đó là bao nhiêu nhỉ? 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bài toán hiệu – tỉ",
            explanation:
              "Với bài toán tìm hai số khi biết hiệu và tỉ số, ta vẽ sơ đồ đoạn thẳng, tìm hiệu số phần bằng nhau, rồi tìm giá trị một phần và từng số.",
            points: [
              "Hiệu số phần = số phần của số lớn − số phần của số bé.",
              "Giá trị một phần = hiệu : hiệu số phần.",
              "Số bé = giá trị một phần × số phần của số bé.",
            ],
            rule: "Kiểm tra: hiệu hai số tìm được phải bằng hiệu đã cho.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ví dụ: hiệu 12, tỉ số 5/3",
            table: {
              headers: ["Bước", "Phép tính", "Kết quả"],
              rows: [
                ["Hiệu số phần", "5 − 3", 2],
                ["Giá trị một phần", "12 : 2", 6],
                ["Số bé", "6 × 3", 18],
                ["Số lớn", "6 × 5", 30],
              ],
              label: "Thử lại: 30 − 18 = 12 ✓",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hiệu hai số là 12, tỉ số là 5/3. Hai số đó là:",
            options: ["18 và 30", "15 và 27", "12 và 24", "20 và 32"],
            answer: "18 và 30",
            mascotHint: "Hiệu số phần 2 ⇒ một phần 6 ⇒ 6 × 3 = 18 và 6 × 5 = 30.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Mẹ hơn con 28 tuổi, tuổi mẹ gấp 5 lần tuổi con. Tuổi con là:",
            options: ["7 tuổi", "5 tuổi", "8 tuổi", "14 tuổi"],
            answer: "7 tuổi",
            mascotHint: "Hiệu số phần 5 − 1 = 4 ⇒ một phần 7 ⇒ tuổi con 7 tuổi.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Vẽ sơ đồ theo tỉ số.",
              "Tìm hiệu số phần bằng nhau.",
              "Tính giá trị một phần rồi tính từng số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l5",
      title: "Bài 40: Tìm tỉ số phần trăm của hai số",
      type: "learn",
      description:
        "Tìm tỉ số phần trăm của hai số bằng cách lấy số thứ nhất chia số thứ hai rồi nhân với 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Lớp có 25 học sinh, trong đó 20 bạn thích bóng đá. Vậy số bạn thích bóng đá chiếm bao nhiêu phần trăm? ⚽",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tìm tỉ số phần trăm của hai số",
            explanation:
              "Muốn tìm tỉ số phần trăm của hai số, ta tìm thương của hai số đó, nhân thương với 100 rồi viết thêm kí hiệu % vào bên phải kết quả.",
            points: [
              "20 : 25 = 0,8; 0,8 × 100 = 80; vậy 80%.",
              "Trong thực hành, ta có thể viết gọn: 20 : 25 × 100 = 80%.",
              "Kết quả thường lấy đến hai chữ số ở phần thập phân.",
            ],
            rule: "Thương × 100 rồi thêm kí hiệu %.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tỉ số phần trăm của hai số",
            table: {
              headers: ["Bài toán", "Phép tính", "Tỉ số phần trăm"],
              rows: [
                ["20 và 25", "20 : 25 × 100", "80%"],
                ["15 và 60", "15 : 60 × 100", "25%"],
                ["45 và 50", "45 : 50 × 100", "90%"],
                ["7 và 20", "7 : 20 × 100", "35%"],
              ],
              label: "Kiểm tra: kết quả phải có kí hiệu %",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm tỉ số phần trăm của 20 và 25:",
            options: ["80%", "75%", "20%", "125%"],
            answer: "80%",
            mascotHint: "20 : 25 = 0,8; 0,8 × 100 = 80%.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lớp có 50 học sinh, trong đó 15 bạn đi xe đạp đến trường. Số bạn đi xe đạp chiếm:",
            options: ["30%", "25%", "35%", "15%"],
            answer: "30%",
            mascotHint: "15 : 50 × 100 = 30%.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Lấy số thứ nhất chia số thứ hai.",
              "Nhân thương với 100.",
              "Viết thêm kí hiệu %.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l6",
      title: "Bài 41: Tìm giá trị phần trăm của một số",
      type: "learn",
      description:
        "Tìm giá trị phần trăm của một số rồi vận dụng vào tính tiền, giảm giá",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Một chiếc áo giá 400 000 đồng đang giảm 10%. Vậy giảm bao nhiêu tiền và phải trả bao nhiêu? 🛍️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tìm giá trị phần trăm của một số",
            explanation:
              "Muốn tìm giá trị phần trăm của một số, ta lấy số đó chia cho 100 rồi nhân với số phần trăm, hoặc lấy số đó nhân với số phần trăm rồi chia cho 100.",
            points: [
              "10% của 400 000 = 400 000 : 100 × 10 = 40 000 (đồng).",
              "Giá sau khi giảm = 400 000 − 40 000 = 360 000 (đồng).",
              "25% của 200 kg = 200 : 100 × 25 = 50 (kg).",
            ],
            rule: "Giá trị % = số đó : 100 × số phần trăm.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm giá trị phần trăm của một số",
            table: {
              headers: ["Bài toán", "Phép tính", "Kết quả"],
              rows: [
                ["10% của 400 000", "400 000 : 100 × 10", "40 000"],
                ["25% của 200 kg", "200 : 100 × 25", "50 kg"],
                ["15% của 60 l", "60 : 100 × 15", "9 l"],
                ["50% của 8 m", "8 : 100 × 50", "4 m"],
              ],
              label: "Nhớ đơn vị đo của kết quả",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "10% của 400 000 đồng là bao nhiêu?",
            options: ["40 000 đồng", "4 000 đồng", "400 000 đồng", "10 000 đồng"],
            answer: "40 000 đồng",
            mascotHint: "400 000 : 100 × 10 = 40 000 (đồng).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chiếc áo 400 000 đồng giảm 10%. Giá phải trả sau khi giảm là:",
            options: ["360 000 đồng", "390 000 đồng", "40 000 đồng", "300 000 đồng"],
            answer: "360 000 đồng",
            mascotHint: "Giảm 40 000 đồng; 400 000 − 40 000 = 360 000 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Giá trị % = số : 100 × số phần trăm.",
              "Giá sau khi giảm = giá gốc − số tiền giảm.",
              "Ghi đúng đơn vị của kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l7",
      title: "Bài 42: Máy tính cầm tay",
      type: "learn",
      description:
        "Làm quen với các phím của máy tính cầm tay và dùng máy để tính toán, tính phần trăm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt vừa được tặng một chiếc máy tính cầm tay. Trên máy có phím số, phím phép tính, phím % và phím dấu phẩy. Cùng khám phá! 🤖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các phím của máy tính cầm tay",
            explanation:
              "Máy tính cầm tay có các phím số từ 0 đến 9, phím dấu phẩy để nhập số thập phân, các phím cộng trừ nhân chia, phím bằng và phím phần trăm. Ta nhập phép tính theo đúng thứ tự hiện trên máy rồi bấm phím bằng để xem kết quả.",
            points: [
              "Phím dấu phẩy dùng để nhập phần thập phân.",
              "Bấm lần lượt: số, phép tính, số, rồi phím bằng.",
              "Phím % giúp tính nhanh tỉ số phần trăm.",
            ],
            rule: "Nhập đúng thứ tự và kiểm tra kết quả bằng ước lượng.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhập phép tính trên máy",
            table: {
              headers: ["Bấm phím", "Điều xảy ra"],
              rows: [
                ["12 , 5 + 4 , 5 =", "hiện 17"],
                ["200 × 15 % =", "hiện 30 (tức 15% của 200)"],
                ["7 500 ÷ 100 =", "hiện 75"],
                ["C", "xoá để nhập phép tính mới"],
              ],
              label: "Luôn ước lượng trước để kiểm tra kết quả máy hiện ra",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bấm 12 , 5 + 4 , 5 = thì máy hiện kết quả nào?",
            options: ["17", "17,5", "16", "1,7"],
            answer: "17",
            mascotHint: "12,5 + 4,5 = 17.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Muốn nhập số 3,75 vào máy tính cầm tay, em bấm thế nào?",
            options: [
              "Bấm 3, dấu phẩy, 7, 5",
              "Bấm 3, 7, 5",
              "Bấm 3, 7, dấu phẩy, 5",
              "Bấm 3, dấu chấm, 7, 5 trên bàn phím chữ",
            ],
            answer: "Bấm 3, dấu phẩy, 7, 5",
            mascotHint: "Dấu phẩy dùng để ngăn cách phần nguyên và phần thập phân.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Máy tính cầm tay có phím số, phím phép tính, phím %.",
              "Nhập số thập phân bằng phím dấu phẩy.",
              "Ước lượng kết quả để kiểm tra.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l8",
      title: "Bài 43: Thực hành và trải nghiệm sử dụng máy tính cầm tay",
      type: "learn",
      description:
        "Dùng máy tính cầm tay giải các bài toán thực tế về mua bán, phần trăm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hôm nay cả lớp đi siêu thị và dùng máy tính cầm tay để tính tiền. Vừa học vừa trải nghiệm thật vui! 🛒",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Dùng máy tính giải bài toán thực tế",
            explanation:
              "Khi mua hàng, ta cần tính tổng số tiền, số tiền giảm giá và số tiền còn lại. Máy tính cầm tay giúp tính nhanh, nhưng ta vẫn phải viết phép tính ra giấy để trình bày cách làm.",
            points: [
              "Tính tiền từng món: số lượng × giá tiền.",
              "Tính tiền giảm giá: giá gốc × số phần trăm : 100.",
              "Kiểm tra kết quả bằng ước lượng tròn trăm, tròn nghìn.",
            ],
            rule: "Máy tính chỉ hỗ trợ tính nhanh — vẫn phải hiểu cách làm.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tính tiền đi siêu thị",
            table: {
              headers: ["Mặt hàng", "Số lượng", "Đơn giá (đồng)", "Thành tiền"],
              rows: [
                ["Vở", 5, "9 000", "45 000"],
                ["Bút chì", 3, "6 000", "18 000"],
                ["Thước kẻ", 1, "15 000", "15 000"],
                ["Tổng cộng", "", "", "78 000"],
              ],
              label: "Dùng máy tính kiểm tra lại cột thành tiền",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Mua 5 quyển vở, mỗi quyển 9 000 đồng. Tổng số tiền phải trả là:",
            options: ["45 000 đồng", "14 000 đồng", "54 000 đồng", "4 500 đồng"],
            answer: "45 000 đồng",
            mascotHint: "5 × 9 000 = 45 000 (đồng).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một món hàng giá 200 000 đồng được giảm 20%. Số tiền phải trả là:",
            options: ["160 000 đồng", "180 000 đồng", "20 000 đồng", "140 000 đồng"],
            answer: "160 000 đồng",
            mascotHint: "Giảm 200 000 : 100 × 20 = 40 000 đồng; 200 000 − 40 000 = 160 000 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tính thành tiền = số lượng × đơn giá.",
              "Tính tiền giảm theo phần trăm.",
              "Dùng máy tính để kiểm tra, không thay thế suy nghĩ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c7-l9",
      title: "Bài 44: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập tỉ số, tỉ số phần trăm, tỉ lệ bản đồ và hai bài toán tổng – tỉ, hiệu – tỉ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn tập toàn bộ Chủ đề 7 — chủ đề “đắt khách” nhất trong các bài kiểm tra! 🎯",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp Chủ đề 7",
            table: {
              headers: ["Nội dung", "Cách làm"],
              rows: [
                ["Tỉ số, tỉ số phần trăm", "a : b; thương × 100%"],
                ["Tỉ lệ bản đồ", "độ dài thật = bản đồ × mẫu số"],
                ["Tổng – tỉ", "tổng : tổng số phần"],
                ["Hiệu – tỉ", "hiệu : hiệu số phần"],
                ["Giá trị phần trăm", "số : 100 × số phần trăm"],
              ],
              label: "Vẽ sơ đồ khi làm bài toán tổng – tỉ, hiệu – tỉ",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm tỉ số phần trăm của 45 và 50:",
            options: ["90%", "45%", "50%", "95%"],
            answer: "90%",
            mascotHint: "45 : 50 × 100 = 90%.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng hai số là 60, tỉ số là 2/3. Số lớn là:",
            options: ["36", "24", "30", "40"],
            answer: "36",
            mascotHint: "Tổng số phần 5 ⇒ một phần 12 ⇒ số lớn 12 × 3 = 36.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "25% của 480 kg là:",
            options: ["120 kg", "96 kg", "240 kg", "125 kg"],
            answer: "120 kg",
            mascotHint: "480 : 100 × 25 = 120 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân biệt tổng – tỉ và hiệu – tỉ.",
              "Tính phần trăm theo công thức.",
              "Đổi đơn vị khi dùng tỉ lệ bản đồ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
