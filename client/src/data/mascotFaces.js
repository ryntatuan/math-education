/**
 * Từ vựng biểu cảm của linh vật — NGUỒN DUY NHẤT của cả app.
 *
 * 🔴 VÌ SAO CÓ FILE NÀY. Trước đây map này nằm trong `MascotBubble.jsx`, còn slide
 * "Kể chuyện" tự viết một chuỗi if/else riêng chỉ nhận 3 giá trị. Hệ quả ĐO ĐƯỢC:
 *   • `celebrate` hiện 😊 ở slide (93 slide thật đang dùng) — vì chuỗi if/else
 *     không biết giá trị đó, rơi vào mặt mặc định.
 *   • `thinking` hiện 🤔 ở slide nhưng 🧐 ở bong bóng — CÙNG một biểu cảm, HAI mặt
 *     khác nhau trong cùng một app.
 * Gộp về một map thì hai chỗ không thể lệch nữa, và thêm một biểu cảm mới là thêm
 * ĐÚNG một dòng ở ĐÚNG một chỗ.
 *
 * File này THUẦN (không import gì) nên cổng `S-26` nạp thẳng được vào Node để đối
 * chiếu với bảng biểu cảm của trang Tham khảo ở admin — xem `scripts/test-admin-portal.mjs`.
 *
 * ⚠️ Giá trị KHÔNG có trong map thì hiện `DEFAULT_FACE`. Dữ liệu thật chỉ dùng 5
 * giá trị (proud · happy · excited · celebrate · thinking), 4 giá trị còn lại là từ
 * vựng để sẵn cho nội dung viết sau.
 */
export const MASCOT_FACES = {
  happy: "😊",
  excited: "🤩",
  proud: "😎",
  curious: "🤔",
  encourage: "💪",
  celebrate: "🎉",
  sad: "😢",
  thinking: "🧐",
  hint: "💡",
};

/** Mặt dùng khi giá trị không có trong từ vựng — không báo lỗi, chỉ hiện mặt trung tính. */
export const DEFAULT_FACE = "😊";

/** Tra mặt theo biểu cảm. Không bao giờ trả `undefined` — luôn có mặt để hiện. */
export const faceOf = (mood) => MASCOT_FACES[mood] ?? DEFAULT_FACE;
