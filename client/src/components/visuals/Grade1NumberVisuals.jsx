/**
 * BỘ HÌNH CHO LỚP 1 — CHỦ ĐỀ 1 (Các số từ 0 đến 10).
 *
 * Vì sao tách khỏi `GeometryVisuals.jsx`: chủ đề này KHÔNG phải hình học — nó là ĐẾM,
 * SO SÁNH, TÁCH – GỘP. Trộn vào file hình học sẽ làm file đó phình thêm ~700 dòng mà
 * không liên quan gì tới hình khối.
 *
 * Khoá đăng ký: `numberScene` (xem `visualKeys.js` + `VisualBlock.jsx`).
 * Mọi kiểu đều nhận `mode`; các prop còn lại ghi ngay trên từng khối.
 *
 * ── QUY TẮC BẮT BUỘC (đã trả giá — danh sách ngay dưới đây) ─────────────
 *  • viewBox rộng ≤ 380 (điện thoại 375 px chỉ cho hình ~283 px bề rộng).
 *  • Mọi chữ trong SVG ≥ 14 đơn vị viewBox (≈ 11 px trên màn 375 px).
 *  • KHÔNG `minWidth` (gây cuộn ngang).
 *  • Ép mọi prop số về số bằng `num()`: prop truyền vào là CHUỖI thì `y + h` ra "6220"
 *    và hình vẽ sai mà KHÔNG hề báo lỗi cú pháp (đã mắc thật).
 *  • Đáp án KHÔNG được in lên hình (đếm là việc của bé).
 *
 * Nguồn số liệu của từng hình: lấy từ nội dung bài học, ghi rõ ở từng hình bên dưới.
 */

import { useState } from "react";
import { CARD_STYLE, CAPTION_STYLE, svgFit } from "./visualTheme";

import { CharacterFullBody } from "../common/CharacterGraphics";
import {
  useFillSlots,
  slotLook,
  FillBar,
  useInteractive,
} from "./interactiveFill";
import { MazePath } from "./interactiveMaze";

const P = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  blue: "#2563eb",
  blueSoft: "#dbeafe",
  amber: "#d97706",
  amberSoft: "#fef3c7",
  rose: "#db2777",
  roseSoft: "#fce7f3",
  green: "#059669",
  greenSoft: "#d1fae5",
  violet: "#7c3aed",
  paper: "#ffffff",
};

const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

/** Vị trí chấm kiểu XÚC XẮC (toạ độ chuẩn hoá 0..1 trên một ô 3×3).
 *  Dùng chấm kiểu xúc xắc chứ không phải hàng–cột đều: bé lớp 1 đã quen mặt xúc xắc,
 * nhìn là nhận ra số lượng ngay mà không phải đếm từng chấm. */
