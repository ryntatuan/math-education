/**
 * Bộ sinh mẫu cho toàn bộ chủ đề — dùng chung cho test `vitest` VÀ công cụ tạo "vân tay".
 *
 *   node client/src/__tests__/sinhBaiMauToanBo.mjs        # in ra JSON vân tay (để so/cập nhật)
 *
 * Mẫu gồm 4 đường mã thật của app:
 *   · mỗi chủ đề của từng lớp            (PracticePage chọn chủ đề)
 *   · mỗi chủ đề "tự làm"                (thẻ chấm, mê cung — PRACTICE_EXTRA_TOPICS)
 *   · generateQuestion(grade) không topic (ChallengePage + các mini game)
 *   · generateCalculation(grade)          (game tính nhẩm)
 */
import {
  TOPICS,
  PRACTICE_EXTRA_TOPICS,
  generateQuestion,
  generateCalculation,
} from "../utils/exerciseGenerator.js";
import { sinhMauChuDe, bam, hatTuChuoi, voiHatCoDinh } from "./sinhBaiMau.js";

/** Số câu mỗi chủ đề — đủ để phủ các nhánh `if (Math.random() …)` mà vẫn chạy nhanh. */
export const SO_MAU = 25;

/** Danh sách chủ đề theo lớp, dạng [{khoaLop, topicId, lop}]. */
export function danhSachChuDe() {
  const ra = [];
  for (const [khoaLop, arr] of Object.entries(TOPICS)) {
    if (!Array.isArray(arr)) continue;
    const lop = Number(khoaLop.replace(/\D/g, ""));
    for (const t of arr) ra.push({ khoaLop, topicId: t.id, lop });
  }
  for (const [khoaLop, arr] of Object.entries(PRACTICE_EXTRA_TOPICS)) {
    if (!Array.isArray(arr)) continue;
    const lop = Number(khoaLop.replace(/\D/g, "")) || 1;
    for (const t of arr)
      ra.push({ khoaLop: "EXTRA" + khoaLop, topicId: t.id, lop });
  }
  return ra;
}

/** Vân tay của MỘT chủ đề: băm 25 câu hỏi sinh ra với hạt cố định của chủ đề đó. */
export function vanTayChuDe({ khoaLop, topicId, lop }) {
  return bam(sinhMauChuDe(khoaLop, topicId, SO_MAU, generateQuestion, lop));
}

/** Vân tay của toàn bộ: từng chủ đề + đường không truyền topic + tính nhẩm. */
export function vanTayToanBo() {
  const ra = {};
  for (const c of danhSachChuDe())
    ra[`${c.khoaLop}|${c.topicId}`] = vanTayChuDe(c);
  for (let lop = 1; lop <= 5; lop++) {
    ra[`NGRADE${lop}`] = bam(
      voiHatCoDinh(hatTuChuoi("NGRADE" + lop), () => {
        const ds = [];
        for (let i = 0; i < 60; i++) ds.push(generateQuestion(lop));
        return ds;
      }),
    );
    ra[`CALC${lop}`] = bam(
      voiHatCoDinh(hatTuChuoi("CALC" + lop), () => {
        const ds = [];
        for (let i = 0; i < 60; i++) ds.push(generateCalculation(lop));
        return ds;
      }),
    );
  }
  return ra;
}

// Chạy trực tiếp bằng Node:
//   node client/src/__tests__/sinhBaiMauToanBo.mjs                      -> in ra màn hình
//   node client/src/__tests__/sinhBaiMauToanBo.mjs --ghi <đường-dẫn>    -> GHI bằng Node
//
// 🔴 PHẢI GHI BẰNG NODE, không dùng `>` của PowerShell: PowerShell 5.1 ghi `>` ra **UTF-16**
// kèm BOM ⇒ `JSON.parse` chết với `Unexpected token '\uFFFE'` (đã mắc thật, làm đỏ cả suite test).
if (
  process.argv[1] &&
  process.argv[1].replace(/\\/g, "/").endsWith("sinhBaiMauToanBo.mjs")
) {
  const iGhi = process.argv.indexOf("--ghi");
  const noiDung = JSON.stringify(vanTayToanBo(), null, 2) + "\n";
  if (iGhi >= 0 && process.argv[iGhi + 1]) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(process.argv[iGhi + 1], noiDung, "utf8");
    console.log(
      `Đã ghi vân tay: ${process.argv[iGhi + 1]} (${noiDung.length} byte, không BOM)`,
    );
  } else {
    console.log(noiDung);
  }
}
