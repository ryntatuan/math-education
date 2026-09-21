import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Phân tích câu hỏi — Giai đoạn 2b, lát 2b-2.
 *
 * Màn hình này trả lời 3 câu (đúng 3 khối A/B/C trong `docs/phase_2b_plan.md`):
 *   A. Khuôn/câu hỏi nào SAI nhiều bất thường?
 *   B. Bé sai vì ĐOÁN BỪA (nhanh + sai) hay vì CHƯA HIỂU (chậm + sai)?
 *   C. Kỹ năng nào bé yếu thật sự?
 *
 * ⚠️ CHỈ ĐỌC. Không có thao tác ghi nào nên KHÔNG gọi `logAudit` — audit log
 * dành cho thay đổi dữ liệu, không phải cho việc xem.
 *
 * ⚠️ Mọi phép gộp chạy trong database qua `get_question_analytics()`
 * (migration `0007`), KHÔNG tải dòng thô về gộp bằng JavaScript. Lý do ở đầu
 * file migration: PostgREST chỉ trả tối đa 1000 dòng một lần, nên cách gộp ở
 * trình duyệt sẽ âm thầm ra số sai khi dữ liệu lớn lên.
 */

const DAY_RANGES = [
  { value: 7, label: "7 ngày" },
  { value: 30, label: "30 ngày" },
  { value: 90, label: "90 ngày" },
];

// Ngưỡng "đoán bừa" và "không hiểu", tính bằng giây. Trùng với câu SQL B đã
// kiểm chứng ở `TC-2.23`. Đổi ở đây thì phải đổi cả trong migration 0007.
const RUSH_SECONDS = 3;
const SLOW_SECONDS = 15;

const fmtPct = (v) => (v == null ? "—" : `${v}%`);

// Quy mọi tỉ lệ về "độ xấu" rồi tô màu. `badHigh` = true khi số cao là xấu
// (tỉ lệ SAI); false khi số cao là tốt (tỉ lệ ĐÚNG).
const pctTone = (pct, badHigh) => {
  if (pct == null) return "text-slate-400";
  const bad = badHigh ? pct : 100 - pct;
  if (bad >= 40) return "font-semibold text-red-600";
  if (bad >= 20) return "font-medium text-amber-600";
  return "text-slate-600";
};

