import fs from 'fs';

const filePath = 'client/src/utils/exerciseGenerator.js';
let content = fs.readFileSync(filePath, 'utf-8');

const newTopics = `export const TOPICS = {
  GRADE_1: [
    { id: 'g1_count', name: 'Đếm hình & Nhận biết số (0-20)', icon: '🔢', chapter: 'Chương 1' },
    { id: 'g1_add_sub_10', name: 'Phép cộng, phép trừ phạm vi 10', icon: '➕', chapter: 'Chương 2' },
    { id: 'g1_compare', name: 'So sánh lớn hơn, bé hơn, bằng (>, <, =)', icon: '⚖️', chapter: 'Chương 2' },
    { id: 'g1_numbers_20', name: 'Các số trong phạm vi 20', icon: '🔟', chapter: 'Chương 3' },
    { id: 'g1_add_sub_20', name: 'Phép cộng, phép trừ phạm vi 20', icon: '➕', chapter: 'Chương 4' },
    { id: 'g1_numbers_100', name: 'Các số đến 100, chục và đơn vị', icon: '💯', chapter: 'Chương 5' },
    { id: 'g1_shapes', name: 'Nhận biết hình phẳng & hình khối', icon: '🔷', chapter: 'Chương 6' },
    { id: 'g1_add_sub_100', name: 'Cộng trừ không nhớ phạm vi 100', icon: '🧮', chapter: 'Chương 7' },
    { id: 'g1_time_clock', name: 'Xem đồng hồ giờ đúng & Các ngày trong tuần', icon: '⏰', chapter: 'Chương 8' },
    { id: 'g1_shapes_3d', name: 'Làm quen với hình khối (Lập phương, Hộp CN)', icon: '📦', chapter: 'Chương 9' },
    { id: 'g1_final_review', name: 'Ôn tập cuối năm Lớp 1', icon: '🏆', chapter: 'Chương 10' }
  ],
  GRADE_2: [
    { id: 'g2_review_100', name: 'Ôn tập & Bổ sung (Tia số, liền trước, liền sau)', icon: '🔙', chapter: 'Chương 1' },
    { id: 'g2_add_sub_100', name: 'Cộng trừ có nhớ phạm vi 100', icon: '🧮', chapter: 'Chương 2' },
    { id: 'g2_mul_2345', name: 'Bảng nhân 2 và Bảng nhân 5', icon: '✖️', chapter: 'Chương 3' },
    { id: 'g2_div_2345', name: 'Bảng chia 2 và Bảng chia 5', icon: '➗', chapter: 'Chương 4' },
    { id: 'g2_numbers_1000', name: 'Các số đến 1000 & So sánh số tròn trăm', icon: '💯', chapter: 'Chương 5' },
    { id: 'g2_measure', name: 'Đo lường (kg, lít, dm, m, km)', icon: '📏', chapter: 'Chương 6' },
    { id: 'g2_geometry', name: 'Đường gấp khúc, hình tứ giác, khối trụ, cầu', icon: '📐', chapter: 'Chương 7' },
    { id: 'g2_add_sub_1000', name: 'Phép cộng, phép trừ trong phạm vi 1000', icon: '➕', chapter: 'Chương 8' },
    { id: 'g2_components', name: 'Tìm thành phần phép tính (+, -, ×, ÷)', icon: '🔍', chapter: 'Chương 8' },
    { id: 'g2_stats_prob', name: 'Biểu đồ tranh & Chắc chắn, có thể, không thể', icon: '📊', chapter: 'Chương 9' },
    { id: 'g2_time_calendar', name: 'Xem đồng hồ (giờ, phút) & Lịch tháng', icon: '📅', chapter: 'Chương 10' }
  ],
  GRADE_3: [
    { id: 'g3_review_1000', name: 'Ôn tập & Bổ sung (Số đến 1 000)', icon: '🔙', chapter: 'Chương 1' },
    { id: 'g3_mul_6789', name: 'Bảng nhân 6, 7, 8, 9', icon: '✖️', chapter: 'Chương 2' },
    { id: 'g3_fraction', name: 'Phân số đơn giản: Một phần mấy (1/2, 1/3...)', icon: '🍰', chapter: 'Chương 2' },
    { id: 'g3_div_6789', name: 'Bảng chia 6, 7, 8, 9 & Phép chia có dư', icon: '➗', chapter: 'Chương 3' },
    { id: 'g3_mul_div_multi', name: 'Nhân chia số 2, 3, 4 chữ số với số 1 chữ số', icon: '🧮', chapter: 'Chương 3' },
    { id: 'g3_numbers_100k', name: 'Các số đến 100 000 & Chữ số La Mã', icon: '🏛️', chapter: 'Chương 4' },
    { id: 'g3_expressions', name: 'Biểu thức số & Tính giá trị biểu thức', icon: '🔢', chapter: 'Chương 5' },
    { id: 'g3_perimeter_area', name: 'Chu vi & Diện tích HCN, hình vuông (cm²)', icon: '📐', chapter: 'Chương 6' },
    { id: 'g3_measure_units', name: 'Đơn vị mm, gam, ml, nhiệt độ & Tiền Việt Nam', icon: '🪙', chapter: 'Chương 7' },
    { id: 'g3_word_problems', name: 'Bài toán giải bằng 2 bước tính', icon: '💡', chapter: 'Chương 8' },
    { id: 'g3_stats_prob', name: 'Bảng số liệu & Khả năng xảy ra sự kiện', icon: '📊', chapter: 'Chương 9' },
    { id: 'g3_final_review', name: 'Ôn tập cuối năm Lớp 3', icon: '🏆', chapter: 'Chương 10' }
  ],
  GRADE_4: [
    { id: 'g4_numbers_million', name: 'Số tự nhiên đến lớp triệu, hàng và lớp', icon: '🔢', chapter: 'Chương 1' },
    { id: 'g4_measures_stats', name: 'Yến, tạ, tấn; dm², m², km²; thế kỉ & Trung bình cộng', icon: '📊', chapter: 'Chương 1' },
    { id: 'g4_add_sub_natural', name: 'Phép cộng, trừ số tự nhiên nhiều chữ số', icon: '➕', chapter: 'Chương 2' },
    { id: 'g4_mul_div_natural', name: 'Nhân, chia số nhiều chữ số & Nhân nhẩm với 11', icon: '✖️', chapter: 'Chương 2' },
    { id: 'g4_divisibility', name: 'Dấu hiệu chia hết cho 2, 5, 9, 3', icon: '🎯', chapter: 'Chương 3' },
    { id: 'g4_geometry', name: 'Góc nhọn/tù/bẹt & Diện tích hình bình hành, hình thoi', icon: '📐', chapter: 'Chương 3' },
    { id: 'g4_fractions_basic', name: 'Phân số bằng nhau, rút gọn, quy đồng & so sánh', icon: '🍰', chapter: 'Chương 4' },
    { id: 'g4_fractions_calc', name: 'Bốn phép tính phân số (+, -, ×, ÷)', icon: '🧮', chapter: 'Chương 4' },
    { id: 'g4_sum_diff', name: 'Tìm hai số khi biết Tổng và Hiệu', icon: '⚖️', chapter: 'Chương 5' },
    { id: 'g4_sum_ratio', name: 'Tìm hai số khi biết Tổng - Tỉ, Hiệu - Tỉ', icon: '💡', chapter: 'Chương 5' },
    { id: 'g4_final_review', name: 'Ôn tập cuối năm Lớp 4', icon: '🏆', chapter: 'Chương 6' }
  ],
  GRADE_5: [
    { id: 'g5_fractions_mixed', name: 'Hỗn số & Bài toán tỉ lệ thuận, nghịch', icon: '🍰', chapter: 'Chương 1' },
    { id: 'g5_decimals_basic', name: 'Số thập phân, cấu tạo hàng & Đổi đơn vị đo', icon: '🔢', chapter: 'Chương 2' },
    { id: 'g5_decimals_calc', name: 'Cộng, trừ, nhân, chia số thập phân', icon: '🧮', chapter: 'Chương 2' },
    { id: 'g5_percentages', name: 'Tỉ số phần trăm & 3 bài toán tỉ số %', icon: '🏷️', chapter: 'Chương 2' },
    { id: 'g5_geometry_plane', name: 'Diện tích tam giác, hình thang, hình tròn', icon: '📐', chapter: 'Chương 3' },
    { id: 'g5_geometry_solid', name: 'Diện tích & Thể tích hình hộp chữ nhật, lập phương', icon: '📦', chapter: 'Chương 3' },
    { id: 'g5_time_units', name: 'Đơn vị thời gian & Cộng trừ nhân chia thời gian', icon: '⏳', chapter: 'Chương 4' },
    { id: 'g5_motion_basic', name: 'Toán chuyển động đều (v, s, t)', icon: '🏎️', chapter: 'Chương 4' },
    { id: 'g5_motion_advanced', name: 'Hai chuyển động gặp nhau, đuổi kịp', icon: '🚀', chapter: 'Chương 4' },
    { id: 'g5_charts_stats', name: 'Biểu đồ hình quạt & Bài toán thực tế chuyển cấp', icon: '📊', chapter: 'Chương 5' },
    { id: 'g5_final_review', name: 'Ôn tập cuối năm & Thi chuyển cấp', icon: '🏆', chapter: 'Chương 5' }
  ]
}`;

