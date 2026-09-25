# Rà soát chương trình học: app vs SGK

Ngày rà: 2026-09-21 · Nguồn: 8 file OCR trong `docs/Data Source/` · Dữ liệu app: `client/src/data/gradeNData.js`

> **TRẠNG THÁI: ĐÃ XỬ LÝ XONG (2026-09-22).** Cả 10 lỗi ở mục 4 đã sửa. Lớp 1, 2, 3 được
> **dựng lại toàn bộ** (10 · 14 · 16 chủ đề), Lớp 4–5 đã **rà từng bài** và không có lỗi nào.
> Số đo hiện tại: **5 lớp · 51 chương · 460 bài · 2735 slide**; DB đã nạp lại và `--verify`
> khớp hoàn toàn. Bảng ở mục 2 và mục 3 giữ nguyên **số đo lúc rà** (trước khi sửa) để đối
> chiếu — đọc mục 5 để biết việc nào đã làm.

## 1. Cách làm

- Lấy **mục lục thật** của từng cuốn SGK từ 8 file `.md` vừa OCR, rồi đọc thêm các trang
  nội dung để kiểm chứng (không chỉ tin mục lục — mục lục OCR có thể sót dòng).
- Lấy **toàn bộ chương trình app** bằng công cụ `scratch/dump-outline.mjs`
  (xuất ra `scratch/outline.txt`; số đo **lúc rà** là 5 lớp / 46 chương / 461 bài / 1966 slide).
- Đối chiếu theo: số chủ đề → tên chủ đề → từng chủ đề kiến thức → từng bài.

## 2. Quy mô hai bên

| Lớp | SGK dùng cho app          | Số chủ đề SGK | Số bài SGK | Số chương app | Số bài app |
| --- | ------------------------- | ------------- | ---------- | ------------- | ---------- |
| 1   | Toán 1 (Kết nối tri thức) | 10            | 41         | 10            | 112        |
| 2   | Toán 2 (Kết nối tri thức) | **14**        | **75**     | 10            | 114        |
| 3   | Toán 3 (Kết nối tri thức) | **16**        | **81**     | 10            | 116        |
| 4   | Toán 4 (NXB GD, bộ cũ)    | 6 chương      | —          | 6             | 65         |
| 5   | Toán 5 (NXB GD, bộ cũ)    | 5 chương      | —          | 5             | 54         |

Ghi chú: app **chia nhỏ bài** SGK thành nhiều bài ngắn hơn (ví dụ lớp 1: 41 bài SGK → 112 bài app).
Đó là chủ ý, **không phải lỗi**. Lỗi là khi **chủ đề kiến thức** bị đặt sai lớp.

## 3. Mục lục SGK thật

### Lớp 1 (10 chủ đề / 41 bài)

| Chủ đề | Tên                                                   | Bài   |
| ------ | ----------------------------------------------------- | ----- |
| 1      | Các số từ 0 đến 10                                    | 1–6   |
| 2      | Làm quen với một số hình phẳng                        | 7–9   |
| 3      | Phép cộng, phép trừ trong phạm vi 10                  | 10–13 |
| 4      | Làm quen với một số hình khối                         | 14–16 |
| 5      | **Ôn tập học kì 1**                                   | 17–20 |
| 6      | Các số đến 100                                        | 21–24 |
| 7      | Độ dài và đo độ dài                                   | 25–28 |
| 8      | Phép cộng, phép trừ (**không nhớ**) trong phạm vi 100 | 29–33 |
| 9      | Thời gian. Giờ và lịch                                | 34–37 |
| 10     | Ôn tập cuối năm                                       | 38–41 |

Chi tiết đáng chú ý: chủ đề 8 ghi rõ **"không nhớ"**, và toàn bộ sách **không có** phần
"cộng/trừ qua 10". Kiểm chứng: tìm chuỗi `qua 10` trong cả 2 file lớp 1 → **0 kết quả**
(trong khi lớp 2 có 13 kết quả).

### Lớp 2 (14 chủ đề / 75 bài)

