export const g5c6 = {
  id: "g5-c6",
  name: "Chủ đề 6: Ôn tập học kì 1",
  description:
    "Ôn tập số thập phân, các phép tính với số thập phân, hình phẳng, diện tích – chu vi và đo lường",
  icon: "📚",
  color: "#a855f7",
  totalLessons: 6,
  lessons: [
    {
      id: "g5-c6-l1",
      title: "Bài 30: Ôn tập số thập phân",
      type: "learn",
      description:
        "Ôn tập đọc viết, so sánh, làm tròn số thập phân và đổi đơn vị đo",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hết học kì 1, cùng ôn lại số thập phân: 1,25 m là bao nhiêu xăng-ti-mét nhỉ? 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số thập phân",
            explanation:
              "Ôn lại cấu tạo số thập phân (phần nguyên, phần thập phân), cách so sánh hai số thập phân và cách làm tròn số thập phân đến một hàng cho trước.",
            points: [
              "So sánh: so phần nguyên trước, rồi so từng hàng phần thập phân.",
              "Làm tròn: xét chữ số liền sau hàng làm tròn.",
              "1,25 m = 125 cm.",
            ],
            rule: "Viết thêm chữ số 0 tận cùng bên phải không làm đổi giá trị.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập số thập phân",
            table: {
              headers: ["Nội dung", "Ví dụ"],
              rows: [
                ["Cấu tạo", "7,35 gồm 7 đơn vị, 3 phần mười, 5 phần trăm"],
                ["So sánh", "4,5 < 4,52"],
                ["Làm tròn", "6,78 ≈ 6,8 (hàng phần mười)"],
                ["Đổi đơn vị", "1,25 m = 125 cm"],
              ],
              label: "Kiểm tra lại bằng cách đổi sang phân số thập phân",
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
            question: "Số 7,35 gồm những hàng nào?",
            options: [
              "7 đơn vị, 3 phần mười, 5 phần trăm",
              "7 đơn vị, 5 phần mười, 3 phần trăm",
              "7 phần mười, 3 phần trăm",
              "7 chục, 3 đơn vị, 5 phần mười",
            ],
            answer: "7 đơn vị, 3 phần mười, 5 phần trăm",
            mascotHint:
              "Chữ số đầu sau dấu phẩy là phần mười, tiếp theo là phần trăm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "1,25 m bằng bao nhiêu xăng-ti-mét?",
            options: ["125 cm", "12,5 cm", "1 250 cm", "1025 cm"],
            answer: "125 cm",
            mascotHint: "1 m = 100 cm; 0,25 m = 25 cm nên 1,25 m = 125 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nắm cấu tạo số thập phân.",
              "So sánh phần nguyên rồi phần thập phân.",
              "Làm tròn đúng hàng và đổi đơn vị chính xác.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c6-l2",
      title: "Bài 31: Ôn tập các phép tính với số thập phân",
      type: "learn",
      description:
        "Ôn tập cộng, trừ, nhân, chia số thập phân và tính giá trị biểu thức",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một cửa hàng bán 3,5 kg táo giá 45 000 đồng một ki-lô-gam. Phải tính 3,5 × 45 000 = 157 500 đồng! 🍎",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn phép tính với số thập phân",
            explanation:
              "Ôn lại cách đặt tính và tính cộng, trừ, nhân, chia số thập phân; cách tính giá trị biểu thức và vận dụng vào bài toán mua bán.",
            points: [
              "Cộng, trừ: các chữ số cùng hàng thẳng cột, dấu phẩy thẳng cột.",
              "Nhân: đếm chữ số phần thập phân để đặt dấu phẩy ở tích.",
              "Chia: dời dấu phẩy khi chia cho số thập phân.",
            ],
            rule: "Biểu thức: tính trong ngoặc trước, nhân chia trước, cộng trừ sau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập các phép tính với số thập phân",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["4,75 + 2,5", "7,25"],
                ["9,6 − 3,45", "6,15"],
                ["3,5 × 45 000", "157 500"],
                ["7,2 : 1,2", 6],
              ],
              label: "Thử lại kết quả bằng phép tính ngược",
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
            question: "Tính: 4,75 + 2,5 = ?",
            options: ["7,25", "6,25", "7,15", "72,5"],
            answer: "7,25",
            mascotHint: "2,5 = 2,50; 4,75 + 2,50 = 7,25.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "3,5 kg táo giá 45 000 đồng một ki-lô-gam. Số tiền phải trả là:",
            options: [
              "157 500 đồng",
              "157 000 đồng",
              "145 000 đồng",
              "1 575 000 đồng",
            ],
            answer: "157 500 đồng",
            mascotHint: "3,5 × 45 000 = 157 500 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt dấu phẩy đúng trong mỗi phép tính.",
              "Tính giá trị biểu thức theo thứ tự.",
              "Vận dụng vào bài toán mua bán thực tế.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c6-l3",
      title: "Bài 32: Ôn tập một số hình phẳng",
      type: "learn",
      description:
        "Ôn tập đặc điểm hình tam giác, hình thang, hình tròn và các hình đã học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Nhìn vào hình vẽ: đâu là tam giác vuông, đâu là hình thang? Cùng ôn lại đặc điểm các hình phẳng! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các hình phẳng đã học",
            explanation:
              "Nhắc lại đặc điểm của hình tam giác, hình thang, hình tròn và các hình tứ giác đã học ở các lớp dưới: số cạnh, số đỉnh, cặp cạnh song song, góc vuông.",
            points: [
              "Tam giác: 3 cạnh, 3 đỉnh; tam giác vuông có 1 góc vuông.",
              "Hình thang: có một cặp cạnh đối diện song song.",
              "Hình tròn: tâm, bán kính, đường kính.",
            ],
            rule: "Quan sát cạnh và góc để nhận biết hình.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình thang có hai đáy song song",
            planeShape: {
              kind: "trapezoid",
              labels: ["đáy lớn", "đáy bé", "chiều cao"],
              formula: "Hai đáy song song với nhau",
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
            question: "Hình tam giác vuông có đặc điểm gì?",
            options: [
              "Có một góc vuông",
              "Có ba góc vuông",
              "Có bốn cạnh bằng nhau",
              "Không có góc vuông",
            ],
            answer: "Có một góc vuông",
            mascotHint:
              "Tam giác vuông có một góc vuông, hai cạnh góc vuông vuông góc với nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có đường kính 8 cm thì bán kính là:",
            options: ["4 cm", "8 cm", "16 cm", "2 cm"],
            answer: "4 cm",
            mascotHint: "Bán kính bằng một nửa đường kính: 8 : 2 = 4 (cm).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhận biết hình qua cạnh và góc.",
              "d = 2 × r.",
              "Hình thang có một cặp cạnh song song.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c6-l4",
      title: "Bài 33: Ôn tập diện tích, chu vi một số hình phẳng",
      type: "learn",
      description: "Ôn tập công thức chu vi, diện tích các hình phẳng đã học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một sân hình chữ nhật dài 20 m, rộng 15 m. Chu vi 70 m, diện tích 300 m². Cùng ôn lại các công thức nhé! 🏟️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Chu vi và diện tích các hình",
            explanation:
              "Ôn tập công thức tính chu vi, diện tích hình chữ nhật, hình vuông, hình tam giác, hình thang và hình tròn để giải các bài toán thực tế.",
            points: [
              "Hình chữ nhật: P = (a + b) × 2; S = a × b.",
              "Tam giác: S = a × h : 2; hình thang: S = (a + b) × h : 2.",
              "Hình tròn: C = d × 3,14; S = r × r × 3,14.",
            ],
            rule: "Đơn vị chu vi là cm, m…; đơn vị diện tích là cm², m²…",
          },
        },
        {
          type: "visual",
          content: {
            text: "Công thức chu vi và diện tích",
            table: {
              headers: ["Hình", "Chu vi", "Diện tích"],
              rows: [
                ["Hình vuông", "cạnh × 4", "cạnh × cạnh"],
                ["Hình chữ nhật", "(dài + rộng) × 2", "dài × rộng"],
                ["Tam giác", "tổng ba cạnh", "đáy × chiều cao : 2"],
                ["Hình thang", "tổng bốn cạnh", "(đáy lớn + đáy bé) × cao : 2"],
              ],
              label: "Chu vi là tổng độ dài các cạnh",
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
            question: "Sân hình chữ nhật dài 20 m, rộng 15 m. Chu vi sân là:",
            options: ["70 m", "35 m", "300 m", "140 m"],
            answer: "70 m",
            mascotHint: "(20 + 15) × 2 = 70 (m).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Sân hình chữ nhật dài 20 m, rộng 15 m. Diện tích sân là:",
            options: ["300 m²", "70 m²", "35 m²", "600 m²"],
            answer: "300 m²",
            mascotHint: "20 × 15 = 300 (m²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chu vi = tổng độ dài các cạnh.",
              "Diện tích: nhớ chia 2 với tam giác và hình thang.",
              "Đổi về cùng đơn vị trước khi tính.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c6-l5",
      title: "Bài 34: Ôn tập đo lường",
      type: "learn",
      description:
        "Ôn tập đơn vị đo độ dài, khối lượng, diện tích, thời gian và đổi đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một bao gạo nặng 0,75 tạ. Đổi ra ki-lô-gam là 75 kg. Cùng ôn lại bảng đơn vị đo! ⚖️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các đơn vị đo lường",
            explanation:
              "Ôn tập quan hệ giữa các đơn vị đo độ dài, khối lượng, diện tích và thời gian; luyện đổi đơn vị và viết số đo dưới dạng số thập phân.",
            points: [
              "1 tấn = 10 tạ = 1 000 kg.",
              "1 km² = 100 ha; 1 ha = 10 000 m².",
              "1 giờ = 60 phút; 1 phút = 60 giây.",
            ],
            rule: "Đơn vị lớn sang bé thì nhân; bé sang lớn thì chia.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị đo lường",
            table: {
              headers: ["Số đo", "Đổi đơn vị"],
              rows: [
                ["0,75 tạ", "75 kg"],
                ["2,5 tấn", "2 500 kg"],
                ["1,5 giờ", "90 phút"],
                ["3 ha", "30 000 m²"],
              ],
              label: "Dùng số thập phân để viết gọn số đo",
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
            question: "0,75 tạ bằng bao nhiêu ki-lô-gam?",
            options: ["75 kg", "7,5 kg", "750 kg", "0,75 kg"],
            answer: "75 kg",
            mascotHint: "1 tạ = 100 kg nên 0,75 tạ = 75 kg.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "1,5 giờ bằng bao nhiêu phút?",
            options: ["90 phút", "150 phút", "75 phút", "60 phút"],
            answer: "90 phút",
            mascotHint:
              "1 giờ = 60 phút; 0,5 giờ = 30 phút nên 1,5 giờ = 90 phút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thuộc quan hệ giữa các đơn vị đo.",
              "Đổi đơn vị đúng phép nhân, chia.",
              "Viết số đo gọn bằng số thập phân.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c6-l6",
      title: "Bài 35: Ôn tập chung",
      type: "learn",
      description:
        "Ôn tập tổng hợp kiến thức học kì 1: số thập phân, phép tính, hình học, đo lường",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Sẵn sàng cho kì thi? Cùng nhau ôn tập tổng hợp toàn bộ kiến thức học kì 1 nào! 🎯",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp học kì 1",
            table: {
              headers: ["Nội dung", "Điều cần nhớ"],
              rows: [
                ["Số thập phân", "so sánh, làm tròn, đổi đơn vị"],
                ["Bốn phép tính", "đặt dấu phẩy đúng vị trí"],
                ["Hình phẳng", "công thức chu vi, diện tích"],
                ["Đo lường", "đổi đơn vị theo bậc"],
              ],
              label: "Ôn kĩ phần đặt tính với số thập phân",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 125,
              right: 4,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 125 × 4\nhàng đơn vị 5 × 4 = 20, viết 0 nhớ 2\nhàng chục 2 × 4 + 2 (nhớ) = 10, viết 0 nhớ 1\nhàng trăm 1 × 4 + 1 (nhớ) = 5, viết 5\nVậy 125 × 4 = 500."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 480 là sai?",
            explanation: "480 là kết quả khi bé quên nhớ khi nhân từng hàng. Đây là lỗi hay gặp nhất của dạng nhân này.",
            points: [
              "Lỗi — quên nhớ khi nhân từng hàng: hàng đơn vị 5 × 4 = 20, viết 0 nhớ 2. Kết quả đúng phải là 500.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số nhớ NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 500 : 4 phải bằng 125."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "158 × 4 bằng bao nhiêu?",
            options: [402, 631, 632, 633],
            answer: 632,
            mascotHint: "hàng đơn vị 8 × 4 = 32, viết 2 nhớ 3. Kết quả 632."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 12,5 × 4 = ?",
            options: ["50", "5", "500", "45"],
            answer: "50",
            mascotHint: "125 × 4 = 500; một chữ số phần thập phân ⇒ 50,0 = 50.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có bán kính 10 cm. Diện tích hình tròn là:",
            options: ["314 cm²", "31,4 cm²", "62,8 cm²", "100 cm²"],
            answer: "314 cm²",
            mascotHint: "S = 10 × 10 × 3,14 = 314 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 8,567 đến hàng phần trăm:",
            options: ["8,57", "8,56", "8,6", "9"],
            answer: "8,57",
            mascotHint: "Chữ số hàng phần nghìn là 7 nên 8,567 ≈ 8,57.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nắm chắc số thập phân và bốn phép tính.",
              "Thuộc công thức hình phẳng.",
              "Đổi đơn vị đo thành thạo.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
