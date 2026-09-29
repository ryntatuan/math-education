export const g4c13 = {
  id: "g4-c13",
  name: "Chủ đề 13: Ôn tập cuối năm",
  description:
    "Ôn tập số tự nhiên, các phép tính, phân số, hình học, đo lường và thống kê – xác suất",
  icon: "🎓",
  color: "#22c55e",
  totalLessons: 7,
  lessons: [
    {
      id: "g4-c13-l1",
      title: "Bài 67: Ôn tập số tự nhiên",
      type: "learn",
      description:
        "Đọc, viết, so sánh, làm tròn số tự nhiên và cấu tạo thập phân của số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hết một năm học rồi, cùng ôn lại các số lớn nhé! Ví dụ số dân Việt Nam lúc 0 giờ ngày 1 tháng 4 năm 2019 là 96 208 984 người. 🇻🇳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số tự nhiên",
            explanation:
              "Mỗi số tự nhiên gồm các hàng: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu… Ta đọc, viết số theo các lớp và có thể viết số thành tổng các hàng.",
            points: [
              "6 945 = 6 000 + 900 + 40 + 5.",
              "35 107 đọc là “ba mươi lăm nghìn một trăm linh bảy”.",
              "Trong dãy số tự nhiên: hai số liên tiếp hơn kém nhau 1 đơn vị; hai số chẵn (hoặc lẻ) liên tiếp hơn kém nhau 2 đơn vị.",
            ],
            rule: "Không có số tự nhiên lớn nhất.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết số thành tổng",
            table: {
              headers: ["Số", "Viết thành tổng"],
              rows: [
                ["6 945", "6 000 + 900 + 40 + 5"],
                ["45 086", "40 000 + 5 000 + 80 + 6"],
                ["794 320", "700 000 + 90 000 + 4 000 + 300 + 20"],
                ["5 602 904", "5 000 000 + 600 000 + 2 000 + 900 + 4"],
              ],
              label: "Mỗi hàng góp một số hạng vào tổng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Làm tròn số dân 96 208 984 người",
            table: {
              headers: ["Làm tròn đến", "Kết quả"],
              rows: [
                ["hàng nghìn", "96 209 000"],
                ["hàng chục nghìn", "96 210 000"],
                ["hàng trăm nghìn", "96 200 000"],
              ],
              label:
                "Nhìn chữ số liền sau hàng làm tròn: từ 5 trở lên thì thêm 1",
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
            question: "Viết số 6 945 thành tổng các hàng:",
            options: [
              "6 000 + 900 + 40 + 5",
              "6 000 + 90 + 40 + 5",
              "600 + 900 + 40 + 5",
              "6 000 + 900 + 400 + 5",
            ],
            answer: "6 000 + 900 + 40 + 5",
            mascotHint: "6 945 gồm 6 nghìn, 9 trăm, 4 chục và 5 đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Số học sinh bốn trường là 2 065; 1 892; 2 131; 1 868. Số học sinh được sắp xếp từ bé đến lớn là:",
            options: [
              "1 868; 1 892; 2 065; 2 131",
              "1 892; 1 868; 2 065; 2 131",
              "2 131; 2 065; 1 892; 1 868",
              "2 065; 2 131; 1 868; 1 892",
            ],
            answer: "1 868; 1 892; 2 065; 2 131",
            mascotHint: "So sánh từng hàng: 1 868 < 1 892 < 2 065 < 2 131.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc, viết số theo hàng và lớp.",
              "Viết số thành tổng các hàng.",
              "Làm tròn số và so sánh số tự nhiên.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l2",
      title: "Bài 68: Ôn tập các phép tính với số tự nhiên",
      type: "learn",
      description:
        "Ôn tập cộng, trừ, nhân, chia và vận dụng tính chất để tính thuận tiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Chú Hùng đi công tác quãng đường 300 km. Cứ 100 km xe tiêu hao 10 lít xăng, giá 1 lít xăng 23 400 đồng. Cần bao nhiêu tiền mua xăng nhỉ? 🚗",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các phép tính với số tự nhiên",
            explanation:
              "Ôn lại đặt tính rồi tính với cộng, trừ, nhân, chia; thứ tự thực hiện phép tính trong biểu thức; và các tính chất giao hoán, kết hợp, phân phối để tính thuận tiện.",
            points: [
              "Biểu thức có ngoặc: tính trong ngoặc trước.",
              "Nhân, chia trước; cộng, trừ sau.",
              "Dùng tính chất để nhóm số: 3 508 × 25 × 4 = 3 508 × 100 = 350 800.",
            ],
            rule: "467 × 46 + 467 × 54 = 467 × (46 + 54) = 467 × 100 = 46 700.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Kết quả một số phép tính",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["643 709 + 405 642", "1 049 351"],
                ["1 657 480 − 821 730", "835 750"],
                ["3 214 × 56", "179 984"],
                ["231 438 : 34", "6 807"],
                ["8 369 + 305 × 38", "19 959"],
              ],
              label: "Kiểm tra lại bằng ước lượng và phép tính ngược",
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
            question: "Tính bằng cách thuận tiện: 467 × 46 + 467 × 54 = ?",
            options: ["46 700", "4 670", "467 000", "46 070"],
            answer: "46 700",
            mascotHint: "467 × (46 + 54) = 467 × 100 = 46 700.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai xe chở tất cả 39 000 lít nước, xe thứ nhất chở nhiều hơn xe thứ hai 3 000 lít. Xe thứ nhất chở bao nhiêu lít?",
            options: ["21 000 lít", "18 000 lít", "36 000 lít", "19 500 lít"],
            answer: "21 000 lít",
            mascotHint:
              "Số lớn = (tổng + hiệu) : 2 = (39 000 + 3 000) : 2 = 21 000 (lít).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chú Hùng đi 300 km, cứ 100 km hết 10 lít xăng, giá 1 lít 23 400 đồng. Số tiền mua xăng là:",
            options: [
              "702 000 đồng",
              "70 200 đồng",
              "7 020 000 đồng",
              "234 000 đồng",
            ],
            answer: "702 000 đồng",
            mascotHint:
              "300 km gấp 3 lần 100 km nên cần 30 lít; 30 × 23 400 = 702 000 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thực hiện đúng thứ tự phép tính.",
              "Dùng tính chất phép tính để tính thuận tiện.",
              "Bài toán tổng – hiệu: số lớn = (tổng + hiệu) : 2.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l3",
      title: "Bài 69: Ôn tập phân số",
      type: "learn",
      description:
        "Ôn tập khái niệm phân số, rút gọn, quy đồng và so sánh phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cùng điểm lại kiến thức phân số: đọc – viết, rút gọn, quy đồng và so sánh. Chỉ cần nhớ vài quy tắc là làm được hết! 🍕",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Phân số",
            explanation:
              "Phân số gồm tử số và mẫu số. Tính chất cơ bản của phân số giúp ta rút gọn và quy đồng mẫu số. Muốn so sánh hai phân số khác mẫu số, ta quy đồng rồi so sánh tử số.",
            points: [
              "Rút gọn: chia cả tử và mẫu cho cùng một số khác 0.",
              "Quy đồng: đưa hai phân số về cùng mẫu số chung.",
              "So sánh với 1: tử bé hơn mẫu ⇒ bé hơn 1.",
            ],
            rule: "Phân số tối giản: tử và mẫu không cùng chia hết cho số nào lớn hơn 1.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập phân số",
            table: {
              headers: ["Nội dung", "Ví dụ"],
              rows: [
                ["Rút gọn", "18/24 = 3/4"],
                ["Quy đồng", "1/2 và 2/3 → 3/6 và 4/6"],
                ["So sánh cùng mẫu", "5/8 > 3/8"],
                ["So sánh khác mẫu", "3/4 > 5/8 vì 6/8 > 5/8"],
              ],
              label: "Luôn rút gọn kết quả trước khi kết luận",
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
            question: "Rút gọn phân số 18/24 ta được:",
            options: ["3/4", "2/3", "9/12", "6/8"],
            answer: "3/4",
            mascotHint: "Chia cả tử và mẫu cho 6: (18 : 6)/(24 : 6) = 3/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số nào bé hơn 1?",
            options: ["3/4", "4/3", "9/8", "7/5"],
            answer: "3/4",
            mascotHint: "Tử số bé hơn mẫu số nên phân số bé hơn 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nắm chắc khái niệm phân số.",
              "Rút gọn, quy đồng thành thạo.",
              "So sánh phân số cùng mẫu và khác mẫu.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l4",
      title: "Bài 70: Ôn tập các phép tính với phân số",
      type: "learn",
      description:
        "Ôn tập cộng, trừ, nhân, chia phân số và tìm phân số của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bốn phép tính với phân số cũng có “mẹo” riêng: cộng trừ thì phải cùng mẫu số, nhân chia thì nhân thẳng hàng. 🧮",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn phép tính với phân số",
            explanation:
              "Cộng, trừ phân số: cùng mẫu số thì cộng (trừ) tử số; khác mẫu số thì quy đồng trước. Nhân phân số: tử nhân tử, mẫu nhân mẫu. Chia phân số: nhân với phân số đảo ngược.",
            points: [
              "2/5 + 1/5 = 3/5 và 3/4 − 1/2 = 1/4.",
              "2/3 × 4/5 = 8/15.",
              "3/4 : 2/5 = 15/8.",
            ],
            rule: "Tìm phân số của một số: chia cho mẫu số rồi nhân với tử số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập bốn phép tính với phân số",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2/5 + 1/5", "3/5"],
                ["3/4 − 1/2", "1/4"],
                ["2/3 × 4/5", "8/15"],
                ["3/4 : 2/5", "15/8"],
                ["3/5 của 20", 12],
              ],
              label: "Kết quả luôn rút gọn về phân số tối giản",
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
            question: "Tính: 5/6 : 2/3 = ?",
            options: ["5/4", "4/5", "10/18", "5/9"],
            answer: "5/4",
            mascotHint: "5/6 × 3/2 = 15/12 = 5/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "4/7 của 21 kg là bao nhiêu ki-lô-gam?",
            options: ["12 kg", "21 kg", "7 kg", "84 kg"],
            answer: "12 kg",
            mascotHint: "21 : 7 = 3 rồi 3 × 4 = 12 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cộng, trừ: cùng mẫu số mới cộng, trừ tử số.",
              "Nhân: tử nhân tử, mẫu nhân mẫu.",
              "Chia: nhân với phân số đảo ngược.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l5",
      title: "Bài 71: Ôn tập hình học",
      type: "learn",
      description:
        "Ôn tập góc, hai đường thẳng vuông góc, song song, hình bình hành và hình thoi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Nhìn quanh lớp học: cạnh bàn vuông góc với nhau, hai mép bảng song song, viên gạch hình thoi… Toán học ở khắp nơi! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Hình học Lớp 4",
            explanation:
              "Ôn lại góc nhọn, góc tù, góc bẹt; hai đường thẳng vuông góc và song song; hình bình hành, hình thoi cùng đặc điểm cạnh và góc.",
            points: [
              "Hai đường thẳng vuông góc tạo thành 4 góc vuông chung đỉnh.",
              "Hai đường thẳng song song không bao giờ cắt nhau.",
              "Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.",
              "Hình thoi có bốn cạnh bằng nhau; hai đường chéo vuông góc với nhau.",
            ],
            rule: "Đếm góc và so sánh độ dài cạnh để nhận biết từng hình.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhận biết các hình đã học",
            table: {
              headers: ["Hình", "Đặc điểm chính"],
              rows: [
                [
                  "Hình chữ nhật",
                  "4 góc vuông, hai cặp cạnh đối song song và bằng nhau",
                ],
                ["Hình bình hành", "hai cặp cạnh đối song song và bằng nhau"],
                ["Hình thoi", "4 cạnh bằng nhau, hai đường chéo vuông góc"],
                ["Đường thẳng song song", "không cắt nhau, cách đều nhau"],
              ],
              label: "Dùng ê-ke kiểm tra góc vuông",
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
            question: "Hình thoi có đặc điểm gì?",
            options: [
              "Bốn cạnh bằng nhau",
              "Có 4 góc vuông",
              "Chỉ có một cặp cạnh song song",
              "Ba cạnh bằng nhau",
            ],
            answer: "Bốn cạnh bằng nhau",
            mascotHint:
              "Hình thoi có 4 cạnh bằng nhau và hai đường chéo vuông góc với nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hai đường thẳng song song thì thế nào?",
            options: [
              "Không bao giờ cắt nhau",
              "Cắt nhau tại 1 điểm",
              "Luôn vuông góc",
              "Tạo 4 góc vuông",
            ],
            answer: "Không bao giờ cắt nhau",
            mascotHint:
              "Hai đường thẳng song song kéo dài mãi cũng không cắt nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân biệt góc nhọn, góc tù, góc bẹt, góc vuông.",
              "Nhận biết hai đường thẳng vuông góc, song song.",
              "Nắm đặc điểm hình bình hành và hình thoi.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l6",
      title: "Bài 72: Ôn tập đo lường",
      type: "learn",
      description:
        "Ôn tập các đơn vị khối lượng, diện tích, thời gian và chuyển đổi đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một tấn bằng mấy yến? Một mét vuông bằng mấy đề-xi-mét vuông? Cùng ôn lại bảng đơn vị đo lường nhé! ⚖️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các đơn vị đo lường",
            explanation:
              "Ôn tập quan hệ giữa các đơn vị đo khối lượng (yến, tạ, tấn), đo diện tích (mm², cm², dm², m²) và đo thời gian (giây, phút, giờ, thế kỉ).",
            points: [
              "1 yến = 10 kg; 1 tạ = 100 kg; 1 tấn = 1 000 kg.",
              "1 m² = 100 dm² = 10 000 cm².",
              "1 thế kỉ = 100 năm; 1 giờ = 60 phút = 3 600 giây.",
            ],
            rule: "Mỗi đơn vị đo diện tích hơn kém nhau 100 lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng chuyển đổi đơn vị",
            table: {
              headers: ["Đổi đơn vị", "Kết quả"],
              rows: [
                ["2 tấn = ? kg", "2 000 kg"],
                ["5 m² = ? dm²", "500 dm²"],
                ["9 dm² = ? cm²", "900 cm²"],
                ["3 giờ = ? phút", 180],
                ["2 thế kỉ = ? năm", 200],
              ],
              label: "Từ đơn vị lớn sang đơn vị bé thì nhân",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 120,
              right: 30,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 120 + 30\nhàng đơn vị 0 + 0 = 0, viết 0\nhàng chục 2 + 3 = 5, viết 5\nhàng trăm 1 + 0 = 1, viết 1\nVậy 120 + 30 = 150."
          }
        },
        {
          type: "quiz",
          content: {
            question: "745 + 53 bằng bao nhiêu?",
            options: [797, 798, 799, 800],
            answer: 798,
            mascotHint: "hàng đơn vị 5 + 3 = 8, viết 8. Kết quả 798."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 tấn = ? kg",
            options: ["3 000 kg", "300 kg", "30 kg", "30 000 kg"],
            answer: "3 000 kg",
            mascotHint: "1 tấn = 1 000 kg nên 3 tấn = 3 000 kg.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "2 giờ 30 phút = ? phút",
            options: ["150 phút", "120 phút", "230 phút", "90 phút"],
            answer: "150 phút",
            mascotHint: "2 giờ = 120 phút; 120 + 30 = 150 (phút).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thuộc quan hệ giữa các đơn vị đo.",
              "Đổi đơn vị lớn sang bé thì nhân.",
              "Đổi đơn vị bé sang lớn thì chia.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c13-l7",
      title: "Bài 73: Ôn tập thống kê và xác suất",
      type: "learn",
      description:
        "Ôn tập dãy số liệu, biểu đồ cột và số lần xuất hiện của một sự kiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn lại cách đọc số liệu và đếm số lần xuất hiện của một sự kiện — hai kĩ năng rất cần khi quan sát thế giới quanh em! 📈",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Thống kê và xác suất",
            explanation:
              "Dãy số liệu cho biết các giá trị ghi lại theo thứ tự quan sát. Biểu đồ cột biểu diễn số liệu bằng độ cao của cột. Bảng kiểm đếm cho biết mỗi sự kiện xuất hiện bao nhiêu lần.",
            points: [
              "Đọc số liệu trên biểu đồ: nhìn độ cao cột so với trục dọc.",
              "Tính trung bình cộng từ số liệu đã có.",
              "So sánh số lần xuất hiện giữa các sự kiện.",
            ],
            rule: "Trung bình cộng = Tổng : số các số hạng.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số cuốn sách bốn lớp đóng góp",
            table: {
              headers: ["Lớp", "4A", "4B", "4C", "4D"],
              rows: [["Số cuốn sách", 40, 55, 60, 45]],
              label: "Lớp 4C đóng góp nhiều nhất; trung bình mỗi lớp 50 cuốn",
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
              "Bốn lớp 4A, 4B, 4C, 4D đóng góp lần lượt 40; 55; 60; 45 cuốn sách. Trung bình mỗi lớp đóng góp bao nhiêu cuốn?",
            options: ["50 cuốn", "60 cuốn", "45 cuốn", "200 cuốn"],
            answer: "50 cuốn",
            mascotHint: "(40 + 55 + 60 + 45) : 4 = 200 : 4 = 50 (cuốn).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lớp nào đóng góp nhiều sách nhất?",
            options: ["Lớp 4C", "Lớp 4B", "Lớp 4A", "Lớp 4D"],
            answer: "Lớp 4C",
            mascotHint: "Số lớn nhất trong dãy 40; 55; 60; 45 là 60 — lớp 4C.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc dãy số liệu và biểu đồ cột.",
              "Tính trung bình cộng khi cần.",
              "Đếm số lần xuất hiện của sự kiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
