export const g4c2 = {
  "id": "g4-c2",
  "name": "Chương 2: Bốn phép tính số tự nhiên & Hình học",
  "description": "Cộng, trừ số nhiều chữ số; tính chất phép tính; toán Tổng - Hiệu; góc nhọn, tù, bẹt; vuông góc, song song; nhân chia số nhiều chữ số",
  "icon": "🧮",
  "color": "#10b981",
  "totalLessons": 13,
  "lessons": [
    {
      "id": "g4-c2-l1",
      "title": "Bài 1: Phép cộng và Phép trừ số tự nhiên",
      "type": "learn",
      "description": "Đặt tính rồi tính cộng, trừ các số có nhiều chữ số (có nhớ)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Quy tắc đặt tính: Các chữ số ở cùng một hàng phải đặt thẳng cột với nhau, cộng hoặc trừ lần lượt từ phải sang trái! ➕➖"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ cộng: 483 526 + 254 138 = 737 664 Ví dụ trừ: 865 240 - 328 175 = 537 065 Chú ý: Nhớ cộng thêm số nhớ vào hàng tiếp theo bên trái!",
            "operation": {
              "left": 483526,
              "sign": "+",
              "right": 254138,
              "result": 737664
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "483 526 + 254 138",
                  "737 664"
                ],
                [
                  "865 240 − 328 175",
                  "537 065"
                ]
              ],
              "label": "Chú ý cộng thêm số nhớ vào hàng tiếp theo bên trái"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi cộng: 35 480 + 24 150",
            "cotTinh": {
              "left": 35480,
              "right": 24150,
              "sign": "+",
              "remember": true
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi trừ: 70 000 − 15 000",
            "cotTinh": {
              "left": 70000,
              "right": 15000,
              "sign": "−"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 35 480 + 24 150 = ?",
            "options": [
              "59 630",
              "59 530",
              "58 630",
              "60 630"
            ],
            "answer": "59 630",
            "mascotHint": "0+0=0, 8+5=13 viết 3 nhớ 1, 4+1+1=6, 5+4=9, 3+2=5, nên là 59 630."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 70 000 - 15 000 = ?",
            "options": [
              "55 000",
              "65 000",
              "45 000",
              "50 000"
            ],
            "answer": "55 000",
            "mascotHint": "70 nghìn - 15 nghìn = 55 nghìn (55 000)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Đặt tính thẳng cột theo hàng.",
              "Cộng/trừ từ phải sang trái.",
              "Nhớ đúng hàng khi có nhớ."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l2",
      "title": "Bài 2: Biểu thức có chứa hai chữ, ba chữ",
      "type": "learn",
      "description": "Biểu thức dạng a + b, a - b + c; tính giá trị biểu thức với các số cụ thể",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Nếu có hai chữ ta có biểu thức a + b. Nếu có ba chữ ta có a + b + c! Thay từng chữ bằng số tương ứng rồi tính nhé! 🔤"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Nếu a = 10, b = 5, c = 2 thì giá trị biểu thức a + b × c là: 10 + 5 × 2 = 10 + 10 = 20 (nhớ thực hiện nhân chia trước, cộng trừ sau!).",
            "operation": {
              "left": 5,
              "sign": "×",
              "right": 2,
              "result": 10
            },
            "table": {
              "headers": [
                "Biểu thức",
                "Thay số",
                "Giá trị"
              ],
              "rows": [
                [
                  "a + b × c",
                  "10 + 5 × 2 = 10 + 10",
                  "20"
                ]
              ],
              "label": "Nhân chia trước, cộng trừ sau"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Với m = 40 và n = 15, tính giá trị của m - n:",
            "options": [
              25,
              55,
              35,
              20
            ],
            "answer": 25,
            "mascotHint": "40 - 15 = 25!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Thay số vào đúng vị trí từng chữ cái.",
              "Thực hiện phép tính theo đúng thứ tự ưu tiên."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l3",
      "title": "Bài 3: Tính chất giao hoán và kết hợp của phép cộng",
      "type": "learn",
      "description": "a + b = b + a và (a + b) + c = a + (b + c); vận dụng tính nhanh, tính thuận tiện",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi: a + b = b + a! Ta có thể nhóm các số tạo thành số tròn chục, tròn trăm để tính siêu nhanh! ⚡"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Tính thuận tiện: 127 + 389 + 73 = (127 + 73) + 389 = 200 + 389 = 589",
            "operation": {
              "left": 200,
              "sign": "+",
              "right": 389,
              "result": 589
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Đổi chỗ",
                  "127 + 389 + 73 = (127 + 73) + 389"
                ],
                [
                  "Tính",
                  "200 + 389 = 589"
                ]
              ],
              "label": "Dùng tính chất giao hoán và kết hợp để tính thuận tiện"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính nhanh: 165 + 298 + 35",
            "options": [
              498,
              500,
              488,
              510
            ],
            "answer": 498,
            "mascotHint": "Nhóm (165 + 35) + 298 = 200 + 298 = 498!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Tính chất vàng của phép cộng:",
            "points": [
              "Giao hoán: a + b = b + a",
              "Kết hợp: (a + b) + c = a + (b + c)"
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l4",
      "title": "Bài 4: Tìm hai số khi biết Tổng và Hiệu của hai số đó",
      "type": "learn",
      "description": "Bài toán kinh điển: Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng - Hiệu) : 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Đây là một trong những dạng toán quan trọng nhất của lớp 4! Cùng Robot học thuộc hai công thức kỳ diệu nhé! 🏆"
          }
        },
        {
          type: "visual",
          content: {
            "text": "Công thức: - Số lớn = (Tổng + Hiệu) : 2 - Số bé = (Tổng - Hiệu) : 2 (Hoặc: Số bé = Số lớn - Hiệu; Số lớn = Tổng - Số bé)",
            "barModel": {
              "rows": [
                {
                  "label": "Số lớn",
                  "parts": 8
                },
                {
                  "label": "Số bé",
                  "parts": 5
                }
              ],
              "braceLabel": "Tổng 13 · Hiệu 3"
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "Tìm hai số khi biết Tổng và Hiệu",
            "table": {
              "headers": [
                "Cần tìm",
                "Công thức"
              ],
              "rows": [
                [
                  "Số lớn",
                  "(Tổng + Hiệu) : 2"
                ],
                [
                  "Số bé",
                  "(Tổng − Hiệu) : 2"
                ]
              ],
              "label": "Tìm hai số khi biết Tổng và Hiệu"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 50, hiệu hai số là 10. Tìm số lớn:",
            "options": [
              30,
              20,
              25,
              35
            ],
            "answer": 30,
            "mascotHint": "Số lớn = (50 + 10) : 2 = 60 : 2 = 30!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hai bạn có tổng cộng 36 viên bi, An nhiều hơn Bình 6 viên. Hỏi Bình có bao nhiêu viên bi?",
            "options": [
              15,
              21,
              18,
              12
            ],
            "answer": 15,
            "mascotHint": "Bình có ít hơn nên Bình là số bé = (36 - 6) : 2 = 30 : 2 = 15 viên!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ công thức:",
            "points": [
              "Số lớn = (Tổng + Hiệu) : 2",
              "Số bé = (Tổng - Hiệu) : 2"
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l5",
      "title": "Bài 5: Góc nhọn, góc tù, góc bẹt",
      "type": "learn",
      "description": "Nhận biết và so sánh góc vuông, góc nhọn, góc tù, góc bẹt bằng ê-ke",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Dùng ê-ke để làm chuẩn: Góc vuông bằng góc ê-ke (90°). Góc nhọn bé hơn góc vuông. Góc tù lớn hơn góc vuông. Góc bẹt bằng 2 góc vuông! 📐"
          }
        },
        {
          type: "visual",
          content: {
            "text": "Góc nhọn đỉnh O, hai cạnh OA và OB — bé hơn góc vuông.",
            "angle": {
              "kind": "acute",
              "degrees": 45,
              "vertexLetter": "O",
              "armLetters": [
                "B",
                "A"
              ],
              "label": "Góc nhọn — bé hơn góc vuông"
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "Góc nhọn, góc tù, góc bẹt",
            "table": {
              "headers": [
                "Loại góc",
                "Đặc điểm"
              ],
              "rows": [
                [
                  "Góc nhọn",
                  "bé hơn góc vuông (90°)"
                ],
                [
                  "Góc vuông",
                  "bằng 90°"
                ],
                [
                  "Góc tù",
                  "lớn hơn góc vuông"
                ],
                [
                  "Góc bẹt",
                  "bằng hai góc vuông (180°)"
                ]
              ],
              "label": "Góc nhọn, góc tù, góc bẹt"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Góc nào bé hơn góc vuông?",
            "options": [
              "Góc nhọn",
              "Góc tù",
              "Góc bẹt",
              "Góc vuông"
            ],
            "answer": "Góc nhọn",
            "mascotHint": "Góc nhọn luôn bé hơn góc vuông!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Góc bẹt bằng mấy góc vuông?",
            "options": [
              2,
              1,
              3,
              4
            ],
            "answer": 2,
            "mascotHint": "Góc bẹt có số đo bằng 2 góc vuông (180°)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "So sánh các loại góc:",
            "points": [
              "Góc nhọn < Góc vuông < Góc tù < Góc bẹt."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l6",
      "title": "Bài 6: Hai đường thẳng vuông góc & Song song",
      "type": "learn",
      "description": "Nhận biết và vẽ hai đường thẳng vuông góc, hai đường thẳng song song",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Hai đường thẳng cắt nhau tạo thành 4 góc vuông gọi là hai đường thẳng vuông góc! Hai đường thẳng không bao giờ cắt nhau gọi là hai đường thẳng song song (như hai thanh đường ray tàu hoả)! 🛤️",
            "angle": {
              "kind": "right",
              "degrees": 90,
              "label": "Hai đường thẳng vuông góc tạo thành 4 góc vuông"
            }
          }
        },
        {
          type: "visual",
          content: {
            "text": "- Vuông góc: Cắt nhau tạo góc 90° (ký hiệu ⊥). - Song song: Cách đều nhau và không bao giờ cắt nhau dù kéo dài mãi.",
            "angle": {
              "kind": "right",
              "degrees": 90,
              "label": "Hai đường thẳng vuông góc tạo thành góc 90° (kí hiệu ⊥)"
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "Hai đường thẳng vuông góc & song song",
            "table": {
              "headers": [
                "Quan hệ",
                "Đặc điểm"
              ],
              "rows": [
                [
                  "Vuông góc",
                  "cắt nhau tạo góc 90°"
                ],
                [
                  "Song song",
                  "cách đều nhau, không bao giờ cắt nhau"
                ]
              ],
              "label": "Hai đường thẳng vuông góc & song song"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hai cạnh đối diện của một hình chữ nhật thì như thế nào với nhau?",
            "options": [
              "Song song với nhau",
              "Vuông góc với nhau",
              "Cắt nhau",
              "Trùng nhau"
            ],
            "answer": "Song song với nhau",
            "mascotHint": "Hai cạnh đối diện của hình chữ nhật luôn song song và bằng nhau!",
            "planeShapes": [
              {
                "kind": "rectangle",
                "color": "#10b981"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Hai đường thẳng vuông góc cắt nhau tạo thành 4 góc vuông.",
              "Hai đường thẳng song song không bao giờ có điểm chung."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l7",
      "title": "Bài 7: Nhân với số có một chữ số & Tính chất phép nhân",
      "type": "learn",
      "description": "Đặt tính nhân; tính chất giao hoán (a × b = b × a) và kết hợp ((a × b) × c = a × (b × c))",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Nhân lần lượt từ phải sang trái! Tính chất giao hoán và kết hợp giúp ta tính nhanh: ví dụ 25 × 7 × 4 = (25 × 4) × 7 = 100 × 7 = 700! 💡"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính: 142 315 × 3 = 426 945 Tính nhanh: (a × b) × c = a × (b × c)",
            "operation": {
              "left": 142315,
              "sign": "×",
              "right": 3,
              "result": 426945
            },
            "table": {
              "headers": [
                "Tính chất",
                "Viết"
              ],
              "rows": [
                [
                  "Giao hoán",
                  "a × b = b × a"
                ],
                [
                  "Kết hợp",
                  "(a × b) × c = a × (b × c)"
                ]
              ],
              "label": "Nhân với số có một chữ số"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi nhân: 1 423 × 3",
            "cotTinh": {
              "left": 1423,
              "right": 3,
              "sign": "×",
              "remember": true
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính nhanh: 5 × 39 × 2 = ?",
            "options": [
              390,
              380,
              400,
              395
            ],
            "answer": 390,
            "mascotHint": "(5 × 2) × 39 = 10 × 39 = 390!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "a × b = b × a",
              "(a × b) × c = a × (b × c)",
              "Các cặp số tròn trăm: 2 × 5 = 10, 4 × 25 = 100, 8 × 125 = 1000."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l8",
      "title": "Bài 8: Nhân với 10, 100, 1000... & Chia cho 10, 100, 1000...",
      "type": "learn",
      "description": "Quy tắc thêm hoặc bớt các chữ số 0 ở tận cùng của số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Muốn nhân một số với 10, 100, 1000... ta chỉ việc viết thêm một, hai, ba... chữ số 0 vào bên phải số đó! Khi chia thì bớt đi! 🚀"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- 35 × 10 = 350 - 35 × 100 = 3 500 - 4 800 : 100 = 48 - 70 000 : 1 000 = 70",
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "35 × 10",
                  "350"
                ],
                [
                  "35 × 100",
                  "3 500"
                ],
                [
                  "4 800 : 100",
                  "48"
                ],
                [
                  "70 000 : 1 000",
                  "70"
                ]
              ],
              "label": "Nhân với 10, 100, 1 000… chỉ việc thêm chữ số 0; chia thì bớt chữ số 0"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 420 × 100 = ?",
            "options": [
              "42 000",
              "4 200",
              "420 000",
              "42"
            ],
            "answer": "42 000",
            "mascotHint": "Viết thêm hai chữ số 0 vào sau 420 được 42 000!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 65 000 : 100 = ?",
            "options": [
              650,
              65,
              6500,
              65000
            ],
            "answer": 650,
            "mascotHint": "Bớt đi 2 chữ số 0 ở tận cùng: 65 000 : 100 = 650!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Quy tắc nhẩm:",
            "points": [
              "Nhân với 10, 100, 1000: thêm 1, 2, 3 chữ số 0.",
              "Chia cho 10, 100, 1000: bớt 1, 2, 3 chữ số 0."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l9",
      "title": "Bài 9: Đề-xi-mét vuông (dm²) & Mét vuông (m²)",
      "type": "learn",
      "description": "Làm quen đơn vị đo diện tích dm² và m²; mối quan hệ: 1 m² = 100 dm² = 10 000 cm²",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Đề-xi-mét vuông (dm²) là diện tích của hình vuông có cạnh dài 1 dm. Mét vuông (m²) là diện tích hình vuông có cạnh dài 1 m! 🟩",
            "planeShapes": [
              {
                "kind": "square",
                "color": "#3b82f6"
              }
            ]
          }
        },
        {
          type: "visual",
          content: {
            "text": "Mối quan hệ diện tích: 1 m² = 100 dm² 1 dm² = 100 cm² 1 m² = 10 000 cm² Mỗi đơn vị diện tích gấp 100 lần đơn vị bé hơn liền kề!",
            "planeShape": {
              "kind": "square",
              "labels": [
                "1 dm"
              ],
              "formula": "1 dm² là diện tích hình vuông cạnh 1 dm"
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "Mỗi đơn vị diện tích gấp 100 lần đơn vị bé hơn liền kề",
            "table": {
              "headers": [
                "Đổi",
                "Bằng"
              ],
              "rows": [
                [
                  "1 m²",
                  "100 dm²"
                ],
                [
                  "1 dm²",
                  "100 cm²"
                ],
                [
                  "1 m²",
                  "10 000 cm²"
                ]
              ],
              "label": "Mỗi đơn vị diện tích gấp 100 lần đơn vị bé hơn liền kề"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "4 m² bằng bao nhiêu đề-xi-mét vuông?",
            "options": [
              400,
              40,
              4000,
              40000
            ],
            "answer": 400,
            "mascotHint": "1 m² = 100 dm² nên 4 m² = 400 dm²!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đổi: 2 m² 50 dm² = ... dm²",
            "options": [
              250,
              205,
              2500,
              2050
            ],
            "answer": 250,
            "mascotHint": "2 m² = 200 dm². 200 + 50 = 250 dm²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ bảng đo diện tích:",
            "points": [
              "1 m² = 100 dm²",
              "1 dm² = 100 cm²",
              "Hai đơn vị đo diện tích liền kề hơn kém nhau 100 lần."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l10",
      "title": "Bài 10: Nhân một số với một tổng, một hiệu",
      "type": "learn",
      "description": "a × (b + c) = a × b + a × c và a × (b - c) = a × b - a × c",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Muốn nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng, rồi cộng các kết quả lại với nhau! 🎯"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức: - a × (b + c) = a × b + a × c - a × (b - c) = a × b - a × c Ví dụ tính nhanh: 35 × 11 = 35 × (10 + 1) = 350 + 35 = 385",
            "operation": {
              "left": 35,
              "sign": "×",
              "right": 11,
              "result": 385
            },
            "table": {
              "headers": [
                "Công thức",
                "Ví dụ"
              ],
              "rows": [
                [
                  "a × (b + c) = a × b + a × c",
                  "35 × 11 = 350 + 35 = 385"
                ],
                [
                  "a × (b − c) = a × b − a × c",
                  "35 × 9 = 350 − 35 = 315"
                ]
              ],
              "label": "Nhân một số với một tổng, một hiệu"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính thuận tiện: 24 × 7 + 24 × 3 = ?",
            "options": [
              240,
              200,
              260,
              280
            ],
            "answer": 240,
            "mascotHint": "24 × (7 + 3) = 24 × 10 = 240!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ công thức phân phối:",
            "points": [
              "a × (b + c) = a × b + a × c",
              "a × (b - c) = a × b - a × c"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l11",
      "title": "Bài 11: Nhân với số có hai, ba chữ số. Nhân nhẩm với 11",
      "type": "learn",
      "description": "Quy tắc đặt tích riêng thứ nhất, tích riêng thứ hai; mẹo nhân nhẩm số có 2 chữ số với 11",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Chú ý khi nhân với số có hai chữ số: Tích riêng thứ hai phải viết lùi sang bên trái một cột so với tích riêng thứ nhất! 📝"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Mẹo nhân nhẩm với 11: Ví dụ: 35 × 11, nên Cộng hai chữ số: 3 + 5 = 8. Chèn 8 vào giữa 3 và 5 được 385! Ví dụ có nhớ: 48 × 11, nên là 4 + 8 = 12. Chèn 2 vào giữa, nhớ 1 sang 4 thành 5, nên là 528!",
            "table": {
              "headers": [
                "Phép tính",
                "Mẹo",
                "Kết quả"
              ],
              "rows": [
                [
                  "35 × 11",
                  "3 + 5 = 8, chèn 8 vào giữa 3 và 5",
                  "385"
                ],
                [
                  "48 × 11",
                  "4 + 8 = 12, viết 2 nhớ 1 sang hàng trăm",
                  "528"
                ]
              ],
              "label": "Mẹo nhân nhẩm với 11"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi nhân: 245 × 12",
            "cotTinh": {
              "left": 245,
              "right": 12,
              "sign": "×"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Nhân nhẩm: 45 × 11 = ?",
            "options": [
              495,
              455,
              505,
              485
            ],
            "answer": 495,
            "mascotHint": "4 + 5 = 9, chèn vào giữa 4 và 5 được 495!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Nhân nhẩm: 67 × 11 = ?",
            "options": [
              737,
              637,
              727,
              747
            ],
            "answer": 737,
            "mascotHint": "6 + 7 = 13, viết 3 ở giữa, nhớ 1 sang 6 được 7, nên là 737!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tích riêng thứ hai lùi 1 cột sang trái.",
              "Khi nhân với 11: cộng 2 chữ số rồi chèn vào giữa."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l12",
      "title": "Bài 12: Chia cho số có một chữ số",
      "type": "learn",
      "description": "Thực hiện phép chia hết và chia có dư, kiểm tra số dư luôn bé hơn số chia",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Quy tắc vàng của phép chia: Số dư luôn luôn phải bé hơn số chia! Đặt tính và chia lần lượt từ trái sang phải! ➗"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính 128 472 : 6 rồi chia lần lượt từ trái sang phải — bé điền các chữ số của thương. Kết quả đúng là 21 412.",
            "cotTinh": {
              "left": 128472,
              "right": 6,
              "sign": ":"
            },
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "128 472 : 6",
                  "21 412"
                ],
                [
                  "157 : 5",
                  "31 (dư 2)"
                ]
              ],
              "label": "Chia cho số có một chữ số — số dư luôn bé hơn số chia"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 48 240 : 4 = ?",
            "options": [
              "12 060",
              "12 600",
              "1 260",
              "12 064"
            ],
            "answer": "12 060",
            "mascotHint": "4:4=1, 8:4=2, 2:4=0 viết 0, 24:4=6, 0:4=0, nên là 12 060!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Chia từ trái sang phải.",
              "Nếu chữ số bị chia nhỏ hơn số chia thì viết 0 vào thương.",
              "Số dư < Số chia."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c2-l13",
      "title": "Bài 13: Chia cho số có hai, ba chữ số. Thương có chữ số 0",
      "type": "learn",
      "description": "Cách ước lượng thương khi chia cho số có hai, ba chữ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Bí quyết ước lượng thương: Làm tròn số bị chia và số chia về số tròn chục rồi nhẩm chia! 🎯"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: 84 : 21. Làm tròn 80 : 20 = 4. Thử 21 × 4 = 84 vừa đúng ⇒ thương là 4. Bé đặt tính rồi điền thương nhé!",
            "cotTinh": {
              "left": 84,
              "right": 21,
              "sign": ":"
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Làm tròn để đoán",
                  "80 : 20 = 4"
                ],
                [
                  "Thử lại",
                  "21 × 4 = 84 ⇒ thương là 4"
                ],
                [
                  "Chú ý",
                  "số bị chia bé hơn số chia thì viết 0 vào thương"
                ]
              ],
              "label": "Chia cho số có hai, ba chữ số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 96 : 32 = ?",
            "options": [
              3,
              2,
              4,
              5
            ],
            "answer": 3,
            "mascotHint": "Ước lượng 90 : 30 = 3. Thử 32 × 3 = 96 (vừa đúng)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Ước lượng thương bằng cách làm tròn số tròn chục.",
              "Đừng quên viết chữ số 0 vào thương khi lượt chia không đủ."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    }
  ]
};
