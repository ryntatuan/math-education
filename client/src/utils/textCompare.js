/**
 * SO NỘI DUNG HAI KHỐI CHỮ — dùng để BỎ KHỐI TRÙNG (không dùng để căn lề).
 *
 * VÌ SAO CÓ FILE NÀY. Người dùng gửi ảnh slide "Làm quen" Lớp 1 Bài 1 (2026-09-27) và chỉ đúng
 * chỗ sai: ô nhấn mạnh chỉ nhắc lại y hệt danh sách ngay dưới nó, rồi slide sau nói lần thứ ba.
 * Lỗi này là một HỌ, rải khắp 5 lớp, mắt người không soi hết 2 814 slide được — nên phải so bằng máy.
 *
 * ⚠️ CĂN LỀ KHÔNG QUYẾT ĐỊNH Ở ĐÂY. Căn lề theo VAI TRÒ của khối, viết thẳng trong CSS
 * (`pages/LessonPage.css`, mục "LUẬT CĂN LỀ") và được cổng tĩnh canh. Trước đây tôi định cho
 * căn lề phụ thuộc ĐỘ DÀI đoạn chữ, nhưng ngưỡng ký tự đúng trên máy tính lại sai trên điện
 * thoại (cùng 50 ký tự: một dòng ở máy tính, hai dòng ở điện thoại) ⇒ chữ nhảy chỗ tuỳ máy.
 * Căn theo vai trò thì giống nhau ở mọi kích thước màn hình.
 */

/** Gộp khoảng trắng để phép so không phụ thuộc dữ liệu viết tay thừa dấu cách. */
function compact(text) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Chia một chuỗi thành các TỪ đã chuẩn hoá để so trùng lặp nội dung.
 *
 * Bỏ: emoji (cặp surrogate — mỗi emoji là 2 đơn vị UTF-16), dấu câu, ký tự trang trí,
 * và các từ dừng tiếng Việt quá phổ biến (nếu giữ chúng thì "câu nào cũng giống câu nào").
 *
 * ⚠️ GIỮ LẠI token một ký tự (`1`, `2`, `x`, `I`): lưới số "1 2 3 … 20" mà lọc mất chữ số
 * thì phép so trùng lặp với bảng số y hệt sẽ KHÔNG bắt được — đúng ca `g1-c6-l9` đã gặp.
 */
const STOPWORDS = new Set(
  `và là của có cho các một hai ba những được trong với thì mà này đó khi như bé em mình ta
   sẽ hãy cùng nhau rồi ở trên dưới vào ra tới theo về bằng hay hoặc nếu thêm bớt
   bài học tập làm đi giúp bạn cô chú nhé vậy nên rất hơn nhất mỗi cả toàn bộ`
    .split(/\s+/)
    .filter(Boolean),
);

const PUNCTUATION = /[·•∙▪✔⭐★☆→←↑↓=+×÷:;,."“”'’()[\]{}/\\|_\-–—…%!?]/g;

export function contentWords(text) {
  const cleaned = compact(text)
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, " ")
    .replace(PUNCTUATION, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return new Set();
  return new Set(
    cleaned.split(" ").filter((w) => w.length > 0 && !STOPWORDS.has(w)),
  );
}

/**
 * `true` nếu MỌI từ của `shortText` đều có trong `longText` (khối ngắn nằm gọn trong khối dài).
 *
 * Dùng để bỏ khối trùng: "khối ngắn nằm gọn trong khối dài" ⇒ bỏ khối ngắn, không mất gì.
 *
 * ⚠️ CHIỀU QUAN TRỌNG: chỉ bỏ khối NGẮN khi khối DÀI chứa đủ nó. Ngược lại (bỏ khối dài vì
 * khối ngắn nằm trong nó) là MẤT THÔNG TIN — khối dài có thể còn ý chưa ai nói.
 */
export function coversAll(longText, shortText) {
  const long = contentWords(longText);
  const short = contentWords(shortText);
  if (!short.size || !long.size) return false;
  for (const word of short) if (!long.has(word)) return false;
  return true;
}
