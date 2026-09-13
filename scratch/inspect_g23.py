# -*- coding: utf-8 -*-
import re

for g in [2, 3]:
    with open(f'd:/1.Jobs/6.PersonalProject/Education/client/src/data/grade{g}Data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    chaps = re.findall(r'id:\s*[\'"](g\d+-c\d+)[\'"],\s*name:\s*[\'"]([^\'"]+)[\'"]', content)
    total_l = 0
    empty_l = 0
    for cid, cname in chaps:
        start = content.find(f"id: '{cid}'")
        if start == -1:
            start = content.find(f'id: "{cid}"')
        next_start = content.find(f"id: 'g{g}-c", start + 20)
        if next_start == -1:
            next_start = content.find(f'id: "g{g}-c', start + 20)
        seg = content[start:next_start] if next_start != -1 else content[start:]
        lessons = re.findall(r'makeLesson\(\s*[\'"]([^\'"]+)[\'"],\s*[\'"]([^\'"]+)[\'"]', seg)
        total_l += len(lessons)
    print(f"Grade {g}: {len(chaps)} chapters, {total_l} lessons total")
