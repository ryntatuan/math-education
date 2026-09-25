/**
 * ĐO CÂN ĐỐI giữa ĐỀ BÀI (hình) và DÃY NÚT CHỌN — chạy trong APP THẬT, khổ 390 px.
 *
 * 🔴 VÌ SAO CÓ: người dùng gửi ảnh slide đặt tính (2026-09-26) — “danh sách số để chọn đang quá
 * lớn, trong khi đề bài quá nhỏ, nhìn quá xấu và không cân đối”. Nguyên nhân: `FillBar` luôn vẽ
 * nút 58×50 chữ 24, hợp với 3 dấu `> < =` nhưng với bàn phím **0–9** thì nút to hơn cả đề bài.
 *
 * Công cụ này đo cho MỌI dạng hình tương tác (`cotTinh`, `bangTinh`, `patternRow`, `numberScene`):
 *   • chiều cao HÌNH (đề bài) và chiều cao KHỐI NÚT CHỌN (tiêu đề + nút + tiến độ + “Làm lại”)
 *   • các ô bấm được TRONG hình và nút chọn: có đạt **44 px** vùng chạm không
 *   • CẢNH BÁO khi khối nút CAO HƠN hình (nút “nuốt” đề bài) hoặc vùng chạm < 44 px
 *
 * ⚠️ ĐÃ SỬA MỘT LUẬT SAI: lần đầu tôi so “nút ÷ cỡ chữ trong hình” và lấy ngưỡng 1,6 ⇒
 * báo oan hàng loạt, vì nút 44–50 px là **sàn vùng chạm** chứ không phải “quá to”. Cái người
 * dùng nhìn thấy là **khối nút chiếm nửa màn hình trong khi đề bài bé tí** — nên luật đúng là
 * so CHIỀU CAO KHỐI so với CHIỀU CAO HÌNH.
 *
 * Chạy: `npm --prefix client run dev` rồi `node scratch/do-can-doi-hinh.mjs`  (PORT mặc định 5174)
 */
import { chromium } from "playwright";

const PORT = process.env.PORT ?? "5174";
const BASE = `http://localhost:${PORT}`;
const NGUONG_CHAM = 44; // px — vùng chạm tối thiểu cho trẻ
const NGUONG_CAO_HON = 1.15; // khối nút cao hơn hình quá mức ⇒ mất cân đối

const KHOAS = ["cotTinh", "bangTinh", "patternRow", "numberScene"];
const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const canh = new Map();
for (const [file, key] of NGUON) {
  const mod = await import(new URL(`../client/src/data/${file}`, import.meta.url));
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        if (!["story", "concept", "visual"].includes(s.type)) return;
        for (const k of KHOAS) {
          if (s.content?.[k] === undefined || s.content?.[k] === null) continue;
          if (!canh.has(k)) canh.set(k, []);
          const ds = canh.get(k);
          if (ds.length < 3 && !ds.some((d) => d.bai === bai.id))
            ds.push({ bai: bai.id, index: i });
        }
      });
    }
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const ketQua = [];

