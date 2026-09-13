// Data for Grade 3 (Lớp 3) - Chuẩn SGK Kết Nối Tri Thức
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

export const grade3Data = {
  "id": 3,
  "name": "Lớp 3",
  "description": "Số đến 100.000, bảng nhân chia 6-9, phân số, chu vi & diện tích",
  "icon": "🌸",
  "color": "#FFE66D",
  "ageRange": "8-9 tuổi",
  "chapters": [
    {
      "id": "g3-c1",
      "name": "Chủ đề 1: Ôn tập & Bổ sung (Số đến 1 000 & 10 000)",
      "description": "Mở rộng số có 4 chữ số: Hàng nghìn, trăm, chục, đơn vị",
      "icon": "🔢",
      "color": "#4facfe",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c1-l1",
          "title": "Bài 1: Ôn tập phép tính Lớp 2",
          "type": "learn",
          "description": "Củng cố cộng trừ nhân chia cơ bản",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chào mừng bạn lên Lớp 3! Khởi động với các phép tính quen thuộc nào! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Ôn tập phép tính Lớp 2",
                "explanation": "Củng cố cộng trừ nhân chia cơ bản",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 4 × 8 + 68 = ?",
                "options": [
                  98,
                  100,
                  102,
                  108
                ],
                "answer": 100,
                "mascotHint": "4 × 8 = 32; 32 + 68 = 100!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Khởi động tốt:",
                "points": [
                  "4 × 8 + 68 = 100"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l2",
          "title": "Bài 2: Các số có bốn chữ số",
          "type": "learn",
          "description": "Cấu tạo Nghìn - Trăm - Chục - Đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Số 3524 gồm: 3 nghìn, 5 trăm, 2 chục và 4 đơn vị! Đọc là: Ba nghìn năm trăm hai mươi tư! 🏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Các số có bốn chữ số",
                "explanation": "Cấu tạo Nghìn - Trăm - Chục - Đơn vị",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số \"Bốn nghìn hai trăm linh năm\" viết là:",
                "options": [
                  425,
                  4205,
                  4250,
                  4025
                ],
                "answer": 4205,
                "mascotHint": "4 nghìn, 2 trăm, 0 chục, 5 đơn vị."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cấu tạo số:",
                "points": [
                  "Hàng nghìn đứng đầu, đến trăm, chục, đơn vị."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l3",
          "title": "Bài 3: Các số tròn nghìn",
          "type": "learn",
          "description": "1000 đến 9000",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Các số tròn nghìn",
                "explanation": "1000 đến 9000",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số tròn nghìn liền sau 6000 là:",
                "options": [
                  5000,
                  6001,
                  7000,
                  8000
                ],
                "answer": 7000,
                "mascotHint": "6000 rồi đến 7000."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số tròn nghìn:",
                "points": [
                  "Có 3 chữ số 0 ở tận cùng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l4",
          "title": "Bài 4: Số 10.000 (Mười nghìn hay Một vạn)",
          "type": "learn",
          "description": "Chạm mốc 10.000",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "10 nghìn gọi là Mười nghìn hoặc Một vạn (10.000). Đây là số có 5 chữ số đầu tiên! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Số 10.000 (Mười nghìn hay Một vạn)",
                "explanation": "Chạm mốc 10.000",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền sau số 9999 là số nào?",
                "options": [
                  9990,
                  10000,
                  10001,
                  9998
                ],
                "answer": 10000,
                "mascotHint": "9999 + 1 = 10000."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số 10.000:",
                "points": [
                  "10 nghìn = 10.000"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l5",
          "title": "Bài 5: So sánh các số trong phạm vi 10.000",
          "type": "learn",
          "description": "So sánh từ hàng cao nhất",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "So sánh hàng nghìn trước: 6200 > 5900 vì 6 nghìn > 5 nghìn! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "So sánh các số trong phạm vi 10.000",
                "explanation": "So sánh từ hàng cao nhất",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 7540 ... 7504",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": ">",
                "mascotHint": "Cùng 7 nghìn 5 trăm, hàng chục 4 > 0 nên 7540 > 7504."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thứ tự so sánh:",
                "points": [
                  "Hàng nghìn, hàng trăm, hàng chục, rồi đến hàng đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l6",
          "title": "Bài 6: Phép cộng trong phạm vi 10.000 (Không nhớ)",
          "type": "learn",
          "description": "Cộng thẳng từng hàng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "3524 + 2143: 4+3=7, 2+4=6, 5+1=6, 3+2=5. Kết quả là 5667! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép cộng trong phạm vi 10.000 (Không nhớ)",
                "explanation": "Cộng thẳng từng hàng",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 4125 + 3452 = ?",
                "options": [
                  7577,
                  7567,
                  7477,
                  7587
                ],
                "answer": 7577,
                "mascotHint": "Cộng từng hàng từ phải sang trái!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng không nhớ:",
                "points": [
                  "4125 + 3452 = 7577"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l7",
          "title": "Bài 7: Phép cộng trong phạm vi 10.000 (Có nhớ)",
          "type": "learn",
          "description": "Nhớ sang hàng liền kề",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "4728 + 2536: 8+6=14 (viết 4 nhớ 1), 2+3=5 thêm 1 là 6, 7+5=12 (viết 2 nhớ 1), 4+2=6 thêm 1 là 7. Được 7264! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép cộng trong phạm vi 10.000 (Có nhớ)",
                "explanation": "Nhớ sang hàng liền kề",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 3628 + 4537 = ?",
                "options": [
                  8155,
                  8165,
                  8265,
                  7165
                ],
                "answer": 8165,
                "mascotHint": "8+7=15 nhớ 1; 2+3=5 thêm 1 là 6; 6+5=11 nhớ 1; 3+4=7 thêm 1 là 8."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng có nhớ:",
                "points": [
                  "Nhớ 1 sang hàng tiếp theo bên trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l8",
          "title": "Bài 8: Phép trừ trong phạm vi 10.000 (Không nhớ)",
          "type": "learn",
          "description": "Đặt tính thẳng cột và trừ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "7654 - 3212 = 4442! Trừ từ phải sang trái. 🍎"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép trừ trong phạm vi 10.000 (Không nhớ)",
                "explanation": "Đặt tính thẳng cột và trừ",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 6875 - 2531 = ?",
                "options": [
                  4344,
                  4354,
                  4334,
                  4444
                ],
                "answer": 4344,
                "mascotHint": "5-1=4; 7-3=4; 8-5=3; 6-2=4."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ không nhớ:",
                "points": [
                  "6875 - 2531 = 4344"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l9",
          "title": "Bài 9: Phép trừ trong phạm vi 10.000 (Có nhớ)",
          "type": "learn",
          "description": "Mượn 1 ở hàng kế trước",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "6325 - 2518: 15-8=7; 2 bớt 1 còn 1, 1-1=0; 13-5=8; 6 bớt 1 còn 5, 5-2=3. Được 3807! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép trừ trong phạm vi 10.000 (Có nhớ)",
                "explanation": "Mượn 1 ở hàng kế trước",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5240 - 2170 = ?",
                "options": [
                  3070,
                  3170,
                  3060,
                  2970
                ],
                "answer": 3070,
                "mascotHint": "0-0=0; 14-7=7; 2 bớt 1 còn 1, 1-1=0; 5-2=3."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ có nhớ:",
                "points": [
                  "Mượn 1 và nhớ trừ bù."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l10",
          "title": "Bài 10: Luyện tập tổng hợp Chương 1",
          "type": "learn",
          "description": "Hoàn thành Chương 1 Lớp 3",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bạn hoàn thành chương đầu tiên của Lớp 3! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Luyện tập tổng hợp Chương 1",
                "explanation": "Hoàn thành Chương 1 Lớp 3",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm số lớn nhất có 4 chữ số khác nhau:",
                "options": [
                  9999,
                  9876,
                  9998,
                  9870
                ],
                "answer": 9876,
                "mascotHint": "Các chữ số phải khác nhau: 9, 8, 7, 6!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé cộng trừ số có 4 chữ số rất nhanh!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l11",
          "title": "Bài 11: Làm tròn số đến hàng trăm, hàng nghìn",
          "type": "learn",
          "description": "Kỹ năng ước lượng số trong phạm vi 10.000",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 4.720 làm tròn đến hàng nghìn là 5.000 (vì chữ số hàng trăm là 7 >= 5). Số 3.240 làm tròn thành 3.000! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Làm tròn số đến hàng trăm, hàng nghìn",
                "explanation": "Kỹ năng ước lượng số trong phạm vi 10.000",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Làm tròn số 8.650 đến hàng nghìn ta được số nào?",
                "options": [
                  8000,
                  8600,
                  9000,
                  8700
                ],
                "answer": 9000,
                "mascotHint": "Hàng trăm là 6 nên làm tròn lên 9.000!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc làm tròn:",
                "points": [
                  "Nếu chữ số sau hàng làm tròn >= 5 thì cộng 1",
                  "Nếu < 5 thì giữ nguyên"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c1-l12",
          "title": "Bài 12: Thám tử nhí tìm số bí ẩn có 4 chữ số",
          "type": "learn",
          "description": "Giải mã câu đố logic toán học",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Tôi là số chẵn lớn nhất có 4 chữ số khác nhau, có chữ số hàng nghìn là 9. Đố bé tôi là số nào? 🕵️‍♂️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Thám tử nhí tìm số bí ẩn có 4 chữ số",
                "explanation": "Giải mã câu đố logic toán học",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số chẵn lớn nhất có 4 chữ số khác nhau là:",
                "options": [
                  9876,
                  9998,
                  9874,
                  9867
                ],
                "answer": 9876,
                "mascotHint": "Hàng nghìn là 9, hàng trăm là 8, hàng chục là 7, hàng đơn vị là số chẵn lớn nhất còn lại (6), nên là 9876!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 1:",
                "points": [
                  "Bé nắm vững cấu tạo và bản chất số có 4 chữ số!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c2",
      "name": "Chủ đề 2: Bảng nhân 6, 7, 8, 9 & Một phần mấy",
      "description": "Chinh phục toàn bộ bảng cửu chương nâng cao",
      "icon": "✖️",
      "color": "#51CF66",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c2-l1",
          "title": "Bài 1: Bảng nhân 6 (Phần 1: từ 6×1 đến 6×5)",
          "type": "learn",
          "description": "6, 12, 18, 24, 30",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Con bọ rùa có 6 chân 🐞. 2 con có 12 chân, 3 con có 18 chân, 5 con có 30 chân! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 6 (Phần 1: từ 6×1 đến 6×5)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 6 × 4 = ?",
                "options": [
                  20,
                  22,
                  24,
                  26
                ],
                "answer": 24,
                "mascotHint": "Sáu lần bốn hai mươi tư!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 6:",
                "points": [
                  "6, 12, 18, 24, 30"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l2",
          "title": "Bài 2: Bảng nhân 6 (Phần 2: từ 6×6 đến 6×10)",
          "type": "learn",
          "description": "Hoàn thành bảng nhân 6",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "6 × 6 = 36, 6 × 7 = 42, 6 × 8 = 48, 6 × 9 = 54, 6 × 10 = 60! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 6 (Phần 2: từ 6×6 đến 6×10)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 6 × 8 = ?",
                "options": [
                  42,
                  46,
                  48,
                  54
                ],
                "answer": 48,
                "mascotHint": "6 × 8 = 48!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 6:",
                "points": [
                  "Bé đã thuộc toàn bộ bảng nhân 6."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l3",
          "title": "Bài 3: Gấp một số lên nhiều lần",
          "type": "learn",
          "description": "Khái niệm \"gấp lên... lần\"",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đoạn thẳng AB dài 3cm, đoạn CD dài gấp 4 lần AB. Độ dài CD = 3 × 4 = 12cm! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Gấp Lên Nhiều Lần",
                "title": "Gấp một số lên nhiều lần",
                "explanation": "Muốn gấp một số lên nhiều lần, ta lấy số đó NHÂN với số lần!",
                "rule": "Gấp a lên n lần: Lấy a × n.",
                "example": {
                  "text": "Đoạn thẳng AB dài 6 cm, đoạn thẳng CD dài gấp 3 lần đoạn thẳng AB. Tính độ dài đoạn thẳng CD. 👉 Độ dài đoạn thẳng CD là: 6 × 3 = 18 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Năm nay Mai 6 tuổi, mẹ gấp 5 lần tuổi Mai. Mẹ bao nhiêu tuổi?",
                "options": [
                  25,
                  30,
                  35,
                  36
                ],
                "answer": 30,
                "mascotHint": "Lấy 6 × 5 = 30 tuổi!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Gấp lên n lần:",
                "points": [
                  "Muốn gấp một số lên n lần, ta lấy số đó nhân với n."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l4",
          "title": "Bài 4: Bảng nhân 7 (Phần 1: từ 7×1 đến 7×5)",
          "type": "learn",
          "description": "Một tuần có 7 ngày",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "7, 14, 21, 28, 35! 2 tuần là 14 ngày, 4 tuần là 28 ngày! 📅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 7 (Phần 1: từ 7×1 đến 7×5)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 7 × 3 = ?",
                "options": [
                  18,
                  20,
                  21,
                  24
                ],
                "answer": 21,
                "mascotHint": "Bảy lần ba hai mươi mốt!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 7:",
                "points": [
                  "7, 14, 21, 28, 35"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l5",
          "title": "Bài 5: Bảng nhân 7 (Phần 2: từ 7×6 đến 7×10)",
          "type": "learn",
          "description": "Hoàn thành bảng nhân 7",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "7 × 6 = 42, 7 × 7 = 49, 7 × 8 = 56, 7 × 9 = 63, 7 × 10 = 70! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 7 (Phần 2: từ 7×6 đến 7×10)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 7 × 8 = ?",
                "options": [
                  54,
                  56,
                  58,
                  63
                ],
                "answer": 56,
                "mascotHint": "Bảy lần tám năm mươi sáu!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 7:",
                "points": [
                  "7 × 7 = 49",
                  "7 × 8 = 56",
                  "7 × 9 = 63"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l6",
          "title": "Bài 6: Bảng nhân 8 (Phần 1: từ 8×1 đến 8×5)",
          "type": "learn",
          "description": "Bạch tuộc 8 xúc tu",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Mỗi chú bạch tuộc có 8 xúc tu 🐙: 8 × 1 = 8, 8 × 2 = 16, 8 × 3 = 24, 8 × 4 = 32, 8 × 5 = 40! 🌊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 8 (Phần 1: từ 8×1 đến 8×5)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 8 × 4 = ?",
                "options": [
                  28,
                  30,
                  32,
                  36
                ],
                "answer": 32,
                "mascotHint": "Tám lần bốn ba mươi hai!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 8:",
                "points": [
                  "8, 16, 24, 32, 40"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l7",
          "title": "Bài 7: Bảng nhân 8 (Phần 2: từ 8×6 đến 8×10)",
          "type": "learn",
          "description": "Hoàn thành bảng nhân 8",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "8 × 6 = 48, 8 × 7 = 56, 8 × 8 = 64, 8 × 9 = 72, 8 × 10 = 80! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 8 (Phần 2: từ 8×6 đến 8×10)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 8 × 8 = ?",
                "options": [
                  62,
                  64,
                  66,
                  72
                ],
                "answer": 64,
                "mascotHint": "Tám lần tám sáu mươi tư!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 8:",
                "points": [
                  "8 × 8 = 64",
                  "8 × 9 = 72"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l8",
          "title": "Bài 8: Bảng nhân 9 (Mẹo 10 ngón tay kỳ diệu)",
          "type": "learn",
          "description": "Tổng các chữ số luôn bằng 9",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Mẹo số 9: 9, 18 (1+8=9), 27 (2+7=9), 36 (3+6=9)... 9 × 9 = 81 (8+1=9)! 🧙‍♂️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng nhân 9 (Mẹo 10 ngón tay kỳ diệu)",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 9 × 6 = ?",
                "options": [
                  52,
                  54,
                  56,
                  63
                ],
                "answer": 54,
                "mascotHint": "5 + 4 = 9, vậy là 54!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng nhân 9:",
                "points": [
                  "9, 18, 27, 36, 45, 54, 63, 72, 81, 90"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l9",
          "title": "Bài 9: Nhân số có hai chữ số với số có một chữ số",
          "type": "learn",
          "description": "Đặt tính nhân",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "14 × 2: 4 × 2 = 8, 1 × 2 = 2. Được 28! Nếu có nhớ thì nhớ sang hàng chục! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Nhân số có hai chữ số với số có một chữ số",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 16 × 3 = ?",
                "options": [
                  42,
                  45,
                  48,
                  52
                ],
                "answer": 48,
                "mascotHint": "6 × 3 = 18 (viết 8 nhớ 1); 1 × 3 = 3 thêm 1 là 4."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đặt tính nhân:",
                "points": [
                  "Nhân từ hàng đơn vị sang hàng chục."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l10",
          "title": "Bài 10: Luyện tập chung toàn bộ bảng cửu chương",
          "type": "learn",
          "description": "Vua cửu chương",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bạn! Bạn đã thuộc làu toàn bộ bảng cửu chương từ 2 đến 9! 👑🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Luyện tập chung toàn bộ bảng cửu chương",
                "explanation": "Vua cửu chương",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 9 × 7 + 7 = ?",
                "options": [
                  68,
                  70,
                  72,
                  75
                ],
                "answer": 70,
                "mascotHint": "9 × 7 = 63; 63 + 7 = 70!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bậc thầy cửu chương!",
                "points": [
                  "Bé tính nhẩm nhân chia như máy tính!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l11",
          "title": "Bài 11: Ảo thuật ngón tay nhớ nhanh bảng nhân 9",
          "type": "learn",
          "description": "Mẹo tính nhẩm kỳ diệu bằng đôi bàn tay",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Xòe 10 ngón tay, gập ngón thứ 4: bên trái có 3 ngón (3 chục), bên phải có 6 ngón (6 đơn vị), nên là 9 × 4 = 36! Ảo thuật chưa nào! 🖐️✨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Ảo thuật ngón tay nhớ nhanh bảng nhân 9",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Dùng mẹo nhân 9: 9 × 7 bằng bao nhiêu?",
                "options": [
                  54,
                  63,
                  72,
                  81
                ],
                "answer": 63,
                "mascotHint": "Gập ngón thứ 7: bên trái 6 ngón, bên phải 3 ngón, nên là 63!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bí kíp bảng nhân 9:",
                "points": [
                  "Tổng 2 chữ số của tích bảng nhân 9 luôn bằng 9!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c2-l12",
          "title": "Bài 12: Đấu trường tính nhẩm siêu tốc bảng nhân",
          "type": "learn",
          "description": "Phản xạ bảng nhân 6, 7, 8, 9 trong 3 giây",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Cùng Cú Mèo thi tài tính nhẩm nhanh như chớp nhé! ⚡🦉"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đấu trường tính nhẩm siêu tốc bảng nhân",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính nhanh: 8 × 7 + 9 × 3 = ?",
                "options": [
                  73,
                  83,
                  85,
                  75
                ],
                "answer": 83,
                "mascotHint": "8 × 7 = 56; 9 × 3 = 27; 56 + 27 = 83!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 2:",
                "points": [
                  "Bé phản xạ thần tốc toàn bộ bảng nhân 6, 7, 8, 9!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c3",
      "name": "Chủ đề 3: Bảng chia 6, 7, 8, 9 & Phép chia có dư",
      "description": "Phép chia hết và quy tắc phép chia có dư",
      "icon": "➗",
      "color": "#FFE66D",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c3-l1",
          "title": "Bài 1: Bảng chia 6",
          "type": "learn",
          "description": "Dựa trên bảng nhân 6",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vì 6 × 7 = 42 nên 42 : 6 = 7! Ngược lại của bảng nhân 6. ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng chia 6",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 54 : 6 = ?",
                "options": [
                  7,
                  8,
                  9,
                  10
                ],
                "answer": 9,
                "mascotHint": "6 × 9 = 54 nên 54 : 6 = 9!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 6:",
                "points": [
                  "36 : 6 = 6",
                  "48 : 6 = 8"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l2",
          "title": "Bài 2: Giảm đi một số lần",
          "type": "learn",
          "description": "Khái niệm \"giảm đi... lần\"",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Sợi dây dài 18m, cắt ngắn đi 3 lần. Sợi dây còn: 18 : 3 = 6m! ✂️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Giảm Đi Nhiều Lần",
                "title": "Giảm đi một số lần",
                "explanation": "Muốn giảm một số đi nhiều lần, ta lấy số đó CHIA cho số lần!",
                "rule": "Giảm a đi n lần: Lấy a : n. (Phân biệt: Giảm đi n đơn vị là làm phép trừ a - n).",
                "example": {
                  "text": "Mẹ hái được 24 quả cam, sau khi biếu bà số cam giảm đi 4 lần. Hỏi mẹ còn bao nhiêu quả cam? 👉 Số cam còn lại là: 24 : 4 = 6 quả cam!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số 42 giảm đi 6 lần thì được mấy?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 7,
                "mascotHint": "Lấy 42 : 6 = 7!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Giảm đi n lần:",
                "points": [
                  "Muốn giảm một số đi n lần, lấy số đó chia cho n."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l3",
          "title": "Bài 3: Bảng chia 7",
          "type": "learn",
          "description": "Phép chia cho 7",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "28 : 7 = 4, 35 : 7 = 5, 49 : 7 = 7, 63 : 7 = 9! 📅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng chia 7",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 56 : 7 = ?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 8,
                "mascotHint": "7 × 8 = 56!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 7:",
                "points": [
                  "42 : 7 = 6",
                  "56 : 7 = 8"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l4",
          "title": "Bài 4: Bảng chia 8",
          "type": "learn",
          "description": "Phép chia cho 8",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Học thuộc bảng chia 8 siêu tốc cùng Cú Mèo: 32 : 8 = 4, 48 : 8 = 6, 64 : 8 = 8, 72 : 8 = 9! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng chia 8",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 72 : 8 = ?",
                "options": [
                  7,
                  8,
                  9,
                  10
                ],
                "answer": 9,
                "mascotHint": "8 × 9 = 72!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 8:",
                "points": [
                  "64 : 8 = 8",
                  "72 : 8 = 9"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l5",
          "title": "Bài 5: Bảng chia 9",
          "type": "learn",
          "description": "Phép chia cho 9",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "45 : 9 = 5, 54 : 9 = 6, 81 : 9 = 9! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bảng chia 9",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 63 : 9 = ?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 7,
                "mascotHint": "9 × 7 = 63!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng chia 9:",
                "points": [
                  "81 : 9 = 9",
                  "90 : 9 = 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l6",
          "title": "Bài 6: Làm quen với Phép chia có dư",
          "type": "learn",
          "description": "Khi không chia hết",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 9 cái kẹo chia cho 4 bạn. Mỗi bạn 2 cái, còn thừa (dư) 1 cái! Viết: 9 : 4 = 2 (dư 1) 🍬"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Làm quen với Phép chia có dư",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC VÀNG BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học",
                "title": "Thảo luận về số dư trong phép chia",
                "dialogueList": [
                  {
                    "character": "nam",
                    "name": "Bạn Nam 👦",
                    "text": "Rô-bốt ơi, tớ thực hiện phép chia 19 : 4 được kết quả là thương 3 và dư 7 đấy!"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "Ôi sai rồi Nam ơi! Số chia là 4 thì số dư không bao giờ được bằng 7 đâu!"
                  }
                ],
                "question": "Bạn Rô-bốt nói đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Đúng rồi 👍",
                "explanation": "Bạn Rô-bốt rất giỏi! Trong phép chia, số dư BẮT BUỘC phải BÉ HƠN số chia! Vì số chia là 4 nên số dư lớn nhất chỉ có thể là 3. Phép tính đúng phải là: 19 : 4 = 4 (dư 3)!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 11 : 2 = ?",
                "options": [
                  "5 (dư 1)",
                  "5 (dư 2)",
                  "6 (dư 1)"
                ],
                "answer": "5 (dư 1)",
                "mascotHint": "2 × 5 = 10; 11 - 10 = 1 (dư 1)."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Phép chia có dư:",
                "points": [
                  "Số bị chia = Thương × Số chia + Số dư"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l7",
          "title": "Bài 7: Quy tắc vàng: Số dư luôn bé hơn Số chia",
          "type": "learn",
          "description": "Nguyên tắc bất di bất dịch",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Trong phép chia cho 5, số dư chỉ có thể là: 1, 2, 3 hoặc 4. Số dư KHÔNG BAO GIỜ lớn hơn hoặc bằng số chia! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Quy tắc vàng: Số dư luôn bé hơn Số chia",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong phép chia cho 6, số dư lớn nhất có thể là số mấy?",
                "options": [
                  4,
                  5,
                  6,
                  7
                ],
                "answer": 5,
                "mascotHint": "Bé hơn 6 lớn nhất là số 5!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc vàng:",
                "points": [
                  "Số dư LUÔN BÉ HƠN số chia!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l8",
          "title": "Bài 8: Luyện tập phép chia có dư dạng 19 : 3 và 29 : 4",
          "type": "learn",
          "description": "Tìm thương và số dư",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "29 : 4: Nhẩm 4 × 7 = 28, 29 - 28 = 1. Vậy 29 : 4 = 7 (dư 1)! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Luyện tập phép chia có dư dạng 19 : 3 và 29 : 4",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 35 : 8 = ?",
                "options": [
                  "4 (dư 3)",
                  "4 (dư 2)",
                  "4 (dư 4)"
                ],
                "answer": "4 (dư 3)",
                "mascotHint": "8 × 4 = 32; 35 - 32 = 3."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính nhanh:",
                "points": [
                  "35 : 8 = 4 (dư 3)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l9",
          "title": "Bài 9: Chia số có hai chữ số cho số có một chữ số",
          "type": "learn",
          "description": "Đặt tính chia",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "48 : 2: 4 : 2 = 2, 8 : 2 = 4. Kết quả là 24! Chia từ hàng chục trước! ✏️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Chia số có hai chữ số cho số có một chữ số",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 69 : 3 = ?",
                "options": [
                  21,
                  22,
                  23,
                  24
                ],
                "answer": 23,
                "mascotHint": "6:3=2; 9:3=3. Được 23!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đặt tính chia:",
                "points": [
                  "Chia từ trái sang phải (từ hàng cao đến hàng thấp)."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l10",
          "title": "Bài 10: Luyện tập chung bảng chia & chia có dư",
          "type": "learn",
          "description": "Hoàn thành Chương 3",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bạn đã chinh phục toàn bộ bảng chia và phép chia có dư! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Luyện tập chung bảng chia & chia có dư",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 50 : 7 = ?",
                "options": [
                  "7 (dư 1)",
                  "7 (dư 2)",
                  "6 (dư 8)"
                ],
                "answer": "7 (dư 1)",
                "mascotHint": "7 × 7 = 49; 50 - 49 = 1."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé nắm chắc cả chia hết và chia có dư!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l11",
          "title": "Bài 11: Tìm thành phần chưa biết: Số bị chia và Số chia",
          "type": "learn",
          "description": "Bí quyết tìm x trong phép chia có dư",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư. Và số dư luôn luôn nhỏ hơn số chia! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Tìm thành phần chưa biết: Số bị chia và Số chia",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tìm số bị chia biết số chia là 7, thương là 8 và số dư là 5?",
                "options": [
                  56,
                  61,
                  62,
                  59
                ],
                "answer": 61,
                "mascotHint": "8 × 7 = 56; 56 + 5 = 61!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức vàng:",
                "points": [
                  "Số bị chia = Thương × Số chia + Số dư"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c3-l12",
          "title": "Bài 12: Bài toán thực tế đóng gói quà: Vận dụng chia có dư",
          "type": "learn",
          "description": "Ứng dụng chia có dư vào cuộc sống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 35 quyển vở đóng gói vào các túi quà, mỗi túi 8 quyển. Ta có: 35 : 8 = 4 túi (dư 3 quyển). Cần 5 túi nếu muốn đựng hết vở! 🎁"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Bài toán thực tế đóng gói quà: Vận dụng chia có dư",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 43 học sinh đi xe taxi, mỗi xe chở tối đa 4 bạn. Cần ít nhất bao nhiêu xe?",
                "options": [
                  10,
                  11,
                  12,
                  13
                ],
                "answer": 11,
                "mascotHint": "43 : 4 = 10 xe dư 3 bạn, cần thêm 1 xe nữa là 11 xe!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 3:",
                "points": [
                  "Bé vận dụng xuất sắc phép chia có dư vào đời sống!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c4",
      "name": "Chủ đề 4: Các số đến 100 000 & Chữ số La Mã",
      "description": "Số có 5 chữ số: Hàng chục nghìn đến hàng trăm nghìn",
      "icon": "💯",
      "color": "#FF6B6B",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c4-l1",
          "title": "Bài 1: Các số có năm chữ số",
          "type": "learn",
          "description": "Cấu tạo Chục nghìn - Nghìn - Trăm - Chục - Đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 35.214 gồm: 3 chục nghìn, 5 nghìn, 2 trăm, 1 chục, 4 đơn vị! Đọc là: Ba mươi lăm nghìn hai trăm mười bốn! 💰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Các số có năm chữ số",
                "explanation": "Cấu tạo Chục nghìn - Nghìn - Trăm - Chục - Đơn vị",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 5 chục nghìn, 4 nghìn, 3 trăm, 0 chục, 8 đơn vị viết là:",
                "options": [
                  5438,
                  54308,
                  54380,
                  50438
                ],
                "answer": 54308,
                "mascotHint": "Viết từ trái qua phải: 54308."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số có 5 chữ số:",
                "points": [
                  "Chục nghìn - Nghìn - Trăm - Chục - Đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l2",
          "title": "Bài 2: Các số tròn chục nghìn",
          "type": "learn",
          "description": "10.000 đến 90.000",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "10.000, 20.000, 30.000, 40.000... 90.000 và 100.000 (Một trăm nghìn)! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Các số tròn chục nghìn",
                "explanation": "10.000 đến 90.000",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số 100.000 có bao nhiêu chữ số 0?",
                "options": [
                  3,
                  4,
                  5,
                  6
                ],
                "answer": 5,
                "mascotHint": "Có đúng 5 chữ số 0: 100.000!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Số 100.000:",
                "points": [
                  "Một trăm nghìn có 6 chữ số."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l3",
          "title": "Bài 3: Đọc và viết số có năm chữ số",
          "type": "learn",
          "description": "Luyện kỹ năng chính tả số lớn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Tách lớp nghìn và lớp đơn vị bởi khoảng cách nhỏ để dễ đọc: 45 612! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đọc và viết số có năm chữ số",
                "explanation": "Luyện kỹ năng chính tả số lớn",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số \"Bảy mươi nghìn không trăm ba mươi\" viết là:",
                "options": [
                  7030,
                  70030,
                  70300,
                  73000
                ],
                "answer": 70030,
                "mascotHint": "70 nghìn, 0 trăm, 3 chục, 0 đơn vị: 70030."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đọc viết số lớn:",
                "points": [
                  "Đọc từng lớp từ trái sang phải."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l4",
          "title": "Bài 4: So sánh các số trong phạm vi 100.000",
          "type": "learn",
          "description": "So sánh từ hàng chục nghìn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "So sánh hàng chục nghìn trước: 62.000 > 58.000 vì 6 chục nghìn > 5 chục nghìn! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "So sánh các số trong phạm vi 100.000",
                "explanation": "So sánh từ hàng chục nghìn",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 83.450 ... 83.540",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": "<",
                "mascotHint": "Cùng 83 nghìn, hàng trăm 4 < 5 nên 83.450 < 83.540."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thứ tự so sánh:",
                "points": [
                  "So sánh lần lượt từ hàng cao nhất về hàng đơn vị."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l5",
          "title": "Bài 5: Phép cộng trong phạm vi 100.000",
          "type": "learn",
          "description": "Cộng số có 5 chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "35.240 + 21.350: Đặt tính thẳng cột và cộng từ phải sang trái! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép cộng trong phạm vi 100.000",
                "explanation": "Cộng số có 5 chữ số",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 42.000 + 15.000 = ?",
                "options": [
                  55000,
                  57000,
                  58000,
                  67000
                ],
                "answer": 57000,
                "mascotHint": "42 + 15 = 57 nghìn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cộng số lớn:",
                "points": [
                  "Cộng thẳng cột từ hàng đơn vị."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l6",
          "title": "Bài 6: Phép trừ trong phạm vi 100.000",
          "type": "learn",
          "description": "Trừ số có 5 chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "78.500 - 32.200 = 46.300! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phép trừ trong phạm vi 100.000",
                "explanation": "Trừ số có 5 chữ số",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 65.000 - 20.000 = ?",
                "options": [
                  40000,
                  45000,
                  50000,
                  35000
                ],
                "answer": 45000,
                "mascotHint": "65 - 20 = 45 nghìn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Trừ số lớn:",
                "points": [
                  "Trừ thẳng hàng dọc từ phải sang trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l7",
          "title": "Bài 7: Nhân số có năm chữ số với số có một chữ số",
          "type": "learn",
          "description": "Nhân số lớn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "12.300 × 3: 3 × 0 = 0, 3 × 0 = 0, 3 × 3 = 9, 3 × 2 = 6, 3 × 1 = 3. Được 36.900! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Nhân số có năm chữ số với số có một chữ số",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 20.000 × 4 = ?",
                "options": [
                  60000,
                  80000,
                  100000,
                  40000
                ],
                "answer": 80000,
                "mascotHint": "2 chục nghìn × 4 = 8 chục nghìn (80.000)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Nhân số lớn:",
                "points": [
                  "Nhân lần lượt từng hàng từ phải sang trái."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l8",
          "title": "Bài 8: Chia số có năm chữ số cho số có một chữ số",
          "type": "learn",
          "description": "Chia số lớn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "48.000 : 4 = 12.000! 60.000 : 3 = 20.000! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Chia số có năm chữ số cho số có một chữ số",
                "explanation": "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
                "points": [
                  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân sang hàng chục, hàng trăm.",
                  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước."
                ],
                "rule": "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 80.000 : 2 = ?",
                "options": [
                  20000,
                  40000,
                  60000,
                  16000
                ],
                "answer": 40000,
                "mascotHint": "8 : 2 = 4 chục nghìn (40.000)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chia số lớn:",
                "points": [
                  "Chia từ hàng cao nhất về hàng đơn vị."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l9",
          "title": "Bài 9: Làm tròn số đến hàng nghìn, hàng chục nghìn",
          "type": "learn",
          "description": "Khái niệm làm tròn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 48.200 gần 48.000 hơn hay 49.000 hơn? Gần 48.000 hơn, nên làm tròn thành 48.000! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Làm tròn số đến hàng nghìn, hàng chục nghìn",
                "explanation": "Khái niệm làm tròn",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Làm tròn số 75.800 đến hàng nghìn ta được số nào?",
                "options": [
                  75000,
                  76000,
                  70000,
                  80000
                ],
                "answer": 76000,
                "mascotHint": "Vì 800 > 500 nên làm tròn lên 76.000!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Làm tròn số:",
                "points": [
                  "Từ 500 trở lên thì làm tròn lên."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l10",
          "title": "Bài 10: Luyện tập tổng hợp số đến 100.000",
          "type": "learn",
          "description": "Hoàn thành Chương 4",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã chinh phục được những con số trăm nghìn khổng lồ! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Luyện tập tổng hợp số đến 100.000",
                "explanation": "Hoàn thành Chương 4",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền trước của 100.000 là số nào?",
                "options": [
                  99000,
                  99990,
                  99999,
                  100001
                ],
                "answer": 99999,
                "mascotHint": "100.000 bớt 1 là 99.999!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé đọc, viết, tính toán số đến 100.000 cực đỉnh!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l11",
          "title": "Bài 11: Làm quen với chữ số La Mã (I, V, X)",
          "type": "learn",
          "description": "Đọc đồng hồ cổ và số thế kỷ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Chữ I là 1, V là 5, X là 10. Ghép lại: VI là 6, IV là 4, IX là 9, XI là 11, XX là 20! 🏛️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Chữ Số La Mã Cổ Đại",
                "title": "Làm quen với chữ số La Mã (I, V, X)",
                "explanation": "Người La Mã cổ đại dùng các chữ cái in hoa để ghi số:",
                "points": [
                  "I = 1, V = 5, X = 10",
                  "Ghép số thêm (bên phải là cộng): VI = 6, VII = 7, VIII = 8, XI = 11, XII = 12",
                  "Ghép số bớt (bên trái là trừ): IV = 4 (5 - 1), IX = 9 (10 - 1)",
                  "XX = 20 (10 + 10), XXI = 21"
                ],
                "rule": "I = 1, V = 5, X = 10. Chữ số viết bên phải là cộng thêm, viết bên trái là trừ bớt.",
                "example": {
                  "text": "Chữ số La Mã IX biểu thị số tự nhiên nào? 👉 X là 10, chữ I đứng trước X là bớt 1: 10 - 1 = 9. Vậy IX là số 9!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Chữ số La Mã VIII biểu diễn số mấy?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 8,
                "mascotHint": "V là 5 thêm 3 chữ I là 8!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chữ số La Mã:",
                "points": [
                  "I = 1, V = 5, X = 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c4-l12",
          "title": "Bài 12: Đố vui thám tử: Giải mã số bí ẩn có 5 chữ số",
          "type": "learn",
          "description": "Phát triển tư duy phân tích toán học",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Số gồm 5 chục nghìn, 0 nghìn, 3 trăm, 0 chục và 8 đơn vị là số 50.308! 🔍"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đố vui thám tử: Giải mã số bí ẩn có 5 chữ số",
                "explanation": "Phát triển tư duy phân tích toán học",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 9 chục nghìn và 9 đơn vị viết là:",
                "options": [
                  90009,
                  90090,
                  99000,
                  909
                ],
                "answer": 90009,
                "mascotHint": "Các hàng nghìn, trăm, chục bằng 0: 90.009!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 4:",
                "points": [
                  "Bé làm chủ các số lớn đến 100.000!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c5",
      "name": "Chủ đề 5: Khái niệm phân số & Biểu thức số",
      "description": "Khái niệm phân số, tử số, mẫu số và so sánh phân số",
      "icon": "🍰",
      "color": "#4facfe",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c5-l1",
          "title": "Bài 1: Khái niệm Phân số",
          "type": "learn",
          "description": "Chia đều đồ vật thành nhiều phần",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cắt chiếc bánh pizza làm 2 phần bằng nhau, lấy 1 phần gọi là Một phần hai (1/2). 🍕"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Khái niệm Phân số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Chia một quả cam làm 4 phần bằng nhau, ăn 1 phần. Đã ăn mấy phần quả cam?",
                "options": [
                  "1/2",
                  "1/3",
                  "1/4",
                  "4/1"
                ],
                "answer": "1/4",
                "mascotHint": "Lấy 1 trong 4 phần viết là 1/4."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Phân số:",
                "points": [
                  "Phân số biểu thị các phần bằng nhau của một tổng thể."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l2",
          "title": "Bài 2: Tử số và Mẫu số",
          "type": "learn",
          "description": "Cấu tạo của một phân số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Trong phân số 3/4: số 3 ở trên gọi là Tử số, số 4 ở dưới gọi là Mẫu số. Dấu gạch ngang ở giữa! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Tử số và Mẫu số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong phân số 2/5, số 5 được gọi là gì?",
                "options": [
                  "Tử số",
                  "Mẫu số",
                  "Thương",
                  "Tổng"
                ],
                "answer": "Mẫu số",
                "mascotHint": "Số ở dưới mẫu gọi là Mẫu số!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cấu tạo phân số:",
                "points": [
                  "Tử số ở trên, Mẫu số ở dưới."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l3",
          "title": "Bài 3: Ý nghĩa của Mẫu số và Tử số",
          "type": "learn",
          "description": "Mẫu số là tổng số phần, Tử số là số phần lấy đi",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Mẫu số cho biết chiếc bánh chia làm mấy phần. Tử số cho biết ta lấy mấy phần! 🍰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Ý nghĩa của Mẫu số và Tử số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Thanh socola chia 6 phần bằng nhau, bé ăn 2 phần. Phân số chỉ số phần socola đã ăn là:",
                "options": [
                  "2/6",
                  "6/2",
                  "4/6",
                  "1/6"
                ],
                "answer": "2/6",
                "mascotHint": "Ăn 2 phần trên tổng số 6 phần là 2/6!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ý nghĩa:",
                "points": [
                  "Tử số: phần đã lấy",
                  "Mẫu số: tổng số phần bằng nhau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l4",
          "title": "Bài 4: Phân số bằng 1",
          "type": "learn",
          "description": "Khi tử số bằng mẫu số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chiếc bánh chia 4 phần, ăn hết cả 4 phần nghĩa là ăn cả chiếc bánh! 4/4 = 1! 🎂"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phân số bằng 1",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Phân số nào sau đây có giá trị bằng 1?",
                "options": [
                  "3/4",
                  "5/5",
                  "2/3",
                  "1/5"
                ],
                "answer": "5/5",
                "mascotHint": "Tử số bằng mẫu số thì bằng 1."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Phân số = 1:",
                "points": [
                  "Khi tử số = mẫu số thì phân số bằng 1."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l5",
          "title": "Bài 5: Phân số bé hơn 1 và lớn hơn 1",
          "type": "learn",
          "description": "So sánh tử số với mẫu số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Tử số < Mẫu số thì phân số < 1 (ví dụ: 3/5 < 1). Tử số > Mẫu số thì phân số > 1 (ví dụ: 5/3 > 1)! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Phân số bé hơn 1 và lớn hơn 1",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Phân số nào sau đây bé hơn 1?",
                "options": [
                  "7/5",
                  "4/3",
                  "3/8",
                  "9/9"
                ],
                "answer": "3/8",
                "mascotHint": "Tử số 3 bé hơn mẫu số 8 nên 3/8 < 1."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "So sánh với 1:",
                "points": [
                  "Tử < Mẫu: bé hơn 1",
                  "Tử = Mẫu: bằng 1",
                  "Tử > Mẫu: lớn hơn 1"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l6",
          "title": "Bài 6: So sánh hai phân số cùng mẫu số",
          "type": "learn",
          "description": "So sánh tử số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Cùng chia làm 7 phần: ăn 5 phần (5/7) chắc chắn nhiều hơn ăn 3 phần (3/7)! Vậy 5/7 > 3/7! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "So sánh hai phân số cùng mẫu số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 4/9 ... 7/9",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": "<",
                "mascotHint": "Cùng mẫu 9, tử số 4 < 7 nên 4/9 < 7/9."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Cùng mẫu số:",
                "points": [
                  "Phân số nào có tử số lớn hơn thì lớn hơn."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l7",
          "title": "Bài 7: Tô màu hình phân số",
          "type": "learn",
          "description": "Trực quan hóa hình học",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hình vuông chia 4 ô nhỏ, tô màu 3 ô là ta đã tô 3/4 hình vuông! 🎨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Tô màu hình phân số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình tròn chia 8 phần bằng nhau, tô màu 5 phần. Phân số biểu diễn phần tô màu là:",
                "options": [
                  "3/8",
                  "5/8",
                  "8/5",
                  "5/3"
                ],
                "answer": "5/8",
                "mascotHint": "Tô 5 phần trên 8 phần là 5/8."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hình học phân số:",
                "points": [
                  "Tô màu trực quan giúp bé hiểu sâu hơn."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l8",
          "title": "Bài 8: Tìm phân số của một tập hợp đồ vật",
          "type": "learn",
          "description": "Áp dụng vào nhóm đồ vật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 10 quả bóng, trong đó 3 quả màu đỏ. Phân số chỉ bóng đỏ là 3/10! 🎈"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Tìm phân số của một tập hợp đồ vật",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một đàn gà có 12 con, gồm 7 con gà mái. Phân số chỉ số gà mái trong đàn là:",
                "options": [
                  "5/12",
                  "7/12",
                  "12/7"
                ],
                "answer": "7/12",
                "mascotHint": "7 con gà mái trên tổng số 12 con là 7/12."
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tập hợp:",
                "points": [
                  "Số vật được chọn / Tổng số vật"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l9",
          "title": "Bài 9: Các phân số thông dụng trong đời sống",
          "type": "learn",
          "description": "1/2, 1/3, 1/4, 3/4",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "\"Một nửa lít sữa\" (1/2 lít), \"Ba phần tư giờ\" (3/4 giờ = 45 phút)! 🥛⏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Các phân số thông dụng trong đời sống",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 giờ có 60 phút. 1/2 giờ là bao nhiêu phút?",
                "options": [
                  "20 phút",
                  "30 phút",
                  "40 phút",
                  "15 phút"
                ],
                "answer": "30 phút",
                "mascotHint": "60 : 2 = 30 phút!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thực tế:",
                "points": [
                  "Phân số xuất hiện khắp nơi trong đời sống."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l10",
          "title": "Bài 10: Luyện tập tổng hợp Phân số",
          "type": "learn",
          "description": "Hoàn thành Chương 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã làm quen với phân số cực kỳ xuất sắc! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Luyện tập tổng hợp Phân số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong các phân số: 2/7, 5/7, 1/7, 6/7. Phân số nào lớn nhất?",
                "options": [
                  "2/7",
                  "5/7",
                  "1/7",
                  "6/7"
                ],
                "answer": "6/7",
                "mascotHint": "Tử số 6 lớn nhất nên 6/7 lớn nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chúc mừng bé!",
                "points": [
                  "Bé nắm chắc bản chất phân số!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l11",
          "title": "Bài 11: So sánh hai phân số có cùng tử số",
          "type": "learn",
          "description": "Chia bánh cho ít người hơn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng 1 chiếc bánh pizza 🍕: chia cho 4 người (1/4) thì mỗi người được phần to hơn chia cho 8 người (1/8)! Vậy 1/4 > 1/8! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "So sánh hai phân số có cùng tử số",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 3/5 ... 3/7",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": ">",
                "mascotHint": "Cùng tử số 3, mẫu số 5 bé hơn 7 nên phân số 3/5 lớn hơn 3/7!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc cùng tử số:",
                "points": [
                  "Phân số nào có mẫu số bé hơn thì phân số đó lớn hơn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c5-l12",
          "title": "Bài 12: Đố vui phân số: Bữa tiệc bánh sinh nhật",
          "type": "learn",
          "description": "Phân số trong bữa tiệc ấm áp",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chiếc bánh sinh nhật cắt thành 12 miếng bằng nhau. Bé ăn 2 miếng, anh ăn 3 miếng. Cả hai anh em ăn 5/12 chiếc bánh! 🎂"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đố vui phân số: Bữa tiệc bánh sinh nhật",
                "explanation": "Khi một vật thể được chia thành các phần BẰNG NHAU:",
                "points": [
                  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
                  "Chia thành 3 phần bằng nhau, lấy 1 phần: gọi là một phần ba (1/3).",
                  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới (tổng số phần bằng nhau được chia), ngăn cách bởi dấu gạch ngang."
                ],
                "rule": "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
                "example": {
                  "text": "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu phần chiếc bánh? 👉 Bé đã ăn 1/4 (một phần tư) chiếc bánh pizza!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một đàn gà có 10 con, trong đó có 6 con gà mái. Phân số chỉ số gà mái là:",
                "options": [
                  "4/10",
                  "6/10",
                  "10/6",
                  "6/4"
                ],
                "answer": "6/10",
                "mascotHint": "Có 6 con gà mái trên tổng số 10 con: 6/10!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 5:",
                "points": [
                  "Bé hiểu sâu sắc ý nghĩa thực tế của phân số!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c6",
      "name": "Chủ đề 6: Chu vi & Diện tích một số hình phẳng (cm²)",
      "description": "Góc vuông, chu vi và diện tích hình chữ nhật, hình vuông",
      "icon": "📐",
      "color": "#51CF66",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c6-l1",
          "title": "Bài 1: Góc vuông và Góc không vuông",
          "type": "learn",
          "description": "Sử dụng ê-ke để kiểm tra",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Góc bàn, góc quyển sách, góc màn hình tivi... đều là góc vuông! Thước ê-ke dùng để kiểm tra góc vuông! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học & Thước Ê-ke",
                "title": "Góc vuông và Góc không vuông",
                "explanation": "Dùng thước ê-ke để kiểm tra và vẽ góc vuông:",
                "points": [
                  "Thước ê-ke có một góc vuông và hai góc nhọn.",
                  "Góc đỉnh O; cạnh OA, OB trùng khít với hai cạnh góc vuông của ê-ke là GÓC VUÔNG.",
                  "Góc không trùng khít là góc không vuông (góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông)."
                ],
                "rule": "Đặt đỉnh góc vuông của thước ê-ke trùng với đỉnh của góc cần kiểm tra."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình vuông có mấy góc vuông?",
                "options": [
                  2,
                  3,
                  4,
                  0
                ],
                "answer": 4,
                "mascotHint": "Có đúng 4 góc vuông!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Góc vuông:",
                "points": [
                  "Thước ê-ke giúp nhận biết góc vuông chính xác."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l2",
          "title": "Bài 2: Chu vi hình tam giác và hình tứ giác",
          "type": "learn",
          "description": "Tổng độ dài các cạnh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chu vi là tổng độ dài các cạnh bao quanh hình đó! Tam giác có 3 cạnh dài 3cm, 4cm, 5cm có chu vi: 3 + 4 + 5 = 12cm! 🏃‍♂️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Chu vi hình tam giác và hình tứ giác",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tam giác có 3 cạnh đều dài 5cm. Chu vi tam giác đó là:",
                "options": [
                  10,
                  15,
                  20,
                  25
                ],
                "answer": 15,
                "mascotHint": "5 + 5 + 5 = 15 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chu vi tam giác:",
                "points": [
                  "Cộng độ dài cả 3 cạnh lại với nhau."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l3",
          "title": "Bài 3: Chu vi hình chữ nhật",
          "type": "learn",
          "description": "Công thức (Dài + Rộng) × 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Muốn tính chu vi hình chữ nhật: Lấy chiều dài cộng chiều rộng (cùng đơn vị đo) rồi nhân với 2! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Chu vi hình chữ nhật",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình chữ nhật có chiều dài 6cm, chiều rộng 4cm. Chu vi là:",
                "options": [
                  10,
                  20,
                  24,
                  16
                ],
                "answer": 20,
                "mascotHint": "(6 + 4) × 2 = 10 × 2 = 20 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức:",
                "points": [
                  "Chu vi HCN = (chiều dài + chiều rộng) × 2"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l4",
          "title": "Bài 4: Chu vi hình vuông",
          "type": "learn",
          "description": "Công thức Cạnh × 4",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vì hình vuông có 4 cạnh bằng nhau, nên chu vi hình vuông = Độ dài một cạnh nhân với 4! 🔲"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Chu vi hình vuông",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình vuông có cạnh dài 8cm. Chu vi hình vuông đó là:",
                "options": [
                  16,
                  24,
                  32,
                  64
                ],
                "answer": 32,
                "mascotHint": "8 × 4 = 32 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức:",
                "points": [
                  "Chu vi hình vuông = Cạnh × 4"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l5",
          "title": "Bài 5: Làm quen với Diện tích",
          "type": "learn",
          "description": "Đo bề mặt của hình",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bề mặt chiếc bàn, nền nhà căn phòng... gọi là diện tích. Đơn vị đo diện tích là Xăng-ti-mét vuông (cm²)! ⬛"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Diện Tích",
                "title": "Làm quen với Diện tích",
                "explanation": "Diện tích là độ lớn của bề mặt hình phẳng, đo bằng đơn vị xăng-ti-mét vuông (cm²):",
                "points": [
                  "Diện tích hình chữ nhật: S = chiều dài × chiều rộng (cùng đơn vị đo).",
                  "Diện tích hình vuông: S = độ dài một cạnh × độ dài một cạnh (S = a × a).",
                  "1 cm² là diện tích của một hình vuông có cạnh dài 1 cm."
                ],
                "rule": "Diện tích hình chữ nhật: S = a × b. Diện tích hình vuông: S = a × a (đơn vị cm²).",
                "example": {
                  "text": "Hình vuông có cạnh dài 6 cm. Tính diện tích hình vuông. 👉 Diện tích hình vuông = 6 × 6 = 36 cm²!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đơn vị xăng-ti-mét vuông viết tắt là:",
                "options": [
                  "cm",
                  "cm2",
                  "cm²",
                  "m2"
                ],
                "answer": "cm²",
                "mascotHint": "Có số 2 nhỏ ở phía trên: cm²!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Diện tích:",
                "points": [
                  "Đo bằng cm² (ô vuông cạnh 1cm)."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l6",
          "title": "Bài 6: Diện tích hình chữ nhật",
          "type": "learn",
          "description": "Công thức Dài × Rộng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Muốn tính diện tích hình chữ nhật: Lấy chiều dài nhân với chiều rộng (cùng đơn vị đo)! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Diện Tích",
                "title": "Diện tích hình chữ nhật",
                "explanation": "Diện tích là độ lớn của bề mặt hình phẳng, đo bằng đơn vị xăng-ti-mét vuông (cm²):",
                "points": [
                  "Diện tích hình chữ nhật: S = chiều dài × chiều rộng (cùng đơn vị đo).",
                  "Diện tích hình vuông: S = độ dài một cạnh × độ dài một cạnh (S = a × a).",
                  "1 cm² là diện tích của một hình vuông có cạnh dài 1 cm."
                ],
                "rule": "Diện tích hình chữ nhật: S = a × b. Diện tích hình vuông: S = a × a (đơn vị cm²).",
                "example": {
                  "text": "Hình vuông có cạnh dài 6 cm. Tính diện tích hình vuông. 👉 Diện tích hình vuông = 6 × 6 = 36 cm²!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình chữ nhật có chiều dài 7cm, chiều rộng 4cm. Diện tích là:",
                "options": [
                  22,
                  28,
                  11,
                  32
                ],
                "answer": 28,
                "mascotHint": "7 × 4 = 28 cm²!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức:",
                "points": [
                  "Diện tích HCN = chiều dài × chiều rộng (cm²)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l7",
          "title": "Bài 7: Diện tích hình vuông",
          "type": "learn",
          "description": "Công thức Cạnh × Cạnh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Muốn tính diện tích hình vuông: Lấy độ dài một cạnh nhân với chính nó! 🔲"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Diện Tích",
                "title": "Diện tích hình vuông",
                "explanation": "Diện tích là độ lớn của bề mặt hình phẳng, đo bằng đơn vị xăng-ti-mét vuông (cm²):",
                "points": [
                  "Diện tích hình chữ nhật: S = chiều dài × chiều rộng (cùng đơn vị đo).",
                  "Diện tích hình vuông: S = độ dài một cạnh × độ dài một cạnh (S = a × a).",
                  "1 cm² là diện tích của một hình vuông có cạnh dài 1 cm."
                ],
                "rule": "Diện tích hình chữ nhật: S = a × b. Diện tích hình vuông: S = a × a (đơn vị cm²).",
                "example": {
                  "text": "Hình vuông có cạnh dài 6 cm. Tính diện tích hình vuông. 👉 Diện tích hình vuông = 6 × 6 = 36 cm²!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình vuông có cạnh 5cm. Diện tích hình vuông đó là:",
                "options": [
                  20,
                  25,
                  10,
                  30
                ],
                "answer": 25,
                "mascotHint": "5 × 5 = 25 cm²!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức:",
                "points": [
                  "Diện tích hình vuông = cạnh × cạnh (cm²)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l8",
          "title": "Bài 8: Phân biệt Chu vi và Diện tích",
          "type": "learn",
          "description": "Viền bao quanh vs Toàn bộ bề mặt",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hàng rào bao quanh mảnh vườn là Chu vi (đo bằng m). Toàn bộ đất bên trong trồng rau là Diện tích (đo bằng m²)! 🏡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Phân biệt Chu vi và Diện tích",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Lát gạch kín sàn phòng học cần tính đại lượng nào?",
                "options": [
                  "Chu vi",
                  "Diện tích",
                  "Độ dài"
                ],
                "answer": "Diện tích",
                "mascotHint": "Lát kín bề mặt là tính diện tích!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Phân biệt:",
                "points": [
                  "Chu vi: đo viền (cm, m)",
                  "Diện tích: đo bề mặt kín (cm², m²)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l9",
          "title": "Bài 9: Bài toán thực tế về Chu vi & Diện tích",
          "type": "learn",
          "description": "Ứng dụng xây dựng và đời sống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bác nông dân rào một mảnh vườn hình chữ nhật dài 10m, rộng 6m. Bác cần bao nhiêu mét lưới rào? Tính chu vi: (10+6)×2 = 32m! 🌾"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Bài toán thực tế về Chu vi & Diện tích",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tấm bìa hình vuông cạnh 6cm. Diện tích tấm bìa đó là:",
                "options": [
                  24,
                  36,
                  12,
                  18
                ],
                "answer": 36,
                "mascotHint": "6 × 6 = 36 cm²!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thực tế:",
                "points": [
                  "Ứng dụng tính toán chuẩn xác cho các bài toán đời sống."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l10",
          "title": "Bài 10: Luyện tập tổng hợp Chu vi & Diện tích",
          "type": "learn",
          "description": "Hoàn thành Chương 6",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã nắm vững công thức chu vi và diện tích! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Luyện tập tổng hợp Chu vi & Diện tích",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình chữ nhật có chu vi 24cm, chiều dài 8cm. Chiều rộng là:",
                "options": [
                  4,
                  6,
                  8,
                  16
                ],
                "answer": 4,
                "mascotHint": "Nửa chu vi: 24:2 = 12cm; Chiều rộng: 12 - 8 = 4cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé là kiến trúc sư nhí thông thái!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l11",
          "title": "Bài 11: Góc vuông, góc nhọn và góc tù quanh em",
          "type": "learn",
          "description": "Khám phá các góc hình học",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Dùng ê-ke để kiểm tra: Góc bé hơn góc vuông là góc nhọn (như mũi kim), góc lớn hơn góc vuông là góc tù (như cánh quạt xòe rộng)! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hình Học & Thước Ê-ke",
                "title": "Góc vuông, góc nhọn và góc tù quanh em",
                "explanation": "Dùng thước ê-ke để kiểm tra và vẽ góc vuông:",
                "points": [
                  "Thước ê-ke có một góc vuông và hai góc nhọn.",
                  "Góc đỉnh O; cạnh OA, OB trùng khít với hai cạnh góc vuông của ê-ke là GÓC VUÔNG.",
                  "Góc không trùng khít là góc không vuông (góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông)."
                ],
                "rule": "Đặt đỉnh góc vuông của thước ê-ke trùng với đỉnh của góc cần kiểm tra."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Góc tạo bởi hai kim đồng hồ lúc 3 giờ đúng là góc gì?",
                "options": [
                  "Góc vuông",
                  "Góc nhọn",
                  "Góc tù"
                ],
                "answer": "Góc vuông",
                "mascotHint": "Kim chỉ số 12 và số 3 tạo thành một góc vuông 90 độ!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Nhận biết các loại góc:",
                "points": [
                  "Góc vuông, góc nhọn (< vuông), góc tù (> vuông)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c6-l12",
          "title": "Bài 12: Thực hành tính diện tích sàn nhà và sân trường",
          "type": "learn",
          "description": "Hình học thực tế phục vụ đời sống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Sân chơi hình chữ nhật dài 10 m, rộng 6 m. Diện tích sân chơi là: 10 × 6 = 60 m²! ⚽"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Diện Tích",
                "title": "Thực hành tính diện tích sàn nhà và sân trường",
                "explanation": "Diện tích là độ lớn của bề mặt hình phẳng, đo bằng đơn vị xăng-ti-mét vuông (cm²):",
                "points": [
                  "Diện tích hình chữ nhật: S = chiều dài × chiều rộng (cùng đơn vị đo).",
                  "Diện tích hình vuông: S = độ dài một cạnh × độ dài một cạnh (S = a × a).",
                  "1 cm² là diện tích của một hình vuông có cạnh dài 1 cm."
                ],
                "rule": "Diện tích hình chữ nhật: S = a × b. Diện tích hình vuông: S = a × a (đơn vị cm²).",
                "example": {
                  "text": "Hình vuông có cạnh dài 6 cm. Tính diện tích hình vuông. 👉 Diện tích hình vuông = 6 × 6 = 36 cm²!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một bức tranh hình vuông cạnh 8 cm. Chu vi bức tranh là:",
                "options": [
                  "32 cm",
                  "64 cm²",
                  "16 cm",
                  "24 cm"
                ],
                "answer": "32 cm",
                "mascotHint": "Chu vi hình vuông = cạnh × 4: 8 × 4 = 32 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 6:",
                "points": [
                  "Bé là chuyên gia hình học và đo đạc không gian!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c7",
      "name": "Chủ đề 7: Đo lường (mm, gam, ml, °C) & Tiền Việt Nam",
      "description": "Đơn vị gam, ml, nhiệt độ và các mệnh giá tiền Việt Nam",
      "icon": "🪙",
      "color": "#FFE66D",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c7-l1",
          "title": "Bài 1: Gam (g) — Đơn vị đo khối lượng nhỏ",
          "type": "learn",
          "description": "1 kg = 1000 g",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Quả trứng gà nặng khoảng 50g, gói kẹo nặng 250g. 1 kg = 1000 g! 🥚"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Gam (g) — Đơn vị đo khối lượng nhỏ",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 ki-lô-gam (kg) bằng bao nhiêu gam (g)?",
                "options": [
                  10,
                  100,
                  1000,
                  500
                ],
                "answer": 1000,
                "mascotHint": "1kg = 1000g!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đơn vị gam:",
                "points": [
                  "1 kg = 1000 g"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l2",
          "title": "Bài 2: Mi-li-lít (ml) — Đo lượng chất lỏng nhỏ",
          "type": "learn",
          "description": "1 lít = 1000 ml",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hộp sữa tươi học đường 180 ml, thìa siro ho 5 ml. 1 l = 1000 ml! 🥛"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Mi-li-lít (ml) — Đo lượng chất lỏng nhỏ",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 lít (l) bằng bao nhiêu mi-li-lít (ml)?",
                "options": [
                  100,
                  500,
                  1000,
                  10
                ],
                "answer": 1000,
                "mascotHint": "1l = 1000ml!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đơn vị ml:",
                "points": [
                  "1 l = 1000 ml"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l3",
          "title": "Bài 3: Nhiệt độ và Nhiệt kế (Độ C)",
          "type": "learn",
          "description": "Đo độ nóng lạnh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Nhiệt độ cơ thể người khỏe mạnh khoảng 37°C. Nước đá lạnh 0°C, nước sôi 100°C! 🌡️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Nhiệt độ và Nhiệt kế (Độ C)",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Nhiệt kế thủy ngân chỉ mức 30°C. Ta nói nhiệt độ là bao nhiêu?",
                "options": [
                  "30 độ C",
                  "30 mét",
                  "30 gam"
                ],
                "answer": "30 độ C",
                "mascotHint": "Ký hiệu °C đọc là độ C!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Nhiệt độ:",
                "points": [
                  "Đo bằng đơn vị độ C (°C)."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l4",
          "title": "Bài 4: Tiền Việt Nam: Các tờ tiền 1000đ, 2000đ, 5000đ",
          "type": "learn",
          "description": "Nhận biết mệnh giá tiền",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Các tờ tiền giấy nhỏ dùng mua kẹo, bút chì, thước kẻ! 🪙"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Tiền Việt Nam: Các tờ tiền 1000đ, 2000đ, 5000đ",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 2 tờ 2000 đồng và 1 tờ 1000 đồng. Tổng số tiền là:",
                "options": [
                  "3000 đồng",
                  "4000 đồng",
                  "5000 đồng",
                  "6000 đồng"
                ],
                "answer": "5000 đồng",
                "mascotHint": "2000 + 2000 + 1000 = 5000 đồng!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tiền tệ:",
                "points": [
                  "1000đ, 2000đ, 5000đ"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l5",
          "title": "Bài 5: Tiền Việt Nam: 10.000đ, 20.000đ, 50.000đ, 100.000đ",
          "type": "learn",
          "description": "Tiền polymer thông dụng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Các tờ tiền polymer có màu sắc đặc trưng: 10k màu vàng nâu, 20k màu xanh lơ, 50k màu hồng tím, 100k màu xanh lá! 💵"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Tiền Việt Nam: 10.000đ, 20.000đ, 50.000đ, 100.000đ",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tờ tiền 100.000 đồng có bao nhiêu chữ số 0?",
                "options": [
                  3,
                  4,
                  5,
                  6
                ],
                "answer": 5,
                "mascotHint": "Có đúng 5 chữ số 0!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Mệnh giá tiền:",
                "points": [
                  "Biết cách phân biệt các tờ tiền polime."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l6",
          "title": "Bài 6: Đổi tiền và gom tiền",
          "type": "learn",
          "description": "Các cách kết hợp tiền tương đương",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "1 tờ 10.000 đồng đổi được 2 tờ 5.000 đồng hoặc 5 tờ 2.000 đồng! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đổi tiền và gom tiền",
                "explanation": "Các cách kết hợp tiền tương đương",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 tờ 20.000 đồng đổi được bao nhiêu tờ 5.000 đồng?",
                "options": [
                  2,
                  3,
                  4,
                  5
                ],
                "answer": 4,
                "mascotHint": "5000 × 4 = 20.000 đồng!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đổi tiền:",
                "points": [
                  "1 tờ 20k = 4 tờ 5k"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l7",
          "title": "Bài 7: Mua sắm và tính tiền thừa",
          "type": "learn",
          "description": "Đi siêu thị cùng bố mẹ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Mua quyển vở giá 8.000 đồng, đưa cô bán hàng 10.000 đồng. Cô trả lại tiền thừa: 10.000 - 8.000 = 2.000 đồng! 🛒"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Mua sắm và tính tiền thừa",
                "explanation": "Đi siêu thị cùng bố mẹ",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé mua kem 15.000 đồng, đưa tờ 20.000 đồng. Tiền thối lại là:",
                "options": [
                  "3.000 đồng",
                  "5.000 đồng",
                  "7.000 đồng",
                  "10.000 đồng"
                ],
                "answer": "5.000 đồng",
                "mascotHint": "20.000 - 15.000 = 5.000 đồng!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính tiền thừa:",
                "points": [
                  "Tiền thừa = Tiền đưa - Giá món đồ"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l8",
          "title": "Bài 8: Xem lịch tháng và năm",
          "type": "learn",
          "description": "Các tháng có 31 ngày và 30 ngày",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Mẹo mu bàn tay: Các tháng trên khớp lồi có 31 ngày (tháng 1, 3, 5, 7, 8, 10, 12). Các tháng lõm có 30 ngày! ✊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Xem lịch tháng và năm",
                "explanation": "Các tháng có 31 ngày và 30 ngày",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một năm có bao nhiêu tháng?",
                "options": [
                  10,
                  12,
                  14,
                  365
                ],
                "answer": 12,
                "mascotHint": "Một năm có đúng 12 tháng!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Lịch năm:",
                "points": [
                  "1 năm = 12 tháng = 365 ngày"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l9",
          "title": "Bài 9: Thế kỷ và Năm nhuận",
          "type": "learn",
          "description": "Khái niệm thế kỷ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "1 thế kỷ = 100 năm! Chúng ta đang sống ở thế kỷ 21 (từ năm 2001 đến 2100)! 🌍"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Thế kỷ và Năm nhuận",
                "explanation": "Khái niệm thế kỷ",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 thế kỷ bằng bao nhiêu năm?",
                "options": [
                  10,
                  50,
                  100,
                  1000
                ],
                "answer": 100,
                "mascotHint": "1 thế kỷ = 100 năm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Thế kỷ:",
                "points": [
                  "1 thế kỷ = 100 năm"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l10",
          "title": "Bài 10: Luyện tập tổng hợp đo lường & tiền tệ",
          "type": "learn",
          "description": "Hoàn thành Chương 7",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Bé đã là người tiêu dùng thông thái và nhà đo lường giỏi! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Luyện tập tổng hợp đo lường & tiền tệ",
                "explanation": "Hoàn thành Chương 7",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1kg đường bớt 400g thì còn lại bao nhiêu gam?",
                "options": [
                  400,
                  500,
                  600,
                  700
                ],
                "answer": 600,
                "mascotHint": "1kg = 1000g; 1000 - 400 = 600g!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Xuất sắc!",
                "points": [
                  "Bé tính tiền và đổi đơn vị đo cực kỳ thành thạo!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l11",
          "title": "Bài 11: Đi siêu thị mini: Tính tiền mua hàng và tiền thối lại",
          "type": "learn",
          "description": "Thực hành tính nhẩm chi tiêu thông minh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bé mua quyển truyện 15.000 đồng và cái bút 5.000 đồng, đưa cô bán hàng tờ 50.000 đồng. Cô thối lại: 50.000 - 20.000 = 30.000 đồng! 💵"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đi siêu thị mini: Tính tiền mua hàng và tiền thối lại",
                "explanation": "Thực hành tính nhẩm chi tiêu thông minh",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mua bánh hết 35.000 đ, đưa tờ 50.000 đ. Tiền thối lại là:",
                "options": [
                  "15.000 đ",
                  "25.000 đ",
                  "10.000 đ"
                ],
                "answer": "15.000 đ",
                "mascotHint": "50.000 - 35.000 = 15.000 đồng!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính tiền thành thạo:",
                "points": [
                  "Lấy tiền đưa trừ tổng giá trị hàng"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c7-l12",
          "title": "Bài 12: Bảng quy đổi đơn vị đo tổng hợp (g, kg, ml, l, mm, m)",
          "type": "learn",
          "description": "Hệ thống bảng quy đổi đo lường",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "1 kg = 1000 g; 1 l = 1000 ml; 1 m = 1000 mm! Cả ba đều có quy tắc gấp 1000 lần thật dễ nhớ! 💡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường Lớp 3",
                "title": "Bảng quy đổi đơn vị đo tổng hợp (g, kg, ml, l, mm, m)",
                "explanation": "Các đơn vị đo lường và thực tế cuộc sống:",
                "points": [
                  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ như gói gia vị, quả trứng.",
                  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
                  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C, nhiệt độ cơ thể người khỏe mạnh khoảng 37°C.",
                  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 50 000 đồng, 100 000 đồng)."
                ],
                "rule": "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "2 lít nước ép táo rót được vào bao nhiêu cốc 500 ml?",
                "options": [
                  2,
                  3,
                  4,
                  5
                ],
                "answer": 4,
                "mascotHint": "2 lít = 2000 ml; 2000 : 500 = 4 cốc!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 7:",
                "points": [
                  "Bé nắm chắc bảng quy đổi đại lượng chuẩn xác!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c8",
      "name": "Chủ đề 8: Giải bài toán bằng hai bước tính",
      "description": "Phân tích đề bài, tìm đại lượng trung gian và tổng kết",
      "icon": "📝",
      "color": "#FF6B6B",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c8-l1",
          "title": "Bài 1: Làm quen với bài toán giải bằng hai phép tính",
          "type": "learn",
          "description": "Tìm thành phần trung gian trước",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hàng trên có 5 bông hoa. Hàng dưới nhiều hơn hàng trên 3 bông hoa. Hỏi cả hai hàng có bao nhiêu bông hoa? 🌸"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bài Toán Hai Bước Tính",
                "title": "Làm quen với bài toán giải bằng hai phép tính",
                "explanation": "Bài toán giải bằng hai phép tính đòi hỏi bé phải tìm đại lượng trung gian trước:",
                "steps": [
                  {
                    "title": "Bước 1: Tìm đại lượng chưa biết",
                    "desc": "Đọc kỹ câu hỏi phụ hoặc tính số lượng của nhóm thứ hai."
                  },
                  {
                    "title": "Bước 2: Trả lời câu hỏi chính",
                    "desc": "Tính tổng cả hai nhóm hoặc thực hiện yêu cầu cuối cùng của bài toán."
                  }
                ],
                "rule": "Xác định rõ: Cần tìm cái gì trước, rồi mới tìm được đáp số cuối cùng.",
                "example": {
                  "text": "Thùng thứ nhất có 15 l dầu, thùng thứ hai có nhiều hơn thùng thứ nhất 5 l dầu. Hỏi cả hai thùng có bao nhiêu lít dầu? 👉 Bước 1: Thùng 2 có 15 + 5 = 20 l. Bước 2: Cả hai thùng có 15 + 20 = 35 l dầu!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Thùng 1 có 8 lít nước, thùng 2 có nhiều hơn thùng 1 là 4 lít. Cả hai thùng có mấy lít nước?",
                "options": [
                  16,
                  20,
                  24,
                  12
                ],
                "answer": 20,
                "mascotHint": "Thùng 2: 8+4=12 lít. Cả hai: 8+12=20 lít!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hai bước tính:",
                "points": [
                  "Bước 1: Tìm phần chưa biết",
                  "Bước 2: Trả lời câu hỏi chính"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l2",
          "title": "Bài 2: Bài toán gấp lên nhiều lần kết hợp cộng",
          "type": "learn",
          "description": "Tìm tổng sau khi gấp",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "An có 6 viên bi, Bình có số bi gấp 3 lần An. Cả hai bạn có bao nhiêu viên bi? 🔮"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Gấp Lên Nhiều Lần",
                "title": "Bài toán gấp lên nhiều lần kết hợp cộng",
                "explanation": "Muốn gấp một số lên nhiều lần, ta lấy số đó NHÂN với số lần!",
                "rule": "Gấp a lên n lần: Lấy a × n.",
                "example": {
                  "text": "Đoạn thẳng AB dài 6 cm, đoạn thẳng CD dài gấp 3 lần đoạn thẳng AB. Tính độ dài đoạn thẳng CD. 👉 Độ dài đoạn thẳng CD là: 6 × 3 = 18 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mẹ hái 5 quả táo, chị hái gấp 4 lần mẹ. Cả hai người hái được bao nhiêu quả?",
                "options": [
                  20,
                  25,
                  30,
                  35
                ],
                "answer": 25,
                "mascotHint": "Chị: 5 × 4 = 20 quả. Cả hai: 5 + 20 = 25 quả!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Gấp rồi cộng:",
                "points": [
                  "Tính đại lượng gấp trước rồi mới cộng tổng."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l3",
          "title": "Bài 3: Bài toán giảm đi nhiều lần kết hợp cộng trừ",
          "type": "learn",
          "description": "Tìm hiệu sau khi giảm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bao gạo to nặng 40 kg, bao gạo bé nhẹ hơn 4 lần. Cả hai bao nặng bao nhiêu kg? 🌾"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Giảm Đi Nhiều Lần",
                "title": "Bài toán giảm đi nhiều lần kết hợp cộng trừ",
                "explanation": "Muốn giảm một số đi nhiều lần, ta lấy số đó CHIA cho số lần!",
                "rule": "Giảm a đi n lần: Lấy a : n. (Phân biệt: Giảm đi n đơn vị là làm phép trừ a - n).",
                "example": {
                  "text": "Mẹ hái được 24 quả cam, sau khi biếu bà số cam giảm đi 4 lần. Hỏi mẹ còn bao nhiêu quả cam? 👉 Số cam còn lại là: 24 : 4 = 6 quả cam!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đoạn dây 1 dài 30m, đoạn 2 ngắn hơn 3 lần đoạn 1. Cả 2 đoạn dây dài bao nhiêu mét?",
                "options": [
                  30,
                  40,
                  50,
                  60
                ],
                "answer": 40,
                "mascotHint": "Đoạn 2: 30 : 3 = 10m. Cả hai: 30 + 10 = 40m!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Giảm rồi cộng:",
                "points": [
                  "Tìm phần giảm bằng phép chia trước."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l4",
          "title": "Bài 4: Bài toán rút về đơn vị (Dạng 1)",
          "type": "learn",
          "description": "Tìm giá trị của 1 phần trước",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Mua 3 chiếc bút hết 15.000 đồng. Hỏi mua 5 chiếc bút như thế hết bao nhiêu tiền? ✏️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bài toán rút về đơn vị (Dạng 1)",
                "explanation": "Tìm giá trị của 1 phần trước",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "4 can nước chứa 20 lít nước. Hỏi 6 can như thế chứa bao nhiêu lít?",
                "options": [
                  25,
                  30,
                  35,
                  40
                ],
                "answer": 30,
                "mascotHint": "1 can: 20 : 4 = 5 lít. 6 can: 5 × 6 = 30 lít!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Rút về đơn vị:",
                "points": [
                  "Bước 1: Tìm 1 phần (phép chia)",
                  "Bước 2: Nhân lên số phần cần tìm"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l5",
          "title": "Bài 5: Bài toán rút về đơn vị (Dạng 2)",
          "type": "learn",
          "description": "Chia tiếp sau khi rút về đơn vị",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Có 24 quyển sách xếp đều vào 4 ngăn. Hỏi 36 quyển sách xếp vào mấy ngăn? 📚"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bài toán rút về đơn vị (Dạng 2)",
                "explanation": "Chia tiếp sau khi rút về đơn vị",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "3 hộp có 18 chiếc bánh. Hỏi 30 chiếc bánh cần mấy hộp?",
                "options": [
                  4,
                  5,
                  6,
                  7
                ],
                "answer": 5,
                "mascotHint": "1 hộp: 18 : 3 = 6 chiếc. Cần: 30 : 6 = 5 hộp!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Rút về đơn vị (chia):",
                "points": [
                  "Bước 1: Chia tìm 1 đơn vị",
                  "Bước 2: Lấy tổng chia cho đơn vị đó"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l6",
          "title": "Bài 6: Bài toán mua bán nhiều mặt hàng",
          "type": "learn",
          "description": "Tính tiền thực tế",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Nam mua 2 quyển vở giá 5.000đ/quyển và 1 cây bút giá 3.000đ. Nam đưa 20.000đ. Tiền thừa là bao nhiêu? 🛒"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bài toán mua bán nhiều mặt hàng",
                "explanation": "Tính tiền thực tế",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mua 3 cái bánh giá 4.000đ/cái và 1 hộp sữa 6.000đ. Tổng số tiền phải trả là:",
                "options": [
                  16000,
                  18000,
                  20000,
                  22000
                ],
                "answer": 18000,
                "mascotHint": "Bánh: 3 × 4.000 = 12.000đ; Tổng: 12.000 + 6.000 = 18.000đ!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Mua sắm:",
                "points": [
                  "Tính tiền từng món rồi cộng lại."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l7",
          "title": "Bài 7: Vẽ sơ đồ đoạn thẳng giải toán",
          "type": "learn",
          "description": "Trực quan hóa bài toán",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vẽ đoạn thẳng ngắn biểu thị số bé, đoạn thẳng dài biểu thị số lớn. Nhìn sơ đồ là thấy ngay cách giải! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Vẽ sơ đồ đoạn thẳng giải toán",
                "explanation": "Trực quan hóa bài toán",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số thứ nhất dài 1 đoạn, số thứ hai dài 3 đoạn bằng thế. Số thứ hai gấp mấy lần số thứ nhất?",
                "options": [
                  2,
                  3,
                  4,
                  1
                ],
                "answer": 3,
                "mascotHint": "3 đoạn gấp 3 lần 1 đoạn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Sơ đồ đoạn thẳng:",
                "points": [
                  "Vũ khí bí mật giúp giải toán cực nhanh."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l8",
          "title": "Bài 8: Bài toán tìm một trong các phần bằng nhau kết hợp",
          "type": "learn",
          "description": "Chia rồi tính phần còn lại",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đàn gà có 36 con, mẹ đã bán đi 1/4 đàn gà. Hỏi mẹ còn lại bao nhiêu con gà? 🐔"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Bài toán tìm một trong các phần bằng nhau kết hợp",
                "explanation": "Chia rồi tính phần còn lại",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Quyển truyện có 40 trang, bé đã đọc 1/5 số trang. Bé còn phải đọc mấy trang nữa?",
                "options": [
                  8,
                  30,
                  32,
                  35
                ],
                "answer": 32,
                "mascotHint": "Đã đọc: 40 : 5 = 8 trang. Còn lại: 40 - 8 = 32 trang!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hai bước tính:",
                "points": [
                  "Bước 1: Tìm phần đã bán/đã đọc",
                  "Bước 2: Trừ đi để tìm phần còn lại"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l9",
          "title": "Bài 9: Bài toán tính chu vi kết hợp bài toán lời văn",
          "type": "learn",
          "description": "Hình học thực tế",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hình chữ nhật có chiều rộng 5cm, chiều dài gấp đôi chiều rộng. Tính chu vi hình chữ nhật đó! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Bài toán tính chu vi kết hợp bài toán lời văn",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Chiều rộng 4cm, chiều dài gấp 3 lần chiều rộng. Chiều dài là:",
                "options": [
                  8,
                  12,
                  16,
                  20
                ],
                "answer": 12,
                "mascotHint": "Chiều dài: 4 × 3 = 12 cm!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hình học hai bước:",
                "points": [
                  "Tìm chiều dài trước, rồi tính chu vi sau."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l10",
          "title": "Bài 10: Tổng kết chương trình Toán Lớp 3 — Chúc mừng tốt nghiệp!",
          "type": "learn",
          "description": "Tốt nghiệp Lớp 3 xuất sắc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "HOAN HÔ BẠN NHỎ! Bạn đã hoàn thành toàn bộ 8 chương của Lớp 3! Bạn đã là bậc thầy toán học tiểu học! 🎓👑🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Tổng kết chương trình Toán Lớp 3 — Chúc mừng tốt nghiệp!",
                "explanation": "Tốt nghiệp Lớp 3 xuất sắc",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một đội công nhân ngày đầu sửa được 45m đường, ngày hai sửa gấp đôi ngày đầu. Cả hai ngày sửa được:",
                "options": [
                  90,
                  135,
                  140,
                  180
                ],
                "answer": 135,
                "mascotHint": "Ngày hai: 45 × 2 = 90m; Cả hai ngày: 45 + 90 = 135m!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Chúc mừng Tân Thủ Khoa Toán Lớp 3!",
                "points": [
                  "Bạn đã sẵn sàng chinh phục đỉnh cao Toán học Lớp 4 và Lớp 5!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l11",
          "title": "Bài 11: Bài toán về Gấp lên một số lần rồi bớt đi",
          "type": "learn",
          "description": "Dạng toán kết hợp nhân và trừ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "thinking",
                "text": "Bác Ba nuôi 12 con gà. Số chim bồ câu gấp 3 lần số gà rồi bớt đi 5 con: (12 × 3) - 5 = 31 con! 🕊️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Gấp Lên Nhiều Lần",
                "title": "Bài toán về Gấp lên một số lần rồi bớt đi",
                "explanation": "Muốn gấp một số lên nhiều lần, ta lấy số đó NHÂN với số lần!",
                "rule": "Gấp a lên n lần: Lấy a × n.",
                "example": {
                  "text": "Đoạn thẳng AB dài 6 cm, đoạn thẳng CD dài gấp 3 lần đoạn thẳng AB. Tính độ dài đoạn thẳng CD. 👉 Độ dài đoạn thẳng CD là: 6 × 3 = 18 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Lan có 8 cái kẹo, Minh có số kẹo gấp 4 lần Lan rồi bớt 7 cái. Minh có bao nhiêu cái kẹo?",
                "options": [
                  25,
                  28,
                  32,
                  35
                ],
                "answer": 25,
                "mascotHint": "8 × 4 = 32; 32 - 7 = 25 cái kẹo!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy trình giải:",
                "points": [
                  "Bước 1: Tính phép nhân gấp lên",
                  "Bước 2: Trừ đi số bớt"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c8-l12",
          "title": "Bài 12: Đấu trường toán học: Giải bài toán bằng hai phép tính",
          "type": "learn",
          "description": "Vận dụng tổng hợp hai bước tính",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "Chúc mừng bé đã hoàn thành xuất sắc Chương 8 Giải toán bằng hai bước tính! 📝"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bài Toán Hai Bước Tính",
                "title": "Đấu trường toán học: Giải bài toán bằng hai phép tính",
                "explanation": "Bài toán giải bằng hai phép tính đòi hỏi bé phải tìm đại lượng trung gian trước:",
                "steps": [
                  {
                    "title": "Bước 1: Tìm đại lượng chưa biết",
                    "desc": "Đọc kỹ câu hỏi phụ hoặc tính số lượng của nhóm thứ hai."
                  },
                  {
                    "title": "Bước 2: Trả lời câu hỏi chính",
                    "desc": "Tính tổng cả hai nhóm hoặc thực hiện yêu cầu cuối cùng của bài toán."
                  }
                ],
                "rule": "Xác định rõ: Cần tìm cái gì trước, rồi mới tìm được đáp số cuối cùng.",
                "example": {
                  "text": "Thùng thứ nhất có 15 l dầu, thùng thứ hai có nhiều hơn thùng thứ nhất 5 l dầu. Hỏi cả hai thùng có bao nhiêu lít dầu? 👉 Bước 1: Thùng 2 có 15 + 5 = 20 l. Bước 2: Cả hai thùng có 15 + 20 = 35 l dầu!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Nội dung trọng tâm của Bài 12: Đấu trường toán học: Giải bài toán bằng hai phép tính là gì?",
                "options": [
                  "Nắm vững quy tắc và vận dụng chính xác",
                  "Học vẹt không cần hiểu",
                  "Đoán mò đáp án"
                ],
                "answer": "Nắm vững quy tắc và vận dụng chính xác",
                "mascotHint": "Học hiểu bản chất giúp bé giải mọi bài toán tự tin!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chương 8:",
                "points": [
                  "Bé nắm chắc phương pháp tìm đại lượng trung gian trước khi trả lời câu hỏi!"
                ],
                "mascotMood": "celebrate"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c9",
      "name": "Chủ đề 9: Thống kê số liệu & Khả năng xảy ra của sự kiện",
      "description": "Đọc bảng số liệu, khả năng chắc chắn, có thể, không thể",
      "icon": "🎲",
      "color": "#f59e0b",
      "totalLessons": 10,
      "lessons": [
        {
          "id": "g3-c9-l1",
          "title": "Bài 1: Thu thập và phân tích bảng số liệu thống kê",
          "type": "learn",
          "description": "Đọc hàng và cột bảng số liệu",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Quan sát bảng theo dõi nhiệt độ hoặc số sách đọc được trong tuần của lớp! 📊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Thu thập và phân tích bảng số liệu thống kê",
                "explanation": "Đọc hàng và cột bảng số liệu",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bảng số liệu giúp chúng ta điều gì?",
                "options": [
                  "Tra cứu thông tin nhanh chóng",
                  "Khó so sánh số liệu",
                  "Vẽ tranh phong cảnh"
                ],
                "answer": "Tra cứu thông tin nhanh chóng",
                "mascotHint": "Bảng số liệu giúp nhìn rõ ràng các con số!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bảng thống kê:",
                "points": [
                  "Gồm các hàng và cột chứa thông tin cụ thể"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c9-l2",
          "title": "Bài 2: Làm quen với khả năng: Chắc chắn, Có thể, Không thể",
          "type": "learn",
          "description": "Dự đoán xác suất đơn giản",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Trong hộp chỉ có 5 viên bi đỏ 🔴. Lấy ra 1 viên thì: CHẮC CHẮN là bi đỏ, KHÔNG THỂ là bi xanh! 🔴"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Làm quen với khả năng: Chắc chắn, Có thể, Không thể",
                "explanation": "Dự đoán xác suất đơn giản",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mặt trời mọc ở đằng Đông là sự kiện gì?",
                "options": [
                  "Chắc chắn",
                  "Có thể",
                  "Không thể"
                ],
                "answer": "Chắc chắn",
                "mascotHint": "Mặt trời luôn luôn mọc ở hướng Đông!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Khả năng xảy ra:",
                "points": [
                  "Chắc chắn: 100% xảy ra",
                  "Có thể: có khả năng",
                  "Không thể: 0% xảy ra"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g3-c10",
      "name": "Chủ đề 10: Ôn tập cuối năm Lớp 3",
      "description": "Tổng hợp toàn diện kiến thức Lớp 3, vững bước bước vào Lớp 4",
      "icon": "🏆",
      "color": "#eab308",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g3-c10-l1",
          "title": "Bài 1: Ôn tập bốn phép tính trong phạm vi 100.000",
          "type": "learn",
          "description": "Cộng, trừ, nhân, chia số lớn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng Cú Mèo ôn tập phép tính với số có 5 chữ số nào! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Ôn tập bốn phép tính trong phạm vi 100.000",
                "explanation": "Cộng, trừ, nhân, chia số lớn",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 25.000 × 2 = ?",
                "options": [
                  40000,
                  50000,
                  60000,
                  55000
                ],
                "answer": 50000,
                "mascotHint": "25 nghìn × 2 = 50 nghìn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tính toán thành thạo:",
                "points": [
                  "Vững vàng các phép tính trong phạm vi 100.000"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c10-l2",
          "title": "Bài 2: Ôn tập hình học: Chu vi & Diện tích",
          "type": "learn",
          "description": "Hình chữ nhật và hình vuông",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Chu vi = (dài + rộng) × 2. Diện tích = dài × rộng! 📐"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Công Thức Chu Vi",
                "title": "Ôn tập hình học: Chu vi & Diện tích",
                "explanation": "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng (cùng một đơn vị đo):",
                "points": [
                  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
                  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
                  "Chu vi hình vuông: P = độ dài một cạnh × 4."
                ],
                "rule": "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
                "example": {
                  "text": "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi hình chữ nhật đó. 👉 Chu vi = (8 + 5) × 2 = 13 × 2 = 26 cm!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình vuông có cạnh 7cm. Diện tích là:",
                "options": [
                  28,
                  49,
                  14,
                  21
                ],
                "answer": 49,
                "mascotHint": "7 × 7 = 49 cm²!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Công thức hình học:",
                "points": [
                  "Phân biệt chu vi (đo độ dài) và diện tích (cm²)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g3-c10-l3",
          "title": "Bài 3: Đại Lễ Vinh Danh Trạng Nguyên Toán Học Lớp 3",
          "type": "learn",
          "description": "Tốt nghiệp Lớp 3 xuất sắc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "celebrate",
                "text": "🎉 Chúc mừng bé yêu đã hoàn thành toàn bộ 10 chương học Toán Lớp 3! Bé đã là Bậc Thầy Toán Học và sẵn sàng bước vào Lớp 4 để học Phân Số và Lớp Triệu! 🦉🏆🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kiến Thức Trọng Tâm",
                "title": "Đại Lễ Vinh Danh Trạng Nguyên Toán Học Lớp 3",
                "explanation": "Tốt nghiệp Lớp 3 xuất sắc",
                "points": [
                  "Nắm chắc quy tắc toán học chuẩn SGK.",
                  "Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng."
                ],
                "rule": "Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé đã sẵn sàng bước vào Lớp 4 chinh phục môn Toán chưa?",
                "options": [
                  "Sẵn sàng 100%! 🚀",
                  "Rất hào hứng! ✨"
                ],
                "answer": "Sẵn sàng 100%! 🚀",
                "mascotHint": "Cùng tự tin bước tiếp nào!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Tốt nghiệp Lớp 3:",
                "points": [
                  "Hoàn thành xuất sắc 10 chương học Toán Lớp 3!",
                  "Nắm chắc kiến thức nền tảng vững chắc!"
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
