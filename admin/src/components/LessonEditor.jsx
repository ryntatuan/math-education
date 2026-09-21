import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { SLIDE_TYPE_NAMES } from "../lib/contentSchema";
// 🔴 Nhãn tiếng Việt của 6 kiểu slide lấy từ `referenceData.js`, KHÔNG khai lại ở
// đây: trang Tham khảo (/reference) cũng đọc bảng đó. Hai bản chép tay thì thêm
// một kiểu slide là bản này quên là chắc — mà quên thì ô chọn hiện chữ tiếng Anh.
import { SLIDE_TYPE_LABELS as LOAI_SLIDE } from "../lib/referenceData";
import {
  DANG,
  baiTuDuLieu,
  boTruong,
  canhBaoRong,
  capNhatSlide,
  chuoiTuGiaTri,
  coThayDoi,
  datTruong,
  diChuyenSlide,
  kiemTraBai,
  macDinh,
  mangToanSo,
  phanTich,
  slideMoi,
  slidesCua,
  themSlide,
  truongCuaSlide,
  xoaSlide,
} from "../lib/soanBai";

/**
 * TRÌNH SỬA BÀI HỌC — Giai đoạn 3, lát 3c.
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * 🔴 QUYẾT ĐỊNH — GHI QUA HÀM SQL, KHÔNG GHI THẲNG BẢNG TỪ ĐÂY
 *
 * `content_lessons` **không** được `update()` từ trình duyệt, dù RLS cho phép.
 * Lý do: ghi thẳng thì bài đổi mà **không sinh phiên bản**, và mất luôn đường
 * hoàn tác. Publish đi qua `publish_lesson()` — hàm đó ghi phiên bản, cập nhật
 * bài, xoá bản nháp, tăng `content_version` và ghi vết kiểm toán trong **một
 * transaction**. Cổng `S-22` giữ đúng điều này.
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * `nhap` là bản gõ thô của những ô nhiều dòng (JSON, mỗi dòng một ý). Phải giữ
 * riêng vì dán JSON dở dang thì `JSON.parse` chưa được — mà vẫn phải hiện đúng thứ
 * người dùng vừa gõ, không được nuốt đi rồi ghi lại giá trị cũ.
 */

// Khoá nào là CHUỖI DÀI (đo trên 1505 slide: câu hỏi/đoạn chữ/giải thích thường
// vài trăm ký tự) thì cho ô nhiều dòng. Danh sách ngắn là CỐ Ý: thêm bừa một khoá
// vào đây chỉ làm ô nhập cao lên vô ích.
const NHIEU_DONG = new Set([
  "text",
  "question",
  "explanation",
  "rule",
  "mascotHint",
]);

const LOAI_BAI = [
  { value: "learn", nhan: "Bài học" },
  { value: "practice", nhan: "Luyện tập" },
  { value: "review", nhan: "Ôn tập" },
];

const oNhap =
  "w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-50";

const nut =
  "rounded-lg border px-3 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

