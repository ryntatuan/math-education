// Data for Grade 5 (Lớp 5) - 10 Chapters
// Aligned with Vietnam Primary Math Curriculum

function makeLesson(id, title, desc, slides = []) {
  return {
    id,
    title,
    type: 'learn',
    description: desc,
    slides: slides.length > 0 ? slides : [
      { type: 'story', content: { mascotMood: 'happy', text: `Chào bé! Hôm nay chúng mình cùng chinh phục ${title} nhé! 🚀` } },
      { type: 'summary', content: { title, points: [desc], mascotMood: 'proud' } },
    ],
  }
}

export const grade5Data = {
  id: 5,
  name: 'Lớp 5',
  description: 'Số thập phân, tỉ số %, hình không gian, toán chuyển động & ôn thi chuyển cấp',
  icon: '🌳',
  color: '#8b5cf6',
  ageRange: '10-11 tuổi',
  chapters: [
    {
      id: 'g5-c1',
      name: 'Chương 1: Ôn tập Phân số & Giải toán tỉ lệ',
      description: 'Hỗn số, toán tỉ lệ thuận, tỉ lệ nghịch và quy tắc rút về đơn vị',
      icon: '🍰',
      color: '#8b5cf6',
      totalLessons: 12,
      lessons: [
        makeLesson('g5-c1-l1', 'Bài 1: Ôn tập khái niệm phân số và tính chất cơ bản', 'Củng cố nền tảng phân số'),
        makeLesson('g5-c1-l2', 'Bài 2: Hỗn số và cách chuyển đổi hỗn số', 'Phần nguyên và phần phân số'),
        makeLesson('g5-c1-l3', 'Bài 3: Giải bài toán về Đại lượng tỉ lệ thuận', 'Gấp lên bao nhiêu lần'),
        makeLesson('g5-c1-l4', 'Bài 4: Giải bài toán về Đại lượng tỉ lệ nghịch', 'Giảm đi tương ứng'),
      ],
    },
    {
      id: 'g5-c2',
      name: 'Chương 2: Khái niệm Số thập phân',
      description: 'Hàng của số thập phân, đọc viết và so sánh số thập phân',
      icon: '🔢',
      color: '#06b6d4',
      totalLessons: 12,
      lessons: [
        makeLesson('g5-c2-l1', 'Bài 1: Khái niệm số thập phân: Phần mười, phần trăm, phần nghìn', 'Bản chất số thập phân'),
        makeLesson('g5-c2-l2', 'Bài 2: Hàng của số thập phân và đọc viết số', 'Phần nguyên và phần thập phân'),
        makeLesson('g5-c2-l3', 'Bài 3: Số thập phân bằng nhau', 'Bỏ hoặc thêm chữ số 0'),
        makeLesson('g5-c2-l4', 'Bài 4: So sánh hai số thập phân', 'So sánh từ hàng cao nhất'),
      ],
    },
    {
      id: 'g5-c3',
      name: 'Chương 3: Các phép tính với Số thập phân',
      description: 'Cộng, trừ, nhân, chia số thập phân chuẩn xác',
      icon: '🧮',
      color: '#10b981',
      totalLessons: 14,
      lessons: [
        makeLesson('g5-c3-l1', 'Bài 1: Phép cộng các số thập phân', 'Đặt tính thẳng cột dấu phẩy'),
        makeLesson('g5-c3-l2', 'Bài 2: Phép trừ các số thập phân', 'Trừ có nhớ và cân bằng chữ số'),
        makeLesson('g5-c3-l3', 'Bài 3: Nhân số thập phân với số tự nhiên và số thập phân', 'Đếm chữ số phần thập phân'),
        makeLesson('g5-c3-l4', 'Bài 4: Nhân nhẩm với 10, 100, 1000 và 0.1, 0.01', 'Dịch chuyển dấu phẩy thần tốc'),
        makeLesson('g5-c3-l5', 'Bài 5: Phép chia số thập phân', 'Chia cho số tự nhiên và số thập phân'),
      ],
    },
    {
      id: 'g5-c4',
      name: 'Chương 4: Tỉ số phần trăm (%)',
      description: 'Khái niệm tỉ số %, 3 bài toán cơ bản về tỉ số phần trăm',
      icon: '📊',
      color: '#f59e0b',
      totalLessons: 12,
      lessons: [
        makeLesson('g5-c4-l1', 'Bài 1: Làm quen với Tỉ số phần trăm', 'Ý nghĩa ký hiệu %'),
        makeLesson('g5-c4-l2', 'Bài 2: Tìm tỉ số phần trăm của hai số', 'Chia rồi nhân với 100%'),
        makeLesson('g5-c4-l3', 'Bài 3: Tìm giá trị phần trăm của một số', 'Nhân số đó với tỉ số %'),
        makeLesson('g5-c4-l4', 'Bài 4: Tìm một số khi biết giá trị phần trăm', 'Chia cho tỉ số %'),
      ],
    },
    {
      id: 'g5-c5',
      name: 'Chương 5: Hình tam giác & Hình thang',
      description: 'Đặc điểm, chiều cao và công thức tính diện tích hình tam giác, hình thang',
      icon: '📐',
      color: '#ec4899',
      totalLessons: 10,
      lessons: [
        makeLesson('g5-c5-l1', 'Bài 1: Hình tam giác và diện tích', 'S = (đáy × chiều cao) : 2'),
        makeLesson('g5-c5-l2', 'Bài 2: Hình thang và diện tích hình thang', 'S = (đáy lớn + đáy bé) × cao : 2'),
      ],
    },
    {
      id: 'g5-c6',
      name: 'Chương 6: Hình tròn, Chu vi & Diện tích',
      description: 'Bán kính, đường kính, số Pi (3,14); công thức tính chu vi và diện tích',
      icon: '⚪',
      color: '#3b82f6',
      totalLessons: 10,
      lessons: [
        makeLesson('g5-c6-l1', 'Bài 1: Chu vi hình tròn', 'C = d × 3,14 = r × 2 × 3,14'),
        makeLesson('g5-c6-l2', 'Bài 2: Diện tích hình tròn', 'S = r × r × 3,14'),
      ],
    },
    {
      id: 'g5-c7',
      name: 'Chương 7: Hình hộp chữ nhật & Hình lập phương',
      description: 'Diện tích xung quanh, diện tích toàn phần và thể tích (m³, dm³, cm³)',
      icon: '📦',
      color: '#14b8a6',
      totalLessons: 12,
      lessons: [
        makeLesson('g5-c7-l1', 'Bài 1: Diện tích xung quanh và toàn phần hình hộp chữ nhật', 'Chu vi đáy nhân chiều cao'),
        makeLesson('g5-c7-l2', 'Bài 2: Diện tích xung quanh và toàn phần hình lập phương', 'S_xq = a × a × 4'),
        makeLesson('g5-c7-l3', 'Bài 3: Thể tích của một hình: Đơn vị m³, dm³, cm³', 'Bảng đơn vị đo thể tích'),
        makeLesson('g5-c7-l4', 'Bài 4: Thể tích hình hộp chữ nhật và hình lập phương', 'V = a × b × c; V = a³'),
      ],
    },
    {
      id: 'g5-c8',
      name: 'Chương 8: Số đo thời gian & Toán chuyển động đều',
      description: 'Cộng trừ nhân chia số đo thời gian; vận tốc, quãng đường, thời gian',
      icon: '⏱️',
      color: '#f97316',
      totalLessons: 14,
      lessons: [
        makeLesson('g5-c8-l1', 'Bài 1: Các phép tính với số đo thời gian', 'Cộng, trừ, nhân, chia thời gian'),
        makeLesson('g5-c8-l2', 'Bài 2: Vận tốc: Khái niệm và công thức tính', 'v = s : t (km/h, m/s)'),
        makeLesson('g5-c8-l3', 'Bài 3: Quãng đường: Công thức tính', 's = v × t'),
        makeLesson('g5-c8-l4', 'Bài 4: Thời gian: Công thức tính', 't = s : v'),
        makeLesson('g5-c8-l5', 'Bài 5: Bài toán hai chuyển động ngược chiều (gặp nhau)', 's : (v1 + v2)'),
        makeLesson('g5-c8-l6', 'Bài 6: Bài toán hai chuyển động cùng chiều (đuổi nhau)', 's : (v1 - v2)'),
      ],
    },
    {
      id: 'g5-c9',
      name: 'Chương 9: Biểu đồ hình quạt tròn & Thống kê',
      description: 'Đọc, phân tích dữ liệu trên biểu đồ hình quạt tròn',
      icon: '🥧',
      color: '#6366f1',
      totalLessons: 10,
      lessons: [
        makeLesson('g5-c9-l1', 'Bài 1: Đọc và phân tích biểu đồ hình quạt tròn', 'Tỉ lệ phần trăm các phần'),
        makeLesson('g5-c9-l2', 'Bài 2: Thực hành thu thập và lập bảng số liệu', 'Ứng dụng trong đời sống'),
      ],
    },
    {
      id: 'g5-c10',
      name: 'Chương 10: Ôn tập cuối năm & Chinh phục Lớp 6',
      description: 'Tổng ôn toàn bộ kiến thức Tiểu học, chuẩn bị chuyển cấp',
      icon: '🏆',
      color: '#eab308',
      totalLessons: 14,
      lessons: [
        makeLesson('g5-c10-l1', 'Bài 1: Ôn tập số học: Tự nhiên, phân số, số thập phân', 'Tổng hợp kỹ năng tính toán'),
        makeLesson('g5-c10-l2', 'Bài 2: Ôn tập hình học và đo lường', 'Chu vi, diện tích và thể tích'),
        makeLesson('g5-c10-l3', 'Bài 3: Ôn tập giải toán chuyển động đều và tỉ số %', 'Các dạng toán đố trọng tâm'),
        makeLesson('g5-c10-l4', 'Bài 4: Lễ Tốt Nghiệp Bậc Tiểu Học — Sẵn sàng vào Lớp 6!', 'Chúc mừng bé hoàn thành xuất sắc! 🎉🎓'),
      ],
    },
  ],
}
