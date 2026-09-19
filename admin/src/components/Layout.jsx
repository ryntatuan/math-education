import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "../auth/AdminAuthProvider";

// Các mục sẽ mở ở giai đoạn sau. Giữ ở đây để thấy lộ trình,
// nhưng KHÔNG render thành link để tránh bấm vào trang trống.
const ROADMAP = [
  { label: "Nội dung bài học", phase: "GĐ 3", icon: "📚" },
  { label: "Phân tích", phase: "GĐ 2", icon: "📊" },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
    isActive
      ? "bg-indigo-600 text-white"
      : "hover:bg-slate-800 hover:text-white"
  }`;

export default function Layout() {
  const { user, signOut } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 shrink-0 flex-col bg-slate-900 text-slate-300">
        <div className="border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧮</span>
            <div>
              <p className="text-sm font-semibold text-white">Toán Vui</p>
              <p className="text-xs text-slate-500">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <NavLink to="/" end className={navLinkClass}>
            <span>🏠</span> Tổng quan
          </NavLink>

          <NavLink to="/users" className={navLinkClass}>
            <span>👥</span> Người dùng
          </NavLink>

          <NavLink to="/economy" className={navLinkClass}>
            <span>🪙</span> Kinh tế Xu/XP
          </NavLink>

          <div className="pt-4">
            <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-slate-600 uppercase">
              Sắp có
            </p>
            {ROADMAP.map((item) => (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600"
                title={`Sẽ làm ở ${item.phase}`}
              >
                <span className="opacity-50">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
                  {item.phase}
                </span>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-800 p-3">
          <div
            className="mb-2 truncate px-2 text-xs text-slate-500"
            title={user?.email}
          >
            {user?.email}
          </div>
          <button
            onClick={signOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
