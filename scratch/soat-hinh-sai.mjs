// Soát 5 lớp tìm các lỗi HÌNH HỌC mà cổng kiểm không bắt được.
//
// Người dùng nhìn màn hình rồi báo 7 lỗi ở Lớp 1 chương 2 (2026-09-22). File này biến
// từng lời báo thành một PHÉP ĐO để biết lỗi nào còn ở những bài khác:
//
//   A. `planeShape.kind = "square"` — hình VUÔNG phải là hình vuông thật (bề rộng = chiều
//      cao). Người dùng thấy nhãn "Hình vuông" mà hình vẽ là hình chữ nhật.
//   B. Hình có nhãn "cạnh" mà KHÔNG có "đỉnh" — trong khi lời giảng nói "3 cạnh · 3 đỉnh".
//   C. Slide nhồi nhiều thứ: quá nhiều khoá hình + chữ trong CÙNG một slide.
//   D. Câu hỏi/ lời giảng nhắc tới ĐỒ VẬT (quyển sách, mặt đồng hồ, viên gạch, mái nhà)
//      mà slide không có hình đồ vật nào.
//   E. Lời giảng nhắc "ghép ... thành ..." mà không có hình mô tả cách ghép.
//
// Chạy: node scratch/soat-hinh-sai.mjs

// ⚠️ BÀI HỌC: lần đầu tôi để điều kiện quá rộng ("câu chữ nhắc tới quả bóng" cũng bị coi là
// lỗi) nên ra **550 dòng** — danh sách dài mà không dùng được thì vô ích như không có. Điều
// kiện phải bám đúng "bài này dạy NHÌN hình gì":
//   • chỉ tính là lỗi khi câu chữ BẮT TRẺ NHÌN rồi gọi tên hình ("…có dạng hình gì")
//   • với "ghép/cắt" thì chỉ tính khi bài đang dạy về HÌNH (không tính bài toán lời văn)

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const KHOA_HINH = [
  "baseTen",
  "tenFrame",
  "numberLine",
  "placeValue",
  "ruler",
  "money",
  "table",
  "planeShape",
  "angle",
  "circleParts",
  "solid",
  "shapePicture",
  "shapeJoin",
  "shapePicture",
  "shapeJoin",
  "fractionBar",
  "fractionCircle",
  "barModel",
  "motionDiagram",
  "barChart",
  "pieChart",
];
/** Hình VẼ RA HÌNH DẠNG (không tính bảng biểu, trục số, biểu đồ…). */
const HINH_DANG = [
  "planeShape",
  "shapePicture",
  "shapeJoin",
  "solid",
  "circleParts",
  "angle",
];

const DO_VAT =
  /(quyển sách|cuốn sách|mặt đồng hồ|viên gạch|mái nhà|ngôi nhà|cửa sổ|thân nhà|bánh xe|quả bóng|cái đĩa|đồng xu|tờ lịch|viên phấn|quyển vở|hộp bút|cái bánh|cái nón|thùng|chai|lon|cốc|bình|túi|bao|khung ảnh|mặt bàn|cửa ra vào)/i;
/** Câu "bắt trẻ nhìn rồi gọi tên hình" — ĐÂY mới là chỗ BẮT BUỘC phải có hình. */
const HOI_HINH =
  /(có dạng hình|dạng hình gì|là hình gì|nhìn và gọi tên hình|gọi tên hình)/i;
const GHEP = /(ghép|cắt|lắp ghép)/i;

const nhom = { A: [], B: [], C: [], D: [], E: [] };
let soSlide = 0;
let soSlideHinh = 0;

for (const [file, key] of NGUON) {
  const mod = await import(`../client/src/data/${file}`);
  const data = mod[key];
  const lop = file.replace("Data.js", "").replace("grade", "Lớp ");

  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      for (let i = 0; i < (bai.slides || []).length; i++) {
        const sl = bai.slides[i];
        const c = sl.content || {};
        soSlide++;
        const coHinh = KHOA_HINH.filter((k) => c[k] != null);
        const coHinhDang = HINH_DANG.filter((k) => c[k] != null);
        if (coHinh.length) soSlideHinh++;
        const chu = [c.text, c.title, c.question, c.rule, c.explanation]
          .filter((x) => typeof x === "string")
          .join(" · ");
        const noi = `${lop}/${bai.id}#${i}`;

        // ── A. hình vuông phải vẽ cho đúng
        if (c.planeShape && c.planeShape.kind === "square") {
          nhom.A.push(`${noi} · nhãn "${c.planeShape.labels || ""}" · chữ: ${chu.slice(0, 70)}`);
        }

        // ── B. nói tới ĐỈNH mà hình chưa đánh dấu đỉnh
        const ps = c.planeShape;
        if (
          ps &&
          ps.kind !== "circle" &&
          Array.isArray(ps.labels) &&
          ps.labels.join(" ").includes("cạnh") &&
          /đỉnh/i.test(chu) &&
          ps.vertices !== true
        ) {
          nhom.B.push(`${noi} · nhãn [${ps.labels.join(", ")}] · ${chu.slice(0, 70)}`);
        }

        // ── C. slide nhồi: BẢNG lại thêm HÌNH, hoặc nhiều hình + chữ dài
        if (coHinhDang.length && c.table != null) {
          nhom.C.push(
            `${noi} · [${coHinh.join(", ")}] · chữ ${chu.length} ký tự · ${chu.slice(0, 70)}`,
          );
        } else if (coHinhDang.length >= 2 && chu.length > 40) {
          nhom.C.push(
            `${noi} · ${coHinhDang.length} hình dạng [${coHinhDang.join(", ")}] · ${chu.slice(0, 60)}`,
          );
        }

        // ── D. bài "nhận biết hình trong đồ vật" mà không có hình để nhìn
        if (
          HOI_HINH.test(chu) &&
          DO_VAT.test(chu) &&
          !c.shapePicture &&
          !c.items &&
          !coHinhDang.length
        ) {
          nhom.D.push(`${noi} · loại ${sl.type} · ${chu.slice(0, 110)}`);
        }

        // ── E. dạy GHÉP/CẮT hình mà không có hình minh hoạ cách ghép
        if (GHEP.test(chu) && !c.shapeJoin && !c.items && !coHinhDang.length) {
          nhom.E.push(`${noi} · loại ${sl.type} · ${chu.slice(0, 110)}`);
        }
      }
    }
  }
}

const inNhom = (ten, ds, ghiChu) => {
  console.log(`\n=== ${ten} — ${ds.length} chỗ ===`);
  if (ghiChu) console.log(`    ${ghiChu}`);
  ds.slice(0, 40).forEach((x) => console.log("  " + x));
  if (ds.length > 40) console.log(`  … còn ${ds.length - 40} chỗ nữa`);
};

console.log(`Đã soát ${soSlide} slide · ${soSlideHinh} slide có hình vẽ`);
inNhom("A. hình vuông (phải vẽ đúng là vuông)", nhom.A);
inNhom("B. nói tới ĐỈNH mà hình chưa đánh dấu đỉnh", nhom.B);
inNhom("C. slide nhồi (bảng + hình, hoặc nhiều hình + chữ dài)", nhom.C);
inNhom("D. bài 'nhận biết hình trong đồ vật' thiếu hình đồ vật", nhom.D);
inNhom("E. dạy GHÉP/CẮT mà không có hình minh hoạ", nhom.E);
