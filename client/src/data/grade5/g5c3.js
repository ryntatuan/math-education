export const g5c3 = {
  "id": "g5-c3",
  "name": "Chương 3: Hình học & Thể tích hình khối",
  "description": "Diện tích hình tam giác, hình thang; chu vi & diện tích hình tròn; diện tích xung quanh, toàn phần và thể tích hình hộp chữ nhật, lập phương",
  "icon": "📐",
  "color": "#f59e0b",
  "totalLessons": 12,
  "lessons": [
    {
      "id": "g5-c3-l1",
      "title": "Bài 1: Hình tam giác & Diện tích hình tam giác",
      "type": "learn",
      "description": "Đáy và đường cao tương ứng; Công thức diện tích S = (a × h) : 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Muốn tính diện tích hình tam giác: Lấy độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2! 📐",
            "planeShapes": [
              {
                "kind": "triangle",
                "color": "#ef4444"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức: S = (a × h) : 2 Trong đó: a là độ dài đáy, h là chiều cao tương ứng.",
            "planeShape": {
              "kind": "triangle",
              "labels": [
                "đáy a",
                "chiều cao h"
              ],
              "formula": "S = (a × h) : 2"
            },
            "table": {
              "headers": [
                "Cần tìm",
                "Công thức"
              ],
              "rows": [
                [
                  "Diện tích tam giác",
                  "S = (a × h) : 2"
                ],
                [
                  "Độ dài đáy",
                  "a = S × 2 : h"
                ],
                [
                  "Chiều cao",
                  "h = S × 2 : a"
                ]
              ],
              "label": "a và h phải cùng đơn vị đo"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình tam giác có đáy 10 cm và chiều cao 8 cm. Diện tích của hình tam giác là:",
            "options": [
              "40 cm²",
              "80 cm²",
              "20 cm²",
              "18 cm²"
            ],
            "answer": "40 cm²",
            "mascotHint": "S = (10 × 8) : 2 = 80 : 2 = 40 cm²!",
            "planeShapes": [
              {
                "kind": "triangle",
                "color": "#ef4444"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức tam giác:",
            "points": [
              "S = (đáy × cao) : 2",
              "Độ dài đáy = (S × 2) : h; Chiều cao = (S × 2) : a"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l2",
      "title": "Bài 2: Hình thang & Diện tích hình thang",
      "type": "learn",
      "description": "Đáy lớn, đáy bé, chiều cao; Công thức diện tích S = ((a + b) × h) : 2",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bài ca hình thang quen thuộc: Muốn tính diện tích hình thang / Đáy lớn đáy bé ta mang cộng vào / Thế rồi nhân với chiều cao / Chia đôi lấy nửa thế nào cũng ra! 🎶"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức diện tích hình thang: S = (a + b) × h : 2 Trong đó: - a là đáy lớn - b là đáy bé - h là chiều cao (cùng đơn vị đo)",
            "planeShape": {
              "kind": "trapezoid",
              "labels": [
                "đáy lớn a",
                "đáy bé b",
                "chiều cao h"
              ],
              "formula": "S = (a + b) × h : 2"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình thang có đáy lớn 12 cm, đáy bé 8 cm và chiều cao 5 cm. Diện tích là:",
            "options": [
              "50 cm²",
              "100 cm²",
              "40 cm²",
              "48 cm²"
            ],
            "answer": "50 cm²",
            "mascotHint": "S = (12 + 8) × 5 : 2 = 20 × 5 : 2 = 100 : 2 = 50 cm²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức hình thang:",
            "points": [
              "S = (đáy lớn + đáy bé) × chiều cao : 2",
              "Nhớ đưa về cùng đơn vị đo trước khi tính."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l3",
      "title": "Bài 3: Hình tròn & Chu vi hình tròn",
      "type": "learn",
      "description": "Bán kính r, đường kính d (d = 2 × r); Chu vi C = d × 3,14 = r × 2 × 3,14",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Hình tròn có tâm O, bán kính r và đường kính d = 2 × r. Số 3,14 là số Pi kỳ diệu gắn liền với mọi hình tròn! ⭕",
            "circleParts": {
              "radius": 3,
              "diameter": 6,
              "showCenter": true,
              "pointLabels": {
                "center": "O"
              },
              "radiusLabel": "bán kính r",
              "diameterLabel": "đường kính d",
              "label": "Tâm O · bán kính r · đường kính d = 2 × r"
            },
            "planeShapes": [
              {
                "kind": "circle",
                "color": "#f59e0b"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức tính chu vi hình tròn: C = d × 3,14 hoặc C = r × 2 × 3,14 (d là đường kính, r là bán kính)",
            "circleParts": {
              "radius": 3,
              "diameter": 6,
              "showCenter": true,
              "showCircumference": true,
              "radiusLabel": "bán kính r",
              "diameterLabel": "đường kính d",
              "label": "Chu vi C = d × 3,14 hoặc C = r × 2 × 3,14"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình tròn có bán kính r = 5 cm. Chu vi hình tròn đó là:",
            "options": [
              "31,4 cm",
              "15,7 cm",
              "78,5 cm",
              "314 cm"
            ],
            "answer": "31,4 cm",
            "mascotHint": "C = 5 × 2 × 3,14 = 10 × 3,14 = 31,4 cm!",
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
            "title": "Ghi nhớ chu vi hình tròn:",
            "points": [
              "C = d × 3,14 = r × 2 × 3,14",
              "Đường kính = Chu vi : 3,14."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l4",
      "title": "Bài 4: Diện tích hình tròn",
      "type": "learn",
      "description": "Công thức tính diện tích hình tròn: S = r × r × 3,14",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Muốn tính diện tích hình tròn: Lấy bán kính nhân với bán kính rồi nhân với số 3,14! 🎯",
            "planeShapes": [
              {
                "kind": "circle",
                "color": "#f59e0b"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức: S = r × r × 3,14 Trong đó: r là bán kính hình tròn.",
            "circleParts": {
              "radius": 3,
              "showCenter": true,
              "radiusLabel": "bán kính r",
              "label": "Diện tích S = r × r × 3,14"
            },
            "table": {
              "headers": [
                "Biết gì",
                "Tính"
              ],
              "rows": [
                [
                  "bán kính r = 3 cm",
                  "S = 3 × 3 × 3,14 = 28,26 cm²"
                ],
                [
                  "đường kính d = 6 cm",
                  "r = 6 : 2 = 3 cm rồi mới tính S"
                ]
              ],
              "label": "Đọc kỹ đề cho BÁN KÍNH hay ĐƯỜNG KÍNH"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình tròn có bán kính r = 2 cm. Diện tích hình tròn đó là:",
            "options": [
              "12,56 cm²",
              "6,28 cm²",
              "25,12 cm²",
              "12 cm²"
            ],
            "answer": "12,56 cm²",
            "mascotHint": "S = 2 × 2 × 3,14 = 4 × 3,14 = 12,56 cm²!",
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
            "title": "Ghi nhớ diện tích hình tròn:",
            "points": [
              "S = r × r × 3,14",
              "Nếu đề bài cho đường kính d: tính r = d : 2 trước."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l5",
      "title": "Bài 5: Biểu đồ hình quạt",
      "type": "learn",
      "description": "Biểu đồ hình tròn chia thành từng hình quạt biểu thị tỉ lệ phần trăm",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Biểu đồ hình quạt giống như một chiếc bánh pizza tròn được cắt thành từng miếng quạt! Toàn bộ hình tròn tương ứng với 100%! 🍕📊",
            "pieChart": {
              "title": "Cả hình tròn = 100%",
              "items": [
                {
                  "label": "Xuất sắc",
                  "percent": 50
                },
                {
                  "label": "Tốt",
                  "percent": 30
                },
                {
                  "label": "Hoàn thành",
                  "percent": 20
                }
              ]
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: Biểu đồ kết quả học tập: - Xuất sắc: 50% (nửa hình tròn) - Tốt: 30% - Hoàn thành: 20% Tổng phần trăm luôn bằng 100%.",
            "pieChart": {
              "title": "Kết quả học tập của lớp",
              "items": [
                {
                  "label": "Xuất sắc",
                  "percent": 50
                },
                {
                  "label": "Tốt",
                  "percent": 30
                },
                {
                  "label": "Hoàn thành",
                  "percent": 20
                }
              ]
            },
            "table": {
              "headers": [
                "Phần",
                "Số đo góc tương ứng"
              ],
              "rows": [
                [
                  "50%",
                  "nửa hình tròn"
                ],
                [
                  "25%",
                  "một phần tư hình tròn"
                ],
                [
                  "Tổng",
                  "luôn bằng 100%"
                ]
              ],
              "label": "Biểu đồ hình quạt"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Nếu trường có 400 học sinh, trong đó có 25% học sinh xếp loại xuất sắc. Số học sinh xuất sắc là:",
            "options": [
              100,
              80,
              120,
              50
            ],
            "answer": 100,
            "mascotHint": "400 × 25 : 100 = 100 học sinh!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Cả hình tròn = 100%.",
              "Nửa hình tròn = 50%, một phần tư hình tròn = 25%."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l6",
      "title": "Bài 6: Hình hộp chữ nhật & Hình lập phương",
      "type": "learn",
      "description": "Nhận biết 6 mặt, 8 đỉnh, 12 cạnh; các kích thước: chiều dài, chiều rộng, chiều cao",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bao diêm, viên gạch có dạng hình hộp chữ nhật! Con súc sắc có dạng hình lập phương! Cả hai hình đều có: 6 mặt, 8 đỉnh và 12 cạnh! 🎲📦",
            "solid": {
              "kind": "cuboid",
              "dims": {
                "a": 4,
                "b": 3,
                "c": 2
              },
              "label": "Hình hộp chữ nhật — bao diêm, viên gạch",
              "formula": "6 mặt · 8 đỉnh · 12 cạnh"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Hình hộp chữ nhật: Có 3 kích thước: chiều dài a, chiều rộng b, chiều cao c. 6 mặt đều là hình chữ nhật. - Hình lập phương: Là hình hộp chữ nhật đặc biệt có chiều dài = chiều rộng = chiều cao (6 mặt là hình vuông bằng nhau).",
            "solid": {
              "kind": "cuboid",
              "dims": {
                "a": 4,
                "b": 3,
                "c": 2
              },
              "sideLetters": {
                "a": "a",
                "b": "b",
                "c": "c"
              },
              "label": "Hình hộp chữ nhật",
              "formula": "6 mặt đều là hình chữ nhật · 8 đỉnh · 12 cạnh"
            },
            "table": {
              "headers": [
                "Hình",
                "Đặc điểm"
              ],
              "rows": [
                [
                  "Hình hộp chữ nhật",
                  "3 kích thước: dài a, rộng b, cao c; 6 mặt chữ nhật"
                ],
                [
                  "Hình lập phương",
                  "6 mặt đều là hình vuông bằng nhau (a = b = c)"
                ]
              ],
              "label": "Hình hộp chữ nhật & hình lập phương"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình lập phương có mấy mặt, mấy đỉnh, mấy cạnh?",
            "options": [
              "6 mặt, 8 đỉnh, 12 cạnh",
              "6 mặt, 12 đỉnh, 8 cạnh",
              "8 mặt, 6 đỉnh, 12 cạnh",
              "4 mặt, 4 đỉnh, 6 cạnh"
            ],
            "answer": "6 mặt, 8 đỉnh, 12 cạnh",
            "mascotHint": "Ghi nhớ: 6 mặt, 8 đỉnh, 12 cạnh!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Hình lập phương có 6 mặt là các hình vuông bằng nhau.",
              "Hình hộp chữ nhật có các mặt đối diện bằng nhau."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l7",
      "title": "Bài 7: Diện tích xung quanh & Toàn phần hình hộp, lập phương",
      "type": "learn",
      "description": "Sxq = Chu vi đáy × Chiều cao; Stp = Sxq + Diện tích 2 đáy",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Diện tích xung quanh là tổng diện tích 4 mặt bên! Còn diện tích toàn phần là lấy diện tích xung quanh cộng thêm 2 mặt đáy! 📦"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "1. Hình hộp chữ nhật: - Sxq = (a + b) × 2 × c (Chu vi đáy × Chiều cao) - Stp = Sxq + 2 × (a × b) 2. Hình lập phương (cạnh a): - Sxq = a × a × 4 - Stp = a × a × 6",
            "solid": {
              "kind": "cuboid",
              "dims": {
                "a": 4,
                "b": 3,
                "c": 2
              },
              "sideLetters": {
                "a": "a",
                "b": "b",
                "c": "c"
              },
              "formula": "Sxq = (a + b) × 2 × c · Stp = Sxq + 2 × (a × b)"
            },
            "table": {
              "headers": [
                "Hình",
                "Diện tích xung quanh",
                "Diện tích toàn phần"
              ],
              "rows": [
                [
                  "Hộp chữ nhật",
                  "Sxq = (a + b) × 2 × c",
                  "Stp = Sxq + 2 × a × b"
                ],
                [
                  "Lập phương",
                  "Sxq = a × a × 4",
                  "Stp = a × a × 6"
                ]
              ],
              "label": "Diện tích xung quanh & toàn phần"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình lập phương có cạnh 5 cm. Diện tích toàn phần của nó là:",
            "options": [
              "150 cm²",
              "100 cm²",
              "125 cm²",
              "25 cm²"
            ],
            "answer": "150 cm²",
            "mascotHint": "Stp = a × a × 6 = 5 × 5 × 6 = 25 × 6 = 150 cm²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức cốt lõi:",
            "points": [
              "Hộp chữ nhật: Sxq = Chu vi đáy × Cao; Stp = Sxq + 2 đáy.",
              "Lập phương: Sxq = a × a × 4; Stp = a × a × 6."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l8",
      "title": "Bài 8: Thể tích hình hộp chữ nhật & Hình lập phương",
      "type": "learn",
      "description": "cm³, dm³, m³; 1 dm³ = 1 lít = 1000 cm³; V hộp = a × b × c; V lập phương = a × a × a",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Thể tích cho biết một vật chiếm bao nhiêu khoảng không gian! Thể tích hình hộp bằng tích 3 kích thước: dài × rộng × cao! 🧊"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Công thức thể tích: - Hình hộp chữ nhật: V = a × b × c - Hình lập phương: V = a × a × a Đơn vị đo thể tích: 1 m³ = 1000 dm³ = 1 000 000 cm³ Đặc biệt: 1 dm³ = 1 lít (l)!",
            "solid": {
              "kind": "cube",
              "dims": {
                "a": 3
              },
              "sideLetters": {
                "a": "a"
              },
              "formula": "V = a × a × a · 1 dm³ = 1 lít"
            },
            "table": {
              "headers": [
                "Hình",
                "Thể tích"
              ],
              "rows": [
                [
                  "Hộp chữ nhật",
                  "V = a × b × c"
                ],
                [
                  "Lập phương",
                  "V = a × a × a"
                ],
                [
                  "Đổi đơn vị",
                  "1 m³ = 1 000 dm³ = 1 000 000 cm³"
                ]
              ],
              "label": "Thể tích hình hộp chữ nhật & hình lập phương"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình hộp chữ nhật có dài 6 cm, rộng 4 cm, cao 5 cm. Thể tích là:",
            "options": [
              "120 cm³",
              "60 cm³",
              "15 cm³",
              "100 cm³"
            ],
            "answer": "120 cm³",
            "mascotHint": "V = a × b × c = 6 × 4 × 5 = 120 cm³!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình lập phương có cạnh 3 dm. Thể tích của nó là bao nhiêu lít?",
            "options": [
              "27 lít",
              "9 lít",
              "18 lít",
              "270 lít"
            ],
            "answer": "27 lít",
            "mascotHint": "V = 3 × 3 × 3 = 27 dm³ = 27 lít!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ thể tích:",
            "points": [
              "V hộp = a × b × c",
              "V lập phương = a × a × a",
              "1 m³ = 1000 dm³; 1 dm³ = 1 lít = 1000 cm³."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l10",
      "title": "Bài 9: Luyện tập diện tích hình tam giác và hình thang",
      "type": "learn",
      "description": "Luyện hai công thức diện tích quan trọng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cùng luyện hai công thức diện tích quan trọng nhất của chương: tam giác và hình thang! 🔺"
          }
        },
        {
          "type": "concept",
          "content": {
            "planeShape": {
              "kind": "trapezoid",
              "labels": [
                "a",
                "b",
                "h"
              ],
              "formula": "S = (a + b) × h : 2"
            },
            "table": {
              "headers": [
                "Hình",
                "Công thức"
              ],
              "rows": [
                [
                  "Tam giác",
                  "S = đáy × chiều cao : 2"
                ],
                [
                  "Hình thang",
                  "S = TỔNG hai đáy × chiều cao : 2"
                ]
              ],
              "label": "Luyện tập diện tích hình tam giác và hình thang"
            },
            "badge": "Luyện Diện Tích",
            "title": "Hai công thức cần nhớ",
            "points": [
              "Hình tam giác: S = (a × h) : 2 (a là độ dài đáy, h là chiều cao).",
              "Hình thang: S = ((a + b) × h) : 2 (a và b là hai đáy, h là chiều cao).",
              "Độ dài đáy và chiều cao phải cùng đơn vị đo."
            ],
            "rule": "Tam giác lấy đáy nhân chiều cao rồi chia 2; hình thang lấy TỔNG hai đáy nhân chiều cao rồi chia 2."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình tam giác có độ dài đáy 12 cm và chiều cao 7 cm. Diện tích là bao nhiêu?",
            "options": [
              "42 cm²",
              "84 cm²",
              "19 cm²",
              "21 cm²"
            ],
            "answer": "42 cm²",
            "mascotHint": "S = (12 × 7) : 2 = 84 : 2 = 42 cm²!",
            "planeShapes": [
              {
                "kind": "triangle",
                "color": "#ef4444"
              }
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình thang có hai đáy 10 cm và 6 cm, chiều cao 4 cm. Diện tích là bao nhiêu?",
            "options": [
              "32 cm²",
              "64 cm²",
              "20 cm²",
              "40 cm²"
            ],
            "answer": "32 cm²",
            "mascotHint": "S = ((10 + 6) × 4) : 2 = (16 × 4) : 2 = 64 : 2 = 32 cm²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tam giác: S = (a × h) : 2",
              "Hình thang: S = ((a + b) × h) : 2"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l11",
      "title": "Bài 10: Luyện tập chu vi và diện tích hình tròn",
      "type": "learn",
      "description": "Luyện công thức chu vi và diện tích hình tròn với số 3,14",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Nhớ số 3,14 là bé tính được mọi bài về hình tròn! 🔵",
            "planeShapes": [
              {
                "kind": "circle",
                "color": "#f59e0b"
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "circleParts": {
              "radius": 5,
              "diameter": 10,
              "showCircumference": true,
              "label": "Chu vi = d × 3,14 · Diện tích = r × r × 3,14"
            },
            "table": {
              "headers": [
                "Đề cho",
                "Chọn công thức"
              ],
              "rows": [
                [
                  "bán kính r",
                  "C = r × 2 × 3,14 ; S = r × r × 3,14"
                ],
                [
                  "đường kính d",
                  "C = d × 3,14 ; S = (d : 2) × (d : 2) × 3,14"
                ]
              ],
              "label": "Luyện tập chu vi và diện tích hình tròn"
            },
            "badge": "Luyện Hình Tròn",
            "title": "Ba công thức",
            "points": [
              "Đường kính = bán kính × 2 (d = r × 2).",
              "Chu vi = đường kính × 3,14 (C = d × 3,14).",
              "Diện tích = bán kính × bán kính × 3,14 (S = r × r × 3,14)."
            ],
            "rule": "Đọc kỹ đề cho BÁN KÍNH hay ĐƯỜNG KÍNH để chọn đúng công thức."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình tròn có bán kính 5 cm. Chu vi hình tròn là bao nhiêu? (lấy 3,14)",
            "options": [
              "31,4 cm",
              "15,7 cm",
              "78,5 cm",
              "62,8 cm"
            ],
            "answer": "31,4 cm",
            "mascotHint": "C = 5 × 2 × 3,14 = 31,4 cm!",
            "planeShapes": [
              {
                "kind": "circle",
                "color": "#f59e0b"
              }
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình tròn có bán kính 5 cm. Diện tích hình tròn là bao nhiêu? (lấy 3,14)",
            "options": [
              "78,5 cm²",
              "31,4 cm²",
              "15,7 cm²",
              "25 cm²"
            ],
            "answer": "78,5 cm²",
            "mascotHint": "S = 5 × 5 × 3,14 = 78,5 cm²!",
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
            "title": "Ghi nhớ hình tròn:",
            "points": [
              "C = d × 3,14 · S = r × r × 3,14",
              "Chu vi là số đo độ dài (cm), diện tích có đơn vị cm²"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l12",
      "title": "Bài 11: Luyện tập diện tích xung quanh, toàn phần và thể tích",
      "type": "learn",
      "description": "Phân biệt ba đại lượng của hình hộp và hình lập phương",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Ba đại lượng của hình hộp là chỗ dễ lẫn nhất! Cùng phân biệt cho thật rõ nhé! 📦"
          }
        },
        {
          "type": "concept",
          "content": {
            "solid": {
              "kind": "cuboid",
              "dims": {
                "a": 5,
                "b": 4,
                "c": 3
              },
              "sideLetters": {
                "a": "a",
                "b": "b",
                "c": "c"
              },
              "formula": "V = 5 × 4 × 3 = 60 cm³"
            },
            "table": {
              "headers": [
                "Đại lượng",
                "Đơn vị"
              ],
              "rows": [
                [
                  "Diện tích xung quanh",
                  "cm²"
                ],
                [
                  "Diện tích toàn phần",
                  "cm²"
                ],
                [
                  "Thể tích",
                  "cm³"
                ]
              ],
              "label": "Luyện tập Sxq, Stp và thể tích"
            },
            "badge": "Luyện Ba Đại Lượng",
            "title": "Phân biệt ba công thức",
            "points": [
              "Diện tích xung quanh = chu vi mặt đáy × chiều cao.",
              "Diện tích toàn phần = diện tích xung quanh + diện tích hai mặt đáy.",
              "Thể tích = chiều dài × chiều rộng × chiều cao (V = a × b × c)."
            ],
            "rule": "Đơn vị: diện tích xung quanh và toàn phần là cm²; thể tích là cm³."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình hộp chữ nhật có chiều dài 8 cm, chiều rộng 5 cm, chiều cao 4 cm. Thể tích là bao nhiêu?",
            "options": [
              "160 cm³",
              "160 cm²",
              "80 cm³",
              "92 cm³"
            ],
            "answer": "160 cm³",
            "mascotHint": "V = 8 × 5 × 4 = 160 cm³!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một hình lập phương có cạnh 3 cm. Thể tích là bao nhiêu?",
            "options": [
              "27 cm³",
              "9 cm³",
              "54 cm³",
              "18 cm³"
            ],
            "answer": "27 cm³",
            "mascotHint": "V = 3 × 3 × 3 = 27 cm³!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ ba đại lượng:",
            "points": [
              "Sxq = chu vi đáy × chiều cao",
              "Stp = Sxq + 2 × diện tích đáy",
              "V = a × b × c (đơn vị cm³)"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c3-l9",
      "title": "Bài 12: Hình trụ, Hình cầu & Luyện tập chung",
      "type": "learn",
      "description": "Nhận biết hình trụ (hộp sữa, lon nước), hình cầu (quả bóng, trái đất) và ôn tập hình học",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Lon nước ngọt có dạng hình trụ (gồm 2 mặt đáy là hình tròn bằng nhau và 1 mặt xung quanh). Quả bóng tròn xoe có dạng hình cầu! ⚽🥫",
            "solid": {
              "kind": "cylinder",
              "dims": {
                "a": 2,
                "b": 5
              },
              "label": "Hình trụ — lon nước ngọt",
              "formula": "Hai mặt đáy là hai hình tròn bằng nhau"
            }
          }
        },
        {
          "type": "concept",
          "content": {
            "solid": {
              "kind": "cylinder",
              "dims": {
                "a": 2,
                "b": 5
              },
              "label": "Hình trụ",
              "formula": "Hai mặt đáy là hai hình tròn bằng nhau"
            },
            "table": {
              "headers": [
                "Hình",
                "Đặc điểm"
              ],
              "rows": [
                [
                  "Hình trụ",
                  "hai mặt đáy tròn, xếp chồng được"
                ],
                [
                  "Hình cầu",
                  "tròn đều, lăn mọi hướng"
                ]
              ],
              "label": "Hình trụ, hình cầu & luyện tập chung"
            },
            "badge": "Kiến Thức Trọng Tâm",
            "title": "Hình trụ, Hình cầu & Luyện tập chung",
            "explanation": "Luyện tập chung về hình học: hình thang, tam giác, hình tròn, hình trụ và hình cầu.",
            "points": [
              "Diện tích hình tam giác = độ dài đáy × chiều cao : 2.",
              "Diện tích hình tròn = bán kính × bán kính × 3,14.",
              "Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao."
            ],
            "rule": "Ghi đúng đơn vị: diện tích là cm², thể tích là cm³."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Vật nào sau đây có dạng hình trụ?",
            "options": [
              "Hộp sữa đặc Ông Thọ",
              "Quả bóng đá",
              "Viên gạch",
              "Kim tự tháp"
            ],
            "answer": "Hộp sữa đặc Ông Thọ",
            "mascotHint": "Hộp sữa đặc hình trụ với 2 đáy là 2 hình tròn bằng nhau!",
            "planeShapes": [
              {
                "kind": "square",
                "color": "#3b82f6",
                "label": "Viên gạch"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Tổng kết Hình học:",
            "points": [
              "Nắm chắc diện tích tam giác, thang, tròn.",
              "Thành thạo diện tích và thể tích hình hộp, lập phương."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
