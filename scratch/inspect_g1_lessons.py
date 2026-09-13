# -*- coding: utf-8 -*-
import re

with open('d:/1.Jobs/6.PersonalProject/Education/client/src/data/grade1Data.js', 'r', encoding='utf-8') as f:
    content = f.read()

chaps = re.findall(r'id:\s*[\'"](g1-c\d+)[\'"],\s*name:\s*[\'"]([^\'"]+)[\'"]', content)
for cid, cname in chaps:
    print(f"\n[{cid}] {cname}")
    # find lessons in this chapter
    # find segment
    start = content.find(f"id: '{cid}'")
    if start == -1:
        start = content.find(f'id: "{cid}"')
    next_start = content.find("id: 'g1-c", start + 20)
    if next_start == -1:
        next_start = content.find('id: "g1-c', start + 20)
    seg = content[start:next_start] if next_start != -1 else content[start:]
    lessons = re.findall(r'makeLesson\(\s*[\'"]([^\'"]+)[\'"],\s*[\'"]([^\'"]+)[\'"]', seg)
    for lid, ltitle in lessons:
        print(f"   {lid}: {ltitle}")
