#!/usr/bin/env node
/**
 * VÁ “chữ gọi tên điểm mà hình không ghi” — BẢN 2 (sau khi bản 1 làm hỏng 2 file, đã khôi phục).
 *
 * 🔴 HAI LỖI CỦA BẢN 1 (đã khắc phục ở đây):
 *   1. Neo (anchor) THIẾU DẤU PHẨY cuối dòng ⇒ chèn xong thành `},,` → HỎNG CÚ PHÁP 2 file.
 *   2. Chèn KHÔNG có chốt chống lặp ⇒ chạy lần hai chèn thêm một bản nữa (nhân đôi khối).
 *      Nay mỗi mục có `chot`: nếu file đã chứa `chot` thì BỎ QUA.
 *
 * Mỗi phép sửa kiểm SỐ LẦN KHỚP của neo: khác 1 là lệch ⇒ DỪNG, không ghi file.
 *
 *   node scratch/sua-ten-diem-2.mjs          # chạy thử
 *   node scratch/sua-ten-diem-2.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");
const K = (s) => s.join("\n");

/** [file, neo (ĐÃ gồm dấu phẩy đúng như trong file), khối thay thế, chuỗi chốt chống lặp] */
const VIE = [
  // ── g2-c5-l2: đoạn thẳng AB ⇒ thêm đoạn thẳng CÓ NHÃN A, B ───────────────────────────────
  [
    "client/src/data/grade2/g2c5.js",
    '            rule: "Đoạn thẳng AB có hai đầu mút. Đường thẳng AB kéo dài mãi cả hai phía. Đường cong thì uốn lượn như con rắn.",',
    K([
      '            rule: "Đoạn thẳng AB có hai đầu mút. Đường thẳng AB kéo dài mãi cả hai phía. Đường cong thì uốn lượn như con rắn.",',
      "            pointLine: {",
      '              kind: "segment",',
      '              points: ["A", "B"],',
      '              formula: "Đoạn thẳng AB có hai đầu mút A và B",',
      "            },",
    ]),
    'formula: "Đoạn thẳng AB có hai đầu mút A và B"',
  ],
  // ── g2-c5-l5: đường gấp khúc ABCD ⇒ thêm CÓ NHÃN (2 slide: mẹo + quiz) ───────────────────
  [
    "client/src/data/grade2/g2c5.js",
    '            rule: "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Độ dài đường gấp khúc là 3 + 4 + 5 = 12 cm.",',
    K([
      '            rule: "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Độ dài đường gấp khúc là 3 + 4 + 5 = 12 cm.",',
      "            pointLine: {",
      '              kind: "polyline",',
      '              points: ["A", "B", "C", "D"],',
      '              formula: "Đường gấp khúc ABCD: AB = 3 cm, BC = 4 cm, CD = 5 cm",',
      "            },",
    ]),
    'formula: "Đường gấp khúc ABCD: AB = 3 cm, BC = 4 cm, CD = 5 cm"',
  ],
  [
    "client/src/data/grade2/g2c5.js",
    '            question:\n              "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Đường gấp khúc dài bao nhiêu?",',
    K([
      '            question:\n              "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Đường gấp khúc dài bao nhiêu?",',
      "            pointLine: {",
      '              kind: "polyline",',
      '              points: ["A", "B", "C", "D"],',
      '              formula: "Đường gấp khúc ABCD: AB = 3 cm, BC = 4 cm, CD = 5 cm",',
      "            },",
    ]),
    'bao nhiêu?",\n            pointLine: {\n              kind: "polyline",',
  ],
  // ── g3-c6-l7: bài toán lời văn ⇒ đổi tên vật (không cần hình có nhãn) ────────────────────
  [
    "client/src/data/grade3/g3c6.js",
    '"Đoạn thẳng AB dài 12 cm, đoạn CD dài 3 cm. AB gấp mấy lần CD? 📏"',
    '"Sợi dây thứ nhất dài 12 cm, sợi dây thứ hai dài 3 cm. Sợi dây thứ nhất gấp mấy lần sợi dây thứ hai? 📏"',
  ],
  [
    "client/src/data/grade3/g3c6.js",
    '"12 : 3 = 4. Vậy đoạn AB dài gấp 4 lần đoạn CD."',
    '"12 : 3 = 4. Vậy sợi dây thứ nhất dài gấp 4 lần sợi dây thứ hai."',
  ],
  [
    "client/src/data/grade3/g3c6.js",
    '"Đoạn AB dài 12 cm, đoạn CD dài 3 cm. Đoạn AB dài gấp mấy lần đoạn CD?"',
    '"Sợi dây thứ nhất dài 12 cm, sợi dây thứ hai dài 3 cm. Sợi dây thứ nhất dài gấp mấy lần sợi dây thứ hai?"',
  ],
  // ── g4-c2-l1: kể chuyện + slide “Độ” ⇒ bỏ tên điểm ở lời, thêm GÓC CÓ NHÃN ───────────────
  [
    "client/src/data/grade4/g4c2.js",
    '"Rô-bốt và Cú Mèo cùng ngắm hai góc: góc đỉnh O cạnh OA, OB và góc đỉnh P cạnh PM, PN. Muốn biết góc nào rộng hơn thì phải đo mới chắc được! 📐"',
    '"Rô-bốt và Cú Mèo cùng ngắm hai góc: một góc nhọn và một góc tù. Muốn biết góc nào rộng hơn thì phải đo mới chắc được! 📐"',
  ],
  [
    "client/src/data/grade4/g4c2.js",
    '            rule: "Muốn biết góc rộng bao nhiêu, bé đo bằng thước đo góc và đọc kết quả theo ĐƠN VỊ ĐỘ (°).",',
    K([
      '            rule: "Muốn biết góc rộng bao nhiêu, bé đo bằng thước đo góc và đọc kết quả theo ĐƠN VỊ ĐỘ (°).",',
      "            angle: {",
      '              kind: "acute",',
      "              degrees: 30,",
      '              vertexLetter: "O",',
      '              armLetters: ["A", "B"],',
      '              label: "Góc đỉnh O; cạnh OA, OB rộng 30°",',
      "            },",
    ]),
    'armLetters: ["A", "B"],\n              label: "Góc đỉnh O; cạnh OA, OB rộng 30°"',
  ],
  // ── g4-c6-l1: vuông góc ⇒ hình chữ nhật CÓ NHÃN + quiz bỏ tên điểm ───────────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Ê-ke khớp đúng với góc tạo bởi hai đường thẳng thì hai đường thẳng đó vuông góc.",',
    K([
      '            rule: "Ê-ke khớp đúng với góc tạo bởi hai đường thẳng thì hai đường thẳng đó vuông góc.",',
      "            planeShape: {",
      '              kind: "rectangle",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD ta được hai đường thẳng vuông góc",',
      "            },",
    ]),
    'formula: "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD ta được hai đường thẳng vuông góc"',
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '"Hai đường thẳng OM và ON vuông góc với nhau tạo thành mấy góc vuông chung đỉnh O?"',
    '"Hai đường thẳng vuông góc với nhau cắt nhau tại một điểm thì tạo thành mấy góc vuông?"',
  ],
  // ── g4-c6-l2: song song ⇒ hình chữ nhật CÓ NHÃN + bỏ chữ MNPQ ───────────────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Song song = cùng hướng và cách nhau một khoảng không đổi.",',
    K([
      '            rule: "Song song = cùng hướng và cách nhau một khoảng không đổi.",',
      "            planeShape: {",
      '              kind: "rectangle",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được hai đường thẳng song song",',
      "            },",
    ]),
    'formula: "Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được hai đường thẳng song song"',
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '"Trong hình vuông MNPQ: MN song song với QP; MQ song song với NP."',
    '"Trong hình vuông: hai cặp cạnh đối diện cũng song song với nhau."',
  ],
  // ── g4-c6-l4: hình bình hành ⇒ HÌNH CÓ NHÃN (2 slide) + quiz bỏ tên điểm ────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Hình bình hành: hai cặp cạnh đối diện vừa SONG SONG vừa BẰNG NHAU.",',
    K([
      '            rule: "Hình bình hành: hai cặp cạnh đối diện vừa SONG SONG vừa BẰNG NHAU.",',
      "            planeShape: {",
      '              kind: "parallelogram",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình bình hành ABCD: AB song song và bằng DC; AD song song và bằng BC",',
      "            },",
    ]),
    'formula: "Hình bình hành ABCD: AB song song và bằng DC; AD song song và bằng BC"',
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '            text: "Các cặp cạnh của hình bình hành ABCD",',
    K([
      '            text: "Các cặp cạnh của hình bình hành ABCD",',
      "            planeShape: {",
      '              kind: "parallelogram",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình bình hành ABCD có hai cặp cạnh đối diện song song và bằng nhau",',
      "            },",
    ]),
    'formula: "Hình bình hành ABCD có hai cặp cạnh đối diện song song và bằng nhau"',
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '"Cho hai hình bình hành ABCD và CDEG, biết cạnh AB dài 3 dm. Độ dài cạnh EG là bao nhiêu?"',
    '"Một hình bình hành có một cạnh dài 3 dm. Cạnh đối diện với cạnh đó dài bao nhiêu đề-xi-mét?"',
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '"AB = CD (cạnh đối diện hình bình hành ABCD) và CD = EG (cạnh đối diện hình bình hành CDEG) nên EG = 3 dm."',
    '"Hai cạnh đối diện của hình bình hành thì bằng nhau, nên cạnh đối diện cũng dài 3 dm."',
  ],
  // ── g4-c6-l5: hình thoi ⇒ HÌNH CÓ NHÃN ──────────────────────────────────────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Hình thoi = hình bình hành có bốn cạnh bằng nhau.",',
    K([
      '            rule: "Hình thoi = hình bình hành có bốn cạnh bằng nhau.",',
      "            planeShape: {",
      '              kind: "rhombus",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình thoi ABCD: AB = BC = CD = DA",',
      "            },",
    ]),
    'kind: "rhombus",',
  ],
];

