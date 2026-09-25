/**
 * ĐO CỠ CHỮ HÌNH **TRONG APP THẬT**, Ở KHỔ ĐIỆN THOẠI.
 *
 * VÌ SAO CÓ CÔNG CỤ NÀY: người dùng báo 2026-09-25 — “các số la mã trong đồng hồ quá nhỏ,
 * trẻ không thể thấy được” (bài `g3-c8-l5`). Nguyên nhân không nằm ở dữ liệu: CSS
 * `@media (max-width: 640px)` ép `.clock-svg` về **135px** cho MỌI cỡ ⇒ mặt đồng hồ
 * 220 đơn vị co còn 0,61 ⇒ chữ 11 đơn vị chỉ còn **~7px**.
 * Các bảng đo trước đây (`scratch/visual-fit.jsx`) KHÔNG thấy lỗi này vì nó không đo
 * hình “cũ” (`clock`, `number`, `operation`) và không chạy trong app.
 *
 * CÁCH CHẠY:
 *  1. `npm --prefix client run dev`   (lấy cổng, mặc định script dùng 5174 — đổi bằng PORT)
 *  2. `node scratch/do-chu-hinh.mjs`  (PORT=5173 node scratch/do-chu-hinh.mjs)
 *
 * Đo gì: với mỗi slide của mỗi bài CÓ mặt đồng hồ — cỡ svg thật (px), cỡ chữ nhỏ nhất /
 * lớn nhất trong svg (px, đo bằng `getBoundingClientRect()` — KHÔNG tính từ đơn vị viewBox),
 * và có tràn ngang thẻ slide hay không. Ngưỡng đọc được cho trẻ lớp 1: **>= 12 px**.
 */
import { chromium } from "playwright";

const PORT = process.env.PORT ?? "5174";
const BASE = `http://localhost:${PORT}`;
const NGUONG_PX = 12;

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

// ---- 1. Gom các bài có mặt đồng hồ (và biết đáp án từng câu hỏi để đi qua quiz) ----
const baiCoDongHo = [];
for (const [file, key] of NGUON) {
  const mod = await import(new URL(`../client/src/data/${file}`, import.meta.url));
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      const slides = bai.slides ?? [];
      if (!slides.some((s) => s.content?.clock)) continue;
      baiCoDongHo.push({
        id: bai.id,
        lop: ch.id?.split("-")[1] ?? "?",
        slides: slides.map((s) => ({
          type: s.type,
          answer: s.content?.answer,
          coClock: !!s.content?.clock,
        })),
      });
    }
  }
}
console.log(
  `Có ${baiCoDongHo.length} bài mang mặt đồng hồ. Ngưỡng đọc được: ${NGUONG_PX} px.\n`,
);

// ---- 2. Đo trong app thật ----
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const ketQua = [];
for (const bai of baiCoDongHo) {
  await page.goto(`${BASE}/lesson/${bai.id}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  for (let i = 0; i < bai.slides.length; i++) {
    const s = bai.slides[i];
    if (s.coClock) {
      const doDuoc = await page.evaluate(() => {
        const svg = document.querySelector(".clock-graphic-container svg");
        if (!svg) return null;
        const hop = svg.getBoundingClientRect();
        const chu = [...svg.querySelectorAll("text")].map((t) => {
          const b = t.getBoundingClientRect();
          return {
            t: t.textContent,
            cao: +b.height.toFixed(1),
          };
        });
        if (!chu.length) return { rong: hop.width, chu: [] };
        const cao = chu.map((c) => c.cao);
        const the = document.querySelector(".lesson-slide") ?? document.body;
        return {
          rong: +hop.width.toFixed(1),
          nhoNhat: Math.min(...cao),
          lonNhat: Math.max(...cao),
          nhanNhoNhat: chu.find((c) => c.cao === Math.min(...cao)).t,
          soNhan: chu.length,
          tranNgang: the.scrollWidth > the.clientWidth + 1,
        };
      });
      if (doDuoc)
        ketQua.push({ bai: bai.id, slide: i + 1, ...doDuoc });
    }

    // Đi tiếp: quiz thì phải bấm đúng đáp án trước (nút "Tiếp tục" bị khoá).
    if (s.type === "quiz" && s.answer !== undefined) {
      await page.evaluate((answer) => {
        const nut = [...document.querySelectorAll(".quiz-options button")].find(
          (b) => b.textContent.trim() === String(answer),
        );
        nut?.click();
      }, s.answer);
      await page.waitForTimeout(350);
    }
    const diTiep = await page.$('button:has-text("Tiếp tục")');
    if (diTiep && !(await diTiep.isDisabled())) {
      await diTiep.click();
      await page.waitForTimeout(550);
    }
  }
}

// ---- 3. Báo cáo ----
let loi = 0;
console.log("bài        slide  rộng  nhoNhat  lonNhat  nhãn nhỏ nhất");
for (const k of ketQua) {
  const canhBao = k.nhoNhat < NGUONG_PX || k.tranNgang;
  if (canhBao) loi += 1;
  console.log(
    `${canhBao ? "❌" : "✅"} ${k.bai.padEnd(10)} #${String(k.slide).padStart(2)}  ${String(k.rong).padStart(5)}  ${String(k.nhoNhat).padStart(6)}  ${String(k.lonNhat).padStart(6)}  ${k.nhanNhoNhat}${k.tranNgang ? "  ⚠️ tràn ngang" : ""}`,
  );
}
console.log(
  `\nĐã đo ${ketQua.length} slide có đồng hồ · ${loi} ca dưới ${NGUONG_PX}px hoặc tràn ngang.`,
);
await browser.close();
process.exit(loi ? 1 : 0);
