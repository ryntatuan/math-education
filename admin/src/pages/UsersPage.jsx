import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAdminAuth } from "../auth/AdminAuthProvider";
import { logAudit } from "../lib/audit";

const PAGE_SIZE = 20;
const ANOMALY_THRESHOLD = 500; // Xu kiếm trong 24h bị coi là bất thường

// PostgREST trả về object với quan hệ 1:1 nhưng có thể trả mảng tuỳ phiên bản
const one = (v) => (Array.isArray(v) ? v[0] : v) ?? null;

const SELECT = `
  id, nickname, grade, avatar, level, xp, coins, is_active, created_at, ban_reason,
  parent:profiles!child_profiles_parent_id_fkey (id, email, full_name, is_banned),
  progress:child_progress (current_streak, longest_streak, last_active_date, total_games_played, completed_lessons)
`;

const daysSince = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
};

/** Mức độ hoạt động suy ra từ child_progress — không cần bảng mới. */
function activityOf(progress) {
  const p = one(progress);
  const days = daysSince(p?.last_active_date);
  if (days == null) return { label: "Chưa học", tone: "slate" };
  if (days <= 0) return { label: "Hôm nay", tone: "emerald" };
  if (days <= 7) return { label: `${days} ngày trước`, tone: "emerald" };
  if (days <= 30) return { label: `${days} ngày trước`, tone: "amber" };
  if (days <= 90) return { label: `${days} ngày trước`, tone: "orange" };
  return { label: `${days} ngày trước`, tone: "slate" };
}

const TONE = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

