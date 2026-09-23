export const g4c1 = {
  "id": "g4-c1",
  "name": "Chương 1: Số tự nhiên & Bảng đơn vị đo khối lượng",
  "description": "Đọc, viết, so sánh số có nhiều chữ số đến lớp triệu; bảng khối lượng yến, tạ, tấn; giây, thế kỉ, trung bình cộng, biểu đồ cột",
  "icon": "🔢",
  "color": "#3b82f6",
  "totalLessons": 12,
  "lessons": [
    {
      "id": "g4-c1-l1",
      "title": "Bài 1: Ôn tập các số đến 100 000",
      "type": "learn",
      "description": "Đọc, viết các số trong phạm vi 100 000, cấu tạo thập phân của số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Chào mừng các bạn đến với Toán lớp 4! Robot và Cú Mèo rất vui được đồng hành cùng các bạn. Hôm nay chúng mình cùng ôn lại các số đến 100 000 nhé! 🦉🤖"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Số 68 352 gồm: 6 chục nghìn, 8 nghìn, 3 trăm, 5 chục và 2 đơn vị. Viết thành tổng: 68 352 = 60 000 + 8 000 + 300 + 50 + 2",
            "placeValue": {
              "headers": [
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                6,
                8,
                3,
                5,
                2
              ],
              "label": "68 352 = 60 000 + 8 000 + 300 + 50 + 2"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số 'Tám mươi lăm nghìn ba trăm linh hai' được viết là:",
            "options": [
              "85 302",
              "85 320",
              "85 032",
              "80 532"
            ],
            "answer": "85 302",
            "mascotHint": "Chữ số hàng chục là 0 (linh hai), đơn vị là 2!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số liền trước của số 100 000 là số nào?",
            "options": [
              "99 999",
              "99 990",
              "90 000",
              "100 001"
            ],
            "answer": "99 999",
            "mascotHint": "Muốn tìm số liền trước, ta lấy số đó trừ đi 1: 100 000 - 1 = 99 999"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ bài học:",
            "points": [
              "Đọc số từ trái sang phải, tách theo từng lớp 3 chữ số.",
              "Số liền trước = Số đã cho - 1; Số liền sau = Số đã cho + 1."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l2",
      "title": "Bài 2: Biểu thức có chứa một chữ",
      "type": "learn",
      "description": "Làm quen với biểu thức dạng a + b, 5 + a; tính giá trị của biểu thức khi biết giá trị của chữ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Hôm nay chúng mình làm quen với một người bạn mới rất thú vị: Biểu thức có chứa chữ! Ví dụ: 3 + a, nếu a = 2 thì giá trị là 3 + 2 = 5! 💡"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Nếu a = 6 thì giá trị của biểu thức 15 + a là: 15 + 6 = 21. Mỗi lần thay chữ a bằng số, ta tính được một giá trị của biểu thức 15 + a.",
            "table": {
              "headers": [
                "a",
                "Giá trị của 15 + a"
              ],
              "rows": [
                [
                  6,
                  21
                ],
                [
                  10,
                  25
                ],
                [
                  0,
                  15
                ]
              ],
              "label": "Mỗi lần thay chữ a bằng một số, ta tính được MỘT giá trị của biểu thức"
            },
            "operation": {
              "left": 15,
              "sign": "+",
              "right": 6,
              "result": 21
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính giá trị của biểu thức 25 - b với b = 7:",
            "options": [
              18,
              17,
              32,
              19
            ],
            "answer": 18,
            "mascotHint": "Thay b = 7 vào: 25 - 7 = 18!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính giá trị của biểu thức 120 : x với x = 4:",
            "options": [
              30,
              40,
              35,
              480
            ],
            "answer": 30,
            "mascotHint": "Thay x = 4 vào: 120 : 4 = 30!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Quy tắc cần nhớ:",
            "points": [
              "Biểu thức có chứa một chữ gồm các số, dấu phép tính và một chữ cái.",
              "Thay chữ bằng số rồi thực hiện phép tính để tìm giá trị biểu thức."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l3",
      "title": "Bài 3: Các số có sáu chữ số & Hàng trăm nghìn",
      "type": "learn",
      "description": "Hàng trăm nghìn, cấu tạo số có sáu chữ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "10 chục nghìn gọi là 1 trăm nghìn (viết là 100 000). Số có 6 chữ số có hàng cao nhất là hàng trăm nghìn! 🚀"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Số 432 516: - Chữ số 4 ở hàng trăm nghìn, có giá trị 400 000. - Chữ số 3 ở hàng chục nghìn, 2 ở hàng nghìn. - Chữ số 5 ở hàng trăm, 1 ở hàng chục, 6 ở hàng đơn vị.",
            "placeValue": {
              "headers": [
                "Trăm nghìn",
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                4,
                3,
                2,
                5,
                1,
                6
              ],
              "label": "Số 432 516 — chữ số 4 ở hàng trăm nghìn, có giá trị 400 000"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong số 742 815, chữ số 7 thuộc hàng nào?",
            "options": [
              "Hàng trăm nghìn",
              "Hàng chục nghìn",
              "Hàng triệu",
              "Hàng trăm"
            ],
            "answer": "Hàng trăm nghìn",
            "mascotHint": "Đếm từ phải qua trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số gồm 5 trăm nghìn, 7 chục và 3 đơn vị viết là:",
            "options": [
              "500 073",
              "507 003",
              "570 003",
              "500 730"
            ],
            "answer": "500 073",
            "mascotHint": "Hàng chục nghìn, nghìn, trăm đều bằng 0, viết là 500 073!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "10 chục nghìn = 1 trăm nghìn (100 000).",
              "Số nhỏ nhất có 6 chữ số là 100 000, số lớn nhất là 999 999."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l4",
      "title": "Bài 4: Hàng và Lớp",
      "type": "learn",
      "description": "Lớp đơn vị (đơn vị, chục, trăm) và Lớp nghìn (nghìn, chục nghìn, trăm nghìn)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Để đọc và viết số lớn thật dễ dàng, các nhà toán học chia các hàng thành từng LỚP, mỗi lớp gồm 3 hàng liên tiếp! 🏢"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Bảng phân chia Hàng và Lớp: - LỚP NGHÌN: Hàng trăm nghìn, Hàng chục nghìn, Hàng nghìn - LỚP ĐƠN VỊ: Hàng trăm, Hàng chục, Hàng đơn vị",
            "table": {
              "headers": [
                "Lớp",
                "Gồm các hàng"
              ],
              "rows": [
                [
                  "Lớp nghìn",
                  "trăm nghìn · chục nghìn · nghìn"
                ],
                [
                  "Lớp đơn vị",
                  "trăm · chục · đơn vị"
                ]
              ],
              "label": "Bảng phân chia Hàng và Lớp — 3 hàng liền nhau hợp thành 1 lớp"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số 325 418 có các chữ số thuộc lớp nghìn là:",
            "options": [
              "3, 2, 5",
              "4, 1, 8",
              "3, 2, 4",
              "2, 5, 4"
            ],
            "answer": "3, 2, 5",
            "mascotHint": "Lớp nghìn gồm 3 chữ số đầu tiên bên trái: 3 trăm nghìn, 2 chục nghìn, 5 nghìn!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Lớp đơn vị: hàng đơn vị, hàng chục, hàng trăm.",
              "Lớp nghìn: hàng nghìn, hàng chục nghìn, hàng trăm nghìn."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l5",
      "title": "Bài 5: So sánh các số có nhiều chữ số",
      "type": "learn",
      "description": "Quy tắc so sánh số có số chữ số khác nhau và cùng số chữ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Khi so sánh hai số tự nhiên, số nào có nhiều chữ số hơn thì số đó lớn hơn! Nếu cùng số chữ số thì so sánh từng cặp từ trái sang phải! ⚖️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ 1: 100 000 > 99 999 (vì 6 chữ số > 5 chữ số) Ví dụ 2: 753 210 > 751 980 (hàng trăm nghìn và chục nghìn bằng nhau, hàng nghìn có 3 > 1).",
            "comparison": {
              "left": 100000,
              "sign": ">",
              "right": 99999
            },
            "table": {
              "headers": [
                "So sánh",
                "Vì sao"
              ],
              "rows": [
                [
                  "100 000 > 99 999",
                  "6 chữ số nhiều hơn 5 chữ số"
                ],
                [
                  "753 210 > 751 980",
                  "cùng hàng trăm nghìn, chục nghìn; hàng nghìn 3 > 1"
                ]
              ],
              "label": "So sánh các số có nhiều chữ số: so từ hàng cao nhất"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Điền dấu thích hợp: 98 765 ... 102 345",
            "options": [
              "<",
              ">",
              "="
            ],
            "answer": "<",
            "mascotHint": "98 765 có 5 chữ số, 102 345 có 6 chữ số, nên 98 765 < 102 345."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số nào lớn nhất trong các số: 456 789; 456 879; 456 987; 456 897?",
            "options": [
              "456 987",
              "456 879",
              "456 897",
              "456 789"
            ],
            "answer": "456 987",
            "mascotHint": "So sánh hàng trăm: 9 > 8 > 7, nên 456 987 lớn nhất!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Quy tắc so sánh:",
            "points": [
              "Số có nhiều chữ số hơn, nên Lớn hơn.",
              "Nếu bằng số chữ số, nên So sánh từ hàng cao nhất (trái sang phải)."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l6",
      "title": "Bài 6: Triệu và Lớp triệu",
      "type": "learn",
      "description": "Làm quen với 1 triệu, 10 triệu, 100 triệu và Lớp triệu",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "10 trăm nghìn gọi là 1 triệu (viết là 1 000 000 - gồm 1 chữ số 1 và 6 chữ số 0)! Lớp triệu gồm hàng triệu, chục triệu, trăm triệu! 🌟"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Cấu tạo Lớp triệu: - Hàng triệu: 1 000 000 - Hàng chục triệu: 10 000 000 - Hàng trăm triệu: 100 000 000 Số 345 000 000 đọc là: Ba trăm bốn mươi lăm triệu.",
            "placeValue": {
              "headers": [
                "Trăm triệu",
                "Chục triệu",
                "Triệu",
                "Trăm nghìn",
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                3,
                4,
                5,
                0,
                0,
                0,
                0,
                0,
                0
              ],
              "label": "345 000 000 đọc là ba trăm bốn mươi lăm triệu"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số một triệu có bao nhiêu chữ số 0?",
            "options": [
              6,
              5,
              7,
              8
            ],
            "answer": 6,
            "mascotHint": "1 000 000 có 6 chữ số 0 đứng sau chữ số 1!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong số 52 489 120, lớp triệu gồm các chữ số:",
            "options": [
              "5, 2",
              "4, 8, 9",
              "1, 2, 0",
              "5, 2, 4"
            ],
            "answer": "5, 2",
            "mascotHint": "5 thuộc hàng chục triệu, 2 thuộc hàng triệu, nên Lớp triệu gồm 5 và 2!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Lớp triệu gồm 3 hàng: hàng triệu, hàng chục triệu, hàng trăm triệu.",
              "1 tỉ = 10 trăm triệu = 1 000 000 000 (9 chữ số 0)."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l7",
      "title": "Bài 7: Dãy số tự nhiên và Hệ thập phân",
      "type": "learn",
      "description": "Đặc điểm của dãy số tự nhiên: 0, 1, 2, 3... và quy tắc ghi số trong hệ thập phân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Dãy số tự nhiên bắt đầu từ số 0: 0, 1, 2, 3, 4, 5... Dãy số này kéo dài mãi mãi và không có số tự nhiên lớn nhất! ♾️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Số tự nhiên bé nhất là số 0. - Không có số tự nhiên lớn nhất. - Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị. - Dùng 10 chữ số (0 đến 9) để viết mọi số tự nhiên trong hệ thập phân.",
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
              "label": "Số tự nhiên bé nhất là 0 · không có số tự nhiên lớn nhất · hai số liên tiếp hơn kém nhau 1"
            },
            "table": {
              "headers": [
                "Đặc điểm",
                "Nội dung"
              ],
              "rows": [
                [
                  "Bé nhất",
                  "số 0"
                ],
                [
                  "Lớn nhất",
                  "không có"
                ],
                [
                  "Hai số liên tiếp",
                  "hơn kém nhau 1 đơn vị"
                ],
                [
                  "Chữ số dùng để viết",
                  "0, 1, 2, 3, 4, 5, 6, 7, 8, 9"
                ]
              ],
              "label": "Dãy số tự nhiên và hệ thập phân"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số tự nhiên bé nhất là số nào?",
            "options": [
              0,
              1,
              -1,
              10
            ],
            "answer": 0,
            "mascotHint": "Số 0 là số tự nhiên bé nhất!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Ba số tự nhiên liên tiếp tăng dần là:",
            "options": [
              "99, 100, 101",
              "98, 100, 102",
              "100, 99, 98",
              "1, 3, 5"
            ],
            "answer": "99, 100, 101",
            "mascotHint": "Hai số liên tiếp cách nhau đúng 1 đơn vị: 99, 100, 101!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Số 0 là số tự nhiên nhỏ nhất.",
              "Dãy số tự nhiên là vô tận, cứ thêm 1 vào một số ta được số liền sau."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l8",
      "title": "Bài 8: Viết số tự nhiên trong hệ thập phân",
      "type": "learn",
      "description": "Giá trị của mỗi chữ số phụ thuộc vào vị trí (hàng) của nó trong số đó",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cùng là chữ số 5 nhưng trong số 52 nó có giá trị là 50 (5 chục), còn trong số 500 nó có giá trị là 5 trăm! Đó là nét kỳ diệu của hệ thập phân! ✨"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Phân tích giá trị theo hàng: Số 7 245 = 7 000 + 200 + 40 + 5 - Chữ số 7 có giá trị: 7 000 - Chữ số 2 có giá trị: 200 - Chữ số 4 có giá trị: 40 - Chữ số 5 có giá trị: 5",
            "placeValue": {
              "headers": [
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị"
              ],
              "digits": [
                7,
                2,
                4,
                5
              ],
              "label": "7 245 = 7 000 + 200 + 40 + 5"
            },
            "table": {
              "headers": [
                "Chữ số",
                "Giá trị"
              ],
              "rows": [
                [
                  "7",
                  "7 000"
                ],
                [
                  "2",
                  "200"
                ],
                [
                  "4",
                  "40"
                ],
                [
                  "5",
                  "5"
                ]
              ],
              "label": "Giá trị của mỗi chữ số phụ thuộc vào HÀNG của nó"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong số 854 120, chữ số 5 có giá trị là bao nhiêu?",
            "options": [
              "50 000",
              "5 000",
              "500 000",
              "500"
            ],
            "answer": "50 000",
            "mascotHint": "Chữ số 5 ở hàng chục nghìn nên có giá trị là 5 chục nghìn = 50 000!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Cứ 10 đơn vị ở một hàng hợp thành 1 đơn vị ở hàng trên liền kề.",
              "Giá trị chữ số = Chữ số × Giá trị của hàng."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l9",
      "title": "Bài 9: Bảng đơn vị đo khối lượng: Yến, tạ, tấn",
      "type": "learn",
      "description": "Làm quen với yến, tạ, tấn và mối quan hệ giữa các đơn vị đo khối lượng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Để đo khối lượng những con voi, xe tải chở hàng lớn, người ta dùng các đơn vị: yến, tạ, tấn! 🐘🚚"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Mối quan hệ đo khối lượng: 1 yến = 10 kg 1 tạ = 10 yến = 100 kg 1 tấn = 10 tạ = 1 000 kg Bảng đơn vị: Tấn > Tạ > Yến > kg > hg > dag > g (mỗi đơn vị gấp 10 lần đơn vị liền sau).",
            "table": {
              "headers": [
                "Đổi",
                "Bằng"
              ],
              "rows": [
                [
                  "1 yến",
                  "10 kg"
                ],
                [
                  "1 tạ",
                  "10 yến = 100 kg"
                ],
                [
                  "1 tấn",
                  "10 tạ = 1 000 kg"
                ]
              ],
              "label": "Tấn > Tạ > Yến > kg > hg > dag > g — mỗi đơn vị gấp 10 lần đơn vị liền sau"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "5 tấn bằng bao nhiêu ki-lô-gam?",
            "options": [
              "5 000 kg",
              "500 kg",
              "50 kg",
              "50 000 kg"
            ],
            "answer": "5 000 kg",
            "mascotHint": "1 tấn = 1 000 kg nên 5 tấn = 5 × 1 000 = 5 000 kg!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đổi: 3 tạ 5 yến = ... yến",
            "options": [
              35,
              305,
              350,
              30
            ],
            "answer": 35,
            "mascotHint": "3 tạ = 30 yến. 30 + 5 = 35 yến!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ bảng đo khối lượng:",
            "points": [
              "1 tấn = 10 tạ = 1 000 kg.",
              "1 tạ = 10 yến = 100 kg.",
              "1 yến = 10 kg."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l10",
      "title": "Bài 10: Giây và Thế kỉ",
      "type": "learn",
      "description": "Làm quen với đơn vị giây (1 phút = 60 giây) và thế kỉ (1 thế kỉ = 100 năm)",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Tích tắc tích tắc! Kim giây đồng hồ quay một vòng là được 1 phút (60 giây). Còn 100 năm trôi qua là trọn vẹn 1 thế kỉ! ⏳🕰️",
            "clock": {
              "hour": 8,
              "minute": 0
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Quy đổi thời gian: - 1 giờ = 60 phút - 1 phút = 60 giây - 1 thế kỉ = 100 năm Từ năm 1 đến năm 100 là thế kỉ I (thứ nhất). Từ năm 101 đến năm 200 là thế kỉ II (thứ hai). Năm 2024 thuộc thế kỉ XXI (thứ hai mươi mốt).",
            "table": {
              "headers": [
                "Đổi",
                "Bằng"
              ],
              "rows": [
                [
                  "1 giờ",
                  "60 phút"
                ],
                [
                  "1 phút",
                  "60 giây"
                ],
                [
                  "1 thế kỉ",
                  "100 năm"
                ]
              ],
              "label": "Năm 2024 thuộc thế kỉ XXI (thứ hai mươi mốt)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 phút 15 giây bằng bao nhiêu giây?",
            "options": [
              135,
              125,
              75,
              145
            ],
            "answer": 135,
            "mascotHint": "2 phút = 120 giây. 120 + 15 = 135 giây!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Năm 1945 thuộc thế kỉ nào?",
            "options": [
              "Thế kỉ XX",
              "Thế kỉ XIX",
              "Thế kỉ XXI",
              "Thế kỉ XVIII"
            ],
            "answer": "Thế kỉ XX",
            "mascotHint": "Từ năm 1901 đến năm 2000 là thế kỉ 20 (XX)!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "1 phút = 60 giây.",
              "1 thế kỉ = 100 năm."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l11",
      "title": "Bài 11: Tìm số trung bình cộng",
      "type": "learn",
      "description": "Quy tắc tìm số trung bình cộng của nhiều số: Tính tổng rồi chia cho số các số hạng",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Muốn chia đều bánh kẹo hay tìm số điểm trung bình, ta dùng bài toán Tìm số trung bình cộng! Rất dễ nhớ: Lấy tổng chia cho số số hạng! 🍰⚖️",
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
            "text": "Quy tắc: Số trung bình cộng = (Tổng các số hạng) : (Số các số hạng) Ví dụ: Tìm số TBC của 12, 14 và 16: Tổng = 12 + 14 + 16 = 42 Số số hạng = 3 Trung bình cộng = 42 : 3 = 14",
            "operation": {
              "left": 42,
              "sign": ":",
              "right": 3,
              "result": 14
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Tổng các số hạng",
                  "12 + 14 + 16 = 42"
                ],
                [
                  "Số các số hạng",
                  "3"
                ],
                [
                  "Trung bình cộng",
                  "42 : 3 = 14"
                ]
              ],
              "label": "Trung bình cộng = Tổng các số hạng : Số các số hạng"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm số trung bình cộng của 20 và 40:",
            "options": [
              30,
              25,
              35,
              60
            ],
            "answer": 30,
            "mascotHint": "Tổng = 20 + 40 = 60. TBC = 60 : 2 = 30!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Ba bạn có số vở lần lượt là 10, 15, 20 quyển. Trung bình mỗi bạn có bao nhiêu quyển vở?",
            "options": [
              15,
              16,
              14,
              45
            ],
            "answer": 15,
            "mascotHint": "(10 + 15 + 20) : 3 = 45 : 3 = 15 quyển!",
            "items": [
              {
                "emoji": "📔",
                "label": "Quyển vở",
                "count": 1
              }
            ]
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức vàng:",
            "points": [
              "Trung bình cộng = Tổng : Số lượng số hạng.",
              "Tổng các số = Trung bình cộng × Số lượng số hạng."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g4-c1-l12",
      "title": "Bài 12: Biểu đồ (Biểu đồ cột)",
      "type": "learn",
      "description": "Đọc, xử lý thông tin số liệu trên biểu đồ cột đơn giản",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Biểu đồ cột giúp chúng mình quan sát và so sánh số lượng giữa các nhóm một cách nhanh chóng và trực quan nhất! 📊"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Đặc điểm biểu đồ cột: - Cột nằm ngang ghi tên các đối tượng (ví dụ: Lớp 4A, 4B, 4C). - Cột thẳng đứng ghi số lượng (ví dụ: số cây trồng được). - Cột càng cao thì số lượng càng nhiều.",
            "barChart": {
              "title": "Số cây trồng được của các lớp",
              "items": [
                {
                  "label": "Lớp 4A",
                  "value": 15
                },
                {
                  "label": "Lớp 4B",
                  "value": 12
                },
                {
                  "label": "Lớp 4C",
                  "value": 18
                }
              ],
              "unit": "cây",
              "highlight": 2
            },
            "table": {
              "headers": [
                "Trục",
                "Ghi gì"
              ],
              "rows": [
                [
                  "Cột nằm ngang",
                  "tên các đối tượng"
                ],
                [
                  "Cột thẳng đứng",
                  "số lượng"
                ],
                [
                  "Cột càng cao",
                  "số lượng càng nhiều"
                ]
              ],
              "label": "Đặc điểm biểu đồ cột"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Nếu cột lớp 4A cao tới mức 35 cây, lớp 4B tới mức 40 cây, thì cả hai lớp trồng được bao nhiêu cây?",
            "options": [
              75,
              70,
              80,
              65
            ],
            "answer": 75,
            "mascotHint": "Tổng số cây = 35 + 40 = 75 cây!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Kỹ năng đọc biểu đồ:",
            "points": [
              "Quan sát tên hàng ngang và giá trị cột dọc.",
              "Dóng từ đỉnh cột sang trục số để đọc chính xác số liệu."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    }
  ]
};
