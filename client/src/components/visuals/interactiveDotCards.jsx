/**
 * THẺ CHẤM — BÉ BẤM Ô “?” RỒI CHỌN DẤU (dùng cho phần LUYỆN TẬP).
 *
 * Cùng cách chơi với hình trong slide bài học (`DotCardsCard` trong `Grade1NumberVisuals`):
 * bé bấm ô giữa, chọn `>`, `<`, `=`, app chấm NGAY — đúng thì ô xanh, sai thì ô đỏ.
 * Ở đây viết lại phần VẼ (chấm kiểu xúc xắc) để trang Luyện tập không phải kéo theo cả
 * bộ hình của Lớp 1. Nếu sau này sửa cách vẽ chấm thì sửa ở CẢ HAI chỗ.
 *
 * `model` truyền vào ⇒ đây là hàng MẪU: dấu in sẵn, bé không phải làm gì.
 */

import { useEffect, useState } from "react";

import { useFillSlots, slotLook, FillBar } from "./interactiveFill";
import { CARD_STYLE, CAPTION_STYLE, svgFit } from "./visualTheme";

const P = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  violet: "#7c3aed",
};

/** Vị trí chấm kiểu xúc xắc (toạ độ chuẩn hoá 0..1). */
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

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

function Pips({ n, x, y, w, h, r = 4.4 }) {
  const count = Math.max(1, Math.min(6, num(n, 1)));
  const spots = PIP_SPOTS[count] || PIP_SPOTS[1];
  return spots.map(([u, v], i) => (
    <circle
      key={i}
      cx={x + w * (0.18 + 0.64 * u)}
      cy={y + h * (0.18 + 0.64 * v)}
      r={r}
      fill="#1e293b"
    />
  ));
}

/**
 * @param left   số chấm thẻ trái
 * @param right  số chấm thẻ phải
 * @param model  dấu của hàng mẫu (tuỳ chọn) — có thì KHÔNG cho bấm
 * @param onDone gọi khi bé chọn đúng (phần Luyện tập dùng để tính điểm)
 */
export function DotCardsFill({
  left = 0,
  right = 0,
  model = "",
  note = "",
  onDone,
}) {
  const l = num(left, 0);
  const r = num(right, 0);
  const answer = l > r ? ">" : l < r ? "<" : "=";
  const [reported, setReported] = useState(false);
  const fill = useFillSlots(model ? [null] : [answer]);
  const look = slotLook(fill, 0, !!model);

  const baoXong = () => {
    if (!reported && typeof onDone === "function") {
      setReported(true);
      onDone(model || answer);
    }
  };
  /**
   * 🔴 PHẢI gọi trong `useEffect`, KHÔNG được gọi trong lúc render: `onDone` của trang
   * Luyện tập gọi `setState` của component CHA ⇒ React cảnh báo
   * “Cannot update a component while rendering a different component” và dễ lệch trạng thái.
   */
  useEffect(() => {
    if (fill.done) baoXong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill.done]);

  return (
    <div style={CARD_STYLE}>
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
        <g
          onClick={model ? undefined : () => fill.setActive(0)}
          style={model ? undefined : { cursor: "pointer" }}
        >
          {!model && fill.active === 0 && !fill.solved[0] && (
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
          <rect
            x="150"
            y="46"
            width="60"
            height="44"
            rx="8"
            fill={look.fill}
            stroke={look.stroke}
            strokeWidth="2"
            strokeDasharray={look.dash ? "5 4" : undefined}
          />
          <text
            x="180"
            y="72"
            textAnchor="middle"
            fontSize={model || fill.picked[0] ? 26 : 24}
            fontWeight="800"
            fill={look.color}
          >
            {model || fill.picked[0] || "?"}
          </text>
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
        <span style={{ ...CAPTION_STYLE, fontSize: 15, color: P.ink }}>
          {note}
        </span>
      )}
      {!model && <FillBar fill={fill} />}
    </div>
  );
}
