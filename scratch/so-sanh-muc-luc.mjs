/**
 * SO MỤC LỤC SGK ↔ APP cho một lớp: tìm BÀI CÒN THIẾU (nhóm lỗi A).
 *
 * VÌ SAO: quy trình §11 của kế hoạch đòi bảng ánh xạ trang → bài, nhưng việc rà từng ảnh cho
 * 4 lớp là rất nặng. Bước rẻ mà bắt được lỗi NẶNG NHẤT (thiếu cả một bài) là so MỤC LỤC:
 *   • SGK: các dòng “Bài <số>. <tên bài>” trong file OCR (docs/Data Source/Grade N/*.md)
 *   • App: tiêu đề từng bài trong `client/src/data/gradeN/gNcM.js`
 * rồi soi theo TỪ KHOÁ: bài SGK nào có từ khoá không xuất hiện ở tiêu đề/mô tả bài nào của app.
 *
 * ⚠️ OCR có thể sai dấu/chữ; kết quả chỉ để CHỈ ĐIỂM cần mở ảnh xem lại, không phải kết luận.
 * Chạy: `node scratch/so-sanh-muc-luc.mjs <lớp> [--het]`
 */
import { readFileSync, readdirSync } from "node:fs";

const lop = Number(process.argv[2] ?? 2);
const het = process.argv.includes("--het");

const NGUON_SGK = {
  1: ["Math grade 1 part 1.md", "Math grade 1 part 2.md"],
  2: ["Math grade 2 part 1.md", "Math grade 2 part 2.md"],
  3: ["Math grade 3 part 1.md", "Math grade 3 part 2.md"],
  4: ["Math grade 4.md"],
  5: ["Math grade 5.md"],
};

const boDau = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

// ---- 1. Mục lục SGK ----
const sgk = [];
for (const f of NGUON_SGK[lop] ?? []) {
  const t = readFileSync(`docs/Data Source/Grade ${lop}/${f}`, "utf8");
  for (const l of t.split(/\r?\n/)) {
    const m = l.match(/b[aà]i\s*(\d{1,2})\s*[.:]\s*([^\n]{4,70})/i);
    if (!m) continue;
    const ten = m[2]
      .replace(/[|*_`]/g, "")
      // OCR dính SỐ TRANG vào cuối tiêu đề ("... 110", "... 13ó") ⇒ cắt đuôi số/rác
      .replace(/[\s.·-]*[0-9]{2,4}\s*$/, "")
      .replace(/[\s.·-]*[0-9]{2,4}o?\s*$/i, "")
      .trim();
    if (!/[a-zA-ZÀ-ỹ]/.test(ten)) continue;
    sgk.push({ so: Number(m[1]), ten, file: f });
  }
}

// gộp trùng (mỗi bài in ở mục lục + đầu bài) và bỏ tên quá ngắn/rác
const thay = new Map();
for (const s of sgk) {
  const key = `${s.so}|${boDau(s.ten).slice(0, 18)}`;
  if (!thay.has(key)) thay.set(key, { ...s, soLan: 0 });
  thay.get(key).soLan += 1;
}
const mucLuc = [...thay.values()]
  .filter((s) => s.ten.split(" ").length >= 2)
  .sort((a, b) => a.so - b.so);

// ---- 2. Bài trong app ----
const dir = `client/src/data/grade${lop}`;
const files = readdirSync(dir)
  .filter((f) => /^g\d+c\d+\.js$/.test(f))
  .sort((a, b) => Number(a.match(/c(\d+)/)[1]) - Number(b.match(/c(\d+)/)[1]));

const baiApp = [];
for (const f of files) {
  const src = readFileSync(`${dir}/${f}`, "utf8");
  const chuong = (src.match(/name:\s*"([^"]+)"/) ?? [])[1] ?? f;
  for (const m of src.matchAll(
    /"?id"?:\s*"(g\d-c\d+-l\d+)"[\s\S]{0,220}?"?title"?:\s*"([^"]+)"/g,
  )) {
    baiApp.push({ id: m[1], title: m[2], chuong, file: f });
  }
}
console.log(
  `Lớp ${lop}: SGK có ${mucLuc.length} dòng mục lục · app có ${baiApp.length} bài.\n`,
);

// ---- 3. So theo TỪ KHOÁ ----
/** Từ khoá để soi: bỏ từ chung, giữ từ mang nội dung. */
const CHUNG = new Set(
  boDau(
    "bài học của một số các và với trong phạm vi đến về luyện tập chung ôn giải toán hình " +
      "đơn vị đo đại lượng số tự nhiên phép tính nhân chia cộng trừ tìm thành phần chưa biết " +
      "góc đường thẳng vuông song diện tích chu vi thể tích khối lượng thời gian",
  ).split(/\s+/),
);

const khoaCua = (s) =>
  // ⚠️ Tách theo MỌI ký tự không phải chữ/số — ĐỪNG để dấu phẩy trong lớp ký tự, nếu không
  // từ khoá sẽ dính dấu phẩy ("truoc,") và `includes` không bao giờ khớp (đã mắc: báo oan 20 ca).
  [
    ...new Set(
      boDau(s)
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 3 && !CHUNG.has(w)),
    ),
  ];

const corpusApp = boDau(
  baiApp.map((b) => `${b.title} ${b.chuong}`).join(" | "),
);

/**
 * ⚠️ LUẬT ĐÚNG (đã sửa một lần): SGK gộp NHIỀU chủ đề vào một tên bài ("Tia số. Số liền trước,
 * số liền sau"), còn app tách thành nhiều bài ⇒ đòi MỌI từ khoá nằm trong CÙNG MỘT bài là SAI
 * (báo oan 18 ca). Luật dùng: mỗi từ khoá chỉ cần xuất hiện ở ĐÂU ĐÓ trong app; chỉ khi KHÔNG
 * có chỗ nào nhắc tới nó mới là dấu hiệu **thiếu bài**.
 */
const thieu = [];
for (const s of mucLuc) {
  const kk = khoaCua(s.ten);
  if (!kk.length) continue;
  const vang = kk.filter(
    (k) => !corpusApp.includes(k.slice(0, Math.max(4, k.length - 2))),
  );
  if (vang.length) thieu.push({ ...s, vang: vang.join(" ") });
}

if (het) {
  console.log("— Mục lục SGK (theo thứ tự) —");
  for (const s of mucLuc)
    console.log(`  Bài ${String(s.so).padStart(2)}: ${s.ten}`);
  console.log("\n— Bài trong app —");
  for (const b of baiApp) console.log(`  ${b.id} · ${b.title}`);
}

console.log(
  `\n⚠️  ${thieu.length} dòng mục lục SGK có TỪ KHOÁ KHÔNG xuất hiện ở bất kỳ bài nào trong app:`,
);
for (const s of thieu)
  console.log(
    `  Bài ${String(s.so).padStart(2)}: ${s.ten}   [thiếu khoá: ${s.vang}]`,
  );
