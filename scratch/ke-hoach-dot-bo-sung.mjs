/**
 * KẾ HOẠCH THEO CHƯƠNG — gom "bài mỏng" lên theo TỪNG CHƯƠNG để chia đợt bổ sung.
 *
 * VÌ SAO CÓ FILE NÀY (2026-09-29): người dùng yêu cầu rà lại **từng bài từ lớp 1 đến lớp 5**.
 * `soat-bai-mong.mjs` cho biết BÀI nào mỏng, nhưng 469 bài rải rác thì không lập kế hoạch được;
 * đơn vị làm việc thật của repo là **một chương một file dữ liệu** (`gradeN/gNcM.js`) và một
 * lần dán seed. Nên phải gom lên cấp chương, xếp theo mức độ thiếu, thì mới biết làm đợt nào trước.
 *
 *   node scratch/ke-hoach-dot-bo-sung.mjs            # bảng xếp hạng chương
 *   node scratch/ke-hoach-dot-bo-sung.mjs --bai      # kèm danh sách bài mỏng của 8 chương đầu
 *
 * Chỉ ĐỌC dữ liệu.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

import { demHinh } from "../client/src/components/visuals/visualKeys.js";

const kemBai = process.argv.includes("--bai");
const TOI_THIEU = { slide: 8, hinh: 2, buoc: 1, chu: 700 };
const BUOC = /hàng đơn vị|hàng chục|hàng trăm|viết \d+ nhớ|mượn 1|hạ \d/;

const gomChu = (v, ra = []) => {
  if (typeof v === "string") ra.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, ra));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, ra));
  return ra;
};

const NGUON = [];
for (let n = 1; n <= 5; n++) {
  const m = await import(
    pathToFileURL(path.resolve(`client/src/data/grade${n}Data.js`)).href
  );
  const data = Object.values(m).find((v) => v && Array.isArray(v.chapters));
  NGUON.push([n, data]);
}

const doBai = (bai) => {
  const slides = bai.slides || [];
  const soChu = slides
    .map((s) => gomChu(s.content).join(" ").replace(/\s+/g, " ").length)
    .reduce((a, b) => a + b, 0);
  const hinh = slides.filter((s) => demHinh(s.content) > 0).length;
  const buoc = slides.filter(
    (s) => s.content?.cotTinh || BUOC.test(gomChu(s.content).join(" ")),
  ).length;
  const thieu = [];
  if (slides.length < TOI_THIEU.slide) thieu.push("slide");
  if (hinh < TOI_THIEU.hinh) thieu.push("hình");
  if (buoc < TOI_THIEU.buoc) thieu.push("bước");
  if (soChu < TOI_THIEU.chu) thieu.push("chữ");
  return { slide: slides.length, hinh, buoc, soChu, thieu };
};

const dong = [];
for (const [lop, data] of NGUON)
  for (const chuong of data.chapters || []) {
    const bais = (chuong.lessons || []).map((b) => ({ b, d: doBai(b) }));
    const mong = bais.filter((x) => x.d.thieu.length);
    dong.push({
      lop,
      id: chuong.id,
      ten: chuong.name,
      bai: bais.length,
      slide: bais.reduce((a, x) => a + x.d.slide, 0),
      mong: mong.length,
      thieuHinh: mong.filter((x) => x.d.thieu.includes("hình")).length,
      thieuBuoc: mong.filter((x) => x.d.thieu.includes("bước")).length,
      bais: mong,
    });
  }

const sapXep = [...dong].sort(
  (a, b) =>
    b.mong - a.mong || b.thieuBuoc - a.thieuBuoc || a.id.localeCompare(b.id),
);

console.log("CHƯƠNG DƯỚI KHUNG TỐI THIỂU — xếp theo số bài mỏng\n");
console.log(
  "chương".padEnd(12) +
    "bài".padStart(4) +
    "slide".padStart(7) +
    "mỏng".padStart(6) +
    "thiếu hình".padStart(11) +
    "thiếu bước".padStart(12) +
    "  tên chương",
);
for (const c of sapXep) {
  if (!c.mong) continue;
  console.log(
    c.id.padEnd(12) +
      String(c.bai).padStart(4) +
      String(c.slide).padStart(7) +
      String(c.mong).padStart(6) +
      String(c.thieuHinh).padStart(11) +
      String(c.thieuBuoc).padStart(12) +
      "  " +
      String(c.ten).slice(0, 46),
  );
}

const duChuan = dong.filter((c) => !c.mong);
console.log(
  `\nTỔNG: ${dong.length} chương · ${dong.reduce((a, c) => a + c.bai, 0)} bài · ` +
    `${dong.reduce((a, c) => a + c.slide, 0)} slide`,
);
console.log(
  `• ${sapXep.filter((c) => c.mong).length} chương còn bài mỏng (${dong.reduce((a, c) => a + c.mong, 0)} bài)`,
);
console.log(
  `• ${duChuan.length} chương ĐÃ đủ khung: ${duChuan.map((c) => c.id).join(", ") || "(chưa có)"}`,
);
console.log(
  `• Thiếu HÌNH nhiều nhất: ${[...dong]
    .sort((a, b) => b.thieuHinh - a.thieuHinh)
    .slice(0, 3)
    .map((c) => `${c.id}(${c.thieuHinh})`)
    .join(" · ")}`,
);

if (kemBai) {
  console.log("\n— 8 chương nhiều bài mỏng nhất: danh sách bài —");
  for (const c of sapXep.filter((x) => x.mong).slice(0, 8)) {
    console.log(`\n${c.id} — ${c.ten}`);
    for (const x of c.bais)
      console.log(
        `   ${x.b.id} · ${x.d.slide} slide · hình ${x.d.hinh} · bước ${x.d.buoc} · ${x.d.soChu} chữ · thiếu: ${x.d.thieu.join(", ")}`,
      );
  }
}
