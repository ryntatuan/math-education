/**
 * CỔNG KIỂM “ĐẶT TÍNH DỌC” — thử THẬT hàm toán (không grep chuỗi).
 * Canary HAI VẾ: (1) kết quả đúng phải khớp, (2) kết quả SAI phải bị phát hiện.
 * Chạy: `node scratch/kiem-tra-dat-tinh.mjs`
 */
import {
  tachSo,
  tinhKetQua,
  tinhNho,
  dapAnDatTinh,
  tinhChia,
} from "../client/src/components/visuals/columnMath.js";

const chu = (o) => (o.thap ? `${o.nguyen},${o.thap}` : o.nguyen);
let dung = 0;
const sai = [];

const caPhep = [
  // [left, right, sign, kết quả mong đợi, kết quả SAI (phải khác)]
  [32, 14, "+", "46", "45"],
  [25, 4, "+", "29", "28"],
  [39, 5, "+", "44", "34"],
  [27, 5, "+", "32", "22"],
  [38, 25, "+", "63", "53"],
  [86, 31, "−", "55", "56"],
  [52, 27, "−", "25", "35"],
  [57, 23, "-", "34", "24"],
  [1000, 999, "+", "1999", "1899"],
  ["15,82", 9.35, "+", "25,17", "25,26"],
  ["4,2", "1,35", "−", "2,85", "2,75"],
  ["0,5", "0,25", "+", "0,75", "0,7"],
  ["12,3", "12,3", "−", "0,0", "0,1"],
  [100, 45, "−", "55", "65"],
  // phép nhân (SGK Lớp 3–5) — thập phân: số chữ số thập phân của tích = TỔNG hai thừa số
  [32, 3, "×", "96", "95"],
  [26, 3, "×", "78", "68"],
  [142, 3, "×", "426", "416"],
  [12, 12, "×", "144", "143"],
  ["1,2", 3, "×", "3,6", "3,5"],
  ["0,5", "0,4", "×", "0,20", "0,9"],
];

for (const [left, right, sign, mong, mongSai] of caPhep) {
  const got = chu(tinhKetQua(left, right, sign));
  if (got === mong) dung += 1;
  else sai.push(`${left} ${sign} ${right} = ${got} (mong đợi ${mong})`);
  // VẾ 2: kết quả SAI không được trùng kết quả đúng (canh “hàm luôn trả số may”)
  if (got === mongSai)
    sai.push(`CANARY: ${left} ${sign} ${right} ra đúng giá trị SAI ${mongSai}`);
}

const caNho = [
  [27, 5, [1, 0]],
  [38, 25, [1, 0]],
  [99, 1, [1, 1]],
  [32, 14, [0, 0]],
  [105, 8, [1, 0, 0]],
];for (const [left, right, mong] of caNho) {
  const got = tinhNho(left, right);
  if (JSON.stringify(got) === JSON.stringify(mong)) dung += 1;
  else sai.push(`nhớ của ${left} + ${right} = [${got}] (mong đợi [${mong}])`);
}

const caDapAn = [
  [32, 14, "+", [6, 4]],
  [57, 23, "−", [4, 3]],
  [100, 45, "−", [5, 5]],
  ["1,5", "0,25", "+", [5, 7, 1]],
];
for (const [left, right, sign, mong] of caDapAn) {
  const got = dapAnDatTinh(left, right, sign);
  if (JSON.stringify(got) === JSON.stringify(mong)) dung += 1;
  else
    sai.push(`đáp án ${left} ${sign} ${right} = [${got}] (mong đợi [${mong}])`);
}

// tachSo: số 0 · số thập phân · dấu phẩy kiểu Việt Nam
const caTach = [
  [0, { nguyen: "0", thap: "" }],
  ["15,82", { nguyen: "15", thap: "82" }],
  ["15.82", { nguyen: "15", thap: "82" }],
  [7, { nguyen: "7", thap: "" }],
];
for (const [vao, mong] of caTach) {
  const got = tachSo(vao);
  if (JSON.stringify(got) === JSON.stringify(mong)) dung += 1;
  else
    sai.push(
      `tachSo(${vao}) = ${JSON.stringify(got)} (mong ${JSON.stringify(mong)})`,
    );
}

// Phép trừ ra số ÂM: hàm phải NÓI RA (có dấu −) để cổng dữ liệu chặn được.
const am = tinhKetQua(31, 86, "−");
if (chu(am) === "-55") dung += 1;
else sai.push(`31 − 86 phải ra -55, đang ra ${chu(am)}`);

// Phép CHIA (SGK Lớp 3–4: “đặt tính rồi tính” 48 : 4 = 12; 19 : 3 = 6 dư 1)
const caChia = [
  [48, 4, 12, 0],
  [12, 3, 4, 0],
  [13, 3, 4, 1],
  [19, 3, 6, 1],
  [39, 5, 7, 4],
  [48240, 4, 12060, 0],
  [96, 32, 3, 0],
];
for (const [a, b, mongThuong, mongDu] of caChia) {
  const r = tinhChia(a, b);
  if (Number(r.nguyen) === mongThuong && r.du === mongDu) dung += 1;
  else
    sai.push(
      `${a} : ${b} = ${r.nguyen} dư ${r.du} (mong đợi ${mongThuong} dư ${mongDu})`,
    );
}
// CANARY vế 2 cho phép chia: thương SAI phải khác thương đúng
if (Number(tinhChia(19, 3).nguyen) === 5) sai.push("CANARY: 19 : 3 lại ra 5");
else dung += 1;
// chia cho 0 KHÔNG được vẽ (hàm phải trả 0 thương, không NaN)
const chia0 = tinhChia(5, 0);
if (Number.isFinite(Number(chia0.nguyen))) dung += 1;
else sai.push("chia cho 0 phải trả thương hữu hạn, đang ra NaN");

// CANARY DƯƠNG-TÍNH-GIẢ: nếu bỏ dấu trừ mà hàm vẫn ra 46 thì phép thử vô nghĩa.
const lech = chu(tinhKetQua(32, 14, "+"));
if (lech === chu(tinhKetQua(32, 14, "−")))
  sai.push("CANARY: cộng và trừ ra cùng kết quả");
else dung += 1;

console.log(`✅ Đúng: ${dung} ca`);
if (sai.length) {
  console.log(`❌ SAI ${sai.length} ca:`);
  for (const s of sai) console.log(`   ${s}`);
}
const tong = dung + sai.length;
console.log(
  sai.length
    ? `\n❌ ${dung}/${tong} ca đúng — cổng ĐỎ.`
    : `\n✅ ${dung}/${tong} ca đúng — cổng XANH.`,
);
process.exit(sai.length ? 1 : 0);
