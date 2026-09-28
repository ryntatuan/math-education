/**
 * IN CẤU TRÚC MỘT BÀI HỌC TỪ FILE TĨNH — để đối chiếu với những gì app đang vẽ.
 *
 *   node scratch/in-mot-bai.mjs g1-c1-l1
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const id = process.argv[2] || "g1-c1-l1";
for (const g of [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data]) {
  for (const c of g.chapters) {
    for (const l of c.lessons) {
      if (l.id !== id) continue;
      console.log(`${l.id} — ${l.title} (${l.slides.length} slide)`);
      l.slides.forEach((s, i) => {
        const t =
          s.content?.text ??
          s.content?.question ??
          s.content?.title ??
          s.content?.explanation ??
          "";
        const o = Array.isArray(s.content?.options)
          ? ` · options=${s.content.options.length}`
          : "";
        console.log(
          `  ${i + 1}. ${s.type}${o} — ${String(t).replace(/\s+/g, " ").slice(0, 70)}`,
        );
      });
      process.exit(0);
    }
  }
}
console.log("không thấy bài", id);
