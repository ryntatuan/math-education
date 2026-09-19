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

**Cần dựng:**

- [ ] `question_attempts` — `child_id, question_ref, lesson_id, topic, ms, correct, attempt_no, created_at`.
- [ ] Instrument App Client: ghi attempt khi trả lời câu hỏi (bài học, luyện tập, mini game).
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

- [ ] Bảng `support_tickets`.
- [ ] Nút "Báo lỗi câu hỏi" trong App Client.
- [ ] Màn hình **User Reports** trên Admin (duyệt → sửa nóng nội dung).

**✅ DoD:** Tra cứu được 1 bé và xem đầy đủ hồ sơ; xử lý được **1 ticket thật từ đầu đến cuối** mà không cần mở Supabase Dashboard.

**Thứ tự đề xuất:** `2a` → `2c` → `2b`

1. **2a** trước — nhỏ, rủi ro thấp, và tạo ra **chỗ để hiển thị** dữ liệu mà 2b sẽ sinh ra.
2. **2c** tiếp — tự nó đã đạt DoD, đồng thời tạo nguồn dữ liệu thật (báo lỗi câu hỏi).
3. **2b** cuối — vì còn phải chốt `question_ref` và sửa 5 file dữ liệu.

---

### 📍 GIAI ĐOẠN 3: ĐỘNG HÓA NỘI DUNG (CMS) 🟡

> 📌 **Áp dụng Q4:** Chỉ bắt đầu giai đoạn này **sau khi GĐ 2 đã hoàn thành và ổn định**. Đây là giai đoạn rủi ro cao nhất — không làm song song với việc khác.

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

**3a — Schema + Migration (chưa có UI sửa)**

- [ ] Bảng `content_grades`, `content_chapters`, `content_lessons`, `content_lesson_versions` (payload JSONB).
- [ ] Script Node.js migrate 795 KB từ 6 file JS lên DB (chạy 1 lần, có dry-run + đối chiếu số lượng).
- [ ] 🔴 **RLS: role `anon` + user thường chỉ thấy `status = 'published'`.** Nếu để `SELECT USING (true)` → **bài Draft lộ ra cho mọi khách vãng lai**. `is_admin()` thấy tất cả.
- [ ] 🔴 **`app_config.content_source`** (`'static' | 'remote'`) — kill switch quay về data cứng khi sự cố.
- [ ] 🔴 **`app_config.content_version`** — mốc so sánh để biết cache/bundle đã cũ chưa.
- [ ] 🔴 **Slide Type Registry + Zod schema.** Slide hiện có 6+ loại cấu trúc rất khác nhau (`story`, `visual` có `items[]`+`number`, `concept`, `dialogue` có scene, `quiz`, `summary`). **Bắt buộc validate**, nếu nhét JSONB tự do vào editor thì nội dung sẽ hỏng dần.
- [ ] ❌ **Bỏ so với bản 2.1:** không xây "bundled seed content pack". Giữ `gradeXData.js` làm fallback.

**3b — Curriculum Tree (chỉ đọc)**

- [ ] Màn hình cây **Lớp → Chương → Bài** (đúng cấu trúc thật; dữ liệu **không có cấp "Học Kỳ"**).

**3c — Lesson Editor**

- [ ] Form thông tin chung (Title, Icon, Thời lượng).
- [ ] Builder theo từng slide type (ánh xạ từ registry ở 3a).
- [ ] Preview.
- [ ] Trạng thái Draft / Published.
- [ ] 🔴 **Version history + Rollback.**

**3d — Client fetch**

- [ ] Đổi ruột 4 helper trong `curriculum.js` — **giữ nguyên chữ ký hàm** (xem mục 1.4).
- [ ] Thứ tự đọc nội dung rõ ràng: **DB → cache localStorage → file tĩnh trong bundle**.
- [ ] Cache nội dung kèm `content_version`; lệch version mới tải lại (dùng lại pattern `zustand persist` đang có — 📌 Q3).
- [ ] Kiểm thử đủ 4 ca: **guest có mạng** · guest offline (đã cache) · **offline lần đầu** (dùng file tĩnh) · sau khi admin publish bài mới.

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

**✅ DoD:**

1. Admin sửa 1 bài → app thấy nội dung mới **không cần build lại**.
2. Tắt `content_source = 'static'` → app chạy lại bình thường với data cứng (**rollback 1 nút**).
3. **Guest mode đọc được nội dung từ DB**, và **vẫn** học offline được.
4. Publish bài lỗi → **revert được** về phiên bản trước.
5. Bài **Draft không truy cập được bằng anon key** (test thật bằng request không có session).
6. Biết được **một bé cụ thể đang dùng `content_version` nào**.

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

