// GẮN HÌNH VÀO CÙNG SLIDE VỚI CÂU HỎI — bản dùng được cho CẢ file dữ liệu kiểu JSON.
//
// 🔴 VÌ SAO CẦN BẢN THỨ HAI (khác `gan-hinh-vao-cau-hoi.mjs`):
//   Bản cũ cắt khối hình bằng mẫu `<khoa>:` — tức khoá KHÔNG có nháy. Các file lớp 2/3 viết
//   kiểu JSON (`"slides": [`, `"barChart": {`) nên bản cũ báo "Không thấy mảng slides" hoặc
//   "Không thấy khối hình" và bỏ qua âm thầm: đúng loại hỏng mà dự án đã gặp nhiều lần.
//
//   Bản này khác ba điểm, đều để bớt phụ thuộc vào chi tiết trình bày của file:
//     1. Mọi khoá (id / slides / content / tên hình) nhận cả dạng có nháy lẫn không nháy.
//     2. KHÔNG dùng chỉ số slide nguồn: lấy khối hình xuất hiện GẦN NHẤT phía trước slide câu
//        hỏi. Đúng ý "hình ở slide trước, câu hỏi ở slide sau" mà không cần khớp chỉ số.
//     3. HAI CHỐT AN TOÀN trước khi ghi:
//        · slide câu hỏi phải thật sự có `question` (nếu tra sai mảng slides thì dừng, không ghi);
//        · nếu slide câu hỏi ĐÃ có khoá hình đó thì bỏ qua (chạy lại nhiều lần vẫn an toàn).
//
// DÙNG: node scratch/gan-hinh-vao-cau-hoi-2.mjs <ke-hoach.json> [--ghi]
//       (không có --ghi thì chỉ in ra việc sẽ làm, không sửa file)
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  copyFileSync,
} from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

// Khoá hình do bộ vẽ CŨ của LessonPage dựng (ảnh thật, không phải khoá rỗng nghĩa).
const KEYS_CU = [
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
];
const CO_THE_LA_HINH = new Set([...HINH_KEYS, ...KEYS_CU]);

// Câu hỏi THẬT SỰ trỏ vào hình. Chỉ những câu này mới đáng gắn hình vào cùng slide — xem CHỐT 3.
const NHAC_HINH =
  /trong hình|trong bảng|bảng 100 số|bảng các số|biểu đồ|trên (mặt )?đồng hồ|hình vẽ/i;

// Từ chung, không dùng để phân biệt hình này với hình khác.
const TU_CHUNG = new Set([
  "bé",
  "có",
  "mấy",
  "số",
  "và",
  "là",
  "của",
  "trong",
  "dưới",
  "trên",
  "bao",
  "nhiêu",
  "được",
  "cho",
  "với",
  "các",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "hỏi",
  "hình",
  "bảng",
  "đại",
  "diện",
  "tất",
  "cả",
  "đây",
  "thì",
  "vậy",
  "này",
]);

const GHI = process.argv.includes("--ghi");
const tepKeHoach = process.argv[2];
if (!tepKeHoach || tepKeHoach.startsWith("--")) {
  console.error(
    "Dùng: node scratch/gan-hinh-vao-cau-hoi-2.mjs <ke-hoach.json> [--ghi]",
  );
  process.exit(2);
}
const keHoach = JSON.parse(readFileSync(tepKeHoach, "utf8"));

/** Mẫu khoá, chấp nhận cả `khoa:` và `"khoa":`. */
const q = (s) => `["']?${s}["']?`;
const moKhoi = (khoa) => new RegExp(`^\\s*${q(khoa)}\\s*:\\s*[\\{\\[]`);
const dongId = (bai) => new RegExp(`^\\s*${q("id")}\\s*:\\s*["']${bai}["']`);

