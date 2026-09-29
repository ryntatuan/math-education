#!/usr/bin/env node
/** Dò vì sao một chuỗi không khớp trong file (in số lần xuất hiện + mã ký tự quanh đó). */
import fs from "node:fs";

const [f, ...mau] = process.argv.slice(2);
const s = fs.readFileSync(f, "utf8");
for (const t of mau) console.log(s.split(t).length - 1, JSON.stringify(t));

const i = s.indexOf("ê-ke");
if (i >= 0) {
  const doan = s.slice(i - 80, i + 120);
  console.log("...", JSON.stringify(doan));
  console.log(
    "ma:",
    [...doan].map((c) => c.codePointAt(0).toString(16)).join(" "),
  );
}
