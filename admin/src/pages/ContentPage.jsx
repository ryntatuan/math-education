import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import LessonEditor from "../components/LessonEditor";

/**
 * Cây giáo trình Lớp → Chương → Bài — Giai đoạn 3, lát 3b. **CHỈ ĐỌC.**
 *
 * Không có cấp "Học Kỳ": dữ liệu thật chỉ có 5 lớp · 51 chương · 459 bài. Thêm một
 * cấp không tồn tại là bịa ra cấu trúc rồi phải tự điền vào chỗ trống.
 *
 * ⚠️ VÌ SAO ĐỌC TỪ DB CHỨ KHÔNG ĐỌC FILE TĨNH:
 * Lát 3a đã đưa nội dung lên DB, và ở lát 3d app của bé sẽ đọc từ đó. Nên màn hình
 * này phải hiện ĐÚNG thứ đang nằm trong DB. Nếu hiện file tĩnh thì hai nguồn có thể
 * lệch nhau mà không ai biết — đúng cái rủi ro mà GĐ 3 đang cố xử lý.
 *
 * ⚠️ KHÔNG tải `payload` cho cả 362 bài: payload là toàn bộ slide, tổng cộng ~800 KB.
 * Cây chỉ cần id/tiêu đề/trạng thái. `payload` tải riêng khi bấm vào một bài — màn
 * hình vẫn chạy được trên 4G, mà code cũng chẳng thêm bao nhiêu.
 */

// Trích một đoạn ngắn để nhìn là biết slide nói gì.
//
// Chọn khoá theo TỪNG KIỂU, không dùng một thứ tự chung cho mọi kiểu — vì cùng một
// khoá có ý nghĩa khác nhau ở mỗi kiểu. Quan sát trên dữ liệu thật:
//   story, visual    → `text` là câu chữ chính
//   quiz, dialogue   → `question` là câu hỏi
//   concept          → `title` là tên khái niệm ("Nhận diện khối lập phương") — đọc được
//   summary          → 🔴 `title` chỉ là NHÃN ("Ghi nhớ:"), vô nghĩa để xem trước.
//                       Thứ đáng xem là `points` — những điều cần nhớ.
//
// Đã mắc đúng lỗi này: bản đầu dùng chung một thứ tự khoá nên slide `summary` hiện
// ra đúng hai chữ "Ghi nhớ:" — trông như dữ liệu hỏng, mà thật ra là hiển thị sai chỗ.
const KHOA_XEM_TRUOC = {
  story: ["text"],
  visual: ["text"],
  quiz: ["question"],
  dialogue: ["question"],
  concept: ["title", "explanation"],
  summary: ["points", "title"],
};

const trichDoan = (slide) => {
  const c = slide?.content ?? {};
  const ds = KHOA_XEM_TRUOC[slide?.type] ?? ["text", "title", "question"];

  for (const k of ds) {
    const v = c[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    // `points` là MẢNG. Lấy ý đầu, và nói luôn là còn nữa — để không ai tưởng
    // slide chỉ có một ý.
    if (Array.isArray(v)) {
      const i = v.findIndex((x) => typeof x === "string" && x.trim());
      if (i >= 0) {
        const con =
          v.filter((x) => typeof x === "string" && x.trim()).length - 1;
        return con > 0 ? `${v[i].trim()} (+${con} ý nữa)` : v[i].trim();
      }
    }
  }
  return null;
};

const TONE_TRANG_THAI = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  draft: "border-amber-200 bg-amber-50 text-amber-700",
};

const LOAI_SLIDE = {
  quiz: "Câu hỏi",
  story: "Kể chuyện",
  summary: "Ghi nhớ",
  concept: "Khái niệm",
  visual: "Hình ảnh",
  dialogue: "Hội thoại",
};

