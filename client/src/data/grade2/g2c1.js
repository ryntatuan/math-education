export const g2c1 = {
  id: "g2-c1",
  name: "Chủ đề 1: Ôn tập và bổ sung",
  description:
    "Ôn tập số đến 100, tia số và số liền trước - liền sau, thành phần của phép cộng phép trừ, hơn kém nhau bao nhiêu",
  icon: "🔄",
  color: "#4facfe",
  totalLessons: 9,
  lessons: [
    {
      id: "g2-c1-l1",
      title: "Bài 1: Ôn tập các số đến 100",
      type: "learn",
      description: "Nhận biết số có hai chữ số gồm hàng chục và hàng đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Chào mừng bé lên Lớp 2! Cùng Rô-bốt ôn lại các số đến 100 nhé! 🚀",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số có hai chữ số",
            explanation:
              "Mỗi số có hai chữ số gồm HÀNG CHỤC và HÀNG ĐƠN VỊ. Chữ số bên trái chỉ chục, chữ số bên phải chỉ đơn vị.",
            rule: "Số 47 gồm 4 chục và 7 đơn vị. Đọc là: bốn mươi bảy.",
            points: [
              "4 chục = 40; thêm 7 đơn vị nữa được 47.",
              "Số 63 gồm 6 chục và 3 đơn vị.",
              "Chữ số 0 ở hàng đơn vị nghĩa là 0 đơn vị: 50 gồm 5 chục và 0 đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "47  =  40  +  7",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [4, 7],
              label: "47 gồm 4 chục và 7 đơn vị — đọc là bốn mươi bảy",
            }
          },
        },
        {
          type: "visual",
          content: {
            text:"4 chục  +  7 đơn vị",
            baseTen: {
              tens: 4,
              ones: 7,
            }
          },
        },
        {
          "type": "concept",
          "content": {
            "badge": "Cách Học",
            "title": "Bốn bước làm một bài toán",
            "explanation": "Mọi bài tính toán đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            "points": [
              "Bước 1 — Đọc đề và xác định phép tính cần làm.",
              "Bước 2 — Đặt tính thẳng cột: hàng đơn vị dưới hàng đơn vị, hàng chục dưới hàng chục.",
              "Bước 3 — Tính từ PHẢI sang TRÁI; nhớ ghi hoặc xoá số nhớ ngay khi làm xong một hàng.",
              "Bước 4 — Thử lại bằng phép ngược hoặc bằng ước lượng xem kết quả có hợp lý không."
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
                  "Cộng",
                  "lấy kết quả trừ đi một số hạng để kiểm tra"
                ],
                [
                  "Trừ",
                  "lấy hiệu cộng số trừ phải được số bị trừ"
                ],
                [
                  "Thứ tự",
                  "luôn làm từ hàng đơn vị trước"
                ]
              ]
            },
            "text": "Bảng nhớ nhanh — tính toán\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Khi đặt tính rồi tính, bé bắt đầu từ hàng nào?",
            "options": [
              "Hàng đơn vị (từ phải sang trái)",
              "Hàng cao nhất (trái sang phải)",
              "Hàng nào cũng được",
              "Hàng chục trước"
            ],
            "answer": "Hàng đơn vị (từ phải sang trái)",
            "mascotHint": "Tính từ phải sang trái thì số nhớ mới kịp cộng vào hàng bên trái."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số 63 gồm mấy chục và mấy đơn vị?",
            options: [
              "6 chục và 3 đơn vị",
              "3 chục và 6 đơn vị",
              "63 chục",
              "6 chục và 0 đơn vị",
            ],
            answer: "6 chục và 3 đơn vị",
            mascotHint: "Chữ số 6 chỉ chục, chữ số 3 chỉ đơn vị.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số có hai chữ số gồm hàng chục và hàng đơn vị.",
              "47 = 40 + 7.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l2",
      title: "Bài 2: So sánh các số có hai chữ số",
      type: "learn",
      description:
        "Ôn lại cách so sánh hai số có hai chữ số và dùng đúng dấu >, <, =",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "58 và 85, số nào lớn hơn nhỉ? Nhìn thì hơi giống nhau đấy! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So hàng chục trước",
            explanation:
              "Khi so sánh hai số có hai chữ số, bé so HÀNG CHỤC trước. Hàng chục bằng nhau thì mới so hàng đơn vị.",
            rule: "58 và 85: 5 chục bé hơn 8 chục, nên 58 < 85.",
            points: [
              "Chục khác nhau thì xong ngay, không cần nhìn đơn vị.",
              "34 và 38: cùng 3 chục, so đơn vị 4 < 8 nên 34 < 38.",
              "Dấu: > là lớn hơn, < là bé hơn, = là bằng nhau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "58  <  85\n5 chục < 8 chục",
            comparison: {
              left: 58,
              sign: "<",
              right: 85,
            },
            table: {
              headers: ["Số", "Chục", "Đơn vị"],
              rows: [
                ["58", 5, 8],
                ["85", 8, 5],
              ],
              label: "5 chục bé hơn 8 chục nên 58 < 85",
            },
          },
        },
        {
          "type": "concept",
          "content": {
            "badge": "Cách Học",
            "title": "Bốn bước làm một bài toán",
            "explanation": "Mọi bài so sánh số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            "points": [
              "Bước 1 — Đếm số CHỮ SỐ của từng số trước.",
              "Bước 2 — Số nào nhiều chữ số hơn thì lớn hơn — xong, không cần so tiếp.",
              "Bước 3 — Cùng số chữ số thì so từng hàng từ TRÁI sang phải, gặp hàng khác nhau thì dừng.",
              "Bước 4 — Đọc lại kết quả và đặt đúng dấu (>, <, =)."
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
                  "Nhiều chữ số hơn",
                  "thì số đó lớn hơn"
                ],
                [
                  "So từ trái",
                  "hàng nghìn rồi mới tới trăm, chục, đơn vị"
                ],
                [
                  "Dấu lớn mở về phía",
                  "số lớn hơn"
                ]
              ]
            },
            "text": "Bảng nhớ nhanh — so sánh số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Muốn so sánh hai số, bé bắt đầu bằng việc gì?",
            "options": [
              "Đếm xem số nào có nhiều chữ số hơn",
              "So chữ số hàng đơn vị trước",
              "Cộng hai số lại",
              "Đọc từ phải sang trái"
            ],
            "answer": "Đếm xem số nào có nhiều chữ số hơn",
            "mascotHint": "Số nhiều chữ số hơn chắc chắn lớn hơn, nên chỉ cần so từng hàng khi hai số bằng số chữ số."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 72 và 27, số nào lớn hơn?",
            options: [72, 27, "Hai số bằng nhau"],
            answer: 72,
            mascotHint: "7 chục lớn hơn 2 chục, nên 72 > 27.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "So hàng chục trước, hàng đơn vị sau.",
              "58 < 85 vì 5 chục bé hơn 8 chục.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l3",
      title: "Bài 3: Tia số",
      type: "learn",
      description: "Nhận biết tia số và điền số còn thiếu trên tia số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Tia số giống như một con đường có ghi số ở từng cột mốc đấy! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tia số là gì?",
            explanation:
              "Tia số là một đường thẳng bắt đầu từ số 0. Mỗi vạch trên tia số cách nhau đúng 1 đơn vị và mang một số.",
            rule: "Đi sang phải thì số tăng dần: 0, 1, 2, 3, 4... Đi sang trái thì số giảm dần.",
            points: [
              "Gốc của tia số là số 0.",
              "Hai vạch liền nhau hơn kém nhau 1 đơn vị.",
              "Số càng ở bên phải thì càng lớn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "0 — 1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10",
            numberLine: {
              from: 0,
              to: 10,
              step: 1,
              marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
              hops: [
                {
                  from: 0,
                  to: 10,
                  label: "sang phải: tăng dần",
                },
              ],
              label: "Tia số — đi sang phải số tăng, đi sang trái số giảm",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 25,
              "right": 1,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 25 + 1\nhàng đơn vị 5 + 1 = 6, viết 6\nhàng chục 2 + 0 = 2, viết 2\nVậy 25 + 1 = 26."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 25,
              "to": 26,
              "step": 1,
              "hops": [
                {
                  "from": 25,
                  "to": 26,
                  "label": "+1"
                }
              ]
            },
            "text": "Cách nhẩm nhanh cho 25 + 1\nBé đếm thêm từng bước trên tia số theo các cung nhảy.\nĐếm thêm 1 bước từ 25.\nVậy 25 + 1 = 26."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "45 + 7 bằng bao nhiêu?",
            "options": [
              51,
              52,
              53,
              62
            ],
            "answer": 52,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 52."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "41 + 1 bằng bao nhiêu?",
            "options": [
              41,
              42,
              43,
              44
            ],
            "answer": 42,
            "mascotHint": "hàng đơn vị 1 + 1 = 2, viết 2. Kết quả 42."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trên tia số, số nào đứng ngay sau số 25?",
            options: [24, 26, 35, 30],
            answer: 26,
            mascotHint: "Đi sang phải một vạch là cộng thêm 1: 25 + 1 = 26.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Tia số bắt đầu từ 0, mỗi vạch cách nhau 1 đơn vị.",
              "Sang phải thì tăng, sang trái thì giảm.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c1-l4",
      title: "Bài 4: Số liền trước, số liền sau",
      type: "learn",
      description: "Tìm số liền trước và số liền sau của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Số 69 có hai người hàng xóm thân thiết lắm. Bé đoán xem là số nào? 🏠",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Liền trước thì bớt 1, liền sau thì thêm 1",
            explanation:
              "Số liền trước của một số là số bé hơn nó đúng 1 đơn vị. Số liền sau là số lớn hơn nó đúng 1 đơn vị.",
            rule: "Số liền trước của 69 là 68 (69 − 1). Số liền sau của 69 là 70 (69 + 1).",
            points: [
              "Trên tia số, số liền trước ở bên trái, số liền sau ở bên phải.",
              "Số liền trước của 40 là 39.",
              "Số liền sau của 99 là 100.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "68  —  69  —  70\nliền trước · chính nó · liền sau",
            numberLine: {
              from: 68,
              to: 70,
              step: 1,
              marks: [68, 69, 70],
              label: "68 là liền trước · 69 là chính nó · 70 là liền sau",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết số thích hợp vào ô trống — số liền sau",
            bangTinh: {
              headers: ["Số", "Số liền sau"],
              rows: [
                [45, null],
                [67, null],
                [89, null],
              ],
              answers: [46, 68, 90],
              options: [44, 46, 66, 68, 88, 90],
              label: "Số liền sau của một số là số đứng ngay sau nó.",
            },
          },
        },
        {
          "type": "concept",
          "content": {
            "badge": "Cách Học",
            "title": "Bốn bước làm một bài toán",
            "explanation": "Mọi bài so sánh số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            "points": [
              "Bước 1 — Đếm số CHỮ SỐ của từng số trước.",
              "Bước 2 — Số nào nhiều chữ số hơn thì lớn hơn — xong, không cần so tiếp.",
              "Bước 3 — Cùng số chữ số thì so từng hàng từ TRÁI sang phải, gặp hàng khác nhau thì dừng.",
              "Bước 4 — Đọc lại kết quả và đặt đúng dấu (>, <, =)."
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
                  "Nhiều chữ số hơn",
                  "thì số đó lớn hơn"
                ],
                [
                  "So từ trái",
                  "hàng nghìn rồi mới tới trăm, chục, đơn vị"
                ],
                [
                  "Dấu lớn mở về phía",
                  "số lớn hơn"
                ]
              ]
            },
            "text": "Bảng nhớ nhanh — so sánh số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Muốn so sánh hai số, bé bắt đầu bằng việc gì?",
            "options": [
              "Đếm xem số nào có nhiều chữ số hơn",
              "So chữ số hàng đơn vị trước",
              "Cộng hai số lại",
              "Đọc từ phải sang trái"
            ],
            "answer": "Đếm xem số nào có nhiều chữ số hơn",
            "mascotHint": "Số nhiều chữ số hơn chắc chắn lớn hơn, nên chỉ cần so từng hàng khi hai số bằng số chữ số."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 69 là số nào?",
            options: [68, 70, 71, 79],
            answer: 70,
            mascotHint: "69 thêm 1 là 70!",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền trước của 40 là số nào?",
            options: [39, 41, 30, 400],
            answer: 39,
            mascotHint: "40 bớt 1 là 39.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Liền trước: bớt đi 1. Liền sau: thêm vào 1.",
              "Liền trước của 69 là 68, liền sau của 69 là 70.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l5",
      title: "Bài 5: Thành phần của phép cộng",
      type: "learn",
      description: "Gọi tên số hạng và tổng trong phép cộng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Phép cộng có hai người bạn và một kết quả. Bé biết tên gọi của chúng chưa? ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khái Niệm",
            title: "Số hạng – Số hạng – Tổng",
            explanation:
              "Hai số được cộng với nhau gọi là SỐ HẠNG. Kết quả của phép cộng gọi là TỔNG.",
            rule: "35 + 24 = 59: số 35 và số 24 là các số hạng; số 59 là tổng.",
            points: [
              "Số hạng là những số đứng trước dấu bằng.",
              "Tổng là kết quả, đứng sau dấu bằng.",
              "Đổi chỗ hai số hạng thì tổng không đổi: 3 + 5 = 5 + 3 = 8.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "35  +  24  =  59\nsố hạng · số hạng · tổng",
            operation: {
              left: 35,
              sign: "+",
              right: 24,
              result: 59,
            },
            table: {
              headers: ["Số hạng", "Số hạng", "Tổng"],
              rows: [[35, 24, 59]],
              label: "Thành phần của phép cộng",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 35,
              "right": 24,
              "sign": "+",
              "remember": true
            },
            "text": "Bé tự đặt tính: 35 + 24\nhàng đơn vị 5 + 4 = 9, viết 9\nhàng chục 3 + 2 = 5, viết 5\nVậy 35 + 24 = 59."
          }
        },
        {
          "type": "visual",
          "content": {
            "numberLine": {
              "from": 35,
              "to": 59,
              "step": 1,
              "hops": [
                {
                  "from": 35,
                  "to": 40,
                  "label": "+5"
                },
                {
                  "from": 40,
                  "to": 59,
                  "label": "+19"
                }
              ]
            },
            "text": "Cách nhẩm nhanh cho 35 + 24\nBé đếm thêm từng bước trên tia số theo các cung nhảy.\nĐếm thêm 5 để được 40 (tròn chục), rồi thêm 19 nữa.\nVậy 35 + 24 = 59."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "48 + 42 bằng bao nhiêu?",
            "options": [
              89,
              90,
              91,
              100
            ],
            "answer": 90,
            "mascotHint": "Bé đặt tính rồi tính từ hàng đơn vị. Kết quả 90."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "72 + 27 bằng bao nhiêu?",
            "options": [
              98,
              99,
              100,
              101
            ],
            "answer": 99,
            "mascotHint": "hàng đơn vị 2 + 7 = 9, viết 9. Kết quả 99."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phép cộng 35 + 24 = 59, số 59 gọi là gì?",
            options: ["Tổng", "Số hạng", "Hiệu", "Số bị trừ"],
            answer: "Tổng",
            mascotHint: "Kết quả của phép cộng là tổng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số hạng + số hạng = tổng.",
              "Trong 35 + 24 = 59, số hạng là 35 và 24, tổng là 59.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l6",
      title: "Bài 6: Thành phần của phép trừ",
      type: "learn",
      description: "Gọi tên số bị trừ, số trừ và hiệu",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Phép trừ cũng có tên gọi riêng cho từng số. Cùng học nhé! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khái Niệm",
            title: "Số bị trừ – Số trừ – Hiệu",
            explanation:
              "Số bị lấy đi gọi là SỐ BỊ TRỪ. Số lấy đi gọi là SỐ TRỪ. Kết quả gọi là HIỆU.",
            rule: "57 − 23 = 34: số 57 là số bị trừ, số 23 là số trừ, số 34 là hiệu.",
            points: [
              "Số bị trừ luôn là số lớn nhất trong ba số.",
              "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.",
              "Hiệu cũng là tên gọi của cả phép tính: đây là hiệu của 57 và 23.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "57  −  23  =  34\nsố bị trừ · số trừ · hiệu",
            operation: {
              left: 57,
              sign: "−",
              right: 23,
              result: 34,
            },
            table: {
              headers: ["Số bị trừ", "Số trừ", "Hiệu"],
              rows: [[57, 23, 34]],
              label: "Thành phần của phép trừ",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 57,
              "right": 23,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 57 − 23\nhàng đơn vị 7 − 3 = 4, viết 4\nhàng chục 5 − 2 = 3, viết 3\nVậy 57 − 23 = 34."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "47 − 31 bằng bao nhiêu?",
            "options": [
              15,
              16,
              17,
              18
            ],
            "answer": 16,
            "mascotHint": "hàng đơn vị 7 − 1 = 6, viết 6. Kết quả 16."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong phép trừ 57 − 23 = 34, số 23 gọi là gì?",
            options: ["Số trừ", "Số bị trừ", "Hiệu", "Tổng"],
            answer: "Số trừ",
            mascotHint: "Số lấy đi là 23 — đó là số trừ.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm số bị trừ, biết số trừ là 20 và hiệu là 15.",
            options: [5, 35, 40, 30],
            answer: 35,
            mascotHint: "Số bị trừ = hiệu + số trừ = 15 + 20 = 35.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số bị trừ − số trừ = hiệu.",
              "Muốn tìm số bị trừ, lấy hiệu cộng với số trừ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l7",
      title: "Bài 7: Hơn, kém nhau bao nhiêu",
      type: "learn",
      description: "Giải bài toán so sánh hai số hơn kém nhau bao nhiêu",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Mai có 12 cái kẹo, Lan có 8 cái kẹo. Vậy Mai hơn Lan bao nhiêu cái nhỉ? 🍬",
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
            badge: "Mẹo Nhớ",
            title: "Lấy số lớn trừ số bé",
            explanation:
              "Muốn biết hai số hơn kém nhau bao nhiêu, ta lấy SỐ LỚN trừ đi SỐ BÉ.",
            rule: "Mai hơn Lan số kẹo là: 12 − 8 = 4 (cái kẹo).",
            points: [
              "Hỏi 'hơn bao nhiêu' dùng phép trừ.",
              "Hỏi 'kém bao nhiêu' cũng dùng phép trừ.",
              "Lan kém Mai 4 cái kẹo — cùng một đáp án, khác cách hỏi.",
            ],
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
          type: "visual",
          content: {
            text: "Mai: 12 cái kẹo\nLan:  8 cái kẹo\nMai hơn Lan: 12 − 8 = 4 (cái kẹo)",
            operation: {
              left: 12,
              sign: "−",
              right: 8,
              result: 4,
            },
            barModel: {
              rows: [
                {
                  label: "Mai",
                  parts: 12,
                },
                {
                  label: "Lan",
                  parts: 8,
                },
              ],
              braceLabel: "Mai hơn Lan 4 cái kẹo",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 12,
              "right": 8,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 12 − 8\nhàng đơn vị 2 < 8 nên mượn 1: 12 − 8 = 4, viết 4\nhàng chục 1 − 1 = 0, viết 0\nVậy 12 − 8 = 4."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Chú Ý",
            "title": "Vì sao ra 14 là sai?",
            "explanation": "14 là kết quả khi bé quên bớt 1 chục sau khi mượn. Đây là lỗi hay gặp nhất của dạng trừ này.",
            "points": [
              "Lỗi — quên bớt 1 chục sau khi mượn: hàng đơn vị 2 < 8 nên mượn 1: 12 − 8 = 4, viết 4. Kết quả đúng phải là 4.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số đã vay NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 4 + 8 phải bằng 12."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "11 − 2 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              19
            ],
            "answer": 9,
            "mascotHint": "hàng đơn vị 1 < 2 nên mượn 1: 11 − 2 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Mai có 12 cái kẹo, Lan có 8 cái kẹo. Mai hơn Lan bao nhiêu cái kẹo?",
            options: [4, 8, 12, 20],
            answer: 4,
            mascotHint: "12 − 8 = 4 cái kẹo.",
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
          type: "quiz",
          content: {
            question:
              "Băng giấy xanh dài 20 cm, băng giấy đỏ dài 17 cm. Băng giấy xanh dài hơn bao nhiêu xăng-ti-mét?",
            options: [3, 7, 17, 37],
            answer: 3,
            barModel: {
              rows: [
                {
                  label: "Băng xanh",
                  parts: 20,
                },
                {
                  label: "Băng đỏ",
                  parts: 17,
                },
              ],
              unit: "cm",
              note: "So sánh hai băng giấy (mỗi vạch nhỏ là 1 cm)",
            },
            mascotHint: "20 − 17 = 3 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hơn kém nhau bao nhiêu thì lấy số lớn trừ số bé.",
              "12 − 8 = 4.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c1-l8",
      title: "Bài 8: Đặt tính cộng, trừ (không nhớ) trong phạm vi 100",
      type: "learn",
      description: "Đặt tính thẳng cột và tính cộng trừ không nhớ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Đặt tính sai cột là sai kết quả đấy! Bé chú ý cách đặt tính nhé 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đặt tính thẳng cột",
            explanation:
              "Khi đặt tính, bé viết số hạng thứ hai ngay bên dưới số hạng thứ nhất sao cho HÀNG ĐƠN VỊ thẳng hàng đơn vị, HÀNG CHỤC thẳng hàng chục. Rồi tính từ phải sang trái.",
            rule: "32 + 14: đơn vị 2 + 4 = 6, chục 3 + 1 = 4. Kết quả 46.",
            points: [
              "Luôn tính từ hàng đơn vị trước.",
              "Không nhớ nghĩa là từng hàng cộng lại đều bé hơn 10.",
              "Trừ cũng đặt tính như vậy: 57 − 23, đơn vị 7 − 3 = 4, chục 5 − 2 = 3, được 34.",
            ],
          },
        },
                {
          "type": "visual",
          "content": {
            "text": "Đặt tính rồi tính: cộng trừ từng hàng, bắt đầu từ hàng đơn vị\n1) hàng đơn vị 2 + 4 = 6, viết 6\n2) hàng chục 3 + 1 = 4, viết 4\nVậy 32 + 14 = 46.",
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
            "question": "2 + 7 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              11
            ],
            "answer": 9,
            "mascotHint": "hàng đơn vị 2 + 7 = 9, viết 9. Kết quả 9."
          }
        },
        {
          type: "quiz",
          content: {
            question: "32 + 14 bằng bao nhiêu?",
            options: [36, 44, 46, 56],
            answer: 46,
            mascotHint: "2 + 4 = 6, 3 + 1 = 4, nên 32 + 14 = 46.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "57 − 23 bằng bao nhiêu?",
            options: [24, 30, 34, 44],
            answer: 34,
            mascotHint: "7 − 3 = 4, 5 − 2 = 3, nên 57 − 23 = 34.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt tính thẳng cột, tính từ phải sang trái.",
              "12 + 14 = 26 không nhớ vì từng hàng đều bé hơn 10.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c1-l9",
      title: "Bài 9: Luyện tập chung chủ đề 1",
      type: "learn",
      description:
        "Ôn lại số đến 100, thành phần phép tính và cộng trừ không nhớ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt mở hộp câu đố! Bé sẵn sàng chưa nào? 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Những điều bé đã học",
            explanation:
              "Chủ đề 1 giúp bé nhớ lại: số có hai chữ số, tia số, số liền trước liền sau, tên gọi các thành phần của phép cộng phép trừ.",
            points: [
              "Số lớn nhất có hai chữ số là 99.",
              "Số liền sau của 99 là 100 — số có ba chữ số đầu tiên.",
              "So sánh hai số: so hàng chục trước.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "98 — 99 — 100\nliền trước · lớn nhất có 2 chữ số · số có 3 chữ số",
            numberLine: {
              from: 98,
              to: 100,
              step: 1,
              marks: [98, 99, 100],
              label:
                "98 liền trước · 99 là số lớn nhất có hai chữ số · 100 là số có ba chữ số",
            },
          },
        },
        {
          "type": "visual",
          "content": {
            "cotTinh": {
              "left": 20,
              "right": 17,
              "sign": "−"
            },
            "text": "Bé tự đặt tính: 20 − 17\nhàng đơn vị 0 < 7 nên mượn 1: 10 − 7 = 3, viết 3\nhàng chục 2 − 2 = 0, viết 0\nVậy 20 − 17 = 3."
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Chú Ý",
            "title": "Vì sao ra 13 là sai?",
            "explanation": "13 là kết quả khi bé quên bớt 1 chục sau khi mượn. Đây là lỗi hay gặp nhất của dạng trừ này.",
            "points": [
              "Lỗi — quên bớt 1 chục sau khi mượn: hàng đơn vị 0 < 7 nên mượn 1: 10 − 7 = 3, viết 3. Kết quả đúng phải là 3.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số đã vay NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 3 + 17 phải bằng 20."
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "23 − 18 bằng bao nhiêu?",
            "options": [
              4,
              5,
              6,
              15
            ],
            "answer": 5,
            "mascotHint": "hàng đơn vị 3 < 8 nên mượn 1: 13 − 8 = 5, viết 5. Kết quả 5."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số lớn nhất có hai chữ số là số nào?",
            options: [90, 98, 99, 100],
            answer: 99,
            mascotHint:
              "Số lớn nhất có hai chữ số là 99. Số 100 đã có ba chữ số.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Băng giấy xanh dài 20 cm, băng giấy đỏ dài 17 cm. Băng giấy nào dài hơn và dài hơn bao nhiêu?",
            options: [
              "Băng xanh, dài hơn 3 cm",
              "Băng đỏ, dài hơn 3 cm",
              "Hai băng dài bằng nhau",
              "Băng xanh, dài hơn 37 cm",
            ],
            answer: "Băng xanh, dài hơn 3 cm",
            barModel: {
              rows: [
                {
                  label: "Băng xanh",
                  parts: 20,
                },
                {
                  label: "Băng đỏ",
                  parts: 17,
                },
              ],
              unit: "cm",
              note: "20 cm > 17 cm, và 20 − 17 = 3 cm",
            },
            mascotHint: "20 cm > 17 cm, và 20 − 17 = 3 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã ôn xong số đến 100 và cộng trừ không nhớ trong phạm vi 100.",
              "Chuẩn bị sang chủ đề 2: cộng trừ trong phạm vi 20.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
