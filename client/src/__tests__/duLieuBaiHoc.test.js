import { describe, expect, it } from "vitest";

import { HINH_KEYS } from "../components/visuals/visualKeys.js";
import { grade1Data } from "../data/grade1Data.js";
import { grade2Data } from "../data/grade2Data.js";
import { grade3Data } from "../data/grade3Data.js";
import { grade4Data } from "../data/grade4Data.js";
import { grade5Data } from "../data/grade5Data.js";

/**
 * TEST DỮ LIỆU BÀI HỌC — mỗi phép kiểm dưới đây tương ứng MỘT loại lỗi ĐÃ GẶP THẬT
 * trong dự án này, và đều là loại HỎNG ÂM THẦM: app không báo gì, bé chỉ thấy thiếu
 * hoặc sai. Mục đích: lần sau không ai phải phát hiện lại bằng mắt.
 *
 *   · gõ sai tên khoá hình (`numberline` thay vì `numberLine`) ⇒ hình KHÔNG hiện,
 *     `VisualBlocks` chỉ bỏ qua khoá nó không biết.
 *   · `answer` không nằm trong `options` ⇒ bé chọn đúng cũng bị coi là sai.
 *   · `options` trùng nhau ⇒ hai nút giống hệt.
 *   · khối TIỀN rỗng (`notes: []`) ⇒ khung trắng không có gì (người dùng báo 2026-09-25).
 *   · biểu đồ / bảng rỗng ⇒ slide có hình mà không có thông tin.
 */
const GRADES = [grade1Data, grade2Data, grade3Data, grade4Data, grade5Data];

// Khoá hình của bộ vẽ cũ — xem danh sách ở đầu `client/src/components/visuals/VisualBlock.jsx`.
const KHOA_HINH_CU = [
  "clock",
  "shape",
  "operation",
  "comparison",
  "activityGrid",
  "gallery",
  "dialogue",
  "visualDisplay",
  "shapePicture",
  "planeShapes",
];
const KHOA_HINH = new Set([...HINH_KEYS, ...KHOA_HINH_CU]);

// Khoá KHÔNG phải hình (chữ, tham số, dữ liệu con…). Khoá nào không nằm trong đây và cũng
// không phải khoá hình ⇒ nghi gõ sai tên.
const KHONG_PHAI_HINH = new Set([
  "text",
  "title",
  "badge",
  "explanation",
  "points",
  "rule",
  "steps",
  "note",
  "label",
  "question",
  "options",
  "answer",
  "correctAnswer",
  "answers",
  // Ba dạng bài mới (2026-09-28): ghép thẻ thành phép tính + nối cặp.
  "target",
  "slots",
  "tiles",
  "solutions",
  "pairs",
  // Hai dạng “tự trả lời” (2026-09-28): nhập kết quả + trả lời trên trục số.
  "expression",
  "min",
  "max",
  "step",
  "questionType",
  "unit",
  "mascotMood",
  "mascotHint",
  "mascotLine",
  "hint",
  "tips",
  "tip",
  "subtitle",
  "heading",
  "example",
  "exampleText",
  "focusGraphic",
  "shapeLabel",
  "galleryTitle",
  "dialogueList",
  "number",
  "count",
  "value",
  "kind",
  "mode",
  "groups",
  "items",
  "emoji",
  "name",
  "id",
  "type",
  "content",
  "slides",
  "headers",
  "rows",
  "columns",
  "hintText",
  "afterText",
  "beforeText",
  "quote",
  "source",
  "author",
  "instruction",
  "task",
  "goal",
  "pair",
  "pairs",
  "left",
  "right",
  "top",
  "bottom",
  "highlight",
  "color",
  "size",
  "width",
  "height",
]);

/** Duyệt mọi slide của mọi bài: gọi `fn(bài, slide)` để kiểm. */
function moiSlide(fn) {
  for (const g of GRADES) {
    for (const ch of g.chapters ?? []) {
      for (const b of ch.lessons ?? []) {
        for (const s of b.slides ?? []) fn(b, s);
      }
    }
  }
}

const dem = () => {
  let bai = 0;
  let slide = 0;
  for (const g of GRADES) {
    for (const ch of g.chapters ?? []) {
      for (const b of ch.lessons ?? []) {
        bai++;
        slide += (b.slides ?? []).length;
      }
    }
  }
  return { bai, slide };
};

