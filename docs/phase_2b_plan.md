# 📊 GIAI ĐOẠN 2b — Tầng dữ liệu phân tích

> **Trạng thái:** 🟡 **2b-1 ✅ đã test PASS (2026-09-20) · 2b-2 🟡 kế hoạch chi tiết ở mục 5, chờ duyệt**
> **Ngày:** 2026-09-20 · **Phụ thuộc:** GĐ 2a ✅ (test PASS) · GĐ 2c ✅ (test PASS)
> Dùng kèm `docs/admin_portal_plan.md` (mục _Giai đoạn 2 → 2b_).

---

## 1. Tầng này tồn tại để trả lời CÁI GÌ

Hôm nay đã trả lời được **một phần**: `child_progress` lưu điểm **theo từng buổi** luyện tập
và **theo từng bài** học. Nhưng điểm trên biểu đồ radar của phụ huynh là **% sao đạt được**,
**không phải** độ chính xác của từng câu trả lời.

Ba câu hỏi **chỉ `question_attempts` mới trả lời được**:

| #     | Câu hỏi                                   | Cần gì                                | Biết rồi thì làm gì                               |
| ----- | ----------------------------------------- | ------------------------------------- | ------------------------------------------------- |
| **A** | **Câu hỏi nào hỏng?**                     | danh tính câu · đúng/sai              | Sửa đáp án, đổi đáp án nhiễu, xoá câu lỗi         |
| **B** | **Bé sai vì đoán bừa hay vì không hiểu?** | `ms` · đúng/sai                       | Đoán bừa → nhắc đọc kỹ; không hiểu → gợi ý ôn lại |
| **C** | **Kỹ năng nào bé yếu thật sự?**           | kỹ năng · đúng/sai **ở mức từng câu** | Gợi ý phụ huynh cho bé luyện đúng chỗ             |

> ❌ **Cố ý để ngoài phạm vi:** "bé bỏ cuộc ở bước nào" và "tỉ lệ quay lại sau 7 ngày" —
> cần `app_events`, và chưa đủ người dùng để số liệu có nghĩa. Xem bảng D/E trong plan chính.

---

## 2. Hai quyết định đã chốt (2026-09-20)

| #   | Quyết định                      | Lý do                                                                                                                                                                                                                                                                                                |
| --- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Khách KHÔNG ghi attempt**     | Đây là bảng **ghi rất nhiều** (khác `support_tickets` — bảng đó hiếm khi ghi). Không mở quyền ghi ẩn danh = không có đường spam, không có rủi ro đầy quota 500 MB. Mất dữ liệu của khách, nhưng khách không có `child_id` nên **cũng chẳng dùng được cho câu hỏi B và C** — chỉ được câu A một phần. |
| 2   | **Làm luôn hàm xoá dữ liệu cũ** | ~1,8 MB/năm cho 1 bé; 100 bé ≈ 180 MB/năm. Hàm SQL nhỏ, chạy tay khi cần.                                                                                                                                                                                                                            |

---

## 3. Chia làm 2 lát

| Lát      | Nội dung                                                                              | Vì sao tách                                                      |
| -------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **2b-1** | **Thu thập dữ liệu** — bảng + sinh `ref` + gắn vào bài học/luyện tập/ôn tập/thử thách | Tự nó đã trả lời được A/B/C **bằng SQL**. ✅ **Đã test PASS (2026-09-20).** |
| **2b-2** | **Nhìn thấy dữ liệu** — `ref` cho mini game + màn hình Admin `/analytics`             | Làm sau khi 2b-1 đã có dữ liệu thật để kiểm chứng                |

> 💡 Có thể **dừng sau 2b-1** nếu bạn muốn xem dữ liệu trước rồi mới quyết định màn hình.

---

## 4. Lát 2b-1 — Thu thập dữ liệu

### 4.1. Migration `0006_question_attempts.sql`

```
question_attempts
  id            BIGSERIAL       khoá chính
  child_id      UUID NOT NULL   → child_profiles(id), xoá bé thì xoá theo
  question_ref  TEXT NOT NULL   danh tính câu hỏi (xem 4.2)
  source        TEXT NOT NULL   lesson | practice | review | challenge | game
  lesson_id     TEXT            chỉ có khi source = 'lesson'
  topic         TEXT            kỹ năng, chỉ có với câu sinh tự động
  grade         SMALLINT        1..5
  ms            INT             mili giây, NULL nếu vượt trần
  is_correct    BOOLEAN NOT NULL
  created_at    TIMESTAMPTZ     mặc định NOW()
```

