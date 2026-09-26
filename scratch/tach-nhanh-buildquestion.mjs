// TÁCH CHUỖI NHÁNH CỦA `buildQuestion` THEO LỚP — đợt 3.3 (rủi ro cao nhất).
//
//   node scratch/tach-nhanh-buildquestion.mjs          # chạy thử, in báo cáo
//   node scratch/tach-nhanh-buildquestion.mjs --ghi    # ghi thật (tự sao lưu .bak)
//
// VÌ SAO PHẢI CẨN THẬN: `buildQuestion` là MỘT hàm 2 000 dòng, không phải nhiều khối rời,
// nên công cụ tách theo khối không dùng được. Ở đây ta cắt theo TỪNG NHÁNH `if (...)` ở cấp
// thụt lề của thân hàm, rồi gom theo LỚP (suy từ chính chuỗi điều kiện: `g1_…` -> lớp 1).
//
// LUẬT AN TOÀN:
//  • Chỉ nhận nhánh mà THÂN có `return` ở cấp ngoài cùng (nhánh rơi xuống dưới thì KHÔNG tách
//    được — tách là đổi hành vi) ⇒ báo và để nguyên tại chỗ.
//  • Nhánh `chung` (điều kiện không nêu lớp nào, ví dụ mê cung cho mọi lớp) GIỮ NGUYÊN trong
//    khung, đúng vị trí cũ.
//  • Thứ tự: trong mỗi lớp giữ nguyên thứ tự gốc; các lớp được gọi theo vị trí XUẤT HIỆN ĐẦU TIÊN.
//    (Điều kiện của các nhánh là mã topic RIÊNG THEO LỚP nên không chồng nhau.)
//  • Thước kiểm: `scratch/chup-mau-cau-hoi.mjs --so scratch/mau-truoc.json` phải báo 0 khác.

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { join } from "node:path";

const FILE = "client/src/utils/exerciseGenerator.js";
const OUT = "client/src/utils/exercises";
const GHI = process.argv.includes("--ghi");
const lines = readFileSync(FILE, "utf8").split(/\r?\n/);

// ── Bộ quét ngoặc (bỏ qua chuỗi + chú thích) ────────────────────────────────
function quetTu(start, { dungKhiDong = true } = {}) {
  let depth = 0,
    batDau = false,
    str = null,
    cmt = false,
    blk = false,
    dauTien = null;
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
      if ("{[(".includes(ch)) {
        depth++;
        batDau = true;
        if (dauTien === null) dauTien = k;
      } else if ("}])".includes(ch)) {
        depth--;
      }
    }
    cmt = false;
    if (batDau && depth === 0 && dungKhiDong)
      return { dau: dauTien ?? start, cuoi: k };
  }
  throw new Error("Không tìm thấy điểm đóng khối từ dòng " + (start + 1));
}

