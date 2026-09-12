// Dynamic Exercise Generator for Grades 1, 2, 3
// Aligned with Vietnam Primary Education Curriculum
import React from 'react'

export const renderShapeVisual = (shapeType) => {
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
      { width: 90, height: 90, viewBox: '0 0 90 90', style: { display: 'block', margin: 'auto' } },
      React.createElement('polygon', { points: '45,8 84,78 6,78', fill: '#FFA94D', stroke: '#D9480F', strokeWidth: 4, strokeLinejoin: 'round' })
    )
  }
  return null
}

export const TOPICS = {
  GRADE_1: [
    { id: 'g1_count', name: 'Đếm hình & Nhận biết số', icon: '🔢' },
    { id: 'g1_add_sub_10', name: 'Cộng trừ phạm vi 10', icon: '➕' },
    { id: 'g1_compare', name: 'So sánh lớn hơn, bé hơn, bằng', icon: '⚖️' },
    { id: 'g1_add_sub_20', name: 'Cộng trừ phạm vi 20', icon: '➕' },
    { id: 'g1_shapes', name: 'Nhận biết hình học', icon: '🔷' },
  ],
  GRADE_2: [
    { id: 'g2_add_sub_100', name: 'Cộng trừ có nhớ phạm vi 100', icon: '🧮' },
    { id: 'g2_mul_2345', name: 'Bảng nhân 2, 3, 4, 5', icon: '✖️' },
    { id: 'g2_div_2345', name: 'Bảng chia 2, 3, 4, 5', icon: '➗' },
    { id: 'g2_numbers_1000', name: 'Số đến 1000 & So sánh', icon: '💯' },
    { id: 'g2_measure', name: 'Đo lường (cm, dm, m, kg, lít)', icon: '📏' },
  ],
  GRADE_3: [
    { id: 'g3_mul_6789', name: 'Bảng nhân 6, 7, 8, 9', icon: '✖️' },
    { id: 'g3_div_6789', name: 'Bảng chia 6, 7, 8, 9 & Có dư', icon: '➗' },
    { id: 'g3_fraction', name: 'Phân số đơn giản (1/2, 1/3, 1/4...)', icon: '🍰' },
    { id: 'g3_geometry', name: 'Chu vi hình vuông, hình chữ nhật', icon: '📐' },
    { id: 'g3_money', name: 'Tiền Việt Nam & Tính tiền', icon: '🪙' },
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
  while (options.size < 4 && attempts < 50) {
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
  // Select topic
  let topic = topicId
  if (!topic) {
    if (grade === 1) topic = TOPICS.GRADE_1[randInt(0, TOPICS.GRADE_1.length - 1)].id
    else if (grade === 2) topic = TOPICS.GRADE_2[randInt(0, TOPICS.GRADE_2.length - 1)].id
    else topic = TOPICS.GRADE_3[randInt(0, TOPICS.GRADE_3.length - 1)].id
  }

  // --- GRADE 1 GENERATORS ---
  if (topic === 'g1_count') {
    const count = randInt(1, 15)
    const emoji = EMOJIS[randInt(0, EMOJIS.length - 1)]
    const icons = Array(count).fill(emoji).join(' ')
    const optSet = new Set([count])
    let attempts = 0
    while (optSet.size < 4 && attempts < 40) {
      attempts++
      const delta = randInt(-3, 3)
      const val = count + delta
      if (val >= 1 && val !== count) {
        optSet.add(val)
      }
    }
    let fallback = Math.max(1, count - 3)
    while (optSet.size < 4) {
      if (fallback !== count && !optSet.has(fallback)) optSet.add(fallback)
      fallback++
    }
    return {
      question: `Có bao nhiêu ${emoji} ở hình dưới?`,
      visualDisplay: icons,
      options: shuffle(Array.from(optSet)),
      answer: count,
      hint: 'Hãy chạm tay đếm từng hình một nhé!',
      explanation: `Đếm được tất cả ${count} hình ${emoji}.`,
    }
  }

  if (topic === 'g1_add_sub_10') {
    const isAdd = Math.random() > 0.4
    if (isAdd) {
      const a = randInt(1, 8)
      const b = randInt(1, 10 - a)
      const ans = a + b
      return {
        question: `Tính nhẩm: ${a} + ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Thử đếm tiếp: bắt đầu từ ${a}, đếm thêm ${b} bước nhé!`,
        explanation: `${a} cộng thêm ${b} bằng ${ans}.`,
      }
    } else {
      const ans = randInt(1, 8)
      const b = randInt(1, 10 - ans)
      const a = ans + b
      return {
        question: `Tính nhẩm: ${a} - ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Bắt đầu từ ${a}, bớt đi ${b} đơn vị nhé!`,
        explanation: `${a} trừ ${b} còn lại ${ans}.`,
      }
    }
  }

  if (topic === 'g1_compare') {
    const a = randInt(1, 20)
    let b = randInt(1, 20)
    if (Math.random() < 0.25) b = a
    const correctSign = a > b ? '>' : a < b ? '<' : '='
    return {
      question: `Điền dấu thích hợp: ${a} ... ${b}`,
      options: ['<', '>', '='],
      answer: correctSign,
      hint: 'Số nào lớn hơn thì miệng dấu ngoặc quay về số đó nhé!',
      explanation: `${a} ${correctSign} ${b}`,
    }
  }

  if (topic === 'g1_add_sub_20') {
    const isAdd = Math.random() > 0.5
    if (isAdd) {
      const a = randInt(10, 16)
      const b = randInt(1, 20 - a)
      const ans = a + b
      return {
        question: `${a} + ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Lấy số đơn vị cộng trước: ${a % 10} + ${b} = ${(a % 10) + b}, rồi thêm 1 chục!`,
        explanation: `${a} + ${b} = ${ans}`,
      }
    } else {
      const a = randInt(11, 20)
      const b = randInt(1, a % 10 || 5)
      const ans = a - b
      return {
        question: `${a} - ${b} = ?`,
        options: generateOptions(ans, 3),
        answer: ans,
        hint: `Lấy ${a % 10} - ${b}, rồi giữ nguyên 1 chục!`,
        explanation: `${a} - ${b} = ${ans}`,
      }
    }
  }

  if (topic === 'g1_shapes') {
    const qType = randInt(1, 3) // 1: Visual SVG, 2: Real-world objects, 3: Geometric properties

    if (qType === 1) {
      const visualShapes = [
        {
          name: 'Hình tròn',
          type: 'circle',
          hint: 'Hình này có đường viền cong tròn khép kín, không có cạnh và góc nào!',
          explanation: 'Đây là Hình tròn vì có đường cong tròn khép kín.',
        },
        {
          name: 'Hình vuông',
          type: 'square',
          hint: 'Đếm xem: có đúng 4 cạnh dài bằng nhau và 4 góc vuông!',
          explanation: 'Đây là Hình vuông vì có 4 cạnh bằng nhau.',
        },
        {
          name: 'Hình chữ nhật',
          type: 'rectangle',
          hint: 'Quan sát kỹ: hình có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau!',
          explanation: 'Đây là Hình chữ nhật vì có 2 cạnh dài và 2 cạnh ngắn.',
        },
        {
          name: 'Hình tam giác',
          type: 'triangle',
          hint: 'Đếm các đỉnh và các cạnh xem: có đúng 3 cạnh và 3 đỉnh!',
          explanation: 'Đây là Hình tam giác vì có đúng 3 đỉnh và 3 cạnh.',
        },
      ]
      const chosen = visualShapes[randInt(0, visualShapes.length - 1)]
      return {
        question: 'Hình vẽ dưới đây là hình gì?',
        visualDisplay: renderShapeVisual(chosen.type),
        options: shuffle(['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật']),
        answer: chosen.name,
        hint: chosen.hint,
        explanation: chosen.explanation,
      }
    } else if (qType === 2) {
      const realObjects = [
        { obj: 'Quyển sách toán hoặc chiếc phong bì', icon: '📖 ✉️', ans: 'Hình chữ nhật', clue: 'có 2 cạnh dài và 2 cạnh ngắn' },
        { obj: 'Cánh cửa ra vào hoặc màn hình tivi', icon: '🚪 📺', ans: 'Hình chữ nhật', clue: 'có 2 cạnh dài và 2 cạnh ngắn' },
        { obj: 'Chiếc bánh chưng ngày Tết hoặc viên gạch hoa', icon: '🥟 🧱', ans: 'Hình vuông', clue: 'có 4 cạnh bằng nhau' },
        { obj: 'Chiếc đồng hồ tròn xoe hoặc chiếc đĩa ăn cơm', icon: '⏰ 🍽️', ans: 'Hình tròn', clue: 'tròn xoe, không có góc cạnh' },
        { obj: 'Bánh xe đạp hoặc chiếc phao bơi', icon: '🚲 🛟', ans: 'Hình tròn', clue: 'lăn tròn được, không có góc cạnh' },
        { obj: 'Miếng bánh pizza hoặc cánh buồm thuyền', icon: '🍕 ⛵', ans: 'Hình tam giác', clue: 'có 3 cạnh và 3 góc nhọn' },
        { obj: 'Biển báo giao thông hình tam giác', icon: '⚠️ 🔺', ans: 'Hình tam giác', clue: 'có đúng 3 cạnh và 3 đỉnh' },
      ]
      const chosen = realObjects[randInt(0, realObjects.length - 1)]
      return {
        question: `${chosen.obj} có dạng hình gì?`,
        visualDisplay: chosen.icon,
        options: shuffle(['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật']),
        answer: chosen.ans,
        hint: `Vật này ${chosen.clue}!`,
        explanation: `${chosen.obj} có dạng ${chosen.ans}.`,
      }
    } else {
      const propQuestions = [
        { q: 'Hình nào dưới đây có đúng 3 cạnh và 3 đỉnh?', ans: 'Hình tam giác', hint: 'Tam có nghĩa là 3!' },
        { q: 'Hình nào dưới đây có 4 cạnh dài bằng nhau?', ans: 'Hình vuông', hint: 'Bốn cạnh đều dài bằng nhau!' },
        { q: 'Hình nào dưới đây có 2 cạnh dài và 2 cạnh ngắn?', ans: 'Hình chữ nhật', hint: 'Có chiều dài và chiều rộng khác nhau!' },
        { q: 'Hình nào dưới đây là đường cong tròn, không có góc cạnh?', ans: 'Hình tròn', hint: 'Hình này tròn xoe và lăn được!' },
      ]
      const chosen = propQuestions[randInt(0, propQuestions.length - 1)]
      return {
        question: chosen.q,
        options: shuffle(['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật']),
        answer: chosen.ans,
        hint: chosen.hint,
        explanation: `Đáp án chính xác là: ${chosen.ans}.`,
      }
    }
  }

  // --- GRADE 2 GENERATORS ---
  if (topic === 'g2_add_sub_100') {
    const isAdd = Math.random() > 0.5
    if (isAdd) {
      const a = randInt(18, 59)
      const b = randInt(15, 38)
      const ans = a + b
      return {
        question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
        options: generateOptions(ans, 5),
        answer: ans,
        hint: `Cộng hàng đơn vị: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, nhớ 1 sang hàng chục!`,
        explanation: `${a} + ${b} = ${ans}`,
      }
    } else {
      const a = randInt(41, 95)
      const b = randInt(16, 38)
      const ans = a - b
      return {
        question: `Tính: ${a} - ${b} = ?`,
        options: generateOptions(ans, 5),
        answer: ans,
        hint: `Nếu hàng đơn vị không trừ được, nhớ mượn 1 chục nhé!`,
        explanation: `${a} - ${b} = ${ans}`,
      }
    }
  }

  if (topic === 'g2_mul_2345') {
    const a = [2, 3, 4, 5][randInt(0, 3)]
    const b = randInt(1, 10)
    const ans = a * b
    return {
      question: `Bảng nhân ${a}: ${a} × ${b} = ?`,
      options: generateOptions(ans, 4),
      answer: ans,
      hint: `${a} nhân ${b} tức là ${b} con số ${a} cộng lại với nhau!`,
      explanation: `${a} × ${b} = ${ans}`,
    }
  }

  if (topic === 'g2_div_2345') {
    const a = [2, 3, 4, 5][randInt(0, 3)]
    const ans = randInt(1, 10)
    const dividend = a * ans
    return {
      question: `Phép chia: ${dividend} : ${a} = ?`,
      options: generateOptions(ans, 3),
      answer: ans,
      hint: `Hỏi: ${a} nhân mấy thì bằng ${dividend}?`,
      explanation: `${dividend} : ${a} = ${ans}`,
    }
  }

  if (topic === 'g2_numbers_1000') {
    const hundred = randInt(1, 9)
    const ten = randInt(0, 9)
    const unit = randInt(0, 9)
    const num = hundred * 100 + ten * 10 + unit
    const optSet = new Set([num])
    const candidates = [
      hundred * 100 + unit * 10 + ten,
      ten * 100 + hundred * 10 + unit,
      num + 10,
      num - 10,
      hundred * 10 + unit,
      (hundred + 1) * 100 + ten * 10 + unit,
      num + 100,
    ]
    for (const c of candidates) {
      if (c > 0 && c !== num && optSet.size < 4) optSet.add(c)
    }
    let fallback = Math.max(100, num - 3)
    while (optSet.size < 4) {
      if (fallback !== num) optSet.add(fallback)
      fallback += 2
    }
    return {
      question: `Số gồm ${hundred} trăm, ${ten} chục và ${unit} đơn vị là số nào?`,
      options: shuffle(Array.from(optSet)),
      answer: num,
      hint: `Hàng trăm viết trước, rồi đến hàng chục, cuối cùng là hàng đơn vị!`,
      explanation: `${hundred} trăm + ${ten} chục + ${unit} đơn vị = ${num}`,
    }
  }

  if (topic === 'g2_measure') {
    const subType = randInt(1, 6)
    if (subType === 1) {
      // Đổi đơn vị mét sang đề-xi-mét hoặc xăng-ti-mét
      const m = randInt(2, 9)
      const toCm = Math.random() > 0.5
      const ans = toCm ? m * 100 : m * 10
      const unit = toCm ? 'cm' : 'dm'
      const optSet = new Set([ans])
      const candidates = toCm ? [m * 10, m, (m + 1) * 100, (m - 1) * 100, m * 1000] : [m * 100, m, (m + 1) * 10, (m - 1) * 10]
      for (const c of candidates) {
        if (c > 0 && c !== ans && optSet.size < 4) optSet.add(c)
      }
      return {
        question: `Điền số thích hợp: ${m} m = ... ${unit}?`,
        options: shuffle(Array.from(optSet)),
        answer: ans,
        hint: toCm ? '1m = 100cm' : '1m = 10dm',
        explanation: `${m} m = ${ans} ${unit}`,
      }
    } else if (subType === 2) {
      // Đổi đơn vị đề-xi-mét sang xăng-ti-mét
      const dm = randInt(2, 9)
      const ans = dm * 10
      const optSet = new Set([ans])
      const candidates = [dm * 100, dm, (dm + 1) * 10, (dm - 1) * 10, dm * 1000]
      for (const c of candidates) {
        if (c > 0 && c !== ans && optSet.size < 4) optSet.add(c)
      }
      return {
        question: `Điền số thích hợp: ${dm} dm = ... cm?`,
        options: shuffle(Array.from(optSet)),
        answer: ans,
        hint: '1dm = 10cm',
        explanation: `${dm} dm = ${ans} cm`,
      }
    } else if (subType === 3) {
      // Toán lời văn về chiều dài
      const total = randInt(25, 80)
      const cut = randInt(10, total - 5)
      const remain = total - cut
      return {
        question: `Sợi dây dài ${total} cm, cắt bớt ${cut} cm. Hỏi sợi dây còn lại dài bao nhiêu cm?`,
        options: generateOptions(remain, 5),
        answer: remain,
        hint: `Lấy ${total} trừ đi ${cut} nhé!`,
        explanation: `${total} - ${cut} = ${remain} cm`,
      }
    } else if (subType === 4) {
      // Toán dung tích (lít)
      const a = randInt(12, 45)
      const b = randInt(8, 30)
      const ans = a + b
      return {
        question: `Thùng thứ nhất có ${a} lít dầu, thùng thứ hai có ${b} lít dầu. Cả hai thùng có bao nhiêu lít dầu?`,
        options: generateOptions(ans, 6),
        answer: ans,
        hint: `Thực hiện phép cộng: ${a} + ${b}`,
        explanation: `${a} + ${b} = ${ans} lít`,
      }
    } else if (subType === 5) {
      // Toán khối lượng (kg)
      const total = randInt(20, 60)
      const used = randInt(5, total - 5)
      const remain = total - used
      return {
        question: `Bao gạo nặng ${total} kg, mẹ đã dùng hết ${used} kg. Hỏi bao gạo còn lại bao nhiêu kg?`,
        options: generateOptions(remain, 5),
        answer: remain,
        hint: `Lấy ${total} trừ đi ${used}`,
        explanation: `${total} - ${used} = ${remain} kg`,
      }
    } else {
      // Câu hỏi lý thuyết đổi đơn vị chuẩn
      const standards = [
        { q: '1 mét (m) bằng bao nhiêu xăng-ti-mét (cm)?', ans: 100, opts: [10, 100, 1000, 50], hint: '1m = 100cm' },
        { q: '1 mét (m) bằng bao nhiêu đề-xi-mét (dm)?', ans: 10, opts: [10, 100, 1000, 5], hint: '1m = 10dm' },
        { q: '1 ki-lô-gam (kg) bằng bao nhiêu gam (g)?', ans: 1000, opts: [10, 100, 1000, 500], hint: '1kg = 1000g' },
        { q: '1 đề-xi-mét (dm) bằng bao nhiêu xăng-ti-mét (cm)?', ans: 10, opts: [1, 10, 100, 20], hint: '1dm = 10cm' },
      ]
      const chosen = standards[randInt(0, standards.length - 1)]
      return {
        question: chosen.q,
        options: shuffle(chosen.opts),
        answer: chosen.ans,
        hint: chosen.hint,
        explanation: `Đáp án đúng là: ${chosen.ans}`,
      }
    }
  }

  // --- GRADE 3 GENERATORS ---
  if (topic === 'g3_mul_6789') {
    const a = [6, 7, 8, 9][randInt(0, 3)]
    const b = randInt(2, 9)
    const ans = a * b
    return {
      question: `Bảng nhân: ${a} × ${b} = ?`,
      options: generateOptions(ans, 6),
      answer: ans,
      hint: `Nhớ lại bảng nhân ${a} nhé!`,
      explanation: `${a} × ${b} = ${ans}`,
    }
  }

  if (topic === 'g3_div_6789') {
    const a = [6, 7, 8, 9][randInt(0, 3)]
    const quotient = randInt(2, 9)
    const dividend = a * quotient
    return {
      question: `Phép chia: ${dividend} : ${a} = ?`,
      options: generateOptions(quotient, 3),
      answer: quotient,
      hint: `Mấy nhân với ${a} bằng ${dividend}?`,
      explanation: `${dividend} : ${a} = ${quotient}`,
    }
  }

  if (topic === 'g3_fraction') {
    const parts = [2, 3, 4, 5, 6][randInt(0, 4)]
    const answer = `1/${parts}`
    const optSet = new Set([answer])

    const candidateDistractors = [
      `1/${parts + 1}`,
      `1/${parts - 1 > 1 ? parts - 1 : parts + 2}`,
      `2/${parts + 1}`,
      `${Math.max(1, parts - 1)}/${parts}`,
      `1/${parts + 2}`,
      `2/${parts + 2}`,
    ]
    for (const dist of candidateDistractors) {
      if (dist !== answer && optSet.size < 4) {
        optSet.add(dist)
      }
    }
    let fallback = 2
    while (optSet.size < 4) {
      optSet.add(`1/${parts + fallback}`)
      fallback++
    }

    return {
      question: `Một chiếc bánh chia đều làm ${parts} phần bằng nhau, bé ăn 1 phần. Hỏi bé đã ăn mấy phần chiếc bánh?`,
      visualDisplay: '🍰',
      options: shuffle(Array.from(optSet)),
      answer,
      hint: `Số phần lấy đi viết ở trên (tử số), tổng số phần chia đều viết ở dưới (mẫu số)!`,
      explanation: `Lấy 1 phần trong ${parts} phần bằng nhau là 1/${parts} chiếc bánh.`,
    }
  }

  if (topic === 'g3_geometry') {
    const isSquare = Math.random() > 0.5
    if (isSquare) {
      const side = randInt(3, 12)
      const perimeter = side * 4
      return {
        question: `Tính chu vi hình vuông có độ dài cạnh bằng ${side} cm:`,
        options: generateOptions(perimeter, 6),
        answer: perimeter,
        hint: 'Chu vi hình vuông = Độ dài một cạnh nhân với 4!',
        explanation: `Chu vi hình vuông = ${side} × 4 = ${perimeter} (cm)`,
      }
    } else {
      const length = randInt(5, 12)
      const width = randInt(2, length - 1)
      const perimeter = (length + width) * 2
      return {
        question: `Tính chu vi hình chữ nhật có chiều dài ${length} cm và chiều rộng ${width} cm:`,
        options: generateOptions(perimeter, 6),
        answer: perimeter,
        hint: 'Chu vi hình chữ nhật = (Chiều dài + Chiều rộng) nhân 2!',
        explanation: `Chu vi = (${length} + ${width}) × 2 = ${perimeter} (cm)`,
      }
    }
  }

  if (topic === 'g3_money') {
    const priceA = randInt(2, 6) * 1000
    const priceB = randInt(1, 4) * 1000
    const total = priceA + priceB
    const optSet = new Set([total])
    const deltas = [-2000, -1000, 1000, 2000, 3000, -3000]
    for (const d of deltas) {
      const val = total + d
      if (val > 0 && val !== total && optSet.size < 4) {
        optSet.add(val)
      }
    }
    return {
      question: `Bạn Nam mua 1 cây bút chì giá ${priceA.toLocaleString('vi-VN')} đồng và 1 cục tẩy giá ${priceB.toLocaleString('vi-VN')} đồng. Nam phải trả bao nhiêu tiền?`,
      options: shuffle(Array.from(optSet)),
      answer: total,
      hint: 'Cộng giá tiền hai món đồ lại với nhau!',
      explanation: `${priceA.toLocaleString('vi-VN')} + ${priceB.toLocaleString('vi-VN')} = ${total.toLocaleString('vi-VN')} đồng`,
    }
  }

  // Fallback simple question
  const a = randInt(2, 9)
  const b = randInt(2, 9)
  return {
    question: `${a} + ${b} = ?`,
    options: generateOptions(a + b, 3),
    answer: a + b,
    hint: `Đếm thêm từ ${a}`,
    explanation: `${a} + ${b} = ${a + b}`,
  }
}

export function generateCalculation(grade = 1) {
  if (grade === 1) {
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
  } else if (grade === 2) {
    const opType = randInt(1, 4) // 1: add, 2: sub, 3: mul, 4: div
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
      const a = [2, 3, 4, 5][randInt(0, 3)]
      const b = randInt(2, 9)
      const ans = a * b
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 4),
        answer: ans,
      }
    } else {
      const a = [2, 3, 4, 5][randInt(0, 3)]
      const ans = randInt(2, 9)
      const dividend = a * ans
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 3),
        answer: ans,
      }
    }
  } else {
    // Grade 3
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
  }
}

