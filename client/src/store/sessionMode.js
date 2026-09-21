import { createJSONStorage } from "zustand/middleware";
import { isSupabaseConfigured } from "../services/supabaseClient";
import { shouldPersist } from "./persistRule";

/**
 * Chế độ Khách: KHÔNG lưu gì xuống máy.
 *
 * 🔴 Vì sao chặn ở tầng STORAGE chứ không chặn ở từng store: có 4 store cùng ghi
 * `localStorage` (`toan-vui-user`, `toan-vui-progress`, `toan-vui-pet`,
 * `math_edu_league_storage`). Chặn từng store là 4 cơ hội để sót một chỗ — và chỗ bị sót
 * sẽ lặng lẽ ghi dữ liệu của khách xuống máy, đúng thứ cần chặn. Bọc ở đây thì chỉ có
 * MỘT đường ghi, và mọi store dùng chung một luật.
 *
 * ⚠️ Chỉ chặn khi Supabase ĐÃ được cấu hình. Nếu chưa cấu hình thì cả app luôn ở chế độ
 * Khách và `localStorage` là chỗ lưu DUY NHẤT ⇒ chặn ở đó là xoá sạch tiến độ của bé.
 */

const PRIVATE_KEYS = [
  "toan-vui-user",
  "toan-vui-progress",
  "toan-vui-pet",
  "math_edu_league_storage",
];

// Mặc định là Khách — an toàn hơn: trước khi biết có phiên đăng nhập hay không thì
// không ghi gì. `useAuthStore` sẽ hạ cờ này xuống khi xác nhận có phiên thật.
let guestMode = true;

/** Xoá dữ liệu riêng đang nằm trên máy. */
export function clearPrivateKeys() {
  try {
    for (const key of PRIVATE_KEYS) localStorage.removeItem(key);
  } catch (e) {
    console.warn("Không xoá được dữ liệu riêng trên máy:", e?.message);
  }
}

export function isGuestMode() {
  return guestMode;
}

export function setGuestMode(value) {
  const next = !!value;
  if (next === guestMode) return;
  guestMode = next;

  // Vào chế độ Khách (đăng xuất) ⇒ xoá dữ liệu của người vừa đăng xuất.
  //
  // 🔴 KHÔNG được bỏ bước này. Vì khách không ghi được, dữ liệu cũ sẽ NẰM LẠI máy; lần
  // mở app sau (lúc đó là khách) sẽ nạp lại đúng dữ liệu đó và hiển thị Xu/tiến độ của
  // người cũ cho khách. "Không ghi" một mình là chưa đủ nếu không xoá cái đã ghi.
  if (next) clearPrivateKeys();
}

/**
 * Bọc storage của `zustand/persist`: chế độ Khách thì bỏ qua mọi lần GHI.
 * Đọc (`getItem`) vẫn nguyên vẹn — dữ liệu của người đã đăng nhập vẫn phải nạp được.
 */
export function createGuestAwareStorage() {
  const base = createJSONStorage(() => localStorage);
  if (!base) return undefined;

  // Luật nằm ở `persistRule.js` (file THUẦN) để cổng `S-31` test được thật bằng Node —
  // xem ghi chú ở đầu file đó.
  const canPersist = () =>
    shouldPersist({
      guestMode,
      supabaseConfigured: isSupabaseConfigured(),
    });

  return {
    getItem: base.getItem,
    setItem: (name, value) => {
      if (!canPersist()) return;
      return base.setItem(name, value);
    },
    removeItem: base.removeItem,
  };
}
