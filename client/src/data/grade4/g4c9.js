export const g4c9 = {
  id: "g4-c9",
  name: "Chủ đề 9: Làm quen với yếu tố thống kê, xác suất",
  description:
    "Dãy số liệu thống kê, biểu đồ cột, số lần xuất hiện của một sự kiện",
  icon: "📊",
  color: "#8b5cf6",
  totalLessons: 4,
  lessons: [
    {
      id: "g4-c9-l1",
      title: "Bài 49: Dãy số liệu thống kê",
      type: "learn",
      description: "Đọc và nhận xét các số trong một dãy số liệu thống kê",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Mỗi buổi sáng, Rô-bốt đạp xe quanh công viên. Tuần này bạn ấy ghi lại quãng đường đi được mỗi ngày: 1 km, 2 km, 2 km, 2 km, 3 km. Những số đó tạo thành một dãy số liệu thống kê! 🚲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Dãy số liệu thống kê",
            explanation:
              "Khi ghi lại các số đo, số đếm… của nhiều lần quan sát theo một thứ tự, ta được một dãy số liệu thống kê. Dãy số liệu cho ta biết số lần quan sát và giá trị ở mỗi lần.",
            points: [
              "Dãy 1; 2; 2; 2; 3 có 5 số — tức là quan sát 5 ngày.",
              "Số thứ nhất là 1, số thứ hai là 2, …",
              "Nhìn vào dãy, ta so sánh được giá trị lớn nhất, bé nhất và giá trị trung bình.",
            ],
            rule: "Dãy số liệu là các số được ghi lại theo thứ tự quan sát.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Dãy số liệu quãng đường Rô-bốt đạp xe",
            table: {
              headers: [
                "Ngày",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
              ],
              rows: [["Quãng đường (km)", 1, 2, 2, 2, 3]],
              label:
                "Dãy số liệu: 1; 2; 2; 2; 3 — nhiều nhất 3 km, ít nhất 1 km",
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
            question: "Dãy số liệu 1; 2; 2; 2; 3 có tất cả bao nhiêu số?",
            options: ["5 số", "3 số", "4 số", "10 số"],
            answer: "5 số",
            mascotHint: "Đếm các số trong dãy: 1; 2; 2; 2; 3 — được 5 số.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong giải bóng đá, bốn bạn ghi được số bàn thắng là 7; 6; 2; 4. Số bàn thắng nhiều nhất mà một bạn ghi được là bao nhiêu?",
            options: ["7 bàn", "6 bàn", "4 bàn", "2 bàn"],
            answer: "7 bàn",
            mascotHint: "Trong dãy 7; 6; 2; 4, số lớn nhất là 7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Dãy số liệu ghi lại các số theo thứ tự quan sát.",
              "Đếm được số lần quan sát.",
              "Tìm được giá trị lớn nhất, bé nhất trong dãy.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c9-l2",
      title: "Bài 50: Biểu đồ cột",
      type: "learn",
      description:
        "Đọc và nhận xét số liệu trên biểu đồ cột; tìm giá trị trung bình",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Mai khảo sát môn thể thao yêu thích của các bạn và Rô-bốt vẽ thành biểu đồ cột. Cột cao là nhiều bạn yêu thích, cột thấp là ít bạn yêu thích! 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Đọc biểu đồ cột",
            explanation:
              "Biểu đồ cột dùng các cột có độ cao khác nhau để biểu diễn số liệu. Muốn biết số liệu của một đối tượng, ta nhìn độ cao của cột tương ứng với các vạch số ở bên trái.",
            points: [
              "Tên các đối tượng ghi ở dưới trục ngang.",
              "Các vạch số ở trục dọc cho biết giá trị.",
              "Cột càng cao thì số liệu càng lớn.",
            ],
            rule: "Nhìn trục dọc để đọc số liệu của mỗi cột.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số bạn yêu thích mỗi môn thể thao",
            table: {
              headers: ["Môn thể thao", "Bóng đá", "Bóng rổ", "Bơi"],
              rows: [["Số bạn", 4, 6, 2]],
              label:
                "Bóng rổ được nhiều bạn yêu thích nhất (6 bạn), bơi ít nhất (2 bạn)",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số học sinh đến thư viện mượn sách",
            table: {
              headers: [
                "Ngày",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
              ],
              rows: [["Số học sinh", 35, 50, 50, 70, 115]],
              label: "Thứ Sáu có nhiều học sinh mượn sách nhất: 115 học sinh",
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
              "Dựa vào bảng số liệu trên, môn thể thao nào được nhiều bạn yêu thích nhất?",
            options: ["Bóng rổ", "Bóng đá", "Bơi", "Bóng đá và bơi"],
            answer: "Bóng rổ",
            mascotHint: "Bóng rổ 6 bạn, nhiều hơn bóng đá 4 bạn và bơi 2 bạn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Số học sinh đến thư viện mượn sách trong 5 ngày là 35; 50; 50; 70; 115. Trung bình mỗi ngày có bao nhiêu học sinh?",
            options: [
              "64 học sinh",
              "60 học sinh",
              "70 học sinh",
              "320 học sinh",
            ],
            answer: "64 học sinh",
            mascotHint:
              "(35 + 50 + 50 + 70 + 115) : 5 = 320 : 5 = 64 (học sinh).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cột cao = số liệu lớn.",
              "Đọc số liệu theo trục dọc.",
              "Có thể tính trung bình cộng từ số liệu trên biểu đồ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c9-l3",
      title: "Bài 51: Số lần xuất hiện của một sự kiện",
      type: "learn",
      description:
        "Liệt kê các sự kiện có thể xảy ra và đếm số lần xuất hiện bằng bảng kiểm đếm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Trong hộp có 3 quả bóng xanh và 1 quả bóng vàng. Rô-bốt lấy 1 quả bóng ra xem màu rồi trả lại. Làm 10 lần, bạn ấy ghi kết quả vào bảng kiểm đếm. 🎈",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Liệt kê sự kiện và đếm số lần",
            explanation:
              "Khi thực hiện một hoạt động ngẫu nhiên, ta liệt kê các sự kiện có thể xảy ra, sau đó dùng bảng kiểm đếm để ghi lại mỗi lần sự kiện nào xuất hiện.",
            points: [
              "Lấy 1 bóng: có 2 sự kiện có thể xảy ra là bóng xanh hoặc bóng vàng.",
              "Lấy 2 bút từ túi có 2 bút xanh và 1 bút vàng: có thể được 2 bút xanh, hoặc 1 bút xanh và 1 bút vàng.",
              "Mỗi lần ghi bằng một gạch, sau đó đếm để biết số lần xuất hiện.",
            ],
            rule: "Liệt kê sự kiện → ghi kiểm đếm → đếm số lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng kiểm đếm khi quay mũi tên 20 lần",
            table: {
              headers: ["Phần mũi tên dừng lại", "Số lần"],
              rows: [
                ["Phần màu đỏ", 9],
                ["Phần màu vàng", 11],
              ],
              label: "Cả hai sự kiện đều xảy ra; vàng xuất hiện nhiều hơn đỏ",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Phần mũi tên dừng lại", "Số lần"],
              rows: [
                ["Phần màu đỏ", 9],
                ["Phần màu vàng", 11]
              ],
              label: "Cả hai sự kiện đều xảy ra; vàng xuất hiện nhiều hơn đỏ"
            },
            text: "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 9 + 11 = 20."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đọc bảng số liệu",
            explanation: "Bảng số liệu là một bức tranh bằng số: mỗi hàng là một đối tượng, mỗi cột là một thông tin.",
            points: [
              "Bước 1 — đọc tên hàng (hoặc cột đầu) để biết đang nói về cái gì.",
              "Bước 2 — đọc con số ở cột tương ứng với đối tượng đó.",
              "Bước 3 — muốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải CỘNG hoặc SO các con số, không đọc lại một ô.",
              "Kiểm tra lại: tổng vừa tính phải LỚN HƠN từng con số trong bảng."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong bảng trên, số lượng nào LỚN NHẤT?",
            options: [9, 11, 12, 20],
            answer: 11,
            mascotHint: "Bé so các con số 9, 11 — số lớn nhất là 11."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Cộng các con số trong bảng lại thì được bao nhiêu?",
            options: [11, 20, 21, 22],
            answer: 20,
            mascotHint: "Lấy các con số cộng lại: 9 + 11 = 20."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong hộp có 3 bóng xanh, 1 bóng vàng. Lấy 1 quả bóng ra, có mấy sự kiện có thể xảy ra?",
            options: ["2 sự kiện", "1 sự kiện", "3 sự kiện", "4 sự kiện"],
            answer: "2 sự kiện",
            mascotHint:
              "Hoặc lấy được bóng xanh, hoặc lấy được bóng vàng — 2 sự kiện.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Quay mũi tên 20 lần, kết quả là 9 lần dừng ở màu đỏ và 11 lần ở màu vàng. Sự kiện nào xuất hiện nhiều lần hơn?",
            options: ["Màu vàng", "Màu đỏ", "Bằng nhau", "Không xác định"],
            answer: "Màu vàng",
            mascotHint: "11 > 9 nên màu vàng xuất hiện nhiều hơn 2 lần.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Liệt kê hết các sự kiện có thể xảy ra.",
              "Ghi lại bằng bảng kiểm đếm.",
              "So sánh số lần xuất hiện của các sự kiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c9-l4",
      title: "Bài 52: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập dãy số liệu, biểu đồ cột và số lần xuất hiện của sự kiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt và các bạn làm đồ chơi tái chế bán lấy tiền ủng hộ. Mỗi ngày các bạn ghi lại số tiền thu được để cùng xem xét. 💝",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số tiền thu được mỗi ngày",
            table: {
              headers: ["Ngày", "1", "2", "3", "4", "5"],
              rows: [
                [
                  "Số tiền (đồng)",
                  "180 000",
                  "70 000",
                  "125 000",
                  "80 000",
                  "100 000",
                ],
              ],
              label: "Có 3 ngày thu được nhiều hơn 100 000 đồng",
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
              "Dãy số liệu 180 000; 70 000; 125 000; 80 000; 100 000 có bao nhiêu ngày thu được nhiều hơn 100 000 đồng?",
            options: ["2 ngày", "1 ngày", "3 ngày", "4 ngày"],
            answer: "2 ngày",
            mascotHint:
              "Các số lớn hơn 100 000 là 180 000 và 125 000; còn 100 000 thì bằng, không lớn hơn ⇒ có 2 ngày.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số vé xem phim bán được trong tuần",
            table: {
              headers: [
                "Ngày",
                "Thứ Hai",
                "Thứ Ba",
                "Thứ Tư",
                "Thứ Năm",
                "Thứ Sáu",
                "Thứ Bảy",
                "Chủ nhật",
              ],
              rows: [
                ["Số vé", 285, 540, "2 150", 410, "1 105", "1 200", "1 610"],
              ],
              label: "Thứ Tư bán nhiều vé nhất (2 150 vé)",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bảng số vé xem phim: 285; 540; 2 150; 410; 1 105; 1 200; 1 610. Ngày nào bán được nhiều vé nhất?",
            options: ["Thứ Tư", "Chủ nhật", "Thứ Bảy", "Thứ Sáu"],
            answer: "Thứ Tư",
            mascotHint:
              "Số vé lớn nhất trong bảng là 2 150 vé, ứng với thứ Tư.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc dãy số liệu và biểu đồ cột thành thạo.",
              "So sánh, tìm giá trị lớn nhất, bé nhất.",
              "Đếm số lần xuất hiện của một sự kiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
