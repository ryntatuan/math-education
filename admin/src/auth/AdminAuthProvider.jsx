import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => useContext(AdminAuthContext);

const NOT_CONFIGURED =
  "Chưa cấu hình Supabase. Tạo file admin/.env.local với VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.";

export function AdminAuthProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    user: null,
    isAdmin: false,
    error: null,
  });
  const evaluatedUserId = useRef(undefined);

  // Lý do bị từ chối. Phải giữ trong ref vì sự kiện SIGNED_OUT do chính ta
  // gọi sẽ bắn về evaluate(null) — nếu xoá ở đó thì người dùng không biết
  // vì sao bị đăng xuất.
  const deniedReason = useRef(null);

  /**
   * Xác định quyền admin bằng cách ĐỌC TỪ DB.
   * Không tin bất cứ thứ gì lưu ở client.
   */
  const evaluate = useCallback(async (session) => {
    const userId = session?.user?.id ?? null;

    if (!userId) {
      evaluatedUserId.current = null;
      setState({
        loading: false,
        user: null,
        isAdmin: false,
        error: deniedReason.current,
      });
      return;
    }

    // Tránh gọi lặp lại cho cùng một user (onAuthStateChange bắn nhiều lần)
    if (evaluatedUserId.current === userId) return;
    evaluatedUserId.current = userId;

    const { data, error } = await supabase
      .from("profiles")
      .select("role, is_banned")
      .eq("id", userId)
      .single();

    if (error) {
      // Lỗi truy vấn — KHÁC với "đã đăng nhập nhưng không phải admin".
      // Nguyên nhân thường gặp: migration 0001 chưa chạy (thiếu cột role).
      deniedReason.current = `Không đọc được hồ sơ: ${error.message}`;
    } else if (data?.is_banned) {
      deniedReason.current = "Tài khoản này đã bị khoá.";
    } else if (data?.role !== "admin") {
      deniedReason.current = `Tài khoản ${session.user.email} chưa được cấp quyền quản trị.`;
    } else {
      deniedReason.current = null;
    }

    if (deniedReason.current) {
      // scope 'local' là đủ: chỉ cần xoá phiên trên máy này. 'global' gọi
      // thêm một request lên server và có thể trả 400 nếu token đã bị huỷ.
      await supabase.auth.signOut({ scope: "local" });
      evaluatedUserId.current = null;
      setState({
        loading: false,
        user: null,
        isAdmin: false,
        error: deniedReason.current,
      });
      return;
    }

    setState({
      loading: false,
      user: session.user,
      isAdmin: true,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setState({
        loading: false,
        user: null,
        isAdmin: false,
        error: NOT_CONFIGURED,
      });
      return;
    }

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Đẩy ra ngoài callback: gọi hàm async (đặc biệt là signOut) ngay bên
        // trong onAuthStateChange có thể gây deadlock trong supabase-js.
        setTimeout(() => evaluate(session), 0);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [evaluate]);

  const signIn = async () => {
    if (!isSupabaseConfigured()) {
      setState((s) => ({ ...s, error: NOT_CONFIGURED }));
      return;
    }
    // Người dùng chủ động đăng nhập lại -> xoá thông báo từ chối cũ
    deniedReason.current = null;
    setState((s) => ({ ...s, error: null }));
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
  };

  const signOut = async () => {
    evaluatedUserId.current = undefined;
    deniedReason.current = null;
    await supabase.auth.signOut({ scope: "local" });
    setState({ loading: false, user: null, isAdmin: false, error: null });
  };

  return (
    <AdminAuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
