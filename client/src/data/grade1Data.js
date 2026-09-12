// Data for Grade 1 (Lớp 1) - 6 Chapters, at least 10 lessons each (60 lessons total)
// Aligned with Vietnam Primary Math Curriculum

function makeLesson(id, title, desc, slides) {
  return {
    id,
    title,
    type: 'learn',
    description: desc,
    slides,
  }
}

export const grade1Data = {
  id: 1,
  name: 'Lớp 1',
  description: 'Các số đến 100, phép cộng trừ, hình học & đo lường cơ bản',
  icon: '🌱',
  color: '#4facfe',
  ageRange: '6-7 tuổi',
  chapters: [
    // ----------------------------------------------------
    // CHƯƠNG 1: CÁC SỐ TỪ 0 ĐẾN 10 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c1',
      name: 'Chương 1: Các số đến 10',
      description: 'Đếm, đọc, viết số từ 0 đến 10, so sánh các số',
      icon: '🔢',
      color: '#4facfe',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c1-l1', 'Bài 1: Làm quen với số 1, 2, 3', 'Học đếm và nhận biết các số 1, 2, 3', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chào bé! Hôm nay Cú Mèo sẽ dạy bé đếm số 1, 2, 3 nhé! 🦉✨' } },
          { type: 'visual', content: { text: 'Số 1: Có 1 quả táo đỏ 🍎', items: [{ emoji: '🍎', count: 1 }], number: 1 } },
          { type: 'visual', content: { text: 'Số 2: Có 2 quả cam mọng nước 🍊🍊', items: [{ emoji: '🍊', count: 2 }], number: 2 } },
          { type: 'visual', content: { text: 'Số 3: Có 3 ngôi sao lấp lánh ⭐⭐⭐', items: [{ emoji: '⭐', count: 3 }], number: 3 } },
          { type: 'quiz', content: { question: 'Có bao nhiêu quả dâu tây? 🍓🍓🍓', options: [1, 2, 3, 4], answer: 3, mascotHint: 'Đếm từng quả: 1, 2, 3 quả dâu!' } },
          { type: 'summary', content: { title: 'Bé đã thuộc số 1, 2, 3!', points: ['1: một', '2: hai', '3: ba'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l2', 'Bài 2: Các số 4, 5, 6', 'Tiếp tục đếm với số 4, 5, 6', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Tuyệt vời! Bây giờ cùng khám phá số 4, 5, 6 nha! 🚀' } },
          { type: 'visual', content: { text: 'Số 4: Có 4 chú chim vui hót 🐦🐦🐦🐦', items: [{ emoji: '🐦', count: 4 }], number: 4 } },
          { type: 'visual', content: { text: 'Số 5: Bàn tay có 5 ngón xinh 🖐️', items: [{ emoji: '⭐', count: 5 }], number: 5 } },
          { type: 'visual', content: { text: 'Số 6: Có 6 chú cá bơi 🐟🐟🐟🐟🐟🐟', items: [{ emoji: '🐟', count: 6 }], number: 6 } },
          { type: 'quiz', content: { question: 'Có bao nhiêu con bướm? 🦋🦋🦋🦋', options: [3, 4, 5, 6], answer: 4, mascotHint: 'Đếm 1, 2, 3, 4!' } },
          { type: 'summary', content: { title: 'Bé đã nhớ 4, 5, 6!', points: ['4: bốn', '5: năm', '6: sáu'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l3', 'Bài 3: Các số 7, 8, 9', 'Đếm tiếp các nhóm số lớn hơn', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Cùng Cú Mèo đếm tiếp số 7, 8, 9 nào! 🌟' } },
          { type: 'visual', content: { text: 'Số 7: Bảy sắc cầu vồng rực rỡ 🌈', items: [{ emoji: '🎈', count: 7 }], number: 7 } },
          { type: 'visual', content: { text: 'Số 8: Chú bạch tuộc có 8 xúc tu 🐙', items: [{ emoji: '🌸', count: 8 }], number: 8 } },
          { type: 'visual', content: { text: 'Số 9: Chín quả bóng bay 🎈🎈🎈🎈🎈🎈🎈🎈🎈', items: [{ emoji: '🎈', count: 9 }], number: 9 } },
          { type: 'quiz', content: { question: 'Đâu là số 8?', options: [6, 7, 8, 9], answer: 8, mascotHint: 'Số 8 trông giống người tuyết tròn vo!' } },
          { type: 'summary', content: { title: 'Ghi nhớ số 7, 8, 9:', points: ['7: bảy', '8: tám', '9: chín'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l4', 'Bài 4: Số 0 và Số 10', 'Số 0 không có gì và số 10 tròn trịa', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 0 nghĩa là không có vật nào cả. Số 10 là mười ngón tay của bé! 🖐️🖐️' } },
          { type: 'visual', content: { text: 'Đĩa trống trơn có 0 quả táo. Hai bàn tay có 10 ngón tay!', items: [{ emoji: '🍎', count: 10 }], number: 10 } },
          { type: 'quiz', content: { question: 'Số liền sau số 9 là số mấy?', options: [8, 9, 10, 11], answer: 10, mascotHint: '9 rồi đến 10!' } },
          { type: 'summary', content: { title: 'Số 0 và số 10:', points: ['0: không có gì', '10: mười đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l5', 'Bài 5: Nhiều hơn, ít hơn, bằng nhau', 'So sánh hai nhóm đồ vật', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Nhóm nào có số lượng lớn hơn thì gọi là nhiều hơn! 🍎🍊' } },
          { type: 'visual', content: { text: '5 quả táo 🍎🍎🍎🍎🍎 nhiều hơn 3 quả cam 🍊🍊🍊' } },
          { type: 'quiz', content: { question: '4 chú mèo và 4 chú cá thì số lượng thế nào?', options: ['Nhiều hơn', 'Ít hơn', 'Bằng nhau'], answer: 'Bằng nhau', mascotHint: '4 bằng 4 nhé bé!' } },
          { type: 'summary', content: { title: 'So sánh:', points: ['Nhiều hơn: số lượng lớn hơn', 'Bằng nhau: số lượng như nhau'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l6', 'Bài 6: Dấu lớn hơn (>) và Dấu bé hơn (<)', 'Sử dụng ký hiệu toán học', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Miệng dấu ngoặc luôn quay về số lớn hơn: 5 > 2 và 3 < 7! 🦈' } },
          { type: 'quiz', content: { question: 'Điền dấu thích hợp: 8 ... 5', options: ['>', '<', '='], answer: '>', mascotHint: '8 lớn hơn 5 nên dùng dấu >' } },
          { type: 'summary', content: { title: 'Ký hiệu so sánh:', points: ['> : Lớn hơn', '< : Bé hơn'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l7', 'Bài 7: Dấu bằng (=) và thứ tự dãy số', 'Sắp xếp dãy số từ bé đến lớn', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Dãy số từ 0 đến 10 tăng dần: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10!' } },
          { type: 'quiz', content: { question: 'Số nào bé nhất trong các số: 3, 7, 1, 9?', options: [3, 7, 1, 9], answer: 1, mascotHint: '1 là số bé nhất!' } },
          { type: 'summary', content: { title: 'Thứ tự các số:', points: ['Từ bé đến lớn: số nhỏ đứng trước, số lớn đứng sau'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l8', 'Bài 8: Tách và gộp số trong phạm vi 5', 'Cách phân tích số đơn giản', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 4 gồm 3 và 1, hoặc 2 và 2! Gộp 3 và 1 được 4! 💡' } },
          { type: 'quiz', content: { question: 'Gộp 2 và 3 được mấy?', options: [4, 5, 6, 7], answer: 5, mascotHint: '2 + 3 = 5!' } },
          { type: 'summary', content: { title: 'Tách và gộp:', points: ['Tách số giúp bé tính nhẩm nhanh hơn!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l9', 'Bài 9: Tách và gộp số trong phạm vi 10', 'Tìm bạn của 10', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Các cặp số tạo thành 10: 9 và 1, 8 và 2, 7 và 3, 6 và 4, 5 và 5! 🎯' } },
          { type: 'quiz', content: { question: '7 gộp với mấy để bằng 10?', options: [2, 3, 4, 5], answer: 3, mascotHint: '7 + 3 = 10!' } },
          { type: 'summary', content: { title: 'Bạn của 10:', points: ['7 và 3', '8 và 2', '6 và 4', '5 và 5'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l10', 'Bài 10: Luyện tập tổng hợp các số đến 10', 'Ôn tập toàn bộ Chương 1', [
          { type: 'story', content: { mascotMood: 'proud', text: 'Chúc mừng bé đã đến bài cuối của Chương 1! Cùng làm thử thách nào! 🏆' } },
          { type: 'quiz', content: { question: 'Số liền trước của 10 là số mấy?', options: [8, 9, 10, 11], answer: 9, mascotHint: 'Đứng ngay trước số 10 là số 9.' } },
          { type: 'quiz', content: { question: 'Điền dấu thích hợp: 6 ... 9', options: ['>', '<', '='], answer: '<', mascotHint: '6 bé hơn 9 nên 6 < 9.' } },
          { type: 'summary', content: { title: 'Hoàn thành xuất sắc Chương 1!', points: ['Bé đã thông thạo đếm và so sánh số 0-10!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g1-c1-l11', 'Bài 11: Đếm lùi từ 10 về 0', 'Thực hành đếm ngược như tên lửa phóng', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Cùng Cú Mèo đếm ngược để phóng tàu vũ trụ nhé: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0... Phóng! 🚀✨' } },
          { type: 'quiz', content: { question: 'Đếm lùi: 7, 6, 5, ... Số tiếp theo là số mấy?', options: [3, 4, 6, 8], answer: 4, mascotHint: 'Đếm lùi từ 5 xuống 1 đơn vị là 4!' } },
          { type: 'summary', content: { title: 'Đếm ngược thành thạo:', points: ['10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c1-l12', 'Bài 12: Thử thách Trạng Nguyên Nhí: Đếm và So sánh', 'Chinh phục huy hiệu Trạng Nguyên Chương 1', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Chào mừng bé bước vào thử thách Trạng Nguyên Nhí của Chương 1! Cùng trổ tài đếm và so sánh nào! 🌟🦉' } },
          { type: 'quiz', content: { question: 'Dãy số nào được sắp xếp đúng theo thứ tự từ bé đến lớn?', options: ['0, 2, 5, 7, 10', '10, 7, 5, 2, 0', '0, 5, 2, 7, 10'], answer: '0, 2, 5, 7, 10', mascotHint: 'Số bé hơn đứng trước, số lớn hơn đứng sau!' } },
          { type: 'summary', content: { title: 'Trạng Nguyên Nhí Chương 1:', points: ['Bé nắm chắc các số từ 0 đến 10!', 'Xuất sắc nhận huy hiệu Vàng! 🏅'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 2: PHÉP CỘNG, PHÉP TRỪ PHẠM VI 10 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c2',
      name: 'Chương 2: Phép cộng trừ phạm vi 10',
      description: 'Làm quen dấu +, -, = và bảng tính trong phạm vi 10',
      icon: '➕',
      color: '#51CF66',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c2-l1', 'Bài 1: Làm quen phép cộng và dấu cộng (+)', 'Thêm vào nghĩa là làm phép cộng', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 2 quả táo, mẹ cho thêm 1 quả. Có tất cả 2 + 1 = 3 quả! 🍎' } },
          { type: 'quiz', content: { question: 'Tính: 1 + 1 = ?', options: [1, 2, 3, 4], answer: 2, mascotHint: '1 thêm 1 là 2!' } },
          { type: 'summary', content: { title: 'Dấu cộng (+):', points: ['Cộng là gộp lại, thêm vào'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l2', 'Bài 2: Phép cộng trong phạm vi 5', 'Cộng nhanh các số nhỏ', [
          { type: 'story', content: { mascotMood: 'happy', text: '3 chú ếch thêm 2 chú ếch nhảy vào hồ là 3 + 2 = 5 chú ếch! 🐸' } },
          { type: 'quiz', content: { question: 'Tính: 2 + 3 = ?', options: [4, 5, 6, 7], answer: 5, mascotHint: '2 + 3 = 5' } },
          { type: 'summary', content: { title: 'Bé nhớ rất tốt:', points: ['1 + 4 = 5', '2 + 3 = 5'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l3', 'Bài 3: Phép cộng trong phạm vi 10', 'Mở rộng cộng đến 10', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Bé có 4 viên bi, bạn tặng thêm 3 viên. Bé có: 4 + 3 = 7 viên bi! 🔮' } },
          { type: 'quiz', content: { question: 'Tính: 5 + 4 = ?', options: [8, 9, 10, 7], answer: 9, mascotHint: '5 thêm 4 là 9!' } },
          { type: 'summary', content: { title: 'Cộng trong phạm vi 10:', points: ['4 + 3 = 7', '5 + 4 = 9'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l4', 'Bài 4: Bảng cộng trong phạm vi 10', 'Ghi nhớ các phép cộng quen thuộc', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Học thuộc bảng cộng giúp bé tính nhẩm như chớp mắt! ⚡' } },
          { type: 'quiz', content: { question: 'Tính: 6 + 3 = ?', options: [8, 9, 10, 7], answer: 9, mascotHint: '6, đếm thêm 3 bước: 7, 8, 9!' } },
          { type: 'summary', content: { title: 'Bảng cộng:', points: ['6 + 4 = 10', '7 + 3 = 10', '8 + 2 = 10'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l5', 'Bài 5: Số 0 trong phép cộng', 'Bất kỳ số nào cộng với 0', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 6 quả cam, không thêm quả nào (thêm 0). Vẫn là 6 quả! 6 + 0 = 6 ✨' } },
          { type: 'quiz', content: { question: 'Tính: 0 + 8 = ?', options: [0, 8, 80, 18], answer: 8, mascotHint: 'Cộng với 0 thì số không đổi!' } },
          { type: 'summary', content: { title: 'Quy tắc số 0:', points: ['a + 0 = a', '0 + a = a'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l6', 'Bài 6: Làm quen phép trừ và dấu trừ (-)', 'Bớt đi nghĩa là làm phép trừ', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 5 chú chim đậu trên cành, 2 chú bay đi. Còn lại 5 - 2 = 3 chú chim! 🕊️' } },
          { type: 'quiz', content: { question: 'Tính: 4 - 1 = ?', options: [1, 2, 3, 4], answer: 3, mascotHint: '4 bớt 1 còn 3!' } },
          { type: 'summary', content: { title: 'Dấu trừ (-):', points: ['Trừ là bớt đi, cho đi, bay đi'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l7', 'Bài 7: Phép trừ trong phạm vi 5', 'Luyện tập trừ các số nhỏ', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 5 cái kẹo, ăn 3 cái còn mấy cái? 5 - 3 = 2 cái kẹo! 🍬' } },
          { type: 'quiz', content: { question: 'Tính: 5 - 4 = ?', options: [0, 1, 2, 3], answer: 1, mascotHint: '5 bớt 4 còn 1!' } },
          { type: 'summary', content: { title: 'Trừ trong phạm vi 5:', points: ['5 - 1 = 4', '5 - 2 = 3', '5 - 3 = 2', '5 - 4 = 1'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l8', 'Bài 8: Phép trừ trong phạm vi 10', 'Bớt đi các số lớn hơn', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Có 9 bông hoa, tặng bạn 5 bông. Còn lại: 9 - 5 = 4 bông hoa! 🌸' } },
          { type: 'quiz', content: { question: 'Tính: 10 - 6 = ?', options: [3, 4, 5, 6], answer: 4, mascotHint: '10 bớt 6 còn 4!' } },
          { type: 'summary', content: { title: 'Trừ phạm vi 10:', points: ['10 - 7 = 3', '10 - 5 = 5', '10 - 2 = 8'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l9', 'Bài 9: Số 0 trong phép trừ', 'Trừ đi 0 và trừ đi chính nó', [
          { type: 'story', content: { mascotMood: 'happy', text: '7 quả táo không ăn quả nào (trừ 0) vẫn còn 7 quả! Nhưng ăn hết cả 7 quả thì còn 0 quả! 7 - 7 = 0! 🍎' } },
          { type: 'quiz', content: { question: 'Tính: 9 - 0 = ?', options: [0, 9, 90, 19], answer: 9, mascotHint: 'Trừ 0 giữ nguyên số đó!' } },
          { type: 'quiz', content: { question: 'Tính: 8 - 8 = ?', options: [0, 8, 16, 1], answer: 0, mascotHint: 'Bằng nhau trừ nhau bằng 0!' } },
          { type: 'summary', content: { title: 'Quy tắc trừ số 0:', points: ['a - 0 = a', 'a - a = 0'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l10', 'Bài 10: Luyện tập chung phép cộng trừ phạm vi 10', 'Tổng hợp kiến thức phép tính', [
          { type: 'story', content: { mascotMood: 'proud', text: 'Thử sức giải các phép tính hỗn hợp cùng Cú Mèo nhé! 🦉🏆' } },
          { type: 'quiz', content: { question: 'Tính: 3 + 4 - 2 = ?', options: [4, 5, 6, 7], answer: 5, mascotHint: '3 + 4 = 7, rồi 7 - 2 = 5!' } },
          { type: 'summary', content: { title: 'Bé nhớ rất tốt!', points: ['Bé là vua tính nhẩm phạm vi 10!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l11', 'Bài 11: Tìm số còn thiếu trong phép tính', 'Làm quen dạng toán điền số vào ô trống', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Đố bé: Có 4 chú gà 🐥, cần thêm mấy chú gà nữa để được 6 chú gà? 4 + ? = 6' } },
          { type: 'quiz', content: { question: 'Điền số thích hợp: 5 + ... = 8', options: [2, 3, 4, 5], answer: 3, mascotHint: 'Đếm thêm từ 5 đến 8: 6, 7, 8 -> Thêm 3!' } },
          { type: 'summary', content: { title: 'Bí quyết tìm số còn thiếu:', points: ['Đếm thêm hoặc dùng phép trừ lấy tổng trừ số đã biết'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c2-l12', 'Bài 12: Đố vui toán có lời văn: Hái hoa bắt bướm', 'Vận dụng phép tính vào câu chuyện thực tế', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Trong vườn có 7 bông hoa cúc vàng 🌼. Chú ong bay đến đậu vào 3 bông hoa. Còn mấy bông chưa có ong đậu? 🐝' } },
          { type: 'quiz', content: { question: 'Có 7 bông hoa, 3 bông có ong đậu. Còn lại số bông là:', options: ['7 + 3 = 10', '7 - 3 = 4', '7 - 4 = 3'], answer: '7 - 3 = 4', mascotHint: 'Bớt đi số hoa có ong đậu: 7 - 3 = 4!' } },
          { type: 'summary', content: { title: 'Giải toán lời văn:', points: ['Đọc kỹ đề, xác định số ban đầu và số bớt đi'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 3: CÁC SỐ ĐẾN 20 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c3',
      name: 'Chương 3: Các số đến 20',
      description: 'Khái niệm Chục và Đơn vị, các số từ 11 đến 20',
      icon: '🔟',
      color: '#FFE66D',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c3-l1', 'Bài 1: Đếm các số từ 11 đến 15', 'Làm quen các số đầu tiên sau số 10', [
          { type: 'story', content: { mascotMood: 'happy', text: '10 quả bóng thêm 1 quả là 11 quả! 10 + 2 = 12, 10 + 3 = 13... 🎈' } },
          { type: 'quiz', content: { question: 'Số gồm 1 chục và 3 đơn vị là số mấy?', options: [12, 13, 14, 31], answer: 13, mascotHint: 'Viết số 1 trước, số 3 sau!' } },
          { type: 'summary', content: { title: 'Các số 11-15:', points: ['11, 12, 13, 14, 15'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l2', 'Bài 2: Đếm các số từ 16 đến 20', 'Hoàn thành dãy số đến 20', [
          { type: 'story', content: { mascotMood: 'excited', text: '16, 17, 18, 19 và 20! Hai chục là 20! 🌟' } },
          { type: 'quiz', content: { question: 'Số liền sau số 19 là số mấy?', options: [18, 20, 21, 19], answer: 20, mascotHint: '19 rồi đến 20!' } },
          { type: 'summary', content: { title: 'Các số 16-20:', points: ['16, 17, 18, 19, 20'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l3', 'Bài 3: Mười và một chục', 'Hiểu rõ khái niệm một chục', [
          { type: 'story', content: { mascotMood: 'happy', text: '1 chục que tính gồm đúng 10 que tính buộc lại thành 1 bó! 🥢' } },
          { type: 'quiz', content: { question: '1 chục bằng bao nhiêu đơn vị?', options: [1, 5, 10, 20], answer: 10, mascotHint: '1 chục = 10 đơn vị!' } },
          { type: 'summary', content: { title: 'Quy ước:', points: ['1 chục = 10 đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l4', 'Bài 4: Hàng chục và hàng đơn vị', 'Vị trí các chữ số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 17: chữ số 1 chỉ 1 chục, chữ số 7 chỉ 7 đơn vị! 💡' } },
          { type: 'quiz', content: { question: 'Trong số 15, chữ số 5 nằm ở hàng nào?', options: ['Hàng chục', 'Hàng đơn vị', 'Hàng trăm'], answer: 'Hàng đơn vị', mascotHint: 'Đứng phía sau là hàng đơn vị!' } },
          { type: 'summary', content: { title: 'Cấu tạo số:', points: ['Chữ số trước: hàng chục', 'Chữ số sau: hàng đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l5', 'Bài 5: Đọc và viết các số từ 10 đến 20', 'Luyện kỹ năng chính tả số học', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 15 đọc là Mười lăm (không đọc là mười năm nhé bé!). 🌟' } },
          { type: 'quiz', content: { question: 'Số "Mười bốn" viết bằng chữ số là:', options: [13, 14, 15, 41], answer: 14, mascotHint: '1 chục và 4 đơn vị là 14.' } },
          { type: 'summary', content: { title: 'Đọc số đúng:', points: ['11: mười một', '15: mười lăm', '20: hai mươi'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l6', 'Bài 6: So sánh các số trong phạm vi 20', 'So sánh hai số có hai chữ số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Cùng có 1 chục, số nào có hàng đơn vị lớn hơn thì lớn hơn: 18 > 14! ⚖️' } },
          { type: 'quiz', content: { question: 'Điền dấu thích hợp: 16 ... 19', options: ['>', '<', '='], answer: '<', mascotHint: '6 bé hơn 9 nên 16 < 19.' } },
          { type: 'summary', content: { title: 'So sánh:', points: ['16 < 19', '18 > 12'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l7', 'Bài 7: Tìm số lớn nhất và số bé nhất', 'Chọn lọc trong một nhóm số', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Quan sát các số: 12, 17, 9, 20. Đâu là số vô địch lớn nhất? 🏆' } },
          { type: 'quiz', content: { question: 'Trong các số: 11, 15, 18, 13. Số nào lớn nhất?', options: [11, 15, 18, 13], answer: 18, mascotHint: 'Số 18 lớn nhất!' } },
          { type: 'summary', content: { title: 'Bé đã tìm đúng:', points: ['Số lớn nhất: 18', 'Số bé nhất: 11'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l8', 'Bài 8: Dãy số tăng dần và giảm dần', 'Sắp xếp trật tự các số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Tăng dần là từ bé đến lớn: 10, 11, 12... Giảm dần là đếm lùi: 20, 19, 18... 🏃‍♂️' } },
          { type: 'quiz', content: { question: 'Dãy số nào sau đây được xếp từ bé đến lớn?', options: ['12, 15, 18', '18, 15, 12', '15, 12, 18'], answer: '12, 15, 18', mascotHint: '12 nhỏ nhất, đến 15 rồi đến 18.' } },
          { type: 'summary', content: { title: 'Sắp xếp dãy số:', points: ['Tăng dần: nhỏ đến lớn', 'Giảm dần: lớn về nhỏ'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l9', 'Bài 9: Tia số và số liền trước, số liền sau', 'Hiểu vị trí trên trục số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số liền trước bớt 1, số liền sau thêm 1. Liền trước của 15 là 14, liền sau của 15 là 16! 📏' } },
          { type: 'quiz', content: { question: 'Số liền trước của 18 là số nào?', options: [16, 17, 18, 19], answer: 17, mascotHint: '18 bớt 1 là 17!' } },
          { type: 'summary', content: { title: 'Tia số:', points: ['Liền trước = trừ 1', 'Liền sau = cộng 1'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l10', 'Bài 10: Luyện tập củng cố các số đến 20', 'Hoàn thành Chương 3', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Bài tổng kết Chương 3! Bé đã sẵn sàng nhận 3 sao chưa? 🌟' } },
          { type: 'quiz', content: { question: 'Có tất cả bao nhiêu số từ 11 đến 20?', options: [9, 10, 11, 20], answer: 10, mascotHint: 'Có đúng 10 số nhé!' } },
          { type: 'summary', content: { title: 'Chúc mừng bé!', points: ['Bé đã làm chủ hoàn toàn các số đến 20!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l11', 'Bài 11: Số liền trước và số liền sau trong phạm vi 20', 'Tìm vị trí số trên tia số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Trên tia số, số đứng ngay bên trái là số liền trước (bớt 1), số đứng ngay bên phải là số liền sau (thêm 1)!' } },
          { type: 'quiz', content: { question: 'Số liền trước của 19 là số mấy?', options: [17, 18, 19, 20], answer: 18, mascotHint: 'Lấy 19 bớt 1 là 18!' } },
          { type: 'summary', content: { title: 'Liền trước & Liền sau:', points: ['Liền trước = trừ 1', 'Liền sau = cộng 1'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c3-l12', 'Bài 12: Đếm thêm 2 đơn vị đến 20', 'Quy luật dãy số chẵn', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Cùng thỏ nhảy lò cò theo bước 2 nhé: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20! 🐇✨' } },
          { type: 'quiz', content: { question: 'Dãy số: 10, 12, 14, ... Số tiếp theo là:', options: [15, 16, 17, 18], answer: 16, mascotHint: '14 thêm 2 là 16!' } },
          { type: 'summary', content: { title: 'Đếm cách 2:', points: ['Mỗi bước nhảy thêm đúng 2 đơn vị'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 4: PHÉP CỘNG TRỪ PHẠM VI 20 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c4',
      name: 'Chương 4: Phép cộng trừ phạm vi 20',
      description: 'Cộng trừ không nhớ và qua 10 trong phạm vi 20',
      icon: '🧮',
      color: '#FF6B6B',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c4-l1', 'Bài 1: Phép cộng dạng 10 + 3', 'Cộng 1 chục với các số đơn vị', [
          { type: 'story', content: { mascotMood: 'happy', text: '10 + 3 = 13, 10 + 7 = 17, 10 + 9 = 19! Rất nhanh và dễ đúng không bé? 💡' } },
          { type: 'quiz', content: { question: 'Tính: 10 + 6 = ?', options: [15, 16, 17, 60], answer: 16, mascotHint: '10 + 6 = 16' } },
          { type: 'summary', content: { title: 'Quy tắc:', points: ['10 + a = 1a'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l2', 'Bài 2: Phép cộng dạng 14 + 3 (Cộng không nhớ)', 'Cộng hàng đơn vị với nhau', [
          { type: 'story', content: { mascotMood: 'happy', text: '14 + 3: Lấy 4 + 3 = 7, ghép với 1 chục ta có 17! 🍎' } },
          { type: 'quiz', content: { question: 'Tính: 12 + 5 = ?', options: [16, 17, 18, 19], answer: 17, mascotHint: '2 + 5 = 7, thêm 1 chục là 17!' } },
          { type: 'summary', content: { title: 'Cộng không nhớ:', points: ['Cộng các số đơn vị rồi thêm 10 vào'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l3', 'Bài 3: Phép cộng dạng 9 + 4 (Qua 10)', 'Tách để làm tròn 10', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Mẹo số 9: 9 cần thêm 1 để thành 10. Tách 4 thành 1 và 3. 9 + 1 = 10, 10 + 3 = 13! 🎯' } },
          { type: 'quiz', content: { question: 'Tính: 9 + 5 = ?', options: [13, 14, 15, 16], answer: 14, mascotHint: '9 + 1 = 10, thêm 4 là 14!' } },
          { type: 'summary', content: { title: 'Làm tròn 10:', points: ['9 + 5 = 14', '9 + 6 = 15'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l4', 'Bài 4: Phép cộng dạng 8 + 5 (Qua 10)', 'Tách để tạo 10 với số 8', [
          { type: 'story', content: { mascotMood: 'happy', text: '8 cần 2 để đủ 10. 8 + 5 = 8 + 2 + 3 = 13! 🌟' } },
          { type: 'quiz', content: { question: 'Tính: 8 + 6 = ?', options: [13, 14, 15, 16], answer: 14, mascotHint: '8 + 2 = 10, 10 + 4 = 14!' } },
          { type: 'summary', content: { title: '8 cộng với một số:', points: ['8 + 5 = 13', '8 + 6 = 14', '8 + 7 = 15'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l5', 'Bài 5: Bảng cộng qua 10 phạm vi 20', 'Ghi nhớ các phép cộng 7+, 6+', [
          { type: 'story', content: { mascotMood: 'happy', text: '7 + 5 = 12, 7 + 6 = 13, 6 + 6 = 12! 🦉' } },
          { type: 'quiz', content: { question: 'Tính: 7 + 4 = ?', options: [10, 11, 12, 13], answer: 11, mascotHint: '7 + 3 = 10, thêm 1 là 11.' } },
          { type: 'summary', content: { title: 'Ghi nhớ bảng cộng:', points: ['7 + 4 = 11', '7 + 5 = 12', '6 + 5 = 11'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l6', 'Bài 6: Phép trừ dạng 17 - 4 (Trừ không nhớ)', 'Trừ hàng đơn vị cho hàng đơn vị', [
          { type: 'story', content: { mascotMood: 'happy', text: '17 - 4: Lấy 7 - 4 = 3, giữ nguyên 1 chục là 13! 🍬' } },
          { type: 'quiz', content: { question: 'Tính: 19 - 6 = ?', options: [12, 13, 14, 15], answer: 13, mascotHint: '9 - 6 = 3, giữ 1 chục là 13!' } },
          { type: 'summary', content: { title: 'Trừ không nhớ:', points: ['17 - 4 = 13', '19 - 6 = 13'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l7', 'Bài 7: Phép trừ dạng 11 - 5 (Trừ qua 10)', 'Bớt đi để tròn 10 trước', [
          { type: 'story', content: { mascotMood: 'excited', text: '11 bớt 1 thành 10, rồi bớt tiếp 4: 10 - 4 = 6! Vậy 11 - 5 = 6! 💡' } },
          { type: 'quiz', content: { question: 'Tính: 11 - 3 = ?', options: [7, 8, 9, 10], answer: 8, mascotHint: '11 - 1 = 10, 10 - 2 = 8!' } },
          { type: 'summary', content: { title: 'Trừ qua 10:', points: ['11 - 3 = 8', '11 - 4 = 7', '11 - 5 = 6'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l8', 'Bài 8: Phép trừ dạng 14 - 7 (Trừ qua 10)', 'Các phép trừ qua 10 thông dụng', [
          { type: 'story', content: { mascotMood: 'happy', text: '14 - 7: Vì 7 + 7 = 14 nên 14 - 7 = 7! 🎯' } },
          { type: 'quiz', content: { question: 'Tính: 15 - 8 = ?', options: [6, 7, 8, 9], answer: 7, mascotHint: '8 + 7 = 15 nên 15 - 8 = 7!' } },
          { type: 'summary', content: { title: 'Bé nhớ rất giỏi:', points: ['14 - 7 = 7', '15 - 8 = 7', '16 - 8 = 8'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l9', 'Bài 9: Bài toán có lời văn: Thêm vào và Bớt đi', 'Áp dụng vào thực tế cuộc sống', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Lan có 12 bông hoa, Mai cho thêm 4 bông hoa. Hỏi Lan có tất cả bao nhiêu bông hoa? Ta làm phép cộng: 12 + 4 = 16! 🌸' } },
          { type: 'quiz', content: { question: 'Có 18 quả cam, mẹ bán đi 5 quả. Còn lại bao nhiêu quả?', options: [12, 13, 14, 15], answer: 13, mascotHint: 'Bán đi là phép trừ: 18 - 5 = 13!' } },
          { type: 'summary', content: { title: 'Giải toán lời văn:', points: ['Hỏi tất cả: làm phép cộng', 'Hỏi còn lại: làm phép trừ'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l10', 'Bài 10: Luyện tập chung phép tính phạm vi 20', 'Chinh phục phép tính phạm vi 20', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Cùng luyện tập tính nhẩm nhanh phạm vi 20 nào! 🏆' } },
          { type: 'quiz', content: { question: 'Tính nhẩm: 9 + 8 = ?', options: [16, 17, 18, 19], answer: 17, mascotHint: '9 + 8 = 17!' } },
          { type: 'summary', content: { title: 'Tính nhẩm rất nhanh!', points: ['Bé cộng trừ phạm vi 20 cực kỳ thành thạo!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l11', 'Bài 11: Tính nhẩm liên tiếp ba số phạm vi 20', 'Rèn luyện tốc độ phản xạ não bộ', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Khi tính 10 + 3 + 2, bé tính 10 + 3 = 13 trước, rồi lấy 13 + 2 = 15! Rất đơn giản! 🧠' } },
          { type: 'quiz', content: { question: 'Tính: 16 - 6 + 4 = ?', options: [10, 12, 14, 16], answer: 14, mascotHint: '16 - 6 = 10, rồi 10 + 4 = 14!' } },
          { type: 'summary', content: { title: 'Tính ba số:', points: ['Tính lần lượt từ trái sang phải'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c4-l12', 'Bài 12: Bài toán về giỏ quà yêu thương', 'Giải toán có lời văn phạm vi 20', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Bé xếp vào giỏ 12 quả cam 🍊 và 5 quả táo 🍎 để biếu ông bà. Hỏi trong giỏ có tất cả bao nhiêu quả trái cây? 🧺' } },
          { type: 'quiz', content: { question: 'Trong giỏ có tất cả số quả là:', options: ['12 - 5 = 7 quả', '12 + 5 = 17 quả', '12 + 5 = 18 quả'], answer: '12 + 5 = 17 quả', mascotHint: 'Có tất cả ta làm phép cộng: 12 + 5 = 17!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 4:', points: ['Bé đã giải thành thạo các bài toán phạm vi 20!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 5: CÁC SỐ ĐẾN 100 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c5',
      name: 'Chương 5: Các số đến 100',
      description: 'Số tròn chục, cấu tạo chục - đơn vị và số đến 100',
      icon: '💯',
      color: '#4facfe',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c5-l1', 'Bài 1: Các số tròn chục từ 10 đến 50', 'Đếm theo nhóm mười', [
          { type: 'story', content: { mascotMood: 'happy', text: '10, 20, 30, 40, 50! Các số tròn chục có chữ số tận cùng là 0! 🎯' } },
          { type: 'quiz', content: { question: '4 chục là số nào?', options: [4, 14, 40, 44], answer: 40, mascotHint: '4 chục viết là 40.' } },
          { type: 'summary', content: { title: 'Số tròn chục:', points: ['10, 20, 30, 40, 50'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l2', 'Bài 2: Các số tròn chục từ 60 đến 90', 'Đếm tiếp các số tròn chục lớn', [
          { type: 'story', content: { mascotMood: 'excited', text: '60, 70, 80, 90 và 100! 10 chục là Một trăm (100)! 💯' } },
          { type: 'quiz', content: { question: 'Số liền sau của 80 trong dãy tròn chục là:', options: [70, 81, 90, 100], answer: 90, mascotHint: '80 rồi đến 90.' } },
          { type: 'summary', content: { title: 'Tròn chục lớn:', points: ['60, 70, 80, 90, 100'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l3', 'Bài 3: Cộng trừ các số tròn chục', 'Tính nhẩm nhanh như số đơn vị', [
          { type: 'story', content: { mascotMood: 'happy', text: '20 + 30: Nghĩ là 2 chục + 3 chục = 5 chục (50)! Quá nhanh! ⚡' } },
          { type: 'quiz', content: { question: 'Tính: 50 + 20 = ?', options: [60, 70, 80, 30], answer: 70, mascotHint: '5 chục + 2 chục = 7 chục (70).' } },
          { type: 'summary', content: { title: 'Cộng trừ tròn chục:', points: ['30 + 40 = 70', '80 - 30 = 50'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l4', 'Bài 4: Đếm các số từ 21 đến 40', 'Ghép chục với các đơn vị lẻ', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Hai mươi mốt (21), hai mươi hai (22)... ba mươi lăm (35)... 🌟' } },
          { type: 'quiz', content: { question: 'Số gồm 3 chục và 7 đơn vị là số mấy?', options: [37, 73, 307, 30], answer: 37, mascotHint: '3 chục và 7 đơn vị = 37.' } },
          { type: 'summary', content: { title: 'Đọc số đúng:', points: ['21: hai mươi mốt', '24: hai mươi tư'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l5', 'Bài 5: Đếm các số từ 41 đến 70', 'Mở rộng dãy số đến 70', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 45 đọc là Bốn mươi lăm. Số 60 đọc là Sáu mươi! 🎈' } },
          { type: 'quiz', content: { question: 'Số gồm 5 chục và 5 đơn vị viết là:', options: [50, 55, 505, 15], answer: 55, mascotHint: 'Năm mươi lăm là 55.' } },
          { type: 'summary', content: { title: 'Các số 41-70:', points: ['Nắm chắc hàng chục và hàng đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l6', 'Bài 6: Đếm các số từ 71 đến 100', 'Chạm mốc 100 điểm', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Chín mươi chín (99) rồi đến Một trăm (100)! 100 là số có 3 chữ số! 🏆' } },
          { type: 'quiz', content: { question: 'Số liền trước của 100 là số nào?', options: [90, 98, 99, 101], answer: 99, mascotHint: '100 bớt 1 là 99!' } },
          { type: 'summary', content: { title: 'Số 100:', points: ['99 rồi đến 100'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l7', 'Bài 7: Chục và Đơn vị của số có hai chữ số', 'Phân tích cấu tạo số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 84 = 80 + 4 (8 chục và 4 đơn vị). 💡' } },
          { type: 'quiz', content: { question: 'Số 62 gồm mấy chục và mấy đơn vị?', options: ['6 chục và 2 đơn vị', '2 chục và 6 đơn vị', '60 chục và 2 đơn vị'], answer: '6 chục và 2 đơn vị', mascotHint: 'Chữ số đầu là chục, chữ số sau là đơn vị.' } },
          { type: 'summary', content: { title: 'Cấu tạo số:', points: ['Hàng chục viết trước, hàng đơn vị viết sau'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l8', 'Bài 8: So sánh các số có hai chữ số', 'So sánh hàng chục trước', [
          { type: 'story', content: { mascotMood: 'happy', text: 'So sánh hàng chục trước: 52 > 48 vì 5 chục lớn hơn 4 chục! Nếu hàng chục bằng nhau thì so hàng đơn vị: 67 > 63! ⚖️' } },
          { type: 'quiz', content: { question: 'Điền dấu thích hợp: 74 ... 78', options: ['>', '<', '='], answer: '<', mascotHint: 'Cùng có 7 chục, 4 < 8 nên 74 < 78.' } },
          { type: 'summary', content: { title: 'Quy tắc so sánh:', points: ['1. So sánh hàng chục', '2. So sánh hàng đơn vị nếu hàng chục bằng nhau'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l9', 'Bài 9: Bảng các số từ 1 đến 100', 'Khám phá bảng 100 ô vuông', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Mỗi hàng trong bảng trăm có đúng 10 số. Đi xuống 1 hàng là tăng thêm 10 đơn vị! 🗺️' } },
          { type: 'quiz', content: { question: 'Trong bảng số, số nằm ngay dưới số 35 là số nào?', options: [36, 45, 25, 40], answer: 45, mascotHint: '35 thêm 1 chục là 45!' } },
          { type: 'summary', content: { title: 'Bảng trăm:', points: ['Cách đếm nhẩm cộng trừ 10 cực nhanh'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l10', 'Bài 10: Luyện tập tổng hợp số đến 100', 'Hoàn thành Chương 5', [
          { type: 'story', content: { mascotMood: 'proud', text: 'Cùng làm bài tập số đến 100 nào! 🌟' } },
          { type: 'quiz', content: { question: 'Số lớn nhất có hai chữ số là số nào?', options: [90, 98, 99, 100], answer: 99, mascotHint: '99 là số lớn nhất có 2 chữ số!' } },
          { type: 'summary', content: { title: 'Rất vững vàng!', points: ['Bé đã đọc, viết và so sánh thành thạo các số đến 100!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l11', 'Bài 11: Đếm xuôi và đếm lùi trên bảng 100 số', 'Làm chủ ma trận bảng số từ 1 đến 100', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Trên bảng 100 số, đi sang phải là thêm 1, đi xuống dưới là thêm 1 chục (10)! Thật kỳ diệu! 🗺️' } },
          { type: 'quiz', content: { question: 'Số nằm ngay dưới số 35 trên bảng 100 là số nào?', options: [36, 45, 25, 40], answer: 45, mascotHint: 'Đi xuống 1 hàng là thêm 10: 35 + 10 = 45!' } },
          { type: 'summary', content: { title: 'Quy luật bảng 100:', points: ['Hàng ngang hơn kém 1, cột dọc hơn kém 10'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c5-l12', 'Bài 12: Trò chơi ghép thẻ Chục và Đơn vị', 'Rèn luyện phản xạ cấu tạo số', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Ghép thẻ 8 chục và 7 đơn vị ta được số 87! Ghép thẻ 9 chục và 9 đơn vị ta được 99! 🎴' } },
          { type: 'quiz', content: { question: 'Số gồm 6 chục và 4 đơn vị viết là:', options: [46, 64, 604, 10], answer: 64, mascotHint: 'Chữ số 6 ở hàng chục, 4 ở hàng đơn vị: 64!' } },
          { type: 'summary', content: { title: 'Vững vàng Chương 5:', points: ['Bé nắm chắc toàn bộ 100 số tự nhiên đầu tiên!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 6: HÌNH HỌC & ĐO LƯỜNG (10 bài)
    // ----------------------------------------------------
    {
      id: 'g1-c6',
      name: 'Chương 6: Hình học & Đo lường',
      description: 'Nhận biết hình phẳng, đo cm và xem đồng hồ',
      icon: '📐',
      color: '#4ECDC4',
      totalLessons: 12,
      lessons: [
        makeLesson('g1-c6-l1', 'Bài 1: Nhận biết Hình tròn', 'Hình không có góc cạnh', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Mặt trời, đồng hồ tròn, chiếc đĩa... đều có dạng hình tròn! ☀️' } },
          { type: 'quiz', content: { question: 'Vật nào sau đây có dạng hình tròn?', options: ['Bánh xe đạp', 'Chiếc bảng lớp', 'Hộp sữa'], answer: 'Bánh xe đạp', mascotHint: 'Bánh xe tròn lăn được!' } },
          { type: 'summary', content: { title: 'Hình tròn:', points: ['Đường cong tròn khép kín, không có góc'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l2', 'Bài 2: Nhận biết Hình vuông', 'Hình có 4 cạnh bằng nhau', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chiếc bánh chưng, viên gạch hoa, chiếc khăn tay vuông vắn... 🔲' } },
          { type: 'quiz', content: { question: 'Hình vuông có mấy cạnh?', options: [3, 4, 5, 6], answer: 4, mascotHint: 'Có đúng 4 cạnh bằng nhau!' } },
          { type: 'summary', content: { title: 'Hình vuông:', points: ['4 cạnh bằng nhau và 4 góc vuông'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l3', 'Bài 3: Nhận biết Hình tam giác', 'Hình có đúng 3 cạnh và 3 góc', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Cánh buồm thuyền ⛵, mái nhà 🏠, miếng pizza cắt lát 🍕 có dạng hình tam giác!' } },
          { type: 'quiz', content: { question: 'Hình nào có 3 đỉnh và 3 cạnh?', options: ['Hình vuông', 'Hình tròn', 'Hình tam giác'], answer: 'Hình tam giác', mascotHint: 'Tam có nghĩa là 3!' } },
          { type: 'summary', content: { title: 'Hình tam giác:', points: ['3 cạnh và 3 đỉnh'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l4', 'Bài 4: Nhận biết Hình chữ nhật', 'Có 2 cạnh dài và 2 cạnh ngắn', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Màn hình tivi, quyển vở học sinh, cánh cửa ra vào... đều là hình chữ nhật! 🚪' } },
          { type: 'quiz', content: { question: 'Quyển sách toán của bé có dạng hình gì?', options: ['Hình tròn', 'Hình chữ nhật', 'Hình tam giác'], answer: 'Hình chữ nhật', mascotHint: 'Có cạnh dài và cạnh ngắn!' } },
          { type: 'summary', content: { title: 'Hình chữ nhật:', points: ['4 cạnh: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l5', 'Bài 5: Khối lập phương và khối hộp chữ nhật', 'Làm quen các khối hình không gian', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Con xúc xắc 🎲 là khối lập phương, hộp sữa tươi 🧃 là khối hộp chữ nhật! 📦' } },
          { type: 'quiz', content: { question: 'Viên xúc xắc (xí ngầu) có dạng khối gì?', options: ['Khối lập phương', 'Khối cầu', 'Khối trụ'], answer: 'Khối lập phương', mascotHint: 'Khối lập phương có các mặt đều là hình vuông!' } },
          { type: 'summary', content: { title: 'Khối không gian:', points: ['Khối lập phương', 'Khối hộp chữ nhật'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l6', 'Bài 6: Đo độ dài bằng gang tay và bước chân', 'Đo đạc tự nhiên thuở xưa', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chiếc bàn dài khoảng 5 gang tay của bé. Hành lang dài 20 bước chân! 🖐️👣' } },
          { type: 'quiz', content: { question: 'Một gang tay đo khoảng cách từ ngón nào đến ngón nào?', options: ['Ngón cái đến ngón út', 'Ngón trỏ đến ngón giữa', 'Hai ngón cái'], answer: 'Ngón cái đến ngón út', mascotHint: 'Xòe bàn tay rộng hết cỡ!' } },
          { type: 'summary', content: { title: 'Đo tự nhiên:', points: ['Gang tay, bước chân là đơn vị đo ước lượng'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l7', 'Bài 7: Xăng-ti-mét (cm) và thước đo', 'Đơn vị đo độ dài chuẩn xác', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Xăng-ti-mét viết tắt là cm. Thước kẻ có các vạch chia từ 0 cm, 1 cm, 2 cm... 📏' } },
          { type: 'quiz', content: { question: 'Xăng-ti-mét được viết tắt là gì?', options: ['mm', 'cm', 'dm', 'm'], answer: 'cm', mascotHint: 'Viết tắt là chữ c và chữ m!' } },
          { type: 'summary', content: { title: 'Đơn vị cm:', points: ['Dùng đo độ dài các vật nhỏ'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l8', 'Bài 8: Thực hành dùng thước kẻ đo cm', 'Đặt vật thẳng vạch số 0', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Đặt một đầu bút chì thẳng vạch số 0, đầu kia chỉ số 12. Bút chì dài 12 cm! ✏️' } },
          { type: 'quiz', content: { question: 'Đoạn thẳng bắt đầu từ vạch 0 và kết thúc ở vạch số 8 thì dài mấy cm?', options: ['7 cm', '8 cm', '9 cm', '10 cm'], answer: '8 cm', mascotHint: 'Dài đúng 8 cm!' } },
          { type: 'summary', content: { title: 'Cách đo:', points: ['Luôn đặt một đầu vật trùng vạch số 0'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l9', 'Bài 9: Xem đồng hồ: Giờ đúng', 'Nhận biết giờ sinh hoạt hàng ngày', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Kim ngắn chỉ giờ, kim dài chỉ phút. Khi kim dài chỉ số 12, kim ngắn chỉ số 7 là đúng 7 giờ sáng đi học! ⏰' } },
          { type: 'quiz', content: { question: 'Kim dài chỉ số 12, kim ngắn chỉ số 9. Là mấy giờ?', options: ['9 giờ', '12 giờ', '3 giờ', '9 giờ 30'], answer: '9 giờ', mascotHint: 'Đúng 9 giờ!' } },
          { type: 'summary', content: { title: 'Xem giờ đúng:', points: ['Kim dài ở số 12: giờ đúng'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l10', 'Bài 10: Các ngày trong tuần và xem lịch', 'Thứ Hai đến Chủ Nhật', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Một tuần có 7 ngày: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật! 📅' } },
          { type: 'quiz', content: { question: 'Một tuần lễ có bao nhiêu ngày?', options: [5, 6, 7, 8], answer: 7, mascotHint: 'Có đúng 7 ngày bé nhé!' } },
          { type: 'summary', content: { title: 'Xem lịch thành thạo:', points: ['Thuộc 7 ngày trong tuần từ Thứ 2 đến CN'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l11', 'Bài 11: Vị trí không gian: Trước - Sau, Trên - Dưới, Trái - Phải', 'Định hướng không gian quanh em', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Cuốn sách nằm TRÊN bàn 📚, đôi dép nằm DƯỚI gầm bàn 🥿. Chú cún đứng TRƯỚC cửa 🐶, bạn mèo nấp SAU rèm 🐱!' } },
          { type: 'quiz', content: { question: 'Mặt trời mọc ở TRÊN cao hay DƯỚI đất?', options: ['Ở trên cao ☀️', 'Ở dưới đất 🌍'], answer: 'Ở trên cao ☀️', mascotHint: 'Ngước mắt nhìn lên bầu trời là thấy ông mặt trời!' } },
          { type: 'summary', content: { title: 'Định hướng không gian:', points: ['Trên - Dưới, Trước - Sau, Trái - Phải'], mascotMood: 'proud' } },
        ]),
        makeLesson('g1-c6-l12', 'Bài 12: Xếp hình sáng tạo từ các hình phẳng', 'Ghép ô tô, ngôi nhà, thuyền buồm', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Dùng 1 hình chữ nhật và 2 hình tròn làm ô tô 🚗! Dùng 1 hình tam giác và 1 hình vuông làm ngôi nhà 🏠! 🎨' } },
          { type: 'quiz', content: { question: 'Mái nhà thường được ghép từ hình nào?', options: ['Hình tam giác', 'Hình tròn', 'Hình bầu dục'], answer: 'Hình tam giác', mascotHint: 'Hình tam giác nhọn ở đỉnh!' } },
          { type: 'summary', content: { title: 'Hoàn thành trọn vẹn Lớp 1!', points: ['Bé đã chinh phục toàn bộ 72 bài học Toán Lớp 1 xuất sắc! 🎉🏆'], mascotMood: 'celebrate' } },
        ]),
      ],
    },
  ],
}
