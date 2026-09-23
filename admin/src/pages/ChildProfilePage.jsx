import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * Hồ sơ 1 bé — Giai đoạn 2a.
 *
 * CHỈ ĐỌC. Mọi thao tác ghi (khoá tài khoản, sửa giá…) nằm ở màn hình khác.
 * Lý do tách riêng: màn hình này là chỗ để TRA CỨU khi phụ huynh gọi lên, nên
 * nó phải mở được nhanh và không có nút nào bấm nhầm gây hậu quả.
 *
 * Nguồn dữ liệu: child_profiles ⨝ profiles ⨝ child_progress ⨝ child_pets
 *              + child_mistakes + coin_transactions + xp_events
 */

// PostgREST trả object cho quan hệ 1:1 nhưng có thể trả mảng tuỳ phiên bản
const one = (v) => (Array.isArray(v) ? v[0] : v) ?? null;

/**
 * `app_config.value` là JSONB và có thể là số trần (`21`) hoặc bọc trong object
 * (`{value: 21}`) — `rewardService.unwrapJsonb` ở client chấp nhận cả hai, nên ở đây
 * cũng phải. Trả `null` khi không đọc được, KHÔNG trả 0: `0` là một phiên bản hợp lệ.
 */
const jsonbNumber = (raw) => {
  const v = raw?.value;
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && typeof v.value === "number") return v.value;
  if (typeof v === "string" && v.trim() !== "") return Number(v);
  return null;
};

/**
 * `:childId` đến từ URL nên có thể là chuỗi rác (gõ tay, bookmark cũ, link dán
 * thiếu ký tự). Gửi thẳng lên PostgREST sẽ nhận 400 `invalid input syntax for
 * type uuid`, và hiện lỗi đó ra màn hình thì vô nghĩa với người dùng.
 */
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v) => UUID_RE.test(v || "");

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

const fmtDate = (s) => (s ? new Date(s).toLocaleDateString("vi-VN") : "—");

/** Số ngày kể từ một mốc — dùng để hiện "3 ngày trước". */
const daysSince = (s) => {
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
};

function relativeDay(s) {
  const days = daysSince(s);
  if (days == null) return "—";
  if (days <= 0) return "Hôm nay";
  if (days === 1) return "Hôm qua";
  return `${days} ngày trước`;
}

