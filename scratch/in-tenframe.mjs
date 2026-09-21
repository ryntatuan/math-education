// Liệt kê MỌI ca dùng `tenFrame` trong 5 lớp, kèm chữ của slide, để đối chiếu hình với lời.
//
// Chạy: node scratch/in-tenframe.mjs
//
// Vì sao cần: `extra` được bộ sinh ghi KHÔNG nhất quán — bài `g2-c2-l1` (9 + 4) ghi
// `extra: 3` (phần còn lại NGOÀI khung), còn bài `g2-c2-l2` (8 + 5) ghi `extra: 2`
// (phần BÙ cho đủ 10). Cùng một khoá, hai nghĩa. Muốn sửa cho đúng thì phải nhìn cả
// câu chữ của slide, không chỉ nhìn con số.

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const KHOA_TEXT = ["text", "title", "label", "rule", "explanation"];

for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}`);
  const data = mod[key];
  let dem = 0;
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      for (let i = 0; i < (bai.slides || []).length; i++) {
        const c = bai.slides[i].content || {};
        const tf = c.tenFrame;
        if (!tf || typeof tf !== "object") continue;
        dem++;
        const f = Number(tf.filled) || 0;
        const t = Number(tf.total) || 10;
        const e = Number(tf.extra) || 0;
        const buCan = Math.max(0, t - f);
        const vaoKhung = Math.min(e, buCan);
        const ngoai = e - vaoKhung;
        console.log(
          `\n[${file.replace("Data.js", "")}] ${bai.id} · slide${i} (${bai.slides[i].type})`,
        );
        for (const k of KHOA_TEXT) {
          if (typeof c[k] === "string") console.log(`   .${k}: ${JSON.stringify(c[k])}`);
        }
        console.log(
          `   tenFrame: filled=${f} total=${t} extra=${e} emoji=${tf.emoji} label=${JSON.stringify(tf.label || "")}`,
        );
        console.log(
          `   ⇒ hình vẽ: ${f} ô có sẵn + ${vaoKhung} ô bù trong khung + ${ngoai} ô ngoài = ${f + e} ô`,
        );
      }
    }
  }
  console.log(`\n(${file}: ${dem} ca)`);
}
