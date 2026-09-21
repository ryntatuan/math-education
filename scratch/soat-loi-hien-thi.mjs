// Soát 5 lớp tìm các lỗi HIỂN THỊ mà cổng kiểm dữ liệu không bắt được.
//
// Chạy: node scratch/soat-loi-hien-thi.mjs
//
// Ba nhóm lỗi (đều do người dùng NHÌN MÀN HÌNH rồi báo, cổng không báo):
//   A. Câu hỏi nhắc tới một hình ("Hình dưới đây có mấy con chim?") nhưng slide KHÔNG có
//      gì để nhìn — bé không thể trả lời. Cổng chỉ kiểm đáp án ∈ lựa chọn nên không thấy.
//   B. Chữ có xuống dòng trong dữ liệu (`\n`) nhưng HTML gộp thành MỘT hàng ⇒ rối mắt.
//   C. `tenFrame` khai `extra` lớn hơn số ô trống còn lại ⇒ bị KẸP và mất số liệu
//      (9 + 4 vẽ thành "9 + 1", mất luôn phần 3).
//
// Nguyên tắc: in ra ĐỦ để người đọc tự đánh giá, không chỉ đếm — vì đếm đúng mà
// danh sách sai thì vẫn phải mở file ra xem lại.

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

// Từ chỉ HÌNH ẢNH theo kiểu "chỉ tay" — tức câu hỏi bắt buộc phải có hình mới trả lời được.
// ⚠️ Cố ý KHÔNG dùng từ "hình" trần: "Hình tam giác có mấy cạnh?" là câu hỏi kiến thức,
// bé không cần hình. Dùng "hình" trần sẽ sinh hàng loạt báo động giả.
const TRO_HINH =
  /(hình dưới đây|hình bên|hình vẽ|hình sau|trong hình|dưới đây có|quan sát|băng giấy|biểu đồ|sơ đồ|thước|dãy hình|bảng sau|tranh)/i;

const KHOA_HINH = [
  "items",
  "visual",
  "visualDisplay",
  "shape",
  "shapeVisual",
  "clock",
  "gallery",
  "activityGrid",
  "baseTen",
  "tenFrame",
  "numberLine",
  "placeValue",
  "ruler",
  "money",
  "table",
  "planeShape",
  "angle",
  "circleParts",
  "solid",
  "fractionBar",
  "fractionCircle",
  "barModel",
  "motionDiagram",
  "barChart",
  "pieChart",
];

const EM = /[\p{Extended_Pictographic}\uFE0F]/u;

const nhomA = [];
const nhomB = [];
const nhomC = [];
const nhomD = [];
const dem = {
  quiz: 0,
  quizCoHinh: 0,
  slide: 0,
  coVisualDisplay: 0,
  visualSlide: 0,
  visualRong: 0,
};

