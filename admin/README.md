# Admin Portal — Toán Vui Tiểu Học

Ứng dụng quản trị **tách biệt hoàn toàn** với app chính. Không dùng chung bundle, không đóng gói vào APK.

- App chính: `client/` — app cho trẻ, có mobile
- **Admin: `admin/` (thư mục này) — chỉ web**

---

## 1. Chạy migration database

Vào **Supabase Dashboard → SQL Editor**, dán **từng file theo ĐÚNG THỨ TỰ** dưới đây, bấm **Run**
sau mỗi file:

```
supabase/migrations/0001_admin_foundation.sql   ← nền tảng: role, is_admin(), audit log
supabase/migrations/0002_reward_economy.sql     ← kinh tế Xu/XP + sổ cái
supabase/migrations/0003_tune_rewards.sql       ← giá thưởng đã chốt
supabase/migrations/0004_mistakes_sync.sql      ← child_mistakes.answer INT → TEXT
supabase/migrations/0005_support_tickets.sql    ← hộp thư báo lỗi câu hỏi
supabase/migrations/0006_question_attempts.sql  ← dữ liệu phân tích câu trả lời
supabase/migrations/0007_analytics_queries.sql  ← hàm gộp số liệu cho /analytics
supabase/migrations/0008_content_schema.sql     ← 4 bảng content_* (lát 3a)
supabase/migrations/0009_content_drafts.sql     ← bản nháp + publish/rollback (lát 3c)
supabase/migrations/0010_content_age_range.sql  ← bù cột age_range cho lớp
supabase/migrations/0011_bat_doc_noi_dung_tu_db.sql      ← GẠT CÔNG TẮC: app đọc từ DB (lát 3d)
supabase/migrations/0012_chan_quyen_ham_noi_bo.sql       ← chặn khách gọi hàm nội bộ của CMS
supabase/migrations/0013_content_report_and_create_lesson.sql ← báo cáo phiên bản nội dung + tạo bài mới
supabase/migrations/0014_xoa_bai_hoc_trong_db.sql       ← xoá bài bằng SQL thì app tự lành (trigger AFTER DELETE)
supabase/migrations/0015_xoa_bai_hoc_tu_giao_dien.sql   ← nút XOÁ MỘT BÀI trên giao diện (chốt gõ chữ)
supabase/migrations/0016_vet_xoa_noi_dung_nguon.sql      ← vết xoá ghi đúng nguồn (SQL Editor hay giao diện)
```

> 🔴 **`0015` mới có nút xoá, và nó có chốt:** chọn một bài → **🗑️ Xoá bài này** → hộp thoại bắt
> **gõ đúng cụm `delete this lesson`** thì nút `Xoá vĩnh viễn` mới bật. Việc xoá đi qua hàm SQL
> `delete_lesson` (chỉ admin); `content_version` và vết `lesson.delete` do trigger `0014` lo.
> **Vẫn KHÔNG có đường xoá CHƯƠNG** — cố ý; muốn giấu một bài khỏi mắt bé thì dùng **Rút bài**.
> Muốn kiểm lại toàn bộ: `docs/admin_portal_test_cases.md` → `TC-3c.12`, `TC-3d.10`.

Mọi file đều **an toàn khi chạy lại** (idempotent).

> 🔴 **`0010` phải chạy TRƯỚC `0011`** — bật công tắc trước khi bù `age_range` thì phụ huynh sẽ thấy
> `Lớp 1 ()`.
> Danh sách đầy đủ + cách kiểm từng bước: `docs/admin_portal_test_cases.md` → **mục A.2**.

> ⚠️ **Từ nay KHÔNG chạy lại `supabase/schema.sql`.**
> File đó chứa policy `leaderboard` lỗi (`USING (true) WITH CHECK (true)`) mà migration này vừa vá. Chạy lại là mở lại lỗ hổng cho phép bất kỳ ai ghi đè điểm của người khác.

---

## 2. Cấu hình biến môi trường

```powershell
Copy-Item ..\client\.env.local .env.local
```

