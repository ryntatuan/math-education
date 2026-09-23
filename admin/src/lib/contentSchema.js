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
};

export const SLIDE_TYPE_NAMES = Object.keys(SLIDE_TYPES);

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
