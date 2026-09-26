/**
 * Kiểm tính toàn vẹn của cây nội dung (5 lớp, 51 chủ đề, 460 bài).
 *
 * ⚠️ Con số ở đây là **quy mô đã chốt** của repo (xem `docs/`): đổi quy mô thì phải đổi
 * cả test này lẫn các chỗ ghi cứng khác (`node scratch/doi-quy-mo.mjs`). Test này tồn tại
 * để việc đổi quy mô KHÔNG xảy ra âm thầm.
 */
import "./setup.js";
import { describe, it, expect } from "vitest";
import {
  getGrade,
  getChapter,
  getLesson,
  findLessonById,
  tapMaBaiHoc,
  demBaiDaHoc,
} from "../data/curriculum.js";

const SO_LOP = 5;
const SO_CHU_DE = 51;
const SO_BAI = 460;

/** `tapMaBaiHoc()` trả về **Set** (không phải mảng) — chuyển sang mảng cho dễ kiểm. */
const danhSachMa = () => [...tapMaBaiHoc()];

describe("curriculum — cây nội dung", () => {
  it("đủ 5 lớp, mỗi lớp có chủ đề", () => {
    for (let g = 1; g <= SO_LOP; g++) {
      const grade = getGrade(g);
      expect(grade, `lớp ${g}`).toBeTruthy();
      expect(grade.chapters.length).toBeGreaterThan(0);
    }
  });

  it("tổng số chủ đề và số bài đúng quy mô đã chốt", () => {
    let chuDe = 0;
    for (let g = 1; g <= SO_LOP; g++) chuDe += getGrade(g).chapters.length;
    expect(chuDe).toBe(SO_CHU_DE);
    expect(danhSachMa().length).toBe(SO_BAI);
  });

  it("mã bài học là duy nhất (không có bài trùng mã)", () => {
    const ma = danhSachMa();
    expect(new Set(ma).size).toBe(ma.length);
  });

  it("tra cứu ngược từ mã bài ra đúng bài đó", () => {
    const dau = danhSachMa()[0];
    const tim = findLessonById(dau); // trả về { lesson, chapter, grade }
    expect(tim).toBeTruthy();
    expect(tim.lesson.id).toBe(dau);
    expect(typeof tim.lesson.title).toBe("string");
    expect(tim.lesson.title.length).toBeGreaterThan(0);
    expect(tim.chapter.id).toBeTruthy();
    expect(tim.grade.id).toBeTruthy();
  });

  it("getLesson trả về đúng bài, sai khoá thì không trả gì", () => {
    const chuDe = getGrade(1).chapters[0];
    const bai = chuDe.lessons[0];
    expect(getLesson(1, chuDe.id, bai.id)?.id).toBe(bai.id);
    expect(getLesson(1, chuDe.id, "khong-co-bai-nay")).toBeFalsy();
  });

  it("getChapter trả về chủ đề kèm danh sách bài", () => {
    const chuDe = getChapter(1, getGrade(1).chapters[0].id);
    expect(chuDe.lessons.length).toBeGreaterThan(0);
  });

  it("đếm bài đã học (nhận dạng bản đồ mã → dữ liệu)", () => {
    const [a, b] = danhSachMa();
    const daHoc = { [a]: { stars: 3 }, [b]: { stars: 2 } };
    expect(demBaiDaHoc(daHoc)).toEqual({ soBai: 2, soSao: 5 });
    expect(demBaiDaHoc({})).toEqual({ soBai: 0, soSao: 0 });
    expect(demBaiDaHoc(null)).toEqual({ soBai: 0, soSao: 0 });
  });

  it("bỏ qua mã bài đã bị xoá khỏi nội dung (dữ liệu cũ của bé)", () => {
    const [a] = danhSachMa();
    const daHoc = { [a]: { stars: 1 }, "g9-c9-l9-khong-ton-tai": { stars: 3 } };
    expect(demBaiDaHoc(daHoc)).toEqual({ soBai: 1, soSao: 1 });
  });
});
