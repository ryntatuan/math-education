import { describe, expect, it } from "vitest";

import {
  stripTextbookRefs,
  stripTextbookRefsInTree,
} from "../utils/stripTextbookRefs.js";

/**
 * Test cho bộ lọc nhãn dẫn trang SGK.
 *
 * VÌ SAO CẦN: nhãn `(SGK tr.6)` nằm trong chính chuỗi hiển thị nên bé thấy trên slide
 * (người dùng báo 2026-09-26). Nếu sau này ai xoá một luật trong `stripTextbookRefs.js`,
 * nhãn sẽ quay lại UI mà KHÔNG có gì báo — đúng loại hỏng âm thầm. Vì vậy mỗi luật dưới
 * đây đều có ca thật lấy từ dữ liệu, không phải ca tự nghĩ.
 */
describe("stripTextbookRefs", () => {
  it("bỏ nhãn trong ngoặc ở giữa chuỗi", () => {
    expect(stripTextbookRefs("Năm bạn cùng học Toán với bé (SGK tr.6)")).toBe(
      "Năm bạn cùng học Toán với bé",
    );
    expect(stripTextbookRefs("Khám phá: đếm khối trong bể (SGK tr.8)")).toBe(
      "Khám phá: đếm khối trong bể",
    );
    expect(stripTextbookRefs("Đếm cà rốt ĐÃ TÔ MÀU (SGK tr.11)")).toBe(
      "Đếm cà rốt ĐÃ TÔ MÀU",
    );
  });

  it("bỏ nhãn nhưng GIỮ phần chữ còn lại của câu", () => {
    const ra = stripTextbookRefs(
      "🏰 Lâu đài bạn Mai (SGK tr.94) — hàng nền có mấy khối lập phương?",
    );
    expect(ra).not.toMatch(/SGK/i);
    expect(ra).toContain("Lâu đài bạn Mai");
    expect(ra).toContain("hàng nền có mấy khối lập phương?");
  });

  it("bỏ nhãn đứng làm tiền tố của mô tả bài", () => {
    expect(
      stripTextbookRefs(
        "SGK (tr.6–7): làm quen năm bạn, sách Toán và các biểu tượng chỉ dẫn trong sách",
      ),
    ).toBe("làm quen năm bạn, sách Toán và các biểu tượng chỉ dẫn trong sách");
    expect(
      stripTextbookRefs(
        "SGK Bài 1 (tr.8–10): đếm, đọc, viết các số 0, 1, 2, 3",
      ),
    ).toBe("đếm, đọc, viết các số 0, 1, 2, 3");
  });

  it("bỏ cụm 'như SGK tr.N' và 'theo đúng SGK'", () => {
    const a = stripTextbookRefs("Viết số và đọc số — bảng như SGK tr.4");
    expect(a).not.toMatch(/SGK/i);
    expect(a).toContain("Viết số và đọc số");

    const b = stripTextbookRefs(
      "Bé đã hoàn thành chương trình Toán Lớp 1 theo đúng SGK.",
    );
    expect(b).not.toMatch(/SGK/i);
    expect(b).toContain("hoàn thành chương trình Toán Lớp 1");
  });

  it("GIỮ nguyên dấu xuống dòng của chuỗi nhiều dòng", () => {
    const ra = stripTextbookRefs("Bóng đá: 12 bạn\nCầu lông: 8 bạn (SGK tr.5)");
    expect(ra.split("\n")).toHaveLength(2);
    expect(ra.startsWith("Bóng đá: 12 bạn\n")).toBe(true);
    expect(ra).not.toMatch(/SGK/i);
  });

  it("không có nhãn thì trả về ĐÚNG chuỗi cũ (không đổi gì)", () => {
    const s = "Bể cá thứ ba trong hình có mấy khối?";
    expect(stripTextbookRefs(s)).toBe(s);
    const so = 5;
    expect(stripTextbookRefs(so)).toBe(so);
    expect(stripTextbookRefs(null)).toBe(null);
  });

  it("stripTextbookRefsInTree lọc mọi chuỗi lồng trong cây, không đụng số/null", () => {
    const cay = [
      {
        id: "g1-c1",
        description: "SGK (tr.6–7): làm quen năm bạn",
        lessons: [
          {
            id: "g1-c1-l1",
            totalLessons: 3,
            flag: null,
            slides: [
              { type: "visual", content: { text: "Năm bạn (SGK tr.6)", n: 5 } },
              {
                type: "quiz",
                content: { options: ["a (SGK tr.1)", "b"], answer: "b" },
              },
            ],
          },
        ],
      },
    ];
    const ra = stripTextbookRefsInTree(cay);
    expect(JSON.stringify(ra)).not.toMatch(/SGK/i);
    expect(ra[0].description).toBe("làm quen năm bạn");
    expect(ra[0].lessons[0].totalLessons).toBe(3);
    expect(ra[0].lessons[0].flag).toBe(null);
    expect(ra[0].lessons[0].slides[0].content.n).toBe(5);
    expect(ra[0].lessons[0].slides[0].content.text).toBe("Năm bạn");
    expect(ra[0].lessons[0].slides[1].content.options[0]).toBe("a");
    // Cây gốc KHÔNG bị sửa (hàm phải thuần).
    expect(cay[0].description).toMatch(/SGK/);
  });
});
