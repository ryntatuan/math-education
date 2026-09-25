export const g5c2 = {
  "id": "g5-c2",
  "name": "Chương 2: Số thập phân & Các phép tính số thập phân",
  "description": "Khái niệm, các hàng của số thập phân; cộng, trừ, nhân, chia số thập phân; tỉ số phần trăm và 3 bài toán tỉ số %",
  "icon": "🔢",
  "color": "#10b981",
  "totalLessons": 10,
  "lessons": [
    {
      "id": "g5-c2-l1",
      "title": "Bài 1: Khái niệm & Hàng của số thập phân",
      "type": "learn",
      "description": "Phần nguyên đứng trước dấu phẩy, phần thập phân đứng sau; hàng phần mười, hàng phần trăm, hàng phần nghìn",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Mỗi số thập phân gồm hai phần: Phần nguyên (bên trái dấu phẩy) và Phần thập phân (bên phải dấu phẩy)! Ví dụ: 8,56 gồm phần nguyên 8 và phần thập phân 56 phần trăm! 🎯"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cấu tạo số thập phân 375,429: - Phần nguyên: 3 trăm, 7 chục, 5 đơn vị - Dấu phẩy ngăn cách - Phần thập phân: 4 phần mười (hàng phần mười), 2 phần trăm (hàng phần trăm), 9 phần nghìn (hàng phần nghìn)",
            "table": {
              "headers": [
                "Hàng",
                "Chữ số",
                "Giá trị"
              ],
              "rows": [
                [
                  "trăm",
                  3,
                  300
                ],
                [
                  "chục",
                  7,
                  70
                ],
                [
                  "đơn vị",
                  5,
                  5
                ],
                [
                  "phần mười",
                  4,
                  "0,4"
                ],
                [
                  "phần trăm",
                  2,
                  "0,02"
                ],
                [
                  "phần nghìn",
                  9,
                  "0,009"
                ]
              ],
              "label": "Số 375,429 — dấu phẩy ngăn cách phần nguyên và phần thập phân"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Viết số thích hợp vào ô trống — phần thập phân có mấy chữ số",
            "bangTinh": {
              "headers": ["Số thập phân", "Mấy chữ số ở phần thập phân"],
              "rows": [["3,45", null], ["12,7", null], ["0,208", null]],
              "answers": [2, 1, 3],
              "options": [1, 2, 3, 4],
              "label": "Đếm các chữ số đứng SAU dấu phẩy."
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong số thập phân 18,256, chữ số 5 thuộc hàng nào?",
            "options": [
              "Hàng phần trăm",
              "Hàng phần mười",
              "Hàng phần nghìn",
              "Hàng chục"
            ],
            "answer": "Hàng phần trăm",
            "mascotHint": "Đứng ngay sau dấu phẩy là phần mười (2), tiếp theo là phần trăm (5)!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Phân số thập phân 7/100 viết dưới dạng số thập phân là:",
            "options": [
              "0,07",
              "0,7",
              "7,0",
              "0,007"
            ],
            "answer": "0,07",
            "mascotHint": "Mẫu số có hai chữ số 0 nên có 2 chữ số sau dấu phẩy: 0,07!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ cấu tạo:",
            "points": [
              "Phần nguyên bên trái, phần thập phân bên phải dấu phẩy.",
              "Các hàng phần thập phân: phần mười, phần trăm, phần nghìn..."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l2",
      "title": "Bài 2: Số thập phân bằng nhau & So sánh số thập phân",
      "type": "learn",
      "description": "Thêm hoặc bớt chữ số 0 ở bên phải phần thập phân giá trị không đổi; so sánh phần nguyên trước rồi đến phần thập phân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Nếu viết thêm (hoặc xóa bớt) chữ số 0 ở tận cùng bên phải phần thập phân thì được một số thập phân bằng nó! Ví dụ: 0,9 = 0,90 = 0,900! ✨"
          }
        },
        {
          "type": "concept",
          "content": {
            "table": {
              "headers": [
                "So sánh",
                "Kết luận"
              ],
              "rows": [
                [
                  "0,5 và 0,50",
                  "bằng nhau (thêm 0 vào cuối không đổi giá trị)"
                ],
                [
                  "0,5 và 0,15",
                  "0,5 > 0,15"
                ],
                [
                  "2,35 và 2,4",
                  "2,35 < 2,4"
                ]
              ],
              "label": "KHÔNG đếm số chữ số để so sánh — phải so từng hàng từ trái sang phải"
            },
            "badge": "Quy Tắc So Sánh",
            "title": "Cách so sánh hai số thập phân",
            "explanation": "Để so sánh hai số thập phân, ta thực hiện theo thứ tự:",
            "points": [
              "Bước 1: So sánh phần nguyên trước. Số nào có phần nguyên lớn hơn thì số đó lớn hơn (ví dụ: 12,5 > 9,89).",
              "Bước 2: Nếu phần nguyên bằng nhau, so sánh hàng phần mười. Số nào có hàng phần mười lớn hơn thì lớn hơn.",
              "Bước 3: Nếu hàng phần mười bằng nhau, tiếp tục so sánh hàng phần trăm, hàng phần nghìn..."
            ],
            "rule": "Không được đếm số lượng chữ số để so sánh! 0,5 = 0,50 lớn hơn 0,15."
          }
        },
        {
          "type": "dialogue",
          "content": {
            "badge": "Giao Lưu Lớp Học",
            "title": "Hiểu lầm kinh điển: 0,5 và 0,15",
            "dialogueList": [
              {
                "character": "robot",
                "name": "Bạn Rô-bốt 🤖",
                "text": "Tớ thấy 15 lớn hơn 5, nên chắc chắn số 0,15 phải lớn hơn số 0,5 rồi!"
              },
              {
                "character": "nam",
                "name": "Bạn Nam 👦",
                "text": "Cậu nhầm to rồi Rô-bốt ơi! Phải so sánh từ hàng phần mười trước chứ!"
              }
            ],
            "question": "Bạn Rô-bốt nói đúng hay sai?",
            "options": [
              "Đúng rồi 👍",
              "Sai rồi 👎"
            ],
            "correctAnswer": "Sai rồi 👎",
            "explanation": "Rô-bốt đã mắc phải lỗi sai rất phổ biến! Ta có 0,5 = 0,50 (50 phần trăm), trong khi 0,15 chỉ có 15 phần trăm. So sánh hàng phần mười: 5 lớn hơn 1, do đó 0,5 lớn hơn 0,15!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền dấu thích hợp: 7,85 ... 7,9",
            "options": [
              "<",
              ">",
              "="
            ],
            "answer": "<",
            "mascotHint": "Phần nguyên bằng 7. Hàng phần mười: 8 < 9 nên 7,85 < 7,90!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số nào bé nhất trong các số: 5,4; 5,04; 5,404; 5,004?",
            "options": [
              "5,004",
              "5,04",
              "5,4",
              "5,404"
            ],
            "answer": "5,004",
            "mascotHint": "Hàng phần nghìn nhỏ nhất: 5,004 có phần thập phân 0,004 bé nhất!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "0,5 = 0,50 = 0,500.",
              "So sánh phần nguyên trước; nếu bằng nhau thì so sánh hàng phần mười, phần trăm..."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l3",
      "title": "Bài 3: Viết số đo đại lượng dưới dạng số thập phân",
      "type": "learn",
      "description": "Viết số đo độ dài, khối lượng, diện tích bằng số thập phân (ví dụ: 3 m 5 dm = 3,5 m)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Số thập phân giúp ta viết số đo đại lượng vô cùng gọn gàng! Ví dụ: 2 m 7 cm = 2 và 7/100 m = 2,07 m! 📏"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cách chuyển đổi: - Độ dài: 5 m 6 dm = 5,6 m; 4 km 250 m = 4,25 km - Khối lượng: 2 kg 50 g = 2,05 kg; 3 tấn 500 kg = 3,5 tấn - Diện tích: 4 m² 25 dm² = 4,25 m² (vì 1 m² = 100 dm²)",
            "table": {
              "headers": [
                "Đổi",
                "Được"
              ],
              "rows": [
                [
                  "5 m 6 dm",
                  "5,6 m"
                ],
                [
                  "4 km 250 m",
                  "4,25 km"
                ],
                [
                  "2 kg 50 g",
                  "2,05 kg"
                ],
                [
                  "3 tấn 500 kg",
                  "3,5 tấn"
                ],
                [
                  "4 m² 25 dm²",
                  "4,25 m²"
                ]
              ],
              "label": "Viết số đo đại lượng dưới dạng số thập phân"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Viết số đo 3 m 45 cm dưới dạng số thập phân có đơn vị là mét:",
            "options": [
              "3,45 m",
              "34,5 m",
              "0,345 m",
              "3,045 m"
            ],
            "answer": "3,45 m",
            "mascotHint": "45 cm = 45/100 m = 0,45 m, nên là 3,45 m!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ quy tắc đổi:",
            "points": [
              "Xác định mối quan hệ giữa 2 đơn vị.",
              "Viết dưới dạng hỗn số rồi chuyển sang số thập phân."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l4",
      "title": "Bài 4: Phép cộng số thập phân & Tổng nhiều số",
      "type": "learn",
      "description": "Đặt tính sao cho các chữ số ở cùng một hàng và dấu phẩy thẳng cột với nhau",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Quy tắc vàng khi cộng số thập phân: Đặt các dấu phẩy thẳng cột với nhau! Cộng như cộng số tự nhiên rồi hạ dấu phẩy thẳng cột xuống kết quả! ➕"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặt tính cộng: 15,82 + 9,35 -------- 25,17 (Hạ dấu phẩy thẳng cột xuống giữa 25 và 17)",
            "table": {
              "headers": [
                "Phép tính",
                "Kết quả"
              ],
              "rows": [
                [
                  "15,82 + 9,35",
                  "25,17"
                ],
                [
                  "12,5 + 3,75 + 8,25",
                  "24,50"
                ]
              ],
              "label": "Cộng số thập phân — đặt dấu phẩy thẳng cột rồi hạ xuống kết quả"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi cộng: 38,5 + 24,15",
            "cotTinh": {
              "left": "38,5",
              "right": "24,15",
              "sign": "+"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 38,5 + 24,15 = ?",
            "options": [
              "62,65",
              "62,20",
              "63,65",
              "62,55"
            ],
            "answer": "62,65",
            "mascotHint": "38,50 + 24,15 = 62,65!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Dấu phẩy thẳng cột.",
              "Cộng như số tự nhiên, nhớ hạ dấu phẩy."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l5",
      "title": "Bài 5: Phép trừ hai số thập phân",
      "type": "learn",
      "description": "Đặt tính dấu phẩy thẳng cột; thêm số 0 vào phần thập phân nếu cần để trừ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Khi trừ số thập phân, nếu số chữ số phần thập phân của số bị trừ ít hơn số trừ, ta có thể viết thêm các chữ số 0 vào bên phải để trừ dễ dàng! ➖"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: 45,8 - 19,25 Viết thành: 45,80 - 19,25 = 26,55",
            "table": {
              "headers": [
                "Phép tính",
                "Cách làm"
              ],
              "rows": [
                [
                  "45,8 − 19,25",
                  "viết 45,80 − 19,25"
                ],
                [
                  "Kết quả",
                  "26,55"
                ]
              ],
              "label": "Trừ số thập phân — thêm chữ số 0 cho đủ hàng rồi trừ"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi trừ: 50 − 23,75",
            "cotTinh": {
              "left": 50,
              "right": "23,75",
              "sign": "−"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 50 - 23,75 = ?",
            "options": [
              "26,25",
              "27,25",
              "26,35",
              "27,35"
            ],
            "answer": "26,25",
            "mascotHint": "50,00 - 23,75 = 26,25!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ phép trừ:",
            "points": [
              "Viết thêm số 0 vào bên phải phần thập phân nếu cần.",
              "Dấu phẩy luôn thẳng hàng."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l6",
      "title": "Bài 6: Phép nhân số thập phân",
      "type": "learn",
      "description": "Nhân như nhân số tự nhiên; đếm số chữ số phần thập phân của cả hai thừa số để tách dấu phẩy",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Quy tắc nhân số thập phân: Nhân như số tự nhiên! Sau đó đếm xem trong phần thập phân của cả hai thừa số có bao nhiêu chữ số rồi dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái! ✖️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ: 2,35 × 1,4 - Nhân 235 × 14 = 3290 - Hai thừa số có 2 + 1 = 3 chữ số ở phần thập phân - Tách 3 chữ số từ phải sang trái: 3,290 = 3,29 Nhân nhẩm với 10, 100, 1000: Dịch dấu phẩy sang phải 1, 2, 3 chữ số!",
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Nhân như số tự nhiên",
                  "235 × 14 = 3 290"
                ],
                [
                  "Đếm chữ số thập phân",
                  "2 + 1 = 3 chữ số"
                ],
                [
                  "Tách dấu phẩy",
                  "3 290 ⇒ 3,290 = 3,29"
                ]
              ],
              "label": "2,35 × 1,4 = 3,29 — nhân với 10, 100 thì dịch dấu phẩy sang PHẢI"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 3,45 × 10 = ?",
            "options": [
              34.5,
              345,
              0.345,
              3450
            ],
            "answer": 34.5,
            "mascotHint": "Chuyển dấu phẩy sang bên phải một chữ số: 34,5!"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bé đặt tính rồi nhân: 1,2 × 0,4",
            "cotTinh": {
              "left": "1,2",
              "right": "0,4",
              "sign": "×"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 1,2 × 0,4 = ?",
            "options": [
              0.48,
              4.8,
              0.048,
              48
            ],
            "answer": 0.48,
            "mascotHint": "12 × 4 = 48. Có 1 + 1 = 2 chữ số thập phân, nên là 0,48!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Nhân như số tự nhiên.",
              "Đếm tổng số chữ số thập phân của 2 thừa số rồi tách ở tích."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l7",
      "title": "Bài 7: Phép chia số thập phân",
      "type": "learn",
      "description": "Chia số thập phân cho số tự nhiên; chia cho 10, 100; chia số tự nhiên cho số tự nhiên ra thương thập phân; chia cho số thập phân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Chia số thập phân cho số tự nhiên: Chia phần nguyên trước, trước khi lấy chữ số đầu tiên của phần thập phân thì viết dấu phẩy vào bên phải thương! ➗"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Chia cho số thập phân (ví dụ: 12 : 2,5): - Số chia có 1 chữ số thập phân, ta chuyển dấu phẩy ở cả hai số sang phải 1 vị trí: thành 120 : 25 = 4,8! Chia nhẩm cho 10, 100, 1000: Dịch dấu phẩy sang TRÁI 1, 2, 3 chữ số.",
            "table": {
              "headers": [
                "Phép tính",
                "Cách làm"
              ],
              "rows": [
                [
                  "12 : 2,5",
                  "số chia có 1 chữ số thập phân ⇒ dịch phẩy cả hai số: 120 : 25"
                ],
                [
                  "Kết quả",
                  "4,8"
                ],
                [
                  "Chia cho 10, 100",
                  "dịch dấu phẩy sang TRÁI"
                ]
              ],
              "label": "Chia số thập phân"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 45,6 : 10 = ?",
            "options": [
              4.56,
              456,
              0.456,
              45.6
            ],
            "answer": 4.56,
            "mascotHint": "Dịch dấu phẩy sang trái 1 chữ số: 4,56!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 15 : 4 = ?",
            "options": [
              3.75,
              3.5,
              3.25,
              4
            ],
            "answer": 3.75,
            "mascotHint": "15 : 4 = 3 dư 3. Thêm dấu phẩy và thêm 0: 30 : 4 = 7 dư 2; 20 : 4 = 5, nên là 3,75!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ phép chia:",
            "points": [
              "Đặt dấu phẩy vào thương ngay khi chia sang phần thập phân.",
              "Bỏ dấu phẩy ở số chia bằng cách chuyển dấu phẩy ở cả 2 số sang phải."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l8",
      "title": "Bài 8: Tỉ số phần trăm",
      "type": "learn",
      "description": "Khái niệm tỉ số phần trăm và ký hiệu % (1% = 1/100)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "1 phần trăm viết là 1%! 100 phần trăm là 100% (toàn bộ). Tỉ số phần trăm xuất hiện khắp nơi trong đời sống: giảm giá 20%, pin điện thoại 85%! 📱🏷️"
          }
        },
        {
          type: "visual",
          content: {
            "text": "Cách viết: - 1/100 = 0,01 = 1% - 35/100 = 0,35 = 35% - 3/4 = 75/100 = 75% Muốn tìm tỉ số phần trăm của hai số a và b: 1. Tìm thương của a và b: a : b 2. Nhân thương đó với 100 và viết thêm ký hiệu %.",
            "pieChart": {
              "title": "3/4 = 75% — tỉ số phần trăm là phân số có mẫu 100",
              "items": [
                {
                  "label": "3/4 = 75%",
                  "percent": 75
                },
                {
                  "label": "1/4 còn lại",
                  "percent": 25
                }
              ]
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "Tỉ số phần trăm của a và b: lấy a : b rồi nhân 100, thêm kí hiệu %",
            "table": {
              "headers": [
                "Viết",
                "Nghĩa"
              ],
              "rows": [
                [
                  "1/100 = 0,01 = 1%",
                  "một phần trăm"
                ],
                [
                  "35/100 = 0,35 = 35%",
                  "ba mươi lăm phần trăm"
                ],
                [
                  "3/4 = 75/100 = 75%",
                  "bảy mươi lăm phần trăm"
                ]
              ],
              "label": "Tỉ số phần trăm của a và b: lấy a : b rồi nhân 100, thêm kí hiệu %"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tỉ số phần trăm của 3 và 5 là:",
            "options": [
              "60%",
              "30%",
              "50%",
              "75%"
            ],
            "answer": "60%",
            "mascotHint": "3 : 5 = 0,6 = 60%!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "a : b = thương, nên là thương × 100 rồi thêm ký hiệu %.",
              "100% = 1."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l9",
      "title": "Bài 9: Giải toán về tỉ số phần trăm (3 bài toán cơ bản)",
      "type": "learn",
      "description": "1. Tìm tỉ số % của 2 số; 2. Tìm giá trị % của 1 số; 3. Tìm 1 số biết giá trị % của nó",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "3 bài toán tỉ số phần trăm kinh điển: 1. Tìm tỉ số %: a : b × 100% 2. Tìm a% của B: B × a : 100 3. Tìm số biết a% là B: B : a × 100! 💡"
          }
        },
        {
          type: "visual",
          content: {
            "text": "Ví dụ: Lớp có 40 học sinh, trong đó có 60% là nữ. Số học sinh nữ là: 40 × 60 : 100 = 24 học sinh.",
            "pieChart": {
              "title": "Lớp có 40 học sinh, 60% là nữ",
              "items": [
                {
                  "label": "Nữ 60% = 24 bạn",
                  "percent": 60
                },
                {
                  "label": "Nam 40% = 16 bạn",
                  "percent": 40
                }
              ]
            }
          },
        },
        {
          type: "visual",
          content: {
            "text": "40 × 60 : 100 = 24 học sinh nữ",
            "table": {
              "headers": [
                "Dạng toán",
                "Cách làm"
              ],
              "rows": [
                [
                  "Tìm % của một số",
                  "số đó × số phần trăm : 100"
                ],
                [
                  "Tìm tỉ số % của hai số",
                  "a : b × 100"
                ],
                [
                  "Tìm số khi biết % của nó",
                  "giá trị : số phần trăm × 100"
                ]
              ],
              "label": "40 × 60 : 100 = 24 học sinh nữ"
            }
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm 25% của 80 kg gạo:",
            "options": [
              20,
              25,
              30,
              15
            ],
            "answer": 20,
            "mascotHint": "80 × 25 : 100 = 20 kg!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Biết 30% của một số là 45. Số đó là:",
            "options": [
              150,
              120,
              135,
              160
            ],
            "answer": 150,
            "mascotHint": "45 : 30 × 100 = 1,5 × 100 = 150!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "3 Công thức vàng:",
            "points": [
              "Dạng 1: a : b × 100%",
              "Dạng 2: B × % : 100",
              "Dạng 3: B : % × 100"
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c2-l10",
      "title": "Bài 10: Máy tính bỏ túi & Luyện tập chung Chương 2",
      "type": "learn",
      "description": "Làm quen các phím cơ bản trên máy tính bỏ túi và ôn tập số thập phân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Máy tính bỏ túi là công cụ đắc lực giúp kiểm tra lại kết quả tính toán nhanh chóng! Nhớ sử dụng phím ON/C để bật và xóa màn hình nhé! 📲"
          }
        },
        {
          "type": "concept",
          "content": {
            "table": {
              "headers": [
                "Dạng",
                "Ví dụ"
              ],
              "rows": [
                [
                  "Cộng",
                  "15,82 + 9,35 = 25,17"
                ],
                [
                  "Trừ",
                  "45,80 − 19,25 = 26,55"
                ],
                [
                  "Nhân",
                  "2,35 × 1,4 = 3,29"
                ],
                [
                  "Chia",
                  "12 : 2,5 = 4,8"
                ],
                [
                  "Phần trăm",
                  "40 × 60 : 100 = 24"
                ]
              ],
              "label": "Máy tính chỉ để KIỂM TRA kết quả, không thay cho việc tự tính"
            },
            "badge": "Kiến Thức Trọng Tâm",
            "title": "Máy tính bỏ túi & Luyện tập chung Chương 2",
            "explanation": "Luyện tập chung các phép tính với số thập phân và dùng máy tính bỏ túi.",
            "points": [
              "Cộng, trừ, nhân, chia số thập phân: đặt tính như số tự nhiên rồi đặt dấu phẩy đúng vị trí.",
              "Máy tính bỏ túi giúp kiểm tra lại kết quả đã tính.",
              "Tỉ số phần trăm: 25% của 80 bằng 80 × 25 : 100 = 20."
            ],
            "rule": "Máy tính chỉ để kiểm tra kết quả, không thay cho việc tự tính."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính nhẩm: 4,5 × 0,1 = ?",
            "options": [
              0.45,
              45,
              0.045,
              4.5
            ],
            "answer": 0.45,
            "mascotHint": "Nhân với 0,1 bằng chia cho 10: 4,5 : 10 = 0,45!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Tổng kết Chương 2:",
            "points": [
              "Thành thạo 4 phép tính với số thập phân.",
              "Vận dụng linh hoạt 3 bài toán tỉ số phần trăm."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
