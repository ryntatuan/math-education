export const g4c4 = {
  "id": "g4-c4",
  "name": "Chương 4: Phân số, Bốn phép tính phân số & Hình thoi",
  "description": "Khái niệm phân số, rút gọn, quy đồng; cộng, trừ, nhân, chia phân số; tìm phân số của một số; hình thoi và diện tích hình thoi",
  "icon": "🍰",
  "color": "#8b5cf6",
  "totalLessons": 10,
  "lessons": [
    {
      "id": "g4-c4-l1",
      "title": "Bài 1: Khái niệm phân số & Phép chia số tự nhiên",
      "type": "learn",
      "description": "Tử số viết trên gạch ngang, mẫu số tự nhiên khác 0 viết dưới; thương phép chia a : b viết là a/b",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Chia cái bánh thành 4 phần bằng nhau, lấy 3 phần, ta được 3/4 cái bánh! 3 là tử số, 4 là mẫu số! Mẫu số luôn phải khác 0 nhé! 🎂"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cấu tạo phân số a/b: - Tử số a: là số tự nhiên viết trên gạch ngang (chỉ số phần lấy đi). - Mẫu số b: là số tự nhiên khác 0 viết dưới gạch ngang (chỉ số phần bằng nhau được chia ra). Thương của phép chia a : b (b khác 0) có thể viết thành phân số a/b.",
            "fractionBar": {
              "parts": 4,
              "shaded": 3,
              "label": "3/4 — tử số 3 là phần lấy đi, mẫu số 4 là số phần bằng nhau"
            },
            "table": {
              "headers": [
                "Thành phần",
                "Nghĩa"
              ],
              "rows": [
                [
                  "Tử số a",
                  "số phần lấy đi"
                ],
                [
                  "Mẫu số b",
                  "số phần bằng nhau được chia ra (b khác 0)"
                ]
              ],
              "label": "Thương của a : b cũng viết được thành phân số a/b"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Thương của phép chia 5 : 8 viết dưới dạng phân số là:",
            "options": [
              "5/8",
              "8/5",
              "5/3",
              "8/3"
            ],
            "answer": "5/8",
            "mascotHint": "Số bị chia viết ở tử số, số chia viết ở mẫu số, nên là 5/8!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Phân số nào có tử số bé hơn mẫu số thì:",
            "options": [
              "Bé hơn 1",
              "Lớn hơn 1",
              "Bằng 1",
              "Bằng 0"
            ],
            "answer": "Bé hơn 1",
            "mascotHint": "Tử số < Mẫu số, nên Phân số < 1. Tử số = Mẫu số, nên Phân số = 1. Tử số > Mẫu số, nên Phân số > 1!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Phân số gồm tử số và mẫu số (khác 0).",
              "Mọi phép chia số tự nhiên a : b đều viết được thành phân số a/b."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l2",
      "title": "Bài 2: Phân số bằng nhau, Rút gọn & Quy đồng mẫu số",
      "type": "learn",
      "description": "Nhân/chia cả tử và mẫu với cùng 1 số tự nhiên khác 0; đưa về phân số tối giản và quy đồng mẫu số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Tính chất cơ bản: Nếu nhân hoặc chia cả tử và mẫu của một phân số với cùng một số tự nhiên khác 0, ta được một phân số bằng phân số đã cho! 🔄"
          }
        },
        {
          "type": "concept",
          "content": {
            "fractionBar": {
              "rows": [
                {
                  "parts": 2,
                  "shaded": 1,
                  "label": "1/2"
                },
                {
                  "parts": 4,
                  "shaded": 2,
                  "label": "2/4"
                },
                {
                  "parts": 6,
                  "shaded": 3,
                  "label": "3/6"
                }
              ],
              "label": "1/2 = 2/4 = 3/6 — cùng một lượng bánh pizza"
            },
            "badge": "Khái Niệm Phân Số Bằng Nhau",
            "title": "Tính chất cơ bản của phân số",
            "explanation": "Nếu nhân hoặc chia cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.",
            "rule": "1/2 cái bánh pizza cũng chính bằng 2/4 chiếc bánh pizza đó!",
            "points": [
              "Rút gọn phân số: Chia cả tử và mẫu cho ước chung lớn hơn 1 (ví dụ: 6/8 = (6:2)/(8:2) = 3/4).",
              "Quy đồng mẫu số: Nhân tử và mẫu với thừa số phụ để đưa về cùng một mẫu số chung."
            ]
          }
        },
        {
          "type": "dialogue",
          "content": {
            "badge": "Giao Lưu Lớp Học",
            "title": "Tranh luận chia bánh: 1/2 và 2/4",
            "dialogueList": [
              {
                "character": "mai",
                "name": "Bạn Mai 👧",
                "text": "Tớ có 1/2 cái bánh pizza, bạn Nam có 2/4 cái bánh cùng loại. Nam bảo Nam có nhiều bánh hơn tớ vì 2/4 có số 2 và 4 to hơn!"
              },
              {
                "character": "robot",
                "name": "Bạn Rô-bốt 🤖",
                "text": "Đúng rồi! Số 2 lớn hơn 1, số 4 lớn hơn 2 nên 2/4 cái bánh chắc chắn nhiều hơn 1/2 cái bánh chứ!"
              }
            ],
            "question": "Bạn Rô-bốt nói đúng hay sai?",
            "options": [
              "Đúng rồi 👍",
              "Sai rồi 👎"
            ],
            "correctAnswer": "Sai rồi 👎",
            "explanation": "Bạn Rô-bốt nhầm rồi! Khi một chiếc bánh chia 2 phần lấy 1 phần (1/2), thì diện tích bánh đúng bằng khi chia 4 phần lấy 2 phần (2/4). Vì vậy 1/2 = 2/4, hai bạn có phần bánh bằng nhau!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Rút gọn phân số 15/25 về tối giản ta được:",
            "options": [
              "3/5",
              "5/3",
              "1/5",
              "3/10"
            ],
            "answer": "3/5",
            "mascotHint": "Cùng chia cả tử và mẫu cho 5: 15:5 = 3; 25:5 = 5, nên là 3/5!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Quy đồng mẫu số hai phân số 2/3 và 3/4 với mẫu số chung 12 được:",
            "options": [
              "8/12 và 9/12",
              "6/12 và 9/12",
              "8/12 và 6/12",
              "5/12 và 7/12"
            ],
            "answer": "8/12 và 9/12",
            "mascotHint": "2/3 = (2×4)/(3×4) = 8/12; 3/4 = (3×3)/(4×3) = 9/12!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Nhân hoặc chia cả tử và mẫu cho cùng số khác 0 được phân số bằng nó.",
              "Phân số tối giản không thể rút gọn được nữa."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l3",
      "title": "Bài 3: So sánh phân số",
      "type": "learn",
      "description": "So sánh hai phân số cùng mẫu số và khác mẫu số (quy đồng mẫu số để so sánh)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cùng mẫu số: Phân số nào có tử số lớn hơn thì lớn hơn! Khác mẫu số: Ta chỉ cần quy đồng mẫu số rồi so sánh tử số! ⚖️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Cùng mẫu: 5/7 > 3/7 (vì 5 > 3) - Khác mẫu: So sánh 2/3 và 3/4, nên Quy đồng: 2/3 = 8/12; 3/4 = 9/12. Vì 8/12 < 9/12 nên 2/3 < 3/4.",
            "fractionBar": {
              "rows": [
                {
                  "parts": 7,
                  "shaded": 5,
                  "label": "5/7"
                },
                {
                  "parts": 7,
                  "shaded": 3,
                  "label": "3/7"
                },
                {
                  "parts": 12,
                  "shaded": 8,
                  "label": "8/12 (tức 2/3)"
                },
                {
                  "parts": 12,
                  "shaded": 9,
                  "label": "9/12 (tức 3/4)"
                }
              ],
              "label": "Cùng mẫu thì so tử số · khác mẫu thì quy đồng rồi so"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền dấu thích hợp: 4/9 ... 7/9",
            "options": [
              "<",
              ">",
              "="
            ],
            "answer": "<",
            "mascotHint": "Cùng mẫu số 9, vì tử số 4 < 7 nên 4/9 < 7/9!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Quy tắc so sánh phân số:",
            "points": [
              "Cùng mẫu số: So sánh tử số.",
              "Khác mẫu số: Quy đồng mẫu số rồi so sánh."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l4",
      "title": "Bài 4: Phép cộng và Phép trừ phân số",
      "type": "learn",
      "description": "Cộng trừ phân số cùng mẫu (cộng trừ tử, giữ nguyên mẫu); cộng trừ phân số khác mẫu (quy đồng trước)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Quy tắc cộng trừ phân số cùng mẫu: Cộng hoặc trừ các tử số với nhau và giữ nguyên mẫu số! Nếu khác mẫu: Quy đồng rồi tính nhé! ➕➖"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cùng mẫu: 2/5 + 1/5 = (2+1)/5 = 3/5 Khác mẫu: 1/2 + 1/3 = 3/6 + 2/6 = 5/6 Phép trừ: 5/7 - 2/7 = (5-2)/7 = 3/7",
            "fractionBar": {
              "rows": [
                {
                  "parts": 5,
                  "shaded": 3,
                  "label": "2/5 + 1/5 = 3/5"
                },
                {
                  "parts": 6,
                  "shaded": 5,
                  "label": "1/2 + 1/3 = 5/6"
                },
                {
                  "parts": 7,
                  "shaded": 3,
                  "label": "5/7 − 2/7 = 3/7"
                }
              ],
              "label": "Cộng trừ phân số — khác mẫu thì quy đồng mẫu số trước"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 3/8 + 2/8 = ?",
            "options": [
              "5/8",
              "5/16",
              "1/8",
              "6/8"
            ],
            "answer": "5/8",
            "mascotHint": "Cộng tử số: 3 + 2 = 5, giữ nguyên mẫu 8, nên là 5/8!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 1/2 - 1/4 = ?",
            "options": [
              "1/4",
              "0",
              "1/2",
              "2/4"
            ],
            "answer": "1/4",
            "mascotHint": "1/2 = 2/4. 2/4 - 1/4 = 1/4!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Cùng mẫu: Cộng/trừ tử, giữ nguyên mẫu.",
              "Khác mẫu: Quy đồng mẫu số trước khi cộng/trừ."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l5",
      "title": "Bài 5: Phép nhân phân số & Tìm phân số của một số",
      "type": "learn",
      "description": "Tử nhân tử, mẫu nhân mẫu; Muốn tìm phân số của một số ta lấy số đó nhân với phân số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Phép nhân phân số cực kỳ đơn giản: Lấy tử số nhân với tử số, mẫu số nhân với mẫu số! Để tìm 2/3 của 12 ta lấy 12 × 2/3 = 8! ✖️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức nhân: (a/b) × (c/d) = (a × c) / (b × d) Ví dụ: 2/3 × 4/5 = (2×4) / (3×5) = 8/15 Tìm 3/4 của 20: 20 × 3/4 = (20×3)/4 = 60/4 = 15.",
            "fractionBar": {
              "rows": [
                {
                  "parts": 15,
                  "shaded": 8,
                  "label": "2/3 × 4/5 = 8/15"
                },
                {
                  "parts": 4,
                  "shaded": 3,
                  "label": "3/4 của 20 = 15"
                }
              ],
              "label": "Nhân tử với tử, mẫu với mẫu"
            },
            "operation": {
              "left": 20,
              "sign": "×",
              "right": 3,
              "result": 60
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 3/5 × 2/7 = ?",
            "options": [
              "6/35",
              "5/12",
              "6/12",
              "5/35"
            ],
            "answer": "6/35",
            "mascotHint": "Tử = 3 × 2 = 6; Mẫu = 5 × 7 = 35, nên là 6/35!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm 2/5 của 30 quả cam:",
            "options": [
              12,
              15,
              10,
              18
            ],
            "answer": 12,
            "mascotHint": "30 × 2/5 = (30 × 2) : 5 = 60 : 5 = 12 quả cam!",
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
            "title": "Công thức ghi nhớ:",
            "points": [
              "Nhân phân số: Tử nhân tử, mẫu nhân mẫu.",
              "Tìm phân số của một số: Lấy số đó nhân với phân số."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l6",
      "title": "Bài 6: Phép chia phân số",
      "type": "learn",
      "description": "Lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Phân số đảo ngược của 3/5 là 5/3 (đổi chỗ tử và mẫu)! Muốn chia hai phân số: Lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược! ➗"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức chia: (a/b) : (c/d) = (a/b) × (d/c) = (a × d) / (b × c) Ví dụ: 1/2 : 1/4 = 1/2 × 4/1 = 4/2 = 2",
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Đảo ngược",
                  "1/2 : 1/4 = 1/2 × 4/1"
                ],
                [
                  "Nhân",
                  "= (1 × 4) / (2 × 1) = 4/2"
                ],
                [
                  "Kết quả",
                  "= 2"
                ]
              ],
              "label": "Chia phân số = nhân với phân số đảo ngược"
            },
            "fractionCircle": {
              "parts": 4,
              "shaded": 2,
              "label": "1/2 gồm 2 phần của 1/4"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 2/3 : 5/7 = ?",
            "options": [
              "14/15",
              "10/21",
              "15/14",
              "7/10"
            ],
            "answer": "14/15",
            "mascotHint": "2/3 × 7/5 = (2×7) / (3×5) = 14/15!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Chia phân số = Nhân với phân số đảo ngược.",
              "(a/b) : (c/d) = (a × d) / (b × c)."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l7",
      "title": "Bài 7: Hình thoi & Diện tích hình thoi",
      "type": "learn",
      "description": "Hình thoi có 4 cạnh bằng nhau, 2 đường chéo vuông góc; Diện tích S = (m × n) : 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Hình thoi có 4 cạnh bằng nhau! Hai đường chéo vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường! 🔷",
            "planeShape": {
              "kind": "rhombus",
              "labels": [
                "cạnh",
                "cạnh"
              ],
              "formula": "4 cạnh bằng nhau · hai đường chéo vuông góc"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức diện tích hình thoi: S = (m × n) : 2 Trong đó: m và n là độ dài của hai đường chéo (cùng đơn vị đo).",
            "planeShape": {
              "kind": "rhombus",
              "labels": [
                "chéo m",
                "chéo n"
              ],
              "formula": "S = (m × n) : 2 (m và n cùng đơn vị đo)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình thoi có độ dài hai đường chéo là 8 cm và 6 cm. Diện tích hình thoi đó là:",
            "options": [
              "24 cm²",
              "48 cm²",
              "14 cm²",
              "28 cm²"
            ],
            "answer": "24 cm²",
            "mascotHint": "S = (8 × 6) : 2 = 48 : 2 = 24 cm²!",
            "planeShapes": [
              {
                "kind": "rhombus",
                "color": "#8b5cf6"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ hình thoi:",
            "points": [
              "Hình thoi có 4 cạnh bằng nhau.",
              "Diện tích bằng tích độ dài hai đường chéo chia cho 2: S = (m × n) : 2."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l8",
      "title": "Bài 8: Luyện tập rút gọn và quy đồng mẫu số",
      "type": "learn",
      "description": "Luyện hai kỹ năng nền tảng của phân số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Rút gọn và quy đồng là hai kỹ năng nền tảng của mọi phép tính phân số! ✂️"
          }
        },
        {
          "type": "concept",
          "content": {
            "fractionBar": {
              "rows": [
                {
                  "parts": 12,
                  "shaded": 8,
                  "label": "8/12"
                },
                {
                  "parts": 3,
                  "shaded": 2,
                  "label": "rút gọn = 2/3"
                }
              ],
              "label": "Rút gọn trước khi tính để số nhỏ, dễ tính hơn"
            },
            "badge": "Luyện Rút Gọn - Quy Đồng",
            "title": "Hai kỹ năng, hai mục đích",
            "points": [
              "Rút gọn: chia cả tử và mẫu cho cùng một số lớn nhất có thể. Ví dụ: 18/24 = 3/4.",
              "Quy đồng: đưa hai phân số về cùng mẫu số. Ví dụ: 2/3 và 1/4 ⇒ 8/12 và 3/12.",
              "Mẫu số chung bé nhất là số bé nhất chia hết cho cả hai mẫu."
            ],
            "rule": "Rút gọn trước khi tính để số nhỏ, dễ tính hơn."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Rút gọn phân số 18/24 về phân số tối giản:",
            "options": [
              "3/4",
              "2/3",
              "9/12",
              "6/8"
            ],
            "answer": "3/4",
            "mascotHint": "Chia cả tử và mẫu cho 6: 18 : 6 = 3 và 24 : 6 = 4 ⇒ 3/4!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Quy đồng mẫu số hai phân số 2/3 và 1/4 (chọn mẫu số chung là 12):",
            "options": [
              "8/12 và 3/12",
              "2/12 và 1/12",
              "8/12 và 4/12",
              "6/12 và 3/12"
            ],
            "answer": "8/12 và 3/12",
            "mascotHint": "2/3 = 8/12 (nhân cả tử và mẫu với 4); 1/4 = 3/12 (nhân với 3)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Rút gọn là chia, quy đồng là nhân",
              "Chọn mẫu số chung bé nhất để tính cho gọn"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l9",
      "title": "Bài 9: Luyện tập bốn phép tính với phân số",
      "type": "learn",
      "description": "Luyện cộng, trừ, nhân, chia phân số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cộng, trừ, nhân, chia phân số — cùng luyện thành thạo cả bốn phép! ⚡"
          }
        },
        {
          "type": "concept",
          "content": {
            "fractionBar": {
              "rows": [
                {
                  "parts": 6,
                  "shaded": 5,
                  "label": "1/2 + 1/3 = 5/6"
                },
                {
                  "parts": 6,
                  "shaded": 1,
                  "label": "1/2 − 1/3 = 1/6"
                },
                {
                  "parts": 6,
                  "shaded": 3,
                  "label": "1/2 × 1/3 = 1/6"
                },
                {
                  "parts": 6,
                  "shaded": 3,
                  "label": "1/2 : 1/3 = 3/2"
                }
              ],
              "label": "Bốn phép tính với phân số"
            },
            "badge": "Luyện Bốn Phép Tính",
            "title": "Bốn quy tắc cốt lõi",
            "points": [
              "Cộng, trừ: quy đồng mẫu số rồi cộng hoặc trừ tử số.",
              "Nhân: tử nhân tử, mẫu nhân mẫu.",
              "Chia: nhân với phân số đảo ngược.",
              "Ví dụ: 3/8 + 1/4 = 3/8 + 2/8 = 5/8."
            ],
            "rule": "Nhớ rút gọn kết quả nếu có thể."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 3/8 + 1/4 = ?",
            "options": [
              "5/8",
              "4/12",
              "5/12",
              "4/8"
            ],
            "answer": "5/8",
            "mascotHint": "1/4 = 2/8; 3/8 + 2/8 = 5/8!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 4/9 × 3/8 = ?",
            "options": [
              "1/6",
              "7/17",
              "1/3",
              "12/17"
            ],
            "answer": "1/6",
            "mascotHint": "4 × 3 = 12; 9 × 8 = 72 ⇒ 12/72; rút gọn cho 12 được 1/6!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Cộng trừ: quy đồng · Nhân: tử × tử, mẫu × mẫu · Chia: đảo ngược rồi nhân"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c4-l10",
      "title": "Bài 10: Luyện tập chung chương 4",
      "type": "learn",
      "description": "Tổng hợp phân số và hình thoi",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "proud",
            "text": "Tổng kết chương 4: phân số, bốn phép tính phân số và hình thoi! 🍰",
            "planeShapes": [
              {
                "kind": "rhombus",
                "color": "#8b5cf6"
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "planeShape": {
              "kind": "rhombus",
              "labels": [
                "chéo m",
                "chéo n"
              ],
              "formula": "S = (m × n) : 2"
            },
            "fractionBar": {
              "rows": [
                {
                  "parts": 4,
                  "shaded": 2,
                  "label": "2/4"
                },
                {
                  "parts": 2,
                  "shaded": 1,
                  "label": "rút gọn = 1/2"
                }
              ],
              "label": "Luyện tập chung chương 4"
            },
            "badge": "Ôn Tập Chương 4",
            "title": "Bốn mảng kiến thức",
            "points": [
              "Khái niệm phân số và phép chia số tự nhiên.",
              "Rút gọn, quy đồng, so sánh phân số.",
              "Cộng trừ nhân chia phân số và tìm phân số của một số.",
              "Hình thoi: diện tích S = (m × n) : 2."
            ],
            "rule": "Kiểm tra lại kết quả và rút gọn phân số ở cuối bài."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm 3/5 của 40 kg:",
            "options": [
              24,
              25,
              30,
              15
            ],
            "answer": 24,
            "mascotHint": "40 : 5 = 8; 8 × 3 = 24 kg!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình thoi có hai đường chéo dài 10 cm và 8 cm. Diện tích hình thoi là bao nhiêu?",
            "options": [
              "40 cm²",
              "80 cm²",
              "18 cm²",
              "36 cm²"
            ],
            "answer": "40 cm²",
            "mascotHint": "S = (10 × 8) : 2 = 80 : 2 = 40 cm²!",
            "planeShapes": [
              {
                "kind": "rhombus",
                "color": "#8b5cf6"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Chúc mừng bé:",
            "points": [
              "Bé đã hoàn thành chương 4: Phân số và Hình thoi!"
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
