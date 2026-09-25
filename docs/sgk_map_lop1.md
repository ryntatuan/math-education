# Bảng ánh xạ TRANG → BÀI — **Lớp 1** (SGK Toán 1, bộ _Kết nối tri thức với cuộc sống_)

**Vì sao có file này:** quy trình rà soát (§11 Bước 0 của `sgk_curriculum_standardization_plan.md`) bắt buộc
dựng bảng ánh xạ **trước** khi sửa bất cứ thứ gì. Không có bảng này thì mọi kết luận đều có thể **lệch trang** —
tiền lệ: bản kế hoạch đầu tiên ghi sai “Bài 16 = tr.101” trong khi đúng là tr.100–101, và ghi sai quy ước `t{N}`.

**Ngày dựng:** 2026-09-25 · **Nguồn:** ảnh mục lục SGK (không dùng OCR — OCR sai chính tả nhiều, xem §4).

---

## 0. Quy ước & cách dùng

- Sách in thành **2 tập**: **tập 1 = Chủ đề 1–5** (HK1), **tập 2 = Chủ đề 6–10** (HK2).
  **Số trang in của mỗi tập ĐẾM RIÊNG** (tập 2 bắt đầu lại từ trang 1) ⇒ luôn phải nói rõ **tập nào**.
- Ảnh trang đã trích (300 DPI, `.gitignore` đã chặn):
  `scratch/sgk-lop1/math-grade-1-part-1/page-NNNN.png` và `.../math-grade-1-part-2/page-NNNN.png`
  Trích lại (chạy lại được, tự bỏ qua trang đã có):
  ```
  python scratch/trich-anh-sgk.py --grade 1
  ```
- 🔴 **trang PDF = trang sách + 1** — đã kiểm chéo **4 mẫu**: tập 1: sách 2 = PDF 3, sách 4 = PDF 5;
  tập 2: sách 3 = PDF 4, sách 4 = PDF 5. Ví dụ: “Bài 4 (So sánh số), sách tr.24” ⇒ xem `part-1/page-0025.png`.
- Quy mô app (sinh lại bằng `node scratch/in-cau-truc-lop.bundle.mjs 1`): **10 chương · 97 bài · 690 slide**.
- Cột **“Chắc chắn?”**: `✔` = mô tả bài trong app **đã ghi rõ trang SGK** (đọc từ `client/src/data/grade1/*.js`);
  `?` = tôi **suy theo nội dung** ⇒ khi rà chương đó **phải mở ảnh kiểm lại**, đừng tin cột này.

---

## 1. Mục lục SGK chép từ ẢNH (nguồn gốc, không qua OCR)

### Tập 1 — Chủ đề 1–5 (`Math grade 1 part 1.pdf`, 117 trang in 1–117 → PDF 2–118)

| Chủ đề | Tên                                  | Trang sách |
| :----- | :----------------------------------- | :--------- |
| 1      | CÁC SỐ TỪ 0 ĐẾN 10                   | 6          |
| 2      | LÀM QUEN VỚI MỘT SỐ HÌNH PHẲNG       | 46         |
| 3      | PHÉP CỘNG, PHÉP TRỪ TRONG PHẠM VI 10 | 56         |
| 4      | LÀM QUEN VỚI MỘT SỐ HÌNH KHỐI        | 92         |
| 5      | ÔN TẬP HỌC KÌ 1                      | 102        |

