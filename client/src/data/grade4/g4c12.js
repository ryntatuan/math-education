export const g4c12 = {
  id: "g4-c12",
  name: "Chủ đề 12: Phép nhân, phép chia phân số",
  description:
    "Nhân, chia hai phân số; tìm phân số của một số và luyện tập chung",
  icon: "✖️",
  color: "#06b6d4",
  totalLessons: 4,
  lessons: [
    {
      id: "g4-c12-l1",
      title: "Bài 63: Phép nhân phân số",
      type: "learn",
      description: "Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một tấm bìa hình vuông được chia thành các ô nhỏ. Muốn tô 2/3 rồi lại tô 4/5 của phần đó, Cú Mèo phải nhân hai phân số! 🟦",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân hai phân số",
            explanation:
              "Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số. Trước khi nhân, nếu tử số và mẫu số của hai phân số cùng chia hết cho một số thì ta rút gọn để tính dễ hơn.",
            points: [
              "2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15.",
              "Rút gọn chéo trước khi nhân: 3/4 × 8/9 = (3 × 8)/(4 × 9) = 2/3.",
              "Kết quả luôn rút gọn về phân số tối giản.",
            ],
            rule: "Tử nhân tử, mẫu nhân mẫu.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân phân số",
            table: {
              headers: ["Phép tính", "Tử × tử, mẫu × mẫu", "Kết quả"],
              rows: [
                ["2/3 × 4/5", "(2 × 4)/(3 × 5)", "8/15"],
                ["1/2 × 3/7", "(1 × 3)/(2 × 7)", "3/14"],
                ["3/4 × 8/9", "rút gọn chéo rồi nhân", "2/3"],
                ["5/6 × 6/5", "tử và mẫu bằng nhau", 1],
              ],
              label: "Có thể rút gọn trước khi nhân để kết quả gọn ngay",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 2,
              right: 4,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 2 × 4\nhàng đơn vị 2 × 4 = 8, viết 8\nVậy 2 × 4 = 8."
          }
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 3,
              shaded: 2,
              label: "2/3",
              unit: "băng giấy"
            },
            text: "Phân số 2/3: chia băng giấy thành 3 phần bằng nhau\ntô màu 2 phần trong số đó\nĐọc là “2 phần 3”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 3 — chia đều thành 3 phần.",
              "Tử số 2 — lấy 2 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 2/3 = 4/6."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/3, mẫu số là số nào?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Mẫu số là số dưới dấu gạch: 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/3, tử số là số nào?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "Tử số là số TRÊN dấu gạch: 2."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 × 3 bằng bao nhiêu?",
            options: [8, 9, 10, 11],
            answer: 9,
            mascotHint: "hàng đơn vị 3 × 3 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/3 × 4/5 = ?",
            options: ["8/15", "6/8", "8/8", "6/15"],
            answer: "8/15",
            mascotHint: "Tử: 2 × 4 = 8; mẫu: 3 × 5 = 15 ⇒ 8/15.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 × 8/9 = ?",
            options: ["2/3", "24/36", "11/13", "3/9"],
            answer: "2/3",
            mascotHint: "(3 × 8)/(4 × 9) = 24/36; rút gọn cho 12 được 2/3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân tử với tử, mẫu với mẫu.",
              "Rút gọn chéo để tính nhanh hơn.",
              "Đưa kết quả về phân số tối giản.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l2",
      title: "Bài 64: Phép chia phân số",
      type: "learn",
      description: "Chia hai phân số bằng cách nhân với phân số đảo ngược",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Muốn chia 3/4 cho 2/5, Rô-bốt không chia trực tiếp mà lấy 3/4 nhân với phân số đảo ngược của 2/5 là 5/2. Vì sao lại làm được thế nhỉ? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia hai phân số",
            explanation:
              "Muốn chia một phân số cho một phân số, ta nhân phân số thứ nhất với phân số thứ hai đảo ngược (đổi chỗ tử số và mẫu số).",
            points: [
              "3/4 : 2/5 = 3/4 × 5/2 = 15/8.",
              "Phân số đảo ngược của 2/5 là 5/2 (5/2 × 2/5 = 1).",
              "Số tự nhiên cũng viết được thành phân số: 2 = 2/1 nên 5/6 : 2 = 5/12.",
            ],
            rule: "Chia là nhân với phân số đảo ngược.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chia phân số",
            table: {
              headers: ["Phép tính", "Đảo ngược rồi nhân", "Kết quả"],
              rows: [
                ["3/4 : 2/5", "3/4 × 5/2", "15/8"],
                ["1/2 : 3/7", "1/2 × 7/3", "7/6"],
                ["5/6 : 2", "5/6 × 1/2", "5/12"],
                ["4/9 : 4/9", "4/9 × 9/4", 1],
              ],
              label: "Phân số nhân với phân số đảo ngược của nó luôn bằng 1",
            },
          },
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 4,
              shaded: 3,
              label: "3/4",
              unit: "băng giấy"
            },
            text: "Phân số 3/4: chia băng giấy thành 4 phần bằng nhau\ntô màu 3 phần trong số đó\nĐọc là “3 phần 4”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 4 — chia đều thành 4 phần.",
              "Tử số 3 — lấy 3 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 3/4 = 6/8."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Số chữ số", "nhiều chữ số hơn thì số đó lớn hơn"],
                [
                  "Bước 2 — So từ trái",
                  "so từng hàng từ trái sang phải, khác nhau thì dừng"
                ],
                ["Bước 3 — Đọc số", "đọc từ trái sang phải, hết mỗi lớp ba chữ số"]
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa"
            ],
            answer: "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
            mascotHint: "Người tính giỏi luôn thử lại: cộng thì lấy kết quả trừ đi một số hạng."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 3/4, mẫu số là số nào?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "Mẫu số là số dưới dấu gạch: 4."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 3/4, tử số là số nào?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Tử số là số TRÊN dấu gạch: 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 : 2/5 = ?",
            options: ["15/8", "6/20", "8/15", "15/20"],
            answer: "15/8",
            mascotHint: "3/4 × 5/2 = 15/8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số đảo ngược của 7/3 là phân số nào?",
            options: ["3/7", "7/3", "1/7", "3/1"],
            answer: "3/7",
            mascotHint: "Đảo ngược là đổi chỗ tử số và mẫu số: 7/3 → 3/7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia là nhân với phân số đảo ngược.",
              "Phân số đảo ngược: đổi chỗ tử số và mẫu số.",
              "Rút gọn kết quả rồi kết luận.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l3",
      title: "Bài 65: Tìm phân số của một số",
      type: "learn",
      description:
        "Tìm phân số của một số bằng hai bước: chia cho mẫu số rồi nhân với tử số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rổ có 9 quả cam. Cú Mèo lấy ra 2/3 số cam đó. Lấy ra bao nhiêu quả? Ta chia 9 thành 3 phần rồi lấy 2 phần! 🍊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tìm phân số của một số",
            explanation:
              "Muốn tìm một phần mấy của một số, ta chia số đó cho mẫu số để biết giá trị một phần, rồi nhân với tử số để biết số phần cần lấy.",
            points: [
              "2/3 của 9: 9 : 3 = 3 (một phần), 3 × 2 = 6.",
              "3/5 của 20: 20 : 5 = 4, 4 × 3 = 12.",
              "Cũng có thể viết gọn: 2/3 của 9 = 9 × 2 : 3 = 6.",
            ],
            rule: "Chia cho mẫu số rồi nhân với tử số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm phân số của một số",
            table: {
              headers: ["Bài toán", "Một phần", "Kết quả"],
              rows: [
                ["2/3 của 9", "9 : 3 = 3", 6],
                ["3/5 của 20", "20 : 5 = 4", 12],
                ["1/4 của 32", "32 : 4 = 8", 8],
                ["5/8 của 40", "40 : 8 = 5", 25],
              ],
              label: "Giá trị một phần × tử số = số cần tìm",
            },
          },
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 3,
              shaded: 2,
              label: "2/3",
              unit: "băng giấy"
            },
            text: "Phân số 2/3: chia băng giấy thành 3 phần bằng nhau\ntô màu 2 phần trong số đó\nĐọc là “2 phần 3”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 3 — chia đều thành 3 phần.",
              "Tử số 2 — lấy 2 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 2/3 = 4/6."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đơn vị", "viết kết quả luôn kèm đơn vị"],
                ["Bước 2 — Bậc thang", "đi xuống thì nhân, đi lên thì chia"],
                ["Bước 3 — Kiểm lại", "lấy kết quả đổi ngược lại xem có về số ban đầu"]
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "2 × 6 bằng bao nhiêu?",
            options: [11, 12, 13, 22],
            answer: 12,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 12."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/3, mẫu số là số nào?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Mẫu số là số dưới dấu gạch: 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/3, tử số là số nào?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "Tử số là số TRÊN dấu gạch: 2."
          }
        },
        {
          type: "quiz",
          content: {
            question: "2/3 của 9 quả cam là bao nhiêu quả?",
            options: ["6 quả", "3 quả", "9 quả", "12 quả"],
            answer: "6 quả",
            mascotHint: "9 : 3 = 3 rồi 3 × 2 = 6 (quả cam).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3/5 của 20 kg là bao nhiêu ki-lô-gam?",
            options: ["12 kg", "15 kg", "4 kg", "60 kg"],
            answer: "12 kg",
            mascotHint: "20 : 5 = 4 rồi 4 × 3 = 12 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia số đó cho mẫu số.",
              "Nhân kết quả với tử số.",
              "Kiểm tra kết quả bé hơn số ban đầu.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l4",
      title: "Bài 66: Luyện tập chung",
      type: "learn",
      description: "Ôn tập nhân, chia phân số và tìm phân số của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Một mảnh vườn có diện tích 60 m², người ta trồng hoa trên 3/4 diện tích. Trồng hoa trên bao nhiêu mét vuông? 🌻",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập nhân, chia phân số",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2/7 × 3/4", "3/14"],
                ["5/6 : 2/3", "5/4"],
                ["3/4 của 60 m²", "45 m²"],
                ["2/5 của 15 l", "6 l"],
              ],
              label: "Tìm phân số của một số: chia mẫu rồi nhân tử",
            },
          },
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 4,
              shaded: 3,
              label: "3/4",
              unit: "băng giấy"
            },
            text: "Phân số 3/4: chia băng giấy thành 4 phần bằng nhau\ntô màu 3 phần trong số đó\nĐọc là “3 phần 4”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 4 — chia đều thành 4 phần.",
              "Tử số 3 — lấy 3 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 3/4 = 6/8."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Gọi tên", "nói đúng tên hình/khối trước khi làm gì tiếp"],
                ["Bước 2 — Đếm", "đếm cạnh, đếm đỉnh rồi so với đặc điểm đã học"],
                [
                  "Bước 3 — Kiểm tra",
                  "dùng ê-ke hoặc thước để kiểm lại, không đoán bằng mắt"
                ]
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "71 × 2 bằng bao nhiêu?",
            options: [141, 142, 143, 152],
            answer: 142,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 142."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 3/4, mẫu số là số nào?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "Mẫu số là số dưới dấu gạch: 4."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 3/4, tử số là số nào?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Tử số là số TRÊN dấu gạch: 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 5/6 : 2/3 = ?",
            options: ["5/4", "10/18", "4/5", "5/9"],
            answer: "5/4",
            mascotHint: "5/6 × 3/2 = 15/12 = 5/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một mảnh vườn rộng 60 m², trồng hoa trên 3/4 diện tích. Diện tích trồng hoa là:",
            options: ["45 m²", "20 m²", "15 m²", "80 m²"],
            answer: "45 m²",
            mascotHint: "60 : 4 = 15 rồi 15 × 3 = 45 (m²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/7 × 3/4 = ?",
            options: ["3/14", "6/28", "5/11", "6/11"],
            answer: "3/14",
            mascotHint: "(2 × 3)/(7 × 4) = 6/28; rút gọn cho 2 được 3/14.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân: tử nhân tử, mẫu nhân mẫu.",
              "Chia: nhân với phân số đảo ngược.",
              "Tìm phân số của một số: chia mẫu, nhân tử.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
