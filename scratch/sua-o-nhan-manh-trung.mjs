#!/usr/bin/env node
/**
 * BỎ TRÙNG “Ô NHẤN MẠNH ⭐ NÓI LẠI DANH SÁCH” — 21 ca trẻ VẪN NHÌN THẤY hai lần.
 *
 * Cách sửa (chọn theo từng ca, KHÔNG mất thông tin):
 *   • VIẾT LẠI ô ⭐ thành một MẸO riêng (nêu điều danh sách không nói, hoặc nhấn mạnh cách làm)
 *     — dùng cho đa số ca.
 *   • GIỮ LẠI phần chỉ ô ⭐ có (ví dụ riêng của bài) và cắt phần trùng.
 *   • SỬA Ở DANH SÁCH khi trong danh sách có MỘT dòng nhắc lại y hệt ô ⭐ (g5-c12-l1).
 *
 * ⚠️ Neo là CHUỖI JSON của chính câu cũ (`JSON.stringify`) nên không phải đụng dấu phẩy/ngoặc —
 * đúng bài học “chèn thiếu dấu phẩy làm hỏng cú pháp 2 file” ở đợt trước.
 * Mỗi phép sửa phải khớp ĐÚNG 1 lần; khác là BỎ QUA và báo.
 *
 *   node scratch/sua-o-nhan-manh-trung.mjs          # chạy thử
 *   node scratch/sua-o-nhan-manh-trung.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

/** [file, câu CŨ (đúng từng ký tự), câu MỚI, ghi chú] */
const VIE = [
  // ── Lớp 1 ──────────────────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade1/g1c3.js",
    "4 + 3: bắt đầu từ 4, đếm tiếp 5, 6, 7. Vậy 4 + 3 = 7.",
    "Mẹo nhớ: bé giữ nguyên số lớn rồi nhích thêm từng bước.",
    "g1-c3-l2: danh sách đã có cách đếm tiếp",
  ],
  [
    "client/src/data/grade1/g1c3.js",
    "3 + ? = 7: từ 3 đếm tiếp 4, 5, 6, 7 — thêm 4 bước. Vậy số còn thiếu là 4.",
    "Ô trống chính là khoảng cách giữa hai số đã cho.",
    "g1-c3-l11",
  ],
  [
    "client/src/data/grade1/g1c6.js",
    "45 đọc là: bốn mươi lăm. 51 đọc là: năm mươi mốt. 15 đọc là: mười lăm.",
    "Mười lăm, năm mươi mốt — bé nhớ đừng đọc “mười năm”.",
    "g1-c6-l5: danh sách đã có 45 và 15, chỉ giữ mẹo đọc",
  ],
  [
    "client/src/data/grade1/g1c6.js",
    "Số lớn nhất có hai chữ số: 99. Số bé nhất có hai chữ số: 10.",
    "Số bé nhất có hai chữ số là 10, chứ không phải 1.",
    "g1-c6-l7",
  ],
  [
    "client/src/data/grade1/g1c7.js",
    "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay. Vậy bàn dài hơn cửa sổ.",
    "Muốn so hai vật, bé cần một đơn vị đo chung.",
    "g1-c7-l2: ví dụ bàn/cửa sổ đã có trong danh sách",
  ],
  [
    "client/src/data/grade1/g1c9.js",
    "Kim ngắn chỉ số 7, kim dài chỉ số 12 → 7 giờ đúng.",
    "Bé nhìn kim ngắn trước để biết mấy giờ, rồi mới xem kim dài.",
    "g1-c9-l2",
  ],
  // ── Lớp 2 ──────────────────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade2/g2c9.js",
    "Lon sữa đặt đứng được và xếp chồng được. Quả bóng thì lăn đi, không xếp chồng được.",
    "Vật lăn được thì không chồng lên nhau được.",
    "g2-c9-l3: danh sách đã tả khối trụ/khối cầu",
  ],
  // ── Lớp 3 ──────────────────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade3/g3c10.js",
    "3 215 × 3 = 9 645. 8 425 : 4 = 2 106 (dư 1).",
    "3 215 × 3 và 8 425 : 4 — bé đặt tính rồi làm từng bước, đừng nhẩm tắt.",
    "g3-c10-l6: kết quả đã có trong lời giải",
  ],
  [
    "client/src/data/grade3/g3c12.js",
    "34 560 + 25 430 = 59 990 (cái áo). Hơn kém: 34 560 − 25 430 = 9 130 (cái áo).",
    "Muốn biết hơn kém nhau bao nhiêu thì bé làm phép trừ.",
    "g3-c12-l4: hai phép tính đã có trong lời giải",
  ],
  [
    "client/src/data/grade3/g3c14.js",
    "13 241 × 3 = 39 723. 47 125 : 5 = 9 425.",
    "13 241 × 3 và 47 125 : 5 — bé thử lại kết quả trước khi ghi đáp số.",
    "g3-c14-l3",
  ],
  [
    "client/src/data/grade3/g3c6.js",
    "12 : 3 = 4. Vậy sợi dây thứ nhất dài gấp 4 lần sợi dây thứ hai.",
    "12 : 3 = 4. Vậy số lớn gấp 4 lần số bé.",
    "g3-c6-l7: bỏ tên vật để không lặp lời câu chuyện ngay trước",
  ],
  // ── Lớp 4 ──────────────────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade4/g4c1.js",
    "Nhìn chữ số tận cùng: chẵn thì 0–2–4–6–8, lẻ thì 1–3–5–7–9.",
    "Chữ số tận cùng quyết định số đó chẵn hay lẻ.",
    "g4-c1-l3: hai dãy số đã có trong danh sách",
  ],
  [
    "client/src/data/grade4/g4c5.js",
    "Thẳng cột rồi cộng từ phải sang trái; nhớ 1 khi tổng của một hàng từ 10 trở lên.",
    "Cộng sai thường do lệch cột — bé kiểm lại các hàng cho thẳng.",
    "g4-c5-l1",
  ],
  [
    "client/src/data/grade4/g4c5.js",
    "Bớt phần hơn để tìm số bé — thêm phần hơn để tìm số lớn.",
    "Số lớn thì cộng hiệu, số bé thì trừ hiệu, rồi chia đôi.",
    "g4-c5-l4",
  ],
  [
    "client/src/data/grade4/g4c8.js",
    "Nhân từ phải sang trái, nhớ sang hàng kế tiếp — giống như nhân số bé.",
    "Bé nhân từ hàng đơn vị trước, sai hàng là sai cả bài.",
    "g4-c8-l1",
  ],
  [
    "client/src/data/grade4/g4c8.js",
    "Nhân với từng chữ số của số thứ hai, tích riêng thứ hai lùi một cột.",
    "Bé nhớ TÍCH RIÊNG THỨ HAI phải thụt vào một cột.",
    "g4-c8-l6",
  ],
  [
    "client/src/data/grade4/g4c8.js",
    "Làm tròn → nhẩm → so sánh với kết quả thật.",
    "Ước lượng giúp bé biết kết quả có hợp lí hay không.",
    "g4-c8-l8",
  ],
  [
    "client/src/data/grade4/g4c10.js",
    '=            rule: "Rút gọn đến phân số tối giản.",',
    '=            rule: "Bé chia cả tử số và mẫu số cho cùng một số để rút gọn.",',
    "g4-c10-l4 (neo thô: cùng câu còn xuất hiện ở danh sách slide Tổng kết nên phải kèm tiền tố `rule:`)",
  ],
  // ── Lớp 5 ──────────────────────────────────────────────────────────────────────────────
  [
    "client/src/data/grade5/g5c1.js",
    "Mẫu số của phân số thập phân là 10, 100, 1 000…",
    "Bé chỉ cần nhìn MẪU SỐ là biết phân số thập phân.",
    "g5-c1-l4: định nghĩa đã nằm trong các ví dụ",
  ],
  [
    "client/src/data/grade5/g5c10.js",
    "1 km/giờ = 1 000 m : 3 600 giây.",
    "Muốn đổi km/giờ sang m/giây, bé đổi 1 km ra mét và 1 giờ ra giây.",
    "g5-c10-l6",
  ],
  [
    "client/src/data/grade5/g5c11.js",
    "Tổng tỉ số phần trăm của các phần bằng 100%.",
    "Bé nhìn vào chú thích để biết mỗi phần ứng với bao nhiêu phần trăm.",
    "g5-c11-l2",
  ],
  // ── Ca phải sửa ở DANH SÁCH (một dòng nhắc lại y hệt ô ⭐) ─────────────────────────────
  [
    "client/src/data/grade5/g5c12.js",
    "Số thập phân: 0,75; 1,4… và 3/4 = 0,75.",
    "Số thập phân: 0,75; 1,4…",
    "g5-c12-l1: bỏ vế lặp lại ở dòng danh sách",
  ],
];