// ── Tìm hàm buildQuestion và các nhánh cấp thân hàm ────────────────────────
const iHam = lines.findIndex((l) => /^function buildQuestion\(/.test(l));
if (iHam < 0) throw new Error("Không thấy `function buildQuestion(`");
const than = quetTu(iHam);
const iThanDau = lines.findIndex((l, k) => k > iHam && /\{\s*$/.test(l));
const iThanCuoi = than.cuoi;

const nhanh = []; // { dau, cuoi, header, than, lop }
let k = iThanDau + 1;
let chuThich = [];
while (k < iThanCuoi) {
  const l = lines[k];
  const trong = l.trim();
  if (trong === "") {
    chuThich = [];
    k++;
    continue;
  }
  if (
    trong.startsWith("//") ||
    trong.startsWith("/*") ||
    trong.startsWith("*")
  ) {
    chuThich.push(k);
    k++;
    continue;
  }
  const m = /^(\s*)if \(/.test(l);
  if (!m) {
    // Câu lệnh khác ở cấp thân hàm (khai báo biến, khối mê cung viết dạng khác…) -> báo
    nhanh.push({
      dau: chuThich.length ? chuThich[0] : k,
      cuoi: k,
      laNhanh: false,
    });
    chuThich = [];
    // nhảy qua khối nếu có ngoặc
    if (/[{[\(]/.test(l) && !/;\s*$/.test(l)) {
      const b = quetTu(k);
      nhanh[nhanh.length - 1].cuoi = b.cuoi;
      k = b.cuoi + 1;
    } else k++;
    continue;
  }
  // Nhánh `if (...)` cấp thân hàm: header = từ dòng `if` tới dòng có `{` mở khối
  let h = k;
  while (h < iThanCuoi && !/\{\s*$/.test(lines[h])) h++;
  const header = lines.slice(k, h + 1).join("\n");
  const thanNhanh = quetTu(h);
  const thanText = lines.slice(h, thanNhanh.cuoi + 1);
  // Nhánh phải có `return` Ở BẤT KỲ CẤP NÀO bên trong (nhiều nhánh viết
  // `if (Math.random() > 0.5) { return A } else { return B }` ⇒ không có `return` cấp ngoài).
  const le = (lines[k].match(/^\s*/) ?? [""])[0].length;
  const coReturn = thanText.some((t) =>
    new RegExp(`^\\s{${le + 2}}return\\b`).test(t),
  );
  const coReturnSau = thanText.some((t) => /^\s+return\b/.test(t));
  const lop = [...header.matchAll(/g(\d)[_"]/g)].map((x) => Number(x[1]));
  const lopDuyNhat = [...new Set(lop)];
  nhanh.push({
    dau: chuThich.length ? chuThich[0] : k,
    cuoi: thanNhanh.cuoi,
    laNhanh: true,
    header,
    coReturn,
    coReturnSau,
    lop: lopDuyNhat,
  });
  chuThich = [];
  k = thanNhanh.cuoi + 1;
}

// ── Phân loại ───────────────────────────────────────────────────────────────
const theoNhom = new Map(); // "lop1".."lop5" | null(chung) -> [nhánh]
const khongTachDuoc = [];
const thuTuLop = [];
for (const n of nhanh) {
  if (!n.laNhanh) {
    khongTachDuoc.push(n);
    continue;
  }
  if (!n.coReturnSau || n.lop.length !== 1) {
    khongTachDuoc.push(n);
    continue;
  }
  const khoa = "lop" + n.lop[0];
  if (!theoNhom.has(khoa)) theoNhom.set(khoa, []);
  theoNhom.get(khoa).push(n);
  if (!thuTuLop.includes(khoa)) thuTuLop.push(khoa);
}

console.log(`${FILE}: hàm buildQuestion ở dòng ${iHam + 1}-${iThanCuoi + 1}`);
console.log(
  `  nhánh cắt được theo lớp: ` +
    [...theoNhom].map(([k, v]) => `${k}=${v.length}`).join(" · "),
);
console.log(`  nhánh GIỮ LẠI trong khung: ${khongTachDuoc.length}`);
for (const n of khongTachDuoc.slice(0, 40)) {
  console.log(
    `     · dòng ${n.dau + 1}: ${(lines[n.dau].trim() || lines[n.dau + 1]?.trim() || "").slice(0, 76)}`,
  );
}
const tongDong = [...theoNhom.values()]
  .flat()
  .reduce((s, n) => s + (n.cuoi - n.dau + 1), 0);
console.log(`  số dòng chuyển ra file lớp: ${tongDong}`);

if (!GHI) {
  console.log("\n(chạy thử — thêm --ghi để ghi thật)");
  process.exit(0);
}
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
copyFileSync(FILE, FILE + ".bak");

// ── Ghi file từng lớp ───────────────────────────────────────────────────────
const tenHam = (khoa) => "nhanh" + khoa[0].toUpperCase() + khoa.slice(1);
const thanFileGoc = lines.slice(0, iHam).join("\n");
const canImport = (text) => {
  const co = new Set(
    [...text.matchAll(/\b[A-Za-z_$][\w$]*\b/g)].map((x) => x[0]),
  );
  return co;
};

/** Tên do file helpers.js / topics.js cung cấp (để sinh import). */
const helpersCo = new Set();
const topicsCo = new Set();
for (const f of ["helpers", "topics"]) {
  const t = readFileSync(join(OUT, f + ".js"), "utf8");
  for (const m of t.matchAll(
    /^export (?:function|const) ([A-Za-z_$][\w$]*)/gm,
  )) {
    (f === "helpers" ? helpersCo : topicsCo).add(m[1]);
  }
}

const tenFileLop = new Map();
for (const [khoa, ds] of theoNhom) {
  const ten = "branchesLop" + khoa.replace("lop", "") + ".js";
  tenFileLop.set(khoa, ten);
  const than = ds
    .map((n) =>
      lines
        .slice(n.dau, n.cuoi + 1)
        .map((t) => t.replace(/^ {2}/, ""))
        .join("\n"),
    )
    .join("\n");
  const co = canImport(than);
  const tHelpers = [...helpersCo].filter((x) => co.has(x)).sort();
  const tTopics = [...topicsCo].filter((x) => co.has(x)).sort();
  const dong = [
    `// NHÁNH CỦA ${khoa.replace("lop", "LỚP ")} trong bộ sinh bài Luyện tập.`,
    `// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).`,
    ``,
  ];
  if (tTopics.length)
    dong.push(`import { ${tTopics.join(", ")} } from "./topics.js";`);
  if (tHelpers.length)
    dong.push(`import { ${tHelpers.join(", ")} } from "./helpers.js";`);
  dong.push(``);
  dong.push(
    `/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */`,
  );
  dong.push(
    `export function ${tenHam(khoa)}(topic, gNum, grade, depth, topicId, pickFromGrade) {`,
  );
  dong.push(than);
  dong.push(`  return null;`);
  dong.push(`}`);
  dong.push("");
  writeFileSync(join(OUT, ten), dong.join("\n"), "utf8");
  console.log(`  ✓ ${join(OUT, ten)}  (${ds.length} nhánh)`);
}

// ── Viết lại hàm buildQuestion: giữ phần đầu, gọi từng lớp ở vị trí cũ ──────
const dauHam = lines.slice(0, iThanDau + 1); // header + dòng `{`
const phanDau = lines.slice(iThanDau + 1, nhanh[0].dau); // khai báo gNum/topic… + chú thích
const conLai = [];
const daGoiLop = new Set();
for (const n of nhanh) {
  if (n.laNhanh && n.coReturnSau && n.lop.length === 1) {
    const khoa = "lop" + n.lop[0];
    if (daGoiLop.has(khoa)) continue; // các nhánh khác của lớp này đã nằm trong hàm lớp
    daGoiLop.add(khoa);
    conLai.push(
      `  const kq${khoa} = ${tenHam(khoa)}(topic, gNum, grade, depth, topicId, pickFromGrade);`,
    );
    conLai.push(`  if (kq${khoa}) return kq${khoa};`);
    continue;
  }
  conLai.push(lines.slice(n.dau, n.cuoi + 1).join("\n"));
}
const dongHam = [
  ...dauHam,
  ...phanDau,
  ...conLai,
  lines.slice(iThanCuoi, iThanCuoi + 1)[0], // dòng `}` đóng hàm
  // 🔴 PHẦN SAU buildQuestion PHẢI GIỮ NGUYÊN (generateQuestion, generateCalculation,
  // pickFromGrade, các dòng `export { ... } from` của đợt tách trước). Cắt mất phần này thì
  // app mất API công khai — đã mắc thật và bị `chup-mau-cau-hoi.mjs` bắt ngay.
  ...lines.slice(iThanCuoi + 1),
];
// Import các hàm lớp vào khung (chèn ngay sau khối import hiện có)
const viTriImport = lines.findIndex(
  (l, idx) =>
    idx > 0 &&
    /^import .*;\s*$/.test(l) === false &&
    idx > 0 &&
    l.trim() !== "" &&
    !l.startsWith("import") &&
    !l.startsWith("//") &&
    !l.startsWith("*") &&
    !l.startsWith("/*"),
);
const khung = dongHam.join("\n");
const themImport = [...daGoiLop]
  .sort()
  .map(
    (khoa) =>
      `import { ${tenHam(khoa)} } from "./exercises/${tenFileLop.get(khoa)}";`,
  )
  .join("\n");
const viTriChen = khung.indexOf("\n\n", khung.lastIndexOf("import "));
const khungSau =
  viTriChen > 0
    ? khung.slice(0, viTriChen) + "\n" + themImport + khung.slice(viTriChen)
    : khung;
writeFileSync(FILE, khungSau, "utf8");
console.log(`  ✓ ${FILE}  (còn ${khungSau.split("\n").length} dòng)`);
