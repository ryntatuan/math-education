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
            rule: "4 + 3: bắt đầu từ 4, đếm tiếp 5, 6, 7. Vậy 4 + 3 = 7.",
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
            rule: "3 + ? = 7: từ 3 đếm tiếp 4, 5, 6, 7 — thêm 4 bước. Vậy số còn thiếu là 4.",
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
