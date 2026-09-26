# Rà soát SGK — **Lớp 2 · 3 · 4 · 5** (đợt 2026-09-26)

**Trạng thái:** ✅ đã rà + sửa xong (chưa push; đã commit từng đợt).
**Quy mô sau đợt:** 5 lớp · 51 chương · 460 bài · **2774 slide** (L1 697 · L2 713 · L3 763 · L4 329 · L5 272).

## 1. Cách rà (dùng lại được, rẻ hơn mở ảnh từng trang)

| Công cụ                                                                        | Việc nó làm                                                                                    |
| :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `scratch/kiem-tra-slide.mjs`                                                   | luật cấu trúc dữ liệu (0 lỗi)                                                                  |
| `scratch/soat-o-trong.mjs`                                                     | mọi ô “?” phải BẤM ĐƯỢC (0 ô trống tĩnh)                                                       |
| `scratch/soat-hinh-khong-hien.mjs`                                             | hình khai trong dữ liệu phải CÓ CHỖ VẼ (0 ca)                                                  |
| `scratch/soat-phep-tinh.mjs`                                                   | số học: `operation` · `comparison` · mọi câu “a op b = c” trong chữ (0 sai)                    |
| `scratch/soat-phuong-an-quiz.mjs`                                              | 824 câu: đáp án ∈ lựa chọn · không trùng · ≥3 lựa chọn (0 lỗi)                                 |
| `scratch/soat-loi-hien-thi.mjs`                                                | A câu nhắc hình mà thiếu hình · B chữ xuống dòng · C `tenFrame` bị kẹp · D slide `visual` rỗng |
| `scratch/ra-hinh-nghi-ngo.mjs`                                                 | 13 luật “lời ↔ hình” + luật cấu trúc (mũi tên, mốc, hàng bảng)                                 |
| `scratch/soat-hinh-sai.mjs`                                                    | 8 họ lỗi hình (thước làm hình đoạn thẳng, chữ a/b/c trên khối…)                                |
| `scratch/so-sanh-muc-luc.mjs <lớp>`                                            | so MỤC LỤC SGK ↔ bài trong app (tìm bài thiếu)                                                 |
| `scratch/dem-dang-bai-sgk.mjs`                                                 | đếm dạng bài SGK (“số thích hợp”, “đặt tính rồi tính”, “nối”…) ↔ số hình tương tác trong app   |
| `scratch/do-can-doi-hinh.mjs` · `do-chu-hinh.mjs` · `do-chu-hinh-moi-loai.mjs` | đo cỡ chữ/vùng chạm/cân đối TRONG APP THẬT (390 px)                                            |
| `scratch/chup-slide.mjs <bài> <slide>`                                         | chụp đúng khổ điện thoại để NHÌN                                                               |

## 2. Phát hiện & đã sửa

### 2.1 “Đặt tính rồi tính” in sẵn (nhóm nặng nhất)

SGK 1–5 dùng dạng này ở gần như mọi chương (Lớp 2: 23 lần · Lớp 3: 29 · Lớp 4: 35 · Lớp 5: 40).
App thì **in sẵn cả cột** ⇒ trẻ đọc luôn kết quả. Đã thay bằng khoá `cotTinh` (bé tự điền từng hàng,
chọn chữ số 0–9, chấm ngay, có hàng “nhớ”):

- **Lớp 2**: `g2-c1-l8` · `g2-c12-l1/l2/l3/l4/l5/l6/l9` · `g2-c14-l2/l3` (13 slide).
- **Lớp 3**: `g3-c1-l2` · `g3-c4-l1` (32 × 3) · `g3-c4-l2` (26 × 3, có nhớ).
- **Lớp 4**: `g4-c2-l1` (35 480 + 24 150 · 70 000 − 15 000) · `g4-c2-l7` (1 423 × 3) ·
  `g4-c2-l11` (245 × 12) · `g4-c6-l1` (483 526 + 254 138).
- **Lớp 5**: `g5-c2-l4` (38,5 + 24,15) · `l5` (50 − 23,75) · `l6` (1,2 × 0,4) ·
  `g5-c5-l2` (12,5 × 3,2 · 15,82 + 9,35).
