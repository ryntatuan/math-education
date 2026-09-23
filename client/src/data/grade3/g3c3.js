export const g3c3 = {
  "id": "g3-c3",
  "name": "Chủ đề 3: Làm quen với hình phẳng, hình khối",
  "description": "Điểm ở giữa và trung điểm đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc và góc vuông; các hình phẳng; khối lập phương, khối hộp chữ nhật",
  "icon": "📐",
  "color": "#ff8a65",
  "totalLessons": 10,
  "lessons": [
    {
      "id": "g3-c3-l1",
      "title": "Bài 1: Điểm ở giữa hai điểm",
      "type": "learn",
      "description": "Nhận biết điểm nằm giữa hai điểm thẳng hàng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Ba bạn kiến đứng thẳng hàng: A, O, B. Bạn nào đứng giữa nhỉ? 🐜"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Điểm ở giữa",
            "explanation": "Khi ba điểm thẳng hàng, điểm nằm GIỮA hai điểm còn lại gọi là ĐIỂM Ở GIỮA.",
            "rule": "Ba điểm A, O, B thẳng hàng theo thứ tự A, O, B thì O là điểm ở giữa A và B.",
            "pointLine": {
              "kind": "segment",
              "points": [
                "A",
                "O",
                "B"
              ],
              "formula": "O nằm giữa A và B ⇒ O là điểm ở giữa đoạn thẳng AB"
            },
            "points": [
              "Ba điểm phải THẲNG HÀNG thì mới có điểm ở giữa.",
              "A và B là hai điểm hai đầu, O nằm giữa.",
              "Điểm ở giữa không nhất thiết chia đoạn thành hai phần bằng nhau."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "O là điểm ở giữa A và B",
            "pointLine": {
              "kind": "segment",
              "points": [
                "A",
                "O",
                "B"
              ],
              "formula": "Ba điểm A, O, B thẳng hàng ⇒ O là điểm ở giữa A và B"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Ba điểm A, O, B thẳng hàng theo thứ tự A, O, B. Điểm nào ở giữa?",
            "options": [
              "Điểm A",
              "Điểm O",
              "Điểm B",
              "Không có điểm nào"
            ],
            "answer": "Điểm O",
            "mascotHint": "O nằm giữa A và B."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Ba điểm thẳng hàng mới có điểm ở giữa.",
              "A, O, B theo thứ tự đó thì O ở giữa."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l2",
      "title": "Bài 2: Trung điểm của đoạn thẳng",
      "type": "learn",
      "description": "Nhận biết trung điểm chia đoạn thẳng thành hai phần bằng nhau",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Rô-bốt gấp đôi sợi dây rồi đánh dấu chỗ giữa. Chỗ đó gọi là gì nhỉ? 📏"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Trung điểm",
            "explanation": "TRUNG ĐIỂM của đoạn thẳng là điểm nằm giữa và chia đoạn thẳng thành HAI PHẦN BẰNG NHAU.",
            "rule": "M là trung điểm của AB khi M nằm giữa A, B và AM = MB.",
            "points": [
              "Trung điểm phải CHIA ĐÔI đoạn thẳng.",
              "Nếu AB dài 8 cm thì trung điểm M cách A và B mỗi bên 4 cm.",
              "Điểm ở giữa chưa chắc là trung điểm, nhưng trung điểm luôn là điểm ở giữa."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "M là trung điểm của đoạn thẳng AB: AM = MB",
            "pointLine": {
              "kind": "segment",
              "points": [
                "A",
                "M",
                "B"
              ],
              "equalMarks": true,
              "formula": "M nằm giữa A, B và AM = MB ⇒ M là trung điểm của AB"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đoạn thẳng AB dài 10 cm, M là trung điểm của AB. Hỏi AM dài bao nhiêu?",
            "options": [
              "4 cm",
              "5 cm",
              "6 cm",
              "10 cm"
            ],
            "answer": "5 cm",
            "mascotHint": "Trung điểm chia đôi: 10 : 2 = 5 cm."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điều kiện nào để M là trung điểm của AB?",
            "options": [
              "M nằm giữa A, B và AM = MB",
              "M nằm ở đâu cũng được",
              "M trùng với A",
              "M nằm ngoài đoạn AB"
            ],
            "answer": "M nằm giữa A, B và AM = MB",
            "mascotHint": "M vừa nằm giữa, vừa chia đoạn thành hai phần bằng nhau."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Trung điểm nằm giữa và chia đoạn thẳng thành hai phần bằng nhau.",
              "AB dài 10 cm thì trung điểm cách mỗi đầu 5 cm."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l3",
      "title": "Bài 3: Hình tròn — tâm, bán kính, đường kính",
      "type": "learn",
      "description": "Nhận biết tâm, bán kính và đường kính của hình tròn",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Rô-bốt vẽ một hình tròn có tâm O. Bé cùng tìm bán kính và đường kính nhé! ⭕",
            "circleParts": {
              "radius": 3,
              "diameter": 6,
              "showCenter": true,
              "pointLabels": {
                "center": "O"
              },
              "label": "Tâm O · bán kính · đường kính"
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
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Hình tròn",
            "explanation": "TÂM là điểm chính giữa hình tròn. BÁN KÍNH là đoạn từ tâm đến một điểm trên đường tròn. ĐƯỜNG KÍNH là đoạn thẳng đi qua tâm và nối hai điểm trên đường tròn.",
            "rule": "Đường kính gấp đôi bán kính: d = 2 × r.",
            "points": [
              "Mọi bán kính của một hình tròn đều dài bằng nhau.",
              "Bán kính OA = OB.",
              "Nếu bán kính 3 cm thì đường kính 6 cm."
            ],
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
            "text": "Tâm O · bán kính OA = OB · đường kính BC = 2 × bán kính",
            "circleParts": {
              "radius": 3,
              "diameter": 6,
              "showCenter": true,
              "showCircumference": true,
              "pointLabels": {
                "center": "O",
                "right": "B",
                "left": "C",
                "down": "A"
              },
              "label": "Bán kính OA = OB · đường kính BC = 2 × bán kính"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình tròn có bán kính 4 cm. Đường kính dài bao nhiêu?",
            "options": [
              "2 cm",
              "4 cm",
              "8 cm",
              "16 cm"
            ],
            "answer": "8 cm",
            "mascotHint": "Đường kính = 2 × bán kính = 2 × 4 = 8 cm.",
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
            "question": "Đoạn thẳng nào đi qua tâm và nối hai điểm trên đường tròn?",
            "options": [
              "Đường kính",
              "Bán kính",
              "Cạnh",
              "Góc"
            ],
            "answer": "Đường kính",
            "mascotHint": "Đường kính đi qua tâm, nối hai điểm trên đường tròn."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Tâm là điểm chính giữa hình tròn.",
              "Đường kính = 2 × bán kính."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l4",
      "title": "Bài 4: Góc và góc vuông",
      "type": "learn",
      "description": "Nhận biết góc và góc vuông",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Hai cạnh của quyển sách tạo thành một góc. Bé xem đó là góc gì nhé! 📕",
            "items": [
              {
                "emoji": "📕",
                "label": "Quyển sách",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Góc và góc vuông",
            "explanation": "GÓC được tạo bởi hai cạnh xuất phát từ một điểm (gọi là đỉnh). GÓC VUÔNG là góc đặc biệt, dùng Ê-KE để kiểm tra.",
            "rule": "Bốn góc của hình chữ nhật là bốn góc vuông. Đặt ê-ke khớp đúng là góc vuông.",
            "points": [
              "Góc có một đỉnh và hai cạnh.",
              "Ê-ke là dụng cụ có một góc vuông để kiểm tra.",
              "Đặt đỉnh góc vuông của ê-ke trùng đỉnh góc cần kiểm tra."
            ],
            "planeShapes": [
              {
                "kind": "rectangle",
                "color": "#10b981"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Góc đỉnh A, hai cạnh AB và AC (góc vuông — dùng ê-ke)",
            "angle": {
              "kind": "right",
              "degrees": 90,
              "vertexLetter": "A",
              "armLetters": [
                "B",
                "C"
              ],
              "label": "Góc vuông — đặt ê-ke khớp đúng"
            },
            "table": {
              "headers": [
                "Đỉnh",
                "Cạnh"
              ],
              "rows": [
                [
                  "A",
                  "AB và AC"
                ]
              ],
              "label": "Góc đỉnh A, cạnh AB và AC — bốn góc của hình chữ nhật đều là góc vuông"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Dùng dụng cụ nào để kiểm tra góc vuông?",
            "options": [
              "Ê-ke",
              "Thước dây",
              "Cân",
              "Compa"
            ],
            "answer": "Ê-ke",
            "mascotHint": "Ê-ke có một góc vuông để kiểm tra."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Góc có một đỉnh và hai cạnh.",
              "Dùng ê-ke để kiểm tra góc vuông."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l5",
      "title": "Bài 5: Góc không vuông",
      "type": "learn",
      "description": "Phân biệt góc vuông và góc không vuông",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Hai cánh cửa mở ra tạo một góc. Góc đó có vuông không nhỉ? 🚪"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Góc vuông và góc không vuông",
            "explanation": "Góc nào khớp đúng với góc vuông của ê-ke thì là GÓC VUÔNG. Các góc còn lại là GÓC KHÔNG VUÔNG.",
            "rule": "Nếu ê-ke không khớp với góc thì góc đó không vuông.",
            "points": [
              "Góc không vuông có thể rộng hơn hoặc hẹp hơn góc vuông.",
              "Mép bàn, mép sách thường tạo góc vuông.",
              "Kim đồng hồ lúc 3 giờ tạo thành góc vuông."
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "├ góc vuông (ê-ke khớp)\n╱ góc không vuông (ê-ke không khớp)",
            "angle": {
              "kind": "acute",
              "degrees": 45,
              "label": "Góc không vuông — ê-ke không khớp"
            },
            "table": {
              "headers": [
                "Góc",
                "Ê-ke"
              ],
              "rows": [
                [
                  "Vuông",
                  "khớp"
                ],
                [
                  "Không vuông",
                  "không khớp"
                ]
              ],
              "label": "Phân biệt góc vuông và góc không vuông"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Khi ê-ke KHÔNG khớp với góc, góc đó là góc gì?",
            "options": [
              "Góc không vuông",
              "Góc vuông",
              "Góc bẹt",
              "Đường tròn"
            ],
            "answer": "Góc không vuông",
            "mascotHint": "Không khớp ê-ke thì là góc không vuông."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Ê-ke khớp → góc vuông.",
              "Ê-ke không khớp → góc không vuông."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l6",
      "title": "Bài 6: Hình tam giác và hình tứ giác",
      "type": "learn",
      "description": "Nhận biết hình tam giác, hình tứ giác qua cạnh, đỉnh, góc",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bé đếm giúp Rô-bốt: hình tam giác có mấy cạnh, mấy góc? 🔺",
            "planeShapes": [
              {
                "kind": "triangle",
                "color": "#ef4444"
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Hình tam giác và hình tứ giác",
            "explanation": "HÌNH TAM GIÁC có 3 cạnh, 3 đỉnh và 3 góc. HÌNH TỨ GIÁC có 4 cạnh, 4 đỉnh và 4 góc.",
            "rule": "Hình tam giác: 3 cạnh, 3 đỉnh, 3 góc. Hình tứ giác: 4 cạnh, 4 đỉnh, 4 góc.",
            "points": [
              "Hình tam giác là hình có ít cạnh nhất trong hai hình này.",
              "Hình vuông và hình chữ nhật cũng là hình tứ giác.",
              "Đếm đỉnh và cạnh phải luôn bằng nhau."
            ],
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
            "text": "🔺 tam giác: 3 cạnh · 3 đỉnh · 3 góc\n▭ tứ giác: 4 cạnh · 4 đỉnh · 4 góc",
            "planeShape": {
              "kind": "triangle",
              "labels": [
                "cạnh",
                "cạnh"
              ],
              "vertices": true,
              "formula": "3 cạnh · 3 đỉnh · 3 góc"
            },
            "table": {
              "headers": [
                "Hình",
                "Cạnh",
                "Đỉnh",
                "Góc"
              ],
              "rows": [
                [
                  "Tam giác",
                  3,
                  3,
                  3
                ],
                [
                  "Tứ giác",
                  4,
                  4,
                  4
                ]
              ],
              "label": "Hình tam giác và hình tứ giác"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình tam giác có mấy góc?",
            "options": [
              2,
              3,
              4,
              5
            ],
            "answer": 3,
            "mascotHint": "Hình tam giác có 3 cạnh, 3 đỉnh, 3 góc.",
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
            "question": "Hình tứ giác có mấy đỉnh?",
            "options": [
              3,
              4,
              5,
              6
            ],
            "answer": 4,
            "mascotHint": "Hình tứ giác có 4 cạnh và 4 đỉnh.",
            "planeShapes": [
              {
                "kind": "rectangle",
                "color": "#ec4899"
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Tam giác: 3 cạnh, 3 đỉnh, 3 góc.",
              "Tứ giác: 4 cạnh, 4 đỉnh, 4 góc."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l7",
      "title": "Bài 7: Hình chữ nhật và hình vuông",
      "type": "learn",
      "description": "Nhận biết đặc điểm hình chữ nhật và hình vuông",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Bé hãy kiểm tra bốn góc của hình chữ nhật bằng ê-ke xem có vuông không nhé! 📐",
            "planeShapes": [
              {
                "kind": "rectangle",
                "color": "#10b981"
              }
            ]
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Hình chữ nhật và hình vuông",
            "explanation": "Cả hai đều có 4 GÓC VUÔNG. Hình chữ nhật có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau. Hình vuông có 4 cạnh bằng nhau.",
            "rule": "Hình chữ nhật: 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau. Hình vuông: 4 góc vuông, 4 cạnh bằng nhau.",
            "points": [
              "Hình vuông là hình chữ nhật đặc biệt (có 4 cạnh bằng nhau).",
              "Cả hai đều có 4 đỉnh.",
              "Dùng ê-ke để kiểm tra 4 góc vuông."
            ],
            "planeShapes": [
              {
                "kind": "square",
                "color": "#3b82f6"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "▭ hình chữ nhật: 4 góc vuông, 2 cặp cạnh bằng nhau\n▢ hình vuông: 4 góc vuông, 4 cạnh bằng nhau",
            "planeShape": {
              "kind": "square",
              "labels": [
                "cạnh"
              ],
              "formula": "4 góc vuông · 4 cạnh bằng nhau"
            },
            "table": {
              "headers": [
                "Hình",
                "Đặc điểm"
              ],
              "rows": [
                [
                  "Hình chữ nhật",
                  "4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau"
                ],
                [
                  "Hình vuông",
                  "4 góc vuông, 4 cạnh bằng nhau"
                ]
              ],
              "label": "Hình chữ nhật và hình vuông"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình vuông có đặc điểm gì?",
            "options": [
              "4 góc vuông và 4 cạnh bằng nhau",
              "3 góc vuông",
              "2 cạnh bằng nhau",
              "Không có góc vuông"
            ],
            "answer": "4 góc vuông và 4 cạnh bằng nhau",
            "mascotHint": "Hình vuông có 4 góc vuông và 4 cạnh đều bằng nhau.",
            "planeShapes": [
              {
                "kind": "square",
                "color": "#3b82f6"
              }
            ]
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình chữ nhật có mấy góc vuông?",
            "options": [
              2,
              3,
              4,
              5
            ],
            "answer": 4,
            "mascotHint": "Cả 4 góc của hình chữ nhật đều là góc vuông.",
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
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Hình chữ nhật: 4 góc vuông, hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau.",
              "Hình vuông: 4 góc vuông, 4 cạnh bằng nhau."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l8",
      "title": "Bài 8: Thực hành vẽ góc vuông, đường tròn và các hình",
      "type": "learn",
      "description": "Dùng ê-ke và compa để vẽ hình",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Hôm nay bé làm hoạ sĩ hình học! Mình vẽ góc vuông và đường tròn nhé ✏️"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Thực Hành",
            "title": "Cách vẽ",
            "explanation": "Vẽ góc vuông: dùng ê-ke, kẻ hai cạnh theo hai cạnh góc vuông của ê-ke. Vẽ đường tròn: dùng compa, đặt mũi nhọn vào tâm, quay đều.",
            "rule": "Vẽ hình vuông cạnh 4 cm: kẻ một cạnh 4 cm, rồi dùng ê-ke kẻ các cạnh còn lại.",
            "points": [
              "Ê-ke để vẽ góc vuông.",
              "Compa để vẽ đường tròn.",
              "Vẽ hình chữ nhật: dùng ê-ke để các góc đều vuông."
            ],
            "planeShapes": [
              {
                "kind": "square",
                "color": "#3b82f6"
              }
            ]
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ê-ke → vẽ góc vuông, hình vuông",
            "planeShape": {
              "kind": "square",
              "labels": [
                "4 cm"
              ],
              "formula": "Vẽ hình vuông cạnh 4 cm bằng ê-ke"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Compa → vẽ đường tròn",
            "circleParts": {
              "radius": 3,
              "showCenter": true,
              "label": "Dùng compa để vẽ đường tròn"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Muốn vẽ một đường tròn, bé dùng dụng cụ nào?",
            "options": [
              "Compa",
              "Ê-ke",
              "Thước dây",
              "Cân"
            ],
            "answer": "Compa",
            "mascotHint": "Compa dùng để vẽ đường tròn."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Ê-ke vẽ góc vuông và các hình có góc vuông.",
              "Compa vẽ đường tròn."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l9",
      "title": "Bài 9: Khối lập phương và khối hộp chữ nhật",
      "type": "learn",
      "description": "Nhận biết hai loại khối qua số mặt, số đỉnh, số cạnh",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "curious",
            "text": "Bé hãy đếm mặt của con xúc xắc và của hộp bánh nhé! 🎲"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Khám Phá",
            "title": "Hai loại khối",
            "explanation": "KHỐI LẬP PHƯƠNG có 6 mặt đều là hình vuông bằng nhau. KHỐI HỘP CHỮ NHẬT có 6 mặt, các mặt là hình chữ nhật.",
            "rule": "Cả hai đều có 6 mặt, 8 đỉnh và 12 cạnh.",
            "points": [
              "Khối lập phương: 6 mặt vuông bằng nhau.",
              "Khối hộp chữ nhật: 6 mặt không đều nhau.",
              "Cả hai đều xếp chồng được."
            ],
            "solid": {
              "kind": "cube",
              "color": "#3b82f6"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "🎲 khối lập phương: 6 mặt vuông bằng nhau\n📦 khối hộp chữ nhật: 6 mặt không đều nhau",
            "solid": {
              "kind": "cube",
              "dims": {
                "a": 3
              },
              "label": "Khối lập phương",
              "formula": "6 mặt vuông bằng nhau"
            },
            "table": {
              "headers": [
                "Khối",
                "Mặt"
              ],
              "rows": [
                [
                  "Khối lập phương",
                  "6 mặt vuông bằng nhau"
                ],
                [
                  "Khối hộp chữ nhật",
                  "6 mặt không đều nhau"
                ]
              ],
              "label": "Cả hai đều có 6 mặt, 8 đỉnh và 12 cạnh"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Khối lập phương có mấy mặt?",
            "options": [
              4,
              6,
              8,
              12
            ],
            "answer": 6,
            "mascotHint": "Khối lập phương có 6 mặt đều là hình vuông.",
            "solid": {
              "kind": "cube",
              "color": "#3b82f6"
            }
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Cả hai khối đều có 6 mặt.",
              "Khối lập phương có 6 mặt vuông bằng nhau."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g3-c3-l10",
      "title": "Bài 10: Luyện tập chung chủ đề 3",
      "type": "learn",
      "description": "Luyện tập trung điểm, hình tròn, góc và các hình phẳng đã học",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Bé đã biết rất nhiều về hình rồi! Tổng kết nhé 🎉"
          }
        },
        {
          "type": "concept",
          "content": {
            "badge": "Ôn Tập",
            "title": "Tổng kết chủ đề 3",
            "explanation": "Bé đã học điểm ở giữa, trung điểm, hình tròn, góc, các hình phẳng và hai loại khối.",
            "points": [
              "Trung điểm chia đoạn thẳng thành hai phần bằng nhau.",
              "Đường kính = 2 × bán kính.",
              "Hình tam giác: 3 cạnh; hình tứ giác: 4 cạnh.",
              "Hình vuông và hình chữ nhật đều có 4 góc vuông."
            ],
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
            "text": "Đường kính = 2 × bán kính (d = 2 × r)",
            "circleParts": {
              "radius": 3,
              "diameter": 6,
              "label": "d = 2 × r"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Hình vuông: 4 góc vuông · 4 cạnh bằng nhau",
            "planeShape": {
              "kind": "square",
              "labels": [
                "cạnh"
              ],
              "formula": "4 góc vuông · 4 cạnh bằng nhau"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hình tròn có đường kính 10 cm. Bán kính dài bao nhiêu?",
            "options": [
              "5 cm",
              "10 cm",
              "20 cm",
              "2 cm"
            ],
            "answer": "5 cm",
            "mascotHint": "Bán kính = đường kính : 2 = 10 : 2 = 5 cm.",
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
            "question": "Đoạn thẳng AB dài 12 cm. Trung điểm M của AB cách A bao nhiêu xăng-ti-mét?",
            "options": [
              "4 cm",
              "6 cm",
              "12 cm",
              "24 cm"
            ],
            "answer": "6 cm",
            "mascotHint": "12 : 2 = 6 cm."
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Bé nhớ rất tốt:",
            "points": [
              "Bé đã hoàn thành chủ đề 3.",
              "Đường kính 10 cm thì bán kính 5 cm."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
