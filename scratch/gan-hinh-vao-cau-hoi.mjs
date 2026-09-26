// GẮN HÌNH VÀO SLIDE CÂU HỎI — sửa lỗi UX "hình ở slide này, câu hỏi ở slide khác".
//
//   node scratch/gan-hinh-vao-cau-hoi.mjs <ke-hoach.json>            # chạy thử (in việc sẽ làm)
//   node scratch/gan-hinh-vao-cau-hoi.mjs <ke-hoach.json> --ghi      # ghi thật (sao lưu .bak)
//
// Kế hoạch do `scratch/soat-hinh-cau-hoi-lech-slide.mjs --ke-hoach <file>` sinh ra:
// mỗi mục là { bai, slideQuiz, slideNguon, khoa } — slide câu hỏi nào thiếu hình, lấy hình từ slide nào.
//
// CÁCH LÀM: DI CHUYỂN NGUYÊN KHỐI. Khối hình (`numberScene: { … }`) được cắt bằng bộ quét ngoặc từ
// slide nguồn rồi dán vào `content` của slide câu hỏi — không sửa một chữ nào bên trong.
// Slide nguồn VẪN GIỮ NGUYÊN (đó là slide dạy học), nên tổng số slide không đổi.
//
// AN TOÀN: chạy thử trước; mỗi file có `.bak`; sau khi ghi thì ĐỌC LẠI bằng `import()` để chắc file
// còn hợp lệ (không thì tự khôi phục từ .bak và báo lỗi).

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const GHI = process.argv.includes("--ghi");
const fileKeHoach = process.argv[2];
if (!fileKeHoach) {
  console.error("Thiếu đường dẫn kế hoạch (JSON).");
  process.exit(2);
}
const keHoach = JSON.parse(readFileSync(fileKeHoach, "utf8"));

/** Bộ quét ngoặc: trả về chỉ số ĐÓNG của khối mở đầu tiên tính từ `start`. */
function cuoiKhoi(lines, start) {
  let depth = 0,
    daMo = false,
    str = null,
    cmt = false,
    blk = false;
  for (let k = start; k < lines.length; k++) {
    const s = lines[k];
    for (let c = 0; c < s.length; c++) {
      const ch = s[c],
        nx = s[c + 1];
      if (cmt) break;
      if (blk) {
        if (ch === "*" && nx === "/") {
          blk = false;
          c++;
        }
        continue;
      }
      if (str) {
        if (ch === "\\") {
          c++;
          continue;
        }
        if (ch === str) str = null;
        continue;
      }
      if (ch === "/" && nx === "/") {
        cmt = true;
        break;
      }
      if (ch === "/" && nx === "*") {
        blk = true;
        c++;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        str = ch;
        continue;
      }
      if (ch === "{" || ch === "[" || ch === "(") {
        depth++;
        daMo = true;
      } else if (ch === "}" || ch === "]" || ch === ")") depth--;
    }
    cmt = false;
    if (daMo && depth === 0) return k;
  }
  throw new Error("Không tìm thấy điểm đóng khối từ dòng " + (start + 1));
}

/** Đọc file dữ liệu chứa bài `bai` (id dạng gN-cM-lK) -> { file, lines }.
 *
 *  ⚠️ KHÔNG suy file từ số chương trong id: id bài được giữ nguyên khi bài được chèn vào giữa
 *  chương khác ⇒ bài có thể nằm ở file khác với số trong id (đã mắc: 7 ca "không thấy bài").
 *  Cách đúng: tìm trong MỌI file chương của lớp đó. */
function fileCuaBai(bai) {
  const m = /^g(\d+)-c(\d+)-l\d+$/.exec(bai);
  if (!m) throw new Error("Id bài lạ: " + bai);
  const thuMuc = path.join("client/src/data", `grade${m[1]}`);
  const ungVien = existsSync(thuMuc)
    ? readdirSync(thuMuc).filter((x) => x.endsWith(".js"))
    : [];
  for (const ten of ungVien) {
    const f = path.join(thuMuc, ten);
    const lines = readFileSync(f, "utf8").split(/\r?\n/);
    if (
      lines.some((l) =>
        new RegExp(`["']?id["']?\\s*:\\s*["']${bai}["']`).test(l),
      )
    )
      return { f, lines };
  }
  throw new Error("Không thấy bài " + bai + " trong " + thuMuc);
}

