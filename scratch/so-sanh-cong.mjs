#!/usr/bin/env node
/**
 * SO SÁNH KẾT QUẢ CHẠY CỔNG GIỮA BẢN HEAD (trước khi sửa) VÀ BẢN HIỆN TẠI.
 *
 * VÌ SAO (người dùng hỏi 2026-09-29): *“kiểm tra lần nào cũng pass và sạch nhưng khi kiểm tra lại
 * thì luôn có lỗi?”* ⇒ trả lời bằng số liệu: cổng nào **XANH → ĐỎ** (do đợt sửa này gây ra),
 * cổng nào đỏ sẵn từ trước, cổng nào vừa được sửa cho xanh. Không đoán.
 *
 *   node scratch/so-sanh-cong.mjs
 */
import fs from "node:fs";

const doc = (f) => {
  const ra = new Map();
  for (const l of fs.readFileSync(f, "utf8").split("\n")) {
    const m = l.match(/^\[(OK |ĐỎ )(-?\d+)\]\s+(\S+)/);
    if (m) ra.set(m[3], { do: m[2] !== "0", ma: m[2] });
  }
  return ra;
};

const head = doc("scratch/cong-HEAD.txt");
const nay = doc("scratch/chay-het-cong.txt");

const moi = [...nay.keys()].filter((k) => !head.has(k));
const hongDi = [...nay.keys()].filter(
  (k) => head.has(k) && !head.get(k).do && nay.get(k).do,
);
const lanhLai = [...nay.keys()].filter(
  (k) => head.has(k) && head.get(k).do && !nay.get(k).do,
);
const vanDo = [...nay.keys()].filter(
  (k) => head.has(k) && head.get(k).do && nay.get(k).do,
);

console.log(
  `HEAD: ${head.size} script · ${[...head.values()].filter((v) => !v.do).length} xanh · ${[...head.values()].filter((v) => v.do).length} đỏ`,
);
console.log(
  `NAY : ${nay.size} script · ${[...nay.values()].filter((v) => !v.do).length} xanh · ${[...nay.values()].filter((v) => v.do).length} đỏ`,
);
console.log(`\n🔴 HỎNG THÊM (xanh → đỏ, do đợt này): ${hongDi.length}`);
hongDi.forEach((k) => console.log(`   ${k}  [${nay.get(k).ma}]`));
console.log(`\n✅ LÀNH LẠI (đỏ → xanh): ${lanhLai.length}`);
lanhLai.forEach((k) => console.log(`   ${k}`));
console.log(
  `\n⚪ ĐỎ SẴN TỪ TRƯỚC (vẫn đỏ, không phải do đợt này): ${vanDo.length}`,
);
console.log("   " + vanDo.sort().join(", "));
console.log(`\n🆕 script MỚI (không có ở HEAD): ${moi.length}`);
console.log("   " + moi.sort().join(", "));
