/**
 * Mô hình dữ liệu cho TRÌNH SỬA BÀI HỌC — Giai đoạn 3, lát 3c.
 *
 * File này KHÔNG có React, không đọc `import.meta.env`, không gọi mạng. Nó chỉ
 * biến đổi dữ liệu: dựng danh sách ô nhập từ một slide, áp giá trị người dùng gõ
 * vào, và kiểm tra trước khi lưu.
 *
 * 🔴 VÌ SAO PHẢI THUẦN (đúng lý do như `henGio.js` ở lát L): cổng `S-23` `import()`
 * thẳng file này trong Node rồi thử **hành vi thật** — gõ một dòng vào `options`,
 * xoá một khoá có cặp, dán JSON hỏng. Một cổng chỉ grep chuỗi sẽ xanh kể cả khi
 * hàm trả về `undefined`, mà đó lại đúng là loại hỏng hay gặp nhất.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * 🔴 QUYẾT ĐỊNH — FORM SINH TỪ SCHEMA, KHÔNG VIẾT TAY 6 FORM
 *
 * Có 6 kiểu slide và 24 khoá khác nhau. Viết tay 6 form là 6 chỗ để quên một khoá
 * — mà khoá bị quên thì editor **ĂM THẦM NUỐT** nó khi bấm Lưu: slide vẫn hợp lệ,
 * vẫn qua được `contentSchema`, chỉ là phần nội dung đó biến mất khỏi bài.
 *
 * Nên `truongCuaSlide()` đọc thẳng `SLIDE_TYPES` (nguồn sự thật duy nhất về việc
 * một kiểu slide có những khoá nào) rồi sinh ô nhập. Thêm một khoá vào schema là
 * editor tự có ô nhập cho nó, không phải sửa file này.
 * ══════════════════════════════════════════════════════════════════════════════
 */
import { SLIDE_TYPES, validateLesson } from "./contentSchema.js";

/** Tên tiếng Việt của từng khoá. Khoá không có ở đây thì hiện nguyên tên khoá. */
export const NHAN_KHOA = {
  // chung
  title: "Tiêu đề",
  text: "Đoạn chữ",
  mascotMood: "Biểu cảm linh vật",
  mascotHint: "Gợi ý của linh vật",
  badge: "Nhãn nhỏ",
  points: "Các ý (mỗi dòng một ý)",
  // concept
  rule: "Quy tắc",
  explanation: "Giải thích",
  example: "Ví dụ (JSON)",
  steps: "Các bước (JSON)",
  clock: "Đồng hồ (JSON)",
  shape: "Mã hình",
  shapeLabel: "Tên hình",
  gallery: "Thư viện ảnh (JSON)",
  galleryTitle: "Tiêu đề thư viện",
  activityGrid: "Lưới hoạt động (JSON)",
  // câu hỏi
  question: "Câu hỏi",
  options: "Các lựa chọn (mỗi dòng một lựa chọn)",
  answer: "Đáp án đúng",
  correctAnswer: "Đáp án đúng",
  // visual / dialogue
  number: "Con số",
  items: "Danh sách (JSON)",
  dialogueList: "Hội thoại (JSON)",
  focusGraphic: "Hình minh hoạ (JSON)",
};

export const nhan = (khoa) => NHAN_KHOA[khoa] ?? khoa;

/** Kiểu ô nhập. `LUA_CHON` là ô chọn đáp án — giá trị lấy TỪ `options` nên luôn khớp. */
export const DANG = {
  CHUOI: "chuoi",
  SO: "so",
  MANG_CHUOI: "mang-chuoi",
  JSON: "json",
  LUA_CHON: "lua-chon",
};

const SO_HOP_LE = /^-?\d+(\.\d+)?$/;

export const laMangChuoi = (v) =>
  Array.isArray(v) &&
  v.every((x) => typeof x === "string" || typeof x === "number");

