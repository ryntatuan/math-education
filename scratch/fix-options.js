const fs = require('fs');
let f = fs.readFileSync('./client/src/data/grade1/g1c2.js', 'utf8');

f = f.replace(/options:\s*\[\s*"([^"]+)",\s*"hình khối lập phương",\s*"hình khối hộp chữ nhật",\s*"hình khối trụ"\s*\]/g, 
  'options: [\n              "hình vuông",\n              "hình tròn",\n              "hình tam giác",\n              "hình chữ nhật"\n            ]'
);

fs.writeFileSync('./client/src/data/grade1/g1c2.js', f);
console.log('Fixed g1c2.js');
