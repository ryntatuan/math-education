/**
 * Bộ vẽ cho PHÂN SỐ, SƠ ĐỒ ĐOẠN THẲNG, CHUYỂN ĐỘNG và BIỂU ĐỒ —
 * Giai đoạn 1 của kế hoạch hình ảnh bài học.
 *
 * Đây là nhóm chỗ trẻ cần hình NHẤT mà app trước đây không có cách vẽ nào:
 *   • Phân số (lớp 4 CĐ 4, lớp 5 CĐ 1): băng giấy chia phần và hình tròn chia phần.
 *   • Toán Tổng – Tỉ / Hiệu – Tỉ (lớp 4 CĐ 5): SƠ ĐỒ ĐOẠN THẲNG — sách giáo khoa chỉ dạy
 *     dạng toán này BẰNG sơ đồ; dạy bằng chữ thì trẻ không hình dung được.
 *   • Chuyển động đều (lớp 5 CĐ 4): hai xe trên một trục.
 *   • Biểu đồ cột (lớp 3–4) và biểu đồ hình quạt (lớp 5 CĐ 3).
 *
 * Nguyên tắc giống hai file kia: SVG nội tuyến, `viewBox` + `width="100%"`, tham số có
 * mặc định, không bao giờ trắng khung.
 */

import { CARD_STYLE, CAPTION_STYLE, svgFit } from "./visualTheme";

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
  violetSoft: "#ede9fe",
  paper: "#ffffff",
};

// Kiểu dáng dùng chung — xem `visualTheme.js`.
const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const SEG = [P.blue, P.rose, P.amber, P.green, P.violet];

/* ─────────────────────────── BĂNG GIẤY CHIA PHẦN (PHÂN SỐ) ───────────────────────────
 * fractionBar: { parts: 4, shaded: 3, label: "3/4", unit: "băng giấy", rows: [...] }
 * `rows` cho phép vẽ nhiều băng cùng thang để so sánh / quy đồng mẫu số.
 */
