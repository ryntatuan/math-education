/**
 * Khoá ngày theo GIỜ MÁY của bé, dạng `YYYY-MM-DD`.
 *
 * VÌ SAO KHÔNG DÙNG `toISOString()`: nó trả về ngày theo UTC. Ở UTC+7, từ 00:00
 * đến 06:59 giờ máy vẫn là "hôm qua" theo UTC, nên streak không tăng khi bé học
 * 23h rồi 6h30 sáng hôm sau, và nhiệm vụ ngày reset lúc 7h sáng thay vì 0h.
 *
 * Mọi nơi cần so sánh "hôm nay" (streak, nhiệm vụ ngày, sổ tay lỗi sai, quà
 * hằng ngày) phải dùng hàm này để hai bên so sánh luôn cùng một hệ quy chiếu.
 */
const pad2 = (n) => String(n).padStart(2, "0");

export function localDateKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** Khoá ngày cách `from` đúng `days` ngày (âm để lùi), theo giờ máy. */
export function localDateInDays(days = 1, from = new Date()) {
  const d = from instanceof Date ? new Date(from) : new Date(from);
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + days);
  return localDateKey(d);
}