const startIndex = content.indexOf('export const TOPICS = {');
const endIndex = content.indexOf('function randInt(min, max)');
if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newTopics + '\n\n' + content.substring(endIndex);
} else {
  console.log('FAILED TO REPLACE TOPICS');
}

const reviewLogic = `
  // ==========================================
  // --- REVIEW GENERATORS (RANDOM PROXY) ---
  // ==========================================
  if (topic === 'g1_final_review') return generateQuestion(1, TOPICS.GRADE_1[randInt(0, 9)].id);
  if (topic === 'g2_review_100') return generateQuestion(1, TOPICS.GRADE_1[randInt(4, 8)].id); 
  if (topic === 'g3_review_1000') return generateQuestion(2, TOPICS.GRADE_2[randInt(4, 9)].id); 
  if (topic === 'g3_final_review') return generateQuestion(3, TOPICS.GRADE_3[randInt(1, 10)].id); 
  if (topic === 'g4_final_review') return generateQuestion(4, TOPICS.GRADE_4[randInt(0, 9)].id); 
  if (topic === 'g5_final_review') return generateQuestion(5, TOPICS.GRADE_5[randInt(0, 9)].id); 

  if (topic === 'g1_numbers_20') {
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = randInt(10, 15);
      const b = randInt(1, 4);
      return {
        question: \`Tính nhẩm: \${a} + \${b} = ?\`,
        options: generateOptions(a + b, 3),
        answer: a + b,
        hint: 'Cộng phần đơn vị trước nhé.',
        explanation: \`\${a} + \${b} = \${a + b}\`
      };
    } else {
      const a = randInt(15, 19);
      const b = randInt(1, 5);
      return {
        question: \`Tính nhẩm: \${a} - \${b} = ?\`,
        options: generateOptions(a - b, 3),
        answer: a - b,
        hint: 'Trừ phần đơn vị trước nhé.',
        explanation: \`\${a} - \${b} = \${a - b}\`
      };
    }
  }

  if (topic === 'g1_shapes_3d') {
    const isCube = Math.random() > 0.5;
    return {
      question: isCube ? 'Hình khối dưới đây là hình gì?' : 'Hình khối dưới đây gọi là gì?',
      visualDisplay: renderShapeVisual(isCube ? 'cube' : 'cuboid'),
      options: ['Khối lập phương', 'Khối hộp chữ nhật', 'Khối trụ', 'Khối cầu'],
      answer: isCube ? 'Khối lập phương' : 'Khối hộp chữ nhật',
      hint: isCube ? 'Nó giống như viên xúc xắc.' : 'Nó giống như hộp giày.',
      explanation: isCube ? 'Khối lập phương có 6 mặt đều là hình vuông.' : 'Khối hộp chữ nhật có các mặt là hình chữ nhật.'
    };
  }

  // ==========================================
  // --- GRADE 1 GENERATORS ---
  // ==========================================
`;

content = content.replace(/\n\s*\/\/ ==========================================\n\s*\/\/ --- GRADE 1 GENERATORS ---\n\s*\/\/ ==========================================/g, reviewLogic);

fs.writeFileSync(filePath, content);
console.log('Updated exerciseGenerator.js successfully and accurately!');