export function FractionBar({
  parts = 4,
  shaded = 1,
  label = "",
  unit = "",
  rows = null,
}) {
  const bands =
    Array.isArray(rows) && rows.length
      ? rows.slice(0, 4)
      : [{ parts, shaded, label: "" }];

  const W = 520;
  const rowH = 46;
  const gap = 16;
  const H = bands.length * (rowH + gap) + 16;
  const left = 10;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Băng giấy phân số"
      >
        {bands.map((r, ri) => {
          const p = clamp(num(r.parts, 4), 1, 20);
          const s = clamp(num(r.shaded, 0), 0, p);
          const w = (W - 24) / p;
          const y = 10 + ri * (rowH + gap);
          return (
            <g key={ri}>
              {Array.from({ length: p }).map((_, i) => (
                <rect
                  key={i}
                  x={left + i * w}
                  y={y}
                  width={w}
                  height={rowH}
                  fill={i < s ? SEG[ri % SEG.length] : P.paper}
                  fillOpacity={i < s ? 0.28 : 1}
                  stroke={i < s ? SEG[ri % SEG.length] : P.grid}
                  strokeWidth={i < s ? 3 : 2}
                />
              ))}
              {r.label && (
                <text
                  x={W - 6}
                  y={y + rowH / 2 + 6}
                  textAnchor="end"
                  fontSize="15"
                  fontWeight="800"
                  fill={SEG[ri % SEG.length]}
                >
                  {r.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
        {label || `Tô màu ${shaded}/${parts} ${unit}`.trim()}
      </span>
    </div>
  );
}

/* ─────────────────────────── HÌNH TRÒN CHIA PHẦN (PHÂN SỐ / BIỂU ĐỒ QUẠT) ───────────────────────────
 * fractionCircle: { parts: 4, shaded: 1, label: "1/4" }
 * pieChart: dùng cùng hàm vẽ nhưng số phần theo %
 */
function sectorPath(cx, cy, r, a0, a1) {
  const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)];
  const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M${cx},${cy} L${p0[0]},${p0[1]} A${r},${r} 0 ${large} 1 ${p1[0]},${p1[1]} Z`;
}

export function FractionCircle({ parts = 4, shaded = 1, label = "" }) {
  const p = clamp(num(parts, 4), 1, 24);
  const s = clamp(num(shaded, 0), 0, p);
  const cx = 170;
  const cy = 120;
  const r = 92;
  const step = (Math.PI * 2) / p;
  const start = -Math.PI / 2;

  return (
    <div style={card}>
      <svg
        viewBox="0 0 340 250"
        {...svgFit(340)}
        role="img"
        aria-label="Hình tròn chia phần"
      >
        {Array.from({ length: p }).map((_, i) => (
          <path
            key={i}
            d={sectorPath(cx, cy, r, start + i * step, start + (i + 1) * step)}
            fill={i < s ? P.rose : P.paper}
            fillOpacity={i < s ? 0.3 : 1}
            stroke={i < s ? P.rose : P.grid}
            strokeWidth={i < s ? 3 : 2}
          />
        ))}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={P.ink}
          strokeWidth="2.5"
          opacity="0.5"
        />
      </svg>
      <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
        {label || `Tô màu ${shaded}/${parts} hình tròn`}
      </span>
    </div>
  );
}

/* ─────────────────────────── SƠ ĐỒ ĐOẠN THẲNG (TỔNG – TỈ, HIỆU – TỈ) ───────────────────────────
 * barModel: {
 *   rows: [{ label: "Số bé", parts: 2 }, { label: "Số lớn", parts: 6 }],
 *   braceLabel: "Tổng: 96",
 *   note: "..."
 * }
 * Mỗi hàng là một đoạn thẳng chia thành `parts` phần bằng nhau — đúng cách sách giáo khoa
 * biểu diễn dạng toán này. Hàng đầu tiên được coi là "1 phần" quy chiếu.
 */
export function BarModel({
  rows = [],
  braceLabel = "",
  note = "",
  unit = "phần",
}) {
  const rs = (Array.isArray(rows) ? rows : [])
    .map((r) => ({
      label: r?.label ?? "",
      parts: clamp(num(r?.parts, 1), 1, 20),
    }))
    .slice(0, 4);
  const safe = rs.length
    ? rs
    : [
        { label: "Số bé", parts: 2 },
        { label: "Số lớn", parts: 6 },
      ];

  // Số phần LỚN NHẤT quyết định độ rộng một phần ⇒ các hàng so sánh được với nhau.
  // ⚠️ Đừng đặt tên biến này là `unit` — đã có tham số `unit` là ĐƠN VỊ hiển thị
  // ("phần", "cm"...). Trùng tên là ghi đè âm thầm tham số.
  const maxParts = Math.max(...safe.map((r) => r.parts));
  /**
   * 🔴 BỀ RỘNG PHẢI TÍNH CẢ PHẦN CHỮ Ở CUỐI HÀNG.
   *
   * Bản cũ lấy `barAreaW = W - 150` — tức chỉ chừa 8 đơn vị sau vạch dài nhất — nên nhãn
   * cuối hàng ("2 phần", "20 cm") và nhãn dấu ngoặc ("Tổng 35", "Hiệu 24") bị vẽ RA NGOÀI
   * khung viewBox. Đo thật trên thư viện hình: chữ vươn tới **663–666 đơn vị** trong khung
   * **560** ⇒ tràn **103–106 đơn vị**, bé chỉ thấy một phần của "Tổng 35".
   * (Cùng họ lỗi với số đè mũi tên ở trục số: bộ vẽ không tính chỗ cho chữ của chính nó.)
   */
  const RONG_CHU = 8.4; // đơn vị/ký tự, cỡ chữ 14–15 in đậm
  /**
   * Số của mỗi hàng nay nằm BÊN TRÁI, ngay trước thanh (`x = 132`, căn phải).
   * 🔴 VÌ SAO ĐỔI CHỖ: để số ở CUỐI thanh thì trên điện thoại hình phải kéo ngang và
   * bé nhìn thấy hai thanh mà **không thấy số** — mà số mới là thứ cần đọc ("20 cm").
   * Đặt trước thanh thì luôn nằm trong phần nhìn thấy đầu tiên.
   */
  const rongNgoac = braceLabel
    ? 54 + RONG_CHU * String(braceLabel).length + 6
    : 0;
  const RIGHT = rongNgoac + 10;
  const W = 560;
  const barAreaW = W - 142 - RIGHT;
  const segW = barAreaW / maxParts;
  const rowH = 40;
  const gap = 26;
  const top = 44;
  const H = top + safe.length * (rowH + gap) + 34;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Sơ đồ đoạn thẳng"
      >
        {safe.map((r, ri) => {
          const y = top + ri * (rowH + gap);
          const color = SEG[ri % SEG.length];
          return (
            <g key={ri}>
              <text
                x="0"
                y={y + rowH / 2 + 6}
                fontSize="15"
                fontWeight="800"
                fill={P.ink}
              >
                {r.label}
              </text>
              {Array.from({ length: r.parts }).map((_, i) => (
                <rect
                  key={i}
                  x={142 + i * segW}
                  y={y}
                  width={segW}
                  height={rowH}
                  fill={color}
                  fillOpacity={ri === 0 ? 0.28 : 0.18}
                  stroke={color}
                  strokeWidth="2.5"
                />
              ))}
              <text
                x={132}
                y={y + rowH / 2 + 6}
                textAnchor="end"
                fontSize="14"
                fontWeight="700"
                fill={color}
              >
                {r.parts} {unit}
              </text>
            </g>
          );
        })}

        {/* Dấu ngoặc thể hiện Tổng (hoặc Hiệu) */}
        {braceLabel && (
          <g>
            <line
              x1={142 + barAreaW + 44}
              y1={top + 4}
              x2={142 + barAreaW + 44}
              y2={top + safe.length * (rowH + gap) - gap + 4}
              stroke={P.violet}
              strokeWidth="3"
            />
            <text
              x={142 + barAreaW + 54}
              y={top + 20}
              fontSize="15"
              fontWeight="800"
              fill={P.violet}
            >
              {braceLabel}
            </text>
          </g>
        )}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );
}

/* ─────────────────────────── SƠ ĐỒ CHUYỂN ĐỘNG ───────────────────────────
 * motionDiagram: {
 *   mode: "toward" | "apart" | "chase",
 *   distance: 60, unit: "km",
 *   a: { name: "Ô tô", speed: 40 },
 *   b: { name: "Xe máy", speed: 20 },
 *   note: "..."
 * }
 * Lớp 5 (CĐ 4): vận tốc – quãng đường – thời gian, hai chuyển động ngược chiều / cùng chiều.
 */
const MOTION_LABEL = {
  toward: "Hai xe đi NGƯỢC CHIỀU, gặp nhau",
  apart: "Hai xe đi RA XA nhau",
  chase: "Hai xe đi CÙNG CHIỀU, đuổi nhau",
};

export function MotionDiagram({
  mode = "toward",
  distance = null,
  unit = "km",
  a = null,
  b = null,
  note = "",
}) {
  const m = MOTION_LABEL[mode] ? mode : "toward";
  // ⚠️ MẶC ĐỊNH `= {}` KHÔNG CHẶN ĐƯỢC `null` TRUYỀN THẲNG VÀO. Giá trị mặc định của
  // tham số chỉ áp dụng khi giá trị là `undefined`, còn `null` đi qua nguyên vẹn.
  // Đã ĐO được: `phép thử render` báo `Cannot read properties of null (reading 'name')`
  // ⇒ cả trang bài học trắng. Chặn tường minh thay vì tin vào giá trị mặc định.
  const A = a && typeof a === "object" ? a : {};
  const B = b && typeof b === "object" ? b : {};
  const W = 560;
  const H = 168;
  const axisY = 104;
  const x0 = 42;
  const x1 = W - 42;
  const d = num(distance, null);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Sơ đồ chuyển động"
      >
        <text
          x={W / 2}
          y="26"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill={P.violet}
        >
          {MOTION_LABEL[m]}
        </text>

        <line
          x1={x0}
          y1={axisY}
          x2={x1}
          y2={axisY}
          stroke={P.grid}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Mốc hai đầu */}
        <circle cx={x0} cy={axisY} r="7" fill={P.blue} />
        <circle cx={x1} cy={axisY} r="7" fill={P.rose} />

        {d !== null && (
          <>
            <line
              x1={x0}
              y1={axisY + 26}
              x2={x1}
              y2={axisY + 26}
              stroke={P.soft}
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <text
              x={W / 2}
              y={axisY + 46}
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={P.soft}
            >
              {d} {unit}
            </text>
          </>
        )}

        {/* Xe A */}
        <text x={x0} y={axisY - 34} textAnchor="middle" fontSize="26">
          🚗
        </text>
        <text
          x={x0}
          y={axisY - 52}
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={P.blue}
        >
          {A.name || "Xe 1"}
        </text>
        {num(A.speed, null) !== null && (
          <text
            x={x0}
            y={axisY - 12}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={P.blue}
          >
            {num(A.speed, 0)} {unit}/giờ
          </text>
        )}

        {/* Xe B — mũi tên chỉ hướng đi */}
        <text x={x1} y={axisY - 34} textAnchor="middle" fontSize="26">
          🏍️
        </text>
        <text
          x={x1}
          y={axisY - 52}
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={P.rose}
        >
          {B.name || "Xe 2"}
        </text>
        {num(B.speed, null) !== null && (
          <text
            x={x1}
            y={axisY - 12}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={P.rose}
          >
            {num(B.speed, 0)} {unit}/giờ
          </text>
        )}

        {/* Mũi tên chỉ chiều */}
        <defs>
          <marker
            id="mdBlue"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,1 L9,4.5 L0,8 Z" fill={P.blue} />
          </marker>
          <marker
            id="mdRose"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,1 L9,4.5 L0,8 Z" fill={P.rose} />
          </marker>
        </defs>

        <line
          x1={x0 + 20}
          y1={axisY - 74}
          x2={m === "apart" || m === "chase" ? x0 + 92 : x0 + 92}
          y2={axisY - 74}
          stroke={P.blue}
          strokeWidth="3"
          markerEnd="url(#mdBlue)"
        />
        <line
          x1={x1 - 20}
          y1={axisY - 74}
          x2={x1 - 92}
          y2={axisY - 74}
          stroke={P.rose}
          strokeWidth="3"
          markerEnd={m === "toward" ? "url(#mdRose)" : undefined}
          markerStart={m === "toward" ? undefined : "url(#mdRose)"}
          transform={
            m === "toward"
              ? undefined
              : `rotate(180 ${(x1 - 20 + x1 - 92) / 2} ${axisY - 74})`
          }
        />
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );
}

/* ─────────────────────────── BIỂU ĐỒ CỘT & BIỂU ĐỒ QUẠT ───────────────────────────
 * barChart: { title, items: [{label, value}], unit, highlight }
 * pieChart: { title, items: [{label, percent}] }
 * Lớp 3 (CĐ 15) và lớp 4 (CĐ 1) dùng biểu đồ cột; lớp 5 (CĐ 3) dùng biểu đồ hình quạt.
 */
export function BarChart({
  title = "",
  items = [],
  unit = "",
  highlight = -1,
}) {
  const its = (Array.isArray(items) ? items : [])
    .map((it) => ({ label: it?.label ?? "", value: num(it?.value, 0) }))
    .slice(0, 8);
  const safe = its.length
    ? its
    : [
        { label: "A", value: 4 },
        { label: "B", value: 7 },
      ];
  const maxV = Math.max(...safe.map((it) => it.value), 1);
  const hi = num(highlight, -1);

  const W = 560;
  const H = 260;
  const baseY = H - 52;
  const topY = 44;
  const plotH = baseY - topY;
  const slot = (W - 80) / safe.length;
  const barW = Math.min(slot * 0.56, 62);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Biểu đồ cột"
      >
        {title && (
          <text
            x={W / 2}
            y="26"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill={P.ink}
          >
            {title}
          </text>
        )}

        {/* Lưới ngang */}
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <g key={i}>
            <line
              x1="56"
              y1={baseY - f * plotH}
              x2={W - 20}
              y2={baseY - f * plotH}
              stroke={P.grid}
              strokeWidth="1.6"
            />
            <text
              x="48"
              y={baseY - f * plotH + 5}
              textAnchor="end"
              fontSize="12"
              fill={P.soft}
            >
              {Math.round(maxV * f)}
            </text>
          </g>
        ))}

        <line
          x1="56"
          y1={baseY}
          x2={W - 20}
          y2={baseY}
          stroke={P.ink}
          strokeWidth="2.5"
        />
        <line
          x1="56"
          y1={baseY}
          x2="56"
          y2={topY - 8}
          stroke={P.ink}
          strokeWidth="2.5"
        />

        {safe.map((it, i) => {
          const h = (it.value / maxV) * plotH;
          const cx = 56 + slot * i + slot / 2;
          const on = i === hi;
          return (
            <g key={i}>
              <rect
                x={cx - barW / 2}
                y={baseY - h}
                width={barW}
                height={Math.max(h, 2)}
                rx="7"
                fill={on ? P.amber : P.blue}
                fillOpacity={on ? 1 : 0.75}
                stroke={on ? P.amber : P.blue}
                strokeWidth="2.5"
              />
              <text
                x={cx}
                y={baseY - h - 8}
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={on ? P.amber : P.blue}
              >
                {it.value}
                {unit}
              </text>
              <text
                x={cx}
                y={baseY + 24}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={P.ink}
              >
                {it.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function PieChart({ title = "", items = [] }) {
  const its = (Array.isArray(items) ? items : [])
    .map((it) => ({
      label: it?.label ?? "",
      percent: clamp(num(it?.percent, 0), 0, 100),
    }))
    .slice(0, 6);
  const safe = its.length
    ? its
    : [
        { label: "Toán", percent: 25 },
        { label: "Khác", percent: 75 },
      ];

  const cx = 150;
  const cy = 132;
  const r = 96;
  const start = -Math.PI / 2;
  let acc = 0;

  return (
    <div style={card}>
      <svg
        viewBox="0 0 560 270"
        {...svgFit(560)}
        role="img"
        aria-label="Biểu đồ hình quạt"
      >
        {title && (
          <text
            x="280"
            y="26"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill={P.ink}
          >
            {title}
          </text>
        )}
        {safe.map((it, i) => {
          const a0 = start + (acc / 100) * Math.PI * 2;
          acc += it.percent;
          const a1 =
            start + (acc / 100) * Math.PI * 2 + (i === safe.length - 1 ? 0 : 0);
          return (
            <path
              key={i}
              d={sectorPath(cx, cy, r, a0, a1)}
              fill={SEG[i % SEG.length]}
              fillOpacity="0.75"
              stroke={P.paper}
              strokeWidth="2.5"
            />
          );
        })}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={P.ink}
          strokeWidth="2.5"
          opacity="0.45"
        />

        {/* Chú giải */}
        {safe.map((it, i) => (
          <g key={`l${i}`}>
            <rect
              x="300"
              y={72 + i * 30}
              width="20"
              height="20"
              rx="5"
              fill={SEG[i % SEG.length]}
            />
            <text
              x="330"
              y={87 + i * 30}
              fontSize="14"
              fontWeight="700"
              fill={P.ink}
            >
              {it.label}: {it.percent}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
