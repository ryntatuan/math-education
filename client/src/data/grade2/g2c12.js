export const g2c12 = {
  id: "g2-c12",
  name: "Chủ đề 12: Phép cộng, phép trừ trong phạm vi 1 000",
  description: "Cộng trừ không nhớ và có nhớ trong phạm vi 1 000",
  icon: "🔢",
  color: "#118ab2",
  totalLessons: 9,
  lessons: [
    {
      id: "g2-c12-l1",
      title: "Bài 1: Phép cộng (không nhớ) trong phạm vi 1 000",
      type: "learn",
      description: "Đặt tính và cộng không nhớ các số có ba chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bây giờ các số đã có ba chữ số. Bé vẫn đặt tính thẳng cột như trước nhé! 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng không nhớ",
            explanation:
              "Cộng lần lượt từ hàng đơn vị, đến hàng chục, rồi hàng trăm. Nếu từng hàng đều bé hơn 10 thì gọi là cộng KHÔNG NHỚ.",
            rule: "235 + 412: 5 + 2 = 7, 3 + 1 = 4, 2 + 4 = 6. Kết quả 647.",
            points: [
              "Luôn tính từ phải sang trái.",
              "Đặt các chữ số cùng hàng thẳng cột với nhau.",
              "Không nhớ nghĩa là từng hàng cộng lại đều bé hơn 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 235 + 412",
            cotTinh: {
              left: 235,
              right: 412,
              sign: "+",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "235 + 412 bằng bao nhiêu?",
            options: [547, 647, 657, 6470],
            answer: 647,
            mascotHint: "5+2=7, 3+1=4, 2+4=6. Kết quả 647.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Cộng từ hàng đơn vị sang hàng trăm.", "235 + 412 = 647."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c12-l2",
      title: "Bài 2: Phép cộng (có nhớ) trong phạm vi 1 000",
      type: "learn",
      description: "Cộng có nhớ khi một hàng vượt quá 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "256 + 173: hàng chục 5 + 7 = 12, vượt qua 10 rồi. Bé xử lý thế nào? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng có nhớ",
            explanation:
              "Khi một hàng cộng lại được từ 10 trở lên, ta viết chữ số hàng đơn vị của kết quả và NHỚ 1 sang hàng liền trước.",
            rule: "256 + 173: 6 + 3 = 9, viết 9. 5 + 7 = 12, viết 2 nhớ 1. 2 + 1 + 1 = 4. Kết quả 429.",
            points: [
              "Nhớ 1 sang hàng bên trái.",
              "Có thể nhớ ở hàng chục hoặc ở hàng trăm.",
              "356 + 127 = 483 (6+7=13 viết 3 nhớ 1; 5+2+1=8; 3+1=4).",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 256 + 173",
            cotTinh: {
              left: 256,
              right: 173,
              sign: "+",
              remember: true,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "256 + 173 bằng bao nhiêu?",
            options: [329, 419, 429, 439],
            answer: 429,
            mascotHint: "6+3=9; 5+7=12 viết 2 nhớ 1; 2+1+1=4. Kết quả 429.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "356 + 127 bằng bao nhiêu?",
            options: [473, 483, 493, 423],
            answer: 483,
            mascotHint: "6+7=13 viết 3 nhớ 1; 5+2+1=8; 3+1=4. Kết quả 483.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng có nhớ: nhớ 1 sang hàng bên trái.",
              "256 + 173 = 429.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c12-l3",
      title: "Bài 3: Luyện tập phép cộng trong phạm vi 1 000",
      type: "learn",
      description: "Luyện tập cộng có nhớ và giải bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Thư viện có 265 quyển sách, nhập thêm 148 quyển. Có tất cả bao nhiêu nhỉ? 📚",
            items: [
              {
                emoji: "📕",
                label: "Quyển sách",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Cộng trong bài toán",
            explanation:
              "Bài toán 'có ... thêm ...' thì dùng phép cộng. Chú ý nhớ 1 khi cần.",
            rule: "265 + 148: 5 + 8 = 13 viết 3 nhớ 1; 6 + 4 + 1 = 11 viết 1 nhớ 1; 2 + 1 + 1 = 4. Kết quả 413.",
            points: [
              "265 + 148 = 413 (quyển sách).",
              "Có thể phải nhớ hai lần liên tiếp.",
              "Thử lại bằng phép trừ: 413 − 148 = 265.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 265 + 148",
            cotTinh: {
              left: 265,
              right: 148,
              sign: "+",
              remember: true,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Thư viện có 265 quyển sách, nhập thêm 148 quyển. Hỏi có tất cả bao nhiêu quyển sách?",
            options: [313, 402, 413, 423],
            answer: 413,
            mascotHint: "265 + 148 = 413 quyển sách.",
            items: [
              {
                emoji: "📕",
                label: "Quyển sách",
                count: 1,
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Cộng có thể phải nhớ nhiều lần.", "265 + 148 = 413."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c12-l4",
      title: "Bài 4: Phép trừ (không nhớ) trong phạm vi 1 000",
      type: "learn",
      description: "Đặt tính và trừ không mượn các số có ba chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "645 − 213 thì không phải mượn lần nào cả. Bé tính thử nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ không mượn",
            explanation:
              "Trừ lần lượt từ hàng đơn vị, đến hàng chục, rồi hàng trăm. Nếu từng hàng đều trừ được thì gọi là trừ KHÔNG MƯỢN.",
            rule: "645 − 213: 5 − 3 = 2, 4 − 1 = 3, 6 − 2 = 4. Kết quả 432.",
            points: [
              "Đặt số trừ ngay dưới số bị trừ, thẳng cột.",
              "Trừ từ phải sang trái.",
              "Thử lại: 432 + 213 = 645.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 645 − 213",
            cotTinh: {
              left: 645,
              right: 213,
              sign: "−",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "645 − 213 bằng bao nhiêu?",
            options: [422, 432, 442, 532],
            answer: 432,
            mascotHint: "5−3=2, 4−1=3, 6−2=4. Kết quả 432.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Trừ không mượn: trừ thẳng từng hàng.",
              "645 − 213 = 432.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c12-l5",
      title: "Bài 5: Phép trừ (có nhớ) trong phạm vi 1 000",
      type: "learn",
      description: "Trừ có mượn khi chữ số không đủ để trừ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "534 − 268: 4 không trừ được 8. Bé phải mượn, và có thể mượn hai lần đấy! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ có mượn",
            explanation:
              "Khi chữ số của số bị trừ bé hơn chữ số cùng hàng của số trừ, ta MƯỢN 1 từ hàng bên trái.",
            rule: "534 − 268: 4 không trừ được 8, mượn 1 chục: 14 − 8 = 6. Hàng chục: 3 bớt 1 còn 2, 2 không trừ được 6, mượn 1 trăm: 12 − 6 = 6. Hàng trăm: 5 bớt 1 còn 4, 4 − 2 = 2. Kết quả 266.",
            points: [
              "Mượn 1 ở hàng bên trái, hàng đó giảm đi 1.",
              "Có thể phải mượn hai lần liên tiếp.",
              "Thử lại: 266 + 268 = 534.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 534 − 268",
            cotTinh: {
              left: 534,
              right: 268,
              sign: "−",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "534 − 268 bằng bao nhiêu?",
            options: [256, 266, 276, 334],
            answer: 266,
            mascotHint: "Mượn hai lần: 14−8=6; 12−6=6; 4−2=2. Kết quả 266.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Trừ có mượn: mượn 1 ở hàng bên trái.",
              "534 − 268 = 266.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c12-l6",
      title: "Bài 6: Luyện tập phép trừ trong phạm vi 1 000",
      type: "learn",
      description: "Luyện tập trừ có mượn và giải bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cửa hàng có 420 kg gạo, đã bán 165 kg. Còn lại bao nhiêu ki-lô-gam? 🍚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Trừ trong bài toán",
            explanation: "Bài toán 'bán đi, cho đi, bớt đi' thì dùng phép trừ.",
            rule: "420 − 165: 0 không trừ được 5, mượn 1 chục: 10 − 5 = 5. Hàng chục: 2 bớt 1 còn 1, 1 không trừ được 6, mượn 1 trăm: 11 − 6 = 5. Hàng trăm: 4 bớt 1 còn 3, 3 − 1 = 2. Kết quả 255.",
            points: [
              "420 − 165 = 255 (kg gạo).",
              "Chú ý chữ số 0 ở hàng đơn vị — vẫn phải mượn bình thường.",
              "Thử lại: 255 + 165 = 420.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 420 − 165",
            cotTinh: {
              left: 420,
              right: 165,
              sign: "−",
              remember: false,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cửa hàng có 420 kg gạo, đã bán 165 kg. Hỏi còn lại bao nhiêu ki-lô-gam gạo?",
            options: [255, 265, 355, 585],
            answer: 255,
            mascotHint: "420 − 165 = 255 kg gạo.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Trừ có mượn hai lần vẫn làm như thường.",
              "420 − 165 = 255.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c12-l7",
      title: "Bài 7: Tìm thành phần chưa biết",
      type: "learn",
      description: "Tìm số hạng, số bị trừ, số trừ chưa biết",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có một số bị che mất: ... + 145 = 320. Bé tìm giúp Rô-bốt nhé! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Tìm thành phần chưa biết",
            explanation:
              "Muốn tìm số hạng chưa biết, lấy tổng trừ số hạng đã biết. Muốn tìm số bị trừ, lấy hiệu cộng số trừ. Muốn tìm số trừ, lấy số bị trừ trừ hiệu.",
            rule: "... + 145 = 320 → số cần tìm = 320 − 145 = 175.",
            points: [
              "Tìm số hạng: tổng − số hạng đã biết.",
              "Tìm số bị trừ: hiệu + số trừ.",
              "Tìm số trừ: số bị trừ − hiệu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "? + 145 = 320  →  ? = 320 − 145 = 175",
            numberLine: {
              from: 145,
              to: 320,
              step: 5,
              marks: [145, 320],
              hops: [
                {
                  from: 145,
                  to: 320,
                  label: "+175",
                },
              ],
              label: "? + 145 = 320 ⇒ ? = 320 − 145 = 175",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: ? + 145 = 320",
            options: [165, 175, 185, 465],
            answer: 175,
            mascotHint:
              "Số hạng chưa biết = tổng − số hạng đã biết = 320 − 145 = 175.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: 500 − ? = 260",
            options: [240, 250, 260, 760],
            answer: 240,
            mascotHint: "Số trừ = số bị trừ − hiệu = 500 − 260 = 240.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Tìm số hạng: lấy tổng trừ số hạng đã biết.",
              "Tìm số trừ: lấy số bị trừ trừ hiệu.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c12-l8",
      title: "Bài 8: Bài toán có lời văn trong phạm vi 1 000",
      type: "learn",
      description: "Giải bài toán có lời văn với số có ba chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đội Một trồng 245 cây, đội Hai trồng 168 cây. Cả hai đội trồng bao nhiêu cây? 🌳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "Đọc kĩ đề để chọn phép tính",
            explanation:
              "'Cả hai đội' là gom lại thì dùng phép CỘNG. 'Đội Một hơn đội Hai bao nhiêu' là so sánh thì dùng phép TRỪ.",
            rule: "Cả hai đội trồng: 245 + 168 = 413 (cây). Đội Một hơn đội Hai: 245 − 168 = 77 (cây).",
            points: [
              "245 + 168: 5+8=13 viết 3 nhớ 1; 4+6+1=11 viết 1 nhớ 1; 2+1+1=4. Kết quả 413.",
              "Đơn vị của đáp án là cây.",
              "Luôn ghi đáp số.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đội Một: 245 cây\nĐội Hai: 168 cây\nCả hai đội: 245 + 168 = 413 (cây)",
            barModel: {
              rows: [
                {
                  label: "Đội Một",
                  parts: 245,
                },
                {
                  label: "Đội Hai",
                  parts: 168,
                },
              ],
              braceLabel: "Cả hai đội: 245 + 168 = 413 cây",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đội Một trồng 245 cây, đội Hai trồng 168 cây. Hỏi cả hai đội trồng được bao nhiêu cây?",
            options: [313, 403, 413, 77],
            answer: 413,
            mascotHint: "245 + 168 = 413 cây.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Với hai đội trên, đội Một trồng nhiều hơn đội Hai bao nhiêu cây?",
            options: [77, 87, 123, 413],
            answer: 77,
            mascotHint: "245 − 168 = 77 cây.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Gom lại thì cộng; so sánh hơn kém thì trừ.",
              "245 + 168 = 413; 245 − 168 = 77.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c12-l9",
      title: "Bài 9: Luyện tập chung chủ đề 12",
      type: "learn",
      description: "Ôn tập cộng trừ trong phạm vi 1 000",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã tính được với số có ba chữ số rồi! Tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 12",
            explanation:
              "Bé đã học cộng trừ không nhớ và có nhớ trong phạm vi 1 000.",
            points: [
              "Cộng: nhớ 1 sang hàng bên trái khi hàng đó vượt 9.",
              "Trừ: mượn 1 từ hàng bên trái khi không đủ để trừ.",
              "Thử lại bằng phép tính ngược để chắc chắn.",
            ],
          },
        },
                {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 256 + 173\nLuyện tập chung chủ đề 12\n1) hàng đơn vị 6 + 3 = 9, viết 9\n2) hàng chục 5 + 7 = 12, viết 2 nhớ 1\n3) hàng trăm 2 + 1 + 1 (nhớ) = 4, viết 4\nVậy 256 + 173 = 429.",
            "cotTinh": {
              "left": 256,
              "right": 173,
              "sign": "+",
              "remember": true
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 429 − 173\n1) hàng đơn vị 9 − 3 = 6, viết 6\n2) hàng chục 2 < 7 nên mượn 1: 12 − 7 = 5, viết 5\n3) hàng trăm 4 − 2 = 2, viết 2\nVậy 429 − 173 = 256.",
            "cotTinh": {
              "left": 429,
              "right": 173,
              "sign": "−"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 534 − 268\n1) hàng đơn vị 4 < 8 nên mượn 1: 14 − 8 = 6, viết 6\n2) hàng chục 3 < 7 nên mượn 1: 13 − 7 = 6, viết 6\n3) hàng trăm 5 − 3 = 2, viết 2\nVậy 534 − 268 = 266.",
            "cotTinh": {
              "left": 534,
              "right": 268,
              "sign": "−"
            }
          }
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 372 + 259",
            cotTinh: {
              left: 372,
              right: 259,
              sign: "+",
              remember: true,
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 700 − 285",
            cotTinh: {
              left: 700,
              right: 285,
              sign: "−",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "372 + 259 bằng bao nhiêu?",
            options: [521, 621, 631, 531],
            answer: 631,
            mascotHint:
              "2+9=11 viết 1 nhớ 1; 7+5+1=13 viết 3 nhớ 1; 3+2+1=6. Kết quả 631.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "700 − 285 bằng bao nhiêu?",
            options: [415, 425, 515, 985],
            answer: 415,
            mascotHint: "10−5=5; mượn tiếp: 9−8=1; 6−2=4. Kết quả 415.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng có nhớ thì nhớ 1; trừ có mượn thì mượn 1.",
              "Bé đã hoàn thành chủ đề 12.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
