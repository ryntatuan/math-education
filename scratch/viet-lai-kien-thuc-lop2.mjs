// Viết lại "kiến thức trọng tâm" cho 46 bài Lớp 2 — NHÓM 1 của
// `scratch/liet-ke-nhom-cau-lap.mjs`: nhóm dùng đúng ba câu đệm giống hệt nhau
// ("Nắm vững định nghĩa và quy tắc tính toán chuẩn." / "Kiểm tra lại kết quả sau khi
// làm bài." / "Đọc kỹ đề bài, nhận diện dạng toán và tính toán cẩn thận từng bước.")
//
// KHÁC Lớp 3: ở đây thay theo **id bài** (không theo vị trí) vì cùng một khối câu rải
// khắp 8 chương, mỗi bài cần nội dung riêng. Script chỉ sửa 2 chỗ trong MỖI khối bài:
// `points` (mảng gạch đầu dòng) và `rule` (câu quy tắc) — không đụng gì khác.
//
// DÙNG: node scratch/viet-lai-kien-thuc-lop2.mjs
// ⚠️ Nếu một bài không tìm thấy `points`/`rule` thì script BÁO và KHÔNG ghi file.

import fs from "node:fs";
import path from "node:path";

const FILE = path.resolve("client/src/data/grade2Data.js");

