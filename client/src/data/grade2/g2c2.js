export const g2c2 = {
  "id": "g2-c2",
  "name": "Chủ đề 2: Phép cộng, phép trừ trong phạm vi 20",
  "description": "Phép cộng, phép trừ qua 10; bảng cộng, bảng trừ qua 10; bài toán về thêm, bớt, nhiều hơn, ít hơn",
  "icon": "➕",
  "color": "#f6c23e",
  "totalLessons": 12,
  "lessons": [
    {
      "id": "g2-c2-l1",
      "title": "Bài 1: Phép cộng (qua 10) trong phạm vi 20",
      "type": "learn",
      "description": "Nhận biết phép cộng có kết quả vượt qua 10",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Trong đĩa có 9 quả táo, Rô-bốt thêm 4 quả nữa. Đếm thế nào cho nhanh nhỉ? 🍎",
            "items": [
              {
                "emoji": "🍎",
                "label": "Quả táo",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Cộng qua 10 là gì?",
            "explanation": "Khi cộng hai số mà kết quả LỚN HƠN 10, ta gọi đó là phép cộng qua 10. Mẹo hay nhất là làm cho tròn 10 trước.",
            "rule": "9 + 4 = ? Ta tách 4 thành 1 và 3. Lấy 9 + 1 = 10, rồi 10 + 3 = 13. Vậy 9 + 4 = 13.",
            "points": [
              "Bước 1: tách số bé để lấy phần bù cho đủ 10.",
              "Bước 2: cộng cho đủ 10.",
              "Bước 3: cộng phần còn lại."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "9 + 4  =  9 + 1 + 3  =  10 + 3  =  13\n         ↑ tách 4 thành 1 và 3",
            "tenFrame": {
              "filled": 9,
              "total": 10,
              "emoji": "🔵",
              "extra": 4,
              "label": "9 + 1 = 10, rồi 10 + 3 = 13"
            },
            "numberLine": {
              "from": 9,
              "to": 13,
              "step": 1,
              "marks": [
                9,
                10,
                11,
                12,
                13
              ],
              "hops": [
                {
                  "from": 9,
                  "to": 13,
                  "label": "+4"
                }
              ],
              "label": "9 + 4 = 13"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "9 + 4 bằng bao nhiêu?",
            "options": [
              12,
              13,
              14,
              15
            ],
            "answer": 13,
            "mascotHint": "9 + 1 = 10, còn 3 nữa: 10 + 3 = 13."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Cộng qua 10: tách số bé để làm tròn 10 trước.",
              "9 + 4 = 9 + 1 + 3 = 13."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l2",
      "title": "Bài 2: Tách số để cộng qua 10",
      "type": "learn",
      "description": "Tách số hạng thứ hai thành hai phần để cộng cho đủ 10",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Muốn tách số cho khéo, bé chỉ cần nhìn xem số kia còn thiếu mấy để đủ 10! ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Bù cho đủ 10",
            "explanation": "Nhìn số hạng thứ nhất, xem nó còn thiếu bao nhiêu để đủ 10. Rồi tách số hạng thứ hai ra đúng bấy nhiêu.",
            "rule": "8 + 5: 8 còn thiếu 2 để đủ 10. Tách 5 = 2 + 3. Ta có 8 + 2 = 10, rồi 10 + 3 = 13.",
            "points": [
              "9 thiếu 1 → 7 + 5: tách 5 = 3 + 2 vì 7 thiếu 3.",
              "8 thiếu 2 → 8 + 5, tách 5 = 2 + 3.",
              "7 thiếu 3 → 7 + 5, tách 5 = 3 + 2."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "8 + 5  =  8 + 2 + 3  =  10 + 3  =  13",
            "tenFrame": {
              "filled": 8,
              "total": 10,
              "emoji": "🟣",
              "extra": 5,
              "label": "8 + 2 = 10, rồi 10 + 3 = 13"
            },
            "numberLine": {
              "from": 8,
              "to": 13,
              "step": 1,
              "marks": [
                8,
                9,
                10,
                11,
                12,
                13
              ],
              "hops": [
                {
                  "from": 8,
                  "to": 10,
                  "label": "+2"
                },
                {
                  "from": 10,
                  "to": 13,
                  "label": "+3"
                }
              ],
              "label": "8 + 5: tách 5 = 2 + 3, đi qua mốc 10"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Để tính 7 + 5, bé tách 5 thành hai phần nào?",
            "options": [
              "3 và 2",
              "2 và 3",
              "1 và 4",
              "4 và 1"
            ],
            "answer": "3 và 2",
            "mascotHint": "7 thiếu 3 để đủ 10, nên tách 5 = 3 + 2: 7 + 3 = 10, 10 + 2 = 12."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "8 + 6 bằng bao nhiêu?",
            "options": [
              12,
              13,
              14,
              16
            ],
            "answer": 14,
            "mascotHint": "8 + 2 = 10, còn 4 nữa: 10 + 4 = 14."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Nhìn số thứ nhất để biết cần tách bao nhiêu.",
              "8 + 5 = 8 + 2 + 3 = 13."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l3",
      "title": "Bài 3: Bảng cộng (qua 10)",
      "type": "learn",
      "description": "Lập bảng cộng các số có kết quả lớn hơn 10",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Rô-bốt đang hoàn thành bảng cộng qua 10. Bé giúp Rô-bốt điền nốt nhé! 🎈"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Cộng",
            "title": "Bảng cộng qua 10",
            "explanation": "Đây là bảng các phép cộng trong phạm vi 20 mà kết quả lớn hơn 10. Học thuộc bảng này giúp bé tính nhẩm rất nhanh.",
            "rule": "9 + 2 = 11 · 9 + 5 = 14 · 8 + 3 = 11 · 8 + 7 = 15 · 7 + 4 = 11 · 6 + 5 = 11.",
            "points": [
              "Mỗi cột hơn kém nhau 1 đơn vị.",
              "9 + 4 = 13 và 4 + 9 = 13 — đổi chỗ không đổi kết quả.",
              "Kết quả lớn nhất trong bảng là 9 + 9 = 18."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "9+2=11 · 9+6=15 · 9+9=18\n8+3=11 · 8+8=16 · 7+7=14",
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "9 + 2",
                  "11"
                ],
                [
                  "9 + 6",
                  "15"
                ],
                [
                  "9 + 9",
                  "18"
                ],
                [
                  "8 + 3",
                  "11"
                ],
                [
                  "8 + 8",
                  "16"
                ],
                [
                  "7 + 7",
                  "14"
                ]
              ],
              "label": "Bảng cộng (qua 10) trong phạm vi 20"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "9 + 6 bằng bao nhiêu?",
            "options": [
              13,
              14,
              15,
              16
            ],
            "answer": 15,
            "mascotHint": "9 + 1 = 10, còn 5 nữa: 10 + 5 = 15."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "7 + 7 bằng bao nhiêu?",
            "options": [
              12,
              13,
              14,
              77
            ],
            "answer": 14,
            "mascotHint": "7 + 3 = 10, còn 4 nữa: 10 + 4 = 14."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng cộng qua 10 có kết quả từ 11 đến 18.",
              "Đổi chỗ hai số hạng thì kết quả không đổi."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l4",
      "title": "Bài 4: Luyện tập phép cộng qua 10",
      "type": "learn",
      "description": "Tính nhẩm và tìm số còn thiếu trong phép cộng qua 10",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bé đã thuộc bảng cộng qua 10. Giờ mình tính nhẩm xem nhanh cỡ nào nhé! 🧮"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Luyện Tập",
            "title": "Ba dạng bài",
            "explanation": "Bé sẽ gặp ba dạng: tính kết quả, tìm số còn thiếu, và chọn phép tính đúng theo tình huống.",
            "points": [
              "Tính kết quả: 9 + 7 = 16.",
              "Tìm số còn thiếu: 8 + ... = 15 thì chỗ trống là 7.",
              "Bài toán: có 6 quả bóng xanh và 7 quả bóng đỏ thì có tất cả 6 + 7 = 13 quả."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "6 quả bóng xanh + 7 quả bóng đỏ\n6 + 7 = 13 (quả bóng)",
            "operation": {
              "left": 6,
              "sign": "+",
              "right": 7,
              "result": 13
            },
            "tenFrame": {
              "filled": 10,
              "total": 10,
              "emoji": "⚽",
              "extra": 3,
              "label": "6 quả + 7 quả: gộp đủ 10 rồi còn 3"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: 9 + ? = 16",
            "options": [
              5,
              6,
              7,
              8
            ],
            "answer": 7,
            "mascotHint": "9 + 1 = 10, cần thêm 6 nữa: vậy số cần điền là 1 + 6 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 6 quả bóng xanh và 7 quả bóng đỏ. Hỏi có tất cả bao nhiêu quả bóng?",
            "options": [
              12,
              13,
              14,
              1
            ],
            "answer": 13,
            "mascotHint": "6 + 7 = 13 quả bóng.",
            "items": [
              {
                "emoji": "⚽",
                "label": "Quả bóng",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Muốn tìm số hạng còn thiếu, bé lấy tổng trừ đi số hạng đã biết.",
              "6 + 7 = 13."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l5",
      "title": "Bài 5: Bài toán về thêm một số đơn vị",
      "type": "learn",
      "description": "Giải bài toán có từ khóa thêm, được cho thêm",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Trên cành có 7 con chim, thêm 5 con bay đến. Có tất cả mấy con nhỉ? 🐤",
            "items": [
              {
                "emoji": "🐦",
                "label": "Con chim",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Giải Toán",
            "title": "Thêm vào thì dùng phép cộng",
            "explanation": "Khi bài toán nói THÊM, ĐƯỢC CHO THÊM, CÓ THÊM, thì số lượng tăng lên, ta dùng phép cộng.",
            "rule": "7 con chim, thêm 5 con: 7 + 5 = 12 (con chim).",
            "points": [
              "Tìm từ khóa: thêm, được cho thêm, bay đến, mua thêm.",
              "Đơn vị của đáp án là con chim, quả, cái... đừng quên ghi vào.",
              "Luôn ghi đáp số sau khi tính."
            ],
            "items": [
              {
                "emoji": "🐦",
                "label": "Con chim",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "7 con chim  +  5 con chim bay đến  =  12 con chim",
            "operation": {
              "left": 7,
              "sign": "+",
              "right": 5,
              "result": 12
            },
            "barModel": {
              "rows": [
                {
                  "label": "Đã có",
                  "parts": 7
                },
                {
                  "label": "Bay đến",
                  "parts": 5
                }
              ],
              "braceLabel": "12 con chim"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên cành có 7 con chim, thêm 5 con bay đến. Hỏi có tất cả bao nhiêu con chim?",
            "options": [
              2,
              11,
              12,
              13
            ],
            "answer": 12,
            "mascotHint": "Thêm vào thì cộng: 7 + 5 = 12 con chim.",
            "items": [
              {
                "emoji": "🐦",
                "label": "Con chim",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Thấy chữ 'thêm' thì dùng phép cộng.",
              "7 + 5 = 12 (con chim)."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l6",
      "title": "Bài 6: Bài toán về bớt một số đơn vị",
      "type": "learn",
      "description": "Giải bài toán có từ khóa bớt, lấy đi, còn lại",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Có 14 quả bóng, Rô-bốt cho đi 6 quả. Còn lại mấy quả nhỉ? 🎈",
            "items": [
              {
                "emoji": "⚽",
                "label": "Quả bóng",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Giải Toán",
            "title": "Bớt đi thì dùng phép trừ",
            "explanation": "Khi bài toán nói BỚT, LẤY ĐI, CHO ĐI, BAY ĐI, thì số lượng giảm xuống, ta dùng phép trừ.",
            "rule": "14 quả bóng, bớt 6 quả: 14 − 6 = 8 (quả bóng).",
            "points": [
              "Từ khóa: bớt, lấy đi, cho đi, bay đi, ăn mất.",
              "Tính nhẩm 14 − 6: tách 6 = 4 + 2, ta có 14 − 4 = 10, rồi 10 − 2 = 8.",
              "Đáp số phải ghi kèm đơn vị."
            ],
            "items": [
              {
                "emoji": "⚽",
                "label": "Quả bóng",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "14 − 6  =  14 − 4 − 2  =  10 − 2  =  8",
            "operation": {
              "left": 14,
              "sign": "−",
              "right": 6,
              "result": 8
            },
            "barModel": {
              "rows": [
                {
                  "label": "Có sẵn",
                  "parts": 14
                },
                {
                  "label": "Bớt đi",
                  "parts": 6
                }
              ],
              "braceLabel": "8 quả bóng"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 14 quả bóng, cho đi 6 quả. Hỏi còn lại bao nhiêu quả bóng?",
            "options": [
              6,
              7,
              8,
              20
            ],
            "answer": 8,
            "mascotHint": "Bớt đi thì trừ: 14 − 6 = 8 quả bóng.",
            "items": [
              {
                "emoji": "⚽",
                "label": "Quả bóng",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên cây có 15 quả cam, hái xuống 7 quả. Trên cây còn lại bao nhiêu quả cam?",
            "options": [
              7,
              8,
              9,
              22
            ],
            "answer": 8,
            "mascotHint": "15 − 7 = 8 quả cam. (15 − 5 = 10, 10 − 2 = 8)",
            "items": [
              {
                "emoji": "🍊",
                "label": "Quả cam",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Thấy chữ 'bớt', 'cho đi', 'lấy đi' thì dùng phép trừ.",
              "14 − 6 = 8."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l7",
      "title": "Bài 7: Luyện tập chung phép cộng, phép trừ qua 10",
      "type": "learn",
      "description": "Luyện tập tổng hợp cộng và trừ trong phạm vi 20",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Bé đã giỏi cộng qua 10 rồi. Giờ Rô-bốt đố bé vài câu tổng hợp nhé! 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Luyện Tập Chung",
            "title": "Cộng và trừ đều làm tròn 10",
            "explanation": "Cả cộng và trừ qua 10 đều có cùng một mẹo: đưa về số 10 trước rồi tính tiếp.",
            "points": [
              "Cộng: 8 + 5 → 8 + 2 = 10, 10 + 3 = 13.",
              "Trừ: 13 − 5 → 13 − 3 = 10, 10 − 2 = 8.",
              "So sánh kết quả: 9 + 4 và 8 + 5 đều bằng 13."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "8 + 5 = 13   và   13 − 5 = 8   và   13 − 8 = 5",
            "operation": {
              "left": 8,
              "sign": "+",
              "right": 5,
              "result": 13
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "8 + 5",
                  "13"
                ],
                [
                  "13 − 5",
                  "8"
                ],
                [
                  "13 − 8",
                  "5"
                ]
              ],
              "label": "Từ một phép cộng suy ra hai phép trừ"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "13 − 5 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              18
            ],
            "answer": 8,
            "mascotHint": "13 − 3 = 10, 10 − 2 = 8."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hai phép tính nào có cùng kết quả?",
            "options": [
              "9 + 4 và 8 + 5",
              "9 + 4 và 9 + 5",
              "8 + 5 và 8 + 6",
              "7 + 5 và 9 + 2"
            ],
            "answer": "9 + 4 và 8 + 5",
            "mascotHint": "9 + 4 = 13 và 8 + 5 = 13. Cùng bằng 13!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Từ 8 + 5 = 13, bé viết được 13 − 5 = 8 và 13 − 8 = 5.",
              "Cộng và trừ là hai phép tính ngược nhau."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l8",
      "title": "Bài 8: Phép trừ (qua 10) trong phạm vi 20",
      "type": "learn",
      "description": "Thực hiện phép trừ có mượn 10",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Có 13 viên bi, Rô-bốt lấy ra 5 viên. Còn lại mấy viên nhỉ? 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Trừ qua 10",
            "explanation": "Khi trừ mà ta phải mượn 1 chục, ta gọi đó là phép trừ qua 10. Mẹo: trừ về đủ 10 trước.",
            "rule": "13 − 5 = ? Ta tách 5 thành 3 và 2. Lấy 13 − 3 = 10, rồi 10 − 2 = 8. Vậy 13 − 5 = 8.",
            "points": [
              "Bước 1: trừ bớt để về đúng 10.",
              "Bước 2: trừ phần còn lại.",
              "Số trừ được tách sao cho phần đầu bằng chữ số hàng đơn vị của số bị trừ."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "13 − 5  =  13 − 3 − 2  =  10 − 2  =  8",
            "numberLine": {
              "from": 8,
              "to": 13,
              "step": 1,
              "marks": [
                8,
                9,
                10,
                11,
                12,
                13
              ],
              "hops": [
                {
                  "from": 13,
                  "to": 10,
                  "label": "−3"
                },
                {
                  "from": 10,
                  "to": 8,
                  "label": "−2"
                }
              ],
              "label": "13 − 5: tách 5 = 3 + 2, đi lùi qua mốc 10"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "13 − 5 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              18
            ],
            "answer": 8,
            "mascotHint": "13 − 3 = 10, 10 − 2 = 8."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "15 − 8 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              8
            ],
            "answer": 7,
            "mascotHint": "15 − 5 = 10, 10 − 3 = 7."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Trừ qua 10: trừ về đủ 10 trước, rồi trừ tiếp.",
              "13 − 5 = 13 − 3 − 2 = 8."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l9",
      "title": "Bài 9: Bảng trừ (qua 10)",
      "type": "learn",
      "description": "Lập bảng trừ có kết quả trong phạm vi 20",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Đây là bảng trừ qua 10. Học thuộc bảng này bé tính nhẩm siêu nhanh! ⚡"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Trừ",
            "title": "Bảng trừ qua 10",
            "explanation": "Bảng này gồm các phép trừ mà số bị trừ lớn hơn 10. Bé có thể học từ bảng cộng: 9 + 2 = 11 nên 11 − 2 = 9.",
            "rule": "11 − 2 = 9 · 11 − 5 = 6 · 12 − 3 = 9 · 13 − 6 = 7 · 15 − 7 = 8 · 16 − 9 = 7.",
            "points": [
              "Từ bảng cộng, bé suy ra bảng trừ ngay.",
              "9 + 4 = 13 nên 13 − 4 = 9 và 13 − 9 = 4.",
              "Học bảng trừ bằng bảng cộng sẽ nhanh hơn học vẹt."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "11−2=9 · 12−5=7 · 13−6=7 · 14−8=6 · 16−9=7",
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "11 − 2",
                  "9"
                ],
                [
                  "11 − 5",
                  "6"
                ],
                [
                  "12 − 3",
                  "9"
                ],
                [
                  "13 − 6",
                  "7"
                ],
                [
                  "15 − 7",
                  "8"
                ],
                [
                  "16 − 9",
                  "7"
                ]
              ],
              "label": "Bảng trừ (qua 10)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "12 − 5 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              17
            ],
            "answer": 7,
            "mascotHint": "12 − 2 = 10, 10 − 3 = 7."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Biết 8 + 7 = 15. Vậy 15 − 7 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              9
            ],
            "answer": 8,
            "mascotHint": "Từ 8 + 7 = 15, ta có 15 − 7 = 8."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Từ phép cộng, bé suy ra ngay hai phép trừ.",
              "8 + 7 = 15 → 15 − 7 = 8 và 15 − 8 = 7."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l10",
      "title": "Bài 10: Luyện tập phép trừ qua 10",
      "type": "learn",
      "description": "Tính nhẩm trừ qua 10 và tìm số còn thiếu",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bé cùng Rô-bốt luyện tính nhẩm nào! Ai nhanh hơn nhỉ? 🧮"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Luyện Tập",
            "title": "Hai dạng bài thường gặp",
            "explanation": "Bé sẽ gặp dạng tính kết quả và dạng tìm số còn thiếu.",
            "points": [
              "Tính kết quả: 17 − 9 = 8.",
              "Tìm số còn thiếu: 14 − ... = 6 thì chỗ trống là 8.",
              "Mẹo: muốn tìm số trừ, lấy số bị trừ trừ đi hiệu."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "14 − ? = 6   →   ? = 14 − 6 = 8",
            "operation": {
              "left": 14,
              "sign": "−",
              "right": 6,
              "result": 8
            },
            "numberLine": {
              "from": 6,
              "to": 14,
              "step": 1,
              "marks": [
                6,
                8,
                10,
                12,
                14
              ],
              "hops": [
                {
                  "from": 6,
                  "to": 14,
                  "label": "? = 8"
                }
              ],
              "label": "14 − ? = 6 ⇒ ? = 14 − 6 = 8"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "17 − 9 bằng bao nhiêu?",
            "options": [
              6,
              7,
              8,
              9
            ],
            "answer": 8,
            "mascotHint": "17 − 7 = 10, 10 − 2 = 8."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: 14 − ? = 6",
            "options": [
              6,
              7,
              8,
              20
            ],
            "answer": 8,
            "mascotHint": "Số trừ = số bị trừ − hiệu = 14 − 6 = 8."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Muốn tìm số trừ, lấy số bị trừ trừ đi hiệu.",
              "17 − 9 = 8."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l11",
      "title": "Bài 11: Bài toán về nhiều hơn, ít hơn một số đơn vị",
      "type": "learn",
      "description": "Giải bài toán so sánh nhiều hơn, ít hơn",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Mai có 9 nhãn vở, Lan có 5 nhãn vở. Lan ít hơn Mai bao nhiêu nhãn vở? 📗"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Giải Toán",
            "title": "Nhiều hơn, ít hơn — đều dùng phép trừ",
            "explanation": "Muốn biết hơn hoặc kém bao nhiêu đơn vị, ta luôn lấy SỐ LỚN trừ SỐ BÉ.",
            "rule": "Mai 9 nhãn vở, Lan 5 nhãn vở. Lan ít hơn Mai: 9 − 5 = 4 (nhãn vở).",
            "points": [
              "'Nhiều hơn bao nhiêu' và 'ít hơn bao nhiêu' cho cùng một phép tính.",
              "9 − 5 = 4 nên Mai nhiều hơn Lan 4 cái, và Lan ít hơn Mai 4 cái.",
              "Đừng nhầm với bài 'thêm vào' — bài đó dùng phép cộng."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Mai: 9 nhãn vở\nLan: 5 nhãn vở\n9 − 5 = 4 (nhãn vở)",
            "operation": {
              "left": 9,
              "sign": "−",
              "right": 5,
              "result": 4
            },
            "barModel": {
              "rows": [
                {
                  "label": "Mai",
                  "parts": 9
                },
                {
                  "label": "Lan",
                  "parts": 5
                }
              ],
              "braceLabel": "Lan ít hơn Mai 4 nhãn vở"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Mai có 9 nhãn vở, Lan có 5 nhãn vở. Lan ít hơn Mai bao nhiêu nhãn vở?",
            "options": [
              4,
              5,
              9,
              14
            ],
            "answer": 4,
            "mascotHint": "9 − 5 = 4 nhãn vở."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Lớp 2A trồng được 14 cây, lớp 2B trồng được 9 cây. Lớp 2A trồng nhiều hơn lớp 2B bao nhiêu cây?",
            "options": [
              4,
              5,
              6,
              23
            ],
            "answer": 5,
            "mascotHint": "14 − 9 = 5 cây."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Hơn hoặc kém bao nhiêu: lấy số lớn trừ số bé.",
              "9 − 5 = 4."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c2-l12",
      "title": "Bài 12: Luyện tập chung chủ đề 2",
      "type": "learn",
      "description": "Ôn tập cộng trừ qua 10 và các bài toán có lời văn",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Hết chủ đề 2 rồi! Bé đã tính nhẩm cộng trừ trong phạm vi 20 rất giỏi! 🎉"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Tổng kết chủ đề 2",
            "explanation": "Bé đã học cộng qua 10, bảng cộng qua 10, trừ qua 10, bảng trừ qua 10 và hai loại bài toán có lời văn.",
            "points": [
              "Cộng và trừ đều làm tròn 10 trước cho dễ tính.",
              "'Thêm vào' thì cộng; 'bớt đi' thì trừ; 'hơn kém bao nhiêu' thì trừ.",
              "Mọi phép cộng qua 10 đều cho bé hai phép trừ tương ứng."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "9 + 5 = 14\n14 − 5 = 9\n14 − 9 = 5",
            "operation": {
              "left": 9,
              "sign": "+",
              "right": 5,
              "result": 14
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "9 + 5",
                  "14"
                ],
                [
                  "14 − 5",
                  "9"
                ],
                [
                  "14 − 9",
                  "5"
                ]
              ],
              "label": "Luyện tập chung chủ đề 2"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 8 quả bóng xanh và 6 quả bóng đỏ. Hỏi bóng xanh nhiều hơn bóng đỏ bao nhiêu quả?",
            "options": [
              2,
              6,
              8,
              14
            ],
            "answer": 2,
            "mascotHint": "Hỏi hơn kém nhau thì trừ: 8 − 6 = 2 quả.",
            "items": [
              {
                "emoji": "⚽",
                "label": "Quả bóng",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: 7 + ? = 15",
            "options": [
              7,
              8,
              9,
              22
            ],
            "answer": 8,
            "mascotHint": "Số hạng còn thiếu = tổng − số hạng đã biết = 15 − 7 = 8."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bé đã hoàn thành chủ đề 2.",
              "Chuẩn bị sang chủ đề 3: ki-lô-gam và lít."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
