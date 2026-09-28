/**
 * TỰ KIỂM DỮ LIỆU BÀI HỌC (cả 5 lớp) — chạy: `node scratch/kiem-tra-slide.mjs`
 *
 * Vì sao có file này: các cổng `test-admin-portal.mjs --static` chỉ kiểm **quy mô** (đếm
 * slide/bài/chương) và vài luật hình. Chúng KHÔNG bắt được các lỗi tôi đã từng gây ra thật:
 *
 *   1. `answer` không nằm trong `options` ⇒ trẻ bấm đúng mà vẫn báo sai, KHÔNG cách nào
 *      hoàn thành bài (từng xảy ra khi sửa tay danh sách lựa chọn).
 *   2. Lựa chọn TRÙNG NHAU ⇒ hai nút giống hệt, bấm nút nào cũng có thể là sai.
 *   3. Slide có TỪ 2 HÌNH trở lên ⇒ trẻ rối (chính sách §8i: một slide một hình).
 *   4. `type` lạ (schema chỉ cho 5 kiểu) ⇒ form Admin và cổng S-26 chặn.
 *   5. Câu hỏi rỗng / không có lựa chọn.
 *   6. Hình gọi tên nhưng thiếu dữ liệu vẽ (ví dụ `shapePicture.kind` không có trong bộ vẽ).
 *
 * Mã thoát: 0 = sạch, 1 = có lỗi (in rõ file · bài · số slide · lỗi).
 */
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
// Luật chấm thẻ dùng LẠI chính hàm của app — chép lại phép tính ở đây là mở đường cho cổng
// và app lệch nhau (cổng xanh mà bé vẫn bị chấm sai).
import {
  evaluateTokens,
  isNumberToken,
  isOperator,
  parseNumber,
  ticksOf,
} from "../client/src/pages/lesson/answerLogic.js";

const NGUON = [
  ["grade1Data.js", "grade1Data", 1],
  ["grade2Data.js", "grade2Data", 2],
  ["grade3Data.js", "grade3Data", 3],
  ["grade4Data.js", "grade4Data", 4],
  ["grade5Data.js", "grade5Data", 5],
];

/** Khoá hình VẼ (có đồ hoạ thật) — dùng để đếm "mấy hình một slide".
 *  ⚠️ `operation` / `comparison` KHÔNG tính là hình vẽ: chúng là CÂU PHÉP TÍNH bằng
 *  chữ số (LessonPage tự vẽ `.visual-operation`), và chúng đi kèm bảng/hình là có ý đồ.
 *  Lần đầu tôi tính cả hai khoá này ⇒ báo oan **146 ca** trên toàn bộ 5 lớp. */
const KHOA_HINH = [
  ...HINH_KEYS,
  "planeShapes", // mảng hình (VisualBlock vẽ thành hàng)
  "items", // khay đếm emoji (LessonPage)
  "shape", // ShapeGraphic trong quiz
  "clock", // LiveClock trong quiz
];

/** Câu phép tinh/so sánh — KHÔNG phải hình vẽ. */
const KHOA_CAU_SO = ["operation", "comparison"];

const KIEU_SLIDE = new Set([
  "story",
  "concept",
  "visual",
  "quiz",
  "summary",
  "dialogue",
  // Ba kiểu mới (2026-09-28) — lấy ý từ Duolingo Math, xem `client/src/pages/lesson/answerLogic.js`.
  "multiQuiz",
  "buildExpression",
  "matchPairs",
  // Hai kiểu “tự trả lời” (2026-09-28): nhập kết quả bằng bàn phím số, và kéo con trỏ trên trục số.
  "typeAnswer",
  "numberLineAnswer",
]);

/**
 * Kiểu slide CHO BẤM — `LessonPage.jsx` chỉ bọc `InteractiveContext` cho ba kiểu này.
 * Hình có ô trống đặt ngoài ba kiểu này sẽ rơi về dạng TĨNH, im lặng, trẻ không điền được.
 */
const SLIDE_CHO_BAM = new Set(["story", "concept", "visual"]);

/** Các `kind` mà bộ vẽ thật sự biết vẽ (đọc từ GeometryVisuals.jsx). */
const KIND_SHAPE_PICTURE = new Set([
  "book",
  "clock",
  "brick",
  "roof",
  "window",
  "wheel",
  "door",
  "board",
  "ball",
  "house",
  "boat",
  "fish",
]);
const KIND_PLANE = new Set([
  "square",
  "rectangle",
  "triangle",
  "rightTriangle",
  "parallelogram",
  "rhombus",
  "trapezoid",
  "circle",
  "quad",
]);

