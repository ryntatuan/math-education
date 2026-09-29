export const g2c13 = {
  id: "g2-c13",
  name: "Chủ đề 13: Làm quen với yếu tố thống kê, xác suất",
  description:
    "Thu thập, phân loại, kiểm đếm số liệu; biểu đồ tranh; chắc chắn, có thể, không thể",
  icon: "📊",
  color: "#8338ec",
  totalLessons: 6,
  lessons: [
    {
      id: "g2-c13-l1",
      title: "Bài 1: Thu thập và phân loại số liệu",
      type: "learn",
      description: "Biết cách thu thập số liệu và phân loại theo tiêu chí",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cả lớp có bao nhiêu bạn thích màu đỏ, bao nhiêu bạn thích màu xanh? Làm sao biết nhỉ? 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thu thập và phân loại",
            explanation:
              "THU THẬP số liệu là hỏi và ghi lại thông tin. PHÂN LOẠI là xếp các thông tin đó vào từng nhóm theo một tiêu chí.",
            rule: "Hỏi từng bạn thích màu gì rồi xếp vào hai nhóm: nhóm màu đỏ và nhóm màu xanh.",
            points: [
              "Tiêu chí phân loại phải rõ ràng: theo màu, theo loại quả, theo giới tính.",
              "Mỗi thông tin chỉ thuộc một nhóm.",
              "Thu thập xong thì mới đếm được.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Ví dụ: hỏi các bạn trong lớp\nThích màu đỏ: 7 bạn\nThích màu xanh: 4 bạn\nMỗi bạn chỉ ở một nhóm",
            table: {
              headers: ["Nhóm", "Số bạn"],
              rows: [
                ["Thích màu đỏ", "7 bạn"],
                ["Thích màu xanh", "4 bạn"],
              ],
              label:
                "Ví dụ: hỏi các bạn trong lớp rồi xếp vào hai nhóm — mỗi bạn chỉ ở một nhóm",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Nhóm", "Số bạn"],
              rows: [
                ["Thích màu đỏ", "7 bạn"],
                ["Thích màu xanh", "4 bạn"]
              ],
              label: "Ví dụ: hỏi các bạn trong lớp rồi xếp vào hai nhóm — mỗi bạn chỉ ở một nhóm"
            },
            text: "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 7 + 4 = 11."
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
            options: [4, 7, 8, 11],
            answer: 7,
            mascotHint: "Bé so các con số 7, 4 — số lớn nhất là 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Cộng các con số trong bảng lại thì được bao nhiêu?",
            options: [7, 11, 12, 14],
            answer: 11,
            mascotHint: "Lấy các con số cộng lại: 7 + 4 = 11."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Phân loại các loại quả theo tiêu chí nào là hợp lí?",
            options: [
              "Quả có màu đỏ và quả có màu vàng",
              "Quả to và quả ngon",
              "Quả và bàn ghế",
              "Quả và bạn bè",
            ],
            answer: "Quả có màu đỏ và quả có màu vàng",
            mascotHint: "Tiêu chí phải rõ và mọi quả phải thuộc đúng một nhóm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Thu thập số liệu là hỏi và ghi lại thông tin.",
              "Phân loại là xếp thông tin vào các nhóm theo tiêu chí.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c13-l2",
      title: "Bài 2: Kiểm đếm số liệu",
      type: "learn",
      description: "Dùng vạch hoặc ô để kiểm đếm số liệu",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt đếm số bạn thích mỗi màu bằng cách gạch từng vạch. Bé xem nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Kiểm đếm bằng vạch",
            explanation:
              "Mỗi lần gặp một thông tin, bé gạch một vạch vào đúng nhóm. Cuối cùng đếm số vạch để biết số lượng.",
            rule: "Cứ 5 vạch thì gạch chéo một lần cho dễ đếm: |||| = 4; ||||/ = 5.",
            points: [
              "Gạch theo nhóm 5 cho dễ đếm.",
              "Đếm xong ghi số vào cạnh nhóm.",
              "Kiểm đếm giúp biết nhóm nào nhiều nhất, nhóm nào ít nhất.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Màu đỏ:   ||||/ ||   → 7 bạn\nMàu xanh: ||||      → 4 bạn",
            table: {
              headers: ["Màu", "Số bạn"],
              rows: [
                ["Màu đỏ", 7],
                ["Màu xanh", 4],
              ],
              label: "Kiểm đếm bằng vạch: cứ 5 vạch thì gạch chéo một lần",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 7,
              right: 4,
              sign: "−"
            },
            text: "Bé tự đặt tính: 7 − 4\nhàng đơn vị 7 − 4 = 3, viết 3\nVậy 7 − 4 = 3."
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Màu", "Số bạn"],
              rows: [
                ["Màu đỏ", 7],
                ["Màu xanh", 4]
              ],
              label: "Kiểm đếm bằng vạch: cứ 5 vạch thì gạch chéo một lần"
            },
            text: "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 7 + 4 = 11."
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
            options: [4, 7, 8, 11],
            answer: 7,
            mascotHint: "Bé so các con số 7, 4 — số lớn nhất là 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Cộng các con số trong bảng lại thì được bao nhiêu?",
            options: [7, 11, 12, 14],
            answer: 11,
            mascotHint: "Lấy các con số cộng lại: 7 + 4 = 11."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 − 5 bằng bao nhiêu?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "hàng đơn vị 8 − 5 = 3, viết 3. Kết quả 3."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Nhóm A có 7 vạch, nhóm B có 4 vạch. Nhóm nào nhiều hơn và nhiều hơn mấy?",
            options: [
              "Nhóm A, nhiều hơn 3",
              "Nhóm B, nhiều hơn 3",
              "Bằng nhau",
              "Nhóm A, nhiều hơn 11",
            ],
            answer: "Nhóm A, nhiều hơn 3",
            mascotHint: "7 − 4 = 3, nên nhóm A nhiều hơn 3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Mỗi thông tin gạch một vạch vào đúng nhóm.",
              "Gạch nhóm 5 cho dễ đếm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c13-l3",
      title: "Bài 3: Biểu đồ tranh",
      type: "learn",
      description: "Nhận biết biểu đồ tranh và cách dùng hình thay số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Thay vì ghi số, Rô-bốt vẽ hình quả táo để biểu diễn số liệu. Đó là biểu đồ tranh! 🍎",
            items: [
              {
                emoji: "🍎",
                label: "Quả táo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Biểu đồ tranh",
            explanation:
              "BIỂU ĐỒ TRANH dùng các hình giống nhau để biểu diễn số liệu. Mỗi hình tượng trưng cho một số lượng nhất định.",
            rule: "Nếu mỗi hình quả táo là 1 bạn thì 5 hình quả táo nghĩa là 5 bạn thích táo.",
            points: [
              "Bên trái biểu đồ ghi tên các nhóm.",
              "Mỗi hình tương ứng một số lượng, phải đọc kĩ chú thích.",
              "Hình càng nhiều thì số lượng càng lớn.",
            ],
            items: [
              {
                emoji: "🍎",
                label: "Quả táo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Táo:   🍎🍎🍎🍎🍎\nCam:   🍊🍊🍊\n(1 hình = 1 bạn thích)",
            barChart: {
              title: "Bạn thích loại quả nào",
              items: [
                {
                  label: "Táo",
                  value: 5,
                },
                {
                  label: "Cam",
                  value: 3,
                },
              ],
              unit: "bạn",
              highlight: 0,
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
              "Trên biểu đồ tranh có 4 hình quả cam, mỗi hình là 1 bạn. Hỏi có bao nhiêu bạn thích cam?",
            options: [3, 4, 5, 40],
            answer: 4,
            items: [
              {
                emoji: "🍊",
                count: 4,
              },
            ],
            mascotHint: "4 hình tương ứng 4 bạn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Biểu đồ tranh dùng hình để biểu diễn số liệu.",
              "Phải đọc chú thích để biết mỗi hình tương ứng bao nhiêu.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c13-l4",
      title: "Bài 4: Đọc biểu đồ tranh",
      type: "learn",
      description: "Đọc và so sánh số liệu trên biểu đồ tranh",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trên biểu đồ, mỗi hình là 2 bạn đấy! Bé đếm cẩn thận nhé 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm hình rồi nhân",
            explanation:
              "Đếm số hình của từng nhóm, rồi NHÂN với số lượng mà mỗi hình biểu diễn.",
            rule: "Mỗi hình là 2 bạn. Nhóm thích táo có 3 hình, vậy có 3 × 2 = 6 bạn.",
            points: [
              "Mỗi hình là 2 thì phải nhân với 2, không đếm hình không.",
              "Muốn biết nhóm nào nhiều hơn, so số hình với nhau.",
              "Tổng số bạn bằng tổng số hình nhân với số lượng mỗi hình.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Mỗi hình = 2 bạn\nTáo: 3 hình → 3 × 2 = 6 bạn\nCam: 2 hình → 2 × 2 = 4 bạn",
            barChart: {
              title: "Mỗi hình là 2 bạn",
              items: [
                {
                  label: "Táo",
                  value: 6,
                },
                {
                  label: "Cam",
                  value: 4,
                },
              ],
              unit: "bạn",
              highlight: 0,
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 3,
              right: 2,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 3 × 2\nhàng đơn vị 3 × 2 = 6, viết 6\nVậy 3 × 2 = 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 × 7 bằng bao nhiêu?",
            options: [6, 7, 8, 9],
            answer: 7,
            mascotHint: "hàng đơn vị 1 × 7 = 7, viết 7. Kết quả 7."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên biểu đồ, mỗi hình là 2 bạn. Nhóm thích táo có 3 hình. Hỏi có bao nhiêu bạn thích táo?",
            options: [3, 5, 6, 32],
            answer: 6,
            items: [
              {
                emoji: "🍎",
                count: 3,
              },
            ],
            mascotHint: "3 × 2 = 6 bạn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Táo có 3 hình, cam có 2 hình (mỗi hình là 2 bạn). Nhóm nào nhiều hơn và nhiều hơn bao nhiêu bạn?",
            options: [
              "Táo, nhiều hơn 2 bạn",
              "Cam, nhiều hơn 2 bạn",
              "Bằng nhau",
              "Táo, nhiều hơn 1 bạn",
            ],
            answer: "Táo, nhiều hơn 2 bạn",
            items: [
              {
                emoji: "🍎",
                count: 3,
              },
              {
                emoji: "🍊",
                count: 2,
              },
            ],
            mascotHint: "Táo 6 bạn, cam 4 bạn. 6 − 4 = 2 bạn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm số hình rồi nhân với số lượng mỗi hình.",
              "3 × 2 = 6 bạn.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c13-l5",
      title: "Bài 5: Chắc chắn, có thể, không thể",
      type: "learn",
      description: "Nhận biết khả năng xảy ra của một sự kiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Ngày mai trời mưa — điều đó có chắc chắn xảy ra không nhỉ? 🌦️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Ba mức khả năng",
            explanation:
              "Một sự việc có thể CHẮC CHẮN xảy ra, CÓ THỂ xảy ra, hoặc KHÔNG THỂ xảy ra.",
            rule: "Mặt trời mọc ở hướng Đông: chắc chắn. Ngày mai trời mưa: có thể. Bé cao 3 mét: không thể.",
            points: [
              "Chắc chắn: luôn luôn đúng.",
              "Có thể: xảy ra hoặc không, không biết trước.",
              "Không thể: chắc chắn không xảy ra.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Chắc chắn: mặt trời mọc hướng Đông\nCó thể: ngày mai trời mưa\nKhông thể: bé cao 3 mét",
            table: {
              headers: ["Điều", "Khả năng"],
              rows: [
                ["Mặt trời mọc ở hướng Đông", "chắc chắn"],
                ["Ngày mai trời mưa", "có thể"],
                ["Bé cao 3 mét", "không thể"],
              ],
              label: "Chắc chắn · có thể · không thể",
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
            question:
              "Gieo một con xúc xắc, được mặt 7 chấm. Điều này thuộc mức nào?",
            options: [
              "Chắc chắn",
              "Có thể",
              "Không thể",
              "Vừa chắc chắn vừa có thể",
            ],
            answer: "Không thể",
            mascotHint: "Xúc xắc chỉ có 6 mặt, không bao giờ có mặt 7 chấm.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong hộp chỉ có bi đỏ, lấy ra một viên bi đỏ. Điều này thuộc mức nào?",
            options: [
              "Chắc chắn",
              "Có thể",
              "Không thể",
              "Không xác định được",
            ],
            answer: "Chắc chắn",
            mascotHint: "Trong hộp chỉ có bi đỏ nên chắc chắn lấy được bi đỏ.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ba mức: chắc chắn, có thể, không thể.",
              "Trong hộp chỉ có bi đỏ thì lấy ra bi đỏ là chắc chắn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c13-l6",
      title: "Bài 6: Luyện tập chung chủ đề 13",
      type: "learn",
      description: "Ôn tập thống kê và khả năng xảy ra",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã biết thu thập số liệu và đoán khả năng rồi! Tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 13",
            explanation:
              "Bé đã học thu thập và phân loại số liệu, kiểm đếm, biểu đồ tranh và ba mức khả năng.",
            points: [
              "Thu thập → phân loại → kiểm đếm → vẽ biểu đồ.",
              "Biểu đồ tranh: mỗi hình tương ứng một số lượng.",
              "Khả năng: chắc chắn, có thể, không thể.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Thu thập → Phân loại → Kiểm đếm → Biểu đồ tranh",
            table: {
              headers: ["Bước", "Việc làm"],
              rows: [
                ["1", "Thu thập số liệu"],
                ["2", "Phân loại"],
                ["3", "Kiểm đếm"],
                ["4", "Vẽ biểu đồ tranh"],
              ],
              label: "Luyện tập chung chủ đề 13",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 4,
              right: 5,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 4 × 5\nhàng đơn vị 4 × 5 = 20, viết 0 nhớ 2\ncòn nhớ 2 ở hàng cao hơn, viết 2\nVậy 4 × 5 = 20."
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc làm"],
              rows: [
                ["1", "Thu thập số liệu"],
                ["2", "Phân loại"],
                ["3", "Kiểm đếm"],
                ["4", "Vẽ biểu đồ tranh"]
              ],
              label: "Luyện tập chung chủ đề 13"
            },
            text: "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 1 + 2 + 3 = 6."
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
            options: [1, 3, 4, 6],
            answer: 3,
            mascotHint: "Bé so các con số 1, 2, 3 — số lớn nhất là 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Cộng các con số trong bảng lại thì được bao nhiêu?",
            options: [3, 5, 6, 7],
            answer: 6,
            mascotHint: "Lấy các con số cộng lại: 1 + 2 + 3 = 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 × 4 bằng bao nhiêu?",
            options: [6, 15, 16, 17],
            answer: 16,
            mascotHint: "hàng đơn vị 4 × 4 = 16, viết 6 nhớ 1. Kết quả 16."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên biểu đồ, mỗi hình là 5 quả bóng. Nhóm có 4 hình. Hỏi nhóm đó có bao nhiêu quả bóng?",
            options: [9, 20, 45, 54],
            answer: 20,
            items: [
              {
                emoji: "⚽",
                count: 4,
              },
            ],
            mascotHint: "4 × 5 = 20 quả bóng.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bé gieo một đồng xu, mặt sấp ngửa. Điều này thuộc mức nào?",
            options: ["Chắc chắn", "Có thể", "Không thể", "Không xác định"],
            answer: "Có thể",
            mascotHint:
              "Đồng xu có thể ra mặt sấp hoặc mặt ngửa — đều có thể xảy ra.",
            items: [
              {
                emoji: "🪙",
                label: "Đồng xu",
                count: 1,
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm hình rồi nhân với số lượng mỗi hình.",
              "Bé đã hoàn thành chủ đề 13.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
