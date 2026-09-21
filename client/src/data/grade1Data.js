// Data for Grade 1 (Lớp 1) — DỰNG LẠI THEO ĐÚNG SGK "Kết nối tri thức với cuộc sống"
//
// ══════════════════════════════════════════════════════════════════════════════
// VÌ SAO DỰNG LẠI
//
// Bản cũ có 10 chương nhưng **dạy sai lớp một chỗ rất nặng**: chương `g1-c4`
// "Phép cộng, phép trừ trong phạm vi 20" gồm 12 bài cộng trừ QUA 10
// (9 + 4, 11 − 5, 8 + 5, bảng cộng qua 10, bảng trừ qua 10...).
//
// Đo bằng chứng: SGK Toán 1 chủ đề 8 ghi rõ "PHÉP CỘNG, PHÉP TRỪ (**không nhớ**)
// TRONG PHẠM VI 100". Tìm chuỗi `qua 10` trong cả 2 file SGK lớp 1 → **0 kết quả**
// (lớp 2 có 13 kết quả — Bài 7, 8, 11, 12). Cộng trừ qua 10 là **Toán 2, chủ đề 2**.
//
// Hệ quả cũ: app lớp 1 dạy trước kiến thức lớp 2, và **trùng lặp** với `g2-c2`.
//
// Bản mới: 10 chương = 10 chủ đề của SGK Toán 1.
// ══════════════════════════════════════════════════════════════════════════════

