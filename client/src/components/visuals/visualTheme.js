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
};

export const CAPTION_STYLE = {
  display: "block",
  textAlign: "center",
  marginTop: 8,
  fontSize: 14,
  fontWeight: 700,
  color: "#64748b",
};
