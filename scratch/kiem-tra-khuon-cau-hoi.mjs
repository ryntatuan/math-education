// Kiểm từng "khuôn" sinh câu hỏi của phần Luyện tập.
//
// 🔴 VÌ SAO CẦN. `buildQuestion()` là một chuỗi `if (topic === "...")` dài. Một chủ
// đề có trong `TOPICS` nhưng THIẾU nhánh `if` sẽ rơi xuống câu dự phòng ở cuối hàm —
// và câu dự phòng đó là một câu CỐ ĐỊNH. Hậu quả: bé chọn chủ đề đó thì nhận đúng
// MỘT câu hỏi lặp lại mãi, không có lỗi nào hiện ra. Grep không đủ tin để khẳng định
// (nhánh có thể nằm ở chỗ khác), nên phải SINH THẬT rồi đo.
//
// CÁCH DÙNG:  node scratch/kiem-tra-khuon-cau-hoi.mjs
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = path.join(ROOT, "client", "src", "utils", "exerciseGenerator.js");

const { TOPICS, generateQuestion } = await import(pathToFileURL(TARGET).href);

const FALLBACK_HINT = "Cộng từng hàng một, bắt đầu từ hàng đơn vị!"; // câu dự phòng CUỐI của buildQuestion
const SAMPLE_SIZE = 60;

// ⚠️ ĐO THEO CẢ CÂU, KHÔNG CHỈ CHUỖI `question`.
// Đã mắc báo động giả: `g1_shapes` luôn hỏi "Hình dưới đây là hình gì?" nhưng
// `visualDisplay` và `answer` đổi theo 4 hình ⇒ ngân hàng câu hỏi vẫn CÓ 4 biến thể.
// Chỉ đếm chuỗi `question` thì khuôn này bị báo "1/60" oan.
const identityOf = (q) =>
  `${q.question}|${q.answer}|${q.visualDisplay ?? ""}`;

let templateCount = 0;
const broken = [];
const thin = [];

for (const [groupKey, templates] of Object.entries(TOPICS)) {
  const grade = Number(groupKey.replace("GRADE_", ""));
  console.log(`\n── Lớp ${grade} (${groupKey}) — ${templates.length} chủ đề ──`);

  for (const t of templates) {
    templateCount++;
    const samples = Array.from({ length: SAMPLE_SIZE }, () =>
      generateQuestion(grade, t.id),
    );
    const distinctVariants = new Set(samples.map(identityOf)).size;
    const fallbackCount = samples.filter(
      (q) => q.hint === FALLBACK_HINT,
    ).length;
    const badRefCount = samples.filter(
      (q) => q.ref !== `tmpl:${t.id}` || q.topic !== t.id,
    ).length;
    const missingKeyCount = samples.filter(
      (q) => !q.question || !Array.isArray(q.options) || !q.options.length,
    ).length;
    // Lựa chọn TRÙNG NHAU: bé thấy hai ô giống hệt nhau. Không làm app sập nhưng là
    // lỗi nhìn thấy được. `generateOptions` dùng `Set` nên tự nó không sinh trùng —
    // nhưng `.map(Math.max(1, x))` ở vài nhánh mới CÓ THỂ kéo hai giá trị về cùng một
    // số. Đo để biết chứ không suy luận.
    const duplicateOptionCount = samples.filter(
      (q) => new Set(q.options.map(String)).size !== q.options.length,
    ).length;

    // HỎNG = có bằng chứng sai (rơi vào câu dự phòng, ref lệch, thiếu khoá) hoặc
    // ngân hàng chỉ có ĐÚNG MỘT biến thể ⇒ bé gặp lại y hệt câu cũ mãi.
    const isBroken =
      fallbackCount > 0 ||
      badRefCount > 0 ||
      missingKeyCount > 0 ||
      duplicateOptionCount > 0 ||
      distinctVariants === 1;
    // MỎNG = có biến thể nhưng quá ít (2–6) ⇒ bấm vài lần là gặp lại câu cũ.
    const isThin = !isBroken && distinctVariants <= 6;

    console.log(
      `  ${isBroken ? "HONG" : isThin ? "mong" : "ok  "} ${t.id.padEnd(22)}` +
        ` biến thể: ${String(distinctVariants).padStart(2)}/${SAMPLE_SIZE}` +
        `  rơi-cuối: ${fallbackCount}` +
        (badRefCount ? `  ref-sai: ${badRefCount}` : "") +
        (missingKeyCount ? `  thiếu-khoá: ${missingKeyCount}` : "") +
        (duplicateOptionCount ? `  LỰA CHỌN TRÙNG: ${duplicateOptionCount}` : "") +
        `  [${t.chapter}] ${t.name}`,
    );

    if (isBroken)
      broken.push({ grade, id: t.id, name: t.name, distinctVariants, fallbackCount });
    else if (isThin)
      thin.push({ grade, id: t.id, name: t.name, distinctVariants });
  }
}

