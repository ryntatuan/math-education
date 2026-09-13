import fs from 'fs'

// Helper to replace text safely in a file
function updateFile(filePath, replacer) {
  const content = fs.readFileSync(filePath, 'utf8')
  const updated = replacer(content)
  if (content === updated) {
    console.warn(`[WARNING] No change made in ${filePath}`)
  } else {
    fs.writeFileSync(filePath, updated, 'utf8')
    console.log(`[OK] Updated ${filePath}`)
  }
}

// 1. GRADE 1: g1-c8-l1 (Bài 1: Làm quen với mặt đồng hồ)
updateFile('client/src/data/grade1Data.js', (content) => {
  const target = `"id": "g1-c8-l1",`
  if (!content.includes(target)) return content

  // Insert dialogue slide before summary slide in g1-c8-l1
  const oldSummary = `            {
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
            }`

  const newSlides = `            {
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
${oldSummary}`

  return content.replace(oldSummary, newSlides)
})

// 2. GRADE 2: g2-c6-l4 (Ki-lô-gam) & g2-c6-l6 (Xem đồng hồ: Giờ và Phút)
updateFile('client/src/data/grade2Data.js', (content) => {
  let updated = content

  // 2a. g2-c6-l4: 1kg sắt vs 1kg bông dialogue
  const targetG2L4 = `"id": "g2-c6-l4",`
  if (updated.includes(targetG2L4)) {
    const oldG2L4Concept = `            {
              "type": "concept",
              "content": {
                "badge": "Đại Lượng & Đo Lường",
                "title": "Ki-lô-gam (kg) — Đơn vị đo khối lượng",
                "explanation": "Mỗi đơn vị đo có mục đích sử dụng riêng:",
                "points": [
                  "Độ dài: 1 m = 10 dm = 100 cm = 1000 mm. 1 km = 1000 m (đo quãng đường xa).",
                  "Khối lượng: Ki-lô-gam (kg) dùng để đo cân nặng người và đồ vật.",
                  "Dung tích: Lít (l) dùng để đo lượng chất lỏng như nước, sữa, dầu ăn."
                ],
                "rule": "Đổi đơn vị đo: 1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1000 m."
              }
            },`

    const newG2L4Concept = `            {
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
            },`
    updated = updated.replace(oldG2L4Concept, newG2L4Concept)
  }

  // 2b. g2-c6-l6: Đồng hồ giờ và phút (1-1 visual clocks & 8h30 rưỡi dialogue)
  const oldG2L6Concept = `            {
              "type": "concept",
              "content": {
                "badge": "Mẹo Nhớ Cùng Bé",
                "title": "Xem đồng hồ: Giờ và Phút",
                "explanation": "Trên đồng hồ kim: Kim ngắn chỉ GIỜ, kim dài chỉ PHÚT. Khi kim dài chỉ số 12 là giờ đúng, chỉ số 3 là 15 phút, chỉ số 6 là 30 phút (giờ rưỡi)!",
                "clock": {
                  "hour": 8,
                  "minute": 30,
                  "showLabels": true,
                  "timeText": "8 giờ 30 phút (8 giờ rưỡi)"
                },
                "rule": "Kim dài ở số 12: giờ đúng. Kim dài ở số 3: hơn 15 phút. Kim dài ở số 6: 30 phút (giờ rưỡi)."
              }
            },`

  const newG2L6Concept = `            {
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
            },`

  if (updated.includes(oldG2L6Concept)) {
    updated = updated.replace(oldG2L6Concept, newG2L6Concept)
  }

  return updated
})

// 3. GRADE 3: g3-c3-l6 (Làm quen với Phép chia có dư)
updateFile('client/src/data/grade3Data.js', (content) => {
  const oldG3L6Concept = `            {
              "type": "concept",
              "content": {
                "badge": "Phép Chia Có Dư",
                "title": "Làm quen với Phép chia có dư",
                "explanation": "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
                "rule": "QUY TẮC BẮT BUỘC: Số dư luôn luôn BÉ HƠN số chia! (Số dư < Số chia).",
                "example": {
                  "text": "Tính: 17 : 3 = ? 👉 17 : 3 = 5 (dư 2). Vì 3 × 5 = 15; 17 - 15 = 2. Số dư là 2 bé hơn số chia là 3!"
                }
              }
            },`

  const newG3L6Concept = `            {
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
            },`

  return content.replace(oldG3L6Concept, newG3L6Concept)
})

