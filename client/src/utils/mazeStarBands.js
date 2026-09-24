/**
 * MỐC SAO CỦA TRÒ CHƠI “MÊ CUNG VỀ NHÀ” — logic thuần, không phụ thuộc React.
 *
 * Người dùng chốt 2026-09-25 (đổi từ 15/30 sang 20/40):
 *   ≤ 20 giây    → ⭐⭐⭐  (thưởng bậc Vàng)
 *   21 – 40 giây → ⭐⭐   (bậc Bạc)
 *   hơn 40 giây  → ⭐    (bậc Đồng)
 *
 * Để riêng ở đây vì hai lý do:
 *  1. `MazeRaceGame.jsx` là UI (React + framer-motion) — không bundle được vào script kiểm
 *     chạy bằng Node. Tách ra thì `scratch/kiem-tra-sao-me-cung.mjs` kiểm được ĐÚNG mép
 *     15/16/30/31 giây mà không cần mở app.
 *  2. Mép là chỗ dễ sai nhất của loại bài “xếp mốc”: `<= 15` khác `15 < t <= 30` đúng một giây.
 *
 * 🔴 TÍNH THEO GIÂY NGUYÊN (làm tròn xuống) cho CẢ việc xếp sao LẪN con số hiện trên màn hình.
 * Nếu xếp sao theo mili-giây mà hiện ra giây thì có lúc màn hình ghi “15 giây” mà chỉ 2 sao
 * (vì thực tế 15,4 giây) — bé và phụ huynh nhìn vào sẽ tưởng app chấm sai.
 */

export const STAR_BANDS = { three: 20, two: 40 };

/** Số sao theo số GIÂY về nhà: ≤20 → 3 sao, 21–40 → 2 sao, hơn 40 → 1 sao. */
export function starsForSeconds(seconds) {
  if (seconds <= STAR_BANDS.three) return 3;
  if (seconds <= STAR_BANDS.two) return 2;
  return 1;
}

/** Như trên nhưng nhận mili-giây (đồng hồ trong app đếm bằng ms). */
export function starsForMs(ms) {
  return starsForSeconds(Math.floor(ms / 1000));
}

/** Bậc thưởng theo số sao — ba khoá này có thật trong bảng `reward_configs`. */
export const TIER_BY_STARS = { 3: "gold", 2: "silver", 1: "bronze" };

/**
 * Từng mốc, TÁCH RỜI để giao diện hiện thành từng thẻ nhỏ.
 * Trước đây hiện cả chuỗi dài trong một dòng ⇒ ở khổ hẹp nó xuống dòng giữa cụm “hơn 30 giây”
 * trông rất rối (người dùng góp ý 2026-09-25).
 */
export const BAND_ROWS = [
  { stars: 3, label: `≤ ${STAR_BANDS.three} giây` },
  { stars: 2, label: `${STAR_BANDS.three + 1} – ${STAR_BANDS.two} giây` },
  { stars: 1, label: `hơn ${STAR_BANDS.two} giây` },
];

/** Bản một dòng — dùng cho lời đọc/ghi chú, KHÔNG dùng để vẽ giao diện. */
export const BANDS_TEXT = BAND_ROWS.map(
  (r) => `${r.stars} sao: ${r.label}`,
).join(" · ");

/** Lời chúc mừng theo số sao. */
export const TITLE_BY_STARS = {
  3: "🏆 Bé về nhà siêu nhanh!",
  2: "🎉 Bé về nhà rồi!",
  1: "👏 Bé về nhà rồi!",
};
