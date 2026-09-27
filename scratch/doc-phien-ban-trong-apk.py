"""
XÁC NHẬN PHIÊN BẢN BÊN TRONG FILE APK — mở APK như file ZIP rồi đọc thẳng dữ liệu.

Chạy: `python scratch/doc-phien-ban-trong-apk.py client/public/downloads/ToanVui.apk 1.1.1`

VÌ SAO KHÔNG SOI NHỊ PHÂN THÔ (bài học 2026-09-28): quét byte cả file APK thấy chuỗi `1.1.0`
4 chỗ và `1.1.1` 2 chỗ ⇒ **cả hai đều là phiên bản thư viện AndroidX**
(`androidx.biometric_biometric.version`, `androidx.loader_loader.version`…), không phải
phiên bản app. Mã web nằm trong asset ĐÃ NÉN nên phép quét thô không thấy.
⇒ Phải giải nén: đọc `assets/public/downloads/version.json` và soi bundle JS sau khi giải nén.
"""
import hashlib
import re
import sys
import zipfile

apk, phien_ban = sys.argv[1], sys.argv[2]

with zipfile.ZipFile(apk) as z:
    ten = z.namelist()
    print(f"File: {apk}  ({len(ten)} mục trong APK)")

    for t in [x for x in ten if x.endswith("downloads/version.json")]:
        print(
            f"\n1. {t} (thứ nút “Tải APK” đọc):\n   "
            + z.read(t).decode("utf-8").replace("\n", "\n   ")
        )

    html_ten = [x for x in ten if x.endswith("public/index.html")]
    if html_ten:
        html = z.read(html_ten[0]).decode("utf-8", "replace")
        js_chinh = re.findall(r"assets/(index-[\w-]+\.js)", html)
        print(f"\n2. Bundle JS chính (theo {html_ten[0]}): {js_chinh}")

        for j in js_chinh:
            for ten_js in [x for x in ten if x.endswith("public/assets/" + j)]:
                js = z.read(ten_js).decode("utf-8", "replace")
                print(f'   • {ten_js}: chuỗi "{phien_ban}" có {js.count(phien_ban)} chỗ')

    tong = 0
    for t in [x for x in ten if x.startswith("assets/public/")]:
        try:
            tong += z.read(t).decode("utf-8", "replace").count(phien_ban)
        except Exception:
            pass
    print(f'\n3. Tổng số chỗ có chuỗi "{phien_ban}" trong assets/public (đã giải nén): {tong}')

    # 4. CHỮ KÝ + danh tính bản dựng — dùng để so HAI APK với nhau (ví dụ: bản build ở máy
    #    với bản build trên GitHub Actions). Khác chữ ký ⇒ người dùng KHÔNG cài đè được
    #    (Android báo "Ứng dụng chưa được cài đặt"), buộc phải gỡ app rồi cài lại.
    print("\n4. Dấu hiệu nhận dạng bản dựng:")
    for t in [x for x in ten if x.startswith("META-INF/") and re.search(r"\.(RSA|DSA|EC|SF)$", x)]:
        print(f"   • {t}: sha256 {hashlib.sha256(z.read(t)).hexdigest()[:32]}…")
    for t in [x for x in ten if re.search(r"public/assets/index-[\w-]+\.js$", x)]:
        print(f"   • {t}: sha256 {hashlib.sha256(z.read(t)).hexdigest()[:32]}…")
    print(f"   • sha256 cả file APK: {hashlib.sha256(open(apk, 'rb').read()).hexdigest()[:32]}…")
