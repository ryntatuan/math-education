/**
 * LUẬT BỐ CỤC CHO BẢNG — hàm THUẦN, tách khỏi `CoreVisuals.jsx` để đo và kiểm được.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng gửi ảnh bảng "Bốn biểu tượng", 2026-09-27):
 *   1. "còn chỗ trống 2 bên nhưng khung lại không hiển thị hết" — bảng rộng ~300 đơn vị
 *      trong khi thẻ cho 368, nên khung bảng lọt thỏm giữa thẻ với hai khoảng trống hai bên.
 *   2. "làm cho chữ bị xuống dòng" — cột rộng VỪA ĐỦ cho nội dung dài nhất nhưng số ký tự
 *      mỗi dòng lại tính bằng `floor()` nên bị hụt đúng 1 ký tự ⇒ "Hoạt động" tự nhiên
 *      xuống dòng dù ô còn chỗ.
 *   3. "do căn giữa nên thông tin lộn xộn, thụt ra thụt vào" — MỌI ô đều `textAnchor="middle"`,
 *      kể cả cột nhãn và cột câu giải thích.
 *
 * BA LUẬT (áp cho mọi bảng của cả 5 lớp, không có ngoại lệ riêng lẻ):
 *   A. CỘT GIÁ TRỊ căn GIỮA — mọi ô đều là một "token" ngắn, không có dấu cách (số, số La Mã,
 *      chữ cái). Bảng số liệu, bảng cửu chương, bảng số 1→50 thuộc nhóm này.
 *   B. CỘT CHỮ căn TRÁI — chỉ cần MỘT ô có dấu cách hoặc dài là cả cột căn trái, kể cả ô
 *      tiêu đề cột. Đây là điều kiện để cột nhãn và cột giải thích thẳng mốc với nhau.
 *   C. BẢNG ≤ 3 CỘT giãn hết bề rộng cho phép (chia đều phần dư), KHÔNG để khung lọt thỏm.
 *      Bảng ≥ 4 cột thì không giãn: giãn sẽ đẩy bảng vào ngưỡng phải cắt thành nhiều khối.
 */

/** Ô coi là "giá trị" khi ngắn và không có dấu cách ("12", "VIII", "x", "35+24" không có dấu cách). */
export const VALUE_CELL_MAX = 8;

export function isValueCell(value) {
  const s = String(value ?? "").trim();
  if (!s) return true; // ô trống không làm cột thành cột chữ
  return !/\s/.test(s) && s.length <= VALUE_CELL_MAX;
}

/**
 * Căn lề cho một cột: `"middle"` (giá trị) hay `"start"` (chữ).
 * `rows` là mảng các hàng dữ liệu (KHÔNG gồm hàng tiêu đề).
 */
export function columnAnchor(rows, colIndex) {
  const cells = [];
  for (const row of rows) {
    const cell = Array.isArray(row)
      ? row[colIndex]
      : colIndex === 0
        ? row
        : undefined;
    if (String(cell ?? "").trim()) cells.push(cell);
  }
  if (!cells.length) return "middle";
  return cells.every(isValueCell) ? "middle" : "start";
}

/**
 * Số ký tự tối đa mỗi dòng trong một ô.
 *
 * 🔴 `longestChars` là CHẶN TRÊN, không phải gợi ý: bề rộng cột đã được tính TỪ nội dung dài
 * nhất (`longestChars × charWidth + 2 × cellPadding`), nên nếu chỉ suy ngược từ bề rộng bằng
 * `floor()` thì luôn hụt ~1 ký tự ⇒ ô tự xuống dòng dù còn chỗ. Khi cột bị CO LẠI (bảng nhiều
 * cột, hoặc tổng vượt ngân sách) thì chặn trên này lớn hơn sức chứa thật, lúc đó `floor()`
 * mới là giới hạn đúng — vì thế phải lấy `min` của cả hai.
 */
export function charsPerLine(width, longestChars, charWidth, cellPadding) {
  const byWidth = Math.floor((width - cellPadding * 2 + charWidth) / charWidth);
  return Math.max(4, Math.min(longestChars, byWidth));
}

/**
 * Chia phần bề rộng CÒN DƯ cho các cột (giữ nguyên tổng ≤ `budget`, không cột nào vượt `maxWidth`).
 * Ưu tiên cột CHỮ (`preferIndexes`) — cột số chỉ cần đủ chỗ, rộng thêm chỉ làm số lạc lõng.
 */
export function widenColumns(widths, budget, maxWidth, preferIndexes = []) {
  const out = [...widths];
  if (!out.length) return out;
  let room = budget - out.reduce((a, b) => a + b, 0);
  if (room <= 0) return out;

  /**
   * Chia từng ĐƠN VỊ một theo vòng tròn cho các cột còn chỗ.
   *
   * 🔴 VÌ SAO KHÔNG chia theo "suất bằng nhau" một lượt: phần dư chia đều thường lẻ, mà cột chữ
   * lại chạm trần `maxWidth` trước các cột khác ⇒ phần lẻ bị BỎ RƠI (đã đo: bảng `[60, 295]`
   * ngân sách 368 chỉ giãn được tới 364). Chia từng đơn vị thì luôn dùng hết, và không bao giờ
   * vượt `maxWidth` hay `budget`.
   */
  const spread = (indexes, amount) => {
    const usable = indexes.filter((i) => i >= 0 && i < out.length);
    if (!usable.length || amount <= 0) return amount;
    let cursor = 0;
    let stall = 0;
    let left = amount;
    while (left > 0 && stall < usable.length) {
      const i = usable[cursor % usable.length];
      cursor++;
      if (out[i] < maxWidth) {
        out[i] += 1;
        left -= 1;
        stall = 0;
      } else {
        stall++;
      }
    }
    return left;
  };

  const all = out.map((_, i) => i);
  room = spread(preferIndexes, room); // ưu tiên cột CHỮ
  spread(all, room); // còn dư thì rải cho mọi cột
  return out;
}