| Bài    | Tên                                                 | Trang sách | Trang PDF |
| :----- | :-------------------------------------------------- | :--------- | :-------- |
| —      | Tiết học đầu tiên                                   | 6          | 7         |
| Bài 1  | Các số 0, 1, 2, 3, 4, 5                             | 8          | 9         |
| Bài 2  | Các số 6, 7, 8, 9, 10                               | 14         | 15        |
| Bài 3  | Nhiều hơn, ít hơn, bằng nhau                        | 20         | 21        |
| Bài 4  | So sánh số                                          | 24         | 25        |
| Bài 5  | Mấy và mấy                                          | 32         | 33        |
| Bài 6  | Luyện tập chung                                     | 38         | 39        |
| Bài 7  | Hình vuông, hình tròn, hình tam giác, hình chữ nhật | 46         | 47        |
| Bài 8  | Thực hành lắp ghép, xếp hình                        | 50         | 51        |
| Bài 9  | Luyện tập chung                                     | 54         | 55        |
| Bài 10 | Phép cộng trong phạm vi 10                          | 56         | 57        |
| Bài 11 | Phép trừ trong phạm vi 10                           | 68         | 69        |
| Bài 12 | Bảng cộng, bảng trừ trong phạm vi 10                | 80         | 81        |
| Bài 13 | Luyện tập chung                                     | 86         | 87        |
| Bài 14 | Khối lập phương, khối hộp chữ nhật                  | 92         | 93        |
| Bài 15 | Vị trí, định hướng trong không gian                 | 96         | 97        |
| Bài 16 | Luyện tập chung                                     | 100        | 101       |
| Bài 17 | Ôn tập các số trong phạm vi 10                      | 102        | 103       |
| Bài 18 | Ôn tập phép cộng, phép trừ trong phạm vi 10         | 106        | 107       |
| Bài 19 | Ôn tập hình học                                     | 110        | 111       |
| Bài 20 | Ôn tập chung                                        | 112        | 113       |
| —      | Một số thuật ngữ dùng trong sách                    | 114        | 115       |

### Tập 2 — Chủ đề 6–10 (`Math grade 1 part 2.pdf`, 109 trang → PDF 2–110)

| Chủ đề | Tên                                               | Trang sách |
| :----- | :------------------------------------------------ | :--------- |
| 6      | CÁC SỐ ĐẾN 100                                    | 4          |
| 7      | ĐỘ DÀI VÀ ĐO ĐỘ DÀI                               | 28         |
| 8      | PHÉP CỘNG, PHÉP TRỪ (không nhớ) TRONG PHẠM VI 100 | 44         |
| 9      | THỜI GIAN. GIỜ VÀ LỊCH                            | 72         |
| 10     | ÔN TẬP CUỐI NĂM                                   | 88         |

| Bài    | Tên                                             | Trang sách | Trang PDF |
| :----- | :---------------------------------------------- | :--------- | :-------- |
| Bài 21 | Số có hai chữ số                                | 4          | 5         |
| Bài 22 | So sánh số có hai chữ số                        | 16         | 17        |
| Bài 23 | Bảng các số từ 1 đến 100                        | 22         | 23        |
| Bài 24 | Luyện tập chung                                 | 24         | 25        |
| Bài 25 | Dài hơn, ngắn hơn                               | 28         | 29        |
| Bài 26 | Đơn vị đo độ dài                                | 32         | 33        |
| Bài 27 | Thực hành ước lượng và đo độ dài                | 36         | 37        |
| Bài 28 | Luyện tập chung                                 | 40         | 41        |
| Bài 29 | Phép cộng số có hai chữ số với số có một chữ số | 44         | 45        |
| Bài 30 | Phép cộng số có hai chữ số với số có hai chữ số | 48         | 49        |
| Bài 31 | Phép trừ số có hai chữ số cho số có một chữ số  | 52         | 53        |
| Bài 32 | Phép trừ số có hai chữ số cho số có hai chữ số  | 58         | 59        |
| Bài 33 | Luyện tập chung                                 | 64         | 65        |
| Bài 34 | Xem giờ đúng trên đồng hồ                       | 72         | 73        |
| Bài 35 | Các ngày trong tuần                             | 76         | 77        |
| Bài 36 | Thực hành xem lịch và giờ                       | 80         | 81        |
| Bài 37 | Luyện tập chung                                 | 84         | 85        |
| Bài 38 | Ôn tập các số và phép tính trong phạm vi 10     | 88         | 89        |
| Bài 39 | Ôn tập các số và phép tính trong phạm vi 100    | 94         | 95        |
| Bài 40 | Ôn tập hình học và đo lường                     | 100        | 101       |
| Bài 41 | Ôn tập chung                                    | 104        | 105       |
| —      | Một số thuật ngữ dùng trong sách                | 106        | 107       |

