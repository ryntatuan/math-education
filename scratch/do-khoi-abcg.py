"""Đo MẶT TRƯỚC của từng khối trong SGK tr.100 (Bài 16, hoạt động 1).

Cách đo (không đoán bằng mắt):
  - Lọc pixel "nét vẽ" = pixel tối (cả 3 kênh < 120). Chữ KẾT NỐI TRI THỨC là watermark
    xám nhạt nên bị loại; nhãn A/B/C... màu xanh cũng bị loại.
  - Bề rộng mặt trước = bề rộng của HÀNG THẤP NHẤT có nét (đó là cạnh đáy mặt trước).
  - Chiều cao mặt trước = chiều cao của CỘT TRÁI NHẤT có nét (đó là cạnh trái mặt trước).
  - Tỉ lệ ≈ 1 ⇒ mặt trước là HÌNH VUÔNG ⇒ khối lập phương.
"""

from PIL import Image

# Vùng cắt (x0, y0, x1, y1) trên ảnh gốc 1405x1987
REGIONS = {
    "A (xanh)": (250, 730, 470, 930),
    "B (vang)": (560, 700, 800, 950),
    "C (xanh la)": (940, 790, 1090, 900),
    "E (do)": (470, 1020, 850, 1360),
    "G (hong)": (880, 1050, 1250, 1330),
}


def measure(path, box):
    im = Image.open(path).convert("RGB").crop(box)
    w, h = im.size
    px = im.load()
    dark = [
        (x, y)
        for y in range(h)
        for x in range(w)
        if px[x, y][0] < 120 and px[x, y][1] < 120 and px[x, y][2] < 120
    ]
    if not dark:
        return None
    max_y = max(y for _, y in dark)
    # hàng đáy: gộp vài hàng cuối để bỏ nhiễu 1 pixel
    bottom = [x for x, y in dark if y >= max_y - 2]
    min_x = min(x for x, _ in dark)
    left = [y for x, y in dark if x <= min_x + 2]
    return {
        "rong_mat_truoc": max(bottom) - min(bottom),
        "cao_mat_truoc": max(left) - min(left),
    }


for name, box in REGIONS.items():
    r = measure("scratch/kiem-tra-t101.png", box)
    if not r:
        print(f"{name}: khong tim thay net ve")
        continue
    w, h = r["rong_mat_truoc"], r["cao_mat_truoc"]
    print(
        f"{name}: ngang={w}  cao={h}  ti le ngang/cao={w / h:.2f}"
        f"  => {'HINH VUONG (lap phuong)' if 0.9 <= w / h <= 1.11 else 'CHU NHAT (hop chu nhat)'}"
    )
