// Viết lại "Kiến thức trọng tâm" cho 13 bài Lớp 4 + Lớp 5 (bộ sinh cũ dùng chung ba câu):
//   "Nắm chắc lý thuyết, công thức và quy tắc toán học tương ứng."
//   "Phân tích kỹ đề bài và thực hiện từng bước tính toán cẩn thận."
//   "Ghi nhớ công thức cốt lõi và kiểm tra lại kết quả sau khi hoàn thành."
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop45.mjs
// 🔴 CHỈ SỬA TRONG SLIDE KHÁI NIỆM — xem ghi chú `iC/jC` (đã từng ghi đè `summary` của 55 bài Lớp 2
//    và 18 bài Lớp 3, phải phục hồi từ bản sao lưu).

import fs from "node:fs";
import path from "node:path";

// e = explanation, p = points, r = rule
const LOP4 = {
  "g4-c6-l1": {
    e: "Ôn lại số tự nhiên và bốn phép tính với số tự nhiên.",
    p: [
      "Đọc, viết, so sánh số tự nhiên và nêu giá trị của từng chữ số theo hàng.",
      "Bốn phép tính cộng, trừ, nhân, chia — đặt tính thẳng cột.",
      "Tính chất giao hoán, kết hợp và nhân một số với một tổng.",
    ],
    r: "Thử lại kết quả bằng phép tính ngược trước khi kết luận.",
  },
  "g4-c6-l2": {
    e: "Ôn lại các đơn vị đo khối lượng, độ dài, diện tích và thời gian.",
    p: [
      "Khối lượng: 1 tấn = 10 tạ = 100 yến = 1000 kg.",
      "Thời gian: 1 giờ = 60 phút; 1 phút = 60 giây; 1 thế kỉ = 100 năm.",
      "Diện tích: 1 m² = 100 dm² = 10 000 cm².",
    ],
    r: "Đổi về cùng một đơn vị đo rồi mới tính.",
  },
  "g4-c6-l3": {
    e: "Ôn lại phân số và bốn phép tính với phân số.",
    p: [
      "Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số.",
      "Cộng, trừ phân số cùng mẫu: cộng, trừ tử số rồi giữ nguyên mẫu số.",
      "Nhân phân số: nhân tử số với tử số, mẫu số với mẫu số.",
    ],
    r: "Khác mẫu số thì phải quy đồng mẫu số trước khi cộng hoặc trừ.",
  },
  "g4-c6-l5": {
    e: "Ôn lại các dạng toán có lời văn đã học ở Lớp 4.",
    p: [
      "Dạng tìm hai số khi biết tổng và hiệu của chúng.",
      "Dạng tìm hai số khi biết tổng và tỉ, hoặc hiệu và tỉ.",
      "Dạng toán trung bình cộng và dạng toán rút về đơn vị.",
    ],
    r: "Tóm tắt đề bằng sơ đồ đoạn thẳng trước khi giải.",
  },
  "g4-c6-l6": {
    e: "Bài cuối của Lớp 4: tổng hợp toàn bộ kiến thức đã học.",
    p: [
      "Số tự nhiên, phân số, dấu hiệu chia hết cho 2, 3, 5, 9.",
      "Đại lượng và hình học: chu vi, diện tích, thể tích.",
      "Giải toán có lời văn và toán về tỉ lệ bản đồ.",
    ],
    r: "Đọc kỹ đề, nhận dạng bài rồi mới chọn cách giải.",
  },
};

const LOP5 = {
  "g5-c1-l9": {
    e: "Luyện tập chung các kiến thức về số của chương 1.",
    p: [
      "So sánh số thập phân: so phần nguyên trước, rồi so từng hàng phần thập phân.",
      "Đổi phân số thập phân thành số thập phân: 3/10 = 0,3.",
      "Viết số đo độ dài, khối lượng dưới dạng số thập phân.",
    ],
    r: "Đọc kỹ yêu cầu để biết cần viết dạng phân số hay số thập phân.",
  },
  "g5-c2-l10": {
    e: "Luyện tập chung các phép tính với số thập phân và dùng máy tính bỏ túi.",
    p: [
      "Cộng, trừ, nhân, chia số thập phân: đặt tính như số tự nhiên rồi đặt dấu phẩy đúng vị trí.",
      "Máy tính bỏ túi giúp kiểm tra lại kết quả đã tính.",
      "Tỉ số phần trăm: 25% của 80 bằng 80 × 25 : 100 = 20.",
    ],
    r: "Máy tính chỉ để kiểm tra kết quả, không thay cho việc tự tính.",
  },
  "g5-c3-l9": {
    e: "Luyện tập chung về hình học: hình thang, tam giác, hình tròn, hình trụ và hình cầu.",
    p: [
      "Diện tích hình tam giác = độ dài đáy × chiều cao : 2.",
      "Diện tích hình tròn = bán kính × bán kính × 3,14.",
      "Thể tích hình hộp chữ nhật = chiều dài × chiều rộng × chiều cao.",
    ],
    r: "Ghi đúng đơn vị: diện tích là cm², thể tích là cm³.",
  },
  "g5-c5-l1": {
    e: "Ôn tập tổng hợp về số tự nhiên, phân số và số thập phân.",
    p: [
      "Số tự nhiên: đọc, viết, so sánh, phân biệt số chẵn và số lẻ.",
      "Phân số: rút gọn, so sánh và tính giá trị của phân số.",
      "Số thập phân: đọc, viết, so sánh và làm tròn số.",
    ],
    r: "Ba loại số này viết qua lại được: 1/2 = 0,5.",
  },
  "g5-c5-l2": {
    e: "Ôn lại bốn phép tính với cả ba loại số đã học.",
    p: [
      "Với phân số: quy đồng rồi cộng, trừ; nhân tử với tử và mẫu với mẫu.",
      "Với số thập phân: đặt tính thẳng hàng dấu phẩy.",
      "Thứ tự thực hiện: trong ngoặc trước, rồi nhân chia, cuối cùng cộng trừ.",
    ],
    r: "Thử lại bằng phép tính ngược để chắc kết quả đúng.",
  },
  "g5-c5-l4": {
    e: "Ôn lại công thức tính diện tích và thể tích các hình đã học.",
    p: [
      "Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2.",
      "Diện tích xung quanh hình hộp chữ nhật = chu vi đáy × chiều cao.",
      "Thể tích hình lập phương = cạnh × cạnh × cạnh.",
    ],
    r: "Phân biệt diện tích (cm²) và thể tích (cm³) nhờ đơn vị của đáp số.",
  },
  "g5-c5-l5": {
    e: "Ôn lại ba đại lượng của toán chuyển động đều và cách tính tỉ số phần trăm.",
    p: [
      "Quãng đường = vận tốc × thời gian.",
      "Vận tốc = quãng đường : thời gian.",
      "Thời gian = quãng đường : vận tốc.",
    ],
    r: "Đơn vị vận tốc phải khớp đơn vị thời gian, ví dụ km/giờ với giờ.",
  },
  "g5-c5-l6": {
    e: "Bài cuối của Lớp 5: tổng hợp toàn bộ kiến thức tiểu học.",
    p: [
      "Số học: số tự nhiên, phân số, số thập phân và tỉ số phần trăm.",
      "Hình học: chu vi, diện tích và thể tích các hình.",
      "Toán chuyển động đều và toán về tỉ lệ.",
    ],
    r: "Bé đã học xong tiểu học — giữ thói quen tính cẩn thận khi lên Lớp 6!",
  },
};

