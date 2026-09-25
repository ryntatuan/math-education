# Rà soát SGK — **Lớp 2 · 3 · 4 · 5** (đợt 2026-09-26)

**Trạng thái:** ✅ đã rà + sửa xong (chưa push; đã commit từng đợt).
**Quy mô sau đợt:** 5 lớp · 51 chương · 460 bài · **2738 slide** (L1 693 · L2 704 · L3 744 · L4 324 · L5 271).

## 1. Cách rà (dùng lại được, rẻ hơn mở ảnh từng trang)

| Công cụ | Việc nó làm |
| :------ | :---------- |
| `scratch/kiem-tra-slide.mjs` | luật cấu trúc dữ liệu (0 lỗi) |
| `scratch/soat-o-trong.mjs` | mọi ô “?” phải BẤM ĐƯỢC (0 ô trống tĩnh) |
| `scratch/soat-hinh-khong-hien.mjs` | hình khai trong dữ liệu phải CÓ CHỖ VẼ (0 ca) |
| `scratch/soat-phep-tinh.mjs` | số học: `operation` · `comparison` · mọi câu “a op b = c” trong chữ (0 sai) |
| `scratch/soat-phuong-an-quiz.mjs` | 824 câu: đáp án ∈ lựa chọn · không trùng · ≥3 lựa chọn (0 lỗi) |
| `scratch/soat-loi-hien-thi.mjs` | A câu nhắc hình mà thiếu hình · B chữ xuống dòng · C `tenFrame` bị kẹp · D slide `visual` rỗng |
| `scratch/ra-hinh-nghi-ngo.mjs` | 13 luật “lời ↔ hình” + luật cấu trúc (mũi tên, mốc, hàng bảng) |
| `scratch/soat-hinh-sai.mjs` | 8 họ lỗi hình (thước làm hình đoạn thẳng, chữ a/b/c trên khối…) |
| `scratch/so-sanh-muc-luc.mjs <lớp>` | so MỤC LỤC SGK ↔ bài trong app (tìm bài thiếu) |
| `scratch/dem-dang-bai-sgk.mjs` | đếm dạng bài SGK (“số thích hợp”, “đặt tính rồi tính”, “nối”…) ↔ số hình tương tác trong app |
| `scratch/do-can-doi-hinh.mjs` · `do-chu-hinh.mjs` · `do-chu-hinh-moi-loai.mjs` | đo cỡ chữ/vùng chạm/cân đối TRONG APP THẬT (390 px) |
| `scratch/chup-slide.mjs <bài> <slide>` | chụp đúng khổ điện thoại để NHÌN |

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
