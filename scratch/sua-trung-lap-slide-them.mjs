#!/usr/bin/env node
/**
 * VÁ 8 SLIDE DO TÔI THÊM BỊ LẶP NỘI DUNG (2026-09-29, lượt 2 — sau khi người dùng phản hồi).
 *
 * VÌ SAO: cổng `scratch/soat-trung-lap-noi-dung.mjs` ở bản HEAD = **399 ca**, sau đợt sửa của tôi
 * thành **405 ca** — 6 ca mới ĐỀU nằm ở slide tôi thêm: lời của slide lặp y nguyên nội dung bảng
 * (hoặc `clock.timeText` lặp y nguyên `text`). Slide chỉ để ĐỌC mà nội dung trùng thì trẻ đọc hai lần
 * cùng một câu ⇒ phải viết lại cho phần lời BỔ SUNG cho bảng, không lặp lại bảng.
 *
 *   node scratch/sua-trung-lap-slide-them.mjs          # chạy thử
 *   node scratch/sua-trung-lap-slide-them.mjs --ghi    # ghi thật
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

const VIE = [
  // ── Slide “đồng hồ” tôi thêm: text và timeText trùng nhau ─────────────────────
  [
    "client/src/data/grade1/g1c9.js",
    'text: "🕘  Kim ngắn chỉ số 9, kim dài chỉ số 12\\nKim ngắn → giờ\\nKim dài  → phút",',
    'text: "🕘  Cùng bé đọc giờ trên mặt đồng hồ này nhé!",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '"Kim ngắn chỉ số 9, kim dài chỉ số 12",',
    '"9 giờ đúng",',
    1,
  ],
  [
    "client/src/data/grade1/g1c9.js",
    'text: "🕓  Kim ngắn chỉ số 4, kim dài chỉ số 12\\nBây giờ là 4 giờ đúng",',
    'text: "🕓  Bé đọc giờ trên mặt đồng hồ này nhé!",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '"Kim ngắn chỉ số 4, kim dài chỉ số 12 — 4 giờ đúng",',
    '"4 giờ đúng",',
    1,
  ],
  [
    "client/src/data/grade1/g1c9.js",
    'text: "🌅  Buổi sáng bé thức dậy lúc 7 giờ\\nKim ngắn chỉ số 7, kim dài chỉ số 12",',
    'text: "🌅  Buổi sáng bé thức dậy — bé xem đồng hồ nhé!",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '"7 giờ sáng — kim ngắn chỉ số 7, kim dài chỉ số 12",',
    '"7 giờ sáng",',
    1,
  ],
  [
    "client/src/data/grade1/g1c9.js",
    'text: "🕕  Bé tự đọc giờ\\nKim ngắn chỉ số 6, kim dài chỉ số 12 → 6 giờ đúng",',
    'text: "🕕  Bé tự đọc giờ xem bây giờ là mấy giờ nhé!",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '"6 giờ đúng — kim ngắn chỉ số 6, kim dài chỉ số 12",',
    '"6 giờ đúng",',
    1,
  ],
  [
    "client/src/data/grade1/g1c9.js",
    'text: "🕚  Kim ngắn chỉ số 11, kim dài chỉ số 12 → 11 giờ đúng",',
    'text: "🕚  Bé đọc giờ trên mặt đồng hồ này nhé!",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    '"11 giờ đúng — kim ngắn chỉ số 11, kim dài chỉ số 12",',
    '"11 giờ đúng",',
    1,
  ],

  // ── Lời của slide bảng tôi thêm: lặp y nguyên nội dung bảng ────────────────────
  [
    "client/src/data/grade1/g1c9.js",
    'text: "Bảng nhớ nhanh — mặt đồng hồ\\n· Kim ngắn chỉ giờ, kim dài chỉ phút\\n· Đồng hồ có 12 số",',
    'text: "Bảng nhớ nhanh — mặt đồng hồ\\n· Bé nhìn kim ngắn trước, rồi đến kim dài\\n· Các số trên mặt đồng hồ xếp thành một vòng tròn",',
  ],
  [
    "client/src/data/grade1/g1c9.js",
    'text: "Bảng nhớ nhanh — giờ đúng\\n· Kim dài chỉ số 12\\n· Kim ngắn chỉ số nào thì là mấy giờ",',
    'text: "Bảng nhớ nhanh — giờ đúng\\n· Kim dài chỉ số 12 thì bé đọc theo kim ngắn\\n· Đọc xong nhớ nói cả câu cho đủ ý",',
  ],
  [
    "client/src/data/grade2/g2c11.js",
    'text: "Bảng nhớ nhanh — đơn vị đo độ dài\\n· 1 km = 1 000 m\\n· 1 m = 10 dm\\n· 1 dm = 10 cm",',
    'text: "Bảng nhớ nhanh — đơn vị đo độ dài\\n· Đi xuống một bậc thì số đo lớn lên 10 lần\\n· Đổi xong nhớ đọc lại kèm đơn vị",',
  ],
];

const theoFile = new Map();
for (const [f, tu, den, mongDoi] of VIE) {
  if (!theoFile.has(f)) theoFile.set(f, []);
  theoFile.get(f).push([tu, den, mongDoi]);
}

let loi = 0;
let soSua = 0;
for (const [f, ds] of theoFile) {
  const raw = fs.readFileSync(f, "utf8");
  let ra = raw;
  for (const [tu, den, mongDoi] of ds) {
    const n = ra.split(tu).length - 1;
    // 0 lần = đã sửa rồi (hoặc không có) ⇒ bỏ qua, KHÔNG báo lệch (chạy lại phải là no-op).
    if (n === 0) continue;
    if (mongDoi !== undefined && n !== mongDoi) {
      loi++;
      console.log(
        `  ✗ ${f}: “${tu.slice(0, 52)}…” khớp ${n} lần, mong đợi ${mongDoi} — KHÔNG sửa`,
      );
      continue;
    }
    ra = ra.split(tu).join(den);
    soSua += n;
    console.log(`  · ${f}: ${n} chỗ — “${tu.slice(0, 52)}…”`);
  }
  if (ra !== raw && GHI) fs.writeFileSync(f, ra, "utf8");
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lệch: ${loi}`);
