# Kế hoạch lát 3a — Schema nội dung + migrate lên DB

> Kế hoạch tổng cho GĐ 3 nằm ở `admin_portal_plan.md` (mục _GIAI ĐOẠN 3_). Tài liệu này
> đi chi tiết **lát đầu tiên** để duyệt trước khi viết code.

---

## ✅ TÌNH TRẠNG: XONG — đã chạy migration và test PASS hết

> `--verify`: **KHỚP HOÀN TOÀN** · 362 bài · 1505 slide · 0 bài lệch.
> `npm run test:portal`: **32 PASS · 0 FAIL · 0 SKIP**.
> `TC-3a.1` → `TC-3a.10`: PASS hết (kể cả `TC-3a.7` đã chạy lại thật).
> App của bé **không đổi hành vi** — `content_source` vẫn là `"static"`.

| Việc                   | Ở đâu                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| Migration 4 bảng + RLS | `supabase/migrations/0008_content_schema.sql`                      |
| Bộ kiểm tra nội dung   | `admin/src/lib/contentSchema.js`                                   |
| Script migrate         | `scripts/migrate-content.mjs`                                      |
| File SQL để dán        | `supabase/content-seed/` — 7 file, 462 KB                          |
| Test case              | `admin_portal_test_cases.md` → **PHẦN J** (`TC-3a.1` → `TC-3a.10`) |
| Cổng tự động           | `S-15`, `S-16`, `S-17` (tĩnh) · `D-14`, `D-15` (DB)                |

### Quy trình đã chạy

```powershell
# 1. Chạy 0008_content_schema.sql trong Supabase SQL Editor
# 2. Sinh file SQL nội dung, rồi dán lần lượt vào SQL Editor (01 → 99):
node scripts/migrate-content.mjs --sql
# 3. Đối chiếu — KHÔNG cần key đặc biệt nào:
node scripts/migrate-content.mjs --verify
```

### Hai chỗ kế hoạch dưới đây ghi SAI, đã sửa bằng số đo

Kế hoạch này (bản đã duyệt) chia khoá bắt buộc theo **suy luận**. Đo tần suất từng khoá trên
1505 slide thật thì lộ ra 2 chỗ sai — và nếu viết theo kế hoạch thì bộ kiểm tra sẽ **chặn
71 slide hợp lệ**:

| Khoá                      | Kế hoạch ghi (mục 4) | Đo được               |
| ------------------------- | -------------------- | --------------------- |
| `concept.rule`            | bắt buộc             | **291/296 = 98,3%**   |
| `concept.explanation`     | (ngầm) bắt buộc      | **287/296 = 97,0%**   |
| `visual.items` + `number` | bắt buộc             | **chỉ 11/82 = 13,4%** |

→ Quy tắc đã ghi vào đầu `contentSchema.js`: một khoá chỉ **bắt buộc** khi có mặt ở **100%**
slide của kiểu đó. Thấy nó trong vài ví dụ là chưa đủ.

### Một điểm khác kế hoạch: KHÔNG cần key ghi DB

Mục 5 dưới đây giả định phải có `SUPABASE_WRITE_KEY`. Khi viết code mới thấy **không cần khoá
bí mật nào cả**: sinh file `.sql` rồi dán vào SQL Editor — chỗ đó vốn chạy bằng quyền cao
nhất sẵn rồi, và bạn đã làm việc này 8 lần với các migration. Cách ghi thẳng (`--apply`) vẫn
còn đó, nhưng chỉ cần khi phải chạy đi chạy lại nhiều lần.

---

## 1. Vì sao tách 3a ra làm riêng

GĐ 3 được đánh dấu **"Rất lớn — rủi ro cao nhất"** trong kế hoạch tổng. Kinh nghiệm từ
GĐ 2b cho thấy cách duy nhất để làm phần lớn mà vẫn kiểm chứng được là **cắt thành lát
mỏng, mỗi lát có DoD kiểm được bằng số**.

**3a là lát dữ liệu — KHÔNG có giao diện.** Cuối 3a:

- Nội dung đã nằm trong DB, **số dòng khớp chính xác** với file tĩnh.
- `anon` **không** đọc được bài chưa publish.
- Có công tắc `content_source` để quay về file cứng.
- Có bộ kiểm tra để **không cho ghi nội dung hỏng** vào DB.

