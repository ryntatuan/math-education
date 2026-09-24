/**
 * Kiểu dáng DÙNG CHUNG cho cả 3 file bộ vẽ.
 *
 * 🔴 VÌ SAO TÁCH RA. `card` từng bị chép làm **BA bản** (một bản trong `CoreVisuals`,
 * một trong `GeometryVisuals`, một trong `FractionVisuals`). Đã gây lỗi THẬT: khi sửa
 * bề rộng thẻ ở `CoreVisuals` để khối hình giãn hết chiều ngang, hai bản kia **vẫn giữ
 * giá trị cũ** — nên bảng số liệu giãn đúng còn sơ đồ chuyển động vẫn bị bó hẹp 361 px
 * trong thẻ rộng 833 px. Sửa một nơi mà không sửa hai nơi còn lại là kiểu lỗi im lặng
 * rất khó thấy. Nay chỉ còn MỘT bản.
 *
 * ⚠️ `width: "100%"` là CỐ Ý, không phải trang trí: khối hình nằm trong thẻ cha
 * `display: flex; align-items: center`, mà `margin: "14px auto"` lại làm flex item
 * co về vừa nội dung. Thiếu `width: 100%` là hình bị bó hẹp một góc.
 */
export const CARD_STYLE = {
  background: "#ffffff",
  border: "2px solid #e2e8f0",
  borderRadius: 18,
  // 12 (thay vì 16) hai bên: trên điện thoại mỗi đơn vị lề đều quý — xem `svgFit`.
  padding: "12px 12px",
  margin: "14px auto",
  width: "100%",
  maxWidth: 680,
  boxSizing: "border-box",
  boxShadow: "0 2px 10px rgba(15,23,42,.06)",
  // LƯỚI AN TOÀN, không phải cách hiển thị: mọi hình nay đã vừa thẻ (đo 555 ca thật,
  // xem `svgFit`), nên thanh cuộn này không bao giờ mọc. Giữ lại để nếu một ngày dữ liệu
  // sinh ra hình quá khổ thì thẻ vẫn cuộn được, chứ không tràn chữ ra ngoài khung.
  overflowX: "auto",
};

/**
 * 🔴 VÌ SAO BỎ HẲN NGƯỠNG "BỀ RỘNG TỐI THIỂU" (`minWidth`) — bản 1.0.34 trở về trước.
 *
 * Bản cũ đặt `minWidth = viewBox × 0,85` để chữ khỏi co xuống 5–6 px trên điện thoại.
 * Cách đó giữ được chữ TO nhưng **ĐẨY SVG RỘNG HƠN THẺ** ⇒ thẻ mọc thanh cuộn ngang.
 * Đo trên **555 ca hình THẬT** của cả 5 lớp: ở màn 375 px có **166 ca phải kéo ngang**
 * (ca nặng nhất rộng 948 đơn vị trong khi thẻ chỉ cho 283 px). Người dùng báo đúng:
 * "các hình vẽ đang bị phải scroll sang phải".
 *
 * NAY: SVG LUÔN VỪA THẺ (không còn `minWidth`). Muốn chữ vẫn đọc được thì
 * **BỀ RỘNG VIEWBOX phải hẹp lại** — đã làm cho từng hình, tính từ số đo thật:
 *
 *   Bề rộng DÙNG ĐƯỢC của một hình, đo trong app ở màn 375 px:
 *     375 − 20 (khung trang) − 8 (lề slide) − 28 (thẻ .slide-visual-card) − 36 (thẻ hình)
 *     = **283 px**  (máy 360 px: ≈ 268 px)
 *
 *   ⇒ chữ `fontU` đơn vị viewBox hiện ra `fontU × 283 / viewBoxW` px.
 *   ⇒ QUY TẮC ĐÃ ÁP CHO MỌI HÌNH: viewBox rộng ≤ `VUA_HINH` (380) và cỡ chữ ≥ 14 đơn vị
 *     ⇒ ở iPhone 375 px chữ 15 đơn vị ≈ **11,2 px**, máy 360 px ≈ 10,6 px.
 *
 * ⚠️ Sửa một hình thì PHẢI đo lại: `scratch/visual-fit.jsx` dựng trang chứa mọi ca hình
 * có thật trong dữ liệu 5 lớp (555 ca), rồi đo bằng trình duyệt — xem `docs/lesson_visuals_plan.md`.
 */
