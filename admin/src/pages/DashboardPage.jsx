import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAdminAuth } from "../auth/AdminAuthProvider";

/**
 * Kiểm tra kết nối + quyền, đồng thời là smoke test cho DoD của Giai đoạn 0:
 *   1. Đọc được app_config            -> policy app_config_public_read
 *   2. Đếm được profiles              -> policy profiles_admin_read
 *   3. Đọc được admin_audit_log       -> policy admin_audit_log_admin_read
 *
 * Nếu mục 2 hoặc 3 báo lỗi, RLS chưa được cấu hình đúng.
 */
function useSmokeTest(enabled) {
  const [checks, setChecks] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const run = async () => {
      const result = {};

      const config = await supabase
        .from("app_config")
        .select("key, value")
        .order("key");
      result.appConfig = config.error
        ? { ok: false, detail: config.error.message }
        : { ok: true, detail: `${config.data.length} khoá`, data: config.data };

      const profiles = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });
      result.profiles = profiles.error
        ? { ok: false, detail: profiles.error.message }
        : { ok: true, detail: `${profiles.count} tài khoản` };

      const audit = await supabase
        .from("admin_audit_log")
        .select("id", { count: "exact", head: true });
      result.auditLog = audit.error
        ? { ok: false, detail: audit.error.message }
        : { ok: true, detail: `${audit.count} bản ghi` };

      const progress = await supabase
        .from("child_progress")
        .select("child_id", { count: "exact", head: true });
      result.childProgress = progress.error
        ? { ok: false, detail: progress.error.message }
        : { ok: true, detail: `${progress.count} hồ sơ bé` };

      if (!cancelled) setChecks(result);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return checks;
}

function CheckRow({ label, check, hint }) {
  const pending = !check;
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0">
      <span className="mt-0.5 text-lg">
        {pending ? "⏳" : check.ok ? "✅" : "❌"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p
          className={`text-xs ${check && !check.ok ? "text-red-600" : "text-slate-500"}`}
        >
          {pending ? "Đang kiểm tra…" : check.detail}
        </p>
        {check && !check.ok && hint && (
          <p className="mt-1 text-xs text-slate-400">{hint}</p>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAdminAuth();
  const checks = useSmokeTest(!!user);

  const contentSource = checks?.appConfig?.data?.find(
    (r) => r.key === "content_source",
  )?.value;

  return (
    <div className="p-4 sm:p-6 lg:p-8 2xl:p-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tổng quan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Giai đoạn 0 — Vá nền &amp; bảo mật. Khung quản trị đã chạy ở bundle
          riêng.
        </p>
      </header>

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-1 text-sm font-semibold text-slate-900">
          Kiểm tra kết nối &amp; quyền
        </h2>
        <p className="mb-4 text-xs text-slate-500">
          Đọc trực tiếp từ Supabase bằng anon key. Kết quả phản ánh đúng trạng
          thái RLS.
        </p>

        <CheckRow
          label="app_config — đọc công khai"
          check={checks?.appConfig}
          hint="Kiểm tra policy app_config_public_read trong 0001_admin_foundation.sql."
        />
        <CheckRow
          label="profiles — quyền admin đọc toàn bộ"
          check={checks?.profiles}
          hint="Kiểm tra policy profiles_admin_read và function is_admin()."
        />
        <CheckRow
          label="admin_audit_log — nhật ký bất biến"
          check={checks?.auditLog}
          hint="Kiểm tra policy admin_audit_log_admin_read."
        />
        <CheckRow
          label="child_progress — đọc tiến độ học tập"
          check={checks?.childProgress}
          hint="Kiểm tra policy child_progress_admin_read."
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">
          Trạng thái hệ thống
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500">Nguồn nội dung</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {contentSource ?? "—"}
              <span className="ml-2 text-xs font-normal text-slate-400">
                (kill switch GĐ 3)
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Tài khoản đăng nhập</dt>
            <dd className="mt-0.5 truncate font-medium text-slate-900">
              {user?.email}
            </dd>
          </div>
        </dl>
      </section>

      <p className="mt-6 text-xs text-slate-400">
        Màn hình Người dùng và Kinh tế Xu/XP sẽ được bổ sung ở Giai đoạn 1.
      </p>
    </div>
  );
}
