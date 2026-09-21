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
import { NumberLine, TenFrame, BaseTenBlocks, PlaceValueTable, Ruler, Money, Table } from "./CoreVisuals";
import { PlaneShape, Angle, CircleParts, Solid } from "./GeometryVisuals";
import { FractionBar, FractionCircle, BarModel, MotionDiagram, BarChart, PieChart } from "./FractionVisuals";

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const has = (v) => v !== undefined && v !== null && v !== false && v !== "";

export default function VisualBlocks({ content }) {
  if (!isObj(content)) return null;

  const blocks = [];

  // ── Số học ──────────────────────────────────────────────────────────────
  if (isObj(content.baseTen)) blocks.push(<BaseTenBlocks key="baseTen" {...content.baseTen} />);
  if (isObj(content.tenFrame)) blocks.push(<TenFrame key="tenFrame" {...content.tenFrame} />);
  if (isObj(content.numberLine)) blocks.push(<NumberLine key="numberLine" {...content.numberLine} />);
  if (isObj(content.placeValue))
    blocks.push(<PlaceValueTable key="placeValue" {...content.placeValue} />);

  // ── Đo lường ────────────────────────────────────────────────────────────
  if (isObj(content.ruler)) blocks.push(<Ruler key="ruler" {...content.ruler} />);
  if (isObj(content.money)) blocks.push(<Money key="money" {...content.money} />);
  if (isObj(content.table)) blocks.push(<Table key="table" {...content.table} />);

  // ── Hình học ────────────────────────────────────────────────────────────
  if (isObj(content.planeShape)) blocks.push(<PlaneShape key="planeShape" {...content.planeShape} />);
  if (isObj(content.angle)) blocks.push(<Angle key="angle" {...content.angle} />);
  if (isObj(content.circleParts))
    blocks.push(<CircleParts key="circleParts" {...content.circleParts} />);
  if (isObj(content.solid)) blocks.push(<Solid key="solid" {...content.solid} />);

  // ── Phân số & sơ đồ ─────────────────────────────────────────────────────
  if (isObj(content.fractionBar))
    blocks.push(<FractionBar key="fractionBar" {...content.fractionBar} />);
  if (isObj(content.fractionCircle))
    blocks.push(<FractionCircle key="fractionCircle" {...content.fractionCircle} />);
  if (isObj(content.barModel)) blocks.push(<BarModel key="barModel" {...content.barModel} />);
  if (isObj(content.motionDiagram))
    blocks.push(<MotionDiagram key="motionDiagram" {...content.motionDiagram} />);

  // ── Biểu đồ ─────────────────────────────────────────────────────────────
  if (isObj(content.barChart)) blocks.push(<BarChart key="barChart" {...content.barChart} />);
  if (isObj(content.pieChart)) blocks.push(<PieChart key="pieChart" {...content.pieChart} />);

  if (!blocks.length) return null;
  return <div className="visual-blocks">{blocks}</div>;
}

/** Đếm số hình một slide sẽ vẽ — dùng cho công cụ đo, không dùng trong giao diện. */
export function demHinh(content) {
  if (!isObj(content)) return 0;
  const KEYS = [
    "baseTen",
    "tenFrame",
    "numberLine",
    "placeValue",
    "ruler",
    "money",
    "table",
    "planeShape",
    "angle",
    "circleParts",
    "solid",
    "fractionBar",
    "fractionCircle",
    "barModel",
    "motionDiagram",
    "barChart",
    "pieChart",
  ];
  return KEYS.filter((k) => has(content[k])).length;
}
