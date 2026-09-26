/**
 * Kiểm lời giải từng bước: lời giải PHẢI khớp với kết quả mà `tinhKetQua` tính ra.
 * (Lỗi từng có: lời giải nói một đằng, ô đáp án một nẻo.)
 */
import "./setup.js";
import { describe, it, expect } from "vitest";
import { buocTinh, loiGiaiGon } from "../components/visuals/columnSteps.js";
import { tinhKetQua } from "../components/visuals/columnMath.js";

/** "429" hoặc "3,75" từ kết quả của tinhKetQua. */
const thanhChuoi = ({ nguyen, thap }) => (thap ? `${nguyen},${thap}` : nguyen);

const CA = [
  [256, 173, "+"],
  [500, 178, "−"],
  [26, 3, "×"],
  [639, 3, ":"],
  [13, 3, ":"],
  [7, 5, "-"], // dấu gạch ngang thường, phải hiểu như "−"
  [1000, 3, "+"],
];

describe("buocTinh — lời giải từng bước", () => {
  it.each(CA)(
    "%i %s %i: có bước, và số cuối cùng đúng bằng kết quả",
    (a, b, sign) => {
      const { buoc, ketLuan } = buocTinh(a, b, sign);
      const can = thanhChuoi(tinhKetQua(a, b, sign === "-" ? "−" : sign));
      const toanBo = buoc.join(" ") + " " + ketLuan;
      expect(buoc.length).toBeGreaterThan(0);
      expect(ketLuan.length).toBeGreaterThan(0);
      // Kết quả thật phải XUẤT HIỆN trong lời giải (bắt lỗi "nói một đằng tính một nẻo").
      expect(toanBo.replace(/\s/g, "")).toContain(can.replace(/\s/g, ""));
    },
  );

  it("trừ số lớn hơn không vỡ (trả rỗng thay vì số âm sai)", () => {
    const { buoc } = buocTinh(3, 8, "−");
    expect(buoc).toEqual([]);
  });

  it("loiGiaiGon cũng khớp kết quả và có nội dung", () => {
    const { nguyen } = tinhKetQua(26, 3, "×");
    expect(loiGiaiGon(26, 3, "×")).toContain(nguyen);
    expect(loiGiaiGon(13, 3, ":")).toMatch(/dư/i);
  });
});
