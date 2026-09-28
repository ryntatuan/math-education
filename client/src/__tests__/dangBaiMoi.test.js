/**
 * Unit test cho LUẬT CHẤM của ba dạng bài mới (`client/src/pages/lesson/answerLogic.js`).
 *
 * Vì sao cần: luật nằm trong JSX thì sửa giao diện có thể đổi luật chấm mà không ai biết.
 * Ba dạng này chấm bằng TẬP HỢP / THỨ TỰ / CẶP — đúng loại dễ sai lặng lẽ nhất:
 *   • `multiQuiz`  — chọn đủ đáp án; thiếu 1 hay thừa 1 đều SAI
 *   • `buildExpression` — chuỗi thẻ phải khớp MỘT TRONG các cách đúng
 *   • `matchPairs` — nối cặp; `xaoOnDinh` để cột phải không trùng hàng cột trái
 *
 * ⚠️ CANARY HAI VẾ (quy ước của dự án): mỗi luật phải có (1) ca SAI bị bắt, và
 * (2) ca ĐÚNG **không** bị bắt oan. Chỉ vế (1) thì một hàm `return false` cũng “xanh”.
 */

import { describe, expect, it } from "vitest";
import {
  chuanHoa,
  daNoiHet,
  demODaDien,
  dungTatCa,
  evaluateTokens,
  isNumberToken,
  isOperator,
  khoaCap,
  laCapDung,
  matchesNumber,
  matchesNumberLine,
  matchesTarget,
  nearestTick,
  oTrongDauTien,
  parseNumber,
  parseTypedNumber,
  phuongAnBoSot,
  phuongAnChonSai,
  ticksOf,
  traiDaNoi,
  xaoOnDinh,
} from "../pages/lesson/answerLogic.js";

describe("chuẩn hoá — không phân biệt hoa/thường và khoảng trắng thừa", () => {
  it("gộp khoảng trắng và cắt hai đầu", () => {
    expect(chuanHoa("  25  ×  4 ")).toBe("25 × 4");
  });
  it("chuỗi rỗng / null không làm hàm nổ", () => {
    expect(chuanHoa(null)).toBe("");
    expect(chuanHoa(undefined)).toBe("");
    expect(chuanHoa(0)).toBe("0");
  });
});

describe("dungTatCa — chọn nhiều đáp án (multiQuiz)", () => {
  const dapAn = ["5 × 2", "2 × 5", "20 : 2"];

  it("chọn ĐỦ, thứ tự nào cũng đúng", () => {
    expect(dungTatCa(["5 × 2", "2 × 5", "20 : 2"], dapAn)).toBe(true);
    expect(dungTatCa(["20 : 2", "5 × 2", "2 × 5"], dapAn)).toBe(true);
  });

  it("THIẾU một đáp án ⇒ sai", () => {
    expect(dungTatCa(["5 × 2", "2 × 5"], dapAn)).toBe(false);
  });

  it("CHỌN THÊM một phương án sai ⇒ sai", () => {
    expect(dungTatCa([...dapAn, "3 × 6"], dapAn)).toBe(false);
  });

  it("chọn trùng lặp không thành ‘đủ’ (Set, không phải mảng)", () => {
    expect(dungTatCa(["5 × 2", "5 × 2", "20 : 2"], dapAn)).toBe(false);
  });

  it("khoảng trắng / hoa-thường không làm sai oan", () => {
    expect(dungTatCa(["5 ×  2", "2  × 5", "20 : 2"], dapAn)).toBe(true);
  });

  it("đề KHÔNG có đáp án nào ⇒ không bao giờ đúng (chống slide hỏng im lặng)", () => {
    expect(dungTatCa([], [])).toBe(false);
    expect(dungTatCa(["a"], [])).toBe(false);
  });

  it("chưa chọn gì cũng không nổ", () => {
    expect(dungTatCa(null, dapAn)).toBe(false);
    expect(dungTatCa(undefined, undefined)).toBe(false);
  });
});

