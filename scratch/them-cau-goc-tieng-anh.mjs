/**
 * Thêm `original` (câu gốc tiếng Anh) vào từng câu trong `client/src/data/mathQuotes.js`
 * và sửa vài câu tiếng Việt cho khớp đúng câu gốc.
 *
 * Chạy: node scratch/them-cau-goc-tieng-anh.mjs
 *
 * 🔴 LUẬT AN TOÀN (theo thói quen của repo): mọi phép sửa đều phải khớp ĐÚNG 1 lần.
 * Sai một chỗ là **DỪNG, KHÔNG GHI FILE** — thà không làm còn hơn ghi lệch nội dung.
 * Sau khi ghi, script tự đọc lại và kiểm: đủ 50 khoá `original`, 0 ký tự hỏng U+FFFD.
 */
import fs from "fs";
import { pathToFileURL } from "url";

const FILE = "client/src/data/mathQuotes.js";

// ── Câu gốc tiếng Anh, THEO ĐÚNG THỨ TỰ trong file (1 → 50) ───────────────
// Nhiều câu là bản dịch/bản phổ biến bằng tiếng Anh của câu gốc tiếng Đức, Latinh,
// Hy Lạp… — dùng bản tiếng Anh vì đó là bản được trích dẫn phổ biến nhất.
const EN = [
  "Mathematics is the queen of the sciences.",
  "The book of nature is written in the language of mathematics.",
  "Mathematics is the music of reason.",
  "Pure mathematics is, in its way, the poetry of logical ideas.",
  "Mathematics is the most beautiful and most powerful creation of the human spirit.",
  "Mathematics, rightly viewed, possesses not only truth, but supreme beauty.",
  "A mathematician, like a painter or poet, is a maker of patterns.",
  "Beauty is the first test: there is no permanent place in the world for ugly mathematics.",
  "Mathematics is the art of giving the same name to different things.",
  "Mathematics is the door and key to the sciences.",
  "Where there is matter, there is geometry.",
  "There is no branch of mathematics, however abstract, which may not some day be applied to phenomena of the real world.",
  "Number rules the universe.",
  "Mathematics in general is fundamentally the science of self-evident things.",
  "There is geometry in the humming of the strings, there is music in the spacing of the spheres.",
  "It is impossible to be a mathematician without being a poet in soul.",
  "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
  "Mathematics is a process of staring hard enough with enough perseverance at the fog of muddle and confusion to eventually break through to improved clarity.",
  "In mathematics you don't understand things. You just get used to them.",
  "If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.",
  "Mathematics knows no races or geographic boundaries; for mathematics, the cultural world is one country.",
  "The art of doing mathematics consists in finding that special case which contains all the germs of generality.",
  "We must know. We will know.",
  "In mathematics the art of proposing a question must be held of higher value than solving it.",
  "There is no royal road to geometry.",
  "A great discovery solves a great problem but there is a grain of discovery in the solution of any problem.",
  "Each problem that I solved became a rule which served afterwards to solve other problems.",
  "If I have seen further it is by standing on the shoulders of giants.",
  "Every problem of mathematics gets solved, sooner or later. As mathematics progresses, problems that were difficult become easy and can be assigned to schoolchildren.",
  "The only way to learn mathematics is to do mathematics.",
  "If you can't solve a problem, then there is an easier problem you can solve: find it.",
  "Do not worry about your difficulties in mathematics. I can assure you mine are still greater.",
  "It's not that I'm so smart, it's just that I stay with problems longer.",
  "Anyone who has never made a mistake has never tried anything new.",
  "Over time you will get the wrong answer more times than you get the right answer. That's not a problem! You've learnt what doesn't work, just try again.",
  "Mistakes are the portals of discovery.",
  "It's like going to the gym — but for your brain!",
  "You don't need anybody's permission to be a great mathematician!",
  "Don't let what you cannot do interfere with what you can do.",
  "The important thing is not to stop questioning.",
  "Imagination is more important than knowledge.",
  "The only thing I am interested in using mathematics for is to have a good time and to help others do the same.",
  "Math ain't about numbers! Math is about logic, it's about beauty, it's about connections.",
  "There is not much difference between the delight a novice experiences in cracking a clever brain teaser and the delight a mathematician experiences in mastering a more advanced problem.",
  "Recreational mathematics is a splendid hobby which young and old can equally enjoy.",
  "There are times when I feel like I'm in a big forest and don't know where I'm going. But then somehow I come to the top of a hill and can see everything more clearly. When that happens, it's really exciting.",
  "Every true mathematician sees mathematics everywhere — in a child's swing or a pendulum, in the outline shape of a tree and that of its leaves, in the clouds.",
  "You cannot be cheated, you cannot be lied to. A thing is true or not true, and there is this notion of clarity on which you can base yourself.",
  "There's barely any aspect of our modern lives that hasn't had a mathematical contribution at some point.",
  "There will always, always be mathematics.",
];