| Giai đoạn | Nội dung                  | Ước lượng                     | Phụ thuộc                  | Trạng thái                                       |
| --------- | ------------------------- | ----------------------------- | -------------------------- | ------------------------------------------------ |
| GĐ 0      | Vá nền & bảo mật          | Nhỏ–Vừa                       | —                          | ✅ Xong — đã deploy `admin-toanvuive.vercel.app` |
| GĐ 1      | Sổ cái & cấu hình kinh tế | **Lớn** (refactor 14 điểm)    | GĐ 0                       | ✅ Code + test sơ bộ + giá đã chốt (0003)        |
| GĐ 2      | Hỗ trợ & phân tích cơ bản | Vừa                           | GĐ 1                       | 🟡 2a code xong, chờ test — 2b/2c chưa làm       |
| GĐ 3      | CMS (3a → 3d)             | **Rất lớn** — rủi ro cao nhất | 📌 **GĐ 2 phải xong (Q4)** | ⬜ Chưa bắt đầu                                  |
| GĐ 4      | Nâng cao                  | Vừa                           | GĐ 3                       | ⬜ Chưa bắt đầu                                  |

---

## 📝 CHANGELOG

| Phiên bản | Ngày       | Thay đổi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.0       | —          | Bản đầu: 4 giai đoạn, dựa trên tham khảo EdTech                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2.0       | 2026-09-19 | Viết lại theo số liệu đo thực tế. Thêm **GĐ 0 (vá nền)**, tách GĐ 2→(2a,2b,2c) và GĐ 3→(3a,3b,3c,3d). Bổ sung 4 lỗ hổng, sổ cái Xu/XP, audit log, kill switch, slide registry, quản lý bot. Thêm DoD + bảng quyết định. Cắt A/B Testing, Media Library, Seasonal Shop khỏi v1.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2.1       | 2026-09-19 | **Chốt 6 quyết định.** Thêm mục **6.3 — Hosting Vercel miễn phí** (2 project, Root Directory `admin/`, subdomain free, cảnh báo non-commercial). Giản lược theo Q6: bỏ `assigned_to`, bỏ RBAC khỏi schema. Ghi rõ rủi ro đã chấp nhận của Q2 + biện pháp giảm nhẹ. Đánh dấu 📌 các mục bị ảnh hưởng bởi quyết định. Thêm cột "Phụ thuộc" vào bảng tiến độ (GĐ 3 chặn bởi GĐ 2 theo Q4). Xác nhận Admin **không cần mobile**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2.2       | 2026-09-19 | 🔴 **Đính chính:** bản 2.0/2.1 gắn sai "seed content pack" với guest mode. Thực tế guest **đọc DB được** — hạn chế của guest nằm ở tầng ghi dữ liệu, không ở tầng mạng. Thêm **mục 3.0** (đính chính) và **mục 3.0.1** (giữ nguyên file tĩnh, không xây seed pack). Thêm **mục 3e — Chống lệch nội dung bundle/DB**: chứng minh rủi ro tự giới hạn (xấu nhất = hành vi hiện tại), 3 rủi ro còn lại (E1/E2/E3) + cách xử lý, bảng tóm tắt nguồn nội dung theo tình huống. Bổ sung `content_version`, content manifest, RLS published-only cho `anon`. Cập nhật DoD GĐ 3 (6 điều). Bỏ yêu cầu xây seed pack.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2.3       | 2026-09-19 | 🛠️ **Thực thi Giai đoạn 0.** Tạo `supabase/migrations/0001_admin_foundation.sql` (role/is_banned, `is_admin()` SECURITY DEFINER, **vá lỗ hổng leaderboard**, policy admin, `admin_audit_log`, `app_config`, index `parent_id`). Tạo app `admin/` độc lập (Vite + React 19 + Tailwind v4 + Supabase anon key) gồm auth provider, route guard, login Google, layout, dashboard có 4 phép kiểm tra RLS. Thêm `admin/README.md` (hướng dẫn migration → env → cấp quyền → deploy Vercel → OAuth redirect). Thêm script `dev:admin` / `build:admin` ở repo gốc; sửa `install:all` (trỏ sai `../server`). Đánh dấu hoàn thành 16/19 mục GĐ 0. ⏳ Còn lại: tạo Vercel project, thêm Redirect URL, set role admin.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2.4       | 2026-09-19 | 🛠️ **Thực thi Giai đoạn 1.** Tạo `supabase/migrations/0002_reward_economy.sql` (`reward_configs` 27 khoá, `coin_transactions`, `xp_events`, `level_curve`, `reward_multiplier`). Tạo `client/src/services/rewardService.js` — đọc đồng bộ từ cache, làm mới nền, không tạo vòng import. Thêm `grantReward()` + ghi sổ cái vào `useUserStore`. **Refactor 14 điểm phát thưởng ở 8 file** (không phải 12 như kiểm kê ban đầu). Tách port dev: client 5173, admin 5174. Xây màn hình **Game Economy** (`admin/src/pages/EconomyPage.jsx`) + `admin/src/lib/audit.js`. Bỏ RPC `log_reward` (RLS làm được, ít hơn 1 tầng). Thêm `docs/admin_portal_test_cases.md` — **27 test case** cho GĐ 0 + GĐ 1, có lệnh copy-paste, bảng theo dõi kết quả, khung GĐ 2-4. Verified: `oxlint` sạch · `vite build` client và admin đều pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2.5       | 2026-09-19 | ✅ **Hoàn tất Giai đoạn 1.** Thêm màn hình **Người dùng** (`admin/src/pages/UsersPage.jsx`) — join `child_profiles` ⨝ `profiles` ⨝ `child_progress`, phân trang 20/trang, tìm theo tên bé hoặc email phụ huynh, khoá/mở khoá tài khoản kèm lý do bắt buộc, cột mức độ hoạt động (suy ra từ `last_active_date`, **không cần bảng mới**), cột **Xu/24h** gắn cờ khi vượt 500. Thêm 5 test case (`TC-1.13` → `TC-1.17`), tổng **32 test case**. GĐ 1 hoàn tất phần code — chờ test.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2.6       | 2026-09-19 | 🤖 **Thêm automation test** — `scripts/test-admin-portal.mjs`, chạy bằng `npm run test:portal`. **Không cần thư viện nào** (dùng `fetch` có sẵn của Node 18+). 20 mục tự động: 8 mục quét source (thưởng gán cứng còn sót, dependency array mồ côi, khoá `grantReward` không tồn tại, seed SQL lệch code, 2 bundle lẫn nhau, `service_role` ở frontend) + 12 mục gọi REST bằng anon key (seed đủ/đúng, RLS chặn ghi leaderboard, chặn đọc `profiles`/`child_profiles`/sổ cái, `is_admin()` false, audit log bất biến). Kết quả hiện tại: **20 PASS · 0 FAIL**. Exit code dùng được trong CI. Tool in ra danh sách **23 mục cần test tay** — vì **Google OAuth không thể tự động hoá**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2.7       | 2026-09-20 | 🐞 **Vòng sửa lỗi từ test tay.** (1) `TC-R.7` — Sổ Tay Ôn Bài Sai: `dueMistakes` gọi lại mỗi render, mà `resolveMistake()` đổi `nextReviewDate` ngay → mảng co giữa phiên → câu kế bị nhảy và phiên kết thúc sớm. Sửa bằng ảnh chụp `reviewQueue` lúc mở tab. (2) `TC-R.8` — màn hình kết quả **cả 6 mini game** viết chết số `120/70/30/10` Xu và `200/120/50/20` XP; đổi giá trên Admin thì Xu thực nhận đúng nhưng chữ vẫn ghi số cũ. Sửa bằng cách lưu số THẬT mà `grantReward()` trả về. (3) Cache giá thưởng: throttle 60s quá dài → hạ còn 5s. (4) Hoàn tất mục cuối GĐ 1: ghi `ban_reason` vào `child_profiles`. (5) Thêm `S-9`/`S-10` (gán cứng số trên UI, có **canary** tự kiểm chứng bộ dò), `S-11` (giá trị seed SQL khớp code). (6) 🔴 **Sửa `D-2` — bản cũ sai thiết kế:** nó đòi DB sống phải BẰNG `REWARD_DEFAULTS`, tức là test sẽ FAIL ngay khi tính năng đúng. Đổi thành kiểm tra dữ liệu hợp lệ + liệt kê khoá đã chỉnh khác mặc định. Tổng: **23 PASS · 0 FAIL**. Thêm `TC-R.7`, `TC-R.8` → **34 test case**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2.8       | 2026-09-20 | ✅ **GĐ 0 hoàn tất** — Admin Portal đã deploy tại `https://admin-toanvuive.vercel.app` (project Vercel thứ hai, Root Directory `admin`). Ghi lại lỗi deploy đã gặp ở mục DoD GĐ 0 để lần sau không mất thời gian. ✂️ **Tinh gọn GĐ 2 theo yêu cầu:** cắt khỏi 2a bốn mục (khôi phục streak thủ công, cấp/thu Xu thủ công, cấp Streak Freeze, reset PIN phụ huynh) — Streak Freeze sẽ làm thành **cửa hàng vật phẩm kiểu Duolingo**. Viết rõ **mục tiêu của 2b**: nó tồn tại để trả lời 3 câu hỏi ở mức từng câu hỏi (câu nào hỏng · đoán bừa hay không hiểu · chủ đề nào yếu), và **cố ý loại** 2 câu hỏi khác (drop-off, retention) vì chưa đủ người dùng. `app_events` **hoãn** — chưa có ai cần nó. Đổi `question_id` → `question_ref` kèm ghi chú: **không có `question_id` nào tồn tại** (câu trong bài học không có `id`; câu luyện tập sinh ngẫu nhiên lúc chạy) → ✅ **đã giải quyết ngay sau đó:** câu sinh ngẫu nhiên đánh ID theo **khuôn** (`topicId` đã có sẵn — không phải sửa file data nào), câu viết tay đánh ID theo câu; xem khối `question_ref` ở mục Giai đoạn 2. Đổi thứ tự GĐ 2 thành `2a → 2c → 2b`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2.9       | 2026-09-20 | 🛠️ **Thực thi GĐ 2a.** Thêm `admin/src/pages/ChildProfilePage.jsx` (route `/users/:childId`) — màn hình **chỉ đọc** gồm 7 khối: danh tính + trạng thái khoá, tiến độ cấp độ, tiến độ học tập, sổ tay lỗi sai, lịch sử giao dịch Xu, lịch sử XP, thú cưng. Tên bé trong `UsersPage` thành link sang hồ sơ. 🔴 **Phát hiện:** bảng `child_mistakes` có từ `schema.sql` nhưng **client chưa bao giờ ghi** → luôn rỗng; và cột `answer` là `INT` trong khi đáp án so sánh là `'>'`/`'<'`/`'='`. Thêm `0004_mistakes_sync.sql` (sửa `answer` → `TEXT`, + index `child_id, failed_count DESC`) và `syncMistakeToCloud()` trong `useProgressStore` (INSERT lần đầu → lưu `dbId` → UPDATE các lần sau; guest bỏ qua; lỗi chỉ cảnh báo). Thêm 6 test case (`TC-2.1` → `TC-2.6`) → **40 test case**. Verified: build admin 3.02s · build client 8.24s · `23 PASS · 0 FAIL` · 4 truy vấn PostgREST của hồ sơ đã kiểm chứng không lỗi cột/quan hệ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2.10      | 2026-09-20 | 🧪 **Thêm kiểm tra biến chưa khai báo (`no-undef`) cho cả 2 app.** `isUuid is not defined` từng lọt ra trình duyệt dù `vite build` **và** chẩn đoán VS Code đều báo sạch — đây là lỗi **lúc chạy**, build không bao giờ bắt được. Thêm `admin/.oxlintrc.json` (client đã có sẵn từ trước) và test tự động `S-12` chạy `oxlint` trên **cả** `client/src` lẫn `admin/src`, dùng binary có sẵn trong `client/node_modules` nên **không phải cài thêm gì**. 🔴 **Đo được: `oxlint` mặc định KHÔNG bật `no-undef`** (exit 0, không in gì) — phải có `"no-undef": "deny"` trong `.oxlintrc.json`, nên `S-12` kiểm tra luôn sự tồn tại của 2 file cấu hình để tránh test xanh giả. Bộ dò đã kiểm chứng: cố ý thêm biến chưa khai báo → `S-12` FAIL đúng như mong đợi. Thêm `TC-2.7` → **41 test case**. 🔴 **Đã thử cài `oxlint` trực tiếp vào `admin` và THẤT BẠI — đừng thử lại.** Đã kiểm chứng nghiêm túc: tắt hẳn 2 dev server, xoá sạch `admin/node_modules` + `package-lock.json`, cài lại từ đầu — tổng **7 lần thử** (`npm install`, `--include=optional`, `--force`, khai báo thẳng vào `optionalDependencies`, cài trực tiếp gói binding). Tất cả đều thất bại: gói `@oxlint/binding-win32-x64-msvc` **có** trên registry, `os=win32`/`cpu=x64` **khớp máy này**, lockfile **có** ghi entry, nhưng `npm ls` báo `(empty)` và không có file `*oxlint*.node` nào trong `node_modules`. Trong khi đó `client/node_modules/@oxlint/binding-win32-x64-msvc` **có sẵn và chạy tốt** → chốt dùng binary của client (đúng như `S-12` đang làm). Muốn có cổng chặn ở tầng Vercel thì phải giải bài toán npm này trước; **không đáng**, vì `npm run test:portal` đã chặn được. |

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