**Chỉ 2 index** — bảng này ghi liên tục nên mỗi index thêm đều làm chậm ghi:

| Index                         | Phục vụ                          |
| ----------------------------- | -------------------------------- |
| `(child_id, created_at DESC)` | câu hỏi B, C — tra theo từng bé  |
| `(question_ref, is_correct)`  | câu hỏi A — gộp theo câu/kỹ năng |

Cố ý **không** đặt index trên `created_at` riêng: hàm xoá dữ liệu cũ chạy rất thưa, quét
toàn bảng chấp nhận được.

**RLS — 3 policy:**

| Policy              | Vai trò         | Quyền                             |
| ------------------- | --------------- | --------------------------------- |
| `..._parent_insert` | `authenticated` | INSERT, chỉ cho bé của chính mình |
| `..._parent_select` | `authenticated` | SELECT, chỉ bé của chính mình     |
| `..._admin_read`    | `authenticated` | SELECT tất cả nếu `is_admin()`    |

**Không có `UPDATE` và không có `DELETE` cho bất kỳ ai** — cùng nguyên tắc với `admin_audit_log`.
Không có policy nào cho `anon` (đúng quyết định 1).

> ⚠️ Hệ quả cần nhớ: bảng này **không có `service_role`** ở đâu cả, nên việc xoá dữ liệu cũ
> phải đi qua hàm `SECURITY DEFINER` bên dưới.

**Hàm xoá dữ liệu cũ:**

```
purge_old_attempts(keep_days INT DEFAULT 180) → RETURNS BIGINT
  - SECURITY DEFINER, search_path = public
  - Chặn keep_days < 30 để không xoá nhầm
  - REVOKE EXECUTE khỏi PUBLIC, anon, authenticated
```

`REVOKE` là chủ ý: hàm này **không được phơi ra API**. Chỉ chạy được từ SQL Editor.
Gọi bằng:

```sql
SELECT public.purge_old_attempts();       -- xoá dữ liệu cũ hơn 180 ngày
SELECT public.purge_old_attempts(365);    -- giữ 1 năm
```

### 4.2. `question_ref` — danh tính câu hỏi

Có **hai loại câu hỏi**, đánh ID theo hai cách (đã phân tích trong plan chính):

| Loại                   | Nguồn                                 | `question_ref`                   |
| ---------------------- | ------------------------------------- | -------------------------------- |
| Sinh tự động           | `generateQuestion()`                  | `tmpl:g1_count` (theo **khuôn**) |
| Viết tay trong bài học | `gradeXData.js`, slide `type: "quiz"` | `lesson:g1-c1-l1:4`              |

Vì sao theo **khuôn** chứ không theo từng câu: câu sinh tự động **không thể "hỏng" riêng lẻ** —
cái hỏng là **khuôn sinh câu** (đáp án nhiễu trùng, sinh số âm, quên trộn đáp án). Gộp theo khuôn
vừa đúng bản chất vừa trả lời thẳng câu hỏi C.

**Việc phải sửa trong `client/src/utils/exerciseGenerator.js`** — bọc hàm, **không sửa từng
`return`** (file này rất dài, sửa từng nhánh là cách chắc chắn để sót):

```js
// đổi hàm cũ thành hàm nội bộ, LUÔN nhận khuôn cụ thể
function buildQuestion(grade, topic) {
  /* thân hàm cũ, bỏ đoạn tự chọn khuôn */
}

export function generateQuestion(grade = 1, topicId = null) {
  const list = TOPICS[`GRADE_${grade}`] || TOPICS.GRADE_1;
  const topic = topicId || list[randInt(0, list.length - 1)].id;
  return { ...buildQuestion(grade, topic), ref: `tmpl:${topic}`, topic };
}
```

Nhờ vậy **mọi** chỗ gọi đều có `ref` mà không phải sửa chỗ gọi. Trả thêm `topic` để nơi gọi
không cần tự biết khuôn. **Hành vi sinh câu không đổi** → rủi ro thấp.

