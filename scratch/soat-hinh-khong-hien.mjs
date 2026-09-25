/**
 * SOÁT "HÌNH GHI TRONG DỮ LIỆU NHƯNG KHÔNG CÓ CHỖ VẼ".
 *
 * Vì sao có công cụ này: trong `client/src/pages/LessonPage.jsx`, chỉ `VisualSlide`
 * (slide `type: "visual"`) mới vẽ `content.number` · `content.operation` ·
 * `content.clock` · `content.comparison`. Các slide `story`/`concept`/`quiz`/`summary`
 * chỉ gọi `VisualBlocks` — mà `VisualBlocks` vẽ theo `HINH_KEYS` (visualKeys.js),
 * trong đó KHÔNG có 4 khoá trên.
 * ⇒ Nếu dữ liệu đặt `clock` (hay `operation`, `number`, `comparison`) lên slide không
 *   phải `visual` thì hình đó KHÔNG BAO GIỜ hiện ra — mất hình mà không báo lỗi gì.
 *
 * Đối chiếu mã: chạy `Select-String LessonPage.jsx -Pattern "content.clock"` phải thấy
 * mọi chỗ khớp đều nằm trong khoảng dòng của hàm `VisualSlide`. Nếu sau này có ai thêm
 * chỗ vẽ cho slide khác thì công cụ này sẽ báo "còn nghi oan" — sửa KHOA_HINH cho khớp.
 *
 * Chạy: `node scratch/soat-hinh-khong-hien.mjs`
 */

const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

// BẢN ĐỒ VẼ — đọc từ `LessonPage.jsx`, phải cập nhật mỗi khi có ai thêm/bớt chỗ vẽ.
// ⚠️ Há»i kỹ TRƯỚC khi tin công cụ: lần đầu tôi cho rằng concept không vẽ `clock`,
// nhưng `ConceptSlide` CÓ vẽ (dòng ~1650) ⇒ báo oan 2 ca. Đã sửa thành bảng dưới đây.
const CHO_VE = {
  story: ["items", "number", "operation", "clock", "comparison"],
  concept: ["items", "number", "operation", "clock", "comparison", "shape"],
  visual: ["items", "number", "operation", "clock", "comparison"],
  quiz: ["items", "number", "operation", "clock", "comparison"],
  summary: ["items", "number", "operation", "clock", "comparison"],
  dialogue: ["clock"],
};

// Khoá hình KHÔNG vẽ được ở đâu (ngoài VisualBlocks vốn đã vẽ theo HINH_KEYS).
const KHOA_HINH_LE = [
  "number",
  "operation",
  "clock",
  "comparison",
  "shape",
  "items",
];

const co = (v) => v !== null && v !== undefined && v !== "";

const findings = [];
const demTheoKieu = {};
let soSlide = 0;

for (const [file, key, lop] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  for (const ch of g.chapters ?? []) {
    for (const bai of ch.lessons ?? []) {
      for (const s of bai.slides ?? []) {
        soSlide += 1;
        const c = s.content ?? {};
        const veDuoc = CHO_VE[s.type];
        if (!veDuoc) continue;
        const khoa = KHOA_HINH_LE.filter(
          (k) => co(c[k]) && !veDuoc.includes(k),
        );
        if (!khoa.length) continue;
        demTheoKieu[s.type] = (demTheoKieu[s.type] ?? 0) + khoa.length;
        findings.push({
          lop,
          bai: bai.id,
          kieu: s.type,
          khoa: khoa.join("+"),
          viDu: String(c.text ?? c.question ?? c.explanation ?? "")
            .split("\n")[0]
            .slice(0, 58),
        });
      }
    }
  }
}

console.log(
  `Đã quét ${soSlide} slide. Số slide mang hình mà KHÔNG có chỗ vẽ: ${findings.length}\n`,
);
for (const [kieu, n] of Object.entries(demTheoKieu)) {
  console.log(`  kiểu "${kieu}": ${n} khoá hình`);
}
if (findings.length) {
  console.log("");
  for (const f of findings) {
    console.log(`L${f.lop} ${f.bai} [${f.kieu}] ${f.khoa} :: ${f.viDu}`);
  }
}

// CANARY HAI VẾ: (1) bắt được ca giả, (2) KHÔNG bắt ca hợp lệ.
const canary = [
  {
    ten: "story có clock (vừa thêm chỗ vẽ) → KHÔNG báo",
    type: "story",
    content: { clock: { hour: 7 } },
    phai: false,
  },
  {
    ten: "concept có clock → KHÔNG báo (ConceptSlide có vẽ)",
    type: "concept",
    content: { clock: { hour: 7 } },
    phai: false,
  },
  {
    ten: "quiz có clock → KHÔNG báo (vừa thêm chỗ vẽ)",
    type: "quiz",
    content: { clock: { hour: 7 } },
    phai: false,
  },
  {
    ten: "concept có operation → KHÔNG báo (vừa thêm chỗ vẽ)",
    type: "concept",
    content: { operation: { left: 1 } },
    phai: false,
  },
  {
    ten: "dialogue có operation → BÁO (DialogueScene không vẽ)",
    type: "dialogue",
    content: { operation: { left: 1 } },
    phai: true,
  },
  {
    ten: "dialogue có clock → KHÔNG báo (DialogueScene có vẽ)",
    type: "dialogue",
    content: { clock: { hour: 3 } },
    phai: false,
  },
  {
    ten: "summary có shape → BÁO (SummarySlide không vẽ shape)",
    type: "summary",
    content: { shape: "square" },
    phai: true,
  },
  {
    ten: "quiz có items → KHÔNG báo (QuizSlide có vẽ)",
    type: "quiz",
    content: { items: [{ emoji: "🍎", count: 3 }] },
    phai: false,
  },
  {
    ten: "story chữ thường → KHÔNG báo",
    type: "story",
    content: { text: "3 giờ" },
    phai: false,
  },
  {
    ten: "quiz number 0 → KHÔNG báo (0 + có vẽ)",
    type: "quiz",
    content: { number: 0 },
    phai: false,
  },
];
let canaryDung = 0;
for (const c of canary) {
  const veDuoc = CHO_VE[c.type] ?? [];
  const bat = KHOA_HINH_LE.some((k) => co(c.content[k]) && !veDuoc.includes(k));
  if (bat === c.phai) canaryDung += 1;
  else console.log(`❌ CANARY sai: ${c.ten} → bắt=${bat} (đáng lẽ ${c.phai})`);
}
console.log(`\nCanary: ${canaryDung}/${canary.length} ca đúng.`);
console.log(
  findings.length
    ? `\n⚠️  ${findings.length} slide mất hình — xem danh sách trên.`
    : "\n✅ Không slide nào mang hình mà thiếu chỗ vẽ.",
);
process.exit(findings.length ? 1 : 0);
