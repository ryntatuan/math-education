const fs = require('fs');
const path = require('path');
const dataDir = './client/src/data';
const grades = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'];

grades.forEach(g => {
  const dir = path.join(dataDir, g);
  if (!fs.existsSync(dir)) return;
  
  fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
    const fp = path.join(dir, f);
    const content = fs.readFileSync(fp, 'utf8');
    let lines = content.split('\n');
    lines.forEach((l, i) => {
      // Find lone icons followed by \n in a string (e.g. "▢\n...")
      if (l.match(/text:\s*"[▢⭕🔺▭]\\n/)) {
        console.log(`[ICON ISSUE] ${fp}:${i+1}: ${l.trim()}`);
      }
      if (l.match(/KHÔNG bằng nhau/i)) {
        console.log(`[TEXT ISSUE] ${fp}:${i+1}: ${l.trim()}`);
      }
    });
  });
});
