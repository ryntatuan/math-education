#!/usr/bin/env node
/**
 * Vá hậu quả của lỗi `xoaSlide` dừng sớm (2026-09-29): mỗi slide bị xoá để lại một dòng `        },` thừa
 * ⇒ hai dòng đóng sâu 8 ô nằm LIỀN NHAU (điều không bao giờ xảy ra ở mã đúng).
 *
 *   node scratch/don-dong-thua.mjs [--ghi] <file...>
 */

import fs from "node:fs";
import path from "node:path";

const GHI = process.argv.includes("--ghi");
const duongDan = process.argv.slice(2).filter((a) => !a.startsWith("--"));

// Nhận cả THƯ MỤC (quét đệ quy) vì PowerShell không mở rộng `*.js` cho node.
const files = [];
for (const d of duongDan.length ? duongDan : ["client/src/data"]) {
  if (fs.statSync(d).isDirectory()) {
    const di = (p) => {
      for (const e of fs.readdirSync(p, { withFileTypes: true })) {
        const q = path.join(p, e.name);
        if (e.isDirectory()) di(q);
        else if (e.name.endsWith(".js")) files.push(q);
      }
    };
    di(d);
  } else files.push(d);
}

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  const dong = raw.split("\n");
  const ket = [];
  let bo = 0;
  for (let i = 0; i < dong.length; i++) {
    const a = dong[i].trimEnd();
    const b = (dong[i + 1] ?? "").trimEnd();
    if (a === "        }," && b === "        },") {
      bo++; // dòng thừa là dòng THỨ HAI (đuôi còn lại của slide đã xoá)
      ket.push(dong[i++ + 1]);
      continue;
    }
    ket.push(dong[i]);
  }
  console.log(`${f}: bỏ ${bo} dòng thừa`);
  if (bo && GHI) fs.writeFileSync(f, ket.join("\n"), "utf8");
}
