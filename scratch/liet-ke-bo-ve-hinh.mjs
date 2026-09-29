/**
 * LIỆT KÊ **BỘ VẼ HÌNH** — "muốn vẽ lại bằng mã thì mở file nào, sửa hàm nào".
 *
 * Khác `liet-ke-hinh-minh-hoa.mjs` (bản đồ theo BÀI HỌC), file này lập bản đồ theo MÃ NGUỒN:
 * mỗi loại hình → tên hàm vẽ, file, SỐ DÒNG hiện tại, các tham số hàm nhận, và "sức ảnh hưởng"
 * (sửa hàm đó thì bao nhiêu slide / bao nhiêu bài đổi theo).
 *
 * Vì sao phải sinh bằng máy: số dòng lệch ngay sau mỗi lần sửa file; chép tay là chép sai.
 *
 * Chạy: `node scratch/liet-ke-bo-ve-hinh.mjs`  → ghi `docs/ban-do-bo-ve-hinh.md`
 */
import fs from "node:fs";
import path from "node:path";
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

/** Khoá hình → [tên hàm vẽ, …các file cần tìm]. */
const COMPONENT = {
  baseTen: ["BaseTenBlocks", ["client/src/components/visuals"]],
  tenFrame: ["TenFrame", ["client/src/components/visuals"]],
  numberLine: ["NumberLine", ["client/src/components/visuals"]],
  placeValue: ["PlaceValueTable", ["client/src/components/visuals"]],
  ruler: ["Ruler", ["client/src/components/visuals"]],
  measureBoard: ["MeasureBoard", ["client/src/components/visuals"]],
  money: ["Money", ["client/src/components/visuals"]],
  table: ["Table", ["client/src/components/visuals"]],
  planeShape: ["PlaneShape", ["client/src/components/visuals"]],
  angle: ["Angle", ["client/src/components/visuals"]],
  circleParts: ["CircleParts", ["client/src/components/visuals"]],
  solid: ["Solid", ["client/src/components/visuals"]],
  shapePicture: ["ShapePicture", ["client/src/components/visuals"]],
  shapeJoin: ["ShapeJoin", ["client/src/components/visuals"]],
  patternRow: ["PatternRow", ["client/src/components/visuals"]],
  spatialScene: ["SpatialScene", ["client/src/components/visuals"]],
  pointLine: ["PointLine", ["client/src/components/visuals"]],
  bangTinh: ["BangTinh", ["client/src/components/visuals"]],
  cotTinh: ["CotTinh", ["client/src/components/visuals"]],
  numberScene: ["NumberScene", ["client/src/components/visuals"]],
  groupScene: ["GroupScene", ["client/src/components/visuals"]],
  fractionBar: ["FractionBar", ["client/src/components/visuals"]],
  fractionCircle: ["FractionCircle", ["client/src/components/visuals"]],
  barModel: ["BarModel", ["client/src/components/visuals"]],
  motionDiagram: ["MotionDiagram", ["client/src/components/visuals"]],
  barChart: ["BarChart", ["client/src/components/visuals"]],
  pieChart: ["PieChart", ["client/src/components/visuals"]],
  // Khoá do `LessonPage` vẽ (không nằm trong `visualKeys.js`)
  clock: ["ClockGraphic", ["client/src/pages/lesson"]],
  shape: ["ShapeGraphic", ["client/src/pages/lesson"]],
  operation: ["CalcFigures", ["client/src/pages/lesson"]],
  comparison: ["CalcFigures", ["client/src/pages/lesson"]],
  number: ["CalcFigures", ["client/src/pages/lesson"]],
  focusGraphic: ["ClockGraphic", ["client/src/pages/lesson"]],
  items: [
    "(khay emoji — vẽ ngay trong các slide component)",
    ["client/src/pages/lesson"],
  ],
};

const tatCaFile = [];
for (const thuMuc of [
  "client/src/components/visuals",
  "client/src/pages/lesson",
]) {
  for (const f of fs.readdirSync(thuMuc, { recursive: true })) {
    const p = path.join(thuMuc, f.toString());
    if (/\.jsx?$/.test(p)) tatCaFile.push(p.replace(/\\/g, "/"));
  }
}

