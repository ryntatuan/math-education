# Kế hoạch: bổ sung HÌNH ẢNH minh họa cho bài học

Ngày đo: 2026-09-22. Người đề xuất: Copilot. Trạng thái: **chờ bạn duyệt trước khi viết code.**

## 1. Hiện trạng — đo bằng số, không phải cảm nhận

Công cụ đo (mới viết): `node scratch/kiem-tra-hinh-anh.mjs`

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

| Hình         | Đo được trước khi chữa                                                                   | Cách chữa                                                        |
| ------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Trục số      | Nhịp (hop) vẽ **nửa đường tròn** bán kính bằng nửa dây cung: nhịp dài 508 đơn vị ⇒ đỉnh cung vươn tới **y = −161** trong khung cao 132 ⇒ bé chỉ thấy một mẩu cung bị cắt | Dùng **cung bậc hai nông**, chiều cao cố định 20 (nhịp thứ hai 30) |
| Sơ đồ đoạn thẳng | Nhãn "Tổng 35" / "Hiệu 24" vươn tới **663–666 đơn vị** trong khung 560 ⇒ **tràn 103 đơn vị** | Tính bề rộng cả **phần chữ ở cuối hàng** rồi mới chia thanh      |
| Hình góc     | Góc 120° có chấm đầu tia ở **x = −10 → 0** ⇒ mất một phần chấm (góc bẹt còn xa hơn)          | **Dời đỉnh góc** theo bề rộng thật của hình rồi canh giữa          |
| Hình khối    | Nhãn "Sáu mặt đều là hình vuông bằng nhau" ở tâm x = 130 ⇒ mép trái **vượt ra 8,9 đơn vị** | Canh giữa theo bề rộng khung (x = 170) và rút gọn câu             |

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

