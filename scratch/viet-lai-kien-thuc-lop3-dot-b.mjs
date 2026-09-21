// Viết lại "Kiến thức trọng tâm" cho 26 bài Lớp 3 — đợt B: chương 5, 6, 7, 8, 10.
//
// Ba nhóm bệnh (bộ sinh cũ dùng chung một khối văn bản cho cả chương):
//   • g3-c5 (12 bài phân số): mọi bài đều dạy "Chia thành 2 phần… một phần hai (1/2)" + pizza
//   • g3-c6 + g3-c8-l9 + g3-c10-l2 (8 bài chu vi): mọi bài đều dạy cả 3 công thức chu vi
//   • g3-c7 (6 bài đo lường): mọi bài đều dạy gam + ml + nhiệt độ + tiền Việt Nam
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop3-dot-b.mjs
// ⚠️ CHỈ SỬA TRONG SLIDE KHÁI NIỆM — xem ghi chú `iC/jC` bên dưới (đã từng ghi đè `summary`).
// ⚠️ Bài nào thiếu khoá cần thay, hoặc `example` có khoá lạ, thì script BÁO và KHÔNG ghi file.

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade3Data.js");

// e = explanation, p = points, x = example.text, r = rule
const NOI_DUNG = {
  // ══ CHƯƠNG 5 — PHÂN SỐ ══
  "g3-c5-l1": {
    e: "Khi chia một vật thành các phần bằng nhau, mỗi phần là một phân số của vật đó.",
    p: [
      "Chia 2 phần bằng nhau và lấy 1 phần: một phần hai (1/2).",
      "Chia 4 phần bằng nhau và lấy 3 phần: ba phần tư (3/4).",
      "Các phần phải BẰNG NHAU — chia không đều thì không gọi là phân số.",
    ],
    x: "Chiếc bánh pizza chia đều 4 phần, bé ăn 1 phần ⇒ bé đã ăn 1/4 chiếc bánh.",
    r: "Phân số chỉ số phần được lấy trên tổng số phần bằng nhau.",
  },
  "g3-c5-l2": {
    e: "Phân số gồm tử số viết trên gạch ngang và mẫu số viết dưới gạch ngang.",
    p: [
      "Mẫu số: tổng số phần bằng nhau được chia ra.",
      "Tử số: số phần được lấy.",
      "Ví dụ 3/5: đã chia 5 phần và lấy 3 phần.",
    ],
    x: "Phân số 3/5 đọc là ba phần năm, có tử số 3 và mẫu số 5.",
    r: "Đọc phân số: đọc tử số, rồi “phần”, sau đó đọc mẫu số.",
  },
  "g3-c5-l3": {
    e: "Mẫu số cho biết chia thành mấy phần, tử số cho biết đã lấy mấy phần.",
    p: [
      "Tử số nằm trên gạch ngang — số phần được lấy.",
      "Mẫu số nằm dưới gạch ngang — số phần bằng nhau.",
      "Cùng mẫu số 7: 2/7 là lấy 2 phần, 5/7 là lấy 5 phần.",
    ],
    x: "Băng giấy chia 7 phần bằng nhau, tô màu 2 phần ⇒ đã tô 2/7 băng giấy.",
    r: "Mẫu số càng lớn thì mỗi phần càng nhỏ.",
  },
  "g3-c5-l4": {
    e: "Khi lấy hết số phần đã chia thì phân số bằng 1.",
    p: [
      "4/4 = 1 vì đã lấy hết 4 phần trong 4 phần.",
      "Tử số bằng mẫu số thì phân số bằng 1: 6/6 = 1, 9/9 = 1.",
      "Một chiếc bánh chia 4 phần mà ăn cả 4 phần thì đã ăn 1 chiếc bánh.",
    ],
    x: "Chia 5 phần bằng nhau rồi lấy cả 5 phần ⇒ 5/5 = 1.",
    r: "Phân số có tử số bằng mẫu số thì bằng 1.",
  },
  "g3-c5-l5": {
    e: "So tử số với mẫu số để biết phân số bé hơn hay lớn hơn 1.",
    p: [
      "Tử số bé hơn mẫu số ⇒ phân số bé hơn 1, ví dụ 3/5.",
      "Tử số lớn hơn mẫu số ⇒ phân số lớn hơn 1, ví dụ 7/5.",
      "Tử số bằng mẫu số ⇒ phân số bằng 1, ví dụ 5/5.",
    ],
    x: "1/4 bé hơn 1 vì mới lấy 1 phần trong 4 phần; 4/4 = 1.",
    r: "So tử số với mẫu số là cách nhanh nhất để so phân số với 1.",
  },
  "g3-c5-l6": {
    e: "Hai phân số cùng mẫu số thì so tử số: tử số nào lớn hơn thì phân số đó lớn hơn.",
    p: [
      "3/7 và 5/7: cùng chia 7 phần, lấy 5 phần nhiều hơn lấy 3 phần.",
      "Mẫu số giống nhau nên mỗi phần đều bằng nhau.",
      "5/8 lớn hơn 2/8, và 2/8 lớn hơn 1/8.",
    ],
    x: "Hai băng giấy dài bằng nhau cùng chia 7 phần: tô 5 phần nhiều hơn tô 3 phần.",
    r: "Cùng mẫu số: tử số lớn hơn thì phân số lớn hơn.",
  },
  "g3-c5-l7": {
    e: "Tô màu hình phân số: đếm số phần bằng nhau rồi tô đúng số phần ở tử số.",
    p: [
      "Mẫu số là số phần chia đều của hình.",
      "Tử số là số phần cần tô màu.",
      "Tô 3/4 hình chữ nhật: chia hình thành 4 phần đều nhau rồi tô 3 phần.",
    ],
    x: "Hình tròn chia 6 phần bằng nhau, tô 5 phần ⇒ đã tô 5/6 hình tròn.",
    r: "Phải chia hình thành các phần ĐỀU nhau rồi mới tô.",
  },
  "g3-c5-l8": {
    e: "Phân số của một tập hợp: chia số đồ vật thành các phần bằng nhau rồi lấy một hay vài phần.",
    p: [
      "1/3 của 12 viên bi là 12 : 3 = 4 viên bi.",
      "2/3 của 12 là 4 × 2 = 8 viên bi.",
      "Chia đều rồi lấy số phần theo tử số.",
    ],
    x: "12 viên bi chia 3 phần bằng nhau ⇒ mỗi phần 4 viên, nên 2/3 là 8 viên.",
    r: "Tìm 1/n của một số bằng cách chia số đó cho n.",
  },
  "g3-c5-l9": {
    e: "Các phân số hay gặp trong đời sống: 1/2, 1/3, 1/4, 1/5 và 3/4.",
    p: [
      "1/2 còn gọi là một nửa; 1/4 gọi là một phần tư.",
      "3/4 gần đầy — chỉ thiếu 1/4 nữa là đủ cả vật.",
      "1 giờ có 60 phút nên 1/2 giờ = 30 phút, 1/4 giờ = 15 phút.",
    ],
    x: "1/2 giờ là 30 phút và 1/4 giờ là 15 phút.",
    r: "Đọc phân số trong đời sống: nửa, một phần ba, một phần tư…",
  },
  "g3-c5-l10": {
    e: "Bốn dạng bài của chương: đọc phân số, viết phân số, so sánh phân số và tìm phân số của một số.",
    p: [
      "Viết phân số: tử số trên, mẫu số dưới.",
      "So sánh cùng mẫu số: so tử số với nhau.",
      "Tìm 1/n của một số: chia cho n rồi lấy theo tử số.",
    ],
    x: "So sánh 4/9 và 7/9: cùng mẫu số 9 và 4 bé hơn 7 nên 4/9 bé hơn 7/9.",
    r: "Xác định đúng tử số và mẫu số trước khi làm bài.",
  },
  "g3-c5-l11": {
    e: "Hai phân số cùng tử số thì so mẫu số: mẫu số nào lớn hơn thì phân số đó bé hơn.",
    p: [
      "Chia càng nhiều phần thì mỗi phần càng nhỏ.",
      "1/2 lớn hơn 1/3 vì chia 2 phần thì mỗi phần to hơn chia 3 phần.",
      "So sánh 3/4 và 3/6: cùng tử số 3, mà 4 bé hơn 6 nên 3/4 lớn hơn 3/6.",
    ],
    x: "1/8 bé hơn 1/4 vì chia 8 phần thì mỗi phần nhỏ hơn chia 4 phần.",
    r: "Cùng tử số: mẫu số lớn hơn thì phân số bé hơn.",
  },
  "g3-c5-l12": {
    e: "Vận dụng phân số để chia bánh trong bữa tiệc sinh nhật.",
    p: [
      "Bánh chia 8 phần, bé ăn 2 phần ⇒ đã ăn 2/8 chiếc bánh.",
      "Còn lại 8 - 2 = 6 phần, tức 6/8 chiếc bánh.",
      "Mời 4 bạn mỗi bạn 1 phần ⇒ hết 4/8 chiếc bánh.",
    ],
    x: "Bánh chia 8 phần và còn 6 phần ⇒ còn lại 6/8 chiếc bánh.",
    r: "Số phần đã lấy cộng số phần còn lại luôn bằng mẫu số.",
  },

  // ══ CHƯƠNG 6 + 8 + 10 — CHU VI VÀ DIỆN TÍCH ══
  "g3-c6-l2": {
    e: "Chu vi là tổng độ dài các cạnh bao quanh một hình phẳng, tính theo cùng một đơn vị đo.",
    p: [
      "Tam giác có 3 cạnh nên chu vi là tổng độ dài 3 cạnh.",
      "Tứ giác có 4 cạnh nên chu vi là tổng độ dài 4 cạnh.",
      "Ví dụ tam giác có ba cạnh 3 cm, 4 cm, 5 cm thì chu vi 12 cm.",
    ],
    x: "Tam giác có ba cạnh 3 cm, 4 cm, 5 cm ⇒ chu vi 12 cm.",
    r: "Đổi các cạnh về cùng đơn vị đo rồi mới cộng lại.",
  },
  "g3-c6-l3": {
    e: "Hình chữ nhật có hai cạnh dài bằng nhau và hai cạnh rộng bằng nhau.",
    p: [
      "Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.",
      "Vì có 2 cạnh dài và 2 cạnh rộng nên phải nhân với 2.",
      "Ví dụ khác: dài 7 cm, rộng 3 cm ⇒ (7 + 3) × 2 = 20 cm.",
    ],
    x: "Hình chữ nhật dài 8 cm, rộng 5 cm có chu vi 26 cm.",
    r: "Cộng chiều dài với chiều rộng trước, rồi nhân kết quả với 2.",
  },
  "g3-c6-l4": {
    e: "Hình vuông có bốn cạnh dài bằng nhau.",
    p: [
      "Chu vi hình vuông = độ dài một cạnh × 4.",
      "Ví dụ cạnh 6 cm thì chu vi là 24 cm.",
      "Biết chu vi, muốn tìm cạnh thì lấy chu vi chia cho 4.",
    ],
    x: "Hình vuông cạnh 6 cm có chu vi 24 cm.",
    r: "Chu vi hình vuông bằng một cạnh nhân với 4.",
  },
  "g3-c6-l8": {
    e: "Chu vi là đường bao quanh, còn diện tích là phần mặt phẳng bên trong hình.",
    p: [
      "Chu vi đo bằng cm, dm, m.",
      "Diện tích đo bằng cm², dm², m².",
      "Cùng một hình nhưng chu vi và diện tích là hai đại lượng khác nhau.",
    ],
    x: "Hình vuông cạnh 5 cm có chu vi 20 cm và diện tích 25 cm².",
    r: "Nhìn đơn vị của đáp số để biết bài hỏi chu vi hay diện tích.",
  },
  "g3-c6-l9": {
    e: "Bài toán thực tế: rào quanh vườn thì tính chu vi, lát kín nền thì tính diện tích.",
    p: [
      "Rào xung quanh khu vườn ⇒ dùng chu vi.",
      "Lát gạch kín nền nhà ⇒ dùng diện tích.",
      "Đọc kỹ đề để biết cần tính đại lượng nào.",
    ],
    x: "Mảnh vườn dài 9 m, rộng 6 m: rào xung quanh cần (9 + 6) × 2 = 30 m.",
    r: "“Rào quanh”, “viền quanh” là chu vi; “lát kín”, “phủ đầy” là diện tích.",
  },
  "g3-c6-l10": {
    e: "Ba công thức cần nhớ của chương: chu vi hình chữ nhật, chu vi hình vuông và diện tích hình chữ nhật.",
    p: [
      "Chu vi hình chữ nhật = (dài + rộng) × 2.",
      "Chu vi hình vuông = cạnh × 4.",
      "Diện tích hình chữ nhật = dài × rộng.",
    ],
    x: "Hình chữ nhật dài 7 cm, rộng 3 cm: chu vi 20 cm, diện tích 21 cm².",
    r: "Ghi đúng đơn vị: chu vi là cm, diện tích là cm².",
  },
  "g3-c8-l9": {
    e: "Bài toán hai bước: tìm dữ kiện còn thiếu rồi mới tính chu vi.",
    p: [
      "Bước 1: tìm cạnh hoặc chiều dài, chiều rộng còn thiếu.",
      "Bước 2: áp dụng công thức chu vi.",
      "Bước 3: viết đáp số kèm đơn vị.",
    ],
    x: "Hình chữ nhật dài 10 m, rộng kém dài 4 m ⇒ rộng 6 m, chu vi (10 + 6) × 2 = 32 m.",
    r: "Thiếu dữ kiện thì phải tìm dữ kiện trước khi tính chu vi.",
  },
  "g3-c10-l2": {
    e: "Ôn lại các công thức chu vi và diện tích đã học ở chương 6.",
    p: [
      "Chu vi là tổng độ dài các cạnh bao quanh hình.",
      "Diện tích hình chữ nhật = dài × rộng; diện tích hình vuông = cạnh × cạnh.",
      "Đổi về cùng đơn vị đo trước khi tính.",
    ],
    x: "Hình vuông cạnh 4 cm có chu vi 16 cm và diện tích 16 cm².",
    r: "Kiểm tra đơn vị của đáp số: chu vi là cm, diện tích là cm².",
  },

  // ══ CHƯƠNG 7 — ĐẠI LƯỢNG VÀ ĐO LƯỜNG ══
  "g3-c7-l1": {
    e: "Gam là đơn vị đo khối lượng nhỏ, viết tắt là g.",
    p: [
      "1 kg = 1000 g.",
      "Gam dùng để đo vật nhỏ: gói gia vị, quả trứng, viên thuốc.",
      "Ví dụ: một quả trứng khoảng 50 g, một gói đường 500 g.",
    ],
    r: "Đổi ki-lô-gam ra gam thì thêm ba chữ số 0: 2 kg = 2000 g.",
  },
  "g3-c7-l2": {
    e: "Mi-li-lít là đơn vị đo dung tích nhỏ, viết tắt là ml.",
    p: [
      "1 lít = 1000 ml.",
      "Dùng để đo lượng chất lỏng ít: thuốc, thìa sữa, chai nước nhỏ.",
      "Ví dụ: một thìa canh khoảng 15 ml.",
    ],
    r: "Đổi lít ra mi-li-lít thì thêm ba chữ số 0: 3 l = 3000 ml.",
  },
  "g3-c7-l3": {
    e: "Nhiệt độ đo bằng nhiệt kế, đơn vị là độ C, viết là °C.",
    p: [
      "Nước sôi ở 100 °C; nước đá tan ở 0 °C.",
      "Nhiệt độ cơ thể người khoẻ mạnh khoảng 37 °C.",
      "Nhiệt độ thấp hơn 0 °C gọi là dưới không độ.",
    ],
    r: "Đọc nhiệt kế: vạch màu chỉ tới số nào thì đó là nhiệt độ đó.",
  },
  "g3-c7-l4": {
    e: "Đồng là đơn vị tiền tệ Việt Nam, viết tắt là đ.",
    p: [
      "Các tờ tiền nhỏ: 1000 đồng, 2000 đồng, 5000 đồng.",
      "Đổi tiền: 5000 đồng bằng 5 tờ 1000 đồng.",
      "Mua món 3000 đồng và trả 5000 đồng thì được trả lại 2000 đồng.",
    ],
    r: "Tổng các tờ tiền phải bằng đúng số tiền cần trả.",
  },
  "g3-c7-l5": {
    e: "Các tờ tiền lớn hơn: 10 000 đồng, 20 000 đồng, 50 000 đồng và 100 000 đồng.",
    p: [
      "Đổi tiền: 100 000 đồng bằng 2 tờ 50 000 đồng hoặc 10 tờ 10 000 đồng.",
      "Trả tiền thừa: mua hết 14 000 đồng, đưa 20 000 đồng ⇒ thừa 6000 đồng.",
      "Sắp xếp các tờ tiền để trả đúng số tiền.",
    ],
    r: "Tiền trả lại = số tiền đưa trừ số tiền phải trả.",
  },
  "g3-c7-l12": {
    e: "Bảng quy đổi cần nhớ: 1 kg = 1000 g; 1 l = 1000 ml; 1 m = 1000 mm.",
    p: [
      "Khối lượng: đổi kg ra g thì thêm ba chữ số 0.",
      "Dung tích: đổi l ra ml thì thêm ba chữ số 0.",
      "Độ dài: đổi m ra mm thì thêm ba chữ số 0.",
    ],
    r: "Trong bảng này, mỗi đơn vị lớn gấp 1000 lần đơn vị nhỏ liền kề.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════

const CHUOI_DEM = [
  "Khi một vật thể được chia thành các phần BẰNG NHAU:",
  "Chia thành 2 phần bằng nhau, lấy 1 phần: gọi là một phần hai (1/2).",
  "Cấu tạo phân số: Tử số ở trên (số phần lấy), Mẫu số ở dưới",
  "Mẫu số viết dưới gạch ngang chỉ số phần bằng nhau. Tử số viết trên gạch ngang chỉ số phần được lấy.",
  "Chiếc bánh pizza chia đều làm 4 phần, bé ăn 1 phần. Bé đã ăn bao nhiêu",
  "Chu vi là tổng độ dài tất cả các cạnh bao quanh một hình phẳng",
  "Chu vi tam giác / tứ giác: Tổng độ dài các cạnh của hình đó.",
  "Chu vi hình chữ nhật: P = (chiều dài + chiều rộng) × 2 (cùng đơn vị đo).",
  "Chu vi hình vuông: P = độ dài một cạnh × 4.",
  "Chu vi hình chữ nhật: P = (a + b) × 2. Chu vi hình vuông: P = a × 4.",
  "Một hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm. Tính chu vi",
  "Các đơn vị đo lường và thực tế cuộc sống:",
  "Khối lượng: 1 kg = 1000 g (gam). Gam dùng để đo các vật nhỏ",
  "Dung tích: 1 lít = 1000 ml (mi-li-lít). Mi-li-lít đo lượng thuốc, thìa sữa.",
  "Nhiệt độ: Đo bằng nhiệt kế, đơn vị là độ C (°C). Nhiệt độ nước sôi là 100°C",
  "Tiền Việt Nam: Đồng là đơn vị tiền tệ (1 000 đồng",
  "Đổi đơn vị: 1 kg = 1000 g; 1 lít = 1000 ml.",
];

let src = fs.readFileSync(FILE, "utf8");
const truoc = CHUOI_DEM.map((c) => src.split(c).length - 1);

const khuc = src.split(/(?=["']?id["']?: "g3-c\d+-l\d+",)/g);
const ids = Object.keys(NOI_DUNG);
const daSua = new Set();
const loi = [];
const demKhoa = { e: 0, x: 0, p: 0, r: 0 };

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

  // 🔴 CHỈ SỬA TRONG SLIDE KHÁI NIỆM. Mẫu `points` không phân biệt slide nên bản đầu của
  // script đã ghi đè cả mảng `points` của slide `summary` — lời tóm tắt RIÊNG của bài
  // ("6, 12, 18, 24, 30"). Đã mắc thật (18 bài Lớp 3 + 55 bài Lớp 2) ⇒ phải giới hạn vùng.
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
CHUOI_DEM.forEach((c) => {
  const sau = src.split(c).length - 1;
  if (sau > 0) {
    sot += 1;
    console.log(`   ⚠️ còn ${sau} chỗ: “${c.slice(0, 50)}…”`);
  }
});
if (!sot) console.log("   🎉 Không còn câu đệm nào.");
console.log(`   (số chỗ trước khi sửa: ${truoc.join(", ")})`);
