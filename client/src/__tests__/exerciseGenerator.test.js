/**
 * TEST BỘ SINH BÀI TẬP — mục 4.2 của `docs/Plan/ke-hoach-tu-phan-tich-nguon.md`.
 *
 * Hai lớp kiểm, cố ý tách rõ:
 *
 *  1. TÍNH CHẤT (đọc là hiểu): mọi câu sinh ra, ở MỌI chủ đề, phải hợp lệ với trẻ — có câu hỏi,
 *     có phương án, đáp án NẰM TRONG phương án, phương án không trùng nhau, mê cung có bảng…
 *     Đây là lớp bắt được lỗi THẬT khi ai đó sửa bộ sinh.
 *
 *  2. VÂN TAY (`van-tay-sinh-bai.json`): sinh lại 25 câu mỗi chủ đề với hạt ngẫu nhiên CỐ ĐỊNH rồi
 *     so với bản đã lưu ⇒ phát hiện MỌI thay đổi hành vi, kể cả thay đổi nhỏ mà luật "tính chất"
 *     không thấy (ví dụ đổi cách chọn số nhưng vẫn hợp lệ).
 *     ⚠️ Đây là phép kiểm CỐ Ý nhạy: sửa bộ sinh có chủ đích thì phải cập nhật vân tay bằng
 *     `node client/src/__tests__/sinhBaiMauToanBo.mjs > client/src/__tests__/van-tay-sinh-bai.json`
 *     — và ĐỌC kỹ phần vân tay đổi để chắc đó là điều mình muốn.
 */
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import "./setup.js";
import {
  TOPICS,
  PRACTICE_EXTRA_TOPICS,
  generateQuestion,
  generateCalculation,
  mazeTopicId,
} from "../utils/exerciseGenerator.js";
import { danhSachChuDe, vanTayToanBo } from "./sinhBaiMauToanBo.mjs";
import { sinhMauChuDe } from "./sinhBaiMau.js";

const VAN_TAY = JSON.parse(
  readFileSync(new URL("./van-tay-sinh-bai.json", import.meta.url), "utf8"),
);

const CHU_DE = danhSachChuDe();

/** Kiểm một câu hỏi có hợp lệ với trẻ không. Trả về mô tả lỗi, hoặc null nếu đạt. */
function loiCuaCau(q, nhan) {
  if (!q || typeof q !== "object") return `${nhan}: không phải object`;
  if (typeof q.question !== "string" || q.question.trim().length < 5)
    return `${nhan}: câu hỏi rỗng/ngắn`;

  // Mê cung: hình đi kèm là bảng + luật, KHÔNG có `options` để bấm.
  if (q.type === "maze") {
    if (!Array.isArray(q.maze?.grid) || !q.maze.grid.length)
      return `${nhan}: mê cung thiếu bảng`;
    if (!q.maze?.rule?.op || typeof q.maze.rule.value !== "number")
      return `${nhan}: mê cung thiếu luật`;
    return null;
  }
  // Thẻ chấm: bé điền dấu vào ô, không có 4 phương án.
  if (q.type === "dotCards") {
    if (typeof q.dots?.left !== "number" || typeof q.dots?.right !== "number")
      return `${nhan}: thẻ chấm thiếu số lượng`;
    return null;
  }

  if (!Array.isArray(q.options) || q.options.length < 2)
    return `${nhan}: thiếu phương án (${q.options?.length})`;
  // Trần chỉ để bắt lỗi VÔ LÝ (đo thật: nhiều nhất 7 phương án, ở `g3_numbers_10k`), không phải
  // để ép bộ sinh về 4 phương án — có khuôn cố ý cho nhiều lựa chọn.
  if (q.options.length > 12)
    return `${nhan}: quá nhiều phương án (${q.options.length})`;
  if (!q.options.includes(q.answer))
    return `${nhan}: đáp án ${JSON.stringify(q.answer)} không nằm trong phương án`;
  const bam = q.options.map((o) => JSON.stringify(o));
  if (new Set(bam).size !== bam.length) return `${nhan}: phương án trùng nhau`;
  if (typeof q.ref !== "string" || !q.ref.startsWith("tmpl:"))
    return `${nhan}: thiếu \`ref\``;
  return null;
}

