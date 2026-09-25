/**
 * SOÁT Ô TRỐNG — chạy: `node scratch/soat-o-trong.mjs [--het]`
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (yêu cầu người dùng 2026-09-25):
 *   “tất cả các dạng bài có điền vào ô trống KHÔNG được là slide tĩnh và đều có thể điền
 *    đáp án vào được; đảm bảo tất cả các dạng bài tập đều có đáp án để trẻ lựa chọn và
 *    tương tác”.
 *
 * Công cụ soi MỌI hình của MỌI slide trong 5 lớp, tìm dấu hiệu “ô trống” (`?`, `…`, `...`)
 * nằm TRONG DỮ LIỆU HÌNH (không tính câu hỏi/ lời dẫn — “bao nhiêu?” là chữ, không phải ô),
 * rồi phân loại theo 4 nhóm:
 *
 *   [A] Ô TRỐNG TĨNH  — slide KHÔNG cho bấm (quiz/summary/dialogue) mà hình lại chứa ô “?”
 *                       ở loại hình KHÔNG tự tương tác ⇒ trẻ chỉ để nhìn. **LỖI**.
 *   [B] Ô ĐIỀN SAI CHỖ — dùng `bangTinh` (bảng điền được) nhưng đặt trên slide quiz/summary
 *                       ⇒ `InteractiveContext` = false ⇒ bảng rơi về dạng tĩnh, im lặng. **LỖI**.
 *   [C] SAI ĐÁP ÁN    — `bangTinh` có số đáp án ≠ số ô trống, hoặc hình tương tác thiếu dữ
 *                       liệu ⇒ cũng im lặng rơi về dạng tĩnh. **LỖI**.
 *   [D] HỢP LỆ         — ô “?” nằm trong hình tự tương tác của slide cho bấm (trẻ điền được),
 *                       hoặc ô “?” nằm trong hình của slide CÂU HỎI (trẻ trả lời bằng các
 *                       lựa chọn của câu hỏi) — in ra khi thêm `--het`.
 *
 * Mã thoát: 0 = không có lỗi (A/B/C), 1 = có lỗi.
 */
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";

import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const HET = process.argv.includes("--het");

const NGUON = [
  ["Lớp 1", grade1Data],
  ["Lớp 2", grade2Data],
  ["Lớp 3", grade3Data],
  ["Lớp 4", grade4Data],
  ["Lớp 5", grade5Data],
];

/** Slide CHO BẤM (`LessonPage.jsx`: 3 kiểu này mới bọc `InteractiveContext`). */
const SLIDE_CHO_BAM = new Set(["story", "concept", "visual"]);

/** Khoá là LỜI DẪN/CÂU HỎI — chữ, không phải ô trống. Bỏ qua khi soi. */
const KHOA_LOI = new Set([
  "text",
  "title",
  "label",
  "note",
  "note2",
  "hint",
  "mascotHint",
  "badge",
  "points",
  "explanation",
  "rule",
  "description",
  "question",
  "caption",
  "prompt",
  "answer",
  "mascotMood",
  "items", // khay đếm emoji — chuỗi emoji, không phải ô số
  // ⚠️ Hai khoá sau tôi từng để lọt ⇒ công cụ BÁO OAN (2026-09-25):
  //   `table.headers[1] = “Bé làm gì?”` và `pointLine.formula = “Điểm nào nằm giữa A và B?”`
  // — đều là LỜI DẪN in trên hình, không phải ô trẻ điền.
  "headers",
  "formula",
  "options", // các lựa chọn trẻ bấm — không phải ô trống cần điền
  "answers", // đáp án của bảng điền được
  "mascot",
  "emoji",
  "mode",
  "kind",
  "id",
  "desc", // mô tả một bước giải (Lớp 5 `steps`) — chữ, không phải ô điền
  "colors", // màu của từng ô (`patternRow`) — `null` = không đặt màu, KHÔNG phải ô trống
]);