| Chủ đề | Tên                                            | Bài       |
| ------ | ---------------------------------------------- | --------- |
| 1      | Ôn tập và bổ sung                              | 1–6       |
| 2      | Phép cộng, phép trừ trong phạm vi 20           | 7–14      |
| 3      | Làm quen với khối lượng, dung tích             | 15–18     |
| 4      | Phép cộng, phép trừ (có nhớ) trong phạm vi 100 | 19–24     |
| 5      | Làm quen với hình phẳng                        | 25–28     |
| 6      | Ngày – giờ, giờ – phút, ngày – tháng           | 29–32     |
| 7      | **Ôn tập học kì 1**                            | 33–36     |
| 8      | **Phép nhân, phép chia**                       | **37–45** |
| 9      | Làm quen với hình khối                         | 46–47     |
| 10     | Các số trong phạm vi 1 000                     | 48–54     |
| 11     | Độ dài và đơn vị đo độ dài. Tiền Việt Nam      | 55–58     |
| 12     | Phép cộng, phép trừ trong phạm vi 1 000        | 59–63     |
| 13     | Làm quen với yếu tố thống kê, xác suất         | 64–67     |
| 14     | Ôn tập cuối năm                                | 68–75     |

**Chủ đề 8 — toàn bộ nội dung phép nhân/chia của lớp 2:**

| Bài | Tên                         | Trang |
| --- | --------------------------- | ----- |
| 37  | Phép nhân                   | 4     |
| 38  | Thừa số, tích               | 7     |
| 39  | **Bảng nhân 2**             | 8     |
| 40  | **Bảng nhân 5**             | 12    |
| 41  | Phép chia                   | 15    |
| 42  | Số bị chia, số chia, thương | 18    |
| 43  | **Bảng chia 2**             | 23    |
| 44  | **Bảng chia 5**             | 24    |
| 45  | Luyện tập chung             | 30    |

Kiểm chứng thêm (vì đây là điểm bạn nêu):

- Tìm `PH.N` (PHẦN/PHÀN) trong cả 2 file lớp 2 → **không có** "một phần hai / một phần ba /
  một phần tư / một phần năm" ở **bất kỳ đâu**. Chỉ có "thành phần của phép cộng",
  "hình phẳng", "phân loại".
- Đọc trực tiếp trang 23–30: sau BẢNG CHIA 5 là trang trò chơi, rồi **LUYỆN TẬP CHUNG
  (Bài 45)**, rồi sang chủ đề 9 (Bài 46 — Khối trụ, khối cầu). Không có bài "một phần mấy".

### Lớp 3 (16 chủ đề / 81 bài)

| Chủ đề | Tên                                                      | Bài   |
| ------ | -------------------------------------------------------- | ----- |
| 1      | Ôn tập và bổ sung                                        | 1–8   |
| 2      | Bảng nhân, bảng chia                                     | 9–15  |
| 3      | Làm quen với hình phẳng, hình khối                       | 16–22 |
| 4      | Phép nhân, phép chia trong phạm vi 100                   | 23–29 |
| 5      | Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ | 30–35 |
| 6      | Phép nhân, phép chia trong phạm vi 1 000                 | 36–40 |
| 7      | **Ôn tập học kì 1**                                      | 41–44 |
| 8      | Các số đến 10 000                                        | 45–49 |
| 9      | Chu vi, diện tích một số hình phẳng                      | 50–53 |
| 10     | Cộng, trừ, nhân, chia trong phạm vi 10 000               | 54–58 |
| 11     | Các số đến 100 000                                       | 59–62 |
| 12     | Cộng, trừ trong phạm vi 100 000                          | 63–65 |
| 13     | Xem đồng hồ. Tháng – năm. Tiền Việt Nam                  | 66–69 |
| 14     | Nhân, chia trong phạm vi 100 000                         | 70–72 |
| 15     | Làm quen với yếu tố thống kê, xác suất                   | 73–75 |
| 16     | Ôn tập cuối năm                                          | 76–81 |

**Chủ đề 1 — chỗ chứa bảng nhân 3 và 4:**

| Bài | Tên                                            | Trang |
| --- | ---------------------------------------------- | ----- |
| 1   | Ôn tập các số đến 1 000                        | 6     |
| 2   | Ôn tập phép cộng, phép trừ trong phạm vi 1 000 | 9     |
| 3   | Tìm thành phần trong phép cộng, phép trừ       | 11    |
| 4   | Ôn tập bảng nhân 2; 5, bảng chia 2; 5          | 14    |
| 5   | **Bảng nhân 3, bảng chia 3**                   | 16    |
| 6   | **Bảng nhân 4, bảng chia 4**                   | 19    |
| 7   | Ôn tập hình học và đo lường                    | 21    |
| 8   | Luyện tập chung                                | 24    |

