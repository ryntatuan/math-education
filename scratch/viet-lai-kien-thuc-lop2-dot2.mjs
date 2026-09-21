// Viết lại "kiến thức trọng tâm" cho 29 bài Lớp 2 còn lại — NHÓM 2, 3, 4 của
// `scratch/liet-ke-nhom-cau-lap.mjs`:
//   • Nhóm phép nhân   (14 bài): explanation + steps + rule + example.text giống hệt nhau
//   • Nhóm phép chia   ( 9 bài): y như trên
//   • Nhóm hình học    ( 6 bài): explanation + points + rule giống hệt nhau
//
// Khác đợt 1 (`viet-lai-kien-thuc-lop2.mjs` — chỉ có points + rule), đợt này ghi được
// cả 5 khoá. Mọi bài đều chỉ có ĐÚNG 1 slide concept (đã kiểm chứng) nên thay theo khoá
// là an toàn — không cần cắt theo slide.
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop2-dot2.mjs
// ⚠️ Bài nào thiếu khoá cần thay thì script BÁO và KHÔNG ghi file.

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade2Data.js");

// e = explanation, s = steps [[title, desc]…], x = example.text, p = points, r = rule
const NOI_DUNG = {
  // ══ CHƯƠNG 6 — ba bài mét / ki-lô-mét / mi-li-mét dùng chung khối “đo lường chung” ══
  "g2-c6-l1": {
    e: "Mét là đơn vị đo độ dài cơ bản, viết tắt là m.",
    p: [
      "1 m = 10 dm = 100 cm = 1000 mm.",
      "Đo chiều dài phòng học, chiều cao người, chiều dài sân trường thì dùng mét.",
      "Ví dụ: bút chì khoảng 15 cm, còn cái bảng khoảng 3 m.",
    ],
    r: "Đổi từ mét ra xăng-ti-mét thì thêm hai chữ số 0: 3 m = 300 cm.",
  },
  "g2-c6-l2": {
    e: "Ki-lô-mét là đơn vị đo độ dài lớn, viết tắt là km.",
    p: [
      "1 km = 1000 m.",
      "Đo quãng đường đi học, khoảng cách giữa hai tỉnh thì dùng ki-lô-mét.",
      "Ví dụ: từ nhà tới trường 2 km = 2000 m.",
    ],
    r: "Quãng đường dài thì dùng km, không dùng cm hay dm.",
  },
  "g2-c6-l3": {
    e: "Mi-li-mét là đơn vị đo độ dài rất nhỏ, viết tắt là mm.",
    p: [
      "1 cm = 10 mm; 1 m = 1000 mm.",
      "Đo bề dày quyển sách, độ dài con kiến, đường kính viên bi thì dùng mi-li-mét.",
      "Ví dụ: quyển sách dày khoảng 10 mm.",
    ],
    r: "Vật mỏng, nhỏ thì chọn mm; vật dài thì dùng m hoặc km.",
  },

  // ══ NHÓM PHÉP NHÂN (14 bài) ══
  "g2-c3-l1": {
    e: "Phép nhân là cách viết gọn của phép cộng các số hạng bằng nhau.",
    s: [
      ["Thừa số thứ nhất", "Số được lấy lặp lại nhiều lần."],
      ["Thừa số thứ hai", "Số lần lấy số thứ nhất."],
      ["Tích", "Kết quả của phép nhân."],
    ],
    x: "Có 5 hộp bút, mỗi hộp 3 chiếc: 3 được lấy 5 lần ⇒ 3 × 5 = 3 + 3 + 3 + 3 + 3 = 15 chiếc bút.",
    r: "Chỉ viết được phép nhân khi các số hạng bằng nhau.",
  },
  "g2-c3-l2": {
    e: "Trong phép nhân 3 × 4 = 12: 3 và 4 là thừa số, 12 là tích.",
    s: [
      ["Thừa số", "Hai số được nhân với nhau."],
      ["Tích", "Kết quả của phép nhân."],
      ["Đổi chỗ", "Đổi chỗ hai thừa số thì tích không đổi."],
    ],
    x: "3 × 4 = 12 và 4 × 3 = 12 — đổi chỗ thừa số, tích vẫn là 12.",
    r: "Thừa số × Thừa số = Tích.",
  },
  "g2-c3-l3": {
    e: "Bảng nhân 2: 2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, 2 × 4 = 8, 2 × 5 = 10.",
    s: [
      ["Bắt đầu", "2 × 1 = 2."],
      ["Mỗi bước", "Thêm 2 vào tích vừa tìm được."],
      ["Dừng lại", "2 × 5 = 10."],
    ],
    x: "2 × 4 = 2 + 2 + 2 + 2 = 8.",
    r: "Tích liền sau hơn tích liền trước đúng 2 đơn vị.",
  },
  "g2-c3-l4": {
    e: "Nối tiếp bảng nhân 2: 2 × 6 = 12, 2 × 7 = 14, 2 × 8 = 16, 2 × 9 = 18, 2 × 10 = 20.",
    s: [
      ["Nhớ mốc", "2 × 5 = 10."],
      ["Thêm 2", "10 + 2 = 12 ⇒ 2 × 6 = 12."],
      ["Đến cuối", "2 × 10 = 20."],
    ],
    x: "2 × 8 = 16 vì 8 + 8 = 16.",
    r: "Nhân với 2 chính là cộng số đó với chính nó.",
  },
  "g2-c3-l5": {
    e: "Bảng nhân 5: 5 × 1 = 5, 5 × 2 = 10, 5 × 3 = 15, 5 × 4 = 20, 5 × 5 = 25.",
    s: [
      ["Bắt đầu", "5 × 1 = 5."],
      ["Mỗi bước", "Thêm 5 vào tích vừa tìm."],
      ["Dấu hiệu", "Tích luôn tận cùng là 0 hoặc 5."],
    ],
    x: "5 × 4 = 5 + 5 + 5 + 5 = 20.",
    r: "Nhân với 5 thì tích luôn tận cùng bằng 0 hoặc 5.",
  },
  "g2-c3-l6": {
    e: "Nối tiếp bảng nhân 5: 5 × 6 = 30, 5 × 7 = 35, 5 × 8 = 40, 5 × 9 = 45, 5 × 10 = 50.",
    s: [
      ["Nhớ mốc", "5 × 5 = 25."],
      ["Thêm 5", "25 + 5 = 30 ⇒ 5 × 6 = 30."],
      ["Đến cuối", "5 × 10 = 50."],
    ],
    x: "5 × 8 = 40, đọc là năm nhân tám bằng bốn mươi.",
    r: "Đếm thêm 5 liên tiếp là cách nhớ nhanh bảng nhân 5.",
  },
  "g2-c3-l7": {
    e: "Bảng nhân 3: 3 × 1 = 3, 3 × 2 = 6, 3 × 3 = 9, 3 × 4 = 12, 3 × 5 = 15, …, 3 × 10 = 30.",
    s: [
      ["Bắt đầu", "3 × 1 = 3."],
      ["Mỗi bước", "Thêm 3 vào tích vừa tìm."],
      ["Ví dụ", "3 × 4 = 3 + 3 + 3 + 3 = 12."],
    ],
    x: "3 × 6 = 18 vì 3 × 5 = 15 rồi thêm 3 nữa.",
    r: "Trong bảng nhân 3, tích liền sau hơn tích liền trước 3 đơn vị.",
  },
  "g2-c3-l8": {
    e: "Bảng nhân 4: 4 × 1 = 4, 4 × 2 = 8, 4 × 3 = 12, 4 × 4 = 16, …, 4 × 10 = 40.",
    s: [
      ["Bắt đầu", "4 × 1 = 4."],
      ["Mỗi bước", "Thêm 4 vào tích vừa tìm."],
      ["Liên hệ", "4 × 5 = 20 vì 2 × 5 = 10 rồi gấp đôi."],
    ],
    x: "4 × 7 = 28 vì 4 × 5 = 20, thêm 4 hai lần nữa là 28.",
    r: "Nhân với 4 bằng nhân với 2 rồi nhân tiếp với 2.",
  },
  "g2-c3-l9": {
    e: "Số nào nhân với 1 cũng bằng chính số đó; số nào nhân với 0 cũng bằng 0.",
    s: [
      ["Nhân với 1", "a × 1 = a."],
      ["Nhân với 0", "a × 0 = 0."],
      ["Ví dụ", "7 × 1 = 7 và 7 × 0 = 0."],
    ],
    x: "Có 3 đĩa, mỗi đĩa 0 quả cam ⇒ 3 × 0 = 0 quả cam.",
    r: "Nhân với 1 thì giữ nguyên số, nhân với 0 thì kết quả luôn là 0.",
  },
  "g2-c3-l10": {
    e: "Bốn bảng nhân cần nhớ: bảng nhân 2, bảng nhân 3, bảng nhân 4 và bảng nhân 5.",
    s: [
      ["Thuộc bảng", "Đọc xuôi rồi đọc ngược từng bảng."],
      ["Tính nhẩm", "Dựa vào tích liền trước cộng thêm."],
      ["Kiểm tra", "Thử lại bằng phép cộng các số hạng."],
    ],
    x: "3 × 6 = 18; 4 × 6 = 24; 5 × 6 = 30 — cùng số 6, các tích hơn kém nhau 6.",
    r: "Chưa chắc kết quả thì cộng liên tiếp để kiểm tra lại.",
  },
  "g2-c3-l11": {
    e: "Gà, vịt có 2 chân; mèo, chó, trâu, bò có 4 chân.",
    s: [
      ["Đếm con", "Có tất cả mấy con vật?"],
      ["Số chân mỗi con", "2 chân hoặc 4 chân tuỳ con vật."],
      ["Tính", "Số con × số chân của một con."],
    ],
    x: "6 con gà có 6 × 2 = 12 chân.",
    r: "Phải nhân số con với số chân của MỘT con.",
  },
  "g2-c3-l12": {
    e: "Tính nhẩm nhanh bằng cách dựa vào những tích đã thuộc.",
    s: [
      ["Mốc 10", "Nhân 10 là thêm một chữ số 0."],
      ["Mốc 5", "Nhân 5 bằng một nửa của nhân 10."],
      ["Bắc cầu", "4 × 7 = 2 × 7 × 2 = 28."],
    ],
    x: "5 × 8 = 40 nên 10 × 8 = 80.",
    r: "Dựa vào tích đã thuộc rồi cộng hoặc trừ thêm để ra tích mới.",
  },
  "g2-c7-l7": {
    e: "Bài toán có nhiều nhóm bằng nhau thì giải bằng phép nhân.",
    s: [
      ["Nhận dạng", "Có mấy nhóm, mỗi nhóm mấy cái?"],
      ["Viết phép tính", "Số mỗi nhóm × số nhóm."],
      ["Trả lời", "Kết quả kèm tên đơn vị."],
    ],
    x: "5 hộp, mỗi hộp 8 bút chì ⇒ 8 × 5 = 40 bút chì.",
    r: "Thấy các từ “mỗi”, “đều”, “bằng nhau” là nghĩ tới phép nhân.",
  },
  "g2-c10-l1": {
    e: "Nhớ cả bốn bảng nhân và bốn bảng chia để tính nhẩm nhanh.",
    s: [
      ["Bảng nhân", "Bảng nhân 2, 3, 4, 5."],
      ["Bảng chia", "Bảng chia 2, 3, 4, 5."],
      ["Liên hệ", "Dùng phép nhân để kiểm tra phép chia."],
    ],
    x: "3 × 8 = 24 nên 24 : 3 = 8 và 24 : 8 = 3.",
    r: "Từ một phép nhân viết được hai phép chia tương ứng.",
  },

  // ══ NHÓM PHÉP CHIA (9 bài) ══
  "g2-c4-l1": {
    e: "Phép chia là chia đều một nhóm đồ vật thành các phần bằng nhau.",
    s: [
      ["Số bị chia", "Tổng số lượng đem chia."],
      ["Số chia", "Số phần được chia ra."],
      ["Thương", "Số lượng của mỗi phần."],
    ],
    x: "10 chiếc kẹo chia đều cho 2 bạn ⇒ 10 : 2 = 5 chiếc kẹo mỗi bạn.",
    r: "Số bị chia : Số chia = Thương.",
  },
  "g2-c4-l2": {
    e: "Trong phép chia 12 : 3 = 4: 12 là số bị chia, 3 là số chia, 4 là thương.",
    s: [
      ["Số bị chia", "Số viết trước dấu chia."],
      ["Số chia", "Số viết sau dấu chia."],
      ["Thương", "Kết quả, viết sau dấu bằng."],
    ],
    x: "12 : 3 = 4 ⇒ số bị chia 12, số chia 3, thương 4.",
    r: "Đọc phép chia lần lượt: số bị chia, số chia rồi tới thương.",
  },
  "g2-c4-l3": {
    e: "Bảng chia 2: 2 : 2 = 1, 4 : 2 = 2, 6 : 2 = 3, …, 20 : 2 = 10.",
    s: [
      ["Dựa vào đâu", "Nhẩm lại bảng nhân 2."],
      ["Ví dụ", "14 : 2 = 7 vì 2 × 7 = 14."],
      ["Mẹo", "Chia cho 2 chính là lấy một nửa."],
    ],
    x: "18 : 2 = 9 vì 9 × 2 = 18.",
    r: "Muốn chia cho 2, tự hỏi: số nào nhân với 2 ra số này?",
  },
  "g2-c4-l5": {
    e: "Bảng chia 5: 5 : 5 = 1, 10 : 5 = 2, 15 : 5 = 3, …, 50 : 5 = 10.",
    s: [
      ["Dựa vào đâu", "Nhẩm lại bảng nhân 5."],
      ["Ví dụ", "35 : 5 = 7 vì 5 × 7 = 35."],
      ["Mẹo", "Số bị chia tận cùng là 0 hoặc 5."],
    ],
    x: "40 : 5 = 8 vì 8 × 5 = 40.",
    r: "Phép chia là phép ngược của phép nhân — dùng bảng nhân để tìm thương.",
  },
  "g2-c4-l7": {
    e: "Bảng chia 3: 3 : 3 = 1, 6 : 3 = 2, 9 : 3 = 3, …, 30 : 3 = 10. Chia làm 3 phần bằng nhau thì một phần là 1/3.",
    s: [
      ["Dựa vào đâu", "Nhẩm lại bảng nhân 3."],
      ["Ví dụ", "21 : 3 = 7 vì 3 × 7 = 21."],
      ["Một phần ba", "1/3 của 12 là 12 : 3 = 4."],
    ],
    x: "1/3 của 15 bông hoa là 15 : 3 = 5 bông hoa.",
    r: "Tìm 1/3 của một số chính là chia số đó cho 3.",
  },
  "g2-c4-l8": {
    e: "Bảng chia 4: 4 : 4 = 1, 8 : 4 = 2, 12 : 4 = 3, …, 40 : 4 = 10. Chia làm 4 phần bằng nhau thì một phần là 1/4.",
    s: [
      ["Dựa vào đâu", "Nhẩm lại bảng nhân 4."],
      ["Ví dụ", "28 : 4 = 7 vì 4 × 7 = 28."],
      ["Một phần tư", "1/4 của 20 là 20 : 4 = 5."],
    ],
    x: "1/4 của 16 chiếc bánh là 16 : 4 = 4 chiếc bánh.",
    r: "Tìm 1/4 của một số chính là chia số đó cho 4.",
  },
  "g2-c4-l10": {
    e: "Bốn bảng chia cần nhớ: chia cho 2, chia cho 3, chia cho 4 và chia cho 5.",
    s: [
      ["Thuộc bảng", "Từ bảng nhân suy ra bảng chia."],
      ["Tính nhẩm", "Hỏi ngược: mấy nhân mấy bằng số này?"],
      ["Kiểm tra", "Thử lại bằng phép nhân."],
    ],
    x: "24 : 4 = 6 và 24 : 3 = 8 — cùng số bị chia nhưng thương khác nhau.",
    r: "Thử lại thương bằng phép nhân: thương × số chia = số bị chia.",
  },
  "g2-c4-l11": {
    e: "Biết hai thành phần thì tìm được thành phần còn lại của phép chia.",
    s: [
      ["Tìm số bị chia", "Lấy thương nhân với số chia."],
      ["Tìm số chia", "Lấy số bị chia chia cho thương."],
      ["Ví dụ", "□ : 5 = 6 ⇒ □ = 6 × 5 = 30."],
    ],
    x: "20 : □ = 4 ⇒ □ = 20 : 4 = 5.",
    r: "Tìm số bị chia thì nhân, tìm số chia thì chia.",
  },
  "g2-c7-l8": {
    e: "Chia đều một số thành các phần bằng nhau thì giải bằng phép chia.",
    s: [
      ["Nhận dạng", "Chia đều thành mấy phần?"],
      ["Viết phép tính", "Tổng số : số phần."],
      ["Trả lời", "Kết quả kèm tên đơn vị."],
    ],
    x: "20 quả cam chia đều vào 4 giỏ ⇒ 20 : 4 = 5 quả cam mỗi giỏ.",
    r: "Tìm số lượng mỗi phần thì lấy tổng chia cho số phần.",
  },

  // ══ NHÓM HÌNH HỌC (6 bài) ══
  "g2-c7-l1": {
    e: "Có ba loại đường cần phân biệt: đường thẳng, đường cong và đường gấp khúc.",
    p: [
      "Đường thẳng không bị uốn, kéo dài mãi về hai phía.",
      "Đường cong uốn lượn, không thẳng.",
      "Đường gấp khúc do nhiều đoạn thẳng ghép lại, đổi hướng ở mỗi đoạn.",
    ],
    r: "Mỗi đoạn của đường gấp khúc là một đoạn thẳng riêng biệt.",
  },
  "g2-c7-l2": {
    e: "Muốn tính độ dài đường gấp khúc thì cộng độ dài các đoạn thẳng thành phần.",
    p: [
      "Đường gấp khúc ABCD có ba đoạn: AB, BC và CD.",
      "Độ dài cả đường = AB + BC + CD (cùng một đơn vị đo).",
    ],
    r: "Cộng lần lượt độ dài từng đoạn, nhớ đổi về cùng đơn vị đo trước.",
  },
  "g2-c7-l3": {
    e: "Tứ giác là hình phẳng có 4 cạnh và 4 đỉnh.",
    p: [
      "Bốn cạnh nối tiếp nhau tạo thành một đường khép kín.",
      "Hình vuông, hình chữ nhật… đều thuộc nhóm tứ giác.",
    ],
    r: "Đếm đủ 4 cạnh và 4 đỉnh thì mới là tứ giác.",
  },
  "g2-c7-l4": {
    e: "Khối trụ và khối cầu là hai khối quen thuộc trong đời sống.",
    p: [
      "Khối trụ: hai mặt đáy tròn phẳng, thân cong, lăn được.",
      "Khối cầu: tròn xoe như quả bóng, lăn được mọi hướng.",
    ],
    r: "Khối trụ đặt đứng được; các khối cầu không xếp chồng lên nhau được.",
  },
  "g2-c7-l11": {
    e: "Đếm hình trong hình vẽ cần quan sát kỹ và làm theo thứ tự.",
    p: [
      "Đếm các hình nhỏ trước, rồi đếm các hình ghép từ nhiều hình nhỏ.",
      "Một hình lớn có thể chứa nhiều hình nhỏ bên trong.",
    ],
    r: "Đếm xong nên đánh dấu từng hình để không trùng hoặc sót.",
  },
  "g2-c7-l12": {
    e: "Vận dụng kiến thức hình học đã học vào các câu đố.",
    p: [
      "Đường gấp khúc: đếm số đoạn rồi cộng độ dài các đoạn.",
      "Tứ giác: kiểm tra đủ 4 cạnh và 4 đỉnh.",
    ],
    r: "Đọc kỹ câu đố để biết cần tính độ dài hay đếm số hình.",
  },
};

