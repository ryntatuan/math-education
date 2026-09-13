import re

for g in [1, 2, 3, 4, 5]:
    try:
        with open(f'd:/1.Jobs/6.PersonalProject/Education/client/src/data/grade{g}Data.js', 'r', encoding='utf-8') as f:
            content = f.read()
            chaps = re.findall(r'id:\s*[\'\"](g\d+-c\d+)[\'\"]', content)
            lessons = re.findall(r'makeLesson\(\s*[\'\"](g\d+-c\d+-l\d+)[\'\"]', content)
            print(f'Grade {g}: {len(chaps)} chapters, {len(lessons)} lessons')
    except Exception as e:
        print(f'Grade {g}: error {e}')