describe("phuongAnChonSai / phuongAnBoSot — tô đỏ đúng chỗ đã chọn sai, tô xanh chỗ bỏ sót", () => {
  const dapAn = ["a", "b", "c"];

  it("chọn sai được chỉ đúng phần tử, KHÔNG tô đỏ cả câu", () => {
    expect(phuongAnChonSai(["a", "x"], dapAn)).toEqual(["x"]);
  });

  it("bỏ sót được chỉ đúng phần tử", () => {
    expect(phuongAnBoSot(["a"], dapAn)).toEqual(["b", "c"]);
  });

  it("chọn đủ rồi thì hai hàm đều rỗng (không hiện gợi ý sai)", () => {
    expect(phuongAnChonSai(dapAn, dapAn)).toEqual([]);
    expect(phuongAnBoSot(dapAn, dapAn)).toEqual([]);
  });
});

describe("buildExpression — thẻ phải TÁCH RỜI số và dấu", () => {
  it("thẻ số đọc được nhiều kiểu viết của SGK", () => {
    expect(parseNumber("25")).toBe(25);
    expect(parseNumber("1 000")).toBe(1000); // dấu cách phân cách nghìn
    expect(parseNumber("1.000")).toBe(1000); // dấu chấm phân cách nghìn
    expect(parseNumber("0,5")).toBe(0.5); // dấu phẩy thập phân kiểu Việt Nam
  });

  it("thẻ SỐ: nhận số, KHÔNG nhận dấu hay chuỗi trộn", () => {
    expect(isNumberToken("25")).toBe(true);
    expect(isNumberToken("×")).toBe(false);
    expect(isNumberToken("25 ×")).toBe(false); // ← đúng lỗi người dùng báo
    expect(isNumberToken("4 ×")).toBe(false);
    expect(isNumberToken("abc")).toBe(false);
  });

  it("thẻ DẤU: nhận mọi cách viết dấu của SGK, KHÔNG nhận số", () => {
    for (const d of ["+", "−", "-", "×", "x", ":", "÷"])
      expect(isOperator(d)).toBe(true);
    expect(isOperator("25")).toBe(false);
    expect(isOperator("25 ×")).toBe(false);
  });
});

describe("evaluateTokens — tính giá trị dãy thẻ", () => {
  it("một phép tính", () => {
    expect(evaluateTokens(["25", "×", "4"])).toBe(100);
    expect(evaluateTokens(["4", "×", "25"])).toBe(100);
    expect(evaluateTokens(["1 000", ":", "8"])).toBe(125);
  });

  it("nhân/chia TRƯỚC cộng/trừ (tính từ trái sang phải là dạy sai)", () => {
    expect(evaluateTokens(["2", "+", "3", "×", "4"])).toBe(14);
    expect(evaluateTokens(["10", "−", "8", ":", "4"])).toBe(8);
  });

  it("dãy SAI cấu trúc ⇒ null, không ném lỗi", () => {
    expect(evaluateTokens(["25", "4"])).toBeNull(); // hai số cạnh nhau
    expect(evaluateTokens(["2", "5"])).toBeNull();
    expect(evaluateTokens(["+", "4", "5"])).toBeNull(); // bắt đầu bằng dấu
    expect(evaluateTokens(["2", "+"])).toBeNull();
    expect(evaluateTokens(["25", "×"])).toBeNull();
    expect(evaluateTokens(["2", "+", "3", "×"])).toBeNull();
    expect(evaluateTokens(["+", "+", "+"])).toBeNull();
    expect(evaluateTokens(["25", "×", "4", "+"])).toBeNull();
  });

  it("chia cho 0 ⇒ null (không ra Infinity rồi lặng lẽ sai)", () => {
    expect(evaluateTokens(["5", ":", "0"])).toBeNull();
  });

  it("mảng rỗng / null không nổ", () => {
    expect(evaluateTokens([])).toBeNull();
    expect(evaluateTokens(null)).toBeNull();
  });
});

