// Viết lại phần "kiến thức trọng tâm" đang viết theo mẫu chung chung ở Lớp 3.
//
// VẤN ĐỀ: bộ sinh nội dung cũ điền cho 38 bài đúng hai gạch đầu dòng vô nghĩa
// ("Nắm chắc quy tắc toán học chuẩn SGK." / "Rèn luyện kỹ năng tư duy…") và một câu
// quy tắc chung. Bài vẫn hợp lệ về kỹ thuật nên cổng không bắt được, nhưng với bé thì
// phần đó KHÔNG NÓI GÌ CẢ — tệ hơn cả việc không có.
//
// CÁCH LÀM: hai khối đó là CHUỖI GIỐNG NHAU ở cả 38 bài, nên thay theo VỊ TRÍ (phần tử
// thứ i trong mảng dưới đây ứng với lần xuất hiện thứ i trong file, đúng thứ tự đọc).
// ⚠️ Trước khi ghi, script ĐẾM và DỪNG nếu số lượng không khớp — thà không ghi còn hơn
//    gán nội dung của bài này sang bài khác.
// ⚠️ KHÔNG thay `badge` theo cách này: chuỗi "Kiến Thức Trọng Tâm" xuất hiện 81 lần
//    (38 bài mẫu chung + 43 bài đã có nội dung thật) nên thay theo vị trí sẽ lệch.
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop3.mjs

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade3Data.js");

