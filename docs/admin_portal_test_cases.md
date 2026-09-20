# 🧪 Test Cases — Admin Portal & Hệ thống kinh tế

> **Cập nhật:** 2026-09-20 · **Trạng thái:** GĐ 0 ✅ · GĐ 1 ✅ · GĐ 2a ✅ đã test PASS · GĐ 2c ✅ đã test PASS · GĐ 2b 🔵 đang lên kế hoạch
> **47 test case** · Dùng kèm với `docs/admin_portal_plan.md`.

---

## 📋 Cách dùng tài liệu này

1. Mỗi test case có **ID** (VD `TC-1.14`). Tick vào cột "Kết quả" ở **Phần cuối**.
2. Test case đánh dấu 🔴 là **bắt buộc** — nếu fail thì giai đoạn đó chưa đạt.
3. Ghi lại kết quả thật, kể cả khi pass. Sau này đối chiếu rất nhanh.

**Quy ước kết quả:** `PASS` · `FAIL` · `SKIP` (kèm lý do)

---

## 🤖 Automation test — chạy trước khi test tay

```powershell
npm run test:portal          # tất cả những gì tự động hoá được
npm run test:portal:static   # chỉ quét source, không cần mạng
node scripts/test-admin-portal.mjs --db   # chỉ kiểm tra database
```

**Không cần cài thư viện nào** — dùng `fetch` có sẵn của Node 18+.

**Tool tự kiểm tra 24 mục** (mã `S-x` và `D-x` trong output khớp với `TC-x.y` ở dưới):

| Nhóm  | Nội dung                                                                                                                                                                                                                                                                    | Số mục |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| **S** | Quét source: không còn thưởng gán cứng, không còn dependency array mồ côi, mọi khoá `grantReward` đều tồn tại, seed SQL khớp code **cả khoá lẫn giá trị**, 2 bundle tách biệt, không nhúng `service_role`, không gán cứng số Xu/XP trên UI, **không có biến chưa khai báo** | 12     |
| **D** | Gọi REST bằng anon key: seed đủ và đúng giá trị, RLS chặn ghi leaderboard, chặn đọc `profiles`/`child_profiles`/sổ cái, `is_admin()` trả false, audit log bất biến, `reward_configs` đọc công khai được                                                                     | 12     |

Exit code `0` = tất cả PASS (dùng được trong CI). `1` = có FAIL.

> ### ⚠️ Giới hạn — đọc trước khi tin tưởng tool
>
> **Google OAuth không thể tự động hoá.** Google chặn đăng nhập từ trình duyệt điều khiển tự động.
> Nên tool **không** kiểm tra được: đăng nhập, bấm nút, chơi game, mọi thứ cần session thật.
>
> Tool in ra danh sách **"CẦN TEST TAY"** ở cuối — đó là những mục bạn vẫn phải tự làm.
>
> Nói cách khác: tool lo **tầng dữ liệu và bảo mật** (nơi rủi ro thật nằm), bạn lo **tầng giao diện**.

---

## ⚙️ Phần A — Chuẩn bị môi trường

### A.1. Port

| URL                                  | Ứng dụng                      |
| ------------------------------------ | ----------------------------- |
| `http://localhost:5173`              | App chính (cho bé)            |
| `http://localhost:5174`              | Admin Portal                  |
| `https://admin-toanvuive.vercel.app` | Admin Portal — **production** |

Chạy cả hai:

```powershell
npm --prefix client run dev    # 5173
npm --prefix admin  run dev    # 5174
```

### A.2. Thứ tự chạy migration (quan trọng)

Chạy **đúng thứ tự** trong Supabase → SQL Editor:

| #   | File                                            | Nội dung                                                      |
| --- | ----------------------------------------------- | ------------------------------------------------------------- |
| 1   | `supabase/migrations/0001_admin_foundation.sql` | role, `is_admin()`, vá RLS leaderboard, audit log, app_config |
| 2   | `supabase/migrations/0002_reward_economy.sql`   | reward_configs (giá gốc), sổ cái, hệ số nhân, level curve     |
| 3   | `supabase/migrations/0003_tune_rewards.sql`     | 🔧 Chốt giá thưởng sau test — hạ thang luyện tập & mini game  |
| 4   | `supabase/migrations/0004_mistakes_sync.sql`    | 🔧 `child_mistakes.answer` INT → TEXT, index cho hồ sơ bé     |
| 5   | `supabase/migrations/0005_support_tickets.sql`  | 📮 Bảng `support_tickets` + RLS cho phụ huynh / khách / admin |

> **Vì sao có cả 0002 và 0003?** `0002` đã chạy rồi nên **không sửa** (sửa migration
> đã áp dụng là cách chắc nhất để môi trường này lệch môi trường kia). `0003` chép lại
> 7 khoá đã được chỉnh trong lúc test thành migration.
>
> ℹ️ Nếu bạn đã chỉnh 7 khoá đó trên Admin rồi thì chạy `0003` **không đổi gì** — nó
> `UPDATE` về đúng giá trị đang có. Chạy để xác nhận file sạch, và để project Supabase
> mới cài xong là có ngay đúng giá.

> ⚠️ **Tuyệt đối không chạy lại `supabase/schema.sql`** — file đó sẽ mở lại lỗ hổng `leaderboard`.

> 📌 **Vì sao cần `0004`:** bảng `child_mistakes` có từ `schema.sql` nhưng **client chưa bao
> giờ ghi vào** → luôn rỗng. GĐ 2a mới bắt đầu ghi thật, và khi đó lộ ra: cột `answer` khai
> báo `INT` nhưng câu hỏi so sánh (khuôn `g1_compare`) có đáp án là `'>'`, `'<'`, `'='`.
> Chưa chạy `0004` thì những câu đó **đồng bộ thất bại** (chỉ thấy cảnh báo trong Console,
> không làm sập app — cố ý "bắn rồi quên").

### A.3. Tài khoản cần có

| Tài khoản  | Vai trò          | Dùng để                              |
| ---------- | ---------------- | ------------------------------------ |
| **Admin**  | `role = 'admin'` | Test Admin Portal                    |
| **User A** | `role = 'user'`  | Test quyền bị chặn, test phát thưởng |
| **Guest**  | Không đăng nhập  | Test chế độ khách                    |

Cấp quyền admin:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@example.com';
```

### A.4. Dùng Console trình duyệt để test

**Không cần dán gì cả.** Khi chạy dev, **cả hai app** đều tự phơi Supabase client ra Console.

1. Mở app cần test (`5173` hoặc `5174`)
2. Nhấn **F12** → chọn tab **Console**
3. Gõ `__sb` rồi Enter — phải hiện ra một object `SupabaseClient`
4. Thấy log `[dev] window.__sb đã sẵn sàng để test thủ công.` là dùng được ngay

**Mở Console ở app nào?** Nguyên tắc: **mở ở app đang có đúng session bạn cần test.**

| Test về                                        | Mở ở     | Vì sao                               |
| ---------------------------------------------- | -------- | ------------------------------------ |
| Quyền của **user thường** (`TC-0.2`, `TC-0.3`) | **5173** | Session ở đó là User A               |
| Quyền của **admin** (`TC-0.4`)                 | **5174** | Bạn đã đăng nhập sẵn bằng admin ở đó |
| Ghi sổ cái, phát thưởng (`TC-1.x`)             | **5173** | Đó mới là app thực sự phát thưởng    |

> ⚠️ **Hai app KHÔNG chia sẻ session.** Chúng là hai origin khác nhau (khác port), nên
> mỗi bên có localStorage riêng. Đăng nhập ở `5173` thì `5174` **vẫn là khách**, và ngược lại.
> Đây là lý do bạn phải đăng nhập **2 lần** nếu muốn dùng cả hai app.
>
> `__sb` dùng chung session với chính app đang mở — không có chuyện lấy session của app kia.

Sau đó gõ thẳng lệnh:

```js
await __sb.from("profiles").select("id, email").limit(10);
```

**Nếu Chrome báo** `await is only valid in async functions` — bọc lại như sau (một số bản
Chrome không cho `await` ở cấp cao nhất trong Console):

```js
(async () => {
  console.log(await __sb.from("profiles").select("id").limit(3));
})();
```

**Một số lệnh sẽ đăng xuất app** (`__sb.auth.signOut()`). Đó là chủ ý — đăng nhập lại bằng
nút **Đăng nhập** trên giao diện để tiếp tục.

> 🔒 **An toàn:** `window.__sb` chỉ tồn tại khi chạy `npm run dev`. Vite thay
> `import.meta.env.DEV` bằng `false` lúc build production nên đoạn code này bị loại bỏ
> hoàn toàn khỏi bundle phát hành. Anon key vốn đã công khai trong bundle — không lộ thêm gì.

> 🛑 **Nếu gặp lỗi `Cannot use 'import.meta' outside a module`** — bạn đang dán **code nguồn
> của app** vào Console. Code nguồn dùng `import.meta.env`, thứ chỉ tồn tại trong ES module;
> Console chạy như script thường nên không hiểu.
> **Đừng dán code nguồn.** App đã tự chạy nó khi tải trang — bạn chỉ cần gõ `__sb`.

### A.5. Reset trạng thái giữa các test

```js
// Xoá toàn bộ dữ liệu local của app chính (giữ nguyên dữ liệu trên Supabase)
Object.keys(localStorage)
  .filter((k) => k.startsWith("toan-vui-"))
  .forEach((k) => localStorage.removeItem(k));
