/**
 * Sinh trang đo "HÌNH THẬT": lấy MỌI ca hình có trong dữ liệu 5 lớp rồi vẽ ra một trang.
 *
 * 🔴 VÌ SAO CẦN, khi đã có `tao-thu-vien-hinh.jsx`.
 * Thư viện hình chỉ vẽ các ca TỰ NGHĨ (giá trị lớn nhất theo phỏng đoán). Bề rộng viewBox
 * của nhiều hình lại phụ thuộc DỮ LIỆU (bảng 3 cột hay 10 cột, sơ đồ 2 phần hay 20 phần,
 * thước 10 cm hay 30 cm). Muốn biết "trên điện thoại hình nào tràn ra ngoài thẻ" thì phải
 * đo trên chính các ca mà bé sẽ gặp — đó là file này.
 *
 * CÁCH DÙNG (từ gốc repo):
 *   1) gói:   esbuild scratch/visual-fit.jsx --bundle ... --outfile=scratch/visual-fit.cjs
 *   2) chạy:  node scratch/visual-fit.cjs        -> ghi scratch/visual-fit.html
 *   3) mở file đó, thu hẹp cửa sổ (hoặc đặt `.khung` về 375px) rồi đo.
 *
 * ⚠️ KHÔNG dùng `await` ở cấp cao nhất: file bị gói thành CJS nên top-level await không
 * chạy được. Dữ liệu được `import` TĨNH để esbuild gộp thẳng vào gói.
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

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
  ShapePicture,
  ShapeJoin,
  SpatialScene,
  PointLine,
} from "../client/src/components/visuals/GeometryVisuals.jsx";
import {
  FractionBar,
  FractionCircle,
  BarModel,
  MotionDiagram,
  BarChart,
  PieChart,
} from "../client/src/components/visuals/FractionVisuals.jsx";
import { NumberScene } from "../client/src/components/visuals/Grade1NumberVisuals.jsx";
import { InteractiveContext } from "../client/src/components/visuals/interactiveFill.jsx";
import { GroupScene } from "../client/src/components/visuals/GroupVisuals.jsx";

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
  shapePicture: ShapePicture,
  shapeJoin: ShapeJoin,
  spatialScene: SpatialScene,
  numberScene: NumberScene,
  groupScene: GroupScene,
  pointLine: PointLine,
  fractionBar: FractionBar,
  fractionCircle: FractionCircle,
  barModel: BarModel,
  motionDiagram: MotionDiagram,
  barChart: BarChart,
  pieChart: PieChart,
};

const NGUON = [
  ["grade1", grade1Data],
  ["grade2", grade2Data],
  ["grade3", grade3Data],
  ["grade4", grade4Data],
  ["grade5", grade5Data],
];

// Giữ HẾT mọi ca khác nhau. Đã cân nhắc cắt bớt cho nhẹ trang, nhưng KHÔNG cắt được:
// "ca to nhất" theo JSON không nhất thiết là "ca rộng nhất" (bảng 10 cột toàn số 1 chữ số
// có JSON ngắn mà viewBox rất rộng). Cắt theo phỏng đoán là tự tay giấu đúng ca cần đo.
const TOI_DA_MOI_LOAI = Infinity;

/** Ước lượng "độ to" của một ca: càng nhiều chữ / nhiều phần tử thì càng dễ tràn. */
function doTo(v) {
  if (v === null || v === undefined) return 0;
  if (typeof v === "string") return v.length;
  if (typeof v === "number") return String(v).length;
  if (Array.isArray(v)) return v.reduce((a, x) => a + doTo(x) + 2, 0);
  if (typeof v === "object")
    return Object.values(v).reduce((a, x) => a + doTo(x), 0);
  return 0;
}

const theoLoai = new Map();
let soSlide = 0;
for (const [lop, data] of NGUON) {
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      const slides = bai.slides || [];
      for (let i = 0; i < slides.length; i++) {
        soSlide++;
        const c = slides[i]?.content;
        if (!c || typeof c !== "object") continue;
        for (const k of HINH_KEYS) {
          const p = c[k];
          if (!p || typeof p !== "object") continue;
          if (!theoLoai.has(k)) theoLoai.set(k, new Map());
          const m = theoLoai.get(k);
          const j = JSON.stringify(p);
          if (!m.has(j)) m.set(j, { props: p, where: [] });
          m.get(j).where.push(`${lop}/${bai.id}#${i}`);
        }
        /**
         * ⚠️ `planeShapes` là MẢNG hình, do `VisualBlock` vẽ RIÊNG (không nằm trong
         * `HINH_KEYS`) ⇒ trước đây **51 ca không hề được đo**. Nay đưa từng phần tử vào
         * mục `planeShape` để đo chung.
         */
        if (Array.isArray(c.planeShapes)) {
          if (!theoLoai.has("planeShape"))
            theoLoai.set("planeShape", new Map());
          const m = theoLoai.get("planeShape");
          for (const p of c.planeShapes) {
            if (!p || typeof p !== "object") continue;
            const j = JSON.stringify(p);
            if (!m.has(j)) m.set(j, { props: p, where: [] });
            m.get(j).where.push(`${lop}/${bai.id}#${i}`);
          }
        }
      }
    }
  }
}

