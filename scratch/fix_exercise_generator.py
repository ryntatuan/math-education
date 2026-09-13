# -*- coding: utf-8 -*-
with open(r'd:\1.Jobs\6.PersonalProject\Education\client\src\utils\exerciseGenerator.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix the map syntax
text = text.replace('options: generateOptions(v, 10).map(x => ${x} km/h),', 'options: generateOptions(v, 10).map(x => `${x} km/h`),')
text = text.replace('options: generateOptions(s, 30).map(x => ${x} km),', 'options: generateOptions(s, 30).map(x => `${x} km`),')
text = text.replace('options: generateOptions(t, 2).map(x => ${x} giờ),', 'options: generateOptions(t, 2).map(x => `${x} giờ`),')
text = text.replace('if (topic === \'g5_motion_advanced\') {\n    const v1 = [40, 50, 60][randInt(0, 2)]\n    const v2 = [30, 40, 50][randInt(0, 2)]\n    const t = randInt(2, 3)\n    const s = (v1 + v2) * t\n    return {\n      question: `Hai thành phố cách nhau ${s} km. Hai ô tô khởi hành cùng lúc đi ngược chiều nhau với vận tốc lần lượt là ${v1} km/h và ${v2} km/h. Sau bao lâu hai xe gặp nhau?`,\n      options: generateOptions(t, 2),',
'if (topic === \'g5_motion_advanced\') {\n    const v1 = [40, 50, 60][randInt(0, 2)]\n    const v2 = [30, 40, 50][randInt(0, 2)]\n    const t = randInt(2, 3)\n    const s = (v1 + v2) * t\n    return {\n      question: `Hai thành phố cách nhau ${s} km. Hai ô tô khởi hành cùng lúc đi ngược chiều nhau với vận tốc lần lượt là ${v1} km/h và ${v2} km/h. Sau bao lâu hai xe gặp nhau?`,\n      options: generateOptions(t, 2).map(x => `${x} giờ`),')

with open(r'd:\1.Jobs\6.PersonalProject\Education\client\src\utils\exerciseGenerator.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed exerciseGenerator.js successfully!")