location.reload();
```

Để reset cả trên Supabase cho 1 bé:

```sql
DELETE FROM public.coin_transactions WHERE child_id = '<child-uuid>';
DELETE FROM public.xp_events        WHERE child_id = '<child-uuid>';
UPDATE public.child_profiles SET coins = 0, xp = 0, level = 1, total_xp_for_next_level = 100 WHERE id = '<child-uuid>';
```

### A.6. Bơm câu sai về "tới hạn hôm nay"

> **Chỉ dùng khi test**, không phải bug. Sổ Tay Ôn Bài Sai chạy theo **lịch giãn cách**:
> câu sai hôm nay được hẹn ôn vào **ngày mai** (`nextReviewDate = getDatePlusDays(1)`),
> `getDueMistakes()` lại chỉ trả về câu có `nextReviewDate <= hôm nay`.
> Nên vừa trả lời sai xong thì sổ **rỗng là đúng** — đừng báo bug này.

Mở Console ở `5173`:

```js
(() => {
  const KEY = "toan-vui-progress";
  const today = new Date().toISOString().split("T")[0];
  const raw = JSON.parse(localStorage.getItem(KEY) || "null");
  if (!raw?.state?.mistakesQueue)
    return console.warn("❌ Không thấy mistakesQueue");

  const q = raw.state.mistakesQueue;
  const before = q.filter(
    (m) => !m.mastered && m.nextReviewDate <= today,
  ).length;
  q.forEach((m) => {
    if (!m.mastered) m.nextReviewDate = today;
  });
  localStorage.setItem(KEY, JSON.stringify(raw));

  console.log(
    `✅ Tổng ${q.length} câu (${q.filter((m) => m.mastered).length} đã thuộc) · ` +
      `tới hạn: ${before} → ${q.filter((m) => !m.mastered).length} · đang tải lại...`,
  );
  location.reload();
})();
```

Vào **Luyện tập → Sổ Tay Ôn Bài Sai** để thấy câu. Xem nhanh dữ liệu thô:

```js
JSON.parse(localStorage.getItem("toan-vui-progress")).state.mistakesQueue;
```

Trả về logic thật sau khi test xong:

```js
(() => {
  const KEY = "toan-vui-progress";
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const tomorrow = d.toISOString().split("T")[0];
  const raw = JSON.parse(localStorage.getItem(KEY));
  raw.state.mistakesQueue.forEach((m) => {
    if (!m.mastered) m.nextReviewDate = tomorrow;
  });
  localStorage.setItem(KEY, JSON.stringify(raw));
  console.log("↩️ Đã hẹn lại ngày mai.");
  location.reload();
})();
```

---

# 🔐 PHẦN B — GIAI ĐOẠN 0: Bảo mật & nền tảng

### TC-0.1 — Migration chạy sạch 🔴

**Bước:** Chạy `0001_admin_foundation.sql` trong SQL Editor.

**Mong đợi:** `Success. No rows returned` (không có lỗi).

**Kiểm chứng:**

```sql
SELECT column_name FROM information_schema.columns
 WHERE table_name = 'profiles' AND column_name IN ('role','is_banned','last_seen_at');
-- Mong đợi: 3 dòng
```

**Chạy lại lần 2 phải vẫn thành công** (migration idempotent).

---

### TC-0.2 — Lỗ hổng leaderboard đã được vá 🔴

> Đây là test quan trọng nhất của GĐ 0. Lỗ hổng cũ cho phép **bất kỳ ai có anon key ghi đè điểm của người khác**.

**Chuẩn bị:** Đăng nhập app chính bằng **User A**. Mở Console (xem A.4).

**Bước:**

```js
// Thử ghi điểm cho một bé KHÔNG thuộc tài khoản mình
const { data, error } = await window.__sb
  .from("leaderboard")
  .upsert({
    id: "00000000-0000-0000-0000-000000000000",
    name: "HACK",
    weekly_xp: 999999,
    is_bot: false,
  })
  .select();
console.log({ data, error });
```

**Mong đợi:** `error` khác null (vi phạm RLS), `data` rỗng/ null.

**Nếu PASS nhầm (ghi được):** 🔴 **DỪNG** — migration chưa chạy hoặc chạy lỗi. Kiểm tra:

```sql
SELECT policyname FROM pg_policies WHERE tablename = 'leaderboard';
-- KHÔNG được có 'Anyone can upsert leaderboard'
```

---

### TC-0.3 — User thường không đọc được hồ sơ người khác 🔴

**Chuẩn bị:** Đăng nhập app chính bằng **User A** (không phải admin). Mở Console (xem A.4).

**Bước:**

```js
const { data, error } = await window.__sb
  .from("profiles")
  .select("id, email, role")
  .limit(10);
console.log({ count: data?.length, error });
```

**Mong đợi:** Chỉ thấy **đúng 1 dòng** (chính mình). Không thấy email của người khác.

**Lặp lại với `child_profiles`:**

```js
const r = await window.__sb
  .from("child_profiles")
  .select("id, nickname, parent_id")
  .limit(10);
console.log({ count: r.data?.length, error: r.error });
```

**Mong đợi:** Chỉ thấy bé của chính mình.

**Ngắt mạng, chạy lại (test anon):**

```js
// Đăng xuất trước
await window.__sb.auth.signOut();
const r = await window.__sb.from("profiles").select("id, email").limit(5);
console.log(r);
```

**Mong đợi:** `data` = `[]` (rỗng), không phải lỗi.

---

### TC-0.4 — `is_admin()` trả đúng 🔴

**Bước** — mở Console **của Admin Portal (`5174`)** vì bạn đã đăng nhập sẵn bằng admin ở đó
(xem A.4). Không cần đăng nhập admin vào app của bé:

```js
const admin = await window.__sb.rpc("is_admin");
const normal = await window.__sb.auth
  .signOut()
  .then(() => window.__sb.rpc("is_admin"));
console.log({ khi_la_admin: admin.data, khi_la_anon: normal.data });
```

**Mong đợi:** `{ khi_la_admin: true, khi_la_anon: false }`

---

### TC-0.5 — `admin_audit_log` là bất biến 🔴

**Bước:** Trong SQL Editor (chạy bằng quyền postgres nên sẽ qua được RLS, mục đích là kiểm tra policy):

```sql
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'admin_audit_log';
```

**Mong đợi:** Chỉ có 2 policy: `SELECT` và `INSERT`. **Không có** `UPDATE` hay `DELETE`.

**Test qua API** (đăng nhập admin, console app chính):

```js
const { error } = await window.__sb
  .from("admin_audit_log")
  .delete()
  .neq("id", 0);
console.log(error); // Mong đợi: lỗi hoặc 0 dòng bị xoá
```

---

### TC-0.6 — Admin Portal: đăng nhập đúng người

**Route thật của Admin Portal** — không có route nào tên `currency`:

| Đường dẫn  | Trang                           |
| ---------- | ------------------------------- |
| `/`        | Tổng quan — 4 phép kiểm tra RLS |
| `/economy` | Kinh tế Xu/XP                   |
| `/users`   | Người dùng                      |
| _(khác)_   | Tự chuyển về `/`                |

| #   | Thao tác                                                                         | Mong đợi                                                                 |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| a   | Vào `localhost:5174`, đăng nhập bằng **admin**                                   | Vào được Dashboard                                                       |
| b   | Đăng xuất, đăng nhập bằng **User A**                                             | Bị đá về trang đăng nhập, có dòng chữ **"chưa được cấp quyền quản trị"** |
| c   | Vào `localhost:5174/economy` khi chưa đăng nhập                                  | Bị chặn, hiện trang đăng nhập                                            |
| d   | 🔴 **Production:** gõ tay `https://admin-toanvuive.vercel.app/economy` rồi Enter | Vào thẳng **Kinh tế Xu/XP**, không 404, **không** nhảy về Tổng quan      |
| e   | Production: gõ tay `.../users`                                                   | Vào thẳng **Người dùng**, không 404                                      |

