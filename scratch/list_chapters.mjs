import fs from 'fs'

for (let g = 1; g <= 5; g++) {
  const code = fs.readFileSync(`client/src/data/grade${g}Data.js`, 'utf8')
  const chapters = [...code.matchAll(/"name":\s*"([^"]+)"/g)].map(m => m[1])
  console.log(`=== GRADE ${g} ===`)
  chapters.forEach(ch => console.log('  -', ch))
}