const NOI_DUNG = {
  // ── Chương 1 ──
  "g2-c1-l1": {
    p: [
      "Đọc, viết, so sánh các số đến 100; tìm số liền trước, số liền sau.",
      "Số có hai chữ số gồm hàng chục và hàng đơn vị.",
    ],
    r: "So sánh hai số có hai chữ số: so hàng chục trước, bằng nhau thì mới so hàng đơn vị.",
  },
  "g2-c1-l5": {
    p: [
      "Số tròn chục có chữ số hàng đơn vị là 0: 10, 20, 30…",
      "Ví dụ: 30 + 40 = 70 và 70 - 30 = 40.",
    ],
    r: "Cộng trừ số tròn chục: tính theo chục rồi thêm chữ số 0 vào sau kết quả.",
  },
  "g2-c1-l6": {
    p: [
      "Điểm được đặt tên bằng chữ cái in hoa: A, B, C…",
      "Đoạn thẳng nối hai điểm, hai đầu mút chính là hai điểm đó.",
    ],
    r: "Vẽ đoạn thẳng AB: đặt thước qua hai điểm A, B rồi kẻ một đường thẳng theo thước.",
  },
  "g2-c1-l7": {
    p: [
      "Ba điểm thẳng hàng là ba điểm cùng nằm trên một đường thẳng.",
      "Ba điểm không cùng nằm trên một đường thẳng thì không thẳng hàng.",
    ],
    r: "Muốn kiểm tra: đặt thước qua hai điểm, xem điểm thứ ba có nằm trên cạnh thước không.",
  },
  "g2-c1-l9": {
    p: [
      "Nhiều hơn nghĩa là số này lớn hơn số kia một lượng nào đó.",
      "Muốn tìm số lớn hơn: lấy số đã biết cộng thêm phần nhiều hơn.",
    ],
    r: "Đọc kỹ câu hỏi để biết cần tìm số lớn (làm phép cộng) hay số bé (làm phép trừ).",
  },
  "g2-c1-l10": {
    p: [
      "Ít hơn nghĩa là số này bé hơn số kia một lượng nào đó.",
      "Muốn tìm số bé hơn: lấy số đã biết trừ đi phần ít hơn.",
    ],
    r: "Câu trả lời phải kèm tên đơn vị, ví dụ: 12 quyển vở.",
  },
  "g2-c1-l11": {
    p: [
      "Trong phép cộng, các số được cộng gọi là số hạng; kết quả gọi là tổng.",
      "Muốn tìm số hạng chưa biết: lấy tổng trừ đi số hạng đã biết.",
    ],
    r: "Ví dụ □ + 25 = 40 ⇒ □ = 40 - 25 = 15. Thử lại: 15 + 25 = 40.",
  },
  "g2-c1-l12": {
    p: [
      "Đặt thước sao cho vạch 0 trùng với một điểm đã chọn.",
      "Đánh dấu điểm ở đúng vạch chỉ số đo rồi nối hai điểm lại.",
    ],
    r: "Vẽ xong phải ghi tên hai đầu mút và số đo của đoạn thẳng.",
  },

  // ── Chương 2: cộng trừ có nhớ trong phạm vi 100 ──
  "g2-c2-l1": {
    p: [
      "9 + 5: tách 5 = 1 + 4, lấy 9 + 1 = 10 rồi 10 + 4 = 14.",
      "29 + 5: 9 + 5 = 14, viết 4 nhớ 1, thêm 1 vào hàng chục được 34.",
    ],
    r: "Làm tròn 10 trước rồi cộng phần còn lại — nhẩm nhanh hơn đếm tiếp.",
  },
  "g2-c2-l2": {
    p: [
      "8 + 5: tách 5 = 2 + 3, lấy 8 + 2 = 10 rồi 10 + 3 = 13.",
      "38 + 25: 8 + 5 = 13 viết 3 nhớ 1; 3 + 2 + 1 = 6 ⇒ 63.",
    ],
    r: "Cộng từ phải sang trái; hàng đơn vị vượt 10 thì nhớ 1 sang hàng chục.",
  },
  "g2-c2-l3": {
    p: [
      "7 + 5: 7 cần 3 để tròn 10, tách 5 = 3 + 2 ⇒ 7 + 3 = 10, 10 + 2 = 12.",
      "47 + 18: 7 + 8 = 15 viết 5 nhớ 1; 4 + 1 + 1 = 6 ⇒ 65.",
    ],
    r: "Viết chữ số đơn vị của tổng, phần 1 nhớ thì cộng vào hàng chục.",
  },
  "g2-c2-l4": {
    p: [
      "6 + 5: 6 cần 4 để tròn 10 ⇒ 6 + 4 = 10, còn 1 nữa ⇒ 11.",
      "56 + 36: 6 + 6 = 12 viết 2 nhớ 1; 5 + 3 + 1 = 9 ⇒ 92.",
    ],
    r: "Nhớ 1 nghĩa là hàng bên trái được cộng thêm 1 đơn vị.",
  },
  "g2-c2-l5": {
    p: [
      "Những cặp số có tổng bằng 100: 25 và 75; 36 và 64; 47 và 53; 58 và 42.",
      "Ví dụ: 47 + 53 = 100.",
    ],
    r: "Cặp số tròn trăm: hai chữ số đơn vị cộng lại bằng 10, hai chữ số chục cộng lại bằng 9.",
  },
  "g2-c2-l6": {
    p: [
      "11 - 5: lấy 11 - 1 = 10 rồi 10 - 4 = 6.",
      "51 - 15: 1 không trừ được 5 nên mượn 1 chục: 11 - 5 = 6; hàng chục 4 - 1 = 3 ⇒ 36.",
    ],
    r: "Trừ qua 10: trừ về 10 trước rồi trừ phần còn lại.",
  },
  "g2-c2-l7": {
    p: [
      "12 - 7 = 5 (lấy 12 - 2 = 10 rồi 10 - 5 = 5).",
      "62 - 27: 2 không trừ được 7 nên mượn 1 chục: 12 - 7 = 5; 5 - 2 = 3 ⇒ 35.",
    ],
    r: "Mượn 1 chục: hàng chục bớt đi 1, hàng đơn vị được thêm 10.",
  },
  "g2-c2-l8": {
    p: [
      "13 - 8 = 5 (13 - 3 = 10 rồi 10 - 5 = 5).",
      "73 - 38: 3 không trừ được 8 nên mượn: 13 - 8 = 5; 6 - 3 = 3 ⇒ 35.",
    ],
    r: "Thử lại bằng phép cộng: 35 + 38 = 73 ⇒ kết quả đúng.",
  },
  "g2-c2-l9": {
    p: [
      "100 - 47: 0 không trừ được 7 nên mượn liên tiếp: 10 - 7 = 3; 9 - 4 = 5 ⇒ 53.",
      "Ví dụ khác: 100 - 25 = 75.",
    ],
    r: "Trừ 100 phải mượn qua cả hàng chục, nên tính lần lượt từ phải sang trái.",
  },
  "g2-c2-l11": {
    p: [
      "Số bị trừ tròn chục có hàng đơn vị bằng 0 nên luôn phải mượn.",
      "Ví dụ: 50 - 24: 10 - 4 = 6; 4 - 2 = 2 ⇒ 26.",
    ],
    r: "Mượn 1 chục: hàng đơn vị thành 10, hàng chục của số bị trừ bớt 1.",
  },
  "g2-c2-l12": {
    p: [
      "Viết số thứ nhất ở trên, số thứ hai ở dưới sao cho thẳng cột.",
      "Đơn vị thẳng đơn vị, chục thẳng chục — lệch một hàng là sai kết quả.",
    ],
    r: "Ghi số nhớ 1 ngay phía trên hàng chục để không quên cộng vào.",
  },

  // ── Chương 4: chia và một phần mấy ──
  "g2-c4-l4": {
    p: [
      "Chia một hình thành 2 phần bằng nhau, lấy 1 phần là 1/2.",
      "1/2 còn được đọc là một nửa.",
    ],
    r: "Muốn tìm 1/2 của một số thì chia số đó cho 2.",
  },
  "g2-c4-l6": {
    p: [
      "Chia thành 5 phần bằng nhau, lấy 1 phần là 1/5.",
      "Ví dụ: 1/5 của 20 là 20 : 5 = 4.",
    ],
    r: "Muốn tìm 1/5 của một số thì chia số đó cho 5.",
  },
  "g2-c4-l9": {
    p: [
      "Muốn tìm 1/n của một số thì lấy số đó chia cho n.",
      "Ví dụ: 1/3 của 12 là 12 : 3 = 4.",
    ],
    r: "Đọc kỹ đề xem chia thành mấy phần (mẫu số) rồi chia đúng số đó.",
  },
  "g2-c4-l12": {
    p: [
      "1/5 của một nhóm nghĩa là chia nhóm đó thành 5 phần bằng nhau.",
      "Ví dụ: 15 viên bi chia 5 phần ⇒ 1/5 là 3 viên bi.",
    ],
    r: "Kết quả phải kèm đơn vị của nhóm đồ vật (viên bi, quả táo…).",
  },

  // ── Chương 5: các số trong phạm vi 1000 ──
  "g2-c5-l1": {
    p: [
      "10 đơn vị = 1 chục; 10 chục = 1 trăm.",
      "Số có ba chữ số gồm hàng trăm, hàng chục và hàng đơn vị.",
    ],
    r: "Đọc số theo thứ tự từ hàng trăm: ba trăm hai mươi lăm (325).",
  },
  "g2-c5-l2": {
    p: [
      "Số tròn trăm có chữ số hàng chục và hàng đơn vị đều bằng 0.",
      "100, 200, 300… hơn kém nhau đúng 100.",
    ],
    r: "Muốn tìm số tròn trăm tiếp theo thì đếm thêm 100.",
  },
  "g2-c5-l3": {
    p: [
      "Ví dụ 462 gồm 4 trăm, 6 chục và 2 đơn vị.",
      "Viết số: viết lần lượt hàng trăm, hàng chục, hàng đơn vị.",
    ],
    r: "Không bỏ trống hàng nào — hàng nào không có thì viết chữ số 0.",
  },
  "g2-c5-l4": {
    p: [
      "Số 305 gồm 3 trăm, 0 chục và 5 đơn vị.",
      "Đọc là ba trăm linh năm — chữ “linh” thay cho hàng chục bằng 0.",
    ],
    r: "Hàng chục bằng 0 mà hàng đơn vị khác 0 thì bắt buộc đọc “linh”.",
  },
  "g2-c5-l5": {
    p: [
      "Số 350 gồm 3 trăm, 5 chục và 0 đơn vị.",
      "Số tròn chục luôn có chữ số hàng đơn vị bằng 0.",
    ],
    r: "Đọc số tròn chục theo chục: ba trăm năm mươi (không đọc “năm chục”).",
  },
  "g2-c5-l6": {
    p: [
      "So hàng trăm trước; bằng nhau thì so hàng chục, rồi mới so hàng đơn vị.",
      "Ví dụ: 452 > 448 vì hàng chục 5 > 4.",
    ],
    r: "So từ trái sang phải, gặp hàng khác nhau là kết luận được ngay.",
  },
  "g2-c5-l7": {
    p: [
      "Tăng dần: sắp từ số bé nhất đến số lớn nhất.",
      "Giảm dần: sắp từ số lớn nhất đến số bé nhất.",
    ],
    r: "Sắp xếp xong nên đọc lại cả dãy để kiểm tra thứ tự.",
  },
  "g2-c5-l8": {
    p: [
      "1000 = 10 trăm = 100 chục = 1000 đơn vị.",
      "1000 là số bé nhất có bốn chữ số.",
    ],
    r: "Số liền sau của 999 là 1000 — đếm thêm 1 từ 999.",
  },
  "g2-c5-l10": {
    p: [
      "Bốn dạng bài của chương: đọc - viết số, so sánh số, viết thành tổng, sắp xếp dãy số.",
      "Ví dụ: 407 = 400 + 7.",
    ],
    r: "Đọc kỹ đề để nhận ra dạng bài rồi mới bắt tay làm.",
  },
  "g2-c5-l11": {
    p: [
      "Mỗi chữ số ứng với giá trị hàng của nó: 356 = 300 + 50 + 6.",
      "Chữ số 0 thì không cần viết vào tổng: 305 = 300 + 5.",
    ],
    r: "Viết tổng theo thứ tự từ hàng lớn đến hàng bé.",
  },
  "g2-c5-l12": {
    p: [
      "So sánh từng số bằng hàng trăm trước để chia thành các nhóm.",
      "Ví dụ sắp tăng dần: 214, 241, 412, 421.",
    ],
    r: "Dãy nhiều số thì so hàng trăm để nhóm trước, rồi so tiếp hàng chục.",
  },

  // ── Chương 6: đo lường ──
  "g2-c6-l5": {
    p: [
      "Lít là đơn vị đo dung tích (lượng nước, sữa…), viết tắt là l.",
      "Ví dụ: chai nước 1 l, can dầu 5 l.",
    ],
    r: "Hỏi còn lại bao nhiêu lít thì làm phép trừ, đáp số kèm đơn vị l.",
  },
  "g2-c6-l7": {
    p: [
      "1 ngày = 24 giờ; 1 tuần = 7 ngày.",
      "Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12; tháng 2 có 28 hoặc 29 ngày.",
    ],
    r: "Xem lịch: tìm đúng hàng (tuần) rồi mới đọc ngày ở cột tương ứng.",
  },
  "g2-c6-l8": {
    p: [
      "Giờ đúng: kim phút chỉ số 12, ví dụ 7 giờ đúng.",
      "Giờ kém: kim phút chưa tới 12, còn thiếu mấy phút nữa mới tới giờ đúng.",
    ],
    r: "Kim phút chỉ 12 là giờ đúng; kim phút đã qua số 12 thì đọc là giờ kém.",
  },
  "g2-c6-l9": {
    p: [
      "Chỉ cộng, trừ được khi các số đo CÙNG một đơn vị.",
      "Ví dụ: 25 kg + 12 kg = 37 kg; 2 m = 200 cm.",
    ],
    r: "Đổi về cùng đơn vị trước khi tính, rồi mới ghi đáp số.",
  },
  "g2-c6-l10": {
    p: [
      "Bảng đơn vị: mm, cm, dm, m, km; g, kg; ml, l.",
      "1 m = 10 dm = 100 cm.",
    ],
    r: "Chọn đúng đơn vị cho từng đồ vật: bút chì đo bằng cm, quãng đường đo bằng km.",
  },
  "g2-c6-l12": {
    p: [
      "Ước lượng là đoán gần đúng dựa vào vật quen thuộc.",
      "Ví dụ: quả táo khoảng 200 g; chai nước khoảng 1 l.",
    ],
    r: "Ước lượng xong nên cân hoặc đo thật để so sánh và rút kinh nghiệm.",
  },

  // ── Chương 7: giải toán ──
  "g2-c7-l5": {
    p: [
      "Từ khóa báo phép cộng: thêm vào, tất cả, cả hai.",
      "Ba bước: tìm từ khóa → viết phép tính → viết câu trả lời.",
    ],
    r: "Đáp số phải kèm tên đơn vị; viết đầy đủ phép tính rồi mới kết luận.",
  },
  "g2-c7-l6": {
    p: [
      "Từ khóa báo phép trừ: bớt đi, cho đi, còn lại, ít hơn.",
      "Ví dụ: có 45 quả, bán đi 18 quả ⇒ 45 - 18 = 27 quả.",
    ],
    r: "Thử lại phép trừ bằng phép cộng: 27 + 18 = 45.",
  },
  "g2-c7-l9": {
    p: [
      "Thu thập là ghi lại thông tin, ví dụ số bạn thích từng màu.",
      "Kiểm đếm: mỗi lần đếm được một vật thì gạch một vạch để không sót.",
    ],
    r: "Phân loại rõ nhóm trước khi đếm — mỗi vật chỉ thuộc một nhóm.",
  },

  // ── Chương 9 và 10 ──
  "g2-c9-l1": {
    p: [
      "Bảng số liệu gồm tên nhóm và số lượng tương ứng.",
      "Đếm xong ghi số vào bảng để dễ so sánh các nhóm với nhau.",
    ],
    r: "Số liệu chỉ đáng tin khi đếm đủ và không đếm trùng.",
  },
  "g2-c10-l2": {
    p: [
      "Đọc, viết, so sánh số có ba chữ số; viết số thành tổng trăm + chục + đơn vị.",
      "Cộng trừ trong phạm vi 1000: đặt tính thẳng cột rồi tính từ phải sang trái.",
    ],
    r: "Thử lại kết quả bằng phép tính ngược trước khi kết luận.",
  },
  "g2-c10-l3": {
    p: [
      "Bé đã học xong: số đến 1000, bốn phép tính, đo lường, hình học và thống kê.",
      "Đây là bài cuối của Lớp 2 — bé đã sẵn sàng bước lên Lớp 3.",
    ],
    r: "Giữ thói quen tính cẩn thận và kiểm tra lại kết quả khi lên Lớp 3!",
  },
};

