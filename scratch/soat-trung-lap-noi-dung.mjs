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
 * 🔴 BA LUẬT ĐÃ NÂNG Ở ĐỢT 4 (2026-09-29) — sau khi người dùng hỏi “399 ca trùng lặp là ca gì?”
 *    và hoá ra phần lớn KHÔNG phải lỗi trẻ nhìn thấy:
 *   1. CHỈ SO CHỮ TRẺ THẬT SỰ NHÌN THẤY. Trước đây cổng so trên dữ liệu thô, nên nó báo cả
 *      những dòng mà app **tự bỏ lúc vẽ** (`slideDedupe.planVisualText` bỏ dòng hình đã nói lại;
 *      `planConceptText` ẩn ô ⭐ khi danh sách đã chứa trọn). Đo được: 122 dòng bị bỏ + 162 tiêu
 *      đề lấy từ nhãn hình trên 1375 slide “Quan sát”. Nay cổng gọi chính hai hàm đó ⇒ số ca
 *      `text ↔ table` và `rule ↔ points` phản ánh đúng cái bé đọc hai lần.
 *   2. KHÔNG SO CẶP CÓ `title`. Tiêu đề chỉ 4–6 từ nằm gọn trong danh sách là chuyện đương nhiên
 *      (bao phủ 1,00 nhưng không ai gọi là trùng) — trước đây luật chỉ loại tiêu đề < 4 từ nên còn
 *      **92 ca `title ↔ points`** báo oan.
 *   3. NHÓM B ĐO BẰNG “NHẮC LẠI NGUYÊN DÒNG”, không bằng tập từ. Hai slide liền nhau của cùng
 *      một chủ đề đương nhiên dùng chung từ (“kim ngắn”, “kim dài”, “giờ”, “phút”) nên tập từ đạt
 *      0,85–1,00 mà hai slide KHÔNG hề nói lại câu nào (đo thật: `g1-c9-l1` slide 8→9). Nay chỉ
 *      tính khi một DÒNG (≥ 4 từ) xuất hiện nguyên văn ở slide liền kề.
 *
 * CANARY: cổng tự kiểm hai vế trước khi quét — (1) ca lặp CỐ Ý phải bị bắt, (2) ca chỉ chung từ
 * vựng KHÔNG được bắt. Canary hỏng ⇒ mã thoát 2 (cổng mất tác dụng, đừng tin kết quả xanh).
 *
 * Mã thoát: 0 = sạch, 1 = có ca nghi ngờ, 2 = canary hỏng.
 *
 * ⚠️ Muốn ghi kết quả ra file thì dùng `node scratch/chay-ghi-utf8.mjs scratch/soat-trung-lap-noi-dung.mjs`
 *    — `>` của PowerShell làm hỏng encoding hai lớp (đã mắc thật).
 */
import {
  planConceptText,
  planVisualText,
} from "../client/src/pages/lesson/slideDedupe.js";
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

/** Số từ tối thiểu của một DÒNG để được coi là “nói lại” (dòng ngắn trùng nhau là bình thường). */
const MIN_DONG = 4;

/**
 * Chuẩn hoá MỘT DÒNG nhưng GIỮ NGUYÊN THỨ TỰ TỪ — dùng để so “nhắc lại nguyên dòng”.
 * (Khác `toWordSet`: hàm này KHÔNG bỏ từ dừng và KHÔNG gom thành tập, vì “nói lại” phải là
 * cùng một câu.)
 */