Mấu chốt: làm 3a xong thì **app vẫn chạy y như cũ** (vì `content_source` vẫn là `"static"`).
Không có gì thay đổi với người dùng cho tới lát 3d. Đây là chủ ý — dữ liệu dựng và kiểm
trước, bật lên sau.

---

## 2. 🔴 Số liệu ĐO ĐƯỢC — và 3 chỗ kế hoạch tổng đã sai

> Đo bằng `node scratch/inspect_content_shape.mjs` (đã viết, chạy được ngay).
> **Vì sao phải đo lại:** kế hoạch tổng viết từ lâu và chưa từng bị kiểm chứng bằng số.
> Mà chính kế hoạch 2b-2 đã sai 2 chỗ về `MathBalanceGame` và về nhánh lớp 5 của
> `generateCalculation`. Dựng schema trên số liệu chưa đo là lặp lại lỗi đó ở quy mô lớn
> hơn nhiều.

### 2.1. Quy mô thật

| Mục             | Số đo thật            | Kế hoạch tổng ghi      |
| --------------- | --------------------- | ---------------------- |
| Tổng dung lượng | **796,7 KB** (6 file) | 795 KB ✅ đúng         |
| Số lớp          | 5                     | 5 ✅                   |
| Số chương       | **41**                | "50 Chapters total" ❌ |
| Số bài          | **362**               | chưa ghi               |
| Số slide        | **1505**              | chưa ghi               |

**Chỗ sai 1:** `curriculum.js` dòng 2 ghi `// 5 Grades, 10 Chapters each (50 Chapters total)`.
Thực tế: Lớp 1/2/3 mỗi lớp **10 chương**, nhưng **Lớp 4 chỉ 6** và **Lớp 5 chỉ 5** → **41**.
Con số 50 chỉ đúng nếu cả 5 lớp đều có 10 chương.

| Lớp | Chương | Bài | Slide |
| --- | ------ | --- | ----- |
| 1   | 10     | 84  | 355   |
| 2   | 10     | 91  | 367   |
| 3   | 10     | 101 | 405   |
| 4   | **6**  | 46  | 207   |
| 5   | **5**  | 40  | 171   |

### 2.2. Sáu kiểu slide — và `concept` thật ra là 17 biến thể

| Kiểu       | Số slide | Các khoá trong `content`                                                                |
| ---------- | -------- | --------------------------------------------------------------------------------------- |
| `quiz`     | 396      | answer, items, mascotHint, options, question                                            |
| `story`    | 362      | mascotMood, text                                                                        |
| `summary`  | 362      | mascotMood, points, title                                                               |
| `concept`  | 296      | **13 khoá khác nhau** (xem dưới)                                                        |
| `visual`   | 82       | items, number, text                                                                     |
| `dialogue` | 7        | badge, correctAnswer, dialogueList, explanation, focusGraphic, options, question, title |

**Chỗ sai 2 — `dialogue` cũng là CÂU HỎI, không phải chỉ có "scene".** Kế hoạch tổng mô tả
`dialogue` là "có scene". Thật ra nó có `options` + `correctAnswer` + `question` — tức nó
được chấm đúng/sai y như `quiz`. Chính `LessonPage` cũng gọi `recordAttempt` ở nhánh
dialogue. Nếu bộ kiểm tra chỉ canh `quiz` thì **7 câu dialogue hỏng đáp án sẽ lọt qua**.

**Chỗ sai 3 — `concept` không phải một loại, mà là 17 tổ hợp khoá khác nhau:**

```
 151× badge + explanation + points + rule + title      ← dạng phổ biến nhất
  31× badge + example + explanation + rule + steps + title
  28× badge + explanation + rule + title
  25× badge + example + explanation + points + rule + title
  22× badge + example + explanation + rule + title
  13× badge + explanation + rule + steps + title
   5× badge + points + rule + title
   5× badge + explanation + rule + shape + shapeLabel + title
   5× badge + clock + explanation + rule + title
   2× badge + explanation + gallery + galleryTitle + title
  ... (7 tổ hợp nữa, mỗi tổ hợp 1-2 slide)
```

Nhưng nhìn kỹ thì **luôn có đúng 3 khoá bắt buộc** (`badge`, `rule`, `title`), phần còn lại
là các **khối tuỳ chọn** ghép vào. Và có 2 cặp luôn đi cùng nhau: `shape` + `shapeLabel`,
`gallery` + `galleryTitle`.