const PIP_SPOTS = {
  1: [[0.5, 0.5]],
  2: [
    [0, 0],
    [1, 1],
  ],
  3: [
    [0, 0],
    [0.5, 0.5],
    [1, 1],
  ],
  4: [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  5: [
    [0, 0],
    [1, 0],
    [0.5, 0.5],
    [0, 1],
    [1, 1],
  ],
  6: [
    [0, 0],
    [1, 0],
    [0, 0.5],
    [1, 0.5],
    [0, 1],
    [1, 1],
  ],
};

/** Vẽ `n` chấm trong khung `x,y,w,h` theo thế xúc xắc (lề 18% mỗi bên). */
const Pips = ({ n, x, y, w, h, r = 4.4, color = "#1e293b" }) => {
  const count = Math.max(1, Math.min(6, num(n, 1)));
  const spots = PIP_SPOTS[count] || PIP_SPOTS[1];
  return spots.map(([u, v], i) => (
    <circle
      key={i}
      cx={num(x) + num(w) * (0.18 + 0.64 * u)}
      cy={num(y) + num(h) * (0.18 + 0.64 * v)}
      r={r}
      fill={color}
    />
  ));
};

/** Ô chữ nhật bo góc kèm chữ ở giữa (dùng cho "?", số, nhãn A/B). */
const Tile = ({
  x,
  y,
  w = 44,
  h = 40,
  text = "",
  fill = "#ffffff",
  stroke = P.grid,
  color = P.ink,
  fs = 20,
  dash = false,
}) => (
  <g>
    <rect
      x={num(x)}
      y={num(y)}
      width={num(w)}
      height={num(h)}
      rx={8}
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeDasharray={dash ? "5 4" : undefined}
    />
    {text !== "" && (
      <text
        x={num(x) + num(w) / 2}
        y={num(y) + num(h) / 2 + num(fs) * 0.36}
        textAnchor="middle"
        fontSize={fs}
        fontWeight="800"
        fill={color}
      >
        {text}
      </text>
    )}
  </g>
);

/** Một "vật" vẽ bằng emoji — đủ rõ với bé lớp 1 và không nặng như vẽ hình thật. */
const Item = ({ x, y, ch = "🐟", s = 18, opacity = 1 }) => (
  <text
    x={num(x)}
    y={num(y)}
    textAnchor="middle"
    fontSize={s}
    opacity={opacity}
    style={{ userSelect: "none", filter: "drop-shadow(0px 3px 5px rgba(0,0,0,0.12))" }}
  >
    {ch}
  </text>
);

/** Dãy `n` emoji, xếp tối đa `per` một hàng. Trả về mảng phần tử (dùng lại nhiều nơi).
 *  `prefix` phải KHÁC NHAU khi hai dãy là anh em ruột trong cùng một `<g>`, nếu không React
 *  báo "Encountered two children with the same key" (cùng khoá 0,1,2…). */
const itemsGrid = (
  n,
  x0,
  y0,
  ch,
  { per = 5, gapX = 30, gapY = 26, s = 18, prefix = "i" } = {},
) =>
  Array.from({ length: n }, (_, i) => (
    <Item
      key={`${prefix}${i}`}
      x={x0 + (i % per) * gapX}
      y={y0 + Math.floor(i / per) * gapY}
      ch={ch}
      s={s}
    />
  ));

/* ═══════════════════════════════════════════════════════════════════════════════
 * NumberScene — một khoá, nhiều kiểu (giống SpatialScene).
 * ═══════════════════════════════════════════════════════════════════════════════ */
/**
 * “Thẻ chấm” bản TƯƠNG TÁC: bé bấm ô giữa (hoặc ô “?”) rồi chọn dấu, app chấm NGAY.
 * Ca đã có `sign` sẵn là hàng MẪU in sẵn ⇒ bé không phải làm gì, giữ nguyên bản tĩnh.
 * Tách ra component riêng vì `useFillSlots` là hook (xem `interactiveFill.jsx`).
 */
function DotCardsCard({ left = 0, right = 0, note = "" }) {
  const l = Number(left) || 0;
  const r = Number(right) || 0;
  const answer = l > r ? ">" : l < r ? "<" : "=";
  const fill = useFillSlots([answer]);
  const look = slotLook(fill, 0, false);
  return (
    <div style={card}>
      <svg
        viewBox="0 0 360 152"
        {...svgFit(360)}
        role="img"
        aria-label="Hai thẻ chấm để bé so sánh — bé bấm ô dấu hỏi rồi chọn dấu"
      >
        <rect
          x="20"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={l} x={20} y={16} w={104} h={104} />
        <g onClick={() => fill.setActive(0)} style={{ cursor: "pointer" }}>
          {fill.active === 0 && !fill.solved[0] && (
            <rect
              x="144"
              y="40"
              width="72"
              height="56"
              rx="14"
              fill="none"
              stroke={P.violet}
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
          )}
          <Tile
            x="150"
            y="46"
            w={60}
            h={44}
            text={fill.picked[0] ?? "?"}
            fs={fill.picked[0] ? 26 : 24}
            fill={look.fill}
            stroke={look.stroke}
            color={look.color}
            dash={look.dash}
          />
        </g>
        <rect
          x="236"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={r} x={236} y={16} w={104} h={104} />
        <text
          x="180"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Bé đếm chấm hai thẻ rồi chọn dấu ở thanh dưới
        </text>
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
      <FillBar fill={fill} />
    </div>
  );
}

/**
 * “So sánh theo mẫu” bản TƯƠNG TÁC: bé bấm ô “?” rồi chọn dấu, app chấm NGAY.
 * Tách ra component riêng vì `useFillSlots` là hook — KHÔNG được gọi trong nhánh `if`
 * của `NumberScene` (hàm đó có nhiều `return` sớm ⇒ lệch số hook ⇒ React ném lỗi).
 */
function ComparePairsCard({ pairs = [], model = "", note = "" }) {
  /** Hàng “mẫu” đánh dấu `null` ⇒ không tính vào tiến độ và không cho bấm. */
  const answers = pairs.map(([l, r], i) =>
    i === 0 && model ? null : l > r ? ">" : l < r ? "<" : "=",
  );
  const fill = useFillSlots(answers);
  const H = pairs.length * 44 + 18;
  return (
    <div style={card}>
      <svg
        viewBox={`0 0 360 ${H}`}
        {...svgFit(360)}
        role="img"
        aria-label="So sánh theo mẫu — bé bấm ô dấu hỏi rồi chọn dấu"
      >
        {pairs.map(([l, r], i) => {
          const y = 10 + i * 44;
          const laMau = i === 0 && !!model;
          const look = slotLook(fill, i, laMau);
          return (
            <g key={i}>
              <rect
                x="22"
                y={y}
                width="104"
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={l} x={22} y={y} w={104} h={36} r={3.6} />
              <g
                onClick={laMau ? undefined : () => fill.setActive(i)}
                style={laMau ? undefined : { cursor: "pointer" }}
              >
                {!laMau && fill.active === i && (
                  <rect
                    x="134"
                    y={y - 5}
                    width="56"
                    height="46"
                    rx="12"
                    fill="none"
                    stroke={P.violet}
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                  />
                )}
                <Tile
                  x="140"
                  y={y}
                  w={44}
                  h={36}
                  text={laMau ? model : (fill.picked[i] ?? "?")}
                  fs={laMau || fill.picked[i] ? 22 : 20}
                  fill={look.fill}
                  stroke={look.stroke}
                  color={look.color}
                  dash={look.dash}
                />
              </g>
              <rect
                x="196"
                y={y}
                width="104"
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={r} x={196} y={y} w={104} h={36} r={3.6} />
              <text
                x="308"
                y={y + 25}
                fontSize="14"
                fontWeight="700"
                fill={P.soft}
              >
                {laMau ? "mẫu" : ""}
              </text>
            </g>
          );
        })}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
      <FillBar fill={fill} />
    </div>
  );
}

const SCENE_ITEMS = {
  farm: [
    ["🐄", 60, 60, 1],
    ["🐄", 120, 74, 1],
    ["☁️", 250, 34, 1],
    ["☁️", 300, 44, 1],
    ["☁️", 340, 30, 1],
    ["🐔", 200, 96, 1],
    ["🐔", 232, 78, 1],
    ["🐔", 268, 100, 1],
    ["🐔", 300, 84, 1],
    ["🌻", 40, 118, 1],
    ["🌻", 76, 128, 1],
    ["🌻", 112, 112, 1],
    ["🌻", 148, 124, 1],
    ["🌻", 180, 138, 1],
    ["☀️", 26, 30, 1],
    ["🐟", 246, 132, 1],
    ["🐟", 280, 142, 1],
    ["🐟", 314, 128, 1],
    ["🐟", 250, 166, 1],
    ["🐟", 210, 148, 1],
    ["🐟", 152, 164, 1],
  ],
  pond: [
    ["🐰", 56, 70, 1],
    ["🐰", 92, 86, 1],
    ["🐰", 128, 66, 1],
    ["🐰", 164, 88, 1],
    ["🌳", 240, 74, 1],
    ["🌳", 288, 92, 1],
    ["🌳", 336, 70, 1],
    ["🦆", 210, 130, 1],
    ["🦆", 248, 118, 1],
    ["🦆", 286, 136, 1],
    ["🦆", 322, 120, 1],
    ["🦆", 180, 150, 1],
    ["☁️", 40, 26, 1],
    ["☁️", 96, 22, 1],
    ["🐦", 150, 36, 1],
    ["🐦", 186, 26, 1],
    ["🐦", 222, 38, 1],
    ["🐦", 258, 28, 1],
    ["🐦", 294, 44, 1],
    ["🐦", 324, 32, 1],
  ],
  river: [
    ["🛶", 60, 60, 1],
    ["🛶", 140, 88, 1],
    ["🛶", 220, 62, 1],
    ["🌴", 290, 74, 1],
    ["🌴", 320, 96, 1],
    ["🌴", 250, 108, 1],
    ["🌴", 180, 126, 1],
    ["🏠", 40, 110, 1],
    ["🏠", 96, 130, 1],
    ["🐟", 150, 150, 1],
    ["🐟", 196, 166, 1],
    ["🐟", 242, 154, 1],
    ["🐟", 288, 144, 1],
    ["🐟", 326, 158, 1],
  ],
  field: [
    ["🐃", 60, 70, 1],
    ["🐃", 112, 86, 1],
    ["🐃", 164, 68, 1],
    ["🐃", 216, 88, 1],
    ["🐃", 268, 70, 1],
    ["🏠", 320, 60, 1],
    ["🏠", 296, 110, 1],
    ["🏠", 330, 104, 1],
    ["🌾", 40, 120, 1],
    ["🌾", 76, 132, 1],
    ["🌾", 112, 122, 1],
    ["🌾", 148, 136, 1],
    ["🌾", 184, 124, 1],
    ["🌾", 220, 138, 1],
    ["☀️", 28, 30, 1],
    ["☁️", 120, 30, 1],
    ["☁️", 180, 24, 1],
  ],
};

/**
 * “Đếm trong tranh cảnh” bản TƯƠNG TÁC + TĨNH:
 * - Khi có `answers` và slide cho phép tương tác: bé bấm ô “?” dưới từng con vật/đồ vật rồi chọn số từ thanh FillBar.
 * - Khi ở slide câu hỏi hoặc không truyền legend: vẽ tranh cảnh thuần túy (không bảng “?” thừa), gọn gàng để bé đếm và trả lời trắc nghiệm.
 */
function SceneCountCard({
  kind = "farm",
  legend = [],
  answers = [],
  options = [],
  note = "",
  tinh = false,
}) {
  const lg = Array.isArray(legend) ? legend : [];
  const coAnswers =
    Array.isArray(answers) && answers.length === lg.length && lg.length > 0;
  const choBam = !tinh && coAnswers;
  const fill = useFillSlots(choBam ? answers : []);

  const items = SCENE_ITEMS[kind] || SCENE_ITEMS.farm;
  const coNuoc = kind === "pond" || kind === "river";
  const coLegend = lg.length > 0;

  const dsChon =
    options && options.length
      ? options
      : [
          ...new Set(
            (coAnswers ? answers : lg.map((_, i) => i + 1)).flatMap((a) => [
              Number(a) - 1,
              Number(a),
              Number(a) + 1,
            ]),
          ),
        ]
          .filter((n) => Number.isFinite(n) && n >= 1 && n <= 10)
          .sort((a, b) => a - b);

  // Khi không có legend (ví dụ ở slide câu hỏi), SVG chỉ cao 180px vừa khít khung tranh
  const H = !coLegend ? 180 : lg.length > 3 ? 246 : 218;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 360 ${H}`}
        {...svgFit(360)}
        role="img"
        aria-label="Tranh cảnh để bé đếm"
      >
        <rect
          x="10"
          y="8"
          width="340"
          height="164"
          rx="12"
          fill={coNuoc ? "#e0f2fe" : "#f0fdf4"}
          stroke={P.grid}
          strokeWidth="2"
        />
        {coNuoc ? (
          <ellipse
            cx="180"
            cy="150"
            rx="150"
            ry="34"
            fill="#bae6fd"
            opacity="0.75"
          />
        ) : (
          kind === "farm" && (
            <ellipse
              cx="262"
              cy="150"
              rx="84"
              ry="24"
              fill="#bae6fd"
              opacity="0.8"
            />
          )
        )}
        {items.map(([ch, x, y], i) => (
          <Item key={i} x={x} y={y} ch={ch} s="20" />
        ))}

        {coLegend && (
          <>
            <rect
              x="10"
              y="178"
              width="340"
              height={lg.length > 3 ? 62 : 34}
              rx="10"
              fill="#ffffff"
              stroke={P.grid}
              strokeWidth="2"
            />
            {lg.map((it, i) => {
              const x = 34 + (i % 3) * 112;
              const y = 178 + 22 + Math.floor(i / 3) * 30;
              const look = choBam
                ? slotLook(fill, i)
                : { fill: "#f8fafc", stroke: P.blue, color: P.blue, dash: true };
              const picked = choBam ? fill.picked[i] : null;
              return (
                <g
                  key={i}
                  onClick={() => choBam && fill.setActive(i)}
                  style={{ cursor: choBam ? "pointer" : "default" }}
                >
                  {choBam && fill.active === i && !fill.solved[i] && (
                    <rect
                      x={x + 10}
                      y={y - 19}
                      width={38}
                      height={28}
                      rx={8}
                      fill="none"
                      stroke={P.violet}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  )}
                  <Item x={x} y={y} ch={it.emoji} s="17" />
                  <Tile
                    x={x + 12}
                    y={y - 17}
                    w={34}
                    h={24}
                    text={
                      picked === null || picked === undefined
                        ? "?"
                        : String(picked)
                    }
                    fs={15}
                    fill={look.fill}
                    stroke={look.stroke}
                    color={look.color}
                    dash={look.dash}
                  />
                </g>
              );
            })}
          </>
        )}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
      {choBam && (
        <FillBar
          fill={fill}
          options={dsChon}
          title="Bé chọn số điền vào ô ?"
          hint="Ô màu đỏ chưa đúng — bé nhìn kỹ lại tranh rồi đếm lại nhé."
        />
      )}
    </div>
  );
}



/* ── SVG Bàn tay đếm tiếp 5 + extra (Chuẩn giải phẫu học cho trẻ) ── */
function HandPairSvg({ extraFingers = 1, currentNum = 6, word = "sáu", isQuiz = false }) {
  return (
    <svg viewBox="0 0 380 142" {...svgFit(380)} role="img" aria-label={`5 thêm ${extraFingers} là ${currentNum}`}>
      {/* TAY TRÁI (Ở BÊN TRÁI MÀN HÌNH): Ngón út ở ngoài cùng bên trái -> ngón cái ở bên phải (hướng vào giữa) */}
      <g transform="translate(12, 6)">
        {/* 1. Ngón út (ngoài cùng bên trái) */}
        <rect x="22" y="32" width="10" height="34" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        {/* 2. Ngón áp út */}
        <rect x="35" y="18" width="11" height="46" rx="5.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        {/* 3. Ngón giữa (dài nhất) */}
        <rect x="49" y="12" width="11" height="52" rx="5.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        {/* 4. Ngón trỏ */}
        <rect x="63" y="18" width="11" height="46" rx="5.5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        {/* 5. Ngón cái (Ở BÊN PHẢI CỦA TAY TRÁI, HƯỚNG VÀO TRUNG TÂM) */}
        <rect x="74" y="58" width="12" height="28" rx="6" transform="rotate(32 78 70)" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />

        {/* Lòng bàn tay trái (vẽ đè lên chân các ngón tay) */}
        <rect x="20" y="52" width="56" height="44" rx="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <path d="M30,72 Q48,78 66,70" fill="none" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />

        {/* Huy hiệu số trên đầu 5 ngón tay trái */}
        <circle cx="27" cy="27" r="6" fill="#2563eb" />
        <text x="27" y="30.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">1</text>
        <circle cx="40.5" cy="13" r="6" fill="#2563eb" />
        <text x="40.5" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">2</text>
        <circle cx="54.5" cy="7" r="6" fill="#2563eb" />
        <text x="54.5" y="10.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">3</text>
        <circle cx="68.5" cy="13" r="6" fill="#2563eb" />
        <text x="68.5" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">4</text>
        <circle cx="90" cy="54" r="6.5" fill="#2563eb" />
        <text x="90" y="57.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">5</text>

        {/* Nhãn 5 ngón tay trái - khung rộng rãi, chữ thoáng không sát viền */}
        <rect x="6" y="104" width="84" height="22" rx="11" fill="#2563eb" />
        <text x="48" y="119" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">✋ 5 ngón</text>
      </g>

      {/* DẤU CỘNG Ở GIỮA */}
      <g transform="translate(136, 52)">
        <circle cx="0" cy="0" r="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">+</text>
      </g>

      {/* TAY PHẢI (Ở BÊN PHẢI MÀN HÌNH): Ngón cái ở bên TRÁI (hướng vào giữa) -> ngón út ở bên phải ngoài cùng */}
      <g transform="translate(168, 6)">
        {/* 1. Ngón cái phải (Ở BÊN TRÁI CỦA TAY PHẢI, HƯỚNG VÀO TRUNG TÂM) */}
        {extraFingers === 5 && (
          <rect x="6" y="58" width="12" height="28" rx="6" transform="rotate(-32 14 70)" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        )}

        {/* 2. Ngón trỏ phải (x = 22) -> Giơ lên khi thêm >= 1 ngón */}
        {extraFingers >= 1 ? (
          <rect x="22" y="18" width="11" height="46" rx="5.5" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        ) : (
          <rect x="22" y="48" width="11" height="14" rx="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        )}

        {/* 3. Ngón giữa phải (x = 36) -> Giơ lên khi thêm >= 2 ngón */}
        {extraFingers >= 2 ? (
          <rect x="36" y="12" width="11" height="52" rx="5.5" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        ) : (
          <rect x="36" y="48" width="11" height="14" rx="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        )}

        {/* 4. Ngón áp út phải (x = 50) -> Giơ lên khi thêm >= 3 ngón (3 ngón trỏ + giữa + áp út thẳng song song) */}
        {extraFingers >= 3 ? (
          <rect x="50" y="18" width="11" height="46" rx="5.5" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        ) : (
          <rect x="50" y="48" width="11" height="14" rx="5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        )}

        {/* 5. Ngón út phải (x = 64) -> Giơ lên khi thêm >= 4 ngón (4 ngón trỏ + giữa + áp út + út thẳng song song) */}
        {extraFingers >= 4 ? (
          <rect x="64" y="32" width="10" height="34" rx="5" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        ) : (
          <rect x="64" y="50" width="10" height="12" rx="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
        )}

        {/* Lòng bàn tay phải (vẽ đè lên chân các ngón tay) */}
        <rect x="18" y="52" width="56" height="44" rx="14" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        <path d="M28,70 Q46,78 64,72" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" />

        {/* Ngón cái cụp khi extraFingers < 5 (vẽ đè lên lòng bàn tay) */}
        {extraFingers < 5 && (
          <path d="M18,68 Q26,72 22,80" fill="none" stroke="#d97706" strokeWidth="2.2" strokeLinecap="round" />
        )}

        {/* Huy hiệu số cho các ngón giơ lên ở bàn tay phải */}
        {extraFingers === 5 && (
          <>
            <circle cx="2" cy="54" r="6.5" fill="#ea580c" />
            <text x="2" y="57.5" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#ffffff">10</text>
          </>
        )}
        {extraFingers >= 1 && (
          <>
            <circle cx="27.5" cy="13" r="6" fill="#ea580c" />
            <text x="27.5" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">6</text>
          </>
        )}
        {extraFingers >= 2 && (
          <>
            <circle cx="41.5" cy="7" r="6" fill="#ea580c" />
            <text x="41.5" y="10.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">7</text>
          </>
        )}
        {extraFingers >= 3 && (
          <>
            <circle cx="55.5" cy="13" r="6" fill="#ea580c" />
            <text x="55.5" y="16.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">8</text>
          </>
        )}
        {extraFingers >= 4 && (
          <>
            <circle cx="69" cy="27" r="6" fill="#ea580c" />
            <text x="69" y="30.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff">9</text>
          </>
        )}

        {/* Nhãn ngón thêm - khung rộng rãi, chữ thoáng không sát viền */}
        <rect x="0" y="104" width="92" height="22" rx="11" fill="#ea580c" />
        <text x="46" y="119" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#ffffff">
          thêm {extraFingers} ngón
        </text>
      </g>

      {/* MŨI TÊN KẾT QUẢ */}
      <g transform="translate(268, 54)">
        <path d="M0,8 L16,8 M10,3 L16,8 L10,13" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* HỘP KẾT QUẢ */}
      {isQuiz ? (
        <g transform="translate(294, 8)">
          <rect x="0" y="0" width="76" height="96" rx="16" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4 3" />
          <text x="38" y="58" textAnchor="middle" fontSize="44" fontWeight="900" fill="#2563eb">?</text>
          <text x="38" y="82" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#3b82f6">mấy ngón?</text>
        </g>
      ) : (
        <g transform="translate(294, 8)">
          <rect x="0" y="0" width="76" height="96" rx="16" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" />
          <text x="38" y="54" textAnchor="middle" fontSize="46" fontWeight="900" fill="#15803d">{currentNum}</text>
          <text x="38" y="80" textAnchor="middle" fontSize="15" fontWeight="800" fill="#16a34a">{word}</text>
        </g>
      )}
    </svg>
  );
}

/* ── Component Bàn tay Cầu nối đếm tiếp sau 5 (dùng cho Quiz hoặc thử tài) ── */
function CountingBridgeCard({ target = 6, have = 5, extra = 1, note = "" }) {
  const interactive = useInteractive();
  const extraFingers = Number(extra) || (Number(target) - 5) || 1;
  const currentNum = Number(have) + extraFingers;

  const countingPhrases = {
    6: { word: "sáu", countText: "Năm... SÁU! ➔ 5 thêm 1 là 6" },
    7: { word: "bảy", countText: "Năm... sáu, BẢY! ➔ 5 thêm 2 là 7" },
    8: { word: "tám", countText: "Năm... sáu, bảy, TÁM! ➔ 5 thêm 3 là 8" },
    9: { word: "chín", countText: "Năm... sáu, bảy, tám, CHÍN! ➔ 5 thêm 4 là 9" },
    10: { word: "mười", countText: "Hai bàn tay xòe đủ: MƯỜI! ➔ 5 thêm 5 là 10" },
  };

  const phrase = countingPhrases[currentNum] || countingPhrases[6];
  const isQuiz = !interactive;

  return (
    <div style={{ ...CARD_STYLE, padding: "14px 14px", background: "#f8fafc", borderRadius: 18, border: "2px solid #e2e8f0" }}>
      <HandPairSvg
        extraFingers={extraFingers}
        currentNum={currentNum}
        word={phrase.word}
        isQuiz={isQuiz}
      />

      {/* BANNER NHẨM ĐẾM TIẾP */}
      <div style={{
        marginTop: 10,
        padding: "10px 14px",
        background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
        border: "1.5px solid #bfdbfe",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <span style={{ fontSize: 22 }}>🗣️</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a" }}>
            {isQuiz ? "Bé quan sát hai bàn tay:" : "Mẹo đếm tiếp: Giữ 5 ở tay trái..."}
          </div>
          <div style={{ fontSize: 15, fontWeight: 900, color: "#047857" }}>
            {isQuiz ? `5 thêm ${extraFingers} ngón là mấy ngón tay?` : phrase.countText}
          </div>
        </div>
      </div>

      {note && <div style={{ ...caption, color: P.ink, fontSize: 13, marginTop: 8, textAlign: "center" }}>{note}</div>}
    </div>
  );
}

/* ── Component Khám phá Từng Số: Bàn tay đếm tiếp + Khung 10 ô chạm đếm ── */
function TenFrameCard({
  n = 6,
  word = "sáu",
  emoji = "🐝",
  item = "con ong",
  extraFingers: propExtra = null,
  note = "",
}) {
  const extraFingers = propExtra !== null ? Number(propExtra) : (Number(n) > 5 ? Number(n) - 5 : 1);
  const currentNum = Number(n) || (5 + extraFingers);

  const countingPhrases = {
    6: { word: "sáu", countText: "Năm... SÁU! ➔ 5 thêm 1 là 6" },
    7: { word: "bảy", countText: "Năm... sáu, BẢY! ➔ 5 thêm 2 là 7" },
    8: { word: "tám", countText: "Năm... sáu, bảy, TÁM! ➔ 5 thêm 3 là 8" },
    9: { word: "chín", countText: "Năm... sáu, bảy, tám, CHÍN! ➔ 5 thêm 4 là 9" },
    10: { word: "mười", countText: "Hai bàn tay xòe đủ: MƯỜI! ➔ 5 thêm 5 là 10" },
  };
  const phrase = countingPhrases[currentNum] || { word, countText: `5 thêm ${extraFingers} là ${currentNum}` };

  const [tapped, setTapped] = useState([]);
  const countTapped = tapped.length;

  const handleTap = (idx) => {
    setTapped((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  return (
    <div style={{ ...CARD_STYLE, padding: "12px 12px", background: "#f8fafc", borderRadius: 20, border: "2px solid #e2e8f0" }}>
      {/* 1. KHỐI BÀN TAY ĐẾM TIẾP TRỰC QUAN (TO, RÕ, CHUẨN GIẢI PHẪU) */}
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "12px 12px 14px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
        marginBottom: 12,
      }}>
        <HandPairSvg
          extraFingers={extraFingers}
          currentNum={currentNum}
          word={phrase.word}
          isQuiz={false}
        />

        {/* CÂU NHẨM ĐẾM TIẾP */}
        <div style={{
          marginTop: 10,
          padding: "8px 12px",
          background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
          borderRadius: 12,
          border: "1px solid #bfdbfe",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <span style={{ fontSize: 18 }}>🗣️</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#047857" }}>
            {phrase.countText}
          </span>
        </div>
      </div>

      {/* 2. KHỐI KHUNG 10 Ô & CHẠM ĐẾM */}
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "10px 12px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
      }}>
        {/* Tiêu đề & trạng thái chạm đếm */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 6, borderBottom: "1px dashed #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{currentNum}</span>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#2563eb" }}>{word}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>({currentNum} {item})</span>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: countTapped === currentNum ? "#15803d" : "#ea580c" }}>
            {countTapped === currentNum ? `🎉 Đã đếm đủ ${currentNum}!` : `👉 Chạm đếm: ${countTapped}/${currentNum}`}
          </div>
        </div>

        {/* Khung 10 ô: 2 hàng x 5 cột */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 7,
          maxWidth: 320,
          margin: "0 auto",
        }}>
          {Array.from({ length: 10 }).map((_, idx) => {
            const hasItem = idx < currentNum;
            const isRow1 = idx < 5;
            const isTapped = tapped.includes(idx);
            const tapOrder = tapped.indexOf(idx) + 1;

            return (
              <div
                key={idx}
                onClick={hasItem ? () => handleTap(idx) : undefined}
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 10,
                  border: hasItem
                    ? isRow1
                      ? "2px solid #86efac"
                      : "2px solid #fed7aa"
                    : "1.5px dashed #cbd5e1",
                  background: hasItem
                    ? isRow1
                      ? isTapped ? "#bbf7d0" : "#f0fdf4"
                      : isTapped ? "#ffedd5" : "#fff7ed"
                    : "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: hasItem ? "pointer" : "default",
                  userSelect: "none",
                  transform: isTapped ? "scale(0.96)" : "scale(1)",
                  transition: "all 0.15s ease",
                  boxShadow: hasItem ? "0 1px 3px rgba(0,0,0,0.03)" : "none",
                }}
              >
                {hasItem ? (
                  <>
                    <span style={{ fontSize: 24, lineHeight: 1 }}>{emoji}</span>
                    {isTapped && (
                      <span style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                        background: "#2563eb",
                        color: "#ffffff",
                        fontSize: 9.5,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {tapOrder}
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>·</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Giải thích cấu trúc 5 và thêm */}
        <div style={{
          marginTop: 8,
          padding: "6px 10px",
          background: "#eff6ff",
          borderRadius: 8,
          border: "1px solid #bfdbfe",
          fontSize: 12.5,
          fontWeight: 700,
          color: "#1e40af",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}>
          <span>💡</span>
          <span><b>{currentNum} gồm 5</b> và <b>{currentNum - 5}</b></span>
          <span style={{ color: "#3b82f6" }}>•</span>
          <span style={{ color: "#059669", fontWeight: 800 }}>5 + {currentNum - 5} = {currentNum}</span>
        </div>
      </div>

      {note && <div style={{ ...caption, color: P.ink, fontSize: 12.5, marginTop: 6, textAlign: "center" }}>{note}</div>}
    </div>
  );
}

/* ── Component Khung 10 ô cặp số (Ten-Frame Duo & Chạm đếm) ────────── */
function TenFrameDuoCard({ duo = [], note = "" }) {
  const [tabIdx, setTabIdx] = useState(0);
  const [tappedIndices, setTappedIndices] = useState(() => ({}));

  const safeDuo = duo && duo.length > 0 ? duo : [
    { n: 6, word: "sáu", emoji: "🐝", item: "con ong" },
    { n: 7, word: "bảy", emoji: "🐦", item: "con chim" },
  ];

  const current = safeDuo[tabIdx] || safeDuo[0];
  const N = current.n;
  const word = current.word;
  const emoji = current.emoji;
  const itemName = current.item;

  const currentTapped = tappedIndices[tabIdx] || [];
  const countTapped = currentTapped.length;

  const handleTap = (index) => {
    setTappedIndices((prev) => {
      const list = prev[tabIdx] || [];
      if (list.includes(index)) {
        return { ...prev, [tabIdx]: list.filter((i) => i !== index) };
      }
      return { ...prev, [tabIdx]: [...list, index] };
    });
  };

  return (
    <div style={{ ...CARD_STYLE, padding: "14px 12px", background: "#f8fafc", borderRadius: 18, border: "2px solid #e2e8f0" }}>
      {/* Thanh chuyển tab giữa 2 số */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        {safeDuo.map((d, idx) => {
          const active = tabIdx === idx;
          return (
            <button
              key={d.n}
              type="button"
              onClick={() => setTabIdx(idx)}
              style={{
                padding: "8px 18px",
                borderRadius: 24,
                border: active ? "2px solid #2563eb" : "1.5px solid #cbd5e1",
                background: active ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" : "#ffffff",
                color: active ? "#ffffff" : "#475569",
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: active ? "0 4px 10px rgba(37,99,235,0.3)" : "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.15s ease",
              }}
            >
              <span>{d.emoji}</span>
              <span>Số {d.n} ({d.word})</span>
            </button>
          );
        })}
      </div>

      {/* Thẻ Khung 10 ô */}
      <div style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: "12px 14px",
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}>
        {/* Tiêu đề & trạng thái chạm đếm */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 6, borderBottom: "1px dashed #e2e8f0" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{N}</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#2563eb" }}>{word}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#64748b" }}>({N} {itemName})</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: countTapped === N ? "#15803d" : "#ea580c" }}>
            {countTapped === N ? `🎉 Đã đếm đủ ${N}!` : `👉 Chạm đếm: ${countTapped}/${N}`}
          </div>
        </div>

        {/* Khung 10 ô: 2 hàng x 5 cột */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
          maxWidth: 320,
          margin: "0 auto",
        }}>
          {Array.from({ length: 10 }).map((_, idx) => {
            const hasItem = idx < N;
            const isRow1 = idx < 5;
            const isTapped = currentTapped.includes(idx);
            const tapOrder = currentTapped.indexOf(idx) + 1;

            return (
              <div
                key={idx}
                onClick={hasItem ? () => handleTap(idx) : undefined}
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 12,
                  border: hasItem
                    ? isRow1
                      ? "2px solid #86efac"
                      : "2px solid #fed7aa"
                    : "1.5px dashed #cbd5e1",
                  background: hasItem
                    ? isRow1
                      ? isTapped ? "#bbf7d0" : "#f0fdf4"
                      : isTapped ? "#ffedd5" : "#fff7ed"
                    : "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: hasItem ? "pointer" : "default",
                  userSelect: "none",
                  transform: isTapped ? "scale(0.96)" : "scale(1)",
                  transition: "all 0.15s ease",
                  boxShadow: hasItem ? "0 2px 4px rgba(0,0,0,0.04)" : "none",
                }}
              >
                {hasItem ? (
                  <>
                    <span style={{ fontSize: 24, lineHeight: 1 }}>{emoji}</span>
                    {isTapped && (
                      <span style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "#2563eb",
                        color: "#ffffff",
                        fontSize: 10,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        {tapOrder}
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>·</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Giải thích cấu trúc 5 và thêm */}
        <div style={{
          marginTop: 10,
          padding: "6px 12px",
          background: "#eff6ff",
          borderRadius: 10,
          border: "1px solid #bfdbfe",
          fontSize: 13,
          fontWeight: 700,
          color: "#1e40af",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
        }}>
          <span>💡</span>
          <span><b>{N} gồm 5</b> (hàng trên) và <b>{N - 5}</b> (hàng dưới)</span>
          <span style={{ color: "#3b82f6", margin: "0 4px" }}>•</span>
          <span style={{ color: "#059669", fontWeight: 800 }}>5 + {N - 5} = {N}</span>
        </div>
      </div>

      {note && <div style={{ ...caption, color: P.ink, fontSize: 13, marginTop: 6, textAlign: "center" }}>{note}</div>}
    </div>
  );
}

/* ── Component Khung 10 ô đặc biệt cho Số 10 (Ten-Frame Full) ──────── */
function TenFrameFullCard({ n = 10, word = "mười", emoji = "🐞", item = "con bọ rùa", note = "" }) {
  const [tapped, setTapped] = useState([]);
  const countTapped = tapped.length;

  const handleTap = (idx) => {
    setTapped((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  return (
    <div style={{ ...CARD_STYLE, padding: "14px 12px", background: "linear-gradient(180deg, #fefce8 0%, #f8fafc 100%)", borderRadius: 18, border: "2px solid #fef08a" }}>
      {/* Tiêu đề đặc biệt cho số 10 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 6, borderBottom: "1.5px dashed #fde047" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 38, fontWeight: 900, color: "#854d0e", lineHeight: 1 }}>{n}</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: "#d97706" }}>{word}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#713f12" }}>(Số có hai chữ số đầu tiên 👑)</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: countTapped === 10 ? "#15803d" : "#d97706" }}>
          {countTapped === 10 ? "🎉 Tuyệt vời! Đủ 10!" : `👉 Chạm đếm: ${countTapped}/10`}
        </div>
      </div>

      {/* Khung 10 ô: Kín toàn bộ 10 ô */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 8,
        maxWidth: 320,
        margin: "0 auto",
      }}>
        {Array.from({ length: 10 }).map((_, idx) => {
          const isRow1 = idx < 5;
          const isTapped = tapped.includes(idx);
          const tapOrder = tapped.indexOf(idx) + 1;

          return (
            <div
              key={idx}
              onClick={() => handleTap(idx)}
              style={{
                aspectRatio: "1/1",
                borderRadius: 12,
                border: isRow1 ? "2px solid #fca5a5" : "2px solid #fed7aa",
                background: isRow1 ? (isTapped ? "#fee2e2" : "#fff1f2") : (isTapped ? "#ffedd5" : "#fff7ed"),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: "pointer",
                userSelect: "none",
                transform: isTapped ? "scale(0.96)" : "scale(1)",
                transition: "all 0.15s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{emoji}</span>
              {isTapped && (
                <span style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#d97706",
                  color: "#ffffff",
                  fontSize: 10,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {tapOrder}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Ghi chú cấu trúc 5 và 5 */}
      <div style={{
        marginTop: 10,
        padding: "8px 12px",
        background: "#fef9c3",
        borderRadius: 12,
        border: "1.5px solid #fde047",
        fontSize: 13,
        fontWeight: 700,
        color: "#854d0e",
        textAlign: "center",
      }}>
        ✋ <b>Tay trái (5)</b> + 🖐️ <b>Tay phải (5)</b> = <b>10 ngón tay</b> · Khung 10 ô đã <b>ĐẦY KÍN!</b>
      </div>

      {note && <div style={{ ...caption, color: P.ink, fontSize: 13, marginTop: 6, textAlign: "center" }}>{note}</div>}
    </div>
  );
}

/* ── Component Tháp Bậc thang số 1 đến 10 (Number Stairs) ─────────── */
function NumberStairsCard({ max = 10, note = "" }) {
  const [activeCol, setActiveCol] = useState(10);

  return (
    <div style={{ ...CARD_STYLE, padding: "14px 10px", background: "#f8fafc", borderRadius: 18, border: "2px solid #e2e8f0" }}>
      {/* SVG Bậc thang */}
      <svg viewBox="0 0 350 160" {...svgFit(350)} role="img" aria-label="Bậc thang các số từ 1 đến 10">
        {Array.from({ length: 10 }, (_, i) => {
          const colNum = i + 1;
          const colW = 24;
          const gap = 8;
          const x = 15 + i * (colW + gap);
          const blockH = 10.5;
          const baseY = 135;
          const isSelected = activeCol === colNum;

          return (
            <g
              key={colNum}
              onClick={() => setActiveCol(colNum)}
              style={{ cursor: "pointer" }}
            >
              {/* Vùng chọn sáng */}
              {isSelected && (
                <rect
                  x={x - 3}
                  y={baseY - colNum * (blockH + 1.5) - 18}
                  width={colW + 6}
                  height={colNum * (blockH + 1.5) + 38}
                  rx="6"
                  fill="#dbeafe"
                  opacity="0.6"
                />
              )}

              {/* Ngôi sao đỉnh cột 10 */}
              {colNum === 10 && (
                <text x={x + colW / 2} y={baseY - 10 * (blockH + 1.5) - 4} textAnchor="middle" fontSize="14">
                  ⭐
                </text>
              )}

              {/* Các khối xếp chồng */}
              {Array.from({ length: colNum }, (__, bIdx) => {
                const bY = baseY - (bIdx + 1) * (blockH + 1.5);
                const isOver5 = bIdx >= 5;
                const fill = isOver5 ? "#f59e0b" : "#3b82f6";

                return (
                  <rect
                    key={bIdx}
                    x={x}
                    y={bY}
                    width={colW}
                    height={blockH}
                    rx="3"
                    fill={fill}
                    stroke="#1e293b"
                    strokeWidth="0.8"
                  />
                );
              })}

              {/* Số dưới chân cột */}
              <text
                x={x + colW / 2}
                y={baseY + 16}
                textAnchor="middle"
                fontSize={isSelected ? "14" : "12"}
                fontWeight={isSelected ? "900" : "700"}
                fill={isSelected ? "#1d4ed8" : "#475569"}
              >
                {colNum}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Phản hồi tương tác */}
      <div style={{
        marginTop: 6,
        padding: "6px 12px",
        background: activeCol === 10 ? "#fef3c7" : "#eff6ff",
        borderRadius: 12,
        border: activeCol === 10 ? "1.5px solid #fcd34d" : "1.5px solid #bfdbfe",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 13,
        fontWeight: 700,
        color: activeCol === 10 ? "#92400e" : "#1e40af",
      }}>
        <span>
          {activeCol === 10
            ? "👑 Cột 10 cao nhất: 10 là số lớn nhất trong phạm vi 10!"
            : `🪜 Cột ${activeCol} gồm ${activeCol} khối (Bé bấm vào từng cột để xem nhé!)`}
        </span>
        <span style={{ fontSize: 16 }}>{activeCol === 10 ? "⭐" : "👆"}</span>
      </div>

      {/* Thẻ ghi nhớ */}
      <div style={{ display: "flex", gap: 10, marginTop: 6, justifyContent: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "#059669", fontWeight: 700 }}>
          ✓ Mỗi bước sang phải: thêm 1 khối (+1)
        </span>
        <span style={{ fontSize: 12, color: "#d97706", fontWeight: 700 }}>
          ✓ Khối màu cam là phần thêm sau 5
        </span>
      </div>

      {note && <div style={{ ...caption, color: P.ink, fontSize: 13, marginTop: 4, textAlign: "center" }}>{note}</div>}
    </div>
  );
}

export function NumberScene({
  mode = "",
  note = "",
  duo = [],
  n = 0,
  word = "",
  item = "",
  extra = 0,
  // numberShow
  kind = "",
  /**
   * `showDigits: false` = KHÔNG vẽ ô số + chữ đọc số.
   * Dùng cho hình trên slide CÂU HỎI: in số ra là cho luôn đáp án (luật đã có trong file này).
   */
  showDigits = true,
  // manyGroups
  groups = [],
  paired = false,
  unit = "",
  // addToReach
  have = 0,
  target = 0,
  a = 0,
  b = 0,
  emoji = "🥚",
  ask = "Bé chọn A hay B?",
  // countFiltered
  cols = 6,
  colored = [],
  labels = [],
  kinds = [],
  // sceneCount (số lượng do mình chọn — ghi ở bảng nguồn)
  legend = [],
  // numberTrain / numberBond / matchEqual / numberMaze / dotCards / comparePairs
  numbers = [],
  rows = [],
  /**
   * `answers` + `options` cho DÃY SỐ ĐIỀN ĐƯỢC (`kind: "ribbon"/"wagons"`): `answers` = số
   * đúng của TỪNG ô trống theo thứ tự đọc (thiếu ⇒ giữ bản tĩnh), `options` = các số cho bé
   * chọn (thiếu ⇒ bộ vẽ tự lấy mỗi đáp án cùng hai số kề).
   */
  answers = null,
  options = null,
  total = 0,
  parts = [],
  pairs = [],
  grid = [],
  left = null,
  right = null,
  sign = "",
  model = "",
  dotsOnly = true,
  // gridWalk
  startAt = 25,
}) {
  /**
   * `dx` (tuỳ chọn): dịch nội dung sang phải để lề hai bên đều nhau. Có kiểu vẽ cố tình chừa
   * chỗ bên phải cho nhãn nên nội dung nhìn LỆCH TRÁI — người dùng báo 2026-09-24.
   */
  /** Slide bài học thì cho bé BẤM trả lời; slide câu hỏi thì không (xem `interactiveFill.jsx`). */
  const interactive = useInteractive();
  const box = (children, w, h, label, dx = 0) => (
    <div style={card}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        {...svgFit(w)}
        role="img"
        aria-label={label}
      >
        {dx ? <g transform={`translate(${dx},0)`}>{children}</g> : children}
      </svg>
      {(note || (mode === "manyGroups" && unit)) && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note || unit}</span>
      )}
    </div>
  );

  
  /* ── Các chế độ sư phạm mới cho Số 6 đến 10 ──────────── */
  if (mode === "countingOverview" || mode === "tenFrameNumber") {
    return (
      <TenFrameCard
        n={n || 6}
        word={word || "sáu"}
        emoji={emoji || "🐝"}
        item={item || "con ong"}
        extraFingers={extra || (n ? n - 5 : 1)}
        note={note}
      />
    );
  }

  if (mode === "countingBridge") {
    return (
      <CountingBridgeCard
        target={target || total || 6}
        have={have || 5}
        extra={a !== 0 ? a : (b !== 0 ? b : null)}
        note={note}
      />
    );
  }

  if (mode === "tenFrameDuo") {
    return <TenFrameDuoCard duo={duo} note={note} />;
  }

  if (mode === "tenFrameFull") {
    return (
      <TenFrameFullCard
        n={n || 10}
        word={word || "mười"}
        emoji={emoji || "🐞"}
        item={item || "con bọ rùa"}
        note={note}
      />
    );
  }

  if (mode === "numberStairs") {
    return <NumberStairsCard max={10} note={note} />;
  }

  /* ── 1. Năm bạn của bé ─────────────────────────────────────────── */
  if (mode === "fiveFriends") {
    /**
     * 🔴 GIỚI TÍNH PHẢI NHÌN RA ĐƯỢC. Bản cũ vẽ **cùng một kiểu tóc** cho cả 5 bạn (chỉ khác
     * màu áo) ⇒ không ai biết Nam · Việt là bé trai, Mai · Mi là bé gái (người dùng báo
     * 2026-09-24). Nay: bé trai tóc ngắn; bé gái tóc dài + HAI BÍM + NƠ; Rô-bốt giữ nguyên.
     * Quy ước này dùng CHUNG với `kidsLeftRight` (GeometryVisuals).
     */
    const friends = [
      { name: "Nam", kind: "boy", shirt: "#60a5fa", hair: "#1f2937" },
      { name: "Mai", kind: "girl", shirt: "#f472b6", hair: "#78350f" },
      { name: "Rô-bốt", kind: "robot", shirt: "#94a3b8", hair: null },
      { name: "Việt", kind: "boy", shirt: "#4ade80", hair: "#1f2937" },
      { name: "Mi", kind: "girl", shirt: "#fbbf24", hair: "#78350f" },
    ];
    return box(
      <>
        <text
          x="180"
          y="20"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={P.soft}
        >
          Năm bạn cùng học Toán với bé
        </text>
        <line
          x1="14"
          y1="116"
          x2="346"
          y2="116"
          stroke={P.grid}
          strokeWidth="3"
          strokeDasharray="6 5"
        />
        {friends.map((f, i) => {
          const x = 45 + i * 70;
          return (
            <g key={f.name}>
              <ellipse
                cx={x}
                cy={120}
                rx="20"
                ry="4"
                fill="#000000"
                opacity="0.08"
              />
              <g transform={`translate(${x - 30}, 30)`}>
                <CharacterFullBody name={f.name} width={60} height={90} />
              </g>
              <text
                x={x}
                y={134}
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                {f.name}
              </text>
            </g>
          );
        })}
      </>,
      360,
      145,
      "Năm bạn: Nam, Mai, Rô-bốt, Việt, Mi",
    );
  }

  /* ── 2. Bảng KHÁM PHÁ ─────────────────────────────────── */
  // BỐ CỤC THEO ĐÚNG TRANG SÁCH (Bài 1, tr.8): mỗi hàng có 4 phần —
  //   ① bể cá có n con cá → ② khay có n khối lập phương → ③ ô số → ④ chữ đọc số.
  // Sách cố ý cho CÙNG một lượng bằng HAI cách đếm (cá = cảnh thật, khối = cách đếm
  // trực quan) rồi mới tới số và chữ. Vì vậy KHÔNG được gộp hai cột làm một, và KHÔNG
  // được đặt khối vào trong bể — từng làm vậy và ra hình vô nghĩa “bể cá đựng khối”.
  // kind="tank"  : 0 → 5 — bể cá + khay khối
  // kind="living": 6 → 10 — nhóm con vật / hoa
  if (mode === "numberShow") {
    const CUBE = ["#facc15", "#fb923c", "#f87171", "#4ade80", "#60a5fa"];
    const CA = "\u{1F41F}"; // cá 🐟 (ghi bằng mã hoá để không hỏng ký tự)
    const BE = { x: 0, w: 124, h: 27 }; // bể cá: thành bể + mặt nước
    const KHAY = { x: 130, w: 124, h: 27 }; // khay khối: hộp chữ nhật vàng nhạt

    /** Bể cá — n con cá bơi trong nước; n = 0 là BỂ RỖNG (đúng hàng cuối trang 8). */
    const tank = (n) => {
      const rong = BE.w - 12;
      const co = Math.min(18, rong / Math.max(1, n) - 4);
      return (
        <g>
          <rect
            x={BE.x}
            y="0"
            width={BE.w}
            height={BE.h}
            rx="9"
            fill="#e0f2fe"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <rect
            x={BE.x + 4}
            y="5"
            width={BE.w - 8}
            height={BE.h - 10}
            rx="6"
            fill="#bae6fd"
          />
          <line
            x1={BE.x + 4}
            y1="5"
            x2={BE.x + BE.w - 4}
            y2="5"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          {Array.from({ length: n }, (_, i) => (
            <text
              key={i}
              x={BE.x + 6 + (rong * (i + 0.5)) / n}
              y="21"
              textAnchor="middle"
              fontSize={co}
            >
              {CA}
            </text>
          ))}
        </g>
      );
    };

    /** Khay khối — n KHỐI LẬP PHƯƠNG xếp cạnh nhau (mặt trên + mặt trước). */
    const tray = (n) => {
      const rong = KHAY.w - 16;
      const canh = Math.min(20, rong / Math.max(1, n) - 4);
      const khe = n > 1 ? 4 : 0;
      const tong = n * canh + Math.max(0, n - 1) * khe;
      const x0 = KHAY.x + (KHAY.w - tong) / 2;
      return (
        <g>
          <rect
            x={KHAY.x}
            y="0"
            width={KHAY.w}
            height={KHAY.h}
            rx="9"
            fill="#fef3c7"
            stroke="#fcd34d"
            strokeWidth="2"
          />
          {Array.from({ length: n }, (_, i) => {
            const x = x0 + i * (canh + khe);
            const c = CUBE[i % 5];
            return (
              <g key={i}>
                <polygon
                  points={`${x},9 ${x + 5},5 ${x + canh + 5},5 ${x + canh},9`}
                  fill={c}
                  stroke="#475569"
                  strokeWidth="1.1"
                />
                <rect
                  x={x}
                  y="9"
                  width={canh}
                  height="14"
                  fill={c}
                  stroke="#475569"
                  strokeWidth="1.3"
                />
              </g>
            );
          })}
        </g>
      );
    };
    let rowsSpec = [];
    if (numbers && numbers.length > 0) {
      const words = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín",
        "mười",
      ];
      const emojis = ["", "", "", "", "", "", "🐝", "🐦", "🌸", "⭐", "🐞"];
      rowsSpec = numbers.map((n) => ({
        n,
        word: words[n] || "",
        ch: kind === "tank" ? undefined : emojis[n] || "🐝",
      }));
    } else {
      rowsSpec =
        kind === "tank"
          ? [
              { n: 1, word: "một" },
              { n: 2, word: "hai" },
              { n: 3, word: "ba" },
              { n: 4, word: "bốn" },
              { n: 5, word: "năm" },
              { n: 0, word: "không" },
            ]
          : [
              { n: 6, word: "sáu", ch: "🐝" },
              { n: 7, word: "bảy", ch: "🐦" },
              { n: 8, word: "tám", ch: "🌸" },
              { n: 9, word: "chín", ch: "⭐" },
              { n: 10, word: "mười", ch: "🐞" },
            ];
    }
    /**
     * HÀNG VẼ TO — dùng khi slide chỉ dạy MỘT số (`numbers` có đúng 1 phần tử).
     * Bảng 6 hàng nhỏ chỉ hợp khi phải nhìn CẢ dãy; dạy từng số thì bể cá và khay khối phải
     * to cho bé nhìn rõ từng con cá, từng khối (yêu cầu người dùng 2026-09-29).
     */
    const rowBig = (n, word, hienSo) => {
      const B = { x: 4, y: 6, w: 140, h: 62 }; // bể cá
      const K = { x: 156, y: 6, w: 140, h: 62 }; // khay khối
      const rongBe = B.w - 16;
      const coCa = Math.min(22, rongBe / Math.max(1, n) - 4);
      const rongKhay = K.w - 16;
      const canh = Math.min(
        30,
        (rongKhay - 6 * Math.max(0, n - 1)) / Math.max(1, n),
      );
      const khe = n > 1 ? 6 : 0;
      const tong = n * canh + Math.max(0, n - 1) * khe;
      const x0 = K.x + (K.w - tong) / 2;
      const caoTrong = K.h - 16;
      const y0 = K.y + 8 + (caoTrong - canh) / 2;
      const day = canh * 0.72;
      const mat = canh * 0.26;
      const lech = canh * 0.22;
      return (
        <g>
          <rect
            x={B.x}
            y={B.y}
            width={B.w}
            height={B.h}
            rx="12"
            fill="#e0f2fe"
            stroke="#94a3b8"
            strokeWidth="2.5"
          />
          <rect
            x={B.x + 5}
            y={B.y + 6}
            width={B.w - 10}
            height={B.h - 10}
            rx="9"
            fill="#bae6fd"
          />
          <line
            x1={B.x + 5}
            y1={B.y + 6}
            x2={B.x + B.w - 5}
            y2={B.y + 6}
            stroke="#38bdf8"
            strokeWidth="2.5"
          />
          {Array.from({ length: n }, (_, i) => (
            <text
              key={i}
              x={B.x + 8 + (rongBe * (i + 0.5)) / n}
              y={B.y + 40}
              textAnchor="middle"
              fontSize={coCa}
            >
              {CA}
            </text>
          ))}
          <rect
            x={K.x}
            y={K.y}
            width={K.w}
            height={K.h}
            rx="12"
            fill="#fef3c7"
            stroke="#fcd34d"
            strokeWidth="2.5"
          />
          {Array.from({ length: n }, (_, i) => {
            const x = x0 + i * (canh + khe);
            const c = CUBE[i % 5];
            return (
              <g key={i}>
                <polygon
                  points={`${x},${y0 + mat} ${x + lech},${y0} ${x + canh + lech},${y0} ${x + canh},${y0 + mat}`}
                  fill={c}
                  stroke="#475569"
                  strokeWidth="1.3"
                />
                <rect
                  x={x}
                  y={y0 + mat}
                  width={canh}
                  height={day}
                  fill={c}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
          {hienSo && (
            <>
              <text
                x="140"
                y="114"
                textAnchor="end"
                fontSize="44"
                fontWeight="900"
                fill={P.ink}
              >
                {n}
              </text>
              <text
                x="152"
                y="114"
                textAnchor="start"
                fontSize="24"
                fontWeight="700"
                fill={P.soft}
              >
                {word}
              </text>
            </>
          )}
        </g>
      );
    };

    /** Dãy emoji xếp thành hàng — MỖI HÀNG tự canh giữa (`itemsGrid` chỉ canh trái). */
    const hangEmoji = (n, ch, { s, gapX, per, yTop, gapY }) => {
      const ds = [];
      for (let i = 0; i < n; i += per) {
        const trong = Math.min(per, n - i);
        const x0 = 150 - ((trong - 1) * gapX) / 2;
        for (let j = 0; j < trong; j += 1) {
          ds.push(
            <text
              key={`${i}-${j}`}
              x={x0 + j * gapX}
              y={yTop + (i / per) * gapY}
              textAnchor="middle"
              fontSize={s}
            >
              {ch}
            </text>,
          );
        }
      }
      return ds;
    };

    /** HÀNG VẼ TO cho nhóm con vật / hoa (6 → 10) khi slide chỉ dạy MỘT số. */
    const rowBigItems = (n, ch, word, hienSo) => {
      const haiHang = n > 5;
      return (
        <g>
          <rect
            x="4"
            y="6"
            width="292"
            height="62"
            rx="12"
            fill="#f8fafc"
            stroke={P.grid}
            strokeWidth="2"
          />
          {hangEmoji(
            n,
            ch,
            haiHang
              ? { s: 22, gapX: 50, per: Math.ceil(n / 2), yTop: 30, gapY: 28 }
              : { s: 34, gapX: 50, per: n, yTop: 50, gapY: 0 },
          )}
          {hienSo && (
            <>
              <text
                x="140"
                y="114"
                textAnchor="end"
                fontSize="44"
                fontWeight="900"
                fill={P.ink}
              >
                {n}
              </text>
              <text
                x="152"
                y="114"
                textAnchor="start"
                fontSize="24"
                fontWeight="700"
                fill={P.soft}
              >
                {word}
              </text>
            </>
          )}
        </g>
      );
    };

    const rowH = kind === "tank" ? 34 : 44;
    const H = rowsSpec.length * rowH + 12;
    // Chú thích SUY TỪ SỐ ĐANG VẼ — không viết cứng, vì cùng một hình được dùng cho
    // nhiều bài (từng bị: bài “Các số 0,1,2,3” mà chú thích ghi “0, 1, 2, 3, 4, 5”).
    const soDaVe = [...new Set(rowsSpec.map((r) => r.n))].sort((a, b) => a - b);

    // MỘT SỐ TRÊN MỘT SLIDE → hàng vẽ TO (không dùng bảng 6 hàng nhỏ).
    if (rowsSpec.length === 1 && (kind === "tank" || kind === "living")) {
      const mot = rowsSpec[0];
      const nhan = showDigits
        ? `Số ${mot.n} — ${mot.word}`
        : "Bé đếm rồi chọn số";
      return box(
        kind === "tank"
          ? rowBig(mot.n, mot.word, showDigits)
          : rowBigItems(mot.n, mot.ch, mot.word, showDigits),
        300,
        128,
        nhan,
      );
    }

    return box(
      <>
        {rowsSpec.map((r, i) => {
          const y = 6 + i * rowH;
          return (
            <g key={r.n} transform={`translate(0,${y})`}>
              {kind === "tank" ? (
                <>
                  {tank(r.n)}
                  {tray(r.n)}
                  {showDigits && (
                    <rect
                      x="258"
                      y="1"
                      width="28"
                      height="26"
                      rx="8"
                      fill="#e0f2fe"
                    />
                  )}
                </>
              ) : (
                itemsGrid(r.n, 26, 20, r.ch, {
                  per: 5,
                  gapX: 34,
                  gapY: 22,
                  s: 17,
                })
              )}
              {showDigits && (
                <>
                  <text
                    x={kind === "tank" ? 272 : 248}
                    y="20"
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill={P.ink}
                  >
                    {r.n}
                  </text>
                  <text
                    x={kind === "tank" ? 288 : 286}
                    y="19"
                    textAnchor={kind === "tank" ? "start" : "middle"}
                    fontSize="14"
                    fontWeight="700"
                    fill={P.soft}
                  >
                    {r.word}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </>,
      360,
      H,
      `Các số ${soDaVe.join(", ")}`,
      20,
    );
  }

  /* ── 3. Nhiều NHÓM để so sánh / ghép đôi ───────────── */
  if (mode === "manyGroups") {
    const gs = groups.map((g) => ({
      ch: g.emoji || "🐟",
      n: Math.max(0, num(g.n, 0)),
      label: g.label || "",
    }));
    const rowH = 42;
    // +16: Lề dưới cho khung chứa nhóm đồ vật
    const H = gs.length * rowH + 16;
    return box(
      <>
        {gs.map((g, i) => {
          const y = 8 + i * rowH;
          const n = Math.min(g.n, 10);
          return (
            <g key={i}>
              <rect
                x="10"
                y={y}
                width="340"
                height={rowH - 6}
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              {itemsGrid(n, 34, y + 27, g.ch, {
                per: 10,
                gapX: 32,
                gapY: 0,
                s: 19,
              })}
              {g.label !== "" && (
                <text
                  x="326"
                  y={y + 27}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.blue}
                >
                  {g.label}
                </text>
              )}
            </g>
          );
        })}
        {paired &&
          gs.length === 2 &&
          Array.from({ length: Math.min(gs[0].n, gs[1].n) }, (_, i) => (
            <line
              key={"p" + i}
              x1={34 + i * 32}
              y1={8 + 30}
              x2={34 + i * 32}
              y2={8 + rowH + 6}
              stroke={P.rose}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
      </>,
      360,
      H,
      "Các nhóm đồ vật để so sánh",
    );
  }

  /* ── 4. CHO THÊM để đạt số lượng cho trước ────────── */
  if (mode === "addToReach") {
    const haveN = Math.max(0, num(have, 0));
    const aN = Math.max(0, num(a, 0));
    const bN = Math.max(0, num(b, 0));
    /** Điểm bắt đầu để một lưới `n` món **canh giữa** quanh trục `cx`. */
    const tam = (n2, cx, per2 = 5, gapX = 52) =>
      cx - ((Math.min(n2, per2) - 1) * gapX) / 2;
    return box(
      <>
        <rect
          x="10"
          y="8"
          width="340"
          height="44"
          rx="10"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="2"
        />
        <text
          x="180"
          y="37"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#92400e"
        >
          {`Cho thêm để có ${num(target, 0)}`}
        </text>
        <rect
          x="10"
          y="60"
          width="340"
          height="92"
          rx="12"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {itemsGrid(haveN, tam(haveN, 180), 106, emoji, {
          per: 5,
          gapX: 52,
          gapY: 34,
          s: 24,
          prefix: "h",
        })}
        {/* HAI LỰA CHỌN A · B — để XUỐNG DƯỚI cho thoáng (người dùng báo 2026-09-24),
            mỗi hộp rộng 164 đơn vị, món canh giữa hộp. */}
        {[
          { chu: "A", n: aN, x: 14, mau: P.green, nen: P.greenSoft, p: "a" },
          { chu: "B", n: bN, x: 186, mau: P.violet, nen: "#ede9fe", p: "b" },
        ].map((o) => (
          <g key={o.chu}>
            <text
              x={o.x + 82}
              y="172"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill={o.mau}
            >
              {`${o.chu} — thêm ${o.n}`}
            </text>
            <rect
              x={o.x}
              y="180"
              width="164"
              height="52"
              rx="10"
              fill={o.nen}
              stroke={o.mau}
              strokeWidth="2"
            />
            {itemsGrid(o.n, tam(o.n, o.x + 82, 4, 38), 212, emoji, {
              per: 4,
              gapX: 38,
              gapY: 24,
              s: 22,
              prefix: o.p,
            })}
          </g>
        ))}
        <text
          x="180"
          y="248"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          {ask}
        </text>
      </>,
      360,
      258,
      "Chọn A hay B để cho thêm cho đủ",
    );
  }

  /* ── 5. ĐẾM THEO ĐIỀU KIỆN ───────────────────────────────── */
  // type="colored": cà rốt đã tô màu   |  type="labeled": con vật ghi số
  // type="legs"  : con vật có 6 chân
  if (mode === "countFiltered") {
    if (kind === "colored") {
      const n = Math.max(1, num(cols, 6));
      const set = Array.isArray(colored) ? colored.map((x) => num(x, -1)) : [];
      return box(
        <>
          {Array.from({ length: n }, (_, i) => (
            <Item
              key={i}
              x={30 + i * (300 / Math.max(1, n - 1))}
              y="58"
              ch="🥕"
              s="30"
              opacity={set.includes(i) ? 1 : 0.28}
            />
          ))}
          <text
            x="180"
            y="96"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé đếm xem có bao nhiêu củ đã tô màu
          </text>
        </>,
        360,
        108,
        "Cà rốt đã tô màu và chưa tô màu",
      );
    }
    if (kind === "labeled") {
      const ls = Array.isArray(labels) ? labels.map((x) => num(x, 0)) : [];
      return box(
        <>
          {ls.map((v, i) => {
            const x = 46 + (i % 5) * 68;
            const y = i < 5 ? 42 : 106;
            return (
              <g key={i}>
                <Item x={x} y={y} ch="🐔" s="26" />
                <Tile
                  x={x - 15}
                  y={y + 8}
                  w={30}
                  h={26}
                  text={String(v)}
                  fs={14}
                  stroke={P.grid}
                />
              </g>
            );
          })}
          <text
            x="180"
            y="152"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé đếm xem có bao nhiêu con ghi số 2
          </text>
        </>,
        360,
        164,
        "Đàn gà có ghi số ở mỗi con",
      );
    }
    // kind === "legs": Hình vẽ côn trùng và nhện thân thiện, chân cong có khớp rõ ràng để bé đếm
    const ks = Array.isArray(kinds) && kinds.length > 0
      ? kinds
      : ["ladybug", "beetle", "spider", "ant", "bee"];
    return box(
      <>
        {ks.map((k, i) => {
          const cx = 38 + i * 71;
          const cy = 46;
          return (
            <g key={i}>
              {/* 1. BỌ RÙA ĐỎ (ladybug): 6 chân cong gập */}
              {k === "ladybug" && (
                <g>
                  {/* 6 chân có khớp rõ: 3 trái, 3 phải */}
                  <path d={`M ${cx - 10} ${cy - 6} Q ${cx - 20} ${cy - 16} ${cx - 24} ${cy - 11}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 13} ${cy + 1} Q ${cx - 24} ${cy} ${cx - 27} ${cy + 8}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 10} ${cy + 8} Q ${cx - 20} ${cy + 16} ${cx - 23} ${cy + 22}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 10} ${cy - 6} Q ${cx + 20} ${cy - 16} ${cx + 24} ${cy - 11}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 13} ${cy + 1} Q ${cx + 24} ${cy} ${cx + 27} ${cy + 8}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 10} ${cy + 8} Q ${cx + 20} ${cy + 16} ${cx + 23} ${cy + 22}`} fill="none" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Thân bọ rùa tròn đỏ tươi */}
                  <ellipse cx={cx} cy={cy + 2} rx="15" ry="16" fill="#ef4444" stroke="#991b1b" strokeWidth="1.6" />
                  <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 18} stroke="#1e293b" strokeWidth="1.6" />
                  <circle cx={cx - 7} cy={cy - 6} r="2.2" fill="#1e293b" />
                  <circle cx={cx - 8} cy={cy + 4} r="2.2" fill="#1e293b" />
                  <circle cx={cx - 5} cy={cy + 12} r="1.8" fill="#1e293b" />
                  <circle cx={cx + 7} cy={cy - 6} r="2.2" fill="#1e293b" />
                  <circle cx={cx + 8} cy={cy + 4} r="2.2" fill="#1e293b" />
                  <circle cx={cx + 5} cy={cy + 12} r="1.8" fill="#1e293b" />

                  {/* Đầu bọ rùa & mắt hoạt hình */}
                  <circle cx={cx} cy={cy - 14} r="7" fill="#1e293b" />
                  <circle cx={cx - 3} cy={cy - 15} r="2.2" fill="#ffffff" />
                  <circle cx={cx - 3} cy={cy - 15} r="1.1" fill="#0f172a" />
                  <circle cx={cx + 3} cy={cy - 15} r="2.2" fill="#ffffff" />
                  <circle cx={cx + 3} cy={cy - 15} r="1.1" fill="#0f172a" />
                  <path d={`M ${cx - 3} ${cy - 20} Q ${cx - 7} ${cy - 26} ${cx - 9} ${cy - 24}`} fill="none" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx={cx - 9} cy={cy - 24} r="1.2" fill="#ef4444" />
                  <path d={`M ${cx + 3} ${cy - 20} Q ${cx + 7} ${cy - 26} ${cx + 9} ${cy - 24}`} fill="none" stroke="#1e293b" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx={cx + 9} cy={cy - 24} r="1.2" fill="#ef4444" />
                </g>
              )}

              {/* 2. CHÚ NHỆN TÍM HOẠT HÌNH (spider): 8 CHÂN (4 trái, 4 phải - cong vòm xòe rộng) */}
              {k === "spider" && (
                <g>
                  {/* 8 chân có khớp cong đối xứng: 4 trái, 4 phải */}
                  <path d={`M ${cx - 7} ${cy - 11} Q ${cx - 17} ${cy - 23} ${cx - 24} ${cy - 17}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 8} ${cy - 4} Q ${cx - 22} ${cy - 11} ${cx - 27} ${cy - 3}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 8} ${cy + 4} Q ${cx - 22} ${cy + 10} ${cx - 26} ${cy + 17}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 7} ${cy + 11} Q ${cx - 17} ${cy + 22} ${cx - 20} ${cy + 27}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />

                  <path d={`M ${cx + 7} ${cy - 11} Q ${cx + 17} ${cy - 23} ${cx + 24} ${cy - 17}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 8} ${cy - 4} Q ${cx + 22} ${cy - 11} ${cx + 27} ${cy - 3}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 8} ${cy + 4} Q ${cx + 22} ${cy + 10} ${cx + 26} ${cy + 17}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 7} ${cy + 11} Q ${cx + 17} ${cy + 22} ${cx + 20} ${cy + 27}`} fill="none" stroke="#4338ca" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Bụng tròn to màu tím */}
                  <circle cx={cx} cy={cy + 6} r="13" fill="#6366f1" stroke="#4338ca" strokeWidth="1.6" />
                  <circle cx={cx} cy={cy + 6} r="4" fill="#a5b4fc" opacity="0.8" />

                  {/* Đầu nhện */}
                  <circle cx={cx} cy={cy - 9} r="8.5" fill="#4f46e5" stroke="#4338ca" strokeWidth="1.5" />
                  {/* Mắt to tròn thân thiện */}
                  <circle cx={cx - 3.5} cy={cy - 9} r="3" fill="#ffffff" />
                  <circle cx={cx - 3.5} cy={cy - 9} r="1.6" fill="#1e1b4b" />
                  <circle cx={cx - 2.5} cy={cy - 10} r="0.8" fill="#ffffff" />
                  <circle cx={cx + 3.5} cy={cy - 9} r="3" fill="#ffffff" />
                  <circle cx={cx + 3.5} cy={cy - 9} r="1.6" fill="#1e1b4b" />
                  <circle cx={cx + 4.5} cy={cy - 10} r="0.8" fill="#ffffff" />
                  {/* Má hồng */}
                  <ellipse cx={cx - 5.5} cy={cy - 5.5} rx="1.8" ry="1.2" fill="#f43f5e" opacity="0.6" />
                  <ellipse cx={cx + 5.5} cy={cy - 5.5} rx="1.8" ry="1.2" fill="#f43f5e" opacity="0.6" />
                </g>
              )}

              {/* 3. CHÚ KIẾN CAM (ant): 6 CHÂN */}
              {k === "ant" && (
                <g>
                  {/* 6 chân kiến gập khớp rõ ràng */}
                  <path d={`M ${cx - 6} ${cy - 4} Q ${cx - 18} ${cy - 15} ${cx - 24} ${cy - 10}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 7} ${cy - 1} Q ${cx - 22} ${cy} ${cx - 25} ${cy + 8}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 6} ${cy + 4} Q ${cx - 19} ${cy + 16} ${cx - 22} ${cy + 24}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 6} ${cy - 4} Q ${cx + 18} ${cy - 15} ${cx + 24} ${cy - 10}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 7} ${cy - 1} Q ${cx + 22} ${cy} ${cx + 25} ${cy + 8}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 6} ${cy + 4} Q ${cx + 19} ${cy + 16} ${cx + 22} ${cy + 24}`} fill="none" stroke="#9a3412" strokeWidth="2.4" strokeLinecap="round" />

                  {/* 3 đốt thân kiến */}
                  <ellipse cx={cx} cy={cy + 8} rx="9.5" ry="11" fill="#ea580c" stroke="#9a3412" strokeWidth="1.4" />
                  <ellipse cx={cx} cy={cy - 2} rx="6" ry="5" fill="#f97316" stroke="#9a3412" strokeWidth="1.2" />
                  <circle cx={cx} cy={cy - 12} r="6.5" fill="#ea580c" stroke="#9a3412" strokeWidth="1.4" />
                  <circle cx={cx - 2.8} cy={cy - 13} r="2" fill="#ffffff" />
                  <circle cx={cx - 2.8} cy={cy - 13} r="1" fill="#0f172a" />
                  <circle cx={cx + 2.8} cy={cy - 13} r="2" fill="#ffffff" />
                  <circle cx={cx + 2.8} cy={cy - 13} r="1" fill="#0f172a" />
                  <path d={`M ${cx - 2} ${cy - 18} L ${cx - 6} ${cy - 24} L ${cx - 10} ${cy - 23}`} fill="none" stroke="#9a3412" strokeWidth="1.3" strokeLinecap="round" />
                  <path d={`M ${cx + 2} ${cy - 18} L ${cx + 6} ${cy - 24} L ${cx + 10} ${cy - 23}`} fill="none" stroke="#9a3412" strokeWidth="1.3" strokeLinecap="round" />
                </g>
              )}

              {/* 4. CHÚ ONG VÀNG (bee): 6 CHÂN */}
              {k === "bee" && (
                <g>
                  {/* 6 chân ong có khớp cong */}
                  <path d={`M ${cx - 8} ${cy - 4} Q ${cx - 19} ${cy - 14} ${cx - 24} ${cy - 9}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 11} ${cy + 1} Q ${cx - 22} ${cy + 2} ${cx - 26} ${cy + 9}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 8} ${cy + 8} Q ${cx - 18} ${cy + 17} ${cx - 22} ${cy + 24}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 8} ${cy - 4} Q ${cx + 19} ${cy - 14} ${cx + 24} ${cy - 9}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 11} ${cy + 1} Q ${cx + 22} ${cy + 2} ${cx + 27} ${cy + 9}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 8} ${cy + 8} Q ${cx + 19} ${cy + 17} ${cx + 22} ${cy + 24}`} fill="none" stroke="#854d0e" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Cánh ong trong suốt */}
                  <ellipse cx={cx - 12} cy={cy - 5} rx="9" ry="5.5" transform={`rotate(-25 ${cx - 12} ${cy - 5})`} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" opacity="0.85" />
                  <ellipse cx={cx + 12} cy={cy - 5} rx="9" ry="5.5" transform={`rotate(25 ${cx + 12} ${cy - 5})`} fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" opacity="0.85" />

                  {/* Thân ong vàng sọc đen */}
                  <ellipse cx={cx} cy={cy + 2} rx="12" ry="15" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
                  <path d={`M ${cx - 11} ${cy - 3} Q ${cx} ${cy - 1} ${cx + 11} ${cy - 3}`} fill="none" stroke="#1e293b" strokeWidth="3" />
                  <path d={`M ${cx - 11} ${cy + 5} Q ${cx} ${cy + 7} ${cx + 11} ${cy + 5}`} fill="none" stroke="#1e293b" strokeWidth="3" />
                  <polygon points={`${cx - 2},${cy + 17} ${cx + 2},${cy + 17} ${cx},${cy + 20}`} fill="#1e293b" />

                  {/* Đầu & râu ong */}
                  <circle cx={cx} cy={cy - 13} r="6.5" fill="#854d0e" />
                  <circle cx={cx - 2.8} cy={cy - 14} r="2" fill="#ffffff" />
                  <circle cx={cx - 2.8} cy={cy - 14} r="1" fill="#0f172a" />
                  <circle cx={cx + 2.8} cy={cy - 14} r="2" fill="#ffffff" />
                  <circle cx={cx + 2.8} cy={cy - 14} r="1" fill="#0f172a" />
                  <path d={`M ${cx - 2} ${cy - 19} Q ${cx - 6} ${cy - 25} ${cx - 9} ${cy - 24}`} fill="none" stroke="#854d0e" strokeWidth="1.3" strokeLinecap="round" />
                  <path d={`M ${cx + 2} ${cy - 19} Q ${cx + 6} ${cy - 25} ${cx + 9} ${cy - 24}`} fill="none" stroke="#854d0e" strokeWidth="1.3" strokeLinecap="round" />
                </g>
              )}

              {/* 5. BỌ CÁNH CỨNG XANH (beetle hoặc mặc định): 6 CHÂN */}
              {k !== "ladybug" && k !== "spider" && k !== "ant" && k !== "bee" && (
                <g>
                  {/* 6 chân có khớp rõ ràng */}
                  <path d={`M ${cx - 9} ${cy - 7} Q ${cx - 20} ${cy - 17} ${cx - 25} ${cy - 12}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 12} ${cy + 1} Q ${cx - 23} ${cy + 1} ${cx - 26} ${cy + 8}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx - 9} ${cy + 9} Q ${cx - 19} ${cy + 18} ${cx - 22} ${cy + 24}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 9} ${cy - 7} Q ${cx + 20} ${cy - 17} ${cx + 25} ${cy - 12}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 12} ${cy + 1} Q ${cx + 23} ${cy + 1} ${cx + 26} ${cy + 8}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${cx + 9} ${cy + 9} Q ${cx + 19} ${cy + 18} ${cx + 22} ${cy + 24}`} fill="none" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />

                  {/* Thân bọ cánh cứng màu xanh ngọc óng ánh */}
                  <ellipse cx={cx} cy={cy + 2} rx="14" ry="16" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
                  <rect x={cx - 10} y={cy - 12} width="20" height="6.5" rx="3" fill="#059669" stroke="#047857" strokeWidth="1.2" />
                  <line x1={cx} y1={cy - 5} x2={cx} y2={cy + 18} stroke="#047857" strokeWidth="1.5" />
                  <path d={`M ${cx - 8} ${cy - 1} Q ${cx - 5} ${cy + 7} ${cx - 6} ${cy + 12}`} fill="none" stroke="#6ee7b7" strokeWidth="1.8" strokeLinecap="round" />

                  {/* Đầu & râu */}
                  <circle cx={cx} cy={cy - 16} r="6.5" fill="#065f46" />
                  <circle cx={cx - 2.8} cy={cy - 17} r="2" fill="#ffffff" />
                  <circle cx={cx - 2.8} cy={cy - 17} r="1" fill="#0f172a" />
                  <circle cx={cx + 2.8} cy={cy - 17} r="2" fill="#ffffff" />
                  <circle cx={cx + 2.8} cy={cy - 17} r="1" fill="#0f172a" />
                  <path d={`M ${cx - 2.5} ${cy - 22} L ${cx - 8} ${cy - 28}`} stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
                  <path d={`M ${cx + 2.5} ${cy - 22} L ${cx + 8} ${cy - 28}`} stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              )}

              {/* Huy hiệu chữ cái A, B, C, D, E */}
              <circle
                cx={cx}
                cy="92"
                r="11"
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="1.8"
              />
              <text
                x={cx}
                y="96.5"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="900"
                fill="#1d4ed8"
              >
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          );
        })}
        <text
          x="180"
          y="122"
          textAnchor="middle"
          fontSize="13.5"
          fontWeight="700"
          fill="#047857"
        >
          Bé đếm số chân của từng con vật nhé! 🔍
        </text>
      </>,
      360,
      138,
      "Các con vật để bé đếm chân",
    );
  }

  /* ── 6. ĐẾM TRONG TRANH CẢNH ─────────────────────── */
  if (mode === "sceneCount") {
    return (
      <SceneCountCard
        kind={kind}
        legend={Array.isArray(legend) ? legend : []}
        answers={Array.isArray(answers) ? answers : null}
        options={Array.isArray(options) ? options : []}
        note={note}
        tinh={!interactive}
      />
    );
  }

  /* ── 7. DÃY SỐ / TOA TÀU có ô trống ──────────────────── */

  /**
   * Ô TRỐNG của dãy số — bộ vẽ nhận cả ba cách viết (`null`, `"?"`, chuỗi rỗng).
   * ⚠️ Bản đầu chỉ nhận `null` và `"?"`, nên dữ liệu ghi `""` sẽ vẽ ra **ô trống mà không có
   * dấu hỏi** ⇒ trẻ không biết đó là chỗ phải điền.
   */
  const laOTrong = (v) => v === null || v === "?" || v === "";

  /**
   * Toạ độ ô của DÃY DỌC (`kind = "ribbon"`) — MỘT NGUỒN DUY NHẤT cho cả bản tĩnh lẫn bản bé
   * điền được. (Trước đây công thức nằm ngay trong JSX; viết bản tương tác mà chép lại công
   * thức là hai bản sẽ lệch nhau ở lần sửa sau.)
   *
   * 🔴 TỰ XUỐNG DÒNG: dãy dài không vừa một hàng — 20 ô × 32 đơn vị
   * = 640 > 360 nên `startX` ra **số âm** và hình vẽ tràn ra ngoài khung. Nay chia thành nhiều
   * hàng, mỗi hàng tối đa `MAX_O` ô và **mỗi hàng tự canh giữa** (hàng cuối ngắn vẫn cân).
   */
  const MAX_O = 11;
  function oRibbon(ns) {
    const hang = [];
    for (let i = 0; i < ns.length; i += MAX_O) {
      const phan = ns.slice(i, i + MAX_O);
      const startX = 180 - ((phan.length - 1) * 32 + 28) / 2;
      const y = 16 + hang.length * 44;
      hang.push(
        phan.map((v, j) => ({ v, x: startX + j * 32, y, w: 28, h: 34 })),
      );
    }
    return hang;
  }

  /** Toạ độ ĐẦU MÁY + từng TOA (`kind = "wagons"`). */
  function oWagons(rs) {
    return rs.map((r, i) => {
      const toa = Array.isArray(r) ? r : [];
      const y = 8 + i * 40;
      /** Canh giữa CẢ ĐOÀN theo số toa thật (bản cũ dồn đoàn 2 toa về trái — người dùng báo). */
      const x0 = (360 - (94 + Math.max(0, toa.length - 1) * 60)) / 2;
      return {
        i,
        x0,
        y,
        cells: toa.map((v, j) => ({
          v,
          x: x0 + 42 + j * 60,
          y,
          w: 52,
          h: 30,
        })),
      };
    });
  }

  /**
   * ĐẦU MÁY TÀU — phải RA DÁNG ĐẦU MÁY: ống khói + khói, ca-bin có cửa sổ, đèn, bánh xe.
   * Bản cũ chỉ là 1 hình chữ nhật xám + 2 chấm (người dùng đã trả lại kiểu vẽ đó).
   */
  function DauMay({ x0, y }) {
    return (
      <g>
        <rect
          x={x0 + 20}
          y={y}
          width="14"
          height="30"
          rx="4"
          fill="#3b82f6"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <rect
          x={x0 + 23}
          y={y + 4}
          width="8"
          height="9"
          rx="1.5"
          fill="#dbeafe"
          stroke="#475569"
          strokeWidth="1"
        />
        <rect
          x={x0}
          y={y + 12}
          width="34"
          height="18"
          rx="4"
          fill="#ef4444"
          stroke="#475569"
          strokeWidth="1.5"
        />
        <rect x={x0 + 5} y={y + 4} width="7" height="9" rx="2" fill="#334155" />
        <circle cx={x0 + 8.5} cy={y + 2} r="3.4" fill="#e2e8f0" />
        <circle
          cx={x0 + 4}
          cy={y + 20}
          r="2.8"
          fill="#fde68a"
          stroke="#475569"
          strokeWidth="1"
        />
        <line
          x1={x0 + 34}
          y1={y + 26}
          x2={x0 + 42}
          y2={y + 26}
          stroke="#475569"
          strokeWidth="2.4"
        />
        <circle
          cx={x0 + 11}
          cy={y + 31}
          r="4.2"
          fill="#334155"
          stroke="#e2e8f0"
          strokeWidth="1.2"
        />
        <circle
          cx={x0 + 27}
          cy={y + 31}
          r="4.2"
          fill="#334155"
          stroke="#e2e8f0"
          strokeWidth="1.2"
        />
      </g>
    );
  }

  /**
   * DÃY SỐ / TOA TÀU — bản TĨNH và bản ĐIỀN ĐƯỢC dùng CHUNG một hàm vẽ.
   *
   * 🔴 VÌ SAO (yêu cầu người dùng 2026-09-25): “mọi ô trống phải điền được”. Trước đây dãy số
   * có ô `?` chỉ để NHÌN (chữ ghi “bé điền số còn thiếu” mà không có gì bấm được) — 2 slide
   * Lớp 1 (`g1-c1-l4`, `g1-c1-l11`) rơi đúng vào ca này và **không cổng nào bắt được**.
   *
   * `tinh` = true (hoặc thiếu `answers`) ⇒ giữ nguyên bản tĩnh: dùng cho slide CÂU HỎI, nơi bé
   * trả lời bằng các lựa chọn của câu hỏi chứ không bấm vào hình.
   */
  function TrainFill({
    kind = "wagons",
    numbers = [],
    rows = [],
    answers = [],
    options = [],
    note = "",
    tinh = false,
  }) {
    const laRibbon = kind === "ribbon";
    const hangRibbon = laRibbon ? oRibbon(numbers) : [];
    const hang = laRibbon ? [] : oWagons(rows);
    const dsO = (
      laRibbon ? hangRibbon.flat() : hang.flatMap((r) => r.cells)
    ).filter((o) => laOTrong(o.v));
    const choBam = !tinh && dsO.length > 0 && answers.length === dsO.length;
    const fill = useFillSlots(choBam ? answers : []);
    /** Ô nào là ô trống thứ mấy, theo thứ tự đọc (trái → phải, trên → dưới). */
    const viTri = new Map(dsO.map((o, i) => [o, i]));

    /**
     * Nút chọn: dữ liệu cho `options` thì dùng; không thì lấy mỗi đáp án cùng hai số kề —
     * đủ để bé phải đọc dãy số mới chọn đúng, mà thanh nút không dài vô tận. Bé bấm SAI thì
     * ô đỏ và bé thử lại (xem `interactiveFill.jsx`).
     */
    const dsChon = options.length
      ? options
      : [
          ...new Set(
            answers.flatMap((a) => [Number(a) - 1, Number(a), Number(a) + 1]),
          ),
        ]
          .filter((n) => Number.isFinite(n) && n >= 0)
          .sort((a, b) => a - b);

    const veO = (o, key) => {
      const slot = viTri.get(o);
      const look = choBam
        ? slotLook(fill, slot)
        : { fill: "#f8fafc", stroke: P.blue, color: P.blue, dash: true };
      const picked = choBam ? fill.picked[slot] : null;
      return (
        <g
          key={key}
          onClick={() => choBam && fill.setActive(slot)}
          style={{ cursor: choBam ? "pointer" : "default" }}
        >
          <Tile
            x={o.x}
            y={o.y}
            w={o.w}
            h={o.h}
            text={
              picked === null || picked === undefined ? "?" : String(picked)
            }
            fs={laRibbon ? 16 : 17}
            fill={look.fill}
            stroke={look.stroke}
            color={look.color}
            dash={look.dash}
          />
        </g>
      );
    };

    /**
     * Ô ĐÃ IN SẴN SỐ (không phải chỗ bé điền).
     * ⚠️ Hai kiểu vẽ là CỐ Ý, giữ đúng dáng cũ của từng kiểu: dãy dọc dùng `Tile` (ô bo tròn),
     * còn TOA TÀU dùng `Rect2` (thân toa viền đậm) — đổi hết sang `Tile` là mất dáng đoàn tàu.
     * Ô TRỐNG thì luôn dùng `Tile` vì cần màu phản hồi (tím đang chọn / xanh đúng / đỏ sai).
     */
    const veTinh = (o, key) => {
      if (laRibbon)
        return (
          <Tile
            key={key}
            x={o.x}
            y={o.y}
            w={o.w}
            h={o.h}
            text={String(num(o.v, 0))}
            fs={16}
            fill="#ffffff"
            stroke={P.grid}
            color={P.ink}
            dash={false}
          />
        );
      return (
        <g key={key}>
          <Rect2 x={o.x} y={o.y} w={o.w} h={o.h} />
          <text
            x={o.x + o.w / 2}
            y={o.y + 22}
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill={P.ink}
          >
            {String(num(o.v, 0))}
          </text>
        </g>
      );
    };

    const H = laRibbon ? hangRibbon.length * 44 + 26 : hang.length * 40 + 14;

    return (
      <div style={card}>
        <svg
          viewBox={`0 0 360 ${H}`}
          {...svgFit(360)}
          role="img"
          aria-label={
            laRibbon ? "Dãy số có ô trống" : "Các đoàn tàu có ô số còn thiếu"
          }
        >
          {laRibbon &&
            hangRibbon.map((r, i) => (
              <g key={i}>
                {r.map((o, j) =>
                  laOTrong(o.v) ? veO(o, `${i}-${j}`) : veTinh(o, `${i}-${j}`),
                )}
              </g>
            ))}
          {!laRibbon &&
            hang.map((r) => (
              <g key={r.i}>
                <DauMay x0={r.x0} y={r.y} />
                {r.cells.map((o, j) =>
                  laOTrong(o.v)
                    ? veO(o, `${r.i}-${j}`)
                    : veTinh(o, `${r.i}-${j}`),
                )}
              </g>
            ))}
          <text
            x="180"
            y={laRibbon ? H - 4 : H - 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé điền số còn thiếu vào ô có dấu ?
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
        {choBam && (
          <FillBar
            fill={fill}
            options={dsChon}
            title="Bé chọn số điền vào ô ?"
            hint="Ô màu đỏ chưa đúng — bé đọc lại cả dãy số rồi chọn lại nhé."
          />
        )}
      </div>
    );
  }

  if (mode === "numberTrain") {
    return (
      <TrainFill
        kind={kind}
        numbers={Array.isArray(numbers) ? numbers : []}
        rows={Array.isArray(rows) ? rows : []}
        answers={Array.isArray(answers) ? answers : []}
        options={Array.isArray(options) ? options : []}
        note={note}
        /**
         * Cho bấm CHỈ khi slide cho bấm VÀ dữ liệu có đủ đáp án cho từng ô trống; thiếu một
         * trong hai thì giữ bản tĩnh (không bao giờ vẽ ô trống mà bấm vào không được).
         */
        tinh={
          !interactive ||
          !Array.isArray(answers) ||
          answers.length !==
            (kind === "ribbon"
              ? Array.isArray(numbers)
                ? numbers
                : []
              : (Array.isArray(rows) ? rows : []).flatMap((r) =>
                  Array.isArray(r) ? r : [],
                )
            ).filter(laOTrong).length
        }
      />
    );
  }
  /* ── 8. TÁCH – GỘP: sơ đồ nhánh và bảng ──────────── */
  if (mode === "numberBond") {
    if (kind === "table") {
      const ps = Array.isArray(parts) ? parts : [];
      const H = ps.length * 40 + 16;
      return box(
        <>
          {ps.map((p, i) => {
            const y = 10 + i * 40;
            return (
              <g key={i}>
                <Tile
                  x={16}
                  y={y}
                  w={54}
                  h={34}
                  text={String(num(total, 0))}
                  fs={18}
                  fill={P.amberSoft}
                  stroke={P.amber}
                  color="#92400e"
                />
                <text
                  x={88}
                  y={y + 24}
                  fontSize="14"
                  fontWeight="700"
                  fill={P.soft}
                >
                  gồm
                </text>
                <text
                  x={128}
                  y={y + 24}
                  fontSize="17"
                  fontWeight="900"
                  fill={P.ink}
                >
                  {String(num(p, 0))}
                </text>
                <text
                  x={152}
                  y={y + 24}
                  fontSize="16"
                  fontWeight="800"
                  fill={P.soft}
                >
                  và
                </text>
                <Tile
                  x={176}
                  y={y}
                  w={54}
                  h={34}
                  text="?"
                  fs={18}
                  stroke={P.blue}
                  color={P.blue}
                  dash
                />
                <text
                  x="248"
                  y={y + 24}
                  fontSize="14"
                  fontWeight="700"
                  fill={P.soft}
                >
                  {`(${num(total, 0)} gồm ${num(p, 0)} và ?)`}
                </text>
              </g>
            );
          })}
        </>,
        360,
        H,
        "Bảng tách số",
      );
    }
    // kind === "bond": vòng tròn tổng + hai nhánh
    const t = num(total, 0);
    const blank = (v) => v === undefined || v === null || v === "";
    const l = blank(left) ? "?" : String(num(left, 0));
    const r2 = blank(right) ? "?" : String(num(right, 0));
    return box(
      <>
        <circle
          cx="180"
          cy="46"
          r="34"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="2.5"
        />
        <text
          x="180"
          y="58"
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fill={P.blue}
        >
          {String(t)}
        </text>
        <line
          x1="152"
          y1="72"
          x2="98"
          y2="106"
          stroke={P.soft}
          strokeWidth="2.5"
        />
        <line
          x1="208"
          y1="72"
          x2="262"
          y2="106"
          stroke={P.soft}
          strokeWidth="2.5"
        />
        <Tile
          x={58}
          y={106}
          w={80}
          h={44}
          text={l}
          fs={22}
          stroke={P.amber}
          color="#92400e"
          fill={P.amberSoft}
          dash={l === "?"}
        />
        <Tile
          x={222}
          y={106}
          w={80}
          h={44}
          text={r2}
          fs={22}
          stroke={P.amber}
          color="#92400e"
          fill={P.amberSoft}
          dash={r2 === "?"}
        />
        <text
          x="180"
          y="172"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          {dotsOnly ? "Bé tách số ở trên thành hai phần" : ""}
        </text>
      </>,
      360,
      182,
      "Sơ đồ tách một số thành hai phần",
    );
  }

  /* ── 9. NỐI HAI NHÓM BẰNG NHAU ───────────────────────────── */
  if (mode === "matchEqual") {
    const ps = Array.isArray(pairs) ? pairs : [];
    const H = ps.length * 56 + 16;
    return box(
      <>
        {ps.map((p, i) => {
          const y = 10 + i * 56;
          const [L, R] = p;
          const lx = 12;
          const rx = 196;
          return (
            <g key={i}>
              <rect
                x={lx}
                y={y}
                width="152"
                height="48"
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              <rect
                x={rx}
                y={y}
                width="152"
                height="48"
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              {itemsGrid(Math.min(num(L.n, 0), 5), lx + 26, y + 30, L.emoji, {
                per: 5,
                gapX: 27,
                gapY: 0,
                s: 17,
                prefix: "l",
              })}
              {itemsGrid(Math.min(num(R.n, 0), 5), rx + 26, y + 30, R.emoji, {
                per: 5,
                gapX: 27,
                gapY: 0,
                s: 17,
                prefix: "r",
              })}
            </g>
          );
        })}
        {ps.length > 0 && (
          <line
            x1="164"
            y1="34"
            x2="196"
            y2="34"
            stroke={P.green}
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
        )}
        <text
          x="180"
          y={H - 2}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Nối hai nhóm có số lượng bằng nhau
        </text>
      </>,
      360,
      H + 8,
      "Các nhóm đồ vật để bé nối cặp bằng nhau",
    );
  }

  /* ── 10. MÊ CUNG SỐ ──────────────────────────────────────────── */
  if (mode === "numberMaze" && interactive) {
    /**
     * BÉ TỰ NỐI ĐƯỜNG — người dùng yêu cầu 2026-09-25: “hãy để cho trẻ tự nối, nếu ô được
     * chọn nối đúng nguyên tắc thì hiện màu xanh, nếu sai thì hiện màu đỏ, không nhất thiết
     * phải là đường ngắn nhất”. Bộ vẽ dùng CHUNG với phần Luyện tập (interactiveMaze.jsx).
     */
    return (
      <MazePath
        grid={Array.isArray(grid) ? grid : []}
        rule={{ op: ">", value: 4 }}
        note={note}
      />
    );
  }
  if (mode === "numberMaze") {
    const g = Array.isArray(grid) ? grid : [];
    const soHang = g.length;
    const soCot = g[0] ? g[0].length : 6;
    const cw = 44;
    const chh = 42;
    const x0 = Math.round((360 - soCot * cw) / 2);
    const y0 = 46;
    const H = y0 + soHang * chh + 44;
    /** Còn dùng cho hai icon 🏫/🏠 của bản TĨNH (bản tương tác do `MazePath` tự vẽ). */
    const cx = (ci) => x0 + ci * cw + (cw - 4) / 2;
    /* Đường đi KHÔNG còn vẽ sẵn: bé tự nối (nhánh `interactive` ở trên). */
    return box(
      <>
        <text
          x="180"
          y="16"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={P.soft}
        >
          Đường Mai về nhà chỉ đi qua ô có số lớn hơn 4
        </text>
        {/* TRƯỜNG ở trên ô đầu, NHÀ ở dưới ô cuối — to gấp đôi bản cũ (fontSize 30 thay vì
             17) vì người dùng báo 2026-09-25: “icon trường và nhà cần làm to hơn cho dễ nhìn”. */}
        <text x={cx(0)} y="42" textAnchor="middle" fontSize="30">
          🏫
        </text>
        <text
          x={cx(soCot - 1)}
          y={y0 + soHang * chh + 36}
          textAnchor="middle"
          fontSize="30"
        >
          🏠
        </text>
        {g.map((row, ri) =>
          row.map((v, ci) => (
            <Tile
              key={`${ri}-${ci}`}
              x={x0 + ci * cw}
              y={y0 + ri * chh}
              w={cw - 4}
              h={chh - 4}
              text={String(num(v, 0))}
              fs={17}
            />
          )),
        )}
        {/* Đường đi KHÔNG vẽ sẵn — bé tự nối (nhánh `interactive` ở trên vẽ đường bé chọn). */}
      </>,
      360,
      H,
      "Mê cung số để bé tìm đường",
    );
  }

  /* ── 13. BẢNG 100 SỐ: sang phải 1 ô = thêm 1 · xuống 1 hàng = thêm 10 ────── */
  // 🔴 VÌ SAO LÀ BẢNG chứ không phải tia số: lời bài dạy "thêm 10 thì XUỐNG một hàng".
  // Tia số chỉ có MỘT hàng nên không thể diễn tả được điều đó — hình cũ vẽ mũi tên +10
  // chạy thẳng trên tia số, trái hẳn với lời giảng (người dùng phát hiện 2026-09-24).
  if (mode === "gridWalk") {
    const s0 = Math.max(1, Math.min(num(startAt, 25), 99));
    const rowStart = s0 - ((s0 - 1) % 10); // số đầu của hàng đang chứa `startAt`
    const cw = 30;
    const chh = 34;
    const x0 = 52;
    const y0 = 66;
    const rowY = [y0, y0 + chh + 4];
    const cx = (v) => x0 + ((v - rowStart) % 10) * cw + cw / 2;
    const bg = (v) =>
      v === s0
        ? { fill: P.blueSoft, stroke: P.blue }
        : v === s0 + 1
          ? { fill: P.amberSoft, stroke: P.amber }
          : v === s0 + 10
            ? { fill: P.greenSoft, stroke: P.green }
            : { fill: P.paper, stroke: P.grid };
    const line = rowY[0] + chh / 2;
    const line2 = rowY[1] + chh / 2;
    // Nếu `startAt` đứng ở cột cuối (số tròn chục) thì "sang phải" đã hết hàng —
    // bỏ mũi tên +1 thay vì vẽ sai hướng.
    const coKe = s0 % 10 !== 0;
    return box(
      <>
        <text x={x0} y="22" fontSize="14" fontWeight="800" fill={P.soft}>
          Bảng 100 số (mỗi hàng 10 số)
        </text>
        {[0, 1].map((ri) =>
          Array.from({ length: 10 }, (_, ci) => {
            const v = rowStart + ri * 10 + ci;
            const c = bg(v);
            return (
              <Tile
                key={v}
                x={x0 + ci * cw}
                y={rowY[ri]}
                w={cw - 2}
                h={chh - 2}
                text={String(v)}
                fs={15}
                fill={c.fill}
                stroke={c.stroke}
              />
            );
          }),
        )}
        {coKe && (
          <>
            <line
              x1={cx(s0)}
              y1="56"
              x2={cx(s0 + 1) - 9}
              y2="56"
              stroke={P.amber}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx(s0 + 1) - 9},51 ${cx(s0 + 1)},56 ${cx(s0 + 1) - 9},61`}
              fill={P.amber}
            />
            <text
              x={(cx(s0) + cx(s0 + 1)) / 2}
              y="44"
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={P.amber}
            >
              +1
            </text>
            <line
              x1={cx(s0)}
              y1="58"
              x2={cx(s0)}
              y2={rowY[0]}
              stroke={P.amber}
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <line
              x1={cx(s0 + 1)}
              y1="58"
              x2={cx(s0 + 1)}
              y2={rowY[0]}
              stroke={P.amber}
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
          </>
        )}
        <line
          x1="40"
          y1={line}
          x2="40"
          y2={line2 - 9}
          stroke={P.green}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon
          points={`35,${line2 - 9} 40,${line2} 45,${line2 - 9}`}
          fill={P.green}
        />
        <text
          x="34"
          y={line + 6}
          textAnchor="end"
          fontSize="15"
          fontWeight="800"
          fill={P.green}
        >
          +10
        </text>
        <line
          x1="40"
          y1={line}
          x2={x0}
          y2={line}
          stroke={P.green}
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <line
          x1="40"
          y1={line2}
          x2={x0}
          y2={line2}
          stroke={P.green}
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
      </>,
      380,
      150,
      "Bảng 100 số: thêm 1 sang phải, thêm 10 xuống dưới",
    );
  }

  /* ── 11. THẺ CHẤM để so sánh ─────────────────────────────── */
  if (mode === "dotCards") {
    const l = num(left, 0);
    const r3 = num(right, 0);
    /** Slide bài học + KHÔNG có dấu in sẵn ⇒ bé tự bấm chọn dấu (bản tương tác). */
    if (interactive && !sign) {
      return <DotCardsCard left={l} right={r3} note={note} />;
    }
    return box(
      <>
        <rect
          x="20"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={l} x={20} y={16} w={104} h={104} />
        <Tile
          x="150"
          y="46"
          w={60}
          h={44}
          text={sign || "?"}
          fs={sign ? 26 : 24}
          fill={sign ? P.blueSoft : "#f8fafc"}
          stroke={sign ? P.blue : P.violet}
          color={sign ? P.blue : P.violet}
          dash={!sign}
        />
        <rect
          x="236"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={r3} x={236} y={16} w={104} h={104} />
        <text
          x="180"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Bé điền dấu &gt; , &lt; hoặc = vào ô giữa
        </text>
      </>,
      360,
      152,
      "Hai thẻ chấm để bé so sánh",
    );
  }

  /* ── 12. SO SÁNH THEO MẪU ────────────────────────────── */
  if (mode === "comparePairs") {
    const ps = Array.isArray(pairs) ? pairs : [];
    /** Slide bài học ⇒ dùng bản TƯƠNG TÁC (bé bấm ô “?” rồi chọn dấu). */
    if (interactive && ps.length > 0) {
      return <ComparePairsCard pairs={ps} model={model} note={note} />;
    }
    const H = ps.length * 44 + 18;
    return box(
      <>
        {ps.map((p, i) => {
          const y = 10 + i * 44;
          const [l, r] = p;
          const isModel = i === 0 && !!model;
          const sig = isModel ? model : "";
          /**
           * 🔴 BỀ RỘNG DÙNG HẾT KHUNG, canh giữa hai bên. Bản cũ: hai thẻ 96 ở x=14 và x=174
           * rồi nhãn “mẫu” ở x=290 ⇒ nội dung dồn về TRÁI, dư hơn 90 đơn vị bên phải (người
           * dùng báo 2026-09-24: “sao không làm full và đều hai bên”).
           */
          const cardW = 104;
          return (
            <g key={i}>
              <rect
                x="22"
                y={y}
                width={cardW}
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={l} x={22} y={y} w={cardW} h={36} r={3.6} />
              <Tile
                x="140"
                y={y}
                w={44}
                h={36}
                text={isModel ? sig : "?"}
                fs={isModel ? 22 : 20}
                fill={isModel ? P.blueSoft : "#f8fafc"}
                stroke={isModel ? P.blue : P.violet}
                color={isModel ? P.blue : P.violet}
                dash={!isModel}
              />
              <rect
                x="196"
                y={y}
                width={cardW}
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={r} x={196} y={y} w={cardW} h={36} r={3.6} />
              <text
                x="308"
                y={y + 25}
                fontSize="14"
                fontWeight="700"
                fill={P.soft}
              >
                {isModel ? "mẫu" : ""}
              </text>
            </g>
          );
        })}
      </>,
      360,
      H,
      "Các cặp thẻ chấm để bé so sánh theo mẫu",
      10,
    );
  }

  // Không khớp kiểu nào — trả về khung rỗng thay vì làm sập slide.
  return box(
    <text x="180" y="30" textAnchor="middle" fontSize="14" fill={P.soft}>
      (chưa có hình cho kiểu này)
    </text>,
    360,
    44,
    "Chưa có hình",
  );
}

/**
 * THÂN TOA TÀU — phải RA DÁNG TOA: thân trắng + 2 cửa sổ hai đầu + bánh xe bên dưới.
 * Ô SỐ ở giữa vẫn do chỗ gọi vẽ (nên cửa sổ chỉ đặt ở hai góc, không đè chữ).
 */
const Rect2 = ({ x, y, w, h }) => {
  const X = num(x);
  const Y = num(y);
  const W = num(w);
  const H = num(h);
  return (
    <g>
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx="5"
        fill="#ffffff"
        stroke="#475569"
        strokeWidth="1.8"
      />
      <rect
        x={X + 4}
        y={Y + 3}
        width="10"
        height="8"
        rx="2"
        fill="#bae6fd"
        stroke="#475569"
        strokeWidth="1"
      />
      <rect
        x={X + W - 14}
        y={Y + 3}
        width="10"
        height="8"
        rx="2"
        fill="#bae6fd"
        stroke="#475569"
        strokeWidth="1"
      />
      <circle cx={X + 12} cy={Y + H + 3} r="3.4" fill="#334155" />
      <circle cx={X + W - 12} cy={Y + H + 3} r="3.4" fill="#334155" />
    </g>
  );
};

export default NumberScene;
