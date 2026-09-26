// TÁCH MỘT FILE LỚN THÀNH NHIỀU FILE — DI CHUYỂN MÃ NGUYÊN KHỐI, KHÔNG SỬA NỘI DUNG.
//
//   node scratch/tach-file-lon.mjs <spec.json>            # chạy thử, chỉ in báo cáo
//   node scratch/tach-file-lon.mjs <spec.json> --ghi      # ghi thật (tự sao lưu .bak)
//
// spec.json:
// {
//   "file": "client/src/pages/LessonPage.jsx",
//   "outDir": "client/src/pages/lesson",
//   "groups": [{ "file": "storySlide.jsx", "symbols": ["StorySlide"] }, ...]
// }
//
// NGUYÊN TẮC AN TOÀN:
//  • Mỗi khối cấp cao được cắt theo BỘ QUÉT NGOẶC (bỏ qua chuỗi + chú thích) rồi dán y nguyên.
//  • Mỗi file mới CHÉP LẠI TOÀN BỘ khối import của file gốc (chỉ đổi đường dẫn tương đối `./`->`../`)
//    ⇒ không có nguy cơ thiếu import. Import thừa là vô hại (build tree-shake).
//  • Tên dùng chung giữa các file mới thì sinh `import { X } from "./anh-em.js"`; nếu phát hiện
//    VÒNG (A cần B, B cần A) thì DỪNG và báo — người dùng gộp nhóm lại, không tự đoán.
//  • Không ghi được file nào thì KHÔNG ghi gì cả (kiểm hết rồi mới ghi).

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join, relative, basename } from "node:path";

const specPath = process.argv[2];
const GHI = process.argv.includes("--ghi");
if (!specPath) {
  console.error("Thiếu đường dẫn spec.json");
  process.exit(2);
}
const spec = JSON.parse(readFileSync(specPath, "utf8"));
const srcPath = spec.file;
const src = readFileSync(srcPath, "utf8");
const lines = src.split(/\r?\n/);

// ── 1. Khối import ở đầu file ───────────────────────────────────────────────
let i = 0;
const importRaws = [];
const dauComments = [];
while (i < lines.length) {
  const t = lines[i].trim();
  if (t === "") {
    i++;
    continue;
  }
  // 🔴 KHỐI CHÚ THÍCH `/** ... */` Ở ĐẦU FILE phải được BỎ QUA (giữ lại cho file gốc).
  // Không bỏ qua thì vòng lặp `break` ngay tại dòng đầu ⇒ KHÔNG import nào được chép sang
  // file mới ⇒ cả loạt lỗi `no-undef` (đã mắc thật với GeometryVisuals.jsx).
  if (t.startsWith("/*")) {
    let k = i;
    while (k < lines.length && !lines[k].includes("*/")) k++;
    dauComments.push(lines.slice(i, k + 1).join("\n"));
    i = k + 1;
    continue;
  }
  if (t.startsWith("//")) {
    dauComments.push(lines[i]);
    i++;
    continue;
  }
  if (!t.startsWith("import ")) break;
  let j = i;
  while (j < lines.length && !/;\s*$/.test(lines[j])) j++;
  importRaws.push(lines.slice(i, j + 1).join("\n"));
  i = j + 1;
}
const thanFile = i; // dòng đầu tiên sau khối import

/** Dịch đường dẫn tương đối cho file nằm sâu hơn 1 cấp: `.` -> thêm một `../`.
 *  `"./x"` -> `"../x"` · `"../x"` -> `"../../x"` · `"../../x"` -> `"../../../x"` */
