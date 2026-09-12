import assert from 'node:assert'
import { generateQuestion, TOPICS } from '../client/src/utils/exerciseGenerator.js'

function parsePracticeQuestion(q) {
  if (!q) return { type: 'text_riddle', badge: '💡 Câu hỏi', title: '', content: '' }

  const visual = q.visualDisplay || q.shapeVisual || q.visual

  if (visual) {
    return {
      type: 'visual',
      title: q.question,
      visual,
    }
  }

  if (q.question && q.question.includes(':')) {
    const parts = q.question.split(':')
    const prompt = parts[0].trim() + ':'
    const equation = parts.slice(1).join(':').trim()
    return {
      type: 'calc',
      title: prompt,
      equation,
      icon: prompt.toLowerCase().includes('dấu') ? '⚖️' : '🧮',
    }
  }

  const isMathExpr =
    q.question &&
    /^[\d\s+\-×x*÷/:=.<>?a-zA-Z]+$/.test(q.question) &&
    /[\d]/.test(q.question) &&
    /[+\-×x*÷/:=.<>]/.test(q.question)
  if (isMathExpr && q.question.length <= 25) {
    return {
      type: 'calc',
      title: 'Tính nhẩm:',
      equation: q.question,
      icon: '🧮',
    }
  }

  const isGeometry =
    q.question &&
    (q.question.toLowerCase().includes('hình') ||
      q.question.toLowerCase().includes('cạnh') ||
      q.question.toLowerCase().includes('đo') ||
      q.question.toLowerCase().includes('chu vi'))
  return {
    type: 'text_riddle',
    badge: isGeometry ? '🔷 Câu hỏi hình học' : '💡 Bài toán tư duy',
    title: 'Câu hỏi:',
    content: q.question,
  }
}

console.log('Testing g1_count generator and parser...')
for (let i = 0; i < 50; i++) {
  const q = generateQuestion(1, 'g1_count')
  assert.ok(q.visualDisplay, 'g1_count question must have visualDisplay')
  const parsed = parsePracticeQuestion(q)
  assert.strictEqual(parsed.type, 'visual', 'parsed type must be visual')
  assert.ok(parsed.visual, 'parsed visual must exist')
  const countItems = parsed.visual.trim().split(/\s+/).length
  assert.strictEqual(countItems, q.answer, 'visual item count must match answer')
}
console.log('✅ Passed 50 g1_count visual checks!')

console.log('Testing g1_shapes generator and parser...')
for (let i = 0; i < 30; i++) {
  const q = generateQuestion(1, 'g1_shapes')
  const parsed = parsePracticeQuestion(q)
  assert.ok(parsed.type === 'visual' || parsed.type === 'text_riddle', 'parsed type must be visual or text_riddle')
}
console.log('✅ Passed 30 g1_shapes checks!')

console.log('ALL PRACTICE UI TESTS PASSED!')
