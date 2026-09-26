# Kế hoạch: bổ sung HÌNH ẢNH minh họa cho bài học

Ngày đo: 2026-09-22. Người đề xuất: Copilot. Trạng thái: **chờ bạn duyệt trước khi viết code.**

## 1. Hiện trạng — đo bằng số, không phải cảm nhận

Công cụ đo (mới viết): `node scratch/kiem-tra-hinh-anh.mjs`

> ⚠️ Bảng dưới là **số đo LÚC BẮT ĐẦU** (lúc đó chưa slide nào có hình). Tình trạng hiện tại
> xem **mục 9.7–9.9** ở cuối tài liệu: 5 lớp · 51 chương · 459 bài · **2774 slide**, **751 slide
> mang hình**, **659 lượt render hình THẬT đạt · 0 hỏng** (đo lại sau vòng “mỗi slide chỉ một hình”
> ngày 2026-09-24 — xem §8i của `docs/sgk_curriculum_standardization_plan.md`).

| Lớp      | Số slide | Slide có hình | Số bài  | Bài KHÔNG có hình nào |
| -------- | -------- | ------------- | ------- | --------------------- |
| 1        | 532      | 0 (0,0%)      | 97      | 97 (100%)             |
| 2        | 666      | 0 (0,0%)      | 120     | 120 (100%)            |
| 3        | 707      | 0 (0,0%)      | 123     | 123 (100%)            |
| 4        | 297      | 0 (0,0%)      | 65      | 65 (100%)             |
| 5        | 236      | 0 (0,0%)      | 54      | 54 (100%)             |
| **Tổng** | **2438** | **0 (0,0%)**  | **459** | **459 (100%)**        |

Kết luận: **không một slide nào có hình.** Nhận xét của bạn hoàn toàn đúng về số liệu.

Nguyên nhân **không** phải thiếu bộ vẽ. `client/src/pages/LessonPage.jsx` đã dựng sẵn một hệ
thống hình vẽ **đọc từ dữ liệu** (data-driven), nhưng **nội dung không khai khoá nào** nên
không có gì được vẽ.

## 2. App ĐÃ CÓ gì (không phải làm mới)

Đây là "hợp đồng" thật của từng bộ vẽ, đọc trực tiếp từ mã:

| Khoá dữ liệu                                                           | Vẽ ra cái gì                                                      | Kiểu slide dùng được  |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------- |
| `items: [{emoji, count, label}]`                                       | Vẽ **`count` bản sao của một emoji** (xếp 1 hàng hoặc khung 10 ô) | `visual`              |
| `number`                                                               | Một số lớn ở giữa                                                 | `visual`              |
| `operation: {left, sign, right, result}`                               | Phép tính viết dọc                                                | `visual`              |
| `comparison: {left, sign, right}`                                      | So sánh hai số với dấu > < =                                      | `visual`              |
| `clock: {hour, minute, showLabels, timeText, frameColor, shape, size}` | **Đồng hồ kim vẽ bằng SVG** (tròn hoặc vuông, 3 cỡ)               | `visual` + `concept`  |
| `shape` + `shapeLabel`                                                 | **Hình vẽ SVG**: vuông, tròn, tam giác, chữ nhật, lập phương      | `concept`             |
| `activityGrid: [{period, clock, timeText, desc}]`                      | Lưới thẻ, mỗi thẻ có thể chứa một đồng hồ                         | `concept`             |
| `gallery: [{badge, clock, label, timeText}]` + `galleryTitle`          | Thư viện thẻ có đồng hồ                                           | `concept`             |
| `dialogue: {...}`                                                      | Cảnh hội thoại có nhân vật (Nam, Mai, Rô-bốt, Việt, Mi, Cú Mèo)   | `concept`, `dialogue` |
| `visualDisplay`                                                        | Chuỗi emoji/chữ vẽ minh họa cho câu hỏi                           | slide `quiz`          |

**Điểm mấu chốt:** bộ vẽ là dữ liệu điều khiển, nên việc chính là **bổ sung dữ liệu**, không
phải viết lại giao diện.

## 3. Còn THIẾU gì — phải xây mới mới đủ dùng

Bộ vẽ hiện tại thiên về **đồng hồ** và chỉ có **5 hình cơ bản**. Rất nhiều chủ đề không có
cách vẽ nào:

**Lớp 1–3**

- **Trục số** (tia số) — dùng ở lớp 1, 2, 3 khi dạy so sánh, cộng trừ, làm tròn. Sách giáo khoa dùng liên tục.
- **Khung 10 ô / khối chục – đơn vị** — cách chuẩn để dạy "mấy chục mấy đơn vị".
- **Tiền Việt Nam** — lớp 2 (CĐ 11) và lớp 3 (CĐ 13) có hẳn bài về tiền, hiện không có hình tờ tiền.
- **Hình có ghi cạnh và góc** — dạy chu vi, diện tích (lớp 3 CĐ 9).
- **Thước đo có vạch** (cm, mm) — dạy đo độ dài.
- **Bảng đơn vị / bảng số liệu** — thống kê lớp 3 CĐ 15.

**Lớp 4–5**

- **Phân số**: băng giấy chia phần và hình tròn chia phần — không có cách nào dạy phân số mà chỉ có chữ.
- **Sơ đồ đoạn thẳng** (Tổng – Tỉ, Hiệu – Tỉ) — đây là **cách duy nhất** trẻ hiểu dạng toán này; sách dùng sơ đồ đoạn thẳng.
- **Góc và thước đo góc**, **hình bình hành / hình thoi / hình thang** (bộ vẽ hiện không có 3 hình này).
- **Hình khối 3D**: hộp chữ nhật, lập phương, hình trụ, hình cầu (chỉ có "lập phương" ở dạng 2.5D).
- **Bảng hàng của số thập phân**, **biểu đồ cột / biểu đồ hình quạt**.

## 4. Nguyên tắc đề xuất

1. **Vẽ bằng SVG/emoji do app tự dựng — KHÔNG nhúng ảnh từ sách giáo khoa.**
   Ba lý do: (a) tránh vấn đề bản quyền ảnh của NXB Giáo dục; (b) nét vẽ vector co giãn đẹp
   trên mọi màn hình từ điện thoại đến máy tính, ảnh chụp thì vỡ nét; (c) không phải tải ảnh
   từ mạng nên app vẫn chạy offline như hiện nay.
2. **Giữ nguyên cách làm data-driven** — hình do dữ liệu bài học quyết định.
3. **Không đổi mã bài, không đụng phần chữ đang tốt.** Chỉ **thêm** khoá hình vào slide.
4. **Admin không làm mất hình** — đã kiểm: trình soạn bài dùng phép trải `...content` khi lưu,
   nên khoá lạ được giữ nguyên. (Nhưng Admin hiện **chưa có ô nhập** cho các khoá hình phong
   phú — xem mục 7.)
5. **Sai còn tệ hơn thiếu.** Mỗi hình phải khớp đúng nội dung bài. Không chèn hình trang trí
   vô nghĩa; không đoán bừa số liệu.