const doiDuongDan = (raw) =>
  raw
    .replace(/(from\s+["'])(\.)/g, "$1../$2")
    .replace(/(import\s+["'])(\.)/g, "$1../$2");

/** Quét từ `start` tới khi ngoặc đóng hết (bỏ qua chuỗi + chú thích).
 *  Ca khai báo MỘT DÒNG (`const card = CARD_STYLE;`) phải được nhận ra TRƯỚC khi quét ngoặc —
 *  không thì bộ quét chạy lố sang tận khối `{...}` của khai báo KẾ TIẾP và nuốt mất mấy dòng. */
function cuoiKhoi(start) {
  const dongDau = lines[start];
  let d0 = 0, str0 = null, cmt0 = false;
  for (let c = 0; c < dongDau.length; c++) {
    const ch = dongDau[c], nx = dongDau[c + 1];
    if (cmt0) break;
    if (str0) {
      if (ch === "\\") { c++; continue; }
      if (ch === str0) str0 = null;
      continue;
    }
    if (ch === "/" && nx === "/") { cmt0 = true; break; }
    if (ch === '"' || ch === "'" || ch === "`") { str0 = ch; continue; }
    if (ch === "{" || ch === "[" || ch === "(") d0++;
    else if (ch === "}" || ch === "]" || ch === ")") d0--;
  }
  if (d0 === 0 && /;\s*$/.test(dongDau)) return start;

  let depth = 0, batDau = false, inStr = null, inLineCmt = false, inBlockCmt = false;
  for (let k = start; k < lines.length; k++) {
    const s = lines[k];
    for (let c = 0; c < s.length; c++) {
      const ch = s[c], nx = s[c + 1];
      if (inLineCmt) break;
      if (inBlockCmt) {
        if (ch === "*" && nx === "/") { inBlockCmt = false; c++; }
        continue;
      }
      if (inStr) {
        if (ch === "\\") { c++; continue; }
        if (ch === inStr) inStr = null;
        continue;
      }
      if (ch === "/" && nx === "/") { inLineCmt = true; break; }
      if (ch === "/" && nx === "*") { inBlockCmt = true; c++; continue; }
      if (ch === '"' || ch === "'" || ch === "`") { inStr = ch; continue; }
      if (ch === "{" || ch === "[" || ch === "(") { depth++; batDau = true; }
      else if (ch === "}" || ch === "]" || ch === ")") { depth--; }
    }
    inLineCmt = false;
    if (batDau && depth <= 0 && k >= start) return k;
  }
  throw new Error("Không tìm thấy điểm kết thúc khối bắt đầu ở dòng " + (start + 1));
}

// ── 2. Liệt kê các khối cấp cao (chỉ ở cột 0) ───────────────────────────────
const KHAI_BAO = /^(export\s+)?(default\s+)?(async\s+)?(function|const|let|var|class)\s+([A-Za-z_$][\w$]*)/;
const khoi = [];
for (let k = thanFile; k < lines.length; k++) {
  const m = KHAI_BAO.exec(lines[k]);
  if (!m) continue;
  const ten = m[5];
  const end = cuoiKhoi(k);
  khoi.push({ ten, start: k, end, text: lines.slice(k, end + 1).join("\n") });
  k = end;
}

// ── 3. Kiểm tra spec khớp thật ──────────────────────────────────────────────
const theoTen = new Map(khoi.map((b) => [b.ten, b]));
const loi = [];
const daDung = new Set();
for (const g of spec.groups) {
  for (const s of g.symbols) {
    if (!theoTen.has(s)) loi.push(`Không tìm thấy khối tên "${s}" (nhóm ${g.file})`);
    else if (daDung.has(s)) loi.push(`Khối "${s}" bị khai ở 2 nhóm`);
    else daDung.add(s);
  }
}
// Khối cấp cao không được xếp vào nhóm nào => ở lại file gốc
const oLai = khoi.filter((b) => !daDung.has(b.ten)).map((b) => b.ten);
if (loi.length) {
  console.error("✗ Spec sai:\n  " + loi.join("\n  "));
  process.exit(1);
}

// ── 4. Tên dùng chung giữa các file mới ─────────────────────────────────────
const tenCuaNhom = new Map(); // tên khối -> file nhóm
for (const g of spec.groups) g.symbols.forEach((s) => tenCuaNhom.set(s, g.file));

const dungTrong = (text) => {
  const co = new Set();
  for (const m of text.matchAll(/\b[A-Za-z_$][\w$]*\b/g)) co.add(m[0]);
  return co;
};

for (const g of spec.groups) {
  const text = g.symbols.map((s) => theoTen.get(s).text).join("\n\n");
  const co = dungTrong(text);
  g.canImport = [...co]
    .filter((t) => tenCuaNhom.has(t) && tenCuaNhom.get(t) !== g.file)
    .sort();
}

// ── 5. Dò vòng phụ thuộc ────────────────────────────────────────────────────
const canh = new Map(spec.groups.map((g) => [g.file, new Set(g.canImport.map((t) => tenCuaNhom.get(t)))]));
const vong = [];
const dangXet = new Set(), xong = new Set();
const tham = (f, duong) => {
  if (xong.has(f)) return;
  if (dangXet.has(f)) { vong.push([...duong, f].join(" -> ")); return; }
  dangXet.add(f);
  for (const t of canh.get(f) ?? []) tham(t, [...duong, f]);
  dangXet.delete(f);
  xong.add(f);
};
for (const g of spec.groups) tham(g.file, []);
if (vong.length) {
  console.error("✗ Có VÒNG phụ thuộc — hãy gộp nhóm lại:\n  " + vong.join("\n  "));
  process.exit(1);
}

// ── 6. Báo cáo ──────────────────────────────────────────────────────────────
console.log(`Nguồn: ${srcPath} — ${lines.length} dòng · ${khoi.length} khối cấp cao`);
console.log(`Ở lại file gốc: ${oLai.join(", ") || "(không có)"}\n`);
for (const g of spec.groups) {
  const soDong = g.symbols.reduce((s, x) => s + theoTen.get(x).text.split("\n").length, 0);
  console.log(`  → ${join(spec.outDir, g.file)}  (${g.symbols.length} khối · ${soDong} dòng)`);
  console.log(`      khối: ${g.symbols.join(", ")}`);
  if (g.canImport.length) console.log(`      import từ anh em: ${g.canImport.join(", ")}`);
}

if (!GHI) {
  console.log("\n(chạy thử — thêm --ghi để ghi thật)");
  process.exit(0);
}

// ── 7. Ghi ──────────────────────────────────────────────────────────────────
if (!existsSync(spec.outDir)) mkdirSync(spec.outDir, { recursive: true });
copyFileSync(srcPath, srcPath + ".bak");
console.log(`\nĐã sao lưu: ${srcPath}.bak`);

const dauFile = (ten, ghiChu) =>
  `// ${ghiChu}\n// TÁCH RA TỪ: ${relative(dirname(spec.outDir), srcPath).replace(/\\/g, "/")}\n// (di chuyển mã nguyên khối — không sửa nội dung)\n\n`;

for (const g of spec.groups) {
  const dong = [dauFile(g.file, basename(g.file))];
  dong.push(importRaws.map(doiDuongDan).join("\n"));
  if (g.canImport.length) {
    for (const t of g.canImport) dong.push(`import { ${t} } from "./${tenCuaNhom.get(t)}";`);
  }
  dong.push("");
  for (const s of g.symbols) {
    const t = theoTen.get(s).text;
    dong.push(/^export\b/.test(t) ? t : "export " + t);
    dong.push("");
  }
  writeFileSync(join(spec.outDir, g.file), dong.join("\n").replace(/\n{3,}/g, "\n\n"), "utf8");
  console.log(`  ✓ ${join(spec.outDir, g.file)}`);
}

// File gốc: giữ nguyên import + các khối ở lại + import các khối đã chuyển
const bodyGoc = [];
for (const b of khoi) {
  if (daDung.has(b.ten)) continue;
  // giữ luôn chú thích ngay trên khối (nếu có) — cắt từ dòng trước nếu là comment
  let start = b.start;
  while (start - 1 >= 0 && /^\s*(\/\/|\/\*|\*)/.test(lines[start - 1])) start--;
  bodyGoc.push({ start, text: lines.slice(start, b.end + 1).join("\n") });
}
const gocText = bodyGoc.map((b) => b.text).join("\n\n");
const canImportGoc = [...dungTrong(gocText)]
  .filter((t) => tenCuaNhom.has(t))
  .sort();

const dongGoc = ["// File này là PHẦN KHUNG (shell) — các slide/hình đã tách sang thư mục cùng tên."];
if (dauComments.length) dongGoc.push(dauComments.join("\n"));
dongGoc.push(importRaws.join("\n"));
for (const t of canImportGoc) {
  dongGoc.push(`import { ${t} } from "./${basename(spec.outDir)}/${tenCuaNhom.get(t)}";`);
}
// GIỮ NGUYÊN API CÔNG KHAI: khối nào ở file gốc có `export` thì xuất lại y tên đó,
// để mọi chỗ đang `import { X } from ".../GeometryVisuals"` không phải sửa gì.
const xuatLai = new Map(); // file nhóm -> [tên]
for (const b of khoi) {
  if (!daDung.has(b.ten) || !/^export\b/.test(b.text)) continue;
  const f = tenCuaNhom.get(b.ten);
  if (!xuatLai.has(f)) xuatLai.set(f, []);
  xuatLai.get(f).push(b.ten);
}
for (const [f, tens] of xuatLai) {
  dongGoc.push(`export { ${tens.sort().join(", ")} } from "./${basename(spec.outDir)}/${f}";`);
}
dongGoc.push("");
dongGoc.push(gocText);
writeFileSync(srcPath, dongGoc.join("\n").replace(/\n{3,}/g, "\n\n"), "utf8");
console.log(`  ✓ ${srcPath}  (còn ${dongGoc.join("\n").split("\n").length} dòng)`);
console.log(`      import thêm: ${canImportGoc.join(", ") || "(không)"}`);
