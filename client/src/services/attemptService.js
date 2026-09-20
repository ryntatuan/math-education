import { supabase, isSupabaseConfigured } from "./supabaseClient";
import useAuthStore from "../store/useAuthStore";

/**
 * Ghi lại MỘT lượt trả lời câu hỏi — Giai đoạn 2b.
 *
 * Vì sao có file này: `child_progress` chỉ biết điểm theo từng BUỔI, không biết
 * độ chính xác của từng CÂU. Không có dữ liệu mức từng câu thì không trả lời
 * được "khuôn nào hỏng", "bé đoán bừa hay không hiểu", "kỹ năng nào yếu".
 * Xem `docs/phase_2b_plan.md`.
 *
 * Cố ý KHÔNG nằm trong `useProgressStore`: store dùng cho state cục bộ (localStorage),
 * còn đây là ghi cloud thuần, không đụng state nào. Trộn vào store chỉ làm store phình ra.
 *
 * Nguyên tắc: "bắn rồi quên". Lỗi ghi KHÔNG được làm hỏng việc học — chỉ cảnh báo
 * ra console. Cùng nguyên tắc với sổ cái Xu/XP và `syncMistakeToCloud()`.
 */

// Trần thời gian suy nghĩ. Bé bỏ máy đi chơi rồi quay lại thì `ms` là rác,
// ghi NULL còn hơn ghi một con số vô nghĩa làm hỏng phân tích câu hỏi B.
const MAX_MS = 300_000; // 5 phút

export async function recordAttempt({
  ref,
  source,
  topic = null,
  lessonId = null,
  grade = null,
  isCorrect,
  startedAt = null,
}) {
  try {
    // Khách không ghi — bảng này ghi rất nhiều, mở quyền ghi ẩn danh là mở
    // đường spam. Xem ghi chú đầu `0006_question_attempts.sql`.
    const childId = useAuthStore.getState().activeChild?.id;
    if (!childId) return;

    if (!isSupabaseConfigured() || !supabase) return;
    if (!ref) return;

    const raw = Number.isFinite(startedAt) ? Date.now() - startedAt : null;
    const ms = raw == null || raw < 0 || raw > MAX_MS ? null : Math.round(raw);

    const { error } = await supabase.from("question_attempts").insert({
      child_id: childId,
      question_ref: String(ref),
      source,
      topic,
      lesson_id: lessonId,
      grade,
      ms,
      is_correct: !!isCorrect,
    });

    // 🔴 KHÔNG thêm `.select()` vào câu trên. Đây đúng cái bẫy đã tốn thời gian ở
    // GĐ 2c: muốn trả về dòng vừa ghi thì PostgREST phải đọc lại, và bước đọc lại
    // bị policy SELECT chi phối → báo lỗi rất dễ chẩn đoán nhầm thành lỗi RLS.
    // Xem ghi chú ở mục 4 của `0005_support_tickets.sql`.

    if (error) console.warn("Không ghi được lượt trả lời:", error.message);
  } catch (e) {
    console.warn("Lỗi ghi lượt trả lời:", e?.message);
  }
}