## 5. Kế hoạch theo giai đoạn

| GĐ  | Việc                                                               | Sản phẩm                          | Trạng thái |
| --- | ------------------------------------------------------------------ | --------------------------------- | ---------- |
| 1   | **Mở rộng bộ vẽ** — thêm các component SVG còn thiếu ở mục 3       | `client/src/components/visuals/*` | **XONG**   |
| 2   | **Lớp 1 và Lớp 2** — đếm, cộng trừ, hình, đồng hồ, tiền            | dữ liệu hình cho 217 bài          | **XONG**   |
| 3   | **Lớp 3** — bảng nhân chia, chu vi/diện tích, đo lường, thống kê   | dữ liệu hình cho 123 bài          | **XONG**   |
| 4   | **Lớp 4 và Lớp 5** — phân số, sơ đồ đoạn thẳng, hình khối, biểu đồ | dữ liệu hình cho 119 bài          | **XONG**   |

### KẾT QUẢ CUỐI

| Số đo                       | Trước       | Sau           |
| --------------------------- | ----------- | ------------- |
| Bài có ít nhất một hình     | **0 / 459** | **459 / 459** |
| Slide mang hình (bộ vẽ mới) | 0 / 2438    | 439 / 2438    |
| Bộ vẽ được dùng             | 0           | **17 / 17**   |

Số lần dùng từng bộ vẽ (đo trên dữ liệu thật):

| Bộ vẽ           | Lần | Bộ vẽ            | Lần |
| --------------- | --- | ---------------- | --- |
| `table`         | 285 | `barChart`       | 7   |
| `numberLine`    | 50  | `circleParts`    | 7   |
| `placeValue`    | 42  | `baseTen`        | 6   |
| `planeShape`    | 39  | `pieChart`       | 6   |
| `barModel`      | 26  | `money`          | 5   |
| `ruler`         | 23  | `fractionCircle` | 4   |
| `fractionBar`   | 17  | `angle`          | 4   |
| `solid`         | 16  |                  |     |
| `tenFrame`      | 15  |                  |     |
| `motionDiagram` | 9   |                  |     |

Phép thử: **561 lượt render đạt · 0 hỏng**. Cổng **31 PASS · 0 FAIL**. Build `client` và
`admin` đều **exit 0**. Không file dữ liệu nào có ký tự hỏng (U+FFFD = 0).

### 🔴 HAI LỖI CHỈ NHÌN MÀN HÌNH MỚI THẤY

Phép thử render báo "561 đạt · 0 hỏng" — nhưng khi **mở app thật và chụp ảnh** thì lộ ra
hai lỗi mà phép thử KHÔNG THỂ thấy, vì cả hai đều đúng về mặt "có render ra HTML":

**1. Hình không hiện, vì app không đọc file tĩnh.** `content_source = "remote"` và
`content_version = 108` ⇒ app đọc nội dung **từ DB**, mà DB chưa có hình. Phép thử render
đọc thẳng file tĩnh nên vẫn xanh. **Bài học: phép thử đọc nguồn nào thì chỉ chứng minh
được nguồn đó.** Muốn biết bé thấy gì thì phải mở app.

**2. Bảng số liệu chồng chữ.** Khối hình nằm trong thẻ `display: flex; align-items: center`,
mà `margin: 14px auto` làm flex item co về vừa nội dung ⇒ khối chỉ rộng **361 px** trong thẻ
**833 px**. Kèm theo, `Table` vẽ trong `viewBox` **cố định 132 px mỗi cột** và SVG không tự
xuống dòng ⇒ ô dài như "khoảng cách ban đầu : (v1 + v2)" tràn sang cột bên cạnh.
Đã sửa: khối hình khai `width: 100%`, `Table` tự tính bề rộng cột theo nội dung dài nhất
và **tự ngắt dòng** trong ô.

**3. `card` bị chép làm BA bản** (mỗi file bộ vẽ một bản). Sửa bề rộng ở `CoreVisuals` thì
`FractionVisuals` và `GeometryVisuals` **vẫn giữ giá trị cũ** — bảng giãn đúng mà sơ đồ
chuyển động vẫn bị bó hẹp. Đã gộp vào `visualTheme.js` (một nguồn duy nhất).

**4. Sai nội dung hình.** Bài `g5-c4-l6` dạy "ngược chiều **gặp nhau**" nhưng sơ đồ vẽ
`mode: "apart"` = _"Hai xe đi RA XA nhau"_. Đã sửa thành `"toward"`.

⚠️ Rút ra: **phép thử tự động không thay được việc nhìn màn hình.** Cả 4 lỗi trên đều
"đạt" trong phép thử.

### ⚠️ VIỆC CÒN LẠI BẮT BUỘC — NẠP LẠI NỘI DUNG VÀO DB

App đang đọc nội dung từ **DB** (`content_source = "remote"`), và DB **chưa có hình**
(`migrate-content.mjs --verify` báo **459/459 bài có nội dung khác**). Nghĩa là **bé chưa
thấy hình nào** cho tới khi nạp lại:

```powershell
node scripts/migrate-content.mjs --sql      # sinh lại file SQL (đã sinh sẵn)
# dán các file trong supabase/content-seed/ theo đúng thứ tự vào SQL Editor:
#   00 → 01 → 02 → 03 → 04 → 05 → 06 → 99 → 100
node scripts/migrate-content.mjs --verify   # phải ra exit 0
```

🔴 Bước `100` là **bắt buộc**: nó tăng `content_version`, nhờ đó máy các bé mới biết là
có bản mới và bỏ cây đã cache (nếu thiếu, máy bé **KHÔNG BAO GIỜ** thấy nội dung mới).

### Giai đoạn 1 đã xong gì

Đã viết 3 file + 1 bộ điều phối, tổng **17 bộ vẽ mới**:

| File                                                | Bộ vẽ                                                                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client/src/components/visuals/CoreVisuals.jsx`     | Trục số · Khung 10 ô · Khối chục–đơn vị · Bảng hàng · Thước đo · Tiền Việt Nam · Bảng số liệu                                                      |
| `client/src/components/visuals/GeometryVisuals.jsx` | Hình phẳng (7 loại, ghi được số đo cạnh) · Góc (nhọn/vuông/tù/bẹt) · Hình tròn (tâm, bán kính, đường kính) · Hình khối (lập phương, hộp, trụ, cầu) |
| `client/src/components/visuals/FractionVisuals.jsx` | Băng giấy phân số · Hình tròn chia phần · **Sơ đồ đoạn thẳng** · Sơ đồ chuyển động · Biểu đồ cột · Biểu đồ hình quạt                               |
| `client/src/components/visuals/VisualBlock.jsx`     | Bộ điều phối: đọc khoá nào có thì vẽ khoá đó, vẽ được nhiều hình trên một slide                                                                    |

Đã nối vào `LessonPage.jsx` (chỉ THÊM, không thay khối cũ) nên slide "Hình ảnh" và slide
"Khái niệm" đều dùng được.

**Bằng chứng đo được:** `scratch/test-visuals-entry.jsx` render cả 17 bộ vẽ thành HTML thật
bằng `react-dom/server`, thử với 3 loại dữ liệu: mặc định, dữ liệu thật, và **18 bộ dữ liệu
"độc hại"** (sai kiểu, `null`, số âm, mảng rỗng, giá trị cực lớn).

Kết quả: **399 đạt · 0 hỏng**.

⚠️ Phép thử này **bắt được một lỗi thật gây trắng trang**: `MotionDiagram` ném lỗi
`Cannot read properties of null (reading 'name')` khi dữ liệu có `a: null`. Nguyên nhân:
giá trị mặc định của tham số (`= {}`) chỉ áp dụng khi giá trị là `undefined`, còn `null` đi
qua nguyên vẹn. Đã sửa ở `MotionDiagram` và `Solid` (cùng lỗi tiềm ẩn với `dims: null`).

Cách chạy lại phép thử:

```powershell
$env:NODE_PATH = "$PWD\client\node_modules"
& "client\node_modules\@esbuild\win32-x64\esbuild.exe" scratch\test-visuals-entry.jsx `
  --bundle --platform=node --format=cjs --jsx=automatic `
  --outfile=scratch\visual-bundle.cjs --loader:.jsx=jsx
