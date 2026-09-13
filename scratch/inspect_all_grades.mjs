async function run() {
  const g1 = (await import('../client/src/data/grade1Data.js')).grade1Data
  const g2 = (await import('../client/src/data/grade2Data.js')).grade2Data
  const g3 = (await import('../client/src/data/grade3Data.js')).grade3Data
  const g4 = (await import('../client/src/data/grade4Data.js')).grade4Data
  const g5 = (await import('../client/src/data/grade5Data.js')).grade5Data

  const all = [g1, g2, g3, g4, g5]
  all.forEach((g, idx) => {
    const totalLessons = g.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
    console.log(`Grade ${idx + 1}: ${g.chapters.length} chapters, ${totalLessons} lessons`)
  })
}
run()