for (const [khoa, ca] of canh) {
  for (const c of ca) {
    await page.goto(`${BASE}/lesson/${c.bai}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(700);
    let toi = c.index === 0;
    for (let i = 0; i < c.index; i++) {
      const next = await page.$('button:has-text("Tiếp tục")');
      if (!next || (await next.isDisabled())) break;
      await next.click();
      await page.waitForTimeout(450);
      if (i + 1 === c.index) toi = true;
    }
    if (!toi) {
      ketQua.push({ khoa, ...c, toi: false });
      continue;
    }
    const doDuoc = await page.evaluate(() => {
      const the = document.querySelector(".slide-visual-card") ?? document.body;
      // hình chính = svg nhiều <text> nhất
      const svgs = [...the.querySelectorAll("svg")];
      const hinh = svgs.length
        ? svgs.reduce((a, b) =>
            b.querySelectorAll("text").length > a.querySelectorAll("text").length
              ? b
              : a,
          )
        : null;
      const chuDeBai = hinh
        ? [...hinh.querySelectorAll("text")].map((t) =>
            +t.getBoundingClientRect().height.toFixed(1),
          )
        : [];
      // ô bấm được TRONG hình (rect có viền đứt = ô “?”)
      const oTrong = hinh
        ? [...hinh.querySelectorAll("rect[stroke-dasharray]")].map((r) => {
            const b = r.getBoundingClientRect();
            return { w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
          })
        : [];
      // nút chọn của FillBar
      const nut = [...the.parentElement.querySelectorAll("button")]
        .filter((b) => /^Chọn /.test(b.getAttribute("aria-label") || ""))
        .map((b) => {
          const r = b.getBoundingClientRect();
          return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
        });
      return {
        soChu: chuDeBai.length,
        deBai: chuDeBai.length ? Math.max(...chuDeBai) : null,
        caoHinh: hinh
          ? +hinh.getBoundingClientRect().height.toFixed(1)
          : null,
        oTrong,
        nut,
        // khối nút = từ mép trên nút đầu đến mép dưới phần tử cuối trong hàng nút
        caoKhoiNut: nut.length
          ? (() => {
              const rs = [...the.parentElement.querySelectorAll("button")]
                .filter((b) => /^Chọn /.test(b.getAttribute("aria-label") || ""))
                .map((b) => b.getBoundingClientRect());
              const tren = Math.min(...rs.map((r) => r.top));
              const duoi = Math.max(...rs.map((r) => r.bottom));
              // cộng cả dòng tiến độ / “Làm lại” nằm cạnh nút
              return +(duoi - tren).toFixed(1) + 60;
            })()
          : 0,
      };
    });
    ketQua.push({ khoa, ...c, toi: true, ...doDuoc });
  }
}

let loi = 0;
console.log(
  "khoá        bài        #slide  chữ đề  hình(cao)  nút(cao)  ô? nhỏ nhất  ghi chú",
);
for (const k of ketQua) {
  if (!k.toi) {
    console.log(`   ${k.khoa.padEnd(11)} ${k.bai} #${k.index + 1}  ⏭ không tới được`);
    continue;
  }
  const nutCao = k.nut.length ? Math.max(...k.nut.map((n) => n.h)) : null;
  const nutNho = k.nut.length
    ? Math.min(...k.nut.map((n) => Math.min(n.w, n.h)))
    : null;
  const oNho = k.oTrong.length
    ? Math.min(...k.oTrong.map((o) => Math.min(o.w, o.h)))
    : null;
  const tiLeKhoi =
    k.caoHinh && k.caoKhoiNut
      ? +(k.caoKhoiNut / k.caoHinh).toFixed(2)
      : null;
  const vanDe = [];
  if (tiLeKhoi !== null && tiLeKhoi > NGUONG_CAO_HON)
    vanDe.push(`khối nút cao gấp ${tiLeKhoi}× hình`);
  if (nutNho !== null && nutNho < NGUONG_CHAM)
    vanDe.push(`nút ${nutNho}px < ${NGUONG_CHAM}`);
  if (oNho !== null && oNho < NGUONG_CHAM) vanDe.push(`ô? bấm chỉ ${oNho}px`);
  if (k.deBai !== null && k.deBai < 12) vanDe.push(`chữ đề bài ${k.deBai}px`);
  if (vanDe.length) loi += 1;
  console.log(
    `${vanDe.length ? "❌" : "✅"} ${k.khoa.padEnd(11)} ${k.bai.padEnd(10)} #${String(k.index + 1).padStart(2)}  ${String(k.deBai ?? "-").padStart(6)}  ${String(k.caoHinh ?? "-").padStart(9)}  ${String(k.caoKhoiNut ?? "-").padStart(8)}  ${String(oNho ?? "-").padStart(12)}  ${vanDe.join(" · ")}`,
  );
}
console.log(
  `\nĐã đo ${ketQua.filter((k) => k.toi).length} slide tương tác · ${loi} ca cần sửa.`,
);
await browser.close();
process.exit(loi ? 1 : 0);
