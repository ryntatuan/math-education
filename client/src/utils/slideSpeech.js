/**
 * ĐỌC GÌ KHI VÀO SLIDE — hàm THUẦN, một nguồn luật cho phần đọc tự động.
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (lỗi thật, 2026-09-28): `LessonPage.jsx` tự dựng chuỗi để đọc, tách rời
 * khỏi phần VẼ, nên hai bên lệch nhau:
 *   • ô nhấn mạnh ⭐ và câu giải thích đã bị ẨN trên màn hình nhưng loa VẪN đọc ⇒ bé nghe đúng
 *     một thông tin hai lần;
 *   • slide "Quan sát": dòng `text` đã bị bỏ vì HÌNH nói lại nhưng loa vẫn đọc
 *     (115 ca trong dữ liệu 5 lớp), và đọc dồn tiêu đề + lời giải thành một câu.
 * Cách chữa: dồn quyết định vào ĐÂY, lấy luật từ `slideDedupe.js` — nơi phần vẽ cũng lấy luật.
 *
 * ⚠️ Luật bất di bất dịch: **màn hình hiện chữ nào thì loa đọc chữ đó** (và ngược lại).
 *    Sửa phần vẽ mà quên phần đọc là bé nghe được cả chữ không có trên màn hình.
 */
import {
  planConceptText,
  planVisualText,
} from "../pages/lesson/slideDedupe.js";

/** Chữ sẽ được đọc cho một slide. Trả về `""` khi slide không có gì để đọc. */
export function planSlideSpeech(slide) {
  if (!slide) return "";
  const c = slide.content ?? {};

  if (slide.type === "quiz") return c.question || "";
  if (slide.type === "story") return c.text || "";

  if (slide.type === "visual") {
    // Dòng nào bị bỏ vì hình nói lại thì KHÔNG đọc (xem `planVisualText`).
    const { title, steps } = planVisualText(c);
    return [title, ...steps].filter(Boolean).join(". ");
  }

  if (slide.type === "concept") {
    // Ô ⭐ / câu giải thích đã bị ẩn thì KHÔNG đọc (cùng luật với `ConceptSlide`).
    const { ruleText, explanationText, showRule, showExplanation } =
      planConceptText(c);
    const parts = [c.title];
    if (showExplanation) parts.push(explanationText);
    if (showRule) parts.push(ruleText);
    if (c.points) parts.push(c.points.join(". "));
    if (c.example) {
      const ex = c.example;
      const exText =
        ex.text ||
        `${ex.question ? ex.question + ". " : ""}${ex.explanation || ""}`;
      parts.push(`Ví dụ: ${exText}`);
    }
    return parts.filter(Boolean).join(". ");
  }

  if (slide.type === "summary") {
    return `${c.title || ""}. ${c.points ? c.points.join(". ") : ""}`;
  }

  // Slide tương tác (đặt tính · bảng điền …): không đọc — bé tự bấm mới học được.
  return "";
}
