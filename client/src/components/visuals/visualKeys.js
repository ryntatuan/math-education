/**
 * DANH SÁCH KHOÁ HÌNH + hàm đếm — tách khỏi `VisualBlock.jsx` để:
 *
 *  1. **Fast Refresh chạy được.** Vite/React chỉ "fast refresh" một file nếu MỌI export
 *     của nó đều là component. `VisualBlock.jsx` vừa export component (mặc định) vừa
 *     export `HINH_KEYS`/`demHinh`, nên Vite báo:
 *     `Could not Fast Refresh ("HINH_KEYS" export is incompatible)`
 *     và mỗi lần sửa file đó phải tải lại cả trang. Tách hàm/hằng ra `.js` thuần thì
 *     file component chỉ còn component.
 *
 *  2. **Công cụ đo (chạy bằng Node) đọc được mà không cần tới JSX.** Các script trong
 *     `scratch/` chỉ cần danh sách khoá, không cần kéo theo React.
 */

export const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
export const has = (v) =>
  v !== undefined && v !== null && v !== false && v !== "";

/**
 * Danh sách khoá hình — NGUỒN SỰ THẬT DUY NHẤT.
 *
 * 🔴 Vì sao phải là một nguồn duy nhất: danh sách này từng bị **chép làm hai** (một bản
 * trong `VisualBlocks`, một bản trong `demHinh`). Hai bản chép tay thì sớm muộn lệch nhau,
 * và khi lệch thì `demHinh` đếm một đằng mà màn hình vẽ một nẻo — công cụ đo báo "slide
 * này có hình" trong khi bé không thấy gì.
 *
 * Thứ tự dưới đây là **thứ tự hiển thị**: số → đo lường → hình học → phân số/sơ đồ → biểu đồ.
 */
export const HINH_KEYS = [
  // Số học
  "baseTen",
  "tenFrame",
  "numberLine",
  "placeValue",
  // Đo lường
  "ruler",
  "money",
  "table",
  // Hình học
  "planeShape",
  "angle",
  "circleParts",
  "solid",
  // Phân số & sơ đồ
  "fractionBar",
  "fractionCircle",
  "barModel",
  "motionDiagram",
  // Biểu đồ
  "barChart",
  "pieChart",
];

/** Đếm số hình một slide sẽ vẽ — dùng cho công cụ đo, không dùng trong giao diện. */
export function demHinh(content) {
  if (!isObj(content)) return 0;
  return HINH_KEYS.filter((k) => has(content[k])).length;
}