export const grade1Data = {
  id: 1,
  name: "Lớp 1",
  description:
    "Các số đến 100, phép cộng trừ trong phạm vi 10 và 100 (không nhớ), hình học, đo lường và thời gian",
  icon: "🌱",
  color: "#4facfe",
  ageRange: "6-7 tuổi",
  chapters: [
    // ═══ CHỦ ĐỀ 1 — SGK: Tiết học đầu tiên, Bài 1-6 ═══
    {
      id: "g1-c1",
      name: "Chủ đề 1: Các số từ 0 đến 10",
      description:
        "Đếm, đọc, viết các số từ 0 đến 10; nhiều hơn, ít hơn, bằng nhau; so sánh số; tách và gộp số",
      icon: "🔢",
      color: "#4facfe",
      totalLessons: 12,
      lessons: [
        {
          id: "g1-c1-l1",
          title: "Bài 1: Tiết học đầu tiên",
          type: "learn",
          description:
            "Làm quen với sách, đồ dùng học Toán và cách học cùng Rô-bốt",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Chào bé! Rô-bốt là bạn đồng hành của bé trong môn Toán Lớp 1 đấy! 🚀",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Làm Quen",
                title: "Trong giờ Toán, bé sẽ làm gì?",
                explanation:
                  "Bé sẽ học đếm số, so sánh số, làm phép cộng phép trừ và nhận biết các hình.",
                points: [
                  "Cùng khám phá kiến thức mới.",
                  "Làm bài tập để thực hành.",
                  "Vừa học vừa chơi, củng cố kiến thức đã học.",
                  "Khi bé bấm sai, Rô-bốt sẽ gợi ý chứ không mắng đâu!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Khám phá → Thực hành → Củng cố",
                numberLine: {
                  from: 0,
                  to: 10,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  label: "Bé sẽ học các số từ 0 đến 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khi bấm sai một câu hỏi, bé nên làm gì?",
                options: [
                  "Đọc gợi ý của Rô-bốt rồi thử lại",
                  "Bỏ luôn bài học",
                  "Không học nữa",
                  "Chuyển sang bài khác ngay",
                ],
                answer: "Đọc gợi ý của Rô-bốt rồi thử lại",
                mascotHint:
                  "Sai là chuyện bình thường! Rô-bốt luôn có gợi ý cho bé.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Học Toán vui như chơi.",
                  "Sai thì đọc gợi ý rồi thử lại.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c1-l2",
          title: "Bài 2: Các số 1, 2, 3",
          type: "learn",
          description: "Đếm, đọc, viết các số 1, 2, 3",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đếm xem Rô-bốt có mấy quả táo nhé! 🍎",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các số 1, 2, 3",
                explanation:
                  "Mỗi số cho biết có bao nhiêu đồ vật. Bé đếm rồi đọc số.",
                rule: "Có 1 quả táo: số 1. Có 2 quả: số 2. Có 3 quả: số 3.",
                points: [
                  "Số 1 là số bé nhất trong ba số này.",
                  "Đếm: một, hai, ba.",
                  "Viết: 1, 2, 3 — mỗi số chỉ một nét đơn giản.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🍎 = 1\n🍎🍎 = 2\n🍎🍎🍎 = 3",
                tenFrame: {
                  filled: 3,
                  total: 5,
                  emoji: "🍎",
                  label: "3 quả táo — số 3",
                },
                numberLine: {
                  from: 1,
                  to: 3,
                  step: 1,
                  marks: [1, 2, 3],
                  label: "Các số 1, 2, 3",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình dưới đây có mấy con chim?",
                options: [1, 2, 3, 4],
                answer: 3,
                // 🔴 CÂU HỎI BẮT BÉ ĐẾM HÌNH, MÀ SLIDE KHÔNG CÓ GÌ ĐỂ ĐẾM.
                // Bộ sinh nội dung quên chèn hình. `QuizSlide` (LessonPage.jsx) vẽ
                // `items` thành khay emoji, nên chỉ cần thêm khoá này là hình hiện ra.
                // `count` PHẢI khớp `answer` ở trên (3 = 3).
                // Emoji chim viết dạng mã hoá \u{1F426}: ghi thẳng ký tự từng bị hỏng
                // thành U+FFFD trong dự án này, và lúc đó không sửa lại được.
                items: [{ emoji: "\u{1F426}", count: 3 }],
                mascotHint: "Đếm: một, hai, ba — có 3 con chim.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào bé nhất: 1, 2, 3?",
                options: [1, 2, 3, "Ba số bằng nhau"],
                answer: 1,
                mascotHint: "1 là số bé nhất trong ba số.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ba số đầu tiên là 1, 2, 3.",
                  "Số cho biết có bao nhiêu đồ vật.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l3",
          title: "Bài 3: Các số 4, 5",
          type: "learn",
          description: "Đếm, đọc, viết các số 4 và 5",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Một bàn tay có 5 ngón. Bé xoè tay đếm cùng Rô-bốt nhé! ✋",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các số 4, 5",
                explanation: "Bé đếm tiếp sau 3: bốn, năm.",
                rule: "Có 4 ngón tay: số 4. Có 5 ngón tay: số 5.",
                points: [
                  "Đếm: một, hai, ba, bốn, năm.",
                  "Bàn tay có 5 ngón — đó là số 5.",
                  "4 bé hơn 5; 5 lớn hơn 4.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🖐️ = 5 ngón tay\n1 · 2 · 3 · 4 · 5",
                tenFrame: { filled: 5, total: 5, emoji: "🍒", label: "5 quả — số 5" },
                numberLine: {
                  from: 1,
                  to: 5,
                  step: 1,
                  marks: [1, 2, 3, 4, 5],
                  label: "Các số 4, 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Một bàn tay có mấy ngón?",
                options: [3, 4, 5, 6],
                answer: 5,
                mascotHint: "Bàn tay có 5 ngón — số 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Các số 4 và 5.", "4 < 5 và 5 > 4."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l4",
          title: "Bài 4: Các số 6, 7, 8, 9, 10",
          type: "learn",
          description: "Đếm, đọc, viết các số từ 6 đến 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Hai bàn tay của bé có tất cả 10 ngón đấy! Bé đếm xem 🙌",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các số từ 6 đến 10",
                explanation: "Đếm tiếp sau 5: sáu, bảy, tám, chín, mười.",
                rule: "6 rồi 7, 8, 9, 10. Số 10 là số lớn nhất trong phạm vi này.",
                points: [
                  "Hai bàn tay có 10 ngón — số 10.",
                  "Đếm thêm 1 mỗi bước: 6, 7, 8, 9, 10.",
                  "10 lớn hơn tất cả các số 0, 1, 2, ..., 9.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "6 · 7 · 8 · 9 · 10\n🙌 = 10 ngón tay",
                tenFrame: {
                  filled: 10,
                  total: 10,
                  emoji: "🍒",
                  label: "10 quả — số 10",
                },
                numberLine: {
                  from: 6,
                  to: 10,
                  step: 1,
                  marks: [6, 7, 8, 9, 10],
                  label: "Các số 6, 7, 8, 9, 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Sau số 8 là số nào?",
                options: [7, 9, 10, 6],
                answer: 9,
                mascotHint: "Đếm tiếp: 8 rồi 9.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số lớn nhất trong các số từ 0 đến 10 là số nào?",
                options: [0, 9, 10, 11],
                answer: 10,
                mascotHint: "10 là số lớn nhất trong phạm vi 10.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Các số: 6, 7, 8, 9, 10.",
                  "10 là số lớn nhất trong phạm vi 10.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c1-l5",
          title: "Bài 5: Số 0",
          type: "learn",
          description: "Nhận biết số 0 và ý nghĩa của số 0",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Đĩa cam trống không, không có quả nào. Vậy có mấy quả cam nhỉ? 🍽️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Số 0",
                explanation:
                  "Số 0 chỉ KHÔNG CÓ gì cả. Số 0 bé nhất trong các số bé đã học.",
                rule: "Không có quả cam nào thì có 0 quả cam. Đọc là: không.",
                points: [
                  "0 là số bé nhất.",
                  "0 đứng đầu dãy số: 0, 1, 2, 3, ...",
                  "Khi đếm ngược từ 3: ba, hai, một, không.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🍽️ (đĩa trống) = 0\n0 · 1 · 2 · 3 · 4 · 5",
                tenFrame: {
                  filled: 0,
                  total: 5,
                  emoji: "🍽️",
                  label: "Đĩa trống — không có quả nào, đó là số 0",
                },
                numberLine: {
                  from: 0,
                  to: 5,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5],
                  label: "Số 0 đứng đầu dãy số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trên đĩa không có quả cam nào. Vậy trên đĩa có mấy quả cam?",
                options: [0, 1, 2, 3],
                answer: 0,
                mascotHint: "Không có gì thì là 0.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào bé nhất: 0, 1, 2?",
                options: [0, 1, 2, "Ba số bằng nhau"],
                answer: 0,
                mascotHint: "0 là số bé nhất.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Số 0 nghĩa là không có gì.", "0 là số bé nhất."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l6",
          title: "Bài 6: Nhiều hơn, ít hơn",
          type: "learn",
          description: "So sánh số lượng bằng cách ghép đôi",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt có 4 quả bóng, bé có 3 quả. Ai nhiều hơn nhỉ? 🎈",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Nhiều hơn, ít hơn",
                explanation:
                  "Muốn biết bên nào nhiều hơn, bé ghép đôi từng đồ vật với nhau. Bên nào THỪA RA thì bên đó nhiều hơn.",
                rule: "4 quả bóng ghép với 3 quả bóng thì thừa ra 1 quả. Vậy 4 nhiều hơn 3, và 3 ít hơn 4.",
                points: [
                  "Ghép đôi là cách so sánh dễ nhất.",
                  "Bên thừa ra là bên nhiều hơn.",
                  "4 nhiều hơn 3; 3 ít hơn 4.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎈🎈🎈🎈  (4 quả)\n🎈🎈🎈    (3 quả)\n4 nhiều hơn 3",
                comparison: { left: 4, sign: ">", right: 3 },
                tenFrame: {
                  filled: 4,
                  total: 5,
                  emoji: "🎈",
                  label: "4 quả bóng nhiều hơn 3 quả bóng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Nhóm A có 5 cái kẹo, nhóm B có 3 cái kẹo. Nhóm nào nhiều hơn?",
                options: [
                  "Nhóm A",
                  "Nhóm B",
                  "Hai nhóm bằng nhau",
                  "Không so sánh được",
                ],
                answer: "Nhóm A",
                mascotHint: "5 nhiều hơn 3, nên nhóm A nhiều hơn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ghép đôi để biết bên nào nhiều hơn.",
                  "Bên thừa ra là bên nhiều hơn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l7",
          title: "Bài 7: Bằng nhau",
          type: "learn",
          description: "Nhận biết hai nhóm có số lượng bằng nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt xếp 4 cái bút và 4 quyển vở. Hai bên có bằng nhau không nhỉ? ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Bằng nhau",
                explanation:
                  "Khi ghép đôi mà KHÔNG bên nào thừa ra thì hai nhóm có số lượng BẰNG NHAU.",
                rule: "4 cái bút ghép đủ với 4 quyển vở, không thừa cái nào. Vậy 4 bằng 4.",
                points: [
                  "Ghép đôi hết, không thừa ra → bằng nhau.",
                  "Thừa ra 1 → bên đó nhiều hơn 1.",
                  "Thừa ra 2 → bên đó nhiều hơn 2.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "✏️✏️✏️✏️\n📓📓📓📓\n4 bằng 4",
                comparison: { left: 4, sign: "=", right: 4 },
                tenFrame: {
                  filled: 4,
                  total: 5,
                  emoji: "✏️",
                  label: "4 bút chì bằng 4 quyển vở",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Nhóm A có 4 hình tròn, nhóm B có 4 hình tròn. Hai nhóm thế nào?",
                options: [
                  "Bằng nhau",
                  "Nhóm A nhiều hơn",
                  "Nhóm B nhiều hơn",
                  "Không so sánh được",
                ],
                answer: "Bằng nhau",
                mascotHint: "Cùng là 4 thì hai nhóm bằng nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ghép đôi không thừa ra thì hai nhóm bằng nhau.",
                  "4 bằng 4.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l8",
          title: "Bài 8: So sánh số — dấu >, <, =",
          type: "learn",
          description: "Dùng dấu lớn hơn, bé hơn, bằng nhau để so sánh hai số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt có ba dấu bí mật. Bé có nhớ dấu nào quay về số nào không? ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Ba dấu so sánh",
                explanation:
                  "Dấu > là LỚN HƠN, dấu < là BÉ HƠN, dấu = là BẰNG NHAU.",
                rule: "5 > 2 (năm lớn hơn hai). 2 < 5 (hai bé hơn năm). 5 = 5 (năm bằng năm).",
                points: [
                  "Miệng dấu luôn quay về số LỚN hơn.",
                  "5 > 3 vì miệng quay về 5.",
                  "3 < 5 vì miệng quay về 5.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "5  >  2\n2  <  5\n5  =  5",
                comparison: { left: 5, sign: ">", right: 2 },
                table: {
                  headers: ["Bên trái", "Dấu", "Bên phải"],
                  rows: [["5", ">", "2"], ["2", "<", "5"], ["5", "=", "5"]],
                  label: "Ba dấu cần nhớ: > , < , =",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền dấu thích hợp: 7 ? 4",
                options: [">", "<", "=", "+"],
                answer: ">",
                mascotHint: "7 lớn hơn 4 nên dùng dấu >.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền dấu thích hợp: 3 ? 3",
                options: [">", "<", "=", "−"],
                answer: "=",
                mascotHint: "3 bằng 3 nên dùng dấu =.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Miệng dấu quay về số lớn hơn.",
                  "5 > 2; 2 < 5; 5 = 5.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c1-l9",
          title: "Bài 9: Mấy và mấy — tách và gộp trong phạm vi 5",
          type: "learn",
          description: "Tách một số thành hai phần và gộp hai phần lại",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt có 5 viên bi, chia vào hai túi. Có mấy cách chia nhỉ? 🔵",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Mấy và mấy",
                explanation:
                  "Một số có thể TÁCH thành hai phần. Gộp hai phần đó lại thì được số ban đầu.",
                rule: "5 gồm 1 và 4, gồm 2 và 3, gồm 3 và 2, gồm 4 và 1.",
                points: [
                  "5 gồm 1 và 4 → 1 + 4 = 5.",
                  "5 gồm 2 và 3 → 2 + 3 = 5.",
                  "Gộp lại thì trở về số ban đầu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "5  →  1 và 4\n5  →  2 và 3\n1 + 4 = 5   2 + 3 = 5",
                tenFrame: {
                  filled: 2,
                  total: 5,
                  emoji: "🟠",
                  extra: 3,
                  label: "5 gồm 2 và 3",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "5 gồm 2 và mấy?",
                options: [1, 2, 3, 4],
                answer: 3,
                mascotHint: "2 + 3 = 5 nên 5 gồm 2 và 3.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "5 gồm 1 và 4, gồm 2 và 3.",
                  "Tách rồi gộp lại thì về số ban đầu.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l10",
          title: "Bài 10: Mấy và mấy trong phạm vi 10",
          type: "learn",
          description: "Tách và gộp các số trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé có 10 ngón tay. Bé giơ 6 ngón, còn lại mấy ngón? 🖐️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Tách số trong phạm vi 10",
                explanation:
                  "Bé tách số 10 thành hai phần theo nhiều cách khác nhau. Cách này rất cần cho phép cộng, phép trừ sau này.",
                rule: "10 gồm 6 và 4. 10 gồm 7 và 3. 10 gồm 8 và 2. 10 gồm 5 và 5.",
                points: [
                  "10 gồm 6 và 4 → 6 + 4 = 10.",
                  "10 gồm 5 và 5 → 5 + 5 = 10.",
                  "Càng luyện tách số, bé càng tính nhanh về sau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🖐️🖐️ = 10 ngón\n6 ngón giơ lên → còn 4 ngón",
                tenFrame: {
                  filled: 6,
                  total: 10,
                  emoji: "🖐️",
                  extra: 4,
                  label: "10 gồm 6 và 4",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 gồm 6 và mấy?",
                options: [3, 4, 5, 6],
                answer: 4,
                mascotHint: "6 + 4 = 10 nên 10 gồm 6 và 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 gồm 5 và mấy?",
                options: [4, 5, 6, 7],
                answer: 5,
                mascotHint: "5 + 5 = 10 nên 10 gồm 5 và 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "10 gồm 6 và 4, gồm 5 và 5, gồm 8 và 2.",
                  "Tách số giúp bé tính cộng trừ nhanh hơn.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c1-l11",
          title: "Bài 11: Luyện tập chung các số đến 10",
          type: "learn",
          description: "Ôn lại đếm, đọc, viết và so sánh các số đến 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết hết các số từ 0 đến 10 rồi! Mình cùng kiểm tra nhé 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Nhớ lại nào",
                explanation:
                  "Bé đã học: đếm từ 0 đến 10, nhiều hơn ít hơn bằng nhau, so sánh số và tách gộp số.",
                points: [
                  "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
                  "Miệng dấu quay về số lớn hơn.",
                  "Mọi số đều tách được thành hai phần.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10",
                numberLine: {
                  from: 0,
                  to: 10,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  label: "Đủ 11 số từ 0 đến 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền dấu thích hợp: 6 ? 9",
                options: [">", "<", "=", "−"],
                answer: "<",
                mascotHint: "6 bé hơn 9 nên dùng dấu <.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào đứng ngay trước số 7?",
                options: [5, 6, 8, 9],
                answer: 6,
                mascotHint: "Đếm: 5, 6, 7 — số đứng trước 7 là 6.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã nắm các số từ 0 đến 10.",
                  "6 < 9; số liền trước 7 là 6.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c1-l12",
          title: "Bài 12: Đếm xuôi, đếm ngược từ 0 đến 10",
          type: "learn",
          description: "Đếm tăng dần và giảm dần trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt chuẩn bị phóng tên lửa! Bé đếm ngược cùng Rô-bốt nhé: 5, 4, 3, 2, 1, 0! 🚀",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Đếm xuôi và đếm ngược",
                explanation:
                  "Đếm XUÔI là đếm thêm 1 mỗi bước. Đếm NGƯỢC là bớt đi 1 mỗi bước.",
                rule: "Đếm xuôi: 0, 1, 2, 3, 4, 5. Đếm ngược: 5, 4, 3, 2, 1, 0.",
                points: [
                  "Đếm xuôi thì số tăng dần.",
                  "Đếm ngược thì số giảm dần.",
                  "Đếm ngược rất giống lúc đếm ngược phóng tên lửa!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Xuôi:  0 → 1 → 2 → 3 → 4 → 5\nNgược: 5 → 4 → 3 → 2 → 1 → 0",
                numberLine: {
                  from: 0,
                  to: 10,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  hops: [
                    { from: 0, to: 10, label: "đếm xuôi" },
                    { from: 10, to: 0, label: "đếm ngược" },
                  ],
                  label: "Đếm xuôi 0 → 10, đếm ngược 10 → 0",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đếm ngược: 4, 3, 2, ... số tiếp theo là số nào?",
                options: [0, 1, 3, 5],
                answer: 1,
                mascotHint: "Đếm ngược thì bớt 1: 2 bớt 1 còn 1.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đếm xuôi từ 6: 6, 7, ... số tiếp theo là số nào?",
                options: [5, 7, 8, 9],
                answer: 8,
                mascotHint: "Đếm xuôi thì thêm 1: 7 thêm 1 được 8.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đếm xuôi: thêm 1 mỗi bước.",
                  "Đếm ngược: bớt 1 mỗi bước.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 2 — SGK Bài 7-9 ═══
    {
      id: "g1-c2",
      name: "Chủ đề 2: Làm quen với một số hình phẳng",
      description:
        "Hình vuông, hình tròn, hình tam giác, hình chữ nhật; lắp ghép và xếp hình",
      icon: "🔷",
      color: "#f6c23e",
      totalLessons: 8,
      lessons: [
        {
          id: "g1-c2-l1",
          title: "Bài 1: Hình vuông",
          type: "learn",
          description: "Nhận biết hình vuông và các vật có dạng hình vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Viên gạch hoa nhà Rô-bốt có bốn cạnh dài bằng nhau. Đó là hình gì nhỉ? 🔷",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình vuông",
                explanation:
                  "HÌNH VUÔNG có 4 cạnh và 4 cạnh đều DÀI BẰNG NHAU.",
                rule: "Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.",
                points: [
                  "Viên gạch hoa, mặt đồng hồ vuông có dạng hình vuông.",
                  "Bốn cạnh bằng nhau, không cạnh nào dài hơn cạnh nào.",
                  "Đếm đỉnh: hình vuông có 4 đỉnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▢\n4 cạnh dài bằng nhau · 4 đỉnh",
                planeShape: {
                  kind: "square",
                  labels: ["cạnh"],
                  formula: "4 cạnh dài bằng nhau · 4 đỉnh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình vuông có mấy cạnh?",
                options: [3, 4, 5, 6],
                answer: 4,
                mascotHint: "Hình vuông có 4 cạnh bằng nhau.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đặc điểm nào đúng với hình vuông?",
                options: [
                  "Bốn cạnh dài bằng nhau",
                  "Ba cạnh",
                  "Đường bao cong",
                  "Hai cạnh dài, hai cạnh ngắn",
                ],
                answer: "Bốn cạnh dài bằng nhau",
                mascotHint: "Hình vuông có 4 cạnh đều bằng nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hình vuông có 4 cạnh bằng nhau.",
                  "Viên gạch hoa có dạng hình vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l2",
          title: "Bài 2: Hình tròn",
          type: "learn",
          description: "Nhận biết hình tròn và các vật có dạng hình tròn",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mặt đồng hồ tròn xoe, không có cạnh nào cả. Đó là hình gì nhỉ? ⭕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình tròn",
                explanation:
                  "HÌNH TRÒN có đường bao CONG, khép kín, không có cạnh và không có đỉnh.",
                rule: "Hình tròn không có cạnh và không có đỉnh.",
                points: [
                  "Bánh xe, mặt đồng hồ, cái đĩa có dạng hình tròn.",
                  "Hình tròn lăn được.",
                  "Hình tròn khác hình vuông: không có cạnh, không có đỉnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "⭕\nĐường bao cong, không cạnh, không đỉnh",
                planeShape: {
                  kind: "circle",
                  formula: "Đường bao cong · không có cạnh, không có đỉnh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình tròn có mấy cạnh?",
                options: [1, 2, 4, "Không có cạnh nào"],
                answer: "Không có cạnh nào",
                mascotHint: "Hình tròn không có cạnh, chỉ có đường bao cong.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hình tròn có đường bao cong, không cạnh, không đỉnh.",
                  "Bánh xe có dạng hình tròn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l3",
          title: "Bài 3: Hình tam giác",
          type: "learn",
          description:
            "Nhận biết hình tam giác và các vật có dạng hình tam giác",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Mái nhà của Rô-bốt có ba cạnh. Bé đoán xem đó là hình gì? 🔺",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình tam giác",
                explanation: "HÌNH TAM GIÁC có 3 cạnh và 3 đỉnh.",
                rule: "Hình tam giác có 3 cạnh, 3 đỉnh.",
                points: [
                  "'Tam' nghĩa là ba — hình tam giác có 3 cạnh.",
                  "Mái nhà, biển báo giao thông có dạng tam giác.",
                  "Đếm đỉnh: hình tam giác có 3 đỉnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🔺\n3 cạnh · 3 đỉnh",
                planeShape: {
                  kind: "triangle",
                  labels: ["cạnh"],
                  formula: "3 cạnh · 3 đỉnh",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình tam giác có mấy cạnh?",
                options: [2, 3, 4, 5],
                answer: 3,
                mascotHint: "'Tam' là ba — hình tam giác có 3 cạnh.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hình tam giác có 3 cạnh, 3 đỉnh.",
                  "Mái nhà có dạng hình tam giác.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l4",
          title: "Bài 4: Hình chữ nhật",
          type: "learn",
          description: "Nhận biết hình chữ nhật và phân biệt với hình vuông",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Quyển sách của bé có bốn cạnh, nhưng hai cạnh dài hơn hai cạnh kia. Đó là hình gì? 📕",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Hình chữ nhật",
                explanation:
                  "HÌNH CHỮ NHẬT có 4 cạnh: hai cạnh DÀI bằng nhau và hai cạnh NGẮN bằng nhau.",
                rule: "Hình chữ nhật có 4 cạnh, 4 đỉnh. Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
                points: [
                  "Quyển sách, cửa ra vào, mặt bàn có dạng hình chữ nhật.",
                  "Hình chữ nhật khác hình vuông: 4 cạnh KHÔNG bằng nhau.",
                  "Cả hai đều có 4 cạnh, 4 đỉnh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▭\n2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",
                planeShape: {
                  kind: "rectangle",
                  labels: ["chiều dài", "chiều rộng"],
                  formula: "2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình chữ nhật khác hình vuông ở điểm nào?",
                options: [
                  "Bốn cạnh không bằng nhau, chỉ hai dài bằng nhau và hai ngắn bằng nhau",
                  "Có ba cạnh",
                  "Không có đỉnh",
                  "Có đường bao cong",
                ],
                answer:
                  "Bốn cạnh không bằng nhau, chỉ hai dài bằng nhau và hai ngắn bằng nhau",
                mascotHint:
                  "Hình vuông có 4 cạnh bằng nhau; hình chữ nhật thì không.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hình chữ nhật có 4 cạnh, 4 đỉnh.",
                  "Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l5",
          title: "Bài 5: Nhận biết các hình trong đồ vật quanh em",
          type: "learn",
          description: "Tìm các hình đã học trong đồ vật thực tế",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt đi một vòng quanh nhà và tìm được rất nhiều hình! Bé cùng tìm nhé 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Hình ở quanh em",
                explanation:
                  "Các hình phẳng có ở khắp nơi quanh bé. Bé nhìn và gọi tên hình của đồ vật.",
                rule: "Mặt đồng hồ tròn → hình tròn. Viên gạch vuông → hình vuông. Mái nhà → hình tam giác. Quyển sách → hình chữ nhật.",
                points: [
                  "Hình tròn: bánh xe, cái đĩa, mặt đồng hồ.",
                  "Hình vuông: viên gạch hoa, khung ảnh vuông.",
                  "Hình tam giác: mái nhà, biển báo.",
                  "Hình chữ nhật: cửa ra vào, mặt bàn, quyển sách.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "⭕ mặt đồng hồ\n▢ viên gạch\n🔺 mái nhà\n▭ quyển sách",
                planeShape: { kind: "square" },
                table: {
                  headers: ["Đồ vật", "Có dạng hình"],
                  rows: [
                    ["Mặt đồng hồ", "Hình tròn"],
                    ["Viên gạch lát nền", "Hình vuông"],
                    ["Mái nhà", "Hình tam giác"],
                    ["Quyển sách", "Hình chữ nhật"],
                  ],
                  label: "Tìm hình trong đồ vật quanh em",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Bánh xe đạp có dạng hình gì?",
                options: [
                  "Hình tròn",
                  "Hình vuông",
                  "Hình tam giác",
                  "Hình chữ nhật",
                ],
                answer: "Hình tròn",
                mascotHint: "Bánh xe tròn và lăn được — hình tròn.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Cửa ra vào của lớp học có dạng hình gì?",
                options: [
                  "Hình chữ nhật",
                  "Hình tròn",
                  "Hình tam giác",
                  "Hình vuông",
                ],
                answer: "Hình chữ nhật",
                mascotHint: "Cửa cao hơn bề ngang nên là hình chữ nhật.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé nhận ra hình tròn, hình vuông, hình tam giác, hình chữ nhật.",
                  "Các hình có ở khắp nơi quanh bé.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c2-l6",
          title: "Bài 6: Thực hành lắp ghép, xếp hình",
          type: "learn",
          description: "Dùng các hình đã học để xếp thành hình mới",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt ghép hai hình tam giác thành một hình vuông! Bé thử xem được không nhé 🔷",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Ghép hình",
                explanation:
                  "Bé có thể ghép nhiều hình nhỏ thành một hình lớn hơn, hoặc cắt một hình thành nhiều hình nhỏ.",
                rule: "Hai hình tam giác ghép lại có thể được một hình vuông.",
                points: [
                  "Ghép hai tam giác → một hình vuông.",
                  "Ghép bốn hình vuông nhỏ → một hình vuông lớn.",
                  "Dùng bộ xếp hình để thử nhiều cách khác nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🔺 + 🔺  →  ▢\n▢▢\n▢▢      →  ▢ (lớn hơn)",
                planeShape: {
                  kind: "square",
                  formula: "🔺 + 🔺 = ▢  (ghép 2 tam giác vuông thành 1 hình vuông)",
                  showName: false,
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Hai hình tam giác giống nhau ghép lại có thể được hình gì?",
                options: [
                  "Hình vuông",
                  "Hình tròn",
                  "Hình tam giác lớn hơn nữa",
                  "Không được hình nào",
                ],
                answer: "Hình vuông",
                mascotHint: "Ghép hai tam giác giống nhau được một hình vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ghép hình nhỏ thành hình lớn.",
                  "Hai tam giác ghép được một hình vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l7",
          title: "Bài 7: Đếm hình trong một hình vẽ",
          type: "learn",
          description: "Đếm số hình đã học có trong một hình ghép",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trong hình ngôi nhà này có bao nhiêu hình nhỉ? Bé đếm thật kĩ nhé! 🏠",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đếm hình theo từng loại",
                explanation:
                  "Hình ghép có nhiều hình nhỏ bên trong. Bé đếm lần lượt từng LOẠI hình để không sót.",
                rule: "Ngôi nhà: 1 mái là hình tam giác, 1 thân là hình chữ nhật, 1 cửa sổ là hình vuông.",
                points: [
                  "Đếm hình tam giác trước, rồi hình vuông, rồi hình chữ nhật.",
                  "Đếm theo loại sẽ không bị sót.",
                  "Đếm xong ghi số lượng từng loại.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🏠 → 1 hình tam giác (mái)\n     1 hình chữ nhật (thân)\n     1 hình vuông (cửa sổ)",
                planeShape: {
                  kind: "rectangle",
                  formula: "1 hình tam giác (mái) · 1 hình chữ nhật (thân) · 1 hình vuông (cửa sổ)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một ngôi nhà vẽ bằng 1 mái tam giác, 1 thân chữ nhật và 2 cửa sổ vuông. Hỏi có mấy hình vuông?",
                options: [1, 2, 3, 4],
                answer: 2,
                mascotHint: "Có 2 cửa sổ hình vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đếm hình theo từng loại để không sót.",
                  "Ngôi nhà có 1 tam giác, 1 chữ nhật, 2 hình vuông.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c2-l8",
          title: "Bài 8: Luyện tập chung chủ đề 2",
          type: "learn",
          description: "Ôn tập bốn hình phẳng đã học",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đã biết bốn hình phẳng rồi! Mình tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Bốn hình phẳng",
                explanation:
                  "Bé đã học hình vuông, hình tròn, hình tam giác và hình chữ nhật.",
                points: [
                  "Hình vuông: 4 cạnh bằng nhau.",
                  "Hình tròn: đường bao cong, không cạnh.",
                  "Hình tam giác: 3 cạnh.",
                  "Hình chữ nhật: 4 cạnh, hai dài bằng nhau và hai ngắn bằng nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▢ hình vuông · ⭕ hình tròn\n🔺 hình tam giác · ▭ hình chữ nhật",
                table: {
                  headers: ["Hình", "Đặc điểm"],
                  rows: [
                    ["Hình vuông", "4 cạnh dài bằng nhau"],
                    ["Hình tròn", "Đường bao cong, không cạnh"],
                    ["Hình tam giác", "3 cạnh, 3 đỉnh"],
                    ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
                  ],
                  label: "Bốn hình phẳng bé đã học",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình nào có 3 cạnh?",
                options: [
                  "Hình tam giác",
                  "Hình vuông",
                  "Hình tròn",
                  "Hình chữ nhật",
                ],
                answer: "Hình tam giác",
                mascotHint: "Hình tam giác có 3 cạnh.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình nào KHÔNG có cạnh nào?",
                options: [
                  "Hình tròn",
                  "Hình vuông",
                  "Hình tam giác",
                  "Hình chữ nhật",
                ],
                answer: "Hình tròn",
                mascotHint: "Hình tròn chỉ có đường bao cong, không có cạnh.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bốn hình phẳng: vuông, tròn, tam giác, chữ nhật.",
                  "Bé đã hoàn thành chủ đề 2.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 3 — SGK Bài 10-13 ═══
    {
      id: "g1-c3",
      name: "Chủ đề 3: Phép cộng, phép trừ trong phạm vi 10",
      description:
        "Phép cộng, phép trừ trong phạm vi 10; bảng cộng, bảng trừ; số 0 trong phép tính",
      icon: "➕",
      color: "#ff8a65",
      totalLessons: 14,
      lessons: [
        {
          id: "g1-c3-l1",
          title: "Bài 1: Làm quen với phép cộng và dấu cộng",
          type: "learn",
          description: "Nhận biết phép cộng nghĩa là gộp lại và thêm vào",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt có 3 quả bóng, bé cho thêm 2 quả. Có tất cả mấy quả nhỉ? 🎈",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Phép cộng là gộp lại",
                explanation:
                  "Phép cộng dùng để GỘP hai nhóm đồ vật lại. Dấu cộng viết là +.",
                rule: "3 quả bóng gộp với 2 quả bóng được 5 quả. Ta viết 3 + 2 = 5. Đọc là: ba cộng hai bằng năm.",
                points: [
                  "Dấu + đọc là 'cộng'.",
                  "Phép cộng làm số lượng TĂNG lên.",
                  "Kết quả của phép cộng luôn lớn hơn hoặc bằng mỗi số ban đầu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎈🎈🎈  +  🎈🎈  =  🎈🎈🎈🎈🎈\n3 + 2 = 5",
                operation: { left: 3, sign: "+", right: 2, result: 5 },
                tenFrame: {
                  filled: 3,
                  total: 5,
                  emoji: "🎈",
                  extra: 2,
                  label: "3 quả bóng thêm 2 quả = 5 quả",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 + 2 bằng bao nhiêu?",
                options: [4, 5, 6, 1],
                answer: 5,
                mascotHint: "Gộp 3 quả với 2 quả được 5 quả: 3 + 2 = 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Phép cộng là gộp lại, dùng dấu +.", "3 + 2 = 5."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l2",
          title: "Bài 2: Cộng bằng cách đếm tiếp",
          type: "learn",
          description: "Dùng cách đếm tiếp để tìm kết quả phép cộng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 4 con cá, thêm 3 con nữa bơi đến. Đếm tiếp thế nào cho nhanh nhỉ? 🐟",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đếm tiếp",
                explanation:
                  "Bé bắt đầu từ số thứ nhất, rồi đếm thêm đúng số lần bằng số thứ hai.",
                rule: "4 + 3: bắt đầu từ 4, đếm tiếp 5, 6, 7. Vậy 4 + 3 = 7.",
                points: [
                  "Đếm tiếp 3 bước từ 4: 5, 6, 7.",
                  "Không cần đếm lại từ đầu.",
                  "Cách này nhanh hơn đếm tất cả.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 + 3\n4 → 5 → 6 → 7\nKết quả: 7",
                numberLine: {
                  from: 4,
                  to: 7,
                  step: 1,
                  marks: [4, 5, 6, 7],
                  hops: [{ from: 4, to: 7, label: "+3" }],
                  label: "4 + 3: đếm tiếp 4 → 5 → 6 → 7",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "5 + 2 bằng bao nhiêu? Đếm tiếp từ 5 nào!",
                options: [6, 7, 8, 3],
                answer: 7,
                mascotHint: "Từ 5 đếm tiếp 2 bước: 6, 7.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Đếm tiếp từ số thứ nhất.", "4 + 3 = 7; 5 + 2 = 7."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l3",
          title: "Bài 3: Đổi chỗ hai số trong phép cộng",
          type: "learn",
          description: "Nhận biết đổi chỗ hai số hạng thì kết quả không đổi",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "2 + 5 và 5 + 2 có bằng nhau không nhỉ? Bé cùng Rô-bốt thử nhé! 🔄",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Điều Thú Vị",
                title: "Đổi chỗ, kết quả không đổi",
                explanation:
                  "Trong phép cộng, đổi chỗ hai số thì kết quả vẫn như cũ.",
                rule: "2 + 5 = 7 và 5 + 2 = 7. Vậy 2 + 5 = 5 + 2.",
                points: [
                  "Gộp 2 quả với 5 quả cũng bằng gộp 5 quả với 2 quả.",
                  "Biết 1 + 4 = 5 thì biết luôn 4 + 1 = 5.",
                  "Điều này giúp bé nhớ ít hơn mà biết nhiều hơn!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "2 + 5 = 7\n5 + 2 = 7\n→ 2 + 5 = 5 + 2",
                operation: { left: 5, sign: "+", right: 2, result: 7 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["2 + 5", "7"], ["5 + 2", "7"]],
                  label: "Đổi chỗ hai số, kết quả không đổi",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Biết 3 + 6 = 9. Vậy 6 + 3 bằng bao nhiêu?",
                options: [3, 9, 6, 15],
                answer: 9,
                mascotHint: "Đổi chỗ hai số thì kết quả không đổi: vẫn là 9.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đổi chỗ hai số trong phép cộng thì kết quả không đổi.",
                  "2 + 5 = 5 + 2 = 7.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c3-l4",
          title: "Bài 4: Số 0 trong phép cộng",
          type: "learn",
          description: "Nhận biết cộng với 0 thì kết quả không đổi",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Trên đĩa có 5 quả cam, Rô-bốt không thêm quả nào. Trên đĩa có mấy quả? 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Cộng với 0",
                explanation:
                  "Thêm 0 nghĩa là không thêm gì cả, nên số lượng giữ nguyên.",
                rule: "5 + 0 = 5. Số nào cộng với 0 cũng bằng chính số đó.",
                points: [
                  "0 + 3 = 3 và 3 + 0 = 3.",
                  "Thêm không có gì thì vẫn là số cũ.",
                  "Đây là phép cộng dễ nhất!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "5 + 0 = 5\n0 + 3 = 3",
                operation: { left: 5, sign: "+", right: 0, result: 5 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["5 + 0", "5"], ["0 + 3", "3"]],
                  label: "Cộng với 0 thì giữ nguyên số đó",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "7 + 0 bằng bao nhiêu?",
                options: [0, 1, 7, 70],
                answer: 7,
                mascotHint: "Cộng với 0 thì kết quả vẫn là chính số đó: 7.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Số nào cộng với 0 cũng bằng chính nó.", "5 + 0 = 5."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l5",
          title: "Bài 5: Làm quen với phép trừ và dấu trừ",
          type: "learn",
          description: "Nhận biết phép trừ nghĩa là bớt đi, lấy đi",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 6 cái kẹo, Rô-bốt ăn mất 2 cái. Còn lại mấy cái nhỉ? 🍬",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Phép trừ là bớt đi",
                explanation:
                  "Phép trừ dùng khi BỚT ĐI hoặc LẤY ĐI một số đồ vật. Dấu trừ viết là −.",
                rule: "6 cái kẹo bớt 2 cái còn 4 cái. Ta viết 6 − 2 = 4. Đọc là: sáu trừ hai bằng bốn.",
                points: [
                  "Dấu − đọc là 'trừ'.",
                  "Phép trừ làm số lượng GIẢM đi.",
                  "Kết quả phép trừ luôn bé hơn hoặc bằng số ban đầu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🍬🍬🍬🍬🍬🍬  −🍬🍬  =  🍬🍬🍬🍬\n6 − 2 = 4",
                operation: { left: 6, sign: "−", right: 2, result: 4 },
                tenFrame: {
                  filled: 4,
                  total: 6,
                  emoji: "🍬",
                  label: "6 cái kẹo bớt 2 còn 4 cái",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 − 2 bằng bao nhiêu?",
                options: [3, 4, 5, 8],
                answer: 4,
                mascotHint: "6 cái kẹo bớt 2 còn 4: 6 − 2 = 4.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Phép trừ là bớt đi, dùng dấu −.", "6 − 2 = 4."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l6",
          title: "Bài 6: Trừ bằng cách đếm lùi",
          type: "learn",
          description: "Dùng cách đếm lùi để tìm kết quả phép trừ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Có 9 quả bóng, bay mất 3 quả. Đếm lùi thế nào cho nhanh? 🎈",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đếm lùi",
                explanation:
                  "Bé bắt đầu từ số bị trừ, rồi đếm lùi lại đúng số bước bằng số trừ.",
                rule: "9 − 3: bắt đầu từ 9, đếm lùi 8, 7, 6. Vậy 9 − 3 = 6.",
                points: [
                  "Đếm lùi 3 bước từ 9: 8, 7, 6.",
                  "Đếm lùi là bớt 1 mỗi bước.",
                  "Cách này rất nhanh khi số trừ bé.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "9 − 3\n9 → 8 → 7 → 6\nKết quả: 6",
                numberLine: {
                  from: 6,
                  to: 9,
                  step: 1,
                  marks: [6, 7, 8, 9],
                  hops: [{ from: 9, to: 6, label: "−3" }],
                  label: "9 − 3: đếm lùi 9 → 8 → 7 → 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "8 − 2 bằng bao nhiêu? Đếm lùi từ 8 nào!",
                options: [5, 6, 7, 10],
                answer: 6,
                mascotHint: "Từ 8 đếm lùi 2 bước: 7, 6.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Đếm lùi từ số bị trừ.", "9 − 3 = 6; 8 − 2 = 6."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l7",
          title: "Bài 7: Số 0 trong phép trừ",
          type: "learn",
          description: "Nhận biết trừ đi 0 và trừ hai số bằng nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 4 cái bánh, Rô-bốt không ăn cái nào. Vậy còn mấy cái? 🍪",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Trừ đi 0",
                explanation:
                  "Bớt 0 nghĩa là không bớt gì cả, nên số lượng giữ nguyên. Trừ hai số bằng nhau thì còn 0.",
                rule: "4 − 0 = 4. Và 4 − 4 = 0.",
                points: [
                  "Số nào trừ 0 cũng bằng chính nó.",
                  "Hai số bằng nhau trừ nhau thì bằng 0.",
                  "5 − 5 = 0; 7 − 0 = 7.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 − 0 = 4\n4 − 4 = 0",
                operation: { left: 4, sign: "−", right: 0, result: 4 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["4 − 0", "4"], ["4 − 4", "0"]],
                  label: "Trừ 0 thì giữ nguyên · trừ hết thì bằng 0",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 − 0 bằng bao nhiêu?",
                options: [0, 6, 60, 1],
                answer: 6,
                mascotHint: "Trừ đi 0 thì giữ nguyên: 6.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 − 6 bằng bao nhiêu?",
                options: [0, 6, 12, 1],
                answer: 0,
                mascotHint: "Lấy hết đi thì không còn gì: 6 − 6 = 0.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số nào trừ 0 cũng bằng chính nó.",
                  "Hai số bằng nhau trừ nhau thì bằng 0.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c3-l8",
          title: "Bài 8: Bảng cộng trong phạm vi 10",
          type: "learn",
          description: "Học thuộc bảng cộng trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã thuộc bảng cộng chưa? Cùng Rô-bốt học thuộc nhé! 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Cộng",
                title: "Bảng cộng trong phạm vi 10",
                explanation:
                  "Bảng này gồm tất cả các phép cộng có kết quả từ 2 đến 10. Học thuộc thì bé tính nhẩm rất nhanh.",
                rule: "1+1=2 · 2+2=4 · 3+3=6 · 4+4=8 · 5+5=10. Và 2+3=5 · 3+4=7 · 4+5=9.",
                points: [
                  "Các phép cộng hai số giống nhau cho số chẵn: 3 + 3 = 6.",
                  "Kết quả lớn nhất là 10.",
                  "Đổi chỗ hai số thì kết quả không đổi, nên bé chỉ cần nhớ một nửa bảng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1+1=2  2+2=4  3+3=6  4+4=8  5+5=10\n2+3=5  3+4=7  4+5=9  5+4=9",
                table: {
                  headers: ["Phép cộng", "Kết quả"],
                  rows: [
                    ["1 + 1", "2"],
                    ["2 + 2", "4"],
                    ["3 + 3", "6"],
                    ["4 + 4", "8"],
                    ["5 + 5", "10"],
                    ["2 + 3", "5"],
                  ],
                  label: "Bảng cộng trong phạm vi 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 + 5 bằng bao nhiêu?",
                options: [8, 9, 10, 11],
                answer: 9,
                mascotHint: "4 + 5 = 9 (và 5 + 4 cũng bằng 9).",
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 + 3 bằng bao nhiêu?",
                options: [5, 6, 7, 9],
                answer: 6,
                mascotHint: "3 + 3 = 6.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng cộng có kết quả đến 10.",
                  "4 + 5 = 9; 3 + 3 = 6.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l9",
          title: "Bài 9: Bảng trừ trong phạm vi 10",
          type: "learn",
          description: "Học thuộc bảng trừ trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Từ bảng cộng, bé suy ra bảng trừ ngay được đấy! Bé xem nhé ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Bảng Trừ",
                title: "Bảng trừ trong phạm vi 10",
                explanation: "Từ một phép cộng, bé viết được hai phép trừ.",
                rule: "5 + 4 = 9 → 9 − 5 = 4 và 9 − 4 = 5.",
                points: [
                  "9 − 5 = 4; 9 − 4 = 5.",
                  "10 − 5 = 5.",
                  "Học bảng cộng là có luôn bảng trừ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "5 + 4 = 9\n9 − 5 = 4\n9 − 4 = 5",
                operation: { left: 9, sign: "−", right: 5, result: 4 },
                table: {
                  headers: ["Phép trừ", "Kết quả"],
                  rows: [
                    ["9 − 5", "4"],
                    ["9 − 4", "5"],
                    ["8 − 3", "5"],
                    ["10 − 4", "6"],
                  ],
                  label: "Bảng trừ trong phạm vi 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Biết 3 + 6 = 9. Vậy 9 − 3 bằng bao nhiêu?",
                options: [3, 6, 9, 12],
                answer: 6,
                mascotHint: "9 − 3 = 6 (vì 3 + 6 = 9).",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 − 5 bằng bao nhiêu?",
                options: [4, 5, 6, 15],
                answer: 5,
                mascotHint: "5 + 5 = 10 nên 10 − 5 = 5.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Từ một phép cộng viết được hai phép trừ.",
                  "9 − 5 = 4; 10 − 5 = 5.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c3-l10",
          title: "Bài 10: Quan hệ giữa phép cộng và phép trừ",
          type: "learn",
          description: "Nhận biết cộng và trừ là hai phép tính ngược nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Cộng rồi trừ cùng một số thì sao nhỉ? Bé thử với 5 nhé! 🔄",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Điều Thú Vị",
                title: "Cộng và trừ ngược nhau",
                explanation:
                  "Cộng thêm bao nhiêu rồi trừ đi bấy nhiêu thì trở về số ban đầu.",
                rule: "5 + 3 = 8, rồi 8 − 3 = 5. Ta trở về đúng số 5 lúc đầu.",
                points: [
                  "Cộng làm tăng, trừ làm giảm.",
                  "Cùng một số: cộng rồi trừ thì về chỗ cũ.",
                  "Nhờ vậy bé thử lại được kết quả phép cộng bằng phép trừ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "5 + 3 = 8\n8 − 3 = 5\nVề lại số ban đầu",
                operation: { left: 5, sign: "+", right: 3, result: 8 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["5 + 3", "8"], ["8 − 3", "5"], ["8 − 5", "3"]],
                  label: "Từ một phép cộng suy ra hai phép trừ",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 + 2 = 8. Vậy 8 − 2 bằng bao nhiêu?",
                options: [2, 6, 8, 10],
                answer: 6,
                mascotHint: "Cộng 2 rồi trừ 2 thì về số ban đầu: 6.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng và trừ là hai phép ngược nhau.",
                  "6 + 2 = 8 và 8 − 2 = 6.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l11",
          title: "Bài 11: Tìm số còn thiếu trong phép tính",
          type: "learn",
          description: "Tìm số hạng còn thiếu trong phép cộng đơn giản",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt che mất một số: 3 + ? = 7. Bé tìm giúp nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Tìm số còn thiếu",
                explanation:
                  "Bé đếm từ số đã biết lên đến kết quả xem cần thêm mấy bước.",
                rule: "3 + ? = 7: từ 3 đếm tiếp 4, 5, 6, 7 — thêm 4 bước. Vậy số còn thiếu là 4.",
                points: [
                  "Đếm tiếp từ số đã biết đến kết quả.",
                  "Số bước đếm được chính là số còn thiếu.",
                  "3 + 4 = 7 nên chỗ trống là 4.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "3 + ? = 7\n3 → 4 → 5 → 6 → 7  (4 bước)\n? = 4",
                numberLine: {
                  from: 3,
                  to: 7,
                  step: 1,
                  marks: [3, 4, 5, 6, 7],
                  hops: [{ from: 3, to: 7, label: "? bước" }],
                  label: "3 + ? = 7 — đếm từ 3 đến 7 được 4 bước",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: 3 + ? = 7",
                options: [3, 4, 5, 10],
                answer: 4,
                mascotHint: "Từ 3 đếm tiếp 4 bước thì đến 7. Vậy ? = 4.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: ? + 2 = 6",
                options: [3, 4, 5, 8],
                answer: 4,
                mascotHint: "4 + 2 = 6 nên ? = 4.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Đếm tiếp để tìm số còn thiếu.", "3 + 4 = 7."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l12",
          title: "Bài 12: Bài toán có lời văn — thêm vào, bớt đi",
          type: "learn",
          description: "Giải bài toán đơn giản có thêm vào hoặc bớt đi",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Trên cành có 5 con chim, 2 con bay đến. Hỏi có tất cả mấy con? 🐤",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "'Thêm vào' thì cộng, 'bớt đi' thì trừ",
                explanation:
                  "Bé đọc kĩ đề, tìm từ khóa để biết dùng phép cộng hay phép trừ.",
                rule: "5 con chim, thêm 2 con: 5 + 2 = 7 (con chim).",
                points: [
                  "Từ khóa cộng: thêm, có thêm, bay đến, cho thêm.",
                  "Từ khóa trừ: bớt, bay đi, cho đi, ăn mất.",
                  "Đáp số phải ghi kèm đơn vị: con chim.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Có 5 con chim + thêm 2 con\n5 + 2 = 7 (con chim)",
                operation: { left: 5, sign: "+", right: 2, result: 7 },
                barModel: {
                  rows: [
                    { label: "Có sẵn", parts: 5 },
                    { label: "Thêm vào", parts: 2 },
                  ],
                  braceLabel: "7 con chim",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trên cành có 5 con chim, 2 con bay đến. Hỏi có tất cả bao nhiêu con chim?",
                options: [3, 6, 7, 8],
                answer: 7,
                mascotHint: "Thêm vào thì cộng: 5 + 2 = 7 con chim.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 8 quả bóng, bay mất 3 quả. Hỏi còn lại bao nhiêu quả bóng?",
                options: [4, 5, 6, 11],
                answer: 5,
                mascotHint: "Bớt đi thì trừ: 8 − 3 = 5 quả bóng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Thêm' thì cộng, 'bớt' thì trừ.",
                  "5 + 2 = 7; 8 − 3 = 5.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c3-l13",
          title: "Bài 13: Luyện tập cộng trừ trong phạm vi 10",
          type: "learn",
          description: "Luyện tập tổng hợp cộng trừ trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết cộng trừ rồi! Mình luyện cho thật nhanh nhé 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Ba mẹo tính nhanh",
                explanation:
                  "Bé dùng ba mẹo: đếm tiếp khi cộng, đếm lùi khi trừ, và nhớ bảng cộng trừ.",
                points: [
                  "Cộng: đếm tiếp từ số lớn hơn cho nhanh.",
                  "Trừ: đếm lùi.",
                  "Số nào cộng 0 cũng bằng chính nó; trừ 0 cũng vậy.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "6 + 3 = 9\n9 − 3 = 6\n9 − 6 = 3",
                operation: { left: 6, sign: "+", right: 3, result: 9 },
                numberLine: {
                  from: 6,
                  to: 9,
                  step: 1,
                  marks: [6, 7, 8, 9],
                  label: "Đếm tiếp từ 6 thêm 3 bước được 9",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "6 + 3 bằng bao nhiêu?",
                options: [8, 9, 10, 3],
                answer: 9,
                mascotHint: "Từ 6 đếm tiếp 3 bước: 7, 8, 9.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "7 − 4 bằng bao nhiêu?",
                options: [2, 3, 4, 11],
                answer: 3,
                mascotHint: "Từ 7 đếm lùi 4 bước: 6, 5, 4, 3.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng thì đếm tiếp, trừ thì đếm lùi.",
                  "6 + 3 = 9; 7 − 4 = 3.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c3-l14",
          title: "Bài 14: Luyện tập chung chủ đề 3",
          type: "learn",
          description: "Ôn tập toàn bộ phép cộng, phép trừ trong phạm vi 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Hết chủ đề 3 rồi! Bé đã tính cộng trừ trong phạm vi 10 rất tốt! 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 3",
                explanation:
                  "Bé đã học phép cộng, phép trừ trong phạm vi 10, bảng cộng, bảng trừ và bài toán có lời văn.",
                points: [
                  "Cộng là gộp lại; trừ là bớt đi.",
                  "Đổi chỗ hai số khi cộng thì kết quả không đổi.",
                  "Cộng rồi trừ cùng một số thì về số ban đầu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 + 6 = 10\n10 − 4 = 6\n10 − 6 = 4",
                operation: { left: 4, sign: "+", right: 6, result: 10 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["4 + 6", "10"], ["10 − 4", "6"], ["10 − 6", "4"]],
                  label: "Một phép cộng, hai phép trừ",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "4 + 6 bằng bao nhiêu?",
                options: [9, 10, 11, 2],
                answer: 10,
                mascotHint: "4 + 6 = 10.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 − 6 bằng bao nhiêu?",
                options: [3, 4, 6, 16],
                answer: 4,
                mascotHint: "Vì 6 + 4 = 10 nên 10 − 6 = 4.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 3.",
                  "4 + 6 = 10; 10 − 6 = 4.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 4 — SGK Bài 14-16 ═══
    {
      id: "g1-c4",
      name: "Chủ đề 4: Làm quen với một số hình khối",
      description:
        "Khối lập phương, khối hộp chữ nhật; vị trí và định hướng trong không gian",
      icon: "🧊",
      color: "#8e7cc3",
      totalLessons: 7,
      lessons: [
        {
          id: "g1-c4-l1",
          title: "Bài 1: Khối lập phương",
          type: "learn",
          description:
            "Nhận biết khối lập phương và các vật có dạng khối lập phương",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Con xúc xắc của Rô-bốt có sáu mặt đều là hình vuông. Đó là khối gì nhỉ? 🎲",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Khối lập phương",
                explanation:
                  "KHỐI LẬP PHƯƠNG có 6 mặt, và cả 6 mặt đều là HÌNH VUÔNG bằng nhau.",
                rule: "Khối lập phương có 6 mặt đều là hình vuông.",
                points: [
                  "Con xúc xắc, khối rubik có dạng khối lập phương.",
                  "Đặt thế nào cũng đứng vững được.",
                  "Xếp chồng lên nhau được.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎲 khối lập phương\n6 mặt đều là hình vuông",
                solid: {
                  kind: "cube",
                  dims: { a: 3 },
                  label: "Khối lập phương",
                  formula: "6 mặt đều là hình vuông bằng nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khối lập phương có mấy mặt?",
                options: [4, 5, 6, 8],
                answer: 6,
                mascotHint: "Khối lập phương có 6 mặt, đều là hình vuông.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Khối lập phương có 6 mặt đều là hình vuông.",
                  "Con xúc xắc có dạng khối lập phương.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c4-l2",
          title: "Bài 2: Khối hộp chữ nhật",
          type: "learn",
          description:
            "Nhận biết khối hộp chữ nhật và phân biệt với khối lập phương",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hộp sữa của bé có sáu mặt, nhưng các mặt không bằng nhau. Đó là khối gì? 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Khối hộp chữ nhật",
                explanation:
                  "KHỐI HỘP CHỮ NHẬT có 6 mặt, các mặt là hình chữ nhật (có thể có 2 mặt là hình vuông).",
                rule: "Khối hộp chữ nhật có 6 mặt, các mặt không đều bằng nhau như khối lập phương.",
                points: [
                  "Hộp sữa, viên gạch, hộp bánh có dạng khối hộp chữ nhật.",
                  "Khác khối lập phương ở chỗ: các mặt KHÔNG bằng nhau.",
                  "Cũng có 6 mặt.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🥛 khối hộp chữ nhật\n6 mặt, các mặt không đều nhau",
                solid: {
                  kind: "cuboid",
                  dims: { a: 4, b: 3, c: 2 },
                  label: "Khối hộp chữ nhật",
                  formula: "6 mặt, các mặt không đều nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khối hộp chữ nhật khác khối lập phương ở điểm nào?",
                options: [
                  "Các mặt không đều bằng nhau",
                  "Có 4 mặt",
                  "Không xếp chồng được",
                  "Không có mặt nào",
                ],
                answer: "Các mặt không đều bằng nhau",
                mascotHint:
                  "Khối lập phương có 6 mặt vuông bằng nhau; khối hộp chữ nhật thì không.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Khối hộp chữ nhật có 6 mặt, các mặt không đều nhau.",
                  "Hộp sữa có dạng khối hộp chữ nhật.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c4-l3",
          title: "Bài 3: Nhận biết hai khối quanh em",
          type: "learn",
          description:
            "Phân biệt khối lập phương và khối hộp chữ nhật trong đồ vật",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt xếp đồ chơi vào hai rổ. Rổ nào là khối lập phương nhỉ? 🧺",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Phân loại hai khối",
                explanation:
                  "Bé nhìn vào các mặt để phân biệt: 6 mặt vuông bằng nhau là khối lập phương; các mặt không đều là khối hộp chữ nhật.",
                rule: "Xúc xắc → khối lập phương. Hộp quà → khối hộp chữ nhật.",
                points: [
                  "Khối lập phương: 6 mặt vuông bằng nhau.",
                  "Khối hộp chữ nhật: 6 mặt, không đều nhau.",
                  "Cả hai đều xếp chồng được.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎲 xúc xắc → lập phương\n📦 hộp quà → hộp chữ nhật",
                solid: { kind: "cuboid", dims: { a: 3, b: 2, c: 2 } },
                table: {
                  headers: ["Đồ vật", "Là khối gì"],
                  rows: [
                    ["Xúc xắc", "Khối lập phương"],
                    ["Hộp quà", "Khối hộp chữ nhật"],
                  ],
                  label: "Nhận biết hai khối quanh em",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Vật nào có dạng khối lập phương?",
                options: ["Con xúc xắc", "Hộp sữa", "Quả bóng", "Cái đĩa"],
                answer: "Con xúc xắc",
                mascotHint:
                  "Xúc xắc có 6 mặt vuông bằng nhau — khối lập phương.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Vật nào có dạng khối hộp chữ nhật?",
                options: ["Viên gạch", "Con xúc xắc", "Quả bóng", "Cái đĩa"],
                answer: "Viên gạch",
                mascotHint:
                  "Viên gạch dài, các mặt không đều nhau — khối hộp chữ nhật.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "6 mặt vuông bằng nhau → khối lập phương.",
                  "6 mặt không đều nhau → khối hộp chữ nhật.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c4-l4",
          title: "Bài 4: Vị trí — trên, dưới, trước, sau",
          type: "learn",
          description: "Xác định vị trí trên dưới, trước sau của đồ vật",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Con chim đậu trên cành, con mèo ngồi dưới gốc cây. Bé cùng xác định vị trí nhé! 🐦",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trên — dưới, trước — sau",
                explanation:
                  "Bé dùng các từ TRÊN, DƯỚI, TRƯỚC, SAU để nói vị trí của đồ vật.",
                rule: "Con chim ở TRÊN cành. Con mèo ở DƯỚI gốc cây.",
                points: [
                  "TRÊN là ở phía cao hơn.",
                  "DƯỚI là ở phía thấp hơn.",
                  "TRƯỚC là phía bé nhìn thấy; SAU là phía sau lưng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🐦 trên cành\n🐱 dưới gốc cây",
                table: {
                  headers: ["Vị trí", "Ví dụ"],
                  rows: [
                    ["Trên", "Con chim ở trên cành"],
                    ["Dưới", "Con mèo ở dưới gốc cây"],
                    ["Trước", "Rô-bốt ở phía trước"],
                    ["Sau", "Cái cặp ở phía sau"],
                  ],
                  label: "Trên · dưới · trước · sau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Con chim đậu trên cành cây. Con chim ở đâu so với cành cây?",
                options: ["Ở trên", "Ở dưới", "Ở trước", "Ở sau"],
                answer: "Ở trên",
                mascotHint: "Đậu trên cành nghĩa là ở phía trên cành.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Dùng các từ trên, dưới, trước, sau để nói vị trí.",
                  "Trên là phía cao hơn; dưới là phía thấp hơn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c4-l5",
          title: "Bài 5: Vị trí — trái, phải",
          type: "learn",
          description: "Phân biệt bên trái và bên phải",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt giơ tay phải chào bé. Tay nào là tay phải nhỉ? 🙋",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Bên trái và bên phải",
                explanation:
                  "Bé dùng tay phải để viết, tay trái để giữ vở. Bên phải là bên có tay phải.",
                rule: "Tay phải ở bên phải, tay trái ở bên trái.",
                points: [
                  "Bên phải là bên tay bé cầm bút.",
                  "Bên trái là bên còn lại.",
                  "Chú ý: trái phải của bé khác với trái phải của người đối diện!",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🙋 Tay phải → bên phải\nTay trái  → bên trái",
                table: {
                  headers: ["Bên", "Ví dụ"],
                  rows: [
                    ["Bên phải", "Tay phải của bé"],
                    ["Bên trái", "Tay trái của bé"],
                  ],
                  label: "Trái và phải",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Bé cầm bút bằng tay phải để viết. Tay đó ở bên nào?",
                options: ["Bên phải", "Bên trái", "Ở giữa", "Phía sau"],
                answer: "Bên phải",
                mascotHint: "Tay phải ở bên phải.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tay phải ở bên phải, tay trái ở bên trái.",
                  "Bé cầm bút bằng tay phải.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c4-l6",
          title: "Bài 6: Định hướng trong không gian",
          type: "learn",
          description: "Xác định vị trí của đồ vật theo nhiều hướng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Rô-bốt giấu quả bóng rồi! Bé tìm theo hướng dẫn nhé: đi lên, rẽ trái... 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Mô tả đường đi",
                explanation:
                  "Bé dùng các từ trên, dưới, trái, phải, trước, sau để mô tả đường đi hoặc vị trí.",
                rule: "Quả bóng ở trên bàn, bên phải quyển sách, phía trước Rô-bốt.",
                points: [
                  "Nói rõ vị trí theo từng bước: ở trên, ở dưới, bên phải, bên trái.",
                  "Có thể vừa nói vừa chỉ tay để rõ hơn.",
                  "Chơi trò tìm đồ vật theo hướng dẫn sẽ giúp bé nhớ rất nhanh.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bóng ở TRÊN bàn,\nBÊN PHẢI quyển sách,\nPHÍA TRƯỚC Rô-bốt",
                table: {
                  headers: ["Đồ vật", "Ở đâu"],
                  rows: [
                    ["Quả bóng", "Ở trên bàn"],
                    ["Quyển sách", "Ở bên phải"],
                    ["Rô-bốt", "Ở phía trước"],
                  ],
                  label: "Định hướng trong không gian",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Quả bóng đặt trên mặt bàn. Quả bóng ở đâu so với mặt bàn?",
                options: ["Ở trên", "Ở dưới", "Bên trái", "Ở sau"],
                answer: "Ở trên",
                mascotHint: "Đặt trên mặt bàn nghĩa là ở phía trên.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Mô tả vị trí bằng các từ: trên, dưới, trái, phải, trước, sau.",
                  "Nói rõ từng bước để bạn khác tìm được.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c4-l7",
          title: "Bài 7: Luyện tập chung chủ đề 4",
          type: "learn",
          description: "Ôn tập hai khối và vị trí trong không gian",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đã biết hai khối và cách xác định vị trí rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 4",
                explanation:
                  "Bé đã học khối lập phương, khối hộp chữ nhật và các vị trí trong không gian.",
                points: [
                  "Khối lập phương: 6 mặt vuông bằng nhau.",
                  "Khối hộp chữ nhật: 6 mặt, không đều nhau.",
                  "Vị trí: trên, dưới, trước, sau, trái, phải.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🎲 lập phương · 📦 hộp chữ nhật\ntrên · dưới · trái · phải",
                solid: { kind: "cube", dims: { a: 3 } },
                table: {
                  headers: ["Từ chỉ vị trí", "Nghĩa"],
                  rows: [
                    ["Trên", "cao hơn"],
                    ["Dưới", "thấp hơn"],
                    ["Trái", "bên tay trái"],
                    ["Phải", "bên tay phải"],
                  ],
                  label: "Ôn lại các từ chỉ vị trí",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Con xúc xắc có dạng khối gì?",
                options: [
                  "Khối lập phương",
                  "Khối hộp chữ nhật",
                  "Hình tròn",
                  "Hình tam giác",
                ],
                answer: "Khối lập phương",
                mascotHint:
                  "Xúc xắc có 6 mặt vuông bằng nhau — khối lập phương.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hai loại khối: lập phương và hộp chữ nhật.",
                  "Bé đã hoàn thành chủ đề 4.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 5 — SGK Bài 17-20 ═══
    {
      id: "g1-c5",
      name: "Chủ đề 5: Ôn tập học kì 1",
      description:
        "Ôn tập các số trong phạm vi 10, phép cộng trừ trong phạm vi 10 và hình học",
      icon: "📖",
      color: "#90be6d",
      totalLessons: 6,
      lessons: [
        {
          id: "g1-c5-l1",
          title: "Bài 1: Ôn tập các số trong phạm vi 10",
          type: "learn",
          description: "Ôn lại đọc, viết, đếm và tách gộp các số đến 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Hết học kì 1 rồi! Mình cùng ôn lại các số thật chắc nhé 📖",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Các số trong phạm vi 10",
                explanation:
                  "Bé nhớ lại: đếm xuôi, đếm ngược, so sánh số và tách gộp số.",
                rule: "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số liền sau 7 là 8; số liền trước 7 là 6.",
                points: [
                  "Đếm ngược từ 10: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0.",
                  "10 gồm 7 và 3; gồm 6 và 4.",
                  "Miệng dấu quay về số lớn hơn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10",
                numberLine: {
                  from: 0,
                  to: 10,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  label: "Ôn lại các số từ 0 đến 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền sau của 7 là số nào?",
                options: [6, 8, 9, 10],
                answer: 8,
                mascotHint: "7 thêm 1 được 8.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 gồm 7 và mấy?",
                options: [2, 3, 4, 7],
                answer: 3,
                mascotHint: "7 + 3 = 10 nên 10 gồm 7 và 3.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Các số từ 0 đến 10.",
                  "Số liền sau của 7 là 8; 10 gồm 7 và 3.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c5-l2",
          title: "Bài 2: Ôn tập so sánh số",
          type: "learn",
          description: "Ôn lại so sánh số và nhiều hơn, ít hơn, bằng nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé còn nhớ miệng dấu quay về số nào không? Cùng kiểm tra nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "So sánh số",
                explanation:
                  "Dấu > là lớn hơn, < là bé hơn, = là bằng nhau. Miệng dấu luôn quay về số LỚN hơn.",
                rule: "8 > 5; 5 < 8; 8 = 8.",
                points: [
                  "Ghép đôi để biết bên nào nhiều hơn.",
                  "Số đứng sau trong dãy số thì lớn hơn.",
                  "10 là số lớn nhất trong phạm vi 10.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "8  >  5\n5  <  8\n8  =  8",
                comparison: { left: 8, sign: ">", right: 5 },
                table: {
                  headers: ["So sánh", "Dấu"],
                  rows: [["8 với 5", ">"], ["5 với 8", "<"], ["8 với 8", "="]],
                  label: "Ôn tập so sánh số",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền dấu thích hợp: 4 ? 9",
                options: [">", "<", "=", "+"],
                answer: "<",
                mascotHint: "4 bé hơn 9 nên dùng dấu <.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Miệng dấu quay về số lớn hơn.", "4 < 9; 8 > 5."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c5-l3",
          title: "Bài 3: Ôn tập phép cộng, phép trừ trong phạm vi 10",
          type: "learn",
          description:
            "Ôn lại bảng cộng, bảng trừ trong phạm vi 10 để chuẩn bị thi học kì 1",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bảng cộng và bảng trừ — bé còn nhớ hết không? 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Cộng trừ trong phạm vi 10",
                explanation:
                  "Cộng thì đếm tiếp; trừ thì đếm lùi. Từ một phép cộng viết được hai phép trừ.",
                rule: "4 + 5 = 9 → 9 − 4 = 5 và 9 − 5 = 4.",
                points: [
                  "Số nào cộng 0 cũng bằng chính nó.",
                  "Hai số bằng nhau trừ nhau thì bằng 0.",
                  "Cộng rồi trừ cùng một số thì về số ban đầu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "4 + 5 = 9\n9 − 4 = 5\n9 − 5 = 4",
                operation: { left: 4, sign: "+", right: 5, result: 9 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["4 + 5", "9"], ["9 − 4", "5"], ["9 − 5", "4"]],
                  label: "Ôn tập cộng trừ trong phạm vi 10",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "7 + 3 bằng bao nhiêu?",
                options: [9, 10, 11, 4],
                answer: 10,
                mascotHint: "7 + 3 = 10.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 − 7 bằng bao nhiêu?",
                options: [2, 3, 4, 17],
                answer: 3,
                mascotHint: "Vì 7 + 3 = 10 nên 10 − 7 = 3.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "7 + 3 = 10; 10 − 7 = 3.",
                  "Từ phép cộng viết được hai phép trừ.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c5-l4",
          title: "Bài 4: Ôn tập hình học",
          type: "learn",
          description: "Ôn lại hình phẳng và hình khối đã học",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã học bao nhiêu hình rồi nhỉ? Kể lại xem! 🔷",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Hình phẳng và hình khối",
                explanation:
                  "Hình phẳng: hình vuông, hình tròn, hình tam giác, hình chữ nhật. Hình khối: khối lập phương, khối hộp chữ nhật.",
                rule: "Hình vuông có 4 cạnh bằng nhau; hình tam giác có 3 cạnh.",
                points: [
                  "Hình tròn có đường bao cong, không cạnh.",
                  "Hình chữ nhật có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
                  "Khối lập phương có 6 mặt vuông bằng nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▢ · ⭕ · 🔺 · ▭\n🎲 khối lập phương · 📦 khối hộp chữ nhật",
                planeShape: { kind: "square" },
                table: {
                  headers: ["Hình", "Đặc điểm"],
                  rows: [
                    ["Hình vuông", "4 cạnh dài bằng nhau"],
                    ["Hình tròn", "Đường bao cong"],
                    ["Hình tam giác", "3 cạnh, 3 đỉnh"],
                    ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
                  ],
                  label: "Ôn tập hình học",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình nào có 4 cạnh dài bằng nhau?",
                options: [
                  "Hình vuông",
                  "Hình chữ nhật",
                  "Hình tam giác",
                  "Hình tròn",
                ],
                answer: "Hình vuông",
                mascotHint: "Hình vuông có 4 cạnh bằng nhau.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khối nào có 6 mặt đều là hình vuông?",
                options: [
                  "Khối lập phương",
                  "Khối hộp chữ nhật",
                  "Hình tròn",
                  "Hình chữ nhật",
                ],
                answer: "Khối lập phương",
                mascotHint: "Khối lập phương có 6 mặt vuông bằng nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bốn hình phẳng và hai loại khối.",
                  "Hình vuông: 4 cạnh bằng nhau.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c5-l5",
          title: "Bài 5: Ôn tập vị trí trong không gian",
          type: "learn",
          description: "Ôn lại trên dưới, trước sau, trái phải",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé nói vị trí của đồ vật trong phòng học xem nào! 🪑",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Nói vị trí",
                explanation:
                  "Bé dùng các từ trên, dưới, trước, sau, trái, phải để nói vị trí đồ vật.",
                rule: "Đèn học ở TRÊN bàn. Cặp sách ở DƯỚI bàn. Thước kẻ ở BÊN PHẢI quyển vở.",
                points: [
                  "Nói rõ theo từng hướng.",
                  "Có thể dùng tay chỉ để làm rõ hơn.",
                  "Vị trí trái phải phụ thuộc vào người đứng nhìn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "💡 đèn ở TRÊN bàn\n🎒 cặp ở DƯỚI bàn",
                table: {
                  headers: ["Đồ vật", "Vị trí"],
                  rows: [["Đèn bàn", "Ở trên bàn"], ["Cặp sách", "Ở dưới bàn"]],
                  label: "Ôn tập vị trí trong không gian",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Cặp sách đặt dưới mặt bàn. Cặp sách ở đâu so với mặt bàn?",
                options: ["Ở dưới", "Ở trên", "Bên trái", "Ở trước"],
                answer: "Ở dưới",
                mascotHint: "Đặt dưới mặt bàn nghĩa là ở phía dưới.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Nói vị trí bằng: trên, dưới, trước, sau, trái, phải.",
                  "Đèn học ở trên bàn, cặp sách ở dưới bàn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c5-l6",
          title: "Bài 6: Ôn tập chung học kì 1",
          type: "learn",
          description: "Ôn tập tổng hợp toàn bộ học kì 1 lớp 1",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã đi hết nửa năm Lớp 1 rồi! Mình cùng nhìn lại nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập Chung",
                title: "Học kì 1 bé đã học gì?",
                explanation:
                  "Bé đã học các số đến 10, phép cộng trừ trong phạm vi 10, các hình phẳng, hai loại khối và vị trí trong không gian.",
                points: [
                  "Số: đếm, đọc, viết, so sánh, tách gộp.",
                  "Phép tính: cộng và trừ trong phạm vi 10.",
                  "Hình: vuông, tròn, tam giác, chữ nhật, khối lập phương, khối hộp chữ nhật.",
                  "Vị trí: trên, dưới, trước, sau, trái, phải.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Số đến 10 · Cộng trừ · Hình học · Vị trí",
                table: {
                  headers: ["Nội dung ôn", "Ví dụ"],
                  rows: [
                    ["Số đến 10", "0 → 10"],
                    ["Cộng trừ", "4 + 5 = 9"],
                    ["Hình học", "vuông · tròn · tam giác"],
                    ["Vị trí", "trên · dưới · trái · phải"],
                  ],
                  label: "Ôn tập chung học kì 1",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 6 con vịt, thêm 3 con nữa. Hỏi có tất cả bao nhiêu con vịt?",
                options: [3, 8, 9, 10],
                answer: 9,
                mascotHint: "Thêm vào thì cộng: 6 + 3 = 9 con vịt.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào lớn nhất: 3, 8, 5, 10?",
                options: [3, 8, 5, 10],
                answer: 10,
                mascotHint: "10 là số lớn nhất trong bốn số.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé giỏi lắm:",
                points: [
                  "Bé đã hoàn thành học kì 1 của Lớp 1.",
                  "Sang học kì 2, bé sẽ học các số đến 100.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 6 — SGK Bài 21-24 ═══
    {
      id: "g1-c6",
      name: "Chủ đề 6: Các số đến 100",
      description:
        "Số có hai chữ số, so sánh số có hai chữ số, bảng các số từ 1 đến 100",
      icon: "💯",
      color: "#4361ee",
      totalLessons: 12,
      lessons: [
        {
          id: "g1-c6-l1",
          title: "Bài 1: Mười và một chục",
          type: "learn",
          description: "Nhận biết 10 đơn vị gộp lại thành 1 chục",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Rô-bốt có 10 que tính rời. Bé bó lại thành một bó thì được gì nhỉ? 🧮",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "10 đơn vị = 1 chục",
                explanation: "Cứ 10 que tính rời bó lại thì được 1 BÓ CHỤC.",
                rule: "10 đơn vị = 1 chục. Một chục = 10.",
                points: [
                  "Bó 10 que tính lại thành 1 chục.",
                  "1 chục = 10 đơn vị.",
                  "Cách bó chục giúp bé đếm nhanh hơn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "||||||||||  (10 que rời)\n= 1 bó chục",
                baseTen: { tens: 1, ones: 0, label: "10 que rời = 1 bó chục" },
              },
            },
            {
              type: "quiz",
              content: {
                question: "1 chục bằng bao nhiêu đơn vị?",
                options: [1, 5, 10, 100],
                answer: 10,
                mascotHint: "1 chục = 10 đơn vị.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["10 đơn vị = 1 chục.", "1 chục = 10."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l2",
          title: "Bài 2: Các số từ 11 đến 20",
          type: "learn",
          description: "Đọc, viết các số từ 11 đến 20",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Một chục que tính và một que nữa thì được mấy que nhỉ? 🧮",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Các số từ 11 đến 20",
                explanation:
                  "1 chục thêm 1 đơn vị là 11. Cứ thêm 1 đơn vị thì được số tiếp theo.",
                rule: "11 = 1 chục 1 đơn vị. 15 = 1 chục 5 đơn vị. 20 = 2 chục 0 đơn vị.",
                points: [
                  "Đọc: mười một, mười hai, ..., mười chín, hai mươi.",
                  "20 gồm 2 chục và 0 đơn vị.",
                  "20 là số tròn chục.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "11 · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 19 · 20",
                baseTen: { tens: 1, ones: 4, label: "14 gồm 1 chục và 4 đơn vị" },
                numberLine: {
                  from: 11,
                  to: 20,
                  step: 1,
                  marks: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                  label: "Các số từ 11 đến 20",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 15 gồm mấy chục và mấy đơn vị?",
                options: [
                  "1 chục và 5 đơn vị",
                  "5 chục và 1 đơn vị",
                  "15 chục",
                  "1 chục và 0 đơn vị",
                ],
                answer: "1 chục và 5 đơn vị",
                mascotHint: "15 = 1 chục + 5 đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Sau số 19 là số nào?",
                options: [18, 20, 21, 90],
                answer: 20,
                mascotHint: "19 thêm 1 được 20.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Các số từ 11 đến 20.", "15 = 1 chục 5 đơn vị."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l3",
          title: "Bài 3: Các số tròn chục",
          type: "learn",
          description: "Nhận biết các số tròn chục từ 10 đến 100",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Các số 10, 20, 30... có gì đặc biệt nhỉ? Bé nhìn chữ số cuối nhé! 🔢",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Số tròn chục",
                explanation:
                  "Số TRÒN CHỤC là số có hàng đơn vị bằng 0. Nó gồm một số nguyên chục.",
                rule: "Các số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
                points: [
                  "Số tròn chục luôn tận cùng bằng chữ số 0.",
                  "20 gồm 2 chục; 50 gồm 5 chục.",
                  "100 gồm 10 chục.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 100",
                numberLine: {
                  from: 10,
                  to: 100,
                  step: 10,
                  marks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                  label: "Các số tròn chục",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào dưới đây là số tròn chục?",
                options: [15, 40, 44, 4],
                answer: 40,
                mascotHint: "40 có hàng đơn vị là 0 nên là số tròn chục.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "50 gồm mấy chục?",
                options: ["5 chục", "50 chục", "1 chục", "0 chục"],
                answer: "5 chục",
                mascotHint: "50 = 5 chục.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số tròn chục tận cùng bằng 0.",
                  "10, 20, ..., 90, 100.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c6-l4",
          title: "Bài 4: Hàng chục và hàng đơn vị",
          type: "learn",
          description: "Phân biệt chữ số hàng chục và chữ số hàng đơn vị",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Số 34 có hai chữ số. Chữ số nào chỉ chục, chữ số nào chỉ đơn vị? 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Chục và đơn vị",
                explanation:
                  "Trong số có hai chữ số, chữ số ĐỨNG TRƯỚC chỉ HÀNG CHỤC, chữ số ĐỨNG SAU chỉ HÀNG ĐƠN VỊ.",
                rule: "Số 34 gồm 3 chục và 4 đơn vị. Đọc là: ba mươi tư.",
                points: [
                  "34 = 30 + 4.",
                  "Số 40 gồm 4 chục và 0 đơn vị.",
                  "Số 5 gồm 0 chục và 5 đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "34\n3 → 3 chục\n4 → 4 đơn vị\n34 = 30 + 4",
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [3, 4],
                  label: "34 gồm 3 chục và 4 đơn vị",
                },
                baseTen: { tens: 3, ones: 4 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 52 gồm mấy chục và mấy đơn vị?",
                options: [
                  "5 chục và 2 đơn vị",
                  "2 chục và 5 đơn vị",
                  "52 chục",
                  "5 chục và 0 đơn vị",
                ],
                answer: "5 chục và 2 đơn vị",
                mascotHint: "Chữ số 5 chỉ chục, chữ số 2 chỉ đơn vị.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chữ số đầu chỉ hàng chục, chữ số sau chỉ hàng đơn vị.",
                  "34 = 3 chục 4 đơn vị = 30 + 4.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l5",
          title: "Bài 5: Đọc và viết số có hai chữ số",
          type: "learn",
          description: "Đọc, viết số có hai chữ số theo chục và đơn vị",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Số 45 đọc thế nào nhỉ? Bé cùng Rô-bốt đọc nhé! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đọc số có hai chữ số",
                explanation:
                  "Bé đọc SỐ CHỤC rồi đọc 'mươi', sau đó đọc số đơn vị. Riêng 1 chục thì đọc là 'mười'.",
                rule: "45 đọc là: bốn mươi lăm. 51 đọc là: năm mươi mốt. 15 đọc là: mười lăm.",
                points: [
                  "45 = 4 chục 5 đơn vị → bốn mươi lăm.",
                  "15 = 1 chục 5 đơn vị → mười lăm (không đọc 'mười năm').",
                  "34 đọc là: ba mươi tư.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "45 → bốn mươi lăm\n51 → năm mươi mốt\n15 → mười lăm",
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [4, 5],
                  label: "45 đọc là bốn mươi lăm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 45 đọc là gì?",
                options: [
                  "Bốn mươi lăm",
                  "Bốn lăm",
                  "Năm mươi tư",
                  "Bốn mươi năm",
                ],
                answer: "Bốn mươi lăm",
                mascotHint: "4 chục 5 đơn vị đọc là bốn mươi lăm.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 'năm mươi mốt' được viết thế nào?",
                options: [15, 51, 50, 501],
                answer: 51,
                mascotHint: "Năm mươi (5 chục) mốt (1 đơn vị) → 51.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc số chục rồi 'mươi', sau đó đọc số đơn vị.",
                  "45 đọc là bốn mươi lăm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l6",
          title: "Bài 6: So sánh số có hai chữ số",
          type: "learn",
          description:
            "Nhận biết số nào lớn hơn, số nào bé hơn khi cả hai số đều có hai chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "34 và 43, số nào lớn hơn? Hai số này có cùng các chữ số đấy! 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "So hàng chục trước",
                explanation:
                  "Bé so chữ số hàng CHỤC trước. Nếu bằng nhau thì mới so chữ số hàng ĐƠN VỊ.",
                rule: "34 và 43: 3 chục bé hơn 4 chục, nên 34 < 43.",
                points: [
                  "Chục khác nhau thì xong ngay.",
                  "25 và 27: cùng 2 chục, so đơn vị 5 < 7 nên 25 < 27.",
                  "Số có nhiều chữ số hơn thì lớn hơn: 100 > 99.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "34  <  43\n3 chục < 4 chục",
                comparison: { left: 34, sign: "<", right: 43 },
                table: {
                  headers: ["So sánh", "Vì sao"],
                  rows: [
                    ["34 < 43", "3 chục bé hơn 4 chục"],
                    ["43 > 34", "4 chục lớn hơn 3 chục"],
                  ],
                  label: "So sánh số có hai chữ số: so hàng chục trước",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 34 và 43, số nào lớn hơn?",
                options: [34, 43, "Hai số bằng nhau"],
                answer: 43,
                mascotHint: "4 chục lớn hơn 3 chục nên 43 > 34.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 25 và 27, số nào bé hơn?",
                options: [25, 27, "Hai số bằng nhau"],
                answer: 25,
                mascotHint: "Cùng 2 chục, so đơn vị: 5 < 7 nên 25 bé hơn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "So hàng chục trước, rồi đến hàng đơn vị.",
                  "34 < 43; 25 < 27.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l7",
          title: "Bài 7: Số lớn nhất, số bé nhất",
          type: "learn",
          description: "Tìm số lớn nhất và số bé nhất trong một nhóm số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé hãy tìm số lớn nhất và số bé nhất trong các số này nhé: 12, 45, 7, 30! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Số lớn nhất và bé nhất có hai chữ số",
                explanation:
                  "Muốn tìm số lớn nhất trong một nhóm, bé so từng số một. Số lớn nhất có hai chữ số là 99; số bé nhất có hai chữ số là 10.",
                rule: "Số lớn nhất có hai chữ số: 99. Số bé nhất có hai chữ số: 10.",
                points: [
                  "Số có nhiều chữ số hơn thì lớn hơn: 100 > 99.",
                  "Số bé nhất có một chữ số là 0.",
                  "So sánh từng cặp để tìm ra số lớn nhất và bé nhất.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Lớn nhất có 2 chữ số: 99\nBé nhất có 2 chữ số: 10",
                table: {
                  headers: ["Câu hỏi", "Đáp số"],
                  rows: [
                    ["Số lớn nhất có hai chữ số", "99"],
                    ["Số bé nhất có hai chữ số", "10"],
                    ["Số lớn nhất có một chữ số", "9"],
                  ],
                  label: "Số lớn nhất và số bé nhất",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số lớn nhất có hai chữ số là số nào?",
                options: [90, 98, 99, 100],
                answer: 99,
                mascotHint:
                  "99 là số lớn nhất có hai chữ số; 100 đã có ba chữ số.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong các số 12, 45, 7, 30, số nào lớn nhất?",
                options: [12, 45, 7, 30],
                answer: 45,
                mascotHint: "45 có 4 chục — lớn nhất trong bốn số.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Số lớn nhất có hai chữ số là 99.",
                  "Số bé nhất có hai chữ số là 10.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c6-l8",
          title: "Bài 8: Số liền trước, số liền sau",
          type: "learn",
          description: "Tìm số liền trước và liền sau của số có hai chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Số 34 có hai người hàng xóm. Bé đoán xem là số nào? 🏠",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Liền trước bớt 1, liền sau thêm 1",
                explanation:
                  "Số liền trước bé hơn 1 đơn vị; số liền sau lớn hơn 1 đơn vị.",
                rule: "Số liền trước của 34 là 33. Số liền sau của 34 là 35.",
                points: [
                  "Số liền trước của 20 là 19.",
                  "Số liền sau của 99 là 100.",
                  "Số liền sau của 9 là 10.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "33 — 34 — 35\nliền trước · chính nó · liền sau",
                numberLine: {
                  from: 33,
                  to: 35,
                  step: 1,
                  marks: [33, 34, 35],
                  label: "33 là số liền trước của 34 · 35 là số liền sau của 34",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền trước của 34 là số nào?",
                options: [33, 35, 24, 44],
                answer: 33,
                mascotHint: "34 bớt 1 được 33.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền sau của 20 là số nào?",
                options: [19, 21, 30, 200],
                answer: 21,
                mascotHint: "20 thêm 1 được 21.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Liền trước: bớt 1. Liền sau: thêm 1.",
                  "Liền trước 34 là 33; liền sau 34 là 35.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l9",
          title: "Bài 9: Bảng các số từ 1 đến 100",
          type: "learn",
          description: "Làm quen bảng 100 số và quy luật các hàng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Đây là bảng 100 số! Bé nhìn xem các số được xếp theo quy luật gì nhé 📊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Bảng các số từ 1 đến 100",
                explanation:
                  "Bảng 100 số có 10 hàng, mỗi hàng 10 số. Đi sang phải thì thêm 1; đi xuống dưới thì thêm 10.",
                rule: "Đi sang phải: 21, 22, 23... Đi xuống dưới: 21, 31, 41...",
                points: [
                  "Hàng cuối cùng là các số tròn chục: 10, 20, ..., 100.",
                  "Số 100 ở cuối bảng.",
                  "Mỗi hàng có 10 số.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1  2  3  4  5  6  7  8  9  10\n11 12 13 ...            20\n21 22 23 ...            30",
                table: {
                  headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                  rows: [
                    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                    [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                  ],
                  label: "Bảng các số từ 1 đến 100 (năm chục đầu)",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trong bảng 100 số, đi xuống dưới một hàng thì số tăng thêm bao nhiêu?",
                options: [1, 9, 10, 100],
                answer: 10,
                mascotHint: "Mỗi hàng có 10 số nên xuống một hàng là thêm 10.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bảng 100 số có 10 hàng, mỗi hàng 10 số.",
                  "Sang phải thêm 1; xuống dưới thêm 10.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l10",
          title: "Bài 10: Đếm thêm, đếm lùi trên bảng 100 số",
          type: "learn",
          description: "Đếm thêm 1, thêm 10 và đếm lùi trên bảng số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé đặt ngón tay vào số 25 rồi đếm thêm 10 nhé! Đi xuống dưới một hàng 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đếm thêm 1 và thêm 10",
                explanation:
                  "Đếm thêm 1 thì đi sang phải một ô. Đếm thêm 10 thì đi xuống dưới một hàng.",
                rule: "Từ 25: thêm 1 được 26 (sang phải). Thêm 10 được 35 (xuống dưới).",
                points: [
                  "Thêm 10 thì chữ số hàng chục tăng 1, hàng đơn vị giữ nguyên.",
                  "Đếm lùi 1 thì đi sang trái.",
                  "Đếm lùi 10 thì đi lên trên.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "25  →  26  (thêm 1)\n25  ↓  35  (thêm 10)",
                numberLine: {
                  from: 25,
                  to: 35,
                  step: 1,
                  marks: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
                  hops: [
                    { from: 25, to: 26, label: "+1" },
                    { from: 25, to: 35, label: "+10" },
                  ],
                  label: "Thêm 1 thì sang phải 1 ô · thêm 10 thì xuống 1 hàng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "25 thêm 10 bằng bao nhiêu?",
                options: [26, 35, 45, 2510],
                answer: 35,
                mascotHint:
                  "Thêm 10: hàng chục tăng 1, hàng đơn vị giữ nguyên → 35.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Thêm 1 thì sang phải; thêm 10 thì xuống dưới.",
                  "25 thêm 10 bằng 35.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c6-l11",
          title: "Bài 11: Tìm số còn thiếu trong dãy số",
          type: "learn",
          description: "Điền số còn thiếu vào dãy số theo quy luật",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Dãy số này bị thiếu mất một số: 30, 31, ..., 33. Bé tìm giúp nhé! 🔍",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Tìm quy luật của dãy số",
                explanation:
                  "Bé xem hai số đứng cạnh nhau hơn kém nhau bao nhiêu, rồi áp dụng cho cả dãy.",
                rule: "30, 31, ..., 33: các số hơn kém nhau 1 đơn vị. Vậy số còn thiếu là 32.",
                points: [
                  "Dãy cách nhau 1: 30, 31, 32, 33.",
                  "Dãy cách nhau 10: 30, 40, 50, 60.",
                  "Tìm ra quy luật rồi mới điền số.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "30 · 31 · ? · 33\nCách nhau 1 → ? = 32",
                numberLine: {
                  from: 30,
                  to: 33,
                  step: 1,
                  marks: [30, 31, 32, 33],
                  label: "30 · 31 · ? · 33 — hai số cách nhau 1, nên ? = 32",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: 30, 31, ?, 33",
                options: [29, 32, 34, 40],
                answer: 32,
                mascotHint: "Các số hơn kém nhau 1, nên số còn thiếu là 32.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền số còn thiếu: 20, 30, ?, 50",
                options: [31, 35, 40, 45],
                answer: 40,
                mascotHint: "Các số hơn kém nhau 10, nên số còn thiếu là 40.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tìm quy luật trước khi điền số.",
                  "30, 31, 32, 33 và 20, 30, 40, 50.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c6-l12",
          title: "Bài 12: Luyện tập chung chủ đề 6",
          type: "learn",
          description: "Ôn tập các số đến 100",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết các số đến 100 rồi! Mình tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 6",
                explanation:
                  "Bé đã học: 1 chục = 10 đơn vị, các số từ 11 đến 100, hàng chục hàng đơn vị, so sánh số và bảng 100 số.",
                points: [
                  "34 gồm 3 chục và 4 đơn vị.",
                  "Số tròn chục tận cùng bằng 0.",
                  "Số lớn nhất có hai chữ số là 99.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 chục = 10 đơn vị\n34 = 30 + 4\nLớn nhất 2 chữ số: 99",
                baseTen: { tens: 3, ones: 4, label: "34 = 3 chục và 4 đơn vị" },
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [3, 4],
                  label: "34 = 30 + 4",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 78 gồm mấy chục và mấy đơn vị?",
                options: [
                  "7 chục và 8 đơn vị",
                  "8 chục và 7 đơn vị",
                  "78 chục",
                  "7 chục và 0 đơn vị",
                ],
                answer: "7 chục và 8 đơn vị",
                mascotHint: "Chữ số 7 chỉ chục, chữ số 8 chỉ đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trong hai số 56 và 65, số nào bé hơn?",
                options: [56, 65, "Hai số bằng nhau"],
                answer: 56,
                mascotHint: "5 chục bé hơn 6 chục nên 56 < 65.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 6.",
                  "78 = 7 chục 8 đơn vị; 56 < 65.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 7 — SGK Bài 25-28 ═══
    {
      id: "g1-c7",
      name: "Chủ đề 7: Độ dài và đo độ dài",
      description:
        "Dài hơn ngắn hơn; đơn vị đo độ dài xăng-ti-mét; thực hành ước lượng và đo",
      icon: "📏",
      color: "#ef476f",
      totalLessons: 8,
      lessons: [
        {
          id: "g1-c7-l1",
          title: "Bài 1: Dài hơn, ngắn hơn",
          type: "learn",
          description: "So sánh độ dài của hai vật bằng cách nhìn trực tiếp",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bút chì xanh và bút chì đỏ, cái nào dài hơn nhỉ? Bé nhìn xem! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Dài hơn, ngắn hơn",
                explanation:
                  "Muốn so sánh độ dài hai vật, bé đặt chúng CẠNH NHAU, cho hai đầu bằng nhau, rồi xem đầu nào thừa ra.",
                rule: "Bút xanh dài hơn bút đỏ. Bút đỏ ngắn hơn bút xanh.",
                points: [
                  "Đặt hai vật sát nhau, một đầu thẳng hàng.",
                  "Đầu nào thừa ra thì vật đó dài hơn.",
                  "Nếu hai đầu đều bằng nhau thì hai vật dài bằng nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "✏️✏️✏️✏️✏️  (bút xanh)\n✏️✏️✏️      (bút đỏ)\nBút xanh dài hơn",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "Bút xanh dài 5 cm, bút đỏ dài 3 cm — bút xanh dài hơn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "So sánh độ dài hai vật thì bé nên làm gì?",
                options: [
                  "Đặt hai vật cạnh nhau, một đầu thẳng hàng",
                  "Đoán bằng mắt thôi",
                  "Cân hai vật lên",
                  "Đặt hai vật cách xa nhau",
                ],
                answer: "Đặt hai vật cạnh nhau, một đầu thẳng hàng",
                mascotHint:
                  "Đặt cạnh nhau và cho một đầu thẳng hàng để so cho đúng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt hai vật cạnh nhau, một đầu thẳng hàng.",
                  "Đầu thừa ra là vật dài hơn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l2",
          title: "Bài 2: So sánh độ dài gián tiếp qua vật trung gian",
          type: "learn",
          description: "So sánh độ dài khi không đặt được hai vật cạnh nhau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Bé không đặt được bàn và cửa sát nhau. Vậy so độ dài thế nào nhỉ? 🪑",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Dùng vật trung gian",
                explanation:
                  "Khi không thể đặt hai vật cạnh nhau, bé dùng một vật thứ ba để đo cả hai, rồi so kết quả.",
                rule: "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay. Vậy bàn dài hơn cửa sổ.",
                points: [
                  "Dùng cùng một vật để đo cả hai thì mới so được.",
                  "Bàn 3 gang tay > cửa sổ 2 gang tay.",
                  "Cách này gọi là so sánh gián tiếp.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Bàn     = 3 gang tay\nCửa sổ  = 2 gang tay\n→ Bàn dài hơn",
                table: {
                  headers: ["Vật", "Số gang tay"],
                  rows: [["Bàn học", "3"], ["Cửa sổ", "2"]],
                  label: "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay → bàn dài hơn",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay. Vật nào dài hơn?",
                options: [
                  "Cái bàn",
                  "Cửa sổ",
                  "Hai vật bằng nhau",
                  "Không so sánh được",
                ],
                answer: "Cái bàn",
                mascotHint: "3 gang tay nhiều hơn 2 gang tay nên bàn dài hơn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Dùng cùng một vật để đo cả hai rồi so kết quả.",
                  "3 gang tay > 2 gang tay.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l3",
          title: "Bài 3: Xăng-ti-mét — đơn vị đo độ dài",
          type: "learn",
          description: "Nhận biết đơn vị xăng-ti-mét và thước có vạch chia",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt có một cây thước có vạch số. Bé xem thước dùng để làm gì nhé! 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Xăng-ti-mét",
                explanation:
                  "XĂNG-TI-MÉT là đơn vị đo độ dài. Viết tắt là cm. Thước kẻ có các vạch chia từng xăng-ti-mét.",
                rule: "Tẩy bút chì dài khoảng 3 cm. Đọc là: ba xăng-ti-mét.",
                points: [
                  "Trên thước, mỗi khoảng giữa hai vạch liền nhau là 1 cm.",
                  "Thước bắt đầu từ vạch 0.",
                  "Đơn vị cm giúp bé nói chính xác vật dài bao nhiêu.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "📏  0 — 1 — 2 — 3 — 4 — 5 ...\nMỗi khoảng = 1 cm",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "Mỗi khoảng trên thước dài 1 cm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Đơn vị xăng-ti-mét viết tắt là gì?",
                options: ["cm", "m", "kg", "xăng"],
                answer: "cm",
                mascotHint: "Xăng-ti-mét viết tắt là cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Xăng-ti-mét viết tắt là cm.",
                  "Mỗi khoảng trên thước là 1 cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l4",
          title: "Bài 4: Dùng thước kẻ đo độ dài",
          type: "learn",
          description: "Đặt thước và đọc số đo độ dài của vật",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Đo bút chì thế nào cho đúng nhỉ? Bé cùng Rô-bốt làm nhé! ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Ba bước đo độ dài",
                explanation:
                  "Đặt vạch 0 của thước trùng với một đầu vật. Giữ thước thẳng theo vật. Đọc số ở đầu kia của vật.",
                rule: "Bút chì dài 8 cm nếu đầu kia của bút trùng vạch số 8.",
                points: [
                  "Luôn đặt vạch 0 vào đầu vật — đây là bước hay bị quên nhất.",
                  "Giữ thước thẳng, không xiên.",
                  "Đọc số ở đầu còn lại và ghi kèm cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 ——————— 8\nĐầu vật ở vạch 0, đầu kia ở vạch 8\n→ dài 8 cm",
                ruler: {
                  lengthCm: 8,
                  measure: { from: 0, to: 8 },
                  label: "Đầu vật đặt ở vạch 0, đầu kia ở vạch 8 → vật dài 8 cm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Khi đo độ dài, bé đặt vạch số mấy của thước vào một đầu vật?",
                options: ["Vạch 0", "Vạch 1", "Vạch 5", "Vạch cuối thước"],
                answer: "Vạch 0",
                // Hình minh hoạ: cây thước để bé thấy vạch 0 nằm ở đầu trái.
                ruler: {
                  lengthCm: 10,
                  label: "Vạch 0 nằm ở đầu trái của thước",
                },
                mascotHint:
                  "Đặt vạch 0 trùng với một đầu vật rồi đọc số ở đầu kia.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một đoạn thẳng có đầu ở vạch 0 và đầu kia ở vạch 6. Đoạn thẳng dài bao nhiêu?",
                options: ["5 cm", "6 cm", "7 cm", "60 cm"],
                answer: "6 cm",
                ruler: {
                  lengthCm: 10,
                  measure: { from: 0, to: 6 },
                  label: "Đoạn thẳng dài 6 cm",
                },
                mascotHint: "Đọc số ở đầu kia: 6 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt vạch 0 vào đầu vật rồi đọc số ở đầu kia.",
                  "Vật dài 6 cm thì ghi kèm đơn vị cm.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c7-l5",
          title: "Bài 5: Vẽ đoạn thẳng có độ dài cho trước",
          type: "learn",
          description: "Dùng thước vẽ đoạn thẳng dài đúng số xăng-ti-mét",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé hãy vẽ một đoạn thẳng dài 5 cm nhé! Rô-bốt hướng dẫn từng bước 📐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Vẽ đoạn thẳng dài 5 cm",
                explanation:
                  "Chấm một điểm ở vạch 0. Chấm điểm thứ hai ở vạch 5. Nối hai điểm lại theo mép thước.",
                rule: "Vạch 0 → điểm đầu. Vạch 5 → điểm cuối. Nối lại được đoạn thẳng 5 cm.",
                points: [
                  "Vạch 0 phải trùng đúng điểm đầu.",
                  "Giữ thước không xê dịch khi vẽ.",
                  "Vẽ xong có thể đo lại để kiểm tra.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 •—————————• 5\nHai điểm ở vạch 0 và vạch 5",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "Đoạn thẳng dài 5 cm: hai điểm ở vạch 0 và vạch 5",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Muốn vẽ đoạn thẳng dài 7 cm, bé chấm điểm thứ hai ở vạch số mấy?",
                options: ["Vạch 0", "Vạch 1", "Vạch 7", "Vạch 70"],
                answer: "Vạch 7",
                mascotHint: "Điểm thứ nhất ở vạch 0, điểm thứ hai ở vạch 7.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Chấm điểm ở vạch 0 và vạch cần vẽ, rồi nối lại.",
                  "Đoạn thẳng 5 cm có hai đầu ở vạch 0 và vạch 5.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l6",
          title: "Bài 6: Thực hành ước lượng và đo độ dài",
          type: "learn",
          description: "Ước lượng độ dài trước rồi đo để kiểm tra",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé hãy đoán xem quyển vở dài bao nhiêu cm, rồi mình đo thử nhé! 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Ước lượng rồi đo",
                explanation:
                  "ƯỚC LƯỢNG là đoán trước độ dài. Sau đó bé đo thật để xem đoán có gần đúng không.",
                rule: "Bé đoán quyển vở dài khoảng 20 cm. Đo thật được 20 cm — đoán đúng!",
                points: [
                  "Ước lượng giúp bé biết độ dài mà không cần đo.",
                  "Đo lại để kiểm tra mình đoán đúng hay chưa.",
                  "Luyện nhiều thì bé đoán càng chính xác.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Ước lượng: khoảng 20 cm\nĐo thật:    20 cm  ✓",
                ruler: {
                  lengthCm: 20,
                  measure: { from: 0, to: 20 },
                  label: "Ước lượng 20 cm — đo thật 20 cm ✓",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Ước lượng là gì?",
                options: [
                  "Đoán trước độ dài rồi đo để kiểm tra",
                  "Đo thật rất chính xác",
                  "Cân vật lên",
                  "Đếm số vật",
                ],
                answer: "Đoán trước độ dài rồi đo để kiểm tra",
                mascotHint:
                  "Ước lượng là đoán trước, sau đó đo thật để kiểm tra.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Ước lượng trước, đo thật sau.",
                  "Luyện nhiều thì ước lượng càng đúng.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l7",
          title: "Bài 7: Đo độ dài bằng gang tay, bước chân",
          type: "learn",
          description: "Đo độ dài bằng các đơn vị không chính thức",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Không có thước thì đo thế nào nhỉ? Rô-bốt dùng gang tay đấy! 🖐️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Đo bằng gang tay, bước chân",
                explanation:
                  "Khi chưa có thước, bé có thể đo bằng gang tay, bước chân, sải tay.",
                rule: "Bàn học dài 4 gang tay. Nền nhà dài 12 bước chân.",
                points: [
                  "Gang tay, bước chân là đơn vị đo 'không chính thức'.",
                  "Vì mỗi người có gang tay khác nhau nên kết quả có thể khác nhau.",
                  "Muốn đo chính xác thì phải dùng thước có vạch cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🖐️ gang tay  → đo bàn, sách\n🚶 bước chân → đo nền nhà, sân",
                table: {
                  headers: ["Cách đo", "Đo được"],
                  rows: [
                    ["Gang tay", "Bàn học, quyển sách"],
                    ["Bước chân", "Nền nhà, sân"],
                  ],
                  label: "Đo độ dài bằng gang tay, bước chân",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Vì sao đo bằng gang tay có thể cho kết quả khác nhau giữa các bạn?",
                options: [
                  "Vì mỗi bạn có gang tay dài ngắn khác nhau",
                  "Vì gang tay đổi màu",
                  "Vì vật đổi độ dài",
                  "Vì đo bằng gang tay là sai hoàn toàn",
                ],
                answer: "Vì mỗi bạn có gang tay dài ngắn khác nhau",
                mascotHint:
                  "Gang tay mỗi người một khác, nên kết quả có thể lệch nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Có thể đo bằng gang tay, bước chân khi chưa có thước.",
                  "Muốn chính xác thì dùng thước có vạch cm.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c7-l8",
          title: "Bài 8: Luyện tập chung chủ đề 7",
          type: "learn",
          description: "Ôn tập so sánh và đo độ dài",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết đo độ dài rồi! Mình tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 7",
                explanation:
                  "Bé đã học dài hơn ngắn hơn, đơn vị xăng-ti-mét, cách đo bằng thước và cách ước lượng.",
                points: [
                  "So sánh độ dài: đặt cạnh nhau, một đầu thẳng hàng.",
                  "Xăng-ti-mét viết tắt là cm.",
                  "Đo bằng thước: đặt vạch 0 vào đầu vật.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "1 cm = 1 khoảng trên thước\nĐặt vạch 0 vào đầu vật",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "1 cm = 1 khoảng trên thước — nhớ đặt vạch 0 vào đầu vật",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn thẳng có đầu ở vạch 0 và đầu kia ở vạch 9 của thước. Đoạn thẳng dài bao nhiêu?",
                options: ["8 cm", "9 cm", "10 cm", "90 cm"],
                answer: "9 cm",
                ruler: {
                  lengthCm: 10,
                  measure: { from: 0, to: 9 },
                  label: "Đọc số ở đầu kia của đoạn thẳng: 9 cm",
                },
                mascotHint: "Đọc số ở đầu kia: 9 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đo độ dài bằng thước có vạch cm.",
                  "Bé đã hoàn thành chủ đề 7.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 8 — SGK Bài 29-33 ═══
    {
      id: "g1-c8",
      name: "Chủ đề 8: Phép cộng, phép trừ (không nhớ) trong phạm vi 100",
      description:
        "Cộng trừ số có hai chữ số với số có một chữ số và với số có hai chữ số — KHÔNG nhớ",
      icon: "🔢",
      color: "#118ab2",
      totalLessons: 12,
      lessons: [
        {
          id: "g1-c8-l1",
          title: "Bài 1: Phép cộng số có hai chữ số với số có một chữ số",
          type: "learn",
          description: "Đặt tính và cộng dạng 25 + 4 (không nhớ)",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 25 quả cam, thêm 4 quả nữa. Bé cùng Rô-bốt tính nhé! 🍊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Cộng hai chữ số với một chữ số",
                explanation:
                  "Bé đặt số có một chữ số thẳng cột với HÀNG ĐƠN VỊ, rồi cộng từ phải sang trái. Hàng chục giữ nguyên vì không nhớ.",
                rule: "25 + 4: 5 + 4 = 9, viết 9. Hạ 2 xuống. Kết quả 29.",
                points: [
                  "Số 4 phải đặt thẳng cột với chữ số 5 (hàng đơn vị).",
                  "5 + 4 = 9, bé hơn 10 nên KHÔNG nhớ.",
                  "Hàng chục giữ nguyên: 2 chục.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  25\n+  4\n  29",
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [2, 5],
                  label: "25 gồm 2 chục và 5 đơn vị",
                },
                operation: { left: 25, sign: "+", right: 4, result: 29 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "25 + 4 bằng bao nhiêu?",
                options: [28, 29, 30, 65],
                answer: 29,
                mascotHint: "5 + 4 = 9, hạ 2 xuống: kết quả 29.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt số có một chữ số thẳng cột hàng đơn vị.",
                  "25 + 4 = 29.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l2",
          title: "Bài 2: Luyện tập cộng hai chữ số với một chữ số",
          type: "learn",
          description: "Luyện tập cộng dạng 25 + 4 và giải bài toán",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Thư viện có 34 quyển truyện, cô cho thêm 5 quyển. Có tất cả bao nhiêu quyển? 📚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Cộng không nhớ trong bài toán",
                explanation:
                  "Bé đặt tính rồi cộng. Nhớ kiểm tra hàng đơn vị có vượt 10 hay không.",
                rule: "34 + 5: 4 + 5 = 9, viết 9; hạ 3. Kết quả 39 (quyển truyện).",
                points: [
                  "4 + 5 = 9 < 10 nên không nhớ.",
                  "34 + 5 = 39.",
                  "Đáp số ghi kèm đơn vị: quyển truyện.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  34\n+  5\n  39",
                operation: { left: 34, sign: "+", right: 5, result: 39 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Thư viện có 34 quyển truyện, cho thêm 5 quyển. Hỏi có tất cả bao nhiêu quyển truyện?",
                options: [29, 38, 39, 84],
                answer: 39,
                mascotHint: "34 + 5 = 39 quyển truyện.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng hàng đơn vị trước, hàng chục giữ nguyên khi không nhớ.",
                  "34 + 5 = 39.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l3",
          title: "Bài 3: Phép cộng số có hai chữ số với số có hai chữ số",
          type: "learn",
          description: "Đặt tính và cộng dạng 32 + 14 (không nhớ)",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt có 32 viên bi, bé cho thêm 14 viên. Có tất cả bao nhiêu viên? 🔵",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Cộng hai số có hai chữ số",
                explanation:
                  "Bé đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục. Rồi cộng từ phải sang trái.",
                rule: "32 + 14: 2 + 4 = 6, viết 6. 3 + 1 = 4, viết 4. Kết quả 46.",
                points: [
                  "Cộng hàng đơn vị: 2 + 4 = 6.",
                  "Cộng hàng chục: 3 + 1 = 4.",
                  "Cả hai hàng đều bé hơn 10 nên không nhớ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  32\n+ 14\n  46",
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [3, 2],
                  label: "32 + 14: cộng từng hàng một, bắt đầu từ hàng đơn vị",
                },
                operation: { left: 32, sign: "+", right: 14, result: 46 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "32 + 14 bằng bao nhiêu?",
                options: [36, 44, 46, 56],
                answer: 46,
                mascotHint: "2 + 4 = 6; 3 + 1 = 4. Kết quả 46.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "41 + 26 bằng bao nhiêu?",
                options: [57, 65, 67, 77],
                answer: 67,
                mascotHint: "1 + 6 = 7; 4 + 2 = 6. Kết quả 67.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt tính thẳng cột rồi cộng từ phải sang trái.",
                  "32 + 14 = 46; 41 + 26 = 67.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l4",
          title: "Bài 4: Luyện tập cộng hai số có hai chữ số",
          type: "learn",
          description: "Luyện tập cộng hai số có hai chữ số trong bài toán",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Đội Một trồng 24 cây, đội Hai trồng 15 cây. Cả hai đội trồng bao nhiêu cây? 🌳",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Cộng trong bài toán",
                explanation: "Bài toán 'cả hai', 'tất cả' thì dùng phép cộng.",
                rule: "24 + 15: 4 + 5 = 9; 2 + 1 = 3. Kết quả 39 (cây).",
                points: [
                  "Đặt tính thẳng cột trước khi tính.",
                  "24 + 15 = 39 cây.",
                  "Thử lại: 39 − 15 = 24, đúng thì kết quả chính xác.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  24\n+ 15\n  39",
                operation: { left: 24, sign: "+", right: 15, result: 39 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đội Một trồng 24 cây, đội Hai trồng 15 cây. Hỏi cả hai đội trồng được bao nhiêu cây?",
                options: [29, 38, 39, 49],
                answer: 39,
                mascotHint: "24 + 15 = 39 cây.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Cả hai', 'tất cả' thì dùng phép cộng.",
                  "24 + 15 = 39.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c8-l5",
          title: "Bài 5: Phép trừ số có hai chữ số cho số có một chữ số",
          type: "learn",
          description: "Đặt tính và trừ dạng 39 − 5 (không mượn)",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Có 39 quả bóng, lấy ra 5 quả. Còn lại mấy quả nhỉ? 🎈",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trừ hai chữ số cho một chữ số",
                explanation:
                  "Bé đặt số có một chữ số thẳng cột hàng đơn vị, rồi trừ từ phải sang trái. Hàng chục giữ nguyên vì không mượn.",
                rule: "39 − 5: 9 − 5 = 4, viết 4. Hạ 3 xuống. Kết quả 34.",
                points: [
                  "9 − 5 = 4, đủ để trừ nên KHÔNG mượn.",
                  "Hàng chục giữ nguyên: 3 chục.",
                  "39 − 5 = 34.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  39\n−  5\n  34",
                operation: { left: 39, sign: "−", right: 5, result: 34 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "39 − 5 bằng bao nhiêu?",
                options: [24, 33, 34, 44],
                answer: 34,
                mascotHint: "9 − 5 = 4, hạ 3 xuống: kết quả 34.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt số có một chữ số thẳng cột hàng đơn vị.",
                  "39 − 5 = 34.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l6",
          title: "Bài 6: Luyện tập trừ hai chữ số cho một chữ số",
          type: "learn",
          description: "Luyện tập trừ dạng 39 − 5 và giải bài toán",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trên cây có 48 quả cam, hái xuống 6 quả. Trên cây còn bao nhiêu quả? 🍊",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Trừ trong bài toán",
                explanation:
                  "Bài toán 'còn lại', 'bớt đi', 'hái xuống' thì dùng phép trừ.",
                rule: "48 − 6: 8 − 6 = 2, viết 2; hạ 4. Kết quả 42 (quả cam).",
                points: [
                  "8 − 6 = 2 nên không mượn.",
                  "48 − 6 = 42 quả cam.",
                  "Thử lại: 42 + 6 = 48.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  48\n−  6\n  42",
                operation: { left: 48, sign: "−", right: 6, result: 42 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Trên cây có 48 quả cam, hái xuống 6 quả. Hỏi trên cây còn lại bao nhiêu quả cam?",
                options: [32, 41, 42, 54],
                answer: 42,
                mascotHint: "48 − 6 = 42 quả cam.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Còn lại', 'bớt đi' thì dùng phép trừ.",
                  "48 − 6 = 42.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l7",
          title: "Bài 7: Phép trừ số có hai chữ số cho số có hai chữ số",
          type: "learn",
          description: "Đặt tính và trừ dạng 57 − 23 (không mượn)",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt có 57 viên bi, cho bạn 23 viên. Rô-bốt còn mấy viên? 🔵",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Trừ hai số có hai chữ số",
                explanation: "Bé đặt tính thẳng cột rồi trừ từ phải sang trái.",
                rule: "57 − 23: 7 − 3 = 4, viết 4. 5 − 2 = 3, viết 3. Kết quả 34.",
                points: [
                  "Trừ hàng đơn vị: 7 − 3 = 4.",
                  "Trừ hàng chục: 5 − 2 = 3.",
                  "Cả hai hàng đều trừ được nên không mượn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  57\n− 23\n  34",
                operation: { left: 57, sign: "−", right: 23, result: 34 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "57 − 23 bằng bao nhiêu?",
                options: [24, 34, 44, 30],
                answer: 34,
                mascotHint: "7 − 3 = 4; 5 − 2 = 3. Kết quả 34.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "86 − 52 bằng bao nhiêu?",
                options: [24, 34, 44, 38],
                answer: 34,
                mascotHint: "6 − 2 = 4; 8 − 5 = 3. Kết quả 34.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
                  "57 − 23 = 34; 86 − 52 = 34.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l8",
          title: "Bài 8: Luyện tập trừ hai số có hai chữ số",
          type: "learn",
          description: "Luyện tập trừ hai số có hai chữ số trong bài toán",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Lớp có 46 học sinh, 24 bạn đã nộp bài. Còn mấy bạn chưa nộp? ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Tập",
                title: "Trừ hai số có hai chữ số",
                explanation:
                  "Bé đặt tính thẳng cột và trừ từng hàng từ phải sang trái.",
                rule: "46 − 24: 6 − 4 = 2; 4 − 2 = 2. Kết quả 22 (bạn).",
                points: [
                  "46 − 24 = 22 bạn chưa nộp.",
                  "Thử lại: 22 + 24 = 46.",
                  "Đáp số kèm đơn vị: bạn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  46\n− 24\n  22",
                operation: { left: 46, sign: "−", right: 24, result: 22 },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Lớp có 46 học sinh, 24 bạn đã nộp bài. Hỏi còn bao nhiêu bạn chưa nộp bài?",
                options: [12, 22, 24, 70],
                answer: 22,
                mascotHint: "46 − 24 = 22 bạn.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Trừ từng hàng từ phải sang trái.", "46 − 24 = 22."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l9",
          title: "Bài 9: Tính nhẩm cộng trừ trong phạm vi 100",
          type: "learn",
          description: "Tính nhẩm nhanh các phép cộng trừ đơn giản",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé có biết tính nhẩm nhanh không? Cùng Rô-bốt thử nhé! ⚡",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Ba mẹo tính nhẩm",
                explanation:
                  "Cộng trừ số tròn chục rất dễ: chỉ cần nhớ số chục.",
                rule: "30 + 20 = 50 (3 chục + 2 chục). 50 − 20 = 30. 40 + 5 = 45 (thêm đơn vị).",
                points: [
                  "Cộng số tròn chục: cộng số chục với nhau.",
                  "Trừ số tròn chục: trừ số chục.",
                  "Cộng số có một chữ số: giữ nguyên chục, cộng đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "30 + 20 = 50\n50 − 20 = 30\n40 + 5  = 45",
                baseTen: {
                  tens: 5,
                  ones: 0,
                  label: "30 + 20 = 50 nghĩa là 3 chục + 2 chục = 5 chục",
                },
                operation: { left: 30, sign: "+", right: 20, result: 50 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "30 + 20 bằng bao nhiêu?",
                options: [40, 50, 60, 32],
                answer: 50,
                mascotHint: "3 chục + 2 chục = 5 chục = 50.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "60 + 7 bằng bao nhiêu?",
                options: [13, 61, 67, 607],
                answer: 67,
                mascotHint: "Giữ nguyên 6 chục, thêm 7 đơn vị: 67.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Cộng trừ số tròn chục thì cộng trừ số chục.",
                  "30 + 20 = 50; 60 + 7 = 67.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c8-l10",
          title: "Bài 10: Bài toán có lời văn — phép cộng",
          type: "learn",
          description: "Giải bài toán có lời văn dùng phép cộng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Mẹ mua 23 quả trứng gà và 15 quả trứng vịt. Mẹ mua tất cả bao nhiêu quả? 🥚",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Bốn bước giải toán",
                explanation:
                  "Bé làm bốn bước: đọc đề, tìm từ khóa, đặt tính, ghi đáp số.",
                rule: "23 + 15: 3 + 5 = 8; 2 + 1 = 3. Kết quả 38 (quả trứng).",
                points: [
                  "Từ khóa 'cả', 'tất cả' → phép cộng.",
                  "23 + 15 = 38 quả trứng.",
                  "Đáp số phải ghi kèm đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "23 quả + 15 quả\n23 + 15 = 38 (quả trứng)",
                operation: { left: 23, sign: "+", right: 15, result: 38 },
                barModel: {
                  rows: [
                    { label: "Có sẵn", parts: 23 },
                    { label: "Thêm vào", parts: 15 },
                  ],
                  braceLabel: "38 quả trứng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Mẹ mua 23 quả trứng gà và 15 quả trứng vịt. Hỏi mẹ mua tất cả bao nhiêu quả trứng?",
                options: [8, 28, 38, 48],
                answer: 38,
                mascotHint: "23 + 15 = 38 quả trứng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Tìm từ khóa để chọn phép tính.", "23 + 15 = 38."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l11",
          title: "Bài 11: Bài toán có lời văn — phép trừ",
          type: "learn",
          description: "Giải bài toán có lời văn dùng phép trừ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Cửa hàng có 65 hộp sữa, đã bán 24 hộp. Còn lại bao nhiêu hộp? 🥛",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Giải Toán",
                title: "Bài toán bớt đi",
                explanation:
                  "Từ khóa 'đã bán', 'còn lại', 'bớt đi' thì dùng phép trừ.",
                rule: "65 − 24: 5 − 4 = 1; 6 − 2 = 4. Kết quả 41 (hộp sữa).",
                points: [
                  "65 − 24 = 41 hộp sữa.",
                  "Thử lại: 41 + 24 = 65.",
                  "Đáp số ghi kèm đơn vị.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "65 hộp − 24 hộp\n65 − 24 = 41 (hộp sữa)",
                operation: { left: 65, sign: "−", right: 24, result: 41 },
                barModel: {
                  rows: [
                    { label: "Có sẵn", parts: 65 },
                    { label: "Bớt đi", parts: 24 },
                  ],
                  braceLabel: "41 hộp sữa",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Cửa hàng có 65 hộp sữa, đã bán 24 hộp. Hỏi còn lại bao nhiêu hộp sữa?",
                options: [31, 41, 51, 89],
                answer: 41,
                mascotHint: "65 − 24 = 41 hộp sữa.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "'Đã bán', 'còn lại' thì dùng phép trừ.",
                  "65 − 24 = 41.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c8-l12",
          title: "Bài 12: Luyện tập chung chủ đề 8",
          type: "learn",
          description: "Ôn tập cộng trừ không nhớ trong phạm vi 100",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã tính được với số có hai chữ số rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 8",
                explanation:
                  "Bé đã học cộng trừ số có hai chữ số với số có một chữ số và với số có hai chữ số — đều KHÔNG nhớ, KHÔNG mượn.",
                points: [
                  "Đặt tính thẳng cột.",
                  "Tính từ phải sang trái.",
                  "Cộng trừ số tròn chục thì làm với số chục.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "25 + 4 = 29\n32 + 14 = 46\n57 − 23 = 34",
                operation: { left: 32, sign: "+", right: 14, result: 46 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["25 + 4", "29"], ["32 + 14", "46"], ["57 − 23", "34"]],
                  label: "Luyện tập chung cộng trừ trong phạm vi 100",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "35 + 22 bằng bao nhiêu?",
                options: [47, 55, 57, 513],
                answer: 57,
                mascotHint: "5 + 2 = 7; 3 + 2 = 5. Kết quả 57.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "78 − 45 bằng bao nhiêu?",
                options: [23, 33, 43, 123],
                answer: 33,
                mascotHint: "8 − 5 = 3; 7 − 4 = 3. Kết quả 33.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 8.",
                  "35 + 22 = 57; 78 − 45 = 33.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 9 — SGK Bài 34-37 ═══
    {
      id: "g1-c9",
      name: "Chủ đề 9: Thời gian. Giờ và lịch",
      description:
        "Xem giờ đúng trên đồng hồ, các ngày trong tuần, thực hành xem lịch",
      icon: "🕐",
      color: "#f4a261",
      totalLessons: 9,
      lessons: [
        {
          id: "g1-c9-l1",
          title: "Bài 1: Làm quen với mặt đồng hồ",
          type: "learn",
          description: "Nhận biết các số và hai kim trên mặt đồng hồ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Trên mặt đồng hồ có các số từ 1 đến 12 và hai cây kim. Bé cùng xem nhé! 🕐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Mặt đồng hồ",
                explanation:
                  "Mặt đồng hồ có các số từ 1 đến 12. Trên đó có một KIM NGẮN chỉ giờ và một KIM DÀI chỉ phút.",
                rule: "Kim ngắn chỉ giờ, kim dài chỉ phút. Các số trên mặt đồng hồ xếp thành vòng tròn.",
                points: [
                  "Đồng hồ có 12 số.",
                  "Kim ngắn đi chậm hơn kim dài.",
                  "Khi kim dài chỉ vào số 12 thì bé đọc được 'giờ đúng'.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🕐  Mặt đồng hồ có 12 số\nKim ngắn → giờ\nKim dài  → phút",
                clock: {
                  hour: 3,
                  minute: 0,
                  timeText: "Mặt đồng hồ có 12 số — kim ngắn chỉ giờ, kim dài chỉ phút",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trên mặt đồng hồ có bao nhiêu số?",
                options: [6, 10, 12, 24],
                answer: 12,
                mascotHint: "Mặt đồng hồ có 12 số, từ 1 đến 12.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trên đồng hồ, kim nào chỉ giờ?",
                options: ["Kim ngắn", "Kim dài", "Cả hai kim", "Không kim nào"],
                answer: "Kim ngắn",
                mascotHint: "Kim ngắn chỉ giờ, kim dài chỉ phút.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Mặt đồng hồ có 12 số.",
                  "Kim ngắn chỉ giờ, kim dài chỉ phút.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l2",
          title: "Bài 2: Xem giờ đúng trên đồng hồ",
          type: "learn",
          description: "Đọc giờ đúng khi kim dài chỉ số 12",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Kim ngắn chỉ số 7, kim dài chỉ số 12. Bây giờ là mấy giờ nhỉ? 🕖",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Đọc giờ đúng",
                explanation:
                  "Khi kim dài chỉ vào số 12, bé chỉ cần đọc số mà kim ngắn đang chỉ. Đó là GIỜ ĐÚNG.",
                rule: "Kim ngắn chỉ số 7, kim dài chỉ số 12 → 7 giờ đúng.",
                points: [
                  "Kim dài chỉ số 12 thì gọi là giờ đúng.",
                  "Kim ngắn chỉ số nào thì là mấy giờ.",
                  "Kim ngắn chỉ số 3 và kim dài chỉ số 12 → 3 giờ đúng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Kim ngắn → 7\nKim dài  → 12\nBây giờ là 7 giờ",
                clock: { hour: 7, minute: 0, timeText: "7 giờ" },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn chỉ số 7, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?",
                options: ["7 giờ", "12 giờ", "5 giờ", "7 giờ 12 phút"],
                answer: "7 giờ",
                mascotHint: "Kim dài chỉ 12 nên đọc theo kim ngắn: 7 giờ.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?",
                options: ["3 giờ", "12 giờ", "9 giờ", "3 giờ 12 phút"],
                answer: "3 giờ",
                mascotHint: "Kim ngắn chỉ 3 nên là 3 giờ đúng.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Kim dài chỉ 12 thì đọc theo kim ngắn.",
                  "Kim ngắn chỉ 7 → 7 giờ.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l3",
          title: "Bài 3: Các buổi trong ngày",
          type: "learn",
          description: "Nhận biết buổi sáng, trưa, chiều, tối gắn với giờ",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Rô-bốt thức dậy lúc 7 giờ sáng và đi ngủ lúc 9 giờ tối. Bé thì sao? 🌞",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Bốn buổi trong ngày",
                explanation:
                  "Một ngày có bốn buổi: buổi sáng, buổi trưa, buổi chiều và buổi tối. Mỗi buổi gắn với một khoảng giờ.",
                rule: "Buổi sáng: 6 giờ đến 10 giờ. Buổi trưa: 11 giờ đến 12 giờ. Buổi chiều: 1 giờ đến 5 giờ. Buổi tối: 7 giờ đến 9 giờ.",
                points: [
                  "Bé ngủ dậy buổi sáng.",
                  "Bé ăn cơm buổi trưa và buổi tối.",
                  "Nói rõ 'buổi sáng' hay 'buổi tối' để người khác hiểu đúng.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "🌞 sáng · 🍚 trưa · 🌤️ chiều · 🌙 tối",
                table: {
                  headers: ["Buổi", "Giờ"],
                  rows: [
                    ["Sáng", "6 giờ → 10 giờ"],
                    ["Trưa", "11 giờ → 12 giờ"],
                    ["Chiều", "1 giờ → 5 giờ"],
                    ["Tối", "7 giờ → 9 giờ"],
                  ],
                  label: "Các buổi trong ngày",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Bé ăn cơm tối lúc 7 giờ. Đó là buổi nào trong ngày?",
                options: ["Buổi tối", "Buổi sáng", "Buổi trưa", "Buổi chiều"],
                answer: "Buổi tối",
                mascotHint: "7 giờ tối là buổi tối.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Một ngày có bốn buổi: sáng, trưa, chiều, tối.",
                  "7 giờ tối là buổi tối.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l4",
          title: "Bài 4: Thực hành xem giờ đúng",
          type: "learn",
          description: "Luyện đọc giờ đúng trong các tình huống thực tế",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé hãy nói giờ trong thời khoá biểu của mình nhé! 🕘",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Đọc giờ trong ngày",
                explanation: "Bé nhìn đồng hồ, tìm kim ngắn và đọc giờ.",
                rule: "8 giờ: bé vào lớp. 11 giờ: bé tan học buổi sáng. 9 giờ tối: bé đi ngủ.",
                points: [
                  "Đọc giờ đúng: kim dài chỉ 12, đọc số kim ngắn chỉ.",
                  "Bé có thể tự đọc giờ trên đồng hồ ở nhà.",
                  "Mỗi việc trong ngày đều gắn với một giờ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "7 giờ   → ngủ dậy\n8 giờ   → vào lớp\n9 giờ tối → đi ngủ",
                clock: { hour: 8, minute: 0, timeText: "8 giờ — bé vào lớp" },
                table: {
                  headers: ["Giờ", "Việc của bé"],
                  rows: [
                    ["7 giờ", "Ngủ dậy"],
                    ["8 giờ", "Vào lớp"],
                    ["11 giờ", "Tan học buổi sáng"],
                    ["9 giờ tối", "Đi ngủ"],
                  ],
                  label: "Thực hành xem giờ đúng",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn chỉ số 8, kim dài chỉ số 12. Bé làm gì lúc 8 giờ?",
                options: ["Vào lớp học", "Đi ngủ", "Ăn cơm tối", "Đi bơi"],
                answer: "Vào lớp học",
                mascotHint: "8 giờ sáng là giờ vào lớp.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đọc giờ đúng theo kim ngắn.",
                  "Mỗi việc trong ngày gắn với một giờ.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l5",
          title: "Bài 5: Các ngày trong tuần",
          type: "learn",
          description: "Nhận biết một tuần có 7 ngày và tên các ngày",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Thứ Hai bé đi học. Vậy một tuần có mấy ngày nhỉ? 📅",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Một tuần có 7 ngày",
                explanation:
                  "Một tuần lễ có 7 ngày. Bé học 5 ngày, nghỉ 2 ngày cuối tuần.",
                rule: "Thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.",
                points: [
                  "Một tuần có 7 ngày.",
                  "Thứ Bảy và Chủ nhật là ngày nghỉ.",
                  "Sau Chủ nhật lại quay về thứ Hai.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Thứ Hai · Thứ Ba · Thứ Tư · Thứ Năm\nThứ Sáu · Thứ Bảy · Chủ nhật",
                table: {
                  headers: ["Thứ", "Trong tuần"],
                  rows: [
                    ["Thứ Hai", "ngày đầu tuần"],
                    ["Thứ Ba", "ngày thứ hai"],
                    ["Thứ Tư", "ngày thứ ba"],
                    ["Thứ Năm", "ngày thứ tư"],
                    ["Thứ Sáu", "ngày thứ năm"],
                    ["Thứ Bảy", "ngày thứ sáu"],
                    ["Chủ nhật", "ngày cuối tuần"],
                  ],
                  label: "Một tuần có 7 ngày",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Một tuần lễ có bao nhiêu ngày?",
                options: [5, 6, 7, 10],
                answer: 7,
                mascotHint: "Một tuần có 7 ngày.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Sau thứ Sáu là thứ mấy?",
                options: ["Thứ Năm", "Thứ Bảy", "Chủ nhật", "Thứ Hai"],
                answer: "Thứ Bảy",
                mascotHint: "Thứ tự: ... thứ Sáu, thứ Bảy, Chủ nhật.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Một tuần có 7 ngày.",
                  "Thứ Bảy và Chủ nhật là ngày nghỉ.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l6",
          title: "Bài 6: Hôm nay, ngày mai, hôm qua",
          type: "learn",
          description: "Phân biệt hôm qua, hôm nay và ngày mai",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Hôm nay là thứ Ba. Vậy hôm qua là thứ mấy, ngày mai là thứ mấy? 🤔",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Mẹo Nhớ",
                title: "Hôm qua — hôm nay — ngày mai",
                explanation:
                  "HÔM QUA là ngày đã qua (trước hôm nay một ngày). NGÀY MAI là ngày sắp tới (sau hôm nay một ngày).",
                rule: "Hôm nay thứ Ba → hôm qua thứ Hai → ngày mai thứ Tư.",
                points: [
                  "Hôm qua: lùi lại 1 ngày.",
                  "Ngày mai: tiến thêm 1 ngày.",
                  "Sau Chủ nhật thì ngày mai là thứ Hai.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Hôm qua — Hôm nay — Ngày mai\n Thứ Hai — Thứ Ba — Thứ Tư",
                table: {
                  headers: ["Ngày", "Là thứ"],
                  rows: [
                    ["Hôm qua", "Thứ Hai"],
                    ["Hôm nay", "Thứ Ba"],
                    ["Ngày mai", "Thứ Tư"],
                  ],
                  label: "Hôm nay thứ Ba → hôm qua thứ Hai → ngày mai thứ Tư",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hôm nay là thứ Ba. Hôm qua là thứ mấy?",
                options: ["Thứ Hai", "Thứ Tư", "Chủ nhật", "Thứ Năm"],
                answer: "Thứ Hai",
                mascotHint: "Lùi lại một ngày: thứ Ba → thứ Hai.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hôm nay là Chủ nhật. Ngày mai là thứ mấy?",
                options: ["Thứ Bảy", "Thứ Hai", "Chủ nhật", "Thứ Ba"],
                answer: "Thứ Hai",
                mascotHint: "Sau Chủ nhật là thứ Hai.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Hôm qua lùi 1 ngày, ngày mai tiến 1 ngày.",
                  "Sau Chủ nhật là thứ Hai.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c9-l7",
          title: "Bài 7: Làm quen với tờ lịch",
          type: "learn",
          description: "Nhận biết các thông tin trên tờ lịch tháng",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Tờ lịch tháng có rất nhiều số. Bé cùng Rô-bốt đọc nhé! 📅",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Khám Phá",
                title: "Tờ lịch tháng",
                explanation:
                  "Tờ lịch tháng ghi các NGÀY trong tháng. Hàng trên cùng ghi tên các THỨ.",
                rule: "Mỗi cột là một thứ trong tuần. Mỗi ô là một ngày trong tháng.",
                points: [
                  "Tờ lịch có tên tháng ở trên.",
                  "Các ngày trong tháng xếp theo thứ tự tăng dần.",
                  "Cùng một cột thì cùng một thứ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Tháng 9\nThứ Hai · Thứ Ba · Thứ Tư · ...\n  1   ·   2    ·   3    · ...",
                table: {
                  headers: [
                    "Thứ Hai",
                    "Thứ Ba",
                    "Thứ Tư",
                    "Thứ Năm",
                    "Thứ Sáu",
                    "Thứ Bảy",
                    "Chủ nhật",
                  ],
                  rows: [
                    [1, 2, 3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19, 20, 21],
                  ],
                  label: "Tờ lịch tháng 9 — mỗi cột là một thứ, mỗi ô là một ngày",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Trên tờ lịch tháng, hàng trên cùng ghi gì?",
                options: [
                  "Tên các thứ trong tuần",
                  "Tên các tháng",
                  "Số ngày",
                  "Tên các bạn",
                ],
                answer: "Tên các thứ trong tuần",
                mascotHint:
                  "Hàng trên cùng ghi tên các thứ: thứ Hai, thứ Ba, ...",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tờ lịch tháng ghi các ngày trong tháng.",
                  "Mỗi cột là một thứ trong tuần.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l8",
          title: "Bài 8: Xem lịch — tìm ngày trong tháng",
          type: "learn",
          description: "Tìm một ngày bất kì trên tờ lịch và biết đó là thứ mấy",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Sinh nhật Rô-bốt là ngày 15. Bé tìm xem ngày 15 là thứ mấy nhé! 🎂",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Thực Hành",
                title: "Tìm ngày trên lịch",
                explanation:
                  "Bé tìm số của ngày cần tìm trên tờ lịch, rồi nhìn LÊN hàng trên cùng để biết đó là thứ mấy.",
                rule: "Ngày 15 nằm ở cột ghi 'Thứ Tư' thì ngày 15 là thứ Tư.",
                points: [
                  "Tìm số ngày trước, rồi nhìn lên cột để biết thứ.",
                  "Cùng một cột thì cùng một thứ.",
                  "Ngày đầu tháng có thể bắt đầu bằng bất kì thứ nào.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "        Thứ Tư\n          ↓\n         15",
                table: {
                  headers: [
                    "Thứ Hai",
                    "Thứ Ba",
                    "Thứ Tư",
                    "Thứ Năm",
                    "Thứ Sáu",
                    "Thứ Bảy",
                    "Chủ nhật",
                  ],
                  rows: [[13, 14, 15, 16, 17, 18, 19]],
                  label: "Ngày 15 nằm ở cột Thứ Tư → ngày 15 là thứ Tư",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Muốn biết ngày 20 là thứ mấy, bé nhìn vào đâu trên tờ lịch?",
                options: [
                  "Tìm số 20 rồi nhìn lên cột phía trên",
                  "Nhìn xuống dưới cùng",
                  "Đếm số ô trên tờ lịch",
                  "Cân tờ lịch lên",
                ],
                answer: "Tìm số 20 rồi nhìn lên cột phía trên",
                mascotHint: "Tìm số ngày rồi nhìn lên hàng ghi tên thứ.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Tìm số ngày rồi nhìn lên cột để biết thứ.",
                  "Cùng một cột là cùng một thứ.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c9-l9",
          title: "Bài 9: Thực hành và luyện tập chung chủ đề 9",
          type: "learn",
          description: "Ôn tập xem giờ, các ngày trong tuần và xem lịch",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã biết xem đồng hồ và xem lịch rồi! Tổng kết nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Tổng kết chủ đề 9",
                explanation:
                  "Bé đã học: mặt đồng hồ, xem giờ đúng, các buổi trong ngày, các ngày trong tuần và xem lịch.",
                points: [
                  "Kim ngắn chỉ giờ, kim dài chỉ phút.",
                  "Kim dài chỉ số 12 thì đọc giờ theo kim ngắn.",
                  "Một tuần có 7 ngày.",
                  "Trên lịch, cùng một cột là cùng một thứ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Kim dài 12 + kim ngắn 9  →  9 giờ\n1 tuần = 7 ngày",
                clock: {
                  hour: 9,
                  minute: 0,
                  timeText: "9 giờ — kim dài chỉ 12, kim ngắn chỉ 9",
                },
                table: {
                  headers: ["Đại lượng", "Bằng"],
                  rows: [["1 tuần", "7 ngày"], ["1 ngày", "24 giờ"]],
                  label: "Thực hành và luyện tập chung",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Kim ngắn chỉ số 9, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?",
                options: ["9 giờ", "12 giờ", "3 giờ", "6 giờ"],
                answer: "9 giờ",
                mascotHint: "Kim dài chỉ 12 nên đọc theo kim ngắn: 9 giờ.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hôm nay là thứ Năm. Ngày mai là thứ mấy?",
                options: ["Thứ Tư", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"],
                answer: "Thứ Sáu",
                mascotHint: "Tiến thêm một ngày: thứ Năm → thứ Sáu.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bé đã hoàn thành chủ đề 9.",
                  "Xem giờ đúng và xem lịch đều đã biết.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
      ],
    },

    // ═══ CHỦ ĐỀ 10 — SGK Bài 38-41 ═══
    {
      id: "g1-c10",
      name: "Chủ đề 10: Ôn tập cuối năm",
      description:
        "Ôn tập số và phép tính trong phạm vi 10 và 100, hình học, đo lường và thời gian",
      icon: "🎓",
      color: "#06d6a0",
      totalLessons: 9,
      lessons: [
        {
          id: "g1-c10-l1",
          title: "Bài 1: Ôn tập các số trong phạm vi 10",
          type: "learn",
          description: "Ôn lại đếm, so sánh và tách gộp các số đến 10",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Sắp hết năm học rồi! Mình ôn lại từ đầu cho thật chắc nhé 📖",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Các số trong phạm vi 10",
                explanation:
                  "Bé nhớ lại: đếm xuôi, đếm ngược, so sánh và tách gộp số.",
                rule: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10. Số liền sau của 9 là 10; liền trước của 10 là 9.",
                points: [
                  "Số lớn nhất trong phạm vi 10 là 10.",
                  "10 gồm 6 và 4; gồm 5 và 5.",
                  "Miệng dấu quay về số lớn hơn.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 · 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 · 9 · 10",
                numberLine: {
                  from: 0,
                  to: 10,
                  step: 1,
                  marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  label: "Liền sau của 9 là 10 · liền trước của 10 là 9",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền sau của 9 là số nào?",
                options: [8, 10, 11, 90],
                answer: 10,
                mascotHint: "9 thêm 1 được 10.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "10 gồm 6 và mấy?",
                options: [3, 4, 5, 6],
                answer: 4,
                mascotHint: "6 + 4 = 10.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Số liền sau của 9 là 10.", "10 gồm 6 và 4."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l2",
          title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 10",
          type: "learn",
          description:
            "Ôn lại bảng cộng, bảng trừ trong phạm vi 10 trước khi lên lớp 2",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bảng cộng và bảng trừ trong phạm vi 10 — bé còn nhớ hết không? 🎯",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Cộng trừ trong phạm vi 10",
                explanation:
                  "Cộng thì đếm tiếp; trừ thì đếm lùi. Từ một phép cộng viết được hai phép trừ.",
                rule: "6 + 4 = 10 → 10 − 6 = 4 và 10 − 4 = 6.",
                points: [
                  "Số nào cộng 0 cũng bằng chính nó.",
                  "Hai số bằng nhau trừ nhau thì bằng 0.",
                  "5 + 5 = 10; 10 − 5 = 5.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "6 + 4 = 10\n10 − 6 = 4\n10 − 4 = 6",
                operation: { left: 6, sign: "+", right: 4, result: 10 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["6 + 4", "10"], ["10 − 6", "4"], ["10 − 4", "6"]],
                  label: "6 + 4 = 10 → 10 − 6 = 4 và 10 − 4 = 6",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "9 − 4 bằng bao nhiêu?",
                options: [4, 5, 6, 13],
                answer: 5,
                mascotHint: "Vì 4 + 5 = 9 nên 9 − 4 = 5.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "3 + 7 bằng bao nhiêu?",
                options: [9, 10, 11, 4],
                answer: 10,
                mascotHint: "3 + 7 = 10.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "9 − 4 = 5; 3 + 7 = 10.",
                  "Từ phép cộng viết được hai phép trừ.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l3",
          title: "Bài 3: Ôn tập các số trong phạm vi 100",
          type: "learn",
          description:
            "Ôn lại số có hai chữ số, so sánh và số liền trước liền sau",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Các số đến 100 — bé nhớ hàng chục và hàng đơn vị chứ? 🔢",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Số trong phạm vi 100",
                explanation:
                  "Số có hai chữ số gồm hàng chục và hàng đơn vị. So sánh thì so hàng chục trước.",
                rule: "47 gồm 4 chục và 7 đơn vị. 47 = 40 + 7. So sánh: 35 < 53.",
                points: [
                  "Số lớn nhất có hai chữ số là 99.",
                  "Số bé nhất có hai chữ số là 10.",
                  "Số tròn chục tận cùng bằng 0.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "47 = 40 + 7\n35  <  53",
                placeValue: {
                  headers: ["Chục", "Đơn vị"],
                  digits: [4, 7],
                  label: "47 = 40 + 7",
                },
                comparison: { left: 35, sign: "<", right: 53 },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số 47 gồm mấy chục và mấy đơn vị?",
                options: [
                  "4 chục và 7 đơn vị",
                  "7 chục và 4 đơn vị",
                  "47 chục",
                  "4 chục và 0 đơn vị",
                ],
                answer: "4 chục và 7 đơn vị",
                mascotHint: "Chữ số 4 chỉ chục, chữ số 7 chỉ đơn vị.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số liền trước của 60 là số nào?",
                options: [59, 61, 50, 600],
                answer: 59,
                mascotHint: "60 bớt 1 được 59.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "47 = 4 chục 7 đơn vị = 40 + 7.",
                  "Số liền trước của 60 là 59.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l4",
          title: "Bài 4: Ôn tập phép cộng, phép trừ trong phạm vi 100",
          type: "learn",
          description: "Ôn lại cộng trừ (không nhớ) số có hai chữ số",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "curious",
                text: "Cộng trừ số có hai chữ số — bé nhớ cách đặt tính chứ? ✏️",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Cộng trừ trong phạm vi 100",
                explanation:
                  "Đặt tính thẳng cột rồi tính từ phải sang trái. Lớp 1 chỉ học cộng trừ KHÔNG nhớ, KHÔNG mượn.",
                rule: "25 + 4 = 29; 32 + 14 = 46; 57 − 23 = 34.",
                points: [
                  "Hàng đơn vị cộng lại bé hơn 10 nên không nhớ.",
                  "Hàng đơn vị trừ được nên không mượn.",
                  "Thử lại bằng phép tính ngược.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "  32        57\n+ 14      − 23\n  46        34",
                operation: { left: 32, sign: "+", right: 14, result: 46 },
                table: {
                  headers: ["Phép tính", "Kết quả"],
                  rows: [["25 + 4", "29"], ["32 + 14", "46"], ["57 − 23", "34"]],
                  label: "Ôn tập cộng trừ trong phạm vi 100",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "43 + 25 bằng bao nhiêu?",
                options: [58, 68, 65, 78],
                answer: 68,
                mascotHint: "3 + 5 = 8; 4 + 2 = 6. Kết quả 68.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "86 − 31 bằng bao nhiêu?",
                options: [45, 55, 65, 117],
                answer: 55,
                mascotHint: "6 − 1 = 5; 8 − 3 = 5. Kết quả 55.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "43 + 25 = 68; 86 − 31 = 55.",
                  "Lớp 1 học cộng trừ không nhớ, không mượn.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l5",
          title: "Bài 5: Ôn tập hình học",
          type: "learn",
          description: "Ôn tập hình phẳng, hình khối và vị trí",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Các hình đang chờ bé ôn lại đấy! 🔷",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Hình học Lớp 1",
                explanation:
                  "Hình phẳng: vuông, tròn, tam giác, chữ nhật. Hình khối: khối lập phương, khối hộp chữ nhật.",
                rule: "Hình vuông: 4 cạnh bằng nhau. Hình tam giác: 3 cạnh. Khối lập phương: 6 mặt vuông bằng nhau.",
                points: [
                  "Hình tròn không có cạnh, có đường bao cong.",
                  "Hình chữ nhật có hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
                  "Khối hộp chữ nhật có 6 mặt không đều nhau.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "▢ · ⭕ · 🔺 · ▭\n🎲 khối lập phương · 📦 khối hộp chữ nhật",
                planeShape: { kind: "square" },
                solid: {
                  kind: "cube",
                  dims: { a: 3 },
                  label: "Khối lập phương",
                  formula: "6 mặt đều là hình vuông bằng nhau",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Hình nào có 3 cạnh?",
                options: [
                  "Hình tam giác",
                  "Hình vuông",
                  "Hình tròn",
                  "Hình chữ nhật",
                ],
                answer: "Hình tam giác",
                mascotHint: "Hình tam giác có 3 cạnh.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Khối nào có 6 mặt không đều nhau?",
                options: [
                  "Khối hộp chữ nhật",
                  "Khối lập phương",
                  "Hình tròn",
                  "Hình tam giác",
                ],
                answer: "Khối hộp chữ nhật",
                mascotHint:
                  "Khối hộp chữ nhật có 6 mặt, các mặt không đều nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Bốn hình phẳng và hai loại khối.",
                  "Hình tam giác: 3 cạnh.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l6",
          title: "Bài 6: Ôn tập đo độ dài",
          type: "learn",
          description: "Ôn tập so sánh độ dài và đo bằng xăng-ti-mét",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Bé lấy thước ra đo một vật bất kì xem nào! 📏",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Đo độ dài",
                explanation:
                  "Đơn vị đo độ dài là xăng-ti-mét (cm). Đo bằng thước: đặt vạch 0 vào một đầu vật.",
                rule: "Đoạn thẳng dài 5 cm nếu đầu kia trùng vạch 5 của thước.",
                points: [
                  "So sánh độ dài: đặt hai vật cạnh nhau, một đầu thẳng hàng.",
                  "Có thể đo bằng gang tay khi chưa có thước.",
                  "Đơn vị cm viết sau số: 5 cm.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "0 ————— 5\n→ dài 5 cm",
                ruler: {
                  lengthCm: 5,
                  measure: { from: 0, to: 5 },
                  label: "Đoạn thẳng dài 5 cm nếu đầu kia trùng vạch 5 của thước",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Đoạn thẳng có một đầu ở vạch 0 và đầu kia ở vạch 8. Đoạn thẳng dài bao nhiêu?",
                options: ["7 cm", "8 cm", "9 cm", "80 cm"],
                answer: "8 cm",
                mascotHint: "Đọc số ở đầu kia: 8 cm.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: [
                  "Đơn vị đo độ dài là cm.",
                  "Đặt vạch 0 vào một đầu vật rồi đọc số ở đầu kia.",
                ],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l7",
          title: "Bài 7: Ôn tập thời gian — giờ và lịch",
          type: "learn",
          description: "Ôn tập xem giờ đúng, các ngày trong tuần và xem lịch",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "happy",
                text: "Đồng hồ và tờ lịch — hai người bạn quen thuộc của bé! 🕐",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập",
                title: "Giờ và lịch",
                explanation:
                  "Bé đọc giờ đúng theo kim ngắn khi kim dài chỉ 12. Trên lịch, cùng một cột là cùng một thứ.",
                rule: "Kim ngắn chỉ 8, kim dài chỉ 12 → 8 giờ. Một tuần có 7 ngày.",
                points: [
                  "Buổi sáng, trưa, chiều, tối.",
                  "Hôm qua lùi 1 ngày, ngày mai tiến 1 ngày.",
                  "Lớp 1 chỉ học GIỜ ĐÚNG (kim dài chỉ 12).",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Kim ngắn 8 + kim dài 12  →  8 giờ\n1 tuần = 7 ngày",
                clock: { hour: 8, minute: 0, timeText: "8 giờ" },
                table: {
                  headers: ["Đại lượng", "Bằng"],
                  rows: [["1 tuần", "7 ngày"], ["1 ngày", "24 giờ"]],
                  label: "Ôn tập thời gian — giờ và lịch",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Một tuần lễ có bao nhiêu ngày?",
                options: [5, 6, 7, 12],
                answer: 7,
                mascotHint: "Một tuần có 7 ngày.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé nhớ rất tốt:",
                points: ["Đọc giờ đúng theo kim ngắn.", "Một tuần có 7 ngày."],
                mascotMood: "proud",
              },
            },
          ],
        },
        {
          id: "g1-c10-l8",
          title: "Bài 8: Ôn tập chung cuối năm",
          type: "learn",
          description: "Ôn tập tổng hợp toàn bộ chương trình Lớp 1",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Bé đã đi hết cả năm Lớp 1 rồi! Cùng nhìn lại chặng đường nhé 🎉",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Ôn Tập Chung",
                title: "Cả năm Lớp 1 bé đã học gì?",
                explanation:
                  "Số đến 100; cộng trừ trong phạm vi 10 và 100 (không nhớ); hình phẳng, hình khối; đo độ dài; giờ và lịch.",
                points: [
                  "Số: đếm, đọc, viết, so sánh, tách gộp.",
                  "Phép tính: cộng và trừ.",
                  "Hình học: 4 hình phẳng, 2 loại khối, vị trí.",
                  "Đo lường: xăng-ti-mét. Thời gian: giờ đúng, ngày trong tuần, lịch.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Số đến 100 · Cộng trừ · Hình học · Đo độ dài · Giờ và lịch",
                table: {
                  headers: ["Mạch kiến thức", "Ví dụ"],
                  rows: [
                    ["Số đến 100", "47 = 40 + 7"],
                    ["Cộng trừ", "32 + 14 = 46"],
                    ["Hình học", "hình vuông · khối lập phương"],
                    ["Đo độ dài", "đoạn thẳng 5 cm"],
                    ["Giờ và lịch", "8 giờ · 1 tuần = 7 ngày"],
                  ],
                  label: "Ôn tập chung cuối năm",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Có 26 con gà, mua thêm 12 con. Hỏi có tất cả bao nhiêu con gà?",
                options: [38, 36, 14, 48],
                answer: 38,
                mascotHint: "26 + 12 = 38 con gà.",
              },
            },
            {
              type: "quiz",
              content: {
                question: "Số nào lớn nhất: 45, 54, 9, 60?",
                options: [45, 54, 9, 60],
                answer: 60,
                mascotHint: "60 là số lớn nhất trong bốn số.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé giỏi lắm:",
                points: [
                  "Bé đã ôn xong toàn bộ chương trình Lớp 1.",
                  "Bé nắm chắc số đến 100, cộng trừ, hình học, đo độ dài và xem giờ.",
                ],
                mascotMood: "celebrate",
              },
            },
          ],
        },
        {
          id: "g1-c10-l9",
          title: "Bài 9: Luyện đề cuối năm Lớp 1",
          type: "learn",
          description: "Luyện tập dạng đề kiểm tra cuối năm",
          slides: [
            {
              type: "story",
              content: {
                mascotMood: "excited",
                text: "Đây là những dạng bài bé sẽ gặp trong bài kiểm tra cuối năm. Mình thử sức nhé! 🏆",
              },
            },
            {
              type: "concept",
              content: {
                badge: "Luyện Đề",
                title: "Các dạng bài thường gặp",
                explanation:
                  "Đề cuối năm thường có: đọc viết số, so sánh số, đặt tính rồi tính, bài toán có lời văn, hình học, đo độ dài và xem giờ.",
                points: [
                  "Đặt tính thẳng cột rồi tính từ phải sang trái.",
                  "Đọc kĩ đề để chọn đúng phép tính.",
                  "Ghi đơn vị và đáp số đầy đủ.",
                ],
              },
            },
            {
              type: "visual",
              content: {
                text: "Đọc số · So sánh · Đặt tính · Giải toán · Hình học · Xem giờ",
                table: {
                  headers: ["Dạng bài", "Ví dụ"],
                  rows: [
                    ["Đọc số", "47"],
                    ["So sánh", "35 < 53"],
                    ["Đặt tính", "32 + 14 = 46"],
                    ["Giải toán", "5 + 2 = 7"],
                    ["Hình học", "hình tam giác"],
                    ["Xem giờ", "7 giờ"],
                  ],
                  label: "Luyện đề cuối năm Lớp 1",
                },
              },
            },
            {
              type: "quiz",
              content: {
                question: "Điền dấu thích hợp: 63 ? 36",
                options: [">", "<", "=", "+"],
                answer: ">",
                mascotHint: "6 chục lớn hơn 3 chục nên 63 > 36.",
              },
            },
            {
              type: "quiz",
              content: {
                question:
                  "Một hình vuông có cạnh dài 3 cm. Hình vuông đó có mấy cạnh?",
                options: ["3 cạnh", "4 cạnh", "5 cạnh", "6 cạnh"],
                answer: "4 cạnh",
                mascotHint: "Hình vuông luôn có 4 cạnh bằng nhau.",
              },
            },
            {
              type: "summary",
              content: {
                title: "Bé giỏi lắm:",
                points: [
                  "Bé đã hoàn thành chương trình Toán Lớp 1 theo đúng SGK.",
                  "Chúc mừng bé lên Lớp 2!",
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
