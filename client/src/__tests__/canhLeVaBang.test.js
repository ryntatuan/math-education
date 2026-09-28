/**
 * Kiểm LUẬT CĂN LỀ VÀ LUẬT BỐ CỤC BẢNG — đúng những lỗi người dùng báo bằng ảnh (2026-09-27):
 *   • "do căn giữa nên thông tin lộn xộn, thụt ra thụt vào" ⇒ `columnAnchor` +
 *     luật căn lề theo VAI TRÒ trong `pages/LessonPage.css` (canh bằng cổng tĩnh `S-36`).
 *   • "khung lại không hiển thị hết" + "chữ bị xuống dòng" ⇒ `charsPerLine` · `widenColumns`.
 *   • "nội dung khoanh đỏ bị trùng lặp" ⇒ `contentWords`/`coversAll` + `planVisualText`.
 *
 * Canary HAI VẾ giống các cổng khác của dự án: (1) bắt được ca sai VÀ (2) KHÔNG bắt nhầm ca
 * đúng — chỉ vế (1) thì một hàm luôn trả về một giá trị cũng "xanh".
 */
import "./setup.js";
import { describe, it, expect } from "vitest";
import { contentWords, coversAll } from "../utils/textCompare.js";
import {
  charsPerLine,
  columnAnchor,
  isValueCell,
  widenColumns,
} from "../components/visuals/tableAlignment.js";
import {
  planVisualText,
  figureTextOf,
  planConceptText,
} from "../pages/lesson/slideDedupe.js";
import { planSlideSpeech } from "../utils/slideSpeech.js";
import { isTextAnswer, TEXT_ANSWER_CLASS } from "../utils/answerAlignment.js";

describe("contentWords / coversAll — bỏ dấu câu, giữ chữ số", () => {
  it("bỏ emoji và dấu câu, giữ từ có nghĩa", () => {
    const w = contentWords("🔍 Khám phá: tìm hiểu kiến thức mới.");
    expect(w.has("khám")).toBe(true);
    expect(w.has("kiến")).toBe(true);
    expect(w.has("🔍")).toBe(false);
  });

  it("GIỮ chữ số một ký tự (lưới số phải so được)", () => {
    const w = contentWords("1 2 3 4 5");
    expect(w.size).toBe(5);
  });

  it("khối ngắn nằm gọn trong khối dài ⇒ true", () => {
    expect(
      coversAll(
        "🔍 Khám phá: tìm hiểu kiến thức mới. 🤖 Hoạt động: làm bài tập thực hành.",
        "khám phá · hoạt động",
      ),
    ).toBe(true);
  });

  it("khối dài có ý riêng ⇒ false (KHÔNG được bỏ khối dài)", () => {
    expect(
      coversAll(
        "Đặt tính thẳng hàng rồi cộng từ phải sang trái.",
        "Cộng từ phải sang trái",
      ),
    ).toBe(true); // phía ngắn nằm gọn trong phía dài — đúng chiều bỏ được
    expect(
      coversAll(
        "Cộng từ phải sang trái",
        "Cộng từ phải sang trái và nhớ thêm 1 vào hàng chục",
      ),
    ).toBe(false); // phía "ngắn" còn ý chưa có ở phía dài ⇒ KHÔNG bỏ
  });

  it("canary: chuỗi rỗng không được coi là 'bao phủ'", () => {
    expect(coversAll("", "")).toBe(false);
    expect(coversAll("có chữ", "")).toBe(false);
  });
});

describe("columnAnchor — cột giá trị căn giữa, cột chữ căn trái", () => {
  it("bảng số liệu: nhãn trái, số giữa", () => {
    const rows = [
      ["Bóng đá", 12],
      ["Cầu lông", 8],
    ];
    expect(columnAnchor(rows, 0)).toBe("start");
    expect(columnAnchor(rows, 1)).toBe("middle");
  });

  it("bảng bốn biểu tượng (ảnh người dùng): CẢ HAI cột đều là chữ ⇒ trái", () => {
    const rows = [
      ["🔍 Khám phá", "Tìm hiểu kiến thức mới"],
      ["🤖 Hoạt động", "Làm bài tập thực hành"],
    ];
    expect(columnAnchor(rows, 0)).toBe("start");
    expect(columnAnchor(rows, 1)).toBe("start");
  });

  it("bảng số thuần (1…50, số La Mã) ⇒ giữa", () => {
    expect(
      columnAnchor(
        [
          [1, 11],
          [2, 12],
        ],
        0,
      ),
    ).toBe("middle");
    expect(
      columnAnchor(
        [
          ["I", "1"],
          ["II", "2"],
        ],
        0,
      ),
    ).toBe("middle");
  });

  it("ô trống không làm cột thành cột chữ", () => {
    expect(
      columnAnchor(
        [
          [null, 3],
          [null, 4],
        ],
        0,
      ),
    ).toBe("middle");
  });

  it("isValueCell: có dấu cách hoặc quá dài ⇒ không phải giá trị", () => {
    expect(isValueCell("12")).toBe(true);
    expect(isValueCell("VIII")).toBe(true);
    expect(isValueCell("Hà Nội")).toBe(false);
    expect(isValueCell("Khám phá")).toBe(false);
  });
});

