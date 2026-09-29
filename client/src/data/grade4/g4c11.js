export const g4c11 = {
  id: "g4-c11",
  name: "Chủ đề 11: Phép cộng, phép trừ phân số",
  description:
    "Cộng, trừ hai phân số cùng mẫu số và khác mẫu số; tìm thành phần chưa biết",
  icon: "➕",
  color: "#ec4899",
  totalLessons: 3,
  lessons: [
    {
      id: "g4-c11-l1",
      title: "Bài 60: Phép cộng phân số",
      type: "learn",
      description: "Cộng hai phân số cùng mẫu số và khác mẫu số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Việt tô màu 5/8 hình tròn, Mai tô thêm 3/8 hình tròn. Hai bạn tô được bao nhiêu phần hình tròn nhỉ? 🎨",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai phân số",
            explanation:
              "Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và giữ nguyên mẫu số. Muốn cộng hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số rồi cộng hai phân số cùng mẫu số vừa tìm được.",
            points: [
              "Cùng mẫu: 2/7 + 3/7 = (2 + 3)/7 = 5/7.",
              "Khác mẫu: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
              "Kết quả nên rút gọn nếu được: 4/6 = 2/3.",
            ],
            rule: "Cùng mẫu thì cộng tử số; khác mẫu thì quy đồng trước.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cộng phân số",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                ["2/7 + 3/7", "cùng mẫu, cộng tử số", "5/7"],
                ["1/2 + 1/3", "quy đồng: 3/6 + 2/6", "5/6"],
                ["5/8 + 3/8", "cùng mẫu", "8/8 = 1"],
                ["1/6 + 1/6", "cùng mẫu", "2/6 = 1/3"],
              ],
              label: "Rút gọn kết quả khi có thể",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 2,
              right: 3,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 2 + 3\nhàng đơn vị 2 + 3 = 5, viết 5\nVậy 2 + 3 = 5."
          }
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 8,
              shaded: 5,
              label: "5/8",
              unit: "băng giấy"
            },
            text: "Phân số 5/8: chia băng giấy thành 8 phần bằng nhau\ntô màu 5 phần trong số đó\nĐọc là “5 phần 8”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 8 — chia đều thành 8 phần.",
              "Tử số 5 — lấy 5 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 5/8 = 10/16."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 5/8, mẫu số là số nào?",
            options: [5, 7, 8, 9],
            answer: 8,
            mascotHint: "Mẫu số là số dưới dấu gạch: 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 5/8, tử số là số nào?",
            options: [5, 6, 8, 9],
            answer: 5,
            mascotHint: "Tử số là số TRÊN dấu gạch: 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "5 + 1 bằng bao nhiêu?",
            options: [5, 6, 7, 8],
            answer: 6,
            mascotHint: "hàng đơn vị 5 + 1 = 6, viết 6. Kết quả 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/7 + 3/7 = ?",
            options: ["5/7", "5/14", "6/7", "1/7"],
            answer: "5/7",
            mascotHint:
              "Cùng mẫu số 7 nên cộng hai tử số: 2 + 3 = 5, giữ mẫu số 7.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 1/2 + 1/3 = ?",
            options: ["5/6", "2/5", "2/6", "1/6"],
            answer: "5/6",
            mascotHint:
              "Quy đồng mẫu số 6: 1/2 = 3/6; 1/3 = 2/6; 3/6 + 2/6 = 5/6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cùng mẫu số: cộng tử số, giữ nguyên mẫu số.",
              "Khác mẫu số: quy đồng rồi cộng.",
              "Kết quả rút gọn về phân số tối giản.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c11-l2",
      title: "Bài 61: Phép trừ phân số",
      type: "learn",
      description: "Trừ hai phân số cùng mẫu số và khác mẫu số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một băng giấy được tô màu 5/6, sau đó Cú Mèo xoá đi 1/6. Còn lại bao nhiêu phần băng giấy được tô màu? 🧽",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai phân số",
            explanation:
              "Muốn trừ hai phân số cùng mẫu số, ta trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai và giữ nguyên mẫu số. Với hai phân số khác mẫu số, ta quy đồng mẫu số rồi trừ.",
            points: [
              "Cùng mẫu: 5/6 − 1/6 = (5 − 1)/6 = 4/6 = 2/3.",
              "Khác mẫu: 3/4 − 1/2 = 3/4 − 2/4 = 1/4.",
              "Có thể tìm thành phần chưa biết: x + 2/5 = 4/5 ⇒ x = 4/5 − 2/5 = 2/5.",
            ],
            rule: "Cùng mẫu thì trừ tử số; khác mẫu thì quy đồng trước.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Trừ phân số",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                ["5/6 − 1/6", "cùng mẫu, trừ tử số", "4/6 = 2/3"],
                ["3/4 − 1/2", "quy đồng: 3/4 − 2/4", "1/4"],
                ["7/9 − 4/9", "cùng mẫu", "3/9 = 1/3"],
                ["1 − 2/5", "1 = 5/5", "3/5"],
              ],
              label:
                "Kiểm tra kết quả: kết quả cộng với số trừ phải bằng số bị trừ",
            },
          },
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 6,
              shaded: 5,
              label: "5/6",
              unit: "băng giấy"
            },
            text: "Phân số 5/6: chia băng giấy thành 6 phần bằng nhau\ntô màu 5 phần trong số đó\nĐọc là “5 phần 6”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 6 — chia đều thành 6 phần.",
              "Tử số 5 — lấy 5 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 5/6 = 10/12."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 5/6, mẫu số là số nào?",
            options: [5, 6, 7, 8],
            answer: 6,
            mascotHint: "Mẫu số là số dưới dấu gạch: 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 5/6, tử số là số nào?",
            options: [4, 5, 6, 7],
            answer: 5,
            mascotHint: "Tử số là số TRÊN dấu gạch: 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 5/6 − 1/6 = ?",
            options: ["2/3", "4/6", "1/6", "6/6"],
            answer: "2/3",
            mascotHint: "5/6 − 1/6 = 4/6; rút gọn 4/6 = 2/3.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 − 1/2 = ?",
            options: ["1/4", "1/2", "2/4", "1/8"],
            answer: "1/4",
            mascotHint: "1/2 = 2/4; 3/4 − 2/4 = 1/4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cùng mẫu số: trừ tử số, giữ nguyên mẫu số.",
              "Khác mẫu số: quy đồng rồi trừ.",
              "Rút gọn kết quả nếu được.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c11-l3",
      title: "Bài 62: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập cộng, trừ phân số và giải bài toán có lời văn với phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt đọc 2/5 quyển truyện trong buổi sáng và 1/5 quyển truyện buổi chiều. Cả ngày bạn ấy đọc được bao nhiêu phần quyển truyện? 📚",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập phép cộng, phép trừ phân số",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2/5 + 1/5", "3/5"],
                ["4/5 − 2/5", "2/5"],
                ["3/8 + 1/4", "5/8"],
                ["7/10 − 1/2", "1/5"],
              ],
              label: "Quy đồng mẫu số trước khi cộng hoặc trừ khác mẫu",
            },
          },
        },
        {
          type: "visual",
          content: {
            fractionBar: {
              parts: 5,
              shaded: 2,
              label: "2/5",
              unit: "băng giấy"
            },
            text: "Phân số 2/5: chia băng giấy thành 5 phần bằng nhau\ntô màu 2 phần trong số đó\nĐọc là “2 phần 5”."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đọc và hiểu phân số",
            explanation: "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
            points: [
              "Mẫu số 5 — chia đều thành 5 phần.",
              "Tử số 2 — lấy 2 phần trong số đó.",
              "Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.",
              "Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: 2/5 = 4/10."
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
            question: "Trong phân số 2/5, mẫu số là số nào?",
            options: [2, 4, 5, 6],
            answer: 5,
            mascotHint: "Mẫu số là số dưới dấu gạch: 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/5, tử số là số nào?",
            options: [2, 3, 5, 6],
            answer: 2,
            mascotHint: "Tử số là số TRÊN dấu gạch: 2."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Buổi sáng đọc 2/5 quyển truyện, buổi chiều đọc 1/5 quyển truyện. Cả ngày đọc được bao nhiêu phần quyển truyện?",
            options: ["3/5", "2/5", "3/10", "1/5"],
            answer: "3/5",
            mascotHint: "2/5 + 1/5 = 3/5 quyển truyện.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/8 + 1/4 = ?",
            options: ["5/8", "4/12", "1/2", "3/8"],
            answer: "5/8",
            mascotHint: "1/4 = 2/8; 3/8 + 2/8 = 5/8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 7/10 − 1/2 = ?",
            options: ["1/5", "6/8", "1/2", "2/5"],
            answer: "1/5",
            mascotHint: "1/2 = 5/10; 7/10 − 5/10 = 2/10 = 1/5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thành thạo cộng, trừ phân số cùng mẫu và khác mẫu.",
              "Rút gọn kết quả.",
              "Đọc kĩ đề để biết cộng hay trừ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