### 4.3. Service ghi dữ liệu — `client/src/services/attemptService.js` (MỚI)

Đặt ở `services/` chứ **không** nhét vào `useProgressStore`: store dùng cho state cục bộ, còn
đây là ghi cloud thuần, không đụng state nào.

```
recordAttempt({ ref, source, topic, lessonId, grade, isCorrect, startedAt })
  1. childId = useAuthStore.getState().activeChild?.id
     → không có (khách) thì THOÁT NGAY, không ghi gì
  2. ms = Date.now() - startedAt;  nếu > 300_000 → null   (bé bỏ máy đi chơi)
  3. insert vào question_attempts   ← "bắn rồi quên"
  4. lỗi chỉ console.warn, KHÔNG làm hỏng bài học   (cùng nguyên tắc sổ cái Xu/XP)
```

> 🔴 **Bắt buộc: `.insert()` KHÔNG kèm `.select()`.** Đây đúng cái bẫy đã tốn thời gian ở
> GĐ 2c — xem ghi chú ở mục 4 của `0005_support_tickets.sql`.

### 4.4. Gắn vào các trang

Cần đo thời gian: mỗi trang giữ một `useRef` mốc thời điểm câu hỏi hiện ra, cập nhật khi
câu hỏi đổi.

| Trang               | Chỗ gắn               | `source`    | Ghi chú                                                      |
| ------------------- | --------------------- | ----------- | ------------------------------------------------------------ |
| `LessonPage.jsx`    | `handleQuizAnswer`    | `lesson`    | `ref = lesson:<lessonId>:<currentSlide>`                     |
| `PracticePage.jsx`  | `handleAnswer`        | `practice`  | đã có sẵn `topic`                                            |
| `PracticePage.jsx`  | `handleMistakeAnswer` | `review`    | ôn lại câu từng sai                                          |
| `ChallengePage.jsx` | chỗ chấm điểm task    | `challenge` | 5 chỗ sinh câu nhưng **1 chỗ chấm**                          |
| `GamesPage.jsx`     | —                     | —           | ⏸️ **để 2b-2** — cần `ref` cho 4 nhánh `generateCalculation` |

### 4.5. Bỏ `attempt_no` so với plan cũ

Plan trước liệt kê cột `attempt_no`. **Đề xuất bỏ**, vì:

- Giao diện hiện cho trả lời **đúng 1 lần** mỗi câu (`LessonPage: if (answerFeedback) return`,
  `PracticePage: if (isAnswered) return`) → cột này sẽ luôn bằng `1`, tức là vô dụng.
- Câu hỏi B cần "số lần phải thử lại" — nhưng cái đó nằm ở **số lần cùng `question_ref` xuất hiện
  theo thời gian**, không phải số lần trong một phiên. Tính bằng hàm cửa sổ trong câu truy vấn
  là đủ, **không cần cột**.

### 4.6. ✅ DoD của 2b-1

Viết được 3 câu SQL dưới đây và chúng **trả về số liệu thật, có nghĩa**:

```sql
-- A: câu hỏi / khuôn nào sai nhiều bất thường (cần >= 20 lượt mới đáng tin)
SELECT question_ref, COUNT(*) AS luot,
       ROUND(100.0 * COUNT(*) FILTER (WHERE NOT is_correct) / COUNT(*), 1) AS ti_le_sai
FROM public.question_attempts
GROUP BY question_ref HAVING COUNT(*) >= 20
ORDER BY ti_le_sai DESC LIMIT 20;

-- B: đoán bừa (nhanh + sai) hay không hiểu (chậm + sai)
SELECT question_ref,
       COUNT(*) FILTER (WHERE NOT is_correct AND ms < 3000)  AS nghi_doan_bua,
       COUNT(*) FILTER (WHERE NOT is_correct AND ms > 15000) AS nghi_khong_hieu
FROM public.question_attempts
WHERE ms IS NOT NULL GROUP BY question_ref ORDER BY 2 DESC LIMIT 20;

-- C: kỹ năng nào bé yếu thật sự
SELECT topic, COUNT(*) AS luot,
       ROUND(100.0 * COUNT(*) FILTER (WHERE is_correct) / COUNT(*), 1) AS ti_le_dung
FROM public.question_attempts
WHERE child_id = '<child-uuid>' AND topic IS NOT NULL
GROUP BY topic ORDER BY ti_le_dung ASC;
```

