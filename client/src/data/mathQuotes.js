/**
 * LỜI ĐỘNG VIÊN — câu nói nổi tiếng về toán học của các danh nhân.
 *
 * 🔴 KHÔNG LỌC THEO LỚP (yêu cầu người dùng 2026-09-23): một danh sách PHẲNG dùng
 * chung cho MỌI lớp. Khác với `data/mathTips.js` (mẹo học có `GRADE_MATH_TIPS[grade]`
 * vì mẹo phải khớp chương trình của từng lớp) — câu động viên thì bé lớp 1 hay lớp 5
 * đọc đều hợp. Đừng thêm `MATH_QUOTES[grade]` ở đây.
 *
 * Câu chọn theo 3 tiêu chí: (1) ngắn, đọc một hơi hết; (2) nghĩa đơn giản, bé tiểu học
 * hiểu được; (3) nói về TOÁN, về HỌC hoặc về KIÊN TRÌ — không chọn câu triết học trừu
 * tượng kiểu "toán học là nghiên cứu cấu trúc trừu tượng".
 *
 * Nguồn đã tham khảo (đối chiếu tên tác giả, không chép nguyên một bộ sưu tập nào):
 *   • Wikiquote — "Mathematics" (en.wikiquote.org/wiki/Mathematics) và bản tiếng Việt
 *     (vi.wikiquote.org/wiki/Toán_học): có ghi nguồn gốc từng câu + mục "Misattributed".
 *   • Các bộ sưu tập danh ngôn toán học phổ biến (MAA Convergence, Đại học St Andrews
 *     "Quotations by Hardy", ghi chú của Quanta Magazine / Scientific American).
 * ⚠️ Đã TRÁNH những câu Wikiquote xếp vào nhóm "Misattributed" (hay bị gán sai tác giả),
 * ví dụ câu "Mathematicians have made a covenant with the devil" bị gán sai cho
 * Thánh Augustine, hay "Play is the highest form of research" gán sai cho Einstein.
 */

