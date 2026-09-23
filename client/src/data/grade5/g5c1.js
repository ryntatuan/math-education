export const g5c1 = {
  "id": "g5-c1",
  "name": "Chương 1: Ôn tập phân số, Giải toán tỉ lệ & Bảng đơn vị diện tích",
  "description": "Ôn tập phân số, phân số thập phân, hỗn số; giải toán tỉ lệ thuận/nghịch; bảng đơn vị đo diện tích dam², hm², ha",
  "icon": "🍰",
  "color": "#3b82f6",
  "totalLessons": 12,
  "lessons": [
    {
      "id": "g5-c1-l1",
      "title": "Bài 1: Khái niệm, tính chất cơ bản & So sánh phân số",
      "type": "learn",
      "description": "Ôn tập cấu tạo phân số, tính chất cơ bản nhân/chia cùng một số, quy tắc so sánh phân số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Chào mừng các bạn đến với Toán Lớp 5! Robot và Cú Mèo sẽ cùng các bạn chinh phục năm học cuối cấp tiểu học thật xuất sắc nhé! 🦉🤖"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Phân số có tử số và mẫu số (khác 0). - Tính chất cơ bản: Nhân hoặc chia cả tử và mẫu với cùng số khác 0 được phân số bằng nó. - So sánh cùng mẫu: tử số lớn hơn thì lớn hơn. Khác mẫu: quy đồng rồi so sánh.",
            "fractionBar": {
              "rows": [
                {
                  "parts": 2,
                  "shaded": 1,
                  "label": "1/2 = 2/4"
                },
                {
                  "parts": 4,
                  "shaded": 2,
                  "label": "2/4 = 3/6"
                },
                {
                  "parts": 6,
                  "shaded": 3,
                  "label": "3/6"
                }
              ],
              "label": "Nhân hoặc chia cả tử và mẫu với cùng một số khác 0 thì được phân số bằng nó"
            },
            "table": {
              "headers": [
                "So sánh",
                "Cách làm"
              ],
              "rows": [
                [
                  "Cùng mẫu",
                  "tử số lớn hơn thì phân số lớn hơn"
                ],
                [
                  "Khác mẫu",
                  "quy đồng mẫu số rồi so sánh"
                ]
              ],
              "label": "Khái niệm, tính chất cơ bản & so sánh phân số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Phân số nào sau đây bằng phân số 3/5?",
            "options": [
              "9/15",
              "6/15",
              "9/10",
              "12/25"
            ],
            "answer": "9/15",
            "mascotHint": "Nhân cả tử và mẫu với 3: 3×3 / 5×3 = 9/15!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong các phân số 4/7; 5/7; 3/7; 6/7, phân số lớn nhất là:",
            "options": [
              "6/7",
              "5/7",
              "4/7",
              "3/7"
            ],
            "answer": "6/7",
            "mascotHint": "Cùng mẫu số 7, tử số 6 lớn nhất nên 6/7 lớn nhất!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Phân số tối giản không thể rút gọn thêm.",
              "So sánh với 1: Tử < Mẫu, nên là bé hơn 1; Tử > Mẫu, nên là lớn hơn 1."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l2",
      "title": "Bài 2: Phân số thập phân",
      "type": "learn",
      "description": "Các phân số có mẫu số là 10, 100, 1000... gọi là phân số thập phân",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Các phân số như 3/10, 25/100, 125/1000 có mẫu số là 10, 100, 1000... được gọi là PHÂN SỐ THẬP PHÂN! 💡"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Chuyển phân số thường thành phân số thập phân: - 1/2 = (1×5)/(2×5) = 5/10 - 3/4 = (3×25)/(4×25) = 75/100 - 7/20 = (7×5)/(20×5) = 35/100",
            "fractionBar": {
              "rows": [
                {
                  "parts": 10,
                  "shaded": 5,
                  "label": "1/2 = 5/10"
                },
                {
                  "parts": 100,
                  "shaded": 75,
                  "label": "3/4 = 75/100"
                },
                {
                  "parts": 100,
                  "shaded": 35,
                  "label": "7/20 = 35/100"
                }
              ],
              "label": "Phân số thập phân là phân số có mẫu số 10, 100, 1 000…"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Chuyển phân số 2/5 thành phân số thập phân có mẫu số 10:",
            "options": [
              "4/10",
              "2/10",
              "5/10",
              "6/10"
            ],
            "answer": "4/10",
            "mascotHint": "Nhân cả tử và mẫu với 2: (2×2)/(5×2) = 4/10!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Phân số thập phân có mẫu số là 10, 100, 1000...",
              "Muốn chuyển về phân số thập phân: tìm số nhân sao cho mẫu là 10, 100, 1000..."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l3",
      "title": "Bài 3: Ôn tập bốn phép tính với phân số",
      "type": "learn",
      "description": "Cộng, trừ, nhân, chia phân số và bài toán tìm phân số của một số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Cùng Robot ôn lại 4 phép tính phân số: - Cộng/trừ: quy đồng rồi tính. - Nhân: tử × tử, mẫu × mẫu. - Chia: nhân với phân số đảo ngược! 🔄"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ tổng hợp: - 2/3 + 1/4 = 8/12 + 3/12 = 11/12 - 3/5 × 10/9 = (3×10)/(5×9) = 30/45 = 2/3 - 2/7 : 4/5 = 2/7 × 5/4 = 10/28 = 5/14",
            "fractionBar": {
              "rows": [
                {
                  "parts": 12,
                  "shaded": 11,
                  "label": "2/3 + 1/4 = 8/12 + 3/12 = 11/12"
                },
                {
                  "parts": 15,
                  "shaded": 10,
                  "label": "3/5 × 10/9 = 30/45 = 2/3"
                },
                {
                  "parts": 14,
                  "shaded": 5,
                  "label": "2/7 : 4/5 = 10/28 = 5/14"
                }
              ],
              "label": "Ôn tập bốn phép tính với phân số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tính: 3/4 - 1/3 = ?",
            "options": [
              "5/12",
              "2/1",
              "2/12",
              "1/12"
            ],
            "answer": "5/12",
            "mascotHint": "9/12 - 4/12 = 5/12!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tìm 3/5 của 45 kg:",
            "options": [
              27,
              25,
              30,
              35
            ],
            "answer": 27,
            "mascotHint": "45 × 3/5 = (45 × 3) : 5 = 27 kg!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Quy tắc cốt lõi:",
            "points": [
              "Nhân: Tử nhân tử, mẫu nhân mẫu.",
              "Chia: Lấy phân số thứ nhất nhân phân số thứ hai đảo ngược."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l4",
      "title": "Bài 4: Hỗn số và các phép tính với hỗn số",
      "type": "learn",
      "description": "Khái niệm hỗn số gồm phần nguyên và phần phân số; cách chuyển hỗn số thành phân số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Có 2 cái bánh nguyên và 3/4 cái bánh, ta viết là 2 3/4 (đọc là hai và ba phần tư)! Đó chính là HỖN SỐ! 🥞"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Chuyển hỗn số thành phân số: Tử số = (Phần nguyên × Mẫu số) + Tử số cũ Mẫu số = Giữ nguyên mẫu số cũ Ví dụ: 2 3/4 = (2 × 4 + 3) / 4 = 11/4",
            "fractionCircle": {
              "parts": 4,
              "shaded": 3,
              "label": "2 3/4 = (2 × 4 + 3) / 4 = 11/4"
            },
            "table": {
              "headers": [
                "Thành phần",
                "Tính"
              ],
              "rows": [
                [
                  "Tử số mới",
                  "(phần nguyên × mẫu số) + tử số cũ"
                ],
                [
                  "Mẫu số mới",
                  "giữ nguyên mẫu số cũ"
                ]
              ],
              "label": "Chuyển hỗn số thành phân số"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Chuyển hỗn số 3 1/2 thành phân số:",
            "options": [
              "7/2",
              "5/2",
              "6/2",
              "4/2"
            ],
            "answer": "7/2",
            "mascotHint": "(3 × 2 + 1) / 2 = 7/2!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Công thức chuyển hỗn số:",
            "points": [
              "Tử số mới = Phần nguyên × Mẫu + Tử.",
              "Mẫu số mới giữ nguyên."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l5",
      "title": "Bài 5: Ôn tập và bổ sung về giải toán (Tỉ lệ thuận & nghịch)",
      "type": "learn",
      "description": "Phương pháp rút về đơn vị và phương pháp tìm tỉ số",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "thinking",
            "text": "Hai đại lượng tỉ lệ thuận: cái này tăng bao nhiêu lần thì cái kia tăng bấy nhiêu lần (mua nhiều bút tốn nhiều tiền). Tỉ lệ nghịch: cái này tăng bao nhiêu lần thì cái kia GIẢM bấy nhiêu lần (nhiều người làm thì tốn ít ngày)! ⚖️"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Ví dụ (Tỉ lệ thuận): Mua 5 quyển vở hết 40 000 đồng. Mua 8 quyển vở hết bao nhiêu tiền? Cách 1: Rút về đơn vị: 1 quyển hết 40 000 : 5 = 8 000 đồng, nên là 8 quyển hết 8 000 × 8 = 64 000 đồng.",
            "barModel": {
              "rows": [
                {
                  "label": "5 quyển",
                  "parts": 5
                },
                {
                  "label": "8 quyển",
                  "parts": 8
                }
              ],
              "braceLabel": "40 000 đồng ⇒ 64 000 đồng"
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "Rút về đơn vị",
                  "40 000 : 5 = 8 000 (đồng)"
                ],
                [
                  "Tính 8 quyển",
                  "8 000 × 8 = 64 000 (đồng)"
                ]
              ],
              "label": "Giải toán về quan hệ tỉ lệ (tỉ lệ thuận)"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một ô tô đi trong 2 giờ được 90 km. Hỏi với vận tốc đó, ô tô đi trong 4 giờ được bao nhiêu km?",
            "options": [
              180,
              160,
              200,
              135
            ],
            "answer": 180,
            "mascotHint": "Thời gian gấp 4 : 2 = 2 lần, nên quãng đường = 90 × 2 = 180 km!",
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
          "type": "quiz",
          "content": {
            "question": "Có 10 người đắp xong đoạn đường trong 6 ngày. Hỏi muốn đắp xong trong 3 ngày cần bao nhiêu người? (Mức làm như nhau)",
            "options": [
              20,
              15,
              12,
              18
            ],
            "answer": 20,
            "mascotHint": "Tỉ lệ nghịch: Thời gian giảm 6 : 3 = 2 lần, nên số người phải gấp 2 lần: 10 × 2 = 20 người!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ 2 phương pháp:",
            "points": [
              "Phương pháp 1: Rút về đơn vị.",
              "Phương pháp 2: Tìm tỉ số."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l6",
      "title": "Bài 6: Bảng đơn vị đo độ dài & Bảng đơn vị đo khối lượng",
      "type": "learn",
      "description": "Hệ thống hóa km, hm, dam, m, dm, cm, mm và tấn, tạ, yến, kg, hg, dag, g",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Hai đơn vị đo độ dài (hoặc khối lượng) liền kề hơn kém nhau đúng 10 lần! Đơn vị lớn gấp 10 lần đơn vị bé, đơn vị bé bằng 1/10 đơn vị lớn! 📏"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "- Bảng độ dài: km > hm > dam > m > dm > cm > mm (mỗi bước ×10 hoặc :10) - Bảng khối lượng: tấn > tạ > yến > kg > hg > dag > g",
            "table": {
              "headers": [
                "Bảng",
                "Các đơn vị (lớn đến bé)"
              ],
              "rows": [
                [
                  "Độ dài",
                  "km > hm > dam > m > dm > cm > mm"
                ],
                [
                  "Khối lượng",
                  "tấn > tạ > yến > kg > hg > dag > g"
                ]
              ],
              "label": "Hai đơn vị liền nhau hơn kém nhau 10 lần"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "3 km 50 m bằng bao nhiêu mét?",
            "options": [
              3050,
              3500,
              3005,
              350
            ],
            "answer": 3050,
            "mascotHint": "3 km = 3000 m. 3000 + 50 = 3050 m!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Mỗi đơn vị đo độ dài/khối lượng gấp 10 lần đơn vị bé hơn liền kề.",
              "Mỗi đơn vị bé bằng 1/10 (hay 0,1) đơn vị lớn liền kề."
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l7",
      "title": "Bài 7: Đề-ca-mét vuông (dam²), Héc-tô-mét vuông (hm²)",
      "type": "learn",
      "description": "Các đơn vị đo diện tích đất: 1 dam² = 100 m²; 1 hm² = 100 dam² = 10 000 m²",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Đề-ca-mét vuông (dam²) là diện tích hình vuông cạnh 1 dam (10 m). Héc-tô-mét vuông (hm²) là diện tích hình vuông cạnh 1 hm (100 m)! 🟩",
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
            "text": "Bảng đơn vị đo diện tích: km² > hm² > dam² > m² > dm² > cm² > mm² Chú ý: Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 LẦN! 1 hm² = 100 dam² = 10 000 m²",
            "table": {
              "headers": [
                "Đổi",
                "Bằng"
              ],
              "rows": [
                [
                  "1 hm²",
                  "100 dam²"
                ],
                [
                  "1 hm²",
                  "10 000 m²"
                ],
                [
                  "1 dam²",
                  "100 m²"
                ]
              ],
              "label": "km² > hm² > dam² > m² > dm² > cm² > mm² — hai đơn vị liền nhau hơn kém 100 lần"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "2 hm² bằng bao nhiêu mét vuông?",
            "options": [
              20000,
              2000,
              200,
              200000
            ],
            "answer": 20000,
            "mascotHint": "1 hm² = 10 000 m² nên 2 hm² = 20 000 m²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ bảng diện tích:",
            "points": [
              "Mỗi đơn vị đo diện tích gấp 100 lần đơn vị bé hơn liền sau.",
              "1 hm² = 100 dam² = 10 000 m²."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l8",
      "title": "Bài 8: Héc-ta (ha)",
      "type": "learn",
      "description": "Đơn vị đo diện tích đất nông, lâm nghiệp: 1 ha = 1 hm² = 10 000 m²",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "excited",
            "text": "Trong đời sống thực tế, người ta thường dùng đơn vị Héc-ta (viết tắt là ha) để đo diện tích các trang trại, cánh đồng lúa, cánh rừng! 🌾🌲"
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Quy đổi héc-ta: 1 ha = 1 hm² = 10 000 m² 1 km² = 100 ha Một sân bóng đá tiêu chuẩn có diện tích gần bằng 1 ha đấy!",
            "table": {
              "headers": [
                "Đổi",
                "Bằng"
              ],
              "rows": [
                [
                  "1 ha",
                  "1 hm² = 10 000 m²"
                ],
                [
                  "1 km²",
                  "100 ha"
                ]
              ],
              "label": "Héc-ta — sân bóng đá tiêu chuẩn rộng gần bằng 1 ha"
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Khu rừng có diện tích 5 ha, diện tích khu rừng đó bằng bao nhiêu mét vuông?",
            "options": [
              "50 000 m²",
              "5 000 m²",
              "500 m²",
              "500 000 m²"
            ],
            "answer": "50 000 m²",
            "mascotHint": "1 ha = 10 000 m² nên 5 ha = 50 000 m²!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Đổi: 4 km² = ... ha",
            "options": [
              400,
              40,
              4000,
              40000
            ],
            "answer": 400,
            "mascotHint": "1 km² = 100 ha nên 4 km² = 400 ha!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ héc-ta:",
            "points": [
              "1 ha = 10 000 m²",
              "1 km² = 100 ha"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l10",
      "title": "Bài 9: Luyện tập so sánh phân số",
      "type": "learn",
      "description": "Ba mẹo so sánh phân số nhanh và chính xác",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Có ba mẹo so sánh phân số cực nhanh: so với 1, quy đồng mẫu số và dùng phân số trung gian! ⚡"
          }
        },
        {
          "type": "concept",
          "content": {
            "fractionBar": {
              "rows": [
                {
                  "parts": 5,
                  "shaded": 3,
                  "label": "3/5 < 1"
                },
                {
                  "parts": 5,
                  "shaded": 5,
                  "label": "5/5 = 1"
                }
              ],
              "label": "So với 1 trước — mẹo nhanh nhất và ít sai nhất"
            },
            "badge": "Ba Mẹo So Sánh",
            "title": "So sánh phân số nhanh",
            "points": [
              "So với 1: tử bé hơn mẫu ⇒ bé hơn 1; tử lớn hơn mẫu ⇒ lớn hơn 1.",
              "Quy đồng mẫu số rồi so sánh tử số (mẫu đã bằng nhau).",
              "Cùng tử số: phân số nào có mẫu bé hơn thì lớn hơn."
            ],
            "rule": "So với 1 trước — đó là mẹo nhanh nhất và ít sai nhất."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Không cần quy đồng, phân số nào sau đây lớn hơn 1?",
            "options": [
              "7/5",
              "3/4",
              "5/9",
              "2/3"
            ],
            "answer": "7/5",
            "mascotHint": "7 lớn hơn 5 nên 7/5 lớn hơn 1; còn 3/4, 5/9, 2/3 đều bé hơn 1!"
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "So sánh hai phân số cùng tử số: 5/6 và 5/9",
            "options": [
              "5/6 > 5/9",
              "5/6 < 5/9",
              "5/6 = 5/9"
            ],
            "answer": "5/6 > 5/9",
            "mascotHint": "Cùng tử số 5, phân số nào có mẫu số bé hơn thì lớn hơn ⇒ 5/6 > 5/9!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ so sánh:",
            "points": [
              "Cùng tử số: mẫu bé hơn thì phân số lớn hơn",
              "Cùng mẫu số: tử lớn hơn thì phân số lớn hơn"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l11",
      "title": "Bài 10: Ôn tập tìm hai số khi biết Tổng (Hiệu) và Tỉ số",
      "type": "learn",
      "description": "Ôn lại hai dạng toán điển hình trước khi học giải toán tỉ lệ",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Đây là dạng toán quan trọng nhất của phần 'ôn tập và bổ sung về giải toán' — cùng làm cho thật chắc! 🎯"
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
              "braceLabel": "Tổng (hiệu) số phần ⇒ giá trị một phần ⇒ từng số"
            },
            "table": {
              "headers": [
                "Bước",
                "Làm"
              ],
              "rows": [
                [
                  "1",
                  "vẽ sơ đồ đoạn thẳng"
                ],
                [
                  "2",
                  "tính tổng (hiệu) số phần"
                ],
                [
                  "3",
                  "tính giá trị một phần"
                ],
                [
                  "4",
                  "tính từng số rồi thử lại"
                ]
              ],
              "label": "Ôn tập tìm hai số khi biết Tổng (Hiệu) và Tỉ số"
            },
            "badge": "Hai Dạng Toán Tỉ",
            "title": "Phân biệt và cách giải",
            "points": [
              "Đề cho tổng ⇒ chia cho TỔNG số phần. Đề cho hiệu ⇒ chia cho HIỆU số phần.",
              "Ví dụ tổng: tổng 120, tỉ số 2 : 3 ⇒ một phần = 120 : 5 = 24 ⇒ hai số là 48 và 72.",
              "Ví dụ hiệu: hiệu 36, tỉ số 1 : 4 ⇒ một phần = 36 : 3 = 12 ⇒ hai số là 12 và 48."
            ],
            "rule": "Sau khi giải, thử lại bằng cách cộng (hoặc trừ) hai số vừa tìm."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Tổng hai số là 120, tỉ số của hai số là 2 : 3. Số lớn là bao nhiêu?",
            "options": [
              72,
              48,
              24,
              60
            ],
            "answer": 72,
            "mascotHint": "2 + 3 = 5 phần; 120 : 5 = 24 ⇒ số lớn = 24 × 3 = 72!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ:",
            "points": [
              "Tổng ⇒ chia cho tổng số phần",
              "Hiệu ⇒ chia cho hiệu số phần"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l12",
      "title": "Bài 11: Luyện tập bảng đơn vị đo diện tích",
      "type": "learn",
      "description": "Luyện quy đổi các đơn vị đo diện tích",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "happy",
            "text": "Bảng đơn vị đo diện tích có một điều đặc biệt: hai đơn vị liền nhau hơn kém nhau 100 lần! 📐"
          }
        },
        {
          "type": "concept",
          "content": {
            "table": {
              "headers": [
                "Đơn vị",
                "Hơn kém đơn vị liền sau"
              ],
              "rows": [
                [
                  "km² ; hm² ; dam² ; m²",
                  "100 lần"
                ],
                [
                  "m² ; dm² ; cm² ; mm²",
                  "100 lần"
                ]
              ],
              "label": "Luyện tập bảng đơn vị đo diện tích"
            },
            "badge": "Luyện Bảng Diện Tích",
            "title": "Thứ tự và cách quy đổi",
            "points": [
              "Thứ tự: km² > hm² (ha) > dam² > m² > dm² > cm² > mm².",
              "Hai đơn vị liền nhau hơn kém nhau 100 lần.",
              "Ví dụ: 1 dam² = 100 m²; 1 hm² = 100 dam² = 10 000 m²."
            ],
            "rule": "Đơn vị lớn gấp 100 lần đơn vị bé liền sau; đơn vị bé bằng 1/100 đơn vị lớn liền trước."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "1 dam² bằng bao nhiêu mét vuông?",
            "options": [
              100,
              10,
              1000,
              10000
            ],
            "answer": 100,
            "mascotHint": "Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 lần: 1 dam² = 100 m²!"
          }
        },
        {
          "type": "summary",
          "content": {
            "title": "Ghi nhớ bảng diện tích:",
            "points": [
              "km² > hm² > dam² > m² > dm² > cm² > mm²",
              "Mỗi bước nhảy là 100 lần (khác với đo độ dài chỉ 10 lần)"
            ],
            "mascotMood": "proud"
          }
        }
      ]
    },
    {
      "id": "g5-c1-l9",
      "title": "Bài 12: Luyện tập chung Chương 1",
      "type": "learn",
      "description": "Tổng kết kiến thức phân số, toán tỉ lệ và bảng đơn vị đo diện tích",
      "slides": [
        {
          "type": "story",
          "content": {
            "mascotMood": "proud",
            "text": "Bé đã hoàn thành xuất sắc Chương 1! Cùng Cú Mèo làm bài thử thách tổng kết nào! 🏅"
          }
        },
        {
          "type": "concept",
          "content": {
            "table": {
              "headers": [
                "Nội dung",
                "Ví dụ"
              ],
              "rows": [
                [
                  "Phân số",
                  "1/2 = 5/10"
                ],
                [
                  "Số thập phân",
                  "3/4 = 0,75"
                ],
                [
                  "Đơn vị diện tích",
                  "1 hm² = 10 000 m²"
                ],
                [
                  "Toán tỉ lệ",
                  "5 quyển ⇒ 8 quyển"
                ]
              ],
              "label": "Luyện tập chung Chương 1"
            },
            "badge": "Kiến Thức Trọng Tâm",
            "title": "Luyện tập chung Chương 1",
            "explanation": "Luyện tập chung các kiến thức về số của chương 1.",
            "points": [
              "So sánh số thập phân: so phần nguyên trước, rồi so từng hàng phần thập phân.",
              "Đổi phân số thập phân thành số thập phân: 3/10 = 0,3.",
              "Viết số đo độ dài, khối lượng dưới dạng số thập phân."
            ],
            "rule": "Đọc kỹ yêu cầu để biết cần viết dạng phân số hay số thập phân."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Một mảnh đất hình chữ nhật có chiều dài 200 m, chiều rộng 100 m. Diện tích mảnh đất đó là bao nhiêu héc-ta?",
            "options": [
              "2 ha",
              "20 ha",
              "0,2 ha",
              "200 ha"
            ],
            "answer": "2 ha",
            "mascotHint": "Diện tích = 200 × 100 = 20 000 m². 20 000 m² = 2 ha!",
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
            "title": "Hoàn thành Chương 1:",
            "points": [
              "Vững vàng phân số và hỗn số.",
              "Thành thạo chuyển đổi đơn vị đo diện tích và ha."
            ],
            "mascotMood": "celebrate"
          }
        }
      ]
    }
  ]
};
