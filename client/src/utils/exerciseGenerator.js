// Dynamic Exercise Generator for Grades 1, 2, 3, 4, 5
// Aligned 100% with Vietnam Primary Education Curriculum (SGK Chuan Bo Giao Duc)
import React from 'react'

export const renderShapeVisual = (shapeType, params = {}) => {
  if (shapeType === 'circle') {
    return React.createElement(
      'svg',
      { width: 90, height: 90, viewBox: '0 0 90 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('circle', { cx: 45, cy: 45, r: 38, fill: '#FF6B6B', stroke: '#C92A2A', strokeWidth: 4 })
    )
  }
  if (shapeType === 'square') {
    return React.createElement(
      'svg',
      { width: 90, height: 90, viewBox: '0 0 90 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('rect', { x: 8, y: 8, width: 74, height: 74, rx: 6, fill: '#4DABF7', stroke: '#1864AB', strokeWidth: 4 })
    )
  }
  if (shapeType === 'rectangle') {
    return React.createElement(
      'svg',
      { width: 160, height: 90, viewBox: '0 0 160 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('rect', { x: 8, y: 12, width: 144, height: 66, rx: 6, fill: '#51CF66', stroke: '#2B8A3E', strokeWidth: 4 })
    )
  }
  if (shapeType === 'triangle') {
    return React.createElement(
      'svg',
      { width: 100, height: 90, viewBox: '0 0 100 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('polygon', { points: '50,8 92,80 8,80', fill: '#FFA94D', stroke: '#D9480F', strokeWidth: 4, strokeLinejoin: 'round' })
    )
  }
  if (shapeType === 'parallelogram') {
    return React.createElement(
      'svg',
      { width: 160, height: 90, viewBox: '0 0 160 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('polygon', { points: '35,12 150,12 125,78 10,78', fill: '#E599F7', stroke: '#862E9C', strokeWidth: 4, strokeLinejoin: 'round' }),
      React.createElement('line', { x1: 35, y1: 12, x2: 35, y2: 78, stroke: '#495057', strokeWidth: 2, strokeDasharray: '4,4' }),
      React.createElement('text', { x: 40, y: 50, fill: '#862E9C', fontSize: '13', fontWeight: 'bold' }, 'h'),
      React.createElement('text', { x: 65, y: 88, fill: '#862E9C', fontSize: '13', fontWeight: 'bold' }, 'a (đáy)')
    )
  }
  if (shapeType === 'rhombus') {
    return React.createElement(
      'svg',
      { width: 120, height: 100, viewBox: '0 0 120 100', style: { display: 'block', margin: 'auto' } },
      React.createElement('polygon', { points: '60,8 112,50 60,92 8,50', fill: '#63E6BE', stroke: '#0CA678', strokeWidth: 4, strokeLinejoin: 'round' }),
      React.createElement('line', { x1: 60, y1: 8, x2: 60, y2: 92, stroke: '#087F5B', strokeWidth: 2, strokeDasharray: '3,3' }),
      React.createElement('line', { x1: 8, y1: 50, x2: 112, y2: 50, stroke: '#087F5B', strokeWidth: 2, strokeDasharray: '3,3' })
    )
  }
  if (shapeType === 'trapezoid') {
    return React.createElement(
      'svg',
      { width: 160, height: 90, viewBox: '0 0 160 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('polygon', { points: '40,15 120,15 150,78 10,78', fill: '#FFD43B', stroke: '#F59F00', strokeWidth: 4, strokeLinejoin: 'round' }),
      React.createElement('line', { x1: 40, y1: 15, x2: 40, y2: 78, stroke: '#495057', strokeWidth: 2, strokeDasharray: '4,4' }),
      React.createElement('text', { x: 70, y: 12, fill: '#E67700', fontSize: '12', fontWeight: 'bold' }, 'b (đáy bé)'),
      React.createElement('text', { x: 65, y: 88, fill: '#E67700', fontSize: '12', fontWeight: 'bold' }, 'a (đáy lớn)'),
      React.createElement('text', { x: 44, y: 50, fill: '#495057', fontSize: '12', fontWeight: 'bold' }, 'h')
    )
  }
  if (shapeType === 'circle_r') {
    return React.createElement(
      'svg',
      { width: 100, height: 100, viewBox: '0 0 100 100', style: { display: 'block', margin: 'auto' } },
      React.createElement('circle', { cx: 50, cy: 50, r: 42, fill: '#EBFBEE', stroke: '#40C057', strokeWidth: 4 }),
      React.createElement('circle', { cx: 50, cy: 50, r: 3, fill: '#2B8A3E' }),
      React.createElement('line', { x1: 50, y1: 50, x2: 92, y2: 50, stroke: '#2B8A3E', strokeWidth: 3 }),
      React.createElement('text', { x: 42, y: 46, fill: '#2B8A3E', fontSize: '12', fontWeight: 'bold' }, 'O'),
      React.createElement('text', { x: 66, y: 44, fill: '#2B8A3E', fontSize: '13', fontWeight: 'bold' }, 'r')
    )
  }
  if (shapeType === 'cuboid') {
    return React.createElement(
      'svg',
      { width: 130, height: 100, viewBox: '0 0 130 100', style: { display: 'block', margin: 'auto' } },
      // Front face
      React.createElement('rect', { x: 15, y: 35, width: 75, height: 50, fill: '#A5D8FF', stroke: '#1971C2', strokeWidth: 3 }),
      // Top face
      React.createElement('polygon', { points: '15,35 45,10 120,10 90,35', fill: '#D0EBFF', stroke: '#1971C2', strokeWidth: 3 }),
      // Side face
      React.createElement('polygon', { points: '90,35 120,10 120,60 90,85', fill: '#74C0FC', stroke: '#1971C2', strokeWidth: 3 })
    )
  }
  if (shapeType === 'cube') {
    return React.createElement(
      'svg',
      { width: 110, height: 100, viewBox: '0 0 110 100', style: { display: 'block', margin: 'auto' } },
      React.createElement('rect', { x: 15, y: 35, width: 55, height: 55, fill: '#FFD8A8', stroke: '#E8590C', strokeWidth: 3 }),
      React.createElement('polygon', { points: '15,35 40,12 95,12 70,35', fill: '#FFE8CC', stroke: '#E8590C', strokeWidth: 3 }),
      React.createElement('polygon', { points: '70,35 95,12 95,67 70,90', fill: '#FFA94D', stroke: '#E8590C', strokeWidth: 3 })
    )
  }
  return null
}

export const TOPICS = {
  GRADE_1: [
    { id: 'g1_count', name: 'Đếm hình & Nhận biết số (0-20)', icon: '🔢' },
    { id: 'g1_add_sub_10', name: 'Phép cộng, phép trừ phạm vi 10', icon: '➕' },
    { id: 'g1_compare', name: 'So sánh lớn hơn, bé hơn, bằng (>, <, =)', icon: '⚖️' },
    { id: 'g1_add_sub_20', name: 'Phép cộng, phép trừ phạm vi 20', icon: '➕' },
    { id: 'g1_numbers_100', name: 'Các số đến 100, chục và đơn vị', icon: '💯' },
    { id: 'g1_add_sub_100', name: 'Cộng trừ không nhớ phạm vi 100', icon: '🧮' },
    { id: 'g1_shapes', name: 'Nhận biết hình phẳng & hình khối', icon: '🔷' },
    { id: 'g1_time_clock', name: 'Xem đồng hồ giờ đúng & Các ngày trong tuần', icon: '⏰' },
  ],
  GRADE_2: [
    { id: 'g2_add_sub_100', name: 'Cộng trừ có nhớ phạm vi 100', icon: '🧮' },
    { id: 'g2_mul_2345', name: 'Bảng nhân 2 và Bảng nhân 5', icon: '✖️' },
    { id: 'g2_div_2345', name: 'Bảng chia 2 và Bảng chia 5', icon: '➗' },
    { id: 'g2_numbers_1000', name: 'Các số đến 1000 & So sánh số tròn trăm', icon: '💯' },
    { id: 'g2_add_sub_1000', name: 'Phép cộng, phép trừ trong phạm vi 1000', icon: '➕' },
    { id: 'g2_measure', name: 'Đo lường (kg, lít, dm, m, km)', icon: '📏' },
    { id: 'g2_components', name: 'Tìm thành phần phép tính (+, -, ×, ÷)', icon: '🔍' },
    { id: 'g2_geometry', name: 'Đường gấp khúc, hình tứ giác, khối trụ, cầu', icon: '📐' },
    { id: 'g2_time_calendar', name: 'Xem đồng hồ (giờ, phút) & Lịch tháng', icon: '📅' },
    { id: 'g2_stats_prob', name: 'Biểu đồ tranh & Chắc chắn, có thể, không thể', icon: '📊' },
  ],
  GRADE_3: [
    { id: 'g3_mul_6789', name: 'Bảng nhân 6, 7, 8, 9', icon: '✖️' },
    { id: 'g3_div_6789', name: 'Bảng chia 6, 7, 8, 9 & Phép chia có dư', icon: '➗' },
    { id: 'g3_fraction', name: 'Phân số đơn giản: Một phần mấy (1/2, 1/3...)', icon: '🍰' },
    { id: 'g3_mul_div_multi', name: 'Nhân chia số 2, 3, 4 chữ số với số 1 chữ số', icon: '🧮' },
    { id: 'g3_numbers_100k', name: 'Các số đến 100 000 & Chữ số La Mã', icon: '🏛️' },
    { id: 'g3_perimeter_area', name: 'Chu vi & Diện tích HCN, hình vuông (cm²)', icon: '📐' },
    { id: 'g3_measure_units', name: 'Đơn vị mm, gam, ml, nhiệt độ & Tiền Việt Nam', icon: '🪙' },
    { id: 'g3_expressions', name: 'Biểu thức số & Tính giá trị biểu thức', icon: '🔢' },
    { id: 'g3_word_problems', name: 'Bài toán giải bằng 2 bước tính', icon: '💡' },
    { id: 'g3_stats_prob', name: 'Bảng số liệu & Khả năng xảy ra sự kiện', icon: '📊' },
  ],
  GRADE_4: [
    { id: 'g4_numbers_million', name: 'Số tự nhiên đến lớp triệu, hàng và lớp', icon: '🔢' },
    { id: 'g4_add_sub_natural', name: 'Phép cộng, trừ số tự nhiên nhiều chữ số', icon: '➕' },
    { id: 'g4_mul_div_natural', name: 'Nhân, chia số nhiều chữ số & Nhân nhẩm với 11', icon: '✖️' },
    { id: 'g4_sum_diff', name: 'Tìm hai số khi biết Tổng và Hiệu', icon: '⚖️' },
    { id: 'g4_divisibility', name: 'Dấu hiệu chia hết cho 2, 5, 9, 3', icon: '🎯' },
    { id: 'g4_fractions_basic', name: 'Phân số bằng nhau, rút gọn, quy đồng & so sánh', icon: '🍰' },
    { id: 'g4_fractions_calc', name: 'Bốn phép tính phân số (+, -, ×, ÷)', icon: '🧮' },
    { id: 'g4_sum_ratio', name: 'Tìm hai số khi biết Tổng - Tỉ, Hiệu - Tỉ', icon: '💡' },
    { id: 'g4_geometry', name: 'Góc nhọn/tù/bẹt & Diện tích hình bình hành, hình thoi', icon: '📐' },
    { id: 'g4_measures_stats', name: 'Yến, tạ, tấn; dm², m², km²; thế kỉ & Trung bình cộng', icon: '📊' },
  ],
  GRADE_5: [
    { id: 'g5_decimals_basic', name: 'Số thập phân, cấu tạo hàng & Đổi đơn vị đo', icon: '🔢' },
    { id: 'g5_decimals_calc', name: 'Cộng, trừ, nhân, chia số thập phân', icon: '🧮' },
    { id: 'g5_percentages', name: 'Tỉ số phần trăm & 3 bài toán tỉ số %', icon: '🏷️' },
    { id: 'g5_fractions_mixed', name: 'Hỗn số & Bài toán tỉ lệ thuận, nghịch', icon: '🍰' },
    { id: 'g5_geometry_plane', name: 'Diện tích tam giác, hình thang, hình tròn', icon: '📐' },
    { id: 'g5_geometry_solid', name: 'Diện tích & Thể tích hình hộp chữ nhật, lập phương', icon: '📦' },
    { id: 'g5_time_units', name: 'Đơn vị thời gian & Cộng trừ nhân chia thời gian', icon: '⏳' },
    { id: 'g5_motion_basic', name: 'Toán chuyển động đều (v, s, t)', icon: '🏎️' },
    { id: 'g5_motion_advanced', name: 'Hai chuyển động gặp nhau, đuổi kịp', icon: '🚀' },
    { id: 'g5_charts_stats', name: 'Biểu đồ hình quạt & Bài toán thực tế chuyển cấp', icon: '📊' },
  ],
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function generateOptions(correctAnswer, range = 5, isString = false) {
  if (isString) {
    return [correctAnswer]
  }
  const options = new Set([correctAnswer])
  let attempts = 0
  const maxRange = Math.max(range, 3)
  while (options.size < 4 && attempts < 60) {
    attempts++
    const delta = randInt(-maxRange, maxRange)
    const val = correctAnswer + delta
    if (val >= 0 && val !== correctAnswer) {
      options.add(val)
    }
  }
  let fallback = Math.max(0, correctAnswer - 3)
  while (options.size < 4) {
    if (fallback !== correctAnswer && !options.has(fallback)) {
      options.add(fallback)
    }
    fallback++
  }
  return shuffle(Array.from(options))
}

const EMOJIS = ['🍎', '🍊', '⭐', '🎈', '🚗', '🐱', '🐶', '🌸', '🍭', '⚽']

export function generateQuestion(grade = 1, topicId = null) {
  const gNum = Number(grade)
  let topic = topicId
  if (!topic) {
    const topicArr = TOPICS[`GRADE_${gNum}`] || TOPICS.GRADE_1
    topic = topicArr[randInt(0, topicArr.length - 1)].id
  }

  // ==========================================
  // --- GRADE 1 GENERATORS ---
  // ==========================================
  if (topic === 'g1_count') {
    const count = randInt(1, 15)
    const emoji = EMOJIS[randInt(0, EMOJIS.length - 1)]
    const icons = Array(count).fill(emoji).join(' ')
    return {
      question: `Có bao nhiêu ${emoji} ở hình dưới?`,
      visualDisplay: icons,
      options: generateOptions(count, 3),
      answer: count,
      hint: 'Hãy chạm tay đếm từng hình một nhé!',
      explanation: `Đếm được tất cả ${count} hình ${emoji}.`,
    }
  }

  if (topic === 'g1_add_sub_10') {
    const isAdd = Math.random() > 0.4
    if (isAdd) {
      const a = randInt(1, 7)
      const b = randInt(1, 10 - a)
      const ans = a + b
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Bắt đầu từ ${a}, đếm thêm ${b} bước nhé!`,
        explanation: `${a} + ${b} = ${ans}.`,
      }
    } else {
      const a = randInt(2, 10)
      const b = randInt(1, a)
      const ans = a - b
      return {
        question: `Tính nhẩm: ${a} - ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Có ${a}, bớt đi ${b} còn lại mấy?`,
        explanation: `${a} - ${b} = ${ans}.`,
      }
    }
  }

  if (topic === 'g1_compare') {
    const a = randInt(0, 20)
    let b = randInt(0, 20)
    if (Math.random() < 0.25) b = a
    let ans = '='
    if (a > b) ans = '>'
    if (a < b) ans = '<'
    return {
      question: `Điền dấu thích hợp vào chỗ trống: ${a} ... ${b}`,
      options: ['>', '<', '='],
      answer: ans,
      hint: 'Mũi tên nhọn luôn chĩa về phía số bé hơn!',
      explanation: `${a} ${ans} ${b}.`,
    }
  }

  if (topic === 'g1_add_sub_20') {
    const isAdd = Math.random() > 0.5
    if (isAdd) {
      const a = randInt(6, 12)
      const b = randInt(2, 20 - a)
      const ans = a + b
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 4),
        answer: ans,
        hint: `Tách số hoặc đếm thêm: ${a} + ${b} = ${ans}!`,
        explanation: `${a} + ${b} = ${ans}.`,
      }
    } else {
      const a = randInt(11, 20)
      const b = randInt(2, a - 1)
      const ans = a - b
      return {
        question: `Tính nhẩm: ${a} - ${b} = ?`,
        options: generateOptions(ans, 4),
        answer: ans,
        hint: `Lấy ${a} trừ đi ${b} bằng bao nhiêu?`,
        explanation: `${a} - ${b} = ${ans}.`,
      }
    }
  }

  if (topic === 'g1_numbers_100') {
    const chuc = randInt(2, 9)
    const donVi = randInt(0, 9)
    const num = chuc * 10 + donVi
    return {
      question: `Số gồm ${chuc} chục và ${donVi} đơn vị là số nào?`,
      options: generateOptions(num, 10),
      answer: num,
      hint: `${chuc} chục là ${chuc * 10}, thêm ${donVi} đơn vị!`,
      explanation: `${chuc} chục và ${donVi} đơn vị viết là ${num}.`,
    }
  }

  if (topic === 'g1_add_sub_100') {
    const a = randInt(20, 70)
    const b = randInt(1, 9)
    const ans = a + b
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 5),
      answer: ans,
      hint: `Cộng hàng đơn vị trước: 0 + ${b} = ${b}!`,
      explanation: `${a} + ${b} = ${ans}.`,
    }
  }

  if (topic === 'g1_shapes') {
    const shapes = [
      { name: 'Hình tròn', type: 'circle' },
      { name: 'Hình vuông', type: 'square' },
      { name: 'Hình chữ nhật', type: 'rectangle' },
      { name: 'Hình tam giác', type: 'triangle' },
    ]
    const chosen = shapes[randInt(0, shapes.length - 1)]
    return {
      question: 'Hình dưới đây là hình gì?',
      visualDisplay: renderShapeVisual(chosen.type),
      options: shuffle(['Hình tròn', 'Hình vuông', 'Hình chữ nhật', 'Hình tam giác']),
      answer: chosen.name,
      hint: 'Quan sát các cạnh và góc của hình nhé!',
      explanation: `Đây chính là ${chosen.name}.`,
    }
  }

  if (topic === 'g1_time_clock') {
    const hour = randInt(1, 12)
    return {
      question: `Đồng hồ có kim ngắn chỉ số ${hour}, kim dài chỉ số 12. Hỏi lúc đó là mấy giờ?`,
      options: shuffle([`${hour} giờ`, `${(hour % 12) + 1} giờ`, `${hour > 1 ? hour - 1 : 12} giờ`, '12 giờ']),
      answer: `${hour} giờ`,
      hint: 'Kim ngắn chỉ số nào là đúng số giờ đó khi kim dài chỉ số 12!',
      explanation: `Kim ngắn chỉ ${hour}, kim dài chỉ 12 là ${hour} giờ đúng.`,
    }
  }

  // ==========================================
  // --- GRADE 2 GENERATORS ---
  // ==========================================
  if (topic === 'g2_add_sub_100') {
    const a = randInt(25, 68)
    const b = randInt(15, 95 - a)
    const ans = a + b
    return {
      question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options: generateOptions(ans, 5),
      answer: ans,
      hint: 'Cộng hàng đơn vị trước, nhớ 1 sang hàng chục nhé!',
      explanation: `${a} + ${b} = ${ans}.`,
    }
  }

  if (topic === 'g2_mul_2345') {
    const table = Math.random() > 0.5 ? 2 : 5
    const multiplier = randInt(1, 10)
    const ans = table * multiplier
    return {
      question: `Tính nhẩm: ${table} × ${multiplier} = ?`,
      options: generateOptions(ans, table * 2),
      answer: ans,
      hint: `Đếm thêm ${table} liên tiếp ${multiplier} lần!`,
      explanation: `${table} × ${multiplier} = ${ans}.`,
    }
  }

  if (topic === 'g2_div_2345') {
    const divisor = Math.random() > 0.5 ? 2 : 5
    const quotient = randInt(1, 10)
    const dividend = divisor * quotient
    return {
      question: `Tính nhẩm: ${dividend} : ${divisor} = ?`,
      options: generateOptions(quotient, 3),
      answer: quotient,
      hint: `${divisor} nhân mấy thì bằng ${dividend}?`,
      explanation: `${dividend} : ${divisor} = ${quotient} (vì ${divisor} × ${quotient} = ${dividend}).`,
    }
  }

  if (topic === 'g2_numbers_1000') {
    const num = randInt(100, 999)
    const hundreds = Math.floor(num / 100)
    const tens = Math.floor((num % 100) / 10)
    const units = num % 10
    return {
      question: `Số ${num} gồm mấy trăm, mấy chục và mấy đơn vị?`,
      options: shuffle([
        `${hundreds} trăm, ${tens} chục, ${units} đơn vị`,
        `${tens} trăm, ${hundreds} chục, ${units} đơn vị`,
        `${hundreds} trăm, ${units} chục, ${tens} đơn vị`,
        `${units} trăm, ${tens} chục, ${hundreds} đơn vị`,
      ]),
      answer: `${hundreds} trăm, ${tens} chục, ${units} đơn vị`,
      hint: 'Đếm từ trái sang phải: hàng trăm, hàng chục, hàng đơn vị!',
      explanation: `${num} = ${hundreds} trăm + ${tens} chục + ${units} đơn vị.`,
    }
  }

  if (topic === 'g2_add_sub_1000') {
    const a = randInt(200, 600)
    const b = randInt(100, 900 - a)
    const ans = a + b
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 50),
      answer: ans,
      hint: 'Cộng hàng đơn vị, hàng chục rồi hàng trăm nhé!',
      explanation: `${a} + ${b} = ${ans}.`,
    }
  }

  if (topic === 'g2_measure') {
    const val = randInt(2, 9)
    return {
      question: `Đổi: ${val} m = ... dm`,
      options: shuffle([val * 10, val * 100, val, val * 5]),
      answer: val * 10,
      hint: '1 m = 10 dm!',
      explanation: `Vì 1 m = 10 dm nên ${val} m = ${val * 10} dm.`,
    }
  }

  if (topic === 'g2_components') {
    const a = randInt(10, 40)
    const x = randInt(5, 20)
    const sum = a + x
    return {
      question: `Tìm x, biết: ${a} + x = ${sum}`,
      options: generateOptions(x, 4),
      answer: x,
      hint: 'Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết!',
      explanation: `x = ${sum} - ${a} = ${x}.`,
    }
  }

  if (topic === 'g2_geometry') {
    const l1 = randInt(3, 8)
    const l2 = randInt(3, 8)
    const l3 = randInt(3, 8)
    const total = l1 + l2 + l3
    return {
      question: `Đường gấp khúc ABC gồm 3 đoạn có độ dài lần lượt là ${l1} cm, ${l2} cm và ${l3} cm. Độ dài đường gấp khúc là:`,
      options: generateOptions(total, 5),
      answer: total,
      hint: 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng cộng lại!',
      explanation: `${l1} + ${l2} + ${l3} = ${total} cm.`,
    }
  }

  if (topic === 'g2_time_calendar') {
    const days = [30, 31, 28, 31]
    return {
      question: 'Một tuần lễ có bao nhiêu ngày?',
      options: shuffle([7, 5, 6, 8]),
      answer: 7,
      hint: 'Từ Thứ Hai đến Chủ Nhật có bao nhiêu ngày?',
      explanation: 'Một tuần lễ có đúng 7 ngày.',
    }
  }

  if (topic === 'g2_stats_prob') {
    return {
      question: 'Mặt trời mọc ở hướng Đông là sự kiện:',
      options: shuffle(['Chắc chắn xảy ra', 'Có thể xảy ra', 'Không thể xảy ra']),
      answer: 'Chắc chắn xảy ra',
      hint: 'Mỗi buổi sáng mặt trời luôn luôn mọc ở hướng Đông!',
      explanation: 'Mặt trời mọc ở hướng Đông là một quy luật tự nhiên chắc chắn xảy ra.',
    }
  }

  // ==========================================
  // --- GRADE 3 GENERATORS ---
  // ==========================================
  if (topic === 'g3_mul_6789') {
    const t = [6, 7, 8, 9][randInt(0, 3)]
    const m = randInt(2, 9)
    const ans = t * m
    return {
      question: `Tính nhẩm: ${t} × ${m} = ?`,
      options: generateOptions(ans, 8),
      answer: ans,
      hint: `Nhẩm bảng nhân ${t}: ${t} × ${m} = ${ans}!`,
      explanation: `${t} × ${m} = ${ans}.`,
    }
  }

  if (topic === 'g3_div_6789') {
    const d = [6, 7, 8, 9][randInt(0, 3)]
    const q = randInt(3, 9)
    const r = randInt(1, d - 1)
    const dividend = d * q + r
    return {
      question: `Tính: ${dividend} : ${d} = ?`,
      options: shuffle([
        `${q} (dư ${r})`,
        `${q + 1} (dư ${r})`,
        `${q} (dư ${r + 1 >= d ? 1 : r + 1})`,
        `${q - 1} (dư ${r})`,
      ]),
      answer: `${q} (dư ${r})`,
      hint: `Tìm số lớn nhất nhân với ${d} mà bé hơn ${dividend}!`,
      explanation: `${dividend} = ${d} × ${q} + ${r}, thương là ${q} dư ${r}.`,
    }
  }

  if (topic === 'g3_fraction') {
    const den = [2, 3, 4, 5, 6, 7, 8, 9][randInt(0, 7)]
    const total = den * randInt(2, 6)
    const ans = total / den
    return {
      question: `Tìm 1/${den} của ${total} quả táo:`,
      options: generateOptions(ans, 3),
      answer: ans,
      hint: `Muốn tìm 1/${den} của ${total}, ta lấy ${total} chia cho ${den}!`,
      explanation: `${total} : ${den} = ${ans} quả táo.`,
    }
  }

  if (topic === 'g3_mul_div_multi') {
    const a = randInt(12, 85)
    const b = randInt(2, 6)
    const ans = a * b
    return {
      question: `Đặt tính rồi tính: ${a} × ${b} = ?`,
      options: generateOptions(ans, 15),
      answer: ans,
      hint: `Nhân hàng đơn vị trước: ${(a % 10)} × ${b}, nhớ hàng chục!`,
      explanation: `${a} × ${b} = ${ans}.`,
    }
  }

  if (topic === 'g3_numbers_100k') {
    const roman = [
      { r: 'IV', v: 4 },
      { r: 'VI', v: 6 },
      { r: 'IX', v: 9 },
      { r: 'XI', v: 11 },
      { r: 'XIV', v: 14 },
      { r: 'XV', v: 15 },
      { r: 'XIX', v: 19 },
      { r: 'XX', v: 20 },
    ]
    const chosen = roman[randInt(0, roman.length - 1)]
    return {
      question: `Chữ số La Mã "${chosen.r}" biểu diễn số tự nhiên nào?`,
      options: generateOptions(chosen.v, 4),
      answer: chosen.v,
      hint: 'X là 10, V là 5, I là 1. I đứng trước V là 4, đứng trước X là 9!',
      explanation: `Chữ số La Mã ${chosen.r} có giá trị là ${chosen.v}.`,
    }
  }

  if (topic === 'g3_perimeter_area') {
    const isSquare = Math.random() > 0.5
    if (isSquare) {
      const a = randInt(4, 12)
      const perim = a * 4
      return {
        question: `Một hình vuông có cạnh dài ${a} cm. Chu vi hình vuông đó là:`,
        options: generateOptions(perim, 8),
        answer: perim,
        hint: 'Chu vi hình vuông = Cạnh × 4!',
        explanation: `${a} × 4 = ${perim} cm.`,
      }
    } else {
      const d = randInt(5, 12)
      const r = randInt(2, d - 1)
      const area = d * r
      return {
        question: `Hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm. Diện tích của hình chữ nhật là:`,
        options: generateOptions(area, 10),
        answer: area,
        hint: 'Diện tích hình chữ nhật = Chiều dài × Chiều rộng!',
        explanation: `S = ${d} × ${r} = ${area} cm².`,
      }
    }
  }

  if (topic === 'g3_measure_units') {
    const kg = randInt(2, 8)
    return {
      question: `Đổi: ${kg} kg = ... gam`,
      options: shuffle([kg * 1000, kg * 100, kg * 10, kg * 10000]),
      answer: kg * 1000,
      hint: '1 kg = 1000 g!',
      explanation: `${kg} kg = ${kg * 1000} g.`,
    }
  }

  if (topic === 'g3_expressions') {
    const a = randInt(10, 50)
    const b = randInt(2, 9)
    const c = randInt(2, 5)
    const ans = a + b * c
    return {
      question: `Tính giá trị biểu thức: ${a} + ${b} × ${c} = ?`,
      options: generateOptions(ans, 10),
      answer: ans,
      hint: 'Nhớ thực hiện phép nhân trước, cộng sau!',
      explanation: `${a} + (${b} × ${c}) = ${a} + ${b * c} = ${ans}.`,
    }
  }

  if (topic === 'g3_word_problems') {
    const a = randInt(5, 15)
    const times = randInt(2, 4)
    const b = a * times
    const total = a + b
    return {
      question: `Thùng thứ nhất có ${a} lít dầu. Thùng thứ hai có gấp ${times} lần thùng thứ nhất. Hỏi cả hai thùng có bao nhiêu lít dầu?`,
      options: generateOptions(total, 10),
      answer: total,
      hint: `Bước 1: Tìm thùng thứ hai = ${a} × ${times}. Bước 2: Cộng cả hai thùng!`,
      explanation: `Thùng 2 có: ${a} × ${times} = ${b} lít. Cả 2 thùng có: ${a} + ${b} = ${total} lít.`,
    }
  }

  if (topic === 'g3_stats_prob') {
    return {
      question: 'Trong hộp có 5 viên bi đỏ và 5 viên bi xanh. Không nhìn vào hộp, bốc 1 viên bi thì khả năng bốc được bi đỏ là:',
      options: shuffle(['Có thể xảy ra', 'Chắc chắn xảy ra', 'Không thể xảy ra']),
      answer: 'Có thể xảy ra',
      hint: 'Vì có cả bi đỏ và bi xanh nên ta có thể bốc trúng bi đỏ hoặc xanh!',
      explanation: 'Đây là sự kiện có thể xảy ra.',
    }
  }

  // ==========================================
  // --- GRADE 4 GENERATORS ---
  // ==========================================
  if (topic === 'g4_numbers_million') {
    const num = randInt(1, 9)
    return {
      question: `Số ${num} triệu viết dưới dạng số tự nhiên là:`,
      options: shuffle([
        `${num} 000 000`,
        `${num}00 000`,
        `${num}0 000`,
        `${num} 000 000 000`,
      ]),
      answer: `${num} 000 000`,
      hint: 'Số triệu có 6 chữ số 0 đứng sau!',
      explanation: `${num} triệu = ${num} 000 000.`,
    }
  }

  if (topic === 'g4_add_sub_natural') {
    const a = randInt(23500, 84200)
    const b = randInt(12300, 95000 - a)
    const ans = a + b
    return {
      question: `Tính: ${a.toLocaleString('vi-VN')} + ${b.toLocaleString('vi-VN')} = ?`,
      options: generateOptions(ans, 2000),
      answer: ans,
      hint: 'Đặt tính thẳng cột từ phải sang trái!',
      explanation: `${a} + ${b} = ${ans}.`,
    }
  }

  if (topic === 'g4_mul_div_natural') {
    // Mẹo nhân 11
    const n = randInt(21, 85)
    const d1 = Math.floor(n / 10)
    const d2 = n % 10
    const ans = n * 11
    return {
      question: `Tính nhanh: ${n} × 11 = ?`,
      options: generateOptions(ans, 20),
      answer: ans,
      hint: `Cộng 2 chữ số: ${d1} + ${d2} = ${d1 + d2}. Chèn kết quả vào giữa!`,
      explanation: `${n} × 11 = ${ans}.`,
    }
  }

  if (topic === 'g4_sum_diff') {
    const be = randInt(10, 45)
    const hieu = randInt(4, 20)
    const lon = be + hieu
    const tong = lon + be
    const askLon = Math.random() > 0.5
    return {
      question: `Tổng hai số là ${tong}, hiệu hai số là ${hieu}. ${askLon ? 'Số lớn là:' : 'Số bé là:'}`,
      options: shuffle([lon, be, lon + 2, be - 2]),
      answer: askLon ? lon : be,
      hint: askLon ? 'Số lớn = (Tổng + Hiệu) : 2' : 'Số bé = (Tổng - Hiệu) : 2',
      explanation: `Số lớn = (${tong} + ${hieu}) : 2 = ${lon}; Số bé = (${tong} - ${hieu}) : 2 = ${be}.`,
    }
  }

  if (topic === 'g4_divisibility') {
    const base = randInt(12, 90) * 10
    const addVal = [0, 2, 5, 8][randInt(0, 3)]
    const testNum = base + addVal
    const isDiv2 = testNum % 2 === 0
    const isDiv5 = testNum % 5 === 0
    return {
      question: `Số ${testNum} có chia hết cho 5 không?`,
      options: shuffle([
        testNum % 5 === 0 ? 'Có, vì tận cùng là 0 hoặc 5' : 'Không, vì tận cùng không phải 0 hoặc 5',
        testNum % 5 === 0 ? 'Không' : 'Có',
      ]),
      answer: testNum % 5 === 0 ? 'Có, vì tận cùng là 0 hoặc 5' : 'Không, vì tận cùng không phải 0 hoặc 5',
      hint: 'Dấu hiệu chia hết cho 5: chữ số tận cùng là 0 hoặc 5!',
      explanation: `Số ${testNum} có chữ số tận cùng là ${testNum % 10}.`,
    }
  }

  if (topic === 'g4_fractions_basic') {
    const tu = randInt(2, 6)
    const mau = randInt(tu + 1, 9)
    const factor = randInt(2, 5)
    const tuL = tu * factor
    const mauL = mau * factor
    return {
      question: `Rút gọn phân số ${tuL}/${mauL} về phân số tối giản ta được:`,
      options: shuffle([`${tu}/${mau}`, `${tu + 1}/${mau}`, `${tu}/${mau + 1}`, `${tuL}/${mau}`]),
      answer: `${tu}/${mau}`,
      hint: `Chia cả tử và mẫu cho ${factor}!`,
      explanation: `${tuL}/${mauL} = (${tuL}:${factor}) / (${mauL}:${factor}) = ${tu}/${mau}.`,
    }
  }

  if (topic === 'g4_fractions_calc') {
    const isMul = Math.random() > 0.5
    if (isMul) {
      const a = randInt(1, 4)
      const b = randInt(5, 7)
      const c = randInt(1, 3)
      const d = randInt(4, 6)
      const tu = a * c
      const mau = b * d
      return {
        question: `Tính: (${a}/${b}) × (${c}/${d}) = ?`,
        options: shuffle([`${tu}/${mau}`, `${a + c}/${b + d}`, `${tu}/${b * c}`, `${a * d}/${mau}`]),
        answer: `${tu}/${mau}`,
        hint: 'Nhân phân số: Tử nhân tử, mẫu nhân mẫu!',
        explanation: `(${a}/${b}) × (${c}/${d}) = (${a}×${c})/(${b}×${d}) = ${tu}/${mau}.`,
      }
    } else {
      const a = randInt(1, 5)
      const b = randInt(1, 5)
      const m = randInt(7, 12)
      const tu = a + b
      return {
        question: `Tính: ${a}/${m} + ${b}/${m} = ?`,
        options: shuffle([`${tu}/${m}`, `${tu}/${m * 2}`, `${a * b}/${m}`, `${tu - 1}/${m}`]),
        answer: `${tu}/${m}`,
        hint: 'Cộng hai phân số cùng mẫu: Cộng các tử số, giữ nguyên mẫu số!',
        explanation: `${a}/${m} + ${b}/${m} = (${a}+${b})/${m} = ${tu}/${m}.`,
      }
    }
  }

  if (topic === 'g4_sum_ratio') {
    const pBe = randInt(1, 2)
    const pLon = randInt(3, 5)
    const unit = randInt(4, 12)
    const be = pBe * unit
    const lon = pLon * unit
    const tong = be + lon
    return {
      question: `Tổng hai số là ${tong}, tỉ số của hai số là ${pBe}/${pLon}. Số bé là:`,
      options: shuffle([be, lon, be + 2, be - 2]),
      answer: be,
      hint: `Tổng số phần: ${pBe} + ${pLon} = ${pBe + pLon} phần. Giá trị 1 phần = ${tong} : ${pBe + pLon}!`,
      explanation: `Tổng số phần = ${pBe + pLon}. Giá trị 1 phần = ${tong} : ${pBe + pLon} = ${unit}. Số bé = ${unit} × ${pBe} = ${be}.`,
    }
  }

  if (topic === 'g4_geometry') {
    const isParallelogram = Math.random() > 0.5
    if (isParallelogram) {
      const a = randInt(8, 20)
      const h = randInt(4, 12)
      const s = a * h
      return {
        question: `Một hình bình hành có độ dài đáy là ${a} cm và chiều cao ${h} cm. Diện tích hình bình hành là:`,
        visualDisplay: renderShapeVisual('parallelogram'),
        options: generateOptions(s, 20),
        answer: s,
        hint: 'Diện tích hình bình hành S = Đáy × Chiều cao (a × h)!',
        explanation: `S = ${a} × ${h} = ${s} cm².`,
      }
    } else {
      const m = randInt(6, 16)
      const n = randInt(4, 12)
      const s = (m * n) / 2
      return {
        question: `Một hình thoi có độ dài hai đường chéo là ${m} cm và ${n} cm. Diện tích hình thoi là:`,
        visualDisplay: renderShapeVisual('rhombus'),
        options: generateOptions(s, 15),
        answer: s,
        hint: 'Diện tích hình thoi S = (m × n) : 2!',
        explanation: `S = (${m} × ${n}) : 2 = ${s} cm².`,
      }
    }
  }

  if (topic === 'g4_measures_stats') {
    const tan = randInt(2, 9)
    const ta = randInt(1, 9)
    const ansKg = tan * 1000 + ta * 100
    return {
      question: `Đổi: ${tan} tấn ${ta} tạ = ... kg`,
      options: shuffle([ansKg, tan * 100 + ta * 10, tan * 1000 + ta, ansKg + 100]),
      answer: ansKg,
      hint: '1 tấn = 1000 kg, 1 tạ = 100 kg!',
      explanation: `${tan} tấn = ${tan * 1000} kg; ${ta} tạ = ${ta * 100} kg -> ${ansKg} kg.`,
    }
  }

  // ==========================================
  // --- GRADE 5 GENERATORS ---
  // ==========================================
  if (topic === 'g5_decimals_basic') {
    const n = randInt(12, 98)
    const d = randInt(1, 9)
    const val = parseFloat(`${n}.${d}`)
    return {
      question: `Trong số thập phân ${val}, phần thập phân là:`,
      options: shuffle([`0,${d}`, `${d}`, `${n}`, `0,0${d}`]),
      answer: `0,${d}`,
      hint: 'Phần thập phân là phần đứng sau dấu phẩy!',
      explanation: `Số ${val} có phần nguyên là ${n} và phần thập phân là 0,${d}.`,
    }
  }

  if (topic === 'g5_decimals_calc') {
    const a = (randInt(12, 85) / 10).toFixed(1)
    const b = (randInt(11, 45) / 10).toFixed(1)
    const isAdd = Math.random() > 0.5
    if (isAdd) {
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1)
      return {
        question: `Tính: ${a.replace('.', ',')} + ${b.replace('.', ',')} = ?`,
        options: shuffle([
          ans.replace('.', ','),
          (parseFloat(ans) + 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) - 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) + 1).toFixed(1).replace('.', ','),
        ]),
        answer: ans.replace('.', ','),
        hint: 'Đặt tính thẳng cột các dấu phẩy rồi cộng!',
        explanation: `${a} + ${b} = ${ans}.`,
      }
    } else {
      const big = Math.max(parseFloat(a), parseFloat(b))
      const small = Math.min(parseFloat(a), parseFloat(b))
      const ans = (big - small).toFixed(1)
      return {
        question: `Tính: ${big.toFixed(1).replace('.', ',')} - ${small.toFixed(1).replace('.', ',')} = ?`,
        options: shuffle([
          ans.replace('.', ','),
          (parseFloat(ans) + 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) - 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) + 1).toFixed(1).replace('.', ','),
        ]),
        answer: ans.replace('.', ','),
        hint: 'Đặt tính thẳng cột các dấu phẩy rồi trừ!',
        explanation: `${big} - ${small} = ${ans}.`,
      }
    }
  }

  if (topic === 'g5_percentages') {
    const total = [20, 40, 50, 80, 100, 200][randInt(0, 5)]
    const pct = [10, 20, 25, 50, 75][randInt(0, 4)]
    const ans = (total * pct) / 100
    return {
      question: `Tìm ${pct}% của ${total} kg:`,
      options: generateOptions(ans, 10),
      answer: ans,
      hint: `Lấy ${total} nhân với ${pct} rồi chia cho 100!`,
      explanation: `${total} × ${pct} : 100 = ${ans} kg.`,
    }
  }

  if (topic === 'g5_fractions_mixed') {
    const whole = randInt(2, 5)
    const tu = randInt(1, 3)
    const mau = randInt(4, 5)
    const ansTu = whole * mau + tu
    return {
      question: `Chuyển hỗn số ${whole} và ${tu}/${mau} thành phân số:`,
      options: shuffle([`${ansTu}/${mau}`, `${ansTu + 1}/${mau}`, `${whole * tu}/${mau}`, `${ansTu}/${mau + 1}`]),
      answer: `${ansTu}/${mau}`,
      hint: `Tử số = (Phần nguyên × Mẫu) + Tử = (${whole} × ${mau} + ${tu})!`,
      explanation: `${whole} ${tu}/${mau} = (${whole}×${mau}+${tu})/${mau} = ${ansTu}/${mau}.`,
    }
  }

  if (topic === 'g5_geometry_plane') {
    const shapePick = ['triangle', 'trapezoid', 'circle'][randInt(0, 2)]
    if (shapePick === 'triangle') {
      const a = randInt(6, 16)
      const h = randInt(4, 10)
      const s = (a * h) / 2
      return {
        question: `Một hình tam giác có đáy ${a} cm và chiều cao ${h} cm. Diện tích tam giác là:`,
        visualDisplay: renderShapeVisual('triangle'),
        options: generateOptions(s, 10),
        answer: s,
        hint: 'Diện tích tam giác S = (đáy × chiều cao) : 2!',
        explanation: `S = (${a} × ${h}) : 2 = ${s} cm².`,
      }
    } else if (shapePick === 'trapezoid') {
      const a = randInt(10, 18)
      const b = randInt(4, 8)
      const h = randInt(4, 8)
      const s = ((a + b) * h) / 2
      return {
        question: `Hình thang có đáy lớn ${a} cm, đáy bé ${b} cm và chiều cao ${h} cm. Diện tích là:`,
        visualDisplay: renderShapeVisual('trapezoid'),
        options: generateOptions(s, 15),
        answer: s,
        hint: 'S = (đáy lớn + đáy bé) × chiều cao : 2!',
        explanation: `S = (${a} + ${b}) × ${h} : 2 = ${s} cm².`,
      }
    } else {
      const r = randInt(2, 6)
      const s = parseFloat((r * r * 3.14).toFixed(2))
      return {
        question: `Hình tròn có bán kính r = ${r} cm. Diện tích hình tròn đó là:`,
        visualDisplay: renderShapeVisual('circle_r'),
        options: shuffle([
          `${s} cm²`,
          `${(r * 2 * 3.14).toFixed(2)} cm²`,
          `${(s + 3.14).toFixed(2)} cm²`,
          `${(s - 3.14).toFixed(2)} cm²`,
        ]),
        answer: `${s} cm²`,
        hint: 'Diện tích hình tròn S = r × r × 3,14!',
        explanation: `S = ${r} × ${r} × 3,14 = ${s} cm².`,
      }
    }
  }

  if (topic === 'g5_geometry_solid') {
    const isCube = Math.random() > 0.5
    if (isCube) {
      const a = randInt(2, 6)
      const v = a * a * a
      return {
        question: `Một hình lập phương có cạnh dài ${a} cm. Thể tích của hình lập phương là:`,
        visualDisplay: renderShapeVisual('cube'),
        options: generateOptions(v, 15),
        answer: v,
        hint: 'Thể tích hình lập phương V = a × a × a!',
        explanation: `V = ${a} × ${a} × ${a} = ${v} cm³.`,
      }
    } else {
      const a = randInt(4, 8)
      const b = randInt(2, 5)
      const c = randInt(3, 6)
      const v = a * b * c
      return {
        question: `Một hình hộp chữ nhật có kích thước dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích là:`,
        visualDisplay: renderShapeVisual('cuboid'),
        options: generateOptions(v, 20),
        answer: v,
        hint: 'Thể tích hình hộp chữ nhật V = a × b × c!',
        explanation: `V = ${a} × ${b} × ${c} = ${v} cm³.`,
      }
    }
  }

  if (topic === 'g5_time_units') {
    const h = randInt(1, 4)
    const m = randInt(15, 45)
    const totalMinutes = h * 60 + m
    return {
      question: `Đổi: ${h} giờ ${m} phút = ... phút`,
      options: generateOptions(totalMinutes, 20),
      answer: totalMinutes,
      hint: `1 giờ = 60 phút! Lấy ${h} × 60 + ${m}!`,
      explanation: `${h} giờ = ${h * 60} phút; ${h * 60} + ${m} = ${totalMinutes} phút.`,
    }
  }

  if (topic === 'g5_motion_basic') {
    const type = ['v', 's', 't'][randInt(0, 2)]
    if (type === 'v') {
      const s = [90, 120, 150, 180, 240][randInt(0, 4)]
      const t = [2, 3, 4][randInt(0, 2)]
      const v = s / t
      return {
        question: `Một ô tô đi được quãng đường ${s} km trong ${t} giờ. Vận tốc của ô tô là:`,
        options: generateOptions(v, 10).map(x => `${x} km/h`),
        answer: `${v} km/h`,
        hint: 'Vận tốc = Quãng đường : Thời gian (v = s : t)!',
        explanation: `v = ${s} : ${t} = ${v} km/h.`,
      }
    } else if (type === 's') {
      const v = [35, 40, 45, 50, 60][randInt(0, 4)]
      const t = randInt(2, 4)
      const s = v * t
      return {
        question: `Một xe máy chạy với vận tốc ${v} km/h trong ${t} giờ. Quãng đường xe máy đã đi là:`,
        options: generateOptions(s, 30).map(x => `${x} km`),
        answer: `${s} km`,
        hint: 'Quãng đường = Vận tốc × Thời gian (s = v × t)!',
        explanation: `s = ${v} × ${t} = ${s} km.`,
      }
    } else {
      const v = [30, 40, 50, 60][randInt(0, 3)]
      const t = randInt(2, 4)
      const s = v * t
      return {
        question: `Quãng đường AB dài ${s} km, một ô tô đi với vận tốc ${v} km/h. Thời gian ô tô đi hết quãng đường là:`,
        options: generateOptions(t, 2).map(x => `${x} giờ`),
        answer: `${t} giờ`,
        hint: 'Thời gian = Quãng đường : Vận tốc (t = s : v)!',
        explanation: `t = ${s} : ${v} = ${t} giờ.`,
      }
    }
  }

  if (topic === 'g5_motion_advanced') {
    const v1 = [40, 50, 60][randInt(0, 2)]
    const v2 = [30, 40, 50][randInt(0, 2)]
    const t = randInt(2, 3)
    const s = (v1 + v2) * t
    return {
      question: `Hai thành phố cách nhau ${s} km. Hai ô tô khởi hành cùng lúc đi ngược chiều nhau với vận tốc lần lượt là ${v1} km/h và ${v2} km/h. Sau bao lâu hai xe gặp nhau?`,
      options: generateOptions(t, 2).map(x => `${x} giờ`),
      answer: `${t} giờ`,
      hint: `Tổng vận tốc 2 xe = ${v1} + ${v2}. Thời gian gặp nhau = Quãng đường : Tổng vận tốc!`,
      explanation: `Tổng vận tốc = ${v1 + v2} km/h. Thời gian gặp nhau = ${s} : ${v1 + v2} = ${t} giờ.`,
    }
  }

  if (topic === 'g5_charts_stats') {
    return {
      question: 'Biểu đồ hình quạt biểu thị 100% học sinh một trường. Nếu góc quạt môn Toán chiếm 25%, số học sinh thích môn Toán tương ứng với phân số nào?',
      options: shuffle(['1/4', '1/2', '1/5', '3/4']),
      answer: '1/4',
      hint: '25% = 25/100 = 1/4!',
      explanation: '25% rút gọn bằng 1/4.',
    }
  }

  // Fallback default question
  return {
    question: 'Tính: 10 + 5 = ?',
    options: [15, 12, 14, 16],
    answer: 15,
    hint: '10 cộng 5 bằng 15!',
    explanation: '10 + 5 = 15.',
  }
}

export function generateCalculation(grade = 1) {
  const g = Number(grade)
  if (g === 1) {
    const isAdd = Math.random() > 0.4
    if (isAdd) {
      const a = randInt(1, 9)
      const b = randInt(1, Math.min(10 - a, 9))
      const ans = a + b
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      }
    } else {
      const a = randInt(2, 10)
      const b = randInt(1, a - 1)
      const ans = a - b
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      }
    }
  } else if (g === 2) {
    const opType = randInt(1, 4)
    if (opType === 1) {
      const a = randInt(12, 49)
      const b = randInt(11, 49)
      const ans = a + b
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      }
    } else if (opType === 2) {
      const a = randInt(30, 95)
      const b = randInt(11, a - 10)
      const ans = a - b
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      }
    } else if (opType === 3) {
      const a = [2, 5][randInt(0, 1)]
      const b = randInt(2, 9)
      const ans = a * b
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 4),
        answer: ans,
      }
    } else {
      const a = [2, 5][randInt(0, 1)]
      const ans = randInt(2, 9)
      const dividend = a * ans
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 3),
        answer: ans,
      }
    }
  } else if (g === 3) {
    const opType = randInt(1, 4)
    if (opType === 1) {
      const a = randInt(110, 480)
      const b = randInt(110, 480)
      const ans = a + b
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      }
    } else if (opType === 2) {
      const a = randInt(300, 950)
      const b = randInt(110, a - 100)
      const ans = a - b
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      }
    } else if (opType === 3) {
      const a = [6, 7, 8, 9][randInt(0, 3)]
      const b = randInt(3, 9)
      const ans = a * b
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 6),
        answer: ans,
      }
    } else {
      const a = [6, 7, 8, 9][randInt(0, 3)]
      const ans = randInt(3, 9)
      const dividend = a * ans
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 4),
        answer: ans,
      }
    }
  } else if (g === 4) {
    const opType = randInt(1, 4)
    if (opType === 1) {
      const a = randInt(1200, 8500)
      const b = randInt(1200, 8500)
      const ans = a + b
      return {
        question: `${a.toLocaleString('vi-VN')} + ${b.toLocaleString('vi-VN')} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      }
    } else if (opType === 2) {
      const a = randInt(5000, 9900)
      const b = randInt(1000, 4500)
      const ans = a - b
      return {
        question: `${a.toLocaleString('vi-VN')} - ${b.toLocaleString('vi-VN')} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      }
    } else if (opType === 3) {
      const a = randInt(15, 65)
      const ans = a * 11
      return {
        question: `${a} × 11 = ?`,
        equation: `${a} × 11`,
        options: generateOptions(ans, 20),
        answer: ans,
      }
    } else {
      const a = randInt(120, 840)
      const b = [2, 3, 4, 5, 6][randInt(0, 4)]
      const rounded = a - (a % b)
      const ans = rounded / b
      return {
        question: `${rounded} : ${b} = ?`,
        equation: `${rounded} : ${b}`,
        options: generateOptions(ans, 10),
        answer: ans,
      }
    }
  } else {
    // Grade 5
    const isAdd = Math.random() > 0.5
    if (isAdd) {
      const a = (randInt(15, 65) / 10).toFixed(1)
      const b = (randInt(12, 35) / 10).toFixed(1)
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1)
      return {
        question: `${a.replace('.', ',')} + ${b.replace('.', ',')} = ?`,
        equation: `${a.replace('.', ',')} + ${b.replace('.', ',')}`,
        options: shuffle([
          ans.replace('.', ','),
          (parseFloat(ans) + 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) - 0.2).toFixed(1).replace('.', ','),
          (parseFloat(ans) + 1).toFixed(1).replace('.', ','),
        ]),
        answer: ans.replace('.', ','),
      }
    } else {
      const a = randInt(2, 8)
      const ans = a * 10
      return {
        question: `${a},5 × 10 = ?`,
        equation: `${a},5 × 10`,
        options: generateOptions(ans + 5, 5),
        answer: ans + 5,
      }
    }
  }
}