- **Lớp 1**: `g1-c8-l1/l2/l3/l5/l6/l7` · `g1-c10-l4`.
- **Đặt tính CHIA (bổ sung sau, dùng luôn khoá `cotTinh` với `sign: ":"`)** — bố cục riêng:
  số bị chia ở trên, vạch dọc, số chia bên phải, dưới vạch ngang là các ô **thương**
  (bé điền **trái → phải**), kèm ô **số dư** có nhãn “dư” khi phép chia có dư:
  - **Lớp 3**: `g3-c4-l4` (12 : 3) · `l5` (13 : 3, dư 1) · `l6` (48 : 4) · `l9` (19 : 3, dư 1).
  - **Lớp 4**: `g4-c2-l12` (128 472 : 6) · `g4-c2-l13` (84 : 21).
  - ✅ Đáp án **không hề khai trong dữ liệu** — `tinhChia()` tính thương + số dư, nên không thể
    lệch giữa dữ liệu và đáp án. Cổng `kiem-tra-dat-tinh.mjs` canary 7 ca chia (44/44 tổng).
  - ⚠️ Còn lại: **chia số thập phân** (Lớp 5, ví dụ 27,72 : 3,6) chưa vẽ được kiểu đặt tính vì
    phải mô phỏng đúng thao tác “bỏ dấu phẩy → chia như số tự nhiên → đánh dấu phẩy”. Cổng
    `kiem-tra-slide` **chặn** nếu ai khai `cotTinh` chia bằng số thập phân ⇒ không thể lọt lỗi âm thầm.

### 2.2 Bảng điền “số thích hợp” (`bangTinh`)

Lớp 4 và Lớp 5 **không có bảng điền nào**. Đã thêm: Lớp 2 `g2-c1-l4` (số liền sau), Lớp 4
`g4-c1-l9` (đổi yến/tạ/tấn), Lớp 5 `g5-c2-l1` (đếm chữ số phần thập phân).

### 2.3 Hình khai mà không ai vẽ (nhóm lỗi F — xem `docs/sgk_audit_lop1.md`)

22 ca ở Lớp 2–4 (đồng hồ ở slide kể chuyện/câu hỏi) — nay **23 hình hiện ra** nhờ khối dùng chung
`CalcFigures`. Đồng thời bỏ 2 hình phép tính **thừa** ở `g4-c6-l1`, `g4-c6-l9` (slide đã có bảng).

### 2.4 Cỡ chữ trên điện thoại

- CSS mobile ép `.clock-svg` **135 px cho mọi cỡ** ⇒ số La Mã chỉ ~7 px. Nay 180 px + mặt số La Mã
  luôn cỡ lớn.
- `FillBar` luôn vẽ nút `58×50` ⇒ bàn phím 0–9 to hơn cả đề bài. Nay nút tự co (≥5 lựa chọn ⇒ 44×44)
  và tách **3 hàng** (tiêu đề · nút · tiến độ + “Làm lại”).
- `bangTinh` ô “?” chỉ **18 px** ⇒ nay 47 px; `patternRow` ô 25 px ⇒ 47–58 px (tự xuống hàng).

### 2.5 Sửa THƯỚC ĐO (quan trọng ngang với sửa dữ liệu)

- `soat-loi-hien-thi.mjs` giữ **danh sách khoá hình viết cứng** ⇒ nhóm D báo **124 ca “visual rỗng”
  trong khi slide CÓ hình**. Nay đọc từ mã (`HINH_KEYS` + khoá cũ) ⇒ **D = 0**.
- `dem-dang-bai-sgk.mjs` chỉ khớp khoá `cotTinh:` ⇒ **báo Lớp 5 “0 hình tương tác”** trong khi vừa
  thêm 5 slide. Nay khớp cả `["']?cotTinh["']?\s*:` (bẫy nháy đã gặp nhiều lần).
- `so-sanh-muc-luc.mjs` đòi MỌI từ khoá nằm trong CÙNG một bài ⇒ báo oan 18 ca (SGK gộp nhiều chủ
  đề vào một tên bài, app tách ra). Luật đúng: mỗi từ khoá chỉ cần xuất hiện ở ĐÂU ĐÓ trong app.
