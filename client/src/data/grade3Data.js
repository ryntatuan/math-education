// Data for Grade 3 (Lớp 3) — DỰNG LẠI THEO ĐÚNG SGK "Kết nối tri thức với cuộc sống"
//
// ══════════════════════════════════════════════════════════════════════════════
// VÌ SAO DỰNG LẠI — lớp này lệch nặng nhất trong cả 5 lớp (đo 2026-09-21)
//
//   • THIẾU HẲN bảng nhân 3, bảng chia 3, bảng nhân 4, bảng chia 4.
//     SGK Toán 3 dạy bốn bảng này ở **chủ đề 1** (Bài 5, 6) cùng với
//     "Ôn tập bảng nhân 2; 5, bảng chia 2; 5" (Bài 4).
//     Bản cũ đã **đẩy bốn bảng đó xuống lớp 2** — nơi SGK Toán 2 KHÔNG có chúng.
//
//   • DẠY 12 BÀI **PHÂN SỐ** mà SGK Toán 3 KHÔNG HỀ CÓ. Kiểm chứng: tìm `phân số`
//     trong cả 2 file SGK lớp 3 → **0 kết quả** (chỉ có "phân loại"). Phân số là
//     **Toán 4 — chương bốn**. Cả chủ đề `g3-c5` cũ là nội dung không thuộc lớp này.
//
//   • DẠY "Thế kỷ và Năm nhuận" — SGK Toán 3 không có; thế kỉ thuộc **Toán 4**
//     (bản mới đã có ở `g4-c1`).
//
//   • THIẾU HẲN chủ đề 3 "Làm quen với hình phẳng, hình khối" (Bài 16–22): điểm ở
//     giữa và trung điểm, hình tròn tâm bán kính đường kính, góc, các hình tam
//     giác/tứ giác/chữ nhật/vuông, khối lập phương và khối hộp chữ nhật.
//     Kiểm chứng: tìm `trung điểm`, `bán kính`, `đường kính`, `khối lập phương`
//     trong dữ liệu cũ → **0 kết quả**.
//
//   • THIẾU HẲN chủ đề 7 "Ôn tập học kì 1".
//
//   • 10 chương → SGK có **16 chủ đề**.
// ══════════════════════════════════════════════════════════════════════════════

