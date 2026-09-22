/**
 * CANARY cho họ lỗi H của `soat-hinh-sai.mjs`: "công thức dùng chữ a, b, c mà hình khối
 * không ghi chữ lên cạnh".
 *
 * VÌ SAO PHẢI CÓ: một luật soát có thể XANH GIẢ (regex không bao giờ khớp → 0 chỗ, trông
 * như đã sạch). Canary phải có HAI VẾ:
 *   (1) BẮT được mẫu thật sự cần bắt;
 *   (2) KHÔNG bắt nhầm câu không liên quan (nếu không thì "bắt mọi thứ" vẫn xanh).
 *
 * Chạy: node scratch/canary-soat-h.mjs
 */
const CONG_THUC_CHU =
  /(\(a \+ b\)|a × b|a × a|cạnh a|chiều dài a|chiều rộng b|chiều cao c|V = a|Sxq = \(a)/i;

const PHAI_BAT = [
  "Sxq = (a + b) × 2 × c · Stp = Sxq + 2 × (a × b)",
  "V = a × b × c",
  "V = a × a × a · 1 dm³ = 1 lít",
  "Có 3 kích thước: chiều dài a, chiều rộng b, chiều cao c",
  "Hình lập phương (cạnh a): Sxq = a × a × 4",
];

const KHONG_DUOC_BAT = [
  "Hai đáy là hình tròn bằng nhau",
  "6 mặt · 8 đỉnh · 12 cạnh",
  "Khối trụ xếp chồng được, khối cầu lăn mọi hướng",
  "Sáu mặt đều là hình vuông",
  "Diện tích xung quanh là tổng diện tích 4 mặt bên",
];

let hong = 0;
console.log("— Vế 1: phải BẮT được —");
for (const m of PHAI_BAT) {
  const bat = CONG_THUC_CHU.test(m);
  if (!bat) hong++;
  console.log(`  ${bat ? "✓" : "✗ HỎNG"}  ${m.slice(0, 60)}`);
}
console.log("— Vế 2: KHÔNG được bắt nhầm —");
for (const m of KHONG_DUOC_BAT) {
  const bat = CONG_THUC_CHU.test(m);
  if (bat) hong++;
  console.log(`  ${bat ? "✗ HỎNG" : "✓"}  ${m.slice(0, 60)}`);
}

// ── Và đếm thật trong dữ liệu: bao nhiêu slide có khối, bao nhiêu đã ghi chữ
let tongKhoi = 0;
let coChu = 0;
let khoiCanChu = 0;
const NGUON = [
  ["grade1Data", "grade1Data"],
  ["grade2Data", "grade2Data"],
  ["grade3Data", "grade3Data"],
  ["grade4Data", "grade4Data"],
  ["grade5Data", "grade5Data"],
];
for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}.js`);
  for (const chuong of mod[key].chapters || []) {
    for (const bai of chuong.lessons || []) {
      for (const sl of bai.slides || []) {
        const c = sl.content || {};
        if (!c.solid) continue;
        tongKhoi++;
        if (c.solid.sideLetters) coChu++;
        const chu = [
          c.text,
          c.formula,
          c.rule,
          c.explanation,
          (c.points || []).join(" "),
        ]
          .filter((x) => typeof x === "string")
          .join(" · ");
        if (CONG_THUC_CHU.test(chu)) khoiCanChu++;
      }
    }
  }
}

console.log("");
console.log(`  Slide có hình KHỐI: ${tongKhoi}`);
console.log(`  Trong đó cần ghi chữ a/b/c: ${khoiCanChu}`);
console.log(`  Đã ghi chữ lên cạnh: ${coChu}`);
if (coChu < khoiCanChu) {
  hong++;
  console.log("  ✗ HỎNG: còn khối cần chữ mà chưa ghi");
}
console.log("");
console.log(
  hong === 0
    ? "✓ CANARY ĐẠT — luật H không xanh giả"
    : `✗ CANARY HỎNG (${hong} lỗi)`,
);
process.exit(hong === 0 ? 0 : 1);
