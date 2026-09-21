/**
 * Luật "chế độ Khách có được ghi xuống máy hay không".
 *
 * 🔴 CỐ Ý LÀ FILE THUẦN: không `import`, không `import.meta.env`. Nhờ vậy cổng `S-31` nạp
 * được file này bằng Node và thử **hành vi thật**, thay vì grep chuỗi — grep sẽ vẫn xanh
 * kể cả khi hàm trả `undefined`. Cùng bài học với `admin/src/lib/henGio.js` (cổng `S-19`):
 * muốn test được thật thì phải tách phần quyết định ra khỏi phần đọc môi trường.
 *
 * @param {{ guestMode: boolean, supabaseConfigured: boolean }} input
 * @returns {boolean} có được phép ghi xuống máy không
 */
export function shouldPersist({ guestMode, supabaseConfigured }) {
  // Đã đăng nhập: ghi như thường.
  if (!guestMode) return true;

  // ⚠️ Chưa cấu hình Supabase thì CẢ APP luôn ở chế độ Khách và `localStorage` là chỗ lưu
  // DUY NHẤT. Áp luật "khách không ghi" vào ca này là xoá sạch tiến độ của bé sau mỗi lần
  // mở lại app. Đây là ca dễ chết nhất và cũng dễ quên nhất.
  return !supabaseConfigured;
}