console.log(`\n${"═".repeat(74)}`);
console.log(
  `TỔNG: ${templateCount} khuôn · ${broken.length} HỎNG · ${thin.length} quá mỏng`,
);
if (broken.length) {
  console.log(`\nKhuôn HỎNG:`);
  for (const b of broken)
    console.log(
      `  Lớp ${b.grade} · ${b.id.padEnd(22)} — ${b.distinctVariants}/${SAMPLE_SIZE} biến thể` +
        (b.fallbackCount
          ? ` · RƠI VÀO CÂU DỰ PHÒNG ${b.fallbackCount}/${SAMPLE_SIZE} lần`
          : "") +
        ` · "${b.name}"`,
    );
}
if (thin.length) {
  console.log(`\nKhuôn quá mỏng (2–6 biến thể):`);
  for (const s of thin)
    console.log(
      `  Lớp ${s.grade} · ${s.id.padEnd(22)} — ${s.distinctVariants} biến thể · "${s.name}"`,
    );
}

// ── Phép thử "sinh câu KHÔNG chọn chủ đề" ─────────────────────────────────
// `PracticePage` truyền topic, nhưng `ChallengePage` và 6 mini game gọi
// `generateQuestion(grade)` KHÔNG có topic — đường mã đó chưa được phép đo trên
// kiểm ở trên. Cộng thêm một `id` lạ (mô phỏng lịch sử cũ còn sót) để chắc lưới
// an toàn không ném lỗi và không trả câu thiếu khoá.
const { generateCalculation } = await import(pathToFileURL(TARGET).href);
const smokeErrors = [];
let smokeCount = 0;
// `generateQuestion` trả đủ 5 khoá.
const requiredKeys = ["question", "options", "answer", "hint", "explanation"];
// ⚠️ `generateCalculation` (6 mini game dùng) CỐ Ý chỉ trả 3 khoá — game chỉ cần
// câu hỏi, lựa chọn và đáp án. Đòi `hint`/`explanation` ở đây là BÁO ĐỘNG GIẢ:
// lần chạy đầu tôi đòi đủ 5 khoá và nhận về 1000 "lỗi" không tồn tại.
const calcKeys = ["question", "options", "answer"];

for (let grade = 1; grade <= 5; grade++) {
  for (let i = 0; i < 300; i++) {
    try {
      const q = generateQuestion(grade);
      const missing = requiredKeys.filter((k) => q?.[k] === undefined);
      if (missing.length)
        smokeErrors.push(`lớp ${grade} (không topic): thiếu ${missing.join(",")}`);
      smokeCount++;
    } catch (e) {
      smokeErrors.push(`lớp ${grade} (không topic): NÉM LỖI ${e.message}`);
    }
  }
  for (let i = 0; i < 200; i++) {
    try {
      const q = generateCalculation(grade);
      const missing = calcKeys.filter((k) => q?.[k] === undefined);
      if (missing.length)
        smokeErrors.push(`lớp ${grade} (tính toán): thiếu ${missing.join(",")}`);
      smokeCount++;
    } catch (e) {
      smokeErrors.push(`lớp ${grade} (tính toán): NÉM LỖI ${e.message}`);
    }
  }
}

// `id` không còn tồn tại (bài cũ trong Sổ Tay Ôn Bài Sai) — phải rơi xuống lưới an toàn.
for (const oldId of ["g1_add_sub_20", "g2_mul_3x", "g9_khong_ton_tai", ""]) {
  for (let i = 0; i < 20; i++) {
    try {
      const q = generateQuestion(3, oldId);
      if (!q?.question || !Array.isArray(q.options) || !q.options.length)
        smokeErrors.push(`id lạ "${oldId}": câu thiếu khoá`);
      smokeCount++;
    } catch (e) {
      smokeErrors.push(`id lạ "${oldId}": NÉM LỖI ${e.message}`);
    }
  }
}

console.log(
  `\nPHÉP THỬ SINH CÂU: ${smokeCount} câu · ${
    smokeErrors.length ? `${smokeErrors.length} LỖI` : "không lỗi"
  }`,
);
for (const e of [...new Set(smokeErrors)].slice(0, 10)) console.log(`  ${e}`);
