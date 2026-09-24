export const g1c5 = {
  id: "g1-c5",
  name: "Chủ đề 5: Ôn tập học kì 1",
  description:
    "Ôn tập các số trong phạm vi 10, phép cộng trừ trong phạm vi 10 và hình học",
  icon: "📖",
  color: "#90be6d",
  totalLessons: 6,
  lessons: [
    {
      id: "g1-c5-l1",
      title: "Bài 1: Ôn tập các số trong phạm vi 10",
      type: "learn",
      description: "Ôn lại đọc, viết, đếm và tách gộp các số đến 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hết học kì 1 rồi! Mình cùng ôn lại các số thật chắc nhé 📖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các số trong phạm vi 10",
            explanation:
              "Bé nhớ lại: đếm xuôi, đếm ngược, so sánh số và tách gộp số.",
            rule: "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số liền sau 7 là 8; số liền trước 7 là 6.",
            points: [
              "Đếm ngược từ 10: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.",
              "10 gồm 7 và 3; gồm 6 và 4.",
              "Miệng dấu quay về số lớn hơn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10",
            numberLine: {
              from: 0,
              to: 10,
              step: 1,
              marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              label: "Ôn lại các số từ 0 đến 10",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 7 là số nào?",
            options: [6, 8, 9, 10],
            answer: 8,
            mascotHint: "7 thêm 1 được 8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 gồm 7 và mấy?",
            options: [2, 3, 4, 7],
            answer: 3,
            mascotHint: "7 + 3 = 10 nên 10 gồm 7 và 3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Các số từ 0 đến 10.",
              "Số liền sau của 7 là 8; 10 gồm 7 và 3.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c5-l2",
      title: "Bài 2: Ôn tập so sánh số",
      type: "learn",
      description: "Ôn lại so sánh số và nhiều hơn, ít hơn, bằng nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bé còn nhớ miệng dấu quay về số nào không? Cùng kiểm tra nhé! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "So sánh số",
            explanation:
              "Dấu > là lớn hơn, < là bé hơn, = là bằng nhau. Miệng dấu luôn quay về số LỚN hơn.",
            rule: "8 > 5; 5 < 8; 8 = 8.",
            points: [
              "Ghép đôi để biết bên nào nhiều hơn.",
              "Số đứng sau trong dãy số thì lớn hơn.",
              "10 là số lớn nhất trong phạm vi 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "8  >  5\n5  <  8\n8  =  8",
            comparison: {
              left: 8,
              sign: ">",
              right: 5,
            },
            table: {
              headers: ["So sánh", "Dấu"],
              rows: [
                ["8 với 5", ">"],
                ["5 với 8", "<"],
                ["8 với 8", "="],
              ],
              label: "Ôn tập so sánh số",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 4 ? 9",
            options: [">", "<", "="],
            answer: "<",
            mascotHint: "4 bé hơn 9 nên dùng dấu <.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Miệng dấu quay về số lớn hơn.", "4 < 9; 8 > 5."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c5-l3",
      title: "Bài 3: Ôn tập phép cộng, phép trừ trong phạm vi 10",
      type: "learn",
      description:
        "Ôn lại bảng cộng, bảng trừ trong phạm vi 10 để chuẩn bị thi học kì 1",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bảng cộng và bảng trừ — bé còn nhớ hết không? 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Cộng trừ trong phạm vi 10",
            explanation:
              "Cộng thì đếm tiếp; trừ thì đếm lùi. Từ một phép cộng viết được hai phép trừ.",
            rule: "4 + 5 = 9 → 9 − 4 = 5 và 9 − 5 = 4.",
            points: [
              "Số nào cộng 0 cũng bằng chính nó.",
              "Hai số bằng nhau trừ nhau thì bằng 0.",
              "Cộng rồi trừ cùng một số thì về số ban đầu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 + 5 = 9\n9 − 4 = 5\n9 − 5 = 4",
            operation: {
              left: 4,
              sign: "+",
              right: 5,
              result: 9,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["4 + 5", "9"],
                ["9 − 4", "5"],
                ["9 − 5", "4"],
              ],
              label: "Ôn tập cộng trừ trong phạm vi 10",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "7 + 3 bằng bao nhiêu?",
            options: [9, 10, 11, 4],
            answer: 10,
            mascotHint: "7 + 3 = 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 − 7 bằng bao nhiêu?",
            options: [2, 3, 4, 17],
            answer: 3,
            mascotHint: "Vì 7 + 3 = 10 nên 10 − 7 = 3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "7 + 3 = 10; 10 − 7 = 3.",
              "Từ phép cộng viết được hai phép trừ.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c5-l4",
      title: "Bài 4: Ôn tập hình học",
      type: "learn",
      description: "Ôn lại hình phẳng và hình khối đã học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã học bao nhiêu hình rồi nhỉ? Kể lại xem! 🔷",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Hình phẳng và hình khối",
            explanation:
              "Hình phẳng: hình vuông, hình tròn, hình tam giác, hình chữ nhật. Hình khối: khối lập phương, khối hộp chữ nhật.",
            rule: "Hình vuông có 4 cạnh bằng nhau; hình tam giác có 3 cạnh.",
            points: [
              "Hình tròn có đường bao cong, không cạnh.",
              "Hình chữ nhật có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
              "Khối lập phương có 6 mặt vuông bằng nhau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "▢ Hình vuông · ⭕ Hình tròn · 🔺 Hình tam giác · ▭ Hình chữ nhật",
            table: {
              headers: ["Hình", "Đặc điểm"],
              rows: [
                ["Hình vuông", "4 cạnh dài bằng nhau"],
                ["Hình tròn", "Đường bao cong"],
                ["Hình tam giác", "3 cạnh, 3 đỉnh"],
                ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
              ],
              label: "Ôn tập hình học",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 4 cạnh dài bằng nhau?",
            options: [
              "Hình vuông",
              "Hình chữ nhật",
              "Hình tam giác",
              "Hình tròn",
            ],
            answer: "Hình vuông",
            mascotHint: "Hình vuông có 4 cạnh bằng nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khối nào có 6 mặt đều là hình vuông?",
            options: [
              "Khối lập phương",
              "Khối hộp chữ nhật",
              "Hình tròn",
              "Hình chữ nhật",
            ],
            answer: "Khối lập phương",
            mascotHint: "Khối lập phương có 6 mặt vuông bằng nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bốn hình phẳng và hai loại khối.",
              "Hình vuông: 4 cạnh bằng nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c5-l5",
      title: "Bài 5: Ôn tập vị trí trong không gian",
      type: "learn",
      description: "Ôn lại trên dưới, trước sau, trái phải",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé nói vị trí của đồ vật trong phòng học xem nào! 🪑",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Nói vị trí",
            explanation:
              "Bé dùng các từ trên, dưới, trước, sau, trái, phải để nói vị trí đồ vật.",
            rule: "Đèn học ở TRÊN bàn. Cặp sách ở DƯỚI bàn. Thước kẻ ở BÊN PHẢI quyển vở.",
            points: [
              "Nói rõ theo từng hướng.",
              "Có thể dùng tay chỉ để làm rõ hơn.",
              "Vị trí trái phải phụ thuộc vào người đứng nhìn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "💡 đèn ở TRÊN bàn\n🎒 cặp ở DƯỚI bàn",
            table: {
              headers: ["Đồ vật", "Vị trí"],
              rows: [
                ["Đèn bàn", "Ở trên bàn"],
                ["Cặp sách", "Ở dưới bàn"],
              ],
              label: "Ôn tập vị trí trong không gian",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cặp sách đặt dưới mặt bàn. Cặp sách ở đâu so với mặt bàn?",
            options: ["Ở dưới", "Ở trên", "Bên trái", "Ở trước"],
            answer: "Ở dưới",
            mascotHint: "Đặt dưới mặt bàn nghĩa là ở phía dưới.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Nói vị trí bằng: trên, dưới, trước, sau, trái, phải.",
              "Đèn học ở trên bàn, cặp sách ở dưới bàn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c5-l6",
      title: "Bài 6: Ôn tập chung học kì 1",
      type: "learn",
      description: "Ôn tập tổng hợp toàn bộ học kì 1 lớp 1",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã đi hết nửa năm Lớp 1 rồi! Mình cùng nhìn lại nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập Chung",
            title: "Học kì 1 bé đã học gì?",
            explanation:
              "Bé đã học các số đến 10, phép cộng trừ trong phạm vi 10, các hình phẳng, hai loại khối và vị trí trong không gian.",
            points: [
              "Số: đếm, đọc, viết, so sánh, tách gộp.",
              "Phép tính: cộng và trừ trong phạm vi 10.",
              "Hình: vuông, tròn, tam giác, chữ nhật, khối lập phương, khối hộp chữ nhật.",
              "Vị trí: trên, dưới, trước, sau, trái, phải.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Số đến 10 · Cộng trừ · Hình học · Vị trí",
            table: {
              headers: ["Nội dung ôn", "Ví dụ"],
              rows: [
                ["Số đến 10", "0 → 10"],
                ["Cộng trừ", "4 + 5 = 9"],
                ["Hình học", "vuông · tròn · tam giác"],
                ["Vị trí", "trên · dưới · trái · phải"],
              ],
              label: "Ôn tập chung học kì 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Có 6 con vịt, thêm 3 con nữa. Hỏi có tất cả bao nhiêu con vịt?",
            options: [3, 8, 9, 10],
            answer: 9,
            mascotHint: "Thêm vào thì cộng: 6 + 3 = 9 con vịt.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn nhất: 3, 8, 5, 10?",
            options: [3, 8, 5, 10],
            answer: 10,
            mascotHint: "10 là số lớn nhất trong bốn số.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé giỏi lắm:",
            points: [
              "Bé đã hoàn thành học kì 1 của Lớp 1.",
              "Sang học kì 2, bé sẽ học các số đến 100.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
