# Rà soát SGK — **Lớp 1 · Chủ đề 1: Các số từ 0 đến 10** (SGK tr.6–45)

**Ngày rà:** 2026-09-24 · **Người rà:** AI (theo quy trình §11 của `sgk_curriculum_standardization_plan.md`)
**Nguồn ảnh:** `docs/Data Source/Grade 1/Math grade 1 part 1.pdf`, trích 220 DPI vào `scratch/l1-t6.png` … `l1-t45.png` (40 trang), xem theo bộ 4 trang/ảnh `scratch/l1-sheet-*.png`.
**Trạng thái:** ✅ **ĐÃ SỬA XONG 2026-09-24** (chưa commit / chưa push / chưa dán seed) — kết quả ở §8b của `docs/sgk_curriculum_standardization_plan.md`.

> **Quyết định của người dùng (2026-09-24) — ghi lại để không hỏi lại:**
>
> 1. **Có** dạy chữ đọc số (một, hai, ba…).
> 2. **Không** làm “Tập viết số” (A3 → bỏ).
> 3. **Bỏ qua** 2 trò chơi bàn cờ có xúc xắc (A13 → bỏ).
> 4. **Chuyển đổi cho khớp SGK** (C2, C3, C4 → đã đổi).
> 5. Tranh cảnh: **AI tự chọn số lượng** và ghi rõ vào bảng nguồn §7 (đã ghi).

> ⚠️ Quy ước số trang: **số trang SÁCH** (đúng như số in ở chân trang). `d[p]` của PyMuPDF cho đúng trang sách `p`.

---

## PHẦN F — “ĐẶT TÍNH RỒI TÍNH” NAY ĐIỀN ĐƯỢC (2026-09-25)

**Phát hiện:** “Đặt tính rồi tính” là dạng bài **phổ biến nhất** của SGK Toán 1–5 (Lớp 1 tr.46–71
và tr.88–105 gần như trang nào cũng có), mà app chỉ có **CÂU CHỮ** (“Đặt tính rồi tính: 32 + 14 = ?”)
+ một cột chữ in sẵn trong `text` kèm `operation` ⇒ **trẻ đọc luôn kết quả**, không phải đặt tính.
Đây cũng là chỗ vi phạm luật “mọi dạng bài tập đều phải bấm được” mà người dùng đã nêu.

**Đã làm:** khoá hình mới `cotTinh` (`client/src/components/visuals/interactiveColumn.jsx` +
hàm thuần `columnMath.js`):

- Vẽ đúng cột đặt tính: chữ số thẳng hàng, dấu +/− bên trái, gạch ngang, hàng “nhớ” khi cần.
- Bé bấm ô “?” rồi chọn chữ số **0–9**; chấm ngay, có tiến độ, “Làm lại”, pháo giấy khi xong.
- **Đáp án không khai trong dữ liệu** mà do hàm thuần tính từ `left`/`right`/`sign`
  (hỗ trợ cả số thập phân: `15,82 + 9,35 = 25,17`) ⇒ **không thể có chuyện dữ liệu lệch đáp án**.
- Không bấm được (slide câu hỏi/tóm tắt) thì **in luôn kết quả** — tuyệt đối không để ô “?” chết.

**Đã dùng:** `g1-c8-l1` (tách thành bảng hàng + đặt tính 25 + 4) · `g1-c8-l2` (34 + 5).
Bỏ luôn “cột in sẵn” trong `text` của hai slide này — nó chính là đáp án in sẵn.

**Kiểm chứng:** cổng mới `scratch/kiem-tra-dat-tinh.mjs` **29/29 ca** (cộng có nhớ · trừ có mượn ·
thập phân · số 0 · nhớ nhiều cấp · canary hai vế — và nó đã **bắt được một mong đợi SAI của tôi**:
`105 + 8` nhớ đúng là `[1,0,0]`) · `kiem-tra-slide` 0 lỗi · `soat-o-trong` 0 ô trống tĩnh ·
cổng tĩnh **32 PASS** · `build:web` exit 0 · đo trong app: chữ số cao **31–34 px**, 0 tràn ngang ·
thử thật trong app: sai → ô xám, đúng → hiện số, **2/2 + “🎉 Bé làm đúng hết!” + pháo giấy**.

**Kết quả đo (2026-09-26) — và BA LỖI LIÊN QUAN đã tìm ra rồi sửa:**

Người dùng gửi ảnh slide đặt tính: *“danh sách số để chọn đang quá lớn, trong khi đề bài quá nhỏ,
nhìn quá xấu và không cân đối… hãy đoán các lỗi liên quan có thể xảy ra để fix toàn bộ”*.
Công cụ mới **`scratch/do-can-doi-hinh.mjs`** đo trong app thật ở 390 px: cỡ chữ trong hình ·
chiều cao khối nút so với chiều cao hình · **mọi vùng chạm có đạt 44 px**.

| Chỗ | Lỗi đo được | Đã sửa |
| :---- | :---------- | :----- |
| `FillBar` (dùng chung) | luôn vẽ nút `58×50` ⇒ bàn phím **0–9** to hơn cả đề bài | nút tự co theo số lựa chọn (≥5 ⇒ 44×44, vẫn đủ vùng chạm) |
| `FillBar` bố cục | tiêu đề + nút + tiến độ + “Làm lại” chung một hàng ⇒ nút “10” rơi xuống hàng dưới, “0/4” chen cạnh nút cuối | tách **3 hàng**: tiêu đề · nút · tiến độ + “Làm lại” |
| `cotTinh` (mới) | khung 340 ⇒ hình bị thu nhỏ, ô “?” 64 px nhưng đề bài bé | khung = đúng bề rộng khối số ⇒ **chữ đề bài 76 px**, ô “?” 64 px |
| `bangTinh` | **ô “?” chỉ bấm được 18 px** (hàng cao 28 đơn vị), chữ bảng 18 px | hàng cao 56 ⇒ ô “?” **47 px**, chữ 30 px, khung 300 |
| `patternRow` | ô chỉ **~25 px** | ô 44 đơn vị, tối đa 5 ô/hàng rồi **tự xuống hàng** ⇒ 47–58 px |

> ⚠️ **Thước đầu tiên của tôi SAI:** tôi so “cỡ nút ÷ cỡ chữ trong hình” và lấy ngưỡng 1,6 ⇒ báo oan
> hàng loạt, vì nút 44–50 px là **sàn vùng chạm** chứ không phải “quá to”. Cái người dùng nhìn thấy là
> **khối nút chiếm nửa màn hình trong khi đề bài bé tí** ⇒ luật đúng là so **chiều cao khối nút với chiều
> cao hình**. (Lần thứ N trong dự án: số đo vô lý thì nghi cây thước trước.)

Sau khi sửa: **9 slide tương tác → 0 ca cần sửa** · 47 slide đủ 21 loại hình → chữ nhỏ nhất ≥ 13 px ·
36 slide đồng hồ → ≥ 12 px · 0 tràn ngang.

**Còn lại:** các chương khác của 5 lớp vẫn còn cột đặt tính tĩnh — chuyển dần theo từng chương.

---

## PHẦN E — ĐO “CHỮ TRONG HÌNH CÓ ĐỌC ĐƯỢC KHÔNG” (2026-09-25, người dùng báo)

Người dùng gửi ảnh bài `g3-c8-l5` (Lớp 3, chữ số La Mã) và nói: _“các số la mã trong đồng hồ quá
nhỏ, trẻ không thể thấy được”_. **Đúng, và nguyên nhân không nằm ở dữ liệu:**

| Bước                                | Phát hiện                                                                                                                                                                  |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đọc mã + CSS                        | `@media (max-width: 640px)` ép `.clock-svg { width: 135px !important }` cho **MỌI cỡ** ⇒ mặt đồng hồ 220 đơn vị co còn **0,61** ⇒ chữ 11 đơn vị chỉ còn **~7 px**          |
| Bộ vẽ                               | `ClockGraphic` có `sm=120 · md=165 · lg=220`, nhưng CSS đè hết thành 135 ⇒ dữ liệu có xin cỡ nào cũng vô ích                                                               |
| Họ lỗi tương tự                     | `.dialogue-focus-graphic .clock-svg` ép **125px** (slide hội thoại) ⇒ chữ ~5,5 px                                                                                          |
| Vì sao các bảng đo trước KHÔNG thấy | `scratch/visual-fit.jsx` đo hình theo `HINH_KEYS` — mà `clock`/`number`/`operation` **không** nằm trong đó, và trang đo cũng không chạy trong app nên không gặp CSS mobile |

**Đã sửa:** cỡ đồng hồ trên điện thoại thành `min(180px, 52vw)` (và 170px cho slide hội thoại);
số La Mã dùng `lg` bất kể slide nào + cỡ chữ 17 (bé 14); mặt đồng hồ trên slide **bài học** từ `sm` → `md`.

**Hai công cụ đo mới (chạy trên APP THẬT, khổ 390×844):**
`scratch/do-chu-hinh.mjs` (mọi slide có đồng hồ) · `scratch/do-chu-hinh-moi-loai.mjs` (mọi loại hình) ·
`scratch/chup-slide.mjs <bài> <slide>` để chụp một slide ở đúng khổ điện thoại mà nhìn.

Kết quả sau khi sửa: **36 slide có đồng hồ → chữ nhỏ nhất ≥ 12 px, 0 tràn ngang**;
**47 slide đủ loại hình (21 loại) → chữ nhỏ nhất ≥ 13 px, 0 tràn ngang**.

> 🔴 **Bài học đo lường (lặp lại lần thứ N trong dự án):** nhìn ảnh nhỏ rồi đoán là sai hai lần
> trong cùng một việc — (1) ảnh chụp làm tôi tưởng kim đồng hồ chỉ 4 giờ, đo toạ độ mới ra **237° =
> 7,9 giờ** (đúng 8 giờ); (2) “số đo vô lý thì nghi cây thước trước”. Ảnh chỉ dùng để **phát hiện**,
> còn **kết luận thì phải đo**.