// `m-auto` để thông báo nằm GIỮA khung chi tiết. Khung đó cao bằng cây giáo trình
// (xem giải thích ở phần render), nên nếu không căn giữa thì chữ dồn lên trên và
// phần dưới thành một khoảng trắng lớn vô nghĩa.
function Empty({ children }) {
  return (
    <div className="m-auto px-5 py-10 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

/**
 * Cụm chữ phải gõ đúng mới bật được nút xoá.
 *
 * 🔴 VÌ SAO GÕ CHỮ MÀ KHÔNG PHẢI `window.confirm`: một hộp thoại "OK / Huỷ" thì
 * người dùng bấm OK theo phản xạ — nó bảo vệ được chuyện bấm hụt, không bảo vệ
 * được chuyện bấm ấu. Phải GÕ thì người ta buộc đọc câu hỏi. Cụm chữ để bằng tiếng
 * Anh một cách cố ý: nó KHÔNG giống bất kỳ nhãn nào trong app, nên không thể gõ ra
 * do đang bấm lụi — còn tiếng Việt thì sẽ giống nhãn nút ("Xoá bài này") và mất tác dụng.
 */
const CHU_XAC_NHAN_XOA = "delete this lesson";

/**
 * Hộp xác nhận xoá MỘT BÀI. Không dùng cho chương — cố ý, xem `F1`.
 *
 * `soLuotLam` là số lượt làm bài của bé đang trỏ tới bài này. Nó KHÔNG chặn việc
 * xoá (người dùng đã yêu cầu xoá được), nhưng phải nói ra để người xoá biết mình
 * đang xoá một bài đã có người học, và biết rằng **lịch sử đó vẫn được giữ**.
 */
function XoaBaiDialog({
  bai,
  soLuotLam,
  soTicket,
  onClose,
  onConfirm,
  busy,
  loi,
}) {
  const [go, setGo] = useState("");
  const dungChu = go.trim() === CHU_XAC_NHAN_XOA;

  // Esc để đóng. Không đóng khi đang xoá (nút đang chạy) — tránh vừa gọi RPC vừa tháo UI.
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, busy]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-900">
          🗑️ Xoá vĩnh viễn bài học
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          <strong className="text-slate-900">{bai.title}</strong>
          <br />
          <span className="font-mono text-xs text-slate-400">{bai.id}</span>
          {" · "}
          {bai.status === "published" ? "đang cho bé thấy" : "bản nháp"}
        </p>

        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          <p>
            <strong>Không hoàn tác được.</strong> Bản nháp và lịch sử phiên bản
            của bài này bị xoá theo. Mã bài có thể bị dùng lại cho một bài khác
            sau này.
          </p>
          {(soLuotLam > 0 || soTicket > 0) && (
            <p className="mt-1">
              Bài này đang được lịch sử trỏ tới:{" "}
              {soLuotLam > 0 && <strong>{soLuotLam} lượt làm bài</strong>}
              {soLuotLam > 0 && soTicket > 0 && " và "}
              {soTicket > 0 && <strong>{soTicket} báo lỗi câu hỏi</strong>}.
              Lịch sử đó
              <strong> vẫn được giữ nguyên</strong>, chỉ là nó sẽ trỏ tới một mã
              bài không còn tồn tại.
            </p>
          )}
          {bai.status === "published" && (
            <p className="mt-1">
              Bài đang được xuất bản nên sau khi xoá, app của bé sẽ tự bỏ bài
              này khi mở lại (số phiên bản nội dung tăng tự động).
            </p>
          )}
          <p className="mt-1">
            Muốn bài biến mất khỏi mắt bé mà vẫn giữ nội dung để sửa lại sau:
            dùng <strong>Rút bài</strong> (về bản nháp) thay vì xoá.
          </p>
        </div>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Để xác nhận, gõ đúng cụm:{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-700">
            {CHU_XAC_NHAN_XOA}
          </code>
        </label>
        <input
          autoFocus
          value={go}
          onChange={(e) => setGo(e.target.value)}
          placeholder={CHU_XAC_NHAN_XOA}
          spellCheck={false}
          autoComplete="off"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
        />
        {go.length > 0 && !dungChu && (
          <p className="mt-1 text-xs text-slate-500">
            Chưa khớp — phải đúng từng ký tự, kể cả chữ hoa chữ thường.
          </p>
        )}

        {loi && (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {loi}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Huỷ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!dungChu || busy}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {busy ? "Đang xoá…" : "Xoá vĩnh viễn"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  const [grades, setGrades] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [moGrade, setMoGrade] = useState(() => new Set());
  const [moChuong, setMoChuong] = useState(() => new Set());
  const [dangChon, setDangChon] = useState(null);
  const [chiTiet, setChiTiet] = useState(null);
  const [tim, setTim] = useState("");
  // Hai số đếm TÁCH RIÊNG, không dùng chung một số:
  //   • `phienCay`    — tăng sau mỗi lần ghi: tiêu đề, nhãn `nháp`, số đếm phải đọc lại.
  //   • `phienChiTiet`— chỉ tăng khi ĐÓNG trình sửa.
  // Gộp làm một thì mỗi lần publish, khung chi tiết sẽ nhảy về trạng thái "Đang tải
  // bài…" ⇒ trình sửa bị THÁO RA rồi dựng lại ⇒ mất thông báo vừa hiện và mất chỗ
  // đang đứng. Lỗi này đã mắc ở lát 2c với `admin_audit_log` (sửa xong mà số vẫn cũ).
  const [phienCay, setPhienCay] = useState(0);
  const [phienChiTiet, setPhienChiTiet] = useState(0);

  // Đang mở trình sửa cho bài nào (null = đang xem) —
  // 🔴 Gắn với `dangChon`: đổi bài khác thì tự đóng trình sửa, không thể sửa bài A
  // mà lại bấm Lưu cho bài B.
  const [dangSuaBai, setDangSuaBai] = useState(null);

  // ── Tạo bài học mới ──
  //   `creatingIn` = mã CHƯƠNG đang mở form (null = không mở form nào). Không dùng
  //   boolean vì form phải biết mình thuộc chương nào để gửi đúng `p_chapter_id`.
  const [creatingIn, setCreatingIn] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // ── Xoá bài học (có chốt gõ chữ) ──
  //   `xoaBai`  = bài đang mở hộp xác nhận (null = không mở hộp nào)
  //   `lienQuan`= số lượt làm bài / số báo lỗi đang trỏ tới bài đó (chỉ để CẢNH BÁO)
  //   `vuaXoa`  = mã bài vừa xoá xong, để nói cho người dùng biết đã xong (nếu không
  //               thì khung chi tiết chỉ trở về trạng thái rỗng, trông như bấm hụt)
  const [xoaBai, setXoaBai] = useState(null);
  const [lienQuan, setLienQuan] = useState({ luotLam: 0, ticket: 0 });
  const [dangXoa, setDangXoa] = useState(false);
  const [loiXoa, setLoiXoa] = useState(null);
  const [vuaXoa, setVuaXoa] = useState(null);

  // ── Tải cây (không có payload) ──
  useEffect(() => {
    let huy = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [g, c, l] = await Promise.all([
          supabase
            .from("content_grades")
            .select("id,name,description,icon,color,sort_order")
            .order("sort_order"),
          supabase
            .from("content_chapters")
            .select("id,grade_id,name,icon,sort_order")
            .order("sort_order"),
          supabase
            .from("content_lessons")
            .select("id,chapter_id,title,lesson_type,status,sort_order")
            .order("sort_order"),
        ]);
        const loi = g.error || c.error || l.error;
        if (loi) throw new Error(loi.message);
        if (huy) return;
        setGrades(g.data ?? []);
        setChapters(c.data ?? []);
        setLessons(l.data ?? []);
        // Mở sẵn lớp đầu để màn hình không trông như rỗng.
        if (g.data?.length) setMoGrade(new Set([g.data[0].id]));
      } catch (e) {
        if (!huy) setError(e.message);
      } finally {
        if (!huy) setLoading(false);
      }
    })();
    return () => {
      huy = true;
    };
  }, [phienCay]);

  const chuongTheoLop = useMemo(() => {
    const m = new Map();
    for (const c of chapters) {
      if (!m.has(c.grade_id)) m.set(c.grade_id, []);
      m.get(c.grade_id).push(c);
    }
    return m;
  }, [chapters]);

  const baiTheoChuong = useMemo(() => {
    const m = new Map();
    for (const l of lessons) {
      if (!m.has(l.chapter_id)) m.set(l.chapter_id, []);
      m.get(l.chapter_id).push(l);
    }
    return m;
  }, [lessons]);

  // ── Tìm kiếm ──
  // Có 362 bài nên không tìm được thì phải bấm rất nhiều. Khi đang tìm, mở hết
  // nhánh còn kết quả và ẩn nhánh không có — thay vì bắt người dùng tự mở.
  const tuKhoa = tim.trim().toLowerCase();
  const dangTim = tuKhoa.length > 0;

  const baiHienThi = useMemo(() => {
    if (!dangTim) return null; // null = không lọc
    const khop = (l, tenChuong) =>
      l.id.toLowerCase().includes(tuKhoa) ||
      l.title.toLowerCase().includes(tuKhoa) ||
      (tenChuong ?? "").toLowerCase().includes(tuKhoa);
    const m = new Map();
    for (const c of chapters) {
      const ds = (baiTheoChuong.get(c.id) ?? []).filter((l) => khop(l, c.name));
      if (ds.length) m.set(c.id, ds);
    }
    return m;
  }, [dangTim, tuKhoa, chapters, baiTheoChuong]);

  const tongKhop = useMemo(
    () =>
      baiHienThi
        ? [...baiHienThi.values()].reduce((s, d) => s + d.length, 0)
        : 0,
    [baiHienThi],
  );

  const soBaiCuaChuong = (chapterId) =>
    dangTim
      ? (baiHienThi.get(chapterId)?.length ?? 0)
      : (baiTheoChuong.get(chapterId)?.length ?? 0);

  const soBaiCuaLop = (gradeId) =>
    (chuongTheoLop.get(gradeId) ?? []).reduce(
      (s, c) => s + soBaiCuaChuong(c.id),
      0,
    );

  // Khi đang tìm, số chương cũng phải là số chương CÓ KẾT QUẢ — nếu không thì nhãn
  // đọc "10 ch · 2 bài": số chương chưa lọc còn số bài đã lọc, hai con số khác hệ
  // quy chiếu nên trông như mâu thuẫn.
  const soChuongHienThi = (gradeId) => {
    const ds = chuongTheoLop.get(gradeId) ?? [];
    if (!dangTim) return ds.length;
    return ds.filter((c) => (baiHienThi.get(c.id)?.length ?? 0) > 0).length;
  };

  const soNhap = lessons.filter((l) => l.status !== "published").length;

  /**
   * Tạo bài học mới trong một chương.
   *
   * 🔴 Gọi HÀM SQL `create_lesson`, không `.insert()` thẳng: mã bài (`g1-c1-l13`) phải
   *    sinh ở MỘT chỗ, cùng transaction với việc chèn — nếu không thì hai người cùng
   *    bấm "Tạo" một lúc sẽ ra hai mã trùng nhau. Hàm cũng ghi vết kiểm toán luôn.
   *    Cổng `S-22` cấm Admin ghi thẳng vào bảng nội dung.
   *
   * Sau khi tạo: đọc lại cây (để thấy bài mới + nhãn `nháp`) rồi MỞ LUÔN trình sửa —
   * bài mới chỉ có 1 slide giữ chỗ, việc tiếp theo luôn là thêm slide. Bắt người dùng
   * tự bấm thêm 2 lần nữa là vô nghĩa.
   */
  const createLesson = async (chapterId) => {
    const title = newTitle.trim();
    if (!title || creating) return;

    setCreating(true);
    setCreateError(null);
    try {
      const { data: newId, error: loi } = await supabase.rpc("create_lesson", {
        p_chapter_id: chapterId,
        p_title: title,
      });
      if (loi) throw new Error(loi.message);

      setCreatingIn(null);
      setNewTitle("");
      setPhienCay((p) => p + 1);
      setMoChuong((s) => new Set(s).add(chapterId));
      setDangChon(newId);
      setDangSuaBai(newId);
    } catch (e) {
      setCreateError(e.message);
    } finally {
      setCreating(false);
    }
  };

  /**
   * Mở hộp xác nhận xoá cho MỘT bài (không áp cho chương — cố ý).
   *
   * Kèm việc đếm số dòng đang trỏ tới bài này CHỈ ĐỂ CẢNH BÁO: người dùng đã yêu cầu
   * xoá được, nên đây không phải chốt chặn. Nhưng nếu bài đã có bé làm mà hộp thoại
   * im lặng, người xoá sẽ không biết mình vừa xoá một bài có lịch sử.
   * Đếm hỏng thì thôi (2 con số 0) — không để việc phụ này chặn việc chính.
   */
  const moXoaBai = async (bai) => {
    setXoaBai(bai);
    setLoiXoa(null);
    setLienQuan({ luotLam: 0, ticket: 0 });
    try {
      const [a, b] = await Promise.all([
        supabase
          .from("question_attempts")
          .select("id", { count: "exact", head: true })
          .eq("lesson_id", bai.id),
        supabase
          .from("support_tickets")
          .select("id", { count: "exact", head: true })
          .eq("lesson_id", bai.id),
      ]);
      setLienQuan({ luotLam: a.count ?? 0, ticket: b.count ?? 0 });
    } catch {
      /* chỉ là cảnh báo — không có số vẫn xoá được */
    }
  };

  /**
   * Xoá thật. Đi qua hàm SQL `delete_lesson`, KHÔNG `.delete()` từ trình duyệt —
   * cổng `S-22` cấm trang Admin ghi thẳng vào bảng nội dung, và hàm SQL mới là chỗ
   * có `is_admin()` + `REVOKE … FROM anon`.
   *
   * Việc tăng `content_version` và ghi vết `lesson.delete` do trigger `0014` lo, trong
   * cùng transaction ⇒ ở đây KHÔNG ghi vết nữa (nếu không mỗi lần xoá có 2 dòng trùng).
   *
   * `P0002` (không có bài học) là ca "bài vừa bị xoá ở chỗ khác" — đóng hộp thoại và
   * tải lại cây, không phải lỗi của người dùng.
   */
  const xoaBaiHoc = async () => {
    if (!xoaBai || dangXoa) return;
    setDangXoa(true);
    setLoiXoa(null);
    try {
      const { error: loi } = await supabase.rpc("delete_lesson", {
        p_lesson_id: xoaBai.id,
      });
      if (loi) throw new Error(loi.message);

      const maDaXoa = xoaBai.id;
      setXoaBai(null);
      setDangSuaBai(null);
      setDangChon(null);
      setChiTiet(null);
      setVuaXoa(maDaXoa);
      setPhienCay((p) => p + 1); // bài biến mất khỏi cây, số đếm phải đọc lại
    } catch (e) {
      const thongBao = e.message ?? "";
      const khongCon = /không có bài học/i.test(thongBao);
      // 🔴 Chưa chạy `0015` thì PostgREST trả `PGRST202 Could not find the function …`.
      // Chuỗi đó không nói cho người dùng biết phải làm gì — mà đây lại là lỗi CÀI ĐẶT,
      // gặp đúng một lần ở mỗi môi trường. Nói thẳng tên file cần chạy.
      const thieuHam = /could not find the function|schema cache/i.test(
        thongBao,
      );
      if (khongCon) {
        // Không còn thật ⇒ đóng hộp thoại, tải lại cây cho khớp DB.
        setXoaBai(null);
        setDangSuaBai(null);
        setDangChon(null);
        setChiTiet(null);
        setVuaXoa(null);
        setPhienCay((p) => p + 1);
      } else if (thieuHam) {
        setLoiXoa(
          "Chưa chạy migration `0015_xoa_bai_hoc_tu_giao_dien.sql` trong Supabase SQL Editor — hàm `delete_lesson` chưa có trong DB nên chưa xoá được.",
        );
      } else {
        setLoiXoa(thongBao || "Không xoá được bài này");
      }
    } finally {
      setDangXoa(false);
    }
  };

  // ── Tải chi tiết khi chọn bài ──
  useEffect(() => {
    // Không chọn gì thì không có gì để tải. Không cần `setChiTiet(null)` ở đây:
    // phần render đã chặn bằng `!dangChon` rồi nên chi tiết cũ không bao giờ hiện
    // ra, mà setState thẳng trong effect thì lại sinh thêm một vòng render vô ích.
    if (!dangChon) return;
    let huy = false;
    setChiTiet({ dangTai: true });
    supabase
      .from("content_lessons")
      .select(
        "id,title,lesson_type,status,description,published_at,payload,chapter_id",
      )
      .eq("id", dangChon)
      // 🔴 `maybeSingle` chứ KHÔNG `single`: bài có thể đã bị XOÁ THẲNG TRONG DB
      //    (SQL Editor) trong lúc trang này đang mở. `single` coi "0 dòng" là LỖI
      //    HTTP 406 và trả về `PGRST116 … The result contains 0 rows` — người dùng
      //    đọc thấy một lỗi kỹ thuật, còn cây bên trái vẫn hiện bài đã không còn
      //    tồn tại. Không sập, nhưng sai và khó hiểu.
      .maybeSingle()
      .then(({ data, error: loi }) => {
        if (huy) return;
        if (loi) return setChiTiet({ loi: loi.message });
        if (!data) {
          // Không còn dòng nào trong DB ⇒ đừng hiện "Không đọc được bài…". Đóng
          // trình sửa (nếu đang mở), GIỮ `dangChon` để câu giải thích hiện ra đúng
          // chỗ người dùng đang nhìn, rồi tải lại cây cho bài biến mất khỏi danh sách.
          setDangSuaBai(null);
          setChiTiet({ khongCon: true, id: dangChon });
          setPhienCay((p) => p + 1);
          return;
        }
        setChiTiet(data);
      });
    return () => {
      huy = true;
    };
  }, [dangChon, phienChiTiet]);

  const doiMo = (setter, id) =>
    setter((cu) => {
      const moi = new Set(cu);
      if (moi.has(id)) moi.delete(id);
      else moi.add(id);
      return moi;
    });

  return (
    // `lg:h-dvh` — chiều cao XÁC ĐỊNH, không phải `min-h-dvh`. Đây là chỗ dễ sai
    // nhất của cả bố cục này, đã mắc đúng một lần:
    // `min-h` chỉ là mức SÀN, nên khi khung chi tiết cao lên (chọn bài có nhiều
    // slide) thì container cứ cao theo nội dung → lưới phình lên 1172px, khung chi
    // tiết KHÔNG tự cuộn mà đẩy cả trang dài ra (900 → 1308px). Muốn `flex-1` bên
    // trong chia được chỗ thì cha phải có chiều cao xác định.
    <div className="flex flex-col p-4 sm:p-6 lg:h-dvh lg:p-8 2xl:p-10">
      {/* Số liệu nằm cùng hàng với tiêu đề chứ không chiếm một khung riêng — khung
          riêng tốn thêm ~62px chiều cao mà chẳng nói thêm gì. */}
      <header className="mb-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-slate-900">
            Nội dung bài học
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Cây giáo trình đọc trực tiếp từ DB — đúng thứ app của bé sẽ nhận khi
            bật đọc từ DB.
          </p>{" "}
        </div>

        {/* Chỉ đọc: nói thẳng ra để không ai đi tìm nút sửa. */}
        <div className="shrink-0 text-sm text-slate-600 sm:text-right">
          {loading ? (
            "Đang tải…"
          ) : (
            <>
              <strong className="text-slate-900">{grades.length}</strong> lớp ·{" "}
              <strong className="text-slate-900">{chapters.length}</strong>{" "}
              chương ·{" "}
              <strong className="text-slate-900">{lessons.length}</strong> bài
              {soNhap > 0 && (
                <>
                  {" · "}
                  <span className="font-medium text-amber-700">
                    {soNhap} bài chưa publish
                  </span>
                </>
              )}
              <div className="mt-0.5 text-xs text-slate-400">
                Bấm một bài rồi bấm <strong>Sửa bài này</strong> để vào trình
                sửa
              </div>
            </>
          )}
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Không đọc được nội dung: {error}
        </div>
      )}

      {/* `grid-cols-1` ở đây không phải cho đẹp. Khi không khai báo cột nào, grid mặc
          định là MỘT cột `auto` và bị chặn dưới bởi min-content. Tên chương dài (vd
          "Chủ đề 6: Làm quen với một số hình phẳng & Đo độ dài") cộng với `truncate`
          (= nowrap) đẩy min-content lên ~485px, nên ở màn 375px cột rộng 485px và
          phải cuộn ngang. `grid-cols-1` = minmax(0,1fr) mới cho cột co lại được. */}
      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
        {/* ── Cây ── */}
        <section className="min-w-0 rounded-xl border border-slate-200 bg-white lg:flex lg:min-h-0 lg:flex-col">
          <div className="border-b border-slate-100 p-3">
            <input
              value={tim}
              onChange={(e) => setTim(e.target.value)}
              placeholder="Tìm bài theo tên, mã bài, tên chương…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {dangTim && (
              <p className="mt-2 text-xs text-slate-500">
                {tongKhop === 0
                  ? "Không có bài nào khớp từ khoá này."
                  : `${tongKhop} bài khớp · tự mở hết nhánh có kết quả`}
              </p>
            )}
          </div>

          {/* `lg:flex-1` + `min-h-0` để cây tự cao đầy chỗ còn lại và TỰ CUỘN bên
              trong, thay cho mức trần cứng 32rem cũ. Có 362 bài nên cây càng cao
              càng đỡ phải cuộn. Móbi thì ngược lại: `max-h-[60vh]` để cây không
              đẩy cả trang dài ra. */}
          <div className="max-h-[60vh] overflow-y-auto p-2 lg:max-h-none lg:min-h-0 lg:flex-1">
            {loading ? (
              <Empty>Đang tải…</Empty>
            ) : grades.length === 0 ? (
              <Empty>
                Chưa có lớp nào trong DB.
                <br />
                <span className="text-xs">
                  Chạy <code>0008_content_schema.sql</code> rồi dán các file
                  trong <code>supabase/content-seed/</code>, sau đó chạy{" "}
                  <code>node scripts/migrate-content.mjs --verify</code>.
                </span>
              </Empty>
            ) : (
              grades.map((g) => {
                const dsChuong = chuongTheoLop.get(g.id) ?? [];
                const mo = dangTim || moGrade.has(g.id);
                const soBai = soBaiCuaLop(g.id);
                if (dangTim && soBai === 0) return null;

                return (
                  <div key={g.id} className="mb-0.5">
                    <button
                      type="button"
                      onClick={() => doiMo(setMoGrade, g.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition hover:bg-slate-50"
                    >
                      <span className="w-3 shrink-0 text-slate-400">
                        {mo ? "▾" : "▸"}
                      </span>
                      <span className="shrink-0">{g.icon}</span>
                      {/* KHÔNG dùng `truncate`: tên lớp dài nhất trong DB là 75 ký tự,
                          cắt bằng `…` là mất nội dung. Cho xuống dòng thay vì cắt. */}
                      <span className="min-w-0 font-semibold text-slate-800">
                        {g.name}
                      </span>
                      <span className="ml-auto shrink-0 text-xs text-slate-400">
                        {soChuongHienThi(g.id)} ch · {soBai} bài
                      </span>
                    </button>

                    {mo &&
                      dsChuong.map((c) => {
                        const dsBai = dangTim
                          ? (baiHienThi.get(c.id) ?? [])
                          : (baiTheoChuong.get(c.id) ?? []);
                        if (dangTim && dsBai.length === 0) return null;
                        const moC = dangTim || moChuong.has(c.id);

                        return (
                          <div key={c.id}>
                            <button
                              type="button"
                              onClick={() => doiMo(setMoChuong, c.id)}
                              className="flex w-full items-center gap-2 rounded-lg py-1.5 pr-2 pl-6 text-left text-sm transition hover:bg-slate-50"
                            >
                              <span className="w-3 shrink-0 text-slate-400">
                                {moC ? "▾" : "▸"}
                              </span>
                              <span className="min-w-0 text-slate-600">
                                {c.name}
                              </span>
                              <span className="ml-auto shrink-0 text-xs text-slate-400">
                                {dsBai.length}
                              </span>
                            </button>

                            {moC && (
                              <ul className="mb-1 ml-9 space-y-0.5">
                                {dsBai.map((l) => (
                                  <li key={l.id}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setDangChon(l.id);
                                        // Dọn thông báo \"vừa xoá bài …\" — nếu không nó
                                        // nằm lại và hiện lại mỗi lần bỏ chọn bài.
                                        setVuaXoa(null);
                                      }}
                                      className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                                        dangChon === l.id
                                          ? "bg-indigo-50 text-indigo-900"
                                          : "hover:bg-slate-50"
                                      }`}
                                    >
                                      <span className="min-w-0 flex-1">
                                        <span className="block">{l.title}</span>
                                        {/* Hiện mã bài vì màn hình Báo lỗi câu hỏi
                                            cũng ghi mã này — cần đối chiếu được. */}
                                        <span className="block font-mono text-[10px] text-slate-400">
                                          {l.id}
                                        </span>
                                      </span>
                                      {l.status !== "published" && (
                                        <span className="mt-0.5 shrink-0 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                                          nháp
                                        </span>
                                      )}
                                    </button>
                                  </li>
                                ))}

                                {/* Thêm bài — form hiện ngay tại chỗ, không mở hộp thoại
                                    riêng: người dùng đang nhìn chương này rồi. */}
                                {!dangTim && (
                                  <li className="pt-1">
                                    {creatingIn === c.id ? (
                                      <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-2">
                                        <input
                                          autoFocus
                                          value={newTitle}
                                          onChange={(e) =>
                                            setNewTitle(e.target.value)
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                              createLesson(c.id);
                                            if (e.key === "Escape") {
                                              setCreatingIn(null);
                                              setNewTitle("");
                                              setCreateError(null);
                                            }
                                          }}
                                          placeholder="Tên bài mới, ví dụ: Bài 13: Luyện tập"
                                          className="w-full rounded border border-slate-300 px-2 py-1 text-sm"
                                        />
                                        {createError && (
                                          <p className="mt-1 text-xs text-red-600">
                                            {createError}
                                          </p>
                                        )}
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                          <button
                                            type="button"
                                            disabled={
                                              creating || !newTitle.trim()
                                            }
                                            onClick={() => createLesson(c.id)}
                                            className="rounded border border-indigo-600 bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                                          >
                                            {creating ? "Đang tạo…" : "Tạo bài"}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setCreatingIn(null);
                                              setNewTitle("");
                                              setCreateError(null);
                                            }}
                                            className="rounded px-2 py-1 text-xs text-slate-500 transition hover:text-slate-800"
                                          >
                                            Huỷ
                                          </button>
                                          <span className="text-[10px] text-slate-500">
                                            Bài mới ở trạng thái{" "}
                                            <strong>nháp</strong> — bé chưa thấy
                                            cho tới khi bấm Đăng.
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setCreatingIn(c.id);
                                          setNewTitle("");
                                          setCreateError(null);
                                        }}
                                        className="w-full rounded-lg px-2 py-1.5 text-left text-xs text-indigo-600 transition hover:bg-indigo-50"
                                      >
                                        ➕ Thêm bài học vào chương này
                                      </button>
                                    )}
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── Chi tiết (chỉ đọc) ── */}
        {/* `lg:overflow-y-auto` + `lg:min-h-0`: ở desktop khung này cao bằng cây,
            và phần thân tự cuộn — danh sách slide dài bao nhiêu cũng không đẩy
            trang dài ra. */}
        {/* 🔴 Nhánh cuối phải kèm `chiTiet?.id`. Nút "Tạo bài" đặt `dangChon` và
            `dangSuaBai` trong CÙNG một nhịp, còn chi tiết bài thì tải BẤT ĐỒNG BỘ — nên
            có một khung hình mà `chiTiet` vẫn là `null`. Mount `LessonEditor` lúc đó là
            crash ngay (`Cannot read properties of null (reading 'id')`) — lỗi THẬT, bắt
            được ở lần bấm tạo bài đầu tiên; trước đó chỉ bấm tới nút "Sửa bài này" (nút
            này chỉ hiện khi chi tiết đã tải xong) nên không ai gặp. Đợi có `id` rồi mới
            mount — trình sửa vẫn tự mở sau khi tải xong. */}
        <section className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white lg:min-h-0 lg:overflow-y-auto">
          {!dangChon ? (
            <Empty>
              {vuaXoa ? (
                // Xoá xong mà im lặng thì khung chi tiết chỉ trở về trạng thái rỗng —
                // người dùng không biết vừa thành công hay bấm hụt.
                <span className="text-emerald-700">
                  🗑️ Đã xoá bài <code className="font-mono">{vuaXoa}</code> khỏi
                  DB. Cây bên trái vừa được tải lại. Muốn hoàn tác thì phải tạo
                  bài mới — nội dung cũ đã mất.
                </span>
              ) : (
                "Chọn một bài ở cây bên trái để xem nội dung."
              )}
            </Empty>
          ) : chiTiet?.dangTai ? (
            <Empty>Đang tải bài…</Empty>
          ) : chiTiet?.khongCon ? (
            // Bài bị xoá thẳng trong DB trong lúc đang mở. Nói ĐÚNG chuyện đã xảy ra
            // thay vì để lộ lỗi `PGRST116 The result contains 0 rows` của PostgREST.
            <Empty>
              <div className="space-y-2">
                <p>
                  Bài <code>{chiTiet.id}</code> không còn trong DB — có thể vừa
                  bị xoá bằng SQL. Danh sách bên trái vừa được tải lại để khớp.
                </p>
                <p className="text-slate-500">
                  Nếu đang sửa dở bài này thì nội dung vừa gõ chưa được lưu.
                  Muốn gỡ một bài khỏi mắt bé mà vẫn giữ được nội dung, hãy dùng
                  <strong> Rút bài</strong> thay vì xoá.
                </p>
                <button
                  type="button"
                  onClick={() => setDangChon(null)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Đóng
                </button>
              </div>
            </Empty>
          ) : chiTiet?.loi ? (
            <Empty>Không đọc được bài: {chiTiet.loi}</Empty>
          ) : dangSuaBai === dangChon && chiTiet?.id ? (
            <LessonEditor
              chiTiet={chiTiet}
              onDong={() => {
                setDangSuaBai(null);
                setPhienChiTiet((p) => p + 1);
              }}
              onDaGhi={() => setPhienCay((p) => p + 1)}
            />
          ) : chiTiet ? (
            <div>
              <div className="border-b border-slate-100 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {chiTiet.title}
                  </h2>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      TONE_TRANG_THAI[chiTiet.status] ?? TONE_TRANG_THAI.draft
                    }`}
                  >
                    {chiTiet.status === "published" ? "Đã publish" : "Bản nháp"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-slate-400">
                  {chiTiet.id}
                </p>
                {chiTiet.description && (
                  <p className="mt-2 text-sm text-slate-600">
                    {chiTiet.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  {chiTiet.payload?.slides?.length ?? 0} slide
                  {chiTiet.published_at &&
                    ` · publish ${new Date(chiTiet.published_at).toLocaleDateString("vi-VN")}`}
                </p>

                <button
                  type="button"
                  onClick={() => setDangSuaBai(dangChon)}
                  className="mt-3 rounded-lg border border-indigo-600 bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  ✏️ Sửa bài này
                </button>

                {/* 🔴 Nút xoá nằm Ở ĐÂY (khung xem bài), không nằm trong trình sửa:
                    nó chỉ hiện khi đã tải xong chi tiết bài, nên không thể bấm nhầm
                    sang bài khác, và cũng không đụng gì tới đường sửa. */}
                <button
                  type="button"
                  onClick={() => moXoaBai(chiTiet)}
                  className="mt-3 ml-2 rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50"
                >
                  🗑️ Xoá bài này
                </button>
              </div>

              {/* Ở màn rất rộng (≥1536px) danh sách slide chia 2 cột cho khỏi phí chỗ —
                  cột đơn rộng 1800px thì mắt khó dò. `divide-y` không dùng được với
                  grid nên mỗi dòng tự có viền dưới. */}
              <ol className="2xl:grid 2xl:grid-cols-2 2xl:items-start">
                {(chiTiet.payload?.slides ?? []).map((s, i) => {
                  const doan = trichDoan(s);
                  return (
                    <li
                      key={i}
                      className="flex gap-3 border-b border-slate-50 px-4 py-3"
                    >
                      <span className="w-5 shrink-0 pt-0.5 text-right text-xs text-slate-400">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                          {LOAI_SLIDE[s.type] ?? s.type}
                        </span>
                        {doan ? (
                          <p className="mt-1 text-sm text-slate-700">{doan}</p>
                        ) : (
                          // Nói rõ thay vì để trống — slide không có đoạn chữ nào
                          // đọc được thì phải thấy ngay, đừng để nó trông bình thường.
                          <p className="mt-1 text-sm text-amber-700">
                            ⚠️ Không tìm thấy đoạn chữ nào để xem trước (kiểu{" "}
                            <code className="text-xs">{s.type}</code>)
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : null}
        </section>
      </div>

      {/* Hộp xác nhận xoá. Đặt CUỐI cây JSX để nó nằm trên mọi thứ về mặt thứ tự vẽ
          (dù `z-50` đã lo phần chồng lớp) — và để chỉ tồn tại khi thật sự cần. */}
      {xoaBai && (
        <XoaBaiDialog
          bai={xoaBai}
          soLuotLam={lienQuan.luotLam}
          soTicket={lienQuan.ticket}
          busy={dangXoa}
          loi={loiXoa}
          onClose={() => {
            if (dangXoa) return;
            setXoaBai(null);
            setLoiXoa(null);
          }}
          onConfirm={xoaBaiHoc}
        />
      )}
    </div>
  );
}