describe("matchesTarget — ghép thẻ thành phép tính (buildExpression)", () => {
  it("ĐỔI CHỖ hai thừa số vẫn ĐÚNG: 25 × 4 và 4 × 25", () => {
    expect(matchesTarget(["25", "×", "4"], "100")).toBe(true);
    expect(matchesTarget(["4", "×", "25"], "100")).toBe(true);
  });

  it("đề lớp 4: 125 × 8 và 8 × 125 cùng ra 1 000", () => {
    expect(matchesTarget(["125", "×", "8"], "1 000")).toBe(true);
    expect(matchesTarget(["8", "×", "125"], "1 000")).toBe(true);
    expect(matchesTarget(["25", "×", "40"], "1 000")).toBe(true);
  });

  it("tính ra số KHÁC target ⇒ sai (4 × 25 = 100, không phải 1 000)", () => {
    expect(matchesTarget(["4", "×", "25"], "1 000")).toBe(false);
    expect(matchesTarget(["6", "×", "25"], "100")).toBe(false);
  });

  it("còn ô trống ⇒ chưa đúng", () => {
    expect(matchesTarget(["25"], "100")).toBe(false);
    expect(matchesTarget([null, "×", "4"], "100")).toBe(false);
    expect(matchesTarget(["25", "×", null], "100")).toBe(false);
  });

  it("dãy thẻ không phải biểu thức ⇒ sai, không ‘vô tình’ đúng", () => {
    expect(matchesTarget(["1", "0", "0"], "100")).toBe(false); // ba thẻ số, không phép tính
    expect(matchesTarget(["25", "4"], "25")).toBe(false);
  });

  it("target hỏng ⇒ KHÔNG BAO GIỜ báo đúng (chống slide soạn sai)", () => {
    expect(matchesTarget(["25", "×", "4"], "một trăm")).toBe(false);
    expect(matchesTarget(["25", "×", "4"], "")).toBe(false);
    expect(matchesTarget(["25", "×", "4"], undefined)).toBe(false);
  });

  it("số thập phân lớp 5: 0,5 × 4 = 2", () => {
    expect(matchesTarget(["0,5", "×", "4"], "2")).toBe(true);
  });
});

describe("oTrongDauTien / demODaDien — thanh tiến độ và chỗ đặt thẻ kế tiếp", () => {
  it("ô trống đầu tiên đúng vị trí", () => {
    expect(oTrongDauTien([null, null])).toBe(0);
    expect(oTrongDauTien(["a", null, null])).toBe(1);
  });

  it("đầy rồi ⇒ -1 (nút ‘đặt thẻ’ phải tự khoá)", () => {
    expect(oTrongDauTien(["a", "b"])).toBe(-1);
  });

  it("đếm số ô đã điền", () => {
    expect(demODaDien([null, "a", undefined, "b"])).toBe(2);
    expect(demODaDien([])).toBe(0);
    expect(demODaDien(null)).toBe(0);
  });

  it("giá trị rỗng CHUỖI vẫn tính là đã điền (khác null/undefined)", () => {
    expect(demODaDien(["", "a"])).toBe(2);
  });
});

