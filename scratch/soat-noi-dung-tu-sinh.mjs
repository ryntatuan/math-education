/**
 * SOÁT LỖI NỘI DUNG TỰ SINH — so bản HIỆN TẠI với bản GỐC trong git (HEAD).
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (người dùng báo 2026-09-29, kèm 3 ảnh):
 *   (1) bài "Tiết học đầu tiên" (Lớp 1 · Chủ đề 1 · bài 1) — **chưa học số nào** mà đã có câu hỏi
 *       “Số nào LỚN NHẤT trong các số 1, 6, 7?” và “Số liền sau của số 1 là số nào?”;
 *   (2) slide “So sánh và đọc số cho nhanh” nói **“đếm số chữ số”** với hai số MỘT chữ số, và ví dụ
 *       “6 > 1 vì so từng hàng từ trái, hàng đầu khác nhau đã quyết định” — tối nghĩa với trẻ.
 *   HAI LỖI NÀY KHÔNG PHẢI CÁ NHÂN: chúng là lỗi của KHUÔN sinh nội dung, nên phải soi bằng máy trên
 *   cả 5 lớp, đối chiếu với BẢN GỐC (trước khi sinh) để biết bài nào bị thêm nội dung NGOÀI PHẠM VI,
 *   SAI MỨC ĐỘ, hoặc SAI CHỮ.
 *
 * Cách làm: `git show HEAD:<file>` lấy bản gốc → cắt đoạn của từng bài theo `id` → so với bản hiện tại.
 *
 *   node scratch/soat-noi-dung-tu-sinh.mjs            # in danh sách ca nghi lỗi
 *   node scratch/soat-noi-dung-tu-sinh.mjs --het      # in thêm số liệu từng nhóm
 *
 * Chỉ ĐỌC dữ liệu — không sửa gì.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const HET = process.argv.includes("--het");

/** Dấu nhận biết một khối do máy sinh. */
const DAU = [
  ["đặt-tính", "Bé tự đặt tính"],
  ["so", "So sánh và đọc số cho nhanh"],
  ["hinh", "Đặc điểm của "],
  ["do", "Bậc thang đơn vị đo"],
  ["bang", "Cách thuộc "],
  ["thongke", "Cách đọc bảng số liệu"],
  ["phan", "Đọc và hiểu phân số"],
  ["bon-buoc", "Bốn bước làm một bài toán"],
  ["ba-buoc", "Ba bước làm bài"],
  ["tia-so", "Cách nhẩm nhanh cho"],
  ["tia-so-tru", "Cách 2 cho"],
];

const NHOM_CHU = {
  so: /số|đọc|viết|so sánh|liền trước|liền sau|cấu tạo|các số/i,
  hinh: /hình|khối|góc|cạnh|đỉnh|điểm|đoạn thẳng|đường thẳng|diện tích|chu vi|thể tích/i,
  do: /cm|dm|km|mét|kg|gam|tấn|tạ|yến|lít|ml|giờ|phút|giây|đồng|m²|m³|đo|đơn vị|ngày|tuần|tháng|năm|thế kỉ|lịch|tiền/i,
  bang: /bảng nhân|bảng chia|nhân|chia/i,
  thongke: /bảng|số liệu|thống kê|biểu đồ|kiểm đếm|lần lặp lại|tỉ số/i,
  phan: /phân số|tử số|mẫu số/i,
};

/**
 * BÀI “ĐỊNH HƯỚNG” — chỉ tính bài MỞ ĐẦU thật sự (chưa dạy kiến thức nào).
 * ⚠️ Bản trước để lọt “trò chơi”, “ôn tập”, “chuẩn bị” ⇒ báo oan cả “Luyện tập chung”.
 */
const BAI_DINH_HUONG =
  /tiết học đầu tiên|giới thiệu sách|làm quen với sách|đồ dùng học toán|ý nghĩa của các biểu tượng/i;