> Phạm vi trang của từng bài = **từ trang của bài đó tới trang trước bài kế tiếp** (trừ khi ghi rõ).

### Cấu trúc mỗi bài trong SGK (3 trụ cột + 2 phần đặc biệt)

| Phần        | Biểu tượng | Trang xuất hiện (Chủ đề 1)                              |
| :---------- | :--------- | :------------------------------------------------------ |
| `Khám phá`  | kính lúp   | 8, 14, 20, 24, 26, 28, 32, 34                           |
| `Hoạt động` | Rô-bốt     | 9, 15, 20, 24, 26, 28, 32, 34                           |
| `Luyện tập` | cuốn sách  | 10–13, 16–18, 22–23, 25, 27, 29–31, 36–37, 40–42, 44–45 |
| `Trò chơi`  | xúc xắc    | **19** (“Nhặt trứng”), **43** (“Cầu thang – Cầu trượt”) |

Biểu tượng trong sách (trang “Hướng dẫn sử dụng sách”, sách tr.2 · PDF 3): `Khám phá` · `Hoạt động` ·
`Trò chơi` · `Luyện tập` · ô `Số ?` (tìm số thích hợp) · ô `>; <; = ?` (tìm dấu) · `Đ, S ?` (câu nào đúng/sai — **quan trọng**: Lớp 1 có dạng này).

---

## 2. Ánh xạ từng chương

### Chủ đề 1 — Các số từ 0 đến 10 (sách tr.6–45) · ✅ **ĐÃ RÀ** — `docs/sgk_audit_lop1.md`

| SGK                                  | Trang sách | Bài trong app                                     | Chắc chắn? |
| :----------------------------------- | :--------- | :------------------------------------------------ | :--------- |
| Tiết học đầu tiên                    | 6–7        | `g1-c1-l1`                                        | ✔          |
| Bài 1 (Các số 0,1,2,3,4,5)           | 8–13       | `g1-c1-l2` (0,1,2,3) · `g1-c1-l3` (4,5)           | ✔          |
| Bài 2 (Các số 6…10)                  | 14–19      | `g1-c1-l4` (14–17) · `g1-c1-l5` (luyện tập tr.18) | ✔          |
| Bài 3 (Nhiều hơn, ít hơn, bằng nhau) | 20–23      | `g1-c1-l6` (20–21) · `g1-c1-l7` (22–23)           | ✔          |
| Bài 4 (So sánh số)                   | 24–31      | `g1-c1-l8`                                        | ✔          |
| Bài 5 (Mấy và mấy)                   | 32–37      | `g1-c1-l9` (32–35) · `g1-c1-l10` (36–37)          | ✔          |
| Bài 6 (Luyện tập chung)              | 38–45      | `g1-c1-l11` (38–41) · `g1-c1-l12` (42–45)         | ✔          |

### Chủ đề 2 — Làm quen với một số hình phẳng (sách tr.46–55) · ✅ **ĐÃ RÀ + SỬA XONG 2026-09-25** — bảng phát hiện + kết quả: `docs/sgk_audit_lop1.md`

| SGK                                                         | Trang sách | Bài trong app                                                                 | Chắc chắn? |
| :---------------------------------------------------------- | :--------- | :---------------------------------------------------------------------------- | :--------- |
| Bài 7 (Hình vuông, hình tròn, hình tam giác, hình chữ nhật) | 46–49      | `g1-c2-l1`…`l5` (vuông · tròn · tam giác · chữ nhật · nhận biết trong đồ vật) | ?          |
| Bài 8 (Thực hành lắp ghép, xếp hình)                        | 50–53      | `g1-c2-l6`                                                                    | ?          |
| Bài 9 (Luyện tập chung)                                     | 54–55      | `g1-c2-l7` (đếm hình) · `g1-c2-l8` (luyện tập chung)                          | ?          |

### Chủ đề 3 — Phép cộng, phép trừ trong phạm vi 10 (sách tr.56–91) · ✅ **ĐÃ RÀ 2026-09-25** — bổ sung dạng bài SGK: `docs/sgk_audit_lop1.md`