function ThongBao({ loai, children, onDong }) {
  const mau =
    loai === "ok"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : loai === "canhbao"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-red-200 bg-red-50 text-red-800";
  return (
    <div className={`rounded-lg border px-3 py-2 text-xs ${mau}`}>
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1 whitespace-pre-wrap">{children}</div>
        {onDong && (
          <button
            type="button"
            onClick={onDong}
            className="shrink-0 text-current opacity-60 hover:opacity-100"
            aria-label="Đóng"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

/** Một ô nhập, chọn kiểu theo `dang` (xem `soanBai.dangTruong`). */
function O({ truong, giaTriHien, loiNhap, onDoi, onXoa }) {
  const { dang, nhan, batBuoc, capVoi } = truong;

  const nhanDau = (
    <div className="mb-1 flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-slate-600">{nhan}</span>
      <code className="font-mono text-[10px] text-slate-400">
        {truong.khoa}
      </code>
      {batBuoc ? (
        <span className="rounded bg-slate-100 px-1 text-[10px] text-slate-500">
          bắt buộc
        </span>
      ) : (
        <button
          type="button"
          onClick={onXoa}
          className="text-[10px] text-slate-400 hover:text-red-600"
          title={
            capVoi
              ? `Xoá khoá này (xoá kèm \`${capVoi}\` vì hai khoá phải đi cùng nhau)`
              : "Xoá khoá này khỏi slide"
          }
        >
          xoá
        </button>
      )}
    </div>
  );

  if (dang === DANG.LUA_CHON) {
    const opts = truong.luaChon ?? [];
    const dangCo = opts.some((o) => Object.is(o.giaTri, truong.giaTri));
    return (
      <div>
        {nhanDau}
        <select
          value={dangCo ? JSON.stringify(truong.giaTri) : ""}
          onChange={(e) =>
            onDoi(e.target.value === "" ? "" : JSON.parse(e.target.value))
          }
          className={oNhap}
        >
          {!dangCo && (
            <option value="">
              — đang là {JSON.stringify(truong.giaTri)} (không có trong lựa
              chọn) —
            </option>
          )}
          {opts.map((o, i) => (
            <option key={i} value={JSON.stringify(o.giaTri)}>
              {i + 1}. {o.hien}
            </option>
          ))}
        </select>
        {!dangCo && (
          <p className="mt-1 text-[11px] text-red-600">
            Đáp án hiện tại KHÔNG nằm trong danh sách lựa chọn — bài này không
            chấm được câu đó. Chọn lại một đáp án.
          </p>
        )}
      </div>
    );
  }

  const nhieuDong =
    dang === DANG.JSON ||
    dang === DANG.MANG_CHUOI ||
    NHIEU_DONG.has(truong.khoa);

  return (
    <div>
      {nhanDau}
      {nhieuDong ? (
        <textarea
          value={giaTriHien}
          onChange={(e) => onDoi(e.target.value)}
          rows={
            dang === DANG.JSON
              ? 5
              : Math.min(6, Math.max(2, giaTriHien.split("\n").length))
          }
          spellCheck={false}
          className={`${oNhap} ${dang === DANG.JSON ? "font-mono text-xs" : ""}`}
        />
      ) : (
        <input
          type={dang === DANG.SO ? "number" : "text"}
          value={giaTriHien}
          onChange={(e) => onDoi(e.target.value)}
          className={oNhap}
        />
      )}
      {loiNhap && <p className="mt-1 text-[11px] text-red-600">{loiNhap}</p>}
      {dang === DANG.MANG_CHUOI && !loiNhap && (
        <p className="mt-1 text-[11px] text-slate-400">Mỗi dòng là một mục.</p>
      )}
    </div>
  );
}

export default function LessonEditor({ chiTiet, onDong, onDaGhi }) {
  const [bai, setBai] = useState(() => baiTuDuLieu(chiTiet));
  const [nhap, setNhap] = useState({});
  const [loiNhap, setLoiNhap] = useState({});
  const [banNhapCu, setBanNhapCu] = useState(null);
  const [dangTaiNhap, setDangTaiNhap] = useState(true);
  const [dangLuu, setDangLuu] = useState(false);
  const [thongBao, setThongBao] = useState(null);
  const [phienBan, setPhienBan] = useState([]);
  const [dangMoSlide, setDangMoSlide] = useState(() => new Set([0]));

  const goc = useMemo(() => baiTuDuLieu(chiTiet), [chiTiet]);
  const slides = slidesCua(bai);

  // ── Tải bản nháp đang có (nếu có) ──
  useEffect(() => {
    let huy = false;
    setDangTaiNhap(true);
    supabase
      .from("content_lesson_drafts")
      .select("title,description,lesson_type,payload,updated_at")
      .eq("lesson_id", chiTiet.id)
      .maybeSingle()
      .then(({ data, error: loi }) => {
        if (huy) return;
        if (loi) {
          setThongBao({
            loai: "loi",
            text: `Không đọc được bản nháp: ${loi.message}`,
          });
        } else if (data) {
          setBanNhapCu(data);
          setBai(baiTuDuLieu(chiTiet, data));
          setThongBao({
            loai: "canhbao",
            text:
              "Bài này đang có BẢN NHÁP chưa publish — đang mở bản nháp đó, không " +
              "phải bản đang chạy trên app của bé.",
          });
        } else {
          setBanNhapCu(null);
          setBai(baiTuDuLieu(chiTiet));
        }
        setNhap({});
        setLoiNhap({});
        setDangTaiNhap(false);
      });
    return () => {
      huy = true;
    };
  }, [chiTiet]);

  const taiPhienBan = useCallback(async () => {
    const { data } = await supabase
      .from("content_lesson_versions")
      .select("version,title,published_at")
      .eq("lesson_id", chiTiet.id)
      .order("version", { ascending: false });
    setPhienBan(data ?? []);
  }, [chiTiet.id]);

  useEffect(() => {
    taiPhienBan();
  }, [taiPhienBan]);

  // ── Sửa một ô ──
  const suaO = (viTri, truong, chuoiMoi) => {
    const chìa = `${viTri}:${truong.khoa}`;
    setNhap((cu) => ({ ...cu, [chìa]: chuoiMoi }));

    const kq = phanTich(
      truong.dang,
      chuoiMoi,
      mangToanSo(slidesCua(bai)[viTri], truong.khoa),
    );
    setLoiNhap((cu) => {
      const moi = { ...cu };
      if (kq.ok) delete moi[chìa];
      else moi[chìa] = kq.loi;
      return moi;
    });
    if (kq.ok)
      setBai((cu) =>
        capNhatSlide(
          cu,
          viTri,
          datTruong(slidesCua(cu)[viTri], truong.khoa, kq.giaTri),
        ),
      );
  };

  const xoaO = (viTri, truong) => {
    setBai((cu) =>
      capNhatSlide(
        cu,
        viTri,
        boTruong(slidesCua(cu)[viTri], truong.khoa).slide,
      ),
    );
    setNhap({});
  };

  const themO = (viTri, khoa, kieu) => {
    setBai((cu) =>
      capNhatSlide(
        cu,
        viTri,
        datTruong(slidesCua(cu)[viTri], khoa, macDinh(kieu)),
      ),
    );
    setNhap({});
  };

  // ── Thao tác làm đổi vị trí slide => bản gõ thô cũ không còn khớp số thứ tự ──
  const doiSlide = (fn) => {
    setBai(fn);
    setNhap({});
    setLoiNhap({});
  };

  // ── Kiểm tra ──
  const loiCung = kiemTraBai(bai);
  const canhBao = canhBaoRong(bai);
  const loiGo = Object.entries(loiNhap);
  const coLoi = loiCung.length > 0 || loiGo.length > 0;
  const daDoi = coThayDoi(bai, banNhapCu ?? goc);

  const luuNhap = async () => {
    setDangLuu(true);
    setThongBao(null);
    const { error: loi } = await supabase.rpc("save_lesson_draft", {
      p_lesson_id: bai.id,
      p_title: bai.title,
      p_description: bai.description || null,
      p_lesson_type: bai.lesson_type,
      p_payload: bai.payload,
    });
    setDangLuu(false);
    if (loi) {
      setThongBao({
        loai: "loi",
        text: `Chưa lưu được bản nháp: ${loi.message}`,
      });
      return;
    }
    setBanNhapCu({ ...bai });
    setThongBao({
      loai: "ok",
      text: "Đã lưu bản nháp. App của bé CHƯA thấy gì — chỉ khi bấm Publish.",
    });
  };

  const publish = async () => {
    setDangLuu(true);
    setThongBao(null);
    const { data, error: loi } = await supabase.rpc("publish_lesson", {
      p_lesson_id: bai.id,
    });
    setDangLuu(false);
    if (loi) {
      setThongBao({ loai: "loi", text: `Chưa publish được: ${loi.message}` });
      return;
    }
    setBanNhapCu(null);
    await taiPhienBan();
    setThongBao({
      loai: "ok",
      text:
        `Đã publish thành phiên bản ${data}. App của bé nhận nội dung mới ở lần ` +
        `mở kế tiếp (số phiên bản nội dung đã tăng, cache cũ bị bỏ).`,
    });
    onDaGhi?.();
  };

  const doiTrangThai = async (trangThai) => {
    setDangLuu(true);
    setThongBao(null);
    const { error: loi } = await supabase.rpc("set_lesson_status", {
      p_lesson_id: bai.id,
      p_status: trangThai,
    });
    setDangLuu(false);
    if (loi) {
      setThongBao({
        loai: "loi",
        text: `Chưa đổi được trạng thái: ${loi.message}`,
      });
      return;
    }
    setThongBao({
      loai: "ok",
      text:
        trangThai === "draft"
          ? "Đã RÚT BÀI khỏi sóng. Bé sẽ không thấy bài này nữa. Nội dung vẫn còn nguyên trong DB."
          : "Đã đăng lại bài.",
    });
    onDaGhi?.();
  };

  const quayVe = async (version) => {
    setDangLuu(true);
    setThongBao(null);
    const { data, error: loi } = await supabase.rpc("rollback_lesson", {
      p_lesson_id: bai.id,
      p_version: version,
    });
    setDangLuu(false);
    if (loi) {
      setThongBao({ loai: "loi", text: `Chưa hoàn tác được: ${loi.message}` });
      return;
    }
    await taiPhienBan();
    setThongBao({
      loai: "ok",
      text:
        `Đã quay về nội dung của phiên bản ${version}, ghi thành phiên bản ${data}. ` +
        `Lịch sử KHÔNG bị xoá — bản vừa bị bỏ vẫn còn để quay lại lần nữa.`,
    });
    onDaGhi?.();
  };

  const xoaBanNhap = async () => {
    setDangLuu(true);
    const { error: loi } = await supabase
      .from("content_lesson_drafts")
      .delete()
      .eq("lesson_id", bai.id);
    setDangLuu(false);
    if (loi) {
      setThongBao({
        loai: "loi",
        text: `Chưa xoá được bản nháp: ${loi.message}`,
      });
      return;
    }
    setBanNhapCu(null);
    setBai(baiTuDuLieu(chiTiet));
    setNhap({});
    setLoiNhap({});
    setThongBao({
      loai: "ok",
      text: "Đã bỏ bản nháp, quay về bản đang publish.",
    });
  };

  if (dangTaiNhap) {
    return <div className="p-5 text-sm text-slate-500">Đang mở trình sửa…</div>;
  }

  return (
    <div className="flex min-w-0 flex-col">
      {/* ── Thanh hành động ── */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4">
        <button
          type="button"
          onClick={() => onDong?.()}
          className={`${nut} border-slate-300 bg-white text-slate-600 hover:bg-slate-50`}
        >
          ← Đóng
        </button>

        <button
          type="button"
          onClick={luuNhap}
          disabled={dangLuu || coLoi}
          className={`${nut} border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100`}
          title={coLoi ? "Còn lỗi — sửa hết rồi mới lưu được" : "Lưu bản nháp"}
        >
          {dangLuu ? "Đang lưu…" : "Lưu nháp"}
        </button>

        <button
          type="button"
          onClick={publish}
          disabled={dangLuu || coLoi || !banNhapCu}
          className={`${nut} border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700`}
          title={
            !banNhapCu
              ? "Chưa có bản nháp nào — Lưu nháp trước rồi mới publish"
              : "Đưa nội dung này lên cho app của bé"
          }
        >
          Publish
        </button>

        {chiTiet.status === "published" ? (
          <button
            type="button"
            onClick={() => doiTrangThai("draft")}
            disabled={dangLuu}
            className={`${nut} border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100`}
            title="Rút bài khỏi sóng — bé sẽ không thấy bài này nữa"
          >
            Rút bài
          </button>
        ) : (
          <button
            type="button"
            onClick={() => doiTrangThai("published")}
            disabled={dangLuu}
            className={`${nut} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
          >
            Đăng lại
          </button>
        )}

        {banNhapCu && (
          <button
            type="button"
            onClick={xoaBanNhap}
            disabled={dangLuu}
            className={`${nut} ml-auto border-slate-300 bg-white text-slate-500 hover:bg-red-50 hover:text-red-700`}
            title="Bỏ bản nháp đang soạn, quay về bản đang chạy"
          >
            Bỏ bản nháp
          </button>
        )}
      </div>

      {thongBao && (
        <div className="px-4 pt-3">
          <ThongBao loai={thongBao.loai} onDong={() => setThongBao(null)}>
            {thongBao.text}
          </ThongBao>
        </div>
      )}

      <div className="space-y-3 p-4">
        {/* ── Chặn lưu ── */}
        {loiCung.length > 0 && (
          <ThongBao loai="loi">
            <strong>{loiCung.length} lỗi cấu trúc — chưa lưu được:</strong>
            {"\n"}
            {loiCung.map((l) => `• ${l}`).join("\n")}
          </ThongBao>
        )}

        {loiGo.length > 0 && (
          <ThongBao loai="loi">
            <strong>Ô đang gõ chưa hợp lệ:</strong>
            {"\n"}
            {loiGo.map(([, l]) => `• ${l}`).join("\n")}
          </ThongBao>
        )}

        {canhBao.length > 0 && (
          <ThongBao loai="canhbao">
            <strong>
              {canhBao.length} chỗ đang để trống (vẫn lưu được, nhưng bé sẽ thấy
              ô rỗng):
            </strong>
            {"\n"}
            {canhBao.map((l) => `• ${l}`).join("\n")}
          </ThongBao>
        )}

        {!daDoi && !dangTaiNhap && (
          <p className="text-xs text-slate-400">
            Chưa có thay đổi nào so với bản gốc.
          </p>
        )}

        {/* ── Thông tin chung ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Thông tin chung
          </h3>
          <div className="space-y-3">
            <div>
              <div className="mb-1 text-xs font-medium text-slate-600">
                Tiêu đề <span className="text-red-500">*</span>
              </div>
              <input
                value={bai.title}
                onChange={(e) =>
                  setBai((c) => ({ ...c, title: e.target.value }))
                }
                className={oNhap}
              />
            </div>
            <div>
              <div className="mb-1 text-xs font-medium text-slate-600">
                Mô tả
              </div>
              <input
                value={bai.description}
                onChange={(e) =>
                  setBai((c) => ({ ...c, description: e.target.value }))
                }
                className={oNhap}
                placeholder="Không bắt buộc"
              />
            </div>
            <div>
              <div className="mb-1 text-xs font-medium text-slate-600">
                Kiểu bài
              </div>
              <select
                value={bai.lesson_type}
                onChange={(e) =>
                  setBai((c) => ({ ...c, lesson_type: e.target.value }))
                }
                className={oNhap}
              >
                {LOAI_BAI.some((o) => o.value === bai.lesson_type) ? null : (
                  <option value={bai.lesson_type}>{bai.lesson_type}</option>
                )}
                {LOAI_BAI.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.nhan}
                  </option>
                ))}
              </select>
              <p className="mt-1 font-mono text-[10px] text-slate-400">
                {bai.id}
              </p>
            </div>
          </div>
        </section>

        {/* ── Slides ── */}
        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-3">
            <h3 className="text-sm font-semibold text-slate-900">
              {slides.length} slide
            </h3>
            <span className="text-xs text-slate-400">
              Thứ tự trong bài = thứ tự bé học
            </span>
            <div className="ml-auto flex items-center gap-2">
              <select
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  doiSlide((cu) => themSlide(cu, e.target.value));
                }}
                className="rounded-md border border-slate-300 px-2 py-1 text-sm"
              >
                <option value="">+ Thêm slide…</option>
                {SLIDE_TYPE_NAMES.map((t) => (
                  <option key={t} value={t}>
                    {LOAI_SLIDE[t] ?? t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ol>
            {slides.map((slide, i) => {
              const mo = dangMoSlide.has(i);
              const truong = truongCuaSlide(slide);
              const chuaCo = truong.filter((t) => !t.coMat && !t.batBuoc);

              // Lựa chọn cho ô đáp án: lấy TỪ `options` đã phân tích, nên giá trị
              // chọn ra luôn khớp `options.includes(answer)` của bộ kiểm tra.
              const opts = Array.isArray(slide.content?.options)
                ? slide.content.options
                : [];
              const truongDay = truong.map((t) =>
                t.dang === DANG.LUA_CHON
                  ? {
                      ...t,
                      luaChon: opts.map((v) => ({
                        giaTri: v,
                        hien: String(v),
                      })),
                    }
                  : t,
              );

              return (
                <li key={i} className="border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDangMoSlide((cu) => {
                          const moi = new Set(cu);
                          if (moi.has(i)) moi.delete(i);
                          else moi.add(i);
                          return moi;
                        })
                      }
                      className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm"
                    >
                      <span className="w-3 shrink-0 text-slate-400">
                        {mo ? "▾" : "▸"}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">
                        {i + 1}
                      </span>
                      <span className="shrink-0 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                        {LOAI_SLIDE[slide.type] ?? slide.type}
                      </span>
                      <span className="min-w-0 text-slate-500">
                        {truong.find(
                          (t) =>
                            t.batBuoc &&
                            typeof t.giaTri === "string" &&
                            t.giaTri.trim(),
                        )?.giaTri ?? ""}
                      </span>
                    </button>

                    <div className="flex shrink-0 items-center gap-1 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          doiSlide((cu) => diChuyenSlide(cu, i, -1))
                        }
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                        title="Lên"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          doiSlide((cu) => diChuyenSlide(cu, i, 1))
                        }
                        disabled={i === slides.length - 1}
                        className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
                        title="Xuống"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (slides.length === 1) return;
                          doiSlide((cu) => xoaSlide(cu, i));
                        }}
                        disabled={slides.length === 1}
                        className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                        title={
                          slides.length === 1
                            ? "Bài phải còn ít nhất 1 slide"
                            : "Xoá slide này khỏi bài"
                        }
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {mo && (
                    <div className="space-y-3 px-4 pb-4 pl-10">
                      <div>
                        <div className="mb-1 text-xs font-medium text-slate-600">
                          Kiểu slide
                        </div>
                        <select
                          value={slide.type}
                          onChange={(e) => {
                            // Đổi kiểu thì bộ khoá bắt buộc khác hẳn. Giữ `content`
                            // lại là cố ý: khoá chung tên (vd `title`) giữ nguyên giá
                            // trị, khoá không còn dùng nữa sẽ bị `validateSlide` báo
                            // là thiếu. Âm thầm xoá sạch thì mất công gõ.
                            const moi = { ...slide, type: e.target.value };
                            for (const [k, t] of Object.entries(
                              slideMoi(e.target.value)?.content ?? {},
                            ))
                              if (!(k in (moi.content ?? {}))) {
                                moi.content = {
                                  ...(moi.content ?? {}),
                                  [k]: t,
                                };
                              }
                            doiSlide((cu) => capNhatSlide(cu, i, moi));
                          }}
                          className={oNhap}
                        >
                          {SLIDE_TYPE_NAMES.map((t) => (
                            <option key={t} value={t}>
                              {LOAI_SLIDE[t] ?? t}
                            </option>
                          ))}
                        </select>
                      </div>

                      {truongDay.map((t) => {
                        const chìa = `${i}:${t.khoa}`;
                        return (
                          <O
                            key={t.khoa}
                            truong={t}
                            giaTriHien={
                              nhap[chìa] ?? chuoiTuGiaTri(t.dang, t.giaTri)
                            }
                            loiNhap={loiNhap[chìa]}
                            onDoi={(v) => suaO(i, t, v)}
                            onXoa={() => xoaO(i, t)}
                          />
                        );
                      })}

                      {chuaCo.length > 0 && (
                        <div className="rounded-lg border border-dashed border-slate-200 p-2">
                          <p className="mb-2 text-[11px] text-slate-500">
                            Khoá tuỳ chọn chưa dùng — bấm để thêm:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {chuaCo.map((t) => (
                              <button
                                key={t.khoa}
                                type="button"
                                onClick={() => themO(i, t.khoa, t.kieuKhaiBao)}
                                className="rounded-full border border-slate-300 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
                              >
                                + {t.nhan}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* ── Lịch sử phiên bản ── */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-1 text-sm font-semibold text-slate-900">
            Lịch sử phiên bản
          </h3>
          <p className="mb-3 text-xs text-slate-500">
            Chỉ ghi thêm, không sửa được. Hoàn tác = lấy nội dung bản cũ ghi
            thành một bản MỚI, nên chính việc hoàn tác cũng hoàn tác được.
          </p>
          {phienBan.length === 0 ? (
            <p className="text-xs text-slate-400">
              Chưa có phiên bản nào — bài này chưa từng được publish từ giao
              diện.
            </p>
          ) : (
            <ul className="space-y-1">
              {phienBan.map((v) => (
                <li
                  key={v.version}
                  className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-100 px-3 py-2 text-sm"
                >
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-600">
                    v{v.version}
                  </span>
                  <span className="min-w-0 flex-1 text-slate-700">
                    {v.title}
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">
                    {v.published_at
                      ? new Date(v.published_at).toLocaleString("vi-VN")
                      : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => quayVe(v.version)}
                    disabled={dangLuu || coLoi}
                    className={`${nut} border-slate-300 bg-white py-1 text-xs text-slate-600 hover:bg-slate-50`}
                  >
                    Quay về bản này
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
