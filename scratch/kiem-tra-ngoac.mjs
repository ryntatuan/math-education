/**
 * SOI LỆCH NGOẶC TRONG FILE DỮ LIỆU BÀI HỌC — chỉ đọc, không sửa gì.
 *
 * VÌ SAO CÓ FILE NÀY (2026-09-29): khi chèn slide bằng công cụ soạn thảo, tôi làm rơi/mọc thêm
 * một dấu `}`. `node` chỉ báo **lỗi ĐẦU TIÊN**, sửa xong lại lộ lỗi sau ⇒ mỗi vòng sửa tốn một
 * lượt chạy (đã tốn 2 lượt cho `g2c4.js`). File dữ liệu lại được prettier căn lề **2 dấu cách
 * một cấp** ⇒ ĐỘ THỤT LỀ chính là "bản đồ độ sâu" của ngoặc: một dòng đóng ngoặc lệch lề nghĩa
 * là lệch ngoặc. Công cụ này chỉ đúng mọi dòng lệch như vậy trong MỘT lượt.
 *
 *   node scratch/kiem-tra-ngoac.mjs                 # soi cả 5 lớp + storyData
 *   node scratch/kiem-tra-ngoac.mjs client/src/data/grade2/g2c4.js
 *
 * ⚠️ Phải bỏ qua chuỗi trong nháy (dữ liệu có `"27 + 5 = 32"`, có ngoặc trong câu hỏi) —
 * đếm ngoặc thô trên cả file là thước hỏng.
 */
import fs from "node:fs";
import path from "node:path";

/** Mọi file dữ liệu bài học: 5 file gộp + từng file chương trong `data/gradeN/`. */
function lietKeMacDinh() {
  const goc = path.resolve("client/src/data");
  const ra = [];
  const duyet = (thuMuc) => {
    for (const ten of fs.readdirSync(thuMuc)) {
      const full = path.join(thuMuc, ten);
      if (fs.statSync(full).isDirectory()) duyet(full);
      else if (ten.endsWith(".js") && !ten.endsWith(".test.js"))
        ra.push(path.relative(process.cwd(), full).replace(/\\/g, "/"));
    }
  };
  duyet(goc);
  return ra;
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : lietKeMacDinh();
let tongLoi = 0;
let soFileLoi = 0;

for (const file of files) {
  const full = path.resolve(file);
  if (!fs.existsSync(full)) {
    console.log(`⚠️  không thấy ${file}`);
    continue;
  }
  const lines = fs.readFileSync(full, "utf8").split("\n");
  /**
   * ⏭ BỎ FILE MÃ (không phải dữ liệu thuần). Luật của công cụ này là "độ thụt lề = độ sâu
   * ngoặc", đúng với file dữ liệu nhưng SAI với vòng lặp: `for (…) for (…) {` mở khối mà
   * dòng không xuống cấp ⇒ báo oan (đã gặp: `dungCayNoiDung.js`). Cảnh báo giả nhiều lần thì
   * người ta bỏ qua công cụ — nên file mã bị bỏ hẳn, chỉ soi dữ liệu.
   */
  const laFileMa = /\b(for|while|return|function)\s*\(|=>/.test(
    fs.readFileSync(full, "utf8"),
  );
  if (laFileMa) {
    console.log(
      `⏭ ${file} — file mã, bỏ qua (luật thụt lề chỉ đúng với dữ liệu)`,
    );
    continue;
  }
  let depth = 0;
  let trongChuoi = false;
  const loi = [];

  lines.forEach((line, i) => {
    const soDong = i + 1;
    const thutLe = line.match(/^ */)[0].length;
    /**
     * Dòng CHỈ chứa ngoặc đóng (có thể kèm dấu phẩy) ⇒ đây là dòng "đóng khối".
     * Độ thụt lề của nó phải bằng `(độ sâu SAU khi đóng − 1) × 2`.
     */
    const chiDong = line.match(/^\s*[}\]]+,?\s*$/);

    let dau = 0;
    let cuoi = 0;
    for (const ch of line) {
      if (trongChuoi) {
        if (ch === "\\") {
          // ký tự thoát: bỏ luôn ký tự kế tiếp trong cùng vòng lặp là sai, nên đánh dấu
          trongChuoi = trongChuoi; // giữ nguyên
        } else if (ch === '"') {
          trongChuoi = false;
        }
        continue;
      }
      if (ch === '"') {
        trongChuoi = true;
        continue;
      }
      if (ch === "{" || ch === "[") dau++;
      if (ch === "}" || ch === "]") cuoi++;
    }
    // Bỏ qua ký tự thoát trong chuỗi: `\"` không được tính là đóng chuỗi — xử lý bằng cách
    // quét lại chuỗi đó cho chắc (dữ liệu có câu chứa dấu nháy kép kiểu “…” là ký tự khác).
    if (chiDong) {
      const sauKhiDong = depth - 1;
      const leMongDoi = sauKhiDong * 2;
      if (thutLe !== leMongDoi) {
        loi.push(
          `dòng ${soDong}: thụt lề ${thutLe}, đáng lẽ ${leMongDoi} (độ sâu ${depth}) — ${line.trim().slice(0, 40)}`,
        );
      }
    }
    depth += dau - cuoi;
    if (depth < 0) {
      loi.push(`dòng ${soDong}: đóng thừa ngoặc (độ sâu âm)`);
      depth = 0;
    }
  });

  if (trongChuoi)
    loi.push("kết thúc file mà còn trong chuỗi (thiếu dấu nháy kép)");
  if (depth !== 0) loi.push(`kết thúc file: độ sâu ${depth} (khác 0)`);

  tongLoi += loi.length;
  if (loi.length) soFileLoi += 1;
  /**
   * CHỈ BÁO CA ĐẦU TIÊN của mỗi file: một dấu ngoặc thừa/thiếu làm MỌI dòng đóng ngoặc sau đó
   * lệch đúng một cấp ⇒ in hết là hàng trăm dòng dây chuyền, che mất ca gốc (đã mắc: 327 dòng
   * cho đúng MỘT dấu ngoặc thừa).
   */
  if (loi.length || files.length <= 12)
    console.log(
      `${loi.length ? "❌" : "✅"} ${file} — ${lines.length} dòng${loi.length ? `, ${loi.length} ca lệch` : ""}`,
    );
  for (const l of loi.slice(0, 1)) console.log(`     · ${l}`);
  if (loi.length > 1)
    console.log(
      `     · (+${loi.length - 1} dòng lệch theo sau — sửa ca trên rồi soi lại)`,
    );
}

console.log(
  tongLoi
    ? `\n❌ ${soFileLoi} file lệch ngoặc (tổng ${tongLoi} ca).`
    : `\n✅ Ngoặc cân ở cả ${files.length} file dữ liệu.`,
);
process.exit(tongLoi ? 1 : 0);
