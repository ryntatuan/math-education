"""So sanh cac cau hinh Tesseract tren cung 1 trang SGK (chi de do, khong ghi vao cache).

Cach dung:
    python scratch/ocr-compare.py                 # chay bang do
    python scratch/ocr-compare.py --show 300 thr170 3   # in toan bo chu cua 1 cau hinh
"""

from __future__ import annotations

import argparse
import os
import subprocess
import tempfile
import time
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "docs" / "Data Source" / "Grade 1" / "Math grade 1 part 1.pdf"
PAGE = int(os.environ.get("OCR_PAGE", "15"))  # 0-based -> mac dinh la trang 16 cua file

ENV = Path.home() / ".conda" / "envs" / "ocr"
TESS = ENV / "Library" / "bin" / "tesseract.exe"
DATA = ENV / "share" / "tessdata"
TMP = Path(tempfile.gettempdir()) / "mocr"


def render(dpi: int) -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    out = TMP / f"cmp-{PAGE + 1}-{dpi}.png"
    if not out.exists():
        with pymupdf.open(PDF) as doc:
            out.write_bytes(doc[PAGE].get_pixmap(dpi=dpi).tobytes("png"))
    return out


def preprocess(png: Path, mode: str) -> Path:
    """none = anh goc · gray = chi chuyen xam · thrN = nguong hoa den/trang muc N."""
    if mode == "none":
        return png
    from PIL import Image

    im = Image.open(png).convert("L")
    if mode.startswith("thr"):
        cut = int(mode[3:])
        im = im.point(lambda v: 0 if v < cut else 255)
    out = TMP / f"{png.stem}-{mode}.png"
    im.save(out)
    return out


def run(png: Path, lang: str, psm: int) -> tuple[float, str]:
    base = TMP / f"run-{png.stem}-{lang}-{psm}"
    t0 = time.time()
    proc = subprocess.run(
        [str(TESS), str(png), str(base), "-l", lang, "--psm", str(psm)],
        capture_output=True,
        text=True,
        errors="replace",
        env=dict(os.environ, TESSDATA_PREFIX=str(DATA)),
        timeout=600,
    )
    dt = time.time() - t0
    txt = base.with_suffix(".txt")
    body = txt.read_text(encoding="utf-8", errors="replace") if txt.exists() else ""
    if proc.returncode != 0:
        body = "LOI: " + (proc.stderr or "").strip().splitlines()[-1]
    return dt, body


def run_tsv(png: Path, lang: str, psm: int) -> list[dict]:
    """Chay tesseract xuat TSV: moi tu 1 dong, kem do tin cay (conf)."""
    base = TMP / f"tsv-{png.stem}-{lang}-{psm}"
    proc = subprocess.run(
        [
            str(TESS),
            str(png),
            str(base),
            "-l",
            lang,
            "--psm",
            str(psm),
            "-c",
            "tessedit_create_tsv=1",
        ],
        capture_output=True,
        text=True,
        errors="replace",
        env=dict(os.environ, TESSDATA_PREFIX=str(DATA)),
        timeout=600,
    )
    if proc.returncode != 0:
        raise RuntimeError((proc.stderr or "tesseract loi").strip().splitlines()[-1])
    path = base.with_suffix(".tsv")
    words = []
    for i, line in enumerate(path.read_text(encoding="utf-8", errors="replace").splitlines()):
        cols = line.split("\t")
        if i == 0 or len(cols) < 12 or cols[0] != "5":
            continue  # chi lay muc "word"
        if not cols[11].strip():
            continue
        words.append(
            {
                "key": (int(cols[1]), int(cols[2]), int(cols[3]), int(cols[4])),
                "conf": float(cols[10]),
                "text": cols[11],
            }
        )
    return words


def rebuild(words: list[dict], min_conf: float) -> list[tuple[float, str]]:
    """Ghep cac tu thanh dong, bo tu co do tin cay thap. Tra ve (conf trung binh, dong)."""
    lines: dict[tuple, list[dict]] = {}
    for w in words:
        if w["conf"] < min_conf:
            continue
        lines.setdefault(w["key"], []).append(w)
    out = []
    for _, group in sorted(lines.items()):
        text = " ".join(w["text"] for w in group).strip()
        conf = sum(w["conf"] for w in group) / len(group)
        out.append((conf, text))
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--show", nargs=3, metavar=("DPI", "MODE", "PSM"))
    ap.add_argument("--tsv", nargs=4, metavar=("DPI", "MODE", "PSM", "MINCONF"))
    ap.add_argument("--lang", default="vie")
    args = ap.parse_args()

    if args.tsv:
        dpi, mode, psm, conf = int(args.tsv[0]), args.tsv[1], int(args.tsv[2]), float(args.tsv[3])
        words = run_tsv(preprocess(render(dpi), mode), args.lang, psm)
        for c, text in rebuild(words, conf):
            print(f"{c:5.1f}  {text}")
        return 0

    if args.show:
        dpi, mode, psm = int(args.show[0]), args.show[1], int(args.show[2])
        _, body = run(preprocess(render(dpi), mode), args.lang, psm)
        print(body)
        return 0

    print(f"{'dpi':>4} {'mode':<8} {'psm':>3} {'minconf':>7} {'dong':>5} {'ky tu':>6}")
    for dpi in (200, 300):
        raw = render(dpi)
        for mode in ("gray", "thr170"):
            png = preprocess(raw, mode)
            for psm in (4, 6, 11):
                words = run_tsv(png, args.lang, psm)
                for conf in (0, 60, 75, 85):
                    rows = rebuild(words, conf)
                    print(
                        f"{dpi:>4} {mode:<8} {psm:>3} {conf:>7.0f} {len(rows):>5} "
                        f"{sum(len(t) for _, t in rows):>6}"
                    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
