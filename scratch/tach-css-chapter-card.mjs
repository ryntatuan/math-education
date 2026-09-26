/**
 * Tách các lớp “thẻ chương” khỏi `HomePage.css` ra file dùng chung.
 *
 * VÌ SAO: `PracticePage.jsx` đang `import "./HomePage.css"` (H-5 trong bản phân tích).
 * Đo bằng `scratch/kiem-tra-css-practice.mjs`: PracticePage DÙNG 9 lớp chỉ có định nghĩa trong
 * HomePage.css ⇒ **không thể bỏ import trắng trợn** (sẽ hỏng giao diện). Cách đúng: đưa 9 lớp đó
 * sang `client/src/styles/chapter-cards.css` rồi cả hai trang cùng import file chung.
 *
 * Chạy: `node scratch/tach-css-chapter-card.mjs` (xem trước) · `--ghi` (ghi thật)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const GHI = process.argv.includes("--ghi");
const LOP = [
  "learning-main-column",
  "home-chapter-card",
  "chapter-card-icon",
  "chapter-card-info",
  "chapter-card-header",
  "chapter-tag-badge",
  "chapter-card-title",
  "chapter-card-desc",
  "chapter-card-footer",
];
const NGUON = "client/src/pages/HomePage.css";
const DICH = "client/src/styles/chapter-cards.css";

const css = readFileSync(NGUON, "utf8");

/** Cắt CSS thành các khối theo dấu ngoặc (bỏ qua chuỗi và @media lồng nhau thì giữ nguyên khối). */
const khoi = [];
let i = 0;
let batDau = 0;
while (i < css.length) {
  if (css[i] === "{") {
    // lùi về đầu selector: từ `batDau` tới `{`
    let sau = 1;
    let j = i + 1;
    while (j < css.length && sau > 0) {
      if (css[j] === "{") sau += 1;
      else if (css[j] === "}") sau -= 1;
      j += 1;
    }
    khoi.push({ text: css.slice(batDau, j), dau: batDau, cuoi: j });
    batDau = j;
    i = j;
    continue;
  }
  i += 1;
}

const thuoc = (sel) =>
  LOP.some((c) => new RegExp(`\\.${c}(?![a-z0-9_-])`, "i").test(sel));

/** Cắt thân một khối thành các quy tắc con (dùng cho @media). */
const catQuyTac = (than) => {
  const ra = [];
  let i = 0;
  let batDau = 0;
  while (i < than.length) {
    if (than[i] === "{") {
      let sau = 1;
      let j = i + 1;
      while (j < than.length && sau > 0) {
        if (than[j] === "{") sau += 1;
        else if (than[j] === "}") sau -= 1;
        j += 1;
      }
      ra.push(than.slice(batDau, j));
      batDau = j;
      i = j;
      continue;
    }
    i += 1;
  }
  return ra;
};

// Khối thường: chuyển cả khối nếu selector có lớp cần chuyển.
// Khối @media: cắt bên trong, chỉ chuyển những quy tắc thuộc 9 lớp (giữ nguyên điều kiện media).
//   ⚠️ Bỏ qua bước này thì bản `@media` của các lớp đó bị kẹt lại trong HomePage.css ⇒
//   PracticePage mất style responsive (đã mắc thật ở lần chạy đầu).
const chon = [];
const conLai = [];
for (const k of khoi) {
  const sel = k.text.slice(0, k.text.indexOf("{")).trim();
  if (/^@media/i.test(sel)) {
    const mo = k.text.indexOf("{");
    const than = k.text.slice(mo + 1, k.text.lastIndexOf("}"));
    const quyTac = catQuyTac(than);
    const chuyen = quyTac.filter((q) => thuoc(q.slice(0, q.indexOf("{"))));
    const giu = quyTac.filter((q) => !thuoc(q.slice(0, q.indexOf("{"))));
    if (chuyen.length)
      chon.push({
        text: `${sel} {\n${chuyen.map((q) => q.trim()).join("\n\n")}\n}`,
      });
    if (giu.length)
      conLai.push({
        text: `${sel} {\n${giu.map((q) => q.trim()).join("\n\n")}\n}`,
      });
    continue;
  }
  if (thuoc(sel)) chon.push({ text: k.text });
  else conLai.push({ text: k.text });
}

console.log(
  `HomePage.css: ${khoi.length} khối · chuyển ${chon.length} khối sang ${DICH}`,
);
console.log("Các selector được chuyển:");
for (const k of chon)
  console.log(
    "  · " + k.text.slice(0, k.text.indexOf("{")).trim().slice(0, 90),
  );
console.log("\nCòn lại trong HomePage.css: " + conLai.length + " khối");

if (GHI) {
  if (!existsSync("client/src/styles"))
    mkdirSync("client/src/styles", { recursive: true });
  const dau =
    "/* ============================================================\n" +
    "   THẺ CHƯƠNG — CSS DÙNG CHUNG cho HomePage & PracticePage\n" +
    "   Tách ra khỏi HomePage.css (H-5): PracticePage trước đây import\n" +
    "   HomePage.css nên dễ rò style sang nhau.\n" +
    "   ============================================================ */\n\n";
  writeFileSync(
    DICH,
    dau + chon.map((k) => k.text.trim()).join("\n\n") + "\n",
    "utf8",
  );
  writeFileSync(
    NGUON,
    conLai.map((k) => k.text.trim()).join("\n\n") + "\n",
    "utf8",
  );
  console.log("\n✅ ĐÃ GHI 2 file.");
}