---

## PHẦN A — Bảng ánh xạ trang → bài

> 📌 **Bảng này là bản gốc lúc rà (trước khi sửa), nên có vài dòng đã cũ** (ví dụ `l2` khi đó tên là
> “Các số 1, 2, 3” và `l5` là “Số 0”). Bảng ánh xạ **đầy đủ và mới** cho cả 10 chương nằm ở
> **`docs/sgk_map_lop1.md`** (dựng 2026-09-25, kèm số trang PDF để mở đúng ảnh).

SGK Chủ đề 1 có **7 bài**; app đang chia thành **12 bài** (`g1-c1-l1` … `l12`). Ánh xạ:

| Bài trong app | Tên bài app              | SGK tương ứng                                                                                 | Trang SGK |
| :------------ | :----------------------- | :-------------------------------------------------------------------------------------------- | :-------- |
| `g1-c1-l1`    | Tiết học đầu tiên        | **Tiết học đầu tiên**                                                                         | 6–7       |
| `g1-c1-l2`    | Các số 1, 2, 3           | **Bài 1** (Các số 0,1,2,3,4,5)                                                                | 8–10      |
| `g1-c1-l3`    | Các số 4, 5              | **Bài 1** (tiếp)                                                                              | 10–13     |
| `g1-c1-l4`    | Các số 6, 7, 8, 9, 10    | **Bài 2** (Các số 6,7,8,9,10)                                                                 | 14–19     |
| `g1-c1-l5`    | Số 0                     | **Bài 1** (số 0 nằm ở tr.8–9, KHÔNG phải bài riêng)                                           | 8–9       |
| `g1-c1-l6`    | Nhiều hơn, ít hơn        | **Bài 3** (Nhiều hơn, ít hơn, bằng nhau)                                                      | 20–23     |
| `g1-c1-l7`    | Bằng nhau                | **Bài 3** (tiếp)                                                                              | 20–23     |
| `g1-c1-l8`    | So sánh số — dấu >, <, = | **Bài 4** (So sánh số)                                                                        | 24–31     |
| `g1-c1-l9`    | Mấy và mấy (≤ 5)         | **Bài 5** (Mấy và mấy)                                                                        | 32–35     |
| `g1-c1-l10`   | Mấy và mấy (≤ 10)        | **Bài 5** (tiếp)                                                                              | 35–37     |
| `g1-c1-l11`   | Luyện tập chung          | **Bài 6** (Luyện tập chung)                                                                   | 38–45     |
| `g1-c1-l12`   | Đếm xuôi, đếm ngược      | _Không phải bài riêng của SGK_ — SGK chỉ có dạng bài này ở **tr.10 bài 2** và **tr.16 bài 2** | 10, 16    |

**Cấu trúc SGK trong mỗi bài** (3 trụ cột + 2 phần đặc biệt):

| Phần        | Biểu tượng | Trang xuất hiện                                         |
| :---------- | :--------- | :------------------------------------------------------ |
| `Khám phá`  | kính lúp   | 8, 14, 20, 24, 26, 28, 32, 34                           |
| `Hoạt động` | Rô-bốt     | 9, 15, 20, 24, 26, 28, 32, 34                           |
| `Luyện tập` | sách       | 10–13, 16–18, 22–23, 25, 27, 29–31, 36–37, 40–42, 44–45 |
| `Trò chơi`  | xúc xắc    | **19** ("Nhặt trứng"), **43** ("Cầu thang – Cầu trượt") |

---

## PHẦN B — Bảng phát hiện (theo 5 nhóm A–E)

`P1` = làm trước (ảnh hưởng nhiều bài) · `P2` = nên làm · `P3` = cân nhắc.

### A. Thiếu hoạt động của SGK

| #   | Bài app             | Trang SGK              | Phát hiện                                                                                                                                                                                                                                                                                                                                                                   | Mức                                                                                                                                                                                                        |
| :-- | :------------------ | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| A1  | l2, l3, l4, l5      | 8, 14                  | **Thiếu bảng "Khám phá" đúng như sách**: tr.8 = bể cá + 0/1/2/3/4/5 khối lập phương màu (và **0 = bể rỗng**); tr.14 = 6 con ong 🐝 · 7 con chim 🐦 · 8 bông hoa 🌸 · 9 con sao biển ⭐ · 10 con bọ rùa 🐞. App dùng `tenFrame`/emoji chung chung, **không giống sách**.                                                                                                     | **P1**                                                                                                                                                                                                     |
| A2  | l2, l3, l4          | 8, 14                  | **Thiếu CHỮ ĐỌC SỐ**: sách dạy "1 một · 2 hai · 3 ba · 4 bốn · 5 năm · 6 sáu · 7 bảy · 8 tám · 9 chín · 10 mười". App **không có chỗ nào dạy đọc số bằng chữ**.                                                                                                                                                                                                             | **P1**                                                                                                                                                                                                     |
| A3  | l2, l3, l4          | 9, 15                  | **Thiếu "Tập viết số"**: sách có ô li + nét mẫu để bé tập viết 0–5 (tr.9) và 6–10 (tr.15). App không có hình ô li / nét viết.                                                                                                                                                                                                                                               | **P1**                                                                                                                                                                                                     |
| A4  | l5, l6, l7, l8, l11 | 20, 21, 22, 23, 29     | **Thiếu dạng "Câu nào đúng?"** — sách cho **2 nhóm đồ vật trong tranh** rồi bé tự đếm và chọn câu đúng, ví dụ tr.20 "Số ếch nhiều hơn số lá" (3 ếch – 2 lá), tr.21 "Số ổ cắm nhiều hơn số đồ vật" (5 ổ – 4 vật), tr.22 tằm vs lá, tr.23 vịt dưới nước vs vịt trên bờ vs mèo. App chỉ hỏi bằng lời ("Nhóm A có 5 kẹo, nhóm B có 3 kẹo") — **không có hình hai nhóm nào cả**. | **P1**                                                                                                                                                                                                     |
| A5  | l8                  | 25, 27, 42             | **Thiếu "So sánh (theo mẫu)" trên tranh**: tr.27 (thẻ rau củ 4 < 5 làm mẫu; rồi bọ rùa vs cá, bánh kẹo, lá cây) và tr.42 (mèo vs cá, 4 hàng). App chỉ so sánh **số trần**.                                                                                                                                                                                                  | **P1**                                                                                                                                                                                                     |
| A6  | l8, l9, l10         | 12, 15, 18, 23         | **Thiếu dạng "Cho thêm … để …"** (chọn A hay B): tr.12 "cho thêm thùng lên xe để trên xe có 3 thùng", tr.15 "cho thêm bánh để đĩa có 6 cái / 9 cái", tr.18 "cho thêm trứng để khay có 8 quả", tr.23 "cho thêm cà rốt để bằng / nhiều hơn bắp cải". App **không có dạng nào** như vậy.                                                                                       | **P1**                                                                                                                                                                                                     |
| A7  | l2, l3, l4, l11     | 11, 17                 | **Thiếu "đếm theo điều kiện"**: tr.11 bài 3 "Có bao nhiêu **củ cà rốt đã tô màu**?" (6 hàng × 5 củ); tr.11 bài 4 "Có bao nhiêu **con gà ghi số 2**?"; tr.17 bài 3 "Có bao nhiêu **con vật có 6 chân**?" (bọ rùa, bọ xanh, nhện 8 chân, 2 bọ nâu ⇒ 4 con). Đây là dạng **rất tốt** mà app thiếu hoàn toàn.                                                                   | **P1**                                                                                                                                                                                                     |
| A8  | l4, l11, l12        | 13, 17, 39, 40         | **Thiếu "đếm trong tranh lớn"**: tr.13 bài 4 (nông trại: đếm bò, gà, mây, hướng dương, ông mặt trời), tr.17 bài 4 (thỏ, cây, vịt, mây, chim), tr.39 bài 4 (sông: thuyền, dừa), tr.40 bài 2 (ruộng: trâu, nhà, cây, mặt trời).                                                                                                                                               | **P2**                                                                                                                                                                                                     |
| A9  | l12, l4             | 10, 16, 40             | **Thiếu dạng dãy số điền ô trống**: tr.10 bài 2 "5 ? 3 ? 1 0"; tr.16 bài 2 hai dãy 0→10 và 10→0 với ô trống; tr.40 bài 1 sáu **toa tàu** (a. 2,3,4,? · b. 3,?,5 · c. 4,?,6 · d. 7,?,9 · e. 8,?,10 · g. 0,?,2). App chỉ có 1 câu "số liền trước 7".                                                                                                                          | **P2**                                                                                                                                                                                                     |
| A10 | l7, l9, l10         | 28, 33, 35, 37, 39, 45 | **Thiếu sơ đồ TÁCH – GỘP của sách**: tr.28 bài 2 (nối hai nhóm bằng nhau: 1=1, 5=5, 4=4, 3=3), tr.33 (hai thẻ chấm gắn với Rô-bốt → ô kết quả, 6 hình), tr.35 (**vòng tròn 6 tách thành hai nhánh ?/?**, mẫu 3–3), tr.37 (máy kẹo: mỗi máy ghi "2                                                                                                                           | 1"), tr.39 bài 3 (**tìm chậu hoa thích hợp**: 1 bông + 4 bông → chậu 5), tr.45 (bảng 6 = 1+?, 2+?, 3+? và 9 = 1+?, 2+?, 3+?). App chỉ có `tenFrame` với `extra` — **không có sơ đồ nhánh / bảng tách số**. | **P1** |
| A11 | l8                  | 25                     | **Thiếu "tìm đường"**: tr.25 bài 4 — mê cung số, đường Mai về nhà đi qua **các ô có số lớn hơn 4**.                                                                                                                                                                                                                                                                         | **P2**                                                                                                                                                                                                     |
| A12 | l11                 | 38                     | **Thiếu "hình ẩn chứa các số"**: tr.38 bài 1 — trong hình vẽ nét có **những số nào** (0–9 ẩn trong tranh).                                                                                                                                                                                                                                                                  | **P3**                                                                                                                                                                                                     |
| A13 | l4, l11             | **19, 43**             | **Thiếu 2 TRÒ CHƠI của sách**: tr.19 "Nhặt trứng" (gieo xúc xắc, lấy trứng ở ô được bao quanh bởi số chấm, lấy đủ 6 quả) và tr.43 "Cầu thang – Cầu trượt" (bàn cờ + xúc xắc).                                                                                                                                                                                               | **P3**                                                                                                                                                                                                     |
| A14 | l8                  | 30, 31                 | **Thiếu so sánh bằng THẺ CHẤM**: tr.30 bài 1 so sánh 5 = 5 · 3 ? 5 · 1 ? 0 · 4 ? 2 bằng **thẻ chấm hình con vật**; tr.31 bài 4 (ớt/táo: 7 > 3).                                                                                                                                                                                                                             | **P2**                                                                                                                                                                                                     |
| A15 | l11                 | 44                     | **Thiếu so sánh hai hàng đồ chơi** (tr.44 bài 1: hàng A nhiều đồ chơi hơn hàng B?) và **câu nào đúng ở sân bay** (tr.44 bài 2: ô tô vs máy bay).                                                                                                                                                                                                                            | **P2**                                                                                                                                                                                                     |
| A16 | l11                 | 41, 44                 | **Thiếu "Cốc nào nhiều/ít hạt sen nhất"** (tr.41 bài 4 — so sánh 4 cốc không cần đếm chính xác, dạy ước lượng) và **sơ đồ số dạng cây/hình nhà** (tr.41 bài 3).                                                                                                                                                                                                             | **P2**                                                                                                                                                                                                     |

