/**
 * Phép thử RENDER bộ vẽ hình — chạy trong Node, không cần trình duyệt.
 *
 * 🔴 VÌ SAO CẦN. `vite build` chỉ chứng minh mã BIÊN DỊCH được, không chứng minh hình VẼ RA.
 * Một component có thể build xanh mà vẫn trắng khung (ví dụ chia cho 0, hoặc `map` trên
 * `undefined`). Bài học cũ của repo: `ShapeGraphic` im lặng không vẽ gì khi gặp giá trị lạ.
 *
 * Cách thử: render mỗi bộ vẽ thành chuỗi HTML bằng `renderToStaticMarkup`, rồi khẳng định
 *   (1) không ném lỗi,
 *   (2) có thẻ `<svg`,
 *   (3) đầu ra đủ dài (không phải khung rỗng),
 * với BA bộ dữ liệu: mặc định (không truyền gì), dữ liệu thật, và dữ liệu "độc hại"
 * (chuỗi thay vì số, số âm, mảng rỗng, giá trị cực lớn).
 *
 * CÁCH CHẠY (từ thư mục gốc repo):
 *   node client/node_modules/esbuild/bin/esbuild.js scratch/test-visuals-entry.jsx \
 *     --bundle --platform=node --format=esm --outfile=scratch/visual-bundle.mjs --loader:.jsx=jsx
 *   node scratch/visual-bundle.mjs
 */
import { renderToStaticMarkup } from "react-dom/server";
import {
  NumberLine,
  TenFrame,
  BaseTenBlocks,
  PlaceValueTable,
  Ruler,
  Money,
  Table,
} from "../client/src/components/visuals/CoreVisuals";
import {
  PlaneShape,
  Angle,
  CircleParts,
  Solid,
} from "../client/src/components/visuals/GeometryVisuals";
import {
  FractionBar,
  FractionCircle,
  BarModel,
  MotionDiagram,
  BarChart,
  PieChart,
} from "../client/src/components/visuals/FractionVisuals";
import VisualBlocks from "../client/src/components/visuals/VisualBlock";
import { demHinh } from "../client/src/components/visuals/visualKeys";

const CASES = [
  [
    "NumberLine",
    NumberLine,
    {
      from: 0,
      to: 10,
      step: 1,
      marks: [3, 7],
      hops: [{ from: 3, to: 7, label: "+4" }],
      label: "3 + 4 = 7",
    },
  ],
  [
    "TenFrame",
    TenFrame,
    { filled: 7, total: 10, emoji: "🔴", extra: 3, label: "7 + 3 = 10" },
  ],
  ["BaseTenBlocks", BaseTenBlocks, { tens: 3, ones: 4, label: "34" }],
  [
    "PlaceValueTable",
    PlaceValueTable,
    { headers: ["Trăm", "Chục", "Đơn vị"], digits: [3, 4, 5], highlight: 1 },
  ],
  ["Ruler", Ruler, { lengthCm: 10, measure: { from: 0, to: 6 }, unit: "cm" }],
  ["Money", Money, { notes: [20000, 5000, 2000] }],
  [
    "Table",
    Table,
    {
      headers: ["Đối tượng", "Số lượng"],
      rows: [
        ["Bóng đá", 12],
        ["Cầu lông", 8],
      ],
    },
  ],
  [
    "PlaneShape",
    PlaneShape,
    {
      kind: "parallelogram",
      labels: ["8 cm", "5 cm"],
      formula: "S = 8 × 5 = 40 cm²",
    },
  ],
  ["Angle", Angle, { kind: "obtuse", degrees: 125 }],
  ["CircleParts", CircleParts, { radius: 4, diameter: 8 }],
  ["Solid", Solid, { kind: "cylinder" }],
  ["FractionBar", FractionBar, { parts: 4, shaded: 3, label: "3/4" }],
  ["FractionCircle", FractionCircle, { parts: 4, shaded: 1, label: "1/4" }],
  [
    "BarModel",
    BarModel,
    {
      rows: [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 6 },
      ],
      braceLabel: "Tổng: 96",
    },
  ],
  [
    "MotionDiagram",
    MotionDiagram,
    {
      mode: "toward",
      distance: 60,
      unit: "km",
      a: { name: "Ô tô", speed: 40 },
      b: { name: "Xe máy", speed: 20 },
    },
  ],
  [
    "BarChart",
    BarChart,
    {
      title: "Số bạn thích mỗi môn",
      items: [
        { label: "Toán", value: 12 },
        { label: "Vẽ", value: 8 },
      ],
      unit: " bạn",
    },
  ],
  [
    "PieChart",
    PieChart,
    {
      title: "Tỉ lệ",
      items: [
        { label: "Toán", percent: 25 },
        { label: "Khác", percent: 75 },
      ],
    },
  ],
];

