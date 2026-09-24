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