const phan = [];
const thongKe = [];
for (const k of HINH_KEYS) {
  const C = COMP[k];
  const all = [...(theoLoai.get(k)?.values() ?? [])].sort(
    (x, y) => doTo(y.props) - doTo(x.props),
  );
  const giu = all.slice(0, TOI_DA_MOI_LOAI);
  thongKe.push({
    key: k,
    caKhacNhau: all.length,
    soVe: giu.length,
    thieuComponent: !C,
  });
  if (!C) continue;
  const khoi = giu.map((du, i) => {
    let html = "";
    let loi = "";
    try {
      html = renderToStaticMarkup(
        <InteractiveContext.Provider value={true}>
          <C {...du.props} />
        </InteractiveContext.Provider>,
      );
    } catch (e) {
      loi = e.message;
    }
    const nhan = du.where.slice(0, 3).join(" · ");
    const them = du.where.length > 3 ? ` (+${du.where.length - 3})` : "";
    const du2 = JSON.stringify(du.props);
    const duNgan = du2.length > 320 ? `${du2.slice(0, 320)}…` : du2;
    const duDay = du2.replace(/</g, "\\u003c");
    return `<div class="ca" data-key="${k}" data-i="${i + 1}" data-where="${nhan}${them}">
  <div class="nhan">${k} #${i + 1} — ${nhan}${them}</div>
  ${loi ? `<pre class="loi">LỖI: ${loi}</pre>` : html}
  <script type="application/json" class="json">${duDay}</script>
  <pre class="du">${duNgan}</pre>
</div>`;
  });
  phan.push(
    `<section id="sec-${k}">\n<h2>${k} — ${all.length} ca khác nhau</h2>\n${khoi.join("\n")}\n</section>`,
  );
}

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Hình thật — 5 lớp</title>
<style>
  body { margin:0; background:#eef2f7; font-family: system-ui, sans-serif; }
  /* Bề rộng mô phỏng thẻ nội dung trong app ở màn hình lớn (đo được 833px).
     Đo ở điện thoại thì đặt lại .khung (script đo tự làm). */
  .khung { max-width: 833px; margin: 0 auto; padding: 12px; }
  section { margin-bottom: 34px; }
  h2 { font: 800 20px/1.3 system-ui; color:#0f172a; border-bottom:3px solid #94a3b8; padding-bottom:6px; margin:26px 0 10px; }
  .ca { margin-bottom: 10px; }
  .nhan { font: 700 12px/1.4 ui-monospace, monospace; color:#475569; margin: 10px 0 0 4px; }
  .du { font: 11px/1.4 ui-monospace, monospace; color:#94a3b8; margin:2px 4px 0; white-space:pre-wrap; word-break:break-all; }
  .loi { color:#b91c1c; font: 12px/1.4 ui-monospace; }
  .the { display: block; }
</style></head>
<body>
<div class="khung">
  <h1 style="font:800 24px/1.3 system-ui">Hình thật — lấy từ dữ liệu 5 lớp</h1>
  <p style="color:#475569">${soSlide} slide · giữ HẾT mọi ca hình khác nhau. Kiểu dáng và bề rộng thẻ giống app.</p>
  ${phan.map((p) => `<div class="the">${p}</div>`).join("\n")}
</div>
</body></html>`;

const dest = path.resolve(process.cwd(), "scratch", "visual-fit.html");
fs.writeFileSync(dest, html, "utf8");
console.log(`Đã ghi ${dest} (${Math.round(html.length / 1024)} KB)`);
console.table(thongKe);
console.log(
  `Tổng ca đã vẽ: ${thongKe.reduce((a, x) => a + x.soVe, 0)} · tổng ca khác nhau trong dữ liệu: ${thongKe.reduce((a, x) => a + x.caKhacNhau, 0)}`,
);
