import { describe, expect, it } from "vitest";
import { grade1Data } from "../data/grade1Data.js";

describe("g1-c1-l4: Tranh cảnh và câu đố trực quan", () => {
  const g1c1 = grade1Data.chapters.find((c) => c.id === "g1-c1");
  const lesson = g1c1.lessons.find((l) => l.id === "g1-c1-l4");

  it("bài học g1-c1-l4 tồn tại và đủ 20 slides theo lộ trình sư phạm gọn gàng, không dư thừa", () => {
    expect(lesson).toBeDefined();
    expect(lesson.slides.length).toBe(20);
  });

  it("các slide 2 đến 6 là từng slide riêng biệt to rõ cho từng số 6, 7, 8, 9, 10 (tenFrameNumber)", () => {
    const expected = [
      { idx: 1, n: 6, word: "sáu" },
      { idx: 2, n: 7, word: "bảy" },
      { idx: 3, n: 8, word: "tám" },
      { idx: 4, n: 9, word: "chín" },
      { idx: 5, n: 10, word: "mười" },
    ];

    expected.forEach(({ idx, n, word }) => {
      const slide = lesson.slides[idx];
      expect(slide.type).toBe("visual");
      expect(slide.content.numberScene.mode).toBe("tenFrameNumber");
      expect(slide.content.numberScene.n).toBe(n);
      expect(slide.content.numberScene.word).toBe(word);
    });
  });

  it("slide 7 hiển thị bậc thang số 1 đến 10 (numberStairs)", () => {
    const slide7 = lesson.slides[6];
    expect(slide7.type).toBe("visual");
    expect(slide7.content.numberScene.mode).toBe("numberStairs");
  });

  it("slide 8 có thử tài đếm tiếp bàn tay (countingBridge)", () => {
    const slide8 = lesson.slides[7];
    expect(slide8.type).toBe("quiz");
    expect(slide8.content.question).toContain("giơ thêm 2 ngón");
    expect(slide8.content.numberScene.mode).toBe("countingBridge");
    expect(slide8.content.answer).toBe(7);
  });

  it("slide 9 (tranh nông trại) có đầy đủ legend, answers và options để điền số", () => {
    const slide9 = lesson.slides[8];
    expect(slide9.type).toBe("visual");
    expect(slide9.content.text).toBe("Đếm trong tranh nông trại");

    const ns = slide9.content.numberScene;
    expect(ns.mode).toBe("sceneCount");
    expect(ns.kind).toBe("farm");
    expect(ns.legend).toHaveLength(6);
    expect(ns.legend.map((l) => l.emoji)).toEqual(["🐄", "🐔", "🌻", "☁️", "☀️", "🐟"]);
    expect(ns.answers).toEqual([2, 4, 5, 3, 1, 6]);
    expect(ns.options).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("slide 13 (câu hỏi về bò) có hình tranh nông trại để bé đếm trực tiếp", () => {
    const slide13 = lesson.slides[12];
    expect(slide13.type).toBe("quiz");
    expect(slide13.content.question).toContain("mấy con bò");
    expect(slide13.content.numberScene).toBeDefined();
    expect(slide13.content.numberScene.mode).toBe("sceneCount");
    expect(slide13.content.numberScene.kind).toBe("farm");
    expect(slide13.content.answer).toBe(2);
  });

  it("slide 14 (câu hỏi về hoa hướng dương) có hình tranh nông trại để bé đếm trực tiếp", () => {
    const slide14 = lesson.slides[13];
    expect(slide14.type).toBe("quiz");
    expect(slide14.content.question).toContain("mấy bông hoa hướng dương");
    expect(slide14.content.numberScene).toBeDefined();
    expect(slide14.content.numberScene.mode).toBe("sceneCount");
    expect(slide14.content.numberScene.kind).toBe("farm");
    expect(slide14.content.answer).toBe(5);
  });

  it("slide 15 (câu hỏi về chân côn trùng) có hình các con vật trực quan và không bị lặp slide dư", () => {
    const slide15 = lesson.slides[14];
    expect(slide15.type).toBe("quiz");
    expect(slide15.content.question).toContain("mấy con vật có 6 chân");
    expect(slide15.content.numberScene).toBeDefined();
    expect(slide15.content.numberScene.mode).toBe("countFiltered");
    expect(slide15.content.numberScene.kind).toBe("legs");
    expect(slide15.content.answer).toBe(4);
  });

  it("slide 18 (ao) có legend và answers, slide 19 (câu hỏi vịt) có hình ao", () => {
    const slide18 = lesson.slides[17];
    expect(slide18.type).toBe("visual");
    expect(slide18.content.numberScene.answers).toEqual([4, 3, 5, 2, 6]);

    const slide19 = lesson.slides[18];
    expect(slide19.type).toBe("quiz");
    expect(slide19.content.question).toContain("mấy con vịt");
    expect(slide19.content.numberScene.kind).toBe("pond");
    expect(slide19.content.answer).toBe(5);
  });
});
