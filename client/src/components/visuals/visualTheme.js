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
  padding: "14px 16px",
  margin: "14px auto",
  width: "100%",
  maxWidth: 680,
  boxSizing: "border-box",
  boxShadow: "0 2px 10px rgba(15,23,42,.06)",
  // Hình rộng hơn ngưỡng cho phép thì CUỘN NGANG trong thẻ, không co chữ xuống nữa.
  overflowX: "auto",
};

/**
 * Tỉ lệ thu nhỏ NHỎ NHẤT của một khối hình (so với bề rộng viewBox).
 *
 * 🔴 VÌ SAO CẦN. `<svg width="100%">` co theo thẻ cha, mà chữ trong hình dùng đơn vị
 * viewBox (13–15). Trên điện thoại thẻ chỉ còn ~300 px, hình rộng 560–792 đơn vị bị co
 * ~0,4 lần ⇒ chữ 14 đơn vị chỉ còn **5,3 px — không đọc được**. Đo thật ở màn hình
 * 375 px: bảng số liệu 5,3 px · biểu đồ cột 6,4 px · thước 6,7 px · trục số 8 px.
 * App này phát hành chủ yếu qua APK (điện thoại) nên đây là lỗi nặng, không phải chuyện nhỏ.
 *
 * 0,85 chọn sao cho chữ 12–15 đơn vị (cỡ nhỏ nhất đang dùng, ở biểu đồ cột) còn
 * ≥ ~10 px trên màn hình. Hẹp hơn nữa thì hình giữ nguyên bề rộng tối thiểu và
 * **người đọc kéo ngang** (xem `overflowX` ở trên) — vì không có cách nào vừa nhét
 * một bảng 10 cột vào 300 px vừa đọc được chữ.
 */
export const MIN_SCALE = 0.85;

/**
 * Props chuẩn cho thẻ `<svg>` của mọi khối hình: giãn hết bề rộng thẻ, nhưng không
 * nhỏ hơn `viewBox × MIN_SCALE` — và **không bao giờ đòi rộng hơn bề rộng thẻ trên
 * máy tính**.
 *
 * 🔴 VÌ SAO PHẢI CHẶN TRÊN. Ngưỡng `MIN_SCALE` một mình sẽ gây lỗi ngược: hình rộng
 * 792 đơn vị × 0,85 = 673 px, mà thẻ trên máy tính chỉ cho 644 px ⇒ tự nhiên mọc thanh
 * cuộn ngang trên desktop, đúng chỗ trước đó vẫn hiển thị tốt (chữ 11,4 px, đọc thoải mái).
 * Chặn ở 644 px thì: màn hình lớn KHÔNG đổi gì, màn hình hẹp vẫn được nới tới 644 px
 * trước khi phải cuộn.
 *
 * ⚠️ Phải dùng CHUNG một hàm: bề rộng tối thiểu tính từ chính `viewBox` của từng hình,
 * nên nếu mỗi nơi tự viết một số thì sớm muộn cũng lệch nhau (đúng kiểu lỗi `card` ba bản
 * đã gây ra trước đây).
 */
const CARD_CONTENT_MAX = CARD_STYLE.maxWidth - 16 * 2 - 2 * 2; // 680 − padding − viền = 644

export function svgFit(vbW, them = {}) {
  const minWidth = Math.min(Math.round(vbW * MIN_SCALE), CARD_CONTENT_MAX);
  return {
    width: "100%",
    style: { minWidth, ...them },
  };
}

export const CAPTION_STYLE = {
  display: "block",
  textAlign: "center",
  marginTop: 8,
  fontSize: 14,
  fontWeight: 700,
  color: "#64748b",
};
