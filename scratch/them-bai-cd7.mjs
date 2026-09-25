/**
 * THÊM BÀI “CAO HƠN, THẤP HƠN” VÀO CHỦ ĐỀ 7 (Lớp 1) — `node scratch/them-bai-cd7.mjs --ghi`
 *
 * Vì sao: SGK tập 2 **tr.30–31** có hẳn một phần “Cao hơn, thấp hơn” (Bài 25) mà app **không
 * có bài nào** — nhóm lỗi A (“thiếu hoạt động”). Đã NHÌN ảnh tr.30–31 qua OCR + đối chiếu
 * câu chữ SGK (“Con vật nào cao hơn?”, “Lọ hoa nào thấp hơn?”, “Tìm cây cao nhất, cây thấp
 * nhất trong mỗi hàng”).
 *
 * 🔴 BÀI MỚI DÙNG **ID MỚI** (`g1-c7-l8`) nhưng CHÈN Ở VỊ TRÍ THỨ 2 — đúng quy ước của repo:
 * đổi id bài đã có là **mất tiến độ của bé** (`completedLessons` khoá theo id). Sau khi chèn,
 * chạy `node scratch/chuan-hoa-danh-so.mjs client/src/data/grade1/g1c7.js` để đánh số lại
 * tiêu đề (“Bài 3: …”) và `totalLessons`.
 */
import fs from "node:fs";

const DUONG = "client/src/data/grade1/g1c7.js";
const GHI = process.argv.includes("--ghi");

const BAI = {
  id: "g1-c7-l9",
  title: "Bài 3: Cao hơn, thấp hơn",
  type: "learn",
  description: "So sánh chiều cao của hai vật bằng cách đặt cùng một mặt phẳng",
  slides: [
    {
      type: "story",
      content: {
        mascotMood: "curious",
        text: "Cây cau cao hơn cây chuối. Vậy cây nào thấp hơn nhỉ? Bé cùng Rô-bốt so chiều cao nhé! 🌴",
      },
    },
    {
      type: "concept",
      content: {
        badge: "Khám Phá",
        title: "Cao hơn, thấp hơn",
        explanation:
          "Muốn biết vật nào cao hơn, bé để hai vật cùng đứng trên MỘT mặt phẳng rồi nhìn xem vật nào vươn cao hơn.",
        rule: "Vật vươn cao hơn là vật CAO HƠN. Vật vươn thấp hơn là vật THẤP HƠN.",
        points: [
          "So chiều cao cũng giống so độ dài: hai vật phải cùng một mốc bắt đầu.",
          "Cao hơn — thấp hơn dùng cho chiều cao; dài hơn — ngắn hơn dùng cho chiều dài.",
          "Đứng lên ghế mà cao hơn thì đó không phải chiều cao thật của bạn ấy.",
        ],
      },
    },
    {
      type: "visual",
      content: {
        text: "Chiều cao của ba cây trong vườn (mỗi vạch là 1 gang tay)",
        barChart: {
          title: "Chiều cao của ba cây",
          items: [
            { label: "Cây A", value: 5 },
            { label: "Cây B", value: 3 },
            { label: "Cây C", value: 4 },
          ],
          unit: "gang tay",
          highlight: 0,
        },
      },
    },
    {
      type: "quiz",
      content: {
        question:
          "Cây A cao 5 gang tay, cây B cao 3 gang tay. Cây nào cao hơn?",
        options: ["Cây A", "Cây B", "Hai cây cao bằng nhau"],
        answer: "Cây A",
        mascotHint: "5 gang tay nhiều hơn 3 gang tay nên cây A cao hơn.",
      },
    },
    {
      type: "quiz",
      content: {
        question:
          "Cây B cao 3 gang tay, cây C cao 4 gang tay. Cây nào thấp hơn?",
        options: ["Cây B", "Cây C", "Hai cây cao bằng nhau"],
        answer: "Cây B",
        mascotHint: "3 gang tay ít hơn 4 gang tay nên cây B thấp hơn.",
      },
    },
    {
      type: "quiz",
      content: {
        question: "Con vật nào cao hơn: hươu cao cổ hay ngựa?",
        options: ["Hươu cao cổ", "Ngựa", "Cao bằng nhau"],
        answer: "Hươu cao cổ",
        mascotHint: "Hươu cao cổ vươn cổ lên rất cao nên cao hơn ngựa.",
      },
    },
    {
      type: "summary",
      content: {
        title: "Bé nhớ rất tốt:",
        points: [
          "Cao hơn — thấp hơn: so chiều cao khi hai vật cùng đứng trên một mặt phẳng.",
          "Trong ba cây, cây A cao 5 gang tay là cây cao nhất.",
        ],
        mascotMood: "proud",
      },
    },
  ],
};

let nguon = fs.readFileSync(DUONG, "utf8");
// ⚠️ File này dùng KHOÁ CÓ NHÁY (`"id":`) — khác các file `grade1/g1c*.js` viết không nháy.
// Đã mắc: tìm `id: "g1-c7-l2",` (không nháy) ⇒ không thấy ⇒ script dừng (đúng thiết kế).
if (nguon.includes('"id": "g1-c7-l9"')) {
  console.log("Đã có bài g1-c7-l9 rồi — không làm gì.");
  process.exit(0);
}

/** Chèn TRƯỚC bài thứ hai (`g1-c7-l2`) ⇒ bài mới đứng ngay sau bài 1, đúng thứ tự SGK. */
const moc = nguon.indexOf('      "id": "g1-c7-l2",');
if (moc < 0) throw new Error("Không thấy g1-c7-l2 — dừng, không ghi gì.");
/** Lùi về dấu `{` mở đầu của object bài (bài học xương máu ở `them-slide-cd6.mjs`). */
const iMoBai = nguon.lastIndexOf("    {", moc);
if (iMoBai < 0) throw new Error("Không tìm thấy dấu mở bài — dừng.");

const chu = JSON.stringify(BAI, null, 2).split("\n").join("\n    ") + ",\n";

const ra = nguon.slice(0, iMoBai) + "    " + chu + nguon.slice(iMoBai);
console.log("Chèn bài “Cao hơn, thấp hơn” (6 slide + 1 summary) vào CĐ7.");
if (!GHI) {
  console.log("(chưa ghi — thêm `--ghi`)");
  process.exit(0);
}
fs.writeFileSync(DUONG, ra, "utf8");
console.log(`Đã ghi ${DUONG}`);
