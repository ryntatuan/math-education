# 🔍 Phân Tích Toàn Diện Hệ Thống Toán Vui

> Phân tích trên source code cục bộ (không phải git) — 2026-09-21

---

## Tổng quan kiến trúc

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| **Client** (`client/`) | React 19 + Vite + Zustand + Capacitor | App học toán cho trẻ (Web + Android/iOS) |
| **Admin** (`admin/`) | React 19 + Vite + Tailwind 4 | Cổng quản trị cho admin |
| **API** (`api/`) | Vercel Serverless | Proxy TTS |
| **DB** (`supabase/`) | Supabase (PostgreSQL) | 17 migrations, RLS |
| **Scripts** | Node.js | Build, migrate, test |

---

## 🔴 LỖI TIỀM ẨN NGHIÊM TRỌNG

### 1. `schema.sql` vs migrations — kiểu dữ liệu `answer` bị xung đột

| File | Cột `answer` | Kiểu |
|---|---|---|
| [schema.sql](file:///d:/1.Jobs/6.PersonalProject/Education/supabase/schema.sql#L80) | `answer INT NOT NULL` | **INT** |
| [0004_mistakes_sync.sql](file:///d:/1.Jobs/6.PersonalProject/Education/supabase/migrations/0004_mistakes_sync.sql#L27-L28) | `ALTER COLUMN answer TYPE TEXT` | **TEXT** |

> [!CAUTION]
> `schema.sql` vẫn khai báo `answer INT NOT NULL`. Nếu ai chạy `schema.sql` từ đầu (setup mới) thì cột sẽ là `INT`, chứ không phải `TEXT` như migration 0004 đã sửa. Điều này gây ra lỗi `invalid input syntax for type integer` khi app ghi đáp án dạng chuỗi như `>`, `<`, `=`.
>
> **schema.sql cần được cập nhật `answer TEXT` để khớp với migration 0004.**

---

### 2. Race condition: `addCoins` ghi `balanceAfter` SAI

```javascript
// useUserStore.js L90-96
addCoins: (amount, reason = "unknown", refId = null) => {
  try {
    if (useAuthStore.getState().isGuest) return;
  } catch {}
  set((state) => ({ coins: state.coins + amount }));  // ← set bất đồng bộ với Zustand
  logCoinTx(amount, reason, refId, get().coins);       // ← get() có thể chưa reflect
},
```

> [!WARNING]
> `set()` trong Zustand v5 là **đồng bộ nội bộ** nhưng nếu có nhiều `addCoins` gọi liên tiếp trong cùng một microtask, `get().coins` có thể trả về giá trị chưa cập nhật. Thực tế rủi ro thấp vì Zustand set đồng bộ, nhưng `balanceAfter` trong sổ cái sẽ **không chính xác** nếu có 2 phần thưởng cấp gần nhau (ví dụ: quest hoàn thành + bài học hoàn thành cùng lúc).

---

### 3. Khách (Guest) vẫn có thể MẤT DỮ LIỆU âm thầm

```javascript
// useUserStore.js L92-93
addCoins: (amount, reason = "unknown", refId = null) => {
  try {
    if (useAuthStore.getState().isGuest) return;  // ← RETURN, không cộng xu
  } catch {}
```

> [!IMPORTANT]
> `addCoins`, `addXp`, `spendCoins`, `updateStreak`, `recordGamePlayed` — tất cả đều **chặn khách**. Nhưng khách VẪN có thể dùng app, làm bài, chơi game. Kết quả là:
> - Khách hoàn thành bài → `completeLesson()` gọi → ghi `completedLessons` OK → nhưng `progressQuest()` gọi `addCoins` → **bị nuốt**.
> - Khách chơi game → `recordGamePlayed()` gọi → **bị nuốt**, totalGamesPlayed không tăng.
> - Khách làm đúng → streak **không tăng**.
>
> Điều này có thể là **chủ ý** (không cho khách tích luỹ), nhưng trải nghiệm sẽ rất khó hiểu: bé làm đúng mà không thấy xu/XP tăng, không thấy streak đếm.

---

### 4. Leaderboard RLS **mở toàn bộ** — lỗ hổng bảo mật

```sql
-- schema.sql L186-188
CREATE POLICY "Anyone can upsert leaderboard" ON public.leaderboard
  FOR ALL USING (true) WITH CHECK (true);
```

> [!CAUTION]
> Bất kỳ ai có `anon key` (public) đều có thể:
> - **Ghi đè** điểm của bé khác (biết UUID là đủ)
> - **Spam** hàng triệu dòng bot giả vào bảng leaderboard
> - **Xoá** bản ghi bot bằng `.delete()`
>
> Nên siết RLS: chỉ cho phép INSERT/UPDATE dòng có `id = childId` thuộc `parent_id = auth.uid()`, hoặc cho phép bot qua một RPC riêng.

---

### 5. `handle_new_user()` trigger + `autoMigrateGuestDataToCloud()` — xung đột tạo trùng child

```sql
-- schema.sql L210-218 (trigger)
INSERT INTO public.child_profiles (parent_id, nickname, ...)
VALUES (NEW.id, ...) RETURNING id INTO new_child_id;
```

```javascript
// syncService.js L151-166 (client)
const { data: newChild } = await supabase
  .from("child_profiles")
  .insert({ parent_id: parentUser.id, ... })
```

> [!WARNING]
> Khi user đăng ký **lần đầu**:
> 1. Trigger `handle_new_user` tạo 1 child profile **tại server**
> 2. `autoMigrateGuestDataToCloud()` kiểm tra `existingChildren` — nếu trigger chưa commit kịp hoặc cache cũ, `existingChildren.length === 0` → **tạo thêm 1 child profile nữa**
>
> Kết quả: tài khoản có **2 bé** (trigger tạo 1, client tạo 1). Code hiện tại lấy `existingChildren[0]` nên bé thứ 2 bị bỏ rơi. Trên thực tế trigger thường commit trước, nhưng đây là race condition tiềm ẩn.

---

## 🟡 LỖI LOGIC CẦN CHÚ Ý

### 6. `spendCoins` chặn khách nhưng VẪN trả `undefined` thay vì `false`

```javascript
// useUserStore.js L98-101
spendCoins: (amount, reason, refId) => {
  try {
    if (useAuthStore.getState().isGuest) return false;
  } catch {}   // ← catch rỗng → nếu import lỗi thì tiếp tục mua hàng!
```

> [!NOTE]
> `try { } catch {}` bắt mọi lỗi rồi bỏ qua. Nếu `useAuthStore` bị lỗi import vòng, `isGuest` sẽ không bao giờ được kiểm tra → khách có thể MUA HÀNG ở shop. Tuy rủi ro thấp (import ổn), nhưng `catch {}` mà không log là bad practice.

---

### 7. `checkWeekReset` không kiểm tra tuần CŨ đã được reset chưa

```javascript
// useLeagueStore.js L350
if (now >= end) {  // ← chỉ so sánh THỜI ĐIỂM HIỆN TẠI vs CUỐI TUẦN
```

> [!WARNING]
> Nếu bé KHÔNG mở app suốt 3 tuần, rồi mở lại, `checkWeekReset` chỉ chạy **1 lần** — nó tính standings của tuần cũ, thăng/rớt hạng 1 bậc, rồi set `weekEndDate` về tuần hiện tại. Nghĩa là bé bỏ 3 tuần nhưng chỉ bị rớt **1 hạng** thay vì 3.

---

### 8. `contentSource.js` — `loadPromise` bị set `null` trong `finally` gây re-entrance

```javascript
// contentSource.js L230
} finally {
  loadPromise = null;  // ← reset ngay khi xong
}
```

> [!NOTE]
> Khi `taiNoiDung()` vừa hoàn thành, `loadPromise = null`. Nếu có 2 subscriber cùng gọi `taiNoiDung()` (ví dụ `visibilitychange` + `location.pathname` đổi cùng lúc), lần gọi thứ 2 sẽ tạo request **mới** thay vì dùng kết quả lần 1. Throttle `MIN_REFRESH_MS = 5s` đã giảm thiểu, nhưng nếu hai sự kiện xảy ra cùng lúc trong 5s đầu thì vẫn tạo 2 request.

---

### 9. Daily quests `reward` field bị cũ

```javascript
// useProgressStore.js L234-236
dailyQuests: DEFAULT_DAILY_QUESTS.map((q) => ({
  ...q,
  reward: getReward(QUEST_REWARD_KEYS[q.id]).coins,  // ← lấy lúc INIT
```

Nhưng `DEFAULT_DAILY_QUESTS` hardcode `reward: 15` và `reward: 10`. Khi `initOrResetDailyQuests` chạy, nó gọi `getReward()` đúng. **Tuy nhiên**, nếu `preloadRewardConfigs()` chưa xong lúc quest init, giá trị `reward` hiển thị sẽ là giá trị mặc định, không phải giá trị DB.

---

## 🟡 VẤN ĐỀ VỀ DỮ LIỆU & ĐỒNG BỘ

### 10. `syncService.scheduleCloudSync()` debounce chỉ 500ms

```javascript
// syncService.js L51-60
syncDebounceTimer = setTimeout(async () => {
  // ... saveCurrentProgressToCloud
}, 500);
```

> [!NOTE]
> 500ms khá ngắn. Khi bé bấm liên tục (chọn đáp án + nhận xu + XP tăng + streak tăng), mỗi thay đổi store sẽ clear + reset timer. Tuy nhiên, nếu bé chọn xong rồi ngay lập tức thoát app (kill), timer 500ms chưa kịp chạy → **dữ liệu mất**. Nên thêm `beforeunload` hoặc `appStateChange` để flush ngay.

---

### 11. Pet store KHÔNG có auto-sync

```javascript
// setupAutoSync() — syncService.js L424-461
// ❌ KHÔNG có: usePetStore.subscribe(...)
```

> [!IMPORTANT]
> `usePetStore` thay đổi (cho ăn, vuốt ve, lên cấp) **KHÔNG** trigger auto sync. `saveCurrentPetToCloud()` tồn tại nhưng KHÔNG AI GỌI tự động. Pet data chỉ sync khi `saveCurrentProgressToCloud` chạy (vì sync `child_profiles` + `child_progress`), nhưng `saveCurrentProgressToCloud` KHÔNG gọi `saveCurrentPetToCloud`.
>
> **Kết quả**: Bé cho thú cưng ăn → thay đổi chỉ ở localStorage → đăng nhập trên máy khác → pet data CŨ.

---

### 12. `LoginPage.jsx` import bị thiếu trong admin

[LoginPage.jsx](file:///d:/1.Jobs/6.PersonalProject/Education/admin/src/pages/LoginPage.jsx) được import trong [AdminRoute.jsx](file:///d:/1.Jobs/6.PersonalProject/Education/admin/src/auth/AdminRoute.jsx#L2) nhưng trang login không có trong routes — nó chỉ hiện khi `isAdmin = false`. Điều này đúng, nhưng:

Trang admin **không có route `/login`** → nếu user truy cập trực tiếp `admin.domain.com/login` → chạy vào `<Navigate to="/" replace />` → `AdminRoute` kiểm tra quyền → hiện `LoginPage`. Flow đúng, không lỗi.

---

## 🟡 VẤN ĐỀ CẤU TRÚC & BẢO TRÌ

### 13. File quá lớn, khó bảo trì

| File | Dòng | Ghi chú |
|---|---|---|
| [GamesPage.jsx](file:///d:/1.Jobs/6.PersonalProject/Education/client/src/pages/GamesPage.jsx) | ~2000+ | 79KB — chứa **6 mini games** trong 1 file |
| [LessonPage.jsx](file:///d:/1.Jobs/6.PersonalProject/Education/client/src/pages/LessonPage.jsx) | ~1600+ | 63KB — toàn bộ logic bài học |
| [exerciseGenerator.js](file:///d:/1.Jobs/6.PersonalProject/Education/client/src/utils/exerciseGenerator.js) | 1849 | 59KB — sinh bài tập cho 5 lớp |
| [ContentPage.jsx](file:///d:/1.Jobs/6.PersonalProject/Education/admin/src/pages/ContentPage.jsx) | 983 | 47KB — cây giáo trình + editor |
| [test-admin-portal.mjs](file:///d:/1.Jobs/6.PersonalProject/Education/scripts/test-admin-portal.mjs) | ~3000+ | 131KB — test script monolith |

> [!NOTE]
> Các file này hoạt động đúng nhưng rất khó debug và refactor. `GamesPage.jsx` 79KB chứa 6 game riêng biệt nên tách thành component riêng sẽ dễ bảo trì hơn.

---

### 14. Vercel build gọi `build-apk.mjs` thay vì `vite build`

```json
// client/package.json L8
"build": "node ../scripts/build-apk.mjs",
```

```json
// vercel.json L3
"buildCommand": "cd client && npm install && npm run build",
```

> [!WARNING]
> `npm run build` ở root gọi `build-apk.mjs` (build APK!), nhưng `vercel.json` gọi `cd client && npm install && npm run build` — nghĩa là deploy Vercel sẽ chạy `build-apk.mjs` thay vì `vite build`. Tuy nhiên, root `package.json` script `build:web` gọi `cd client && npm run build:web` mới đúng.
>
> **⚠️ Vercel deploy gọi `npm run build` → chạy `build-apk.mjs` → CÓ THỂ LỖI** nếu script đó cần environment không có trên Vercel (Android SDK, etc). Cần kiểm tra xem `build-apk.mjs` có detect và fallback cho web build không.

---

### 15. `client/.env.local` bị commit (có trong working tree)

```
client/.env.local   335 bytes
admin/.env.local    335 bytes
```

> [!CAUTION]
> File `.env.local` chứa Supabase URL và anon key **đang có mặt** trong thư mục. Mặc dù `.gitignore` có `*.local`, nhưng nếu file này đã được add trước khi gitignore có hiệu lực thì nó vẫn bị track. Cần xác nhận `git status` để đảm bảo không bị commit secrets.

---

## 🟢 NHỮNG ĐIỀU LÀM TỐT

### Thiết kế đáng khen

1. **Content versioning + 3 tầng fallback** (`DB → cache → static`) — thiết kế chín, đo trước khi làm.
2. **Reward service tách khỏi store** — tránh vòng import, đọc đồng bộ từ cache.
3. **Content schema + validator** dùng chung giữa migrate script và admin editor — một nguồn sự thật.
4. **"Bắn rồi quên"** cho audit log, XP log, coin log — không block UX vì log lỗi.
5. **Hẹn giờ (`henGio.js`) + Proxy wrapper** cho Supabase client trên admin — tránh treo vĩnh viễn.
6. **`baoDangTrongBaiHoc()`** — không đổi nóng nội dung khi bé đang học dở.
7. **Admin auth flow** — kiểm quyền từ DB (`profiles.role`), không tin client.
8. **Schema migration** có số thứ tự rõ ràng, idempotent, ghi chú đầy đủ.
9. **Spaced repetition** cho sổ tay lỗi sai — thiết kế giáo dục tốt.
10. **Bot leaderboard** với seeded random — deterministic giữa các máy.

---

## 📊 Tổng kết mức độ ưu tiên

| # | Vấn đề | Mức độ | Phải sửa? |
|---|---|---|---|
| 1 | `schema.sql` khai `answer INT` vs migration sửa thành `TEXT` | 🔴 Nghiêm trọng | ✅ Phải sửa |
| 4 | Leaderboard RLS mở toàn bộ (`FOR ALL USING (true)`) | 🔴 Nghiêm trọng | ✅ Phải sửa |
| 5 | Race condition trigger + client tạo trùng child | 🔴 Nghiêm trọng | ✅ Nên sửa |
| 11 | Pet store không auto-sync lên cloud | 🟡 Quan trọng | ✅ Nên sửa |
| 14 | Vercel build gọi `build-apk.mjs` thay vì `vite build` | 🟡 Quan trọng | ✅ Kiểm tra |
| 3 | Khách bị chặn tích luỹ xu/XP/streak | 🟡 UX issue | ⚠️ Xem xét |
| 7 | `checkWeekReset` chỉ rớt 1 hạng dù bỏ nhiều tuần | 🟡 Logic | ⚠️ Xem xét |
| 10 | Sync 500ms debounce + không flush khi kill app | 🟡 Data loss risk | ⚠️ Xem xét |
| 2 | `balanceAfter` trong sổ cái có thể sai | 🟢 Thấp | ℹ️ Biết để ý |
| 15 | `.env.local` trong working tree | 🟢 Thấp | ℹ️ Kiểm tra git |
| 13 | File quá lớn (GamesPage 79KB) | 🟢 Bảo trì | ℹ️ Cải thiện dần |

---

> [!TIP]
> Nhìn chung codebase được thiết kế **cẩn thận và có chủ ý** — đặc biệt phần content versioning, reward config, và admin auth. Hầu hết các quyết định đều có ghi chú `🔴 VÌ SAO` kèm số đo. Các lỗi tìm thấy chủ yếu là race condition ở tầng đồng bộ và thiếu sót bảo mật ở RLS leaderboard.