describe("laCapDung / khoaCap / daNoiHet — nối cặp (matchPairs)", () => {
  const cap = [
    ["2 + 3", "5"],
    ["4 + 4", "8"],
  ];

  it("nối đúng cặp theo dữ liệu", () => {
    expect(laCapDung("2 + 3", "5", cap)).toBe(true);
    expect(laCapDung("4 + 4", "8", cap)).toBe(true);
  });

  it("nối LỆCH vế ⇒ sai (2 + 3 với 8)", () => {
    expect(laCapDung("2 + 3", "8", cap)).toBe(false);
  });

  it("nhận cả dạng object `{ trai, phai }`", () => {
    expect(laCapDung("a", "1", [{ trai: "a", phai: "1" }])).toBe(true);
  });

  it("khoá cặp phân biệt được hai chiều", () => {
    expect(khoaCap("2 + 3", "5")).not.toBe(khoaCap("5", "2 + 3"));
  });

  it("nối hết khi số cặp ĐÃ NỐI bằng số cặp đề bài", () => {
    expect(daNoiHet([khoaCap("2 + 3", "5"), khoaCap("4 + 4", "8")], cap)).toBe(
      true,
    );
  });

  it("nối lại một cặp cũ không làm tăng tiến độ (Set khoá)", () => {
    const mot = khoaCap("2 + 3", "5");
    expect(daNoiHet([mot, mot], cap)).toBe(false);
  });

  it("đề rỗng ⇒ KHÔNG coi là xong (chống slide hỏng im lặng)", () => {
    expect(daNoiHet([], [])).toBe(false);
  });

  // 🔴 CANARY BỊT ĐÚNG LỖI TỰ SOÁT RA (2026-09-28): `matchPairsSlide` hỏi
  // `khoaDaNoi.has(trai)` — đem giá trị TRÁI so với KHOÁ GHÉP nên không bao giờ đúng ⇒ thẻ đã
  // nối không bị khoá/xám. Hai vế dưới đây khoá chặt hợp đồng của `traiDaNoi`.
  it("traiDaNoi: có thẻ TRÁI của cặp đã nối (để khoá/xám thẻ đó)", () => {
    const daNoi = [khoaCap("2 + 3", "5")];
    expect(traiDaNoi(daNoi).has("2 + 3")).toBe(true);
  });

  it("traiDaNoi: KHÔNG nhận giá trị PHẢI là thẻ trái (vế chống bắt nhầm)", () => {
    const daNoi = [khoaCap("2 + 3", "5")];
    expect(traiDaNoi(daNoi).has("5")).toBe(false);
    expect(traiDaNoi(daNoi).has("2 + 3||5")).toBe(false);
  });

  it("traiDaNoi: hai cặp khác nhau cho hai thẻ trái khác nhau", () => {
    const daNoi = [khoaCap("2 + 3", "5"), khoaCap("4 + 4", "8")];
    expect([...traiDaNoi(daNoi)].sort()).toEqual(["2 + 3", "4 + 4"]);
  });

  it("traiDaNoi: chưa nối gì / giá trị rỗng không nổ", () => {
    expect(traiDaNoi([]).size).toBe(0);
    expect(traiDaNoi(null).size).toBe(0);
    expect(traiDaNoi(["không có dấu tách"]).has("không có dấu tách")).toBe(
      true,
    );
  });
});