**a — Bổ sung:** Dashboard hiện **4 ô kiểm tra đều ✅ xanh**.

> ⚠️ **Đừng test SPA routing bằng đường dẫn bịa** (kiểu `/currency`, `/abc`). Route `*`
> tự chuyển về `/` nên trang vẫn hiện → **không phân biệt được** "rewrite chạy đúng" với
> "bị chuyển hướng". Phải dùng route **có thật** (`/economy`, `/users`) và kiểm tra mình
> đang ở **đúng trang đó**.

---

### TC-0.7 — Thông báo lỗi phân biệt đúng nguyên nhân

| Tình huống                             | Mong đợi trên màn hình                            |
| -------------------------------------- | ------------------------------------------------- |
| Migration chưa chạy                    | `Không đọc được hồ sơ: column ... does not exist` |
| Đã đăng nhập, chưa cấp quyền           | `Tài khoản <email> chưa được cấp quyền quản trị.` |
| Tài khoản bị khoá (`is_banned = true`) | `Tài khoản này đã bị khoá.`                       |

Thử khoá tài khoản:

```sql
UPDATE public.profiles SET is_banned = true WHERE email = 'user-a@example.com';
-- Nhớ mở lại sau khi test: is_banned = false
```

---

### TC-0.8 — Bundle tách biệt 🔴

**Bước:**

```powershell
npm --prefix client run build
npm --prefix admin  run build
Get-ChildItem client\dist  -Recurse -File | Measure-Object -Property Length -Sum
Get-ChildItem admin\dist   -Recurse -File | Measure-Object -Property Length -Sum
```

**Mong đợi:**

- `client/dist` **không chứa** bất kỳ file nào của admin
- `admin/dist` **không chứa** dữ liệu bài học (`grade1Data`…)
- Kích thước `client/dist` không tăng so với trước GĐ 0

---

# 💰 PHẦN C — GIAI ĐOẠN 1: Kinh tế & sổ cái

### TC-1.1 — Seed đúng giá trị gốc 🔴

**Bước:**

```sql
SELECT group_name, COUNT(*) FROM public.reward_configs
GROUP BY group_name ORDER BY group_name;
```

**Mong đợi:** tổng **27 dòng**, chia thành 7 nhóm:

| Nhóm          | Số dòng |
| ------------- | ------- |
| Bài học       | 3       |
| Luyện tập     | 3       |
| Thử thách     | 4       |
| Nhiệm vụ ngày | 4       |
| Khác          | 1       |
| Mini game     | 4       |
| Truyện        | 8       |

```sql
SELECT key, value FROM public.app_config ORDER BY key;
```

**Mong đợi:** 3 dòng — `content_source`, `level_curve`, `reward_multiplier`.

> ⚠️ **Đừng đối chiếu giá trị SỐNG trên DB với bảng mặc định ở trên.** Sau khi bạn
> chỉnh giá trên Admin, DB khác mặc định là **đúng** — đó chính là tính năng của GĐ 1.
> Việc "seed có khớp code" do `S-11` lo (nó quét **file SQL**, không đụng DB đang chạy).
> `D-2` chỉ kiểm tra dữ liệu sống có **hợp lệ** (số nguyên ≥ 0, `coins_max ≥ coins`) và
> **liệt kê** những khoá bạn đã chỉnh khác mặc định.

Muốn xem mình đã chỉnh những gì:

```powershell
npm run test:portal -- --db    # dòng D-2 in ra danh sách khoá đã bị chỉnh
```

---

### TC-1.2 — Phát thưởng khớp cấu hình 🔴

> Đây là **test tổng hợp quan trọng nhất của GĐ 1**. Mọi mục dưới đây đều lấy giá trị từ `reward_configs`.

**Chuẩn bị:** Đăng nhập app chính (`5173`) bằng **User A** (⚠️ **không phải guest** — guest không nhận thưởng).

| #   | Hoạt động                          | Xu                    | XP     | Cách kiểm                                |
| --- | ---------------------------------- | --------------------- | ------ | ---------------------------------------- |
| a   | Trả lời đúng 1 câu trong bài học   | +10                   | 0      | Xem Xu ở header nhảy                     |
| b   | Hoàn thành bài học **mới**         | +20                   | +50    | Màn hình kết quả hiện `+20 Xu`, `+50 XP` |
| c   | Học lại bài **đã hoàn thành**      | +5                    | +10    | Màn hình kết quả hiện `+5 Xu`, `+10 XP`  |
| d   | Luyện tập trả lời đúng             | +2                    | +5     |                                          |
| e   | Luyện tập đúng **3 câu liên tiếp** | +2                    | +5     | Câu thứ 3 trở đi                         |
| f   | Ôn lại câu từng làm sai            | +2                    | +5     | Mục "Ôn tập lỗi sai"                     |
| g   | Thử thách 1 / 2 / 3                | +10 / +15 / +25       | +30    |                                          |
| h   | Rương bí ẩn                        | **+20…49 ngẫu nhiên** | +50    | Chạy 3 lần, phải ra số khác nhau         |
| i   | Nhiệm vụ "2 bài học"               | +15                   | +30    |                                          |
| j   | Nhiệm vụ "1 mini game"             | +10                   | +20    |                                          |
| k   | Nhiệm vụ "cho thú cưng ăn"         | +10                   | +20    |                                          |
| l   | Rương hoàn thành ngày              | +50                   | +60    |                                          |
| m   | Đố vui cùng Mascot                 | +5                    | 0      |                                          |
| n   | Truyện (mỗi truyện khác nhau)      | 40…80                 | 80…160 | Xem bảng bên dưới                        |
| o   | Mini game — bậc Vàng               | +20                   | +50    |                                          |
| p   | Mini game — bậc Bạc                | +15                   | +30    |                                          |
| q   | Mini game — bậc Đồng               | +10                   | +20    |                                          |
| r   | Mini game — Tham gia               | +5                    | +10    |                                          |

> 💰 **Bảng trên là giá ĐÃ CHỐT (2026-09-20)**, hạ thang luyện tập và mini game để
> **hoàn thành bài học vẫn là nguồn Xu/XP chính** (20/50). Giá gốc trong seed `0002`
> cao hơn — xem phụ lục 2.7 của `docs/admin_portal_plan.md`.

**Giá trị kỳ vọng của 8 truyện:**

| Truyện                               | Xu  | XP  |
| ------------------------------------ | --- | --- |
| Chuyến Dã Ngoại Của Thỏ Và Rùa       | 40  | 80  |
| Thám Hiểm Đại Dương & Rạn San Hô     | 45  | 90  |
| Phi Thuyền Vũ Trụ & Mật Mã Hành Tinh | 50  | 100 |
| Tiệm Bánh Kỳ Diệu Của Bác Gấu        | 50  | 100 |
| Thám Tử Rừng Xanh & Bí Mật Hình Học  | 60  | 120 |
| Hiệp Sĩ Rồng & Tòa Tháp Phép Thuật   | 65  | 130 |
| Đảo Hoang Bí Ẩn & Lâu Đài Phân Số    | 70  | 140 |
| Cỗ Máy Thời Gian & Cuộc Đua Vận Tốc  | 80  | 160 |

**Ngưỡng xếp bậc của mini game** (kiểm tra UI hiện đúng bậc):

| Game                  | Vàng   | Bạc    | Đồng    | Tham gia     |
| --------------------- | ------ | ------ | ------- | ------------ |
| Math Race (theo hạng) | hạng 1 | hạng 2 | hạng 3  | hạng 4       |
| Number Pop (điểm)     | ≥150   | ≥100   | ≥50     | <50          |
| Memory Match (lượt)   | ≤6     | ≤10    | còn lại | _(không có)_ |
| Math Balance          | thắng  | —      | —       | —            |
| Space Defense         | ≥15    | ≥10    | ≥5      | <5           |
| Math Fishing          | thắng  | —      | —       | —            |

---

### TC-1.3 — 🔴 Đổi config trên Admin → app nhận ngay (KHÔNG build lại)

> **Đây là test chứng minh toàn bộ giá trị của Giai đoạn 1.** Nếu test này fail, GĐ 1 coi như chưa xong.

**Bước:**

