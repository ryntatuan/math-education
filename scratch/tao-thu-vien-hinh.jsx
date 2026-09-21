/**
 * Sinh một trang HTML chứa ĐỦ 17 loại hình, để nhìn bằng mắt và đo khoảng cách.
 *
 * 🔴 VÌ SAO CẦN: phép thử `renderToStaticMarkup` chỉ trả lời "có vẽ ra gì không", KHÔNG
 * trả lời được "các ô có dính vào nhau không". Lỗi dính/khe hở chỉ thấy được khi NHÌN.
 * Trang này dùng CHÍNH kiểu dáng của app (`CARD_STYLE`) và cùng bề rộng thẻ
 * (`.slide-visual-card` ≈ 833px ở màn hình lớn) nên khoảng cách nhìn thấy ở đây
 * đúng như khoảng cách trong app.
 *
 * CÁCH DÙNG:
 *   node scratch/tao-thu-vien-hinh.cjs            -> ghi scratch/thu-vien-hinh.html
 *   mở file đó bằng trình duyệt
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { CARD_STYLE } from "../client/src/components/visuals/visualTheme.js";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

import {
  NumberLine,
  TenFrame,
  BaseTenBlocks,
  PlaceValueTable,
  Ruler,
  Money,
  Table,
} from "../client/src/components/visuals/CoreVisuals.jsx";
import {
  PlaneShape,
  Angle,
  CircleParts,
  Solid,
} from "../client/src/components/visuals/GeometryVisuals.jsx";
import {
  FractionBar,
  FractionCircle,
  BarModel,
  MotionDiagram,
  BarChart,
  PieChart,
} from "../client/src/components/visuals/FractionVisuals.jsx";

const COMP = {
  baseTen: BaseTenBlocks,
  tenFrame: TenFrame,
  numberLine: NumberLine,
  placeValue: PlaceValueTable,
  ruler: Ruler,
  money: Money,
  table: Table,
  planeShape: PlaneShape,
  angle: Angle,
  circleParts: CircleParts,
  solid: Solid,
  fractionBar: FractionBar,
  fractionCircle: FractionCircle,
  barModel: BarModel,
  motionDiagram: MotionDiagram,
  barChart: BarChart,
  pieChart: PieChart,
};

// Mỗi loại: các ca ĐẶC BIỆT (giá trị lớn nhất / dài nhất / nhiều phần tử nhất) —
// đó là chỗ dễ dính nhất. Kèm 1 ca nhỏ để đối chiếu.
const CA = {
  baseTen: [
    { tens: 4, ones: 7 },
    { tens: 9, ones: 9 },
    { tens: 0, ones: 5 },
    { tens: 3, ones: 0 },
  ],
  tenFrame: [
    { filled: 3, total: 5, emoji: "🍎" },
    { filled: 10, total: 10, emoji: "🍒" },
    { filled: 6, total: 10, emoji: "🖐️", extra: 4 },
    { filled: 0, total: 10, emoji: "🍽️" },
    // Hai ca THẬT trong dữ liệu Lớp 2, trước đây bị kẹp nên vẽ thiếu:
    //   g2-c7-l1: 9 + 4 = 9 + 1 + 3  (khung đầy 10, còn 3 ở ngoài)
    { filled: 9, total: 10, emoji: "🔵", extra: 3, label: "9 + 1 = 10, rồi 10 + 3 = 13" },
    //   g2-c8-l6: 10 + 4 = 14
    { filled: 10, total: 10, emoji: "🟠", extra: 4, label: "10 + 4 = 14" },
  ],
  numberLine: [
    { from: 0, to: 10, step: 1, marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    {
      from: 10,
      to: 100,
      step: 10,
      marks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      from: 0,
      to: 10,
      step: 1,
      marks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hops: [
        { from: 0, to: 10, label: "đếm xuôi" },
        { from: 10, to: 0, label: "đếm ngược" },
      ],
    },
    { from: 2, to: 20, step: 2, marks: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
  ],
  placeValue: [
    { headers: ["Chục", "Đơn vị"], digits: [4, 7] },
    { headers: ["Trăm", "Chục", "Đơn vị"], digits: [3, 4, 5] },
    { headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"], digits: [2, 4, 7, 5] },
    {
      headers: ["Trăm nghìn", "Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
      digits: [4, 3, 2, 5, 1, 6],
    },
  ],
  ruler: [
    { lengthCm: 10, measure: { from: 0, to: 10 } },
    { lengthCm: 30, measure: { from: 0, to: 30 } },
    { lengthCm: 5, measure: { from: 0, to: 5 } },
    // Ba ca THẬT vừa thêm cho câu hỏi lời văn (Lớp 1–2): không đo, đoạn 0→6, đoạn 0→9.
    { lengthCm: 10, label: "Vạch 0 nằm ở đầu trái của thước" },
    { lengthCm: 10, measure: { from: 0, to: 6 }, label: "Đoạn thẳng dài 6 cm" },
    { lengthCm: 10, measure: { from: 0, to: 9 }, label: "Đọc số ở đầu kia: 9 cm" },
  ],
  money: [
    { notes: [1000, 2000, 5000] },
    { notes: [1000, 5000, 10000, 50000, 100000] },
    { notes: [20000, 5000] },
  ],
  table: [
    {
      headers: ["Phép tính", "Kết quả"],
      rows: [
        ["2 + 5", "7"],
        ["5 + 2", "7"],
      ],
    },
    {
      headers: ["Trường hợp", "Công thức thời gian"],
      rows: [
        ["Ngược chiều", "khoảng cách ban đầu : (v1 + v2)"],
        ["Cùng chiều (đuổi kịp)", "khoảng cách ban đầu : (v1 − v2)"],
      ],
    },
    {
      headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      rows: [
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      ],
    },
  ],
  planeShape: [
    { kind: "square", labels: ["cạnh"] },
    { kind: "rectangle", labels: ["chiều dài", "chiều rộng"] },
    { kind: "triangle", labels: ["cạnh"] },
    { kind: "parallelogram", labels: ["đáy a", "chiều cao h"] },
    { kind: "rhombus", labels: ["chéo m", "chéo n"] },
    { kind: "trapezoid", labels: ["đáy lớn a", "đáy bé b", "chiều cao h"] },
    { kind: "circle", labels: ["bán kính"] },
  ],
  angle: [
    { kind: "acute", degrees: 45 },
    { kind: "right", degrees: 90 },
    { kind: "obtuse", degrees: 120 },
  ],
  circleParts: [
    { radius: 3, diameter: 6, showCenter: true, showCircumference: true },
    { radius: 5, showCenter: true },
  ],
  solid: [
    { kind: "cube", dims: { a: 3 } },
    { kind: "cuboid", dims: { a: 4, b: 3, c: 2 } },
    { kind: "cylinder", dims: { a: 2, b: 5 } },
    { kind: "sphere", dims: { a: 3 } },
  ],
  fractionBar: [
    { parts: 4, shaded: 3 },
    { parts: 12, shaded: 11 },
    {
      rows: [
        { parts: 2, shaded: 1, label: "1/2" },
        { parts: 4, shaded: 2, label: "2/4" },
        { parts: 6, shaded: 3, label: "3/6" },
      ],
    },
    { parts: 100, shaded: 75 },
  ],
  fractionCircle: [
    { parts: 4, shaded: 1 },
    { parts: 8, shaded: 3 },
    { parts: 3, shaded: 2 },
  ],
  barModel: [
    {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 3 },
      ],
      braceLabel: "Tổng 35",
    },
    {
      rows: [
        { label: "Số bé", parts: 1 },
        { label: "Số lớn", parts: 4 },
      ],
      braceLabel: "Hiệu 24",
    },
    // Hai ca THẬT của câu hỏi "băng giấy": đơn vị là cm, một hàng 20 phần (mức tối đa).
    {
      rows: [
        { label: "Băng xanh", parts: 20 },
        { label: "Băng đỏ", parts: 17 },
      ],
      unit: "cm",
      note: "Băng xanh dài hơn: 20 − 17 = 3 cm",
    },
    {
      rows: [
        { label: "Băng đỏ", parts: 4 },
        { label: "Băng xanh", parts: 12 },
      ],
      unit: "cm",
      note: "Băng xanh gấp 3 lần: 4 × 3 = 12 cm",
    },
  ],
  motionDiagram: [
    {
      mode: "toward",
      distance: 150,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Ô tô", speed: 60 },
      note: "Ngược chiều: gặp nhau sau 150 : (45 + 60) giờ",
    },
    {
      mode: "chase",
      distance: 36,
      unit: "km",
      a: { name: "Xe máy", speed: 45 },
      b: { name: "Xe đạp", speed: 15 },
    },
    {
      mode: "apart",
      distance: 20,
      unit: "km",
      a: { name: "A", speed: 5 },
      b: { name: "B", speed: 7 },
    },
  ],
  barChart: [
    {
      title: "Số cây trồng được",
      items: [
        { label: "Lớp 4A", value: 15 },
        { label: "Lớp 4B", value: 12 },
        { label: "Lớp 4C", value: 18 },
      ],
      unit: "cây",
      highlight: 2,
    },
    {
      title: "Nhiều cột",
      items: [
        { label: "Một", value: 1 },
        { label: "Hai", value: 4 },
        { label: "Ba", value: 9 },
        { label: "Bốn", value: 3 },
        { label: "Năm", value: 7 },
        { label: "Sáu", value: 5 },
      ],
      unit: "bạn",
    },
  ],
  pieChart: [
    {
      title: "Kết quả học tập",
      items: [
        { label: "Xuất sắc", percent: 50 },
        { label: "Tốt", percent: 30 },
        { label: "Hoàn thành", percent: 20 },
      ],
    },
    {
      title: "Hai phần",
      items: [
        { label: "Nữ", percent: 60 },
        { label: "Nam", percent: 40 },
      ],
    },
  ],
};

const phan = [];
for (const key of HINH_KEYS) {
  const C = COMP[key];
  if (!C) {
    phan.push(
      `<section><h2 style="color:#b91c1c">THIẾU COMPONENT: ${key}</h2></section>`,
    );
    continue;
  }
  const khoi = (CA[key] ?? []).map((du, i) => {
    let html = "";
    try {
      html = renderToStaticMarkup(<C {...du} />);
    } catch (e) {
      html = `<pre style="color:#b91c1c">LỖI: ${e.message}</pre>`;
    }
    return `<div class="ca" data-key="${key}" data-i="${i}">
      <div class="nhan">${key} #${i + 1}</div>
      ${html}
      <pre class="du">${JSON.stringify(du)}</pre>
    </div>`;
  });
  phan.push(`<section id="sec-${key}">
    <h2>${key}</h2>
    ${khoi.join("\n")}
  </section>`);
}

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Thư viện hình — 17 loại</title>
<style>
  body { margin:0; background:#eef2f7; font-family: system-ui, sans-serif; }
  /* Bề rộng này mô phỏng đúng thẻ nội dung trong app ở màn hình lớn (đo được 833px). */
  .khung { max-width: 833px; margin: 0 auto; padding: 12px; }
  section { margin-bottom: 34px; }
  h2 { font: 800 20px/1.3 system-ui; color:#0f172a; border-bottom:3px solid #94a3b8; padding-bottom:6px; margin:26px 0 10px; }
  .ca { margin-bottom: 6px; }
  .nhan { font: 700 12px/1.4 ui-monospace, monospace; color:#64748b; margin: 10px 0 0 4px; }
  .du { font: 11px/1.4 ui-monospace, monospace; color:#94a3b8; margin:2px 4px 0; white-space:pre-wrap; }
  /* 🔴 PHẢI GIỐNG APP. Trong app, khối hình nằm trong '.visual-blocks' là flex CỘT với
     align-items: stretch ⇒ thẻ giãn hết bề rộng rồi bị maxWidth 680 chặn ⇒ SVG rộng
     644px. Nếu ở đây dùng flex HÀNG + margin auto thì thẻ CO LẠI vừa nội dung và mọi
     phép đo đều sai — thước hỏng chứ không phải hình hỏng. */
  .the { display: block; }
</style></head>
<body>
<div class="khung">
  <h1 style="font:800 24px/1.3 system-ui">Thư viện hình — ${HINH_KEYS.length} loại</h1>
  <p style="color:#475569">Mỗi loại là các ca đặc biệt (giá trị lớn nhất / dài nhất / nhiều phần tử nhất). Kiểu dáng và bề rộng thẻ giống app.</p>
  ${phan.map((p) => `<div class="the">${p}</div>`).join("\n")}
</div>
</body></html>`;

// ⚠️ KHÔNG dùng `import.meta.url` ở đây: file này bị gói thành CJS nên `import.meta.url`
// là `undefined` ⇒ `fileURLToPath` ném lỗi. Dùng thư mục làm việc hiện tại (chạy từ gốc repo).
const dest = path.resolve(process.cwd(), "scratch", "thu-vien-hinh.html");
fs.writeFileSync(dest, html, "utf8");
console.log(`Đã ghi ${dest}`);
console.log(
  `Số khối: ${HINH_KEYS.reduce((a, k) => a + (CA[k]?.length ?? 0), 0)} · số loại: ${HINH_KEYS.length}`,
);
console.log(
  `Bề rộng thẻ mẫu (CARD_STYLE): maxWidth=${CARD_STYLE.maxWidth}, padding=${CARD_STYLE.padding}`,
);
