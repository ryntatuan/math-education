/**
 * Bộ kiểm tra nội dung bài học — Giai đoạn 3a.
 *
 * VÌ SAO CẦN: nội dung bài học sắp được đưa từ file tĩnh vào DB. Một khi admin sửa
 * được bằng giao diện, nội dung sẽ hỏng dần theo thời gian — thiếu khoá, sai kiểu,
 * đáp án không nằm trong lựa chọn. Những lỗi đó KHÔNG làm app sập; chúng chỉ làm
 * một slide hiện sai hoặc không chấm được, và không ai biết cho tới khi có phụ
 * huynh phàn nàn. Nên phải chặn ở lúc GHI, không phải lúc đọc.
 *
 * DÙNG Ở ĐÂU (một nguồn duy nhất cho cả hai):
 *   1. `scripts/migrate-content.mjs` — kiểm trước khi ghi vào DB (lát 3a).
 *   2. Trình sửa bài trên Admin Portal — kiểm trước khi admin bấm Lưu (lát 3c).
 * Đặt trong `admin/src` để Vite không phải với ra ngoài thư mục gốc của app.
 * File này chỉ có JS thuần, không import React, nên Node cũng chạy được.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * 🔴 KHOÁ BẮT BUỘC ĐƯỢC SUY TỪ SỐ ĐO, KHÔNG TỪ SUY LUẬN
 *
 * Đo bằng `node scratch/inspect_content_shape.mjs` trên 1505 slide thật:
 *
 *   quiz      396 slide · question/options/answer/mascotHint đủ 100%
 *   story     362 slide · mascotMood/text đủ 100%
 *   summary   362 slide · title/points/mascotMood đủ 100%
 *   concept   296 slide · CHỈ badge/title đủ 100%  ← rule chỉ 98,3%
 *   visual     82 slide · CHỈ text đủ 100%          ← items/number chỉ 13,4%
 *   dialogue    7 slide · 7 khoá đủ 100%
 *
 * Hai chỗ bị số đo bác bỏ, và nếu viết theo suy luận thì bộ kiểm tra sẽ SAI:
 *
 *   • `concept.rule` — kế hoạch ghi là bắt buộc, thực tế 5 slide không có.
 *   • `visual.items` / `visual.number` — kế hoạch ghi là bắt buộc, thực tế chỉ
 *     11/82 slide có. Bắt buộc hai khoá này sẽ **chặn 71 slide hợp lệ**.
 *
 * Nguyên tắc rút ra: một khoá chỉ được coi là bắt buộc khi nó có mặt ở **100%**
 * slide của kiểu đó. Thấy nó trong vài ví dụ là chưa đủ.
 *
 * ──────────────────────────────────────────────────────────────────────────
 * 🔴 `mangObject` — KHAI RIÊNG "MẢNG CHỨA OBJECT"
 *
 * `array` một mình KHÔNG nói được mảng đó chứa chuỗi hay chứa object. Trình sửa bài
 * (lát 3c) phải biết: mảng chuỗi thì sửa bằng "mỗi dòng một ý" cho dễ, còn mảng
 * object thì buộc phải sửa bằng JSON. Đoán sai chiều này thì editor ghi ra
 * `["a","b"]` ở chỗ `LessonPage` cần `[{...},{...}]` — slide đó hỏng **ÂM THẦM**:
 * không lỗi, không cảnh báo, chỉ là bé không bao giờ thấy phần đó.
 *
 * Số đo (trên 1505 slide thật, xem mục TẦN SUẤT TỪNG KHOÁ):
 *   mảng OBJECT : items · steps · gallery · activityGrid · dialogueList
 *   mảng CHUỖI : options · points
 * ══════════════════════════════════════════════════════════════════════════════
 */