Hoặc tạo tay từ `.env.example`:

```
VITE_SUPABASE_URL=https://<project>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Lấy trong **Supabase → Project Settings → API**.

> ❌ **KHÔNG BAO GIỜ dùng `service_role` key ở đây.** Key đó bỏ qua toàn bộ RLS. Nhúng vào frontend là mất sạch bảo mật. Chỉ dùng `anon` key — quyền hạn do RLS quyết định.

---

## 3. Cấp quyền admin

Toàn bộ thao tác trong **Supabase Dashboard → SQL Editor**. Không có giao diện cấp quyền admin — và đó là chủ ý: một UI như vậy tự nó là lỗ hổng. Với 1 admin, chạy SQL một lần là đủ.

### Bước 1 — Kiểm tra trạng thái hiện tại

```sql
-- a) Migration đã chạy chưa? Phải trả về 1 dòng 'role'.
SELECT column_name FROM information_schema.columns
 WHERE table_name = 'profiles' AND column_name IN ('role', 'is_banned');

-- b) Tài khoản đã có dòng trong profiles chưa?
SELECT id, email, role FROM public.profiles WHERE email = 'ban@example.com';
```

- (a) trả về **0 dòng** → chưa chạy migration. Quay lại mục 1.
- (b) trả về **0 dòng** → tài khoản chưa từng đăng nhập app. Đăng nhập `client/` một lần rồi thử lại.

### Bước 2 — Cấp quyền

Cách thường dùng:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'ban@example.com';
```

Nếu báo **`UPDATE 0`** (không tìm thấy dòng nào), dùng cách này — nó tự tạo hồ sơ nếu thiếu:

```sql
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, raw_user_meta_data->>'full_name', 'admin'
FROM auth.users
WHERE email = 'ban@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### Bước 3 — Xác nhận

```sql
SELECT id, email, role, is_banned FROM public.profiles WHERE role = 'admin';
```

Phải thấy tài khoản của bạn với `role = 'admin'`. Sau đó **tải lại trang admin và đăng nhập lại** — phiên cũ đã bị đăng xuất nên cần đăng nhập mới.

> 💡 Nếu trang admin báo _"Không đọc được hồ sơ: column ... does not exist"_ → migration chưa chạy.
> Nếu báo _"chưa được cấp quyền quản trị"_ → migration đã chạy, nhưng bước 2 chưa làm.

---

## 4. Chạy local

```powershell
npm install
npm run dev
```

Mở http://localhost:5173 — đăng nhập Google. Nếu không phải admin, app tự đăng xuất và báo không có quyền.

---

## 5. Deploy lên Vercel (miễn phí)

Tạo **project thứ hai** trên Vercel, trỏ vào **cùng Git repo**:

| Cấu hình         | Giá trị         |
| ---------------- | --------------- |
| Root Directory   | `admin`         |
| Framework Preset | Vite            |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |

Thêm 2 biến môi trường (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) cho **Production, Preview và Development**.

Kết quả: `https://admin-<tên-dự-án>.vercel.app` — không cần mua domain.

> Project cũ của app chính **không bị ảnh hưởng**. Deploy admin lỗi cũng không làm app của trẻ sập.

---

## 6. Thêm domain admin vào Google OAuth

Đây là bước **dễ bị bỏ sót nhất** — thiếu nó thì đăng nhập xong sẽ bị đá về trang chủ.

Vào **Supabase → Authentication → URL Configuration → Redirect URLs**, thêm:

```
https://admin-toanvuive.vercel.app/**
http://localhost:5174/**
```

> ⚠️ **Phải là `5174`, không phải `5173`.** Admin Portal chạy port **5174**
> (`admin/vite.config.js` đặt `strictPort: true`); `5173` là app của bé. Hai app tuy
> dùng chung một project Supabase nhưng **khác origin**, nên Supabase phải cho phép cả hai.

Thêm cả `5173` nếu bạn muốn đăng nhập Google trên app của bé từ máy này:

```
http://localhost:5173/**
```

### 6.1. Các route của Admin Portal

