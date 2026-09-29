#!/usr/bin/env node
/**
 * XOÁ NHÃN DẪN SÁCH KHỎI FILE DỮ LIỆU BÀI HỌC (2026-09-29, yêu cầu người dùng).
 *
 * 🔴 VÌ SAO: app học theo chương trình chuẩn nhưng đã biên soạn lại, ghép thêm từ nhiều
 * nguồn ⇒ nhãn "(SGK tr.6)" nằm trong chính chuỗi hiển thị là vô nghĩa với bé và làm app
 * trông như bản chép của sách giấy. Nay xoá hẳn khỏi DỮ LIỆU (trước đây chỉ lọc lúc hiển thị).
 *
 * CÁCH LÀM: chỉ sửa những DÒNG có nhãn, và chỉ sửa phần chuỗi — không đụng thụt lề, không
 * đụng dòng khác. Dòng chú thích (`*`, `//`, `/*`) để người sửa tay (script bỏ qua).
 *
 *   node scratch/xoa-nhan-sgk.mjs            # chạy thử, chỉ in báo cáo
 *   node scratch/xoa-nhan-sgk.mjs --ghi      # ghi thật
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GHI = process.argv.includes("--ghi");

// Thứ tự QUAN TRỌNG: dọn cụm dài trước, rồi mới tới "SGK" trơ và dẫn trang còn sót.
const RULES = [
  // (1) Cụm dẫn sách ở CUỐI câu: "— bảng như SGK tr.4" ⇒ bỏ cả cụm.
  //     ⚠️ KHÔNG dùng `.*$` — bản đầu dùng nó nên ăn LUÔN dấu nháy đóng của chuỗi ⇒ hỏng cú pháp
  //     (g1c6.js:171, đã mắc thật). Chỉ ăn trong phạm vi MỘT chuỗi: dừng ở nháy hoặc hết dòng.
  /\s*[—–-]\s*(?:bảng\s+)?(?:như|theo|đúng|của)?\s*SGK\b[^"'\n]*/i,
  // (2) Tiền tố ở đầu chuỗi: "SGK (tr.6–7): ", "SGK Bài 15 (tr.96–99): ".
  /(?<=[`"'])(?:theo|đúng|như|của)?\s*SGK\b[^:：]{0,80}[:：]\s*/i,
  // (3) Ngoặc có nhãn: "(SGK tr.6)", "(mẫu SGK tr.30)", "(SGK tr.10, tr.16)".
  /\s*\([^()]*SGK[^()]*\)/gi,
  // (4) Nhãn còn lại + dẫn trang ngay sau nó.
  /\s*(?:theo|đúng|như|của)?\s*SGK\b\s*(?:Bài\s*\d+\s*)?(?:\([^()]*\)\s*)?(?:tr\.?\s*\d+(?:\s*[–-]\s*\d+)?)?/gi,
  // (5) Dẫn trang còn sót: "tr.97 và tr.99".
  /\s*(?:và\s+)?tr\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi,
];

const GOP = [
  [/[ \t]{2,}/g, " "], // khoảng trắng đôi
  [/[ \t]+([.,;:!?])/g, "$1"], // " ." ⇒ "."
  // ⚠️ CHỈ bỏ ngoặc rỗng trong khối CHUỖI còn lại (giữa hai nháy) — bản đầu bỏ cả dòng nên
  // xoá luôn `()` của hàm mũi tên trên dòng MÃ (`it("…", () => {`), làm cổng oxlint đỏ.
  [/(["'])[^"']*\1/g, (m) => m.replace(/\(\s*\)/g, "")],
  [/[ \t]+$/g, ""], // đuôi dòng
];

function donDong(body) {
  let s = body;
  for (const re of RULES) s = s.replace(re, " ");
  for (const [re, thay] of GOP) s = s.replace(re, thay);
  return s.replace(/\s*[—–-]\s*$/, "");
}

function laChuThich(dong) {
  const t = dong.trimStart();
  return t.startsWith("*") || t.startsWith("//") || t.startsWith("/*");
}

function lietKeFile(dir, ra = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) lietKeFile(f, ra);
    else if (e.name.endsWith(".js")) ra.push(f);
  }
  return ra;
}

const files = lietKeFile(path.join(ROOT, "client/src/data"));
let soDongSua = 0;
let soDongChuThich = 0;
const mauRong = [];

for (const file of files) {
  const raw = fs.readFileSync(file, "utf8");
  if (!/SGK/i.test(raw)) continue;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const dong = raw.split(/\r?\n/);
  const truoc = (raw.match(/""|''/g) ?? []).length;
  let doi = false;

  const moi = dong.map((l, i) => {
    if (!/SGK/i.test(l)) return l;
    if (laChuThich(l)) {
      soDongChuThich++;
      console.log(
        `  [chú thích — sửa tay] ${path.relative(ROOT, file)}:${i + 1}`,
      );
      return l;
    }
    // Tách PHẦN THỤT LỀ ra, chỉ dọn phần nội dung ⇒ không phá định dạng.
    const m = l.match(/^([ \t]*)([\s\S]*)$/);
    const than = donDong(m[2]);
    if (/""|''/.test(than) && !/""|''/.test(m[2]))
      mauRong.push(`${file}:${i + 1}`);
    soDongSua++;
    doi = true;
    return m[1] + than;
  });

  const out = moi.join(eol);
  const sau = (out.match(/""|''/g) ?? []).length;
  if (sau > truoc) throw new Error(`Tạo ra chuỗi rỗng ở ${file} — dừng lại`);

  if (doi && GHI) fs.writeFileSync(file, out, "utf8");
  if (doi)
    console.log(`${GHI ? "ĐÃ SỬA" : "sẽ sửa"} ${path.relative(ROOT, file)}`);
}

console.log(
  `\n${GHI ? "Đã sửa" : "Sẽ sửa"} ${soDongSua} dòng · bỏ qua ${soDongChuThich} dòng chú thích`,
);
if (mauRong.length) console.log("⚠️ NGHI tạo chuỗi rỗng:", mauRong.join(", "));
