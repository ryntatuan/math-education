const fs = require('fs');
let f = fs.readFileSync('./client/src/data/grade1/g1c2.js', 'utf8');

f = f.replace(/text:\s*"▢\\n4 cạnh dài bằng nhau · 4 đỉnh",/g, 'text: "Hình vuông: 4 cạnh dài bằng nhau · 4 đỉnh",');
f = f.replace(/text:\s*"⭕\\nĐường bao cong, không cạnh, không đỉnh",/g, 'text: "Hình tròn: Đường bao cong, không cạnh, không đỉnh",');
f = f.replace(/text:\s*"🔺\\n3 cạnh · 3 đỉnh",/g, 'text: "Hình tam giác: 3 cạnh · 3 đỉnh",');
f = f.replace(/text:\s*"▭\\n2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",/g, 'text: "Hình chữ nhật: 2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",');

f = f.replace(/"Hình chữ nhật khác hình vuông: 4 cạnh KHÔNG bằng nhau\.",/g, '"Hình chữ nhật khác hình vuông: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau.",');
f = f.replace(/"Bốn cạnh không bằng nhau, chỉ hai dài bằng nhau và hai ngắn bằng nhau",/g, '"Chỉ hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau",');

fs.writeFileSync('./client/src/data/grade1/g1c2.js', f);
console.log('Done');
