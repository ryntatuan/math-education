/**
 * ĐO CỠ CHỮ TRONG **MỌI LOẠI HÌNH** Ở APP THẬT, KHỔ ĐIỆN THOẠI.
 *
 * Cùng họ với `scratch/do-chu-hinh.mjs` (đồng hồ): người dùng báo chữ trong hình quá nhỏ.
 * Trang `scratch/visual-fit.html` đo chữ theo ĐƠN VỊ viewBox trong một thẻ mô phỏng; công cụ
 * này đo **px thật** trong app, nên bắt được cả trường hợp CSS ép nhỏ hình
 * (bài học đã gặp: `.clock-svg` bị ép 135px cho mọi cỡ).
 *
 * Chạy: `npm --prefix client run dev` rồi `node scratch/do-chu-hinh-moi-loai.mjs`
 * Chỉ xét slide KHÔNG phải câu hỏi (câu hỏi có hình thì đi qua được, nhưng để đo nhanh
 * và chắc, ta đi thẳng tới slide bằng cách bấm "Tiếp tục" — quiz bị khoá nút nên bỏ qua).
 */
import { chromium } from "playwright";

const PORT = process.env.PORT ?? "5174";
const BASE = `http://localhost:${PORT}`;
const NGUONG_PX = 12;
const { HINH_KEYS } =
  await import("../client/src/components/visuals/visualKeys.js");

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const KHOAS = [...HINH_KEYS, "items", "shape", "operation", "number"];
const canDo = new Map(); // khoá -> [{bai, index}]
for (const [file, key] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        if (s.type === "quiz") return;
        for (const k of KHOAS) {
          if (s.content?.[k] === undefined || s.content?.[k] === null) continue;
          if (!canDo.has(k)) canDo.set(k, []);
          const ds = canDo.get(k);
          if (ds.length < 2 && !ds.some((d) => d.bai === bai.id))
            ds.push({ bai: bai.id, index: i, tongSlide: bai.slides.length });
        }
      });
    }
  }
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const ketQua = [];
for (const [khoa, ca] of canDo) {
  for (const c of ca) {
    await page.goto(`${BASE}/lesson/${c.bai}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(800);
    let toiNoi = c.index === 0;
    for (let i = 0; i < c.index && !toiNoi; i++) {
      const next = await page.$('button:has-text("Tiếp tục")');
      if (!next || (await next.isDisabled())) break;
      await next.click();
      await page.waitForTimeout(500);
      if (i + 1 === c.index) toiNoi = true;
    }
    const doDuoc = await page.evaluate(() => {
      const the = document.querySelector(".lesson-slide") ?? document.body;
      const svgs = [...the.querySelectorAll("svg")];
      let nhoNhat = Infinity;
      let rong = 0;
      let nhan = "";
      for (const svg of svgs) {
        const b = svg.getBoundingClientRect();
        if (b.width > rong) rong = b.width;
        for (const t of svg.querySelectorAll("text")) {
          const tb = t.getBoundingClientRect();
          if (tb.height && tb.height < nhoNhat) {
            nhoNhat = tb.height;
            nhan = (t.textContent || "").slice(0, 14);
          }
        }
      }
      return {
        soSvg: svgs.length,
        rongLonNhat: +rong.toFixed(1),
        nhoNhat: nhoNhat === Infinity ? null : +nhoNhat.toFixed(1),
        nhan,
        tranNgang: the.scrollWidth > the.clientWidth + 1,
      };
    });
    ketQua.push({ khoa, ...c, co: toiNoi, ...doDuoc });
  }
}

let loi = 0;
console.log("khoá hình          bài        #slide  svg  rộng   chữ nhỏ nhất");
for (const k of ketQua) {
  if (!k.co) {
    console.log(
      `   ${k.khoa.padEnd(16)} ${k.bai} #${k.index + 1}  ⏭ không tới được (quiz chắn)`,
    );
    continue;
  }
  const xau = (k.nhoNhat !== null && k.nhoNhat < NGUONG_PX) || k.tranNgang;
  if (xau) loi += 1;
  console.log(
    `${xau ? "❌" : "✅"} ${k.khoa.padEnd(16)} ${k.bai.padEnd(10)} #${String(k.index + 1).padStart(2)}  ${String(k.soSvg).padStart(3)}  ${String(k.rongLonNhat).padStart(5)}  ${String(k.nhoNhat ?? "-").padStart(5)} ${k.nhan}${k.tranNgang ? " ⚠️ tràn ngang" : ""}`,
  );
}
console.log(
  `\nĐã đo ${ketQua.filter((k) => k.co).length} slide · ${loi} ca chữ < ${NGUONG_PX}px hoặc tràn ngang.`,
);
await browser.close();
process.exit(loi ? 1 : 0);