// Kiểu giá trị dùng cho việc kiểm tra. `any` = có mặt là đủ, không kiểm kiểu
// (dùng cho đáp án, vì đáp án có thể là số HOẶC chuỗi — đã đo: `number | string`).
const KIEM = {
  any: () => null,
  string: (v) => (typeof v === "string" ? null : "phải là chuỗi"),
  number: (v) =>
    typeof v === "number" && Number.isFinite(v) ? null : "phải là số hữu hạn",
  object: (v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? null
      : "phải là một object",
  array: (v) => (Array.isArray(v) ? null : "phải là một mảng"),
};

/**
 * Sổ đăng ký 6 kiểu slide. Đây là DANH SÁCH ĐÓNG: kiểu lạ thì `LessonPage`
 * không biết render → màn hình trắng. Nên kiểu lạ là lỗi, không phải cảnh báo.
 *
 * `cap` = các cặp khoá phải đi cùng nhau. Đo được: `shape` luôn đi với
 * `shapeLabel`, `gallery` luôn đi với `galleryTitle`. Đi một nửa cặp thì giao
 * diện vỡ (có hình mà không có nhãn, hoặc ngược lại).
 */
export const SLIDE_TYPES = {
  story: {
    batBuoc: { mascotMood: "string", text: "string" },
    tuyChon: { items: "array", planeShapes: "array" },
    mangObject: ["items", "planeShapes"],
  },

  summary: {
    // 🔴 `mascotMood` ĐÃ BỊ BỎ KHỎI danh sách BẮT BUỘC (2026-09-20).
    // Đo được: cả 362 slide "Ghi nhớ" đều mang khoá này, nhưng `SummarySlide`
    // **không đọc nó** — nghĩa là bắt buộc một khoá mà bé không bao giờ thấy.
    // Chuyển sang TUỲ CHỌN: dữ liệu cũ vẫn hợp lệ, trình sửa vẫn hiện ô đó với bài
    // đã có giá trị, mà bài mới thì không phải điền một thứ vô nghĩa.
    batBuoc: { title: "string", points: "array" },
    tuyChon: { mascotMood: "string" },
  },

  visual: {
    // CHỈ `text` là bắt buộc — xem ghi chú đầu file.
    batBuoc: { text: "string" },
    tuyChon: { items: "array", number: "number" },
    mangObject: ["items"],
  },

  concept: {
    // CHỈ `badge` và `title` là bắt buộc — xem ghi chú đầu file.
    batBuoc: { badge: "string", title: "string" },
    tuyChon: {
      rule: "string",
      explanation: "string",
      points: "array",
      example: "object",
      steps: "array",
      clock: "object",
      shape: "string",
      shapeLabel: "string",
      gallery: "array",
      galleryTitle: "string",
      activityGrid: "array",
      items: "array",
      planeShapes: "array",
    },
    cap: [
      ["shape", "shapeLabel"],
      ["gallery", "galleryTitle"],
    ],
    mangObject: ["steps", "gallery", "activityGrid", "items", "planeShapes"],
  },

  quiz: {
    batBuoc: {
      question: "string",
      options: "array",
      answer: "any",
      mascotHint: "string",
    },
    tuyChon: { items: "array", planeShapes: "array" },
    // Đáp án BẮT BUỘC nằm trong lựa chọn. Không có luật này thì app chạy bình
    // thường nhưng KHÔNG BAO GIỜ chấm đúng câu đó — sai hoàn toàn âm thầm.
    dapAnTrongOptions: "answer",
    mangObject: ["items", "planeShapes"],
  },

  dialogue: {
    // 🔴 `dialogue` cũng là CÂU HỎI, không phải chỉ có hội thoại. Kế hoạch tổng
    // mô tả nó là "có scene" — sai. Nó có `options` + `correctAnswer`, và
    // `LessonPage` cũng gọi `recordAttempt` ở nhánh này. Bỏ sót nó ở đây nghĩa
    // là 7 câu dialogue hỏng đáp án sẽ lọt qua.
    batBuoc: {
      badge: "string",
      title: "string",
      dialogueList: "array",
      question: "string",
      options: "array",
      correctAnswer: "any",
      explanation: "string",
    },
    tuyChon: { focusGraphic: "object" },
    dapAnTrongOptions: "correctAnswer",
    mangObject: ["dialogueList"],
  },

  /**
   * BA KIỂU MỚI (2026-09-28) — lấy ý từ **Duolingo Math** (người dùng gửi ảnh:
   * “Chọn tất cả các phương án thích hợp”, “ghép thẻ thành phép tính”, “nối cặp”).
   * Mỗi kiểu có luật chấm riêng, nằm ở `client/src/pages/lesson/answerLogic.js`.
   */
  multiQuiz: {
    batBuoc: {
      question: "string",
      options: "array",
      answers: "array",
      mascotHint: "string",
    },
    // Đáp án là MẢNG con của `options` — luật riêng `mangDapAnTrongOptions` bên dưới.
    mangDapAnTrongOptions: "answers",
  },

  buildExpression: {
    batBuoc: {
      question: "string",
      target: "any",
      slots: "number",
      tiles: "array",
      solutions: "array",
      mascotHint: "string",
    },
    // `solutions` là MẢNG CỦA MẢNG (mỗi cách đúng là một dãy thẻ) ⇒ sửa bằng JSON,
    // không phải “mỗi dòng một ý”. Khai sai chiều này thì editor ghi ra mảng chuỗi
    // và slide hỏng âm thầm — đúng họ lỗi mà khối ghi chú đầu file này cảnh báo.
    mangObject: ["solutions"],
  },

  matchPairs: {
    batBuoc: { question: "string", pairs: "array", mascotHint: "string" },
    mangObject: ["pairs"],
  },

  /**
   * HAI KIỂU “TỰ TRẢ LỜI” (2026-09-28, ảnh Duolingo thứ hai người dùng gửi):
   *   • `typeAnswer`       — “Nhập câu trả lời”: bé bấm số trên bàn phím số.
   *   • `numberLineAnswer` — “Trả lời trên trục số”: bé kéo con trỏ tới vạch đúng.
   *
   * Cả hai đều dùng CHUNG khung `expression` + hộp mẫu ở cuối, nên `expression` phải viết tới
   * chỗ hộp nối tiếp — luật “không kết thúc bằng chữ số” ở dưới kiểm đúng điều đó.
   */
  typeAnswer: {
    batBuoc: {
      question: "string",
      expression: "string",
      answer: "number",
      mascotHint: "string",
    },
  },

  numberLineAnswer: {
    batBuoc: {
      question: "string",
      expression: "string",
      answer: "number",
      min: "number",
      max: "number",
      step: "number",
      mascotHint: "string",
    },
  },
};

export const SLIDE_TYPE_NAMES = Object.keys(SLIDE_TYPES);

/**
 * HÌNH DẠNG của một thẻ trong `buildExpression` (chỉ hình dạng, không phải phép tính).
 * Một thẻ phải rơi vào ĐÚNG MỘT trong hai nhóm này — xem luật “không trộn số với dấu”.
 */
const LA_SO_THO = /^\s*\d[\d\s.,]*\s*$/;
const TOAN_TU = new Set(["+", "−", "-", "×", "x", "*", ":", "÷", "/"]);

/**
 * Kiểm MỘT slide. Trả về mảng thông báo lỗi — rỗng nghĩa là hợp lệ.
 *
 * @param {unknown} slide
 * @param {string} [viTri] tiền tố cho thông báo, VD "slide 3"
 * @returns {string[]}
 */
export function validateSlide(slide, viTri = "slide") {
  const loi = [];

  if (!slide || typeof slide !== "object" || Array.isArray(slide)) {
    return [`${viTri}: không phải một object`];
  }

  const { type, content } = slide;

  if (typeof type !== "string" || !type) {
    return [`${viTri}: thiếu \`type\``];
  }

  const kieu = SLIDE_TYPES[type];
  if (!kieu) {
    return [
      `${viTri}: kiểu slide lạ "${type}" — chỉ chấp nhận: ` +
        SLIDE_TYPE_NAMES.join(", "),
    ];
  }

  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return [`${viTri} (${type}): \`content\` không phải một object`];
  }

  // Khoá bắt buộc
  for (const [khoa, kieuGiaTri] of Object.entries(kieu.batBuoc)) {
    if (!(khoa in content)) {
      loi.push(`${viTri} (${type}): thiếu khoá bắt buộc \`${khoa}\``);
      continue;
    }
    const sai = KIEM[kieuGiaTri](content[khoa]);
    if (sai) loi.push(`${viTri} (${type}): \`${khoa}\` ${sai}`);
  }

  // Khoá tuỳ chọn — chỉ kiểm khi có mặt
  for (const [khoa, kieuGiaTri] of Object.entries(kieu.tuyChon || {})) {
    if (!(khoa in content)) continue;
    const sai = KIEM[kieuGiaTri](content[khoa]);
    if (sai) loi.push(`${viTri} (${type}): \`${khoa}\` ${sai}`);
  }

  // Cặp khoá phải đi cùng nhau
  for (const [a, b] of kieu.cap || []) {
    const coA = a in content;
    const coB = b in content;
    if (coA !== coB) {
      loi.push(
        `${viTri} (${type}): \`${a}\` và \`${b}\` phải đi cùng nhau ` +
          `(đang có ${coA ? a : b}, thiếu ${coA ? b : a})`,
      );
    }
  }

  // Đáp án phải nằm trong lựa chọn
  const khoaDapAn = kieu.dapAnTrongOptions;
  if (khoaDapAn) {
    const opts = content.options;
    if (Array.isArray(opts)) {
      if (opts.length === 0) {
        loi.push(`${viTri} (${type}): \`options\` rỗng, không chấm được`);
      } else if (!opts.includes(content[khoaDapAn])) {
        loi.push(
          `${viTri} (${type}): \`${khoaDapAn}\` = ` +
            `${JSON.stringify(content[khoaDapAn])} KHÔNG nằm trong \`options\` ` +
            `${JSON.stringify(opts)}`,
        );
      }
    }
  }

  /**
   * NHIỀU ĐÁP ÁN cùng nằm trong `options` (`multiQuiz`).
   * 🔴 VÌ SAO CẦN LUẬT RIÊNG: `multiQuiz` chấm đúng khi bé chọn ĐỦ mọi đáp án trong
   * `answers`. Chỉ cần một phần tử của `answers` gõ sai (không có trong `options`) thì
   * câu đó **KHÔNG BAO GIỜ chấm đúng** — bé bấm đúng hết vẫn báo sai, mà không có lỗi nào
   * bung ra. Đúng họ lỗi “im lặng” của luật `dapAnTrongOptions`.
   */
  const khoaMangDapAn = kieu.mangDapAnTrongOptions;
  if (khoaMangDapAn) {
    const opts = content.options;
    const ds = content[khoaMangDapAn];
    if (Array.isArray(opts) && Array.isArray(ds)) {
      if (ds.length < 2) {
        loi.push(
          `${viTri} (${type}): \`${khoaMangDapAn}\` phải có ÍT NHẤT 2 đáp án ` +
            `(dạng “chọn tất cả đáp án đúng” mà chỉ 1 đáp án thì dùng kiểu \`quiz\`)`,
        );
      }
      const la = ds.filter((x) => !opts.includes(x));
      if (la.length) {
        loi.push(
          `${viTri} (${type}): ${la.length} đáp án KHÔNG nằm trong \`options\`: ` +
            `${JSON.stringify(la)}`,
        );
      }
    }
  }

  /**
   * `buildExpression`: **MỖI THẺ CHỈ ĐƯỢC LÀ MỘT SỐ HOẶC MỘT DẤU**, khay đủ thẻ, và mỗi cách
   * đúng phải điền ĐÚNG số ô.
   *
   * 🔴 VÌ SAO LUẬT “KHÔNG TRỘN SỐ VỚI DẤU” LÀ LUẬT QUAN TRỌNG NHẤT Ở ĐÂY:
   * người dùng báo lỗi thật (2026-09-28). Bản đầu tôi soạn thẻ `"25 ×"` (dấu dính vào số). Với
   * khay kiểu đó, bé **KHÔNG THỂ** ghép `4 × 25`: không có thẻ `"×"` rời, cũng không có thẻ
   * `"25"` rời. Bài học vì thế chỉ có MỘT đường đi do người soạn vạch sẵn — đúng thứ “nhiều cách
   * đúng” giả tạo. Thẻ trộn còn phá cả ghi chú “đổi chỗ hai thừa số” trong chính lời giải.
   * Luật này bắt được ngay lúc soạn, không đợi tới lúc bé làm bài.
   *
   * Cách CHẤM (giá trị biểu thức có bằng `target` không) nằm ở `client/.../answerLogic.js` và
   * được `scripts/migrate-content.mjs` + `scratch/kiem-tra-slide.mjs` gọi khi kiểm nội dung.
   * Ở đây chỉ kiểm HÌNH DẠNG, đủ để trình sửa bài báo lỗi ngay khi admin bấm Lưu.
   */
  if (type === "buildExpression") {
    const soO = content.slots;
    const tiles = content.tiles;
    const cachDung = content.solutions;
    const laSo = (x) => LA_SO_THO.test(String(x ?? ""));
    const laDau = (x) => TOAN_TU.has(String(x ?? "").trim());

    if (!laSo(content.target)) {
      loi.push(
        `${viTri} (buildExpression): \`target\` phải là MỘT SỐ (đang là ${JSON.stringify(content.target)})`,
      );
    }

    // Số ô phải LẺ và ≥ 3: một biểu thức hợp lệ tối thiểu là `số – dấu – số`. Khai 2 ô thì bé
    // điền đủ kiểu gì cũng không thành biểu thức ⇒ bài vô nghiệm, và luật chấm trả `null` im lặng.
    if (Number.isFinite(soO) && (soO < 3 || soO % 2 === 0)) {
      loi.push(
        `${viTri} (buildExpression): \`slots\` phải là số LẺ và ≥ 3 (tối thiểu “số – dấu – số”), đang là ${JSON.stringify(content.slots)}`,
      );
    }

    if (Array.isArray(tiles)) {
      const tron = tiles.filter((t) => !laSo(t) && !laDau(t));
      if (tron.length) {
        loi.push(
          `${viTri} (buildExpression): thẻ TRỘN số với dấu hoặc lạ: ${JSON.stringify(tron)} — ` +
            `mỗi thẻ chỉ được là MỘT số ("25") hoặc MỘT dấu ("×"); thẻ "25 ×" làm bé không thể ghép "4 × 25"`,
        );
      }
      if (!tiles.some(laDau)) {
        loi.push(
          `${viTri} (buildExpression): khay không có thẻ DẤU nào — bé không ghép được phép tính`,
        );
      }
      if (Number.isFinite(soO) && tiles.length < soO) {
        loi.push(
          `${viTri} (buildExpression): khay chỉ có ${tiles.length} thẻ nhưng cần điền ${soO} ô`,
        );
      }
    }

    if (Array.isArray(cachDung) && Number.isFinite(soO)) {
      cachDung.forEach((cach, i) => {
        if (!Array.isArray(cach) || cach.length !== soO) {
          loi.push(
            `${viTri} (buildExpression): cách đúng thứ ${i + 1} phải là mảng ${soO} thẻ ` +
              `(đang là ${JSON.stringify(cach)})`,
          );
          return;
        }
        for (const the of cach) {
          if (!Array.isArray(tiles) || !tiles.includes(the)) {
            loi.push(
              `${viTri} (buildExpression): thẻ ${JSON.stringify(the)} trong cách đúng ` +
                `không có trong \`tiles\``,
            );
          }
        }
      });
    }
  }

  /** `matchPairs`: mỗi cặp phải có đủ hai vế, và có ít nhất 2 cặp. */
  if (type === "matchPairs" && Array.isArray(content.pairs)) {
    if (content.pairs.length < 2) {
      loi.push(`${viTri} (matchPairs): cần ít nhất 2 cặp để nối`);
    }
    content.pairs.forEach((cap, i) => {
      if (!Array.isArray(cap) || cap.length !== 2) {
        loi.push(
          `${viTri} (matchPairs): cặp thứ ${i + 1} phải là mảng 2 phần tử [trái, phải]`,
        );
      }
    });
  }

  /**
   * HAI KIỂU “TỰ TRẢ LỜI”: `typeAnswer` (nhập số) và `numberLineAnswer` (kéo con trỏ trên trục số).
   *
   * 🔴 BÀI HỌC TỪ `buildExpression` (cùng ngày): lỗi ở đây cũng thuộc họ “IM LẶNG” — bé làm đúng
   * mà vẫn báo sai, hoặc cả bài không có cách nào làm đúng:
   *   • `expression` kết thúc bằng CHỮ SỐ thì hộp mẫu nối vào thành `4 + 4 = 16 ☐` — đọc vô nghĩa;
   *   • `answer` là số thập phân / số âm thì bàn phím 0–9 của app KHÔNG gõ được ⇒ bài vô nghiệm;
   *   • trục số có `step` không chia hết khoảng, hoặc `answer` KHÔNG nằm trên vạch nào ⇒ bé kéo
   *     đúng cũng không bao giờ chạm tới đáp án.
   */
  if (type === "typeAnswer" || type === "numberLineAnswer") {
    const bieuThuc = String(content.expression ?? "").trim();
    if (!bieuThuc || !/\d/.test(bieuThuc)) {
      loi.push(
        `${viTri} (${type}): \`expression\` phải là phép tính CÓ CHỮ SỐ (đang là ${JSON.stringify(content.expression)})`,
      );
    } else if (/\d\s*$/.test(bieuThuc)) {
      loi.push(
        `${viTri} (${type}): \`expression\` KHÔNG được kết thúc bằng chữ số — hộp mẫu nối ngay sau ` +
          `nó (viết "4 + 4 + 4 + 4 =" chứ đừng viết "4 + 4 + 4 + 4 = 16")`,
      );
    }

    const dapAn = content.answer;
    if (!Number.isInteger(dapAn) || dapAn < 0) {
      loi.push(
        `${viTri} (${type}): \`answer\` phải là số tự nhiên (bàn phím 0–9 không gõ được dấu phẩy ` +
          `hay dấu trừ) — đang là ${JSON.stringify(dapAn)}`,
      );
    }
  }

  /** `numberLineAnswer`: các vạch phải chia đều khoảng, và đáp án PHẢI nằm trên một vạch. */
  if (type === "numberLineAnswer") {
    const { min, max, step, answer } = content;
    const du =
      Number.isFinite(min) && Number.isFinite(max) && Number.isFinite(step);
    if (!du) {
      loi.push(
        `${viTri} (numberLineAnswer): \`min\`, \`max\`, \`step\` phải là số (đang là ${JSON.stringify({ min, max, step })})`,
      );
    } else if (step <= 0 || max <= min) {
      loi.push(
        `${viTri} (numberLineAnswer): cần step > 0 và max > min (đang là ${JSON.stringify({ min, max, step })})`,
      );
    } else if (
      Math.abs((max - min) / step - Math.round((max - min) / step)) > 1e-9
    ) {
      loi.push(
        `${viTri} (numberLineAnswer): \`step\` không chia hết khoảng ${min}→${max} — vạch cuối sẽ ` +
          `lệch khỏi \`max\`, trục số vẽ sai`,
      );
    } else {
      const soVach = Math.round((max - min) / step) + 1;
      /*
       * ⚠️ TRẦN 7 VẠCH: mỗi nhãn số là một ô bấm được. Trên máy 320 px, 8 vạch là mỗi ô ~40 px —
       * dưới ngưỡng bấm được của trẻ nhỏ. Nhiều vạch hơn thì nên tách thành hai câu hỏi.
       */
      if (soVach < 2 || soVach > 7) {
        loi.push(
          `${viTri} (numberLineAnswer): số vạch phải từ 2 đến 7 (đang là ${soVach}) — nhiều vạch quá ` +
            `thì mỗi ô bấm nhỏ hơn ngón tay trẻ`,
        );
      }
      /*
       * 🔴 BẪY ĐÃ MẮC THẬT (canary bắt được ngay lượt đầu): phép kiểm “nằm đúng trên vạch” phải
       * là `|x − round(x)| < eps`. Tôi viết thiếu `Math.abs` ngoài cùng (`x − round(x) < eps`) nên
       * MỌI giá trị nằm dưới vạch đều lọt (2,5 − 3 = −0,5 < eps = đúng) — luật tưởng có mà thực ra
       * không chặn gì. Đây là lý do mỗi luật mới phải có canary HAI VẾ.
       */
      const trenVach =
        Number.isFinite(answer) &&
        Math.abs((answer - min) / step - Math.round((answer - min) / step)) <
          1e-9 &&
        answer >= min &&
        answer <= max;
      if (!trenVach) {
        loi.push(
          `${viTri} (numberLineAnswer): \`answer\` (${JSON.stringify(answer)}) KHÔNG nằm trên vạch nào ` +
            `của trục ${min}→${max} bước ${step} ⇒ bài VÔ NGHIỆM, bé kéo đúng cũng không chạm tới`,
        );
      }
    }
  }

  return loi;
}