describe("dữ liệu bài học — không có lỗi hỏng âm thầm", () => {
  it("giữ đủ quy mô (chống xoá nhầm hàng loạt)", () => {
    const { bai, slide } = dem();
    expect(GRADES.length).toBe(5);
    expect(bai).toBeGreaterThanOrEqual(460);
    // 🔴 Hạ ngưỡng 4987 → 4900 (2026-09-29): bỏ ~47 slide dạy kiến thức CHƯA HỌC (dấu so sánh,
    //    ê-ke, bậc thang đơn vị, nhân/chia sớm) là sửa nội dung ĐÚNG, không phải xoá nhầm.
    //    Ngưỡng vẫn đủ cao để bắt được việc xoá hàng loạt.
    expect(slide).toBeGreaterThanOrEqual(4900);
  });

  it("mọi khoá trong slide đều là khoá đã biết (không gõ sai tên khoá hình)", () => {
    const la = [];
    moiSlide((b, s) => {
      for (const k of Object.keys(s.content ?? {})) {
        if (KHOA_HINH.has(k) || KHONG_PHAI_HINH.has(k)) continue;
        la.push(`${b.id}: "${k}"`);
      }
    });
    expect(la.slice(0, 10)).toEqual([]);
  });

  it("câu hỏi luôn có chữ, và đáp án luôn nằm trong danh sách lựa chọn", () => {
    const loi = [];
    moiSlide((b, s) => {
      if (s.type !== "quiz") return;
      const c = s.content ?? {};
      if (typeof c.question !== "string" || !c.question.trim())
        loi.push(`${b.id}: câu hỏi rỗng`);
      if (!Array.isArray(c.options)) return;
      const chuoi = c.options.map((o) => JSON.stringify(o));
      const trung = [
        ...new Set(chuoi.filter((o, i) => chuoi.indexOf(o) !== i)),
      ];
      if (trung.length) loi.push(`${b.id}: lựa chọn trùng ${trung.join("/")}`);
      const dap = c.answer ?? c.correctAnswer;
      if (dap !== undefined && !chuoi.includes(JSON.stringify(dap)))
        loi.push(
          `${b.id}: đáp án ${JSON.stringify(dap)} không nằm trong lựa chọn`,
        );
    });
    expect(loi.slice(0, 10)).toEqual([]);
  });

  it("hình TIỀN phải có tờ tiền (lỗi khung trắng đã gặp)", () => {
    const loi = [];
    moiSlide((b, s) => {
      const m = s.content?.money;
      if (!m) return;
      if (!Array.isArray(m.notes) || m.notes.length === 0)
        loi.push(`${b.id}: money rỗng`);
    });
    expect(loi).toEqual([]);
  });

  it("biểu đồ cột và bảng phải có dữ liệu", () => {
    const loi = [];
    moiSlide((b, s) => {
      const c = s.content ?? {};
      if (c.barChart && !(c.barChart.items ?? []).length)
        loi.push(`${b.id}: barChart rỗng`);
      if (c.table) {
        const coHang = (c.table.rows ?? []).length > 0;
        const coCot = (c.table.headers ?? []).length > 0;
        if (!coHang && !coCot) loi.push(`${b.id}: table rỗng`);
      }
    });
    expect(loi).toEqual([]);
  });

  it("mọi slide đều có `content` không rỗng", () => {
    const loi = [];
    moiSlide((b, s) => {
      const c = s.content;
      if (!c || typeof c !== "object" || Object.keys(c).length === 0)
        loi.push(`${b.id}: slide ${s.type ?? "?"} thiếu content`);
    });
    expect(loi.slice(0, 10)).toEqual([]);
  });

  // ⚠️ ĐÃ THỬ VÀ RÚT: một phép kiểm "slide doạ bé làm gì đó mà không có chỗ để làm".
  // Chạy thật thì nó bắt 119 ca, nhưng soi từng ca thì PHẦN LỚN LÀ BÁO OAN:
  //   · "Đặt tính rồi tính 25 + 4" — slide TRÌNH BÀY cách làm, không phải giao việc;
  //   · "Đếm cà rốt ĐÃ TÔ MÀU" / "Đếm rồi chọn số" — hình có sẵn để bé đếm/đối chiếu thật;
  //   · tiêu đề slide KHÁM PHÁ ghi "Đếm rồi chọn số" nhưng đó là lời dẫn bài.
  // Muốn phân biệt được "trình bày" với "giao việc" thì phải biết Ý ĐỊNH của người soạn —
  // regex không biết. Một cổng báo oan còn tệ hơn không có cổng (nó dạy người ta bỏ qua
  // cổng), nên ở đây cố ý KHÔNG kiểm. Việc soi để lại cho công cụ
  // `scratch/soat-dung-dan-du-lieu.mjs` (mục "[doạ suông]") — dùng như DANH SÁCH ĐỂ XEM TAY.
});
