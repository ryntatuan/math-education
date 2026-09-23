import { useState } from "react";

/**
 * Mặt thú cưng vẽ bằng SVG nội tuyến (React) — KHÔNG dùng emoji, KHÔNG cần file ảnh,
 * nên không có rủi ro hỏng ký tự và không phải quản 20 file ảnh.
 *
 * `moodId` lấy từ `CARE_TIERS` trong `usePetStore`:
 *   great (100) · good (80-99) · normal (50-79) · low (20-49) · danger (0-19)
 *
 * Mắt + miệng dùng CHUNG cho cả 4 con, nên bé thấy "cùng một cảm xúc" ở mọi thú;
 * phần riêng của từng con chỉ là màu lông, tai và mặt mũi.
 */

const OUTLINE = "#4a342a";
const EYE = "#2f2a26";

/** Nhớ ảnh KHÔNG tồn tại để khỏi xin lại mỗi lần render (tránh nhấp nháy). */
const missingArt = new Set();

/** Các đường dẫn ảnh sẽ thử, theo thứ tự: `.svg` trước rồi `.png`. */
const artsFor = (petId, moodId) => [
  `/pets/${petId}-${moodId}.svg`,
  `/pets/${petId}-${moodId}.png`,
];

/**
 * Khung vẽ thật của bộ ảnh trong `client/public/pets/` (đo bằng `getBBox()`
 * trong trình duyệt, đơn vị trên khung `0 0 512 512`).
 * Bốn con được vẽ KHÔNG đều nhau: con Cú chỉ chiếm 55% khung còn con Mèo chiếm 88%,
 * và tất cả đều bị đẩy lên trên (tâm cao hơn giữa khung 17-46 đơn vị). Vì vậy phải
 * phóng to + dịch lại, nếu không con Cú sẽ nhỏ hơn con Mèo và mặt bị lệch lên trên.
 * ⚠️ Nếu vẽ lại ảnh (khung vẽ khác đi) thì phải đo lại và cập nhật bốn dòng này.
 */
const ART_BOX = {
  owl: [116, 93, 280, 293],
  cat: [30, 69, 452, 301],
  corgi: [104, 69, 305, 301],
  dragon: [93, 50, 326, 320],
};

/**
 * Đưa chiều CAO của hình về 400/512 = 78% khung, và đặt tâm vào giữa khung.
 *
 * ⚠️ Căn theo chiều cao chứ KHÔNG theo cạnh dài nhất: bốn con được vẽ cùng cỡ ĐẦU
 * (cao 293-320) nhưng con Mèo rộng hơn hẳn (452, do râu + má) còn con Cú chỉ 280.
 * Nếu lấy cạnh dài nhất làm chuẩn thì con Mèo bị thu nhỏ (0.885x) còn con Cú bị
 * phóng to (1.365x) ⇒ trong một khung VUÔNG, Mèo trông nhỏ hơn hẳn các con khác.
 * Đổi sang chiều cao thì bốn con cao bằng nhau; râu Mèo thò ra ngoài khung một chút
 * (bị cắt ở mép, khoảng 7px khi hiện trong app nên gần như không thấy).
 */
const ART_TARGET = 400;

function artFit(petId) {
  const [x, y, w, h] = ART_BOX[petId] || ART_BOX.owl;
  const scale = ART_TARGET / h;
  const centerX = x + w / 2;
  const centerY = y + h / 2;
  // Dịch theo % kích thước phần tử (tâm mặc định của transform là giữa ảnh)
  return {
    scale,
    shiftX: (-scale * (centerX - 256) * 100) / 512,
    shiftY: (-scale * (centerY - 256) * 100) / 512,
  };
}