function BanDialog({ user, onClose, onConfirm, busy }) {
  const [reason, setReason] = useState("");
  const banning = !user.parent?.is_banned;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-slate-900">
          {banning ? "Khoá tài khoản" : "Mở khoá tài khoản"}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Phụ huynh: <strong>{user.parent?.email}</strong>
          <br />
          Bé: <strong>{user.nickname}</strong> (Lớp {user.grade})
        </p>

        <label className="mt-4 block text-sm font-medium text-slate-700">
          Lý do {banning ? "(bắt buộc)" : "(không bắt buộc)"}
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder={
            banning ? "VD: Gian lận Xu, khiếu nại của phụ huynh…" : ""
          }
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={busy}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Huỷ
          </button>
          <button
            onClick={() => onConfirm(reason.trim())}
            disabled={busy || (banning && !reason.trim())}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
              banning
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {busy ? "Đang xử lý…" : banning ? "Khoá tài khoản" : "Mở khoá"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const { user: adminUser } = useAdminAuth();

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [dialogUser, setDialogUser] = useState(null);

  // Cảnh báo bất thường: tổng Xu kiếm trong 24h, gom theo bé
  const [coins24h, setCoins24h] = useState({});

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Tìm theo email phụ huynh cần tra bảng profiles trước — PostgREST
      // không lọc được trên bảng nhúng qua .or() một cách đáng tin cậy.
      let parentIds = [];
      if (debounced) {
        const { data: parents } = await supabase
          .from("profiles")
          .select("id")
          .ilike("email", `%${debounced}%`)
          .limit(500);
        parentIds = (parents || []).map((p) => p.id);
      }

      const from = (page - 1) * PAGE_SIZE;
      let query = supabase
        .from("child_profiles")
        .select(SELECT, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);

      if (debounced) {
        const clauses = [`nickname.ilike.%${debounced}%`];
        if (parentIds.length > 0) {
          clauses.push(`parent_id.in.(${parentIds.join(",")})`);
        }
        query = query.or(clauses.join(","));
      }

      const { data, error, count } = await query;
      if (error) throw new Error(error.message);

      setRows(data || []);
      setTotal(count || 0);
    } catch (e) {
      setMessage({ type: "error", text: e.message });
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, debounced]);

  useEffect(() => {
    load();
  }, [load]);

  // Nạp tổng Xu kiếm trong 24h (chỉ cần khi trang hiện tại có dữ liệu)
  useEffect(() => {
    if (rows.length === 0) return;
    let cancelled = false;

    (async () => {
      const since = new Date(Date.now() - 86400000).toISOString();
      const { data, error } = await supabase
        .from("coin_transactions")
        .select("child_id, amount")
        .gte("created_at", since)
        .gt("amount", 0)
        .limit(5000);

      if (cancelled || error) return;

      const acc = {};
      for (const t of data || []) {
        acc[t.child_id] = (acc[t.child_id] || 0) + t.amount;
      }
      setCoins24h(acc);
    })();

    return () => {
      cancelled = true;
    };
  }, [rows]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const flagged = useMemo(
    () => rows.filter((r) => (coins24h[r.id] || 0) > ANOMALY_THRESHOLD),
    [rows, coins24h],
  );

  const confirmBan = async (reason) => {
    const target = dialogUser;
    const banning = !target.parent?.is_banned;
    setBusy(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_banned: banning })
        .eq("id", target.parent.id);
      if (error) throw new Error(error.message);

      // Ghi lý do lên chính hồ sơ bé để màn hình hỗ trợ ở GĐ 2 đọc được ngay,
      // không phải join sang admin_audit_log. Lịch sử đầy đủ vẫn nằm ở audit
      // log; ở đây chỉ giữ lý do ĐANG hiệu lực nên mở khoá thì xoá đi.
      // Không throw nếu lỗi: tài khoản đã bị khoá rồi, báo lỗi sẽ gây hiểu nhầm.
      const { error: reasonErr } = await supabase
        .from("child_profiles")
        .update({ ban_reason: banning ? reason || null : null })
        .eq("id", target.id);
      if (reasonErr) console.warn("[ban_reason]", reasonErr.message);

      await logAudit({
        action: banning ? "user.ban" : "user.unban",
        entity: "profiles",
        entityId: target.parent.id,
        before: { is_banned: target.parent.is_banned },
        after: { is_banned: banning },
        reason: reason || null,
      });

      setDialogUser(null);
      setMessage({
        type: "ok",
        text: banning
          ? `Đã khoá tài khoản ${target.parent.email}.`
          : `Đã mở khoá tài khoản ${target.parent.email}.`,
      });
      await load();
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Người dùng</h1>
        <p className="mt-1 text-sm text-slate-500">
          Danh sách tài khoản phụ huynh và hồ sơ bé. Tìm theo tên bé hoặc email
          phụ huynh.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm tên bé hoặc email phụ huynh…"
          className="w-80 rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <span className="text-sm text-slate-500">{total} hồ sơ bé</span>
        {flagged.length > 0 && (
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            ⚠️ {flagged.length} bé có Xu tăng bất thường trong 24h
          </span>
        )}
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

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
              <th className="px-5 py-3 font-medium">Bé</th>
              <th className="px-3 py-3 font-medium">Phụ huynh</th>
              <th className="px-3 py-3 font-medium">Hoạt động</th>
              <th className="px-3 py-3 font-medium">Chuỗi</th>
              <th className="px-3 py-3 font-medium">Xu</th>
              <th className="px-3 py-3 font-medium">Xu/24h</th>
              <th className="px-3 py-3 font-medium">Trạng thái</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-8 text-center text-slate-400"
                >
                  Đang tải…
                </td>
              </tr>
            )}

            {!loading && rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-8 text-center text-slate-400"
                >
                  Không có hồ sơ nào khớp.
                </td>
              </tr>
            )}

            {!loading &&
              rows.map((row) => {
                const prog = one(row.progress);
                const act = activityOf(row.progress);
                const banned = row.parent?.is_banned;
                const last24 = coins24h[row.id] || 0;
                const suspicious = last24 > ANOMALY_THRESHOLD;
                const lessonCount = prog?.completed_lessons
                  ? Object.keys(prog.completed_lessons).length
                  : 0;

                return (
                  <tr
                    key={row.id}
                    className={`border-b border-slate-50 last:border-0 ${
                      banned ? "bg-red-50/40" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{row.avatar}</span>
                        <div>
                          <Link
                            to={`/users/${row.id}`}
                            className="font-medium text-indigo-700 hover:underline"
                          >
                            {row.nickname}
                          </Link>
                          <div className="text-xs text-slate-400">
                            Lớp {row.grade} · Cấp {row.level} · {lessonCount}{" "}
                            bài
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-600">
                      <div
                        className="max-w-[180px] truncate"
                        title={row.parent?.email}
                      >
                        {row.parent?.email || "—"}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${TONE[act.tone]}`}
                      >
                        {act.label}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular-nums text-slate-600">
                      {prog?.current_streak ?? 0}
                      <span className="text-xs text-slate-400">
                        {" "}
                        / {prog?.longest_streak ?? 0}
                      </span>
                    </td>
                    <td className="px-3 py-3 tabular-nums text-slate-700">
                      {row.coins}
                    </td>
                    <td className="px-3 py-3 tabular-nums">
                      {suspicious ? (
                        <span
                          className="font-semibold text-amber-700"
                          title="Vượt ngưỡng 500 Xu/24h"
                        >
                          ⚠️ +{last24}
                        </span>
                      ) : (
                        <span className="text-slate-500">+{last24}</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {banned ? (
                        <span
                          title={row.ban_reason || "Không có lý do được ghi"}
                          className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
                        >
                          Đã khoá
                        </span>
                      ) : (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Hoạt động
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setDialogUser(row)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          banned
                            ? "text-emerald-700 hover:bg-emerald-50"
                            : "text-red-700 hover:bg-red-50"
                        }`}
                      >
                        {banned ? "Mở khoá" : "Khoá"}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Trang {page} / {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Trước
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sau →
          </button>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Khoá tài khoản sẽ khiến phụ huynh không thể đăng nhập app của bé. Mọi
        thao tác được ghi vào{" "}
        <code className="mx-1 rounded bg-slate-100 px-1">admin_audit_log</code>{" "}
        kèm lý do.
      </p>

      {dialogUser && (
        <BanDialog
          user={dialogUser}
          busy={busy}
          onClose={() => setDialogUser(null)}
          onConfirm={confirmBan}
        />
      )}
    </div>
  );
}
