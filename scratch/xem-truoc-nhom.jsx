/**
 * Xem trước bộ hình `groupScene` với ĐÚNG 22 ca sẽ dùng để thay `tenFrame`/`items`
 * ở Lớp 1–4 (danh sách ca: xem `scratch/ra-tenframe.txt` + `scratch/ra-items-nghi-ngo.txt`).
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { GroupScene } from "../client/src/components/visuals/GroupVisuals.jsx";

const scenes = [
  [
    "sumGroups",
    {
      groups: [
        { emoji: "🎈", n: 3 },
        { emoji: "🎈", n: 2 },
      ],
      result: 5,
    },
    "g1-c3-l1 · 3 quả + 2 quả = 5 quả",
  ],
  [
    "takeAway",
    { emoji: "🍬", total: 6, remove: 2 },
    "g1-c3-l5 · 6 cái kẹo bớt 2 còn ?",
  ],
  [
    "takeAway",
    { emoji: "🍬", total: 6, remove: 2, showLeft: true },
    "g1-c3-l5 · (bản có đáp án — chỉ để đối chiếu)",
  ],
  [
    "makeTen",
    { a: 9, b: 1, c: 3, eq: "9 + 4 = 9 + 1 + 3" },
    "g2-c2-l1 · 9 + 4 gộp đủ 10 còn 3",
  ],
  [
    "makeTen",
    { a: 8, b: 2, c: 3, eq: "8 + 5 = 8 + 2 + 3" },
    "g2-c2-l2 · 8 + 5 gộp đủ 10 còn 3",
  ],
  [
    "makeTen",
    { a: 6, b: 4, c: 3, eq: "6 + 7 = 6 + 4 + 3" },
    "g2-c2-l4 · 6 + 7 gộp đủ 10 còn 3",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 3,
      k: 2,
      emoji: "🍊",
      captionText: "3 khay, mỗi khay 2 quả: 2 × 3 = 6",
    },
    "g2-c8-l1 · 3 khay × 2 quả",
  ],
  [
    "equalGroups",
    {
      kind: "parts",
      partKind: "claw",
      n: 7,
      k: 2,
      captionText: "7 con cua × 2 càng = 14 cái càng",
    },
    "g2-c8-l6 · 7 con cua × 2 càng",
  ],
  [
    "equalGroups",
    {
      kind: "parts",
      partKind: "wing",
      n: 5,
      k: 2,
      captionText: "5 con chim × 2 cánh = 10 cái cánh",
    },
    "g2-c8-l4 · 5 con chim × 2 cánh",
  ],
  [
    "equalGroups",
    {
      kind: "parts",
      partKind: "wheel",
      n: 3,
      wheels: [3, 3, 3],
      captionText: "3 chiếc xe × 3 bánh = 9 bánh xe",
    },
    "g3-c1-l7 · xe đạp 3 bánh",
  ],
  [
    "equalGroups",
    {
      kind: "parts",
      partKind: "box",
      n: 3,
      k: 6,
      captionText: "3 hộp × 6 bút = 18 chiếc bút",
    },
    "g3-c2-l1 · mỗi hộp 6 bút chì",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 2,
      k: 5,
      emoji: "🍊",
      hidePerGroup: true,
      pile: 10,
      captionText: "quả cam",
    },
    "g2-c8-l10 · 10 quả chia đều 2 đĩa",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 2,
      k: 3,
      emoji: "🍬",
      hidePerGroup: true,
      pile: 6,
      captionText: "cái kẹo",
    },
    "g2-c8-l10 · 6 kẹo chia đều 2 bạn",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 2,
      k: 8,
      emoji: "🍎",
      hidePerGroup: true,
      pile: 16,
      captionText: "quả táo",
    },
    "g2-c8-l13 · 16 táo chia đều 2 đĩa",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 3,
      k: 4,
      emoji: "🍬",
      hidePerGroup: true,
      pile: 12,
      captionText: "cái kẹo",
    },
    "g3-c1-l8 · 12 kẹo chia đều 3 bạn",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 4,
      k: 5,
      emoji: "⚽",
      hidePerGroup: true,
      pile: 20,
      captionText: "quả bóng",
    },
    "g3-c1-l10 · 20 bóng chia đều 4 rổ",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 7,
      k: 5,
      emoji: "🍊",
      hidePerGroup: true,
      pile: 35,
      captionText: "quả cam",
    },
    "g3-c2-l4 · 35 cam chia đều 7 đĩa",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 8,
      k: 6,
      emoji: "🍬",
      hidePerGroup: true,
      pile: 48,
      captionText: "chiếc kẹo",
    },
    "g3-c2-l6 · 48 kẹo chia đều 8 túi",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 5,
      k: 2,
      emoji: "🍊",
      captionText: "5 đĩa, mỗi đĩa 2 quả: 2 × 5 = 10",
    },
    "g2-c14-l8 · 5 đĩa × 2 quả",
  ],
  [
    "unknownGroups",
    { emoji: "🌼", per: 5, captionText: "Có 45 bông hoa cúc, mỗi bó 5 bông" },
    "g2-c8-l14 · 45 bông, mỗi bó 5",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 4,
      k: 8,
      emoji: "🍊",
      hidePerGroup: true,
      pile: 32,
      captionText: "quả cam",
    },
    "g3-c1-l10 · 32 cam chia đều 4 đĩa",
  ],
  [
    "equalGroups",
    {
      kind: "trays",
      n: 2,
      k: 9,
      emoji: "🍬",
      hidePerGroup: true,
      pile: 18,
      captionText: "cái kẹo",
    },
    "g2-c14-l4 · 18 kẹo chia đều 2 bạn",
  ],
];

const batches = [
  [0, 4],
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 20],
  [20, 22],
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
              <GroupScene mode={mode} {...props} />
            </div>
          </div>
        ))}
      </div>
    ))}
  </>,
);

const html = `<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<title>Xem trước hình nhóm — thay tenFrame</title>
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
<h1>Xem trước ${scenes.length} hình nhóm (thay tenFrame)</h1>
<p class="lead">Mỗi hình trong khung 375 px. So với lời của bài để kiểm hình có nói ĐÚNG ý không.</p>
${body}
</body></html>`;

const out = path.join(__dirname, "xem-truoc-nhom.html");
fs.writeFileSync(out, html, "utf8");
console.log("DA GHI: " + out + " (" + html.length + " ky tu)");
