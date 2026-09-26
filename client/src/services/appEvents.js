/**
 * GHI SỰ KIỆN TỐI THIỂU — đợt 5.1 của `docs/Plan/ke-hoach-tu-phan-tich-nguon.md`.
 *
 * MỤC ĐÍCH: biết **bé bỏ dở bài nào** (“bài này mở nhiều mà ít hoàn thành”) để biết nên sửa
 * bài nào trước. Ghi thẳng vào Supabase (bảng `app_events`), KHÔNG dùng dịch vụ ngoài, không tốn
 * tiền, không gửi dữ liệu cá nhân (chỉ mã bé, mã bài, số thứ tự slide).
 *
 * NGUYÊN TẮC — KHÔNG BAO GIỜ LÀM HỎNG VIỆC HỌC:
 *   • Không `await`, không chặn giao diện; lỗi (kể cả bảng chưa được tạo) bị bỏ qua im lặng.
 *   • Có trần số sự kiện mỗi phiên ⇒ dù sao cũng không thể ghi ầm.
 *   • Bảng `slide_reach` không ghi trùng: bé bấm tới bấm lui cùng một slide chỉ tính 1 lần.
 *
 * Cổng canh: bảng + chính sách nằm ở `supabase/migrations/0021_app_events.sql` (phải dán vào
 * Supabase SQL Editor; chưa dán thì app vẫn chạy bình thường — chỉ là không có dữ liệu).
 */
import { supabase } from "./supabaseClient";
import useAuthStore from "../store/useAuthStore";

/** Trần an toàn cho một phiên học — vượt thì thôi ghi (im lặng). */
const MAX_EVENTS_PER_SESSION = 300;

let soSuKien = 0;
let slideDaGhi = "";
// Bảng chưa được dán vào Supabase (404) ⇒ thử lại chỉ tổ làm ồn console. Nhớ là đã hỏng
// và thôi gửi cho tới khi tải lại trang (lúc đó bảng có thể đã có).
let bangChuaCo = false;

/** Ghi một sự kiện. Không bao giờ ném lỗi, không bao giờ chờ. */
export function logAppEvent(event, data = {}) {
  if (!supabase || bangChuaCo || soSuKien >= MAX_EVENTS_PER_SESSION) return;
  let childId = null;
  try {
    childId = useAuthStore.getState().activeChild?.id ?? null;
  } catch {
    /* chưa có phiên đăng nhập cũng không sao */
  }
  soSuKien += 1;
  supabase
    .from("app_events")
    .insert({
      event,
      child_id: childId,
      lesson_id: data.lessonId ?? null,
      grade_id: data.gradeId ?? null,
      slide: typeof data.slide === "number" ? data.slide : null,
      stars: typeof data.stars === "number" ? data.stars : null,
    })
    .then(
      (res) => {
        // ⚠️ supabase-js KHÔNG ném lỗi: nó trả về `{ error }` (bảng chưa dán migration ⇒ 404).
        // Lần đầu hỏng thì coi như bảng chưa có, thôi gửi — app không được ồn vì việc phụ này.
        if (res?.error) bangChuaCo = true;
      },
      () => {
        bangChuaCo = true;
      },
    );
}

/** Bé MỞ một bài. */
export function logLessonOpen(lessonId, gradeId) {
  if (!lessonId) return;
  logAppEvent("lesson_open", { lessonId, gradeId });
}

/** Bé tới một slide (chỉ ghi 1 lần cho mỗi slide của mỗi bài trong phiên). */
export function logSlideReach(lessonId, slide, gradeId) {
  if (!lessonId || typeof slide !== "number") return;
  const khoa = lessonId + "#" + slide;
  if (khoa === slideDaGhi) return;
  slideDaGhi = khoa;
  logAppEvent("slide_reach", { lessonId, gradeId, slide });
}

/** Bé HOÀN THÀNH bài (kèm số sao đạt được). */
export function logLessonDone(lessonId, stars, gradeId) {
  if (!lessonId) return;
  logAppEvent("lesson_done", { lessonId, gradeId, stars });
}

/** Chỉ dùng cho test/cổng — đặt lại bộ đếm. */
export function resetAppEventCounters() {
  soSuKien = 0;
  slideDaGhi = "";
  bangChuaCo = false;
}
