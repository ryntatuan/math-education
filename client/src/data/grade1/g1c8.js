export const g1c8 = {
  id: "g1-c8",
  name: "Chủ đề 8: Phép cộng, phép trừ (không nhớ) trong phạm vi 100",
  description:
    "Cộng trừ số có hai chữ số với số có một chữ số và với số có hai chữ số — KHÔNG nhớ",
  icon: "🔢",
  color: "#118ab2",
  totalLessons: 12,
  lessons: [
    {
      id: "g1-c8-l1",
      title: "Bài 1: Phép cộng số có hai chữ số với số có một chữ số",
      type: "learn",
      description: "Đặt tính và cộng dạng 25 + 4 (không nhớ)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 25 quả cam, thêm 4 quả nữa. Bé cùng Rô-bốt tính nhé! 🍊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai chữ số với một chữ số",
            explanation:
              "Bé đặt số có một chữ số thẳng cột với HÀNG ĐƠN VỊ, rồi cộng từ phải sang trái. Hàng chục giữ nguyên vì không nhớ.",
            rule: "25 + 4: 5 + 4 = 9, viết 9. Hạ 2 xuống. Kết quả 29.",
            points: [
              "Số 4 phải đặt thẳng cột với chữ số 5 (hàng đơn vị).",
              "5 + 4 = 9, bé hơn 10 nên KHÔNG nhớ.",
              "Hàng chục giữ nguyên: 2 chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "25 gồm 2 chục và 5 đơn vị",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [2, 5],
              label: "25 gồm 2 chục và 5 đơn vị",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 25 + 4",
            cotTinh: {
              left: 25,
              right: 4,
              sign: "+",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 5,
              "right": 4,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 5 + 4\nhàng đơn vị 5 + 4 = 9, viết 9\nVậy 5 + 4 = 9."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 + 5 bằng bao nhiêu?",
            "options": [
              7,
              8,
              9,
              10
            ],
            "answer": 8,
            "mascotHint": "hàng đơn vị 3 + 5 = 8, viết 8. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "25 + 4 bằng bao nhiêu?",
            options: [28, 29, 30, 65],
            answer: 29,
            mascotHint: "5 + 4 = 9, hạ 2 xuống: kết quả 29.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt số có một chữ số thẳng cột hàng đơn vị.",
              "25 + 4 = 29.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l2",
      title: "Bài 2: Luyện tập cộng hai chữ số với một chữ số",
      type: "learn",
      description: "Luyện tập cộng dạng 25 + 4 và giải bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Thư viện có 34 quyển truyện, cô cho thêm 5 quyển. Có tất cả bao nhiêu quyển? 📚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Cộng không nhớ trong bài toán",
            explanation:
              "Bé đặt tính rồi cộng. Nhớ kiểm tra hàng đơn vị có vượt 10 hay không.",
            rule: "34 + 5: 4 + 5 = 9, viết 9; hạ 3. Kết quả 39 (quyển truyện).",
            points: [
              "4 + 5 = 9 < 10 nên không nhớ.",
              "34 + 5 = 39.",
              "Đáp số ghi kèm đơn vị: quyển truyện.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 34 + 5",
            cotTinh: {
              left: 34,
              right: 5,
              sign: "+",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 4,
              "right": 5,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 4 + 5\nhàng đơn vị 4 + 5 = 9, viết 9\nVậy 4 + 5 = 9."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 4,
              "to": 9,
              "step": 1,
              "hops": [
                {
                  "from": 4,
                  "to": 9,
                  "label": "+5"
                }
              ]
            },
            "text": "Cách nhẩm nhanh cho 4 + 5\nBé đếm thêm từng bước trên tia số theo các cung nhảy.\nĐếm thêm 5 bước từ 4.\nVậy 4 + 5 = 9."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "5 + 4 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              19
            ],
            "answer": 9,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 9."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 + 6 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              11
            ],
            "answer": 9,
            "mascotHint": "hàng đơn vị 3 + 6 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Thư viện có 34 quyển truyện, cho thêm 5 quyển. Hỏi có tất cả bao nhiêu quyển truyện?",
            options: [29, 38, 39, 84],
            answer: 39,
            mascotHint: "34 + 5 = 39 quyển truyện.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng hàng đơn vị trước, hàng chục giữ nguyên khi không nhớ.",
              "34 + 5 = 39.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l3",
      title: "Bài 3: Phép cộng số có hai chữ số với số có hai chữ số",
      type: "learn",
      description: "Đặt tính và cộng dạng 32 + 14 (không nhớ)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có 32 viên bi, bé cho thêm 14 viên. Có tất cả bao nhiêu viên? 🔵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai số có hai chữ số",
            explanation:
              "Bé đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục. Rồi cộng từ phải sang trái.",
            rule: "32 + 14: 2 + 4 = 6, viết 6. 3 + 1 = 4, viết 4. Kết quả 46.",
            points: [
              "Cộng hàng đơn vị: 2 + 4 = 6.",
              "Cộng hàng chục: 3 + 1 = 4.",
              "Cả hai hàng đều bé hơn 10 nên không nhớ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "  32\n+ 14\n  46",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [3, 2],
              label: "32 + 14: cộng từng hàng một, bắt đầu từ hàng đơn vị",
            },
            operation: {
              left: 32,
              sign: "+",
              right: 14,
              result: 46,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 2,
              "right": 4,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 2 + 4\nhàng đơn vị 2 + 4 = 6, viết 6\nVậy 2 + 4 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 + 2 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 5,
            "mascotHint": "hàng đơn vị 3 + 2 = 5, viết 5. Kết quả 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "32 + 14 bằng bao nhiêu?",
            options: [36, 44, 46, 56],
            answer: 46,
            mascotHint: "2 + 4 = 6; 3 + 1 = 4. Kết quả 46.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "41 + 26 bằng bao nhiêu?",
            options: [57, 65, 67, 77],
            answer: 67,
            mascotHint: "1 + 6 = 7; 4 + 2 = 6. Kết quả 67.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt tính thẳng cột rồi cộng từ phải sang trái.",
              "32 + 14 = 46; 41 + 26 = 67.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l4",
      title: "Bài 4: Luyện tập cộng hai số có hai chữ số",
      type: "learn",
      description: "Luyện tập cộng hai số có hai chữ số trong bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Đội Một trồng 24 cây, đội Hai trồng 15 cây. Cả hai đội trồng bao nhiêu cây? 🌳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Cộng trong bài toán",
            explanation: "Bài toán 'cả hai', 'tất cả' thì dùng phép cộng.",
            rule: "24 + 15: 4 + 5 = 9; 2 + 1 = 3. Kết quả 39 (cây).",
            points: [
              "Đặt tính thẳng cột trước khi tính.",
              "24 + 15 = 39 cây.",
              "Thử lại: 39 − 15 = 24, đúng thì kết quả chính xác.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi cộng: 24 + 15",
            cotTinh: {
              left: 24,
              right: 15,
              sign: "+",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 4,
              "right": 5,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 4 + 5\nhàng đơn vị 4 + 5 = 9, viết 9\nVậy 4 + 5 = 9."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 4,
              "to": 9,
              "step": 1,
              "hops": [
                {
                  "from": 4,
                  "to": 9,
                  "label": "+5"
                }
              ]
            },
            "text": "Cách nhẩm nhanh cho 4 + 5\nBé đếm thêm từng bước trên tia số theo các cung nhảy.\nĐếm thêm 5 bước từ 4.\nVậy 4 + 5 = 9."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 + 8 bằng bao nhiêu?",
            "options": [
              13,
              14,
              15,
              24
            ],
            "answer": 14,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 14."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "7 + 2 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              11
            ],
            "answer": 9,
            "mascotHint": "hàng đơn vị 7 + 2 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Đội Một trồng 24 cây, đội Hai trồng 15 cây. Hỏi cả hai đội trồng được bao nhiêu cây?",
            options: [29, 38, 39, 49],
            answer: 39,
            mascotHint: "24 + 15 = 39 cây.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["'Cả hai', 'tất cả' thì dùng phép cộng.", "24 + 15 = 39."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c8-l5",
      title: "Bài 5: Phép trừ số có hai chữ số cho số có một chữ số",
      type: "learn",
      description: "Đặt tính và trừ dạng 39 − 5 (không mượn)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 39 quả bóng, lấy ra 5 quả. Còn lại mấy quả nhỉ? 🎈",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai chữ số cho một chữ số",
            explanation:
              "Bé đặt số có một chữ số thẳng cột hàng đơn vị, rồi trừ từ phải sang trái. Hàng chục giữ nguyên vì không mượn.",
            rule: "39 − 5: 9 − 5 = 4, viết 4. Hạ 3 xuống. Kết quả 34.",
            points: [
              "9 − 5 = 4, đủ để trừ nên KHÔNG mượn.",
              "Hàng chục giữ nguyên: 3 chục.",
              "39 − 5 = 34.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 39 − 5",
            cotTinh: {
              left: 39,
              right: 5,
              sign: "−",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 9,
              "right": 5,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 9 − 5\nhàng đơn vị 9 − 5 = 4, viết 4\nVậy 9 − 5 = 4."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 5,
              "to": 9,
              "step": 1,
              "hops": [
                {
                  "from": 5,
                  "to": 9,
                  "label": "+4"
                }
              ]
            },
            "text": "Cách 2 cho 9 − 5: đếm thêm từ số bé\nTừ 5 đếm thêm cho tới 9 là bao nhiêu bước?\nĐó chính là hiệu: 9 − 5 = 4."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 − 5 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3,
              11
            ],
            "answer": 1,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 1."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 − 2 bằng bao nhiêu?",
            "options": [
              3,
              4,
              5,
              6
            ],
            "answer": 4,
            "mascotHint": "hàng đơn vị 6 − 2 = 4, viết 4. Kết quả 4."
          }
        },
        {
          type: "quiz",
          content: {
            question: "39 − 5 bằng bao nhiêu?",
            options: [24, 33, 34, 44],
            answer: 34,
            mascotHint: "9 − 5 = 4, hạ 3 xuống: kết quả 34.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt số có một chữ số thẳng cột hàng đơn vị.",
              "39 − 5 = 34.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l6",
      title: "Bài 6: Luyện tập trừ hai chữ số cho một chữ số",
      type: "learn",
      description: "Luyện tập trừ dạng 39 − 5 và giải bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trên cây có 48 quả cam, hái xuống 6 quả. Trên cây còn bao nhiêu quả? 🍊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Trừ trong bài toán",
            explanation:
              "Bài toán 'còn lại', 'bớt đi', 'hái xuống' thì dùng phép trừ.",
            rule: "48 − 6: 8 − 6 = 2, viết 2; hạ 4. Kết quả 42 (quả cam).",
            points: [
              "8 − 6 = 2 nên không mượn.",
              "48 − 6 = 42 quả cam.",
              "Thử lại: 42 + 6 = 48.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi trừ: 48 − 6",
            cotTinh: {
              left: 48,
              right: 6,
              sign: "−",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 8,
              "right": 6,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 8 − 6\nhàng đơn vị 8 − 6 = 2, viết 2\nVậy 8 − 6 = 2."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 6,
              "to": 8,
              "step": 1,
              "hops": [
                {
                  "from": 6,
                  "to": 8,
                  "label": "+2"
                }
              ]
            },
            "text": "Cách 2 cho 8 − 6: đếm thêm từ số bé\nTừ 6 đếm thêm cho tới 8 là bao nhiêu bước?\nĐó chính là hiệu: 8 − 6 = 2."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "7 − 2 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              15
            ],
            "answer": 5,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 5."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "4 − 3 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3
            ],
            "answer": 1,
            "mascotHint": "hàng đơn vị 4 − 3 = 1, viết 1. Kết quả 1."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên cây có 48 quả cam, hái xuống 6 quả. Hỏi trên cây còn lại bao nhiêu quả cam?",
            options: [32, 41, 42, 54],
            answer: 42,
            mascotHint: "48 − 6 = 42 quả cam.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["'Còn lại', 'bớt đi' thì dùng phép trừ.", "48 − 6 = 42."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l7",
      title: "Bài 7: Phép trừ số có hai chữ số cho số có hai chữ số",
      type: "learn",
      description: "Đặt tính và trừ dạng 57 − 23 (không mượn)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có 57 viên bi, cho bạn 23 viên. Rô-bốt còn mấy viên? 🔵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai số có hai chữ số",
            explanation: "Bé đặt tính thẳng cột rồi trừ từ phải sang trái.",
            rule: "57 − 23: 7 − 3 = 4, viết 4. 5 − 2 = 3, viết 3. Kết quả 34.",
            points: [
              "Trừ hàng đơn vị: 7 − 3 = 4.",
              "Trừ hàng chục: 5 − 2 = 3.",
              "Cả hai hàng đều trừ được nên không mượn.",
            ],
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
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 7,
              "right": 3,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 7 − 3\nhàng đơn vị 7 − 3 = 4, viết 4\nVậy 7 − 3 = 4."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 − 1 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3,
              11
            ],
            "answer": 1,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 1."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 − 2 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              8
            ],
            "answer": 6,
            "mascotHint": "hàng đơn vị 8 − 2 = 6, viết 6. Kết quả 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "57 − 23 bằng bao nhiêu?",
            options: [24, 34, 44, 30],
            answer: 34,
            mascotHint: "7 − 3 = 4; 5 − 2 = 3. Kết quả 34.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "86 − 52 bằng bao nhiêu?",
            options: [24, 34, 44, 38],
            answer: 34,
            mascotHint: "6 − 2 = 4; 8 − 5 = 3. Kết quả 34.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
              "57 − 23 = 34; 86 − 52 = 34.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l8",
      title: "Bài 8: Luyện tập trừ hai số có hai chữ số",
      type: "learn",
      description: "Luyện tập trừ hai số có hai chữ số trong bài toán",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Lớp có 46 học sinh, 24 bạn đã nộp bài. Còn mấy bạn chưa nộp? ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Trừ hai số có hai chữ số",
            explanation:
              "Bé đặt tính thẳng cột và trừ từng hàng từ phải sang trái.",
            rule: "46 − 24: 6 − 4 = 2; 4 − 2 = 2. Kết quả 22 (bạn).",
            points: [
              "46 − 24 = 22 bạn chưa nộp.",
              "Thử lại: 22 + 24 = 46.",
              "Đáp số kèm đơn vị: bạn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "  46\n− 24\n  22",
            operation: {
              left: 46,
              sign: "−",
              right: 24,
              result: 22,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 6,
              "right": 4,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 6 − 4\nhàng đơn vị 6 − 4 = 2, viết 2\nVậy 6 − 4 = 2."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 4,
              "to": 6,
              "step": 1,
              "hops": [
                {
                  "from": 4,
                  "to": 6,
                  "label": "+2"
                }
              ]
            },
            "text": "Cách 2 cho 6 − 4: đếm thêm từ số bé\nTừ 4 đếm thêm cho tới 6 là bao nhiêu bước?\nĐó chính là hiệu: 6 − 4 = 2."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 − 3 bằng bao nhiêu?",
            "options": [
              2,
              3,
              4,
              13
            ],
            "answer": 3,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 3."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 − 4 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3,
              4
            ],
            "answer": 2,
            "mascotHint": "hàng đơn vị 6 − 4 = 2, viết 2. Kết quả 2."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Lớp có 46 học sinh, 24 bạn đã nộp bài. Hỏi còn bao nhiêu bạn chưa nộp bài?",
            options: [12, 22, 24, 70],
            answer: 22,
            mascotHint: "46 − 24 = 22 bạn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Trừ từng hàng từ phải sang trái.", "46 − 24 = 22."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l9",
      title: "Bài 9: Tính nhẩm cộng trừ trong phạm vi 100",
      type: "learn",
      description: "Tính nhẩm nhanh các phép cộng trừ đơn giản",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé có biết tính nhẩm nhanh không? Cùng Rô-bốt thử nhé! ⚡",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Ba mẹo tính nhẩm",
            explanation: "Cộng trừ số tròn chục rất dễ: chỉ cần nhớ số chục.",
            rule: "30 + 20 = 50 (3 chục + 2 chục). 50 − 20 = 30. 40 + 5 = 45 (thêm đơn vị).",
            points: [
              "Cộng số tròn chục: cộng số chục với nhau.",
              "Trừ số tròn chục: trừ số chục.",
              "Cộng số có một chữ số: giữ nguyên chục, cộng đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "30 + 20 = 50\n50 − 20 = 30\n40 + 5  = 45",
            baseTen: {
              tens: 5,
              ones: 0,
              label: "3 chục + 2 chục = 5 chục",
            },
            operation: {
              left: 30,
              sign: "+",
              right: 20,
              result: 50,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 30,
              "right": 20,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 30 + 20\nhàng đơn vị 0 + 0 = 0, viết 0\nhàng chục 3 + 2 = 5, viết 5\nVậy 30 + 20 = 50."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "75 + 22 bằng bao nhiêu?",
            "options": [
              96,
              97,
              98,
              99
            ],
            "answer": 97,
            "mascotHint": "hàng đơn vị 5 + 2 = 7, viết 7. Kết quả 97."
          }
        },
        {
          type: "quiz",
          content: {
            question: "30 + 20 bằng bao nhiêu?",
            options: [40, 50, 60, 32],
            answer: 50,
            mascotHint: "3 chục + 2 chục = 5 chục = 50.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "60 + 7 bằng bao nhiêu?",
            options: [13, 61, 67, 607],
            answer: 67,
            mascotHint: "Giữ nguyên 6 chục, thêm 7 đơn vị: 67.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng trừ số tròn chục thì cộng trừ số chục.",
              "30 + 20 = 50; 60 + 7 = 67.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c8-l10",
      title: "Bài 10: Bài toán có lời văn — phép cộng",
      type: "learn",
      description: "Giải bài toán có lời văn dùng phép cộng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Mẹ mua 23 quả trứng gà và 15 quả trứng vịt. Mẹ mua tất cả bao nhiêu quả? 🥚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "Bốn bước giải toán",
            explanation:
              "Bé làm bốn bước: đọc đề, tìm từ khóa, đặt tính, ghi đáp số.",
            rule: "23 + 15: 3 + 5 = 8; 2 + 1 = 3. Kết quả 38 (quả trứng).",
            points: [
              "Từ khóa 'cả', 'tất cả' → phép cộng.",
              "23 + 15 = 38 quả trứng.",
              "Đáp số phải ghi kèm đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "23 quả + 15 quả\n23 + 15 = 38 (quả trứng)",
            operation: {
              left: 23,
              sign: "+",
              right: 15,
              result: 38,
            },
            barModel: {
              rows: [
                {
                  label: "Có sẵn",
                  parts: 23,
                },
                {
                  label: "Thêm vào",
                  parts: 15,
                },
              ],
              braceLabel: "38 quả trứng",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 3,
              "right": 5,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 3 + 5\nhàng đơn vị 3 + 5 = 8, viết 8\nVậy 3 + 5 = 8."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 3,
              "to": 8,
              "step": 1,
              "hops": [
                {
                  "from": 3,
                  "to": 8,
                  "label": "+5"
                }
              ]
            },
            "text": "Cách nhẩm nhanh cho 3 + 5\nBé đếm thêm từng bước trên tia số theo các cung nhảy.\nĐếm thêm 5 bước từ 3.\nVậy 3 + 5 = 8."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 + 3 bằng bao nhiêu?",
            "options": [
              10,
              11,
              12,
              21
            ],
            "answer": 11,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 11."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 + 1 bằng bao nhiêu?",
            "options": [
              3,
              4,
              5,
              6
            ],
            "answer": 4,
            "mascotHint": "hàng đơn vị 3 + 1 = 4, viết 4. Kết quả 4."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Mẹ mua 23 quả trứng gà và 15 quả trứng vịt. Hỏi mẹ mua tất cả bao nhiêu quả trứng?",
            options: [8, 28, 38, 48],
            answer: 38,
            mascotHint: "23 + 15 = 38 quả trứng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Tìm từ khóa để chọn phép tính.", "23 + 15 = 38."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l11",
      title: "Bài 11: Bài toán có lời văn — phép trừ",
      type: "learn",
      description: "Giải bài toán có lời văn dùng phép trừ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cửa hàng có 65 hộp sữa, đã bán 24 hộp. Còn lại bao nhiêu hộp? 🥛",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "Bài toán bớt đi",
            explanation:
              "Từ khóa 'đã bán', 'còn lại', 'bớt đi' thì dùng phép trừ.",
            rule: "65 − 24: 5 − 4 = 1; 6 − 2 = 4. Kết quả 41 (hộp sữa).",
            points: [
              "65 − 24 = 41 hộp sữa.",
              "Thử lại: 41 + 24 = 65.",
              "Đáp số ghi kèm đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "65 hộp − 24 hộp\n65 − 24 = 41 (hộp sữa)",
            operation: {
              left: 65,
              sign: "−",
              right: 24,
              result: 41,
            },
            barModel: {
              rows: [
                {
                  label: "Có sẵn",
                  parts: 65,
                },
                {
                  label: "Bớt đi",
                  parts: 24,
                },
              ],
              braceLabel: "41 hộp sữa",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 5,
              "right": 4,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 5 − 4\nhàng đơn vị 5 − 4 = 1, viết 1\nVậy 5 − 4 = 1."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 4,
              "to": 5,
              "step": 1,
              "hops": [
                {
                  "from": 4,
                  "to": 5,
                  "label": "+1"
                }
              ]
            },
            "text": "Cách 2 cho 5 − 4: đếm thêm từ số bé\nTừ 4 đếm thêm cho tới 5 là bao nhiêu bước?\nĐó chính là hiệu: 5 − 4 = 1."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Bước",
                "Việc bé làm"
              ],
              "rows": [
                [
                  "Bước 1 — Đơn vị",
                  "viết kết quả luôn kèm đơn vị"
                ],
                [
                  "Bước 2 — Bậc thang",
                  "đi xuống thì nhân, đi lên thì chia"
                ],
                [
                  "Bước 3 — Kiểm lại",
                  "lấy kết quả đổi ngược lại xem có về số ban đầu"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 − 1 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3,
              11
            ],
            "answer": 1,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 1."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 − 4 bằng bao nhiêu?",
            "options": [
              1,
              2,
              3,
              4
            ],
            "answer": 2,
            "mascotHint": "hàng đơn vị 6 − 4 = 2, viết 2. Kết quả 2."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Cửa hàng có 65 hộp sữa, đã bán 24 hộp. Hỏi còn lại bao nhiêu hộp sữa?",
            options: [31, 41, 51, 89],
            answer: 41,
            mascotHint: "65 − 24 = 41 hộp sữa.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["'Đã bán', 'còn lại' thì dùng phép trừ.", "65 − 24 = 41."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c8-l12",
      title: "Bài 12: Luyện tập chung chủ đề 8",
      type: "learn",
      description: "Ôn tập cộng trừ không nhớ trong phạm vi 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã tính được với số có hai chữ số rồi! Tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 8",
            explanation:
              "Bé đã học cộng trừ số có hai chữ số với số có một chữ số và với số có hai chữ số — đều KHÔNG nhớ, KHÔNG mượn.",
            points: [
              "Đặt tính thẳng cột.",
              "Tính từ phải sang trái.",
              "Cộng trừ số tròn chục thì làm với số chục.",
            ],
          },
        },
                {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 25 + 4\nLuyện tập chung cộng trừ trong phạm vi 100\n1) hàng đơn vị 5 + 4 = 9, viết 9\n2) hàng chục 2 + 0 = 2, viết 2\nVậy 25 + 4 = 29.",
            "cotTinh": {
              "left": 25,
              "right": 4,
              "sign": "+"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 32 + 14\n1) hàng đơn vị 2 + 4 = 6, viết 6\n2) hàng chục 3 + 1 = 4, viết 4\nVậy 32 + 14 = 46.",
            "cotTinh": {
              "left": 32,
              "right": 14,
              "sign": "+"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 57 − 23\n1) hàng đơn vị 7 − 3 = 4, viết 4\n2) hàng chục 5 − 2 = 3, viết 3\nVậy 57 − 23 = 34.",
            "cotTinh": {
              "left": 57,
              "right": 23,
              "sign": "−"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 25,
              "right": 4,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 25 + 4\nhàng đơn vị 5 + 4 = 9, viết 9\nhàng chục 2 + 0 = 2, viết 2\nVậy 25 + 4 = 29."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "41 + 3 bằng bao nhiêu?",
            "options": [
              43,
              44,
              45,
              46
            ],
            "answer": 44,
            "mascotHint": "hàng đơn vị 1 + 3 = 4, viết 4. Kết quả 44."
          }
        },
        {
          type: "quiz",
          content: {
            question: "35 + 22 bằng bao nhiêu?",
            options: [47, 55, 57, 513],
            answer: 57,
            mascotHint: "5 + 2 = 7; 3 + 2 = 5. Kết quả 57.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "78 − 45 bằng bao nhiêu?",
            options: [23, 33, 43, 123],
            answer: 33,
            mascotHint: "8 − 5 = 3; 7 − 4 = 3. Kết quả 33.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành chủ đề 8.",
              "35 + 22 = 57; 78 − 45 = 33.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
