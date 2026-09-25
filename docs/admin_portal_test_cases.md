# 🧪 Test Cases — Admin Portal & Hệ thống kinh tế

> **Cập nhật:** 2026-09-21 · **Trạng thái:** GĐ 0 ✅ · GĐ 1 ✅ · GĐ 2a ✅ đã test PASS · GĐ 2c ✅ đã test PASS · GĐ 2b ✅ đã test PASS (2b-1 + 2b-2) · 📱 Admin Portal responsive ✅ · GĐ 3a ✅ đã test PASS · GĐ 3b ✅ đã test PASS (cả 10 mục) · 🔌 Truy vấn có hẹn giờ ✅ đã test PASS · 📐 Bố cục mọi menu ✅ đã test PASS · 🛠️ GĐ 3c ✅ đã chạy trên DB thật · 🔄 GĐ 3d ✅ **đã bật công tắc** (app đọc từ DB) · 📖 Trang Tham khảo ✅ · ✅ **GĐ 3: 4 lát đã xong và đủ 6/6 DoD** (`0013`) · 🆕 tạo được bài học mới · 🗑️ **xoá bài thẳng trong DB thì app tự lành** (`0014` ✅ đã đo cả hai chiều) · 🗑️ **nút xoá một bài học có chốt gõ chữ** (`0015` — không có đường xoá chương) · 📚 **Bổ sung 99 bài cho 13 chương mỏng của cả 5 lớp** (toàn hệ thống: 362 → **461 bài**, 1505 → **1966 slide**; Lớp 1–3 đánh số theo từng chương, Lớp 4–5 đã chuẩn hoá theo cùng quy ước) — dán lại seed rồi chạy `100-tang-phien-ban-sau-bo-sung.sql` để máy các bé nhận bài mới · 🐞 **`0017` vá lỗi thật:** trigger xoá bài gọi hàm có chốt admin ⇒ xoá bài _published_ bằng SQL thô bị `42501` và **huỷ cả câu DELETE** · 🚫 **Chế độ Khách KHÔNG lưu gì xuống máy** (cổng `S-31` + đã đo tay 2026-09-21) · 🐞 **vá tạo TRÙNG hồ sơ bé** (đo được: 2 tài khoản có 2 bé — đã dọn 2 dòng rỗng, đo lại 0/0/1 ✅) · 🐞 **thú cưng nay đồng bộ lên cloud** (trước đó là code chết — ✅ đã test và ĐO được số 2026-09-21: 2 lần ghi lên `child_pets` cách nhau **3,142 giây**)
> **104 test case** · Dùng kèm với `docs/admin_portal_plan.md`.
> 🔢 **Quy mô nội dung hiện tại:** 5 lớp · 51 chương · **459 bài** · **2671 slide** (sau khi dựng lại chương trình Lớp 1–3 theo SGK 2026-09-21, tách slide nhồi hình + thêm hình có TÊN ĐIỂM 2026-09-22, rồi viết lại **Chủ đề 4 Lớp 1** theo SGK tr.92–101 ngày 2026-09-24: 39 → 68 slide, rồi viết lại **Chủ đề 1 Lớp 1** theo SGK tr.6–45 ngày 2026-09-24: 67 → 128 slide, rồi **tách slide dạy hai vấn đề** thành hai slide ngày 2026-09-24: 2545 → 2547, rồi **tách slide chứa nhiều hình** để mỗi slide còn đúng một hình ngày 2026-09-24: 2547 → 2656, rồi **rà soát Chủ đề 2 Lớp 1** theo SGK tr.46–55 ngày 2026-09-25: 2656 → 2659, rồi **bổ sung dạng bài SGK cho Chủ đề 3 Lớp 1** ngày 2026-09-25: 2659 → 2671).
>
> 📌 **Quyết định tự đưa ra ở lát 3c/3d** (kèm lý do + cách đổi): [`docs/phase_3c_3d_decisions.md`](phase_3c_3d_decisions.md)

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

**Tool tự kiểm tra 50 mục** (mã `S-x` và `D-x` trong output khớp với `TC-x.y` ở dưới):

| Nhóm  | Nội dung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Số mục |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **S** | Quét source: không còn thưởng gán cứng, không còn dependency array mồ côi, mọi khoá `grantReward` đều tồn tại, seed SQL khớp code **cả khoá lẫn giá trị**, 2 bundle tách biệt, không nhúng `service_role`, không gán cứng số Xu/XP trên UI, **không có biến chưa khai báo**, **chỗ ghi câu sai nào cũng ghi kèm lượt trả lời**, **mọi game sinh câu đều ghi lượt trả lời**, **mọi menu dùng hết bề rộng, sidebar đủ cao**, **các bảng cạnh nhau khớp cột**, **trình sửa bài không ghi thẳng bảng**, **cây dựng từ DB khớp cây tĩnh**, **nội dung mới hiện khi bé quay lại app mà không cắt ngang bài đang học**, **trang Tham khảo chỉ đọc và không nói sai về app**, **tạo bài mới: khoá cho khách + luôn ở trạng thái nháp**, **app của bé thật sự BÁO phiên bản nội dung lên DB**, **xoá bài thẳng trong DB thì app không vỡ**, **nút xoá bài có chốt gõ chữ và không có đường xoá chương**, **chế độ Khách không ghi gì xuống máy (kèm ca "chưa cấu hình Supabase thì VẪN phải ghi")** | 31     |
| **D** | Gọi REST bằng anon key: seed đủ và đúng giá trị, RLS chặn ghi leaderboard, chặn đọc `profiles`/`child_profiles`/sổ cái, `is_admin()` trả false, audit log bất biến, `reward_configs` đọc công khai được, **chặn đọc số liệu phân tích**, **bảng nháp và 6 hàm CMS chỉ admin gọi được**, **3 cột báo cáo nội dung của bé đã có**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 19     |

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

