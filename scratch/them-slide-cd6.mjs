/**
 * CHÈN SLIDE CHỦ ĐỀ 6 (Lớp 1) — chạy: `node scratch/them-slide-cd6.mjs --ghi`
 *
 * Vì sao viết script thay vì sửa tay: 13 slide trải trên 5 bài, mỗi slide là một object JSX
 * dài; sửa tay bằng công cụ soạn thảo rất dễ lệch dấu phẩy/ngoặc (đã từng làm vỡ file dữ liệu
 * hai lần — xem ghi chú cũ). Script **dừng và KHÔNG ghi** nếu không tìm thấy bài hoặc không
 * tìm thấy slide `summary` để chèn trước.
 *
 * Nguồn: ảnh SGK tập 2 — sách tr.14 (LT1 bảng 100 số · LT2 “gồm mấy chục, mấy đơn vị”),
 * tr.15 (trò chơi “Cánh cụt câu cá”), tr.21 (bài toán lớp 1A/1B/1C), tr.22 (“Tìm số còn thiếu”
 * trong bảng 100 số), tr.23 (3 dãy “Số ?” + câu hỏi bảng 100 số), tr.25 (luyện tập chung).
 * Ảnh = `page-00(sách+1).png`; đã NHÌN ảnh tr.5, 6, 14, 15, 23.
 */
import fs from "node:fs";

const DUONG = "client/src/data/grade1/g1c6.js";
const GHI = process.argv.includes("--ghi");

const laOTrong = (v) => v === null || v === "?";

/** Slide mới, gom theo bài. Mọi slide đều CHÈN TRƯỚC slide `summary` của bài đó. */
const THEM = {
  "g1-c6-l4": [
    {
      type: "visual",
      content: {
        text: "Số ? — mỗi số gồm mấy chục và mấy đơn vị (SGK tr.14)",
        bangTinh: {
          headers: ["Đọc chục và đơn vị", "Viết số"],
          rows: [
            ["Số gồm 3 chục và 7 đơn vị", null],
            ["Số gồm 5 chục và 0 đơn vị", null],
            ["Số gồm 8 chục và 4 đơn vị", null],
          ],
          answers: [37, 50, 84],
          options: [37, 46, 50, 72, 84, 91],
          title: "Bé chọn số điền vào ô ?",
          hint: "3 chục là 30, thêm 7 đơn vị nữa là 37.",
          label: "Đọc số chục và số đơn vị rồi viết thành số có hai chữ số",
        },
      },
    },
    {
      type: "visual",
      content: {
        text: "Số ? — bảng các số từ 0 đến 99 còn thiếu số nào? (SGK tr.14)",
        numberScene: {
          mode: "numberTrain",
          kind: "ribbon",
          numbers: [
            60, 61, 62, null, null, null, null, 67, 68, 69, 70, 71, 72, null, null,
            null, null, 77, 78, 79, 80, 81, 82, null, null, null, null, 87, 88, 89,
          ],
          answers: [63, 64, 65, 66, 73, 74, 75, 76, 83, 84, 85, 86],
          options: [63, 64, 65, 66, 73, 74, 75, 76, 83, 84, 85, 86],
          note: "Bảng số đi theo hàng: mỗi hàng mười số liền nhau. Bé tìm những số còn thiếu.",
        },
      },
    },
  ],

  "g1-c6-l5": [
    {
      type: "quiz",
      content: {
        question: "Con cá ghi “mười bốn” — đó là số nào? (SGK tr.15)",
        options: [14, 42, 58, 76],
        answer: 14,
        mascotHint: "Mười bốn gồm 1 chục và 4 đơn vị nên viết là 14.",
      },
    },
    {
      type: "quiz",
      content: {
        question: "Con cá ghi “bảy mươi sáu” — đó là số nào?",
        options: [76, 67, 93, 42],
        answer: 76,
        mascotHint: "Bảy mươi sáu gồm 7 chục và 6 đơn vị nên viết là 76.",
      },
    },
  ],

  "g1-c6-l7": [
    {
      type: "quiz",
      content: {
        question:
          "Lớp 1A có 33 học sinh, lớp 1B có 30 học sinh. Lớp nào có nhiều học sinh hơn? (SGK tr.21)",
        options: ["Lớp 1A", "Lớp 1B", "Hai lớp bằng nhau"],
        answer: "Lớp 1A",
        mascotHint: "33 và 30 cùng 3 chục; 3 đơn vị lớn hơn 0 đơn vị nên 33 > 30.",
      },
    },
    {
      type: "quiz",
      content: {
        question:
          "Lớp 1B có 30 học sinh, lớp 1C có 35 học sinh. Lớp nào có ít học sinh hơn?",
        options: ["Lớp 1B", "Lớp 1C", "Hai lớp bằng nhau"],
        answer: "Lớp 1B",
        mascotHint: "30 và 35 cùng 3 chục; 0 đơn vị bé hơn 5 đơn vị nên 30 < 35.",
      },
    },
  ],

  "g1-c6-l10": [
    {
      type: "visual",
      content: {
        text: "Số ? — đếm thêm 1 (SGK tr.23)",
        numberScene: {
          mode: "numberTrain",
          kind: "ribbon",
          numbers: [30, 31, 32, null, 34, null, null, 37, null],
          answers: [33, 35, 36, 38],
          note: "Mỗi số hơn số liền trước 1 đơn vị.",
        },
      },
    },
    {
      type: "visual",
      content: {
        text: "Số ? — đếm thêm 2 (SGK tr.23)",
        numberScene: {
          mode: "numberTrain",
          kind: "ribbon",
          numbers: [51, 53, null, 57, null, null, 63, 65, null],
          answers: [55, 59, 61, 67],
          note: "Mỗi số hơn số liền trước 2 đơn vị.",
        },
      },
    },
    {
      type: "visual",
      content: {
        text: "Số ? — đếm thêm 2, dãy số lớn (SGK tr.23)",
        numberScene: {
          mode: "numberTrain",
          kind: "ribbon",
          numbers: [82, 84, 86, null, null, 92, null, 96, null],
          answers: [88, 90, 94, 98],
          note: "Cả dãy đều cách nhau 2 đơn vị — bé đọc rồi điền số còn thiếu.",
        },
      },
    },
  ],

  "g1-c6-l11": [
    {
      type: "visual",
      content: {
        text: "Số ? — hai hàng trong bảng các số từ 1 đến 100 (SGK tr.22)",
        numberScene: {
          mode: "numberTrain",
          kind: "ribbon",
          numbers: [
            51, 52, 53, null, 55, 56, null, 58, 59, 60, 71, null, 73, 74, 75, null,
            null, 78, 79, 80,
          ],
          answers: [54, 57, 72, 76, 77],
          note: "Hai hàng của bảng số: mỗi hàng mười số liền nhau.",
        },
      },
    },
    {
      type: "quiz",
      content: {
        question:
          "Trong bảng các số từ 1 đến 100, số nào đứng ngay dưới số 23? (SGK tr.23)",
        options: [23, 33, 43, 24],
        answer: 33,
        mascotHint: "Đi xuống một hàng là thêm 10: 23 + 10 = 33.",
      },
    },
  ],

  "g1-c6-l12": [
    {
      type: "quiz",
      content: {
        question: "“Sáu mươi hai” viết là số nào? (SGK tr.25)",
        options: [26, 62, 60, 72],
        answer: 62,
        mascotHint: "Sáu mươi là 6 chục, thêm 2 đơn vị nên viết là 62.",
      },
    },
    {
      type: "quiz",
      content: {
        question: "Số gồm 5 chục và 1 đơn vị — viết là số nào?",
        options: [15, 51, 50, 501],
        answer: 51,
        mascotHint: "5 chục là 50, thêm 1 đơn vị nữa là 51.",
      },
    },
  ],
};

