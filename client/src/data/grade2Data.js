// Data for Grade 2 (Lớp 2) - Chuẩn SGK Kết Nối Tri Thức
// Chuẩn hóa sư phạm 100%: Khám phá -> Khái niệm (Visual-First, Thân thiện lứa tuổi) -> Thử thách -> Ghi nhớ

function makeLesson(id, title, desc, slides = []) {
  return {
    id,
    title,
    type: 'learn',
    description: desc,
    slides,
  }
}

export const grade2Data = {
  "id": 2,
  "name": "Lớp 2",
  "description": "Số đến 1000, phép cộng trừ có nhớ, bảng nhân & chia 2, 3, 4, 5",
  "icon": "🌿",
  "color": "#51CF66",
  "ageRange": "7-8 tuổi",
  "chapters": [
    {
      "id": "g2-c1",
      "name": "Chủ đề 1: Ôn tập & Bổ sung (Tia số, Số liền trước - liền sau)",
      "description": "Ôn tập số học lớp 1, tia số, cộng trừ không nhớ trong phạm vi 100",
      "icon": "🔄",
      "color": "#4facfe",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c1-l1",
          "title": "Bài 1: Ôn tập các số đến 100",
          "type": "learn",
          "description": "Đọc, viết, so sánh số có 2 chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chào mừng bé lên Lớp 2! Cùng ôn lại các số đến 100 nhé! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Ôn tập các số đến 100",
                "explanation": "Đọc, viết, so sánh số có 2 chữ số",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
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
              "type": "summary",
              "content": {
                "title": "Bé nhớ rất tốt:",
                "points": [
                  "Số có hai chữ số gồm hàng chục và hàng đơn vị."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l2",
          "title": "Bài 2: Tia số và số liền trước, liền sau",
          "type": "learn",
          "description": "Xác định vị trí trên tia số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số liền trước bé hơn 1 đơn vị, số liền sau lớn hơn 1 đơn vị. 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Tia Số & Số Liền Kề",
                "title": "Tia số và số liền trước, liền sau",
                "explanation": "Trên tia số, các vạch chia cách đều nhau từ bé đến lớn. Số liền trước đứng ngay trước (kém 1 đơn vị), số liền sau đứng ngay sau (hơn 1 đơn vị).",
                "rule": "Số liền trước = Số đã cho - 1. Số liền sau = Số đã cho + 1.",
                "example": {
                  "text": "Tìm số liền trước và số liền sau của số 45. 👉 Số liền trước của 45 là 44 (45 - 1). Số liền sau của 45 là 46 (45 + 1)."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền trước của 80 là số nào?",
                "options": [
                  78,
                  79,
                  81,
                  82
                ],
                "answer": 79,
                "mascotHint": "80 bớt 1 còn 79."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tia số:",
                "points": [
                  "Số bên phải lớn hơn số bên trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l3",
          "title": "Bài 3: Phép cộng không nhớ dạng 32 + 14",
          "type": "learn",
          "description": "Cộng hàng đơn vị với đơn vị, chục với chục",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "32 + 14: 2 + 4 = 6, 3 + 1 = 4. Kết quả là 46! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Cộng Có Nhớ",
                "title": "Phép cộng không nhớ dạng 32 + 14",
                "explanation": "Khi cộng hàng đơn vị mà kết quả từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ 1 chục sang hàng chục!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết các chữ số cùng hàng thẳng cột với nhau (đơn vị thẳng đơn vị, chục thẳng chục)."
                  },
                  {
                    "title": "Bước 2: Cộng đơn vị",
                    "desc": "Cộng hàng đơn vị trước. Nếu từ 10 trở lên thì viết hàng đơn vị, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Cộng chục",
                    "desc": "Cộng hàng chục và nhớ thêm 1 vừa ghi nhớ vào kết quả."
                  }
                ],
                "rule": "Luôn cộng từ phải sang trái (đơn vị trước, chục sau). Đừng quên cộng thêm 1 nhớ vào hàng chục!",
                "example": {
                  "text": "Tính: 38 + 25 = ? 👉 Đơn vị: 8 + 5 = 13 (viết 3 nhớ 1). Chục: 3 + 2 = 5, thêm 1 nhớ là 6, vậy kết quả là 63!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 43 + 25 = ?",
                "options": [
                  67,
                  68,
                  69,
                  58
                ],
                "answer": 68,
                "mascotHint": "3 + 5 = 8; 4 + 2 = 6."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng không nhớ:",
                "points": [
                  "43 + 25 = 68"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l4",
          "title": "Bài 4: Phép trừ không nhớ dạng 57 - 23",
          "type": "learn",
          "description": "Trừ thẳng hàng dọc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "57 - 23: 7 - 3 = 4, 5 - 2 = 3. Kết quả là 34! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Trừ Có Nhớ",
                "title": "Phép trừ không nhớ dạng 57 - 23",
                "explanation": "Khi chữ số hàng đơn vị ở trên bé hơn chữ số ở dưới, ta mượn 1 chục (10) để trừ, rồi NHỚ 1 sang chữ số hàng chục của số trừ!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết thẳng cột hàng đơn vị và hàng chục."
                  },
                  {
                    "title": "Bước 2: Trừ đơn vị",
                    "desc": "Nếu không trừ được, mượn 1 chục (10) để trừ, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Trừ chục",
                    "desc": "Thêm 1 vào hàng chục của số trừ, rồi lấy hàng chục số bị trừ trừ đi."
                  }
                ],
                "rule": "Mượn 1 ở hàng chục để trừ đơn vị, rồi nhớ trả 1 sang hàng chục của số trừ.",
                "example": {
                  "text": "Tính: 51 - 24 = ? 👉 1 không trừ được 4, mượn 1 chục: 11 - 4 = 7 (viết 7 nhớ 1). 2 thêm 1 là 3; 5 - 3 = 2, vậy kết quả là 27!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 78 - 36 = ?",
                "options": [
                  41,
                  42,
                  43,
                  52
                ],
                "answer": 42,
                "mascotHint": "8 - 6 = 2; 7 - 3 = 4."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ không nhớ:",
                "points": [
                  "78 - 36 = 42"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l5",
          "title": "Bài 5: Cộng trừ các số tròn chục",
          "type": "learn",
          "description": "Tính nhẩm siêu tốc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "40 + 30 = 70. 90 - 50 = 40! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Cộng trừ các số tròn chục",
                "explanation": "Tính nhẩm siêu tốc",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính nhẩm: 60 + 30 - 20 = ?",
                "options": [
                  60,
                  70,
                  80,
                  90
                ],
                "answer": 70,
                "mascotHint": "60 + 30 = 90; 90 - 20 = 70."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính nhẩm:",
                "points": [
                  "Cộng trừ số chục rất tiện lợi."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l6",
          "title": "Bài 6: Điểm và Đoạn thẳng",
          "type": "learn",
          "description": "Làm quen các yếu tố hình học cơ bản",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Nối điểm A với điểm B bằng thước kẻ ta được đoạn thẳng AB! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Điểm và Đoạn thẳng",
                "explanation": "Làm quen các yếu tố hình học cơ bản",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đoạn thẳng MN được giới hạn bởi mấy điểm?",
                "options": [
                  1,
                  2,
                  3,
                  4
                ],
                "answer": 2,
                "mascotHint": "Giới hạn bởi hai điểm M và N!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đoạn thẳng:",
                "points": [
                  "Nối hai điểm bằng một đường thẳng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l7",
          "title": "Bài 7: Ba điểm thẳng hàng",
          "type": "learn",
          "description": "Cùng nằm trên một đường thẳng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi dùng thước đặt đi qua cả 3 điểm thì 3 điểm đó thẳng hàng! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Ba điểm thẳng hàng",
                "explanation": "Cùng nằm trên một đường thẳng",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Ba điểm thẳng hàng là ba điểm như thế nào?",
                "options": [
                  "Cùng nằm trên một đường thẳng",
                  "Tạo thành hình tam giác",
                  "Tạo thành hình vuông"
                ],
                "answer": "Cùng nằm trên một đường thẳng",
                "mascotHint": "Thẳng hàng là cùng thuộc 1 đường thẳng."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thẳng hàng:",
                "points": [
                  "3 điểm cùng nằm trên 1 đường thẳng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l8",
          "title": "Bài 8: Đề-xi-mét (dm) — Đơn vị đo độ dài mới",
          "type": "learn",
          "description": "1 dm = 10 cm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "10 cm gom lại gọi là 1 đề-xi-mét (1 dm)! Thước kẻ 20 cm dài đúng 2 dm! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Đề-xi-mét (dm) — Đơn vị đo độ dài mới",
                "explanation": "Mỗi đơn vị đo có mục đích sử dụng riêng:",
                "points": [
                  "Độ dài: 1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m (đo quãng đường xa).",
                  "Khối lượng: Ki-lô-gam (kg) dùng để đo cân nặng người và đồ vật.",
                  "Dung tích: Lít (l) dùng để đo lượng chất lỏng như nước, sữa, dầu ăn."
                ],
                "rule": "Đổi đơn vị đo: 1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 dm bằng bao nhiêu cm?",
                "options": [
                  1,
                  10,
                  100,
                  1000
                ],
                "answer": 10,
                "mascotHint": "1 dm = 10 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy đổi:",
                "points": [
                  "1 dm = 10 cm",
                  "10 cm = 1 dm"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l9",
          "title": "Bài 9: Bài toán về nhiều hơn",
          "type": "learn",
          "description": "Tìm đại lượng lớn hơn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "An có 15 cái kẹo, Bình có nhiều hơn An 4 cái kẹo. Bình có: 15 + 4 = 19 cái kẹo! 🍬"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Bài toán về nhiều hơn",
                "explanation": "Tìm đại lượng lớn hơn",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mai có 20 bông hoa, Lan có nhiều hơn Mai 5 bông hoa. Hỏi Lan có bao nhiêu bông hoa?",
                "options": [
                  15,
                  20,
                  25,
                  30
                ],
                "answer": 25,
                "mascotHint": "Nhiều hơn thì lấy số của Mai cộng thêm 5!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Nhiều hơn:",
                "points": [
                  "Lấy số bé cộng phần nhiều hơn để tìm số lớn."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l10",
          "title": "Bài 10: Bài toán về ít hơn",
          "type": "learn",
          "description": "Tìm đại lượng nhỏ hơn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hòa có 18 viên bi, Nam có ít hơn Hòa 6 viên bi. Nam có: 18 - 6 = 12 viên bi! 🔮"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Bài toán về ít hơn",
                "explanation": "Tìm đại lượng nhỏ hơn",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Lớp 2A trồng được 35 cây, lớp 2B trồng ít hơn lớp 2A là 5 cây. Lớp 2B trồng được:",
                "options": [
                  30,
                  35,
                  40,
                  45
                ],
                "answer": 30,
                "mascotHint": "Ít hơn thì làm phép tính trừ: 35 - 5 = 30!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ít hơn:",
                "points": [
                  "Lấy số lớn trừ phần ít hơn để tìm số bé."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l11",
          "title": "Bài 11: Tìm thành phần chưa biết: Số hạng trong một tổng",
          "type": "learn",
          "description": "Biết tổng và một số hạng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết! Ví dụ: x + 12 = 30, suy ra x = 30 - 12 = 18! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Tìm thành phần chưa biết: Số hạng trong một tổng",
                "explanation": "Biết tổng và một số hạng",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm x biết: x + 15 = 45",
                "options": [
                  20,
                  25,
                  30,
                  35
                ],
                "answer": 30,
                "mascotHint": "Lấy 45 - 15 = 30!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc tìm số hạng:",
                "points": [
                  "Số hạng = Tổng - Số hạng đã biết"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c1-l12",
          "title": "Bài 12: Thực hành vẽ đoạn thẳng có độ dài cho trước",
          "type": "learn",
          "description": "Dùng thước kẻ và bút chì chuẩn xác",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Chấm điểm A tại vạch 0 cm, chấm điểm B tại vạch 8 cm rồi nối lại, ta có đoạn thẳng AB dài đúng 8 cm! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thực hành vẽ đoạn thẳng có độ dài cho trước",
                "explanation": "Dùng thước kẻ và bút chì chuẩn xác",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Để vẽ đoạn thẳng dài 1 dm, ta chấm điểm thứ hai ở vạch bao nhiêu cm?",
                "options": [
                  "1 cm",
                  "10 cm",
                  "100 cm",
                  "20 cm"
                ],
                "answer": "10 cm",
                "mascotHint": "1 dm chính là 10 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Kỹ năng vẽ hình:",
                "points": [
                  "Luôn bắt đầu từ vạch 0 cm của thước"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c2",
      "name": "Chủ đề 2: Phép cộng, phép trừ (có nhớ) trong phạm vi 100",
      "description": "Cộng có nhớ và trừ có mượn trong phạm vi 100",
      "icon": "🧮",
      "color": "#FF6B6B",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c2-l1",
          "title": "Bài 1: Phép cộng dạng 9 + 5 và 29 + 5",
          "type": "learn",
          "description": "Cộng hàng đơn vị qua 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "29 + 5: 9 + 5 = 14 (viết 4 nhớ 1), 2 thêm 1 là 3. Được 34! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép cộng dạng 9 + 5 và 29 + 5",
                "explanation": "Cộng hàng đơn vị qua 10",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 39 + 7 = ?",
                "options": [
                  44,
                  45,
                  46,
                  47
                ],
                "answer": 46,
                "mascotHint": "9 + 7 = 16 (viết 6 nhớ 1); 3 + 1 = 4."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng có nhớ:",
                "points": [
                  "Cộng hàng đơn vị trước rồi nhớ 1 sang hàng chục."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l2",
          "title": "Bài 2: Phép cộng dạng 8 + 5 và 38 + 25",
          "type": "learn",
          "description": "Cộng hai số có hai chữ số có nhớ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "38 + 25: 8 + 5 = 13 (viết 3 nhớ 1), 3 + 2 = 5, thêm 1 bằng 6. Kết quả là 63! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép cộng dạng 8 + 5 và 38 + 25",
                "explanation": "Cộng hai số có hai chữ số có nhớ",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 48 + 27 = ?",
                "options": [
                  65,
                  75,
                  74,
                  85
                ],
                "answer": 75,
                "mascotHint": "8 + 7 = 15 (viết 5 nhớ 1); 4 + 2 = 6 thêm 1 là 7."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc:",
                "points": [
                  "Đặt tính thẳng cột, cộng từ phải sang trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l3",
          "title": "Bài 3: Phép cộng dạng 7 + 5 và 47 + 18",
          "type": "learn",
          "description": "Luyện tập cộng nhớ 1",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "47 + 18: 7 + 8 = 15 (viết 5 nhớ 1), 4 + 1 = 5, thêm 1 là 65! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép cộng dạng 7 + 5 và 47 + 18",
                "explanation": "Luyện tập cộng nhớ 1",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 37 + 29 = ?",
                "options": [
                  56,
                  66,
                  67,
                  76
                ],
                "answer": 66,
                "mascotHint": "7 + 9 = 16 (viết 6 nhớ 1); 3 + 2 = 5 thêm 1 là 6."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng nhanh:",
                "points": [
                  "37 + 29 = 66"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l4",
          "title": "Bài 4: Phép cộng dạng 6 + 5 và 56 + 36",
          "type": "learn",
          "description": "Cộng hàng đơn vị 6 và các số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "56 + 36: 6 + 6 = 12 (viết 2 nhớ 1), 5 + 3 = 8 thêm 1 bằng 9. Được 92! 🦉"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép cộng dạng 6 + 5 và 56 + 36",
                "explanation": "Cộng hàng đơn vị 6 và các số",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 46 + 38 = ?",
                "options": [
                  74,
                  84,
                  82,
                  85
                ],
                "answer": 84,
                "mascotHint": "6 + 8 = 14 (viết 4 nhớ 1); 4 + 3 = 7 thêm 1 là 8."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thành thạo phép cộng:",
                "points": [
                  "Cộng có nhớ trong phạm vi 100 thật dễ!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l5",
          "title": "Bài 5: Phép cộng có tổng là số tròn trăm (100)",
          "type": "learn",
          "description": "Chạm mốc 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "83 + 17: 3 + 7 = 10 (viết 0 nhớ 1), 8 + 1 = 9 thêm 1 là 10. Kết quả là 100! 💯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép cộng có tổng là số tròn trăm (100)",
                "explanation": "Chạm mốc 100",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 65 + 35 = ?",
                "options": [
                  90,
                  95,
                  100,
                  105
                ],
                "answer": 100,
                "mascotHint": "5 + 5 = 10; 6 + 3 = 9 thêm 1 là 10."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tổng bằng 100:",
                "points": [
                  "65 + 35 = 100",
                  "72 + 28 = 100"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l6",
          "title": "Bài 6: Phép trừ dạng 11 - 5 và 51 - 15",
          "type": "learn",
          "description": "Mượn 1 chục ở hàng trước",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "51 - 15: 1 không trừ được 5, mượn 1 chục thành 11 - 5 = 6. 5 bớt 1 còn 4, 4 - 1 = 3. Được 36! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép trừ dạng 11 - 5 và 51 - 15",
                "explanation": "Mượn 1 chục ở hàng trước",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 41 - 18 = ?",
                "options": [
                  22,
                  23,
                  24,
                  33
                ],
                "answer": 23,
                "mascotHint": "11 - 8 = 3; 4 bớt 1 còn 3, 3 - 1 = 2."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ có nhớ:",
                "points": [
                  "Mượn 1 chục ở hàng chục và nhớ trả khi trừ."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l7",
          "title": "Bài 7: Phép trừ dạng 12 - 7 và 62 - 27",
          "type": "learn",
          "description": "Mượn 1 chục với chữ số 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "62 - 27: 12 - 7 = 5. 6 bớt 1 còn 5, 5 - 2 = 3. Được 35! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép trừ dạng 12 - 7 và 62 - 27",
                "explanation": "Mượn 1 chục với chữ số 2",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 52 - 28 = ?",
                "options": [
                  24,
                  25,
                  34,
                  35
                ],
                "answer": 24,
                "mascotHint": "12 - 8 = 4; 5 bớt 1 còn 4, 4 - 2 = 2."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ có nhớ:",
                "points": [
                  "52 - 28 = 24"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l8",
          "title": "Bài 8: Phép trừ dạng 13 - 8 và 73 - 38",
          "type": "learn",
          "description": "Luyện tập trừ có mượn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "73 - 38: 13 - 8 = 5. 7 bớt 1 còn 6, 6 - 3 = 3. Được 35! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép trừ dạng 13 - 8 và 73 - 38",
                "explanation": "Luyện tập trừ có mượn",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 83 - 47 = ?",
                "options": [
                  35,
                  36,
                  46,
                  47
                ],
                "answer": 36,
                "mascotHint": "13 - 7 = 6; 8 bớt 1 còn 7, 7 - 4 = 3."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ có mượn:",
                "points": [
                  "83 - 47 = 36"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l9",
          "title": "Bài 9: Phép trừ số tròn chục (100 trừ đi một số)",
          "type": "learn",
          "description": "100 - 36",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "100 - 36: 0 không trừ được 6 mượn 10 - 6 = 4. 0 bớt 1 (thành 9), 9 - 3 = 6. Được 64! 💯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép trừ số tròn chục (100 trừ đi một số)",
                "explanation": "100 - 36",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 100 - 45 = ?",
                "options": [
                  45,
                  55,
                  65,
                  50
                ],
                "answer": 55,
                "mascotHint": "10 - 5 = 5; 9 - 4 = 5."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "100 trừ một số:",
                "points": [
                  "100 - 45 = 55",
                  "100 - 20 = 80"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l10",
          "title": "Bài 10: Luyện tập chung phép cộng trừ có nhớ",
          "type": "learn",
          "description": "Tổng kết Chương 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã chinh phục xuất sắc chương phép tính khó nhất lớp 2! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Cộng Có Nhớ",
                "title": "Luyện tập chung phép cộng trừ có nhớ",
                "explanation": "Khi cộng hàng đơn vị mà kết quả từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ 1 chục sang hàng chục!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết các chữ số cùng hàng thẳng cột với nhau (đơn vị thẳng đơn vị, chục thẳng chục)."
                  },
                  {
                    "title": "Bước 2: Cộng đơn vị",
                    "desc": "Cộng hàng đơn vị trước. Nếu từ 10 trở lên thì viết hàng đơn vị, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Cộng chục",
                    "desc": "Cộng hàng chục và nhớ thêm 1 vừa ghi nhớ vào kết quả."
                  }
                ],
                "rule": "Luôn cộng từ phải sang trái (đơn vị trước, chục sau). Đừng quên cộng thêm 1 nhớ vào hàng chục!",
                "example": {
                  "text": "Tính: 38 + 25 = ? 👉 Đơn vị: 8 + 5 = 13 (viết 3 nhớ 1). Chục: 3 + 2 = 5, thêm 1 nhớ là 6, vậy kết quả là 63!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 48 + 36 - 15 = ?",
                "options": [
                  69,
                  70,
                  71,
                  79
                ],
                "answer": 69,
                "mascotHint": "48 + 36 = 84; 84 - 15 = 69!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chúc mừng bé!",
                "points": [
                  "Bé đặt tính cột dọc cực kỳ chuẩn xác!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l11",
          "title": "Bài 11: Phép trừ có số bị trừ tròn chục",
          "type": "learn",
          "description": "Các phép trừ dạng 40 - 18, 70 - 35",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Khi tính 50 - 24: 0 không trừ được 4, mượn 1 chục được 10 - 4 = 6; 5 bớt 1 còn 4, 4 - 2 = 2. Kết quả là 26! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Phép trừ có số bị trừ tròn chục",
                "explanation": "Các phép trừ dạng 40 - 18, 70 - 35",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 60 - 27 = ?",
                "options": [
                  33,
                  43,
                  37,
                  23
                ],
                "answer": 33,
                "mascotHint": "10 - 7 = 3; 5 - 2 = 3. Là 33!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Mẹo trừ số tròn chục:",
                "points": [
                  "Mượn 1 chục ở hàng chục, nhớ trả 1"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c2-l12",
          "title": "Bài 12: Đặt tính thẳng cột: Tuyệt chiêu không quên nhớ",
          "type": "learn",
          "description": "Rèn luyện thói quen viết sạch đẹp",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đơn vị thẳng đơn vị, chục thẳng chục. Viết dấu chấm nhớ nhỏ xíu ở hàng chục để không bao giờ quên nhé bé! ✍️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Đặt tính thẳng cột: Tuyệt chiêu không quên nhớ",
                "explanation": "Rèn luyện thói quen viết sạch đẹp",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 48 + 37 = ?",
                "options": [
                  75,
                  85,
                  84,
                  95
                ],
                "answer": 85,
                "mascotHint": "8 + 7 = 15 nhớ 1; 4 + 3 + 1 = 8!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 2:",
                "points": [
                  "Bé cộng trừ có nhớ siêu nhanh và chính xác!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c3",
      "name": "Chủ đề 3: Phép nhân & Bảng nhân 2, 3, 4, 5",
      "description": "Ý nghĩa phép nhân và học thuộc bảng nhân 2, 3, 4, 5",
      "icon": "✖️",
      "color": "#FFE66D",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c3-l1",
          "title": "Bài 1: Làm quen với phép nhân",
          "type": "learn",
          "description": "Phép nhân là tổng các số hạng bằng nhau",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả. Viết 2 + 2 + 2 + 2 = 2 × 4 = 8 quả! 🍎"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Làm quen với phép nhân",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tổng 3 + 3 + 3 + 3 + 3 được viết thành phép nhân nào?",
                "options": [
                  "3 × 4",
                  "3 × 5",
                  "5 × 3",
                  "3 + 5"
                ],
                "answer": "3 × 5",
                "mascotHint": "Có 5 số 3 cộng lại với nhau!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ý nghĩa phép nhân:",
                "points": [
                  "a × b = a lấy b lần"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l2",
          "title": "Bài 2: Thừa số và Tích",
          "type": "learn",
          "description": "Tên gọi các thành phần trong phép nhân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Trong phép nhân 2 × 5 = 10: 2 là thừa số, 5 là thừa số, 10 là tích! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Thừa số và Tích",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong phép tính 4 × 3 = 12, số 12 được gọi là gì?",
                "options": [
                  "Thừa số",
                  "Tích",
                  "Tổng",
                  "Hiệu"
                ],
                "answer": "Tích",
                "mascotHint": "Kết quả của phép nhân gọi là Tích!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thành phần:",
                "points": [
                  "Thừa số × Thừa số = Tích"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l3",
          "title": "Bài 3: Bảng nhân 2 (Phần 1: từ 2×1 đến 2×5)",
          "type": "learn",
          "description": "Mỗi bước cộng thêm 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, 2 × 4 = 8, 2 × 5 = 10! ✌️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 2 (Phần 1: từ 2×1 đến 2×5)",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 2 × 4 = ?",
                "options": [
                  6,
                  8,
                  10,
                  12
                ],
                "answer": 8,
                "mascotHint": "Hai lần bốn là tám!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 2:",
                "points": [
                  "2, 4, 6, 8, 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l4",
          "title": "Bài 4: Bảng nhân 2 (Phần 2: từ 2×6 đến 2×10)",
          "type": "learn",
          "description": "Hoàn thành bảng nhân 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "2 × 6 = 12, 2 × 7 = 14, 2 × 8 = 16, 2 × 9 = 18, 2 × 10 = 20! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 2 (Phần 2: từ 2×6 đến 2×10)",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 2 × 8 = ?",
                "options": [
                  14,
                  16,
                  18,
                  20
                ],
                "answer": 16,
                "mascotHint": "2 × 8 = 16"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 2:",
                "points": [
                  "Bé đã thuộc trọn vẹn bảng nhân 2!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l5",
          "title": "Bài 5: Bảng nhân 5 (Phần 1: từ 5×1 đến 5×5)",
          "type": "learn",
          "description": "Tận cùng luôn là 0 hoặc 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "5, 10, 15, 20, 25! Giống như đếm các ngón tay! 🖐️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 5 (Phần 1: từ 5×1 đến 5×5)",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 × 3 = ?",
                "options": [
                  10,
                  15,
                  20,
                  25
                ],
                "answer": 15,
                "mascotHint": "5, 10, 15!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 5:",
                "points": [
                  "5 × 1 = 5",
                  "5 × 5 = 25"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l6",
          "title": "Bài 6: Bảng nhân 5 (Phần 2: từ 5×6 đến 5×10)",
          "type": "learn",
          "description": "Hoàn thành bảng nhân 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "5 × 6 = 30, 5 × 7 = 35, 5 × 8 = 40, 5 × 9 = 45, 5 × 10 = 50! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 5 (Phần 2: từ 5×6 đến 5×10)",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 × 8 = ?",
                "options": [
                  35,
                  40,
                  45,
                  50
                ],
                "answer": 40,
                "mascotHint": "5 × 8 = 40"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 5:",
                "points": [
                  "Kết quả luôn có số tận cùng là 0 hoặc 5."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l7",
          "title": "Bài 7: Bảng nhân 3",
          "type": "learn",
          "description": "Mỗi bước cộng thêm 3 đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "3, 6, 9, 12, 15, 18, 21, 24, 27, 30! Một chiếc xe ba bánh có 3 bánh xe! 🛺"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 3",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 3 × 6 = ?",
                "options": [
                  15,
                  18,
                  21,
                  24
                ],
                "answer": 18,
                "mascotHint": "Ba lần sáu mười tám!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 3:",
                "points": [
                  "3 × 4 = 12",
                  "3 × 7 = 21",
                  "3 × 9 = 27"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l8",
          "title": "Bài 8: Bảng nhân 4",
          "type": "learn",
          "description": "Đếm chân các con vật 4 chân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chú bò có 4 chân 🐄. 4 × 1 = 4, 4 × 2 = 8, 4 × 3 = 12, 4 × 4 = 16, 4 × 5 = 20... 🐾"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Bảng nhân 4",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 4 × 7 = ?",
                "options": [
                  24,
                  28,
                  32,
                  36
                ],
                "answer": 28,
                "mascotHint": "4 × 7 = 28"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 4:",
                "points": [
                  "4 × 6 = 24",
                  "4 × 8 = 32",
                  "4 × 9 = 36"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l9",
          "title": "Bài 9: Nhân với số 1 và số 0",
          "type": "learn",
          "description": "Quy tắc đặc biệt của phép nhân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Bất kỳ số nào nhân với 1 cũng bằng chính nó: a × 1 = a. Bất kỳ số nào nhân với 0 đều bằng 0: a × 0 = 0! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Nhân với số 1 và số 0",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 × 0 = ?",
                "options": [
                  0,
                  5,
                  50,
                  1
                ],
                "answer": 0,
                "mascotHint": "Nhân với 0 luôn bằng 0!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 7 × 1 = ?",
                "options": [
                  1,
                  7,
                  8,
                  71
                ],
                "answer": 7,
                "mascotHint": "Nhân với 1 bằng chính nó."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Nhớ kỹ:",
                "points": [
                  "a × 1 = a",
                  "a × 0 = 0"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l10",
          "title": "Bài 10: Luyện tập tổng hợp các bảng nhân 2, 3, 4, 5",
          "type": "learn",
          "description": "Ôn tập xuất sắc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã hoàn thành toàn bộ bảng nhân của Lớp 2! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Luyện tập tổng hợp các bảng nhân 2, 3, 4, 5",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính nhẩm: 4 × 5 + 10 = ?",
                "options": [
                  20,
                  25,
                  30,
                  35
                ],
                "answer": 30,
                "mascotHint": "4 × 5 = 20, rồi 20 + 10 = 30!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tuyệt vời!",
                "points": [
                  "Bé đã nhớ chắc bảng nhân 2, 3, 4, 5!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l11",
          "title": "Bài 11: Đố vui đếm chân con vật bằng phép nhân",
          "type": "learn",
          "description": "Gà 2 chân, chó 4 chân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Có 6 chú thỏ 🐇, mỗi chú thỏ có 4 chân. Cả 6 chú thỏ có: 4 × 6 = 24 cái chân! 🐾"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Đố vui đếm chân con vật bằng phép nhân",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong sân có 8 con gà. Có tất cả bao nhiêu cái chân gà?",
                "options": [
                  10,
                  14,
                  16,
                  18
                ],
                "answer": 16,
                "mascotHint": "Mỗi con gà có 2 chân: 2 × 8 = 16!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ứng dụng phép nhân:",
                "points": [
                  "Tính số lượng lặp lại cực nhanh"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c3-l12",
          "title": "Bài 12: Thử thách tính nhẩm siêu tốc bảng nhân",
          "type": "learn",
          "description": "Phản xạ bảng nhân 2, 3, 4, 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã học thuộc làu bảng nhân 2, 3, 4, 5! Cùng bước vào đấu trường tính nhẩm nào! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Thử thách tính nhẩm siêu tốc bảng nhân",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm tích: 5 × 8 = ?",
                "options": [
                  35,
                  40,
                  45,
                  50
                ],
                "answer": 40,
                "mascotHint": "5 × 8 = 40!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 3:",
                "points": [
                  "Bé nắm chắc toàn bộ bảng nhân 2, 3, 4, 5!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c4",
      "name": "Chủ đề 4: Phép chia & Bảng chia 2, 3, 4, 5",
      "description": "Làm quen phép chia, bảng chia và phân số một phần mấy",
      "icon": "➗",
      "color": "#4facfe",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c4-l1",
          "title": "Bài 1: Làm quen với phép chia",
          "type": "learn",
          "description": "Chia đều đồ vật cho các nhóm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 6 quả dâu tây chia đều cho 2 bạn. Mỗi bạn được 6 : 2 = 3 quả! 🍓"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Làm quen với phép chia",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 8 cái kẹo chia đều cho 4 bạn. Mỗi bạn được mấy cái kẹo?",
                "options": [
                  2,
                  3,
                  4,
                  1
                ],
                "answer": 2,
                "mascotHint": "8 chia 4 bằng 2!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Phép chia (:):",
                "points": [
                  "Chia là chia đều thành các phần bằng nhau."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l2",
          "title": "Bài 2: Số bị chia, Số chia, Thương",
          "type": "learn",
          "description": "Tên gọi các thành phần phép chia",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Trong 12 : 3 = 4: 12 là Số bị chia, 3 là Số chia, 4 là Thương! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Số bị chia, Số chia, Thương",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong phép chia 15 : 5 = 3, số 3 được gọi là gì?",
                "options": [
                  "Số bị chia",
                  "Số chia",
                  "Thương",
                  "Tổng"
                ],
                "answer": "Thương",
                "mascotHint": "Kết quả phép chia gọi là Thương."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thành phần:",
                "points": [
                  "Số bị chia : Số chia = Thương"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l3",
          "title": "Bài 3: Bảng chia 2",
          "type": "learn",
          "description": "Ngược lại của bảng nhân 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Vì 2 × 6 = 12 nên 12 : 2 = 6! Rất dễ nhớ! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Bảng chia 2",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 16 : 2 = ?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 8,
                "mascotHint": "Hỏi 2 nhân mấy bằng 16? 2 × 8 = 16!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 2:",
                "points": [
                  "10 : 2 = 5",
                  "14 : 2 = 7",
                  "18 : 2 = 9"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l4",
          "title": "Bài 4: Một phần hai (1/2)",
          "type": "learn",
          "description": "Một nửa chiếc bánh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chia chiếc bánh pizza làm 2 phần bằng nhau, lấy 1 phần gọi là một phần hai (1/2). 🍕"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Một phần hai (1/2)",
                "explanation": "Một nửa chiếc bánh",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 10 quả táo, 1/2 số táo đó là mấy quả?",
                "options": [
                  2,
                  4,
                  5,
                  8
                ],
                "answer": 5,
                "mascotHint": "Lấy 10 : 2 = 5 quả táo!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Một phần hai:",
                "points": [
                  "1/2 hay còn gọi là một nửa."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l5",
          "title": "Bài 5: Bảng chia 5",
          "type": "learn",
          "description": "Phép chia cho 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "25 : 5 = 5, 30 : 5 = 6, 45 : 5 = 9! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Bảng chia 5",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 35 : 5 = ?",
                "options": [
                  5,
                  6,
                  7,
                  8
                ],
                "answer": 7,
                "mascotHint": "5 × 7 = 35 nên 35 : 5 = 7!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 5:",
                "points": [
                  "20 : 5 = 4",
                  "40 : 5 = 8"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l6",
          "title": "Bài 6: Một phần năm (1/5)",
          "type": "learn",
          "description": "Chia làm 5 phần bằng nhau",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Một tuần làm việc 5 ngày, 1 ngày là 1/5 tuần làm việc! 📅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Một phần năm (1/5)",
                "explanation": "Chia làm 5 phần bằng nhau",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một hộp có 20 chiếc bút, 1/5 số bút là bao nhiêu chiếc?",
                "options": [
                  2,
                  4,
                  5,
                  10
                ],
                "answer": 4,
                "mascotHint": "20 : 5 = 4 chiếc bút!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Một phần năm:",
                "points": [
                  "Lấy tổng số chia cho 5."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l7",
          "title": "Bài 7: Bảng chia 3 & Một phần ba (1/3)",
          "type": "learn",
          "description": "Phép chia cho 3",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "12 : 3 = 4, 18 : 3 = 6, 27 : 3 = 9! 1/3 là lấy 1 trong 3 phần bằng nhau. 🍰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Bảng chia 3 & Một phần ba (1/3)",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 21 : 3 = ?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 7,
                "mascotHint": "3 × 7 = 21!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 3:",
                "points": [
                  "15 : 3 = 5",
                  "24 : 3 = 8"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l8",
          "title": "Bài 8: Bảng chia 4 & Một phần tư (1/4)",
          "type": "learn",
          "description": "Phép chia cho 4",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "16 : 4 = 4, 28 : 4 = 7, 36 : 4 = 9! Gấp tư mảnh giấy ta được 1/4 mảnh giấy! 📄"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Bảng chia 4 & Một phần tư (1/4)",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 32 : 4 = ?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 8,
                "mascotHint": "4 × 8 = 32!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 4:",
                "points": [
                  "20 : 4 = 5",
                  "36 : 4 = 9"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l9",
          "title": "Bài 9: Tìm một trong các phần bằng nhau của một số",
          "type": "learn",
          "description": "Cách tính 1/2, 1/3, 1/4, 1/5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Muốn tìm 1/3 của 18 bông hoa, ta chỉ việc lấy 18 chia cho 3 = 6 bông hoa! 🌸"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Tìm một trong các phần bằng nhau của một số",
                "explanation": "Cách tính 1/2, 1/3, 1/4, 1/5",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm 1/4 của 24 viên kẹo:",
                "options": [
                  4,
                  6,
                  8,
                  12
                ],
                "answer": 6,
                "mascotHint": "Lấy 24 : 4 = 6!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc:",
                "points": [
                  "Muốn tìm 1 phần mấy, lấy số đó chia cho số phần."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l10",
          "title": "Bài 10: Luyện tập chung các bảng chia 2, 3, 4, 5",
          "type": "learn",
          "description": "Thành thạo phép chia",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã học thuộc tất cả các bảng chia của Lớp 2! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Luyện tập chung các bảng chia 2, 3, 4, 5",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 40 : 5 + 12 = ?",
                "options": [
                  18,
                  20,
                  22,
                  24
                ],
                "answer": 20,
                "mascotHint": "40 : 5 = 8; 8 + 12 = 20!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé tính nhẩm nhân chia siêu nhanh!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l11",
          "title": "Bài 11: Tìm thành phần chưa biết trong phép chia",
          "type": "learn",
          "description": "Tìm Số bị chia và Số chia",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Muốn tìm Số bị chia, ta lấy Thương nhân với Số chia! Ví dụ: x : 3 = 5, suy ra x = 5 × 3 = 15! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Tìm thành phần chưa biết trong phép chia",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm x biết: x : 4 = 6",
                "options": [
                  20,
                  24,
                  28,
                  10
                ],
                "answer": 24,
                "mascotHint": "Lấy 6 × 4 = 24!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc tìm x:",
                "points": [
                  "Số bị chia = Thương × Số chia"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c4-l12",
          "title": "Bài 12: Một phần năm (1/5) của một nhóm đồ vật",
          "type": "learn",
          "description": "Chia đều thành 5 phần",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 20 quả cam chia đều vào 5 giỏ. Mỗi giỏ có: 20 : 5 = 4 quả cam. Mỗi giỏ chiếm 1/5 số cam! 🍊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Một phần năm (1/5) của một nhóm đồ vật",
                "explanation": "Chia đều thành 5 phần",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một phần năm của 30 chiếc bánh là bao nhiêu chiếc bánh?",
                "options": [
                  5,
                  6,
                  7,
                  8
                ],
                "answer": 6,
                "mascotHint": "Lấy 30 : 5 = 6 chiếc bánh!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 4:",
                "points": [
                  "Bé nắm chắc các phân số 1/2, 1/3, 1/4, 1/5 và bảng chia!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c5",
      "name": "Chủ đề 5: Các số trong phạm vi 1 000",
      "description": "Đơn vị, chục, trăm và số có 3 chữ số",
      "icon": "🏢",
      "color": "#51CF66",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c5-l1",
          "title": "Bài 1: Đơn vị, Chục, Trăm",
          "type": "learn",
          "description": "Khái niệm hàng trăm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "10 đơn vị = 1 chục. 10 chục = 1 trăm (100)! 10 trăm = 1 nghìn (1000)! 💯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Đơn vị, Chục, Trăm",
                "explanation": "Khái niệm hàng trăm",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "10 chục bằng bao nhiêu?",
                "options": [
                  10,
                  100,
                  1000,
                  20
                ],
                "answer": 100,
                "mascotHint": "10 chục = 1 trăm = 100."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Các hàng số:",
                "points": [
                  "Hàng đơn vị, hàng chục, hàng trăm, rồi đến hàng nghìn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l2",
          "title": "Bài 2: Các số tròn trăm",
          "type": "learn",
          "description": "100 đến 900",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Một trăm (100), hai trăm (200), ba trăm (300)... chín trăm (900)! 🏢"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Các số tròn trăm",
                "explanation": "100 đến 900",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số tròn trăm liền trước số 500 là số nào?",
                "options": [
                  400,
                  490,
                  499,
                  600
                ],
                "answer": 400,
                "mascotHint": "400 rồi đến 500."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số tròn trăm:",
                "points": [
                  "100, 200, 300, 400, 500, 600, 700, 800, 900"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l3",
          "title": "Bài 3: Các số có ba chữ số",
          "type": "learn",
          "description": "Cấu tạo Trăm - Chục - Đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 352 gồm: 3 trăm, 5 chục và 2 đơn vị. Đọc là: Ba trăm năm mươi hai! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Các số có ba chữ số",
                "explanation": "Cấu tạo Trăm - Chục - Đơn vị",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 7 trăm, 4 chục và 8 đơn vị viết là:",
                "options": [
                  748,
                  784,
                  847,
                  478
                ],
                "answer": 748,
                "mascotHint": "Viết từ trái sang phải: 748."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Viết số 3 chữ số:",
                "points": [
                  "Hàng trăm, hàng chục, rồi đến hàng đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l4",
          "title": "Bài 4: Số có chữ số 0 ở hàng chục (Linh)",
          "type": "learn",
          "description": "Cách đọc số linh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 405 đọc là: Bốn trăm linh năm (hoặc bốn trăm lẻ năm). Chữ số 0 ở hàng chục đọc là \"linh\"! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Số có chữ số 0 ở hàng chục (Linh)",
                "explanation": "Cách đọc số linh",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số \"Sáu trăm linh bảy\" viết là:",
                "options": [
                  67,
                  607,
                  670,
                  706
                ],
                "answer": 607,
                "mascotHint": "6 trăm, 0 chục, 7 đơn vị: 607."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đọc số có 0 ở giữa:",
                "points": [
                  "405: bốn trăm linh năm",
                  "607: sáu trăm linh bảy"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l5",
          "title": "Bài 5: Số có chữ số 0 ở hàng đơn vị (Tròn chục)",
          "type": "learn",
          "description": "Đọc đuôi mươi",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 530 đọc là: Năm trăm ba mươi. 890 đọc là: Tám trăm chín mươi! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Số có chữ số 0 ở hàng đơn vị (Tròn chục)",
                "explanation": "Đọc đuôi mươi",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số \"Bảy trăm hai mươi\" viết là:",
                "options": [
                  702,
                  72,
                  720,
                  270
                ],
                "answer": 720,
                "mascotHint": "7 trăm và 2 chục là 720."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đọc số:",
                "points": [
                  "720: bảy trăm hai mươi"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l6",
          "title": "Bài 6: So sánh các số có ba chữ số",
          "type": "learn",
          "description": "So sánh hàng trăm trước",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "So sánh hàng trăm trước: 512 > 498 vì 5 trăm > 4 trăm! Nếu hàng trăm bằng nhau thì so sánh hàng chục! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "So sánh các số có ba chữ số",
                "explanation": "So sánh hàng trăm trước",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 645 ... 654",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": "<",
                "mascotHint": "Cùng 6 trăm, hàng chục 4 < 5 nên 645 < 654."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thứ tự so sánh:",
                "points": [
                  "1. Hàng trăm",
                  "2. Hàng chục",
                  "3. Hàng đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l7",
          "title": "Bài 7: Thứ tự các số có ba chữ số",
          "type": "learn",
          "description": "Sắp xếp từ bé đến lớn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Tìm số lớn nhất, số bé nhất trong các số có 3 chữ số! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thứ tự các số có ba chữ số",
                "explanation": "Sắp xếp từ bé đến lớn",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số nào bé nhất trong các số: 345, 299, 401, 310?",
                "options": [
                  345,
                  299,
                  401,
                  310
                ],
                "answer": 299,
                "mascotHint": "2 trăm là bé nhất: 299!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Sắp xếp số:",
                "points": [
                  "299 < 310 < 345 < 401"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l8",
          "title": "Bài 8: Số 1000 (Một nghìn)",
          "type": "learn",
          "description": "Chạm mốc 1000",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "999 thêm 1 là Một nghìn (1000). 1000 là số có 4 chữ số! 🏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Số 1000 (Một nghìn)",
                "explanation": "Chạm mốc 1000",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền sau số 999 là số nào?",
                "options": [
                  990,
                  1000,
                  1001,
                  998
                ],
                "answer": 1000,
                "mascotHint": "999 + 1 = 1000."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số 1000:",
                "points": [
                  "1 nghìn = 10 trăm = 100 chục = 1000 đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l9",
          "title": "Bài 9: Cộng trừ không nhớ trong phạm vi 1000",
          "type": "learn",
          "description": "Đặt tính thẳng cột",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "325 + 142: Cộng đơn vị (5+2=7), chục (2+4=6), trăm (3+1=4). Được 467! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Trừ Có Nhớ",
                "title": "Cộng trừ không nhớ trong phạm vi 1000",
                "explanation": "Khi chữ số hàng đơn vị ở trên bé hơn chữ số ở dưới, ta mượn 1 chục (10) để trừ, rồi NHỚ 1 sang chữ số hàng chục của số trừ!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết thẳng cột hàng đơn vị và hàng chục."
                  },
                  {
                    "title": "Bước 2: Trừ đơn vị",
                    "desc": "Nếu không trừ được, mượn 1 chục (10) để trừ, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Trừ chục",
                    "desc": "Thêm 1 vào hàng chục của số trừ, rồi lấy hàng chục số bị trừ trừ đi."
                  }
                ],
                "rule": "Mượn 1 ở hàng chục để trừ đơn vị, rồi nhớ trả 1 sang hàng chục của số trừ.",
                "example": {
                  "text": "Tính: 51 - 24 = ? 👉 1 không trừ được 4, mượn 1 chục: 11 - 4 = 7 (viết 7 nhớ 1). 2 thêm 1 là 3; 5 - 3 = 2, vậy kết quả là 27!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 543 + 231 = ?",
                "options": [
                  774,
                  764,
                  754,
                  784
                ],
                "answer": 774,
                "mascotHint": "3+1=4; 4+3=7; 5+2=7."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng trừ phạm vi 1000:",
                "points": [
                  "Thực hiện từ phải sang trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l10",
          "title": "Bài 10: Luyện tập tổng hợp các số đến 1000",
          "type": "learn",
          "description": "Hoàn thành Chương 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã làm chủ hoàn toàn các số đến 1000! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Luyện tập tổng hợp các số đến 1000",
                "explanation": "Hoàn thành Chương 5",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số lớn nhất có ba chữ số là số nào?",
                "options": [
                  900,
                  990,
                  999,
                  1000
                ],
                "answer": 999,
                "mascotHint": "999 là số 3 chữ số lớn nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé đọc viết và so sánh số 3 chữ số cực giỏi!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l11",
          "title": "Bài 11: Viết số có 3 chữ số thành tổng các trăm, chục, đơn vị",
          "type": "learn",
          "description": "Cấu tạo số thập phân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 458 gồm 4 trăm, 5 chục và 8 đơn vị: 458 = 400 + 50 + 8! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Viết số có 3 chữ số thành tổng các trăm, chục, đơn vị",
                "explanation": "Cấu tạo số thập phân",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 7 trăm và 3 đơn vị viết là số nào?",
                "options": [
                  73,
                  730,
                  703,
                  733
                ],
                "answer": 703,
                "mascotHint": "Hàng chục bằng 0: viết 703!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Viết số thành tổng:",
                "points": [
                  "abc = a00 + b0 + c"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c5-l12",
          "title": "Bài 12: Sắp xếp dãy số có 3 chữ số theo thứ tự",
          "type": "learn",
          "description": "Từ bé đến lớn và từ lớn đến bé",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Để sắp xếp, bé so sánh chữ số hàng trăm trước. Nếu bằng nhau thì so sánh tiếp hàng chục và đơn vị nhé! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Sắp xếp dãy số có 3 chữ số theo thứ tự",
                "explanation": "Từ bé đến lớn và từ lớn đến bé",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong các số: 345, 543, 435, 354, số bé nhất là:",
                "options": [
                  345,
                  543,
                  435,
                  354
                ],
                "answer": 345,
                "mascotHint": "So sánh hàng trăm: 3 là bé nhất, rồi 4 chục < 5 chục nên 345 bé nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 5:",
                "points": [
                  "Bé nắm chắc toàn bộ dãy số từ 1 đến 1000!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c6",
      "name": "Chủ đề 6: Khối lượng, dung tích & Đo độ dài (kg, lít, dm, m, km)",
      "description": "Các đơn vị đo độ dài, khối lượng và dung tích thực tế",
      "icon": "📏",
      "color": "#FFE66D",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c6-l1",
          "title": "Bài 1: Mét (m) — Đơn vị đo độ dài",
          "type": "learn",
          "description": "1 m = 10 dm = 100 cm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Mét viết tắt là m. Bảng lớp dài khoảng 2m, chiều cao phòng học khoảng 3m! 🏫"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Mét (m) — Đơn vị đo độ dài",
                "explanation": "Mỗi đơn vị đo có mục đích sử dụng riêng:",
                "points": [
                  "Độ dài: 1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m (đo quãng đường xa).",
                  "Khối lượng: Ki-lô-gam (kg) dùng để đo cân nặng người và đồ vật.",
                  "Dung tích: Lít (l) dùng để đo lượng chất lỏng như nước, sữa, dầu ăn."
                ],
                "rule": "Đổi đơn vị đo: 1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 mét (m) bằng bao nhiêu xăng-ti-mét (cm)?",
                "options": [
                  10,
                  50,
                  100,
                  1000
                ],
                "answer": 100,
                "mascotHint": "1m = 100cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đơn vị mét:",
                "points": [
                  "1m = 10dm = 100cm"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l2",
          "title": "Bài 2: Ki-lô-mét (km) — Đo quãng đường dài",
          "type": "learn",
          "description": "1 km = 1000 m",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Khoảng cách giữa hai thành phố đo bằng ki-lô-mét (km). 1 km = 1000 m! 🚗"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Ki-lô-mét (km) — Đo quãng đường dài",
                "explanation": "Mỗi đơn vị đo có mục đích sử dụng riêng:",
                "points": [
                  "Độ dài: 1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m (đo quãng đường xa).",
                  "Khối lượng: Ki-lô-gam (kg) dùng để đo cân nặng người và đồ vật.",
                  "Dung tích: Lít (l) dùng để đo lượng chất lỏng như nước, sữa, dầu ăn."
                ],
                "rule": "Đổi đơn vị đo: 1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 ki-lô-mét (km) bằng bao nhiêu mét (m)?",
                "options": [
                  10,
                  100,
                  500,
                  1000
                ],
                "answer": 1000,
                "mascotHint": "1km = 1000m!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đơn vị km:",
                "points": [
                  "1km = 1000m"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l3",
          "title": "Bài 3: Mi-li-mét (mm) — Đo các vật rất mỏng",
          "type": "learn",
          "description": "1 cm = 10 mm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bề dày của cuốn vở hay sợi chỉ đo bằng mi-li-mét (mm). 1 cm = 10 mm! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Mi-li-mét (mm) — Đo các vật rất mỏng",
                "explanation": "Mỗi đơn vị đo có mục đích sử dụng riêng:",
                "points": [
                  "Độ dài: 1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m (đo quãng đường xa).",
                  "Khối lượng: Ki-lô-gam (kg) dùng để đo cân nặng người và đồ vật.",
                  "Dung tích: Lít (l) dùng để đo lượng chất lỏng như nước, sữa, dầu ăn."
                ],
                "rule": "Đổi đơn vị đo: 1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 cm bằng bao nhiêu mm?",
                "options": [
                  5,
                  10,
                  100,
                  1000
                ],
                "answer": 10,
                "mascotHint": "1cm = 10mm."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng đo độ dài:",
                "points": [
                  "1m = 10dm = 100cm = 1000mm"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l4",
          "title": "Bài 4: Ki-lô-gam (kg) — Đơn vị đo khối lượng",
          "type": "learn",
          "description": "Đo cân nặng của đồ vật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bao gạo nặng 10 kg, quả dưa hấu nặng 3 kg. Ki-lô-gam viết tắt là kg! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Ki-lô-gam (kg) — Đơn vị đo khối lượng",
                "explanation": "Ki-lô-gam (viết tắt là kg) là đơn vị dùng để đo cân nặng của đồ vật và con người trong đời sống hàng ngày.",
                "rule": "Khi hai đĩa cân thăng bằng thau, cân nặng của hai bên là BẰNG NHAU!",
                "points": [
                  "Quả cân 1 kg đặt ở một bên đĩa cân, túi đường đặt ở bên đĩa cân còn lại thăng bằng: Túi đường nặng đúng 1 kg.",
                  "Vật càng nặng thì số ki-lô-gam càng lớn (ví dụ: bao gạo 10 kg nặng hơn túi đường 1 kg)."
                ]
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học",
                "title": "1 kg sắt và 1 kg bông, bên nào nặng hơn?",
                "dialogueList": [
                  {
                    "character": "nam",
                    "name": "Bạn Nam 👦",
                    "text": "Rô-bốt ơi, đố bạn biết 1 kg sắt và 1 kg bông, vật nào nặng hơn?"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "Sắt cứng và nặng lắm, nên chắc chắn 1 kg sắt phải nặng hơn 1 kg bông rồi!"
                  }
                ],
                "question": "Bạn Rô-bốt trả lời đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Sai rồi 👎",
                "explanation": "Bạn Rô-bốt nhầm rồi! Cả hai đều nặng đúng 1 ki-lô-gam (1 kg), vì vậy chúng NẶNG BẰNG NHAU! Chỉ là bông xốp thì phồng to hơn thanh sắt nhỏ gọn thôi bé nhé!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Gói kẹo nặng 2 kg, gói bánh nặng 3 kg. Cả hai gói nặng bao nhiêu kg?",
                "options": [
                  4,
                  5,
                  6,
                  7
                ],
                "answer": 5,
                "mascotHint": "2 + 3 = 5 kg!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Khối lượng:",
                "points": [
                  "Dùng cân để đo ki-lô-gam (kg)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l5",
          "title": "Bài 5: Lít (l) — Đơn vị đo dung tích",
          "type": "learn",
          "description": "Đo thể tích chất lỏng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chai dầu ăn 1 lít, can nước 5 lít. Lít viết tắt là l! 🥛"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Lít (l) — Đơn vị đo dung tích",
                "explanation": "Đo thể tích chất lỏng",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Can nước có 10 lít, rót ra bình 4 lít. Trong can còn lại mấy lít?",
                "options": [
                  5,
                  6,
                  7,
                  8
                ],
                "answer": 6,
                "mascotHint": "10 - 4 = 6 lít."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Dung tích:",
                "points": [
                  "Lít dùng đo thể tích nước, sữa, dầu..."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l6",
          "title": "Bài 6: Xem đồng hồ: Giờ và Phút",
          "type": "learn",
          "description": "Kim dài chỉ 15 phút, 30 phút",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi kim dài chỉ số 3 là 15 phút. Khi kim dài chỉ số 6 là 30 phút (hoặc rưỡi)! ⏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Xem Giờ Chuẩn Sư Phạm",
                "title": "Xem đồng hồ: Giờ đúng, 15 phút và 30 phút",
                "rule": "Kim dài ở số 12 là giờ đúng; ở số 3 là 15 phút; ở số 6 là 30 phút (hoặc rưỡi)!",
                "activityGrid": [
                  {
                    "period": "Giờ đúng ⏰",
                    "timeText": "8 giờ đúng",
                    "clock": { "hour": 8, "minute": 0, "frameColor": "#22c55e", "shape": "circle" },
                    "desc": "Kim dài chỉ thẳng đứng vào số 12, kim ngắn chỉ vào số 8."
                  },
                  {
                    "period": "Hơn 15 phút ⏰",
                    "timeText": "8 giờ 15 phút",
                    "clock": { "hour": 8, "minute": 15, "frameColor": "#06b6d4", "shape": "circle" },
                    "desc": "Kim dài đã chạy được một phần tư vòng tròn tới số 3 (15 phút)."
                  },
                  {
                    "period": "Giờ rưỡi (30 phút) ⏰",
                    "timeText": "8 giờ 30 phút",
                    "clock": { "hour": 8, "minute": 30, "frameColor": "#f97316", "shape": "circle" },
                    "desc": "Kim dài chỉ thẳng xuống số 6, kim ngắn ở giữa số 8 và số 9."
                  }
                ]
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học",
                "title": "8 giờ rưỡi và 8 giờ 30 phút",
                "focusGraphic": {
                  "type": "clock",
                  "hour": 8,
                  "minute": 30,
                  "frameColor": "#f97316",
                  "timeText": "8 giờ 30 phút"
                },
                "dialogueList": [
                  {
                    "character": "nam",
                    "name": "Bạn Nam 👦",
                    "text": "Mẹ tớ dặn đúng 8 rưỡi là phải đi ngủ. Tớ nhìn đồng hồ thấy 8 giờ 30 phút, vậy đã đến giờ đi ngủ chưa nhỉ?"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "Chưa đâu Nam ơi, 8 rưỡi khác 8 giờ 30 phút chứ!"
                  }
                ],
                "question": "Bạn Rô-bốt nói đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Sai rồi 👎",
                "explanation": "Bạn Rô-bốt nhầm rồi! 8 rưỡi chính là tên gọi thân quen của 8 giờ 30 phút! Khi kim phút chỉ vào số 6 (nửa vòng đồng hồ), ta gọi là 30 phút hoặc giờ rưỡi!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Kim ngắn chỉ qua số 8 một chút, kim dài chỉ số 6. Là mấy giờ?",
                "options": [
                  "8 giờ 15 phút",
                  "8 giờ 30 phút (8 rưỡi)",
                  "9 giờ 30 phút"
                ],
                "answer": "8 giờ 30 phút (8 rưỡi)",
                "mascotHint": "Kim dài chỉ số 6 là 30 phút!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xem đồng hồ:",
                "points": [
                  "Số 3: 15 phút",
                  "Số 6: 30 phút (rưỡi)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l7",
          "title": "Bài 7: Ngày, Giờ và Ngày trong tháng",
          "type": "learn",
          "description": "Lịch tháng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Một ngày có 24 giờ. Các tháng có 30 hoặc 31 ngày (tháng Hai có 28 hoặc 29 ngày)! 📅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Ngày, Giờ và Ngày trong tháng",
                "explanation": "Lịch tháng",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một ngày có bao nhiêu giờ?",
                "options": [
                  12,
                  24,
                  36,
                  48
                ],
                "answer": 24,
                "mascotHint": "Đúng 24 giờ một ngày!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thời gian:",
                "points": [
                  "1 ngày = 24 giờ",
                  "1 tuần = 7 ngày"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l8",
          "title": "Bài 8: Giờ đúng và Giờ kém",
          "type": "learn",
          "description": "Đọc giờ linh hoạt",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "9 giờ 45 phút còn có thể đọc là 10 giờ kém 15 phút! ⏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Giờ đúng và Giờ kém",
                "explanation": "Đọc giờ linh hoạt",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "7 giờ 50 phút đọc là mấy giờ kém?",
                "options": [
                  "7 giờ kém 10",
                  "8 giờ kém 10",
                  "8 giờ kém 50"
                ],
                "answer": "8 giờ kém 10",
                "mascotHint": "Còn 10 phút nữa là 8 giờ!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Giờ kém:",
                "points": [
                  "Cách xem giờ thông dụng thực tế"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l9",
          "title": "Bài 9: Thực hành tính toán đại lượng đo lường",
          "type": "learn",
          "description": "Cộng trừ có kèm đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "15 cm + 25 cm = 40 cm. 8 l × 2 = 16 l! Nhớ viết kèm tên đơn vị nhé! ✏️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thực hành tính toán đại lượng đo lường",
                "explanation": "Cộng trừ có kèm đơn vị",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 35 kg - 15 kg = ?",
                "options": [
                  "20",
                  "20 kg",
                  "50 kg",
                  "20 g"
                ],
                "answer": "20 kg",
                "mascotHint": "35 - 15 = 20 và giữ nguyên đơn vị kg!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính với đại lượng:",
                "points": [
                  "Luôn ghi kèm đơn vị đo ở kết quả."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l10",
          "title": "Bài 10: Luyện tập tổng hợp đo lường",
          "type": "learn",
          "description": "Hoàn thành Chương 6",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã thông thạo đo độ dài, cân nặng, dung tích và xem giờ! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Luyện tập tổng hợp đo lường",
                "explanation": "Hoàn thành Chương 6",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1m vải bớt đi 30cm thì còn lại bao nhiêu cm?",
                "options": [
                  "70 cm",
                  "60 cm",
                  "80 cm",
                  "29 cm"
                ],
                "answer": "70 cm",
                "mascotHint": "Đổi 1m = 100cm, rồi lấy 100 - 30 = 70cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé đo lường và tính toán cực chuẩn!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l11",
          "title": "Bài 11: Xem đồng hồ: Giờ rưỡi (30 phút) và 15 phút",
          "type": "learn",
          "description": "Đọc giờ chính xác từng góc kim",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi kim dài chỉ số 6 là 30 phút (giờ rưỡi). Khi kim dài chỉ số 3 là 15 phút! Ví dụ: 8 giờ 30 phút là 8 rưỡi! ⏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Xem đồng hồ: Giờ rưỡi (30 phút) và 15 phút",
                "explanation": "Trên đồng hồ kim: Kim ngắn chỉ GIỜ, kim dài chỉ PHÚT. Khi kim dài chỉ số 12 là giờ đúng, chỉ số 3 là 15 phút, chỉ số 6 là 30 phút (giờ rưỡi)!",
                "clock": {
                  "hour": 8,
                  "minute": 30,
                  "showLabels": true,
                  "timeText": "8 giờ 30 phút (8 giờ rưỡi)"
                },
                "rule": "Kim dài ở số 12: giờ đúng. Kim dài ở số 3: hơn 15 phút. Kim dài ở số 6: 30 phút (giờ rưỡi)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Kim ngắn ở giữa số 2 và 3, kim dài chỉ số 6. Là mấy giờ?",
                "options": [
                  "2 giờ 30 phút",
                  "3 giờ 30 phút",
                  "2 giờ 15 phút"
                ],
                "answer": "2 giờ 30 phút",
                "mascotHint": "Là 2 giờ rưỡi (2 giờ 30 phút)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đọc giờ phút:",
                "points": [
                  "Kim chỉ số 6 là 30 phút, chỉ số 3 là 15 phút"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c6-l12",
          "title": "Bài 12: Thực hành ước lượng cân nặng và dung tích",
          "type": "learn",
          "description": "Vận dụng vào cuộc sống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Một quả dưa hấu nặng khoảng 3 kg 🍉. Một chai dầu ăn chứa 1 lít 🛢️. Cùng ước lượng đồ dùng quanh em nhé!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thực hành ước lượng cân nặng và dung tích",
                "explanation": "Vận dụng vào cuộc sống",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bình nước uống ở lớp học thường chứa khoảng bao nhiêu lít nước?",
                "options": [
                  "2 lít",
                  "5 lít",
                  "20 lít",
                  "100 lít"
                ],
                "answer": "20 lít",
                "mascotHint": "Bình nước to thường chứa khoảng 20 lít!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 6:",
                "points": [
                  "Bé làm chủ các đơn vị đo: kg, lít, m, dm, cm, mm!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c7",
      "name": "Chủ đề 7: Hình phẳng & Hình khối (Đường gấp khúc, tứ giác, trụ, cầu)",
      "description": "Đường gấp khúc, hình tứ giác và bài toán thực tế",
      "icon": "📐",
      "color": "#4ECDC4",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c7-l1",
          "title": "Bài 1: Đường thẳng, Đường cong, Đường gấp khúc",
          "type": "learn",
          "description": "Phân biệt các dạng đường",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau mà không thẳng hàng! 〰️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Đường thẳng, Đường cong, Đường gấp khúc",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đường gồm các đoạn thẳng nối tiếp nhau gọi là gì?",
                "options": [
                  "Đường cong",
                  "Đường gấp khúc",
                  "Đường tròn"
                ],
                "answer": "Đường gấp khúc",
                "mascotHint": "Đường gấp khúc!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Các dạng đường:",
                "points": [
                  "Đường thẳng",
                  "Đường cong",
                  "Đường gấp khúc"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l2",
          "title": "Bài 2: Tính độ dài đường gấp khúc",
          "type": "learn",
          "description": "Cộng độ dài các đoạn thẳng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đường gấp khúc ABC gồm đoạn AB = 4cm và BC = 5cm. Độ dài đường gấp khúc = 4 + 5 = 9cm! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Tính độ dài đường gấp khúc",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đường gấp khúc gồm 3 đoạn dài: 3cm, 5cm, 2cm. Độ dài cả đường là:",
                "options": [
                  8,
                  10,
                  12,
                  15
                ],
                "answer": 10,
                "mascotHint": "3 + 5 + 2 = 10 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức:",
                "points": [
                  "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l3",
          "title": "Bài 3: Nhận biết Hình tứ giác",
          "type": "learn",
          "description": "Hình có 4 cạnh và 4 đỉnh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Hình vuông và hình chữ nhật đều là hình tứ giác vì chúng đều có 4 cạnh! 🔷"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Nhận biết Hình tứ giác",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình tứ giác là hình có mấy cạnh?",
                "options": [
                  3,
                  4,
                  5,
                  6
                ],
                "answer": 4,
                "mascotHint": "Tứ có nghĩa là 4!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hình tứ giác:",
                "points": [
                  "Hình phẳng khép kín có 4 cạnh."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l4",
          "title": "Bài 4: Khối trụ và Khối cầu",
          "type": "learn",
          "description": "Các khối hình không gian quen thuộc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Quả bóng đá ⚽ là khối cầu. Lon nước ngọt 🥤 là khối trụ tròn! 🥫"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Khối trụ và Khối cầu",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Quả bóng bàn có dạng khối gì?",
                "options": [
                  "Khối lập phương",
                  "Khối trụ",
                  "Khối cầu"
                ],
                "answer": "Khối cầu",
                "mascotHint": "Tròn vo lăn được mọi hướng là khối cầu."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Khối không gian:",
                "points": [
                  "Khối cầu: tròn lăn được",
                  "Khối trụ: có 2 mặt đáy tròn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l5",
          "title": "Bài 5: Giải bài toán có một phép tính cộng",
          "type": "learn",
          "description": "Bài toán thêm vào, gom lại",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vườn nhà bà có 15 cây cam và 20 cây bưởi. Cả vườn có: 15 + 20 = 35 cây! 🌳"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Giải bài toán có một phép tính cộng",
                "explanation": "Bài toán thêm vào, gom lại",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bể cá có 14 con cá vàng và 12 con cá bảy màu. Hỏi có tất cả bao nhiêu con cá?",
                "options": [
                  24,
                  26,
                  28,
                  22
                ],
                "answer": 26,
                "mascotHint": "14 + 12 = 26 con cá!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bài toán cộng:",
                "points": [
                  "Tìm tất cả thì làm phép cộng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l6",
          "title": "Bài 6: Giải bài toán có một phép tính trừ",
          "type": "learn",
          "description": "Bài toán bớt đi, còn lại",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cửa hàng có 45 chiếc cặp, đã bán được 20 chiếc. Còn lại: 45 - 20 = 25 chiếc cặp! 🎒"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Giải bài toán có một phép tính trừ",
                "explanation": "Bài toán bớt đi, còn lại",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tổ 1 có 32 ngôi sao, đã tặng bạn 10 ngôi sao. Tổ 1 còn lại mấy ngôi sao?",
                "options": [
                  20,
                  22,
                  24,
                  42
                ],
                "answer": 22,
                "mascotHint": "32 - 10 = 22!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bài toán trừ:",
                "points": [
                  "Tìm phần còn lại thì làm phép trừ."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l7",
          "title": "Bài 7: Giải bài toán bằng phép tính nhân",
          "type": "learn",
          "description": "Đại lượng gấp lên nhiều lần",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Mỗi bàn có 4 bạn ngồi. Có 5 bàn như thế. Có tất cả: 4 × 5 = 20 bạn! 🪑"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Giải bài toán bằng phép tính nhân",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mỗi túi có 5 quả cam. Có 6 túi như thế. Có tất cả bao nhiêu quả cam?",
                "options": [
                  25,
                  30,
                  35,
                  40
                ],
                "answer": 30,
                "mascotHint": "5 × 6 = 30 quả cam!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bài toán nhân:",
                "points": [
                  "Mỗi phần có ... nhân với số phần."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l8",
          "title": "Bài 8: Giải bài toán bằng phép tính chia",
          "type": "learn",
          "description": "Chia đều vào các nhóm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 24 quyển vở chia đều cho 4 bạn. Mỗi bạn được: 24 : 4 = 6 quyển vở! 📚"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Chia",
                "title": "Giải bài toán bằng phép tính chia",
                "explanation": "Phép chia là thao tác chia đều một nhóm đồ vật thành các phần bằng nhau. Trong phép chia: Số bị chia : Số chia = Thương.",
                "steps": [
                  {
                    "title": "Số bị chia",
                    "desc": "Tổng số lượng ban đầu đem chia."
                  },
                  {
                    "title": "Số chia",
                    "desc": "Số phần hoặc số lượng mỗi phần được chia."
                  },
                  {
                    "title": "Thương",
                    "desc": "Kết quả của phép chia."
                  }
                ],
                "rule": "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng: ví dụ 10 : 2 = 5 vì 2 × 5 = 10.",
                "example": {
                  "text": "Có 10 chiếc kẹo chia đều cho 2 bạn. Hỏi mỗi bạn được mấy chiếc kẹo? 👉 Lấy 10 chia cho 2: 10 : 2 = 5 chiếc kẹo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 20 bông hoa cắm đều vào 5 lọ. Mỗi lọ có mấy bông hoa?",
                "options": [
                  3,
                  4,
                  5,
                  6
                ],
                "answer": 4,
                "mascotHint": "20 : 5 = 4 bông hoa!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bài toán chia:",
                "points": [
                  "Chia đều đồ vật cho các nhóm."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l9",
          "title": "Bài 9: Thu thập, phân loại và kiểm đếm",
          "type": "learn",
          "description": "Biểu đồ tranh đơn giản",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đếm số bạn thích bóng đá ⚽, số bạn thích bơi lội 🏊‍♂️... rồi lập bảng kiểm đếm! 📊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thu thập, phân loại và kiểm đếm",
                "explanation": "Biểu đồ tranh đơn giản",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong lớp có 8 bạn thích táo, 12 bạn thích cam. Loại quả nào được nhiều bạn thích hơn?",
                "options": [
                  "Táo",
                  "Cam",
                  "Bằng nhau"
                ],
                "answer": "Cam",
                "mascotHint": "12 bạn thích cam > 8 bạn thích táo!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thu thập số liệu:",
                "points": [
                  "Kiểm đếm giúp so sánh dễ dàng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l10",
          "title": "Bài 10: Ôn tập cuối năm — Tốt nghiệp Lớp 2",
          "type": "learn",
          "description": "Tổng kết toàn diện kiến thức lớp 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã hoàn thành xuất sắc toàn bộ 7 chương của Lớp 2! 🎓🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Ôn tập cuối năm — Tốt nghiệp Lớp 2",
                "explanation": "Tổng kết toàn diện kiến thức lớp 2",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 × 4 + 180 = ?",
                "options": [
                  190,
                  200,
                  210,
                  220
                ],
                "answer": 200,
                "mascotHint": "5 × 4 = 20; 20 + 180 = 200!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chúc mừng thủ khoa Lớp 2!",
                "points": [
                  "Bé sẵn sàng tự tin bước lên Lớp 3!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l11",
          "title": "Bài 11: Đếm số hình tam giác, tứ giác trong hình vẽ",
          "type": "learn",
          "description": "Phát triển tư duy hình học không gian",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Đánh số 1, 2 vào từng mảnh hình đơn, sau đó ghép lại để không bị đếm sót hình nhé bé! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Đếm số hình tam giác, tứ giác trong hình vẽ",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một hình vuông được kẻ một đường chéo chia đôi. Ta đếm được bao nhiêu hình tam giác?",
                "options": [
                  1,
                  2,
                  3,
                  4
                ],
                "answer": 2,
                "mascotHint": "Đường chéo chia hình vuông thành 2 hình tam giác!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Mẹo đếm hình:",
                "points": [
                  "Đếm hình đơn trước rồi đếm hình ghép"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c7-l12",
          "title": "Bài 12: Đấu trường toán học: Đố vui hình tứ giác và đường gấp khúc",
          "type": "learn",
          "description": "Vận dụng hình học giải đố",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã hoàn thành xuất sắc Chương 7 Hình học và Giải toán! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học Trực Quan",
                "title": "Đấu trường toán học: Đố vui hình tứ giác và đường gấp khúc",
                "explanation": "Hình học phẳng và hình khối xung quanh chúng ta:",
                "points": [
                  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng thành phần.",
                  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
                  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được. Khối cầu tròn xoe như quả bóng."
                ],
                "rule": "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình tứ giác có bao nhiêu cạnh và bao nhiêu đỉnh?",
                "options": [
                  "4 cạnh và 4 đỉnh",
                  "3 cạnh và 3 đỉnh",
                  "5 cạnh và 5 đỉnh"
                ],
                "answer": "4 cạnh và 4 đỉnh",
                "mascotHint": "\"Tứ\" là 4: Hình tứ giác có 4 cạnh và 4 đỉnh!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 7:",
                "points": [
                  "Bé nắm vững hình tứ giác, đường gấp khúc và các khối không gian!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c8",
      "name": "Chủ đề 8: Phép cộng, phép trừ trong phạm vi 1 000",
      "description": "Cộng trừ các số có 3 chữ số có nhớ một lần",
      "icon": "🧮",
      "color": "#06b6d4",
      "totalLessons": 10,
      "lessons": [
        {
          "id": "g2-c8-l1",
          "title": "Bài 1: Phép cộng có nhớ trong phạm vi 1000",
          "type": "learn",
          "description": "Cộng hàng đơn vị có nhớ sang hàng chục",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "246 + 135: 6 + 5 = 11 (viết 1 nhớ 1), 4 + 3 = 7 thêm 1 là 8, 2 + 1 = 3. Được 381! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Cộng Có Nhớ",
                "title": "Phép cộng có nhớ trong phạm vi 1000",
                "explanation": "Khi cộng hàng đơn vị mà kết quả từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ 1 chục sang hàng chục!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết các chữ số cùng hàng thẳng cột với nhau (đơn vị thẳng đơn vị, chục thẳng chục)."
                  },
                  {
                    "title": "Bước 2: Cộng đơn vị",
                    "desc": "Cộng hàng đơn vị trước. Nếu từ 10 trở lên thì viết hàng đơn vị, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Cộng chục",
                    "desc": "Cộng hàng chục và nhớ thêm 1 vừa ghi nhớ vào kết quả."
                  }
                ],
                "rule": "Luôn cộng từ phải sang trái (đơn vị trước, chục sau). Đừng quên cộng thêm 1 nhớ vào hàng chục!",
                "example": {
                  "text": "Tính: 38 + 25 = ? 👉 Đơn vị: 8 + 5 = 13 (viết 3 nhớ 1). Chục: 3 + 2 = 5, thêm 1 nhớ là 6, vậy kết quả là 63!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 328 + 145 = ?",
                "options": [
                  463,
                  473,
                  483,
                  472
                ],
                "answer": 473,
                "mascotHint": "8+5=13 nhớ 1; 2+4=6 thêm 1 là 7; 3+1=4. Được 473!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng có nhớ:",
                "points": [
                  "Nhớ 1 sang hàng tiếp theo"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c8-l2",
          "title": "Bài 2: Phép trừ có nhớ trong phạm vi 1000",
          "type": "learn",
          "description": "Trừ có mượn hàng chục",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "562 - 238: 2 không trừ được 8, mượn 1 chục là 12 - 8 = 4. Hàng chục nhớ trả 1. Được 324! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Trừ Có Nhớ",
                "title": "Phép trừ có nhớ trong phạm vi 1000",
                "explanation": "Khi chữ số hàng đơn vị ở trên bé hơn chữ số ở dưới, ta mượn 1 chục (10) để trừ, rồi NHỚ 1 sang chữ số hàng chục của số trừ!",
                "steps": [
                  {
                    "title": "Bước 1: Đặt tính",
                    "desc": "Viết thẳng cột hàng đơn vị và hàng chục."
                  },
                  {
                    "title": "Bước 2: Trừ đơn vị",
                    "desc": "Nếu không trừ được, mượn 1 chục (10) để trừ, nhớ 1 sang hàng chục."
                  },
                  {
                    "title": "Bước 3: Trừ chục",
                    "desc": "Thêm 1 vào hàng chục của số trừ, rồi lấy hàng chục số bị trừ trừ đi."
                  }
                ],
                "rule": "Mượn 1 ở hàng chục để trừ đơn vị, rồi nhớ trả 1 sang hàng chục của số trừ.",
                "example": {
                  "text": "Tính: 51 - 24 = ? 👉 1 không trừ được 4, mượn 1 chục: 11 - 4 = 7 (viết 7 nhớ 1). 2 thêm 1 là 3; 5 - 3 = 2, vậy kết quả là 27!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 654 - 237 = ?",
                "options": [
                  417,
                  427,
                  407,
                  437
                ],
                "answer": 417,
                "mascotHint": "14 - 7 = 7; 5 - 3 - 1 = 1; 6 - 2 = 4. Được 417!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ có nhớ:",
                "points": [
                  "Mượn 1 ở hàng liền trước và nhớ trả"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c9",
      "name": "Chủ đề 9: Làm quen với thống kê & xác suất (Biểu đồ tranh, khả năng xảy ra)",
      "description": "Làm quen bảng số liệu, phân loại đối tượng và biểu đồ tranh",
      "icon": "📊",
      "color": "#f59e0b",
      "totalLessons": 10,
      "lessons": [
        {
          "id": "g2-c9-l1",
          "title": "Bài 1: Thu thập và kiểm đếm số liệu",
          "type": "learn",
          "description": "Ghi chép số lượng đồ vật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đếm số xe ô tô 🚗, số xe máy 🛵 đi qua cổng trường trong 5 phút! 📊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Thu thập và kiểm đếm số liệu",
                "explanation": "Ghi chép số lượng đồ vật",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Khi đếm đồ vật, dấu gạch chéo ⧄ thường biểu thị nhóm mấy đồ vật?",
                "options": [
                  3,
                  4,
                  5,
                  10
                ],
                "answer": 5,
                "mascotHint": "Một bó kiểm đếm gồm 4 gạch đứng và 1 gạch chéo là 5!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Kiểm đếm:",
                "points": [
                  "Nhóm 5 giúp đếm nhanh và không bị sót"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c9-l2",
          "title": "Bài 2: Đọc và hiểu biểu đồ tranh",
          "type": "learn",
          "description": "Mỗi hình biểu thị số lượng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Mỗi ngôi sao ⭐ đại diện cho 2 bông hoa điểm 10! 🌸"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Thống Kê & Xác Suất",
                "title": "Đọc và hiểu biểu đồ tranh",
                "explanation": "Thu thập số liệu giúp chúng ta hiểu rõ thông tin hơn. Dự đoán sự kiện bằng ba mức độ:",
                "points": [
                  "Chắc chắn: Sự kiện 100% sẽ xảy ra (ví dụ: Mặt trời mọc ở hướng Đông).",
                  "Có thể: Sự kiện có cơ hội xảy ra hoặc không xảy ra (ví dụ: Chiều nay có thể trời mưa).",
                  "Không thể: Sự kiện 0% cơ hội xảy ra (ví dụ: Con mèo biết bay như chim)."
                ],
                "rule": "Ba mức độ khả năng: Chắc chắn, Có thể, Không thể."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Nếu mỗi ⭐ là 2 điểm 10, thì 4 ngôi sao ⭐⭐⭐⭐ là mấy điểm 10?",
                "options": [
                  6,
                  8,
                  10,
                  4
                ],
                "answer": 8,
                "mascotHint": "2 × 4 = 8 điểm 10!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Biểu đồ tranh:",
                "points": [
                  "Chú ý quy ước giá trị của mỗi biểu tượng"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g2-c10",
      "name": "Chủ đề 10: Ôn tập cuối năm Lớp 2",
      "description": "Tổng hợp toàn diện kiến thức Lớp 2, sẵn sàng bước vào Lớp 3",
      "icon": "🏆",
      "color": "#eab308",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g2-c10-l1",
          "title": "Bài 1: Ôn tập bảng nhân và bảng chia 2, 3, 4, 5",
          "type": "learn",
          "description": "Phản xạ bảng cửu chương siêu tốc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng thử thách tính nhẩm nhanh bảng nhân 2, 3, 4, 5 nào bé! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Chất Phép Nhân",
                "title": "Ôn tập bảng nhân và bảng chia 2, 3, 4, 5",
                "explanation": "Phép nhân chính là tổng của các số hạng bằng nhau! Ví dụ: 2 được lấy 3 lần viết là: 2 × 3 = 2 + 2 + 2 = 6.",
                "steps": [
                  {
                    "title": "Thừa số 1",
                    "desc": "Số được lặp lại."
                  },
                  {
                    "title": "Thừa số 2",
                    "desc": "Số lần lặp lại."
                  },
                  {
                    "title": "Tích",
                    "desc": "Kết quả của phép nhân: Thừa số × Thừa số = Tích."
                  }
                ],
                "rule": "Thừa số × Thừa số = Tích. Đổi chỗ các thừa số thì tích không thay đổi!",
                "example": {
                  "text": "Có 4 đĩa táo, mỗi đĩa có 2 quả táo. 👉 2 được lấy 4 lần: 2 × 4 = 8 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 × 8 = ?",
                "options": [
                  35,
                  40,
                  45,
                  50
                ],
                "answer": 40,
                "mascotHint": "Năm nhân tám bằng bốn mươi!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân chia:",
                "points": [
                  "Thuộc làu bảng cửu chương 2 đến 5"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c10-l2",
          "title": "Bài 2: Ôn tập số và phép tính trong phạm vi 1000",
          "type": "learn",
          "description": "Cộng trừ và tìm thành phần chưa biết",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Tìm x: x + 240 = 600. Lấy 600 - 240 = 360! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Ôn tập số và phép tính trong phạm vi 1000",
                "explanation": "Cộng trừ và tìm thành phần chưa biết",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 450 + 350 = ?",
                "options": [
                  700,
                  800,
                  850,
                  900
                ],
                "answer": 800,
                "mascotHint": "450 + 350 = 800!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính toán thành thạo:",
                "points": [
                  "Cộng trừ số có 3 chữ số tự tin"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g2-c10-l3",
          "title": "Bài 3: Vinh Danh Trạng Nguyên Toán Học Lớp 2",
          "type": "learn",
          "description": "Tốt nghiệp Lớp 2 xuất sắc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã hoàn thành trọn vẹn 10 chương học Toán Lớp 2! Bé đã nắm chắc bảng cửu chương và sẵn sàng chinh phục Lớp 3! 🎓🎉"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Vinh Danh Trạng Nguyên Toán Học Lớp 2",
                "explanation": "Tốt nghiệp Lớp 2 xuất sắc",
                "rule": "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.",
                "points": [
                  "Nắm vững định nghĩa và quy tắc tính toán chuẩn.",
                  "Kiểm tra lại kết quả sau khi làm bài."
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé đã sẵn sàng bước vào Lớp 3 học thêm bảng nhân 6, 7, 8, 9 chưa?",
                "options": [
                  "Sẵn sàng 100%! 🚀",
                  "Háo hức khám phá! 🌟"
                ],
                "answer": "Sẵn sàng 100%! 🚀",
                "mascotHint": "Tự tin bước tiếp lên Lớp 3 nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tốt nghiệp Lớp 2:",
                "points": [
                  "Hoàn thành xuất sắc toàn bộ chương trình Toán Lớp 2!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    }
  ]
};
