/**
 * SOÁT NỘI DUNG TRÙNG LẶP — cả 5 lớp. Chạy: `node scratch/soat-trung-lap-noi-dung.mjs`
 *
 * VÌ SAO CÓ FILE NÀY. Người dùng gửi ảnh slide "Làm quen" của Lớp 1 Bài 1 và chỉ đúng chỗ sai:
 * trong cùng một slide, **ô nhấn mạnh `rule`** và **danh sách `points`** nói y hệt một nội dung
 * (bốn biểu tượng), rồi **slide sau** lại kể lại lần thứ ba bằng một cái bảng. Ba lần một thông tin.
 *
 * Đây là lỗi HỌ, không phải lỗi một slide: dữ liệu do người viết tay nên rất dễ lặp. Mắt người
 * đọc 2 814 slide thì không soi hết được, nên soi bằng máy.
 *
 * CÁCH SOI: gom mọi "khối chữ" của slide thành các NHÓM TỪ (bỏ emoji, dấu câu, từ dừng), rồi đo
 * **độ bao phủ** `|A ∩ B| / min(|A|, |B|)` — nhỏ hơn 1 nghĩa là một khối nằm gọn trong khối kia.
 *
 * HAI LOẠI CA:
 *   A. TRONG CÙNG SLIDE — hai khối chữ khác nhau nói cùng một điều (rule ↔ points, explanation ↔ rule,
 *      bảng ↔ points…). Ngưỡng 0,80.
 *   B. HAI SLIDE LIỀN NHAU — slide sau nhắc lại gần hết nội dung slide trước. Ngưỡng 0,85.
 *
 * MIỄN TRỪ CÓ LÝ DO (đừng "sửa" những thứ này):
 *   • Slide `quiz`: câu hỏi LUÔN nhắc lại từ ngữ của bài — đó là cách ôn, không phải lỗi.
 *   • Slide `summary`: nhiệm vụ của nó CHÍNH LÀ nhắc lại bài.
 *   • Cặp nằm cạnh nhau trong CÙNG một slide mà một bên là `example` (ví dụ áp dụng công thức vừa nêu).
 *
 * Mã thoát: 0 = sạch, 1 = có ca nghi ngờ.
 */
const SOURCES = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

/** Từ dừng tiếng Việt hay gặp trong đề bài — bỏ đi để phép so không bị "nhiễu vì chữ chung". */
const STOPWORDS = new Set(
  `và là của có cho các một hai ba những được trong với thì mà này đó khi như bé em mình ta
   sẽ hãy cùng nhau rồi thì ở trên dưới vào ra tới theo về bằng hay hoặc nếu thêm bớt số
   bài học tập làm đi giúp bạn cô chú ạ nhé đấy vậy nên rất hơn nhất mỗi cả toàn bộ
   ${"mấy bao nhiêu thế nào gì đâu đây kia ấy nó họ chúng"}
    `.split(/\s+/),
);

/**
 * Chuẩn hoá một chuỗi thành MẢNG TỪ để so khớp.
 * Bỏ emoji/cặp surrogate, bỏ dấu câu, gộp khoảng trắng, tách từ theo khoảng trắng.
 */
