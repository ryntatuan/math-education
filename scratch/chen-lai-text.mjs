#!/usr/bin/env node
/**
 * TRẢ LẠI KHOÁ `text` CHO HAI SLIDE “QUAN SÁT” — sau khi tôi bỏ nó vì chữ trùng bảng, script sinh
 * seed báo:
 *   `g1-c2-l8: slide 3 (visual): thiếu khoá bắt buộc text`
 *   `g3-c5-l5: slide 3 (visual): thiếu khoá bắt buộc text`
 * ⇒ BỎ HẲN `text` là SAI (schema bắt buộc): phải ĐỔI SANG câu KHÁC, không lặp bảng.
 *
 * Cách làm: chèn một dòng `text: "…",` NGAY TRƯỚC dòng mở bảng của đúng slide đó, thụt lề bằng
 * thụt lề của dòng bảng (hai khoá là anh em cùng cấp). Neo là dòng DUY NHẤT của slide đó.
 *
 * Chạy: node scratch/chen-lai-text.mjs [--ghi]
 */
import fs from "node:fs";

const GHI = process.argv.includes("--ghi");

/** [file, neo (dòng duy nhất trong file), câu chữ mới, có dùng khoá trong nháy kép không] */
const VIE = [
  [
    "client/src/data/grade1/g1c2.js",
    'headers: ["Hình", "Đặc điểm"],',
    "Bé đọc bảng dưới đây rồi nhớ đặc điểm từng hình.",
    false,
  ],
  [
    "client/src/data/grade3/g3c5.js",
    '"Nhiệt kế chỉ",',
    "Bé đọc nhiệt kế rồi cho biết bạn nào cần nghỉ ngơi.",
    true,
  ],
];

let soSua = 0;
let soLoi = 0;
for (const [f, neo, chu, coNhay] of VIE) {
  const raw = fs.readFileSync(f, "utf8");
  const soLan = raw.split(neo).length - 1;
  if (soLan !== 1) {
    soLoi++;
    console.log(`  ✗ ${f}: neo xuất hiện ${soLan} lần (mong 1) — BỎ QUA`);
    continue;
  }
  const iNeo = raw.indexOf(neo);
  // Dòng mở bảng nằm TRƯỚC dòng neo (neo là dòng headers/ô đầu của bảng).
  const iDongNeo = raw.lastIndexOf("\n", iNeo) + 1;
  const iMoBang = raw.lastIndexOf("table", iNeo);
  if (iMoBang < 0) {
    soLoi++;
    console.log(`  ✗ ${f}: không thấy dòng mở bảng — BỎ QUA`);
    continue;
  }
  const iDongBang = raw.lastIndexOf("\n", iMoBang) + 1;
  const dongBang = raw.slice(iDongBang, raw.indexOf("\n", iMoBang));
  const thutLe = dongBang.slice(
    0,
    dongBang.length - dongBang.trimStart().length,
  );
  const khoa = coNhay ? '"text"' : "text";
  const dongMoi = `${thutLe}${khoa}: ${JSON.stringify(chu)},`;
  if (raw.slice(iDongBang, iNeo).includes("text")) {
    console.log(`  · ${f}: đã có \`text\` — bỏ qua`);
    continue;
  }
  const ra = raw.slice(0, iDongBang) + dongMoi + "\r\n" + raw.slice(iDongBang);
  soSua++;
  console.log(`  ✓ ${f}: chèn ${dongMoi.trim()}`);
  if (GHI) fs.writeFileSync(f, ra, "utf8");
  void iDongNeo;
}
console.log(`${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ · lỗi: ${soLoi}`);