node scratch\visual-bundle.cjs
```

Mỗi giai đoạn kết thúc bằng: chạy `kiem-tra-hinh-anh.mjs` (đo lại tỉ lệ) → cổng
`test:portal:static` → build `client` và `admin`. Không sang giai đoạn sau khi giai đoạn
trước chưa xanh.

## 6. Cách đo tiến độ

Cùng một câu lệnh, trước và sau mỗi giai đoạn:

```powershell
node scratch/kiem-tra-hinh-anh.mjs
```

Mục tiêu tối thiểu: **mỗi bài có ít nhất 1 slide có hình** (chỉ số "bài KHÔNG có hình nào"
về 0). Mục tiêu cao: mọi slide có thể vẽ đều có hình.

## 7. Cần bạn chốt

**a) Ưu tiên lớp nào trước?**
Đề xuất: **Lớp 1 và 2 trước** — bé nhỏ nhất, chưa đọc thạo nên hình quan trọng nhất; và đây
cũng là phần dễ vẽ đúng nhất (đếm vật, so sánh số, đồng hồ).
Lựa chọn khác: lớp 4–5 trước (phân số và sơ đồ đoạn thẳng là chỗ thiếu trầm trọng nhất).

**b) Mức độ tới đâu?**

1. Mỗi bài **ít nhất 1 slide** có hình (nhanh, khoảng 1 giai đoạn cho cả 5 lớp).
2. Mỗi bài **3–5 slide** có hình (đề xuất — đủ để bé hình dung xuyên suốt bài).
3. Mọi slide có thể vẽ đều có hình (lâu nhất, nhưng đầy đủ nhất).

**c) Có cho tôi mở rộng bộ vẽ (GĐ 1) không?**
Nếu chỉ dùng bộ vẽ hiện có, tôi chỉ làm được: đếm vật thể, phép tính dọc, so sánh, đồng hồ,
và 5 hình cơ bản. Phân số, sơ đồ đoạn thẳng, hình khối 3D, biểu đồ, tiền Việt Nam, trục số
**sẽ không có** — mà đó lại là những chỗ trẻ cần hình nhất ở lớp 3–5.

**d) Có cần Admin nhập được hình không?**
Hiện Admin chưa có ô nhập cho `items`, `gallery`, `dialogue`… Chỉ số ít khoá (`clock`, `shape`)
là Admin biết. Nếu bạn muốn tự thêm hình qua Admin Portal sau này thì cần thêm một giai đoạn
nữa để làm giao diện đó. Nếu không, tôi chèn hình trực tiếp vào file dữ liệu (như đã làm với
nội dung chữ).

## 8. Rủi ro đã lường trước

| Rủi ro                               | Cách xử lý                                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| Hình sai nội dung bài                | Mỗi hình sinh từ chính số liệu trong slide, không đoán; soát tay từng lớp sau khi chèn        |
| Chèn hàng loạt làm hỏng file dữ liệu | Script chèn phải ĐẾM và DỪNG nếu số lượng không khớp (bài học từ các lần sửa hàng loạt trước) |
| Emoji bị hỏng khi ghi file           | Đếm ký tự `U+FFFD` sau mỗi lần ghi (đã thành thói quen)                                       |
| App nặng hơn vì nhiều SVG            | SVG vẽ tại chỗ, không tải ảnh; mỗi slide chỉ vài chục phần tử                                 |
| Admin ghi đè làm mất hình            | Đã kiểm: dùng phép trải nên giữ khoá lạ; sẽ kiểm lại bằng phép thử sau khi chèn               |

## 9. Khắc phục "dính vào nhau" và co giãn theo màn hình (làm ngày 2026-09-22)

### 9.1 Ba lỗi chạm nhau đã chữa

Nguyên nhân chung: các khối được đặt sát nhau theo đơn vị `viewBox`, mà trên màn hình hình bị
co lại (hệ số ~0,8–1,0), nên khe 2 đơn vị chỉ còn ~1–2 điểm ảnh — mắt thấy như dính liền.

| Hình                   | Lỗi cũ                                                                       | Cách chữa                                                       |
| ---------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Khối chục / đơn vị     | Ô trong thanh chục cao 11,2 còn ô đơn vị cao 22, khe dọc 2 ⇒ trông dính, méo | Dùng MỘT cỡ ô vuông 18 cho cả hai, khe 4, khe giữa hai thanh 14 |
| Bảng hàng (placeValue) | Ô tiêu đề (10→48) và ô chữ số (48→114) chạm đúng mép nhau                    | Cách nhau 10 đơn vị (`KHE_DOC`), chiều cao thẻ 142              |
| Bảng số liệu           | Các hàng vẽ liền nhau (`y += cao`), không có khe                             | Thêm `KHE_HANG = 4` giữa các hàng                               |

Đo lại khe hẹp nhất giữa hai hình (khung rộng 644 px như trên máy tính): bảng số liệu 3,3 px ·
khối chục/đơn vị 5,2 px · bảng hàng 6,5 px · khung 10 ô 11,5 px. **Hai hình cố ý bằng 0**:
`fractionBar` và `barModel` — chúng là các đoạn của MỘT băng liền nhau, thêm khe là vẽ sai.

### 9.2 Co giãn: chữ không được teo xuống mức không đọc được

Đo trên app thật ở màn hình điện thoại 375 px (khối hình chỉ rộng **311 px**): chữ trong hình co
còn **5,3 px ở bảng số liệu**, 6,4 px ở biểu đồ cột, 6,7 px ở thước, 8,0 px ở trục số — không đọc
được, mà app lại phát hành chủ yếu qua APK (điện thoại). Vì `<svg width="100%">` co theo thẻ, chữ
dùng đơn vị `viewBox` nên co theo.

Quy tắc mới, nằm ở **một chỗ**: `svgFit(vbW)` trong `client/src/components/visuals/visualTheme.js`,
dùng cho **cả 16 thẻ `<svg>`** (trước đây mỗi nơi tự viết `width="100%"`).

- Bề rộng tối thiểu = `viewBox × 0,85`, **chặn trên ở 644 px**.
- 644 px chính là bề rộng thẻ trên máy tính (680 `maxWidth` − 32 padding − 4 viền), và được
  **suy ra trong code**, không viết cứng.
- Chặn trên là bắt buộc: nếu không, hình rộng 792 đòi 673 px > 644 ⇒ tự nhiên mọc thanh cuộn ngang
  trên máy tính, đúng chỗ trước đó vẫn hiển thị tốt.
- Hình rộng hơn thẻ thì **thẻ tự cuộn ngang** (`overflowX: auto`) thay vì co chữ xuống nữa.

Kết quả đo trên app thật:

| Màn hình | Chữ nhỏ nhất trong hình | Thẻ phải kéo ngang | Trang có tràn ngang? |
| -------- | ----------------------: | -----------------: | -------------------- |
| 320 px   |                 11,0 px |                2/2 | Không (312 = 312)    |
| 375 px   |                 11,0 px |                2/2 | Không (367 = 367)    |
| 512 px   |                 12,9 px |                1/2 | Không (504 = 504)    |
| 768 px   |                 11,4 px |                0/2 | Không                |
| 1280 px  |                 14,9 px |                0/2 | Không                |

Bảng đầy đủ của cả 17 loại ở 375 px: chữ nhỏ nhất giờ là **10,2 px** (biểu đồ cột) và không loại
nào dưới 10 px; trước khi sửa có 4 loại dưới 9 px. Trên máy tính, bề rộng khung vẫn đúng 644 px
như cũ nên **không có gì thay đổi** ở màn hình lớn.

### 9.3 Việc còn lại (chưa làm, để bạn quyết)

Trên điện thoại, hình rộng (bảng nhiều cột, biểu đồ cột, sơ đồ chuyển động…) nay phải **kéo ngang**
trong thẻ. Đây là đánh đổi có ý: chữ đọc được, nhưng phải kéo. Ở 375 px có 24/54 trường hợp đo
phải kéo; từ 768 px trở lên không trường hợp nào. Muốn bỏ hẳn việc kéo ngang trên điện thoại thì
phải làm **bố cục riêng cho màn hẹp** (ví dụ bảng số liệu xếp dọc thành từng ô thay vì lưới) —
việc lớn hơn, chưa làm.

### 9.4 Vòng soát thứ hai: "vẽ ra ngoài khung" (2026-09-22, sau khi bạn xem lại)

Sau khi xem ảnh chụp, bạn hỏi vì sao hình 9 + 4 lại vẽ 9 + 1 + 2. Nguyên nhân **không phải bộ vẽ**
mà là **DB chưa nạp lại**: bộ vẽ mới (vẽ thêm nhóm ô còn lại) chạy trên dữ liệu cũ
(`extra: 3`) nên ra 12 ô. Kiểm chứng bằng cách đọc thẳng trong DB: `tenFrame` vẫn là `extra: 3`.
Sau khi dán lại seed, hình là 13 ô — khớp `9 + 1 = 10, rồi 10 + 3 = 13` và khớp trục số 9 → 13.

Từ đó tôi viết thêm một phép đo cho **cả 17 loại hình**: phần tử nào vẽ ra ngoài khung `viewBox`
(quá 2 đơn vị) thì báo. Kết quả: **4 lỗi thật**, đều đã chữa.

| Hình             | Đo được trước khi chữa                                                                                                                                                   | Cách chữa                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Trục số          | Nhịp (hop) vẽ **nửa đường tròn** bán kính bằng nửa dây cung: nhịp dài 508 đơn vị ⇒ đỉnh cung vươn tới **y = −161** trong khung cao 132 ⇒ bé chỉ thấy một mẩu cung bị cắt | Dùng **cung bậc hai nông**, chiều cao cố định 20 (nhịp thứ hai 30) |
| Sơ đồ đoạn thẳng | Nhãn "Tổng 35" / "Hiệu 24" vươn tới **663–666 đơn vị** trong khung 560 ⇒ **tràn 103 đơn vị**                                                                             | Tính bề rộng cả **phần chữ ở cuối hàng** rồi mới chia thanh        |
| Hình góc         | Góc 120° có chấm đầu tia ở **x = −10 → 0** ⇒ mất một phần chấm (góc bẹt còn xa hơn)                                                                                      | **Dời đỉnh góc** theo bề rộng thật của hình rồi canh giữa          |
| Hình khối        | Nhãn "Sáu mặt đều là hình vuông bằng nhau" ở tâm x = 130 ⇒ mép trái **vượt ra 8,9 đơn vị**                                                                               | Canh giữa theo bề rộng khung (x = 170) và rút gọn câu              |

Sau khi chữa: **0/61 hình vẽ ra ngoài khung**.

⚠️ Khi đo kiểu này **phải bỏ qua các phần tử nằm trong `<defs>`/`<marker>`** — chúng không được
xếp bố cục nên `getBoundingClientRect` trả số vô nghĩa (đã đo được "tràn 21 987 đơn vị" ở
sơ đồ chuyển động, tất cả là do mũi tên trong `<marker>`).

### 9.5 Câu hỏi trong bài học cũng cần hình (và đã có)

`QuizSlide` vốn **đã** dựng được khay hình (`content.items`) nhưng dữ liệu chưa dùng lần nào:
đo được **0/723 câu hỏi có hình**. Nay đã thêm hình cho **16 câu**: 1 câu đếm con chim,
8 câu "trên biểu đồ", 7 câu lời văn (thước và băng giấy) — trong đó 2 câu phải sửa lại chữ vì
trước đó hỏi về "hình chữ nhật ABCD" và "vật nào dưới đây" mà không hề vẽ gì.

Để câu hỏi mang được cả hình của bộ vẽ (thước, sơ đồ đoạn thẳng…), slide câu hỏi nay gọi
`<VisualBlocks>` giống slide "hình ảnh". Tổng số slide mang hình: **446** (trước 439).

Ba điều chỉnh nhỏ kèm theo:

- Nút **"Nghe đọc" chỉ còn icon loa**, nhãn loại slide nằm cùng hàng; thứ tự trong hàng là
  **[loa] rồi [cờ báo lỗi]** — đúng yêu cầu của bạn.
- `BarModel` thêm tham số `unit` để ghi "20 cm" thay vì "20 phần".
- Số của mỗi hàng trong `BarModel` chuyển sang **bên trái, ngay trước thanh**: nếu để ở cuối
  thanh thì trên điện thoại hình phải kéo ngang và bé **thấy thanh mà không thấy số**, mà số
  ("20 cm") mới là thứ cần đọc.

### 9.6 Hình phải VỪA thẻ trên điện thoại — bỏ hẳn việc kéo ngang (2026-09-22, lần 4)

**Vấn đề bạn báo:** nhiều hình phải **scroll sang phải** mới xem hết.

**Đo trước khi sửa** (trang `scratch/visual-fit.html`, màn 375 px, 550 ca hình THẬT của cả 5 lớp):

| Chỉ số                          | Trước             | Sau         |
| ------------------------------- | ----------------- | ----------- |
| Thẻ phải kéo ngang              | **166 / 550**     | **0 / 550** |
| Hình rộng nhất (đơn vị viewBox) | 948 (bảng 12 cột) | 380         |
| Chữ nhỏ nhất trong hình         | 9,5 px            | 10,2 px     |
| Phần tử vẽ ra ngoài khung       | —                 | 0           |
| Cặp chữ đè lên nhau             | —                 | 0           |

**Nguyên nhân.** Lần 3 tôi chữa "chữ quá nhỏ" bằng `minWidth = viewBox × 0,85`. Cách đó giữ
chữ to nhưng **đẩy SVG rộng hơn thẻ** ⇒ thẻ mọc thanh cuộn ngang. Không thể vừa nhét một
bảng 948 đơn vị vào thẻ mà vừa giữ nguyên cỡ chữ — phải **hẹp bề rộng viewBox lại**.

**Bề rộng thật dùng được của một hình, đo trong app ở màn 375 px:**

```
375 − 20 (khung trang) − 8 (lề slide) − 28 (thẻ .slide-visual-card) − 36 (thẻ hình) = 283 px
```

(màn 360 px: ≈ 268 px). Vì chữ trong hình tính bằng **đơn vị viewBox**, chữ cỡ `f` hiện ra
`f × 283 / viewBoxW` px. Từ đó ra quy tắc đã áp cho MỌI hình:

> **viewBox rộng ≤ 380 đơn vị và cỡ chữ ≥ 14 đơn vị.**
> ⇒ iPhone 375 px: chữ 15 đơn vị ≈ 11,2 px. Máy 360 px: ≈ 10,6 px.

**Sửa gì cho từng hình**

| Hình                   | Trước                 | Nay                                                                            |
| ---------------------- | --------------------- | ------------------------------------------------------------------------------ |
| Trục số                | rộng cứng 560         | **tự tính** theo bề rộng nhãn thật, kẹp trong [260, 380]                       |
| Khung 10 ô             | ô 44 ⇒ tới 434        | ô 38 (khung 5 ô) / 34 (khung 10 ô); nhóm ô dư bị chặn số cột                   |
| Khối chục – đơn vị     | ô 18 ⇒ tới 498        | ô 15, khe 3/8; nhãn "10"/"1" cỡ 15                                             |
| Bảng hàng              | cột cứng 96 ⇒ tới 880 | cột theo **từ dài nhất** của tiêu đề (hai dòng), cắt thành **nhiều khối**      |
| Thước đo               | 520/L ⇒ tới 584       | 296/L; nhãn cm **cách quãng** khi vạch sát nhau                                |
| Bảng số liệu           | cột 78–300 ⇒ tới 948  | cột theo nội dung, **cắt thành nhiều khối** xếp dọc khi quá 12 cột đôi chỗ     |
| Băng giấy phân số      | 520                   | 380; **nhãn phương trình của mỗi dòng chuyển xuống DƯỚI băng**                 |
| Sơ đồ đoạn thẳng       | 560                   | 380; nhãn hàng **trên thanh**, số **bên trái**, nhãn ngoặc **ngắt dòng**       |
| Sơ đồ chuyển động      | 560                   | 360; xếp lại chiều dọc (tiêu đề 22, mũi tên 36, tên 56, emoji 90, vận tốc 114) |
| Biểu đồ cột            | 560                   | 350; tiêu đề **ngắt dòng** và hạ vùng vẽ xuống                                 |
| Biểu đồ quạt           | 560                   | 360; bánh nhỏ lại (r = 62), chú giải sát bên phải, **ngắt dòng**               |
| Hình học, phân số tròn | 320–340               | giữ nguyên (vốn đã đủ hẹp)                                                     |

**Hệ quả trên máy tính (có chủ ý).** `svgFit` nay thêm **trần phóng to 1,6 lần**. Trước đây
`width: 100%` làm hình 194 đơn vị bị vẽ to **3,4 lần** (khung 5 ô có ô vuông 128 px) — hình
nào hẹp thì càng bị phóng đại. Nay:

- **Điện thoại không bị trần chen vào**: ở màn 375 px thẻ chỉ cho 283 px, mà 1,6 × 194 = 310
  ⇒ `width: 100%` mới là giới hạn. Chỉ hình rất hẹp (viewBox < 177) mới chạm trần, và khi đó
  vẫn vừa thẻ nên **không sinh cuộn ngang**.
- **Máy tính**: hình rộng 380 đơn vị (trục số, bảng, sơ đồ) hiện 608 px — gần đúng bề rộng
  644 px như trước, nên bố cục trang bài học gần như không đổi; các hình hẹp thì gọn lại.

**Bảy lỗi tìm thêm được trong lúc đo** (đều là loại "nhìn mới thấy", cổng không bắt):

| Chỗ                 | Lỗi đo được                                                                             | Chữa                                                           |
| ------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Bảng hàng 9 cột     | bề rộng ô lấy "phần còn lại của khối" ⇒ các ô `x=8 w=280`, `x=64 w=224` **đè lên nhau** | lấy đúng `cotTuNhien[c]`                                       |
| Bảng hàng           | đoán 7,4 đơn vị/ký tự ⇒ tiêu đề các cột đè nhau 15–21 px                                | đo thật: chữ hoa tiếng Việt ≈ **9,5** đơn vị/ký tự (cỡ 14 đậm) |
| Trục số 199→254     | nhãn **253 và 254 cách nhau 3 px**; mốc 245 bị mất nhãn                                 | vẽ nhãn cho MỐC ĐÁNH DẤU trước, rồi thêm nếu còn chỗ           |
| Trục số có 2–3 nhịp | hai nhãn cung cách nhau 10 đơn vị ⇒ **đè nhau**; nhịp thứ ba vượt lên khỏi khung        | nhịp cao 20 + i×22; **chiều cao khung tăng theo số nhịp**      |
| Thước đo            | chữ "cm" ở `y + 22` còn số ở `y + 30` ⇒ **"cm" đè lên số cuối**                         | "cm" lên trên thước, vạch đo nhấc lên theo                     |
| Biểu đồ cột         | số của cột cao nhất **đè lên tiêu đề** (5 px)                                           | hạ mép trên vùng vẽ xuống (58 thay vì 44)                      |
| Sơ đồ chuyển động   | emoji cỡ 26 cao 28 đơn vị trên đường chân chữ ⇒ **đè lên tên xe**                       | giãn cột dọc: tên 56, emoji 90, vận tốc 114                    |
| Biểu đồ quạt / cột  | tiêu đề dài (51 và 46 ký tự) **tràn ra ngoài khung**                                    | ngắt dòng (và hạ bánh/vùng vẽ xuống)                           |

**Số đo để dùng lại khi sửa hình** (đo bằng `getBBox` trong trình duyệt, cỡ chữ tính bằng px = đơn vị):

| Chữ                      | Cỡ  | Bề rộng thật                                        |
| ------------------------ | --- | --------------------------------------------------- |
| "Trăm" (hoa, có dấu)     | 14  | 37,9 ⇒ **9,5 / ký tự**                              |
| "triệu" (thường)         | 14  | 34,1 ⇒ 6,8 / ký tự                                  |
| "VIII", "20"             | 15  | 25,3 và 17,6 ⇒ 6,3–8,8                              |
| "Đo lường & chuyển động" | 13  | 156,3 ⇒ 7,1 / ký tự                                 |
| Emoji (🚗)               | 26  | rộng 35,7 · **cao 28 trên / 7 dưới** đường chân chữ |

**Cách đo lại sau này** (bắt buộc mỗi khi đổi bề rộng hình):

```
1) gói + sinh trang đo: esbuild scratch/visual-fit.jsx --bundle --platform=node --format=cjs
       --jsx=automatic --outfile=scratch/visual-fit.cjs  rồi  node scratch/visual-fit.cjs
