# 🚀 Master Plan: Admin Portal — Toán Vui Tiểu Học

> **Phiên bản:** 2.4 · **Cập nhật:** 2026-09-19 · **Trạng thái:** 🟡 GĐ 0 & GĐ 1 code xong — chờ test
> **Người soạn:** AI Agent · **Nguồn dữ liệu:** khảo sát `client/src` + `.codegraph/codegraph.db`

Tài liệu này là bản quy hoạch kiến trúc và lộ trình triển khai hệ thống Quản trị (Admin Portal). Bản 2.0 được viết lại dựa trên **số liệu đo thực tế từ source code**, không dựa trên giả định.

### Cách dùng tài liệu

- Đánh dấu `[x]` khi hoàn thành. Mỗi giai đoạn có **Điều kiện hoàn thành (DoD)** — chỉ chuyển giai đoạn khi DoD đã đạt.
- Mọi mục cần quyết định của chủ dự án được gom vào **Phần 7**.
- Mục nào không đồng ý → sửa trực tiếp trong file này rồi báo lại.

> 🧪 **Test case:** [`docs/admin_portal_test_cases.md`](./admin_portal_test_cases.md) — đầy đủ test case cho GĐ 0 và GĐ 1, có lệnh copy-paste được, kèm bảng theo dõi kết quả và khung cho GĐ 2-4.

### Quy ước nhãn

| Nhãn | Ý nghĩa                     |
| ---- | --------------------------- |
| 🔴   | Chặn — không được bỏ qua    |
| 🟡   | Quan trọng — nên làm sớm    |
| 🟢   | Nice-to-have — làm khi rảnh |
| ✂️   | Đã cắt khỏi phạm vi v1      |

### ✅ 6 quyết định đã chốt (2026-09-19)

| #   | Quyết định                                                                                                    |
| --- | ------------------------------------------------------------------------------------------------------------- |
| Q1  | **App Vite riêng `admin/`**, deploy bằng **Vercel project thứ 2 — miễn phí**. Admin chỉ cần web, không mobile |
| Q2  | **Client tính Xu/XP + đọc config từ DB**; Admin có giao diện sửa config                                       |
| Q3  | **localStorage** (giữ pattern `zustand persist` hiện có)                                                      |
| Q4  | **Bắt đầu GĐ 3 sau khi hoàn thành GĐ 2**                                                                      |
| Q5  | **Giữ guest mode** — trẻ phải được trải nghiệm không cần đăng nhập                                            |
| Q6  | **1 admin duy nhất** — không làm RBAC, không phân cấp quyền                                                   |

→ Chi tiết ở **Phần 7**. Các mục bị ảnh hưởng bởi quyết định được đánh dấu 📌 trong lộ trình.

> 🔴 **Đính chính quan trọng (v2.2):** Bản 2.0/2.1 viết _"guest mode buộc phải có bundled seed content pack"_ — **sai**. Guest mode **đọc nội dung từ DB bình thường**; hạn chế của guest chỉ nằm ở **tầng ghi dữ liệu người dùng**. Chi tiết + hệ quả ở **mục 3.0**. Kết luận: **không cần xây seed pack** — giữ file tĩnh hiện có làm fallback offline.

---

## 🎯 PHẦN 0: TẦM NHÌN & MỤC TIÊU

Biến dự án từ ứng dụng tĩnh (hardcoded) thành **Nền tảng EdTech vận hành được (Operable Platform)**, cho phép đội vận hành:

1. **Cập nhật nội dung học tập không cần phát hành lại App** — với điều kiện không thêm loại slide mới (xem ghi chú bên dưới).
2. **Kiểm soát nền kinh tế game (Xu/XP)** để duy trì động lực học tập và chống lạm phát.
3. **Hiểu hành vi người học** thông qua dữ liệu thật (Data-driven).
4. **Hỗ trợ phụ huynh/học sinh** và vận hành sự kiện trong app.

> ⚠️ **Đính chính so với bản 1.0:** Không thể nói "không bao giờ cần update App". Nếu Admin thêm một **loại slide mới** (VD: slide kéo-thả), App cũ vẫn phải update để có parser tương ứng. Phát biểu đúng là: _nội dung cập nhật không cần update App, miễn là dùng các loại slide App đã biết._

---

## 🔍 PHẦN 1: HIỆN TRẠNG KỸ THUẬT (số liệu đo được)

### 1.1. Kiến trúc hiện tại

| Lớp        | Thực tế                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Frontend   | Vite + React 19 + `react-router-dom` v7 + Zustand 5 (persist/localStorage)                            |
| Backend    | **Không có backend nghiệp vụ.** Toàn bộ là Supabase client-side                                       |
| Serverless | Duy nhất `api/tts.js` (proxy Google TTS)                                                              |
| Mobile     | Capacitor 7 (Android + iOS), Google Auth native qua `@capgo/capacitor-social-login`                   |
| Deploy     | Vercel, rewrite SPA về `index.html`                                                                   |
| Database   | 6 bảng: `profiles`, `child_profiles`, `child_progress`, `child_pets`, `child_mistakes`, `leaderboard` |
| Migration  | ❌ Không có thư mục `supabase/migrations/` — chỉ 1 file `schema.sql` đã chạy trên prod                |
| Test       | ❌ Không có. `client/package.json` chỉ có `oxlint`                                                    |
| Bundle     | ❌ `App.jsx` import tĩnh 13 page — 1 bundle duy nhất, không lazy-load                                 |

### 1.2. Nội dung đang gán cứng

```
grade1Data.js   182.1 KB
grade2Data.js   193.5 KB
grade3Data.js   210.0 KB
grade4Data.js    97.9 KB
grade5Data.js    84.3 KB
storyData.js     27.7 KB
──────────────────────────────
TỔNG            795.5 KB   (chiếm ~49% tổng 1632.6 KB source)
```

### 1.3. Hiện trạng phát thưởng Xu/XP — 12 cơ chế rải rác 11 file

| #   | Vị trí                                | Giá trị cứng                             |
| --- | ------------------------------------- | ---------------------------------------- |
| 1   | `LessonPage.jsx:163-164`              | `finalCoins` / `finalXp` tính inline     |
| 2   | `LessonPage.jsx:206`                  | `addCoins(10)`                           |
| 3   | `ChallengePage.jsx:198-199`           | `10/15/25` Xu, `30` XP                   |
| 4   | `ChallengePage.jsx:214-215`           | `bonus` Xu, `50` XP                      |
| 5   | `GamesPage.jsx` — MathRace            | `120/70/30/10` Xu, `200/120/50/20` XP    |
| 6   | `GamesPage.jsx` — 5 game còn lại      | mỗi game một bảng điểm riêng             |
| 7   | `StoriesPage.jsx:114-115`             | `storyData.rewardCoins` / `rewardXp`     |
| 8   | `PracticePage.jsx:187-189`            | `bonus` Xu, `20` XP                      |
| 9   | `useProgressStore.js:13-15`           | `DEFAULT_DAILY_QUESTS.reward = 15/10/10` |
| 10  | `useProgressStore.js` — claim         | `addCoins(50)`, `addXp(60)`              |
| 11  | `useUserStore.js` — curve level       | base `100`, tăng `×1.3`                  |
| 12  | `MascotBubble.jsx` / `usePetStore.js` | thưởng ngẫu nhiên + `expGain` thức ăn    |

### 1.4. Điểm chuyển đổi quan trọng (dùng để refactor rẻ nhất)

`client/src/data/curriculum.js` export 4 helper: `getGrade()`, `getChapter()`, `getLesson()`, `findLessonById()`.
→ **Giữ nguyên chữ ký hàm, chỉ đổi phần ruột** sang fetch DB. Đây là điểm can thiệp duy nhất cho toàn bộ CMS, giảm rủi ro refactor xuống mức thấp nhất.

### 1.5. Dữ liệu người dùng đã có sẵn (chưa được khai thác)

`child_progress` đã lưu: `last_active_date`, `current_streak`, `longest_streak`, `total_games_played`, `math_race_wins`, `completed_lessons` (JSONB), `exercise_results` (JSONB).
→ Đủ để làm "mức độ hoạt động" mà **không cần thêm bảng**.

---

## ⚠️ PHẦN 2: 4 LỖ HỔNG PHẢI XỬ LÝ TRƯỚC KHI BẮT ĐẦU

### 🔴 Lỗ hổng 1 — Bảo mật đang bị định vị sai

Bản 1.0 viết _"Cấu hình `AdminRoute` bảo vệ (Guard)"_ như một biện pháp bảo mật ở Giai đoạn 1.

> **Sai.** Route guard trong React **chỉ là trang trí (UX)**. Bất kỳ ai mở DevTools đều gọi được Supabase trực tiếp bằng anon key, không cần đi qua React Router. **Ranh giới bảo mật thật là RLS + `is_admin()`.**

**Lỗ hổng tồn tại sẵn trong `supabase/schema.sql`:**

```sql
CREATE POLICY "Anyone can upsert leaderboard" ON public.leaderboard
  FOR ALL USING (true) WITH CHECK (true);
```

→ Với policy này, **bất kỳ ai có anon key đều ghi được điểm cho bất kỳ user nào**, kể cả ghi đè `weekly_xp` của người khác. Phải vá **trước** khi làm Admin, vì Admin sẽ tin vào dữ liệu đó.

### 🔴 Lỗ hổng 2 — Thiếu hoàn toàn tầng dữ liệu phân tích

Bản 1.0 nhảy thẳng tới _"Drop-off Analysis"_ và _"Heatmap câu hỏi khó"_ — nhưng hiện tại **app không ghi lại bất kỳ event nào**. Không có bảng `question_attempts(child_id, question_id, ms, correct, ts)` thì **không thể vẽ được biểu đồ nào**. Bản 1.0 có tầng hiển thị nhưng thiếu hẳn tầng dữ liệu.

### 🔴 Lỗ hổng 3 — Đánh giá thấp độ phức tạp

| Bản 1.0 gọi là | Thực chất là                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| "Giai đoạn 2"  | 2 giai đoạn: (2a) bảng config + service, (2b) **refactor 14 điểm phát thưởng ở 8 file client**                   |
| "Giai đoạn 3"  | 4 giai đoạn: schema+migration 795 KB → Curriculum Tree → Lesson Editor → client fetch + cache + fallback offline |

### 🔴 Lỗ hổng 4 — Không có đường lùi (Rollback)

Hoàn toàn thiếu:

- Không có **kill switch** nội dung (tắt CMS quay về data cứng trong 1 nút).
- Không có **versioning / rollback** nội dung đã publish.
- Không có **audit log** — Admin ban user, sửa Xu/XP mà không truy vết được ai làm gì.

---

## 🗺️ PHẦN 3: LỘ TRÌNH TRIỂN KHAI (5 GIAI ĐOẠN)

Nguyên tắc: **chia để trị**, App chính không được gián đoạn. Mỗi giai đoạn phải tự đứng độc lập được.

---

### 📍 GIAI ĐOẠN 0: VÁ NỀN (Foundation & Security) 🔴

**Mục tiêu:** Dựng hàng rào bảo mật thật và đường lùi, trước khi thêm bất kỳ tính năng nào.
**Vì sao phải làm trước:** Mọi tính năng sau đều ghi/đọc dữ liệu nhạy cảm. Làm sau = phải làm lại.

> 📌 **Áp dụng Q6 (1 admin):** Bỏ toàn bộ RBAC, bảng phân quyền, vai trò phụ, luồng phê duyệt. `is_admin()` chỉ cần kiểm tra `profiles.role = 'admin'`. Nếu tương lai tăng số admin → mở rộng sau, **thiết kế hiện tại không cản trở việc đó**.

> **📦 Sản phẩm GĐ 0:** `supabase/migrations/0001_admin_foundation.sql` · `admin/` (app Vite riêng) · `admin/README.md` (hướng dẫn chạy + deploy)

- [x] **DB:** Tạo `supabase/migrations/` với file đánh số. **Không sửa trực tiếp `schema.sql`** → `0001_admin_foundation.sql`
- [x] **DB:** Thêm cột `profiles.role` (`'user' | 'admin'`) — 📌 Q6: chỉ cần 1 giá trị `'admin'` duy nhất.
- [x] **DB:** Thêm cột `profiles.is_banned`, `profiles.last_seen_at`.
- [x] **DB:** Viết function `public.is_admin()` **`SECURITY DEFINER`** (bắt buộc, nếu không sẽ đệ quy RLS).
- [x] **DB:** 🔴 **Vá policy `leaderboard`** — bỏ `USING (true) WITH CHECK (true)`. Thay bằng `leaderboard_insert_own_or_bot` + `leaderboard_update_own_or_bot`. ⚠️ So sánh `cp.id::text = leaderboard.id` (không cast sang uuid — sẽ ném lỗi khi gặp dòng bot).
- [x] **DB:** Thêm policy admin cho `profiles`, `child_profiles` (đọc + sửa để Ban), `child_progress` / `child_pets` / `child_mistakes` (chỉ đọc).
- [x] **DB:** Tạo bảng `admin_audit_log` (bất biến — không có policy UPDATE/DELETE).
- [x] **DB:** Tạo bảng `app_config` + seed khóa `content_source = 'static'`.
- [x] **DB:** Thêm chỉ mục `child_profiles_parent_id_idx` — Postgres **không** tự tạo index cho cột khoá ngoại, mà mọi policy đều lọc theo `parent_id`.
- [x] **BE:** Admin Portal dùng **anon key + RLS**. ❌ Không nhúng `service_role` key (đã ghi cảnh báo trong `.env.example` và README).
- [x] **FE:** 🔴 **Tách bundle Admin** → `admin/` là app Vite độc lập, `client/` **không bị chạm** (đã xác nhận qua `git status`).
- [x] **FE:** Layout Admin (Sidebar + Header + Dashboard) — sidebar có sẵn mục mờ cho GĐ 1/2/3.
- [x] **FE:** `AdminRoute` guard — đã ghi rõ trong code comment đây là **UX, không phải bảo mật**.
- [x] **FE:** UI kit → **TailwindCSS v4** (`@tailwindcss/vite`). ⏸️ Shadcn-UI **hoãn** tới khi thực sự cần component đầu tiên (nó là copy-paste theo từng component, thêm trước là thừa).
- [x] **FE:** Dashboard có **4 phép kiểm tra RLS tự động** — dùng luôn làm công cụ nghiệm thu DoD #1.
- [x] **Deploy:** `admin/vercel.json` + hướng dẫn 5 bước trong `admin/README.md`.
- [ ] **Deploy:** ⏳ **Tạo Vercel project thứ 2** (Root Directory = `admin`) — thao tác của chủ dự án.
- [ ] **Deploy:** ⏳ **Thêm domain admin vào Supabase → Authentication → Redirect URLs** — bỏ sót bước này thì đăng nhập xong bị đá về trang chủ.
- [ ] **Seed:** ⏳ Set `role = 'admin'` cho tài khoản duy nhất bằng SQL thủ công (cần email thật).

> 📝 **Ghi chú kỹ thuật phát sinh khi làm:**
>
> - `is_admin()` được `GRANT EXECUTE` cho cả `anon` — policy admin vẫn được Postgres đánh giá với request ẩn danh, thiếu quyền sẽ gây **lỗi** thay vì trả `false`.
> - Trong `onAuthStateChange` phải đẩy việc gọi `signOut()` ra ngoài callback (`setTimeout 0`) — gọi trực tiếp có thể deadlock trong `supabase-js`.
> - ⚠️ **Từ nay không chạy lại `schema.sql`** — file đó sẽ mở lại lỗ hổng `leaderboard`.

**✅ Điều kiện hoàn thành (DoD):**

1. ✅ Tài khoản user thường gọi API admin → **bị RLS từ chối** — chứng minh bằng test tự động
   `D-5`/`D-6` (anon đọc `profiles`/`child_profiles`/sổ cái đều bị chặn). Chạy lại:
   `npm run test:portal -- --db`. Case session thật: `TC-0.3`.
2. ✅ Tài khoản user thường không ghi được `leaderboard` của bé khác — test tự động `D-4`
   (HTTP 401). Case session thật: `TC-0.2`.
3. ✅ Admin Portal chạy ở bundle riêng, build `client/` **không tăng kích thước** — đã xác nhận.
4. ✅ **Admin Portal truy cập được qua URL Vercel riêng, chi phí $0** — đã deploy tại
   **https://admin-toanvuive.vercel.app** (project thứ hai, Root Directory `admin`).
   Đã đăng nhập Google và vào được trang **Kinh tế Xu/XP**.

> 🐞 **Lỗi gặp khi deploy — ghi lại để lần sau khỏi mất thời gian:**
> Vercel báo `Command "cd client && npm install && npm run build" exited with 1` dù
> Root Directory đã đặt đúng là `admin`. Nguyên nhân: hai ô **Build Command** và
> **Output Directory** ở khối _Framework Settings_ vẫn **bật Override** với giá trị cũ
> của app chính (lấy từ `vercel.json` ở gốc repo lúc import, khi Root Directory còn trống).
> Vercel đứng trong `admin/` rồi chạy `cd client` → `admin/client` không tồn tại → thoát 1.
> **Cách sửa:** tắt cả 2 công tắc Override, Save, rồi Redeploy (bỏ build cache).
> Đổi Root Directory sau khi tạo project **không** tự xoá các override đã khoá.

> ✅ **Đã xác nhận chạy được:** `npm run build` thành công (501 KB JS / 146 KB gzip) · dev server render đúng trang đăng nhập · Tailwind sinh CSS đúng · `admin/.env.local` nằm trong `.gitignore`.

---

### 📍 GIAI ĐOẠN 1: SỔ CÁI & CẤU HÌNH KINH TẾ 🔴

**Mục tiêu:** Đưa toàn bộ tham số Xu/XP ra DB, và **có lịch sử giao dịch** để tra soát khiếu nại.

> 📌 **Áp dụng Q2 (client tính + config DB):** App vẫn tự tính Xu/XP ở client, nhưng **giá trị lấy từ `reward_configs`** thay vì hardcode. Admin sửa config → app nhận giá trị mới.
> **⚠️ Rủi ro đã được chấp nhận:** người dùng hiểu kỹ thuật có thể sửa localStorage để tự tăng Xu/XP. Với app hướng trẻ em, mức rủi ro này chấp nhận được.
> **Giảm nhẹ (bắt buộc):** vẫn **ghi ledger** cho mọi thay đổi số dư → Admin phát hiện được bất thường (VD: 1 bé tăng 10.000 Xu trong 1 ngày). Nếu sau này cần chống gian lận triệt để → chuyển sang RPC server-side, **không cần đổi schema**.

> **📦 Sản phẩm GĐ 1:** `supabase/migrations/0002_reward_economy.sql` · `client/src/services/rewardService.js` · `admin/src/pages/EconomyPage.jsx` · `admin/src/lib/audit.js`