- Nhóm A của `soat-loi-hien-thi.mjs`: 14 ca còn lại đều là **hình nằm ở slide NGAY TRƯỚC** (đã kiểm
  từng ca: bể cá, nông trại, xúc xắc, A–G, thẻ chữ) ⇒ không phải lỗi; 2 slide kể chuyện nhắc cái
  thước nay đã có hình cái thước.
- Một ca của `ra-hinh-nghi-ngo.mjs`: quiz hỏi **màu** (nút chọn là chữ “Màu đỏ/vàng/xanh”) ⇒ đúng.

## 3. Kết quả kiểm chứng cuối (2026-09-26)

`kiem-tra-slide` **0 lỗi** (118 cảnh báo thông tin) · `soat-o-trong` **0** ô trống tĩnh ·
`soat-hinh-khong-hien` **0** · `soat-phep-tinh` **0 sai** · `kiem-tra-dat-tinh` **35/35** ·
`soat-phuong-an-quiz` **824 câu 0 lỗi** · `soat-loi-hien-thi` A=14 (báo oan) · B=222 (cố ý) ·
C=0 · D=0 · `soat-hinh-sai` G=0 H=0 · `do-can-doi-hinh` **0 ca cần sửa** ·
`do-chu-hinh-moi-loai` 21 loại hình: chữ ≥ 13 px · cổng tĩnh **32 PASS** · `build:web` exit 0 ·
seed sinh lại, dấu vân tay khớp.

## 4. Cần dán seed (nếu DB đang dùng bản cũ)

`03-bai-lop-2.sql` · `04-bai-lop-3.sql` · `05-bai-lop-4.sql` · `06-bai-lop-5.sql` · `02-bai-lop-1.sql`
rồi `100-tang-phien-ban-sau-bo-sung.sql` (bắt buộc — seed chỉ GHI bài, không tăng phiên bản).
Phần CỠ CHỮ/BỐ CỤC là **MÃ** ⇒ phải deploy web / build APK mới thấy.

---

## 5. Đợt 3 (cùng ngày): “SLIDE DỒN NHIỀU BÀI, KHÔNG DẠY CÁCH LÀM”

**Người dùng báo** (kèm ảnh slide `g3-c7-l1`): _“các slide như này quá chung chung, không hướng dẫn
cũng như chỉ cho bé thấy làm sao để ra kết quả; gộp nhiều phép tính vào 1 slide gây rối, tại sao
không tách ra và giải thích từng bước cho trẻ hiểu?”_

### 5.1 Đo trước khi sửa — 3 lần chỉnh phép đo (đều do BÁO OAN)

| Lần | Phép đo                                                                                                             | Số ca   | Vì sao sai                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | ≥2 phép tính đã ra kết quả trong slide                                                                              | **457** | gom cả `mascotHint` (lời gợi ý TỪNG BƯỚC của Cú Mèo) ⇒ mọi câu hỏi bị báo                                                   |
| 2   | bỏ `mascotHint`, gom “họ” phép tính                                                                                 | 105     | còn báo oan slide dạy bằng **mạch bằng nhau** (`9 + 4 = 9 + 1 + 3 = 10 + 3 = 13`) và mạch bước (`46 − 3 = 43; 43 − 6 = 37`) |
| 3   | bỏ mạch bằng nhau (lookahead), gom **mạch dính nhau** (chung một con số), chỉ báo bảng ≥2 dòng **hoặc** ≥3 mạch rời | **32**  | —                                                                                                                           |

🔴 **Bài học:** con số vô lý (457 ca = 17% kho bài) nghĩa là **thước hỏng**, không phải kho bài hỏng.
Và **slide đang dạy rất tốt lại bị báo oan** nếu phép đo không hiểu “một mạch giải” khác “nhiều bài rời”.

### 5.2 Cách sửa

- **19 slide nhóm [C]** (bảng “Phép tính | Kết quả” nhiều dòng, mỗi dòng một bài khác nhau — đúng
  ảnh người dùng gửi) ⇒ **tách thành 53 slide**, mỗi bài một slide: tiêu đề “Đặt tính rồi tính …”,
  **lời giải từng hàng** (nhớ · mượn · hạ · tích riêng) và **hình cho bé tự điền** (`cotTinh`).
  Slide không vẽ được cột (chia số thập phân) thì dùng `bangTinh` cho bé chọn kết quả.
