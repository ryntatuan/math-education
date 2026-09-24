/**
 * Hiển thị “hình của câu hỏi” ở mọi màn hình luyện tập (Luyện tập · Cuộc đua · Bắn bóng).
 *
 * Ba dạng giá trị đều phải chạy được ở đây:
 *   1. CHUỖI — emoji để bé đếm (“🍎 🍎 🍎”).
 *   2. CÂY JSX — hình do `renderShapeVisual` vẽ ra (Lớp 2–5).
 *   3. MÔ TẢ GỌN — `{ kind: "spatialScene", mode, params }` (Lớp 1, Chủ đề 4).
 *
 * 🔴 VÌ SAO CÓ DẠNG THỨ 3. `useProgressStore` PERSIST cả `mistakesQueue`: cây JSX khi bị
 * `JSON.stringify` thành object thường rồi đưa lại vào React sẽ ném
 * “Objects are not valid as a React child” sau khi tải lại trang. Mô tả gọn thì sống sót
 * qua vòng ghi/đọc đó. Đây là lý do BẮT BUỘC phải có hàm này, không phải tối ưu tuỳ chọn.
 *
 * ⚠️ Cây JSX bị persist từ TRƯỚC (dữ liệu cũ trong máy các bé) chỉ còn là object thường,
 * nên hàm này dựng lại luôn chứ không chỉ xử lý mô tả gọn.
 */
import { createElement } from "react";
import { SpatialScene } from "../visuals/GeometryVisuals";

export function reviveQuestionVisual(v) {
  if (Array.isArray(v)) return v.map(reviveQuestionVisual);
  if (!v || typeof v !== "object") return v;
  if (v.kind === "spatialScene")
    return <SpatialScene mode={v.mode} {...(v.params || {})} />;
  // Cây JSX đã bị JSON.stringify thành `{ type, props }` — dựng lại thành phần tử thật.
  if (v.type !== undefined && v.props)
    return createElement(v.type, {
      ...v.props,
      children: reviveQuestionVisual(v.props.children),
    });
  return v;
}

export default reviveQuestionVisual;
