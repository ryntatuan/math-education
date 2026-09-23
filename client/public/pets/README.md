# Thả ảnh thú cưng vào đây

Thư mục này để bạn **vẽ lại mặt thú cưng bằng công cụ của bạn** (Illustrator, Figma,
Affinity, Procreate, AI tạo ảnh...). App sẽ **tự dùng ảnh của bạn** — không cần sửa code.

## Cách làm

1. Vẽ 4 con thú cưng, mỗi con **5 cảm xúc** (tổng 20 ảnh — làm dần cũng được).
2. Đặt tên file **đúng y như bảng dưới** (chữ thường, dấu gạch nối).
3. Bỏ file vào thư mục này: `client/public/pets/`
4. Tải lại app là thấy ngay. Chưa có ảnh thì app vẫn hiện hình cũ (mặt vẽ tạm bằng code),
   nên **không bao giờ trống hay vỡ giao diện**.

## Tên file

Đuôi file dùng `.svg` (khuyến khích — nét sắc ở mọi kích thước, file nhẹ)
hoặc `.png` (cũng được). Ví dụ `owl-great.svg` hoặc `owl-great.png`.

| Thú                | great (100%)   | good (80-99%) | normal (50-79%) | low (20-49%) | danger (0-19%)  |
| ------------------ | -------------- | ------------- | --------------- | ------------ | --------------- |
| Cú Con Trí Tuệ     | `owl-great`    | `owl-good`    | `owl-normal`    | `owl-low`    | `owl-danger`    |
| Mèo Mướp Siêu Nhẩm | `cat-great`    | `cat-good`    | `cat-normal`    | `cat-low`    | `cat-danger`    |
| Corgi Thông Thái   | `corgi-great`  | `corgi-good`  | `corgi-normal`  | `corgi-low`  | `corgi-danger`  |
| Rồng Nhỏ May Mắn   | `dragon-great` | `dragon-good` | `dragon-normal` | `dragon-low` | `dragon-danger` |

## Yêu cầu kỹ thuật

- **Ảnh vuông** (tỉ lệ 1:1). Kích thước gợi ý **512x512** (nhỏ nhất 256x256).
- **Nền trong suốt** (không nền trắng/vuông) — vì ảnh được đặt trong lòng tròn màu vàng.
- Vẽ **cận cảnh khuôn mặt** cho dễ nhìn: con thú chỉ hiển thị trong vòng tròn khoảng
  62px đường kính. Đừng vẽ cả người to vì sẽ rất nhỏ.
- Nên để chừa lề khoảng **5-8%** mỗi cạnh, đừng để phần đầu chạm mép ảnh.

## Cảm xúc nào hiện khi nào

Nét mặt lấy theo **mức THẤP HƠN trong hai chỉ số** (độ no và độ vui):

| Giá trị thấp hơn     | Tên file | Cảm xúc nên vẽ                                           |
| -------------------- | -------- | -------------------------------------------------------- |
| 100 (cả hai đều 100) | `great`  | Hạnh phúc nhất: miệng cười thật tươi, mắt sáng lấp lánh  |
| 80-99                | `good`   | Vui vẻ: miệng cười, mắt cong                             |
| 50-79                | `normal` | Bình thường, trung tính                                  |
| 20-49                | `low`    | Buồn: mắt xuôi, miệng mếu, có thể thêm giọt nước mắt lăn |
| 0-19                 | `danger` | Rất buồn: mếu đậm hơn, mắt ướt, có thể run nhẹ           |

Ví dụ: bé cho thú ăn no 100% nhưng chưa chơi nên độ vui còn 30% thì app hiện mặt `low`
(chứ không phải `great`), vì con thú đang chán.

## Ghi chú

- Ảnh bạn thả vào **ghi đè** hình vẽ tạm bằng code. Muốn quay lại hình tạm thì xoá file đi.
- Hình vẽ tạm nằm ở `client/src/components/pet/PetAvatar.jsx` (SVG nội tuyến) — nếu bạn
  muốn tôi đổi nét, sửa màu, hay làm thêm cảm xúc khác thì nói trong khung chat.

## 20 file đã có sẵn trong thư mục này

