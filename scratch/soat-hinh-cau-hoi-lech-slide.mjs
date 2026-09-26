// SOÁT "HÌNH VÀ CÂU HỎI NẰM KHÁC SLIDE" — lỗi UX người dùng báo 2026-09-26.
//
//   node scratch/soat-hinh-cau-hoi-lech-slide.mjs            # in báo cáo
//   node scratch/soat-hinh-cau-hoi-lech-slide.mjs --het      # in danh sách đầy đủ
//
// VÌ SAO CÓ FILE NÀY: khi tách slide "một slide chỉ một hình", một số hình dạy học bị tách sang
// slide riêng, còn CÂU HỎI hỏi về chính hình đó thì ở lại slide khác ⇒ bé thấy hình mà không có gì
// để làm, rồi tới slide câu hỏi thì không còn hình để nhìn (phải quay lại). Họ lỗi này KHÔNG bắt
// được bằng cổng cấu trúc (slide vẫn hợp lệ) nên phải soi theo QUAN HỆ giữa các slide trong bài.
//
// Hai mẫu lỗi được đếm riêng:
//   [A] slide CÂU HỎI nhắc tới hình ("trong hình", "bảng", "nhóm", "bể"…) nhưng CHÍNH slide đó
//       không có hình nào ⇒ đề xuất kéo hình từ slide gần nhất về.
//   [B] slide HÌNH giao việc ("chọn số thích hợp", "điền", "nối"…) nhưng KHÔNG có gì để bấm
//       (không có `answers`/`options`/phương án) ⇒ bé không biết làm gì.

import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const HET = process.argv.includes("--het");

// Khoá "có hình" — giống cổng soát hiện có, thêm các khoá đặc biệt mà LessonPage vẽ riêng.
const KHOA_HINH = [
  "baseTen",
  "tenFrame",
  "numberLine",
  "placeValue",
  "ruler",
  "money",
  "table",
  "planeShape",
  "planeShapes",
  "angle",
  "circleParts",
  "solid",
  "fractionBar",
  "fractionCircle",
  "barModel",
  "motionDiagram",
  "barChart",
  "pieChart",
  "numberScene",
  "spatialScene",
  "groupScene",
  "shapeJoin",
  "pointLine",
  "patternRow",
  "cotTinh",
  "clock",
  "operation",
  "comparison",
  "shape",
  "diceFaces",
  // ⚠️ Thiếu 5 khoá này thì cổng BÁO OAN: `shapePicture` là hình thật do app vẽ (đồng hồ, viên
  // gạch, mái nhà, ngôi nhà…), bốn khoá còn lại là khối hình của bộ vẽ cũ. Đã mắc thật: câu hỏi
  // "Mặt đồng hồ có dạng hình gì?" bị tố là thiếu hình trong khi slide đã có `shapePicture`.
  "shapePicture",
  // 🔴 `items` = hàng ký hiệu (ví dụ 👤👤👤👤👤) là KHỐI HÌNH THẬT do LessonPage vẽ — xem
  // danh sách khối hình cũ ở đầu `client/src/components/visuals/VisualBlock.jsx`. Thiếu khoá này
  // thì câu hỏi "Biểu đồ có 5 ký hiệu, mỗi ký hiệu đại diện 5 bạn" bị tố oan là thiếu hình ⇒
  // công cụ tự sửa chèn THÊM biểu đồ cột vào, thành hai hình không liên quan nhau (đã mắc thật).
  "items",
  "gallery",
  "activityGrid",
  "dialogue",
  "visualDisplay",
];

const coHinh = (c) =>
  !!c && typeof c === "object" && KHOA_HINH.some((k) => c[k] !== undefined);
const chuCua = (c) =>
  [c?.text, c?.title, c?.question, c?.rule, c?.explanation, c?.note, c?.label]
    .filter((x) => typeof x === "string")
    .join(" ");
const chuNoi = (s) =>
  [chuCua(s.content), s.content?.mascotHint].filter(Boolean).join(" ");

// Báo oan đã gặp: "Hình vuông có mấy cạnh?" — chữ "hình" ở đây là TÊN HÌNH HỌC, không phải
// "cái hình vẽ ở slide trước". Vì vậy bỏ các cụm tên hình trước khi soi.
const TEN_HINH_HOC =
  /hình (vuông|tròn|tam giác|chữ nhật|bình hành|thoi|thang|tứ giác|khối|hộp|lập phương|cầu|trụ|phẳng|dạng|học|vẽ|này|đó)/gi;
// 🔴 CHỈ những câu THẬT SỰ trỏ vào hình mới tính là "câu hỏi cần hình". Bản cũ để lỏng
// (`dưới đây`, `bảng`, `nhóm`, `bể`, `khay`) nên tố oan 14 ca — những câu tự chứa đủ dữ liệu
// ("Số nào dưới đây là số tròn chục?", "Nhóm A có 5 cái kẹo…"). Gắn hình vào những câu đó tạo ra
// cặp câu hỏi–hình vô nghĩa (đã mắc thật với "Biểu đồ có 5 ký hiệu…").
const NHAC_HINH =
  /trong hình|trong bảng|bảng 100 số|bảng các số|biểu đồ|trên (mặt )?đồng hồ|hình vẽ/i;
const GIAO_VIEC =
  /chọn số|chọn hình|chọn đáp án|điền số|nối|đếm rồi|viết số|đặt tính/i;
const CO_LOI_GIAI = (c) =>
  Array.isArray(c?.answers) ||
  Array.isArray(c?.options) ||
  c?.answer !== undefined;