- [x] **DB:** Tạo `coin_transactions` — `child_id, amount, reason, ref_id, balance_after, created_at`.
- [x] **DB:** Tạo `xp_events` — `child_id, amount, source, created_at`.
- [x] **DB:** Tạo `reward_configs` — **27 khoá** (⚠️ thực tế là 14 điểm phát thưởng, không phải 12 như kiểm kê ban đầu). Lược bỏ `grade_scope` / `effective_from` / `effective_to` → để GĐ 4, hiện chưa cần. Thêm `coins_max` cho phần thưởng ngẫu nhiên (rương bí ẩn).
- [x] **DB:** Seed 27 giá trị — **đúng bằng** giá trị hardcode cũ, nên refactor không đổi hành vi.
- [x] **DB:** Đưa **level curve** (`base 100`, `×1.3`) + **hệ số nhân toàn cục** vào `app_config`.
- [x] **DB:** ❌ **Bỏ RPC `log_reward`** — RLS policy làm được cùng việc với ít hơn 1 tầng. Sổ cái là INSERT thuần.
- [x] **FE (1a):** `rewardService.js` — đọc **đồng bộ** từ cache localStorage, làm mới **bất đồng bộ** từ DB. Cố ý **không import store nào** để tránh vòng import. `REWARD_DEFAULTS` là lưới an toàn khi offline.
- [x] **FE (1b):** 🔴 Refactor **14 điểm phát thưởng ở 8 file**: `LessonPage` (3), `PracticePage` (2), `ChallengePage` (2), `StoriesPage` (1), `MascotBubble` (1), `useProgressStore` (2), `GamesPage` (7).
- [x] **FE:** `grantReward(key, refId)` trong `useUserStore` — tra cứu → cộng → ghi sổ, **trả về giá trị đã cấp** (quan trọng với rương ngẫu nhiên).
- [x] **FE:** Ghi sổ cái trong `addCoins` / `addXp` / `spendCoins`, "bắn rồi quên".
- [x] **Admin UI:** 📌 Q2 — màn hình **Game Economy**: bảng 27 khoá nhóm theo khu vực, sửa Xu / Xu tối đa / XP / bật-tắt, hệ số nhân X2, công thức lên cấp.
- [x] **Admin UI:** Validate trước khi lưu — 1 ô sai thì **không lưu gì cả**.
- [x] **Admin UI:** Mọi thao tác ghi vào `admin_audit_log` kèm giá trị **trước/sau**.
- [x] **Admin UI:** Màn hình **Người dùng** — danh sách bé + phụ huynh, phân trang 20/trang, tìm theo tên bé hoặc email phụ huynh, nút Ban/Khóa kèm lý do.
- [x] **Admin UI:** Cột **mức độ hoạt động** — suy ra từ `child_progress.last_active_date`, **không cần bảng mới**.
- [x] **Admin UI:** Cảnh báo bất thường — cột **Xu/24h**, gắn cờ khi vượt 500 Xu trong 24h.
- [x] **Admin UI:** Ghi `ban_reason` vào `child_profiles` khi khoá (kèm lý do trong `admin_audit_log`). Hiện lý do khi rê chuột vào nhãn _Đã khoá_; mở khoá thì xoá lý do — lịch sử đầy đủ vẫn ở audit log.

**✅ DoD:**

1. ⏳ Đổi Xu của 1 bài học trên Admin → **app nhận giá trị mới mà không cần build lại** — code xong, chờ test (`TC-1.3`).
2. ⏳ Mọi thay đổi số dư Xu/XP đều có dòng trong ledger — chờ test (`TC-1.7`).
3. ⏳ Trả lời được câu hỏi _"vì sao bé mất 50 xu?"_ bằng dữ liệu — chờ test (`TC-1.7`, `TC-1.8`).
4. ⏳ Admin sửa được **mọi** tham số từ giao diện web, không cần mở Supabase Dashboard — chờ test (`TC-1.3`).
5. ⏳ Xem được danh sách người dùng + khoá được tài khoản, có ghi audit log — chờ test (`TC-1.13` → `TC-1.16`).

> 📝 **Phát hiện khi làm:** kiểm kê ban đầu ghi 12 điểm phát thưởng, thực tế **14** — grep theo mẫu số cứng bỏ sót 2 chỗ (`LessonPage` trong JSX callback, `PracticePage` khi ôn câu sai). Xem mục 1.3.
> 🔴 **Bài học:** 3 mảng dependency của React còn tham chiếu biến đã xoá sau refactor → `ReferenceError` khi mở game. **Lint và build đều không bắt được.** Đã thêm `TC-R.5` để bắt loại lỗi này về sau.

---

### 📍 GIAI ĐOẠN 2: HỖ TRỢ & PHÂN TÍCH CƠ BẢN 🟡

**Mục tiêu:** (1) Cho đội vận hành công cụ tra cứu & xem hồ sơ bé. (2) Trả lời được câu hỏi ở **mức từng câu hỏi** — thứ mà dữ liệu hiện tại không trả lời được.

> 📌 **Quyết định 2026-09-20 — 2a đã tinh gọn.** Bốn mục bị cắt khỏi phạm vi:
>
> | Mục đã cắt                     | Lý do                                                                                                               |
> | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
> | Khôi phục streak thủ công      | Sẽ làm **cửa hàng vật phẩm kiểu Duolingo** — người dùng tự mua Streak Freeze bằng Xu, không cần admin can thiệp tay |
> | Cấp / thu Xu thủ công          | Bỏ khỏi phạm vi                                                                                                     |
> | Cấp vật phẩm "Đóng băng chuỗi" | Chuyển sang cửa hàng (mục trên)                                                                                     |
> | Reset PIN phụ huynh từ xa      | **Bất khả thi với thiết kế hiện tại** — xem ghi chú bên dưới                                                        |
>
> **⚠️ Ghi chú kỹ thuật, đừng quên:** `parentPin` chỉ nằm trong `useUserStore` (localStorage
> của **máy bé**) — `client/src/store/useUserStore.js:70,165`. Nó **chưa bao giờ được gửi lên
> Supabase**, nên admin không thể sửa thứ mình không nhìn thấy. Muốn làm "reset PIN từ xa" về
> sau thì phải làm bước trước đó: **đồng bộ PIN lên DB** (lý tưởng là băm, đừng lưu plaintext).
> Đó là việc riêng, không phải "reset".

**2a — Công cụ hỗ trợ**

- [x] **Tra cứu học sinh** theo nickname / email phụ huynh — đã có từ GĐ 1 (`UsersPage`: ô tìm kiếm debounce 350 ms, phân trang 20/trang, tìm theo email phụ huynh bằng truy vấn 2 bước).
- [x] **Trang hồ sơ 1 bé** — `admin/src/pages/ChildProfilePage.jsx`, route `/users/:childId`. Màn hình **chỉ đọc**. 7 khối: danh tính + trạng thái khoá · tiến độ cấp độ · tiến độ học tập · sổ tay lỗi sai · lịch sử giao dịch Xu · lịch sử XP · thú cưng. Tên bé trong danh sách người dùng thành link sang hồ sơ.

> 🔧 **Phát sinh khi làm 2a — đã xử lý:** bảng `child_mistakes` có từ `schema.sql` (kèm policy
> cho phụ huynh) nhưng **client chưa bao giờ ghi vào** → luôn rỗng, nên khối "sổ tay lỗi sai"
> sẽ không có dữ liệu. Phải làm thêm 2 việc:
>
> 1. **`0004_mistakes_sync.sql`** — cột `answer` khai báo `INT` nhưng câu hỏi so sánh
>    (khuôn `g1_compare`) có đáp án là `'>'`, `'<'`, `'='` → ghi vào là lỗi
>    `invalid input syntax for type integer`. Đổi sang `TEXT`, thêm index
>    `(child_id, failed_count DESC)` cho truy vấn của hồ sơ.
> 2. **Client ghi lên cloud** — `syncMistakeToCloud()` trong `useProgressStore.js`, gọi từ
>    `recordMistake()` và `resolveMistake()`. Lần đầu INSERT rồi lưu lại `dbId` để các lần sau
>    UPDATE đúng dòng đó (không sinh trùng khi bé sai lại cùng câu). Guest không có `child_id`
>    → bỏ qua. Lỗi đồng bộ chỉ `console.warn`, không làm hỏng trải nghiệm học — cùng nguyên tắc
>    với sổ cái Xu/XP.

**2b — Tầng dữ liệu phân tích**

> 📄 **Kế hoạch chi tiết đã tách ra file riêng: [`docs/phase_2b_plan.md`](phase_2b_plan.md)**
> — schema `question_attempts`, cách đánh `question_ref`, service ghi dữ liệu, 2 lát
> `2b-1` / `2b-2`, test case và DoD. Phần dưới giữ lại **mục tiêu** để đọc nhanh.

> 🤔 **TRƯỚC KHI CODE — tầng này tồn tại để trả lời CÁI GÌ?**
>
> **Hiện đã trả lời được một phần.** `child_progress.exercise_results` lưu
> `{score, total, topic, date}` **theo từng buổi luyện tập**; `completed_lessons` lưu
> `{stars, completedAt}` **theo từng bài**. Phụ huynh đã có biểu đồ radar kỹ năng
> (`ParentDashboard.jsx` → `KnowledgeRadarChart`). Nhưng điểm trên radar =
> **% sao đạt được** (`starsEarned / (số bài × 3)`), **không phải** độ chính xác của câu trả lời.
>
> **Ba câu hỏi hiện KHÔNG trả lời được — và chỉ `question_attempts` mới trả lời được:**
>
> | #     | Câu hỏi                                                            | Cần dữ liệu gì                        | Biết rồi thì làm gì                                         |
> | ----- | ------------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------- |
> | **A** | **Câu hỏi nào hỏng?** (đáp án sai, đáp án nhiễu gây nhầm, quá khó) | danh tính câu + đúng/sai + số lần thử | Sửa câu, đổi đáp án nhiễu, xoá câu lỗi                      |
> | **B** | **Bé sai vì đoán bừa hay vì không hiểu?**                          | `ms` + đúng/sai + số lần thử lại      | Đoán bừa → nhắc bé đọc kỹ; không hiểu → gợi ý ôn lại chủ đề |
> | **C** | **Chủ đề nào bé yếu thật sự?**                                     | chủ đề + đúng/sai ở **mức từng câu**  | Gợi ý phụ huynh cho bé luyện đúng chỗ                       |
>
> **Hai câu hỏi CỐ Ý để ngoài phạm vi 2b** (cân nhắc kỹ trước khi thêm):
>
> | #   | Câu hỏi                           | Đánh giá                                                                                  |
> | --- | --------------------------------- | ----------------------------------------------------------------------------------------- |
> | D   | Bé bỏ cuộc ở bước nào trong bài?  | Cần `app_events` + sự kiện vào/ra. **Chưa đủ người dùng để số liệu có nghĩa → hoãn.**     |
> | E   | Bao nhiêu bé quay lại sau 7 ngày? | Chỉ cần `last_active_date` (đã có) + 1 sự kiện `session_start`. **Chưa cần bảng nào cả.** |

**Cần dựng:** → 📄 kế hoạch chi tiết: [`docs/phase_2b_plan.md`](phase_2b_plan.md)

- [x] `question_attempts` — `child_id, question_ref, source, lesson_id, topic, grade, ms, is_correct, created_at` (`0006_question_attempts.sql`).
      Cố ý **BỎ** cột `attempt_no` mà bản plan trước liệt kê: giao diện cho trả lời **đúng 1 lần**
      mỗi câu nên cột đó sẽ luôn bằng `1` (xem mục 4.5 của kế hoạch chi tiết).
- [x] **Lát 2b-1** — ghi attempt khi trả lời: bài học (cả slide `quiz` lẫn `dialogue`), luyện tập,
      ôn câu sai, thử thách. **Khách KHÔNG ghi** — bảng này ghi rất nhiều, mở quyền ghi ẩn danh
      là mở đường spam; `child_id` NOT NULL và không có policy `anon`.
      ✅ **Đã test đầu-đến-cuối — `TC-2.14` → `TC-2.23` PASS (2026-09-20).**
- [ ] **Lát 2b-2** — `ref` cho `generateCalculation` + 6 mini game, và màn hình Admin `/analytics`.
- [ ] ~~`app_events`~~ — 📌 **HOÃN.** Chưa có câu hỏi cụ thể nào cần nó (xem bảng D/E). Dựng bảng trước khi biết dùng vào việc gì chỉ tạo thêm nợ; thêm sau không khó.

> 🔴 **`question_ref` — đã giải quyết (2026-09-20). Có HAI loại câu hỏi, cần HAI cách khác nhau.**
>
> Bản plan trước ghi `question_id` như thể mọi câu hỏi đều có danh tính. **Không đúng:**
>
> | Loại câu hỏi                      | Nguồn                                                             | Hiện trạng                                                                                                     |
> | --------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
> | Trong bài học                     | `client/src/data/gradeXData.js`, slide `type: "quiz"`             | Chỉ có `question`, `items`, `options`, `answer`, `mascotHint`. **Không có `id`.** (Lesson thì có: `g1-c1-l1`.) |
> | Luyện tập · thử thách · mini game | `generateQuestion(grade, topicId)` · `generateCalculation(grade)` | **Sinh mới mỗi lần chạy** — mỗi câu chỉ tồn tại đúng 1 lần                                                     |
>
> ⚠️ **Đánh `id` cho từng câu sinh ngẫu nhiên là VÔ NGHĨA:** mỗi ID chỉ có 1 dòng → gộp nhóm
> ra 0 thông tin → không bao giờ trả lời được câu hỏi A. Với câu sinh theo công thức, **câu cá
> biệt không thể "hỏng"** — cái hỏng là **khuôn sinh câu** (đáp án nhiễu trùng nhau, sinh ra số
> âm, quên trộn đáp án…).
>
> ✅ **Kết luận — đánh ID theo hai tầng:**
>
> | Loại                   | Đơn vị đánh ID                                                              | Vì sao                                                                                                              | Chi phí                                                     |
> | ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
> | Sinh ngẫu nhiên        | **khuôn** — chính là `topicId` (`g1_count`, `g1_add_sub_10`, `g1_compare`…) | Hữu hạn, ổn định, **đã có sẵn tên trong code**. Gộp theo khuôn = biết **kỹ năng** nào yếu → đúng thứ mục tiêu C cần | **0 — không phải sửa gì trong file data**                   |
> | Viết tay trong bài học | **từng câu**                                                                | Một câu cụ thể CÓ THỂ sai đáp án / nhập nhằng → cần chỉ đích danh                                                   | Nhỏ: `lesson_id` + số thứ tự slide, nâng lên ID thật ở GĐ 3 |
>
> ➡️ **Bỏ khuyến nghị cũ** ("thêm `id` cho từng câu, sửa 5 file `gradeXData.js`") — **không cần**.
> Với câu sinh ngẫu nhiên, gộp theo **khuôn** còn **tốt hơn** gộp theo từng câu: nó trả lời trực
> tiếp "kỹ năng nào yếu", thay vì đưa ra hàng nghìn dòng mỗi dòng một lần xuất hiện.
>
> 🔧 **Việc phải làm khi code:** `generateQuestion()` hiện **không cho biết nó đã dùng khuôn nào**
> (trả về `{question, options, answer, hint, explanation}`, không có `topic`), và nhánh
> `g1_add_sub_10` còn rẽ tiếp cộng/trừ. Cách sửa gọn — **bọc hàm, không sửa từng `return`**:
>
> ```js
> // đổi hàm hiện tại thành hàm nội bộ, LUÔN nhận topic cụ thể
> function buildQuestion(grade, topic) {
>   /* thân hàm cũ, bỏ đoạn tự chọn topic */
> }
>
> export function generateQuestion(grade = 1, topicId = null) {
>   const list = TOPICS[`GRADE_${grade}`] || TOPICS.GRADE_1;
>   const topic = topicId || list[randInt(0, list.length - 1)].id;
>   return { ...buildQuestion(grade, topic), ref: `tmpl:${topic}` };
> }
> ```
>
> Nhờ vậy **mọi** call site (luyện tập, thử thách) đều có `ref` mà không phải sửa chỗ gọi.
> Hành vi không đổi → rủi ro thấp.
>
> 🟡 **Riêng mini game cần thêm việc:** chúng dùng `generateCalculation(grade)` — hàm này rẽ nhánh
> theo `grade` và **không dùng `TOPICS`**, nên chưa có tên khuôn. Cần thêm `ref` cho từng nhánh
> (~4 nhánh × 5 lớp). **Khuyến nghị: làm bài học + luyện tập trước** (giá trị cao nhất, chi phí
> thấp nhất), mini game làm sau.

> 🟡 **Ba chi tiết nhỏ cần chốt khi code:**
>
> - **`ms` phải chặn trần.** Bé có thể bỏ máy đi chơi rồi quay lại → `ms` = 20 phút là rác.
>   Đặt trần (VD 300 giây), vượt thì ghi `NULL`.
> - **Guest không có `child_id`.** Chọn: bỏ qua event của guest, hay ghi `child_id = NULL`.
>   Khuyến nghị **`NULL`** — vẫn giữ được giá trị cho mục tiêu A (câu hỏi nào hỏng), chỉ là
>   không gắn được với bé nào.
> - **Dung lượng.** Supabase free 500 MB. Mỗi dòng ~100 byte → 1 bé 50 câu/ngày ≈ 18k dòng/năm;
>   100 bé ≈ 1,8M dòng/năm (còn xa mới đầy). Nhưng **nên đặt chính sách xoá dữ liệu cũ**
>   (VD > 180 ngày) ngay từ đầu — thêm sau khó hơn.

**2c — Inbox phản hồi**

- [x] Bảng `support_tickets` — `supabase/migrations/0005_support_tickets.sql`.
      Cho phép **khách** báo lỗi (`child_id = NULL`) vì khách chiếm phần lớn người
      dùng ban đầu, nhưng policy ẩn danh bị khoá chặt (chỉ INSERT được dòng
      `status='new'`, không `admin_note`, không đọc) — **tuyệt đối không dùng
      `WITH CHECK (true)`**, đó đúng là lỗ hổng đã vá ở GĐ 0.
- [x] Nút báo lỗi trong App Client — `client/src/components/report/ReportQuestionButton.jsx`,
      là **icon lá cờ đỏ nằm cạnh nút "Nghe đọc"** trong banner câu hỏi của `QuizSlide`
      (không phải nút có chữ như bản đầu). Chụp lại `lesson_id`, `slide_index`,
      `question_text`, `correct_answer` ngay lúc báo.
- [x] Màn hình **Báo lỗi câu hỏi** trên Admin — `admin/src/pages/ReportsPage.jsx`,
      route `/reports`. Lọc theo trạng thái (Mới / Đang xem / Đã xử lý / Từ chối /
      Tất cả) kèm số đếm, mỗi ticket có ô ghi chú và nút đổi trạng thái; **mọi thay
      đổi đều ghi `admin_audit_log`**.

> ⚠️ **Sửa nóng nội dung KHÔNG thuộc 2c.** Nội dung bài học còn nằm trong file tĩnh
> (`client/src/data/gradeXData.js`) — Admin **không ghi được** vào đó. Ticket chỉ
> **chụp lại đủ thông tin** để người quản trị tìm và sửa trong file. Sửa nội dung
> ngay từ Admin là việc của **GĐ 3 (CMS)**. Đừng gộp — sẽ phình rất nhanh.

- [x] **Đã test đầu-đến-cuối — `TC-2.8` → `TC-2.13` PASS toàn bộ (2026-09-20).**
      Khách gửi được (`child_id = NULL`) · khoá ẩn danh chặn **6/6** phép thử ·
      admin đổi trạng thái và ghi được `admin_audit_log`.

