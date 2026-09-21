/**
 * ĐIỀU PHỐI HÌNH — một chỗ duy nhất quyết định vẽ hình nào cho một slide.
 *
 * VÌ SAO CÓ FILE NÀY thay vì rải `{content.x && <X/>}` khắp `LessonPage.jsx`:
 *  • Slide có thể cần NHIỀU hình cùng lúc (ví dụ vừa băng giấy phân số vừa sơ đồ đoạn thẳng).
 *    Rải rác thì thứ tự vẽ phụ thuộc vị trí chèn, rất dễ lệch.
 *  • Thêm một loại hình mới = sửa ĐÚNG một file này.
 *  • `LessonPage.jsx` đang là file lớn và nhạy cảm; càng ít chỗ chạm càng ít rủi ro.
 *
 * ⚠️ KHÔNG xoá hay thay các khối hình cũ (`ClockGraphic`, `ShapeGraphic`, `items`,
 * `operation`, `comparison`, `activityGrid`, `gallery`, `dialogue`). Chúng vẫn được
 * `LessonPage.jsx` vẽ như trước. File này chỉ THÊM.
 *
 * Thứ tự dưới đây là thứ tự hiển thị, chọn theo mạch bài học: số → đo lường → hình học →
 * phân số/sơ đồ → biểu đồ.
 */
import {
  NumberLine,
  TenFrame,
  BaseTenBlocks,
  PlaceValueTable,
  Ruler,
  Money,
  Table,
} from "./CoreVisuals";
import { PlaneShape, Angle, CircleParts, Solid } from "./GeometryVisuals";
import {
  FractionBar,
  FractionCircle,
  BarModel,
  MotionDiagram,
  BarChart,
  PieChart,
} from "./FractionVisuals";
// Danh sách khoá + hàm đếm nằm ở file `.js` riêng — xem ghi chú đầu `visualKeys.js`
// (file này chỉ được export COMPONENT thì Fast Refresh mới chạy).
import { isObj } from "./visualKeys";

export default function VisualBlocks({ content }) {
  if (!isObj(content)) return null;

  const blocks = [];

  // ── Số học ──────────────────────────────────────────────────────────────
  if (isObj(content.baseTen))
    blocks.push(<BaseTenBlocks key="baseTen" {...content.baseTen} />);
  if (isObj(content.tenFrame))
    blocks.push(<TenFrame key="tenFrame" {...content.tenFrame} />);
  if (isObj(content.numberLine))
    blocks.push(<NumberLine key="numberLine" {...content.numberLine} />);
  if (isObj(content.placeValue))
    blocks.push(<PlaceValueTable key="placeValue" {...content.placeValue} />);

  // ── Đo lường ────────────────────────────────────────────────────────────
  if (isObj(content.ruler))
    blocks.push(<Ruler key="ruler" {...content.ruler} />);
  if (isObj(content.money))
    blocks.push(<Money key="money" {...content.money} />);
  if (isObj(content.table))
    blocks.push(<Table key="table" {...content.table} />);

  // ── Hình học ────────────────────────────────────────────────────────────
  if (isObj(content.planeShape))
    blocks.push(<PlaneShape key="planeShape" {...content.planeShape} />);
  if (isObj(content.angle))
    blocks.push(<Angle key="angle" {...content.angle} />);
  if (isObj(content.circleParts))
    blocks.push(<CircleParts key="circleParts" {...content.circleParts} />);
  if (isObj(content.solid))
    blocks.push(<Solid key="solid" {...content.solid} />);

  // ── Phân số & sơ đồ ─────────────────────────────────────────────────────
  if (isObj(content.fractionBar))
    blocks.push(<FractionBar key="fractionBar" {...content.fractionBar} />);
  if (isObj(content.fractionCircle))
    blocks.push(
      <FractionCircle key="fractionCircle" {...content.fractionCircle} />,
    );
  if (isObj(content.barModel))
    blocks.push(<BarModel key="barModel" {...content.barModel} />);
  if (isObj(content.motionDiagram))
    blocks.push(
      <MotionDiagram key="motionDiagram" {...content.motionDiagram} />,
    );

  // ── Biểu đồ ─────────────────────────────────────────────────────────────
  if (isObj(content.barChart))
    blocks.push(<BarChart key="barChart" {...content.barChart} />);
  if (isObj(content.pieChart))
    blocks.push(<PieChart key="pieChart" {...content.pieChart} />);

  if (!blocks.length) return null;
  // 🔴 PHẢI KHAI `width: 100%` Ở ĐÂY. Khối này được đặt trong `.slide-visual-card`, mà
  // thẻ đó là `display: flex; align-items: center`. Một flex item KHÔNG tự giãn bề rộng
  // khi `align-items` là `center` — nó co lại bằng nội dung. Đã ĐO được thật: khối hình
  // chỉ rộng **361 px** trong khi thẻ rộng **833 px**, nên hình bị bó hẹp một góc và bảng
  // số liệu bị chồng chữ. Thêm `width: 100%` là khối giãn đúng bằng thẻ.
  return (
    <div
      className="visual-blocks"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 14,
      }}
    >
      {blocks}
    </div>
  );
}