/**
 * Kiểm `payload` của một bài — đúng thứ được lưu vào cột `payload` (JSONB).
 *
 * Hình dạng: `{ slides: [ … ] }`. Cố ý CHỈ chứa slides: tiêu đề, mô tả, kiểu bài
 * đã có cột riêng ở bảng `content_lessons`; để chúng ở đây nữa là hai nguồn sự
 * thật cho cùng một thứ.
 *
 * @param {unknown} payload
 * @returns {string[]}
 */
export function validateLessonPayload(payload) {
  const loi = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return ["payload: không phải một object"];
  }

  if (!Array.isArray(payload.slides)) {
    return ["payload: `slides` phải là một mảng"];
  }

  if (payload.slides.length === 0) {
    return ["payload: `slides` rỗng — bài không có nội dung nào"];
  }

  payload.slides.forEach((s, i) => {
    loi.push(...validateSlide(s, `slide ${i + 1}`));
  });

  return loi;
}

/**
 * Kiểm cả một bài (thông tin chung + payload). Dùng cho script migrate và cho
 * trình sửa bài ở lát 3c.
 *
 * @param {{id?: string, title?: string, description?: string, type?: string,
 *          slides?: unknown[]}} lesson
 * @returns {string[]}
 */
export function validateLesson(lesson) {
  const loi = [];

  if (!lesson || typeof lesson !== "object")
    return ["bài: không phải một object"];

  if (typeof lesson.id !== "string" || !lesson.id) loi.push("bài: thiếu `id`");
  if (typeof lesson.title !== "string" || !lesson.title)
    loi.push("bài: thiếu `title`");
  // `description` không bắt buộc: file tĩnh có bài để trống.
  if (lesson.description != null && typeof lesson.description !== "string")
    loi.push("bài: `description` phải là chuỗi");
  if (lesson.type != null && typeof lesson.type !== "string")
    loi.push("bài: `type` phải là chuỗi");

  loi.push(...validateLessonPayload({ slides: lesson.slides }));

  return loi;
}