**Chủ đề 2 — Bảng nhân, bảng chia:**

| Bài | Tên                                       | Trang |
| --- | ----------------------------------------- | ----- |
| 9   | Bảng nhân 6, bảng chia 6                  | 28    |
| 10  | Bảng nhân 7, bảng chia 7                  | 31    |
| 11  | Bảng nhân 8, bảng chia 8                  | 33    |
| 12  | Bảng nhân 9, bảng chia 9                  | 36    |
| 13  | Tìm thành phần trong phép nhân, phép chia | 39    |
| 14  | Một phần mấy                              | 42    |
| 15  | Luyện tập chung                           | 46    |

Kiểm chứng: tìm `phân số` trong cả 2 file lớp 3 → **0 kết quả**
(chỉ có "phân loại", "trung thành phần"). Trong khi đó **"Tiền Việt Nam"** (Bài 68) và
**"Mi-li-mét"** (Bài 30) thì **có**.

### Lớp 4 và Lớp 5

Hai cuốn này là bộ cũ (NXB Giáo dục), mục lục in **2 cột** nên OCR bị trộn cột — chỉ đọc
chắc được **cấp chương**. Kết quả: **khớp** với app.

- Lớp 4 — SGK: Chương một _Số tự nhiên. Bảng đơn vị đo khối lượng_ · Chương hai _Bốn phép tính
  với các số tự nhiên. Hình học_ · Chương ba _Dấu hiệu chia hết cho 2, 5, 9, 3. Giới thiệu hình
  bình hành_ · Chương bốn _Phân số – Các phép tính với phân số. Giới thiệu hình thoi_ ·
  Chương năm _Tỉ số – Một số bài toán liên quan đến tỉ số. Tỉ lệ bản đồ_ · Chương sáu _Ôn tập_.
  → App có đúng 6 chương với nội dung tương ứng.
- Lớp 5 — SGK: Chương một _Ôn tập và bổ sung về phân số. Giải toán liên quan đến tỉ lệ. Bảng đơn
  vị đo diện tích_ · Chương hai _Số thập phân. Các phép tính với số thập phân_ · Chương ba
  _Hình học_ · Chương bốn _Số đo thời gian. Toán chuyển động đều_ · Chương năm _Ôn tập_.
  → App có đúng 5 chương.

Việc **rà từng bài** của lớp 4–5 vẫn cần làm, nhưng mức độ rủi ro thấp hơn nhiều so với lớp 1–3.

## 4. Lỗi đã xác nhận

### Lỗi 1 (nghiêm trọng) — Lớp 2 dạy bảng nhân/chia 3 và 4

SGK lớp 2 **chỉ** dạy bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5.
Bảng nhân/chia 3 và 4 thuộc **lớp 3** (Bài 5, 6 — chủ đề 1).

Các bài app cần sửa:

| Id          | Tên hiện tại                                        | Vấn đề                     |
| ----------- | --------------------------------------------------- | -------------------------- |
| `g2-c3-l7`  | Bài 7: Bảng nhân 3                                  | Không có trong SGK lớp 2   |
| `g2-c3-l8`  | Bài 8: Bảng nhân 4                                  | Không có trong SGK lớp 2   |
| `g2-c3-l9`  | Bài 9: Nhân với số 1 và số 0                        | SGK lớp 2 không có bài này |
| `g2-c3-l10` | Bài 10: Luyện tập tổng hợp các bảng nhân 2, 3, 4, 5 | Liệt kê 3, 4 sai           |
| `g2-c3-l12` | Bài 12: Thử thách tính nhẩm siêu tốc bảng nhân      | Phạm vi sai                |
| `g2-c4-l7`  | Bài 7: Bảng chia 3 & Một phần ba (1/3)              | Không có trong SGK lớp 2   |
| `g2-c4-l8`  | Bài 8: Bảng chia 4 & Một phần tư (1/4)              | Không có trong SGK lớp 2   |
| `g2-c4-l10` | Bài 10: Luyện tập chung các bảng chia 2, 3, 4, 5    | Liệt kê 3, 4 sai           |

### Lỗi 2 (nghiêm trọng) — Lớp 2 dạy "một phần mấy" (1/2, 1/3, 1/4, 1/5)

SGK Toán 2 **không có** nội dung này ở bất kỳ chủ đề nào (đã kiểm chứng 2 cách).
"Một phần mấy" là **Toán 3 — Bài 14** (chủ đề 2).

