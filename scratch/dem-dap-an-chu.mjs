/**
 * ĐO: bao nhiêu câu hỏi có ĐÁP ÁN DẠNG CHỮ (cần căn trái) so với đáp án SỐ/KÝ HIỆU.
 *
 *   node scratch/dem-dap-an-chu.mjs
 *
 * Vì sao cần: người dùng phản hồi 2026-09-28 "câu trả lời căn giữa quá xấu" kèm ảnh một câu
 * hỏi có 4 phương án là CÂU CHỮ. Trước khi đổi luật căn lề phải biết phạm vi thật: đáp án chữ
 * nằm ở kiểu slide nào, ở lớp nào, và có bao nhiêu — để không đổi nhầm cả những ô chỉ chứa số
 * (số căn giữa mới đúng, căn trái sẽ lệch).
 */
const LOP = [
  "grade1Data",
  "grade2Data",
  "grade3Data",
  "grade4Data",
  "grade5Data",
];
const CO_CHU = /[A-Za-zÀ-ỹ]/;

const mods = await Promise.all(
  LOP.map((n) => import(`../client/src/data/${n}.js`)),
);

const theoKieu = new Map();
const viDu = [];
let tong = 0;
let coChu = 0;

for (const mod of mods) {
  const g = Object.values(mod)[0];
  for (const c of g.chapters) {
    for (const l of c.lessons) {
      for (const s of l.slides) {
        const o = s.content?.options;
        if (!Array.isArray(o)) continue;
        tong++;
        if (!o.some((x) => CO_CHU.test(String(x)))) continue;
        coChu++;
        const k = `${s.type}`;
        theoKieu.set(k, (theoKieu.get(k) || 0) + 1);
        if (viDu.length < 8)
          viDu.push(`${l.id} · ${k}: ${o.join(" | ").slice(0, 90)}`);
      }
    }
  }
}

console.log(
  `Câu hỏi có \`options\`: ${tong} · trong đó có ĐÁP ÁN CHỮ: ${coChu}`,
);
console.log(
  "Theo kiểu slide:",
  [...theoKieu].map(([k, v]) => `${k}=${v}`).join(" · "),
);
console.log("Ví dụ:");
for (const v of viDu) console.log("  •", v);
