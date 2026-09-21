// Đổi NHÃN (badge) slide khái niệm cho 6 bài chương 7 Lớp 3.
//
// VÌ SAO: cả 6 bài đang dùng chung nhãn "Đại Lượng & Đo Lường Lớp 3" — đó là nhãn cấp CHƯƠNG,
// không phải nội dung dạy, nhưng vì nó dài hơn 25 ký tự nên công cụ soi vẫn xếp vào "câu lặp"
// và báo 1 dòng đỏ giả. Đổi thành nhãn riêng theo chủ đề bài thì vừa hết báo động giả, vừa dễ
// hiểu hơn cho bé (bé nhìn nhãn là biết bài dạy gì).
//
// DÙNG: node scratch/doi-badge-lop3-c7.mjs
// ⚠️ Chỉ đổi nhãn BÊN TRONG slide khái niệm; có bài nào không tìm thấy thì DỪNG, không ghi file.

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade3Data.js");

const NHAN = {
  "g3-c7-l1": "Đo Khối Lượng",
  "g3-c7-l2": "Đo Dung Tích",
  "g3-c7-l3": "Đo Nhiệt Độ",
  "g3-c7-l4": "Tiền Việt Nam",
  "g3-c7-l5": "Tiền Việt Nam (tiếp)",
  "g3-c7-l12": "Bảng Quy Đổi",
};

let src = fs.readFileSync(FILE, "utf8");
const khuc = src.split(/(?=["']?id["']?: "g3-c\d+-l\d+",)/g);
const daSua = new Set();
const loi = [];

const ra = khuc.map((k) => {
  const id = k.match(/["']?id["']?: "(g3-c\d+-l\d+)",/)?.[1];
  if (!id || !NHAN[id]) return k;

  const iC = k.indexOf('type: "concept"');
  const jC = iC < 0 ? -1 : k.indexOf("\n            },", iC);
  if (iC < 0 || jC < 0) {
    loi.push(`${id} → không thấy khối concept`);
    return k;
  }

  const khoi = k.slice(iC, jC);
  let n = 0;
  const moi = khoi.replace(
    /^([ \t]*)(["']?badge["']?: )("(?:[^"\\]|\\.)*")/gm,
    (_m, ws, dau) => {
      n += 1;
      return `${ws}${dau}${JSON.stringify(NHAN[id])}`;
    },
  );
  if (n !== 1) {
    loi.push(`${id} → tìm thấy ${n} dòng badge (mong đợi 1)`);
    return k;
  }

  daSua.add(id);
  return k.slice(0, iC) + moi + k.slice(jC);
});

for (const id of Object.keys(NHAN))
  if (!daSua.has(id)) loi.push(`Không thấy bài: ${id}`);

if (loi.length) {
  console.error("🔴 DỪNG — không ghi file:");
  loi.forEach((t) => console.error(`   ${t}`));
  process.exit(1);
}

fs.writeFileSync(FILE, ra.join(""), "utf8");
console.log(`✅ Đã đổi nhãn ${daSua.size} bài chương 7 Lớp 3:`);
for (const [id, nhan] of Object.entries(NHAN))
  console.log(`   ${id} → “${nhan}”`);