→ **Kết luận thiết kế: `concept` là MỘT kiểu** với 3 khoá bắt buộc + 8 khối tuỳ chọn.
Không dựng 17 schema riêng — làm vậy vừa không quản nổi vừa chặn mất các tổ hợp hợp lệ
chưa từng xuất hiện.

### 2.3. Metadata chương KHÔNG đáng tin

5 chương khai số bài nhiều hơn thực tế:

| Chương | Khai | Thật |
| ------ | ---- | ---- |
| g2-c8  | 10   | 2    |
| g2-c9  | 10   | 2    |
| g2-c10 | 12   | 3    |
| g3-c9  | 10   | 2    |
| g3-c10 | 12   | 3    |

**Đã kiểm tra — đây KHÔNG phải lỗi đang chạy.** `GradePage.jsx:91` và `HomePage.jsx:161`
đều viết `chapter.lessons?.length || chapter.totalLessons`, tức số thật luôn thắng. Nên
hiện tại không có gì hỏng. **Nhưng migrate thì phải đếm lại, không được chép
`totalLessons` vào DB** — nếu không thì DB mang sẵn một con số sai và lần sau ai đọc DB
cũng sẽ tin nó.

> 📌 Nhìn 5 chương đó thì thấy **nội dung còn thiếu**: chúng được thiết kế 10–12 bài
> nhưng mới viết 2–3. Đây là **khoảng trống nội dung thật**, không phải lỗi kỹ thuật.
> Ghi lại ở đây để sau này CMS có thể giúp bạn điền nốt.

### 2.4. Truyện nằm NGOÀI giáo trình

`storyData.js` (27,7 KB) **không** được `curriculum.js` import. Nó là 8 truyện riêng, mỗi
truyện có `scenes`, `gradeLevel`, `rewardCoins`, `rewardXp`, `topic`. Tức 396 KB được chia
thành "giáo trình" và "truyện" là **hai hệ khác nhau**.

**Đề xuất: 3a KHÔNG đụng tới truyện.** Đưa truyện vào CMS là quyết định riêng, làm sau.

---

## 3. Thiết kế schema (migration `0008_content_schema.sql`)

Số migration kế tiếp là **0008** (hiện có 0001 → 0007).

```
content_grades      id INT PK, name, description, icon, color, sort_order
content_chapters    id TEXT PK, grade_id FK, name, description, icon, color, sort_order
content_lessons     id TEXT PK, chapter_id FK, title, type, description, sort_order,
                    status ('draft'|'published'), payload JSONB,
                    published_at, published_by, updated_at, updated_by
content_lesson_versions
                    lesson_id FK, version INT, payload JSONB,
                    published_at, published_by   (chỉ ghi thêm, không sửa/xoá)
                    PK (lesson_id, version)
```

**Vì sao chương/bài dùng `TEXT` id chứ không `SERIAL`:** id thật đã có sẵn và có ý nghĩa
(`g1-c1-l1` nói ngay ra lớp 1, chương 1, bài 1). Đổi sang số tự tăng là ném thông tin đó
đi, và làm mọi log/lỗi khó đọc hơn. `question_attempts.lesson_id` cũng đang lưu dạng text
này — giữ nguyên là khớp sẵn.

**Chỉ ghi thêm (append-only) cho `content_lesson_versions`:** cùng nguyên tắc với
`admin_audit_log` và `question_attempts` — lịch sử phiên bản mà sửa được thì không còn là
lịch sử.

**Đề xuất hoãn bảng `content_lesson_drafts` sang lát 3c** (lúc có giao diện sửa). Lý do ở
mục 7 — đó là một quyết định có rủi ro rò rỉ dữ liệu, cần bạn xem kỹ.

### 3.1. RLS

| Bảng                      | `anon` + user thường              | admin  |
| ------------------------- | --------------------------------- | ------ |
| `content_grades`          | SELECT tất cả                     | tất cả |
| `content_chapters`        | SELECT tất cả                     | tất cả |
| `content_lessons`         | 🔴 **chỉ `status = 'published'`** | tất cả |
| `content_lesson_versions` | ⛔ **KHÔNG có policy nào**        | tất cả |

🔴 **Đây là yêu cầu bảo mật quan trọng nhất của lát 3a.** Nếu viết `USING (true)` cho
`content_lessons` thì **bài Draft lộ ra cho mọi khách vãng lai** — đúng loại lỗ hổng
`USING (true)` đã phải vá ở GĐ 0 với bảng `leaderboard`.