/** Dòng ĐÓNG khối `{…}` mở ra từ dòng `start` (bỏ qua chuỗi, comment, template literal). */
function cuoiKhoi(lines, start) {
  let depth = 0;
  let daMo = false;
  let str = null;
  let cmt = false;
  let blk = false;
  for (let k = start; k < lines.length; k++) {
    const s = lines[k];
    for (let c = 0; c < s.length; c++) {
      const ch = s[c];
      const nx = s[c + 1];
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
      } else if (ch === "}" || ch === "]" || ch === ")") {
        depth--;
        if (daMo && depth === 0) return k;
      }
    }
    cmt = false;
  }
  throw new Error("Không tìm thấy điểm đóng khối từ dòng " + (start + 1));
}

/** File dữ liệu chứa bài `bai` — tìm trong MỌI file chương của lớp (bài có thể nằm ở file khác
 *  với số chương ghi trong id). */
function fileCuaBai(bai) {
  const m = /^g(\d+)-c\d+-l\d+$/.exec(bai);
  if (!m) throw new Error("Id bài lạ: " + bai);
  const thuMuc = path.join("client/src/data", `grade${m[1]}`);
  const ds = existsSync(thuMuc)
    ? readdirSync(thuMuc).filter((x) => x.endsWith(".js"))
    : [];
  for (const ten of ds) {
    const f = path.join(thuMuc, ten);
    const lines = readFileSync(f, "utf8").split(/\r?\n/);
    if (lines.some((l) => dongId(bai).test(l))) return { f, lines };
  }
  throw new Error("Không thấy bài " + bai + " trong " + thuMuc);
}

