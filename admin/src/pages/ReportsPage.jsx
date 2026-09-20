import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAdminAuth } from "../auth/AdminAuthProvider";
import { logAudit } from "../lib/audit";

/**
 * Hộp thư báo lỗi câu hỏi — Giai đoạn 2c.
 *
 * ⚠️ PHẠM VI: màn hình này KHÔNG sửa được nội dung bài học. Nội dung còn nằm
 * trong file tĩnh (`client/src/data/gradeXData.js`) — sửa nóng là việc của GĐ 3
 * (CMS). Ở đây chỉ xử lý hàng đợi: đọc → đổi trạng thái → ghi chú.
 * Ticket đã chụp sẵn `lesson_id`, `slide_index`, `question_text`,
 * `correct_answer` nên đủ để tìm và sửa trong file nội dung.
 */

const STATUSES = [
  { value: "new", label: "Mới", tone: "amber" },
  { value: "in_progress", label: "Đang xem", tone: "blue" },
  { value: "resolved", label: "Đã xử lý", tone: "emerald" },
  { value: "rejected", label: "Từ chối", tone: "slate" },
];

const TYPE_LABELS = {
  wrong_answer: "Đáp án sai",
  typo: "Sai chính tả",
  unclear: "Khó hiểu",
  other: "Khác",
};

const TYPE_TONES = {
  wrong_answer: "border-red-200 bg-red-50 text-red-700",
  typo: "border-orange-200 bg-orange-50 text-orange-700",
  unclear: "border-amber-200 bg-amber-50 text-amber-700",
  other: "border-slate-200 bg-slate-100 text-slate-600",
};

const TONE_CLASS = {
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  slate: "border-slate-200 bg-slate-100 text-slate-600",
};

// PostgREST trả object cho quan hệ 1:1 nhưng có thể trả mảng tuỳ phiên bản
const one = (v) => (Array.isArray(v) ? v[0] : v) ?? null;

const fmtDateTime = (s) =>
  s
    ? new Date(s).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const SELECT = `
  id, lesson_id, slide_index, question_text, correct_answer,
  report_type, message, status, admin_note, resolved_at, created_at,
  child:child_profiles (
    id, nickname, grade, avatar,
    parent:profiles!child_profiles_parent_id_fkey (email)
  )
`;

export default function ReportsPage() {
  const { user: adminUser } = useAdminAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const [filter, setFilter] = useState("new");
  const [notes, setNotes] = useState({}); // id -> bản nháp ghi chú

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase
        .from("support_tickets")
        .select(SELECT)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw new Error(error.message);
      setTickets(data || []);
    } catch (e) {
      setMessage({ type: "error", text: e.message });
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const acc = { all: tickets.length };
    for (const s of STATUSES) acc[s.value] = 0;
    for (const t of tickets) acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, [tickets]);

  const visible = useMemo(
    () =>
      filter === "all" ? tickets : tickets.filter((t) => t.status === filter),
    [tickets, filter],
  );

  const updateStatus = async (ticket, status) => {
    setBusyId(ticket.id);
    setMessage(null);

    const note =
      notes[ticket.id] !== undefined
        ? notes[ticket.id].trim() || null
        : ticket.admin_note;

    try {
      const { error } = await supabase
        .from("support_tickets")
        .update({
          status,
          admin_note: note,
          resolved_by: status === "new" ? null : (adminUser?.id ?? null),
          resolved_at: status === "new" ? null : new Date().toISOString(),
        })
        .eq("id", ticket.id);
      if (error) throw new Error(error.message);

      await logAudit({
        action: "support_ticket.update",
        entity: "support_tickets",
        entityId: ticket.id,
        before: { status: ticket.status, admin_note: ticket.admin_note },
        after: { status, admin_note: note },
        reason: `Câu hỏi: ${ticket.question_text.slice(0, 80)}`,
      });

      const label = STATUSES.find((s) => s.value === status)?.label ?? status;
      setMessage({ type: "ok", text: `Đã chuyển ticket sang "${label}".` });
      await load();
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Báo lỗi câu hỏi</h1>
        <p className="mt-1 text-sm text-slate-500">
          Phụ huynh và bé gửi từ nút <em>Báo lỗi câu hỏi</em> trong bài học.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {[{ value: "all", label: "Tất cả" }, ...STATUSES].map((s) => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
              filter === s.value
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {s.label}
            <span
              className={`ml-2 rounded px-1.5 py-0.5 text-xs ${
                filter === s.value
                  ? "bg-white/20"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {counts[s.value] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg px-4 py-3 text-sm ${
            message.type === "ok"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {loading ? (
        <p className="py-10 text-center text-slate-400">Đang tải…</p>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-12 text-center">
          <p className="text-sm text-slate-500">
            Không có ticket nào ở mục này.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((t) => {
            const child = one(t.child);
            const parent = one(child?.parent);
            const statusMeta =
              STATUSES.find((s) => s.value === t.status) ?? STATUSES[0];

            return (
              <article
                key={t.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      TYPE_TONES[t.report_type] ?? TYPE_TONES.other
                    }`}
                  >
                    {TYPE_LABELS[t.report_type] ?? t.report_type}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                      TONE_CLASS[statusMeta.tone]
                    }`}
                  >
                    {statusMeta.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {fmtDateTime(t.created_at)}
                  </span>

                  <span className="ml-auto text-xs text-slate-500">
                    {child ? (
                      <Link
                        to={`/users/${child.id}`}
                        className="font-medium text-indigo-700 hover:underline"
                      >
                        {child.avatar} {child.nickname}
                      </Link>
                    ) : (
                      <span className="italic">Khách (chưa đăng nhập)</span>
                    )}
                    {parent?.email && (
                      <span className="ml-1 text-slate-400">
                        · {parent.email}
                      </span>
                    )}
                  </span>
                </div>

                <blockquote className="mt-3 border-l-3 border-slate-300 bg-slate-50 py-2 pl-3 text-sm text-slate-700">
                  {t.question_text}
                </blockquote>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>
                    Đáp án trong bài:{" "}
                    <strong className="text-slate-700">
                      {t.correct_answer ?? "—"}
                    </strong>
                  </span>
                  <span>
                    Vị trí:{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5">
                      {t.lesson_id ?? "?"}
                      {Number.isInteger(t.slide_index)
                        ? ` · slide ${t.slide_index + 1}`
                        : ""}
                    </code>
                  </span>
                </div>

                {t.message && (
                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-medium">Người báo viết: </span>
                    {t.message}
                  </p>
                )}

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <label className="text-xs font-medium text-slate-500">
                    Ghi chú xử lý
                  </label>
                  <textarea
                    rows={2}
                    value={
                      notes[t.id] !== undefined
                        ? notes[t.id]
                        : (t.admin_note ?? "")
                    }
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [t.id]: e.target.value }))
                    }
                    placeholder="VD: đã sửa đáp án trong grade1Data.js"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    {STATUSES.filter((s) => s.value !== t.status).map((s) => (
                      <button
                        key={s.value}
                        onClick={() => updateStatus(t, s.value)}
                        disabled={busyId === t.id}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {s.value === "resolved"
                          ? "Đánh dấu đã xử lý"
                          : s.value === "rejected"
                            ? "Từ chối"
                            : s.value === "in_progress"
                              ? "Đang xem"
                              : "Đưa về Mới"}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
