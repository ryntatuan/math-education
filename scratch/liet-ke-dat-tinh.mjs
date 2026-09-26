/**
 * LIỆT KÊ mọi slide còn “ĐẶT TÍNH IN SẴN” (khoá `operation`) ở Lớp 2–5, kèm:
 *   • bài/slide, giá trị operation, `text` (đã escape) — để chuyển sang `cotTinh` bằng tay
 *   • slide có hình KHÁC nữa hay không (nếu có ⇒ phải TÁCH slide, không thay tại chỗ)
 * Chạy: `node scratch/liet-ke-dat-tinh.mjs [lớp]`
 */
import { readdirSync, readFileSync } from "node:fs";

const HINH_KHAC = [
  "table",
  "placeValue",
  "barModel",
  "comparison",
  "fractionBar",
  "fractionCircle",
  "numberLine",
  "ruler",
  "money",
  "baseTen",
  "tenFrame",
  "planeShape",
  "solid",
  "angle",
  "circleParts",
  "motionDiagram",
  "barChart",
  "pieChart",
  "groupScene",
  "spatialScene",
  "pointLine",
  "shapePicture",
  "shapeJoin",
  "patternRow",
  "bangTinh",
  "cotTinh",
  "numberScene",
];

const chiLop = process.argv[2] ? Number(process.argv[2]) : null;
const lopCan = chiLop ? [chiLop] : [1, 2, 3, 4, 5];

let tong = 0;
const theoLop = {};
for (const lop of lopCan) {
  const dir = `client/src/data/grade${lop}`;
  let files;
  try {
    files = readdirSync(dir)
      .filter((f) => /^g\d+c\d+\.js$/.test(f))
      .sort(
        (a, b) => Number(a.match(/c(\d+)/)[1]) - Number(b.match(/c(\d+)/)[1]),
      );
  } catch {
    continue;
  }
  for (const f of files) {
    const file = `${dir}/${f}`;
    const src = readFileSync(file, "utf8");
    const re = /([ \t]*)operation:\s*\{([^}]*)\},?\r?\n/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      const than = m[2];
      const so = (t) => {
        const mm =
          than.match(new RegExp(`${t}:\\s*"([\\d.,]+)"`)) ??
          than.match(new RegExp(`${t}:\\s*([\\d.,]+)`));
        return mm ? mm[1] : null;
      };
      const left = so("left");
      const right = so("right");
      const sign = (than.match(/sign:\s*"([^"]+)"/) ?? [])[1] ?? "+";
      const dau = src.lastIndexOf("\n        {", m.index);
      const cuoi = src.indexOf("\n        },", m.index);
      const khoi = src.slice(dau, cuoi);
      const khac = HINH_KHAC.filter((k) => new RegExp(`\\b${k}:`).test(khoi));
      const text = (khoi.match(/text:\s*"([\s\S]*?)",\r?\n/) ?? [])[1] ?? "";
      // id bài gần nhất phía trước
      const truoc = src.slice(0, m.index);
      const idBai =
        (
          truoc.match(/"id":\s*"(g\d-c\d+-l\d+)"/g) ??
          truoc.match(/id:\s*"(g\d-c\d+-l\d+)"/g) ??
          []
        ).pop() ?? "?";
      tong += 1;
      theoLop[lop] = (theoLop[lop] ?? 0) + 1;
      console.log(
        `${file} · ${idBai.replace(/"/g, "")} · ${left} ${sign} ${right} · khac=[${khac.join(",")}] · ${JSON.stringify(text)}`,
      );
    }
  }
}
console.log(
  `\nTổng: ${tong} slide  (${Object.entries(theoLop)
    .map(([k, v]) => `L${k}: ${v}`)
    .join(" · ")})`,
);
