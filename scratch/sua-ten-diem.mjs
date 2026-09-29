#!/usr/bin/env node
/**
 * VÁ “chữ gọi tên điểm mà hình không ghi” (cổng `scratch/soat-ten-diem.mjs`, 15 ca).
 *
 * HAI CÁCH SỬA, chọn theo bản chất từng ca:
 *   • CÓ HÌNH, CHỈ THIẾU NHÃN  ⇒ thêm hình CÓ NHÃN (`planeShape.vertexLabels`, `pointLine.points`,
 *     `angle.vertexLetter/armLetters`) — đúng cái người dùng từng đòi: “ghi chú A, B, C, D lên hình”.
 *   • KHÔNG CẦN HÌNH (bài toán có lời văn, số La Mã…)  ⇒ viết lại lời để KHÔNG gọi tên điểm
 *     (thay “đoạn thẳng AB” bằng vật cụ thể: “sợi dây thứ nhất”).
 *
 * Mỗi phép sửa có SỐ LẦN KHỚP MONG ĐỢI; lệch là DỪNG, không ghi (bài học từ các đợt trước).
 *
 *   node scratch/sua-ten-diem.mjs          # chạy thử
 *   node scratch/sua-ten-diem.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

const VIE = [
  // ── A. g2-c5-l2: “Đoạn thẳng AB có hai đầu mút” — thêm đoạn thẳng CÓ NHÃN A, B ────────────
  [
    "client/src/data/grade2/g2c5.js",
    '            rule: "Đoạn thẳng AB có hai đầu mút. Đường thẳng AB kéo dài mãi cả hai phía. Đường cong thì uốn lượn như con rắn.",',
    [
      '            rule: "Đoạn thẳng AB có hai đầu mút. Đường thẳng AB kéo dài mãi cả hai phía. Đường cong thì uốn lượn như con rắn.",',
      "            pointLine: {",
      '              kind: "segment",',
      '              points: ["A", "B"],',
      '              formula: "Đoạn thẳng AB có hai đầu mút A và B",',
      "            },",
    ].join("\n"),
  ],

  // ── B. g2-c5-l5: “Đường gấp khúc ABCD” — thêm đường gấp khúc CÓ NHÃN A, B, C, D ──────────
  [
    "client/src/data/grade2/g2c5.js",
    '            rule: "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Độ dài đường gấp khúc là 3 + 4 + 5 = 12 cm.",',
    [
      '            rule: "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Độ dài đường gấp khúc là 3 + 4 + 5 = 12 cm.",',
      "            pointLine: {",
      '              kind: "polyline",',
      '              points: ["A", "B", "C", "D"],',
      '              formula: "Đường gấp khúc ABCD: AB = 3 cm, BC = 4 cm, CD = 5 cm",',
      "            },",
    ].join("\n"),
  ],
  [
    "client/src/data/grade2/g2c5.js",
    '            question:\n              "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Đường gấp khúc dài bao nhiêu?",',
    [
      '            question:\n              "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Đường gấp khúc dài bao nhiêu?",',
      "            pointLine: {",
      '              kind: "polyline",',
      '              points: ["A", "B", "C", "D"],',
      '              formula: "Đường gấp khúc ABCD: AB = 3 cm, BC = 4 cm, CD = 5 cm",',
      "            },",
    ].join("\n"),
  ],

  // ── C. g3-c6-l7 (gấp mấy lần): bài toán lời văn ⇒ đổi tên vật, không cần hình có nhãn ─────
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

  // ── D. g4-c2-l1: kể chuyện gọi tên hai góc ⇒ đổi thành “góc nhọn / góc tù” ───────────────
  [
    "client/src/data/grade4/g4c2.js",
    '"Rô-bốt và Cú Mèo cùng ngắm hai góc: góc đỉnh O cạnh OA, OB và góc đỉnh P cạnh PM, PN. Muốn biết góc nào rộng hơn thì phải đo mới chắc được! 📐"',
    '"Rô-bốt và Cú Mèo cùng ngắm hai góc: một góc nhọn và một góc tù. Muốn biết góc nào rộng hơn thì phải đo mới chắc được! 📐"',
  ],
  // …và thêm GÓC CÓ NHÃN cho slide “Độ — đơn vị đo góc”
  [
    "client/src/data/grade4/g4c2.js",
    '            rule: "Muốn biết góc rộng bao nhiêu, bé đo bằng thước đo góc và đọc kết quả theo ĐƠN VỊ ĐỘ (°)."',
    [
      '            rule: "Muốn biết góc rộng bao nhiêu, bé đo bằng thước đo góc và đọc kết quả theo ĐƠN VỊ ĐỘ (°).",',
      "            angle: {",
      '              kind: "acute",',
      "              degrees: 30,",
      '              vertexLetter: "O",',
      '              armLetters: ["A", "B"],',
      '              label: "Góc đỉnh O; cạnh OA, OB rộng 30°",',
      "            },",
    ].join("\n"),
  ],

  // ── E. g4-c6-l1: hai đường thẳng vuông góc — thêm HÌNH CHỮ NHẬT CÓ NHÃN A, B, C, D ────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Ê-ke khớp đúng với góc tạo bởi hai đường thẳng thì hai đường thẳng đó vuông góc."',
    [
      '            rule: "Ê-ke khớp đúng với góc tạo bởi hai đường thẳng thì hai đường thẳng đó vuông góc.",',
      "            planeShape: {",
      '              kind: "rectangle",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD ta được hai đường thẳng vuông góc",',
      "            },",
    ].join("\n"),
  ],
  // quiz “OM và ON” ⇒ viết lại lời, không gọi tên điểm
  [
    "client/src/data/grade4/g4c6.js",
    '"Hai đường thẳng OM và ON vuông góc với nhau tạo thành mấy góc vuông chung đỉnh O?"',
    '"Hai đường thẳng vuông góc với nhau cắt nhau tại một điểm thì tạo thành mấy góc vuông?"',
  ],

  // ── F. g4-c6-l2: hai đường thẳng song song — thêm HÌNH CHỮ NHẬT CÓ NHÃN + bỏ chữ MNPQ ────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Song song = cùng hướng và cách nhau một khoảng không đổi."',
    [
      '            rule: "Song song = cùng hướng và cách nhau một khoảng không đổi.",',
      "            planeShape: {",
      '              kind: "rectangle",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được hai đường thẳng song song",',
      "            },",
    ].join("\n"),
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '"Trong hình vuông MNPQ: MN song song với QP; MQ song song với NP."',
    '"Trong hình vuông: hai cặp cạnh đối diện cũng song song với nhau."',
  ],

  // ── G. g4-c6-l4: hình bình hành — thêm HÌNH BÌNH HÀNH CÓ NHÃN ────────────────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Hình bình hành: hai cặp cạnh đối diện vừa SONG SONG vừa BẰNG NHAU."',
    [
      '            rule: "Hình bình hành: hai cặp cạnh đối diện vừa SONG SONG vừa BẰNG NHAU.",',
      "            planeShape: {",
      '              kind: "parallelogram",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình bình hành ABCD: AB song song và bằng DC; AD song song và bằng BC",',
      "            },",
    ].join("\n"),
  ],
  [
    "client/src/data/grade4/g4c6.js",
    '            text: "Các cặp cạnh của hình bình hành ABCD",',
    [
      '            text: "Các cặp cạnh của hình bình hành ABCD",',
      "            planeShape: {",
      '              kind: "parallelogram",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình bình hành ABCD có hai cặp cạnh đối diện song song và bằng nhau",',
      "            },",
    ].join("\n"),
  ],
  // quiz “ABCD và CDEG” ⇒ viết lại lời, không cần hình có nhãn
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

  // ── H. g4-c6-l5: hình thoi — thêm HÌNH THOI CÓ NHÃN ──────────────────────────────────────
  [
    "client/src/data/grade4/g4c6.js",
    '            rule: "Hình thoi = hình bình hành có bốn cạnh bằng nhau."',
    [
      '            rule: "Hình thoi = hình bình hành có bốn cạnh bằng nhau.",',
      "            planeShape: {",
      '              kind: "rhombus",',
      '              labels: ["AB", "BC", "CD", "DA"],',
      '              vertexLabels: ["A", "B", "C", "D"],',
      '              formula: "Hình thoi ABCD: AB = BC = CD = DA",',
      "            },",
    ].join("\n"),
  ],
];

const theoFile = new Map();
for (const [f, tu, den] of VIE) {
  if (!theoFile.has(f)) theoFile.set(f, []);
  theoFile.get(f).push([tu, den]);
}

let soSua = 0;
let loi = 0;
for (const [f, ds] of theoFile) {
  const raw = fs.readFileSync(f, "utf8");
  let ra = raw;
  for (const [tu, den] of ds) {
    const n = ra.split(tu).length - 1;
    if (n === 0) {
      console.log(
        `  ⏭  ${f}: không còn “${tu.slice(0, 46)}…” (đã sửa hoặc không có)`,
      );
      continue;
    }
    if (n > 1) {
      loi++;
      console.log(
        `  ✗ ${f}: “${tu.slice(0, 46)}…” khớp ${n} lần (mong 1) — BỎ QUA`,
      );
      continue;
    }
    ra = ra.replace(tu, den);
    soSua++;
    console.log(`  · ${f}: 1 chỗ — “${tu.slice(0, 46)}…”`);
  }
  if (ra !== raw && GHI) fs.writeFileSync(f, ra, "utf8");
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lỗi: ${loi}`);