### B. Hình thiếu / hình sai

| #   | Bài app       | Phát hiện                                                                                                                                                                                                                                                       | Mức    |
| :-- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| B1  | **cả chương** | Cả 12 bài **không có một hình vẽ nào giống SGK**. Chỉ dùng 5 thành phần chung: `numberLine`, `tenFrame`, `items` (emoji), `comparison`, `table`. SGK Chủ đề 1 dùng: tranh con vật để đếm, ô li tập viết, thẻ chấm, sơ đồ tách số, tranh cảnh lớn, bàn trò chơi. | **P1** |
| B2  | l1            | Hình `numberLine` 0→10 minh hoạ cho chữ "Khám phá → Thực hành → Củng cố" — **hình không liên quan nội dung**. SGK tr.6–7 là tranh giới thiệu 5 nhân vật (Nam, Mai, Rô-bốt, Việt, Mi) + cảnh lớp học.                                                            | **P2** |
| B3  | l6, l7        | Chỉ có `comparison` (4 > 3) và emoji trên dòng chữ — **không có hình hai nhóm ghép đôi**, trong khi cách dạy của SGK (tr.20) chính là **ghép đôi để thấy bên thừa ra**.                                                                                         | **P1** |

### C. Số liệu sai

| #   | Bài app    | Phát hiện                                                                                                                                                                                                         | Mức    |
| :-- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| C1  | (không có) | Không phát hiện số liệu sai trong 12 bài.                                                                                                                                                                         | —      |
| C2  | l3         | Nội dung dạy **"5 > 4"** (bài 3) trong khi dấu so sánh mãi **bài 8** mới học ⇒ **dạy trước kiến thức**. SGK chỉ dùng "nhiều hơn/ít hơn/bằng nhau" bằng lời ở giai đoạn này (tr.20–23) rồi mới dạy dấu (tr.24–31). | **P1** |
| C3  | l5         | **Thứ tự ngược SGK**: sách dạy **0 ngay trong nhóm 1,2,3,4,5** (tr.8: hàng cuối là bể rỗng + số 0); app để "Số 0" thành **bài 5**, sau khi đã học 6–10.                                                           | **P2** |
| C4  | l12        | "Đếm xuôi, đếm ngược" **không phải bài riêng của SGK Chủ đề 1** (chỉ là bài tập ở tr.10 và tr.16). Nên ghi rõ là **hoạt động bổ sung** trong `description`, tránh ghi như thể là bài SGK.                         | **P3** |

### D. Câu hỏi thiếu hình

| #   | Bài app                      | Phát hiện                                                                                                                              | Mức    |
| :-- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| D1  | l6                           | Câu hỏi "Nhóm A có 5 cái kẹo, nhóm B có 3 cái kẹo. Nhóm nào nhiều hơn?" — **không có hình hai nhóm kẹo**, dù đây là bài học trực quan. | **P1** |
| D2  | l7                           | Câu "Nhóm A có 4 hình tròn, nhóm B có 4 hình tròn" — **không vẽ hình tròn nào**.                                                       | **P1** |
| D3  | l3                           | Câu "Một ngôi sao có mấy cánh?" — không có hình ngôi sao.                                                                              | **P2** |
| D4  | l2, l4, l5, l8, l9, l10, l11 | Một số câu hỏi thuần số (hợp lý, không cần hình) — **không tính là lỗi**.                                                              | —      |

### E. Chữ gọi tên mà hình không ghi

| #   | Bài app | Phát hiện                                                         |
| :-- | :------ | :---------------------------------------------------------------- |
| E1  | —       | Chủ đề 1 **không dùng tên điểm/đỉnh/cạnh** ⇒ không có lỗi nhóm E. |

### F. Điểm mạnh giữ nguyên (để không phá khi sửa)

- `mascotHint` có ở **mọi** câu hỏi ✓; giọng văn thân thiện, đúng lứa tuổi ✓.
- l12 dùng hình ảnh tên lửa đếm ngược rất hợp với bé ✓ (giữ lại, chỉ ghi rõ là hoạt động bổ sung).
- Không có câu hỏi nào mâu thuẫn đáp án (đã kiểm bằng công cụ).

---

## PHẦN C — Đề xuất cách sửa (bản gốc lúc rà; **bạn đã chốt 2026-09-24 — xem PHẦN D**)

### Bộ hình cần dựng mới cho Chủ đề 1 (khoảng 12 kiểu)

| #   | Tên (đề xuất)                                                                                                       | Dùng cho     | Thay thế/ bổ sung cho |
| :-- | :------------------------------------------------------------------------------------------------------------------ | :----------- | :-------------------- |
| 1   | `numberObjects` — bảng Khám phá: **bể cá + khối lập phương 0→5** (tr.8)                                             | l2, l3, l5   | A1                    |
| 2   | `numberObjects` — **ong/chim/hoa/sao biển/bọ rùa 6→10** (tr.14)                                                     | l4           | A1                    |
| 3   | `traceDigit` — **ô li + nét mẫu** để bé đọc/nhìn cách viết số (tr.9, 15)                                            | l2–l5        | A3                    |
| 4   | `dotCard` — **thẻ chấm/domino** (tr.30, 31)                                                                         | l8           | A14                   |
| 5   | `twoGroupCompare` — **hai nhóm đồ vật** để bé tự đếm rồi chọn câu đúng (tr.20–23)                                   | l6, l7       | A4, B3, D1, D2        |
| 6   | `addToReach` — **cho thêm A/B để đạt số lượng cho trước** (tr.12, 15, 18, 23)                                       | l8, l9, l10  | A6                    |
| 7   | `countFiltered` — **đếm theo điều kiện**: cà rốt đã tô màu (tr.11), con vật 6 chân (tr.17), con gà ghi số 2 (tr.11) | l3, l4       | A7                    |
| 8   | `sceneCount` — **tranh cảnh lớn** để đếm nhiều loại (nông trại tr.13, ao tr.17, sông tr.39, ruộng tr.40)            | l4, l11      | A8                    |
| 9   | `numberTrain` — **toa tàu / dải số điền ô trống** (tr.10, 16, 40)                                                   | l12          | A9                    |
| 10  | `numberBond` — **sơ đồ tách số** (vòng tròn 6 → hai nhánh) + bảng tách số (tr.33, 35, 37, 45)                       | l9, l10, l11 | A10                   |
| 11  | `matchEqual` — **nối hai nhóm bằng nhau / tìm chậu hoa thích hợp** (tr.28, 39)                                      | l7, l11      | A10                   |
| 12  | `numberMaze` — **tìm đường qua ô có số > 4** (tr.25) + `hiddenNumbers` (tr.38)                                      | l8, l11      | A11, A12              |
| 13  | `compareSample` — **hai nhóm tranh để viết dấu theo mẫu** (tr.27, 42)                                               | l8           | A5                    |
| 14  | (tuỳ chọn) 2 **bàn trò chơi** (tr.19, 43)                                                                           | l4, l11      | A13                   |

### Thứ tự đề xuất (3 vòng, mỗi vòng báo cáo riêng)

1. **Vòng 1 — dạy số cho đúng sách:** l2, l3, l4, l5 (bảng Khám phá + chữ đọc số + tập viết số + đếm theo điều kiện). _Đây là phần lệch nhiều nhất so với sách._
2. **Vòng 2 — so sánh & tách gộp:** l6, l7, l8, l9, l10 (hai nhóm đồ vật, thẻ chấm, cho thêm A/B, sơ đồ tách số, nối cặp bằng nhau).
3. **Vòng 3 — luyện tập & trò chơi:** l11, l12 (tranh cảnh đếm, dãy số điền ô, mê cung, hình ẩn số, có/không 2 bàn trò chơi) + sửa thứ tự số 0 (C3) và ghi rõ l12 là hoạt động bổ sung (C4) + gỡ "5 > 4" khỏi l3 (C2).