Bảng phiên bản dùng lại đúng cách đã chứng minh được ở `0006`: **không có policy cho
`anon`** → khách không thấy gì. Đã có test tự động `D-13` làm mẫu cho cách kiểm.

### 3.2. `app_config`

| Khoá              | Trạng thái                                     | Nội dung                                                           |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| `content_source`  | ✅ **đã có sẵn** từ `0001`, giá trị `"static"` | `"static"` hoặc `"remote"`                                         |
| `content_version` | ➕ **thêm ở 0008**                             | số nguyên, tăng mỗi lần publish. Client so số này để biết cache cũ |

`content_version` là chìa khoá cho yêu cầu E2 trong kế hoạch tổng: biết **một bé cụ thể
đang dùng phiên bản nội dung nào**, để debug khi phụ huynh báo lỗi.

---

## 4. Bộ kiểm tra nội dung — đề xuất **KHÔNG dùng `zod`**

Kế hoạch tổng ghi "Slide Type Registry + Zod schema". Tôi đề xuất **không** làm vậy:

- Cả `client` lẫn `admin` **đều chưa có `zod`**. Thêm nó là thêm một dependency thật, phải
  bảo trì phiên bản — trong khi tôi vừa từ chối thêm `lucide-react` chỉ để vẽ 3 đường kẻ,
  vì cùng một lý do.
- Các dạng cần kiểm rất đơn giản: khoá bắt buộc, khoá tuỳ chọn, mảng chuỗi, 2 cặp khoá đi
  cùng nhau. Khoảng **60 dòng** là đủ.
- Viết tay thì đọc được ngay trong repo, không phải học cú pháp của thư viện.

**Đặt ở đâu:** `admin/src/lib/contentSchema.js`. Một nguồn duy nhất, dùng cho:

1. **Script migrate** (lát 3a) — kiểm trước khi ghi vào DB. Script import trực tiếp file này.
2. **Trình sửa bài** (lát 3c) — kiểm trước khi admin bấm Lưu.

Đặt trong `admin/src` để Vite không phải với ra ngoài thư mục gốc. Script Node import vào
thì hoàn toàn bình thường.

**Bộ kiểm tra phải bắt được:**

| Kiểm                                                                                    | Vì sao                                                                              |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `type` thuộc đúng 6 kiểu đã biết                                                        | kiểu lạ thì `LessonPage` không biết render → màn hình trắng                         |
| Mỗi kiểu có đủ khoá bắt buộc                                                            | thiếu `content.text` thì slide trống                                                |
| `quiz` + **`dialogue`**: `options` không rỗng **và** đáp án nằm trong `options`         | 🔴 nếu không thì **không chấm được đúng**, mà app vẫn chạy như thường — sai âm thầm |
| `concept`: có đủ `badge`,`rule`,`title`; `shape`⟺`shapeLabel`; `gallery`⟺`galleryTitle` | đi một nửa cặp thì giao diện vỡ                                                     |
| `visual`: `items` là mảng, `number` là số                                               |                                                                                     |

**Chốt chặn thứ hai ở tầng DB** (chỉ kiểm thô, không chép lại toàn bộ luật):

```sql
CHECK (jsonb_typeof(payload) = 'object')
CHECK (jsonb_typeof(payload -> 'slides') = 'array')
```

Viết cả bộ luật vào SQL là cách chắc chắn để hai nơi lệch nhau. DB chỉ canh hình dạng thô;
luật chi tiết do `contentSchema.js` giữ.

---

## 5. Script migrate (`scripts/migrate-content.mjs`)

**Mặc định là chạy thử, không ghi.** Phải thêm cờ mới ghi thật:

```powershell
node scripts/migrate-content.mjs              # chạy thử, chỉ in báo cáo
node scripts/migrate-content.mjs --apply      # ghi thật vào DB
```

**Bắt buộc có:**

- **Chạy lại được nhiều lần** (upsert theo id) — chạy 2 lần không sinh dòng trùng.
- **Báo cáo đối chiếu**: số lớp / chương / bài / slide **đọc từ file** so với **đọc lại từ
  DB sau khi ghi**. Lệch một dòng là phải báo đỏ, không im lặng.