const CHUOI_DEM = [
  "Nắm chắc lý thuyết, công thức và quy tắc toán học tương ứng.",
  "Phân tích kỹ đề bài và thực hiện từng bước tính toán cẩn thận.",
  "Ghi nhớ công thức cốt lõi và kiểm tra lại kết quả sau khi hoàn thành.",
];

const MUC_TIEU = [
  {
    file: path.resolve("client/src/data/grade4Data.js"),
    re: /^(g4-c\d+-l\d+)$/,
    nd: LOP4,
  },
  {
    file: path.resolve("client/src/data/grade5Data.js"),
    re: /^(g5-c\d+-l\d+)$/,
    nd: LOP5,
  },
];

const demKhoa = { e: 0, p: 0, r: 0 };

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

let tongBai = 0;
const loiToanBo = [];
let conSot = 0;

for (const { file, re, nd: NOI_DUNG } of MUC_TIEU) {
  const src = fs.readFileSync(file, "utf8");
  const khuc = src.split(/(?=["']?id["']?: "g\d+-c\d+-l\d+",)/g);
  const ids = Object.keys(NOI_DUNG);
  const daSua = new Set();
  const loiCuaFile = [];

  const ra = khuc.map((k) => {
    const id = k.match(/["']?id["']?: "(g\d+-c\d+-l\d+)",/)?.[1];
    if (!id || !NOI_DUNG[id]) return k;
    const nd = NOI_DUNG[id];
    const t0 = { ...demKhoa };

    // 🔴 Chỉ sửa trong slide khái niệm (khối kết thúc ở dòng đóng slide `            },`).
    const iC = k.indexOf('type: "concept"');
    const jC = iC < 0 ? -1 : k.indexOf("\n            },", iC);
    if (iC < 0 || jC < 0) {
      loiCuaFile.push(`${id} → không thấy khối concept`);
      return k;
    }

    let out = k.slice(iC, jC);
    out = thayChuoi(out, "explanation", nd.e);
    out = thayMang(out, "points", nd.p);
    out = thayChuoi(out, "rule", nd.r);

    const thieu = [];
    if (demKhoa.e === t0.e) thieu.push("explanation");
    if (demKhoa.p === t0.p) thieu.push("points");
    if (demKhoa.r === t0.r) thieu.push("rule");
    if (thieu.length)
      loiCuaFile.push(`${id} → không thay được: ${thieu.join(", ")}`);

    daSua.add(id);
    tongBai += 1;
    return k.slice(0, iC) + out + k.slice(jC);
  });

  for (const id of ids)
    if (!daSua.has(id)) loiCuaFile.push(`Không thấy bài: ${id}`);

  if (loiCuaFile.length) {
    console.error(`🔴 DỪNG — ${path.basename(file)} có lỗi, KHÔNG ghi file:`);
    loiCuaFile.forEach((t) => console.error(`   ${t}`));
    process.exit(1);
  }

  const moi = ra.join("");
  for (const c of CHUOI_DEM) conSot += moi.split(c).length - 1;
  fs.writeFileSync(file, moi, "utf8");
  console.log(
    `✅ ${path.basename(file)}: viết lại ${daSua.size}/${ids.length} bài.`,
  );
}

console.log(
  `   Tổng: ${tongBai} bài — explanation ${demKhoa.e}, points ${demKhoa.p}, rule ${demKhoa.r}.`,
);
console.log(
  conSot === 0
    ? "   🎉 Không còn câu đệm nào trong Lớp 4 và Lớp 5."
    : `   ⚠️ còn ${conSot} câu đệm (chỗ khác trong file, không thuộc bài đã sửa).`,
);
if (loiToanBo.length) {
  console.log("   ⚠️ Cần xem lại: " + loiToanBo.join(" · "));
}