export const VUA_HINH = 380;

const CARD_CONTENT_MAX = CARD_STYLE.maxWidth - 12 * 2 - 2 * 2; // 680 − padding − viền = 652

/**
 * Trần phóng to khi SVG giãn hết thẻ (máy tính).
 *
 * 🔴 VÌ SAO CẦN TRẦN. Không có trần thì `<svg width="100%">` giãn tới 652 px, tức hình
 * 194 đơn vị bị vẽ to gấp **3,4 lần** (khung 5 ô trên máy tính có ô vuông 128 px). Đó là
 * hành vi cũ và nó khiến mọi hình trông "phóng đại" trên màn hình lớn.
 *
 * 1,6 chọn theo hai đầu:
 *   • ĐIỆN THOẠI KHÔNG BỊ ẢNH HƯỞNG: ở màn 375 px thẻ chỉ cho 283 px, mà 1,6 × 194 = 310
 *     ⇒ `width: 100%` (283) mới là giới hạn, trần không chen vào. Chỉ những hình rất hẹp
 *     (viewBox < 177) mới chạm trần trên điện thoại, và khi đó chúng vẫn vừa thẻ.
 *   • MÁY TÍNH: hình rộng 380 đơn vị (trục số, bảng, sơ đồ) nay hiện 608 px — gần đúng bề
 *     rộng 644 px như trước, nên bố cục trang bài học gần như không đổi.
 */
const PHONG_TO_DAI_NHAT = 1.6;

/**
 * Props chuẩn cho thẻ `<svg>` của mọi khối hình: giãn hết bề rộng thẻ, **không bao giờ
 * rộng hơn thẻ** (⇒ không bao giờ có thanh cuộn ngang), và không phóng to quá 1,25 lần.
 *
 * ⚠️ Phải dùng CHUNG một hàm: mỗi nơi tự viết một số thì sớm muộn cũng lệch nhau (đúng
 * kiểu lỗi `card` ba bản đã gây ra trước đây).
 */
export function svgFit(vbW, them = {}) {
  const maxWidth = Math.min(
    Math.round(vbW * PHONG_TO_DAI_NHAT),
    CARD_CONTENT_MAX,
  );
  return {
    width: "100%",
    // `margin: 0 auto` để hình nằm giữa thẻ khi đã chạm trần (thẻ là flex `align-items:
    // stretch` nên flex item chạm trần sẽ dồn về bên trái nếu thiếu dòng này).
    style: { display: "block", margin: "0 auto", maxWidth, ...them },
  };
}

/**
 * MÀU NHẤN CỦA HÌNH — **CÓ MỤC ĐÍCH**: lấy theo MÀU CHƯƠNG của bài học.
 *
 * 🔴 VÌ SAO. Bản trước tôi tự chọn tím (#7c3aed) cho mọi dải tiêu đề bảng và bong bóng
 * chú thích, **không có lý do hệ thống nào** ⇒ mọi hình giống hệt nhau (“tại sao tất cả
 * khung đều màu tím?” — người dùng hỏi 2026-09-24), và mất luôn sự phân biệt màu giữa các
 * loại hình. Nay `LessonPage` đặt `--figure-accent` = `chapter.color` (mỗi chương đã có màu
 * riêng từ trước, dùng ở trang Lớp/Trang chủ), nên hình của chương nào mang màu chương đó.
 *
 * PHÂN VAI MÀU (giữ đúng nghĩa, đừng đổi lẫn nhau):
 *   • `ACCENT*`  — màu CHƯƠNG: khung, dải tiêu đề, bong bóng chú thích.
 *   • `amber`    — phần ĐANG XÉT / ĐÁP ÁN (ô cần chú ý).
 *   • `green`    — ĐÚNG / hoàn thành.
 *   • `blue`     — trục số, điểm mốc, số liệu.
 * `ACCENT` phải dùng qua `style={{ fill: ACCENT }}` (khai báo CSS) — **không** dùng ở thuộc
 * tính `fill="var(--x)"`, vì SVG không giải mã `var()` trong thuộc tính.
 */
