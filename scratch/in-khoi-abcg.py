"""In hình dạng khối ra dạng lưới ký tự để TỰ KIỂM TRA vùng cắt trước khi tin số đo.

Vì sao: lần trước đo ra "A rộng = 0, E tỉ lệ 52" — vô lý ⇒ thước hỏng (vùng cắt sai),
không phải dữ liệu sai. Lưới ký tự cho thấy ngay vùng cắt có trùm hết khối hay không.
"""

from PIL import Image

REGIONS = {
    "A": (240, 720, 500, 950),
    "B": (540, 690, 840, 960),
    "C": (920, 780, 1120, 900),
    "E": (440, 1010, 900, 1300),
    "G": (860, 1040, 1300, 1340),
}
COLS, ROWS = 52, 22
# Ngưỡng "nét vẽ": pixel tối. Watermark xám nhạt và nhãn xanh không lọt qua.
DARK = 130


def grid(path, box):
    im = Image.open(path).convert("RGB").crop(box)
    w, h = im.size
    px = im.load()
    lines = []
    for ry in range(ROWS):
        row = ""
        for rx in range(COLS):
            x0, x1 = int(rx * w / COLS), int((rx + 1) * w / COLS)
            y0, y1 = int(ry * h / ROWS), int((ry + 1) * h / ROWS)
            hit = False
            for y in range(y0, max(y0 + 1, y1)):
                for x in range(x0, max(x0 + 1, x1)):
                    r, g, b = px[x, y]
                    if r < DARK and g < DARK and b < DARK:
                        hit = True
                        break
                if hit:
                    break
            row += "#" if hit else "."
        lines.append(row)
    return lines, w, h


for name, box in REGIONS.items():
    lines, w, h = grid("scratch/kiem-tra-t101.png", box)
    print(f"=== Khoi {name}  (vung {box[0]},{box[1]} -> {box[2]},{box[3]}; rong {w} cao {h}) ===")
    for ln in lines:
        print("   " + ln)
    print()