**✅ DoD:** Tra cứu được 1 bé và xem đầy đủ hồ sơ; xử lý được **1 ticket thật từ đầu đến cuối** mà không cần mở Supabase Dashboard.

**Thứ tự đề xuất:** `2a` → `2c` → `2b`

1. **2a** trước — nhỏ, rủi ro thấp, và tạo ra **chỗ để hiển thị** dữ liệu mà 2b sẽ sinh ra.
2. **2c** tiếp — tự nó đã đạt DoD, đồng thời tạo nguồn dữ liệu thật (báo lỗi câu hỏi).
3. **2b** cuối — vì còn phải chốt `question_ref` và sửa 5 file dữ liệu.

---

### 📍 GIAI ĐOẠN 3: ĐỘNG HÓA NỘI DUNG (CMS) �

> ✅ **Cả 4 lát 3a · 3b · 3c · 3d ĐÃ XONG** — test từng lát ở `PHẦN J / K / N / O` của
> [`docs/admin_portal_test_cases.md`](admin_portal_test_cases.md).
> ⏳ **DoD 6/6 ✅** — điều cuối (#6) làm ở `0013`, xem khối _DoD_ ở cuối giai đoạn này.

> 📌 **Áp dụng Q4:** Chỉ bắt đầu giai đoạn này **sau khi GĐ 2 đã hoàn thành và ổn định**. Đây là giai đoạn rủi ro cao nhất — không làm song song với việc khác.
>
> ✅ GĐ 2 đã xong → **đủ điều kiện bắt đầu**.
>
> 📄 Kế hoạch chi tiết lát đầu (3a — schema + migrate + bộ kiểm tra):
> [`docs/phase_3a_plan.md`](phase_3a_plan.md)
>
> 🔴 Kế hoạch 3a **đã đo lại dữ liệu thật** và tìm ra 3 chỗ tài liệu này ghi sai: số chương
> (41 chứ không phải 50), `dialogue` thật ra **cũng là câu hỏi**, và `concept` là **17 tổ
> hợp khoá** chứ không phải một dạng đơn giản. Xem mục 2 của kế hoạch 3a.

> ⚠️ **Rủi ro thật của giai đoạn này là OFFLINE — không phải guest mode.**
> Bản 2.0/2.1 ghi sai chỗ này (đã sửa ở mục 3.0). Guest mode **không hề chặn việc đọc nội dung từ DB** — toàn bộ hạn chế của guest nằm ở **tầng ghi dữ liệu người dùng** (`useUserStore`, `useProgressStore`), không nằm ở tầng mạng.

#### 3.0. Đính chính: guest mode đọc DB được

| Câu hỏi                                    | Trả lời                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guest đọc được nội dung từ Supabase không? | ✅ **Được.** Anon key hoạt động không cần session. RLS chỉ cần policy `SELECT` cho role `anon`.                                                                                                                                                                                                                                                                                        |
| Guest có bị chặn ghi Xu/XP không?          | ✅ Có — `addCoins`/`addXp` return sớm. Đây là hành vi **đúng**.                                                                                                                                                                                                                                                                                                                        |
| Guest có mất tiến độ học không?            | ❌ **Không.** `completeLesson()` **không có** check `isGuest` → vẫn ghi localStorage. Và `autoMigrateGuestDataToCloud()` **di chuyển toàn bộ tiến độ guest lên Supabase khi đăng nhập** (`completedLessons`, `exerciseResults`, `currentStreak`, `longestStreak`, `mathRaceWins`, `totalGamesPlayed`, thú cưng). `useMobileLifecycle.js:145` còn gọi lại migration mỗi lần app resume. |

→ **Guest mode là phễu chuyển đổi có chủ đích, không phải chế độ dùng-rồi-bỏ.** Nhưng nó **không phải lý do cần fallback tĩnh**.

**Fallback tĩnh chỉ cần cho đúng 1 ca:**

| Tình huống                        | Cần fallback tĩnh?               |
| --------------------------------- | -------------------------------- |
| Guest/user có mạng, mở lần đầu    | ❌ Không                         |
| Có mạng, mở lần 2 trở đi          | ❌ Không — cache localStorage đủ |
| **Không có mạng, đã từng mở app** | ❌ Không — cache localStorage đủ |
| **Không có mạng, mở app lần đầu** | ✅ **Có** — đây là ca duy nhất   |

Ca cuối là thật với app Capacitor: trẻ mở app trên điện thoại không có wifi/4G.

#### 3.0.1. Cách lười nhất: giữ nguyên file tĩnh, không xây seed pack

795 KB file tĩnh **đang nằm trong bundle ngay lúc này**. Vậy:

> **Không xóa gì. Giữ `gradeXData.js` làm fallback offline. DB là nguồn chính. Guest đọc DB như mọi người.**

|                          | Bản 2.1       | Bản 2.2                                  |
| ------------------------ | ------------- | ---------------------------------------- |
| Guest đọc từ             | Data tĩnh     | **DB**                                   |
| Offline lần đầu          | Data tĩnh     | Data tĩnh _(không đổi)_                  |
| Bundle size              | 795 KB        | **795 KB — không đổi** (vốn đã vậy)      |
| Phải tự xây seed pack    | ✅ Có         | ❌ **Không** — file cũ chính là fallback |
| Công việc phát sinh thêm | Xây + bảo trì | **0**                                    |

📌 **Điểm mấu chốt:** bundle **không to thêm** so với hiện tại — đây là _không thay đổi_, không phải _đánh đổi_. Xóa 795 KB đi mới là **bước lùi** về khả năng offline. Nếu sau này bundle size thành vấn đề thật → mới cắt nhỏ fallback (VD chỉ giữ Lớp 1). Đó là tối ưu có điều kiện kích hoạt rõ ràng, không phải điều kiện tiên quyết.

**3a — Schema + Migration (chưa có UI sửa)** ✅ **XONG** — `0008` → `0012`, `scripts/migrate-content.mjs`

- [x] Bảng `content_grades`, `content_chapters`, `content_lessons`, `content_lesson_versions` (payload JSONB).
- [x] Script Node.js migrate 795 KB từ 6 file JS lên DB (chạy 1 lần, có dry-run + đối chiếu số lượng) — `--verify` so **từng bài**, và đo được **5 lớp · 41 chương · 362 bài · 1505 slide**.
- [x] 🔴 **RLS: role `anon` + user thường chỉ thấy `status = 'published'`.** Nếu để `SELECT USING (true)` → **bài Draft lộ ra cho mọi khách vãng lai**. `is_admin()` thấy tất cả. — cổng `S-17` + `D-15`.
- [x] 🔴 **`app_config.content_source`** (`'static' | 'remote'`) — kill switch quay về data cứng khi sự cố. — `0011` bật, `TC-3d.5` kiểm.
- [x] 🔴 **`app_config.content_version`** — mốc so sánh để biết cache/bundle đã cũ chưa. — `0009` tăng khi publish; app so số này khi quay lại tab / đổi màn hình.
- [x] 🔴 **Slide Type Registry + schema kiểm tra.** Slide hiện có 6 loại cấu trúc rất khác nhau (`story`, `visual` có `items[]`+`number`, `concept`, `dialogue` có scene, `quiz`, `summary`). **Bắt buộc validate**, nếu nhét JSONB tự do vào editor thì nội dung sẽ hỏng dần. — 📌 **Không dùng Zod**: viết tay `admin/src/lib/contentSchema.js` (không thêm dependency), có cổng `S-15`/`S-16` canh **cả hai chiều** (1505 slide thật đều qua **và** 10 ca hỏng đều bị bắt).
- [x] ❌ **Bỏ so với bản 2.1:** không xây "bundled seed content pack". Giữ `gradeXData.js` làm fallback — và `TC-3d.4` đã đo: xoá cache khi offline thì app **vẫn học được** bằng file tĩnh này.

**3b — Curriculum Tree (chỉ đọc)** ✅ **XONG** — `admin/src/pages/ContentPage.jsx`, route `/content`

- [x] Màn hình cây **Lớp → Chương → Bài** (đúng cấu trúc thật; dữ liệu **không có cấp "Học Kỳ"**).
- [x] Đọc **thẳng từ DB** (`content_grades` / `content_chapters` / `content_lessons`), không đọc file tĩnh — cổng `S-18` giữ điều này, và tự kiểm bằng canary.
- [x] Chọn bài → chỉ nạp `payload` của **đúng bài đó** (cả 362 bài ≈ 800 KB nên không nạp hết).
- [x] Tìm kiếm theo mã bài / tên bài / tên chương; đang tìm thì ẩn nhánh rỗng và tự mở nhánh có kết quả.
- [x] Bài chưa publish hiện nhãn `nháp` và được đếm ở đầu màn hình.
- [x] Không có thao tác ghi nào — `S-18` chặn cả `.insert/.update/.upsert/.delete` lẫn `logAudit`.
- [x] Test: `TC-3b.1` → `TC-3b.10` — 9 PASS, `TC-3b.9` cần tạo một bài nháp để thử tay.

**3c — Lesson Editor** ✅ **XONG** — `admin/src/components/LessonEditor.jsx` + `soanBai.js`, mở bằng nút **✏️ Sửa bài này**

- [x] Form thông tin chung (Title, Icon, Thời lượng).
- [x] Builder theo từng slide type (ánh xạ từ registry ở 3a) — `S-23` chứng minh form **không nuốt khoá** nào (6 kiểu · 1505 slide thật).
- [x] Preview — mỗi slide hiện đoạn xem trước theo đúng kiểu của nó trong danh sách slide.
- [x] Trạng thái Draft / Published — `TC-3c.4` (nháp không lộ) và `TC-3c.5` (publish sinh phiên bản + tăng version); **Rút bài** là van an toàn (`TC-3c.8`).
- [x] 🔴 **Version history + Rollback.** — hoàn tác **ghi phiên bản MỚI** mang nội dung cũ, không sửa/xoá lịch sử (`TC-3c.7`).
- [x] Chặn đáp án nằm ngoài lựa chọn (`TC-3c.6`) — đo thật: nút Lưu/Publish **bị mờ** + khung đỏ nói rõ.

**3d — Client fetch** ✅ **XONG** — `client/src/data/contentSource.js` + `dungCayNoiDung.js`

- [x] Đổi ruột 4 helper trong `curriculum.js` — **giữ nguyên chữ ký hàm** (xem mục 1.4).
- [x] Thứ tự đọc nội dung rõ ràng: **cache → DB → file tĩnh trong bundle**. — 📌 Thứ tự thực tế đặt **cache trước DB** (đọc _đồng bộ_ lúc nạp module nên 5 màn hình không phải chờ); khi cache lệch `content_version` thì tải DB rồi ghi đè cache.
- [x] Cache nội dung kèm `content_version`; lệch version mới tải lại. — làm bằng localStorage riêng (khoá `toan-vui-content`), **không** dùng `zustand persist` vì cây không nằm trong store.
- [x] Kiểm thử 4 ca: **guest có mạng** (`TC-3d.6`) · offline đã cache · **offline lần đầu** (dùng file tĩnh) · sau khi admin publish bài mới (`TC-3d.3`, `TC-3d.7`) — hai ca offline đo chung ở `TC-3d.4`.

#### 3e. Chống lệch nội dung: bundle cũ vs DB mới

**Câu hỏi:** Nếu admin sửa/thêm/xóa bài trên portal, bundle (file tĩnh trong app) **không được cập nhật** → hai nguồn lệch nhau. Có tránh được rủi ro này không?

**Nguyên tắc nền — rủi ro này tự giới hạn:**

> Fallback tĩnh **chỉ kích hoạt khi không truy cập được DB**. Khi DB truy cập được (99% thời gian), **mọi người đều nhận nội dung mới nhất**.
> Vậy trường hợp xấu nhất của thiết kế mới = **đúng bằng hành vi app hiện tại** (app hiện tại 100% tĩnh).
> → **Thiết kế mới không thể tệ hơn hiện tại. Đây là cải tiến thuần, không phải rủi ro mới.**

**3 rủi ro còn lại thật sự, và cách xử lý:**

| #   | Rủi ro                                                                                                   | Mức độ          | Cách xử lý                                                                                                                                                                              |
| --- | -------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1  | **Bài đã bị xóa trên admin nhưng bundle vẫn còn** → trẻ offline vẫn làm được bài đã xóa, ghi tiến độ rác | 🟡 Trung bình   | **Content manifest:** khi có mạng, tải 1 danh sách **ID bài hợp lệ** (chỉ vài KB) + cache lại. Khi render từ bundle thì **lọc theo manifest đã cache**. Rất nhẹ, không tải lại nội dung |
| E2  | Không biết trẻ đang xem version nội dung nào → không debug được khiếu nại                                | 🟡 Trung bình   | Lưu `content_version` đang dùng vào localStorage; hiển thị ở màn hình **Tra cứu học sinh** trên admin (GĐ 2a)                                                                           |
| E3  | Trẻ offline thấy bản cũ của bài đã sửa lỗi (VD: sửa một lỗi toán sai)                                    | 🟠 Cần cân nhắc | Bản chất của offline. Lỗi **nghiêm trọng** (sai kiến thức) → bump `content_version` + phát hành app mới. Sửa nhỏ (chính tả, icon) → chấp nhận                                           |

**Giảm E3 thêm — cách rẻ và hiệu quả:** làm cho **file tĩnh được sinh tự động lúc build** từ DB (thay vì sửa tay). Khi đó bundle luôn = nội dung tại **thời điểm deploy gần nhất**, thay vì nội dung tại thời điểm code được viết. Với web (Vercel), mỗi lần deploy là fallback tự làm mới.

> 📌 **Ponytail — chưa làm ở v1.** File tĩnh hiện có cứ để nguyên. Chỉ dựng script sinh tự động **khi nó thành vấn đề thật**. Dấu hiệu rõ ràng để kích hoạt: _"đã sửa lỗi nội dung nhưng người dùng mobile cũ vẫn thấy bản sai"_. Lúc đó thêm, **không cần đổi kiến trúc**.

**Bảng tóm tắt: nội dung hiển thị theo tình huống**

| Tình huống                         | Nguồn dùng             | Độ mới                    |
| ---------------------------------- | ---------------------- | ------------------------- |
| Có mạng                            | DB                     | ✅ Mới nhất (tức thời)    |
| Offline, đã mở app trước đó        | Cache localStorage     | ✅ Tính đến lần mở cuối   |
| Offline, chưa từng mở app          | File tĩnh trong bundle | 🟡 Tính đến lần build app |
| Không kết nối được DB, cache trống | File tĩnh trong bundle | 🟡 Tính đến lần build app |

> 💡 **Điểm cần nhớ:** app hiện tại **100% nằm ở dòng cuối bảng** — mọi người dùng luôn thấy nội dung tại lần build app. Sau khi làm GĐ 3, **3 dòng đầu trở thành bình thường**, dòng cuối chỉ còn là đường lui. Đây là lý do thay đổi này **an toàn**.

**✅ DoD (6/6 — đo 2026-09-20):**

1. ✅ Admin sửa 1 bài → app thấy nội dung mới **không cần build lại** — `TC-3d.3`.
2. ✅ Tắt `content_source = 'static'` → app chạy lại bình thường với data cứng (**rollback 1 nút**) — `TC-3d.5`: cache **bị xoá**, trang chương vẫn đủ bài. ⚠️ Lần đo đầu (2026-09-20, sáng) chỉ là **mô phỏng** giá trị công tắc, chưa `UPDATE` DB thật. ✅ **Sau đó đã gạt THẬT rồi bật lại:** `app_config` ghi `content_source.updated_at = 2026-09-20T13:23:28Z` và giá trị hiện là `"remote"` — đúng trạng thái an toàn cần có. 📌 **Giới hạn của bằng chứng:** **không thể** chứng minh trạng thái TRUNG GIAN `static` (giá trị đã trở về `remote`, mà bảng chỉ giữ giá trị hiện tại) — thứ đo được chỉ là **dấu vết thời gian của lần ghi** cộng với lời xác nhận của người chạy. Muốn có bằng chứng đầy đủ thì phải ghi lại `app_config` NGAY LÚC ĐANG Ở `static`.
3. ✅ **Guest mode đọc được nội dung từ DB**, và **vẫn** học offline được — `TC-3d.6` (`D-18`) + `TC-3d.4` (xoá cache, vẫn học được).
4. ✅ Publish bài lỗi → **revert được** về phiên bản trước — `TC-3c.7`: hoàn tác ghi phiên bản mới `4` mang nội dung `v1`.
5. ✅ Bài **Draft không truy cập được bằng anon key** (test thật bằng request không có session) — `D-15` (0 dòng) + `S-17`.
6. ✅ **ĐẠT (2026-09-20, `0013`)** — Biết được **một bé cụ thể đang dùng `content_version` nào** — `TC-3d.9` + cổng `D-19` + `S-28`.
   Ba cột trên `child_progress`: `content_version` · `content_source` (`db|cache|static`) · `content_seen_at`.
   App của bé báo lên **kèm nhịp đồng bộ tiến độ đang có** (không thêm request nào), và hồ sơ bé
   trên Admin hiện _"Nội dung bé đang thấy: phiên bản 21 · cache trong máy · báo lúc …"_.
   ⚠️ **Giới hạn đã ghi rõ trong tài liệu:** đây là **báo cáo của lần cuối máy bé còn mạng**, không phải
   trạng thái trực tiếp (máy offline không báo lên được) ⇒ luôn đọc kèm mốc thời gian.
   `content_source = "static"` = máy bé đang chạy nội dung trong **bundle** — ca đáng nghi nhất.
   ✅ **Đã đo màn hình cả 4 nhánh** (chưa báo · bản mới nhất · bản cũ hơn · không có số) bằng **màn chắn
   `fetch` trong trang**, nên **DB không bị ghi gì** và sau khi đo xong hồ sơ lại hiện đúng _"chưa báo"_.
   Cổng **`S-28`** giữ phần _"app thật sự BÁO lên"_ — và canh đủ **cả hai đường ghi** vào `child_progress`
   — vì `D-19` chỉ nói cột **đã có**, chưa nói ai ghi vào.

---

### 📍 GIAI ĐOẠN 4: NÂNG CAO 🟢

- [ ] **Quản lý Bot đấu trường.** 50 bot đang hardcode trong `schema.sql` + logic role `hardworking/normal/lazy` nằm trong `useLeagueStore.js`. Đây là **đòn điều chỉnh động lực học tập thật** — admin chỉnh độ khó bot theo tuần để trẻ không bị nản. _(Đặc thù repo này, bản 1.0 không nhắc.)_
- [ ] **Health & Ops dashboard.** `syncService.js` đang nuốt lỗi ở nhiều chỗ (`catch {}`) — không ai biết sync đang hỏng. Cần đếm tỉ lệ lỗi sync + quota Supabase.
- [ ] **Thông báo / Banner** — gửi banner in-app trước, push native sau.
- [ ] **Drop-off Analysis** — biểu đồ điểm nghẽn (làm được sau khi GĐ 2b có dữ liệu).
- [ ] **Sức khỏe kinh tế** — tổng Xu lưu hành, Xu kiếm/ngày, Xu tiêu/ngày. Không có "sink" thì Xu mất giá trị.
- [ ] **Cửa hàng động** — đưa vật phẩm thú cưng / avatar lên DB.
- [ ] **Xuất dữ liệu cho phụ huynh.**
- [ ] **Skill Tagging** — gắn tag kỹ năng cho câu hỏi (tiền đề cho Adaptive Learning). Chỉ làm khi thực sự cần.

---

## 🗄️ PHẦN 4: THIẾT KẾ DỮ LIỆU ĐỀ XUẤT

```
── SỬA BẢNG HIỆN CÓ ────────────────────────────────────────
profiles            + role, is_banned, last_seen_at
child_profiles      + ban_reason, created_from (guest|oauth)

── CẤU HÌNH & KINH TẾ (GĐ 0-1) ─────────────────────────────
app_config          key, value JSONB, description, updated_by, updated_at
reward_configs      key, coins, xp, grade_scope, multiplier,
                    effective_from, effective_to, enabled
coin_transactions   child_id, amount, reason, ref_id, balance_after, created_at
xp_events           child_id, amount, source, created_at

── KIỂM SOÁT (GĐ 0) ────────────────────────────────────────
admin_audit_log     actor_id, action, entity, entity_id,
                    before, after, reason, created_at

── PHÂN TÍCH (GĐ 2) ────────────────────────────────────────
question_attempts    child_id (NULL nếu guest), question_ref, lesson_id,
                     topic, ms, correct, attempt_no, created_at
                     ⏸ app_events — HOÃN, chưa có câu hỏi nào cần nó
support_tickets      child_id, type, message, status, created_at

── NỘI DUNG (GĐ 3) ─────────────────────────────────────────
content_grades      id, name, description, icon, color, order
content_chapters    id, grade_id, name, description, icon, order
content_lessons     id, chapter_id, title, type, description, order, status
content_lesson_versions
                    lesson_id, version, payload JSONB, status,
                    published_at, published_by

── VẬN HÀNH (GĐ 4) ─────────────────────────────────────────
notifications       title, body, target_scope, starts_at, ends_at, enabled
```

> 📌 **Áp dụng Q6 (1 admin):** Không có bảng phân quyền, không có `admin_roles`, không có `assigned_to` trên ticket, không có luồng phê duyệt. Toàn bộ việc phân biệt admin/user chỉ dựa trên **1 cột `profiles.role`**.
> Khi tương lai cần nhiều admin → thêm bảng `admin_roles` và đổi ruột `is_admin()`. **Không ảnh hưởng gì tới schema ở trên.**

**Lưu ý kỹ thuật:**

- `is_admin()` bắt buộc `SECURITY DEFINER`, nếu không sẽ đệ quy vô hạn qua RLS.
- Mọi policy admin phải gọi `is_admin()`, không hardcode UUID.
- `admin_audit_log` chỉ cho INSERT — không UPDATE/DELETE.
- 📌 Q2: nếu sau này chuyển sang tính Xu/XP server-side, **schema không cần đổi** — chỉ đổi nơi gọi.

---

## 🧩 PHẦN 5: DANH MỤC TÍNH NĂNG THEO NHÓM

### Nhóm A — Bắt buộc (rẻ, giá trị cao) 🔴

| #   | Tính năng                                                                         | Giai đoạn |
| --- | --------------------------------------------------------------------------------- | --------- |
| A1  | `admin_audit_log` — truy vết mọi hành động admin                                  | 0         |
| A2  | Kill switch nội dung `content_source`                                             | 0         |
| A3  | Sổ cái Xu/XP (`coin_transactions`)                                                | 1         |
| A4  | Tầng dữ liệu event (`question_attempts`, `app_events`)                            | 2         |
| A5  | `app_config` dùng chung cho cả kinh tế lẫn vận hành (**1 hệ thống, không xây 2**) | 0-1       |
| A6  | `content_version` + content manifest — chống lệch bundle/DB (mục 3e)              | 3a        |
| A7  | RLS nội dung: `anon` chỉ thấy `status = 'published'`                              | 3a        |

### Nhóm B — Hỗ trợ khách hàng 🟡

| #   | Tính năng                     | Giai đoạn |
| --- | ----------------------------- | --------- |
| B1  | Tra cứu học sinh + hồ sơ 1 bé | 2a        |
| B5  | Hộp thư báo lỗi câu hỏi       | 2c        |

> ✂️ **Đã cắt khỏi GĐ 2 (quyết định 2026-09-20):**
>
> | Cũ  | Tính năng                                 | Xử lý                                                                         |
> | --- | ----------------------------------------- | ----------------------------------------------------------------------------- |
> | B2  | Khôi phục streak thủ công + Streak Freeze | → chuyển thành **cửa hàng vật phẩm kiểu Duolingo**, người dùng tự mua bằng Xu |
> | B3  | Cấp/thu Xu thủ công                       | → bỏ                                                                          |
> | B4  | Reset PIN phụ huynh từ xa                 | → bỏ — `parentPin` chưa đồng bộ lên DB (`useUserStore.js:70,165`)             |

### Nhóm C — Đặc thù repo này 🟡

| #   | Tính năng                 | Giai đoạn | Vì sao                                                                                                                        |
| --- | ------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| C1  | Quản lý Bot đấu trường    | 4         | 50 bot hardcode trong `schema.sql` + logic role trong `useLeagueStore.js`. Chỉnh độ khó bot = đòn điều chỉnh động lực học tập |
| C2  | Thông báo / Banner in-app | 4         | Rẻ, giá trị cao                                                                                                               |
| C3  | Health & Ops dashboard    | 4         | `syncService.js` nuốt lỗi ở nhiều chỗ (`catch {}`) — hiện không ai biết sync hỏng                                             |

### Nhóm D — ✂️ Đã cắt khỏi v1

| #   | Tính năng            | Lý do cắt                                                            |
| --- | -------------------- | -------------------------------------------------------------------- |
| D1  | A/B Testing nội dung | Cần event layer + traffic + versioning — tức là phải xong hết GĐ 1-3 |
| D2  | Media Library        | App hiện **không có media thật**, toàn emoji + CSS. YAGNI            |
| D3  | Seasonal Shop        | Làm sau khi có ledger                                                |
| D4  | Adaptive Learning    | Cần skill tagging + event layer trước                                |

**Chi tiết các tính năng đã cắt** _(giữ lại để tham khảo, làm ở v2)_:

- **A/B Testing:** xuất bản 2 luồng bài học khác nhau để so nhóm nào hoàn thành nhanh hơn.
- **Media Library:** quản lý tập trung ảnh/audio/Lottie, tái sử dụng thay vì upload trùng.
- **Seasonal Shop:** bộ Avatar/Khung viền chỉ mở bán dịp Tết, Trung Thu, tự động đóng khi hết hạn.

---

## 🛠️ PHẦN 6: CÔNG NGHỆ & RÀNG BUỘC KỸ THUẬT

### 6.1. Đề xuất công nghệ

| Hạng mục      | Chọn                                                                   | Ghi chú                                             |
| ------------- | ---------------------------------------------------------------------- | --------------------------------------------------- |
| Framework     | React + Vite, **app riêng** `admin/` cùng repo                         | 🔴 Không nhập vào `client/` (xem mục 6.3)           |
| UI Kit        | Shadcn-UI + TailwindCSS                                                | Nhẹ hơn AntD; AntD chỉ OK nếu app thật sự tách biệt |
| Data Fetching | React Query                                                            | Hợp cho bảng admin có phân trang + cache            |
| Form          | React Hook Form + Zod                                                  | Zod **tái dùng** cho validate slide schema ở GĐ 3a  |
| Biểu đồ       | **`recharts` (đã có sẵn trong dependencies)**                          | ✅ Không thêm thư viện chart mới                    |
| Rich Text     | TipTap hoặc QuillJS                                                    | Chỉ cần khi soạn lý thuyết                          |
| Hosting       | **Vercel Hobby — 2 project riêng** (app chính + admin), chi phí **$0** | 📌 Q1 — xem mục 6.3                                 |
| Mobile        | ❌ **Không** — Admin Portal chỉ cần web, không đóng gói Capacitor      | 📌 Q1: giảm đáng kể khối lượng công việc            |

### 6.2. Ràng buộc & cảnh báo 🔴

1. **Admin phải là bundle riêng.** Hiện 0 lazy-load; thêm admin vào `App.jsx` = tăng bundle cho app của trẻ. ⚠️ Lưu ý: `capacitor sync` copy toàn bộ `dist/` vào APK — nên lazy-load **không** giải quyết được, vẫn phải tách app.
2. **Không bao giờ đặt `service_role` key ở frontend admin.** Dùng anon key + RLS. Thao tác đặc quyền → Supabase Edge Function.
3. **Không sửa trực tiếp `supabase/schema.sql`.** File đã chạy trên prod. Dùng `supabase/migrations/`.
4. **`curriculum.js` là điểm chuyển đổi duy nhất** — giữ nguyên chữ ký 4 helper, chỉ đổi ruột.
5. **Giữ `gradeXData.js` làm fallback offline — không xóa.** DB là nguồn chính; file tĩnh là đường lui cho ca "offline lần đầu". 📌 Q5 — xem mục 3.0.
6. **Slide type mới = cần update App.** Registry phải được version hóa.
7. **RLS nội dung phải lọc `status = 'published'` cho `anon`.** Nếu không, bài Draft lộ ra ngoài.

### 6.3. Hosting Admin Portal trên Vercel (📌 Q1 — miễn phí)

**Kết luận: khả thi, không mất thêm tiền, không cần mua domain.** Vercel Hobby (free) hỗ trợ sẵn đúng mô hình này.

| Chỉ số (Hobby)                   | Giới hạn  | Nhu cầu dự án         | Dư? |
| -------------------------------- | --------- | --------------------- | --- |
| Projects                         | 200       | 2                     | ✅  |
| **Projects gắn cùng 1 Git repo** | **25**    | **2**                 | ✅  |
| Domains per project              | 50        | 1                     | ✅  |
| Deployments / ngày               | 100       | vài lần               | ✅  |
| Fast Data Transfer               | 100 GB    | Admin traffic rất nhỏ | ✅  |
| Invocations (Functions)          | 1.000.000 | không đáng kể         | ✅  |

**Cách làm — 5 bước, không tốn phí:**

1. Tạo **Vercel project thứ 2**, trỏ vào **cùng Git repo** hiện tại.
2. Đặt **Root Directory = `admin/`** (Vercel build riêng thư mục đó).
3. Vercel tự cấp subdomain miễn phí: `admin-<tên-dự-án>.vercel.app`.
4. Thêm env cho project admin: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
5. App chính giữ nguyên project cũ — **hoàn toàn không bị ảnh hưởng**, kể cả khi admin deploy lỗi.

**Về domain riêng:** Nếu muốn `admin.tenmien.com` thì trỏ CNAME về Vercel — **vẫn miễn phí**, chỉ tốn tiền mua domain (nếu bạn chưa có). Không bắt buộc.

**Về Supabase:** Dùng chung 1 project Supabase với app chính. Không cần gói trả phí cho quy mô này.

> ⚠️ **Lưu ý duy nhất cần biết:** Vercel Hobby giới hạn **"non-commercial, personal use only"**. Hiện dự án là cá nhân → OK. Nếu sau này app có doanh thu (quảng cáo, gói trả phí), cần nâng lên Pro ($20/tháng). Điều này **không ảnh hưởng quyết định kiến trúc** — nâng cấp plan không cần đổi code.

**Vì sao KHÔNG nên dùng chung project với app chính (route `/admin`)?**

| Cách                                       | Bundle app trẻ                          | Rủi ro deploy                | Nhận xét              |
| ------------------------------------------ | --------------------------------------- | ---------------------------- | --------------------- |
| Chung project, route `/admin`              | ❌ Tăng (APK to hơn)                    | Admin lỗi → app trẻ lỗi theo | Không nên             |
| Lazy-load route trong `client/`            | ❌ Vẫn tăng (Capacitor copy cả `dist/`) | Chung                        | Không giải quyết được |
| **Project thứ 2, Root Directory `admin/`** | ✅ Không đổi                            | ✅ Độc lập                   | ✅ **Chọn cách này**  |

---

## ✅ PHẦN 7: CÁC QUYẾT ĐỊNH ĐÃ CHỐT

> Chốt ngày **2026-09-19**. Nếu sau này đổi bất kỳ mục nào → ghi lại vào Changelog.

| #   | Câu hỏi                             | Phương án đã cân nhắc                                               | ✅ Chốt                                                                                                                                                                |
| --- | ----------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q1  | Admin Portal đặt ở đâu?             | (a) app Vite riêng cùng repo · (b) repo riêng · (c) chung `client/` | **(a)** — app Vite riêng `admin/`, deploy bằng **Vercel project thứ 2, miễn phí**. Admin **chỉ cần web**, không build mobile                                           |
| Q2  | Điểm Xu/XP tính ở đâu?              | (a) client + config DB · (b) RPC server-side                        | **(a)** — client tính, đọc config từ DB. **Bắt buộc** có màn hình Admin sửa config + ghi ledger để phát hiện bất thường                                                |
| Q3  | Offline content dùng gì?            | (a) localStorage · (b) IndexedDB · (c) SQLite                       | **(a)** — giữ pattern `zustand persist` hiện có, không thêm tầng mới                                                                                                   |
| Q4  | Khi nào bắt đầu GĐ 3 (CMS)?         | (a) ngay sau GĐ 1 · (b) sau khi GĐ 2 ổn định                        | **(b)** — bắt đầu GĐ 3 sau khi **hoàn thành GĐ 2**                                                                                                                     |
| Q5  | Có giữ guest mode sau khi CMS xong? | (a) có · (b) bỏ, bắt buộc đăng nhập                                 | **(a)** — **giữ guest mode**. ✅ Đã xác nhận guest **đọc được nội dung từ DB**, nên **không cần xây seed pack** — chỉ cần giữ file tĩnh làm fallback offline (mục 3.0) |
| Q6  | Có bao nhiêu admin?                 | 1 · 2-5 · đội vận hành                                              | **1 admin duy nhất** — không RBAC, không phân cấp quyền. Mở rộng sau khi cần                                                                                           |

### 7.1. Hệ quả của các quyết định (điểm cần lưu ý)

- **Q1** → Admin chạy trên hạ tầng **hoàn toàn tách biệt** với app của trẻ. Deploy admin lỗi **không** làm app chính sập. Chi phí **$0**. ⚠️ Chỉ cần nhớ giới hạn _"non-commercial"_ của Vercel Hobby (mục 6.3).
- **Q2** → Đánh đổi có ý thức: **đơn giản, nhanh** ↔ **chấp nhận rủi ro sửa localStorage**. Giảm nhẹ bằng ledger + cảnh báo bất thường. Đường nâng cấp lên phương án (b) **không cần đổi schema**.
- **Q5** → Guest mode **không** phải lý do cần fallback tĩnh (đã đính chính ở mục 3.0). 795 KB data tĩnh **được giữ nguyên** làm đường lui cho ca "offline lần đầu" — và vì bundle vốn đã chứa nó, đây là **không thay đổi**, không phải đánh đổi.
- **Q6** → Cắt được khá nhiều việc so với bản 2.0: không bảng phân quyền, không phân cấp admin, không luồng phê duyệt, không `assigned_to` trên ticket.

---

## 📊 PHẦN 8: BẢNG THEO DÕI TIẾN ĐỘ

| Giai đoạn | Nội dung                  | Ước lượng                     | Phụ thuộc                  | Trạng thái                                                                 |
| --------- | ------------------------- | ----------------------------- | -------------------------- | -------------------------------------------------------------------------- |
| GĐ 0      | Vá nền & bảo mật          | Nhỏ–Vừa                       | —                          | ✅ Xong — đã deploy `admin-toanvuive.vercel.app`                           |
| GĐ 1      | Sổ cái & cấu hình kinh tế | **Lớn** (refactor 14 điểm)    | GĐ 0                       | ✅ Code + test sơ bộ + giá đã chốt (0003)                                  |
| GĐ 2      | Hỗ trợ & phân tích cơ bản | Vừa                           | GĐ 1                       | ✅ **Xong** — 2a + 2b + 2c test PASS hết                                   |
| GĐ 3      | CMS (3a → 3d)             | **Rất lớn** — rủi ro cao nhất | 📌 **GĐ 2 phải xong (Q4)** | 🟢 **3a · 3b · 3c · 3d ĐÃ XONG — DoD 6/6 ✅** (thêm tính năng tạo bài mới) |
| **Lát L** | Hẹn giờ truy vấn          | Nhỏ — nhưng chạm MỌI trang    | — (độc lập với GĐ 3)       | ✅ **Xong** — 1 lớp bọc + cổng `S-19` theo `TC-L.1` → `TC-L.3`             |
| GĐ 4      | Nâng cao                  | Vừa                           | GĐ 3                       | ⬜ Chưa bắt đầu                                                            |

---

## 📝 CHANGELOG

| Phiên bản | Ngày       | Thay đổi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0       | —          | Bản đầu: 4 giai đoạn, dựa trên tham khảo EdTech                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2.0       | 2026-09-19 | Viết lại theo số liệu đo thực tế. Thêm **GĐ 0 (vá nền)**, tách GĐ 2→(2a,2b,2c) và GĐ 3→(3a,3b,3c,3d). Bổ sung 4 lỗ hổng, sổ cái Xu/XP, audit log, kill switch, slide registry, quản lý bot. Thêm DoD + bảng quyết định. Cắt A/B Testing, Media Library, Seasonal Shop khỏi v1.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2.1       | 2026-09-19 | **Chốt 6 quyết định.** Thêm mục **6.3 — Hosting Vercel miễn phí** (2 project, Root Directory `admin/`, subdomain free, cảnh báo non-commercial). Giản lược theo Q6: bỏ `assigned_to`, bỏ RBAC khỏi schema. Ghi rõ rủi ro đã chấp nhận của Q2 + biện pháp giảm nhẹ. Đánh dấu 📌 các mục bị ảnh hưởng bởi quyết định. Thêm cột "Phụ thuộc" vào bảng tiến độ (GĐ 3 chặn bởi GĐ 2 theo Q4). Xác nhận Admin **không cần mobile**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2.2       | 2026-09-19 | 🔴 **Đính chính:** bản 2.0/2.1 gắn sai "seed content pack" với guest mode. Thực tế guest **đọc DB được** — hạn chế của guest nằm ở tầng ghi dữ liệu, không ở tầng mạng. Thêm **mục 3.0** (đính chính) và **mục 3.0.1** (giữ nguyên file tĩnh, không xây seed pack). Thêm **mục 3e — Chống lệch nội dung bundle/DB**: chứng minh rủi ro tự giới hạn (xấu nhất = hành vi hiện tại), 3 rủi ro còn lại (E1/E2/E3) + cách xử lý, bảng tóm tắt nguồn nội dung theo tình huống. Bổ sung `content_version`, content manifest, RLS published-only cho `anon`. Cập nhật DoD GĐ 3 (6 điều). Bỏ yêu cầu xây seed pack.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2.3       | 2026-09-19 | 🛠️ **Thực thi Giai đoạn 0.** Tạo `supabase/migrations/0001_admin_foundation.sql` (role/is_banned, `is_admin()` SECURITY DEFINER, **vá lỗ hổng leaderboard**, policy admin, `admin_audit_log`, `app_config`, index `parent_id`). Tạo app `admin/` độc lập (Vite + React 19 + Tailwind v4 + Supabase anon key) gồm auth provider, route guard, login Google, layout, dashboard có 4 phép kiểm tra RLS. Thêm `admin/README.md` (hướng dẫn migration → env → cấp quyền → deploy Vercel → OAuth redirect). Thêm script `dev:admin` / `build:admin` ở repo gốc; sửa `install:all` (trỏ sai `../server`). Đánh dấu hoàn thành 16/19 mục GĐ 0. ⏳ Còn lại: tạo Vercel project, thêm Redirect URL, set role admin.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2.4       | 2026-09-19 | 🛠️ **Thực thi Giai đoạn 1.** Tạo `supabase/migrations/0002_reward_economy.sql` (`reward_configs` 27 khoá, `coin_transactions`, `xp_events`, `level_curve`, `reward_multiplier`). Tạo `client/src/services/rewardService.js` — đọc đồng bộ từ cache, làm mới nền, không tạo vòng import. Thêm `grantReward()` + ghi sổ cái vào `useUserStore`. **Refactor 14 điểm phát thưởng ở 8 file** (không phải 12 như kiểm kê ban đầu). Tách port dev: client 5173, admin 5174. Xây màn hình **Game Economy** (`admin/src/pages/EconomyPage.jsx`) + `admin/src/lib/audit.js`. Bỏ RPC `log_reward` (RLS làm được, ít hơn 1 tầng). Thêm `docs/admin_portal_test_cases.md` — **27 test case** cho GĐ 0 + GĐ 1, có lệnh copy-paste, bảng theo dõi kết quả, khung GĐ 2-4. Verified: `oxlint` sạch · `vite build` client và admin đều pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2.5       | 2026-09-19 | ✅ **Hoàn tất Giai đoạn 1.** Thêm màn hình **Người dùng** (`admin/src/pages/UsersPage.jsx`) — join `child_profiles` ⨝ `profiles` ⨝ `child_progress`, phân trang 20/trang, tìm theo tên bé hoặc email phụ huynh, khoá/mở khoá tài khoản kèm lý do bắt buộc, cột mức độ hoạt động (suy ra từ `last_active_date`, **không cần bảng mới**), cột **Xu/24h** gắn cờ khi vượt 500. Thêm 5 test case (`TC-1.13` → `TC-1.17`), tổng **32 test case**. GĐ 1 hoàn tất phần code — chờ test.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2.6       | 2026-09-19 | 🤖 **Thêm automation test** — `scripts/test-admin-portal.mjs`, chạy bằng `npm run test:portal`. **Không cần thư viện nào** (dùng `fetch` có sẵn của Node 18+). 20 mục tự động: 8 mục quét source (thưởng gán cứng còn sót, dependency array mồ côi, khoá `grantReward` không tồn tại, seed SQL lệch code, 2 bundle lẫn nhau, `service_role` ở frontend) + 12 mục gọi REST bằng anon key (seed đủ/đúng, RLS chặn ghi leaderboard, chặn đọc `profiles`/`child_profiles`/sổ cái, `is_admin()` false, audit log bất biến). Kết quả hiện tại: **20 PASS · 0 FAIL**. Exit code dùng được trong CI. Tool in ra danh sách **23 mục cần test tay** — vì **Google OAuth không thể tự động hoá**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2.7       | 2026-09-20 | 🐞 **Vòng sửa lỗi từ test tay.** (1) `TC-R.7` — Sổ Tay Ôn Bài Sai: `dueMistakes` gọi lại mỗi render, mà `resolveMistake()` đổi `nextReviewDate` ngay → mảng co giữa phiên → câu kế bị nhảy và phiên kết thúc sớm. Sửa bằng ảnh chụp `reviewQueue` lúc mở tab. (2) `TC-R.8` — màn hình kết quả **cả 6 mini game** viết chết số `120/70/30/10` Xu và `200/120/50/20` XP; đổi giá trên Admin thì Xu thực nhận đúng nhưng chữ vẫn ghi số cũ. Sửa bằng cách lưu số THẬT mà `grantReward()` trả về. (3) Cache giá thưởng: throttle 60s quá dài → hạ còn 5s. (4) Hoàn tất mục cuối GĐ 1: ghi `ban_reason` vào `child_profiles`. (5) Thêm `S-9`/`S-10` (gán cứng số trên UI, có **canary** tự kiểm chứng bộ dò), `S-11` (giá trị seed SQL khớp code). (6) 🔴 **Sửa `D-2` — bản cũ sai thiết kế:** nó đòi DB sống phải BẰNG `REWARD_DEFAULTS`, tức là test sẽ FAIL ngay khi tính năng đúng. Đổi thành kiểm tra dữ liệu hợp lệ + liệt kê khoá đã chỉnh khác mặc định. Tổng: **23 PASS · 0 FAIL**. Thêm `TC-R.7`, `TC-R.8` → **34 test case**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2.8       | 2026-09-20 | ✅ **GĐ 0 hoàn tất** — Admin Portal đã deploy tại `https://admin-toanvuive.vercel.app` (project Vercel thứ hai, Root Directory `admin`). Ghi lại lỗi deploy đã gặp ở mục DoD GĐ 0 để lần sau không mất thời gian. ✂️ **Tinh gọn GĐ 2 theo yêu cầu:** cắt khỏi 2a bốn mục (khôi phục streak thủ công, cấp/thu Xu thủ công, cấp Streak Freeze, reset PIN phụ huynh) — Streak Freeze sẽ làm thành **cửa hàng vật phẩm kiểu Duolingo**. Viết rõ **mục tiêu của 2b**: nó tồn tại để trả lời 3 câu hỏi ở mức từng câu hỏi (câu nào hỏng · đoán bừa hay không hiểu · chủ đề nào yếu), và **cố ý loại** 2 câu hỏi khác (drop-off, retention) vì chưa đủ người dùng. `app_events` **hoãn** — chưa có ai cần nó. Đổi `question_id` → `question_ref` kèm ghi chú: **không có `question_id` nào tồn tại** (câu trong bài học không có `id`; câu luyện tập sinh ngẫu nhiên lúc chạy) → ✅ **đã giải quyết ngay sau đó:** câu sinh ngẫu nhiên đánh ID theo **khuôn** (`topicId` đã có sẵn — không phải sửa file data nào), câu viết tay đánh ID theo câu; xem khối `question_ref` ở mục Giai đoạn 2. Đổi thứ tự GĐ 2 thành `2a → 2c → 2b`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2.9       | 2026-09-20 | 🛠️ **Thực thi GĐ 2a.** Thêm `admin/src/pages/ChildProfilePage.jsx` (route `/users/:childId`) — màn hình **chỉ đọc** gồm 7 khối: danh tính + trạng thái khoá, tiến độ cấp độ, tiến độ học tập, sổ tay lỗi sai, lịch sử giao dịch Xu, lịch sử XP, thú cưng. Tên bé trong `UsersPage` thành link sang hồ sơ. 🔴 **Phát hiện:** bảng `child_mistakes` có từ `schema.sql` nhưng **client chưa bao giờ ghi** → luôn rỗng; và cột `answer` là `INT` trong khi đáp án so sánh là `'>'`/`'<'`/`'='`. Thêm `0004_mistakes_sync.sql` (sửa `answer` → `TEXT`, + index `child_id, failed_count DESC`) và `syncMistakeToCloud()` trong `useProgressStore` (INSERT lần đầu → lưu `dbId` → UPDATE các lần sau; guest bỏ qua; lỗi chỉ cảnh báo). Thêm 6 test case (`TC-2.1` → `TC-2.6`) → **40 test case**. Verified: build admin 3.02s · build client 8.24s · `23 PASS · 0 FAIL` · 4 truy vấn PostgREST của hồ sơ đã kiểm chứng không lỗi cột/quan hệ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2.10      | 2026-09-20 | 🧪 **Thêm kiểm tra biến chưa khai báo (`no-undef`) cho cả 2 app.** `isUuid is not defined` từng lọt ra trình duyệt dù `vite build` **và** chẩn đoán VS Code đều báo sạch — đây là lỗi **lúc chạy**, build không bao giờ bắt được. Thêm `admin/.oxlintrc.json` (client đã có sẵn từ trước) và test tự động `S-12` chạy `oxlint` trên **cả** `client/src` lẫn `admin/src`, dùng binary có sẵn trong `client/node_modules` nên **không phải cài thêm gì**. 🔴 **Đo được: `oxlint` mặc định KHÔNG bật `no-undef`** (exit 0, không in gì) — phải có `"no-undef": "deny"` trong `.oxlintrc.json`, nên `S-12` kiểm tra luôn sự tồn tại của 2 file cấu hình để tránh test xanh giả. Bộ dò đã kiểm chứng: cố ý thêm biến chưa khai báo → `S-12` FAIL đúng như mong đợi. Thêm `TC-2.7` → **41 test case**. 🔴 **Đã thử cài `oxlint` trực tiếp vào `admin` và THẤT BẠI — đừng thử lại.** Đã kiểm chứng nghiêm túc: tắt hẳn 2 dev server, xoá sạch `admin/node_modules` + `package-lock.json`, cài lại từ đầu — tổng **7 lần thử** (`npm install`, `--include=optional`, `--force`, khai báo thẳng vào `optionalDependencies`, cài trực tiếp gói binding). Tất cả đều thất bại: gói `@oxlint/binding-win32-x64-msvc` **có** trên registry, `os=win32`/`cpu=x64` **khớp máy này**, lockfile **có** ghi entry, nhưng `npm ls` báo `(empty)` và không có file `*oxlint*.node` nào trong `node_modules`. Trong khi đó `client/node_modules/@oxlint/binding-win32-x64-msvc` **có sẵn và chạy tốt** → chốt dùng binary của client (đúng như `S-12` đang làm). Muốn có cổng chặn ở tầng Vercel thì phải giải bài toán npm này trước; **không đáng**, vì `npm run test:portal` đã chặn được.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2.11      | 2026-09-20 | 🛠️ **Thực thi GĐ 2c — Hộp thư báo lỗi câu hỏi.** Thêm `supabase/migrations/0005_support_tickets.sql`: bảng `support_tickets` (`child_id` NULL = khách), CHECK độ dài (`message` ≤ 1000, `question_text` ≤ 2000), 2 index, **5 policy**. Điểm cần nhớ: policy ẩn danh bị **khoá chặt** — chỉ cho INSERT dòng có `child_id IS NULL`, `status='new'`, và mọi cột do admin quản lý đều NULL; **không** cho đọc/sửa/xoá. Viết rõ trong đầu file vì sao cho khách gửi (khách chiếm phần lớn người dùng) và vì sao **không** dùng `WITH CHECK (true)` (đúng lỗ hổng đã vá ở GĐ 0). Phía client: `client/src/components/report/ReportQuestionButton.jsx` + `.css`, gắn vào mọi slide câu hỏi qua `.report-question-slot` trong `LessonPage`. Phía admin: `admin/src/pages/ReportsPage.jsx` (route `/reports`, link menu **📮**) — lọc theo trạng thái kèm số đếm, ô ghi chú xử lý, nút đổi trạng thái, **mọi thay đổi đều ghi `admin_audit_log`**. ✂️ **Chốt phạm vi:** sửa nóng nội dung **không** thuộc 2c (nội dung còn ở file tĩnh) → đẩy sang GĐ 3, ticket chỉ chụp đủ thông tin để tìm và sửa. Thêm 6 test case (`TC-2.8` → `TC-2.13`, gồm `TC-2.11` kiểm tra khoá ẩn danh bằng 4 lệnh copy-paste) → **47 test case**. Verified: embed lồng `child_profiles → profiles` qua PostgREST đã chạy thử **OK** · build admin 2.83s · build client 6.58s · `S-12` xanh. ✅ Đã chạy `0004` + `0005`. **`TC-2.8` → `TC-2.13` PASS toàn bộ** — khách gửi được (`child_id = NULL`), khoá ẩn danh chặn 6/6 phép thử, admin đổi trạng thái và ghi được `admin_audit_log`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2.12      | 2026-09-20 | 🛠️ **Thực thi GĐ 2b — lát 2b-1 (tầng dữ liệu phân tích).** Thêm `0006_question_attempts.sql`: bảng `question_attempts` (`BIGSERIAL`, `child_id` NOT NULL), **chỉ 2 index** vì bảng này ghi liên tục, **3 policy** (parent insert/select + admin read) và **không có policy nào cho `anon`**. Thêm hàm `purge_old_attempts(keep_days)` — SECURITY DEFINER, chặn `keep_days < 30`, và **`REVOKE` khỏi `PUBLIC`/`anon`/`authenticated`**: PostgreSQL mặc định cho `PUBLIC` gọi mọi hàm, không thu hồi thì bất kỳ ai có anon key cũng xoá sạch dữ liệu qua `/rest/v1/rpc/`. Phía client: `attemptService.js` (bắn rồi quên, khách bỏ qua, `ms` vượt trần 5 phút ghi `NULL`), bọc `generateQuestion()` để sinh `ref` = `tmpl:<khuôn>` **không đụng vào thân hàm** (đã kiểm chứng 57 khuôn × 5 lớp, `ref` ổn định), `ref` cho câu viết tay = `lesson:<bài>:<slide>`, lưu `ref` kèm trong sổ câu sai. Gắn vào `LessonPage` (quiz + hội thoại), `PracticePage` (luyện tập + ôn sai), `ChallengePage`. Thêm `S-13` + 10 test case (`TC-2.14` → `TC-2.23`) → **57 test case**. 🔴 **Đã đo bộ dò `S-13`**: thêm file cố tình thiếu `recordAttempt` → FAIL đúng và chỉ đúng tên file. ✅ **Đã test đầu-đến-cuối — `TC-2.14` → `TC-2.23` PASS toàn bộ (2026-09-20).**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2.13      | 2026-09-20 | 🛠️ **Thực thi GĐ 3 — lát 3b (cây giáo trình chỉ đọc).** Thêm `admin/src/pages/ContentPage.jsx` (route `/content`, menu **📚 Nội dung bài học**): cây **Lớp → Chương → Bài** đọc thẳng từ `content_grades`/`content_chapters`/`content_lessons`, **không** đọc file tĩnh — vì nếu đọc file tĩnh thì màn hình vẫn hiện đúng nội dung, không có triệu chứng nào, mà lệch với thứ app của bé sẽ nhận ở 3d. Cổng `S-18` giữ đúng hai yêu cầu "chỉ đọc" + "đọc từ DB", kèm canary tự kiểm. 📉 **Chỉ nạp `payload` của bài đang chọn** (cả 362 bài ≈ 800 KB — admin giờ chạy được trên 4G nên không nạp hết). Tìm kiếm theo mã bài / tên bài / tên chương, đang tìm thì ẩn nhánh rỗng và tự mở nhánh có kết quả. Bài chưa publish hiện nhãn `nháp` + đếm ở đầu màn hình. 🔴 **Hai lỗi tự tìm ra và sửa, cả hai đều loại "nhìn không thấy":** (1) `truncate` = `white-space: nowrap` nên min-content của tên chương dài ≈ 485px, mà lưới chỉ khai báo cột cho `lg:` → ở màn 375px **cột rộng 485px và phải cuộn ngang**; sửa bằng `grid-cols-1` (`minmax(0,1fr)`) + `min-w-0` cho các span cắt chữ — đo lại: 0 phần tử tràn ở 375/768/1280. (2) Khi đang tìm, nhãn lớp ghi `10 ch · 2 bài` — số chương chưa lọc mà số bài đã lọc, hai vế khác hệ quy chiếu; sửa cho số chương cũng lọc theo kết quả. 🟡 **Phát hiện ngoài phạm vi lát 3b:** request hỏng ở **tầng mạng** (`net::ERR_FAILED`) làm trang **treo ở "Đang tải…"** vĩnh viễn, không báo lỗi — đo trên `/reports` (trang có từ trước) thấy **y hệt** ⇒ hành vi chung của cả Admin Portal, không phải hồi quy. `fetch` trần reject bình thường sau ~74ms trong cùng điều kiện nên chỗ treo nằm trong lớp Supabase; nên chữa bằng một lát riêng (hàm truy vấn dùng chung có hẹn giờ) chứ đừng vá lẻ một trang. Thêm `TC-3b.1` → `TC-3b.10` → **78 test case**. Verified: build admin 2.69s · `oxlint` (1 cảnh báo `set-state-in-effect`, cùng kiểu đã có ở 5 file khác) · **18 PASS · 0 FAIL · 0 SKIP**. ✅ `TC-3b.1` → `TC-3b.8` + `TC-3b.10` PASS; ✅ `TC-3b.9` (nhãn `nháp`) cũng PASS sau khi tạo một bài nháp thật.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2.14      | 2026-09-20 | 🔌 **Lát riêng — truy vấn không treo vô hạn.** Phát hiện khi làm 3b: request rơi vào **"hố đen"** (kết nối mở được nhưng server không bao giờ trả lời — đúng kiểu mất sóng 4G) làm promise của supabase-js **không bao giờ settle** → trang treo ở `Đang tải…` mãi mãi. Đo được **40,6s vẫn treo**; `/reports` (trang có từ trước) y hệt ⇒ lỗi chung của cả Admin Portal, không phải hồi quy của 3b. 🔴 **Hai lần đo sai, ghi lại để đừng lặp:** (1) Lần đầu tôi thấy `Đang tải…` sau 4 giây rồi kết luận "treo vĩnh viễn" — **SAI**, ca "kết nối bị TỪ CHỐI" tự lỗi sau ~10s; muốn nói "vĩnh viễn" thì phải chờ đủ lâu, hoặc dùng đúng ca hố đen mới là ca không bao giờ tự kết thúc. (2) Chữa bằng `AbortController` ở tầng `fetch` — abort **có chạy thật** (`net::ERR_ABORTED` có trong log) nhưng supabase-js **nuốt `AbortError`** rồi im lặng ⇒ vẫn treo 40,6s. **Đừng thử lại đường này.** ✅ **Cách chữa đã đo được:** hẹn giờ ở tầng **promise**. `admin/src/lib/henGio.js` (file thuần — không `import`, không `import.meta.env`) + `bocHenGio(client)` trong `supabase.js` bọc `from()`/`rpc()` nên **mọi truy vấn** đều có hẹn giờ, kể cả chỗ viết sau này. 🔴 **Bọc ở MỘT chỗ chứ không sửa từng trang:** có **27 chỗ gọi Supabase rải trên 9 file**, bọc từng chỗ là 27 cơ hội để sót một chỗ — mà chỗ bị sót sẽ lặng lẽ treo lại. `auth` **không** bị bọc (hẹn giờ cho `getSession`/`refreshToken` có thể làm treo phiên đăng nhập). Kết quả: hố đen nay báo lỗi rõ sau **16,3s** thay vì treo. Cổng `S-19` (`TC-L.1`) `import()` thẳng `henGio.js` và **thử thật** ba hành vi (treo → `HET_GIO`, reject → `{error}` chứ không ném, resolve → nguyên vẹn) — cố ý tách file thuần **để Node nạp được**, vì một cổng chỉ grep chuỗi thì sẽ xanh kể cả khi hàm trả về `undefined`. ✅ Canary đã đo: gỡ lớp bọc → `S-19` **FAIL** đúng thông báo "hẹn giờ đang là CODE CHẾT". Thêm `TC-L.1` → `TC-L.3` → **81 test case**. Verified: build admin 2.50s · `oxlint admin/src/lib` sạch · **19 PASS · 0 FAIL · 0 SKIP** · 6 route tải đúng số liệu, không trang nào treo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2.15      | 2026-09-20 | 📐 **Chỉnh bố cục `/content` cho hết thừa khoảng trống + responsive.** Đo ở 1440×900 trước khi sửa: lưới kết thúc ở `y=743` ⇒ **thừa 157px** trống dưới đáy; cây bị chặn cứng ở `max-h-[32rem]` (**512px**) dù có 362 bài; khung chi tiết cao **577px** chỉ để chứa **một dòng**. Đã sửa: (1) gộp số liệu `5 lớp · 41 chương · 362 bài` vào **cùng hàng tiêu đề**, bỏ khung riêng — tiết kiệm ~62px mà không mất thông tin; (2) bố cục cao đúng bằng màn hình với `h-dvh` + `flex-1`, cây và khung chi tiết **tự cuộn bên trong**, danh sách slide dài không đẩy trang dài ra; (3) thông báo trống căn giữa (`m-auto`) thay vì dồn lên trên; (4) mobile: cây chặn ở `max-h-[60vh]`, trang cuộn bình thường — vì xếp dọc thì chiều cao màn hình không chia được cho hai khung. Sau khi sửa: trống đáy **157px → 32px** (đúng bằng padding), vùng cuộn của cây **512px → 699px**, và chiều cao trang khi đã chọn bài **1308px → 900px** (không còn phải cuộn trang). 🔴 **Một lỗi đã mắc, ghi lại vì rất dễ lặp:** bản đầu dùng `min-h-dvh`. `min-h` chỉ là mức **SÀN**, nên khi khung chi tiết cao lên thì container cao theo nội dung ⇒ lưới phình lên **1172px** và khung chi tiết **không** tự cuộn mà đẩy cả trang dài ra. Muốn `flex-1` bên trong chia được chỗ thì cha **phải có chiều cao XÁC ĐỊNH** ⇒ dùng `h-dvh`. 💡 Bài học về cách đo: chỉ đo lúc **chưa** chọn bài thì bản sai vẫn trông "đã xong" — phải đo **cả hai trạng thái** (chưa chọn / đã chọn). 🟡 **Phát hiện ngoài phạm vi, chưa xử lý:** ở cửa sổ thấp hơn ~550px, **sidebar** (`Layout.jsx`) cao 550px vì menu không co được, kéo cả hàng cao theo và làm cả trang cuộn — đo ở khung 420px. Lỗi này **ảnh hưởng cả 6 trang admin**, không riêng `/content`, nên không sửa lẻ ở đây. Thêm `TC-3b.11` + `TC-3b.12` → **83 test case**. 📐 **Rồi dùng hết bề rộng + bỏ cắt chữ `…` — hai lỗi cùng gốc "chỗ rộng ra mà nội dung vẫn không đọc được".** **(1) Thừa hai bên:** `max-w-6xl` chặn nội dung ở 1152px — đo được **1920 thừa 288px mỗi bên**, **2560 thừa 608px mỗi bên**. Bỏ giới hạn ⇒ khoảng thừa còn đúng bằng padding (**32px** ở `lg`, **40px** ở `2xl`). **(2) Cắt chữ:** `truncate` (`nowrap` + `ellipsis`) biến tên dài thành `…`; đo trong DB: tên chương dài nhất **75 ký tự**, tên bài dài nhất **66 ký tự** — cột 340px thì chắc chắn vượt một dòng. Bỏ `truncate` ở tên lớp / tên chương / tên bài / đoạn xem trước slide ⇒ cho **xuống dòng**; kiểm bằng cách mở **hết** 41 chương + 362 bài rồi đếm phần tử có `scrollWidth > clientWidth` ⇒ **0 chữ bị cắt**, tên 75 ký tự hiện đủ trên **2 dòng**. 📱 **Responsive theo bề rộng:** cột cây lớn dần `lg:340px` → `xl:380px` → `2xl:440px` (tên dài cần chỗ, màn rộng thì có sẵn); danh sách slide **chia 2 cột ở ≥1536px** vì cột đơn rộng 1768px thì mỗi dòng dài ~200 ký tự, mắt khó dò. 🔴 **Bài học:** `truncate` là lỗi **im lặng** — bảng vẫn gọn, không lỗi, không tràn, chỉ mất nội dung; muốn tiết kiệm chỗ thì cho xuống dòng, đừng cắt. Verified: build admin 3.16s · `oxlint` chỉ còn cảnh báo `set-state-in-effect` có sẵn · **34 PASS · 0 FAIL · 0 SKIP** · **1024/1440/1920/2560 không cuộn trang, không tràn ngang**; 375/768 xếp dọc và cuộn trang như thiết kế. |

| 2.16 | 2026-09-20 | 📐 **Bố cục: hết thừa khoảng trống ở MỌI menu + sidebar không kéo dài trang.** Người dùng báo hai lần, cùng một gốc "chừa chỗ trống vô ích". **(1) Thừa hai bên:** 6 trong 7 màn hình có `mx-auto max-w-{4,5,6}xl` ở thẻ gốc — ở 2560px thì `/` (trần 896px) thừa **704px mỗi bên**, `/economy` `/reports` `/analytics` (1024px) thừa **640px**, `/users` `/users/<id>` (1152px) thừa **576px**. Đã bỏ hết trần, dùng chung thang padding `p-4 sm:p-6 lg:p-8 2xl:p-10` như `/content`. Đo lại ở 1280/1920/2560 trên **cả 6 route**: thừa trái = thừa phải = **0**, không tràn ngang. **(2) Sidebar kéo dài trang:** ở desktop sidebar là `static` nên cao theo nội dung menu (~550px); cửa sổ thấp hơn 550px thì nó kéo **cả hàng flex** cao theo ⇒ cả trang cuộn dù lẽ ra chỉ menu cần cuộn — đo ở khung 420px: sidebar 550px, trang 550px, **ảnh hưởng cả 6 trang**. Đã sửa ở `Layout.jsx`: `lg:static` → `lg:sticky lg:top-0 lg:h-dvh` (giữ `overflow-y-auto`). Đo lại: khung 420px → sidebar **420** (= đúng khung), menu **tự cuộn**, `/content` **không cuộn trang**; trang dài (`/economy` 2801px) cuộn xuống 400px thì sidebar vẫn `top=0` `bottom=700` — **phủ kín màn hình**; mobile 375px: ngăn kéo vẫn đóng/mở đúng (−256 → 0). 🔴 **`sticky` chứ không `fixed`:** `fixed` đòi chừa lề ở mọi trang, còn chỉ thêm `h-dvh` mà để `static` thì ở trang dài nền sidebar sẽ **hụt** dưới đáy — đổi một lỗi lấy một lỗi khác. Thêm cổng **`S-20`** (`TC-M.6`): cấm `max-w-{2..7}xl` khắp `admin/src` + bắt hợp đồng của sidebar, kèm **canary hai vế** (phải bắt được `max-w-4xl` giả, **và** không được bắt nhầm cỡ nhỏ hợp lệ `max-w-xs/sm/md/[180px]`). 🔴 **Một lần cổng FAIL SAI, ghi lại vì thuộc đúng loại bẫy đang gặp hoài:** bản đầu của `S-20` soi thẻ bằng `/<aside[\s\S]*?>/`, nhưng `Layout.jsx` có một **ghi chú** viết đúng chuỗi `` `<aside>` `` ở dòng 96 ⇒ regex khớp vào **chính ghi chú đó** rồi dừng tại dấu `>` của nó, cổng báo _"thiếu `lg:h-dvh`"_ dù mã đúng. Đã sửa: nhận diện thẻ bằng `id="admin-sidebar"` rồi mở cửa sổ cố định, **không parse thẻ bằng regex** — một cổng **FAIL sai** cũng tệ như cổng **xanh giả**, cả hai đều dạy người ta bỏ qua nó. ⚠️ **Tự nhắc:** trong lúc thử canary tôi đã sửa file bằng lệnh terminal (`Set-Content`) — vừa trái quy tắc, vừa suýt làm hỏng ký tự tiếng Việt vì PowerShell 5.1 ghi mặc định theo ANSI. Đã kiểm `git diff` (chỉ 12 dòng đổi ⇒ ký tự còn nguyên) và khôi phục bằng công cụ soạn thảo. **Lần sau: mô phỏng hỏng ở trong bộ nhớ hoặc trên bản sao, đừng sửa file thật bằng terminal.** Thêm `TC-M.6` → **84 test case**. Verified: build admin 2.88s · `oxlint admin/src` chỉ còn cảnh báo có sẵn · **35 PASS · 0 FAIL · 0 SKIP** (20 cổng `S` + 15 cổng `D`; bảng trong tài liệu test đang ghi 14/13/27 — đã sửa theo số ĐO được). 🚧 **Còn lại của GĐ 3: 3c** (sửa bài học) **và 3d** (app đọc từ DB). |

| 2.17 | 2026-09-20 | 🔴 **Hai lỗi người dùng báo sau khi mở rộng bố cục.** **(1) Bảng Kinh tế Xu/XP lệch cột:** `/economy` vẽ **7 `<table>` riêng**, mà `table-layout: auto` cho **mỗi bảng tự chia cột theo nội dung riêng** — đo được cột `Xu` rộng **318px** (nhóm Bài học) / **355px** (Khác) / **339px** (Luyện tập), nên cùng một ô nhập nằm ở ba vị trí **825 / 873 / 934**. Sửa: `table-fixed` + `<colgroup>` khai theo **phần trăm** `38.5/18/18/18/7.5` (không dùng px — px cố định thì ở màn rộng các ô nhập dồn một phía và lại thừa khoảng trống ở giữa). Đo lại ở **7 độ phân giải** (375→2560): **mọi bảng khớp cột**, `0` ô nhập lấn vào đệm, `0` tiêu đề bị cắt, chỉ 375px mới cuộn ngang trong hộp (đúng thiết kế từ `TC-M.3`). **(2) Chú thích quá dài:** bỏ trần bề rộng xong lộ ra 5 đoạn chú thích dài **92 / 96 / 101 / 118 / 125 ký tự một dòng** ở màn 1920. Sửa: chặn **chỉ đoạn văn** ở `max-w-[70ch]` — bảng và thẻ vẫn dùng hết bề rộng nên **không mọc lại khoảng trống hai bên**. Ở `/analytics` cả 3 chú thích dùng chung component `Section` nên sửa một chỗ là đủ. 🔴 **Hai lần số tính tay sai, ghi lại:** (a) chọn `min-w-[700px]` vì tính `1024 − 256 − 64 = 704` — **đo ra vẫn cuộn ngang 13px** ở màn 1024px, vì **quên thanh cuộn chiếm 15px** (khung thật 687px); (b) bản `17,5%` cho cột `119px` → content box `95px < 96px` nên ô nhập **lấn 1px vào đệm** ở 375px — phát hiện được vì phép kiểm so với **mép TRONG** của ô chứ không phải mép ngoài. **Con số tính tay không thay được con số đo.** Thêm cổng **`S-21`** (`TC-M.7`) giữ cả hai ràng buộc `min-w × % ≥ 120px` và `min-w ≤ 687px`, kèm **canary hai vế** (bản lần này **không sửa file thật** để thử canary — bài học từ lần trước). Thêm `TC-M.7` → **85 test case**. Verified: build admin 3.00s · `oxlint` chỉ còn cảnh báo có sẵn · **36 PASS · 0 FAIL · 0 SKIP** (21 cổng `S` + 15 cổng `D`). 🚧 **Còn lại của GĐ 3: 3c** (sửa bài học) **và 3d** (app đọc từ DB). |

| 2.18 | 2026-09-20 | ✏️ **Thực thi GĐ 3 — lát 3c (sửa bài học từ Admin).** `supabase/migrations/0009_content_drafts.sql`: bảng **`content_lesson_drafts`** + **6 hàm SQL** (`save_lesson_draft` · `publish_lesson` · `rollback_lesson` · `set_lesson_status` · `bump_content_version` · `ghi_vet_bai_hoc`). Giao diện: `admin/src/lib/soanBai.js` (thuần) + `admin/src/components/LessonEditor.jsx` + nút **✏️ Sửa bài này** trong `ContentPage`. 🔴 **Ba quyết định quan trọng, lý do đầy đủ ở [`docs/phase_3c_3d_decisions.md`](phase_3c_3d_decisions.md):** (1) **Bản nháp ở BẢNG RIÊNG, không thêm cột `draft_payload`** — RLS lọc theo **DÒNG** chứ không theo **CỘT**, nên bản nháp nằm chung dòng với bài `published` là lộ ra cho khách; (2) **Publish là MỘT hàm SQL** vì nó phải làm 4 việc (ghi phiên bản · cập nhật bài · xoá nháp · tăng `content_version`) — gọi lần lượt từ trình duyệt thì đứt giữa 4G là có thật; **vết kiểm toán ghi NGAY TRONG hàm** nên thao tác và vết không thể tách rời, và chỉ ghi **HÌNH DẠNG** chứ không ghi payload (một bài 11 slide ≈ 20 KB, ghi nguyên payload là nhân đôi `admin_audit_log` mỗi lần publish — mà bản đầy đủ đã nằm ở `content_lesson_versions`); (3) **Form sửa bài SINH TỪ `SLIDE_TYPES`** chứ không viết tay 6 form — viết tay là 6 chỗ để quên một khoá, mà khoá bị quên thì editor **ÂM THẦM NUỐT** khi bấm Lưu. Hoàn tác = **ghi phiên bản MỚI** mang nội dung cũ (lịch sử chỉ ghi thêm ⇒ hoàn tác được chính việc hoàn tác). Rút bài = van an toàn, **KHÔNG xoá bài** (`question_attempts.lesson_id` và `support_tickets.lesson_id` đang trỏ tới id đó). 🔴 **Một lỗi thật bắt được:** `REVOKE ALL ON FUNCTION ... FROM PUBLIC` **lấy luôn quyền gọi của `authenticated`** ⇒ admin cũng không gọi được hàm nào, tính năng chết với `permission denied for function`; phải `GRANT EXECUTE ... TO authenticated` như mẫu ở `0007`. Cổng `S-22` giờ đếm cặp revoke/grant — **và cổng này đã FAIL hai lần, cả hai đều là lỗi của CÁI THƯỚC**: lần 1 bắt nhầm `Set.delete()` (đúng cái bẫy đã gặp ở `S-18`), lần 2 regex đòi thao tác ghi phải nối sau **một lời gọi khác** nên bỏ sót dạng phổ biến nhất `.from(...).update(...)`. Canary giờ có **4 vế, trong đó 2 vế là "không được bắt nhầm"**. Thêm `TC-3c.1` → `TC-3c.9` → **94 test case**. Verified: build admin 2.85s · `S-22` `0 chỗ ghi thẳng bảng nội dung · 4 hàm RPC · 0009: 6 revoke + 6 grant` · `S-23` `6 kiểu · 1505 slide · không nuốt khoá · giữ nguyên kiểu số`. ⚠️ **Chưa chạy trên DB** — cần chạy `0009` rồi thử (xem mục cuối của `phase_3c_3d_decisions.md`). |
| 2.19 | 2026-09-20 | 🔄 **Thực thi GĐ 3 — lát 3d (app của bé đọc nội dung từ DB).** `client/src/data/dungCayNoiDung.js` (thuần) + `contentSource.js` (ưu tiên cache → DB → file tĩnh) + `curriculum.js` trỏ vào đó + `App.jsx` gọi `taiNoiDung()` lúc khởi động. `0010_content_age_range.sql` (bù cột `age_range`) + `0011_bat_doc_noi_dung_tu_db.sql` (bật công tắc). 🔴 **Quyết định quan trọng nhất — KHÔNG đổi nóng giữa phiên:** cây mới ghi vào bộ nhớ và có hiệu lực ở **lần đọc kế tiếp**; muốn React đọc lại thì cách duy nhất là **tháo ra dựng lại** cây giao diện, và bé đang học dở sẽ **bị đẩy về slide 1** vì một thao tác của admin mà bé không biết. Đổi lấy "nội dung mới hiện sớm vài phút" là không đáng. Bốn hàm tra cứu **giữ nguyên chữ ký ĐỒNG BỘ** (5 màn hình đang gọi; đổi sang `async` là phải sửa cả 5 _cùng lúc_ với việc đổi nguồn dữ liệu — hai rủi ro chồng lên nhau thì hỏng không biết do cái nào), làm được vì cache đọc **đồng bộ** ngay lúc nạp module. 🔴 **Công tắc `static` phải QUAY VỀ file tĩnh VÀ XOÁ cache** — chỉ "không tải thêm" là chưa đủ: máy nào đã tải cây từ DB rồi thì vẫn dùng cây đó mãi, và kill switch thành vô dụng. 🔴 **Một lỗi THẬT tìm ra bằng ĐO, không bằng suy luận:** `ParentDashboard.jsx` in `{gr.name} ({gr.ageRange})` mà `content_grades` **không có cột đó** ⇒ bật công tắc là phụ huynh thấy **`Lớp 1 ()`**, không lỗi, không cảnh báo, chỉ lộ ở màn hình ít được mở nhất. Tìm ra nhờ viết `scratch/print_tree_shape.mjs` in tập khoá của grade/chapter/lesson trong file tĩnh rồi đối chiếu với `0008`. Cổng **`S-24`** chứng minh cây dựng từ dòng DB **giống hệt cây file tĩnh TỪNG KHOÁ** (không chỉ đếm tổng), kèm **canary chứng minh phép so BẮT ĐƯỢC lỗi thiếu `ageRange`** — tức lỗi này sẽ không lọt lần nữa. Thêm `TC-3d.1` → `TC-3d.6` → **100 test case**. Verified: build web client 6.42s · **39 PASS · 0 FAIL · 0 SKIP** · **mở thật `5173`**: công tắc còn `static` thì app **không đổi gì** (5 lớp, bài `g1-c1-l1` đủ 6 slide); **bơm cây giả vào `localStorage`** → trang chủ hiện `Tất cả (1)` + "Chương giả", trang bài học hiện đúng tiêu đề + slide giả; **xoá cache** → quay về file tĩnh (`Tất cả (10)`). ⚠️ **Đường đọc từ DB THẬT chưa chạy lần nào** vì `content_source` vẫn là `static` — chờ chạy `0010`/`0011`. |

| 2.20 | 2026-09-20 | ✅ **Kiểm chứng `0009` + `0010` + `0011` trên DB thật — và sửa hai lỗi đo được.** Bật công tắc xong chạy lại: **`25 PASS`** tĩnh · động `41 PASS · 1 FAIL` (chỉ `D-16`). `D-17` xanh: `5 lớp có age_range · content_source = "remote"`; `D-18` xanh: `5 lớp · 41 chương · 362 bài published · 0 bài nháp`; log app thật `[nội dung] đọc từ DB: 5 lớp · 41 chương · 362 bài · 1505 slide`. 🔴 **Cả vòng sửa bài chạy thật trên DB thật** (session admin đã đăng nhập): sửa `g1-c1-l1` → _Đã lưu bản nháp_ (**app bé KHÔNG thấy gì** — đúng) → _Đã publish thành phiên bản 3_ (app bé nhận) → _Đã quay về phiên bản 1, ghi thành phiên bản 4_ (app bé nhận). 🔴 **Lỗi 1 — quyết định C2 của TÔI sai một nửa, và đo mới biết:** bản đầu chỉ nạp nội dung **một lần** lúc mở app, nên app **đang mở** mà admin publish thì nó **không bao giờ** biết (đo: chờ 6 giây, tiêu đề vẫn cũ, **không có request nào**). Tệ hơn phần tôi viết trong tài liệu: "lần đọc kế tiếp" hoá ra là **lần mở app thứ hai** nếu bé vào thẳng một bài. **Đã sửa:** `contentSource.js` phát thông báo khi cây vừa đổi ⇒ `App.jsx` render lại — **nhưng chốt `if (dangTrongBaiHoc) return;`**, tức đang học dở thì vẫn KHÔNG cắt ngang (giữ đúng ý định cũ); `LessonPage` tự khai lúc vào/ra bài; `App.jsx` gọi thêm `taiNoiDung()` khi **quay lại tab** (chỉ đọc `content_version`, tải cả cây **chỉ khi số đó đổi**). **Đo lại được:** bé mở trang chương → admin publish `phiên bản 10` → bé quay lại tab ⇒ `app_config` + `content_*`, cache `9 → 10`, **tiêu đề mới hiện ngay, không tải lại trang**. Cổng **`S-25`** canh cả hai chiều. 🔴 **Lỗi 2 — LỖ THẬT, chưa vá được bằng `0009`:** `D-16` báo khách ẩn danh gọi được `bump_content_version` (**HTTP 200**). Nguyên nhân khác hẳn điều tôi tưởng: Supabase đặt **DEFAULT PRIVILEGES** cấp `EXECUTE` **thẳng cho `anon`**, nên `REVOKE ALL ... FROM PUBLIC` **không gỡ được** — phải `REVOKE ... FROM anon` tường minh. Thực tế **lớp duy nhất chặn được** trong ca này là chốt `IF NOT is_admin()` **bên trong hàm**; `bump_content_version` không có chốt đó nên lọt. Ảnh hưởng: khách gọi liên tục ⇒ `content_version` nhảy ⇒ **mọi máy của bé phải tải lại ~800 KB**. Đã viết **`0012_chan_quyen_ham_noi_bo.sql`** (2 lớp: `REVOKE ... FROM anon` + chốt trong hàm) — **chờ bạn chạy**. 🔴 **Ba lần cái THƯỚC của tôi sai trong một phiên kiểm chứng** (ghi lại vì đây là bài học, không phải để kể công): canary `S-25` nhắm nhầm lời gọi `taiNoiDung()` **lúc khởi động** thay vì lời gọi trong bộ xử lý sự kiện; phép thử Playwright **không hề chạm đường mã cần kiểm** vì `page.bringToFront()` **không phát `visibilitychange`** (đo được: **0 lần**, cả hai trang luôn "visible") — phải phát tay sự kiện; và bộ chọn ô nhập ban đầu trúng **ô tìm kiếm** chứ không phải ô tiêu đề. **Bài học:** `S-25`/`S-22`/`S-19` đều từng FAIL vì lỗi của cổng, không phải lỗi của mã nguồn. Tài liệu: [`docs/phase_3c_3d_decisions.md`](phase_3c_3d_decisions.md) viết lại **C2/C7** + thêm **C8**; thêm **`TC-3d.7`**, **`TC-3d.8`** và mục xử lý sự cố cho lỗ `anon` → **102 test case**. |

| 2.21 | 2026-09-20 | ✅ **`0012` đã chạy — hết đỏ, `43/43` mục tự kiểm XANH.** `npm run test:portal` → **`43 PASS · 0 FAIL · 0 SKIP`** (lần đầu toàn xanh kể từ khi bật GĐ 3d). `D-16`: bảng nháp khách 0 dòng · `publish_lesson:401(if is_admin)` · `rollback_lesson:401(if is_admin)` · `set_lesson_status:401(if is_admin)` · `save_lesson_draft:404(if is_admin)` · **`bump_content_version:401(revoke)`** · **`ghi_vet_bai_hoc:401(revoke)`** — hai hàm lọt lần trước giờ bị chặn đúng bằng lớp `REVOKE ... FROM anon`. 🔴 **Kiểm thêm một thứ mà chính `0012` có thể làm hỏng:** `CREATE OR REPLACE FUNCTION` **xoá quyền đã cấp**, nên nếu phần `GRANT ... TO authenticated` trong `0012` thiếu thì khách bị chặn mà **admin cũng mất quyền gọi hàm** — đúng cái bẫy đã sập ở `0009`. Đã bấm thật bằng session admin: `Lưu nháp` → **`Đã lưu bản nháp. App của bé CHƯA thấy gì`** ⇒ quyền còn nguyên; `Bỏ bản nháp` → `Đã bỏ bản nháp, quay về bản đang publish` ⇒ dọn sạch. ⚠️ **Bài học về CÁCH ĐO, lần thứ tư trong phiên này:** phép đếm lịch sử phiên bản của tôi trả `0` và tôi gần như kết luận sai rằng câu `DELETE` xoá nhầm cả `v1` — thực ra giao diện ghi **`v1`** chứ không phải "Phiên bản 1", tức **cái thước sai**, không phải dữ liệu. Xem kỹ vùng lịch sử thì đúng như mong đợi: **chỉ còn `v1 · Bài 1: Làm quen với số 1, 2, 3`**, 10 phiên bản thử đã sạch. |

| 2.22 | 2026-09-20 | 🔄 **Nội dung tự cập nhật khi bé ĐỔI MÀN HÌNH — đóng nốt lỗ "mãi mãi không biết".** Người dùng hỏi đúng chỗ: _"tại sao rút bài mà trên web không render lại để ẩn bài đó"_. Đo ra thì **tầng dữ liệu không sai** — `set_lesson_status` có bump `content_version` (11 → 12), RLS khách chỉ thấy `status = 'published'`, app tải mới thì ẩn đúng. Sai ở chỗ khác: app **không có kênh đẩy**, nó chỉ biết khi **hỏi**, mà trước đó chỉ hỏi ở **2 mốc** (khởi động · quay lại tab) ⇒ bé **ngồi yên một màn hình** thì không có sự kiện nào bắn ra. **Đo được: chờ 8 giây, cây không đổi, cache đứng ở 12, bài đã rút vẫn hiện.** Đã thêm **mốc thứ ba: hỏi mỗi lần bé đổi màn hình** (`AppLayout`, `useEffect` theo `location.pathname`) — chọn mốc này vì bé bấm đổi màn liên tục, nên bắt được cả ca "ngồi yên rồi bấm đi" mà **không tốn request nào khi app để yên** (khác hẳn hẹn giờ dò theo nhịp). Giá: 1 request `app_config` nhỏ mỗi lần đổi màn, chặn 5s; tải cả cây chỉ khi số phiên bản đã đổi. **Đo lại:** bé ở trang danh sách bài (12 bài · cache 15) → admin rút bài (`content_version` 16) → bé **chỉ đổi màn hình** ⇒ cache **16**, **bài biến mất, còn 11 bài** — không tải lại trang, không đổi tab. Cổng **`S-25`** canh đủ **ba** mốc, mỗi mốc một canary. 🔴 **Đo lần thứ hai trong phiên này, thước của tôi lại sai:** phép "đếm số bài của Lớp 1" ở trang chủ bắt nhầm một con số khác (`/(\d+) bài/` khớp chỗ khác) — nên phép đo cuối cùng dùng đúng trang danh sách bài (đếm `Bài N:`), và **chỉ tin những gì đo trực tiếp trên màn hình đó**. 📝 **Nếp đặt tên mới (người dùng yêu cầu):** biến/hàm mới đặt **tiếng Anh**, không đặt tiếng Việt nữa. |

| 2.23 | 2026-09-20 | 📖 **Trang tra cứu mới `/reference` (menu “Tham khảo”) — để biết chọn gì trong 3 ô của trình sửa bài.** Người dùng báo: _“Kiểu bài, Kiểu slide và biểu cảm linh vật nhưng không có hình ảnh hay thông tin để tham khảo”_. Đã làm **chỉ đọc, không tạo/sửa/xoá**: `admin/src/lib/referenceData.js` (thuần) + `admin/src/pages/ReferencePage.jsx` + 1 dòng route + 1 dòng menu. Trang có 5 khối: Kiểu bài · bảng 6 kiểu slide · **từng kiểu dùng khi nào / bé thấy gì** · biểu cảm linh vật (có mặt thật) · các khoá dễ gõ nhầm. 🔴 **Khoá bắt buộc/tuỳ chọn KHÔNG chép tay — đọc thẳng `SLIDE_TYPES`**, còn nhãn tiếng Việt của 6 kiểu giờ chỉ có **một bản** trong `referenceData.js` (`LessonEditor` import lại) — hai bản chép tay thì thêm kiểu slide là quên một bản. 🔴 **Ba điều ĐO ĐƯỢC từ DB thật, hai cái là lỗi thật:** (1) `lesson_type` — **cả 362 bài = `learn`** và **không chỗ nào trong app xử lý giá trị này** ⇒ đổi qua lại chẳng thay đổi gì; (2) `mascotMood` chỉ tồn tại ở `story` + `summary` (362+362 = 724, khớp tuyệt đối với số đo), mà `SummarySlide` **không đọc khoá này** dù schema bắt buộc ⇒ **khoá bắt buộc nhưng app bỏ qua**; (3) `StorySlide` chỉ nhận `excited`/`proud`/`thinking`, còn lại → 😊 ⇒ **93 slide đang dùng `celebrate` hiện mặt mặc định**, không phải mặt reo mừng. Cổng **`S-26`** giữ ba điều, mỗi điều canary hai vế: tập biểu cảm `distinct` trong trang phải **bằng** tập app vẽ riêng · nhãn phải phủ **mọi** kiểu trong `SLIDE_TYPES` · trang **không** chạm Supabase và không có thao tác ghi. Verified: **26 PASS** tĩnh · build admin 3.35s · mở thật `/reference`: 4 bảng · 6 thẻ · 4 mặt cười hiện đúng · không tràn ngang · 0 đoạn quá dài. |

| 2.24 | 2026-09-20 | 🎭 **Gộp về MỘT từ vựng biểu cảm + bỏ `mascotMood` khỏi danh sách bắt buộc của `summary`.** **(1) Vì sao `celebrate` hiện 😊:** slide _Kể chuyện_ tự viết chuỗi `if/else` chỉ nhận **3** giá trị, còn bong bóng linh vật giữ **bản đồ 9 giá trị riêng** — hai bản, lệch nhau: **93 slide `celebrate` rơi về mặt mặc định**, và `thinking` hiện 🤔 ở slide nhưng 🧐 ở bong bóng. Đã gộp về **một nguồn duy nhất** `client/src/data/mascotFaces.js` (`MASCOT_FACES` + `faceOf()`), cả `StorySlide` lẫn `MascotBubble` đọc chung; giá trị lạ → 😊, không lỗi. **Đo được (mở thật `5173/lesson/g3-c1-l10`):** huy hiệu mặt = **U+1F389 (🎉)**, trước là U+1F60A (😊). 🔴 **Hai thay đổi hình ảnh, nói rõ để người dùng veto được:** **93 slide 😊 → 🎉** và **12 slide `thinking` 🤔 → 🧐**. **(2) `mascotMood` ở `summary`:** đo được **362/362** slide mang khoá này mà `SummarySlide` **không đọc** ⇒ đang bắt điền một thứ bé không bao giờ thấy; chuyển sang `tuyChon`. **An toàn vì `validateSlide` chỉ kiểm các khoá ĐÃ KHAI BÁO và bỏ qua khoá lạ** (đọc mã để chắc, không suy luận). **Đo hai chiều bằng cách gọi thẳng bộ kiểm:** `summary` thiếu `mascotMood` → `[]` · thiếu `points` → **vẫn báo lỗi** · `summary` có `mascotMood` → `[]` · `story` thiếu `mascotMood` → **vẫn báo lỗi** (đúng: chỉ kiểu đó mới hiện mặt ra). Trang `/reference` cập nhật theo: bảng biểu cảm **9 dòng có mặt thật**, bỏ cột _Mặt riêng?_ (nay mọi giá trị đều có mặt riêng). 🔴 **Cổng `S-26` phải viết lại — nó canh bằng cách so với chuỗi `content.mascotMood === "..."` trong `LessonPage`, mà chuỗi đó vừa bị xoá ⇒ chắc chắn FAIL;** nay so **tập giá trị** _và_ **từng mặt** với `MASCOT_FACES`, thêm điều kiện `LessonPage` phải có `faceOf(content.mascotMood)`; canary hai vế (thừa/thiếu một giá trị · sai mặt đúng 1 dòng). Verified: **26 PASS tĩnh** · **`44 PASS · 0 FAIL · 0 SKIP`** · build web 8.2s / admin 3.0s (exit 0 cả hai) · `/reference` 4 cột × 9 dòng, **không tràn ngang**. |

| 2.25 | 2026-09-20 | ✅ **GĐ 3 — đo nốt 3 mục còn treo, và phát hiện DoD còn THIẾU 1 điều.** **(1) `TC-3c.6`** (đáp án ngoài lựa chọn) — bấm thật trong trình sửa `g1-c1-l1`: xoá dòng `3` khỏi lựa chọn `1,2,3,4` ⇒ ô đáp án hiện `— đang là 3 (không có trong lựa chọn) —`, **nút Lưu nháp VÀ Publish đều BỊ MỜ**, kèm khung đỏ _"Đáp án hiện tại KHÔNG nằm trong danh sách lựa chọn…"_ ⇒ chặn ở **cả hai tầng** (UI + `validateSlide`). **(2) `TC-3d.4`** (offline) — chặn hết `*.supabase.co`: còn cache thì `g1-c1-l1` hiện **1/6** slide; **xoá cache mà vẫn offline thì VẪN HỌC ĐƯỢC** (rơi về file tĩnh trong bundle); mở mạng lại cache về **21**. **(3) `TC-3d.5`** (kill switch) — mô phỏng công tắc (trả về `content_source = "static"`): **cache bị XOÁ** ✅ và trang chương vẫn đủ **12 bài**; ⚠️ đây là **mô phỏng**, chưa `UPDATE` DB thật. 🔴 **Kiểm lại DoD thì chỉ 5/6, KHÔNG phải 6/6:** điều **#6 "biết một bé cụ thể đang dùng `content_version` nào" CHƯA LÀM** — số đó chỉ nằm trong `localStorage` của máy bé, **không đẩy lên DB**, nên Admin không thấy (mục `E2` mới là **dự định**). Cần thêm cột (migration) + client ghi + hiện ở hồ sơ bé ⇒ **một quyết định đụng schema**. ⇒ **GĐ 3 KHÔNG được coi là xong** dù cả 4 lát đã code và test. 🔴 **Ba lần thước của tôi sai trong lượt này:** (a) lần đo `TC-3c.6` đầu tiên chọn **`<select>` ĐẦU TIÊN trên trang** (Kiểu bài = `learn`) làm "đáp án" nên **không xoá dòng nào** rồi tưởng "không có gì chặn" — đo lại đúng ô mới PASS; (b) locator của Playwright **treo** vì tab admin ở **nền**, phải thao tác bằng `page.evaluate`; (c) một lần sửa tài liệu của tôi **xoá nhầm** tiêu đề `## 🔍 Xử lý khi test FAIL` — đã khôi phục. Tài liệu: `PHẦN E` **tick 7/8 mục** (mục 8 ghi rõ CHƯA LÀM) — trước đó cả 8 mục để trống dù việc đã xong; checklist 3a/3c/3d của kế hoạch được tick; dòng tiến độ đổi từ "🟡 còn 3c, 3d" → "🟢 3a·3b·3c·3d xong, DoD 5/6". Verified: **44 PASS · 0 FAIL · 0 SKIP** (không đổi — lượt này chỉ đo tay + sửa tài liệu). |

| 2.26 | 2026-09-20 | 🆕 **Đóng nốt DoD #6 + tính năng TẠO BÀI HỌC MỚI** — `supabase/migrations/0013_content_report_and_create_lesson.sql`. **(A) DoD #6:** 3 cột `content_version` · `content_source` · `content_seen_at` trên `child_progress`; app của bé báo lên **kèm nhịp đồng bộ tiến độ đang có** (không thêm request nào — đọc thẳng `layPhienBan()`/`layNguon()` đã có sẵn từ lát 3d); hồ sơ bé trên Admin hiện _"Nội dung bé đang thấy: phiên bản 21 · cache trong máy · báo lúc …"_, kèm **cảnh báo vàng** khi số của bé nhỏ hơn số hiện tại. 🔴 **Nói rõ giới hạn để không ai đọc sai:** đây là **báo cáo của lần cuối máy bé còn mạng**, KHÔNG phải trạng thái trực tiếp — máy offline thì không báo lên được, nên luôn đọc kèm `content_seen_at`; và `content_source = "static"` là ca đáng nghi nhất (máy bé đang chạy nội dung trong **bundle**, bản lúc build app). **(B) Tạo bài mới:** hàm `create_lesson(chương, tiêu đề, mô tả, kiểu)` + nút **➕ Thêm bài học vào chương này** ở cuối danh sách bài trong mỗi chương. 🔴 **Ba quyết định, cả ba đều chống một cái bẫy KHÔNG có triệu chứng:** (1) **mã bài sinh trong CÙNG transaction với việc chèn** — mã có ý nghĩa (`g1-c1-l13`) và đang được `question_attempts`/`support_tickets` trỏ tới; hai trình duyệt cùng bấm "Tạo" mà mỗi bên tự tính số thì cả hai ra `-l13`; số đếm theo **MÃ** chứ không đếm số dòng nên không bao giờ trùng, kể cả sau khi có bài bị rút; (2) **bài mới luôn `draft`** — bài lúc đó chỉ có 1 slide giữ chỗ, để `published` là **lộ ra cho bé ngay lúc bấm Tạo**; (3) **đi qua hàm SQL chứ không `.insert()` từ trình duyệt** — vừa để ghi vết kiểm toán trong cùng transaction, vừa vì cổng `S-22` cấm Admin ghi thẳng bảng nội dung. Bài mới bắt đầu bằng **đúng 1 slide `story`** (có sẵn `mascotMood` vì đó là khoá bắt buộc) thay vì 0 slide: bài 0 slide lỡ bấm Đăng thì app của bé mở ra màn hình trống, và người tạo không có chỗ nào để bắt đầu gõ. Tạo xong thì **trình sửa mở luôn**. **Cổng mới:** `S-27` (canh đúng 3 bẫy trên, canary ba vế) · `D-19` (3 cột đã có — đo bằng cách **hỏi đúng tên cột**: PostgREST kiểm tên cột TRƯỚC khi RLS lọc dòng nên đo được bằng anon key dù bảng bị chặn; canary: hỏi cột không tồn tại phải ra **cùng kiểu lỗi**) · `D-16` phủ thêm `create_lesson`. ✅ **Đo hai chiều ngay:** trước khi chạy `0013`, `D-19` **FAIL** và chỉ đúng tên file cần chạy; `D-16` báo `create_lesson:404`. ⚠️ **Việc còn lại: chạy `0013`** — hồ sơ bé cũng cần 3 cột đó nên chạy trước khi mở hồ sơ bé. UI đã đo thật: nút hiện trong chương · form mở · `Tạo bài` mờ khi chưa gõ tên → bật khi có tên · `Huỷ` đóng form. Verified: **27 PASS tĩnh** · `45 PASS · 1 FAIL` (đúng `D-19` đang chờ `0013`) · build client + admin **exit 0**. |

| 2.27 | 2026-09-20 | 🧩 **Đo nốt hai mục còn treo (`TC-3c.11`, `TC-3d.9`) — và bấm thật thì tìm ra một lỗi thật.** **(1) Tạo bài học:** bấm **Tạo bài** trong `Chủ đề 1` lớp 1 tạo đúng `g1-c1-l13` (`draft` · `sort_order = 12` · **1 slide** `Kể chuyện`), `content_version` **vẫn 21** (tạo nháp không đổi thứ bé nhận), 1 dòng `lesson.create` trong sổ kiểm toán với `after` **chỉ có hình dạng** không payload, app của bé **không thấy** bài mới; cả 2 bài dùng để thử đã **xoá** ⇒ DB về đúng **362 bài · 0 nháp · v21**. 🔴 **Lỗi bắt được khi bấm: `Cannot read properties of null (reading 'id')` — cây nội dung không vẽ lại, màn hình lỗi.** Hàm tạo bài đặt _chương đang mở_ và _bài đang sửa_ trong **cùng một nhịp**, còn chi tiết bài tải **bất đồng bộ** ⇒ có đúng **một khung hình** `chiTiet` còn `null` và màn hình cố mở trình sửa bài với `null`. Đường "✏️ Sửa bài này" **không bao giờ sập** vì nút đó chỉ hiện khi chi tiết đã tải xong — nên lỗi này **chỉ lộ ra khi bấm thật**, không cổng tĩnh nào thấy được. Sửa bằng `dangSuaBai === dangChon && chiTiet?.id` + ghi chú tại chỗ. **(2) Đo màn hình `TC-3d.9` mà không ghi gì vào DB:** chèn một **màn chắn `fetch` trong trang** thay 3 giá trị trong bộ nhớ → đo **cả 4 nhánh** (chưa báo · `9999 · cache` không cảnh báo · `3 · static` ⚠️ vàng · `null · db` ⚠️ vàng), và con số **21** trong dòng cảnh báo là đọc **thật** từ `app_config`. **Cổng mới `S-28`** giữ phần _"app thật sự báo lên"_: có hàm báo cáo · đọc đúng `layPhienBan()`/`layNguon()` · và **số chỗ gửi kèm báo cáo phải BẰNG số chỗ ghi vào `child_progress`** — `syncService` ghi ở **HAI** đường (nhập dữ liệu máy khách lên tài khoản + đường đồng bộ thường), thiếu một đường là chính đường bé dùng hằng ngày không báo gì. ⇒ **47 PASS · 0 FAIL · 0 SKIP** (thêm 1 cổng), `client build:web` + `admin build` đều exit 0. ⚠️ **Hai lần THƯỚC của tôi sai, xin ghi lại:** (a) bản đầu `S-28` **đỏ oan** vì tôi viết cứng nháy đơn `'child_progress'` mà **prettier của repo đã đổi sang nháy kép** — cổng giờ nhận **cả hai** kiểu; (b) canary của `S-28` chỉ gỡ **một** trong hai chỗ trải `...contentReport()`, nên cổng vẫn xanh dù đã gỡ — giờ canary gỡ **hết** và có thêm canary gỡ **sót một chỗ**. 🔴 **Và một cái bẫy của công cụ, ghi để lần sau khỏi mất thì giờ:** `route.fetch()` của trình duyệt tích hợp **không chạy được** (`Protocol error (Storage.getCookies): Method not found`) — triệu chứng nhìn thấy chỉ là trang treo _"Quá 15s chưa có phản hồi"_, rất dễ đổ oan cho mã app. |

| 2.28 | 2026-09-20 | 🗑️ **Xoá bài học THẲNG TRONG DB thì app không vỡ** — `supabase/migrations/0014_xoa_bai_hoc_trong_db.sql`. **Không thêm nút xoá nào trên giao diện** (giữ nguyên quyết định `D4`: bấm nhầm là mất bài) — nhưng xoá bằng SQL Editor thì luôn làm được, nên app phải chịu được. 🔴 **Lỗ thật, và nó im lặng tuyệt đối:** `content_version` là thứ duy nhất khiến máy bé biết nội dung đã đổi; ba đường ghi qua giao diện đều gọi `bump_content_version()`, còn một lệnh `DELETE` dán vào SQL Editor thì **không gọi ai cả** ⇒ máy bé giữ nguyên cache và **vẫn hiện bài đã xoá, mãi mãi** — không exception, không log, không màn hình đỏ. ⇒ **Trigger `AFTER DELETE`** trên `content_lessons`: tăng số phiên bản **chỉ khi** bài đã `published` (bài nháp bé chưa từng thấy, tăng chỉ bắt mọi máy tải lại ~800 KB vô ích) + ghi một dòng `lesson.delete` vào sổ kiểm toán (`before` chỉ ghi **hình dạng**, không payload); phần ghi vết bọc `EXCEPTION` để **không bao giờ** chặn việc xoá. `SECURITY DEFINER` + `search_path` ghim vì hàm ghi vào `app_config`/`admin_audit_log` (cả hai có RLS), kèm `REVOKE … FROM anon` để không mở thêm đường gọi từ client. **Ba lỗ thật khác bịt trong cùng lượt:** (1) `payload` rỗng/thiếu `slides` ⇒ `LessonPage` đọc `slide.type` với `slide === undefined` ⇒ **trắng trang** `Cannot read properties of undefined (reading 'type')` — nay có màn hình _"Bài này chưa có nội dung"_; (2) slide **kiểu lạ** ⇒ trước đây là **thẻ trắng** (trông y như app hỏng, console không lỗi) — nay nói rõ kiểu lạ; (3) màn hình _"Không tìm thấy bài"_ nay **tự gọi tải lại nội dung một lần** và tự vẽ lại khi cây mới về — kèm đổi cờ `dangTrongBaiHoc` sang khai theo `coBaiHoc` (khai cứng `true` là tự khoá đường tự chữa đó). Phía Admin: `.single()` ⇒ **`.maybeSingle()`** + nhánh `khongCon` ⇒ bài bị xoá trong lúc đang mở thì hiện _"Bài … không còn trong DB"_, cây **tự tải lại**, thay vì lộ lỗi kỹ thuật `PGRST116 … The result contains 0 rows`. Và **`chapter.lessons?.length \|\| 12`** — chương đã xoá hết bài có `length === 0` nên rơi vào `12` và hiện _"0/12 bài"_ ⇒ dùng `??`; `completedLessons` **cố ý không bị gạch** khi bài biến mất (bé không mất sao vì thao tác của người lớn) nên mọi chỗ **đếm** phải đối chiếu cây hiện tại (`demBaiDaHoc`/`tapMaBaiHoc`, thêm tham số `lessonIds` cho `getChapterProgress`) — không đối chiếu thì hồ sơ ghi "đã học 13 bài" khi chương trình còn 12 bài, và chương 100% tự tụt xuống **108%** ⇒ **mất dấu ✅**. **Cổng mới `S-29`** (canary hai vế cho từng điều) ⇒ **48 PASS · 0 FAIL · 0 SKIP** · cả hai bản dựng exit 0. **Đo thật:** bơm cây thử vào `localStorage` ⇒ bài 0 slide ✓ · slide kiểu lạ ✓ · mã bài không có trong cây ✓ · bài lành vẫn chạy ✓ · nút _"Thử tải lại"_ **gọi mạng thật** (đếm `app_config` **2 → 3**) · **cây mới về giữa lúc đang học mà bé vẫn ở `1/2`** (không cắt ngang) ✓ · Admin: xoá `g1-c1-l13` **thật trong DB** ⇒ hiện đúng thông báo, cây tự tải lại **13 → 12**, đầu trang về **362 bài**, và **không** `PGRST116` ✓. ⚠️ **Hai lần thước của tôi sai nữa, ghi lại:** (a) đếm request `app_config` ra `0` khi bấm nút vì trình duyệt **phục vụ từ cache** (đếm lại **trong `fetch` của trang** mới ra 2 → 3); (b) đọc khung chi tiết Quá SỚM nên thấy _"Đang tải bài…"_ và tưởng trang treo. **Chờ theo TRẠNG THÁI, đừng chờ theo đồng hồ.** |

| 2.29 | 2026-09-20 | ✅ **Đã chạy `0014` trên DB và đo trigger — cả hai chiều, cộng vòng đầy đủ trên máy bé.** `content_version`: tạo bài nháp `21 → 21` (**không đổi** — bé chưa từng thấy nó) · xoá bài **đã `published`** `22 → 23` (**tăng đúng 1**). Sổ kiểm toán có dòng `lesson.delete` với `entity_id` = mã bài, `before` **chỉ ghi hình dạng** (title/slides/status/chapter*id) và `actor_id` = **đúng tài khoản admin đã xoá**. Kiểm luôn rủi ro đã lường trước: lệnh xoá của **admin đã đăng nhập** vẫn chạy được ⇒ cặp `REVOKE`/`GRANT` trên hàm trigger **không** chặn trigger. **Vòng đầy đủ (điều quan trọng nhất):** tạo 1 bài thật rồi publish ⇒ bé mở app, cache `v22 · **363 bài**`, trang chương **13 bài**; xoá bài đó trong DB ⇒ bé **chỉ mở lại app**, cache `v23 · **362 bài**`, trang chương về **12 bài** — bài đã xoá **biến mất**, không xoá cache tay, không bấm gì. ⇒ `TC-3d.10` từ \_một phần* → **PASS**. `content_version` hiện là **23**. |

| 2.30 | 2026-09-20 | 🗑️ **Nút XOÁ MỘT BÀI HỌC trên giao diện, kèm chốt gõ chữ** — `supabase/migrations/0015_xoa_bai_hoc_tu_giao_dien.sql`. 🔴 **Đổi một quyết định cũ:** `D4` (lát 3c) kết luận _"không có chỗ xoá bài, dùng Rút bài"_; người dùng yêu cầu ngược lại. Bản mới giữ đúng phần đúng của `D4` (**không** xoá CHƯƠNG — cổng `S-30` canh bằng canary) và thêm chốt chặn thật: hộp thoại bắt **gõ đúng cụm `delete this lesson`** thì nút `Xoá vĩnh viễn` mới bật. **Vì sao gõ chữ:** hộp thoại OK/Huỷ chỉ chặn _bấm hụt_, không chặn _bấm ẩu_; cụm chữ để **tiếng Anh** có chủ ý để nó không trùng nhãn nào trong app (để tiếng Việt \"Xoá bài này\" thì trùng nhãn nút và mất tác dụng). Việc xoá đi qua hàm SQL `delete_lesson` — **không** `.delete()` từ trình duyệt (cổng `S-22` cấm); hàm có `is_admin()` + chốt \"bài phải tồn tại\" + `REVOKE … FROM anon`. `content_version` và vết `lesson.delete` vẫn do trigger `0014` lo, **hàm RPC cố ý không ghi trùng** (một lần bấm mà 2 dòng là sổ kiểm toán tự mâu thuẫn; `actor_id` phân biệt sẵn hai đường: có = từ giao diện, `NULL` = SQL Editor). Hộp thoại **đếm và nói ra** số lịch sử đang trỏ tới bài (`question_attempts` + `support_tickets`) nhưng **không chặn** — chặn là biến yêu cầu rõ ràng của người dùng thành \"tại sao bài này không xoá được\"; đo thật: `g1-c1-l1` hiện **1 báo lỗi câu hỏi**. Lỗi **cài đặt** cũng được dịch lại cho người đọc: chưa chạy `0015` thì hộp thoại hiện _\"Chưa chạy migration `0015_…`\"_ thay vì `PGRST202`. **Cổng mới `S-30`** (canary 4 vế: thêm đường xoá chương · gỡ chốt `is_admin()`· gỡ`REVOKE … FROM anon`· nút xoá không còn mờ · đổi cụm chữ) ⇒ **49 PASS · 0 FAIL · 0 SKIP**. **Đo giao diện thật:** nút có mặt ✓ · nút xoá **mờ** khi chưa gõ · vẫn **mờ** khi gõ sai một ký tự + nhắc \"Chưa khớp\" · **bật** khi đúng ·`Esc`đóng mà không xoá gì ✓ · bấm khi chưa có hàm ⇒ lỗi dịch đúng, **không xoá gì** (chương vẫn 12 bài · tổng 362) ✓ · **0 lỗi trang**. ⏳ Còn chờ chạy`0015` để đo vòng xoá thật. |

| 2.31 | 2026-09-20 | ✅ **Đã chạy `0015` + `0016`, và đo trọn vòng xoá qua NÚT.** **(1) `0015` chạy đúng:** đo vòng thật — chọn bài thử `published` → gõ đúng `delete this lesson` → bấm `Xoá vĩnh viễn` ⇒ hộp thoại tự đóng, hiện _"🗑️ Đã xoá bài `g1-c1-l13`…"_, cây **13 → 12**, tổng về **362**, `content_lessons` còn **0 dòng**, bản nháp bị xoá theo (`content_lesson_drafts` = 0), `content_version` **23 → 24** (+1 vì bài đã publish), và sổ kiểm toán có **đúng 1 dòng** mới (3 → 4) với `actor_id` = admin — **không** 2 dòng (đúng quyết định `F3`). **(2) ⚠️ Hướng dẫn tự kiểm đầu tiên của tôi bị SAI, người dùng gặp ngay:** tôi bảo chạy `SELECT public.delete_lesson('g1-c1-l999')` trong SQL Editor và mong đợi _"Không có bài học"_, nhưng nhận `42501 Chỉ quản trị viên được xoá bài học`. **Đó là ĐÚNG thiết kế** — SQL Editor chạy **không có JWT** ⇒ `auth.uid()` NULL ⇒ `is_admin()` false ⇒ chốt admin chặn trước; cùng lý do khiến mọi hàm CMS khác không gọi được từ đây. Đã sửa hướng dẫn trong `0015` thành cách kiểm **không cần JWT** (`has_function_privilege('anon', …)` = false · `('authenticated', …)` = true) và ghi rõ _"đừng thử hàm này trong SQL Editor rồi tưởng hàm hỏng"_. **(3) 🔴 Phép đo bắt tiếp một lỗi CHỮ trong mã:** dòng vết mới nhất ghi `reason = "Xoá thẳng trong DB (không qua giao diện)"` trong khi lần xoá đó **đi từ giao diện** — `0014` không biết ai gọi nó, và câu đó thành nói dối ngay khi có nút xoá. Sổ kiểm toán là **bằng chứng duy nhất** cho _"chuyện gì đã xảy ra với nội dung"_, nên một dòng chỉ sai nguồn làm người tìm sự cố loại trừ nhầm hướng ⇒ `0016` đổi `reason` thành **suy từ `auth.uid()`** (NULL = xoá bằng SQL · khác NULL = từ giao diện) — cùng nguồn sự thật với `actor_id`; dùng `CREATE OR REPLACE` + **cấp lại** `REVOKE`/`GRANT` (replace xoá sạch quyền cũ), và **không** sửa `0014` vì nó đã chạy trên DB thật. Cổng `S-29` được mở rộng để canh đúng phần suy nguồn này (canary: bỏ `auth.uid() IS NULL` ⇒ đỏ). ⇒ **49 PASS · 0 FAIL · 0 SKIP** · cả hai bản dựng `exit=0`. 🔴 **Bài học lặp lại lần thứ ba:** _số đo vô lý ⇒ nghi cây thước trước_ — lần này là kỳ vọng trong hướng dẫn, không phải mã. **(4) Sau khi chạy `0016`, đo lại đúng chỗ đã sai:** xoá một bài thử `draft` **từ nút** ⇒ dòng vết mới nhất ghi `reason = "Xoá từ trang quản trị"` ✓ và `actor_id` = admin ✓ — **khớp nhau** (cùng một nguồn sự thật) · số dòng vết **đúng 1** (4 → 5) · `content_version` **24 → 24** (bài `draft` nên không tăng — máy bé không bị làm phiền) · cây về **12 bài / 362**. Phép đo này còn kiểm luôn rủi ro của `CREATE OR REPLACE`: quyền được **cấp lại đúng** nên nút xoá vẫn chạy (không `permission denied`) ✓. ⏳ Nhánh `auth.uid() IS NULL` (`reason = 'Xoá bằng SQL…'`) **không đo được từ phía tôi** — phải có một lệnh `DELETE` không JWT mà RLS chặn đường đó; câu tự kiểm (3) cuối `0016` dành cho việc đó. |

---

## ⚠️ PHỤ LỤC 2.7 — Giá thưởng đã chốt khác seed

**Quyết định (2026-09-20):** giữ các giá trị đã chỉnh trong lúc test, coi đây là giá thật.

| Khoá                      | Seed gốc  | Giá đã chốt |
| ------------------------- | --------- | ----------- |
| `practice.correct`        | 10 / 20   | **2 / 5**   |
| `practice.streak_correct` | 15 / 20   | **2 / 5**   |
| `practice.mistake_review` | 15 / 30   | **2 / 5**   |
| `game.tier_participation` | 10 / 20   | **5 / 10**  |
| `game.tier_bronze`        | 30 / 50   | **10 / 20** |
| `game.tier_silver`        | 70 / 120  | **15 / 30** |
| `game.tier_gold`          | 120 / 200 | **20 / 50** |

**Hệ quả — ✅ ĐÃ XỬ LÝ (2026-09-20), chọn cách B:**

`REWARD_DEFAULTS` trong `client/src/services/rewardService.js` là **lưới an toàn khi offline**.
Nó từng còn giữ giá seed → offline thưởng sai (Vàng 120/200 thay vì 20/50). Đã sửa bằng:

1. Thêm `supabase/migrations/0003_tune_rewards.sql` — `UPDATE` idempotent 7 khoá về giá đã chốt.
2. Cập nhật `REWARD_DEFAULTS` cho khớp.
3. `S-11` nay bóc cả các migration điều chỉnh (`MIGRATION_OVERRIDES`) để so với **trạng thái
   cuối** của một cài đặt mới — thêm migration kiểu này về sau chỉ cần khai báo trong mảng đó.

Kiểm chứng: `D-2` báo _"chưa khoá nào bị chỉnh khác mặc định"_ → code và DB đã khớp nhau.

**Vì sao chọn B thay vì sửa thẳng `0002`:** file `0002` đã chạy trên Supabase. Sửa migration
đã áp dụng là cách chắc chắn nhất để môi trường này lệch môi trường kia.

---

_Ghi chú: File này là bản đồ dẫn đường (Roadmap). Khi bắt đầu 1 giai đoạn, mở file này ra, tick từng mục và tiến hành code chi tiết. Chỉ chuyển giai đoạn khi đạt đủ Điều kiện hoàn thành (DoD)._