1. Vào `localhost:5174` → **Kinh tế Xu/XP**
2. Sửa `lesson.complete` từ `20` → **`500`** Xu
3. Bấm **Lưu thay đổi** → thấy thông báo xanh
4. **Không build, không restart gì cả.** Quay lại `localhost:5173`
5. **Tải lại trang** (Ctrl+R) rồi hoàn thành 1 bài học **mới**

**Mong đợi:** Nhận **500 Xu** (không phải 20).

**Kiểm chứng sổ cái:**

```sql
SELECT reason, amount, created_at FROM public.coin_transactions
ORDER BY created_at DESC LIMIT 5;
-- Mong đợi: dòng mới nhất có reason = 'lesson.complete', amount = 500
```

**Dọn dẹp:** Đổi lại `lesson.complete` = 20.

---

### TC-1.4 — Hệ số nhân (sự kiện X2) 🔴

**Bước:**

1. Admin → Kinh tế → **Hệ số nhân Xu/XP** → đặt `2` → Lưu
2. App chính (5173): tải lại, trả lời đúng 1 câu **trong bài học**

**Mong đợi:** Nhận **+20 Xu** (`lesson.quiz_correct` 10 × 2).

> ℹ️ Nếu thử ở mục **Luyện tập**, giá hiện tại là 2 Xu → ×2 = **+4 Xu**.

**Dọn dẹp:** Đặt lại `1`.

> ⚠️ Nếu thấy sai số lẻ (VD 10 × 1.5 = 15 chẵn thì OK, nhưng 15 × 1.5 = 22.5 → 23) — `rewardService` có `Math.round()`, đây là chủ ý.

---

### TC-1.5 — Công thức lên cấp 🔴

**Bước:**

1. Admin → đặt `base = 100`, `growth = 1.3` → Lưu
2. App chính: kiểm tra XP cần để lên cấp

**Mong đợi:** Cấp 1→2 cần 100 XP, cấp 2→3 cần 130 XP, cấp 3→4 cần 169 XP.

**Thử đổi** `base = 50` → Lưu → tải lại app → cấp 1→2 chỉ cần **50 XP**.

**Dọn dẹp:** Đặt lại `base = 100`.

---

### TC-1.6 — Tắt một mục phần thưởng 🔴

**Bước:**

1. Admin → bỏ tick **Bật** ở dòng `lesson.quiz_correct` → Lưu
2. App chính → tải lại → trả lời đúng 1 câu

**Mong đợi:** Xu **không tăng** (thưởng 0).

**Dọn dẹp:** Tick lại + Lưu.

---

### TC-1.7 — Sổ cái ghi đúng và đầy đủ 🔴

**Bước:** Sau khi chơi vài hoạt động, chạy:

```sql
SELECT
  ct.created_at,
  cp.nickname,
  ct.reason,
  ct.amount,
  ct.balance_after
FROM public.coin_transactions ct
JOIN public.child_profiles cp ON cp.id = ct.child_id
ORDER BY ct.created_at DESC
LIMIT 20;
```

**Mong đợi:**

- Mỗi lần nhận thưởng có **đúng 1 dòng**
- `reason` là khoá cấu hình (`lesson.quiz_correct`, `game.tier_gold`, …)
- `balance_after` khớp với số Xu hiển thị trên app
- Không có dòng `reason = 'unknown'` (nếu có → còn sót chỗ chưa refactor)

```sql
SELECT DISTINCT reason FROM public.coin_transactions ORDER BY reason;
```

**Mong đợi:** Tất cả đều là khoá đã biết, không có `unknown`.

---

### TC-1.8 — Mua hàng ghi sổ âm

**Bước:** App chính → Cửa hàng → mua một vật phẩm.

**Mong đợi:**

```sql
SELECT reason, amount FROM public.coin_transactions
WHERE amount < 0 ORDER BY created_at DESC LIMIT 3;
```

Có dòng `amount` âm với `reason = 'shop.purchase'`.

---

### TC-1.9 — Audit log ghi thay đổi config 🔴

**Bước:** Sau khi sửa config ở TC-1.3, chạy:

```sql
SELECT created_at, action, entity_id, before, after
FROM public.admin_audit_log
ORDER BY created_at DESC LIMIT 5;
```

**Mong đợi:** Có dòng `action = 'reward_config.update'`, `entity_id = 'lesson.complete'`,
`before = {"coins":20,...}`, `after = {"coins":500,...}`.

---

### TC-1.10 — Validate form chặn dữ liệu sai 🔴

**Bước:** Admin → Kinh tế → thử các trường hợp:

| Nhập                                              | Mong đợi                            |
| ------------------------------------------------- | ----------------------------------- |
| `coins = -5`                                      | Báo lỗi đỏ, **không lưu gì cả**     |
| `coins = 3.5`                                     | Báo lỗi (phải là số nguyên)         |
| `challenge.chest`: `coins = 50`, `coins_max = 20` | Báo `Xu tối đa phải ≥ Xu tối thiểu` |

**Quan trọng:** khi có 1 ô sai thì **các ô đúng khác cũng không được lưu** (tránh trạng thái nửa vời).

Kiểm chứng sau khi báo lỗi:

```sql
SELECT key, coins FROM public.reward_configs WHERE key = 'lesson.complete';
-- Phải vẫn là giá trị cũ
```

---

### TC-1.11 — Offline dùng giá trị mặc định 🔴

**Bước:**

1. App chính: tải lại trang 1 lần cho config vào cache
2. **DevTools → Network → chọn "Offline"**
3. Tải lại trang, hoàn thành 1 bài học

**Mong đợi:** Vẫn nhận thưởng (dùng cache localStorage). Không có màn hình trắng, không crash.

**Test mạnh hơn** — xoá cache rồi offline:

```js
localStorage.removeItem("toan-vui-reward-configs");
```

→ Tải lại (vẫn offline) → hoàn thành bài → **vẫn phải nhận 20 Xu** (rơi về `REWARD_DEFAULTS`).

---

### TC-1.12 — Guest mode không nhận thưởng 🔴

**Bước:** Đăng xuất app chính (chế độ Khách) → hoàn thành 1 bài học.

**Mong đợi:**

- **Không** có Xu/XP nào được cộng
- Màn hình kết quả hiện thông báo mời đăng nhập thay vì ô phần thưởng

```sql
SELECT COUNT(*) FROM public.coin_transactions
WHERE created_at > NOW() - INTERVAL '2 minutes';
-- Mong đợi: 0 (guest không ghi được sổ cái)
```

---

### TC-1.13 — Danh sách người dùng tải đúng 🔴

**Bước:** Admin (`5174`) → **Người dùng**

**Mong đợi:**

- Bảng hiện các cột: Bé · Phụ huynh · Hoạt động · Chuỗi · Xu · Xu/24h · Trạng thái
- Cột **Bé** hiện avatar, tên, `Lớp X · Cấp Y · N bài`
- Cột **Phụ huynh** hiện email
- Số ở góc trên (`N hồ sơ bé`) khớp:

```sql
SELECT COUNT(*) FROM public.child_profiles;
```

**Kiểm tra mức độ hoạt động** — phải khớp `last_active_date`:

```sql
SELECT cp.nickname, pr.last_active_date, pr.current_streak
FROM public.child_profiles cp
LEFT JOIN public.child_progress pr ON pr.child_id = cp.id
ORDER BY pr.last_active_date DESC NULLS LAST LIMIT 5;
```

Mong đợi: bé có `last_active_date` = hôm nay hiện nhãn **"Hôm nay"** (màu xanh).

---

### TC-1.14 — Tìm kiếm 🔴

**Bước:** Gõ vào ô tìm kiếm rồi chờ ~0.5s (có debounce).

| Gõ vào                       | Mong đợi                   |
| ---------------------------- | -------------------------- |
| Một phần **tên bé**          | Chỉ hiện các bé khớp       |
| Một phần **email phụ huynh** | Hiện bé thuộc phụ huynh đó |
| Chuỗi rác (`zzzz`)           | `Không có hồ sơ nào khớp`  |
| Xoá trắng ô tìm kiếm         | Về lại danh sách đầy đủ    |

> ⚠️ Nếu tìm theo email phụ huynh **không ra kết quả** nhưng tìm theo tên bé thì được →
> query tìm `profiles` bị chặn bởi RLS. Kiểm tra `TC-0.3` và policy `profiles_admin_read`.

---

### TC-1.15 — Phân trang

**Bước:** Nếu có hơn 20 hồ sơ bé, bấm **Sau →** và **← Trước**.

**Mong đợi:**

- Số trang hiện đúng (`Trang 1 / N`)
- Nút Trước bị mờ ở trang 1, nút Sau bị mờ ở trang cuối
- Nội dung 2 trang không trùng nhau