function normLine(text) {
  return String(text ?? "")
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, " ")
    .replace(/[·•∙▪✔⭐★☆→←↑↓=+×÷:;,.\"“”'’()[\]{}|_\-–—…%!?/\\]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
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

  /**
   * 🔴 LUẬT 1 (đợt 4): CHỈ GOM CHỮ TRẺ THẬT SỰ NHÌN THẤY.
   *  • `concept`: ô ⭐ bị app ẩn (`showRule === false`) thì KHÔNG tính; câu giải thích bị ẩn cũng vậy.
   *  • `visual` : `text` được app cắt bớt theo `planVisualText` ⇒ mỗi DÒNG CÒN LẠI là một khối.
   */
  const laConcept = Boolean(c.rule || c.explanation);
  const planConcept = laConcept ? planConceptText(c) : null;
  const planVisual = slide?.type === "visual" ? planVisualText(c) : null;

  push("title", c.title);
  if (c.explanation && (planConcept ? planConcept.showExplanation : true))
    push("explanation", c.explanation, "example");
  if (c.rule && (planConcept ? planConcept.showRule : true))
    push("rule", c.rule);
  if (planVisual) {
    // Dòng đầu của slide “Quan sát” CHÍNH LÀ TIÊU ĐỀ (hoặc nhãn hình được nâng lên làm tiêu đề)
    // ⇒ đặt tên `title` để được miễn trừ giống tiêu đề, không bị so như một khối nội dung.
    push("title", planVisual.title);
    // Các dòng còn lại là TỪNG DÒNG RIÊNG (`kind: "line"`): hai dòng của cùng một danh sách
    // phải LẶP NGUYÊN VĂN mới gọi là trùng (xem `caTrongSlide`), vì các bước “1) … 2) … 3) …”
    // đương nhiên dùng chung từ vựng mà không hề trùng nhau.
    for (const dong of planVisual.steps) push("dòng dưới hình", dong, "line");
  } else {
    push("text", c.text);
  }
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

/**
 * CÁC DÒNG của một slide — đã áp luật hiển thị, đã chuẩn hoá, bỏ dòng < `MIN_DONG` từ.
 * Mỗi khối chữ có thể chứa nhiều dòng (ngăn bằng xuống dòng hoặc dấu `·`).
 */
function linesOf(slide) {
  const ra = [];
  for (const b of collectBlocks(slide)) {
    for (const dong of String(b.text).split(/\n|·/)) {
      const sach = normLine(dong);
      if (!sach) continue;
      if (sach.split(" ").filter((w) => w.length > 1).length < MIN_DONG)
        continue;
      ra.push({ name: b.name, sach, goc: dong.trim() });
    }
  }
  return ra;
}

/** Các DÒNG xuất hiện NGUYÊN VĂN ở cả hai slide (≥ `MIN_DONG` từ). */
function dongLap(prev, cur) {
  const truoc = new Set(linesOf(prev).map((d) => d.sach));
  return linesOf(cur).filter((d) => truoc.has(d.sach));
}

/**
 * CA TRÙNG TRONG **MỘT** SLIDE — tách thành hàm để dùng cho cả lượt quét LẪN canary.
 * LUẬT 2 (đợt 4): bỏ mọi cặp có `title` — tiêu đề nằm gọn trong danh sách là chuyện đương nhiên.
 */
function caTrongSlide(slide) {
  const ra = [];
  if (slide?.type === "quiz") return ra; // câu hỏi cố ý nhắc lại từ ngữ của bài
  const blocks = collectBlocks(slide);
  for (let i = 0; i < blocks.length; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      const a = blocks[i];
      const b = blocks[j];
      if (a.name === "title" || b.name === "title") continue;
      if (a.kind === "example" || b.kind === "example") continue;
      if (a.kind === "emoji" || b.kind === "emoji") continue;
      /**
       * HAI DÒNG của cùng một danh sách ⇒ phải LẶP NGUYÊN VĂN mới tính.
       * 🔴 BÁO OAN ĐÃ GẶP (đo 2026-09-29): cặp “1) hàng đơn vị 0 < 5 nên mượn 1: 10 − 5 = 5,
       * viết 5” với “2) hàng chục 0 < 5 nên mượn 1: 10 − 5 = 5, viết 5” đạt bao phủ 0,80 chỉ vì
       * phép so bỏ số thứ tự và dấu câu ⇒ **16 ca báo oan** ở Lớp 1 và Lớp 3.
       */
      if (a.kind === "line" && b.kind === "line") {
        if (normLine(a.text) && normLine(a.text) === normLine(b.text))
          ra.push({
            pair: `${a.name} ↔ ${b.name}`,
            score: "1.00",
            sample: `lặp nguyên dòng: ${a.text.slice(0, 70)}`,
          });
        continue;
      }
      if (a.words < 4 || b.words < 4) continue;
      const score = coverage(toWordSet(a.text), toWordSet(b.text));
      if (score >= WITHIN_MIN)
        ra.push({
          pair: `${a.name} ↔ ${b.name}`,
          score: score.toFixed(2),
          sample: `${a.name}: ${a.text.slice(0, 70)}`,
        });
    }
  }
  return ra;
}

const WITHIN_MIN = 0.8;

/**
 * CANARY — CHỨNG MINH CỔNG KHÔNG BỊ LÀM CÂM VÀ KHÔNG BÁO OAN (bài học đợt 4: một cổng “xanh”
 * có thể chỉ là cổng đã bị làm câm). Canary có HAI vế, thiếu vế nào cũng vô nghĩa:
 *   (1) ca lặp CỐ Ý phải BỊ BẮT;
 *   (2) ca chỉ CHUNG TỪ VỰNG phải KHÔNG bị bắt.
 */
function chayCanary() {
  const loi = [];

  // (1a) Trong cùng slide: ô ⭐ gần trùng danh sách MÀ app vẫn hiện ⇒ phải bắt.
  //      ⚠️ Cố ý để danh sách THIẾU một từ của ô ⭐ (“đúng”): nếu danh sách chứa TRỌN thì app
  //      ẩn ô ⭐ (đúng như thiết kế) và cổng KHÔNG được phép bắt ca đó.
  const caA = caTrongSlide({
    type: "concept",
    content: {
      title: "Canary",
      rule: "Đặt tính thẳng cột rồi cộng từ phải sang trái cho đúng.",
      points: [
        "Đặt tính thẳng cột, cộng từ phải sang trái.",
        "Nhớ cộng số nhớ sang hàng kế tiếp.",
      ],
    },
  });
  if (!caA.length) loi.push("canary A: slide cố ý lặp mà cổng KHÔNG bắt được");

  // (1b) Hai slide liền nhau: câu sau NHẮC LẠI NGUYÊN một dòng ⇒ phải bắt.
  const caB = dongLap(
    {
      type: "visual",
      content: { text: "Kim ngắn chỉ số 9, kim dài chỉ số 12" },
    },
    {
      type: "visual",
      content: { text: "Kim ngắn chỉ số 9, kim dài chỉ số 12" },
    },
  );
  if (!caB.length)
    loi.push("canary B: dòng lặp nguyên văn mà cổng KHÔNG bắt được");

  // (2a) Tiêu đề nằm gọn trong danh sách ⇒ KHÔNG được bắt (đây là ca báo oan cũ).
  const caTitle = caTrongSlide({
    type: "concept",
    content: {
      title: "Hình vuông có bốn cạnh bằng nhau",
      points: [
        "Hình vuông có bốn cạnh bằng nhau.",
        "Hình vuông có bốn góc vuông.",
      ],
    },
  });
  const coTitle = caTitle.some((r) => r.pair.includes("title"));
  if (coTitle)
    loi.push("canary âm A: vẫn báo cặp có `title` ⇒ luật lọc không chạy");

  // (2b) Hai slide CHUNG TỪ VỰNG nhưng khác câu ⇒ KHÔNG được bắt (ca báo oan cũ của nhóm B).
  const caChungTu = dongLap(
    {
      type: "visual",
      content: {
        text: "Bảng nhớ nhanh — mặt đồng hồ\n· Bé nhìn kim ngắn trước, rồi đến kim dài",
      },
    },
    {
      type: "visual",
      content: {
        text: "Kim ngắn chỉ số 9, kim dài chỉ số 12\nKim ngắn → giờ\nKim dài → phút",
      },
    },
  );
  if (caChungTu.length)
    loi.push("canary âm B: bắt oan hai slide chỉ chung từ vựng (khác câu)");

  return loi;
}

const within = [];
const between = [];
/** Nhóm B ở mức CẢNH BÁO (khuôn luyện tập dùng lại một dòng) — in ra nhưng không tính là lỗi. */
const canhBao = [];
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

      // A. Hai khối chữ khác nhau TRONG cùng một slide (đã áp luật hiển thị).
      slides.forEach((slide, si) => {
        for (const r of caTrongSlide(slide)) {
          within.push({
            grade,
            lesson: lesson.id,
            slide: si + 1,
            type: slide.type,
            ...r,
          });
        }
      });

      // B. Slide sau NHẮC LẠI NGUYÊN MỘT DÒNG của slide trước (LUẬT 3, đợt 4).
      for (let si = 1; si < slides.length; si++) {
        const prev = slides[si - 1];
        const cur = slides[si];
        if (prev.type === "summary" || cur.type === "summary") continue;
        if (prev.type === "quiz" || cur.type === "quiz") continue;
        const lap = dongLap(prev, cur);
        if (!lap.length) continue;
        /**
         * 🔴 PHÂN HAI MỨC (đợt 4). Đo thật 2026-09-29: **33 ca** nhắc lại nguyên dòng, nhưng
         * gần hết là THIẾT KẾ, không phải lỗi:
         *   • tiêu đề slide trước được dùng lại làm tiêu đề slide sau (`g2-c1-l5`, `g5-c2-l4`…);
         *   • khuôn luyện tập dùng lại CÙNG dòng thủ tục, chỉ đổi số (`g2-c2-l3`: “2) còn nhớ 1 ở
         *     hàng cao hơn, viết 1” lặp trên 5 slide liền nhau);
         *   • slide “bé tự làm” nhắc lại các bước của slide ví dụ ngay trước (`g2-c4-l2`);
         *   • câu kết giống nhau vì cùng một phép tính (`g2-c1-l5`: “Vậy 35 + 24 = 59.”).
         * ⇒ CHỈ coi là ĐÁNG SỬA khi slide sau lặp gần hết slide trước (≥ 2 dòng VÀ ≥ 80% số dòng
         * của slide ít dòng hơn) — đó mới là hai slide trùng nhau thật. Còn lại là CẢNH BÁO, vẫn in
         * ra cho người đọc tự xem, nhưng KHÔNG làm cổng đỏ.
         */
        const itDong = Math.min(linesOf(prev).length, linesOf(cur).length);
        if (lap.length >= 2 && itDong > 0 && lap.length / itDong >= 0.8) {
          between.push({
            grade,
            lesson: lesson.id,
            slides: `${si}/${si + 1}`,
            types: `${prev.type} → ${cur.type}`,
            score: String(lap.length),
            sample: `LẶP NGUYÊN DÒNG: ${lap
              .map((d) => `“${d.goc.slice(0, 60)}”`)
              .join(" · ")}`,
          });
          continue;
        }
        canhBao.push({
          grade,
          lesson: lesson.id,
          slides: `${si}/${si + 1}`,
          types: `${prev.type} → ${cur.type}`,
          score: String(lap.length),
          sample: `LẶP NGUYÊN DÒNG: ${lap
            .map((d) => `“${d.goc.slice(0, 60)}”`)
            .join(" · ")}`,
        });
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

/**
 * CANARY CHẠY TRƯỚC — canary hỏng thì DỪNG NGAY (mã thoát 2): một cổng bị làm câm mà vẫn in
 * “0 ca trùng lặp” là kiểu sai tệ nhất (đã mắc: cổng xanh giả).
 */
const loiCanary = chayCanary();
if (loiCanary.length) {
  console.log("❌ CANARY HỎNG — đừng tin kết quả bên dưới:");
  for (const l of loiCanary) console.log(`   • ${l}`);
  process.exit(2);
}

console.log(`Đã soi ${slidesSeen} slide.`);
console.log(
  "✅ Canary: ca lặp CỐ Ý vẫn bị bắt · ca chỉ chung từ vựng KHÔNG bị bắt oan",
);

console.log(
  `\n--- A. TRÙNG TRONG CÙNG SLIDE (bao phủ ≥ ${WITHIN_MIN}): ${within.length} ca ---`,
);
for (const [pair, n] of groupCount(within, (r) => r.pair)) {
  console.log(`   ${String(n).padStart(4)} × ${pair}`);
}

console.log(
  `\n--- B. NHẮC LẠI NGUYÊN DÒNG GIỮA HAI SLIDE LIỀN NHAU: ${between.length} ca ---`,
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
/**
 * A3 — PHẦN CÒN LẠI CỦA NHÓM A. Trước đây cổng chỉ in TỔNG số của nhóm này trong bảng đếm
 * (ví dụ “92 × title ↔ points”) mà KHÔNG in ca cụ thể ⇒ người đọc không thể tự phán đoán.
 * Đã xảy ra thật: tôi báo “399 ca trùng lặp” mà không giải thích được 115 ca này là gì.
 */
printDetail(
  "A3. Các cặp còn lại trong cùng slide (vd `title` ↔ `points`) — ít nghiêm trọng, xem kĩ trước khi sửa",
  within.filter((r) => r.pair !== "rule ↔ points" && !r.pair.includes("table")),
);
printDetail("B. Slide liền nhau (lặp gần hết slide trước)", between);

if (canhBao.length) {
  console.log(
    `\n--- ⚠️ CẢNH BÁO — KHÔNG tính là lỗi: ${canhBao.length} ca nhắc lại MỘT dòng giữa hai slide liền nhau ---`,
  );
  console.log(
    "   Lý do xếp vào đây: khuôn luyện tập dùng lại cùng dòng thủ tục (chỉ đổi số), tiêu đề slide\n" +
      "   trước được dùng lại làm tiêu đề slide sau, slide “bé tự làm” nhắc lại bước của slide ví dụ,\n" +
      "   hoặc câu kết giống nhau vì cùng một phép tính. Muốn bắt lỗi “hai slide trùng nhau” thì luật\n" +
      "   đòi ≥ 2 dòng lặp VÀ ≥ 80% số dòng của slide ít dòng hơn.",
  );
  for (const r of canhBao) {
    console.log(
      `  · Lớp ${r.grade} ${r.lesson} slide ${r.slides} [${r.types}] ĐIỂM=${r.score}`,
    );
    console.log(`      ${r.sample}`);
  }
}

const total = within.length + between.length;
console.log(
  `\nTỔNG CẦN SỬA: ${total} ca (A ${within.length} · B ${between.length})` +
    ` · CẢNH BÁO thêm: ${canhBao.length} ca (không tính vào mã thoát).`,
);
process.exit(total ? 1 : 0);
