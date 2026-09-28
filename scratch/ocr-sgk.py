"""
OCR MỘT DẢI TRANG SÁCH (sách scan không có lớp văn bản) — chạy lại được, bỏ qua trang đã làm.

Chạy: `python scratch/ocr-sgk.py "<file.pdf>" <trang-đầu> <trang-cuối> <thư-mục-ra>`

Sinh ra:
  • `<thư-mục-ra>/tr###.txt` — chữ của TỪNG trang (làm lại lần sau sẽ bỏ qua trang đã có);
  • `<thư-mục-ra>.md` — gộp mọi trang kèm mốc `===== TRANG n =====` để tra ngược.

🔴 VÌ SAO PHẢI CÓ BƯỚC NÀY: 4 tập sách (Lớp 4 + Lớp 5) = 540 trang ảnh. Mở từng ảnh bằng mắt là
   cách chắc nhất nhưng rất chậm; OCR biến 540 ảnh thành 540 file chữ đọc nhanh.
   ⚠️ OCR tiếng Việt SAI DẤU và sai chữ số đôi chỗ (đo thật: "Số chẵn" → "Số chắn"). Vì vậy:
      **mọi con số đưa vào bài học phải được xác nhận lại bằng mắt** trên ảnh trang đó
      (`scratch/render-trang-sgk.py` rồi mở ảnh), không tin OCR cho số liệu.

Dùng tesseract đã cài (`C:\\Program Files\\Tesseract-OCR\\tesseract.exe`) + dữ liệu tiếng Việt
`scratch/tessdata/vie.traineddata`. Không cần `pytesseract`, gọi thẳng tiến trình con.
"""
import os
import subprocess
import sys

import pymupdf

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

TESSERACT = os.environ.get("TESSERACT", r"C:\Program Files\Tesseract-OCR\tesseract.exe")
TESSDATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tessdata")
DPI = 300

pdf, t1, t2, thu_muc = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
os.makedirs(thu_muc, exist_ok=True)
doc = pymupdf.open(pdf)

so_lam = 0
so_bo_qua = 0
for i in range(t1 - 1, min(t2, doc.page_count)):
    ra = os.path.join(thu_muc, f"tr{i + 1:03d}.txt")
    if os.path.exists(ra):
        so_bo_qua += 1
        continue
    anh = os.path.join(thu_muc, f"tr{i + 1:03d}.png")
    doc[i].get_pixmap(dpi=DPI).save(anh)
    subprocess.run(
        [TESSERACT, anh, os.path.join(thu_muc, f"tr{i + 1:03d}"), "--tessdata-dir", TESSDATA, "-l", "vie"],
        capture_output=True,
        check=False,
    )
    os.remove(anh)
    so_lam += 1
    if so_lam % 10 == 0:
        print(f"  … đã OCR {so_lam} trang (tới tr.{i + 1})", flush=True)

# Gộp thành một file .md có mốc trang.
gop = thu_muc.rstrip("\\/") + ".md"
with open(gop, "w", encoding="utf-8") as f:
    f.write(f"# OCR {os.path.basename(pdf)} — tr.{t1}–{min(t2, doc.page_count)}\n")
    for i in range(t1 - 1, min(t2, doc.page_count)):
        f.write(f"\n===== TRANG {i + 1} =====\n")
        p = os.path.join(thu_muc, f"tr{i + 1:03d}.txt")
        if os.path.exists(p):
            f.write(open(p, encoding="utf-8", errors="replace").read())

print(f"✅ {os.path.basename(pdf)} tr.{t1}–{min(t2, doc.page_count)}: OCR {so_lam} trang · bỏ qua {so_bo_qua} → {gop}")