/** Tìm định nghĩa hàm trong các file nguồn: trả về { file, dong, props }. */
function timHam(ten, thuMucs) {
  const ungVien = tatCaFile.filter((p) => thuMucs.some((d) => p.startsWith(d)));
  for (const p of ungVien) {
    const src = fs.readFileSync(p, "utf8");
    const re = new RegExp(
      `(?:export\\s+)?(?:default\\s+)?function\\s+${ten}\\s*\\(`,
    );
    const m = re.exec(src);
    if (!m) continue;
    const dong = src.slice(0, m.index).split("\n").length;
    // Lấy ruột trong ngoặc (cân bằng ngoặc, bỏ qua chuỗi) rồi rút tên tham số.
    let i = src.indexOf("(", m.index);
    let sau = 0;
    let kieu = null;
    let j = i;
    for (; j < src.length; j += 1) {
      const c = src[j];
      if (kieu) {
        if (c === "\\") j += 1;
        else if (c === kieu) kieu = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") kieu = c;
      else if (c === "(") sau += 1;
      else if (c === ")") {
        sau -= 1;
        if (sau === 0) break;
      }
    }
    let ruot = src.slice(i + 1, j).trim();
    // Bỏ CẶP NGOẶC BAO NGOÀI của phép "destructuring" (`{ a, b }`) — nhưng GIỮ nguyên các `{…}`
    // nằm trong giá trị mặc định, nếu không thì `tens = 3, ones = 4` bị dính thành một mảnh.
    if (ruot.startsWith("{") && ruot.endsWith("}")) ruot = ruot.slice(1, -1);
    // Cắt theo dấu phẩy ở CẤP NGOÀI CÙNG, rồi mỗi mảnh: lấy phần trước `=` / `:` ⇒ tên tham số.
    const manh = [];
    let sau2 = 0;
    let kieu2 = null;
    let dau = 0;
    for (let k = 0; k <= ruot.length; k += 1) {
      const c = ruot[k] ?? ",";
      if (kieu2) {
        if (c === "\\") k += 1;
        else if (c === kieu2) kieu2 = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") kieu2 = c;
      else if (c === "{" || c === "[" || c === "(") sau2 += 1;
      else if (c === "}" || c === "]" || c === ")") sau2 -= 1;
      else if (c === "," && sau2 === 0) {
        manh.push(ruot.slice(dau, k));
        dau = k + 1;
      }
    }
    manh.push(ruot.slice(dau));
    const props = manh
      .map((x) => x.replace(/[\n\r{}()[\]]/g, " ").trim())
      .map((x) => x.split("=")[0].split(":")[0].trim())
      .filter((x) => /^[A-Za-z_$][\w$]*$/.test(x));
    return { file: p, dong, props };
  }
  return null;
}

// ── Sức ảnh hưởng: đếm slide/bài dùng mỗi khoá ──────────────────────────────
const grades = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];
const soSlide = new Map();
const soBai = new Map();
for (const goi of grades) {
  for (const ch of goi.chapters ?? []) {
    for (const l of ch.lessons ?? []) {
      const coBai = new Set();
      for (const s of l.slides ?? []) {
        for (const k of Object.keys(COMPONENT)) {
          const v = s.content?.[k];
          if (v === undefined || v === null || v === "" || v === false)
            continue;
          soSlide.set(k, (soSlide.get(k) || 0) + 1);
          coBai.add(k);
        }
      }
      for (const k of coBai) soBai.set(k, (soBai.get(k) || 0) + 1);
    }
  }
}

// ── Ghi tài liệu ───────────────────────────────────────────────────────────
const d = [];
d.push("# BẢN ĐỒ BỘ VẼ HÌNH — “vẽ lại bằng mã thì mở file nào, sửa hàm nào”");
d.push("");
d.push(
  "SINH TỰ ĐỘNG — chạy lại: `node scratch/liet-ke-bo-ve-hinh.mjs`. Đừng sửa tay.",
);
d.push("");
d.push(
  "> Hình trong app là **SVG vẽ bằng mã React** (không phải file ảnh). Muốn đổi nét vẽ thì sửa hàm vẽ " +
    "trong file ở cột “File vẽ”. **Số dòng** là vị trí hiện tại (đổi sau mỗi lần sửa file — chạy lại công cụ là có số mới).",
);
d.push("");
d.push(
  "⚠️ Cột “Sức ảnh hưởng” cho biết sửa hàm đó thì **bao nhiêu slide / bao nhiêu bài** đổi theo — " +
    "sửa một hàm là sửa cho cả 5 lớp, KHÔNG phải cho riêng bài đang xem.",
);
d.push("");
d.push("## A. Từng loại hình");
d.push("");
d.push(
  "| Khoá hình | Hàm vẽ | File vẽ : dòng | Tham số hàm nhận | Slide | Bài |",
);
d.push(
  "| :-------- | :----- | :------------- | :--------------- | ----: | --: |",
);
const thuTu = Object.keys(COMPONENT).sort(
  (a, b) => (soBai.get(b) || 0) - (soBai.get(a) || 0) || a.localeCompare(b),
);
for (const k of thuTu) {
  const [ten, thuMucs] = COMPONENT[k];
  const vitri = ten.startsWith("(") ? null : timHam(ten, thuMucs);
  const oFile = vitri ? `\`${vitri.file}\` : ${vitri.dong}` : "—";
  const oProps =
    vitri && vitri.props.length
      ? vitri.props.map((p) => `\`${p}\``).join(", ")
      : "—";
  const ghi = HINH_KEYS.includes(k) ? "" : " (khoá ngoài `visualKeys.js`)";
  d.push(
    `| \`${k}\`${ghi} | \`${ten}\` | ${oFile} | ${oProps} | ${soSlide.get(k) || 0} | ${soBai.get(k) || 0} |`,
  );
}
d.push("");
d.push("## B. Sửa gì thì đổi chỗ nào (các ca hay gặp nhất)");
d.push("");
d.push("| Muốn đổi | Sửa ở đâu |");
d.push("| :------- | :-------- |");
d.push(
  "| **Khung thẻ, chú thích dưới hình, cách hình co theo bề rộng, màu nhấn** | `client/src/components/visuals/visualTheme.js` — `CARD_STYLE`, `CAPTION_STYLE`, `svgFit()`, `VUA_HINH` — **sửa 1 chỗ là 1 627 slide đổi theo** |",
);
d.push(
  "| Bề rộng/chiều cao của MỘT hình | trong hàm vẽ: các toạ độ `x`, `y`, `width`, `height` và lời gọi `svgFit(<bề rộng viewBox>)` |",
);
d.push(
  "| Độ lớn chữ trong hình | `fontSize` của thẻ `<text>` (quy tắc: **≥ 14 đơn vị**) |",
);
d.push(
  "| Màu | hằng số màu ở đầu file vẽ (ví dụ `const P = { … }` trong `CoreVisuals.jsx`), hoặc mảng màu riêng (ví dụ `CUBE` trong `Grade1NumberVisuals.jsx`) |",
);
d.push("| Bo tròn góc | `rx` của `<rect>` |");
d.push("| Độ dày nét | `strokeWidth` |");
d.push(
  "| Vị trí một chi tiết | `x`, `y` của phần tử đó (mỗi `<rect>`/`<circle>`/`<path>` vẽ MỘT chi tiết) |",
);
d.push(
  "| Một đồ vật cụ thể (quyển sách, xe buýt, con thỏ…) | `client/src/components/visuals/ObjectShapes.jsx` — hàm `draw<Tên>` tương ứng, đăng ký trong map `DRAW` |",
);
d.push("");
d.push("## C. Ba luật KHÔNG được phá khi vẽ lại");
d.push("");
d.push(
  "1. **`viewBox` rộng ≤ 380 đơn vị** và **chữ ≥ 14 đơn vị** — điện thoại 375 px chỉ cho hình ~283 px; rộng hơn là bé phải kéo ngang.",
);
d.push("2. **Một slide MỘT hình** — đừng vẽ thêm hình thứ hai vào cùng slide.");
d.push(
  "3. **Không vẽ đáp án lên hình** ở slide câu hỏi (bé phải tự đếm/tự tính).",
);
d.push("");
d.push(
  "Chi tiết quy trình + lệnh kiểm: `docs/huong-dan-tu-ve-hinh-minh-hoa.md`.",
);

const out = "docs/ban-do-bo-ve-hinh.md";
fs.writeFileSync(out, d.join("\n") + "\n", "utf8");
console.log(`ĐÃ GHI: ${out} (${d.length} dòng)`);
const thieu = thuTu.filter(
  (k) =>
    !COMPONENT[k][0].startsWith("(") &&
    !timHam(COMPONENT[k][0], COMPONENT[k][1]),
);
console.log(
  thieu.length
    ? `⚠️ không tìm thấy hàm: ${thieu.join(", ")}`
    : "Tìm thấy đủ hàm vẽ của mọi khoá.",
);