const theoFile = new Map();
for (const v of VIE) {
  if (!theoFile.has(v[0])) theoFile.set(v[0], []);
  theoFile.get(v[0]).push(v);
}

let soSua = 0;
let soLoi = 0;
for (const [f, ds] of theoFile) {
  const raw = fs.readFileSync(f, "utf8");
  let ra = raw;
  for (const [, cu, moi, ghiChu] of ds) {
    // Neo bắt đầu bằng `=` thì dùng NGUYÊN VĂN (kèm tiền tố như `rule: `) — cần khi cùng một
    // câu còn xuất hiện ở chỗ khác trong file (ví dụ trong danh sách của slide Tổng kết).
    const litCu = cu.startsWith("=") ? cu.slice(1) : JSON.stringify(cu);
    const litMoi = moi.startsWith("=") ? moi.slice(1) : JSON.stringify(moi);
    const n = ra.split(litCu).length - 1;
    if (n === 0) {
      console.log(`  · đã xong/bỏ qua: ${ghiChu}`);
      continue;
    }
    if (n > 1) {
      soLoi++;
      console.log(`  ✗ ${f}: câu khớp ${n} lần (mong 1) — BỎ QUA · ${ghiChu}`);
      continue;
    }
    ra = ra.replace(litCu, litMoi);
    soSua++;
    console.log(`  ✓ ${ghiChu}`);
  }
  if (ra !== raw && GHI) fs.writeFileSync(f, ra, "utf8");
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lỗi: ${soLoi}`);
