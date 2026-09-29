/**
 * TỈ LỆ CAO/RỘNG của từng loại đồ vật — dữ liệu THUẦN (không JSX) để công cụ Node đọc được
 * và để `ObjectShapes.jsx` chỉ export component (Vite mới Fast Refresh được).
 *
 * Vì sao cần: `measureBoard` vẽ vật ĐÚNG TỈ LỆ với thước, nên chỉ biết `cm` là chưa đủ —
 * phải biết chiều cao (vật nằm ngang) hoặc chiều rộng (vật đứng) của hình vẽ.
 */

/** Vật NẰM NGANG: chiều cao = chiều dài × hệ số này. */
export const WIDE_RATIO = {
  train: 0.46,
  mixerTruck: 0.52,
  roller: 0.52,
  bus: 0.48,
  car: 0.44,
  crane: 0.62,
  pencil: 0.2,
  crayon: 0.24,
  pen: 0.2,
  toothbrush: 0.24,
  screwdriver: 0.26,
  gamepad: 0.5,
  ruler: 0.32,
  eraser: 0.42,
  paperclip: 0.5,
  pencilCase: 0.44,
  book: 0.72,
  giraffe: 0.5,
  zebra: 0.9,
  rabbit: 0.62,
  fox: 0.9,
  squirrel: 0.8,
  kid: 0.55,
  podium: 1,
};

/** Vật ĐỨNG (đo chiều cao): chiều rộng = chiều cao × hệ số này. */
export const TALL_RATIO = {
  watch: 0.62,
  phone: 0.54,
  kid: 0.5,
  podium: 0.9,
  giraffe: 0.44,
  zebra: 0.95,
  rabbit: 0.62,
  fox: 0.9,
  squirrel: 0.8,
  pencil: 0.24,
  book: 0.72,
};

const MAC_DINH_HW = 0.5;
const MAC_DINH_WH = 0.55;

/** Chiều cao hình vẽ khi vật nằm ngang, biết chiều dài `cm`. */
export function heightForWidth(kind, w) {
  return w * (WIDE_RATIO[kind] ?? MAC_DINH_HW);
}

/** Chiều rộng hình vẽ khi vật đứng, biết chiều cao `cm`. */
export function widthForHeight(kind, h) {
  return h * (TALL_RATIO[kind] ?? MAC_DINH_WH);
}