function toWordSet(text) {
  const cleaned = String(text ?? "")
    // Bỏ emoji (mọi code point ngoài BMP = 2 đơn vị UTF-16).
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, " ")
    // Bỏ ký tự trang trí, dấu câu, gạch phân cách.
    .replace(/[·•∙▪✔⭐★☆→←↑↓=+×÷:;,."“”'’()[\]{}/\\|_\-–—…%!?]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return new Set();
  const words = cleaned
    .split(" ")
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
  return new Set(words);
}

/** Độ bao phủ: phần nhỏ hơn nằm trong phần lớn bao nhiêu. */
function coverage(a, b) {
  if (!a.size || !b.size) return 0;
  let hit = 0;
  for (const w of a) if (b.has(w)) hit++;
  return hit / Math.min(a.size, b.size);
}

/**
 * Gom mọi khối chữ của MỘT slide thành danh sách {name, text, kind}.
 * `kind` dùng để miễn trừ: "example" không tính là trùng với công thức đi kèm.
 */
function collectBlocks(slide) {
  const c = slide?.content ?? {};
  const blocks = [];
  const push = (name, text, kind = "text") => {
    const value = Array.isArray(text) ? text.flat().join(" · ") : text;
    if (typeof value !== "string" || !value.trim()) return;
    blocks.push({ name, text: value, kind, words: toWordSet(value).size });
  };

  push("title", c.title);
  push("explanation", c.explanation, "example");
  push("rule", c.rule);
  push("text", c.text);
  push("question", c.question, "quiz");
  push("example", c.example?.text || c.example?.explanation, "example");
  if (Array.isArray(c.points)) push("points", c.points.join(" · "));
  if (Array.isArray(c.steps))
    push(
      "steps",
      c.steps.map((s) => `${s.title ?? ""} ${s.desc ?? ""}`).join(" · "),
      "steps",
    );
  if (Array.isArray(c.items))
    push(
      "items",
      c.items.map((i) => i.emoji ?? i.label ?? "").join(" "),
      "emoji",
    );
  if (c.table) {
    const rows = (c.table.rows ?? []).map((r) =>
      Array.isArray(r) ? r.join(" ") : r,
    );
    // KHÔNG lấy `table.label` vào phép so: chú thích dưới hình vốn ĐƯỢC PHÉP nhắc lại
    // tiêu đề slide (nó là nhãn của hình, không phải nội dung thứ hai).
    push(
      "table",
      [c.table.headers?.join(" "), ...rows].filter(Boolean).join(" "),
    );
  }
  if (c.bangTinh) {
    const rows = (c.bangTinh.rows ?? []).flat();
    push(
      "bangTinh",
      [c.bangTinh.headers?.join(" "), ...rows].filter(Boolean).join(" "),
    );
  }
  if (Array.isArray(c.gallery))
    push(
      "gallery",
      c.gallery.map((g) => `${g.label ?? ""} ${g.timeText ?? ""}`).join(" · "),
    );
  if (Array.isArray(c.activityGrid))
    push(
      "activityGrid",
      c.activityGrid.map((g) => `${g.title ?? ""} ${g.desc ?? ""}`).join(" · "),
    );
  if (Array.isArray(c.dialogue))
    push("dialogue", c.dialogue.map((d) => d.text ?? "").join(" · "));
  if (c.dialogue && !Array.isArray(c.dialogue))
    push("dialogue", c.dialogue.text ?? "");
  return blocks;
}

/** Toàn bộ chữ của một slide (dùng cho phép so giữa hai slide liền nhau). */
function fullText(slide) {
  return collectBlocks(slide)
    .map((b) => b.text)
    .join(" · ");
}

const WITHIN_MIN = 0.8;
const BETWEEN_MIN = 0.85;

const within = [];
const between = [];
let slidesSeen = 0;

for (const [file, key, grade] of SOURCES) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const data = mod[key];
  for (const chapter of data?.chapters ?? []) {
    for (const lesson of chapter.lessons ?? []) {
      const slides = lesson.slides ?? [];
      slidesSeen += slides.length;

      // A. Hai khối chữ khác nhau TRONG cùng một slide.
      slides.forEach((slide, si) => {
        if (slide.type === "quiz") return; // câu hỏi cố ý nhắc lại từ ngữ của bài
        const blocks = collectBlocks(slide);
        for (let i = 0; i < blocks.length; i++) {
          for (let j = i + 1; j < blocks.length; j++) {
            const a = blocks[i];
            const b = blocks[j];
            if (a.kind === "example" || b.kind === "example") continue;
            if (a.kind === "emoji" || b.kind === "emoji") continue;
            // 🔴 BÁO OAN ĐÃ GẶP: `title` chỉ 2 từ ("Hình vuông") nằm gọn trong `points` 6 từ
            // ⇒ bao phủ 1.00 nhưng đó là TIÊU ĐỀ, không ai gọi là trùng lặp. Tương tự với
            // `text` ngắn dưới 4 từ. Chỉ so khi CẢ HAI bên có ≥ 4 từ thật.
            if (a.words < 4 || b.words < 4) continue;
            const score = coverage(toWordSet(a.text), toWordSet(b.text));
            if (score >= WITHIN_MIN) {
              within.push({
                grade,
                lesson: lesson.id,
                slide: si + 1,
                type: slide.type,
                pair: `${a.name} ↔ ${b.name}`,
                score: score.toFixed(2),
                sample: `${a.name}: ${a.text.slice(0, 70)}`,
              });
            }
          }
        }
      });

      // B. Slide sau nhắc lại gần hết slide trước.
      for (let si = 1; si < slides.length; si++) {
        const prev = slides[si - 1];
        const cur = slides[si];
        if (prev.type === "summary" || cur.type === "summary") continue;
        if (prev.type === "quiz" || cur.type === "quiz") continue;
        const a = toWordSet(fullText(prev));
        const b = toWordSet(fullText(cur));
        if (a.size < 6 || b.size < 6) continue; // quá ít chữ thì phép so vô nghĩa
        const score = coverage(a, b);
        if (score >= BETWEEN_MIN) {
          between.push({
            grade,
            lesson: lesson.id,
            slides: `${si}/${si + 1}`,
            types: `${prev.type} → ${cur.type}`,
            score: score.toFixed(2),
            sample: `TRƯỚC [${prev.type}] ${fullText(prev).slice(0, 60)}\n      SAU   [${cur.type}] ${fullText(cur).slice(0, 60)}`,
          });
        }
      }
    }
  }
}

