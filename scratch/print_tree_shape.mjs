// In ra ĐÚNG tập khoá của grade / chapter / lesson trong file tĩnh.
// Chạy: node scratch/print_tree_shape.mjs
//
// VÌ SAO CẦN ĐO: lát 3d dựng lại cây này TỪ DB. Nếu cây dựng ra thiếu một khoá mà
// giao diện đang đọc thì không có lỗi nào hiện ra — chỉ là một chỗ nào đó hiện
// `undefined`. Nên phải biết chính xác hình dạng đang dùng, không đoán.
const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const khoa = (ds) => [...new Set(ds.flatMap((o) => Object.keys(o)))].sort();
const dem = (ds) => {
  const m = new Map();
  for (const o of ds)
    for (const k of Object.keys(o)) m.set(k, (m.get(k) ?? 0) + 1);
  return m;
};

const grades = [];
for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}`);
  grades.push(...[mod[key]]);
}
const chapters = grades.flatMap((g) => g.chapters);
const lessons = chapters.flatMap((c) => c.lessons);

const inRa = (ten, objs) => {
  const d = dem(objs);
  console.log(`\n${ten} — ${objs.length} đối tượng`);
  for (const k of khoa(objs))
    console.log(
      `  ${k.padEnd(16)} ${String(d.get(k)).padStart(4)}/${objs.length}` +
        (d.get(k) === objs.length ? "  (100%)" : ""),
    );
};

inRa("GRADE", grades);
inRa("CHAPTER", chapters);
inRa("LESSON", lessons);

// Kiểu của vài trường hay dùng, để map từ DB cho đúng
const l0 = lessons[0];
console.log("\nVí dụ một lesson: id=%s", l0.id);
for (const [k, v] of Object.entries(l0)) {
  console.log(
    `   ${k}: ${Array.isArray(v) ? `array(${v.length})` : typeof v}` +
      (typeof v === "string" ? ` = "${v.slice(0, 40)}"` : ""),
  );
}
console.log(
  "\nCác giá trị `type/lessonType` gặp trong lesson:",
  JSON.stringify([...new Set(lessons.map((l) => l.type ?? l.lessonType))]),
);