export const grade3Data = {
  id: 3,
  name: "Lớp 3",
  description:
    "Số đến 100 000, bảng nhân chia 3–9, bốn phép tính, hình học, chu vi & diện tích, đo lường và thống kê",
  icon: "🌸",
  color: "#FFE66D",
  ageRange: "8-9 tuổi",
  chapters: [
    // ═══ CHỦ ĐỀ 1 — SGK Bài 1-8 ═══
    {
      id: "g3-c1",
      name: "Chủ đề 1: Ôn tập và bổ sung",
      description:
        "Ôn tập số đến 1 000, cộng trừ trong phạm vi 1 000, tìm thành phần chưa biết, ôn tập bảng nhân chia 2 và 5, bảng nhân chia 3 và 4",
      icon: "🔄",
      color: "#4facfe",
      totalLessons: 12,
      lessons: [
        {
          id: "g3-c1-l1",
          title: "Bài 1: Ôn tập các số đến 1 000",
          type: "learn",
          description: "Đọc, viết, so sánh số có ba chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Chào mừng bé lên Lớp 3! Mình cùng ôn lại các số đến 1 000 nhé 🚀",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Số có ba chữ số",
                explanation:
                  "Số có ba chữ số gồm HÀNG TRĂM, HÀNG CHỤC và HÀNG ĐƠN VỊ.",
                rule: "Số 475 gồm 4 trăm, 7 chục và 5 đơn vị. Đọc là: bốn trăm bảy mươi lăm.",
                points: [
                  "475 = 400 + 70 + 5.",
                  "Số liền sau của 999 là 1 000.",
                  "So sánh: so hàng trăm trước, rồi hàng chục, rồi hàng đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "475 = 400 + 70 + 5\n999  —  1 000",
                placeValue: {
                  headers: ["Trăm", "Chục", "Đơn vị"],
                  digits: [4, 7, 5],
                  label: "475 = 400 + 70 + 5",
                },
                numberLine: {
                  from: 999,
                  to: 1000,
                  step: 1,
                  marks: [999, 1000],
                  label: "999 rồi đến 1000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 475 gồm mấy trăm, mấy chục, mấy đơn vị?",
                options: [
                  "4 trăm, 7 chục, 5 đơn vị",
                  "5 trăm, 7 chục, 4 đơn vị",
                  "4 trăm, 5 chục, 7 đơn vị",
                  "47 chục, 5 đơn vị",
                ],
                answer: "4 trăm, 7 chục, 5 đơn vị",
                mascotHint:
                  "Đọc từ trái sang: 4 là trăm, 7 là chục, 5 là đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 583 và 538, số nào lớn hơn?",
                options: [583, 538, "Hai số bằng nhau"],
                answer: 583,
                mascotHint:
                  "Hàng trăm bằng nhau, so hàng chục: 8 > 3 nên 583 > 538.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số có ba chữ số gồm trăm, chục, đơn vị.",
                  "475 = 400 + 70 + 5; 583 > 538.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l2",
          title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1 000",
          type: "learn",
          description: "Đặt tính và tính cộng trừ có nhớ trong phạm vi 1 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé còn nhớ khi nào phải nhớ 1 và khi nào phải mượn 1 không? 🔢",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Cộng trừ trong phạm vi 1 000",
                explanation:
                  "Cộng: nếu một hàng cộng lại từ 10 trở lên thì NHỚ 1 sang hàng bên trái. Trừ: nếu không đủ để trừ thì MƯỢN 1 từ hàng bên trái.",
                rule: "356 + 127 = 483 (6+7=13 viết 3 nhớ 1). 534 − 268 = 266 (mượn hai lần).",
                points: [
                  "Luôn đặt tính thẳng cột và tính từ phải sang trái.",
                  "Thử lại bằng phép tính ngược.",
                  "Kết quả phải nhỏ hơn 1 000.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  356          534\n+ 127        − 268\n  483          266",
                operation: { left: 356, sign: "+", right: 127, result: 483 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["356 + 127", "483 (6+7=13 viết 3 nhớ 1)"],
                    ["534 − 268", "266 (mượn hai lần)"],
                  ],
                  label: "Ôn tập cộng trừ trong phạm vi 1 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "356 + 127 bằng bao nhiêu?",
                options: [473, 483, 493, 423],
                answer: 483,
                mascotHint: "6+7=13 viết 3 nhớ 1; 5+2+1=8; 3+1=4. Kết quả 483.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "534 − 268 bằng bao nhiêu?",
                options: [266, 276, 334, 256],
                answer: 266,
                mascotHint: "Mượn hai lần: 14−8=6; 12−6=6; 4−2=2. Kết quả 266.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng có nhớ: nhớ 1. Trừ có nhớ: mượn 1.",
                  "356 + 127 = 483; 534 − 268 = 266.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l3",
          title: "Bài 3: Tìm thành phần trong phép cộng",
          type: "learn",
          description: "Tìm số hạng chưa biết trong một tổng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có một số bị che mất: ? + 145 = 320. Bé tìm giúp Rô-bốt nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Tìm số hạng chưa biết",
                explanation:
                  "Muốn tìm một số hạng, ta lấy TỔNG trừ đi số hạng đã biết.",
                rule: "? + 145 = 320 → ? = 320 − 145 = 175.",
                points: [
                  "Số hạng + số hạng = tổng.",
                  "Muốn tìm số hạng chưa biết: lấy tổng trừ số hạng đã biết.",
                  "Thử lại: 175 + 145 = 320 ✓",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "? + 145 = 320\n? = 320 − 145 = 175",
                operation: { left: 175, sign: "+", right: 145, result: 320 },
                numberLine: {
                  from: 145,
                  to: 320,
                  step: 5,
                  marks: [145, 175, 320],
                  hops: [{ from: 145, to: 320, label: "+175" }],
                  label: "? + 145 = 320 ⇒ ? = 320 − 145 = 175",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: ? + 145 = 320",
                options: [165, 175, 185, 465],
                answer: 175,
                mascotHint: "Lấy tổng trừ số hạng đã biết: 320 − 145 = 175.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số hạng chưa biết = tổng − số hạng đã biết.",
                  "? + 145 = 320 nên ? = 175.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l4",
          title: "Bài 4: Tìm thành phần trong phép trừ",
          type: "learn",
          description: "Tìm số bị trừ và số trừ chưa biết",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Lần này Rô-bốt che số ở chỗ khác: 500 − ? = 260. Bé tìm nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Tìm số bị trừ và số trừ",
                explanation:
                  "Muốn tìm SỐ BỊ TRỪ, ta lấy HIỆU cộng với SỐ TRỪ. Muốn tìm SỐ TRỪ, ta lấy SỐ BỊ TRỪ trừ đi HIỆU.",
                rule: "500 − ? = 260 → ? = 500 − 260 = 240. Và ? − 130 = 70 → ? = 70 + 130 = 200.",
                points: [
                  "Số bị trừ = hiệu + số trừ.",
                  "Số trừ = số bị trừ − hiệu.",
                  "Đây là hai công thức rất hay dùng, bé nhớ kĩ nhé.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "500 − ? = 260  →  ? = 500 − 260 = 240\n? − 130 = 70   →  ? = 70 + 130 = 200",
                operation: { left: 500, sign: "−", right: 260, result: 240 },
                table: {
                  headers: ["Tìm gì", "Cách làm"],
                  rows: [
                    ["500 − ? = 260", "? = 500 − 260 = 240"],
                    ["? − 130 = 70", "? = 70 + 130 = 200"],
                  ],
                  label: "Tìm thành phần trong phép trừ",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: 500 − ? = 260",
                options: [240, 250, 260, 760],
                answer: 240,
                mascotHint: "Số trừ = số bị trừ − hiệu = 500 − 260 = 240.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: ? − 130 = 70",
                options: [60, 130, 200, 2000],
                answer: 200,
                mascotHint: "Số bị trừ = hiệu + số trừ = 70 + 130 = 200.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số bị trừ = hiệu + số trừ.",
                  "Số trừ = số bị trừ − hiệu.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c1-l5",
          title: "Bài 5: Ôn tập bảng nhân 2 và bảng nhân 5",
          type: "learn",
          description: "Ôn lại hai bảng nhân đã học ở lớp 2",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Ở lớp 2 bé đã học bảng nhân 2 và bảng nhân 5. Mình ôn lại nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Bảng nhân 2 và bảng nhân 5",
                explanation:
                  "Bảng nhân 2: đếm thêm 2. Bảng nhân 5: đếm thêm 5. Kết quả bảng nhân 5 luôn tận cùng là 0 hoặc 5.",
                rule: "2 × 7 = 14 · 2 × 9 = 18 · 5 × 6 = 30 · 5 × 8 = 40.",
                points: [
                  "2 × 10 = 20; 5 × 10 = 50.",
                  "Đổi chỗ hai thừa số thì tích không đổi: 2 × 5 = 5 × 2 = 10.",
                  "Học thuộc hai bảng này giúp bé tính nhanh hơn nhiều.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 × 7 = 14    5 × 6 = 30\n2 × 9 = 18    5 × 8 = 40",
                numberLine: {
                  from: 2,
                  to: 18,
                  step: 2,
                  marks: [2, 4, 6, 8, 10, 12, 14, 16, 18],
                  label: "Đếm thêm 2 rồi đếm thêm 5",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["2 × 7", "14"],
                    ["2 × 9", "18"],
                    ["5 × 6", "30"],
                    ["5 × 8", "40"],
                  ],
                  label: "Ôn tập bảng nhân 2 và bảng nhân 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 × 7 bằng bao nhiêu?",
                options: [12, 14, 16, 9],
                answer: 14,
                mascotHint: "Đếm thêm 2 bảy lần: 14.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "5 × 8 bằng bao nhiêu?",
                options: [35, 40, 45, 13],
                answer: 40,
                mascotHint: "Đếm thêm 5 tám lần: 40.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "2 × 7 = 14; 5 × 8 = 40.",
                  "Bảng nhân 5 tận cùng là 0 hoặc 5.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l6",
          title: "Bài 6: Ôn tập bảng chia 2 và bảng chia 5",
          type: "learn",
          description: "Ôn lại hai bảng chia đã học ở lớp 2",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Từ bảng nhân, bé suy ra bảng chia ngay được. Cùng ôn nhé! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Bảng chia 2 và bảng chia 5",
                explanation:
                  "Lấy tích chia cho một thừa số thì được thừa số kia.",
                rule: "2 × 7 = 14 → 14 : 2 = 7. 5 × 8 = 40 → 40 : 5 = 8.",
                points: [
                  "18 : 2 = 9; 20 : 2 = 10.",
                  "45 : 5 = 9; 50 : 5 = 10.",
                  "Học bảng nhân là có luôn bảng chia.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "14 : 2 = 7\n40 : 5 = 8",
                operation: { left: 40, sign: ":", right: 5, result: 8 },
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["14 : 2", "7"],
                    ["40 : 5", "8"],
                  ],
                  label: "Ôn tập bảng chia 2 và bảng chia 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "18 : 2 bằng bao nhiêu?",
                options: [6, 8, 9, 16],
                answer: 9,
                mascotHint: "Vì 2 × 9 = 18 nên 18 : 2 = 9.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "45 : 5 bằng bao nhiêu?",
                options: [7, 8, 9, 40],
                answer: 9,
                mascotHint: "Vì 5 × 9 = 45 nên 45 : 5 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "18 : 2 = 9; 45 : 5 = 9.",
                  "Từ phép nhân suy ra ngay phép chia.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l7",
          title: "Bài 7: Bảng nhân 3",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Mỗi chiếc xe đạp có 3 bánh. Bé đếm bánh của 1, 2, 3 chiếc xe nhé! 🚲",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 3",
                title: "Bảng nhân 3",
                explanation:
                  "Bảng nhân 3 lập bằng cách đếm thêm 3 mỗi bước: từ 3, thêm 3 được 6, thêm 3 được 9...",
                rule: "3 × 1 = 3 · 3 × 2 = 6 · 3 × 3 = 9 · 3 × 4 = 12 · 3 × 5 = 15 · 3 × 6 = 18 · 3 × 7 = 21 · 3 × 8 = 24 · 3 × 9 = 27 · 3 × 10 = 30.",
                points: [
                  "Mỗi kết quả hơn kém nhau đúng 3 đơn vị.",
                  "Tổng các chữ số của kết quả chia hết cho 3: 12 → 1+2 = 3.",
                  "3 × 10 = 30 — kết quả cuối của bảng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 · 6 · 9 · 12 · 15 · 18 · 21 · 24 · 27 · 30",
                numberLine: {
                  from: 3,
                  to: 30,
                  step: 3,
                  marks: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                  label: "Đếm thêm 3: 3 · 6 · 9 · … · 30",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["3 × 1", "3"],
                    ["3 × 4", "12"],
                    ["3 × 7", "21"],
                    ["3 × 10", "30"],
                  ],
                  label: "Bảng nhân 3",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 × 4 bằng bao nhiêu?",
                options: [9, 12, 15, 7],
                answer: 12,
                mascotHint: "Đếm thêm 3 bốn lần: 3, 6, 9, 12.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 × 9 bằng bao nhiêu?",
                options: [24, 27, 30, 12],
                answer: 27,
                mascotHint: "3 × 10 = 30, bớt 3 được 27.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 3: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30.",
                  "3 × 4 = 12; 3 × 9 = 27.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l8",
          title: "Bài 8: Bảng chia 3",
          type: "learn",
          description: "Lập và học thuộc bảng chia 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 12 cái kẹo chia đều cho 3 bạn. Mỗi bạn được mấy cái? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 3",
                title: "Bảng chia 3",
                explanation:
                  "Lấy tích trong bảng nhân 3 chia cho 3, ta được thừa số còn lại.",
                rule: "3 : 3 = 1 · 6 : 3 = 2 · 9 : 3 = 3 · 12 : 3 = 4 · 15 : 3 = 5 · 18 : 3 = 6 · 21 : 3 = 7 · 24 : 3 = 8 · 27 : 3 = 9 · 30 : 3 = 10.",
                points: [
                  "3 × 4 = 12 nên 12 : 3 = 4.",
                  "3 × 9 = 27 nên 27 : 3 = 9.",
                  "Số bị chia trong bảng chia 3 là các số trong bảng nhân 3.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bảng nhân 3:  3 × 4 = 12\nBảng chia 3:  12 : 3 = 4",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["3 : 3", "1"],
                    ["6 : 3", "2"],
                    ["9 : 3", "3"],
                    ["12 : 3", "4"],
                    ["15 : 3", "5"],
                    ["18 : 3", "6"],
                    ["21 : 3", "7"],
                    ["24 : 3", "8"],
                    ["27 : 3", "9"],
                    ["30 : 3", "10"],
                  ],
                  label: "Bảng chia 3",
                },
                operation: { left: 12, sign: ":", right: 3, result: 4 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "12 : 3 bằng bao nhiêu?",
                options: [3, 4, 5, 9],
                answer: 4,
                mascotHint: "Vì 3 × 4 = 12 nên 12 : 3 = 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 18 cái kẹo chia đều cho 3 bạn. Mỗi bạn được mấy cái kẹo?",
                options: [5, 6, 7, 15],
                answer: 6,
                mascotHint: "18 : 3 = 6 cái kẹo.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 3: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "12 : 3 = 4; 18 : 3 = 6.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l9",
          title: "Bài 9: Bảng nhân 4",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 4",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Một chiếc ô tô có 4 bánh. Bé đếm bánh của 1, 2, 3 chiếc ô tô nhé! 🚗",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 4",
                title: "Bảng nhân 4",
                explanation:
                  "Bảng nhân 4 lập bằng cách đếm thêm 4 mỗi bước: từ 4, thêm 4 được 8, thêm 4 được 12...",
                rule: "4 × 1 = 4 · 4 × 2 = 8 · 4 × 3 = 12 · 4 × 4 = 16 · 4 × 5 = 20 · 4 × 6 = 24 · 4 × 7 = 28 · 4 × 8 = 32 · 4 × 9 = 36 · 4 × 10 = 40.",
                points: [
                  "Mỗi kết quả hơn kém nhau đúng 4 đơn vị.",
                  "Kết quả bảng nhân 4 đều là số chẵn.",
                  "4 × 5 = 20; 4 × 10 = 40.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40",
                numberLine: {
                  from: 4,
                  to: 40,
                  step: 4,
                  marks: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
                  label: "Đếm thêm 4: 4 · 8 · 12 · … · 40",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["4 × 1", "4"],
                    ["4 × 5", "20"],
                    ["4 × 8", "32"],
                    ["4 × 10", "40"],
                  ],
                  label: "Bảng nhân 4",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 × 6 bằng bao nhiêu?",
                options: [20, 24, 28, 10],
                answer: 24,
                mascotHint: "4 × 5 = 20, thêm 4 được 24.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 × 8 bằng bao nhiêu?",
                options: [28, 32, 36, 12],
                answer: 32,
                mascotHint: "4 × 7 = 28, thêm 4 được 32.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 4: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.",
                  "4 × 6 = 24; 4 × 8 = 32.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l10",
          title: "Bài 10: Bảng chia 4",
          type: "learn",
          description: "Lập và học thuộc bảng chia 4",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 20 quả bóng chia đều vào 4 rổ. Mỗi rổ có mấy quả nhỉ? ⚽",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 4",
                title: "Bảng chia 4",
                explanation:
                  "Lấy tích trong bảng nhân 4 chia cho 4, ta được thừa số còn lại.",
                rule: "4 : 4 = 1 · 8 : 4 = 2 · 12 : 4 = 3 · 16 : 4 = 4 · 20 : 4 = 5 · 24 : 4 = 6 · 28 : 4 = 7 · 32 : 4 = 8 · 36 : 4 = 9 · 40 : 4 = 10.",
                points: [
                  "4 × 6 = 24 nên 24 : 4 = 6.",
                  "4 × 7 = 28 nên 28 : 4 = 7.",
                  "Học bảng nhân 4 là có luôn bảng chia 4.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bảng nhân 4:  4 × 6 = 24\nBảng chia 4:  24 : 4 = 6",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["4 : 4", "1"],
                    ["8 : 4", "2"],
                    ["12 : 4", "3"],
                    ["16 : 4", "4"],
                    ["20 : 4", "5"],
                    ["24 : 4", "6"],
                    ["28 : 4", "7"],
                    ["32 : 4", "8"],
                    ["36 : 4", "9"],
                    ["40 : 4", "10"],
                  ],
                  label: "Bảng chia 4",
                },
                operation: { left: 24, sign: ":", right: 4, result: 6 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "24 : 4 bằng bao nhiêu?",
                options: [5, 6, 7, 20],
                answer: 6,
                mascotHint: "Vì 4 × 6 = 24 nên 24 : 4 = 6.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 32 quả cam chia đều vào 4 đĩa. Mỗi đĩa có mấy quả cam?",
                options: [7, 8, 9, 28],
                answer: 8,
                mascotHint: "32 : 4 = 8 quả cam.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 4: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "24 : 4 = 6; 32 : 4 = 8.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c1-l11",
          title: "Bài 11: Ôn tập hình học và đo lường",
          type: "learn",
          description: "Ôn lại hình phẳng, hình khối và các đơn vị đo đã học",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đã học bao nhiêu hình và bao nhiêu đơn vị đo rồi nhỉ? 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Hình học và đo lường",
                explanation:
                  "Bé đã học các hình phẳng, hai loại khối và các đơn vị đo độ dài, khối lượng, dung tích.",
                rule: "1 dm = 10 cm; 1 m = 100 cm; 1 km = 1 000 m. Túi gạo nặng 5 kg; chai nước chứa 2 l.",
                points: [
                  "Hình vuông: 4 cạnh bằng nhau; hình tam giác: 3 cạnh.",
                  "Khối lập phương: 6 mặt vuông bằng nhau.",
                  "Chọn đơn vị đo phù hợp với vật: cm, dm, m, km, kg, l.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 m = 100 cm\n1 km = 1 000 m\n▢ ⭕ 🔺 ▭",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 dm", "10 cm"],
                    ["1 m", "100 cm"],
                    ["1 km", "1 000 m"],
                  ],
                  label:
                    "Ôn tập đo độ dài — túi gạo nặng 5 kg, chai nước chứa 2 l",
                },
                planeShape: {
                  kind: "square",
                  formula: "▢ hình vuông · 🔺 hình tam giác · ▭ hình chữ nhật",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 m bằng bao nhiêu xăng-ti-mét?",
                options: ["10 cm", "100 cm", "1 000 cm", "50 cm"],
                answer: "100 cm",
                mascotHint: "1 m = 100 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đo quãng đường từ nhà đến trường thì dùng đơn vị nào?",
                options: [
                  "Ki-lô-mét (km)",
                  "Xăng-ti-mét (cm)",
                  "Ki-lô-gam (kg)",
                  "Lít (l)",
                ],
                answer: "Ki-lô-mét (km)",
                mascotHint: "Quãng đường dài nên dùng ki-lô-mét.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 dm = 10 cm; 1 m = 100 cm; 1 km = 1 000 m.",
                  "Chọn đơn vị đo phù hợp với vật.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c1-l12",
          title: "Bài 12: Luyện tập chung chủ đề 1",
          type: "learn",
          description: "Ôn tập tổng hợp chủ đề 1",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã có đủ bốn bảng nhân chia rồi! Mình tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 1",
                explanation:
                  "Bé đã ôn số đến 1 000, cộng trừ trong phạm vi 1 000, tìm thành phần chưa biết và học thêm bảng nhân chia 3 và 4.",
                points: [
                  "Bốn bảng đã có: nhân 2, nhân 3, nhân 4, nhân 5 và bốn bảng chia tương ứng.",
                  "Số hạng chưa biết = tổng − số hạng đã biết.",
                  "Số trừ = số bị trừ − hiệu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 × 4 = 12    12 : 3 = 4\n4 × 6 = 24    24 : 4 = 6",
                operation: { left: 3, sign: "×", right: 4, result: 12 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["3 × 4", "12"],
                    ["12 : 3", "4"],
                    ["4 × 6", "24"],
                    ["24 : 4", "6"],
                  ],
                  label: "Luyện tập chung chủ đề 1",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 × 7 bằng bao nhiêu?",
                options: [18, 21, 24, 10],
                answer: 21,
                mascotHint: "3 × 6 = 18, thêm 3 được 21.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "36 : 4 bằng bao nhiêu?",
                options: [8, 9, 10, 32],
                answer: 9,
                mascotHint: "Vì 4 × 9 = 36 nên 36 : 4 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 1.",
                  "3 × 7 = 21; 36 : 4 = 9.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 2 — SGK Bài 9-15 ═══
    {
      id: "g3-c2",
      name: "Chủ đề 2: Bảng nhân, bảng chia",
      description:
        "Bảng nhân và bảng chia 6, 7, 8, 9; tìm thành phần trong phép nhân, phép chia; một phần mấy",
      icon: "✖️",
      color: "#f6c23e",
      totalLessons: 11,
      lessons: [
        {
          id: "g3-c2-l1",
          title: "Bài 1: Bảng nhân 6",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 6",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Mỗi hộp có 6 chiếc bút chì màu. Bé đếm bút trong 1, 2, 3 hộp nhé! 🖍️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 6",
                title: "Bảng nhân 6",
                explanation: "Bảng nhân 6 lập bằng cách đếm thêm 6 mỗi bước.",
                rule: "6 × 1 = 6 · 6 × 2 = 12 · 6 × 3 = 18 · 6 × 4 = 24 · 6 × 5 = 30 · 6 × 6 = 36 · 6 × 7 = 42 · 6 × 8 = 48 · 6 × 9 = 54 · 6 × 10 = 60.",
                points: [
                  "Mỗi kết quả hơn kém nhau đúng 6 đơn vị.",
                  "Kết quả bảng nhân 6 đều là số chẵn.",
                  "6 × 5 = 30; 6 × 7 = 42.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "6 · 12 · 18 · 24 · 30 · 36 · 42 · 48 · 54 · 60",
                numberLine: {
                  from: 6,
                  to: 60,
                  step: 6,
                  marks: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
                  label: "Đếm thêm 6: 6 · 12 · 18 · … · 60",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["6 × 1", "6"],
                    ["6 × 5", "30"],
                    ["6 × 8", "48"],
                    ["6 × 10", "60"],
                  ],
                  label: "Bảng nhân 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 × 7 bằng bao nhiêu?",
                options: [36, 42, 48, 13],
                answer: 42,
                mascotHint: "6 × 6 = 36, thêm 6 được 42.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 × 9 bằng bao nhiêu?",
                options: [48, 54, 60, 15],
                answer: 54,
                mascotHint: "6 × 10 = 60, bớt 6 được 54.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 6: 6, 12, 18, 24, 30, 36, 42, 48, 54, 60.",
                  "6 × 7 = 42; 6 × 9 = 54.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l2",
          title: "Bài 2: Bảng chia 6",
          type: "learn",
          description: "Lập và học thuộc bảng chia 6",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 42 chiếc bút chia đều vào 6 hộp. Mỗi hộp có mấy chiếc? 🖍️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 6",
                title: "Bảng chia 6",
                explanation:
                  "Lấy tích trong bảng nhân 6 chia cho 6, ta được thừa số còn lại.",
                rule: "6 : 6 = 1 · 12 : 6 = 2 · 18 : 6 = 3 · 24 : 6 = 4 · 30 : 6 = 5 · 36 : 6 = 6 · 42 : 6 = 7 · 48 : 6 = 8 · 54 : 6 = 9 · 60 : 6 = 10.",
                points: [
                  "6 × 7 = 42 nên 42 : 6 = 7.",
                  "6 × 9 = 54 nên 54 : 6 = 9.",
                  "Học bảng nhân 6 là có luôn bảng chia 6.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bảng nhân 6:  6 × 7 = 42\nBảng chia 6:  42 : 6 = 7",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["6 : 6", "1"],
                    ["12 : 6", "2"],
                    ["18 : 6", "3"],
                    ["24 : 6", "4"],
                    ["30 : 6", "5"],
                    ["36 : 6", "6"],
                    ["42 : 6", "7"],
                    ["48 : 6", "8"],
                    ["54 : 6", "9"],
                    ["60 : 6", "10"],
                  ],
                  label: "Bảng chia 6",
                },
                operation: { left: 42, sign: ":", right: 6, result: 7 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "42 : 6 bằng bao nhiêu?",
                options: [6, 7, 8, 36],
                answer: 7,
                mascotHint: "Vì 6 × 7 = 42 nên 42 : 6 = 7.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "54 : 6 bằng bao nhiêu?",
                options: [8, 9, 10, 48],
                answer: 9,
                mascotHint: "Vì 6 × 9 = 54 nên 54 : 6 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 6: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "42 : 6 = 7; 54 : 6 = 9.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l3",
          title: "Bài 3: Bảng nhân 7",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 7",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Một tuần có 7 ngày. Vậy 4 tuần có bao nhiêu ngày nhỉ? 📅",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 7",
                title: "Bảng nhân 7",
                explanation: "Bảng nhân 7 lập bằng cách đếm thêm 7 mỗi bước.",
                rule: "7 × 1 = 7 · 7 × 2 = 14 · 7 × 3 = 21 · 7 × 4 = 28 · 7 × 5 = 35 · 7 × 6 = 42 · 7 × 7 = 49 · 7 × 8 = 56 · 7 × 9 = 63 · 7 × 10 = 70.",
                points: [
                  "Mỗi kết quả hơn kém nhau đúng 7 đơn vị.",
                  "7 × 4 = 28 — bốn tuần có 28 ngày.",
                  "7 × 7 = 49.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "7 · 14 · 21 · 28 · 35 · 42 · 49 · 56 · 63 · 70",
                numberLine: {
                  from: 7,
                  to: 70,
                  step: 7,
                  marks: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70],
                  label: "Đếm thêm 7: 7 · 14 · 21 · … · 70",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["7 × 1", "7"],
                    ["7 × 5", "35"],
                    ["7 × 8", "56"],
                    ["7 × 10", "70"],
                  ],
                  label: "Bảng nhân 7",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "7 × 4 bằng bao nhiêu?",
                options: [21, 28, 35, 11],
                answer: 28,
                mascotHint: "7 × 3 = 21, thêm 7 được 28.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 tuần lễ có bao nhiêu ngày?",
                options: ["21 ngày", "28 ngày", "35 ngày", "11 ngày"],
                answer: "28 ngày",
                mascotHint: "7 × 4 = 28 ngày.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 7: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.",
                  "7 × 4 = 28.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l4",
          title: "Bài 4: Bảng chia 7",
          type: "learn",
          description: "Lập và học thuộc bảng chia 7",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 35 quả cam chia đều vào 7 đĩa. Mỗi đĩa có mấy quả? 🍊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 7",
                title: "Bảng chia 7",
                explanation: "Lấy tích trong bảng nhân 7 chia cho 7.",
                rule: "7 : 7 = 1 · 14 : 7 = 2 · 21 : 7 = 3 · 28 : 7 = 4 · 35 : 7 = 5 · 42 : 7 = 6 · 49 : 7 = 7 · 56 : 7 = 8 · 63 : 7 = 9 · 70 : 7 = 10.",
                points: [
                  "7 × 5 = 35 nên 35 : 7 = 5.",
                  "7 × 8 = 56 nên 56 : 7 = 8.",
                  "Thử lại bằng phép nhân để chắc chắn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "7 × 5 = 35\n35 : 7 = 5",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["7 : 7", "1"],
                    ["14 : 7", "2"],
                    ["21 : 7", "3"],
                    ["28 : 7", "4"],
                    ["35 : 7", "5"],
                    ["42 : 7", "6"],
                    ["49 : 7", "7"],
                    ["56 : 7", "8"],
                    ["63 : 7", "9"],
                    ["70 : 7", "10"],
                  ],
                  label: "Bảng chia 7",
                },
                operation: { left: 42, sign: ":", right: 7, result: 6 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "35 : 7 bằng bao nhiêu?",
                options: [4, 5, 6, 28],
                answer: 5,
                mascotHint: "Vì 7 × 5 = 35 nên 35 : 7 = 5.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "56 : 7 bằng bao nhiêu?",
                options: [7, 8, 9, 49],
                answer: 8,
                mascotHint: "Vì 7 × 8 = 56 nên 56 : 7 = 8.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 7: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "35 : 7 = 5; 56 : 7 = 8.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l5",
          title: "Bài 5: Bảng nhân 8",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 8",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Mỗi con nhện có 8 chân. Bé đếm chân của 3 con nhện nhé! 🕷️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 8",
                title: "Bảng nhân 8",
                explanation: "Bảng nhân 8 lập bằng cách đếm thêm 8 mỗi bước.",
                rule: "8 × 1 = 8 · 8 × 2 = 16 · 8 × 3 = 24 · 8 × 4 = 32 · 8 × 5 = 40 · 8 × 6 = 48 · 8 × 7 = 56 · 8 × 8 = 64 · 8 × 9 = 72 · 8 × 10 = 80.",
                points: [
                  "Mỗi kết quả hơn kém nhau đúng 8 đơn vị.",
                  "Kết quả bảng nhân 8 đều là số chẵn.",
                  "8 × 5 = 40; 8 × 8 = 64.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "8 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80",
                numberLine: {
                  from: 8,
                  to: 80,
                  step: 8,
                  marks: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
                  label: "Đếm thêm 8: 8 · 16 · 24 · … · 80",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["8 × 1", "8"],
                    ["8 × 5", "40"],
                    ["8 × 8", "64"],
                    ["8 × 10", "80"],
                  ],
                  label: "Bảng nhân 8",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 × 3 bằng bao nhiêu?",
                options: [16, 24, 32, 11],
                answer: 24,
                mascotHint: "8 × 2 = 16, thêm 8 được 24.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 × 7 bằng bao nhiêu?",
                options: [48, 56, 64, 15],
                answer: 56,
                mascotHint: "8 × 6 = 48, thêm 8 được 56.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 8: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.",
                  "8 × 3 = 24; 8 × 7 = 56.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l6",
          title: "Bài 6: Bảng chia 8",
          type: "learn",
          description: "Lập và học thuộc bảng chia 8",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 48 chiếc kẹo chia đều vào 8 túi. Mỗi túi có mấy chiếc? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 8",
                title: "Bảng chia 8",
                explanation: "Lấy tích trong bảng nhân 8 chia cho 8.",
                rule: "8 : 8 = 1 · 16 : 8 = 2 · 24 : 8 = 3 · 32 : 8 = 4 · 40 : 8 = 5 · 48 : 8 = 6 · 56 : 8 = 7 · 64 : 8 = 8 · 72 : 8 = 9 · 80 : 8 = 10.",
                points: [
                  "8 × 6 = 48 nên 48 : 8 = 6.",
                  "8 × 9 = 72 nên 72 : 8 = 9.",
                  "8 × 10 = 80 nên 80 : 8 = 10.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "8 × 6 = 48\n48 : 8 = 6",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["8 : 8", "1"],
                    ["16 : 8", "2"],
                    ["24 : 8", "3"],
                    ["32 : 8", "4"],
                    ["40 : 8", "5"],
                    ["48 : 8", "6"],
                    ["56 : 8", "7"],
                    ["64 : 8", "8"],
                    ["72 : 8", "9"],
                    ["80 : 8", "10"],
                  ],
                  label: "Bảng chia 8",
                },
                operation: { left: 48, sign: ":", right: 8, result: 6 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "48 : 8 bằng bao nhiêu?",
                options: [5, 6, 7, 40],
                answer: 6,
                mascotHint: "Vì 8 × 6 = 48 nên 48 : 8 = 6.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "72 : 8 bằng bao nhiêu?",
                options: [8, 9, 10, 64],
                answer: 9,
                mascotHint: "Vì 8 × 9 = 72 nên 72 : 8 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 8: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "48 : 8 = 6; 72 : 8 = 9.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l7",
          title: "Bài 7: Bảng nhân 9",
          type: "learn",
          description: "Lập và học thuộc bảng nhân 9",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt có mẹo đếm bảng nhân 9 bằng mười ngón tay đấy! ✋",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Nhân 9",
                title: "Bảng nhân 9",
                explanation:
                  "Bảng nhân 9 lập bằng cách đếm thêm 9 mỗi bước. Mẹo hay: 9 × n = 10 × n − n.",
                rule: "9 × 1 = 9 · 9 × 2 = 18 · 9 × 3 = 27 · 9 × 4 = 36 · 9 × 5 = 45 · 9 × 6 = 54 · 9 × 7 = 63 · 9 × 8 = 72 · 9 × 9 = 81 · 9 × 10 = 90.",
                points: [
                  "Mẹo: 9 × 7 = 10 × 7 − 7 = 70 − 7 = 63.",
                  "Tổng hai chữ số của kết quả luôn bằng 9: 63 → 6 + 3 = 9.",
                  "9 × 10 = 90.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "9 · 18 · 27 · 36 · 45 · 54 · 63 · 72 · 81 · 90",
                numberLine: {
                  from: 9,
                  to: 90,
                  step: 9,
                  marks: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
                  label: "Đếm thêm 9: 9 · 18 · 27 · … · 90",
                },
                table: {
                  headers: ["Phép nhân", "Kết quả"],
                  rows: [
                    ["9 × 1", "9"],
                    ["9 × 5", "45"],
                    ["9 × 7", "63"],
                    ["9 × 10", "90"],
                  ],
                  label: "Bảng nhân 9",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "9 × 6 bằng bao nhiêu?",
                options: [45, 54, 63, 15],
                answer: 54,
                mascotHint: "9 × 6 = 10 × 6 − 6 = 60 − 6 = 54.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "9 × 8 bằng bao nhiêu?",
                options: [63, 72, 81, 17],
                answer: 72,
                mascotHint: "9 × 8 = 80 − 8 = 72.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng nhân 9: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90.",
                  "Mẹo: 9 × n = 10 × n − n.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l8",
          title: "Bài 8: Bảng chia 9",
          type: "learn",
          description: "Lập và học thuộc bảng chia 9",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 63 bông hoa cắm đều vào 9 lọ. Mỗi lọ có mấy bông? 🌸",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Chia 9",
                title: "Bảng chia 9",
                explanation: "Lấy tích trong bảng nhân 9 chia cho 9.",
                rule: "9 : 9 = 1 · 18 : 9 = 2 · 27 : 9 = 3 · 36 : 9 = 4 · 45 : 9 = 5 · 54 : 9 = 6 · 63 : 9 = 7 · 72 : 9 = 8 · 81 : 9 = 9 · 90 : 9 = 10.",
                points: [
                  "9 × 7 = 63 nên 63 : 9 = 7.",
                  "9 × 9 = 81 nên 81 : 9 = 9.",
                  "9 × 10 = 90 nên 90 : 9 = 10.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "9 × 7 = 63\n63 : 9 = 7",
                table: {
                  headers: ["Phép chia", "Kết quả"],
                  rows: [
                    ["9 : 9", "1"],
                    ["18 : 9", "2"],
                    ["27 : 9", "3"],
                    ["36 : 9", "4"],
                    ["45 : 9", "5"],
                    ["54 : 9", "6"],
                    ["63 : 9", "7"],
                    ["72 : 9", "8"],
                    ["81 : 9", "9"],
                    ["90 : 9", "10"],
                  ],
                  label: "Bảng chia 9",
                },
                operation: { left: 63, sign: ":", right: 9, result: 7 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "63 : 9 bằng bao nhiêu?",
                options: [6, 7, 8, 54],
                answer: 7,
                mascotHint: "Vì 9 × 7 = 63 nên 63 : 9 = 7.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "81 : 9 bằng bao nhiêu?",
                options: [8, 9, 10, 72],
                answer: 9,
                mascotHint: "Vì 9 × 9 = 81 nên 81 : 9 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng chia 9: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "63 : 9 = 7; 81 : 9 = 9.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c2-l9",
          title: "Bài 9: Tìm thành phần trong phép nhân, phép chia",
          type: "learn",
          description: "Tìm thừa số, số bị chia, số chia chưa biết",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có một thừa số bị che: ? × 7 = 42. Bé tìm giúp Rô-bốt nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Ba công thức cần nhớ",
                explanation:
                  "Muốn tìm thừa số chưa biết, lấy TÍCH chia cho thừa số đã biết. Muốn tìm số bị chia, lấy THƯƠNG nhân SỐ CHIA. Muốn tìm số chia, lấy SỐ BỊ CHIA chia THƯƠNG.",
                rule: "? × 7 = 42 → ? = 42 : 7 = 6. ? : 6 = 5 → ? = 5 × 6 = 30. 36 : ? = 4 → ? = 36 : 4 = 9.",
                points: [
                  "Thừa số = tích : thừa số đã biết.",
                  "Số bị chia = thương × số chia.",
                  "Số chia = số bị chia : thương.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "? × 7 = 42  →  ? = 42 : 7 = 6\n36 : ? = 4   →  ? = 36 : 4 = 9",
                operation: { left: 6, sign: "×", right: 7, result: 42 },
                table: {
                  headers: ["Tìm gì", "Cách làm"],
                  rows: [
                    ["? × 7 = 42", "? = 42 : 7 = 6"],
                    ["? : 6 = 5", "? = 5 × 6 = 30"],
                    ["36 : ? = 4", "? = 36 : 4 = 9"],
                  ],
                  label: "Tìm thành phần trong phép nhân, phép chia",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: ? × 7 = 42",
                options: [5, 6, 7, 35],
                answer: 6,
                mascotHint: "Thừa số chưa biết = 42 : 7 = 6.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: ? : 6 = 5",
                options: [11, 25, 30, 1],
                answer: 30,
                mascotHint: "Số bị chia = thương × số chia = 5 × 6 = 30.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Thừa số = tích : thừa số đã biết.",
                  "Số bị chia = thương × số chia; số chia = số bị chia : thương.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l10",
          title: "Bài 10: Một phần mấy",
          type: "learn",
          description: "Nhận biết 1/2, 1/3, 1/4, 1/5 của một số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt có 12 viên kẹo, cho bé 1/3 số kẹo. Bé được mấy viên? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Một phần mấy của một số",
                explanation:
                  "Chia một số thành mấy phần bằng nhau rồi lấy một phần thì đó là 'một phần mấy' của số đó.",
                rule: "1/3 của 12 là 12 : 3 = 4. 1/2 của 10 là 10 : 2 = 5.",
                points: [
                  "1/2 nghĩa là chia 2 phần bằng nhau, lấy 1 phần.",
                  "1/4 của 20 là 20 : 4 = 5.",
                  "Muốn tìm 1 phần mấy của một số, bé lấy số đó chia cho số phần.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1/3 của 12 = 12 : 3 = 4\n1/4 của 20 = 20 : 4 = 5",
                fractionBar: {
                  parts: 3,
                  shaded: 1,
                  label: "1/3 của 12 = 12 : 3 = 4",
                },
                fractionCircle: {
                  parts: 4,
                  shaded: 1,
                  label: "1/4 của 20 = 20 : 4 = 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1/3 của 12 bằng bao nhiêu?",
                options: [3, 4, 6, 9],
                answer: 4,
                mascotHint: "Chia 12 thành 3 phần bằng nhau: 12 : 3 = 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "1/5 của 25 bằng bao nhiêu?",
                options: [4, 5, 6, 20],
                answer: 5,
                mascotHint: "25 : 5 = 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 phần mấy của một số = số đó chia cho số phần.",
                  "1/3 của 12 = 4; 1/5 của 25 = 5.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c2-l11",
          title: "Bài 11: Luyện tập chung chủ đề 2",
          type: "learn",
          description: "Ôn tập bảng nhân chia 6, 7, 8, 9",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã có đủ tám bảng nhân chia! Mình tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tám bảng nhân chia",
                explanation:
                  "Bé đã có bảng nhân chia 2, 3, 4, 5 và bảng nhân chia 6, 7, 8, 9.",
                points: [
                  "Học bảng nhân là có luôn bảng chia tương ứng.",
                  "Mẹo bảng nhân 9: 9 × n = 10 × n − n.",
                  "Muốn tìm 1 phần mấy của một số thì chia cho số phần.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "8 × 8 = 64    64 : 8 = 8\n9 × 7 = 63    63 : 9 = 7",
                operation: { left: 8, sign: "×", right: 8, result: 64 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["8 × 8", "64"],
                    ["64 : 8", "8"],
                    ["9 × 7", "63"],
                    ["63 : 9", "7"],
                  ],
                  label: "Luyện tập chung chủ đề 2",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 × 8 bằng bao nhiêu?",
                options: [56, 64, 72, 16],
                answer: 64,
                mascotHint: "8 × 8 = 64.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "1/4 của 36 bằng bao nhiêu?",
                options: [6, 8, 9, 32],
                answer: 9,
                mascotHint: "36 : 4 = 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 2.",
                  "8 × 8 = 64; 1/4 của 36 = 9.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 3 — SGK Bài 16-22 ═══
    {
      id: "g3-c3",
      name: "Chủ đề 3: Làm quen với hình phẳng, hình khối",
      description:
        "Điểm ở giữa và trung điểm đoạn thẳng; hình tròn, tâm, bán kính, đường kính; góc và góc vuông; các hình phẳng; khối lập phương, khối hộp chữ nhật",
      icon: "📐",
      color: "#ff8a65",
      totalLessons: 10,
      lessons: [
        {
          id: "g3-c3-l1",
          title: "Bài 1: Điểm ở giữa hai điểm",
          type: "learn",
          description: "Nhận biết điểm nằm giữa hai điểm thẳng hàng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Ba bạn kiến đứng thẳng hàng: A, O, B. Bạn nào đứng giữa nhỉ? 🐜",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Điểm ở giữa",
                explanation:
                  "Khi ba điểm thẳng hàng, điểm nằm GIỮA hai điểm còn lại gọi là ĐIỂM Ở GIỮA.",
                rule: "Ba điểm A, O, B thẳng hàng theo thứ tự A, O, B thì O là điểm ở giữa A và B.",
                points: [
                  "Ba điểm phải THẲNG HÀNG thì mới có điểm ở giữa.",
                  "A và B là hai điểm hai đầu, O nằm giữa.",
                  "Điểm ở giữa không nhất thiết chia đoạn thành hai phần bằng nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "A •———• O ———• B\nO là điểm ở giữa A và B",
                ruler: {
                  lengthCm: 8,
                  measure: { from: 0, to: 8 },
                  label:
                    "A · O · B thẳng hàng theo thứ tự A, O, B ⇒ O là điểm ở giữa A và B",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Ba điểm A, O, B thẳng hàng theo thứ tự A, O, B. Điểm nào ở giữa?",
                options: ["Điểm A", "Điểm O", "Điểm B", "Không có điểm nào"],
                answer: "Điểm O",
                mascotHint: "O nằm giữa A và B.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ba điểm thẳng hàng mới có điểm ở giữa.",
                  "A, O, B theo thứ tự đó thì O ở giữa.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l2",
          title: "Bài 2: Trung điểm của đoạn thẳng",
          type: "learn",
          description:
            "Nhận biết trung điểm chia đoạn thẳng thành hai phần bằng nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt gấp đôi sợi dây rồi đánh dấu chỗ giữa. Chỗ đó gọi là gì nhỉ? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trung điểm",
                explanation:
                  "TRUNG ĐIỂM của đoạn thẳng là điểm nằm giữa và chia đoạn thẳng thành HAI PHẦN BẰNG NHAU.",
                rule: "M là trung điểm của AB khi M nằm giữa A, B và AM = MB.",
                points: [
                  "Trung điểm phải CHIA ĐÔI đoạn thẳng.",
                  "Nếu AB dài 8 cm thì trung điểm M cách A và B mỗi bên 4 cm.",
                  "Điểm ở giữa chưa chắc là trung điểm, nhưng trung điểm luôn là điểm ở giữa.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "A •————•————• B\n      M\nAM = MB",
                ruler: {
                  lengthCm: 8,
                  measure: { from: 0, to: 4 },
                  label:
                    "M là trung điểm của AB khi M nằm giữa A, B và AM = MB",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn thẳng AB dài 10 cm, M là trung điểm của AB. Hỏi AM dài bao nhiêu?",
                options: ["4 cm", "5 cm", "6 cm", "10 cm"],
                answer: "5 cm",
                mascotHint: "Trung điểm chia đôi: 10 : 2 = 5 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điều kiện nào để M là trung điểm của AB?",
                options: [
                  "M nằm giữa A, B và AM = MB",
                  "M nằm ở đâu cũng được",
                  "M trùng với A",
                  "M nằm ngoài đoạn AB",
                ],
                answer: "M nằm giữa A, B và AM = MB",
                mascotHint:
                  "M vừa nằm giữa, vừa chia đoạn thành hai phần bằng nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Trung điểm nằm giữa và chia đoạn thẳng thành hai phần bằng nhau.",
                  "AB dài 10 cm thì trung điểm cách mỗi đầu 5 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l3",
          title: "Bài 3: Hình tròn — tâm, bán kính, đường kính",
          type: "learn",
          description: "Nhận biết tâm, bán kính và đường kính của hình tròn",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt vẽ một hình tròn có tâm O. Bé cùng tìm bán kính và đường kính nhé! ⭕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình tròn",
                explanation:
                  "TÂM là điểm chính giữa hình tròn. BÁN KÍNH là đoạn từ tâm đến một điểm trên đường tròn. ĐƯỜNG KÍNH là đoạn thẳng đi qua tâm và nối hai điểm trên đường tròn.",
                rule: "Đường kính gấp đôi bán kính: d = 2 × r.",
                points: [
                  "Mọi bán kính của một hình tròn đều dài bằng nhau.",
                  "Bán kính OA = OB.",
                  "Nếu bán kính 3 cm thì đường kính 6 cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "      A\n   •  |\n  B •—O—• C\nĐường kính BC = 2 × bán kính OB",
                circleParts: {
                  radius: 3,
                  diameter: 6,
                  showCenter: true,
                  showCircumference: true,
                  label: "Đường kính = 2 × bán kính (d = 2 × r)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình tròn có bán kính 4 cm. Đường kính dài bao nhiêu?",
                options: ["2 cm", "4 cm", "8 cm", "16 cm"],
                answer: "8 cm",
                mascotHint: "Đường kính = 2 × bán kính = 2 × 4 = 8 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn thẳng nào đi qua tâm và nối hai điểm trên đường tròn?",
                options: ["Đường kính", "Bán kính", "Cạnh", "Góc"],
                answer: "Đường kính",
                mascotHint:
                  "Đường kính đi qua tâm, nối hai điểm trên đường tròn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tâm là điểm chính giữa hình tròn.",
                  "Đường kính = 2 × bán kính.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l4",
          title: "Bài 4: Góc và góc vuông",
          type: "learn",
          description: "Nhận biết góc và góc vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hai cạnh của quyển sách tạo thành một góc. Bé xem đó là góc gì nhé! 📕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Góc và góc vuông",
                explanation:
                  "GÓC được tạo bởi hai cạnh xuất phát từ một điểm (gọi là đỉnh). GÓC VUÔNG là góc đặc biệt, dùng Ê-KE để kiểm tra.",
                rule: "Bốn góc của hình chữ nhật là bốn góc vuông. Đặt ê-ke khớp đúng là góc vuông.",
                points: [
                  "Góc có một đỉnh và hai cạnh.",
                  "Ê-ke là dụng cụ có một góc vuông để kiểm tra.",
                  "Đặt đỉnh góc vuông của ê-ke trùng đỉnh góc cần kiểm tra.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Góc đỉnh A, cạnh AB và AC\n└ góc vuông (dùng ê-ke)",
                angle: {
                  kind: "right",
                  degrees: 90,
                  label: "Góc vuông — đặt ê-ke khớp đúng",
                },
                table: {
                  headers: ["Đỉnh", "Cạnh"],
                  rows: [["A", "AB và AC"]],
                  label:
                    "Góc đỉnh A, cạnh AB và AC — bốn góc của hình chữ nhật đều là góc vuông",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Dùng dụng cụ nào để kiểm tra góc vuông?",
                options: ["Ê-ke", "Thước dây", "Cân", "Compa"],
                answer: "Ê-ke",
                mascotHint: "Ê-ke có một góc vuông để kiểm tra.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Góc có một đỉnh và hai cạnh.",
                  "Dùng ê-ke để kiểm tra góc vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l5",
          title: "Bài 5: Góc không vuông",
          type: "learn",
          description: "Phân biệt góc vuông và góc không vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hai cánh cửa mở ra tạo một góc. Góc đó có vuông không nhỉ? 🚪",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Góc vuông và góc không vuông",
                explanation:
                  "Góc nào khớp đúng với góc vuông của ê-ke thì là GÓC VUÔNG. Các góc còn lại là GÓC KHÔNG VUÔNG.",
                rule: "Nếu ê-ke không khớp với góc thì góc đó không vuông.",
                points: [
                  "Góc không vuông có thể rộng hơn hoặc hẹp hơn góc vuông.",
                  "Mép bàn, mép sách thường tạo góc vuông.",
                  "Kim đồng hồ lúc 3 giờ tạo thành góc vuông.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "├ góc vuông (ê-ke khớp)\n╱ góc không vuông (ê-ke không khớp)",
                angle: {
                  kind: "acute",
                  degrees: 45,
                  label: "Góc không vuông — ê-ke không khớp",
                },
                table: {
                  headers: ["Góc", "Ê-ke"],
                  rows: [
                    ["Vuông", "khớp"],
                    ["Không vuông", "không khớp"],
                  ],
                  label: "Phân biệt góc vuông và góc không vuông",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khi ê-ke KHÔNG khớp với góc, góc đó là góc gì?",
                options: [
                  "Góc không vuông",
                  "Góc vuông",
                  "Góc bẹt",
                  "Đường tròn",
                ],
                answer: "Góc không vuông",
                mascotHint: "Không khớp ê-ke thì là góc không vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ê-ke khớp → góc vuông.",
                  "Ê-ke không khớp → góc không vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l6",
          title: "Bài 6: Hình tam giác và hình tứ giác",
          type: "learn",
          description:
            "Nhận biết hình tam giác, hình tứ giác qua cạnh, đỉnh, góc",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đếm giúp Rô-bốt: hình tam giác có mấy cạnh, mấy góc? 🔺",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình tam giác và hình tứ giác",
                explanation:
                  "HÌNH TAM GIÁC có 3 cạnh, 3 đỉnh và 3 góc. HÌNH TỨ GIÁC có 4 cạnh, 4 đỉnh và 4 góc.",
                rule: "Hình tam giác: 3 cạnh, 3 đỉnh, 3 góc. Hình tứ giác: 4 cạnh, 4 đỉnh, 4 góc.",
                points: [
                  "Hình tam giác là hình có ít cạnh nhất trong hai hình này.",
                  "Hình vuông và hình chữ nhật cũng là hình tứ giác.",
                  "Đếm đỉnh và cạnh phải luôn bằng nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🔺 tam giác: 3 cạnh · 3 đỉnh · 3 góc\n▭ tứ giác: 4 cạnh · 4 đỉnh · 4 góc",
                planeShape: {
                  kind: "triangle",
                  labels: ["cạnh", "cạnh"],
                  vertices: true,
                  formula: "3 cạnh · 3 đỉnh · 3 góc",
                },
                table: {
                  headers: ["Hình", "Cạnh", "Đỉnh", "Góc"],
                  rows: [
                    ["Tam giác", 3, 3, 3],
                    ["Tứ giác", 4, 4, 4],
                  ],
                  label: "Hình tam giác và hình tứ giác",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình tam giác có mấy góc?",
                options: [2, 3, 4, 5],
                answer: 3,
                mascotHint: "Hình tam giác có 3 cạnh, 3 đỉnh, 3 góc.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình tứ giác có mấy đỉnh?",
                options: [3, 4, 5, 6],
                answer: 4,
                mascotHint: "Hình tứ giác có 4 cạnh và 4 đỉnh.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tam giác: 3 cạnh, 3 đỉnh, 3 góc.",
                  "Tứ giác: 4 cạnh, 4 đỉnh, 4 góc.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l7",
          title: "Bài 7: Hình chữ nhật và hình vuông",
          type: "learn",
          description: "Nhận biết đặc điểm hình chữ nhật và hình vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé hãy kiểm tra bốn góc của hình chữ nhật bằng ê-ke xem có vuông không nhé! 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình chữ nhật và hình vuông",
                explanation:
                  "Cả hai đều có 4 GÓC VUÔNG. Hình chữ nhật có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau. Hình vuông có 4 cạnh bằng nhau.",
                rule: "Hình chữ nhật: 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau. Hình vuông: 4 góc vuông, 4 cạnh bằng nhau.",
                points: [
                  "Hình vuông là hình chữ nhật đặc biệt (có 4 cạnh bằng nhau).",
                  "Cả hai đều có 4 đỉnh.",
                  "Dùng ê-ke để kiểm tra 4 góc vuông.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▭ hình chữ nhật: 4 góc vuông, 2 cặp cạnh bằng nhau\n▢ hình vuông: 4 góc vuông, 4 cạnh bằng nhau",
                planeShape: {
                  kind: "square",
                  labels: ["cạnh"],
                  formula: "4 góc vuông · 4 cạnh bằng nhau",
                },
                table: {
                  headers: ["Hình", "Đặc điểm"],
                  rows: [
                    [
                      "Hình chữ nhật",
                      "4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau",
                    ],
                    ["Hình vuông", "4 góc vuông, 4 cạnh bằng nhau"],
                  ],
                  label: "Hình chữ nhật và hình vuông",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có đặc điểm gì?",
                options: [
                  "4 góc vuông và 4 cạnh bằng nhau",
                  "3 góc vuông",
                  "2 cạnh bằng nhau",
                  "Không có góc vuông",
                ],
                answer: "4 góc vuông và 4 cạnh bằng nhau",
                mascotHint:
                  "Hình vuông có 4 góc vuông và 4 cạnh đều bằng nhau.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình chữ nhật có mấy góc vuông?",
                options: [2, 3, 4, 5],
                answer: 4,
                mascotHint: "Cả 4 góc của hình chữ nhật đều là góc vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hình chữ nhật: 4 góc vuông, hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau.",
                  "Hình vuông: 4 góc vuông, 4 cạnh bằng nhau.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c3-l8",
          title: "Bài 8: Thực hành vẽ góc vuông, đường tròn và các hình",
          type: "learn",
          description: "Dùng ê-ke và compa để vẽ hình",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Hôm nay bé làm hoạ sĩ hình học! Mình vẽ góc vuông và đường tròn nhé ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Cách vẽ",
                explanation:
                  "Vẽ góc vuông: dùng ê-ke, kẻ hai cạnh theo hai cạnh góc vuông của ê-ke. Vẽ đường tròn: dùng compa, đặt mũi nhọn vào tâm, quay đều.",
                rule: "Vẽ hình vuông cạnh 4 cm: kẻ một cạnh 4 cm, rồi dùng ê-ke kẻ các cạnh còn lại.",
                points: [
                  "Ê-ke để vẽ góc vuông.",
                  "Compa để vẽ đường tròn.",
                  "Vẽ hình chữ nhật: dùng ê-ke để các góc đều vuông.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Ê-ke → vẽ góc vuông, hình vuông",
                planeShape: {
                  kind: "square",
                  labels: ["4 cm"],
                  formula: "Vẽ hình vuông cạnh 4 cm bằng ê-ke",
                },
              },
            },
            {
              type: "visual",
              content: {
                text: "Compa → vẽ đường tròn",
                circleParts: {
                  radius: 3,
                  showCenter: true,
                  label: "Dùng compa để vẽ đường tròn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Muốn vẽ một đường tròn, bé dùng dụng cụ nào?",
                options: ["Compa", "Ê-ke", "Thước dây", "Cân"],
                answer: "Compa",
                mascotHint: "Compa dùng để vẽ đường tròn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ê-ke vẽ góc vuông và các hình có góc vuông.",
                  "Compa vẽ đường tròn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l9",
          title: "Bài 9: Khối lập phương và khối hộp chữ nhật",
          type: "learn",
          description: "Nhận biết hai loại khối qua số mặt, số đỉnh, số cạnh",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé hãy đếm mặt của con xúc xắc và của hộp bánh nhé! 🎲",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hai loại khối",
                explanation:
                  "KHỐI LẬP PHƯƠNG có 6 mặt đều là hình vuông bằng nhau. KHỐI HỘP CHỮ NHẬT có 6 mặt, các mặt là hình chữ nhật.",
                rule: "Cả hai đều có 6 mặt, 8 đỉnh và 12 cạnh.",
                points: [
                  "Khối lập phương: 6 mặt vuông bằng nhau.",
                  "Khối hộp chữ nhật: 6 mặt không đều nhau.",
                  "Cả hai đều xếp chồng được.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎲 khối lập phương: 6 mặt vuông bằng nhau\n📦 khối hộp chữ nhật: 6 mặt không đều nhau",
                solid: {
                  kind: "cube",
                  dims: { a: 3 },
                  label: "Khối lập phương",
                  formula: "6 mặt vuông bằng nhau",
                },
                table: {
                  headers: ["Khối", "Mặt"],
                  rows: [
                    ["Khối lập phương", "6 mặt vuông bằng nhau"],
                    ["Khối hộp chữ nhật", "6 mặt không đều nhau"],
                  ],
                  label: "Cả hai đều có 6 mặt, 8 đỉnh và 12 cạnh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khối lập phương có mấy mặt?",
                options: [4, 6, 8, 12],
                answer: 6,
                mascotHint: "Khối lập phương có 6 mặt đều là hình vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cả hai khối đều có 6 mặt.",
                  "Khối lập phương có 6 mặt vuông bằng nhau.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c3-l10",
          title: "Bài 10: Luyện tập chung chủ đề 3",
          type: "learn",
          description:
            "Luyện tập trung điểm, hình tròn, góc và các hình phẳng đã học",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết rất nhiều về hình rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 3",
                explanation:
                  "Bé đã học điểm ở giữa, trung điểm, hình tròn, góc, các hình phẳng và hai loại khối.",
                points: [
                  "Trung điểm chia đoạn thẳng thành hai phần bằng nhau.",
                  "Đường kính = 2 × bán kính.",
                  "Hình tam giác: 3 cạnh; hình tứ giác: 4 cạnh.",
                  "Hình vuông và hình chữ nhật đều có 4 góc vuông.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Đường kính = 2 × bán kính (d = 2 × r)",
                circleParts: { radius: 3, diameter: 6, label: "d = 2 × r" },
              },
            },
            {
              type: "visual",
              content: {
                text: "Hình vuông: 4 góc vuông · 4 cạnh bằng nhau",
                planeShape: {
                  kind: "square",
                  labels: ["cạnh"],
                  formula: "4 góc vuông · 4 cạnh bằng nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình tròn có đường kính 10 cm. Bán kính dài bao nhiêu?",
                options: ["5 cm", "10 cm", "20 cm", "2 cm"],
                answer: "5 cm",
                mascotHint: "Bán kính = đường kính : 2 = 10 : 2 = 5 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn thẳng AB dài 12 cm. Trung điểm M của AB cách A bao nhiêu xăng-ti-mét?",
                options: ["4 cm", "6 cm", "12 cm", "24 cm"],
                answer: "6 cm",
                mascotHint: "12 : 2 = 6 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 3.",
                  "Đường kính 10 cm thì bán kính 5 cm.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 4 — SGK Bài 23-29 ═══
    {
      id: "g3-c4",
      name: "Chủ đề 4: Phép nhân, phép chia trong phạm vi 100",
      description:
        "Nhân số có hai chữ số với số có một chữ số; gấp một số lên nhiều lần; phép chia hết, phép chia có dư; giảm một số đi nhiều lần; bài toán giải bằng hai bước tính",
      icon: "🔢",
      color: "#8e7cc3",
      totalLessons: 10,
      lessons: [
        {
          id: "g3-c4-l1",
          title:
            "Bài 1: Nhân số có hai chữ số với số có một chữ số (không nhớ)",
          type: "learn",
          description: "Đặt tính và nhân dạng 32 × 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mỗi hộp có 32 chiếc bánh, có 3 hộp. Có tất cả bao nhiêu chiếc bánh? 🍪",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân hai chữ số với một chữ số",
                explanation:
                  "Bé nhân lần lượt từ HÀNG ĐƠN VỊ rồi đến HÀNG CHỤC với số có một chữ số.",
                rule: "32 × 3: 2 × 3 = 6, viết 6. 3 × 3 = 9, viết 9. Kết quả 96.",
                points: [
                  "Đặt số có một chữ số thẳng cột hàng đơn vị.",
                  "Nhân hàng đơn vị trước, hàng chục sau.",
                  "Cả hai hàng đều bé hơn 10 nên không nhớ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  32\n×  3\n  96",
                operation: { left: 32, sign: "×", right: 3, result: 96 },
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [3, 2],
                  label: "32 × 3: 2 × 3 = 6, viết 6; 3 × 3 = 9, viết 9",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "32 × 3 bằng bao nhiêu?",
                options: [66, 96, 35, 69],
                answer: 96,
                mascotHint: "2 × 3 = 6; 3 × 3 = 9. Kết quả 96.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "21 × 4 bằng bao nhiêu?",
                options: [64, 84, 25, 44],
                answer: 84,
                mascotHint: "1 × 4 = 4; 2 × 4 = 8. Kết quả 84.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân hàng đơn vị trước, hàng chục sau.",
                  "32 × 3 = 96; 21 × 4 = 84.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l2",
          title: "Bài 2: Nhân số có hai chữ số với số có một chữ số (có nhớ)",
          type: "learn",
          description: "Đặt tính và nhân dạng 26 × 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "26 × 3 thì 6 × 3 = 18, vượt qua 10 rồi. Bé phải làm sao? 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân có nhớ",
                explanation:
                  "Khi nhân hàng đơn vị mà được từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ sang hàng chục.",
                rule: "26 × 3: 6 × 3 = 18, viết 8 nhớ 1. 2 × 3 = 6, thêm 1 nhớ = 7. Kết quả 78.",
                points: [
                  "Nhớ 1 khi hàng đơn vị nhân ra từ 10 trở lên.",
                  "Đừng quên cộng số nhớ vào hàng chục.",
                  "24 × 4 = 96 (4 × 4 = 16 viết 6 nhớ 1; 2 × 4 + 1 = 9).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  26\n×  3\n  78\n6 × 3 = 18 → viết 8 nhớ 1\n2 × 3 + 1 = 7",
                operation: { left: 26, sign: "×", right: 3, result: 78 },
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [2, 6],
                  label:
                    "26 × 3: 6 × 3 = 18 viết 8 nhớ 1; 2 × 3 = 6 thêm 1 = 7",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "26 × 3 bằng bao nhiêu?",
                options: [68, 78, 88, 29],
                answer: 78,
                mascotHint:
                  "6 × 3 = 18 viết 8 nhớ 1; 2 × 3 + 1 = 7. Kết quả 78.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "24 × 4 bằng bao nhiêu?",
                options: [86, 96, 106, 28],
                answer: 96,
                mascotHint:
                  "4 × 4 = 16 viết 6 nhớ 1; 2 × 4 + 1 = 9. Kết quả 96.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân có nhớ: nhớ 1 sang hàng chục.",
                  "26 × 3 = 78; 24 × 4 = 96.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l3",
          title: "Bài 3: Gấp một số lên một số lần",
          type: "learn",
          description: "Nhận biết và tính gấp một số lên nhiều lần",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Băng giấy đỏ dài 4 cm. Băng giấy xanh dài gấp 3 lần. Băng xanh dài bao nhiêu? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Gấp lên một số lần",
                explanation:
                  "Muốn gấp một số lên nhiều lần, ta lấy số đó NHÂN với số lần.",
                rule: "4 cm gấp 3 lần là 4 × 3 = 12 cm.",
                points: [
                  "'Gấp 3 lần' nghĩa là lấy 3 lần số ban đầu.",
                  "Gấp lên thì số TĂNG, dùng phép nhân.",
                  "6 gấp 4 lần là 6 × 4 = 24.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 cm   →   gấp 3 lần   →   12 cm\n4 × 3 = 12",
                numberLine: {
                  from: 4,
                  to: 12,
                  step: 4,
                  marks: [4, 8, 12],
                  hops: [{ from: 4, to: 12, label: "gấp 3 lần" }],
                  label: "4 cm gấp 3 lần là 4 × 3 = 12 cm",
                },
                operation: { left: 4, sign: "×", right: 3, result: 12 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Băng giấy đỏ dài 4 cm, băng giấy xanh dài gấp 3 lần. Băng giấy xanh dài bao nhiêu?",
                options: ["7 cm", "12 cm", "1 cm", "43 cm"],
                answer: "12 cm",
                // Sơ đồ so sánh: băng đỏ 4 cm, băng xanh gấp 3 lần = 12 cm.
                barModel: {
                  rows: [
                    { label: "Băng đỏ", parts: 4 },
                    { label: "Băng xanh", parts: 12 },
                  ],
                  unit: "cm",
                  note: "Băng xanh gấp 3 lần: 4 × 3 = 12 cm",
                },
                mascotHint: "Gấp 3 lần thì nhân 3: 4 × 3 = 12 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 gấp lên 4 lần bằng bao nhiêu?",
                options: [10, 24, 2, 64],
                answer: 24,
                mascotHint: "6 × 4 = 24.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Gấp lên nhiều lần thì nhân với số lần.",
                  "4 gấp 3 lần = 12; 6 gấp 4 lần = 24.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l4",
          title: "Bài 4: Phép chia hết",
          type: "learn",
          description: "Nhận biết phép chia hết khi chia vừa đủ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 12 chiếc kẹo chia đều cho 3 bạn. Có bạn nào bị thiếu kẹo không? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Phép chia hết",
                explanation:
                  "PHÉP CHIA HẾT là phép chia mà chia vừa đủ, KHÔNG còn thừa ra.",
                rule: "12 : 3 = 4 (không dư). Mỗi bạn được 4 chiếc kẹo, không thừa chiếc nào.",
                points: [
                  "Chia hết thì không có số dư.",
                  "15 : 5 = 3 là chia hết.",
                  "Thử lại: 3 × 4 = 12 ✓",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 : 3 = 4  (không dư)\nThử lại: 4 × 3 = 12",
                operation: { left: 12, sign: ":", right: 3, result: 4 },
                table: {
                  headers: ["Phép chia", "Thử lại"],
                  rows: [["12 : 3 = 4 (không dư)", "4 × 3 = 12"]],
                  label:
                    "Phép chia hết — mỗi bạn 4 chiếc kẹo, không thừa chiếc nào",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Phép chia hết là phép chia thế nào?",
                options: [
                  "Chia vừa đủ, không còn thừa",
                  "Chia còn thừa ra",
                  "Không chia được",
                  "Chia cho 0",
                ],
                answer: "Chia vừa đủ, không còn thừa",
                mascotHint: "Chia hết thì không có phần thừa ra.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chia hết: không còn thừa.",
                  "12 : 3 = 4 là chia hết.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l5",
          title: "Bài 5: Phép chia có dư",
          type: "learn",
          description: "Nhận biết phép chia có dư và điều kiện của số dư",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 13 chiếc kẹo chia cho 3 bạn. Chia đều thì thừa ra mấy chiếc? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Phép chia có dư",
                explanation:
                  "PHÉP CHIA CÓ DƯ là phép chia còn THỪA RA một phần không chia hết. Phần thừa đó gọi là SỐ DƯ.",
                rule: "13 : 3 = 4 (dư 1). Đọc là: mười ba chia ba bằng bốn, dư một.",
                points: [
                  "SỐ DƯ luôn BÉ HƠN SỐ CHIA.",
                  "Thử lại: 4 × 3 + 1 = 13 ✓",
                  "Số dư bé nhất là 1, lớn nhất là số chia trừ 1.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "13 : 3 = 4 (dư 1)\nThử lại: 4 × 3 + 1 = 13",
                operation: { left: 13, sign: ":", right: 3, result: 4 },
                table: {
                  headers: ["Phép chia", "Thử lại"],
                  rows: [["13 : 3 = 4 (dư 1)", "4 × 3 + 1 = 13"]],
                  label: "Phép chia có dư — mười ba chia ba bằng bốn, dư một",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "13 : 3 bằng bao nhiêu?",
                options: ["4 dư 1", "4 dư 2", "3 dư 1", "4 dư 3"],
                answer: "4 dư 1",
                mascotHint: "3 × 4 = 12, còn thừa 1. Vậy 13 : 3 = 4 dư 1.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong phép chia cho 3, số dư có thể là những số nào?",
                options: ["0, 1, 2", "0, 1, 2, 3", "1, 2, 3", "Bất kì số nào"],
                answer: "0, 1, 2",
                mascotHint:
                  "Số dư luôn bé hơn số chia là 3, nên chỉ có thể là 0, 1 hoặc 2.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Số dư luôn bé hơn số chia.", "13 : 3 = 4 dư 1."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l6",
          title: "Bài 6: Chia số có hai chữ số cho số có một chữ số",
          type: "learn",
          description: "Đặt tính và chia số có hai chữ số cho số có một chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "48 : 4 thì làm thế nào nhỉ? Bé chia từng hàng nhé! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chia từng hàng từ trái sang phải",
                explanation: "Bé chia hàng CHỤC trước, rồi đến hàng ĐƠN VỊ.",
                rule: "48 : 4: 4 : 4 = 1, viết 1. 8 : 4 = 2, viết 2. Kết quả 12.",
                points: [
                  "Chia từ trái sang phải (ngược với cộng trừ nhân).",
                  "48 : 4 = 12.",
                  "Thử lại: 12 × 4 = 48 ✓",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "48 : 4 = 12\n4 : 4 = 1;  8 : 4 = 2",
                operation: { left: 48, sign: ":", right: 4, result: 12 },
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [4, 8],
                  label: "48 : 4: 4 : 4 = 1; 8 : 4 = 2 ⇒ 12",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "48 : 4 bằng bao nhiêu?",
                options: [11, 12, 22, 14],
                answer: 12,
                mascotHint: "4 : 4 = 1; 8 : 4 = 2. Kết quả 12.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "69 : 3 bằng bao nhiêu?",
                options: [21, 23, 32, 33],
                answer: 23,
                mascotHint: "6 : 3 = 2; 9 : 3 = 3. Kết quả 23.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chia từ hàng chục rồi đến hàng đơn vị.",
                  "48 : 4 = 12; 69 : 3 = 23.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c4-l7",
          title: "Bài 7: Giảm một số đi một số lần",
          type: "learn",
          description: "Nhận biết và tính giảm một số đi nhiều lần",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Băng giấy đỏ dài 12 cm. Băng xanh ngắn hơn, chỉ bằng 1/3. Băng xanh dài bao nhiêu? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Giảm đi một số lần",
                explanation:
                  "Muốn giảm một số đi nhiều lần, ta lấy số đó CHIA cho số lần.",
                rule: "12 cm giảm 3 lần là 12 : 3 = 4 cm.",
                points: [
                  "'Giảm 3 lần' nghĩa là chia thành 3 phần bằng nhau, lấy 1 phần.",
                  "Giảm đi thì số NHỎ lại, dùng phép chia.",
                  "Chú ý phân biệt: GẤP lên thì NHÂN, GIẢM đi thì CHIA.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Gấp lên 3 lần:  4 × 3 = 12\nGiảm đi 3 lần: 12 : 3 = 4",
                numberLine: {
                  from: 4,
                  to: 12,
                  step: 4,
                  marks: [4, 8, 12],
                  hops: [{ from: 12, to: 4, label: "giảm 3 lần" }],
                  label: "12 cm giảm 3 lần là 12 : 3 = 4 cm",
                },
                table: {
                  headers: ["Thao tác", "Kết quả"],
                  rows: [
                    ["Gấp lên 3 lần", "4 × 3 = 12"],
                    ["Giảm đi 3 lần", "12 : 3 = 4"],
                  ],
                  label: "Gấp lên và giảm đi",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "12 giảm đi 3 lần bằng bao nhiêu?",
                options: [4, 9, 15, 36],
                answer: 4,
                mascotHint: "Giảm đi 3 lần thì chia 3: 12 : 3 = 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Muốn giảm một số đi 4 lần, bé làm phép tính gì?",
                options: [
                  "Chia cho 4",
                  "Nhân với 4",
                  "Cộng thêm 4",
                  "Trừ đi 4",
                ],
                answer: "Chia cho 4",
                mascotHint: "Giảm đi nhiều lần thì chia cho số lần.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Gấp lên thì nhân; giảm đi thì chia.",
                  "12 giảm 3 lần = 4.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l8",
          title: "Bài 8: Bài toán giải bằng hai bước tính",
          type: "learn",
          description: "Giải bài toán cần hai phép tính",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hàng trên có 8 quả cam, hàng dưới có nhiều hơn 4 quả. Cả hai hàng có bao nhiêu quả? 🍊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Hai bước tính",
                explanation:
                  "Bài toán dạng này cần HAI phép tính: tính phần chưa biết trước, rồi mới tính tổng.",
                rule: "Bước 1: hàng dưới có 8 + 4 = 12 (quả). Bước 2: cả hai hàng có 8 + 12 = 20 (quả).",
                points: [
                  "Đọc kĩ đề để biết cần mấy bước.",
                  "Bước 1 tính phần chưa biết.",
                  "Bước 2 mới tính câu hỏi chính.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Hàng trên: 8 quả\nHàng dưới: 8 + 4 = 12 quả\nCả hai: 8 + 12 = 20 quả",
                operation: { left: 8, sign: "+", right: 12, result: 20 },
                barModel: {
                  rows: [
                    { label: "Hàng trên", parts: 8 },
                    { label: "Hàng dưới", parts: 12 },
                  ],
                  braceLabel: "Cả hai hàng: 8 + 12 = 20 quả",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hàng trên có 8 quả cam, hàng dưới nhiều hơn 4 quả. Hỏi cả hai hàng có bao nhiêu quả cam?",
                options: [12, 16, 20, 4],
                answer: 20,
                mascotHint: "Hàng dưới 12 quả; cả hai hàng 8 + 12 = 20 quả.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bài toán hai bước: tính phần chưa biết trước, rồi tính tổng.",
                  "8 + 4 = 12; 8 + 12 = 20.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c4-l9",
          title: "Bài 9: Luyện tập phép chia có dư",
          type: "learn",
          description: "Thực hành chia có dư và kiểm tra số dư",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé hãy nhớ: số dư luôn bé hơn số chia. Cùng luyện tập nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Ba bước chia có dư",
                explanation:
                  "Tìm số lớn nhất nhân với số chia mà không vượt quá số bị chia. Rồi lấy số bị chia trừ tích đó để ra số dư.",
                rule: "19 : 3: 3 × 6 = 18 (không vượt quá 19). Số dư là 19 − 18 = 1. Vậy 19 : 3 = 6 dư 1.",
                points: [
                  "3 × 6 = 18 < 19 ✓; 3 × 7 = 21 > 19 ✗.",
                  "Số dư = số bị chia − tích.",
                  "Luôn kiểm: số dư bé hơn số chia.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "19 : 3 = 6 (dư 1)\n3 × 6 = 18;  19 − 18 = 1",
                operation: { left: 19, sign: ":", right: 3, result: 6 },
                table: {
                  headers: ["Bước", "Làm"],
                  rows: [
                    ["1", "3 × 6 = 18 (không vượt quá 19)"],
                    ["2", "Số dư = 19 − 18 = 1"],
                    ["Kết quả", "19 : 3 = 6 (dư 1)"],
                  ],
                  label: "Luyện tập phép chia có dư",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "19 : 3 bằng bao nhiêu?",
                options: ["5 dư 4", "6 dư 1", "6 dư 2", "7 dư 1"],
                answer: "6 dư 1",
                mascotHint: "3 × 6 = 18, còn dư 1. Vậy 19 : 3 = 6 dư 1.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "29 : 4 bằng bao nhiêu?",
                options: ["6 dư 5", "7 dư 1", "7 dư 4", "8 dư 1"],
                answer: "7 dư 1",
                mascotHint: "4 × 7 = 28, còn dư 1. Vậy 29 : 4 = 7 dư 1.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số dư = số bị chia − tích.",
                  "19 : 3 = 6 dư 1; 29 : 4 = 7 dư 1.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c4-l10",
          title: "Bài 10: Luyện tập chung chủ đề 4",
          type: "learn",
          description: "Ôn tập nhân chia trong phạm vi 100",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết nhân chia hai chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 4",
                explanation:
                  "Bé đã học nhân chia số có hai chữ số với số có một chữ số, gấp lên và giảm đi nhiều lần, chia hết và chia có dư.",
                points: [
                  "Nhân: nhân từng hàng, nhớ 1 khi cần.",
                  "Chia: chia từng hàng từ trái sang phải.",
                  "Gấp lên thì nhân; giảm đi thì chia.",
                  "Số dư luôn bé hơn số chia.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "26 × 3 = 78\n48 : 4 = 12\n19 : 3 = 6 (dư 1)",
                operation: { left: 26, sign: "×", right: 3, result: 78 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["26 × 3", "78"],
                    ["48 : 4", "12"],
                    ["19 : 3", "6 (dư 1)"],
                  ],
                  label: "Luyện tập chung chủ đề 4",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "34 × 2 bằng bao nhiêu?",
                options: [58, 68, 36, 62],
                answer: 68,
                mascotHint: "4 × 2 = 8; 3 × 2 = 6. Kết quả 68.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "96 : 3 bằng bao nhiêu?",
                options: [22, 32, 33, 93],
                answer: 32,
                mascotHint: "9 : 3 = 3; 6 : 3 = 2. Kết quả 32.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 4.",
                  "34 × 2 = 68; 96 : 3 = 32.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 5 — SGK Bài 30-35 ═══
    {
      id: "g3-c5",
      name: "Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ",
      description:
        "Mi-li-mét, gam, mi-li-lít, nhiệt độ và đơn vị đo nhiệt độ (độ C)",
      icon: "🌡️",
      color: "#90be6d",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c5-l1",
          title: "Bài 1: Mi-li-mét (mm)",
          type: "learn",
          description: "Nhận biết mi-li-mét và quan hệ với xăng-ti-mét",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bề dày của quyển vở bé quá, đo bằng cm không chính xác. Ta cần đơn vị nhỏ hơn! 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Mi-li-mét",
                explanation:
                  "MI-LI-MÉT là đơn vị đo độ dài rất nhỏ. Viết tắt là mm.",
                rule: "1 cm = 10 mm. 1 m = 1 000 mm.",
                points: [
                  "Trên thước, giữa hai vạch cm có 10 vạch nhỏ là mm.",
                  "Mi-li-mét dùng đo bề dày quyển vở, đường kính viên bi.",
                  "3 cm = 30 mm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 cm = 10 mm\n1 m = 1 000 mm",
                ruler: {
                  lengthCm: 10,
                  measure: { from: 0, to: 10 },
                  label: "1 cm = 10 mm",
                },
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 cm", "10 mm"],
                    ["1 m", "1 000 mm"],
                  ],
                  label: "Mi-li-mét (mm)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 cm bằng bao nhiêu mi-li-mét?",
                options: ["1 mm", "10 mm", "100 mm", "1 000 mm"],
                answer: "10 mm",
                mascotHint: "1 cm = 10 mm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "5 cm bằng bao nhiêu mi-li-mét?",
                options: ["5 mm", "15 mm", "50 mm", "500 mm"],
                answer: "50 mm",
                mascotHint: "5 cm = 5 × 10 = 50 mm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["1 cm = 10 mm; 1 m = 1 000 mm.", "5 cm = 50 mm."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l2",
          title: "Bài 2: Gam (g)",
          type: "learn",
          description: "Nhận biết gam và quan hệ với ki-lô-gam",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một gói đường nặng 500 g. Vậy 1 kg bằng bao nhiêu gam nhỉ? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Gam",
                explanation:
                  "GAM là đơn vị đo khối lượng nhỏ hơn ki-lô-gam. Viết tắt là g.",
                rule: "1 kg = 1 000 g.",
                points: [
                  "Gam dùng để đo những vật nhẹ: gói đường, viên thuốc, thanh sô-cô-la.",
                  "500 g + 500 g = 1 000 g = 1 kg.",
                  "2 kg = 2 000 g.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 kg = 1 000 g\n500 g + 500 g = 1 kg",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 kg", "1 000 g"],
                    ["500 g + 500 g", "1 kg"],
                  ],
                  label: "Gam (g) — đơn vị đo khối lượng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 kg bằng bao nhiêu gam?",
                options: ["100 g", "1 000 g", "10 g", "10 000 g"],
                answer: "1 000 g",
                mascotHint: "1 kg = 1 000 g.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 kg bằng bao nhiêu gam?",
                options: ["200 g", "2 000 g", "20 g", "12 g"],
                answer: "2 000 g",
                mascotHint: "2 kg = 2 × 1 000 = 2 000 g.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["1 kg = 1 000 g.", "2 kg = 2 000 g."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l3",
          title: "Bài 3: Mi-li-lít (ml)",
          type: "learn",
          description: "Nhận biết mi-li-lít và quan hệ với lít",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hộp sữa nhỏ ghi 180 ml. Vậy 1 lít bằng bao nhiêu mi-li-lít nhỉ? 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Mi-li-lít",
                explanation:
                  "MI-LI-LÍT là đơn vị đo dung tích nhỏ hơn lít. Viết tắt là ml.",
                rule: "1 l = 1 000 ml.",
                points: [
                  "Mi-li-lít dùng đo lượng chất lỏng ít: hộp sữa, chai nước nhỏ.",
                  "1 l = 1 000 ml.",
                  "2 l = 2 000 ml.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 l = 1 000 ml\n2 l = 2 000 ml",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 l", "1 000 ml"],
                    ["2 l", "2 000 ml"],
                  ],
                  label: "Mi-li-lít (ml) — đơn vị đo dung tích",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 lít bằng bao nhiêu mi-li-lít?",
                options: ["100 ml", "1 000 ml", "10 ml", "10 000 ml"],
                answer: "1 000 ml",
                mascotHint: "1 l = 1 000 ml.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 l = 1 000 ml.",
                  "Mi-li-lít dùng đo lượng chất lỏng ít.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l4",
          title: "Bài 4: Nhiệt độ và đơn vị đo nhiệt độ",
          type: "learn",
          description: "Nhận biết độ C là đơn vị đo nhiệt độ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trời hôm nay nóng hay lạnh? Làm sao biết được nhỉ? 🌡️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Độ C",
                explanation:
                  "NHIỆT ĐỘ cho biết nóng hay lạnh. Đơn vị đo nhiệt độ thường dùng là ĐỘ C, viết là °C.",
                rule: "Nước đá đang tan ở 0 °C. Nước sôi ở 100 °C. Cơ thể người bình thường khoảng 37 °C.",
                points: [
                  "Số °C càng lớn thì càng nóng.",
                  "Số °C càng bé thì càng lạnh.",
                  "Đo nhiệt độ bằng nhiệt kế.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Nước đá tan:  0 °C\nCơ thể người: 37 °C\nNước sôi:     100 °C",
                table: {
                  headers: ["Hiện tượng", "Nhiệt độ"],
                  rows: [
                    ["Nước đá đang tan", "0 °C"],
                    ["Cơ thể người bình thường", "37 °C"],
                    ["Nước sôi", "100 °C"],
                  ],
                  label: "Nhiệt độ và đơn vị đo nhiệt độ (độ C)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đơn vị đo nhiệt độ thường dùng là gì?",
                options: [
                  "Độ C (°C)",
                  "Ki-lô-gam (kg)",
                  "Lít (l)",
                  "Xăng-ti-mét (cm)",
                ],
                answer: "Độ C (°C)",
                mascotHint: "Nhiệt độ đo bằng độ C.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Nước sôi ở bao nhiêu độ C?",
                options: ["0 °C", "37 °C", "100 °C", "1 000 °C"],
                answer: "100 °C",
                mascotHint: "Nước sôi ở 100 °C.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đơn vị đo nhiệt độ là độ C (°C).",
                  "Nước đá tan 0 °C; nước sôi 100 °C.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l5",
          title: "Bài 5: Đọc nhiệt kế",
          type: "learn",
          description: "Đọc số đo nhiệt độ trên nhiệt kế",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Nhiệt kế đo nhiệt độ cơ thể của Rô-bốt chỉ 36 °C. Rô-bốt có bị sốt không? 🌡️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Đọc nhiệt kế",
                explanation:
                  "Nhiệt kế có các vạch chia độ. Bé nhìn mức chất lỏng (hoặc số hiện trên màn hình) để đọc nhiệt độ.",
                rule: "Mực chỉ vạch 36 thì nhiệt độ là 36 °C.",
                points: [
                  "Nhiệt độ cơ thể bình thường khoảng 37 °C.",
                  "Trên 37 °C nhiều thì có thể bị sốt.",
                  "Dưới 0 °C là rất lạnh, nước có thể đóng băng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🌡️ 36 °C → bình thường\n🌡️ 39 °C → có thể bị sốt",
                table: {
                  headers: ["Nhiệt kế chỉ", "Nghĩa là"],
                  rows: [
                    ["36 °C", "bình thường"],
                    ["37 °C", "bình thường"],
                    ["39 °C", "có thể bị sốt"],
                  ],
                  label: "Đọc nhiệt kế — 1 °C = 1 độ C",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Nhiệt kế chỉ 39 °C. Điều đó cho biết gì?",
                options: [
                  "Có thể bị sốt",
                  "Bình thường",
                  "Rất lạnh",
                  "Nước đang sôi",
                ],
                answer: "Có thể bị sốt",
                mascotHint:
                  "37 °C là bình thường; 39 °C là cao hơn nhiều nên có thể bị sốt.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc nhiệt kế theo vạch chia hoặc số hiện trên màn hình.",
                  "Cơ thể bình thường khoảng 37 °C.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l6",
          title: "Bài 6: Thực hành với mi-li-mét, gam, mi-li-lít, độ C",
          type: "learn",
          description: "Ước lượng và đo các đại lượng nhỏ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé hãy ước lượng xem hộp sữa của mình chứa bao nhiêu ml nhé! 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Bốn đơn vị nhỏ",
                explanation:
                  "mm đo độ dài rất nhỏ; g đo khối lượng nhẹ; ml đo dung tích ít; °C đo nhiệt độ.",
                rule: "Bề dày quyển vở khoảng 5 mm. Viên kẹo nặng khoảng 5 g. Hộp sữa chứa 180 ml. Trà nóng khoảng 70 °C.",
                points: [
                  "Chọn đơn vị phù hợp với vật cần đo.",
                  "1 cm = 10 mm; 1 kg = 1 000 g; 1 l = 1 000 ml.",
                  "Ước lượng trước rồi đo để kiểm tra.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "mm → bề dày\ng  → vật nhẹ\nml → chất lỏng ít\n°C → nhiệt độ",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "Bề dày quyển vở khoảng 5 mm",
                },
                table: {
                  headers: ["Đơn vị", "Đo cái gì"],
                  rows: [
                    ["mm", "bề dày: quyển vở"],
                    ["g", "vật nhẹ: viên kẹo"],
                    ["ml", "chất lỏng ít: hộp sữa 180 ml"],
                    ["°C", "nhiệt độ: trà nóng 70 °C"],
                  ],
                  label: "Thực hành với mm, g, ml, °C",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đo bề dày của quyển vở thì dùng đơn vị nào?",
                options: [
                  "Mi-li-mét (mm)",
                  "Ki-lô-gam (kg)",
                  "Lít (l)",
                  "Độ C (°C)",
                ],
                answer: "Mi-li-mét (mm)",
                mascotHint: "Bề dày rất nhỏ nên dùng mi-li-mét.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hộp sữa nhỏ chứa 180 đơn vị nào?",
                options: ["ml", "kg", "mm", "°C"],
                answer: "ml",
                mascotHint: "Sữa là chất lỏng nên dùng mi-li-lít.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "mm đo độ dài nhỏ; g đo khối lượng nhẹ.",
                  "ml đo dung tích; °C đo nhiệt độ.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c5-l7",
          title: "Bài 7: Bảng quan hệ giữa các đơn vị đo",
          type: "learn",
          description: "Tổng hợp quan hệ giữa các đơn vị đo đã học",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đã học rất nhiều đơn vị đo. Mình xếp lại thành bảng cho dễ nhớ nhé! 📊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Bảng quan hệ",
                explanation:
                  "Mỗi đơn vị lớn gấp 10 lần hoặc 1 000 lần đơn vị nhỏ hơn cạnh nó.",
                rule: "1 cm = 10 mm · 1 m = 100 cm = 1 000 mm · 1 km = 1 000 m · 1 kg = 1 000 g · 1 l = 1 000 ml.",
                points: [
                  "Đổi từ đơn vị lớn sang nhỏ thì NHÂN.",
                  "Đổi từ đơn vị nhỏ sang lớn thì CHIA.",
                  "3 m = 300 cm = 3 000 mm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "con số 1 000: m↔mm · km↔m · kg↔g · l↔ml\ncon số 10:  cm↔mm",
                table: {
                  headers: ["Quan hệ", "Bằng"],
                  rows: [
                    ["1 cm", "10 mm"],
                    ["1 m", "100 cm = 1 000 mm"],
                    ["1 km", "1 000 m"],
                    ["1 kg", "1 000 g"],
                    ["1 l", "1 000 ml"],
                  ],
                  label: "Bảng quan hệ giữa các đơn vị đo",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 m bằng bao nhiêu xăng-ti-mét?",
                options: ["30 cm", "300 cm", "3 000 cm", "13 cm"],
                answer: "300 cm",
                mascotHint: "3 m = 3 × 100 = 300 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 kg bằng bao nhiêu gam?",
                options: ["300 g", "3 000 g", "30 g", "13 g"],
                answer: "3 000 g",
                mascotHint: "3 kg = 3 × 1 000 = 3 000 g.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 m = 100 cm = 1 000 mm; 1 kg = 1 000 g; 1 l = 1 000 ml.",
                  "Đổi lớn sang nhỏ thì nhân.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c5-l8",
          title: "Bài 8: Luyện tập chung chủ đề 5",
          type: "learn",
          description: "Ôn tập mm, g, ml và độ C",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã có thêm bốn đơn vị đo mới! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 5",
                explanation: "Bé đã học mi-li-mét, gam, mi-li-lít và độ C.",
                points: [
                  "1 cm = 10 mm; 1 m = 1 000 mm.",
                  "1 kg = 1 000 g; 1 l = 1 000 ml.",
                  "Nhiệt độ đo bằng độ C; nước sôi 100 °C.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 kg = 1 000 g\n1 l = 1 000 ml\n1 cm = 10 mm",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 kg", "1 000 g"],
                    ["1 l", "1 000 ml"],
                    ["1 cm", "10 mm"],
                    ["1 m", "1 000 mm"],
                  ],
                  label: "Luyện tập chung chủ đề 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "40 mm bằng bao nhiêu xăng-ti-mét?",
                options: ["4 cm", "40 cm", "400 cm", "14 cm"],
                answer: "4 cm",
                mascotHint: "Đổi nhỏ sang lớn thì chia: 40 : 10 = 4 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 000 ml bằng bao nhiêu lít?",
                options: ["2 l", "20 l", "200 l", "12 l"],
                answer: "2 l",
                mascotHint: "2 000 : 1 000 = 2 l.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 5.",
                  "40 mm = 4 cm; 2 000 ml = 2 l.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 6 — SGK Bài 36-40 ═══
    {
      id: "g3-c6",
      name: "Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000",
      description:
        "Nhân chia số có ba chữ số với số có một chữ số; biểu thức số; so sánh số lớn gấp mấy lần số bé",
      icon: "🔢",
      color: "#4361ee",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c6-l1",
          title: "Bài 1: Nhân số có ba chữ số với số có một chữ số (không nhớ)",
          type: "learn",
          description: "Đặt tính và nhân dạng 213 × 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mỗi thùng có 213 quyển vở, có 3 thùng. Có tất cả bao nhiêu quyển? 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân ba chữ số với một chữ số",
                explanation:
                  "Bé nhân lần lượt từ HÀNG ĐƠN VỊ, đến HÀNG CHỤC, rồi HÀNG TRĂM.",
                rule: "213 × 3: 3 × 3 = 9; 1 × 3 = 3; 2 × 3 = 6. Kết quả 639.",
                points: [
                  "Nhân từ phải sang trái như phép cộng.",
                  "Không nhớ nghĩa là từng hàng nhân ra đều bé hơn 10.",
                  "213 × 3 = 639 (quyển vở).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  213\n×   3\n  639",
                operation: { left: 213, sign: "×", right: 3, result: 639 },
                placeValue: {
                  headers: ["Trăm", "Chục", "Đơn vị"],
                  digits: [2, 1, 3],
                  label: "213 × 3: 3 × 3 = 9; 1 × 3 = 3; 2 × 3 = 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "213 × 3 bằng bao nhiêu?",
                options: [539, 639, 693, 216],
                answer: 639,
                mascotHint: "3 × 3 = 9; 1 × 3 = 3; 2 × 3 = 6. Kết quả 639.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "321 × 2 bằng bao nhiêu?",
                options: [642, 623, 342, 643],
                answer: 642,
                mascotHint: "1 × 2 = 2; 2 × 2 = 4; 3 × 2 = 6. Kết quả 642.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân từ hàng đơn vị sang hàng trăm.",
                  "213 × 3 = 639.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l2",
          title: "Bài 2: Nhân số có ba chữ số với số có một chữ số (có nhớ)",
          type: "learn",
          description: "Đặt tính và nhân dạng 216 × 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "216 × 3 thì 6 × 3 = 18, phải nhớ rồi. Bé làm cẩn thận nhé! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân ba chữ số có nhớ",
                explanation:
                  "Nếu một hàng nhân ra từ 10 trở lên thì viết chữ số hàng đơn vị và NHỚ sang hàng bên trái.",
                rule: "216 × 3: 6 × 3 = 18, viết 8 nhớ 1. 1 × 3 = 3, thêm 1 nhớ = 4. 2 × 3 = 6. Kết quả 648.",
                points: [
                  "Nhớ 1 sang hàng liền trái.",
                  "Có thể phải nhớ nhiều hàng.",
                  "Đừng quên cộng số nhớ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  216\n×   3\n  648\n6 × 3 = 18 → viết 8 nhớ 1\n1 × 3 + 1 = 4",
                operation: { left: 216, sign: "×", right: 3, result: 648 },
                placeValue: {
                  headers: ["Trăm", "Chục", "Đơn vị"],
                  digits: [2, 1, 6],
                  label:
                    "216 × 3: 6 × 3 = 18 viết 8 nhớ 1; 1 × 3 = 3 thêm 1 = 4",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "216 × 3 bằng bao nhiêu?",
                options: [548, 618, 648, 638],
                answer: 648,
                mascotHint: "6×3=18 viết 8 nhớ 1; 1×3+1=4; 2×3=6. Kết quả 648.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "135 × 4 bằng bao nhiêu?",
                options: [420, 540, 450, 520],
                answer: 540,
                mascotHint:
                  "5×4=20 viết 0 nhớ 2; 3×4+2=14 viết 4 nhớ 1; 1×4+1=5. Kết quả 540.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân có nhớ: nhớ sang hàng liền trái.",
                  "216 × 3 = 648; 135 × 4 = 540.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l3",
          title: "Bài 3: Chia số có ba chữ số cho số có một chữ số",
          type: "learn",
          description: "Đặt tính và chia dạng 639 : 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 639 quyển vở chia đều vào 3 thùng. Mỗi thùng có mấy quyển? 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chia ba chữ số cho một chữ số",
                explanation:
                  "Bé chia lần lượt từ HÀNG TRĂM, đến HÀNG CHỤC, rồi HÀNG ĐƠN VỊ.",
                rule: "639 : 3: 6 : 3 = 2; 3 : 3 = 1; 9 : 3 = 3. Kết quả 213.",
                points: [
                  "Chia từ trái sang phải.",
                  "639 : 3 = 213 quyển vở.",
                  "Thử lại: 213 × 3 = 639 ✓",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "639 : 3 = 213\n6:3=2;  3:3=1;  9:3=3",
                operation: { left: 639, sign: ":", right: 3, result: 213 },
                placeValue: {
                  headers: ["Trăm", "Chục", "Đơn vị"],
                  digits: [6, 3, 9],
                  label: "639 : 3: 6 : 3 = 2; 3 : 3 = 1; 9 : 3 = 3",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "639 : 3 bằng bao nhiêu?",
                options: [203, 213, 223, 312],
                answer: 213,
                mascotHint: "6:3=2; 3:3=1; 9:3=3. Kết quả 213.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "486 : 2 bằng bao nhiêu?",
                options: [243, 234, 143, 343],
                answer: 243,
                mascotHint: "4:2=2; 8:2=4; 6:2=3. Kết quả 243.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chia từ hàng trăm sang hàng đơn vị.",
                  "639 : 3 = 213.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l4",
          title: "Bài 4: Chia số có ba chữ số cho số có một chữ số (có dư)",
          type: "learn",
          description: "Chia có dư với số có ba chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 640 quyển vở chia vào 3 thùng. Chia hết được không nhỉ? 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chia có dư",
                explanation:
                  "Nếu hàng đơn vị không chia hết thì còn lại số dư. Số dư luôn BÉ HƠN số chia.",
                rule: "640 : 3: 6 : 3 = 2; 4 : 3 = 1 dư 1; hạ 0 xuống được 10; 10 : 3 = 3 dư 1. Kết quả 213 dư 1.",
                points: [
                  "Thử lại: 213 × 3 + 1 = 639 + 1 = 640 ✓",
                  "Số dư 1 bé hơn số chia 3 ✓",
                  "Vậy 640 : 3 = 213 (dư 1).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "640 : 3 = 213 (dư 1)\n213 × 3 + 1 = 640",
                operation: { left: 640, sign: ":", right: 3, result: 213 },
                table: {
                  headers: ["Bước", "Làm"],
                  rows: [
                    ["1", "6 : 3 = 2"],
                    ["2", "4 : 3 = 1 dư 1"],
                    ["3", "hạ 0 xuống được 10; 10 : 3 = 3 dư 1"],
                    ["Kết quả", "640 : 3 = 213 (dư 1)"],
                  ],
                  label: "Chia số có ba chữ số cho số có một chữ số (có dư)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "640 : 3 bằng bao nhiêu?",
                options: ["213 dư 1", "213 dư 2", "210 dư 1", "223 dư 1"],
                answer: "213 dư 1",
                mascotHint: "213 × 3 = 639, còn dư 1. Vậy 640 : 3 = 213 dư 1.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Số dư luôn bé hơn số chia.", "640 : 3 = 213 dư 1."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l5",
          title: "Bài 5: Biểu thức số",
          type: "learn",
          description: "Nhận biết biểu thức số và tính giá trị của nó",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "12 + 5 × 2 — bé tính thế nào nhỉ? Thứ tự quan trọng lắm đấy! 🧮",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Biểu thức số",
                explanation:
                  "BIỂU THỨC SỐ là một dãy các số và dấu phép tính. Kết quả tìm được gọi là GIÁ TRỊ của biểu thức.",
                rule: "Biểu thức 12 + 5 có giá trị là 17. Biểu thức 20 − 8 có giá trị là 12.",
                points: [
                  "Biểu thức có thể chỉ có một phép tính.",
                  "Biểu thức có thể có nhiều phép tính.",
                  "Đọc biểu thức rồi mới tính.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 + 5  →  giá trị 17\n20 − 8  →  giá trị 12",
                operation: { left: 12, sign: "+", right: 5, result: 17 },
                table: {
                  headers: ["Biểu thức", "Giá trị"],
                  rows: [
                    ["12 + 5", "17"],
                    ["20 − 8", "12"],
                  ],
                  label: "Biểu thức số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Giá trị của biểu thức 25 + 13 là bao nhiêu?",
                options: [12, 38, 35, 40],
                answer: 38,
                mascotHint: "25 + 13 = 38.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Biểu thức số là dãy số và dấu phép tính.",
                  "Kết quả tìm được gọi là giá trị của biểu thức.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l6",
          title: "Bài 6: Tính giá trị biểu thức có hai phép tính",
          type: "learn",
          description: "Thực hiện đúng thứ tự phép tính trong biểu thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "12 + 5 × 2 cho hai kết quả khác nhau tuỳ cách tính! Bé xem quy tắc nhé 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Quy Tắc",
                title: "Thứ tự thực hiện phép tính",
                explanation:
                  "Nếu biểu thức chỉ có cộng và trừ (hoặc chỉ nhân và chia) thì làm từ trái sang phải. Nếu có cả nhân chia và cộng trừ thì làm NHÂN CHIA TRƯỚC. Có ngoặc thì làm trong ngoặc TRƯỚC.",
                rule: "12 + 5 × 2 = 12 + 10 = 22. Còn (12 + 5) × 2 = 17 × 2 = 34.",
                points: [
                  "Nhân, chia trước; cộng, trừ sau.",
                  "Ngoặc tròn ( ) luôn làm trước hết.",
                  "Cùng mức ưu tiên thì làm từ trái sang phải.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 + 5 × 2 = 12 + 10 = 22\n(12 + 5) × 2 = 17 × 2 = 34",
                operation: { left: 5, sign: "×", right: 2, result: 10 },
                table: {
                  headers: ["Biểu thức", "Tính", "Giá trị"],
                  rows: [
                    ["12 + 5 × 2", "12 + 10", "22"],
                    ["(12 + 5) × 2", "17 × 2", "34"],
                  ],
                  label:
                    "Nhân chia trước, cộng trừ sau — có ngoặc thì làm trong ngoặc trước",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Giá trị của biểu thức 12 + 5 × 2 là bao nhiêu?",
                options: [22, 34, 27, 17],
                answer: 22,
                mascotHint: "Nhân trước: 5 × 2 = 10; rồi 12 + 10 = 22.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Giá trị của biểu thức (12 + 5) × 2 là bao nhiêu?",
                options: [22, 34, 27, 19],
                answer: 34,
                mascotHint:
                  "Làm trong ngoặc trước: 12 + 5 = 17; rồi 17 × 2 = 34.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân chia trước, cộng trừ sau.",
                  "Ngoặc tròn làm trước hết.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c6-l7",
          title: "Bài 7: So sánh số lớn gấp mấy lần số bé",
          type: "learn",
          description: "Tìm xem số lớn gấp mấy lần số bé",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Đoạn thẳng AB dài 12 cm, đoạn CD dài 3 cm. AB gấp mấy lần CD? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Muốn biết gấp mấy lần thì chia",
                explanation:
                  "Muốn biết số lớn gấp mấy lần số bé, ta lấy SỐ LỚN chia cho SỐ BÉ.",
                rule: "12 : 3 = 4. Vậy đoạn AB dài gấp 4 lần đoạn CD.",
                points: [
                  "'Gấp mấy lần' thì dùng phép chia.",
                  "12 gấp 4 lần 3.",
                  "Đừng nhầm với 'gấp lên mấy lần' (bài đó dùng phép nhân).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "AB = 12 cm, CD = 3 cm\n12 : 3 = 4 → AB gấp 4 lần CD",
                operation: { left: 12, sign: ":", right: 3, result: 4 },
                barModel: {
                  rows: [
                    { label: "Đoạn AB", parts: 12 },
                    { label: "Đoạn CD", parts: 3 },
                  ],
                  braceLabel: "AB gấp 4 lần CD",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn AB dài 12 cm, đoạn CD dài 3 cm. Đoạn AB dài gấp mấy lần đoạn CD?",
                options: ["3 lần", "4 lần", "9 lần", "15 lần"],
                answer: "4 lần",
                mascotHint: "12 : 3 = 4 lần.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 20 gấp mấy lần số 5?",
                options: ["3 lần", "4 lần", "5 lần", "15 lần"],
                answer: "4 lần",
                mascotHint: "20 : 5 = 4 lần.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Muốn biết gấp mấy lần thì chia số lớn cho số bé.",
                  "12 : 3 = 4 lần.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c6-l8",
          title: "Bài 8: Luyện tập chung chủ đề 6",
          type: "learn",
          description: "Ôn tập nhân chia trong phạm vi 1 000 và biểu thức số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã tính được với số có ba chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 6",
                explanation:
                  "Bé đã học nhân chia số có ba chữ số với số có một chữ số, biểu thức số và so sánh gấp mấy lần.",
                points: [
                  "Nhân: nhân từng hàng, nhớ khi cần.",
                  "Chia: chia từng hàng từ trái sang phải.",
                  "Biểu thức: nhân chia trước, cộng trừ sau; ngoặc làm trước.",
                  "Gấp mấy lần: lấy số lớn chia số bé.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "213 × 3 = 639\n639 : 3 = 213\n12 + 5 × 2 = 22",
                operation: { left: 213, sign: "×", right: 3, result: 639 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["213 × 3", "639"],
                    ["639 : 3", "213"],
                    ["12 + 5 × 2", "22"],
                  ],
                  label: "Luyện tập chung chủ đề 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "124 × 2 bằng bao nhiêu?",
                options: [228, 248, 268, 126],
                answer: 248,
                mascotHint: "4 × 2 = 8; 2 × 2 = 4; 1 × 2 = 2. Kết quả 248.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Giá trị của biểu thức 20 − 8 : 2 là bao nhiêu?",
                options: [6, 16, 12, 9],
                answer: 16,
                mascotHint: "Chia trước: 8 : 2 = 4; rồi 20 − 4 = 16.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 6.",
                  "124 × 2 = 248; 20 − 8 : 2 = 16.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 7 — SGK Bài 41-44 ═══
    {
      id: "g3-c7",
      name: "Chủ đề 7: Ôn tập học kì 1",
      description: "Ôn tập phép nhân chia, biểu thức số, hình học và đo lường",
      icon: "📖",
      color: "#ef476f",
      totalLessons: 5,
      lessons: [
        {
          id: "g3-c7-l1",
          title:
            "Bài 1: Ôn tập phép nhân, phép chia trong phạm vi 100 và 1 000",
          type: "learn",
          description:
            "Ôn tập nhân chia số có hai và ba chữ số với số có một chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Hết học kì 1 rồi! Mình cùng ôn lại phép nhân và phép chia nhé 📖",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Nhân chia số có nhiều chữ số",
                explanation:
                  "Nhân thì nhân từng hàng từ phải sang trái. Chia thì chia từng hàng từ trái sang phải.",
                rule: "26 × 3 = 78; 216 × 3 = 648; 639 : 3 = 213; 48 : 4 = 12.",
                points: [
                  "Nhân có nhớ thì nhớ sang hàng liền trái.",
                  "Chia có dư thì số dư luôn bé hơn số chia.",
                  "Thử lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "216 × 3 = 648    648 : 3 = 216\n26 × 3 = 78       78 : 3 = 26",
                operation: { left: 216, sign: "×", right: 3, result: 648 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["26 × 3", "78"],
                    ["216 × 3", "648"],
                    ["639 : 3", "213"],
                    ["48 : 4", "12"],
                  ],
                  label: "Ôn tập nhân chia trong phạm vi 100 và 1 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "248 × 2 bằng bao nhiêu?",
                options: [446, 486, 496, 250],
                answer: 496,
                mascotHint:
                  "8 × 2 = 16 viết 6 nhớ 1; 4 × 2 + 1 = 9; 2 × 2 = 4. Kết quả 496.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "864 : 4 bằng bao nhiêu?",
                options: [206, 216, 226, 262],
                answer: 216,
                mascotHint:
                  "8:4=2; 6:4=1 dư 2; hạ 4 được 24; 24:4=6. Kết quả 216.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân từ phải sang trái; chia từ trái sang phải.",
                  "248 × 2 = 496; 864 : 4 = 216.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c7-l2",
          title: "Bài 2: Ôn tập biểu thức số",
          type: "learn",
          description: "Ôn tập tính giá trị biểu thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Nhân chia trước, cộng trừ sau — bé còn nhớ quy tắc này chứ? 🧮",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Thứ tự thực hiện phép tính",
                explanation:
                  "Trong ngoặc trước. Rồi nhân chia. Cuối cùng cộng trừ.",
                rule: "12 + 5 × 2 = 22. (12 + 5) × 2 = 34. 20 − 8 : 2 = 16.",
                points: [
                  "Cùng mức ưu tiên thì làm từ trái sang phải.",
                  "Ngoặc tròn luôn làm trước hết.",
                  "Tính cẩn thận từng bước một.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 + 5 × 2 = 12 + 10 = 22\n20 − 8 : 2 = 20 − 4 = 16",
                table: {
                  headers: ["Biểu thức", "Giá trị"],
                  rows: [
                    ["12 + 5 × 2", "22"],
                    ["(12 + 5) × 2", "34"],
                    ["20 − 8 : 2", "16"],
                  ],
                  label: "Ôn tập biểu thức số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Giá trị của biểu thức 30 − 6 × 4 là bao nhiêu?",
                options: [6, 96, 24, 8],
                answer: 6,
                mascotHint: "Nhân trước: 6 × 4 = 24; rồi 30 − 24 = 6.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Trong ngoặc → nhân chia → cộng trừ.",
                  "30 − 6 × 4 = 6.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c7-l3",
          title: "Bài 3: Ôn tập hình học",
          type: "learn",
          description:
            "Ôn tập hình học học kì 1: trung điểm, hình tròn, góc, hình chữ nhật, hình vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Các hình đang chờ bé ôn lại đấy! 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Hình học học kì 1",
                explanation:
                  "Bé đã học điểm ở giữa, trung điểm, hình tròn, góc và các hình phẳng, hình khối.",
                rule: "Đường kính = 2 × bán kính. Hình vuông và hình chữ nhật có 4 góc vuông.",
                points: [
                  "Trung điểm chia đoạn thẳng thành hai phần bằng nhau.",
                  "Hình tam giác: 3 cạnh; hình tứ giác: 4 cạnh.",
                  "Ê-ke kiểm tra góc vuông; compa vẽ đường tròn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "d = 2 × r\n▢ 4 góc vuông · 🔺 3 cạnh",
                circleParts: {
                  radius: 3,
                  diameter: 6,
                  label: "Đường kính = 2 × bán kính",
                },
                planeShape: {
                  kind: "square",
                  formula: "4 góc vuông · 4 cạnh bằng nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình tròn có bán kính 6 cm. Đường kính dài bao nhiêu?",
                options: ["3 cm", "6 cm", "12 cm", "36 cm"],
                answer: "12 cm",
                mascotHint: "Đường kính = 2 × 6 = 12 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đường kính = 2 × bán kính.",
                  "Bán kính 6 cm thì đường kính 12 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c7-l4",
          title: "Bài 4: Ôn tập đo lường",
          type: "learn",
          description:
            "Ôn tập các đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé đã học bao nhiêu đơn vị đo rồi nhỉ? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Các đơn vị đo của học kì 1",
                explanation:
                  "Độ dài: mm, cm, dm, m, km. Khối lượng: g, kg. Dung tích: ml, l. Nhiệt độ: °C.",
                rule: "1 cm = 10 mm; 1 m = 1 000 mm; 1 kg = 1 000 g; 1 l = 1 000 ml.",
                points: [
                  "Đổi lớn sang nhỏ thì nhân; nhỏ sang lớn thì chia.",
                  "Nước sôi ở 100 °C, nước đá tan ở 0 °C.",
                  "Chọn đơn vị phù hợp với vật.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 kg = 1 000 g\n1 l = 1 000 ml\n1 m = 1 000 mm",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 cm", "10 mm"],
                    ["1 m", "1 000 mm"],
                    ["1 kg", "1 000 g"],
                    ["1 l", "1 000 ml"],
                  ],
                  label: "Ôn tập đo lường",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 kg bằng bao nhiêu gam?",
                options: ["400 g", "4 000 g", "40 g", "14 g"],
                answer: "4 000 g",
                mascotHint: "4 × 1 000 = 4 000 g.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 000 ml bằng bao nhiêu lít?",
                options: ["3 l", "30 l", "300 l", "13 l"],
                answer: "3 l",
                mascotHint: "3 000 : 1 000 = 3 l.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 kg = 1 000 g; 1 l = 1 000 ml; 1 m = 1 000 mm.",
                  "4 kg = 4 000 g; 3 000 ml = 3 l.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c7-l5",
          title: "Bài 5: Ôn tập chung học kì 1",
          type: "learn",
          description: "Ôn tập tổng hợp toàn bộ học kì 1 lớp 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã đi hết nửa năm Lớp 3 rồi! Cùng nhìn lại nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập Chung",
                title: "Học kì 1 bé đã học gì?",
                explanation:
                  "Bé đã học tám bảng nhân chia, nhân chia số có hai và ba chữ số, hình học, đo lường và biểu thức số.",
                points: [
                  "Bảng nhân chia 2, 3, 4, 5, 6, 7, 8, 9.",
                  "Nhân chia số có hai, ba chữ số với số có một chữ số.",
                  "Trung điểm, hình tròn, góc, các hình phẳng và hai loại khối.",
                  "Đơn vị đo: mm, cm, dm, m, km, g, kg, ml, l, °C.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "8 bảng nhân chia · Nhân chia · Hình học · Đo lường · Biểu thức",
                table: {
                  headers: ["Mạch kiến thức", "Ví dụ"],
                  rows: [
                    ["8 bảng nhân chia", "9 × 7 = 63"],
                    ["Nhân chia", "216 × 3 = 648"],
                    ["Hình học", "d = 2 × r"],
                    ["Đo lường", "1 kg = 1 000 g"],
                    ["Biểu thức", "12 + 5 × 2 = 22"],
                  ],
                  label: "Ôn tập chung học kì 1",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 215 kg gạo chia đều vào 5 bao. Mỗi bao có bao nhiêu ki-lô-gam gạo?",
                options: ["41 kg", "43 kg", "45 kg", "53 kg"],
                answer: "43 kg",
                mascotHint: "215 : 5 = 43 kg gạo.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "9 × 7 bằng bao nhiêu?",
                options: [56, 63, 72, 16],
                answer: 63,
                mascotHint: "9 × 7 = 63.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé giỏi lắm:",
                points: [
                  "Bé đã hoàn thành học kì 1 của Lớp 3.",
                  "Sang học kì 2, bé sẽ học các số đến 10 000 và 100 000.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 8 — SGK Bài 45-49 ═══
    {
      id: "g3-c8",
      name: "Chủ đề 8: Các số đến 10 000",
      description:
        "Các số có bốn chữ số, số 10 000, so sánh số, chữ số La Mã, làm tròn số",
      icon: "💯",
      color: "#118ab2",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c8-l1",
          title: "Bài 1: Các số có bốn chữ số",
          type: "learn",
          description: "Nhận biết hàng nghìn, trăm, chục, đơn vị",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một nghìn quyển vở là rất nhiều! Số 2 475 có tới bốn chữ số đấy 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Số có bốn chữ số",
                explanation:
                  "Số có bốn chữ số gồm HÀNG NGHÌN, HÀNG TRĂM, HÀNG CHỤC và HÀNG ĐƠN VỊ.",
                rule: "Số 2 475 gồm 2 nghìn, 4 trăm, 7 chục và 5 đơn vị.",
                points: [
                  "2 475 = 2 000 + 400 + 70 + 5.",
                  "Chữ số tận cùng bên trái chỉ hàng nghìn.",
                  "10 trăm = 1 nghìn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 475\n2 → nghìn · 4 → trăm · 7 → chục · 5 → đơn vị",
                placeValue: {
                  headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [2, 4, 7, 5],
                  label: "2 475 gồm 2 nghìn, 4 trăm, 7 chục và 5 đơn vị",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Số 3 582 gồm mấy nghìn, mấy trăm, mấy chục, mấy đơn vị?",
                options: [
                  "3 nghìn, 5 trăm, 8 chục, 2 đơn vị",
                  "2 nghìn, 8 trăm, 5 chục, 3 đơn vị",
                  "3 nghìn, 8 trăm, 5 chục, 2 đơn vị",
                  "35 trăm và 82 đơn vị",
                ],
                answer: "3 nghìn, 5 trăm, 8 chục, 2 đơn vị",
                mascotHint:
                  "Đọc từ trái sang: 3 là nghìn, 5 là trăm, 8 là chục, 2 là đơn vị.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số có bốn chữ số gồm nghìn, trăm, chục, đơn vị.",
                  "2 475 = 2 000 + 400 + 70 + 5.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c8-l2",
          title: "Bài 2: Số 10 000",
          type: "learn",
          description: "Nhận biết 10 nghìn bằng 10 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt có 9 999 viên bi, được cho thêm 1 viên nữa. Có bao nhiêu viên nhỉ? 🔵",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Mười nghìn",
                explanation:
                  "10 nghìn gộp lại thành 1 CHỤC NGHÌN. Số mười nghìn viết là 10 000.",
                rule: "10 000 = 10 nghìn. Đọc là: mười nghìn.",
                points: [
                  "9 999 thêm 1 được 10 000.",
                  "10 000 là số có năm chữ số đầu tiên.",
                  "10 000 gồm 1 chục nghìn, 0 nghìn, 0 trăm, 0 chục, 0 đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "9 999  —  10 000\n10 nghìn = 1 chục nghìn",
                placeValue: {
                  headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [1, 0, 0, 0, 0],
                  label: "10 000 = 1 chục nghìn — đọc là mười nghìn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền sau của 9 999 là số nào?",
                options: [9998, 10000, 10001, 100000],
                answer: 10000,
                mascotHint: "9 999 thêm 1 được 10 000.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 000 gồm mấy chục nghìn?",
                options: [
                  "1 chục nghìn",
                  "10 chục nghìn",
                  "0 chục nghìn",
                  "100 chục nghìn",
                ],
                answer: "1 chục nghìn",
                mascotHint: "10 000 = 1 chục nghìn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "10 000 = 10 nghìn = 1 chục nghìn.",
                  "Số liền sau của 9 999 là 10 000.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c8-l3",
          title: "Bài 3: Đọc và viết số có bốn chữ số",
          type: "learn",
          description: "Đọc, viết số có bốn chữ số kể cả khi có chữ số 0",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Số 4 005 đọc thế nào nhỉ? Có hai chữ số 0 ở giữa đấy! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đọc số có bốn chữ số",
                explanation:
                  "Bé đọc hàng nghìn, rồi hàng trăm, hàng chục, hàng đơn vị. Chữ số 0 ở giữa thì đọc là 'không' hoặc 'linh' tuỳ vị trí.",
                rule: "2 475 đọc là: hai nghìn bốn trăm bảy mươi lăm. 4 005 đọc là: bốn nghìn không trăm linh năm.",
                points: [
                  "4 005: hàng trăm là 0 nên đọc 'không trăm'.",
                  "4 050 đọc là: bốn nghìn không trăm năm mươi.",
                  "4 500 đọc là: bốn nghìn năm trăm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 475 → hai nghìn bốn trăm bảy mươi lăm\n4 005 → bốn nghìn không trăm linh năm",
                placeValue: {
                  headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [4, 0, 0, 5],
                  label: "4 005 đọc là bốn nghìn không trăm linh năm",
                },
                table: {
                  headers: ["Số", "Đọc là"],
                  rows: [
                    ["2 475", "hai nghìn bốn trăm bảy mươi lăm"],
                    ["4 005", "bốn nghìn không trăm linh năm"],
                  ],
                  label: "Đọc và viết số có bốn chữ số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 3 060 đọc là gì?",
                options: [
                  "Ba nghìn không trăm sáu mươi",
                  "Ba nghìn sáu mươi",
                  "Ba nghìn sáu trăm",
                  "Ba mươi nghìn sáu mươi",
                ],
                answer: "Ba nghìn không trăm sáu mươi",
                mascotHint: "Hàng trăm là 0 nên đọc 'không trăm'.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc lần lượt nghìn, trăm, chục, đơn vị.",
                  "Chữ số 0 ở hàng trăm thì đọc 'không trăm'.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c8-l4",
          title: "Bài 4: So sánh các số trong phạm vi 10 000",
          type: "learn",
          description: "So sánh hai số có bốn chữ số theo từng hàng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "3 456 và 3 465, số nào lớn hơn? Hai số này giống nhau quá! 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "So từng hàng từ trái sang phải",
                explanation:
                  "Bé so hàng NGHÌN trước. Bằng nhau thì so hàng TRĂM, rồi hàng CHỤC, rồi hàng ĐƠN VỊ.",
                rule: "3 456 và 3 465: nghìn bằng nhau (3 = 3), trăm bằng nhau (4 = 4), chục 5 < 6. Vậy 3 456 < 3 465.",
                points: [
                  "Chỉ so tiếp khi hàng trước bằng nhau.",
                  "Số có nhiều chữ số hơn thì lớn hơn: 10 000 > 9 999.",
                  "4 500 > 3 999 vì 4 nghìn > 3 nghìn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 456  <  3 465\n(3=3; 4=4; 5 < 6)",
                comparison: { left: 3456, sign: "<", right: 3465 },
                table: {
                  headers: ["Hàng", "So sánh"],
                  rows: [
                    ["Nghìn", "3 = 3"],
                    ["Trăm", "4 = 4"],
                    ["Chục", "5 < 6"],
                  ],
                  label: "3 456 < 3 465 vì hàng chục 5 < 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 3 456 và 3 465, số nào lớn hơn?",
                options: [3456, 3465, "Hai số bằng nhau"],
                answer: 3465,
                mascotHint:
                  "Nghìn và trăm bằng nhau, so chục: 5 < 6 nên 3 456 < 3 465.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 5 200 và 4 999, số nào lớn hơn?",
                options: [5200, 4999, "Hai số bằng nhau"],
                answer: 5200,
                mascotHint: "5 nghìn > 4 nghìn nên 5 200 > 4 999.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "So từ hàng nghìn sang hàng đơn vị.",
                  "3 456 < 3 465; 5 200 > 4 999.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c8-l5",
          title: "Bài 5: Làm quen với chữ số La Mã",
          type: "learn",
          description: "Nhận biết các chữ số La Mã thường dùng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trên mặt đồng hồ cổ có ghi I, II, III... Đó là chữ số La Mã đấy! 🕰️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Ba chữ số La Mã cơ bản",
                explanation:
                  "CHỮ SỐ LA MÃ dùng các chữ cái để viết số. Ba chữ cái bé cần nhớ: I = 1, V = 5, X = 10.",
                rule: "I = 1 · V = 5 · X = 10.",
                points: [
                  "I là một vạch: 1.",
                  "V là hình chữ V: 5.",
                  "X là hình chữ X: 10.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "I = 1   V = 5   X = 10",
                table: {
                  headers: ["Chữ số La Mã", "Giá trị"],
                  rows: [
                    ["I", 1],
                    ["V", 5],
                    ["X", 10],
                  ],
                  label: "Làm quen với chữ số La Mã",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Chữ số La Mã V có giá trị là bao nhiêu?",
                options: [1, 5, 10, 50],
                answer: 5,
                mascotHint: "V = 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "I = 1; V = 5; X = 10.",
                  "Chữ số La Mã dùng chữ cái để viết số.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c8-l6",
          title: "Bài 6: Đọc và viết số La Mã từ I đến XII",
          type: "learn",
          description: "Đọc, viết các số La Mã thường dùng trên đồng hồ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đọc được hết các số La Mã trên mặt đồng hồ chưa? 🕐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các số La Mã từ I đến XII",
                explanation:
                  "Chữ I đứng trước X hoặc V thì bớt đi 1; đứng sau thì thêm vào.",
                rule: "I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII.",
                points: [
                  "IV = 5 − 1 = 4 (I đứng trước V).",
                  "VI = 5 + 1 = 6 (I đứng sau V).",
                  "IX = 10 − 1 = 9.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "I II III IV V VI VII VIII IX X XI XII\n1  2   3   4 5  6   7    8  9 10 11 12",
                table: {
                  headers: [
                    "I",
                    "II",
                    "III",
                    "IV",
                    "V",
                    "VI",
                    "VII",
                    "VIII",
                    "IX",
                    "X",
                    "XI",
                    "XII",
                  ],
                  rows: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
                  label:
                    "Chữ số La Mã từ I đến XII — dùng để ghi giờ và số thứ tự",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số La Mã IV có giá trị là bao nhiêu?",
                options: [4, 6, 5, 9],
                answer: 4,
                mascotHint: "I đứng trước V nên bớt 1: 5 − 1 = 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 9 viết bằng chữ số La Mã thế nào?",
                options: ["VIIII", "IX", "XI", "IV"],
                answer: "IX",
                mascotHint: "I đứng trước X nên 10 − 1 = 9 → IX.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "IV = 4; VI = 6; IX = 9; XI = 11.",
                  "Chữ I đứng trước thì bớt 1, đứng sau thì thêm 1.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c8-l7",
          title: "Bài 7: Làm tròn số đến hàng chục, hàng trăm",
          type: "learn",
          description: "Làm tròn số theo chữ số bên phải",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 24 bạn, nói 'khoảng 20 bạn' hay 'khoảng 30 bạn' gần đúng hơn nhỉ? 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Quy tắc làm tròn",
                explanation:
                  "Bé nhìn chữ số ĐỨNG NGAY SAU hàng cần làm tròn. Nếu chữ số đó là 1, 2, 3, 4 thì làm tròn XUỐNG. Nếu là 5, 6, 7, 8, 9 thì làm tròn LÊN.",
                rule: "24 làm tròn đến hàng chục: chữ số sau hàng chục là 4 < 5 nên làm tròn xuống → 20. 27 → 30 (vì 7 ≥ 5).",
                points: [
                  "1, 2, 3, 4 → làm tròn xuống.",
                  "5, 6, 7, 8, 9 → làm tròn lên.",
                  "Làm tròn đến hàng trăm thì nhìn chữ số hàng chục.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 → 20   (4 < 5, xuống)\n27 → 30   (7 ≥ 5, lên)\n320 → 300 (2 < 5, xuống)\n360 → 400 (6 ≥ 5, lên)",
                numberLine: {
                  from: 20,
                  to: 30,
                  step: 1,
                  marks: [24, 25, 30],
                  hops: [{ from: 24, to: 20, label: "4 < 5 ⇒ xuống" }],
                  label: "24 làm tròn đến hàng chục = 20",
                },
                table: {
                  headers: ["Làm tròn", "Vì sao"],
                  rows: [
                    ["24 → 20", "4 < 5, làm tròn xuống"],
                    ["27 → 30", "7 ≥ 5, làm tròn lên"],
                    ["320 → 300", "2 < 5, làm tròn xuống"],
                    ["360 → 400", "6 ≥ 5, làm tròn lên"],
                  ],
                  label: "Làm tròn số đến hàng chục, hàng trăm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 24 đến hàng chục ta được số nào?",
                options: [20, 25, 30, 14],
                answer: 20,
                mascotHint:
                  "Chữ số sau hàng chục là 4 < 5 nên làm tròn xuống: 20.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 360 đến hàng trăm ta được số nào?",
                options: [300, 350, 400, 360],
                answer: 400,
                mascotHint: "Chữ số hàng chục là 6 ≥ 5 nên làm tròn lên: 400.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1–4 thì làm tròn xuống; 5–9 thì làm tròn lên.",
                  "24 → 20; 360 → 400.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c8-l8",
          title: "Bài 8: Luyện tập chung chủ đề 8",
          type: "learn",
          description: "Ôn tập số đến 10 000, chữ số La Mã và làm tròn",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết số đến 10 000 rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 8",
                explanation:
                  "Bé đã học số có bốn chữ số, số 10 000, chữ số La Mã và làm tròn số.",
                points: [
                  "2 475 = 2 000 + 400 + 70 + 5.",
                  "10 000 = 1 chục nghìn.",
                  "IV = 4; IX = 9.",
                  "Làm tròn: 1–4 xuống, 5–9 lên.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 475 = 2 000 + 400 + 70 + 5\n27 → 30",
                placeValue: {
                  headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [2, 4, 7, 5],
                  label: "2 475 = 2 000 + 400 + 70 + 5",
                },
                table: {
                  headers: ["Làm tròn", "Được"],
                  rows: [
                    ["27 đến hàng chục", "30"],
                    ["24 300 đến hàng nghìn", "24 000"],
                  ],
                  label: "Luyện tập chung chủ đề 8",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Số 6 408 gồm mấy nghìn, mấy trăm, mấy chục, mấy đơn vị?",
                options: [
                  "6 nghìn, 4 trăm, 0 chục, 8 đơn vị",
                  "6 nghìn, 0 trăm, 4 chục, 8 đơn vị",
                  "6 nghìn, 4 trăm, 8 chục, 0 đơn vị",
                  "64 trăm và 8 đơn vị",
                ],
                answer: "6 nghìn, 4 trăm, 0 chục, 8 đơn vị",
                mascotHint: "6 408: 6 nghìn, 4 trăm, 0 chục, 8 đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 47 đến hàng chục ta được số nào?",
                options: [40, 45, 50, 47],
                answer: 50,
                mascotHint: "Chữ số 7 ≥ 5 nên làm tròn lên: 50.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 8.",
                  "6 408 = 6 nghìn 4 trăm 0 chục 8 đơn vị; 47 → 50.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 9 — SGK Bài 50-53 ═══
    {
      id: "g3-c9",
      name: "Chủ đề 9: Chu vi, diện tích một số hình phẳng",
      description:
        "Chu vi hình tam giác, tứ giác, chữ nhật, vuông; diện tích của một hình; xăng-ti-mét vuông; diện tích hình chữ nhật và hình vuông",
      icon: "📏",
      color: "#f4a261",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c9-l1",
          title: "Bài 1: Chu vi hình tam giác, hình tứ giác",
          type: "learn",
          description: "Tính chu vi bằng tổng độ dài các cạnh",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt muốn rào xung quanh mảnh vườn hình tam giác. Cần bao nhiêu mét rào nhỉ? 🏡",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chu vi là gì?",
                explanation:
                  "CHU VI của một hình là TỔNG ĐỘ DÀI các cạnh của hình đó.",
                rule: "Tam giác có ba cạnh 3 cm, 4 cm, 5 cm. Chu vi = 3 + 4 + 5 = 12 cm.",
                points: [
                  "Chu vi là độ dài đường bao quanh hình.",
                  "Có bao nhiêu cạnh thì cộng bấy nhiêu số.",
                  "Đơn vị của chu vi là đơn vị đo độ dài: cm, m...",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 cm + 4 cm + 5 cm = 12 cm\nChu vi hình tam giác: 12 cm",
                planeShape: {
                  kind: "triangle",
                  labels: ["3 cm", "4 cm", "5 cm"],
                  formula: "Chu vi = 3 + 4 + 5 = 12 cm",
                },
                operation: { left: 7, sign: "+", right: 5, result: 12 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình tam giác có ba cạnh dài 3 cm, 4 cm, 5 cm. Chu vi là bao nhiêu?",
                options: ["9 cm", "12 cm", "15 cm", "20 cm"],
                answer: "12 cm",
                mascotHint: "3 + 4 + 5 = 12 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình tứ giác có bốn cạnh đều dài 5 cm. Chu vi là bao nhiêu?",
                options: ["10 cm", "15 cm", "20 cm", "25 cm"],
                answer: "20 cm",
                mascotHint: "5 + 5 + 5 + 5 = 20 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chu vi là tổng độ dài các cạnh.",
                  "3 + 4 + 5 = 12 cm; 5 × 4 = 20 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l2",
          title: "Bài 2: Chu vi hình chữ nhật",
          type: "learn",
          description: "Tính chu vi hình chữ nhật bằng công thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hình chữ nhật có hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau. Tính chu vi thế nào cho nhanh? 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Công Thức",
                title: "Chu vi hình chữ nhật",
                explanation:
                  "Muốn tính chu vi hình chữ nhật, ta lấy CHIỀU DÀI CỘNG CHIỀU RỘNG rồi NHÂN VỚI 2.",
                rule: "Chu vi = (chiều dài + chiều rộng) × 2. Dài 5 cm, rộng 3 cm: (5 + 3) × 2 = 16 cm.",
                points: [
                  "Công thức ngắn hơn cách cộng bốn cạnh.",
                  "5 + 3 = 8; 8 × 2 = 16 cm.",
                  "Đơn vị của chu vi là cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Chu vi = (dài + rộng) × 2\n(5 + 3) × 2 = 16 cm",
                planeShape: {
                  kind: "rectangle",
                  labels: ["5 cm", "3 cm"],
                  formula: "Chu vi = (5 + 3) × 2 = 16 cm",
                },
                operation: { left: 8, sign: "×", right: 2, result: 16 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 5 cm, rộng 3 cm. Chu vi là bao nhiêu?",
                options: ["8 cm", "15 cm", "16 cm", "30 cm"],
                answer: "16 cm",
                mascotHint: "(5 + 3) × 2 = 16 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 8 cm, rộng 4 cm. Chu vi là bao nhiêu?",
                options: ["12 cm", "24 cm", "32 cm", "16 cm"],
                answer: "24 cm",
                mascotHint: "(8 + 4) × 2 = 24 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chu vi hình chữ nhật = (dài + rộng) × 2.",
                  "(5 + 3) × 2 = 16 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l3",
          title: "Bài 3: Chu vi hình vuông",
          type: "learn",
          description: "Tính chu vi hình vuông bằng công thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Hình vuông có bốn cạnh bằng nhau. Vậy tính chu vi có nhanh hơn không nhỉ? ▢",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Công Thức",
                title: "Chu vi hình vuông",
                explanation:
                  "Muốn tính chu vi hình vuông, ta lấy ĐỘ DÀI MỘT CẠNH NHÂN VỚI 4.",
                rule: "Chu vi = cạnh × 4. Cạnh 4 cm: 4 × 4 = 16 cm.",
                points: [
                  "Vì bốn cạnh bằng nhau nên chỉ cần biết một cạnh.",
                  "4 × 4 = 16 cm.",
                  "Cạnh 6 cm thì chu vi 24 cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Chu vi = cạnh × 4\n4 × 4 = 16 cm",
                planeShape: {
                  kind: "square",
                  labels: ["4 cm"],
                  formula: "Chu vi = 4 × 4 = 16 cm",
                },
                operation: { left: 4, sign: "×", right: 4, result: 16 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có cạnh 4 cm. Chu vi là bao nhiêu?",
                options: ["8 cm", "12 cm", "16 cm", "20 cm"],
                answer: "16 cm",
                mascotHint: "4 × 4 = 16 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có cạnh 7 cm. Chu vi là bao nhiêu?",
                options: ["11 cm", "21 cm", "28 cm", "49 cm"],
                answer: "28 cm",
                mascotHint: "7 × 4 = 28 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chu vi hình vuông = cạnh × 4.",
                  "Cạnh 4 cm → chu vi 16 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l4",
          title: "Bài 4: Diện tích của một hình",
          type: "learn",
          description: "Nhận biết diện tích là phần mặt phẳng bên trong hình",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé đặt quyển sách lên bàn. Quyển sách chiếm một phần mặt bàn — đó là diện tích đấy! 📕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Diện tích",
                explanation:
                  "DIỆN TÍCH là phần mặt phẳng bên trong một hình. Hình nào chiếm nhiều chỗ hơn thì diện tích lớn hơn.",
                rule: "Tờ giấy A4 có diện tích lớn hơn quyển sách nhỏ.",
                points: [
                  "Chu vi là đường bao quanh; diện tích là phần bên trong.",
                  "Muốn so sánh diện tích, bé có thể đếm số ô vuông phủ kín hình.",
                  "Hình phủ 9 ô vuông có diện tích lớn hơn hình phủ 6 ô vuông.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Hình A: 9 ô vuông\nHình B: 6 ô vuông\n→ Diện tích A lớn hơn B",
                table: {
                  headers: ["Hình", "Số ô vuông"],
                  rows: [
                    ["Hình A", 9],
                    ["Hình B", 6],
                  ],
                  label: "Diện tích hình A lớn hơn diện tích hình B",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Muốn so sánh diện tích hai hình, bé có thể làm gì?",
                options: [
                  "Đếm số ô vuông phủ kín mỗi hình",
                  "Đo chiều cao của hình",
                  "Cân hình lên",
                  "Đếm số cạnh",
                ],
                answer: "Đếm số ô vuông phủ kín mỗi hình",
                mascotHint:
                  "Hình nào phủ nhiều ô vuông hơn thì diện tích lớn hơn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Diện tích là phần mặt phẳng bên trong hình.",
                  "Có thể so sánh diện tích bằng cách đếm ô vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l5",
          title: "Bài 5: Xăng-ti-mét vuông",
          type: "learn",
          description: "Nhận biết đơn vị đo diện tích xăng-ti-mét vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một ô vuông nhỏ xíu cạnh 1 cm có diện tích là 1 xăng-ti-mét vuông đấy! 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Xăng-ti-mét vuông",
                explanation:
                  "XĂNG-TI-MÉT VUÔNG là đơn vị đo diện tích. Đó là diện tích của hình vuông có cạnh dài 1 cm. Viết là cm².",
                rule: "1 cm² là diện tích hình vuông cạnh 1 cm.",
                points: [
                  "Viết tắt là cm², đọc là 'xăng-ti-mét vuông'.",
                  "Đơn vị đo diện tích khác đơn vị đo độ dài: cm² khác cm.",
                  "Hình phủ kín 5 ô vuông cạnh 1 cm thì có diện tích 5 cm².",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▢ cạnh 1 cm → diện tích 1 cm²\n5 ô như vậy → 5 cm²",
                planeShape: {
                  kind: "square",
                  labels: ["1 cm"],
                  formula: "1 cm² là diện tích hình vuông cạnh 1 cm",
                },
                table: {
                  headers: ["Số ô 1 cm²", "Diện tích"],
                  rows: [
                    ["1", "1 cm²"],
                    ["5", "5 cm²"],
                  ],
                  label: "Xăng-ti-mét vuông",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 cm² là diện tích của hình nào?",
                options: [
                  "Hình vuông có cạnh dài 1 cm",
                  "Hình vuông có cạnh dài 4 cm",
                  "Đoạn thẳng dài 1 cm",
                  "Hình tròn bán kính 1 cm",
                ],
                answer: "Hình vuông có cạnh dài 1 cm",
                mascotHint: "1 cm² là diện tích hình vuông cạnh 1 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đơn vị đo diện tích là xăng-ti-mét vuông, viết là cm².",
                  "1 cm² là diện tích hình vuông cạnh 1 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l6",
          title: "Bài 6: Diện tích hình chữ nhật",
          type: "learn",
          description: "Tính diện tích hình chữ nhật bằng công thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hình chữ nhật dài 5 cm, rộng 3 cm. Bé xếp được bao nhiêu ô vuông 1 cm² vào trong? 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Công Thức",
                title: "Diện tích hình chữ nhật",
                explanation:
                  "Muốn tính diện tích hình chữ nhật, ta lấy CHIỀU DÀI NHÂN VỚI CHIỀU RỘNG (cùng một đơn vị đo).",
                rule: "Diện tích = dài × rộng. Dài 5 cm, rộng 3 cm: 5 × 3 = 15 cm².",
                points: [
                  "Đơn vị của diện tích là cm², không phải cm.",
                  "Hình có thể xếp vừa 15 ô vuông cạnh 1 cm.",
                  "Đổi về cùng đơn vị trước khi nhân.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Diện tích = dài × rộng\n5 × 3 = 15 cm²",
                planeShape: {
                  kind: "rectangle",
                  labels: ["5 cm", "3 cm"],
                  formula: "Diện tích = 5 × 3 = 15 cm²",
                },
                operation: { left: 5, sign: "×", right: 3, result: 15 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 5 cm, rộng 3 cm. Diện tích là bao nhiêu?",
                options: ["8 cm²", "15 cm²", "16 cm²", "30 cm²"],
                answer: "15 cm²",
                mascotHint: "5 × 3 = 15 cm².",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 6 cm, rộng 4 cm. Diện tích là bao nhiêu?",
                options: ["10 cm²", "20 cm²", "24 cm²", "48 cm²"],
                answer: "24 cm²",
                mascotHint: "6 × 4 = 24 cm².",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Diện tích hình chữ nhật = dài × rộng.",
                  "5 × 3 = 15 cm²; 6 × 4 = 24 cm².",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c9-l7",
          title: "Bài 7: Diện tích hình vuông",
          type: "learn",
          description: "Tính diện tích hình vuông bằng công thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Hình vuông cạnh 4 cm. Bé đoán xem xếp được bao nhiêu ô vuông 1 cm²? ▢",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Công Thức",
                title: "Diện tích hình vuông",
                explanation:
                  "Muốn tính diện tích hình vuông, ta lấy ĐỘ DÀI MỘT CẠNH NHÂN VỚI CHÍNH NÓ.",
                rule: "Diện tích = cạnh × cạnh. Cạnh 4 cm: 4 × 4 = 16 cm².",
                points: [
                  "Vì chiều dài và chiều rộng bằng nhau nên nhân cạnh với chính nó.",
                  "4 × 4 = 16 cm².",
                  "Cạnh 5 cm thì diện tích 25 cm².",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Diện tích = cạnh × cạnh\n4 × 4 = 16 cm²",
                planeShape: {
                  kind: "square",
                  labels: ["4 cm"],
                  formula: "Diện tích = 4 × 4 = 16 cm²",
                },
                operation: { left: 4, sign: "×", right: 4, result: 16 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có cạnh 4 cm. Diện tích là bao nhiêu?",
                options: ["8 cm²", "12 cm²", "16 cm²", "16 cm"],
                answer: "16 cm²",
                mascotHint: "4 × 4 = 16 cm². Đơn vị là cm², không phải cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có cạnh 5 cm. Diện tích là bao nhiêu?",
                options: ["10 cm²", "20 cm²", "25 cm²", "25 cm"],
                answer: "25 cm²",
                mascotHint: "5 × 5 = 25 cm².",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Diện tích hình vuông = cạnh × cạnh.",
                  "Cạnh 4 cm → 16 cm².",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c9-l8",
          title: "Bài 8: Luyện tập chung chủ đề 9",
          type: "learn",
          description: "Ôn tập chu vi và diện tích các hình",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Chu vi và diện tích — bé đừng nhầm hai thứ này nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 9",
                explanation:
                  "CHU VI là tổng độ dài các cạnh (đơn vị cm, m). DIỆN TÍCH là phần mặt phẳng bên trong (đơn vị cm², m²).",
                points: [
                  "Chu vi hình chữ nhật = (dài + rộng) × 2.",
                  "Chu vi hình vuông = cạnh × 4.",
                  "Diện tích hình chữ nhật = dài × rộng.",
                  "Diện tích hình vuông = cạnh × cạnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Chu vi hình vuông 4 cm: 4 × 4 = 16 cm\nDiện tích hình vuông 4 cm: 4 × 4 = 16 cm²",
                planeShape: {
                  kind: "square",
                  labels: ["4 cm"],
                  formula: "Chu vi 4 × 4 = 16 cm · Diện tích 4 × 4 = 16 cm²",
                },
                table: {
                  headers: ["Cần tính", "Công thức"],
                  rows: [
                    ["Chu vi hình vuông", "cạnh × 4"],
                    ["Diện tích hình vuông", "cạnh × cạnh"],
                    ["Chu vi hình chữ nhật", "(dài + rộng) × 2"],
                  ],
                  label: "Luyện tập chung chủ đề 9",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 7 cm, rộng 4 cm. Chu vi là bao nhiêu?",
                options: ["11 cm", "22 cm", "28 cm", "33 cm"],
                answer: "22 cm",
                mascotHint: "(7 + 4) × 2 = 22 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 7 cm, rộng 4 cm. Diện tích là bao nhiêu?",
                options: ["11 cm²", "22 cm²", "28 cm²", "33 cm²"],
                answer: "28 cm²",
                mascotHint: "7 × 4 = 28 cm².",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chu vi dùng đơn vị cm; diện tích dùng cm².",
                  "Bé đã hoàn thành chủ đề 9.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 10 — SGK Bài 54-58 ═══
    {
      id: "g3-c10",
      name: "Chủ đề 10: Cộng, trừ, nhân, chia trong phạm vi 10 000",
      description:
        "Phép cộng, phép trừ trong phạm vi 10 000; nhân chia số có bốn chữ số với số có một chữ số",
      icon: "➕",
      color: "#06d6a0",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c10-l1",
          title: "Bài 1: Phép cộng trong phạm vi 10 000",
          type: "learn",
          description: "Đặt tính và cộng các số có bốn chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Thư viện có 2 345 quyển sách, nhập thêm 1 234 quyển. Có tất cả bao nhiêu quyển? 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Cộng trong phạm vi 10 000",
                explanation:
                  "Bé đặt tính thẳng cột rồi cộng từ phải sang trái, giống như cộng số có ba chữ số nhưng thêm HÀNG NGHÌN.",
                rule: "2 345 + 1 234: 5+4=9; 4+3=7; 3+2=5; 2+1=3. Kết quả 3 579.",
                points: [
                  "Các chữ số cùng hàng phải thẳng cột.",
                  "Cộng từ hàng đơn vị rồi đến hàng nghìn.",
                  "2 345 + 1 234 = 3 579 quyển sách.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  2 345\n+ 1 234\n  3 579",
                operation: { left: 2345, sign: "+", right: 1234, result: 3579 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 345 + 1 234 bằng bao nhiêu?",
                options: [3579, 3589, 3479, 1111],
                answer: 3579,
                mascotHint: "5+4=9; 4+3=7; 3+2=5; 2+1=3. Kết quả 3 579.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt tính thẳng cột rồi cộng từ phải sang trái.",
                  "2 345 + 1 234 = 3 579.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l2",
          title: "Bài 2: Phép trừ trong phạm vi 10 000",
          type: "learn",
          description: "Đặt tính và trừ các số có bốn chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Kho có 4 568 bao gạo, đã xuất 2 345 bao. Còn lại bao nhiêu bao? 🍚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trừ trong phạm vi 10 000",
                explanation:
                  "Bé đặt tính thẳng cột rồi trừ từ phải sang trái. Nếu không đủ để trừ thì MƯỢN 1 từ hàng bên trái.",
                rule: "4 568 − 2 345: 8−5=3; 6−4=2; 5−3=2; 4−2=2. Kết quả 2 223.",
                points: [
                  "Trừ từ hàng đơn vị rồi đến hàng nghìn.",
                  "Mượn 1 thì hàng bên trái giảm đi 1.",
                  "4 568 − 2 345 = 2 223 bao gạo.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  4 568\n− 2 345\n  2 223",
                operation: { left: 4568, sign: "−", right: 2345, result: 2223 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 568 − 2 345 bằng bao nhiêu?",
                options: [2223, 2323, 2213, 6913],
                answer: 2223,
                mascotHint: "8−5=3; 6−4=2; 5−3=2; 4−2=2. Kết quả 2 223.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "7 500 − 2 300 bằng bao nhiêu?",
                options: [5200, 5800, 9800, 5100],
                answer: 5200,
                mascotHint: "7 500 − 2 300 = 5 200.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
                  "4 568 − 2 345 = 2 223.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l3",
          title: "Bài 3: Luyện tập cộng, trừ trong phạm vi 10 000",
          type: "learn",
          description: "Luyện tập cộng trừ có nhớ trong phạm vi 10 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé cẩn thận khi phải nhớ và mượn nhé! Cùng luyện tập 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Cộng trừ có nhớ",
                explanation:
                  "Cộng nhớ 1 khi một hàng cộng lại từ 10 trở lên. Trừ mượn 1 khi không đủ để trừ.",
                rule: "2 768 + 1 456 = 4 224 (8+6=14 viết 4 nhớ 1). 5 002 − 1 345 = 3 657 (mượn nhiều lần).",
                points: [
                  "Thử lại bằng phép tính ngược.",
                  "Kiểm tra kĩ các hàng có số 0.",
                  "Ghi kết quả đúng đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  2 768          5 002\n+ 1 456        − 1 345\n  4 224          3 657",
                operation: { left: 2768, sign: "+", right: 1456, result: 4224 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["2 768 + 1 456", "4 224"],
                    ["5 002 − 1 345", "3 657"],
                  ],
                  label: "Luyện tập cộng, trừ trong phạm vi 10 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 768 + 1 456 bằng bao nhiêu?",
                options: [4124, 4224, 4324, 5224],
                answer: 4224,
                mascotHint:
                  "8+6=14 viết 4 nhớ 1; 6+5+1=12 viết 2 nhớ 1; 7+4+1=12 viết 2 nhớ 1; 2+1+1=4. Kết quả 4 224.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng có nhớ: nhớ 1; trừ có mượn: mượn 1.",
                  "2 768 + 1 456 = 4 224.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l4",
          title: "Bài 4: Nhân số có bốn chữ số với số có một chữ số",
          type: "learn",
          description: "Đặt tính và nhân dạng 1 234 × 2",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mỗi thùng có 1 234 hộp sữa, có 2 thùng. Có tất cả bao nhiêu hộp? 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân bốn chữ số với một chữ số",
                explanation:
                  "Bé nhân lần lượt từ HÀNG ĐƠN VỊ, đến hàng chục, hàng trăm, rồi hàng nghìn.",
                rule: "1 234 × 2: 4×2=8; 3×2=6; 2×2=4; 1×2=2. Kết quả 2 468.",
                points: [
                  "Nhân từ phải sang trái.",
                  "Nhân có nhớ thì nhớ sang hàng liền trái.",
                  "1 234 × 2 = 2 468 hộp sữa.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  1 234\n×     2\n  2 468",
                operation: { left: 1234, sign: "×", right: 2, result: 2468 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 234 × 2 bằng bao nhiêu?",
                options: [2468, 2568, 1236, 2448],
                answer: 2468,
                mascotHint: "4×2=8; 3×2=6; 2×2=4; 1×2=2. Kết quả 2 468.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 105 × 3 bằng bao nhiêu?",
                options: [6315, 6305, 6215, 2108],
                answer: 6315,
                mascotHint:
                  "5×3=15 viết 5 nhớ 1; 0×3+1=1; 1×3=3; 2×3=6. Kết quả 6 315.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân từ hàng đơn vị sang hàng nghìn.",
                  "1 234 × 2 = 2 468.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l5",
          title: "Bài 5: Chia số có bốn chữ số cho số có một chữ số",
          type: "learn",
          description: "Đặt tính và chia dạng 2 468 : 2",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 2 468 hộp sữa chia đều vào 2 thùng. Mỗi thùng có mấy hộp? 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chia bốn chữ số cho một chữ số",
                explanation:
                  "Bé chia lần lượt từ HÀNG NGHÌN, đến hàng trăm, hàng chục, rồi hàng đơn vị.",
                rule: "2 468 : 2: 2:2=1; 4:2=2; 6:2=3; 8:2=4. Kết quả 1 234.",
                points: [
                  "Chia từ trái sang phải.",
                  "2 468 : 2 = 1 234 hộp sữa.",
                  "Thử lại: 1 234 × 2 = 2 468 ✓",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 468 : 2 = 1 234\n2:2=1;  4:2=2;  6:2=3;  8:2=4",
                operation: { left: 2468, sign: ":", right: 2, result: 1234 },
                placeValue: {
                  headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [2, 4, 6, 8],
                  label: "2 468 : 2 = 1 234",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 468 : 2 bằng bao nhiêu?",
                options: [1234, 1324, 1224, 1134],
                answer: 1234,
                mascotHint: "2:2=1; 4:2=2; 6:2=3; 8:2=4. Kết quả 1 234.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 424 : 4 bằng bao nhiêu?",
                options: [2006, 2106, 2116, 2206],
                answer: 2106,
                mascotHint:
                  "8:4=2; 4:4=1; 2:4=0 dư 2; hạ 4 được 24; 24:4=6. Kết quả 2 106.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chia từ hàng nghìn sang hàng đơn vị.",
                  "2 468 : 2 = 1 234.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l6",
          title: "Bài 6: Luyện tập nhân, chia trong phạm vi 10 000",
          type: "learn",
          description: "Luyện tập nhân chia có nhớ và chia có dư",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé cùng luyện nhân chia với số có bốn chữ số nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Nhân chia bốn chữ số",
                explanation:
                  "Nhân từ phải sang trái, chia từ trái sang phải. Số dư luôn bé hơn số chia.",
                rule: "3 215 × 3 = 9 645. 8 425 : 4 = 2 106 (dư 1).",
                points: [
                  "5×3=15 viết 5 nhớ 1; 1×3+1=4; 2×3=6; 3×3=9. Kết quả 9 645.",
                  "8 425 : 4 = 2 106 dư 1 vì 2 106 × 4 = 8 424.",
                  "Luôn kiểm lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 215 × 3 = 9 645\n8 425 : 4 = 2 106 (dư 1)",
                operation: { left: 3215, sign: "×", right: 3, result: 9645 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["3 215 × 3", "9 645"],
                    ["8 425 : 4", "2 106 (dư 1)"],
                  ],
                  label: "Luyện tập nhân, chia trong phạm vi 10 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 215 × 3 bằng bao nhiêu?",
                options: [9635, 9645, 9655, 3218],
                answer: 9645,
                mascotHint:
                  "5×3=15 viết 5 nhớ 1; 1×3+1=4; 2×3=6; 3×3=9. Kết quả 9 645.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 425 : 4 bằng bao nhiêu?",
                options: ["2 106 dư 1", "2 106", "2 116 dư 1", "2 006 dư 1"],
                answer: "2 106 dư 1",
                mascotHint:
                  "2 106 × 4 = 8 424, còn dư 1. Vậy 8 425 : 4 = 2 106 dư 1.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "3 215 × 3 = 9 645; 8 425 : 4 = 2 106 dư 1.",
                  "Số dư luôn bé hơn số chia.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c10-l7",
          title: "Bài 7: Bài toán có lời văn trong phạm vi 10 000",
          type: "learn",
          description: "Giải bài toán có lời văn với số có bốn chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Cửa hàng có 3 250 kg gạo, đã bán 1 480 kg. Còn lại bao nhiêu ki-lô-gam? 🍚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Đọc kĩ đề để chọn phép tính",
                explanation:
                  "'Còn lại, đã bán, bớt đi' thì dùng phép trừ. 'Cả hai, tất cả, thêm vào' thì dùng phép cộng.",
                rule: "3 250 − 1 480: 0 không trừ được 8, mượn: 10−8=2. 4 bớt 1 còn 3, 3 không trừ được 8, mượn: 13−8=5. 2 bớt 1 còn 1, 1−1=0. Hạ 3. Kết quả 1 770.",
                points: [
                  "3 250 − 1 480 = 1 770 kg gạo.",
                  "Thử lại: 1 770 + 1 480 = 3 250 ✓",
                  "Đáp số ghi kèm đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  3 250\n− 1 480\n  1 770",
                operation: { left: 3250, sign: "−", right: 1480, result: 1770 },
                barModel: {
                  rows: [
                    { label: "Có sẵn", parts: 3250 },
                    { label: "Bớt đi", parts: 1480 },
                  ],
                  braceLabel: "Còn lại 1 770",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Cửa hàng có 3 250 kg gạo, đã bán 1 480 kg. Hỏi còn lại bao nhiêu ki-lô-gam gạo?",
                options: ["1 670 kg", "1 770 kg", "1 870 kg", "4 730 kg"],
                answer: "1 770 kg",
                mascotHint: "3 250 − 1 480 = 1 770 kg gạo.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Còn lại, đã bán' thì dùng phép trừ.",
                  "3 250 − 1 480 = 1 770.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c10-l8",
          title: "Bài 8: Luyện tập chung chủ đề 10",
          type: "learn",
          description: "Ôn tập bốn phép tính trong phạm vi 10 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã tính được với số có bốn chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 10",
                explanation:
                  "Bé đã học cộng, trừ, nhân, chia trong phạm vi 10 000.",
                points: [
                  "Cộng trừ: đặt tính thẳng cột, tính từ phải sang trái.",
                  "Nhân: nhân từng hàng từ phải sang trái.",
                  "Chia: chia từng hàng từ trái sang phải.",
                  "Luôn thử lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 345 + 1 234 = 3 579\n1 234 × 2 = 2 468\n2 468 : 2 = 1 234",
                operation: { left: 2345, sign: "+", right: 1234, result: 3579 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["2 345 + 1 234", "3 579"],
                    ["1 234 × 2", "2 468"],
                    ["2 468 : 2", "1 234"],
                  ],
                  label: "Luyện tập chung chủ đề 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 456 + 2 123 bằng bao nhiêu?",
                options: [5479, 5579, 5589, 5469],
                answer: 5579,
                mascotHint: "6+3=9; 5+2=7; 4+1=5; 3+2=5. Kết quả 5 579.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 305 × 4 bằng bao nhiêu?",
                options: [5220, 5230, 5320, 5210],
                answer: 5220,
                mascotHint:
                  "5×4=20 viết 0 nhớ 2; 0×4+2=2; 3×4=12 viết 2 nhớ 1; 1×4+1=5. Kết quả 5 220.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 10.",
                  "3 456 + 2 123 = 5 579; 1 305 × 4 = 5 220.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 11 — SGK Bài 59-62 ═══
    {
      id: "g3-c11",
      name: "Chủ đề 11: Các số đến 100 000",
      description:
        "Các số có năm chữ số, số 100 000, so sánh số, làm tròn số đến hàng nghìn và hàng chục nghìn",
      icon: "🔢",
      color: "#e76f51",
      totalLessons: 6,
      lessons: [
        {
          id: "g3-c11-l1",
          title: "Bài 1: Các số có năm chữ số",
          type: "learn",
          description: "Nhận biết hàng chục nghìn và cấu tạo số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một chục nghìn quyển vở là rất nhiều! Số 24 568 có tới năm chữ số đấy 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Số có năm chữ số",
                explanation:
                  "Số có năm chữ số gồm HÀNG CHỤC NGHÌN, HÀNG NGHÌN, HÀNG TRĂM, HÀNG CHỤC và HÀNG ĐƠN VỊ.",
                rule: "Số 24 568 gồm 2 chục nghìn, 4 nghìn, 5 trăm, 6 chục và 8 đơn vị.",
                points: [
                  "24 568 = 20 000 + 4 000 + 500 + 60 + 8.",
                  "10 nghìn = 1 chục nghìn.",
                  "Chữ số tận cùng bên trái chỉ hàng chục nghìn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 568\n2 → chục nghìn · 4 → nghìn · 5 → trăm · 6 → chục · 8 → đơn vị",
                placeValue: {
                  headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [2, 4, 5, 6, 8],
                  label:
                    "24 568 gồm 2 chục nghìn, 4 nghìn, 5 trăm, 6 chục và 8 đơn vị",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 35 472 gồm mấy chục nghìn và mấy nghìn?",
                options: [
                  "3 chục nghìn và 5 nghìn",
                  "5 chục nghìn và 3 nghìn",
                  "35 chục nghìn",
                  "3 nghìn và 5 trăm",
                ],
                answer: "3 chục nghìn và 5 nghìn",
                mascotHint: "Hai chữ số đầu là 3 chục nghìn và 5 nghìn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số có năm chữ số gồm chục nghìn, nghìn, trăm, chục, đơn vị.",
                  "24 568 = 20 000 + 4 000 + 500 + 60 + 8.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c11-l2",
          title: "Bài 2: Số 100 000",
          type: "learn",
          description: "Nhận biết 10 chục nghìn bằng 100 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt đếm đến 99 999 rồi thêm 1 nữa. Số tiếp theo là gì nhỉ? 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Một trăm nghìn",
                explanation:
                  "10 chục nghìn gộp lại thành 1 TRĂM NGHÌN. Số một trăm nghìn viết là 100 000.",
                rule: "100 000 = 10 chục nghìn = 100 nghìn. Đọc là: một trăm nghìn.",
                points: [
                  "99 999 thêm 1 được 100 000.",
                  "100 000 là số có sáu chữ số.",
                  "100 000 gấp 10 lần 10 000.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "99 999  —  100 000\n10 chục nghìn = 1 trăm nghìn",
                placeValue: {
                  headers: [
                    "Trăm nghìn",
                    "Chục nghìn",
                    "Nghìn",
                    "Trăm",
                    "Chục",
                    "Đơn vị",
                  ],
                  digits: [1, 0, 0, 0, 0, 0],
                  label: "100 000 = 10 chục nghìn = 1 trăm nghìn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền sau của 99 999 là số nào?",
                options: [99998, 100000, 100001, 1000000],
                answer: 100000,
                mascotHint: "99 999 thêm 1 được 100 000.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "100 000 gồm mấy chục nghìn?",
                options: [
                  "1 chục nghìn",
                  "10 chục nghìn",
                  "100 chục nghìn",
                  "0 chục nghìn",
                ],
                answer: "10 chục nghìn",
                mascotHint: "100 000 = 10 chục nghìn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "100 000 = 10 chục nghìn.",
                  "Số liền sau của 99 999 là 100 000.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c11-l3",
          title: "Bài 3: Đọc và viết số có năm chữ số",
          type: "learn",
          description: "Đọc, viết số có năm chữ số kể cả khi có chữ số 0",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Số 30 405 đọc thế nào nhỉ? Có chữ số 0 ở giữa đấy! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đọc số có năm chữ số",
                explanation:
                  "Bé đọc lần lượt chục nghìn, nghìn, trăm, chục, đơn vị. Chữ số 0 thì đọc 'không'.",
                rule: "24 568 đọc là: hai mươi tư nghìn năm trăm sáu mươi tám. 30 405 đọc là: ba mươi nghìn bốn trăm linh năm.",
                points: [
                  "30 405: 3 chục nghìn, 0 nghìn, 4 trăm, 0 chục, 5 đơn vị.",
                  "50 000 đọc là: năm mươi nghìn.",
                  "10 005 đọc là: mười nghìn không trăm linh năm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 568 → hai mươi tư nghìn năm trăm sáu mươi tám\n30 405 → ba mươi nghìn bốn trăm linh năm",
                placeValue: {
                  headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [3, 0, 4, 0, 5],
                  label: "30 405 đọc là ba mươi nghìn bốn trăm linh năm",
                },
                table: {
                  headers: ["Số", "Đọc là"],
                  rows: [
                    ["24 568", "hai mươi tư nghìn năm trăm sáu mươi tám"],
                    ["30 405", "ba mươi nghìn bốn trăm linh năm"],
                  ],
                  label: "Đọc và viết số có năm chữ số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 50 000 đọc là gì?",
                options: [
                  "Năm mươi nghìn",
                  "Năm nghìn",
                  "Năm trăm nghìn",
                  "Năm mươi",
                ],
                answer: "Năm mươi nghìn",
                mascotHint: "50 000 đọc là năm mươi nghìn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc lần lượt chục nghìn, nghìn, trăm, chục, đơn vị.",
                  "50 000 đọc là năm mươi nghìn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c11-l4",
          title: "Bài 4: So sánh các số trong phạm vi 100 000",
          type: "learn",
          description: "So sánh hai số có năm chữ số theo từng hàng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "24 568 và 24 586, số nào lớn hơn? Nhìn kĩ hai chữ số cuối nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "So từng hàng từ trái sang phải",
                explanation:
                  "Bé so hàng CHỤC NGHÌN trước, rồi đến hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.",
                rule: "24 568 và 24 586: chục nghìn, nghìn, trăm đều bằng nhau; chục 6 < 8. Vậy 24 568 < 24 586.",
                points: [
                  "Chỉ so tiếp khi hàng trước bằng nhau.",
                  "Số có nhiều chữ số hơn thì lớn hơn: 100 000 > 99 999.",
                  "35 000 > 29 999 vì 3 chục nghìn > 2 chục nghìn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 568  <  24 586\n(2=2; 4=4; 5=5; 6 < 8)",
                comparison: { left: 24568, sign: "<", right: 24586 },
                table: {
                  headers: ["Hàng", "So sánh"],
                  rows: [
                    ["Chục nghìn", "2 = 2"],
                    ["Nghìn", "4 = 4"],
                    ["Trăm", "5 = 5"],
                    ["Chục", "6 < 8"],
                  ],
                  label: "24 568 < 24 586 vì hàng chục 6 < 8",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 24 568 và 24 586, số nào lớn hơn?",
                options: [24568, 24586, "Hai số bằng nhau"],
                answer: 24586,
                mascotHint: "Hàng chục 6 < 8 nên 24 568 < 24 586.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 35 000 và 29 999, số nào lớn hơn?",
                options: [35000, 29999, "Hai số bằng nhau"],
                answer: 35000,
                mascotHint: "3 chục nghìn > 2 chục nghìn nên 35 000 > 29 999.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "So từ hàng chục nghìn sang hàng đơn vị.",
                  "24 568 < 24 586; 35 000 > 29 999.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c11-l5",
          title: "Bài 5: Làm tròn số đến hàng nghìn, hàng chục nghìn",
          type: "learn",
          description: "Làm tròn số lớn theo chữ số bên phải",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "24 300 người và 24 800 người — nói 'khoảng 25 000' có đúng không nhỉ? 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Quy tắc làm tròn",
                explanation:
                  "Bé nhìn chữ số đứng NGAY SAU hàng cần làm tròn. 1, 2, 3, 4 thì làm tròn XUỐNG; 5, 6, 7, 8, 9 thì làm tròn LÊN.",
                rule: "24 300 làm tròn đến hàng nghìn: chữ số hàng trăm là 3 < 5 → 24 000. 24 800 → 25 000 (vì 8 ≥ 5).",
                points: [
                  "Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm.",
                  "Làm tròn đến hàng chục nghìn thì nhìn chữ số hàng nghìn.",
                  "36 500 làm tròn đến hàng nghìn → 37 000 (vì 5 ≥ 5).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 300 → 24 000  (3 < 5, xuống)\n24 800 → 25 000  (8 ≥ 5, lên)",
                table: {
                  headers: ["Làm tròn", "Vì sao"],
                  rows: [
                    ["24 300 → 24 000", "hàng trăm 3 < 5, xuống"],
                    ["24 800 → 25 000", "hàng trăm 8 ≥ 5, lên"],
                  ],
                  label: "Làm tròn số đến hàng nghìn, hàng chục nghìn",
                },
                numberLine: {
                  from: 24000,
                  to: 25000,
                  step: 1000,
                  marks: [24000, 24300, 24800, 25000],
                  label: "24 300 gần 24 000 · 24 800 gần 25 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 24 300 đến hàng nghìn ta được số nào?",
                options: [24000, 24500, 25000, 24300],
                answer: 24000,
                mascotHint:
                  "Chữ số hàng trăm là 3 < 5 nên làm tròn xuống: 24 000.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 24 800 đến hàng nghìn ta được số nào?",
                options: [24000, 24500, 25000, 24800],
                answer: 25000,
                mascotHint:
                  "Chữ số hàng trăm là 8 ≥ 5 nên làm tròn lên: 25 000.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1–4 làm tròn xuống; 5–9 làm tròn lên.",
                  "24 300 → 24 000; 24 800 → 25 000.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c11-l6",
          title: "Bài 6: Luyện tập chung chủ đề 11",
          type: "learn",
          description: "Ôn tập số đến 100 000 và làm tròn số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết số đến 100 000 rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 11",
                explanation:
                  "Bé đã học số có năm chữ số, số 100 000, so sánh và làm tròn số lớn.",
                points: [
                  "24 568 = 20 000 + 4 000 + 500 + 60 + 8.",
                  "100 000 = 10 chục nghìn.",
                  "So sánh từ hàng chục nghìn.",
                  "Làm tròn: 1–4 xuống, 5–9 lên.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "24 568 = 20 000 + 4 000 + 500 + 60 + 8\n24 800 → 25 000",
                placeValue: {
                  headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
                  digits: [2, 4, 5, 6, 8],
                  label: "24 568 = 20 000 + 4 000 + 500 + 60 + 8",
                },
                table: {
                  headers: ["Làm tròn", "Được"],
                  rows: [
                    ["24 800 đến hàng nghìn", "25 000"],
                    ["24 568 đến hàng chục", "24 570"],
                  ],
                  label: "Luyện tập chung chủ đề 11",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Số 47 205 gồm mấy chục nghìn, mấy nghìn, mấy trăm, mấy chục, mấy đơn vị?",
                options: [
                  "4 chục nghìn, 7 nghìn, 2 trăm, 0 chục, 5 đơn vị",
                  "4 chục nghìn, 7 nghìn, 0 trăm, 2 chục, 5 đơn vị",
                  "4 chục nghìn, 2 nghìn, 7 trăm, 0 chục, 5 đơn vị",
                  "47 nghìn và 205 đơn vị",
                ],
                answer: "4 chục nghìn, 7 nghìn, 2 trăm, 0 chục, 5 đơn vị",
                mascotHint:
                  "47 205: 4 chục nghìn, 7 nghìn, 2 trăm, 0 chục, 5 đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Làm tròn số 36 500 đến hàng nghìn ta được số nào?",
                options: [36000, 36500, 37000, 40000],
                answer: 37000,
                mascotHint:
                  "Chữ số hàng trăm là 5 ≥ 5 nên làm tròn lên: 37 000.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 11.",
                  "47 205 gồm 4 chục nghìn, 7 nghìn, 2 trăm, 0 chục, 5 đơn vị.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 12 — SGK Bài 63-65 ═══
    {
      id: "g3-c12",
      name: "Chủ đề 12: Cộng, trừ trong phạm vi 100 000",
      description: "Phép cộng, phép trừ trong phạm vi 100 000",
      icon: "➖",
      color: "#6a994e",
      totalLessons: 5,
      lessons: [
        {
          id: "g3-c12-l1",
          title: "Bài 1: Phép cộng trong phạm vi 100 000",
          type: "learn",
          description: "Đặt tính và cộng các số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Kho có 23 456 kg gạo, nhập thêm 12 345 kg. Có tất cả bao nhiêu ki-lô-gam? 🍚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Cộng trong phạm vi 100 000",
                explanation:
                  "Bé đặt tính thẳng cột rồi cộng từ phải sang trái, từ hàng đơn vị đến hàng chục nghìn.",
                rule: "23 456 + 12 345: 6+5=11 viết 1 nhớ 1; 5+4+1=10 viết 0 nhớ 1; 4+3+1=8; 3+2=5; 2+1=3. Kết quả 35 801.",
                points: [
                  "Các chữ số cùng hàng phải thẳng cột với nhau.",
                  "Cộng từ hàng đơn vị lên hàng chục nghìn.",
                  "23 456 + 12 345 = 35 801 kg gạo.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  23 456\n+ 12 345\n  35 801",
                operation: {
                  left: 23456,
                  sign: "+",
                  right: 12345,
                  result: 35801,
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "23 456 + 12 345 bằng bao nhiêu?",
                options: [35701, 35801, 35811, 11111],
                answer: 35801,
                mascotHint:
                  "6+5=11 viết 1 nhớ 1; 5+4+1=10 viết 0 nhớ 1; 4+3+1=8; 3+2=5; 2+1=3. Kết quả 35 801.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt tính thẳng cột rồi cộng từ phải sang trái.",
                  "23 456 + 12 345 = 35 801.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c12-l2",
          title: "Bài 2: Phép trừ trong phạm vi 100 000",
          type: "learn",
          description: "Đặt tính và trừ các số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Kho có 45 678 kg gạo, đã xuất 23 456 kg. Còn lại bao nhiêu ki-lô-gam? 🍚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trừ trong phạm vi 100 000",
                explanation:
                  "Bé đặt tính thẳng cột rồi trừ từ phải sang trái. Không đủ để trừ thì MƯỢN 1 từ hàng bên trái.",
                rule: "45 678 − 23 456: 8−6=2; 7−5=2; 6−4=2; 5−3=2; 4−2=2. Kết quả 22 222.",
                points: [
                  "Trừ từ hàng đơn vị lên hàng chục nghìn.",
                  "Mượn 1 thì hàng bên trái giảm đi 1.",
                  "45 678 − 23 456 = 22 222 kg gạo.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  45 678\n− 23 456\n  22 222",
                operation: {
                  left: 45678,
                  sign: "−",
                  right: 23456,
                  result: 22222,
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "45 678 − 23 456 bằng bao nhiêu?",
                options: [22222, 22212, 22322, 69134],
                answer: 22222,
                mascotHint:
                  "8−6=2; 7−5=2; 6−4=2; 5−3=2; 4−2=2. Kết quả 22 222.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Trừ từ phải sang trái, mượn khi cần.",
                  "45 678 − 23 456 = 22 222.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c12-l3",
          title: "Bài 3: Luyện tập cộng, trừ trong phạm vi 100 000",
          type: "learn",
          description: "Luyện tập cộng trừ có nhớ và có mượn",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Số càng lớn thì càng phải cẩn thận khi nhớ và mượn. Cùng luyện nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Cộng trừ có nhớ",
                explanation:
                  "Cộng nhớ 1 khi một hàng cộng lại từ 10 trở lên. Trừ mượn 1 khi không đủ để trừ.",
                rule: "35 678 + 24 567 = 60 245. 50 000 − 12 345 = 37 655.",
                points: [
                  "Chú ý các hàng có chữ số 0 khi trừ.",
                  "Thử lại bằng phép tính ngược.",
                  "Kết quả cộng phải bé hơn 100 000.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  35 678          50 000\n+ 24 567        − 12 345\n  60 245          37 655",
                operation: {
                  left: 35678,
                  sign: "+",
                  right: 24567,
                  result: 60245,
                },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["35 678 + 24 567", "60 245"],
                    ["50 000 − 12 345", "37 655"],
                  ],
                  label: "Luyện tập cộng, trừ trong phạm vi 100 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "35 678 + 24 567 bằng bao nhiêu?",
                options: [59245, 60145, 60245, 60345],
                answer: 60245,
                mascotHint:
                  "8+7=15 viết 5 nhớ 1; 7+6+1=14 viết 4 nhớ 1; 6+5+1=12 viết 2 nhớ 1; 5+4+1=10 viết 0 nhớ 1; 3+2+1=6. Kết quả 60 245.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng trừ số lớn vẫn nhớ 1 và mượn 1 như thường.",
                  "35 678 + 24 567 = 60 245.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c12-l4",
          title: "Bài 4: Bài toán có lời văn trong phạm vi 100 000",
          type: "learn",
          description: "Giải bài toán có lời văn với số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một xưởng may tháng trước làm 34 560 cái áo, tháng này làm 25 430 cái. Cả hai tháng làm bao nhiêu? 👕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Đọc kĩ đề để chọn phép tính",
                explanation:
                  "'Cả hai, tất cả' thì cộng. 'Còn lại, hơn kém bao nhiêu' thì trừ.",
                rule: "34 560 + 25 430 = 59 990 (cái áo). Hơn kém: 34 560 − 25 430 = 9 130 (cái áo).",
                points: [
                  "34 560 + 25 430 = 59 990 cái áo.",
                  "34 560 − 25 430 = 9 130 cái áo.",
                  "Đáp số ghi kèm đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Cả hai tháng: 34 560 + 25 430 = 59 990 (cái áo)\nTháng trước hơn: 34 560 − 25 430 = 9 130 (cái áo)",
                operation: {
                  left: 34560,
                  sign: "+",
                  right: 25430,
                  result: 59990,
                },
                barModel: {
                  rows: [
                    { label: "Tháng trước", parts: 34560 },
                    { label: "Tháng này", parts: 25430 },
                  ],
                  braceLabel: "Cả hai tháng 59 990 cái áo · hơn kém 9 130",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Tháng trước làm 34 560 cái áo, tháng này làm 25 430 cái. Hỏi cả hai tháng làm được bao nhiêu cái áo?",
                options: [59990, 59890, 60990, 9130],
                answer: 59990,
                mascotHint: "34 560 + 25 430 = 59 990 cái áo.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Với hai tháng trên, tháng trước làm nhiều hơn tháng này bao nhiêu cái áo?",
                options: [9030, 9130, 8130, 59990],
                answer: 9130,
                mascotHint: "34 560 − 25 430 = 9 130 cái áo.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Gom lại thì cộng; so sánh hơn kém thì trừ.",
                  "34 560 + 25 430 = 59 990; 34 560 − 25 430 = 9 130.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c12-l5",
          title: "Bài 5: Luyện tập chung chủ đề 12",
          type: "learn",
          description: "Ôn tập cộng trừ trong phạm vi 100 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã tính được với số có năm chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 12",
                explanation: "Bé đã học cộng và trừ trong phạm vi 100 000.",
                points: [
                  "Đặt tính thẳng cột, tính từ phải sang trái.",
                  "Cộng có nhớ: nhớ 1. Trừ có mượn: mượn 1.",
                  "Thử lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "23 456 + 12 345 = 35 801\n35 801 − 12 345 = 23 456",
                operation: {
                  left: 23456,
                  sign: "+",
                  right: 12345,
                  result: 35801,
                },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["23 456 + 12 345", "35 801"],
                    ["35 801 − 12 345", "23 456"],
                  ],
                  label: "Luyện tập chung chủ đề 12",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "41 235 + 27 340 bằng bao nhiêu?",
                options: [68575, 68585, 67575, 68475],
                answer: 68575,
                mascotHint:
                  "5+0=5; 3+4=7; 2+3=5; 1+7=8; 4+2=6. Kết quả 68 575.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "80 000 − 45 678 bằng bao nhiêu?",
                options: [34322, 34332, 35322, 125678],
                answer: 34322,
                mascotHint: "Mượn liên tiếp: 80 000 − 45 678 = 34 322.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 12.",
                  "41 235 + 27 340 = 68 575; 80 000 − 45 678 = 34 322.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 13 — SGK Bài 66-69 ═══
    {
      id: "g3-c13",
      name: "Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam",
      description:
        "Xem đồng hồ, tháng và năm, thực hành xem lịch, giới thiệu tiền Việt Nam",
      icon: "💵",
      color: "#8338ec",
      totalLessons: 7,
      lessons: [
        {
          id: "g3-c13-l1",
          title: "Bài 1: Xem đồng hồ — giờ và phút",
          type: "learn",
          description: "Đọc giờ đúng và giờ lẻ trên đồng hồ kim",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "7 giờ 15 phút — mẹ nhắc bé đi học đấy! Bé đọc được đồng hồ chưa? ⏰",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Kim giờ và kim phút",
                explanation:
                  "Kim NGẮN chỉ GIỜ, kim DÀI chỉ PHÚT. Một giờ có 60 phút.",
                rule: "Kim ngắn qua số 7, kim dài chỉ số 3 → 7 giờ 15 phút (vì 3 × 5 = 15 phút).",
                points: [
                  "1 giờ = 60 phút.",
                  "Mỗi số trên đồng hồ là 5 phút của kim dài.",
                  "Kim dài chỉ số 12 là đúng giờ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Kim ngắn → giờ\nKim dài → phút\n1 giờ = 60 phút",
                clock: { hour: 7, minute: 15, timeText: "7 giờ 15 phút" },
                table: {
                  headers: ["Kim dài chỉ số", "Phút"],
                  rows: [
                    ["3", "3 × 5 = 15 phút"],
                    ["6", "6 × 5 = 30 phút"],
                    ["12", "0 phút (đúng giờ)"],
                  ],
                  label: "Xem đồng hồ — 1 giờ = 60 phút",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn chỉ số 7, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?",
                options: ["7 giờ", "12 giờ", "7 giờ 12 phút", "12 giờ 7 phút"],
                answer: "7 giờ",
                mascotHint: "Kim dài chỉ số 12 nghĩa là đúng giờ: 7 giờ.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn qua số 7, kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?",
                options: [
                  "7 giờ 3 phút",
                  "7 giờ 15 phút",
                  "3 giờ 35 phút",
                  "7 giờ 30 phút",
                ],
                answer: "7 giờ 15 phút",
                mascotHint: "3 × 5 = 15 phút. Vậy là 7 giờ 15 phút.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Kim ngắn chỉ giờ, kim dài chỉ phút.",
                  "1 giờ = 60 phút; mỗi số là 5 phút.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c13-l2",
          title: "Bài 2: Xem đồng hồ — giờ kém",
          type: "learn",
          description: "Đọc giờ kém theo cách nói thông thường",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Kim dài chỉ số 8, kim ngắn gần tới số 3. Người ta nói '3 giờ kém 20 phút' đấy! 🕒",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Giờ kém",
                explanation:
                  "Khi kim dài chưa tới số 12 mà gần tới, bé nói theo giờ SẮP TỚI rồi trừ đi số phút còn thiếu.",
                rule: "Kim dài chỉ số 8 → còn 20 phút nữa là tới giờ. Kim ngắn gần số 3 → 2 giờ 40 phút = 3 giờ kém 20 phút.",
                points: [
                  "Kim dài chỉ số 8 là 40 phút.",
                  "2 giờ 40 phút cũng đọc là 3 giờ kém 20 phút.",
                  "Kim dài chỉ số 11 → kém 5 phút.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Kim dài số 8 = 40 phút\n2 giờ 40 phút = 3 giờ kém 20 phút",
                clock: {
                  hour: 2,
                  minute: 40,
                  timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
                },
                table: {
                  headers: ["Kim dài chỉ số", "Nghĩa là"],
                  rows: [
                    ["8", "40 phút — còn 20 phút nữa là tới giờ"],
                    ["9", "45 phút — kém 15 phút"],
                  ],
                  label: "Xem đồng hồ — giờ kém",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "2 giờ 40 phút còn đọc là gì?",
                options: [
                  "2 giờ kém 40 phút",
                  "3 giờ kém 40 phút",
                  "3 giờ kém 20 phút",
                  "2 giờ kém 20 phút",
                ],
                answer: "3 giờ kém 20 phút",
                mascotHint:
                  "Còn 20 phút nữa là 3 giờ nên đọc là 3 giờ kém 20 phút.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "2 giờ 40 phút = 3 giờ kém 20 phút.",
                  "Kém bao nhiêu = 60 trừ số phút.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c13-l3",
          title: "Bài 3: Tháng — năm",
          type: "learn",
          description: "Biết một năm có 12 tháng và số ngày mỗi tháng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Một năm có mấy tháng nhỉ? Bé đếm trên tờ lịch treo tường xem! 📅",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Một năm — mười hai tháng",
                explanation:
                  "Một năm có 12 tháng. Các tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12. Các tháng có 30 ngày: 4, 6, 9, 11. Tháng 2 có 28 hoặc 29 ngày.",
                rule: "1 năm = 12 tháng = 365 ngày (năm nhuận 366 ngày).",
                points: [
                  "31 ngày: tháng 1, 3, 5, 7, 8, 10, 12.",
                  "30 ngày: tháng 4, 6, 9, 11.",
                  "Tháng 2 có 28 ngày, năm nhuận có 29 ngày.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "31 ngày: 1 · 3 · 5 · 7 · 8 · 10 · 12\n30 ngày: 4 · 6 · 9 · 11\n28 hoặc 29 ngày: 2",
                table: {
                  headers: ["Số ngày", "Các tháng"],
                  rows: [
                    ["31 ngày", "1 · 3 · 5 · 7 · 8 · 10 · 12"],
                    ["30 ngày", "4 · 6 · 9 · 11"],
                    ["28 hoặc 29 ngày", "Tháng 2"],
                  ],
                  label: "1 năm = 12 tháng = 365 ngày (năm nhuận 366 ngày)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Một năm có bao nhiêu tháng?",
                options: [10, 11, 12, 13],
                answer: 12,
                mascotHint: "Một năm có 12 tháng.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Tháng 4 có bao nhiêu ngày?",
                options: [28, 29, 30, 31],
                answer: 30,
                mascotHint: "Tháng 4, 6, 9, 11 có 30 ngày.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 năm = 12 tháng.",
                  "Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c13-l4",
          title: "Bài 4: Ngày trong tháng",
          type: "learn",
          description: "Đọc ngày tháng và tính số ngày trong tháng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Sinh nhật bé ngày 15 tháng 8. Bé viết thế nào nhỉ? ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Viết ngày, tháng, năm",
                explanation:
                  "Sinh nhật bé ngày 15 tháng 8 viết gọn là 15/8. Đọc là 'ngày mười lăm tháng tám'.",
                rule: "Cách viết: ngày trước, tháng sau, năm cuối cùng. Ví dụ 15/8/2025.",
                points: [
                  "Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.",
                  "Bé có thể dùng nắm tay để nhớ: khớp nổi là 31 ngày.",
                  "Ngày 31 chỉ có ở các tháng 31 ngày.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "ngày 15 tháng 8  →  15/8\nngày 1 tháng 1  →  1/1",
                table: {
                  headers: ["Cách đọc", "Cách viết"],
                  rows: [
                    ["ngày 15 tháng 8", "15/8"],
                    ["ngày 1 tháng 1", "1/1"],
                  ],
                  label:
                    "Ngày trước, tháng sau, năm cuối cùng — ví dụ 15/8/2025",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Ngày 1 tháng 1 viết gọn là gì?",
                options: ["1/1", "11/1", "1/11", "11/11"],
                answer: "1/1",
                mascotHint: "Ngày trước, tháng sau: 1/1.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Viết ngày tháng: ngày trước, tháng sau.",
                  "Ngày 15 tháng 8 viết là 15/8.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c13-l5",
          title: "Bài 5: Tiền Việt Nam — nhận biết các tờ tiền",
          type: "learn",
          description: "Nhận biết và gọi tên các tờ tiền Việt Nam",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé được mừng tuổi một tờ tiền có ghi 50 000 đồng. Đó là tiền Việt Nam đấy! 💵",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các tờ tiền Việt Nam",
                explanation:
                  "Đơn vị tiền của Việt Nam là ĐỒNG. Trên mỗi tờ tiền đều ghi số tiền bằng chữ và bằng số.",
                rule: "Các tờ tiền thường dùng: 1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 20 000 đồng, 50 000 đồng, 100 000 đồng, 200 000 đồng, 500 000 đồng.",
                points: [
                  "Tờ 50 000 đồng lớn hơn tờ 20 000 đồng.",
                  "Hai tờ 10 000 đồng bằng một tờ 20 000 đồng.",
                  "Mười tờ 10 000 đồng bằng một tờ 100 000 đồng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 000 đ · 2 000 đ · 5 000 đ · 10 000 đ\n20 000 đ · 50 000 đ · 100 000 đ · 200 000 đ",
                money: {
                  notes: [1000, 5000, 10000, 50000, 100000],
                  label: "Các tờ tiền thường dùng",
                },
                table: {
                  headers: ["Tờ tiền", "Mệnh giá"],
                  rows: [
                    ["100 000 đồng", "100 000"],
                    ["200 000 đồng", "200 000"],
                    ["500 000 đồng", "500 000"],
                  ],
                  label: "Tiền Việt Nam — nhận biết các tờ tiền",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hai tờ 10 000 đồng đổi được một tờ tiền nào?",
                options: [
                  "5 000 đồng",
                  "10 000 đồng",
                  "20 000 đồng",
                  "50 000 đồng",
                ],
                answer: "20 000 đồng",
                mascotHint: "10 000 + 10 000 = 20 000 đồng.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Mười tờ 10 000 đồng đổi được một tờ tiền nào?",
                options: [
                  "20 000 đồng",
                  "50 000 đồng",
                  "100 000 đồng",
                  "200 000 đồng",
                ],
                answer: "100 000 đồng",
                mascotHint: "10 × 10 000 = 100 000 đồng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đơn vị tiền Việt Nam là đồng.",
                  "10 000 + 10 000 = 20 000 đồng.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c13-l6",
          title: "Bài 6: Tiền Việt Nam — tính tiền mua hàng",
          type: "learn",
          description: "Tính tổng tiền và tiền thừa khi mua hàng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé mua một quyển vở 15 000 đồng và một cái bút 9 000 đồng. Bé đưa 50 000 đồng, được trả lại bao nhiêu? 🛒",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Tính tiền thừa",
                explanation:
                  "Trước tiên bé tính TỔNG số tiền phải trả. Sau đó lấy số tiền đưa trừ đi tổng để tìm TIỀN THỪA.",
                rule: "15 000 + 9 000 = 24 000 đồng. 50 000 − 24 000 = 26 000 đồng tiền thừa.",
                points: [
                  "Tổng tiền: 15 000 + 9 000 = 24 000 đồng.",
                  "Tiền thừa: 50 000 − 24 000 = 26 000 đồng.",
                  "Đáp số ghi kèm chữ 'đồng'.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "15 000 + 9 000 = 24 000 (đồng)\n50 000 − 24 000 = 26 000 (đồng)",
                operation: {
                  left: 50000,
                  sign: "−",
                  right: 24000,
                  result: 26000,
                },
                money: {
                  notes: [50000, 15000, 9000],
                  label:
                    "Mua hết 24 000 đồng, trả 50 000 đồng, tiền thừa 26 000 đồng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bé mua vở 15 000 đồng và bút 9 000 đồng. Bé phải trả tất cả bao nhiêu tiền?",
                options: [
                  "6 000 đồng",
                  "24 000 đồng",
                  "25 000 đồng",
                  "34 000 đồng",
                ],
                answer: "24 000 đồng",
                mascotHint: "15 000 + 9 000 = 24 000 đồng.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bé đưa 50 000 đồng để trả 24 000 đồng. Bé được trả lại bao nhiêu?",
                options: [
                  "16 000 đồng",
                  "24 000 đồng",
                  "26 000 đồng",
                  "34 000 đồng",
                ],
                answer: "26 000 đồng",
                mascotHint: "50 000 − 24 000 = 26 000 đồng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tính tổng tiền rồi mới tính tiền thừa.",
                  "24 000 đồng; tiền thừa 26 000 đồng.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c13-l7",
          title: "Bài 7: Luyện tập chung chủ đề 13",
          type: "learn",
          description: "Ôn tập thời gian, tháng năm và tiền Việt Nam",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết xem đồng hồ, xem lịch và đếm tiền rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 13",
                explanation:
                  "Bé đã học thời gian (giờ, phút, tháng, năm) và tiền Việt Nam.",
                points: [
                  "1 giờ = 60 phút; kim ngắn chỉ giờ, kim dài chỉ phút.",
                  "1 năm = 12 tháng.",
                  "Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12.",
                  "Đơn vị tiền Việt Nam là đồng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 giờ = 60 phút · 1 năm = 12 tháng\n2 giờ 40 phút = 3 giờ kém 20 phút",
                clock: {
                  hour: 2,
                  minute: 40,
                  timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
                },
                table: {
                  headers: ["Đại lượng", "Bằng"],
                  rows: [
                    ["1 giờ", "60 phút"],
                    ["1 năm", "12 tháng"],
                    ["1 tuần", "7 ngày"],
                  ],
                  label: "Luyện tập chung chủ đề 13",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn qua số 9, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?",
                options: [
                  "9 giờ 6 phút",
                  "9 giờ 30 phút",
                  "6 giờ 45 phút",
                  "9 giờ 15 phút",
                ],
                answer: "9 giờ 30 phút",
                mascotHint: "6 × 5 = 30 phút. Vậy là 9 giờ 30 phút.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Tháng nào dưới đây có 31 ngày?",
                options: ["Tháng 4", "Tháng 6", "Tháng 9", "Tháng 10"],
                answer: "Tháng 10",
                mascotHint: "Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bé mua hai quyển vở, mỗi quyển 8 000 đồng. Bé phải trả bao nhiêu tiền?",
                options: [
                  "8 000 đồng",
                  "10 000 đồng",
                  "16 000 đồng",
                  "18 000 đồng",
                ],
                answer: "16 000 đồng",
                mascotHint: "8 000 × 2 = 16 000 đồng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 13.",
                  "9 giờ 30 phút; 16 000 đồng.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 14 — SGK Bài 70-72 ═══
    {
      id: "g3-c14",
      name: "Chủ đề 14: Nhân, chia trong phạm vi 100 000",
      description: "Nhân và chia số có năm chữ số cho số có một chữ số",
      icon: "✖️",
      color: "#38b6ff",
      totalLessons: 5,
      lessons: [
        {
          id: "g3-c14-l1",
          title: "Bài 1: Nhân số có năm chữ số với số có một chữ số",
          type: "learn",
          description: "Đặt tính và nhân số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mỗi kho chứa 12 345 kg thóc, có 2 kho như thế. Có tất cả bao nhiêu ki-lô-gam? 🌾",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhân năm chữ số với một chữ số",
                explanation:
                  "Bé nhân lần lượt từ HÀNG ĐƠN VỊ đến hàng chục nghìn, nhớ sang hàng liền trái khi cần.",
                rule: "12 345 × 2: 5×2=10 viết 0 nhớ 1; 4×2+1=9; 3×2=6; 2×2=4; 1×2=2. Kết quả 24 690.",
                points: [
                  "Nhân từ phải sang trái.",
                  "Nhân có nhớ thì nhớ 1 sang hàng bên trái.",
                  "12 345 × 2 = 24 690 kg thóc.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  12 345\n×      2\n  24 690",
                operation: { left: 12345, sign: "×", right: 2, result: 24690 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "12 345 × 2 bằng bao nhiêu?",
                options: [24590, 24690, 24790, 12347],
                answer: 24690,
                mascotHint:
                  "5×2=10 viết 0 nhớ 1; 4×2+1=9; 3×2=6; 2×2=4; 1×2=2. Kết quả 24 690.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "20 505 × 4 bằng bao nhiêu?",
                options: [80020, 82020, 82120, 20509],
                answer: 82020,
                mascotHint:
                  "5×4=20 viết 0 nhớ 2; 0×4+2=2; 5×4=20 viết 0 nhớ 2; 0×4+2=2; 2×4=8. Kết quả 82 020.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nhân từ hàng đơn vị lên hàng chục nghìn.",
                  "12 345 × 2 = 24 690.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c14-l2",
          title: "Bài 2: Chia số có năm chữ số cho số có một chữ số",
          type: "learn",
          description: "Đặt tính và chia số có năm chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 46 848 kg thóc chia đều vào 4 kho. Mỗi kho có bao nhiêu ki-lô-gam? 🌾",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chia năm chữ số cho một chữ số",
                explanation:
                  "Bé chia lần lượt từ HÀNG CHỤC NGHÌN xuống hàng đơn vị. Số dư luôn bé hơn số chia.",
                rule: "46 848 : 4 = 11 712. Thử lại: 11 712 × 4 = 46 848 ✓",
                points: [
                  "Chia từ trái sang phải.",
                  "Hạ từng chữ số xuống để chia tiếp.",
                  "46 848 : 4 = 11 712 kg thóc.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "46 848 : 4 = 11 712\n4:4=1 · 6:4=1 dư 2 · 28:4=7 · 4:4=1 · 8:4=2",
                operation: { left: 46848, sign: ":", right: 4, result: 11712 },
                table: {
                  headers: ["Bước", "Làm"],
                  rows: [
                    ["1", "4 : 4 = 1"],
                    ["2", "6 : 4 = 1 dư 2"],
                    ["3", "28 : 4 = 7"],
                    ["4", "4 : 4 = 1"],
                    ["5", "8 : 4 = 2"],
                  ],
                  label: "Thử lại: 11 712 × 4 = 46 848 ✓",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "46 848 : 4 bằng bao nhiêu?",
                options: [11612, 11712, 11722, 12712],
                answer: 11712,
                mascotHint:
                  "4:4=1; 6:4=1 dư 2; hạ 8 được 28, 28:4=7; 4:4=1; 8:4=2. Kết quả 11 712.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "30 000 : 5 bằng bao nhiêu?",
                options: [500, 600, 6000, 60000],
                answer: 6000,
                mascotHint: "30 000 : 5 = 6 000.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chia từ hàng chục nghìn xuống hàng đơn vị.",
                  "46 848 : 4 = 11 712.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c14-l3",
          title: "Bài 3: Luyện tập nhân, chia trong phạm vi 100 000",
          type: "learn",
          description: "Luyện tập nhân chia có nhớ, chia có dư",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Nhân chia số lớn cũng giống nhân chia số nhỏ, chỉ thêm vài hàng thôi. Cùng luyện nhé! 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Nhân chia năm chữ số",
                explanation:
                  "Nhân từ phải sang trái, chia từ trái sang phải. Số dư luôn bé hơn số chia.",
                rule: "13 241 × 3 = 39 723. 47 125 : 5 = 9 425.",
                points: [
                  "4×3=12 viết 2 nhớ 1; 1×3+1=4; ... Kết quả 39 723.",
                  "47 125 : 5 = 9 425 (chia hết).",
                  "Luôn kiểm lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "13 241 × 3 = 39 723\n47 125 : 5 = 9 425",
                operation: { left: 13241, sign: "×", right: 3, result: 39723 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["13 241 × 3", "39 723"],
                    ["47 125 : 5", "9 425"],
                  ],
                  label: "Luyện tập nhân, chia trong phạm vi 100 000",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "13 241 × 3 bằng bao nhiêu?",
                options: [39623, 39723, 39823, 13244],
                answer: 39723,
                mascotHint:
                  "1×3=3; 4×3=12 viết 2 nhớ 1; 2×3+1=7; 3×3=9; 1×3=3. Kết quả 39 723.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "47 125 : 5 bằng bao nhiêu?",
                options: [9325, 9425, 9415, 9525],
                answer: 9425,
                mascotHint: "47 125 : 5 = 9 425.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "13 241 × 3 = 39 723; 47 125 : 5 = 9 425.",
                  "Số dư luôn bé hơn số chia.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c14-l4",
          title: "Bài 4: Bài toán có lời văn về nhân, chia",
          type: "learn",
          description: "Giải bài toán có lời văn với nhân chia",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Một cửa hàng có 5 thùng, mỗi thùng 12 450 cái bánh. Hỏi cửa hàng có bao nhiêu cái bánh? 🍪",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Chọn phép tính đúng",
                explanation:
                  "'Mỗi... có...' rồi hỏi tổng thì dùng phép nhân. Chia đều cho các phần bằng nhau thì dùng phép chia.",
                rule: "12 450 × 5 = 62 250 (cái bánh). Chia đều 62 250 cái bánh cho 5 thùng: 62 250 : 5 = 12 450 (cái).",
                points: [
                  "12 450 × 5 = 62 250 cái bánh.",
                  "62 250 : 5 = 12 450 cái bánh.",
                  "Ghi đáp số kèm đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 450 × 5 = 62 250 (cái bánh)\n62 250 : 5 = 12 450 (cái bánh)",
                operation: { left: 12450, sign: "×", right: 5, result: 62250 },
                barModel: {
                  rows: [
                    { label: "Một thùng", parts: 12450 },
                    { label: "5 thùng", parts: 62250 },
                  ],
                  braceLabel: "12 450 × 5 = 62 250 cái bánh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một cửa hàng có 5 thùng, mỗi thùng 12 450 cái bánh. Hỏi cửa hàng có bao nhiêu cái bánh?",
                options: [
                  "62 250 cái",
                  "62 150 cái",
                  "12 455 cái",
                  "60 250 cái",
                ],
                answer: "62 250 cái",
                mascotHint: "12 450 × 5 = 62 250 cái bánh.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Mỗi... có...' thì dùng phép nhân.",
                  "12 450 × 5 = 62 250.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c14-l5",
          title: "Bài 5: Luyện tập chung chủ đề 14",
          type: "learn",
          description: "Ôn tập nhân chia trong phạm vi 100 000",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã tính được nhân chia với số có năm chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 14",
                explanation:
                  "Bé đã học nhân và chia số có năm chữ số cho số có một chữ số.",
                points: [
                  "Nhân từ phải sang trái, nhớ 1 khi cần.",
                  "Chia từ trái sang phải, số dư bé hơn số chia.",
                  "Luôn thử lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "12 345 × 2 = 24 690\n46 848 : 4 = 11 712",
                operation: { left: 12345, sign: "×", right: 2, result: 24690 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["12 345 × 2", "24 690"],
                    ["46 848 : 4", "11 712"],
                  ],
                  label: "Luyện tập chung chủ đề 14",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 234 × 3 bằng bao nhiêu?",
                options: [30602, 30702, 30802, 10237],
                answer: 30702,
                mascotHint:
                  "4×3=12 viết 2 nhớ 1; 3×3+1=10 viết 0 nhớ 1; 2×3+1=7; 0×3=0; 1×3=3. Kết quả 30 702.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "36 936 : 3 bằng bao nhiêu?",
                options: [11312, 12312, 12212, 11412],
                answer: 12312,
                mascotHint:
                  "3:3=1; 6:3=2; 9:3=3; 3:3=1; 6:3=2. Kết quả 12 312.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 14.",
                  "10 234 × 3 = 30 702; 36 936 : 3 = 12 312.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 15 — SGK Bài 73-75 ═══
    {
      id: "g3-c15",
      name: "Chủ đề 15: Làm quen với yếu tố thống kê, xác suất",
      description:
        "Thu thập, phân loại, ghi chép số liệu; bảng số liệu; khả năng xảy ra của một sự kiện",
      icon: "📊",
      color: "#c77dff",
      totalLessons: 4,
      lessons: [
        {
          id: "g3-c15-l1",
          title: "Bài 1: Bảng số liệu",
          type: "learn",
          description: "Đọc và nhận xét số liệu trong bảng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Lớp 3A có 12 bạn thích bóng đá, 8 bạn thích cầu lông. Bé xem bảng để biết ai đông hơn nhé! 📊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Bảng số liệu",
                explanation:
                  "BẢNG SỐ LIỆU cho biết số lượng của từng đối tượng. Bé đọc theo hàng và cột để so sánh.",
                rule: "Lớp 3A: bóng đá 12 bạn; cầu lông 8 bạn; bơi 5 bạn. Môn được thích nhất là bóng đá.",
                points: [
                  "Cột bên trái ghi tên đối tượng.",
                  "Cột bên phải ghi số lượng.",
                  "Nhìn số lớn nhất để biết đối tượng nhiều nhất.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bóng đá: 12 bạn\nCầu lông: 8 bạn\nBơi     : 5 bạn",
                table: {
                  headers: ["Môn", "Số bạn"],
                  rows: [
                    ["Bóng đá", 12],
                    ["Cầu lông", 8],
                    ["Bơi", 5],
                  ],
                  label:
                    "Bảng số liệu lớp 3A — môn được nhiều bạn thích nhất là bóng đá",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong bảng trên (bóng đá 12, cầu lông 8, bơi 5), số bạn thích bóng đá hơn số bạn thích cầu lông là bao nhiêu?",
                options: ["4 bạn", "6 bạn", "8 bạn", "20 bạn"],
                answer: "4 bạn",
                mascotHint: "12 − 8 = 4 bạn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng số liệu cho biết số lượng của từng đối tượng.",
                  "12 − 8 = 4 bạn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c15-l2",
          title: "Bài 2: Biểu đồ tranh",
          type: "learn",
          description: "Đọc biểu đồ tranh với ký hiệu thay cho số lượng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Mỗi quả táo 🍎 trong biểu đồ đại diện cho 5 bạn. Bé đếm xem có bao nhiêu quả nhé! 📊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Biểu đồ tranh",
                explanation:
                  "BIỂU ĐỒ TRANH dùng hình vẽ để biểu diễn số lượng. Mỗi hình đại diện cho một số lượng nhất định (ví dụ 5).",
                rule: "Có 4 ký hiệu 🍎, mỗi ký hiệu là 5 bạn → 4 × 5 = 20 bạn.",
                points: [
                  "Đếm số ký hiệu rồi nhân với giá trị mỗi ký hiệu.",
                  "4 × 5 = 20 bạn.",
                  "Biểu đồ tranh giúp nhìn nhanh ai nhiều hơn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🍎🍎🍎🍎  (mỗi 🍎 = 5 bạn)\n4 × 5 = 20 bạn",
                barChart: {
                  title: "Số bạn thích bóng đá (mỗi 🍎 = 5 bạn)",
                  items: [{ label: "Bóng đá", value: 20 }],
                  unit: "bạn",
                  highlight: 0,
                },
                table: {
                  headers: ["Số ký hiệu", "Số bạn"],
                  rows: [["4 × 5", "20 bạn"]],
                  label: "Biểu đồ tranh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Biểu đồ có 4 ký hiệu, mỗi ký hiệu đại diện 5 bạn. Có tất cả bao nhiêu bạn?",
                options: ["9 bạn", "20 bạn", "25 bạn", "45 bạn"],
                answer: "20 bạn",
                // Hình cho bé ĐẾM: mỗi hình người là một ký hiệu trên biểu đồ.
                items: [{ emoji: "\u{1F464}", count: 4 }],
                mascotHint: "4 × 5 = 20 bạn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đếm ký hiệu rồi nhân với giá trị mỗi ký hiệu.",
                  "4 × 5 = 20 bạn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c15-l3",
          title: "Bài 3: Khả năng xảy ra của một sự kiện",
          type: "learn",
          description: "Nhận biết chắc chắn, có thể, không thể",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trong hộp chỉ có bóng đỏ. Bé lấy một quả — có thể lấy được bóng xanh không? 🎈",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chắc chắn — Có thể — Không thể",
                explanation:
                  "Bé dùng ba từ này để nói về khả năng xảy ra: CHẮC CHẮN xảy ra, CÓ THỂ xảy ra, KHÔNG THỂ xảy ra.",
                rule: "Hộp chỉ có bóng đỏ: lấy bóng đỏ là CHẮC CHẮN; lấy bóng xanh là KHÔNG THỂ.",
                points: [
                  "Chắc chắn: luôn luôn xảy ra.",
                  "Có thể: xảy ra hoặc không xảy ra.",
                  "Không thể: không bao giờ xảy ra.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Hộp chỉ có bóng đỏ:\nLấy bóng đỏ  → chắc chắn\nLấy bóng xanh → không thể",
                table: {
                  headers: ["Lấy ra", "Khả năng"],
                  rows: [
                    ["Bóng đỏ", "chắc chắn (hộp chỉ có bóng đỏ)"],
                    ["Bóng xanh", "không thể"],
                    ["Bóng vàng", "không thể"],
                  ],
                  label: "Khả năng xảy ra của một sự kiện",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong hộp chỉ có bóng đỏ. Lấy ra một quả bóng xanh là sự kiện gì?",
                options: [
                  "Chắc chắn",
                  "Có thể",
                  "Không thể",
                  "Luôn luôn xảy ra",
                ],
                answer: "Không thể",
                mascotHint:
                  "Trong hộp không có bóng xanh nên không thể lấy được.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong hộp có bóng đỏ và bóng xanh. Lấy ra một quả bóng đỏ là sự kiện gì?",
                options: ["Chắc chắn", "Có thể", "Không thể", "Không bao giờ"],
                answer: "Có thể",
                mascotHint: "Vì có cả bóng xanh nên lấy bóng đỏ chỉ là có thể.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ba mức: chắc chắn — có thể — không thể.",
                  "Hộp chỉ có bóng đỏ thì lấy bóng xanh là không thể.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c15-l4",
          title: "Bài 4: Luyện tập chung chủ đề 15",
          type: "learn",
          description: "Ôn tập bảng số liệu, biểu đồ tranh và xác suất",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết đọc số liệu và đoán khả năng xảy ra rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 15",
                explanation:
                  "Bé đã học bảng số liệu, biểu đồ tranh và khả năng xảy ra của sự kiện.",
                points: [
                  "Bảng số liệu: đối tượng và số lượng.",
                  "Biểu đồ tranh: đếm ký hiệu rồi nhân.",
                  "Xác suất: chắc chắn, có thể, không thể.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bảng: Bóng đá 12 · Cầu lông 8\nBiểu đồ: 4 × 5 = 20\nSự kiện: chắc chắn / có thể / không thể",
                barChart: {
                  title: "Bảng số liệu lớp 3A",
                  items: [
                    { label: "Bóng đá", value: 12 },
                    { label: "Cầu lông", value: 8 },
                    { label: "Bơi", value: 5 },
                  ],
                  unit: "bạn",
                  highlight: 0,
                },
                table: {
                  headers: ["Sự kiện", "Khả năng"],
                  rows: [
                    ["Chắc chắn", "luôn xảy ra"],
                    ["Có thể", "có lúc xảy ra, có lúc không"],
                    ["Không thể", "không bao giờ xảy ra"],
                  ],
                  label: "Luyện tập chung chủ đề 15",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bảng số liệu cho: Thứ Hai 15 bạn, Thứ Ba 20 bạn, Thứ Tư 10 bạn. Ngày nào đông nhất?",
                options: ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Ba ngày bằng nhau"],
                answer: "Thứ Ba",
                mascotHint: "20 là số lớn nhất nên thứ Ba đông nhất.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Biểu đồ có 6 ký hiệu, mỗi ký hiệu đại diện 5 bạn. Có tất cả bao nhiêu bạn?",
                options: ["11 bạn", "25 bạn", "30 bạn", "35 bạn"],
                answer: "30 bạn",
                items: [{ emoji: "\u{1F464}", count: 6 }],
                mascotHint: "6 × 5 = 30 bạn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 15.",
                  "Thứ Ba đông nhất; 6 × 5 = 30 bạn.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 16 — SGK Bài 76-81 ═══
    {
      id: "g3-c16",
      name: "Chủ đề 16: Ôn tập cuối năm",
      description:
        "Ôn tập số, bốn phép tính, hình học, đo lường, bảng số liệu và khả năng xảy ra của một sự kiện",
      icon: "🎓",
      color: "#ffd166",
      totalLessons: 8,
      lessons: [
        {
          id: "g3-c16-l1",
          title: "Bài 1: Ôn tập số và phép cộng, trừ",
          type: "learn",
          description: "Ôn tập số đến 100 000 và cộng trừ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Cuối năm rồi! Bé cùng ôn lại những gì đã học trong cả năm lớp 3 nhé 🎓",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Số và phép cộng, trừ",
                explanation:
                  "Bé ôn lại cách đọc, viết, so sánh số đến 100 000 và cách cộng trừ các số đó.",
                points: [
                  "24 568 = 2 chục nghìn + 4 nghìn + 5 trăm + 6 chục + 8 đơn vị.",
                  "So sánh: so từ hàng chục nghìn sang hàng đơn vị.",
                  "Cộng trừ: đặt tính thẳng cột, tính từ phải sang trái.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "23 456 + 12 345 = 35 801\n45 678 − 23 456 = 22 222",
                operation: {
                  left: 23456,
                  sign: "+",
                  right: 12345,
                  result: 35801,
                },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["23 456 + 12 345", "35 801"],
                    ["45 678 − 23 456", "22 222"],
                  ],
                  label: "Ôn tập số và phép cộng, trừ",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 68 457 gồm mấy chục nghìn và mấy nghìn?",
                options: [
                  "6 chục nghìn và 8 nghìn",
                  "8 chục nghìn và 6 nghìn",
                  "68 chục nghìn",
                  "6 nghìn và 8 trăm",
                ],
                answer: "6 chục nghìn và 8 nghìn",
                mascotHint: "Hai chữ số đầu là 6 chục nghìn và 8 nghìn.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "36 271 + 21 304 bằng bao nhiêu?",
                options: [57575, 57475, 57585, 36275],
                answer: 57575,
                mascotHint:
                  "1+4=5; 7+0=7; 2+3=5; 6+1=7; 3+2=5. Kết quả 57 575.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ôn lại số đến 100 000 và cộng trừ.",
                  "36 271 + 21 304 = 57 575.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c16-l2",
          title: "Bài 2: Ôn tập phép nhân, phép chia",
          type: "learn",
          description: "Ôn tập bảng nhân chia và nhân chia số lớn",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bảng nhân, bảng chia từ 2 đến 9 — bé còn nhớ hết không? 💪",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Nhân chia từ 2 đến 9",
                explanation:
                  "Bé ôn lại bảng nhân, bảng chia từ 2 đến 9 và cách nhân chia số có nhiều chữ số với số có một chữ số.",
                points: [
                  "6 × 7 = 42; 42 : 6 = 7.",
                  "12 345 × 2 = 24 690.",
                  "46 848 : 4 = 11 712.",
                  "Số dư luôn bé hơn số chia.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "6 × 7 = 42      42 : 6 = 7\n12 345 × 2 = 24 690\n46 848 : 4 = 11 712",
                operation: { left: 12345, sign: "×", right: 2, result: 24690 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [
                    ["6 × 7", "42"],
                    ["42 : 6", "7"],
                    ["12 345 × 2", "24 690"],
                    ["46 848 : 4", "11 712"],
                  ],
                  label: "Ôn tập phép nhân, phép chia",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 × 7 bằng bao nhiêu?",
                options: [36, 42, 48, 56],
                answer: 42,
                mascotHint: "6 × 7 = 42.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "32 148 : 4 bằng bao nhiêu?",
                options: [8037, 8137, 8027, 8047],
                answer: 8037,
                mascotHint: "32 148 : 4 = 8 037.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "6 × 7 = 42; 32 148 : 4 = 8 037.",
                  "Số dư luôn bé hơn số chia.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c16-l3",
          title: "Bài 3: Ôn tập hình học — chu vi và diện tích",
          type: "learn",
          description: "Ôn tập các công thức chu vi, diện tích",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Chu vi là độ dài đường bao, diện tích là phần bên trong. Bé còn phân biệt được không? 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Chu vi và diện tích",
                explanation:
                  "Chu vi dùng đơn vị cm, m. Diện tích dùng đơn vị cm², m².",
                points: [
                  "Chu vi hình chữ nhật = (dài + rộng) × 2.",
                  "Chu vi hình vuông = cạnh × 4.",
                  "Diện tích hình chữ nhật = dài × rộng.",
                  "Diện tích hình vuông = cạnh × cạnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Hình vuông cạnh 5 cm:\nChu vi  = 5 × 4 = 20 cm\nDiện tích = 5 × 5 = 25 cm²",
                planeShape: {
                  kind: "square",
                  labels: ["5 cm"],
                  formula:
                    "Chu vi = 5 × 4 = 20 cm · Diện tích = 5 × 5 = 25 cm²",
                },
                table: {
                  headers: ["Cần tính", "Công thức"],
                  rows: [
                    ["Chu vi hình vuông", "cạnh × 4"],
                    ["Diện tích hình vuông", "cạnh × cạnh"],
                    ["Chu vi hình chữ nhật", "(dài + rộng) × 2"],
                    ["Diện tích hình chữ nhật", "dài × rộng"],
                  ],
                  label: "Ôn tập hình học — chu vi và diện tích",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 9 cm, rộng 5 cm. Chu vi là bao nhiêu?",
                options: ["14 cm", "28 cm", "45 cm", "45 cm²"],
                answer: "28 cm",
                mascotHint: "(9 + 5) × 2 = 28 cm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông cạnh 6 cm. Diện tích là bao nhiêu?",
                options: ["12 cm²", "24 cm²", "36 cm²", "36 cm"],
                answer: "36 cm²",
                mascotHint: "6 × 6 = 36 cm².",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chu vi (9+5)×2 = 28 cm; diện tích 6×6 = 36 cm².",
                  "Chu vi dùng cm, diện tích dùng cm².",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c16-l4",
          title: "Bài 4: Ôn tập đo lường",
          type: "learn",
          description: "Ôn tập độ dài, khối lượng, dung tích, thời gian, tiền",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "mm, g, ml, °C, giờ, đồng — bé nhớ hết các đơn vị đo chưa nhỉ? 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Các đơn vị đo đã học",
                explanation:
                  "Bé ôn lại các đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ, thời gian và tiền.",
                points: [
                  "Độ dài: mm, cm, dm, m, km. 1 m = 1 000 mm.",
                  "Khối lượng: g, kg. 1 kg = 1 000 g.",
                  "Dung tích: ml, l. 1 l = 1 000 ml.",
                  "Nhiệt độ: °C. Thời gian: giờ, phút. Tiền: đồng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 m = 1 000 mm\n1 kg = 1 000 g\n1 l = 1 000 ml",
                table: {
                  headers: ["Đổi", "Được"],
                  rows: [
                    ["1 m", "1 000 mm"],
                    ["1 kg", "1 000 g"],
                    ["1 l", "1 000 ml"],
                    ["1 giờ", "60 phút"],
                  ],
                  label: "Ôn tập đo lường",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 kg bằng bao nhiêu gam?",
                options: ["10 g", "100 g", "1 000 g", "10 000 g"],
                answer: "1 000 g",
                mascotHint: "1 kg = 1 000 g.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 l bằng bao nhiêu mi-li-lít?",
                options: ["10 ml", "100 ml", "1 000 ml", "10 000 ml"],
                answer: "1 000 ml",
                mascotHint: "1 l = 1 000 ml.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "1 m = 1 000 mm; 1 kg = 1 000 g; 1 l = 1 000 ml.",
                  "Tiền Việt Nam: đơn vị là đồng.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c16-l5",
          title: "Bài 5: Ôn tập thống kê và xác suất",
          type: "learn",
          description: "Ôn tập bảng số liệu, biểu đồ tranh, khả năng xảy ra",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé cùng ôn lại cách đọc bảng số liệu và đoán khả năng xảy ra nhé! 📊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Thống kê và xác suất",
                explanation:
                  "Bé ôn lại bảng số liệu, biểu đồ tranh và ba mức khả năng: chắc chắn, có thể, không thể.",
                points: [
                  "Bảng số liệu: đối tượng và số lượng tương ứng.",
                  "Biểu đồ tranh: đếm ký hiệu rồi nhân với giá trị mỗi ký hiệu.",
                  "Chắc chắn / có thể / không thể.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bảng: Thứ Hai 15 bạn · Thứ Ba 20 bạn\nBiểu đồ: 5 ký hiệu × 5 bạn = 25 bạn",
                barChart: {
                  title: "Số bạn tham gia (mỗi ký hiệu = 5 bạn)",
                  items: [
                    { label: "Thứ Hai", value: 15 },
                    { label: "Thứ Ba", value: 20 },
                    { label: "Thứ Tư", value: 25 },
                  ],
                  unit: "bạn",
                  highlight: 2,
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Biểu đồ có 5 ký hiệu, mỗi ký hiệu đại diện 5 bạn. Có tất cả bao nhiêu bạn?",
                options: ["10 bạn", "20 bạn", "25 bạn", "55 bạn"],
                answer: "25 bạn",
                items: [{ emoji: "\u{1F464}", count: 5 }],
                mascotHint: "5 × 5 = 25 bạn.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong hộp có bóng đỏ và bóng vàng. Lấy ra một quả bóng xanh là sự kiện gì?",
                options: ["Chắc chắn", "Có thể", "Không thể", "Hay xảy ra"],
                answer: "Không thể",
                mascotHint:
                  "Trong hộp không có bóng xanh nên không thể lấy được.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "5 × 5 = 25 bạn.",
                  "Lấy bóng xanh khi hộp không có bóng xanh là không thể.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c16-l6",
          title: "Bài 6: Ôn tập giải bài toán có lời văn",
          type: "learn",
          description: "Ôn tập kĩ năng đọc đề và chọn phép tính",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Đọc kĩ đề rồi mới chọn phép tính — đó là bí quyết của bé giỏi toán! 🧠",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Chọn phép tính đúng",
                explanation:
                  "Đọc đề để nhận ra từ khoá: 'tất cả, cả hai' → cộng; 'còn lại, ít hơn' → trừ; 'mỗi, gấp' → nhân; 'chia đều' → chia.",
                rule: "Có 5 thùng, mỗi thùng 12 450 cái bánh: 12 450 × 5 = 62 250 cái bánh.",
                points: [
                  "Ghi rõ lời giải và phép tính.",
                  "Đáp số kèm đơn vị.",
                  "Thử lại kết quả.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: '"tất cả" → cộng    "còn lại" → trừ\n"mỗi" → nhân       "chia đều" → chia',
                operation: { left: 12450, sign: "×", right: 5, result: 62250 },
                table: {
                  headers: ["Từ khoá trong đề", "Phép tính"],
                  rows: [
                    ["tất cả", "cộng"],
                    ["còn lại", "trừ"],
                    ["mỗi", "nhân"],
                    ["chia đều", "chia"],
                  ],
                  label: "Ôn tập giải bài toán có lời văn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một kho có 4 bao, mỗi bao 15 250 kg gạo. Kho có tất cả bao nhiêu ki-lô-gam gạo?",
                options: ["60 000 kg", "61 000 kg", "60 250 kg", "61 250 kg"],
                answer: "61 000 kg",
                mascotHint: "15 250 × 4 = 61 000 kg.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc từ khoá để chọn phép tính.",
                  "15 250 × 4 = 61 000 kg.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g3-c16-l7",
          title: "Bài 7: Luyện tập tổng hợp cuối năm",
          type: "learn",
          description: "Luyện tập tổng hợp tất cả kiến thức lớp 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bài luyện cuối cùng của lớp 3! Bé sẵn sàng chưa? 🚀",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Tổng hợp lớp 3",
                explanation:
                  "Bé vận dụng tất cả những gì đã học: số, bốn phép tính, hình học, đo lường, thống kê và giải toán.",
                points: [
                  "Số đến 100 000.",
                  "Cộng, trừ, nhân, chia (nhân chia có số có một chữ số).",
                  "Chu vi, diện tích. Đo lường, thời gian, tiền Việt Nam.",
                  "Bảng số liệu, biểu đồ tranh, xác suất.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Số → Bốn phép tính → Hình học → Đo lường → Thống kê",
                table: {
                  headers: ["Mạch", "Ví dụ"],
                  rows: [
                    ["Số", "24 568"],
                    ["Bốn phép tính", "12 345 × 2 = 24 690"],
                    ["Hình học", "diện tích = cạnh × cạnh"],
                    ["Đo lường", "1 kg = 1 000 g"],
                    ["Thống kê", "biểu đồ tranh"],
                  ],
                  label: "Luyện tập tổng hợp cuối năm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hình chữ nhật dài 8 cm, rộng 6 cm. Diện tích là bao nhiêu?",
                options: ["14 cm²", "28 cm²", "48 cm²", "48 cm"],
                answer: "48 cm²",
                mascotHint: "8 × 6 = 48 cm².",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một cửa hàng có 48 000 đồng, mua hết 27 500 đồng. Còn lại bao nhiêu tiền?",
                options: [
                  "20 500 đồng",
                  "21 500 đồng",
                  "20 000 đồng",
                  "75 500 đồng",
                ],
                answer: "20 500 đồng",
                mascotHint: "48 000 − 27 500 = 20 500 đồng.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "12 405 × 3 bằng bao nhiêu?",
                options: [36125, 37215, 37115, 36225],
                answer: 37215,
                mascotHint:
                  "5×3=15 viết 5 nhớ 1; 0×3+1=1; 4×3=12 viết 2 nhớ 1; 2×3+1=7; 1×3=3. Kết quả 37 215.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "8 × 6 = 48 cm²; 48 000 − 27 500 = 20 500; 12 405 × 3 = 37 215.",
                  "Bé đã ôn xong toàn bộ lớp 3!",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g3-c16-l8",
          title: "Bài 8: Lễ tốt nghiệp lớp 3",
          type: "learn",
          description: "Tổng kết cả năm học lớp 3 và chào lớp 4",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "celebrate",
                text: "Chúc mừng bé đã hoàn thành chương trình Toán lớp 3! Rô-bốt rất tự hào về bé 🎓🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Tổng Kết",
                title: "Một năm rất nhiều điều mới",
                explanation:
                  "Bé đã học số đến 100 000, bốn phép tính với số lớn, chu vi và diện tích, đo lường, thời gian, tiền Việt Nam, thống kê và xác suất.",
                points: [
                  "Bé biết cộng, trừ, nhân, chia trong phạm vi 100 000.",
                  "Bé biết tính chu vi và diện tích hình chữ nhật, hình vuông.",
                  "Bé biết xem đồng hồ, xem lịch và dùng tiền Việt Nam.",
                  "Bé đã sẵn sàng lên lớp 4!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Lớp 3 ✅\nLớp 4 — sẵn sàng! 🚀",
                numberLine: {
                  from: 1,
                  to: 5,
                  step: 1,
                  marks: [3, 4, 5],
                  hops: [{ from: 3, to: 5, label: "lên lớp 4" }],
                  label: "Lớp 3 xong rồi — sẵn sàng lên Lớp 4",
                },
                table: {
                  headers: ["Mốc", "Trạng thái"],
                  rows: [
                    ["Lớp 3", "Hoàn thành ✅"],
                    ["Lớp 4", "Sẵn sàng 🚀"],
                  ],
                  label: "Lễ tốt nghiệp lớp 3",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bé đã học đến số lớn nhất nào trong chương trình lớp 3?",
                options: ["10 000", "100 000", "1 000 000", "999"],
                answer: "100 000",
                mascotHint: "Lớp 3 học các số đến 100 000.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Công thức tính diện tích hình chữ nhật là gì?",
                options: [
                  "dài × rộng",
                  "(dài + rộng) × 2",
                  "cạnh × 4",
                  "cạnh × cạnh",
                ],
                answer: "dài × rộng",
                mascotHint: "Diện tích hình chữ nhật = dài × rộng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Chúc mừng bé!",
                points: [
                  "Bé đã hoàn thành Toán lớp 3.",
                  "Hẹn gặp bé ở lớp 4 nhé! 🎓",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },
  ],
};