> Ít hơn 20 hồ sơ → chỉ có 1 trang, cả 2 nút đều mờ. Đây là kết quả đúng.

---

### TC-1.16 — Khoá / Mở khoá tài khoản 🔴

**Bước:**

1. Bấm **Khoá** ở một dòng → hộp thoại hiện ra
2. Thử bấm **Khoá tài khoản** khi chưa nhập lý do → **nút phải bị mờ**
3. Nhập lý do `Test khoá tài khoản` → bấm **Khoá tài khoản**
4. Xem lại bảng → dòng đó chuyển sang **Đã khoá** (nền đỏ nhạt)
5. Mở app chính (`5173`), đăng nhập bằng tài khoản đó → **phải bị chặn**
6. Quay lại Admin → bấm **Mở khoá** → xác nhận

**Kiểm chứng audit log:**

```sql
SELECT created_at, action, entity_id, reason
FROM public.admin_audit_log
WHERE action IN ('user.ban','user.unban')
ORDER BY created_at DESC LIMIT 5;
```

**Mong đợi:** có dòng `user.ban` với `reason = 'Test khoá tài khoản'`, và dòng `user.unban` sau đó.

**Dọn dẹp:** đảm bảo tài khoản đã được **mở khoá** lại.

```sql
SELECT email, is_banned FROM public.profiles WHERE is_banned = true;
-- Mong đợi: 0 dòng
```

**Kiểm chứng lý do khoá được ghi lên hồ sơ bé** (`TC-1.16` bước 3→4):

```sql
SELECT nickname, ban_reason FROM public.child_profiles
WHERE ban_reason IS NOT NULL;
-- Khi ĐANG khoá: phải thấy 'Test khoá tài khoản'
-- Sau khi Mở khoá: phải về 0 dòng (lịch sử vẫn còn trong admin_audit_log)
```

Trên giao diện: **rê chuột** vào nhãn `Đã khoá` → hiện lý do.

---

### TC-1.17 — Cảnh báo Xu bất thường

**Bước:**

1. Kiếm thật nhiều Xu cho 1 bé trong 24h — cách nhanh nhất là tạm đặt `lesson.complete` = 1000 Xu rồi hoàn thành 1 bài
2. Vào Admin → Người dùng

**Mong đợi:**

- Cột **Xu/24h** hiện `⚠️ +1000` màu vàng đậm
- Xuất hiện dải cảnh báo trên đầu bảng: `⚠️ 1 bé có Xu tăng bất thường trong 24h`

**Kiểm chứng:**

```sql
SELECT child_id, SUM(amount) AS xu_24h
FROM public.coin_transactions
WHERE created_at > NOW() - INTERVAL '24 hours' AND amount > 0
GROUP BY child_id ORDER BY xu_24h DESC LIMIT 5;
```

**Dọn dẹp:** đặt lại `lesson.complete` = 20.

---

# 🔁 PHẦN D — Regression (chạy sau mọi thay đổi)

> Mục đích: đảm bảo việc refactor kinh tế **không làm vỡ** những thứ đang chạy tốt.

### TC-R.1 — Guest mode vẫn học được

Không đăng nhập → vào Lớp 1 → mở bài học → làm hết bài → **không lỗi**.
Curriculum hiển thị đủ, không màn hình trắng.

### TC-R.2 — Tiến độ guest được chuyển lên cloud khi đăng nhập 🔴

**Bước:**

1. Ở chế độ Khách, hoàn thành 2 bài học
2. Đăng nhập bằng Google (tài khoản mới hoặc User B)

**Mong đợi:** Sau khi đăng nhập, 2 bài vừa học **vẫn hiện đã hoàn thành** (không mất tiến độ).

```sql
SELECT completed_lessons FROM public.child_progress
WHERE child_id = '<child-uuid>';
-- Mong đợi: có 2 khoá bài học
```

### TC-R.3 — Đồng bộ localStorage ↔ Supabase

**Bước:** Đăng nhập, kiếm ít Xu, chờ ~5 giây, chạy:

```sql
SELECT coins, xp, level FROM public.child_profiles WHERE id = '<child-uuid>';
```

**Mong đợi:** Khớp với số hiển thị trên app.

### TC-R.4 — Bảng xếp hạng vẫn chạy 🔴

Đăng nhập → vào **Đấu trường** → thấy danh sách có tên mình và các bot.
Điểm tuần của mình khớp với XP kiếm được.

> ⚠️ Đây là khu vực đã bị vá RLS — test này đảm bảo việc vá **không làm vỡ** tính năng.

### TC-R.5 — Mini game vẫn chơi được hết

Chơi lần lượt **cả 6 game**, mỗi game 1 ván: Math Race, Number Pop, Memory Match,
Math Balance, Space Defense, Math Fishing.

**Mong đợi:** Không game nào crash. Cuối ván đều có thưởng và có dòng trong sổ cái.

> ⚠️ **Test này đặc biệt quan trọng** — 3 mảng dependency của React từng tham chiếu biến
> đã bị xoá (`[timeLeft, score, addCoins, addXp, ...]`), gây `ReferenceError` ngay khi mở game.
> Lint và build **không bắt được** lỗi này.

### TC-R.6 — Thú cưng vẫn nuôi được

Vào Thú cưng → cho ăn → XP thú cưng tăng → không lỗi.

### TC-R.7 — Sổ Tay Ôn Bài Sai: phiên nhiều câu 🔴

> **Test này bắt một lỗi mà lint và build đều không thấy:** `dueMistakes` được gọi lại
> mỗi lần render, mà `resolveMistake()` lại đổi `nextReviewDate` ngay → câu vừa trả lời
> rụng khỏi danh sách → mảng co lại **giữa phiên** → câu kế bị nhảy và phiên kết thúc sớm.

**Chuẩn bị:** Làm sai **2 câu** rồi chạy mục **A.6** để đưa cả 2 về tới hạn hôm nay.

| #   | Bước                                             | Mong đợi                                                                                     |
| --- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| a   | Vào **Sổ Tay Ôn Bài Sai**                        | Tab hiện badge `2` · thẻ ghi `Câu 1 / 2`                                                     |
| b   | Trả lời câu 1                                    | Hiện ô phản hồi. **Câu hỏi phải giữ nguyên câu 1**, không tự nhảy sang câu khác              |
| c   | Nhìn nút trong ô phản hồi                        | Ghi **`Câu tiếp theo →`** (không phải `Xem kết quả`)                                         |
| d   | Bấm `Câu tiếp theo →`                            | Thẻ ghi `Câu 2 / 2` · nội dung **khác** câu 1 · ô phản hồi đã ẩn, chọn lại được              |
| e   | Trả lời câu 2 → nhìn nút                         | Ghi **`Xem kết quả`**                                                                        |
| f   | Bấm `Xem kết quả`                                | `Hoàn thành buổi ôn tập hôm nay! 🎉`                                                         |
| g   | Quay lại tab **Luyện Tập Chủ Đề** rồi vào lại Sổ | Badge về `0` · màn hình `2 câu đang chờ tới hạn ôn` (lịch giãn cách, không phải mất dữ liệu) |

> **`Đã thuộc làu: 0 câu` sau khi trả lời đúng là ĐÚNG thiết kế** — phải đúng **3 lần**
> liên tiếp mới lên bậc 4 (`stage 1 → 2 → 3 → 4`). Một lần đúng mới đưa câu lên bậc 2.
> Nhìn số **Đang ôn** bên cạnh để biết câu vẫn đang được theo dõi.

### TC-R.8 — Số thưởng hiển thị ở màn hình kết quả khớp config 🔴

> **Test này bắt lỗi gán cứng số Xu/XP trong JSX.** Màn hình kết quả của **cả 6 mini game**
> từng viết chết `120 / 70 / 30 / 10` Xu và `200 / 120 / 50 / 20` XP. Đổi giá trên Admin
> thì Xu **thực nhận** đúng nhưng dòng chữ vẫn ghi số cũ — trẻ thấy sai. Lint và build
> đều **không** bắt được.

**Chuẩn bị:** Admin → Kinh tế → sửa `game.tier_gold` thành **33 Xu / 44 XP** → Lưu.
Quay lại app chính và **tải lại trang** (xem ghi chú bên dưới).

> ℹ️ Dùng `33/44` chứ không dùng `20/50`: `20/50` **đã là giá hiện hành**, trùng với
> mặc định nên không chứng minh được gì. Số lạ giúp thấy rõ app có thật sự đọc config.

