export const g4c7 = {
  id: "g4-c7",
  name: "Chủ đề 7: Ôn tập học kì 1",
  description:
    "Ôn tập số tự nhiên, bốn phép tính, hình học, đo lường và yếu tố thống kê đã học trong học kì 1",
  icon: "📚",
  color: "#6366f1",
  totalLessons: 5,
  lessons: [
    {
      id: "g4-c7-l1",
      title: "Bài 33: Ôn tập số tự nhiên",
      type: "learn",
      description:
        "Đọc, viết số có nhiều chữ số; nêu các chữ số theo lớp; viết số thành tổng; so sánh số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Sắp hết học kì 1 rồi! Hôm nay chúng mình cùng ôn lại về số tự nhiên: đọc, viết số, tách lớp và so sánh số nhé! 📖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Nhớ lại: ba lớp của số",
            explanation:
              "Từ phải sang trái, cứ ba chữ số hợp thành một lớp: lớp đơn vị, lớp nghìn, lớp triệu. Muốn đọc số, bé đọc theo từng lớp từ trái sang phải.",
            points: [
              "Lớp đơn vị: trăm · chục · đơn vị.",
              "Lớp nghìn: nghìn · chục nghìn · trăm nghìn.",
              "Lớp triệu: triệu · chục triệu · trăm triệu.",
              "Viết số thành tổng các hàng giúp đọc và so sánh dễ hơn.",
            ],
            rule: "Ba chữ số một lớp, đọc từ lớp lớn nhất đến lớp bé nhất.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 517 906 384 gồm những lớp nào?",
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
              digits: [5, 1, 7, 9, 0, 6, 3, 8, 4],
              label: "Lớp triệu: 517 · lớp nghìn: 906 · lớp đơn vị: 384",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết mỗi số thành tổng các hàng",
            table: {
              headers: ["Số", "Viết thành tổng"],
              rows: [
                ["45 703", "40 000 + 5 000 + 700 + 3"],
                ["608 292", "600 000 + 8 000 + 200 + 90 + 2"],
                ["815 036", "800 000 + 10 000 + 5 000 + 30 + 6"],
                ["5 240 601", "5 000 000 + 200 000 + 40 000 + 600 + 1"],
              ],
              label: "Mỗi chữ số nhân với giá trị của hàng nó đứng",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 2345,
              right: 345,
              sign: "−"
            },
            text: "Bé tự đặt tính: 2345 − 345\nhàng đơn vị 5 − 5 = 0, viết 0\nhàng chục 4 − 4 = 0, viết 0\nhàng trăm 3 − 3 = 0, viết 0\nVậy 2 345 − 345 = 2 000."
          }
        },
        {
          type: "quiz",
          content: {
            question: "2224 − 392 bằng bao nhiêu?",
            options: [1831, 1832, 1833, 2932],
            answer: 1832,
            mascotHint: "hàng đơn vị 4 − 2 = 2, viết 2. Kết quả 1832."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong số 517 906 384, các chữ số thuộc lớp nghìn là:",
            options: ["5, 1, 7", "9, 0, 6", "3, 8, 4", "5, 9, 3"],
            answer: "9, 0, 6",
            mascotHint:
              "Tách từ phải sang trái: 384 (lớp đơn vị), 906 (lớp nghìn), 517 (lớp triệu).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng của 800 000; 2 000; một số chưa biết; 40 và 5 là 802 145. Số chưa biết là:",
            options: ["100", "1 000", "10", "1"],
            answer: "100",
            mascotHint:
              "Lấy 802 145 trừ dần 800 000; 2 000; 40 và 5, ta được 100.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cho một số có ba chữ số. Khi viết thêm chữ số 2 vào trước số đó thì được số mới lớn hơn số đã cho bao nhiêu đơn vị?",
            options: ["2 000", "200", "20 000", "20"],
            answer: "2 000",
            mascotHint:
              "Ví dụ 345 → 2 345. Số mới lớn hơn: 2 345 − 345 = 2 000 (đơn vị).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Ba lớp: đơn vị · nghìn · triệu.",
              "Viết số thành tổng theo từng hàng.",
              "So sánh số: so số chữ số rồi so từng hàng từ trái sang phải.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c7-l2",
      title: "Bài 34: Ôn tập các phép tính",
      type: "learn",
      description:
        "Tính nhẩm, đặt tính rồi tính cộng trừ số có nhiều chữ số; tính giá trị biểu thức; vận dụng tính thuận tiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng nhau ôn lại bốn phép tính với số lớn nào! Nhớ kĩ: biểu thức có ngoặc thì tính trong ngoặc trước. 🧮",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Nhớ lại thứ tự tính",
            explanation:
              "Trong biểu thức chỉ có cộng trừ (hoặc chỉ nhân chia) thì tính từ trái sang phải. Biểu thức có ngoặc thì tính trong ngoặc trước; nhân chia làm trước cộng trừ.",
            points: [
              "Tính nhẩm với số tròn nghìn, tròn chục nghìn rất nhanh.",
              "Đặt tính thẳng cột rồi tính từ phải sang trái.",
              "Dùng tính chất giao hoán, kết hợp để nhóm số cho thuận tiện.",
            ],
            rule: "Trong ngoặc trước — nhân chia trước — cộng trừ sau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính nhẩm",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["70 000 + 60 000", 130000],
                ["160 000 − 90 000", 70000],
                ["500 000 + 700 000", 1200000],
                ["800 000 + 700 000 − 900 000", 600000],
              ],
              label: "Nhẩm theo nghìn rồi viết thêm ba chữ số 0",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["9 658 + 6 290", "15 948"],
                ["56 204 + 74 539", "130 743"],
                ["14 709 − 5 234", "9 475"],
                ["159 570 − 81 625", "77 945"],
              ],
              label: "Thẳng cột, tính từ phải sang trái",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài so sánh số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đếm số CHỮ SỐ của từng số trước.",
              "Bước 2 — Số nào nhiều chữ số hơn thì lớn hơn — xong, không cần so tiếp.",
              "Bước 3 — Cùng số chữ số thì so từng hàng từ TRÁI sang phải, gặp hàng khác nhau thì dừng.",
              "Bước 4 — Đọc lại kết quả và đặt đúng dấu (>, <, =)."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Nhiều chữ số hơn", "thì số đó lớn hơn"],
                ["So từ trái", "hàng nghìn rồi mới tới trăm, chục, đơn vị"],
                ["Dấu lớn mở về phía", "số lớn hơn"]
              ]
            },
            text: "Bảng nhớ nhanh — so sánh số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Muốn so sánh hai số, bé bắt đầu bằng việc gì?",
            options: [
              "Đếm xem số nào có nhiều chữ số hơn",
              "So chữ số hàng đơn vị trước",
              "Cộng hai số lại",
              "Đọc từ phải sang trái"
            ],
            answer: "Đếm xem số nào có nhiều chữ số hơn",
            mascotHint: "Số nhiều chữ số hơn chắc chắn lớn hơn, nên chỉ cần so từng hàng khi hai số bằng số chữ số."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 160 000 − 90 000 = ?",
            options: ["70 000", "60 000", "80 000", "250 000"],
            answer: "70 000",
            mascotHint: "16 chục nghìn − 9 chục nghìn = 7 chục nghìn = 70 000.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Biểu thức nào có giá trị lớn nhất: A = 90 000 + 30 000 + 5 473 hay B = 387 568 − (200 000 − 40 000)?",
            options: ["A", "B", "Hai biểu thức bằng nhau", "Không tính được"],
            answer: "B",
            mascotHint:
              "A = 125 473. B = 387 568 − 160 000 = 227 568. Vì 227 568 > 125 473 nên B lớn hơn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng cột, tính từ phải sang trái.",
              "Biểu thức: trong ngoặc trước.",
              "Dùng thử lại bằng phép tính ngược để kiểm tra.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c7-l3",
      title: "Bài 35: Ôn tập hình học",
      type: "learn",
      description:
        "Ôn tập góc, hai đường thẳng vuông góc, song song, hình bình hành và hình thoi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cùng nhìn quanh lớp học: mép bảng, chân bàn, khung cửa sổ — chỗ nào có đường thẳng vuông góc, chỗ nào có đường thẳng song song nhỉ? 🔎",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Nhớ lại các loại góc và đường thẳng",
            explanation:
              "Góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông, góc bẹt bằng hai góc vuông. Hai đường thẳng vuông góc tạo bốn góc vuông; hai đường thẳng song song thì không bao giờ cắt nhau.",
            points: [
              "Dùng ê-ke để kiểm tra góc vuông và hai đường thẳng vuông góc.",
              "Hình bình hành: hai cặp cạnh đối diện song song và bằng nhau.",
              "Hình thoi: bốn cạnh bằng nhau, hai đường chéo vuông góc.",
            ],
            rule: "Nhìn dấu hiệu rồi mới kết luận tên hình.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Dấu hiệu nhận biết các hình",
            table: {
              headers: ["Hình", "Dấu hiệu"],
              rows: [
                ["Hình vuông", "4 cạnh bằng nhau, 4 góc vuông"],
                [
                  "Hình chữ nhật",
                  "4 góc vuông, hai cặp cạnh đối diện bằng nhau",
                ],
                [
                  "Hình bình hành",
                  "hai cặp cạnh đối diện song song và bằng nhau",
                ],
                ["Hình thoi", "4 cạnh bằng nhau, hai đường chéo vuông góc"],
              ],
              label: "Đọc dấu hiệu là nhận ra hình ngay",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài đo lường và đổi đơn vị đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đọc đơn vị đang có và đơn vị cần đổi.",
              "Bước 2 — Viết bậc thang đơn vị ra giấy để thấy phải đi mấy bậc.",
              "Bước 3 — Đi xuống (ra đơn vị bé hơn) thì NHÂN; đi lên (ra đơn vị lớn hơn) thì CHIA.",
              "Bước 4 — Viết kết quả kèm đơn vị và kiểm tra lại bằng phép ngược."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["1 m", "= 100 cm"],
                ["1 kg", "= 1 000 g"],
                ["1 l", "= 1 000 ml"]
              ]
            },
            text: "Bảng nhớ nhanh — đo lường và đổi đơn vị\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Đổi số đo từ đơn vị lớn sang đơn vị bé hơn thì bé làm phép gì?",
            options: ["Nhân", "Chia", "Cộng", "Trừ"],
            answer: "Nhân",
            mascotHint: "Đơn vị bé hơn thì số đo phải nhiều hơn: 1 m đổi ra cm được 100 cm — đó là phép nhân."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Góc tù là góc có số đo như thế nào?",
            options: [
              "Lớn hơn góc vuông",
              "Bé hơn góc vuông",
              "Bằng hai góc vuông",
              "Bằng góc vuông",
            ],
            answer: "Lớn hơn góc vuông",
            mascotHint: "Góc tù rộng hơn góc vuông nên số đo lớn hơn 90°.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình nào có hai đường chéo vuông góc với nhau và bốn cạnh bằng nhau?",
            options: [
              "Hình thoi",
              "Hình chữ nhật",
              "Hình bình hành",
              "Hình tròn",
            ],
            answer: "Hình thoi",
            mascotHint:
              "Hình thoi có bốn cạnh bằng nhau và hai đường chéo vuông góc.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Ê-ke giúp kiểm tra góc vuông.",
              "Song song: không bao giờ cắt nhau.",
              "Hình thoi là hình bình hành đặc biệt có bốn cạnh bằng nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c7-l4",
      title: "Bài 36: Ôn tập đo lường",
      type: "learn",
      description:
        "Ôn tập đơn vị đo khối lượng (yến, tạ, tấn), đo diện tích (dm², m², mm²) và đo thời gian (giây, thế kỉ)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một bao gạo nặng 5 yến, một sân trường rộng vài trăm mét vuông, một tiết học dài 35 phút… Mỗi thứ cần một đơn vị đo khác nhau! 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Ba họ đơn vị đo đã học",
            explanation:
              "Khối lượng: yến, tạ, tấn — mỗi đơn vị liền nhau gấp nhau 10 lần. Diện tích: mm², cm², dm², m² — mỗi đơn vị liền nhau gấp nhau 100 lần. Thời gian: giây, phút, giờ, thế kỉ.",
            points: [
              "1 yến = 10 kg; 1 tạ = 100 kg; 1 tấn = 1000 kg.",
              "1 dm² = 100 cm²; 1 m² = 100 dm²; 1 cm² = 100 mm².",
              "1 phút = 60 giây; 1 giờ = 60 phút; 1 thế kỉ = 100 năm.",
            ],
            rule: "Đổi về cùng đơn vị rồi mới tính.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị",
            table: {
              headers: ["Đổi từ", "Sang", "Kết quả"],
              rows: [
                ["3 tấn", "kg", "3000 kg"],
                ["5 tạ", "kg", "500 kg"],
                ["4 m²", "dm²", "400 dm²"],
                ["3 dm²", "cm²", "300 cm²"],
                ["3 phút", "giây", "180 giây"],
                ["2 thế kỉ", "năm", "200 năm"],
              ],
              label: "Xuống một bậc thì nhân, lên một bậc thì chia",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài đo lường và đổi đơn vị đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đọc đơn vị đang có và đơn vị cần đổi.",
              "Bước 2 — Viết bậc thang đơn vị ra giấy để thấy phải đi mấy bậc.",
              "Bước 3 — Đi xuống (ra đơn vị bé hơn) thì NHÂN; đi lên (ra đơn vị lớn hơn) thì CHIA.",
              "Bước 4 — Viết kết quả kèm đơn vị và kiểm tra lại bằng phép ngược."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["1 m", "= 100 cm"],
                ["1 kg", "= 1 000 g"],
                ["1 l", "= 1 000 ml"]
              ]
            },
            text: "Bảng nhớ nhanh — đo lường và đổi đơn vị\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Đổi số đo từ đơn vị lớn sang đơn vị bé hơn thì bé làm phép gì?",
            options: ["Nhân", "Chia", "Cộng", "Trừ"],
            answer: "Nhân",
            mascotHint: "Đơn vị bé hơn thì số đo phải nhiều hơn: 1 m đổi ra cm được 100 cm — đó là phép nhân."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Đổi: 4 m² = … dm²",
            options: ["40 dm²", "400 dm²", "4000 dm²", "44 dm²"],
            answer: "400 dm²",
            mascotHint: "1 m² = 100 dm² nên 4 m² = 4 × 100 = 400 (dm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đổi: 3 phút = … giây",
            options: ["30 giây", "90 giây", "180 giây", "300 giây"],
            answer: "180 giây",
            mascotHint: "1 phút = 60 giây nên 3 phút = 3 × 60 = 180 (giây).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Khối lượng: mỗi bậc 10 lần.",
              "Diện tích: mỗi bậc 100 lần.",
              "Thời gian: 60 giây = 1 phút; 1 thế kỉ = 100 năm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c7-l5",
      title: "Bài 37: Ôn tập một số yếu tố thống kê",
      type: "learn",
      description:
        "Đọc bảng số liệu, so sánh số liệu, làm tròn số liệu và trả lời câu hỏi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bảng số liệu cho biết nhiều điều thú vị: nước nào có nhiều khách du lịch nhất, tỉnh nào đông dân nhất… Cùng đọc bảng như đọc một câu chuyện nhé! 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Đọc bảng số liệu",
            explanation:
              "Khi đọc bảng số liệu, bé nhìn tên cột và tên dòng trước, rồi so sánh các số trong bảng để trả lời câu hỏi: số nào lớn nhất, số nào bé nhất, hơn kém nhau bao nhiêu.",
            points: [
              "Đọc kĩ tiêu đề bảng để biết số liệu nói về cái gì.",
              "So sánh các số: số có nhiều chữ số hơn thì lớn hơn.",
              "Có thể làm tròn số liệu để dễ nhớ: 8 891 344 ≈ 8 891 000 (hàng nghìn).",
            ],
            rule: "Đọc tên cột → đọc số → so sánh → trả lời.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Lượt khách du lịch đến Việt Nam năm 2019",
            table: {
              headers: ["Nước", "Số lượt khách"],
              rows: [
                ["Lào", 98500],
                ["Cam-pu-chia", 227900],
                ["Phi-líp-pin", 509600],
                ["Ma-lai-xi-a", 606200],
              ],
              label: "Ma-lai-xi-a nhiều nhất · Lào ít nhất",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài bài toán có lời văn đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
              "Bước 2 — Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
              "Bước 3 — Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
              "Bước 4 — Đặt tính rồi tính, rồi VIẾT ĐÁP SỐ kèm đơn vị và thử lại bằng phép ngược."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Đơn vị", "đáp số luôn kèm đơn vị như con, quả, kg, cm"],
                ["Kiểm tra", "cộng thì lấy kết quả trừ đi một số hạng"],
                ["Câu trả lời", "viết đủ câu, không chỉ ghi số"]
              ]
            },
            text: "Bảng nhớ nhanh — bài toán có lời văn\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Giải một bài toán có lời văn, bé làm gì TRƯỚC TIÊN?",
            options: [
              "Đọc kỹ đề và gạch dưới các số đã cho",
              "Viết ngay đáp số",
              "Đoán kết quả",
              "Đặt tính trước khi đọc đề"
            ],
            answer: "Đọc kỹ đề và gạch dưới các số đã cho",
            mascotHint: "Chưa đọc kỹ đề thì chưa biết đề cho gì, hỏi gì — mọi bước sau đều dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Theo bảng trên, nước nào có số lượt khách du lịch đến Việt Nam nhiều nhất?",
            options: ["Lào", "Cam-pu-chia", "Phi-líp-pin", "Ma-lai-xi-a"],
            answer: "Ma-lai-xi-a",
            mascotHint: "606 200 là số lớn nhất trong bảng.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Số học sinh tiểu học cả nước là 8 891 344. Làm tròn đến hàng trăm ta được:",
            options: ["8 891 300", "8 891 400", "8 891 000", "8 892 000"],
            answer: "8 891 300",
            mascotHint:
              "Làm tròn đến hàng trăm: nhìn chữ số hàng chục là 4 (< 5) nên giữ nguyên: 8 891 300.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc tiêu đề bảng trước khi so sánh số liệu.",
              "Số nhiều chữ số hơn thì lớn hơn.",
              "Làm tròn giúp số liệu dễ nhớ hơn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