// Thứ tự PHẢI khớp thứ tự xuất hiện trong file (xem scratch/liet-ke-kien-thuc-chung.mjs).
const NOI_DUNG = [
  // ── Chương 1: Ôn tập & Bổ sung (số đến 10 000) ──
  {
    id: "g3-c1-l1 (Ôn tập phép tính Lớp 2)",
    p: [
      "Cộng, trừ trong phạm vi 100: đặt tính thẳng cột rồi tính từ phải sang trái.",
      "Nhân, chia dựa vào bảng cửu chương 2, 3, 4, 5 đã học ở Lớp 2.",
    ],
    r: "Tính xong nên kiểm tra lại bằng phép tính ngược (cộng ↔ trừ, nhân ↔ chia).",
  },
  {
    id: "g3-c1-l2 (Các số có bốn chữ số)",
    p: [
      "Số có bốn chữ số gồm bốn hàng: nghìn, trăm, chục, đơn vị.",
      "Ví dụ 4 275: 4 nghìn, 2 trăm, 7 chục và 5 đơn vị.",
    ],
    r: "Đọc số theo thứ tự từ hàng cao xuống hàng thấp: bốn nghìn hai trăm bảy mươi lăm.",
  },
  {
    id: "g3-c1-l3 (Các số tròn nghìn)",
    p: [
      "Số tròn nghìn chỉ có chữ số ở hàng nghìn, các hàng còn lại đều là 0.",
      "1 000, 2 000 … 9 000 hơn kém nhau đúng 1 000.",
    ],
    r: "Muốn tìm số tròn nghìn tiếp theo thì đếm thêm 1 000.",
  },
  {
    id: "g3-c1-l4 (Số 10.000)",
    p: ["10 000 = 10 nghìn = 1 vạn.", "10 000 là số bé nhất có năm chữ số."],
    r: "Mười nghìn gộp lại thành một vạn — đọc là “mười nghìn” hoặc “một vạn”.",
  },
  {
    id: "g3-c1-l5 (So sánh số trong phạm vi 10.000)",
    p: [
      "Số nào có nhiều chữ số hơn thì số đó lớn hơn.",
      "Cùng số chữ số thì so từng hàng từ trái sang phải.",
    ],
    r: "So sánh lần lượt từ hàng nghìn rồi đến trăm, chục, đơn vị.",
  },
  {
    id: "g3-c1-l6 (Cộng không nhớ trong phạm vi 10.000)",
    p: [
      "Đặt tính thẳng cột: nghìn dưới nghìn, trăm dưới trăm, chục dưới chục.",
      "Cộng từng hàng từ phải sang trái; không hàng nào vượt 10 nên không phải nhớ.",
    ],
    r: "Cộng từ phải sang trái, mỗi hàng viết kết quả thẳng cột với hàng đó.",
  },
  {
    id: "g3-c1-l7 (Cộng có nhớ trong phạm vi 10.000)",
    p: [
      "Tổng của một hàng từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng liền trước.",
      "Ví dụ 3 468 + 1 237: hàng đơn vị 8 + 7 = 15, viết 5 và nhớ 1.",
    ],
    r: "Số đã nhớ phải được cộng vào hàng kế tiếp, không được bỏ quên.",
  },
  {
    id: "g3-c1-l8 (Trừ không nhớ trong phạm vi 10.000)",
    p: [
      "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
      "Hàng trên luôn lớn hơn hàng dưới nên không phải mượn.",
    ],
    r: "Trừ theo thứ tự: đơn vị, chục, trăm, nghìn.",
  },
  {
    id: "g3-c1-l9 (Trừ có nhớ trong phạm vi 10.000)",
    p: [
      "Không trừ được thì mượn 1 ở hàng liền trước, hàng đang tính được thêm 10.",
      "Ví dụ 5 342 - 1 275: 2 không trừ được 5 nên mượn 1 chục thành 12 - 5 = 7.",
    ],
    r: "Hàng đã cho mượn phải bớt đi 1, và nhớ trừ đi 1 ở lượt tính sau.",
  },
  {
    id: "g3-c1-l10 (Luyện tập tổng hợp Chương 1)",
    p: [
      "Bốn dạng bài của chương: đọc - viết số, so sánh số, làm tròn số, cộng trừ trong phạm vi 10 000.",
      "Làm tròn đến hàng nghìn thì xét chữ số hàng trăm.",
    ],
    r: "Đọc kỹ đề để nhận ra dạng bài, rồi đặt tính hoặc nhẩm thật cẩn thận.",
  },
  {
    id: "g3-c1-l11 (Làm tròn đến hàng trăm, hàng nghìn)",
    p: [
      "Làm tròn hàng trăm thì xét chữ số hàng chục; từ 5 trở lên thì thêm 1 vào hàng trăm.",
      "Ví dụ 3 468 làm tròn đến hàng trăm được 3 500.",
    ],
    r: "Làm tròn đến hàng nào thì chỉ xét chữ số đứng ngay BÊN PHẢI hàng đó.",
  },
  {
    id: "g3-c1-l12 (Thám tử tìm số bí ẩn có 4 chữ số)",
    p: [
      "Đọc từng điều kiện rồi tìm chữ số thỏa mãn TẤT CẢ các điều kiện đó.",
      "Ví dụ: số có bốn chữ số, hàng nghìn là 3, tổng các chữ số bằng 10.",
    ],
    r: "Loại dần những khả năng sai — đừng đoán bừa rồi thử.",
  },

  // ── Chương 2 ──
  {
    id: "g3-c2-l10 (Luyện tập chung bảng cửu chương)",
    p: [
      "Đã học đủ bảng nhân 6, 7, 8, 9 và các bảng chia tương ứng.",
      "Mẹo bảng 9: 9 × n = 10 × n - n (ví dụ 9 × 7 = 70 - 7 = 63).",
    ],
    r: "Kiểm tra kết quả phép nhân bằng một phép chia tương ứng.",
  },

  // ── Chương 4: Các số đến 100 000 & chữ số La Mã ──
  {
    id: "g3-c4-l1 (Các số có năm chữ số)",
    p: [
      "Số có năm chữ số gồm năm hàng: chục nghìn, nghìn, trăm, chục, đơn vị.",
      "Ví dụ 45 231: 4 chục nghìn, 5 nghìn, 2 trăm, 3 chục và 1 đơn vị.",
    ],
    r: "Đọc số từ hàng chục nghìn xuống hàng đơn vị.",
  },
  {
    id: "g3-c4-l2 (Các số tròn chục nghìn)",
    p: [
      "Số tròn chục nghìn chỉ có chữ số ở hàng chục nghìn, các hàng còn lại là 0.",
      "10 000, 20 000 … 90 000 hơn kém nhau đúng 10 000.",
    ],
    r: "Đếm thêm 10 000 để được số tròn chục nghìn tiếp theo.",
  },
  {
    id: "g3-c4-l3 (Đọc và viết số có năm chữ số)",
    p: [
      "Khi viết số phải viết đủ năm chữ số, kể cả chữ số 0 ở giữa.",
      "Ví dụ “năm mươi nghìn bốn trăm linh bảy” viết là 50 407.",
    ],
    r: "Đọc “linh” khi hàng chục bằng 0 mà hàng đơn vị khác 0.",
  },
  {
    id: "g3-c4-l4 (So sánh số trong phạm vi 100.000)",
    p: [
      "Số nào có nhiều chữ số hơn thì lớn hơn.",
      "Cùng số chữ số thì so từ hàng chục nghìn trở xuống.",
    ],
    r: "So lần lượt từ trái sang phải; gặp hàng khác nhau là kết luận được ngay.",
  },
  {
    id: "g3-c4-l5 (Cộng trong phạm vi 100.000)",
    p: [
      "Đặt tính thẳng cột rồi cộng từ phải sang trái.",
      "Ví dụ: 32 145 + 4 236 = 36 381.",
    ],
    r: "Tổng một hàng từ 10 trở lên thì phải nhớ 1 sang hàng liền trước.",
  },
  {
    id: "g3-c4-l6 (Trừ trong phạm vi 100.000)",
    p: [
      "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
      "Ví dụ: 45 780 - 12 350 = 33 430.",
    ],
    r: "Không trừ được thì mượn 1 ở hàng liền trước rồi trừ tiếp.",
  },
  {
    id: "g3-c4-l9 (Làm tròn đến hàng nghìn, hàng chục nghìn)",
    p: [
      "Làm tròn đến hàng nghìn thì xét chữ số hàng trăm.",
      "Ví dụ 45 231 làm tròn đến hàng nghìn được 45 000 vì 231 bé hơn 500.",
    ],
    r: "Làm tròn đến hàng nào thì chỉ xét chữ số ngay bên phải hàng đó.",
  },
  {
    id: "g3-c4-l10 (Luyện tập tổng hợp số đến 100.000)",
    p: [
      "Bốn kỹ năng: đọc - viết số, so sánh số, làm tròn số và cộng trừ.",
      "Chữ số La Mã: I = 1, V = 5, X = 10, L = 50, C = 100.",
    ],
    r: "Chữ nhỏ đứng trước chữ lớn thì trừ đi (IV = 5 - 1 = 4).",
  },
  {
    id: "g3-c4-l12 (Đố vui thám tử: giải mã số có 5 chữ số)",
    p: [
      "Ghi từng điều kiện ra nháp rồi tìm chữ số thỏa mãn tất cả điều kiện.",
      "Ví dụ: số có năm chữ số, hàng nghìn là 7, tổng các chữ số bằng 20.",
    ],
    r: "Thử từ hàng cao nhất trước để nhanh thu hẹp khả năng.",
  },

  // ── Chương 7: Đo lường & tiền Việt Nam ──
  {
    id: "g3-c7-l6 (Đổi tiền và gom tiền)",
    p: [
      "Gom tiền là chọn các tờ tiền có tổng đúng bằng số tiền cần.",
      "Ví dụ 50 000 đồng = một tờ 50 000, hoặc hai tờ 20 000 và một tờ 10 000.",
    ],
    r: "Cùng một số tiền có nhiều cách gom — chọn cách ít tờ nhất cho gọn.",
  },
  {
    id: "g3-c7-l7 (Mua sắm và tính tiền thừa)",
    p: [
      "Tiền thừa = số tiền đưa - số tiền phải trả.",
      "Ví dụ: mua hết 32 000 đồng, đưa 50 000 đồng thì được thối lại 18 000 đồng.",
    ],
    r: "Đổi tất cả về cùng đơn vị (đồng) trước khi tính.",
  },
  {
    id: "g3-c7-l8 (Xem lịch tháng và năm)",
    p: [
      "Một năm có 12 tháng; tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.",
      "Tháng 4, 6, 9, 11 có 30 ngày; tháng 2 có 28 hoặc 29 ngày.",
    ],
    r: "Nắm các khớp ngón tay để nhớ tháng nào có 31 ngày.",
  },
  {
    id: "g3-c7-l9 (Thế kỷ và năm nhuận)",
    p: [
      "1 thế kỷ = 100 năm. Thế kỷ 21 bắt đầu từ năm 2001.",
      "Năm nhuận là năm chia hết cho 4; tháng 2 năm nhuận có 29 ngày.",
    ],
    r: "Năm chia hết cho 4 là năm nhuận (trừ năm tròn thế kỷ không chia hết cho 400).",
  },
  {
    id: "g3-c7-l10 (Luyện tập tổng hợp đo lường & tiền tệ)",
    p: [
      "Bảng đơn vị: mm, cm, dm, m, km; g, kg; ml, l; độ C.",
      "Tiền Việt Nam có các mệnh giá 1 000, 2 000, 5 000, 10 000 đồng…",
    ],
    r: "Đổi về cùng một đơn vị trước khi cộng, trừ hoặc so sánh.",
  },
  {
    id: "g3-c7-l11 (Đi siêu thị mini: tiền mua hàng và tiền thối)",
    p: [
      "Bước 1: tính tổng tiền các món đã mua.",
      "Bước 2: lấy số tiền đã đưa trừ đi tổng tiền để ra tiền thối lại.",
    ],
    r: "Tính tổng tiền trước, rồi mới tính tiền thừa.",
  },

  // ── Chương 8: Giải bài toán bằng hai bước tính ──
  {
    id: "g3-c8-l4 (Bài toán rút về đơn vị - dạng 1)",
    p: [
      "Bước 1: tìm giá trị của MỘT phần (lấy tổng chia cho số phần bằng nhau).",
      "Bước 2: nhân giá trị một phần với số phần cần tìm.",
    ],
    r: "Đề hỏi “mấy cái như thế” thì phải rút về đơn vị rồi mới nhân.",
  },
  {
    id: "g3-c8-l5 (Bài toán rút về đơn vị - dạng 2)",
    p: [
      "Bước 1: tìm giá trị của một phần.",
      "Bước 2: dùng giá trị một phần để chia hoặc nhân tiếp theo yêu cầu của đề.",
    ],
    r: "Dạng 2 vẫn rút về đơn vị trước, chỉ khác dạng 1 ở bước tính thứ hai.",
  },
  {
    id: "g3-c8-l6 (Bài toán mua bán nhiều mặt hàng)",
    p: [
      "Tính tiền từng mặt hàng: đơn giá nhân với số lượng.",
      "Cộng tiền của các mặt hàng lại để ra tổng số tiền phải trả.",
    ],
    r: "Viết phép tính cho TỪNG mặt hàng rồi mới cộng, đừng gộp nhẩm.",
  },
  {
    id: "g3-c8-l7 (Vẽ sơ đồ đoạn thẳng giải toán)",
    p: [
      "Sơ đồ đoạn thẳng giúp nhìn ra số lớn, số bé và phần hơn kém.",
      "Đoạn dài là số lớn, đoạn ngắn là số bé, phần dài hơn chính là hiệu.",
    ],
    r: "Vẽ sơ đồ đúng tỉ lệ thì nhìn hình là biết phải cộng hay trừ.",
  },
  {
    id: "g3-c8-l8 (Tìm một trong các phần bằng nhau - kết hợp)",
    p: [
      "Tìm một phần: lấy tổng chia cho số phần bằng nhau.",
      "Kết hợp với phép cộng hoặc trừ để tìm phần còn lại.",
    ],
    r: "Phải chỉ ra đâu là “một phần” trước khi tính.",
  },
  {
    id: "g3-c8-l10 (Luyện tập tổng hợp giải toán hai bước)",
    p: [
      "Các dạng đã học: rút về đơn vị, nhiều hơn - ít hơn, gấp - giảm số lần, tìm một phần.",
      "Bài toán hai bước phải làm lần lượt bước 1 rồi mới đến bước 2.",
    ],
    r: "Đọc kỹ đề để biết bước 1 làm gì và bước 2 làm gì.",
  },

  // ── Chương 9: Thống kê & khả năng ──
  {
    id: "g3-c9-l1 (Thu thập và phân tích bảng số liệu)",
    p: [
      "Bảng số liệu gồm tên các nhóm (đọc theo hàng) và số liệu tương ứng (đọc theo cột).",
      "Số cần tìm nằm ở ô giao nhau của hàng và cột.",
    ],
    r: "Đọc đúng hàng và cột trước khi lấy số, tránh lấy nhầm số của nhóm khác.",
  },
  {
    id: "g3-c9-l2 (Chắc chắn, có thể, không thể)",
    p: [
      "KHÔNG THỂ: hộp chỉ có bi đỏ thì không thể lấy được bi xanh.",
      "CHẮC CHẮN: hộp chỉ có bi đỏ thì chắc chắn lấy được bi đỏ.",
      "CÓ THỂ: hộp có cả bi đỏ lẫn bi xanh thì lấy ra có thể được bi đỏ.",
    ],
    r: "Xem trong hộp (hoặc trong tình huống) có những khả năng nào rồi mới kết luận.",
  },

  // ── Chương 10: Ôn tập cuối năm ──
  {
    id: "g3-c10-l1 (Ôn tập bốn phép tính trong phạm vi 100.000)",
    p: [
      "Cộng, trừ: đặt tính thẳng cột rồi tính từ phải sang trái.",
      "Nhân: tính từ phải sang trái; chia: tính từ trái sang phải.",
    ],
    r: "Thử lại kết quả: cộng thì lấy tổng trừ đi một số hạng, nhân thì lấy tích chia cho một thừa số.",
  },
  {
    id: "g3-c10-l3 (Đại lễ vinh danh Trạng Nguyên Lớp 3)",
    p: [
      "Nắm vững số đến 100 000, bốn phép tính, hình học và đo lường.",
      "Biết giải bài toán hai bước và đọc bảng số liệu.",
    ],
    r: "Tự tin vận dụng kiến thức Lớp 3 để bước vào Lớp 4!",
  },
];