| Đường dẫn          | Trang                                             |
| ------------------ | ------------------------------------------------- |
| `/`                | Tổng quan — 4 phép kiểm tra RLS chạy tự động      |
| `/economy`         | Kinh tế Xu/XP — bảng cấu hình phần thưởng         |
| `/users`           | Người dùng — danh sách bé, khoá/mở khoá tài khoản |
| `/users/:childId`  | Hồ sơ bé — chỉ đọc, 7 khối thông tin              |
| `/reports`         | Báo lỗi câu hỏi — hộp thư báo lỗi từ phụ huynh/bé |
| _(đường dẫn khác)_ | Tự chuyển hướng về `/`                            |

Không có route nào tên `currency`. Tên đúng là **`economy`**.

### 6.2. Kiểm tra nhanh sau khi deploy

| Kiểm tra              | Cách làm                                                                        | Mong đợi                                                               |
| --------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **SPA routing**       | Gõ tay vào thanh địa chỉ `https://admin-toanvuive.vercel.app/economy` rồi Enter | Vào thẳng **Kinh tế Xu/XP**, không 404, **không** bị nhảy về Tổng quan |
| Đăng nhập Google được | Bấm **Đăng nhập bằng Google**                                                   | Vào **Tổng quan**, không bị đá về trang đăng nhập                      |
| Env đã nạp            | DevTools → Console → gõ `__sb`                                                  | `undefined` (log `__sb` chỉ có ở chế độ dev)                           |
| Kết nối Supabase đúng | Vào **Người dùng** → đếm số dòng                                                | Khớp `SELECT COUNT(*) FROM child_profiles;`                            |

> ⚠️ **Đừng test SPA routing bằng một đường dẫn bịa** (kiểu `/currency`, `/abc`).
> Route `*` sẽ tự chuyển hướng về `/`, nên trang vẫn hiện ra bình thường — bạn **không
> thể phân biệt** "rewrite chạy đúng" với "bị chuyển hướng". Phải dùng một route **có thật**
> như `/economy` hoặc `/users`, và kiểm tra rằng mình đang ở **đúng trang đó**.

---

## 7. Kiểm tra bảo mật (Definition of Done — Giai đoạn 0)

Màn hình **Tổng quan** có sẵn 4 phép kiểm tra tự động. Cả 4 phải xanh ✅.

Kiểm tra thủ công phần quan trọng nhất — **RLS có thực sự chặn không**. Mở DevTools Console **trên app chính** (`client/`), khi đang đăng nhập bằng tài khoản user thường, dán:

```js
// Phải LỖI hoặc trả về mảng rỗng — đọc được toàn bộ profiles là RLS hỏng
const { data, error } = await window.__supabase
  .from("profiles")
  .select("id, email, role")
  .limit(5);
console.log({ data, error });
```

Và kiểm tra lỗ hổng leaderboard đã bị vá:

```js
// Phải bị TỪ CHỐI — ghi được điểm cho người khác là lỗ hổng chưa vá
const { error } = await window.__supabase.from("leaderboard").upsert({
  id: "someone-elses-uuid",
  name: "Hack",
  weekly_xp: 999999,
  is_bot: false,
});
console.log(error);
```

> Nếu `window.__supabase` không tồn tại, dùng cách khác: **Supabase → Authentication → Users**, hoặc gọi REST bằng `curl` với anon key.

---

## Ghi chú kiến trúc

- **`AdminRoute` chỉ là UX, không phải bảo mật.** Ai mở DevTools cũng gọi thẳng được Supabase REST API. Hàng rào thật là `is_admin()` + RLS ở database.
- **Không có backend riêng.** Admin nói chuyện trực tiếp với Supabase, giống app chính. Chỉ `api/tts.js` ở repo gốc là serverless function.
- **Audit log bất biến.** Bảng `admin_audit_log` cố ý không có policy UPDATE/DELETE — không sửa, không xoá được. Không có gì ghi vào đó ở Giai đoạn 0; sẽ dùng từ Giai đoạn 1.
