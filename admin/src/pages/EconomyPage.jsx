import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAdminAuth } from "../auth/AdminAuthProvider";
import { logAudit } from "../lib/audit";

/**
 * Chuẩn hoá row thô từ Postgres (snake_case) sang dạng dùng trong UI.
 * Phải làm bước này: DB trả `coins_max`, còn UI dùng `coinsMax`. Đọc thẳng
 * `r.coinsMax` trên row thô sẽ luôn ra undefined -> mất khoảng ngẫu nhiên
 * của rương bí ẩn khi lưu.
 */
const fromDb = (r) => ({
  key: r.key,
  label: r.label,
  groupName: r.group_name,
  coins: r.coins,
  coinsMax: r.coins_max ?? null,
  xp: r.xp,
  enabled: r.enabled,
});

/** Bóc phần chỉnh sửa được — dùng để so sánh dirty. */
const pick = (r) => ({
  coins: r.coins,
  coinsMax: r.coinsMax ?? null,
  xp: r.xp,
  enabled: r.enabled,
});

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Kiểm tra hợp lệ phía client. Ràng buộc thật nằm ở CHECK constraint của bảng. */
function validate(row, v) {
  if (!Number.isInteger(v.coins) || v.coins < 0)
    return "Xu phải là số nguyên ≥ 0";
  if (!Number.isInteger(v.xp) || v.xp < 0) return "XP phải là số nguyên ≥ 0";
  if (v.coinsMax != null) {
    if (!Number.isInteger(v.coinsMax)) return "Xu tối đa phải là số nguyên";
    if (v.coinsMax < v.coins) return "Xu tối đa phải ≥ Xu tối thiểu";
  }
  return null;
}

function NumberInput({ value, onChange, disabled, width = "w-24" }) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.value === "" ? "" : Number(e.target.value))
      }
      className={`${width} rounded-md border border-slate-300 px-2 py-1 text-sm tabular-nums focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400`}
    />
  );
}

