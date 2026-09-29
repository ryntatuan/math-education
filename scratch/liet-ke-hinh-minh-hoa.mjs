/**
 * LIỆT KÊ **HÌNH MINH HOẠ** CỦA TẤT CẢ BÀI HỌC (5 lớp) — dùng khi muốn tự vẽ lại hình.
 *
 * Vì sao cần công cụ này: hình minh hoạ trong app KHÔNG phải file ảnh, mà là **SVG vẽ bằng mã**
 * (xem `client/src/components/visuals/`). Muốn vẽ lại thì phải biết: bài nào đang dùng loại hình
 * nào, loại đó do file nào vẽ. Có 488 bài / ~4 900 slide nên phải sinh bằng máy, không kê tay.
 *
 * Chạy: `node scratch/liet-ke-hinh-minh-hoa.mjs`
 * Xuất: `docs/ban-do-hinh-minh-hoa.md` (UTF-8, do Node ghi — KHÔNG dùng PowerShell `>`, bẫy UTF-16).
 */
import fs from "node:fs";
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

/** Khoá KHÔNG nằm trong `HINH_KEYS` nhưng vẫn được vẽ (do `LessonPage` / các slide component vẽ). */
const KHOA_NGOAI = {
  number: "số to (CalcFigures · lessonGraphics.jsx)",
  operation: "phép tính (CalcFigures · lessonGraphics.jsx)",
  comparison: "so sánh (CalcFigures · lessonGraphics.jsx)",
  clock: "mặt đồng hồ (ClockGraphic · lessonGraphics.jsx)",
  shape: "hình phẳng cũ (ShapeGraphic · lessonGraphics.jsx)",
  items: "khay emoji (concept/story/visual/quiz slide)",
  focusGraphic: "hình trong hội thoại (dialogueSlides.jsx)",
  planeShapes: "nhiều hình phẳng cạnh nhau (VisualBlock.jsx)",
  activityGrid: "lưới hoạt động", // nằm ở LessonPage — chỉ để đếm, không dùng để vẽ lại
  gallery: "thư viện ảnh", // idem
  dialogue: "hội thoại", // idem
};
const KHOA_NGOAI_HINH = Object.keys(KHOA_NGOAI);

/** Khoá hình → FILE vẽ (để biết mở file nào khi muốn sửa nét vẽ). */
const FILE_VE = {
  baseTen: "components/visuals/CoreVisuals.jsx",
  tenFrame: "components/visuals/CoreVisuals.jsx",
  numberLine: "components/visuals/CoreVisuals.jsx",
  placeValue: "components/visuals/CoreVisuals.jsx",
  ruler: "components/visuals/CoreVisuals.jsx",
  measureBoard: "components/visuals/CoreVisuals.jsx",
  money: "components/visuals/CoreVisuals.jsx",
  table: "components/visuals/CoreVisuals.jsx",
  planeShape: "components/visuals/geometry/hinhPhang.jsx",
  angle: "components/visuals/geometry/gocTron.jsx",
  circleParts: "components/visuals/geometry/gocTron.jsx",
  solid: "components/visuals/geometry/hinhKhoi.jsx",
  shapePicture: "components/visuals/geometry/hinhKhoi.jsx + ObjectShapes.jsx",
  shapeJoin: "components/visuals/geometry/dayHinh.jsx",
  patternRow: "components/visuals/geometry/dayHinh.jsx",
  pointLine: "components/visuals/geometry/dayHinh.jsx",
  spatialScene: "components/visuals/geometry/khongGian.jsx",
  bangTinh: "components/visuals/interactiveTable.jsx",
  cotTinh: "components/visuals/interactiveColumn.jsx",
  numberScene: "components/visuals/Grade1NumberVisuals.jsx",
  groupScene: "components/visuals/GroupVisuals.jsx",
  fractionBar: "components/visuals/FractionVisuals.jsx",
  fractionCircle: "components/visuals/FractionVisuals.jsx",
  barModel: "components/visuals/FractionVisuals.jsx",
  motionDiagram: "components/visuals/FractionVisuals.jsx",
  barChart: "components/visuals/FractionVisuals.jsx",
  pieChart: "components/visuals/FractionVisuals.jsx",
};

const grades = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];

// ── Thu thập ────────────────────────────────────────────────────────────────
const bai = []; // { lop, chuong, id, title, slide, slideHinh, khoa: Map(khoa -> so lan) }
const theoKhoa = new Map(); // khoa -> Set(mã bài)
const soKhoa = new Map(); // khoa -> số slide dùng

let tongBai = 0;
let tongSlide = 0;
let tongSlideHinh = 0;