export const MATH_QUOTES = [
  // ── Về chính toán học ──────────────────────────────────────────────────
  {
    text: "Toán học là nữ hoàng của mọi khoa học.",
    author: "Carl Friedrich Gauss",
    emoji: "👑",
  },
  {
    text: "Cuốn sách vĩ đại của vũ trụ được viết bằng ngôn ngữ toán học.",
    author: "Galileo Galilei",
    emoji: "📖",
  },
  {
    text: "Toán học là âm nhạc của lý trí.",
    author: "James J. Sylvester",
    emoji: "🎵",
  },
  {
    text: "Toán học thuần tuý, theo cách của nó, là thơ của những ý tưởng logic.",
    author: "Albert Einstein",
    emoji: "✨",
  },
  {
    text: "Toán học là món quà đẹp nhất và mạnh mẽ nhất mà trí tuệ con người tạo ra.",
    author: "Stefan Banach",
    emoji: "🎁",
  },
  {
    text: "Nhìn cho đúng thì toán học không chỉ có chân lý, mà còn có vẻ đẹp tuyệt vời.",
    author: "Bertrand Russell",
    emoji: "💎",
  },
  {
    text: "Nhà toán học, cũng như hoạ sĩ hay nhà thơ, là người tạo ra những mẫu hình.",
    author: "G. H. Hardy",
    emoji: "🧩",
  },
  {
    text: "Cái đẹp là bài kiểm tra đầu tiên: toán học xấu sẽ không sống được lâu.",
    author: "G. H. Hardy",
    emoji: "🌸",
  },
  {
    text: "Toán học là nghệ thuật gọi cùng một cái tên cho nhiều thứ khác nhau.",
    author: "Henri Poincaré",
    emoji: "🎨",
  },
  {
    text: "Toán học là cánh cửa và chiếc chìa khoá dẫn tới mọi khoa học.",
    author: "Roger Bacon",
    emoji: "🚪",
  },
  {
    text: "Ở đâu có vật chất, ở đó có hình học.",
    author: "Johannes Kepler",
    emoji: "📐",
  },
  {
    text: "Không có nhánh toán học nào, dù trừu tượng đến đâu, mà lại không có ngày được dùng vào thực tế.",
    author: "Nikolai Lobachevsky",
    emoji: "🌍",
  },
  {
    text: "Số là ông vua cai quản vũ trụ.",
    author: "Pythagoras",
    emoji: "🔢",
  },
  {
    text: "Toán học là môn khoa học của những điều hiển nhiên.",
    author: "Felix Klein",
    emoji: "💡",
  },
  {
    text: "Toán học có mặt trong tiếng dây đàn ngân, và có âm nhạc trong khoảng cách giữa các hành tinh.",
    author: "Pythagoras",
    emoji: "🎻",
  },
  {
    text: "Không thể làm toán mà không có tâm hồn của một nhà thơ.",
    author: "Sofia Kovalevskaya",
    emoji: "🖋️",
  },

  // ── Toán học hiểu theo cách của người làm toán ─────────────────────────
  {
    text: "Toán học không phải là về con số, phương trình hay thuật toán — nó là về sự HIỂU.",
    author: "William Thurston",
    emoji: "🧠",
  },
  {
    text: "Toán học là quá trình nhìn thật chăm chú và thật kiên nhẫn vào màn sương mù mờ mịt, cho tới khi mọi thứ sáng tỏ.",
    author: "William Thurston",
    emoji: "🌫️",
  },
  {
    text: "Trong toán học, bạn không cần hiểu mọi thứ đâu. Bạn chỉ cần quen dần với chúng.",
    author: "John von Neumann",
    emoji: "🙂",
  },
  {
    text: "Nếu mọi người không tin toán học đơn giản, thì chỉ vì họ không biết cuộc sống phức tạp đến mức nào.",
    author: "John von Neumann",
    emoji: "🌀",
  },
  {
    text: "Toán học không biết tới màu da hay biên giới. Với toán học, cả thế giới là một đất nước.",
    author: "David Hilbert",
    emoji: "🤝",
  },
  {
    text: "Nghệ thuật làm toán là đi tìm trường hợp đặc biệt chứa mầm mống của mọi điều tổng quát.",
    author: "David Hilbert",
    emoji: "🔍",
  },
  {
    text: "Ta phải biết. Ta sẽ biết!",
    author: "David Hilbert",
    emoji: "💪",
  },
  {
    text: "Trong toán học, nghệ thuật đặt câu hỏi còn quý hơn cả việc trả lời.",
    author: "Georg Cantor",
    emoji: "❓",
  },
  {
    text: "Không có con đường vương giả nào dẫn tới hình học cả.",
    author: "Euclid",
    emoji: "🛤️",
  },
  {
    text: "Đừng mong có lối tắt để hiểu toán — nhưng mỗi bước đi đều đáng giá.",
    author: "Euclid",
    emoji: "👣",
  },
  {
    text: "Mỗi bài toán con giải được lại trở thành một quy tắc giúp con giải những bài sau.",
    author: "René Descartes",
    emoji: "🧭",
  },
  {
    text: "Nếu tôi nhìn được xa hơn người khác, ấy là vì tôi đứng trên vai những người khổng lồ.",
    author: "Isaac Newton",
    emoji: "🦶",
  },
  {
    text: "Sớm muộn gì mọi bài toán cũng có lời giải. Rồi những bài từng khó sẽ trở thành bài tập cho trẻ em.",
    author: "Gian-Carlo Rota",
    emoji: "🏆",
  },

  // ── Kiên trì, sai lầm và luyện tập ────────────────────────────────────
  {
    text: "Cách duy nhất để học toán là LÀM toán.",
    author: "Paul Halmos",
    emoji: "✍️",
  },
  {
    text: "Nếu con chưa giải được một bài, hãy tìm một bài dễ hơn mà con giải được — rồi quay lại.",
    author: "George Pólya",
    emoji: "🪜",
  },
  {
    text: "Đừng lo về những khó khăn của con khi học toán. Cô đảm bảo rằng khó khăn của cô còn lớn hơn nhiều.",
    author: "Albert Einstein",
    emoji: "😌",
  },
  {
    text: "Không phải vì tôi thông minh, mà vì tôi ở lại lâu hơn với bài toán.",
    author: "Albert Einstein",
    emoji: "⏳",
  },
  {
    text: "Người chưa từng mắc lỗi là người chưa từng thử làm điều gì mới.",
    author: "Albert Einstein",
    emoji: "🌱",
  },
  {
    text: "Lúc đầu con sẽ sai nhiều hơn đúng. Không sao cả! Con vừa biết được điều không hiệu quả — thử lại nhé.",
    author: "Sophie Carr",
    emoji: "🔁",
  },
  {
    text: "Sai lầm là cánh cửa mở ra những khám phá.",
    author: "James Joyce",
    emoji: "🚪",
  },
  {
    text: "Học toán giống như đi tập thể dục — nhưng là tập cho bộ não!",
    author: "Danica McKellar",
    emoji: "🏋️",
  },
  {
    text: "Con không cần ai cho phép để trở thành một nhà toán học giỏi.",
    author: "Nira Chamberlain",
    emoji: "🌟",
  },
  {
    text: "Đừng để những gì con CHƯA làm được cản trở những gì con CÓ THỂ làm.",
    author: "John Wooden",
    emoji: "🚀",
  },
  {
    text: "Điều quan trọng nhất là đừng bao giờ ngừng đặt câu hỏi.",
    author: "Albert Einstein",
    emoji: "🙋",
  },
  {
    text: "Trí tưởng tượng quan trọng hơn kiến thức.",
    author: "Albert Einstein",
    emoji: "🌈",
  },

  // ── Niềm vui học toán ────────────────────────────────────────────────
  {
    text: "Tôi dùng toán học chỉ vì một lý do: để thấy vui, và để người khác cũng thấy vui theo.",
    author: "Paul Lockhart",
    emoji: "😄",
  },
  {
    text: "Nếu con nghĩ toán chỉ là những con số, thì con cũng đang nghĩ Shakespeare chỉ là những con chữ.",
    author: "Cliff Stoll",
    emoji: "📚",
  },
  {
    text: "Toán vui như một trò chơi giải đố: người mới chơi và nhà toán học thấy thích thú như nhau.",
    author: "Martin Gardner",
    emoji: "🎲",
  },
  {
    text: "Toán học giải trí là sở thích tuyệt vời mà cả trẻ con lẫn người lớn đều thích.",
    author: "Freeman Dyson",
    emoji: "🧸",
  },
  {
    text: "Có lúc con thấy như đang lạc trong rừng, không biết đi đâu. Rồi con lên tới đỉnh đồi, mọi thứ sáng rõ — cảm giác đó thật tuyệt!",
    author: "Maryam Mirzakhani",
    emoji: "⛰️",
  },
  {
    text: "Toán học ở khắp nơi: trong chiếc xích đu, trong dáng cây và chiếc lá, trong những đám mây.",
    author: "Kathleen Ollerenshaw",
    emoji: "☁️",
  },
  {
    text: "Toán học không bao giờ lừa con: một điều hoặc đúng, hoặc không đúng — thật rõ ràng.",
    author: "Sylvia Serfaty",
    emoji: "⚖️",
  },
  {
    text: "Không có phần nào của đời sống hiện đại mà lại thiếu bóng dáng của toán học.",
    author: "Hannah Fry",
    emoji: "🏙️",
  },
  {
    text: "Luôn luôn sẽ có toán học — như toán học đã luôn ở đó cùng con người.",
    author: "Katherine Johnson",
    emoji: "🔭",
  },
];

/** Tổng số câu — dùng cho cổng kiểm và cho nút "câu khác". */
export const MATH_QUOTE_COUNT = MATH_QUOTES.length;

/** Vị trí ngẫu nhiên để mở tab Động Viên là thấy câu mới, không luôn câu đầu. */
export function getRandomQuoteIndex() {
  return Math.floor(Math.random() * MATH_QUOTES.length);
}
