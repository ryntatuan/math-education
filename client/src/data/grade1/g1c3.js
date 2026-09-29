export const g1c3 = {
  id: "g1-c3",
  name: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
  description:
    "Phép cộng, phép trừ trong phạm vi 10; bảng cộng, bảng trừ; số 0 trong phép tính",
  icon: "➕",
  color: "#ff8a65",
  totalLessons: 14,
  lessons: [
    {
      id: "g1-c3-l1",
      title: "Bài 1: Làm quen với phép cộng và dấu cộng",
      type: "learn",
      description: "Nhận biết phép cộng nghĩa là gộp lại và thêm vào",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có 3 quả bóng, bé cho thêm 2 quả. Có tất cả mấy quả nhỉ? 🎈",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phép cộng là gộp lại",
            explanation:
              "Phép cộng dùng để GỘP hai nhóm đồ vật lại. Dấu cộng viết là +.",
            rule: "3 quả bóng gộp với 2 quả bóng được 5 quả. Ta viết 3 + 2 = 5. Đọc là: ba cộng hai bằng năm.",
            points: [
              "Dấu + đọc là 'cộng'.",
              "Phép cộng làm số lượng TĂNG lên.",
              "Kết quả của phép cộng luôn lớn hơn hoặc bằng mỗi số ban đầu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🎈🎈🎈  +  🎈🎈  =  🎈🎈🎈🎈🎈\n3 + 2 = 5",
            operation: {
              left: 3,
              sign: "+",
              right: 2,
              result: 5,
            },
            groupScene: {
              mode: "sumGroups",
              groups: [
                {
                  emoji: "🎈",
                  n: 3,
                },
                {
                  emoji: "🎈",
                  n: 2,
                },
              ],
              result: 5,
              note: "3 quả bóng gộp với 2 quả bóng được 5 quả bóng.",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 3,
              right: 2,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 3 + 2\nhàng đơn vị 3 + 2 = 5, viết 5\nVậy 3 + 2 = 5."
          }
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 3,
              to: 5,
              step: 1,
              hops: [
                {
                  from: 3,
                  to: 5,
                  label: "+2"
                }
              ]
            },
            text: "Cách nhẩm nhanh cho 3 + 2\nBé đếm thêm từng bước theo các cung nhảy.\nĐếm thêm 2 bước từ 3.\nVậy 3 + 2 = 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 4 bằng bao nhiêu?",
            options: [7, 8, 9, 18],
            answer: 8,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "2 + 4 bằng bao nhiêu?",
            options: [5, 6, 7, 8],
            answer: 6,
            mascotHint: "hàng đơn vị 2 + 4 = 6, viết 6. Kết quả 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 + 2 bằng bao nhiêu?",
            options: [4, 5, 6, 1],
            answer: 5,
            mascotHint: "Gộp 3 quả với 2 quả được 5 quả: 3 + 2 = 5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Phép cộng là gộp lại, dùng dấu +.", "3 + 2 = 5."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l2",
      title: "Bài 2: Cộng bằng cách đếm tiếp",
      type: "learn",
      description: "Dùng cách đếm tiếp để tìm kết quả phép cộng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 4 con cá, thêm 3 con nữa bơi đến. Đếm tiếp thế nào cho nhanh nhỉ? 🐟",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm tiếp",
            explanation:
              "Bé bắt đầu từ số thứ nhất, rồi đếm thêm đúng số lần bằng số thứ hai.",
            rule: "Mẹo nhớ: bé giữ nguyên số lớn rồi nhích thêm từng bước.",
            points: [
              "Đếm tiếp 3 bước từ 4: 5, 6, 7.",
              "Không cần đếm lại từ đầu.",
              "Cách này nhanh hơn đếm tất cả.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 + 3\n4 → 5 → 6 → 7\nKết quả: 7",
            numberLine: {
              from: 4,
              to: 7,
              step: 1,
              marks: [4, 5, 6, 7],
              hops: [
                {
                  from: 4,
                  to: 7,
                  label: "+3",
                },
              ],
              label: "4 + 3: đếm tiếp 4 → 5 → 6 → 7",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 4,
              right: 3,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 4 + 3\nhàng đơn vị 4 + 3 = 7, viết 7\nVậy 4 + 3 = 7."
          }
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 4,
              to: 7,
              step: 1,
              hops: [
                {
                  from: 4,
                  to: 7,
                  label: "+3"
                }
              ]
            },
            text: "Cách nhẩm nhanh cho 4 + 3\nBé đếm thêm từng bước theo các cung nhảy.\nĐếm thêm 3 bước từ 4.\nVậy 4 + 3 = 7."
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đặt tính", "viết các số thẳng cột với nhau"],
                ["Bước 2 — Tính", "tính lần lượt từ phải sang trái"],
                ["Bước 3 — Thử lại", "kiểm lại bằng cách tính ngược lại một lần nữa"],
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 + 8 bằng bao nhiêu?",
            options: [15, 16, 17, 26],
            answer: 16,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 16."
          }
        },
        {
          type: "quiz",
          content: {
            question: "7 + 1 bằng bao nhiêu?",
            options: [7, 8, 9, 10],
            answer: 8,
            mascotHint: "hàng đơn vị 7 + 1 = 8, viết 8. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "5 + 2 bằng bao nhiêu? Đếm tiếp từ 5 nào!",
            options: [6, 7, 8, 3],
            answer: 7,
            mascotHint: "Từ 5 đếm tiếp 2 bước: 6, 7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Đếm tiếp từ số thứ nhất.", "4 + 3 = 7; 5 + 2 = 7."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l3",
      title: "Bài 3: Đổi chỗ hai số trong phép cộng",
      type: "learn",
      description: "Nhận biết đổi chỗ hai số hạng thì kết quả không đổi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "2 + 5 và 5 + 2 có bằng nhau không nhỉ? Bé cùng Rô-bốt thử nhé! 🔄",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Điều Thú Vị",
            title: "Đổi chỗ, kết quả không đổi",
            explanation:
              "Trong phép cộng, đổi chỗ hai số thì kết quả vẫn như cũ.",
            rule: "2 + 5 = 7 và 5 + 2 = 7. Vậy 2 + 5 = 5 + 2.",
            points: [
              "Gộp 2 quả với 5 quả cũng bằng gộp 5 quả với 2 quả.",
              "Biết 1 + 4 = 5 thì biết luôn 4 + 1 = 5.",
              "Điều này giúp bé nhớ ít hơn mà biết nhiều hơn!",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "2 + 5 = 7\n5 + 2 = 7\n→ 2 + 5 = 5 + 2",
            operation: {
              left: 5,
              sign: "+",
              right: 2,
              result: 7,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2 + 5", "7"],
                ["5 + 2", "7"],
              ],
              label: "Đổi chỗ hai số, kết quả không đổi",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền kết quả còn thiếu",
            bangTinh: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["9 + 0", "9"],
                ["8 + 1", null],
                ["7 + 2", null],
                ["6 + 3", null],
                ["5 + 4", null],
              ],
              answers: [9, 9, 9, 9],
              options: [8, 9, 10],
              title: "Bé chọn số điền vào ô ?",
              hint: "Các phép cộng trong bảng đều có kết quả bằng 9 — bé đếm tiếp để kiểm tra.",
              label: "Các phép cộng trong bảng đều có kết quả bằng 9",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 2,
              right: 5,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 2 + 5\nhàng đơn vị 2 + 5 = 7, viết 7\nVậy 2 + 5 = 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 5 bằng bao nhiêu?",
            options: [8, 9, 10, 11],
            answer: 9,
            mascotHint: "hàng đơn vị 4 + 5 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "7 + 2 bằng bao nhiêu?",
            options: [7, 8, 9, 10],
            answer: 9,
            mascotHint: "7 + 2 = 9. Đổi chỗ thành 2 + 7 cũng bằng 9.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Biết 3 + 6 = 9. Vậy 6 + 3 bằng bao nhiêu?",
            options: [3, 9, 6, 15],
            answer: 9,
            mascotHint: "Đổi chỗ hai số thì kết quả không đổi: vẫn là 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đổi chỗ hai số trong phép cộng thì kết quả không đổi.",
              "2 + 5 = 5 + 2 = 7.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c3-l4",
      title: "Bài 4: Số 0 trong phép cộng",
      type: "learn",
      description: "Nhận biết cộng với 0 thì kết quả không đổi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Trên đĩa có 5 quả cam, Rô-bốt không thêm quả nào. Trên đĩa có mấy quả? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cộng với 0",
            explanation:
              "Thêm 0 nghĩa là không thêm gì cả, nên số lượng giữ nguyên.",
            rule: "5 + 0 = 5. Số nào cộng với 0 cũng bằng chính số đó.",
            points: [
              "0 + 3 = 3 và 3 + 0 = 3.",
              "Thêm không có gì thì vẫn là số cũ.",
              "Đây là phép cộng dễ nhất!",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "5 + 0 = 5\n0 + 3 = 3",
            operation: {
              left: 5,
              sign: "+",
              right: 0,
              result: 5,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["5 + 0", "5"],
                ["0 + 3", "3"],
              ],
              label: "Cộng với 0 thì giữ nguyên số đó",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền kết quả còn thiếu",
            bangTinh: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["6 + 1", "7"],
                ["5 + 2", null],
                ["4 + 3", null],
                ["3 + 4", "7"],
                ["2 + 5", null],
                ["1 + 6", null],
                ["0 + 7", "7"],
              ],
              answers: [7, 7, 7, 7],
              options: [6, 7, 8],
              title: "Bé chọn số điền vào ô ?",
              hint: "Mọi phép cộng trong bảng đều có kết quả bằng 7.",
              label: "Mọi phép cộng trong bảng đều có kết quả bằng 7",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 3,
              right: 1,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 3 + 1\nhàng đơn vị 3 + 1 = 4, viết 4\nVậy 3 + 1 = 4."
          }
        },
        {
          type: "quiz",
          content: {
            question: "7 + 1 bằng bao nhiêu?",
            options: [7, 8, 9, 10],
            answer: 8,
            mascotHint: "hàng đơn vị 7 + 1 = 8, viết 8. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "5 + 2 bằng bao nhiêu?",
            options: [6, 7, 8, 9],
            answer: 7,
            mascotHint: "Từ 5 đếm tiếp 2 bước: 6, 7.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cộng ba số: 3 + 1 + 2",
            table: {
              headers: ["Bước", "Phép tính"],
              rows: [
                ["1", "3 + 1 = 4"],
                ["2", "4 + 2 = 6"],
              ],
              label:
                "3 + 1 + 2 = 6 — làm lần lượt từ trái sang phải",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 + 1 + 2 bằng bao nhiêu?",
            options: [4, 5, 6, 7],
            answer: 6,
            mascotHint: "Làm từng bước: 3 + 1 = 4, rồi 4 + 2 = 6.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "7 + 0 bằng bao nhiêu?",
            options: [0, 1, 7, 70],
            answer: 7,
            mascotHint: "Cộng với 0 thì kết quả vẫn là chính số đó: 7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Số nào cộng với 0 cũng bằng chính nó.", "5 + 0 = 5."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l5",
      title: "Bài 5: Làm quen với phép trừ và dấu trừ",
      type: "learn",
      description: "Nhận biết phép trừ nghĩa là bớt đi, lấy đi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 6 cái kẹo, Rô-bốt ăn mất 2 cái. Còn lại mấy cái nhỉ? 🍬",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phép trừ là bớt đi",
            explanation:
              "Phép trừ dùng khi BỚT ĐI hoặc LẤY ĐI một số đồ vật. Dấu trừ viết là −.",
            rule: "6 cái kẹo bớt 2 cái còn 4 cái. Ta viết 6 − 2 = 4. Đọc là: sáu trừ hai bằng bốn.",
            points: [
              "Dấu − đọc là 'trừ'.",
              "Phép trừ làm số lượng GIẢM đi.",
              "Kết quả phép trừ luôn bé hơn hoặc bằng số ban đầu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🍬🍬🍬🍬🍬🍬  −🍬🍬  =  🍬🍬🍬🍬\n6 − 2 = 4",
            operation: {
              left: 6,
              sign: "−",
              right: 2,
              result: 4,
            },
            groupScene: {
              mode: "takeAway",
              emoji: "🍬",
              total: 6,
              remove: 2,
              note: "6 cái kẹo, gạch chéo 2 cái đã bớt — bé đếm xem còn lại mấy cái.",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 6,
              right: 2,
              sign: "−"
            },
            text: "Bé tự đặt tính: 6 − 2\nhàng đơn vị 6 − 2 = 4, viết 4\nVậy 6 − 2 = 4."
          }
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 2,
              to: 6,
              step: 1,
              hops: [
                {
                  from: 2,
                  to: 6,
                  label: "+4"
                }
              ]
            },
            text: "Cách 2 cho 6 − 2: đếm thêm từ số bé\nTừ 2 đếm thêm cho tới 6 là bao nhiêu bước?\nĐó chính là hiệu: 6 − 2 = 4."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 − 1 bằng bao nhiêu?",
            options: [2, 3, 4, 13],
            answer: 3,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 3."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 − 2 bằng bao nhiêu?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "hàng đơn vị 4 − 2 = 2, viết 2. Kết quả 2."
          }
        },
        {
          type: "quiz",
          content: {
            question: "6 − 2 bằng bao nhiêu?",
            options: [3, 4, 5, 8],
            answer: 4,
            mascotHint: "6 cái kẹo bớt 2 còn 4: 6 − 2 = 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Phép trừ là bớt đi, dùng dấu −.", "6 − 2 = 4."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l6",
      title: "Bài 6: Trừ bằng cách đếm lùi",
      type: "learn",
      description: "Dùng cách đếm lùi để tìm kết quả phép trừ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 9 quả bóng, bay mất 3 quả. Đếm lùi thế nào cho nhanh? 🎈",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm lùi",
            explanation:
              "Bé bắt đầu từ số bị trừ, rồi đếm lùi lại đúng số bước bằng số trừ.",
            rule: "9 − 3: bắt đầu từ 9, đếm lùi 8, 7, 6. Vậy 9 − 3 = 6.",
            points: [
              "Đếm lùi 3 bước từ 9: 8, 7, 6.",
              "Đếm lùi là bớt 1 mỗi bước.",
              "Cách này rất nhanh khi số trừ bé.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "9 − 3\n9 → 8 → 7 → 6\nKết quả: 6",
            numberLine: {
              from: 6,
              to: 9,
              step: 1,
              marks: [6, 7, 8, 9],
              hops: [
                {
                  from: 9,
                  to: 6,
                  label: "−3",
                },
              ],
              label: "9 − 3: đếm lùi 9 → 8 → 7 → 6",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 9,
              right: 3,
              sign: "−"
            },
            text: "Bé tự đặt tính: 9 − 3\nhàng đơn vị 9 − 3 = 6, viết 6\nVậy 9 − 3 = 6."
          }
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 3,
              to: 9,
              step: 1,
              hops: [
                {
                  from: 3,
                  to: 9,
                  label: "+6"
                }
              ]
            },
            text: "Cách 2 cho 9 − 3: đếm thêm từ số bé\nTừ 3 đếm thêm cho tới 9 là bao nhiêu bước?\nĐó chính là hiệu: 9 − 3 = 6."
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đặt tính", "viết các số thẳng cột với nhau"],
                ["Bước 2 — Tính", "tính lần lượt từ phải sang trái"],
                ["Bước 3 — Thử lại", "kiểm lại bằng cách tính ngược lại một lần nữa"],
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 − 1 bằng bao nhiêu?",
            options: [6, 7, 8, 17],
            answer: 7,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "5 − 4 bằng bao nhiêu?",
            options: [1, 2, 3],
            answer: 1,
            mascotHint: "hàng đơn vị 5 − 4 = 1, viết 1. Kết quả 1."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 − 2 bằng bao nhiêu? Đếm lùi từ 8 nào!",
            options: [5, 6, 7, 10],
            answer: 6,
            mascotHint: "Từ 8 đếm lùi 2 bước: 7, 6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Đếm lùi từ số bị trừ.", "9 − 3 = 6; 8 − 2 = 6."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l7",
      title: "Bài 7: Số 0 trong phép trừ",
      type: "learn",
      description: "Nhận biết trừ đi 0 và trừ hai số bằng nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 4 cái bánh, Rô-bốt không ăn cái nào. Vậy còn mấy cái? 🍪",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Trừ đi 0",
            explanation:
              "Bớt 0 nghĩa là không bớt gì cả, nên số lượng giữ nguyên. Trừ hai số bằng nhau thì còn 0.",
            rule: "4 − 0 = 4. Và 4 − 4 = 0.",
            points: [
              "Số nào trừ 0 cũng bằng chính nó.",
              "Hai số bằng nhau trừ nhau thì bằng 0.",
              "5 − 5 = 0; 7 − 0 = 7.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 − 0 = 4\n4 − 4 = 0",
            operation: {
              left: 4,
              sign: "−",
              right: 0,
              result: 4,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["4 − 0", "4"],
                ["4 − 4", "0"],
              ],
              label: "Trừ 0 thì giữ nguyên · trừ hết thì bằng 0",
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
              "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, gộp, bớt, cho đi).",
              "Bước 2 — Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
              "Bước 3 — Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ.",
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
            question: "6 − 0 bằng bao nhiêu?",
            options: [0, 6, 60, 1],
            answer: 6,
            mascotHint: "Trừ đi 0 thì giữ nguyên: 6.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 − 6 bằng bao nhiêu?",
            options: [0, 6, 12, 1],
            answer: 0,
            mascotHint: "Lấy hết đi thì không còn gì: 6 − 6 = 0.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số nào trừ 0 cũng bằng chính nó.",
              "Hai số bằng nhau trừ nhau thì bằng 0.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c3-l8",
      title: "Bài 8: Bảng cộng trong phạm vi 10",
      type: "learn",
      description: "Học thuộc bảng cộng trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã thuộc bảng cộng chưa? Cùng Rô-bốt học thuộc nhé! 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Cộng",
            title: "Bảng cộng trong phạm vi 10",
            explanation:
              "Bảng này gồm tất cả các phép cộng có kết quả từ 2 đến 10. Học thuộc thì bé tính nhẩm rất nhanh.",
            rule: "1+1=2 · 2+2=4 · 3+3=6 · 4+4=8 · 5+5=10. Và 2+3=5 · 3+4=7 · 4+5=9.",
            points: [
              "Các phép cộng hai số giống nhau cho số chẵn: 3 + 3 = 6.",
              "Kết quả lớn nhất là 10.",
              "Đổi chỗ hai số thì kết quả không đổi, nên bé chỉ cần nhớ một nửa bảng.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1+1=2  2+2=4  3+3=6  4+4=8  5+5=10\n2+3=5  3+4=7  4+5=9  5+4=9",
            table: {
              headers: ["Phép cộng", "Kết quả"],
              rows: [
                ["1 + 1", "2"],
                ["2 + 2", "4"],
                ["3 + 3", "6"],
                ["4 + 4", "8"],
                ["5 + 5", "10"],
                ["2 + 3", "5"],
              ],
              label: "Bảng cộng trong phạm vi 10",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền kết quả còn thiếu",
            bangTinh: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["9 + 1", "10"],
                ["8 + 2", null],
                ["7 + 3", null],
                ["6 + 4", null],
                ["5 + 5", null],
              ],
              answers: [10, 10, 10, 10],
              options: [9, 10, 11],
              title: "Bé chọn số điền vào ô ?",
              hint: "Các phép cộng trong bảng đều có kết quả bằng 10.",
              label: "Các phép cộng trong bảng đều có kết quả bằng 10",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 1,
              right: 1,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 1 + 1\nhàng đơn vị 1 + 1 = 2, viết 2\nVậy 1 + 1 = 2."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 2 bằng bao nhiêu?",
            options: [5, 6, 7, 8],
            answer: 6,
            mascotHint: "hàng đơn vị 4 + 2 = 6, viết 6. Kết quả 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 + 2 bằng bao nhiêu?",
            options: [9, 10, 11, 6],
            answer: 10,
            mascotHint: "Từ 8 đếm tiếp 2 bước: 9, 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "4 + 5 bằng bao nhiêu?",
            options: [8, 9, 10, 11],
            answer: 9,
            mascotHint: "4 + 5 = 9 (và 5 + 4 cũng bằng 9).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 + 3 bằng bao nhiêu?",
            options: [5, 6, 7, 9],
            answer: 6,
            mascotHint: "3 + 3 = 6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Bảng cộng có kết quả đến 10.", "4 + 5 = 9; 3 + 3 = 6."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l9",
      title: "Bài 9: Bảng trừ trong phạm vi 10",
      type: "learn",
      description: "Học thuộc bảng trừ trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Từ bảng cộng, bé suy ra bảng trừ ngay được đấy! Bé xem nhé ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Bảng Trừ",
            title: "Bảng trừ trong phạm vi 10",
            explanation: "Từ một phép cộng, bé viết được hai phép trừ.",
            rule: "5 + 4 = 9 → 9 − 5 = 4 và 9 − 4 = 5.",
            points: [
              "9 − 5 = 4; 9 − 4 = 5.",
              "10 − 5 = 5.",
              "Học bảng cộng là có luôn bảng trừ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "5 + 4 = 9\n9 − 5 = 4\n9 − 4 = 5",
            operation: {
              left: 9,
              sign: "−",
              right: 5,
              result: 4,
            },
            table: {
              headers: ["Phép trừ", "Kết quả"],
              rows: [
                ["9 − 5", "4"],
                ["9 − 4", "5"],
                ["8 − 3", "5"],
                ["10 − 4", "6"],
              ],
              label: "Bảng trừ trong phạm vi 10",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền kết quả còn thiếu",
            bangTinh: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["7 − 1", "6"],
                ["7 − 2", null],
                ["7 − 3", "4"],
                ["7 − 4", null],
                ["7 − 7", "0"],
                ["7 − 0", "7"],
              ],
              answers: [5, 3],
              options: [2, 3, 4, 5],
              title: "Bé chọn số điền vào ô ?",
              hint: "Lấy 7 trừ dần: bé đếm lùi từ 7.",
              label: "Lấy 7 trừ 0, 1, 2, 3 … 7 — xem kết quả nhỏ dần",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 5,
              right: 4,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 5 + 4\nhàng đơn vị 5 + 4 = 9, viết 9\nVậy 5 + 4 = 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 3 bằng bao nhiêu?",
            options: [6, 7, 8, 9],
            answer: 7,
            mascotHint: "hàng đơn vị 4 + 3 = 7, viết 7. Kết quả 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "7 − 2 bằng bao nhiêu?",
            options: [4, 5, 6, 9],
            answer: 5,
            mascotHint: "Từ 7 đếm lùi 2 bước: 6, 5.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Biết 3 + 6 = 9. Vậy 9 − 3 bằng bao nhiêu?",
            options: [3, 6, 9, 12],
            answer: 6,
            mascotHint: "9 − 3 = 6 (vì 3 + 6 = 9).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 − 5 bằng bao nhiêu?",
            options: [4, 5, 6, 15],
            answer: 5,
            mascotHint: "5 + 5 = 10 nên 10 − 5 = 5.",
          },
        },
        {
          type: "typeAnswer",
          content: {
            question: "Tính rồi viết kết quả",
            expression: "10 − 6 =",
            answer: 4,
            mascotHint: "Từ 10 đếm lùi 6 bước: 9, 8, 7, 6, 5, 4. Vậy 10 − 6 = 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Từ một phép cộng viết được hai phép trừ.",
              "9 − 5 = 4; 10 − 5 = 5.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c3-l10",
      title: "Bài 10: Quan hệ giữa phép cộng và phép trừ",
      type: "learn",
      description: "Nhận biết cộng và trừ là hai phép tính ngược nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cộng rồi trừ cùng một số thì sao nhỉ? Bé thử với 5 nhé! 🔄",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Điều Thú Vị",
            title: "Cộng và trừ ngược nhau",
            explanation:
              "Cộng thêm bao nhiêu rồi trừ đi bấy nhiêu thì trở về số ban đầu.",
            rule: "5 + 3 = 8, rồi 8 − 3 = 5. Ta trở về đúng số 5 lúc đầu.",
            points: [
              "Cộng làm tăng, trừ làm giảm.",
              "Cùng một số: cộng rồi trừ thì về chỗ cũ.",
              "Nhờ vậy bé thử lại được kết quả phép cộng bằng phép trừ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "5 + 3 = 8\n8 − 3 = 5\nVề lại số ban đầu",
            operation: {
              left: 5,
              sign: "+",
              right: 3,
              result: 8,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["5 + 3", "8"],
                ["8 − 3", "5"],
                ["8 − 5", "3"],
              ],
              label: "Từ một phép cộng suy ra hai phép trừ",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 5,
              right: 3,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 5 + 3\nhàng đơn vị 5 + 3 = 8, viết 8\nVậy 5 + 3 = 8."
          }
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 5,
              to: 8,
              step: 1,
              hops: [
                {
                  from: 5,
                  to: 8,
                  label: "+3"
                }
              ]
            },
            text: "Cách nhẩm nhanh cho 5 + 3\nBé đếm thêm từng bước theo các cung nhảy.\nĐếm thêm 3 bước từ 5.\nVậy 5 + 3 = 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 8 bằng bao nhiêu?",
            options: [11, 12, 13, 22],
            answer: 12,
            mascotHint: "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 12."
          }
        },
        {
          type: "quiz",
          content: {
            question: "4 + 4 bằng bao nhiêu?",
            options: [7, 8, 9, 10],
            answer: 8,
            mascotHint: "hàng đơn vị 4 + 4 = 8, viết 8. Kết quả 8."
          }
        },
        {
          type: "quiz",
          content: {
            question: "6 + 2 = 8. Vậy 8 − 2 bằng bao nhiêu?",
            options: [2, 6, 8, 10],
            answer: 6,
            mascotHint: "Cộng 2 rồi trừ 2 thì về số ban đầu: 6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng và trừ là hai phép ngược nhau.",
              "6 + 2 = 8 và 8 − 2 = 6.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l11",
      title: "Bài 11: Tìm số còn thiếu trong phép tính",
      type: "learn",
      description: "Tìm số hạng còn thiếu trong phép cộng đơn giản",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt che mất một số: 3 + ? = 7. Bé tìm giúp nhé! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Tìm số còn thiếu",
            explanation:
              "Bé đếm từ số đã biết lên đến kết quả xem cần thêm mấy bước.",
            rule: "Ô trống chính là khoảng cách giữa hai số đã cho.",
            points: [
              "Đếm tiếp từ số đã biết đến kết quả.",
              "Số bước đếm được chính là số còn thiếu.",
              "3 + 4 = 7 nên chỗ trống là 4.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "3 + ? = 7\n3 → 4 → 5 → 6 → 7  (4 bước)\n? = 4",
            numberLine: {
              from: 3,
              to: 7,
              step: 1,
              marks: [3, 7],
              hops: [
                {
                  from: 3,
                  to: 7,
                  label: "? bước",
                },
              ],
              label: "3 + ? = 7 — đếm từ 3 đến 7 được 4 bước",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 4,
              right: 2,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 4 + 2\nhàng đơn vị 4 + 2 = 6, viết 6\nVậy 4 + 2 = 6."
          }
        },
        {
          type: "quiz",
          content: {
            question: "8 + 1 bằng bao nhiêu?",
            options: [8, 9, 10, 11],
            answer: 9,
            mascotHint: "hàng đơn vị 8 + 1 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: 3 + ? = 7",
            options: [3, 4, 5, 10],
            answer: 4,
            mascotHint: "Từ 3 đếm tiếp 4 bước thì đến 7. Vậy ? = 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: ? + 2 = 6",
            options: [3, 4, 5, 8],
            answer: 4,
            mascotHint: "4 + 2 = 6 nên ? = 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Đếm tiếp để tìm số còn thiếu.", "3 + 4 = 7."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l12",
      title: "Bài 12: Bài toán có lời văn — thêm vào, bớt đi",
      type: "learn",
      description: "Giải bài toán đơn giản có thêm vào hoặc bớt đi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Trên cành có 5 con chim, 2 con bay đến. Hỏi có tất cả mấy con? 🐤",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "'Thêm vào' thì cộng, 'bớt đi' thì trừ",
            explanation:
              "Bé đọc kĩ đề, tìm từ khóa để biết dùng phép cộng hay phép trừ.",
            rule: "5 con chim, thêm 2 con: 5 + 2 = 7 (con chim).",
            points: [
              "Từ khóa cộng: thêm, có thêm, bay đến, cho thêm.",
              "Từ khóa trừ: bớt, bay đi, cho đi, ăn mất.",
              "Đáp số phải ghi kèm đơn vị: con chim.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Có 5 con chim + thêm 2 con\n5 + 2 = 7 (con chim)",
            operation: {
              left: 5,
              sign: "+",
              right: 2,
              result: 7,
            },
            barModel: {
              rows: [
                {
                  label: "Có sẵn",
                  parts: 5,
                },
                {
                  label: "Thêm vào",
                  parts: 2,
                },
              ],
              braceLabel: "7 con chim",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 5,
              right: 2,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 5 + 2\nhàng đơn vị 5 + 2 = 7, viết 7\nVậy 5 + 2 = 7."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 + 1 bằng bao nhiêu?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "hàng đơn vị 1 + 1 = 2, viết 2. Kết quả 2."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên cành có 5 con chim, 2 con bay đến. Hỏi có tất cả bao nhiêu con chim?",
            options: [3, 6, 7, 8],
            answer: 7,
            mascotHint: "Thêm vào thì cộng: 5 + 2 = 7 con chim.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Có 8 quả bóng, bay mất 3 quả. Hỏi còn lại bao nhiêu quả bóng?",
            options: [4, 5, 6, 11],
            answer: 5,
            mascotHint: "Bớt đi thì trừ: 8 − 3 = 5 quả bóng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "'Thêm' thì cộng, 'bớt' thì trừ.",
              "5 + 2 = 7; 8 − 3 = 5.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c3-l13",
      title: "Bài 13: Luyện tập cộng trừ trong phạm vi 10",
      type: "learn",
      description: "Luyện tập tổng hợp cộng trừ trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết cộng trừ rồi! Mình luyện cho thật nhanh nhé 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Ba mẹo tính nhanh",
            explanation:
              "Bé dùng ba mẹo: đếm tiếp khi cộng, đếm lùi khi trừ, và nhớ bảng cộng trừ.",
            points: [
              "Cộng: đếm tiếp từ số lớn hơn cho nhanh.",
              "Trừ: đếm lùi.",
              "Số nào cộng 0 cũng bằng chính nó; trừ 0 cũng vậy.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "6 + 3 = 9\n9 − 3 = 6\n9 − 6 = 3",
            operation: {
              left: 6,
              sign: "+",
              right: 3,
              result: 9,
            },
            numberLine: {
              from: 6,
              to: 9,
              step: 1,
              marks: [6, 7, 8, 9],
              label: "Đếm tiếp từ 6 thêm 3 bước được 9",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 6,
              right: 3,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 6 + 3\nhàng đơn vị 6 + 3 = 9, viết 9\nVậy 6 + 3 = 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 + 8 bằng bao nhiêu?",
            options: [8, 9, 10, 11],
            answer: 9,
            mascotHint: "hàng đơn vị 1 + 8 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "6 + 3 bằng bao nhiêu?",
            options: [8, 9, 10, 3],
            answer: 9,
            mascotHint: "Từ 6 đếm tiếp 3 bước: 7, 8, 9.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "7 − 4 bằng bao nhiêu?",
            options: [2, 3, 4, 11],
            answer: 3,
            mascotHint: "Từ 7 đếm lùi 4 bước: 6, 5, 4, 3.",
          },
        },
        {
          type: "matchPairs",
          content: {
            question: "Nối mỗi phép tính với kết quả đúng của nó",
            pairs: [
              ["3 + 2", "5"],
              ["4 + 4", "8"],
              ["7 − 3", "4"],
            ],
            mascotHint: "Bé nhẩm từng phép tính rồi nối với kết quả nhé!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng thì đếm tiếp, trừ thì đếm lùi.",
              "6 + 3 = 9; 7 − 4 = 3.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c3-l14",
      title: "Bài 14: Luyện tập chung chủ đề 3",
      type: "learn",
      description: "Ôn tập toàn bộ phép cộng, phép trừ trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hết chủ đề 3 rồi! Bé đã tính cộng trừ trong phạm vi 10 rất tốt! 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 3",
            explanation:
              "Bé đã học phép cộng, phép trừ trong phạm vi 10, bảng cộng, bảng trừ và bài toán có lời văn.",
            points: [
              "Cộng là gộp lại; trừ là bớt đi.",
              "Đổi chỗ hai số khi cộng thì kết quả không đổi.",
              "Cộng rồi trừ cùng một số thì về số ban đầu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 + 6 = 10\n10 − 4 = 6\n10 − 6 = 4",
            operation: {
              left: 4,
              sign: "+",
              right: 6,
              result: 10,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["4 + 6", "10"],
                ["10 − 4", "6"],
                ["10 − 6", "4"],
              ],
              label: "Một phép cộng, hai phép trừ",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Từ phép cộng suy ra phép trừ",
            bangTinh: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["1 + 9", "10"],
                ["10 − 1", null],
                ["10 − 9", null],
                ["2 + 8", "10"],
                ["10 − 2", null],
                ["10 − 8", null],
              ],
              answers: [9, 1, 8, 2],
              options: [1, 2, 8, 9],
              title: "Bé chọn số điền vào ô ?",
              hint: "Từ một phép cộng, bé viết được hai phép trừ.",
              label: "Bảng quan hệ giữa phép cộng và phép trừ trong phạm vi 10",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 4,
              right: 6,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 4 + 6\nhàng đơn vị 4 + 6 = 10, viết 0 nhớ 1\ncòn nhớ 1 ở hàng cao hơn, viết 1\nVậy 4 + 6 = 10."
          }
        },
        {
          type: "quiz",
          content: {
            question: "5 + 7 bằng bao nhiêu?",
            options: [2, 11, 12, 13],
            answer: 12,
            mascotHint: "hàng đơn vị 5 + 7 = 12, viết 2 nhớ 1. Kết quả 12."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 + 9 = 10. Vậy 10 − 9 bằng bao nhiêu?",
            options: [1, 8, 9, 10],
            answer: 1,
            mascotHint: "10 − 9 = 1 (vì 1 + 9 = 10).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "4 + 6 bằng bao nhiêu?",
            options: [9, 10, 11, 2],
            answer: 10,
            mascotHint: "4 + 6 = 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 − 6 bằng bao nhiêu?",
            options: [3, 4, 6, 16],
            answer: 4,
            mascotHint: "Vì 6 + 4 = 10 nên 10 − 6 = 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Bé đã hoàn thành chủ đề 3.", "4 + 6 = 10; 10 − 6 = 4."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