- Lời giải **sinh tự động** từ `client/src/components/visuals/columnSteps.js` (logic thuần) ⇒
  không thể lệch với kết quả; cổng `scratch/kiem-tra-buoc-tinh.mjs` **33/33** (gồm canary hai vế:
  phải bắt được lời giải sai, không được báo oan lời giải đúng).
- Đúng cách dạy của SGK: nhân/chia với 10, 100, 1 000 dạy **mẹo thêm/bớt chữ số 0**, không dùng
  tích riêng (bản đầu tôi làm sai — chính cổng kiểm bắt được).
- **Sửa renderer:** `text` nhiều dòng của slide “Quan sát” trước đây bị vẽ **cả khối vào `<h2>`**
  ⇒ lời giải dồn thành một dòng tiêu đề to. Nay **dòng đầu = tiêu đề**, phần còn lại là đoạn
  `.slide-visual-steps` (chữ thường, căn trái, nền nhạt) — xem `LessonPage.jsx` + `LessonPage.css`.
- **13 ca nhóm [D] đã soi tay và CỐ Ý GIỮ:** chúng là ví dụ mẫu có kèm lời giảng
  (“6 + 7 = 13 viết 3 nhớ 1; …”) hoặc bảng tổng hợp dạng bài của tiết ôn tập — đúng cách dạy,
  không phải dồn bài.

### 5.3 Công cụ dùng lại được

`scratch/soat-slide-don-phep-tinh.mjs` (soát, ghi `out-soat-don-phep-tinh.txt`) ·
`scratch/tach-slide-don.mjs` (tách slide; chạy thử trước, `--ghi` mới ghi; **cắt đúng object slide
bằng bộ quét ngoặc** chứ không khớp chuỗi) · `scratch/sua-loi-giai-tach.mjs` (sinh lại lời giải khi
bộ sinh đổi) · `scratch/kiem-tra-buoc-tinh.mjs` (cổng lời giải) · `scratch/in-slide.mjs` (in nội
dung một slide để soi).

### 5.4 Kiểm chứng sau khi sửa

`soat-slide-don-phep-tinh`: **[C] = 0** toàn 5 lớp · `kiem-tra-slide` 0 lỗi ·
`soat-o-trong` 0 ô trống · `soat-phep-tinh` **0 sai** (1 630 câu, gồm mọi lời giải vừa sinh) ·
`soat-hinh-khong-hien` 0 · `kiem-tra-dat-tinh` 44/44 · `kiem-tra-buoc-tinh` 33/33 ·
`soat-loi-hien-thi` C=0 · D=0 · `do-can-doi-hinh` 0 ca cần sửa · cổng tĩnh **32 PASS** ·
`build:web` exit 0 · thử THẬT trên app: `g3-c7-l1` (bài trong ảnh) nay có 9 slide, 4 slide đặt tính
điền được — bấm 8 · 7 · 1 ⇒ `3/3` + “🎉 Bé làm đúng hết!”.
**Quy mô: 2 774 slide** (L1 697 · L2 713 · L3 763 · L4 329 · L5 272) — số bài 460 không đổi.

⚠️ **Lần này cần dán:** `02-bai-lop-1.sql` · `03-bai-lop-2.sql` · `04-bai-lop-3.sql` ·
`05-bai-lop-4.sql` rồi `100-tang-phien-ban-sau-bo-sung.sql`.

---

## 6. Thứ tự ô điền (người dùng báo tiếp cùng ngày)

**Người dùng báo:** _“phép cộng là từ phải qua trái, tại sao đáp án lại điền từ trái qua phải?
Rà soát tất cả lại cho đúng thứ tự: cộng, trừ, nhân thì từ phải qua trái; chia thì từ trái qua phải.”_

### 6.1 Lỗi thật (nặng hơn “hiển thị”)