/**
 * Chỉ hai khoá này mới dùng `null` / chuỗi rỗng để chỉ Ô TRỐNG:
 *   • `bangTinh.rows` — ô bé điền.
 *   • `numberScene`    — dãy số / số hạng còn thiếu (`numberTrain`, `numberBond`).
 * ⚠️ Ngoài hai khoá này, `null` thường là “trường không dùng”: đã báo oan 2 ca
 * `motionDiagram.b = null` (nghĩa là “không có xe thứ hai”, hình không hề có ô trống).
 */
const KHOA_CO_O_TRONG = new Set(["bangTinh", "numberScene"]);

/** Hình TỰ TƯƠNG TÁC được (trẻ bấm điền ngay trong hình). */
const HINH_CHO_BAM = new Set(["bangTinh"]);

/**
 * Dãy số (`numberScene.mode = "numberTrain"`) nay ĐIỀN ĐƯỢC khi có `answers` khớp số ô trống
 * (`TrainFill` trong `Grade1NumberVisuals.jsx`). Số ô trống đếm theo `numbers` hoặc `rows`.
 */
const laOTrongDay = (v) => v === null || v === "?" || v === "";
function demOTrongDaySo(hinh) {
  const ds =
    hinh?.kind === "ribbon"
      ? hinh?.numbers
      : (hinh?.rows || []).flatMap((r) => (Array.isArray(r) ? r : []));
  return Array.isArray(ds) ? ds.filter(laOTrongDay).length : 0;
}

/**
 * `numberScene` chỉ tương tác ở vài `mode`.
 *
 * 🔴 ĐÃ KIỂM BẰNG CÁCH ĐỌC MÃ (2026-09-25), KHÔNG ĐOÁN: `Grade1NumberVisuals.jsx` chỉ có
 * **MỘT** `useInteractive()` (dòng 412) và nó chỉ được dùng ở 3 nhánh:
 *   `numberMaze` (dòng ~1503) · `dotCards` (~1723, khi thiếu dấu) · `comparePairs` (~1783).
 * Hai bộ tương tác thật là `DotCardsCard` và `ComparePairsCard` (mỗi bộ gọi `useFillSlots`).
 *
 * ⚠️ Bản đầu của file này tôi **đoán** một danh sách dài (`numberBond`, `numberTrain`,
 * `gridWalk`, `addToReach`…) ⇒ công cụ coi các ô “?” TĨNH đó là “đã tương tác” ⇒
 * **cổng xanh giả**. Danh sách dưới đây là danh sách ĐÃ ĐỌC MÃ.
 */
const MODE_CHO_BAM = new Set(["numberMaze", "dotCards", "comparePairs"]);

/** Dấu hiệu ô trống trong DỮ LIỆU hình. */
const O_TRONG = /(\?|…|\.\.\.)/;

/**
 * Chuỗi PHÉP TÍNH (có dấu `=` hoặc `→`) KHÔNG phải ô trống cần điền: đó là CÂU nêu phép
 * tính, ví dụ `"500 − ? = 260"` — dấu `?` là “số bị che” của đề bài, còn chỗ bé điền là
 * ô `null` bên cạnh (xem `bangTinh`). Không có luật này thì công cụ báo oan 2 bảng lớp 3.
 */
const LA_PHEP_TINH = /[=→]/;

function soi(v, path, out, botLoi, demNull) {
  if (v === undefined) return;
  /**
   * `null` là ô trống CHỈ trong các khoá `KHOA_CO_O_TRONG` (xem ghi chú ở hằng đó).
   */
  if (v === null) {
    if (!botLoi && demNull) out.push(`${path} = ô trống (null)`);
    return;
  }
  if (typeof v === "string") {
    const s = v.trim();
    // “?” / “…” đứng một mình, hoặc “30, ?, 33”, hoặc “? ô trống”
    if (!botLoi && O_TRONG.test(s) && !LA_PHEP_TINH.test(s))
      out.push(`${path} = “${v}”`);
    return;
  }
  if (typeof v === "number" || typeof v === "boolean") return;
  if (Array.isArray(v)) {
    v.forEach((x, i) => soi(x, `${path}[${i}]`, out, botLoi, demNull));
    return;
  }
  for (const [k, x] of Object.entries(v)) {
    const laLoi = botLoi || KHOA_LOI.has(k);
    soi(x, `${path}.${k}`, out, laLoi, demNull);
  }
}

