// Data for Grade 2 (Lớp 2) - 7 Chapters, at least 10 lessons each (70 lessons total)
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

export const grade2Data = {
  id: 2,
  name: 'Lớp 2',
  description: 'Số đến 1000, phép cộng trừ có nhớ, bảng nhân & chia 2, 3, 4, 5',
  icon: '🌿',
  color: '#51CF66',
  ageRange: '7-8 tuổi',
  chapters: [
    // ----------------------------------------------------
    // CHƯƠNG 1: ÔN TẬP & BỔ SUNG (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c1',
      name: 'Chương 1: Ôn tập & Bổ sung',
      description: 'Ôn tập số học lớp 1, tia số, cộng trừ không nhớ trong phạm vi 100',
      icon: '🔄',
      color: '#4facfe',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c1-l1', 'Bài 1: Ôn tập các số đến 100', 'Đọc, viết, so sánh số có 2 chữ số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chào mừng bé lên Lớp 2! Cùng ôn lại các số đến 100 nhé! 🚀' } },
          { type: 'quiz', content: { question: 'Số liền sau của 69 là số nào?', options: [68, 70, 71, 79], answer: 70, mascotHint: '69 thêm 1 là 70!' } },
          { type: 'summary', content: { title: 'Bé nhớ rất tốt:', points: ['Số có hai chữ số gồm hàng chục và hàng đơn vị.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l2', 'Bài 2: Tia số và số liền trước, liền sau', 'Xác định vị trí trên tia số', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số liền trước bé hơn 1 đơn vị, số liền sau lớn hơn 1 đơn vị. 📏' } },
          { type: 'quiz', content: { question: 'Số liền trước của 80 là số nào?', options: [78, 79, 81, 82], answer: 79, mascotHint: '80 bớt 1 còn 79.' } },
          { type: 'summary', content: { title: 'Tia số:', points: ['Số bên phải lớn hơn số bên trái.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l3', 'Bài 3: Phép cộng không nhớ dạng 32 + 14', 'Cộng hàng đơn vị với đơn vị, chục với chục', [
          { type: 'story', content: { mascotMood: 'happy', text: '32 + 14: 2 + 4 = 6, 3 + 1 = 4. Kết quả là 46! 💡' } },
          { type: 'quiz', content: { question: 'Tính: 43 + 25 = ?', options: [67, 68, 69, 58], answer: 68, mascotHint: '3 + 5 = 8; 4 + 2 = 6.' } },
          { type: 'summary', content: { title: 'Cộng không nhớ:', points: ['43 + 25 = 68'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l4', 'Bài 4: Phép trừ không nhớ dạng 57 - 23', 'Trừ thẳng hàng dọc', [
          { type: 'story', content: { mascotMood: 'happy', text: '57 - 23: 7 - 3 = 4, 5 - 2 = 3. Kết quả là 34! 🍎' } },
          { type: 'quiz', content: { question: 'Tính: 78 - 36 = ?', options: [41, 42, 43, 52], answer: 42, mascotHint: '8 - 6 = 2; 7 - 3 = 4.' } },
          { type: 'summary', content: { title: 'Trừ không nhớ:', points: ['78 - 36 = 42'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l5', 'Bài 5: Cộng trừ các số tròn chục', 'Tính nhẩm siêu tốc', [
          { type: 'story', content: { mascotMood: 'excited', text: '40 + 30 = 70. 90 - 50 = 40! ⚡' } },
          { type: 'quiz', content: { question: 'Tính nhẩm: 60 + 30 - 20 = ?', options: [60, 70, 80, 90], answer: 70, mascotHint: '60 + 30 = 90; 90 - 20 = 70.' } },
          { type: 'summary', content: { title: 'Tính nhẩm:', points: ['Cộng trừ số chục rất tiện lợi.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l6', 'Bài 6: Điểm và Đoạn thẳng', 'Làm quen các yếu tố hình học cơ bản', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Nối điểm A với điểm B bằng thước kẻ ta được đoạn thẳng AB! 📏' } },
          { type: 'quiz', content: { question: 'Đoạn thẳng MN được giới hạn bởi mấy điểm?', options: [1, 2, 3, 4], answer: 2, mascotHint: 'Giới hạn bởi hai điểm M và N!' } },
          { type: 'summary', content: { title: 'Đoạn thẳng:', points: ['Nối hai điểm bằng một đường thẳng.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l7', 'Bài 7: Ba điểm thẳng hàng', 'Cùng nằm trên một đường thẳng', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Khi dùng thước đặt đi qua cả 3 điểm thì 3 điểm đó thẳng hàng! 🎯' } },
          { type: 'quiz', content: { question: 'Ba điểm thẳng hàng là ba điểm như thế nào?', options: ['Cùng nằm trên một đường thẳng', 'Tạo thành hình tam giác', 'Tạo thành hình vuông'], answer: 'Cùng nằm trên một đường thẳng', mascotHint: 'Thẳng hàng là cùng thuộc 1 đường thẳng.' } },
          { type: 'summary', content: { title: 'Thẳng hàng:', points: ['3 điểm cùng nằm trên 1 đường thẳng.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l8', 'Bài 8: Đề-xi-mét (dm) — Đơn vị đo độ dài mới', '1 dm = 10 cm', [
          { type: 'story', content: { mascotMood: 'excited', text: '10 cm gom lại gọi là 1 đề-xi-mét (1 dm)! Thước kẻ 20 cm dài đúng 2 dm! 📏' } },
          { type: 'quiz', content: { question: '1 dm bằng bao nhiêu cm?', options: [1, 10, 100, 1000], answer: 10, mascotHint: '1 dm = 10 cm!' } },
          { type: 'summary', content: { title: 'Quy đổi:', points: ['1 dm = 10 cm', '10 cm = 1 dm'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l9', 'Bài 9: Bài toán về nhiều hơn', 'Tìm đại lượng lớn hơn', [
          { type: 'story', content: { mascotMood: 'happy', text: 'An có 15 cái kẹo, Bình có nhiều hơn An 4 cái kẹo. Bình có: 15 + 4 = 19 cái kẹo! 🍬' } },
          { type: 'quiz', content: { question: 'Mai có 20 bông hoa, Lan có nhiều hơn Mai 5 bông hoa. Hỏi Lan có bao nhiêu bông hoa?', options: [15, 20, 25, 30], answer: 25, mascotHint: 'Nhiều hơn thì lấy số của Mai cộng thêm 5!' } },
          { type: 'summary', content: { title: 'Nhiều hơn:', points: ['Lấy số bé cộng phần nhiều hơn để tìm số lớn.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l10', 'Bài 10: Bài toán về ít hơn', 'Tìm đại lượng nhỏ hơn', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Hòa có 18 viên bi, Nam có ít hơn Hòa 6 viên bi. Nam có: 18 - 6 = 12 viên bi! 🔮' } },
          { type: 'quiz', content: { question: 'Lớp 2A trồng được 35 cây, lớp 2B trồng ít hơn lớp 2A là 5 cây. Lớp 2B trồng được:', options: [30, 35, 40, 45], answer: 30, mascotHint: 'Ít hơn thì làm phép tính trừ: 35 - 5 = 30!' } },
          { type: 'summary', content: { title: 'Ít hơn:', points: ['Lấy số lớn trừ phần ít hơn để tìm số bé.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l11', 'Bài 11: Tìm thành phần chưa biết: Số hạng trong một tổng', 'Biết tổng và một số hạng', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết! Ví dụ: x + 12 = 30 -> x = 30 - 12 = 18! 💡' } },
          { type: 'quiz', content: { question: 'Tìm x biết: x + 15 = 45', options: [20, 25, 30, 35], answer: 30, mascotHint: 'Lấy 45 - 15 = 30!' } },
          { type: 'summary', content: { title: 'Quy tắc tìm số hạng:', points: ['Số hạng = Tổng - Số hạng đã biết'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c1-l12', 'Bài 12: Thực hành vẽ đoạn thẳng có độ dài cho trước', 'Dùng thước kẻ và bút chì chuẩn xác', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Chấm điểm A tại vạch 0 cm, chấm điểm B tại vạch 8 cm rồi nối lại, ta có đoạn thẳng AB dài đúng 8 cm! 📏' } },
          { type: 'quiz', content: { question: 'Để vẽ đoạn thẳng dài 1 dm, ta chấm điểm thứ hai ở vạch bao nhiêu cm?', options: ['1 cm', '10 cm', '100 cm', '20 cm'], answer: '10 cm', mascotHint: '1 dm chính là 10 cm!' } },
          { type: 'summary', content: { title: 'Kỹ năng vẽ hình:', points: ['Luôn bắt đầu từ vạch 0 cm của thước'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 2: PHÉP CỘNG TRỪ CÓ NHỚ PHẠM VI 100 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c2',
      name: 'Chương 2: Phép cộng trừ có nhớ trong phạm vi 100',
      description: 'Cộng có nhớ và trừ có mượn trong phạm vi 100',
      icon: '🧮',
      color: '#FF6B6B',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c2-l1', 'Bài 1: Phép cộng dạng 9 + 5 và 29 + 5', 'Cộng hàng đơn vị qua 10', [
          { type: 'story', content: { mascotMood: 'happy', text: '29 + 5: 9 + 5 = 14 (viết 4 nhớ 1), 2 thêm 1 là 3. Được 34! 💡' } },
          { type: 'quiz', content: { question: 'Tính: 39 + 7 = ?', options: [44, 45, 46, 47], answer: 46, mascotHint: '9 + 7 = 16 (viết 6 nhớ 1); 3 + 1 = 4.' } },
          { type: 'summary', content: { title: 'Cộng có nhớ:', points: ['Cộng hàng đơn vị trước rồi nhớ 1 sang hàng chục.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l2', 'Bài 2: Phép cộng dạng 8 + 5 và 38 + 25', 'Cộng hai số có hai chữ số có nhớ', [
          { type: 'story', content: { mascotMood: 'excited', text: '38 + 25: 8 + 5 = 13 (viết 3 nhớ 1), 3 + 2 = 5, thêm 1 bằng 6. Kết quả là 63! 🌟' } },
          { type: 'quiz', content: { question: 'Tính: 48 + 27 = ?', options: [65, 75, 74, 85], answer: 75, mascotHint: '8 + 7 = 15 (viết 5 nhớ 1); 4 + 2 = 6 thêm 1 là 7.' } },
          { type: 'summary', content: { title: 'Quy tắc:', points: ['Đặt tính thẳng cột, cộng từ phải sang trái.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l3', 'Bài 3: Phép cộng dạng 7 + 5 và 47 + 18', 'Luyện tập cộng nhớ 1', [
          { type: 'story', content: { mascotMood: 'happy', text: '47 + 18: 7 + 8 = 15 (viết 5 nhớ 1), 4 + 1 = 5, thêm 1 là 65! 🎯' } },
          { type: 'quiz', content: { question: 'Tính: 37 + 29 = ?', options: [56, 66, 67, 76], answer: 66, mascotHint: '7 + 9 = 16 (viết 6 nhớ 1); 3 + 2 = 5 thêm 1 là 6.' } },
          { type: 'summary', content: { title: 'Cộng nhanh:', points: ['37 + 29 = 66'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l4', 'Bài 4: Phép cộng dạng 6 + 5 và 56 + 36', 'Cộng hàng đơn vị 6 và các số', [
          { type: 'story', content: { mascotMood: 'happy', text: '56 + 36: 6 + 6 = 12 (viết 2 nhớ 1), 5 + 3 = 8 thêm 1 bằng 9. Được 92! 🦉' } },
          { type: 'quiz', content: { question: 'Tính: 46 + 38 = ?', options: [74, 84, 82, 85], answer: 84, mascotHint: '6 + 8 = 14 (viết 4 nhớ 1); 4 + 3 = 7 thêm 1 là 8.' } },
          { type: 'summary', content: { title: 'Thành thạo phép cộng:', points: ['Cộng có nhớ trong phạm vi 100 thật dễ!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l5', 'Bài 5: Phép cộng có tổng là số tròn trăm (100)', 'Chạm mốc 100', [
          { type: 'story', content: { mascotMood: 'excited', text: '83 + 17: 3 + 7 = 10 (viết 0 nhớ 1), 8 + 1 = 9 thêm 1 là 10. Kết quả là 100! 💯' } },
          { type: 'quiz', content: { question: 'Tính: 65 + 35 = ?', options: [90, 95, 100, 105], answer: 100, mascotHint: '5 + 5 = 10; 6 + 3 = 9 thêm 1 là 10.' } },
          { type: 'summary', content: { title: 'Tổng bằng 100:', points: ['65 + 35 = 100', '72 + 28 = 100'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l6', 'Bài 6: Phép trừ dạng 11 - 5 và 51 - 15', 'Mượn 1 chục ở hàng trước', [
          { type: 'story', content: { mascotMood: 'happy', text: '51 - 15: 1 không trừ được 5, mượn 1 chục thành 11 - 5 = 6. 5 bớt 1 còn 4, 4 - 1 = 3. Được 36! 💡' } },
          { type: 'quiz', content: { question: 'Tính: 41 - 18 = ?', options: [22, 23, 24, 33], answer: 23, mascotHint: '11 - 8 = 3; 4 bớt 1 còn 3, 3 - 1 = 2.' } },
          { type: 'summary', content: { title: 'Trừ có nhớ:', points: ['Mượn 1 chục ở hàng chục và nhớ trả khi trừ.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l7', 'Bài 7: Phép trừ dạng 12 - 7 và 62 - 27', 'Mượn 1 chục với chữ số 2', [
          { type: 'story', content: { mascotMood: 'happy', text: '62 - 27: 12 - 7 = 5. 6 bớt 1 còn 5, 5 - 2 = 3. Được 35! 🍬' } },
          { type: 'quiz', content: { question: 'Tính: 52 - 28 = ?', options: [24, 25, 34, 35], answer: 24, mascotHint: '12 - 8 = 4; 5 bớt 1 còn 4, 4 - 2 = 2.' } },
          { type: 'summary', content: { title: 'Trừ có nhớ:', points: ['52 - 28 = 24'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l8', 'Bài 8: Phép trừ dạng 13 - 8 và 73 - 38', 'Luyện tập trừ có mượn', [
          { type: 'story', content: { mascotMood: 'happy', text: '73 - 38: 13 - 8 = 5. 7 bớt 1 còn 6, 6 - 3 = 3. Được 35! 🌟' } },
          { type: 'quiz', content: { question: 'Tính: 83 - 47 = ?', options: [35, 36, 46, 47], answer: 36, mascotHint: '13 - 7 = 6; 8 bớt 1 còn 7, 7 - 4 = 3.' } },
          { type: 'summary', content: { title: 'Trừ có mượn:', points: ['83 - 47 = 36'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l9', 'Bài 9: Phép trừ số tròn chục (100 trừ đi một số)', '100 - 36', [
          { type: 'story', content: { mascotMood: 'excited', text: '100 - 36: 0 không trừ được 6 mượn 10 - 6 = 4. 0 bớt 1 (thành 9), 9 - 3 = 6. Được 64! 💯' } },
          { type: 'quiz', content: { question: 'Tính: 100 - 45 = ?', options: [45, 55, 65, 50], answer: 55, mascotHint: '10 - 5 = 5; 9 - 4 = 5.' } },
          { type: 'summary', content: { title: '100 trừ một số:', points: ['100 - 45 = 55', '100 - 20 = 80'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l10', 'Bài 10: Luyện tập chung phép cộng trừ có nhớ', 'Tổng kết Chương 2', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Bé đã chinh phục xuất sắc chương phép tính khó nhất lớp 2! 🏆' } },
          { type: 'quiz', content: { question: 'Tính: 48 + 36 - 15 = ?', options: [69, 70, 71, 79], answer: 69, mascotHint: '48 + 36 = 84; 84 - 15 = 69!' } },
          { type: 'summary', content: { title: 'Chúc mừng bé!', points: ['Bé đặt tính cột dọc cực kỳ chuẩn xác!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c2-l11', 'Bài 11: Phép trừ có số bị trừ tròn chục', 'Các phép trừ dạng 40 - 18, 70 - 35', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Khi tính 50 - 24: 0 không trừ được 4, mượn 1 chục được 10 - 4 = 6; 5 bớt 1 còn 4, 4 - 2 = 2. Kết quả là 26! 🎯' } },
          { type: 'quiz', content: { question: 'Tính: 60 - 27 = ?', options: [33, 43, 37, 23], answer: 33, mascotHint: '10 - 7 = 3; 5 - 2 = 3. Là 33!' } },
          { type: 'summary', content: { title: 'Mẹo trừ số tròn chục:', points: ['Mượn 1 chục ở hàng chục, nhớ trả 1'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c2-l12', 'Bài 12: Đặt tính thẳng cột: Tuyệt chiêu không quên nhớ', 'Rèn luyện thói quen viết sạch đẹp', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Đơn vị thẳng đơn vị, chục thẳng chục. Viết dấu chấm nhớ nhỏ xíu ở hàng chục để không bao giờ quên nhé bé! ✍️' } },
          { type: 'quiz', content: { question: 'Tính: 48 + 37 = ?', options: [75, 85, 84, 95], answer: 85, mascotHint: '8 + 7 = 15 nhớ 1; 4 + 3 + 1 = 8!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 2:', points: ['Bé cộng trừ có nhớ siêu nhanh và chính xác!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 3: BẢNG NHÂN 2, 3, 4, 5 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c3',
      name: 'Chương 3: Bảng nhân 2, 3, 4, 5',
      description: 'Ý nghĩa phép nhân và học thuộc bảng nhân 2, 3, 4, 5',
      icon: '✖️',
      color: '#FFE66D',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c3-l1', 'Bài 1: Làm quen với phép nhân', 'Phép nhân là tổng các số hạng bằng nhau', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 4 đĩa táo, mỗi đĩa có 2 quả. Viết 2 + 2 + 2 + 2 = 2 × 4 = 8 quả! 🍎' } },
          { type: 'quiz', content: { question: 'Tổng 3 + 3 + 3 + 3 + 3 được viết thành phép nhân nào?', options: ['3 × 4', '3 × 5', '5 × 3', '3 + 5'], answer: '3 × 5', mascotHint: 'Có 5 số 3 cộng lại với nhau!' } },
          { type: 'summary', content: { title: 'Ý nghĩa phép nhân:', points: ['a × b = a lấy b lần'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l2', 'Bài 2: Thừa số và Tích', 'Tên gọi các thành phần trong phép nhân', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Trong phép nhân 2 × 5 = 10: 2 là thừa số, 5 là thừa số, 10 là tích! 💡' } },
          { type: 'quiz', content: { question: 'Trong phép tính 4 × 3 = 12, số 12 được gọi là gì?', options: ['Thừa số', 'Tích', 'Tổng', 'Hiệu'], answer: 'Tích', mascotHint: 'Kết quả của phép nhân gọi là Tích!' } },
          { type: 'summary', content: { title: 'Thành phần:', points: ['Thừa số × Thừa số = Tích'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l3', 'Bài 3: Bảng nhân 2 (Phần 1: từ 2×1 đến 2×5)', 'Mỗi bước cộng thêm 2', [
          { type: 'story', content: { mascotMood: 'excited', text: '2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, 2 × 4 = 8, 2 × 5 = 10! ✌️' } },
          { type: 'quiz', content: { question: 'Tính: 2 × 4 = ?', options: [6, 8, 10, 12], answer: 8, mascotHint: 'Hai lần bốn là tám!' } },
          { type: 'summary', content: { title: 'Bảng nhân 2:', points: ['2, 4, 6, 8, 10'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l4', 'Bài 4: Bảng nhân 2 (Phần 2: từ 2×6 đến 2×10)', 'Hoàn thành bảng nhân 2', [
          { type: 'story', content: { mascotMood: 'happy', text: '2 × 6 = 12, 2 × 7 = 14, 2 × 8 = 16, 2 × 9 = 18, 2 × 10 = 20! 🚀' } },
          { type: 'quiz', content: { question: 'Tính: 2 × 8 = ?', options: [14, 16, 18, 20], answer: 16, mascotHint: '2 × 8 = 16' } },
          { type: 'summary', content: { title: 'Bảng nhân 2:', points: ['Bé đã thuộc trọn vẹn bảng nhân 2!'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l5', 'Bài 5: Bảng nhân 5 (Phần 1: từ 5×1 đến 5×5)', 'Tận cùng luôn là 0 hoặc 5', [
          { type: 'story', content: { mascotMood: 'excited', text: '5, 10, 15, 20, 25! Giống như đếm các ngón tay! 🖐️' } },
          { type: 'quiz', content: { question: 'Tính: 5 × 3 = ?', options: [10, 15, 20, 25], answer: 15, mascotHint: '5, 10, 15!' } },
          { type: 'summary', content: { title: 'Bảng nhân 5:', points: ['5 × 1 = 5', '5 × 5 = 25'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l6', 'Bài 6: Bảng nhân 5 (Phần 2: từ 5×6 đến 5×10)', 'Hoàn thành bảng nhân 5', [
          { type: 'story', content: { mascotMood: 'happy', text: '5 × 6 = 30, 5 × 7 = 35, 5 × 8 = 40, 5 × 9 = 45, 5 × 10 = 50! 🌟' } },
          { type: 'quiz', content: { question: 'Tính: 5 × 8 = ?', options: [35, 40, 45, 50], answer: 40, mascotHint: '5 × 8 = 40' } },
          { type: 'summary', content: { title: 'Bảng nhân 5:', points: ['Kết quả luôn có số tận cùng là 0 hoặc 5.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l7', 'Bài 7: Bảng nhân 3', 'Mỗi bước cộng thêm 3 đơn vị', [
          { type: 'story', content: { mascotMood: 'happy', text: '3, 6, 9, 12, 15, 18, 21, 24, 27, 30! Một chiếc xe ba bánh có 3 bánh xe! 🛺' } },
          { type: 'quiz', content: { question: 'Tính: 3 × 6 = ?', options: [15, 18, 21, 24], answer: 18, mascotHint: 'Ba lần sáu mười tám!' } },
          { type: 'summary', content: { title: 'Bảng nhân 3:', points: ['3 × 4 = 12', '3 × 7 = 21', '3 × 9 = 27'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l8', 'Bài 8: Bảng nhân 4', 'Đếm chân các con vật 4 chân', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chú bò có 4 chân 🐄. 4 × 1 = 4, 4 × 2 = 8, 4 × 3 = 12, 4 × 4 = 16, 4 × 5 = 20... 🐾' } },
          { type: 'quiz', content: { question: 'Tính: 4 × 7 = ?', options: [24, 28, 32, 36], answer: 28, mascotHint: '4 × 7 = 28' } },
          { type: 'summary', content: { title: 'Bảng nhân 4:', points: ['4 × 6 = 24', '4 × 8 = 32', '4 × 9 = 36'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l9', 'Bài 9: Nhân với số 1 và số 0', 'Quy tắc đặc biệt của phép nhân', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Bất kỳ số nào nhân với 1 cũng bằng chính nó: a × 1 = a. Bất kỳ số nào nhân với 0 đều bằng 0: a × 0 = 0! 🎯' } },
          { type: 'quiz', content: { question: 'Tính: 5 × 0 = ?', options: [0, 5, 50, 1], answer: 0, mascotHint: 'Nhân với 0 luôn bằng 0!' } },
          { type: 'quiz', content: { question: 'Tính: 7 × 1 = ?', options: [1, 7, 8, 71], answer: 7, mascotHint: 'Nhân với 1 bằng chính nó.' } },
          { type: 'summary', content: { title: 'Nhớ kỹ:', points: ['a × 1 = a', 'a × 0 = 0'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l10', 'Bài 10: Luyện tập tổng hợp các bảng nhân 2, 3, 4, 5', 'Ôn tập xuất sắc', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Chúc mừng bé đã hoàn thành toàn bộ bảng nhân của Lớp 2! 🏆' } },
          { type: 'quiz', content: { question: 'Tính nhẩm: 4 × 5 + 10 = ?', options: [20, 25, 30, 35], answer: 30, mascotHint: '4 × 5 = 20, rồi 20 + 10 = 30!' } },
          { type: 'summary', content: { title: 'Tuyệt vời!', points: ['Bé đã nhớ chắc bảng nhân 2, 3, 4, 5!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c3-l11', 'Bài 11: Đố vui đếm chân con vật bằng phép nhân', 'Gà 2 chân, chó 4 chân', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Có 6 chú thỏ 🐇, mỗi chú thỏ có 4 chân. Cả 6 chú thỏ có: 4 × 6 = 24 cái chân! 🐾' } },
          { type: 'quiz', content: { question: 'Trong sân có 8 con gà. Có tất cả bao nhiêu cái chân gà?', options: [10, 14, 16, 18], answer: 16, mascotHint: 'Mỗi con gà có 2 chân: 2 × 8 = 16!' } },
          { type: 'summary', content: { title: 'Ứng dụng phép nhân:', points: ['Tính số lượng lặp lại cực nhanh'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c3-l12', 'Bài 12: Thử thách tính nhẩm siêu tốc bảng nhân', 'Phản xạ bảng nhân 2, 3, 4, 5', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Bé đã học thuộc làu bảng nhân 2, 3, 4, 5! Cùng bước vào đấu trường tính nhẩm nào! 🚀' } },
          { type: 'quiz', content: { question: 'Tìm tích: 5 × 8 = ?', options: [35, 40, 45, 50], answer: 40, mascotHint: '5 × 8 = 40!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 3:', points: ['Bé nắm chắc toàn bộ bảng nhân 2, 3, 4, 5!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 4: BẢNG CHIA 2, 3, 4, 5 & MỘT PHẦN MẤY (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c4',
      name: 'Chương 4: Bảng chia 2, 3, 4, 5 & Một phần mấy',
      description: 'Làm quen phép chia, bảng chia và phân số một phần mấy',
      icon: '➗',
      color: '#4facfe',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c4-l1', 'Bài 1: Làm quen với phép chia', 'Chia đều đồ vật cho các nhóm', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 6 quả dâu tây chia đều cho 2 bạn. Mỗi bạn được 6 : 2 = 3 quả! 🍓' } },
          { type: 'quiz', content: { question: 'Có 8 cái kẹo chia đều cho 4 bạn. Mỗi bạn được mấy cái kẹo?', options: [2, 3, 4, 1], answer: 2, mascotHint: '8 chia 4 bằng 2!' } },
          { type: 'summary', content: { title: 'Phép chia (:):', points: ['Chia là chia đều thành các phần bằng nhau.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l2', 'Bài 2: Số bị chia, Số chia, Thương', 'Tên gọi các thành phần phép chia', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Trong 12 : 3 = 4: 12 là Số bị chia, 3 là Số chia, 4 là Thương! 💡' } },
          { type: 'quiz', content: { question: 'Trong phép chia 15 : 5 = 3, số 3 được gọi là gì?', options: ['Số bị chia', 'Số chia', 'Thương', 'Tổng'], answer: 'Thương', mascotHint: 'Kết quả phép chia gọi là Thương.' } },
          { type: 'summary', content: { title: 'Thành phần:', points: ['Số bị chia : Số chia = Thương'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l3', 'Bài 3: Bảng chia 2', 'Ngược lại của bảng nhân 2', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Vì 2 × 6 = 12 nên 12 : 2 = 6! Rất dễ nhớ! ⚡' } },
          { type: 'quiz', content: { question: 'Tính: 16 : 2 = ?', options: [6, 7, 8, 9], answer: 8, mascotHint: 'Hỏi 2 nhân mấy bằng 16? 2 × 8 = 16!' } },
          { type: 'summary', content: { title: 'Bảng chia 2:', points: ['10 : 2 = 5', '14 : 2 = 7', '18 : 2 = 9'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l4', 'Bài 4: Một phần hai (1/2)', 'Một nửa chiếc bánh', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chia chiếc bánh pizza làm 2 phần bằng nhau, lấy 1 phần gọi là một phần hai (1/2). 🍕' } },
          { type: 'quiz', content: { question: 'Có 10 quả táo, 1/2 số táo đó là mấy quả?', options: [2, 4, 5, 8], answer: 5, mascotHint: 'Lấy 10 : 2 = 5 quả táo!' } },
          { type: 'summary', content: { title: 'Một phần hai:', points: ['1/2 hay còn gọi là một nửa.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l5', 'Bài 5: Bảng chia 5', 'Phép chia cho 5', [
          { type: 'story', content: { mascotMood: 'happy', text: '25 : 5 = 5, 30 : 5 = 6, 45 : 5 = 9! 🌟' } },
          { type: 'quiz', content: { question: 'Tính: 35 : 5 = ?', options: [5, 6, 7, 8], answer: 7, mascotHint: '5 × 7 = 35 nên 35 : 5 = 7!' } },
          { type: 'summary', content: { title: 'Bảng chia 5:', points: ['20 : 5 = 4', '40 : 5 = 8'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l6', 'Bài 6: Một phần năm (1/5)', 'Chia làm 5 phần bằng nhau', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Một tuần làm việc 5 ngày, 1 ngày là 1/5 tuần làm việc! 📅' } },
          { type: 'quiz', content: { question: 'Một hộp có 20 chiếc bút, 1/5 số bút là bao nhiêu chiếc?', options: [2, 4, 5, 10], answer: 4, mascotHint: '20 : 5 = 4 chiếc bút!' } },
          { type: 'summary', content: { title: 'Một phần năm:', points: ['Lấy tổng số chia cho 5.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l7', 'Bài 7: Bảng chia 3 & Một phần ba (1/3)', 'Phép chia cho 3', [
          { type: 'story', content: { mascotMood: 'happy', text: '12 : 3 = 4, 18 : 3 = 6, 27 : 3 = 9! 1/3 là lấy 1 trong 3 phần bằng nhau. 🍰' } },
          { type: 'quiz', content: { question: 'Tính: 21 : 3 = ?', options: [6, 7, 8, 9], answer: 7, mascotHint: '3 × 7 = 21!' } },
          { type: 'summary', content: { title: 'Bảng chia 3:', points: ['15 : 3 = 5', '24 : 3 = 8'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l8', 'Bài 8: Bảng chia 4 & Một phần tư (1/4)', 'Phép chia cho 4', [
          { type: 'story', content: { mascotMood: 'happy', text: '16 : 4 = 4, 28 : 4 = 7, 36 : 4 = 9! Gấp tư mảnh giấy ta được 1/4 mảnh giấy! 📄' } },
          { type: 'quiz', content: { question: 'Tính: 32 : 4 = ?', options: [6, 7, 8, 9], answer: 8, mascotHint: '4 × 8 = 32!' } },
          { type: 'summary', content: { title: 'Bảng chia 4:', points: ['20 : 4 = 5', '36 : 4 = 9'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l9', 'Bài 9: Tìm một trong các phần bằng nhau của một số', 'Cách tính 1/2, 1/3, 1/4, 1/5', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Muốn tìm 1/3 của 18 bông hoa, ta chỉ việc lấy 18 chia cho 3 = 6 bông hoa! 🌸' } },
          { type: 'quiz', content: { question: 'Tìm 1/4 của 24 viên kẹo:', options: [4, 6, 8, 12], answer: 6, mascotHint: 'Lấy 24 : 4 = 6!' } },
          { type: 'summary', content: { title: 'Quy tắc:', points: ['Muốn tìm 1 phần mấy, lấy số đó chia cho số phần.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l10', 'Bài 10: Luyện tập chung các bảng chia 2, 3, 4, 5', 'Thành thạo phép chia', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Chúc mừng bé đã học thuộc tất cả các bảng chia của Lớp 2! 🏆' } },
          { type: 'quiz', content: { question: 'Tính: 40 : 5 + 12 = ?', options: [18, 20, 22, 24], answer: 20, mascotHint: '40 : 5 = 8; 8 + 12 = 20!' } },
          { type: 'summary', content: { title: 'Xuất sắc!', points: ['Bé tính nhẩm nhân chia siêu nhanh!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c4-l11', 'Bài 11: Tìm thành phần chưa biết trong phép chia', 'Tìm Số bị chia và Số chia', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Muốn tìm Số bị chia, ta lấy Thương nhân với Số chia! Ví dụ: x : 3 = 5 -> x = 5 × 3 = 15! 💡' } },
          { type: 'quiz', content: { question: 'Tìm x biết: x : 4 = 6', options: [20, 24, 28, 10], answer: 24, mascotHint: 'Lấy 6 × 4 = 24!' } },
          { type: 'summary', content: { title: 'Quy tắc tìm x:', points: ['Số bị chia = Thương × Số chia'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c4-l12', 'Bài 12: Một phần năm (1/5) của một nhóm đồ vật', 'Chia đều thành 5 phần', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 20 quả cam chia đều vào 5 giỏ. Mỗi giỏ có: 20 : 5 = 4 quả cam. Mỗi giỏ chiếm 1/5 số cam! 🍊' } },
          { type: 'quiz', content: { question: 'Một phần năm của 30 chiếc bánh là bao nhiêu chiếc bánh?', options: [5, 6, 7, 8], answer: 6, mascotHint: 'Lấy 30 : 5 = 6 chiếc bánh!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 4:', points: ['Bé nắm chắc các phân số 1/2, 1/3, 1/4, 1/5 và bảng chia!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 5: CÁC SỐ ĐẾN 1000 (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c5',
      name: 'Chương 5: Các số đến 1000',
      description: 'Đơn vị, chục, trăm và số có 3 chữ số',
      icon: '🏢',
      color: '#51CF66',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c5-l1', 'Bài 1: Đơn vị, Chục, Trăm', 'Khái niệm hàng trăm', [
          { type: 'story', content: { mascotMood: 'happy', text: '10 đơn vị = 1 chục. 10 chục = 1 trăm (100)! 10 trăm = 1 nghìn (1000)! 💯' } },
          { type: 'quiz', content: { question: '10 chục bằng bao nhiêu?', options: [10, 100, 1000, 20], answer: 100, mascotHint: '10 chục = 1 trăm = 100.' } },
          { type: 'summary', content: { title: 'Các hàng số:', points: ['Đơn vị -> Chục -> Trăm -> Nghìn'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l2', 'Bài 2: Các số tròn trăm', '100 đến 900', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Một trăm (100), hai trăm (200), ba trăm (300)... chín trăm (900)! 🏢' } },
          { type: 'quiz', content: { question: 'Số tròn trăm liền trước số 500 là số nào?', options: [400, 490, 499, 600], answer: 400, mascotHint: '400 rồi đến 500.' } },
          { type: 'summary', content: { title: 'Số tròn trăm:', points: ['100, 200, 300, 400, 500, 600, 700, 800, 900'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l3', 'Bài 3: Các số có ba chữ số', 'Cấu tạo Trăm - Chục - Đơn vị', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 352 gồm: 3 trăm, 5 chục và 2 đơn vị. Đọc là: Ba trăm năm mươi hai! 🌟' } },
          { type: 'quiz', content: { question: 'Số gồm 7 trăm, 4 chục và 8 đơn vị viết là:', options: [748, 784, 847, 478], answer: 748, mascotHint: 'Viết từ trái sang phải: 748.' } },
          { type: 'summary', content: { title: 'Viết số 3 chữ số:', points: ['Trăm -> Chục -> Đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l4', 'Bài 4: Số có chữ số 0 ở hàng chục (Linh)', 'Cách đọc số linh', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 405 đọc là: Bốn trăm linh năm (hoặc bốn trăm lẻ năm). Chữ số 0 ở hàng chục đọc là "linh"! 💡' } },
          { type: 'quiz', content: { question: 'Số "Sáu trăm linh bảy" viết là:', options: [67, 607, 670, 706], answer: 607, mascotHint: '6 trăm, 0 chục, 7 đơn vị: 607.' } },
          { type: 'summary', content: { title: 'Đọc số có 0 ở giữa:', points: ['405: bốn trăm linh năm', '607: sáu trăm linh bảy'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l5', 'Bài 5: Số có chữ số 0 ở hàng đơn vị (Tròn chục)', 'Đọc đuôi mươi', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 530 đọc là: Năm trăm ba mươi. 890 đọc là: Tám trăm chín mươi! 🎯' } },
          { type: 'quiz', content: { question: 'Số "Bảy trăm hai mươi" viết là:', options: [702, 72, 720, 270], answer: 720, mascotHint: '7 trăm và 2 chục là 720.' } },
          { type: 'summary', content: { title: 'Đọc số:', points: ['720: bảy trăm hai mươi'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l6', 'Bài 6: So sánh các số có ba chữ số', 'So sánh hàng trăm trước', [
          { type: 'story', content: { mascotMood: 'happy', text: 'So sánh hàng trăm trước: 512 > 498 vì 5 trăm > 4 trăm! Nếu hàng trăm bằng nhau thì so sánh hàng chục! ⚖️' } },
          { type: 'quiz', content: { question: 'Điền dấu thích hợp: 645 ... 654', options: ['>', '<', '='], answer: '<', mascotHint: 'Cùng 6 trăm, hàng chục 4 < 5 nên 645 < 654.' } },
          { type: 'summary', content: { title: 'Thứ tự so sánh:', points: ['1. Hàng trăm', '2. Hàng chục', '3. Hàng đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l7', 'Bài 7: Thứ tự các số có ba chữ số', 'Sắp xếp từ bé đến lớn', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Tìm số lớn nhất, số bé nhất trong các số có 3 chữ số! 🏆' } },
          { type: 'quiz', content: { question: 'Số nào bé nhất trong các số: 345, 299, 401, 310?', options: [345, 299, 401, 310], answer: 299, mascotHint: '2 trăm là bé nhất: 299!' } },
          { type: 'summary', content: { title: 'Sắp xếp số:', points: ['299 < 310 < 345 < 401'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l8', 'Bài 8: Số 1000 (Một nghìn)', 'Chạm mốc 1000', [
          { type: 'story', content: { mascotMood: 'celebrate', text: '999 thêm 1 là Một nghìn (1000). 1000 là số có 4 chữ số! 🏰' } },
          { type: 'quiz', content: { question: 'Số liền sau số 999 là số nào?', options: [990, 1000, 1001, 998], answer: 1000, mascotHint: '999 + 1 = 1000.' } },
          { type: 'summary', content: { title: 'Số 1000:', points: ['1 nghìn = 10 trăm = 100 chục = 1000 đơn vị'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l9', 'Bài 9: Cộng trừ không nhớ trong phạm vi 1000', 'Đặt tính thẳng cột', [
          { type: 'story', content: { mascotMood: 'happy', text: '325 + 142: Cộng đơn vị (5+2=7), chục (2+4=6), trăm (3+1=4). Được 467! 💡' } },
          { type: 'quiz', content: { question: 'Tính: 543 + 231 = ?', options: [774, 764, 754, 784], answer: 774, mascotHint: '3+1=4; 4+3=7; 5+2=7.' } },
          { type: 'summary', content: { title: 'Cộng trừ phạm vi 1000:', points: ['Thực hiện từ phải sang trái.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l10', 'Bài 10: Luyện tập tổng hợp các số đến 1000', 'Hoàn thành Chương 5', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Bé đã làm chủ hoàn toàn các số đến 1000! 🌟' } },
          { type: 'quiz', content: { question: 'Số lớn nhất có ba chữ số là số nào?', options: [900, 990, 999, 1000], answer: 999, mascotHint: '999 là số 3 chữ số lớn nhất!' } },
          { type: 'summary', content: { title: 'Xuất sắc!', points: ['Bé đọc viết và so sánh số 3 chữ số cực giỏi!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c5-l11', 'Bài 11: Viết số có 3 chữ số thành tổng các trăm, chục, đơn vị', 'Cấu tạo số thập phân', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Số 458 gồm 4 trăm, 5 chục và 8 đơn vị: 458 = 400 + 50 + 8! 🌟' } },
          { type: 'quiz', content: { question: 'Số gồm 7 trăm và 3 đơn vị viết là số nào?', options: [73, 730, 703, 733], answer: 703, mascotHint: 'Hàng chục bằng 0: viết 703!' } },
          { type: 'summary', content: { title: 'Viết số thành tổng:', points: ['abc = a00 + b0 + c'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c5-l12', 'Bài 12: Sắp xếp dãy số có 3 chữ số theo thứ tự', 'Từ bé đến lớn và từ lớn đến bé', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Để sắp xếp, bé so sánh chữ số hàng trăm trước. Nếu bằng nhau thì so sánh tiếp hàng chục và đơn vị nhé! ⚖️' } },
          { type: 'quiz', content: { question: 'Trong các số: 345, 543, 435, 354, số bé nhất là:', options: [345, 543, 435, 354], answer: 345, mascotHint: 'So sánh hàng trăm: 3 là bé nhất, rồi 4 chục < 5 chục nên 345 bé nhất!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 5:', points: ['Bé nắm chắc toàn bộ dãy số từ 1 đến 1000!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 6: ĐO LƯỜNG (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c6',
      name: 'Chương 6: Đo lường (dm, m, km, kg, lít)',
      description: 'Các đơn vị đo độ dài, khối lượng và dung tích thực tế',
      icon: '📏',
      color: '#FFE66D',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c6-l1', 'Bài 1: Mét (m) — Đơn vị đo độ dài', '1 m = 10 dm = 100 cm', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Mét viết tắt là m. Bảng lớp dài khoảng 2m, chiều cao phòng học khoảng 3m! 🏫' } },
          { type: 'quiz', content: { question: '1 mét (m) bằng bao nhiêu xăng-ti-mét (cm)?', options: [10, 50, 100, 1000], answer: 100, mascotHint: '1m = 100cm!' } },
          { type: 'summary', content: { title: 'Đơn vị mét:', points: ['1m = 10dm = 100cm'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l2', 'Bài 2: Ki-lô-mét (km) — Đo quãng đường dài', '1 km = 1000 m', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Khoảng cách giữa hai thành phố đo bằng ki-lô-mét (km). 1 km = 1000 m! 🚗' } },
          { type: 'quiz', content: { question: '1 ki-lô-mét (km) bằng bao nhiêu mét (m)?', options: [10, 100, 500, 1000], answer: 1000, mascotHint: '1km = 1000m!' } },
          { type: 'summary', content: { title: 'Đơn vị km:', points: ['1km = 1000m'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l3', 'Bài 3: Mi-li-mét (mm) — Đo các vật rất mỏng', '1 cm = 10 mm', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Bề dày của cuốn vở hay sợi chỉ đo bằng mi-li-mét (mm). 1 cm = 10 mm! 📏' } },
          { type: 'quiz', content: { question: '1 cm bằng bao nhiêu mm?', options: [5, 10, 100, 1000], answer: 10, mascotHint: '1cm = 10mm.' } },
          { type: 'summary', content: { title: 'Bảng đo độ dài:', points: ['1m = 10dm = 100cm = 1000mm'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l4', 'Bài 4: Ki-lô-gam (kg) — Đơn vị đo khối lượng', 'Đo cân nặng của đồ vật', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Bao gạo nặng 10 kg, quả dưa hấu nặng 3 kg. Ki-lô-gam viết tắt là kg! ⚖️' } },
          { type: 'quiz', content: { question: 'Gói kẹo nặng 2 kg, gói bánh nặng 3 kg. Cả hai gói nặng bao nhiêu kg?', options: [4, 5, 6, 7], answer: 5, mascotHint: '2 + 3 = 5 kg!' } },
          { type: 'summary', content: { title: 'Khối lượng:', points: ['Dùng cân để đo ki-lô-gam (kg)'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l5', 'Bài 5: Lít (l) — Đơn vị đo dung tích', 'Đo thể tích chất lỏng', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Chai dầu ăn 1 lít, can nước 5 lít. Lít viết tắt là l! 🥛' } },
          { type: 'quiz', content: { question: 'Can nước có 10 lít, rót ra bình 4 lít. Trong can còn lại mấy lít?', options: [5, 6, 7, 8], answer: 6, mascotHint: '10 - 4 = 6 lít.' } },
          { type: 'summary', content: { title: 'Dung tích:', points: ['Lít dùng đo thể tích nước, sữa, dầu...'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l6', 'Bài 6: Xem đồng hồ: Giờ và Phút', 'Kim dài chỉ 15 phút, 30 phút', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Khi kim dài chỉ số 3 là 15 phút. Khi kim dài chỉ số 6 là 30 phút (hoặc rưỡi)! ⏰' } },
          { type: 'quiz', content: { question: 'Kim ngắn chỉ qua số 8 một chút, kim dài chỉ số 6. Là mấy giờ?', options: ['8 giờ 15 phút', '8 giờ 30 phút (8 rưỡi)', '9 giờ 30 phút'], answer: '8 giờ 30 phút (8 rưỡi)', mascotHint: 'Kim dài chỉ số 6 là 30 phút!' } },
          { type: 'summary', content: { title: 'Xem đồng hồ:', points: ['Số 3: 15 phút', 'Số 6: 30 phút (rưỡi)'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l7', 'Bài 7: Ngày, Giờ và Ngày trong tháng', 'Lịch tháng', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Một ngày có 24 giờ. Các tháng có 30 hoặc 31 ngày (tháng Hai có 28 hoặc 29 ngày)! 📅' } },
          { type: 'quiz', content: { question: 'Một ngày có bao nhiêu giờ?', options: [12, 24, 36, 48], answer: 24, mascotHint: 'Đúng 24 giờ một ngày!' } },
          { type: 'summary', content: { title: 'Thời gian:', points: ['1 ngày = 24 giờ', '1 tuần = 7 ngày'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l8', 'Bài 8: Giờ đúng và Giờ kém', 'Đọc giờ linh hoạt', [
          { type: 'story', content: { mascotMood: 'happy', text: '9 giờ 45 phút còn có thể đọc là 10 giờ kém 15 phút! ⏰' } },
          { type: 'quiz', content: { question: '7 giờ 50 phút đọc là mấy giờ kém?', options: ['7 giờ kém 10', '8 giờ kém 10', '8 giờ kém 50'], answer: '8 giờ kém 10', mascotHint: 'Còn 10 phút nữa là 8 giờ!' } },
          { type: 'summary', content: { title: 'Giờ kém:', points: ['Cách xem giờ thông dụng thực tế'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l9', 'Bài 9: Thực hành tính toán đại lượng đo lường', 'Cộng trừ có kèm đơn vị', [
          { type: 'story', content: { mascotMood: 'excited', text: '15 cm + 25 cm = 40 cm. 8 l × 2 = 16 l! Nhớ viết kèm tên đơn vị nhé! ✏️' } },
          { type: 'quiz', content: { question: 'Tính: 35 kg - 15 kg = ?', options: ['20', '20 kg', '50 kg', '20 g'], answer: '20 kg', mascotHint: '35 - 15 = 20 và giữ nguyên đơn vị kg!' } },
          { type: 'summary', content: { title: 'Tính với đại lượng:', points: ['Luôn ghi kèm đơn vị đo ở kết quả.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l10', 'Bài 10: Luyện tập tổng hợp đo lường', 'Hoàn thành Chương 6', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Bé đã thông thạo đo độ dài, cân nặng, dung tích và xem giờ! 🏆' } },
          { type: 'quiz', content: { question: '1m vải bớt đi 30cm thì còn lại bao nhiêu cm?', options: ['70 cm', '60 cm', '80 cm', '29 cm'], answer: '70 cm', mascotHint: 'Đổi 1m = 100cm, rồi lấy 100 - 30 = 70cm!' } },
          { type: 'summary', content: { title: 'Xuất sắc!', points: ['Bé đo lường và tính toán cực chuẩn!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c6-l11', 'Bài 11: Xem đồng hồ: Giờ rưỡi (30 phút) và 15 phút', 'Đọc giờ chính xác từng góc kim', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Khi kim dài chỉ số 6 là 30 phút (giờ rưỡi). Khi kim dài chỉ số 3 là 15 phút! Ví dụ: 8 giờ 30 phút là 8 rưỡi! ⏰' } },
          { type: 'quiz', content: { question: 'Kim ngắn ở giữa số 2 và 3, kim dài chỉ số 6. Là mấy giờ?', options: ['2 giờ 30 phút', '3 giờ 30 phút', '2 giờ 15 phút'], answer: '2 giờ 30 phút', mascotHint: 'Là 2 giờ rưỡi (2 giờ 30 phút)!' } },
          { type: 'summary', content: { title: 'Đọc giờ phút:', points: ['Kim chỉ số 6 là 30 phút, chỉ số 3 là 15 phút'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c6-l12', 'Bài 12: Thực hành ước lượng cân nặng và dung tích', 'Vận dụng vào cuộc sống', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Một quả dưa hấu nặng khoảng 3 kg 🍉. Một chai dầu ăn chứa 1 lít 🛢️. Cùng ước lượng đồ dùng quanh em nhé!' } },
          { type: 'quiz', content: { question: 'Bình nước uống ở lớp học thường chứa khoảng bao nhiêu lít nước?', options: ['2 lít', '5 lít', '20 lít', '100 lít'], answer: '20 lít', mascotHint: 'Bình nước to thường chứa khoảng 20 lít!' } },
          { type: 'summary', content: { title: 'Hoàn thành Chương 6:', points: ['Bé làm chủ các đơn vị đo: kg, lít, m, dm, cm, mm!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },

    // ----------------------------------------------------
    // CHƯƠNG 7: HÌNH HỌC & GIẢI TOÁN (10 bài)
    // ----------------------------------------------------
    {
      id: 'g2-c7',
      name: 'Chương 7: Hình học & Giải toán',
      description: 'Đường gấp khúc, hình tứ giác và bài toán thực tế',
      icon: '📐',
      color: '#4ECDC4',
      totalLessons: 12,
      lessons: [
        makeLesson('g2-c7-l1', 'Bài 1: Đường thẳng, Đường cong, Đường gấp khúc', 'Phân biệt các dạng đường', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau mà không thẳng hàng! 〰️' } },
          { type: 'quiz', content: { question: 'Đường gồm các đoạn thẳng nối tiếp nhau gọi là gì?', options: ['Đường cong', 'Đường gấp khúc', 'Đường tròn'], answer: 'Đường gấp khúc', mascotHint: 'Đường gấp khúc!' } },
          { type: 'summary', content: { title: 'Các dạng đường:', points: ['Đường thẳng', 'Đường cong', 'Đường gấp khúc'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l2', 'Bài 2: Tính độ dài đường gấp khúc', 'Cộng độ dài các đoạn thẳng', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Đường gấp khúc ABC gồm đoạn AB = 4cm và BC = 5cm. Độ dài đường gấp khúc = 4 + 5 = 9cm! 📏' } },
          { type: 'quiz', content: { question: 'Đường gấp khúc gồm 3 đoạn dài: 3cm, 5cm, 2cm. Độ dài cả đường là:', options: [8, 10, 12, 15], answer: 10, mascotHint: '3 + 5 + 2 = 10 cm!' } },
          { type: 'summary', content: { title: 'Công thức:', points: ['Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l3', 'Bài 3: Nhận biết Hình tứ giác', 'Hình có 4 cạnh và 4 đỉnh', [
          { type: 'story', content: { mascotMood: 'excited', text: 'Hình vuông và hình chữ nhật đều là hình tứ giác vì chúng đều có 4 cạnh! 🔷' } },
          { type: 'quiz', content: { question: 'Hình tứ giác là hình có mấy cạnh?', options: [3, 4, 5, 6], answer: 4, mascotHint: 'Tứ có nghĩa là 4!' } },
          { type: 'summary', content: { title: 'Hình tứ giác:', points: ['Hình phẳng khép kín có 4 cạnh.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l4', 'Bài 4: Khối trụ và Khối cầu', 'Các khối hình không gian quen thuộc', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Quả bóng đá ⚽ là khối cầu. Lon nước ngọt 🥤 là khối trụ tròn! 🥫' } },
          { type: 'quiz', content: { question: 'Quả bóng bàn có dạng khối gì?', options: ['Khối lập phương', 'Khối trụ', 'Khối cầu'], answer: 'Khối cầu', mascotHint: 'Tròn vo lăn được mọi hướng là khối cầu.' } },
          { type: 'summary', content: { title: 'Khối không gian:', points: ['Khối cầu: tròn lăn được', 'Khối trụ: có 2 mặt đáy tròn'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l5', 'Bài 5: Giải bài toán có một phép tính cộng', 'Bài toán thêm vào, gom lại', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Vườn nhà bà có 15 cây cam và 20 cây bưởi. Cả vườn có: 15 + 20 = 35 cây! 🌳' } },
          { type: 'quiz', content: { question: 'Bể cá có 14 con cá vàng và 12 con cá bảy màu. Hỏi có tất cả bao nhiêu con cá?', options: [24, 26, 28, 22], answer: 26, mascotHint: '14 + 12 = 26 con cá!' } },
          { type: 'summary', content: { title: 'Bài toán cộng:', points: ['Tìm tất cả thì làm phép cộng.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l6', 'Bài 6: Giải bài toán có một phép tính trừ', 'Bài toán bớt đi, còn lại', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Cửa hàng có 45 chiếc cặp, đã bán được 20 chiếc. Còn lại: 45 - 20 = 25 chiếc cặp! 🎒' } },
          { type: 'quiz', content: { question: 'Tổ 1 có 32 ngôi sao, đã tặng bạn 10 ngôi sao. Tổ 1 còn lại mấy ngôi sao?', options: [20, 22, 24, 42], answer: 22, mascotHint: '32 - 10 = 22!' } },
          { type: 'summary', content: { title: 'Bài toán trừ:', points: ['Tìm phần còn lại thì làm phép trừ.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l7', 'Bài 7: Giải bài toán bằng phép tính nhân', 'Đại lượng gấp lên nhiều lần', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Mỗi bàn có 4 bạn ngồi. Có 5 bàn như thế. Có tất cả: 4 × 5 = 20 bạn! 🪑' } },
          { type: 'quiz', content: { question: 'Mỗi túi có 5 quả cam. Có 6 túi như thế. Có tất cả bao nhiêu quả cam?', options: [25, 30, 35, 40], answer: 30, mascotHint: '5 × 6 = 30 quả cam!' } },
          { type: 'summary', content: { title: 'Bài toán nhân:', points: ['Mỗi phần có ... nhân với số phần.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l8', 'Bài 8: Giải bài toán bằng phép tính chia', 'Chia đều vào các nhóm', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Có 24 quyển vở chia đều cho 4 bạn. Mỗi bạn được: 24 : 4 = 6 quyển vở! 📚' } },
          { type: 'quiz', content: { question: 'Có 20 bông hoa cắm đều vào 5 lọ. Mỗi lọ có mấy bông hoa?', options: [3, 4, 5, 6], answer: 4, mascotHint: '20 : 5 = 4 bông hoa!' } },
          { type: 'summary', content: { title: 'Bài toán chia:', points: ['Chia đều đồ vật cho các nhóm.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l9', 'Bài 9: Thu thập, phân loại và kiểm đếm', 'Biểu đồ tranh đơn giản', [
          { type: 'story', content: { mascotMood: 'happy', text: 'Đếm số bạn thích bóng đá ⚽, số bạn thích bơi lội 🏊‍♂️... rồi lập bảng kiểm đếm! 📊' } },
          { type: 'quiz', content: { question: 'Trong lớp có 8 bạn thích táo, 12 bạn thích cam. Loại quả nào được nhiều bạn thích hơn?', options: ['Táo', 'Cam', 'Bằng nhau'], answer: 'Cam', mascotHint: '12 bạn thích cam > 8 bạn thích táo!' } },
          { type: 'summary', content: { title: 'Thu thập số liệu:', points: ['Kiểm đếm giúp so sánh dễ dàng.'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l10', 'Bài 10: Ôn tập cuối năm — Tốt nghiệp Lớp 2', 'Tổng kết toàn diện kiến thức lớp 2', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Chúc mừng bé đã hoàn thành xuất sắc toàn bộ 7 chương của Lớp 2! 🎓🏆' } },
          { type: 'quiz', content: { question: 'Tính: 5 × 4 + 180 = ?', options: [190, 200, 210, 220], answer: 200, mascotHint: '5 × 4 = 20; 20 + 180 = 200!' } },
          { type: 'summary', content: { title: 'Chúc mừng thủ khoa Lớp 2!', points: ['Bé sẵn sàng tự tin bước lên Lớp 3!'], mascotMood: 'celebrate' } },
        ]),
        makeLesson('g2-c7-l11', 'Bài 11: Đếm số hình tam giác, tứ giác trong hình vẽ', 'Phát triển tư duy hình học không gian', [
          { type: 'story', content: { mascotMood: 'thinking', text: 'Đánh số 1, 2 vào từng mảnh hình đơn, sau đó ghép lại để không bị đếm sót hình nhé bé! 📐' } },
          { type: 'quiz', content: { question: 'Một hình vuông được kẻ một đường chéo chia đôi. Ta đếm được bao nhiêu hình tam giác?', options: [1, 2, 3, 4], answer: 2, mascotHint: 'Đường chéo chia hình vuông thành 2 hình tam giác!' } },
          { type: 'summary', content: { title: 'Mẹo đếm hình:', points: ['Đếm hình đơn trước rồi đếm hình ghép'], mascotMood: 'proud' } },
        ]),
        makeLesson('g2-c7-l12', 'Bài 12: Đại hội Trạng Nguyên Toán Lớp 2', 'Tốt nghiệp Lớp 2 xuất sắc', [
          { type: 'story', content: { mascotMood: 'celebrate', text: 'Chúc mừng bé đã hoàn thành xuất sắc toàn bộ 84 bài học Toán Lớp 2! Bé đã sẵn sàng lên Lớp 3! 🎉🏆' } },
          { type: 'quiz', content: { question: 'Tính: 5 × 6 + 45 = ?', options: [65, 75, 80, 85], answer: 75, mascotHint: '5 × 6 = 30; 30 + 45 = 75!' } },
          { type: 'summary', content: { title: 'Vinh danh Trạng Nguyên Lớp 2!', points: ['Bé nắm vững toàn bộ kiến thức toán lớp 2!', 'Tự tin bước lên lớp 3!'], mascotMood: 'celebrate' } },
        ]),
      ],
    },
  ],
}
