/**
 * LỌC NHÃN DẪN SÁCH KHỎI GIAO DIỆN — LƯỚI AN TOÀN CHO CÂY NỘI DUNG CŨ.
 *
 * 🔴 TÌNH HÌNH (2026-09-29): file dữ liệu trong repo ĐÃ SẠCH nhãn (app là app độc lập, không
 * nhắc tới sách giáo khoa nữa — yêu cầu người dùng). Nhưng cây nội dung mà app đang đọc có
 * thể là bản CŨ trong DB, hoặc bản đã cache trong `localStorage` của máy bé, vẫn còn nhãn
 * `(SGK tr.6)`. Bộ lọc này chặn chúng ở tầng hiển thị cho tới khi bản mới được nạp.
 *
 * Vì vậy hàm ở đây chạy lúc ĐỌC cây nội dung (`contentSource.layGrades`), không sửa file.
 * Cổng `TC-0.9` (S-33) canh đúng dây nối này — xem `scripts/test-admin-portal.mjs`.
 *
 * ⚠️ Chuỗi trong dữ liệu có thể có XUỐNG DÒNG (nhãn bảng, `text` nhiều dòng), nên phải lọc
 * theo TỪNG DÒNG rồi mới nối lại — gộp khoảng trắng toàn cục sẽ làm mất dấu xuống dòng.
 */

// Thứ tự QUAN TRỌNG: dọn các dạng dài trước, dạng trơ "SGK" sau cùng.
const RULES = [
  // Tiền tố ở đầu chuỗi: "SGK (tr.6–7): ", "SGK Bài 1 (tr.8–10): ", "Theo SGK tr.5: "
  /^\s*(?:theo\s+|đúng\s+)?SGK\b[^:：]{0,60}[:：]\s*/i,
  // Trong ngoặc: "(SGK tr.6)", "(theo SGK tr.5 và tr.111)", "(SGK Lớp 2 tr.13)"
  /\s*\(\s*(?:theo\s+|đúng\s+)?SGK\b[^)]*\)/gi,
  // "— bảng như SGK tr.4" ⇒ bỏ cả cụm "như SGK tr.4"
  /\s*—?\s*như\s+SGK\b[^.,;!?]*/gi,
  // "theo đúng SGK.", "theo SGK" còn sót
  /\s*(?:theo\s+)?(?:đúng\s+)?SGK\b/gi,
];

/** Bỏ nhãn dẫn trang SGK trong một chuỗi (giữ nguyên nếu không có nhãn). */
export function stripTextbookRefs(text) {
  if (typeof text !== "string" || !/SGK/i.test(text)) return text;
  const dong = text
    .split("\n")
    .map((line) => {
      let s = line;
      for (const re of RULES) s = s.replace(re, " ");
      return (
        s
          // gọn dấu vết còn lại: khoảng trắng đôi, " ." → ".", ngoặc rỗng, gạch treo cuối dòng
          .replace(/[ \t]{2,}/g, " ")
          .replace(/[ \t]+([.,;:!?])/g, "$1")
          .replace(/\(\s*\)/g, "")
          .replace(/\s*[—–-]\s*$/g, "")
          .replace(/[ \t]+$/g, "")
      );
    })
    .join("\n");
  return dong.replace(/\n{3,}/g, "\n\n").trim();
}

/** Lọc bỏ nhãn SGK trong TOÀN BỘ cây nội dung (chuỗi lồng trong mảng/đối tượng bất kỳ). */
export function stripTextbookRefsInTree(value) {
  if (typeof value === "string") return stripTextbookRefs(value);
  if (Array.isArray(value)) return value.map(stripTextbookRefsInTree);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value))
      out[key] = stripTextbookRefsInTree(value[key]);
    return out;
  }
  return value;
}
