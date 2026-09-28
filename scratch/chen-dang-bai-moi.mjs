/**
 * CHÈN SLIDE DẠNG BÀI MỚI VÀO BÀI HỌC — `node scratch/chen-dang-bai-moi.mjs [--that]`
 *
 * VÌ SAO DÙNG SCRIPT: 8 slide mới nằm rải ở 5 file lớp khác nhau. Sửa tay 8 chỗ là 8 lần
 * có thể chèn lệch dấu phẩy/ngoặc ⇒ cả file dữ liệu hỏng.
 *
 * AN TOÀN:
 *   • Chạy MẶC ĐỊNH là chỉ in ra vị trí sẽ chèn (dry-run). Muốn ghi thật phải thêm `--that`.
 *   • Ghi bằng `fs.writeFileSync(..., "utf8")` — KHÔNG dùng PowerShell (bẫy encoding đã mắc).
 *   • Chèn NGAY TRƯỚC slide `summary` cuối bài, nên slide “Ghi nhớ” vẫn là slide cuối —
 *     đúng thứ tự SGK: Kể chuyện → Khám phá → Hoạt động → Luyện tập → Ghi nhớ.
 *   • Sau khi ghi, phải kiểm: `git diff --numstat` vàng ít dòng (không phải cả file) và
 *     `node scratch/kiem-tra-slide.mjs` báo 0 lỗi.
 */
import fs from "node:fs";

const THAT = process.argv.includes("--that");