/** Vị trí [đầu, cuối] khối slide thứ `i` (0-based) trong mảng `slides` của bài.
 *
 *  Dữ liệu KHÔNG có `id` cho từng slide, mà cách trình bày lại KHÁC NHAU giữa các file (có nơi
 *  `{` đứng riêng một dòng, có nơi `{ type: "visual",` cùng dòng) ⇒ đếm theo dòng `{` sẽ TRƯỢT
 *  (đã mắc: 20/31 ca ghi được, còn lại báo "không thấy slide"). Cách đúng: quét theo CẤP NGOẶC —
 *  phần tử của mảng là `{` xuất hiện khi đang ở đúng cấp 1 (trong `slides: [`).
 */
function khoiSlide(lines, bai, i) {
  const iBai = lines.findIndex((l) =>
    new RegExp(`["']?id["']?\\s*:\\s*["']${bai}["']`).test(l),
  );
  if (iBai < 0) throw new Error("Không thấy bài " + bai);
  const iSlides = lines.findIndex(
    (l, k) => k > iBai && /^\s*["']?slides["']?\s*:\s*\[\s*$/.test(l),
  );
  if (iSlides < 0) throw new Error("Không thấy mảng slides của " + bai);

  let depth = 0,
    dem = 0,
    str = null,
    cmt = false,
    blk = false;
  for (let k = iSlides; k < lines.length; k++) {
    const s = lines[k];
    for (let c = 0; c < s.length; c++) {
      const ch = s[c],
        nx = s[c + 1];
      if (cmt) break;
      if (blk) {
        if (ch === "*" && nx === "/") {
          blk = false;
          c++;
        }
        continue;
      }
      if (str) {
        if (ch === "\\") {
          c++;
          continue;
        }
        if (ch === str) str = null;
        continue;
      }
      if (ch === "/" && nx === "/") {
        cmt = true;
        break;
      }
      if (ch === "/" && nx === "*") {
        blk = true;
        c++;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === "`") {
        str = ch;
        continue;
      }
      if (ch === "{") {
        if (depth === 1) {
          const cuoi = cuoiKhoi(lines, k);
          if (dem === i) return [k, cuoi];
          dem++;
          k = cuoi; // nhảy qua cả phần tử
          c = -1;
          break;
        }
        depth++;
      } else if (ch === "[" || ch === "(") depth++;
      else if (ch === "}" || ch === "]" || ch === ")") {
        depth--;
        if (depth <= 0)
          throw new Error(
            `Mảng slides của ${bai} kết thúc sớm (chỉ có ${dem} slide)`,
          );
      }
    }
    cmt = false;
  }
  throw new Error(`Không thấy slide thứ ${i + 1} của ${bai} (chỉ có ${dem})`);
}

/** Cắt nguyên khối `<khoa>: { … }` trong một khối slide -> chuỗi nhiều dòng. */
function khoiHinh(lines, dau, cuoi, khoa) {
  for (let k = dau; k <= cuoi; k++) {
    const m = new RegExp(`^(\\s*)${khoa}:\\s*[\\{\\[]`).exec(lines[k]);
    if (!m) continue;
    const cuoiHinh = cuoiKhoi(lines, k);
    return {
      text: lines.slice(k, cuoiHinh + 1).join("\n"),
      indent: m[1].length,
    };
  }
  throw new Error(`Không thấy khối hình "${khoa}" trong slide`);
}

// ── Dựng việc cần làm, gom theo file ────────────────────────────────────────
const theoFile = new Map();
const canhBao = [];
for (const muc of keHoach) {
  try {
    const { f } = fileCuaBai(muc.bai);
    if (!theoFile.has(f)) theoFile.set(f, []);
    theoFile.get(f).push(muc);
  } catch (e) {
    canhBao.push(`${muc.bai}: ${e.message}`);
  }
}

let soCa = 0;
for (const [f, ds] of theoFile) {
  const goc = readFileSync(f, "utf8");
  const lines = goc.split(/\r?\n/);
  // Xử lý slide có chỉ số LỚN TRƯỚC để việc chèn không làm lệch chỉ số các slide sau.
  const sapXep = [...ds].sort((a, b) => b.slideQuiz - a.slideQuiz);
  for (const muc of sapXep) {
    try {
      const [dauN, cuoiN] = khoiSlide(lines, muc.bai, muc.slideNguon);
      // Kế hoạch có thể ghi nhiều khoá (vd "table+operation"). Chèn nhiều khoá cùng lúc đã gây
      // `Unexpected token ','` (file g2c8.js — may có bảo vệ tự khôi phục từ .bak) nên để RIÊNG
      // cho người soi tay, không đoán.
      const khoaDs = String(muc.khoa).split("+").filter(Boolean);
      if (khoaDs.length > 1)
        throw new Error(
          `slide nguồn có ${khoaDs.length} khoá hình (${muc.khoa}) — soi tay`,
        );
      const hinh = khoiHinh(lines, dauN, cuoiN, khoaDs[0]);
      const [dauQ, cuoiQ] = khoiSlide(lines, muc.bai, muc.slideQuiz);
      // `content: {` của slide câu hỏi — chèn hình vào CUỐI content (trước dấu `}` đóng)
      let iContent = -1;
      for (let k = dauQ; k <= cuoiQ; k++)
        if (/^\s*["']?content["']?\s*:\s*\{\s*$/.test(lines[k])) {
          iContent = k;
          break;
        }
      if (iContent < 0) {
        canhBao.push(
          `${muc.bai} #${muc.slideQuiz + 1}: slide câu hỏi không có content dạng khối`,
        );
        continue;
      }
      const cuoiContent = cuoiKhoi(lines, iContent);
      const indent = (lines[iContent].match(/^\s*/) ?? [""])[0].length + 2;
      const dongHinh = hinh.text
        .split("\n")
        .map((t) => t.replace(/^\s*/, " ".repeat(indent)));
      // dấu phẩy: dòng ngay trước `}` đóng của content phải có phẩy
      const iTruoc = cuoiContent - 1;
      const coPhay = /,\s*$/.test(lines[iTruoc]);
      console.log(
        `  ${muc.bai}: chèn "${muc.khoa}" (${hinh.text.split("\n").length} dòng) vào slide câu hỏi #${muc.slideQuiz + 1}` +
          (muc.diemGiong === 0
            ? "  [KHÔNG khớp từ khoá — soi tay]"
            : `  [khớp ${muc.diemGiong} từ]`),
      );
      if (!GHI) continue;
      const moi = [
        ...lines.slice(0, iTruoc + 1),
        ...(coPhay ? [] : [lines[iTruoc].replace(/\s*$/, "") + ","]),
        ...dongHinh,
        ...lines.slice(cuoiContent),
      ];
      lines.length = 0;
      lines.push(...moi);
      soCa++;
    } catch (e) {
      canhBao.push(`${muc.bai} #${muc.slideQuiz + 1}: ${e.message}`);
    }
  }
  if (GHI && sapXep.length) {
    copyFileSync(f, f + ".bak");
    writeFileSync(f, lines.join("\n"), "utf8");
    console.log(`  ✓ ghi ${f} (${sapXep.length} ca)`);
  }
}

if (canhBao.length) {
  console.log(`\n⚠️ ${canhBao.length} ca không xử lý được:`);
  for (const c of canhBao) console.log("   · " + c);
}
if (!GHI) {
  console.log(
    `\n(chạy thử — thêm --ghi để ghi thật; ${[...theoFile.values()].flat().length} ca)`,
  );
  process.exit(0);
}

// ── Đọc lại để chắc file còn hợp lệ, không thì khôi phục ────────────────────
for (const [f] of theoFile) {
  try {
    const m = await import(
      pathToFileURL(path.resolve(f)).href + "?t=" + Date.now()
    );
    const khoa = Object.keys(m).find((k) => k.startsWith("grade"));
    const so = m[khoa]?.chapters?.length ?? 0;
    console.log(`  ✓ đọc lại ${f}: hợp lệ (${so} chương)`);
  } catch (e) {
    copyFileSync(f + ".bak", f);
    console.error(
      `  ✗ ${f} HỎNG sau khi ghi ⇒ đã khôi phục từ .bak. Lỗi: ${e.message}`,
    );
    process.exit(1);
  }
}
console.log(`\nĐã chèn hình vào ${soCa} slide câu hỏi.`);