---

## PHẦN D — Việc cần BẠN chốt trước khi tôi viết code (ĐÃ CHỐT 2026-09-24)

1. **Chữ đọc số** — ✅ **CÓ** (đã đưa vào bảng Khám phá và phần Ghi nhớ).
2. **Tập viết số** — ❌ **KHÔNG** theo yêu cầu người dùng (bỏ mục 3 ở bảng hình đề xuất).
3. **Hai trò chơi bàn cờ** (tr.19, 43) — ❌ **BỎ QUA** theo yêu cầu người dùng.
4. **Số 0** — ✅ **Đã chuyển** lên học cùng nhóm 0–3 (SGK tr.8); `id` bài giữ nguyên (không mất tiến độ của bé).
5. **Tranh cảnh lớn** — ✅ **AI tự chọn số** và đã ghi **từng con số** vào bảng §7 của kế hoạch.

### Việc còn lại của lớp 1 (các chương sau)

- Chương 2 → 10: cùng quy trình (§11), mỗi chương một đợt nhỏ, bảng phát hiện trước khi sửa.
- Các hình dùng lại được cho chương sau: `manyGroups` (so sánh nhóm), `dotCards` (thẻ chấm), `numberTrain` (dãy số/toa tàu), `numberBond` (tách – gộp), `sceneCount` (đếm trong tranh)…

---

## CẬP NHẬT 2026-09-25 — đo lại nhóm C trên dữ liệu hiện tại (bạn yêu cầu làm lại C2, C3, C4)

Ba phát hiện nhóm C **đã xử lý xong trong §8b**, dưới đây là bằng chứng đo lại (không phải nhớ lại):

| #   | Yêu cầu của bạn                                   | Bằng chứng đo 2026-09-25                                                                                                                                                                                                                                                                                                                                                                                                                     | Kết luận   |
| :-- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| C2  | Dùng **chữ** cho giống SGK (đừng dạy dấu sớm)     | Trong `client/src/data/grade1/g1c1.js`, **mọi** chỗ dùng dấu `>` `<` `=` đều nằm **từ `g1-c1-l8` trở đi** (dòng 1013 trở xuống: `5 > 2`, `4 > 3`, `3 ? 5`, `6 ? 6`, `4 ? 7`, mê cung “lớn hơn 4”). Từ l1 đến l7 **không có ký tự dấu nào**; l6/l7 dùng đúng lời sách: “3 con ếch **nhiều hơn** 2 chiếc lá”, “hai nhóm **bằng nhau**”.                                                                                                        | ✅ đã đúng |
| C3  | Đưa **số 0** vào nhóm 1,2,3,4,5 như SGK (tr.8)    | `g1-c1-l2` nay tên **“Bài 2: Các số 0, 1, 2, 3”** (mô tả: SGK Bài 1, tr.8–10); `g1-c1-l3` = “Các số 4, 5” (tr.10–13); `g1-c1-l4` mới là 6–10. **Không còn bài “Số 0” riêng**, và `id` các bài giữ nguyên ⇒ không mất tiến độ của bé.                                                                                                                                                                                                         | ✅ đã đúng |
| C4  | Ghi rõ hoạt động **bổ sung** (không phải bài SGK) | Bài `g1-c1-l12` nay là **“Luyện tập chung (tiếp theo)”** — SGK Bài 6 (tr.42–45), **không còn** là bài “Đếm xuôi, đếm ngược”. Nội dung đếm xuôi/đếm ngược chỉ còn là **bài tập của SGK** (tr.16 bài 2 trong `g1-c1-l4`; tr.40 bài 1 trong `g1-c1-l12`) nên không cần nhãn “bổ sung” nữa. Nhãn đó **đã được dùng** ở chỗ thật sự ngoài SGK: `g1-c10-l9` “Luyện đề cuối năm Lớp 1” — xem cột ghi chú trong `docs/sgk_map_lop1.md` §2 chương 10. | ✅ đã đúng |

**Việc chuẩn bị cho các chương còn lại (bạn yêu cầu làm B1 + B2) — xong 2026-09-25:**

1. **B2 — ảnh trang sách đã trích lại:** 226 ảnh (tập 1: 117 trang · tập 2: 109 trang) ở
   `scratch/sgk-lop1/math-grade-1-part-1|part-2/page-NNNN.png`, DPI 300, đã chặn trong `.gitignore`
   (`scratch/sgk-*/`). Công cụ sinh lại: `python scratch/trich-anh-sgk.py --grade 1` (chạy lại thì tự bỏ qua trang đã có).
2. **B1 — bảng ánh xạ trang → bài:** `docs/sgk_map_lop1.md` — mục lục SGK chép **từ ảnh** cho cả 2 tập,
   bảng ánh xạ cho **cả 10 chương**, kèm **số trang PDF** để mở đúng ảnh, và cột “Chắc chắn?” để biết
   chỗ nào còn phải đối chiếu ảnh khi rà.

---

## ĐỢT CHỦ ĐỀ 2 — Làm quen với một số hình phẳng (sách tr.46–55) — ✅ ĐÃ SỬA XONG 2026-09-25

**Ảnh đã đọc:** `scratch/sgk-lop1/math-grade-1-part-1/page-0047.png` … `page-0056.png`
(sách 46–55 = PDF 47–56; **đã kiểm chân trang từng ảnh**: PDF 47 in số 46 … PDF 56 in số 55 ✔).
**Kết quả:** 8 bài `g1-c2-l1` … `l8`, **48 → 51 slide**; cổng **32 PASS**; build sạch; hình **0 tràn · 0 chồng**.

### Bảng phát hiện (đã sửa hết) — 5 nhóm A–E

| #   | Nhóm | Chỗ          | Phát hiện                                                                                                                                                            | Đã sửa thành                                                                                                                                              |
| :-- | :--- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | C    | `l1` concept | “Viên gạch hoa, **mặt đồng hồ vuông** có dạng hình vuông” — SGK tr.46 dùng ĐỒNG HỒ làm ví dụ HÌNH TRÒN, và chính `l2` dạy “mặt đồng hồ tròn xoe” ⇒ hai bài mâu thuẫn | “Viên gạch hoa, **ô cửa sổ vuông** có dạng hình vuông”                                                                                                    |
| C2  | C    | `l7`         | Cùng một bài, hai số khác nhau: kể chuyện/khám phá/ví dụ vẽ nhà **1 cửa sổ**, còn ghi nhớ và câu hỏi nói **2 hình vuông**                                            | Thống nhất **2 cửa sổ** ở MỌI slide (hình + lời khớp nhau)                                                                                                |
| C3  | C    | `l1` rule    | “Hình vuông có 4 cạnh bằng nhau **và 4 góc vuông**” — góc vuông là nội dung **LỚP 3** (ê-ke, `g3-c3`)                                                                | “Hình vuông có 4 cạnh dài bằng nhau.”                                                                                                                     |
| C4  | C    | `l2` concept | “**Hình tròn lăn được**” — hình tròn là hình PHẲNG, đặt trên bàn không lăn; cái lăn được là khối trụ                                                                 | “**Bánh xe** có dạng hình tròn nên lăn được.”                                                                                                             |
| A1  | A    | `l5`         | SGK tr.46 HĐ1 là hoạt động HỎI–ĐÁP theo đồ vật (đồng hồ · khăn · cờ · miếng gỗ), app chỉ có 4 slide “xem hình” in sẵn đáp án (“Mặt đồng hồ → hình tròn”)             | **4 slide đó thành 4 CÂU HỎI** (đồng hồ · viên gạch · mái nhà · quyển sách), hình **không in tên hình** (`showShape: false`) — số slide của bài không đổi |
| A2  | A    | `l8` (mới)   | SGK tr.47 HĐ2 “Những hình nào là hình tròn / tam giác?” — app không có dạng chọn nhiều hình                                                                          | Thêm **2 câu hỏi** với hàng **5 hình A–E**, đáp án dạng cặp (“B và E”, “A và C”) — đúng kiểu SGK                                                          |
| A5  | A    | `l8` (mới)   | SGK tr.49 LT4 “Những hình nào **KHÔNG** là hình vuông?” — app không có                                                                                               | Thêm **1 câu hỏi** 5 hình A–E, đáp án “B, C và E”                                                                                                         |
| D1  | D    | `l8`         | 2 câu hỏi cuối hỏi về hình mà **không vẽ hình nào** (Lớp 1 bé phải nhìn thấy)                                                                                        | Thêm hàng 4 hình phẳng vào chính câu hỏi (không in tên hình)                                                                                              |
| D2  | D    | `l1`–`l4`    | Câu hỏi đặc điểm hình không kèm hình, dù bài đã có sẵn hình vẽ                                                                                                       | Thêm `planeShape` cho `l1`/`l2`/`l3`; `l4` dùng **2 hình cạnh nhau** (vuông + chữ nhật) để so sánh                                                        |
| E   | E    | —            | Không có ca nào: các bài chỉ gọi TÊN HÌNH, không gọi tên đỉnh/cạnh                                                                                                   | —                                                                                                                                                         |

### Hai lỗi NẰM NGOÀI chương này, tìm ra nhân dịp rà (đã sửa, ảnh hưởng 4 lớp)