- **Kiểm từng slide trước khi ghi.** Slide nào hỏng thì in ra kèm mã bài, **và không ghi gì
  cả** — hoặc ghi rồi báo, nhưng phải nói rõ đã làm gì. (Đề xuất: **dừng hẳn**, không ghi
  nửa vời. Trạng thái nửa vời khó gỡ hơn nhiều so với chạy lại từ đầu.)
- **Đếm lại số bài mỗi chương**, không dùng `totalLessons` từ file.
- Ghi `content_version = 1` và **giữ `content_source = 'static'`**.

**Cần bạn cấp:** `SUPABASE_URL` + một key có quyền ghi. Script cần **service role key** hoặc
chạy bằng session admin — vì `anon` cố tình không ghi được. 🔴 **Không nhúng key vào file.**
Đọc từ biến môi trường, và tôi sẽ không in key ra màn hình.

---

## 6. Test case cho lát 3a (thêm vào `admin_portal_test_cases.md`)

| ID       | Nội dung                                                                                                                   | Bắt buộc |
| -------- | -------------------------------------------------------------------------------------------------------------------------- | -------- |
| TC-3a.1  | Migration 0008 chạy sạch; 4 bảng tồn tại đúng cột                                                                          | 🔴       |
| TC-3a.2  | 🔴 **`anon` KHÔNG đọc được bài `status = 'draft'`** (thử thật bằng anon key)                                               | 🔴       |
| TC-3a.3  | `anon` KHÔNG đọc được `content_lesson_versions` (không có policy nào)                                                      | 🔴       |
| TC-3a.4  | Script chạy thử báo đúng **5 lớp · 41 chương · 362 bài · 1505 slide**                                                      | 🔴       |
| TC-3a.5  | Sau khi ghi thật: DB có đúng số dòng đó, và **số bài mỗi chương là số THẬT** (5 chương ở mục 2.3 không mang số sai vào DB) | 🔴       |
| TC-3a.6  | So **từng slide** giữa file và DB — không chỉ đếm tổng                                                                     | 🔴       |
| TC-3a.7  | Chạy script **lần thứ 2** không sinh dòng trùng (upsert đúng)                                                              |          |
| TC-3a.8  | Bộ kiểm tra **bắt được** lỗi cố tình: `quiz` có đáp án không nằm trong `options`                                           | 🔴       |
| TC-3a.9  | Bộ kiểm tra **bắt được** lỗi cố tình ở `dialogue` (bẫy đã bỏ sót 1 lần)                                                    | 🔴       |
| TC-3a.10 | `content_source` vẫn là `"static"` sau khi migrate — **app không đổi hành vi**                                             | 🔴       |

> ⚠️ **TC-3a.8 và TC-3a.9 phải đo bộ kiểm tra, không chỉ viết ra.** Cách làm: cố tình làm
> hỏng 1 slide trong một bản sao dữ liệu → bộ kiểm tra **phải FAIL và chỉ đúng tên bài**.
> Đây là bài học đã dùng 3 lần trong dự án này (`S-12`, `S-13`, `S-14`) — lần nào cũng có
> ích, và lần nào bộ dò cũng có lỗ hổng cần vá.

**Cổng chặn tự động thêm vào `scripts/test-admin-portal.mjs`:**

- `D-14` — `anon` không đọc được bài `draft` (cùng kiểu với `D-13`).
- `S-15` — mọi slide trong file tĩnh đều qua được `contentSchema.js`. Chạy được **không cần
  mạng**, và canh dữ liệu tĩnh khỏi hỏng lúc sửa tay về sau.

---

## 7. 🔴 Một quyết định rủi ro cần bạn xem: bản nháp để ở đâu

Yêu cầu: admin sửa một bài **đã publish**, nhưng **trẻ vẫn phải thấy bản cũ** cho tới khi
admin bấm Publish. Nên phải giữ **hai bản** cùng lúc: bản đang chạy và bản đang sửa.

Cách dễ nghĩ nhất là thêm một cột `draft_payload` ngay cạnh `payload`. **Nhưng cách đó có
lỗ rò rỉ:** RLS của PostgreSQL chặn theo **dòng**, không chặn theo **cột**. Bài nào
`status = 'published'` thì `anon` đọc được **cả dòng đó** — kể cả `draft_payload`. Tức là
ai có anon key (vốn công khai trong bundle) cũng đọc được bản nháp chưa publish.

Cách tránh, theo thứ tự tôi khuyên:

