/**
 * LỐI VÀO NGẮN CHO SCRIPT TRONG `scripts/` — để KHÔNG BAO GIỜ còn lỗi "Cannot find module".
 *
 * VÌ SAO CÓ FILE NÀY (lỗi đã xảy ra thật, người dùng gặp 2 lần):
 *   File thật nằm ở `scripts/migrate-content.mjs`, nhưng gõ `node migrate-content.mjs --verify`
 *   từ gốc repo thì Node KHÔNG tìm thấy file ⇒ `Error: Cannot find module …` + mã thoát 1.
 *   Người dùng đọc mã thoát 1 đó thành "nội dung sai" trong khi **nội dung vẫn đúng** —
 *   tệ hơn là họ đã dán xong seed từ 00 → 100 rồi mới gặp lỗi này.
 *
 * CÁCH DÙNG (chọn một, cả hai đều chạy đúng script thật, tham số truyền nguyên vẹn):
 *   npm run content:verify      ← ngắn nhất, khuyến nghị
 *   node migrate-content.mjs --verify
 *   node scripts/migrate-content.mjs --verify   ← bản gốc, vẫn đúng
 *
 * ⚠️ File này KHÔNG chép logic — nó chỉ chuyển tiếp, nên không thể lệch khỏi script thật.
 */
import "./scripts/migrate-content.mjs";
