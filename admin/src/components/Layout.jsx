import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../auth/AdminAuthProvider";

// Các mục sẽ mở ở giai đoạn sau. Giữ ở đây để thấy lộ trình,
// nhưng KHÔNG render thành link để tránh bấm vào trang trống.
const ROADMAP = [{ label: "Nội dung bài học", phase: "GĐ 3", icon: "📚" }];

// Một chỗ khai báo menu để sidebar dùng chung, không lặp lại 5 lần NavLink.
const NAV = [
  { to: "/", end: true, icon: "🏠", label: "Tổng quan" },
  { to: "/users", icon: "👥", label: "Người dùng" },
  { to: "/economy", icon: "🪙", label: "Kinh tế Xu/XP" },
  { to: "/reports", icon: "📮", label: "Báo lỗi câu hỏi" },
  { to: "/analytics", icon: "📊", label: "Phân tích câu hỏi" },
];

// SVG nội tuyến chứ không dùng thư viện icon: admin portal không có
// `lucide-react`, và thêm một dependency chỉ để vẽ 3 đường kẻ là không đáng.
// SVG nét đẹp hơn ký tự `☰` (ký tự này render rất khác nhau giữa các máy).
const MenuIcon = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ) : (
      <>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h16" />
      </>
    )}
  </svg>
);

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
    isActive
      ? "bg-indigo-600 text-white"
      : "hover:bg-slate-700 hover:text-white"
  }`;

export default function Layout() {
  const { user, signOut } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Đóng ngăn kéo mỗi khi đổi trang. Thiếu dòng này thì ở mobile bấm một mục xong
  // ngăn kéo vẫn phủ kín màn hình, phải bấm thêm lần nữa mới thấy nội dung.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Khoá cuộn nền khi ngăn kéo mở — không thì vuốt trên ngăn kéo lại cuộn trang
  // phía sau, rất khó chịu trên điện thoại.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Thanh trên cùng — CHỈ hiện ở mobile/tablet. Từ `lg` trở lên sidebar luôn
          hiện nên không cần. Nút này cũng là nút ĐÓNG lúc ngăn kéo đang mở: nó
          nằm TRÊN ngăn kéo (z-50 > z-30) nên lúc nào cũng bấm được.

          🔴 `h-14` ở đây PHẢI khớp với `pt-14` của `<main>` và `pt-14` của
          `<aside>` bên dưới. Đã đo lúc đầu: để thanh tự cao theo nội dung thì nó
          ra 57px (do border), trong khi `pt-14` chỉ 56px → nội dung bị đè mất 1px.
          Ghim cùng một token `14` thì ba chỗ không thể lệch nhau nữa. */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-2 border-b border-slate-700 bg-slate-800 px-3 text-slate-200 lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="admin-sidebar"
          className="rounded-lg p-2 transition hover:bg-slate-800 hover:text-white"
        >
          <MenuIcon open={menuOpen} />
        </button>
        <span className="text-lg">🧮</span>
        <span className="truncate text-sm font-semibold text-white">
          Toán Vui — Admin
        </span>
      </header>

      {/* Nền mờ. Bấm ra ngoài để đóng — thao tác quen thuộc trên mobile. */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
        />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col overflow-y-auto bg-slate-800 pt-14 text-slate-200 transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 lg:pt-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Khối thương hiệu TRÙNG với thanh trên cùng ở mobile → ẩn ở đó đi. */}
        <div className="hidden border-b border-slate-700 px-5 py-4 lg:block">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧮</span>
            <div>
              <p className="text-sm font-semibold text-white">Toán Vui</p>
              {/* `slate-500` trên `slate-800` chỉ được 3.4:1 — dưới ngưỡng 4.5:1.
                  Đã đo bằng cách tô màu lên canvas rồi đọc lại điểm ảnh. */}
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClass}
            >
              <span>{item.icon}</span> {item.label}
            </NavLink>
          ))}

          <div className="pt-4">
            <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Sắp có
            </p>
            {ROADMAP.map((item) => (
              <div
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400"
                title={`Sẽ làm ở ${item.phase}`}
              >
                {/* KHÔNG hạ `opacity` ở đây: `slate-600` vốn đã chỉ 2.4:1, nhân
                    thêm opacity 0.5 là chữ gần như mất hẳn. Mục chưa mở được thì
                    nhận ra qua nhãn "GĐ 3" và con trỏ, không cần làm mờ chữ. */}
                <span>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
                  {item.phase}
                </span>
              </div>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-700 p-3">
          <div
            className="mb-2 truncate px-2 text-xs text-slate-300"
            title={user?.email}
          >
            {user?.email}
          </div>
          <button
            onClick={signOut}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-slate-700 hover:text-white"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* `min-w-0` là BẮT BUỘC: trong flex, item mặc định có `min-width: auto` nên
          nó nở theo nội dung rộng nhất và `overflow-x-auto` mất tác dụng.
          `pt-14` để nội dung không nằm dưới thanh trên cùng ở mobile. */}
      <main className="min-w-0 flex-1 overflow-x-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