describe("xaoOnDinh — đảo cột phải để bé không nối hàng-trên-với-hàng-dưới", () => {
  const goc = ["5", "8", "12"];

  it("đảo vòng một bậc", () => {
    expect(xaoOnDinh(goc)).toEqual(["8", "12", "5"]);
  });

  it("KHÔNG có hàng nào còn khớp vị trí cũ (vế canary thứ hai)", () => {
    const dao = xaoOnDinh(goc);
    goc.forEach((v, i) => expect(dao[i]).not.toBe(v));
  });

  it("KHÔNG sửa mảng gốc (dữ liệu bài học dùng chung)", () => {
    const truoc = [...goc];
    xaoOnDinh(goc);
    expect(goc).toEqual(truoc);
  });

  it("danh sách 1–2 phần tử giữ nguyên (đảo cũng ra chính nó)", () => {
    expect(xaoOnDinh(["a"])).toEqual(["a"]);
    expect(xaoOnDinh(["a", "b"])).toEqual(["a", "b"]);
  });

  it("gọi hai lần cho KẾT QUẢ GIỐNG NHAU (không ngẫu nhiên — bé đang nhìn không bị đổi chỗ)", () => {
    expect(xaoOnDinh(goc)).toEqual(xaoOnDinh(goc));
  });

  it("mảng rỗng/null không nổ", () => {
    expect(xaoOnDinh([])).toEqual([]);
    expect(xaoOnDinh(null)).toEqual([]);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════════════
// HAI DẠNG “TỰ TRẢ LỜI” (2026-09-28, ảnh Duolingo thứ hai): nhập kết quả + trả lời trên trục số.
// ═══════════════════════════════════════════════════════════════════════════════════════

describe("parseTypedNumber / matchesNumber — bé TỰ GÕ kết quả (typeAnswer)", () => {
  it("đọc chuỗi chữ số thành số", () => {
    expect(parseTypedNumber("16")).toBe(16);
    expect(parseTypedNumber("0")).toBe(0);
    expect(parseTypedNumber("  7 ")).toBe(7);
  });

  it("KHÔNG phải số ⇒ null", () => {
    expect(parseTypedNumber("")).toBeNull();
    expect(parseTypedNumber("1 6")).toBeNull(); // có dấu cách ở giữa
    expect(parseTypedNumber("mười")).toBeNull();
    expect(parseTypedNumber("1,5")).toBeNull(); // bàn phím app chỉ có 0–9
    expect(parseTypedNumber(null)).toBeNull();
  });

  it("gõ đúng ⇒ đúng; và số 0 đứng đầu KHÔNG làm sai oan (`016` = `16`)", () => {
    expect(matchesNumber("16", 16)).toBe(true);
    expect(matchesNumber("016", 16)).toBe(true);
    expect(matchesNumber("0", 0)).toBe(true);
  });

  it("gõ SAI ⇒ sai", () => {
    expect(matchesNumber("15", 16)).toBe(false);
    expect(matchesNumber("1 6", 16)).toBe(false);
    expect(matchesNumber("", 16)).toBe(false);
  });

  it("`answer` soạn sai (chữ) ⇒ không bao giờ báo đúng, không nổ", () => {
    expect(matchesNumber("16", "mười sáu")).toBe(false);
    expect(matchesNumber("16", undefined)).toBe(false);
  });
});

describe("ticksOf — các VẠCH của trục số", () => {
  it("chia đều khoảng, kể cả hai đầu", () => {
    expect(ticksOf({ min: 0, max: 10, step: 2 })).toEqual([0, 2, 4, 6, 8, 10]);
    expect(ticksOf({ min: 4000, max: 6000, step: 500 })).toEqual([
      4000, 4500, 5000, 5500, 6000,
    ]);
  });

  it("`step` KHÔNG chia hết khoảng ⇒ [] (vạch cuối lệch khỏi max)", () => {
    expect(ticksOf({ min: 0, max: 10, step: 3 })).toEqual([]);
  });

  it("dữ liệu vô lý ⇒ [] (step ≤ 0, max ≤ min, thiếu số)", () => {
    expect(ticksOf({ min: 0, max: 10, step: 0 })).toEqual([]);
    expect(ticksOf({ min: 10, max: 0, step: 2 })).toEqual([]);
    expect(ticksOf({ min: 0, max: 10 })).toEqual([]);
    expect(ticksOf({})).toEqual([]);
    expect(ticksOf(null)).toEqual([]);
  });

  it("khoảng chỉ có MỘT vạch (min = max) ⇒ [] — bé không có gì để chọn", () => {
    expect(ticksOf({ min: 5, max: 5, step: 1 })).toEqual([]);
  });
});

describe("nearestTick / matchesNumberLine — kéo con trỏ trên trục số (numberLineAnswer)", () => {
  const vach = [0, 2, 4, 6, 8, 10];

  it("giá trị nằm giữa hai vạch ⇒ bám vào vạch GẦN NHẤT", () => {
    // 2,9 gần 2 hơn; 3,1 gần 4 hơn (khoảng cách 0,9 so với 1,1) — ký vọng phải theo SỐ, không
    // theo cảm giác. Lần đầu tôi viết `3,1 → 2` và test đã bắt đúng cái sai của chính tôi.
    expect(nearestTick(2.9, vach)).toBe(2);
    expect(nearestTick(3.1, vach)).toBe(4);
    expect(nearestTick(0.2, vach)).toBe(0);
    expect(nearestTick(9.9, vach)).toBe(10);
  });

  it("kéo ra ngoài hai đầu ⇒ bám vào đầu gần nhất, không trả giá trị lạ", () => {
    expect(nearestTick(-5, vach)).toBe(0);
    expect(nearestTick(99, vach)).toBe(10);
  });

  it("danh sách vạch rỗng ⇒ null (không nổ)", () => {
    expect(nearestTick(3, [])).toBeNull();
    expect(nearestTick(3, null)).toBeNull();
  });

  it("chọn ĐÚNG vạch ⇒ đúng; chọn vạch khác ⇒ sai", () => {
    expect(matchesNumberLine(6, 6)).toBe(true);
    expect(matchesNumberLine(4, 6)).toBe(false);
    expect(matchesNumberLine(null, 6)).toBe(false);
    expect(matchesNumberLine(6, undefined)).toBe(false);
  });
});