---

### 4.7. Điểm mở — câu trong bài học chưa có `topic`

Với `source = 'lesson'`, `topic` để **NULL**. Lý do: câu trong bài học **không thuộc khuôn nào**.
Danh tính của nó là `lesson_id` + `slide_index`.

**Hệ quả thật:** câu hỏi C ("kỹ năng nào yếu") hiện chỉ tính trên câu **sinh tự động**
(`practice`, `challenge`). Câu trong bài học — vốn là phần lớn nội dung — **chưa góp vào**.

**Muốn gộp thì cách rẻ nhất là 1 dòng:** ở `LessonPage`, đặt
`topic: found?.chapter?.id ?? null` (VD `g1-c1`). Nhưng khi đó cột `topic` **trộn hai thang đo**:
chương của bài học (thô — `g1-c1`) và kỹ năng luyện tập (mịn — `g1_count`). Hai thang khác nhau
nằm chung một cột dễ dẫn tới kết luận sai khi gộp nhóm.

**Đề xuất:** để nguyên, và ở lát 2b-2 hiển thị **hai khối riêng** — "yếu theo chương bài học"
(`lesson_id`) và "yếu theo kỹ năng luyện tập" (`topic`). Chỉ gộp khi đã có lý do rõ ràng.

---

## 5. Lát 2b-2 — Nhìn thấy dữ liệu

### 5.1. `ref` cho câu sinh trong mini game

`generateCalculation(grade)` có **16 chỗ `return`** trải trên 5 nhánh lớp. Sửa từng chỗ là
cách chắc chắn để sót — **không làm vậy**.

Mọi nhánh đều trả về trường `equation` (VD `"12 + 7"`, `"8 × 5"`). Nên **suy ra phép tính từ
chính kết quả**, không cần đụng vào 16 chỗ `return`:

```js
function buildCalculation(grade) { /* thân hàm cũ, nguyên vẹn */ }

const CALC_OP = { "+": "add", "-": "sub", "×": "mul", ":": "div" };

export function generateCalculation(grade = 1) {
  const g = Number(grade);
  const q = buildCalculation(g);
  const op = Object.keys(CALC_OP).find((s) => q.equation.includes(s)) ?? "other";
  const topic = `calc_g${g}_${CALC_OP[op] ?? "other"}`;
  return { ...q, ref: `tmpl:${topic}`, topic };
}
```

Nhánh lạ (không khớp ký hiệu nào) rơi về `other` — **không sập**, chỉ thô hơn.

| Lớp   | `ref` sinh ra                                                         |
| ----- | --------------------------------------------------------------------- |
| 1     | `calc_g1_add`, `calc_g1_sub`                                          |
| 2,3,4 | `calc_g2_add`, `calc_g2_sub`, `calc_g2_mul`, `calc_g2_div` (mỗi lớp 4) |
| 5     | `calc_g5_add`, `calc_g5_sub`                                          |

> 🔴 **Phải kiểm chứng trước khi tin:** chạy kiểm tra rằng **mọi** kết quả của
> `generateCalculation(1..5)` đều có `ref` bắt đầu bằng `tmpl:calc_g` và `topic` khớp `ref`,
> và **không** rơi vào `other`. Cùng bài học với `oxlint no-undef`: chưa đo thì chưa tin.

### 5.2. Gắn `recordAttempt` vào 6 mini game

| Game                              | Hàm sinh câu            | `ref`                    | Việc phải làm                       |
| --------------------------------- | ----------------------- | ------------------------ | ----------------------------------- |
| Đua Xe Toán Học (`MathRaceGame`)  | `generateQuestion`      | ✅ có từ 2b-1            | gắn `recordAttempt`                 |
| Bắn Bóng Số Bay (`NumberPopGame`) | `generateCalculation`   | ➕ sau mục 5.1           | gắn `recordAttempt`                 |
| Lật Thẻ Ghi Nhớ (`MemoryMatchGame`)| `generateCalculation`  | ➕                       | gắn `recordAttempt`                 |
| Cân Bằng Thần Kỳ (`MathBalanceGame`)| **không sinh câu hỏi** | —                        | **không làm gì**                    |
| Phòng Thủ Vũ Trụ (`SpaceDefenseGame`)| `generateCalculation`| ➕                       | gắn `recordAttempt`                 |
| Câu Cá Thông Thái (`MathFishingGame`)| `generateCalculation`| ➕                       | gắn `recordAttempt`                 |

