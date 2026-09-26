/**
 * Kiểm thử "đặt tính dọc" — bám đúng lỗi người dùng đã báo:
 * *"phép cộng là từ phải qua trái, tại sao đáp án lại điền từ trái qua phải?"*
 *
 * Chạy: `npm test` (trong `client/`) hoặc `npm --prefix client test` ở gốc repo.
 */
import "./setup.js";
import { describe, it, expect } from "vitest";
import {
  tachSo,
  tinhKetQua,
  tinhChia,
  tinhNho,
  thuTuOTrong,
} from "../components/visuals/columnMath.js";

/** Lấy dãy giá trị các ô, theo ĐÚNG thứ tự bé phải điền. */
const dayO = (left, right, sign, remember = false) =>
  thuTuOTrong(left, right, sign, remember).map((o) => o.loai + ":" + o.v);

describe("thuTuOTrong — thứ tự ô điền (nguồn sự thật của giao diện)", () => {
  it("cộng 256 + 173: điền TỪ PHẢI SANG TRÁI, ô nhớ ngay sau hàng sinh ra nó", () => {
    // 6+3=9 (đơn vị) → 5+7=12 viết 2 nhớ 1 (chục) → 2+1+1=4 (trăm)
    expect(dayO(256, 173, "+", true)).toEqual(["chuSo:9", "chuSo:2", "nho:1", "chuSo:4"]);
  });

  it("cộng không nhớ 25 + 4: ô đầu tiên vẫn là hàng đơn vị", () => {
    expect(dayO(25, 4, "+")).toEqual(["chuSo:9", "chuSo:2"]);
  });

  it("nhân 26 × 3: điền 8 → nhớ 1 → 7", () => {
    expect(dayO(26, 3, "×", true)).toEqual(["chuSo:8", "nho:1", "chuSo:7"]);
  });

  it("trừ 500 − 178: điền 2 → 2 (có mượn) → 3", () => {
    expect(dayO(500, 178, "−", true)).toEqual(["chuSo:2", "chuSo:2", "chuSo:3"]);
  });

  it("chia 639 : 3: điền TỪ TRÁI SANG PHẢI (2 → 1 → 3)", () => {
    expect(dayO(639, 3, ":")).toEqual(["thuong:2", "thuong:1", "thuong:3"]);
  });

  it("chia có dư 13 : 3: thương trước, ô SỐ DƯ sau cùng", () => {
    expect(dayO(13, 3, ":")).toEqual(["thuong:4", "du:1"]);
  });

  it("ô đầu tiên của phép cộng KHÔNG BAO GIỜ là hàng cao nhất (bẫy cũ)", () => {
    const dau = thuTuOTrong(256, 173, "+", true)[0];
    // hàng đơn vị của kết quả 429 nằm ở vị trí cuối cùng (viTri = 2)
    expect(dau.loai).toBe("chuSo");
    expect(dau.viTri).toBe(2);
  });
});

describe("tinhKetQua — kết quả số học", () => {
  it("cộng / trừ số nguyên", () => {
    expect(tinhKetQua(256, 173, "+")).toMatchObject({ nguyen: "429" });
    expect(tinhKetQua(500, 178, "−")).toMatchObject({ nguyen: "322" });
  });

  it("nhân 26 × 3 = 78", () => {
    expect(tinhKetQua(26, 3, "×")).toMatchObject({ nguyen: "78", cotThap: 0 });
  });

  it("số thập phân: số chữ số thập phân của tích = tổng hai thừa số", () => {
    expect(tinhKetQua("1,5", "2,25", "+")).toMatchObject({ nguyen: "3", thap: "75" });
    expect(tinhKetQua("2,5", "1,2", "×")).toMatchObject({ cotThap: 2 });
  });

  it("chia có thương và số dư", () => {
    expect(tinhChia(639, 3)).toMatchObject({ nguyen: "213", du: 0 });
    expect(tinhChia(13, 3)).toMatchObject({ nguyen: "4", du: 1 });
  });

  it("chia cho 0 không làm sập (trả 0)", () => {
    expect(tinhChia(5, 0).nguyen).toBe("0");
  });

  it("tách số nhận cả dấu phẩy lẫn dấu chấm", () => {
    expect(tachSo("15,82")).toEqual({ nguyen: "15", thap: "82" });
    expect(tachSo("3.5")).toEqual({ nguyen: "3", thap: "5" });
    expect(tachSo("")).toEqual({ nguyen: "0", thap: "" });
  });
});

describe("tinhNho — chữ số nhớ từng cột", () => {
  it("cộng 256 + 173: chỉ cột chục nhớ 1", () => {
    expect(tinhNho(256, 173, "+")).toEqual([0, 1, 0]);
  });

  it("nhân chỉ vẽ hàng nhớ khi thừa số thứ hai có MỘT chữ số", () => {
    expect(tinhNho(26, 3, "×")).toEqual([1, 0]);
    expect(tinhNho(26, 13, "×")).toEqual([0, 0]); // 13 có 2 chữ số ⇒ không vẽ nhớ
  });
});
