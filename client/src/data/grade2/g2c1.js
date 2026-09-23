export const g2c1 = {
  "id": "g2-c1",
  "name": "Chủ đề 1: Ôn tập và bổ sung",
  "description": "Ôn tập số đến 100, tia số và số liền trước - liền sau, thành phần của phép cộng phép trừ, hơn kém nhau bao nhiêu",
  "icon": "🔄",
  "color": "#4facfe",
  "totalLessons": 9,
  "lessons": [
    {
      "id": "g2-c1-l1",
      "title": "Bài 1: Ôn tập các số đến 100",
      "type": "learn",
      "description": "Nhận biết số có hai chữ số gồm hàng chục và hàng đơn vị",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Chào mừng bé lên Lớp 2! Cùng Rô-bốt ôn lại các số đến 100 nhé! 🚀"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Số có hai chữ số",
            "explanation": "Mỗi số có hai chữ số gồm HÀNG CHỤC và HÀNG ĐƠN VỊ. Chữ số bên trái chỉ chục, chữ số bên phải chỉ đơn vị.",
            "rule": "Số 47 gồm 4 chục và 7 đơn vị. Đọc là: bốn mươi bảy.",
            "points": [
              "4 chục = 40; thêm 7 đơn vị nữa được 47.",
              "Số 63 gồm 6 chục và 3 đơn vị.",
              "Chữ số 0 ở hàng đơn vị nghĩa là 0 đơn vị: 50 gồm 5 chục và 0 đơn vị."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "47  =  40  +  7\n4 chục  +  7 đơn vị",
            "placeValue": {
              "headers": [
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                4,
                7
              ],
              "label": "47 gồm 4 chục và 7 đơn vị — đọc là bốn mươi bảy"
            },
            "baseTen": {
              "tens": 4,
              "ones": 7
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số 63 gồm mấy chục và mấy đơn vị?",
            "options": [
              "6 chục và 3 đơn vị",
              "3 chục và 6 đơn vị",
              "63 chục",
              "6 chục và 0 đơn vị"
            ],
            "answer": "6 chục và 3 đơn vị",
            "mascotHint": "Chữ số 6 chỉ chục, chữ số 3 chỉ đơn vị."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số có hai chữ số gồm hàng chục và hàng đơn vị.",
              "47 = 40 + 7."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l2",
      "title": "Bài 2: So sánh các số có hai chữ số",
      "type": "learn",
      "description": "Ôn lại cách so sánh hai số có hai chữ số và dùng đúng dấu >, <, =",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "58 và 85, số nào lớn hơn nhỉ? Nhìn thì hơi giống nhau đấy! 🤔"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "So hàng chục trước",
            "explanation": "Khi so sánh hai số có hai chữ số, bé so HÀNG CHỤC trước. Hàng chục bằng nhau thì mới so hàng đơn vị.",
            "rule": "58 và 85: 5 chục bé hơn 8 chục, nên 58 < 85.",
            "points": [
              "Chục khác nhau thì xong ngay, không cần nhìn đơn vị.",
              "34 và 38: cùng 3 chục, so đơn vị 4 < 8 nên 34 < 38.",
              "Dấu: > là lớn hơn, < là bé hơn, = là bằng nhau."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "58  <  85\n5 chục < 8 chục",
            "comparison": {
              "left": 58,
              "sign": "<",
              "right": 85
            },
            "table": {
              "headers": [
                "Số",
                "Chục",
                "Đơn vị"
              ],
              "rows": [
                [
                  "58",
                  5,
                  8
                ],
                [
                  "85",
                  8,
                  5
                ]
              ],
              "label": "5 chục bé hơn 8 chục nên 58 < 85"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong hai số 72 và 27, số nào lớn hơn?",
            "options": [
              72,
              27,
              "Hai số bằng nhau"
            ],
            "answer": 72,
            "mascotHint": "7 chục lớn hơn 2 chục, nên 72 > 27."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "So hàng chục trước, hàng đơn vị sau.",
              "58 < 85 vì 5 chục bé hơn 8 chục."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l3",
      "title": "Bài 3: Tia số",
      "type": "learn",
      "description": "Nhận biết tia số và điền số còn thiếu trên tia số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Tia số giống như một con đường có ghi số ở từng cột mốc đấy! 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Tia số là gì?",
            "explanation": "Tia số là một đường thẳng bắt đầu từ số 0. Mỗi vạch trên tia số cách nhau đúng 1 đơn vị và mang một số.",
            "rule": "Đi sang phải thì số tăng dần: 0, 1, 2, 3, 4... Đi sang trái thì số giảm dần.",
            "points": [
              "Gốc của tia số là số 0.",
              "Hai vạch liền nhau hơn kém nhau 1 đơn vị.",
              "Số càng ở bên phải thì càng lớn."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "0 — 1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10",
            "numberLine": {
              "from": 0,
              "to": 10,
              "step": 1,
              "marks": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10
              ],
              "hops": [
                {
                  "from": 0,
                  "to": 10,
                  "label": "sang phải: tăng dần"
                }
              ],
              "label": "Tia số — đi sang phải số tăng, đi sang trái số giảm"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên tia số, số nào đứng ngay sau số 25?",
            "options": [
              24,
              26,
              35,
              30
            ],
            "answer": 26,
            "mascotHint": "Đi sang phải một vạch là cộng thêm 1: 25 + 1 = 26."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Tia số bắt đầu từ 0, mỗi vạch cách nhau 1 đơn vị.",
              "Sang phải thì tăng, sang trái thì giảm."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l4",
      "title": "Bài 4: Số liền trước, số liền sau",
      "type": "learn",
      "description": "Tìm số liền trước và số liền sau của một số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Số 69 có hai người hàng xóm thân thiết lắm. Bé đoán xem là số nào? 🏠"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Liền trước thì bớt 1, liền sau thì thêm 1",
            "explanation": "Số liền trước của một số là số bé hơn nó đúng 1 đơn vị. Số liền sau là số lớn hơn nó đúng 1 đơn vị.",
            "rule": "Số liền trước của 69 là 68 (69 − 1). Số liền sau của 69 là 70 (69 + 1).",
            "points": [
              "Trên tia số, số liền trước ở bên trái, số liền sau ở bên phải.",
              "Số liền trước của 40 là 39.",
              "Số liền sau của 99 là 100."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "68  —  69  —  70\nliền trước · chính nó · liền sau",
            "numberLine": {
              "from": 68,
              "to": 70,
              "step": 1,
              "marks": [
                68,
                69,
                70
              ],
              "label": "68 là liền trước · 69 là chính nó · 70 là liền sau"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số liền sau của 69 là số nào?",
            "options": [
              68,
              70,
              71,
              79
            ],
            "answer": 70,
            "mascotHint": "69 thêm 1 là 70!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số liền trước của 40 là số nào?",
            "options": [
              39,
              41,
              30,
              400
            ],
            "answer": 39,
            "mascotHint": "40 bớt 1 là 39."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Liền trước: bớt đi 1. Liền sau: thêm vào 1.",
              "Liền trước của 69 là 68, liền sau của 69 là 70."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l5",
      "title": "Bài 5: Thành phần của phép cộng",
      "type": "learn",
      "description": "Gọi tên số hạng và tổng trong phép cộng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Phép cộng có hai người bạn và một kết quả. Bé biết tên gọi của chúng chưa? ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khái Niệm",
            "title": "Số hạng – Số hạng – Tổng",
            "explanation": "Hai số được cộng với nhau gọi là SỐ HẠNG. Kết quả của phép cộng gọi là TỔNG.",
            "rule": "35 + 24 = 59: số 35 và số 24 là các số hạng; số 59 là tổng.",
            "points": [
              "Số hạng là những số đứng trước dấu bằng.",
              "Tổng là kết quả, đứng sau dấu bằng.",
              "Đổi chỗ hai số hạng thì tổng không đổi: 3 + 5 = 5 + 3 = 8."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "35  +  24  =  59\nsố hạng · số hạng · tổng",
            "operation": {
              "left": 35,
              "sign": "+",
              "right": 24,
              "result": 59
            },
            "table": {
              "headers": [
                "Số hạng",
                "Số hạng",
                "Tổng"
              ],
              "rows": [
                [
                  35,
                  24,
                  59
                ]
              ],
              "label": "Thành phần của phép cộng"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép cộng 35 + 24 = 59, số 59 gọi là gì?",
            "options": [
              "Tổng",
              "Số hạng",
              "Hiệu",
              "Số bị trừ"
            ],
            "answer": "Tổng",
            "mascotHint": "Kết quả của phép cộng là tổng."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số hạng + số hạng = tổng.",
              "Trong 35 + 24 = 59, số hạng là 35 và 24, tổng là 59."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l6",
      "title": "Bài 6: Thành phần của phép trừ",
      "type": "learn",
      "description": "Gọi tên số bị trừ, số trừ và hiệu",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Phép trừ cũng có tên gọi riêng cho từng số. Cùng học nhé! 🤔"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khái Niệm",
            "title": "Số bị trừ – Số trừ – Hiệu",
            "explanation": "Số bị lấy đi gọi là SỐ BỊ TRỪ. Số lấy đi gọi là SỐ TRỪ. Kết quả gọi là HIỆU.",
            "rule": "57 − 23 = 34: số 57 là số bị trừ, số 23 là số trừ, số 34 là hiệu.",
            "points": [
              "Số bị trừ luôn là số lớn nhất trong ba số.",
              "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.",
              "Hiệu cũng là tên gọi của cả phép tính: đây là hiệu của 57 và 23."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "57  −  23  =  34\nsố bị trừ · số trừ · hiệu",
            "operation": {
              "left": 57,
              "sign": "−",
              "right": 23,
              "result": 34
            },
            "table": {
              "headers": [
                "Số bị trừ",
                "Số trừ",
                "Hiệu"
              ],
              "rows": [
                [
                  57,
                  23,
                  34
                ]
              ],
              "label": "Thành phần của phép trừ"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong phép trừ 57 − 23 = 34, số 23 gọi là gì?",
            "options": [
              "Số trừ",
              "Số bị trừ",
              "Hiệu",
              "Tổng"
            ],
            "answer": "Số trừ",
            "mascotHint": "Số lấy đi là 23 — đó là số trừ."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm số bị trừ, biết số trừ là 20 và hiệu là 15.",
            "options": [
              5,
              35,
              40,
              30
            ],
            "answer": 35,
            "mascotHint": "Số bị trừ = hiệu + số trừ = 15 + 20 = 35."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Số bị trừ − số trừ = hiệu.",
              "Muốn tìm số bị trừ, lấy hiệu cộng với số trừ."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l7",
      "title": "Bài 7: Hơn, kém nhau bao nhiêu",
      "type": "learn",
      "description": "Giải bài toán so sánh hai số hơn kém nhau bao nhiêu",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Mai có 12 cái kẹo, Lan có 8 cái kẹo. Vậy Mai hơn Lan bao nhiêu cái nhỉ? 🍬",
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
            "badge": "Mẹo Nhớ",
            "title": "Lấy số lớn trừ số bé",
            "explanation": "Muốn biết hai số hơn kém nhau bao nhiêu, ta lấy SỐ LỚN trừ đi SỐ BÉ.",
            "rule": "Mai hơn Lan số kẹo là: 12 − 8 = 4 (cái kẹo).",
            "points": [
              "Hỏi 'hơn bao nhiêu' dùng phép trừ.",
              "Hỏi 'kém bao nhiêu' cũng dùng phép trừ.",
              "Lan kém Mai 4 cái kẹo — cùng một đáp án, khác cách hỏi."
            ],
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
          "type": "visual",
          "content": {
            "text": "Mai: 12 cái kẹo\nLan:  8 cái kẹo\nMai hơn Lan: 12 − 8 = 4 (cái kẹo)",
            "operation": {
              "left": 12,
              "sign": "−",
              "right": 8,
              "result": 4
            },
            "barModel": {
              "rows": [
                {
                  "label": "Mai",
                  "parts": 12
                },
                {
                  "label": "Lan",
                  "parts": 8
                }
              ],
              "braceLabel": "Mai hơn Lan 4 cái kẹo"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Mai có 12 cái kẹo, Lan có 8 cái kẹo. Mai hơn Lan bao nhiêu cái kẹo?",
            "options": [
              4,
              8,
              12,
              20
            ],
            "answer": 4,
            "mascotHint": "12 − 8 = 4 cái kẹo.",
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
          "type": "quiz",
          "content": {
            "question": "Băng giấy xanh dài 20 cm, băng giấy đỏ dài 17 cm. Băng giấy xanh dài hơn bao nhiêu xăng-ti-mét?",
            "options": [
              3,
              7,
              17,
              37
            ],
            "answer": 3,
            "barModel": {
              "rows": [
                {
                  "label": "Băng xanh",
                  "parts": 20
                },
                {
                  "label": "Băng đỏ",
                  "parts": 17
                }
              ],
              "unit": "cm",
              "note": "Băng xanh dài hơn: 20 − 17 = 3 cm"
            },
            "mascotHint": "20 − 17 = 3 cm."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Hơn kém nhau bao nhiêu thì lấy số lớn trừ số bé.",
              "12 − 8 = 4."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l8",
      "title": "Bài 8: Đặt tính cộng, trừ (không nhớ) trong phạm vi 100",
      "type": "learn",
      "description": "Đặt tính thẳng cột và tính cộng trừ không nhớ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Đặt tính sai cột là sai kết quả đấy! Bé chú ý cách đặt tính nhé 🔢"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Mẹo Nhớ",
            "title": "Đặt tính thẳng cột",
            "explanation": "Khi đặt tính, bé viết số hạng thứ hai ngay bên dưới số hạng thứ nhất sao cho HÀNG ĐƠN VỊ thẳng hàng đơn vị, HÀNG CHỤC thẳng hàng chục. Rồi tính từ phải sang trái.",
            "rule": "32 + 14: đơn vị 2 + 4 = 6, chục 3 + 1 = 4. Kết quả 46.",
            "points": [
              "Luôn tính từ hàng đơn vị trước.",
              "Không nhớ nghĩa là từng hàng cộng lại đều bé hơn 10.",
              "Trừ cũng đặt tính như vậy: 57 − 23, đơn vị 7 − 3 = 4, chục 5 − 2 = 3, được 34."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "  32        57\n+ 14      − 23\n  46        34",
            "operation": {
              "left": 32,
              "sign": "+",
              "right": 14,
              "result": 46
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "32 + 14",
                  "46"
                ],
                [
                  "57 − 23",
                  "34"
                ]
              ],
              "label": "Đặt tính rồi tính: cộng trừ từng hàng, bắt đầu từ hàng đơn vị"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "32 + 14 bằng bao nhiêu?",
            "options": [
              36,
              44,
              46,
              56
            ],
            "answer": 46,
            "mascotHint": "2 + 4 = 6, 3 + 1 = 4, nên 32 + 14 = 46."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "57 − 23 bằng bao nhiêu?",
            "options": [
              24,
              30,
              34,
              44
            ],
            "answer": 34,
            "mascotHint": "7 − 3 = 4, 5 − 2 = 3, nên 57 − 23 = 34."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Đặt tính thẳng cột, tính từ phải sang trái.",
              "12 + 14 = 26 không nhớ vì từng hàng đều bé hơn 10."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g2-c1-l9",
      "title": "Bài 9: Luyện tập chung chủ đề 1",
      "type": "learn",
      "description": "Ôn lại số đến 100, thành phần phép tính và cộng trừ không nhớ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Rô-bốt mở hộp câu đố! Bé sẵn sàng chưa nào? 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Những điều bé đã học",
            "explanation": "Chủ đề 1 giúp bé nhớ lại: số có hai chữ số, tia số, số liền trước liền sau, tên gọi các thành phần của phép cộng phép trừ.",
            "points": [
              "Số lớn nhất có hai chữ số là 99.",
              "Số liền sau của 99 là 100 — số có ba chữ số đầu tiên.",
              "So sánh hai số: so hàng chục trước."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "98 — 99 — 100\nliền trước · lớn nhất có 2 chữ số · số có 3 chữ số",
            "numberLine": {
              "from": 98,
              "to": 100,
              "step": 1,
              "marks": [
                98,
                99,
                100
              ],
              "label": "98 liền trước · 99 là số lớn nhất có hai chữ số · 100 là số có ba chữ số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số lớn nhất có hai chữ số là số nào?",
            "options": [
              90,
              98,
              99,
              100
            ],
            "answer": 99,
            "mascotHint": "Số lớn nhất có hai chữ số là 99. Số 100 đã có ba chữ số."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Băng giấy xanh dài 20 cm, băng giấy đỏ dài 17 cm. Băng giấy nào dài hơn và dài hơn bao nhiêu?",
            "options": [
              "Băng xanh, dài hơn 3 cm",
              "Băng đỏ, dài hơn 3 cm",
              "Hai băng dài bằng nhau",
              "Băng xanh, dài hơn 37 cm"
            ],
            "answer": "Băng xanh, dài hơn 3 cm",
            "barModel": {
              "rows": [
                {
                  "label": "Băng xanh",
                  "parts": 20
                },
                {
                  "label": "Băng đỏ",
                  "parts": 17
                }
              ],
              "unit": "cm",
              "note": "20 cm > 17 cm, và 20 − 17 = 3 cm"
            },
            "mascotHint": "20 cm > 17 cm, và 20 − 17 = 3 cm."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bé đã ôn xong số đến 100 và cộng trừ không nhớ trong phạm vi 100.",
              "Chuẩn bị sang chủ đề 2: cộng trừ trong phạm vi 20."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