| #   | Chỗ                                                                                              | Lỗi                                                                                                                                                                                                                                                                                         | Đã sửa                                                                                                                                                                                                       |
| :-- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1  | **`PlaneShape` khi `kind: "circle"` — 21 slide của 4 lớp** (`g1-c2-l2`, `g3-c3-l3`, `g5-c3-l4`…) | Bộ vẽ gọi `pts.map(...)` khi `SHAPE_POINTS` **không có** toạ độ cho hình tròn ⇒ React ném “Cannot read properties of undefined (reading 'map')” ⇒ **cả slide không hiện**. Dữ liệu đúng, chỉ bộ vẽ thiếu vế. Phát hiện khi dựng trang xem trước chương 2 (trang trắng + lỗi ở console).     | Dùng bbox đường tròn (`160 ± 78`) khi không có toạ độ đỉnh — hình tròn vẽ được; đã kiểm trên app thật ở `g1-c2-l2`.                                                                                          |
| G2  | **Mặt đồng hồ sai giờ ở 8 slide** (L1 `g1-c9`, L2 `g2-c6`/`g2-c7`, L3 `g3-c13`)                  | 2 slide KỂ CHUYỆN và 6 CÂU HỎI mô tả một giờ nhưng đồng hồ vẽ **8 giờ 00** (giá trị mặc định) — trẻ nhìn hình 8 giờ rồi trả lời câu hỏi về 3 giờ 30 / 7 giờ 15.                                                                                                                             | Đặt lại `clock` cho khớp đúng giờ trong lời: 7:15 · 7:00 · 3:30 · 8:15 · 10:30 · 9:30 (mỗi chỗ dùng chính câu hỏi làm mốc).                                                                                  |
| G3  | **7 ca HÌNH KHÔNG VẼ ĐƯỢC** trên toàn bộ 5 lớp (trang đo `visual-fit.html` có `class="loi"`)     | Cùng họ với G1: dữ liệu dùng `kind` mà bộ vẽ không có ⇒ slide trắng hình. Con số **7** này là đo được từ trước nhưng chưa từng được đọc thành lỗi.                                                                                                                                          | Sau khi sửa G1: trang đo báo **0 ca LỖI** (682 ca hình thật của 5 lớp đều vẽ được).                                                                                                                          |
| G4  | **Nhóm D/E ở Lớp 2–3 — 6 chỗ** (`g2-c5-l4`, `g2-c5-l6`, `g3-c3-l1`, `g3-c3-l2` ×2, `g3-c3-l4`)   | (a) 3 câu hỏi/nhánh nói về đường gấp khúc ABCD · ba điểm A,O,B · trung điểm M của AB nhưng **không vẽ hình**; (b) bài “Hình tứ giác ABCD có 4 cạnh AB, BC, CD, DA” lại vẽ **hình chữ nhật không ghi tên đỉnh**; (c) bài “Góc đỉnh A, cạnh AB và AC” chỉ có **bảng chữ**, không có hình góc. | Thêm `pointLine`/`planeShape`/`angle` đúng chỗ: 4 nhánh nay có hình (`pointLine` ×3 · `planeShape kind=quad` + `vertexLabels` · `angle kind=right`). Đã kiểm trên app thật: hình hiện, app chấm đúng đáp án. |

**Giới hạn còn lại của phép soát nhóm E** (`scratch/soat-ten-diem.mjs`, 27 slide có tên điểm): còn **8 ca** nhưng **đều là chuyện chữ, không phải lỗi** — 2 ca báo oan ở Lớp 1 (chữ “Hình
chữ nhật” bị coi là tên điểm H/N/G/K) và 6 ca là **bài toán lời văn** dùng tên đoạn AB/CD (L3 `g3-c6-l7`, L4 `g4-c5-l1`, L5 `g5-c4-l5`, `g5-c5-l6`) — SGK cũng không đòi hình cho những bài này.

---

## ĐỢT CHỦ ĐỀ 3 — Phép cộng, phép trừ trong phạm vi 10 (sách tr.56–91) — ✅ RÀ + BỔ SUNG 2026-09-25

**Ảnh đã đọc:** 21 trang (`part-1/page-0057.png` … `page-0077.png`, `page-0081.png`, `page-0087.png`
= sách 56–76, 80, 86). Chưa đọc: các trang luyện tập 77–79, 82–85, 88–91.

### Kết quả quan trọng nhất: KHÔNG có lỗi số liệu

Đã kiểm **từng phép tính** trong 14 bài (`g1-c3-l1` … `l14`): 3+2=5 · 4+3=7 · 5+2=7 · 2+5=5+2=7 ·
3+6=9 · 5+0=5 · 0+3=3 · 7+0=7 · 9−3=6 · 8−2=6 · 4−0=4 · 4−4=0 · 6−6=0 · 9−5=4 · 9−4=5 · 8−3=5 ·
10−4=6 · 5+3=8 → 8−3=5 · 8−5=3 · 6+2=8 → 8−2=6 · 3+?=7→4 · ?+2=6→4 · 8−3=5 · 6+3=9 · 7−4=3 ·
4+6=10 → 10−4=6 · 10−6=4 — **tất cả đúng**.

### Nhóm A — dạng bài SGK còn thiếu (đã bổ sung 12 slide)

| #   | SGK                       | Dạng bài                                                       | Trước đây                      | Đã bổ sung vào                                                                                                                  |
| :-- | :------------------------ | :------------------------------------------------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| A1  | tr.62 · 64 · 66 · 76 · 86 | **Bảng tính — điền số ?** (SGK lặp **6 lần** trong chương này) | **Cả 5 lớp không có dạng này** | `l3` (tr.64, tổng 9) · `l4` (tr.62, tổng 7) · `l8` (tr.66, tổng 10) · `l9` (tr.76, 7 trừ dần) · `l14` (tr.86, quan hệ cộng–trừ) |
| A2  | tr.66                     | **Cộng ba số**: `3 + 1 + 2 = 6`, nhẩm từng bước                | **Cả 5 lớp không có dạng này** | `l4` (1 slide ví dụ + 1 câu hỏi)                                                                                                |

Mỗi bổ sung đi kèm **1 câu hỏi kiểm tra** đúng số của bảng, và **mỗi slide chỉ còn 1 bảng** (theo chính sách §8i).

### Nhóm A — còn lại (cần VẼ MỚI, chưa làm)

| Dạng bài SGK                                                                              | Trang                            | Vì sao chưa làm                                                                                    |
| :---------------------------------------------------------------------------------------- | :------------------------------- | :------------------------------------------------------------------------------------------------- |
| **Tháp số** (đỉnh = tổng hai ô dưới: 4 1 1 0 → 5 2 ? → 7 ? → ?)                           | tr.67 LT5                        | Cần bộ vẽ mới (bảng bậc thang), không dùng lại được khoá nào có sẵn                                |
| **Nối / tìm cặp**: “Tìm chuồng cho thỏ” (tr.63 HĐ4), “Cặp tấm thẻ anh em” (tr.65)         | tr.63 · 65                       | Cần dạng “nối” mới; hiện quiz chỉ có 1 đáp án đúng                                                 |
| **Tranh để đếm rồi viết phép tính** (bể cá/bể trống · thuyền · bướm/kem · chim trên cành) | tr.63 HĐ3 · 65 HĐ1 · 71 HĐ4 · 74 | Cần cảnh vẽ mới (đếm được, có nhóm rời)                                                            |
| **Bồn hoa “kết quả lớn hơn 3”** (so kết quả với một số)                                   | tr.76 LT2                        | Cần cảnh hoa + dạng so sánh; có thể dùng `groupScene` nếu chấp nhận bố cục khác SGK                |
| **Tính nhẩm theo cột** (9 phép một ô, nhiều trang)                                        | tr.58 · 62 · 64 · 66 · 70 · 76   | Đây là dạng “bài tập giấy”; **Luyện tập** (Practice) đã phủ dạng tính nhẩm nên chưa cần thêm slide |

### Bằng chứng sau khi bổ sung

- `node scratch/kiem-tra-slide.mjs g1-c3` → **0 lỗi** · cổng **32 PASS · 0 FAIL** · build sạch.
- Trang đo hình: **692 ca** (trước 682) — **0 ca không vẽ được · 0 tràn thẻ · 0 chữ chồng**.
- Chạy thật trên app: `l3` 7/7 · `l4` 9/9 · `l8` 8/8 · `l9` 8/8 · `l14` 8/8 — hết slide, không lỗi, app **chấm đúng cả 6 đáp án mới** (9 · 7 · 6 · 10 · 5 · 1).
- Quy mô: CĐ3 **77 → 89 slide**; toàn hệ thống **2659 → 2671** (Lớp 1: 637 → 649).

---

## ĐỢT CHỦ ĐỀ 5 — Ôn tập học kì 1 (sách tr.102–113) — ✅ RÀ + BỔ SUNG 2026-09-25

**Ảnh đã đọc:** 6 trang (`page-0103.png` · `page-0104.png` · `page-0106.png` · `page-0110.png` · `page-0112.png` +
trang đầu chương) = sách 102–105, 109, 111.

### Số liệu: app không sai phép tính nào

Đã kiểm từng con số trong 6 bài (`g1-c5-l1` … `l6`): dãy 0→10 · số liền sau/trước 7 · 10 gồm 7 và 3 ·
4 < 9 · 8 > 5 · 7 + 3 = 10 · 10 − 7 = 3 · 6 + 3 = 9 vịt — **đúng hết**.

### Nhóm A — đã bổ sung 9 slide

| #   | SGK          | Dạng bài                                                                     | Đã thêm vào                                                      |
| :-- | :----------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| 1   | tr.103 LT2   | **Đếm con vật trong tranh** (7 loại) + **“con vật nào ÍT NHẤT?”**            | `l1`: 2 câu hỏi dùng cảnh nông trại có sẵn (`sceneCount` · farm) |
| 2   | tr.105 bài 3 | **Suy luận thứ tự**: “rùa đỏ xen vào giữa thì rùa nâu thứ mấy?” → **thứ tư** | `l1`: 1 câu hỏi (đáp án “Thứ tư”)                                |
| 3   | tr.105 bài 4 | **Chia nhóm có điều kiện**: 3 thỏ vào 2 chuồng, chuồng A nhiều hơn → A = 2   | `l1`: 1 câu hỏi (đáp án 2)                                       |
| 4   | tr.103 LT3   | **So sánh SỐ với BIỂU THỨC**: `9 ? 9 − 1` · `10 ? 8 + 2` · `5 + 1 ? 8`       | `l2`: 3 câu hỏi (đáp án > · = · <)                               |
| 5   | tr.111 bài 3 | **“Hình thích hợp đặt vào dấu ?”** — dãy tròn · tam giác · vuông lặp lại     | `l4`: 1 slide hình + 1 câu hỏi (đáp án **hình tam giác**)        |