/** Màu lông / mặt / mũi và kiểu tai của từng con. */
const PETS = {
  owl: { fur: "#c88c5c", face: "#f2ddc0", nose: "#f5a623", ears: "tufts" },
  cat: { fur: "#f2a34b", face: "#fbe3c4", nose: "#e8798b", ears: "triangles" },
  corgi: { fur: "#e9a25c", face: "#fff4e6", nose: "#3b2b22", ears: "floppy" },
  dragon: { fur: "#7bc96b", face: "#ddf0d0", nose: "#4e9b41", ears: "horns" },
};

const EARS = {
  // Cú: 2 chùm lông nhọn trên đỉnh đầu
  tufts: (fur) => (
    <>
      <path
        d="M36 32 q-4 -16 8 -20 q0 12 6 16 Z"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M84 32 q4 -16 -8 -20 q0 12 -6 16 Z"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
  // Mèo: 2 tai tam giác
  triangles: (fur) => (
    <>
      <path
        d="M30 36 L24 8 L54 22 Z"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M90 36 L96 8 L66 22 Z"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
  // Corgi: 2 tai cụp
  floppy: (fur) => (
    <>
      <ellipse
        cx="26"
        cy="46"
        rx="9"
        ry="15"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        transform="rotate(-20 26 46)"
      />
      <ellipse
        cx="94"
        cy="46"
        rx="9"
        ry="15"
        fill={fur}
        stroke={OUTLINE}
        strokeWidth="2.5"
        transform="rotate(20 94 46)"
      />
    </>
  ),
  // Rồng: 2 sừng vàng
  horns: (fur) => (
    <>
      <path
        d="M36 30 q-8 -14 0 -20 q8 8 8 18 Z"
        fill="#f0c36b"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M84 30 q8 -14 0 -20 q-8 8 -8 18 Z"
        fill="#f0c36b"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
};

/** Mắt theo cảm xúc (dùng chung cho mọi con thú). */
const EYES = {
  great: (
    <>
      <circle cx="45" cy="60" r="8" fill={EYE} />
      <circle cx="75" cy="60" r="8" fill={EYE} />
      <circle cx="42" cy="57" r="3" fill="#ffffff" />
      <circle cx="72" cy="57" r="3" fill="#ffffff" />
      <circle cx="48" cy="63" r="1.6" fill="#ffffff" />
      <circle cx="78" cy="63" r="1.6" fill="#ffffff" />
    </>
  ),
  good: (
    <>
      {/* mắt cười cong lên ^ ^ */}
      <path
        d="M37 62 q8 -9 16 0"
        stroke={OUTLINE}
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M67 62 q8 -9 16 0"
        stroke={OUTLINE}
        strokeWidth="3.4"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  normal: (
    <>
      <circle cx="45" cy="60" r="6.5" fill={EYE} />
      <circle cx="75" cy="60" r="6.5" fill={EYE} />
      <circle cx="43" cy="58" r="2.2" fill="#ffffff" />
      <circle cx="73" cy="58" r="2.2" fill="#ffffff" />
    </>
  ),
  low: (
    <>
      <circle cx="45" cy="62" r="6.5" fill={EYE} />
      <circle cx="75" cy="62" r="6.5" fill={EYE} />
      <circle cx="43" cy="60" r="2" fill="#ffffff" />
      <circle cx="73" cy="60" r="2" fill="#ffffff" />
      {/* lông mày xuôi xuống = buồn */}
      <path
        d="M35 49 q8 2 13 5"
        stroke={OUTLINE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M85 49 q-8 2 -13 5"
        stroke={OUTLINE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  danger: (
    <>
      <circle cx="45" cy="62" r="6.5" fill={EYE} />
      <circle cx="75" cy="62" r="6.5" fill={EYE} />
      <path
        d="M34 47 q9 1 14 6"
        stroke={OUTLINE}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M86 47 q-9 1 -14 6"
        stroke={OUTLINE}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* giọt nước mắt */}
      <path
        d="M52 70 q-3.5 6 0 9.5 q3.5 -3.5 0 -9.5 Z"
        fill="#6fc3f7"
        stroke="#4aa3d8"
        strokeWidth="1.2"
      />
    </>
  ),
};

/** Miệng theo cảm xúc (dùng chung cho mọi con thú). */
const MOUTH = {
  great: (
    <>
      <path
        d="M49 87 q11 14 22 0 Z"
        fill="#5b3a2e"
        stroke={OUTLINE}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M56 94 q4 5 8 0 Z" fill="#f0879c" />
    </>
  ),
  good: (
    <path
      d="M52 87 q8 8 16 0"
      stroke={OUTLINE}
      strokeWidth="3.2"
      fill="none"
      strokeLinecap="round"
    />
  ),
  normal: (
    <path
      d="M54 88 q6 5 12 0"
      stroke={OUTLINE}
      strokeWidth="2.8"
      fill="none"
      strokeLinecap="round"
    />
  ),
  low: (
    <path
      d="M52 92 q8 -7 16 0"
      stroke={OUTLINE}
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
    />
  ),
  danger: (
    <>
      <path
        d="M51 93 q9 -8 18 0"
        stroke={OUTLINE}
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M57 90 q3 3 6 0"
        stroke="#6fc3f7"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
};

export default function PetAvatar({
  petId = "owl",
  moodId = "normal",
  className = "",
}) {
  // Chỉ dùng để render lại sau khi biết một ảnh không tồn tại
  const [, forceRender] = useState(0);
  const pet = PETS[petId] || PETS.owl;
  const ears = EARS[pet.ears] || EARS.tufts;
  const eyes = EYES[moodId] || EYES.normal;
  const mouth = MOUTH[moodId] || MOUTH.normal;
  const rosy = moodId === "great" || moodId === "good";
  const label = `Thú cưng đang ${
    moodId === "great"
      ? "rất hạnh phúc"
      : moodId === "good"
        ? "vui"
        : moodId === "normal"
          ? "bình thường"
          : moodId === "low"
            ? "buồn"
            : "rất buồn"
  }`;

  // ── Ưu tiên ảnh do người dùng vẽ, thả vào `client/public/pets/` ──
  // Đặt tên `<thú>-<cảm xúc>.svg` (hoặc .png). Chưa có file thì tự quay về
  // hình vẽ bằng code bên dưới, nên không bao giờ trống/vỡ giao diện.
  const src = artsFor(petId, moodId).find((url) => !missingArt.has(url));

  if (src) {
    const fit = artFit(petId);
    return (
      <img
        src={src}
        alt={label}
        className={`pet-avatar-svg ${className}`}
        style={{
          transform: `translate(${fit.shiftX.toFixed(2)}%, ${fit.shiftY.toFixed(2)}%) scale(${fit.scale.toFixed(3)})`,
        }}
        onError={() => {
          missingArt.add(src);
          forceRender((n) => n + 1);
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      className={`pet-avatar-svg ${className}`}
      role="img"
      aria-label={label}
    >
      {ears(pet.fur)}

      {/* đầu */}
      <circle
        cx="60"
        cy="62"
        r="40"
        fill={pet.fur}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* vùng mặt sáng màu */}
      <ellipse cx="60" cy="78" rx="24" ry="17" fill={pet.face} />

      {rosy && (
        <>
          <circle cx="33" cy="76" r="6" fill="#ff9aa8" opacity="0.5" />
          <circle cx="87" cy="76" r="6" fill="#ff9aa8" opacity="0.5" />
        </>
      )}

      {eyes}

      {/* mũi / mỏ */}
      {petId === "owl" ? (
        <path
          d="M60 80 L52 69 L68 69 Z"
          fill={pet.nose}
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ) : (
        <ellipse
          cx="60"
          cy="77"
          rx="5.5"
          ry="4"
          fill={pet.nose}
          stroke={OUTLINE}
          strokeWidth="1.8"
        />
      )}

      {mouth}
    </svg>
  );
}
