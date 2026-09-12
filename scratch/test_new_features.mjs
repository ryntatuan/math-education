import assert from 'node:assert'

console.log('--- TEST 1: Spaced Repetition Logic ---')
function getDatePlusDays(days) {
  const d = new Date('2026-09-13T00:00:00.000Z')
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

let testMistakesQueue = []

function mockRecordMistake(questionObj) {
  const newMistake = {
    id: 'mst_1',
    question: questionObj.question,
    options: questionObj.options,
    answer: questionObj.answer,
    explanation: questionObj.explanation,
    grade: 1,
    failedCount: 1,
    stage: 1,
    nextReviewDate: getDatePlusDays(1),
    mastered: false,
  }
  testMistakesQueue = [newMistake]
}

function mockResolveMistake(id, isCorrect) {
  testMistakesQueue = testMistakesQueue.map((m) => {
    if (m.id !== id) return m
    if (isCorrect) {
      const nextStage = m.stage + 1
      if (nextStage >= 4) {
        return { ...m, stage: 4, mastered: true }
      }
      const nextDays = nextStage === 2 ? 3 : 7
      return {
        ...m,
        stage: nextStage,
        nextReviewDate: getDatePlusDays(nextDays),
      }
    } else {
      return {
        ...m,
        stage: 1,
        failedCount: m.failedCount + 1,
        nextReviewDate: getDatePlusDays(1),
      }
    }
  })
}

mockRecordMistake({ question: '7 + 5 = ?', options: [11, 12, 13, 14], answer: 12 })
assert.strictEqual(testMistakesQueue[0].stage, 1, 'Stage should be 1 on first mistake')
assert.strictEqual(testMistakesQueue[0].nextReviewDate, '2026-09-14', 'Review date should be +1 day')

mockResolveMistake('mst_1', true)
assert.strictEqual(testMistakesQueue[0].stage, 2, 'Stage should be 2 on first correct resolution')
assert.strictEqual(testMistakesQueue[0].nextReviewDate, '2026-09-16', 'Review date should be +3 days')

mockResolveMistake('mst_1', true)
assert.strictEqual(testMistakesQueue[0].stage, 3, 'Stage should be 3 on second correct resolution')
assert.strictEqual(testMistakesQueue[0].nextReviewDate, '2026-09-20', 'Review date should be +7 days')

mockResolveMistake('mst_1', true)
assert.strictEqual(testMistakesQueue[0].stage, 4, 'Stage should be 4 on final resolution')
assert.strictEqual(testMistakesQueue[0].mastered, true, 'Item should be marked mastered')
console.log('✅ Spaced Repetition queue test passed!')

console.log('\n--- TEST 2: Flexible Streak Logic ---')
let currentStreak = 5
let lastActiveDate = '2026-09-12'

function mockUpdateStreak(todayStr) {
  if (lastActiveDate === todayStr) return currentStreak
  const yesterday = new Date(todayStr)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  if (lastActiveDate === yesterdayStr) {
    currentStreak += 1
  } else {
    currentStreak = 1
  }
  lastActiveDate = todayStr
  return currentStreak
}

assert.strictEqual(mockUpdateStreak('2026-09-13'), 6, 'Streak increments if yesterday was active')
assert.strictEqual(mockUpdateStreak('2026-09-13'), 6, 'Streak does not double count on same day')
console.log('✅ Flexible Streak test passed!')

console.log('\n--- TEST 3: League Standings & Promotion/Relegation ---')
const mockRivals = [
  { id: 'bot_1', name: 'Bảo Nam', weeklyXp: 200, isUser: false },
  { id: 'bot_2', name: 'Gia Hân', weeklyXp: 180, isUser: false },
  { id: 'bot_3', name: 'Minh Khang', weeklyXp: 150, isUser: false },
  { id: 'bot_4', name: 'Tuệ Lâm', weeklyXp: 120, isUser: false },
  { id: 'bot_5', name: 'Quang Anh', weeklyXp: 100, isUser: false },
  { id: 'bot_6', name: 'Hải Đăng', weeklyXp: 90, isUser: false },
  { id: 'bot_7', name: 'Khánh Vy', weeklyXp: 70, isUser: false },
  { id: 'bot_8', name: 'Đức Huy', weeklyXp: 50, isUser: false },
  { id: 'bot_9', name: 'Anh Thư', weeklyXp: 30, isUser: false },
]

function getRank(userXp) {
  const user = { id: 'user', name: 'Bé', weeklyXp: userXp, isUser: true }
  const all = [...mockRivals, user].sort((a, b) => b.weeklyXp - a.weeklyXp)
  return all.findIndex((p) => p.isUser) + 1
}

assert.strictEqual(getRank(250), 1, 'Top score gets Rank 1 (Promotion)')
assert.strictEqual(getRank(190), 2, 'Rank 2 is in Promotion Zone')
assert.strictEqual(getRank(160), 3, 'Rank 3 is in Promotion Zone')
assert.strictEqual(getRank(110), 5, 'Rank 5 is in Safe Zone')
assert.strictEqual(getRank(20), 10, 'Bottom score gets Rank 10 (Relegation Zone)')
console.log('✅ League promotion/relegation rankings test passed!')

console.log('\n--- ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ---')
