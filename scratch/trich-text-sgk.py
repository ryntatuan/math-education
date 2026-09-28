"""
TRÍCH TOÀN BỘ CHỮ CỦA MỘT FILE PDF SÁCH RA FILE .md CÓ MỐC TRANG.

Chạy: `python scratch/trich-text-sgk.py "<file.pdf>" "<file-ra.md>"`

VÌ SAO CẦN: sách Lớp 4 (bản pdf mới) CÓ lớp văn bản ⇒ đọc được cả quyển trong vài giây, thay vì
phải mở từng ảnh trang. Mốc `===== TRANG n =====` để tra ngược "chữ này ở trang nào" khi dựng bảng
ánh xạ trang → bài.

⚠️ Sách Lớp 5 là ảnh scan (0 ký tự) ⇒ script này in ra cảnh báo và KHÔNG sinh file; dùng
   `scratch/render-trang-sgk.py` rồi đọc ảnh thay thế.
"""
import os
import sys

import pymupdf

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

pdf, ra = sys.argv[1], sys.argv[2]
doc = pymupdf.open(pdf)

tong = sum(len(doc[i].get_text()) for i in range(doc.page_count))
if tong < 200:
    print(f"⚠️ {os.path.basename(pdf)}: chỉ {tong} ký tự trong {doc.page_count} trang ⇒ ĐÂY LÀ ẢNH SCAN.")
    print("   Dùng: python scratch/render-trang-sgk.py \"<file.pdf>\" <trang-đầu> <trang-cuối> <thư-mục-ra>")
    sys.exit(0)

os.makedirs(os.path.dirname(ra), exist_ok=True)
with open(ra, "w", encoding="utf-8") as f:
    f.write(f"# {os.path.basename(pdf)} — trích tự động, {doc.page_count} trang\n")
    for i in range(doc.page_count):
        f.write(f"\n===== TRANG {i + 1} =====\n")
        f.write(doc[i].get_text())

print(f"✅ {os.path.basename(pdf)}: {doc.page_count} trang · {tong:,} ký tự → {ra}")
print(f"   Trung bình {tong // doc.page_count} ký tự/trang (trang nhiều chữ nhất: "
      f"{max(len(doc[i].get_text()) for i in range(doc.page_count))})")
