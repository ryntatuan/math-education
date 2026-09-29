#!/usr/bin/env node
/**
 * VÁ NỐT NHÓM A của cổng trùng lặp (sau khi cổng đã nâng luật — chỉ còn **16 ca thật**):
 *
 *  • 11 ca `rule ↔ points`: ô ⭐ nhắc lại danh sách ⇒ VIẾT LẠI thành mẹo riêng (không mất thông tin).
 *  • 3 ca `text/dòng ↔ table`: chữ dưới hình nhắc lại đúng bảng ⇒ BỎ chữ (bảng + nhãn bảng đã nói đủ),
 *    hoặc bỏ ĐÚNG dòng bị lặp.
 *
 * HAI KIỂU SỬA, mỗi kiểu đều CHẶT:
 *   • `thay`: đổi nguyên chuỗi JSON của câu cũ (không đụng dấu phẩy/ngoặc).
 *   • `xoa` : xoá TRỌN dòng chứa câu cũ — CHỈ khi dòng đó kết thúc bằng `",` (có dấu phẩy), nếu
 *     không thì BỎ QUA (xoá thuộc tính cuối của object sẽ để lại dấu phẩy lửng ⇒ hỏng cú pháp —
 *     đúng lỗi đã mắc ở đợt trước).
 *
 *   node scratch/sua-nhom-a-con-lai.mjs          # chạy thử
 *   node scratch/sua-nhom-a-con-lai.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

/** [file, kiểu, câu CŨ, câu MỚI (bỏ trống nếu xoa), ghi chú] */
const VIE = [
  // ── 11 ca `rule ↔ points` ─────────────────────────────────────────────────────────────
  [
    "client/src/data/grade1/g1c8.js",
    "thay",
    "24 + 15: 4 + 5 = 9; 2 + 1 = 3. Kết quả 39 (cây).",
    "Bé đọc kĩ đề để biết cộng hay trừ trước khi đặt tính.",
    "g1-c8-l4",
  ],
  [
    "client/src/data/grade1/g1c8.js",
    "thay",
    "23 + 15: 3 + 5 = 8; 2 + 1 = 3. Kết quả 38 (quả trứng).",
    "Bỏ bước nào là bài dễ sai ở đúng bước đó.",
    "g1-c8-l10",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "thay",
    "Mỗi cột là một thứ trong tuần. Mỗi ô là một ngày trong tháng.",
    "Bé đọc tên tháng trước, rồi mới tìm ngày cần xem.",
    "g1-c9-l7",
  ],
  [
    "client/src/data/grade2/g2c1.js",
    "thay",
    "57 − 23 = 34: số 57 là số bị trừ, số 23 là số trừ, số 34 là hiệu.",
    "Bé nhớ: số bị trừ là số đứng ngay trước dấu trừ.",
    "g2-c1-l6",
  ],
  [
    "client/src/data/grade2/g2c1.js",
    "thay",
    "Mai hơn Lan số kẹo là: 12 − 8 = 4 (cái kẹo).",
    "Kết quả phép trừ cho biết hai bạn hơn kém nhau bao nhiêu.",
    "g2-c1-l7",
  ],
  [
    "client/src/data/grade2/g2c3.js",
    "thay",
    "Kim chỉ vào vạch 4 thì vật nặng 4 kg. Kim chỉ vạch 2 thì vật nặng 2 kg.",
    "Cân giúp bé biết vật nặng bao nhiêu ki-lô-gam.",
    "g2-c3-l2 (ô ⭐ lặp lại đúng bảng đọc cân)",
  ],
  [
    "client/src/data/grade2/g2c5.js",
    "thay",
    "Nối điểm A với điểm B ta được đoạn thẳng AB. Đọc là: đoạn thẳng A B.",
    "Đọc là: đoạn thẳng A B.",
    "g2-c5-l1 (giữ lại phần chỉ ô ⭐ có)",
  ],
  [
    "client/src/data/grade2/g2c5.js",
    "thay",
    "Hình gồm ba đoạn thẳng AB, BC, CD nối tiếp nhau tạo thành đường gấp khúc ABCD.",
    "Bé đọc tên đường gấp khúc theo các điểm nối tiếp nhau.",
    "g2-c5-l4",
  ],
  [
    "client/src/data/grade3/g3c2.js",
    "thay",
    "8 : 8 = 1 · 16 : 8 = 2 · 24 : 8 = 3 · 32 : 8 = 4 · 40 : 8 = 5 · 48 : 8 = 6 · 56 : 8 = 7 · 64 : 8 = 8 · 72 : 8 = 9 · 80 : 8 = 10.",
    "Kết quả trong bảng chia 8 lần lượt hơn kém nhau đúng 1.",
    "g3-c2-l6 (cả bảng chia đã có trong hình + danh sách)",
  ],
  [
    "client/src/data/grade3/g3c2.js",
    "thay",
    "9 : 9 = 1 · 18 : 9 = 2 · 27 : 9 = 3 · 36 : 9 = 4 · 45 : 9 = 5 · 54 : 9 = 6 · 63 : 9 = 7 · 72 : 9 = 8 · 81 : 9 = 9 · 90 : 9 = 10.",
    "Kết quả trong bảng chia 9 lần lượt hơn kém nhau đúng 1.",
    "g3-c2-l8",
  ],
  [
    "client/src/data/grade3/g3c3.js",
    "thay",
    "Hình tam giác: 3 cạnh, 3 đỉnh, 3 góc. Hình tứ giác: 4 cạnh, 4 đỉnh, 4 góc.",
    "Tứ giác có nhiều hơn tam giác đúng một cạnh.",
    "g3-c3-l6 (câu cũ trùng cả phần giải thích)",
  ],
  // ── 3 ca `chữ ↔ bảng` ────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade2/g2c3.js",
    "thay",
    "Luôn đọc kèm đơn vị kg.",
    "Đừng quên ghi đơn vị sau con số.",
    "g2-c3-l2: bỏ chữ “kg” khỏi danh sách để danh sách không trùng từng từ với bảng",
  ],
  [
    "client/src/data/grade5/g5c11.js",
    "thay",
    "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 1 + 3 + 320 = 324.",
    "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột\nMuốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.\nVí dụ: 3 + 5 + 4 = 12.",
    "g5-c11-l3 slide 4: ví dụ CỘNG SAI (1 + 3 + 320 = 324) — bảng chỉ có 3, 5, 4",
  ],
  [
    "client/src/data/grade1/g1c2.js",
    "xoa",
    "▢ hình vuông · ⭕ hình tròn\n🔺 hình tam giác · ▭ hình chữ nhật",
    "",
    "g1-c2-l8 slide 3: chữ liệt kê đúng 4 hình mà bảng bên dưới đã kê",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "thay",
    "Bảng nhớ nhanh — giờ đúng\n· Kim dài chỉ số 12\n· Kim ngắn chỉ số nào thì là mấy giờ",
    "Bảng nhớ nhanh — giờ đúng\n· Kim dài chỉ số 12",
    "g1-c9-l2 slide 11: bỏ đúng dòng lặp lại tiêu đề cột của bảng",
  ],
  [
    "client/src/data/grade3/g3c5.js",
    "xoa",
    "🌡️ 36 °C → bình thường\n🌡️ 39 °C → có thể bị sốt",
    "",
    "g3-c5-l5 slide 3: chữ nhắc lại đúng bảng nhiệt kế",
  ],
];