/** Chỉ soi chữ CHÍNH (câu hỏi / chữ slide), KHÔNG soi lời gợi ý của Rô-bốt. */
const chuSoi = (s) => chuCua(s.content).replace(TEN_HINH_HOC, " ");

/** Từ khoá để so "câu hỏi nói về hình nào": bỏ từ chung, giữ danh từ chỉ đồ vật. */
const tuKhoa = (t) =>
  new Set(
    String(t || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter(
        (w) =>
          w.length > 2 &&
          ![
            "các",
            "cho",
            "trong",
            "hình",
            "dưới",
            "đây",
            "của",
            "nào",
            "mấy",
            "bé",
            "với",
            "thì",
            "làm",
            "một",
            "hai",
          ].includes(w),
      ),
  );

const diemGiong = (a, b) => {
  const A = tuKhoa(a),
    B = tuKhoa(b);
  let d = 0;
  for (const w of A) if (B.has(w)) d++;
  return d;
};

const thuMucData = "client/src/data";
const ca = [];
for (const lop of [1, 2, 3, 4, 5]) {
  const f = path.join(thuMucData, `grade${lop}Data.js`);
  if (!existsSync(f)) continue;
  const m = await import(pathToFileURL(path.resolve(f)).href);
  const data = m[`grade${lop}Data`];
  for (const ch of data?.chapters || []) {
    for (const bai of ch.lessons || []) {
      const slides = bai.slides || [];
      slides.forEach((s, i) => {
        if (s.type === "quiz") {
          const chu = chuSoi(s);
          if (NHAC_HINH.test(chu) && !coHinh(s.content)) {
            // tìm slide HÌNH gần nhất phía trước (trong 4 slide) và chấm điểm giống chữ
            let tot = null;
            for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
              if (!coHinh(slides[j].content)) continue;
              const d = diemGiong(chu, chuCua(slides[j].content));
              if (!tot || d > tot.diem)
                tot = {
                  j,
                  diem: d,
                  khoa: KHOA_HINH.filter(
                    (k) => slides[j].content[k] !== undefined,
                  ).join("+"),
                };
            }
            ca.push({
              mau: "A",
              lop,
              bai: bai.id,
              tieuDe: bai.title,
              i,
              chu: chu.slice(0, 90),
              nguon: tot,
            });
          }
        }
        if (s.type === "visual" || s.type === "concept") {
          const chu = chuSoi(s);
          const giaoViec = GIAO_VIEC.test(chu);
          const coHinhThat = coHinh(s.content);
          const lamDuoc = CO_LOI_GIAI(s.content);
          // Chỉ tính là "hình giao việc mà không làm được" khi hình là loại CÓ Ô TRỐNG để điền
          // (`numberScene.mode = manyGroups` vẽ các hàng nhóm với ô trống) — không tính mọi hình.
          const coOTrong = s.content?.numberScene?.mode === "manyGroups";
          if (giaoViec && coHinhThat && !lamDuoc && coOTrong) {
            ca.push({
              mau: "B",
              lop,
              bai: bai.id,
              tieuDe: bai.title,
              i,
              chu: chu.slice(0, 90),
              nguon: null,
            });
          }
        }
      });
    }
  }
}

const A = ca.filter((x) => x.mau === "A");
const B = ca.filter((x) => x.mau === "B");
console.log(
  `Soát 5 lớp: [A] câu hỏi nhắc hình mà không có hình = ${A.length} · [B] hình giao việc mà không làm được = ${B.length}`,
);
const theoBai = new Set(ca.map((x) => x.bai));
console.log(`Tổng số bài bị ảnh hưởng: ${theoBai.size}`);

// Xuất KẾ HOẠCH cho bước sửa (`gan-hinh-vao-cau-hoi.mjs`) — chỉ những ca ĐỦ TIN:
// phải tìm thấy slide hình phía trước, và hình đó phải cách không quá 3 slide.
const { writeFileSync } = await import("node:fs");
const keHoach = A.filter((x) => x.nguon && x.i - x.nguon.j <= 3).map((x) => ({
  bai: x.bai,
  slideQuiz: x.i,
  slideNguon: x.nguon.j,
  khoa: x.nguon.khoa,
  diemGiong: x.nguon.diem,
}));
const iXuat = process.argv.indexOf("--ke-hoach");
if (iXuat >= 0 && process.argv[iXuat + 1]) {
  writeFileSync(
    process.argv[iXuat + 1],
    JSON.stringify(keHoach, null, 2) + "\n",
    "utf8",
  );
  console.log(
    `Đã ghi kế hoạch: ${process.argv[iXuat + 1]} (${keHoach.length} ca)`,
  );
}
const soSoi = keHoach.filter((k) => k.diemGiong === 0).length;
console.log(
  `Kế hoạch tự sửa được: ${keHoach.length} ca (trong đó ${soSoi} ca KHÔNG khớp từ khoá ⇒ ghi lại để soi tay)`,
);

const inDs = (ds, nhan) => {
  console.log(`\n── ${nhan} ──`);
  for (const x of HET ? ds : ds.slice(0, 25)) {
    console.log(`  ${x.bai} #${x.i + 1} (${x.tieuDe.slice(0, 40)}): ${x.chu}`);
    if (x.mau === "A") {
      console.log(
        `      ↳ hình gần nhất: slide #${(x.nguon?.j ?? -1) + 1} · khoá ${x.nguon?.khoa ?? "?"} · giống chữ ${x.nguon?.diem ?? 0}`,
      );
    }
  }
  if (!HET && ds.length > 25)
    console.log(`  … còn ${ds.length - 25} ca (dùng --het)`);
};
inDs(A, "A · câu hỏi nhắc hình, slide không có hình");
inDs(B, "B · hình giao việc nhưng không có gì để bấm");
