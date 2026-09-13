// Data for Grade 1 (Lớp 1) - Chuẩn SGK Kết Nối Tri Thức
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

export const grade1Data = {
  "id": 1,
  "name": "Lớp 1",
  "description": "Các số đến 100, phép cộng trừ, hình học & đo lường cơ bản",
  "icon": "🌱",
  "color": "#4facfe",
  "ageRange": "6-7 tuổi",
  "chapters": [
    {
      "id": "g1-c1",
      "name": "Chủ đề 1: Các số từ 0 đến 10",
      "description": "Đếm, đọc, viết số từ 0 đến 10, so sánh các số và tách gộp",
      "icon": "🔢",
      "color": "#4facfe",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c1-l1",
          "title": "Bài 1: Làm quen với số 1, 2, 3",
          "type": "learn",
          "description": "Học đếm và nhận biết các số 1, 2, 3",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chào bé! Hôm nay Cú Mèo sẽ cùng bé làm quen với các số đầu tiên: số 1, số 2 và số 3 nhé! 🦉✨"
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 1: Có 1 quả táo đỏ thơm ngon 🍎",
                "items": [
                  {
                    "emoji": "🍎",
                    "count": 1
                  }
                ],
                "number": 1
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 2: Có 2 quả cam mọng nước 🍊🍊",
                "items": [
                  {
                    "emoji": "🍊",
                    "count": 2
                  }
                ],
                "number": 2
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 3: Có 3 ngôi sao lấp lánh ⭐⭐⭐",
                "items": [
                  {
                    "emoji": "⭐",
                    "count": 3
                  }
                ],
                "number": 3
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé hãy đếm xem có bao nhiêu quả dâu tây?",
                "items": [
                  {
                    "emoji": "🍓",
                    "count": 3
                  }
                ],
                "options": [
                  1,
                  2,
                  3,
                  4
                ],
                "answer": 3,
                "mascotHint": "Đếm từng quả: một, hai, ba quả dâu!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bé đã nhớ số 1, 2, 3:",
                "points": [
                  "1: một (chỉ 1 đồ vật)",
                  "2: hai (chỉ 2 đồ vật)",
                  "3: ba (chỉ 3 đồ vật)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l2",
          "title": "Bài 2: Các số 4, 5, 6",
          "type": "learn",
          "description": "Tiếp tục đếm với số 4, 5, 6",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Tuyệt vời! Bây giờ chúng mình cùng khám phá các số tiếp theo: 4, 5 và 6 nhé! 🚀"
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 4: Có 4 chú chim vui hót 🐦🐦🐦🐦",
                "items": [
                  {
                    "emoji": "🐦",
                    "count": 4
                  }
                ],
                "number": 4
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 5: Có 5 bông hoa khoe sắc 🌸🌸🌸🌸🌸",
                "items": [
                  {
                    "emoji": "🌸",
                    "count": 5
                  }
                ],
                "number": 5
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 6: Có 6 chú cá bơi lội 🐟🐟🐟🐟🐟🐟",
                "items": [
                  {
                    "emoji": "🐟",
                    "count": 6
                  }
                ],
                "number": 6
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có bao nhiêu chú bướm đang bay?",
                "items": [
                  {
                    "emoji": "🦋",
                    "count": 4
                  }
                ],
                "options": [
                  3,
                  4,
                  5,
                  6
                ],
                "answer": 4,
                "mascotHint": "Bé đếm theo thứ tự 1, 2, 3, 4!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bé đã thuộc 4, 5, 6:",
                "points": [
                  "4: bốn",
                  "5: năm",
                  "6: sáu"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l3",
          "title": "Bài 3: Các số 7, 8, 9",
          "type": "learn",
          "description": "Đếm tiếp các nhóm số lớn hơn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng Cú Mèo đếm tiếp các số lớn hơn: 7, 8 và 9 nào! 🌟"
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 7: Có 7 chú búp bê xinh 🧸🧸🧸🧸🧸🧸🧸",
                "items": [
                  {
                    "emoji": "🧸",
                    "count": 7
                  }
                ],
                "number": 7
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 8: Có 8 chú thỏ trắng đáng yêu 🐇🐇🐇🐇🐇🐇🐇🐇",
                "items": [
                  {
                    "emoji": "🐇",
                    "count": 8
                  }
                ],
                "number": 8
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 9: Có 9 quả bóng bay rực rỡ 🎈🎈🎈🎈🎈🎈🎈🎈🎈",
                "items": [
                  {
                    "emoji": "🎈",
                    "count": 9
                  }
                ],
                "number": 9
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số nào trông giống như hai hình tròn chồng lên nhau (như người tuyết)?",
                "options": [
                  6,
                  7,
                  8,
                  9
                ],
                "answer": 8,
                "mascotHint": "Đó chính là số 8 tròn trịa!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ số 7, 8, 9:",
                "points": [
                  "7: bảy",
                  "8: tám",
                  "9: chín"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l4",
          "title": "Bài 4: Số 0 và Số 10",
          "type": "learn",
          "description": "Số 0 không có gì và số 10 tròn trịa",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hôm nay chúng mình học hai số vô cùng đặc biệt: Số 0 và Số 10 nhé! 🍎"
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 0: Đĩa trống trơn không có quả táo nào cả!",
                "items": [],
                "number": 0
              }
            },
            {
              "type": "visual",
              "content": {
                "text": "Số 10: Có trọn vẹn 10 quả táo đỏ thơm ngon 🍎",
                "items": [
                  {
                    "emoji": "🍎",
                    "count": 10
                  }
                ],
                "number": 10
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Ý nghĩa của số 0 và số 10",
                "explanation": "Số 0 biểu thị không có đồ vật nào. Số 10 gồm chữ số 1 đứng trước và chữ số 0 đứng sau, gọi là một chục!",
                "rule": "Không có vật nào ta viết số 0. Mười đồ vật ta viết số 10."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Chiếc đĩa không có chiếc kẹo nào. Ta dùng số mấy để chỉ số kẹo?",
                "options": [
                  0,
                  1,
                  10,
                  5
                ],
                "answer": 0,
                "mascotHint": "Không có gì tức là số 0 bé nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết bài học:",
                "points": [
                  "Số 0: không có vật nào",
                  "Số 10: gồm số 1 và số 0"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l5",
          "title": "Bài 5: Nhiều hơn, ít hơn, bằng nhau",
          "type": "learn",
          "description": "So sánh số lượng hai nhóm đồ vật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Làm sao để biết nhóm nào nhiều hơn hay ít hơn? Hãy cùng Cú Mèo học cách so sánh nhé! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phương Pháp So Sánh",
                "title": "Ghép đôi từng cặp 1 - 1",
                "explanation": "Để so sánh hai nhóm, ta ghép đôi mỗi vật ở nhóm này với một vật ở nhóm kia. Nhóm nào còn thừa đồ vật thì nhóm đó nhiều hơn!",
                "rule": "Nhóm thừa vật: nhiều hơn. Nhóm thiếu vật: ít hơn. Đôi bên vừa vặn: bằng nhau.",
                "example": {
                  "text": "Có 4 chú thỏ và 3 củ cà rốt. Mỗi chú thỏ lấy 1 củ cà rốt. 👉 Còn thừa 1 chú thỏ chưa có cà rốt, nên số thỏ nhiều hơn số cà rốt!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 5 chú mèo và 3 con cá. Mỗi chú mèo ăn 1 con cá. Nhóm nào nhiều hơn?",
                "options": [
                  "Số mèo nhiều hơn",
                  "Số cá nhiều hơn",
                  "Hai nhóm bằng nhau"
                ],
                "answer": "Số mèo nhiều hơn",
                "mascotHint": "5 lớn hơn 3 nên số mèo nhiều hơn số cá!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ so sánh:",
                "points": [
                  "Nhiều hơn: số lượng lớn hơn",
                  "Ít hơn: số lượng nhỏ hơn",
                  "Bằng nhau: số lượng ngang nhau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l6",
          "title": "Bài 6: Dấu lớn hơn (>) và Dấu bé hơn (<)",
          "type": "learn",
          "description": "Nhận biết và sử dụng dấu > và <",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Để so sánh hai số nhanh chóng, các nhà toán học đã phát minh ra dấu lớn hơn (>) và dấu bé hơn (<)! 🐊"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Cá Sấu Há Miệng",
                "title": "Bí quyết nhớ dấu > và <",
                "explanation": "Hãy tưởng tượng dấu so sánh như miệng của chú cá sấu há to: Miệng cá sấu luôn há về phía số lớn hơn để ăn nhiều hơn!",
                "rule": "Đầu nhọn chỉ về số bé, miệng há to quay về phía số lớn! Ví dụ: 5 > 2 (5 lớn hơn 2), 3 < 7 (3 bé hơn 7).",
                "example": {
                  "text": "So sánh số 6 và số 4: 👉 6 lớn hơn 4, miệng cá sấu há về số 6, nên ta viết: 6 > 4."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp vào chỗ trống: 5 ... 2",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": ">",
                "mascotHint": "5 lớn hơn 2, miệng cá sấu há về phía số 5 nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc dấu > và <:",
                "points": [
                  "Dấu >: lớn hơn",
                  "Dấu <: bé hơn",
                  "Miệng luôn mở rộng về phía số lớn hơn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l7",
          "title": "Bài 7: Dấu bằng (=) và thứ tự dãy số",
          "type": "learn",
          "description": "Sử dụng dấu bằng và sắp xếp các số 0 đến 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi hai số có giá trị hoàn toàn bằng nhau, ta dùng dấu bằng (=) gồm hai gạch song song nhé! ✨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Dấu Bằng & Dãy Số",
                "title": "Dấu bằng (=) và thứ tự từ 0 đến 10",
                "explanation": "Khi số lượng hai bên ngang nhau, ta viết dấu bằng (=). Dãy số đếm tiến từ bé đến lớn: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                "rule": "4 = 4 (bốn bằng bốn). Số đứng sau luôn lớn hơn số đứng trước trong dãy đếm.",
                "example": {
                  "text": "So sánh 4 và 4: 👉 Hai số giống nhau ta điền dấu bằng: 4 = 4."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 7 ... 7",
                "options": [
                  "=",
                  ">",
                  "<"
                ],
                "answer": "=",
                "mascotHint": "Hai số bằng nhau, ta dùng dấu bằng (=)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Dấu =: biểu thị hai số bằng nhau",
                  "Dãy số 0 đến 10 tăng dần đều đặn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l8",
          "title": "Bài 8: Tách và gộp số trong phạm vi 5",
          "type": "learn",
          "description": "Kỹ thuật tách và gộp nền tảng cho phép tính",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bé có biết: một số có thể tách ra thành hai phần, và hai phần có thể gộp lại thành một số không? 🧩"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Sơ Đồ Tách - Gộp",
                "title": "Cách tách và gộp số 5",
                "explanation": "Gộp nghĩa là gom lại chung với nhau. Tách nghĩa là chia làm hai phần.",
                "steps": [
                  {
                    "title": "Gộp số",
                    "desc": "Có 3 quả cam gộp với 2 quả cam ta được 5 quả cam."
                  },
                  {
                    "title": "Tách số",
                    "desc": "5 gồm 4 và 1, hoặc 5 gồm 3 và 2."
                  }
                ],
                "rule": "Gộp 3 và 2 được 5. Tách 5 được 3 và 2."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Gộp 2 và 3 được mấy?",
                "options": [
                  4,
                  5,
                  6,
                  3
                ],
                "answer": 5,
                "mascotHint": "Đếm: 2 thêm 3 ngón tay nữa là 5 ngón tay!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc tách gộp phạm vi 5:",
                "points": [
                  "Gộp: đem lại gần nhau để đếm tất cả",
                  "Tách: chia một nhóm thành hai nhóm nhỏ"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l9",
          "title": "Bài 9: Tách và gộp số trong phạm vi 10",
          "type": "learn",
          "description": "Tìm các cặp số bạn bè gộp lại thành 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Số 10 là một số kỳ diệu! Chúng mình cùng tìm các cặp số bạn thân có tổng bằng 10 nhé! 🔟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cặp Số Bạn Thân 10",
                "title": "Các cách tách gộp số 10",
                "explanation": "Số 10 có thể tách thành các cặp số rất quen thuộc:",
                "points": [
                  "9 và 1 gộp lại thành 10",
                  "8 và 2 gộp lại thành 10",
                  "7 và 3 gộp lại thành 10",
                  "6 và 4 gộp lại thành 10",
                  "5 và 5 gộp lại thành 10"
                ],
                "rule": "Các cặp bạn thân của 10: (9,1), (8,2), (7,3), (6,4), (5,5)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Gộp 7 và mấy để được 10?",
                "options": [
                  2,
                  3,
                  4,
                  5
                ],
                "answer": 3,
                "mascotHint": "7 bạn thân với 3: 7 gộp 3 được 10!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ cặp số 10:",
                "points": [
                  "10 = 9 + 1 = 8 + 2 = 7 + 3 = 6 + 4 = 5 + 5"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l10",
          "title": "Bài 10: Luyện tập tổng hợp các số đến 10",
          "type": "learn",
          "description": "Ôn luyện so sánh và đếm số từ 0 đến 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chúc mừng bé đã đi đến chặng ôn tập của Chủ đề 1! Cùng Cú Mèo củng cố kiến thức nhé! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Ôn Tập Tổng Hợp",
                "title": "Toàn bộ dãy số 0 đến 10",
                "explanation": "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số bé nhất là số 0, số lớn nhất là số 10. Số đứng sau luôn lớn hơn số đứng liền trước nó 1 đơn vị.",
                "rule": "Số liền trước = Số đã cho trừ đi 1. Số liền sau = Số đã cho cộng thêm 1."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số nào lớn nhất trong các số sau: 3, 8, 5, 2?",
                "options": [
                  3,
                  8,
                  5,
                  2
                ],
                "answer": 8,
                "mascotHint": "Trong dãy số, số 8 đứng sau các số 3, 5, 2 nên là số lớn nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Thuộc làu dãy số 0 đến 10",
                  "Biết so sánh số và tìm số lớn nhất, bé nhất"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l11",
          "title": "Bài 11: Đếm lùi từ 10 về 0",
          "type": "learn",
          "description": "Đếm ngược chuẩn bị cho phép trừ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Bé đã từng thấy tên lửa chuẩn bị phóng vào vũ trụ chưa? 10, 9, 8... cùng đếm lùi nào! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kỹ Năng Đếm Lùi",
                "title": "Thứ tự đếm lùi từ 10 về 0",
                "explanation": "Đếm lùi là mỗi lần đếm ta bớt đi 1 đơn vị: 10, nên là 9, nên là 8, nên là 7, nên là 6, nên là 5, nên là 4, nên là 3, nên là 2, nên là 1, nên là 0.",
                "rule": "Đếm lùi giúp bé thực hiện các phép tính trừ cực kỳ nhanh chóng!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đang đếm lùi: 6, 5, 4, ... Tiếp theo là số mấy?",
                "options": [
                  3,
                  2,
                  5,
                  7
                ],
                "answer": 3,
                "mascotHint": "Bớt đi 1: ngay trước số 4 là số 3!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ đếm lùi:",
                "points": [
                  "10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c1-l12",
          "title": "Bài 12: Thử thách Trạng Nguyên Nhí: Đếm và So sánh",
          "type": "learn",
          "description": "Bài thi thử thách cuối Chủ đề 1",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "proud",
                "text": "Đây là bài thử thách Trạng Nguyên Nhí! Hãy vận dụng trí thông minh của bé để giành trọn vẹn 3 sao nhé! 👑"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bí Kíp Trạng Nguyên",
                "title": "Mẹo làm bài thi đếm và so sánh",
                "explanation": "Quan sát thật kỹ từng hình, gạch chéo từng hình khi đếm để không bị sót, sau đó viết số cẩn thận!",
                "rule": "Bình tĩnh, đếm kỹ càng, tự tin vào bản thân!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có bao nhiêu số lớn hơn 4 và bé hơn 8?",
                "options": [
                  "3 số (5, 6, 7)",
                  "2 số",
                  "4 số",
                  "1 số"
                ],
                "answer": "3 số (5, 6, 7)",
                "mascotHint": "Các số nằm giữa 4 và 8 là: 5, 6, 7 (có tất cả 3 số)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Vinh quang Trạng Nguyên:",
                "points": [
                  "Bé đã xuất sắc hoàn thành trọn vẹn Chủ đề 1!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c2",
      "name": "Chủ đề 2: Phép cộng, phép trừ trong phạm vi 10",
      "description": "Ý nghĩa phép cộng (gộp), phép trừ (bớt) và bảng tính trong phạm vi 10",
      "icon": "➕",
      "color": "#10b981",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c2-l1",
          "title": "Bài 1: Làm quen phép cộng và dấu cộng (+)",
          "type": "learn",
          "description": "Ý nghĩa của thao tác gộp và dấu cộng",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chào bé! Khi chúng mình gộp hai nhóm đồ vật lại với nhau, ta làm PHÉP CỘNG và dùng dấu CỘNG (+) đấy! ➕"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Phép cộng là GỘP lại",
                "explanation": "Dấu cộng (+) có hình như chữ thập. Khi ta thêm vào hay gộp lại, số lượng sẽ nhiều lên.",
                "rule": "Gộp lại, nên Dùng dấu cộng (+). Ví dụ: Có 2 quả bóng, thêm 1 quả bóng nữa: 2 + 1 = 3.",
                "example": {
                  "text": "Có 3 chú chim trên cành, 2 chú chim khác bay đến đậu cùng. 👉 Gộp 3 và 2 ta viết phép tính: 3 + 2 = 5 chú chim!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Có 2 quả táo, mẹ cho thêm 2 quả táo nữa. Phép tính nào đúng?",
                "options": [
                  "2 + 2 = 4",
                  "2 - 2 = 0",
                  "2 + 1 = 3"
                ],
                "answer": "2 + 2 = 4",
                "mascotHint": "Thêm vào là làm tính cộng: 2 + 2 = 4!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ phép cộng:",
                "points": [
                  "Dấu + đọc là \"cộng\"",
                  "Phép cộng thể hiện sự gộp lại, thêm vào"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l2",
          "title": "Bài 2: Phép cộng trong phạm vi 5",
          "type": "learn",
          "description": "Bảng tính cộng các số nhỏ hơn hoặc bằng 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hôm nay chúng mình cùng học thuộc bảng cộng trong phạm vi 5 nhé! Rất dễ dàng với bàn tay 5 ngón! ✋"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bảng Cộng Phạm Vi 5",
                "title": "Các phép cộng có kết quả đến 5",
                "explanation": "Bé có thể xòe các ngón tay để cộng nhẩm:",
                "points": [
                  "1 + 1 = 2; 1 + 2 = 3; 1 + 3 = 4; 1 + 4 = 5",
                  "2 + 1 = 3; 2 + 2 = 4; 2 + 3 = 5",
                  "3 + 1 = 4; 3 + 2 = 5",
                  "4 + 1 = 5"
                ],
                "rule": "Đổi chỗ hai số trong phép cộng thì kết quả không đổi: 2 + 3 = 3 + 2 = 5."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 3 + 2 = ?",
                "options": [
                  4,
                  5,
                  6,
                  3
                ],
                "answer": 5,
                "mascotHint": "3 ngón tay thêm 2 ngón tay nữa là 5 ngón tay!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bé đã thuộc bảng cộng 5:",
                "points": [
                  "3 + 2 = 5; 4 + 1 = 5; 2 + 2 = 4"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l3",
          "title": "Bài 3: Phép cộng trong phạm vi 10",
          "type": "learn",
          "description": "Cộng bằng cách đếm tiếp đến 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Cùng mở rộng phép cộng lên đến 10 với mẹo đếm tiếp siêu nhanh của Cú Mèo nhé! 🦉"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Đếm Tiếp",
                "title": "Cách cộng đếm tiếp cực nhanh",
                "explanation": "Để tính 6 + 3: Giữ số lớn là 6 trong đầu, đếm thêm 3 bước: 7, 8, 9! Vậy 6 + 3 = 9.",
                "steps": [
                  {
                    "title": "Bước 1: Giữ số lớn",
                    "desc": "Số lớn hơn là 6, ghi nhớ trong đầu."
                  },
                  {
                    "title": "Bước 2: Đếm thêm",
                    "desc": "Xòe 3 ngón tay đếm tiếp: 7, 8, 9."
                  },
                  {
                    "title": "Bước 3: Kết luận",
                    "desc": "Kết quả là 9!"
                  }
                ],
                "rule": "Giữ số lớn trong đầu, đếm tiếp số bé!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 + 4 = ?",
                "options": [
                  8,
                  9,
                  10,
                  7
                ],
                "answer": 9,
                "mascotHint": "Đếm tiếp từ 5 thêm 4 bước: 6, 7, 8, 9!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bí kíp đếm tiếp:",
                "points": [
                  "Giữ số lớn trong đầu, đếm tiếp số nhỏ"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l4",
          "title": "Bài 4: Bảng cộng trong phạm vi 10",
          "type": "learn",
          "description": "Ghi nhớ bảng cộng chuẩn lớp 1",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi thuộc làu bảng cộng 10, bé sẽ tính nhẩm nhanh như một chiếc máy tính bỏ túi vậy! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bảng Cộng Chuẩn",
                "title": "Các phép tính cộng quan trọng",
                "explanation": "Hãy chú ý các cặp số cộng nhau bằng 10: 1+9=10, 2+8=10, 3+7=10, 4+6=10, 5+5=10.",
                "rule": "Thuộc bảng cộng giúp bé giải toán nhanh và chính xác tuyệt đối."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 6 + 4 = ?",
                "options": [
                  9,
                  10,
                  8,
                  7
                ],
                "answer": 10,
                "mascotHint": "6 và 4 là cặp bạn thân tạo thành 10!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Thuộc các phép cộng trong phạm vi 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l5",
          "title": "Bài 5: Số 0 trong phép cộng",
          "type": "learn",
          "description": "Quy tắc vàng khi cộng với số 0",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 0 đứng một mình là không có gì. Vậy khi cộng một số với 0 thì điều gì xảy ra nhỉ? 🤔"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Số nào cộng với 0 cũng bằng chính nó",
                "explanation": "Bé có 4 cái kẹo, không ai cho thêm cái kẹo nào (cho 0 cái). Bé vẫn còn nguyên 4 cái kẹo!",
                "rule": "Bất kỳ số nào cộng với 0 cũng bằng chính nó: a + 0 = a và 0 + a = a.",
                "example": {
                  "text": "7 + 0 = ? 👉 7 cộng với 0 vẫn giữ nguyên là 7!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 8 + 0 = ?",
                "options": [
                  0,
                  8,
                  9,
                  18
                ],
                "answer": 8,
                "mascotHint": "Cộng với 0 thì số đó giữ nguyên không đổi!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ quy tắc số 0:",
                "points": [
                  "a + 0 = a",
                  "0 + a = a"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l6",
          "title": "Bài 6: Làm quen phép trừ và dấu trừ (-)",
          "type": "learn",
          "description": "Ý nghĩa của thao tác bớt và dấu trừ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi bớt đi, cho đi hoặc ăn mất đồ vật, ta làm PHÉP TRỪ và dùng dấu TRỪ (-) nhé! ➖"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Phép trừ là BỚT đi",
                "explanation": "Dấu trừ (-) là một gạch ngang ngắn. Khi bớt đi, số lượng sẽ ít hơn lúc ban đầu.",
                "rule": "Bớt đi, tách ra, nên Dùng dấu trừ (-). Ví dụ: Có 5 cái kẹo, ăn mất 2 cái, nên Còn lại: 5 - 2 = 3 cái kẹo.",
                "example": {
                  "text": "Trên cây có 4 quả táo, rụng mất 1 quả. Hỏi trên cây còn mấy quả? 👉 Bớt 1 quả táo: 4 - 1 = 3 quả táo!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé có 4 quả bóng, bị vỡ 1 quả bóng. Phép tính nào đúng?",
                "options": [
                  "4 - 1 = 3",
                  "4 + 1 = 5",
                  "4 - 2 = 2"
                ],
                "answer": "4 - 1 = 3",
                "mascotHint": "Bị vỡ (mất đi) là phép trừ: 4 - 1 = 3!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ phép trừ:",
                "points": [
                  "Dấu - đọc là \"trừ\"",
                  "Phép trừ biểu thị sự bớt đi, còn lại"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l7",
          "title": "Bài 7: Phép trừ trong phạm vi 5",
          "type": "learn",
          "description": "Luyện tập trừ các số nhỏ hơn hoặc bằng 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng Cú Mèo luyện trừ trong phạm vi 5 bằng cách gập ngón tay lại nào! ✋"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bảng Trừ Phạm Vi 5",
                "title": "Các phép trừ cơ bản đến 5",
                "explanation": "Xòe ngón tay theo số ban đầu, bớt đi bao nhiêu thì gập bấy nhiêu ngón tay lại:",
                "points": [
                  "5 - 1 = 4; 5 - 2 = 3; 5 - 3 = 2; 5 - 4 = 1",
                  "4 - 1 = 3; 4 - 2 = 2; 4 - 3 = 1",
                  "3 - 1 = 2; 3 - 2 = 1",
                  "2 - 1 = 1"
                ],
                "rule": "Một số trừ đi chính nó luôn bằng 0: 5 - 5 = 0."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 5 - 2 = ?",
                "options": [
                  2,
                  3,
                  4,
                  1
                ],
                "answer": 3,
                "mascotHint": "5 ngón tay gập bớt 2 ngón tay còn lại 3 ngón tay!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "5 - 2 = 3; 5 - 3 = 2; 4 - 2 = 2"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l8",
          "title": "Bài 8: Phép trừ trong phạm vi 10",
          "type": "learn",
          "description": "Kỹ thuật trừ đếm lùi trong phạm vi 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Muốn trừ số lớn trong phạm vi 10 nhanh như chớp? Hãy áp dụng mẹo đếm lùi nhé! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Trừ Đếm Lùi",
                "title": "Cách trừ bằng đếm lùi",
                "explanation": "Để tính 8 - 3: Giữ số 8 trong đầu, đếm lùi 3 bước: 7, 6, 5! Vậy 8 - 3 = 5.",
                "steps": [
                  {
                    "title": "Bước 1: Giữ số bị trừ",
                    "desc": "Giữ số 8 trong đầu."
                  },
                  {
                    "title": "Bước 2: Đếm lùi",
                    "desc": "Đếm lùi 3 bước: 7, 6, 5."
                  },
                  {
                    "title": "Bước 3: Ghi kết quả",
                    "desc": "Kết quả là 5!"
                  }
                ],
                "rule": "Trừ nghĩa là đếm lùi về phía số 0!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 9 - 4 = ?",
                "options": [
                  4,
                  5,
                  6,
                  3
                ],
                "answer": 5,
                "mascotHint": "Đếm lùi từ 9 bớt 4 bước: 8, 7, 6, 5!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Đếm lùi để tìm kết quả phép trừ nhanh chóng"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l9",
          "title": "Bài 9: Số 0 trong phép trừ",
          "type": "learn",
          "description": "Trừ đi 0 và trừ đi chính nó",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 0 trong phép trừ có hai bí mật cực kỳ thú vị, bé cùng tìm hiểu nhé! 🔍"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bí Mật Số 0",
                "title": "Hai quy tắc phép trừ với số 0",
                "explanation": "Có 6 cái bánh, không ăn cái nào (trừ 0 cái), nên là vẫn còn 6 cái bánh. Có 6 cái bánh, ăn hết cả 6 cái, nên là còn lại 0 cái bánh!",
                "rule": "1. Một số trừ đi 0 bằng chính nó: a - 0 = a. 2. Một số trừ đi chính nó bằng 0: a - a = 0.",
                "example": {
                  "text": "5 - 0 = ? và 5 - 5 = ? 👉 5 - 0 = 5 và 5 - 5 = 0."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 7 - 7 = ?",
                "options": [
                  7,
                  0,
                  1,
                  14
                ],
                "answer": 0,
                "mascotHint": "Có 7 cái kẹo ăn hết 7 cái kẹo là còn 0 cái kẹo!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết số 0:",
                "points": [
                  "a - 0 = a",
                  "a - a = 0"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l10",
          "title": "Bài 10: Luyện tập chung phép cộng trừ phạm vi 10",
          "type": "learn",
          "description": "Mối liên hệ hai chiều giữa cộng và trừ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bé có biết: Phép cộng và phép trừ là hai người bạn thân thiết luôn đi cùng nhau không? 🤝"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Quan Hệ Cộng - Trừ",
                "title": "Từ phép cộng suy ra phép trừ",
                "explanation": "Nếu bé biết 4 + 3 = 7, thì khi lấy 7 trừ đi 3 sẽ bằng 4, và 7 trừ đi 4 sẽ bằng 3!",
                "rule": "Từ một phép cộng: a + b = c, ta có hai phép trừ: c - a = b và c - b = a."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Biết 6 + 3 = 9. Vậy 9 - 6 bằng mấy?",
                "options": [
                  2,
                  3,
                  4,
                  5
                ],
                "answer": 3,
                "mascotHint": "9 bớt đi 6 thì còn lại 3 bé nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Cộng và trừ là hai phép tính ngược nhau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l11",
          "title": "Bài 11: Tìm số còn thiếu trong phép tính",
          "type": "learn",
          "description": "Giải các câu đố điền số vào ô trống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Có một số bí ẩn đang trốn trong ô trống! Cùng trổ tài làm thám tử tìm số bí ẩn nhé! 🕵️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Tìm Ô Trống",
                "title": "Cách tìm số trong ô trống: 4 + ? = 9",
                "explanation": "Hỏi: 4 cộng thêm mấy để được 9? Bé đếm tiếp từ 4 lên 9: 5, 6, 7, 8, 9 (cần thêm 5 bước)! Hoặc lấy 9 - 4 = 5!",
                "rule": "Muốn tìm số hạng còn thiếu: Lấy tổng trừ đi số đã biết."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền số thích hợp vào ô trống: 3 + ? = 8",
                "options": [
                  4,
                  5,
                  6,
                  7
                ],
                "answer": 5,
                "mascotHint": "3 cộng thêm 5 bằng 8, vậy số cần điền là 5!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bí kíp thám tử:",
                "points": [
                  "Lấy kết quả trừ đi số đã biết để tìm ô trống"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c2-l12",
          "title": "Bài 12: Đố vui toán có lời văn: Hái hoa bắt bướm",
          "type": "learn",
          "description": "Giải toán có lời văn sinh động thực tế",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hôm nay chúng mình cùng bước vào thế giới toán có lời văn với bạn Thỏ và bạn Gấu nhé! 🐰🐻"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phương Pháp Đọc Đề",
                "title": "Nhận diện từ khóa toán lời văn",
                "explanation": "Đọc kỹ câu hỏi để tìm từ khóa:",
                "points": [
                  "Thấy chữ \"thêm vào\", \"tất cả\", \"cả hai\": Làm phép CỘNG (+)",
                  "Thấy chữ \"bớt đi\", \"cho đi\", \"còn lại\": Làm phép TRỪ (-)"
                ],
                "rule": "Luôn viết đầy đủ phép tính và câu trả lời."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Mai có 5 bông hoa đỏ, Lan tặng Mai thêm 3 bông hoa vàng. Hỏi Mai có tất cả bao nhiêu bông hoa?",
                "options": [
                  "8 bông hoa",
                  "2 bông hoa",
                  "7 bông hoa"
                ],
                "answer": "8 bông hoa",
                "mascotHint": "Tặng thêm nghĩa là làm phép tính cộng: 5 + 3 = 8 bông hoa!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết toán lời văn:",
                "points": [
                  "Đọc kỹ đề, nên Tìm từ khóa, nên Làm phép tính chuẩn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c3",
      "name": "Chủ đề 3: Các số trong phạm vi 20",
      "description": "Số từ 11 đến 20, khái niệm chục và đơn vị, so sánh và thứ tự dãy số",
      "icon": "🌱",
      "color": "#0284c7",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c3-l1",
          "title": "Bài 1: Đếm các số từ 11 đến 15",
          "type": "learn",
          "description": "Các số vượt qua mười đầu tiên",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vượt qua số 10, chúng mình cùng bước vào thế giới các số có hai chữ số từ 11 đến 15 nhé! ✨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cấu Tạo Số 11 - 15",
                "title": "Mười và các đơn vị thêm vào",
                "explanation": "Mỗi số gồm 10 (một chục) gộp thêm các đơn vị:",
                "points": [
                  "11: gồm 10 và 1 (đọc là mười một)",
                  "12: gồm 10 và 2 (đọc là mười hai)",
                  "13: gồm 10 và 3 (đọc là mười ba)",
                  "14: gồm 10 và 4 (đọc là mười bốn)",
                  "15: gồm 10 và 5 (đọc là mười lăm - không đọc là mười năm)"
                ],
                "rule": "Số 15 đọc là \"mười lăm\"."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 1 chục và 3 đơn vị được viết là số nào?",
                "options": [
                  13,
                  31,
                  14,
                  12
                ],
                "answer": 13,
                "mascotHint": "1 chục (1) và 3 đơn vị (3) viết là 13!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ số 11 đến 15:",
                "points": [
                  "11, 12, 13, 14, 15"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l2",
          "title": "Bài 2: Đếm các số từ 16 đến 20",
          "type": "learn",
          "description": "Tiếp tục đếm từ 16 đến 20",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Cùng Cú Mèo đếm tiếp các số 16, 17, 18, 19 và số 20 tròn trịa nào! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cấu Tạo Số 16 - 20",
                "title": "Các số từ 16 đến 20",
                "explanation": "Số 16 (10 và 6), 17 (10 và 7), 18 (10 và 8), 19 (10 và 9). Số 20 gồm 2 chục và 0 đơn vị (đọc là hai mươi)!",
                "rule": "20 là hai chục: 2 chục = 20 đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số đứng liền sau số 19 là số nào?",
                "options": [
                  18,
                  20,
                  21,
                  10
                ],
                "answer": 20,
                "mascotHint": "Đếm tiếp: 18, 19 rồi đến 20 (hai mươi)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "16, 17, 18, 19, 20",
                  "20 đọc là hai mươi (2 chục)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l3",
          "title": "Bài 3: Mười và một chục",
          "type": "learn",
          "description": "Khái niệm nền tảng về hàng chục",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Một bó 10 que tính được gọi là gì? Hãy cùng khám phá khái niệm \"MỘT CHỤC\" nhé! 🥢"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "10 đơn vị = 1 chục",
                "explanation": "Khi gom đủ 10 que tính rời, ta bó lại thành 1 bó que tính. Bó đó được gọi là 1 CHỤC!",
                "rule": "10 đơn vị = 1 chục. 1 chục = 10 đơn vị.",
                "example": {
                  "text": "Bé có 1 chục quả trứng gà. Hỏi bé có bao nhiêu quả trứng? 👉 1 chục chính là 10 quả trứng gà!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "1 chục bằng bao nhiêu đơn vị?",
                "options": [
                  1,
                  10,
                  20,
                  100
                ],
                "answer": 10,
                "mascotHint": "1 chục = 10 đơn vị bé nhớ nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc vàng:",
                "points": [
                  "1 chục = 10 đơn vị",
                  "2 chục = 20 đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l4",
          "title": "Bài 4: Hàng chục và hàng đơn vị",
          "type": "learn",
          "description": "Cấu tạo hệ thập phân của số có hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Trong số có hai chữ số, mỗi chữ số ở một ngôi nhà riêng: Hàng Chục và Hàng Đơn Vị! 🏠"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Ngôi Nhà Số Học",
                "title": "Vị trí Hàng Chục & Hàng Đơn Vị",
                "explanation": "Ví dụ số 17: Chữ số 1 đứng bên trái ở Hàng Chục. Chữ số 7 đứng bên phải ở Hàng Đơn Vị.",
                "rule": "Chữ số bên TRÁI: chỉ hàng chục. Chữ số bên PHẢI: chỉ hàng đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong số 18, chữ số nào ở hàng chục, chữ số nào ở hàng đơn vị?",
                "options": [
                  "Chục là 1, đơn vị là 8",
                  "Chục là 8, đơn vị là 1",
                  "Cả hai đều là 18"
                ],
                "answer": "Chục là 1, đơn vị là 8",
                "mascotHint": "Số 18: số 1 bên trái là hàng chục, số 8 bên phải là hàng đơn vị!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ cấu tạo số:",
                "points": [
                  "Trái: Chục",
                  "Phải: Đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l5",
          "title": "Bài 5: Đọc và viết các số từ 10 đến 20",
          "type": "learn",
          "description": "Chuẩn hóa cách đọc và viết số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Đọc đúng tên số giúp bé tự tin khi giao tiếp và tính toán! Cùng luyện đọc chuẩn nhé! 🗣️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Lưu ý khi đọc số từ 10 đến 20",
                "explanation": "Chú ý hai trường hợp đặc biệt:",
                "points": [
                  "Số 14: đọc là \"mười bốn\" hoặc \"mười tư\"",
                  "Số 15: đọc là \"mười lăm\" (chữ \"lăm\" viết bằng l)",
                  "Số 20: đọc là \"hai mươi\""
                ],
                "rule": "11: mười một, 15: mười lăm, 20: hai mươi."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số 15 được đọc là gì?",
                "options": [
                  "Mười lăm",
                  "Mười năm",
                  "Một năm"
                ],
                "answer": "Mười lăm",
                "mascotHint": "Đọc là \"mười lăm\" (âm l) bé nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Đọc viết chuẩn xác các số từ 10 đến 20"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l6",
          "title": "Bài 6: So sánh các số trong phạm vi 20",
          "type": "learn",
          "description": "Cách so sánh hai số có hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Làm sao so sánh xem số 17 và số 14 số nào lớn hơn? Rất đơn giản theo từng bước! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Quy Trình So Sánh",
                "title": "Hai bước so sánh số phạm vi 20",
                "explanation": "Khi so sánh hai số:",
                "steps": [
                  {
                    "title": "Bước 1: So sánh hàng chục",
                    "desc": "Cả hai số 17 và 14 đều có hàng chục là 1 (bằng nhau)."
                  },
                  {
                    "title": "Bước 2: So sánh hàng đơn vị",
                    "desc": "Số 17 có đơn vị là 7, số 14 có đơn vị là 4. Vì 7 > 4 nên 17 > 14!"
                  }
                ],
                "rule": "Hàng chục bằng nhau, số nào có hàng đơn vị lớn hơn thì số đó lớn hơn."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 16 ... 19",
                "options": [
                  "<",
                  ">",
                  "="
                ],
                "answer": "<",
                "mascotHint": "Hàng chục đều là 1. Hàng đơn vị 6 < 9, vậy 16 < 19!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc so sánh:",
                "points": [
                  "So sánh hàng chục trước, sau đó so sánh hàng đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l7",
          "title": "Bài 7: Tìm số lớn nhất và số bé nhất",
          "type": "learn",
          "description": "Chọn lọc số cực đại và cực tiểu trong nhóm",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Trong một nhóm nhiều số, làm sao tìm ra quán quân số lớn nhất và số bé nhất? 👑"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Quán Quân",
                "title": "Tìm số lớn nhất & bé nhất",
                "explanation": "Đặt các số lên dãy số: Số đứng gần số 0 nhất là số BÉ NHẤT. Số đứng xa số 0 nhất là số LỚN NHẤT.",
                "example": {
                  "text": "Trong các số: 12, 19, 15, 11 👉 Số bé nhất là 11 (gần 0 nhất). Số lớn nhất là 19 (xa 0 nhất)."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số lớn nhất trong các số: 14, 18, 12, 16 là số nào?",
                "options": [
                  18,
                  16,
                  14,
                  12
                ],
                "answer": 18,
                "mascotHint": "Số 18 có hàng đơn vị là 8 lớn nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Số lớn nhất có giá trị cao nhất",
                  "Số bé nhất có giá trị nhỏ nhất"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l8",
          "title": "Bài 8: Dãy số tăng dần và giảm dần",
          "type": "learn",
          "description": "Sắp xếp trật tự các số trong phạm vi 20",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Xếp hàng lên tàu vũ trụ: bé nào nhỏ đứng trước, lớn đứng sau (tăng dần) hoặc ngược lại (giảm dần)! 🚂"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Tăng dần và Giảm dần",
                "explanation": "Phân biệt hai cách sắp xếp:",
                "points": [
                  "Tăng dần: Từ số BÉ NHẤT đến số LỚN NHẤT (như leo cầu thang đi lên).",
                  "Giảm dần: Từ số LỚN NHẤT đến số BÉ NHẤT (như đi cầu thang xuống)."
                ],
                "rule": "Tăng dần: từ bé đến lớn. Giảm dần: từ lớn đến bé."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Dãy số nào được xếp theo thứ tự TĂNG DẦN?",
                "options": [
                  "11, 14, 17, 20",
                  "20, 17, 14, 11",
                  "14, 11, 20, 17"
                ],
                "answer": "11, 14, 17, 20",
                "mascotHint": "Tăng dần là từ bé đến lớn: 11 rồi đến 14, 17, 20!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Tăng dần: từ bé đến lớn",
                  "Giảm dần: từ lớn đến bé"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l9",
          "title": "Bài 9: Tia số và số liền trước, số liền sau",
          "type": "learn",
          "description": "Trục tia số và vị trí các số liền kề",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Tia số giống như một con đường thẳng tắp, trên đó các ngôi nhà số xếp hàng ngay ngắn! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Số liền trước và số liền sau",
                "explanation": "Trên tia số, các số cách đều nhau:",
                "points": [
                  "Số LIỀN TRƯỚC: đứng ngay bên trái số đã cho (lấy số đó TRỪ 1).",
                  "Số LIỀN SAU: đứng ngay bên phải số đã cho (lấy số đó CỘNG 1)."
                ],
                "rule": "Số liền trước của 15 là 14 (15 - 1). Số liền sau của 15 là 16 (15 + 1)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền trước của số 17 là số nào?",
                "options": [
                  16,
                  18,
                  15,
                  17
                ],
                "answer": 16,
                "mascotHint": "Số liền trước đứng ngay trước số 17, lấy 17 - 1 = 16!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ tia số:",
                "points": [
                  "Liền trước = Số đó - 1",
                  "Liền sau = Số đó + 1"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l10",
          "title": "Bài 10: Luyện tập củng cố các số đến 20",
          "type": "learn",
          "description": "Bài tập tổng hợp củng cố Chủ đề 3",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng làm bài kiểm tra nhỏ để củng cố toàn bộ kỹ năng đọc, viết, so sánh số đến 20 nhé! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Tổng Hợp Kỹ Năng",
                "title": "Cẩm nang số phạm vi 20",
                "explanation": "Bé đã nắm vững: 1 chục = 10 đơn vị, cách so sánh hàng chục và hàng đơn vị, số liền trước và liền sau.",
                "rule": "Tự tin đọc kỹ đề bài trước khi chọn phương án!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 1 chục và 7 đơn vị đọc là gì?",
                "options": [
                  "Mười bảy",
                  "Bảy mươi",
                  "Mười bảy đơn vị"
                ],
                "answer": "Mười bảy",
                "mascotHint": "1 chục và 7 đơn vị viết là 17, đọc là Mười bảy!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Nắm vững 100% kiến thức các số đến 20"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l11",
          "title": "Bài 11: Số liền trước và số liền sau trong phạm vi 20",
          "type": "learn",
          "description": "Rèn luyện phản xạ tìm số liền kề",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Bé hãy thử phản xạ nhanh: khi Cú Mèo nói một số, bé hãy tìm ngay người hàng xóm của số đó nhé! 🏡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phản Xạ Liền Kề",
                "title": "Hai người hàng xóm thân thiết",
                "explanation": "Mỗi số trong dãy số đều có hai người hàng xóm: người đứng trước (kém 1) và người đứng sau (hơn 1).",
                "rule": "Ví dụ với số 12: Liền trước là 11, liền sau là 13. Ta có bộ ba: 11, 12, 13."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền sau của số 19 là số nào?",
                "options": [
                  20,
                  18,
                  21,
                  10
                ],
                "answer": 20,
                "mascotHint": "Sau 19 là số 20 tròn trịa!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Liền trước kém 1, liền sau hơn 1"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c3-l12",
          "title": "Bài 12: Đếm thêm 2 đơn vị đến 20",
          "type": "learn",
          "description": "Làm quen với dãy số cách đều",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chú thỏ nhảy lò cò mỗi bước 2 ô! Cùng nhảy với chú thỏ nào: 2, 4, 6, 8... 🐰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đếm Cách Đều 2",
                "title": "Dãy số chẵn đến 20",
                "explanation": "Mỗi lần đếm ta cộng thêm 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20. Đây là nền tảng của bảng nhân 2 ở Lớp 2 đấy!",
                "rule": "Cộng thêm 2 vào số trước để được số sau."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Dãy số nhảy 2 bước: 10, 12, 14, ... Số tiếp theo là số mấy?",
                "options": [
                  16,
                  15,
                  18,
                  13
                ],
                "answer": 16,
                "mascotHint": "14 cộng thêm 2 bước: 15, 16!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Đếm thêm 2: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c4",
      "name": "Chủ đề 4: Phép cộng, phép trừ trong phạm vi 20",
      "description": "Phép cộng không nhớ và qua 10, phép trừ không nhớ và qua 10 trong phạm vi 20",
      "icon": "✨",
      "color": "#ec4899",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c4-l1",
          "title": "Bài 1: Phép cộng dạng 10 + 3",
          "type": "learn",
          "description": "Cộng 10 với một số có một chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cộng 10 với một số bất kỳ cực kỳ dễ dàng, bé chỉ cần ghép số là xong! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Ghép Số Thần Tốc",
                "title": "Quy tắc cộng 10 + a",
                "explanation": "Số 10 gồm 1 chục và 0 đơn vị. Khi cộng thêm a đơn vị, chữ số a sẽ thay thế vị trí số 0!",
                "rule": "10 + 3 = 13; 10 + 5 = 15; 10 + 8 = 18.",
                "example": {
                  "text": "10 + 6 = ? 👉 1 chục và 6 đơn vị chính là số 16!"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 10 + 7 = ?",
                "options": [
                  17,
                  70,
                  16,
                  18
                ],
                "answer": 17,
                "mascotHint": "1 chục ghép với 7 đơn vị thành 17!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc 10 + a:",
                "points": [
                  "10 + a = 1a (1 chục và a đơn vị)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l2",
          "title": "Bài 2: Phép cộng dạng 14 + 3 (Cộng không nhớ)",
          "type": "learn",
          "description": "Cộng số có hai chữ số với số có một chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi cộng 14 + 3, chúng mình làm thế nào? Hãy nhớ: Đơn vị cộng với đơn vị nhé! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Hai bước tính 14 + 3",
                "explanation": "Bé làm theo 2 bước:",
                "steps": [
                  {
                    "title": "Bước 1: Cộng hàng đơn vị",
                    "desc": "Lấy 4 cộng 3: 4 + 3 = 7."
                  },
                  {
                    "title": "Bước 2: Giữ nguyên hàng chục",
                    "desc": "Giữ nguyên 1 chục, nên Ghép 1 chục với 7 đơn vị được 17!"
                  }
                ],
                "rule": "Cộng hàng đơn vị với nhau, giữ nguyên chữ số 1 ở hàng chục."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 12 + 5 = ?",
                "options": [
                  17,
                  16,
                  18,
                  15
                ],
                "answer": 17,
                "mascotHint": "Lấy 2 + 5 = 7, ghép với 1 chục được 17!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Cộng đơn vị trước, giữ nguyên hàng chục"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l3",
          "title": "Bài 3: Phép cộng dạng 9 + 4 (Qua 10)",
          "type": "learn",
          "description": "Phương pháp tách số làm cho tròn 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Khi cộng qua 10, bí kíp số 1 của các trạng nguyên là: Làm cho tròn 10 rồi cộng tiếp! 🔟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bí Kíp Tròn 10",
                "title": "Cách tính 9 + 4",
                "explanation": "Số 9 cần thêm 1 để tròn 10. Ta tách 1 từ số 4:",
                "steps": [
                  {
                    "title": "Bước 1: Tách số",
                    "desc": "Tách 4 thành 1 và 3."
                  },
                  {
                    "title": "Bước 2: Làm tròn 10",
                    "desc": "Lấy 9 + 1 = 10."
                  },
                  {
                    "title": "Bước 3: Cộng phần còn lại",
                    "desc": "Lấy 10 + 3 = 13!"
                  }
                ],
                "rule": "9 + 4 = (9 + 1) + 3 = 10 + 3 = 13."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 9 + 5 = ?",
                "options": [
                  14,
                  13,
                  15,
                  12
                ],
                "answer": 14,
                "mascotHint": "Tách 5 thành 1 và 4: 9 + 1 = 10; 10 + 4 = 14!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc 9 cộng một số:",
                "points": [
                  "Tách 1 để làm tròn 10 rồi cộng số còn lại"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l4",
          "title": "Bài 4: Phép cộng dạng 8 + 5 (Qua 10)",
          "type": "learn",
          "description": "Tiếp tục phương pháp làm tròn 10 với số 8",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số 8 cần thêm mấy để tròn 10 nhỉ? Đúng rồi, cần thêm 2! Cùng tính 8 + 5 nhé! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Tròn 10 Với Số 8",
                "title": "Cách tính 8 + 5",
                "explanation": "Tách 5 thành 2 và 3: Lấy 8 + 2 = 10, sau đó 10 + 3 = 13!",
                "rule": "8 cộng một số: Tách 2 ở số sau để gộp với 8 thành 10, rồi lấy 10 cộng phần còn lại."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 8 + 4 = ?",
                "options": [
                  12,
                  11,
                  13,
                  14
                ],
                "answer": 12,
                "mascotHint": "8 + 2 = 10; 10 + 2 = 12!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "8 + 5 = 13; 8 + 4 = 12; 8 + 6 = 14"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l5",
          "title": "Bài 5: Bảng cộng qua 10 phạm vi 20",
          "type": "learn",
          "description": "Tổng hợp bảng cộng qua 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Nắm chắc bảng cộng qua 10 sẽ giúp bé học toán Lớp 2 và các lớp sau cực kỳ xuất sắc! 🏆"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bảng Cộng Qua 10",
                "title": "Các phép cộng thường gặp",
                "points": [
                  "9 + 2 = 11; 9 + 3 = 12; 9 + 4 = 13; 9 + 5 = 14",
                  "8 + 3 = 11; 8 + 4 = 12; 8 + 5 = 13; 8 + 6 = 14",
                  "7 + 4 = 11; 7 + 5 = 12; 7 + 6 = 13",
                  "6 + 5 = 11; 6 + 6 = 12"
                ],
                "rule": "Luôn nhớ: Làm cho tròn 10 rồi cộng với phần còn lại!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 7 + 5 = ?",
                "options": [
                  12,
                  11,
                  13,
                  14
                ],
                "answer": 12,
                "mascotHint": "7 + 3 = 10; 10 + 2 = 12!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Thuộc bảng cộng qua 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l6",
          "title": "Bài 6: Phép trừ dạng 17 - 4 (Trừ không nhớ)",
          "type": "learn",
          "description": "Trừ số có hai chữ số cho số có một chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Với phép trừ dạng 17 - 4, quy tắc vàng vẫn là: Lấy hàng đơn vị trừ hàng đơn vị! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Trừ Hàng Đơn Vị",
                "title": "Hai bước tính 17 - 4",
                "explanation": "Bé thực hiện:",
                "steps": [
                  {
                    "title": "Bước 1: Trừ hàng đơn vị",
                    "desc": "Lấy 7 trừ 4: 7 - 4 = 3."
                  },
                  {
                    "title": "Bước 2: Giữ nguyên hàng chục",
                    "desc": "Ghép 1 chục với 3 đơn vị, vậy kết quả là 13!"
                  }
                ],
                "rule": "Lấy đơn vị trừ đơn vị, giữ nguyên 1 chục."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 16 - 2 = ?",
                "options": [
                  14,
                  15,
                  13,
                  12
                ],
                "answer": 14,
                "mascotHint": "Lấy 6 - 2 = 4, ghép với 1 chục được 14!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "17 - 4 = 13; 16 - 2 = 14"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l7",
          "title": "Bài 7: Phép trừ dạng 11 - 5 (Trừ qua 10)",
          "type": "learn",
          "description": "Phương pháp trừ để được 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Làm thế nào để tính 11 - 5? Bí quyết là: Trừ để về đúng số 10 rồi trừ tiếp! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Trừ Về 10",
                "title": "Cách tính 11 - 5",
                "explanation": "Tách số 5 thành 1 và 4:",
                "steps": [
                  {
                    "title": "Bước 1: Trừ về 10",
                    "desc": "Lấy 11 - 1 = 10."
                  },
                  {
                    "title": "Bước 2: Trừ số còn lại",
                    "desc": "Lấy 10 - 4 = 6!"
                  }
                ],
                "rule": "11 - 5 = (11 - 1) - 4 = 10 - 4 = 6."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 11 - 3 = ?",
                "options": [
                  8,
                  7,
                  9,
                  6
                ],
                "answer": 8,
                "mascotHint": "11 - 1 = 10; 10 - 2 = 8!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc trừ qua 10:",
                "points": [
                  "Trừ về 10 rồi trừ số còn lại"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l8",
          "title": "Bài 8: Phép trừ dạng 14 - 7 (Trừ qua 10)",
          "type": "learn",
          "description": "Áp dụng cho các số 12, 13, 14 trừ qua 10",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng áp dụng mẹo Trừ về 10 để tính 14 - 7 siêu nhanh nào! 🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Trừ Về 10",
                "title": "Cách tính 14 - 7",
                "explanation": "Tách 7 thành 4 và 3: Lấy 14 - 4 = 10, rồi 10 - 3 = 7!",
                "rule": "14 - 7 = 7; 13 - 6 = 7; 12 - 5 = 7."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 13 - 5 = ?",
                "options": [
                  8,
                  7,
                  9,
                  6
                ],
                "answer": 8,
                "mascotHint": "13 - 3 = 10; 10 - 2 = 8!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "14 - 7 = 7; 13 - 5 = 8"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l9",
          "title": "Bài 9: Bài toán có lời văn: Thêm vào và Bớt đi",
          "type": "learn",
          "description": "Rèn luyện tư duy giải toán thực tế",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng ghé thăm nông trại vui vẻ của Bác Nông Dân để giải toán có lời văn nào! 🚜"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kỹ Năng Giải Toán",
                "title": "Xác định phép tính đúng",
                "explanation": "Đọc kỹ câu chuyện: Có 12 chú gà, bác mua thêm 5 chú gà nữa. Hỏi có tất cả bao nhiêu chú gà?, nên Phép tính: 12 + 5 = 17 chú gà.",
                "rule": "Thêm vào, nên Phép cộng (+). Bán đi, bớt đi, nên Phép trừ (-)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trên cành có 15 quả đào, khỉ hái đi 4 quả đào. Hỏi trên cành còn lại bao nhiêu quả đào?",
                "options": [
                  "11 quả đào",
                  "19 quả đào",
                  "12 quả đào"
                ],
                "answer": "11 quả đào",
                "mascotHint": "Hái đi là bớt đi: 15 - 4 = 11 quả đào!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Đọc đề, rồi lập phép tính, rồi viết đáp số kèm đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l10",
          "title": "Bài 10: Luyện tập chung phép tính phạm vi 20",
          "type": "learn",
          "description": "Củng cố tính toán chính xác và tốc độ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bé ơi, cùng luyện tập để đôi bàn tay và trí não tính nhẩm thật nhanh nhé! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Luyện Phản Xạ",
                "title": "Bí quyết tính nhẩm không sai",
                "explanation": "Nhớ lại các cặp bạn thân và quy tắc làm tròn 10 để tính nhẩm tức thì.",
                "rule": "Kiểm tra lại kết quả bằng phép tính ngược lại."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 9 + 6 = ?",
                "options": [
                  15,
                  14,
                  16,
                  13
                ],
                "answer": 15,
                "mascotHint": "9 + 1 = 10; 10 + 5 = 15!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Tính toán chính xác và tự tin trong phạm vi 20"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l11",
          "title": "Bài 11: Tính nhẩm liên tiếp ba số phạm vi 20",
          "type": "learn",
          "description": "Thứ tự thực hiện phép tính từ trái sang phải",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi gặp biểu thức có hai dấu tính liền nhau như: 12 + 3 - 4, ta tính thế nào? 🚂"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Cùng Bé",
                "title": "Tính từ trái sang phải",
                "explanation": "Khi biểu thức chỉ có phép cộng và phép trừ, ta luôn tính theo thứ tự từ TRÁI sang PHẢI:",
                "steps": [
                  {
                    "title": "Bước 1: Tính cặp đầu tiên",
                    "desc": "12 + 3 = 15."
                  },
                  {
                    "title": "Bước 2: Tính tiếp với số thứ ba",
                    "desc": "15 - 4 = 11."
                  }
                ],
                "rule": "Luôn tính từ TRÁI sang PHẢI đều đặn từng bước."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính giá trị: 10 + 5 - 2 = ?",
                "options": [
                  13,
                  14,
                  15,
                  12
                ],
                "answer": 13,
                "mascotHint": "Tính 10 + 5 = 15 trước, sau đó lấy 15 - 2 = 13!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ thứ tự tính:",
                "points": [
                  "Tính từ trái qua phải: Bước 1 rồi đến Bước 2"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c4-l12",
          "title": "Bài 12: Bài toán về giỏ quà yêu thương",
          "type": "learn",
          "description": "Ứng dụng toán học vào tình huống cuộc sống",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Bé hãy cùng chuẩn bị những giỏ quà yêu thương tặng các bạn nhỏ vùng cao nhé! 🎁"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Toán Học Ý Nghĩa",
                "title": "Cộng dồn quà tặng",
                "explanation": "Giỏ 1 có 8 cuốn vở, giỏ 2 có 7 cuốn vở. Hỏi cả hai giỏ có bao nhiêu cuốn vở? Phép tính: 8 + 7 = 15 cuốn vở.",
                "rule": "Toán học giúp chúng mình đếm và chia sẻ yêu thương với mọi người!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong giỏ có 8 quả cam và 6 quả táo. Hỏi trong giỏ có tất cả bao nhiêu quả?",
                "options": [
                  14,
                  13,
                  15,
                  12
                ],
                "answer": 14,
                "mascotHint": "8 + 6 = 14 quả!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chủ đề 4:",
                "points": [
                  "Bé đã làm chủ hoàn toàn các phép tính trong phạm vi 20!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c5",
      "name": "Chủ đề 5: Các số đến 100 & So sánh số",
      "description": "Số tròn chục, đọc viết số đến 100, bảng 100 số và cấu tạo số chục đơn vị",
      "icon": "💯",
      "color": "#f59e0b",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c5-l1",
          "title": "Bài 1: Các số tròn chục từ 10 đến 50",
          "type": "learn",
          "description": "Nhận biết các số tròn chục nhỏ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Số tròn chục là các số kết thúc bằng chữ số 0 tròn xoe! Cùng làm quen với 10, 20, 30, 40, 50 nhé! 🔵"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Số Tròn Chục",
                "title": "Ý nghĩa các số tròn chục",
                "explanation": "Mỗi số tròn chục gồm các chục trọn vẹn, không có đơn vị lẻ:",
                "points": [
                  "10: 1 chục (mười)",
                  "20: 2 chục (hai mươi)",
                  "30: 3 chục (ba mươi)",
                  "40: 4 chục (bốn mươi)",
                  "50: 5 chục (năm mươi)"
                ],
                "rule": "Số tròn chục luôn có chữ số hàng đơn vị là 0."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "3 chục que tính được viết là số nào?",
                "options": [
                  30,
                  3,
                  13,
                  33
                ],
                "answer": 30,
                "mascotHint": "3 chục = 30 đơn vị!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "10, 20, 30, 40, 50 là các số tròn chục"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l2",
          "title": "Bài 2: Các số tròn chục từ 60 đến 90",
          "type": "learn",
          "description": "Các số tròn chục lớn và số 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Cùng đếm tiếp các số tròn chục lớn hơn: 60, 70, 80, 90 và đích đến 100 nào! 💯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đếm Đến 100",
                "title": "Các số tròn chục lớn",
                "explanation": "60 (sáu mươi), 70 (bảy mươi), 80 (tám mươi), 90 (chín mươi). Đặc biệt 10 chục gộp lại gọi là MỘT TRĂM (viết là 100)!",
                "rule": "10 chục = 100 (Một trăm)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "10 chục bằng bao nhiêu?",
                "options": [
                  "100",
                  "10",
                  "90",
                  "1000"
                ],
                "answer": "100",
                "mascotHint": "10 chục gộp lại chính là 100 (một trăm)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "60, 70, 80, 90",
                  "10 chục = 100 (một trăm)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l3",
          "title": "Bài 3: Cộng trừ các số tròn chục",
          "type": "learn",
          "description": "Tính toán nhanh với số tròn chục",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cộng trừ số tròn chục cũng dễ như cộng trừ các số nhỏ vậy! Cùng khám phá mẹo nhẩm nhé! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhẩm Tròn Chục",
                "title": "Tính nhẩm theo hàng chục",
                "explanation": "Ví dụ tính 30 + 20: Bé chỉ cần nhẩm: 3 chục + 2 chục = 5 chục, nên Viết số 50!",
                "rule": "Cộng/trừ chữ số hàng chục với nhau, rồi viết thêm số 0 ở đằng sau.",
                "example": {
                  "text": "50 - 20 = ? 👉 5 chục - 2 chục = 3 chục, nên là 50 - 20 = 30."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 40 + 30 = ?",
                "options": [
                  70,
                  60,
                  80,
                  50
                ],
                "answer": 70,
                "mascotHint": "4 chục + 3 chục = 7 chục (70)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bí quyết tròn chục:",
                "points": [
                  "Cộng trừ hàng chục rồi thêm số 0 vào sau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l4",
          "title": "Bài 4: Đếm các số từ 21 đến 40",
          "type": "learn",
          "description": "Đếm tiếp các số hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Sau 20 là các số nào nhỉ? Hãy cùng Cú Mèo đếm từ 21 đến 40 nhé! 🎈"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đếm Số 21 - 40",
                "title": "Quy tắc đọc số hàng hai mươi và ba mươi",
                "explanation": "Lưu ý khi đọc:",
                "points": [
                  "21: đọc là hai mươi mốt (không đọc là hai mươi một)",
                  "25: đọc là hai mươi lăm",
                  "31: ba mươi mốt; 35: ba mươi lăm"
                ],
                "rule": "Chữ số 1 ở hàng đơn vị đọc là \"mốt\" (khi đứng sau số chục từ 2 trở lên)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số 31 được đọc đúng là gì?",
                "options": [
                  "Ba mươi mốt",
                  "Ba mươi một",
                  "Mười ba"
                ],
                "answer": "Ba mươi mốt",
                "mascotHint": "Đọc là \"ba mươi mốt\" bé nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Đuôi 1 đọc là \"mốt\", đuôi 5 đọc là \"lăm\""
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l5",
          "title": "Bài 5: Đếm các số từ 41 đến 70",
          "type": "learn",
          "description": "Đếm tiếp các số hàng bốn mươi, năm mươi, sáu mươi",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng tiếp tục hành trình đếm số từ 41 đến 70 nào! Càng đếm càng thấy toán học thật kỳ diệu! ✨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Số 41 Đến 70",
                "title": "Cấu tạo các số từ 41 đến 70",
                "explanation": "Số 41, 42... 50; 51, 52... 60; 61, 62... 70. Mỗi số đều gồm số chục đứng trước và số đơn vị đứng sau.",
                "rule": "54 đọc là năm mươi tư hoặc năm mươi bốn."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số đứng liền trước số 60 là số nào?",
                "options": [
                  59,
                  61,
                  50,
                  58
                ],
                "answer": 59,
                "mascotHint": "Trước 60 là số 59!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Nắm chắc các số từ 41 đến 70"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l6",
          "title": "Bài 6: Đếm các số từ 71 đến 100",
          "type": "learn",
          "description": "Chạm mốc 100 số đầu tiên",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Đích đến 100 đang ở ngay trước mắt! Cùng đếm từ 71 đến số 100 vĩ đại nào! 🚀"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cột Mốc 100",
                "title": "Từ 71 đến 100",
                "explanation": "Số 99 là số có hai chữ số lớn nhất. Khi thêm 1 đơn vị vào 99, ta được số 100 - số có ba chữ số nhỏ nhất!",
                "rule": "Số có hai chữ số lớn nhất: 99. Số nhỏ nhất có ba chữ số: 100."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số có hai chữ số lớn nhất là số nào?",
                "options": [
                  99,
                  100,
                  90,
                  89
                ],
                "answer": 99,
                "mascotHint": "99 gồm 9 chục và 9 đơn vị, là số có hai chữ số lớn nhất!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Bé đã đếm thành thạo từ 1 đến 100!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l7",
          "title": "Bài 7: Chục và Đơn vị của số có hai chữ số",
          "type": "learn",
          "description": "Phân tích cấu tạo số có hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bất kỳ số có hai chữ số nào cũng có thể tách thành tổng của các Chục và Đơn vị! 🧩"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cấu Tạo Thập Phân",
                "title": "Tách số thành Chục và Đơn vị",
                "explanation": "Ví dụ số 58: Chữ số 5 chỉ 5 chục (50), chữ số 8 chỉ 8 đơn vị.",
                "rule": "58 = 50 + 8; 73 = 70 + 3; 45 = 40 + 5.",
                "example": {
                  "text": "Số 64 gồm mấy chục và mấy đơn vị? 👉 Số 64 gồm 6 chục và 4 đơn vị. Ta viết: 64 = 60 + 4."
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số gồm 7 chục và 2 đơn vị là số nào?",
                "options": [
                  72,
                  27,
                  702,
                  9
                ],
                "answer": 72,
                "mascotHint": "7 chục ở hàng chục, 2 đơn vị ở hàng đơn vị, nên Số 72!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc cấu tạo số:",
                "points": [
                  "Số ab = a chục + b đơn vị = a0 + b"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l8",
          "title": "Bài 8: So sánh các số có hai chữ số",
          "type": "learn",
          "description": "Quy tắc so sánh số đến 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Làm thế nào để biết giữa 47 và 52, số nào lớn hơn? Rất dễ dàng khi nhìn vào hàng chục! ⚖️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Quy Trình So Sánh",
                "title": "Hai bước so sánh số có hai chữ số",
                "explanation": "Bé làm theo 2 bước:",
                "steps": [
                  {
                    "title": "Bước 1: So sánh hàng chục trước",
                    "desc": "Số nào có hàng chục lớn hơn thì số đó lớn hơn! (Ví dụ: 52 có 5 chục > 47 có 4 chục, nên là 52 > 47)."
                  },
                  {
                    "title": "Bước 2: So sánh hàng đơn vị",
                    "desc": "Nếu hàng chục bằng nhau, số nào có hàng đơn vị lớn hơn thì số đó lớn hơn! (Ví dụ: 68 > 63 vì 8 > 3)."
                  }
                ],
                "rule": "So sánh hàng chục trước. Hàng chục bằng nhau mới so sánh hàng đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Điền dấu thích hợp: 63 ... 59",
                "options": [
                  ">",
                  "<",
                  "="
                ],
                "answer": ">",
                "mascotHint": "6 chục lớn hơn 5 chục nên 63 > 59!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Hàng chục lớn hơn thì số đó lớn hơn",
                  "Hàng chục bằng nhau thì so sánh hàng đơn vị"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l9",
          "title": "Bài 9: Bảng các số từ 1 đến 100",
          "type": "learn",
          "description": "Khám phá cấu trúc bảng 100 số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Bảng 100 số là một bức tranh tuyệt đẹp gồm 10 hàng và 10 cột chứa đựng rất nhiều điều kỳ diệu! 🗺️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bản Đồ 100 Số",
                "title": "Quy luật của bảng 100 số",
                "explanation": "Khi di chuyển trên bảng 100 số:",
                "points": [
                  "Sang phải 1 ô: Số tăng thêm 1 đơn vị (+1).",
                  "Sang trái 1 ô: Số giảm đi 1 đơn vị (-1).",
                  "Xuống dưới 1 ô: Số tăng thêm 1 chục (+10).",
                  "Lên trên 1 ô: Số giảm đi 1 chục (-10)."
                ],
                "rule": "Quy luật: Cùng hàng hơn kém 1 đơn vị; Cùng cột hơn kém 10 đơn vị (1 chục)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Trong bảng 100 số, số ở ngay dưới số 35 là số nào?",
                "options": [
                  45,
                  36,
                  34,
                  25
                ],
                "answer": 45,
                "mascotHint": "Ô ngay phía dưới hơn 1 chục (+10): 35 + 10 = 45!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Bí kíp bảng 100 số:",
                "points": [
                  "Ngang: hơn kém 1",
                  "Dọc: hơn kém 10 (1 chục)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l10",
          "title": "Bài 10: Luyện tập tổng hợp số đến 100",
          "type": "learn",
          "description": "Rèn luyện kỹ năng toàn diện Chủ đề 5",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng Cú Mèo ôn tập tổng hợp để trở thành bậc thầy về các số đến 100 nhé! 🏅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Tổng Hợp Số 100",
                "title": "Các dạng bài tập trọng tâm",
                "points": [
                  "Phân tích số: 85 = 80 + 5",
                  "Tìm số liền trước (trừ 1), số liền sau (cộng 1)",
                  "Sắp xếp dãy số theo thứ tự từ bé đến lớn"
                ],
                "rule": "Đọc kỹ yêu cầu đề bài để không bị nhầm lẫn giữa chục và đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số liền sau của số 89 là số nào?",
                "options": [
                  90,
                  88,
                  99,
                  80
                ],
                "answer": 90,
                "mascotHint": "Sau 89 là số tròn chục 90!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Thành thạo đọc, viết, so sánh số đến 100"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l11",
          "title": "Bài 11: Đếm xuôi và đếm lùi trên bảng 100 số",
          "type": "learn",
          "description": "Rèn luyện phản xạ dãy số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Cùng thử thách đếm tiến và đếm lùi với tốc độ ánh sáng nào! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Phản Xạ Đếm",
                "title": "Đếm nhảy bước",
                "explanation": "Bé có thể đếm nhảy 5 bước: 5, 10, 15, 20... hoặc đếm nhảy 10 bước: 10, 20, 30, 40...",
                "rule": "Đếm cách đều giúp tính toán nhanh và nhận diện quy luật dãy số."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đếm cách đều 5: 20, 25, 30, ... Số tiếp theo là số mấy?",
                "options": [
                  35,
                  40,
                  31,
                  32
                ],
                "answer": 35,
                "mascotHint": "30 thêm 5 đơn vị là 35!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Đếm cách đều 5 và 10"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c5-l12",
          "title": "Bài 12: Trò chơi ghép thẻ Chục và Đơn vị",
          "type": "learn",
          "description": "Thử thách ghép thẻ số vui nhộn",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "proud",
                "text": "Chúc mừng bé đã đến bài cuối cùng của Chủ đề 5! Hãy cùng chơi trò chơi ghép thẻ số nhé! 🃏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Trò Chơi Ghép Thẻ",
                "title": "Ghép thẻ Chục và Đơn vị",
                "explanation": "Thẻ \"6 chục\" ghép với thẻ \"7 đơn vị\" sẽ tạo thành thẻ số \"67\"!",
                "rule": "Hàng chục đứng trước, hàng đơn vị đứng sau."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Ghép thẻ 8 chục và 9 đơn vị ta được số nào?",
                "options": [
                  89,
                  98,
                  809,
                  17
                ],
                "answer": 89,
                "mascotHint": "8 chục và 9 đơn vị tạo thành số 89!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chủ đề 5:",
                "points": [
                  "Xuất sắc chinh phục toàn bộ các số đến 100!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c6",
      "name": "Chủ đề 6: Làm quen với một số hình phẳng & Đo độ dài",
      "description": "Hình vuông, hình tròn, tam giác, chữ nhật, thước kẻ cm và xem giờ đúng",
      "icon": "📐",
      "color": "#8b5cf6",
      "totalLessons": 12,
      "lessons": [
        {
          "id": "g1-c6-l1",
          "title": "Bài 1: Nhận biết Hình tròn",
          "type": "learn",
          "description": "Đặc điểm của hình tròn không có góc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chào bé! Xung quanh chúng mình có rất nhiều đồ vật hình tròn như ông mặt trời, chiếc đĩa hay bánh xe! 🟡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặc Điểm Hình Tròn",
                "title": "Hình tròn cong kín và lăn được",
                "explanation": "Hình tròn được bao quanh bởi một đường cong khép kín. Hình tròn KHÔNG có cạnh và KHÔNG có góc nhọn nào, vì vậy nó có thể lăn tròn trơn tru!",
                "shape": "circle",
                "shapeLabel": "Hình tròn cong kín, không có cạnh, không có góc",
                "rule": "Hình tròn: Đường cong khép kín, không có cạnh, không có góc, lăn được."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đồ vật nào sau đây có dạng hình tròn?",
                "options": [
                  "Chiếc đĩa ăn cơm",
                  "Quyển sách toán",
                  "Chiếc hộp phấn"
                ],
                "answer": "Chiếc đĩa ăn cơm",
                "mascotHint": "Chiếc đĩa có viền cong tròn không có góc nhọn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ hình tròn:",
                "points": [
                  "Đường viền cong tròn khép kín",
                  "Không có cạnh, không có góc, lăn được"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l2",
          "title": "Bài 2: Nhận biết Hình vuông",
          "type": "learn",
          "description": "Đặc điểm 4 cạnh bằng nhau của hình vuông",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Viên gạch lát sàn hay chiếc bánh chưng ngày Tết có hình gì nhỉ? Đó chính là HÌNH VUÔNG! 🟦"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặc Điểm Hình Vuông",
                "title": "Hình vuông có 4 cạnh bằng nhau",
                "explanation": "Hình vuông có 4 cạnh thẳng dài hoàn toàn bằng nhau và 4 góc vuông vắn. Hình vuông không lăn được như hình tròn vì có các góc nhọn!",
                "shape": "square",
                "shapeLabel": "Hình vuông: 4 cạnh bằng nhau, 4 góc vuông",
                "rule": "Hình vuông: Có 4 cạnh dài bằng nhau và 4 góc vuông vắn."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình vuông có bao nhiêu cạnh bằng nhau?",
                "options": [
                  "4 cạnh",
                  "3 cạnh",
                  "2 cạnh",
                  "Không có cạnh nào"
                ],
                "answer": "4 cạnh",
                "mascotHint": "Hình vuông có 4 cạnh thẳng dài bằng nhau!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ hình vuông:",
                "points": [
                  "Có 4 cạnh dài bằng nhau",
                  "Có 4 góc vuông vắn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l3",
          "title": "Bài 3: Nhận biết Hình tam giác",
          "type": "learn",
          "description": "Đặc điểm 3 cạnh và 3 đỉnh của hình tam giác",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Chiếc khăn quàng đỏ hay mái nhà có hình gì nhỉ? Đó chính là HÌNH TAM GIÁC! 🔺"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặc Điểm Hình Tam Giác",
                "title": "Hình tam giác có 3 cạnh và 3 góc",
                "explanation": "Chữ \"Tam\" trong tiếng Hán nghĩa là 3. Hình tam giác có đúng 3 cạnh thẳng và 3 đỉnh (góc) nhọn.",
                "shape": "triangle",
                "shapeLabel": "Hình tam giác: 3 cạnh và 3 đỉnh",
                "rule": "Hình tam giác: Luôn có đúng 3 cạnh và 3 đỉnh."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hình tam giác có bao nhiêu cạnh?",
                "options": [
                  3,
                  4,
                  5,
                  2
                ],
                "answer": 3,
                "mascotHint": "\"Tam\" là 3: Hình tam giác có đúng 3 cạnh!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ hình tam giác:",
                "points": [
                  "Có 3 cạnh thẳng",
                  "Có 3 góc nhọn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l4",
          "title": "Bài 4: Nhận biết Hình chữ nhật",
          "type": "learn",
          "description": "Đặc điểm của hình chữ nhật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cánh cửa ra vào, màn hình tivi hay chiếc bảng lớp học có hình gì? Đó là HÌNH CHỮ NHẬT! 📱"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặc Điểm Hình Chữ Nhật",
                "title": "Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn",
                "explanation": "Hình chữ nhật có 4 cạnh và 4 góc vuông giống hình vuông, nhưng có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau!",
                "shape": "rectangle",
                "shapeLabel": "Hình chữ nhật: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau",
                "rule": "Hình chữ nhật: Có 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau và 4 góc vuông."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đồ vật nào sau đây thường có dạng hình chữ nhật?",
                "options": [
                  "Cánh cửa ra vào",
                  "Quả bóng đá",
                  "Biển báo giao thông hình tam giác"
                ],
                "answer": "Cánh cửa ra vào",
                "mascotHint": "Cánh cửa có 2 cạnh dài và 2 cạnh ngắn!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ hình chữ nhật:",
                "points": [
                  "4 cạnh: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau",
                  "4 góc vuông vắn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l5",
          "title": "Bài 5: Khối lập phương và khối hộp chữ nhật",
          "type": "learn",
          "description": "Phân biệt hai khối hình không gian 3D quen thuộc",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Viên xúc xắc và hộp sữa là hai khối hình không gian mà bé gặp hàng ngày! Cùng khám phá nhé! 📦"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khối Không Gian 3D",
                "title": "Khối lập phương & Khối hộp chữ nhật",
                "explanation": "So sánh hai khối hình:",
                "points": [
                  "Khối lập phương: Giống viên xúc xắc, có 6 mặt đều là hình vuông bằng nhau.",
                  "Khối hộp chữ nhật: Giống hộp sữa hoặc bao diêm, có các mặt là hình chữ nhật."
                ],
                "shape": "cube",
                "shapeLabel": "Khối lập phương: 6 mặt đều là hình vuông",
                "rule": "Khối lập phương: 6 mặt hình vuông. Khối hộp chữ nhật: các mặt hình chữ nhật."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Viên xúc xắc (con súc sắc) có dạng khối hình gì?",
                "options": [
                  "Khối lập phương",
                  "Khối hộp chữ nhật",
                  "Hình tròn"
                ],
                "answer": "Khối lập phương",
                "mascotHint": "Viên xúc xắc có 6 mặt đều là hình vuông, đó là khối lập phương!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết khối hình:",
                "points": [
                  "Khối lập phương: 6 mặt hình vuông",
                  "Khối hộp chữ nhật: mặt hình chữ nhật"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l6",
          "title": "Bài 6: Đo độ dài bằng gang tay và bước chân",
          "type": "learn",
          "description": "Các đơn vị đo độ dài tự nhiên của con người",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Ngày xưa khi chưa có thước kẻ, con người dùng chính cơ thể mình để đo độ dài đấy! 🖐️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đo Độ Dài Tự Nhiên",
                "title": "Gang tay, bước chân và sải tay",
                "explanation": "Các cách đo độ dài quen thuộc:",
                "points": [
                  "Gang tay: Khoảng cách từ đầu ngón cái đến đầu ngón giữa khi xòe bàn tay.",
                  "Bước chân: Khoảng cách giữa hai bàn chân khi bước đi bình thường.",
                  "Sải tay: Khoảng cách giữa hai đầu ngón tay khi dang rộng hai tay."
                ],
                "rule": "Đặt liên tiếp các gang tay sát nhau từ đầu này đến đầu kia của vật."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Muốn đo chiều dài mặt bàn học ở nhà, bé có thể dùng cách đo nào?",
                "options": [
                  "Đo bằng gang tay",
                  "Đo bằng chén nước",
                  "Đo bằng quả bóng"
                ],
                "answer": "Đo bằng gang tay",
                "mascotHint": "Dùng gang tay đặt nối tiếp nhau trên mặt bàn để đo!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ cách đo:",
                "points": [
                  "Gang tay, bước chân, sải tay là đơn vị đo tự nhiên"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l7",
          "title": "Bài 7: Xăng-ti-mét (cm) và thước đo",
          "type": "learn",
          "description": "Giới thiệu đơn vị đo chuẩn xăng-ti-mét",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Vì gang tay mỗi người lớn nhỏ khác nhau, nên mọi người cần một thước đo chuẩn gọi là XĂNG-TI-MÉT! 📏"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đơn Vị Đo Chuẩn",
                "title": "Xăng-ti-mét viết tắt là cm",
                "explanation": "Xăng-ti-mét là đơn vị đo độ dài chuẩn quốc tế. Trên thước kẻ có các vạch số: 0 cm, 1 cm, 2 cm, 3 cm... Khoảng cách giữa hai vạch số liền nhau là đúng 1 cm.",
                "rule": "Xăng-ti-mét viết tắt là cm. Ví dụ: 5 cm đọc là \"năm xăng-ti-mét\"."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Xăng-ti-mét được viết tắt là gì?",
                "options": [
                  "cm",
                  "m",
                  "km",
                  "kg"
                ],
                "answer": "cm",
                "mascotHint": "Chữ \"c\" ghép với chữ \"m\" tạo thành \"cm\"!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ cm:",
                "points": [
                  "Xăng-ti-mét viết tắt là cm",
                  "Dùng thước kẻ có chia vạch cm để đo"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l8",
          "title": "Bài 8: Thực hành dùng thước kẻ đo cm",
          "type": "learn",
          "description": "Kỹ thuật đặt thước đo chính xác",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Làm thế nào để đo chiếc bút chì dài bao nhiêu cm? Cùng học 3 bước đặt thước kẻ chuẩn xác nhé! ✏️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Kỹ Thuật Đặt Thước",
                "title": "Ba bước đo độ dài bằng thước kẻ",
                "explanation": "Để đo một vật thể:",
                "steps": [
                  {
                    "title": "Bước 1: Đặt vạch số 0",
                    "desc": "Đặt một đầu của vật trùng khít với vạch số 0 trên thước kẻ."
                  },
                  {
                    "title": "Bước 2: Căn thẳng mép thước",
                    "desc": "Mép thước kẻ phải đặt thẳng dọc theo vật cần đo."
                  },
                  {
                    "title": "Bước 3: Đọc số ở đầu kia",
                    "desc": "Đầu kia của vật chỉ vào vạch số mấy thì vật dài bấy nhiêu cm!"
                  }
                ],
                "rule": "Lưu ý: Luôn bắt đầu từ vạch số 0 (không bắt đầu từ mép ngoài của thước)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Khi dùng thước kẻ để đo độ dài chiếc bút, đầu chiếc bút phải đặt trùng với vạch số mấy?",
                "options": [
                  "Vạch số 0",
                  "Vạch số 1",
                  "Mép ngoài cùng của thước"
                ],
                "answer": "Vạch số 0",
                "mascotHint": "Luôn luôn đặt đầu vật trùng khít với vạch số 0 của thước kẻ!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc đo thước:",
                "points": [
                  "Bắt đầu từ vạch số 0",
                  "Đọc số ở đầu kia của vật"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l9",
          "title": "Bài 9: Xem đồng hồ: Giờ đúng",
          "type": "learn",
          "description": "Đọc giờ đúng khi kim dài chỉ số 12",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Bé đã bao giờ tự nhìn đồng hồ và biết mấy giờ để đi xem hoạt hình chưa? Cùng học xem giờ đúng nhé! ⏰"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Mặt Đồng Hồ Giờ Đúng",
                "title": "Cách đọc đồng hồ giờ đúng",
                "explanation": "Mặt đồng hồ có 12 số. Kim ngắn chỉ giờ, kim dài chỉ phút. Khi kim dài chỉ thẳng đứng vào số 12, đó là giờ đúng!",
                "clock": {
                  "hour": 8,
                  "minute": 0,
                  "showLabels": true,
                  "timeText": "8 giờ đúng"
                },
                "rule": "Kim dài chỉ số 12: Kim ngắn chỉ vào số nào thì đồng hồ chỉ đúng bấy nhiêu giờ!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đồng hồ có kim dài chỉ số 12, kim ngắn chỉ số 8. Hỏi lúc đó là mấy giờ?",
                "options": [
                  "8 giờ",
                  "12 giờ",
                  "4 giờ"
                ],
                "answer": "8 giờ",
                "mascotHint": "Kim dài ở số 12, kim ngắn chỉ số 8 là đúng 8 giờ!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ xem giờ:",
                "points": [
                  "Kim ngắn: chỉ giờ",
                  "Kim dài: chỉ phút",
                  "Kim dài chỉ 12: kim ngắn ở số nào là đúng bấy nhiêu giờ"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l10",
          "title": "Bài 10: Các ngày trong tuần và xem lịch",
          "type": "learn",
          "description": "7 ngày trong một tuần lễ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Một tuần lễ có mấy ngày? Những ngày nào bé đi học và ngày nào được nghỉ ở nhà với bố mẹ? 📅"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Tuần Lễ Của Bé",
                "title": "Một tuần lễ có 7 ngày",
                "explanation": "Thứ tự các ngày trong một tuần lễ bắt đầu từ Thứ Hai:",
                "points": [
                  "Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu: Bé đến trường đi học.",
                  "Thứ Bảy, Chủ Nhật: Hai ngày cuối tuần bé được nghỉ ngơi, vui chơi cùng gia đình."
                ],
                "rule": "Một tuần lễ có 7 ngày: Thứ Hai, nên Thứ Ba, nên Thứ Tư, nên Thứ Năm, nên Thứ Sáu, nên Thứ Bảy, nên Chủ Nhật."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Một tuần lễ có tất cả bao nhiêu ngày?",
                "options": [
                  "7 ngày",
                  "5 ngày",
                  "6 ngày",
                  "8 ngày"
                ],
                "answer": "7 ngày",
                "mascotHint": "Một tuần lễ có 7 ngày từ Thứ Hai đến Chủ Nhật!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết tuần lễ:",
                "points": [
                  "Một tuần = 7 ngày",
                  "5 ngày đi học (Thứ 2 đến Thứ 6), 2 ngày nghỉ (Thứ 7, Chủ Nhật)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l11",
          "title": "Bài 11: Vị trí không gian: Trước - Sau, Trên - Dưới, Trái - Phải",
          "type": "learn",
          "description": "Định hướng không gian xung quanh",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Biết rõ phương hướng giúp bé tìm đồ vật dễ dàng và an toàn khi tham gia giao thông! 🧭"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Định Hướng Không Gian",
                "title": "Các cặp phương hướng đối lập",
                "points": [
                  "Trên - Dưới: Đèn chùm ở trên trần nhà, thảm trải ở dưới sàn nhà.",
                  "Trước - Sau: Cú Mèo đứng trước bảng, bảng ở sau lưng Cú Mèo.",
                  "Trái - Phải: Tay phải thường cầm bút viết, tay trái giữ trang vở."
                ],
                "rule": "Xác định vị trí dựa trên vật làm mốc."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Khi bé ngồi học bài, tay nào thường dùng để cầm bút viết?",
                "options": [
                  "Tay phải",
                  "Tay trái",
                  "Cả hai tay"
                ],
                "answer": "Tay phải",
                "mascotHint": "Hầu hết các bé cầm bút bằng tay phải và giữ vở bằng tay trái!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ vị trí:",
                "points": [
                  "Trên - Dưới, Trước - Sau, Trái - Phải"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c6-l12",
          "title": "Bài 12: Xếp hình sáng tạo từ các hình phẳng",
          "type": "learn",
          "description": "Ghép các hình phẳng thành bức tranh sinh động",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Từ những hình vuông, hình tam giác, hình tròn đơn giản, chúng mình có thể ghép thành ngôi nhà hay con thuyền đấy! ⛵🏠"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Sáng Tạo Xếp Hình",
                "title": "Nghệ thuật ghép hình",
                "explanation": "Ghép 1 hình vuông làm thân nhà và 1 hình tam giác làm mái nhà, nên Ta được ngôi nhà xinh xắn! Ghép 1 hình chữ nhật và 2 hình tam giác, nên Ta được chiếc thuyền buồm!",
                "rule": "Trí tưởng tượng phong phú giúp bé tạo nên muôn vàn hình ảnh kỳ diệu từ hình phẳng."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Để ghép thành mái nhà, bé thường dùng hình phẳng nào?",
                "options": [
                  "Hình tam giác",
                  "Hình tròn",
                  "Hình bầu dục"
                ],
                "answer": "Hình tam giác",
                "mascotHint": "Mái nhà có chóp nhọn, ghép bằng hình tam giác!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Hoàn thành Chủ đề 6:",
                "points": [
                  "Làm chủ các hình phẳng, thước đo cm và đồng hồ!"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c7",
      "name": "Chủ đề 7: Phép cộng, phép trừ (không nhớ) trong phạm vi 100",
      "description": "Cộng trừ số tròn chục và cộng trừ số có hai chữ số dạng đặt tính rồi tính",
      "icon": "🧮",
      "color": "#059669",
      "totalLessons": 4,
      "lessons": [
        {
          "id": "g1-c7-l1",
          "title": "Bài 1: Cộng các số tròn chục",
          "type": "learn",
          "description": "Cộng nhanh các số tròn chục phạm vi 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng rèn luyện phản xạ cộng các số tròn chục lớn hơn nào: 30 + 40, 50 + 20! ⚡"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Cộng Tròn Chục Nhanh",
                "title": "Quy tắc cộng số tròn chục",
                "explanation": "Ví dụ: 30 + 40 = ? Nhẩm: 3 chục + 4 chục = 7 chục, nên Viết số 70!",
                "rule": "Cộng các chữ số hàng chục với nhau, giữ nguyên chữ số 0 ở hàng đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 50 + 30 = ?",
                "options": [
                  80,
                  70,
                  90,
                  60
                ],
                "answer": 80,
                "mascotHint": "5 chục + 3 chục = 8 chục (80)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "30 + 40 = 70; 50 + 30 = 80"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c7-l2",
          "title": "Bài 2: Trừ các số tròn chục",
          "type": "learn",
          "description": "Trừ nhanh các số tròn chục phạm vi 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Trừ các số tròn chục cũng hoàn toàn tương tự: Trừ hàng chục rồi thêm số 0! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Trừ Tròn Chục Nhanh",
                "title": "Quy tắc trừ số tròn chục",
                "explanation": "Ví dụ: 70 - 30 = ? Nhẩm: 7 chục - 3 chục = 4 chục, nên Viết số 40!",
                "rule": "Lấy chữ số hàng chục trừ nhau, giữ nguyên số 0 ở hàng đơn vị."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 80 - 50 = ?",
                "options": [
                  30,
                  20,
                  40,
                  50
                ],
                "answer": 30,
                "mascotHint": "8 chục - 5 chục = 3 chục (30)!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "80 - 50 = 30; 90 - 40 = 50"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c7-l3",
          "title": "Bài 3: Phép cộng dạng 25 + 4 và 32 + 14",
          "type": "learn",
          "description": "Cộng không nhớ số có hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khi tính 32 + 14, bí quyết là ĐẶT TÍNH THẲNG CỘT: Chục thẳng chục, Đơn vị thẳng đơn vị! ✍️"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặt Tính Rồi Tính",
                "title": "Quy tắc cộng thẳng cột",
                "explanation": "Đặt tính sao cho hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục:",
                "steps": [
                  {
                    "title": "Bước 1: Tính hàng đơn vị trước",
                    "desc": "Lấy 2 + 4 = 6, viết 6 thẳng cột đơn vị."
                  },
                  {
                    "title": "Bước 2: Tính hàng chục sau",
                    "desc": "Lấy 3 + 1 = 4, viết 4 thẳng cột chục. Kết quả là 46!"
                  }
                ],
                "rule": "Cộng từ PHẢI sang TRÁI (hàng đơn vị trước, hàng chục sau)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 23 + 15 = ?",
                "options": [
                  38,
                  37,
                  48,
                  28
                ],
                "answer": 38,
                "mascotHint": "Đơn vị: 3 + 5 = 8; Chục: 2 + 1 = 3, vậy kết quả là 38!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Quy tắc đặt tính cộng:",
                "points": [
                  "Thẳng cột chục và đơn vị",
                  "Cộng từ phải sang trái (đơn vị trước, chục sau)"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c7-l4",
          "title": "Bài 4: Phép trừ dạng 39 - 5 và 57 - 23",
          "type": "learn",
          "description": "Trừ không nhớ số có hai chữ số",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Phép trừ cũng đặt tính thẳng cột và tính từ phải sang trái giống hệt phép cộng! 🎯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Đặt Tính Phép Trừ",
                "title": "Quy tắc trừ thẳng cột",
                "explanation": "Ví dụ tính 57 - 23:",
                "steps": [
                  {
                    "title": "Bước 1: Trừ hàng đơn vị trước",
                    "desc": "Lấy 7 - 3 = 4, viết 4 thẳng hàng đơn vị."
                  },
                  {
                    "title": "Bước 2: Trừ hàng chục sau",
                    "desc": "Lấy 5 - 2 = 3, viết 3 thẳng hàng chục. Kết quả là 34!"
                  }
                ],
                "rule": "Trừ từ PHẢI sang TRÁI (hàng đơn vị trước, hàng chục sau)."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 48 - 16 = ?",
                "options": [
                  32,
                  34,
                  22,
                  42
                ],
                "answer": 32,
                "mascotHint": "Đơn vị: 8 - 6 = 2; Chục: 4 - 1 = 3, vậy kết quả là 32!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Trừ thẳng cột: đơn vị trước, chục sau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c8",
      "name": "Chủ đề 8: Thời gian, giờ và lịch tuần lễ",
      "description": "Cấu tạo mặt đồng hồ, kim ngắn chỉ giờ, kim dài chỉ phút, xem giờ đúng và dòng thời gian",
      "icon": "⏱️",
      "color": "#f59e0b",
      "totalLessons": 3,
      "lessons": [
        {
          "id": "g1-c8-l1",
          "title": "Bài 1: Làm quen với mặt đồng hồ",
          "type": "learn",
          "description": "Nhận biết mặt đồng hồ, kim ngắn chỉ giờ, kim dài chỉ phút",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "Chào bé yêu! Để biết lúc nào thức dậy, lúc nào đến trường hay lúc nào đi ngủ, chúng mình cần xem đồng hồ đấy! Hãy cùng Cú Mèo khám phá chiếc đồng hồ nhé! ⏰✨"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khám Phá Mặt Đồng Hồ",
                "title": "Cấu tạo của chiếc đồng hồ kim",
                "explanation": "Mặt đồng hồ tròn có 12 số từ 1 đến 12 xếp đều theo vòng tròn. Trên mặt đồng hồ có hai chiếc kim rất quan trọng:",
                "clock": {
                  "hour": 7,
                  "minute": 0,
                  "showLabels": true,
                  "timeText": "7 giờ đúng"
                },
                "points": [
                  "Kim ngắn (màu cam): Là kim chỉ GIỜ. Thân kim ngắn, mập mạp và di chuyển chậm.",
                  "Kim dài (màu xanh): Là kim chỉ PHÚT. Thân kim dài, thon thả và di chuyển nhanh hơn."
                ],
                "rule": "Kim ngắn chỉ GIỜ (chạy chậm). Kim dài chỉ PHÚT (chạy nhanh)."
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Xem Giờ Thật Dễ",
                "title": "Cách xem giờ đúng",
                "rule": "Kim dài chỉ số 12: Kim ngắn chỉ vào số nào là đúng bấy nhiêu giờ!",
                "example": {
                  "text": "Bé nhìn xem: Kim dài chỉ 12, kim ngắn chỉ 7, đó chính là 7 giờ sáng (lúc bé thức dậy ăn sáng chuẩn bị đi học)! ☀️"
                },
                "clock": {
                  "hour": 7,
                  "minute": 0,
                  "showLabels": false,
                  "timeText": "7:00 — 7 giờ đúng"
                }
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Kim ngắn trên mặt đồng hồ dùng để chỉ gì?",
                "options": [
                  "Chỉ giờ",
                  "Chỉ phút",
                  "Chỉ giây"
                ],
                "answer": "Chỉ giờ",
                "mascotHint": "Kim ngắn mập hơn dùng để chỉ giờ bé nhé!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Khi kim dài chỉ thẳng số 12, kim ngắn chỉ thẳng số 9 thì đồng hồ chỉ mấy giờ?",
                "options": [
                  "9 giờ",
                  "12 giờ",
                  "3 giờ"
                ],
                "answer": "9 giờ",
                "mascotHint": "Kim dài ở số 12, kim ngắn chỉ vào số nào thì là đúng bấy nhiêu giờ!"
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học",
                "title": "Thảo luận về hai chiếc kim đồng hồ",
                "focusGraphic": {
                  "type": "clock",
                  "hour": 7,
                  "minute": 0,
                  "frameColor": "#3b82f6",
                  "timeText": "7 giờ đúng"
                },
                "dialogueList": [
                  {
                    "character": "nam",
                    "name": "Bạn Nam 👦",
                    "text": "Bạn Rô-bốt ơi, trên đồng hồ có hai chiếc kim, kim nào chạy nhanh hơn vậy?"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "Kim dài chạy nhanh hơn để chỉ phút, còn kim ngắn mập hơn chạy chậm chạp để chỉ giờ!"
                  }
                ],
                "question": "Bạn Rô-bốt trả lời đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Đúng rồi 👍",
                "explanation": "Chính xác! Kim dài chỉ phút chạy nhanh hơn, quay một vòng tròn thì kim ngắn chỉ nhích được từ số này sang số tiếp theo thôi bé nhé!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Luyện Đọc Đồng Hồ",
                "title": "Bé luyện quan sát các mặt đồng hồ",
                "explanation": "Chạm vào từng chiếc đồng hồ để kiểm tra xem kim ngắn chỉ số mấy và nghe đọc giờ đúng nhé!",
                "galleryTitle": "Đồng hồ chỉ mấy giờ?",
                "gallery": [
                  {
                    "badge": "a",
                    "label": "Đồng hồ đỏ",
                    "timeText": "2 giờ đúng",
                    "clock": { "hour": 2, "minute": 0, "frameColor": "#ef4444", "shape": "circle" }
                  },
                  {
                    "badge": "b",
                    "label": "Đồng hồ xanh lá",
                    "timeText": "5 giờ đúng",
                    "clock": { "hour": 5, "minute": 0, "frameColor": "#22c55e", "shape": "circle" }
                  },
                  {
                    "badge": "c",
                    "label": "Đồng hồ tím",
                    "timeText": "8 giờ đúng",
                    "clock": { "hour": 8, "minute": 0, "frameColor": "#8b5cf6", "shape": "circle" }
                  },
                  {
                    "badge": "d",
                    "label": "Đồng hồ cam",
                    "timeText": "11 giờ đúng",
                    "clock": { "hour": 11, "minute": 0, "frameColor": "#f97316", "shape": "circle" }
                  }
                ]
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ về chiếc đồng hồ:",
                "points": [
                  "Mặt đồng hồ có 12 số từ 1 đến 12.",
                  "Kim ngắn chỉ giờ, kim dài chỉ phút.",
                  "Kim dài chỉ số 12: kim ngắn chỉ số mấy là đúng bấy nhiêu giờ."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c8-l2",
          "title": "Bài 2: Xem giờ đúng ban ngày và ban đêm",
          "type": "learn",
          "description": "Các mốc thời gian sinh hoạt trong ngày theo SGK Kết nối tri thức",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Một ngày của bé trôi qua thật kỳ diệu với bốn buổi: buổi sáng, buổi trưa, buổi chiều và buổi tối! Mỗi buổi lại gắn liền với những hoạt động quen thuộc và chiếc đồng hồ tích tắc chỉ giờ. Cùng Rô-bốt và Cú Mèo khám phá nhé! ☀️🍱⚽🌙"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Buổi Sáng Của Bé 🌅",
                "title": "7 giờ sáng: Bé thức dậy và ăn sáng",
                "clock": {
                  "hour": 7,
                  "minute": 0,
                  "frameColor": "#eab308",
                  "timeText": "7 giờ sáng"
                },
                "explanation": "Khi ông mặt trời tỏa ánh nắng sớm, đồng hồ chỉ đúng 7 giờ (kim dài chỉ số 12, kim ngắn chỉ số 7). Bé thức dậy, đánh răng rửa mặt sạch sẽ và ăn bữa sáng bổ dưỡng chuẩn bị đến trường.",
                "rule": "Thức dậy sớm lúc 7 giờ sáng giúp bé tràn đầy năng lượng và học tập hứng khởi!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "SGK Kết Nối Tri Thức 🏫",
                "title": "9 giờ sáng: Bé chăm chỉ học bài",
                "clock": {
                  "hour": 9,
                  "minute": 0,
                  "frameColor": "#22c55e",
                  "timeText": "9 giờ sáng"
                },
                "explanation": "Bé nhìn vào tranh sách giáo khoa: Bạn nữ đang ngồi nghiêm túc bên bàn học. Đồng hồ treo tường có kim ngắn chỉ số 9, kim dài chỉ số 12, lúc này là đúng 9 giờ sáng!",
                "example": {
                  "text": "Kim ngắn chỉ số 9, kim dài chỉ số 12: Đúng 9 giờ sáng - Giờ học bài vui vẻ của bé!"
                }
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "SGK Kết Nối Tri Thức 🍱",
                "title": "11 giờ trưa: Bé ăn cơm tại phòng ăn",
                "clock": {
                  "hour": 11,
                  "minute": 0,
                  "frameColor": "#06b6d4",
                  "timeText": "11 giờ trưa"
                },
                "explanation": "Đến buổi trưa, hai bạn học sinh cùng ngồi ăn cơm ngon miệng ở phòng ăn. Chiếc đồng hồ bên cạnh chỉ 11 giờ: kim ngắn chỉ số 11, kim dài chỉ số 12.",
                "rule": "Ăn cơm trưa đúng 11 giờ và nghỉ ngơi giúp cơ thể bé phát triển khỏe mạnh!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "SGK Kết Nối Tri Thức ⚽",
                "title": "5 giờ chiều: Bé tan học đá bóng",
                "clock": {
                  "hour": 5,
                  "minute": 0,
                  "frameColor": "#f97316",
                  "timeText": "5 giờ chiều"
                },
                "explanation": "Sau giờ học, mặt trời dần ngả bóng chiều. Hai bạn cùng nhau đá bóng trên bãi cỏ xanh mát. Chiếc đồng hồ chỉ đúng 5 giờ chiều: kim ngắn chỉ số 5, kim dài chỉ số 12.",
                "example": {
                  "text": "Kim ngắn chỉ số 5, kim dài chỉ số 12: Lúc 5 giờ chiều, bé vận động thể thao để rèn luyện sức khỏe!"
                }
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "SGK Kết Nối Tri Thức 🌙",
                "title": "10 giờ tối: Bé lên giường đi ngủ",
                "clock": {
                  "hour": 10,
                  "minute": 0,
                  "frameColor": "#8b5cf6",
                  "timeText": "10 giờ tối"
                },
                "explanation": "Bầu trời đêm lấp lánh trăng sao. Bạn nhỏ đã lên giường đắp chăn ấm để ngủ say giấc nồng. Chiếc đồng hồ treo tường chỉ 10 giờ đêm: kim ngắn chỉ số 10, kim dài chỉ số 12.",
                "rule": "Bé nên đi ngủ lúc 9 giờ hoặc 10 giờ tối để não bộ phát triển thông minh và cơ thể mau lớn!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Bảng Đối Chiếu Trực Quan 1-1",
                "title": "Một ngày sinh hoạt của bé qua 4 chiếc đồng hồ",
                "rule": "Mỗi buổi trong ngày đều có một chiếc đồng hồ chỉ đúng giờ sinh hoạt tương ứng!",
                "activityGrid": [
                  {
                    "period": "Buổi sáng 🌅",
                    "timeText": "9 giờ sáng",
                    "clock": {
                      "hour": 9,
                      "minute": 0,
                      "frameColor": "#22c55e",
                      "shape": "circle"
                    },
                    "desc": "Bé chăm chỉ ngồi học bài tại lớp bên cửa sổ nắng ấm."
                  },
                  {
                    "period": "Buổi trưa 🍱",
                    "timeText": "11 giờ trưa",
                    "clock": {
                      "hour": 11,
                      "minute": 0,
                      "frameColor": "#06b6d4",
                      "shape": "circle"
                    },
                    "desc": "Bé cùng các bạn ăn khay cơm ngon lành tại phòng ăn."
                  },
                  {
                    "period": "Buổi chiều ⚽",
                    "timeText": "5 giờ chiều",
                    "clock": {
                      "hour": 5,
                      "minute": 0,
                      "frameColor": "#f97316",
                      "shape": "circle"
                    },
                    "desc": "Bé tan học ra sân cỏ đá bóng và vui chơi thể thao."
                  },
                  {
                    "period": "Buổi tối 🌙",
                    "timeText": "10 giờ tối",
                    "clock": {
                      "hour": 10,
                      "minute": 0,
                      "frameColor": "#8b5cf6",
                      "shape": "circle"
                    },
                    "desc": "Bé lên giường đi ngủ say giấc nồng dưới ánh trăng sao."
                  }
                ]
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học SGK Trang 73",
                "title": "Bạn Rô-bốt nói đúng hay sai?",
                "focusGraphic": {
                  "type": "clock",
                  "hour": 12,
                  "minute": 0,
                  "frameColor": "#eab308",
                  "timeText": "12 giờ đúng"
                },
                "dialogueList": [
                  {
                    "character": "nam",
                    "name": "Bạn Nam 👦",
                    "text": "Nhìn kìa, kim ngắn và kim dài trùng nhau!"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "A! Tớ biết rồi, đồng hồ đang chỉ 12 giờ đúng!"
                  }
                ],
                "question": "Bạn Rô-bốt nói đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Đúng rồi 👍",
                "explanation": "Hoàn toàn chính xác! Khi đồng hồ chỉ 12 giờ đúng, cả kim ngắn và kim dài đều cùng chỉ thẳng đứng vào số 12, vì vậy hai chiếc kim nằm đè trùng khít lên nhau!"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Luyện Mắt Tinh Nhanh",
                "title": "Đồng hồ chỉ mấy giờ?",
                "explanation": "Bé hãy quan sát 6 chiếc đồng hồ viền tròn và vuông với nhiều màu sắc rực rỡ như trong trang 73 SGK và chạm vào từng đồng hồ để kiểm tra xem mấy giờ nhé!",
                "galleryTitle": "Bộ sưu tập 6 chiếc đồng hồ sắc màu SGK trang 73:",
                "gallery": [
                  {
                    "badge": "1",
                    "label": "Đồng hồ vàng",
                    "timeText": "1 giờ đúng",
                    "clock": {
                      "hour": 1,
                      "minute": 0,
                      "frameColor": "#eab308",
                      "shape": "circle"
                    }
                  },
                  {
                    "badge": "2",
                    "label": "Đồng hồ xanh lá",
                    "timeText": "3 giờ đúng",
                    "clock": {
                      "hour": 3,
                      "minute": 0,
                      "frameColor": "#22c55e",
                      "shape": "circle"
                    }
                  },
                  {
                    "badge": "3",
                    "label": "Đồng hồ xanh lam",
                    "timeText": "6 giờ đúng",
                    "clock": {
                      "hour": 6,
                      "minute": 0,
                      "frameColor": "#06b6d4",
                      "shape": "circle"
                    }
                  },
                  {
                    "badge": "4",
                    "label": "Đồng hồ vuông hồng",
                    "timeText": "8 giờ đúng",
                    "clock": {
                      "hour": 8,
                      "minute": 0,
                      "frameColor": "#ec4899",
                      "shape": "square"
                    }
                  },
                  {
                    "badge": "5",
                    "label": "Đồng hồ vuông cam",
                    "timeText": "4 giờ đúng",
                    "clock": {
                      "hour": 4,
                      "minute": 0,
                      "frameColor": "#f97316",
                      "shape": "square"
                    }
                  },
                  {
                    "badge": "6",
                    "label": "Đồng hồ vuông ngọc",
                    "timeText": "10 giờ đúng",
                    "clock": {
                      "hour": 10,
                      "minute": 0,
                      "frameColor": "#14b8a6",
                      "shape": "square"
                    }
                  }
                ]
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Theo sách giáo khoa, lúc 5 giờ chiều sau khi tan học, bé thường tham gia hoạt động nào?",
                "options": [
                  "Đá bóng vui chơi ngoài sân cỏ",
                  "Đi ngủ say giấc",
                  "Ăn bữa sáng"
                ],
                "answer": "Đá bóng vui chơi ngoài sân cỏ",
                "mascotHint": "Lúc 5 giờ chiều trời mát, bé tan học và ra sân đá bóng vui khỏe nhé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết kiến thức một ngày của bé:",
                "points": [
                  "Một ngày gồm có: buổi sáng, buổi trưa, buổi chiều và buổi tối.",
                  "Mỗi hoạt động sinh hoạt đều có mốc giờ tương ứng trên đồng hồ.",
                  "Lúc 12 giờ đúng, hai kim ngắn và dài trùng khít vào số 12.",
                  "Sinh hoạt điều độ, đi ngủ đúng giờ giúp bé thông minh và khỏe mạnh."
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c8-l3",
          "title": "Bài 3: Hôm nay, ngày mai, hôm qua",
          "type": "learn",
          "description": "Trình tự thời gian và tuần lễ",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Thời gian trôi đi như một dòng sông không bao giờ ngừng lại! Hôm qua, hôm nay và ngày mai! ⏳"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Dòng Thời Gian",
                "title": "Hôm qua, Hôm nay và Ngày mai",
                "steps": [
                  {
                    "title": "Hôm qua (Đã qua)",
                    "desc": "Ngày vừa mới trôi qua rồi."
                  },
                  {
                    "title": "Hôm nay (Hiện tại)",
                    "desc": "Ngày chúng mình đang học bài và vui chơi."
                  },
                  {
                    "title": "Ngày mai (Sắp tới)",
                    "desc": "Ngày tiếp theo sau ngày hôm nay."
                  }
                ],
                "rule": "Nếu hôm nay là Thứ Năm: Hôm qua là Thứ Tư, ngày mai là Thứ Sáu."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Nếu hôm nay là Thứ Sáu, thì ngày mai là ngày Thứ mấy?",
                "options": [
                  "Thứ Bảy",
                  "Thứ Năm",
                  "Chủ Nhật"
                ],
                "answer": "Thứ Bảy",
                "mascotHint": "Sau Thứ Sáu là ngày Thứ Bảy được nghỉ học cuối tuần!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ dòng thời gian:",
                "points": [
                  "Hôm qua, rồi đến Hôm nay, rồi đến Ngày mai",
                  "Một tuần có 7 ngày quay vòng tuần hoàn"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c9",
      "name": "Chủ đề 9: Làm quen với một số hình khối & Xếp hình",
      "description": "Khối lập phương, khối hộp chữ nhật và ghép hình không gian",
      "icon": "📦",
      "color": "#10b981",
      "totalLessons": 2,
      "lessons": [
        {
          "id": "g1-c9-l1",
          "title": "Bài 1: Khối lập phương xung quanh em",
          "type": "learn",
          "description": "Khám phá các đồ vật dạng khối lập phương",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Khối lập phương có mặt ở khắp mọi nơi xung quanh chúng mình! Cùng tìm kiếm nhé! 🎲"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khối Lập Phương",
                "title": "Nhận diện khối lập phương",
                "explanation": "Viên xúc xắc, khối đồ chơi Rubik, hộp quà vuông vắn... đều có dạng khối lập phương. Tất cả 6 mặt của nó đều là hình vuông bằng nhau chằn chặn!",
                "shape": "cube",
                "shapeLabel": "Khối lập phương có 6 mặt hình vuông phẳng",
                "rule": "Khối lập phương: Có 6 mặt đều là hình vuông bằng nhau."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Đồ vật nào sau đây có dạng khối lập phương?",
                "options": [
                  "Khối rubik đồ chơi",
                  "Lon nước ngọt",
                  "Quả bóng tennis"
                ],
                "answer": "Khối rubik đồ chơi",
                "mascotHint": "Khối rubik có các mặt đều là hình vuông bằng nhau!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Khối lập phương có 6 mặt hình vuông bằng nhau"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c9-l2",
          "title": "Bài 2: Khối hộp chữ nhật xung quanh em",
          "type": "learn",
          "description": "Khám phá các đồ vật dạng khối hộp chữ nhật",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Hộp sữa tươi, hộp bánh quy hay thùng các-tông đựng đồ có hình gì nhỉ? Đó là khối hộp chữ nhật! 🧃"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Khối Hộp Chữ Nhật",
                "title": "Nhận diện khối hộp chữ nhật",
                "explanation": "Khối hộp chữ nhật có 6 mặt phẳng và các mặt thường có dạng hình chữ nhật. Nó có chiều dài, chiều rộng và chiều cao!",
                "rule": "Khối hộp chữ nhật: Có các mặt phẳng hình chữ nhật, có thể xếp chồng lên nhau thành tháp."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Hộp sữa tươi mà bé uống hàng ngày có dạng khối gì?",
                "options": [
                  "Khối hộp chữ nhật",
                  "Hình tròn",
                  "Hình tam giác"
                ],
                "answer": "Khối hộp chữ nhật",
                "mascotHint": "Hộp sữa có các mặt phẳng hình chữ nhật!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Khối hộp chữ nhật có các mặt là hình chữ nhật"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "g1-c10",
      "name": "Chủ đề 10: Ôn tập cuối năm Lớp 1",
      "description": "Tổng kết toàn bộ kiến thức số học, hình học, đo lường và vinh danh Trạng Nguyên",
      "icon": "🏆",
      "color": "#ec4899",
      "totalLessons": 3,
      "lessons": [
        {
          "id": "g1-c10-l1",
          "title": "Bài 1: Ôn tập các số trong phạm vi 100",
          "type": "learn",
          "description": "Ôn tập hệ thống số đến 100",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "proud",
                "text": "Chúc mừng bé đã đến chặng đường tổng kết cuối năm học Lớp 1! Hãy cùng Cú Mèo ôn lại những kiến thức tuyệt vời nhé! 🎓"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Ôn Tập Số Học",
                "title": "Hệ thống số từ 0 đến 100",
                "points": [
                  "Đếm, đọc, viết các số từ 0 đến 100.",
                  "Cấu tạo số: Số 79 gồm 7 chục và 9 đơn vị.",
                  "So sánh số: 85 > 79; số liền trước của 50 là 49, số liền sau là 51."
                ],
                "rule": "Nắm chắc cấu tạo chục và đơn vị giúp tính toán chuẩn xác."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Số bé nhất có hai chữ số là số nào?",
                "options": [
                  10,
                  11,
                  0,
                  99
                ],
                "answer": 10,
                "mascotHint": "Số 10 là số đầu tiên có hai chữ số, nên là số bé nhất có hai chữ số!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Đúc kết:",
                "points": [
                  "Làm chủ toàn bộ số học Lớp 1"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c10-l2",
          "title": "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 100",
          "type": "learn",
          "description": "Ôn tập các kỹ năng tính nhẩm và đặt tính",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "happy",
                "text": "Cùng ôn lại các phép tính cộng trừ không nhớ trong phạm vi 100 để đạt điểm 10 tuyệt đối nhé! 💯"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Ôn Tập Phép Tính",
                "title": "Nguyên tắc đặt tính và tính nhẩm",
                "explanation": "Luôn tính từ phải sang trái (đơn vị trước, chục sau). Cộng trừ số tròn chục nhẩm theo hàng chục.",
                "rule": "42 + 25 = 67; 89 - 34 = 55."
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Tính: 45 + 32 = ?",
                "options": [
                  77,
                  78,
                  67,
                  87
                ],
                "answer": 77,
                "mascotHint": "Đơn vị: 5 + 2 = 7; Chục: 4 + 3 = 7, vậy kết quả là 77!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Ghi nhớ:",
                "points": [
                  "Cộng trừ thuần thục không nhớ trong phạm vi 100"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        },
        {
          "id": "g1-c10-l3",
          "title": "Bài 3: Lễ Vinh Danh Hoàn Thành Xuất Sắc Lớp 1!",
          "type": "learn",
          "description": "Vinh danh và chuẩn bị hành trang lên Lớp 2",
          "slides": [
            {
              "type": "story",
              "content": {
                "mascotMood": "excited",
                "text": "🎉 HOAN HÔ BÉ YÊU! Bé đã xuất sắc hoàn thành toàn bộ chương trình Toán Lớp 1 theo chuẩn bộ giáo dục! Bé xứng đáng nhận danh hiệu Trạng Nguyên Nhí! 👑🌟"
              }
            },
            {
              "type": "concept",
              "content": {
                "badge": "Hành Trang Lớp 2",
                "title": "Bé đã học được những gì ở Lớp 1?",
                "points": [
                  "Đếm, đọc, viết và so sánh thành thạo các số đến 100.",
                  "Tính nhẩm và đặt tính cộng trừ chuẩn xác.",
                  "Nhận biết hình vuông, hình tròn, tam giác, chữ nhật, khối lập phương.",
                  "Biết dùng thước kẻ đo cm và xem đồng hồ giờ đúng!"
                ],
                "rule": "Hành trang vững chắc để bước vào Toán Lớp 2 đầy thú vị đang chờ đón bé!"
              }
            },
            {
              "type": "quiz",
              "content": {
                "question": "Bé đã sẵn sàng bước lên Lớp 2 với sự tự tin và niềm vui toán học chưa?",
                "options": [
                  "Con đã sẵn sàng 100%!",
                  "Con rất tự tin!",
                  "Con hào hứng lắm!"
                ],
                "answer": "Con đã sẵn sàng 100%!",
                "mascotHint": "Tuyệt vời! Cú Mèo luôn đồng hành cùng bé!"
              }
            },
            {
              "type": "summary",
              "content": {
                "title": "Vinh danh Trạng Nguyên Nhí:",
                "points": [
                  "Chúc mừng bé hoàn thành xuất sắc chương trình Toán Lớp 1! 🌟🎉"
                ],
                "mascotMood": "proud"
              }
            }
          ]
        }
      ]
    }
  ]
};
