// gocTron.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useEffect, useState } from "react";
import {
  useInteractive,
  useFillSlots,
  slotLook,
  FillBar,
} from ".././interactiveFill";
import {
  CARD_STYLE,
  CAPTION_STYLE,
  captionText,
  svgFit,
  ngatDong,
} from ".././visualTheme";
import { ANGLE_DEF } from "./geometryData.jsx";
import { P } from "./geometryData.jsx";
import { caption } from "./geometryData.jsx";
import { card } from "./geometryData.jsx";
import { clamp } from "./geometryData.jsx";
import { num } from "./geometryData.jsx";

export function Angle({
  kind = "right",
  degrees = null,
  label = "",
  vertexLetter = "",
  armLetters = [],
}) {
  const def = ANGLE_DEF[kind] || ANGLE_DEF.right;
  const coChu = Boolean(vertexLetter) || armLetters.filter(Boolean).length > 0;
  /** Có chữ thì nới khung xuống để chữ ở đỉnh không đè lên tên góc. */
  const H = coChu ? 250 : 220;
  const yTen = coChu ? 242 : 212;
  const deg = clamp(num(degrees, def.deg), 5, 180);
  const R = 150;
  const VbW = 340;
  const rad = (deg * Math.PI) / 180;
  /**
   * 🔴 DỜI ĐỈNH GÓC ĐỂ CẢ HÌNH NẰM TRONG KHUNG.
   * Đỉnh cố định ở x = 70 mà tia dài 150 đơn vị ⇒ góc từ 110° trở lên có đầu tia vượt
   * qua mép trái: đo thật, góc 120° cho chấm đầu tia ở **x = −10 → 0** ⇒ mất một phần
   * chấm, và góc bẹt 180° còn ra xa hơn. Nay tính bề rộng THẬT của hình rồi canh giữa.
   */
  const trai = Math.max(0, -R * Math.cos(rad)); // tia chéo vươn sang trái bao nhiêu
  const span = R + trai;
  const cx = (VbW - span) / 2 + trai;
  const cy = 175;
  const ex = cx + R * Math.cos(rad);
  const ey = cy - R * Math.sin(rad);

  const arcR = deg >= 150 ? 34 : 46;
  const ax = cx + arcR * Math.cos(rad);
  const ay = cy - arcR * Math.sin(rad);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 340 ${H}`}
        {...svgFit(340)}
        role="img"
        aria-label={def.name}
      >
        <line
          x1={cx}
          y1={cy}
          x2={cx + R}
          y2={cy}
          stroke={P.ink}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={ex}
          y2={ey}
          stroke={P.ink}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {deg === 90 ? (
          <rect
            x={cx}
            y={cy - 34}
            width="34"
            height="34"
            fill="none"
            stroke={def.color}
            strokeWidth="3"
          />
        ) : (
          <path
            d={`M${cx + arcR},${cy} A${arcR},${arcR} 0 0 0 ${ax},${ay}`}
            fill="none"
            stroke={def.color}
            strokeWidth="3.5"
          />
        )}

        <text
          x={cx + arcR + 12}
          y={cy - arcR + 6}
          fontSize="16"
          fontWeight="800"
          fill={def.color}
        >
          {deg}°
        </text>
        {deg !== 180 && <circle cx={ex} cy={ey} r="5" fill={P.ink} />}
        <circle cx={cx} cy={cy} r="5.5" fill={P.ink} />

        {coChu && (
          <>
            {vertexLetter && (
              <text
                x={cx - 12}
                y={cy + 26}
                textAnchor="end"
                fontSize="17"
                fontWeight="900"
                fill={P.ink}
              >
                {vertexLetter}
              </text>
            )}
            {armLetters[0] &&
              (cx + R + 13 > 322 ? (
                <text
                  x={cx + R - 6}
                  y={cy - 12}
                  textAnchor="end"
                  fontSize="17"
                  fontWeight="900"
                  fill={P.ink}
                >
                  {armLetters[0]}
                </text>
              ) : (
                <text
                  x={cx + R + 13}
                  y={cy + 6}
                  fontSize="17"
                  fontWeight="900"
                  fill={P.ink}
                >
                  {armLetters[0]}
                </text>
              ))}
            {armLetters[1] && deg !== 180 && (
              <text
                x={ex + (ex >= cx ? 14 : -14)}
                y={ey + (ey < cy ? -4 : 20)}
                textAnchor={ex >= cx ? "start" : "end"}
                fontSize="17"
                fontWeight="900"
                fill={P.ink}
              >
                {armLetters[1]}
              </text>
            )}
          </>
        )}

        <text
          x={170}
          y={yTen}
          textAnchor="middle"
          fontSize="17"
          fontWeight="800"
          fill={def.color}
        >
          {def.name}
        </text>
      </svg>
      <span style={caption}>{captionText(def.note, label)}</span>
    </div>
  );
}

export function CircleParts({
  radius = null,
  diameter = null,
  showCenter = true,
  showCircumference = false,
  label = "",
  /**
   * `pointLabels`: GHI TÊN ĐIỂM trên hình tròn — `{ center, right, left, down }`.
   * 🔴 VÌ SAO CẦN: Lớp 3 `g3-c3-l2` dạy "Bán kính OA = OB", "Đường kính BC" nhưng hình
   * chỉ có chữ "bán kính" và chữ "O". Cùng họ lỗi với hình tứ giác ABCD.
   */
  pointLabels = null,
  /** Cho phép đổi chữ ghi ở hai bán kính, ví dụ "bán kính r" (Lớp 5 dùng chữ r, d). */
  radiusLabel = "bán kính",
  /** Chữ ghi trên đường kính (mặc định rỗng — hình cũ không đổi). */
  diameterLabel = "",
}) {
  const PL = pointLabels && typeof pointLabels === "object" ? pointLabels : {};
  const r = num(radius, null);
  const d = num(diameter, null);
  const rr = r ?? (d ? d / 2 : 5);
  const text =
    r !== null ? `Bán kính = ${r}` : d !== null ? `Đường kính = ${d}` : "";
  const cx = 170;
  const cy = 112;
  const R = 76;

  return (
    <div style={card}>
      <svg
        viewBox="0 0 340 240"
        {...svgFit(340)}
        role="img"
        aria-label="Hình tròn"
      >
        <circle
          cx={cx}
          cy={cy}
          r={R}
          fill={P.amberSoft}
          stroke={showCircumference ? P.violet : P.amber}
          strokeWidth={showCircumference ? 4.5 : 3}
        />
        {showCircumference && (
          <text
            x={cx}
            y={cy - R - 12}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.violet}
          >
            đường tròn (chu vi)
          </text>
        )}

        {/* Bán kính */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + R}
          y2={cy}
          stroke={P.blue}
          strokeWidth="3"
        />
        <text
          x={cx + R / 2}
          y={cy - 10}
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={P.blue}
        >
          {radiusLabel}
        </text>

        {/* Đường kính (nằm ngang qua tâm, mép này sang mép kia) */}
        <line
          x1={cx - R}
          y1={cy}
          x2={cx + R}
          y2={cy}
          stroke={P.rose}
          strokeWidth="2.4"
          strokeDasharray="7 5"
          opacity="0.9"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy + R}
          stroke={P.rose}
          strokeWidth="3"
        />
        <text
          x={cx + 8}
          y={cy + R / 2 + 6}
          fontSize="14"
          fontWeight="800"
          fill={P.rose}
        >
          {radiusLabel}
        </text>

        {diameterLabel && (
          /**
           * 🔴 KHÔNG đặt chữ của đường kính đối xứng qua tâm: "bán kính r" (nửa phải) và
           * "đường kính d" (nửa trái) cùng nằm trên `cy - 10` thì hai chuỗi ĐÈ NHAU ở giữa.
           * Hạ xuống dưới đường kính cũng hỏng: chữ "O" ở tâm (kết thúc tại `cx - 10`,
           * cao tới `cy + 22`) đè lên. Chốt: ở TRÊN đường kính, lệch hẳn sang trái —
           * phép đo trên trang hình thật xác nhận hết chồng.
           */
          <text
            x={cx - R / 2 - 16}
            y={cy - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.rose}
          >
            {diameterLabel}
          </text>
        )}

        {PL.right && (
          <text
            x={cx + R + 13}
            y={cy + 6}
            fontSize="17"
            fontWeight="900"
            fill={P.ink}
          >
            {PL.right}
          </text>
        )}
        {PL.left && (
          <text
            x={cx - R - 13}
            y={cy + 6}
            textAnchor="end"
            fontSize="17"
            fontWeight="900"
            fill={P.ink}
          >
            {PL.left}
          </text>
        )}
        {PL.down && (
          <text
            x={cx - 7}
            y={cy + R + 24}
            textAnchor="middle"
            fontSize="17"
            fontWeight="900"
            fill={P.ink}
          >
            {PL.down}
          </text>
        )}

        {showCenter && (
          <>
            <circle cx={cx} cy={cy} r="5.5" fill={P.ink} />
            <text
              x={cx - 10}
              y={cy + 22}
              textAnchor="end"
              fontSize="15"
              fontWeight="800"
              fill={P.ink}
            >
              {PL.center || "O"}
            </text>
          </>
        )}
      </svg>
      {text && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
          {text}
          {d !== null && r === null ? ` (bán kính = ${d} : 2 = ${d / 2})` : ""}
        </span>
      )}
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}
