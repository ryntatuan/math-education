/**
 * Soát dữ liệu `matchPairs` (script TẠM, chỉ đọc): cột phải phải KHÁC NHAU từng giá trị,
 * cột trái cũng vậy. Vì sao: `matchPairsSlide` tìm cặp theo giá trị phải (`pairs.find(x => x[1] === p)`),
 * nên nếu hai cặp cùng giá trị phải thì thẻ bị đánh dấu “xong” SAI cặp.
 * Chạy: `node scratch/soat-cap-trung.mjs`
 */
const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const chuan = (v) =>
  String(v ?? "")
    .trim()
    .replace(/\s+/g, " ");
let soBai = 0;
let loi = 0;

for (const [file, key] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  for (const ch of g.chapters ?? [])
    for (const b of ch.lessons ?? [])
      (b.slides ?? []).forEach((s, i) => {
        if (s.type !== "matchPairs") return;
        soBai++;
        const cap = s.content?.pairs ?? [];
        const trai = cap.map((c) => chuan(c?.[0]));
        const phai = cap.map((c) => chuan(c?.[1]));
        if (new Set(trai).size !== trai.length)
          console.log(`❌ ${b.id} slide ${i + 1}: cột TRÁI trùng giá trị`);
        if (new Set(phai).size !== phai.length) {
          console.log(`❌ ${b.id} slide ${i + 1}: cột PHẢI trùng giá trị`);
          loi++;
        }
      });
}

console.log(`Đã soát ${soBai} slide matchPairs · ${loi} lỗi.`);
process.exit(loi === 0 ? 0 : 1);