const theoFile = new Map();
for (const [f, tu, den, chot] of VIE) {
  if (!theoFile.has(f)) theoFile.set(f, []);
  theoFile.get(f).push([tu, den, chot]);
}

let soSua = 0;
let loi = 0;
for (const [f, ds] of theoFile) {
  const raw = fs.readFileSync(f, "utf8");
  let ra = raw;
  for (const [tu, den, chot] of ds) {
    if (chot && ra.includes(chot)) {
      console.log(`  ⏭  ${f}: đã có “${chot.slice(0, 44)}…” — bỏ qua`);
      continue;
    }
    const n = ra.split(tu).length - 1;
    if (n === 0) {
      console.log(`  ⏭  ${f}: không thấy neo “${tu.slice(0, 44)}…”`);
      continue;
    }
    if (n > 1) {
      loi++;
      console.log(
        `  ✗ ${f}: neo “${tu.slice(0, 44)}…” khớp ${n} lần (mong 1) — BỎ QUA`,
      );
      continue;
    }
    ra = ra.replace(tu, den);
    soSua++;
    console.log(`  · ${f}: 1 chỗ — “${tu.slice(0, 44)}…”`);
  }
  if (ra !== raw && GHI) fs.writeFileSync(f, ra, "utf8");
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lỗi: ${loi}`);