describe("isTextAnswer — đáp án nào phải căn TRÁI", () => {
  /**
   * Luật: đáp án CÓ CHỮ (câu, tên hàng) ⇒ căn trái; đáp án chỉ có SỐ/KÝ HIỆU ⇒ giữ căn giữa.
   * Người dùng báo bằng ảnh 2026-09-28 với đúng ca đầu tiên dưới đây.
   */
  it("câu chữ ⇒ căn trái (ca trong ảnh người dùng gửi)", () => {
    expect(isTextAnswer("Đọc gợi ý của Rô-bốt rồi thử lại")).toBe(true);
    expect(isTextAnswer("Cả A và B đều đúng")).toBe(true);
    expect(isTextAnswer("3 nghìn, 5 trăm, 1 chục, 7 đơn vị")).toBe(true);
    expect(isTextAnswer("Đúng rồi 👍")).toBe(true);
  });

  it("số / ký hiệu ⇒ giữ căn giữa (KHÔNG bắt nhầm — vế 2 của canary)", () => {
    expect(isTextAnswer(24)).toBe(false);
    expect(isTextAnswer("0,5")).toBe(false);
    expect(isTextAnswer("75%")).toBe(false);
    expect(isTextAnswer(">")).toBe(false);
    expect(isTextAnswer("=")).toBe(false);
  });

  it("đơn vị đo thuần ký hiệu thì vẫn giữ căn giữa", () => {
    expect(isTextAnswer("2 500")).toBe(false);
    expect(isTextAnswer("12,5")).toBe(false);
  });

  it("giá trị rỗng/rác không làm vỡ hàm", () => {
    expect(isTextAnswer(null)).toBe(false);
    expect(isTextAnswer(undefined)).toBe(false);
    expect(isTextAnswer("")).toBe(false);
  });

  it("tên lớp CSS dùng chung là một hằng số", () => {
    expect(TEXT_ANSWER_CLASS).toBe("is-text-answer");
  });
});

describe("charsPerLine — hết xuống dòng oan", () => {
  // Số đo THẬT của bảng trong ảnh: cột "🤖 Hoạt động" dài 12 ký tự (emoji = 2 đơn vị UTF-16).
  const CHAR = 7.6;
  const PAD = 10;

  it("ô vừa đủ nội dung dài nhất ⇒ KHÔNG ngắt dòng (lỗi cũ hụt đúng 1 ký tự)", () => {
    const longest = 12;
    const width = Math.round(longest * CHAR) + PAD * 2; // cách tính bề rộng cột thật
    expect(charsPerLine(width, longest, CHAR, PAD)).toBe(longest);
  });

  it("cột bị CO LẠI thì ngắt dòng theo bề rộng thật", () => {
    // Nội dung 20 ký tự nhưng cột chỉ được 100 đơn vị ⇒ ~10 ký tự một dòng.
    expect(charsPerLine(100, 20, CHAR, PAD)).toBeLessThan(20);
    expect(charsPerLine(100, 20, CHAR, PAD)).toBeGreaterThan(4);
  });

  it("canary: không bao giờ trả về dưới 4 ký tự (chữ sẽ vỡ vụn)", () => {
    expect(charsPerLine(1, 1, CHAR, PAD)).toBe(4);
    expect(charsPerLine(-50, 2, CHAR, PAD)).toBe(4);
  });
});

describe("widenColumns — khung bảng dùng hết bề rộng", () => {
  it("giãn cho đầy ngân sách, không vượt", () => {
    const out = widenColumns([119, 180], 368, 300, [1]);
    expect(out.reduce((a, b) => a + b, 0)).toBe(368);
    expect(out[0]).toBe(119); // cột số không bị giãn thêm khi còn cột chữ
    expect(out[1]).toBeGreaterThan(180);
  });

  it("cột chữ chạm trần thì phần dư chia cho cột còn lại", () => {
    const out = widenColumns([60, 295], 368, 300, [1]);
    expect(out.reduce((a, b) => a + b, 0)).toBe(368);
    expect(out[1]).toBe(300); // chạm trần
    expect(out[0]).toBeGreaterThan(60);
  });

  it("bảng đã đầy (hoặc quá) ngân sách ⇒ KHÔNG đổi gì", () => {
    expect(widenColumns([200, 200], 368, 300, [0, 1])).toEqual([200, 200]);
    expect(widenColumns([40, 60], 50, 300, [0, 1])).toEqual([40, 60]);
  });
});

