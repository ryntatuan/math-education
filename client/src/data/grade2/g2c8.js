export const g2c8 = {
  "id": "g2-c8",
  "name": "Chủ đề 8: Phép nhân, phép chia",
  "description": "Phép nhân, thừa số và tích, bảng nhân 2, bảng nhân 5, phép chia, số bị chia - số chia - thương, bảng chia 2, bảng chia 5",
  "icon": "✖️",
  "color": "#e76f51",
  "totalLessons": 16,
  "lessons": [
    {
      "id": "g2-c8-l1",
      "title": "Bài 1: Phép nhân là gì?",
      "type": "learn",
      "description": "Nhận biết phép nhân là cách viết gọn của tổng các số hạng bằng nhau",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Rô-bốt bày cam ra 3 khay, mỗi khay 2 quả. Bé đếm xem có tất cả bao nhiêu quả nhé! 🍊"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Phép nhân là gì?",
            "explanation": "Phép nhân là cách VIẾT GỌN của phép cộng nhiều số hạng BẰNG NHAU.",
            "rule": "Mỗi khay có 2 quả: 2 + 2 + 2 = 6. Ta viết gọn thành 2 × 3 = 6. Đọc là: hai nhân ba bằng sáu.",
            "points": [
              "Dấu × gọi là dấu nhân.",
              "Chỉ viết thành phép nhân khi các số hạng bằng nhau.",
              "2 × 3 nghĩa là: lấy 2 quả, lặp lại 3 lần."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "3 khay, mỗi khay 2 quả cam: 2 + 2 + 2 = 6 — viết gọn là 2 × 3 = 6",
            "tenFrame": {
              "filled": 6,
              "total": 10,
              "emoji": "🍊",
              "label": "3 khay, mỗi khay 2 quả: 2 + 2 + 2 = 6"
            },
            "table": {
              "headers": [
                "Khay",
                "Số quả"
              ],
              "rows": [
                [
                  "Khay 1",
                  2
                ],
                [
                  "Khay 2",
                  2
                ],
                [
                  "Khay 3",
                  2
                ],
                [
                  "Tổng",
                  "2 × 3 = 6"
                ]
              ],
              "label": "Viết gọn 2 + 2 + 2 = 6 thành 2 × 3 = 6"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Mỗi đĩa có 5 cái bánh, có 2 đĩa. Viết gọn thành phép nhân nào?",
            "options": [
              "5 + 2",
              "5 × 2",
              "2 × 2",
              "5 × 5"
            ],
            "answer": "5 × 2",
            "mascotHint": "5 + 5 = 10, viết gọn là 5 × 2 = 10 nhé!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Phép nhân là phép cộng các số hạng bằng nhau.",
              "2 + 2 + 2 = 6 viết gọn thành 2 × 3 = 6."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l2",
      "title": "Bài 2: Viết phép nhân từ tổng các số hạng bằng nhau",
      "type": "learn",
      "description": "Chuyển tổng các số hạng bằng nhau thành phép nhân và ngược lại",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Bé hãy nhìn kĩ: 4 + 4 + 4 = 12. Viết gọn thế nào cho ngắn nhỉ? 🤔"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Đếm số hạng rồi viết phép nhân",
            "explanation": "Muốn viết tổng thành phép nhân, ta làm hai bước: đếm số hạng lặp lại, rồi lấy số hạng nhân với số lần lặp.",
            "rule": "4 + 4 + 4 có 3 số hạng, mỗi số hạng là 4. Vậy: 4 × 3 = 12.",
            "steps": [
              {
                "title": "Bước 1",
                "desc": "Tìm số hạng được lặp lại: đó là 4."
              },
              {
                "title": "Bước 2",
                "desc": "Đếm xem số 4 lặp lại mấy lần: 3 lần."
              },
              {
                "title": "Bước 3",
                "desc": "Viết phép nhân: 4 × 3 = 12."
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "2 + 2 + 2 + 2 + 2 = 10  →  2 × 5 = 10  (2 được lấy 5 lần)",
            "numberLine": {
              "from": 0,
              "to": 10,
              "step": 2,
              "marks": [
                0,
                2,
                4,
                6,
                8,
                10
              ],
              "hops": [
                {
                  "from": 0,
                  "to": 2,
                  "label": "1"
                },
                {
                  "from": 2,
                  "to": 4,
                  "label": "2"
                },
                {
                  "from": 4,
                  "to": 6,
                  "label": "3"
                }
              ],
              "label": "2 được lấy 5 lần: 2 × 5 = 10"
            },
            "table": {
              "headers": [
                "Tổng các số hạng bằng nhau",
                "Viết gọn"
              ],
              "rows": [
                [
                  "2 + 2 + 2 + 2 + 2",
                  "2 × 5 = 10"
                ],
                [
                  "4 + 4 + 4",
                  "4 × 3 = 12"
                ]
              ],
              "label": "Viết phép nhân từ tổng các số hạng bằng nhau"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 + 3 + 3 + 3 viết thành phép nhân nào?",
            "options": [
              "3 × 3",
              "3 × 4",
              "4 × 4",
              "3 + 4"
            ],
            "answer": "3 × 4",
            "mascotHint": "3 được lấy 4 lần, nên là 3 × 4 = 12."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số hạng lặp lại nhân với số lần lặp lại.",
              "3 + 3 + 3 + 3 = 3 × 4 = 12."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l3",
      "title": "Bài 3: Thừa số và Tích",
      "type": "learn",
      "description": "Gọi tên đúng các thành phần của phép nhân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Mỗi phép nhân có tên gọi riêng cho từng số đấy, bé cùng học nhé! ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khái Niệm",
            "title": "Thừa số – Thừa số – Tích",
            "explanation": "Trong phép nhân, hai số được nhân với nhau gọi là THỪA SỐ. Kết quả gọi là TÍCH.",
            "rule": "2 × 3 = 6: số 2 và số 3 là các thừa số; số 6 là tích.",
            "points": [
              "Thừa số là những số đứng trước dấu bằng.",
              "Tích là kết quả, đứng sau dấu bằng.",
              "5 × 4 = 20 thì 5 và 4 là thừa số, 20 là tích."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "2  ×  3  =  6\nthừa số · thừa số · tích",
            "operation": {
              "left": 2,
              "sign": "×",
              "right": 3,
              "result": 6
            },
            "table": {
              "headers": [
                "Thừa số",
                "Thừa số",
                "Tích"
              ],
              "rows": [
                [
                  2,
                  3,
                  6
                ]
              ],
              "label": "Thừa số và Tích"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép nhân 5 × 4 = 20, số nào là TÍCH?",
            "options": [
              5,
              4,
              20,
              9
            ],
            "answer": 20,
            "mascotHint": "Tích là kết quả của phép nhân, tức là số 20."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép nhân 6 × 2 = 12, các THỪA SỐ là những số nào?",
            "options": [
              "6 và 2",
              "12",
              "6 và 12",
              "2 và 12"
            ],
            "answer": "6 và 2",
            "mascotHint": "Hai số đứng trước dấu bằng là thừa số: 6 và 2."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Thừa số × thừa số = tích.",
              "2 × 3 = 6: thừa số là 2 và 3, tích là 6."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l4",
      "title": "Bài 4: Bảng nhân 2 (từ 2 × 1 đến 2 × 5)",
      "type": "learn",
      "description": "Lập và học thuộc nửa đầu bảng nhân 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Mỗi con chim có 2 cánh. Bé đếm cánh của 1, 2, 3, 4, 5 con chim nhé! 🐤",
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
            "badge": "Bảng Nhân 2",
            "title": "Hai được lấy một lần, hai lần, ba lần...",
            "explanation": "Bảng nhân 2 được lập bằng cách đếm thêm 2 mỗi bước: từ 2, cộng thêm 2 được 4, cộng thêm 2 được 6...",
            "rule": "2 × 1 = 2 · 2 × 2 = 4 · 2 × 3 = 6 · 2 × 4 = 8 · 2 × 5 = 10. Đếm thêm 2 rồi nêu số còn thiếu!",
            "points": [
              "Mỗi kết quả hơn kém nhau đúng 2 đơn vị.",
              "2 × 3 cũng là 2 + 2 + 2 = 6.",
              "Số chẵn: 2, 4, 6, 8, 10 chính là bảng nhân 2."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "2  ·  4  ·  6  ·  8  ·  10\n2×1  2×2  2×3  2×4  2×5",
            "numberLine": {
              "from": 2,
              "to": 10,
              "step": 2,
              "marks": [
                2,
                4,
                6,
                8,
                10
              ],
              "label": "Đếm thêm 2: 2 · 4 · 6 · 8 · 10"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "2 × 1",
                  "2"
                ],
                [
                  "2 × 2",
                  "4"
                ],
                [
                  "2 × 3",
                  "6"
                ],
                [
                  "2 × 4",
                  "8"
                ],
                [
                  "2 × 5",
                  "10"
                ]
              ],
              "label": "Bảng nhân 2 (từ 2 × 1 đến 2 × 5)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 4 bằng bao nhiêu?",
            "options": [
              6,
              8,
              10,
              12
            ],
            "answer": 8,
            "mascotHint": "Đếm thêm 2 từ 2: 2, 4, 6, 8. Vậy 2 × 4 = 8."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "2 × 1 = 2 · 2 × 2 = 4 · 2 × 3 = 6 · 2 × 4 = 8 · 2 × 5 = 10.",
              "Mỗi bước đếm thêm 2."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l5",
      "title": "Bài 5: Bảng nhân 2 (từ 2 × 6 đến 2 × 10)",
      "type": "learn",
      "description": "Hoàn thành bảng nhân 2 và thuộc cả bảng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Ta đã học đến 2 × 5 = 10. Đi tiếp nào: 2 × 6, 2 × 7... 🎈"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Nhân 2",
            "title": "Từ 2 × 6 đến 2 × 10",
            "explanation": "Cách học dễ nhất: lấy kết quả của 2 × 5 = 10 rồi đếm thêm 2 cho mỗi bước tiếp theo.",
            "rule": "2 × 6 = 12 · 2 × 7 = 14 · 2 × 8 = 16 · 2 × 9 = 18 · 2 × 10 = 20. Mười hai, mười bốn, mười sáu... cứ đếm thêm 2 nhé!",
            "points": [
              "2 × 6 = 2 × 5 + 2 = 10 + 2 = 12.",
              "2 × 10 = 20 — đó là hai mươi.",
              "Cả bảng nhân 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "12 · 14 · 16 · 18 · 20\n2×6  2×7  2×8  2×9  2×10",
            "numberLine": {
              "from": 12,
              "to": 20,
              "step": 2,
              "marks": [
                12,
                14,
                16,
                18,
                20
              ],
              "label": "Đếm thêm 2: 12 · 14 · 16 · 18 · 20"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "2 × 6",
                  "12"
                ],
                [
                  "2 × 7",
                  "14"
                ],
                [
                  "2 × 8",
                  "16"
                ],
                [
                  "2 × 9",
                  "18"
                ],
                [
                  "2 × 10",
                  "20"
                ]
              ],
              "label": "Bảng nhân 2 (từ 2 × 6 đến 2 × 10)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 8 bằng bao nhiêu?",
            "options": [
              14,
              16,
              18,
              20
            ],
            "answer": 16,
            "mascotHint": "2 × 7 = 14, đếm thêm 2 được 16."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 10 bằng bao nhiêu?",
            "options": [
              12,
              20,
              100,
              21
            ],
            "answer": 20,
            "mascotHint": "Mười lần hai là hai mươi: 2 × 10 = 20."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "2 × 6 = 12 · 2 × 7 = 14 · 2 × 8 = 16 · 2 × 9 = 18 · 2 × 10 = 20.",
              "Muốn tìm kết quả tiếp theo, đếm thêm 2."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l6",
      "title": "Bài 6: Luyện tập bảng nhân 2",
      "type": "learn",
      "description": "Vận dụng bảng nhân 2 vào tìm thừa số, tích và giải toán",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Bé đã thuộc bảng nhân 2 chưa? Cùng Rô-bốt thử sức nhé! 🧮"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Luyện Tập",
            "title": "Ba dạng bài thường gặp",
            "explanation": "Bảng nhân 2 xuất hiện trong ba dạng bài: tính tích, tìm thừa số còn thiếu, và giải toán có lời văn.",
            "points": [
              "Tính tích: 2 × 7 = 14.",
              "Tìm số còn thiếu: 2 × ... = 16 thì chỗ trống là 8.",
              "Giải toán: mỗi con cua có 2 cái càng, 7 con cua có 2 × 7 = 14 cái càng."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Mỗi con cua có 2 cái càng.\n7 con cua có: 2 × 7 = 14 (cái càng)",
            "operation": {
              "left": 2,
              "sign": "×",
              "right": 7,
              "result": 14
            },
            "tenFrame": {
              "filled": 10,
              "total": 10,
              "emoji": "🦀",
              "extra": 4,
              "label": "7 con cua, mỗi con 2 càng: 2 × 7 = 14 cái càng"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một con cua có 2 cái càng. Hỏi 5 con cua có bao nhiêu cái càng?",
            "options": [
              7,
              10,
              12,
              25
            ],
            "answer": 10,
            "mascotHint": "2 × 5 = 10 cái càng."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: 2 × ? = 18",
            "options": [
              8,
              9,
              10,
              16
            ],
            "answer": 9,
            "mascotHint": "Trong bảng nhân 2, 18 là 2 × 9."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng nhân 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.",
              "Gặp bài toán 'mỗi ... có 2', bé dùng phép nhân 2."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l7",
      "title": "Bài 7: Bảng nhân 5 (từ 5 × 1 đến 5 × 5)",
      "type": "learn",
      "description": "Lập và học thuộc nửa đầu bảng nhân 5",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Mỗi bàn tay có 5 ngón. Bé xoè 1 bàn, 2 bàn, 3 bàn tay nào! ✋"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Nhân 5",
            "title": "Năm được lấy một lần, hai lần, ba lần...",
            "explanation": "Bảng nhân 5 cũng lập bằng cách đếm thêm 5: từ 5, thêm 5 được 10, thêm 5 được 15...",
            "rule": "5 × 1 = 5 · 5 × 2 = 10 · 5 × 3 = 15 · 5 × 4 = 20 · 5 × 5 = 25. Đếm thêm 5 rồi nêu số còn thiếu!",
            "points": [
              "Mỗi kết quả hơn kém nhau đúng 5 đơn vị.",
              "Kết quả bảng nhân 5 luôn tận cùng là 0 hoặc 5.",
              "5 × 2 = 10 — bằng đúng 2 × 5."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "5  ·  10  ·  15  ·  20  ·  25\n5×1   5×2   5×3   5×4   5×5",
            "numberLine": {
              "from": 5,
              "to": 25,
              "step": 5,
              "marks": [
                5,
                10,
                15,
                20,
                25
              ],
              "label": "Đếm thêm 5: 5 · 10 · 15 · 20 · 25"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "5 × 1",
                  "5"
                ],
                [
                  "5 × 2",
                  "10"
                ],
                [
                  "5 × 3",
                  "15"
                ],
                [
                  "5 × 4",
                  "20"
                ],
                [
                  "5 × 5",
                  "25"
                ]
              ],
              "label": "Bảng nhân 5 (từ 5 × 1 đến 5 × 5)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "5 × 4 bằng bao nhiêu?",
            "options": [
              9,
              15,
              20,
              25
            ],
            "answer": 20,
            "mascotHint": "Đếm thêm 5: 5, 10, 15, 20. Vậy 5 × 4 = 20."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "5 × 1 = 5 · 5 × 2 = 10 · 5 × 3 = 15 · 5 × 4 = 20 · 5 × 5 = 25.",
              "Kết quả bảng nhân 5 tận cùng là 0 hoặc 5."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l8",
      "title": "Bài 8: Bảng nhân 5 (từ 5 × 6 đến 5 × 10)",
      "type": "learn",
      "description": "Hoàn thành bảng nhân 5 và thuộc cả bảng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Ta có 5 × 5 = 25 rồi. Đi tiếp nhé: 5 × 6, 5 × 7... 🌟"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Nhân 5",
            "title": "Từ 5 × 6 đến 5 × 10",
            "explanation": "Lấy 5 × 5 = 25 rồi đếm thêm 5 cho mỗi bước tiếp theo.",
            "rule": "5 × 6 = 30 · 5 × 7 = 35 · 5 × 8 = 40 · 5 × 9 = 45 · 5 × 10 = 50. Năm mươi là kết quả cuối của bảng nhân 5!",
            "points": [
              "5 × 6 = 5 × 5 + 5 = 25 + 5 = 30.",
              "5 × 10 = 50 — năm mươi.",
              "Cả bảng nhân 5: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "30 · 35 · 40 · 45 · 50\n5×6  5×7  5×8  5×9  5×10",
            "numberLine": {
              "from": 30,
              "to": 50,
              "step": 5,
              "marks": [
                30,
                35,
                40,
                45,
                50
              ],
              "label": "Đếm thêm 5: 30 · 35 · 40 · 45 · 50"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "5 × 6",
                  "30"
                ],
                [
                  "5 × 7",
                  "35"
                ],
                [
                  "5 × 8",
                  "40"
                ],
                [
                  "5 × 9",
                  "45"
                ],
                [
                  "5 × 10",
                  "50"
                ]
              ],
              "label": "Bảng nhân 5 (từ 5 × 6 đến 5 × 10)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "5 × 8 bằng bao nhiêu?",
            "options": [
              35,
              40,
              45,
              48
            ],
            "answer": 40,
            "mascotHint": "5 × 7 = 35, đếm thêm 5 được 40."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "5 × 6 = 30 · 5 × 7 = 35 · 5 × 8 = 40 · 5 × 9 = 45 · 5 × 10 = 50.",
              "Số tận cùng luôn là 0 hoặc 5."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l9",
      "title": "Bài 9: Luyện tập bảng nhân 5. Hai lần năm bằng năm lần hai",
      "type": "learn",
      "description": "Luyện bảng nhân 5 và nhận biết 2 × 5 = 5 × 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Nếu đổi chỗ hai thừa số thì tích có đổi không nhỉ? Bé thử đoán xem! 🤔"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Điều Thú Vị",
            "title": "Đổi chỗ hai thừa số — tích không đổi",
            "explanation": "Cùng một số lượng đồ vật, đếm theo hàng hay theo cột đều ra kết quả như nhau.",
            "rule": "5 × 3 = 3 × 5 = 15. Đổi chỗ hai thừa số thì tích vẫn bằng nhau.",
            "points": [
              "3 hàng, mỗi hàng 5 quả bóng: 5 × 3 = 15 quả.",
              "5 cột, mỗi cột 3 quả bóng: 3 × 5 = 15 quả.",
              "Vì vậy học bảng nhân 2 và bảng nhân 5 là bé biết thêm rất nhiều phép tính."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "5 × 3 = 15   và   3 × 5 = 15\nĐổi chỗ hai thừa số, tích không đổi.",
            "operation": {
              "left": 5,
              "sign": "×",
              "right": 3,
              "result": 15
            },
            "table": {
              "headers": [
                "Phép tính",
                "Tích"
              ],
              "rows": [
                [
                  "5 × 3",
                  "15"
                ],
                [
                  "3 × 5",
                  "15"
                ]
              ],
              "label": "Đổi chỗ hai thừa số thì tích không đổi"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 5 bằng bao nhiêu? Và 5 × 2 bằng bao nhiêu?",
            "options": [
              "Bằng nhau và cùng bằng 10",
              "Bằng nhau và cùng bằng 7",
              "Khác nhau",
              "2 × 5 lớn hơn"
            ],
            "answer": "Bằng nhau và cùng bằng 10",
            "mascotHint": "Đổi chỗ hai thừa số, tích không đổi: cả hai đều bằng 10."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một con chim có 2 cánh. Hỏi 5 con chim có bao nhiêu cánh?",
            "options": [
              7,
              10,
              12,
              25
            ],
            "answer": 10,
            "mascotHint": "2 × 5 = 10 cánh (và 5 × 2 cũng bằng 10).",
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
              "Đổi chỗ hai thừa số thì tích không đổi.",
              "2 × 5 = 5 × 2 = 10."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l10",
      "title": "Bài 10: Phép chia là gì?",
      "type": "learn",
      "description": "Nhận biết phép chia qua chia đều thành các phần bằng nhau",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Có 10 quả cam, Rô-bốt chia đều vào 2 đĩa. Mỗi đĩa được mấy quả nhỉ? 🍊",
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
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Chia đều thành các phần bằng nhau",
            "explanation": "Chia một số đồ vật thành các phần BẰNG NHAU thì ta dùng phép chia.",
            "rule": "10 quả cam chia thành 2 phần bằng nhau, mỗi phần có 5 quả: 10 : 2 = 5. Đọc là: mười chia hai bằng năm.",
            "points": [
              "Dấu : gọi là dấu chia.",
              "Kết quả của phép chia luôn nhỏ hơn hoặc bằng số bị chia.",
              "Chia càng nhiều phần thì mỗi phần càng ít."
            ],
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
          "type": "visual",
          "content": {
            "text": "10 quả cam chia vào 2 đĩa, mỗi đĩa 5 quả\n10 : 2 = 5",
            "operation": {
              "left": 10,
              "sign": ":",
              "right": 2,
              "result": 5
            },
            "fractionCircle": {
              "parts": 2,
              "shaded": 1,
              "label": "10 quả chia thành 2 phần bằng nhau, mỗi phần 5 quả"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 6 cái kẹo chia đều cho 2 bạn. Mỗi bạn được mấy cái kẹo?",
            "options": [
              2,
              3,
              4,
              6
            ],
            "answer": 3,
            "mascotHint": "6 : 2 = 3 cái kẹo cho mỗi bạn.",
            "items": [
              {
                "emoji": "🍬",
                "label": "Kẹo",
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
              "Chia đều thành các phần bằng nhau thì dùng phép chia.",
              "10 : 2 = 5 nghĩa là 10 chia thành 2 phần, mỗi phần 5."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l11",
      "title": "Bài 11: Số bị chia – Số chia – Thương",
      "type": "learn",
      "description": "Gọi tên đúng các thành phần của phép chia",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Phép chia cũng có tên gọi cho từng số, giống như phép nhân đấy! ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khái Niệm",
            "title": "Số bị chia – Số chia – Thương",
            "explanation": "Số đem đi chia gọi là SỐ BỊ CHIA. Số chia dùng để chia gọi là SỐ CHIA. Kết quả gọi là THƯƠNG.",
            "rule": "10 : 2 = 5: số 10 là số bị chia, số 2 là số chia, số 5 là thương.",
            "points": [
              "Số bị chia là số lớn nhất trong ba số.",
              "12 : 2 = 6 thì 12 là số bị chia, 2 là số chia, 6 là thương.",
              "Cách đọc: mười hai chia hai bằng sáu."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "10  :  2  =  5\nsố bị chia · số chia · thương",
            "operation": {
              "left": 10,
              "sign": ":",
              "right": 2,
              "result": 5
            },
            "table": {
              "headers": [
                "Số bị chia",
                "Số chia",
                "Thương"
              ],
              "rows": [
                [
                  10,
                  2,
                  5
                ]
              ],
              "label": "Số bị chia – Số chia – Thương"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép chia 20 : 5 = 4, số nào là SỐ CHIA?",
            "options": [
              20,
              5,
              4,
              24
            ],
            "answer": 5,
            "mascotHint": "Số dùng để chia là 5 — đó là số chia."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép chia 15 : 5 = 3, số nào là THƯƠNG?",
            "options": [
              15,
              5,
              3,
              10
            ],
            "answer": 3,
            "mascotHint": "Thương là kết quả của phép chia: 3."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số bị chia : số chia = thương.",
              "10 : 2 = 5: số bị chia 10, số chia 2, thương 5."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l12",
      "title": "Bài 12: Từ một phép nhân viết được hai phép chia",
      "type": "learn",
      "description": "Lập hai phép chia từ một phép nhân đã biết",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Từ 2 × 3 = 6, Rô-bốt viết được hai phép chia đấy! Bé xem nhé 🎈"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Một phép nhân, hai phép chia",
            "explanation": "Lấy tích chia cho thừa số thứ nhất thì được thừa số thứ hai, và ngược lại.",
            "rule": "Từ 2 × 3 = 6, ta có: 6 : 2 = 3 và 6 : 3 = 2.",
            "points": [
              "Tích chia cho thừa số này được thừa số kia.",
              "Đây là cách học bảng chia nhanh nhất: học từ bảng nhân.",
              "Từ 5 × 4 = 20, ta có 20 : 5 = 4 và 20 : 4 = 5."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "2 × 3 = 6   →   6 : 2 = 3   và   6 : 3 = 2",
            "operation": {
              "left": 2,
              "sign": "×",
              "right": 3,
              "result": 6
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "2 × 3",
                  "6"
                ],
                [
                  "6 : 2",
                  "3"
                ],
                [
                  "6 : 3",
                  "2"
                ]
              ],
              "label": "Từ một phép nhân viết được hai phép chia"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Từ phép nhân 5 × 3 = 15, hai phép chia là gì?",
            "options": [
              "15 : 5 = 3 và 15 : 3 = 5",
              "15 : 5 = 2 và 15 : 3 = 4",
              "5 : 15 = 3 và 3 : 15 = 5",
              "15 : 5 = 3 và 5 : 3 = 15"
            ],
            "answer": "15 : 5 = 3 và 15 : 3 = 5",
            "mascotHint": "Lấy tích 15 chia cho từng thừa số: 15 : 5 = 3 và 15 : 3 = 5."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Từ một phép nhân luôn viết được hai phép chia.",
              "2 × 3 = 6 → 6 : 2 = 3 và 6 : 3 = 2."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l13",
      "title": "Bài 13: Bảng chia 2",
      "type": "learn",
      "description": "Lập bảng chia 2 từ bảng nhân 2 và học thuộc",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Từ bảng nhân 2, bé lập được bảng chia 2 đấy. Cùng làm nhé! 🍎"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Chia 2",
            "title": "Lập bảng chia 2 từ bảng nhân 2",
            "explanation": "Lấy tích chia cho 2, ta được thừa số còn lại. Bảng nhân 2 và bảng chia 2 đi thành từng cặp.",
            "rule": "2 : 2 = 1 · 4 : 2 = 2 · 6 : 2 = 3 · 8 : 2 = 4 · 10 : 2 = 5 · 12 : 2 = 6 · 14 : 2 = 7 · 16 : 2 = 8 · 18 : 2 = 9 · 20 : 2 = 10.",
            "points": [
              "2 × 3 = 6 nên 6 : 2 = 3.",
              "2 × 7 = 14 nên 14 : 2 = 7.",
              "Số bị chia trong bảng chia 2 là các số chẵn: 2, 4, 6... 20."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bảng nhân 2:  2×1=2  2×2=4  2×3=6 ...\nBảng chia 2:  2:2=1  4:2=2  6:2=3 ...",
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "2 : 2",
                  "1"
                ],
                [
                  "4 : 2",
                  "2"
                ],
                [
                  "6 : 2",
                  "3"
                ],
                [
                  "8 : 2",
                  "4"
                ],
                [
                  "10 : 2",
                  "5"
                ],
                [
                  "12 : 2",
                  "6"
                ],
                [
                  "14 : 2",
                  "7"
                ],
                [
                  "16 : 2",
                  "8"
                ],
                [
                  "18 : 2",
                  "9"
                ],
                [
                  "20 : 2",
                  "10"
                ]
              ],
              "label": "Bảng chia 2"
            },
            "numberLine": {
              "from": 2,
              "to": 20,
              "step": 2,
              "marks": [
                2,
                4,
                6,
                8,
                10,
                12,
                14,
                16,
                18,
                20
              ],
              "label": "Bảng chia 2 dựa vào bảng nhân 2"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "12 : 2 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              10
            ],
            "answer": 6,
            "mascotHint": "Vì 2 × 6 = 12 nên 12 : 2 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 16 quả táo chia đều vào 2 đĩa. Mỗi đĩa có mấy quả?",
            "options": [
              7,
              8,
              9,
              14
            ],
            "answer": 8,
            "mascotHint": "16 : 2 = 8 quả táo mỗi đĩa.",
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
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng chia 2: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "2 × ... = số bị chia thì thương là số còn thiếu."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l14",
      "title": "Bài 14: Bảng chia 5",
      "type": "learn",
      "description": "Lập bảng chia 5 từ bảng nhân 5 và học thuộc",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Có 45 bông hoa cúc, mỗi bó 5 bông. Bé bó được mấy bó? 🌼",
            "items": [
              {
                "emoji": "🌸",
                "label": "Bông hoa",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Chia 5",
            "title": "Lập bảng chia 5 từ bảng nhân 5",
            "explanation": "Lấy tích chia cho 5, ta được thừa số còn lại.",
            "rule": "5 : 5 = 1 · 10 : 5 = 2 · 15 : 5 = 3 · 20 : 5 = 4 · 25 : 5 = 5 · 30 : 5 = 6 · 35 : 5 = 7 · 40 : 5 = 8 · 45 : 5 = 9 · 50 : 5 = 10.",
            "points": [
              "5 × 6 = 30 nên 30 : 5 = 6.",
              "5 × 9 = 45 nên 45 : 5 = 9.",
              "Số bị chia trong bảng chia 5 tận cùng là 0 hoặc 5."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cửa hàng có 40 bông hoa, bó mỗi bó 5 bông:\n40 : 5 = 8 (bó hoa)",
            "operation": {
              "left": 40,
              "sign": ":",
              "right": 5,
              "result": 8
            },
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "5 : 5",
                  "1"
                ],
                [
                  "10 : 5",
                  "2"
                ],
                [
                  "15 : 5",
                  "3"
                ],
                [
                  "20 : 5",
                  "4"
                ],
                [
                  "25 : 5",
                  "5"
                ],
                [
                  "30 : 5",
                  "6"
                ],
                [
                  "35 : 5",
                  "7"
                ],
                [
                  "40 : 5",
                  "8"
                ],
                [
                  "45 : 5",
                  "9"
                ],
                [
                  "50 : 5",
                  "10"
                ]
              ],
              "label": "Bảng chia 5 — 40 : 5 = 8 bó hoa"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "30 : 5 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              25
            ],
            "answer": 6,
            "mascotHint": "Vì 5 × 6 = 30 nên 30 : 5 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Bạn Nam cắt 30 hình tròn, mỗi chiếc đèn cần 5 hình. Nam làm được mấy chiếc đèn?",
            "options": [
              5,
              6,
              7,
              25
            ],
            "answer": 6,
            "mascotHint": "30 : 5 = 6 chiếc đèn.",
            "planeShapes": [
              {
                "kind": "circle",
                "color": "#f59e0b"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng chia 5: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "5 × ... = số bị chia thì thương là số còn thiếu."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l15",
      "title": "Bài 15: Luyện tập chung phép nhân, phép chia",
      "type": "learn",
      "description": "Vận dụng cả bốn bảng nhân chia 2 và 5 vào giải toán",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Trong trò chơi Ô ăn quan, mỗi ô có 5 viên sỏi. Bé tính giúp Rô-bốt nhé! 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Luyện Tập Chung",
            "title": "Bốn bảng đã học",
            "explanation": "Bé đã có trong tay bảng nhân 2, bảng nhân 5, bảng chia 2 và bảng chia 5. Giờ là lúc dùng chúng.",
            "points": [
              "Tính nhân: 2 × 3, 5 × 4, 2 × 1, 5 × 1.",
              "Nhân với 1: số nào nhân với 1 cũng bằng chính số đó (5 × 1 = 5).",
              "Giải toán: 10 ô, mỗi ô 5 viên sỏi → 5 × 10 = 50 viên sỏi."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ô ăn quan: 10 ô, mỗi ô 5 viên sỏi\n5 × 10 = 50 (viên sỏi)",
            "operation": {
              "left": 5,
              "sign": "×",
              "right": 10,
              "result": 50
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "5 × 10",
                  "50"
                ],
                [
                  "50 : 5",
                  "10"
                ],
                [
                  "50 : 10",
                  "5"
                ]
              ],
              "label": "Ô ăn quan: 10 ô, mỗi ô 5 viên sỏi"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 35 bạn đi cắm trại, cô giáo chia đều thành 5 nhóm. Mỗi nhóm có mấy bạn?",
            "options": [
              5,
              6,
              7,
              30
            ],
            "answer": 7,
            "mascotHint": "35 : 5 = 7 bạn mỗi nhóm."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Bà có 20 quả vải, bà chia đều cho 2 cháu. Mỗi cháu được mấy quả?",
            "options": [
              5,
              10,
              18,
              22
            ],
            "answer": 10,
            "mascotHint": "20 : 2 = 10 quả vải."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Chia đều cho 2 thì lấy số đó chia 2; chia đều cho 5 thì chia 5.",
              "Số nào nhân với 1 cũng bằng chính nó."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c8-l16",
      "title": "Bài 16: Thử thách - Trò chơi xúc xắc và ô ăn quan",
      "type": "learn",
      "description": "Luyện tập trò chơi hóa phép nhân, phép chia 2 và 5",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Rô-bốt gieo xúc xắc được 4 chấm. Bé tìm phép nhân có kết quả bằng 4 nhé! 🎲"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Trò Chơi",
            "title": "Cách chơi xúc xắc",
            "explanation": "Đặt các tấm thẻ ghi phép tính trên bàn. Gieo xúc xắc được mấy chấm thì úp tấm thẻ có KẾT QUẢ bằng số chấm đó.",
            "points": [
              "Gieo được 4 → úp thẻ 2 × 2 = 4.",
              "Gieo được 10 → úp thẻ 5 × 2 = 10 hoặc 2 × 5 = 10.",
              "Gieo được 8 → úp thẻ 16 : 2 = 8.",
              "Trò chơi kết thúc khi úp đủ 6 tấm thẻ."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Gieo xúc xắc → tìm phép tính có kết quả bằng số chấm\n6 chấm? 2 × 3 = 6 hoặc 12 : 2 = 6!",
            "table": {
              "headers": [
                "Số chấm",
                "Phép tính có kết quả bằng số chấm"
              ],
              "rows": [
                [
                  "6",
                  "2 × 3 = 6"
                ],
                [
                  "6",
                  "12 : 2 = 6"
                ],
                [
                  "15",
                  "5 × 3 = 15"
                ],
                [
                  "8",
                  "2 × 4 = 8"
                ]
              ],
              "label": "Trò chơi xúc xắc: gieo được mấy chấm thì tìm phép tính có kết quả bằng số đó"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Xúc xắc gieo được 8 chấm. Phép tính nào cho kết quả bằng 8?",
            "options": [
              "16 : 2",
              "5 × 5",
              "20 : 5",
              "2 × 5"
            ],
            "answer": "16 : 2",
            "mascotHint": "16 : 2 = 8. (20 : 5 = 4; 2 × 5 = 10; 5 × 5 = 25)"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Xúc xắc gieo được 6 chấm. Bé chọn được mấy phép tính đúng? 2 × 3 · 12 : 2 · 30 : 5 · 5 + 1",
            "options": [
              "1 phép tính",
              "2 phép tính",
              "3 phép tính",
              "4 phép tính"
            ],
            "answer": "3 phép tính",
            "mascotHint": "2 × 3 = 6, 12 : 2 = 6 và 30 : 5 = 6 — cả ba đều bằng 6. Riêng 5 + 1 = 6 là phép CỘNG, không phải nhân hay chia."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé giỏi lắm:",
            "points": [
              "Bé đã thuộc bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5.",
              "Chơi trò chơi giúp bé nhớ bảng nhanh hơn."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