let soSua = 0;
let soLoi = 0;
for (const [f, kieu, cu, moi, ghiChu] of VIE) {
  let raw = fs.readFileSync(f, "utf8");
  const litCu = JSON.stringify(cu);
  const n = raw.split(litCu).length - 1;
  if (n === 0) {
    console.log(`  · đã xong: ${ghiChu}`);
    continue;
  }
  if (n > 1) {
    soLoi++;
    console.log(`  ✗ ${f}: câu khớp ${n} lần (mong 1) — BỎ QUA · ${ghiChu}`);
    continue;
  }
  if (kieu === "thay") {
    raw = raw.replace(litCu, JSON.stringify(moi));
  } else {
    // XOÁ TRỌN DÒNG: chỉ an toàn khi dòng kết thúc bằng `",` (còn thuộc tính phía sau).
    const i = raw.indexOf(litCu);
    const dauDong = raw.lastIndexOf("\n", i) + 1;
    const cuoiDong = raw.indexOf("\n", i);
    const dong = raw.slice(dauDong, cuoiDong);
    if (!dong.trimEnd().endsWith('",')) {
      soLoi++;
      console.log(
        `  ✗ ${f}: dòng của “${ghiChu}” KHÔNG kết thúc bằng dấu phẩy ⇒ không xoá (sợ hỏng cú pháp)`,
      );
      continue;
    }
    raw = raw.slice(0, dauDong) + raw.slice(cuoiDong + 2); // +2 để bỏ luôn \r\n
  }
  soSua++;
  console.log(`  ✓ ${ghiChu}`);
  if (GHI) fs.writeFileSync(f, raw, "utf8");
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lỗi: ${soLoi}`);