const loi = [];
const canhBao = [];
const themLoi = (f, bai, i, msg) => loi.push({ file: f, bai, slide: i, msg });
const themCanhBao = (f, bai, i, msg) =>
  canhBao.push({ file: f, bai, slide: i, msg });

let soLop = 0;
let soChuong = 0;
let soBai = 0;
let soSlide = 0;
const perChapter = [];

for (const [file, key, soLopThutu] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const lop = mod[key];
  if (!lop) {
    themLoi(file, "-", "-", `không có export \`${key}\``);
    continue;
  }
  soLop++;
  if (lop.chapters?.length !== undefined) soChuong += lop.chapters.length;

  for (const ch of lop.chapters ?? []) {
    let slideChuong = 0;
    for (const bai of ch.lessons ?? []) {
      soBai++;
      const slides = bai.slides ?? [];
      if (slides.length === 0)
        themLoi(file, bai.id, "-", "bài không có slide nào");
      if (bai.totalLessons !== undefined) {
        // metadata chỉ để tham khảo — không kiểm
      }
      slides.forEach((s, i) => {
        soSlide++;
        slideChuong++;
        const c = s.content ?? {};
        if (!KIEU_SLIDE.has(s.type))
          themLoi(file, bai.id, i, `type lạ: ${JSON.stringify(s.type)}`);

        /**
         * LUẬT RIÊNG CỦA BA KIỂU MỚI (2026-09-28).
         *
         * 🔴 VÌ SAO PHẢI KIỂM Ở ĐÂY: ba dạng này chấm theo TẬP HỢP / THỨ TỰ THẺ / CẶP. Dữ liệu
         * khai lệch một chút là câu hỏi trở thành **VÔ NGHIỆM** — bé làm đúng cách duy nhất có thể
         * mà vẫn báo sai, không có lỗi nào bung ra. Đây đúng họ lỗi “im lặng” mà cổng này sinh ra
         * để chặn (cùng lý do với luật `cotTinh` chia cho 0).
         */
        if (s.type === "multiQuiz") {
          const opts = c.options;
          const dap = c.answers;
          if (!Array.isArray(opts) || opts.length < 3)
            themLoi(
              file,
              bai.id,
              i,
              `multiQuiz cần ≥ 3 phương án, đang có ${opts?.length ?? 0}`,
            );
          if (!Array.isArray(dap) || dap.length < 2)
            themLoi(
              file,
              bai.id,
              i,
              `multiQuiz cần ≥ 2 đáp án đúng, đang có ${dap?.length ?? 0}`,
            );
          if (Array.isArray(opts) && Array.isArray(dap)) {
            const la = dap.filter((x) => !opts.includes(x));
            if (la.length)
              themLoi(
                file,
                bai.id,
                i,
                `multiQuiz có đáp án không nằm trong options: ${JSON.stringify(la)}`,
              );
            if (dap.length >= opts.length)
              themLoi(
                file,
                bai.id,
                i,
                "multiQuiz mà MỌI phương án đều đúng — không còn gì để chọn",
              );
            if (new Set(opts).size !== opts.length)
              themLoi(
                file,
                bai.id,
                i,
                "multiQuiz có phương án trùng nhau (chấm theo tập hợp nên sẽ lỗi)",
              );
          }
        }

        if (s.type === "buildExpression") {
          const soO = Number(c.slots);
          const tiles = c.tiles;
          const cach = c.solutions;
          if (!Number.isInteger(soO) || soO < 3 || soO % 2 === 0)
            themLoi(
              file,
              bai.id,
              i,
              `buildExpression cần slots LẺ và ≥ 3 (tối thiểu “số – dấu – số”), đang là ${JSON.stringify(c.slots)}`,
            );
          if (!Array.isArray(tiles) || tiles.length < soO)
            themLoi(
              file,
              bai.id,
              i,
              `buildExpression: khay có ${tiles?.length ?? 0} thẻ nhưng cần ${soO} ô`,
            );
          if (!Array.isArray(cach) || cach.length === 0)
            themLoi(
              file,
              bai.id,
              i,
              "buildExpression thiếu `solutions` — bé điền đúng cũng không chấm được",
            );
          if (Array.isArray(cach)) {
            for (const [k, môtCach] of cach.entries()) {
              if (!Array.isArray(môtCach) || môtCach.length !== soO) {
                themLoi(
                  file,
                  bai.id,
                  i,
                  `buildExpression: cách đúng thứ ${k + 1} phải có ${soO} thẻ`,
                );
                continue;
              }
              for (const the of môtCach)
                if (!Array.isArray(tiles) || !tiles.includes(the))
                  themLoi(
                    file,
                    bai.id,
                    i,
                    `buildExpression: thẻ ${JSON.stringify(the)} không có trong tiles`,
                  );
            }
          }
          if (c.target === undefined || c.target === null)
            themLoi(
              file,
              bai.id,
              i,
              "buildExpression thiếu `target` (kết quả cho trước) — bé không biết ghép gì",
            );

          /**
           * 🔴 THẺ KHÔNG ĐƯỢC TRỘN SỐ VỚI DẤU (người dùng báo lỗi 2026-09-28).
           * Thẻ `"25 ×"` làm khay KHÔNG còn thẻ `"25"` rời, cũng không có `"×"` rời ⇒ bé không
           * thể ghép `4 × 25`; bài chỉ còn đúng đường đi người soạn vạch sẵn. Đây là họ lỗi
           * “im lặng”: không bung lỗi nào, chỉ âm thầm lấy mất tự do của bé.
           */
          if (Array.isArray(tiles)) {
            const tron = tiles.filter(
              (t) => !isNumberToken(t) && !isOperator(t),
            );
            if (tron.length)
              themLoi(
                file,
                bai.id,
                i,
                `buildExpression có thẻ TRỘN số với dấu (hoặc lạ): ${JSON.stringify(tron)} — ` +
                  `mỗi thẻ phải là MỘT số ("25") hoặc MỘT dấu ("×")`,
              );
            if (!tiles.some(isOperator))
              themLoi(
                file,
                bai.id,
                i,
                "buildExpression: khay không có thẻ DẤU nào — bé không ghép được phép tính",
              );
          }

          /**
           * 🔴 CÁCH ĐÚNG PHẢI **CÓ NGHIỆM**: tính ra đúng `target`.
           * Số sai một chữ là bài vô nghiệm (bé tính đúng mà vẫn báo sai). Dùng lại chính hàm
           * chấm của app nên cổng không thể lệch khỏi luật thật.
           */
          const can = parseNumber(c.target);
          if (can === null)
            themLoi(
              file,
              bai.id,
              i,
              `buildExpression: \`target\` không đọc được thành số: ${JSON.stringify(c.target)}`,
            );
          if (Array.isArray(cach) && can !== null) {
            cach.forEach((môtCach, k) => {
              const ket = evaluateTokens(môtCach);
              if (ket === null || Math.abs(ket - can) > 1e-9)
                themLoi(
                  file,
                  bai.id,
                  i,
                  `buildExpression: cách đúng thứ ${k + 1} ${JSON.stringify(môtCach)} tính ra ${ket} nhưng target là ${can}`,
                );
            });
          }
        }

        /**
         * HAI KIỂU “TỰ TRẢ LỜI” (2026-09-28): `typeAnswer` (bé gõ số) và `numberLineAnswer`
         * (bé kéo con trỏ trên trục số). Cùng họ “im lặng” với `buildExpression`: dữ liệu sai một
         * chữ là bài VÔ NGHIỆM — bé làm đúng mà vẫn báo sai.
         */
        if (s.type === "typeAnswer" || s.type === "numberLineAnswer") {
          const bieuThuc = String(c.expression ?? "").trim();
          if (!bieuThuc || !/\d/.test(bieuThuc))
            themLoi(
              file,
              bai.id,
              i,
              `${s.type}: \`expression\` phải là phép tính CÓ CHỮ SỐ`,
            );
          else if (/\d\s*$/.test(bieuThuc))
            themLoi(
              file,
              bai.id,
              i,
              `${s.type}: \`expression\` kết thúc bằng CHỮ SỐ — hộp mẫu nối ngay sau nó nên đọc thành vô nghĩa`,
            );
          if (!Number.isInteger(c.answer) || c.answer < 0)
            themLoi(
              file,
              bai.id,
              i,
              `${s.type}: \`answer\` phải là số tự nhiên (bàn phím 0–9 không gõ được dấu phẩy/dấu trừ)`,
            );
        }

        if (s.type === "numberLineAnswer") {
          const vach = ticksOf(c);
          if (vach.length === 0)
            themLoi(
              file,
              bai.id,
              i,
              `numberLineAnswer: min/max/step không dựng được trục số (min ${JSON.stringify(c.min)}, max ${JSON.stringify(c.max)}, step ${JSON.stringify(c.step)})`,
            );
          else {
            /*
             * 🔴 LUẬT QUAN TRỌNG NHẤT: đáp án phải NẰM TRÊN một vạch. Không thì bé kéo đúng cỡ
             * nào cũng không chạm tới đáp án ⇒ bài vô nghiệm mà không có lỗi nào bung ra.
             */
            if (!vach.includes(c.answer))
              themLoi(
                file,
                bai.id,
                i,
                `numberLineAnswer: đáp án ${JSON.stringify(c.answer)} KHÔNG nằm trên vạch nào của trục (${vach.join(" · ")}) ⇒ bài vô nghiệm`,
              );
            // Trần 7 vạch: mỗi nhãn là một ô bấm, nhiều vạch quá thì ngón tay trẻ bấm không trúng.
            if (vach.length > 7)
              themLoi(
                file,
                bai.id,
                i,
                `numberLineAnswer: ${vach.length} vạch — nhiều quá (tối đa 7) thì mỗi ô bấm nhỏ hơn ngón tay trẻ`,
              );
          }
        }

        if (s.type === "matchPairs") {
          const cap = c.pairs;
          if (!Array.isArray(cap) || cap.length < 2)
            themLoi(
              file,
              bai.id,
              i,
              `matchPairs cần ≥ 2 cặp, đang có ${cap?.length ?? 0}`,
            );
          if (Array.isArray(cap)) {
            cap.forEach((x, k) => {
              if (!Array.isArray(x) || x.length !== 2)
                themLoi(
                  file,
                  bai.id,
                  i,
                  `matchPairs: cặp thứ ${k + 1} phải là [trái, phải]`,
                );
            });
            /** Hai vế PHẢI PHÂN BIỆT: trùng khoá thì React trùng `key` và bé nối xong một cặp
             *  là cặp còn lại tự “xanh” theo — chấm sai mà không ai biết. */
            const trai = cap.map((x) => String(x?.[0]));
            const phai = cap.map((x) => String(x?.[1]));
            if (new Set(trai).size !== trai.length)
              themLoi(
                file,
                bai.id,
                i,
                "matchPairs có vế TRÁI trùng nhau — bé nối một cặp là cặp kia tự đúng",
              );
            if (new Set(phai).size !== phai.length)
              themLoi(
                file,
                bai.id,
                i,
                "matchPairs có vế PHẢI trùng nhau — không phân biệt được cặp nào với cặp nào",
              );
          }
        }

        // Đếm số hình VẼ của slide (chính sách §8i: đúng MỘT hình).
        const coHinh = KHOA_HINH.filter(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        if (s.type === "visual" && coHinh.length > 1)
          themCanhBao(
            file,
            `${bai.id} (${bai.title ?? ""})`,
            i,
            `slide có ${coHinh.length} hình vẽ: ${coHinh.join(", ")} — chữ: "${String(c.text ?? "").split("\n")[0]}"`,
          );

        // 🔴 LUẬT ĐÚNG/SAI: mặt đồng hồ phải chỉ ĐÚNG giờ mà chữ của slide nhắc tới.
        // Ca thật cần bắt: đồng hồ vẽ 3 giờ trong khi cả slide nói về 7 giờ.
        if (c.clock && Number.isFinite(Number(c.clock.hour))) {
          const gio = Number(c.clock.hour);
          const chu = [
            c.text,
            c.question,
            c.clock.timeText,
            ...(c.table?.rows ?? []).flat(),
            ...(c.table?.headers ?? []),
          ]
            .filter(Boolean)
            .join(" ");
          const dsGio = [...chu.matchAll(/(\d{1,2})\s*giờ/g)].map((m) =>
            Number(m[1]),
          );
          const co12 = /12\s*giờ/.test(chu) || gio === 12;
          if (dsGio.length && !dsGio.includes(gio) && !co12)
            themLoi(
              file,
              `${bai.id} (${bai.title ?? ""})`,
              i,
              `đồng hồ chỉ ${gio} giờ nhưng chữ chỉ nhắc ${[...new Set(dsGio)].join(", ")} giờ`,
            );
        }

        // CẢNH BÁO (không phải lỗi): chữ của slide nhắc lại đúng phép tính đã có
        // riêng ở `operation`/`comparison` ⇒ trẻ đọc hai lần cùng một điều (§8j).
        const coCauSo = KHOA_CAU_SO.filter(
          (k) => c[k] !== undefined && c[k] !== null,
        );
        if (
          coCauSo.length &&
          /\d\s*[+\-x×:<>]\s*\d/.test(String(c.text ?? ""))
        ) {
          themCanhBao(
            file,
            bai.id,
            i,
            `chữ slide có phép tính trong khi đã có ${coCauSo.join(", ")}: "${String(c.text).split("\n")[0]}"`,
          );
        }

        // Kiểm `shapePicture.kind` có bộ vẽ không.
        if (
          c.shapePicture?.kind &&
          !KIND_SHAPE_PICTURE.has(c.shapePicture.kind)
        )
          themLoi(
            file,
            bai.id,
            i,
            `shapePicture.kind = "${c.shapePicture.kind}" không có bộ vẽ`,
          );

        // Kiểm `planeShape` / `planeShapes[].kind`.
        const planes = [];
        if (c.planeShape) planes.push(c.planeShape);
        if (Array.isArray(c.planeShapes)) planes.push(...c.planeShapes);
        for (const p of planes) {
          if (p?.kind && !KIND_PLANE.has(p.kind))
            themLoi(
              file,
              bai.id,
              i,
              `planeShape.kind = "${p.kind}" không có bộ vẽ`,
            );
        }

        // 🔴 LUẬT “Ô TRỐNG PHẢI ĐIỀN ĐƯỢC” (yêu cầu người dùng 2026-09-25).
        // Bốn lỗi từng xảy ra thật: (1) bảng in cứng ô “?” — trẻ chỉ nhìn; (2) bảng điền được
        // nhưng đặt trên slide câu hỏi ⇒ `InteractiveContext` = false ⇒ rơi về tĩnh;
        // (3) `bangTinh` thiếu đáp án / lệch số ô ⇒ tự rơi về tĩnh mà không báo gì;
        // (4) dãy hình có ô “?” mà không có hình nào cho trẻ chọn.
        const choBam = SLIDE_CHO_BAM.has(s.type);
        const demNullTrongBang = (rows) =>
          Array.isArray(rows)
            ? rows.reduce(
                (a, r) =>
                  a +
                  (Array.isArray(r) ? r.filter((x) => x === null).length : 0),
                0,
              )
            : 0;

        if (c.bangTinh) {
          const soOT = demNullTrongBang(c.bangTinh.rows);
          const soDA = Array.isArray(c.bangTinh.answers)
            ? c.bangTinh.answers.length
            : -1;
          if (soOT === 0)
            themLoi(
              file,
              bai.id,
              i,
              "bangTinh không có ô trống nào (rows toàn giá trị in sẵn) — bảng chỉ để nhìn thì dùng `table`",
            );
          else if (soDA !== soOT)
            themLoi(
              file,
              bai.id,
              i,
              `bangTinh có ${soOT} ô trống nhưng ${soDA} đáp án ⇒ ô KHÔNG điền được`,
            );
          if (
            !Array.isArray(c.bangTinh.options) ||
            c.bangTinh.options.length < 2
          )
            themLoi(
              file,
              bai.id,
              i,
              "bangTinh thiếu `options` (cần ≥2 lựa chọn)",
            );
          if (!choBam)
            themLoi(
              file,
              bai.id,
              i,
              `bangTinh đặt trên slide “${s.type}” ⇒ ô trống không bấm được (chỉ story/concept/visual mới cho bấm)`,
            );
        }

        if (c.cotTinh) {
          const ct = c.cotTinh;
          const soOk = (v) => v !== undefined && v !== null && v !== "";
          if (!soOk(ct.left) || !soOk(ct.right))
            themLoi(
              file,
              bai.id,
              i,
              "cotTinh thiếu `left` hoặc `right` (đặt tính cần đủ hai số)",
            );
          const dauCt =
            ct.sign === "-" || ct.sign === "−"
              ? "−"
              : ct.sign === "*" || ct.sign === "×"
                ? "×"
                : ct.sign === ":" || ct.sign === "÷"
                  ? ":"
                  : "+";
          if (!["+", "-", "−", "×", "*", ":", "÷"].includes(ct.sign ?? "+"))
            themLoi(
              file,
              bai.id,
              i,
              `cotTinh có dấu “${ct.sign}” — chỉ nhận "+", "−", "×" hoặc ":"`,
            );
          if (dauCt === ":") {
            const soOkInt = (v) => /^\d+$/.test(String(v));
            if (!soOkInt(ct.left) || !soOkInt(ct.right))
              themLoi(
                file,
                bai.id,
                i,
                "cotTinh phép CHIA hiện chỉ vẽ được SỐ NGUYÊN (dạng chia số thập phân cần bố cục khác)",
              );
            else if (Number(ct.right) === 0)
              themLoi(file, bai.id, i, "cotTinh phép chia có số chia = 0");
            else if (Number(ct.left) < Number(ct.right))
              themCanhBao(
                file,
                bai.id,
                i,
                `cotTinh chia ${ct.left} : ${ct.right} ⇒ thương 0 (SGK chỉ dạy khi số bị chia LỚN HƠN số chia) — kiểm lại`,
              );
          }
          if (
            dauCt === "−" &&
            Number(String(ct.left).replace(",", ".")) <
              Number(String(ct.right).replace(",", "."))
          )
            themLoi(
              file,
              bai.id,
              i,
              `cotTinh trừ ra số ÂM (${ct.left} − ${ct.right}) — chương trình tiểu học không dạy`,
            );
          if (ct.remember === true && dauCt === "−")
            themCanhBao(
              file,
              bai.id,
              i,
              "cotTinh: `remember` (hàng nhớ) chỉ vẽ cho phép CỘNG và phép NHÂN một chữ số — bỏ đi nếu là phép trừ",
            );
          if (ct.blanks !== "none" && !choBam)
            themLoi(
              file,
              bai.id,
              i,
              `cotTinh đặt trên slide “${s.type}” ⇒ ô kết quả không bấm được (chỉ story/concept/visual mới cho bấm; muốn in sẵn thì ghi blanks: "none")`,
            );
        }

        if (c.patternRow) {
          const soOT = (
            Array.isArray(c.patternRow.shapes) ? c.patternRow.shapes : []
          ).filter((x) => x === "?").length;
          if (soOT > 0) {
            const coDA = Array.isArray(c.patternRow.answers);
            if (coDA && c.patternRow.answers.length !== soOT)
              themLoi(
                file,
                bai.id,
                i,
                `patternRow có ${soOT} ô “?” nhưng ${c.patternRow.answers.length} đáp án ⇒ ô không điền được`,
              );
            else if (
              coDA &&
              (!Array.isArray(c.patternRow.options) ||
                c.patternRow.options.length < 2)
            )
              themLoi(
                file,
                bai.id,
                i,
                "patternRow thiếu `options` (cần ≥2 hình cho trẻ bấm)",
              );
            else if (!coDA && soOT > 1 && !choBam)
              themLoi(
                file,
                bai.id,
                i,
                `patternRow có ${soOT} ô “?” trên slide “${s.type}” — một câu trả lời không phủ hết`,
              );
            else if (!coDA && soOT === 1 && !choBam)
              canhBao.push({
                file,
                bai: bai.id,
                slide: i,
                msg: "patternRow 1 ô “?” trên slide câu hỏi — hợp lệ nếu câu hỏi hỏi đúng ô đó",
              });
          }
        }

        // Dãy số / toa tàu (`numberScene.mode = "numberTrain"`) CÓ ô trống ⇒ phải có `answers`
        // khớp số ô (nhờ đó bộ vẽ mới cho bé bấm — `TrainFill` trong `Grade1NumberVisuals.jsx`).
        // Thiếu/lệch đáp án là ô trống TĨNH mà không có cổng nào khác bắt được.
        if (c.numberScene?.mode === "numberTrain") {
          const laOT = (v) => v === null || v === "?" || v === "";
          const ds =
            c.numberScene.kind === "ribbon"
              ? c.numberScene.numbers
              : (c.numberScene.rows || []).flatMap((r) =>
                  Array.isArray(r) ? r : [],
                );
          const soOT = (Array.isArray(ds) ? ds : []).filter(laOT).length;
          if (soOT > 0) {
            const soDA = Array.isArray(c.numberScene.answers)
              ? c.numberScene.answers.length
              : -1;
            if (soDA !== soOT)
              themLoi(
                file,
                bai.id,
                i,
                `numberTrain có ${soOT} ô trống nhưng ${soDA} đáp án ⇒ ô KHÔNG điền được`,
              );
            else if (!choBam)
              themLoi(
                file,
                bai.id,
                i,
                `numberTrain điền được nhưng đặt trên slide “${s.type}” ⇒ không bấm được`,
              );
          }
        }

        // Bảng vẽ bằng `table` mà in cứng ô “?” = ô trống tĩnh. (Soi rộng hơn — mọi khoá dữ
        // liệu, kể cả chữ lời dẫn — nằm ở `scratch/soat-o-trong.mjs`.)
        if (c.table && Array.isArray(c.table.rows)) {
          const oT = [];
          c.table.rows.forEach((r, ri) =>
            (Array.isArray(r) ? r : []).forEach((cell, ci) => {
              if (typeof cell === "string" && cell.trim() === "?")
                oT.push(`rows[${ri}][${ci}]`);
            }),
          );
          if (oT.length)
            themLoi(
              file,
              bai.id,
              i,
              `bảng có ô “?” IN CỨNG ở ${oT.join(", ")} — trẻ không điền được; dùng \`bangTinh\` hoặc bỏ hẳn dấu ?`,
            );
        }

        if (s.type !== "quiz") return;
        const options = c.options;
        const answer = c.answer;
        if (!Array.isArray(options) || options.length < 2) {
          themLoi(
            file,
            bai.id,
            i,
            `quiz không đủ lựa chọn (${options?.length ?? "thiếu"})`,
          );
          return;
        }
        if (new Set(options.map((o) => String(o))).size !== options.length)
          themLoi(
            file,
            bai.id,
            i,
            `lựa chọn BỊ TRÙNG: ${JSON.stringify(options)}`,
          );
        if (!options.some((o) => o === answer))
          themLoi(
            file,
            bai.id,
            i,
            `đáp án ${JSON.stringify(answer)} KHÔNG nằm trong lựa chọn`,
          );
        if (!c.question || !String(c.question).trim())
          themLoi(file, bai.id, i, "câu hỏi rỗng");
        // Đáp án không được in sẵn trên hình của chính câu hỏi đó.
        const noteHinh = String(c.shapePicture?.note ?? "");
        if (answer !== undefined && typeof answer !== "boolean" && noteHinh) {
          const re = new RegExp(
            `\\b${String(answer).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
          );
          if (re.test(noteHinh))
            themLoi(
              file,
              bai.id,
              i,
              `chú thích hình in sẵn đáp án: "${noteHinh}"`,
            );
        }
      });
    }
    perChapter.push({
      lop: soLopThutu,
      chuong: ch.id,
      bai: (ch.lessons ?? []).length,
      slide: slideChuong,
    });
  }
}

console.log(
  `Quy mô đọc được: ${soLop} lớp · ${soChuong} chương · ${soBai} bài · ${soSlide} slide`,
);

const chuongDangDoi = process.argv.slice(2);
if (chuongDangDoi.length) {
  console.log("\nSố slide từng chương đang xét:");
  for (const r of perChapter.filter((r) => chuongDangDoi.includes(r.chuong))) {
    console.log(`  ${r.chuong}: ${r.bai} bài · ${r.slide} slide`);
  }
}

console.log("\nSố slide theo từng lớp:");
for (const l of [1, 2, 3, 4, 5]) {
  const rows = perChapter.filter((r) => r.lop === l);
  console.log(
    `  Lớp ${l}: ${rows.length} chương · ${rows.reduce((a, r) => a + r.bai, 0)} bài · ` +
      `${rows.reduce((a, r) => a + r.slide, 0)} slide`,
  );
}

if (loi.length === 0) {
  console.log("\n✅ Không phát hiện lỗi cấu trúc slide.");
} else {
  console.log(`\n❌ ${loi.length} LỖI:`);
  for (const l of loi)
    console.log(`  ${l.file} · ${l.bai} · slide ${l.slide}: ${l.msg}`);
}

if (canhBao.length) {
  console.log(`\n⚠️  ${canhBao.length} CẢNH BÁO (chưa chắc là lỗi):`);
  for (const w of canhBao)
    console.log(`  ${w.file} · ${w.bai} · slide ${w.slide}: ${w.msg}`);
}

process.exit(loi.length === 0 ? 0 : 1);
