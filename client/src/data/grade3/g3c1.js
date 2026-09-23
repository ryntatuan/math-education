export const g3c1 = {
  "id": "g3-c1",
  "name": "Chủ đề 1: Ôn tập và bổ sung",
  "description": "Ôn tập số đến 1 000, cộng trừ trong phạm vi 1 000, tìm thành phần chưa biết, ôn tập bảng nhân chia 2 và 5, bảng nhân chia 3 và 4",
  "icon": "🔄",
  "color": "#4facfe",
  "totalLessons": 12,
  "lessons": [
    {
      "id": "g3-c1-l1",
      "title": "Bài 1: Ôn tập các số đến 1 000",
      "type": "learn",
      "description": "Đọc, viết, so sánh số có ba chữ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Chào mừng bé lên Lớp 3! Mình cùng ôn lại các số đến 1 000 nhé 🚀"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Số có ba chữ số",
            "explanation": "Số có ba chữ số gồm HÀNG TRĂM, HÀNG CHỤC và HÀNG ĐƠN VỊ.",
            "rule": "Số 475 gồm 4 trăm, 7 chục và 5 đơn vị. Đọc là: bốn trăm bảy mươi lăm.",
            "points": [
              "475 = 400 + 70 + 5.",
              "Số liền sau của 999 là 1 000.",
              "So sánh: so hàng trăm trước, rồi hàng chục, rồi hàng đơn vị."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "475 = 400 + 70 + 5\n999  —  1 000",
            "placeValue": {
              "headers": [
                "Trăm",
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                4,
                7,
                5
              ],
              "label": "475 = 400 + 70 + 5"
            },
            "numberLine": {
              "from": 999,
              "to": 1000,
              "step": 1,
              "marks": [
                999,
                1000
              ],
              "label": "999 rồi đến 1000"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số 475 gồm mấy trăm, mấy chục, mấy đơn vị?",
            "options": [
              "4 trăm, 7 chục, 5 đơn vị",
              "5 trăm, 7 chục, 4 đơn vị",
              "4 trăm, 5 chục, 7 đơn vị",
              "47 chục, 5 đơn vị"
            ],
            "answer": "4 trăm, 7 chục, 5 đơn vị",
            "mascotHint": "Đọc từ trái sang: 4 là trăm, 7 là chục, 5 là đơn vị."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong hai số 583 và 538, số nào lớn hơn?",
            "options": [
              583,
              538,
              "Hai số bằng nhau"
            ],
            "answer": 583,
            "mascotHint": "Hàng trăm bằng nhau, so hàng chục: 8 > 3 nên 583 > 538."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số có ba chữ số gồm trăm, chục, đơn vị.",
              "475 = 400 + 70 + 5; 583 > 538."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l2",
      "title": "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1 000",
      "type": "learn",
      "description": "Đặt tính và tính cộng trừ có nhớ trong phạm vi 1 000",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Bé còn nhớ khi nào phải nhớ 1 và khi nào phải mượn 1 không? 🔢"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Cộng trừ trong phạm vi 1 000",
            "explanation": "Cộng: nếu một hàng cộng lại từ 10 trở lên thì NHỚ 1 sang hàng bên trái. Trừ: nếu không đủ để trừ thì MƯỢN 1 từ hàng bên trái.",
            "rule": "356 + 127 = 483 (6+7=13 viết 3 nhớ 1). 534 − 268 = 266 (mượn hai lần).",
            "points": [
              "Luôn đặt tính thẳng cột và tính từ phải sang trái.",
              "Thử lại bằng phép tính ngược.",
              "Kết quả phải nhỏ hơn 1 000."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "  356          534\n+ 127        − 268\n  483          266",
            "operation": {
              "left": 356,
              "sign": "+",
              "right": 127,
              "result": 483
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "356 + 127",
                  "483 (6+7=13 viết 3 nhớ 1)"
                ],
                [
                  "534 − 268",
                  "266 (mượn hai lần)"
                ]
              ],
              "label": "Ôn tập cộng trừ trong phạm vi 1 000"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "356 + 127 bằng bao nhiêu?",
            "options": [
              473,
              483,
              493,
              423
            ],
            "answer": 483,
            "mascotHint": "6+7=13 viết 3 nhớ 1; 5+2+1=8; 3+1=4. Kết quả 483."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "534 − 268 bằng bao nhiêu?",
            "options": [
              266,
              276,
              334,
              256
            ],
            "answer": 266,
            "mascotHint": "Mượn hai lần: 14−8=6; 12−6=6; 4−2=2. Kết quả 266."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Cộng có nhớ: nhớ 1. Trừ có nhớ: mượn 1.",
              "356 + 127 = 483; 534 − 268 = 266."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l3",
      "title": "Bài 3: Tìm thành phần trong phép cộng",
      "type": "learn",
      "description": "Tìm số hạng chưa biết trong một tổng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Có một số bị che mất: ? + 145 = 320. Bé tìm giúp Rô-bốt nhé! 🔍"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Tìm số hạng chưa biết",
            "explanation": "Muốn tìm một số hạng, ta lấy TỔNG trừ đi số hạng đã biết.",
            "rule": "? + 145 = 320 → ? = 320 − 145 = 175.",
            "points": [
              "Số hạng + số hạng = tổng.",
              "Muốn tìm số hạng chưa biết: lấy tổng trừ số hạng đã biết.",
              "Thử lại: 175 + 145 = 320 ✓"
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "? + 145 = 320\n? = 320 − 145 = 175",
            "operation": {
              "left": 175,
              "sign": "+",
              "right": 145,
              "result": 320
            },
            "numberLine": {
              "from": 145,
              "to": 320,
              "step": 5,
              "marks": [
                145,
                175,
                320
              ],
              "hops": [
                {
                  "from": 145,
                  "to": 320,
                  "label": "+175"
                }
              ],
              "label": "? + 145 = 320 ⇒ ? = 320 − 145 = 175"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: ? + 145 = 320",
            "options": [
              165,
              175,
              185,
              465
            ],
            "answer": 175,
            "mascotHint": "Lấy tổng trừ số hạng đã biết: 320 − 145 = 175."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số hạng chưa biết = tổng − số hạng đã biết.",
              "? + 145 = 320 nên ? = 175."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l4",
      "title": "Bài 4: Tìm thành phần trong phép trừ",
      "type": "learn",
      "description": "Tìm số bị trừ và số trừ chưa biết",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Lần này Rô-bốt che số ở chỗ khác: 500 − ? = 260. Bé tìm nhé! 🔍"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Tìm số bị trừ và số trừ",
            "explanation": "Muốn tìm SỐ BỊ TRỪ, ta lấy HIỆU cộng với SỐ TRỪ. Muốn tìm SỐ TRỪ, ta lấy SỐ BỊ TRỪ trừ đi HIỆU.",
            "rule": "500 − ? = 260 → ? = 500 − 260 = 240. Và ? − 130 = 70 → ? = 70 + 130 = 200.",
            "points": [
              "Số bị trừ = hiệu + số trừ.",
              "Số trừ = số bị trừ − hiệu.",
              "Đây là hai công thức rất hay dùng, bé nhớ kĩ nhé."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "500 − ? = 260  →  ? = 500 − 260 = 240\n? − 130 = 70   →  ? = 70 + 130 = 200",
            "operation": {
              "left": 500,
              "sign": "−",
              "right": 260,
              "result": 240
            },
            "table": {
              "headers": [
                "Tìm gì",
                "Cách làm"
              ],
              "rows": [
                [
                  "500 − ? = 260",
                  "? = 500 − 260 = 240"
                ],
                [
                  "? − 130 = 70",
                  "? = 70 + 130 = 200"
                ]
              ],
              "label": "Tìm thành phần trong phép trừ"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: 500 − ? = 260",
            "options": [
              240,
              250,
              260,
              760
            ],
            "answer": 240,
            "mascotHint": "Số trừ = số bị trừ − hiệu = 500 − 260 = 240."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền số còn thiếu: ? − 130 = 70",
            "options": [
              60,
              130,
              200,
              2000
            ],
            "answer": 200,
            "mascotHint": "Số bị trừ = hiệu + số trừ = 70 + 130 = 200."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số bị trừ = hiệu + số trừ.",
              "Số trừ = số bị trừ − hiệu."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l5",
      "title": "Bài 5: Ôn tập bảng nhân 2 và bảng nhân 5",
      "type": "learn",
      "description": "Ôn lại hai bảng nhân đã học ở lớp 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Ở lớp 2 bé đã học bảng nhân 2 và bảng nhân 5. Mình ôn lại nhé! 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Bảng nhân 2 và bảng nhân 5",
            "explanation": "Bảng nhân 2: đếm thêm 2. Bảng nhân 5: đếm thêm 5. Kết quả bảng nhân 5 luôn tận cùng là 0 hoặc 5.",
            "rule": "2 × 7 = 14 · 2 × 9 = 18 · 5 × 6 = 30 · 5 × 8 = 40.",
            "points": [
              "2 × 10 = 20; 5 × 10 = 50.",
              "Đổi chỗ hai thừa số thì tích không đổi: 2 × 5 = 5 × 2 = 10.",
              "Học thuộc hai bảng này giúp bé tính nhanh hơn nhiều."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "2 × 7 = 14    5 × 6 = 30\n2 × 9 = 18    5 × 8 = 40",
            "numberLine": {
              "from": 2,
              "to": 18,
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
                18
              ],
              "label": "Đếm thêm 2 rồi đếm thêm 5"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "2 × 7",
                  "14"
                ],
                [
                  "2 × 9",
                  "18"
                ],
                [
                  "5 × 6",
                  "30"
                ],
                [
                  "5 × 8",
                  "40"
                ]
              ],
              "label": "Ôn tập bảng nhân 2 và bảng nhân 5"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 × 7 bằng bao nhiêu?",
            "options": [
              12,
              14,
              16,
              9
            ],
            "answer": 14,
            "mascotHint": "Đếm thêm 2 bảy lần: 14."
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
              13
            ],
            "answer": 40,
            "mascotHint": "Đếm thêm 5 tám lần: 40."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "2 × 7 = 14; 5 × 8 = 40.",
              "Bảng nhân 5 tận cùng là 0 hoặc 5."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l6",
      "title": "Bài 6: Ôn tập bảng chia 2 và bảng chia 5",
      "type": "learn",
      "description": "Ôn lại hai bảng chia đã học ở lớp 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Từ bảng nhân, bé suy ra bảng chia ngay được. Cùng ôn nhé! ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Bảng chia 2 và bảng chia 5",
            "explanation": "Lấy tích chia cho một thừa số thì được thừa số kia.",
            "rule": "2 × 7 = 14 → 14 : 2 = 7. 5 × 8 = 40 → 40 : 5 = 8.",
            "points": [
              "18 : 2 = 9; 20 : 2 = 10.",
              "45 : 5 = 9; 50 : 5 = 10.",
              "Học bảng nhân là có luôn bảng chia."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "14 : 2 = 7\n40 : 5 = 8",
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
                  "14 : 2",
                  "7"
                ],
                [
                  "40 : 5",
                  "8"
                ]
              ],
              "label": "Ôn tập bảng chia 2 và bảng chia 5"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "18 : 2 bằng bao nhiêu?",
            "options": [
              6,
              8,
              9,
              16
            ],
            "answer": 9,
            "mascotHint": "Vì 2 × 9 = 18 nên 18 : 2 = 9."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "45 : 5 bằng bao nhiêu?",
            "options": [
              7,
              8,
              9,
              40
            ],
            "answer": 9,
            "mascotHint": "Vì 5 × 9 = 45 nên 45 : 5 = 9."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "18 : 2 = 9; 45 : 5 = 9.",
              "Từ phép nhân suy ra ngay phép chia."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l7",
      "title": "Bài 7: Bảng nhân 3",
      "type": "learn",
      "description": "Lập và học thuộc bảng nhân 3",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Mỗi chiếc xe đạp có 3 bánh. Bé đếm bánh của 1, 2, 3 chiếc xe nhé! 🚲",
            "items": [
              {
                "emoji": "🚲",
                "label": "Xe đạp",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Nhân 3",
            "title": "Bảng nhân 3",
            "explanation": "Bảng nhân 3 lập bằng cách đếm thêm 3 mỗi bước: từ 3, thêm 3 được 6, thêm 3 được 9...",
            "rule": "3 × 1 = 3 · 3 × 2 = 6 · 3 × 3 = 9 · 3 × 4 = 12 · 3 × 5 = 15 · 3 × 6 = 18 · 3 × 7 = 21 · 3 × 8 = 24 · 3 × 9 = 27 · 3 × 10 = 30.",
            "points": [
              "Mỗi kết quả hơn kém nhau đúng 3 đơn vị.",
              "Tổng các chữ số của kết quả chia hết cho 3: 12 → 1+2 = 3.",
              "3 × 10 = 30 — kết quả cuối của bảng."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "3 · 6 · 9 · 12 · 15 · 18 · 21 · 24 · 27 · 30",
            "numberLine": {
              "from": 3,
              "to": 30,
              "step": 3,
              "marks": [
                3,
                6,
                9,
                12,
                15,
                18,
                21,
                24,
                27,
                30
              ],
              "label": "Đếm thêm 3: 3 · 6 · 9 · … · 30"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "3 × 1",
                  "3"
                ],
                [
                  "3 × 4",
                  "12"
                ],
                [
                  "3 × 7",
                  "21"
                ],
                [
                  "3 × 10",
                  "30"
                ]
              ],
              "label": "Bảng nhân 3"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 × 4 bằng bao nhiêu?",
            "options": [
              9,
              12,
              15,
              7
            ],
            "answer": 12,
            "mascotHint": "Đếm thêm 3 bốn lần: 3, 6, 9, 12."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 × 9 bằng bao nhiêu?",
            "options": [
              24,
              27,
              30,
              12
            ],
            "answer": 27,
            "mascotHint": "3 × 10 = 30, bớt 3 được 27."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng nhân 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.",
              "3 × 4 = 12; 3 × 9 = 27."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l8",
      "title": "Bài 8: Bảng chia 3",
      "type": "learn",
      "description": "Lập và học thuộc bảng chia 3",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Có 12 cái kẹo chia đều cho 3 bạn. Mỗi bạn được mấy cái? 🍬",
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
          "type": "concept",
          "content": {
            "badge": "Bảng Chia 3",
            "title": "Bảng chia 3",
            "explanation": "Lấy tích trong bảng nhân 3 chia cho 3, ta được thừa số còn lại.",
            "rule": "3 : 3 = 1 · 6 : 3 = 2 · 9 : 3 = 3 · 12 : 3 = 4 · 15 : 3 = 5 · 18 : 3 = 6 · 21 : 3 = 7 · 24 : 3 = 8 · 27 : 3 = 9 · 30 : 3 = 10.",
            "points": [
              "3 × 4 = 12 nên 12 : 3 = 4.",
              "3 × 9 = 27 nên 27 : 3 = 9.",
              "Số bị chia trong bảng chia 3 là các số trong bảng nhân 3."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bảng nhân 3:  3 × 4 = 12\nBảng chia 3:  12 : 3 = 4",
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "3 : 3",
                  "1"
                ],
                [
                  "6 : 3",
                  "2"
                ],
                [
                  "9 : 3",
                  "3"
                ],
                [
                  "12 : 3",
                  "4"
                ],
                [
                  "15 : 3",
                  "5"
                ],
                [
                  "18 : 3",
                  "6"
                ],
                [
                  "21 : 3",
                  "7"
                ],
                [
                  "24 : 3",
                  "8"
                ],
                [
                  "27 : 3",
                  "9"
                ],
                [
                  "30 : 3",
                  "10"
                ]
              ],
              "label": "Bảng chia 3"
            },
            "operation": {
              "left": 12,
              "sign": ":",
              "right": 3,
              "result": 4
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "12 : 3 bằng bao nhiêu?",
            "options": [
              3,
              4,
              5,
              9
            ],
            "answer": 4,
            "mascotHint": "Vì 3 × 4 = 12 nên 12 : 3 = 4."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 18 cái kẹo chia đều cho 3 bạn. Mỗi bạn được mấy cái kẹo?",
            "options": [
              5,
              6,
              7,
              15
            ],
            "answer": 6,
            "mascotHint": "18 : 3 = 6 cái kẹo.",
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
              "Bảng chia 3: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "12 : 3 = 4; 18 : 3 = 6."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l9",
      "title": "Bài 9: Bảng nhân 4",
      "type": "learn",
      "description": "Lập và học thuộc bảng nhân 4",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Một chiếc ô tô có 4 bánh. Bé đếm bánh của 1, 2, 3 chiếc ô tô nhé! 🚗",
            "items": [
              {
                "emoji": "🚗",
                "label": "Ô tô",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Bảng Nhân 4",
            "title": "Bảng nhân 4",
            "explanation": "Bảng nhân 4 lập bằng cách đếm thêm 4 mỗi bước: từ 4, thêm 4 được 8, thêm 4 được 12...",
            "rule": "4 × 1 = 4 · 4 × 2 = 8 · 4 × 3 = 12 · 4 × 4 = 16 · 4 × 5 = 20 · 4 × 6 = 24 · 4 × 7 = 28 · 4 × 8 = 32 · 4 × 9 = 36 · 4 × 10 = 40.",
            "points": [
              "Mỗi kết quả hơn kém nhau đúng 4 đơn vị.",
              "Kết quả bảng nhân 4 đều là số chẵn.",
              "4 × 5 = 20; 4 × 10 = 40."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40",
            "numberLine": {
              "from": 4,
              "to": 40,
              "step": 4,
              "marks": [
                4,
                8,
                12,
                16,
                20,
                24,
                28,
                32,
                36,
                40
              ],
              "label": "Đếm thêm 4: 4 · 8 · 12 · … · 40"
            },
            "table": {
              "headers": [
                "Phép nhân",
                "Kết quả"
              ],
              "rows": [
                [
                  "4 × 1",
                  "4"
                ],
                [
                  "4 × 5",
                  "20"
                ],
                [
                  "4 × 8",
                  "32"
                ],
                [
                  "4 × 10",
                  "40"
                ]
              ],
              "label": "Bảng nhân 4"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "4 × 6 bằng bao nhiêu?",
            "options": [
              20,
              24,
              28,
              10
            ],
            "answer": 24,
            "mascotHint": "4 × 5 = 20, thêm 4 được 24."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "4 × 8 bằng bao nhiêu?",
            "options": [
              28,
              32,
              36,
              12
            ],
            "answer": 32,
            "mascotHint": "4 × 7 = 28, thêm 4 được 32."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bảng nhân 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.",
              "4 × 6 = 24; 4 × 8 = 32."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l10",
      "title": "Bài 10: Bảng chia 4",
      "type": "learn",
      "description": "Lập và học thuộc bảng chia 4",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Có 20 quả bóng chia đều vào 4 rổ. Mỗi rổ có mấy quả nhỉ? ⚽",
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
            "badge": "Bảng Chia 4",
            "title": "Bảng chia 4",
            "explanation": "Lấy tích trong bảng nhân 4 chia cho 4, ta được thừa số còn lại.",
            "rule": "4 : 4 = 1 · 8 : 4 = 2 · 12 : 4 = 3 · 16 : 4 = 4 · 20 : 4 = 5 · 24 : 4 = 6 · 28 : 4 = 7 · 32 : 4 = 8 · 36 : 4 = 9 · 40 : 4 = 10.",
            "points": [
              "4 × 6 = 24 nên 24 : 4 = 6.",
              "4 × 7 = 28 nên 28 : 4 = 7.",
              "Học bảng nhân 4 là có luôn bảng chia 4."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bảng nhân 4:  4 × 6 = 24\nBảng chia 4:  24 : 4 = 6",
            "table": {
              "headers": [
                "Phép chia",
                "Kết quả"
              ],
              "rows": [
                [
                  "4 : 4",
                  "1"
                ],
                [
                  "8 : 4",
                  "2"
                ],
                [
                  "12 : 4",
                  "3"
                ],
                [
                  "16 : 4",
                  "4"
                ],
                [
                  "20 : 4",
                  "5"
                ],
                [
                  "24 : 4",
                  "6"
                ],
                [
                  "28 : 4",
                  "7"
                ],
                [
                  "32 : 4",
                  "8"
                ],
                [
                  "36 : 4",
                  "9"
                ],
                [
                  "40 : 4",
                  "10"
                ]
              ],
              "label": "Bảng chia 4"
            },
            "operation": {
              "left": 24,
              "sign": ":",
              "right": 4,
              "result": 6
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "24 : 4 bằng bao nhiêu?",
            "options": [
              5,
              6,
              7,
              20
            ],
            "answer": 6,
            "mascotHint": "Vì 4 × 6 = 24 nên 24 : 4 = 6."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Có 32 quả cam chia đều vào 4 đĩa. Mỗi đĩa có mấy quả cam?",
            "options": [
              7,
              8,
              9,
              28
            ],
            "answer": 8,
            "mascotHint": "32 : 4 = 8 quả cam.",
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
              "Bảng chia 4: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "24 : 4 = 6; 32 : 4 = 8."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l11",
      "title": "Bài 11: Ôn tập hình học và đo lường",
      "type": "learn",
      "description": "Ôn lại hình phẳng, hình khối và các đơn vị đo đã học",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bé đã học bao nhiêu hình và bao nhiêu đơn vị đo rồi nhỉ? 📐"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Hình học và đo lường",
            "explanation": "Bé đã học các hình phẳng, hai loại khối và các đơn vị đo độ dài, khối lượng, dung tích.",
            "rule": "1 dm = 10 cm; 1 m = 100 cm; 1 km = 1 000 m. Túi gạo nặng 5 kg; chai nước chứa 2 l.",
            "points": [
              "Hình vuông: 4 cạnh bằng nhau; hình tam giác: 3 cạnh.",
              "Khối lập phương: 6 mặt vuông bằng nhau.",
              "Chọn đơn vị đo phù hợp với vật: cm, dm, m, km, kg, l."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "1 m = 100 cm\n1 km = 1 000 m\n▢ ⭕ 🔺 ▭",
            "table": {
              "headers": [
                "Đổi",
                "Được"
              ],
              "rows": [
                [
                  "1 dm",
                  "10 cm"
                ],
                [
                  "1 m",
                  "100 cm"
                ],
                [
                  "1 km",
                  "1 000 m"
                ]
              ],
              "label": "Ôn tập đo độ dài — túi gạo nặng 5 kg, chai nước chứa 2 l"
            },
            "planeShape": {
              "kind": "square",
              "formula": "▢ hình vuông · 🔺 hình tam giác · ▭ hình chữ nhật"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "1 m bằng bao nhiêu xăng-ti-mét?",
            "options": [
              "10 cm",
              "100 cm",
              "1 000 cm",
              "50 cm"
            ],
            "answer": "100 cm",
            "mascotHint": "1 m = 100 cm."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đo quãng đường từ nhà đến trường thì dùng đơn vị nào?",
            "options": [
              "Ki-lô-mét (km)",
              "Xăng-ti-mét (cm)",
              "Ki-lô-gam (kg)",
              "Lít (l)"
            ],
            "answer": "Ki-lô-mét (km)",
            "mascotHint": "Quãng đường dài nên dùng ki-lô-mét."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "1 dm = 10 cm; 1 m = 100 cm; 1 km = 1 000 m.",
              "Chọn đơn vị đo phù hợp với vật."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c1-l12",
      "title": "Bài 12: Luyện tập chung chủ đề 1",
      "type": "learn",
      "description": "Ôn tập tổng hợp chủ đề 1",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Bé đã có đủ bốn bảng nhân chia rồi! Mình tổng kết nhé 🎉"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Tổng kết chủ đề 1",
            "explanation": "Bé đã ôn số đến 1 000, cộng trừ trong phạm vi 1 000, tìm thành phần chưa biết và học thêm bảng nhân chia 3 và 4.",
            "points": [
              "Bốn bảng đã có: nhân 2, nhân 3, nhân 4, nhân 5 và bốn bảng chia tương ứng.",
              "Số hạng chưa biết = tổng − số hạng đã biết.",
              "Số trừ = số bị trừ − hiệu."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "3 × 4 = 12    12 : 3 = 4\n4 × 6 = 24    24 : 4 = 6",
            "operation": {
              "left": 3,
              "sign": "×",
              "right": 4,
              "result": 12
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "3 × 4",
                  "12"
                ],
                [
                  "12 : 3",
                  "4"
                ],
                [
                  "4 × 6",
                  "24"
                ],
                [
                  "24 : 4",
                  "6"
                ]
              ],
              "label": "Luyện tập chung chủ đề 1"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 × 7 bằng bao nhiêu?",
            "options": [
              18,
              21,
              24,
              10
            ],
            "answer": 21,
            "mascotHint": "3 × 6 = 18, thêm 3 được 21."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "36 : 4 bằng bao nhiêu?",
            "options": [
              8,
              9,
              10,
              32
            ],
            "answer": 9,
            "mascotHint": "Vì 4 × 9 = 36 nên 36 : 4 = 9."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bé đã hoàn thành chủ đề 1.",
              "3 × 7 = 21; 36 : 4 = 9."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