function Card({ title, hint, children, tone = "slate" }) {
  const ring = {
    slate: "border-slate-200",
    amber: "border-amber-200",
    red: "border-red-200",
  }[tone];

  return (
    <section className={`rounded-xl border ${ring} bg-white`}>
      <header className="border-b border-slate-100 px-5 py-3">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Stat({ label, value, hint, tone = "slate" }) {
  const color = {
    slate: "text-slate-900",
    amber: "text-amber-700",
    emerald: "text-emerald-700",
  }[tone];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-0.5 text-lg font-semibold ${color}`}>{value}</div>
      {hint && <div className="text-xs text-slate-400">{hint}</div>}
    </div>
  );
}

function Empty({ children }) {
  return <p className="py-6 text-center text-sm text-slate-400">{children}</p>;
}

/**
 * Nội dung máy bé này đang thấy — DoD #6 của GĐ 3 (xem
 * `supabase/migrations/0013_content_report_and_create_lesson.sql`).
 *
 * Vì sao cần: khi phụ huynh báo "bài vẫn sai", cách xử lý KHÁC HẲN nhau tuỳ máy bé
 * đang thấy bản nào:
 *   • phiên bản = bản mới nhất  -> nội dung trên DB mới là thứ cần sửa
 *   • phiên bản cũ / nguồn `static` -> máy bé chưa nhận bản mới, chỉ cần bé mở app
 *     khi có mạng; sửa nội dung là vô ích
 *
 * ⚠️ Đây là BÁO CÁO của lần cuối máy bé CÒN MẠNG, không phải trạng thái trực tiếp —
 * nên luôn hiện kèm mốc thời gian, để người đọc tự đánh giá độ mới.
 */
function ContentSeen({ progress, currentVersion }) {
  const reportedAt = progress?.content_seen_at;
  const version = progress?.content_version;
  const source =
    {
      db: "đọc thẳng từ DB",
      cache: "cache trong máy",
      static: "file trong bundle (bản lúc build app)",
    }[progress?.content_source] ?? "chưa rõ nguồn";

  const behind =
    currentVersion != null && (version == null || version < currentVersion);

  if (!reportedAt) {
    return (
      <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Máy bé này <strong>chưa báo</strong> phiên bản nội dung lần nào — bé
        chưa đồng bộ lên đám mây kể từ khi tính năng này được bật.
      </p>
    );
  }

  return (
    <div
      className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
        behind ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="text-slate-700">
        <strong>Nội dung bé đang thấy:</strong>{" "}
        {version == null
          ? "không có số (đang chạy bản trong bundle)"
          : `phiên bản ${version}`}{" "}
        · {source} · báo lúc {fmtDateTime(reportedAt)}
      </div>
      {behind && (
        <div className="mt-1 text-amber-800">
          ⚠️ Nội dung hiện tại là <strong>phiên bản {currentVersion}</strong> —
          máy bé này có thể còn thấy bản cũ. Cách xử lý thường gặp là để bé mở
          app khi có mạng (app tự kiểm lại lúc mở và mỗi lần đổi màn hình),{" "}
          <strong>không</strong> phải sửa nội dung.
        </div>
      )}
    </div>
  );
}

/**
 * Suy giảm 2% cho mỗi GIỜ TRÒN đã trôi qua — phải giống hệt client
 * (`usePetStore.decayByHour`), nếu không phụ huynh và bé sẽ thấy hai số khác nhau.
 * Mốc thời gian là ISO string đọc từ `child_pets`.
 */
const DECAY_PER_HOUR = 2;
const decayByHour = (value, isoTimestamp) => {
  const raw = Number(value) || 0;
  if (!isoTimestamp) return Math.round(raw);
  const hours = Math.max(
    0,
    Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 3600000),
  );
  return Math.max(0, Math.min(100, Math.round(raw - hours * DECAY_PER_HOUR)));
};

export default function ChildProfilePage() {
  const { childId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Chặn UUID sai định dạng trước khi gọi API — xem chú thích ở `isUuid`.
      if (!isUuid(childId)) {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 5 truy vấn độc lập -> chạy song song, không phải chờ nhau
        const [childRes, mistakesRes, txRes, xpRes, cfgRes] = await Promise.all(
          [
            supabase
              .from("child_profiles")
              .select(
                `id, nickname, grade, avatar, level, xp, total_xp_for_next_level,
               coins, is_active, ban_reason, created_at,
               parent:profiles!child_profiles_parent_id_fkey (id, email, full_name, is_banned),
               progress:child_progress (current_streak, longest_streak, last_active_date,
                                        completed_lessons, exercise_results, math_race_wins,
                                        total_games_played, updated_at,
                                        content_version, content_source, content_seen_at),
               pet:child_pets (*)`,
              )
              .eq("id", childId)
              .maybeSingle(),

            supabase
              .from("child_mistakes")
              .select(
                "id, question, answer, stage, failed_count, mastered, next_review_date, created_at",
              )
              .eq("child_id", childId)
              .order("failed_count", { ascending: false })
              .limit(100),

            supabase
              .from("coin_transactions")
              .select("id, amount, reason, ref_id, balance_after, created_at")
              .eq("child_id", childId)
              .order("created_at", { ascending: false })
              .limit(100),

            supabase
              .from("xp_events")
              .select("id, amount, source, created_at")
              .eq("child_id", childId)
              .order("created_at", { ascending: false })
              .limit(100),

            // Phiên bản nội dung ĐANG có trên hệ thống — để so với số mà máy bé báo.
            supabase
              .from("app_config")
              .select("key,value")
              .eq("key", "content_version")
              .maybeSingle(),
          ],
        );

        if (childRes.error) throw new Error(childRes.error.message);
        if (cancelled) return;

        setData({
          child: childRes.data,
          mistakes: mistakesRes.data || [],
          mistakesError: mistakesRes.error?.message ?? null,
          transactions: txRes.data || [],
          transactionsError: txRes.error?.message ?? null,
          xpEvents: xpRes.data || [],
          xpError: xpRes.error?.message ?? null,
          currentContentVersion: jsonbNumber(cfgRes.data),
        });
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [childId]);

  if (loading) {
    return (
      <div className="p-4 text-center text-slate-400 sm:p-8">Đang tải…</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 2xl:p-10">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      </div>
    );
  }

  if (!data?.child) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 2xl:p-10">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-8 text-center">
          <p className="text-sm text-slate-600">Không tìm thấy hồ sơ bé này.</p>
          <Link
            to="/users"
            className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:underline"
          >
            ← Về danh sách người dùng
          </Link>
        </div>
      </div>
    );
  }

  const { child, mistakes, transactions, xpEvents } = data;
  const parent = one(child.parent);
  const progress = one(child.progress) || {};
  const pet = one(child.pet);

  const completedLessons = progress.completed_lessons || {};
  const lessonEntries = Object.entries(completedLessons);
  const starsTotal = lessonEntries.reduce(
    (sum, [, v]) => sum + (v?.stars || 0),
    0,
  );

  const xpNeeded = child.total_xp_for_next_level || 100;
  const xpPercent = Math.min(100, Math.round((child.xp / xpNeeded) * 100));

  const banned = parent?.is_banned;
  const masteredCount = mistakes.filter((m) => m.mastered).length;
  const learningCount = mistakes.length - masteredCount;

  const coinsIn = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const coinsOut = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-5 p-4 sm:p-6 lg:p-8 2xl:p-10">
      <Link
        to="/users"
        className="inline-block text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Danh sách người dùng
      </Link>

      {/* ── Danh tính + trạng thái ─────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{child.avatar}</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {child.nickname}
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Lớp {child.grade} · Cấp {child.level} · Tạo ngày{" "}
                {fmtDate(child.created_at)}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Phụ huynh:{" "}
                <strong className="font-medium">{parent?.email}</strong>
                {parent?.full_name ? ` (${parent.full_name})` : ""}
              </p>
            </div>
          </div>

          <div className="text-right">
            {banned ? (
              <span className="inline-block rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                Đã khoá
              </span>
            ) : (
              <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Hoạt động
              </span>
            )}
            {banned && child.ban_reason && (
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Lý do: {child.ban_reason}
              </p>
            )}
          </div>
        </div>

        {/* Tiến độ cấp độ */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              XP: <strong className="text-slate-700">{child.xp}</strong> /{" "}
              {xpNeeded}
            </span>
            <span>
              {xpPercent}% tới cấp {child.level + 1}
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Xu hiện có" value={`🪙 ${child.coins}`} />
          <Stat label="Cấp độ" value={child.level} />
          <Stat
            label="Chuỗi hiện tại"
            value={`${progress.current_streak || 0} ngày`}
            hint={`Dài nhất: ${progress.longest_streak || 0} ngày`}
            tone={(progress.current_streak || 0) > 0 ? "emerald" : "slate"}
          />
          <Stat
            label="Hoạt động lần cuối"
            value={relativeDay(progress.last_active_date)}
            hint={
              progress.last_active_date ? "Theo last_active_date" : undefined
            }
          />
        </div>

        {/* Nội dung máy bé đang thấy — DoD #6 của GĐ 3. */}
        <ContentSeen
          progress={progress}
          currentVersion={data.currentContentVersion}
        />
      </section>

      {/* ── Tiến độ học tập ───────────────────────────────────────── */}
      <Card
        title="Tiến độ học tập"
        hint="Suy ra từ child_progress — không cần bảng mới"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Bài đã hoàn thành"
            value={lessonEntries.length}
            hint={`${starsTotal} sao đạt được`}
          />
          <Stat
            label="Ván mini game"
            value={progress.total_games_played || 0}
            hint={`Thắng đua xe: ${progress.math_race_wins || 0}`}
          />
          <Stat
            label="Chuỗi dài nhất"
            value={`${progress.longest_streak || 0} ngày`}
          />
          <Stat
            label="Đồng bộ lần cuối"
            value={progress.updated_at ? fmtDate(progress.updated_at) : "—"}
          />
        </div>

        {lessonEntries.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">
              Xem danh sách bài đã hoàn thành ({lessonEntries.length})
            </summary>
            <div className="mt-3 flex flex-wrap gap-2">
              {lessonEntries.map(([lessonId, v]) => (
                <span
                  key={lessonId}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600"
                >
                  {lessonId} · {"⭐".repeat(v?.stars || 0) || "0 sao"}
                </span>
              ))}
            </div>
          </details>
        )}
      </Card>

      {/* ── Sổ tay lỗi sai ────────────────────────────────────────── */}
      <Card
        title="Sổ tay lỗi sai"
        hint="Ôn tập ngắt quãng: bậc 1 → 2 → 3 → 4 (thuộc). Sắp xếp theo số lần sai."
        tone={mistakes.length > 0 ? "slate" : "amber"}
      >
        {mistakes.length === 0 ? (
          <Empty>
            Chưa có câu sai nào được ghi nhận cho bé này.
            <br />
            <span className="text-xs">
              (Dữ liệu chỉ có từ khi client bắt đầu đồng bộ lên child_mistakes)
            </span>
          </Empty>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Stat label="Tổng câu sai" value={mistakes.length} />
              <Stat label="Đang ôn" value={learningCount} tone="amber" />
              <Stat label="Đã thuộc làu" value={masteredCount} tone="emerald" />
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                    <th className="px-3 py-2 font-medium">Câu hỏi</th>
                    <th className="px-3 py-2 font-medium">Đáp án</th>
                    <th className="px-3 py-2 font-medium">Số lần sai</th>
                    <th className="px-3 py-2 font-medium">Bậc</th>
                    <th className="px-3 py-2 font-medium">Ôn lại</th>
                  </tr>
                </thead>
                <tbody>
                  {mistakes.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="max-w-md px-3 py-2 text-slate-700">
                        {m.question}
                      </td>
                      <td className="px-3 py-2 text-slate-500">{m.answer}</td>
                      <td className="px-3 py-2">
                        <span className="font-medium text-red-600">
                          {m.failed_count}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {m.mastered ? (
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            Thuộc
                          </span>
                        ) : (
                          `${m.stage}/4`
                        )}
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {m.mastered ? "—" : fmtDate(m.next_review_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>

      {/* ── Sổ cái Xu ─────────────────────────────────────────────── */}
      <Card
        title="Lịch sử giao dịch Xu"
        hint={`100 giao dịch gần nhất · cộng ${coinsIn} / trừ ${coinsOut}`}
      >
        {transactions.length === 0 ? (
          <Empty>Chưa có giao dịch nào.</Empty>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                  <th className="px-3 py-2 font-medium">Thời điểm</th>
                  <th className="px-3 py-2 font-medium">Lý do</th>
                  <th className="px-3 py-2 text-right font-medium">Thay đổi</th>
                  <th className="px-3 py-2 text-right font-medium">
                    Số dư sau
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-3 py-2 whitespace-nowrap text-slate-500">
                      {fmtDateTime(t.created_at)}
                    </td>
                    <td className="px-3 py-2">
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700">
                        {t.reason}
                      </code>
                    </td>
                    <td
                      className={`px-3 py-2 text-right font-medium ${
                        t.amount > 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {t.amount > 0 ? "+" : ""}
                      {t.amount}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-600">
                      {t.balance_after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ── Sự kiện XP ────────────────────────────────────────────── */}
      <Card title="Lịch sử XP" hint="100 sự kiện gần nhất">
        {xpEvents.length === 0 ? (
          <Empty>Chưa có sự kiện XP nào.</Empty>
        ) : (
          <div className="flex flex-wrap gap-2">
            {xpEvents.map((e) => (
              <span
                key={e.id}
                title={fmtDateTime(e.created_at)}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600"
              >
                <span className="font-medium text-indigo-600">
                  +{e.amount} XP
                </span>{" "}
                · {e.source} · {fmtDate(e.created_at)}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* ── Thú cưng ──────────────────────────────────────────────── */}
      <Card title="Thú cưng" hint="Từ child_pets">
        {!pet?.has_pet ? (
          <Empty>Bé chưa nuôi thú cưng.</Empty>
        ) : (
          (() => {
            const materializedHunger = decayByHour(
              pet.hunger,
              pet.last_fed_time,
            );
            const materializedHappiness = decayByHour(
              pet.happiness,
              pet.last_happy_time,
            );
            return (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <Stat label="Tên" value={pet.pet_name} hint={pet.pet_type} />
                <Stat label="Cấp" value={pet.level} hint={`${pet.exp} EXP`} />
                <Stat
                  label="Đói bụng"
                  value={`${materializedHunger}%`}
                  hint={pet.last_fed_time ? `Gốc: ${pet.hunger}%` : undefined}
                />
                <Stat
                  label="Vui vẻ"
                  value={`${materializedHappiness}%`}
                  hint={
                    pet.last_happy_time ? `Gốc: ${pet.happiness}%` : undefined
                  }
                />
                <Stat label="Hộp Quà" value={pet.unopened_gift_boxes || 0} />
              </div>
            );
          })()
        )}
      </Card>
    </div>
  );
}
