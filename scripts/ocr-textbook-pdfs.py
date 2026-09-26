#!/usr/bin/env python3
"""
OCR 8 file SGK trong `docs/DataSource/` (ban SCAN ANH, khong co lop chu) -> Markdown.

Duong di:
    PDF -> PyMuPDF ket xuat tung trang thanh PNG (300 DPI)
        -> tesseract.exe chay NGAY TREN MAY voi du lieu tieng Viet (mien phi)

Vi sao tach tung trang:
  - Chay lai duoc nhieu lan. 1139 trang chay nhieu gio, dut giua chung ma mat het
    la khong chap nhan duoc. Trang nao xong roi thi bo qua (resume).
  - Trang nao loi thi chi trang do bi bo qua, cac trang khac van chay.

Ket qua:
  docs/DataSource/.ocr-pages/<slug>/page-0001.md   <- cache tung trang
  docs/DataSource/<ten file>.md                    <- file gop

Vi du:
  python scripts/ocr-textbook-pdfs.py --only "grade 1 part 1" --from-page 16 --max-pages 3
  python scripts/ocr-textbook-pdfs.py --lang viebest        # doi ban du lieu ngon ngu
  python scripts/ocr-textbook-pdfs.py                       # chay het
"""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs" / "DataSource"
CACHE = SRC / ".ocr-pages"
TMP = Path(tempfile.gettempdir()) / "mocr"

# Tesseract nam trong mot moi truong conda rieng (cai bang micromamba, khong can admin).
ENV = Path(os.environ.get("OCR_ENV", str(Path.home() / ".conda" / "envs" / "ocr")))
TESSERACT = ENV / "Library" / "bin" / "tesseract.exe"
TESSDATA = ENV / "share" / "tessdata"

DEFAULT_LANG = "vie"
DEFAULT_DPI = 300  # do duoc: 300 DPI cho ket qua tot nhat voi SGK scan
DEFAULT_PSM = 6  # coi ca trang la 1 khoi van ban (do duoc: bat duoc nhieu chu nhat)

# Loc rac sinh ra tu hinh ve trang tri. Do duoc tren trang 16 lop 1:
#   chu that  -> do tin cay 86..97
#   rac       -> do tin cay 0..40
DEFAULT_MIN_CONF = 70.0
DEFAULT_MIN_CHARS = 6
DEFAULT_MIN_LETTERS = 4

# Bo marker cua ban OCR cu (Ollama). Giu lai de doc duoc cache cu neu con sot.
MARKER = re.compile(r"\*?\s*\[Image OCR\]\s*(.*?)\s*\[End OCR\]\s*\*?", re.S)


def slug(rel: Path) -> str:
    return str(rel.with_suffix("")).replace(os.sep, "__").replace(" ", "_")


def check_setup() -> str | None:
    """Tra ve thong bao loi neu thieu Tesseract, hoac None neu san sang chay."""
    if not TESSERACT.is_file():
        return f"Khong thay tesseract.exe tai: {TESSERACT}"
    if not TESSDATA.is_dir():
        return f"Khong thay du lieu ngon ngu tai: {TESSDATA}"
    return None


@dataclass(frozen=True)
class Settings:
    lang: str
    dpi: int
    psm: int
    min_conf: float
    min_chars: int
    min_letters: int


def render_page(src: Path, index: int, dpi: int) -> Path:
    """Ket xuat trang `index` (0-based) ra file PNG XAM trong TEMP.

    De xam: nen trang SGK mau xanh nhat, de mau lam tesseract phan tich bo cuc sai.
    """
    TMP.mkdir(parents=True, exist_ok=True)
    dest = TMP / f"{slug(src.relative_to(SRC))}-{index + 1:04d}.png"
    with pymupdf.open(src) as doc:
        pix = doc[index].get_pixmap(dpi=dpi, colorspace=pymupdf.csGRAY)
        dest.write_bytes(pix.tobytes("png"))
    return dest


def words_from_tsv(text: str) -> dict[tuple, list[tuple[float, str]]]:
    """Doc bang TSV cua tesseract, nhom cac tu theo tung dong."""
    groups: dict[tuple, list[tuple[float, str]]] = {}
    for i, row in enumerate(text.splitlines()):
        cols = row.split("\t")
        if i == 0 or len(cols) < 12 or cols[0] != "5":
            continue  # chi lay muc "word"
        if not cols[11].strip():
            continue
        key = (int(cols[1]), int(cols[2]), int(cols[3]), int(cols[4]))
        groups.setdefault(key, []).append((float(cols[10]), cols[11]))
    return groups


def clean_lines(text: str, cfg: Settings) -> str:
    """Bo cac dong rac: do tin cay thap, qua ngan, hoac qua it chu cai."""
    out = []
    for _, group in sorted(words_from_tsv(text).items()):
        blob = " ".join(w for _, w in group).strip()
        if len(blob) < cfg.min_chars:
            continue
        if sum(c for c, _ in group) / len(group) < cfg.min_conf:
            continue
        if sum(1 for ch in blob if ch.isalpha()) < cfg.min_letters:
            continue
        out.append(blob)
    return "\n".join(out)


def ocr_page(src: Path, index: int, cfg: Settings) -> str:
    img = render_page(src, index, cfg.dpi)
    base = img.with_suffix("")
    tsv = base.with_suffix(".tsv")
    try:
        proc = subprocess.run(
            [
                str(TESSERACT),
                str(img),
                str(base),
                "-l",
                cfg.lang,
                "--psm",
                str(cfg.psm),
                "-c",
                "tessedit_create_tsv=1",
            ],
            capture_output=True,
            text=True,
            errors="replace",
            env=dict(os.environ, TESSDATA_PREFIX=str(TESSDATA)),
            timeout=600,
        )
        if proc.returncode != 0:
            last = (proc.stderr or "tesseract loi").strip().splitlines()[-1]
            raise RuntimeError(last)
        return clean_lines(tsv.read_text(encoding="utf-8", errors="replace"), cfg)
    finally:
        img.unlink(missing_ok=True)
        tsv.unlink(missing_ok=True)


