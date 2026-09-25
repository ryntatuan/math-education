/**
 * Chụp MỘT slide ở ĐÚNG khổ điện thoại để nhìn bằng mắt (không tin số đo suông).
 * Chạy: `node scratch/chup-slide.mjs <bài> <số-thứ-slide-tính-từ-1> [file-ra.png]`
 * Ví dụ: `node scratch/chup-slide.mjs g3-c8-l5 1`  (cần dev server ở PORT, mặc định 5174)
 */
import { chromium } from "playwright";

const [baiId, soSlide, ra = "scratch/anh-slide.png"] = process.argv.slice(2);
if (!baiId || !soSlide) {
  console.log("Thiếu tham số. Dùng: node scratch/chup-slide.mjs <bài> <slide> [file.png]");
  process.exit(1);
}
const PORT = process.env.PORT ?? "5174";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`http://localhost:${PORT}/lesson/${baiId}`, {
  waitUntil: "domcontentloaded",
});
await page.waitForTimeout(900);

// Đi tới đúng slide: quiz phải bấm một phương án mới mở được "Tiếp tục".
for (let i = 1; i < Number(soSlide); i++) {
  const daTraLoi = await page.evaluate(() => {
    const nut = document.querySelector(".quiz-options button");
    if (!nut) return true;
    nut.click();
    return true;
  });
  if (daTraLoi) await page.waitForTimeout(400);
  const next = await page.$('button:has-text("Tiếp tục")');
  if (next && !(await next.isDisabled())) {
    await next.click();
    await page.waitForTimeout(600);
  }
}
await page.waitForTimeout(400);
await page.screenshot({ path: ra, fullPage: false });
console.log(`Đã chụp ${baiId} slide ${soSlide} → ${ra} (390×844)`);
await browser.close();