| SGK                                 | Trang sách | Bài trong app                                                        | Chắc chắn? |
| :---------------------------------- | :--------- | :------------------------------------------------------------------- | :--------- |
| Bài 10 (Phép cộng trong phạm vi 10) | 56–67      | `g1-c3-l1`…`l4` (dấu cộng · đếm tiếp · đổi chỗ · số 0 trong cộng)    | ?          |
| Bài 11 (Phép trừ trong phạm vi 10)  | 68–79      | `g1-c3-l5`…`l7` (dấu trừ · đếm lùi · số 0 và trừ hai số bằng nhau)   | ?          |
| Bài 12 (Bảng cộng, bảng trừ)        | 80–85      | `g1-c3-l8`…`l11` (bảng cộng · bảng trừ · quan hệ · tìm số còn thiếu) | ?          |
| Bài 13 (Luyện tập chung)            | 86–91      | `g1-c3-l12`…`l14` (bài toán lời văn · luyện tập · luyện tập chung)   | ?          |

### Chủ đề 4 — Làm quen với một số hình khối (sách tr.92–101) · ✅ **ĐÃ RÀ** — plan §8 (Đợt 1.1)

| SGK                                          | Trang sách | Bài trong app            | Chắc chắn? |
| :------------------------------------------- | :--------- | :----------------------- | :--------- |
| Bài 14 (Khối lập phương, khối hộp chữ nhật)  | 92–95      | `g1-c4-l1` · `l2` · `l3` | ✔          |
| Bài 15 (Vị trí, định hướng trong không gian) | 96–99      | `g1-c4-l4` · `l5` · `l6` | ✔          |
| Bài 16 (Luyện tập chung)                     | 100–101    | `g1-c4-l7`               | ✔          |

### Chủ đề 5 — Ôn tập học kì 1 (sách tr.102–113) · ✅ **ĐÃ RÀ 2026-09-25** (6/12 trang) — bổ sung 9 slide: `docs/sgk_audit_lop1.md`

| SGK                                             | Trang sách | Bài trong app     | Chắc chắn? |
| :---------------------------------------------- | :--------- | :---------------- | :--------- |
| Bài 17 (Ôn tập các số trong phạm vi 10)         | 102–105    | `g1-c5-l1` · `l2` | ?          |
| Bài 18 (Ôn tập phép cộng, phép trừ trong PV 10) | 106–109    | `g1-c5-l3`        | ?          |
| Bài 19 (Ôn tập hình học)                        | 110–111    | `g1-c5-l4` · `l5` | ?          |
| Bài 20 (Ôn tập chung)                           | 112–113    | `g1-c5-l6`        | ?          |

### Chủ đề 6 — Các số đến 100 (**tập 2**, sách tr.4–27) · ✅ **ĐÃ RÀ 2026-09-25** — đã xem ảnh **tr.5, 6, 14, 15, 23** và phủ: bảng Viết/Đọc số 11→20 · dãy số 1→20 (HĐ3 tr.5) · 6 đoàn tàu (LT1 tr.6) · **bảng “gồm mấy chục, mấy đơn vị”** + **bảng số 0–99 còn thiếu** (LT tr.14) · trò chơi “Cánh cụt câu cá” → 2 câu hỏi (tr.15) · **bài toán lớp 1A/1B/1C** (tr.21) · **3 dãy “Số ?”** + câu hỏi bảng 100 số (tr.23) · luyện tập chung (tr.25). Còn **chưa đưa vào app**: HĐ1–HĐ2 tr.5 (túi 10 quả cà chua · đếm đồ vật trong tranh), các trò chơi theo nhóm (tr.7 · tr.11? · tr.16 · tr.20), bài “mảnh ghép” tr.26