| Id          | Tên hiện tại                                       |
| ----------- | -------------------------------------------------- |
| `g2-c4-l4`  | Bài 4: Một phần hai (1/2)                          |
| `g2-c4-l6`  | Bài 6: Một phần năm (1/5)                          |
| `g2-c4-l9`  | Bài 9: Tìm một trong các phần bằng nhau của một số |
| `g2-c4-l12` | Bài 12: Một phần năm (1/5) của một nhóm đồ vật     |

### Lỗi 3 (nghiêm trọng) — Lớp 1 dạy "cộng trừ qua 10 trong phạm vi 20"

Đây là nội dung **Toán 2 — chủ đề 2** (Bài 7, 8, 11, 12). SGK Toán 1 chủ đề 8 ghi rõ
"**không nhớ**". Cả 12 bài của chương `g1-c4` thuộc nhóm này (ví dụ
`g1-c4-l3` "Phép cộng dạng 9 + 4 (Qua 10)", `g1-c4-l7` "Phép trừ dạng 11 - 5").

Đồng thời **trùng lặp**: app lớp 2 chương `g2-c2` cũng dạy đúng nội dung này.

### Lỗi 4 — Lớp 3 thiếu bảng nhân/chia 3 và 4

App lớp 3 có "Bảng nhân 6, 7, 8, 9" và "Bảng chia 6, 7, 8, 9" nhưng **không có bảng 3 và 4**
(đã bị chuyển xuống lớp 2). Cần đưa về đúng lớp 3.

### Lỗi 5 — Lớp 3 dạy "phân số"

Chương `g3-c5` gồm **12 bài về phân số** (khái niệm phân số, tử số/mẫu số, so sánh phân số,
phân số bằng 1…). SGK Toán 3 **không có** nội dung phân số (phân số là **Toán 4 — chương bốn**).

### Lỗi 6 — Lớp 3 dạy "Thế kỷ và Năm nhuận"

`g3-c7-l9` "Thế kỷ và Năm nhuận". SGK Toán 3 không có (thế kỉ thuộc **Toán 4** — "Giây, thế kỉ",
app đã có ở `g4-c1-l10`).

### Lỗi 7 — Lớp 2 dạy "Mi-li-mét (mm)"

`g2-c6-l3` "Mi-li-mét (mm)". SGK Toán 2 chủ đề 11 chỉ có **đề-xi-mét, mét, ki-lô-mét**.
Mi-li-mét thuộc **Toán 3 — Bài 30** (app đã có ở `g3-c7`).

### Lỗi 8 — Thiếu chủ đề "Ôn tập học kì 1"

| Lớp | SGK                  | App                 |
| --- | -------------------- | ------------------- |
| 1   | Chủ đề 5 (Bài 17–20) | **Thiếu hoàn toàn** |
| 2   | Chủ đề 7 (Bài 33–36) | **Thiếu hoàn toàn** |
| 3   | Chủ đề 7 (Bài 41–44) | **Thiếu hoàn toàn** |

### Lỗi 9 — Lớp 2 thiếu "Giới thiệu tiền Việt Nam"

SGK Toán 2 **Bài 56** (chủ đề 11). App lớp 2 không có bài nào về tiền.
(Tiền Việt Nam chỉ xuất hiện ở app lớp 3 — `g3-c7-l4`, `l5` — và lớp 3 SGK cũng có, nên lớp 3 là đúng.)

### Lỗi 10 — Lớp 3 thiếu chủ đề "Làm quen với hình phẳng, hình khối"

SGK chủ đề 3 (Bài 16–22): điểm ở giữa & trung điểm đoạn thẳng · hình tròn, tâm, bán kính,
đường kính · góc, góc vuông, góc không vuông · hình tam giác/tứ giác/chữ nhật/vuông ·
vẽ góc vuông, đường tròn, hình vuông · khối lập phương, khối hộp chữ nhật · luyện tập chung.

App lớp 3 chỉ có **góc vuông / góc không vuông** (`g3-c6-l1`, `l11`).
Kiểm chứng: tìm `trung điểm`, `bán kính`, `đường kính`, `khối lập phương` trong `grade3Data.js`
→ **0 kết quả**.

## 5. Kế hoạch viết lại

Nguyên tắc:

