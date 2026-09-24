/**
 * TÁCH SLIDE CÓ NHIỀU HÌNH THÀNH NHIỀU SLIDE (mỗi slide MỘT hình).
 *
 * Vì sao: người dùng phản hồi 2026-09-24 — “quá nhiều hình trong 1 khung và thêm phần diễn giải
 * làm rối phần hiển thị”. Quy tắc chốt: **1 slide = 1 hình**, chữ mỗi slide ngắn.
 *
 * Cách làm (cố ý SURGERY trên chuỗi, không serialize lại file để không phá định dạng):
 *   1. Tìm mọi slide `type: "visual"`; đếm các mục con ở mức ngoài của `content`.
 *   2. Nếu có ĐÚNG 2 khoá hình: giữ hình ĐẦU ở slide cũ, chuyển hình CUỐI sang slide mới.
 *      Chữ: nếu `text` có nhiều dòng (`\n` trong nguồn) thì dòng đầu ở slide cũ, phần còn lại
 *      ở slide mới; nếu chỉ 1 dòng thì slide mới lấy nhãn của chính hình đó làm chữ.
 *   3. Sao lưu từng file vào `scratch/truoc-tach/<tên>.bak`, in báo cáo, rồi MỚI ghi.
 *   4. Đọc lại file sau khi ghi và tự kiểm: không còn slide `visual` nào có ≥ 2 hình.
 *
 *   node scratch/tach-slide-nhieu-hinh.mjs            (chạy thử, KHÔNG ghi)
 *   node scratch/tach-slide-nhieu-hinh.mjs --ghi      (ghi thật)
 */
import fs from "node:fs";
import path from "node:path";
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

const GHI = process.argv.includes("--ghi");
const DIR = "client/src/data";
const HINH = new Set([...HINH_KEYS, "planeShapes"]);

const files = [];
for (const d of fs.readdirSync(DIR)) {
  const p = path.join(DIR, d);
  if (!fs.statSync(p).isDirectory() || !/^grade\d$/.test(d)) continue;
  for (const f of fs.readdirSync(p))
    if (/^g\d+c\d+\.js$/.test(f)) files.push(path.join(p, f));
}

/** Tách khối thành các mục con mức ngoài cùng (bỏ qua dấu phẩy trong chuỗi / trong ngoặc). */
function tachMuc(s) {
  const muc = [];
  let i = 0;
  let bd = 0;
  let sau = false;
  let dau = null;
  let ngoac = 0;
  while (i < s.length) {
    const c = s[i];
    if (sau) {
      sau = false;
      i++;
      continue;
    }
    if (c === "\\") {
      sau = true;
      i++;
      continue;
    }
    if (dau) {
      if (c === dau) dau = null;
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      dau = c;
      i++;
      continue;
    }
    if (c === "{" || c === "[" || c === "(") ngoac++;
    else if (c === "}" || c === "]" || c === ")") ngoac--;
    else if (c === "," && ngoac === 0) {
      muc.push(s.slice(bd, i));
      bd = i + 1;
    }
    i++;
  }
  const cuoi = s.slice(bd);
  if (cuoi.trim()) muc.push(cuoi);
  return muc;
}

const khoaCua = (muc) => {
  const m = muc.match(/^\s*"?([A-Za-z_$][\w$]*)"?\s*:/);
  return m ? m[1] : "";
};

let tongTach = 0;
const baoCao = [];