| #   | Bước                                      | Mong đợi                                                           |
| --- | ----------------------------------------- | ------------------------------------------------------------------ |
| a   | Trò chơi → **Đua Xe Toán Học** → hạng 1   | Màn hình kết quả ghi **`+33 Xu`** và **`+44 XP`**                  |
| b   | Xem số Xu trên header                     | Tăng **đúng 33**                                                   |
| c   | Lặp với **Bắn Bóng Số Bay** đạt ≥150 điểm | Cũng ghi `+33 Xu` / `+44 XP`                                       |
| d   | 🔴 **Cân Bằng Thần Kỳ** (thắng)           | Cũng ghi `+33 Xu` / `+44 XP` — đây là chỗ từng viết chết `+120 Xu` |
| e   | 🔴 **Câu Cá Thông Thái** (thắng)          | Cũng ghi `+33 Xu` / `+44 XP`                                       |

**Kiểm chứng sổ cái** — số ở cột `amount` phải bằng số hiển thị:

```sql
SELECT reason, amount, created_at FROM public.coin_transactions
WHERE reason LIKE 'game.tier%' ORDER BY created_at DESC LIMIT 5;
```

> ### ⚠️ Phải TẢI LẠI trang app sau khi đổi config
>
> App giữ bảng giá trong bộ nhớ và **chỉ làm mới khi trang được tải lại hoặc khi quay lại tab**
> (tối thiểu 5 giây giữa 2 lần). Hai app khác origin nên app của bé **không** nhận được
> thông báo tức thì từ Admin.
>
> Nếu thấy số cũ: chuyển sang tab khác rồi quay lại (đợi >5s), hoặc `Ctrl+R`. Kiểm tra cache:
>
> ```js
> JSON.parse(localStorage.getItem("toan-vui-reward-configs")).find(
>   (r) => r.key === "game.tier_gold",
> );
> ```
>
> **Dọn dẹp:** đặt lại `game.tier_gold` = **20 Xu / 50 XP** (giá hiện hành, không phải 120/200).

---

# PHẦN F — GIAI ĐOẠN 2a: Tra cứu & hồ sơ bé

### TC-2.1 — Migration 0004 chạy sạch 🔴

**Bước:** Chạy `0004_mistakes_sync.sql` trong SQL Editor → `Success. No rows returned`.

**Kiểm chứng cột `answer` đã là TEXT:**

```sql
SELECT data_type FROM information_schema.columns
WHERE table_name = 'child_mistakes' AND column_name = 'answer';
-- Mong đợi: text
```

**Kiểm chứng index:**

```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'child_mistakes';
-- Mong đợi: có child_mistakes_child_failed_idx
```

---

### TC-2.2 — Hồ sơ bé tải đủ các khối 🔴

**Chuẩn bị:** Đăng nhập Admin (`localhost:5174`) bằng tài khoản admin.

**Bước:** Vào **Người dùng** → bấm vào **tên một bé** (chữ màu xanh).

**Mong đợi:** Sang trang `/users/<id>` với đủ các khối:

| Khối                 | Nội dung                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Thẻ danh tính        | avatar · tên · Lớp · Cấp · ngày tạo · email phụ huynh · nhãn Hoạt động/Đã khoá · thanh XP |
| 4 ô số               | Xu hiện có · Cấp độ · Chuỗi hiện tại · Hoạt động lần cuối                                 |
| Tiến độ học tập      | số bài đã hoàn thành · số sao · ván mini game · chuỗi dài nhất                            |
| Sổ tay lỗi sai       | tổng câu sai · đang ôn · đã thuộc làu + bảng câu hỏi                                      |
| Lịch sử giao dịch Xu | 100 dòng gần nhất, có tổng cộng/trừ                                                       |
| Lịch sử XP           | các thẻ `+N XP`                                                                           |
| Thú cưng             | tên · cấp · đói · vui                                                                     |

**Không được:** màn hình trắng, hoặc Console có lỗi đỏ.

---

### TC-2.3 — Điều hướng tới hồ sơ

| #   | Thao tác                                     | Mong đợi                       |
| --- | -------------------------------------------- | ------------------------------ |
| a   | Bấm **← Danh sách người dùng**               | Về `/users`                    |
| b   | Gõ tay `localhost:5174/users/<id>` rồi Enter | Vào thẳng hồ sơ, **không 404** |
| c   | Bấm tên một bé khác trong danh sách          | Sang đúng hồ sơ bé đó          |

---

### TC-2.4 — Đồng bộ câu sai lên `child_mistakes` 🔴

> Đây là test quan trọng nhất của GĐ 2a. Trước đây sổ tay lỗi sai **chỉ nằm trong localStorage** của máy bé, Admin không thấy gì.

**Chuẩn bị:** App chính (`5173`), đăng nhập bằng **User A** (⚠️ không phải guest — guest không có `child_id` nên bị bỏ qua).

**Bước:**

1. Vào **Luyện tập** → cố tình trả lời sai **2 câu**
2. Chờ ~2 giây (ghi kiểu "bắn rồi quên")
3. Kiểm chứng:

```sql
SELECT cp.nickname, cm.question, cm.answer, cm.failed_count, cm.stage, cm.mastered
FROM public.child_mistakes cm
JOIN public.child_profiles cp ON cp.id = cm.child_id
ORDER BY cm.created_at DESC LIMIT 10;
```

**Mong đợi:** đúng 2 dòng mới · `failed_count = 1` · `stage = 1` · `mastered = false`.

4. 🔴 **Test đáp án so sánh** — làm sai một câu thuộc chủ đề **so sánh** (đáp án `>`, `<`, `=`).
   Dòng đó phải có `answer` là `>` hoặc `<` hoặc `=`.
   **Nếu chưa chạy `0004`, dòng này sẽ KHÔNG xuất hiện** và Console có
   `invalid input syntax for type integer`.
5. Làm sai **lại** câu vừa sai ở bước 1 → `failed_count` phải thành **2**, và **không sinh dòng thứ 3**
6. Mở **Sổ Tay Ôn Bài Sai**, trả lời đúng câu đó cho tới khi thuộc → `mastered` chuyển `true`

**Xem trong giao diện:** mở hồ sơ bé → khối **Sổ tay lỗi sai** phải hiện đúng các câu đó.

---

### TC-2.5 — Số liệu trên hồ sơ khớp app của bé

| Ô trên hồ sơ      | Lấy từ                             | Đối chiếu với app   |
| ----------------- | ---------------------------------- | ------------------- |
| Xu hiện có        | `child_profiles.coins`             | Số Xu ở header      |
| Cấp độ            | `child_profiles.level`             | Huy hiệu cấp        |
| Chuỗi hiện tại    | `child_progress.current_streak`    | Số ngày streak      |
| Bài đã hoàn thành | `child_progress.completed_lessons` | Số bài đã tick xong |

```sql
SELECT nickname, coins, level FROM public.child_profiles WHERE id = '<child-uuid>';
```

> ⚠️ Lệch tạm thời là **bình thường** — client đẩy lên cloud theo nhịp, không tức thời.

---

### TC-2.6 — Bé không tồn tại (đường dẫn sai)

| #   | Nhập vào                                                                | Mong đợi                                                                      |
| --- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| a   | `localhost:5174/users/00000000-0000-0000-0000-000000000000`             | **"Không tìm thấy hồ sơ bé này."** + link quay lại                            |
| b   | 🔴 `localhost:5174/users/000adasdc000` (chuỗi rác, **không phải UUID**) | **Cùng thông báo trên** — **KHÔNG** hiện `invalid input syntax for type uuid` |
| c   | `localhost:5174/users/abc`                                              | Cùng thông báo trên                                                           |

**Cả 3 trường hợp:** không màn hình trắng, không lỗi đỏ trong Console.

> 🐞 **Vì sao có mục (b):** bản test đầu chỉ ghi UUID hợp lệ nên **bỏ sót** trường hợp này.
> Chuỗi rác bị PostgREST trả **400** `invalid input syntax for type uuid`, và bản đầu của
> trang hiện thẳng lỗi đó ra hộp đỏ — không sập nhưng vô nghĩa với người dùng.
> Đã sửa: kiểm tra định dạng UUID **trước khi** gọi API.

---

### TC-2.7 — Không có biến chưa khai báo 🔴 _(tự động)_

**Chạy:** `npm run test:portal:static` → tìm dòng `S-12`. Không cần làm tay.

> Ghi vào đây vì nó ứng với **một lỗi thật đã xảy ra**, không phải giả định.

**Bối cảnh:** `isUuid is not defined` từng lọt ra trình duyệt. `vite build` **và** chẩn đoán
của VS Code **đều báo sạch** — vì đây là lỗi **lúc chạy**, không phải lỗi cú pháp.