/** Nội dung 8 slide mới (2026-09-28) — lấy ý từ Duolingo Math. */
const VIEC = [
  {
    file: "client/src/data/grade1/g1c3.js",
    bai: "g1-c3-l13",
    ten: "matchPairs — nối phép tính với kết quả",
    slide: `        {
          type: "matchPairs",
          content: {
            question: "Nối mỗi phép tính với kết quả đúng của nó",
            pairs: [
              ["3 + 2", "5"],
              ["4 + 4", "8"],
              ["7 − 3", "4"],
            ],
            mascotHint: "Bé nhẩm từng phép tính rồi nối với kết quả nhé!",
          },
        },`,
  },
  {
    file: "client/src/data/grade2/g2c8.js",
    bai: "g2-c8-l15",
    ten: "multiQuiz — chọn tất cả phép tính có kết quả bằng 10",
    slide: `        {
          type: "multiQuiz",
          content: {
            question: "Chọn TẤT CẢ các phép tính có kết quả bằng 10",
            options: ["5 × 2", "2 × 5", "3 × 6", "20 : 2"],
            answers: ["5 × 2", "2 × 5", "20 : 2"],
            mascotHint:
              "Tính từng phép tính: 5 × 2 = 10, 2 × 5 = 10, 20 : 2 = 10, còn 3 × 6 = 18.",
          },
        },`,
  },
  {
    file: "client/src/data/grade2/g2c8.js",
    bai: "g2-c8-l15",
    ten: "buildExpression — ghép thẻ thành phép nhân có tích 100",
    slide: `        {
          type: "buildExpression",
          content: {
            question: "Ghép phép nhân có tích bằng 100",
            target: "100",
            slots: 3,
            tiles: ["25", "×", "4", "5", "20", "6"],
            solutions: [
              ["25", "×", "4"],
              ["20", "×", "5"],
            ],
            mascotHint:
              "25 × 4 = 100, 20 × 5 = 100, 4 × 25 cũng bằng 100 — đổi chỗ hai thừa số thì tích không đổi!",
          },
        },`,
  },
  {
    file: "client/src/data/grade3/g3c1.js",
    bai: "g3-c1-l5",
    ten: "matchPairs — bảng nhân 2 và bảng nhân 5",
    slide: `        {
          type: "matchPairs",
          content: {
            question: "Nối mỗi phép nhân với kết quả đúng",
            pairs: [
              ["2 × 6", "12"],
              ["5 × 4", "20"],
              ["2 × 9", "18"],
            ],
            mascotHint: "Bé đọc lại bảng nhân 2 và bảng nhân 5 rồi nối nhé!",
          },
        },`,
  },
  {
    file: "client/src/data/grade3/g3c4.js",
    bai: "g3-c4-l4",
    ten: "multiQuiz — chọn tất cả phép chia hết",
    slide: `        {
          type: "multiQuiz",
          content: {
            question: "Chọn TẤT CẢ các phép chia HẾT (không dư)",
            options: ["12 : 3", "15 : 4", "20 : 5", "13 : 2"],
            answers: ["12 : 3", "20 : 5"],
            mascotHint:
              "12 : 3 = 4 và 20 : 5 = 4 — chia hết. Còn 15 : 4 và 13 : 2 đều còn dư.",
          },
        },`,
  },
  {
    file: "client/src/data/grade4/g4c10.js",
    bai: "g4-c10-l4",
    ten: "multiQuiz — chọn tất cả phân số bằng 1/2",
    slide: `        {
          type: "multiQuiz",
          content: {
            question: "Chọn TẤT CẢ các phân số bằng 1/2",
            options: ["2/4", "3/6", "2/3", "4/8"],
            answers: ["2/4", "3/6", "4/8"],
            mascotHint:
              "Rút gọn từng phân số: 2/4 = 1/2, 3/6 = 1/2, 4/8 = 1/2, còn 2/3 đã tối giản và khác 1/2.",
          },
        },`,
  },
  {
    file: "client/src/data/grade4/g4c8.js",
    bai: "g4-c8-l11",
    ten: "buildExpression — ghép thẻ thành phép nhân có tích 1 000",
    slide: `        {
          type: "buildExpression",
          content: {
            question: "Ghép phép nhân có tích bằng 1 000",
            target: "1 000",
            slots: 3,
            tiles: ["125", "×", "8", "4", "25", "40"],
            solutions: [
              ["125", "×", "8"],
              ["25", "×", "40"],
            ],
            mascotHint:
              "125 × 8 = 1 000, 25 × 40 = 1 000 và 8 × 125 cũng bằng 1 000 — đổi chỗ hai thừa số thì tích không đổi.",
          },
        },`,
  },
  {
    file: "client/src/data/grade5/g5c2.js",
    bai: "g5-c2-l5",
    ten: "matchPairs — số thập phân với phân số bằng nhau",
    slide: `        {
          type: "matchPairs",
          content: {
            question: "Nối mỗi số thập phân với phân số bằng nó",
            pairs: [
              ["0,5", "1/2"],
              ["0,25", "1/4"],
              ["0,2", "1/5"],
            ],
            mascotHint: "0,5 = 5/10 = 1/2 · 0,25 = 25/100 = 1/4 · 0,2 = 2/10 = 1/5.",
          },
        },`,
  },
];

let soLan = 0;
for (const viec of VIEC) {
  if (!fs.existsSync(viec.file)) {
    console.log(`❌ KHÔNG CÓ FILE: ${viec.file}`);
    continue;
  }
  const goc = fs.readFileSync(viec.file, "utf8");
  const dau = goc.indexOf(`id: "${viec.bai}"`);
  if (dau < 0) {
    console.log(`❌ không thấy bài ${viec.bai} trong ${viec.file}`);
    continue;
  }
  // Hết bài này = tới bài kế tiếp (hoặc hết file).
  const ke = goc.indexOf('id: "g', dau + 10);
  const cuoiBai = ke < 0 ? goc.length : ke;

  const vtSummary = goc.indexOf('type: "summary"', dau);
  if (vtSummary < 0 || vtSummary > cuoiBai) {
    console.log(`❌ bài ${viec.bai} không có slide summary — không chèn được`);
    continue;
  }
  const mocMoSlide = goc.lastIndexOf("\n        {", vtSummary);
  if (mocMoSlide < 0) {
    console.log(`❌ không tìm thấy mốc mở slide trước summary ở ${viec.bai}`);
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
    `\n✅ đã chèn ${soLan} slide. KIỂM NGAY: git diff --numstat + node scratch/kiem-tra-slide.mjs`,
  );
}