### Còn lại (cần vẽ mới / mở rộng bộ vẽ — ghi để không quên)

| Dạng bài SGK                                        | Trang        | Vì sao chưa làm                                                           |
| :-------------------------------------------------- | :----------- | :------------------------------------------------------------------------ |
| **Nối số lượng với SỐ và CHỮ** (bể cá → “3” → “ba”) | tr.102       | Cần dạng “nối” (mỗi quiz hiện chỉ có 1 đáp án đúng)                       |
| **Ghép 4 tam giác thành mũi tên / tam giác lớn**    | tr.111 bài 4 | `shapeJoin` mới có 2 hình đích; cần mở rộng (việc chung với CĐ2 tr.50–53) |
| **Trò chơi “Bắt gà”** (bàn cờ có xúc xắc)           | tr.109       | **Cố ý bỏ** theo quyết định 2026-09-24 của bạn (A13)                      |

### Bằng chứng

`kiem-tra-slide.mjs`: **0 lỗi** · cổng **32 PASS** · build sạch · trang đo hình **6 ca `patternRow` vẽ được,
0 ca lỗi** · đo hiển thị **375/360/320 px: 0 tràn thẻ · 0 tràn viewBox · 0 chữ chồng** ·
đã NHÌN ảnh chụp: dãy hình đúng thứ tự SGK (tròn xanh · tam giác xanh dương · vuông đỏ · ô `?` nét đứt)
và cảnh nông trại đếm được (2 bò · 4 gà · 6 cá).

Quy mô: CĐ5 **34 → 43 slide** (CĐ2 thêm 4 slide quy luật: 51 → 55);
toàn hệ thống **2671 → 2684** (Lớp 1: 649 → 662).

**Công cụ kiểm mới (chạy lại được bất cứ lúc nào):**

- `node scratch/kiem-tra-slide.mjs [mã-chương]` — tự kiểm 5 lớp: `type` lạ · đáp án **không** nằm trong lựa chọn · lựa chọn **trùng nhau** · slide hình có **≥ 2 hình vẽ** · `kind` hình **không có bộ vẽ** · chú thích hình **in sẵn đáp án** · **đồng hồ phải chỉ đúng giờ mà chữ nhắc**. Hiện: **0 lỗi** (119 cảnh báo “chữ nhắc lại phép tính” — để rà sau).
- `node scratch/dem-plane-shape-hong.mjs` — đếm ca `planeShape` mà bộ vẽ không có toạ độ (đọc thẳng từ mã nguồn, không chép tay).
- `node scratch/soat-dong-ho.mjs` — liệt kê MỌI slide có `clock` kèm giờ trong chữ, để đối chiếu bằng mắt.
- `node scratch/soat-ten-diem.mjs` — nhóm E: chữ gọi tên điểm (điểm A · cạnh AB · trung điểm M · tam giác ABC…) mà hình không in ra tên đó (đã bỏ qua slide `summary`).
- Trang đo `scratch/visual-fit.html`: cột `class="loi"` là **ca không vẽ được** — sau khi sửa hình tròn: **0/682 ca**.
- `scratch/xem-truoc-cd2.jsx` → `scratch/xem-truoc-cd2.html` — xem trước **cả 51 slide** của chương kèm hình thật (bản mẫu cho các chương sau).

### Việc CÒN LẠI của chương 2 (chưa làm, cần vẽ mới nhiều — chờ bạn chốt)

SGK tr.46–55 có **16 hoạt động**, app hiện phản ánh trọn **11**. Còn thiếu: đếm hình trong tranh (tr.47 HĐ3 · tr.48 LT1 · tr.49 LT3 — có bảng điền số lượng), xếp **que tính** (tr.48 LT2 · tr.54 LT2), ghép hình 3–5 miếng ra _chữ nhật · hình thang · mũi tên · tam giác lớn_ (tr.50–53 — cần mở rộng `shapeJoin`), 9 đồ vật quanh em (tr.54 LT1: ê-ke · con tem · đĩa DVD · cái bánh · khung cửa sổ · bảng lớp), đếm miếng bìa để ghép mũi tên (tr.55 LT4).

> ✅ **Đã bổ sung 2026-09-25:** **dãy hình lặp quy luật** tr.55 LT3 (cả hai bài: quy luật theo MÀU và quy luật theo HÌNH) — bằng khoá hình mới **`patternRow`** vẽ đúng như SGK: ô cần điền là **ô trống nét đứt có dấu `?`**, không vẽ sẵn hình.

---

## ĐỢT “Ô TRỐNG PHẢI ĐIỀN ĐƯỢC” (yêu cầu người dùng 2026-09-25) — ✅ ĐÃ SỬA XONG

**Yêu cầu (nguyên văn):** _“kiểm tra và đảm bảo tất cả các dạng bài có điền vào ô trống không được là
slide tĩnh và đều có thể điền đáp án vào được; đảm bảo tất cả các dạng bài tập đều có đáp án để trẻ
lựa chọn và tương tác”_.

### Bảng phát hiện (công cụ `node scratch/soat-o-trong.mjs`, soi 2690 slide của cả 5 lớp)

| #   | Bài · slide         | Hình         | Lỗi                                                         | Cách sửa                                                                               |
| :-- | :------------------ | :----------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| 1   | `g1-c3-l3` slide 4  | `table`      | Bảng in cứng 4 ô `"?"` — bé chỉ nhìn                        | → **`bangTinh`**: đáp án `[9,9,9,9]`, chọn `6/7/8`                                     |
| 2   | `g1-c3-l4` slide 4  | `table`      | y như trên (4 ô)                                            | → `bangTinh`, đáp án `[7,7,7,7]`                                                       |
| 3   | `g1-c3-l8` slide 4  | `table`      | 4 ô `"?"`                                                   | → `bangTinh`, đáp án `[10,10,10,10]`                                                   |
| 4   | `g1-c3-l9` slide 4  | `table`      | 2 ô `"?"` (7 trừ dần)                                       | → `bangTinh`, đáp án `[5,3]`, chọn `2/3/4/5`                                           |
| 5   | `g1-c3-l14` slide 4 | `table`      | 4 ô `"?"` (quan hệ cộng–trừ)                                | → `bangTinh`, đáp án `[9,1,8,2]`                                                       |
| 6   | `g3-c1-l4` slide 3  | `table`      | 4 ô `"?"` trong câu phép tính                               | → `bangTinh`; **hàng 1 giữ làm MẪU** (`500 − ? = 260` → `240`), bé điền hàng 2 (`200`) |
| 7   | `g3-c2-l9` slide 3  | `table`      | 6 ô `"?"` (nhân–chia)                                       | → `bangTinh`; hàng mẫu `? × 7 = 42` → `6`, bé điền `30` và `9`                         |
| 8   | `g2-c13-l1` slide 3 | `table`      | 2 ô `"?"` nhưng **không có số liệu nào để điền**            | → bỏ ô `"?"`, đổi thành **ví dụ có số thật** (đỏ 7 bạn · xanh 4 bạn, khớp bài sau)     |
| 9   | `g1-c2-l8` slide 9  | `patternRow` | Ô `?` trong dãy hình quy luật **theo màu** — không bấm được | → nay **bé chọn HÌNH** để điền; ô hiện **hình tròn ĐỎ** đúng quy luật màu              |
| 10  | `g1-c2-l8` slide 11 | `patternRow` | Ô `?` quy luật **theo hình**                                | → chọn giữa tròn · tam giác · vuông; đáp án **tam giác**                               |
| 11  | `g1-c5-l4` slide 6  | `patternRow` | Ô `?` (SGK tr.111)                                          | → như trên; đáp án **tam giác**                                                        |

_(5 slide dãy hình còn lại nằm trên slide CÂU HỎI — bé trả lời bằng các lựa chọn của câu hỏi nên
hợp lệ, công cụ in ra khi chạy `--het`.)_

**Vòng 2 (cùng ngày) — tìm thêm 2 ca sau khi SỬA THƯỚC ĐO:**

| #   | Bài · slide         | Hình          | Lỗi (trẻ chỉ nhìn)                                                                                   | Cách sửa                                                                       |
| :-- | :------------------ | :------------ | :--------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| 12  | `g1-c1-l4` slide 9  | `numberScene` | Dãy số 0 → 10 có **4 ô trống** chỉ vẽ nét đứt — chữ còn ghi “bé điền số còn thiếu” mà không bấm được | → **`TrainFill`**: bấm ô `?` rồi chọn số, chấm ngay — `answers: [2, 3, 7, 10]` |
| 13  | `g1-c1-l11` slide 7 | `numberScene` | 6 ô `?` trong **6 toa tàu** (SGK tr.40) — cùng lỗi                                                   | → như trên — `answers: [5, 4, 5, 8, 9, 1]`                                     |