function Section({ title, question, note, children }) {
  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-500">{question}</p>
        {/* 🔴 `max-w-[70ch]`: đây là chú thích để ĐỌC, không phải bảng. Đo ở màn
            1920 sau khi bỏ trần bề rộng: 3 dòng chú thích này dài 92 / 101 / **125**
            ký tự một dòng — mắt phải quét ngang gần hết màn. Chặn ở mức đọc được
            (~70 ký tự) mà KHÔNG mọc lại khoảng trống hai bên trang: bảng bên dưới
            vẫn dùng hết bề rộng. Sửa ở đây một lần là đủ cho cả 3 khối A/B/C vì
            chúng dùng chung component `Section`. */}
        {note && (
          <p className="mt-2 max-w-[70ch] text-xs text-slate-400">{note}</p>
        )}
      </div>
      {/* Bọc ở ĐÂY thay vì bọc từng bảng: chỉ một chỗ, và bảng thêm sau này
          cũng tự được cuộn ngang. */}
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

// Bảng trống mà không giải thích thì bị hiểu nhầm là hỏng — cùng bài học với
// Sổ Tay Ôn Bài Sai. Nên mọi trạng thái rỗng ở đây đều phải NÓI RÕ lý do.
function Empty({ children }) {
  return (
    <div className="px-5 py-10 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

const TH = ({ children, right }) => (
  <th
    className={`px-5 py-2 text-xs font-semibold tracking-wide text-slate-500 uppercase ${
      right ? "text-right" : "text-left"
    }`}
  >
    {children}
  </th>
);

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const [grade, setGrade] = useState(""); // "" = tất cả các lớp
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: err } = await supabase.rpc(
        "get_question_analytics",
        {
          p_days: days,
          p_grade: grade === "" ? null : Number(grade),
        },
      );
      if (err) throw new Error(err.message);
      setData(res);
    } catch (e) {
      setError(e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [days, grade]);

  useEffect(() => {
    load();
  }, [load]);

  const broken = data?.broken ?? [];
  const guessing = data?.guessing ?? [];
  const weak = data?.weak ?? [];
  const minAttempts = data?.min_attempts ?? 20;
  const totalAttempts = data?.total_attempts ?? 0;
  const belowMin = data?.refs_below_min ?? 0;

  // Chưa có lượt nào thì cả 3 khối đều rỗng vì cùng một lý do. Nói một lần,
  // đừng lặp lại 3 lần cùng một câu.
  const nothingAtAll = !loading && !error && totalAttempts === 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Phân tích câu hỏi</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gộp từ bảng <code className="text-xs">question_attempts</code> — mỗi
          lượt trả lời của bé là một dòng.
        </p>
      </header>

      {/* Bộ lọc */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {DAY_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setDays(r.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                days === r.value
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <label className="ml-auto flex items-center gap-2 text-sm text-slate-600">
          Lớp
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
          >
            <option value="">Tất cả</option>
            {[1, 2, 3, 4, 5].map((g) => (
              <option key={g} value={g}>
                Lớp {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Không đọc được số liệu: {error}
        </div>
      )}

      {loading ? (
        <p className="py-16 text-center text-slate-400">Đang tải…</p>
      ) : nothingAtAll ? (
        <div className="rounded-xl border border-slate-200 bg-white py-14 text-center">
          <p className="text-sm text-slate-600">
            {days} ngày qua chưa có lượt trả lời nào
            {grade === "" ? "" : ` ở lớp ${grade}`}.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Chỉ tài khoản đã đăng nhập mới ghi được — khách chơi sẽ không tạo
            dòng nào. Bé cần trả lời vài câu trong bài học hoặc luyện tập.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600">
            <strong className="text-slate-900">
              {totalAttempts.toLocaleString("vi-VN")}
            </strong>{" "}
            lượt trả lời trong {days} ngày qua
            {grade === "" ? "" : ` · lớp ${grade}`}.
            {belowMin > 0 && (
              <>
                {" "}
                Khối A chỉ tính khuôn đã đủ{" "}
                <strong className="text-slate-900">{minAttempts}</strong> lượt —
                còn <strong className="text-slate-900">{belowMin}</strong> khuôn
                chưa đủ, cần thêm dữ liệu mới đáng tin.
              </>
            )}
          </div>

          {/* A */}
          <Section
            title="A — Câu hỏi hỏng"
            question="Khuôn câu hỏi nào có tỉ lệ sai cao bất thường?"
            note={`Chỉ hiện khuôn đã có ít nhất ${minAttempts} lượt — dưới ngưỡng đó thì vài lượt sai chưa nói lên điều gì.`}
          >
            {broken.length === 0 ? (
              <Empty>
                Chưa khuôn nào đủ {minAttempts} lượt
                {belowMin > 0 ? ` (đang có ${belowMin} khuôn dưới ngưỡng)` : ""}
                . Khuôn sai nhiều nhất sẽ hiện ở đây.
              </Empty>
            ) : (
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <TH>Khuôn</TH>
                    <TH right>Lượt</TH>
                    <TH right>Tỉ lệ sai</TH>
                  </tr>
                </thead>
                <tbody>
                  {broken.map((r) => (
                    <tr
                      key={r.ref}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-5 py-2 font-mono text-xs text-slate-700">
                        {r.ref}
                      </td>
                      <td className="px-5 py-2 text-right text-slate-600">
                        {r.attempts}
                      </td>
                      <td
                        className={`px-5 py-2 text-right ${pctTone(r.wrong_pct, true)}`}
                      >
                        {fmtPct(r.wrong_pct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Section>

          {/* B */}
          <Section
            title="B — Đoán bừa hay chưa hiểu"
            question="Bé sai vì trả lời vội, hay vì thật sự chưa hiểu?"
            note={`Đoán bừa = sai sau dưới ${RUSH_SECONDS} giây · Chưa hiểu = sai sau hơn ${SLOW_SECONDS} giây. Chỉ tính lượt có đo được thời gian.`}
          >
            {guessing.length === 0 ? (
              <Empty>Chưa có lượt sai nào đo được thời gian.</Empty>
            ) : (
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <TH>Khuôn</TH>
                    <TH right>Đoán bừa</TH>
                    <TH right>Chưa hiểu</TH>
                  </tr>
                </thead>
                <tbody>
                  {guessing.map((r) => (
                    <tr
                      key={r.ref}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-5 py-2 font-mono text-xs text-slate-700">
                        {r.ref}
                      </td>
                      <td
                        className={`px-5 py-2 text-right ${
                          r.rush_wrong > 0
                            ? "font-medium text-amber-600"
                            : "text-slate-400"
                        }`}
                      >
                        {r.rush_wrong}
                      </td>
                      <td
                        className={`px-5 py-2 text-right ${
                          r.slow_wrong > 0
                            ? "font-medium text-red-600"
                            : "text-slate-400"
                        }`}
                      >
                        {r.slow_wrong}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Section>

          {/* C */}
          <Section
            title="C — Kỹ năng yếu"
            question="Bé yếu thật sự ở kỹ năng nào?"
            note="Gộp theo bé · kỹ năng, yếu nhất lên đầu. Chỉ gồm câu SINH TỰ ĐỘNG — câu trong bài học không gắn kỹ năng nên không tính ở đây."
          >
            {weak.length === 0 ? (
              <Empty>
                Chưa có lượt nào thuộc câu sinh tự động. Bé cần chơi Luyện tập,
                Thử thách hoặc mini game.
              </Empty>
            ) : (
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <TH>Bé</TH>
                    <TH>Kỹ năng</TH>
                    <TH right>Lượt</TH>
                    <TH right>Tỉ lệ đúng</TH>
                  </tr>
                </thead>
                <tbody>
                  {weak.map((r) => (
                    <tr
                      key={`${r.nickname}-${r.topic}`}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="px-5 py-2 text-slate-700">
                        {r.nickname ?? "—"}
                      </td>
                      <td className="px-5 py-2 font-mono text-xs text-slate-700">
                        {r.topic}
                      </td>
                      <td className="px-5 py-2 text-right text-slate-600">
                        {r.attempts}
                      </td>
                      <td
                        className={`px-5 py-2 text-right ${pctTone(r.correct_pct, false)}`}
                      >
                        {fmtPct(r.correct_pct)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Section>
        </>
      )}
    </div>
  );
}