| #   | Cách                                                                            | Ưu                                                                                                | Nhược                                                                                        |
| --- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 1   | **Bảng riêng `content_lesson_drafts`, KHÔNG có policy cho `anon`**              | Rò rỉ là **không thể xảy ra**, không phải "khó xảy ra". Dùng lại đúng cách đã kiểm chứng ở `0006` | Thêm 1 bảng, đọc phải ghép 2 bảng                                                            |
| 2   | Cột `draft_payload` + cấp quyền theo **từng cột** (`GRANT SELECT (…, payload)`) | Một bảng                                                                                          | Phải cấp quyền từng cột; PostgREST dễ vướng khi client gọi `select=*`; **sai một lần là lộ** |
| 3   | Mọi lần sửa đều tạo dòng mới trong bảng phiên bản, bài trỏ tới bản publish      | Không nhân đôi dữ liệu                                                                            | Nhiều phép ghép hơn, và RLS phức tạp hơn — nhiều chỗ để sai                                  |

**Đề xuất: cách 1**, và **làm ở lát 3c** (lúc có giao diện sửa), không phải 3a. Lý do hoãn:
3a chưa có đường ghi nào ngoài script migrate, nên chưa cần chỗ chứa bản nháp. Thêm bây giờ
là thêm thứ chưa ai dùng.

---

## 8. Bốn điều KHÔNG làm trong 3a

- ❌ **Không** đụng tới truyện (`storyData.js`) — xem mục 2.4.
- ❌ **Không** làm `content_lesson_drafts` — để lát 3c (mục 7).
- ❌ **Không** đổi `content_source` sang `"remote"`. App vẫn đọc file cứng như hiện nay.
  Bật remote là việc của lát 3d, sau khi đã kiểm dữ liệu trong DB.
- ❌ **Không** sinh file tĩnh tự động lúc build. Đã bàn ở mục 3e của kế hoạch tổng và kết
  luận là **hoãn cho tới khi thành vấn đề thật**.

---

## 9. Rủi ro và cách giảm

| Rủi ro                                                      | Cách giảm                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| Ghi nửa vời: DB có một phần nội dung, không rõ đủ hay thiếu | Script **dừng hẳn** khi gặp slide hỏng; báo cáo đối chiếu đọc lại từ DB |
| Bài Draft lộ ra ngoài                                       | Test `TC-3a.2` + `D-14` thử bằng anon key thật                          |
| Bộ kiểm tra có lỗ hổng (đã từng bỏ sót `dialogue`)          | `TC-3a.8`/`TC-3a.9` cố tình làm hỏng để đo bộ dò                        |
| Chép `totalLessons` sai vào DB                              | Đếm lại từ mảng `lessons`; `TC-3a.5` kiểm riêng 5 chương đã biết là sai |
| Script cần key mạnh                                         | Đọc từ biến môi trường, không nhúng vào file, không in ra màn hình      |
| Dung lượng Supabase                                         | Khoảng 770 KB cho 362 bài — không đáng kể so với hạn mức 500 MB         |

---

## 10. Cần bạn xác nhận trước khi code

| #   | Nội dung                                                                            | Ghi chú                                 |
| --- | ----------------------------------------------------------------------------------- | --------------------------------------- |
| 1   | **Cắt 3a = schema + migrate + bộ kiểm tra, KHÔNG giao diện.** Bật remote để lát 3d  | Đây là cách để 3a không đổi hành vi app |
| 2   | **Không dùng `zod`** — viết tay ở `admin/src/lib/contentSchema.js`                  | Tránh thêm dependency                   |
| 3   | **Truyện nằm ngoài 3a**                                                             | `storyData.js` là hệ riêng              |
| 4   | **`concept` là MỘT kiểu** (3 khoá bắt buộc + 8 khối tuỳ chọn), không dựng 17 schema | Suy từ 296 slide thật                   |
| 5   | **`dialogue` được kiểm như một loại CÂU HỎI**                                       | Kế hoạch tổng ghi sai chỗ này           |
| 6   | **Bảng bản nháp để lát 3c**, dùng bảng riêng không có policy `anon`                 | Tránh rò rỉ cột (mục 7)                 |
| 7   | **Sửa comment sai trong `curriculum.js`**: "50 Chapters total" → 41                 | Chỉ là comment, không ảnh hưởng chạy    |
| 8   | **Script cần key ghi DB** — bạn cấp qua biến môi trường                             | Xem mục 5                               |