export const ACCENT = "var(--figure-accent, #6366f1)";
export const ACCENT_SOFT =
  "color-mix(in srgb, var(--figure-accent, #6366f1) 16%, #ffffff)";
export const ACCENT_TINT =
  "color-mix(in srgb, var(--figure-accent, #6366f1) 7%, #ffffff)";
export const ACCENT_LINE =
  "color-mix(in srgb, var(--figure-accent, #6366f1) 42%, #ffffff)";

/**
 * Chú thích dưới MỌI hình — bong bóng bo tròn tô nhạt màu chương, chữ nâu đậm.
 * (Chữ dùng màu `ink` cố định chứ không dùng màu chương: có chương màu rất nhạt như
 * `#ffd166` / `#c77dff`, chữ theo màu chương sẽ khó đọc.)
 */
export const CAPTION_STYLE = {
  display: "block",
  textAlign: "center",
  marginTop: 10,
  fontSize: 14.5,
  fontWeight: 700,
  lineHeight: 1.35,
  color: "#1e293b",
  background: ACCENT_SOFT,
  border: `1.5px solid ${ACCENT_LINE}`,
  borderRadius: 12,
  padding: "7px 10px",
};

/**
 * Chữ chú thích dưới hình — LUÔN chỉ MỘT câu.
 *
 * 🔴 Bản cũ ghép **câu bộ vẽ tự tính** với `label` do tác giả viết bằng ` · ` ⇒ trẻ đọc cùng
 * một ý hai lần trên một hàng, ví dụ: “1 chục và 4 đơn vị = 14 · 14 gồm 1 chục và 4 đơn vị”
 * (người dùng báo 2026-09-24). Nay: có `label` thì dùng `label` (tác giả viết, hợp ngữ cảnh),
 * không có `label` thì dùng câu tự tính. Bộ vẽ nào tự tính câu riêng thì truyền vào `auto`.
 */
export const captionText = (auto, label) =>
  label ? String(label) : String(auto ?? "");

/**
 * Ngắt một chuỗi thành nhiều dòng theo số ký tự cho phép.
 *
 * 🔴 VÌ SAO CẦN: SVG KHÔNG tự xuống dòng — thẻ `<text>` vẽ một dòng thẳng, chữ dài thì tràn
 * ra ngoài viewBox và bị cắt. Đã gặp thật: nhãn dấu ngoặc của sơ đồ đoạn thẳng
 * ("Cả hai tháng 59 990 cái áo · hơn kém 9 130", 42 ký tự ≈ 350 đơn vị) vẽ ngang bên phải
 * thanh nên đẩy chính các thanh sơ đồ co lại còn một mẩu.
 *
 * ⚠️ KHÁC `bocChu` trong `CoreVisuals.jsx`: hàm đó CẮT CỨNG từ dài hơn ô (dùng cho ô bảng
 * để chữ không đè sang cột bên); hàm này KHÔNG cắt giữa từ — dùng cho nhãn, thà cao thêm
 * dòng còn hơn cắt đôi chữ.
 */
export function ngatDong(chu, soKyTu) {
  const gioiHan = Math.max(4, soKyTu);
  const dong = [];
  let cur = "";
  for (const tu of String(chu ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")) {
    if (!tu) continue;
    const thu = cur ? `${cur} ${tu}` : tu;
    if (thu.length <= gioiHan) cur = thu;
    else {
      if (cur) dong.push(cur);
      cur = tu;
    }
  }
  if (cur) dong.push(cur);
  return dong.length ? dong : [""];
}
