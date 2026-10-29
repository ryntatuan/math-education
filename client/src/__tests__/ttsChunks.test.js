import { describe, expect, it } from "vitest";

import speechHelper from "../utils/speechHelper.js";

/**
 * Test cho việc chia câu trước khi gọi proxy TTS.
 *
 * VÌ SAO CẦN: proxy `/api/tts` từ chối câu > 200 ký tự. Bản cũ chỉ cắt theo
 * dấu câu và dấu phẩy, nên một câu dài không có dấu phẩy vẫn vượt 200 và làm
 * hỏng cả đoạn đọc. Mọi chunk gửi lên phải ≤ 150 ký tự.
 */
describe("splitSentences", () => {
  it("cắt câu dài không có dấu phẩy thành nhiều chunk ≤ 150", () => {
    const text = Array.from({ length: 60 }, (_, i) => `từ${i}`).join(" ");
    const chunks = speechHelper.splitSentences(text);
    expect(chunks.length).toBeGreaterThan(1);
    chunks.forEach((c) => expect(c.length).toBeLessThanOrEqual(150));
    expect(chunks.join(" ").replace(/\s+/g, " ")).toBe(
      text.replace(/\s+/g, " "),
    );
  });

  it("cắt được cả chuỗi không có khoảng trắng", () => {
    const chunks = speechHelper.splitSentences("a".repeat(500));
    chunks.forEach((c) => expect(c.length).toBeLessThanOrEqual(150));
    expect(chunks.join("")).toBe("a".repeat(500));
  });

  it("giữ nguyên câu ngắn", () => {
    expect(speechHelper.splitSentences("Số mười.")).toEqual(["Số mười."]);
  });

  it("luôn trả về chunk không rỗng", () => {
    speechHelper.splitSentences("   ").forEach((c) => {
      expect(c.trim().length).toBeGreaterThan(0);
    });
  });
});