// 4. GRADE 4: g4-c4-l2 (Bài 31: Phân số bằng nhau)
updateFile('client/src/data/grade4Data.js', (content) => {
  const oldG4L2Visual = `            {
              "type": "visual",
              "content": {
                "text": "1. Rút gọn phân số: Chia cả tử và mẫu cho ước chung để được phân số tối giản (ví dụ: 6/8 = (6:2)/(8:2) = 3/4). 2. Quy đồng mẫu số: Tìm mẫu số chung rồi nhân để đưa về cùng mẫu số (ví dụ: 1/2 và 1/3 có MSC = 6, nên là 3/6 và 2/6)."
              }
            },`

  const newG4L2Visual = `            {
              "type": "concept",
              "content": {
                "badge": "Khái Niệm Phân Số Bằng Nhau",
                "title": "Tính chất cơ bản của phân số",
                "explanation": "Nếu nhân hoặc chia cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.",
                "rule": "1/2 cái bánh pizza cũng chính bằng 2/4 chiếc bánh pizza đó!",
                "points": [
                  "Rút gọn phân số: Chia cả tử và mẫu cho ước chung lớn hơn 1 (ví dụ: 6/8 = (6:2)/(8:2) = 3/4).",
                  "Quy đồng mẫu số: Nhân tử và mẫu với thừa số phụ để đưa về cùng một mẫu số chung."
                ]
              }
            },
            {
              "type": "dialogue",
              "content": {
                "badge": "Giao Lưu Lớp Học",
                "title": "Tranh luận chia bánh: 1/2 và 2/4",
                "dialogueList": [
                  {
                    "character": "mai",
                    "name": "Bạn Mai 👧",
                    "text": "Tớ có 1/2 cái bánh pizza, bạn Nam có 2/4 cái bánh cùng loại. Nam bảo Nam có nhiều bánh hơn tớ vì 2/4 có số 2 và 4 to hơn!"
                  },
                  {
                    "character": "robot",
                    "name": "Bạn Rô-bốt 🤖",
                    "text": "Đúng rồi! Số 2 lớn hơn 1, số 4 lớn hơn 2 nên 2/4 cái bánh chắc chắn nhiều hơn 1/2 cái bánh chứ!"
                  }
                ],
                "question": "Bạn Rô-bốt nói đúng hay sai?",
                "options": [
                  "Đúng rồi 👍",
                  "Sai rồi 👎"
                ],
                "correctAnswer": "Sai rồi 👎",
                "explanation": "Bạn Rô-bốt nhầm rồi! Khi một chiếc bánh chia 2 phần lấy 1 phần (1/2), thì diện tích bánh đúng bằng khi chia 4 phần lấy 2 phần (2/4). Vì vậy 1/2 = 2/4, hai bạn có phần bánh bằng nhau!"
              }
            },`

  return content.replace(oldG4L2Visual, newG4L2Visual)
})

// 5. GRADE 5: g5-c2-l2 (Bài 11: So sánh số thập phân)
updateFile('client/src/data/grade5Data.js', (content) => {
  const oldG5L2Visual = `            {
              "type": "visual",
              "content": {
                "text": "Quy tắc so sánh hai số thập phân: 1. So sánh phần nguyên: Số nào có phần nguyên lớn hơn thì lớn hơn (ví dụ: 12,5 > 9,89). 2. Nếu phần nguyên bằng nhau: So sánh lần lượt từng hàng ở phần thập phân từ trái sang phải: hàng phần mười, phần trăm, phần nghìn..."
              }
            },`

  const newG5L2Visual = `            {
              "type": "concept",
              "content": {
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
            },`

  return content.replace(oldG5L2Visual, newG5L2Visual)
})
console.log('All upgrades executed.')
