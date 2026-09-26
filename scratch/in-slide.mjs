/**
 * IN NGUYÊN VĂN nội dung vài slide theo `bai#slide` — để soi bộ soát có báo oan không.
 * Chạy: `node scratch/in-slide.mjs g2-c2-l1#3 g1-c3-l4#3`
 */
const NGUON = {
  1: ["grade1Data.js", "grade1Data"],
  2: ["grade2Data.js", "grade2Data"],
  3: ["grade3Data.js", "grade3Data"],
  4: ["grade4Data.js", "grade4Data"],
  5: ["grade5Data.js", "grade5Data"],
};

const can = process.argv.slice(2);
const daNap = new Map();
const layDu = async (lop) => {
  if (daNap.has(lop)) return daNap.get(lop);
  const [file, key] = NGUON[lop];
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  daNap.set(lop, mod[key]);
  return mod[key];
};

for (const c of can) {
  const [id, soSlide] = c.split("#");
  const lop = Number(id.match(/^g(\d)/)[1]);
  const du = await layDu(lop);
  let thay = null;
  for (const ch of du.chapters ?? [])
    for (const bai of ch.lessons ?? []) if (bai.id === id) thay = bai;
  if (!thay) {
    console.log(`❌ không thấy ${id}`);
    continue;
  }
  const i = Number(soSlide) - 1;
  console.log(
    `\n===== ${id} · slide ${soSlide} (${thay.slides[i]?.type}) =====`,
  );
  console.log(JSON.stringify(thay.slides[i]?.content ?? {}, null, 2));
}