/** Lỗi chữ hay gặp trong nội dung máy sinh. */
const LOI_CHU = [
  [/có không có/i, "“có không có” — lặp phủ định"],
  [/có có\b/i, "“có có” — lặp từ"],
  [/\b(của|và|với|thì|là) \1\b/i, "lặp từ nối"],
  [/…/, "dấu “…” (bị cổng ô trống coi là ô trống)"],
  [/hàng đầu khác nhau đã quyết định/i, "câu tối nghĩa (người dùng đã báo)"],
  /**
   * Khoảng trắng đôi: chỉ soi trong CÂU CÓ DẤU HIỆU DO MÁY SINH (“Bé…”, “Bước…”, “hình…”, “bảng…”).
   * ⚠️ Bản trước soi mọi chuỗi trong vùng lân cận ⇒ bắt luôn **450 ca của bài gốc** (ví dụ dòng
   * “🏠 → 1 hình tam giác (mái)\n     1 hình chữ nhật (thân)” — khoảng trắng để căn lề, không phải lỗi).
   * Cảnh báo giả nhiều thì người ta bỏ qua công cụ.
   */
  [
    /(?:Bé|bé|Bước|bước|con số|hình|khối|bảng)[^"]{0,60}  \S/,
    "khoảng trắng đôi trong câu máy sinh",
  ],
  [/,\s*,/, "dấu phẩy đôi"],
];

const doc = (f) => fs.readFileSync(f, "utf8");
const bangGoc = new Map();

function gocCua(file) {
  if (bangGoc.has(file)) return bangGoc.get(file);
  let chu = "";
  try {
    chu = execSync(`git show HEAD:${file}`, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch {
    chu = "";
  }
  bangGoc.set(file, chu);
  return chu;
}

/** Cắt đoạn của một bài trong file chữ (từ `id` của bài tới `id` bài kế tiếp). */
function doanBai(chu, id) {
  const i = chu.search(new RegExp(`(?:"id"|id):\\s*"${id}"`));
  if (i < 0) return "";
  const sau = chu.slice(i + 10);
  const j = sau.search(/^\s{6}(?:"id"|id):\s*"g\d-c\d+-l\d+"/m);
  return sau.slice(0, j < 0 ? undefined : j);
}

const files = [];
for (let n = 1; n <= 5; n += 1) {
  const dir = `client/src/data/grade${n}`;
  for (const ten of fs.readdirSync(dir))
    if (ten.endsWith(".js") && ten.startsWith(`g${n}c`))
      files.push(path.join(dir, ten).replace(/\\/g, "/"));
}

const ca = {
  ngoaiPhamVi: [],
  saiMucDo: [],
  loiChu: [],
  dinhHuong: [],
  deTai: [],
};
let soBaiCoSinh = 0;
let soBai = 0;

for (const file of files) {
  const hienTai = doc(file);
  const goc = gocCua(file);
  for (const m of hienTai.matchAll(/(?:"id"|id):\s*"(g\d-c\d+-l\d+)"/g)) {
    const id = m[1];
    soBai += 1;
    const baiHienTai = doanBai(hienTai, id);
    const baiGoc = doanBai(goc, id);
    if (!baiGoc) continue;
    const nhomSinh = DAU.filter(([, d]) => baiHienTai.includes(d)).map(
      ([k]) => k,
    );
    if (!nhomSinh.length) continue;
    soBaiCoSinh += 1;

    const tieuDe =
      (baiHienTai.match(/(?:"title"|title):\s*"([^"]*)"/) ?? [])[1] ?? "";
    // Chỉ soi TIÊU ĐỀ + MÔ TẢ của bài gốc (không lấy cả đoạn văn để tránh báo oan).
    const moTaGoc =
      (baiGoc.match(/(?:"description"|description):\s*"([^"]*)"/) ?? [])[1] ??
      "";
    const laDinhHuong = BAI_DINH_HUONG.test(`${tieuDe} ${moTaGoc}`);
    if (laDinhHuong)
      ca.dinhHuong.push(`${id} · ${tieuDe} · khối: ${nhomSinh.join(", ")}`);

    // Nội dung sinh ra có nói về chủ đề KHÔNG có trong bài gốc?
    for (const nhom of nhomSinh) {
      const re = NHOM_CHU[nhom];
      if (!re || nhom === "bon-buoc") continue;
      if (!re.test(baiGoc))
        ca.ngoaiPhamVi.push(
          `${id} · ${tieuDe} · khối “${nhom}” nhưng bài gốc KHÔNG nhắc tới`,
        );
    }

    // Sai mức độ: bài toàn số MỘT chữ số mà vẫn dạy “đếm số chữ số / so từng hàng”.
    if (nhomSinh.includes("so")) {
      const soTrongBai = [...baiGoc.matchAll(/\d+/g)].map((x) => Number(x[0]));
      const lonNhat = soTrongBai.length ? Math.max(...soTrongBai) : 0;
      const coHangChuc =
        /chục|trăm|nghìn|so sánh|lớn hơn|bé hơn|liền trước|liền sau/i.test(
          baiGoc,
        );
      if (lonNhat <= 9 || !coHangChuc)
        ca.saiMucDo.push(
          `${id} · ${tieuDe} · khối “so” nhưng bài chỉ có số ≤ ${lonNhat}${coHangChuc ? "" : " và không nhắc so sánh"}`,
        );
    }

    // Lỗi chữ trong PHẦN MÁY SINH (chỉ soi câu có dấu của khuôn, để không báo lỗi của bài gốc).
    for (const [re, mo] of LOI_CHU) {
      for (const d of DAU) {
        if (!baiHienTai.includes(d[1])) continue;
        const i = baiHienTai.indexOf(d[1]);
        const vung = baiHienTai.slice(Math.max(0, i - 400), i + 2600);
        if (re.test(vung)) ca.loiChu.push(`${id} · ${tieuDe} · ${mo}`);
      }
    }
  }
}

const inNhom = (ten, arr) => {
  console.log(`\n=== ${ten} — ${arr.length} ca ===`);
  const dem = new Map();
  for (const x of arr) {
    const khoa = x.split(" · ")[2] ?? x;
    dem.set(khoa, (dem.get(khoa) ?? 0) + 1);
  }
  if (HET)
    for (const [k, v] of [...dem].sort((a, b) => b[1] - a[1]).slice(0, 15))
      console.log(`   ${v}× ${k}`);
  for (const x of arr.slice(0, HET ? 60 : 25)) console.log(`  · ${x}`);
  if (arr.length > (HET ? 60 : 25))
    console.log(`  … và ${arr.length - (HET ? 60 : 25)} ca nữa`);
};

console.log(`Đã soi ${soBai} bài · ${soBaiCoSinh} bài có nội dung máy sinh.`);
inNhom("A. BÀI ĐỊNH HƯỚNG (chưa học gì) MÀ ĐÃ CÓ NỘI DUNG SINH", ca.dinhHuong);
inNhom("B. NỘI DUNG SINH NGOÀI PHẠM VI BÀI", ca.ngoaiPhamVi);
inNhom("C. SAI MỨC ĐỘ (số một chữ số mà dạy so sánh theo hàng)", ca.saiMucDo);
inNhom("D. LỖI CHỮ", [...new Set(ca.loiChu)]);
