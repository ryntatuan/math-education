/**
 * Trang XEM TRƯỚC các hình của Chủ đề 1 (Lớp 1) — chỉ để nhìn, không thuộc app.
 * Chạy: esbuild + node (xem ghi chú trong hội thoại), KHÔNG import vào app.
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { NumberScene } from "../client/src/components/visuals/Grade1NumberVisuals.jsx";

const scenes = [
  ["fiveFriends", {}, "Năm bạn của bé (SGK tr.6)"],
  ["numberShow", { kind: "tank" }, "Khám phá 0→5: bể cá + khối (SGK tr.8)"],
  [
    "numberShow",
    { kind: "living" },
    "Khám phá 6→10: ong/chim/hoa/sao biển/bọ rùa (tr.14)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "🐸", n: 3, label: "A" },
        { emoji: "🍃", n: 2, label: "B" },
      ],
    },
    "Nhiều hơn/ít hơn: ếch và lá (tr.20)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "🍬", n: 5, label: "A" },
        { emoji: "🍬", n: 3, label: "B" },
      ],
      paired: true,
    },
    "GHÉP ĐÔI: 5 kẹo và 3 kẹo (tr.20)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "🔌", n: 5, label: "A" },
        { emoji: "🔌", n: 4, label: "B" },
      ],
    },
    "Câu nào đúng: ổ cắm và đồ vật (tr.21)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "✏️", n: 4, label: "A" },
        { emoji: "📓", n: 4, label: "B" },
      ],
    },
    "Bằng nhau: 4 bút và 4 vở (tr.28)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "🫘", n: 3, label: "A" },
        { emoji: "🫘", n: 5, label: "B" },
        { emoji: "🫘", n: 4, label: "C" },
        { emoji: "🫘", n: 2, label: "D" },
      ],
    },
    "Cốc nào nhiều hạt sen nhất (tr.41)",
  ],
  [
    "manyGroups",
    {
      groups: [
        { emoji: "🐟", n: 3, label: "Mai" },
        { emoji: "🐟", n: 2, label: "Nam" },
      ],
    },
    "Mấy và mấy: 3 cá và 2 cá (tr.32)",
  ],
  [
    "manyGroups",
    {
      groups: [{ emoji: "🐦", n: 7 }],
      unit: "Chọn số thích hợp với số con vật",
    },
    "Chọn số: 7 con chim (tr.18)",
  ],
  [
    "addToReach",
    { have: 5, target: 8, a: 2, b: 3, emoji: "🥚" },
    "Cho thêm trứng để khay có 8 quả (tr.18)",
  ],
  [
    "addToReach",
    { have: 4, target: 6, a: 1, b: 2, emoji: "🍪" },
    "Cho thêm bánh để đĩa có 6 cái (tr.15)",
  ],
  [
    "addToReach",
    { have: 1, target: 3, a: 1, b: 2, emoji: "📦" },
    "Cho thêm thùng để xe có 3 thùng (tr.12)",
  ],
  [
    "addToReach",
    { have: 2, target: 4, a: 2, b: 3, emoji: "🥕" },
    "Cho thêm cà rốt để bằng số bắp cải (tr.23)",
  ],
  [
    "countFiltered",
    { kind: "colored", cols: 6, colored: [0, 2, 4] },
    "Đếm cà rốt đã tô màu (tr.11) — đáp án 3",
  ],
  [
    "countFiltered",
    { kind: "labeled", labels: [1, 4, 5, 2, 2, 1, 2, 3, 0] },
    "Đếm con gà ghi số 2 (tr.11) — đáp án 3",
  ],
  [
    "countFiltered",
    {
      kind: "legs",
      kinds: ["ladybug", "beetle", "spider", "beetle", "beetle"],
    },
    "Đếm con vật 6 chân (tr.17) — đáp án 4",
  ],
  [
    "sceneCount",
    {
      kind: "farm",
      legend: [
        { emoji: "🐄" },
        { emoji: "🐔" },
        { emoji: "🌻" },
        { emoji: "☁️" },
        { emoji: "☀️" },
        { emoji: "🐟" },
      ],
    },
    "Đếm trong tranh: nông trại (tr.13)",
  ],
  [
    "sceneCount",
    {
      kind: "pond",
      legend: [
        { emoji: "🐰" },
        { emoji: "🌳" },
        { emoji: "🦆" },
        { emoji: "☁️" },
        { emoji: "🐦" },
      ],
    },
    "Đếm trong tranh: ao (tr.17)",
  ],
  [
    "sceneCount",
    {
      kind: "river",
      legend: [
        { emoji: "🛶" },
        { emoji: "🌴" },
        { emoji: "🏠" },
        { emoji: "🐟" },
      ],
    },
    "Đếm trong tranh: bến sông (tr.39)",
  ],
  [
    "sceneCount",
    {
      kind: "field",
      legend: [
        { emoji: "🐃" },
        { emoji: "🏠" },
        { emoji: "🌾" },
        { emoji: "☀️" },
        { emoji: "☁️" },
      ],
    },
    "Đếm trong tranh: cánh đồng (tr.40)",
  ],
  [
    "numberTrain",
    { kind: "ribbon", numbers: [0, 1, null, null, 4, 5, 6, null, 8, 9, null] },
    "Dãy số 0→10 có ô trống (tr.10, 16)",
  ],
  [
    "numberTrain",
    {
      kind: "wagons",
      rows: [
        [2, 3, 4, "?"],
        [3, "?", 5],
        [4, "?", 6],
        [7, "?", 9],
        [8, "?", 10],
        [0, "?", 2],
      ],
    },
    "Sáu đoàn tàu điền số (tr.40)",
  ],
  [
    "numberBond",
    { kind: "bond", total: 5, left: 2 },
    "Tách 5: 5 gồm 2 và ? (tr.32)",
  ],
  ["numberBond", { kind: "bond", total: 6 }, "Tách 6 thành hai nhóm (tr.35)"],
  [
    "numberBond",
    { kind: "table", total: 6, parts: [1, 2, 3] },
    "Bảng tách số 6 (tr.45)",
  ],
  [
    "numberBond",
    { kind: "table", total: 9, parts: [1, 2, 3] },
    "Bảng tách số 9 (tr.45)",
  ],
  [
    "matchEqual",
    {
      pairs: [
        [
          { emoji: "🍚", n: 1 },
          { emoji: "🥣", n: 1 },
        ],
        [
          { emoji: "🦆", n: 5 },
          { emoji: "🌊", n: 5 },
        ],
        [
          { emoji: "🥄", n: 1 },
          { emoji: "🍜", n: 1 },
        ],
        [
          { emoji: "🐖", n: 4 },
          { emoji: "🐷", n: 4 },
        ],
      ],
    },
    "Nối nhóm bằng nhau (tr.28) — hàng đầu là mẫu",
  ],
  [
    "numberMaze",
    {
      grid: [
        [6, 4, 3, 2, 1, 0],
        [7, 5, 3, 4, 2, 1],
        [4, 8, 6, 5, 3, 2],
        [3, 9, 5, 6, 4, 3],
        [2, 10, 7, 9, 5, 4],
        [1, 4, 3, 8, 6, 5],
      ],
    },
    "Mê cung số > 4 (tr.25)",
  ],
  ["dotCards", { left: 5, right: 5, sign: "=" }, "Thẻ chấm mẫu: 5 = 5 (tr.30)"],
  ["dotCards", { left: 3, right: 5 }, "Thẻ chấm: 3 ? 5 (tr.30)"],
  [
    "comparePairs",
    {
      pairs: [
        [5, 2],
        [3, 4],
        [6, 6],
        [4, 7],
      ],
      model: ">",
    },
    "So sánh theo mẫu (tr.42)",
  ],
];

const batches = [
  [0, 4],
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 20],
  [20, 24],
  [24, 28],
  [28, 32],
];

const body = renderToStaticMarkup(
  <>
    {batches.map(([tu, den], b) => (
      <div className="batch" key={b}>
        {scenes.slice(tu, den).map(([mode, props, title], i) => (
          <div className="cell" key={i}>
            <h3>
              {tu + i + 1}. {title}
            </h3>
            <div className="phone">
              <NumberScene mode={mode} {...props} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </>,
);

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Xem trước hình Chủ đề 1 — Lớp 1</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;background:#f1f5f9;font-family:"Segoe UI",system-ui,sans-serif;color:#0f172a}
  h1{font-size:19px;margin:0;padding:16px 16px 4px}
  p.lead{margin:0;padding:0 16px 14px;color:#475569;font-size:13px}
  .batch{width:1640px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;padding:0 16px 24px;align-items:start}
  .cell{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:10px;display:block;overflow:hidden}
  .cell h3{font-size:12.5px;margin:0 0 8px;color:#334155;font-weight:700;line-height:1.35}
  .phone{width:375px;max-width:100%}
</style></head>
<body>
<h1>Xem trước ${scenes.length} hình — Chủ đề 1, Lớp 1</h1>
<p class="lead">Mỗi hình đặt trong khung rộng 375 px (≈ màn hình điện thoại). Chưa có nội dung bài học — đây chỉ là phần HÌNH.</p>
${body}
</body></html>`;

// Sau khi bundle sang CJS, `import.meta.url` là `undefined` ⇒ dùng `__dirname`.
const out = path.join(__dirname, "xem-truoc-cd1.html");
fs.writeFileSync(out, html, "utf8");
console.log("DA GHI: " + out + " (" + html.length + " ky tu)");
