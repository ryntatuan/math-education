#!/usr/bin/env node
/** THỬ NHANH regex chuỗi đẳng thức (ghi ra .mjs để tránh PowerShell ăn dấu \). */
const SO_HANG = String.raw`\d[\d\s]*`;
const VE = String.raw`${SO_HANG}(?:\s*[+\-×÷]\s*${SO_HANG})+`;
const CHUOI = new RegExp(`(${VE})(?:\\s*=\\s*(${VE}))+`, "g");
const KHONG_SAT = /[\d+\-×÷=]/;

console.log("regex:", CHUOI.source);

const mau = [
  "hàng đơn vị 3 × 6 = 18, viết 8 nhớ 1",
  "Ví dụ: 1 + 3 + 320 = 324.",
  "9 + 4  =  9 + 1 + 3  =  10 + 3  =  13",
  "2 + 5 = 7 và 5 + 2 = 7. Vậy 2 + 5 = 5 + 2.",
];

for (const goc of mau) {
  const dong = goc
    .replace(/\s+:\s+/g, " ÷ ")
    .replace(/[−–—]/g, "-")
    .replace(/\s*x\s*/g, " × ");
  console.log("\nDÒNG:", JSON.stringify(dong));
  for (const m of dong.matchAll(CHUOI)) {
    const truoc = dong[m.index - 1];
    const sau = dong[m.index + m[0].length];
    const chan =
      (truoc !== undefined && KHONG_SAT.test(truoc)) ||
      (sau !== undefined && KHONG_SAT.test(sau));
    console.log(
      `  khớp ${JSON.stringify(m[0])} · trước=${JSON.stringify(truoc)} sau=${JSON.stringify(sau)} · bị chặn: ${chan}`,
    );
  }
}