| SGK                               | Trang sách | Bài trong app                                                          | Chắc chắn? |
| :-------------------------------- | :--------- | :--------------------------------------------------------------------- | :--------- |
| Bài 21 (Số có hai chữ số)         | 4–15       | `g1-c6-l1`…`l5` (chục · 11–20 · tròn chục · chục–đơn vị · đọc viết)    | ?          |
| Bài 22 (So sánh số có hai chữ số) | 16–21      | `g1-c6-l6` · `l7` · `l8` (so sánh · lớn nhất/bé nhất · liền trước/sau) | ?          |
| Bài 23 (Bảng các số từ 1 đến 100) | 22–23      | `g1-c6-l9` · `l10` · `l11` (bảng 100 số · đếm thêm/lùi · số còn thiếu) | ?          |
| Bài 24 (Luyện tập chung)          | 24–27      | `g1-c6-l12`                                                            | ?          |

### Chủ đề 7 — Độ dài và đo độ dài (**tập 2**, sách tr.28–43) · 🔄 **ĐANG RÀ** — đã xem ảnh **tr.36, tr.38** (và OCR tr.28–43); đã **thêm bài còn thiếu “Cao hơn, thấp hơn”** (tr.30–31 — trước đó app KHÔNG có bài nào, nhóm lỗi A) với biểu đồ cột so chiều cao + 3 câu hỏi. **Còn lại (cần CHỐT với bạn vì sách in sẵn đáp án mờ/khó đo):** bài “Chọn số đo độ dài phù hợp” tr.36 (sách tô sẵn một số ô, không dám đoán) · bài đếm đồ chơi trên lưới ô vuông có thước 0–14 tr.38 · các bài tr.39–43

| SGK                                       | Trang sách | Bài trong app                                                          | Chắc chắn? |
| :---------------------------------------- | :--------- | :--------------------------------------------------------------------- | :--------- |
| Bài 25 (Dài hơn, ngắn hơn)                | 28–31      | `g1-c7-l1` · `l2` (nhìn trực tiếp · qua vật trung gian)                | ?          |
| Bài 26 (Đơn vị đo độ dài)                 | 32–35      | `g1-c7-l3` · `l4` · `l5` (xăng-ti-mét · dùng thước đo · vẽ đoạn thẳng) | ?          |
| Bài 27 (Thực hành ước lượng và đo độ dài) | 36–39      | `g1-c7-l6` · `l7` (ước lượng rồi đo · đo bằng gang tay/bước chân)      | ?          |
| Bài 28 (Luyện tập chung)                  | 40–43      | `g1-c7-l8`                                                             | ?          |

### Chủ đề 8 — Cộng, trừ (không nhớ) trong phạm vi 100 (**tập 2**, sách tr.44–71) · ✅ **ĐÃ RÀ 2026-09-25 (bằng máy)** — SGK gồm “Đặt tính rồi tính” · “Tính nhẩm” · trò chơi; app có đủ 12 bài (cộng/trừ 2 chữ số với 1 và 2 chữ số · 4 bài luyện tập · tính nhẩm · 2 bài toán lời văn · luyện tập chung) và **KHÔNG có bảng “Số ?” nào trong SGK** ⇒ không phải bổ sung dạng điền. **Số học: máy kiểm 142 phép tính `operation` + 1626 câu phép tính trong chữ ⇒ 0 sai** (`node scratch/soat-phep-tinh.mjs`)

| SGK                                                 | Trang sách | Bài trong app                                                    | Chắc chắn? |
| :-------------------------------------------------- | :--------- | :--------------------------------------------------------------- | :--------- |
| Bài 29 (Cộng số có hai chữ số với số có một chữ số) | 44–47      | `g1-c8-l1` · `l2`                                                | ?          |
| Bài 30 (Cộng số có hai chữ số với số có hai chữ số) | 48–51      | `g1-c8-l3` · `l4`                                                | ?          |
| Bài 31 (Trừ số có hai chữ số cho số có một chữ số)  | 52–57      | `g1-c8-l5` · `l6`                                                | ?          |
| Bài 32 (Trừ số có hai chữ số cho số có hai chữ số)  | 58–63      | `g1-c8-l7` · `l8`                                                | ?          |
| Bài 33 (Luyện tập chung)                            | 64–71      | `g1-c8-l9`…`l12` (tính nhẩm · toán lời văn ×2 · luyện tập chung) | ?          |

