export const g3c2 = {
  id: "g3-c2",
  name: "Chủ đề 2: Bảng nhân, bảng chia",
  description:
    "Bảng nhân và bảng chia 6, 7, 8, 9; tìm thành phần trong phép nhân, phép chia; một phần mấy",
  icon: "✖️",
  color: "#f6c23e",
  totalLessons: 11,
  lessons: [
    {
      id: "g3-c2-l1",
      title: "Bài 1: Bảng nhân 6",
      type: "learn",
      description: "Lập và học thuộc bảng nhân 6",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Mỗi hộp có 6 chiếc bút chì màu. Bé đếm bút trong 1, 2, 3 hộp nhé! 🖍️",
            groupScene: {
              mode: "equalGroups",
              kind: "parts",
              partKind: "box",
              n: 3,
              k: 6,
              captionText: "3 hộp, mỗi hộp 6 chiếc bút",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Nhân 6",
            title: "Bảng nhân 6",
            explanation: "Bảng nhân 6 lập bằng cách đếm thêm 6 mỗi bước.",
            rule: "6 × 1 = 6 · 6 × 2 = 12 · 6 × 3 = 18 · 6 × 4 = 24 · 6 × 5 = 30 · 6 × 6 = 36 · 6 × 7 = 42 · 6 × 8 = 48 · 6 × 9 = 54 · 6 × 10 = 60.",
            points: [
              "Mỗi kết quả hơn kém nhau đúng 6 đơn vị.",
              "Kết quả bảng nhân 6 đều là số chẵn.",
              "6 × 5 = 30; 6 × 7 = 42.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "6 · 12 · 18 · 24 · 30 · 36 · 42 · 48 · 54 · 60",
            numberLine: {
              from: 6,
              to: 60,
              step: 6,
              marks: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
              label: "Đếm thêm 6: 6 · 12 · 18 · … · 60",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng nhân 6",
            table: {
              headers: ["Phép nhân", "Kết quả"],
              rows: [
                ["6 × 1", "6"],
                ["6 × 5", "30"],
                ["6 × 8", "48"],
                ["6 × 10", "60"],
              ],
              label: "Bảng nhân 6",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 6,
              "right": 1,
              "sign": "×",
              "remember": true
            },
            "text": "Bé tự đặt tính: 6 × 1\nhàng đơn vị 6 × 1 = 6, viết 6\nVậy 6 × 1 = 6."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "6 × 1",
                  "6"
                ],
                [
                  "6 × 2",
                  "12"
                ],
                [
                  "6 × 3",
                  "18"
                ],
                [
                  "6 × 4",
                  "24"
                ],
                [
                  "6 × 5",
                  "30"
                ]
              ]
            },
            "text": "Bảng nhân 6 — năm dòng đầu\nMỗi dòng thêm 6 so với dòng trên.\nBé học thuộc bằng cách cộng thêm 6 chứ đừng đọc vẹt."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng nhân 6",
            "explanation": "Bảng nhân 6 nhớ nhanh nhất khi bé thấy nó lớn dần đều thêm 6.",
            "points": [
              "6 × 1 = 6; mỗi bước tiếp theo cộng thêm 6.",
              "6 × 5 = 30; 6 × 10 = 60.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 30 : 6 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 × 6 bằng bao nhiêu?",
            "options": [
              30,
              36,
              37,
              42
            ],
            "answer": 36,
            "mascotHint": "6 × 6 = 30 + 6 = 36."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "42 : 6 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              42
            ],
            "answer": 7,
            "mascotHint": "Vì 6 × 7 = 42 nên 42 : 6 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 4 bằng bao nhiêu?",
            "options": [
              7,
              8,
              9,
              10
            ],
            "answer": 8,
            "mascotHint": "hàng đơn vị 2 × 4 = 8, viết 8. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "6 × 7 bằng bao nhiêu?",
            options: [36, 42, 48, 13],
            answer: 42,
            mascotHint: "6 × 6 = 36, thêm 6 được 42.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 × 9 bằng bao nhiêu?",
            options: [48, 54, 60, 15],
            answer: 54,
            mascotHint: "6 × 10 = 60, bớt 6 được 54.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng nhân 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.",
              "6 × 7 = 42; 6 × 9 = 54.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l2",
      title: "Bài 2: Bảng chia 6",
      type: "learn",
      description: "Lập và học thuộc bảng chia 6",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 42 chiếc bút chia đều vào 6 hộp. Mỗi hộp có mấy chiếc? 🖍️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Chia 6",
            title: "Bảng chia 6",
            explanation:
              "Lấy tích trong bảng nhân 6 chia cho 6, ta được thừa số còn lại.",
            rule: "6 : 6 = 1 · 12 : 6 = 2 · 18 : 6 = 3 · 24 : 6 = 4 · 30 : 6 = 5 · 36 : 6 = 6 · 42 : 6 = 7 · 48 : 6 = 8 · 54 : 6 = 9 · 60 : 6 = 10.",
            points: [
              "6 × 7 = 42 nên 42 : 6 = 7.",
              "6 × 9 = 54 nên 54 : 6 = 9.",
              "Học bảng nhân 6 là có luôn bảng chia 6.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng nhân 6:  6 × 7 = 42\nBảng chia 6:  42 : 6 = 7",
            table: {
              headers: ["Phép chia", "Kết quả"],
              rows: [
                ["6 : 6", "1"],
                ["12 : 6", "2"],
                ["18 : 6", "3"],
                ["24 : 6", "4"],
                ["30 : 6", "5"],
                ["36 : 6", "6"],
                ["42 : 6", "7"],
                ["48 : 6", "8"],
                ["54 : 6", "9"],
                ["60 : 6", "10"],
              ],
              label: "Bảng chia 6",
            },
            operation: {
              left: 42,
              sign: ":",
              right: 6,
              result: 7,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "6 : 6",
                  "1"
                ],
                [
                  "12 : 6",
                  "2"
                ],
                [
                  "18 : 6",
                  "3"
                ],
                [
                  "24 : 6",
                  "4"
                ],
                [
                  "30 : 6",
                  "5"
                ]
              ]
            },
            "text": "Bảng chia 6 đi ngược từ bảng nhân 6\n6 × 2 = 12 nên 12 : 6 = 2\nMuốn biết 36 : 6, bé tự hỏi: 6 nhân mấy bằng 36?"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng chia 6",
            "explanation": "Bảng chia 6 không cần học riêng: bé tra ngược bảng nhân 6 là ra.",
            "points": [
              "6 × k = tích, thì tích : 6 = k.",
              "6 × 5 = 30; 6 × 10 = 60.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 30 : 6 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
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
                  "Bước 1 — Số chữ số",
                  "nhiều chữ số hơn thì số đó lớn hơn"
                ],
                [
                  "Bước 2 — So từ trái",
                  "so từng hàng từ trái sang phải, khác nhau thì dừng"
                ],
                [
                  "Bước 3 — Đọc số",
                  "đọc từ trái sang phải, hết mỗi lớp ba chữ số"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 × 8 bằng bao nhiêu?",
            "options": [
              63,
              64,
              65,
              74
            ],
            "answer": 64,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 64."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "36 : 6 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 6,
            "mascotHint": "Vì 6 × 6 = 36 nên 36 : 6 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "6 × 7 bằng bao nhiêu?",
            "options": [
              36,
              42,
              43,
              48
            ],
            "answer": 42,
            "mascotHint": "6 × 7 = 42 — bé cộng thêm 6 vào 36."
          }
        },
        {
          type: "quiz",
          content: {
            question: "42 : 6 bằng bao nhiêu?",
            options: [6, 7, 8, 36],
            answer: 7,
            mascotHint: "Vì 6 × 7 = 42 nên 42 : 6 = 7.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "54 : 6 bằng bao nhiêu?",
            options: [8, 9, 10, 48],
            answer: 9,
            mascotHint: "Vì 6 × 9 = 54 nên 54 : 6 = 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng chia 6: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "42 : 6 = 7; 54 : 6 = 9.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l3",
      title: "Bài 3: Bảng nhân 7",
      type: "learn",
      description: "Lập và học thuộc bảng nhân 7",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Một tuần có 7 ngày. Vậy 4 tuần có bao nhiêu ngày nhỉ? 📅",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Nhân 7",
            title: "Bảng nhân 7",
            explanation: "Bảng nhân 7 lập bằng cách đếm thêm 7 mỗi bước.",
            rule: "7 × 1 = 7 · 7 × 2 = 14 · 7 × 3 = 21 · 7 × 4 = 28 · 7 × 5 = 35 · 7 × 6 = 42 · 7 × 7 = 49 · 7 × 8 = 56 · 7 × 9 = 63 · 7 × 10 = 70.",
            points: [
              "Mỗi kết quả hơn kém nhau đúng 7 đơn vị.",
              "7 × 4 = 28 — bốn tuần có 28 ngày.",
              "7 × 7 = 49.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "7 · 14 · 21 · 28 · 35 · 42 · 49 · 56 · 63 · 70",
            numberLine: {
              from: 7,
              to: 70,
              step: 7,
              marks: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
              label: "Đếm thêm 7: 7 · 14 · 21 · … · 70",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng nhân 7",
            table: {
              headers: ["Phép nhân", "Kết quả"],
              rows: [
                ["7 × 1", "7"],
                ["7 × 5", "35"],
                ["7 × 8", "56"],
                ["7 × 10", "70"],
              ],
              label: "Bảng nhân 7",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 7,
              "right": 1,
              "sign": "×",
              "remember": true
            },
            "text": "Bé tự đặt tính: 7 × 1\nhàng đơn vị 7 × 1 = 7, viết 7\nVậy 7 × 1 = 7."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "7 × 1",
                  "7"
                ],
                [
                  "7 × 2",
                  "14"
                ],
                [
                  "7 × 3",
                  "21"
                ],
                [
                  "7 × 4",
                  "28"
                ],
                [
                  "7 × 5",
                  "35"
                ]
              ]
            },
            "text": "Bảng nhân 7 — năm dòng đầu\nMỗi dòng thêm 7 so với dòng trên.\nBé học thuộc bằng cách cộng thêm 7 chứ đừng đọc vẹt."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng nhân 7",
            "explanation": "Bảng nhân 7 nhớ nhanh nhất khi bé thấy nó lớn dần đều thêm 7.",
            "points": [
              "7 × 1 = 7; mỗi bước tiếp theo cộng thêm 7.",
              "7 × 5 = 35; 7 × 10 = 70.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 35 : 7 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "7 × 6 bằng bao nhiêu?",
            "options": [
              35,
              42,
              43,
              49
            ],
            "answer": 42,
            "mascotHint": "7 × 6 = 35 + 7 = 42."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "49 : 7 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              49
            ],
            "answer": 7,
            "mascotHint": "Vì 7 × 7 = 49 nên 49 : 7 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 3 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              8
            ],
            "answer": 6,
            "mascotHint": "hàng đơn vị 2 × 3 = 6, viết 6. Kết quả 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "7 × 4 bằng bao nhiêu?",
            options: [21, 28, 35, 11],
            answer: 28,
            mascotHint: "7 × 3 = 21, thêm 7 được 28.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "4 tuần lễ có bao nhiêu ngày?",
            options: ["21 ngày", "28 ngày", "35 ngày", "11 ngày"],
            answer: "28 ngày",
            mascotHint: "7 × 4 = 28 ngày.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng nhân 7: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.",
              "7 × 4 = 28.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l4",
      title: "Bài 4: Bảng chia 7",
      type: "learn",
      description: "Lập và học thuộc bảng chia 7",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 35 quả cam chia đều vào 7 đĩa. Mỗi đĩa có mấy quả? 🍊",
            groupScene: {
              mode: "equalGroups",
              kind: "trays",
              n: 7,
              k: 5,
              emoji: "🍊",
              hidePerGroup: true,
              pile: 35,
              captionText: "quả cam",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Chia 7",
            title: "Bảng chia 7",
            explanation: "Lấy tích trong bảng nhân 7 chia cho 7.",
            rule: "7 : 7 = 1 · 14 : 7 = 2 · 21 : 7 = 3 · 28 : 7 = 4 · 35 : 7 = 5 · 42 : 7 = 6 · 49 : 7 = 7 · 56 : 7 = 8 · 63 : 7 = 9 · 70 : 7 = 10.",
            points: [
              "7 × 5 = 35 nên 35 : 7 = 5.",
              "7 × 8 = 56 nên 56 : 7 = 8.",
              "Thử lại bằng phép nhân để chắc chắn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "7 × 5 = 35\n35 : 7 = 5",
            table: {
              headers: ["Phép chia", "Kết quả"],
              rows: [
                ["7 : 7", "1"],
                ["14 : 7", "2"],
                ["21 : 7", "3"],
                ["28 : 7", "4"],
                ["35 : 7", "5"],
                ["42 : 7", "6"],
                ["49 : 7", "7"],
                ["56 : 7", "8"],
                ["63 : 7", "9"],
                ["70 : 7", "10"],
              ],
              label: "Bảng chia 7",
            },
            operation: {
              left: 42,
              sign: ":",
              right: 7,
              result: 6,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "7 : 7",
                  "1"
                ],
                [
                  "14 : 7",
                  "2"
                ],
                [
                  "21 : 7",
                  "3"
                ],
                [
                  "28 : 7",
                  "4"
                ],
                [
                  "35 : 7",
                  "5"
                ]
              ]
            },
            "text": "Bảng chia 7 đi ngược từ bảng nhân 7\n7 × 2 = 14 nên 14 : 7 = 2\nMuốn biết 42 : 7, bé tự hỏi: 7 nhân mấy bằng 42?"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng chia 7",
            "explanation": "Bảng chia 7 không cần học riêng: bé tra ngược bảng nhân 7 là ra.",
            "points": [
              "7 × k = tích, thì tích : 7 = k.",
              "7 × 5 = 35; 7 × 10 = 70.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 35 : 7 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
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
                  "Bước 1 — Số chữ số",
                  "nhiều chữ số hơn thì số đó lớn hơn"
                ],
                [
                  "Bước 2 — So từ trái",
                  "so từng hàng từ trái sang phải, khác nhau thì dừng"
                ],
                [
                  "Bước 3 — Đọc số",
                  "đọc từ trái sang phải, hết mỗi lớp ba chữ số"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 × 6 bằng bao nhiêu?",
            "options": [
              47,
              48,
              49,
              58
            ],
            "answer": 48,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 48."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "42 : 7 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 6,
            "mascotHint": "Vì 7 × 6 = 42 nên 42 : 7 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "7 × 7 bằng bao nhiêu?",
            "options": [
              42,
              49,
              50,
              56
            ],
            "answer": 49,
            "mascotHint": "7 × 7 = 49 — bé cộng thêm 7 vào 42."
          }
        },
        {
          type: "quiz",
          content: {
            question: "35 : 7 bằng bao nhiêu?",
            options: [4, 5, 6, 28],
            answer: 5,
            mascotHint: "Vì 7 × 5 = 35 nên 35 : 7 = 5.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "56 : 7 bằng bao nhiêu?",
            options: [7, 8, 9, 49],
            answer: 8,
            mascotHint: "Vì 7 × 8 = 56 nên 56 : 7 = 8.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng chia 7: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "35 : 7 = 5; 56 : 7 = 8.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l5",
      title: "Bài 5: Bảng nhân 8",
      type: "learn",
      description: "Lập và học thuộc bảng nhân 8",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Mỗi con nhện có 8 chân. Bé đếm chân của 3 con nhện nhé! 🕷️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Nhân 8",
            title: "Bảng nhân 8",
            explanation: "Bảng nhân 8 lập bằng cách đếm thêm 8 mỗi bước.",
            rule: "8 × 1 = 8 · 8 × 2 = 16 · 8 × 3 = 24 · 8 × 4 = 32 · 8 × 5 = 40 · 8 × 6 = 48 · 8 × 7 = 56 · 8 × 8 = 64 · 8 × 9 = 72 · 8 × 10 = 80.",
            points: [
              "Mỗi kết quả hơn kém nhau đúng 8 đơn vị.",
              "Kết quả bảng nhân 8 đều là số chẵn.",
              "8 × 5 = 40; 8 × 8 = 64.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "8 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80",
            numberLine: {
              from: 8,
              to: 80,
              step: 8,
              marks: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
              label: "Đếm thêm 8: 8 · 16 · 24 · … · 80",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng nhân 8",
            table: {
              headers: ["Phép nhân", "Kết quả"],
              rows: [
                ["8 × 1", "8"],
                ["8 × 5", "40"],
                ["8 × 8", "64"],
                ["8 × 10", "80"],
              ],
              label: "Bảng nhân 8",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 8,
              "right": 1,
              "sign": "×",
              "remember": true
            },
            "text": "Bé tự đặt tính: 8 × 1\nhàng đơn vị 8 × 1 = 8, viết 8\nVậy 8 × 1 = 8."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "8 × 1",
                  "8"
                ],
                [
                  "8 × 2",
                  "16"
                ],
                [
                  "8 × 3",
                  "24"
                ],
                [
                  "8 × 4",
                  "32"
                ],
                [
                  "8 × 5",
                  "40"
                ]
              ]
            },
            "text": "Bảng nhân 8 — năm dòng đầu\nMỗi dòng thêm 8 so với dòng trên.\nBé học thuộc bằng cách cộng thêm 8 chứ đừng đọc vẹt."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng nhân 8",
            "explanation": "Bảng nhân 8 nhớ nhanh nhất khi bé thấy nó lớn dần đều thêm 8.",
            "points": [
              "8 × 1 = 8; mỗi bước tiếp theo cộng thêm 8.",
              "8 × 5 = 40; 8 × 10 = 80.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 40 : 8 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 × 6 bằng bao nhiêu?",
            "options": [
              40,
              48,
              49,
              56
            ],
            "answer": 48,
            "mascotHint": "8 × 6 = 40 + 8 = 48."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "56 : 8 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              56
            ],
            "answer": 7,
            "mascotHint": "Vì 8 × 7 = 56 nên 56 : 8 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "1 × 5 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 5,
            "mascotHint": "hàng đơn vị 1 × 5 = 5, viết 5. Kết quả 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 × 3 bằng bao nhiêu?",
            options: [16, 24, 32, 11],
            answer: 24,
            mascotHint: "8 × 2 = 16, thêm 8 được 24.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "8 × 7 bằng bao nhiêu?",
            options: [48, 56, 64, 15],
            answer: 56,
            mascotHint: "8 × 6 = 48, thêm 8 được 56.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng nhân 8: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.",
              "8 × 3 = 24; 8 × 7 = 56.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l6",
      title: "Bài 6: Bảng chia 8",
      type: "learn",
      description: "Lập và học thuộc bảng chia 8",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 48 chiếc kẹo chia đều vào 8 túi. Mỗi túi có mấy chiếc? 🍬",
            groupScene: {
              mode: "equalGroups",
              kind: "trays",
              n: 8,
              k: 6,
              emoji: "🍬",
              hidePerGroup: true,
              pile: 48,
              captionText: "chiếc kẹo",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Chia 8",
            title: "Bảng chia 8",
            explanation: "Lấy tích trong bảng nhân 8 chia cho 8.",
            rule: "8 : 8 = 1 · 16 : 8 = 2 · 24 : 8 = 3 · 32 : 8 = 4 · 40 : 8 = 5 · 48 : 8 = 6 · 56 : 8 = 7 · 64 : 8 = 8 · 72 : 8 = 9 · 80 : 8 = 10.",
            points: [
              "8 × 6 = 48 nên 48 : 8 = 6.",
              "8 × 9 = 72 nên 72 : 8 = 9.",
              "8 × 10 = 80 nên 80 : 8 = 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "8 × 6 = 48\n48 : 8 = 6",
            table: {
              headers: ["Phép chia", "Kết quả"],
              rows: [
                ["8 : 8", "1"],
                ["16 : 8", "2"],
                ["24 : 8", "3"],
                ["32 : 8", "4"],
                ["40 : 8", "5"],
                ["48 : 8", "6"],
                ["56 : 8", "7"],
                ["64 : 8", "8"],
                ["72 : 8", "9"],
                ["80 : 8", "10"],
              ],
              label: "Bảng chia 8",
            },
            operation: {
              left: 48,
              sign: ":",
              right: 8,
              result: 6,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "8 : 8",
                  "1"
                ],
                [
                  "16 : 8",
                  "2"
                ],
                [
                  "24 : 8",
                  "3"
                ],
                [
                  "32 : 8",
                  "4"
                ],
                [
                  "40 : 8",
                  "5"
                ]
              ]
            },
            "text": "Bảng chia 8 đi ngược từ bảng nhân 8\n8 × 2 = 16 nên 16 : 8 = 2\nMuốn biết 48 : 8, bé tự hỏi: 8 nhân mấy bằng 48?"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng chia 8",
            "explanation": "Bảng chia 8 không cần học riêng: bé tra ngược bảng nhân 8 là ra.",
            "points": [
              "8 × k = tích, thì tích : 8 = k.",
              "8 × 5 = 40; 8 × 10 = 80.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 40 : 8 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
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
                  "Bước 1 — Số chữ số",
                  "nhiều chữ số hơn thì số đó lớn hơn"
                ],
                [
                  "Bước 2 — So từ trái",
                  "so từng hàng từ trái sang phải, khác nhau thì dừng"
                ],
                [
                  "Bước 3 — Đọc số",
                  "đọc từ trái sang phải, hết mỗi lớp ba chữ số"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 × 2 bằng bao nhiêu?",
            "options": [
              15,
              16,
              17,
              26
            ],
            "answer": 16,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 16."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "48 : 8 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 6,
            "mascotHint": "Vì 8 × 6 = 48 nên 48 : 8 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 × 7 bằng bao nhiêu?",
            "options": [
              48,
              56,
              57,
              64
            ],
            "answer": 56,
            "mascotHint": "8 × 7 = 56 — bé cộng thêm 8 vào 48."
          }
        },
        {
          type: "quiz",
          content: {
            question: "48 : 8 bằng bao nhiêu?",
            options: [5, 6, 7, 40],
            answer: 6,
            mascotHint: "Vì 8 × 6 = 48 nên 48 : 8 = 6.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "72 : 8 bằng bao nhiêu?",
            options: [8, 9, 10, 64],
            answer: 9,
            mascotHint: "Vì 8 × 9 = 72 nên 72 : 8 = 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng chia 8: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "48 : 8 = 6; 72 : 8 = 9.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l7",
      title: "Bài 7: Bảng nhân 9",
      type: "learn",
      description: "Lập và học thuộc bảng nhân 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt có mẹo đếm bảng nhân 9 bằng mười ngón tay đấy! ✋",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Nhân 9",
            title: "Bảng nhân 9",
            explanation:
              "Bảng nhân 9 lập bằng cách đếm thêm 9 mỗi bước. Mẹo hay: 9 × n = 10 × n − n.",
            rule: "9 × 1 = 9 · 9 × 2 = 18 · 9 × 3 = 27 · 9 × 4 = 36 · 9 × 5 = 45 · 9 × 6 = 54 · 9 × 7 = 63 · 9 × 8 = 72 · 9 × 9 = 81 · 9 × 10 = 90.",
            points: [
              "Mẹo: 9 × 7 = 10 × 7 − 7 = 70 − 7 = 63.",
              "Tổng hai chữ số của kết quả luôn bằng 9: 63 → 6 + 3 = 9.",
              "9 × 10 = 90.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "9 · 18 · 27 · 36 · 45 · 54 · 63 · 72 · 81 · 90",
            numberLine: {
              from: 9,
              to: 90,
              step: 9,
              marks: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
              label: "Đếm thêm 9: 9 · 18 · 27 · … · 90",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng nhân 9",
            table: {
              headers: ["Phép nhân", "Kết quả"],
              rows: [
                ["9 × 1", "9"],
                ["9 × 5", "45"],
                ["9 × 7", "63"],
                ["9 × 10", "90"],
              ],
              label: "Bảng nhân 9",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 9,
              "right": 1,
              "sign": "×",
              "remember": true
            },
            "text": "Bé tự đặt tính: 9 × 1\nhàng đơn vị 9 × 1 = 9, viết 9\nVậy 9 × 1 = 9."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "9 × 1",
                  "9"
                ],
                [
                  "9 × 2",
                  "18"
                ],
                [
                  "9 × 3",
                  "27"
                ],
                [
                  "9 × 4",
                  "36"
                ],
                [
                  "9 × 5",
                  "45"
                ]
              ]
            },
            "text": "Bảng nhân 9 — năm dòng đầu\nMỗi dòng thêm 9 so với dòng trên.\nBé học thuộc bằng cách cộng thêm 9 chứ đừng đọc vẹt."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng nhân 9",
            "explanation": "Bảng nhân 9 nhớ nhanh nhất khi bé thấy nó lớn dần đều thêm 9.",
            "points": [
              "9 × 1 = 9; mỗi bước tiếp theo cộng thêm 9.",
              "9 × 5 = 45; 9 × 10 = 90.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 45 : 9 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "9 × 6 bằng bao nhiêu?",
            "options": [
              45,
              54,
              55,
              63
            ],
            "answer": 54,
            "mascotHint": "9 × 6 = 45 + 9 = 54."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "63 : 9 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              63
            ],
            "answer": 7,
            "mascotHint": "Vì 9 × 7 = 63 nên 63 : 9 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "1 × 9 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              11
            ],
            "answer": 9,
            "mascotHint": "hàng đơn vị 1 × 9 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "9 × 6 bằng bao nhiêu?",
            options: [45, 54, 63, 15],
            answer: 54,
            mascotHint: "9 × 6 = 10 × 6 − 6 = 60 − 6 = 54.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "9 × 8 bằng bao nhiêu?",
            options: [63, 72, 81, 17],
            answer: 72,
            mascotHint: "9 × 8 = 80 − 8 = 72.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng nhân 9: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90.",
              "Mẹo: 9 × n = 10 × n − n.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l8",
      title: "Bài 8: Bảng chia 9",
      type: "learn",
      description: "Lập và học thuộc bảng chia 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 63 bông hoa cắm đều vào 9 lọ. Mỗi lọ có mấy bông? 🌸",
            items: [
              {
                emoji: "🌸",
                label: "Bông hoa",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Chia 9",
            title: "Bảng chia 9",
            explanation: "Lấy tích trong bảng nhân 9 chia cho 9.",
            rule: "9 : 9 = 1 · 18 : 9 = 2 · 27 : 9 = 3 · 36 : 9 = 4 · 45 : 9 = 5 · 54 : 9 = 6 · 63 : 9 = 7 · 72 : 9 = 8 · 81 : 9 = 9 · 90 : 9 = 10.",
            points: [
              "9 × 7 = 63 nên 63 : 9 = 7.",
              "9 × 9 = 81 nên 81 : 9 = 9.",
              "9 × 10 = 90 nên 90 : 9 = 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "9 × 7 = 63\n63 : 9 = 7",
            table: {
              headers: ["Phép chia", "Kết quả"],
              rows: [
                ["9 : 9", "1"],
                ["18 : 9", "2"],
                ["27 : 9", "3"],
                ["36 : 9", "4"],
                ["45 : 9", "5"],
                ["54 : 9", "6"],
                ["63 : 9", "7"],
                ["72 : 9", "8"],
                ["81 : 9", "9"],
                ["90 : 9", "10"],
              ],
              label: "Bảng chia 9",
            },
            operation: {
              left: 63,
              sign: ":",
              right: 9,
              result: 7,
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "9 : 9",
                  "1"
                ],
                [
                  "18 : 9",
                  "2"
                ],
                [
                  "27 : 9",
                  "3"
                ],
                [
                  "36 : 9",
                  "4"
                ],
                [
                  "45 : 9",
                  "5"
                ]
              ]
            },
            "text": "Bảng chia 9 đi ngược từ bảng nhân 9\n9 × 2 = 18 nên 18 : 9 = 2\nMuốn biết 54 : 9, bé tự hỏi: 9 nhân mấy bằng 54?"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng chia 9",
            "explanation": "Bảng chia 9 không cần học riêng: bé tra ngược bảng nhân 9 là ra.",
            "points": [
              "9 × k = tích, thì tích : 9 = k.",
              "9 × 5 = 45; 9 × 10 = 90.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 45 : 9 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
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
                  "Bước 1 — Số chữ số",
                  "nhiều chữ số hơn thì số đó lớn hơn"
                ],
                [
                  "Bước 2 — So từ trái",
                  "so từng hàng từ trái sang phải, khác nhau thì dừng"
                ],
                [
                  "Bước 3 — Đọc số",
                  "đọc từ trái sang phải, hết mỗi lớp ba chữ số"
                ]
              ]
            },
            "text": "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "1 × 8 bằng bao nhiêu?",
            "options": [
              7,
              8,
              9,
              18
            ],
            "answer": 8,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 8."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "54 : 9 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 6,
            "mascotHint": "Vì 9 × 6 = 54 nên 54 : 9 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "9 × 7 bằng bao nhiêu?",
            "options": [
              54,
              63,
              64,
              72
            ],
            "answer": 63,
            "mascotHint": "9 × 7 = 63 — bé cộng thêm 9 vào 54."
          }
        },
        {
          type: "quiz",
          content: {
            question: "63 : 9 bằng bao nhiêu?",
            options: [6, 7, 8, 54],
            answer: 7,
            mascotHint: "Vì 9 × 7 = 63 nên 63 : 9 = 7.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "81 : 9 bằng bao nhiêu?",
            options: [8, 9, 10, 72],
            answer: 9,
            mascotHint: "Vì 9 × 9 = 81 nên 81 : 9 = 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng chia 9: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "63 : 9 = 7; 81 : 9 = 9.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c2-l9",
      title: "Bài 9: Tìm thành phần trong phép nhân, phép chia",
      type: "learn",
      description: "Tìm thừa số, số bị chia, số chia chưa biết",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có một thừa số bị che: ? × 7 = 42. Bé tìm giúp Rô-bốt nhé! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Ba công thức cần nhớ",
            explanation:
              "Muốn tìm thừa số chưa biết, lấy TÍCH chia cho thừa số đã biết. Muốn tìm số bị chia, lấy THƯƠNG nhân SỐ CHIA. Muốn tìm số chia, lấy SỐ BỊ CHIA chia THƯƠNG.",
            rule: "? × 7 = 42 → ? = 42 : 7 = 6. ? : 6 = 5 → ? = 5 × 6 = 30. 36 : ? = 4 → ? = 36 : 4 = 9.",
            points: [
              "Thừa số = tích : thừa số đã biết.",
              "Số bị chia = thương × số chia.",
              "Số chia = số bị chia : thương.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Mẫu: ? × 7 = 42  →  ? = 42 : 7 = 6\nBé tìm số bị che ở hai hàng còn lại nhé!",
            operation: {
              left: 6,
              sign: "×",
              right: 7,
              result: 42,
            },
            bangTinh: {
              headers: ["Tìm số bị che", "Kết quả"],
              rows: [
                ["? × 7 = 42", "6"],
                ["? : 6 = 5", null],
                ["36 : ? = 4", null],
              ],
              answers: [30, 9],
              options: [9, 11, 30],
              title: "Bé chọn số điền vào ô ?",
              hint: "Số bị chia = thương × số chia; số chia = số bị chia : thương.",
              label: "Tìm thành phần trong phép nhân, phép chia",
            },
          },
        },
        {
          "type": "concept",
          "content": {
            "badge": "Cách Học",
            "title": "Bốn bước làm một bài toán",
            "explanation": "Mọi bài bảng nhân – bảng chia – phân số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            "points": [
              "Bước 1 — Xác định đề hỏi nhân hay chia (chia luôn tra ngược bảng nhân).",
              "Bước 2 — Tách số thành hàng chục và hàng đơn vị rồi tính từng phần.",
              "Bước 3 — Cộng các phần lại, nhớ cộng số nhớ khi có.",
              "Bước 4 — Thử lại bằng phép ngược (nhân ↔ chia) hoặc bằng tổng."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Điều cần nhớ",
                "Nội dung"
              ],
              "rows": [
                [
                  "Nhân với 10",
                  "thêm một chữ số 0"
                ],
                [
                  "Chia hết",
                  "số dư bằng 0"
                ],
                [
                  "Phân số",
                  "mẫu số chia đều thành mấy phần, tử số lấy mấy phần"
                ]
              ]
            },
            "text": "Bảng nhớ nhanh — bảng nhân – bảng chia – phân số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Muốn tính 24 : 6, bé dựa vào đâu cho nhanh?",
            "options": [
              "Tra ngược bảng nhân 6",
              "Đếm lùi 24 lần",
              "Cộng 6 vào 24",
              "Bấm máy tính"
            ],
            "answer": "Tra ngược bảng nhân 6",
            "mascotHint": "Vì 6 × 4 = 24 nên 24 : 6 = 4 — tra bảng nhân bao giờ cũng nhanh hơn đếm."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: ? × 7 = 42",
            options: [5, 6, 7, 35],
            answer: 6,
            mascotHint: "Thừa số chưa biết = 42 : 7 = 6.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: ? : 6 = 5",
            options: [11, 25, 30, 1],
            answer: 30,
            mascotHint: "Số bị chia = thương × số chia = 5 × 6 = 30.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Thừa số = tích : thừa số đã biết.",
              "Số bị chia = thương × số chia; số chia = số bị chia : thương.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l10",
      title: "Bài 10: Một phần mấy",
      type: "learn",
      description: "Nhận biết 1/2, 1/3, 1/4, 1/5 của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt có 12 viên kẹo, cho bé 1/3 số kẹo. Bé được mấy viên? 🍬",
            items: [
              {
                emoji: "🍬",
                label: "Kẹo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Một phần mấy của một số",
            explanation:
              "Chia một số thành mấy phần bằng nhau rồi lấy một phần thì đó là 'một phần mấy' của số đó.",
            rule: "1/3 của 12 là 12 : 3 = 4. 1/2 của 10 là 10 : 2 = 5.",
            points: [
              "1/2 nghĩa là chia 2 phần bằng nhau, lấy 1 phần.",
              "1/4 của 20 là 20 : 4 = 5.",
              "Muốn tìm 1 phần mấy của một số, bé lấy số đó chia cho số phần.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1/3 của 12 = 12 : 3 = 4\n1/4 của 20 = 20 : 4 = 5",
            fractionBar: {
              rows: [
                {
                  parts: 12,
                  shaded: 4,
                  groups: 4,
                  label: "1/3 của 12: 12 chia 3 phần, lấy 1 phần = 4",
                },
                {
                  parts: 20,
                  shaded: 5,
                  groups: 5,
                  label: "1/4 của 20: 20 chia 4 phần, lấy 1 phần = 5",
                },
              ],
              label:
                "Tìm một phần mấy của một số: gộp ô thành từng nhóm bằng nhau rồi lấy 1 nhóm",
            },
          },
        },
        {
          "type": "concept",
          "content": {
            "badge": "Cách Học",
            "title": "Bốn bước làm một bài toán",
            "explanation": "Mọi bài bài toán có lời văn đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            "points": [
              "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
              "Bước 2 — Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
              "Bước 3 — Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
              "Bước 4 — Đặt tính rồi tính, rồi VIẾT ĐÁP SỐ kèm đơn vị và thử lại bằng phép ngược."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Điều cần nhớ",
                "Nội dung"
              ],
              "rows": [
                [
                  "Đơn vị",
                  "đáp số luôn kèm đơn vị như con, quả, kg, cm"
                ],
                [
                  "Kiểm tra",
                  "cộng thì lấy kết quả trừ đi một số hạng"
                ],
                [
                  "Câu trả lời",
                  "viết đủ câu, không chỉ ghi số"
                ]
              ]
            },
            "text": "Bảng nhớ nhanh — bài toán có lời văn\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Giải một bài toán có lời văn, bé làm gì TRƯỚC TIÊN?",
            "options": [
              "Đọc kỹ đề và gạch dưới các số đã cho",
              "Viết ngay đáp số",
              "Đoán kết quả",
              "Đặt tính trước khi đọc đề"
            ],
            "answer": "Đọc kỹ đề và gạch dưới các số đã cho",
            "mascotHint": "Chưa đọc kỹ đề thì chưa biết đề cho gì, hỏi gì — mọi bước sau đều dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1/3 của 12 bằng bao nhiêu?",
            options: [3, 4, 6, 9],
            answer: 4,
            mascotHint: "Chia 12 thành 3 phần bằng nhau: 12 : 3 = 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "1/5 của 25 bằng bao nhiêu?",
            options: [4, 5, 6, 20],
            answer: 5,
            mascotHint: "25 : 5 = 5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "1 phần mấy của một số = số đó chia cho số phần.",
              "1/3 của 12 = 4; 1/5 của 25 = 5.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c2-l11",
      title: "Bài 11: Luyện tập chung chủ đề 2",
      type: "learn",
      description: "Ôn tập bảng nhân chia 6, 7, 8, 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã có đủ tám bảng nhân chia! Mình tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tám bảng nhân chia",
            explanation:
              "Bé đã có bảng nhân chia 2, 3, 4, 5 và bảng nhân chia 6, 7, 8, 9.",
            points: [
              "Học bảng nhân là có luôn bảng chia tương ứng.",
              "Mẹo bảng nhân 9: 9 × n = 10 × n − n.",
              "Muốn tìm 1 phần mấy của một số thì chia cho số phần.",
            ],
          },
        },
                {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 8 × 8\nLuyện tập chung chủ đề 2\n1) hàng đơn vị 8 × 8 = 64, viết 4 nhớ 6\n2) còn nhớ 6 ở hàng cao hơn, viết 6\nVậy 8 × 8 = 64.",
            "cotTinh": {
              "left": 8,
              "right": 8,
              "sign": "×",
              "remember": true
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi chia 64 : 8\n1) hạ 6: 6 chưa chia được cho 8, hạ tiếp chữ số sau\n2) hạ 4: 64 : 8 = 8, viết 8\nVậy 64 : 8 = 8.",
            "cotTinh": {
              "left": 64,
              "right": 8,
              "sign": ":"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính 9 × 7\n1) hàng đơn vị 9 × 7 = 63, viết 3 nhớ 6\n2) còn nhớ 6 ở hàng cao hơn, viết 6\nVậy 9 × 7 = 63.",
            "cotTinh": {
              "left": 9,
              "right": 7,
              "sign": "×",
              "remember": true
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi chia 63 : 9\n1) hạ 6: 6 chưa chia được cho 9, hạ tiếp chữ số sau\n2) hạ 3: 63 : 9 = 7, viết 7\nVậy 63 : 9 = 7.",
            "cotTinh": {
              "left": 63,
              "right": 9,
              "sign": ":"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 8,
              "right": 8,
              "sign": "×",
              "remember": true
            },
            "text": "Bé tự đặt tính: 8 × 8\nhàng đơn vị 8 × 8 = 64, viết 4 nhớ 6\ncòn nhớ 6 ở hàng cao hơn, viết 6\nVậy 8 × 8 = 64."
          }
        },
        {
          "type": "visual",
          "content": {
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "9 : 9",
                  "1"
                ],
                [
                  "18 : 9",
                  "2"
                ],
                [
                  "27 : 9",
                  "3"
                ],
                [
                  "36 : 9",
                  "4"
                ],
                [
                  "45 : 9",
                  "5"
                ]
              ]
            },
            "text": "Bảng chia 9 đi ngược từ bảng nhân 9\n9 × 2 = 18 nên 18 : 9 = 2\nMuốn biết 54 : 9, bé tự hỏi: 9 nhân mấy bằng 54?"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Cách thuộc bảng chia 9",
            "explanation": "Bảng chia 9 không cần học riêng: bé tra ngược bảng nhân 9 là ra.",
            "points": [
              "9 × k = tích, thì tích : 9 = k.",
              "9 × 5 = 45; 9 × 10 = 90.",
              "Học thuộc rồi thì đọc ngược lại cũng được: 45 : 9 = 5.",
              "Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "54 : 9 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              7
            ],
            "answer": 6,
            "mascotHint": "Vì 9 × 6 = 54 nên 54 : 9 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "9 × 7 bằng bao nhiêu?",
            "options": [
              54,
              63,
              64,
              72
            ],
            "answer": 63,
            "mascotHint": "9 × 7 = 63 — bé cộng thêm 9 vào 54."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "4 × 4 bằng bao nhiêu?",
            "options": [
              6,
              15,
              16,
              17
            ],
            "answer": 16,
            "mascotHint": "hàng đơn vị 4 × 4 = 16, viết 6 nhớ 1. Kết quả 16."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 × 8 bằng bao nhiêu?",
            options: [56, 64, 72, 16],
            answer: 64,
            mascotHint: "8 × 8 = 64.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "1/4 của 36 bằng bao nhiêu?",
            options: [6, 8, 9, 32],
            answer: 9,
            mascotHint: "36 : 4 = 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành chủ đề 2.",
              "8 × 8 = 64; 1/4 của 36 = 9.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
