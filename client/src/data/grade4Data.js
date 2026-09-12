// Data for Grade 4 (Lớp 4) - 10 Chapters
// Aligned with Vietnam Primary Math Curriculum

function makeLesson(id, title, desc, slides = []) {
  return {
    id,
    title,
    type: 'learn',
    description: desc,
    slides: slides.length > 0 ? slides : [
      { type: 'story', content: { mascotMood: 'happy', text: `Chào bé! Hôm nay chúng mình sẽ cùng học ${title} nhé! 🌟` } },
      { type: 'summary', content: { title, points: [desc], mascotMood: 'proud' } },
    ],
  }
}

export const grade4Data = {
  id: 4,
  name: 'Lớp 4',
  description: 'Lớp triệu, bốn phép tính số tự nhiên, phân số, hình học & đo lường',
  icon: '🌲',
  color: '#ec4899',
  ageRange: '9-10 tuổi',
  chapters: [
    {
      id: 'g4-c1',
      name: 'Chương 1: Số tự nhiên & Lớp triệu',
      description: 'Đọc, viết các số có nhiều chữ số, hàng và lớp',
      icon: '🔢',
      color: '#ec4899',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c1-l1', 'Bài 1: Làm quen với số có sáu chữ số', 'Hàng trăm nghìn và cấu tạo số'),
        makeLesson('g4-c1-l2', 'Bài 2: Hàng và Lớp: Lớp đơn vị, lớp nghìn, lớp triệu', 'Nhận biết các lớp số'),
        makeLesson('g4-c1-l3', 'Bài 3: So sánh các số có nhiều chữ số', 'Quy tắc so sánh số tự nhiên'),
        makeLesson('g4-c1-l4', 'Bài 4: Làm tròn số đến hàng trăm nghìn, hàng triệu', 'Ứng dụng làm tròn thực tế'),
      ],
    },
    {
      id: 'g4-c2',
      name: 'Chương 2: Phép cộng & trừ số tự nhiên',
      description: 'Đặt tính rồi tính cộng, trừ các số có nhiều chữ số',
      icon: '➕',
      color: '#3b82f6',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c2-l1', 'Bài 1: Phép cộng các số có nhiều chữ số', 'Cộng có nhớ và không nhớ'),
        makeLesson('g4-c2-l2', 'Bài 2: Phép trừ các số có nhiều chữ số', 'Trừ có nhớ liên tiếp'),
        makeLesson('g4-c2-l3', 'Bài 3: Tính chất giao hoán và kết hợp của phép cộng', 'Vận dụng tính nhanh'),
      ],
    },
    {
      id: 'g4-c3',
      name: 'Chương 3: Phép nhân & chia số tự nhiên',
      description: 'Nhân với số có một, hai chữ số; chia cho số có một, hai chữ số',
      icon: '✖️',
      color: '#10b981',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c3-l1', 'Bài 1: Nhân với số có một chữ số', 'Quy tắc đặt tính nhân'),
        makeLesson('g4-c3-l2', 'Bài 2: Nhân với số có hai chữ số', 'Tích riêng thứ nhất và thứ hai'),
        makeLesson('g4-c3-l3', 'Bài 3: Chia cho số có một chữ số', 'Chia hết và chia có dư'),
        makeLesson('g4-c3-l4', 'Bài 4: Chia cho số có hai chữ số', 'Ước lượng thương chuẩn xác'),
      ],
    },
    {
      id: 'g4-c4',
      name: 'Chương 4: Làm quen với Phân số',
      description: 'Khái niệm phân số, phân số bằng nhau, rút gọn & quy đồng',
      icon: '🍰',
      color: '#f59e0b',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c4-l1', 'Bài 1: Khái niệm phân số, tử số và mẫu số', 'Ý nghĩa của phân số'),
        makeLesson('g4-c4-l2', 'Bài 2: Phân số và phép chia số tự nhiên', 'Thương là một phân số'),
        makeLesson('g4-c4-l3', 'Bài 3: Phân số bằng nhau', 'Tính chất cơ bản của phân số'),
        makeLesson('g4-c4-l4', 'Bài 4: Rút gọn phân số về tối giản', 'Cách tìm ước chung lớn nhất'),
        makeLesson('g4-c4-l5', 'Bài 5: Quy đồng mẫu số các phân số', 'Đưa về cùng mẫu số chung'),
      ],
    },
    {
      id: 'g4-c5',
      name: 'Chương 5: Phép cộng & trừ phân số',
      description: 'Cộng trừ phân số cùng mẫu và khác mẫu số',
      icon: '➕',
      color: '#8b5cf6',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c5-l1', 'Bài 1: Phép cộng hai phân số cùng mẫu', 'Cộng tử số, giữ nguyên mẫu'),
        makeLesson('g4-c5-l2', 'Bài 2: Phép cộng hai phân số khác mẫu', 'Quy đồng trước khi cộng'),
        makeLesson('g4-c5-l3', 'Bài 3: Phép trừ hai phân số cùng mẫu', 'Trừ tử số, giữ nguyên mẫu'),
        makeLesson('g4-c5-l4', 'Bài 4: Phép trừ hai phân số khác mẫu', 'Quy đồng trước khi trừ'),
      ],
    },
    {
      id: 'g4-c6',
      name: 'Chương 6: Phép nhân & chia phân số',
      description: 'Nhân chia hai phân số, tìm phân số của một số',
      icon: '➗',
      color: '#06b6d4',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c6-l1', 'Bài 1: Phép nhân hai phân số', 'Tử nhân tử, mẫu nhân mẫu'),
        makeLesson('g4-c6-l2', 'Bài 2: Tìm phân số của một số', 'Nhân số đó với phân số'),
        makeLesson('g4-c6-l3', 'Bài 3: Phép chia phân số: Phân số đảo ngược', 'Nhân với phân số đảo ngược'),
      ],
    },
    {
      id: 'g4-c7',
      name: 'Chương 7: Hình học: Góc & Hai đường thẳng',
      description: 'Góc nhọn, tù, bẹt; hai đường thẳng vuông góc, song song',
      icon: '📐',
      color: '#6366f1',
      totalLessons: 10,
      lessons: [
        makeLesson('g4-c7-l1', 'Bài 1: Góc nhọn, góc tù, góc bẹt', 'Nhận biết độ lớn các loại góc'),
        makeLesson('g4-c7-l2', 'Bài 2: Hai đường thẳng vuông góc', 'Dùng ê-ke kiểm tra góc vuông'),
        makeLesson('g4-c7-l3', 'Bài 3: Hai đường thẳng song song', 'Không bao giờ cắt nhau'),
      ],
    },
    {
      id: 'g4-c8',
      name: 'Chương 8: Hình bình hành & Hình thoi',
      description: 'Đặc điểm và công thức tính diện tích hình bình hành, hình thoi',
      icon: '🔷',
      color: '#14b8a6',
      totalLessons: 10,
      lessons: [
        makeLesson('g4-c8-l1', 'Bài 1: Hình bình hành và diện tích', 'S = đáy × chiều cao'),
        makeLesson('g4-c8-l2', 'Bài 2: Hình thoi và diện tích', 'S = (m × n) : 2'),
      ],
    },
    {
      id: 'g4-c9',
      name: 'Chương 9: Đại lượng & Số liệu thống kê',
      description: 'Yến, tạ, tấn; giây, thế kỷ; dãy số liệu và biểu đồ cột',
      icon: '📊',
      color: '#f97316',
      totalLessons: 10,
      lessons: [
        makeLesson('g4-c9-l1', 'Bài 1: Đơn vị đo khối lượng: Yến, tạ, tấn', 'Bảng đơn vị đo khối lượng'),
        makeLesson('g4-c9-l2', 'Bài 2: Giây và Thế kỷ', '1 thế kỷ = 100 năm'),
        makeLesson('g4-c9-l3', 'Bài 3: Đọc và phân tích biểu đồ cột', 'Khai thác dữ liệu thống kê'),
      ],
    },
    {
      id: 'g4-c10',
      name: 'Chương 10: Ôn tập cuối năm Lớp 4',
      description: 'Tổng hợp toàn bộ kiến thức toán học Lớp 4',
      icon: '🏆',
      color: '#eab308',
      totalLessons: 12,
      lessons: [
        makeLesson('g4-c10-l1', 'Bài 1: Ôn tập số tự nhiên và bốn phép tính', 'Luyện tập tổng hợp'),
        makeLesson('g4-c10-l2', 'Bài 2: Ôn tập phân số và phép tính phân số', 'Giải toán có lời văn'),
        makeLesson('g4-c10-l3', 'Bài 3: Đấu trường toán học Trạng Nguyên Lớp 4', 'Sẵn sàng bước vào Lớp 5!'),
      ],
    },
  ],
}