/** Vị trí [đầu, cuối] của slide thứ `i` (0-based) trong mảng `slides` của bài `bai`. */
function khoiSlide(lines, iBai, i, bai) {
  const iSlides = lines.findIndex(
    (l, k) =>
      k > iBai && new RegExp(`^\\s*${q("slides")}\\s*:\\s*\\[\\s*$`).test(l),
  );
  if (iSlides < 0) throw new Error("Không thấy mảng slides của " + bai);
  let depth = 0;
  let dem = 0;
  let str = null;
  let cmt = false;
  let blk = false;
  for (let k = iSlides; k < lines.length; k++) {
    const s = lines[k];
    for (let c = 0; c < s.length; c++) {
      const ch = s[c];
      const nx = s[c + 1];
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
          k = cuoi;
          c = -1;
          break;
        }
        depth++;
      } else if (ch === "[" || ch === "(") depth++;
      else if (ch === "}" || ch === "]" || ch === ")") {
        depth--;
        if (depth <= 0)
          throw new Error(`Mảng slides của ${bai} kết thúc sớm (${dem} slide)`);
      }
    }
    cmt = false;
  }
  throw new Error(`Không thấy slide thứ ${i + 1} của ${bai} (chỉ có ${dem})`);
}

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
let soBo = 0;
for (const [f, ds] of theoFile) {
  const lines = readFileSync(f, "utf8").split(/\r?\n/);
  // Slide có chỉ số LỚN xử lý TRƯỚC để việc chèn không làm lệch chỉ số các slide sau.
  const sapXep = [...ds].sort((a, b) => b.slideQuiz - a.slideQuiz);
  for (const muc of sapXep) {
    const nhan = `${muc.bai} #${muc.slideQuiz + 1}`;
    try {
      const iBai = lines.findIndex((l) => dongId(muc.bai).test(l));
      if (iBai < 0) throw new Error("Không thấy bài " + muc.bai);
      const [dauQ, cuoiQ] = khoiSlide(lines, iBai, muc.slideQuiz, muc.bai);

      // CHỐT 1 — slide câu hỏi phải thật sự là slide hỏi.
      // ⚠️ `moKhoi("question")` là SAI: câu hỏi là CHUỖI chứ không phải khối `{…}`, nên mẫu
      // "mở khối" không bao giờ khớp ⇒ chốt báo oan cho MỌI ca (đã mắc: 18+ ca bị chặn oan).
      const coKhoa = (khoa) => new RegExp(`^\\s*${q(khoa)}\\s*:`);
      if (!lines.slice(dauQ, cuoiQ + 1).some((l) => coKhoa("question").test(l)))
        throw new Error(
          "slide này không có `question` ⇒ tra sai mảng slides, không ghi",
        );

      // Hay dùng khoá ghi trong kế hoạch; nếu kế hoạch không chỉ ra được thì lấy khối hình
      // GẦN NHẤT phía trước slide câu hỏi trong cùng bài.
      const khoaKeHoach = String(muc.khoa ?? "")
        .split("+")[0]
        .trim();

      // CHỐT 3 — chỉ gắn khi câu hỏi THẬT SỰ trỏ vào hình. Câu hỏi tự chứa đủ dữ liệu (đề toán
      // có lời văn, "số nào dưới đây…", "nhóm A có 5 cái kẹo…") mà gắn thêm hình thì thành cặp
      // câu hỏi–hình KHÔNG LIÊN QUAN: đã mắc thật với "Biểu đồ có 5 ký hiệu…" — hình bị gắn
      // thêm là biểu đồ cột đã ghi sẵn đáp án, làm câu hỏi vô nghĩa.
      const chuDe = lines
        .slice(dauQ, cuoiQ + 1)
        .join(" ")
        .replace(/\\[nrt]/g, " ");
      if (!NHAC_HINH.test(chuDe)) {
        soBo++;
        console.log(`  ${nhan}: câu hỏi không trỏ vào hình — BỎ QUA`);
        continue;
      }

      // Chọn khối hình KHỚP NGHĨA với câu hỏi — không chỉ "gần nhất".
      // 🔴 Đã mắc thật: câu hỏi "Bể cá thứ ba trong hình có mấy khối?" bị gắn hình "các nhóm
      // 🐱🥕🐶" vì khối hình gần nhất cũng dùng khoá `numberScene`; hình bể cá nằm ở slide trước đó.
      // Cách chọn: đếm số từ chung giữa câu hỏi và từng khối hình, lấy khối khớp nhiều nhất
      // (bằng điểm thì lấy khối GẦN hơn).
      const tuCua = (t) =>
        new Set(
          String(t || "")
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .split(/\s+/)
            .filter((x) => x.length >= 2 && !TU_CHUNG.has(x)),
        );
      const tuCauHoi = tuCua(lines.slice(dauQ, cuoiQ + 1).join(" "));
      let hinh = null;
      let khoaDung = null;
      let diemTot = -1;
      for (let k = iBai; k < dauQ; k++) {
        const m = /^\s*["']?([A-Za-z_][A-Za-z0-9_]*)['"]?\s*:\s*[\{\[]/.exec(
          lines[k],
        );
        if (!m) continue;
        const khoa = m[1];
        if (!CO_THE_LA_HINH.has(khoa)) continue;
        if (khoaKeHoach && khoa !== khoaKeHoach) continue;
        const cuoi = cuoiKhoi(lines, k);
        const khoiText = lines.slice(k, cuoi + 1).join(" ");
        const tuHinh = tuCua(khoiText);
        let diem = 0;
        for (const t of tuCauHoi) if (tuHinh.has(t)) diem++;
        if (diem >= diemTot) {
          diemTot = diem;
          hinh = {
            text: lines.slice(k, cuoi + 1).join("\n"),
            indent: (lines[k].match(/^\s*/) ?? [""])[0].length,
          };
          khoaDung = khoa;
        }
      }

      // CHỐT 2 — slide câu hỏi đã có hình đó rồi thì bỏ qua (chạy lại vẫn an toàn).
      if (
        khoaDung &&
        lines.slice(dauQ, cuoiQ + 1).some((l) => moKhoi(khoaDung).test(l))
      ) {
        soBo++;
        continue;
      }
      if (!hinh)
        throw new Error("không thấy khối hình nào trước slide câu hỏi");

      let iContent = -1;
      for (let k = dauQ; k <= cuoiQ; k++)
        if (
          new RegExp(`^\\s*${q("content")}\\s*:\\s*\\{\\s*$`).test(lines[k])
        ) {
          iContent = k;
          break;
        }
      if (iContent < 0)
        throw new Error("slide câu hỏi không có content dạng khối");
      const cuoiContent = cuoiKhoi(lines, iContent);
      const indent = (lines[iContent].match(/^\s*/) ?? [""])[0].length + 2;
      // Dịch CẢ khối theo hiệu số thụt lề — không đặt thụt lề cứng cho mọi dòng, vì như vậy
      // là làm phẳng cấu trúc bên trong khối (đã mắc: khối hình mất hết thụt lề).
      const lech = Math.max(0, indent - hinh.indent);
      const dongHinh = hinh.text
        .split("\n")
        .map((t) => (t.trim() === "" ? t : " ".repeat(lech) + t));
      const iTruoc = cuoiContent - 1;
      const coPhay = /,\s*$/.test(lines[iTruoc]);
      console.log(
        `  ${nhan}: chèn "${khoaDung}" (${dongHinh.length} dòng) vào slide câu hỏi`,
      );
      if (!GHI) continue;
      // ⚠️ Dòng cuối phải được THAY (thêm phẩy), không được chèn lại — chèn lại làm dòng đó
      // xuất hiện HAI lần; nếu đó là phần tử mảng thì thành lỗi cú pháp "Unexpected string".
      const moi = [
        ...lines.slice(0, iTruoc),
        coPhay ? lines[iTruoc] : lines[iTruoc].replace(/\s*$/, "") + ",",
        ...dongHinh,
        ...lines.slice(cuoiContent),
      ];
      lines.length = 0;
      lines.push(...moi);
      soCa++;
    } catch (e) {
      canhBao.push(`${nhan}: ${e.message}`);
    }
  }
  if (GHI && soCa) {
    copyFileSync(f, f + ".bak");
    writeFileSync(f, lines.join("\n"), "utf8");
  }
}

if (canhBao.length) {
  console.log(`\n⚠️ ${canhBao.length} ca không xử lý được:`);
  for (const c of canhBao) console.log("   · " + c);
}
console.log(
  `\n${GHI ? "Đã chèn" : "Sẽ chèn"} hình vào ${soCa} slide · bỏ qua ${soBo} slide đã có hình.`,
);

if (!GHI) process.exit(0);

// ── Đọc lại TỪNG file để chắc còn hợp lệ; hỏng thì khôi phục từ .bak ──────────
let hong = 0;
for (const [f] of theoFile) {
  if (!existsSync(f + ".bak")) continue;
  try {
    const m = await import(
      pathToFileURL(path.resolve(f)).href + "?t=" + Date.now()
    );
    // Tên export và HÌNH DẠNG khác nhau: file cấp LỚP có `chapters`, file cấp CHƯƠNG có
    // `lessons` ⇒ nhận cả hai, đừng đòi `chapters` (đã mắc: báo HỎNG oan cho cả loạt file lành).
    if (!Object.values(m).some((x) => x?.chapters || x?.lessons))
      throw new Error("không thấy chapters/lessons");
    console.log(`  ✓ đọc lại ${f}: hợp lệ`);
  } catch (e) {
    // Giữ lại bản HỎNG để soi nguyên nhân trước khi khôi phục (xoá tay sau khi xem xong).
    copyFileSync(f, f + ".hong");
    copyFileSync(f + ".bak", f);
    console.error(
      `  ✗ ${f} HỎNG sau khi ghi ⇒ đã khôi phục từ .bak. Lỗi: ${e.message}`,
    );
    hong++;
  }
}
process.exit(hong ? 1 : 0);
