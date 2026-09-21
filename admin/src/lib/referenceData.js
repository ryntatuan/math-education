/**
 * Dữ liệu cho trang THAM KHẢO (`/reference`) — chỉ để ĐỌC, không ghi gì.
 *
 * 🔴 VÌ SAO TÁCH RA FILE THUẦN: cổng `S-26` nạp thẳng file này vào Node để đối
 * chiếu với mã của app của bé — xem phần cuối. Nếu để trong `ReferencePage.jsx`
 * thì cổng chỉ grep được chuỗi, mà grep chuỗi thì xanh kể cả khi dữ liệu sai.
 *
 * ⚠️ Tên biến/hàm đặt TIẾNG ANH (nếp từ 2026-09-20); chữ hiện trên màn hình vẫn
 * là tiếng Việt vì đó là nội dung, không phải định danh trong mã.
 */

/**
 * Ngày đo các con số "đếm được" ở dưới. Số lượng slide là **ảnh chụp**, không
 * phải số sống: trang này cố ý KHÔNG truy vấn DB (nạp cả 362 payload là ~800 KB
 * cho một trang chỉ để tra cứu). Muốn số mới thì đo lại rồi cập nhật ngày này.
 */
export const MEASURED_ON = "2026-09-20";

/** Ba giá trị của ô "Kiểu bài" trong trình sửa. */
export const LESSON_TYPES = [
  {
    value: "learn",
    label: "Bài học",
    count: 362,
    note: "Toàn bộ 362 bài đang dùng giá trị này.",
  },
  {
    value: "practice",
    label: "Luyện tập",
    count: 0,
    note: "Chưa bài nào dùng.",
  },
  {
    value: "review",
    label: "Ôn tập",
    count: 0,
    note: "Chưa bài nào dùng.",
  },
];

/**
 * Nhãn tiếng Việt của 6 kiểu slide.
 * 🔴 ĐÂY LÀ NGUỒN DUY NHẤT — `LessonEditor.jsx` import lại từ file này. Trước
 * đây bảng nhãn nằm trong chính `LessonEditor`; chép sang trang tham khảo là có
 * hai bản, thêm một kiểu slide thì bản này quên là chắc. Cổng `S-26` cũng kiểm
 * bảng này phủ đủ **mọi** khoá của `SLIDE_TYPES`.
 */
export const SLIDE_TYPE_LABELS = {
  quiz: "Câu hỏi",
  story: "Kể chuyện",
  summary: "Ghi nhớ",
  concept: "Khái niệm",
  visual: "Hình ảnh",
  dialogue: "Hội thoại",
};

/**
 * Mô tả từng kiểu slide: dùng khi nào + trong app của bé nó hiện ra thế nào.
 * Khoá nào bắt buộc / tuỳ chọn thì **KHÔNG chép ở đây** — trang tham khảo đọc
 * thẳng `SLIDE_TYPES` trong `contentSchema.js`, nên không thể lệch (xem `S-26`).
 */
export const SLIDE_TYPE_INFO = {
  story: {
    count: 362,
    when: "Mở đầu hoặc dẫn dắt một ý. Một đoạn chữ bé đọc/nghe, kèm mặt linh vật.",
    onKidApp:
      "Thẻ kể chuyện: đoạn chữ + nút nghe đọc + một badge mặt linh vật. Đây là kiểu DUY NHẤT hiện `mascotMood`.",
  },
  summary: {
    count: 362,
    when: "Chốt lại điều cần nhớ ở cuối bài.",
    onKidApp:
      "Tiêu đề + danh sách các ý. ⚠️ App KHÔNG hiện `mascotMood` ở kiểu này — và từ 2026-09-20 khoá đó đã được bỏ khỏi danh sách bắt buộc, nên không phải điền nữa.",
  },
  quiz: {
    count: 396,
    when: "Câu hỏi để bé chọn đáp án. Kiểu phổ biến nhất.",
    onKidApp:
      "Câu hỏi + các lựa chọn; sai thì hiện gợi ý của linh vật (`mascotHint`). Có ghi lượt trả lời.",
  },
  concept: {
    count: 296,
    when: "Dạy một khái niệm/quy tắc mới. Nhiều khoá tuỳ chọn nhất.",
    onKidApp:
      "Nhãn nhỏ + tiêu đề, rồi tới quy tắc, giải thích, ví dụ, các bước, đồng hồ, hình minh hoạ… (chỉ hiện khoá nào có mặt).",
  },
  visual: {
    count: 82,
    when: "Cho bé nhìn một con số/danh sách hình để đếm.",
    onKidApp: "Đoạn chữ + một con số lớn và/hoặc danh sách vật thể.",
  },
  dialogue: {
    count: 7,
    when: "Hội thoại giữa các nhân vật, có câu hỏi kèm theo.",
    onKidApp:
      "Khung hội thoại + câu hỏi và lựa chọn. ⚠️ Cũng là CÂU HỎI nên có ghi lượt trả lời, dùng `correctAnswer` (KHÁC `quiz` dùng `answer`).",
  },
};

