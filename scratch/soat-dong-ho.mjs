/**
 * Soi MỌI slide có `clock` — in ra giờ hình vẽ và chữ của slide để đối chiếu bằng mắt.
 * Chạy: `node scratch/soat-dong-ho.mjs`
 */
const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

const rows = [];
for (const [file, key, lop] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  for (const ch of g.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        const c = s.content ?? {};
        if (!c.clock) return;
        const chu = String(c.text ?? c.question ?? "").split("\n")[0];
        rows.push({
          lop,
          bai: bai.id,
          slide: i,
          kieu: s.type,
          hinh: `${c.clock.hour}:${String(c.clock.minute ?? 0).padStart(2, "0")}`,
          timeText: c.clock.timeText ?? "",
          chu,
        });
      });
    }
  }
}

console.log(`${rows.length} slide có mặt đồng hồ\n`);
for (const r of rows) {
  const gioTrongChu = [
    ...new Set(
      [...String(r.chu + " " + r.timeText).matchAll(/(\d{1,2})\s*giờ/g)].map(
        (m) => m[1],
      ),
    ),
  ];
  const co = gioTrongChu.length
    ? gioTrongChu.join("/") + " giờ"
    : "(chữ không nêu giờ)";
  console.log(
    `L${r.lop} ${r.bai} #${r.slide} [${r.kieu}] hình=${r.hinh} · chữ=${co} :: ${r.chu.slice(0, 70)}`,
  );
}