describe("planVisualText — không nói lại điều hình đã nói", () => {
  const anhNguoiDung = {
    text: "Bốn biểu tượng bé sẽ gặp trong sách",
    table: {
      headers: ["Biểu tượng", "Bé làm gì?"],
      rows: [
        ["🔍 Khám phá", "Tìm hiểu kiến thức mới"],
        ["🤖 Hoạt động", "Làm bài tập thực hành"],
      ],
      label: "Bốn biểu tượng chỉ dẫn trong sách Toán 1",
    },
  };

  it("tiêu đề KHÔNG trùng bảng ⇒ giữ nguyên (không báo oan ca này)", () => {
    const plan = planVisualText(anhNguoiDung);
    expect(plan.title).toBe("Bốn biểu tượng bé sẽ gặp trong sách");
    expect(plan.steps).toEqual([]);
    expect(plan.hideCaption).toBe(false);
  });

  it("dòng dữ liệu trùng bảng ⇒ bỏ dòng đó", () => {
    const plan = planVisualText({
      text: "Quan sát bảng dưới đây\nBóng đá 12 · Cầu lông 8 · Bơi 5",
      table: {
        headers: ["Môn", "Số bạn"],
        rows: [
          ["Bóng đá", 12],
          ["Cầu lông", 8],
          ["Bơi", 5],
        ],
      },
    });
    expect(plan.title).toBe("Quan sát bảng dưới đây");
    expect(plan.steps).toEqual([]);
  });

  it("cả dòng đầu cũng là bản sao ⇒ nâng NHÃN của bảng lên làm tiêu đề và bỏ nhãn dưới hình", () => {
    const plan = planVisualText({
      text: "hình vuông · hình tròn · hình tam giác · hình chữ nhật",
      table: {
        headers: ["Hình", "Số cạnh"],
        rows: [
          ["hình vuông", 4],
          ["hình tròn", 0],
          ["hình tam giác", 3],
          ["hình chữ nhật", 4],
        ],
        label: "Bốn hình bé đã học",
      },
    });
    expect(plan.title).toBe("Bốn hình bé đã học");
    expect(plan.hideCaption).toBe(true);
    expect(plan.steps).toEqual([]);
  });

  it("dòng đầu là bản sao mà bảng KHÔNG có nhãn ⇒ giữ dòng đầu (thà lặp còn hơn mất tiêu đề)", () => {
    const plan = planVisualText({
      text: "hình vuông · hình tròn · hình tam giác · hình chữ nhật",
      table: {
        headers: ["Hình", "Số cạnh"],
        rows: [
          ["hình vuông", 4],
          ["hình tròn", 0],
          ["hình tam giác", 3],
          ["hình chữ nhật", 4],
        ],
      },
    });
    expect(plan.title).toContain("hình vuông");
    expect(plan.hideCaption).toBe(false);
  });

  it("slide không có hình ⇒ giữ nguyên mọi dòng", () => {
    const plan = planVisualText({ text: "Tiêu đề\nDòng một\nDòng hai" });
    expect(plan.title).toBe("Tiêu đề");
    expect(plan.steps).toEqual(["Dòng một", "Dòng hai"]);
    expect(figureTextOf({ text: "Tiêu đề" })).toBe("");
  });
});

