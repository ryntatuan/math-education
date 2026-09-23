import { createPortal } from "react-dom";

/**
 * Lớp nền mờ + khung modal của thú cưng — LUÔN render thẳng vào <body>.
 *
 * 🔴 VÌ SAO PHẢI PORTAL (đo được, không phải phỏng đoán):
 * Thú cưng nằm trong cột phải `.companion-sticky-column` (`position: sticky`).
 * `position: sticky` tạo ra một STACKING CONTEXT. Nằm trong đó, `z-index: 9999`
 * của lớp nền chỉ có giá trị BÊN TRONG cột phải — nên thanh menu trái
 * (`z-index: 100`) và header (`z-index: 90`) vẫn VẼ ĐÈ LÊN lớp nền.
 *
 * Đo thật trên trang chủ (viewport 1440x900): lớp nền phủ đúng 0,0 → 1440x900
 * nhưng `document.elementFromPoint(130, 300)` trả về `SPAN.sidebar-item-label`
 * — tức sidebar nằm TRÊN lớp nền. Hệ quả nhìn thấy: nền mờ chỉ phủ vùng nội
 * dung, còn sidebar + header vẫn sáng; modal thì canh giữa CẢ CỬA SỔ nên trông
 * lệch trái so với vùng bị làm mờ (vùng đó bắt đầu từ x = 260px của sidebar).
 *
 * Cùng phép đo đó với overlay gắn vào <body> cho kết quả ngược lại: mọi điểm
 * đều trả về overlay ⇒ nền mờ phủ kín màn hình và modal nằm đúng giữa.
 */
export default function PetModalOverlay({
  className = "pet-adopt-overlay",
  onClick,
  children,
}) {
  return createPortal(
    <div className={className} onClick={onClick}>
      {children}
    </div>,
    document.body,
  );
}
