#!/usr/bin/env node
/**
 * IN NỘI DUNG NHÌN THẤY của các slide trong một bài — để tự phán đoán ca nhóm B là
 * “trùng thật” hay “khuôn luyện tập dùng lại cùng một dòng”.
 *
 * Chạy: node scratch/in-slide-nhin-thay.mjs <mã-bài>
 */
import { planVisualText } from "../client/src/pages/lesson/slideDedupe.js";

const id = process.argv[2];
if (!id) {
  console.log(
    "Dùng: node scratch/in-slide-nhin-thay.mjs <mã-bài>  (vd g2-c2-l3)",
  );
  process.exit(2);
}

const lop = Number((id.match(/^g(\d+)/) ?? [])[1]);
const mod = await import(
  new URL(`../client/src/data/grade${lop}Data.js`, import.meta.url)
);
const bai = mod[`grade${lop}Data`].chapters
  .flatMap((c) => c.lessons ?? [])
  .find((l) => l.id === id);
if (!bai) {
  console.log("Không thấy bài", id);
  process.exit(1);
}

bai.slides.forEach((s, i) => {
  const c = s.content ?? {};
  console.log(`\n── #${i} [${s.type}]`);
  if (s.type === "visual") {
    const p = planVisualText(c);
    console.log(`   tiêu đề: ${JSON.stringify(p.title)}`);
    p.steps.forEach((d) => console.log(`   dòng   : ${JSON.stringify(d)}`));
  } else {
    for (const k of ["title", "rule", "question", "text"]) {
      if (c[k]) console.log(`   ${k}: ${JSON.stringify(c[k])}`);
    }
    if (Array.isArray(c.points))
      c.points.forEach((d) => console.log(`   point: ${JSON.stringify(d)}`));
  }
  const hinh = Object.keys(c).filter((k) =>
    [
      "cotTinh",
      "bangTinh",
      "number",
      "operation",
      "comparison",
      "clock",
      "table",
      "numberScene",
      "groupScene",
      "measureBoard",
      "planeShape",
      "angle",
      "pointLine",
    ].includes(k),
  );
  if (hinh.length) console.log(`   hình: ${hinh.join(", ")}`);
});