| #   | File                                             | Nội dung                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `supabase/migrations/0001_admin_foundation.sql`  | role, `is_admin()`, vá RLS leaderboard, audit log, app_config                                                                                                                                                                                                                                                                                                                             |
| 2   | `supabase/migrations/0002_reward_economy.sql`    | reward_configs (giá gốc), sổ cái, hệ số nhân, level curve                                                                                                                                                                                                                                                                                                                                 |
| 3   | `supabase/migrations/0003_tune_rewards.sql`      | 🔧 Chốt giá thưởng sau test — hạ thang luyện tập & mini game                                                                                                                                                                                                                                                                                                                              |
| 4   | `supabase/migrations/0004_mistakes_sync.sql`     | 🔧 `child_mistakes.answer` INT → TEXT, index cho hồ sơ bé                                                                                                                                                                                                                                                                                                                                 |
| 5   | `supabase/migrations/0005_support_tickets.sql`   | 📮 Bảng `support_tickets` + RLS cho phụ huynh / khách / admin                                                                                                                                                                                                                                                                                                                             |
| 6   | `supabase/migrations/0006_question_attempts.sql` | 📊 Bảng `question_attempts` + hàm xoá dữ liệu cũ (khách KHÔNG ghi)                                                                                                                                                                                                                                                                                                                        |
| 7   | `supabase/migrations/0007_analytics_queries.sql` | 📈 Hàm `get_question_analytics()` — gộp số liệu cho `/analytics`                                                                                                                                                                                                                                                                                                                          |
| 8   | `0008_content_schema.sql`                        | 🗂️ 4 bảng `content_*` + RLS (bài nháp KHÔNG lộ cho khách) — lát 3a                                                                                                                                                                                                                                                                                                                        |
| 9   | `0009_content_drafts.sql`                        | ✏️ Bảng bản nháp + 4 hàm `save_lesson_draft` / `publish_lesson` / `rollback_lesson` / `set_lesson_status` — lát 3c                                                                                                                                                                                                                                                                        |
| 10  | `0010_content_age_range.sql`                     | 🔧 Bù cột `age_range` cho 5 lớp (thiếu cột này ⇒ phụ huynh thấy `Lớp 1 ()`)                                                                                                                                                                                                                                                                                                               |
| 11  | `0011_bat_doc_noi_dung_tu_db.sql`                | 🔄 Gạt công tắc `content_source = "remote"` — app của bé đọc từ DB — lát 3d                                                                                                                                                                                                                                                                                                               |
| 12  | `0012_chan_quyen_ham_noi_bo.sql`                 | 🔒 Chặn khách gọi 2 hàm nội bộ của CMS (Supabase cấp `EXECUTE` thẳng cho `anon` nên phải `REVOKE … FROM anon` tường minh)                                                                                                                                                                                                                                                                 |
| 13  | `0013_content_report_and_create_lesson.sql`      | 🆕 3 cột báo cáo nội dung cho bé (DoD #6) + hàm `create_lesson()` để tạo bài mới                                                                                                                                                                                                                                                                                                          |
| 14  | `0014_xoa_bai_hoc_trong_db.sql`                  | 🗑️ Trigger `AFTER DELETE`: xoá bài bằng SQL thì `content_version` **tự tăng** (máy bé biết mà tải lại) + ghi vết `lesson.delete`                                                                                                                                                                                                                                                          |
| 15  | `0015_xoa_bai_hoc_tu_giao_dien.sql`              | 🗑️ Hàm `delete_lesson()` cho nút xoá trên giao diện (chỉ admin, **không** xoá chương)                                                                                                                                                                                                                                                                                                     |
| 16  | `0016_vet_xoa_noi_dung_nguon.sql`                | 🏷️ Vết xoá ghi **đúng nguồn** (`auth.uid()` NULL = xoá bằng SQL · khác NULL = xoá từ giao diện) — ✅ đã chạy + đo                                                                                                                                                                                                                                                                         |
| 17  | `0017_tang_phien_ban_khong_can_jwt.sql`          | 🐞 **Vá lỗi THẬT:** trigger xoá bài gọi hàm `bump_content_version()` mà `0012` đã bọc chốt `is_admin()` ⇒ xoá một bài **published** bằng SQL thô (SQL Editor không có JWT) bị `42501` và **huỷ luôn cả câu `DELETE`**. Tách phần tăng số ra hàm nội bộ `_tang_phien_ban_noi_dung()` (`SECURITY DEFINER`, không cấp cho role nào); hàm công khai vẫn giữ chốt admin — ⏳ chờ bạn chạy + đo |

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

### A.7. Lấy UUID của bé (cho các câu SQL có `<child-uuid>`)

Nhiều câu SQL trong tài liệu này có đoạn `<child-uuid>`. **Đó là CHỖ TRỐNG, không phải giá trị
thật.** Dán nguyên vào SQL Editor sẽ báo:

```
ERROR: 22P02: invalid input syntax for type uuid: "<child-uuid>"
```

Có **hai cách** lấy UUID thật:

**Cách 1 — từ Admin Portal (nhanh nhất).** Vào `localhost:5174` → **Người dùng** → bấm tên bé.
Nhìn thanh địa chỉ: `localhost:5174/users/`**`a1b2c3d4-…`** ← phần sau `/users/` chính là UUID.

**Cách 2 — bằng SQL:**

```sql
SELECT id, nickname, created_at
FROM public.child_profiles
ORDER BY created_at DESC;
```

Rồi thay `<child-uuid>` bằng giá trị thật, **giữ nguyên dấu nháy đơn**:

```sql
WHERE child_id = 'a1b2c3d4-1234-5678-9abc-def012345678'
```

> 💡 Nếu chỉ có **1 bé** thì có thể **bỏ hẳn** điều kiện `child_id` — kết quả vẫn đúng.
> Các mục có chỗ trống này: `A.5`, `TC-2.5`, `TC-2.23`, `TC-R.2`, `TC-R.3`.

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
- **Và không ghi gì xuống máy nữa** — 🆕 luật từ 2026-09-21: chế độ Khách **không lưu lại bất cứ điều gì**.
  Kiểm ở **`TC-R.9`** (có cổng tự động `S-31`).

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

### TC-R.2 — Nhập dữ liệu máy lên tài khoản: **ĐỔI LUẬT**, và chống tạo TRÙNG hồ sơ bé 🔴

#### a) Tiến độ guest KHÔNG còn được chuyển lên cloud (mục này đã lỗi thời)

> 🔄 **Đổi luật ngày 2026-09-21 — người dùng chốt: chế độ Khách không lưu lại bất cứ điều gì.**
> Trước đây khách vẫn ghi tiến độ xuống máy rồi khi đăng nhập thì nhập dữ liệu đó lên tài khoản.
> Nay khách **không ghi gì** (xem `TC-R.9` + cổng `S-31`) nên **không còn gì để chuyển lên**.
> Mục này giữ lại làm dấu vết — **không** mong đợi 2 bài của khách xuất hiện trên cloud nữa.
>
> **Vì sao đổi:** (1) dữ liệu khách nằm trên máy rất dễ lẫn giữa các tài khoản dùng chung thiết bị;
> (2) các khu vực chính đã khoá cho khách từ trước (`GuestFeatureLock`) nên "học được nhưng không lưu"
> nhất quán hơn "học được, lưu nửa vời"; (3) khuyến khích đăng nhập rõ ràng hơn.

**Còn lại gì để kiểm?** Chỉ ca **dữ liệu cũ còn sót trên máy** (ghi từ bản trước, hoặc của người dùng trước):

```sql
-- Bé tạo sau khi đăng nhập phải KHÔNG hút dữ liệu khách sang
SELECT cp.nickname, cp.created_at, pr.completed_lessons
  FROM public.child_profiles cp
  JOIN public.child_progress pr ON pr.child_id = cp.id
 ORDER BY cp.created_at DESC LIMIT 5;
```

#### b) 🔴 Chống tạo TRÙNG hồ sơ bé — **lỗi thật đã xảy ra, đã vá**

> 🐞 **Đo trên DB thật ngày 2026-09-21: 2 tài khoản có 2 hồ sơ bé.**
> Code chỉ dùng bé **CŨ NHẤT** (`order created_at asc` → `[0]`), nên bé thứ hai thành mồ côi — và ở một
> tài khoản thì **dữ liệu thật lại nằm ở bé MỚI**, tức app đang đọc đúng bé **rỗng**.
>
> | Cặp trùng   | Lệch thời gian | Cơ chế                                                                                                                                                |
> | ----------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
> | tài khoản A | **1,4 giây**   | hai lần `autoMigrateGuestDataToCloud` chạy **chồng nhau** — cả hai đều đọc ra "chưa có hồ sơ bé" rồi mỗi lần chèn một dòng                            |
> | tài khoản B | **50 phút**    | `.select("child_profiles")` **lỗi** (mạng thoáng qua) nhưng bản cũ chỉ ghi log rồi **ĐI TIẾP** → `existingChildren` là `null` → rơi vào nhánh TẠO MỚI |
>
> Đã vá **cả hai** trong `client/src/services/syncService.js`: giữ promise đang bay (`migrateInFlight`)
> và `if (fetchErr) return null`.
> 💡 **Bài học:** "đọc lỗi" **KHÁC** "đọc ra rỗng" — mọi nhánh ghi dữ liệu phải phân biệt hai ca này,
> nếu không thì mọi trục trặc mạng đều biến thành dữ liệu trùng.

**Bước (cần tài khoản Google **mới**, không tự động hoá được):** đăng nhập lần đầu bằng tài khoản mới, rồi:

```sql
SELECT parent_id, COUNT(*) AS so_be
  FROM public.child_profiles GROUP BY parent_id HAVING COUNT(*) > 1;
-- Mong đợi: 0 dòng
```

> ✅ **Đã dọn dữ liệu cũ và đo lại (2026-09-21)** — bạn chạy, đúng cả 3 kỳ vọng:
> **0 phụ huynh có 2 bé** · 2 id rác **0 dòng** · tài khoản bị ảnh hưởng nay còn **đúng 1 bé**
> và là bé **có dữ liệu** (`so_bai_xong = 1`), tức app đã chuyển sang đọc đúng bé.

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

> 🐞 **Và thú cưng phải được LƯU lên cloud (vá 2026-09-21).** `syncService.saveCurrentPetToCloud()`
> có sẵn từ đầu nhưng **không chỗ nào gọi** ⇒ bé cho ăn xong, đăng nhập ở máy khác là thú cưng cũ.
> Nay có nhịp riêng `schedulePetSync` + `usePetStore.subscribe(...)` (không đi nhờ `scheduleCloudSync`,
> vì thú cưng nằm ở bảng `child_pets` — bảng đó nhịp kia không ghi).
>
> **Cách đo:** app chính (`5173`), **đã đăng nhập** → cho ăn → chờ ~2 giây → DevTools → Network,
> lọc `child_pets` phải thấy **1 request**; hoặc — cách **chắc hơn** — chụp nguyên dòng **hai lần**:
> một lần **TRƯỚC** khi cho ăn, một lần **SAU**:
>
> ```sql
> SELECT has_pet, pet_type, pet_name, hunger, happiness, level, exp,
>        inventory, stage, updated_at
>   FROM public.child_pets WHERE child_id = '<child-uuid>';
> ```
>
> ⚠️ **Chỉ thấy "DB có dòng" thì CHƯA kết luận được gì.** Dòng đó **có thể đã tồn tại từ lúc đăng ký**:
> trigger `handle_new_user()` trong `schema.sql:247` chèn sẵn `INSERT INTO public.child_pets (child_id)`
> bằng **giá trị mặc định** (`has_pet = FALSE` · `pet_name = 'Bạn Cún Nhỏ'` · `pet_type = 'corgi'` ·
> `hunger = 80` · `exp = 0` · `inventory = {apple: 3, croissant: 2, candy: 2}`). Nên phép đo phải đọc
> **giá trị**, và phải so **hai lần chụp** — không đọc sự tồn tại của dòng.

> ✅ **ĐÃ TEST THÀNH CÔNG + ĐÃ ĐO ĐƯỢC SỐ (2026-09-21) — PASS.** Bạn chụp **cùng một dòng** ở hai
> thời điểm. (Đây là **MỘT dòng**, không phải hai — `child_id` là khoá chính nên mỗi bé chỉ có đúng
> 1 dòng; hai lần chụp là hai ảnh của **cùng một dòng**, và **hiệu số giữa chúng mới là thứ đáng đọc**.)
>
> | Trường            | Chụp TRƯỚC       | Chụp SAU                  | Suy ra từ đâu trong mã                                                             |
> | ----------------- | ---------------- | ------------------------- | ---------------------------------------------------------------------------------- |
> | `updated_at`      | `…18:33:47.749Z` | `…18:33:50.891Z`          | **HAI lần ghi, cách nhau 3,142 giây** — chỉ `saveCurrentPetToCloud` ghi trường này |
> | `exp`             | `0`              | **`15`**                  | `FOOD_TYPES` táo: `expGain: 15` (`usePetStore.js:33`)                              |
> | `hunger`          | `90`             | **`100`**                 | `hungerGain: 20` ⇒ `min(100, 90+20)` (`:139`)                                      |
> | `inventory`       | `{apple: 3, …}`  | **`{apple: 2, …}`**       | `feedPet` trừ đúng 1 món (`:135`)                                                  |
> | `happiness`       | `100`            | `100`                     | `min(100, 100+15)` — **đã ở trần 100 nên không đổi**                               |
> | `has_pet`         | `true`           | `true`                    | `adoptPet` đặt `has_pet: true` (`:77`)                                             |
> | `pet_name`        | `"MiMi"`         | `"MiMi"`                  | tên bạn đặt lúc nhận nuôi — **không phải** mặc định `'Bạn Cún Nhỏ'`                |
> | `pet_type`        | `"cat"`          | `"cat"`                   | loại đã chọn — **không phải** mặc định `'corgi'`                                   |
> | `level` · `stage` | `1` · `"baby"`   | `1` · `"baby"`            | `adoptPet` đặt đúng hai giá trị này (`:84-85`)                                     |
> | `child_id`        | (không đổi)      | `c424c955-…-a45778fa09be` | —                                                                                  |
>
> 🔴 **Vì sao bảng này là BẰNG CHỨNG, chứ không chỉ là "DB có dòng":**
>
> 1. **Không thể là dòng mặc định.** Dòng có `has_pet = true` · `pet_name = "MiMi"` · `pet_type = "cat"` ·
>    `hunger = 90` — cả bốn đều **khác** `DEFAULT` ghi trong `schema.sql:79`. Dòng do trigger tạo lúc
>    đăng ký thì `has_pet = FALSE`, tên `'Bạn Cún Nhỏ'`, loại `'corgi'`, `hunger = 80`.
> 2. **Ảnh TRƯỚC khớp chính xác `adoptPet`** (`usePetStore.js:82-85`: `hunger: 90` · `happiness: 100` ·
>    `exp: 0` · `level: 1` · `stage: "baby"`). Đáng chú ý: `hunger = 90` **không phải** giá trị khởi tạo
>    của store (`80`) — đó là giá trị app đặt **khi nhận nuôi** ⇒ đường "store đổi ⇒ ghi lên cloud" đã
>    chạy ngay từ thao tác **nhận nuôi**, không phải chỉ từ lúc cho ăn.
> 3. **Hiệu số giữa hai ảnh khớp chính xác `feedPet("apple")`**: `exp +15` · `hunger 90 → 100` ·
>    `inventory.apple 3 → 2` · `happiness` giữ 100. Cả bốn con số đều suy ra được từ mã (`FOOD_TYPES` +
>    `feedPet`, `usePetStore.js:101-143`), và **không con số nào trùng giá trị mặc định**.
> 4. **`updated_at` là dấu hiệu quyết định:** chỉ `saveCurrentPetToCloud()` ghi trường này; đường nhập
>    dữ liệu máy khách lúc đăng nhập (`syncService.js:~252`) **không** ghi. Hai mốc cách nhau
>    **3,142 giây** ⇒ có **HAI** lần gọi ghi thật, đúng nhịp `schedulePetSync` (debounce **500 ms**,
>    `syncService.js:53-64`) chạy sau mỗi lần store đổi.
> 5. **Về giờ:** `2026-09-20T18:33Z` = **01:33 ngày 2026-09-21 giờ VN** (UTC+7) — khớp đúng hôm test.
>
> ⚠️ **Hai điều vẫn phải nói rõ, để lần sau đọc không bị lệch:**
> **(a)** **Không cổng tự động nào canh đường này** — không `S-`/`D-` nào chạm tới việc gọi
> `saveCurrentPetToCloud`. Nên nếu sau này có ca "cho ăn xong, mở máy khác thấy thú cưng cũ" thì đo lại
> theo đúng mục **Cách đo** ở trên (chụp **2 lần**) trước khi nghi chỗ khác.
> **(b)** `hunger` và `happiness` **một mình không phân biệt được gì**: cả hai đã chạm **trần 100**, nên
> chúng giống nhau dù cho ăn 1 lần hay 5 lần. Thứ phân biệt được là **`updated_at` · `exp` · `inventory`**.

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

### TC-R.9 — Chế độ Khách **KHÔNG lưu gì xuống máy** 🔴 _(tự động: cổng `S-31`)_

> 🔄 **Luật chốt ngày 2026-09-21.** Khách vẫn học / luyện tập được, nhưng **không ghi gì**: không Xu,
> không XP, không tiến độ, không thú cưng. Màn hình kết quả bài học ghi rõ điều đó và mời đăng nhập.

**Luật** nằm ở `client/src/store/sessionMode.js`; phần **quyết định** được tách ra file **THUẦN**
`client/src/store/persistRule.js` để cổng có thể nạp bằng Node và **thử hành vi thật** — cùng bài học với
`admin/src/lib/henGio.js` (cổng `S-19`). Một cổng chỉ grep chuỗi sẽ xanh kể cả khi hàm trả `undefined`.

```powershell
npm run test:portal:static        # → dòng S-31
```

**Mong đợi:** `khách: KHÔNG ghi ✓ · đã đăng nhập: ghi ✓ · chưa cấu hình Supabase: VẪN ghi ✓ · cả 4 store đều bọc ✓ · khoá riêng khớp tên store, không đụng cache ✓`

**Đo thật trong trình duyệt** (Console ở `5173`) — **một** đoạn làm cả hai việc: in ra trạng thái thật của tab, rồi thử luật (chỉ ghi vào một khoá nháp):

```js
(async () => {
  const auth = await import("/src/store/useAuthStore.js");
  const m = await import("/src/store/sessionMode.js");

  // 1. Trạng thái THẬT của tab này — phải biết trước khi kết luận
  const rieng = [
    "toan-vui-user",
    "toan-vui-progress",
    "toan-vui-pet",
    "math_edu_league_storage",
  ];
  const con = rieng.filter((k) => localStorage.getItem(k) !== null);
  const laKhach = auth.default.getState().isGuest;
  const dangKhoiTao = auth.default.getState().loading;
  const coToken = Object.keys(localStorage).some((k) =>
    k.includes("-auth-token"),
  );

  // 2. Luật cho phép/không cho ghi (hai vế)
  const truoc = m.isGuestMode();
  m.setGuestMode(true);
  const st = m.createGuestAwareStorage();
  st.setItem("zzz-probe", { a: 1 });
  const khiKhach = localStorage.getItem("zzz-probe"); // mong đợi: null
  m.setGuestMode(false);
  st.setItem("zzz-probe", { a: 2 });
  const khiDaDangNhap = localStorage.getItem("zzz-probe"); // mong đợi: có JSON
  localStorage.removeItem("zzz-probe");
  m.setGuestMode(truoc);

  return {
    "là Khách?": laKhach,
    "app đang khởi tạo?": dangKhoiTao,
    "có token đăng nhập trên máy?": coToken,
    "khoá riêng còn lại": con,
    "luật: ghi khi Khách": khiKhach,
    "luật: ghi khi đã đăng nhập": khiDaDangNhap,
    "KẾT LUẬN":
      con.length === 0
        ? "✅ khách không giữ khoá riêng nào"
        : dangKhoiTao
          ? "⏳ app còn ĐANG KHỞI TẠO — chờ header hiện “Khách” rồi chạy lại"
          : laKhach
            ? "❌ đang là Khách mà vẫn còn khoá ⇒ Ctrl+Shift+R rồi chạy lại; còn thì báo để soi tiếp"
            : "⏭️ máy đang ĐĂNG NHẬP nên 4 khoá này PHẢI CÒN — luật chỉ chặn khi là Khách",
  };
})().then((r) => console.table(r));
// ⚠️ Đuôi `.then(...)` là BẮT BUỘC khi dán vào Console: hàm `async` trả về **Promise**,
//    nên không có nó thì Console chỉ hiện `Promise {<fulfilled>}` và kết quả nằm khuất
//    trong `[[PromiseResult]]` — rất dễ tưởng là "không ra gì".
```

| #   | Bước                                                             | Mong đợi                                                                     |
| --- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| a   | Mở app **không** đăng nhập, học xong 1 bài, rồi `Ctrl+R`         | Bài **không** còn dấu hoàn thành (đúng luật mới)                             |
| b   | Chạy đoạn ở trên → xem `KẾT LUẬN` (phải thấy `là Khách? = true`) | `✅ khách không giữ khoá riêng nào` + `luật: ghi khi Khách = null`           |
| c   | Đăng nhập, học 1 bài, `Ctrl+R`                                   | Bài **còn** dấu hoàn thành + Xu/XP còn (đã đăng nhập thì vẫn ghi)            |
| d   | Đăng xuất → chạy lại đoạn ở trên                                 | `là Khách? = true` · `KẾT LUẬN = ✅` — không còn dữ liệu người vừa đăng xuất |
| e   | Sau khi đăng xuất, mở lại app ở chế độ Khách                     | Xu/cấp/tiến độ về **mặc định**, **không** thấy số của người cũ               |

> 🔬 **BA CÁI BẪY ĐÃ MẤT THỜI GIAN, ghi lại (2026-09-21):**
>
> | Bẫy                                                                      | Triệu chứng                                                                                                                | Cách xử lý                                                                                      |
> | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
> | Tab `5173` **đang đăng nhập sẵn** (session User A)                       | 4 khoá riêng **còn nguyên** ⇒ trông như luật hỏng                                                                          | Luật chỉ chặn khi **là Khách**; đang đăng nhập thì ghi được — dùng dòng `KẾT LUẬN` để phân biệt |
> | Tab mở từ **trước khi đổi mã** (Vite HMR không chạy lại đường khởi động) | `clearPrivateKeys()` của lần khởi động **chưa hề chạy** ⇒ khoá cũ còn lại                                                  | `Ctrl+Shift+R` (nạp lại thật) rồi chạy lại                                                      |
> | Chạy đoạn kiểm **quá sớm** sau khi nạp lại                               | `initAuth` chưa chạy xong ⇒ **chưa ai dọn khoá**, mà `isGuest` vẫn là giá trị khởi tạo `true` ⇒ đọc ra "Khách mà còn khoá" | Xem dòng `app đang khởi tạo?`; nếu `true` thì **chờ** (header hiện “Khách”), đừng kết luận      |
>
> ✅ **ĐÃ ĐO BẰNG TAY (2026-09-21) — PASS, và đúng cả HAI VẾ của luật:**
>
> | Số đo                          | Giá trị đọc được | Nghĩa                                                                                        |
> | ------------------------------ | ---------------- | -------------------------------------------------------------------------------------------- |
> | `là Khách?`                    | `true`           | tab thật sự ở chế độ Khách ⇒ phép thử **có** chạm đúng đường mã                              |
> | `có token đăng nhập trên máy?` | `false`          | xác nhận độc lập: không có phiên đăng nhập nào                                               |
> | `khoá riêng còn lại`           | `[]`             | không còn dữ liệu riêng nào                                                                  |
> | `luật: ghi khi Khách`          | `null`           | **bị chặn ghi** — đúng luật                                                                  |
> | `luật: ghi khi đã đăng nhập`   | `{"a":2}`        | vẫn ghi được ⇒ luật **không chặn nhầm**                                                      |
> | `app đang khởi tạo?`           | `true`           | đoạn kiểm chạy lúc `initAuth` chưa xong — **không sao**: khoá đã rỗng thì không có gì để dọn |
>
> 📌 **CHỐT PASS (2026-09-21) — theo quyết định của bạn, không đo thêm.**
> Các bước **(a)**, **(d)**, **(e)** (học xong một bài ở chế độ Khách rồi `Ctrl+R`; ca **đăng nhập →
> đăng xuất**) **không có phép đo riêng**, nhưng mục này được coi là **đã đạt** — không cần chạy lại.
> Ghi chú giữ lại để nói rõ **bằng chứng đang có** là gì: luật chặn ghi đúng **cả hai vế**, và trên máy
> **không còn khoá riêng nào**. Riêng nhánh **dọn khoá lúc thoát** (`sessionMode.js:52`) chỉ dựa vào
> đường mã + cổng `S-31`, **chưa** có phép đo trực tiếp — nếu sau này có ca "đăng xuất xong vẫn thấy số
> của người cũ" thì chỗ đầu tiên cần xem là đó.

> Vì ba bẫy này, đoạn kiểm giờ **tự in ra trạng thái tab** trước khi kết luận — không được đọc kết quả
> của một phép thử mà không biết nó đang chạy ở trạng thái nào.

> 🔬 **ĐO LƯỜNG: đừng lọc theo tiền tố `toan-vui-`.** Bản đầu của mục (b) viết
> `Object.keys(localStorage).filter(k => k.startsWith("toan-vui-"))` và mong đợi `[]` — **SAI**, đã bị
> bắt lỗi khi kiểm tay (2026-09-21). Câu đó trả về **4 khoá, và cả 4 đều PHẢI CÒN**:
>
> | Khoá                         | Do đâu             | Vì sao phải giữ                                    |
> | ---------------------------- | ------------------ | -------------------------------------------------- |
> | `toan-vui-content`           | `contentSource.js` | cây nội dung — giữ cho bé **học được khi offline** |
> | `toan-vui-reward-configs`    | `rewardService.js` | bảng giá thưởng                                    |
> | `toan-vui-reward-multiplier` | `rewardService.js` | hệ số nhân sự kiện                                 |
> | `toan-vui-level-curve`       | `rewardService.js` | đường cong lên cấp                                 |
>
> Bốn khoá này là **cấu hình + nội dung**, **không** phải dữ liệu riêng của bé — chúng chung cho mọi
> máy, không lộ gì của ai. Cổng `S-31` giờ canh luôn điều này: danh sách khoá riêng phải **khớp đúng tên
> 4 store** đang persist, và **không** được chứa 4 khoá cache trên.

> 🔴 **Vì sao (d) và (e) đều bắt buộc, không thể bỏ:** chặn ghi thôi thì dữ liệu **cũ** vẫn nằm trên máy,
> và lần mở app sau (là khách) sẽ **nạp lại đúng dữ liệu đó** — khách nhìn thấy Xu/tiến độ của người khác.
> **"Không ghi" mà không "xoá cái đã ghi" là chưa đủ.**

> ⚠️ **Ngoại lệ có chủ ý:** khi **chưa cấu hình Supabase** (thiếu `VITE_SUPABASE_URL` / `ANON_KEY`),
> cả app luôn ở chế độ Khách và `localStorage` là chỗ lưu **DUY NHẤT** ⇒ luật này **không** áp dụng.
> Cổng `S-31` giữ đúng ngoại lệ đó, vì quên nó là app **mất sạch tiến độ** sau mỗi lần mở lại.

> ✅ **Canary hai vế đã đo (2026-09-21)** — cố tình làm hỏng để chắc cổng **bắt được**:
>
> | Canary                                            | Kết quả đo                                                                                                                                                       |
> | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Đổi luật thành `!guestMode` (bỏ ca chưa cấu hình) | `S-31` **FAIL**: _"Chưa cấu hình Supabase thì KHÔNG được chặn ghi — localStorage là chỗ lưu duy nhất"_                                                           |
> | Gỡ `storage:` của **một** store (thú cưng)        | `S-31` **FAIL**: _"Store persist chưa bọc storage chống ghi ở chế độ Khách: client/src/store/usePetStore.js"_                                                    |
> | Bỏ một khoá khỏi `PRIVATE_KEYS` (thú cưng)        | `S-31` **FAIL**: _"PRIVATE_KEYS lệch với tên 4 store — thừa: [] · thiếu: [toan-vui-pet]"_                                                                        |
> | Thêm khoá `cache` vào `PRIVATE_KEYS`              | `S-31` **FAIL** kèm lời giải thích: _"… ⚠️ Khoá thừa là CACHE cấu hình/nội dung (toan-vui-content) — vào chế độ Khách là mất thứ giữ cho app học được offline."_ |
>
> Sau khi trả lại: **31 PASS · 0 FAIL**.

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

# 📊 PHẦN H — GIAI ĐOẠN 2b: Tầng dữ liệu phân tích

> ✅ **Đã có cả 2b-1 và 2b-2.** Lát 2b-1 là tầng **THU THẬP** dữ liệu (`TC-2.14` →
> `TC-2.23`). Lát 2b-2 gắn nốt **6 mini game** vào cùng đường đó và dựng màn hình
> `/analytics` (`TC-2.24` → `TC-2.30`).
> Kế hoạch đầy đủ: `docs/phase_2b_plan.md`.
>
> 🎯 **Tầng này tồn tại để trả lời 3 câu:**
> **A** câu hỏi/khuôn nào hỏng · **B** bé đoán bừa hay không hiểu · **C** kỹ năng nào yếu.

### TC-2.14 — Migration 0006 chạy sạch 🔴

**Bước:** Chạy `0006_question_attempts.sql` → `Success. No rows returned`.

```sql
SELECT policyname, cmd, roles::text FROM pg_policies
WHERE tablename = 'question_attempts' ORDER BY policyname;
-- Mong đợi ĐÚNG 3 policy: question_attempts_admin_read,
-- question_attempts_parent_insert, question_attempts_parent_select
-- ⛔ KHÔNG được có policy nào cho `anon`
```

```sql
SELECT indexname FROM pg_indexes WHERE tablename = 'question_attempts';
-- Mong đợi: question_attempts_child_idx, question_attempts_ref_idx
```

---

### TC-2.15 — Trả lời 1 câu trong bài học → có dòng 🔴

> Cũng có cổng chặn tự động: `npm run test:portal:static` → dòng `S-13`, kiểm tra mọi
> chỗ gọi `recordMistake` đều gọi kèm `recordAttempt`. Đã đo: thêm file cố tình thiếu
> `recordAttempt` → `S-13` **FAIL** và chỉ đúng tên file.

**Chuẩn bị:** App chính (`5173`), đăng nhập **User A** (⚠️ không phải khách).

**Bước:** Vào một bài học → tới slide câu hỏi → trả lời.

```sql
SELECT question_ref, source, lesson_id, topic, ms, is_correct, created_at
FROM public.question_attempts ORDER BY created_at DESC LIMIT 5;
```

**Mong đợi:** có dòng mới với:

- `source = 'lesson'`
- `question_ref = 'lesson:<mã bài>:<số slide>'` — VD `lesson:g1-c1-l1:4`
- `lesson_id` = đúng bài vừa học
- `ms` = số mili giây thật (VD `4200`), **không** NULL — trừ khi bạn ngồi quá 5 phút
- `is_correct` khớp với việc bạn vừa trả lời đúng hay sai

> ℹ️ **`topic` để trống khi `source = 'lesson'` là ĐÚNG thiết kế — không phải lỗi.**
> Câu trong bài học không thuộc "khuôn" nào; danh tính của nó là `lesson_id` + số slide.
> `topic` chỉ có nghĩa với câu **sinh tự động**, vì đó mới là thứ đánh ID theo khuôn.
>
> Kiểm tra nhanh xem mình đang ở trường hợp nào:
>
> ```sql
> SELECT source,
>        COUNT(*) AS tong,
>        COUNT(topic) AS co_topic,
>        COUNT(*) FILTER (WHERE topic IS NULL) AS khong_topic
> FROM public.question_attempts GROUP BY source ORDER BY source;
> ```
>
> | `source`    | `co_topic` mong đợi         |
> | ----------- | --------------------------- |
> | `lesson`    | **0** — để trống là đúng    |
> | `practice`  | **= `tong`** — thiếu là LỖI |
> | `challenge` | **= `tong`** — thiếu là LỖI |
> | `review`    | có nếu câu gốc từ luyện tập |
>
> ⚠️ **Hệ quả cần biết:** câu hỏi C ("kỹ năng nào yếu") hiện chỉ tính được trên câu
> **sinh tự động**, chưa gồm câu trong bài học. Xem mục 4.7 của `docs/phase_2b_plan.md`.

> ℹ️ **Slide `dialogue` (hội thoại) cũng ghi** — không chỉ slide `quiz`. Thử cả hai loại.

---

### TC-2.16 — Câu sinh tự động đánh ID theo KHUÔN 🔴

> Đây là điểm cốt lõi của thiết kế. Nếu `ref` đổi theo từng lần sinh thì việc gộp nhóm
> ra 0 thông tin và **câu hỏi A không bao giờ trả lời được**.

**Bước:** Luyện tập **cùng một chủ đề** 5–6 câu, rồi:

```sql
SELECT question_ref, topic, COUNT(*) FROM public.question_attempts
WHERE source = 'practice' GROUP BY question_ref, topic ORDER BY 3 DESC;
```

**Mong đợi:**

- `question_ref` có dạng **`tmpl:<mã khuôn>`** — VD `tmpl:g1_count`
- Vài câu khác nhau **dùng chung một `question_ref`** (vì cùng khuôn)
- `topic` khớp phần sau dấu `:` của `ref`

> ⚠️ Nếu thấy `question_ref` khác nhau ở **mọi** dòng dù cùng chủ đề → thiết kế đã hỏng,
> báo ngay: phải sửa trước khi làm tiếp 2b-2.

---

### TC-2.17 — `source` phân biệt đúng luyện tập và ôn câu sai

**Bước:**

1. **Luyện tập** trả lời vài câu → `source = 'practice'`
2. **Ôn câu sai** (làm sai 1 câu trước, rồi dùng mục **A.6** để đưa về tới hạn hôm nay)
   → trả lời lại → `source = 'review'`

```sql
SELECT source, COUNT(*) FROM public.question_attempts GROUP BY source ORDER BY source;
```

**Mong đợi:** thấy đủ `lesson`, `practice`, `review` (và `challenge` nếu đã chơi Thử thách).

> ℹ️ Dòng `review` phải có `question_ref` — nếu NULL thì `ref` không được lưu kèm vào
> sổ câu sai. Xem `useProgressStore.recordMistake`.

---

### TC-2.18 — Khách KHÔNG ghi gì 🔴

> Vì sao khác `support_tickets`: bảng này ghi rất nhiều (~50 dòng/bé/ngày). Mở quyền ghi
> ẩn danh là mở đường spam làm hỏng số liệu và đầy quota 500 MB.

**Chuẩn bị:** Đăng xuất (chế độ Khách).

**Bước 1 — chơi như khách:** vào một bài học, trả lời vài câu.

**Bước 2 — kiểm tra không có dòng nào mới:**

```sql
SELECT COUNT(*) FROM public.question_attempts
WHERE created_at > NOW() - INTERVAL '5 minutes';
-- Mong đợi: 0
```

**Bước 3 — thử ghi trực tiếp bằng Console (app chính, đang là Khách):**

```js
const r = await window.__sb.from("question_attempts").insert({
  child_id: null,
  question_ref: "test",
  source: "lesson",
  is_correct: true,
});
console.log(r.error?.message ?? "⚠️ GHI ĐƯỢC — LỖ HỔNG");
```

**Mong đợi:** có lỗi vi phạm RLS.

---

### TC-2.19 — `ms` vượt trần ghi `NULL`, không ghi số rác 🔴

> Bé có thể bỏ máy đi chơi rồi quay lại. `ms` = 20 phút là rác, sẽ làm hỏng câu hỏi B
> (không phân biệt được "suy nghĩ lâu" với "bỏ đi chơi").

**Bước:**

1. Vào **Luyện tập**, bắt đầu một phiên, **không trả lời câu đầu**
2. **Chờ hơn 5 phút** (trần là 300 giây)
3. Trả lời câu đó

```sql
SELECT question_ref, ms, is_correct FROM public.question_attempts
WHERE source = 'practice' ORDER BY created_at DESC LIMIT 1;
```

**Mong đợi:** `ms` = **NULL** (không phải `300000`, không phải số lớn hơn).

> ⏱️ Test này mất ~6 phút. Không có cách nhanh hơn mà vẫn kiểm tra đúng thực tế.

---

### TC-2.20 — `anon` không đọc / sửa / xoá được bảng này 🔴

**Chuẩn bị:** Console ở app chính, **đang là Khách**.

```js
const r = await window.__sb.from("question_attempts").select("*").limit(5);
console.log({ count: r.data?.length, error: r.error?.message });
// Mong đợi: count = 0
```

```js
const u = await window.__sb
  .from("question_attempts")
  .update({ is_correct: true })
  .neq("id", 0);
const d = await window.__sb.from("question_attempts").delete().neq("id", 0);
console.log({
  update: u.error?.message ?? `${u.data?.length ?? 0} dòng`,
  delete: d.error?.message ?? `${d.data?.length ?? 0} dòng`,
});
// Mong đợi: 0 dòng bị ảnh hưởng
```

---

### TC-2.21 — Hàm xoá dữ liệu cũ: chạy được nhưng KHÔNG gọi được qua API 🔴

> Nếu hàm này lọt ra API thì bất kỳ ai có anon key cũng xoá sạch dữ liệu phân tích.
> Đó là lý do migration có `REVOKE` tường minh — PostgreSQL mặc định cho `PUBLIC` gọi mọi hàm.

**Bước 1 — qua API phải bị chặn** (Console app chính, chế độ Khách):

```js
const r = await window.__sb.rpc("purge_old_attempts");
console.log(r.error?.message ?? "⚠️ GỌI ĐƯỢC — LỖ HỔNG");
```

**Mong đợi:** có lỗi (không tìm thấy hàm, hoặc bị từ chối quyền).

**Bước 2 — chạy từ SQL Editor phải được:**

```sql
SELECT public.purge_old_attempts();   -- Mong đợi: trả về số dòng đã xoá (0 là bình thường)
```

---

### TC-2.22 — `purge_old_attempts(10)` bị từ chối

**Bước:**

```sql
SELECT public.purge_old_attempts(10);
-- Mong đợi: LỖI "keep_days phải >= 30 (chặn xoá nhầm)"
```

> Chốt chặn này để gọi nhầm `purge_old_attempts(0)` không làm mất sạch dữ liệu.

---

### TC-2.23 — 3 câu SQL trả lời được A / B / C 🔴

> Đây là **DoD của lát 2b-1**. Nếu 3 câu này không ra số liệu có nghĩa thì tầng dữ liệu coi như chưa xong.

Chạy sau khi đã có ít nhất vài chục lượt trả lời (chơi vài ba phiên luyện tập).

```sql
-- A: khuôn nào sai nhiều bất thường
SELECT question_ref, COUNT(*) AS luot,
       ROUND(100.0 * COUNT(*) FILTER (WHERE NOT is_correct) / COUNT(*), 1) AS ti_le_sai
FROM public.question_attempts
GROUP BY question_ref HAVING COUNT(*) >= 5
ORDER BY ti_le_sai DESC LIMIT 20;
```

```sql
-- B: đoán bừa (nhanh + sai) hay không hiểu (chậm + sai)
SELECT question_ref,
       COUNT(*) FILTER (WHERE NOT is_correct AND ms < 3000)  AS nghi_doan_bua,
       COUNT(*) FILTER (WHERE NOT is_correct AND ms > 15000) AS nghi_khong_hieu
FROM public.question_attempts
WHERE ms IS NOT NULL GROUP BY question_ref ORDER BY 2 DESC LIMIT 20;
```

```sql
-- C: kỹ năng nào bé yếu thật sự
-- CỐ Ý không cần điền UUID: gộp theo từng bé luôn, chạy được ngay.
SELECT cp.nickname, a.topic, COUNT(*) AS luot,
       ROUND(100.0 * COUNT(*) FILTER (WHERE a.is_correct) / COUNT(*), 1) AS ti_le_dung
FROM public.question_attempts a
JOIN public.child_profiles cp ON cp.id = a.child_id
WHERE a.topic IS NOT NULL
GROUP BY cp.nickname, a.topic
ORDER BY cp.nickname, ti_le_dung ASC;
```

> 💡 Chỉ muốn 1 bé? Thêm `AND cp.nickname = 'Tên bé'` — **không cần UUID**, xem mục **A.7**.

**Mong đợi:** cả 3 câu chạy không lỗi, và số liệu **khớp với những gì bạn vừa chơi**
(VD vừa làm sai 2 câu `g1_compare` thì khuôn đó phải hiện tỉ lệ sai > 0).

---

## 🎮 Lát 2b-2 — Mini game ghi lượt trả lời + màn hình `/analytics`

> Phần này khép lại GĐ 2b. Lát 2b-1 (ở trên) đã **thu thập** dữ liệu; lát này **gắn
> nốt 6 mini game** vào cùng đường đó và **dựng màn hình xem số liệu**.

---

### TC-2.24 — Câu mini game đánh ID theo KHUÔN 🔴 _(tự động)_

**Chạy:** `node scratch/verify_calc_ref.mjs`

**Mong đợi:** `1500 lượt` sinh câu (300 × 5 lớp) đều PASS, và in ra đúng **16 khuôn**:

| Lớp   | Khuôn                                                                  |
| ----- | ---------------------------------------------------------------------- |
| 1     | `calc_g1_add`, `calc_g1_sub`                                           |
| 2,3,4 | `calc_g2_add`, `calc_g2_sub`, `calc_g2_mul`, `calc_g2_div` (mỗi lớp 4) |
| 5     | `calc_g5_add`, `calc_g5_mul`                                           |

**Mỗi kết quả phải có:**

- `ref` bắt đầu bằng `tmpl:calc_g`
- `topic` khớp phần sau dấu `:` của `ref`
- **không** khuôn nào là `..._other` — rơi vào `other` nghĩa là có phép tính không nhận ra
- 4 trường cũ (`question`, `equation`, `options`, `answer`) còn nguyên

> ⚠️ **Lớp 5 chỉ có 2 khuôn, không phải 4.** Đó là đúng: nhánh lớp 5 của bộ này chỉ
> sinh **cộng số thập phân** và **nhân với 10**. Thấy 16 khuôn là đủ, không phải thiếu.
>
> 💡 Vì sao `ref` được suy từ trường `equation` thay vì sửa từng chỗ: hàm gốc có
> **16 chỗ `return`** trải trên 5 nhánh lớp. Sửa từng chỗ là cách chắc chắn để sót một
> chỗ — và chỗ bị sót sẽ lặng lẽ ghi ra dòng **thiếu `ref`** mà không ai biết.

---

### TC-2.25 — Chơi mini game → mỗi lần trả lời là MỘT dòng 🔴

> Cũng có cổng chặn tự động: `npm run test:portal:static` → dòng `S-14`.
> **Đã đo bộ dò:** tạm bỏ `recordAttempt` khỏi `MathBalanceGame` → `S-14` **FAIL** và
> chỉ đúng tên game (kèm `S-12` báo biến chưa khai báo — hai lớp cùng bắt).

**Chuẩn bị:** App chính (`5173`), đăng nhập **User A** (⚠️ khách không ghi gì).

**Bước:** Vào **Trò chơi** → chơi **Đua Xe Toán Học**, trả lời vài câu.

```sql
SELECT question_ref, source, topic, grade, ms, is_correct, created_at
FROM public.question_attempts
WHERE source = 'game' ORDER BY created_at DESC LIMIT 10;
```

**Mong đợi:**

- `source = 'game'` · `question_ref` dạng `tmpl:<khuôn>` (VD `tmpl:g1_count`)
- `topic` = phần sau `tmpl:`
- `grade` = lớp đang chọn, **không NULL** (bảng có `CHECK 1..5` nên sai là bị chặn ngay)
- **Mỗi lần trả lời là một dòng** — không gom tới cuối ván

**Lặp lại cho Number Pop, Memory Match, Space Defense, Cân Bằng Thần Kỳ, Câu Cá.**

#### 🔴 Bẫy phải kiểm riêng: ghi ở chỗ TẠO thay vì chỗ BẤM

`NumberPopGame` và `MathFishingGame` **tạo sẵn 4 vật thể** mang `isCorrect` rồi mới để
bé bấm. Nếu ghi ở chỗ tạo thì **mỗi câu sinh 4 dòng** dù bé chỉ chạm 1 — số liệu sai
ngay từ đầu mà vẫn trông như có dữ liệu.

**Cách kiểm chắc chắn** — đếm trước, bấm đúng **1 quả**, đếm lại:

```sql
SELECT COUNT(*) FROM public.question_attempts WHERE source = 'game';
```

**Mong đợi:** đúng **+1**, không phải +4.

> Lưu ý: đừng đếm theo `question_ref` rồi kết luận — cùng một khuôn xuất hiện nhiều lần
> trong một ván, nên con số đó không nói lên việc ghi đúng hay sai.

---

### TC-2.26 — Cân Bằng Thần Kỳ ghi `ref` RIÊNG

> 🐞 **Vì sao có mục này:** kế hoạch 2b-2 bản đầu của tôi ghi rằng game này
> **"không sinh câu hỏi"** — **sai**. Nó có hàm sinh riêng tên `generatePuzzle()`, mà
> grep `generateCalculation` không nhìn thấy. Nếu tin theo kế hoạch đó thì game này
> **không bao giờ ghi được dòng nào**, và `/analytics` lặng lẽ thiếu hẳn một nguồn.

**Bước:** App chính → **Cân Bằng Thần Kỳ**, chơi vài vòng.

```sql
SELECT question_ref, topic, COUNT(*) AS luot,
       COUNT(*) FILTER (WHERE NOT is_correct) AS so_lan_sai
FROM public.question_attempts
WHERE source = 'game' AND question_ref LIKE '%balance%'
GROUP BY question_ref, topic ORDER BY 1;
```

**Mong đợi:** thấy các khuôn `calc_balance_*` (1–2 khuôn tuỳ lớp đang chọn):

| Đang chọn   | `question_ref`             |
| ----------- | -------------------------- |
| Lớp 1       | `tmpl:calc_balance_g1`     |
| Lớp 2       | `tmpl:calc_balance_g2`     |
| Lớp ≥3 nhân | `tmpl:calc_balance_g3_mul` |
| Lớp ≥3 cộng | `tmpl:calc_balance_g3_add` |

**Kiểm tra quan trọng — sai rồi chọn lại phải sinh 2 dòng:** cố tình chọn sai 1 quả rồi
chọn đúng. Khuôn đó phải có `so_lan_sai ≥ 1` **và** `luot ≥ 2`.

> 💡 Đây là game **duy nhất** bé trả lời lại được cùng một câu, nên nó là nguồn tốt nhất
> cho câu hỏi B — "phải thử mấy lần mới đúng" đọc trực tiếp được.
>
> ℹ️ Vì sao nhánh lớp ≥3 có **2** khuôn: `generatePuzzle()` sinh đề `a × b` khi
> `Math.random() > 0.4`, còn lại là phép cộng.

---

### TC-2.27 — Màn hình `/analytics` tải được, 3 khối A/B/C đều ra số liệu 🔴

**Chuẩn bị:** cần ít nhất **20 lượt trong cùng một khuôn** để khối A có dữ liệu. Cách
nhanh nhất: **Luyện tập một chủ đề** ~20 câu. (Chưa đủ thì xem `TC-2.29`.)

**Bước:** `localhost:5174` → menu trái **📊 Phân tích câu hỏi**.

| #   | Mong đợi                                                                               |
| --- | -------------------------------------------------------------------------------------- |
| a   | Vào `/analytics`, không 404                                                            |
| b   | Dòng tổng hiện `N lượt trả lời trong 30 ngày qua`                                      |
| c   | **Khối A** — `ref · lượt · tỉ lệ sai`, sai nhiều nhất lên đầu, **chỉ khuôn ≥ 20 lượt** |
| d   | **Khối B** — `ref · đoán bừa · chưa hiểu`; chỉ tính lượt **có** `ms`                   |
| e   | **Khối C** — gộp theo **bé · kỹ năng**, `tỉ lệ đúng` thấp nhất lên đầu                 |
| f   | Gõ tay `localhost:5174/analytics` rồi Enter → vào thẳng, **không** nhảy về Tổng quan   |
| g   | Console **không** có lỗi đỏ                                                            |

**Đối chiếu bằng SỐ, đừng nhìn rồi đoán.** Màn hình và câu SQL dưới đây đọc từ **cùng
một hàm**, nên phải ra **y hệt**:

```sql
SELECT jsonb_pretty(public.get_question_analytics(30, NULL));
```

> ⚠️ **Đừng đối chiếu với 3 câu SQL ở `TC-2.23`.** Chúng dùng ngưỡng `≥ 5` và không lọc
> ngày, còn màn hình dùng ngưỡng `20` trong `30 ngày` — khác nhau là đúng, không phải lỗi.

---

### TC-2.28 — Bộ lọc lớp và khoảng ngày đổi số liệu

| #   | Thao tác           | Mong đợi                                                  |
| --- | ------------------ | --------------------------------------------------------- |
| a   | Bấm **7 ngày**     | Dòng tổng đổi thành `7 ngày qua`, số **≤** số của 30 ngày |
| b   | Bấm **90 ngày**    | Số **≥** số của 30 ngày                                   |
| c   | Chọn **Lớp 3**     | Dòng tổng ghi thêm `· lớp 3`                              |
| d   | So Lớp 3 với Lớp 5 | Số liệu khác nhau (nếu cả hai lớp đều có dữ liệu)         |
| e   | Về **Tất cả**      | Khớp lại đúng con số của lần đầu                          |

**Đối chiếu tổ hợp lọc** — đang ở **7 ngày · Lớp 3** thì phải khớp:

```sql
SELECT jsonb_pretty(public.get_question_analytics(7, 3));
```

> ⚠️ **Câu trong BÀI HỌC cũng có `grade`** (ghi theo lớp của bài) nên lọc lớp vẫn gồm
> chúng. Nhưng chúng **không có `topic`**, nên **khối C luôn nhỏ hơn tổng số lượt** —
> đó là đúng thiết kế, không phải lỗi. Xem ghi chú ở `TC-2.15`.

---

### TC-2.29 — Chưa đủ lượt thì phải NÓI RÕ, không để bảng trống câm 🔴

> Bảng trống mà không giải thích thì bị hiểu nhầm là hỏng. Cùng bài học với Sổ Tay Ôn
> Bài Sai — "vừa trả lời sai mà sổ rỗng là **đúng thiết kế**".

| #   | Tình huống                              | Mong đợi                                                                                        |
| --- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| a   | Lọc **7 ngày** khi 7 ngày đó chưa có gì | Khối trắng ghi `7 ngày qua chưa có lượt trả lời nào.` + gợi ý **khách chơi không ghi dòng nào** |
| b   | Có lượt nhưng mọi khuôn đều < 20 lượt   | Khối A ghi `Chưa khuôn nào đủ 20 lượt (đang có N khuôn dưới ngưỡng)`                            |
| c   | Cùng lúc                                | Dòng tổng ghi `còn **N** khuôn chưa đủ, cần thêm dữ liệu mới đáng tin`                          |
| d   | Lọc **Lớp 4** khi lớp 4 chưa có gì      | Thông báo ghi kèm `ở lớp 4`                                                                     |

> ⚠️ Con số **20** đến **từ database** (khoá `min_attempts` trong kết quả hàm), **không**
> gán cứng trong JSX. Muốn đổi ngưỡng thì chỉ sửa `0007_analytics_queries.sql` — cùng bài
> học với `TC-R.8`.

---

### TC-2.30 — Migration 0007 chạy sạch; khách KHÔNG gọi được hàm 🔴

**Bước 1 — chạy `0007_analytics_queries.sql`** → `Success. No rows returned`.
**Chạy lại lần 2 cũng phải thành công** (idempotent).

**Bước 2 — hàm trả đủ 7 khoá:**

```sql
SELECT jsonb_pretty(public.get_question_analytics(30, NULL));
-- Mong đợi có đủ: days, grade, min_attempts, total_attempts,
--                 refs_below_min, broken, guessing, weak
```

**Bước 3 — tham số vô lý bị kéo về ngưỡng an toàn:**

```sql
SELECT public.get_question_analytics(0, NULL) -> 'days';
-- Mong đợi: 1 (bị kéo lên tối thiểu 1, KHÔNG phải 0)
```

**Bước 4 — khách KHÔNG gọi được** (Console **app chính**, đang là **Khách**):

> ✅ **Có cổng chặn tự động:** `npm run test:portal` → dòng `D-13`. Đã chạy: PASS —
> `bị REVOKE chặn — HTTP 401`. (HTTP **401** chứ không phải 404 cũng là bằng chứng
> hàm **đã tồn tại**, tức `0007` đã tạo hàm thành công.)
>
> ℹ️ `D-13` cố ý chấp nhận **cả hai** kiểu chặn — lỗi quyền, hoặc 0 dòng. Khẳng định
> cứng "phải có lỗi" sẽ báo FAIL oan khi lớp RLS đỡ được một mình, mà đó lại là kết
> quả an toàn.

```js
const r = await window.__sb.rpc("get_question_analytics", { p_days: 30 });
console.log(r.error?.message ?? `⚠️ GỌI ĐƯỢC — ${JSON.stringify(r.data)}`);
```

**Mong đợi:** có lỗi (không tìm thấy hàm, hoặc bị từ chối quyền).

**Bước 5 — hàm chỉ ĐỌC:** trong `0007_analytics_queries.sql` **không** được có
`INSERT` / `UPDATE` / `DELETE`.

> 🔒 **Vì sao hàm an toàn dù trả số liệu của mọi bé:** `SECURITY INVOKER` — hàm chạy dưới
> quyền **người gọi**, nên RLS của `question_attempts` vẫn là thứ quyết định. Admin thấy
> hết nhờ `question_attempts_admin_read`; phụ huynh chỉ thấy bé của mình; khách không thấy gì.
>
> ⚠️ **Vì sao phải có hàm này chứ không gọi PostgREST thẳng:** ba khối đều là `GROUP BY`,
> mà PostgREST **không làm được** `GROUP BY`. Tải dòng thô về gộp bằng JavaScript thì
> PostgREST chỉ trả tối đa **1000 dòng** một lần — vượt ngưỡng đó màn hình vẫn hiện số,
> vẫn trông bình thường, nhưng **sai**.

---

# � PHẦN I — Giao diện mobile cho Admin Portal

> Admin Portal vốn chỉ dùng trên máy tính: sidebar rộng **256px** cố định, mỗi trang đệm
> **32px** mỗi bên. Trên màn 375px, sidebar chiếm 256px → chỉ còn **119px** cho nội dung,
> không đọc được.
>
> Đã sửa: sidebar thành **ngăn kéo** ở mobile · đệm theo breakpoint · bảng rộng **cuộn
> ngang trong hộp riêng** thay vì bóp cột lại.

### Đã đo, không phải ước lượng

| Chỗ đo                                  | Sau                                            |
| --------------------------------------- | ---------------------------------------------- |
| Nội dung có bị thanh trên cùng đè không | `contentTop` 56px **=** `headerBottom` 56px ✅ |
| Cuộn ngang cấp trang — 6 route ở 375px  | **0 route** bị                                 |
| Bảng Người dùng (8 cột) ở 375px         | bảng **860px** cuộn trong hộp **341px**        |
| Độ tương phản chữ trong menu            | **19/19 mục ≥ 4.5:1**, thấp nhất 5.6:1         |
| Desktop 1280px                          | sidebar tĩnh **256px** — **không đổi**         |

> 🔴 **Một lỗi thật đã bắt được NHỜ ĐO, không nhờ nhìn:** ban đầu thanh trên cùng để tự
> cao theo nội dung → ra **57px**, trong khi `pt-14` chỉ **56px** → nội dung bị đè mất
> **1px**. Sửa bằng cách ghim thanh ở `h-14` để nó dùng **cùng token** với `pt-14`.
> Lỗi 1px này **không nhìn ra được** trong ảnh chụp.
>
> ⚠️ `h-14` (thanh trên cùng) · `pt-14` (`<main>`) · `pt-14` (`<aside>`) **phải khớp
> nhau**. Đổi một chỗ là phải đổi cả ba.
>
> ℹ️ Admin Portal **không** có `lucide-react` và cố ý không thêm: nút ☰ là **SVG nội
> tuyến**. Thêm một dependency chỉ để vẽ 3 đường kẻ là không đáng.

---

### TC-M.1 — Sidebar thành ngăn kéo ở mobile 🔴

**Cách nhanh nhất:** DevTools → **Toggle device toolbar** (Ctrl+Shift+M) → chọn 375px.

| #   | Thao tác                         | Mong đợi                                                      |
| --- | -------------------------------- | ------------------------------------------------------------- |
| a   | Mở trang bất kỳ ở 375px          | Sidebar **biến mất**; có thanh trên cùng với nút ☰           |
| b   | Bấm ☰                           | Ngăn kéo trượt vào từ trái; nền phía sau **tối đi**           |
| c   | Bấm vào vùng tối                 | Ngăn kéo đóng                                                 |
| d   | Mở lại rồi bấm **Esc**           | Ngăn kéo đóng                                                 |
| e   | Mở lại rồi bấm một mục menu      | Sang đúng trang **và** ngăn kéo tự đóng                       |
| f   | Đang mở ngăn kéo, vuốt lên xuống | Trang phía sau **KHÔNG** cuộn                                 |
| g   | Đang mở ngăn kéo                 | Nút ☰ vẫn bấm được (đổi thành ✕) — **không** bị ngăn kéo che |

> ⚠️ Mục **(g)** là chỗ dễ sai nhất: thanh trên cùng phải nằm **TRÊN** ngăn kéo
> (`z-50` > `z-30`). Nằm dưới thì nút đóng duy nhất bị che và người dùng **kẹt** trong
> ngăn kéo, chỉ còn cách tải lại trang.

---

### TC-M.2 — Không có cuộn ngang ở cấp trang 🔴

> Khác hẳn với "bảng cuộn được". Trang bị cuộn ngang thì **cả tiêu đề trôi đi**, và trên
> điện thoại người dùng rất dễ lạc.

Ở 375px, lần lượt mở và kiểm **từng đường dẫn**: `/` · `/users` · `/economy` ·
`/reports` · `/analytics` · `/users/<uuid>`

Dán vào Console:

```js
console.log(
  location.pathname,
  document.documentElement.scrollWidth > document.documentElement.clientWidth
    ? "❌ TRÀN NGANG"
    : "✅ không tràn",
);
```

**Mong đợi:** cả 6 route đều `✅`.

---

### TC-M.3 — Bảng rộng cuộn ngang trong hộp riêng

**Bước:** Ở 375px, mở **Người dùng** — bảng 8 cột, ca khó nhất.

| #   | Mong đợi                                                                    |
| --- | --------------------------------------------------------------------------- |
| a   | Tiêu đề, ô tìm kiếm, nút phân trang **giữ nguyên chỗ** (không bị đẩy ngang) |
| b   | **Chỉ phần bảng** cuộn ngang khi vuốt                                       |
| c   | Cột **không bị bóp** lại thành chữ xuống dòng từng chữ một                  |

> 💡 Đây là lý do mỗi bảng có thêm `min-w-[...]`: chỉ `w-full` thì bảng **co lại cho vừa**
> thay vì cuộn. Bảng 8 cột co trong 341px thì không còn đọc được.

**Kiểm bằng số** — dán vào Console ở 375px:

```js
const hop = document.querySelector("main table").parentElement;
console.log({
  hop: hop.clientWidth, // ~341
  bang: hop.scrollWidth, // 860
  cuonDuoc: hop.scrollWidth > hop.clientWidth, // phải là true
});
```

---

### TC-M.4 — Desktop không bị ảnh hưởng

**Bước:** Mở rộng cửa sổ lên ≥ 1024px, hoặc tắt chế độ device toolbar.

| #   | Mong đợi                                                    |
| --- | ----------------------------------------------------------- |
| a   | Thanh trên cùng **biến mất**                                |
| b   | Sidebar hiện lại, rộng **256px**, cao hết màn hình          |
| c   | Nội dung nằm bên phải sidebar, **không** bị đệm 56px ở trên |
| d   | Không có cuộn ngang                                         |

> ⚠️ Breakpoint là **1024px** (`lg` của Tailwind). Ở 768px (tablet dọc) vẫn là ngăn kéo —
> đó là **chủ ý**: 768 − 256 = 512px cho nội dung, vẫn quá chật cho bảng 8 cột.
>
> 🔴 **Đây là mục dễ bị bỏ qua nhất.** Sửa cho mobile rất dễ làm hỏng desktop mà không
> ai nhận ra, vì người phát triển đang ở màn hình lớn và chỉ nhìn màn hình lớn.

---

### TC-M.5 — Menu đủ tương phản để đọc 🔴

> **Đây là lỗi thật người dùng báo**, không phải phòng xa: _"menu quá tối màu khó nhìn"_.
> Đo ra thì đúng — **4 mục dưới ngưỡng** WCAG AA, tệ nhất **2.4:1** (cần **4.5:1**).

| Chỗ                    | Trước                            | Sau                  |
| ---------------------- | -------------------------------- | -------------------- |
| Nền sidebar            | `#0f172b`                        | `#1d293d` (sáng hơn) |
| "Sắp có"               | `#45556c` · **2.4:1** ❌         | 5.6:1 ✅             |
| "Nội dung bài học"     | `#45556c` · **2.4:1** ❌         | 5.6:1 ✅             |
| Icon 📚                | `#45556c` **× opacity 0.5** ❌   | bỏ opacity ✅        |
| Email · "Admin Portal" | `#62748e` · 3.7:1 ❌             | 5.6:1 ✅             |
| Nhãn "GĐ 3"            | `#62748e` / `#1d293d` · 3.1:1 ❌ | 6.9:1 ✅             |

**Kết quả sau khi sửa: 19/19 mục đạt ≥ 4.5:1, thấp nhất 5.6:1.**

**Cách đo** — mở ngăn kéo ở 375px rồi dán vào Console:

```js
const cv = document.createElement("canvas");
cv.width = cv.height = 1;
const ctx = cv.getContext("2d", { willReadFrequently: true });
const toRgb = (col) => {
  // Tô 1 điểm ảnh rồi đọc lại -> sRGB THẬT.
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "#ffffff";
  ctx.fillStyle = col;
  ctx.fillRect(0, 0, 1, 1);
  return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3);
};
const lin = (c) =>
  (c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const bgOf = (el) => {
  let p = el;
  while (p) {
    const c = getComputedStyle(p).backgroundColor;
    if (c && c !== "rgba(0, 0, 0, 0)" && c !== "transparent") return c;
    p = p.parentElement;
  }
};
const thap = [];
for (const el of document
  .getElementById("admin-sidebar")
  .querySelectorAll("*")) {
  const own = [...el.childNodes]
    .filter((n) => n.nodeType === 3)
    .map((n) => n.textContent.trim())
    .join(" ")
    .trim();
  if (!own) continue;
  const cs = getComputedStyle(el);
  const a = lum(toRgb(cs.color));
  const b = lum(toRgb(bgOf(el)));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  const r = (hi + 0.05) / (lo + 0.05);
  if (r < 4.5) thap.push(`${own.slice(0, 20)} = ${r.toFixed(1)}`);
}
console.log(
  thap.length ? "❌ DƯỚI NGƯỠNG:\n" + thap.join("\n") : "✅ tất cả ≥ 4.5:1",
);
```

> 🔴 **Tailwind v4 phát ra màu `oklch()`, không phải `rgb()`.** Đọc
> `getComputedStyle().color` rồi tách số bằng regex sẽ ra **số rác** — tôi đã mắc đúng
> lỗi này: lần đo đầu cho ra "tương phản **1.07**" trong khi thực tế là **12**. Dùng
> `ctx.fillStyle` cũng **không** đổi `oklch` sang hex (nó trả lại nguyên chuỗi `oklch`).
> Chỉ có **tô màu rồi đọc lại điểm ảnh** mới đúng.
>
> 💡 Bài học chung: khi số đo trông vô lý thì **nghi cái thước trước**, đừng vội kết luận
> về đối tượng đang đo. Một cái thước hỏng còn tệ hơn không có thước.

---

### TC-M.6 — 🔴 Mọi menu dùng hết bề rộng, và sidebar không kéo dài trang

> **Hai lỗi người dùng báo, cùng một gốc: bố cục chừa chỗ trống vô ích.** Lỗi thứ hai
> chỉ hiện ra ở **cửa sổ thấp** nên rất dễ bỏ sót.
> Lỗi thứ nhất được phát hiện khi sửa `/content` ở lát 3b, lỗi thứ hai lộ ra khi đo
> chiều cao ở `TC-3b.11` — cả hai **đều không thuộc riêng trang nào**, nên chữa ở
> `Layout.jsx` và ở thẻ gốc của từng trang chứ không vá lẻ.

**(1) Thừa hai bên ở mọi menu.** 6 trong 7 màn hình có `mx-auto max-w-{4,5,6}xl` ở thẻ gốc:

| Màn hình      | Trần trước         | Thừa mỗi bên @1920 | Thừa mỗi bên @2560 |
| ------------- | ------------------ | ------------------ | ------------------ |
| `/` Tổng quan | `max-w-4xl` 896px  | **384px**          | **704px**          |
| `/economy`    | `max-w-5xl` 1024px | **320px**          | **640px**          |
| `/reports`    | `max-w-5xl` 1024px | **320px**          | **640px**          |
| `/analytics`  | `max-w-5xl` 1024px | **320px**          | **640px**          |
| `/users`      | `max-w-6xl` 1152px | **256px**          | **576px**          |
| `/users/<id>` | `max-w-6xl` 1152px | **256px**          | **576px**          |
| `/content`    | – (đã sửa ở 3b)    | 0                  | 0                  |

> Cột "thừa mỗi bên" **tính từ bề rộng `main` ĐÃ ĐO** (1664px ở 1920, 2304px ở 2560):
> `(main − trần) / 2`. Riêng dòng `/content` là số **đo trực tiếp** ở `TC-3b.12`.
> Ghi rõ cách ra số để lần sau còn kiểm lại được, không phải tin suông.

**(2) Sidebar kéo dài trang.** Ở desktop sidebar để `static` nên cao theo **nội dung menu**
(~550px). Cửa sổ thấp hơn 550px thì nó kéo **cả hàng flex** cao theo ⇒ cả trang cuộn, dù lẽ ra
chỉ phần menu cần cuộn. Ảnh hưởng **cả 6 trang**, không riêng trang nào.

**Bước — đo bề rộng.** Mở từng đường dẫn ở 1280 / 1920 / 2560 rồi dán vào Console:

```js
const main = document.querySelector("main");
const hop = main.firstElementChild.getBoundingClientRect();
const m = main.getBoundingClientRect();
console.log(
  "thừa trái",
  Math.round(hop.left - m.left),
  "thừa phải",
  Math.round(m.right - hop.right),
  "tràn ngang",
  document.documentElement.scrollWidth >
    document.documentElement.clientWidth + 1,
);
```

**Mong đợi:** thừa trái và thừa phải đều **0**, tràn ngang `false` — ở **cả 6 route** và
**cả 3 độ phân giải**. (Khoảng thừa còn lại chỉ là padding **bên trong**, không tính vào đây.)

> ⚠️ **Đừng đo bề rộng thẻ nội dung rồi so với `innerWidth`.** `main` đã bị trừ 256px của
> sidebar, nên so với `innerWidth` sẽ ra **thừa 128px ở mọi màn hình** kể cả khi bố cục đúng.
> Đo sai thước rồi đi sửa mã là cách chắc chắn nhất để làm hỏng thứ đang tốt.

**Bước — đo sidebar ở cửa sổ thấp.** Đặt khung **420px** cao (thấp hơn 550px) rồi dán:

```js
const d = document.documentElement;
const a = document.querySelector("aside");
console.log(
  "khung",
  innerHeight,
  "sidebar",
  Math.round(a.getBoundingClientRect().height),
  "menu tự cuộn",
  a.scrollHeight > a.clientHeight + 1,
  "trang cuộn",
  d.scrollHeight > d.clientHeight + 1,
);
```

**Mong đợi ở 420px:** `sidebar 420` — **bằng đúng khung**, và `menu tự cuộn true`.
Ở `/content` thì `trang cuộn false`. Ở các trang nội dung dài (`/economy`, `/users`) thì
`trang cuộn true` là **đúng** — trang dài thì phải cuộn, cái sai là bị **sidebar** kéo dài.

> 🔴 **Cách phân biệt:** so `d.scrollHeight` với **chiều cao `main`**, không so với 550.
> Nếu `scrollHeight` bằng chiều cao `main` thì sidebar đã hết kéo dài trang.

**Bước — trang dài thì sidebar phải dính.** Ở `/economy` khung 700px, cuộn xuống 400px:
sidebar phải có `top = 0` và `bottom = 700` — **phủ kín màn hình**, không hụt dưới đáy.

**Đã sửa gì:**

| Việc                      | File                                                                                       | Trước                                       | Sau                           |
| ------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------- | ----------------------------- |
| Bỏ trần bề rộng           | `DashboardPage` `UsersPage` `ChildProfilePage` `EconomyPage` `ReportsPage` `AnalyticsPage` | `mx-auto max-w-{4,5,6}xl p-4 sm:p-6 lg:p-8` | `p-4 sm:p-6 lg:p-8 2xl:p-10`  |
| Sidebar cao đúng màn hình | `components/Layout.jsx`                                                                    | `lg:static`                                 | `lg:sticky lg:top-0 lg:h-dvh` |

> 🔴 **`sticky` chứ KHÔNG `fixed`.** `fixed` sẽ đòi chừa lề cho sidebar ở **mọi** trang;
> `sticky` vẫn nằm trong luồng nên không phải chừa lề, mà trang dài thì nó vẫn dính và phủ
> kín màn hình. Nếu chỉ thêm `lg:h-dvh` mà vẫn để `static` thì ở trang dài nền sidebar sẽ
> **hụt** dưới đáy — đổi một lỗi lấy một lỗi khác.
>
> 💡 Ở mobile không đổi gì: sidebar vẫn là ngăn kéo `fixed inset-y-0` (đã đúng từ trước).

> 🔴 **Cổng `S-20` giữ đúng hai điều này.** Luật chỉ cấm `max-w-{2..7}xl` — cỡ **LỚN** dùng
> làm khung trang. Các cỡ nhỏ còn lại đều **hợp lệ** và đã đối chiếu hết trong mã:
> `max-w-xs` (gợi ý), `max-w-sm` (thẻ đăng nhập), `max-w-md` (ô bảng, hộp thoại),
> `max-w-[180px]` (ô bảng). Cấm cả họ `max-w-*` sẽ báo động giả — mà cổng báo động giả thì
> lần sau sẽ bị bỏ qua.
>
> 🔴 **Một lần cổng FAIL SAI, ghi lại vì đúng loại bẫy đang gặp hoài.** Bản đầu của `S-20`
> soi thẻ bằng `/<aside[\s\S]*?>/`, nhưng `Layout.jsx` có một **ghi chú** viết đúng chuỗi
> `` `<aside>` ``, nên regex khớp vào **chính ghi chú đó** rồi dừng ngay tại dấu `>` của nó —
> cổng báo _"thiếu `lg:h-dvh`"_ trong khi mã hoàn toàn đúng. Đã sửa: nhận diện thẻ bằng
> `id="admin-sidebar"` rồi mở một cửa sổ cố định, **không parse thẻ bằng regex**.
> Một cổng **FAIL sai** cũng tệ như cổng **xanh giả**: cả hai đều dạy người ta bỏ qua nó.

**Bước — chú thích có bị dài quá không.** Bỏ trần bề rộng xong thì lộ ra vấn đề ngược lại: đo được 5 đoạn chú thích dài **92 / 96 / 101 / 118 / 125 ký tự một dòng** ở màn 1920. Chặn **chỉ đoạn văn** ở `max-w-[70ch]` — bảng và thẻ vẫn dùng hết bề rộng, nên không mọc lại khoảng trống hai bên.

```js
const ra = [];
for (const p of document.querySelectorAll("main p")) {
  const t = p.textContent.trim();
  if (t.length < 60) continue;
  const rc = p.getBoundingClientRect();
  const fs = parseFloat(getComputedStyle(p).fontSize);
  const soDong = Math.max(1, Math.round(rc.height / (fs * 1.5)));
  const ch = Math.round(t.length / soDong);
  if (ch > 90) ra.push(ch + " · " + t.slice(0, 40));
}
console.log(
  ra.length ? "❌ QUÁ DÀI:\n" + ra.join("\n") : "✅ mọi đoạn ≤ 90 ký tự/dòng",
);
```

**Mong đợi:** `✅ mọi đoạn ≤ 90 ký tự/dòng` ở **cả 6 route**, màn 1920.

> 🔴 **Ngưỡng là 90, không phải 70 — và con số này phải có lý do.** Khoảng đọc thoải mái là
> **45–90 ký tự một dòng**; `max-w-[70ch]` là **đích đến** (dừng ở giữa khoảng), còn **90 là
> ngưỡng báo lỗi** (mép trên). Đặt ngưỡng báo lỗi bằng đúng đích đến là tự tạo FAIL oan.
>
> ⚠️ **Đo lại sau khi chặn:** `/users` 118 → dưới 70 · `/analytics` 92/101/125 → dưới 70 ·
> `/economy` 96 → dưới 70. Riêng `/content` còn **1 đoạn 83 ký tự** — nhưng nó chỉ rộng
> **524px** (đã bị khung bố cục giới hạn sẵn) và 83 nằm trong khoảng đọc được, nên **cố ý
> không chặn thêm**: chặn nữa chỉ làm nó hẹp đi mà không giải quyết vấn đề gì.

> 🔴 **Chặn ở ĐOẠN VĂN, không chặn ở THẺ.** Chặn bề rộng khung thẻ là chính lỗi vừa chữa ở mục **(1)**. Ở `/analytics` cả 3 chú thích dùng chung một component `Section` nên sửa **một chỗ** là đủ cho cả 3 khối A/B/C — sửa từng chỗ là 3 cơ hội để sót.
>
> ⚠️ **Đo bằng `textContent.length / số dòng`, không đo bề rộng.** Cùng một bề rộng 500px, chữ `text-xs` cho ~85 ký tự còn `text-sm` cho ~60 — nên "quá dài" phải quy về **số ký tự một dòng**, không phải số px.

---

### TC-M.7 — 🔴 Nhiều bảng cạnh nhau phải khớp cột

> **Lỗi người dùng báo:** _"phần Kinh tế Xu/XP các cột đang bị lệch"_.

`/economy` vẽ **7 `<table>` riêng** — một bảng cho mỗi nhóm phần thưởng. Mặc định `table-layout: auto` cho **mỗi bảng tự chia cột theo nội dung riêng của nó**, nên cột rộng khác nhau ở từng nhóm và cùng một ô nhập nằm ở ba vị trí:

| Nhóm      | Cột "Hoạt động" | Cột "Xu" | Ô nhập "Xu" ở x |
| --------- | --------------- | -------- | --------------- |
| Bài học   | 625px           | 318px    | 825             |
| Khác      | 516px           | 355px    | 873             |
| Luyện tập | 564px           | 339px    | 934             |

**Đã sửa:** `table-fixed` + `<colgroup>` khai theo **phần trăm** `38.5 / 18 / 18 / 18 / 7.5`.

> 💡 **Vì sao phần trăm chứ không dùng px.** Cột px cố định cũng khớp, nhưng ở màn rộng các ô nhập dồn về một phía và chừa một khoảng trống lớn ở giữa — lại là "thừa khoảng trống". Phần trăm giữ bảng co giãn theo màn hình mà **vẫn khớp**, vì cả 7 bảng đều `w-full` trong cùng một khung bề rộng.

**Bước — kiểm cột khớp:** mở `/economy`, chạy lại ở vài cỡ cửa sổ:

```js
const bangs = [...document.querySelectorAll("main table")];
const box = (r) =>
  r
    ? [...r.children].map((c) => Math.round(c.getBoundingClientRect().left))
    : null;
const ds = bangs.map((t) => box(t.querySelector("thead tr")));
console.log(
  ds.length,
  "bảng ·",
  ds.every((x) => JSON.stringify(x) === JSON.stringify(ds[0]))
    ? "✅ mọi bảng khớp cột"
    : "❌ LỆCH:\n" + ds.map((x) => x.join(",")).join("\n"),
);
```

**Mong đợi:** `7 bảng · ✅ mọi bảng khớp cột` ở **375 / 768 / 1024 / 1280 / 1440 / 1920 / 2560**.

**Bước — kiểm ô nhập không lấn ra ngoài phần đệm:**

```js
const lan = [...document.querySelectorAll("main td")].filter((td) => {
  const el = td.querySelector("input");
  if (!el) return false;
  const pr = parseFloat(getComputedStyle(td).paddingRight);
  return (
    el.getBoundingClientRect().right >
    td.getBoundingClientRect().right - pr + 0.5
  );
});
console.log(lan.length ? "❌ LẤN: " + lan.length : "✅ không ô nào lấn");
```

**Mong đợi:** `✅ không ô nào lấn` — kể cả ở 375px.

> 🔴 **Đừng so ô nhập với mép NGOÀI của ô.** So mép ngoài thì một ô nhập lấn **1px vào phần đệm** vẫn "qua" — mà đó đúng là lỗi đã xảy ra: bản `min-w-[700px]` cho cột `17,5% × 700 = 122,5px`, trừ đệm 24px còn 98,5 > 96 nên trông ổn; nhưng ở 375px bảng chỉ rộng 680px → cột 119px → content box 95px < 96px ⇒ **lấn**. Phải so với **mép trong**.

**`min-w` không phải số chọn cho đẹp — nó tính từ hai ràng buộc:**

| Ràng buộc                | Số                      | Vì sao                                                 |
| ------------------------ | ----------------------- | ------------------------------------------------------ |
| Cột số phải ≥ **120px**  | 18% × 680 = **122,4px** | ô nhập 96px + đệm 2×12px                               |
| `min-w` ≤ khung hẹp nhất | 680 ≤ **687px**         | 1024 − 256 (sidebar) − 64 (đệm) − 15 (cuộn) − 2 (viền) |

> 🔴 **Bài học về cách tính khung:** bản đầu tôi tính tay `1024 − 256 − 64 = 704` rồi chọn `min-w-[700px]` — **đo ra vẫn cuộn ngang 13px** ở màn 1024px. Sai vì **quên thanh cuộn chiếm 15px**. Con số tính tay không thay được con số đo.

> ✅ **Đo được sau khi sửa (7 độ phân giải):** cột "Xu" = **122 / 127 / 124 / 170 / 199 / 282 / 397px** — mọi bảng khớp · `0` ô nhập lấn · `0` tiêu đề bị cắt · chỉ ở 375px bảng mới cuộn ngang trong hộp (đúng thiết kế từ `TC-M.3`).
>
> ✅ **Cổng `S-21` giữ cả hai ràng buộc trên**, kèm **canary hai vế**: phải bắt được `<col>` giả, **và** không được bắt nhầm bảng thiếu `table-fixed`.

---

# ✏️ PHẦN N — GIAI ĐOẠN 3: CMS — lát 3c (sửa bài học từ Admin)

**Màn hình:** `http://localhost:5174/content` → chọn một bài → nút **✏️ Sửa bài này**
**Cần trước:** đã chạy `0008` (3a) và `0009` (lát này).

> **Lát này để làm gì.** 3a đưa nội dung lên DB, 3b cho NHÌN thấy nó. Nhưng muốn sửa một
> lỗi chính tả vẫn phải mở SQL Editor. Lát này mở đường sửa bằng giao diện — CÓ bản nháp,
> publish, phiên bản, và hoàn tác.
>
> 🔴 **Điều quan trọng nhất phải giữ:** sửa qua giao diện **không được** ghi thẳng vào
> bảng nội dung. Ghi thẳng thì bài đổi mà **không sinh phiên bản** và **không tăng
> `content_version`** ⇒ mất đường hoàn tác, và app của bé không biết nội dung đã đổi nên
> vẫn dùng cache cũ. Cổng `S-22` giữ đúng điều này.

---

### TC-3c.1 — Migration `0009` chạy sạch; bảng nháp KHÔNG có policy cho `anon` 🔴

**Bước 1 — chạy `0009_content_drafts.sql`** → `Success. No rows returned`.
**Chạy lại lần 2 cũng phải thành công** (idempotent).

```sql
SELECT policyname, roles::text FROM pg_policies
WHERE tablename = 'content_lesson_drafts';
-- Mong đợi: ĐÚNG 1 dòng, vai trò KHÔNG chứa `anon`
```

```sql
SELECT proname, proacl FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname IN ('bump_content_version','ghi_vet_bai_hoc',
                  'save_lesson_draft','publish_lesson',
                  'rollback_lesson','set_lesson_status')
ORDER BY proname;
-- Mong đợi: 6 dòng, `proacl` KHÔNG chứa `anon=`
```

> 🔴 **Bảng nháp nằm RIÊNG, không phải cột `draft_payload` — đây là chủ ý.** RLS lọc theo
> **DÒNG**, không lọc theo **CỘT**: nếu bản nháp nằm chung dòng với bài `published` thì
> `content_lessons_public_read` cho khách đọc nó theo. Bảng riêng + không policy nào cho
> `anon` là cách duy nhất rLS chặn được — đã kiểm chứng ở `0006` và `0008`.
>
> 🔴 **`REVOKE` thì PHẢI `GRANT` lại.** `REVOKE ALL ... FROM PUBLIC` lấy **luôn** quyền gọi
> của `authenticated` — tức là **admin cũng không gọi được hàm nào**, tính năng chết với
> `permission denied for function`. Lỗi này tôi đã mắc đúng một lần khi viết `0009`, và
> cổng `S-22` giờ canh cặp `REVOKE`/`GRANT` theo số lượng.

---

### TC-3c.2 — Form sửa bài sinh từ schema, không nuốt khoá 🔴 _(tự động)_

```powershell
npm run test:portal:static        # → dòng S-23
```

**Mong đợi:** `6 kiểu · 2690 slide · không nuốt khoá · giữ nguyên kiểu số`.

Cổng này `import()` thằng `admin/src/lib/soanBai.js` và thử **hành vi thât**:

1. Form có **đủ** khoá của cả 6 kiểu slide (thiếu một khoá là bấm Lưu sẽ mất nội dung đó).
2. Khoá nào đang chứa **mảng object** trong 1505 slide thật thì phải được khai trong `mangObject`.
3. `options` toàn số **giữ nguyên kiểu số** khi đi qua ô nhập.
4. Gõ chữ vào mảng toàn số → **từ chối**, không âm thầm ghi ra chuỗi.
5. JSON hỏng → từ chối; JSON đúng → đi qua nguyên vẹn.
6. Xoá khoá có cặp (`shape` ↔ `shapeLabel`) → xoá **cả hai**.
7. Ô bắt buộc để trống → **cảnh báo**, mà vẫn **lưu được**.

> 🔴 **Vì sao phải đo, không tin mắt.** Cả hai rủi ro của một editor **đều không lộ ra khi nhìn**:
> (a) form thiếu một khoá ⇒ bấm Lưu là khoá đó biến mất, slide vẫn hợp lệ;
> (b) `options` `[4]` biến thành `["4"]` ⇒ `options.includes(answer)` không khớp nữa nên
> **câu đó không bao giờ chấm đúng** — không lỗi, không cảnh báo.

---

### TC-3c.3 — Trình sửa chỉ ghi qua HÀM, không ghi thẳng bảng nội dung 🔴 _(tự động)_

```powershell
npm run test:portal:static        # → dòng S-22
```

**Mong đợi:** `0 chỗ ghi thẳng bảng nội dung · 4 hàm RPC · 0009: 6 revoke + 6 grant, không cấp cho anon`.

> 🔴 **Vì sao cần cổng này:** `content_lessons` có policy `FOR ALL` cho admin, nên một
> `.update()` viết thẳng từ trình duyệt **vẫn chạy trơn** — chỉ là không sinh phiên bản.
> Nhìn màn hình admin thì không thể biết.
>
> 💡 **Cổng này đã FAIL hai lần, cả hai đều là lỗi của CÁI THƯỚC:**
> lần 1 bắt nhầm `Set.delete()` trong hàm đóng/mở nhánh (đúng cái bẫy đã gặp ở `S-18`);
> lần 2 regex đòi thao tác ghi phải nối sau **một lời gọi khác** nên bỏ sót dạng phổ biến
> nhất `.from(...).update(...)`. Canary giờ có **4 vế**, trong đó 2 vế là **không được bắt nhầm**.

---

### TC-3c.4 — Lưu nháp: app của bé **KHÔNG** thấy gì

**Bước:** sửa tiêu đề bài `g1-c1-l1` thành một chữ lạ, bấm **Lưu nháp**.

```sql
SELECT lesson_id, title, updated_at, updated_by
FROM public.content_lesson_drafts;
-- Mong đợi: có dòng cho 'g1-c1-l1'

SELECT title, status FROM public.content_lessons WHERE id = 'g1-c1-l1';
-- Mong đợi: TIÊU ĐỀ CŨ, không đổi

SELECT key, value FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: KHÔNG đổi
```

**Và mở `localhost:5173` → bài đó:** nội dung vẫn như cũ.

> 🔴 Đây là điểm khác nhau cốt lõi giữa **nháp** và **publish**. Nếu lưu nháp mà bé đã
> thấy thì bản nháp không còn là bản nháp.

---

### TC-3c.5 — Publish: sinh phiên bản + tăng `content_version` + ghi vết 🔴

**Bước:** sau `TC-3c.4`, bấm **Publish**.

```sql
SELECT version, title, published_by, published_at
FROM public.content_lesson_versions
WHERE lesson_id = 'g1-c1-l1' ORDER BY version DESC;
-- Mong đợi: phiên bản mới nhất mang TIÊU ĐỀ MỚI

SELECT title, status, published_at FROM public.content_lessons WHERE id = 'g1-c1-l1';
-- Mong đợi: tiêu đề mới, status = 'published'

SELECT count(*) FROM public.content_lesson_drafts WHERE lesson_id = 'g1-c1-l1';
-- Mong đợi: 0 (đã xoá bản nháp)

SELECT key, value FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: ĐÃ TĂNG 1

SELECT action, entity_id, before, after, reason
FROM public.admin_audit_log
WHERE action = 'lesson.publish' ORDER BY created_at DESC LIMIT 1;
-- Mong đợi: 1 dòng, before/after là HÌNH DẠNG (title, status, slides) — KHÔNG phải payload đầy đủ
```

> 🔴 **Vì sao 4 việc trên nằm trong MỘT hàm SQL:** gọi lần lượt từ trình duyệt thì đứt
> giữa chừng là có thật — mất 4G ở việc thứ 3 là bài đã đổi mà phiên bản chưa ghi.
>
> 💡 **Vết kiểm toán ghi NGAY TRONG hàm**, không gọi `logAudit` từ JS, nên thao tác và vết
> của nó không thể tách rời. Và vết chỉ ghi **hình dạng** (tiêu đề, trạng thái, số slide)
> chứ không ghi payload: một bài 11 slide ≈ 20 KB, ghi nguyên payload vào log thì mỗi lần
> publish lại nhân đôi khối lượng đó — mà bản đầy đủ đã nằm ở `content_lesson_versions` rồi.

---

### TC-3c.6 — Sửa đáp án sai bị **CHẶN**, không lưu được 🔴

**Bước:** mở một slide `quiz`, ở ô **Các lựa chọn** xoá một dòng, rồi thử bấm **Lưu nháp**.

**Mong đợi:**

- Ô **Đáp án đúng** là **ô chọn** lấy từ chính danh sách lựa chọn (không gõ tay được).
- Nếu đáp án hiện tại không còn nằm trong lựa chọn → ô chọn ghi rõ `đang là X (không có trong lựa chọn)` **và nút Lưu bị mờ**.
- Khung đỏ liệt kê lỗi, dạng `slide 3 (quiz): \`answer\` = 4 KHÔNG nằm trong \`options\``.

> 🔴 **Lỗi này là loại nguy hiểm nhất ở một CMS nội dung:** đáp án ngoài lựa chọn thì app
> **vẫn chạy bình thường**, chỉ là **không bao giờ chấm đúng câu đó**. Bé trả lời đúng mà bị
> báo sai — và không ai biết cho tới khi có phụ huynh phàn nàn. Nên phải chặn ở lúc GHI.

> ✅ **Đã bấm thật qua giao diện (2026-09-20).** Mở `g1-c1-l1` → slide 5 _Câu hỏi_
> (`options = 1,2,3,4`, đáp án `3`) → xoá dòng `3` khỏi ô lựa chọn:
>
> | Ô                  | Trước    | Sau                                                                                                           |
> | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------- |
> | Đáp án             | `3. 3`   | **`— đang là 3 (không có trong lựa chọn) —`**                                                                 |
> | Lưu nháp · Publish | bấm được | **BỊ MỜ cả hai**                                                                                              |
> | Khung đỏ           | không    | _"Đáp án hiện tại KHÔNG nằm trong danh sách lựa chọn — bài này không chấm được câu đó. Chọn lại một đáp án."_ |
>
> ⇒ Chặn ở **cả hai tầng**: nút mờ ở giao diện **và** `validateSlide` ở tầng hàm. Đã tải lại
> trang để bỏ thay đổi — **không lưu gì**, không tạo bản nháp.

---

### TC-3c.7 — Hoàn tác, và hoàn tác được **chính việc hoàn tác** 🔴

**Bước:** sau `TC-3c.5`, ở khối **Lịch sử phiên bản**, bấm **Quay về bản này** ở phiên bản cũ hơn.

```sql
SELECT version, title FROM public.content_lesson_versions
WHERE lesson_id = 'g1-c1-l1' ORDER BY version;
-- Mong đợi: BẢN CŨ VẪN CÒN, và có thêm một phiên bản MỚI mang nội dung cũ
```

**Bước 2:** lặp lại — quay về bản vừa bị bỏ. Phải làm được.

> 🔴 **Hoàn tác KHÔNG PHẢI xoá.** Nó ghi một phiên bản `max+1` mang nội dung cũ. Nhờ vậy
> lịch sử vẫn chỉ ghi thêm, không mất dấu "đã từng publish bản lỗi", và quay lại bản vừa
> bị bỏ được. Nếu xoá/sửa thì bản đó biến mất vĩnh viễn.

---

### TC-3c.8 — Rút bài: van an toàn 🔴

**Bước:** bấm **Rút bài** ở một bài đang `published`.

```sql
SELECT status FROM public.content_lessons WHERE id = '<mã bài>';
-- Mong đợi: 'draft'

SELECT key, value FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: ĐÃ TĂNG (rút bài LÀM ĐỔI thứ app của bé nhận được)
```

**Và mở app của bé ở chế độ Khách:**

```js
const r = await __sb.from("content_lessons").select("id").eq("id", "<mã bài>");
console.log(r.data);
// Mong đợi: [] — bài đã rút KHÔNG còn lộ ra
```

**Đăng lại:** bấm **Đăng lại** → về `published`.

> 🔴 **Vì sao là "rút" chứ không phải "xoá":** `question_attempts.lesson_id` và
> `support_tickets.lesson_id` đang trỏ tới id đó — xoá là làm hỏng lịch sử. Và khi một bài
> lộ lỗi thì việc cần làm đầu tiên là **rút nó xuống** (5 giây), không phải sửa cho đúng
> rồi mới đăng (có thể 10 phút, mà suốt 10 phút đó bé vẫn thấy câu sai).

---

### TC-3c.9 — Khách / user thường **KHÔNG** gọi được hàm publish

**Chuẩn bị:** Console **app của bé (`5173`)**, **đang là Khách**.

```js
const r = await __sb.rpc("publish_lesson", { p_lesson_id: "g1-c1-l1" });
console.log(r.error?.message ?? "⚠️ GỌI ĐƯỢC — LỖ HỔNG");
// Mong đợi: lỗi quyền (HTTP 401) — KHÔNG được chạy được
```

```js
const r2 = await __sb.from("content_lesson_drafts").select("*");
console.log({ soDong: r2.data?.length, error: r2.error?.message });
// Mong đợi: 0 dòng (RLS chặn — bảng nháp không có policy cho anon)
```

> 🔴 **HTTP 401 chứ không phải 404 là bằng chứng hàm ĐÃ TỒN TẠI** — tức `0009` đã tạo hàm
> thành công, chỉ là bị REVOKE. Cùng cách đọc kết quả như `D-13` ở `TC-2.30`.

---

### TC-3c.10 — Trang **Tham khảo** (`/reference`): chỉ đọc, và không nói sai về app 🔴

**Màn hình:** `http://localhost:5174/reference` (menu trái **📖 Tham khảo**, ngay sau _Nội dung bài học_)

> **Vì sao có trang này.** Người dùng mở trình sửa bài và thấy ba ô chọn — **Kiểu bài**,
> **Kiểu slide**, **Biểu cảm linh vật** — nhưng **không có gì để tra**: chọn `celebrate` hay
> `proud` thì khác gì nhau? Khoá nào bắt buộc? Gõ xong bé thấy gì? Trình sửa chỉ hiện **tên khoá**.

**Trang có 5 khối:** A _Kiểu bài_ · B _bảng 6 kiểu slide_ · C _từng kiểu dùng khi nào / bé thấy gì_ ·
D _biểu cảm linh vật_ (có mặt thật) · E _các khoá dễ gõ nhầm_.

```powershell
npm run test:portal:static        # → dòng S-26
```

**Mong đợi:** `chỉ đọc ✓ · 9 biểu cảm khớp app (cả mặt) · 6 kiểu slide đủ nhãn`.

#### 🔴 Ba điều ĐO ĐƯỢC từ DB thật (`2026-09-20`) — và hai cái là lỗi thật

| Đo                          | Kết quả                                                            | Nghĩa là                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `lesson_type`               | **cả 362 bài = `learn`**                                           | App **không** xử lý khác nhau giữa 3 giá trị ⇒ đổi qua lại chẳng thay đổi gì trên màn hình bé                                     |
| `mascotMood`                | 724 lượt, **chỉ ở `story` + `summary`** (362 + 362)                | Ở kiểu khác gõ bio cảm cũng **không có tác dụng gì**                                                                              |
| `mascotMood` ở `summary`    | **362/362 slide đều có**, mà `SummarySlide` **không đọc khoá này** | ✅ **ĐÃ SỬA (2.24):** chuyển thành khoá **tuỳ chọn** — không phải điền một thứ bé không bao giờ thấy nữa                          |
| `celebrate`                 | **93 slide** đang dùng                                             | ✅ **ĐÃ SỬA (2.24):** gộp hai bản từ vựng về **một** (`client/src/data/mascotFaces.js`) ⇒ nay hiện đúng **🎉** (trước đó hiện 😊) |
| `answer` vs `correctAnswer` | `quiz` dùng `answer`, `dialogue` dùng `correctAnswer`              | Hai tên khác nhau cho cùng một ý — gõ sai tên là trình sửa báo thiếu                                                              |

> ⚠️ **Số lượng trong trang là ẢNH CHỤP ngày đo, không phải số sống.** Trang cố ý **không truy
> vấn DB**: nạp cả 362 `payload` chỉ để đếm là ~800 KB cho một trang tra cứu — cùng lý do
> đã ghi ở **PHẦN K** (màn hình nội dung chỉ nạp `payload` của bài đang chọn).

> 🔴 **Cổng `S-26` giữ bốn điều, mỗi điều có canary hai vế:**
> (1) bảng biểu cảm trong trang phải có **ĐÚNG tập giá trị** của `MASCOT_FACES`
> (`client/src/data/mascotFaces.js`) — thừa hoặc thiếu một giá trị là đỏ;
> (2) **từng dòng phải đúng MẶT** của từ vựng đó — đây mới là điều khiến trang không thể nói sai về
> màn hình của bé (đổi mặt 1 dòng thì phép kiểm phải bắt đúng 1 dòng);
> (3) `LessonPage` phải thật sự có `faceOf(content.mascotMood)` — trang khẳng định “bé thấy mặt này”
> nên slide không được tự chọn mặt riêng;
> (4) bảng nhãn phải phủ **mọi** kiểu trong `SLIDE_TYPES` — thiếu nhãn là ô chọn hiện chữ tiếng Anh;
> (5) trang **không** được chạm Supabase / không có thao tác ghi.
>
> ⚠️ **Cổng này từng canh bằng cách so với chuỗi `content.mascotMood === "..."` trong
> `LessonPage`.** Chuỗi đó bị xoá ở **2.24** (thay bằng `faceOf()`), nên phép so cũ chắc chắn
> **FAIL** — đã thay bằng phép so với **từ vựng chung**, mạnh hơn vì kiểm được cả mặt.

---

### TC-3c.11 — Tạo bài học MỚI từ Admin (`0013`) 🔴

**Màn hình:** `http://localhost:5174/content` → mở một **chương** → cuối danh sách bài có nút
**➕ Thêm bài học vào chương này**
**Cần trước:** đã chạy `0013_content_report_and_create_lesson.sql`

> **Vì sao cần.** Trước mục này, Admin chỉ **sửa** được 362 bài đã có — muốn thêm bài phải mở
> SQL Editor. Đây là thao tác GHI đầu tiên tạo ra **dòng mới** trong bảng nội dung, nên nó có
> ba cái bẫy riêng — cả ba đều **không có triệu chứng nào trên màn hình**:
>
> | Bẫy                               | Hậu quả nếu quên                                            |
> | --------------------------------- | ----------------------------------------------------------- |
> | Quên `REVOKE … FROM anon`         | Khách tạo được bài trong DB (đúng bẫy đã sập ở `0012`)      |
> | Quên `GRANT … TO authenticated`   | Admin cũng không tạo được, nút chết với `permission denied` |
> | Bài mới để `status = 'published'` | Bài 1 slide giữ chỗ **lộ ra cho bé ngay lúc bấm Tạo**       |

**Chạy cổng tự động trước:**

```powershell
npm run test:portal:static        # → dòng S-27
```

**Mong đợi:** `khoá cho khách ✓ · cấp lại cho admin ✓ · bài mới luôn \`draft\` ✓ · nút có gọi hàm ✓`

**Bước — tạo thật:**

1. Mở chương bất kỳ (ví dụ `Chủ đề 1`) → bấm **➕ Thêm bài học vào chương này**
2. Gõ tên, ví dụ `Bài 13: Luyện tập chung` → bấm **Tạo bài**

**Mong đợi trên màn hình:**

- Bài mới hiện trong cây, có nhãn vàng **nháp**, và **trình sửa mở luôn** (không phải bấm thêm).
- Bài mới có **đúng 1 slide** `Kể chuyện` giữ chỗ, chữ ghi rõ _"(Bài mới — chưa có nội dung…)"_.

**Kiểm chứng:**

```sql
SELECT id, title, status, sort_order, jsonb_array_length(payload -> 'slides') AS so_slide
  FROM public.content_lessons
 WHERE chapter_id = 'g1-c1' ORDER BY sort_order DESC LIMIT 3;
-- Mong đợi: dòng mới nhất có status = 'draft', sort_order = max+1

SELECT key, value FROM public.app_config WHERE key = 'content_version';
-- Mong đợi: KHÔNG ĐỔI — tạo bản nháp không làm đổi thứ app của bé nhận được

SELECT created_at, action, entity_id, after, reason
  FROM public.admin_audit_log WHERE action = 'lesson.create'
 ORDER BY created_at DESC LIMIT 3;
-- Mong đợi: 1 dòng, `after` ghi hình dạng (chapter_id, title, status, slides) — KHÔNG có payload
```

**Và kiểm app của bé:** mở `localhost:5173` → vào chương đó → **KHÔNG thấy** bài mới (vì còn `nháp`).

> ✅ **Đã bấm thật ngày 2026-09-20 — và nó bắt được một lỗi thật mà cổng tĩnh không thể thấy.**
>
> | Việc                                   | Kết quả đo được                                                                                        |
> | -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
> | Bấm **Tạo bài** trong `Chủ đề 1` lớp 1 | Dòng mới `g1-c1-l13`, `status = 'draft'`, `sort_order = 12`, **đúng 1 slide** `Kể chuyện`, chữ giữ chỗ |
> | `app_config.content_version`           | **vẫn 21** — tạo bản nháp không làm đổi thứ app của bé nhận                                            |
> | `admin_audit_log`                      | 1 dòng `lesson.create`, `after` chỉ ghi hình dạng (chapter_id, title, status, slides) — không payload  |
> | App của bé (`5173`)                    | **không thấy** bài mới                                                                                 |
>
> 🔴 **Lỗi thật tìm được khi bấm: `Cannot read properties of null (reading 'id')` → màn hình lỗi.**
> Bấm **Tạo bài** xong, cây nội dung **không vẽ lại**. Nguyên nhân: hàm tạo bài đặt _chương đang mở_
> và _bài đang sửa_ trong **cùng một nhịp**, còn chi tiết bài tải **bất đồng bộ** — nên có đúng **một
> khung hình** `chiTiet` còn `null` và màn hình cố mở trình sửa bài với `null`. Đường "✏️ Sửa bài này"
> không bao giờ sập vì nút đó chỉ hiện khi chi tiết đã tải xong — nên lỗi này **chỉ lộ ra khi bấm tạo
> thật**, không cổng tĩnh nào thấy được. Đã sửa bằng một điều kiện tại chỗ vẽ
> (`dangSuaBai === dangChon && chiTiet?.id`) kèm ghi chú giải thích ngay trong mã.
>
> 🧹 **Dọn dẹp:** cả 2 bài dùng để thử đã **xoá** qua chính màn hình Admin (bảng nội dung có policy
> `FOR ALL` cho admin) → DB về đúng **362 bài · 0 nháp · `content_version = 21`**. Hai dòng
> `lesson.create` trong `admin_audit_log` **ở lại theo thiết kế** (sổ ghi là bảng chỉ-thêm).

> 🔴 **Mã bài sinh ở MỘT chỗ, trong CÙNG transaction với việc chèn.** Mã có ý nghĩa
> (`g1-c1-l13` = lớp 1 · chương 1 · bài 13) và `question_attempts.lesson_id` +
> `support_tickets.lesson_id` đang trỏ tới đúng dạng mã này. Hai trình duyệt cùng bấm "Tạo"
> một lúc mà mỗi bên tự tính số thì cả hai ra `-l13`. Số được đếm theo **MÃ** (không đếm số
> dòng) nên mã không bao giờ trùng, kể cả sau khi có bài bị rút.

> 💡 **Bước tiếp theo sau khi tạo:** thêm slide, xoá slide giữ chỗ, rồi **Đăng** — lúc đó mới
> tăng `content_version` và bé mới thấy (`TC-3c.5`).

---

### TC-3c.12 — Xoá MỘT bài học, có chốt gõ chữ 🔴 _(ĐỔI quyết định `D4` — vẫn KHÔNG xoá chương)_

**Màn hình:** `http://localhost:5174/content` → chọn một bài → khung chi tiết → **🗑️ Xoá bài này**
**Cần trước:** đã chạy `0015_xoa_bai_hoc_tu_giao_dien.sql`

```powershell
npm run test:portal:static        # → dòng S-30
```

**Mong đợi:** `hàm SQL chỉ admin ✓ · không đụng chương ✓ · khoá cho khách ✓ · chốt gõ chữ \`delete this lesson\` ✓ · nút mờ tới khi khớp ✓ · đi qua RPC ✓`

> 🔴 **Vì sao có chốt gõ chữ.** `D4` từng kết luận _"không có chỗ xoá, dùng Rút bài"_; người dùng
> yêu cầu ngược lại. Hộp thoại OK/Huỷ chỉ chặn **bấm hụt**, không chặn **bấm ẩu** — nên phải GÕ.
> Cụm chữ để **tiếng Anh** một cách cố ý: nó không trùng nhãn nào trong app, nên không thể gõ ra do
> đang bấm lụi. Vẫn **không** có đường xoá CHƯƠNG — cổng `S-30` canh đúng điều đó.

**Bước — đo trên `/content`:**

1. Chọn một bài bất kỳ → khung chi tiết phải có nút **🗑️ Xoá bài này** (cạnh **✏️ Sửa bài này**).
2. Bấm nút đó → hộp thoại hiện: tên bài + mã bài + trạng thái, cảnh báo **không hoàn tác được**,
   và (nếu có) số **lượt làm bài / báo lỗi** đang trỏ tới bài — kèm lời khuyên dùng **Rút bài**.
3. Ô xác nhận — **ba trạng thái bắt buộc đúng**:

| Gõ gì                               | Nút `Xoá vĩnh viễn`         |
| ----------------------------------- | --------------------------- |
| (để trống)                          | **MỜ**                      |
| `delete this lessonx` (sai 1 ký tự) | **MỜ** + nhắc _"Chưa khớp"_ |
| `delete this lesson` (đúng)         | **BẬT**                     |

4. `Esc` hoặc **Huỷ** → đóng hộp thoại, **không xoá gì**.

**Kiểm chứng sau khi xoá thật:**

```sql
SELECT id, title FROM public.content_lessons WHERE id = 'g1-c1-l13';   -- Mong đợi: 0 dòng

SELECT action, entity_id, before, actor_id FROM public.admin_audit_log
 WHERE action = 'lesson.delete' ORDER BY created_at DESC LIMIT 1;
-- Mong đợi: ĐÚNG 1 dòng cho lần bấm đó, `actor_id` = tài khoản vừa bấm
--   🔴 Nếu ra 2 dòng cho cùng một lần bấm: hàm `delete_lesson` đang ghi vết trùng với
--      trigger `0014` — xem quyết định `F3`.
```

> ✅ **Đã đo phần giao diện (2026-09-20):** nút có mặt ✓ · hộp thoại mở với đủ cảnh báo ✓ ·
> nút **mờ** khi chưa gõ, vẫn **mờ** khi gõ sai (`delete this lessonx`) + nhắc _"Chưa khớp"_,
> **bật** khi gõ đúng ✓ · `Esc` đóng ✓ · bấm nút khi chưa có hàm ⇒ hộp thoại hiện
> _"Chưa chạy migration `0015_…`"_ và **không xoá gì** ✓ · hộp thoại của `g1-c1-l1` hiện đúng số
> thật: **1 báo lỗi câu hỏi** đang trỏ tới bài đó ✓ · **0 lỗi trang**.
>
> ✅ **Đã đo VÒNG XOÁ THẬT qua nút (2026-09-20, sau khi chạy `0015`):**
>
> | Kiểm                                       | Kết quả đo được                                                                                                                                                                                   |
> | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Tạo + `published` một bài thử, rồi chọn nó | chi tiết hiện `Đã publish` ✓                                                                                                                                                                      |
> | Gõ đúng cụm → bấm `Xoá vĩnh viễn`          | nút **bật** ✓ · hộp thoại tự **đóng** ✓                                                                                                                                                           |
> | Thông báo sau khi xoá                      | _"🗑️ Đã xoá bài `g1-c1-l13` khỏi DB. Cây bên trái vừa được tải lại…"_ ✓                                                                                                                           |
> | Cây tự tải lại                             | chương 1: **13 → 12 bài** · đầu trang về **362 bài** · bài thử không còn trong cây ✓                                                                                                              |
> | DB                                         | `content_lessons` còn **0 dòng** cho mã đó ✓ · bản nháp của nó cũng bị xoá theo (`content_lesson_drafts` = **0**) ✓                                                                               |
> | Sổ kiểm toán                               | **đúng 1 dòng mới** (3 → 4), `actor_id` = tài khoản admin, `before` = `{title: "BÀI THỬ XOÁ BẰNG NÚT", slides: 1, status: "published", chapter_id: "g1-c1"}` ✓ **không** 2 dòng (quyết định `F3`) |
> | `content_version`                          | `23 → 24` (**tăng 1** vì bài đã `published`) ✓                                                                                                                                                    |
>
> 🔴 **Và phép đo này bắt được một lỗi CHỮ trong mã:** dòng vết mới nhất ghi
> `reason = "Xoá thẳng trong DB (không qua giao diện)"` — trong khi lần xoá đó **đi từ giao diện**.
> Trigger `0014` không biết ai gọi nó, nên câu đó thành **nói dối** ngay khi `0015` thêm nút xoá.
> `0016` sửa: `reason` **suy từ `auth.uid()`** (NULL = xoá bằng SQL · khác NULL = xoá từ giao diện) —
> cùng nguồn sự thật với `actor_id` nên hai trường không thể mâu thuẫn.

---

# 🔄 PHẦN O — GIAI ĐOẠN 3: CMS — lát 3d (app của bé đọc từ DB)

> **Cần trước:** 3a (`0008`) + 3c (`0009`) + `0010` (bù cột `age_range`).
>
> ⚠️ **Đây là lát DUY NHẤT trong cả GĐ 3 làm đổi hành vi của app.** Mọi thứ trước đó chỉ
> dựng thêm chỗ chứa.

### Cách bật

```powershell
# 1. Trong Supabase SQL Editor, dán lần lượt:
#    supabase/migrations/0010_content_age_range.sql
#    supabase/migrations/0011_bat_doc_noi_dung_tu_db.sql
# 2. Xong. KHÔNG cần build lại app.
```

> 🔙 **Tắt (kill switch) — một câu, không cần build:**
>
> ```sql
> UPDATE public.app_config SET value = '"static"'::jsonb WHERE key = 'content_source';
> ```
>
> 🔴 **Tắt KHẨN CẤP thì gạt công tắc TRƯỚC, đừng sửa nội dung trước.** Tắt mất 5 giây; sửa
> cho đúng có thể mất 10 phút, và suốt 10 phút đó hàng trăm bé vẫn đang thấy bài lỗi.

---

### TC-3d.1 — `0010` + `0011` chạy sạch, công tắc đã bật 🔴

```sql
SELECT id, name, age_range FROM public.content_grades ORDER BY id;
-- Mong đợi: 5 dòng; age_range: 6-7 · 7-8 · 8-9 · 9-10 · 10-11 tuổi

SELECT key, value FROM public.app_config
WHERE key IN ('content_source','content_version') ORDER BY key;
-- Mong đợi: content_source = "remote"
```

> ⚠️ **Chạy `0010` TRƯỚC `0011`.** Bật công tắc trước khi bù `age_range` thì phụ huynh sẽ
> thấy `Lớp 1 ()` — xem `TC-3d.2` để biết vì sao phát hiện được điều này.

---

### TC-3d.2 — Cây dựng từ DB giống hệt cây file tĩnh, **từng khoá** 🔴 _(tự động)_

```powershell
npm run test:portal:static        # → dòng S-24
```

**Mong đợi:** `5 lớp · 51 chương · 459 bài · 2690 slide — khớp từng khoá · canary bắt được lỗi ageRange`.

Cổng này lấy **chính 5 file tĩnh**, trải chúng ra thành đúng hình dạng dòng DB mà
`scripts/migrate-content.mjs` ghi, rồi dựng lại cây bằng `dungCayNoiDung.js` và so với cây
gốc — **từng khoá một**, không chỉ đếm tổng. Canary chứng minh phép so **bắt được** lỗi
thiếu `ageRange` và lỗi mất slide.

> 🔴 **Vì sao phải so từng khoá.** Cây dựng từ DB là thứ app của bé **ĐỌC THAY** cho file
> tĩnh. Thiếu một khoá thì không lỗi, không cảnh báo — chỉ là chỗ đó `undefined`. Lỗi có
> thật đã xảy ra ngay trong lát này: `ParentDashboard.jsx` in `{gr.name} ({gr.ageRange})`,
> mà `content_grades` không có cột đó ⇒ phụ huynh thấy **`Lớp 1 ()`**.
>
> 💡 **Cách tìm ra:** `node scratch/print_tree_shape.mjs` — in tập khoá của grade / chapter /
> lesson trong file tĩnh. Đối chiếu bằng mắt với cột trong `0008` thì **không tìm ra**; phải
> đo. Cùng bài học với hai lần kế hoạch 3a ghi sai khoá bắt buộc.

---

### TC-3d.3 — Sửa bài trên Admin → app của bé nhận nội dung mới, KHÔNG build 🔴

**Bước:**

1. Admin → **Nội dung bài học** → chọn `g1-c1-l1` → **Sửa bài này**
2. Đổi một chữ trong đoạn văn của slide 1 (chỗ bé nhìn thấy ngay) → **Lưu nháp** → **Publish**
3. Ghi lại số `content_version`
4. **Không build gì cả.** Mở lại app của bé (`5173`) → vào bài `g1-c1-l1`

**Mong đợi:**

- Slide 1 hiện **chữ vừa sửa**.
- Log dev in `[nội dung] đọc từ DB: 5 lớp · 41 chương · 362 bài · 1505 slide · phiên bản N` với `N` = số mới.
- Cache đã đổi:

```js
const c = JSON.parse(localStorage.getItem("toan-vui-content"));
console.log(c.version, c.grades.length);
// Mong đợi: N · 5
```

> 🔴 **Đây là test chứng minh toàn bộ giá trị của GĐ 3.** Trước đây sửa một lỗi chính tả là
> phải build lại và phát hành bản mới — mà trẻ đã cài app thì có thể **không bao giờ** nhận
> được bản đó.
>
> ⚠️ **Nội dung mới KHÔNG hiện ngay nếu bé đang mở app.** Cây mới ghi vào bộ nhớ và có hiệu
> lực ở lần ĐỌC KẾ TIẾP (sang bài khác, hoặc mở lại app). Đây là chủ ý — xem quyết định
> **C2** trong `phase_3c_3d_decisions.md`: đổi nóng thì bé đang học dở sẽ bị đẩy về slide 1.

---

### TC-3d.4 — Offline vẫn học được

**Bước 1 — đã mở app 1 lần cho cache vào (làm `TC-3d.3` trước).**
**Bước 2:** DevTools → Network → **Offline** → tải lại trang → vào một bài học.

**Mong đợi:** bài học hiện đầy đủ slide, **không màn hình trắng**, không lỗi đỏ.

**Bước 3 — xoá cache rồi vẫn offline:**

```js
localStorage.removeItem("toan-vui-content");
```

→ tải lại → vào bài → **vẫn phải học được** (rơi về file tĩnh trong bundle).

> 🔴 Thứ tự ưu tiên là **cache → DB → file tĩnh**, và mắt xích cuối **luôn có sẵn** vì file
> tĩnh nằm ngay trong bundle. Offline lần đầu (chưa từng mở app) vẫn dùng được.

> ✅ **Đã đo thật (2026-09-20)** bằng cách chặn hết `*.supabase.co` (mọi request `net::ERR_FAILED`):
>
> | Ca                                  | Kết quả đo                                                                                            |
> | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
> | Offline, **còn** cache (v21)        | `g1-c1-l1` hiện **1/6** slide, tiêu đề + đoạn văn đúng, cache giữ 21 · 5 lớp                          |
> | Offline, **xoá** `toan-vui-content` | **Vẫn học được**: vẫn **1/6** slide, tiêu đề đúng, cache = `null` ⇒ rơi về **file tĩnh trong bundle** |
> | Mở mạng lại                         | cache về **21** · 5 lớp                                                                               |
>
> ⚠️ Không màn hình trắng ở cả hai ca — đúng như thiết kế.

---

### TC-3d.5 — Gạt công tắc về `static`: app dùng lại file tĩnh **VÀ xoá cache** 🔴

```sql
UPDATE public.app_config SET value = '"static"'::jsonb WHERE key = 'content_source';
```

**Bước:** tải lại app của bé.

```js
console.log(localStorage.getItem("toan-vui-content"));
// Mong đợi: null — cache ĐÃ BỊ XOÁ
```

**Và trong Console:** cây phải là cây file tĩnh (`5 lớp · 41 chương`).

**Nhớ gạt lại `remote` sau khi thử xong** — nếu không thì GĐ 3 coi như đã tắt.

> 🔴 **Chỉ "không tải thêm" là CHƯA ĐỦ.** Máy nào đã tải cây từ DB rồi thì vẫn dùng cây đó
> mãi, và công tắc thành vô dụng. Đây là chỗ dễ hiểu sai nhất của cơ chế kill switch — mà
> nó lại là thứ duy nhất để tắt GĐ 3 khi có sự cố.

> ✅ **Đã đo (2026-09-20) — nhưng bằng cách MÔ PHỎNG công tắc, chưa `UPDATE` DB thật.**
> Chặn riêng request `app_config` và trả về `content_source = "static"` (đúng giá trị mà
> câu SQL sẽ ghi) rồi tải lại trang:
>
> | Chốt                               | Trước    | Sau khi công tắc = `static`         | Về lại `remote` |
> | ---------------------------------- | -------- | ----------------------------------- | --------------- |
> | `localStorage['toan-vui-content']` | có (v21) | **`null` — ĐÃ XOÁ** ✅              | có (v21)        |
> | Trang chương `/learn/1/g1-c1`      | 12 bài   | **vẫn đủ 12 bài** (từ file tĩnh) ✅ | 12 bài          |
>
> ⇒ Đường mã đúng: gạt sang `static` thì **xoá cache** và **chạy tiếp bằng file tĩnh**.
> Còn lại chỉ là câu `UPDATE` (người dùng chạy trong SQL Editor) — giá trị ghi vào
> `app_config` **y hệt** giá trị đã mô phỏng, nên đường mã đã được kiểm.
>
> 🔴 **Cách đo này KHÔNG thay được ca "DB thật hỏng rồi mới gạt công tắc"** — đó là ca thật
> khi cần dùng kill switch, và nó còn kiểm cả việc `UPDATE` có chạy được khi mọi thứ khác đang lỗi.

---

### TC-3d.6 — Khách đọc được cây, nhưng KHÔNG thấy bài nháp 🔴

**Chuẩn bị:** Console ở app của bé, **đang là Khách** (chưa đăng nhập).

```js
const g = await __sb.from("content_grades").select("id,name,age_range");
const c = await __sb.from("content_chapters").select("id").limit(1000);
const l = await __sb.from("content_lessons").select("id,status").limit(1000);
console.log(g.data?.length, c.data?.length, l.data?.length, g.error, l.error);
// Mong đợi: 5 · 51 · 459 · null · null
// (Không đọc được thì chế độ Khách không mở nổi danh sách lớp)
```

```js
const d = await __sb.from("content_lessons").select("id").eq("status", "draft");
console.log(d.data);
// Mong đợi: [] — bài đã rút KHÔNG lộ ra cho khách
```

> ⚠️ **Phải thử lại phép thứ hai sau khi bật công tắc**, dù `TC-3a.2` đã thử ở lát 3a. Lý do:
> từ đó tới giờ chưa ai đọc bảng này bằng quyền khách với nội dung thật đã được sửa, và
> `TC-3c.8` vừa tạo ra bài `draft` thật đầu tiên.

---

### TC-3d.7 — Sửa bài xong, app của bé **đang mở** có nhận được không? 🔴

> 🐞 **Ca này sinh ra từ một lỗi có thật, không phải suy đoán.** Bản đầu chỉ nạp nội dung
> **một lần** lúc mở app. Đo thật: bé mở app ở trang chương, admin publish, chờ 6 giây ⇒
> tiêu đề vẫn cũ, và **không có request nào** được gửi đi. Nghĩa là app **không bao giờ**
> biết admin vừa sửa — cho tới khi tắt hẳn app. Cổng `S-25` canh đúng chỗ này.

**Chuẩn bị:** hai cửa sổ cạnh nhau — app của bé (`5173`) và Admin (`5174`, đã đăng nhập).

| Bước | Làm gì                                                              | Mong đợi                                                                |
| ---- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1    | App bé: mở **trang chương** (danh sách bài), ví dụ `/learn/1/g1-c1` | Thấy tiêu đề bài 1 **cũ**                                               |
| 2    | App bé: **chuyển sang cửa sổ Admin**, để app bé nằm nền             | —                                                                       |
| 3    | Admin: sửa tiêu đề bài 1 → **Lưu nháp** → **Publish**               | Báo `Đã publish thành phiên bản N`                                      |
| 4    | App bé: **quay lại cửa sổ app** (bấm vào tab, KHÔNG tải lại trang)  | **Tiêu đề MỚI hiện ra**, không cần làm gì thêm                          |
| 5    | Mở DevTools → Network, lọc `app_config`                             | Có **đúng 1** request `app_config` khi quay lại tab — không tải cả cây  |
| 6    | Lặp lại bước 2–4 nhưng **không sửa gì** ở Admin                     | Quay lại tab: có `app_config`, và **KHÔNG** có `content_grades/lessons` |

### Cách **A** — kiểm lại khi bé ĐỔI MÀN HÌNH (đã làm 2026-09-20)

> 🔴 **Vì sao phải thêm.** App **không có kênh đẩy** — nó chỉ biết admin vừa sửa bằng cách
> **hỏi**. Trước đây nó hỏi ở đúng 2 thời điểm (khởi động · quay lại tab), nên bé **ngồi yên
> một màn hình** thì không có sự kiện nào bắn ra ⇒ bài admin vừa rút **vẫn hiện mãi**. Đo được:
> chờ **8 giây**, cây không đổi, cache đứng ở 12.
>
> 💡 Bé thì bấm đổi màn hình liên tục, nên hỏi thêm ở **mỗi lần đổi màn hình** là mốc rẻ
> nhất mà vẫn bắt được ca "ngồi yên rồi bấm đi". Giá: 1 request `app_config` nhỏ mỗi lần đổi
> màn (đã chặn 5s trong `contentSource`); tải cả cây **chỉ khi số phiên bản đã đổi**.

| Bước                                                                    | Đo được trên app của bé                         |
| ----------------------------------------------------------------------- | ----------------------------------------------- |
| Mở `/learn/1/g1-c1`, bài đang publish                                   | `coBai1: true` · **12 bài** · cache 15          |
| Admin **rút bài** (không đụng gì tới tab của bé)                        | `status = draft` · `content_version` **16**     |
| Bé sang trang chủ rồi quay lại — **không tải lại trang, không đổi tab** | **`coBai1: false`** · **11 bài** · cache **16** |

> ⚠️ **Cảnh báo cho lần sau:** `page.bringToFront()` KHÔNG phát `visibilitychange`, và
> `goTo()` bằng `pushState` + `PopStateEvent` là một phép điều hướng thật (React Router nghe
> `popstate`) — nhưng **link click mới là ca thật nhất**. Dùng link khi có.

```js
// Không muốn đổi tab thì phát thẳng sự kiện mà trình duyệt sẽ phát:
document.dispatchEvent(new Event("visibilitychange"));
await new Promise((r) => setTimeout(r, 6000));
// Rồi xem tiêu đề bài đã đổi chưa, và localStorage đã sang phiên bản mới chưa:
JSON.parse(localStorage["toan-vui-content"]).version;
```

```text
🔴 CẢNH BÁO KHI THỬ BẰNG TRÌNH DUYỆT TỰ ĐỘNG:
`page.bringToFront()` KHÔNG phát `visibilitychange` — đã đo được là 0 lần, cả hai trang luôn
ở trạng thái "visible". Nếu thử bằng Playwright mà không phát tay sự kiện thì **phép thử
không hề chạm tới đường mã cần kiểm** và sẽ báo hỏng sai. Bước 4 phải làm bằng tay, hoặc
phát sự kiện như đoạn trên.
```

### TC-3d.8 — Publish giữa lúc bé **đang học dở** thì sao? 🔴

**Chuẩn bị:** app bé mở một bài, **bấm sang slide 3** (đừng để ở slide 1 — nếu không thì không phân biệt được "giữ nguyên" với "bị đẩy về đầu").

| Bước | Làm gì                            | Mong đợi                                                                   |
| ---- | --------------------------------- | -------------------------------------------------------------------------- |
| 1    | App bé: trong bài, đang ở slide 3 | —                                                                          |
| 2    | Admin: publish một thay đổi       | `Đã publish thành phiên bản N`                                             |
| 3    | App bé: quay lại cửa sổ app       | **Vẫn ở slide 3**, không bị nhảy về slide 1, không giật màn hình           |
| 4    | App bé: đi ra danh sách bài       | Tiêu đề **mới** đã có (cây trong bộ nhớ đã đổi, chỉ là chưa cắt ngang bài) |

> ⚠️ Bước 3 là lý do tồn tại của cả cơ chế: đổi cây giữa bài là **mất chỗ đang học** của bé
> vì một thao tác của admin. Nếu bước 3 sai, tìm `if (dangTrongBaiHoc) return;` trong
> `client/src/data/contentSource.js`.

---

### TC-3d.9 — Biết MỘT BÉ đang dùng phiên bản nội dung nào 🔴 _(DoD #6)_

**Cần trước:** đã chạy `0013_content_report_and_create_lesson.sql`

```powershell
npm run test:portal        # → dòng D-19
```

**Mong đợi:** `có đủ 3 cột (HTTP 200) · canary bắt được cột lạ ✓`

> 🔴 **Cổng `D-19` đo bằng cách HỎI ĐÚNG TÊN CỘT** (`select=content_version,content_source,content_seen_at`).
> PostgREST kiểm tên cột theo schema **trước khi** RLS lọc dòng, nên cột thiếu là lỗi
> `42703 column … does not exist` — **kể cả khi khách không đọc được dòng nào** của
> `child_progress`. Đó là lý do phép đo này chạy được bằng anon key dù bảng bị RLS chặn.
>
> ✅ **Đã đo hai chiều:** trước khi chạy `0013`, `D-19` **FAIL** và chỉ đúng tên file cần chạy
> (`column child_progress.content_version does not exist`); canary (hỏi một cột không tồn tại)
> phải ra **cùng kiểu lỗi** — không có vế này thì một PostgREST đổi cách báo lỗi là cổng xanh
> vĩnh viễn mà không ai biết.
>
> 🔴 **Nhưng `D-19` chỉ nói cột ĐÃ CÓ — chưa nói ai GHI vào.** Có cột mà không ai ghi thì tính năng
> **im lặng không chạy**: hồ sơ bé mãi hiện "chưa báo", build vẫn xanh, mọi cổng khác vẫn xanh.
> Nên có thêm **`S-28`** (`npm run test:portal:static`): soi `syncService.js` xem có hàm báo cáo,
> có đọc đúng hai nguồn sự thật (`layPhienBan()` / `layNguon()`), và **số chỗ gửi kèm báo cáo phải
> bằng số chỗ ghi vào `child_progress`** — `syncService` ghi ở HAI đường (nhập dữ liệu máy khách lên
> tài khoản, và đường đồng bộ thường), thiếu một đường là chính đường bé dùng hằng ngày không báo gì.

**Bước — xem trên hồ sơ bé:**

1. Mở app của bé (`5173`) bằng một tài khoản đã đăng nhập, học/làm gì đó 1 phút cho nhịp đồng bộ chạy.
2. Admin → **Người dùng** → bấm tên bé đó.

**Mong đợi:** dưới 4 ô số có dòng:

> **Nội dung bé đang thấy:** phiên bản 21 · cache trong máy · báo lúc 20/09/2026 15:02

> ✅ **Cả 4 nhánh hiển thị đã đo ngày 2026-09-20** — dùng một **màn chắn `fetch`** trong trang để thay
> 3 giá trị ngay trong bộ nhớ, nên **DB không bị ghi gì**: đo xong đọc lại thấy đúng _"chưa báo"_ như cũ.
>
> | Nhánh bé              | Máy bé báo gì                    | Màn hình hiện                                                          |
> | --------------------- | -------------------------------- | ---------------------------------------------------------------------- |
> | Chưa từng đồng bộ     | `content_seen_at` rỗng (DB thật) | _"Máy bé này **chưa báo** phiên bản nội dung lần nào…"_ (ô xám)        |
> | Đang ở bản mới nhất   | `9999 · cache`                   | `phiên bản 9999 · cache trong máy · báo lúc …` — **không** cảnh báo    |
> | Còn thấy bản cũ       | `3 · static`                     | `phiên bản 3 · file trong bundle (bản lúc build app)` + ⚠️ vàng        |
> | Không có số phiên bản | `null · db`                      | `không có số (đang chạy bản trong bundle) · đọc thẳng từ DB` + ⚠️ vàng |
>
> Con số **21** trong dòng cảnh báo là đọc **thật** từ `app_config` — khớp `content_version` hiện tại.
>
> 💡 **Cách đo này thay được cho tài khoản Google thật:** bé đang chạy ở chế độ khách thì không ghi
> được gì lên `child_progress` (khách không có dòng trên đám mây), nên muốn thấy màn hình "đã báo" mà
> không tạo dữ liệu rác thì phải giả lập đúng câu trả lời của PostgREST.
> ⚠️ **Đừng dùng `route.fetch()` của công cụ trình duyệt cho việc này** — nó nổ
> `Protocol error (Storage.getCookies): Method not found`, và triệu chứng nhìn thấy chỉ là trang treo
> _"Quá 15s chưa có phản hồi"_, rất dễ đổ oan cho mã app.

**Kiểm chứng bằng SQL:**

```sql
SELECT cp.nickname, pr.content_version, pr.content_source, pr.content_seen_at
  FROM public.child_progress pr
  JOIN public.child_profiles cp ON cp.id = pr.child_id
 ORDER BY pr.content_seen_at DESC NULLS LAST LIMIT 10;
```

**Và kiểm ca "còn thấy bản cũ":** gạt công tắc nội dung về `static` (`TC-3d.5`) → mở app bé →
đồng bộ → xem lại hồ sơ: dòng phải chuyển sang **cảnh báo vàng** với `file trong bundle (bản lúc build app)`.
**Nhớ gạt lại `remote`.**

> 🔴 **ĐỌC ĐÚNG GIỚI HẠN — con số này là BÁO CÁO, không phải trạng thái trực tiếp.**
>
> | Điều                                 | Sự thật                                                                                                              |
> | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
> | Ai báo?                              | Chỉ máy **đang có mạng và đã đồng bộ tiến độ**                                                                       |
> | Báo khi nào?                         | Kèm nhịp đồng bộ tiến độ (bé vừa học/chơi gì đó) — **không** thêm request nào                                        |
> | Máy đang offline thì sao?            | **Không báo lên được** — đúng lúc cần biết nhất. Số hiện trên hồ sơ là số **cũ**, nên phải đọc kèm `content_seen_at` |
> | `version = null` + `source = static` | Máy bé đang chạy nội dung nằm trong **bundle** (bản lúc build app). Đây là ca đáng nghi nhất khi có khiếu nại        |
>
> 💡 **Vì sao không đẩy lên ngay lúc nạp nội dung:** 1 request nhỏ nữa mỗi lần mở app là không
> cần thiết, vì một bé **đang dùng** thì chắc chắn có nhịp đồng bộ tiến độ. Đổi lại: con số có
> thể trễ vài phút so với thời điểm nạp — ghi rõ ở đây để không ai đọc sai.

---

### TC-3d.10 — Xoá bài học THẲNG TRONG DB thì app không vỡ 🔴 _(vẫn KHÔNG có nút xoá trên UI — cố ý)_

**Cần trước:** đã chạy `0014_xoa_bai_hoc_trong_db.sql`

```powershell
npm run test:portal:static        # → dòng S-29
```

**Mong đợi:** `trigger AFTER DELETE ✓ · chỉ tăng số khi bài đã publish ✓ · khoá cho khách ✓ · chặn bài 0 slide ✓ · nhận slide lạ ✓ · bỏ mặc định 12 ✓ · Admin dùng maybeSingle ✓`

> 🔴 **Vì sao cần mục này.** Giao diện **không có nút xoá** (xem quyết định `D4` trong
> `docs/phase_3c_3d_decisions.md`), nên không cổng nào khác chạm tới đường xoá. Nhưng xoá bằng
> SQL Editor thì luôn làm được — và có **hai kiểu hỏng, cả hai đều KHÔNG có triệu chứng**:
>
> | Kiểu hỏng                       | Hậu quả thật                                                                                                           |
> | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
> | Không ai tăng `content_version` | Máy bé **vẫn hiện bài đã xoá, mãi mãi** — cache không bao giờ bị thay, không lỗi ở đâu cả                              |
> | Máy bé gặp bài "lạ"             | `payload` rỗng ⇒ **trắng trang** với `Cannot read properties of undefined (reading 'type')`; slide kiểu lạ ⇒ thẻ trắng |

**Bước 1 — chạy `0014` rồi tự kiểm ngay trong SQL Editor** (4 câu ở cuối file migration):

- `content_version` phải **TĂNG 1** sau lệnh `DELETE` (chỉ khi bài đã `published`).
- `admin_audit_log` phải có 1 dòng `lesson.delete`, `before` chỉ ghi **hình dạng** (không payload).

> ✅ **Đã chạy `0014` và đo cả hai chiều (2026-09-20)** — dùng chính client của app, đăng nhập admin:
>
> | Việc                         | `content_version` | Kết quả                                             |
> | ---------------------------- | ----------------- | --------------------------------------------------- |
> | Tạo bài bằng `create_lesson` | 21                | **không đổi** ✓ (tạo nháp không đụng gì tới máy bé) |
> | **Xoá bài vừa tạo (nháp)**   | 21 → **21**       | **không tăng** ✓ (bài nháp bé chưa từng thấy)       |
> | Đẩy bài lên `published`      | 21                | không đổi (chỉ hàm RPC mới tăng)                    |
> | **Xoá bài đã publish**       | 22 → **23**       | **tăng đúng 1** ✓                                   |
>
> Sổ kiểm toán ghi `lesson.delete` với `entity_id` = mã bài, `before` = hình dạng,
> `reason` = _"Xoá thẳng trong DB (không qua giao diện)"_, và `actor_id` = **đúng tài khoản admin đã xoá**.
> ⚠️ **Từ `0016`:** `reason` không còn là câu viết cứng — nó **suy từ `auth.uid()`** (`NULL` = xoá bằng SQL ·
> khác `NULL` = xoá từ giao diện). Câu cố định cũ chỉ đúng cho đường SQL, và thành **nói dối** khi
> `0015` thêm nút xoá — xem quyết định `F6`. Các dòng vết ghi trước `0016` vẫn giữ câu cũ.
> ⏳ **`0016` viết xong nhưng CHƯA chạy trên DB** (tại thời điểm ghi tài liệu này) — đo lại `reason` sau khi chạy.
>
> ✅ **`0016` ĐÃ CHẠY trên DB (2026-09-20)** — dòng ⏳ ngay trên đã hết hiệu lực; kết quả đo lại nằm ngay dưới.
>
> ✅ **Sau khi chạy `0016` (2026-09-20) — đo lại đúng chỗ đã sai:** xoá một bài thử **từ nút** ⇒ dòng vết
> mới nhất ghi `reason = "Xoá từ trang quản trị"` (trước là câu nói sai nguồn) ✓ · `actor_id` = tài khoản
> admin ✓ **khớp** với `reason` (hai trường cùng một nguồn sự thật nên không thể mâu thuẫn) ✓ · số dòng
> vết 4 → 5 (**đúng 1**) ✓ · `content_version` **24 → 24** (bài thử là `draft` nên **không** tăng — máy bé
> không bị làm phiền) ✓. Phép đo này còn chứng minh `CREATE OR REPLACE` + cấp lại `REVOKE`/`GRANT`
> **không** làm chết nút xoá (không có `permission denied`) ✓.
> ⏳ **Nhánh còn lại — chỉ chạy được ở SQL Editor:** `reason = 'Xoá bằng SQL (không có phiên đăng nhập)'`.
> Tôi không đo được nhánh này (không có cách nào gửi `DELETE` không JWT mà qua được RLS). Câu tự kiểm (3)
> ở cuối `0016` dành cho việc đó.
> Quan trọng không kém: lệnh xoá của **admin đã đăng nhập** vẫn chạy được ⇒ cặp `REVOKE`/`GRANT`
> trên hàm trigger **không** chặn trigger.

> ✅ **Đo vòng đầy đủ trên máy bé:** tạo 1 bài thật rồi publish ⇒ bé mở app, cache thành
> `v22 · **363 bài**` và trang chương hiện **13 bài**; xoá bài đó trong DB ⇒ bé **chỉ mở lại app**,
> cache thành `v23 · **362 bài**`, trang chương về **12 bài** — bài đã xoá **biến mất**, không phải
> xoá cache tay, không phải bấm gì.

**Bước 2 — đo trên app của bé** (không cần tài khoản Google nào):

1. Bơm một cây thử vào `localStorage` (`toan-vui-content`, nhớ đặt `version` **bằng số thật**
   để app không tải đè cây DB lên), rồi mở từng đường dẫn:

| Ca                            | Màn hình phải hiện                                             | Đã đo |
| ----------------------------- | -------------------------------------------------------------- | ----- |
| Bài **0 slide**               | `🧩 Bài này chưa có nội dung` — **không** lỗi trang            | ✅    |
| Slide **kiểu lạ**             | `🧩 Slide này có kiểu lạ (video-xyz)…` + nút Tiếp tục vẫn chạy | ✅    |
| Mã bài **không có trong cây** | `😕 Không tìm thấy bài học` + nút **Thử tải lại nội dung**     | ✅    |
| Bài bình thường               | Vẫn hiện đúng slide (chứng minh không phá đường lành)          | ✅    |

2. Nút **Thử tải lại nội dung** phải **gọi mạng thật** — đếm số lần gọi `app_config`: **2 → 3**.

**Bước 3 — đo trên Admin** (xoá thật một bài **thử**, không phải bài thật):

1. Tạo một bài thử bằng **➕ Thêm bài học vào chương này**.
2. Xoá nó **thẳng trong DB**.
3. Bấm vào bài đó trong cây (cây còn cũ) ⇒ khung phải hiện
   **"Bài `…` không còn trong DB — có thể vừa bị xoá bằng SQL"**, cây **tự tải lại** (13 → 12 bài),
   và **KHÔNG** hiện `PGRST116 … The result contains 0 rows`.

> ⚠️ **Bẫy của người ĐO (đã mất thời gian, ghi lại):** lần đọc đầu thấy _"Đang tải bài…"_ rồi
> tưởng trang treo — thật ra truy vấn còn đang bay. **Chờ theo TRẠNG THÁI, đừng chờ theo đồng hồ.**
> Cùng họ với lần đếm `app_config` ra `0` vì trình duyệt phục vụ từ cache: **thấy số vô lý thì
> nghi cây thước trước.**

> 🔴 **Vẫn KHÔNG có nút XOÁ trên giao diện, và đây là lý do (không đổi).** Bài học được
> `question_attempts.lesson_id` và `support_tickets.lesson_id` trỏ tới. Muốn gỡ một bài khỏi mắt
> bé mà vẫn giữ được nội dung thì dùng **Rút bài**. File `0014` không mở thêm đường ghi nào — nó
> chỉ làm cho việc xoá bằng SQL trở nên **an toàn**, tức là app tự lành thay vì im lặng sai.

---

# 📚 PHẦN J — GIAI ĐOẠN 3: CMS — lát 3a (đưa nội dung lên DB)

> 📄 Kế hoạch: [`docs/phase_3a_plan.md`](phase_3a_plan.md)
>
> ⚠️ **Lát 3a KHÔNG có giao diện, và KHÔNG đổi hành vi của app.** Cuối 3a, app của bé
> vẫn đọc file tĩnh như cũ, vì `content_source` vẫn là `"static"`. Bật đọc từ DB là
> việc của lát 3d — cố ý để sau, khi dữ liệu đã được kiểm.

### Cách chạy phần này

```powershell
# 1. Chạy 0008_content_schema.sql trong Supabase SQL Editor
# 2. Sinh file SQL nội dung:
node scripts/migrate-content.mjs --sql
# 3. Dán lần lượt các file trong supabase/content-seed/ vào SQL Editor (01 → 99)
# 4. Đối chiếu — KHÔNG cần key đặc biệt nào:
node scripts/migrate-content.mjs --verify
```

> 💡 **Không cần tạo hay dán bất kỳ khoá bí mật nào.** Kế hoạch 3a ban đầu định ghi thẳng
> vào DB qua REST với một key có quyền ghi. Khi viết code mới thấy đường khác rẻ và an
> toàn hơn: **sinh file `.sql` rồi dán vào SQL Editor** — chỗ đó vốn chạy bằng quyền cao
> nhất sẵn rồi, và bạn đã làm việc này 8 lần với các migration. Cách ghi thẳng (`--apply`)
> vẫn còn, nhưng chỉ cần khi phải chạy đi chạy lại nhiều lần.

---

### TC-3a.1 — Migration 0008 chạy sạch 🔴

**Bước:** Chạy `supabase/migrations/0008_content_schema.sql` → `Success. No rows returned`.
**Chạy lại lần 2 cũng phải thành công** (idempotent).

```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public' AND tablename LIKE 'content%' ORDER BY 1;
-- Mong đợi: content_chapters · content_grades · content_lesson_versions · content_lessons

SELECT key, value FROM public.app_config
WHERE key IN ('content_source','content_version') ORDER BY key;
-- Mong đợi: content_source = "static" · content_version = 0
```

**Chú ý:** bảng `content_chapters` **cố ý KHÔNG có cột `total_lessons`**. File tĩnh có
trường đó nhưng **5 chương ghi sai** (xem `TC-3a.5`); chép con số sai vào DB là biến nó
thành "sự thật" trong DB.

---

### TC-3a.2 — 🔴 Bài nháp KHÔNG lộ ra cho khách

> Đây là **yêu cầu bảo mật quan trọng nhất** của lát 3a. Viết `USING (true)` cho
> `content_lessons` là mở đường cho mọi người có anon key đọc được bài chưa publish —
> đúng loại lỗ hổng đã phải vá ở GĐ 0 với bảng `leaderboard`.

**Bước 1 — cổng tự động (kiểm ở tầng nguồn):**

```powershell
npm run test:portal:static        # → dòng S-17
```

**Bước 2 — thử thật bằng anon key** (Console app chính, **đang là Khách**):

```js
const r = await window.__sb
  .from("content_lessons")
  .select("id,status")
  .eq("status", "draft");
console.log({ soBaiNhap: r.data?.length, error: r.error?.message });
// Mong đợi: 0 bài nháp
```

> ⚠️ **Vì sao phải có CẢ HAI bước.** Sau khi migrate, mọi bài đều là `published` → chưa có
> bài nháp nào trong DB → bước 2 trả về 0 dòng **dù policy có hở hoàn toàn**. Một phép thử
> luôn đúng thì không bảo vệ được gì. Nên bước 1 đọc thẳng định nghĩa policy trong file
> migration, chỗ mà "bài nháp" luôn tồn tại dưới dạng khả năng.
>
> ✅ **Bộ dò đã được đo:** tạm đổi policy thành `USING (true)` → `S-17` **FAIL** và nói rõ
> `Policy đọc công khai của content_lessons KHÔNG giới hạn theo status`.

---

### TC-3a.3 — 🔴 `anon` KHÔNG đọc được bảng phiên bản

> Khác `TC-3a.2`: phép thử này **không** vô nghĩa khi chưa có bài nháp, vì sau khi chạy
> `content-seed`, bảng phiên bản có **461 dòng** (mỗi bài một dòng v1). RLS hở một chút là đọc được ngay.

```powershell
npm run test:portal      # → dòng D-14
```

```js
const r = await window.__sb
  .from("content_lesson_versions")
  .select("lesson_id")
  .limit(5);
console.log({ soDong: r.data?.length, error: r.error?.message });
// Mong đợi: 0 dòng (hoặc lỗi quyền)
```

---

### TC-3a.4 — Script báo đúng quy mô nội dung 🔴 _(tự động)_

```powershell
node scripts/migrate-content.mjs          # chạy thử, không ghi gì
```

**Mong đợi:**

```
  Đọc từ file tĩnh:
    5 lớp · 51 chương · 459 bài · 2690 slide
  ✅ khớp số đã đo (5/51/459/2690)
  ✅ tất cả slide hợp lệ
```

> ⚠️ Số **51 chương** — KHÔNG suy được từ "5 lớp × 10". Đếm thật: 10 (Lớp 1) + 14 (Lớp 2)
>
> - 16 (Lớp 3) + 6 (Lớp 4) + 5 (Lớp 5) = **51**. Comment cũ trong `curriculum.js` ghi "50
>   Chapters total" là **sai** — Lớp 4 chỉ có 6 chương, Lớp 5 chỉ có 5. Đã sửa comment.
>
> Cũng có cổng tự động: `npm run test:portal:static` → `S-15` kiểm **cả 2690 slide**, và
> `S-16` kiểm chiều ngược lại (bộ kiểm tra có bắt được lỗi không).

---

### TC-3a.5 — Số dòng trong DB khớp, và số bài mỗi chương là số THẬT 🔴

**Bước:** chạy hết các file `content-seed/` (01 → 99), rồi:

```powershell
node scripts/migrate-content.mjs --verify
```

**Mong đợi:** mọi chỉ số ✅, đặc biệt 5 dòng cuối:

```
  ✅ Chương g2-c8 (metadata cũ khai sai)          2       2
  ✅ Chương g2-c9 (metadata cũ khai sai)          2       2
  ✅ Chương g2-c10 (metadata cũ khai sai)         3       3
  ✅ Chương g3-c9 (metadata cũ khai sai)          2       2
  ✅ Chương g3-c10 (metadata cũ khai sai)         3       3
```

> 🔴 Đây là chỗ dễ sai nhất: file tĩnh khai 5 chương này có 10–12 bài nhưng thật chỉ 2–3.
> Nếu script chép `totalLessons` vào DB thì bảng vẫn "đủ dòng", màn hình vẫn chạy — nhưng
> DB mang sẵn một con số sai. Phép thử này kiểm riêng đúng 5 chương đó.
>
> 📌 Ghi chú cho tương lai: 5 chương đó **thiếu nội dung thật** (thiết kế 10–12 bài, mới
> viết 2–3). Không phải lỗi kỹ thuật — CMS ở lát 3c sẽ giúp điền nốt.

---

### TC-3a.6 — So TỪNG BÀI, không chỉ đếm tổng 🔴

Cũng trong `--verify`. Nó so từng bài về `title`, `lesson_type`, `description` **và toàn
bộ `payload`** (so sánh JSON đã chuẩn hoá).

**Mong đợi:** `Bài bị thiếu = 0` và `Bài có nội dung khác = 0`.

> ⚠️ Đếm tổng khớp **không** bảo đảm nội dung khớp — có thể thừa bài này, thiếu bài kia mà
> tổng vẫn đủ. Nên phải so từng bài.
>
> 🔴 **`jsonb` của PostgreSQL KHÔNG giữ thứ tự khoá của object** — nó lưu dạng chuẩn hoá
> (sắp theo độ dài khoá rồi theo byte). Nên `JSON.stringify(giá_trị_đọc_về)` **không bao
> giờ** bằng `JSON.stringify(object gốc)`, **dù nội dung y hệt**. Phép so sánh **phải sắp
> xếp khoá trước** (đệ quy), và **giữ nguyên thứ tự mảng** — thứ tự slide là một phần
> nội dung, đổi thứ tự nghĩa là nội dung khác.
>
> 🐞 **Đã mắc đúng lỗi này:** lần chạy `--verify` đầu tiên báo **cả 362/362 bài** "có nội
> dung khác" trong khi đếm số dòng đúng hết. Dữ liệu sạch — **cái thước mới là thứ hỏng**.
> Cách nhận ra: **dữ liệu hỏng thật thì hỏng lẻ tẻ, không hỏng đều 100%.** Khi mọi thứ
> đều lệch, nghi phép so sánh trước tiên.
>
> 💡 `--verify` giờ in rõ **trường nào lệch** (VD `g1-c1-l1 (payload)`), không chỉ id —
> lần trước chỉ có danh sách id nên phải viết thêm script mới tìm ra nguyên nhân.

---

### TC-3a.7 — Chạy lại không sinh dòng trùng

**Bước:** dán lại một file `content-seed/` bất kỳ, rồi chạy `--verify` lần nữa.

**Mong đợi:** số dòng **không đổi** (mọi `INSERT` đều có `ON CONFLICT … DO UPDATE`).

> ✅ **Đã chạy thật:** dán lại `02-bai-lop-1.sql` (84 bài) lần thứ hai → `--verify` vẫn báo
> **362 bài / 1505 slide**, không thành 446. Chạy lại an toàn.
>
> ℹ️ Bảng phiên bản cũng không sinh dòng trùng nhờ `ON CONFLICT (lesson_id, version)
DO NOTHING` — và khoá chính `(lesson_id, version)` là chốt chặn thứ hai: kể cả quên
> `ON CONFLICT` thì PostgreSQL vẫn từ chối, chỉ khác là báo lỗi thay vì bỏ qua.

---

### TC-3a.8 — Bộ kiểm tra BẮT ĐƯỢC quiz sai đáp án 🔴

### TC-3a.9 — Bộ kiểm tra BẮT ĐƯỢC `dialogue` sai đáp án 🔴

Cả hai nằm trong cổng tự động:

```powershell
npm run test:portal:static        # → dòng S-16
```

**Mong đợi:** `10 ca hỏng đều bị bắt · slide hợp lệ vẫn qua`.

> 🔴 **Vì sao phải đo chiều này.** `S-15` chỉ chứng minh bộ kiểm tra **không báo oan**
> (1505 slide thật đều qua). Một hàm luôn trả về mảng rỗng cũng qua được `S-15` hoàn hảo.
> `S-16` cho bộ kiểm tra ăn 10 ca hỏng đã biết và bắt nó phải kêu — trong đó có ca
> **`dialogue` đáp án ngoài `options`**, đúng chỗ mà bản đầu của chính bộ kiểm tra đã bỏ sót.

---

### TC-3a.10 — `content_source` vẫn là `"static"` 🔴

**Bước:** sau khi chạy hết `content-seed/`, kiểm:

```sql
SELECT key, value FROM public.app_config
WHERE key IN ('content_source','content_version') ORDER BY key;
-- Mong đợi: content_source = "static"  ·  content_version = 1
```

**Và kiểm app của bé bằng mắt:** mở `localhost:5173`, vào một bài học — nội dung phải
**y như trước**. Không có gì đổi, vì app vẫn đọc file tĩnh.

> 🔴 **Đây là phép thử chứng minh lát 3a an toàn.** Script migrate **cố ý không đụng**
> `content_source`. Nếu nó tự đổi sang `"remote"` thì lát 3a đã thành lát 3d, và mọi thứ sẽ
> đổi hành vi cùng lúc với việc dựng dữ liệu — đúng thứ cần tránh.

---

### Ghi chú: hai chỗ kế hoạch 3a ghi sai, đã sửa bằng số đo

Kế hoạch 3a (bản được duyệt) chia khoá bắt buộc theo suy luận. Đo tần suất từng khoá trên
1505 slide thật thì lộ ra 2 chỗ sai — và nếu viết theo kế hoạch thì **bộ kiểm tra sẽ chặn
71 slide hợp lệ**:

| Khoá                      | Kế hoạch ghi    | Đo được               |
| ------------------------- | --------------- | --------------------- |
| `concept.rule`            | bắt buộc        | **291/296 = 98,3%**   |
| `concept.explanation`     | (ngầm) bắt buộc | **287/296 = 97,0%**   |
| `visual.items` + `number` | bắt buộc        | **chỉ 11/82 = 13,4%** |

→ Quy tắc rút ra, đã ghi vào đầu `admin/src/lib/contentSchema.js`: một khoá chỉ được coi là
**bắt buộc** khi nó có mặt ở **100%** slide của kiểu đó. Thấy nó trong vài ví dụ là chưa đủ.

---

# 📚 PHẦN K — GIAI ĐOẠN 3: CMS — lát 3b (cây giáo trình chỉ đọc)

**Màn hình:** `http://localhost:5174/content` (menu **📚 Nội dung bài học**)
**Dữ liệu nền:** 5 lớp · 41 chương · 362 bài trong DB (đã nạp ở lát 3a)

> **Lát này để làm gì.** Trước 3b, không có cách nào nhìn thấy nội dung đã nằm trong DB. Cây
> giáo trình là mắt nhìn của cả GĐ 3: 3c sẽ sửa bài qua chính cây này, 3d sẽ cho app của bé
> đọc từ DB. Nếu cây đọc nhầm nguồn (file tĩnh) thì vẫn hiện đúng nội dung, vẫn trông bình
> thường — nên phải chứng minh nó đọc từ DB mới tin được.
>
> **Chưa có gì để sửa ở lát này.** Màn hình này cố ý chỉ đọc.

---

### TC-3b.1 — Cây đọc từ DB, đúng số: 5 lớp · 51 chương · 459 bài 🔴

**Bước:** mở `localhost:5174/content`.

**Mong đợi:** dòng đầu ghi `5 lớp · 51 chương · 459 bài`, kèm chú thích
`(màn hình này chỉ đọc — sửa bài là lát sau)`.

**Đối chiếu nguồn:** `node scripts/migrate-content.mjs --verify` phải cho đúng ba số đó.

> 🔴 **51 chương** — không suy được từ "5 lớp × 10". Kế hoạch GĐ 3 ban đầu ghi "50 chương"
> là **sai**. Đếm thật: 10 (Lớp 1) + 14 (Lớp 2) + 16 (Lớp 3) + 6 (Lớp 4) + 5 (Lớp 5) = **51**.

---

### TC-3b.2 — Số bài mỗi lớp khớp DB

**Bước:** với từng lớp, đọc nhãn bên phải tên lớp: `N ch · M bài`.

**Mong đợi:**

| Lớp   | Số chương | Số bài  |
| ----- | --------- | ------- |
| Lớp 1 | 10        | 84      |
| Lớp 2 | 10        | 91      |
| Lớp 3 | 10        | 101     |
| Lớp 4 | 6         | 46      |
| Lớp 5 | 5         | 40      |
|       | **41**    | **362** |

**Tổng phải bằng 461.** Cộng nhẩm 112 + 114 + 116 + 65 + 54 = 461. (Bảng ngay trên ghi Lớp 1 = **84**, Lớp 2 = **91**, Lớp 3 = **101**, Lớp 4 = **46**, Lớp 5 = **40** là số đo lúc nạp 3a; sau khi bổ sung 99 bài thì lần lượt là **112 · 114 · 116 · 65 · 54**.)

> Con số này khớp với cột "Số bài" ở bảng tổng của **TC-3a.1**; lệch một bài là dấu hiệu cây
> đang lọc theo `status` sai.

---

### TC-3b.3 — Mở / đóng nhánh lớp và chương

**Bước:**

1. Bấm **Lớp 1** → thu lại.
2. Bấm lại → mở ra.
3. Bấm **Chủ đề 1: Các số từ 0 đến 10** → hiện danh sách bài.

**Mong đợi:** dấu `▾` / `▸` đổi theo; số bên phải mỗi chương là số bài của chương đó
(Chủ đề 1 → 12).

**Lưu ý:** khi vào màn, **Lớp 1 mở sẵn** để màn hình không trông như rỗng.

---

### TC-3b.4 — Tìm kiếm: ba trường hợp, ba kết quả khác nhau

**Bước:** gõ lần lượt vào ô tìm kiếm:

| Gõ vào ô tìm      | Mong đợi                                                  |
| ----------------- | --------------------------------------------------------- |
| `g1-c9`           | `2 bài khớp · tự mở hết nhánh có kết quả`, còn đúng Lớp 1 |
| `ôn tập cuối năm` | `22 bài khớp · …` — khớp theo **tên chương**              |
| `zzz-khong-co-gi` | `Không có bài nào khớp từ khoá này.` và cây **trống**     |

**Mong đợi thêm:**

- Đang tìm thì chỉ những lớp **có kết quả** mới hiện, và nhánh tự mở sẵn.
- Nhãn lớp lúc này ghi **số đã lọc** ở cả hai vế: `g1-c9` → `1 ch · 2 bài`. Nhãn `10 ch · 2 bài`
  là sai — số chương chưa lọc mà số bài đã lọc thì hai con số khác hệ quy chiếu, đọc như mâu thuẫn.
- Xoá ô tìm → quay lại đủ 5 lớp với nhãn gốc (`10 ch · 84 bài` …).

---

### TC-3b.5 — Màn hình CHỈ ĐỌC, và đọc từ DB chứ không từ file tĩnh 🔴

**Chạy:**

```powershell
npm run test:portal:static        # → dòng S-18
```

**Mong đợi:** `S-18` PASS với `chỉ đọc · truy vấn bảng content_* · không đụng file tĩnh`.

Cổng này kiểm ba điều, và tự kiểm chính nó bằng một **canary**:

1. `ContentPage.jsx` có truy vấn bảng `content_*`.
2. Không tham chiếu `gradeNData` hay `data/curriculum` (dữ liệu tĩnh).
3. Không có thao tác ghi nào nối sau `.from(...)`, và không gọi `logAudit`.

> 🔴 **Vì sao phải là cổng tự động.** Nếu màn hình lỡ đọc file tĩnh thì **nó vẫn hiện đúng nội
> dung** — không có triệu chứng nào để nhìn ra. Sai sót đó chỉ lộ mặt ở lát 3d, khi app của bé
> nhận thứ khác với thứ admin vừa xem. Lúc đó thì đã muộn.
>
> 🔴 **Bài học khi viết cổng.** Bản đầu của `S-18` chỉ tìm chuỗi `.delete(` và **bắt nhầm**
> `Set.delete()` dùng để đóng/mở nhánh — đúng một lần. Một cổng báo động giả thì lần sau sẽ bị
> bỏ qua, tệ hơn là không có cổng. Nên cổng hiện tại chỉ soi thao tác ghi **nối thẳng sau**
> `.from(...)`, kèm canary để chứng minh regex còn bắt được mẫu ghi giả.

---

### TC-3b.6 — Chọn bài → chi tiết đọc đúng `payload` thật

**Bước:** tìm `g1-c9-l1` rồi chọn **Bài 1: Khối lập phương xung quanh em**.

**Mong đợi:**

- Tiêu đề, nhãn **Đã publish**, mã bài `g1-c9-l1`, mô tả
  `Khám phá các đồ vật dạng khối lập phương`, và dòng `4 slide · publish 20/9/2026`.
- Bốn dòng xem trước, đúng kiểu từng slide:

| #   | Kiểu      | Đoạn xem trước                                                                       |
| --- | --------- | ------------------------------------------------------------------------------------ |
| 1   | Kể chuyện | `Khối lập phương có mặt ở khắp mọi nơi xung quanh chúng mình! Cùng tìm kiếm nhé! 🎲` |
| 2   | Khái niệm | `Nhận diện khối lập phương`                                                          |
| 3   | Câu hỏi   | `Đồ vật nào sau đây có dạng khối lập phương?`                                        |
| 4   | Ghi nhớ   | `Khối lập phương có 6 mặt hình vuông bằng nhau`                                      |

> **Vì sao mỗi kiểu lấy đoạn xem trước ở một khoá khác nhau.** Bản đầu lấy chung một khoá cho
> mọi kiểu, nên slide **Ghi nhớ** hiện `"Ghi nhớ:"` — đúng nhưng vô nghĩa, vì đó là tiêu đề
> chứ không phải nội dung. Giờ bảng khoá chọn theo kiểu: `story`→`text`, `concept`→`explanation`,
> `quiz`/`dialogue`→câu hỏi, `summary`→`points`.

---

### TC-3b.7 — Chi tiết không tự mất khi đổi từ khoá

**Bước:**

1. Chọn một bài (chi tiết hiện ra).
2. Xoá ô tìm kiếm.

**Mong đợi:** chi tiết **vẫn còn nguyên**, cây trở lại đủ 5 lớp, không có vòng xoay "Đang tải…"
treo và không có thông báo lỗi.

> Chi tiết cũ không thể hiện nhầm ra chỗ khác vì phần render đã chặn bằng `!dangChon` — nên
> không cần `setChiTiet(null)` trong effect. Nếu thấy vòng xoay treo thì đó là lỗi.

---

### TC-3b.8 — Mobile 375px: xếp dọc, không cuộn ngang 🔴

**Bước:** mở DevTools → chọn khung 375 × 720 → vào `/content`.

**Mong đợi:**

- Cây và khung chi tiết **xếp dọc**, cùng mép trái.
- **Không cuộn ngang**, ở cả cấp trang lẫn trong vùng nội dung.
- Tên chương dài (vd `Chủ đề 6: Làm quen với một số hình phẳng & Đo độ dài`) **xuống dòng và
  hiện ĐỦ** — KHÔNG bị cắt bằng `…`, và cũng không đẩy cột rộng ra.
- Ở 1280px: hai cột `340px` + phần còn lại.

> 🔴 **Lỗi này đã xảy ra thật và rất khó thấy.** Lưới chỉ khai báo cột cho `lg:`, nên ở mobile
> grid mặc định là **một cột `auto` bị chặn dưới bởi min-content**. Mà `truncate` là
> `white-space: nowrap`, nên min-content của tên chương = cả câu chưa cắt ≈ 485px → **cột rộng
> 485px trên màn 375px** và phải cuộn ngang mới đọc được. Sửa bằng `grid-cols-1`
> (tức `minmax(0,1fr)`) cộng `min-w-0` cho các span trong ô flex.
>
> ⚠️ Sau đó `truncate` **đã bị bỏ hẳn** vì nó cắt mất nội dung — xem `TC-3b.12`. Cảnh báo
> về `min-content` ở đây vẫn đúng cho mọi `white-space: nowrap` khác.
>
> Đây là loại lỗi mà nhìn ảnh chụp không thấy: trang vẫn "trông ổn" cho tới khi bạn thử cuộn.

---

### TC-3b.9 — Bài chưa publish hiện nhãn `nháp`

> ✅ **Đã chạy 2026-09-20.** Cả 3 chỗ đều đúng: nhãn vàng **nháp** bên cạnh bài, dòng đếm
> trên đầu có thêm `· 1 bài chưa publish`, và khung chi tiết ghi **Bản nháp**.

**Bước:** trước khi thử thì **chưa có bài nháp nào** (cả 362 bài đều `published`), nên phải
tự tạo một bài. Trong SQL Editor:

```sql
UPDATE public.content_lessons SET status = 'draft' WHERE id = 'g1-c9-l2';
```

Tải lại `/content`, mở Chủ đề 9.

**Mong đợi:**

- Bài `g1-c9-l2` có nhãn vàng **nháp** bên phải tên bài.
- Dòng đếm trên đầu ghi thêm `· 1 bài chưa publish`.
- Chọn bài đó → nhãn trạng thái trong chi tiết ghi **Bản nháp**.

**Trả lại nguyên trạng:**

```sql
UPDATE public.content_lessons SET status = 'published' WHERE id = 'g1-c9-l2';
```

> **Vì sao đáng thử dù chỉ một lần.** Nhãn `nháp` là thứ duy nhất cho biết một bài **chưa lên
> sóng**. Nếu nó không hiện thì 3c sẽ publish nhầm mà không ai biết.

---

### TC-3b.10 — Lỗi đọc nội dung hiện thông báo rõ, không trắng màn hình

**Bước:** DevTools → Network → thêm điều kiện chặn cho `*/rest/v1/content_*` (chỉ các bảng nội
nội dung), rồi tải lại `/content`.

**Mong đợi:**

- Khung đỏ ghi `Không đọc được nội dung: <nguyên văn thông báo của server>`.
- Dòng đếm vẫn ghi `0 lớp · 0 chương · 0 bài` — màn hình **không trắng**.
- Cây hiện hướng dẫn chạy `0008_content_schema.sql` rồi dán `supabase/content-seed/`.

> 🔴 **Đừng chặn cả `*.supabase.co` để thử mục này.** Làm vậy thì tầng xác minh quyền admin cũng
> không chạy được, và thứ bạn thấy là **màn hình trắng** — do tầng đăng nhập, không phải do trang
> nội dung. Phép thử phải chặn đúng bảng của trang đang kiểm.

> 🟡 **Ở thời điểm lát 3b: giới hạn đã biết của CẢ Admin Portal.** Request rơi vào "hố đen"
> (kết nối mở được nhưng server không bao giờ trả lời) làm trang treo ở `Đang tải…`. Đo được
> **40,6s vẫn treo**; `/reports` (trang có từ trước) **cũng y hệt** ⇒ không phải hồi quy của 3b.
>
> ✅ **Đã chữa ở lát riêng** — xem **PHẦN L** (`TC-L.1` → `TC-L.3`). Và nhân đó phát hiện lần đo
> đầu của tôi **sai**: ca "kết nối bị TỪ CHỐI" tự lỗi sau ~10s chứ không treo vĩnh viễn. Phải
> chờ đủ lâu, hoặc dùng đúng ca "hố đen", mới được nói "vĩnh viễn".

### TC-3b.11 — Bố cục dùng hết chiều cao, hai khung tự cuộn 🔴

> Trước khi sửa, ở khung 1440×900: lưới kết thúc ở `y=743` → **thừa 157px** trống dưới
> đáy; cây bị chặn cứng ở `max-h-[32rem]` (**512px**) dù có 362 bài; và khung chi tiết cao
> **577px** chỉ để chứa **một dòng** ở giữa.

| Chỗ đo (1440×900)                    | Trước                  | Sau                         |
| ------------------------------------ | ---------------------- | --------------------------- |
| Trống dưới đáy                       | 157px                  | **32px** (= padding)        |
| Vùng cuộn của cây                    | 512px                  | **699px**                   |
| Chiều cao trang khi đã chọn bài      | **1308px** (phải cuộn) | **900px** (không cuộn)      |
| Thông báo trống trong khung chi tiết | dồn lên trên           | **căn giữa** (lệch 332/332) |

**Bước:** ở 1440×900, mở `/content`, chọn một bài có nhiều slide.

**Mong đợi:**

- Không có dải trống lớn dưới hai khung; hai khung cao đầy phần còn lại của màn hình.
- **Trang KHÔNG cuộn.** Danh sách slide dài thì **tự cuộn trong khung chi tiết**.
- Thu nhỏ cửa sổ xuống ~600px: vẫn không cuộn trang, và **cả** cây **và** khung chi tiết
  đều tự cuộn bên trong.
- Số liệu `5 lớp · 41 chương · 362 bài` nằm **cùng hàng tiêu đề** — bỏ được khung riêng,
  tiết kiệm ~62px chiều cao mà không mất thông tin gì.

> 🔴 **`min-h-dvh` là SAI — phải dùng `h-dvh`.** Đây là chỗ dễ sai nhất của bố cục này và
> đã mắc đúng một lần. `min-h` chỉ là mức **sàn**: khi khung chi tiết cao lên (bài nhiều
> slide) thì container cứ cao theo nội dung → lưới phình lên **1172px**, khung chi tiết
> **không** tự cuộn mà đẩy cả trang dài ra (900 → **1308px**). Muốn `flex-1` bên trong chia
> được chỗ thì phần tử cha **phải có chiều cao XÁC ĐỊNH**.
>
> 💡 Đo bằng `flex-1` là chưa đủ — phải đo **cả hai trạng thái**: lúc chưa chọn bài và lúc
> đã chọn. Bản đầu của tôi chỉ đo lúc chưa chọn nên trông "đã xong" trong khi chọn bài
> là hỏng.

> ⚠️ **Ở cửa sổ thấp hơn ~550px, cả trang vẫn cuộn** — đo được: khung 420px thì sidebar cao
> **550px** và kéo cả hàng theo. Nguyên nhân nằm ở `Layout.jsx` (menu không co được), **không**
> phải ở trang này, và **ảnh hưởng cả 6 trang admin**. ✅ **Đã chữa** ở `Layout.jsx` —
> xem `TC-M.6`.

### TC-3b.12 — Dùng hết bề rộng, và KHÔNG cắt chữ bằng `…` 🔴

> Hai lỗi cùng lúc, cùng một nguyên nhân gốc: **bố cục làm cho chỗ rộng ra mà nội dung vẫn
> không đọc được.**
>
> **(1) Thừa hai bên** — `max-w-6xl` chặn nội dung ở **1152px**. Ở màn hình lớn thì phí hẳn
> một phần ba bề ngang:
>
> | Khung | Lưới TRƯỚC | Thừa mỗi bên TRƯỚC | Lưới SAU | Thừa mỗi bên SAU |
> | ----- | ---------- | ------------------ | -------- | ---------------- |
> | 1280  | 960        | 32px               | 960      | 32px             |
> | 1440  | 1088       | 48px               | **1120** | 32px             |
> | 1920  | 1088       | **288px**          | **1584** | 40px             |
> | 2560  | 1088       | **608px**          | **2224** | 40px             |
>
> **(2) Cắt chữ** — `truncate` (`white-space: nowrap` + `text-overflow: ellipsis`) làm tên dài
> hiện `…`. Đo trong DB: tên chương dài nhất **75 ký tự**, tên bài dài nhất **66 ký tự** —
> ở cột 340px thì chắc chắn vượt một dòng.

**Bước 1 — kiểm không còn chữ nào bị cắt.** Mở **hết** lớp và chương, rồi đo:

```js
const cay = document.querySelector("main section");
const biCat = [...cay.querySelectorAll("span, div")].filter(
  (el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1,
);
console.log(
  biCat.length ? "❌ CÒN CẮT: " + biCat.length : "✅ không chữ nào bị cắt",
);
```

**Mong đợi:** `✅ không chữ nào bị cắt`. Tên dài nhất
(`Chủ đề 9: Làm quen với thống kê & xác suất (Biểu đồ tranh, khả năng xảy ra)`) hiện đủ trên
**2 dòng**.

**Bước 2 — kiểm bề rộng theo resolution** (đo `lưới` và khoảng thừa mỗi bên):

| Khung     | Cột cây | Cột chi tiết | Cột slide | Cuộn trang | Tràn ngang |
| --------- | ------- | ------------ | --------- | ---------- | ---------- |
| 375×720   | 328     | 328          | 1         | có (đúng)  | không      |
| 768×900   | 705     | 705          | 1         | có (đúng)  | không      |
| 1024×768  | 340     | 348          | 1         | không      | không      |
| 1440×900  | 380     | 724          | 1         | không      | không      |
| 1920×1080 | 440     | 1128         | **2**     | không      | không      |
| 2560×1440 | 440     | 1768         | **2**     | không      | không      |

**Mong đợi:** khoảng thừa mỗi bên chỉ còn **đúng bằng padding** (32px ở `lg`, 40px ở `2xl`).

> 🔴 **Đừng dùng `truncate` cho tên nội dung.** Nó biến chữ thành `…` mà **không có triệu
> chứng nào khác** — bảng vẫn gọn, không lỗi, không tràn. Muốn tiết kiệm chỗ thì cho **xuống
> dòng**, đừng cắt. Chỗ nào buộc phải cắt (nhãn phụ, mã bài) thì phải biết chắc là cắt được.
>
> 💡 **Cột cây to ra theo màn hình** (`lg:340px` → `xl:380px` → `2xl:440px`) chứ không cố định:
> tên dài 75 ký tự cần chỗ, mà màn hình rộng thì có sẵn.
>
> 💡 **Danh sách slide chia 2 cột ở ≥1536px.** Cột đơn rộng 1768px thì mắt khó dò và mỗi dòng
> dài 200 ký tự. Chia đôi vừa dùng hết chỗ vừa giữ dòng ở độ dài đọc được. Ở đây không dùng
> `divide-y` được (nó kẻ viền theo thứ tự DOM, vào grid là sai) nên mỗi dòng tự có viền dưới.

---

### Ghi chú: những gì lát 3b **không** làm

| Không làm                    | Vì sao                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------- |
| Sửa nội dung bài             | Là lát **3c** — cần bảng bản nháp, publish, và hoàn tác                       |
| Cho app của bé đọc từ DB     | Là lát **3d** — `content_source` vẫn giữ `"static"`                           |
| Mức "Học kỳ" trong cây       | Dữ liệu **không có** cấp này; thêm vào là bịa ra một tầng không tồn tại       |
| Nạp `payload` của cả 362 bài | ~800 KB. Admin giờ chạy được trên 4G, nên chỉ nạp `payload` của bài đang chọn |

---

# 🔌 PHẦN L — Truy vấn không treo vô hạn (hẹn giờ)

> **Lát riêng, không thuộc GĐ 3.** Nội dung bài học chỉ là chỗ _phát hiện_ ra lỗi; lỗi nằm ở
> tầng truy vấn và có mặt ở **mọi trang** của Admin Portal.

## Lỗi là gì

Khi request rơi vào **"hố đen"** — kết nối mở được nhưng server **không bao giờ trả lời**
(đúng kiểu mất sóng 4G) — promise của `supabase-js` **không bao giờ settle**. Trang treo ở
`Đang tải…` mãi mãi: không lỗi, không số, không cách nào biết là hỏng.

## Đã ĐO, không suy đoán

| Tình huống                     | Kết quả đo được                                        |
| ------------------------------ | ------------------------------------------------------ |
| Hố đen, chưa có gì che         | vẫn `Đang tải…` sau **40,6s**                          |
| Hố đen + abort ở tầng `fetch`  | `net::ERR_ABORTED` CÓ bắn ra, trang **vẫn treo 40,6s** |
| Kết nối bị **từ chối** (abort) | tự lỗi sau **~10s**                                    |
| Sau khi chữa (hố đen)          | lỗi rõ ràng sau **16,3s**                              |

> 🔴 **Hai lần đo sai, ghi lại để đừng lặp.**
>
> **(1)** Lần đầu tôi thấy `Đang tải…` sau 4 giây rồi kết luận "treo vĩnh viễn". **Sai** — ca
> kết nối bị _từ chối_ tự lỗi sau ~10s. Muốn nói "vĩnh viễn" thì phải chờ đủ lâu, hoặc dùng
> đúng ca **hố đen** mới là ca không bao giờ tự kết thúc.
>
> **(2)** Chữa bằng `AbortController` ở tầng `fetch`: abort **có chạy thật** (thấy
> `net::ERR_ABORTED` trong log) nhưng **supabase-js nuốt `AbortError`** rồi im lặng ⇒ vẫn treo.
> **Đừng thử lại đường này.** Hẹn giờ phải ở tầng **promise**.

## Cách làm

| File                        | Việc                                                                    |
| --------------------------- | ----------------------------------------------------------------------- |
| `admin/src/lib/henGio.js`   | Logic hẹn giờ — **file thuần**, không `import`, không `import.meta.env` |
| `admin/src/lib/supabase.js` | `bocHenGio(client)` bọc `from()`/`rpc()` để mọi truy vấn đi qua hẹn giờ |

> 🔴 **Vì sao bọc ở MỘT chỗ chứ không sửa từng trang.** Có **27 chỗ gọi Supabase rải trên 9
> file**. Bọc từng chỗ là 27 cơ hội để sót một chỗ — mà chỗ bị sót sẽ lặng lẽ treo lại, đúng
> loại lỗi khó thấy nhất.
>
> ⚠️ **`auth` KHÔNG bị bọc** — hẹn giờ cho `getSession`/`refreshToken` có thể làm treo phiên
> đăng nhập. Cổng `S-19` chỉ kiểm `from()`/`rpc()`.

---

### TC-L.1 — Hẹn giờ chạy THẬT, không chỉ nằm trong source 🔴 _(tự động)_

```powershell
npm run test:portal:static        # → dòng S-19
```

**Mong đợi:** `cắt sau Nms · reject thành {error} · kết quả thật nguyên vẹn · client đã bọc`.

Cổng này `import()` thẳng `henGio.js` rồi thử **ba hành vi thật** (không grep chuỗi):

1. Promise **treo vô hạn** → phải tự kết thúc với `error.code = "HET_GIO"`, `data`/`count` = `null`.
2. Promise **reject** → phải trả `{ error }` chứ **không** ném (ném lỗi ở chỗ không có
   `try/catch` sẽ tạo promise bị bỏ rơi → lỗi im lặng, đúng thứ đang chữa).
3. Promise **resolve** → kết quả thật phải đi qua **nguyên vẹn** (nếu không thì lớp bọc phá app).

> 🔴 **Đây là lý do `henGio.js` được tách khỏi `supabase.js`.** `supabase.js` đọc
> `import.meta.env` nên Node không nạp được; tách phần thuần ra thì cổng **chạy thử được thật**.
> Một cổng chỉ grep chuỗi sẽ xanh kể cả khi hàm trả về `undefined`.
>
> ✅ **Canary đã đo:** đổi `bocHenGio(createClient(...))` thành một hàm không bọc gì → `S-19`
> **FAIL** đúng thông báo _"hẹn giờ đang là CODE CHẾT, app vẫn treo"_.

---

### TC-L.2 — "Hố đen": báo lỗi rõ thay vì treo 🔴

**Chuẩn bị:** DevTools → Console, đặt chặn giữ **không bao giờ trả lời** (khác hẳn "chặn rồi
abort" — xem ghi chú bên dưới).

**Mong đợi:** sau khoảng **15–17 giây**, trang hiện
`Không đọc được nội dung: Quá 15s chưa có phản hồi — kiểm tra kết nối mạng rồi thử lại.`

**Không được:** treo ở `Đang tải…` quá 30 giây; màn hình trắng; nút bị kẹt ở trạng thái đang xử lý.

> ⚠️ **Phải mô phỏng đúng "hố đen"**, không phải "chặn rồi abort". Hai ca này **khác hẳn nhau**:
> abort làm request lỗi ngay và trang tự lỗi sau ~10s (trông như đã ổn), còn hố đen mới là ca
> treo vô hạn. Đo sai ca thì sẽ tưởng lỗi đã hết trong khi nó còn nguyên.
> Trong Playwright: đăng ký `page.route(url, () => {})` — handler không gọi `fulfill`/`abort`.

---

### TC-L.3 — Mọi trang vẫn chạy bình thường sau khi bọc client

> Lớp bọc nằm trên **đường đi của mọi truy vấn**, nên nó mà sai thì hỏng cả admin — chứ không
> hỏng một trang. Đây là phép thử bắt buộc đi kèm.

**Bước:** mở lần lượt 6 đường dẫn, ở mỗi nơi kiểm **số liệu thật hiện ra** (không chỉ "trang không lỗi"):

| Đường dẫn     | Phải thấy                                            |
| ------------- | ---------------------------------------------------- |
| `/`           | 4 ô kiểm tra đều ✅                                  |
| `/users`      | danh sách bé, số `N hồ sơ bé` khớp `SELECT COUNT(*)` |
| `/users/<id>` | 7 khối của hồ sơ bé                                  |
| `/economy`    | 27 dòng cấu hình thưởng                              |
| `/reports`    | các tab lọc + ticket                                 |
| `/analytics`  | 3 khối A/B/C có số                                   |
| `/content`    | `5 lớp · 41 chương · 362 bài`                        |

**Và thử một thao tác GHI** (bọc sai thì lỗi ở đây trước tiên) — ví dụ **Lưu** ở `/economy`:

```sql
SELECT created_at, action, entity_id FROM public.admin_audit_log
ORDER BY created_at DESC LIMIT 3;
-- Mong đợi: có dòng mới với action = 'reward_config.update'
```

> ✅ **Đã chạy 2026-09-20:** cả 6 route tải đúng số liệu, không trang nào treo hay báo lỗi;
> chuỗi ghi trả đúng hình dạng PostgREST (`{ data: null, error: null }` cho `UPDATE` 0 dòng).

---

# �📅 PHẦN E — Khung cho các giai đoạn sau

_(Chưa làm — điền chi tiết khi bắt đầu từng giai đoạn)_

### Giai đoạn 2 — Hỗ trợ & phân tích

**2a — Công cụ hỗ trợ** → ✅ **đã code xong, test ở [PHẦN F](#-phần-f--giai-đoạn-2a-tra-cứu--hồ-sơ-bé)**

- [x] Tra cứu học sinh theo nickname / email phụ huynh — `TC-2.3`
- [x] Trang hồ sơ 1 bé: tiến độ, chuỗi ngày, danh sách lỗi sai, lịch sử giao dịch Xu/XP — `TC-2.1` → `TC-2.6`

**2b — Tầng dữ liệu phân tích** → 📄 kế hoạch: [`docs/phase_2b_plan.md`](phase_2b_plan.md)
→ ✅ **2b-1 + 2b-2 đã test PASS** — test ở PHẦN H

- [x] `question_attempts` ghi được khi trả lời câu hỏi — `TC-2.15`, `TC-2.17`
- [x] 🔴 `ms` không vượt trần (câu bỏ dở giữa chừng ghi `NULL`) — `TC-2.19`
- [x] 🔴 Trả lời được câu hỏi A: **khuôn/câu nào có tỉ lệ sai cao bất thường?** — `TC-2.23`
- [x] Trả lời được câu hỏi B: **đoán bừa** (nhanh + sai) vs **không hiểu** (chậm + sai) — `TC-2.23`
- [x] Trả lời được câu hỏi C: **kỹ năng nào bé yếu thật sự?** — `TC-2.23`
- [x] **Khách KHÔNG ghi attempt** — đổi ngày 2026-09-20. Bảng này ghi rất nhiều nên mở quyền
      ghi ẩn danh là mở đường spam. `child_id` NOT NULL, không có policy `anon` — `TC-2.18`
- [x] Mini game + màn hình Admin `/analytics` — lát **2b-2**
      → ✅ `TC-2.24` → `TC-2.30` PASS
- [ ] `app_events` — 📌 **hoãn**, không test giai đoạn này

**2c — Inbox phản hồi**

- [x] Hộp thư báo lỗi câu hỏi hoạt động đầu-đến-cuối — `TC-2.8` → `TC-2.13`

> ✂️ **Đã cắt khỏi GĐ 2 (2026-09-20):** khôi phục streak thủ công · cấp/thu Xu thủ công ·
> cấp Streak Freeze · reset PIN phụ huynh từ xa. Lý do: xem `docs/admin_portal_plan.md`
> mục _Giai đoạn 2_ và _Nhóm B_.

### Giai đoạn 3 — CMS

> 📄 Lát 3a (schema + migrate + bộ kiểm tra): [`docs/phase_3a_plan.md`](phase_3a_plan.md)
> → 🔧 **đã code xong**, test ở **PHẦN J**
>
> 🎯 Chia lát vì đây là giai đoạn **rủi ro cao nhất** của cả kế hoạch. Lát 3a **không có
> giao diện** và **không đổi hành vi app** — dựng và kiểm dữ liệu trước, bật lên sau.

- [x] Migration nội dung lên `content_*` — `TC-3a.1` → `TC-3a.10` PASS
- [x] 🔴 `anon` **không** đọc được bài `status = 'draft'` — `S-17` + `TC-3a.2`, `TC-3a.3`, `D-15`
- [x] 🔴 Tắt `content_source = 'static'` → app chạy lại bằng data cứng _(lát 3d)_ — `TC-3d.5`
- [x] Admin sửa bài → app nhận nội dung mới không cần build _(lát 3c + 3d)_ — `TC-3c.5`, `TC-3d.3`, `TC-3d.7`
- [x] Publish bài lỗi → **revert** được về phiên bản trước _(lát 3c)_ — `TC-3c.7`, `TC-3c.8`
- [x] Guest mode vẫn học được _(lát 3d)_ — `TC-3d.6` (`D-18`: khách đọc 5/41/362, 0 bài nháp)
- [x] Offline lần đầu (chưa từng mở app) vẫn dùng được file tĩnh _(lát 3d)_ — `TC-3d.4`
- [x] 🔴 Biết được 1 bé cụ thể đang dùng `content_version` nào _(lát 3d)_ — `0013` + `TC-3d.9` + `D-19`

> 📌 **GĐ 3 ĐÃ ĐỦ 6/6 DoD (2026-09-20).** Điều **#6** làm bằng `0013`: 3 cột
> `content_version` · `content_source` · `content_seen_at` trên `child_progress`, máy bé báo
> lên kèm nhịp đồng bộ tiến độ (không thêm request nào), và hồ sơ bé trên Admin hiện
> _"Nội dung bé đang thấy: phiên bản 21 · cache trong máy · báo lúc …"_ kèm cảnh báo khi
> số của bé nhỏ hơn số hiện tại.
>
> ✅ **Đo lại bằng BÉ THẬT (2026-09-20) — #6 không còn là "có cột trên bảng":**
> `child_progress` có **1/4** bé đã báo lên: bé `7cdfd2c1-2c5e-4b8d-967c-bf704c07a278`
> với `content_version = 24` · `content_source = "db"` · `content_seen_at = 2026-09-20T16:16:49Z`.
> Trước lượt này là **0/4** ⇒ đường "máy bé báo phiên bản nó đang chạy" đã chạy thật
> đầu-cuối với một bé đã đăng nhập, không chỉ chạy trong phép thử.
>
> ⚠️ **Đọc đúng giới hạn:** đây là **báo cáo của lần cuối máy bé còn mạng**, KHÔNG phải
> trạng thái trực tiếp — máy đang offline thì không báo lên được (đúng lúc cần nhất). Nên
> luôn đọc con số **kèm mốc thời gian**; và `content_source = "static"` là ca đáng nghi
> nhất: máy bé đang chạy nội dung nằm trong **bundle** (bản lúc build app).

### Giai đoạn 4 — Nâng cao

- [ ] Chỉnh độ khó bot đấu trường từ Admin
- [ ] Health dashboard: tỉ lệ lỗi sync, quota Supabase
- [ ] Banner thông báo hiện trên app
- [ ] Sức khỏe kinh tế: tổng Xu lưu hành, Xu kiếm/ngày, Xu tiêu/ngày

---

# 📊 BẢNG THEO DÕI KẾT QUẢ

| ID       | Tên test                                            | Kết quả | Ngày       | Ghi chú                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------- | --------------------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| TC-0.1   | Migration chạy sạch                                 |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.2   | Vá lỗ hổng leaderboard                              |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.3   | User thường không đọc được hồ sơ người khác         |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.4   | `is_admin()` trả đúng                               |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.5   | `admin_audit_log` bất biến                          |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.6   | Admin Portal: đăng nhập đúng người                  |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.7   | Thông báo lỗi phân biệt đúng                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-0.8   | Bundle tách biệt                                    |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.1   | Seed đúng giá trị gốc                               |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.2   | Phát thưởng khớp cấu hình                           |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.3   | 🔴 Đổi config → app nhận ngay                       |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.4   | Hệ số nhân X2                                       |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.5   | Công thức lên cấp                                   |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.6   | Tắt một mục phần thưởng                             |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.7   | Sổ cái ghi đúng và đầy đủ                           |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.8   | Mua hàng ghi sổ âm                                  |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.9   | Audit log ghi thay đổi config                       |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.10  | Validate form chặn dữ liệu sai                      |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.11  | Offline dùng giá trị mặc định                       |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.12  | Guest mode không nhận thưởng                        |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.13  | Danh sách người dùng tải đúng                       |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.14  | Tìm kiếm theo tên bé / email phụ huynh              |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.15  | Phân trang                                          |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.16  | Khoá / Mở khoá tài khoản                            |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-1.17  | Cảnh báo Xu bất thường                              |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.1   | Guest mode vẫn học được                             |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.2   | Tiến độ guest chuyển lên cloud                      |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.3   | Đồng bộ localStorage ↔ Supabase                     |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.4   | Bảng xếp hạng vẫn chạy                              |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.5   | 6 mini game vẫn chơi được                           |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.6   | Thú cưng vẫn nuôi được                              | PASS    | 2026-09-21 | 2 lần ghi lên `child_pets` cách nhau **3,142s** · `exp` 0→15 · `hunger` 90→100 · `apple` 3→2 — **khớp chính xác `feedPet("apple")`**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |     |
| TC-R.7   | Sổ Tay Ôn Bài Sai: phiên nhiều câu                  |         |            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-R.8   | Số thưởng hiển thị khớp config                      |         |            |
| TC-R.9   | Khách không lưu gì xuống máy                        | PASS    | 2026-09-21 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.1   | Migration 0004 chạy sạch                            | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.2   | Hồ sơ bé tải đủ các khối                            | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.3   | Điều hướng tới hồ sơ                                | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.4   | Đồng bộ câu sai lên `child_mistakes`                | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.5   | Số liệu hồ sơ khớp app của bé                       | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.6   | Bé không tồn tại → thông báo gọn                    | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.7   | Không có biến chưa khai báo _(tự động)_             | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.8   | Migration 0005 chạy sạch                            | PASS    | 2026-09-20 | 5 policy đủ, đúng vai trò                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| TC-2.9   | Đã đăng nhập thì báo lỗi gắn với bé                 | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.10  | Khách vẫn báo được, `child_id` = NULL               | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.11  | Quyền ẩn danh bị khoá chặt                          | PASS    | 2026-09-20 | 6/6 phép thử đều bị chặn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-2.12  | Màn hình Báo lỗi câu hỏi trên Admin                 | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.13  | Đổi trạng thái có ghi audit log                     | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.14  | Migration 0006 chạy sạch                            | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.15  | Trả lời 1 câu → có dòng ghi lại                     | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.16  | Câu sinh tự động ID theo KHUÔN                      | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.17  | `source` phân biệt luyện tập / ôn sai               | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.18  | Khách KHÔNG ghi gì                                  | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.19  | `ms` vượt trần ghi NULL                             | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.20  | `anon` không đọc / sửa / xoá được                   | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.21  | Hàm purge không gọi được qua API                    | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.22  | `purge_old_attempts(10)` bị từ chối                 | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.23  | 3 câu SQL trả lời được A/B/C                        | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.24  | `generateCalculation` đánh ID theo khuôn            | PASS    | 2026-09-20 | 1500 lượt, 16 khuôn, 0 lỗi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| TC-2.25  | Mini game → mỗi lần trả lời một dòng                | PASS    | 2026-09-20 | `S-14`: 6 game đều ghi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-2.26  | Cân Bằng Thần Kỳ ghi `ref` riêng                    | PASS    | 2026-09-20 | `calc_balance_*`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-2.27  | `/analytics` tải được, 3 khối A/B/C có số           | PASS    | 2026-09-20 | 30 lượt, khối B/C có dòng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| TC-2.28  | Bộ lọc lớp + khoảng ngày đổi số liệu                | PASS    | 2026-09-20 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-2.29  | Chưa đủ lượt → thông báo rõ ràng                    | PASS    | 2026-09-20 | "còn 3 khuôn chưa đủ"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TC-2.30  | Migration 0007 + khách không gọi được hàm           | PASS    | 2026-09-20 | `D-13`: HTTP 401                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-M.1   | Sidebar thành ngăn kéo ở mobile                     | PASS    | 2026-09-20 | 3 cách đóng đều đúng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| TC-M.2   | Không cuộn ngang cấp trang ở mọi route              | PASS    | 2026-09-20 | 6 route, 375px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| TC-M.3   | Bảng rộng cuộn trong hộp riêng                      | PASS    | 2026-09-20 | bảng 860px trong hộp 341px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| TC-M.4   | Desktop không đổi                                   | PASS    | 2026-09-20 | 1280px: sidebar tĩnh 256px                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| TC-M.5   | Menu đủ tương phản để đọc                           | PASS    | 2026-09-20 | 19/19 mục ≥ 4.5:1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| TC-M.6   | 🔴 Mọi menu hết trống · sidebar đủ cao              | PASS    | 2026-09-20 | thừa 0 cả 6 route · sidebar 420/420                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| TC-M.7   | 🔴 Các bảng cạnh nhau khớp cột                      | PASS    | 2026-09-20 | 7 bảng · 7 độ phân giải · 0 ô lấn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| TC-3a.1  | Migration 0008 chạy sạch                            | PASS    | 2026-09-20 | 4 bảng tồn tại                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| TC-3a.2  | 🔴 Bài nháp không lộ ra cho khách                   | PASS    | 2026-09-20 | `S-17` + `D-15`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3a.3  | 🔴 `anon` không đọc được bảng phiên bản             | PASS    | 2026-09-20 | `D-14`: 0 dòng dù có 362                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-3a.4  | Script báo đúng 5/41/362/1505                       | PASS    | 2026-09-20 | `S-15`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3a.5  | DB khớp số dòng + số bài mỗi chương là THẬT         | PASS    | 2026-09-20 | `--verify`: khớp hết                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| TC-3a.6  | So từng bài, không chỉ đếm tổng                     | PASS    | 2026-09-20 | 0 bài lệch / 362                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-3a.7  | Chạy lại không sinh dòng trùng                      | PASS    | 2026-09-20 | Dán lại `02-bai-lop-1.sql` → vẫn 362 bài                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-3a.8  | Bộ kiểm tra bắt được quiz sai đáp án                | PASS    | 2026-09-20 | `S-16`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3a.9  | Bộ kiểm tra bắt được `dialogue` sai đáp án          | PASS    | 2026-09-20 | `S-16`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3a.10 | `content_source` vẫn là `"static"`                  | PASS    | 2026-09-20 | `--verify` tự kiểm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| TC-3b.1  | Cây đọc từ DB: 5 lớp · 41 chương · 362 bài          | PASS    | 2026-09-20 | khớp `--verify`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3b.2  | Số bài mỗi lớp: 84/91/101/46/40 = 362               | PASS    | 2026-09-20 | tổng đúng 362                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TC-3b.3  | Mở / đóng nhánh lớp và chương                       | PASS    | 2026-09-20 | Lớp 1 mở sẵn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| TC-3b.4  | Tìm theo mã bài / tên chương / không khớp           | PASS    | 2026-09-20 | 2 · 22 · 0 bài                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| TC-3b.5  | 🔴 Chỉ đọc, đọc từ DB chứ không file tĩnh           | PASS    | 2026-09-20 | `S-18` + canary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3b.6  | Chọn bài → chi tiết đúng 4 slide                    | PASS    | 2026-09-20 | xem trước chọn theo từng kiểu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TC-3b.7  | Chi tiết không mất khi xoá ô tìm                    | PASS    | 2026-09-20 | không treo "Đang tải…"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3b.8  | 🔴 Mobile 375px: xếp dọc, không cuộn ngang          | PASS    | 2026-09-20 | 0 phần tử tràn ở 375/768/1280                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TC-3b.9  | Bài nháp hiện nhãn `nháp`                           | PASS    | 2026-09-20 | 3 chỗ: cây · dòng đếm · chi tiết                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-3b.10 | Lỗi đọc nội dung hiện thông báo rõ                  | PASS    | 2026-09-20 | HTTP 500 → khung đỏ, không trắng                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-3b.11 | 🔴 Bố cục dùng hết chiều cao, khung tự cuộn         | PASS    | 2026-09-20 | hết 157px trống · trang không cuộn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| TC-3b.12 | 🔴 Dùng hết bề rộng, không cắt chữ bằng `…`         | PASS    | 2026-09-20 | 288px → 40px · 0 chữ bị cắt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TC-L.1   | 🔴 Hẹn giờ truy vấn chạy THẬT                       | PASS    | 2026-09-20 | `S-19` + canary đã đo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TC-L.2   | 🔴 "Hố đen": báo lỗi rõ, không treo                 | PASS    | 2026-09-20 | dừng sau 16,3s, không trắng màn hình                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| TC-L.3   | Mọi trang vẫn chạy đúng sau khi bọc client          | PASS    | 2026-09-20 | 6 route + chuỗi ghi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| TC-3c.1  | 🔴 `0009` sạch · bảng nháp không có `anon`          | PASS    | 2026-09-20 | `D-16` xanh sau `0012`: bảng nháp khách 0 dòng, 6 hàm chặn khách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| TC-3c.2  | 🔴 Form sinh từ schema, không nuốt khoá             | PASS    | 2026-09-20 | `S-23`: 6 kiểu · 1505 slide                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TC-3c.3  | 🔴 Chỉ ghi qua hàm, không ghi thẳng bảng            | PASS    | 2026-09-20 | `S-22` + canary 4 vế                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| TC-3c.4  | Lưu nháp → app của bé KHÔNG thấy gì                 | PASS    | 2026-09-20 | Bấm thật: lưu nháp xong app bé vẫn tiêu đề cũ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TC-3c.5  | 🔴 Publish → phiên bản + version + vết              | PASS    | 2026-09-20 | Bấm thật: `Đã publish thành phiên bản 3`, app bé nhận                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TC-3c.6  | 🔴 Đáp án sai bị CHẶN, không lưu được               | PASS    | 2026-09-20 | Bấm thật: xoá đáp án khỏi lựa chọn ⇒ nút Lưu/Publish **BỊ MỜ** + khung đỏ “đang là 3 (không có trong lựa chọn)”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3c.7  | 🔴 Hoàn tác, và hoàn tác được việc hoàn tác         | PASS    | 2026-09-20 | Bấm thật: `quay về phiên bản 1, ghi thành phiên bản 4`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3c.8  | 🔴 Rút bài: van an toàn                             | PASS    | 2026-09-20 | Bấm thật: `draft` · version 15→16 · bé **đổi màn hình** là bài biến mất (12→11 bài, không tải lại trang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-3c.9  | Khách không gọi được hàm publish                    | PASS    | 2026-09-20 | `D-16`: `bump_content_version:401(revoke)` · admin vẫn gọi được (`Đã lưu bản nháp`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| TC-3c.10 | 🔴 Trang Tham khảo: chỉ đọc + không nói sai về app  | PASS    | 2026-09-20 | `S-26` : chỉ đọc · **9 biểu cảm khớp app (cả mặt)** · 6 kiểu slide đủ nhãn · 4 bảng · 6 thẻ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| TC-3d.1  | 🔴 `0010` + `0011` sạch, công tắc đã bật            | PASS    | 2026-09-20 | `D-17`: `5 lớp có age_range · content_source = "remote"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-3d.2  | 🔴 Cây DB giống hệt cây tĩnh, từng khoá             | PASS    | 2026-09-20 | `S-24`: 5/41/362/1505 · cứng từng khoá                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| TC-3d.3  | 🔴 Sửa bài → app nhận nội dung mới, no build        | PASS    | 2026-09-20 | Log thật: `đọc từ DB: 5 lớp · 41 chương · 362 bài · 1505 slide`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3d.4  | Offline vẫn học được (cache → tĩnh)                 | PASS    | 2026-09-20 | Đo thật: chặn hết `*.supabase.co` → còn cache: **1/6 slide** · xoá cache **vẫn học được** (rơi về file tĩnh)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| TC-3d.5  | 🔴 Công tắc về `static` → dùng lại tĩnh + xoá cache | PASS    | 2026-09-20 | Mô phỏng công tắc (chưa UPDATE DB thật): cache **bị xoá** ✅ · trang chương vẫn đủ 12 bài · về `remote` cache trở lại 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| TC-3d.6  | 🔴 Khách đọc được cây, không thấy bài nháp          | PASS    | 2026-09-20 | `D-18`: `5 lớp · 41 chương · 362 bài published · 0 bài nháp`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| TC-3d.7  | 🔴 Sửa bài → app ĐANG MỞ nhận được khi quay lại tab | PASS    | 2026-09-20 | Đo thật: publish `phiên bản 10` → quay lại tab ⇒ `app_config` + `content_*`, cache `9 → 10`, tiêu đề mới hiện                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| TC-3d.8  | 🔴 Publish giữa lúc đang học → không cắt ngang bài  | PASS    | 2026-09-20 | Đo thật: đang ở slide **3/6** → admin rút một bài khác (v20) → chờ 7s **vẫn 3/6**, bấm tiếp lên **4/6** · rời bài ⇒ cache 19→20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| TC-3c.11 | 🔴 Tạo bài học MỚI từ Admin                         | PASS    | 2026-09-20 | `S-27` PASS · **đã tạo thật**: `g1-c1-l13` `draft` · sort 12 · 1 slide · `content_version` **vẫn 21** · 1 dòng `lesson.create` · rồi **xoá sạch** về 362 bài / 0 nháp. Bấm thật **bắt được lỗi thật** `Cannot read properties of null (reading 'id')` → đã sửa bằng `chiTiet?.id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| TC-3d.9  | 🔴 Biết một bé đang dùng phiên bản nội dung nào     | PASS    | 2026-09-20 | `D-19` PASS (có đủ 3 cột) + **`S-28` PASS** (app thật sự gửi báo cáo, đủ cả 2 đường ghi) · đo màn hình **cả 4 nhánh** (chưa báo / 9999 cache / 3 static / `null` db) bằng màn chắn `fetch` — **không ghi gì vào DB** · cảnh báo vàng đọc đúng `content_version` thật = 21                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| TC-3d.10 | 🔴 Xoá bài THẲNG TRONG DB → app không vỡ            | PASS    | 2026-09-20 | `S-29` PASS · đo thật: bài 0 slide ✓ · slide kiểu lạ ✓ · mã bài không có trong cây ✓ (+ nút Thử tải lại **gọi thật**: `app_config` 2→3) · bài lành vẫn chạy ✓ · **cây mới về giữa lúc đang học mà bé vẫn ở `1/2`** ✓ · Admin: xoá `g1-c1-l13` trong DB ⇒ hiện _"không còn trong DB"_, cây 13→12 · hết **362 bài**, **không** `PGRST116` ✓ · **`0014` đã chạy và đo cả hai chiều**: xoá bài **nháp** ⇒ số **không đổi** (21→21) · xoá bài **đã publish** ⇒ số **TĂNG 1** (22→23) · sổ kiểm toán có `lesson.delete` đúng bài, `actor_id` = admin đã xoá · **máy bé tự bỏ bài**: cache `v22 · 363 bài` → **`v23 · 362 bài`**, trang chương 13 → **12 bài**, chỉ bằng cách **mở lại app**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| TC-3c.12 | 🔴 Xoá MỘT bài học, có chốt gõ chữ                  | PASS    | 2026-09-20 | `S-30` PASS · đo giao diện thật: nút có mặt ✓ · hộp thoại đủ cảnh báo ✓ · nút xoá **mờ** khi chưa gõ / **mờ** khi gõ sai `delete this lessonx` (+ nhắc "Chưa khớp") / **bật** khi đúng ✓ · `Esc` đóng mà không xoá gì ✓ · bấm khi chưa có hàm ⇒ hiện _"Chưa chạy migration `0015`…"_, **không xoá gì** (12 bài / 362) ✓ · cảnh báo số lịch sử đúng dữ liệu thật (**1 báo lỗi câu hỏi** cho `g1-c1-l1`) ✓ · **`0015` đã chạy — đo trọn vòng qua nút** (2026-09-20): chọn bài thử `published` → gõ đúng cụm → bấm xoá ⇒ hộp thoại **tự đóng**, hiện _"🗑️ Đã xoá bài `g1-c1-l13`…"_, cây **13 → 12**, tổng về **362**, `content_lessons` còn **0 dòng**, bản nháp bị xoá theo (`content_lesson_drafts` = 0), **đúng 1 dòng** vết (3 → 4) với `actor_id` = admin và `before` = `{status: "published", slides: 1}`, `content_version` **23 → 24**. 🔴 Phép đo bắt tiếp **một lỗi chữ trong mã**: `reason` ghi _"Xoá thẳng trong DB (không qua giao diện)"_ trong khi lần xoá đi **từ giao diện** ⇒ `0016` sửa thành suy từ `auth.uid()`. ✅ **`0016` đã chạy + đo lại**: xoá **từ nút** ⇒ `reason = "Xoá từ trang quản trị"` ✓ và `actor_id` = tài khoản admin ✓ — **khớp nhau** (cùng một nguồn sự thật, không thể mâu thuẫn) · số dòng vết **đúng 1** (4 → 5) · `content_version` **24 → 24** (bài thử là `draft` nên **không** tăng, máy bé không bị làm phiền) · và quyền sau `CREATE OR REPLACE` được cấp lại đúng nên nút xoá **vẫn chạy** (không `permission denied`). ⏳ Nhánh `auth.uid() IS NULL` (`reason = 'Xoá bằng SQL…'`) chỉ đo được ở SQL Editor — câu tự kiểm (3) trong `0016`. |

> 📌 **`Cách A` — đã đo được:** rút bài → bé chỉ **đổi màn hình** ⇒ cache `13 → 14`, rồi `15 → 16` · bài biến mất, 12 → 11 bài — KHÔNG tải lại trang, KHÔNG đổi tab. Chi tiết ở `TC-3d.7` và `TC-3c.8`.

---

## 🔍 Xử lý khi test FAIL

| Triệu chứng                                                                                                    | Nguyên nhân thường gặp                                                                                              | Kiểm tra                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thưởng ra số cũ, không theo config                                                                             | DB chưa có bảng, hoặc cache cũ                                                                                      | `SELECT * FROM reward_configs LIMIT 1;` rồi xoá `toan-vui-reward-configs` trong localStorage                                                                                      |
| Không có dòng nào trong `coin_transactions`                                                                    | Đang ở guest mode                                                                                                   | Đăng nhập rồi thử lại                                                                                                                                                             |
| `ReferenceError: addCoins is not defined`                                                                      | Sót chỗ chưa refactor                                                                                               | Tìm `addCoins(` trong `client/src`                                                                                                                                                |
| Ghi sổ lỗi nhưng thưởng vẫn đúng                                                                               | Bình thường — sổ cái là "bắn rồi quên"                                                                              | Xem Console, kiểm tra RLS bảng `coin_transactions`                                                                                                                                |
| Vào admin bị đá về trang đăng nhập                                                                             | Chưa cấp `role = 'admin'`                                                                                           | `SELECT role FROM profiles WHERE email = '...';`                                                                                                                                  |
| Đăng nhập admin xong về trang chủ                                                                              | Thiếu Redirect URL                                                                                                  | Supabase → Authentication → URL Configuration                                                                                                                                     |
| Ôn 2 câu, trả lời 1 câu thì nhảy luôn câu 2 / phiên tự kết thúc                                                | `dueMistakes` bị gọi lại mỗi render, câu vừa trả lời rụng khỏi danh sách                                            | Phải dùng snapshot `reviewQueue` chụp lúc mở tab — xem `TC-R.7`                                                                                                                   |
| Vừa trả lời sai mà Sổ đã rỗng                                                                                  | Đúng thiết kế — câu mới hẹn ôn **ngày mai**                                                                         | Chạy mục **A.6** nếu cần test ngay                                                                                                                                                |
| `Đã thuộc làu: 0 câu` dù vừa trả lời đúng                                                                      | Đúng thiết kế — cần **3 lần** đúng liên tiếp mới lên bậc 4                                                          | `JSON.parse(localStorage.getItem("toan-vui-progress")).state.mistakesQueue`                                                                                                       |
| Mini game vẫn báo thưởng cũ sau khi đổi trên Admin                                                             | App không nhận được sự kiện từ tab khác (khác origin)                                                               | Tải lại trang app; kiểm tra cache `toan-vui-reward-configs` — xem `TC-R.8`                                                                                                        |
| `X is not defined` (`ReferenceError` lúc chạy)                                                                 | Biến chưa khai báo — build **không** bắt được                                                                       | `npm run test:portal:static` → dòng `S-12` — xem `TC-2.7`                                                                                                                         |
| `invalid input syntax for type uuid: "<child-uuid>"`                                                           | Chưa thay **chỗ trống** `<child-uuid>` bằng UUID thật                                                               | Mục **A.7** — lấy UUID từ URL hồ sơ bé hoặc từ `SELECT id, nickname FROM child_profiles`                                                                                          |
| `/analytics` báo `Không đọc được số liệu: …`                                                                   | Chưa chạy `0007`, hoặc mất kết nối                                                                                  | `SELECT public.get_question_analytics(30, NULL);` trong SQL Editor — xem `TC-2.30`                                                                                                |
| `/analytics` ra số khác 3 câu SQL ở `TC-2.23`                                                                  | **Bình thường** — ngưỡng và cửa sổ ngày khác nhau                                                                   | Đối chiếu bằng `SELECT jsonb_pretty(public.get_question_analytics(30, NULL));` — xem `TC-2.27`                                                                                    |
| `/content` ghi `0 lớp · 0 chương · 0 bài` + hướng dẫn chạy `0008`                                              | Chưa chạy migration, hoặc chưa dán `content-seed/`                                                                  | `SELECT count(*) FROM content_lessons;` — xem `TC-3b.1`                                                                                                                           |
| Bất kỳ trang nào treo ở "Đang tải…" quá 30 giây                                                                | Request rơi vào "hố đen" — server không bao giờ trả lời                                                             | ✅ Đã chữa ở lát **L**; nếu vẫn treo thì lớp bọc đã bị gỡ — `npm run test:portal:static` → `S-19`                                                                                 |
| `/content` phải cuộn ngang trên điện thoại                                                                     | Lưới thiếu `grid-cols-1`, hoặc `span` cắt chữ thiếu `min-w-0`                                                       | Đo `getComputedStyle(luoi).gridTemplateColumns` — xem `TC-3b.8`                                                                                                                   |
| Nhãn lớp ghi `10 ch · 2 bài` trong lúc đang tìm                                                                | Số chương chưa lọc nhưng số bài đã lọc — hai vế khác hệ quy chiếu                                                   | Phải cùng hệ quy chiếu, vd `1 ch · 2 bài` — xem `TC-3b.4`                                                                                                                         |
| Không thấy nhãn `nháp` trên bài chưa publish                                                                   | Hiện không có bài nháp nào để mà thấy                                                                               | `UPDATE content_lessons SET status='draft' WHERE id='…'` — xem `TC-3b.9`                                                                                                          |
| `/content` chọn bài xong thì **cả trang dài ra** phải cuộn                                                     | Dùng `min-h-dvh` (mức sàn) thay vì `h-dvh` (xác định)                                                               | `getComputedStyle(root).height` phải bằng chiều cao khung — xem `TC-3b.11`                                                                                                        |
| Tên chương / tên bài bị cắt bằng `…`                                                                           | Còn dùng `truncate` trên tên nội dung — nó cắt mà **không báo gì**                                                  | Bỏ `truncate`, cho xuống dòng — xem `TC-3b.12`                                                                                                                                    |
| Màn hình lớn thừa hai bên một khoảng lớn                                                                       | Còn `max-w-*xl` chặn bề rộng ở thẻ gốc của trang                                                                    | Bỏ giới hạn; thừa mỗi bên phải bằng **đúng 0** — xem `TC-M.6`                                                                                                                     |
| Cửa sổ thấp: cả trang cuộn, menu bị cắt                                                                        | Sidebar để `lg:static` nên cao theo nội dung menu rồi kéo cả hàng flex cao theo                                     | `lg:sticky lg:top-0 lg:h-dvh` + `overflow-y-auto` — xem `TC-M.6`                                                                                                                  |
| Mini game có `+ Xu` nhưng `question_attempts` không có dòng nào                                                | Chưa gắn `recordAttempt`, hoặc đang ở chế độ **Khách**                                                              | `npm run test:portal:static` → dòng `S-14`; khách không ghi gì (`TC-2.25`)                                                                                                        |
| Cột lệch nhau giữa các bảng trong cùng trang                                                                   | Nhiều `<table>` để `table-layout: auto` — mỗi bảng tự chia cột theo nội dung riêng                                  | `table-fixed` + `<colgroup>` khai theo `%` — xem `TC-M.7`                                                                                                                         |
| Dòng chữ dài quét ngang gần hết màn hình                                                                       | Chú thích chạy hết bề ngang sau khi bỏ trần bề rộng                                                                 | Chặn **chỉ đoạn văn** ở `max-w-[70ch]`; bảng/thẻ vẫn để rộng — xem `TC-M.6`                                                                                                       |
| Sửa bài trên Admin mà app của bé không đổi                                                                     | Đang sửa BẢN NHÁP — phải bấm **Publish** mới lên sóng                                                               | Panel phải trên cùng ghi `Có bản nháp chưa publish` — xem `TC-3c.4`                                                                                                               |
| "permission denied for function publish_lesson"                                                                | `REVOKE ... FROM PUBLIC` mà QUÊN `GRANT ... TO authenticated`                                                       | Phải có **cả hai**; cổng `S-22` đếm cặp revoke/grant — xem `TC-3c.1`                                                                                                              |
| Phụ huynh thấy `Lớp 1 ()`                                                                                      | Bật `content_source = remote` khi chưa chạy `0010` (thiếu cột `age_range`)                                          | Chạy `0010` TRƯỚC `0011` — xem `TC-3d.1`                                                                                                                                          |
| Sửa bài xong, app bé ĐANG MỞ không thấy đổi                                                                    | Nội dung chỉ được nạp **một lần** lúc mở app — không có lần kiểm lại nào                                            | Quay lại tab (app tự kiểm `content_version`); cổng `S-25` canh — xem `TC-3d.7`                                                                                                    |
| Gạt công tắc về `static` mà app vẫn dùng dữ liệu DB                                                            | Máy bé còn cache `toan-vui-content`                                                                                 | Xoá `localStorage['toan-vui-content']`; code phải tự xoá — xem `TC-3d.5`                                                                                                          |
| Khách ẩn danh gọi được hàm RPC của CMS (`HTTP 200`)                                                            | Supabase **default privileges** cấp `EXECUTE` thẳng cho `anon` — `REVOKE ... FROM PUBLIC` KHÔNG gỡ được             | `REVOKE ... FROM anon` tường minh **và** chốt `IF NOT is_admin()` trong thân hàm — `0012`, `TC-3c.9`                                                                              |
| `column child_progress.content_version does not exist` (lỗi 42703)                                             | Chưa chạy `0013_content_report_and_create_lesson.sql` — hồ sơ bé và cổng `D-19` đều cần 3 cột mới                   | Chạy `0013` trong SQL Editor; `npm run test:portal` → dòng `D-19` phải xanh — xem `TC-3d.9`                                                                                       |
| Xoá bài bằng SQL xong mà **máy bé vẫn hiện bài đó**                                                            | Chưa chạy `0014_xoa_bai_hoc_trong_db.sql` — không ai tăng `content_version`, nên cache của bé không bao giờ bị thay | Chạy `0014`; tự kiểm bằng 4 câu ở cuối file migration (số phải **tăng 1**) — xem `TC-3d.10`                                                                                       |
| Admin báo `PGRST116 … The result contains 0 rows` khi bấm một bài                                              | Bài đó **đã bị xoá thẳng trong DB** lúc trang đang mở, và mã còn dùng `.single()`                                   | Từ `0014`: mã dùng `.maybeSingle()` + nhánh `khongCon` ⇒ hiện _"không còn trong DB"_ và tự tải lại cây — xem `TC-3d.10`                                                           |
| SQL Editor báo `42501 … Chỉ admin …` khi gọi một hàm CMS (`create_lesson`, `delete_lesson`, `publish_lesson`…) | **ĐÚNG THIẾT KẾ, không phải hàm hỏng.** SQL Editor chạy **không có JWT** ⇒ `auth.uid()` NULL ⇒ `is_admin()` false   | Đừng thử hàm CMS trong SQL Editor. Dựng dữ liệu bằng **SQL thô** (`INSERT`/`DELETE`/`UPDATE` — trigger vẫn chạy); thử hàm CMS từ **trang quản trị đã đăng nhập** — xem `TC-3c.12` |
| App của bé **trắng trang** ở một bài, console báo `reading 'type'`                                             | Dòng `content_lessons` đó có `payload` rỗng hoặc thiếu `slides` (thường do sửa tay trong SQL Editor)                | Đã chặn từ `TC-3d.10`: hiện _"Bài này chưa có nội dung"_; sửa dữ liệu bằng `save_lesson_draft` + publish                                                                          |
| Nút **➕ Thêm bài học vào chương này** báo lỗi `permission denied for function create_lesson`                  | Chạy `0013` mà thiếu `GRANT EXECUTE ... TO authenticated`                                                           | Cổng `S-27` canh đúng cặp `REVOKE` (khỏi `anon`) + `GRANT` (cho `authenticated`) — xem `TC-3c.11`                                                                                 |

## 5. Thú Cưng (ChildProfilePage)

1. **Ca đói 0%:** Khi `last_fed_time` trôi qua đủ lâu, Admin phải thấy `Đói bụng: 0%` mặc dù `hunger` trong DB là số >0.
2. **Ca Hộp Quà:** Admin phải thấy được số lượng Hộp quà Bùa XP của bé (biến `unopened_gift_boxes`).