grades.forEach((goi, i) => {
  for (const ch of goi.chapters ?? []) {
    for (const l of ch.lessons ?? []) {
      tongBai += 1;
      const khoa = new Map();
      let slideHinh = 0;
      for (const s of l.slides ?? []) {
        tongSlide += 1;
        const c = s.content || {};
        const dangDung = [
          ...HINH_KEYS.filter(
            (k) =>
              c[k] !== undefined &&
              c[k] !== null &&
              c[k] !== "" &&
              c[k] !== false,
          ),
          ...KHOA_NGOAI_HINH.filter(
            (k) =>
              c[k] !== undefined &&
              c[k] !== null &&
              c[k] !== "" &&
              c[k] !== false,
          ),
        ];
        if (dangDung.length) {
          slideHinh += 1;
          tongSlideHinh += 1;
        }
        for (const k of dangDung) khoa.set(k, (khoa.get(k) || 0) + 1);
      }
      bai.push({
        lop: i + 1,
        chuong: ch.id,
        id: l.id,
        title: l.title,
        slide: (l.slides ?? []).length,
        slideHinh,
        khoa,
      });
      for (const k of khoa.keys()) {
        if (!theoKhoa.has(k)) theoKhoa.set(k, new Set());
        theoKhoa.get(k).add(l.id);
        soKhoa.set(k, (soKhoa.get(k) || 0) + khoa.get(k));
      }
    }
  }
});

// ── Sinh Markdown ───────────────────────────────────────────────────────────
const dong = [];
dong.push("# Bản đồ HÌNH MINH HOẠ toàn bộ bài học (5 lớp)");
dong.push("");
dong.push(
  "SINH TỰ ĐỘNG — chạy lại bằng: `node scratch/liet-ke-hinh-minh-hoa.mjs`. Đừng sửa tay file này.",
);
dong.push("");
dong.push(
  `**Quy mô:** ${grades.length} lớp · ${tongBai} bài · ${tongSlide} slide · **${tongSlideHinh} slide có hình** ` +
    `(${((tongSlideHinh / tongSlide) * 100).toFixed(1)}%) · **${theoKhoa.size} loại hình** đang được dùng.`,
);
dong.push("");
dong.push(
  "Khoá có dấu `*` KHÔNG nằm trong `visualKeys.js` — chúng do `LessonPage` / các slide component vẽ " +
    "(xem cột “Vẽ ở file nào”).",
);
dong.push("");

// A. Từng bài
dong.push("## A. TỪNG BÀI HỌC — đang dùng hình gì");
dong.push("");
dong.push(
  "| Lớp | Chương | Mã bài | Tên bài | Slide | Slide có hình | Hình đang dùng |",
);
dong.push(
  "| :-- | :----- | :----- | :------ | ----: | ------------: | :------------- |",
);
for (const b of bai) {
  const ds = [...b.khoa.entries()]
    .sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))
    .map(([k, n]) => `${k}${HINH_KEYS.includes(k) ? "" : "*"}×${n}`)
    .join(" · ");
  dong.push(
    `| ${b.lop} | ${b.chuong} | \`${b.id}\` | ${b.title} | ${b.slide} | ${b.slideHinh} | ${ds || "—"} |`,
  );
}
dong.push("");

// B. Từng khoá
dong.push("## B. TỪNG LOẠI HÌNH — dùng ở những bài nào");
dong.push("");
dong.push(
  "| Khoá hình | Vẽ ở file nào | Số slide | Số bài | Danh sách mã bài |",
);
dong.push(
  "| :-------- | :------------ | -------: | -----: | :--------------- |",
);
const sapXep = [...theoKhoa.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [k, tapBai] of sapXep) {
  const ds = [...tapBai].sort().join(" · ");
  const ngoai = HINH_KEYS.includes(k) ? "" : " *";
  dong.push(
    `| \`${k}\`${ngoai} | ${FILE_VE[k] || KHOA_NGOAI[k] || "?"} | ${soKhoa.get(k)} | ${tapBai.size} | ${ds} |`,
  );
}
dong.push("");
dong.push("## C. GHI CHÚ");
dong.push("");
dong.push(
  "- Hình là **SVG vẽ bằng mã**, KHÔNG phải file ảnh: muốn đổi nét vẽ phải sửa file ở cột “Vẽ ở file nào”.",
);
dong.push(
  "- Một slide chỉ được có **ĐÚNG MỘT hình** (luật của repo) — slide có 2 khoá hình là slide nhồi.",
);
dong.push(
  "- Sửa **dữ liệu** (tham số hình) ⇒ phải sinh lại seed + dán lại (xem `docs/content_reload_steps.md`).",
);
dong.push(
  "- Sửa **mã vẽ** ⇒ chỉ cần deploy web / build lại APK, KHÔNG cần dán seed.",
);
dong.push("- Hướng dẫn tự vẽ lại: `docs/huong-dan-tu-ve-hinh-minh-hoa.md`.");

const out = "docs/ban-do-hinh-minh-hoa.md";
fs.writeFileSync(out, dong.join("\n") + "\n", "utf8");
console.log(`ĐÃ GHI: ${out} (${dong.length} dòng)`);
console.log(
  `Quy mô: ${grades.length} lớp · ${tongBai} bài · ${tongSlide} slide · ${tongSlideHinh} slide có hình · ${theoKhoa.size} loại hình`,
);