describe("bộ sinh bài tập — tính chất của câu hỏi", () => {
  it(`mọi chủ đề (${CHU_DE.length}) đều sinh ra câu hợp lệ`, () => {
    const loi = [];
    for (const c of CHU_DE) {
      const mau = sinhMauChuDe(
        c.khoaLop,
        c.topicId,
        5,
        generateQuestion,
        c.lop,
      );
      for (const q of mau) {
        const l = loiCuaCau(q, `${c.topicId}`);
        if (l) loi.push(l);
      }
    }
    expect(loi.slice(0, 10)).toEqual([]);
  });

  it("đường KHÔNG truyền chủ đề (Thử thách + mini game) cũng hợp lệ mọi lớp", () => {
    const loi = [];
    for (let lop = 1; lop <= 5; lop++) {
      for (let i = 0; i < 60; i++) {
        const l = loiCuaCau(generateQuestion(lop), `lớp ${lop}`);
        if (l) loi.push(l);
      }
    }
    expect(loi.slice(0, 10)).toEqual([]);
  });

  it("chủ đề KHÔNG tồn tại vẫn ra câu hợp lệ (không rơi vào câu lặp)", () => {
    // Từng có lỗi thật: 9/57 khuôn rơi vào MỘT câu dự phòng cố định, bé thấy y hệt nhau mãi.
    const ds = [];
    for (let i = 0; i < 40; i++)
      ds.push(generateQuestion(1, "khong_co_chu_de_nay"));
    const loi = ds.map((q) => loiCuaCau(q, "dự phòng")).filter(Boolean);
    expect(loi).toEqual([]);
    const cauKhacNhau = new Set(ds.map((q) => q.question));
    expect(cauKhacNhau.size).toBeGreaterThan(3);
  });

  it("tính nhẩm (mini game) không ra phép trừ có kết quả âm", () => {
    const loi = [];
    for (let lop = 1; lop <= 5; lop++) {
      for (let i = 0; i < 80; i++) {
        const q = generateCalculation(lop);
        if (!q || !Array.isArray(q.options) || q.options.length < 2)
          loi.push(`lớp ${lop}: thiếu phương án`);
        else if (!q.options.includes(q.answer))
          loi.push(`lớp ${lop}: đáp án ngoài phương án`);
        if (typeof q.answer === "number" && q.answer < 0)
          loi.push(`lớp ${lop}: đáp án âm`);
      }
    }
    expect(loi.slice(0, 10)).toEqual([]);
  });

  it("danh sách chủ đề mỗi lớp đúng quy mô đã chốt", () => {
    expect(
      Object.fromEntries(Object.entries(TOPICS).map(([k, v]) => [k, v.length])),
    ).toEqual({
      GRADE_1: 13,
      GRADE_2: 17,
      GRADE_3: 22,
      GRADE_4: 15,
      GRADE_5: 12,
    });
    expect(
      Object.fromEntries(
        Object.entries(PRACTICE_EXTRA_TOPICS).map(([k, v]) => [k, v.length]),
      ),
    ).toEqual({
      GRADE_1: 2,
      GRADE_2: 1,
      GRADE_3: 1,
      GRADE_4: 1,
      GRADE_5: 1,
    });
  });

  it("mã chủ đề mê cung theo lớp", () => {
    for (let lop = 1; lop <= 5; lop++)
      expect(mazeTopicId(lop)).toMatch(/^g\d+_number_maze$/);
  });
});

describe("bộ sinh bài tập — vân tay (phát hiện mọi thay đổi hành vi)", () => {
  const vanTay = vanTayToanBo();
  const khoaMoi = Object.keys(vanTay);
  const khoaCu = Object.keys(VAN_TAY);

  it("số chủ đề không đổi (thêm/bớt chủ đề phải cập nhật vân tay)", () => {
    expect(khoaMoi.length).toBe(khoaCu.length);
    expect(khoaMoi.filter((k) => !khoaCu.includes(k))).toEqual([]);
  });

  it("từng chủ đề sinh ra ĐÚNG dãy câu như bản đã lưu", () => {
    const khac = khoaMoi.filter((k) => vanTay[k] !== VAN_TAY[k]);
    // Thông báo phải nói rõ CÁCH SỬA, không chỉ "sai".
    expect(
      khac,
      `Bộ sinh đã đổi ở: ${khac.join(", ")}\n` +
        `Nếu là thay đổi CÓ CHỦ ĐÍCH: cập nhật vân tay bằng\n` +
        `  node client/src/__tests__/sinhBaiMauToanBo.mjs > client/src/__tests__/van-tay-sinh-bai.json`,
    ).toEqual([]);
  });
});
