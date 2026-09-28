"""
RENDER CÁC TRANG SÁCH THÀNH ẢNH 300 DPI để đọc bằng mắt (sách scan không có lớp văn bản).

Chạy: `python scratch/render-trang-sgk.py "<file.pdf>" <trang-đầu> <trang-cuối> <thư-mục-ra>`

VÌ SAO 300 DPI: đã thử ở Lớp 1 — dưới 200 DPI thì số trong hình và chữ nhỏ trong bảng không đọc
được, đoán sai số liệu. 300 DPI là mức đã dùng cho mọi lần rà Lớp 1 và đủ tin.

VÌ SAO CẦN CẢ DẢI TRANG: mỗi bài trong SGK trải 2–4 trang liền nhau (Kể chuyện → Khám phá → Hoạt
động → Luyện tập). Render từng dải theo BÀI giúp đọc đúng ngữ cảnh, không bị cắt giữa hoạt động.
"""
import os
import sys

import pymupdf

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

pdf, t1, t2, thu_muc = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
doc = pymupdf.open(pdf)
os.makedirs(thu_muc, exist_ok=True)

ten = os.path.basename(pdf).replace(".pdf", "").replace(" ", "-")
so = 0
for i in range(t1 - 1, min(t2, doc.page_count)):
    ra = os.path.join(thu_muc, f"{ten}-tr{i + 1:03d}.png")
    doc[i].get_pixmap(dpi=300).save(ra)
    so += 1

print(f"✅ {os.path.basename(pdf)}: render {so} trang (tr.{t1}–{min(t2, doc.page_count)}) vào {thu_muc}/")