/**
 * Kiểu ô nhập cho một khoá.
 *
 * Giá trị ĐANG CÓ thắng khai báo: một mảng toàn chuỗi thì sửa bằng "mỗi dòng một
 * ý" cho dễ, dù schema chỉ nói chung chung là `array`. Khi khoá CHƯA có thì mới
 * dựa vào khai báo, và tới lượt nó, `mangObject` quyết định — xem ghi chú đầu
 * `contentSchema.js` về việc đoán sai chiều này làm slide hỏng âm thầm.
 */
export function dangTruong(type, khoa, giaTri, kieuKhaiBao) {
  const kieu = SLIDE_TYPES[type] ?? {};

  if (kieu.dapAnTrongOptions === khoa) return DANG.LUA_CHON;

  if (Array.isArray(giaTri))
    return kieu.mangObject?.includes(khoa) || !laMangChuoi(giaTri)
      ? DANG.JSON
      : DANG.MANG_CHUOI;

  if (giaTri !== null && typeof giaTri === "object") return DANG.JSON;
  if (typeof giaTri === "number") return DANG.SO;
  if (typeof giaTri === "string") return DANG.CHUOI;

  // Khoá chưa có -> theo khai báo
  if (kieuKhaiBao === "number") return DANG.SO;
  if (kieuKhaiBao === "object") return DANG.JSON;
  if (kieuKhaiBao === "array")
    return kieu.mangObject?.includes(khoa) ? DANG.JSON : DANG.MANG_CHUOI;
  return DANG.CHUOI;
}

/** Giá trị mặc định khi admin BẤM THÊM một khoá chưa có. */
export function macDinh(kieuKhaiBao) {
  if (kieuKhaiBao === "number") return 0;
  if (kieuKhaiBao === "array") return [];
  if (kieuKhaiBao === "object") return {};
  return "";
}

/**
 * Danh sách ô nhập của MỘT slide: khoá bắt buộc trước, rồi tới khoá tuỳ chọn.
 * Khoá tuỳ chọn chưa có vẫn được trả về (với `coMat: false`) để còn đường THÊM.
 */
export function truongCuaSlide(slide) {
  const type = slide?.type;
  const kieu = SLIDE_TYPES[type];
  if (!kieu) return [];

  const content = slide.content ?? {};
  const ds = [];

  const them = (khoa, kieuKhaiBao, batBuoc) => {
    const coMat = Object.hasOwn(content, khoa);
    const giaTri = content[khoa];
    ds.push({
      khoa,
      nhan: nhan(khoa),
      batBuoc,
      coMat,
      giaTri,
      // Kiểu khai báo trong schema — cần khi THÊM một khoá chưa có, để biết tạo
      // giá trị rỗng cho hợp kiểu (xem `macDinh`).
      kieuKhaiBao,
      dang: dangTruong(type, khoa, giaTri, kieuKhaiBao),
      // Cặp khoá phải đi cùng nhau — UI dùng để nhắc "xoá cái này sẽ xoá kèm cái kia"
      capVoi: khoaCungCap(type, khoa),
    });
  };

  for (const [k, t] of Object.entries(kieu.batBuoc)) them(k, t, true);
  for (const [k, t] of Object.entries(kieu.tuyChon ?? {})) them(k, t, false);

  return ds;
}

/** Khoá đi kèm trong một cặp (vd `shape` ↔ `shapeLabel`), hoặc null. */
export function khoaCungCap(type, khoa) {
  for (const [a, b] of SLIDE_TYPES[type]?.cap ?? []) {
    if (a === khoa) return b;
    if (b === khoa) return a;
  }
  return null;
}

/** Chuỗi để hiện trong ô nhập. */
export function chuoiTuGiaTri(dang, giaTri) {
  if (giaTri === undefined || giaTri === null) return "";
  if (dang === DANG.JSON) return JSON.stringify(giaTri, null, 2);
  if (dang === DANG.MANG_CHUOI)
    return Array.isArray(giaTri) ? giaTri.join("\n") : String(giaTri);
  return String(giaTri);
}