`source = "game"`. Mỗi game cần một mốc thời gian riêng (`useRef`) đặt lại khi câu hỏi đổi —
cùng cách đã dùng ở `PracticePage` và `ChallengePage`.

> ⚠️ **Gọi `recordAttempt` ngay khi bé trả lời**, không gom tới cuối ván. Một ván có nhiều
> câu; gom tới cuối thì mất hết dữ liệu từng câu — mà đó mới là thứ có giá trị.

### 5.3. Màn hình Admin `/analytics`

Route `/analytics`, link menu cạnh 📮 _Báo lỗi câu hỏi_. **Chỉ đọc** — không có thao tác ghi
nên **không cần** `logAudit`.

Ba khối, dùng đúng 3 câu SQL đã kiểm chứng ở `TC-2.23`:

| Khối                     | Trả lời câu                  | Nội dung hiển thị                                                     |
| ------------------------ | ---------------------------- | --------------------------------------------------------------------- |
| **A — Câu hỏi hỏng**     | khuôn/câu nào sai bất thường | `ref · lượt · tỉ lệ sai`, sai nhiều nhất lên đầu, **chỉ khi ≥ 20 lượt** |
| **B — Đoán bừa / không hiểu** | bé sai vì vội hay vì chưa hiểu | `ref · đoán bừa (nhanh+sai) · không hiểu (chậm+sai)`              |
| **C — Kỹ năng yếu**      | kỹ năng nào yếu thật sự      | `bé · kỹ năng · lượt · tỉ lệ đúng`, yếu nhất lên đầu                  |

**Bộ lọc:** khoảng ngày (mặc định **30 ngày**) và lớp (Tất cả / 1–5).

> 💡 **Khối C hiển thị MỌI bé cùng lúc**, không cần bộ chọn bé — SQL đã gộp theo
> `bé · kỹ năng`. Với vài ba bé thì đọc trực tiếp được. Đông bé rồi mới thêm lọc.

> ⚠️ **Không để bảng rỗng mà không giải thích.** Chưa đủ dữ liệu thì ghi rõ
> "cần thêm N lượt nữa mới đáng tin" — cùng bài học với Sổ Tay Ôn Bài Sai: màn hình trống
> dễ bị hiểu nhầm là hỏng.

Dùng lại `Card` / `Stat` / `Empty` của `ChildProfilePage` và cách tô màu theo tỉ lệ của
`UsersPage` (xấu = đỏ, trung bình = vàng, tốt = xanh) để ba màn hình trông cùng một hệ.

### 5.4. Test case mới (thêm vào `admin_portal_test_cases.md`, PHẦN H)

| ID      | Nội dung                                                              | Bắt buộc |
| ------- | --------------------------------------------------------------------- | -------- |
| TC-2.24 | `generateCalculation` luôn trả `ref = tmpl:calc_g<lớp>_<phép>`         | 🔴       |
| TC-2.25 | Chơi 1 ván mini game có câu hỏi → mỗi câu một dòng `source = 'game'`   | 🔴       |
| TC-2.26 | `MathBalanceGame` không sinh câu → không có dòng nào (đúng thiết kế)   |          |
| TC-2.27 | `/analytics` tải được, cả 3 khối A/B/C đều ra số liệu                  | 🔴       |
| TC-2.28 | Đổi bộ lọc lớp và khoảng ngày → số liệu đổi theo                       |          |
| TC-2.29 | Chưa đủ 20 lượt → hiện thông báo rõ ràng, không phải bảng trống câm    | 🔴       |

### 5.5. Cần bạn xác nhận trước khi code

