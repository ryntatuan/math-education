export const g4c5 = {
  "id": "g4-c5",
  "name": "Chương 5: Tỉ số, Toán Tổng - Tỉ, Hiệu - Tỉ & Bản đồ",
  "description": "Khái niệm tỉ số; bài toán Tìm hai số khi biết Tổng và Tỉ số, Hiệu và Tỉ số; tỉ lệ bản đồ và ứng dụng",
  "icon": "📊",
  "color": "#ec4899",
  "totalLessons": 10,
  "lessons": [
    {
      "id": "g4-c5-l1",
      "title": "Bài 1: Giới thiệu tỉ số",
      "type": "learn",
      "description": "Tỉ số của a và b là a : b hay a/b (b khác 0)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Có 3 quả cam và 5 quả táo. Tỉ số của số cam và số táo là 3 : 5 hay 3/5! Tỉ số cho biết số này bằng mấy phần của số kia! 🍊🍎",
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
          "type": "visual",
          "content": {
            "text": "Định nghĩa: Tỉ số của a và b (b khác 0) là a : b hay a/b. Ví dụ: Lớp có 15 bạn nam và 18 bạn nữ. Tỉ số số nam và số nữ là 15/18 = 5/6.",
            "fractionBar": {
              "rows": [
                {
                  "parts": 18,
                  "shaded": 15,
                  "label": "nam 15 / nữ 18 = 5/6"
                }
              ],
              "label": "Tỉ số của a và b là a : b hay a/b (b khác 0)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đoạn thẳng AB dài 4 m, đoạn thẳng CD dài 7 m. Tỉ số độ dài AB và CD là:",
            "options": [
              "4/7",
              "7/4",
              "4/11",
              "7/11"
            ],
            "answer": "4/7",
            "mascotHint": "AB : CD = 4 : 7 = 4/7!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tỉ số của a và b là a : b hay a/b.",
              "Viết đúng thứ tự: số nào nhắc trước viết ở tử số."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l2",
      "title": "Bài 2: Tìm hai số khi biết Tổng và Tỉ số của hai số đó",
      "type": "learn",
      "description": "Phương pháp 4 bước: Vẽ sơ đồ, tìm tổng số phần bằng nhau, tìm giá trị 1 phần, rồi tìm hai số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Bí quyết giải toán Tổng - Tỉ: Bước 1: Vẽ sơ đồ đoạn thẳng Bước 2: Tìm tổng số phần bằng nhau Bước 3: Tìm số bé = Tổng : Tổng số phần × Số phần số bé Bước 4: Tìm số lớn = Tổng - Số bé! 🎯"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: Tổng hai số là 35, tỉ số là 2/3. - Tổng số phần: 2 + 3 = 5 phần - Giá trị 1 phần: 35 : 5 = 7 - Số bé: 7 × 2 = 14 - Số lớn: 7 × 3 = 21 (hoặc 35 - 14 = 21)",
            "barModel": {
              "rows": [
                {
                  "label": "Số bé (2 phần)",
                  "parts": 2
                },
                {
                  "label": "Số lớn (3 phần)",
                  "parts": 3
                }
              ],
              "braceLabel": "Tổng 35 · số bé 14 · số lớn 21"
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Tổng số phần",
                  "2 + 3 = 5 phần"
                ],
                [
                  "Giá trị 1 phần",
                  "35 : 5 = 7"
                ],
                [
                  "Số bé",
                  "7 × 2 = 14"
                ],
                [
                  "Số lớn",
                  "7 × 3 = 21"
                ]
              ],
              "label": "Tìm hai số khi biết Tổng và Tỉ số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 40, tỉ số là 1/3. Số bé là bao nhiêu?",
            "options": [
              10,
              30,
              20,
              15
            ],
            "answer": 10,
            "mascotHint": "Tổng số phần: 1 + 3 = 4 phần. Số bé = 40 : 4 × 1 = 10!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Mẹ và con có tổng số tuổi là 36 tuổi, tuổi con bằng 1/5 tuổi mẹ. Hỏi mẹ bao nhiêu tuổi?",
            "options": [
              30,
              25,
              32,
              28
            ],
            "answer": 30,
            "mascotHint": "Tổng số phần: 1 + 5 = 6 phần. Tuổi con = 36 : 6 = 6 tuổi. Tuổi mẹ = 36 - 6 = 30 tuổi!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "4 Bước giải toán Tổng - Tỉ:",
            "points": [
              "1. Vẽ sơ đồ đoạn thẳng.",
              "2. Tổng số phần bằng nhau.",
              "3. Số bé = Tổng : Số phần × Số phần bé.",
              "4. Số lớn = Tổng - Số bé."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l3",
      "title": "Bài 3: Tìm hai số khi biết Hiệu và Tỉ số của hai số đó",
      "type": "learn",
      "description": "Phương pháp 4 bước với Hiệu số phần bằng nhau: Số bé = Hiệu : Hiệu số phần × Số phần số bé",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Tương tự như Tổng - Tỉ, với bài toán Hiệu - Tỉ ta tìm HIỆU SỐ PHẦN BẰNG NHAU: Lấy số phần của số lớn trừ đi số phần của số bé! 💡"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: Hiệu hai số là 24, tỉ số là 1/4. - Hiệu số phần: 4 - 1 = 3 phần - Giá trị 1 phần: 24 : 3 = 8 - Số bé: 8 × 1 = 8 - Số lớn: 8 + 24 = 32 (hoặc 8 × 4 = 32)",
            "barModel": {
              "rows": [
                {
                  "label": "Số bé (1 phần)",
                  "parts": 1
                },
                {
                  "label": "Số lớn (4 phần)",
                  "parts": 4
                }
              ],
              "braceLabel": "Hiệu 24 · số bé 8 · số lớn 32"
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Hiệu số phần",
                  "4 − 1 = 3 phần"
                ],
                [
                  "Giá trị 1 phần",
                  "24 : 3 = 8"
                ],
                [
                  "Số bé",
                  "8 × 1 = 8"
                ],
                [
                  "Số lớn",
                  "8 + 24 = 32"
                ]
              ],
              "label": "Tìm hai số khi biết Hiệu và Tỉ số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hiệu hai số là 15, tỉ số là 2/5. Số bé là:",
            "options": [
              10,
              25,
              15,
              20
            ],
            "answer": 10,
            "mascotHint": "Hiệu số phần: 5 - 2 = 3 phần. Giá trị 1 phần = 15 : 3 = 5. Số bé = 5 × 2 = 10!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức giải toán Hiệu - Tỉ:",
            "points": [
              "Hiệu số phần bằng nhau = Phần lớn - Phần bé.",
              "Số bé = (Hiệu : Hiệu số phần) × Số phần bé.",
              "Số lớn = Số bé + Hiệu."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l4",
      "title": "Bài 4: Tỉ lệ bản đồ và Ứng dụng",
      "type": "learn",
      "description": "Ý nghĩa tỉ lệ 1 : 1000, 1 : 100 000; Tính độ dài thực tế và độ dài thu nhỏ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Tỉ lệ 1 : 1000 trên bản đồ nghĩa là 1 cm trên bản đồ tương ứng với 1000 cm (10 m) ngoài thực tế! 🗺️🔍"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Độ dài thật = Độ dài trên bản đồ × Mẫu số tỉ lệ - Độ dài trên bản đồ = Độ dài thật : Mẫu số tỉ lệ (cùng đơn vị đo)",
            "table": {
              "headers": [
                "Cần tìm",
                "Công thức"
              ],
              "rows": [
                [
                  "Độ dài thật",
                  "độ dài trên bản đồ × mẫu số tỉ lệ"
                ],
                [
                  "Độ dài trên bản đồ",
                  "độ dài thật : mẫu số tỉ lệ"
                ]
              ],
              "label": "Tỉ lệ bản đồ — nhớ đổi về cùng một đơn vị đo"
            },
            "ruler": {
              "lengthCm": 2,
              "measure": {
                "from": 0,
                "to": 2
              },
              "label": "2 cm trên bản đồ tỉ lệ 1 : 1 000 ứng với 2 000 cm = 20 m thật"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên bản đồ tỉ lệ 1 : 10 000, quãng đường từ A đến B đo được 3 cm. Độ dài thật của quãng đường AB là:",
            "options": [
              "300 m",
              "30 000 m",
              "30 m",
              "3 000 m"
            ],
            "answer": "300 m",
            "mascotHint": "Độ dài thật = 3 × 10 000 = 30 000 cm = 300 m!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tỉ lệ bản đồ = Độ dài trên bản đồ / Độ dài thật.",
              "Đổi về cùng đơn vị đo trước khi tính."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l5",
      "title": "Bài 5: Luyện tập về tỉ số",
      "type": "learn",
      "description": "Luyện viết tỉ số của hai số đúng thứ tự",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Tỉ số cho biết quan hệ giữa hai số. Cùng luyện cách viết và đọc tỉ số nhé! 📊"
          }
        },
        {
          "type": "concept",
          "content": {
            "fractionBar": {
              "rows": [
                {
                  "label": "nam/nữ = 15/18 = 5/6",
                  "parts": 18,
                  "shaded": 15
                },
                {
                  "label": "nữ/nam = 18/15 = 6/5",
                  "parts": 15,
                  "shaded": 15
                }
              ],
              "label": "Tỉ số luôn viết đúng thứ tự theo câu hỏi"
            },
            "badge": "Luyện Tỉ Số",
            "title": "Ba điều cần nhớ về tỉ số",
            "points": [
              "Tỉ số của 3 và 5 viết là 3 : 5 (cũng có thể viết 3/5).",
              "Tỉ số không có đơn vị đo.",
              "Tỉ số của a và b (b khác 0) chính là thương của phép chia a : b."
            ],
            "rule": "Tỉ số của a và b là a : b — luôn viết đúng thứ tự theo câu hỏi."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong vườn có 12 cây cam và 8 cây chanh. Tỉ số của số cây cam và số cây chanh là:",
            "options": [
              "12 : 8",
              "8 : 12",
              "12 : 20",
              "20 : 12"
            ],
            "answer": "12 : 8",
            "mascotHint": "Đề hỏi cam trước, chanh sau nên tỉ số là 12 : 8 (rút gọn thành 3 : 2)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tỉ số của a và b là a : b",
              "Viết đúng thứ tự theo câu hỏi"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l6",
      "title": "Bài 6: Luyện tập toán Tổng - Tỉ",
      "type": "learn",
      "description": "Luyện giải bài toán tìm hai số khi biết tổng và tỉ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Dạng toán Tổng - Tỉ luôn giải theo hai bước: tìm tổng số phần, rồi tìm giá trị một phần! 🎯"
          }
        },
        {
          "type": "concept",
          "content": {
            "barModel": {
              "rows": [
                {
                  "label": "Số bé",
                  "parts": 2
                },
                {
                  "label": "Số lớn",
                  "parts": 3
                }
              ],
              "braceLabel": "Tổng 35 ⇒ 14 và 21"
            },
            "badge": "Luyện Tổng - Tỉ",
            "title": "Ba bước giải",
            "steps": [
              {
                "title": "Bước 1: Tìm tổng số phần",
                "desc": "Tổng số phần bằng nhau = cộng các phần của tỉ số."
              },
              {
                "title": "Bước 2: Tìm giá trị một phần",
                "desc": "Giá trị một phần = Tổng : Tổng số phần."
              },
              {
                "title": "Bước 3: Tìm mỗi số",
                "desc": "Số bé = giá trị một phần × số phần bé; Số lớn = giá trị một phần × số phần lớn."
              }
            ],
            "rule": "Đáp số phải trả lời đúng cả hai số."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 84, tỉ số của hai số là 2 : 5. Số bé là bao nhiêu?",
            "options": [
              24,
              60,
              12,
              42
            ],
            "answer": 24,
            "mascotHint": "Tổng số phần = 2 + 5 = 7; giá trị một phần = 84 : 7 = 12 ⇒ số bé = 12 × 2 = 24!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 125, tỉ số của hai số là 2 : 3. Số lớn là bao nhiêu?",
            "options": [
              75,
              50,
              25,
              100
            ],
            "answer": 75,
            "mascotHint": "2 + 3 = 5 phần; 125 : 5 = 25 ⇒ số lớn = 25 × 3 = 75!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tổng số phần = cộng các phần của tỉ số",
              "Giá trị một phần = Tổng : Tổng số phần"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l7",
      "title": "Bài 7: Luyện tập toán Hiệu - Tỉ",
      "type": "learn",
      "description": "Luyện giải bài toán tìm hai số khi biết hiệu và tỉ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Dạng Hiệu - Tỉ cũng hai bước: tìm hiệu số phần, rồi tìm giá trị một phần! ⚖️"
          }
        },
        {
          "type": "concept",
          "content": {
            "barModel": {
              "rows": [
                {
                  "label": "Số bé",
                  "parts": 1
                },
                {
                  "label": "Số lớn",
                  "parts": 4
                }
              ],
              "braceLabel": "Hiệu 24 ⇒ 8 và 32"
            },
            "table": {
              "headers": [
                "Dạng toán",
                "Chia cho"
              ],
              "rows": [
                [
                  "Tổng – Tỉ",
                  "TỔNG số phần"
                ],
                [
                  "Hiệu – Tỉ",
                  "HIỆU số phần"
                ]
              ],
              "label": "Phân biệt Tổng–Tỉ và Hiệu–Tỉ"
            },
            "badge": "Luyện Hiệu - Tỉ",
            "title": "Ba bước giải",
            "steps": [
              {
                "title": "Bước 1: Tìm hiệu số phần",
                "desc": "Hiệu số phần = số phần lớn - số phần bé."
              },
              {
                "title": "Bước 2: Tìm giá trị một phần",
                "desc": "Giá trị một phần = Hiệu : Hiệu số phần."
              },
              {
                "title": "Bước 3: Tìm mỗi số",
                "desc": "Nhân giá trị một phần với số phần của từng số."
              }
            ],
            "rule": "Hiệu - Tỉ thì chia cho HIỆU số phần; Tổng - Tỉ thì chia cho TỔNG số phần."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Hiệu hai số là 30, tỉ số của hai số là 3 : 5. Số lớn là bao nhiêu?",
            "options": [
              75,
              45,
              15,
              50
            ],
            "answer": 75,
            "mascotHint": "Hiệu số phần = 5 - 3 = 2; giá trị một phần = 30 : 2 = 15 ⇒ số lớn = 15 × 5 = 75!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Hiệu số phần = số phần lớn - số phần bé",
              "Kiểm tra lại: hiệu hai số vừa tìm phải bằng số đã cho"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l8",
      "title": "Bài 8: Tỉ lệ bản đồ trong thực tế",
      "type": "learn",
      "description": "Ứng dụng tỉ lệ bản đồ để tính quãng đường thật",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cùng dùng tỉ lệ bản đồ để tính quãng đường thật giữa các địa điểm nhé! 🗺️"
          }
        },
        {
          "type": "concept",
          "content": {
            "table": {
              "headers": [
                "Trên bản đồ",
                "Ngoài thực tế"
              ],
              "rows": [
                [
                  "1 cm (tỉ lệ 1 : 1 000 000)",
                  "1 000 000 cm = 10 km"
                ],
                [
                  "2 cm (tỉ lệ 1 : 1 000)",
                  "2 000 cm = 20 m"
                ]
              ],
              "label": "Tỉ lệ bản đồ trong thực tế"
            },
            "ruler": {
              "lengthCm": 10,
              "measure": {
                "from": 0,
                "to": 10
              },
              "label": "1 cm trên bản đồ tỉ lệ 1 : 1 000 000 ứng với 10 km thật"
            },
            "badge": "Ứng Dụng Bản Đồ",
            "title": "Hai chiều tính toán",
            "points": [
              "Độ dài thật = Độ dài trên bản đồ × Mẫu số tỉ lệ.",
              "Độ dài trên bản đồ = Độ dài thật : Mẫu số tỉ lệ.",
              "Nhớ đổi về cùng đơn vị đo, thường đổi ra mét hoặc ki-lô-mét."
            ],
            "rule": "Tỉ lệ 1 : 1 000 000 nghĩa là 1 cm trên bản đồ ứng với 1 000 000 cm = 10 km ngoài thực tế."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên bản đồ tỉ lệ 1 : 1 000 000, quãng đường từ A đến B dài 5 cm. Hỏi quãng đường thật dài bao nhiêu ki-lô-mét?",
            "options": [
              "50 km",
              "5 km",
              "500 km",
              "100 km"
            ],
            "answer": "50 km",
            "mascotHint": "5 × 1 000 000 = 5 000 000 cm = 50 km!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Độ dài thật = Độ dài bản đồ × Mẫu số tỉ lệ",
              "Đổi đơn vị: 100 000 cm = 1 km"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l9",
      "title": "Bài 9: Phân biệt toán Tổng - Tỉ và Hiệu - Tỉ",
      "type": "learn",
      "description": "Nhận biết đề bài thuộc dạng toán nào",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Hai dạng toán này đọc qua thì giống nhau, nhưng khác nhau ở một chỗ rất quan trọng! Cùng phân biệt nhé! 🔍"
          }
        },
        {
          "type": "concept",
          "content": {
            "barModel": {
              "rows": [
                {
                  "label": "Tổng – Tỉ",
                  "parts": 5
                },
                {
                  "label": "Hiệu – Tỉ",
                  "parts": 3
                }
              ],
              "braceLabel": "Tổng 5 phần · Hiệu 3 phần"
            },
            "table": {
              "headers": [
                "Đề cho",
                "Dạng toán"
              ],
              "rows": [
                [
                  "tổng và tỉ số",
                  "Tổng – Tỉ"
                ],
                [
                  "hiệu và tỉ số",
                  "Hiệu – Tỉ"
                ]
              ],
              "label": "Xác định đúng dạng toán trước khi giải"
            },
            "badge": "Phân Biệt Hai Dạng",
            "title": "Nhìn đề để chọn dạng",
            "points": [
              "Đề cho TỔNG (cả hai số cộng lại) ⇒ dạng Tổng - Tỉ, chia cho tổng số phần.",
              "Đề cho HIỆU (số này hơn số kia bao nhiêu) ⇒ dạng Hiệu - Tỉ, chia cho hiệu số phần.",
              "Từ khóa: 'tất cả, cả hai' ⇒ tổng; 'hơn kém nhau' ⇒ hiệu."
            ],
            "rule": "Xác định đúng dạng toán trước khi giải."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đề bài: 'Một cửa hàng bán được 240 kg gạo, trong đó số gạo nếp bằng 1/3 số gạo tẻ.' Bài toán này thuộc dạng nào?",
            "options": [
              "Tổng - Tỉ",
              "Hiệu - Tỉ",
              "Trung bình cộng"
            ],
            "answer": "Tổng - Tỉ",
            "mascotHint": "240 kg là TỔNG số gạo của cả hai loại nên đây là dạng Tổng - Tỉ!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đề bài: 'Mẹ hơn con 27 tuổi, tuổi mẹ gấp 4 lần tuổi con.' Bài toán này thuộc dạng nào?",
            "options": [
              "Hiệu - Tỉ",
              "Tổng - Tỉ",
              "Tỉ lệ bản đồ"
            ],
            "answer": "Hiệu - Tỉ",
            "mascotHint": "'Hơn con 27 tuổi' chính là HIỆU nên đây là dạng Hiệu - Tỉ!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Đề cho tổng ⇒ chia cho tổng số phần",
              "Đề cho hiệu ⇒ chia cho hiệu số phần"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c5-l10",
      "title": "Bài 10: Luyện tập chung chương 5",
      "type": "learn",
      "description": "Tổng hợp tỉ số, Tổng - Tỉ, Hiệu - Tỉ và bản đồ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "proud",
            "text": "Chặng tổng kết chương 5: tỉ số, hai dạng toán Tỉ và bản đồ! 🧠"
          }
        },
        {
          "type": "concept",
          "content": {
            "barModel": {
              "rows": [
                {
                  "label": "Số bé",
                  "parts": 2
                },
                {
                  "label": "Số lớn",
                  "parts": 3
                }
              ],
              "braceLabel": "Luyện tập chung chương 5"
            },
            "badge": "Ôn Tập Chương 5",
            "title": "Bốn mảng kiến thức",
            "points": [
              "Tỉ số của hai số (viết đúng thứ tự).",
              "Tổng - Tỉ: chia cho tổng số phần.",
              "Hiệu - Tỉ: chia cho hiệu số phần.",
              "Tỉ lệ bản đồ: độ dài thật = độ dài trên bản đồ × mẫu số tỉ lệ."
            ],
            "rule": "Đọc kỹ đề để chọn đúng dạng toán."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 90, tỉ số của hai số là 4 : 5. Số bé là bao nhiêu?",
            "options": [
              40,
              50,
              10,
              45
            ],
            "answer": 40,
            "mascotHint": "4 + 5 = 9 phần; 90 : 9 = 10 ⇒ số bé = 10 × 4 = 40!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trên bản đồ tỉ lệ 1 : 500 000, quãng đường dài 4 cm. Độ dài thật của quãng đường là bao nhiêu?",
            "options": [
              "20 km",
              "2 km",
              "200 km",
              "4 km"
            ],
            "answer": "20 km",
            "mascotHint": "4 × 500 000 = 2 000 000 cm = 20 km!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Chúc mừng bé:",
            "points": [
              "Bé đã hoàn thành chương 5: Tỉ số và Toán Tổng - Tỉ, Hiệu - Tỉ!"
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
