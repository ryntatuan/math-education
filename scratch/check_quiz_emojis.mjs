import fs from 'fs'

async function run() {
  const g1 = (await import('../client/src/data/grade1Data.js')).grade1Data
  const g2 = (await import('../client/src/data/grade2Data.js')).grade2Data
  const g3 = (await import('../client/src/data/grade3Data.js')).grade3Data
  const g4 = (await import('../client/src/data/grade4Data.js')).grade4Data
  const g5 = (await import('../client/src/data/grade5Data.js')).grade5Data

  const all = [g1, g2, g3, g4, g5]
  all.forEach((g, gIdx) => {
    console.log(`\n=== GRADE ${gIdx + 1} QUIZZES WITH EMOJIS ===`)
    g.chapters.forEach(ch => {
      ch.lessons.forEach(l => {
        l.slides?.forEach((s, sIdx) => {
          if (s.type === 'quiz' && s.content?.question) {
            // Regex to find multiple emojis in question
            const emojiRegex = /[\p{Extended_Pictographic}]/gu
            const emojis = s.content.question.match(emojiRegex) || []
            if (emojis.length >= 2) {
              console.log(`[${l.id} slide ${sIdx + 1}]: "${s.content.question}" (found ${emojis.length} emojis)`)
            }
          }
        })
      })
    })
  })
}
run()
