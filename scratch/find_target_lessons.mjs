async function run() {
  const g1 = (await import('../client/src/data/grade1Data.js')).grade1Data
  const g2 = (await import('../client/src/data/grade2Data.js')).grade2Data
  const g3 = (await import('../client/src/data/grade3Data.js')).grade3Data
  const g4 = (await import('../client/src/data/grade4Data.js')).grade4Data
  const g5 = (await import('../client/src/data/grade5Data.js')).grade5Data

  const all = [g1, g2, g3, g4, g5]
  const keywords = ['đồng hồ', 'hình', 'giờ', 'phân số', 'thập phân', 'ki-lô-gam', 'lít', 'chia có dư']

  all.forEach((g, gIdx) => {
    console.log(`\n=== GRADE ${gIdx + 1} TARGET LESSONS ===`)
    g.chapters.forEach(ch => {
      ch.lessons.forEach(l => {
        const titleLower = l.title.toLowerCase()
        if (keywords.some(k => titleLower.includes(k))) {
          console.log(`[${ch.id} / ${l.id}] ${l.title}`)
        }
      })
    })
  })
}
run()