/** Đếm số ô “?” trong một dãy hình. */
function demOTrongDay(shapes) {
  return Array.isArray(shapes) ? shapes.filter((s) => s === "?").length : 0;
}

/** Dãy hình đã có đủ đáp án cho từng ô “?” chưa. */
function coDuDapAn(hinh, soOT) {
  return Array.isArray(hinh?.answers) && hinh.answers.length === soOT;
}

/** Đếm số ô trống (`null`) trong bảng điền được — theo đúng luật của `interactiveTable.jsx`. */
function demOTrongBang(rows) {
  if (!Array.isArray(rows)) return 0;
  return rows.reduce(
    (a, r) => a + (Array.isArray(r) ? r.filter((c) => c === null).length : 0),
    0,
  );
}

const loi = [];
const hopLe = [];
let soSlide = 0;
let soSlideChoBam = 0;

for (const [tenLop, data] of NGUON) {
  const chapters = Array.isArray(data?.chapters)
    ? data.chapters
    : Array.isArray(data)
      ? data
      : [];
  for (const ch of chapters) {
    for (const bai of ch.lessons || []) {
      (bai.slides || []).forEach((slide, iS) => {
        soSlide += 1;
        const choBam = SLIDE_CHO_BAM.has(slide.type);
        if (choBam) soSlideChoBam += 1;
        const content = slide.content || {};
        const viTri = `${tenLop} · ${ch.id} · ${bai.id} · slide ${iS + 1} (${slide.type})`;

        // Soi MỌI khoá DỮ LIỆU (trừ lời dẫn) — không chỉ khoá hình, để bắt cả
        // `operation` / `comparison` / `items` … nếu chúng có ô “?”.
        for (const [key, hinh] of Object.entries(content)) {
          if (KHOA_LOI.has(key)) continue;
          if (hinh === undefined || hinh === null || hinh === false) continue;
          const soOTDay = demOTrongDaySo(hinh);
          const tuBam =
            HINH_CHO_BAM.has(key) ||
            (key === "patternRow" &&
              demOTrongDay(hinh?.shapes) > 0 &&
              coDuDapAn(hinh, demOTrongDay(hinh?.shapes))) ||
            (key === "numberScene" && MODE_CHO_BAM.has(hinh?.mode)) ||
            (key === "numberScene" &&
              hinh?.mode === "numberTrain" &&
              soOTDay > 0 &&
              Array.isArray(hinh?.answers) &&
              hinh.answers.length === soOTDay);

          // [C] DÃY SỐ có ô “?” mà thiếu/ lệch đáp án ⇒ vẫn là hình tĩnh (im lặng)
          if (key === "numberScene" && hinh?.mode === "numberTrain" && soOTDay > 0) {
            const soDADay = Array.isArray(hinh?.answers)
              ? hinh.answers.length
              : -1;
            if (soDADay !== soOTDay)
              loi.push(
                `[C] ${viTri}: numberTrain có ${soOTDay} ô trống nhưng ${soDADay} đáp án ⇒ ô không điền được.`,
              );
          }

          // [C] dãy hình có ô “?” mà đáp án lệch số ô ⇒ vẫn là hình tĩnh (im lặng)
          if (key === "patternRow") {
            const soOT = demOTrongDay(hinh?.shapes);
            if (soOT > 0) {
              const soDA = Array.isArray(hinh?.answers)
                ? hinh.answers.length
                : -1;
              if (soDA !== -1 && soDA !== soOT) {
                loi.push(
                  `[C] ${viTri}: patternRow có ${soOT} ô “?” nhưng ${soDA} đáp án ⇒ ô không điền được.`,
                );
              } else if (
                soDA === soOT &&
                (!Array.isArray(hinh?.options) || hinh.options.length < 2)
              ) {
                loi.push(
                  `[C] ${viTri}: patternRow thiếu \`options\` (cần ≥2 hình cho trẻ bấm).`,
                );
              }
            }
          }

          const coOT = [];
          soi(hinh, key, coOT, false, KHOA_CO_O_TRONG.has(key));
          /**
           * ⚠️ Bảng điền được đánh dấu ô trống bằng `null` (KHÔNG phải chuỗi `?`) nên `soi()`
           * không thấy. Phải tự thêm vào danh sách, nếu không công cụ sẽ bỏ qua `bangTinh` hoàn
           * toàn — đúng kiểu “cổng xanh giả” (bảng điền được đặt trên slide câu hỏi thì vẫn là
           * ô không điền được mà công cụ im lặng).
           */
          if (key === "bangTinh") {
            const soOTBang = demOTrongBang(hinh?.rows);
            if (soOTBang > 0)
              coOT.push(`${soOTBang} ô trống (null) trong rows`);
          }

          // [C] bảng điền được mà đáp án lệch số ô trống
          if (key === "bangTinh") {
            const soOT = demOTrongBang(hinh?.rows);
            const soDA = Array.isArray(hinh?.answers)
              ? hinh.answers.length
              : -1;
            if (soOT === 0) {
              loi.push(
                `[C] ${viTri}: bangTinh KHÔNG có ô trống nào (rows toàn giá trị in sẵn) — dùng \`table\` mới đúng.`,
              );
            } else if (soDA !== soOT) {
              loi.push(
                `[C] ${viTri}: bangTinh có ${soOT} ô trống nhưng ${soDA} đáp án ⇒ component tự rơi về dạng TĨNH, trẻ không bấm được.`,
              );
            } else if (
              !Array.isArray(hinh?.options) ||
              hinh.options.length < 2
            ) {
              loi.push(
                `[C] ${viTri}: bangTinh thiếu \`options\` (cần ≥2 lựa chọn cho trẻ bấm).`,
              );
            }
          }

          if (coOT.length === 0) continue;

          if (!choBam) {
            // Slide CÂU HỎI: trẻ trả lời bằng các lựa chọn của câu hỏi ⇒ MỘT ô “?” là lời dẫn
            // hợp lệ (hình chỉ nêu cái đang hỏi). Nhưng TỪ 2 ô trở lên thì một câu trả lời
            // không thể phủ hết ⇒ có ô trẻ không bao giờ điền được.
            if (coOT.length >= 2) {
              loi.push(
                `[B] ${viTri}: slide “${slide.type}” mà hình \`${key}\` có ${coOT.length} ô trống — trẻ trả lời một lựa chọn không phủ hết (${coOT.join(" · ")}).`,
              );
            } else {
              hopLe.push(
                `${viTri}: \`${key}\` ${coOT.join(" · ")} — câu hỏi hỏi đúng ô đó, hợp lệ`,
              );
            }
          } else if (!tuBam) {
            // [A] slide cho bấm mà hình lại không tương tác
            loi.push(
              `[A] ${viTri}: slide cho bấm nhưng hình \`${key}\` KHÔNG tự tương tác mà lại có ô trống ⇒ trẻ chỉ nhìn (${coOT.join(" · ")}).`,
            );
          } else {
            hopLe.push(
              `${viTri}: \`${key}\` tự tương tác — ${coOT.join(" · ")}`,
            );
          }
        }
      });
    }
  }
}

console.log(
  `Đã soi ${soSlide} slide (${soSlideChoBam} slide cho bấm) trong 5 lớp.\n`,
);
if (HET && hopLe.length) {
  console.log(`── HỢP LỆ (${hopLe.length}) ──`);
  hopLe.forEach((x) => console.log("  ✓ " + x));
  console.log("");
}
if (loi.length === 0) {
  console.log(
    "✅ KHÔNG có ô trống tĩnh nào. Mọi ô “?” đều nằm trong hình/slide tương tác.",
  );
  process.exit(0);
}
console.log(`❌ ${loi.length} CA CẦN SỬA:`);
loi.forEach((x) => console.log("  " + x));
process.exit(1);
