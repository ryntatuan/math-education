/**
 * In nguyên văn props của một hình, cho những bài đã biết id.
 *   node scratch/in-hinh.mjs <id-bài…>
 */
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const wanted = process.argv.slice(2);
const all = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];

for (const data of all) {
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      if (!wanted.includes(bai.id)) continue;
      console.log(`\n===== ${bai.id} — ${bai.title} =====`);
      (bai.slides || []).forEach((s, i) => {
        const c = s?.content ?? {};
        const keys = Object.keys(c).filter(
          (k) => k !== "text" && c[k] && typeof c[k] === "object",
        );
        if (keys.length === 0) return;
        console.log(
          `  [${i}] ${s.type} · text = ${JSON.stringify(c.text ?? c.question ?? "")}`,
        );
        for (const k of keys)
          console.log(`      ${k}: ${JSON.stringify(c[k])}`);
      });
    }
  }
}
