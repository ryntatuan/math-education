/**
 * XOÁ BÀI `g1-c1-l3` khỏi `client/src/data/grade1/g1c1.js` (bài "Các số 4, 5" đã được GỘP vào
 * `g1-c1-l2` theo yêu cầu người dùng 2026-09-29).
 *
 * Vì sao không sửa bằng tay: khối cần xoá dài ~180 dòng, chép lại làm `oldString` rất dễ lệch
 * một dấu cách là hỏng cả file. Cách này bám theo ID rồi quét ngoặc để tìm đúng khối.
 *
 * Chạy thử:  node scratch/xoa-bai-g1c1-l3.mjs
 * Ghi thật:  node scratch/xoa-bai-g1c1-l3.mjs --ghi   (tự sao lưu + tự kiểm sau khi ghi)
 *
 * CHỐT AN TOÀN (lệch là DỪNG, không ghi gì):
 *   1. Khối xoá phải chứa đúng 1 `id: "g1-c1-l..."` và phải là `g1-c1-l3`.
 *   2. Ngoặc phải cân bằng lại đúng 0 ở cuối khối.
 *   3. Ngay sau khối xoá phải là bài `g1-c1-l4` (nếu không: đã bám nhầm khối).
 *   4. Sau khi ghi: nạp lại module, in số bài + số slide, và phải KHÔNG còn `g1-c1-l3`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const FILE = "client/src/data/grade1/g1c1.js";
const BAK_DIR = "scratch/truoc-gop";
const GHI = process.argv.includes("--ghi");

const t = fs.readFileSync(FILE, "utf8");

/** Bỏ qua chuỗi + chú thích khi quét ngoặc (bám đúng thụt lề của dòng mở). */
function canBang(s, iOpen) {
  let depth = 0;
  let i = iOpen;
  let kieu = null; // '"' | "'" | "`" | null
  while (i < s.length) {
    const c = s[i];
    const d = s[i + 1];
    if (kieu) {
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === kieu) kieu = null;
      i += 1;
      continue;
    }
    if (c === "/" && d === "/") {
      i = s.indexOf("\n", i);
      if (i < 0) return -1;
      continue;
    }
    if (c === "/" && d === "*") {
      i = s.indexOf("*/", i);
      if (i < 0) return -1;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      kieu = c;
      i += 1;
      continue;
    }
    if (c === "{") depth += 1;
    if (c === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
    i += 1;
  }
  return -1;
}

const ID = '      id: "g1-c1-l3",';
const iId = t.indexOf(ID);
if (iId < 0) {
  console.error(`DỪNG: không thấy ${ID.trim()}`);
  process.exit(1);
}
const iOpen = (() => {
  // File dữ liệu dùng LẪN CRLF và LF ⇒ mẫu phải nhận cả hai (đã mất một vòng vì lỗi này).
  const re = /\r?\n    \{/g;
  let cuoi = -1;
  let m;
  const pre = t.slice(0, iId);
  while ((m = re.exec(pre))) cuoi = m.index + m[0].length - 1;
  return cuoi;
})();
if (iOpen <= 0) {
  console.error("DỪNG: không tìm ra dòng mở của khối bài học");
  process.exit(1);
}
const iClose = canBang(t, iOpen);
if (iClose < 0) {
  console.error("DỪNG: quét ngoặc không cân bằng");
  process.exit(1);
}
// Ăn luôn dấu phẩy + xuống dòng sau khối (nếu có) để không để lại dấu phẩy trơ.
let iHet = iClose + 1;
if (t[iHet] === ",") iHet += 1;
if (t[iHet] === "\r") iHet += 1;
if (t[iHet] === "\n") iHet += 1;

const khoi = t.slice(iOpen, iHet);

const soId = (khoi.match(/id: "g1-c1-l\d+"/g) || []).length;
const kiem = [
  [`khối chứa ${ID.trim()}`, khoi.includes(ID)],
  ["khối chỉ chứa ĐÚNG 1 id bài học", soId === 1],
  [
    'khối là bài có hoạt động "đếm theo điều kiện"',
    khoi.includes('mode: "countFiltered"'),
  ],
  ["khối kết thúc bằng dòng đóng bài học", /    \},\r?\n$/.test(khoi)],
  [
    "bài NGAY SAU là g1-c1-l4",
    /^\s*\{\s*\r?\n\s*id: "g1-c1-l4"/.test(t.slice(iHet, iHet + 60)),
  ],
];
let hong = 0;
for (const [ten, ok] of kiem) {
  if (!ok) hong += 1;
  console.log(`${ok ? "OK  " : "HỎNG"} ${ten}`);
}
console.log(`Khối sẽ xoá: ${khoi.split("\n").length} dòng (${iOpen}..${iHet})`);
if (hong) {
  console.error(`DỪNG: ${hong} chốt không đạt — KHÔNG ghi gì.`);
  process.exit(1);
}
if (!GHI) {
  console.log("\n(chạy thử) Thêm --ghi để ghi thật.");
  process.exit(0);
}

fs.mkdirSync(BAK_DIR, { recursive: true });
const bak = path.join(BAK_DIR, path.basename(FILE) + ".bak");
fs.writeFileSync(bak, t, "utf8");
fs.writeFileSync(FILE, t.slice(0, iOpen) + t.slice(iHet), "utf8");
console.log(`\nĐã ghi. Bản cũ: ${bak}`);

// ── tự kiểm sau khi ghi ──
const moi = fs.readFileSync(FILE, "utf8");
if (moi.includes('id: "g1-c1-l3"')) {
  console.error("LỖI: vẫn còn g1-c1-l3");
  process.exit(1);
}
const { g1c1 } = await import(
  pathToFileURL(path.resolve(FILE)).href + `?t=${Date.now()}`
);
const soSlide = g1c1.lessons.reduce((s, l) => s + l.slides.length, 0);
console.log(
  `g1c1: ${g1c1.lessons.length} bài · ${soSlide} slide · totalLessons khai báo = ${g1c1.totalLessons}`,
);
if (g1c1.lessons.length !== 11) {
  console.error("LỖI: số bài không phải 11");
  process.exit(1);
}
