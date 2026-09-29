/**
 * ĐO ĐỘ “MỎNG” CỦA TỪNG BÀI HỌC — chỉ đọc, không sửa gì.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng báo 2026-09-29): *“1 chủ đề quan trọng như bài 1 chủ đề 4
 * lớp 2 mà phần học lại sơ sài vài slide, giải thích thì không rõ ràng”*. Trước khi sửa 489
 * bài thì phải biết bài nào mỏng, mỏng ở chỗ nào — nếu chỉ nhìn cảm tính thì sửa xong vẫn
 * không chứng minh được là đã đủ.
 *
 * Cách đo (mỗi bài một dòng):
 *   slide   — tổng số slide
 *   hinh    — số slide CÓ hình (đếm bằng `demHinh`, chính hàm app dùng để vẽ)
 *   buoc    — có slide chỉ TỪNG BƯỚC làm (cotTinh, hoặc chữ "hàng đơn vị/hàng chục…")
 *   chu     — tổng số ký tự DIỄN GIẢI (giải thích + quy tắc + các ý + lời giải hình)
 *   loai    — những loại slide đang thiếu so với khung tối thiểu
 *
 * Chạy: `node scratch/soat-bai-mong.mjs`  (thêm `--in` để in cả danh sách bài ĐỦ)
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

import { demHinh } from "../client/src/components/visuals/visualKeys.js";

const inCa = process.argv.includes("--in");

/** Khung tối thiểu của MỘT bài học (đủ để bé hiểu, chứ không phải chỉ đọc đáp án). */
const TOI_THIEU = {
  slide: 8,
  hinh: 2,
  buoc: 1,
  chu: 700,
};

const NGUON = [];
for (let n = 1; n <= 5; n++) {
  const m = await import(
    pathToFileURL(path.resolve(`client/src/data/grade${n}Data.js`)).href
  );
  const data = Object.values(m).find((v) => v && Array.isArray(v.chapters));
  if (!data) throw new Error(`grade${n}Data.js: không thấy mảng chapters`);
  NGUON.push([`Lớp ${n}`, data]);
}

/** Gom mọi chuỗi chữ của một slide để đếm độ dài diễn giải. */
function gomChu(v, ra = []) {
  if (typeof v === "string") ra.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, ra));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, ra));
  return ra;
}

/**
 * “CÓ CHỈ TỪNG BƯỚC” — KHÔNG chỉ là phép tính cột dọc.
 * 🔴 ĐÃ SỬA (2026-09-29): luật cũ chỉ nhận `cotTinh` và chữ “hàng đơn vị / viết N nhớ / mượn 1”
 * ⇒ **báo oan 220 bài** khái niệm (hình học, đo lường) dù các bài đó ĐÃ có slide chỉ cách làm
 * từng bước (“Bước 1 — đếm số chữ số…”, “Đi XUỐNG một bậc thì nhân…”, “Cách đổi…”). Thước sai
 * thì mọi kết luận sau đó đều sai — phải sửa thước trước.
 * Luật nay nhận: phép tính cột dọc, chỉ số bước tường minh (“bước 1/2/3”), và các câu chỉ quy trình.
 */
const BUOC =
  /hàng đơn vị|hàng chục|hàng trăm|viết \d+ nhớ|mượn 1|hạ \d|[Bb]ước \d|cách đổi|cách làm|đặt thước đúng vạch|đi xuống một bậc|tách số|đọc từ trái sang phải/i;
const loaiSlide = (s) => (s?.type ? String(s.type) : "?");

const ket = [];
let tong = { bai: 0, slide: 0, hinh: 0, buoc: 0, chu: 0 };

for (const [lop, data] of NGUON) {
  let c = { bai: 0, slide: 0, hinh: 0, buoc: 0, chu: 0 };
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      const slides = bai.slides || [];
      const chuCua = slides.map((s) => gomChu(s.content).join(" "));
      const soHinh = slides.filter((s) => demHinh(s.content) > 0).length;
      const soBuoc = slides.filter((s) => {
        const t = gomChu(s.content).join(" ");
        return s.content?.cotTinh || BUOC.test(t);
      }).length;
      const soChu = chuCua.reduce(
        (a, t) => a + t.replace(/\s+/g, " ").length,
        0,
      );
      const loai = new Set(slides.map(loaiSlide));

      const thieu = [];
      if (slides.length < TOI_THIEU.slide)
        thieu.push(`slide<${TOI_THIEU.slide}`);
      if (soHinh < TOI_THIEU.hinh) thieu.push("thiếu hình");
      if (soBuoc < TOI_THIEU.buoc) thieu.push("thiếu từng bước");
      if (soChu < TOI_THIEU.chu) thieu.push("diễn giải ngắn");
      if (!loai.has("quiz")) thieu.push("không có câu hỏi");
      if (!loai.has("summary")) thieu.push("không có tóm tắt");

      const r = {
        lop,
        id: bai.id,
        title: (bai.title || "").replace(/^Bài \d+:\s*/, ""),
        slide: slides.length,
        hinh: soHinh,
        buoc: soBuoc,
        chu: soChu,
        thieu,
      };
      ket.push(r);
      c.bai++;
      c.slide += r.slide;
      c.hinh += r.hinh;
      c.buoc += r.buoc;
      c.chu += r.chu;
      tong.bai++;
      tong.slide += r.slide;
      tong.hinh += r.hinh;
      tong.buoc += r.buoc;
      tong.chu += r.chu;
    }
  }
  const mong = ket.filter((r) => r.lop === lop && r.thieu.length);
  console.log(
    `${lop}: ${c.bai} bài · ${c.slide} slide · tb ${(c.slide / c.bai).toFixed(1)} slide/bài · ` +
      `${c.hinh} slide có hình · ${c.buoc} slide từng bước · tb ${Math.round(c.chu / c.bai)} ký tự/bài · ` +
      `MỎNG ${mong.length} bài`,
  );
}

const thieuTat = ket.filter((r) => r.thieu.length);
console.log(
  `\nTỔNG: ${tong.bai} bài · ${tong.slide} slide · ${thieuTat.length} bài dưới khung tối thiểu ` +
    `(slide≥${TOI_THIEU.slide} · hình≥${TOI_THIEU.hinh} · bước≥${TOI_THIEU.buoc} · chữ≥${TOI_THIEU.chu})`,
);

const demLy = new Map();
for (const r of thieuTat)
  for (const l of r.thieu) demLy.set(l, (demLy.get(l) || 0) + 1);
console.log(
  "Lý do thiếu:",
  [...demLy].map(([k, v]) => `${k}=${v}`).join(" · "),
);

console.log("\n— 25 bài mỏng nhất —");
for (const r of [...thieuTat]
  .sort((a, b) => a.slide - b.slide || a.chu - b.chu)
  .slice(0, 25))
  console.log(
    `${r.id} · ${r.slide} slide · hình ${r.hinh} · bước ${r.buoc} · ${r.chu} chữ · ${r.thieu.join(",")} · ${r.title.slice(0, 52)}`,
  );

if (inCa) {
  console.log("\n— bài ĐỦ khung —");
  for (const r of ket.filter((x) => !x.thieu.length))
    console.log(
      `${r.id} · ${r.slide} slide · hình ${r.hinh} · bước ${r.buoc} · ${r.chu} chữ`,
    );
}