describe("planConceptText — một nguồn luật cho phần VẼ và phần ĐỌC", () => {
  it("danh sách bên dưới đã nói đủ ⇒ ẩn ô nhấn mạnh ⭐", () => {
    const plan = planConceptText({
      rule: "Hình vuông có 4 cạnh dài bằng nhau",
      points: [
        "🔍 Khám phá: Hình vuông có 4 cạnh dài bằng nhau",
        "🤖 Hoạt động: kẻ hình vuông vào vở",
      ],
    });
    expect(plan.showRule).toBe(false);
    expect(plan.ruleText).toBe("Hình vuông có 4 cạnh dài bằng nhau");
  });

  it("ô ⭐ nói thêm điều danh sách KHÔNG có ⇒ vẫn hiện (canary chống ẩn bừa)", () => {
    const plan = planConceptText({
      rule: "Muốn cộng hai số, ta đặt tính thẳng cột rồi cộng từ phải sang trái",
      points: ["6 sáu · 7 bảy · 8 tám"],
    });
    expect(plan.showRule).toBe(true);
  });

  it("ô ⭐ nói đủ nội dung câu giải thích ⇒ ẩn câu giải thích", () => {
    const rule = "Trong phép cộng, đổi chỗ hai số hạng thì tổng không đổi";
    const plan = planConceptText({
      rule,
      explanation: "Đổi chỗ hai số hạng trong phép cộng thì tổng không đổi",
    });
    expect(plan.showExplanation).toBe(false);
    // Chiều ngược lại KHÓA: câu giải thích dài hơn ô ⭐ thì phải giữ (bỏ là mất thông tin).
    const nguoc = planConceptText({
      rule: "Tổng không đổi",
      explanation:
        "Khi đổi chỗ hai số hạng trong một phép cộng thì tổng của chúng vẫn không thay đổi",
    });
    expect(nguoc.showExplanation).toBe(true);
  });

  it("slide không có ô nhấn mạnh ⇒ không bao giờ hiện; khối `steps` cũng tính là nội dung dài", () => {
    expect(planConceptText({ explanation: "abc" }).showRule).toBe(false);
    const plan = planConceptText({
      rule: "Tam giác có 3 cạnh, 3 đỉnh",
      steps: [
        {
          title: "Vẽ ba điểm",
          desc: "Tam giác có 3 cạnh, 3 đỉnh nên cần ba điểm",
        },
      ],
    });
    expect(plan.showRule).toBe(false);
  });
});

describe("planSlideSpeech — màn hình hiện chữ nào thì loa đọc chữ đó", () => {
  /** Đếm số lần một câu xuất hiện trong chuỗi được đọc. */
  const demLan = (chuoi, cau) => chuoi.split(cau).length - 1;

  it("ô ⭐ đã bị ẩn ⇒ đọc ĐÚNG MỘT LẦN (lỗi thật: loa đọc hai lần)", () => {
    const cau = "Hình vuông có 4 cạnh dài bằng nhau";
    const bai = {
      type: "concept",
      content: {
        title: "Hình vuông",
        rule: cau,
        points: [`🔍 Khám phá: ${cau}`, "🤖 Hoạt động: kẻ hình vuông vào vở"],
      },
    };
    // Vế 1: mã CŨ (đọc thẳng `rule` rồi đọc tiếp `points`) đọc câu đó HAI lần — chứng minh
    // phép đo này thật sự phân biệt được hai phiên bản, không phải lúc nào cũng ra 1.
    const cu = [
      bai.content.title,
      bai.content.rule,
      bai.content.points.join(". "),
    ]
      .filter(Boolean)
      .join(". ");
    expect(demLan(cu, cau)).toBe(2);
    // Vế 2: mã MỚI đọc đúng một lần.
    expect(demLan(planSlideSpeech(bai), cau)).toBe(1);
  });

  it("ô ⭐ KHÔNG trùng ⇒ vẫn đọc (canary chống bỏ bừa)", () => {
    const bai = {
      type: "concept",
      content: {
        title: "Cộng hai số",
        rule: "Cộng từ phải sang trái, nhớ sang hàng kế tiếp",
        points: ["6 sáu · 7 bảy · 8 tám"],
      },
    };
    expect(planSlideSpeech(bai)).toContain("Cộng từ phải sang trái");
  });

  it("slide Quan sát: không đọc dòng đã bị bỏ vì hình nói lại", () => {
    const bai = {
      type: "visual",
      content: {
        text: "Quan sát bảng dưới đây\nBóng đá 12 · Cầu lông 8 · Bơi 5",
        table: {
          headers: ["Môn", "Số bạn"],
          rows: [
            ["Bóng đá", 12],
            ["Cầu lông", 8],
            ["Bơi", 5],
          ],
        },
      },
    };
    const doc = planSlideSpeech(bai);
    expect(doc).toBe("Quan sát bảng dưới đây");
    expect(doc).not.toContain("Bóng đá 12");
  });

  it("slide Bài học đọc NGUYÊN `text` (đừng bỏ chữ bé đang thấy)", () => {
    const bai = {
      type: "story",
      content: { text: "Ngày xưa có một chú thỏ." },
    };
    expect(planSlideSpeech(bai)).toBe("Ngày xưa có một chú thỏ.");
  });

  it("slide tương tác / thiếu dữ liệu ⇒ không đọc, không lỗi", () => {
    expect(planSlideSpeech(null)).toBe("");
    expect(planSlideSpeech({ type: "interactive", content: {} })).toBe("");
    expect(planSlideSpeech({ type: "concept" })).toBe("");
  });
});
