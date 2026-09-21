// Viết lại "Kiến thức trọng tâm" cho 23 bài Lớp 3 — đợt A: chương 2, 3, 4.
//
// Bệnh của 23 bài này (bộ sinh cũ): slide khái niệm dùng chung đúng một khối văn bản
//   explanation: "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:"
//   points: ["Nhân từ phải sang trái: …", "Chia từ trái sang phải: …"]
//   rule: "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải."
// ⇒ bài "Bảng nhân 6" dạy cách đặt tính nhân/chia, bài "phép chia có dư" cũng dạy y hệt.
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop3-dot-a.mjs
// ⚠️ Bài nào thiếu khoá cần thay, hoặc `example` có khoá lạ, thì script BÁO và KHÔNG ghi file.
// ⚠️ `grade3Data.js` dùng LẪN LỘN khoá có nháy và không nháy ⇒ mọi mẫu đều chấp cả hai.

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade3Data.js");

// e = explanation, p = points, x = example.text, r = rule
const NOI_DUNG = {
  // ══ CHƯƠNG 2 — bảng nhân 6, 7, 8, 9 và nhân số có nhiều chữ số ══
  "g3-c2-l1": {
    e: "Bảng nhân 6: 6 × 1 = 6, 6 × 2 = 12, 6 × 3 = 18, 6 × 4 = 24, 6 × 5 = 30.",
    p: [
      "Mỗi tích liền sau hơn tích liền trước đúng 6 đơn vị.",
      "6 × 3 nghĩa là 6 được lấy 3 lần: 6 + 6 + 6 = 18.",
      "Mẹo: 6 × 5 = 30 vì 6 × 5 = 5 × 6 và 5 × 6 = 30.",
    ],
    r: "Học bảng nhân 6 bằng cách đếm thêm 6: 6, 12, 18, 24, 30.",
  },
  "g3-c2-l2": {
    e: "Nối tiếp bảng nhân 6: 6 × 6 = 36, 6 × 7 = 42, 6 × 8 = 48, 6 × 9 = 54, 6 × 10 = 60.",
    p: [
      "Nhớ mốc 6 × 5 = 30 rồi đếm thêm 6 để ra các tích tiếp theo.",
      "6 × 7 = 42 vì 30 + 6 + 6 = 42.",
      "6 × 10 = 60 — nhân với 10 chỉ cần thêm một chữ số 0.",
    ],
    r: "Trong bảng nhân 6, tích liền sau hơn tích liền trước 6 đơn vị.",
  },
  "g3-c2-l4": {
    e: "Bảng nhân 7: 7 × 1 = 7, 7 × 2 = 14, 7 × 3 = 21, 7 × 4 = 28, 7 × 5 = 35.",
    p: [
      "7 × 2 = 14 vì 7 + 7 = 14.",
      "Đếm thêm 7: 7, 14, 21, 28, 35.",
      "Mẹo: 7 × 5 = 35, đổi chỗ thừa số thành 5 × 7 = 35.",
    ],
    r: "Bảng nhân 7 là bảng khó nhất — hãy đọc to và đếm thêm 7 nhiều lần.",
  },
  "g3-c2-l5": {
    e: "Nối tiếp bảng nhân 7: 7 × 6 = 42, 7 × 7 = 49, 7 × 8 = 56, 7 × 9 = 63, 7 × 10 = 70.",
    p: [
      "7 × 6 = 42, giống 6 × 7 = 42 vì đổi chỗ thừa số thì tích không đổi.",
      "7 × 8 = 56 nghĩa là 49 thêm 7 nữa.",
      "7 × 10 = 70.",
    ],
    r: "Dùng bảng nhân đã thuộc để suy ra tích mới thay vì học vẹt.",
  },
  "g3-c2-l6": {
    e: "Bảng nhân 8: 8 × 1 = 8, 8 × 2 = 16, 8 × 3 = 24, 8 × 4 = 32, 8 × 5 = 40.",
    p: [
      "8 × 4 = 32, gấp đôi 8 × 2 = 16 là ra.",
      "8 × 5 = 40 vì 4 × 5 = 20 rồi nhân tiếp với 2.",
      "Đếm thêm 8: 8, 16, 24, 32, 40.",
    ],
    r: "Nhân với 8 bằng nhân với 4 rồi nhân tiếp với 2.",
  },
  "g3-c2-l7": {
    e: "Nối tiếp bảng nhân 8: 8 × 6 = 48, 8 × 7 = 56, 8 × 8 = 64, 8 × 9 = 72, 8 × 10 = 80.",
    p: [
      "Nhớ mốc 8 × 5 = 40 rồi đếm thêm 8.",
      "8 × 8 = 64 vì 56 + 8 = 64.",
      "8 × 10 = 80.",
    ],
    r: "Thử lại tích của bảng nhân 8 bằng phép cộng liên tiếp nếu chưa chắc.",
  },
  "g3-c2-l8": {
    e: "Bảng nhân 9: 9 × 1 = 9, 9 × 2 = 18, 9 × 3 = 27, 9 × 4 = 36, …, 9 × 10 = 90.",
    p: [
      "Mẹo ngón tay: gập ngón thứ mấy thì số ngón bên trái là hàng chục, bên phải là hàng đơn vị.",
      "9 × 4: gập ngón thứ 4 ⇒ 3 ngón trái, 6 ngón phải ⇒ 36.",
      "9 × 5 = 45 rồi 9 × 6 = 54 — hàng chục tăng 1, hàng đơn vị giảm 1.",
    ],
    r: "Tổng hai chữ số của tích trong bảng nhân 9 luôn bằng 9.",
  },
  "g3-c2-l9": {
    e: "Nhân số có hai chữ số với số có một chữ số: nhân từ phải sang trái và nhớ sang hàng chục.",
    p: [
      "Ví dụ 24 × 3: 4 × 3 = 12 viết 2 nhớ 1; 2 × 3 = 6, thêm 1 nhớ thành 7 ⇒ 72.",
      "Đặt tính thẳng cột: hàng đơn vị dưới hàng đơn vị.",
      "Phần nhớ bao nhiêu thì cộng vào tích của hàng bên trái.",
    ],
    r: "Nhân hàng đơn vị trước, hàng chục sau — nhớ 1 sang hàng chục.",
  },
  "g3-c2-l11": {
    e: "Dùng mười ngón tay để nhân 9 với các số từ 1 đến 10.",
    p: [
      "Gập ngón thứ n: ngón bên trái là hàng chục, ngón bên phải là hàng đơn vị.",
      "9 × 7: gập ngón thứ 7 ⇒ 6 ngón trái, 3 ngón phải ⇒ 63.",
      "Thử lại bằng tổng hai chữ số: 6 + 3 = 9 ✔",
    ],
    r: "Kết quả ảo thuật ngón tay phải khớp với bảng nhân 9 đã học.",
  },
  "g3-c2-l12": {
    e: "Tính nhẩm nhanh bằng cách đưa phép nhân lạ về phép nhân đã thuộc.",
    p: [
      "Nhân 9 = nhân 10 rồi bớt đi một lần số đó: 9 × 7 = 70 - 7 = 63.",
      "Nhân 6 = nhân 3 rồi gấp đôi: 6 × 8 = 24 × 2 = 48.",
      "Nhân 5 = một nửa của nhân 10.",
    ],
    r: "Mẹo bắc cầu giúp tính nhẩm nhanh mà không cần bảng nhân mới.",
  },

  // ══ CHƯƠNG 3 — bảng chia 6, 7, 8, 9, chia có dư ══
  "g3-c3-l1": {
    e: "Bảng chia 6: 6 : 6 = 1, 12 : 6 = 2, 18 : 6 = 3, …, 60 : 6 = 10.",
    p: [
      "Nhẩm bảng nhân 6: 42 : 6 = 7 vì 6 × 7 = 42.",
      "Số bị chia trong bảng chia 6 là các tích của bảng nhân 6.",
      "6 × 8 = 48 ⇒ 48 : 6 = 8.",
    ],
    r: "Muốn chia cho 6, tự hỏi: số nào nhân với 6 thì ra số bị chia?",
  },
  "g3-c3-l3": {
    e: "Bảng chia 7: 7 : 7 = 1, 14 : 7 = 2, 21 : 7 = 3, …, 70 : 7 = 10.",
    p: [
      "Nhẩm bảng nhân 7: 56 : 7 = 8 vì 7 × 8 = 56.",
      "Số bị chia trong bảng chia 7 là các tích của bảng nhân 7.",
      "7 × 9 = 63 ⇒ 63 : 7 = 9.",
    ],
    r: "Phép chia cho 7 là phép ngược của bảng nhân 7.",
  },
  "g3-c3-l4": {
    e: "Bảng chia 8: 8 : 8 = 1, 16 : 8 = 2, 24 : 8 = 3, …, 80 : 8 = 10.",
    p: [
      "Nhẩm bảng nhân 8: 32 : 8 = 4 vì 8 × 4 = 32.",
      "Số bị chia trong bảng chia 8 là các tích của bảng nhân 8.",
      "72 : 8 = 9 vì 8 × 9 = 72.",
    ],
    r: "Nhân ngược lại thương với 8 để kiểm tra kết quả phép chia.",
  },
  "g3-c3-l5": {
    e: "Bảng chia 9: 9 : 9 = 1, 18 : 9 = 2, 27 : 9 = 3, …, 90 : 9 = 10.",
    p: [
      "Nhẩm bảng nhân 9: 45 : 9 = 5 vì 9 × 5 = 45.",
      "Thương của phép chia cho 9 chính là thừa số còn lại trong bảng nhân 9.",
      "81 : 9 = 9 vì 9 × 9 = 81.",
    ],
    r: "Nếu tổng các chữ số của số bị chia chia hết cho 9 thì số đó chia hết cho 9.",
  },
  "g3-c3-l9": {
    e: "Chia số có hai chữ số cho số có một chữ số: chia lần lượt từ hàng cao nhất sang phải.",
    p: [
      "Ví dụ 48 : 4: 4 : 4 = 1; 8 : 4 = 2 ⇒ 12.",
      "48 : 3: 4 : 3 = 1 dư 1, hạ 8 xuống thành 18; 18 : 3 = 6 ⇒ 16.",
      "Thử lại bằng phép nhân: thương × số chia = số bị chia.",
    ],
    r: "Chia hàng chục trước, hạ tiếp hàng đơn vị xuống khi còn dư.",
  },
  "g3-c3-l6": {
    e: "Chia có dư là chia không hết: vẫn còn thừa ra một số nhỏ hơn số chia.",
    x: "17 : 3 = 5 (dư 2) vì 3 × 5 = 15 và 17 - 15 = 2.",
    r: "Số bị chia = Thương × Số chia + Số dư.",
  },
  "g3-c3-l7": {
    e: "Số dư luôn bé hơn số chia, nếu không thì còn chia tiếp được.",
    x: "20 : 6 = 3 (dư 2) vì 6 × 3 = 18; nếu dư 6 thì phải chia thêm một lần nữa.",
    r: "Số dư < Số chia là điều kiện bắt buộc của phép chia có dư.",
  },
  "g3-c3-l8": {
    e: "Đặt tính rồi chia: tìm thương và số dư của phép chia.",
    x: "19 : 3 = 6 (dư 1) và 29 : 4 = 7 (dư 1).",
    r: "Thử lại: Thương × Số chia + Số dư = Số bị chia.",
  },
  "g3-c3-l10": {
    e: "Phân biệt chia hết (dư 0) và chia có dư (dư khác 0).",
    x: "24 : 6 = 4 (chia hết); còn 25 : 6 = 4 (dư 1) — chỉ hơn 1 đơn vị đã có dư.",
    r: "Chia hết thì số dư bằng 0; chia có dư thì số dư bé hơn số chia.",
  },
  "g3-c3-l11": {
    e: "Biết hai thành phần thì tìm được thành phần còn lại của phép chia hết.",
    p: [
      "Tìm số bị chia: lấy thương nhân với số chia. □ : 6 = 7 ⇒ □ = 42.",
      "Tìm số chia: lấy số bị chia chia cho thương. 54 : □ = 9 ⇒ □ = 6.",
      "Thử lại bằng phép nhân sau khi tìm được.",
    ],
    r: "Tìm số bị chia thì nhân, tìm số chia thì chia.",
  },
  "g3-c3-l12": {
    e: "Đóng gói quà: thương là số hộp đầy, số dư là phần còn thừa.",
    x: "17 cái kẹo chia vào hộp 5 cái ⇒ 17 : 5 = 3 (dư 2): được 3 hộp đầy và thừa 2 cái kẹo.",
    r: "Nếu phải đựng hết thì cần thêm một hộp nữa — số hộp là thương cộng 1.",
  },

  // ══ CHƯƠNG 4 — nhân chia số có nhiều chữ số ══
  "g3-c4-l7": {
    e: "Nhân số có năm chữ số với số có một chữ số: nhân lần lượt từng hàng từ phải sang trái.",
    p: [
      "Ví dụ 12 034 × 2: 4×2=8, 3×2=6, 0×2=0, 2×2=4, 1×2=2 ⇒ 24 068.",
      "Phần nhớ phải cộng vào tích của hàng bên trái.",
      "Chữ số 0 trong số bị nhân vẫn phải nhân đủ các hàng.",
    ],
    r: "Mỗi hàng nhân rồi cộng thêm phần nhớ của hàng bên phải.",
  },
  "g3-c4-l8": {
    e: "Chia số có năm chữ số cho số có một chữ số: chia từ hàng cao nhất rồi hạ dần từng chữ số.",
    p: [
      "Ví dụ 24 068 : 2 = 12 034 vì chia lần lượt từng hàng.",
      "Số dư của mỗi lượt chia phải bé hơn số chia.",
      "Thử lại: thương × số chia + số dư = số bị chia.",
    ],
    r: "Chia hàng cao nhất trước, còn dư thì hạ chữ số kế tiếp xuống rồi chia tiếp.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════

const CHUOI_DEM = [
  "Thực hiện phép tính từ trái sang phải, đặt tính thẳng cột:",
  "Nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước",
  "Chia từ trái sang phải: Chia từ chữ số ở hàng cao nhất trước.",
  "Nhân: nhân từ phải sang trái. Chia: chia từ trái sang phải.",
  "Trong phép chia có dư: Số bị chia = (Thương × Số chia) + Số dư.",
  "Quy tắc vàng: Số dư luôn bé hơn Số chia",
  "Tính: 17 : 3 = ?",
];

let src = fs.readFileSync(FILE, "utf8");
const truoc = CHUOI_DEM.map((c) => src.split(c).length - 1);

const khuc = src.split(/(?=["']?id["']?: "g3-c\d+-l\d+",)/g);
const ids = Object.keys(NOI_DUNG);
const daSua = new Set();
const loi = [];
const demKhoa = { e: 0, x: 0, p: 0, r: 0 };

// (1) Chuỗi đơn (explanation / rule) — chịu cả kiểu viết cùng dòng và xuống dòng.
function thayChuoi(k, ten, giaTri) {
  return k.replace(
    new RegExp(
      `^([ \\t]*)["']?${ten}["']?:[ \\t]*(?:\\r?\\n[ \\t]*)?("(?:[^"\\\\]|\\\\.)*")(,?)$`,
      "gm",
    ),
    (_m, ws, _cu, cuoi) => {
      demKhoa[ten === "rule" ? "r" : "e"] += 1;
      return `${ws}${ten}: ${JSON.stringify(giaTri)}${cuoi}`;
    },
  );
}

// (2) Mảng chuỗi — khớp cả mảng một dòng lẫn nhiều dòng (xem bẫy ở bộ nhớ repo).
function thayMang(k, ten, mang) {
  return k.replace(
    new RegExp(`^([ \\t]*)["']?${ten}["']?: \\[[^[\\]]*\\]`, "gm"),
    (_m, ws) => {
      demKhoa.p += 1;
      if (mang.length === 1) return `${ws}${ten}: [${JSON.stringify(mang[0])}]`;
      const dong = mang.map((t) => `${ws}  ${JSON.stringify(t)},`).join("\n");
      return `${ws}${ten}: [\n${dong}\n${ws}]`;
    },
  );
}

// (3) example — CHỈ nhận khi trong đó đúng một khoá `text` (khoá lạ thì báo, không ghi).
function thayViDu(k, text) {
  const m = k.match(/^([ \t]*)example: \{\r?\n([\s\S]*?)\n[ \t]*\}(,?)/m);
  if (!m) return k;
  const benTrong = [...m[2].matchAll(/^[ \t]*["']?([a-zA-Z_]+)["']?:/gm)].map(
    (x) => x[1],
  );
  if (benTrong.length !== 1 || benTrong[0] !== "text") {
    loi.push(`example có khoá lạ: ${benTrong.join(", ")}`);
    return k;
  }
  demKhoa.x += 1;
  // Dùng hàm thay thế (không dùng chuỗi) để `$` trong nội dung không bị hiểu là ký hiệu đặc biệt.
  return k.replace(
    m[0],
    () =>
      `${m[1]}example: {\n${m[1]}  text: ${JSON.stringify(text)},\n${m[1]}}${m[3]}`,
  );
}

const ra = khuc.map((k) => {
  const id = k.match(/["']?id["']?: "(g3-c\d+-l\d+)",/)?.[1];
  if (!id || !NOI_DUNG[id]) return k;
  const nd = NOI_DUNG[id];
  const t0 = { ...demKhoa };

  // 🔴 CHỈ SỬA BÊN TRONG SLIDE KHÁI NIỆM. Mẫu `points` không phân biệt slide, nên bản đầu đã
  // ghi dè luôn mảng `points` của slide `summary` — lời tóm tắt RIÊNG của bài ("6, 12, 18,
  // 24, 30"). Đã mắc thật: 18 bài Lớp 3 bị đè ⇒ phục hồi từ bản sao lưu rồi chạy lại.
  const iC = k.indexOf('type: "concept"');
  const jC = iC < 0 ? -1 : k.indexOf("\n            },", iC);
  if (iC < 0 || jC < 0) {
    loi.push(`${id} → không thấy khối concept`);
    return k;
  }
  const dauKhoi = k.slice(0, iC);
  const khoi = k.slice(iC, jC);
  const cuoiKhoi = k.slice(jC);

  let out = khoi;
  if (nd.e !== undefined) out = thayChuoi(out, "explanation", nd.e);
  if (nd.x !== undefined) out = thayViDu(out, nd.x);
  if (nd.p !== undefined) out = thayMang(out, "points", nd.p);
  if (nd.r !== undefined) out = thayChuoi(out, "rule", nd.r);

  const thieu = [];
  if (nd.e !== undefined && demKhoa.e === t0.e) thieu.push("explanation");
  if (nd.x !== undefined && demKhoa.x === t0.x) thieu.push("example");
  if (nd.p !== undefined && demKhoa.p === t0.p) thieu.push("points");
  if (nd.r !== undefined && demKhoa.r === t0.r) thieu.push("rule");
  if (thieu.length) loi.push(`${id} → không thay được: ${thieu.join(", ")}`);

  daSua.add(id);
  return dauKhoi + out + cuoiKhoi;
});

const khongThay = ids.filter((id) => !daSua.has(id));
if (loi.length || khongThay.length) {
  console.error("🔴 DỪNG — không ghi file.");
  khongThay.forEach((id) => console.error(`   Không thấy bài: ${id}`));
  loi.forEach((t) => console.error(`   ${t}`));
  process.exit(1);
}

src = ra.join("");
fs.writeFileSync(FILE, src, "utf8");

console.log(
  `✅ Đã viết lại ${daSua.size}/${ids.length} bài — explanation ${demKhoa.e}, points ${demKhoa.p}, example ${demKhoa.x}, rule ${demKhoa.r}.`,
);
console.log("── Câu đệm còn sót (phải về 0 hết) ──");
let sot = 0;
CHUOI_DEM.forEach((c, i) => {
  const sau = src.split(c).length - 1;
  if (sau > 0) {
    sot += 1;
    console.log(`   ⚠️ còn ${sau} chỗ: “${c.slice(0, 50)}…”`);
  }
});
if (!sot) console.log("   🎉 Không còn câu đệm nào.");
console.log(`   (số chỗ trước khi sửa: ${truoc.join(", ")})`);
