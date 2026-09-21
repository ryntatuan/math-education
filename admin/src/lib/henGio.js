/**
 * Hẹn giờ cho truy vấn Supabase.
 *
 * ── Vì sao cần ────────────────────────────────────────────────────────────
 *
 * Khi request rơi vào "hố đen" — kết nối mở được nhưng server **không bao giờ
 * trả lời**, đúng kiểu mất sóng 4G — promise của supabase-js **không bao giờ
 * settle**. Màn hình treo ở "Đang tải…" mãi mãi: không lỗi, không số, không
 * cách nào biết là hỏng.
 *
 * Đã ĐO, không suy đoán:
 *
 *   | Tình huống                        | Kết quả                          |
 *   | --------------------------------- | -------------------------------- |
 *   | Hố đen, chưa có gì che            | vẫn "Đang tải…" sau **40,6s**    |
 *   | Hố đen + abort ở tầng `fetch`     | `net::ERR_ABORTED` CÓ bắn ra,    |
 *   |                                   | trang **vẫn treo sau 40,6s**     |
 *   | Kết nối bị TỪ CHỐI (abort)        | tự lỗi sau **~10s**              |
 *
 * Hai điều rút ra, cả hai đều trái với phán đoán ban đầu của tôi:
 *
 * 1. **Không thể chữa bằng `AbortController` ở tầng `fetch`.** Abort có chạy
 *    thật (thấy `net::ERR_ABORTED` trong log), nhưng supabase-js **nuốt luôn
 *    `AbortError`** rồi im lặng. Phải ép ở tầng promise, vì `Promise.race`
 *    không phụ thuộc vào việc supabase-js có chịu settle hay không.
 *
 * 2. **"Kết nối bị từ chối" KHÁC "hố đen".** Ca từ chối tự lỗi sau ~10s. Tôi
 *    từng kết luận "treo vĩnh viễn" chỉ vì chờ 3–4 giây rồi thấy còn xoay —
 *    sai. Muốn nói "vĩnh viễn" thì phải chờ đủ lâu để chứng minh, hoặc dùng ca
 *    hố đen mới đúng là ca không bao giờ tự kết thúc.
 *
 * ── Vì sao tách ra file riêng ─────────────────────────────────────────────
 *
 * File này **thuần**: không import gì, không đọc `import.meta.env`. Nhờ vậy
 * cổng `S-19` `import()` thẳng nó trong Node và **thử thật** ba hành vi bên
 * dưới — chứ không phải chỉ grep chuỗi trong source rồi tin.
 *
 * Còn `bocHenGio()` (phần bọc client) nằm ở `supabase.js` vì nó cần client thật.
 */

export const HEN_GIO_MS = 15000;

/**
 * Giữ ĐÚNG hình dạng PostgREST `{ data, count, status, statusText, error }`.
 *
 * Nhờ vậy mọi chỗ gọi hiện có không phải sửa gì: nơi đã có `try/catch` thì
 * `if (error) throw` vẫn chạy y như cũ, nơi chỉ đọc `error.message` cũng vậy.
 */
export const loiHetGio = (ms = HEN_GIO_MS) => ({
  data: null,
  count: null,
  status: 0,
  statusText: "het-gio",
  error: {
    code: "HET_GIO",
    message: `Quá ${Math.round(ms / 1000)}s chưa có phản hồi — kiểm tra kết nối mạng rồi thử lại.`,
  },
});

/**
 * Chạy `query` nhưng **không bao giờ** để nó treo quá `ms`.
 *
 * KHÔNG BAO GIỜ ném lỗi — kể cả khi `query` reject. Ném lỗi sẽ tạo promise bị
 * bỏ rơi ở những chỗ không có `try/catch` (ví dụ phép kiểm tra kết nối ở trang
 * Tổng quan), và lỗi bị bỏ rơi thì im lặng đúng như cái treo mà ta đang chữa.
 */
export const coHen = (query, ms = HEN_GIO_MS) =>
  new Promise((resolve) => {
    let xong = false;
    const ketThuc = (gia) => {
      if (xong) return;
      xong = true;
      clearTimeout(hen);
      resolve(gia);
    };
    const hen = setTimeout(() => ketThuc(loiHetGio(ms)), ms);
    Promise.resolve(query).then(ketThuc, (e) =>
      ketThuc({
        data: null,
        count: null,
        status: 0,
        statusText: "loi",
        error: { code: "LOI", message: e?.message ?? String(e) },
      }),
    );
  });
