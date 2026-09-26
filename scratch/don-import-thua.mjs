// DỌN IMPORT THỪA Ở CÁC FILE MỚI TÁCH.
//
//   node scratch/don-import-thua.mjs                 # chạy thử, chỉ in báo cáo
//   node scratch/don-import-thua.mjs --ghi           # ghi thật (tự sao lưu .bak)
//
// VÌ SAO CÓ FILE NÀY: công cụ tách file chép LẠI TOÀN BỘ khối import của file gốc sang từng file
// mới (cách đó cố ý — không bao giờ thiếu import), nên mỗi file mới mang theo nhiều import không
// dùng ⇒ ~360 cảnh báo `no-unused-vars`. Ở đây gỡ đúng những tên không xuất hiện trong thân file.
//
// LUẬT AN TOÀN:
//  • Chỉ soi TÊN ĐƯỢC IMPORT có xuất hiện trong thân file hay không (so theo từ, có `\b`).
//  • Import chỉ để lấy TÁC DỤNG PHỤ (`import "./x.css"`) thì GIỮ NGUYÊN, không bao giờ xoá.
//  • Chỉ gỡ khi tên KHÔNG xuất hiện ở đâu trong thân file; nếu còn nghi ngờ thì giữ.
//  • Ghi xong thì cổng + build + test + 2 phép thử hình phải xanh lại (chạy tay sau khi ghi).

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { join } from "node:path";

const GHI = process.argv.includes("--ghi");
const THU_MUC = [
  "client/src/pages/lesson",
  "client/src/components/visuals/geometry",
  "client/src/utils/exercises",
];

/** Một dòng `import` có thể trải nhiều dòng -> gom lại thành một chuỗi hoàn chỉnh. */
function tachKhoiImport(lines) {
  const ra = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (
      t === "" ||
      t.startsWith("//") ||
      t.startsWith("/*") ||
      t.startsWith("*")
    ) {
      i++;
      continue;
    }
    if (!t.startsWith("import ")) break;
    let j = i;
    while (j < lines.length && !/;\s*$/.test(lines[j])) j++;
    ra.push({ dau: i, cuoi: j, text: lines.slice(i, j + 1).join("\n") });
    i = j + 1;
  }
  const cuoiImport = ra.length ? ra[ra.length - 1].cuoi : -1;
  return { importList: ra, than: lines.slice(cuoiImport + 1).join("\n") };
}