// Dữ liệu "độc hại": sai kiểu, âm, rỗng, cực lớn. Mục đích: KHÔNG được ném lỗi và
// KHÔNG được trả về khung trắng.
const HOSTILE = [
  {},
  { from: "abc", to: null, step: -5, marks: [], hops: [] },
  { filled: -99, total: 0, extra: 999, emoji: 123 },
  { tens: -5, ones: 999 },
  { headers: [], digits: [] },
  { lengthCm: 0, measure: { from: 99, to: -3 } },
  { notes: [] },
  { headers: null, rows: null },
  { kind: "khong_ton_tai", labels: "khong-phai-mang" },
  { kind: null, degrees: -40 },
  { radius: "x", diameter: 0 },
  { kind: "???" },
  { parts: 0, shaded: -1 },
  { parts: 999, shaded: 50 },
  { rows: [], braceLabel: 0 },
  { mode: "???", distance: null, a: null, b: undefined },
  { mode: "toward", a: null, b: null, distance: "abc", note: null },
  { kind: "cuboid", dims: null },
  { kind: "cube", dims: { a: "x", b: -3, c: null } },
  { items: [], title: null },
  { items: [{ label: null, percent: -50 }] },
];

let pass = 0;
const failures = [];

for (const [name, Comp, props] of CASES) {
  for (const [tag, p] of [
    ["mặc định", {}],
    ["dữ liệu thật", props],
    ...HOSTILE.map((h, i) => [`độc hại #${i + 1}`, h]),
  ]) {
    try {
      const html = renderToStaticMarkup(Comp(p));
      const hasSvg = html.includes("<svg");
      const hasText = html.replace(/<[^>]*>/g, "").trim().length > 0;
      if (!html || (!hasSvg && !hasText))
        failures.push(`${name} [${tag}]: đầu ra RỖNG`);
      else if (html.length < 60)
        failures.push(`${name} [${tag}]: quá ngắn (${html.length})`);
      else pass++;
    } catch (e) {
      failures.push(`${name} [${tag}]: NÉM LỖI — ${e.message}`);
    }
  }
}

// Bộ điều phối: phải trả `null` khi không có khoá hình nào (không vẽ khung rỗng),
// và phải vẽ được nhiều hình cùng lúc.
try {
  const none = renderToStaticMarkup(
    VisualBlocks({ content: { text: "chỉ có chữ" } }),
  );
  if (none !== "")
    failures.push(
      `VisualBlocks: nội dung không có hình mà vẫn trả về "${none.slice(0, 40)}"`,
    );
  else pass++;

  const many = renderToStaticMarkup(
    VisualBlocks({
      content: {
        numberLine: { from: 0, to: 20 },
        fractionBar: { parts: 4, shaded: 3 },
        barChart: { items: [{ label: "A", value: 3 }] },
      },
    }),
  );
  const svgCount = (many.match(/<svg/g) || []).length;
  if (svgCount < 3)
    failures.push(`VisualBlocks: chờ 3 hình, chỉ thấy ${svgCount}`);
  else pass++;

  if (demHinh({ numberLine: {}, money: {} }) !== 2)
    failures.push("demHinh: đếm sai");
  else pass++;

  // Bộ điều phối KHÔNG được vỡ khi content là null/undefined/không phải object.
  for (const bad of [null, undefined, 42, "chuỗi", []]) {
    const out = renderToStaticMarkup(VisualBlocks({ content: bad }));
    if (out !== "")
      failures.push(
        `VisualBlocks: content=${JSON.stringify(bad)} mà trả về nội dung`,
      );
    else pass++;
  }
} catch (e) {
  failures.push(`VisualBlocks: NÉM LỖI — ${e.message}`);
}

console.log(
  "══════════════════════════════════════════════════════════════════════",
);
console.log(`  PHÉP THỬ BỘ VẼ HÌNH: ${pass} đạt · ${failures.length} hỏng`);
console.log(
  "══════════════════════════════════════════════════════════════════════",
);
if (failures.length) {
  console.log("\nDANH SÁCH HỎNG:");
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log(
  "\nMọi bộ vẽ đều ra hình với cả dữ liệu thật lẫn dữ liệu sai kiểu.",
);