// ───────────────────────────────────────────────────────────────────────────

let src = fs.readFileSync(FILE, "utf8");

// Cắt thành các khối bài (id bài), chịu được cả hai kiểu khoá `id:` và `"id":`.
const TACH = /(?=["']?id["']?: "g2-c\d+-l\d+",)/g;
const khuc = src.split(TACH);

const ids = Object.keys(NOI_DUNG);
const daSua = new Set();
let soPoints = 0;
let soRule = 0;
const loi = [];

const ra = khuc.map((k) => {
  const id = k.match(/["']?id["']?: "(g2-c\d+-l\d+)",/)?.[1];
  if (!id || !NOI_DUNG[id]) return k;
  const nd = NOI_DUNG[id];

  // 🔴 CHỈ SỬA BÊN TRONG SLIDE KHÁI NIỆM. Mẫu `points`/`rule` không phân biệt slide, nên bản
  // đầu của script đã ghi dè luôn mảng `points` của slide `summary` — lời tóm tắt RIÊNG của
  // bài ("37 + 29 = 66", "6, 12, 18, 24, 30"). Đã mắc thật: **55 bài Lớp 2** bị đè ⇒ phải
  // phục hồi từ bản sao lưu và chạy lại bằng bản có giới hạn này.
  // Khối khái niệm kết thúc ở dòng đóng slide (`            },` — 12 dấu cách).
  const iC = k.indexOf('type: "concept"');
  const jC = iC < 0 ? -1 : k.indexOf("\n            },", iC);
  if (iC < 0 || jC < 0) {
    loi.push(`${id} (không thấy khối concept)`);
    return k;
  }
  const dauKhoi = k.slice(0, iC);
  const khoi = k.slice(iC, jC);
  const cuoiKhoi = k.slice(jC);

  let n1 = 0;
  let n2 = 0;
  // ⚠️ Phải khớp CẢ HAI kiểu viết mảng:
  //   points: ["một dòng"],             ← slide `summary` thường viết thế này
  //   points: [\n  "a",\n  "b",\n],     ← slide `concept` thường viết thế này
  // Nếu chỉ khớp kiểu nhiều dòng (`\n\s*\]`) thì với mảng một dòng regex sẽ chạy lố qua
  // tận mảng `slides` phía dưới và phá nát cả khối bài. `points` luôn là mảng chuỗi nên
  // dùng lớp ký tự không chứa ngoặc là an toàn; gặp mảng lồng nhau sẽ báo lỗi (n1 = 0).
  let out = khoi.replace(
    /^([ \t]*)(["']?points["']?: )\[[^[\]]*\]/gm,
    (_m, ws, dau) => {
      n1 += 1;
      if (nd.p.length === 1) return `${ws}${dau}[${JSON.stringify(nd.p[0])}]`;
      const dong = nd.p.map((t) => `${ws}  ${JSON.stringify(t)},`).join("\n");
      return `${ws}${dau}[\n${dong}\n${ws}]`;
    },
  );
  // ⚠️ Phải dùng `.*?` (lazy) — nếu dùng `.*` thì nó ăn luôn dấu phẩy cuối dòng và
  // nhóm `(,?)` chỉ khớp được chuỗi rỗng ⇒ mất dấu phẩy ⇒ cả file sai cú pháp.
  out = out.replace(
    /^(\s*)(["']?rule["']?: ).*?(,?)$/gm,
    (_m, ws, dau, cuoi) => {
      n2 += 1;
      return `${ws}${dau}${JSON.stringify(nd.r)}${cuoi}`;
    },
  );

  if (n1 === 0 || n2 === 0) loi.push(`${id} (points=${n1}, rule=${n2})`);
  soPoints += n1;
  soRule += n2;
  daSua.add(id);
  return dauKhoi + out + cuoiKhoi;
});

const thieu = ids.filter((id) => !daSua.has(id));
if (loi.length || thieu.length) {
  console.error("🔴 DỪNG — không ghi file.");
  if (thieu.length) console.error(`   Không thấy bài: ${thieu.join(", ")}`);
  if (loi.length) console.error(`   Bài thiếu points/rule: ${loi.join(", ")}`);
  process.exit(1);
}

src = ra.join("");
fs.writeFileSync(FILE, src, "utf8");
console.log(
  `✅ Đã viết lại ${daSua.size}/${ids.length} bài — ${soPoints} khối gạch đầu dòng, ${soRule} câu quy tắc.`,
);
