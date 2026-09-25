# Nạp lại nội dung bài học vào Supabase — hướng dẫn từng bước

Tài liệu này dành cho bạn, làm một lần sau khi chương trình học lớp 1–3 đã được dựng lại.

## Vì sao phải làm bước này

App đọc nội dung từ **DB Supabase**. Nội dung trong DB vẫn là bản **cũ** (lớp 2 còn dạy bảng
nhân 3, 4; lớp 3 còn dạy phân số…). File tĩnh trong mã nguồn đã là bản **mới**, nhưng file tĩnh
chỉ được dùng khi cấu hình `content_source = 'static'`. Muốn DB có bản mới thì phải nạp lại.

## Tình trạng đo được trước khi nạp

| Chỉ số                    | DB (cũ) | File tĩnh (mới) |
| ------------------------- | ------- | --------------- |
| Số lớp                    | 5       | 5               |
| Số chương                 | 41      | **51**          |
| Số bài                    | 461     | **460**         |
| Số slide                  | 1966    | **2738**        |
| Bài mới cần thêm          | —       | **77**          |
| Bài cần cập nhật nội dung | —       | **263**         |
| Bài cũ cần xoá            | **79**  | —               |

79 bài cũ đó là các bài đã bị bỏ khỏi chương trình (chủ đề sai lớp). Nếu không xoá, chúng
**vẫn hiện trên app** — vì lệnh nạp chỉ thêm và sửa, không tự xoá.

## Các bước

Mở **Supabase** → chọn project → **SQL Editor** → **New query**. Với mỗi file dưới đây: mở file,
copy toàn bộ nội dung, dán vào ô truy vấn, bấm **Run**. Làm **đúng thứ tự**.

| Bước | File cần dán                                               | Việc nó làm                                          |
| ---- | ---------------------------------------------------------- | ---------------------------------------------------- |
| 1    | `supabase/content-seed/00-don-noi-dung-cu.sql`             | Xoá 79 bài + chương không còn trong chương trình mới |
| 2    | `supabase/content-seed/01-lop-va-chuong.sql`               | Ghi 5 lớp và 51 chương                               |
| 3    | `supabase/content-seed/02-bai-lop-1.sql`                   | Ghi 97 bài lớp 1                                     |
| 4    | `supabase/content-seed/03-bai-lop-2.sql`                   | Ghi 120 bài lớp 2                                    |
| 5    | `supabase/content-seed/04-bai-lop-3.sql`                   | Ghi 123 bài lớp 3                                    |
| 6    | `supabase/content-seed/05-bai-lop-4.sql`                   | Ghi 65 bài lớp 4                                     |
| 7    | `supabase/content-seed/06-bai-lop-5.sql`                   | Ghi 54 bài lớp 5                                     |
| 8    | `supabase/content-seed/99-cau-hinh-va-doi-chieu.sql`       | In ra bảng đối chiếu số dòng                         |
| 9    | `supabase/content-seed/100-tang-phien-ban-sau-bo-sung.sql` | Tăng `content_version`                               |

**Bước 1 và bước 9 là hai bước dễ quên nhất:**

- **Bước 1** quan trọng vì nếu bỏ qua, app vẫn hiển thị các bài sai chủ đề cũ.
- **Bước 9** quan trọng vì seed **không** tự tăng `content_version`. Thiếu bước này thì máy các
  bé vẫn dùng bản nội dung đã lưu trong máy và **không bao giờ** thấy nội dung mới.

Đừng gọi hàm `bump_content_version()` trong SQL Editor — hàm đó có chốt quyền admin, mà SQL
Editor không có phiên đăng nhập nên sẽ báo lỗi `42501`. File bước 9 dùng SQL thô nên chạy được.

## Sau khi dán xong — kiểm tra

Trong SQL Editor, chạy câu này:

```sql
SELECT
  (SELECT COUNT(*) FROM public.content_grades)   AS so_lop,
  (SELECT COUNT(*) FROM public.content_chapters) AS so_chuong,
  (SELECT COUNT(*) FROM public.content_lessons)  AS so_bai,
  (SELECT COUNT(*) FROM public.content_lessons WHERE status = 'published') AS so_bai_da_xuat_ban;
```

Mong đợi: `so_lop = 5` · `so_chuong = 51` · `so_bai = 460` · `so_bai_da_xuat_ban = 460`.

Trong VS Code, chạy lệnh này để đối chiếu chữ trong từng bài:

```powershell
node scripts/migrate-content.mjs --verify
```

Mong đợi: mọi dòng đều có dấu ✅ và không còn dòng `Bài có nội dung khác`.

## Bật cho app đọc từ DB

App chọn nguồn nội dung theo khoá `content_source` trong bảng `app_config`:

- `'remote'` — app đọc từ DB. **Đây là chế độ đúng sau khi nạp lại.**
- `'static'` — app đọc từ file tĩnh đóng gói trong app. Dùng tạm khi bạn muốn xem nội dung mới
  mà chưa muốn nạp DB.

Câu lệnh đổi sang đọc DB (chạy trong SQL Editor):

```sql
UPDATE public.app_config
SET value = to_jsonb('remote'::text), updated_at = NOW()
WHERE key = 'content_source';
```

Câu lệnh quay về đọc file tĩnh:

```sql
UPDATE public.app_config
SET value = to_jsonb('static'::text), updated_at = NOW()
WHERE key = 'content_source';
```

Sau khi đổi, mở lại app trên máy bé để nó nạp nội dung mới.

## Tiến độ của các bé có bị mất không?

Không mất. Tiến độ được lưu theo **mã bài** (`lesson_id`) trong hồ sơ của bé, và không có ràng
buộc khoá ngoại nào trỏ tới bảng nội dung. Cụ thể:

- Bài **giữ nguyên mã** và chỉ đổi nội dung: bé giữ nguyên số sao của bài đó.
- Bài **bị xoá**: số sao của bài đó không còn được tính vào tổng, các bài khác không ảnh hưởng.
- Bài **mới thêm**: hiện là bài chưa học, bé học bình thường.

## Nếu gặp lỗi

| Hiện tượng                                               | Nguyên nhân                               | Cách xử lý                                                 |
| -------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| `42501: Chỉ admin…`                                      | Có gọi hàm CMS trong SQL Editor           | Không gọi hàm; dùng đúng file SQL thô                      |
| `relation "public.content_lesson_drafts" does not exist` | Project chưa chạy migration `0009`        | Chạy migration trong `supabase/migrations/` theo thứ tự số |
| Bảng đối chiếu ra số khác                                | Một file ở bước 2–7 chưa dán hoặc dán lỗi | Dán lại file đó rồi chạy lại câu đối chiếu                 |
| App vẫn hiện nội dung cũ                                 | Chưa chạy bước 9                          | Chạy `100-tang-phien-ban-sau-bo-sung.sql`                  |
| App vẫn hiện bài sai chủ đề                              | Chưa chạy bước 1                          | Chạy `00-don-noi-dung-cu.sql`                              |
