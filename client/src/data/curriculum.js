// Master Curriculum for Vietnam Primary School Math (Grade 1 to Grade 5)
// 5 Grades. Số chương mỗi lớp: 10, 14, 16, 6, 5 = **51 tổng**.
// (Lớp 1, Lớp 2 và Lớp 3 đã dựng lại theo đúng số chủ đề của SGK — xem `docs/curriculum_audit.md`.)
// Đo bằng `node scratch/inspect_content_shape.mjs`.
//
// ══════════════════════════════════════════════════════════════════════════════
// 🔴 GIAI ĐOẠN 3, LÁT 3d — DỮ LIỆU KHÔNG CÒN NẰM TRONG FILE NÀY
//
// Trước đây file này import 5 file `gradeNData.js` rồi tra cứu trên mảng đó. Giờ nó
// hỏi `contentSource.js`, và chỗ đó quyết định lấy từ đâu:
//
//     cache localStorage  ->  DB (nếu `content_source = "remote"`)  ->  file tĩnh
//
// ⚠️ BỐN HÀM DƯỚI ĐÂY GIỮ NGUYÊN CHỮ KÝ (vẫn ĐỒNG BỘ, cùng tham số, cùng kiểu trả
// về). Đó là chủ ý: 5 màn hình đang gọi chúng, đổi sang `async` là phải sửa cả 5 —
// mà sửa 5 màn hình cùng lúc với việc đổi nguồn dữ liệu là hai thay đổi rủi ro
// chồng lên nhau. Giữ đồng bộ được vì cache đã được đọc NGAY lúc nạp module.
//
// ⚠️ KHÔNG import `gradeNData.js` ở đây nữa — chúng nằm trong `contentSource.js` với
// vai trò lưới an toàn cuối cùng. Import ở cả hai chỗ là hai nguồn sự thật cho cùng
// một thứ, và app sẽ đọc một nguồn trong khi bạn đi sửa nguồn còn lại.
// ══════════════════════════════════════════════════════════════════════════════
import { layGrades } from "./contentSource.js";

/**
 * `grades` là GETTER, không phải mảng chụp sẵn.
 * Nếu gán `curriculum.grades = [...]` một lần lúc nạp module thì khi nguồn đổi, mọi
 * chỗ đọc `curriculum.grades` vẫn thấy mảng CŨ — mà đó là 5 màn hình.
 */
const curriculum = {
  get grades() {
    return layGrades();
  },
};

export default curriculum;

// Helper functions
export function getGrade(gradeId) {
  return layGrades().find((g) => g.id === Number(gradeId));
}

export function getChapter(gradeId, chapterId) {
  const grade = getGrade(gradeId);
  return grade?.chapters.find((c) => c.id === chapterId);
}

export function getLesson(gradeId, chapterId, lessonId) {
  const chapter = getChapter(gradeId, chapterId);
  return chapter?.lessons.find((l) => l.id === lessonId);
}

export function findLessonById(lessonId) {
  for (const grade of layGrades()) {
    for (const chapter of grade.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { lesson, chapter, grade };
      }
    }
  }
  return null;
}

/**
 * Tập mã các bài CÓ THẬT trong cây đang dùng.
 *
 * 🔴 VÌ SAO CẦN HÀM NÀY. `completedLessons` trong máy bé là sổ **chỉ-thêm**: bài bị
 * rút hoặc bị xoá thẳng trong DB **không** bị gạch khỏi sổ. Đó là chủ ý — bé không
 * được mất sao vì một thao tác của người lớn, và bài có thể được tạo lại với đúng mã
 * cũ. Nhưng hệ quả là **khi đếm phải đối chiếu với cây hiện tại**, nếu không phụ
 * huynh sẽ thấy những con số không thể đúng: "đã học 13 bài" trong khi chương trình
 * chỉ còn 12 bài, hay chương đang hoàn thành tự nhiên mất dấu ✅.
 */
export function tapMaBaiHoc() {
  const ma = new Set();
  for (const grade of layGrades())
    for (const chapter of grade.chapters)
      for (const lesson of chapter.lessons) ma.add(lesson.id);
  return ma;
}

/**
 * Đếm bài đã học **còn tồn tại** trong chương trình + tổng sao của chúng.
 *
 * @param completedLessons `{ 'g1-c1-l1': { stars, completedAt } }` từ `useProgressStore`
 * @returns {{ soBai: number, soSao: number }}
 */
export function demBaiDaHoc(completedLessons) {
  const ma = tapMaBaiHoc();
  let soBai = 0;
  let soSao = 0;
  for (const [id, duLieu] of Object.entries(completedLessons ?? {})) {
    if (!ma.has(id)) continue; // bài đã bị xoá khỏi DB
    soBai++;
    soSao += duLieu?.stars || 0;
  }
  return { soBai, soSao };
}