> 🔴 **HAI LỖI THƯỚC ĐO ĐÃ MẮC Ở CHÍNH ĐỢT NÀY (ghi để không lặp):**
>
> 1. **Đoán danh sách `mode` tương tác ⇒ CỔNG XANH GIẢ.** Bản đầu tôi xếp 13 `mode` của
>    `numberScene` vào nhóm “tự tương tác”; đọc mã thì `Grade1NumberVisuals.jsx` **chỉ có MỘT**
>    `useInteractive()` và dùng ở **3 nhánh**: `numberMaze` · `dotCards` · `comparePairs`.
>    Vì đoán nên công cụ **bỏ qua** đúng 2 ca dãy số (12, 13). ⇒ Danh sách “cái gì tương tác”
>    **phải đọc mã**, không được đoán.
> 2. **Luật `null` quá rộng ⇒ báo oan.** Khi thêm luật “`null` là ô trống”, công cụ tố 2 slide
>    `g5-c4-l4`/`g5-c4-l5` với `motionDiagram.b = null` — thực ra là **“không có xe thứ hai”**,
>    hình không hề có ô trống. Đã siết: **chỉ** đếm `null` trong `bangTinh` và `numberScene`.

**Bộ vẽ mới cho dãy số:** `TrainFill` (`Grade1NumberVisuals.jsx`) — bản TĨNH và bản ĐIỀN ĐƯỢC
**dùng chung một hàm vẽ** (toạ độ tách ra `oRibbon()` · `oWagons()`, đầu máy `DauMay()`), nên không
còn hai bản công thức dễ lệch nhau; thiếu `answers` ⇒ tự về bản tĩnh (dùng cho slide câu hỏi).
Chữ trong hình đổi thành **“Bé bấm ô “?” rồi chọn số còn thiếu”** cho khớp việc bé thật sự làm.

### Cách sửa — hai bộ vẽ

- **`bangTinh`** (`client/src/components/visuals/interactiveTable.jsx`): bảng 2 cột; ô `null` trong
  `rows` = **ô trống bé điền**; `answers` = đáp án từng ô theo thứ tự đọc; `options` = các số cho bé
  chọn. Bé bấm ô (hoặc ô tự chọn), chọn số, **chấm ngay**: đúng → ô xanh, sai → ô đỏ + hiện gợi ý,
  có đếm `x/N`, nút “Làm lại”, và **chúc mừng khi xong hết**. Nếu `answers` lệch số ô ⇒ bảng tự rơi
  về dạng tĩnh (không sập), và công cụ soát sẽ báo lỗi dữ liệu.
- **`patternRow`** (nay nhận `answers`/`options`): ô `?` là ô bấm được; dải nút chọn là **hình vẽ**
  (tròn · tam giác · vuông) — dùng `FillBar` với `renderOption`/`tenOption` nên phần tiến độ · chúc
  mừng · “Làm lại” **chỉ có một bản**, không chép lại.

### Luật thường trực (đã thêm vào `scratch/kiem-tra-slide.mjs`)

1. Bảng vẽ bằng `table` **không được** in cứng ô `"?"` (phải dùng `bangTinh` hoặc bỏ dấu `?`).
2. `bangTinh`: số đáp án **phải** bằng số ô `null`; phải có `options` ≥ 2; **chỉ** đặt trên slide
   `story` / `concept` / `visual` (ngoài ba kiểu này thì không cho bấm — lỗi im lặng).
3. `patternRow` có **> 1** ô `?` mà không có đáp án, đặt trên slide câu hỏi = lỗi.

### Bằng chứng

`soat-o-trong.mjs`: **0 ca cần sửa** (7 ca hợp lệ) · `kiem-tra-slide.mjs`: **0 lỗi** · cổng **32 PASS · 0 FAIL** ·
build sạch · trang đo **707 ca: 0 lỗi vẽ · 0 tràn · 0 chữ chồng** ở 375/360/320 px ·
**kiểm thật trong app** (`/lesson/g1-c3-l4`): bấm **sai** → ô đỏ, tiến độ giữ `0/4`; bấm **đúng** 4 ô →
“🎉 Bé làm đúng hết!” `4/4`, các nút chọn tự khoá; (`/lesson/g1-c5-l4` slide 6): chọn “hình tam giác” →
ô thứ 8 hiện **tam giác xanh, viền xanh lá**, `1/1` — **đã xem ảnh chụp cả hai**.

Quy mô: **2684 → 2690** (Lớp 1: 662 → 668) — phần tăng là 6 slide CĐ6 ở mục dưới.

---

## ĐỢT CHỦ ĐỀ 8 — Cộng, trừ (không nhớ) trong phạm vi 100 (sách tr.44–71) — ✅ ĐÃ RÀ (bằng MÁY)

**Cách rà khác hẳn các chương trước: kiểm SỐ HỌC bằng máy thay vì nhìn 28 trang ảnh.**
Nhóm lỗi C (số liệu sai) là nhóm máy kiểm **chắc hơn mắt người**: viết công cụ mới
`scratch/soat-phep-tinh.mjs` đọc thẳng dữ liệu 5 lớp và kiểm:

| Nguồn                                                                                 |  Đã kiểm | Kết quả |
| :------------------------------------------------------------------------------------ | -------: | :------ |
| `operation` (`{left, sign, right, result}`)                                           |  **142** | 0 sai   |
| `comparison` (dạng object và dạng chuỗi)                                              |   **10** | 0 sai   |
| Mọi câu “a op b = c” trong **chữ** của slide (thầy thuật, giải thích, gợi ý, ô bảng…) | **1626** | 0 sai   |
| Câu hỏi “a op b = ?” so với `answer`                                                  |        9 | 0 sai   |

**Kết luận CĐ8:** SGK chỉ có 3 loại bài (đặt tính rồi tính · tính nhẩm · trò chơi theo nhóm) và
**không có bảng “Số ?”** nào ⇒ **không phải bổ sung dạng điền**; app đã có đủ 12 bài, khớp cấu trúc SGK.
Vậy chương này **không phải sửa dữ liệu** — cái được là **bảo đảm số học toàn hệ thống**.

> 🔴 **Ba nhóm BÁO OAN của công cụ đã sửa (ghi để lần sau viết luật là tránh ngay):**
>
> 1. **Cắt đôi số / cắt phép tính con:** `14 − 6  =  14 − 4 − 2  =  8` bị khớp thành `14 − 6 = 1`;
>    `3 + 4 + 5 = 12` bị khớp thành `4 + 5 = 12`. Chữa: chốt `(?!\d)` sau kết quả + xét **vế trước**
>    bằng mẫu “SỐ rồi TOÁN TỬ ở cuối”.
> 2. **Số thập phân · phân số · tỉ số:** `3,45 × 10`, `2/5 × 10`, `AB : CD = 4 : 7 = 4/7` — chữa:
>    chặn `,` và `/` ở **cả hai bên**. Và `:` là cái bẫy: vừa là phép chia vừa là **dấu câu**
>    (“Tính: 45 + 9 = 54”) —— nên chỉ chặn khi trước `:` **là chữ số**.
> 3. **Dấu cách phân nghìn làm `gonSo` gộp qua XUỐNG DÒNG:** `"… = 429\n429 − 173 …"` thành `429429`.
>    Chữa: chỉ gộp **dấu cách thường** (`(\d) (?=\d{3}\b)`), không dùng `\s`.
>
> **Và bài học chống “cổng xanh giả”:** công cụ có **CANARY 13 ca hai vế** (bắt được `3 + 4 = 8`,
> **không** bắt `3 + 4 = 7` · `3 + 4 + 5 = 12` · `45 + 9 = 36? Không!` · `13 : 3 = 4 (dư 1)` ·
> `2/5 × 10 = 4` · `AB : CD = 4 : 7`). Chạy công cụ là biết thước còn sống hay không.

---

## ĐỢT CHỦ ĐỀ 9 — Thời gian: giờ và lịch (sách tr.72–87) — ✅ ĐÃ RÀ

### a) Đồng hồ trong app: đo bằng công cụ trước, soi bằng mắt sau

`node scratch/soat-dong-ho.mjs` in ra **33 slide có mặt đồng hồ** kèm “giờ hình vẽ” và “giờ chữ
nhắc tới”. Lọc riêng CĐ9 Lớp 1 được **4 slide**, cả 4 đều khớp:
`g1-c9-l1` (3:00, chữ nói về mặt đồng hồ) · `g1-c9-l2` (7:00 ↔ “7 giờ”) ·
`g1-c9-l4` (8:00 trong bảng giờ vào lớp) · `g1-c9-l9` (9:00 ↔ “9 giờ”).

> ⚠️ **Suýt đọc sai công cụ:** dòng in ra có dạng `L1 g1-c9-l1 #2 …` — tôi tưởng `L1` là
> “mức 1 = nặng nhất”. Đọc mã mới biết `L` là **Lớp** (L1…L5). Số đo vô lý ⇒ nghi cây thước trước.

### b) 🔴 DẠNG LỖI MỚI (F): hình ghi trong dữ liệu nhưng KHÔNG có chỗ vẽ

SGK in **hình đồng hồ** cho trẻ đọc giờ. App có viết _“Đồng hồ chỉ mấy giờ?”_ nhưng
câu hỏi lại **mô tả kim bằng chữ**: “Kim ngắn chỉ số 7, kim dài chỉ số 12…” ⇒ lộ đáp án,
trẻ không phải đọc đồng hồ, chỉ phải đọc chữ.

Đào sâu thì ra nguyên nhân gốc: `LessonPage.jsx` chỉ vẽ `number` · `operation` · `comparison` ·
`clock` trong `VisualSlide`; slide `story` / `quiz` / `summary` chỉ gọi `VisualBlocks` — mà
`VisualBlocks` vẽ theo `HINH_KEYS` (`visualKeys.js`), **KHÔNG có 4 khoá đó** ⇒ dữ liệu đặt
`clock` lên slide câu hỏi thì **hình không bao giờ hiện**, im lặng, không lỗi, không cảnh báo.

