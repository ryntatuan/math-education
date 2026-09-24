// In ra một cửa sổ dòng quanh các mốc đã biết, để lấy nguyên văn khối JSON cần sửa.
// Read-only: chỉ đọc file, không ghi gì.
import { readFileSync } from "node:fs";

const targets = [
  ["client/src/data/grade2/g2c8.js", [1009, 1330]],
  ["client/src/data/grade2/g2c14.js", [330, 724]],
  ["client/src/data/grade3/g3c1.js", [836, 1108]],
];

for (const [file, anchors] of targets) {
  const lines = readFileSync(file, "utf8").split("\n");
  console.log(`\n===== ${file} (${lines.length} dòng) =====`);
  for (const a of anchors) {
    console.log(`--- quanh dòng ${a} ---`);
    for (let i = a - 2; i < Math.min(a + 18, lines.length); i++) {
      console.log(`${i + 1}: ${lines[i]}`);
    }
  }
}
