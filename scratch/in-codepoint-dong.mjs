import { readFileSync } from "node:fs";
const f = "docs/sgk_curriculum_standardization_plan.md";
const t = readFileSync(f, "utf8");
const lines = t.split("\n");
lines.forEach((l, i) => {
  if (l.includes("hình không") && l.includes("khoá")) {
    const cps = [...l].map((c) => c.codePointAt(0).toString(16).padStart(4, "0")).join(" ");
    console.log(`dong ${i + 1}:`);
    console.log(l);
    console.log(cps);
  }
});
