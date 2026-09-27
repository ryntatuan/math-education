/**
 * BỎ CHỮ ĐÃ ĐƯỢC HÌNH NÓI LẠI — luật hiển thị cho slide "Quan sát" (`visual`).
 *
 * VÌ SAO CÓ FILE NÀY (đo được trên dữ liệu 5 lớp, 2026-09-27): **95 slide** vừa có `text`
 * vừa có BẢNG, mà `text` chính là bản chữ của đúng dữ liệu trong bảng. Ví dụ thật:
 *   • `g1-c2-l8` slide 3 — `text` = "▪ hình vuông · ⬕ hình tròn 🔺 hình tam giác · ▭ hình chữ nhật"
 *     rồi bên dưới là một BẢNG kê đúng bốn hình đó.
 *   • `g1-c6-l9` slide 3 — `text` là cả lưới số 1…20 viết bằng chữ, bên dưới là bảng số y hệt.
 * Gốc của họ lỗi này: các lần "bổ sung hình minh hoạ" thêm bảng vào slide ĐÃ có bản chữ, nhưng
 * không xoá bản chữ cũ. Trẻ đọc một thông tin hai lần, và dòng `text` viết bằng chữ thường
 * dồn thành hàng dài, không thẳng cột như bảng — nhìn như lỗi.
 *
 * LUẬT:
 *   1. Dòng nào có ≥ `MIN_DUP_WORDS` từ mà HÌNH trên cùng slide đã chứa trọn ⇒ bỏ dòng đó.
 *   2. Nếu DÒNG ĐẦU (tiêu đề) cũng là bản sao: lấy NHÃN của hình (`label`) làm tiêu đề và
 *      KHÔNG vẽ nhãn đó dưới hình nữa — tiêu đề vẫn có, mà không nói hai lần.
 *      Hình không có nhãn thì đành giữ dòng đầu (thà lặp còn hơn slide mất tiêu đề).
 *
 * ⚠️ Đây là luật HIỂN THỊ, dữ liệu không bị sửa ⇒ cả 5 lớp đồng bộ ngay sau khi deploy web /
 * build APK; không phải sinh lại seed, không phải dán SQL.
 */
import { HINH_KEYS } from "../../components/visuals/visualKeys.js";
import { contentWords, coversAll } from "../../utils/textCompare.js";

/** Khoá hình do `CalcFigures` vẽ (không nằm trong `HINH_KEYS`). */
const CALC_KEYS = ["number", "operation", "comparison", "clock"];

/** Dưới 4 từ thì phép so vô nghĩa (dòng ngắn trùng nhau là chuyện bình thường). */
export const MIN_DUP_WORDS = 4;

const FIGURE_KEYS = [...HINH_KEYS, ...CALC_KEYS];

/** Mọi chuỗi nằm trong một khối hình, gom thành một câu để so từ. */
function collectStrings(value, out) {
  if (typeof value === "string" || typeof value === "number") {
    out.push(String(value));
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, out);
  }
}

/** Toàn bộ chữ mà các HÌNH trên slide đang nói. */
export function figureTextOf(content) {
  const parts = [];
  for (const key of FIGURE_KEYS) {
    if (content?.[key] === undefined) continue;
    collectStrings(content[key], parts);
  }
  if (content?.items !== undefined) collectStrings(content.items, parts);
  return parts.join(" · ");
}

/** Nhãn (chú thích) của hình ĐẦU TIÊN có nhãn — dùng làm tiêu đề khi tiêu đề cũ là bản sao. */
export function figureCaptionOf(content) {
  for (const key of FIGURE_KEYS) {
    const value = content?.[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value.label === "string" &&
      value.label.trim()
    ) {
      return value.label.trim();
    }
  }
  return "";
}

/** Bản sao `content` đã bỏ nhãn của hình (khi nhãn được nâng lên làm tiêu đề). */
export function withoutFigureLabel(content) {
  const out = { ...content };
  for (const key of FIGURE_KEYS) {
    const value = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value.label === "string" &&
      value.label.trim()
    ) {
      out[key] = { ...value, label: "" };
    }
  }
  return out;
}

/**
 * Quyết định hiển thị cho `text` của slide "Quan sát".
 * Trả về `{ title, steps, hideCaption }`:
 *   • `title`  — dòng tiêu đề (rỗng nghĩa là không có tiêu đề).
 *   • `steps`  — các dòng còn lại (lời giải từng bước), đã bỏ dòng trùng hình.
 *   • `hideCaption` — `true` khi phải bỏ nhãn dưới hình (vì nhãn đã thành tiêu đề).
 */
export function planVisualText(content) {
  const lines = String(content?.text ?? "").split("\n");
  const figureText = figureTextOf(content);
  const isDuplicate = (line) =>
    contentWords(line).size >= MIN_DUP_WORDS && coversAll(figureText, line);

  const firstIsDuplicate = lines.length > 0 && isDuplicate(lines[0]);
  const kept = lines.filter((line) => !isDuplicate(line));

  if (!firstIsDuplicate) {
    return { title: lines[0] ?? "", steps: kept.slice(1), hideCaption: false };
  }

  const caption = figureCaptionOf(content);
  if (caption) return { title: caption, steps: kept, hideCaption: true };
  // Không có nhãn để thay: giữ dòng đầu làm tiêu đề (thà lặp còn hơn mất tiêu đề).
  return { title: lines[0] ?? "", steps: kept, hideCaption: false };
}

/**
 * Quyết định hiển thị cho slide KHÁI NIỆM (`concept`) — MỘT nguồn luật cho HAI nơi:
 *   • `ConceptSlide` vẽ ô nhấn mạnh ⭐ và câu giải thích;
 *   • `LessonPage` đọc bài tự động (`autoSpeakLesson`).
 *
 * 🔴 VÌ SAO PHẢI DÙNG CHUNG (lỗi thật, phát hiện 2026-09-28): `LessonPage` tự dựng lại chuỗi để
 * đọc nên nó **vẫn đọc ô ⭐ đã bị ẩn** và câu giải thích đã bị ẩn ⇒ trên màn hình không có chữ
 * mà loa vẫn đọc, bé nghe đúng một thông tin hai lần. Hai nơi cùng quyết định thì phải cùng một hàm.
 *
 * Luật: bỏ khối NGẮN khi khối DÀI đã chứa trọn nội dung của nó (`coversAll`). Chiều ngược lại
 * KHÓA — bỏ khối dài vì khối ngắn nằm trong nó là MẤT thông tin. Dữ liệu không bị sửa.
 */
export function planConceptText(content) {
  const pointsText = Array.isArray(content?.points)
    ? content.points.join(" · ")
    : "";
  const stepsText = Array.isArray(content?.steps)
    ? content.steps.map((s) => `${s.title ?? ""} ${s.desc ?? ""}`).join(" · ")
    : "";
  const ruleText = String(content?.rule ?? "");
  const explanationText = String(content?.explanation ?? "");
  const ruleLap = Boolean(
    ruleText &&
    ((pointsText && coversAll(pointsText, ruleText)) ||
      (stepsText && coversAll(stepsText, ruleText))),
  );
  return {
    ruleText,
    explanationText,
    showRule: Boolean(ruleText) && !ruleLap,
    showExplanation:
      Boolean(explanationText) &&
      !(ruleText && coversAll(ruleText, explanationText)),
  };
}