// ── Sửa câu tiếng Việt cho khớp câu gốc (mỗi vế phải khớp ĐÚNG 1 lần) ─────
// ⚠️ File dùng CRLF (Windows) ⇒ MỌI mẫu nhiều dòng phải viết `\r?\n`, không dùng `\n`.
// Đã mất một vòng vì lỗi này: `\n` khớp 0 lần nên script dừng.
const SUA = [
  [
    /text: "Đừng mong có lối tắt[^"]*",(\r?\n)([ \t]*)author: "Euclid",(\r?\n)([ \t]*)emoji: "[^"]*",/,
    (k, n1, i1, n2, i2) =>
      'text: "Mỗi phát minh lớn giải được một bài toán lớn — nhưng trong lời giải của bất cứ bài toán nào cũng có một hạt mầm của phát minh.",' +
      n1 +
      i1 +
      'author: "George Pólya",' +
      n2 +
      i2 +
      'emoji: "🎯",',
  ],
  [
    /text: "Lúc đầu con sẽ sai nhiều hơn đúng[^"]*",/,
    () =>
      'text: "Con sẽ sai nhiều hơn đúng. Không sao cả! Con vừa biết được điều gì không hiệu quả — thử lại nhé.",',
  ],
  [
    /text: "Nếu con nghĩ toán chỉ là những con số[^"]*",/,
    () =>
      'text: "Toán không phải là về những con số! Toán là về logic, về cái đẹp, về những mối liên hệ.",',
  ],
  [
    /text: "Toán vui như một trò chơi giải đố[^"]*",/,
    () =>
      'text: "Niềm vui của người mới chơi khi giải được một câu đố không khác mấy niềm vui của nhà toán học khi giải được một bài toán khó.",',
  ],
  [
    /text: "Toán học ở khắp nơi[^"]*",/,
    () =>
      'text: "Người làm toán thật sự thấy toán ở khắp nơi: trong chiếc xích đu, trong dáng cây và chiếc lá, trong những đám mây.",',
  ],
  [
    /text: "Toán học không bao giờ lừa con[^"]*",/,
    () =>
      'text: "Toán học không lừa dối con: một điều hoặc đúng, hoặc không đúng — và con có thể dựa vào sự rõ ràng đó.",',
  ],
  [
    /text: "Không có phần nào của đời sống hiện đại[^"]*",/,
    () =>
      'text: "Hầu như không có phần nào của đời sống hiện đại mà lại không có đóng góp của toán học.",',
  ],
  [
    /text: "Luôn luôn sẽ có toán học[^"]*",/,
    () => 'text: "Toán học sẽ luôn luôn ở đó — mãi mãi.",',
  ],
];

let s = fs.readFileSync(FILE, "utf8");
const NL = s.includes("\r\n") ? "\r\n" : "\n";

// (1) Sửa tiếng Việt trước — mỗi vế phải khớp đúng 1 lần
for (const [mau, thay] of SUA) {
  const soLan = (s.match(new RegExp(mau.source, "g")) || []).length;
  if (soLan !== 1) {
    console.error(`✗ DỪNG: mẫu khớp ${soLan} lần (cần đúng 1): ${mau}`);
    process.exit(1);
  }
  s = s.replace(mau, thay);
}

// (2) Chèn `original:` ngay sau mỗi dòng `text: "…",`
const mẫu = /(\r?\n[ \t]*text: "(?:[^"\\]|\\.)*",)(\r?\n[ \t]*)/g;
let i = 0;
s = s.replace(mẫu, (khop, dongText, dongSau) => {
  if (i >= EN.length) {
    console.error(
      "✗ DỪNG: file có nhiều câu hơn số câu tiếng Anh đã chuẩn bị.",
    );
    process.exit(1);
  }
  const thutLe = dongSau.replace(/^\r?\n/, "");
  const en = JSON.stringify(EN[i++]);
  return `${dongText}${NL}${thutLe}original: ${en},${dongSau}`;
});
if (i !== EN.length) {
  console.error(
    `✗ DỪNG: chỉ chèn được ${i}/${EN.length} câu — KHÔNG ghi file.`,
  );
  process.exit(1);
}

fs.writeFileSync(FILE, s, "utf8");

// (3) Đọc lại và tự kiểm
const lai = fs.readFileSync(FILE, "utf8");
const soOriginal = (lai.match(/\n\s*original: /g) || []).length;
const soFFFD = [...lai].filter((c) => c.codePointAt(0) === 0xfffd).length;
const m = await import(pathToFileURL(FILE).href);
const du4Khoa = m.MATH_QUOTES.every(
  (q) => q.text && q.original && q.author && q.emoji,
);
console.log(`khoá original: ${soOriginal}/50`);
console.log(`ký tự hỏng U+FFFD: ${soFFFD}`);
console.log(`số câu: ${m.MATH_QUOTES.length}`);
console.log(`mọi câu đủ 4 khoá (text/original/author/emoji): ${du4Khoa}`);
if (
  soOriginal !== 50 ||
  soFFFD !== 0 ||
  m.MATH_QUOTES.length !== 50 ||
  !du4Khoa
) {
  console.error("✗ TỰ KIỂM KHÔNG ĐẠT — xem lại file!");
  process.exit(1);
}
console.log("✓ XONG");