let nguon = fs.readFileSync(DUONG, "utf8");
let soThem = 0;

/**
 * CHỐNG CHẠY LẶP: chạy script hai lần là chèn hai lần (mã không có khoá duy nhất).
 * Thấy dấu vết slide đầu tiên thì dừng ngay.
 */
if (nguon.includes("mỗi số gồm mấy chục và mấy đơn vị (SGK tr.14)")) {
  console.log("Đã chèn trước đó rồi (thấy slide tr.14) — không làm gì.");
  process.exit(0);
}

for (const [idBai, dsSlide] of Object.entries(THEM)) {
  // Cắt đúng khối bài: từ `id: "<idBài>"` tới khối bài kế tiếp.
  const moc = nguon.indexOf(`id: "${idBai}",`);
  if (moc < 0) throw new Error(`KHÔNG thấy bài ${idBai} — dừng, không ghi gì.`);
  const mocSau = nguon.indexOf('      id: "g1-c6-', moc + 10);
  const ket = mocSau < 0 ? nguon.length : mocSau;
  const khoi = nguon.slice(moc, ket);

  // Chèn TRƯỚC slide `summary` (slide cuối của bài).
  const iSummary = khoi.indexOf('          type: "summary",');
  if (iSummary < 0)
    throw new Error(`Bài ${idBai} KHÔNG có slide summary — dừng, không ghi gì.`);
  /**
   * 🔴 PHẢI lùi về dấu `{` MỞ ĐẦU của slide summary, không chèn ngay tại dòng `type:`.
   * Đã mắc thật: chèn tại dòng `type:` ⇒ slide mới nằm LỌT VÀO TRONG object summary
   * (`{` `{` `"type": "visual"...`) ⇒ `SyntaxError: Unexpected token '{'` ở dòng 386.
   */
  const iMoSlide = khoi.lastIndexOf("        {", iSummary);
  if (iMoSlide < 0)
    throw new Error(`Bài ${idBai}: không tìm thấy dấu mở slide summary — dừng.`);
  const mocChèn = moc + iMoSlide;

  const chu = dsSlide
    .map((s) => JSON.stringify(s, null, 2).split("\n").join("\n" + "        "))
    .map((s) => `        ${s},\n`)
    .join("");
  nguon = nguon.slice(0, mocChèn) + chu + nguon.slice(mocChèn);
  soThem += dsSlide.length;
  console.log(`  ${idBai}: chèn ${dsSlide.length} slide`);
}

console.log(`Tổng: ${soThem} slide.`);
if (!GHI) {
  console.log("(chưa ghi — thêm `--ghi` để ghi thật)");
  process.exit(0);
}
fs.writeFileSync(DUONG, nguon, "utf8");
console.log(`Đã ghi ${DUONG}`);