| Bước                                                                                                                    | Kết quả                                                                                           |
| :---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Công cụ mới `scratch/soat-hinh-khong-hien.mjs`                                                                          | **22 ca** mất hình (Lớp 2–4) — canary 6/6                                                         |
| Đọc mã để lập **bản đồ vẽ theo từng kiểu slide**                                                                        | 2 ca đầu là **tôi báo oan** (`ConceptSlide` CÓ vẽ `clock`) ⇒ sửa công cụ thành bảng, canary 10/10 |
| Thêm khối dùng chung `CalcFigures` (số · phép tính · đồng hồ · so sánh) cho `StorySlide` · `ConceptSlide` · `QuizSlide` | **23 hình hiện ra** (9 story · 11 quiz · 3 concept), đo lại = 0 ca mất hình                       |

### c) Sửa cho khớp SGK

- **4 câu hỏi Lớp 1 CĐ9**: bỏ mô tả kim trong đề → đề còn _“Đồng hồ chỉ mấy giờ?”_ (hoặc
  _“Xem đồng hồ rồi cho biết bé làm gì lúc đó?”_), **giữ lời giải thích ở `mascotHint`**.
- **6 câu hỏi Lớp 2/3** (`g2-c6`, `g3-c13`): cũng bỏ phần “Kim ngắn chỉ số 3, kim dài chỉ số 6”
  khỏi đề — gợi ý xuống `mascotHint` (`g3` thêm luật “3 × 5 = 15 phút”).
- **Mặt đồng hồ số La Mã** (`ClockGraphic` thêm `roman`): SGK Lớp 3 “Làm quen với chữ số La Mã”
  in mặt đồng hồ cổ I…XII; app trước dây đặt `clock` cho hai slide đó nhưng vẽ số 1…12 ⇒ **nghịch chữ**.
  Nay có `roman: true`, cỡ chữ hạ xuống 13 (bé 11) để “VIII” không chồn vạch. Đo thật:
  **12 nhãn, 0 chồn nhau, cách tâm gần nhất 20 px**.
- **Bỏ `clock` ở 1 slide sai ngữ cảnh**: `g2-c3-l2` “Cân đồng hồ có kim chỉ số…” — đó là **cái cân**,
  không phải đồng hồ ⇒ thay bằng `items` ⚖️. (Nếu để nguyên thì vừa rồi hình cái CÂN sẽ hoá thành ĐỒNG HỒ.)

### d) Kiểm chứng

`node --check` 5 file dữ liệu ✓ · `kiem-tra-slide` 0 lỗi · `soat-o-trong` 0 ô trống tĩnh ·
`soat-hinh-khong-hien` 0 ca · `soat-phep-tinh` 0 sai · **cổng tĩnh 32 PASS** · `build:web` exit 0 ·
seed SQL sinh lại (S-32 đỏ lúc đầu vì đúng lý do: dữ liệu mới hơn seed).
Xem bằng trình duyệt thật: `g2-c6-l3` (đồng hồ 3:30 + đề ngắn) · `g1-c9-l2` (đồng hồ 7:00) ·
`g3-c8-l5` (đồng hồ La Mã).

---

## ĐỢT CHỦ ĐỀ 7 — Độ dài và đo độ dài (sách tr.28–43) — 🔄 ĐANG RÀ (đã thêm 1 bài)

**Đã xem ảnh:** tr.36 · tr.38 (và toàn bộ chữ tr.28–43 qua OCR tách theo trang).

| #   | Bài · trang SGK                     | Nhóm                    | Phát hiện                                                                                                                                                                                                                                 | Xử lý                                                                                                                                                                                                                                                                         |
| :-- | :---------------------------------- | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Cao hơn, thấp hơn — tr.30–31**    | **A (thiếu hoạt động)** | SGK có hẳn một phần “Cao hơn, thấp hơn” (Bài 25) mà app **không có bài nào** — chỉ có dài hơn/ngắn hơn                                                                                                                                    | ✅ Thêm **bài mới** `g1-c7-l9`, chèn ở vị trí thứ 2, sau đó chạy `chuan-hoa-danh-so.mjs` để đánh lại số (nay là “Bài 2: Cao hơn, thấp hơn”): 1 kể chuyện · 1 khám phá · **biểu đồ cột** so chiều cao 3 cây · 3 câu hỏi (cao hơn · thấp hơn · hươu cao cổ vs ngựa) · 1 ghi nhớ |
| 2   | “Chọn số đo độ dài phù hợp” — tr.36 | —                       | 5 đồ vật, mỗi đồ vật chọn giữa 2 số đo (bút mực 35 cm/12 cm · cốc nước 4 cm/3 gang tay · bút chì 30 cm/1 gang tay · bút sáp 20 cm/8 cm · hộp bút 5 gang tay/25 cm). Sách **tô màu sẵn** một ô ở mỗi dòng nên **không chắc đâu là đáp án** | ⏸ **CHƯA làm — cần bạn chốt** (nhìn ảnh không đủ để đoán; luật cũ: không đoán số)                                                                                                                                                                                             |
| 3   | Đếm đồ chơi + trả lời — tr.38       | —                       | Đồ chơi vẽ trên lưới ô vuông kèm thước 0–14; hỏi “mỗi đồ chơi dài bao nhiêu cm”, “đồ chơi nào dài nhất”, “có bao nhiêu xe ngắn hơn xe khách”. Muốn đúng thì phải có ảnh đồ chơi + số đo chuẩn                                             | ⏸ **CHƯA làm — cần bạn chốt số đo**                                                                                                                                                                                                                                           |

**Kiểm chứng:** cổng **32 PASS** · `kiem-tra-slide` 0 lỗi · `soat-o-trong` 0 ô trống tĩnh · build sạch.
Quy mô: 5 · 51 · **460 bài** · **2712 slide** (Lớp 1: 98 bài · 690 slide).

_(Công cụ dùng để thêm bài: `scratch/them-bai-cd7.mjs` — có chốt chống chạy lặp, có ghi chú
bài học: file `g1c7.js` dùng **khoá CÓ NHÁY** (`"id":`) nên mẫu tìm phải viết đúng thứ tự đó.)_

Đã bổ sung **6 slide** theo **Bài 21 (số có hai chữ số, sách tr.4–15)** — bảng Viết/Đọc số lấy đúng mẫu tr.4; các câu hỏi theo nội dung đọc – viết – so sánh số có hai chữ số. _(Các trang cụ thể sẽ được chốt lại khi rà trọn CĐ6 theo quy trình §11.)_

| Slide              | Nội dung                                                     | Ghi chú                                                                                                   |
| :----------------- | :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `g1-c6-l2` slide 5 | Bảng **Viết số · Đọc số** 11 → 20                            | Bảng **tra cứu** (mọi ô in sẵn) — không phải bài điền, nên **không** đặt ô `?` nào                        |
| `g1-c6-l2` slide 6 | _“Số 18 đọc là gì?”_ → **mười tám**                          | Lựa chọn: mười tám · mười bảy · tám mươi · mười chín                                                      |
| `g1-c6-l2` slide 7 | **“Số ?” — dãy số 1 → 20** có 4 ô trống (SGK **tr.5** HĐ3)   | Ô điền được (`TrainFill`); bộ vẽ **tự chia 2 hàng** vì 20 ô không vừa một hàng — đáp án `[4, 13, 14, 18]` |
| `g1-c6-l2` slide 8 | **“Số ?” — 6 đoàn tàu** (SGK **tr.6** LT1)                   | Đúng **6 hàng như sách**, 12 ô trống — đáp án `[13,14, 14,15, 14,15, 18,19, 13,15, 17,19]`                |
| `g1-c6-l3` slide 5 | _“100 gồm mấy chục?”_ → **10 chục**                          |                                                                                                           |
| `g1-c6-l7` slide 5 | _“Số nào có hai chữ số giống nhau?”_ → **44**                |                                                                                                           |
| `g1-c6-l7` slide 6 | _“Số tròn chục lớn nhất mà bé hơn 100?”_ → **90**            |                                                                                                           |
| `g1-c6-l9` slide 4 | _“Trong bảng 100 số, số nào đứng ngay dưới số 45?”_ → **55** |                                                                                                           |

_(Số slide nói trên là **số thứ tự trong bài**, đã đối chiếu lại bằng script đọc thẳng dữ liệu —
không chép tay.)_

**Còn lại của CĐ6:** rà 12 bài `g1-c6-l1` … `l12` theo ảnh SGK tập 2 (tr.4–27) bằng quy trình §11
(bảng phát hiện nhóm A–E trước, rồi mới sửa). Đã xem ảnh **tr.5, tr.6, tr.7**; **chưa** làm:
HĐ1 tr.5 (mỗi túi 10 quả cà chua → 12 · 15 · 18 · 20) · HĐ2 tr.5 (đếm khối lập phương và cá trong
tranh) · trò chơi “Đường đến Đảo giấu vàng” tr.7 (trò chơi theo nhóm — cân nhắc có đưa vào app
không) · và **tr.9–27** (số tròn chục · số đến 99 · đọc–viết số · so sánh · bảng 100 số · luyện tập chung).
Khi thêm bảng/bài điền mới: **dùng `bangTinh`** (bảng) hoặc **`numberScene.mode = "numberTrain"`**
(dãy số — bản điền được đã có sẵn, chỉ cần `answers` khớp số ô) — **không được in cứng ô `?`** (§8o).

> ⚠️ **Quan sát khi thử trong app (2026-09-25):** thanh “Trước / Tiếp tục” là `position: sticky`
> nên khi trang đang cuộn, nó **che mất hàng nút chọn dưới cùng** của những slide có nhiều nút
> (12 ô trống ⇒ 9 nút). Nội dung vẫn cuộn tới được nên **không phải lỗi chặn**, nhưng nếu người
> dùng thấy vướng thì cách chữa rẻ nhất là giảm số nút (`options`) hoặc chừa lề dưới cho slide.
> Khi thêm bảng/bài điền mới: **dùng `bangTinh`** (bảng) hoặc **`numberScene.mode = "numberTrain"`**
> (dãy số) — **không được in cứng ô `?`** (luật §8o).