def process(
    pdf: Path, cfg: Settings, max_pages: int | None, force: bool, start_page: int = 1
) -> dict:
    rel = pdf.relative_to(SRC)
    cache = CACHE / slug(rel)
    cache.mkdir(parents=True, exist_ok=True)

    with pymupdf.open(pdf) as doc:
        total = len(doc)
    start = max(0, start_page - 1)
    stop = min(total, start + max_pages) if max_pages else total

    done = skipped = failed = 0
    times: list[float] = []

    print(f"\n=== {rel}  (trang {start + 1}-{stop} / {total}) ===", flush=True)
    for i in range(start, stop):
        page_file = cache / f"page-{i + 1:04d}.md"
        if page_file.exists() and not force:
            skipped += 1
            continue
        t0 = time.time()
        try:
            text = ocr_page(pdf, i, cfg)
        except Exception as exc:  # noqa: BLE001 - 1 trang loi thi di tiep
            failed += 1
            print(f"  trang {i + 1:>4}: LOI  {type(exc).__name__}: {exc}", flush=True)
            continue
        dt = time.time() - t0
        times.append(dt)
        page_file.write_text(text, encoding="utf-8")
        done += 1
        print(
            f"  trang {i + 1:>4}: {dt:>6.1f}s  {len(text):>5} ky tu",
            flush=True,
        )

    # Gop thanh 1 file .md (chi khi moi trang deu da co)
    parts = sorted(cache.glob("page-*.md"))
    out = pdf.with_suffix(".md")
    if len(parts) >= total:
        body = []
        for p in parts[:total]:
            raw = p.read_text(encoding="utf-8")
            clean = "\n\n".join(m.strip() for m in MARKER.findall(raw)) or raw.strip()
            if clean:
                body.append(clean)
        header = f"# {pdf.stem}\n\n> OCR tu `{rel}` — {total} trang.\n\n---\n\n"
        out.write_text(header + "\n\n---\n\n".join(body) + "\n", encoding="utf-8")
        status = f"DA GHI {out.relative_to(ROOT)}"
    else:
        status = f"chua du trang ({len(parts)}/{total}) — chay lai de tiep"

    avg = sum(times) / len(times) if times else 0.0
    print(
        f"  -> moi {done} · bo qua {skipped} · loi {failed} · "
        f"trung binh {avg:.1f}s/trang · {status}",
        flush=True,
    )
    return {"pdf": str(rel), "pages": total, "done": done, "failed": failed, "avg": avg}


def main() -> int:
    ap = argparse.ArgumentParser(description="OCR SGK scan -> Markdown (offline, mien phi)")
    ap.add_argument("--only", help="chi xu ly file co ten chua chuoi nay (khong phan biet hoa/thuong)")
    ap.add_argument("--max-pages", type=int, help="chi lam N trang moi file (de thu)")
    ap.add_argument("--from-page", type=int, default=1, help="bat dau tu trang thu may (1-based)")
    ap.add_argument("--lang", default=os.environ.get("OCR_LANG", DEFAULT_LANG))
    ap.add_argument("--dpi", type=int, default=DEFAULT_DPI)
    ap.add_argument("--psm", type=int, default=DEFAULT_PSM)
    ap.add_argument("--min-conf", type=float, default=DEFAULT_MIN_CONF)
    ap.add_argument("--min-chars", type=int, default=DEFAULT_MIN_CHARS)
    ap.add_argument("--min-letters", type=int, default=DEFAULT_MIN_LETTERS)
    ap.add_argument("--force", action="store_true", help="lam lai ca trang da co")
    args = ap.parse_args()

    err = check_setup()
    if err:
        print(err, file=sys.stderr)
        return 2
    if not SRC.is_dir():
        print(f"Khong thay thu muc: {SRC}", file=sys.stderr)
        return 2

    pdfs = sorted(SRC.rglob("*.pdf"))
    if args.only:
        key = args.only.lower()
        pdfs = [p for p in pdfs if key in p.name.lower()]
    if not pdfs:
        print("Khong co file PDF nao khop.", file=sys.stderr)
        return 2

    print(f"Tesseract: {TESSERACT}")
    print(
        f"Cau hinh : {args.lang} · {args.dpi} DPI · psm {args.psm} · "
        f"loc conf>={args.min_conf:g} / >={args.min_chars} ky tu / >={args.min_letters} chu cai"
    )
    print(f"So file  : {len(pdfs)}")
    cfg = Settings(
        lang=args.lang,
        dpi=args.dpi,
        psm=args.psm,
        min_conf=args.min_conf,
        min_chars=args.min_chars,
        min_letters=args.min_letters,
    )

    t0 = time.time()
    rows = []
    for pdf in pdfs:
        try:
            rows.append(process(pdf, cfg, args.max_pages, args.force, args.from_page))
        except KeyboardInterrupt:
            print("\nDung theo yeu cau. Chay lai se tiep tuc tu trang con thieu.")
            break

    print("\n================ TONG KET ================")
    for r in rows:
        print(
            f"{r['pdf']:<38} {r['done']:>4} trang moi · "
            f"loi {r['failed']} · {r['avg']:.1f}s/trang"
        )
    print(f"Tong thoi gian: {(time.time() - t0) / 60:.1f} phut")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
