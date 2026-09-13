# -*- coding: utf-8 -*-
import re

for g in [1, 2, 3]:
    with open(f'd:/1.Jobs/6.PersonalProject/Education/client/src/data/grade{g}Data.js', 'r', encoding='utf-8') as f:
        content = f.read()
        chap_matches = re.findall(r'id:\s*[\'"](g\d+-c\d+)[\'"],\s*name:\s*[\'"]([^\'"]+)[\'"]', content)
        print(f"=== Grade {g} ({len(chap_matches)} chapters) ===")
        for cid, cname in chap_matches:
            print(f"  {cid}: {cname}")
