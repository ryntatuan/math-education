/**
 * SINH MẪU CÂU HỎI ĐỂ KIỂM BỘ SINH BÀI TẬP — hàm dùng CHUNG cho test và cho công cụ tạo vân tay.
 *
 * 🔴 VÌ SAO PHẢI CÓ HÀM DÙNG CHUNG: bộ sinh dùng `Math.random()`. Muốn SO TỪNG CÂU giữa hai lần
 * chạy thì phải thay `Math.random` bằng bộ sinh giả **có hạt cố định theo từng chủ đề** — chép
 * hai bản logic này ra hai chỗ là thế nào cũng lệch nhau, lúc đó phép kiểm báo sai chứ không phải
 * mã sai. Đã có bài học đúng họ lỗi này trong dự án.
 *
 * Cách dùng (test):
 *   const mau = sinhMauChuDe("GRADE_1", topicId, 25);   // hạt lấy từ chính khoá chủ đề
 */
import { createHash } from "node:crypto";

/** Bộ sinh giả (LCG) — chạy lại cùng hạt thì ra cùng dãy số. */
function taoRandom(hat) {
  let x = hat >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

/** Hạt cố định suy từ một chuỗi (tất định giữa các lần chạy và các máy). */
export function hatTuChuoi(s) {
  const h = createHash("sha256").update(s).digest();
  return h.readUInt32BE(0);
}

/** Băm một giá trị thành chuỗi ngắn để làm "vân tay". */
export function bam(giTri) {
  return createHash("sha256")
    .update(JSON.stringify(giTri))
    .digest("hex")
    .slice(0, 16);
}

/**
 * Sinh `soLuong` câu hỏi cho một chủ đề, với `Math.random` đã bị thay bằng bộ sinh có hạt cố định.
 * Trả về mảng kết quả (hoặc `{ loi }` nếu bộ sinh ném lỗi).
 */
export function sinhMauChuDe(khoaLop, topicId, soLuong, generateQuestion, lop) {
  const soThat = lop ?? Number(String(khoaLop).replace(/\D/g, ""));
  const goc = Math.random;
  Math.random = taoRandom(hatTuChuoi(`${khoaLop}|${topicId}`));
  try {
    const ra = [];
    for (let i = 0; i < soLuong; i++) {
      try {
        ra.push(
          JSON.parse(JSON.stringify(generateQuestion(soThat, topicId) ?? null)),
        );
      } catch (e) {
        ra.push({ loi: String(e && e.message ? e.message : e) });
      }
    }
    return ra;
  } finally {
    Math.random = goc;
  }
}

/** Chạy `fn` với `Math.random` đã thay bằng bộ sinh có hạt cố định. */
export function voiHatCoDinh(hat, fn) {
  const goc = Math.random;
  Math.random = taoRandom(hat);
  try {
    return fn();
  } finally {
    Math.random = goc;
  }
}
