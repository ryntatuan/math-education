/**
 * Dựng cây giáo trình (Lớp → Chương → Bài) từ các dòng DB — Giai đoạn 3, lát 3d.
 *
 * File THUẦN: không `import`, không `import.meta.env`, không gọi mạng. Nhờ vậy cổng
 * `S-24` `import()` được nó trong Node và thử **thật**: lấy chính 5 file tĩnh, trải
 * chúng ra thành đúng hình dạng dòng DB, rồi dựng lại cây và so với cây gốc.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * 🔴 VÌ SAO PHẢI SO KHỚP HÌNH DẠNG, KHÔNG CHỈ "CHẠY ĐƯỢC"
 *
 * Giao diện đang đọc những trường này (đo bằng `scratch/print_tree_shape.mjs`):
 *   grade   : id · name · description · icon · color · ageRange · chapters
 *   chapter : id · name · description · icon · color · lessons   (BỎ totalLessons)
 *   lesson  : id · title · type · description · slides
 *
 * Cây dựng từ DB mà thiếu một trường thì **không có lỗi nào hiện ra** — chỉ là chỗ
 * đó hiện `undefined`. Ví dụ thật: `ParentDashboard` in `{gr.name} ({gr.ageRange})`,
 * nên thiếu `ageRange` là phụ huynh thấy `Lớp 1 ()`. Đó là lý do có migration
 * `0010` thêm cột `age_range` — chứ không phải vì thích thêm cột.
 * ══════════════════════════════════════════════════════════════════════════════
 */

/**
 * @param {Array} gradeRows   dòng `content_grades`
 * @param {Array} chapterRows dòng `content_chapters`
 * @param {Array} lessonRows  dòng `content_lessons` (CÓ `payload`)
 * @returns {Array} cây đúng hình dạng `client/src/data/gradeNData.js`
 */
export function dungCay(gradeRows, chapterRows, lessonRows) {
  const baiTheoChuong = new Map();
  for (const l of lessonRows ?? []) {
    if (!baiTheoChuong.has(l.chapter_id)) baiTheoChuong.set(l.chapter_id, []);
    baiTheoChuong.get(l.chapter_id).push({
      id: l.id,
      title: l.title,
      // DB gọi là `lesson_type`; giao diện đọc `type` (đo được: 362/362 bài tĩnh
      // đều có `type`, và cả 362 bài tĩnh đều là "learn").
      type: l.lesson_type ?? "learn",
      description: l.description ?? "",
      slides: l.payload?.slides ?? [],
    });
  }

  const chuongTheoLop = new Map();
  for (const c of chapterRows ?? []) {
    if (!chuongTheoLop.has(c.grade_id)) chuongTheoLop.set(c.grade_id, []);
    chuongTheoLop.get(c.grade_id).push({
      id: c.id,
      name: c.name,
      description: c.description ?? "",
      icon: c.icon ?? null,
      color: c.color ?? null,
      // 🔴 KHÔNG có `totalLessons`. Bảng `content_chapters` cố ý không có cột đó:
      // file tĩnh khai sai 5 chương (xem `TC-3a.5`). Số bài phải ĐẾM TỪ dữ liệu.
      // Giao diện đã viết `chapter.lessons?.length || chapter.totalLessons` nên
      // `lessons.length` luôn thắng — bỏ hẳn trường đó là an toàn.
      lessons: baiTheoChuong.get(c.id) ?? [],
    });
  }

  return (gradeRows ?? []).map((g) => ({
    id: g.id,
    name: g.name,
    description: g.description ?? "",
    icon: g.icon ?? null,
    color: g.color ?? null,
    // Cột `age_range` — xem ghi chú đầu file về lý do nó tồn tại.
    ageRange: g.age_range ?? null,
    chapters: chuongTheoLop.get(g.id) ?? [],
  }));
}

/** Cây này có dùng được không? Chỉ cần đủ khung tối thiểu. */
export function cayHopLe(grades) {
  return (
    Array.isArray(grades) &&
    grades.length > 0 &&
    grades.every(
      (g) =>
        g &&
        typeof g.id === "number" &&
        typeof g.name === "string" &&
        Array.isArray(g.chapters),
    )
  );
}

/**
 * Đếm nhanh để hiện trong log/kiểm tra. Cố ý đếm TỪ dữ liệu, không đọc một con số
 * đã lưu — cùng bài học với việc bỏ `totalLessons`.
 */
export function demCay(grades) {
  let chuong = 0;
  let bai = 0;
  let slide = 0;
  for (const g of grades ?? [])
    for (const c of g.chapters ?? []) {
      chuong++;
      for (const l of c.lessons ?? []) {
        bai++;
        slide += l.slides?.length ?? 0;
      }
    }
  return { lop: grades?.length ?? 0, chuong, bai, slide };
}
