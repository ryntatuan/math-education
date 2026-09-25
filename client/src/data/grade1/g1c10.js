export const g1c10 = {
  id: "g1-c10",
  name: "Chủ đề 10: Ôn tập cuối năm",
  description:
    "Ôn tập số và phép tính trong phạm vi 10 và 100, hình học, đo lường và thời gian",
  icon: "🎓",
  color: "#06d6a0",
  totalLessons: 9,
  lessons: [
    {
      id: "g1-c10-l1",
      title: "Bài 1: Ôn tập các số trong phạm vi 10",
      type: "learn",
      description: "Ôn lại đếm, so sánh và tách gộp các số đến 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Sắp hết năm học rồi! Mình ôn lại từ đầu cho thật chắc nhé 📖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các số trong phạm vi 10",
            explanation:
              "Bé nhớ lại: đếm xuôi, đếm ngược, so sánh và tách gộp số.",
            rule: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số liền sau của 9 là 10; liền trước của 10 là 9.",
            points: [
              "Số lớn nhất trong phạm vi 10 là 10.",
              "10 gồm 6 và 4; gồm 5 và 5.",
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
              label: "Liền sau của 9 là 10 · liền trước của 10 là 9",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 9 là số nào?",
            options: [8, 10, 11, 90],
            answer: 10,
            mascotHint: "9 thêm 1 được 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 gồm 6 và mấy?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "6 + 4 = 10.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Số liền sau của 9 là 10.", "10 gồm 6 và 4."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l2",
      title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 10",
      type: "learn",
      description:
        "Ôn lại bảng cộng, bảng trừ trong phạm vi 10 trước khi lên lớp 2",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bảng cộng và bảng trừ trong phạm vi 10 — bé còn nhớ hết không? 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Cộng trừ trong phạm vi 10",
            explanation:
              "Cộng thì đếm tiếp; trừ thì đếm lùi. Từ một phép cộng viết được hai phép trừ.",
            rule: "6 + 4 = 10 → 10 − 6 = 4 và 10 − 4 = 6.",
            points: [
              "Số nào cộng 0 cũng bằng chính nó.",
              "Hai số bằng nhau trừ nhau thì bằng 0.",
              "5 + 5 = 10; 10 − 5 = 5.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "6 + 4 = 10\n10 − 6 = 4\n10 − 4 = 6",
            operation: {
              left: 6,
              sign: "+",
              right: 4,
              result: 10,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["6 + 4", "10"],
                ["10 − 6", "4"],
                ["10 − 4", "6"],
              ],
              label: "6 + 4 = 10 → 10 − 6 = 4 và 10 − 4 = 6",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "9 − 4 bằng bao nhiêu?",
            options: [4, 5, 6, 13],
            answer: 5,
            mascotHint: "Vì 4 + 5 = 9 nên 9 − 4 = 5.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 + 7 bằng bao nhiêu?",
            options: [9, 10, 11, 4],
            answer: 10,
            mascotHint: "3 + 7 = 10.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "9 − 4 = 5; 3 + 7 = 10.",
              "Từ phép cộng viết được hai phép trừ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l3",
      title: "Bài 3: Ôn tập các số trong phạm vi 100",
      type: "learn",
      description: "Ôn lại số có hai chữ số, so sánh và số liền trước liền sau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Các số đến 100 — bé nhớ hàng chục và hàng đơn vị chứ? 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số trong phạm vi 100",
            explanation:
              "Số có hai chữ số gồm hàng chục và hàng đơn vị. So sánh thì so hàng chục trước.",
            rule: "47 gồm 4 chục và 7 đơn vị. 47 = 40 + 7. So sánh: 35 < 53.",
            points: [
              "Số lớn nhất có hai chữ số là 99.",
              "Số bé nhất có hai chữ số là 10.",
              "Số tròn chục tận cùng bằng 0.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "47 = 40 + 7\n35  <  53",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [4, 7],
              label: "47 = 40 + 7",
            },
            comparison: {
              left: 35,
              sign: "<",
              right: 53,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 47 gồm mấy chục và mấy đơn vị?",
            options: [
              "4 chục và 7 đơn vị",
              "7 chục và 4 đơn vị",
              "47 chục",
              "4 chục và 0 đơn vị",
            ],
            answer: "4 chục và 7 đơn vị",
            mascotHint: "Chữ số 4 chỉ chục, chữ số 7 chỉ đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền trước của 60 là số nào?",
            options: [59, 61, 50, 600],
            answer: 59,
            mascotHint: "60 bớt 1 được 59.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "47 = 4 chục 7 đơn vị = 40 + 7.",
              "Số liền trước của 60 là 59.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l4",
      title: "Bài 4: Ôn tập phép cộng, phép trừ trong phạm vi 100",
      type: "learn",
      description: "Ôn lại cộng trừ (không nhớ) số có hai chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cộng trừ số có hai chữ số — bé nhớ cách đặt tính chứ? ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Cộng trừ trong phạm vi 100",
            explanation:
              "Đặt tính thẳng cột rồi tính từ phải sang trái. Lớp 1 chỉ học cộng trừ KHÔNG nhớ, KHÔNG mượn.",
            rule: "25 + 4 = 29; 32 + 14 = 46; 57 − 23 = 34.",
            points: [
              "Hàng đơn vị cộng lại bé hơn 10 nên không nhớ.",
              "Hàng đơn vị trừ được nên không mượn.",
              "Thử lại bằng phép tính ngược.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba phép tính bé đã học trong chủ đề 8",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["25 + 4", "29"],
                ["32 + 14", "46"],
                ["57 − 23", "34"],
              ],
              label: "Ôn tập cộng trừ trong phạm vi 100",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 32 + 14",
            cotTinh: {
              left: 32,
              right: 14,
              sign: "+",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 57 − 23",
            cotTinh: {
              left: 57,
              right: 23,
              sign: "−",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "43 + 25 bằng bao nhiêu?",
            options: [58, 68, 65, 78],
            answer: 68,
            mascotHint: "3 + 5 = 8; 4 + 2 = 6. Kết quả 68.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "86 − 31 bằng bao nhiêu?",
            options: [45, 55, 65, 117],
            answer: 55,
            mascotHint: "6 − 1 = 5; 8 − 3 = 5. Kết quả 55.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "43 + 25 = 68; 86 − 31 = 55.",
              "Lớp 1 học cộng trừ không nhớ, không mượn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l5",
      title: "Bài 5: Ôn tập hình học",
      type: "learn",
      description: "Ôn tập hình phẳng, hình khối và vị trí",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Các hình đang chờ bé ôn lại đấy! 🔷",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Hình học Lớp 1",
            explanation:
              "Hình phẳng: vuông, tròn, tam giác, chữ nhật. Hình khối: khối lập phương, khối hộp chữ nhật.",
            rule: "Hình vuông: 4 cạnh bằng nhau. Hình tam giác: 3 cạnh. Khối lập phương: 6 mặt vuông bằng nhau.",
            points: [
              "Hình tròn không có cạnh, có đường bao cong.",
              "Hình chữ nhật có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
              "Khối hộp chữ nhật có 6 mặt không đều nhau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "▢ Hình vuông · ⭕ Hình tròn · 🔺 Hình tam giác · ▭ Hình chữ nhật",
            planeShape: {
              kind: "square",
              labels: ["cạnh"],
              vertices: true,
              formula: "Hình vuông: 4 cạnh bằng nhau",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🎲 Khối lập phương · 📦 Khối hộp chữ nhật",
            solid: {
              kind: "cube",
              dims: {
                a: 3,
              },
              label: "Khối lập phương",
              formula: "6 mặt đều là hình vuông bằng nhau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 3 cạnh?",
            options: [
              "Hình tam giác",
              "Hình vuông",
              "Hình tròn",
              "Hình chữ nhật",
            ],
            answer: "Hình tam giác",
            mascotHint: "Hình tam giác có 3 cạnh.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khối nào có 6 mặt không đều nhau?",
            options: [
              "Khối hộp chữ nhật",
              "Khối lập phương",
              "Hình tròn",
              "Hình tam giác",
            ],
            answer: "Khối hộp chữ nhật",
            mascotHint: "Khối hộp chữ nhật có 6 mặt, các mặt không đều nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bốn hình phẳng và hai loại khối.",
              "Hình tam giác: 3 cạnh.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l6",
      title: "Bài 6: Ôn tập đo độ dài",
      type: "learn",
      description: "Ôn tập so sánh độ dài và đo bằng xăng-ti-mét",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé lấy thước ra đo một vật bất kì xem nào! 📏",
            ruler: {
              from: 0,
              to: 10,
              unit: "cm",
              markAt: [0, 5, 10],
              label: "Thước có vạch chia xăng-ti-mét",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Đo độ dài",
            explanation:
              "Đơn vị đo độ dài là xăng-ti-mét (cm). Đo bằng thước: đặt vạch 0 vào một đầu vật.",
            rule: "Đoạn thẳng dài 5 cm nếu đầu kia trùng vạch 5 của thước.",
            points: [
              "So sánh độ dài: đặt hai vật cạnh nhau, một đầu thẳng hàng.",
              "Có thể đo bằng gang tay khi chưa có thước.",
              "Đơn vị cm viết sau số: 5 cm.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "0 ————— 5\n→ dài 5 cm",
            ruler: {
              lengthCm: 5,
              measure: {
                from: 0,
                to: 5,
              },
              label: "Đoạn thẳng dài 5 cm nếu đầu kia trùng vạch 5 của thước",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đoạn thẳng có một đầu ở vạch 0 và đầu kia ở vạch 8. Đoạn thẳng dài bao nhiêu?",
            options: ["7 cm", "8 cm", "9 cm", "80 cm"],
            answer: "8 cm",
            mascotHint: "Đọc số ở đầu kia: 8 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đơn vị đo độ dài là cm.",
              "Đặt vạch 0 vào một đầu vật rồi đọc số ở đầu kia.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l7",
      title: "Bài 7: Ôn tập thời gian — giờ và lịch",
      type: "learn",
      description: "Ôn tập xem giờ đúng, các ngày trong tuần và xem lịch",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Đồng hồ và tờ lịch — hai người bạn quen thuộc của bé! 🕐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Giờ và lịch",
            explanation:
              "Bé đọc giờ đúng theo kim ngắn khi kim dài chỉ 12. Trên lịch, cùng một cột là cùng một thứ.",
            rule: "Kim ngắn chỉ 8, kim dài chỉ 12 → 8 giờ. Một tuần có 7 ngày.",
            points: [
              "Buổi sáng, trưa, chiều, tối.",
              "Hôm qua lùi 1 ngày, ngày mai tiến 1 ngày.",
              "Lớp 1 chỉ học GIỜ ĐÚNG (kim dài chỉ 12).",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Kim ngắn 8 + kim dài 12  →  8 giờ\n1 tuần = 7 ngày",
            clock: {
              hour: 8,
              minute: 0,
              timeText: "8 giờ",
            },
            table: {
              headers: ["Đại lượng", "Bằng"],
              rows: [
                ["1 tuần", "7 ngày"],
                ["1 ngày", "24 giờ"],
              ],
              label: "Ôn tập thời gian — giờ và lịch",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Một tuần lễ có bao nhiêu ngày?",
            options: [5, 6, 7, 12],
            answer: 7,
            mascotHint: "Một tuần có 7 ngày.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Đọc giờ đúng theo kim ngắn.", "Một tuần có 7 ngày."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c10-l8",
      title: "Bài 8: Ôn tập chung cuối năm",
      type: "learn",
      description: "Ôn tập tổng hợp toàn bộ chương trình Lớp 1",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã đi hết cả năm Lớp 1 rồi! Cùng nhìn lại chặng đường nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập Chung",
            title: "Cả năm Lớp 1 bé đã học gì?",
            explanation:
              "Số đến 100; cộng trừ trong phạm vi 10 và 100 (không nhớ); hình phẳng, hình khối; đo độ dài; giờ và lịch.",
            points: [
              "Số: đếm, đọc, viết, so sánh, tách gộp.",
              "Phép tính: cộng và trừ.",
              "Hình học: 4 hình phẳng, 2 loại khối, vị trí.",
              "Đo lường: xăng-ti-mét. Thời gian: giờ đúng, ngày trong tuần, lịch.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Số đến 100 · Cộng trừ · Hình học · Đo độ dài · Giờ và lịch",
            table: {
              headers: ["Mạch kiến thức", "Ví dụ"],
              rows: [
                ["Số đến 100", "47 = 40 + 7"],
                ["Cộng trừ", "32 + 14 = 46"],
                ["Hình học", "hình vuông · khối lập phương"],
                ["Đo độ dài", "đoạn thẳng 5 cm"],
                ["Giờ và lịch", "8 giờ · 1 tuần = 7 ngày"],
              ],
              label: "Ôn tập chung cuối năm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Có 26 con gà, mua thêm 12 con. Hỏi có tất cả bao nhiêu con gà?",
            options: [38, 36, 14, 48],
            answer: 38,
            mascotHint: "26 + 12 = 38 con gà.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn nhất: 45, 54, 9, 60?",
            options: [45, 54, 9, 60],
            answer: 60,
            mascotHint: "60 là số lớn nhất trong bốn số.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé giỏi lắm:",
            points: [
              "Bé đã ôn xong toàn bộ chương trình Lớp 1.",
              "Bé nắm chắc số đến 100, cộng trừ, hình học, đo độ dài và xem giờ.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c10-l9",
      title: "Bài 9: Luyện đề cuối năm Lớp 1",
      type: "learn",
      description: "Luyện tập dạng đề kiểm tra cuối năm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đây là những dạng bài bé sẽ gặp trong bài kiểm tra cuối năm. Mình thử sức nhé! 🏆",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Đề",
            title: "Các dạng bài thường gặp",
            explanation:
              "Đề cuối năm thường có: đọc viết số, so sánh số, đặt tính rồi tính, bài toán có lời văn, hình học, đo độ dài và xem giờ.",
            points: [
              "Đặt tính thẳng cột rồi tính từ phải sang trái.",
              "Đọc kĩ đề để chọn đúng phép tính.",
              "Ghi đơn vị và đáp số đầy đủ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đọc số · So sánh · Đặt tính · Giải toán · Hình học · Xem giờ",
            table: {
              headers: ["Dạng bài", "Ví dụ"],
              rows: [
                ["Đọc số", "47"],
                ["So sánh", "35 < 53"],
                ["Đặt tính", "32 + 14 = 46"],
                ["Giải toán", "5 + 2 = 7"],
                ["Hình học", "hình tam giác"],
                ["Xem giờ", "7 giờ"],
              ],
              label: "Luyện đề cuối năm Lớp 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 63 ? 36",
            options: [">", "<", "="],
            answer: ">",
            mascotHint: "6 chục lớn hơn 3 chục nên 63 > 36.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một hình vuông có cạnh dài 3 cm. Hình vuông đó có mấy cạnh?",
            options: ["3 cạnh", "4 cạnh", "5 cạnh", "6 cạnh"],
            answer: "4 cạnh",
            mascotHint: "Hình vuông luôn có 4 cạnh bằng nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé giỏi lắm:",
            points: [
              "Bé đã hoàn thành chương trình Toán Lớp 1 theo đúng SGK.",
              "Chúc mừng bé lên Lớp 2!",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
