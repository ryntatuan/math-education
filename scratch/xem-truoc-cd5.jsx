/**
 * Trang XEM TRƯỚC **Chủ đề 5 Lớp 1** (Ôn tập học kì 1) — chỉ để nhìn, không thuộc app.
 * (Bản mẫu dùng chung: đổi `g1c5`/tên file để soi chương khác.)
 *
 * Dựng: `npx esbuild scratch/xem-truoc-cd5.jsx --bundle --platform=node --format=cjs --jsx=automatic --outfile=scratch/xem-truoc-cd5.cjs`
 *        `node scratch/xem-truoc-cd5.cjs`  ⇒ ghi `scratch/xem-truoc-cd5.html`
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import fs from "node:fs";
import VisualBlocks from "../client/src/components/visuals/VisualBlock.jsx";
import { g1c5 } from "../client/src/data/grade1/g1c5.js";

const cards = [];
for (const bai of g1c5.lessons) {
  bai.slides.forEach((s, i) => {
    const c = s.content ?? {};
    const chu = c.text ?? c.question ?? c.title ?? "";
    cards.push(`
      <div class="slide ${s.type}" id="slide-${bai.id}-${i}">
        <div class="dau">
          <span class="bai">${bai.title}</span>
          <span class="so">slide ${i + 1}/${bai.slides.length}</span>
          <span class="kieu">${s.type}</span>
        </div>
        ${c.badge ? `<div class="badge">${c.badge}</div>` : ""}
        ${c.title && s.type === "concept" ? `<h3>${c.title}</h3>` : ""}
        <p class="chu">${String(chu).replace(/\n/g, "<br>")}</p>
        ${c.explanation ? `<p class="giai">${c.explanation}</p>` : ""}
        ${c.rule ? `<p class="rule">${c.rule}</p>` : ""}
        ${Array.isArray(c.points) ? `<ul>${c.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : ""}
        <div class="hinh">${renderToStaticMarkup(<VisualBlocks content={c} />)}</div>
        ${Array.isArray(c.options) ? `<div class="chon">${c.options.map((o) => `<span${o === c.answer ? ' class="dung"' : ""}>${o}</span>`).join("")}</div>` : ""}
        ${c.mascotHint ? `<p class="hint">Gợi ý: ${c.mascotHint}</p>` : ""}
      </div>`);
  });
}

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>Xem trước Chủ đề 5 — Lớp 1</title>
<style>
  body{font:15px/1.5 system-ui,Segoe UI,sans-serif;margin:0;padding:16px;background:#f1f5f9;color:#0f172a}
  h1{font-size:22px}
  .wrap{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}
  .slide{background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:12px;width:360px}
  .slide.quiz{border-color:#a5b4fc}
  .slide.concept{border-color:#86efac}
  .dau{display:flex;gap:8px;font-size:12px;color:#475569;margin-bottom:6px;flex-wrap:wrap}
  .kieu{background:#e2e8f0;border-radius:999px;padding:1px 8px}
  .bai{font-weight:700}
  .badge{display:inline-block;background:#ede9fe;color:#5b21b6;border-radius:999px;padding:1px 10px;font-size:12px;font-weight:700}
  h3{margin:6px 0;font-size:16px}
  .chu{margin:6px 0;font-weight:600}
  .giai,.rule{margin:4px 0;background:#f8fafc;border-left:3px solid #cbd5e1;padding:4px 8px;font-size:14px}
  ul{margin:6px 0 6px 18px;padding:0;font-size:14px}
  .hinh{display:flex;justify-content:center;margin:8px 0}
  .chon{display:flex;flex-wrap:wrap;gap:6px}
  .chon span{border:1px solid #cbd5e1;border-radius:8px;padding:3px 10px;font-size:13px}
  .chon span.dung{border-color:#16a34a;background:#dcfce7;font-weight:700}
  .hint{font-size:13px;color:#475569;margin:6px 0 0}
</style></head><body>
<h1>Xem trước Chủ đề 5 Lớp 1 — Ôn tập học kì 1</h1>
<p>${g1c5.lessons.length} bài · ${cards.length} slide · ô <span style="background:#dcfce7;border:1px solid #16a34a;padding:0 6px">xanh</span> = đáp án đúng.</p>
<div class="wrap">${cards.join("")}</div>
</body></html>`;

fs.writeFileSync("scratch/xem-truoc-cd5.html", html, "utf8");
console.log(`Đã ghi scratch/xem-truoc-cd5.html (${cards.length} slide)`);
