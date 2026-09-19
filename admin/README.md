# Admin Portal — Toán Vui Tiểu Học

Ứng dụng quản trị **tách biệt hoàn toàn** với app chính. Không dùng chung bundle, không đóng gói vào APK.

- App chính: `client/` — app cho trẻ, có mobile
- **Admin: `admin/` (thư mục này) — chỉ web**

---

## 1. Chạy migration database

Vào **Supabase Dashboard → SQL Editor**, dán toàn bộ nội dung file:

```
supabase/migrations/0001_admin_foundation.sql
```

bấm **Run**. File an toàn khi chạy lại.

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
https://admin-<tên-dự-án>.vercel.app/**
http://localhost:5174/**
```

> ⚠️ **Phải là `5174`, không phải `5173`.** Admin Portal chạy port **5174**
> (`admin/vite.config.js` đặt `strictPort: true`); `5173` là app của bé. Hai app tuy
> dùng chung một project Supabase nhưng **khác origin**, nên Supabase phải cho phép cả hai.

Thêm cả `5173` nếu bạn muốn đăng nhập Google trên app của bé từ máy này:

```
http://localhost:5173/**
```

### 6.1. Kiểm tra nhanh sau khi deploy

| Kiểm tra                  | Cách làm                                                              | Mong đợi                                    |
| ------------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| SPA routing không 404     | Mở `https://admin-….vercel.app/currency` (đổi URL tay)                | Vào trang Kinh tế, **không** lỗi 404        |
| Đăng nhập Google được     | Bấm **Đăng nhập bằng Google**                                          | Vào Dashboard, không bị đá về trang chủ     |
| Env đã nạp                | DevTools → Console → gõ `__sb`                                         | `undefined` (log `__sb` chỉ có ở chế độ dev) |
| Kết nối Supabase đúng     | Vào **Người dùng** → bảng hiện đúng số bé                              | Khớp `SELECT COUNT(*) FROM child_profiles;` |

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
