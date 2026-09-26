import { createClient } from "@supabase/supabase-js";
import { coHen } from "./henGio";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () =>
  typeof supabaseUrl === "string" &&
  supabaseUrl.startsWith("https://") &&
  !supabaseUrl.includes("your-project-id") &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes("your-supabase-anon-key");

// Phần LOGIC hẹn giờ nằm ở `henGio.js` — cố ý tách ra thành file thuần
// (không import gì, không đọc `import.meta.env`) để cổng `S-19` `import()` thẳng
// nó trong Node và **thử thật** ba hành vi, thay vì chỉ grep chuỗi rồi tin.
// Lý do cần hẹn giờ, kèm số đo: xem đầu file đó.

// Bọc client sao cho MỌI truy vấn `.from()` / `.rpc()` — kể cả chỗ viết sau
// này — đều tự động có hẹn giờ, mà không phải sửa 27 chỗ gọi.
//
// Cách làm: trả về một vật che (proxy) vừa CHUYỂN TIẾP mọi hàm dựng truy vấn
// (`.select`, `.eq`, `.single`, …) vừa cài `then` để lúc `await` thì đi qua
// `coHen`. Chuỗi `.from(x).select(y).eq(z)` vì thế vẫn chạy y như trước.
//
// `auth` KHÔNG bị bọc — nó không phải hàm dựng truy vấn, và hẹn giờ cho
// `getSession`/`refreshToken` có thể làm treo phiên đăng nhập.
function bocHenGio(client) {
  const boc = (q) => {
    const api = {
      then: (ok, loi) => coHen(q).then(ok, loi),
      catch: (loi) => coHen(q).catch(loi),
      finally: (f) => coHen(q).finally(f),
    };
    return new Proxy(api, {
      get(t, p) {
        if (p in t) return t[p];
        const v = q[p];
        return typeof v === "function" ? (...a) => boc(v.apply(q, a)) : v;
      },
    });
  };

  return new Proxy(client, {
    get(t, p) {
      const v = t[p];
      if (p === "from" || p === "rpc") return (...a) => boc(v.apply(t, a));
      return typeof v === "function" ? v.bind(t) : v;
    },
  });
}

// Dùng CHUNG project Supabase với app chính, nhưng CHỈ với anon key.
// Toàn bộ quyền hạn được quyết định bởi RLS + is_admin() ở phía database.
export const supabase = isSupabaseConfigured()
  ? bocHenGio(
      createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      }),
    )
  : null;

// Chỉ ở chế độ dev: phơi client ra Console để test thủ công
// (test kiểm ở scripts/test-admin-portal.mjs). Cần thiết ở ĐÂY vì test quyền admin
// (`__sb.rpc('is_admin')`) phải chạy trong session admin — mà chỗ tự nhiên
// nhất để có session admin chính là Admin Portal.
// Vite thay `import.meta.env.DEV` bằng `false` lúc build production nên nhánh
// này bị loại bỏ hoàn toàn khỏi bundle phát hành.
if (import.meta.env.DEV && supabase && typeof window !== "undefined") {
  window.__sb = supabase;
  console.info("[dev] window.__sb đã sẵn sàng để test thủ công.");
}