/**
 * Mảng `options` này là mảng SỐ hay mảng CHUỖI?
 *
 * 🔴 Không suy từ chính `options` — bản thân nó không nói được, mà nếu suy từ nó
 * thì mỗi lần xoá sạch ô rồi gõ lại là kiểu bị lật (mảng toàn số -> `[]` -> chuỗi),
 * và đáp án cũ (số) không còn khớp lựa chọn nữa.
 *
 * Suy từ **KIỂU CỦA ĐÁP ÁN** — một giá trị vô hướng, không phụ thuộc số thứ tự
 * slide nên không lệch khi đổi thứ tự. Đo được: `options` chỉ có ở `quiz` và
 * `dialogue`, mà cả hai đều có `dapAnTrongOptions`.
 */
export function mangToanSo(slide, khoa) {
  const kieu = SLIDE_TYPES[slide?.type];
  if (!kieu || khoa !== "options") return false;
  return typeof slide.content?.[kieu.dapAnTrongOptions] === "number";
}

/**
 * Phân tích chuỗi người dùng gõ thành giá trị thật.
 * KHÔNG ném lỗi — trả `{ ok: false, loi }` để UI hiện ngay dưới ô nhập mà không
 * làm mất thứ vừa gõ.
 *
 * 🔴 Giữ nguyên KIỂU SỐ của mảng cũ. Đo được `options` có cả `array<number>` lẫn
 * `array<string>`, và `contentSchema` kiểm đáp án bằng `options.includes(answer)`
 * — so sánh NGHIÊM NGẶT. Nếu tự ý đổi `5` thành `"5"` thì đáp án cũ không còn nằm
 * trong lựa chọn: bài qua được kiểm tra cũ mà KHÔNG BAO GIỜ chấm đúng.
 */
export function phanTich(dang, text, giuKieuSo = false) {
  const t = String(text ?? "");

  if (dang === DANG.JSON) {
    // Ô trống ⇒ XOÁ khoá, không phải "tạo mảng rỗng". Xoá là điều người dùng vừa
    // làm (họ xoá hết chữ); còn tự tạo `[]` thì một khoá kiểu object sẽ thành mảng
    // — bộ kiểm tra bắt được (`phải là một object`) nhưng thông báo rất khó hiểu.
    if (!t.trim()) return { ok: true, giaTri: undefined };
    try {
      return { ok: true, giaTri: JSON.parse(t) };
    } catch (e) {
      return { ok: false, loi: `JSON không hợp lệ: ${e.message}` };
    }
  }

  if (dang === DANG.SO) {
    if (!t.trim()) return { ok: false, loi: "Phải là một số" };
    const n = Number(t.trim());
    if (!Number.isFinite(n))
      return { ok: false, loi: "Phải là một số hữu hạn" };
    return { ok: true, giaTri: n };
  }

  if (dang === DANG.MANG_CHUOI) {
    const dong = t
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!giuKieuSo) return { ok: true, giaTri: dong };

    const la = dong.find((s) => !SO_HOP_LE.test(s));
    if (la !== undefined)
      return {
        ok: false,
        loi:
          `Mảng này toàn SỐ, mà "${la}" không phải số. Sửa lại cho đúng kiểu — ` +
          `đổi kiểu sẽ làm đáp án không còn khớp lựa chọn.`,
      };
    return { ok: true, giaTri: dong.map(Number) };
  }

  return { ok: true, giaTri: t };
}

/** Đặt / xoá một khoá trong `content` của slide. Trả về slide MỚI. */
export function datTruong(slide, khoa, giaTri) {
  const content = { ...(slide.content ?? {}) };
  if (giaTri === undefined) delete content[khoa];
  else content[khoa] = giaTri;
  return { ...slide, content };
}

/**
 * Xoá một khoá tuỳ chọn, **xoá kèm khoá trong cặp**.
 * Xoá lẻ `shape` mà giữ `shapeLabel` thì `validateSlide` báo lỗi cặp khoá — đúng,
 * nhưng bắt admin tự đi xoá nốt là việc không cần thiết.
 */
export function boTruong(slide, khoa) {
  const cap = khoaCungCap(slide?.type, khoa);
  const bo = new Set([khoa]);
  if (cap) bo.add(cap);

  const content = { ...(slide.content ?? {}) };
  for (const k of bo) delete content[k];

  return { slide: { ...slide, content }, daBo: [...bo] };
}

