/**
 * Đếm số slide của vài bài (script TẠM, chỉ đọc).
 * Chạy: `node scratch/dem-slide.mjs g3-c8-l8 g3-c9-l1`
 */
const NGUON = {
  1: ["grade1Data.js", "grade1Data"],
  2: ["grade2Data.js", "grade2Data"],
  3: ["grade3Data.js", "grade3Data"],
  4: ["grade4Data.js", "grade4Data"],
  5: ["grade5Data.js", "grade5Data"],
};

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

for (const id of process.argv.slice(2)) {
  const lop = Number(id.match(/^g(\d)/)[1]);
  const du = await layDu(lop);
  let bai = null;
  for (const ch of du.chapters ?? [])
    for (const b of ch.lessons ?? []) if (b.id === id) bai = b;
  if (!bai) {
    console.log(`❌ không thấy ${id}`);
    continue;
  }
  const kieu = (bai.slides ?? []).map((s) => s.type);
  console.log(
    `${id} · "${bai.title}" · ${kieu.length} slide: ${kieu.join(", ")}`,
  );
}