| #   | Nội dung                                                                     |
| --- | ---------------------------------------------------------------------------- |
| 1   | Suy `ref` của mini game từ trường `equation` thay vì sửa 16 chỗ `return`      |
| 2   | `Cân Bằng Thần Kỳ` không có câu hỏi → **không** gắn gì                        |
| 3   | Khối C hiển thị mọi bé cùng lúc, chưa làm bộ chọn bé                          |
| 4   | Ngưỡng tin cậy của khối A là **≥ 20 lượt**                                    |
| 5   | `/analytics` chỉ đọc, **không** ghi audit log                                 |

> ⚠️ **Không gộp 2b-2 vào 2b-1.** Màn hình chỉ đáng làm khi đã có dữ liệu thật để nhìn —
> làm trước thì vừa code mò vừa không kiểm chứng được.

---

## 6. Test case dự kiến (sẽ thêm vào `admin_portal_test_cases.md`, PHẦN H)

| ID      | Nội dung                                                                          | Bắt buộc |
| ------- | --------------------------------------------------------------------------------- | -------- |
| TC-2.14 | Migration 0006 chạy sạch; 3 policy, **không** policy cho `anon`                   | 🔴       |
| TC-2.15 | Trả lời 1 câu trong bài học → có dòng trong `question_attempts`                   | 🔴       |
| TC-2.16 | `question_ref` của câu sinh tự động = `tmpl:<khuôn>`, **không** đổi theo lần chạy | 🔴       |
| TC-2.17 | Luyện tập + ôn câu sai ghi đúng `source` (`practice` / `review`)                  |          |
| TC-2.18 | Khách trả lời → **không** ghi dòng nào                                            | 🔴       |
| TC-2.19 | `ms` vượt 300 giây → ghi `NULL`, không ghi số rác                                 | 🔴       |
| TC-2.20 | `anon` không đọc / không sửa / không xoá được bảng này                            | 🔴       |
| TC-2.21 | `purge_old_attempts()` xoá đúng, và **không gọi được qua API**                    | 🔴       |
| TC-2.22 | `purge_old_attempts(10)` bị từ chối (chặn xoá nhầm)                               |          |
| TC-2.23 | 3 câu SQL ở mục 4.6 chạy được và ra số liệu hợp lý                                | 🔴       |

---

## 7. Rủi ro và cách giảm

| Rủi ro                                       | Cách xử lý                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Sửa `generateQuestion` làm sai việc sinh câu | Bọc hàm, **không** đụng vào thân hàm → hành vi sinh câu không đổi. Test lại `TC-R.5` và `TC-2.4` sau khi sửa |
| Ghi attempt làm chậm / hỏng bài học          | "Bắn rồi quên", lỗi chỉ `console.warn`, không `await` chặn luồng UI                                          |
| Sót chỗ gắn → dữ liệu thiếu, kết luận sai    | `S-9`-kiểu: thêm kiểm tra tĩnh quét xem mọi chỗ gọi `recordMistake` có `recordAttempt` đi kèm                |
| Bảng phình to                                | Hàm xoá dữ liệu cũ đã có sẵn từ ngày đầu                                                                     |

---

## 8. Việc KHÔNG làm trong 2b

- ❌ Không làm `app_events` (bảng D/E — chưa có câu hỏi nào cần)
- ❌ Không đánh `id` cho từng câu sinh tự động (vô nghĩa — xem 4.2)
- ❌ Không sửa 5 file `gradeXData.js` (đã chốt: không cần)
- ❌ Không cho khách ghi (quyết định 1)
- ❌ Không làm biểu đồ/UI cho phụ huynh (thuộc phạm vi khác)

---

## 9. Tóm tắt để duyệt

| #   | Cần bạn xác nhận                                                          |
| --- | ------------------------------------------------------------------------- |
| 1   | Chia 2 lát `2b-1` (thu thập) → `2b-2` (mini game + màn hình `/analytics`) |
| 2   | Bỏ cột `attempt_no` (mục 4.5)                                             |
| 3   | Chỉ 2 index, chấp nhận `purge` quét toàn bảng (mục 4.1)                   |
| 4   | `question_ref` hai dạng: `tmpl:<khuôn>` và `lesson:<bài>:<slide>`         |
| 5   | Mini game + màn hình Analytics để 2b-2, **không** gộp vào đợt này         |
