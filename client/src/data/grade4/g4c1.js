export const g4c1 = {
  id: "g4-c1",
  name: "Chủ đề 1: Ôn tập và bổ sung",
  description:
    "Ôn lại số đến 100 000 và bốn phép tính trong phạm vi 100 000; số chẵn – số lẻ; biểu thức chữ; giải bài toán có ba bước tính",
  icon: "🔢",
  color: "#3b82f6",
  totalLessons: 6,
  lessons: [
    {
      id: "g4-c1-l1",
      title: "Bài 1: Ôn tập các số đến 100 000",
      type: "learn",
      description:
        "Đọc, viết số đến 100 000; nêu cấu tạo theo hàng; viết số thành tổng; so sánh và làm tròn số đến hàng nghìn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Chào mừng các bạn đến với Toán lớp 4! Rô-bốt và Cú Mèo rất vui được đồng hành cùng các bạn. Hôm nay chúng mình cùng ôn lại các số đến 100 000 nhé! 🦉🤖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mỗi chữ số có một hàng của riêng nó",
            explanation:
              "Trong số có năm chữ số, các hàng từ trái sang phải lần lượt là: chục nghìn, nghìn, trăm, chục, đơn vị. Nhìn vào hàng của từng chữ số, bé đọc được số và viết được số thành tổng.",
            points: [
              "Hàng chục nghìn lớn nhất, hàng đơn vị nhỏ nhất.",
              "Viết số thành tổng các hàng: 68 352 = 60 000 + 8 000 + 300 + 50 + 2.",
              "Muốn so sánh hai số: so số chữ số trước, rồi so từng hàng từ trái sang phải.",
            ],
            rule: "Đọc số từ trái sang phải; số nào có nhiều chữ số hơn thì số đó lớn hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cấu tạo của số 68 352",
            placeValue: {
              headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
              digits: [6, 8, 3, 5, 2],
              label: "68 352 = 60 000 + 8 000 + 300 + 50 + 2",
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
                [6825, "6000 + 800 + 20 + 5"],
                [33471, "30 000 + 3000 + 400 + 70 + 1"],
                [75860, "70 000 + 5000 + 800 + 60"],
                [86209, "80 000 + 6000 + 200 + 9"],
              ],
              label: "Cùng điền cột bên phải nhé!",
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
            question:
              "Số bé nhất trong các số 20 107, 19 482, 15 999, 18 700 là số nào?",
            options: ["20 107", "19 482", "15 999", "18 700"],
            answer: "15 999",
            mascotHint:
              "Cả bốn số đều có năm chữ số, nên so hàng chục nghìn: 1 = 1, rồi so hàng nghìn: 5 < 8 < 9 < 0? Không được! 15 999 có 1 chục nghìn và 5 nghìn, bé nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào có chữ số hàng trăm là 8?",
            options: ["57 680", "48 954", "84 273", "39 825"],
            answer: "39 825",
            mascotHint:
              "Đếm từ phải sang trái: đơn vị, chục, trăm. Số 39 825 có hàng trăm là 8.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số liều vắc-xin tiêm được trong bốn ngày đầu của tuần chiến dịch",
            table: {
              headers: ["Ngày", "Số liều vắc-xin"],
              rows: [
                ["Thứ Hai", 36785],
                ["Thứ Ba", 35952],
                ["Thứ Tư", 37243],
                ["Thứ Năm", 29419],
              ],
              label: "Cùng so sánh các số để trả lời câu hỏi",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ngày nào tiêm được nhiều liều vắc-xin nhất?",
            options: ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm"],
            answer: "Thứ Tư",
            mascotHint:
              "So hàng nghìn: 37 243 có 7 nghìn, lớn hơn 36 785 (6 nghìn), 35 952 (5 nghìn) và 29 419 (9 nghìn).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Năm hàng của số có năm chữ số: chục nghìn · nghìn · trăm · chục · đơn vị.",
              "Viết số thành tổng các hàng giúp bé đọc và so sánh số chính xác.",
              "Làm tròn đến hàng nghìn: nhìn chữ số hàng trăm, từ 5 trở lên thì thêm 1 nghìn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c1-l2",
      title: "Bài 2: Ôn tập các phép tính trong phạm vi 100 000",
      type: "learn",
      description:
        "Tính nhẩm, đặt tính rồi tính cộng trừ nhân chia; tính giá trị của biểu thức có dấu ngoặc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hôm nay chúng mình ôn lại bốn phép tính đã học ở lớp 3, nhưng với các số lớn hơn nhé! Ai nhớ thứ tự tính biểu thức nào? 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thứ tự tính trong một biểu thức",
            explanation:
              "Trong biểu thức chỉ có cộng trừ (hoặc chỉ nhân chia), ta tính từ trái sang phải. Nếu biểu thức có ngoặc, ta tính phần trong ngoặc trước. Nhân chia làm trước cộng trừ.",
            points: [
              "Biểu thức có ngoặc: tính trong ngoặc trước.",
              "Có nhân hoặc chia lẫn cộng trừ: nhân, chia trước; cộng, trừ sau.",
              "Đặt tính thẳng cột theo từng hàng rồi tính từ phải sang trái.",
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
                ["8 000 + 7 000", 15000],
                ["16 000 − 9 000", 7000],
                ["25 000 + 30 000", 55000],
                ["73 000 − 3 000 − 50 000", 20000],
              ],
              label: "Nghìn cộng nghìn, bé nhẩm rất nhanh!",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 53 640 + 8 290",
            cotTinh: { left: 53640, right: 8290, sign: "+" },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 68 497 − 35 829",
            cotTinh: { left: 68497, right: 35829, sign: "−" },
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
            question: "Tích của 29 073 và 3 là bao nhiêu?",
            options: ["67 219", "87 019", "87 219", "87 291"],
            answer: "87 219",
            mascotHint:
              "29 073 × 3: 3 × 3 = 9 viết 9; 7 × 3 = 21 viết 1 nhớ 2…",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Thực hiện phép chia 54 658 : 9 được thương và số dư là:",
            options: [
              "Thương 6 073, dư 1",
              "Thương 673, dư 1",
              "Thương 6 072, dư 10",
              "Thương 672, dư 1",
            ],
            answer: "Thương 6 073, dư 1",
            mascotHint:
              "54 658 : 9 = 6 073 (dư 1). Thử lại: 6 073 × 9 = 54 657, thêm 1 là 54 658 ✓",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính giá trị của biểu thức",
            table: {
              headers: ["Biểu thức", "Giá trị"],
              rows: [
                ["57 670 − (29 663 − 2 653)", 30660],
                ["16 000 + 8 140 + 2 760", 26900],
                ["(54 000 − 6 000) : 8", 6000],
                ["43 680 − 7 120 × 5", 8080],
              ],
              label: "Nhớ tính trong ngoặc trước, nhân chia trước cộng trừ sau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một hộp bút giá 16 500 đồng, một ba lô đắt hơn hộp bút 62 500 đồng. Mẹ mua cả hai thứ thì phải trả bao nhiêu tiền?",
            options: [
              "79 000 đồng",
              "95 500 đồng",
              "85 500 đồng",
              "99 000 đồng",
            ],
            answer: "95 500 đồng",
            mascotHint:
              "Ba lô: 16 500 + 62 500 = 79 000 (đồng). Cả hai: 16 500 + 79 000 = 95 500 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tính nhẩm với số tròn nghìn rất nhanh: 8 nghìn + 7 nghìn = 15 nghìn.",
              "Đặt tính thẳng cột, tính từ phải sang trái.",
              "Biểu thức: trong ngoặc trước, nhân chia trước cộng trừ sau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c1-l3",
      title: "Bài 3: Số chẵn, số lẻ",
      type: "learn",
      description:
        "Nhận biết số chẵn (chia hết cho 2) và số lẻ (không chia hết cho 2) qua chữ số tận cùng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo đi dọc một con phố: bên này nhà số 10, 12, 14, 16…, bên kia nhà số 11, 13, 15… Các số đó có gì đặc biệt nhỉ? 🏠",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Số chẵn và số lẻ",
            explanation:
              "Số chia hết cho 2 là số chẵn. Số không chia hết cho 2 là số lẻ. Chỉ cần nhìn chữ số tận cùng là bé biết ngay: tận cùng 0, 2, 4, 6, 8 là số chẵn; tận cùng 1, 3, 5, 7, 9 là số lẻ.",
            points: [
              "Số chẵn: tận cùng 0, 2, 4, 6, 8 — ví dụ 40, 72, 214, 96.",
              "Số lẻ: tận cùng 1, 3, 5, 7, 9 — ví dụ 31, 73, 615, 107.",
              "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị (116 và 118).",
              "Hai số lẻ liên tiếp cũng hơn kém nhau 2 đơn vị (117 và 119).",
            ],
            rule: "Chữ số tận cùng quyết định số đó chẵn hay lẻ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Trên tia số, các số chẵn và số lẻ nằm xen kẽ nhau",
            numberLine: { from: 0, to: 12, step: 1 },
          },
        },
        {
          type: "visual",
          content: {
            text: "Trong các số dưới đây, số nào chẵn, số nào lẻ?",
            table: {
              headers: ["Số", "Chẵn hay lẻ?", "Vì sao"],
              rows: [
                [12, "chẵn", "tận cùng 2"],
                [315, "lẻ", "tận cùng 5"],
                [108, "chẵn", "tận cùng 8"],
                [71, "lẻ", "tận cùng 1"],
                [194, "chẵn", "tận cùng 4"],
                [656, "chẵn", "tận cùng 6"],
              ],
              label: "Chỉ cần nhìn chữ số tận cùng!",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 118,
              right: 116,
              sign: "−"
            },
            text: "Bé tự đặt tính: 118 − 116\nhàng đơn vị 8 − 6 = 2, viết 2\nhàng chục 1 − 1 = 0, viết 0\nhàng trăm 1 − 1 = 0, viết 0\nVậy 118 − 116 = 2."
          }
        },
        {
          type: "quiz",
          content: {
            question: "298 − 293 bằng bao nhiêu?",
            options: [4, 5, 6, 7],
            answer: 5,
            mascotHint: "hàng đơn vị 8 − 3 = 5, viết 5. Kết quả 5."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Biết 116 và 118 là hai số chẵn liên tiếp. Hai số chẵn liên tiếp hơn kém nhau bao nhiêu đơn vị?",
            options: ["1", "2", "3", "4"],
            answer: "2",
            mascotHint:
              "118 − 116 = 2. Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Từ 10 đến 31 có bao nhiêu số chẵn?",
            options: ["10", "11", "12", "22"],
            answer: "11",
            mascotHint:
              "Các số chẵn: 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 — đếm được 11 số.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cú Mèo gắp ba thẻ số 4, 5, 6. Số chẵn lớn nhất có hai chữ số lập được từ hai trong ba thẻ đó là số nào?",
            options: ["45", "54", "64", "65"],
            answer: "64",
            mascotHint:
              "Muốn số lớn nhất thì hàng chục phải lớn: 6 rồi tới đơn vị chẵn: 64. Số 65 là số lẻ.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số chẵn chia hết cho 2; số lẻ không chia hết cho 2.",
              "Nhìn chữ số tận cùng để nhận biết nhanh.",
              "Hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c1-l4",
      title: "Bài 4: Biểu thức chữ",
      type: "learn",
      description:
        "Làm quen biểu thức chứa một chữ, hai chữ, ba chữ; tính giá trị của biểu thức khi thay chữ bằng số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Nam gấp được 2 cái thuyền, Việt gấp được 4 cái. Mai gấp được bao nhiêu thì mình chưa đếm — coi như là a. Vậy Nam và Mai gấp được 2 + a cái thuyền! ⛵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Biểu thức chứa chữ",
            explanation:
              "2 + a là một biểu thức chứa một chữ. Mỗi lần thay chữ a bằng một số, bé tính được một giá trị của biểu thức. Biểu thức có thể chứa hai chữ như (a + b) × 2, hoặc ba chữ như a + b + c.",
            points: [
              "Nếu a = 4 thì 2 + a = 2 + 4 = 6; 6 là một giá trị của biểu thức 2 + a.",
              "Nếu a = 12 thì 2 + a = 2 + 12 = 14; 14 là một giá trị khác.",
              "Biểu thức chứa chữ luôn cho một giá trị mới mỗi khi chữ đổi số.",
            ],
            rule: "Thay chữ bằng số rồi tính — làm đúng thứ tự phép tính như đã học.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Giá trị của biểu thức 2 + a theo từng giá trị của a",
            table: {
              headers: ["a", "2 + a"],
              rows: [
                [4, 6],
                [12, 14],
              ],
              label: "Cùng tính: 2 + 4 và 2 + 12",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính giá trị của biểu thức",
            table: {
              headers: ["Biểu thức", "Giá trị"],
              rows: [
                ["40 − b với b = 15", 25],
                ["125 : m với m = 5", 25],
                ["(b + 4) × 3 với b = 27", 93],
                ["a + b × 2 với a = 8; b = 2", 12],
              ],
              label: "Nhớ: nhân chia trước, cộng trừ sau!",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Chu vi hình vuông: P = a × 4 (a là độ dài cạnh)",
            table: {
              headers: ["Cạnh a", "Chu vi P = a × 4"],
              rows: [
                ["5 cm", "20 cm"],
                ["9 cm", "36 cm"],
              ],
              label: "a × 4 là biểu thức chứa một chữ",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 9,
              right: 4,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 9 × 4\nhàng đơn vị 9 × 4 = 36, viết 6 nhớ 3\ncòn nhớ 3 ở hàng cao hơn, viết 3\nVậy 9 × 4 = 36."
          }
        },
        {
          type: "quiz",
          content: {
            question: "6 × 5 bằng bao nhiêu?",
            options: [29, 30, 31, 32],
            answer: 30,
            mascotHint: "hàng đơn vị 6 × 5 = 30, viết 0 nhớ 3. Kết quả 30."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình vuông có cạnh a = 9 cm. Chu vi của hình vuông đó là bao nhiêu?",
            options: ["13 cm", "18 cm", "36 cm", "81 cm"],
            answer: "36 cm",
            mascotHint: "Chu vi hình vuông bằng cạnh nhân 4: 9 × 4 = 36 (cm).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Giá trị của biểu thức 35 + 5 × a với a = 5 là bao nhiêu?",
            options: ["45", "60", "200", "50"],
            answer: "60",
            mascotHint:
              "Tính 5 × 5 = 25 trước, rồi 35 + 25 = 60. Nhân phải làm trước cộng!",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chu vi hình chữ nhật: P = (a + b) × 2 (a là chiều dài, b là chiều rộng)",
            table: {
              headers: [
                "Chiều dài a",
                "Chiều rộng b",
                "Chu vi P = (a + b) × 2",
              ],
              rows: [
                [10, 7, 34],
                [25, 15, 80],
                [34, 28, 124],
              ],
              label: "(a + b) × 2 là biểu thức chứa hai chữ",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Với m bằng bao nhiêu thì biểu thức 12 : (3 − m) có giá trị lớn nhất?",
            options: ["m = 0", "m = 1", "m = 2", "m = 3"],
            answer: "m = 2",
            mascotHint:
              "m = 0 → 12 : 3 = 4; m = 1 → 12 : 2 = 6; m = 2 → 12 : 1 = 12 (lớn nhất). m = 3 thì 3 − 3 = 0, không chia được cho 0!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Biểu thức chứa chữ: 2 + a, (a + b) × 2, a + b + c.",
              "Thay chữ bằng số rồi tính đúng thứ tự phép tính.",
              "Cùng một biểu thức, mỗi giá trị của chữ cho một giá trị khác nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c1-l5",
      title: "Bài 5: Giải bài toán có ba bước tính",
      type: "learn",
      description:
        "Tóm tắt đề, tìm từng phần theo thứ tự rồi mới tính câu hỏi của bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Ba đội cùng trồng cây: đội Một trồng 60 cây, đội Hai trồng hơn đội Một 20 cây, đội Ba trồng ít hơn đội Hai 10 cây. Làm sao biết cả ba đội trồng được bao nhiêu cây? 🌳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bài toán có ba bước tính",
            explanation:
              "Khi bài toán cho mối liên hệ giữa nhiều đối tượng, bé giải theo từng bước: tính đại lượng chưa biết thứ nhất, rồi đại lượng thứ hai, cuối cùng mới tính câu hỏi của đề. Mỗi bước là một phép tính có lời giải và đơn vị.",
            points: [
              "Bước 1: tìm số cây của đội Hai (nhiều hơn 20 cây).",
              "Bước 2: tìm số cây của đội Ba (ít hơn đội Hai 10 cây).",
              "Bước 3: tìm tổng số cây của cả ba đội.",
            ],
            rule: "Đọc đề để biết ai hơn ai — rồi tính lần lượt theo đúng thứ tự đề cho.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tóm tắt và giải bài toán ba đội trồng cây",
            table: {
              headers: ["Đối tượng", "Cách tính", "Kết quả"],
              rows: [
                ["Đội Một", "đề đã cho", "60 cây"],
                ["Đội Hai", "60 + 20", "80 cây"],
                ["Đội Ba", "80 − 10", "70 cây"],
                ["Cả ba đội", "60 + 80 + 70", "210 cây"],
              ],
              label: "Ba bước tính → một đáp số",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 60,
              right: 80,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 60 + 80\nhàng đơn vị 0 + 0 = 0, viết 0\nhàng chục 6 + 8 = 14, viết 4 nhớ 1\ncòn nhớ 1 ở hàng cao hơn, viết 1\nVậy 60 + 80 = 140."
          }
        },
        {
          type: "quiz",
          content: {
            question: "35 + 81 bằng bao nhiêu?",
            options: [16, 115, 116, 117],
            answer: 116,
            mascotHint: "hàng đơn vị 5 + 1 = 6, viết 6. Kết quả 116."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Cả ba đội trồng được bao nhiêu cây?",
            options: ["140 cây", "210 cây", "200 cây", "150 cây"],
            answer: "210 cây",
            mascotHint: "60 + 80 = 140; 140 + 70 = 210 (cây).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Mai mua 5 quyển vở, mỗi quyển 8 000 đồng và 2 hộp bút chì màu, mỗi hộp 25 000 đồng",
            table: {
              headers: ["Việc tính", "Phép tính", "Kết quả"],
              rows: [
                ["Tiền 5 quyển vở", "5 × 8 000", "40 000 đồng"],
                ["Tiền 2 hộp bút", "2 × 25 000", "50 000 đồng"],
                ["Mai phải trả tất cả", "40 000 + 50 000", "90 000 đồng"],
              ],
              label: "Tính từng nhóm rồi cộng lại",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đàn vịt nhà bác Đào có 1 200 con, nhà bác Mận ít hơn 300 con, nhà bác Cúc nhiều hơn nhà bác Đào 500 con. Cả ba nhà có bao nhiêu con vịt?",
            options: ["3 800 con", "3 500 con", "4 000 con", "2 900 con"],
            answer: "3 800 con",
            mascotHint:
              "Bác Mận: 1 200 − 300 = 900; bác Cúc: 1 200 + 500 = 1 700. Cả ba: 1 200 + 900 + 1 700 = 3 800 (con).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Thùng có 120 ℓ nước mắm. Lần đầu bán 25 ℓ, lần thứ hai bán gấp đôi lần đầu, lần thứ ba bán 35 ℓ. Trong thùng còn lại bao nhiêu lít?",
            options: ["10 ℓ", "35 ℓ", "45 ℓ", "60 ℓ"],
            answer: "10 ℓ",
            mascotHint:
              "Lần hai: 25 × 2 = 50 (ℓ). Đã bán: 25 + 50 + 35 = 110 (ℓ). Còn lại: 120 − 110 = 10 (ℓ).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Bài toán nhiều bước: tìm từng phần theo thứ tự đề cho.",
              "Mỗi bước viết một phép tính kèm lời giải và đơn vị.",
              "Bước cuối mới trả lời câu hỏi của đề bài.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c1-l6",
      title: "Bài 6: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập tổng hợp: số chẵn số lẻ, so sánh và làm tròn số, đặt tính rồi tính, giải toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Hôm nay chúng mình cùng nhau ôn lại tất cả những gì đã học trong Chủ đề 1 nhé! Rô-bốt đã chuẩn bị một loạt thử thách cho bé đấy. 🤖",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cho bốn số: 65 237 · 63 794 · 66 053 · 59 872",
            table: {
              headers: ["Số", "Chẵn hay lẻ?", "Chữ số tận cùng"],
              rows: [
                [65237, "lẻ", 7],
                [63794, "chẵn", 4],
                [66053, "lẻ", 3],
                [59872, "chẵn", 2],
              ],
              label: "Thứ tự từ bé đến lớn: 59 872 · 63 794 · 65 237 · 66 053",
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
            question: "Trong bốn số trên, số lớn nhất là số nào?",
            options: ["65 237", "63 794", "66 053", "59 872"],
            answer: "66 053",
            mascotHint:
              "So hàng chục nghìn: 5 < 6. Ba số còn lại cùng 6 chục nghìn, so hàng nghìn: 5 < 6 < 6, rồi so hàng trăm: 0 < 2 ⇒ 66 053 lớn nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm tròn số bé nhất trong bốn số trên đến hàng chục ta được:",
            options: ["59 870", "59 800", "59 900", "60 000"],
            answer: "59 870",
            mascotHint:
              "Số bé nhất là 59 872. Làm tròn đến hàng chục: chữ số hàng đơn vị là 2 (< 5) nên giữ nguyên 59 870.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn 66 053 đến hàng chục nghìn ta được:",
            options: ["60 000", "66 000", "70 000", "65 000"],
            answer: "70 000",
            mascotHint:
              "Nhìn chữ số hàng nghìn là 6 (≥ 5) nên tăng hàng chục nghìn thêm 1: 60 000 → 70 000.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 43 652 : 7",
            cotTinh: { left: 43652, right: 7, sign: ":" },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hiệu của 63 758 và 53 643 là bao nhiêu?",
            options: ["10 115", "10 015", "11 115", "9 115"],
            answer: "10 115",
            mascotHint:
              "Trừ lần lượt từ phải sang trái: 8 − 3 = 5; 5 − 4 = 1; 7 − 6 = 1; 3 − 3 = 0; 6 − 5 = 1 ⇒ 10 115.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một trận bóng đá có 37 636 khán giả, trong đó 9 273 khán giả nữ. Số khán giả nam nhiều hơn số khán giả nữ bao nhiêu người?",
            options: [
              "19 090 người",
              "28 363 người",
              "18 090 người",
              "19 000 người",
            ],
            answer: "19 090 người",
            mascotHint:
              "Khán giả nam: 37 636 − 9 273 = 28 363 (người). Nam hơn nữ: 28 363 − 9 273 = 19 090 (người).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhìn chữ số tận cùng để biết số chẵn hay số lẻ.",
              "So sánh số: so từ hàng lớn nhất trở xuống.",
              "Làm tròn: nhìn chữ số ngay bên phải hàng cần làm tròn, từ 5 trở lên thì thêm 1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