/** In bảng đếm theo CẶP KHỐI (đọc nhanh được quy mô từng họ lỗi). */
const groupCount = (rows, pick) => {
  const map = new Map();
  for (const r of rows) {
    const k = pick(r);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
};

console.log(`Đã soi ${slidesSeen} slide.`);

console.log(
  `\n--- A. TRÙNG TRONG CÙNG SLIDE (bao phủ ≥ ${WITHIN_MIN}): ${within.length} ca ---`,
);
for (const [pair, n] of groupCount(within, (r) => r.pair)) {
  console.log(`   ${String(n).padStart(4)} × ${pair}`);
}

console.log(
  `\n--- B. TRÙNG GIỮA HAI SLIDE LIỀN NHAU (bao phủ ≥ ${BETWEEN_MIN}): ${between.length} ca ---`,
);
for (const [pair, n] of groupCount(between, (r) => r.types)) {
  console.log(`   ${String(n).padStart(4)} × ${pair}`);
}

/** In chi tiết một nhóm ca (để người đọc tự phán đoán đúng/sai). */
const printDetail = (title, rows) => {
  console.log(`\n=== ${title} — ${rows.length} ca ===`);
  for (const r of rows) {
    console.log(
      `  · Lớp ${r.grade} ${r.lesson} slide ${r.slide ?? r.slides} [${r.type ?? r.types}] ` +
        `${r.pair ?? ""} điểm=${r.score}\n      ${r.sample}`,
    );
  }
};

// Chi tiết hai họ ĐÁNG SỬA NHẤT: ô nhấn mạnh lặp lại danh sách, và bảng lặp lại dòng chữ.
printDetail(
  "A1. `rule` ↔ `points` (ô nhấn mạnh nhắc lại y hệt danh sách — đúng lỗi trong ảnh người dùng gửi)",
  within.filter((r) => r.pair === "rule ↔ points"),
);
printDetail(
  "A2. `points`/`explanation` ↔ `table` (bảng lặp lại nội dung vừa nêu)",
  within.filter((r) => r.pair.includes("table")),
);
printDetail("B. Slide liền nhau", between);

const total = within.length + between.length;
console.log(`\nTỔNG: ${total} ca nghi trùng lặp.`);
process.exit(total ? 1 : 0);