Hiện tại 20 file `<thú>-<cảm xúc>.svg` **đang là hình mẫu do code vẽ** (bản nháp xấu).
Bạn chỉ cần mở đúng file đó ra vẽ lại và lưu — **không phải đổi tên, không phải copy đi đâu**,
app tự dùng luôn. Mỗi file đã chia sẵn các nhóm để bạn dễ tìm:

| Nhóm trong file  | Nội dung                 |
| ---------------- | ------------------------ |
| `<g id="tai">`   | tai / sừng / chùm lông   |
| `<g id="dau">`   | đầu + vùng mặt sáng màu  |
| `<g id="mat">`   | mắt và lông mày          |
| `<g id="mui">`   | mũi (riêng Cú là cái mỏ) |
| `<g id="mieng">` | miệng                    |

Hình mẫu vẽ trong hệ toạ độ `120x120` rồi phóng to thành `512x512` bằng `transform="scale(...)"`.
Bạn cứ xoá cả nhóm `mascot` rồi vẽ thẳng trong hệ `512x512` cũng được — miễn là khung
`viewBox="0 0 512 512"` giữ nguyên.

**File canh lề:** `_huong-dan-canh-le.svg` — chỉ để mở kèm lúc vẽ (có vòng nét đứt vùng an toàn
và vòng cam nhỏ cho biết kích thước thật khi hiện trong game). Tên bắt đầu bằng `_` nên app
**không bao giờ** nạp file này. Đừng copy các đường hướng dẫn đó vào 20 file thú, vì chúng
sẽ hiện luôn trong game.

**Đừng chạy lại** `scratch/generate-pet-templates.mjs` sau khi bạn đã vẽ, vì nó sẽ ghi đè
20 file bằng hình mẫu cũ.

## App tự căn giữa và phóng to ảnh của bạn

Bộ ảnh hiện tại được vẽ **không đều nhau**: con Cú chỉ chiếm 55% khung còn con Mèo chiếm 88%,
và tất cả đều bị đẩy lên trên (tâm cao hơn giữa khung 17–46 đơn vị) — nên nếu hiển thị thẳng thì
con Cú sẽ nhỏ hơn con Mèo và mặt bị lệch lên.

App tự bù bằng `ART_BOX` trong `client/src/components/pet/PetAvatar.jsx`:

| Thú      | Khung vẽ thật (x, y, rộng, cao) | Hệ số phóng |
| -------- | ------------------------------- | ----------- |
| `owl`    | 116, 93, 280, 293               | 1.365       |
| `cat`    | 30, 69, 452, 301                | 1.329       |
| `corgi`  | 104, 69, 305, 301               | 1.329       |
| `dragon` | 93, 50, 326, 320                | 1.25        |

Bốn con được đưa về **cùng chiều cao** (400/512 khung) và **tâm về giữa**.

⚠️ Căn theo **chiều cao**, KHÔNG theo cạnh dài nhất: bốn con cùng cỡ ĐẦU (cao 293–320) nhưng
con Mèo **rộng hơn hẳn** (452, do râu + má) còn con Cú chỉ 280. Nếu lấy cạnh dài nhất làm chuẩn
thì Mèo bị thu nhỏ (0.885 lần) còn Cú bị phóng to (1.365 lần) ⇒ trong khung vuông Mèo trông nhỏ
hơn hẳn các con khác. Đổi sang chiều cao thì cả bốn con đều ~69px như nhau;
**râu Mèo thò ra ngoài khung nên bị cắt ~7px mỗi bên** khi hiện trong app (gần như không thấy).
✅ **Đã chốt (2026-09-23): cứ để cắt râu** — ưu tiên bốn con đều nhau. Không cần vẽ râu ngắn lại
cũng không cần đổi quy tắc. Nếu sau này muốn Mèo hiện đủ râu thì nới `viewBox` của file Mèo
sang ngang (ví dụ `viewBox="-45 0 602 512"`) rồi báo tôi đo lại `ART_BOX`.

⚠️ Nếu bạn vẽ lại mà **khung vẽ khác đi** (to/nhỏ hơn, lệch sang bên khác) thì báo tôi để
đo lại bốn dòng số này — app dùng chúng để bù, số cũ sẽ làm con thú nhỏ đi hoặc lệch.
