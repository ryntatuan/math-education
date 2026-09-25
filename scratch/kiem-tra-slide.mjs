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
]);

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
