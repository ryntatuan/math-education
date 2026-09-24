"""Ghép nhiều trang SGK thành MỘT ảnh để xem cho nhanh (đỡ phải mở từng trang).

Dùng:
    python scratch/l1-sheet.py 6 9        -> ghép trang 6,7,8,9 thành scratch/l1-sheet-6-9.png

Vì sao cần: mỗi lần xem ảnh là một lượt đọc tốn kém. Ghép 4 trang một ảnh thì một
lượt xem soi được cả 4 trang. Chữ trong sách Lớp 1 to nên ghép 2×2 vẫn đọc được;
nếu cần soi số liệu nhỏ thì mở RIÊNG trang đó bằng `read_file`/`view_image`
(ảnh `scratch/l1-t{P}.png` đã trích sẵn ở 220 DPI).

⚠️ Ảnh chỉ để XEM, không commit (`.gitignore` đã chặn `scratch/*.png`).
"""

import sys
from PIL import Image, ImageDraw

W = 1030  # bề rộng mỗi trang sau khi co (ảnh 220 DPI ~ 1030 x 1455)
H = 1455


def sheet(pages, out, cols=2):
    rows = (len(pages) + cols - 1) // cols
    pad = 16
    canvas = Image.new(
        "RGB",
        (cols * W + (cols + 1) * pad, rows * H + (rows + 1) * pad),
        "#94a3b8",
    )
    draw = ImageDraw.Draw(canvas)
    for i, p in enumerate(pages):
        try:
            im = Image.open(f"scratch/l1-t{p}.png").convert("RGB")
        except FileNotFoundError:
            print(f"thieu anh trang {p} — bo qua")
            continue
        im = im.resize((W, H))
        cx = pad + (i % cols) * (W + pad)
        cy = pad + (i // cols) * (H + pad)
        canvas.paste(im, (cx, cy))
        draw.rectangle([cx, cy, cx + 92, cy + 34], fill="#111827")
        draw.text((cx + 10, cy + 8), f"trang {p}", fill="#ffffff")
    canvas.save(out)
    print(f"DA GHI: {out}  ({canvas.width}x{canvas.height})  trang {pages}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    first, last = int(sys.argv[1]), int(sys.argv[2])
    cols = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    pages = list(range(first, last + 1))
    sheet(pages, f"scratch/l1-sheet-{first}-{last}.png", cols)