/**
 * Biểu cảm linh vật — giá trị của khoá `mascotMood`.
 *
 * 🔴 `face` phải KHỚP `MASCOT_FACES` trong `client/src/data/mascotFaces.js`. Cổng
 * `S-26` đối chiếu **cả danh sách giá trị LẪN từng mặt** — lệch là đỏ. Trước đây
 * bảng này còn ghi "app chỉ vẽ mặt riêng cho 3 giá trị", nhưng từ 2026-09-20 cả
 * slide lẫn bong bóng linh vật dùng CHUNG một từ vựng, nên mọi giá trị đều có mặt.
 *
 * Số `count` là số slide thật đang mang giá trị đó (đo từ DB ngày MEASURED_ON).
 */
export const MASCOT_MOODS = [
  { value: "proud", face: "😎", count: 299, note: "Nhiều nhất." },
  {
    value: "happy",
    face: "😊",
    count: 220,
    note: "Trùng MẶT MẶC ĐỊNH — giá trị lạ cũng ra mặt này.",
  },
  { value: "excited", face: "🤩", count: 100, note: "" },
  {
    value: "celebrate",
    face: "🎉",
    count: 93,
    note: "🔴 Trước 2026-09-20 hiện 😊 (slide tự viết danh sách riêng); nay hiện đúng 🎉.",
  },
  {
    value: "thinking",
    face: "🧐",
    count: 12,
    note: "Ít nhất. Trước hiện 🤔 ở slide nhưng 🧐 ở bong bóng — nay gộp một mặt.",
  },
  {
    value: "curious",
    face: "🤔",
    count: 0,
    note: "Có trong từ vựng, chưa nội dung nào dùng.",
  },
  {
    value: "encourage",
    face: "💪",
    count: 0,
    note: "Có trong từ vựng, chưa nội dung nào dùng.",
  },
  {
    value: "sad",
    face: "😢",
    count: 0,
    note: "Có trong từ vựng, chưa nội dung nào dùng.",
  },
  {
    value: "hint",
    face: "💡",
    count: 0,
    note: "Có trong từ vựng, chưa nội dung nào dùng.",
  },
];

/**
 * Khoá dễ hiểu nhầm khi sửa bài. Mục đích: đọc một lần là biết gõ vào đâu.
 */
export const TRICKY_KEYS = [
  {
    key: "mascotMood",
    types: "story",
    note: "Chỉ slide `story` mới HIỆN ra. Ở `summary` là khoá tuỳ chọn (từ 2026-09-20) và app bỏ qua. Giá trị dùng được: xem bảng ở mục D.",
  },
  {
    key: "mascotHint",
    types: "quiz",
    note: "Lời gợi ý hiện khi bé trả lời sai. Bắt buộc ở `quiz`.",
  },
  {
    key: "answer",
    types: "quiz",
    note: "Đáp án đúng. BẮT BUỘC nằm trong danh sách `options` (ô chọn trong trình sửa tự lo điều này).",
  },
  {
    key: "correctAnswer",
    types: "dialogue",
    note: "🔴 Cũng là đáp án đúng, nhưng tên khác `quiz`. Gõ `answer` vào slide hội thoại là SAI — trình sửa sẽ báo thiếu `correctAnswer`.",
  },
  {
    key: "options",
    types: "quiz · dialogue",
    note: "Danh sách lựa chọn, mỗi dòng một lựa chọn. Nếu toàn số thì giữ nguyên kiểu số.",
  },
  {
    key: "shape · shapeLabel",
    types: "concept",
    note: "Phải đi THÀNH CẶP: có hình mà không có nhãn (hoặc ngược lại) là giao diện vỡ. Trình sửa xoá là xoá cả cặp.",
  },
  {
    key: "gallery · galleryTitle",
    types: "concept",
    note: "Cũng phải đi thành cặp, cùng lý do.",
  },
];