Trong `interactiveColumn.jsx`, ô trống của hàng kết quả được **đếm theo THỨ TỰ VẼ** (trái → phải),
còn mảng đáp án `dapAn` lại xếp **PHẢI → TRÁI**. Hệ quả:

- ô sáng đầu tiên là ô **hàng cao nhất** (đúng ra phải là hàng đơn vị);
- 🔴 **bé điền đúng số nhưng vào SAI HÀNG vẫn được báo ĐÚNG** — sai về mặt dạy học, không chỉ xấu.

Ngoài ra ô “nhớ” bị đẩy xuống **điền sau cùng**, trong khi lời giải nói “viết 8 nhớ 1” ngay ở hàng
đơn vị ⇒ bé phải ghi nhớ ở đầu, điền ở cuối.

### 6.2 Cách sửa

- Thứ tự ô điền nay là **hàm thuần** `thuTuOTrong(left, right, sign, remember)` trong `columnMath.js`
  — một nguồn sự thật cho cả giao diện lẫn cổng kiểm:
  - **cộng · trừ · nhân**: PHẢI → TRÁI, và ô “nhớ” đi **ngay sau** hàng sinh ra nó;
  - **chia**: TRÁI → PHẢI (chữ số thương), ô **số dư** ở cuối.
- `dapAn` lấy thẳng từ hàm đó ⇒ không còn hai cách đánh số lệch nhau.
- Cổng mới `scratch/kiem-tra-thu-tu-o-dien.mjs` — **18/18** ca, có **canary hai vế**: đảo ngược
  phép cộng, đẩy ô nhớ xuống cuối, đảo ngược phép chia, đặt số dư trước thương ⇒ **cả 4 đều bị bắt**;
  thứ tự đúng thì không báo oan. (Cổng tĩnh cũ KHÔNG bắt được lớp lỗi này.)

### 6.3 Rà cả các hình khác có nhiều ô điền

| Hình                          | Thứ tự điền                         | Kết luận                                          |
| ----------------------------- | ----------------------------------- | ------------------------------------------------- |
| `cotTinh` (cộng · trừ · nhân) | phải → trái, nhớ xen đúng lúc       | ✅ đã sửa                                         |
| `cotTinh` (chia)              | trái → phải, số dư sau cùng         | ✅ đã đúng, có kiểm                               |
| `bangTinh` (bảng điền)        | theo hàng: trái → phải, trên → dưới | ✅ đúng (bảng đọc theo hàng, không phải cột tính) |
| `patternRow` (dãy hình)       | trái → phải                         | ✅ đúng (quy luật dãy đọc từ trái)                |

### 6.4 Kiểm chứng (thử THẬT trên app, không chỉ đọc mã)

| Bài                     | Mong đợi                            | Đo được                                                                          |
| ----------------------- | ----------------------------------- | -------------------------------------------------------------------------------- |
| `g2-c12-l9` · 256 + 173 | ô sáng đầu = hàng **đơn vị** (phải) | ô xa nhất bên phải ✓; điền 9 → 2 → 1 (nhớ) → 4 ⇒ **4/4** + “🎉 Bé làm đúng hết!” |
| `g3-c7-l1` · 26 × 3     | 8 → nhớ 1 → 7                       | đúng ⇒ **3/3** ✓                                                                 |
| `g3-c7-l1` · 639 : 3    | ô sáng đầu = thương **bên trái**    | ô xa nhất bên trái ✓; điền 2 → 1 → 3 ⇒ **3/3** ✓                                 |
| `g3-c4-l5` · 13 : 3     | 4 rồi dư 1                          | **2/2** ✓                                                                        |
| `g1-c8-l12` · 25 + 4    | 9 rồi 2                             | **2/2** ✓                                                                        |
| `g2-c12-l9` · 534 − 268 | bấm ô **trăm** rồi điền 6           | ô hiện **đỏ** ✓ (trước đây bị coi là đúng)                                       |

`kiem-tra-slide` 0 lỗi · `soat-o-trong` 0 · `kiem-tra-dat-tinh` 44/44 · cổng tĩnh **32 PASS** ·
`build:web` exit 0. **Chỉ là MÃ** ⇒ deploy web / build APK lại là thấy (không cần dán lại seed).
