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
    original: "Mathematics is the queen of the sciences.",
    author: "Carl Friedrich Gauss",
    emoji: "👑",
  },
  {
    text: "Cuốn sách vĩ đại của vũ trụ được viết bằng ngôn ngữ toán học.",
    original: "The book of nature is written in the language of mathematics.",
    author: "Galileo Galilei",
    emoji: "📖",
  },
  {
    text: "Toán học là âm nhạc của lý trí.",
    original: "Mathematics is the music of reason.",
    author: "James J. Sylvester",
    emoji: "🎵",
  },
  {
    text: "Toán học thuần tuý, theo cách của nó, là thơ của những ý tưởng logic.",
    original: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein",
    emoji: "✨",
  },
  {
    text: "Toán học là món quà đẹp nhất và mạnh mẽ nhất mà trí tuệ con người tạo ra.",
    original: "Mathematics is the most beautiful and most powerful creation of the human spirit.",
    author: "Stefan Banach",
    emoji: "🎁",
  },
  {
    text: "Nhìn cho đúng thì toán học không chỉ có chân lý, mà còn có vẻ đẹp tuyệt vời.",
    original: "Mathematics, rightly viewed, possesses not only truth, but supreme beauty.",
    author: "Bertrand Russell",
    emoji: "💎",
  },
  {
    text: "Nhà toán học, cũng như hoạ sĩ hay nhà thơ, là người tạo ra những mẫu hình.",
    original: "A mathematician, like a painter or poet, is a maker of patterns.",
    author: "G. H. Hardy",
    emoji: "🧩",
  },
  {
    text: "Cái đẹp là bài kiểm tra đầu tiên: toán học xấu sẽ không sống được lâu.",
    original: "Beauty is the first test: there is no permanent place in the world for ugly mathematics.",
    author: "G. H. Hardy",
    emoji: "🌸",
  },
  {
    text: "Toán học là nghệ thuật gọi cùng một cái tên cho nhiều thứ khác nhau.",
    original: "Mathematics is the art of giving the same name to different things.",
    author: "Henri Poincaré",
    emoji: "🎨",
  },
  {
    text: "Toán học là cánh cửa và chiếc chìa khoá dẫn tới mọi khoa học.",
    original: "Mathematics is the door and key to the sciences.",
    author: "Roger Bacon",
    emoji: "🚪",
  },
  {
    text: "Ở đâu có vật chất, ở đó có hình học.",
    original: "Where there is matter, there is geometry.",
    author: "Johannes Kepler",
    emoji: "📐",
  },
  {
    text: "Không có nhánh toán học nào, dù trừu tượng đến đâu, mà lại không có ngày được dùng vào thực tế.",
    original: "There is no branch of mathematics, however abstract, which may not some day be applied to phenomena of the real world.",
    author: "Nikolai Lobachevsky",
    emoji: "🌍",
  },
  {
    text: "Số là ông vua cai quản vũ trụ.",
    original: "Number rules the universe.",
    author: "Pythagoras",
    emoji: "🔢",
  },
  {
    text: "Toán học là môn khoa học của những điều hiển nhiên.",
    original: "Mathematics in general is fundamentally the science of self-evident things.",
    author: "Felix Klein",
    emoji: "💡",
  },
  {
    text: "Toán học có mặt trong tiếng dây đàn ngân, và có âm nhạc trong khoảng cách giữa các hành tinh.",
    original: "There is geometry in the humming of the strings, there is music in the spacing of the spheres.",
    author: "Pythagoras",
    emoji: "🎻",
  },
  {
    text: "Không thể làm toán mà không có tâm hồn của một nhà thơ.",
    original: "It is impossible to be a mathematician without being a poet in soul.",
    author: "Sofia Kovalevskaya",
    emoji: "🖋️",
  },

  // ── Toán học hiểu theo cách của người làm toán ─────────────────────────
  {
    text: "Toán học không phải là về con số, phương trình hay thuật toán — nó là về sự HIỂU.",
    original: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
    author: "William Thurston",
    emoji: "🧠",
  },
  {
    text: "Toán học là quá trình nhìn thật chăm chú và thật kiên nhẫn vào màn sương mù mờ mịt, cho tới khi mọi thứ sáng tỏ.",
    original: "Mathematics is a process of staring hard enough with enough perseverance at the fog of muddle and confusion to eventually break through to improved clarity.",
    author: "William Thurston",
    emoji: "🌫️",
  },
  {
    text: "Trong toán học, bạn không cần hiểu mọi thứ đâu. Bạn chỉ cần quen dần với chúng.",
    original: "In mathematics you don't understand things. You just get used to them.",
    author: "John von Neumann",
    emoji: "🙂",
  },
  {
    text: "Nếu mọi người không tin toán học đơn giản, thì chỉ vì họ không biết cuộc sống phức tạp đến mức nào.",
    original: "If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.",
    author: "John von Neumann",
    emoji: "🌀",
  },
  {
    text: "Toán học không biết tới màu da hay biên giới. Với toán học, cả thế giới là một đất nước.",
    original: "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country.",
    author: "David Hilbert",
    emoji: "🤝",
  },
  {
    text: "Nghệ thuật làm toán là đi tìm trường hợp đặc biệt chứa mầm mống của mọi điều tổng quát.",
    original: "The art of doing mathematics consists in finding that special case which contains all the germs of generality.",
    author: "David Hilbert",
    emoji: "🔍",
  },
  {
    text: "Ta phải biết. Ta sẽ biết!",
    original: "We must know. We will know.",
    author: "David Hilbert",
    emoji: "💪",
  },
  {
    text: "Trong toán học, nghệ thuật đặt câu hỏi còn quý hơn cả việc trả lời.",
    original: "In mathematics the art of proposing a question must be held of higher value than solving it.",
    author: "Georg Cantor",
    emoji: "❓",
  },
  {
    text: "Không có con đường vương giả nào dẫn tới hình học cả.",
    original: "There is no royal road to geometry.",
    author: "Euclid",
    emoji: "🛤️",
  },
  {
    text: "Mỗi phát minh lớn giải được một bài toán lớn — nhưng trong lời giải của bất cứ bài toán nào cũng có một hạt mầm của phát minh.",
    original: "A great discovery solves a great problem but there is a grain of discovery in the solution of any problem.",
    author: "George Pólya",
    emoji: "🎯",
  },
  {
    text: "Mỗi bài toán con giải được lại trở thành một quy tắc giúp con giải những bài sau.",
    original: "Each problem that I solved became a rule which served afterwards to solve other problems.",
    author: "René Descartes",
    emoji: "🧭",
  },
  {
    text: "Nếu tôi nhìn được xa hơn người khác, ấy là vì tôi đứng trên vai những người khổng lồ.",
    original: "If I have seen further it is by standing on the shoulders of giants.",
    author: "Isaac Newton",
    emoji: "🦶",
  },
  {
    text: "Sớm muộn gì mọi bài toán cũng có lời giải. Rồi những bài từng khó sẽ trở thành bài tập cho trẻ em.",
    original: "Every problem of mathematics gets solved, sooner or later. As mathematics progresses, problems that were difficult become easy and can be assigned to schoolchildren.",
    author: "Gian-Carlo Rota",
    emoji: "🏆",
  },

  // ── Kiên trì, sai lầm và luyện tập ────────────────────────────────────
  {
    text: "Cách duy nhất để học toán là LÀM toán.",
    original: "The only way to learn mathematics is to do mathematics.",
    author: "Paul Halmos",
    emoji: "✍️",
  },
  {
    text: "Nếu con chưa giải được một bài, hãy tìm một bài dễ hơn mà con giải được — rồi quay lại.",
    original: "If you can't solve a problem, then there is an easier problem you can solve: find it.",
    author: "George Pólya",
    emoji: "🪜",
  },
  {
    text: "Đừng lo về những khó khăn của con khi học toán. Cô đảm bảo rằng khó khăn của cô còn lớn hơn nhiều.",
    original: "Do not worry about your difficulties in mathematics. I can assure you mine are still greater.",
    author: "Albert Einstein",
    emoji: "😌",
  },
  {
    text: "Không phải vì tôi thông minh, mà vì tôi ở lại lâu hơn với bài toán.",
    original: "It's not that I'm so smart, it's just that I stay with problems longer.",
    author: "Albert Einstein",
    emoji: "⏳",
  },
  {
    text: "Người chưa từng mắc lỗi là người chưa từng thử làm điều gì mới.",
    original: "Anyone who has never made a mistake has never tried anything new.",
    author: "Albert Einstein",
    emoji: "🌱",
  },
  {
    text: "Con sẽ sai nhiều hơn đúng. Không sao cả! Con vừa biết được điều gì không hiệu quả — thử lại nhé.",
    original: "Over time you will get the wrong answer more times than you get the right answer. That's not a problem! You've learnt what doesn't work, just try again.",
    author: "Sophie Carr",
    emoji: "🔁",
  },
  {
    text: "Sai lầm là cánh cửa mở ra những khám phá.",
    original: "Mistakes are the portals of discovery.",
    author: "James Joyce",
    emoji: "🚪",
  },
  {
    text: "Học toán giống như đi tập thể dục — nhưng là tập cho bộ não!",
    original: "It's like going to the gym — but for your brain!",
    author: "Danica McKellar",
    emoji: "🏋️",
  },
  {
    text: "Con không cần ai cho phép để trở thành một nhà toán học giỏi.",
    original: "You don't need anybody's permission to be a great mathematician!",
    author: "Nira Chamberlain",
    emoji: "🌟",
  },
  {
    text: "Đừng để những gì con CHƯA làm được cản trở những gì con CÓ THỂ làm.",
    original: "Don't let what you cannot do interfere with what you can do.",
    author: "John Wooden",
    emoji: "🚀",
  },
  {
    text: "Điều quan trọng nhất là đừng bao giờ ngừng đặt câu hỏi.",
    original: "The important thing is not to stop questioning.",
    author: "Albert Einstein",
    emoji: "🙋",
  },
  {
    text: "Trí tưởng tượng quan trọng hơn kiến thức.",
    original: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    emoji: "🌈",
  },

  // ── Niềm vui học toán ────────────────────────────────────────────────
  {
    text: "Tôi dùng toán học chỉ vì một lý do: để thấy vui, và để người khác cũng thấy vui theo.",
    original: "The only thing I am interested in using mathematics for is to have a good time and to help others do the same.",
    author: "Paul Lockhart",
    emoji: "😄",
  },
  {
    text: "Toán không phải là về những con số! Toán là về logic, về cái đẹp, về những mối liên hệ.",
    original: "Math ain't about numbers! Math is about logic, it's about beauty, it's about connections.",
    author: "Cliff Stoll",
    emoji: "📚",
  },
  {
    text: "Niềm vui của người mới chơi khi giải được một câu đố không khác mấy niềm vui của nhà toán học khi giải được một bài toán khó.",
    original: "There is not much difference between the delight a novice experiences in cracking a clever brain teaser and the delight a mathematician experiences in mastering a more advanced problem.",
    author: "Martin Gardner",
    emoji: "🎲",
  },
  {
    text: "Toán học giải trí là sở thích tuyệt vời mà cả trẻ con lẫn người lớn đều thích.",
    original: "Recreational mathematics is a splendid hobby which young and old can equally enjoy.",
    author: "Freeman Dyson",
    emoji: "🧸",
  },
  {
    text: "Có lúc con thấy như đang lạc trong rừng, không biết đi đâu. Rồi con lên tới đỉnh đồi, mọi thứ sáng rõ — cảm giác đó thật tuyệt!",
    original: "There are times when I feel like I'm in a big forest and don't know where I'm going. But then somehow I come to the top of a hill and can see everything more clearly. When that happens, it's really exciting.",
    author: "Maryam Mirzakhani",
    emoji: "⛰️",
  },
  {
    text: "Người làm toán thật sự thấy toán ở khắp nơi: trong chiếc xích đu, trong dáng cây và chiếc lá, trong những đám mây.",
    original: "Every true mathematician sees mathematics everywhere — in a child's swing or a pendulum, in the outline shape of a tree and that of its leaves, in the clouds.",
    author: "Kathleen Ollerenshaw",
    emoji: "☁️",
  },
  {
    text: "Toán học không lừa dối con: một điều hoặc đúng, hoặc không đúng — và con có thể dựa vào sự rõ ràng đó.",
    original: "You cannot be cheated, you cannot be lied to. A thing is true or not true, and there is this notion of clarity on which you can base yourself.",
    author: "Sylvia Serfaty",
    emoji: "⚖️",
  },
  {
    text: "Hầu như không có phần nào của đời sống hiện đại mà lại không có đóng góp của toán học.",
    original: "There's barely any aspect of our modern lives that hasn't had a mathematical contribution at some point.",
    author: "Hannah Fry",
    emoji: "🏙️",
  },
  {
    text: "Toán học sẽ luôn luôn ở đó — mãi mãi.",
    original: "There will always, always be mathematics.",
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