export default function EconomyPage() {
  const { user } = useAdminAuth();

  const [rows, setRows] = useState([]);
  const [draft, setDraft] = useState({});
  const [multiplier, setMultiplier] = useState(1);
  const [curve, setCurve] = useState({ base: 100, growth: 1.3 });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [{ data: rewards }, { data: cfg }] = await Promise.all([
        supabase
          .from("reward_configs")
          .select("key, label, group_name, coins, coins_max, xp, enabled")
          .order("group_name")
          .order("key"),
        supabase
          .from("app_config")
          .select("key, value")
          .in("key", ["reward_multiplier", "level_curve"]),
      ]);

      if (cancelled) return;

      if (Array.isArray(rewards)) {
        const normalized = rewards.map(fromDb);
        setRows(normalized);
        setDraft(Object.fromEntries(normalized.map((r) => [r.key, pick(r)])));
      }

      const byKey = Object.fromEntries(
        (cfg || []).map((r) => [r.key, r.value]),
      );
      const m = byKey.reward_multiplier;
      const mv = Number(
        typeof m === "object" && m !== null && "value" in m ? m.value : m,
      );
      if (Number.isFinite(mv) && mv > 0) setMultiplier(mv);

      if (byKey.level_curve && typeof byKey.level_curve === "object") {
        setCurve({
          base: Number(byKey.level_curve.base) || 100,
          growth: Number(byKey.level_curve.growth) || 1.3,
        });
      }

      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const groups = useMemo(() => {
    const map = new Map();
    for (const r of rows) {
      if (!map.has(r.groupName)) map.set(r.groupName, []);
      map.get(r.groupName).push(r);
    }
    return [...map.entries()];
  }, [rows]);

  const dirtyKeys = useMemo(
    () => rows.filter((r) => !same(pick(r), draft[r.key])).map((r) => r.key),
    [rows, draft],
  );

  const setField = (key, field, value) => {
    setDraft((d) => ({ ...d, [key]: { ...d[key], [field]: value } }));
    setErrors((e) => ({ ...e, [key]: null }));
    setMessage(null);
  };

  const saveAll = async () => {
    const bad = {};
    for (const key of dirtyKeys) {
      const row = rows.find((r) => r.key === key);
      const err = validate(row, draft[key]);
      if (err) bad[key] = err;
    }
    if (Object.keys(bad).length > 0) {
      setErrors(bad);
      setMessage({
        type: "error",
        text: "Có ô nhập không hợp lệ, chưa lưu gì cả.",
      });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      for (const key of dirtyKeys) {
        const row = rows.find((r) => r.key === key);
        const next = draft[key];

        const { error } = await supabase
          .from("reward_configs")
          .update({
            coins: next.coins,
            coins_max: next.coinsMax,
            xp: next.xp,
            enabled: next.enabled,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
          })
          .eq("key", key);

        if (error) throw new Error(`${key}: ${error.message}`);

        await logAudit({
          action: "reward_config.update",
          entity: "reward_configs",
          entityId: key,
          before: pick(row),
          after: next,
        });
      }

      const { error: mErr } = await supabase
        .from("app_config")
        .update({
          value: { value: multiplier },
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq("key", "reward_multiplier");
      if (mErr) throw new Error(`reward_multiplier: ${mErr.message}`);

      const { error: cErr } = await supabase
        .from("app_config")
        .update({
          value: curve,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
        })
        .eq("key", "level_curve");
      if (cErr) throw new Error(`level_curve: ${cErr.message}`);

      await logAudit({
        action: "app_config.update",
        entity: "app_config",
        entityId: "reward_multiplier,level_curve",
        after: { multiplier, curve },
      });

      setRows((prev) =>
        prev.map((r) =>
          dirtyKeys.includes(r.key) ? { ...r, ...draft[r.key] } : r,
        ),
      );
      setMessage({
        type: "ok",
        text: `Đã lưu ${dirtyKeys.length} thay đổi. App của bé sẽ nhận giá trị mới ở lần mở kế tiếp.`,
      });
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-8 text-sm text-slate-500">Đang tải cấu hình…</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Kinh tế Xu/XP</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sửa xong bấm Lưu — app của bé nhận giá trị mới{" "}
          <strong>không cần build lại</strong>.
        </p>
      </header>

      {/* Cấu hình toàn cục */}
      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Cấu hình toàn cục
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Hệ số nhân Xu/XP
            </label>
            <p className="mt-0.5 mb-2 text-xs text-slate-500">
              Áp cho toàn bộ phần thưởng. Đặt <strong>2</strong> để bật sự kiện
              X2.
            </p>
            <NumberInput
              value={multiplier}
              onChange={(v) => {
                setMultiplier(v);
                setMessage(null);
              }}
              width="w-28"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Công thức lên cấp
            </label>
            <p className="mt-0.5 mb-2 text-xs text-slate-500">
              XP cần ở cấp đầu, mỗi cấp nhân thêm hệ số.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span>Base</span>
              <NumberInput
                value={curve.base}
                onChange={(v) => {
                  setCurve((c) => ({ ...c, base: v }));
                  setMessage(null);
                }}
                width="w-20"
              />
              <span>×</span>
              <NumberInput
                value={curve.growth}
                onChange={(v) => {
                  setCurve((c) => ({ ...c, growth: v }));
                  setMessage(null);
                }}
                width="w-20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Thông báo */}
      {message && (
        <div
          className={`mb-6 rounded-lg px-4 py-3 text-sm ${
            message.type === "ok"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Bảng phần thưởng */}
      {groups.map(([groupName, items]) => (
        <section
          key={groupName}
          className="mb-6 rounded-xl border border-slate-200 bg-white"
        >
          <h2 className="border-b border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900">
            {groupName}
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs text-slate-500">
                <th className="px-6 py-2 font-medium">Hoạt động</th>
                <th className="px-3 py-2 font-medium">Xu</th>
                <th className="px-3 py-2 font-medium">Xu tối đa</th>
                <th className="px-3 py-2 font-medium">XP</th>
                <th className="px-3 py-2 font-medium">Bật</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => {
                const v = draft[row.key];
                const dirty = !same(pick(row), v);
                return (
                  <tr
                    key={row.key}
                    className={`border-b border-slate-50 last:border-0 ${
                      dirty ? "bg-amber-50/60" : ""
                    }`}
                  >
                    <td className="px-6 py-3">
                      <div className="font-medium text-slate-800">
                        {row.label}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {row.key}
                      </div>
                      {errors[row.key] && (
                        <div className="mt-1 text-xs text-red-600">
                          {errors[row.key]}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <NumberInput
                        value={v.coins}
                        onChange={(x) => setField(row.key, "coins", x)}
                      />
                    </td>
                    <td className="px-3 py-3">
                      {row.coinsMax == null ? (
                        <span className="text-xs text-slate-300">—</span>
                      ) : (
                        <NumberInput
                          value={v.coinsMax ?? ""}
                          onChange={(x) => setField(row.key, "coinsMax", x)}
                        />
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <NumberInput
                        value={v.xp}
                        onChange={(x) => setField(row.key, "xp", x)}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={v.enabled}
                        onChange={(e) =>
                          setField(row.key, "enabled", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}

      {/* Thanh lưu */}
      <div className="sticky bottom-0 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <span className="text-sm text-slate-600">
          {dirtyKeys.length > 0 ? (
            <>
              <strong>{dirtyKeys.length}</strong> dòng có thay đổi chưa lưu
            </>
          ) : (
            "Không có thay đổi nào"
          )}
        </span>
        <button
          onClick={saveAll}
          disabled={saving || dirtyKeys.length === 0}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {saving ? "Đang lưu…" : "Lưu thay đổi"}
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Tắt một mục sẽ khiến hoạt động đó thưởng 0 Xu và 0 XP. Mọi thay đổi được
        ghi vào
        <code className="mx-1 rounded bg-slate-100 px-1">admin_audit_log</code>.
      </p>
    </div>
  );
}