### Chủ đề 9 — Thời gian. Giờ và lịch (**tập 2**, sách tr.72–87) · ⬜ **CHƯA RÀ**

| SGK                                | Trang sách | Bài trong app                                                   | Chắc chắn? |
| :--------------------------------- | :--------- | :-------------------------------------------------------------- | :--------- |
| Bài 34 (Xem giờ đúng trên đồng hồ) | 72–75      | `g1-c9-l1`…`l4` (mặt đồng hồ · giờ đúng · các buổi · thực hành) | ?          |
| Bài 35 (Các ngày trong tuần)       | 76–79      | `g1-c9-l5` · `l6` (7 ngày · hôm qua/hôm nay/ngày mai)           | ?          |
| Bài 36 (Thực hành xem lịch và giờ) | 80–83      | `g1-c9-l7` · `l8` (tờ lịch · tìm ngày trong tháng)              | ?          |
| Bài 37 (Luyện tập chung)           | 84–87      | `g1-c9-l9`                                                      | ?          |

### Chủ đề 10 — Ôn tập cuối năm (**tập 2**, sách tr.88–105) · ⬜ **CHƯA RÀ**

| SGK                                                   | Trang sách | Bài trong app                                                                     | Chắc chắn? |
| :---------------------------------------------------- | :--------- | :-------------------------------------------------------------------------------- | :--------- |
| Bài 38 (Ôn tập các số và phép tính trong phạm vi 10)  | 88–93      | `g1-c10-l1` · `l2`                                                                | ?          |
| Bài 39 (Ôn tập các số và phép tính trong phạm vi 100) | 94–99      | `g1-c10-l3` · `l4`                                                                | ?          |
| Bài 40 (Ôn tập hình học và đo lường)                  | 100–103    | `g1-c10-l5` · `l6`                                                                | ?          |
| Bài 41 (Ôn tập chung)                                 | 104–105    | `g1-c10-l7` · `l8`                                                                | ?          |
| _(không thuộc SGK)_                                   | —          | `g1-c10-l9` “Luyện đề cuối năm Lớp 1” — **hoạt động bổ sung**, không phải bài SGK | —          |

---

## 3. Trạng thái rà soát Lớp 1

| Chương            | SGK                  | Trạng thái                        | Ghi chú                                                             |
| :---------------- | :------------------- | :-------------------------------- | :------------------------------------------------------------------ |
| 1                 | Các số từ 0 đến 10   | ✅ đã rà (2026-09-24)             | Bảng phát hiện: `docs/sgk_audit_lop1.md`                            |
| 4                 | Hình khối            | ✅ đã rà (Đợt 1.1)                | plan §8                                                             |
| 2                 | Hình phẳng           | ✅ đã rà + sửa (2026-09-25)       | plan §8l · 6 lỗi nội dung + 3 hoạt động SGK thêm vào                |
| 3                 | Phép cộng, trừ PV 10 | ✅ đã rà 21/36 trang (2026-09-25) | plan §8m · app không sai phép tính nào · thêm 12 slide dạng bài SGK |
| 5, 6, 7, 8, 9, 10 | —                    | ⬜ **chưa rà ảnh SGK**            | Cần làm theo §9 của plan (mỗi chương một đợt nhỏ)                   |

---

## 4. Vì sao phải đọc ẢNH, không dùng OCR

Bản OCR `.md` của Lớp 1 rất mỏng (21,8 KB + 29,3 KB cho 226 trang) và **sai chính tả nhiều**, ví dụ nguyên văn trong `docs/Data Source/Grade 1/Math grade 1 part 1.md`:

```
Bài 4. So sónh số 24          (đúng: “So sánh số”, tr.24)
Bài 12. Bỏng cộng, bỏng trừ irong phạm vi 10 80   (đúng: “Bảng cộng, bảng trừ trong phạm vi 10”, tr.80)
```

⇒ OCR chỉ dùng để **định vị trang**, mọi con số/kết luận phải đọc từ ảnh (`scratch/sgk-lop1/...`).
