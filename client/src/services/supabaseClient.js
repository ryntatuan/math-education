import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === "string" &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project-id") &&
    typeof supabaseAnonKey === "string" &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes("your-supabase-anon-key")
  );
};

// Khởi tạo Supabase client nếu đã có cấu hình hợp lệ
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// Chỉ ở chế độ dev: phơi client ra Console để test thủ công (xem
// docs/admin_portal_test_cases.md). Vite thay `import.meta.env.DEV` bằng
// `false` khi build production nên nhánh này bị loại bỏ hoàn toàn khỏi
// bundle phát hành — không có rủi ro lộ gì thêm (anon key vốn đã công khai).
if (import.meta.env.DEV && supabase && typeof window !== "undefined") {
  window.__sb = supabase;
  console.info("[dev] window.__sb đã sẵn sàng để test thủ công.");
}

export default supabase;