/** Các tên ĐƯỢC RÀNG BUỘC bởi một câu import, kèm tên gốc để dựng lại câu rút gọn. */
function tenRangBuoc(text) {
  const ra = { default: null, named: [], sideEffect: false, source: "" };
  const m = /^import\s+([\s\S]*?)\s+from\s+["']([^"']+)["'];?\s*$/.exec(
    text.trim(),
  );
  if (!m) {
    if (/^import\s+["'][^"']+["'];?\s*$/.test(text.trim())) {
      ra.sideEffect = true;
      ra.source = /["']([^"']+)["']/.exec(text)[1];
      return ra;
    }
    return null; // dạng lạ -> không đụng tới
  }
  ra.source = m[2];
  let phan = m[1].trim();
  if (/^\{/.test(phan)) {
    // chỉ có named
  } else {
    const iNgoac = phan.indexOf("{");
    const ten = (iNgoac >= 0 ? phan.slice(0, iNgoac) : phan)
      .trim()
      .replace(/,$/, "")
      .trim();
    if (ten) ra.default = ten;
    if (iNgoac >= 0) phan = phan.slice(iNgoac);
    else phan = "";
  }
  const mNgoac = /\{([\s\S]*)\}/.exec(phan);
  if (mNgoac) {
    for (const phanTu of mNgoac[1].split(",")) {
      const t = phanTu.trim();
      if (!t) continue;
      const mm = /^([A-Za-z_$][\w$]*)(\s+as\s+([A-Za-z_$][\w$]*))?$/.exec(t);
      if (!mm) return null; // có gì lạ -> không đụng
      ra.named.push({ goc: mm[1], dung: mm[3] ?? mm[1] });
    }
  }
  return ra;
}

const dungTrongThan = (than, ten) =>
  new RegExp(`\\b${ten.replace(/\$/g, "\\$")}\\b`).test(than);

/** Bỏ chú thích trước khi soi tên: một tên CHỈ xuất hiện trong chú thích thì vẫn là import thừa.
 *  (Đã mắc thật ở `dayHinh.jsx`: `CARD_STYLE` chỉ được nhắc trong chú thích nên bị giữ lại.) */
const boChuThich = (t) =>
  t
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .split("\n")
    .map((l) => l.replace(/\/\/.*$/, ""))
    .join("\n");

/** `".././x"` là đường dẫn hợp lệ nhưng khó đọc — bỏ đoạn `./` thừa cho sạch.
 *  AN TOÀN: chỉ xoá `./` khi nó đứng NGAY SAU một chuỗi `../` trở lên. */
const chuanDuongDan = (t) => t.replace(/(["'])((?:\.\.\/)+)(?:\.\/)+/g, "$1$2");

let tongGo = 0;
let tongFileSua = 0;
const baoCao = [];
const khongHieu = [];

// Chế độ soi MỘT file: in ra từng câu import và tên nào còn được dùng — dùng khi có file
// "lẽ ra phải dọn mà không được dọn".
const iSoi = process.argv.indexOf("--soi");
if (iSoi >= 0) {
  const duongSoi = process.argv[iSoi + 1];
  const linesSoi = readFileSync(duongSoi, "utf8").split(/\r?\n/);
  const { importList, than: thanGoc } = tachKhoiImport(linesSoi);
  const thanSoi = boChuThich(thanGoc);
  console.log(
    `${duongSoi}: ${importList.length} câu import · thân file ${thanSoi.split("\n").length} dòng`,
  );
  for (const cua of importList) {
    const tt = tenRangBuoc(cua.text);
    if (!tt) {
      console.log(`  [KHÔNG HIỂU] ${cua.text.split("\n")[0]}`);
      continue;
    }
    if (tt.sideEffect) {
      console.log(`  [tác dụng phụ - giữ] ${tt.source}`);
      continue;
    }
    const d = tt.default
      ? `default=${tt.default}:${dungTrongThan(thanSoi, tt.default)}`
      : "";
    const n = tt.named
      .map((x) => `${x.dung}:${dungTrongThan(thanSoi, x.dung)}`)
      .join(" ");
    console.log(`  ${tt.source}  ${d}  ${n}`);
  }
  process.exit(0);
}

for (const dir of THU_MUC) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => /\.(js|jsx)$/.test(x))) {
    const duong = join(dir, f);
    const goc = readFileSync(duong, "utf8");
    const lines = goc.split(/\r?\n/);
    const { importList, than: thanGoc } = tachKhoiImport(lines);
    const than = boChuThich(thanGoc);
    const moi = [];
    let goFile = 0;
    for (const cua of importList) {
      const tt = tenRangBuoc(cua.text);
      if (!tt) {
        khongHieu.push(`${duong}: ${cua.text.split("\n")[0].slice(0, 70)}`);
        moi.push(cua.text);
        continue;
      }
      // Import chỉ để lấy TÁC DỤNG PHỤ (CSS, polyfill…) thì KHÔNG BAO GIỜ xoá.
      if (tt.sideEffect) {
        moi.push(cua.text);
        continue;
      }
      // Soi tên chỉ trong THÂN file (đã bỏ chú thích).
      const canDefault = tt.default && dungTrongThan(than, tt.default);
      const canNamed = tt.named.filter((n) => dungTrongThan(than, n.dung));
      if (!canDefault && !canNamed.length) {
        goFile += cua.cuoi - cua.dau + 1;
        continue;
      }
      const phan = [];
      if (canDefault) phan.push(tt.default);
      if (canNamed.length) {
        phan.push(
          "{\n" +
            canNamed
              .map((n) => (n.goc === n.dung ? n.goc : `${n.goc} as ${n.dung}`))
              .map((t) => "  " + t + ",")
              .join("\n") +
            "\n}",
        );
      }
      moi.push(`import ${phan.join(", ")} from "${tt.source}";`);
    }
    // 🔴 "Bớt vài tên trong một câu import nhiều tên" CŨNG là thay đổi — bản đầu tôi chỉ đếm
    // khi xoá CẢ câu, nên file chỉ cần bớt tên thì bị coi là "không có gì để dọn" và KHÔNG ghi
    // (đã mắc thật: `dayHinh.jsx` giữ nguyên 4 import thừa dù công cụ thấy rõ chúng không dùng).
    const coThayDoi =
      goFile > 0 || moi.join("\n") !== importList.map((c) => c.text).join("\n");
    if (coThayDoi) {
      tongGo += goFile;
      tongFileSua++;
      baoCao.push(
        `  ${duong}: ${goFile ? `bỏ ${goFile} dòng` : "bớt tên trong câu import"}`,
      );
      if (GHI) {
        copyFileSync(duong, duong + ".bak");
        const dauFile = lines.slice(0, importList[0]?.dau ?? 0);
        const sauImport = lines.slice(
          (importList[importList.length - 1]?.cuoi ?? -1) + 1,
        );
        const ra = [...dauFile, ...moi.map(chuanDuongDan), "", ...sauImport]
          .join("\n")
          .replace(/\n{3,}/g, "\n\n");
        writeFileSync(duong, ra, "utf8");
      }
    }
  }
}

console.log(`Dọn import thừa: ${tongFileSua} file · ${tongGo} dòng`);
for (const d of baoCao) console.log(d);
if (khongHieu.length) {
  console.log(
    `\nCâu import KHÔNG hiểu được (giữ nguyên, cần soi tay): ${khongHieu.length}`,
  );
  for (const k of khongHieu) console.log("   · " + k);
}
console.log(
  GHI
    ? "\nĐã ghi (mỗi file có .bak cạnh nó)."
    : "\n(chạy thử — thêm --ghi để ghi thật)",
);
