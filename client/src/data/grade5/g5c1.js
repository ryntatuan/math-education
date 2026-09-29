export const g5c1 = {
  id: "g5-c1",
  name: "Chủ đề 1: Ôn tập và bổ sung",
  description:
    "Ôn tập số tự nhiên, các phép tính, phân số; phân số thập phân, hỗn số; cộng trừ hai phân số; ôn tập hình học và đo lường",
  icon: "🔄",
  color: "#6366f1",
  totalLessons: 9,
  lessons: [
    {
      id: "g5-c1-l1",
      title: "Bài 1: Ôn tập số tự nhiên",
      type: "learn",
      description:
        "Ôn tập đọc, viết, so sánh số tự nhiên và cấu tạo thập phân của số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Lên Lớp 5 rồi, chúng mình ôn lại các số thật lớn nhé! Ví dụ dân số Việt Nam năm 2023 khoảng 100 300 000 người. 🇻🇳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số tự nhiên",
            explanation:
              "Mỗi số tự nhiên gồm các hàng: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu, chục triệu… Ta đọc và viết số theo các lớp: lớp đơn vị, lớp nghìn, lớp triệu.",
            points: [
              "Viết số thành tổng các hàng: 45 678 = 40 000 + 5 000 + 600 + 70 + 8.",
              "So sánh số: số nào nhiều chữ số hơn thì lớn hơn.",
              "Trong dãy số tự nhiên, hai số liên tiếp hơn kém nhau 1 đơn vị.",
            ],
            rule: "Không có số tự nhiên lớn nhất; số bé nhất là 0.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Lớp và hàng của số 517 906 384",
            placeValue: {
              digits: "517906384",
              label: "Lớp triệu: 517 · Lớp nghìn: 906 · Lớp đơn vị: 384",
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
            question: "Viết số 45 678 thành tổng các hàng:",
            options: [
              "40 000 + 5 000 + 600 + 70 + 8",
              "40 000 + 500 + 600 + 70 + 8",
              "4 000 + 5 000 + 600 + 70 + 8",
              "40 000 + 5 000 + 60 + 70 + 8",
            ],
            answer: "40 000 + 5 000 + 600 + 70 + 8",
            mascotHint:
              "45 678 gồm 4 chục nghìn, 5 nghìn, 6 trăm, 7 chục và 8 đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 999 999 là số nào?",
            options: ["1 000 000", "999 998", "1 000 001", "100 000"],
            answer: "1 000 000",
            mascotHint: "Thêm 1 đơn vị vào 999 999 ta được 1 000 000.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc, viết số theo lớp và hàng.",
              "Viết số thành tổng các hàng.",
              "So sánh số và tìm số liền trước, liền sau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l2",
      title: "Bài 2: Ôn tập các phép tính với số tự nhiên",
      type: "learn",
      description:
        "Ôn tập cộng, trừ, nhân, chia số tự nhiên và vận dụng tính chất để tính thuận tiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một cửa hàng buổi sáng bán 1 250 hộp sữa, buổi chiều bán ít hơn buổi sáng 320 hộp. Cả hai buổi bán được bao nhiêu hộp? 🥛",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn phép tính với số tự nhiên",
            explanation:
              "Ôn lại cách đặt tính rồi tính với cộng, trừ, nhân, chia; nắm thứ tự thực hiện phép tính trong biểu thức và các tính chất giao hoán, kết hợp, phân phối để tính thuận tiện.",
            points: [
              "Biểu thức có ngoặc: tính trong ngoặc trước.",
              "Nhân, chia trước; cộng, trừ sau.",
              "Tính chất phân phối: a × (b + c) = a × b + a × c.",
            ],
            rule: "Thử lại để kiểm tra kết quả phép tính.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Kết quả một số phép tính",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["1 250 + 930", "2 180"],
                ["1 250 − 320", "930"],
                ["125 × 8", "1 000"],
                ["2 400 : 60", 40],
              ],
              label: "Chọn cách tính thuận tiện: 125 × 8 = 1 000",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 100,
              right: 7,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 100 × 7\nhàng đơn vị 0 × 7 = 0, viết 0\nhàng chục 0 × 7 = 0, viết 0\nhàng trăm 1 × 7 = 7, viết 7\nVậy 100 × 7 = 700."
          }
        },
        {
          type: "quiz",
          content: {
            question: "262 × 3 bằng bao nhiêu?",
            options: [686, 785, 786, 787],
            answer: 786,
            mascotHint: "hàng đơn vị 2 × 3 = 6, viết 6. Kết quả 786."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính bằng cách thuận tiện: 25 × 4 × 7 = ?",
            options: ["700", "70", "7 000", "175"],
            answer: "700",
            mascotHint: "(25 × 4) × 7 = 100 × 7 = 700.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Buổi sáng bán 1 250 hộp sữa, buổi chiều bán ít hơn 320 hộp. Cả hai buổi bán được bao nhiêu hộp?",
            options: ["2 180 hộp", "1 570 hộp", "930 hộp", "2 250 hộp"],
            answer: "2 180 hộp",
            mascotHint:
              "Buổi chiều: 1 250 − 320 = 930 (hộp). Cả hai buổi: 1 250 + 930 = 2 180 (hộp).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính đúng cột khi cộng, trừ, nhân, chia.",
              "Tính theo thứ tự: ngoặc → nhân chia → cộng trừ.",
              "Dùng tính chất để tính thuận tiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l3",
      title: "Bài 3: Ôn tập phân số",
      type: "learn",
      description:
        "Ôn tập khái niệm phân số, rút gọn, quy đồng và so sánh phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo đọc được 3/5 quyển truyện. Phân số 3/5 cho biết điều gì nhỉ? Cùng ôn lại kiến thức phân số nào! 🍕",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Phân số",
            explanation:
              "Phân số gồm tử số và mẫu số. Ta rút gọn phân số bằng cách chia cả tử và mẫu cho cùng một số khác 0, quy đồng mẫu số để đưa hai phân số về cùng mẫu, và so sánh phân số sau khi quy đồng.",
            points: [
              "Rút gọn: 18/24 = 3/4.",
              "Quy đồng: 1/2 và 2/3 → 3/6 và 4/6.",
              "So sánh: 3/6 < 4/6 nên 1/2 < 2/3.",
            ],
            rule: "Tử số bé hơn mẫu số ⇒ phân số bé hơn 1.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập phân số",
            table: {
              headers: ["Nội dung", "Ví dụ"],
              rows: [
                ["Khái niệm", "3/5 đọc là ba phần năm"],
                ["Rút gọn", "18/24 = 3/4"],
                ["Quy đồng", "1/2 và 2/3 → 3/6 và 4/6"],
                ["So sánh", "2/3 > 1/2"],
              ],
              label:
                "Phân số tối giản: tử và mẫu không cùng chia hết cho số nào lớn hơn 1",
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
            question: "Rút gọn phân số 18/24 ta được phân số tối giản nào?",
            options: ["3/4", "2/3", "9/12", "6/8"],
            answer: "3/4",
            mascotHint: "Chia cả tử và mẫu cho 6: (18 : 6)/(24 : 6) = 3/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh hai phân số 1/2 và 2/3:",
            options: [
              "1/2 < 2/3",
              "1/2 > 2/3",
              "1/2 = 2/3",
              "Không so sánh được",
            ],
            answer: "1/2 < 2/3",
            mascotHint: "Quy đồng: 1/2 = 3/6; 2/3 = 4/6; 3/6 < 4/6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số gồm tử số và mẫu số.",
              "Rút gọn đến phân số tối giản.",
              "Quy đồng rồi so sánh phân số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l4",
      title: "Bài 4: Phân số thập phân",
      type: "learn",
      description: "Nhận biết phân số thập phân: mẫu số là 10, 100, 1 000…",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "1/10, 3/100, 25/1000… có mẫu số là 10, 100, 1 000. Những phân số này có tên riêng: phân số thập phân! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phân số thập phân",
            explanation:
              "Các phân số có mẫu số là 10, 100, 1 000… được gọi là phân số thập phân. Một số phân số có thể chuyển thành phân số thập phân bằng cách nhân (hoặc chia) cả tử và mẫu số.",
            points: [
              "3/10; 5/100; 17/1000 là phân số thập phân.",
              "1/2 = 5/10 (nhân cả tử và mẫu với 5).",
              "2/5 = 4/10; 1/4 = 25/100.",
            ],
            rule: "Mẫu số của phân số thập phân là 10, 100, 1 000…",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chuyển thành phân số thập phân",
            table: {
              headers: [
                "Phân số",
                "Nhân cả tử và mẫu với",
                "Phân số thập phân",
              ],
              rows: [
                ["1/2", 5, "5/10"],
                ["2/5", 2, "4/10"],
                ["1/4", 25, "25/100"],
                ["8/25", 4, "32/100"],
              ],
              label: "Tử và mẫu đều được nhân với cùng một số",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài bảng nhân – bảng chia – phân số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Xác định đề hỏi nhân hay chia (chia luôn tra ngược bảng nhân).",
              "Bước 2 — Tách số thành hàng chục và hàng đơn vị rồi tính từng phần.",
              "Bước 3 — Cộng các phần lại, nhớ cộng số nhớ khi có.",
              "Bước 4 — Thử lại bằng phép ngược (nhân ↔ chia) hoặc bằng tổng."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Nhân với 10", "thêm một chữ số 0"],
                ["Chia hết", "số dư bằng 0"],
                ["Phân số", "mẫu số chia đều thành mấy phần, tử số lấy mấy phần"]
              ]
            },
            text: "Bảng nhớ nhanh — bảng nhân – bảng chia – phân số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Muốn tính 24 : 6, bé dựa vào đâu cho nhanh?",
            options: [
              "Tra ngược bảng nhân 6",
              "Đếm lùi 24 lần",
              "Cộng 6 vào 24",
              "Bấm máy tính"
            ],
            answer: "Tra ngược bảng nhân 6",
            mascotHint: "Vì 6 × 4 = 24 nên 24 : 6 = 4 — tra bảng nhân bao giờ cũng nhanh hơn đếm."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Phân số nào sau đây là phân số thập phân?",
            options: ["7/100", "7/25", "7/12", "7/8"],
            answer: "7/100",
            mascotHint: "Mẫu số là 100 nên 7/100 là phân số thập phân.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chuyển phân số 2/5 thành phân số thập phân:",
            options: ["4/10", "2/10", "5/10", "4/5"],
            answer: "4/10",
            mascotHint: "2/5 = (2 × 2)/(5 × 2) = 4/10.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số thập phân có mẫu số 10, 100, 1 000 hoặc lớn hơn",
              "Nhân (chia) cả tử và mẫu để có mẫu số 10, 100, 1 000",
              "Phân số thập phân sẽ học tiếp thành số thập phân.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l5",
      title: "Bài 5: Ôn tập các phép tính với phân số",
      type: "learn",
      description:
        "Ôn tập cộng, trừ, nhân, chia phân số và tìm phân số của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt làm được 3/8 bài tập buổi sáng và 2/8 bài tập buổi chiều. Vậy cả ngày bạn ấy làm được bao nhiêu phần bài tập? 📝",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn phép tính với phân số",
            explanation:
              "Cộng, trừ hai phân số cùng mẫu thì cộng (trừ) tử số và giữ mẫu số; khác mẫu thì quy đồng trước. Nhân hai phân số: tử nhân tử, mẫu nhân mẫu. Chia hai phân số: nhân với phân số đảo ngược.",
            points: [
              "3/8 + 2/8 = 5/8.",
              "2/3 × 3/4 = 6/12 = 1/2.",
              "3/4 : 1/2 = 3/4 × 2/1 = 3/2.",
            ],
            rule: "Tìm phân số của một số: nhân số đó với phân số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập bốn phép tính với phân số",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["3/8 + 2/8", "5/8"],
                ["5/6 − 1/3", "1/2"],
                ["2/3 × 3/4", "1/2"],
                ["3/4 : 1/2", "3/2"],
                ["2/5 của 30", 12],
              ],
              label: "Rút gọn kết quả về phân số tối giản",
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
            question: "Tính: 2/3 × 3/4 = ?",
            options: ["1/2", "6/7", "2/4", "3/4"],
            answer: "1/2",
            mascotHint: "(2 × 3)/(3 × 4) = 6/12 = 1/2.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "2/5 của 30 kg là bao nhiêu ki-lô-gam?",
            options: ["12 kg", "15 kg", "6 kg", "75 kg"],
            answer: "12 kg",
            mascotHint: "30 : 5 = 6 rồi 6 × 2 = 12 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cộng, trừ phải cùng mẫu số.",
              "Nhân: tử nhân tử, mẫu nhân mẫu.",
              "Chia: nhân với phân số đảo ngược.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l6",
      title: "Bài 6: Cộng, trừ hai phân số",
      type: "learn",
      description:
        "Cộng, trừ hai phân số khác mẫu số và giải bài toán có lời văn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một tấm vải dài 7/10 m, người ta cắt đi 2/5 m. Còn lại bao nhiêu mét vải? Phải quy đồng mẫu số trước đã! ✂️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng, trừ hai phân số khác mẫu số",
            explanation:
              "Muốn cộng (trừ) hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số đó rồi cộng (trừ) hai phân số cùng mẫu số vừa tìm được.",
            points: [
              "2/3 + 1/4 = 8/12 + 3/12 = 11/12.",
              "5/6 − 1/2 = 5/6 − 3/6 = 2/6 = 1/3.",
              "Kết quả cần rút gọn về phân số tối giản.",
            ],
            rule: "Quy đồng mẫu số rồi mới cộng hoặc trừ tử số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cộng, trừ hai phân số khác mẫu số",
            table: {
              headers: ["Phép tính", "Quy đồng", "Kết quả"],
              rows: [
                ["2/3 + 1/4", "8/12 + 3/12", "11/12"],
                ["5/6 − 1/2", "5/6 − 3/6", "1/3"],
                ["7/10 − 2/5", "7/10 − 4/10", "3/10"],
                ["1/2 + 1/3", "3/6 + 2/6", "5/6"],
              ],
              label: "Kiểm tra kết quả bằng phép tính ngược",
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
            question: "Tính: 2/3 + 1/4 = ?",
            options: ["11/12", "3/7", "3/12", "2/12"],
            answer: "11/12",
            mascotHint: "2/3 = 8/12; 1/4 = 3/12; 8/12 + 3/12 = 11/12.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tấm vải dài 7/10 m, cắt đi 2/5 m. Còn lại bao nhiêu mét?",
            options: ["3/10 m", "5/10 m", "5/5 m", "9/10 m"],
            answer: "3/10 m",
            mascotHint: "2/5 = 4/10; 7/10 − 4/10 = 3/10 (m).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Khác mẫu số thì quy đồng trước.",
              "Cộng (trừ) tử số, giữ mẫu số chung.",
              "Rút gọn và ghi đơn vị đo cho đúng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l7",
      title: "Bài 7: Hỗn số",
      type: "learn",
      description:
        "Nhận biết hỗn số, đọc viết hỗn số và chuyển hỗn số thành phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo ăn hết 2 chiếc bánh và thêm 3/4 chiếc nữa. Viết là 2 3/4 và đọc là “hai và ba phần tư”. Đó là hỗn số! 🥐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hỗn số",
            explanation:
              "Hỗn số gồm hai phần: phần nguyên và phần phân số (phần phân số luôn bé hơn 1). Muốn chuyển hỗn số thành phân số, ta lấy phần nguyên nhân với mẫu số rồi cộng với tử số, giữ nguyên mẫu số.",
            points: [
              "2 3/4: phần nguyên 2, phần phân số 3/4.",
              "Chuyển: 2 3/4 = (2 × 4 + 3)/4 = 11/4.",
              "So sánh: hỗn số có phần nguyên lớn hơn thì lớn hơn.",
            ],
            rule: "Chuyển hỗn số: phần nguyên × mẫu số + tử số, giữ mẫu số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chuyển hỗn số thành phân số",
            table: {
              headers: ["Hỗn số", "Tính", "Phân số"],
              rows: [
                ["2 3/4", "(2 × 4 + 3)/4", "11/4"],
                ["1 1/2", "(1 × 2 + 1)/2", "3/2"],
                ["3 2/5", "(3 × 5 + 2)/5", "17/5"],
              ],
              label: "Phần phân số của hỗn số luôn bé hơn 1",
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
            question: "Chuyển hỗn số 2 3/4 thành phân số:",
            options: ["11/4", "5/4", "6/4", "8/4"],
            answer: "11/4",
            mascotHint: "(2 × 4 + 3)/4 = (8 + 3)/4 = 11/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hỗn số 1 1/2 gồm những phần nào?",
            options: [
              "Phần nguyên 1 và phân số 1/2",
              "Phần nguyên 1/2 và phân số 1",
              "Hai phần nguyên",
              "Một phân số lớn hơn 1",
            ],
            answer: "Phần nguyên 1 và phân số 1/2",
            mascotHint: "Hỗn số có phần nguyên và phần phân số bé hơn 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hỗn số = phần nguyên + phần phân số (bé hơn 1).",
              "Chuyển hỗn số thành phân số theo quy tắc.",
              "Đọc hỗn số: “phần nguyên và … phần …”.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l8",
      title: "Bài 8: Ôn tập hình học và đo lường",
      type: "learn",
      description:
        "Ôn tập các hình phẳng đã học, độ dài, khối lượng, diện tích",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một khu vườn hình chữ nhật có chiều dài 25 m, chiều rộng 18 m. Chu vi và diện tích khu vườn đó là bao nhiêu? 🌳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Hình học và đo lường",
            explanation:
              "Ôn tập các hình: hình vuông, hình chữ nhật, hình bình hành, hình thoi; và các bảng đơn vị đo độ dài, khối lượng, diện tích đã học.",
            points: [
              "Chu vi hình chữ nhật = (dài + rộng) × 2.",
              "Diện tích hình chữ nhật = dài × rộng.",
              "1 m² = 100 dm² = 10 000 cm².",
            ],
            rule: "Diện tích hình vuông = cạnh × cạnh.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Công thức hình phẳng đã học",
            table: {
              headers: ["Hình", "Chu vi", "Diện tích"],
              rows: [
                ["Hình vuông", "cạnh × 4", "cạnh × cạnh"],
                ["Hình chữ nhật", "(dài + rộng) × 2", "dài × rộng"],
                ["Hình bình hành", "tổng bốn cạnh", "đáy × chiều cao"],
                ["Hình thoi", "tổng bốn cạnh", "(đường chéo × đường chéo) : 2"],
              ],
              label: "Đơn vị diện tích thường dùng: cm², dm², m²",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 43,
              right: 2,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 43 × 2\nhàng đơn vị 3 × 2 = 6, viết 6\nhàng chục 4 × 2 = 8, viết 8\nVậy 43 × 2 = 86."
          }
        },
        {
          type: "quiz",
          content: {
            question: "21 × 4 bằng bao nhiêu?",
            options: [83, 84, 85, 86],
            answer: 84,
            mascotHint: "hàng đơn vị 1 × 4 = 4, viết 4. Kết quả 84."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Khu vườn hình chữ nhật dài 25 m, rộng 18 m. Chu vi khu vườn là:",
            options: ["86 m", "43 m", "450 m", "172 m"],
            answer: "86 m",
            mascotHint: "(25 + 18) × 2 = 43 × 2 = 86 (m).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Diện tích khu vườn dài 25 m, rộng 18 m là:",
            options: ["450 m²", "86 m²", "225 m²", "900 m²"],
            answer: "450 m²",
            mascotHint: "25 × 18 = 450 (m²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thuộc công thức chu vi, diện tích các hình.",
              "Đổi đơn vị đo trước khi tính.",
              "Ghi đúng đơn vị: m, m², kg…",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c1-l9",
      title: "Bài 9: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập tổng hợp số tự nhiên, phân số, hỗn số và hình học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn lại tất cả kiến thức Chủ đề 1 trước khi bước vào thế giới số thập phân! 🚀",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp Chủ đề 1",
            table: {
              headers: ["Nội dung", "Cách làm"],
              rows: [
                ["Số tự nhiên", "đọc, viết theo lớp và hàng"],
                ["Bốn phép tính", "đặt tính, tính thuận tiện"],
                ["Phân số", "rút gọn, quy đồng, so sánh"],
                ["Phân số thập phân", "mẫu số 10, 100, 1 000"],
                ["Hỗn số", "phần nguyên + phần phân số"],
              ],
              label: "Nắm chắc để học tốt số thập phân",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 12,
              right: 4,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 12 × 4\nhàng đơn vị 2 × 4 = 8, viết 8\nhàng chục 1 × 4 = 4, viết 4\nVậy 12 × 4 = 48."
          }
        },
        {
          type: "quiz",
          content: {
            question: "32 × 2 bằng bao nhiêu?",
            options: [63, 64, 65, 66],
            answer: 64,
            mascotHint: "hàng đơn vị 2 × 2 = 4, viết 4. Kết quả 64."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 5/6 − 1/2 = ?",
            options: ["1/3", "4/4", "2/3", "1/2"],
            answer: "1/3",
            mascotHint: "1/2 = 3/6; 5/6 − 3/6 = 2/6 = 1/3.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chuyển 1 1/2 thành phân số:",
            options: ["3/2", "2/2", "1/2", "4/2"],
            answer: "3/2",
            mascotHint: "(1 × 2 + 1)/2 = 3/2.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chu vi hình vuông có cạnh 12 cm là:",
            options: ["48 cm", "24 cm", "144 cm", "36 cm"],
            answer: "48 cm",
            mascotHint: "Chu vi hình vuông = cạnh × 4 = 12 × 4 = 48 (cm).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số tự nhiên: đọc, viết, tính toán.",
              "Phân số và hỗn số: rút gọn, so sánh, chuyển đổi.",
              "Hình học: chu vi, diện tích.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
