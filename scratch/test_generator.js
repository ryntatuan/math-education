import { TOPICS, generateQuestion } from '../client/src/utils/exerciseGenerator.js'

console.log('Testing Exercise Generator for all 5 Grades...')

let totalTests = 0
let failedTests = 0

for (let grade = 1; grade <= 5; grade++) {
  const topicList = TOPICS[`GRADE_${grade}`]
  if (!topicList || topicList.length === 0) {
    console.error(`Missing topics for Grade ${grade}!`)
    failedTests++
    continue
  }
  console.log(`\n--- GRADE ${grade} (${topicList.length} topics) ---`)
  for (const topic of topicList) {
    for (let i = 0; i < 5; i++) {
      totalTests++
      try {
        const q = generateQuestion(grade, topic.id)
        if (!q.question) throw new Error('Missing question text')
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          throw new Error('Invalid options: ' + JSON.stringify(q.options))
        }
        if (!q.options.includes(q.answer)) {
          throw new Error(`Answer "${q.answer}" not found in options: ${JSON.stringify(q.options)}`)
        }
      } catch (err) {
        console.error(`FAILED on Grade ${grade}, Topic ${topic.id}:`, err.message)
        failedTests++
      }
    }
    console.log(`  ✓ Topic ${topic.id}: ${topic.name} passed 5/5 generation tests`)
  }
}

console.log(`\n=============================`)
console.log(`Total tests run: ${totalTests}`)
console.log(`Failed: ${failedTests}`)
if (failedTests === 0) {
  console.log('ALL GENERATOR TESTS PASSED!')
} else {
  process.exit(1)
}
