import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () =>
  typeof supabaseUrl === "string" &&
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project-id") &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes("your-supabase-anon-key");

// Dùng CHUNG project Supabase với app chính, nhưng CHỈ với anon key.
// Toàn bộ quyền hạn được quyết định bởi RLS + is_admin() ở phía database.
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Chỉ ở chế độ dev: phơi client ra Console để test thủ công
// (xem docs/admin_portal_test_cases.md). Cần thiết ở ĐÂY vì test quyền admin
// (`__sb.rpc('is_admin')`) phải chạy trong session admin — mà chỗ tự nhiên
// nhất để có session admin chính là Admin Portal.
// Vite thay `import.meta.env.DEV` bằng `false` lúc build production nên nhánh
// này bị loại bỏ hoàn toàn khỏi bundle phát hành.
if (import.meta.env.DEV && supabase && typeof window !== "undefined") {
  window.__sb = supabase;
  console.info("[dev] window.__sb đã sẵn sàng để test thủ công.");
}
