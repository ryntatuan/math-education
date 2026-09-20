// Đo hình dạng THẬT của dữ liệu nội dung trước khi thiết kế schema CMS (GĐ 3a).
// Chạy: node scratch/inspect_content_shape.mjs
//
// VÌ SAO PHẢI ĐO: `admin_portal_plan.md` mục 3a ghi "Slide hiện có 6+ loại cấu trúc".
// Kế hoạch đó viết từ lâu và chưa từng được kiểm chứng bằng số. Mà bài học từ chính
// dự án này: kế hoạch 2b-2 từng ghi sai cả hai chỗ — `MathBalanceGame` bị cho là
// "không sinh câu hỏi", và nhánh lớp 5 của `generateCalculation` bị ghi là `sub`
// trong khi thực tế là `mul`.
//
// Dựng schema trên một danh sách slide THIẾU một loại thì editor sẽ nuốt mất loại đó
// khi admin bấm Lưu — và mất dữ liệu một cách âm thầm.

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const grades = [];
for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}`);
  grades.push(mod[key]);
}

let chapters = 0;
let lessons = 0;
let slides = 0;
const slideType = new Map(); // type -> số lượng
const contentKeys = new Map(); // type -> Set các khoá trong `content`
const conceptSig = new Map(); // chữ ký khoá -> số lượng (tìm biến thể)
// 🔴 type -> key -> { n, shapes } — TẦN SUẤT từng khoá, không chỉ tập hợp.
// Tập hợp khoá KHÔNG cho biết khoá nào luôn có mặt. Mà bộ kiểm tra chia khoá thành
// "bắt buộc" và "tuỳ chọn" — đoán sai một khoá là bộ kiểm tra từ chối dữ liệu hợp lệ
// và làm hỏng chính lần migrate. Nên phải đếm.
const keyStats = new Map();
let maxSlides = 0;
const lechTotal = [];
const perGrade = [];
const anomalies = [];

const moTaKieu = (v) => {
  if (Array.isArray(v)) {
    const trong = [
      ...new Set(
        v.map((x) =>
          Array.isArray(x) ? "array" : x === null ? "null" : typeof x,
        ),
      ),
    ];
    return `array<${trong.join("|") || "rong"}>`;
  }
  if (v === null) return "null";
  return typeof v;
};

const themKhoa = (type, content) => {
  if (!contentKeys.has(type)) contentKeys.set(type, new Set());
  if (!keyStats.has(type)) keyStats.set(type, new Map());
  const stats = keyStats.get(type);
  if (content && typeof content === "object") {
    for (const k of Object.keys(content)) {
      contentKeys.get(type).add(k);
      if (!stats.has(k)) stats.set(k, { n: 0, shapes: new Set() });
      const s = stats.get(k);
      s.n++;
      s.shapes.add(moTaKieu(content[k]));
    }
  }
};

const lessonIds = new Map(); // id -> nơi xuất hiện (phát hiện trùng)

for (const g of grades) {
  let gLessons = 0;
  let gSlides = 0;
  for (const ch of g.chapters) {
    chapters++;
    if (!Array.isArray(ch.lessons) || ch.lessons.length === 0) {
      anomalies.push(`Chương không có bài: ${ch.id}`);
      continue;
    }
    if (ch.totalLessons != null && ch.totalLessons !== ch.lessons.length) {
      anomalies.push(
        `totalLessons lệch: ${ch.id} khai ${ch.totalLessons}, thật ${ch.lessons.length}`,
      );
      lechTotal.push(
        `${ch.id}: khai ${ch.totalLessons}, thật ${ch.lessons.length}`,
      );
    }
    for (const l of ch.lessons) {
      lessons++;
      gLessons++;
      if (lessonIds.has(l.id))
        anomalies.push(
          `Trùng id bài: ${l.id} (${lessonIds.get(l.id)} và ${ch.id})`,
        );
      lessonIds.set(l.id, ch.id);

      if (!/^g\d-c\d+-l\d+$/.test(l.id))
        anomalies.push(`id bài lạ dạng: ${l.id}`);
      if (l.id && !l.id.startsWith(`g${g.id}-`))
        anomalies.push(`id bài không khớp lớp: ${l.id} trong Lớp ${g.id}`);

      if (!Array.isArray(l.slides) || l.slides.length === 0) {
        anomalies.push(`Bài không có slide: ${l.id}`);
        continue;
      }
      for (const s of l.slides) {
        slides++;
        gSlides++;
        if (!s.type) {
          anomalies.push(`Slide thiếu type: ${l.id}`);
          continue;
        }
        if (!s.content || typeof s.content !== "object") {
          anomalies.push(`Slide thiếu content: ${l.id} / ${s.type}`);
          continue;
        }
        slideType.set(s.type, (slideType.get(s.type) ?? 0) + 1);
        themKhoa(s.type, s.content);

        // Câu hỏi: đáp án phải nằm trong lựa chọn, nếu không thì app không thể
        // chấm đúng — và đây là loại lỗi CMS rất dễ tạo ra khi admin sửa tay.
        //
        // ⚠️ Có HAI kiểu slide mang câu hỏi, không phải một. Bản đầu của script này
        // chỉ kiểm `quiz` — bỏ sót `dialogue`, mà `dialogue` cũng có `options` và
        // `correctAnswer`. Chính `LessonPage` cũng gọi `recordAttempt` ở nhánh
        // dialogue, tức nó thật sự là câu hỏi.
        if (s.type === "quiz" || s.type === "dialogue") {
          const dapAn = s.type === "quiz" ? "answer" : "correctAnswer";
          const opts = s.content.options;
          if (!Array.isArray(opts) || opts.length === 0)
            anomalies.push(`Câu hỏi không có options (${s.type}): ${l.id}`);
          else if (!opts.includes(s.content[dapAn]))
            anomalies.push(
              `Đáp án không nằm trong options (${s.type}): ${l.id} ` +
                `(${dapAn}=${JSON.stringify(s.content[dapAn])})`,
            );
        }

        // `concept` có tới 13 khoá khác nhau → nghi là nhiều BIẾN THỂ chứ không
        // phải một loại. Đếm theo "chữ ký khoá" để biết thật sự có mấy biến thể.
        if (s.type === "concept") {
          const sig = Object.keys(s.content).sort().join("+");
          conceptSig.set(sig, (conceptSig.get(sig) ?? 0) + 1);
        }
        const n = l.slides.length;
        if (n > maxSlides) maxSlides = n;
      }
    }
  }
  perGrade.push({
    lop: g.id,
    ten: g.name,
    chuong: g.chapters.length,
    bai: gLessons,
    slide: gSlides,
  });
}

console.log("=== TỔNG QUAN ===");
console.log(
  `Lớp: ${grades.length} · Chương: ${chapters} · Bài: ${lessons} · Slide: ${slides}\n`,
);

console.log("=== THEO LỚP ===");
for (const p of perGrade)
  console.log(
    `  Lớp ${p.lop} (${p.ten}): ${String(p.chuong).padStart(2)} chương · ` +
      `${String(p.bai).padStart(3)} bài · ${String(p.slide).padStart(4)} slide`,
  );

console.log("\n=== KIỂU SLIDE THẬT (đây mới là danh sách phải phủ đủ) ===");
const sorted = [...slideType.entries()].sort((a, b) => b[1] - a[1]);
for (const [t, n] of sorted) {
  const keys = [...(contentKeys.get(t) ?? [])].sort().join(", ");
  console.log(
    `  ${t.padEnd(12)} ${String(n).padStart(5)} slide   content: {${keys}}`,
  );
}
console.log(`  → TỔNG: ${sorted.length} kiểu slide`);

// Đây là phần quyết định "khoá nào bắt buộc". Một khoá chỉ được coi là bắt buộc khi
// nó có mặt ở 100% slide của kiểu đó — không suy từ việc "thấy nó trong ví dụ".
console.log(
  "\n=== TẦN SUẤT TỪNG KHOÁ (căn cứ để chia bắt buộc / tuỳ chọn) ===",
);
for (const [t, n] of sorted) {
  console.log(`\n  ${t} — ${n} slide`);
  const stats = keyStats.get(t) ?? new Map();
  const rows = [...stats.entries()].sort((a, b) => b[1].n - a[1].n);
  for (const [k, s] of rows) {
    const pct = ((100 * s.n) / n).toFixed(1);
    const nhan = s.n === n ? "BẮT BUỘC" : "tuỳ chọn";
    console.log(
      `    ${k.padEnd(16)} ${String(s.n).padStart(4)}/${n} ${pct.padStart(5)}%  ` +
        `${nhan.padEnd(9)} ${[...s.shapes].join(" | ")}`,
    );
  }
}

console.log("\n=== CẢNH BÁO ===");
if (anomalies.length === 0) console.log("  ✅ không có bất thường");
else {
  const dem = new Map();
  for (const a of anomalies) {
    const k = a
      .replace(/:.*/, "")
      .replace(/\(.*?\)/, "")
      .trim();
    dem.set(k, (dem.get(k) ?? 0) + 1);
  }
  for (const [k, n] of dem) console.log(`  ${n}× ${k}`);
  console.log(`  (tổng ${anomalies.length} cảnh báo)`);
}
if (lechTotal.length) {
  console.log(
    "\n  Chi tiết `totalLessons` lệch — metadata chương KHÔNG đáng tin, phải đếm lại:",
  );
  for (const s of lechTotal) console.log(`    ${s}`);
}

console.log("\n=== ĐỘ DÀI BÀI ===");
console.log(
  `  Bài dài nhất: ${maxSlides} slide · trung bình: ${(slides / lessons).toFixed(1)} slide`,
);

console.log("\n=== `concept` — CÁC BIẾN THỂ THEO CHỮ KÝ KHÓA ===");
const sigSorted = [...conceptSig.entries()].sort((a, b) => b[1] - a[1]);
for (const [sig, n] of sigSorted)
  console.log(`  ${String(n).padStart(4)}× ${sig}`);
console.log(`  → ${sigSorted.length} biến thể khác nhau`);

// storyData.js KHÔNG nằm trong curriculum.js — cần biết nó chứa gì để quyết
// xem CMS v1 có gồm truyện hay không.
console.log("\n=== storyData.js (truyện — KHÔNG nằm trong curriculum.js) ===");
const storyMod = await import("../client/src/data/storyData.js");
const storyKey = Object.keys(storyMod).find((k) => storyMod[k] != null);
const stories = storyMod[storyKey];
console.log(`  export: ${Object.keys(storyMod).join(", ")}`);
if (Array.isArray(stories)) {
  console.log(`  ${stories.length} truyện`);
  console.log(
    `  khoá mỗi truyện: ${Object.keys(stories[0] ?? {})
      .sort()
      .join(", ")}`,
  );
} else {
  console.log(
    `  kiểu: ${typeof stories} · khoá: ${Object.keys(stories ?? {}).join(", ")}`,
  );
}
