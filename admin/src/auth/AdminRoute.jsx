import { useAdminAuth } from "./AdminAuthProvider";
import LoginPage from "../pages/LoginPage";

/**
 * ⚠️ ĐÂY LÀ BẢO VỆ Ở TẦNG GIAO DIỆN (UX), KHÔNG PHẢI BẢO MẬT.
 *
 * Bất kỳ ai mở DevTools đều có thể gọi thẳng Supabase REST API bằng anon key
 * mà không đi qua React Router. Hàng rào thật nằm ở database:
 *   - function public.is_admin()  (SECURITY DEFINER)
 *   - Row Level Security trên từng bảng
 *
 * Component này chỉ để người dùng thường không nhìn thấy giao diện trống.
 */
export default function AdminRoute({ children }) {
  const { loading, isAdmin, error } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-indigo-600" />
          <p className="text-sm text-slate-500">
            Đang kiểm tra quyền truy cập…
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <LoginPage message={error} />;
  }

  return children;
}