**Cách bắt:** `oxlint` với rule `no-undef`, chạy trên **cả `client/src` và `admin/src`**.
Dùng binary có sẵn trong `client/node_modules` — **không phải cài thêm gì**.

> ⚠️ **`oxlint` mặc định KHÔNG bật `no-undef`** (đã đo: exit 0, không in gì). Nếu không có
> `"no-undef": "deny"` trong `.oxlintrc.json` của từng app thì test này **xanh mà chẳng
> bảo vệ được gì**. Vì vậy `S-12` kiểm tra luôn sự tồn tại của `client/.oxlintrc.json`
> và `admin/.oxlintrc.json`.

**Kiểm chứng bộ dò:** tạo một file chứa biến chưa khai báo trong `admin/src` → `S-12` phải
**FAIL**. Đã thử: bắt đúng `'notDefinedAnywhere' is not defined`.

---

# 📮 PHẦN G — GIAI ĐOẠN 2c: Hộp thư báo lỗi câu hỏi

> ⚠️ **Phạm vi:** màn hình Admin **không** sửa được nội dung bài học — nội dung còn nằm
> trong file tĩnh. Sửa nóng là việc của GĐ 3 (CMS). Ticket đã chụp sẵn `lesson_id`,
> `slide_index`, `question_text`, `correct_answer` nên đủ để tìm và sửa sau.

### TC-2.8 — Migration 0005 chạy sạch 🔴

**Bước:** Chạy `0005_support_tickets.sql` → `Success. No rows returned`.

```sql
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'support_tickets' ORDER BY ordinal_position;
-- Mong đợi có: child_id, lesson_id, slide_index, question_text,
-- correct_answer, report_type, message, status, admin_note, resolved_by
```

```sql
SELECT policyname, cmd, roles FROM pg_policies
WHERE tablename = 'support_tickets' ORDER BY policyname;
-- Mong đợi 5 policy: parent_select, parent_insert, anon_insert,
-- admin_read, admin_update
```

---

### TC-2.9 — Đã đăng nhập thì báo lỗi gắn với bé 🔴

**Chuẩn bị:** App chính (`5173`), đăng nhập **User A**.

**Bước:** Vào một bài học → tới slide có câu hỏi → bấm **🚩 Báo lỗi câu hỏi** →
chọn loại lỗi → ghi mô tả → **Gửi báo lỗi**.

**Mong đợi:** hiện **"Cảm ơn bạn!"**. Kiểm chứng:

```sql
SELECT child_id, lesson_id, slide_index, report_type, status, message
FROM public.support_tickets ORDER BY created_at DESC LIMIT 3;
```

- `child_id` = bé đang đăng nhập (không NULL)
- `lesson_id` đúng bài vừa học (VD `g1-c1-l1`), `slide_index` khớp slide
- `question_text` = đúng nội dung câu hỏi đã hiện
- `status = 'new'`

---

### TC-2.10 — Khách vẫn báo được, `child_id` = NULL 🔴

**Chuẩn bị:** Đăng xuất (chế độ Khách).

**Bước:** Làm lại TC-2.9.

**Mong đợi:** vẫn gửi được, và dòng mới có **`child_id IS NULL`**.

> Vì sao cho phép: khách chiếm phần lớn người dùng ban đầu. Xem ghi chú ở đầu
> `0005_support_tickets.sql`.

---

### TC-2.11 — Quyền ẩn danh bị khoá chặt 🔴

> Đây là test bảo mật quan trọng nhất của GĐ 2c. Nó đảm bảo việc mở cho khách ghi
> **không** tạo ra lỗ hổng kiểu `USING (true)` đã vá ở GĐ 0.

**Chuẩn bị:** Mở Console ở app chính **khi đang ở chế độ Khách** (xem A.4).

**Bước 1 — Đọc: phải bị chặn**

```js
const r = await window.__sb.from("support_tickets").select("*").limit(5);
console.log({ count: r.data?.length, error: r.error?.message });
```

**Mong đợi:** `count` = `0` (không đọc được gì).

**Bước 2 — Ghi khống `admin_note`: phải bị chặn**

```js
const r = await window.__sb.from("support_tickets").insert({
  question_text: "test",
  status: "new",
  admin_note: "toi tu dat ghi chu",
});
console.log(r.error?.message ?? "⚠️ GHI ĐƯỢC — LỖ HỔNG");
```

**Mong đợi:** có lỗi vi phạm RLS.

**Bước 3 — Tự đánh dấu đã xử lý: phải bị chặn**

```js
const r = await window.__sb.from("support_tickets").insert({
  question_text: "test",
  status: "resolved",
});
console.log(r.error?.message ?? "⚠️ GHI ĐƯỢC — LỖ HỔNG");
```

**Mong đợi:** có lỗi.

**Bước 4 — Sửa / xoá: phải bị chặn**

```js
const u = await window.__sb
  .from("support_tickets")
  .update({ status: "resolved" })
  .neq("id", "00000000-0000-0000-0000-000000000000");
const d = await window.__sb
  .from("support_tickets")
  .delete()
  .neq("id", "00000000-0000-0000-0000-000000000000");
console.log({ update: u.error?.message, delete: d.error?.message });
```

**Mong đợi:** cả hai đều có lỗi (hoặc 0 dòng bị ảnh hưởng).

---

### TC-2.12 — Màn hình Báo lỗi câu hỏi trên Admin 🔴

**Chuẩn bị:** `localhost:5174`, đăng nhập admin.

| #   | Thao tác                               | Mong đợi                                                                                           |
| --- | -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| a   | Bấm **📮 Báo lỗi câu hỏi** ở menu trái | Vào `/reports`                                                                                     |
| b   | Tab **Mới**                            | Hiện ticket vừa gửi; số trên tab khớp                                                              |
| c   | Xem một ticket                         | Có: loại lỗi · thời gian · tên bé (hoặc _Khách_) · câu hỏi · đáp án · vị trí slide · lời người báo |
| d   | Ticket của khách                       | Ghi rõ **"Khách (chưa đăng nhập)"**                                                                |
| e   | Bấm tên bé trong ticket                | Sang hồ sơ bé (nếu không phải khách)                                                               |
| f   | Nhập ghi chú → bấm **Đang xem**        | Thông báo xanh; ticket rời tab Mới, sang tab Đang xem                                              |
| g   | Gõ tay `localhost:5174/reports`        | Vào thẳng trang, không 404                                                                         |

---

### TC-2.13 — Đổi trạng thái có ghi audit log 🔴

**Bước:** Sau khi làm TC-2.12 (bước f):

```sql
SELECT created_at, action, entity, entity_id, before, after, reason
FROM public.admin_audit_log
WHERE action = 'support_ticket.update'
ORDER BY created_at DESC LIMIT 5;
```

**Mong đợi:** có dòng với `entity = 'support_tickets'`, `before.status` và
`after.status` khác nhau, `after.admin_note` là ghi chú vừa nhập.

---

# 📅 PHẦN E — Khung cho các giai đoạn sau

_(Chưa làm — điền chi tiết khi bắt đầu từng giai đoạn)_

### Giai đoạn 2 — Hỗ trợ & phân tích

