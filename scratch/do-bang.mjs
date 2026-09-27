/**
 * ĐO MỌI BẢNG Ở APP THẬT (khổ điện thoại 390 px). Chạy: `npm --prefix client run dev` rồi
 * `node scratch/do-bang.mjs`.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng gửi ảnh 2026-09-27): “phần Quan sát trong ảnh 2 còn chỗ trống
 * 2 bên nhưng khung lại không hiển thị hết, làm cho chữ bị xuống dòng”. Ba thứ phải đo được,
 * không được tin bằng mắt:
 *   1. TỈ LỆ LẤP KHUNG = bề rộng hình / bề rộng dùng được của thẻ. Trước đây ~0,7 (lọt thỏm).
 *   2. CHỮ CHỒNG NHAU — ô nào hẹp quá thì chữ tràn sang ô bên; đo bằng giao nhau của hộp chữ.
 *   3. CỠ CHỮ NHỎ NHẤT trong hình (đơn vị viewBox nhân tỉ lệ phóng).
 *
 * Cùng họ với `scratch/do-chu-hinh-moi-loai.mjs` (đi từng slide bằng nút “Tiếp tục”).
 */
import { chromium } from "playwright";

const PORT = process.env.PORT ?? "5174";
const BASE = `http://localhost:${PORT}`;
/** Khung phải lấp ít nhất 90% bề rộng dùng được — dưới nữa là còn “chỗ trống hai bên”. */
const NGUONG_LAP = 0.9;

const SOURCES = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

/** Gom mọi slide có BẢNG (bảng tĩnh `table` và bảng điền `bangTinh`), theo từng bài. */
const theoBai = new Map(); // baiId -> [{slideIndex (0-based), kind, nhan}]
let soBang = 0;
for (const [file, key] of SOURCES) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  for (const ch of mod[key].chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      (bai.slides ?? []).forEach((s, i) => {
        if (s.type === "quiz") return; // quiz khoá nút “Tiếp tục”, đi tới bằng cách khác
        const kind = s.content?.table
          ? "table"
          : s.content?.bangTinh
            ? "bangTinh"
            : null;
        if (!kind) return;
        soBang++;
        if (!theoBai.has(bai.id)) theoBai.set(bai.id, []);
        theoBai.get(bai.id).push({ slide: i, kind });
      });
    }
  }
}

console.log(
  `Có ${soBang} slide chứa bảng trong cả 5 lớp, nằm trong ${theoBai.size} bài.`,
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

/** Đo hình trong slide đang mở. */
const doSlide = () =>
  page.evaluate(() => {
    const card = document.querySelector(
      ".slide-visual-card, .slide-concept-card, .slide-story-card, .slide-quiz-card, .slide-summary-card",
    );
    if (!card) return null;
    const cs = getComputedStyle(card);
    const dungDuoc =
      card.clientWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight);

    // Thẻ hình đầu tiên có <svg> (bảng nằm trong thẻ đó).
    const theHinh = [...card.querySelectorAll("div")].find((d) =>
      d.querySelector(":scope > svg"),
    );
    const svg = theHinh?.querySelector(":scope > svg");
    if (!svg) return { dungDuoc, rongHinh: 0, chu: 0, chong: 0, nhoNhat: 0 };

    const rongHinh = svg.getBoundingClientRect().width;
    const texts = [...svg.querySelectorAll("text")];
    const boxes = texts
      .map((t) => ({
        r: t.getBoundingClientRect(),
        cao: parseFloat(getComputedStyle(t).fontSize) || 0,
      }))
      .filter((b) => b.r.width > 0.5 && b.r.height > 0.5);

    let chong = 0;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].r;
        const b = boxes[j].r;
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 1.5 && oy > 1.5) chong++;
      }
    }
    // Cỡ chữ đơn vị nhân tỉ lệ: rộng hình / bề rộng viewBox.
    const vb = svg.viewBox?.baseVal?.width || 0;
    const tiLe = vb ? rongHinh / vb : 1;
    const nhoNhat = boxes.length
      ? Math.min(...boxes.map((b) => b.cao)) * tiLe
      : 0;
    return { dungDuoc, rongHinh, chu: boxes.length, chong, nhoNhat, vb };
  });

const ketQua = [];
for (const [baiId, cases] of theoBai) {
  await page.goto(`${BASE}/lesson/${baiId}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);

  const canDo = new Set(cases.map((c) => c.slide));
  const maxSlide = Math.max(...canDo);
  for (let i = 0; i <= maxSlide; i++) {
    if (canDo.has(i)) {
      const kq = await doSlide();
      if (kq) ketQua.push({ baiId, slide: i + 1, ...kq });
    }
    if (i === maxSlide) break;
    // Đi tiếp: slide câu hỏi phải bấm một phương án mới mở nút “Tiếp tục”.
    await page.evaluate(() => {
      const nut = document.querySelector(".quiz-options button");
      if (nut) nut.click();
    });
    await page.waitForTimeout(250);
    const next = await page.$('button:has-text("Tiếp tục")');
    if (next && !(await next.isDisabled())) {
      await next.click();
      await page.waitForTimeout(420);
    }
  }
  process.stdout.write(`\rđã đo ${ketQua.length}/${soBang} bảng …`);
}
await browser.close();

const lech = ketQua.filter(
  (r) => r.dungDuoc > 0 && r.rongHinh / r.dungDuoc < NGUONG_LAP,
);
const chongChu = ketQua.filter((r) => r.chong > 0);
const nho = ketQua.filter((r) => r.nhoNhat > 0 && r.nhoNhat < 12);
const tiLe = ketQua.map((r) => (r.dungDuoc ? r.rongHinh / r.dungDuoc : 0));

console.log(`\n\nĐã đo ${ketQua.length} bảng.`);
console.log(
  `Tỉ lệ lấp khung: nhỏ nhất ${Math.min(...tiLe).toFixed(2)} · trung bình ${(tiLe.reduce((a, b) => a + b, 0) / tiLe.length).toFixed(2)} · lớn nhất ${Math.max(...tiLe).toFixed(2)}`,
);
console.log(
  `Bảng lấp khung dưới ${NGUONG_LAP}: ${lech.length} · chữ chồng nhau: ${chongChu.length} · chữ dưới 12 px: ${nho.length}`,
);

for (const r of lech.slice(0, 15)) {
  console.log(
    `  ⚠ ${r.baiId} slide ${r.slide}: hình ${r.rongHinh.toFixed(0)} / khung ${r.dungDuoc.toFixed(0)} px (${(r.rongHinh / r.dungDuoc).toFixed(2)})`,
  );
}
for (const r of chongChu.slice(0, 15)) {
  console.log(`  ⚠ ${r.baiId} slide ${r.slide}: ${r.chong} cặp chữ chồng nhau`);
}

process.exit(lech.length + chongChu.length + nho.length > 0 ? 1 : 0);