2) mở scratch/visual-fit.html, đặt `.khung` về 311px (= màn 375) hoặc 296px (= màn 360)
3) kiểm 4 con số: số thẻ có `scrollWidth > clientWidth` (phải 0),
   số phần tử vượt viewBox (phải 0), số cặp `<text>` đè nhau (phải 0),
   chữ nhỏ nhất (≥ 10 px).
```

Trang đó chứa **HẾT 555 ca hình khác nhau** trong dữ liệu 5 lớp — cố ý không cắt bớt, vì
"ca to nhất theo JSON" không nhất thiết là "ca rộng nhất".

**Giới hạn còn lại (nói thẳng).** Máy rất hẹp (320 px) thì chữ trong hình còn ~8,2 px và bảng
nhiều cột bị cắt thành nhiều khối nên **hình cao hơn**. Đây là đánh đổi không tránh được: một
bảng 12 cột không thể vừa 283 px mà chữ vẫn 11 px.

### 9.7 Hình vẽ phải nói ĐÚNG điều lời giảng nói (2026-09-22, lần 5)

**Vấn đề bạn báo:** bạn chụp màn hình 7 slide của **Lớp 1 – Chủ đề 2** rồi chỉ ra từng lỗi, và
mỗi lần đều yêu cầu _"rà soát và bổ sung với tất cả bài học khác"_. Bảy lỗi, xếp theo nguyên
nhân — vì **một nguyên nhân thường nằm ở nhiều bài**:

| Lỗi bạn báo                                                                     | Nguyên nhân thật                                                                 | Cách chữa                                                                          |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| "hình tam giác chỉ có cạnh chứ không có đỉnh"                                   | lời giảng nói "3 cạnh · 3 đỉnh" nhưng hình **chỉ ghi chữ "cạnh"**                | thêm `vertices`: chấm tròn ở từng đỉnh + nhãn "đỉnh"                               |
| "quyển sách quá nhỏ, trẻ không nhìn thấy"                                       | hình minh hoạ chỉ là **hình chữ nhật trơn** — không ai nhìn ra là quyển sách     | bộ vẽ mới `shapePicture` — **10 đồ vật** vẽ bằng SVG của app                       |
| "nhồi nhét nhiều thông tin vào 1 slide"                                         | 1 slide chứa **4 dòng chữ + bảng + 1 hình** ⇒ mọi thứ bé tí                      | tách thành **5 slide**, mỗi slide MỘT đồ vật to                                    |
| "diễn giải hình vuông nhưng lại vẽ hình chữ nhật"                               | `SHAPE_POINTS.square` là **180 × 140** — một hình chữ nhật dán nhãn "Hình vuông" | sửa thành **160 × 160**; lỗi này nằm ở **17 chỗ của cả 5 lớp**                     |
| "ghép 2 tam giác vuông thành hình vuông mà không thấy cách ghép"                | hình cũ là **một hình chữ nhật** + dòng chữ, không hề cho thấy hai mảnh rời      | bộ vẽ mới `shapeJoin`: 2 mảnh RỜI → mũi tên → hình kết quả (vạch đứt chỉ chỗ khít) |
| "nhà có mái tam giác, thân chữ nhật, cửa sổ vuông mà minh hoạ là hình chữ nhật" | hình minh hoạ **không liên quan** tới lời giảng                                  | vẽ đúng ngôi nhà: mái tam giác + thân chữ nhật + cửa sổ vuông                      |
| "thử thách minh hoạ ngôi nhà nhưng không có hình ảnh"                           | slide câu hỏi **không có hình nào**                                              | thêm hình ngôi nhà (bản 2 cửa sổ để bé đếm)                                        |

**Hai bộ vẽ mới** (đăng ký trong `visualKeys.js`, `VisualBlock.jsx`):

- `shapePicture` — `{ kind, windows, note, showShape }`: vẽ **đồ vật thật** cỡ lớn (quyển sách,
  mặt đồng hồ, viên gạch lát nền, mái nhà, cửa sổ, bánh xe, cửa ra vào, mặt bàn, quả bóng,
  ngôi nhà) rồi ghi tên **đồ vật** ở trên và tên **hình** ở dưới. Trẻ thấy vật trước, tên hình
  sau — đúng cách trẻ nhận biết hình.
- `shapeJoin` — `{ piece, pieces, note, showResult }`: hai mảnh rời → mũi tên → kết quả.
  `showResult: false` **cố ý không vẽ hình kết quả** — dùng cho câu hỏi "ghép lại được hình gì?":
  vẽ luôn hình kết quả thì câu hỏi chỉ còn là bài tập nhìn, không phải suy nghĩ.

**Soát toàn bộ 5 lớp** (công cụ mới `scratch/soat-hinh-sai.mjs`, ghi kết quả ra
`scratch/soat-kq.txt`). Nó chia lỗi thành 5 họ A–E rồi **liệt kê từng chỗ**, để không phải tin
vào cảm nhận:

| Họ lỗi                                                        | Trước | Sau    |
| ------------------------------------------------------------- | ----- | ------ |
| A. chỗ vẽ `planeShape.square` (nay đã vuông thật — thông tin) | 14    | 14     |
| B. nói tới ĐỈNH mà hình chưa đánh dấu đỉnh                    | 4     | **0**  |
| C. slide nhồi (bảng + hình, hoặc ≥ 2 hình + chữ dài)          | 30    | **27** |
| D. bài "nhận biết hình trong đồ vật" thiếu hình đồ vật        | 4     | **1**  |
| E. dạy GHÉP/CẮT mà không có hình minh hoạ                     | 11    | **4**  |

**Những chỗ còn lại của C/D/E — nói rõ vì sao để nguyên:**

- **C = 27**: đều là **bảng công thức + MỘT hình** ở Lớp 3–5 (ví dụ bảng quy đổi đơn vị đi kèm
  một hình vuông). Phép đo cho thấy chúng **không tràn, không đè chữ**; tách tiếp sẽ làm bài
  loãng mà không sửa được lỗi nào. **Ba slide nhồi THẬT (≥ 2 hình) đã tách đôi**: Lớp 2
  `g2-c14-l5`, Lớp 3 `g3-c3-l8`, `g3-c3-l10` — trong đó `g2-c14-l5` và `g3-c3-l10` còn dạy sai
  chỗ khác: chữ nói "3 cạnh" mà **không có hình tam giác nào**, chữ nói "đường gấp khúc" mà
  hình là hình chữ nhật. Đã sửa cả chữ lẫn hình cho khớp nhau.
- **D = 1**: Lớp 1 `g1-c2-l5#1` — slide tóm tắt "Hình ở quanh em". Bốn đồ vật được nhắc ở đây
  có **hình to ở ngay bốn slide kế tiếp**, nên thêm hình vào đây là lặp vô ích.
