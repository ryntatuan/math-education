"""
XEM CẤU TRÚC MỘT FILE PDF SÁCH — biết ngay file gồm tập nào, mục lục ở đâu.

Chạy: `python scratch/xem-cau-truc-pdf.py "docs/DataSource/Grade 4/Math grade 4.pdf"`

VÌ SAO CẦN: trước khi viết lại nội dung theo sách mới, phải biết file đang có là **tập 1**, **tập 2**
hay **gộp cả hai**; và mục lục nằm ở trang nào để dựng bảng ánh xạ “trang sách → bài trong app”.
Đếm trang thì không đủ: Lớp 4 hiện có 186 trang, không thể đoán đó là một tập hay hai tập.
"""
import re
import sys

import pymupdf

# 🔴 In tiếng Việt ra ống (pipe) của PowerShell sẽ nổ UnicodeEncodeError vì Python dùng cp1252
#    ⇒ luôn ép stdout sang UTF-8 trước khi in bất cứ thứ gì.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

pdf = sys.argv[1]
doc = pymupdf.open(pdf)
print(f"File: {pdf}\nSố trang: {doc.page_count}")

# 1. Tìm các trang có dấu hiệu "tập" / "mục lục" / "lời nói đầu".
dau_hieu = ("tập một", "tập hai", "mục lục", "lời nói đầu", "nhà xuất bản")
print("\nTrang có dấu hiệu nhận dạng bản sách:")
for i in range(min(doc.page_count, 200)):
    text = doc[i].get_text().lower()
    trung = [d for d in dau_hieu if d in text]
    if trung:
        gon = re.sub(r"\s+", " ", doc[i].get_text())[:160]
        print(f"  tr.{i + 1}: {', '.join(trung)} → {gon}")

# 2. In vài trang đầu để nhìn tiêu đề bìa / năm in.
print("\nBa trang đầu:")
for i in range(min(3, doc.page_count)):
    gon = re.sub(r"\s+", " ", doc[i].get_text())[:220]
    print(f"  tr.{i + 1}: {gon}")

# 3. Tìm chữ "Bài N" nhiều nhất ở đâu (số bài cao nhất = biết gần cuối sách có tới bài nào).
so_bai = set()
for i in range(doc.page_count):
    for m in re.findall(r"[Bb]ài\s+(\d{1,3})", doc[i].get_text()):
        so_bai.add(int(m))
if so_bai:
    print(f"\nSố hiệu bài lớn nhất gặp trong file: {max(so_bai)} (tổng {len(so_bai)} số hiệu khác nhau)")
