#!/usr/bin/env python3
"""
Trích TỪNG TRANG SGK thành ảnh PNG để ĐỐI CHIẾU BẰNG MẮT.

🔴 VÌ SAO CẦN: bản OCR `.md` của cả bộ sách rất mỏng (lớp 1: 22 + 30 KB cho 226 trang),
đọc OCR mà chốt số liệu là đoán — đã từng sai. Phải mở ẢNH trang sách ra xem.

Ghi vào `scratch/sgk-lopN/<tên file>/page-NNNN.png`, trong đó **NNNN = số trang PDF**
(theo quy ước `t{N}` của kế hoạch: trang PDF N = trang sách N−1). Thư mục này đã bị
`.gitignore` chặn (`scratch/sgk-*/`) nên không làm bẩn git.

Ví dụ:
  python scratch/trich-anh-sgk.py --grade 1                       # cả 2 tập của Lớp 1
  python scratch/trich-anh-sgk.py --grade 1 --only "part 1" --from-page 1 --max-pages 6
  python scratch/trich-anh-sgk.py --grade 1 --dpi 200             # nhẹ hơn, chữ nhỏ hơn
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "Data Source"


def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--grade", required=True, help='thư mục lớp, ví dụ: "1" hoặc "Grade 1"')
    ap.add_argument("--only", default=None, help='chỉ một tập, ví dụ: "part 1"')
    ap.add_argument("--dpi", type=int, default=300)
    ap.add_argument("--from-page", type=int, default=1, help="trang PDF bắt đầu (1-based)")
    ap.add_argument("--max-pages", type=int, default=0, help="0 = hết")
    args = ap.parse_args()

    g = args.grade.strip()
    folder = SRC / (g if g.lower().startswith("grade") else f"Grade {g}")
    if not folder.is_dir():
        print(f"❌ không thấy thư mục: {folder}")
        return 1

    pdfs = sorted(folder.glob("*.pdf"))
    if args.only:
        pdfs = [p for p in pdfs if args.only.lower() in p.name.lower()]
    if not pdfs:
        print("❌ không có PDF nào khớp")
        return 1

    out_root = ROOT / "scratch" / f"sgk-lop{g.lstrip('0')}"
    tong = 0
    for pdf in pdfs:
        out = out_root / slug(pdf.stem)
        out.mkdir(parents=True, exist_ok=True)
        doc = pymupdf.open(pdf)
        cuoi = len(doc) if not args.max_pages else min(
            len(doc), args.from_page - 1 + args.max_pages
        )
        moi = 0
        for i in range(args.from_page - 1, cuoi):
            f = out / f"page-{i + 1:04d}.png"
            if f.exists():  # chạy lại thì bỏ qua trang đã có
                continue
            f.write_bytes(doc[i].get_pixmap(dpi=args.dpi).tobytes("png"))
            moi += 1
        print(f"{pdf.name}: {len(doc)} trang · trích mới {moi} · ghi vào {out}")
        tong += moi
        doc.close()

    print(f"\n✅ xong — {tong} ảnh mới, DPI {args.dpi}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
