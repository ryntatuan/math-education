/**
 * ĐÁP ÁN LÀ CHỮ hay là SỐ/KÝ HIỆU — dùng để chọn CÁCH CĂN LỀ cho ô đáp án.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng báo bằng ảnh, 2026-09-28):
 *   *"câu trả lời căn giữa quá xấu và không phù hợp"* — ảnh là câu hỏi có 4 phương án là
 *   CÂU CHỮ ("Đọc gợi ý của Rô-bốt rồi thử lại", "Bỏ luôn bài học"…), mỗi câu canh giữa ô
 *   nên ba dòng chữ so le nhau, mắt trẻ phải dò lại đầu mỗi dòng.
 *
 * LUẬT (theo VAI TRÒ của nội dung, KHÔNG theo độ dài ký tự — cùng lý do đã chốt ở
 * `pages/LessonPage.css` mục "LUẬT CĂN LỀ": một ngưỡng ký tự cho ra hai kiểu căn khác nhau
 * trên máy tính và trên điện thoại):
 *   • ĐÁP ÁN CÓ CHỮ (câu, tên hàng, "Cả A và B đều đúng", "3 nghìn, 5 trăm…")
 *       ⇒ căn TRÁI. Mọi phương án bắt đầu ở cùng một mốc ⇒ so sánh theo chiều dọc được.
 *   • ĐÁP ÁN CHỈ CÓ SỐ / KÝ HIỆU ("24", "0,5", "75%", ">", "<", "=")
 *       ⇒ GIỮ căn GIỮA. Đây là GIÁ TRỊ đối xứng, canh trái trong ô to sẽ lệch và xấu hơn.
 *
 * Hàm THUẦN, không phụ thuộc React ⇒ đo được bằng Node và test được bằng unit test.
 */

/** Có chữ cái (kể cả tiếng Việt có dấu) ⇒ là đáp án dạng CHỮ. */
const CO_CHU_CAI = /[A-Za-zÀ-ỹ]/;

/**
 * `true` khi đáp án là CHỮ (đọc như câu/từ) ⇒ ô đáp án phải CĂN TRÁI.
 * `false` khi chỉ có số / ký hiệu / đơn vị thuần ký hiệu ⇒ giữ căn giữa.
 *
 * Lưu ý: emoji KHÔNG tính là chữ ("Đúng rồi 👍" vẫn là chữ vì có "Đúng").
 */
export function isTextAnswer(option) {
  return CO_CHU_CAI.test(String(option ?? ""));
}

/** Tên lớp CSS thêm vào ô đáp án khi cần căn trái — MỘT nguồn cho mọi màn hình. */
export const TEXT_ANSWER_CLASS = "is-text-answer";