// ───────────────────────────────────────────────────────────────────────────

const src = fs.readFileSync(FILE, "utf8");

const MAU_DIEM =
  /"Nắm chắc quy tắc toán học chuẩn SGK\.",\n(\s*)"Rèn luyện kỹ năng tư duy và trình bày lời giải rõ ràng\."/g;
const MAU_RULE =
  /"Đọc kỹ đề bài, suy nghĩ cẩn thận và kiểm tra lại kết quả\."/g;

const nDiem = [...src.matchAll(MAU_DIEM)].length;
const nRule = [...src.matchAll(MAU_RULE)].length;
console.log(`Tìm thấy ${nDiem} khối gạch đầu dòng và ${nRule} câu quy tắc.`);

if (nDiem !== NOI_DUNG.length || nRule !== NOI_DUNG.length) {
  console.error(
    `🔴 SỐ LƯỢNG KHÔNG KHỚP (mong đợi ${NOI_DUNG.length}) — DỪNG, không ghi gì.`,
  );
  process.exit(1);
}

let i = 0;
let ra = src.replace(MAU_DIEM, (_m, thutLe) => {
  const it = NOI_DUNG[i];
  const dong = it.p
    .map((t, k) => (k < it.p.length - 1 ? `"${t}",` : `"${t}"`))
    .join(`\n${thutLe}`);
  console.log(`  ${String(i + 1).padStart(2)}. ${it.id}`);
  i += 1;
  return dong;
});

let j = 0;
ra = ra.replace(MAU_RULE, () => `"${NOI_DUNG[j++].r}"`);

// Sửa luôn tiêu đề sai của slide khái niệm ở bài luyện tập tổng hợp chương 8.
const SAI = '"Hình học hai bước:"';
if (ra.includes(SAI)) {
  ra = ra.replace(SAI, '"Luyện tập tổng hợp giải toán hai bước"');
  console.log("  ↳ đã sửa tiêu đề sai “Hình học hai bước:” ở g3-c8-l10");
}

fs.writeFileSync(FILE, ra, "utf8");
console.log(
  `\n✅ Đã viết lại ${i} bài. Chạy lại công cụ liệt kê để xác nhận còn 0.`,
);