- **E = 4**: ba chỗ là **bài toán lời văn** bị luật soát bắt nhầm chữ "cắt" ("Bạn Nam cắt 30
  hình tròn…"), một chỗ là Lớp 5 `g5-c3-l5` — đã thêm **biểu đồ hình quạt** vào slide kể chuyện
  nhưng luật soát chỉ tính "hình dạng", không tính biểu đồ, nên vẫn bị đếm. **Không phải lỗi.**

**Bảy slide kể chuyện/câu hỏi được thêm hình** (cùng một lỗi "chỉ có chữ"):
Lớp 2 `g2-c5-l6` (tứ giác — `showName: false` vì tên hình vẽ là "Hình bình hành", từ chưa học
ở lớp 2), Lớp 4 `g4-c2-l6` (góc vuông), `g4-c4-l7` (hình thoi), Lớp 5 `g5-c3-l5` (biểu đồ quạt),
`g5-c3-l6` (hộp chữ nhật), `g5-c3-l9` (hình trụ), Lớp 1 `g1-c2-l6` (câu hỏi ghép hình).

**Đo lại sau khi sửa** (568 ca hình thật, không cắt bớt):

| Màn hình        | Thẻ kéo ngang | Phần tử vượt khung | Cặp chữ đè nhau | Chữ nhỏ nhất |
| --------------- | ------------- | ------------------ | --------------- | ------------ |
| 375 px (311 px) | **0 / 568**   | 0                  | 0               | 10,2 px      |
| 360 px (296 px) | **0 / 568**   | 0                  | 0               | 9,7 px       |
| 320 px (228 px) | **0 / 568**   | 0                  | 0               | 7,2 px       |

Phép thử tự động: `PHÉP THỬ HÌNH THẬT: 590 đạt · 0 hỏng` (mỗi slide có hình được render thật
bằng `VisualBlocks`), `PHÉP THỬ BỘ VẼ HÌNH: 399 đạt · 0 hỏng`, cổng admin `31 PASS · 0 FAIL`.

**Quy mô nội dung đổi:** 2447 → **2450 slide** (tách 3 slide nhồi). Số bài/chương không đổi.
⚠️ Con số này còn nằm trong `scripts/migrate-content.mjs` (`MONG_DOI`) và 3 câu trong
`scripts/test-admin-portal.mjs` — **đổi số slide thì phải đổi cả 5 chỗ**, nếu không cổng đỏ oan.

### 9.8 Hình phải GHI TÊN ĐIỂM — A, B, C, D, M, O (2026-09-22, lần 6)

**Vấn đề bạn báo:** _"mô tả hình chữ nhật có cạnh AB và BC và 4 đỉnh A, B, C, D nhưng lại
không ghi chú A, B, C, D lên trên hình thì làm sao trẻ hiểu được?"_

Đúng — và khi soát ra thì đây là **cả một họ lỗi**, không phải một chỗ: chữ trong bài **gọi
tên điểm** mà trên hình **không có chữ nào**. Nặng nhất là 4 bài Lớp 2 Chủ đề 5 dạy
"đoạn thẳng AB", "đường gấp khúc ABCD", "ba điểm thẳng hàng" — tên gọi của hình **chính là
các chữ A, B, C, D**, mà hình minh hoạ lại là… **cái thước đo**, có bài không có hình nào
(chữ A, B, C, D chỉ nằm trong đoạn văn, viết dạng `A •———• B`).

| Chỗ                                                    | Trước                                | Sau                                                                     |
| ------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------- |
| Lớp 2 `g2-c5-l6` tứ giác ABCD                          | một chữ "đỉnh" chung ở góc trên trái | **A, B, C, D** ở từng đỉnh + **AB, BC, CD, DA** trên từng cạnh          |
| Lớp 2 `g2-c5-l1` đoạn thẳng AB                         | hình CÁI THƯỚC ĐO                    | điểm A, điểm B có chấm và tên                                           |
| Lớp 2 `g2-c5-l2` đoạn thẳng / đường thẳng / đường cong | 1 slide: thước + bảng                | 3 slide, mỗi slide 1 hình có tên A, B                                   |
| Lớp 2 `g2-c5-l3` ba điểm thẳng hàng                    | chỉ có BẢNG, không có hình           | 2 hình: A·B·C **thẳng hàng** và A·B với **C không thẳng hàng**          |
| Lớp 2 `g2-c5-l4` đường gấp khúc ABCD                   | hình CÁI THƯỚC ĐO                    | đường gấp khúc thật, A·B·C·D ở bốn đỉnh                                 |
| Lớp 3 `g3-c3-l1` O là điểm ở giữa A, B                 | hình CÁI THƯỚC ĐO                    | ba điểm A · O · B trên đoạn thẳng                                       |
| Lớp 3 `g3-c3-l2` M là trung điểm của AB                | hình CÁI THƯỚC ĐO                    | đoạn A · M · B **có vạch bằng nhau ở hai nửa** (thấy AM = MB)           |
| Lớp 3 `g3-c3-l3` đường tròn                            | chỉ có chữ O ở tâm                   | **O** ở tâm, **B** và **C** ở hai đầu đường kính, **A** trên đường tròn |
| Lớp 3 `g3-c3-l4` góc đỉnh A, cạnh AB và AC             | không có chữ nào                     | **A** ở đỉnh, **B** và **C** ở hai đầu cạnh                             |
| Lớp 4 `g4-c2-l5` góc nhọn đỉnh O, cạnh OA và OB        | không có chữ nào                     | **O** ở đỉnh, **A** và **B** ở hai đầu cạnh                             |
| Lớp 5 `g5-c3-l3`, `l4` hình tròn                       | chỉ ghi "bán kính"                   | ghi đúng chữ công thức dùng: **bán kính r**, **đường kính d**           |

**Bộ vẽ mới `pointLine`** — 7 kiểu, một nguồn duy nhất cho mọi hình "điểm và đường":
`segment` (đoạn thẳng) · `line` (đường thẳng kéo dài) · `curve` (đường cong) ·
`polyline` (đường gấp khúc, tên ở 4 đỉnh) · `collinear` (ba điểm thẳng hàng) ·
`notCollinear` (ba điểm KHÔNG thẳng hàng) · `pointsOnly` (chỉ hai điểm rời — dùng cho
câu hỏi "nối A với B được hình gì?", **cố ý không vẽ sẵn đoạn thẳng** vì vẽ là cho luôn đáp án).
Mỗi điểm là một **chấm tròn + tên**, hướng ghi tên viết cứng theo từng hình nên chữ luôn
nằm NGOÀI hình, không bao giờ đè lên nét vẽ.

**Cách làm ở các bộ vẽ cũ** (đều theo một luật: _có chữ thì phải NỚI KHUNG_):

- `PlaneShape`: thêm `vertexLabels` — khung cao 240 → 266 và tên hình hạ từ `y 228` → `254`,
  nếu không chữ ở đỉnh dưới (y ≈ 206) sẽ chồng lên tên hình.
- `Angle`: thêm `vertexLetter` + `armLetters` — khung cao 220 → 250, tên góc hạ xuống 242.
- `CircleParts`: thêm `pointLabels` + `radiusLabel`/`diameterLabel` — khung giữ nguyên.

**Ba lần phép đo bắt lỗi của CHÍNH TÔI trong vòng này** (ghi lại vì rất đáng nhớ):

1. Hai chữ "bán kính r" và "đường kính d" đặt đối xứng qua tâm ⇒ **đè nhau ở giữa** ~7 đơn vị.
2. Sửa bằng cách hạ "đường kính d" xuống dưới đường kính ⇒ **đè lên chữ "O"** ở tâm.
3. Chốt: để "đường kính d" ở TRÊN đường kính và lệch hẳn sang trái ⇒ 0 chồng chéo.

**Hai họ lỗi mới trong công cụ soát** (`scratch/soat-hinh-sai.mjs`):

- **F. gọi tên điểm mà hình không ghi tên**: **11 → 3 chỗ**. 3 chỗ còn lại **cố ý không sửa**:
  1 câu hỏi mà vẽ hình là cho luôn đáp án ("Điểm nào ở giữa?") + 2 bài toán lời văn
  ("Đoạn thẳng AB dài 12 cm. Trung điểm M cách A bao nhiêu?").
- **G. bài đoạn thẳng có tên (AB) mà hình lại là thước đo**: **0 chỗ** (đã chuyển hết 4 chỗ).

**Đo lại sau khi sửa** (580 ca hình thật, đã thêm 14 ca `pointLine`):

| Màn hình        | Thẻ kéo ngang | Phần tử vượt khung | Cặp chữ đè nhau | Chữ nhỏ nhất |
| --------------- | ------------- | ------------------ | --------------- | ------------ |
| 375 px (311 px) | **0 / 580**   | 0                  | 0               | 10,2 px      |
| 360 px (296 px) | **0 / 580**   | 0                  | 0               | 9,7 px       |
| 320 px (228 px) | **0 / 580**   | 0                  | 0               | 7,2 px       |

Phép thử: `PHÉP THỬ HÌNH THẬT: 602 đạt · 0 hỏng` (**489 slide mang hình**),
`PHÉP THỬ BỘ VẼ HÌNH: 399 đạt · 0 hỏng`, cổng admin **31 PASS · 0 FAIL**.

**Quy mô nội dung đổi:** 2450 → **2455 slide** (tách slide để mỗi hình một slide).
Số bài/chương không đổi. ⚠️ Nhắc lại: đổi số slide phải đổi **`MONG_DOI` +
chuỗi "khớp số đã đo" trong `migrate-content.mjs` + 3 câu trong `test-admin-portal.mjs`**

- dòng "Quy mô nội dung hiện tại" ở `docs/admin_portal_test_cases.md` + 2 chỗ trong
  `curriculum_audit.md` + `content_reload_steps.md` + `100-tang-phien-ban-sau-bo-sung.sql`.

### 9.9 Hình khối phải ghi ĐÚNG CHỮ mà công thức dùng — a, b, c (2026-09-22, lần 7)

**Bạn chốt:** _"hãy ghi đúng chữ lên cạnh khối"_ — tiếp ngay sau vòng ghi tên điểm A, B, C, D.

**Vấn đề.** Lớp 5 dạy công thức **bằng chữ**: `Sxq = (a + b) × 2 × c`, `V = a × b × c`,
`V = a × a × a`, trong khi hình khối chỉ ghi **số** ("dài 4, rộng 3, cao 2"). Trẻ phải tự
đoán xem chữ `a` trong công thức ứng với cạnh nào trên hình — cùng một họ lỗi với việc hình
tứ giác không ghi tên đỉnh.

**Cách chữa.** `Solid` thêm `sideLetters` — ghi chữ lên **ba cạnh nhìn thấy** theo đúng cách
sách giáo khoa:

| Chữ | Cạnh                | Vị trí              |
| --- | ------------------- | ------------------- |
| `a` | cạnh DÀI dưới cùng  | dưới cạnh đáy trước |
| `b` | cạnh RỘNG (nghiêng) | dưới–phải, cạnh sâu |
| `c` | cạnh CAO            | cạnh đứng bên trái  |

**Khối lập phương** ghi `a` ở **hai cạnh đứng** (trái và phải) để thấy mọi cạnh đều bằng `a` —
đúng ý `V = a × a × a`. **Cố ý KHÔNG ghi ở cạnh đáy**: chỗ đó đã có câu "Sáu mặt đều là hình
vuông" ở `y = 240`, ghi thêm là **hai dòng chữ chồng nhau** (đã đo, phép đo bắt được).

**5 slide được gắn chữ** (đều là slide có công thức hoặc điểm kiến thức dùng a, b, c):
Lớp 5 `g5-c3-l6` (visual), `g5-c3-l7` (visual), `g5-c3-l8` (visual), `g5-c3-l12` (concept),
`g5-c5-l4` (concept).

**Hai luật soát mới, kèm CANARY** (`scratch/soat-hinh-sai.mjs` + `scratch/canary-soat-h.mjs`):

- **H. công thức dùng chữ a, b, c mà hình khối không ghi chữ**: **4 chỗ → 0 chỗ**.
- 🔴 **Vì sao phải có canary:** một luật soát bằng regex rất dễ **XANH GIẢ** — regex không
  bao giờ khớp thì báo 0 chỗ, trông y như "đã sạch". Canary kiểm **HAI VẾ**:
  (1) bắt được 5/5 mẫu thật (`Sxq = (a + b) × 2 × c`, `V = a × b × c`, `V = a × a × a`,
  "chiều dài a, chiều rộng b, chiều cao c", "Hình lập phương (cạnh a)") **và**
  (2) **KHÔNG** bắt nhầm 5 câu không liên quan ("Hai đáy là hình tròn bằng nhau", "6 mặt ·
  8 đỉnh · 12 cạnh", "Sáu mặt đều là hình vuông"…). Chạy: `node scratch/canary-soat-h.mjs`
  (exit ≠ 0 nếu hỏng).

**Đo lại:** 580 ca — 0 kéo ngang, 0 tràn khung, 0 cặp chữ đè nhau ở cả 375/360/320 px.
`PHÉP THỬ HÌNH THẬT: 602 đạt · 0 hỏng`. Số slide **KHÔNG đổi** (2455) ⇒ không phải sửa cổng.
