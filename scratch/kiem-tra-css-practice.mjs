/**
 * Kiểm: `PracticePage.jsx` có thật sự cần `HomePage.css` không?
 * Chạy: `node scratch/kiem-tra-css-practice.mjs`
 *
 * Vì sao: `PracticePage` đang import cả `HomePage.css` (H-5 trong bản phân tích) ⇒ dễ rò style
 * sang trang khác. Nhưng bỏ import mà không kiểm là cách làm hỏng giao diện ⇒ phải đo trước:
 * lớp nào PracticePage DÙNG mà CHỈ có định nghĩa trong HomePage.css.
 */
import { readFileSync } from "node:fs";

const layLopDung = (p) => {
  const src = readFileSync(p, "utf8");
  const ra = new Set();
  // className="a b c" và className={`a ${x}`}
  for (const m of src.matchAll(/className=\{?["'`]([^"'`]+)["'`]/g))
    for (const t of m[1].split(/[\s${}?:]+/))
      if (/^[a-z][a-z0-9-]*$/i.test(t)) ra.add(t);
  for (const m of src.matchAll(
    /classList\.(?:add|remove|toggle)\(["'`]([^"'`]+)/g,
  ))
    ra.add(m[1]);
  return ra;
};

const layLopDinhNghia = (p) => {
  const css = readFileSync(p, "utf8");
  const ra = new Set();
  for (const m of css.matchAll(/\.([a-z][a-z0-9_-]*)/gi)) ra.add(m[1]);
  return ra;
};

const dung = layLopDung("client/src/pages/PracticePage.jsx");
const coTrongPractice = layLopDinhNghia("client/src/pages/PracticePage.css");
const coTrongHome = layLopDinhNghia("client/src/pages/HomePage.css");
// Lớp dùng chung nằm ở App.css / index.css thì không tính là của HomePage
const coTrongChung = new Set([
  ...layLopDinhNghia("client/src/App.css"),
  ...layLopDinhNghia("client/src/index.css"),
]);

const chiCoOHome = [...dung].filter(
  (c) => coTrongHome.has(c) && !coTrongPractice.has(c) && !coTrongChung.has(c),
);
const khongCoODau = [...dung].filter(
  (c) => !coTrongHome.has(c) && !coTrongPractice.has(c) && !coTrongChung.has(c),
);

console.log(`PracticePage dùng ${dung.size} lớp.`);
console.log(
  `\n① Lớp PracticePage DÙNG và CHỈ có định nghĩa trong HomePage.css (${chiCoOHome.length}):`,
);
console.log(
  chiCoOHome.length
    ? "  " + chiCoOHome.join(", ")
    : "  (không có) ⇒ bỏ import HomePage.css được",
);
console.log(
  `\n② Lớp dùng mà không thấy định nghĩa ở đâu (${khongCoODau.length}):`,
);
console.log(
  khongCoODau.length ? "  " + khongCoODau.join(", ") : "  (không có)",
);