for (const file of files) {
  const goc = fs.readFileSync(file, "utf8");
  /**
   * Loại slide được tách: **bài DẠY** (`visual` · `concept` · `story`).
   * 🔴 Vòng 1 tôi chỉ quét `visual` ⇒ **bỏ sót 23 slide** `concept`/`story` cũng mang 2 hình.
   * `quiz` / `summary` giữ nguyên (câu hỏi phải đi liền hình của nó).
   */
  const moc = [...goc.matchAll(/"?'?type'?"?\s*:\s*"(visual|concept|story)"/g)];
  if (moc.length === 0) continue;
  let ra = goc;
  let soLan = 0;
  // duyệt NGƯỢC để chỉ số không lệch
  for (let k = moc.length - 1; k >= 0; k--) {
    const iType = moc[k].index;
    const loai = moc[k][1];
    const iContent = ra.indexOf("{", ra.indexOf("content", iType));
    if (iContent < 0) continue;
    // khớp ngoặc của content
    let sau = false;
    let dau = null;
    let sau2 = false;
    let ngoac = 0;
    let iEnd = -1;
    for (let i = iContent; i < ra.length; i++) {
      const c = ra[i];
      if (sau) {
        sau = false;
        continue;
      }
      if (c === "\\") {
        sau = true;
        continue;
      }
      if (dau) {
        if (c === dau) dau = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        dau = c;
        continue;
      }
      if (c === "{") ngoac++;
      else if (c === "}") {
        ngoac--;
        if (ngoac === 0) {
          iEnd = i;
          break;
        }
      }
    }
    if (iEnd < 0) continue;
    void sau2;
    const than = ra.slice(iContent + 1, iEnd);
    const muc = tachMuc(than);
    const hinh = muc.filter((m) => HINH.has(khoaCua(m)));
    if (hinh.length !== 2) continue;

    // ranh giới cả slide: `{` trước `type`, và `},` sau content
    const iSlide = ra.lastIndexOf("{", iType);
    const iSlideEnd = ra.indexOf("}", iEnd + 1);
    /**
     * 🔴 DẤU PHẨY NGĂN CÁCH — chỉ “ăn” khi nó THỰC SỰ ở ngay sau slide.
     * Bản đầu tôi viết `indexOf(",", iSlideEnd)` ⇒ với slide CUỐI của mảng (không có dấu phẩy)
     * nó nhảy tới dấu phẩy ở tận bài sau và **xoá mất cả khối ở giữa**.
     */
    const iDuoi = ra[iSlideEnd + 1] === "," ? iSlideEnd + 1 : iSlideEnd;
    const sep = iDuoi === iSlideEnd + 1 ? "," : "";
    if (iSlide < 0 || iSlideEnd < 0) continue;

    const iText = muc.findIndex((m) => khoaCua(m) === "text");
    let mucA = muc.filter((m) => m !== hinh[1]);
    let mucB = [];
    if (iText >= 0) {
      const raw = muc[iText];
      const iCat = raw.indexOf("\\n");
      if (iCat > 0) {
        /**
         * Cắt tại `\n` ĐẦU TIÊN của chuỗi nguồn — KHÔNG escape lại, chỉ cần **đóng/mở đúng
         * loại nháy** của chuỗi cũ. Bản đầu tôi đoán nháy sai (chuỗi dùng `"` mà lại đóng
         * bằng `'`) ⇒ file thành `text: "34',` và Node báo `Invalid or unexpected token`.
         */
        const iHai = raw.indexOf(":");
        const iQ = Math.min(
          ...['"', "'"].map((q) => {
            const i = raw.indexOf(q, iHai);
            return i < 0 ? Infinity : i;
          }),
        );
        const q = raw[iQ];
        const dau =
          raw.slice(0, raw.match(/^\s*"?[A-Za-z_$][\w$]*"?\s*:/)[0].length) + q;
        const dong1 = raw.slice(0, iCat) + q;
        const dongSau = dau + raw.slice(iCat + 2);
        mucA = mucA.map((m) => (m === muc[iText] ? dong1 : m));
        mucB.push(dongSau);
      } else {
        const nhan = hinh[1].match(
          /"?(?:label|note)"?\s*:\s*("[^"]*"|'[^']*')/,
        );
        // KHÔNG để chữ rỗng (bộ kiểm nội dung đòi `text`): lấy nhãn của hình, không có thì
        // giữ nguyên câu cũ.
        mucB.push(
          muc[iText].replace(
            /:\s*("[^"]*"|'[^']*')/,
            (m0, cu) => `: ${nhan ? nhan[1] : cu}`,
          ),
        );
      }
    } else {
      /**
       * Slide KHÔNG có `text` = slide `concept` (nó dùng `badge`/`title`/`points`/`rule`).
       * ⇒ slide mới được **sao `badge`** và **đặt tiêu đề theo NHÃN của hình vừa chuyển**
       * (không bịa nội dung mới); không có nhãn thì dùng lại tiêu đề cũ.
       */
      const nhan =
        (hinh[1].match(/"?(?:label|title|formula)"?\s*:\s*"([^"]{3,90})"/) ||
          [])[1] || "";
      const oTieuDe = muc.find((m) => khoaCua(m) === "title");
      const tieuDeCu = oTieuDe
        ? (oTieuDe.match(/:\s*"([^"]*)"/) || [])[1] || ""
        : "";
      const badge = muc.find((m) => khoaCua(m) === "badge");
      if (badge) mucB.push(badge);
      mucB.push(
        `\n            title: ${JSON.stringify(nhan || tieuDeCu || "Hình minh hoạ")}`,
      );
    }
    mucB.push(hinh[1]);

    const dep = (ds) => ds.map((m) => m.replace(/\s+$/, "")).join(",");
    void sau2;
    const M = /^(\s*)/.exec(ra.slice(iSlide, iType) + "x")[1] || "        ";
    const khoiMoi =
      `{\n          type: "${loai}",\n          content: {${dep(mucA)}\n          },\n        },\n` +
      `        {\n          type: "${loai}",\n          content: {${dep(mucB)}\n          },\n        }${sep}`;
    void M;
    ra = ra.slice(0, iSlide) + khoiMoi + ra.slice(iDuoi + 1);

    const id =
      (ra.slice(0, iSlide).match(/"id":\s*"([^"]+)"/g) || []).pop() || "?";
    baoCao.push(
      `${path.basename(file)} · ${String(id).replace(/"id":\s*"|"/g, "")} — tách 2 hình: ${khoaCua(hinh[0])} | ${khoaCua(hinh[1])}`,
    );
    soLan++;
  }
  if (soLan > 0) {
    tongTach += soLan;
    if (GHI) {
      const thu = path.join("scratch", "truoc-tach");
      fs.mkdirSync(thu, { recursive: true });
      fs.writeFileSync(
        path.join(thu, path.basename(file) + ".bak"),
        goc,
        "utf8",
      );
      fs.writeFileSync(file, ra, "utf8");
      // TỰ KIỂM: đọc lại và đếm slide (mọi loại bài dạy) còn ≥ 2 hình
      const lai = fs.readFileSync(file, "utf8");
      const con = [
        ...lai.matchAll(/"?'?type'?"?\s*:\s*"(?:visual|concept|story)"/g),
      ].filter((m) => {
        const iC = lai.indexOf("{", lai.indexOf("content", m.index));
        let sau = false;
        let dau = null;
        let ngoac = 0;
        for (let i = iC; i < lai.length; i++) {
          const c = lai[i];
          if (sau) {
            sau = false;
            continue;
          }
          if (c === "\\") {
            sau = true;
            continue;
          }
          if (dau) {
            if (c === dau) dau = null;
            continue;
          }
          if (c === '"' || c === "'" || c === "`") {
            dau = c;
            continue;
          }
          if (c === "{") ngoac++;
          else if (c === "}" && --ngoac === 0) {
            const mucLai = tachMuc(lai.slice(iC + 1, i));
            return mucLai.filter((x) => HINH.has(khoaCua(x))).length >= 2;
          }
        }
        return false;
      }).length;
      if (con > 0)
        console.log(
          `  ⚠️ ${path.basename(file)}: còn ${con} slide bài dạy ≥ 2 hình`,
        );
    }
  }
}

console.log(baoCao.join("\n"));
console.log(
  `\nTỔNG slide đã tách: ${tongTach}${GHI ? "" : "  (chạy thử — chưa ghi gì; thêm --ghi để ghi)"}`,
);
