/**
 * KIỂM "Ô NHẤN MẠNH ⭐ BỊ ẨN KHI DANH SÁCH BÊN DƯỚI ĐÃ NÓI ĐỦ" — đo TRONG APP THẬT.
 *
 * Chạy: `node scratch/soat-an-o-nhan-manh.mjs`   (cần dev server ở PORT, mặc định 5174)
 *
 * VÌ SAO CẦN: `conceptSlide.jsx` có luật ẩn ô ⭐ (`showRule`), nhưng "đọc mã thấy đúng" KHÔNG
 * phải bằng chứng. Script này chia HAI VẾ (canary hai chiều — đúng quy ước của repo):
 *   (1) ca PHẢI ẨN  — dữ liệu có `rule` mà `points`/`steps` đã nói trọn ⇒ `.concept-rule-box` = 0
 *       VÀ `.concept-points-list` phải CÒN (chứng minh ẩn đúng ô ⭐, không phải slide trống).
 *   (2) ca PHẢI HIỆN — `rule` KHÔNG bị trùng ⇒ `.concept-rule-box` = 1.
 * Vế (2) để bắt trường hợp "ẩn bừa": nếu mã ẩn hết mọi ô ⭐ thì vế (2) ĐỎ.
 */
import { chromium } from "playwright";
import { coversAll } from "../client/src/utils/textCompare.js";

const PORT = process.env.PORT ?? "5174";
const SOURCES = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

/** Cùng công thức với `conceptSlide.jsx` (giữ khớp — lệch là cổng báo sai). */
function ruleIsDuplicate(c) {
  const points = Array.isArray(c.points) ? c.points.join(" · ") : "";
  const steps = Array.isArray(c.steps)
    ? c.steps.map((s) => `${s.title ?? ""} ${s.desc ?? ""}`).join(" · ")
    : "";
  const rule = String(c.rule ?? "");
  if (!rule) return false;
  return Boolean(
    (points && coversAll(points, rule)) || (steps && coversAll(steps, rule)),
  );
}

const phaiAn = [];
const phaiHien = [];
for (const [file, key] of SOURCES) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        if (s.type !== "concept") return;
        const c = s.content ?? {};
        if (!String(c.rule ?? "")) return;
        const ca = {
          bai: bai.id,
          slide: i + 1,
          rule: String(c.rule),
          coDanhSach: Array.isArray(c.points) && c.points.length > 0,
        };
        (ruleIsDuplicate(c) ? phaiAn : phaiHien).push(ca);
      });
    }
  }
}

console.log(
  `Slide khái niệm CÓ ô nhấn mạnh: ${phaiAn.length + phaiHien.length}`,
);
console.log(`  • phải ẨN (danh sách đã nói đủ): ${phaiAn.length}`);
console.log(`  • phải HIỆN (không trùng):       ${phaiHien.length}`);

const mauAn = phaiAn.slice(0, 4);
const mauHien = phaiHien.slice(0, 2);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

async function moSlide(baiId, soSlide) {
  await page.goto(`http://localhost:${PORT}/lesson/${baiId}`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(900);
  for (let i = 1; i < soSlide; i++) {
    await page.evaluate(() => {
      const nut = document.querySelector(".quiz-options button");
      if (nut) nut.click();
    });
    await page.waitForTimeout(300);
    const next = await page.$('button:has-text("Tiếp tục")');
    if (next && !(await next.isDisabled())) {
      await next.click();
      await page.waitForTimeout(450);
    }
  }
  await page.waitForTimeout(300);
  return page.evaluate(() => ({
    oNhanManh: document.querySelectorAll(".concept-rule-box").length,
    danhSach: document.querySelectorAll(".concept-points-list").length,
    chuONhanManh:
      document.querySelector(".concept-rule-box")?.innerText?.slice(0, 40) ??
      "",
    tieuDe: document.querySelector(".concept-title")?.innerText ?? "",
    soSlide: document.querySelectorAll(".slide-concept-card").length,
  }));
}

let soLoi = 0;
const chay = async (ca, phaiAnThat) => {
  const kq = await moSlide(ca.bai, ca.slide);
  let dat;
  if (phaiAnThat) {
    dat = kq.oNhanManh === 0 && kq.danhSach >= 1;
  } else {
    dat = kq.oNhanManh === 1 && kq.chuONhanManh.length > 0;
  }
  if (!dat) soLoi++;
  console.log(
    `${dat ? "PASS" : "FAIL"} · ${ca.bai} slide ${ca.slide} · ` +
      `${phaiAnThat ? "phải ẨN" : "phải HIỆN"} · ` +
      `ô ⭐ = ${kq.oNhanManh} · danh sách = ${kq.danhSach}` +
      (phaiAnThat ? "" : ` · chữ = "${kq.chuONhanManh}…"`),
  );
};

console.log(
  "\n(1) Ca PHẢI ẨN — ô ⭐ không được vẽ ra, danh sách bên dưới phải còn:",
);
for (const ca of mauAn) await chay(ca, true);

console.log("\n(2) Ca PHẢI HIỆN — canary chống 'ẩn bừa hết':");
for (const ca of mauHien) await chay(ca, false);

await browser.close();
console.log(
  `\nTổng: ${mauAn.length + mauHien.length} ca đo trong app · ${soLoi} lỗi`,
);
process.exit(soLoi === 0 ? 0 : 1);