**2a — Công cụ hỗ trợ** → ✅ **đã code xong, test ở [PHẦN F](#-phần-f--giai-đoạn-2a-tra-cứu--hồ-sơ-bé)**

- [x] Tra cứu học sinh theo nickname / email phụ huynh — `TC-2.3`
- [x] Trang hồ sơ 1 bé: tiến độ, chuỗi ngày, danh sách lỗi sai, lịch sử giao dịch Xu/XP — `TC-2.1` → `TC-2.6`

**2b — Tầng dữ liệu phân tích**

- [ ] `question_attempts` ghi được khi trả lời câu hỏi
- [ ] 🔴 `ms` không vượt trần (câu bỏ dở giữa chừng phải ghi `NULL`, không ghi số rác)
- [ ] 🔴 Trả lời được câu hỏi A: **câu hỏi nào có tỉ lệ sai cao bất thường?**
- [ ] Trả lời được câu hỏi B: phân biệt **đoán bừa** (nhanh + sai) với **không hiểu** (chậm + sai)
- [ ] Trả lời được câu hỏi C: **chủ đề nào bé yếu thật sự?**
- [ ] Guest vẫn ghi được attempt với `child_id = NULL`
- [ ] `app_events` — 📌 **hoãn**, không test giai đoạn này

**2c — Inbox phản hồi**

- [x] Hộp thư báo lỗi câu hỏi hoạt động đầu-đến-cuối — `TC-2.8` → `TC-2.13`

> ✂️ **Đã cắt khỏi GĐ 2 (2026-09-20):** khôi phục streak thủ công · cấp/thu Xu thủ công ·
> cấp Streak Freeze · reset PIN phụ huynh từ xa. Lý do: xem `docs/admin_portal_plan.md`
> mục _Giai đoạn 2_ và _Nhóm B_.

### Giai đoạn 3 — CMS

- [ ] Migration 795 KB lên `content_*` — đối chiếu số lượng bài khớp
- [ ] 🔴 `anon` **không** đọc được bài `status = 'draft'`
- [ ] 🔴 Tắt `content_source = 'static'` → app chạy lại bằng data cứng
- [ ] Admin sửa bài → app nhận nội dung mới không cần build
- [ ] Publish bài lỗi → **revert** được về phiên bản trước
- [ ] Guest mode vẫn học được
- [ ] Offline lần đầu (chưa từng mở app) vẫn dùng được file tĩnh
- [ ] Biết được 1 bé cụ thể đang dùng `content_version` nào

### Giai đoạn 4 — Nâng cao

- [ ] Chỉnh độ khó bot đấu trường từ Admin
- [ ] Health dashboard: tỉ lệ lỗi sync, quota Supabase
- [ ] Banner thông báo hiện trên app
- [ ] Sức khỏe kinh tế: tổng Xu lưu hành, Xu kiếm/ngày, Xu tiêu/ngày

---

# 📊 BẢNG THEO DÕI KẾT QUẢ

| ID      | Tên test                                    | Kết quả | Ngày       | Ghi chú                   |
| ------- | ------------------------------------------- | ------- | ---------- | ------------------------- |
| TC-0.1  | Migration chạy sạch                         |         |            |                           |
| TC-0.2  | Vá lỗ hổng leaderboard                      |         |            |                           |
| TC-0.3  | User thường không đọc được hồ sơ người khác |         |            |                           |
| TC-0.4  | `is_admin()` trả đúng                       |         |            |                           |
| TC-0.5  | `admin_audit_log` bất biến                  |         |            |                           |
| TC-0.6  | Admin Portal: đăng nhập đúng người          |         |            |                           |
| TC-0.7  | Thông báo lỗi phân biệt đúng                |         |            |                           |
| TC-0.8  | Bundle tách biệt                            |         |            |                           |
| TC-1.1  | Seed đúng giá trị gốc                       |         |            |                           |
| TC-1.2  | Phát thưởng khớp cấu hình                   |         |            |                           |
| TC-1.3  | 🔴 Đổi config → app nhận ngay               |         |            |                           |
| TC-1.4  | Hệ số nhân X2                               |         |            |                           |
| TC-1.5  | Công thức lên cấp                           |         |            |                           |
| TC-1.6  | Tắt một mục phần thưởng                     |         |            |                           |
| TC-1.7  | Sổ cái ghi đúng và đầy đủ                   |         |            |                           |
| TC-1.8  | Mua hàng ghi sổ âm                          |         |            |                           |
| TC-1.9  | Audit log ghi thay đổi config               |         |            |                           |
| TC-1.10 | Validate form chặn dữ liệu sai              |         |            |                           |
| TC-1.11 | Offline dùng giá trị mặc định               |         |            |                           |
| TC-1.12 | Guest mode không nhận thưởng                |         |            |                           |
| TC-1.13 | Danh sách người dùng tải đúng               |         |            |                           |
| TC-1.14 | Tìm kiếm theo tên bé / email phụ huynh      |         |            |                           |
| TC-1.15 | Phân trang                                  |         |            |                           |
| TC-1.16 | Khoá / Mở khoá tài khoản                    |         |            |                           |
| TC-1.17 | Cảnh báo Xu bất thường                      |         |            |                           |
| TC-R.1  | Guest mode vẫn học được                     |         |            |                           |
| TC-R.2  | Tiến độ guest chuyển lên cloud              |         |            |                           |
| TC-R.3  | Đồng bộ localStorage ↔ Supabase             |         |            |                           |
| TC-R.4  | Bảng xếp hạng vẫn chạy                      |         |            |                           |
| TC-R.5  | 6 mini game vẫn chơi được                   |         |            |                           |
| TC-R.6  | Thú cưng vẫn nuôi được                      |         |            |                           |
| TC-R.7  | Sổ Tay Ôn Bài Sai: phiên nhiều câu          |         |            |                           |
| TC-R.8  | Số thưởng hiển thị khớp config              |         |            |                           |
| TC-2.1  | Migration 0004 chạy sạch                    | PASS    | 2026-09-20 |                           |
| TC-2.2  | Hồ sơ bé tải đủ các khối                    | PASS    | 2026-09-20 |                           |
| TC-2.3  | Điều hướng tới hồ sơ                        | PASS    | 2026-09-20 |                           |
| TC-2.4  | Đồng bộ câu sai lên `child_mistakes`        | PASS    | 2026-09-20 |                           |
| TC-2.5  | Số liệu hồ sơ khớp app của bé               | PASS    | 2026-09-20 |                           |
| TC-2.6  | Bé không tồn tại → thông báo gọn            | PASS    | 2026-09-20 |                           |
| TC-2.7  | Không có biến chưa khai báo _(tự động)_     | PASS    | 2026-09-20 |                           |
| TC-2.8  | Migration 0005 chạy sạch                    | PASS    | 2026-09-20 | 5 policy đủ, đúng vai trò |
| TC-2.9  | Đã đăng nhập thì báo lỗi gắn với bé         | PASS    | 2026-09-20 |                           |
| TC-2.10 | Khách vẫn báo được, `child_id` = NULL       | PASS    | 2026-09-20 |                           |
| TC-2.11 | Quyền ẩn danh bị khoá chặt                  | PASS    | 2026-09-20 | 6/6 phép thử đều bị chặn  |
| TC-2.12 | Màn hình Báo lỗi câu hỏi trên Admin         | PASS    | 2026-09-20 |                           |
| TC-2.13 | Đổi trạng thái có ghi audit log             | PASS    | 2026-09-20 |                           |

---

## 🔍 Xử lý khi test FAIL

| Triệu chứng                                                     | Nguyên nhân thường gặp                                                   | Kiểm tra                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Thưởng ra số cũ, không theo config                              | DB chưa có bảng, hoặc cache cũ                                           | `SELECT * FROM reward_configs LIMIT 1;` rồi xoá `toan-vui-reward-configs` trong localStorage |
| Không có dòng nào trong `coin_transactions`                     | Đang ở guest mode                                                        | Đăng nhập rồi thử lại                                                                        |
| `ReferenceError: addCoins is not defined`                       | Sót chỗ chưa refactor                                                    | Tìm `addCoins(` trong `client/src`                                                           |
| Ghi sổ lỗi nhưng thưởng vẫn đúng                                | Bình thường — sổ cái là "bắn rồi quên"                                   | Xem Console, kiểm tra RLS bảng `coin_transactions`                                           |
| Vào admin bị đá về trang đăng nhập                              | Chưa cấp `role = 'admin'`                                                | `SELECT role FROM profiles WHERE email = '...';`                                             |
| Đăng nhập admin xong về trang chủ                               | Thiếu Redirect URL                                                       | Supabase → Authentication → URL Configuration                                                |
| Ôn 2 câu, trả lời 1 câu thì nhảy luôn câu 2 / phiên tự kết thúc | `dueMistakes` bị gọi lại mỗi render, câu vừa trả lời rụng khỏi danh sách | Phải dùng snapshot `reviewQueue` chụp lúc mở tab — xem `TC-R.7`                              |
| Vừa trả lời sai mà Sổ đã rỗng                                   | Đúng thiết kế — câu mới hẹn ôn **ngày mai**                              | Chạy mục **A.6** nếu cần test ngay                                                           |
| `Đã thuộc làu: 0 câu` dù vừa trả lời đúng                       | Đúng thiết kế — cần **3 lần** đúng liên tiếp mới lên bậc 4               | `JSON.parse(localStorage.getItem("toan-vui-progress")).state.mistakesQueue`                  |
| Mini game vẫn báo thưởng cũ sau khi đổi trên Admin              | App không nhận được sự kiện từ tab khác (khác origin)                    | Tải lại trang app; kiểm tra cache `toan-vui-reward-configs` — xem `TC-R.8`                   |
| `X is not defined` (`ReferenceError` lúc chạy)                  | Biến chưa khai báo — build **không** bắt được                            | `npm run test:portal:static` → dòng `S-12` — xem `TC-2.7`                                    |
