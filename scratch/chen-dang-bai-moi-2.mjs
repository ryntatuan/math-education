/**
 * CHÈN 6 SLIDE CỦA HAI DẠNG BÀI “TỰ TRẢ LỜI” — `node scratch/chen-dang-bai-moi-2.mjs [--that]`
 *
 * VÌ SAO DÙNG SCRIPT: 6 slide nằm rải ở 6 file lớp khác nhau; sửa tay 6 chỗ là 6 lần có thể
 * chèn lệch dấu phẩy/ngoặc ⇒ hỏng cả file dữ liệu (đúng họ lỗi tôi đã gây ra trong ngày).
 *
 * DẠNG BÀI (ảnh Duolingo người dùng gửi 2026-09-28):
 *   • `typeAnswer`       — “Nhập kết quả”: bé tự gõ số bằng bàn phím số.
 *   • `numberLineAnswer` — “Trả lời trên trục số”: bé kéo con trỏ tới vạch đúng.
 *
 * AN TOÀN:
 *   • Mặc định CHỈ IN ra vị trí sẽ chèn (dry-run). Muốn ghi thật phải thêm `--that`.
 *   • Ghi bằng `fs.writeFileSync(..., "utf8")` — KHÔNG dùng PowerShell (bẫy encoding đã mắc).
 *   • Chèn NGAY TRƯỚC slide `summary` cuối bài ⇒ “Ghi nhớ” vẫn là slide cuối, đúng thứ tự SGK.
 *   • Sau khi ghi: `git diff --numstat` phải vàng ít dòng, và `node scratch/kiem-tra-slide.mjs`
 *     phải 0 lỗi.
 */
import fs from "node:fs";

const THAT = process.argv.includes("--that");

const VIEC = [
  // ─────────────────────────── NHẬP KẾT QUẢ (bàn phím số) ───────────────────────────
  {
    file: "client/src/data/grade1/g1c3.js",
    bai: "g1-c3-l9",
    ten: "typeAnswer — bảng trừ trong phạm vi 10",
    slide: `        {
          type: "typeAnswer",
          content: {
            question: "Tính rồi viết kết quả",
            expression: "10 − 6 =",
            answer: 4,
            mascotHint: "Từ 10 đếm lùi 6 bước: 9, 8, 7, 6, 5, 4. Vậy 10 − 6 = 4.",
          },
        },`,
  },
  {
    file: "client/src/data/grade2/g2c8.js",
    bai: "g2-c8-l6",
    ten: "typeAnswer — luyện tập bảng nhân 2",
    slide: `        {
          type: "typeAnswer",
          content: {
            question: "Tính rồi viết kết quả",
            expression: "2 × 7 =",
            answer: 14,
            mascotHint: "2 × 7 nghĩa là 2 được lấy 7 lần: 2, 4, 6, 8, 10, 12, 14.",
          },
        },`,
  },
  {
    file: "client/src/data/grade3/g3c4.js",
    bai: "g3-c4-l2",
    ten: "typeAnswer — nhân số có hai chữ số với số có một chữ số",
    slide: `        {
          type: "typeAnswer",
          content: {
            question: "Đặt tính rồi tính kết quả",
            expression: "24 × 3 =",
            answer: 72,
            mascotHint: "24 × 3 = (20 × 3) + (4 × 3) = 60 + 12 = 72.",
          },
        },`,
  },

  // ─────────────────────────── TRẢ LỜI TRÊN TRỤC SỐ ───────────────────────────
  {
    file: "client/src/data/grade2/g2c8.js",
    bai: "g2-c8-l4",
    ten: "numberLineAnswer — 2 + 2 + 2 = 3 × ? (đếm thêm trên trục số)",
    slide: `        {
          type: "numberLineAnswer",
          content: {
            question: "Kéo con trỏ tới kết quả đúng",
            expression: "2 + 2 + 2 = 3 ×",
            answer: 6,
            min: 0,
            max: 10,
            step: 2,
            mascotHint: "2 + 2 + 2 = 6, mà 3 × 2 cũng bằng 6 — ba lần hai bằng sáu.",
          },
        },`,
  },
  {
    file: "client/src/data/grade3/g3c8.js",
    bai: "g3-c8-l7",
    ten: "numberLineAnswer — làm tròn 47 đến hàng chục",
    slide: `        {
          type: "numberLineAnswer",
          content: {
            question: "Kéo con trỏ tới số làm tròn đúng",
            expression: "47 ≈",
            answer: 50,
            min: 40,
            max: 60,
            step: 5,
            mascotHint: "47 gần 50 hơn 40 (cách 3 so với 7), nên làm tròn đến hàng chục là 50.",
          },
        },`,
  },
  {
    file: "client/src/data/grade4/g4c3.js",
    bai: "g4-c3-l4",
    ten: "numberLineAnswer — làm tròn 4 600 đến hàng nghìn",
    slide: `        {
          type: "numberLineAnswer",
          content: {
            question: "Kéo con trỏ tới số làm tròn đúng",
            expression: "4 600 ≈",
            answer: 5000,
            min: 4000,
            max: 6000,
            step: 500,
            mascotHint: "4 600 vượt qua mốc giữa 4 500 nên làm tròn đến hàng nghìn là 5 000.",
          },
        },`,
  },
];

let soLan = 0;
let soLoi = 0;

for (const viec of VIEC) {
  if (!fs.existsSync(viec.file)) {
    console.log(`❌ KHÔNG CÓ FILE: ${viec.file}`);
    soLoi++;
    continue;
  }
  const goc = fs.readFileSync(viec.file, "utf8");
  const dau = goc.indexOf(`id: "${viec.bai}"`);
  if (dau < 0) {
    console.log(`❌ không thấy bài ${viec.bai} trong ${viec.file}`);
    soLoi++;
    continue;
  }
  // Hết bài này = tới bài kế tiếp (hoặc hết file).
  const ke = goc.indexOf('id: "g', dau + 10);
  const cuoiBai = ke < 0 ? goc.length : ke;

  const vtSummary = goc.indexOf('type: "summary"', dau);
  if (vtSummary < 0 || vtSummary > cuoiBai) {
    console.log(`❌ bài ${viec.bai} không có slide summary — không chèn được`);
    soLoi++;
    continue;
  }
  const mocMoSlide = goc.lastIndexOf("\n        {", vtSummary);
  if (mocMoSlide < 0) {
    console.log(`❌ không tìm thấy mốc mở slide trước summary ở ${viec.bai}`);
    soLoi++;
    continue;
  }

  const viTri = mocMoSlide + 1; // chèn ngay sau ký tự xuống dòng
  const moi = goc.slice(0, viTri) + viec.slide + "\n" + goc.slice(viTri);
  console.log(
    `${THAT ? "GHI" : "SẼ CHÈN"} · ${viec.bai} · ${viec.ten} · dòng ${goc.slice(0, viTri).split("\n").length}`,
  );
  if (THAT) {
    fs.writeFileSync(viec.file, moi, "utf8");
    soLan++;
  }
}

if (!THAT) {
  console.log("\n(Đây là DRY-RUN. Thêm `--that` để ghi thật.)");
} else {
  console.log(
    `\n✅ đã chèn ${soLan} slide${soLoi ? ` (${soLoi} lỗi)` : ""}. KIỂM NGAY: git diff --numstat + node scratch/kiem-tra-slide.mjs`,
  );
}