// ═══════════════════════════════════════════════════════════════════════════

const CHUOI_DEM = [
  "Phép nhân chính là tổng của các số hạng bằng nhau",
  "Kết quả của phép nhân: Thừa số",
  "Thừa số × Thừa số = Tích. Đổi chỗ",
  "Có 4 đĩa táo",
  "Phép chia là thao tác chia đều",
  "Số phần hoặc số lượng mỗi phần được chia.",
  "Tổng số lượng ban đầu đem chia.",
  "Muốn tìm thương, ta nhẩm lại bảng nhân tương ứng",
  "Có 10 chiếc kẹo chia đều cho 2 bạn",
  "Hình học phẳng và hình khối xung quanh chúng ta:",
  "Hình tứ giác có 4 cạnh và 4 đỉnh.",
  "Khối trụ có 2 mặt đáy hình tròn phẳng và thân cong lăn được.",
  "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài đường gấp khúc",
  "Độ dài đường gấp khúc = Tổng độ dài tất cả các đoạn thẳng thành phần.",
];

let src = fs.readFileSync(FILE, "utf8");
const truoc = CHUOI_DEM.map((c) => src.split(c).length - 1);

const TACH = /(?=["']?id["']?: "g2-c\d+-l\d+",)/g;
const khuc = src.split(TACH);

const ids = Object.keys(NOI_DUNG);
const daSua = new Set();
const loi = [];
const demKhoa = { e: 0, s: 0, x: 0, p: 0, r: 0 };

// (1) Chuỗi đơn (explanation / rule): chịu được cả kiểu viết cùng dòng và xuống dòng.
function thayChuoi(k, ten, giaTri) {
  return k.replace(
    new RegExp(
      `^([ \\t]*)${ten}:[ \\t]*(?:\\r?\\n[ \\t]*)?("(?:[^"\\\\]|\\\\.)*")(,?)$`,
      "gm",
    ),
    (_m, ws, _cu, cuoi) => {
      demKhoa[ten === "rule" ? "r" : "e"] += 1;
      return `${ws}${ten}: ${JSON.stringify(giaTri)}${cuoi}`;
    },
  );
}

// (2) Mảng chuỗi (points): khớp cả mảng một dòng lẫn nhiều dòng.
function thayMang(k, ten, mang) {
  return k.replace(
    new RegExp(`^([ \\t]*)${ten}: \\[[^[\\]]*\\]`, "gm"),
    (_m, ws) => {
      demKhoa.p += 1;
      if (mang.length === 1) return `${ws}${ten}: [${JSON.stringify(mang[0])}]`;
      const dong = mang.map((t) => `${ws}  ${JSON.stringify(t)},`).join("\n");
      return `${ws}${ten}: [\n${dong}\n${ws}]`;
    },
  );
}

// (3) Mảng đối tượng { title, desc } cho slide concept dạng các bước.
function thayBuoc(k, mang) {
  return k.replace(/^([ \t]*)steps: \[[\s\S]*?\n[ \t]*\]/m, (_m, ws) => {
    demKhoa.s += 1;
    const dong = mang
      .map(
        ([t, d]) =>
          `${ws}  {\n${ws}    title: ${JSON.stringify(t)},\n${ws}    desc: ${JSON.stringify(d)},\n${ws}  },`,
      )
      .join("\n");
    return `${ws}steps: [\n${dong}\n${ws}]`;
  });
}

// (4) example: { text: "…" } — khối ví dụ minh hoạ của slide concept.
function thayViDu(k, text) {
  return k.replace(
    /^([ \t]*)example: \{[\s\S]*?\n[ \t]*\}(,?)/m,
    (_m, ws, cuoi) => {
      demKhoa.x += 1;
      return `${ws}example: {\n${ws}  text: ${JSON.stringify(text)},\n${ws}}${cuoi}`;
    },
  );
}

const ra = khuc.map((k) => {
  const id = k.match(/["']?id["']?: "(g2-c\d+-l\d+)",/)?.[1];
  if (!id || !NOI_DUNG[id]) return k;
  const nd = NOI_DUNG[id];
  const truocBai = { ...demKhoa };

  // 🔴 CHỈ SỬA BÊN TRONG SLIDE KHÁI NIỆM. Mẫu `points` không phân biệt slide, nên bản đầu đã
  // ghi dè luôn mảng `points` của slide `summary` — lời tóm tắt RIÊNG của bài (đã mắc thật:
  // 55 bài Lớp 2 bị đè ⇒ phục hồi từ bản sao lưu rồi chạy lại bằng bản có giới hạn này).
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
  if (nd.s !== undefined) out = thayBuoc(out, nd.s);
  if (nd.x !== undefined) out = thayViDu(out, nd.x);
  if (nd.p !== undefined) out = thayMang(out, "points", nd.p);
  if (nd.r !== undefined) out = thayChuoi(out, "rule", nd.r);

  const thieuKhoa = [];
  if (nd.e !== undefined && demKhoa.e === truocBai.e)
    thieuKhoa.push("explanation");
  if (nd.s !== undefined && demKhoa.s === truocBai.s) thieuKhoa.push("steps");
  if (nd.x !== undefined && demKhoa.x === truocBai.x) thieuKhoa.push("example");
  if (nd.p !== undefined && demKhoa.p === truocBai.p) thieuKhoa.push("points");
  if (nd.r !== undefined && demKhoa.r === truocBai.r) thieuKhoa.push("rule");
  if (thieuKhoa.length)
    loi.push(`${id} → không thay được: ${thieuKhoa.join(", ")}`);

  daSua.add(id);
  return dauKhoi + out + cuoiKhoi;
});

const thieu = ids.filter((id) => !daSua.has(id));
if (loi.length || thieu.length) {
  console.error("🔴 DỪNG — không ghi file.");
  thieu.forEach((id) => console.error(`   Không thấy bài: ${id}`));
  loi.forEach((t) => console.error(`   ${t}`));
  process.exit(1);
}

src = ra.join("");
fs.writeFileSync(FILE, src, "utf8");

console.log(
  `✅ Đã viết lại ${daSua.size}/${ids.length} bài — explanation ${demKhoa.e}, steps ${demKhoa.s}, example ${demKhoa.x}, points ${demKhoa.p}, rule ${demKhoa.r}.`,
);
console.log("── Câu lặp còn sót (phải về 0 hết) ──");
let sot = 0;
CHUOI_DEM.forEach((c, i) => {
  const sau = src.split(c).length - 1;
  if (sau > 0) {
    sot += 1;
    console.log(`   ⚠️ còn ${sau} chỗ: “${c.slice(0, 46)}…”`);
  }
});
if (!sot) console.log("   🎉 Không còn câu nào trong danh sách đệm.");
console.log(`   (trước khi sửa: ${truoc.join(", ")})`);