/** Slide mới, mọi khoá bắt buộc có giá trị mặc định hợp kiểu. */
export function slideMoi(type) {
  const kieu = SLIDE_TYPES[type];
  if (!kieu) return null;
  const content = {};
  for (const [k, t] of Object.entries(kieu.batBuoc)) content[k] = macDinh(t);
  return { type, content };
}

// ───────────────────────── thao tác trên cả bài ─────────────────────────

/** Dựng model để sửa: ưu tiên bản nháp nếu có, không thì lấy bài đang publish. */
export function baiTuDuLieu(chiTiet, banNhap) {
  const src = banNhap ?? chiTiet ?? {};
  return {
    id: chiTiet?.id ?? banNhap?.lesson_id ?? "",
    title: src.title ?? "",
    description: src.description ?? "",
    lesson_type: src.lesson_type ?? "learn",
    payload: src.payload ?? { slides: [] },
  };
}

export const slidesCua = (bai) => bai?.payload?.slides ?? [];

export function datSlides(bai, slides) {
  return { ...bai, payload: { ...(bai.payload ?? {}), slides } };
}

export function capNhatSlide(bai, viTri, slide) {
  const slides = [...slidesCua(bai)];
  slides[viTri] = slide;
  return datSlides(bai, slides);
}

export function xoaSlide(bai, viTri) {
  return datSlides(
    bai,
    slidesCua(bai).filter((_, i) => i !== viTri),
  );
}

export function themSlide(bai, type) {
  const moi = slideMoi(type);
  if (!moi) return bai;
  return datSlides(bai, [...slidesCua(bai), moi]);
}

/** Đổi chỗ slide với slide liền kề. Không có hàng xóm thì trả về nguyên trạng. */
export function diChuyenSlide(bai, viTri, huong) {
  const slides = [...slidesCua(bai)];
  const den = viTri + huong;
  if (den < 0 || den >= slides.length) return bai;
  [slides[viTri], slides[den]] = [slides[den], slides[viTri]];
  return datSlides(bai, slides);
}

// ───────────────────────── kiểm tra ─────────────────────────

/**
 * Lỗi CẤU TRÚC — dùng chung `validateLesson` với script migrate.
 * 🔴 Cố ý KHÔNG thêm luật mới vào `contentSchema.js`: file đó còn dùng để kiểm
 * 1505 slide đã có sẵn, siết nó bây giờ là quay lại bác bỏ dữ liệu đang chạy tốt.
 */
export function kiemTraBai(bai) {
  return validateLesson({
    id: bai?.id,
    title: bai?.title,
    description: bai?.description ?? null,
    type: bai?.lesson_type,
    slides: slidesCua(bai),
  });
}

/**
 * CẢNH BÁO (không chặn lưu) — chuỗi bắt buộc đang để trống.
 *
 * Vì sao không chặn: `contentSchema` chỉ kiểm KIỂU, nên `""` vẫn hợp lệ; mà nếu
 * chặn thì một bài đang có sẵn ô trống sẽ **khoá luôn** việc sửa những chỗ khác
 * của bài đó. Cảnh báo to và rõ là đủ — người sửa vẫn phải tự quyết.
 */
export function canhBaoRong(bai) {
  const ds = [];
  slidesCua(bai).forEach((slide, i) => {
    const kieu = SLIDE_TYPES[slide?.type];
    if (!kieu) return;
    for (const khoa of Object.keys(kieu.batBuoc)) {
      const v = slide.content?.[khoa];
      if (typeof v === "string" && !v.trim())
        ds.push(
          `Slide ${i + 1} (${slide.type}): \`${khoa}\` đang để trống — bé sẽ thấy ô rỗng.`,
        );
    }
  });
  return ds;
}

/** Bài có gì đó khác bản gốc không (để bật/tắt nút Lưu). */
export function coThayDoi(bai, goc) {
  if (!goc) return true;
  if (bai.title !== goc.title) return true;
  if ((bai.description ?? "") !== (goc.description ?? "")) return true;
  if (bai.lesson_type !== goc.lesson_type) return true;
  return JSON.stringify(bai.payload) !== JSON.stringify(goc.payload);
}
