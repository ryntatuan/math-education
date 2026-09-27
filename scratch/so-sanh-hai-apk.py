"""
SO HAI FILE APK VỚI NHAU — để trả lời "hai bản dựng này có phải cùng một thứ không?".

Chạy: `python scratch/so-sanh-hai-apk.py <apk-1> <apk-2>`

In ra: chữ ký (META-INF), tên bundle web, số mục, và danh sách mục LỆCH KÍCH THƯỚC
(nhiều nhất ở trên) — nhờ đó biết chênh lệch nằm ở đâu thay vì đoán.

VÌ SAO CẦN (2026-09-28): APK build ở máy 7 558 011 byte, APK build trên GitHub Actions
7 494 385 byte, bundle web lại khác tên nhau (`index-DYQ3Gsu5.js` vs `index-D0ix_Yy3.js`)
dù cùng một commit. Khác nhau ở đâu thì phải đo, không suy đoán.
"""
import hashlib
import sys
import zipfile

apk1, apk2 = sys.argv[1], sys.argv[2]


def thong_tin(apk):
    with zipfile.ZipFile(apk) as z:
        ten = z.namelist()
        info = z.infolist()
        chu_ky = {
            t: hashlib.sha256(z.read(t)).hexdigest()
            for t in ten
            if t.startswith("META-INF/") and t.endswith((".RSA", ".DSA", ".EC", ".SF"))
        }
        bundle = [
            t.split("/")[-1]
            for t in ten
            if "/public/assets/index-" in t and t.endswith(".js")
        ]
        return {
            "apk": apk,
            "so_muc": len(ten),
            "chu_ky": chu_ky,
            "bundle": bundle,
            "kich_thuoc": {i.filename: i.file_size for i in info},
            "tong_giai_nen": sum(i.file_size for i in info),
        }


a, b = thong_tin(apk1), thong_tin(apk2)

for nhan, d in (("APK 1", a), ("APK 2", b)):
    print(f"\n{nhan}: {d['apk']}")
    print(f"   • sha256 cả file: {hashlib.sha256(open(d['apk'], 'rb').read()).hexdigest()}")
    print(f"   • số mục: {d['so_muc']} · tổng dung lượng giải nén: {d['tong_giai_nen']:,} byte")
    print(f"   • bundle web: {d['bundle']}")
    for t, h in sorted(d["chu_ky"].items()):
        print(f"   • {t}: {h[:40]}…")

print("\n=== KẾT LUẬN ===")
if a["chu_ky"] == b["chu_ky"] and a["chu_ky"]:
    print("✅ CHỮ KÝ GIỐNG NHAU ⇒ bản mới cài ĐÈ được lên bản cũ (không phải gỡ app).")
else:
    print("🔴 CHỮ KÝ KHÁC NHAU ⇒ bản này KHÔNG cài đè được lên bản kia (Android bắt gỡ app).")
    print(f"   APK 1: {sorted(a['chu_ky'].values())[0][:40] if a['chu_ky'] else 'không có'}")
    print(f"   APK 2: {sorted(b['chu_ky'].values())[0][:40] if b['chu_ky'] else 'không có'}")

print(f"\nBundle web giống nhau: {'CÓ' if a['bundle'] == b['bundle'] else 'KHÔNG'}")

chi_a = {k for k in a["kich_thuoc"] if k not in b["kich_thuoc"]}
chi_b = {k for k in b["kich_thuoc"] if k not in a["kich_thuoc"]}
print(f"\nMục CHỈ có ở APK 1 ({len(chi_a)}):")
for k in sorted(chi_a)[:12]:
    print(f"   - {k} ({a['kich_thuoc'][k]:,} byte)")
print(f"Mục CHỈ có ở APK 2 ({len(chi_b)}):")
for k in sorted(chi_b)[:12]:
    print(f"   - {k} ({b['kich_thuoc'][k]:,} byte)")

lech = [
    (abs(a["kich_thuoc"][k] - b["kich_thuoc"][k]), k, a["kich_thuoc"][k], b["kich_thuoc"][k])
    for k in a["kich_thuoc"]
    if k in b["kich_thuoc"] and a["kich_thuoc"][k] != b["kich_thuoc"][k]
]
lech.sort(reverse=True)
print(f"\nMục lệch kích thước ({len(lech)}), 15 cái lệch nhiều nhất:")
for d, k, s1, s2 in lech[:15]:
    print(f"   - {k}: {s1:,} → {s2:,} (lệch {d:,})")