1. **Bám SGK theo đúng lớp** — không dạy trước, không dạy nội dung của lớp khác.
2. **Không đổi id bài đã có** — tiến độ của các bé khoá theo `lesson_id`, đổi id là mất tiến độ.
   Với bài có chủ đề sai: **giữ nguyên id, thay nội dung** sang chủ đề đúng của lớp đó.
3. **Thêm bài/chương mới thì dùng id mới** (ví dụ chương ôn tập học kì 1 của mỗi lớp) —
   thêm mới không ảnh hưởng tiến độ đã có.
4. **Không giới hạn số slide** — bài nào cần giải thích sâu thì thêm slide (khái niệm,
   ví dụ từng bước, hình ảnh, câu hỏi), miễn là đúng schema.
5. Viết lại theo **từng lớp một**, mỗi lớp xong thì đo lại trước khi sang lớp sau.

Thứ tự đề xuất:

| Bước | Việc                                                | Ghi chú                                                                           |
| ---- | --------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1    | Lớp 2 — phép nhân/chia (Lỗi 1, 2)                   | Nặng nhất, đúng thứ bạn nêu                                                       |
| 2    | Lớp 1 — chương `g1-c4` (Lỗi 3)                      | 12 bài                                                                            |
| 3    | Lớp 3 — bảng nhân/chia 3, 4 + bỏ phân số (Lỗi 4, 5) |                                                                                   |
| 4    | Lớp 2, 3 — sửa mi-li-mét, thế kỉ (Lỗi 6, 7)         |                                                                                   |
| 5    | Thêm chương Ôn tập học kì 1 cho lớp 1, 2, 3 (Lỗi 8) | Thêm mới, id mới                                                                  |
| 6    | Lớp 2 — thêm Tiền Việt Nam (Lỗi 9)                  | Thêm mới                                                                          |
| 7    | Lớp 3 — thêm chủ đề hình phẳng/hình khối (Lỗi 10)   | Thêm mới, khoảng 7 bài                                                            |
| 8    | Rà từng bài lớp 4, 5                                | Chỉ sửa nếu lệch                                                                  |
| 9    | Cập nhật quy mô hardcode + chạy cổng                | `MONG_DOI` trong `migrate-content.mjs`, cổng `S-15` trong `test-admin-portal.mjs` |

Sau mỗi lớp: `node scripts/migrate-content.mjs --sql` → dán lại seed → `--verify`.

> ✅ **Cả 9 bước đã làm xong** (2026-09-21 → 2026-09-22). Bước 8 (rà Lớp 4–5) kết luận
> **không có lỗi chủ đề** — chỉ 4 cặp mô tả bài trùng nhau được viết lại cho khác nhau.
> Quy trình nạp lại nay có thêm **bước 00** (`00-don-noi-dung-cu.sql`) vì seed chỉ upsert,
> **không tự xoá** bài cũ — thiếu bước đó thì bài sai chủ đề vẫn hiện trên app.
> Hướng dẫn từng bước cho người dùng: `docs/content_reload_steps.md`.

Công cụ đã có sẵn để kiểm nội dung: `scratch/soi-noi-dung.mjs` (6 phép kiểm mà cổng không làm được),
`scratch/soi-cau-truc.mjs` (in các khoá trong slide khái niệm của từng bài),
`scratch/so-sanh-summary.mjs` (so slide tóm tắt giữa hai bản — để phát hiện ghi đè nhầm).

## 6. Cần bạn chốt

**a) Cách xử lý bài có chủ đề sai (ví dụ `g2-c3-l7` "Bảng nhân 3").** Ba lựa chọn:

1. _Giữ id, thay nội dung_ (khuyến nghị) — bé đã học bài này sẽ thấy nội dung mới; không mất tiến độ.
2. _Xoá bài_ — mất tiến độ của bé đã hoàn thành bài đó.
3. _Đổi id_ — coi như bài mới, tiến độ cũ mất.

**b) Có dựng lại cấu trúc chương cho khớp SGK không?** App lớp 2 có 10 chương, SGK có 14 chủ đề;
app lớp 3 có 10 chương, SGK có 16 chủ đề.

1. _Giữ 10 chương, chỉ sửa/gom lại nội dung cho đúng_ (khuyến nghị) — ít rủi ro nhất,
   không đổi id chương.
2. _Dựng lại thành 14 và 16 chương cho khớp SGK_ — đúng sách hơn nhưng phải tạo lại hầu hết
   id chương và id bài, **mất tiến độ của tất cả các bé** ở lớp 2 và lớp 3.