for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}`);
  const data = mod[key];
  const lop = file.replace("Data.js", "").replace("grade", "Lớp ");

  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      for (let i = 0; i < (bai.slides || []).length; i++) {
        const sl = bai.slides[i];
        const c = sl.content || {};
        dem.slide++;
        if (c.visualDisplay != null) dem.coVisualDisplay++;

        // ---- A. nhắc tới hình mà KHÔNG có hình — xét MỌI loại slide (không chỉ quiz):
        // câu chữ nào trỏ vào một hình không tồn tại thì bé cũng không trả lời được.
        // Chỉ xét `question` và `text`; `rule`/`explanation`/`points` là văn kể nên nhắc
        // tới hình là chuyện thường, đưa vào sẽ sinh báo động giả.
        {
          const q = String(c.question || c.text || "");
          const coEmojiDuoi =
            (q.match(/[\p{Extended_Pictographic}\uFE0F]/gu) || []).length >= 2;
          const coKhoaHinh = KHOA_HINH.some((k) => c[k] != null);
          if (sl.type === "quiz" || sl.type === "dialogue") {
            dem.quiz++;
            if (coKhoaHinh || coEmojiDuoi) dem.quizCoHinh++;
          }
          if (TRO_HINH.test(q) && !coKhoaHinh && !coEmojiDuoi) {
            nhomA.push({
              lop,
              bai: bai.id,
              slide: i,
              q,
              kieu: sl.type,
              khoa: Object.keys(c).join(","),
            });
          }
        }

        // ---- A2. slide kiểu "hình ảnh" mà KHÔNG có hình nào (thẻ "Quan sát" trống)
        if (sl.type === "visual") {
          dem.visualSlide++;
          const coHinh =
            KHOA_HINH.some((k) => c[k] != null && k !== "items") ||
            c.items != null ||
            c.number != null ||
            c.operation != null ||
            c.comparison != null;
          if (!coHinh) {
            dem.visualRong++;
            nhomD.push({
              lop,
              bai: bai.id,
              slide: i,
              text: String(c.text || "").slice(0, 60),
              khoa: Object.keys(c).join(","),
            });
          }
        }

        // ---- B. chữ có xuống dòng
        for (const k of ["text", "title", "rule", "explanation", "question"]) {
          const v = c[k];
          if (typeof v === "string" && v.includes("\n")) {
            nhomB.push({
              lop,
              bai: bai.id,
              slide: i,
              kieu: sl.type,
              k: v.split("\n").length,
              v,
            });
          }
        }

        // ---- C. tenFrame: ĐIỂM SOÁT, không phải lỗi (từ 2026-09-22).
        // `extra` lớn hơn số ô trống là HỢP LỆ: phần bù nằm trong khung, phần dư vẽ
        // thành nhóm riêng bên phải (bộ vẽ đã sửa, trước đây nó KẸP và làm mất ô).
        // Nên đây chỉ là danh sách để ĐỐI CHIẾU LỜI GIẢNG, xem `kiem-tra-sua-loi.mjs`.
        if (c.tenFrame && typeof c.tenFrame === "object") {
          const f = Number(c.tenFrame.filled) || 0;
          const t = Number(c.tenFrame.total) || 10;
          const e = Number(c.tenFrame.extra) || 0;
          if (e > t - f) {
            nhomC.push({
              lop,
              bai: bai.id,
              slide: i,
              tenFrame: c.tenFrame,
              ngoai: e - Math.max(0, t - f),
              tong: f + e,
            });
          }
        }
      }
    }
  }
}

console.log(`\n=== SOÁT ${dem.slide} slide · ${dem.quiz} câu hỏi ===`);
console.log(
  `Slide có khoá 'visualDisplay' (app bài học KHÔNG vẽ khoá này): ${dem.coVisualDisplay}`,
);
console.log(`Câu hỏi CÓ hình để đếm/xem: ${dem.quizCoHinh}/${dem.quiz}`);

console.log(
  `\n--- A. Câu hỏi nhắc tới hình nhưng KHÔNG có hình: ${nhomA.length} ---`,
);
for (const x of nhomA) {
  console.log(`  [${x.lop}] ${x.bai} slide${x.slide} (${x.kieu}) — "${x.q}"`);
  console.log(`        khoá đang có: ${x.khoa}`);
}

console.log(
  `\n--- B. Chữ có xuống dòng trong dữ liệu (HTML gộp 1 hàng): ${nhomB.length} ---`,
);
for (const x of nhomB) {
  console.log(
    `  [${x.lop}] ${x.bai} slide${x.slide} (${x.kieu}) .${x.k} dòng:`,
  );
  console.log(`        ${JSON.stringify(x.v)}`);
}

console.log(
  `\n--- C (ĐIỂM SOÁT, không phải lỗi). tenFrame có ô vẽ NGOÀI khung: ${nhomC.length} ---`,
);
for (const x of nhomC) {
  console.log(
    `  [${x.lop}] ${x.bai} slide${x.slide} — filled=${x.tenFrame.filled} total=${x.tenFrame.total} extra=${x.tenFrame.extra}` +
      ` ⇒ ${x.tong} ô, trong đó ${x.ngoai} ô ngoài khung`,
  );
}

console.log(
  `\nTỔNG: A=${nhomA.length} · B=${nhomB.length} · C=${nhomC.length} · D(visual rỗng)=${nhomD.length}\n`,
);

console.log(
  `--- D. Slide "hình ảnh" KHÔNG có hình nào ⇒ thẻ "Quan sát" trống: ${nhomD.length}/${dem.visualSlide} ---`,
);
for (const x of nhomD) {
  console.log(`  [${x.lop}] ${x.bai} slide${x.slide} — "${x.text}"`);
  console.log(`        khoá đang có: ${x.khoa}`);
}
