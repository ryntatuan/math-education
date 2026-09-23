/**
 * Sinh 20 file template SVG cho thú cưng: 4 con x 5 cảm xúc.
 * Ghi vào `client/public/pets/<thú>-<cảm xúc>.svg` để người dùng vẽ đè lên.
 *
 * Chạy:  node scratch/generate-pet-templates.mjs
 *
 * Mỗi file thú gồm 1 lớp <g id="mascot"> chia nhóm tai / đầu / mắt / mũi / miệng.
 * LƯU Ý: 20 file này là ảnh SỐNG của app (app tự nạp), nên KHÔNG nhét lớp canh lề
 * vào đây — canh lề dùng file riêng `_huong-dan-canh-le.svg`.
 * Hình mẫu vẽ trong hệ toạ độ 120x120 của component `PetAvatar.jsx` rồi phóng
 * to bằng transform cho khớp khung 512x512. Người vẽ có thể xoá cả nhóm `mascot`
 * và vẽ thẳng trong hệ 512x512.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "client", "public", "pets");

const OUTLINE = "#4a342a";
const EYE = "#2f2a26";

const PETS = {
  owl: {
    ten: "Cú Con Trí Tuệ",
    fur: "#c88c5c",
    face: "#f2ddc0",
    nose: "#f5a623",
    ears: "tufts",
  },
  cat: {
    ten: "Mèo Mướp Siêu Nhẩm",
    fur: "#f2a34b",
    face: "#fbe3c4",
    nose: "#e8798b",
    ears: "triangles",
  },
  corgi: {
    ten: "Corgi Thông Thái",
    fur: "#e9a25c",
    face: "#fff4e6",
    nose: "#3b2b22",
    ears: "floppy",
  },
  dragon: {
    ten: "Rồng Nhỏ May Mắn",
    fur: "#7bc96b",
    face: "#ddf0d0",
    nose: "#4e9b41",
    ears: "horns",
  },
};

const MOODS = [
  { id: "great", ten: "Rất hạnh phúc", khi: "khi cả hai chỉ số đều 100%" },
  { id: "good", ten: "Vui", khi: "khi chỉ số thấp hơn từ 80-99%" },
  { id: "normal", ten: "Bình thường", khi: "khi chỉ số thấp hơn từ 50-79%" },
  { id: "low", ten: "Buồn", khi: "khi chỉ số thấp hơn từ 20-49%" },
  { id: "danger", ten: "Rất buồn", khi: "khi chỉ số thấp hơn dưới 20%" },
];

const EARS = {
  tufts: (fur) => `
      <path d="M36 32 q-4 -16 8 -20 q0 12 6 16 Z" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M84 32 q4 -16 -8 -20 q0 12 -6 16 Z" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>`,
  triangles: (fur) => `
      <path d="M30 36 L24 8 L54 22 Z" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M90 36 L96 8 L66 22 Z" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>`,
  floppy: (fur) => `
      <ellipse cx="26" cy="46" rx="9" ry="15" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" transform="rotate(-20 26 46)"/>
      <ellipse cx="94" cy="46" rx="9" ry="15" fill="${fur}" stroke="${OUTLINE}" stroke-width="2.5" transform="rotate(20 94 46)"/>`,
  horns: () => `
      <path d="M36 30 q-8 -14 0 -20 q8 8 8 18 Z" fill="#f0c36b" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M84 30 q8 -14 0 -20 q-8 8 -8 18 Z" fill="#f0c36b" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>`,
};

const EYES = {
  great: `
      <circle cx="45" cy="60" r="8" fill="${EYE}"/>
      <circle cx="75" cy="60" r="8" fill="${EYE}"/>
      <circle cx="42" cy="57" r="3" fill="#ffffff"/>
      <circle cx="72" cy="57" r="3" fill="#ffffff"/>
      <circle cx="48" cy="63" r="1.6" fill="#ffffff"/>
      <circle cx="78" cy="63" r="1.6" fill="#ffffff"/>`,
  good: `
      <path d="M37 62 q8 -9 16 0" stroke="${OUTLINE}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M67 62 q8 -9 16 0" stroke="${OUTLINE}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`,
  normal: `
      <circle cx="45" cy="60" r="6.5" fill="${EYE}"/>
      <circle cx="75" cy="60" r="6.5" fill="${EYE}"/>
      <circle cx="43" cy="58" r="2.2" fill="#ffffff"/>
      <circle cx="73" cy="58" r="2.2" fill="#ffffff"/>`,
  low: `
      <circle cx="45" cy="62" r="6.5" fill="${EYE}"/>
      <circle cx="75" cy="62" r="6.5" fill="${EYE}"/>
      <circle cx="43" cy="60" r="2" fill="#ffffff"/>
      <circle cx="73" cy="60" r="2" fill="#ffffff"/>
      <path d="M35 49 q8 2 13 5" stroke="${OUTLINE}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M85 49 q-8 2 -13 5" stroke="${OUTLINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  danger: `
      <circle cx="45" cy="62" r="6.5" fill="${EYE}"/>
      <circle cx="75" cy="62" r="6.5" fill="${EYE}"/>
      <path d="M34 47 q9 1 14 6" stroke="${OUTLINE}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M86 47 q-9 1 -14 6" stroke="${OUTLINE}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M52 70 q-3.5 6 0 9.5 q3.5 -3.5 0 -9.5 Z" fill="#6fc3f7" stroke="#4aa3d8" stroke-width="1.2"/>`,
};

const MOUTH = {
  great: `
      <path d="M49 87 q11 14 22 0 Z" fill="#5b3a2e" stroke="${OUTLINE}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M56 94 q4 5 8 0 Z" fill="#f0879c"/>`,
  good: `
      <path d="M52 87 q8 8 16 0" stroke="${OUTLINE}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
  normal: `
      <path d="M54 88 q6 5 12 0" stroke="${OUTLINE}" stroke-width="2.8" fill="none" stroke-linecap="round"/>`,
  low: `
      <path d="M52 92 q8 -7 16 0" stroke="${OUTLINE}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  danger: `
      <path d="M51 93 q9 -8 18 0" stroke="${OUTLINE}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M57 90 q3 3 6 0" stroke="#6fc3f7" stroke-width="2" fill="none" stroke-linecap="round"/>`,
};

const SCALE = 512 / 120; // hình mẫu vẽ trong hệ 120x120 của PetAvatar.jsx

function buildSvg(petId, moodId) {
  const pet = PETS[petId];
  const mood = MOODS.find((m) => m.id === moodId);
  const rosy =
    moodId === "great" || moodId === "good"
      ? `
        <circle cx="33" cy="76" r="6" fill="#ff9aa8" opacity="0.5"/>
        <circle cx="87" cy="76" r="6" fill="#ff9aa8" opacity="0.5"/>`
      : "";
  const nose =
    petId === "owl"
      ? `<path d="M60 80 L52 69 L68 69 Z" fill="${pet.nose}" stroke="${OUTLINE}" stroke-width="2" stroke-linejoin="round"/>`
      : `<ellipse cx="60" cy="77" rx="5.5" ry="4" fill="${pet.nose}" stroke="${OUTLINE}" stroke-width="1.8"/>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<!--
  ${pet.ten} — ${mood.ten.toUpperCase()}
  File này hiển thị ${mood.khi}.
  Kích thước khuyến nghị: ảnh VUÔNG 512x512, nền TRONG SUỐT.
  Con thú chỉ hiện trong vòng tròn đường kính ~62px nên hãy vẽ CẬN CẢNH KHUÔN MẶT.
  Cách vẽ: vẽ đè lên hình mẫu, hoặc xoá cả <g id="mascot"> rồi vẽ mới trong hệ 512x512.
  Cần canh lề thì mở kèm file _huong-dan-canh-le.svg (KHÔNG copy lớp đó vào đây,
  vì file này là ảnh sống của app — vòng nét đứt sẽ hiện trong game).
-->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <g id="mascot" transform="scale(${SCALE.toFixed(4)})">
    <g id="tai">${EARS[pet.ears](pet.fur)}
    </g>

    <g id="dau">
      <circle cx="60" cy="62" r="40" fill="${pet.fur}" stroke="${OUTLINE}" stroke-width="3"/>
      <ellipse cx="60" cy="78" rx="24" ry="17" fill="${pet.face}"/>${rosy}
    </g>

    <g id="mat">${EYES[moodId]}
    </g>

    <g id="mui">${nose}
    </g>

    <g id="mieng">${MOUTH[moodId]}
    </g>
  </g>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });
let count = 0;
for (const petId of Object.keys(PETS)) {
  for (const mood of MOODS) {
    const file = join(outDir, `${petId}-${mood.id}.svg`);
    writeFileSync(file, buildSvg(petId, mood.id), "utf8");
    count += 1;
  }
}

// File canh lề riêng: TÊN BẮT ĐẦU BẰNG `_` nên app KHÔNG bao giờ nạp nó.
writeFileSync(
  join(outDir, "_huong-dan-canh-le.svg"),
  `<?xml version="1.0" encoding="UTF-8"?>
<!--
  File CANH LỀ — chỉ để mở kèm lúc vẽ, app KHÔNG dùng file này.
  Vòng nét đứt: giữ chi tiết quan trọng (mắt, mũi, miệng) BÊN TRONG vòng này.
  Đường tâm: giúp canh giữa khuôn mặt. Đừng copy lớp này vào 20 file thú.
-->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#ffffff"/>
  <circle cx="256" cy="256" r="240" fill="none" stroke="#8a94a6" stroke-width="3" stroke-dasharray="14 10"/>
  <circle cx="256" cy="256" r="228" fill="#f8fafc" stroke="#c3ccd8" stroke-width="2"/>
  <path d="M256 16 V496 M16 256 H496" stroke="#dfe4ea" stroke-width="2"/>
  <circle cx="256" cy="256" r="62" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <text x="256" y="500" font-family="sans-serif" font-size="20" text-anchor="middle" fill="#8a94a6">
    Vòng cam nhỏ = kích thước thật khi hiện trong game
  </text>
</svg>
`,
  "utf8",
);

console.log(
  `Đã sinh ${count} file template vào client/public/pets/ (+1 file canh lề)`,
);