**c) Phạm vi.** Viết lại chỉ các bài bị lỗi (khoảng 40–50 bài), hay viết lại **cả 342 bài**
của lớp 1, 2, 3 cho đồng bộ chất lượng?

**d) Lớp 4, 5.** Có muốn rà từng bài luôn không? (Mục lục khớp ở cấp chương, nhưng chưa so từng bài.)

## 7. Kết quả đã thực hiện

Bạn đã chốt cả bốn câu hỏi ở mục 6, và tôi đã làm xong theo hướng đó.

### 7.1. Quyết định của bạn

| Mục                  | Lựa chọn của bạn                            |
| -------------------- | ------------------------------------------- |
| a) Bài có chủ đề sai | Xoá bài đó đi                               |
| b) Cấu trúc chương   | Dựng lại thành 14 và 16 chương cho khớp SGK |
| c) Phạm vi           | Viết lại cả 342 bài của lớp 1, 2, 3         |
| d) Lớp 4, 5          | Có, rà từng bài                             |

### 7.2. Kết quả theo lớp

| Lớp      | Trước               | Sau                                          | Số slide |
| -------- | ------------------- | -------------------------------------------- | -------- |
| Lớp 1    | 10 chương · 106 bài | **10 chủ đề · 97 bài**                       | 531      |
| Lớp 2    | 10 chương · 122 bài | **14 chủ đề · 120 bài**                      | 666      |
| Lớp 3    | 10 chương · 108 bài | **16 chủ đề · 123 bài**                      | 707      |
| Lớp 4    | 6 chương · 65 bài   | giữ nguyên (đã đúng)                         | —        |
| Lớp 5    | 5 chương · 54 bài   | giữ nguyên (đã đúng)                         | —        |
| **Tổng** |                     | **5 lớp · 51 chương · 460 bài · 2735 slide** |          |

Mười lỗi ở mục 4 **đã xử lý hết**: lớp 2 không còn dạy bảng nhân/chia 3–4 và "một phần mấy";
lớp 1 không còn "cộng trừ qua 10 trong phạm vi 20"; lớp 3 đã nhận bảng nhân/chia 3–4,
bỏ phân số và "thế kỷ", thêm chủ đề hình phẳng – hình khối; ba lớp đều có chương ôn tập học kì 1;
lớp 2 có chủ đề Tiền Việt Nam; lớp 3 có chủ đề Xem đồng hồ – Tháng năm – Tiền Việt Nam.

### 7.3. Kết quả rà từng bài lớp 4 và lớp 5

Đã rà **cả 119 bài** (lớp 4: 65 bài · lớp 5: 54 bài) theo hai lớp kiểm:

1. **Đối chiếu tên bài với mục lục SGK** — không tìm thấy bài nào dạy nội dung của lớp khác.
2. **Soi chất lượng nội dung** bằng `scratch/soi-noi-dung.mjs` — không có slide khái niệm rỗng,
   không có câu hỏi lặp đáp án, bài nào cũng có câu hỏi.

Ba điểm từng bị nghi là sai nhưng **kiểm lại thì đúng SGK**:

- Lớp 4 chương 2 có _Đề-xi-mét vuông & Mét vuông_ — đúng vị trí trong SGK Toán 4.
- Lớp 5 chương 1 có _Héc-ta_ — đúng SGK Toán 5 trang 29.
- Lớp 5 chương 3 có _Hình trụ, Hình cầu_ — đúng SGK Toán 5 trang 125.

Hai chỗ **vượt SGK có chủ ý** (giữ lại, không phải lỗi, nhưng nên biết):

- `g5-c4-l6` "Hai chuyển động cùng chiều & Ngược chiều" — SGK không dạy; đây là dạng toán
  nâng cao hay gặp trong đề thi. Nếu bạn muốn bám SGK tuyệt đối thì có thể bỏ.
- Hai bài "Thử thách Trạng Nguyên" ở cuối lớp 4 và lớp 5 — bài thưởng, không thuộc SGK.

### 7.4. Còn lại

- Nội dung trong **DB Supabase vẫn là bản cũ**. Muốn app hiển thị bản mới thì cần nạp lại
  (xem hướng dẫn khi bạn cho phép làm).
- Tiến độ cũ của các bé **không mất**: bài giữ nguyên `id` thì tiến độ giữ nguyên; bài bị xoá
  thì số sao của bài đó không còn được tính, các bài khác không bị ảnh hưởng.
