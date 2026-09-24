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

import {
  CARD_STYLE,
  CAPTION_STYLE,
  svgFit,
  VUA_HINH,
  ngatDong,
} from "./visualTheme";

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
/**
 * Băng giấy chia phần — nay chứng minh được cả PHÉP CỘNG và PHÉP CHIA/NHÓM:
 *   • `extra`  (mỗi dòng): số ô tô bằng MÀU THỨ HAI ⇒ một băng 6 ô có 3 ô xanh + 2 ô hổng
 *     chính là hình vẽ của `1/2 + 1/3 = 3/6 + 2/6 = 5/6`
 *     (người dùng phát hiện 2026-09-24: hình cũ 6 ô tô 5, KHÔNG nói được vì sao bằng 5/6).
 *   • `groups` (mỗi dòng): cứ `groups` ô thì vẽ một vạch đậm ⇒ thấy được “12 chia thành 3
 *     phần, mỗi phần 4 ô” hay “18 bạn chia thành 6 nhóm 3 bạn”.
 * Hai tham số đều TUỲ CHỌN ⇒ mọi hình cũ không đổi.
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

  const W = VUA_HINH;
  const rowH = 46;
  /**
   * 🔴 CHỖ CHO NHÃN CỦA TỪNG DÒNG, VÀ NHÃN NAY NẰM **DƯỚI** BĂNG.
   *
   * Bản cũ vẽ nhãn ở cuối băng (`x = W − 6`, căn phải) nên nhãn dài — ca thật ở bài
   * `g5-c1-l3` là `"2/3 + 1/4 = 8/12 + 3/12 = 11/12"`, 31 ký tự ≈ 260 đơn vị — **nằm đè
   * lên chính các ô của băng giấy**. Thu hẹp hình lại còn làm tỉ lệ đè tăng lên. Vẽ dưới
   * băng thì không đè gì, và nhãn có cả bề ngang 380 đơn vị để hiện (31 ký tự ≈ 223).
   */
  const KHE_DONG = 28;
  /** +12 cho lề trên: nhãn của dòng đầu không được chạm mép khung. */
  const H = bands.length * (rowH + KHE_DONG) + 20;
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
          const them = clamp(num(r.extra, 0), 0, p - s);
          const nhom = clamp(num(r.groups, 0), 0, 20);
          const w = (W - 24) / p;
          const y = 20 + ri * (rowH + KHE_DONG);
          const mauChinh = SEG[ri % SEG.length];
          const mauPhu = SEG[(ri + 1) % SEG.length];
          const soNhom = nhom > 1 ? Math.floor(p / nhom) : 0;
          return (
            <g key={ri}>
              {Array.from({ length: p }).map((_, i) => {
                const toChinh = i < s;
                const toPhu = !toChinh && i < s + them;
                return (
                  <rect
                    key={i}
                    x={left + i * w}
                    y={y}
                    width={w}
                    height={rowH}
                    fill={toChinh ? mauChinh : toPhu ? mauPhu : P.paper}
                    fillOpacity={toChinh || toPhu ? 0.28 : 1}
                    stroke={toChinh ? mauChinh : toPhu ? mauPhu : P.grid}
                    strokeWidth={toChinh || toPhu ? 3 : 2}
                  />
                );
              })}
              {/**
               * 🔴 Ô LỚN — cách SGK quốc tế (fraction strips + regrouping) dạy “vì sao bằng nhau”:
               * gộp 4 ô nhỏ thành 1 Ô LỚN (khung đậm, đánh số 1·2·3 ở trên) ⇒ trẻ thấy
               * “12 ô nhỏ = 3 ô lớn; 8 ô nhỏ = 2 ô lớn” = `8/12 = 2/3` (người dùng yêu cầu
               * 2026-09-24: “để trẻ nhận biết 8 hình nhỏ/12 = 2 hình lớn/3”).
               */}
              {soNhom > 1 &&
                Array.from({ length: soNhom }).map((_, g) => {
                  const x = left + g * nhom * w + 1.5;
                  const rw = nhom * w - 3;
                  const kin = (g + 1) * nhom <= s;
                  return (
                    <g key={`o-lon${g}`}>
                      <rect
                        x={x}
                        y={y - 3}
                        width={rw}
                        height={rowH + 6}
                        rx="9"
                        fill="none"
                        stroke={kin ? mauChinh : P.soft}
                        strokeWidth={kin ? 3.5 : 2}
                      />
                      <text
                        x={x + 9}
                        y={y + 17}
                        textAnchor="start"
                        fontSize="13"
                        fontWeight="800"
                        fill={kin ? mauChinh : P.soft}
                        stroke="#ffffff"
                        strokeWidth="3"
                        style={{ paintOrder: "stroke" }}
                      >
                        {g + 1}
                      </text>
                    </g>
                  );
                })}
              {r.label && (
                <text
                  x={left}
                  y={y + rowH + 20}
                  textAnchor="start"
                  fontSize="14"
                  fontWeight="800"
                  fill={mauChinh}
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
  const RONG_CHU = 8.4; // đơn vị/ký tự, cỡ chữ 14 in đậm
  /**
   * Số của mỗi hàng nằm BÊN TRÁI, ngay trước thanh (`textAnchor="end"`).
   * 🔴 VÌ SAO ĐỔI CHỖ: để số ở CUỐI thanh thì trên điện thoại hình phải kéo ngang và bé
   * nhìn thấy hai thanh mà **không thấy số** — mà số mới là thứ cần đọc ("20 cm").
   */
  const W = VUA_HINH;
  const LE_TRAI = 12;
  const soDaiNhat = Math.max(
    ...safe.map((r) => `${r.parts} ${unit}`.trim().length),
    1,
  );
  const rongSo = RONG_CHU * soDaiNhat + 12;
  const xBar = LE_TRAI + rongSo;
  /**
   * 🔴 NHÃN DẤU NGOẶC PHẢI NGẮT DÒNG. Ca thật ở bài `g4-c5-l2`: "Tổng 35 · số bé 14 ·
   * số lớn 21" (30 ký tự ≈ 252 đơn vị) và ở `g3-c12-l4` tới 42 ký tự ≈ 350 đơn vị.
   * Bản cũ chừa một dải ngang cho nhãn này nên bề rộng còn lại cho thanh chỉ ~70 đơn vị
   * — đúng lúc đó lại là ca 20 phần, thành ra các phần mỏng như sợi chỉ.
   * Ngắt thành dòng thì dải bên phải hẹp lại, thanh được rộng.
   */
  const dongNgoac = braceLabel ? ngatDong(braceLabel, 14) : [];
  const rongNgoac = dongNgoac.length
    ? 20 + Math.max(...dongNgoac.map((d) => d.length)) * RONG_CHU
    : 0;
  const xNgoac = W - rongNgoac;
  const barAreaW = Math.max(60, xNgoac - 12 - xBar);
  const segW = barAreaW / maxParts;
  const rowH = 40;
  const gap = 28; // đủ chỗ cho NHÃN HÀNG nằm trên thanh và SỐ nằm bên trái
  const top = 36;
  const H = top + safe.length * (rowH + gap) - gap + 14;

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
              {/* Nhãn hàng nằm TRÊN thanh, sát đầu thanh — không giành bề ngang với thanh */}
              <text
                x={xBar}
                y={y - 9}
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                {r.label}
              </text>
              {Array.from({ length: r.parts }).map((_, i) => (
                <rect
                  key={i}
                  x={xBar + i * segW}
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
                x={xBar - 8}
                y={y + rowH / 2 + 5}
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
              x1={xNgoac}
              y1={top - 2}
              x2={xNgoac}
              y2={top + safe.length * (rowH + gap) - gap + 2}
              stroke={P.violet}
              strokeWidth="3"
            />
            {dongNgoac.map((d, i) => (
              <text
                key={i}
                x={xNgoac + 10}
                y={top + 14 + i * 20}
                fontSize="14"
                fontWeight="800"
                fill={P.violet}
              >
                {d}
              </text>
            ))}
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
  // 360 thay vì 560: tên xe, vận tốc và quãng đường đều là chữ ngắn, không việc gì phải
  // rộng 560 đơn vị rồi bắt bé kéo ngang (xem `svgFit`).
  const W = VUA_HINH - 20;
  /**
   * 🔴 XẾP LẠI CHIỀU DỌC — số đo THẬT của từng thứ (font 26 emoji cao 28 trên / 7 dưới
   * đường chân chữ; chữ 14 cao 15 trên / 4 dưới):
   *   tiêu đề 22 · mũi tên 36 · tên xe 56 · emoji 90 · vận tốc 114 · trục 124 · quãng 150/170.
   * Bản cũ để tên xe ở `axisY − 52` và emoji ở `axisY − 34` ⇒ emoji cỡ 26 vươn tới
   * `axisY − 60`, **đè lên tên xe** 11–15 đơn vị ở cả 8 ca thật.
   */
  const H = 190;
  const axisY = 124;
  const x0 = 48;
  const x1 = W - 48;
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
          y="24"
          textAnchor="middle"
          fontSize="15"
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
          y={axisY - 68}
          textAnchor="middle"
          fontSize="14"
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
            fontSize="14"
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
          y={axisY - 68}
          textAnchor="middle"
          fontSize="14"
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
            fontSize="14"
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
          y1={axisY - 88}
          x2={m === "apart" || m === "chase" ? x0 + 92 : x0 + 92}
          y2={axisY - 88}
          stroke={P.blue}
          strokeWidth="3"
          markerEnd="url(#mdBlue)"
        />
        <line
          x1={x1 - 20}
          y1={axisY - 88}
          x2={x1 - 92}
          y2={axisY - 88}
          stroke={P.rose}
          strokeWidth="3"
          markerEnd={m === "toward" ? "url(#mdRose)" : undefined}
          markerStart={m === "toward" ? undefined : "url(#mdRose)"}
          transform={
            m === "toward"
              ? undefined
              : `rotate(180 ${(x1 - 20 + x1 - 92) / 2} ${axisY - 88})`
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

  // 350 thay vì 560 — biểu đồ chỉ 2–4 cột trong dữ liệu thật, không cần rộng gấp đôi thẻ.
  const W = 350;
  const TRUC_X = 52; // trục tung
  /**
   * 🔴 TIÊU ĐỀ DÀI PHẢI NGẮT DÒNG. Ca thật ở bài `g2-c14-l7`: "Số quyển vở đã quyên góp
   * (mỗi hình = 4 quyển)" — 46 ký tự ≈ 350 đơn vị, vẽ một dòng là tràn ra ngoài khung
   * (đo được: vượt 2,4 đơn vị). Ngắt dòng thì phải HẠ vùng vẽ xuống, nếu không tiêu đề
   * đè lên cột cao nhất.
   */
  const dongTieuDe = title ? ngatDong(title, 42) : [];
  const leTieuDe = dongTieuDe.length > 1 ? (dongTieuDe.length - 1) * 26 : 0;
  const H = 260 + leTieuDe;
  const baseY = H - 52;
  /**
   * 🔴 `topY = 58` chứ không phải 44: nhãn giá trị của cột CAO NHẤT nằm ở `topY − 8`, mà
   * tiêu đề chiếm tới y ≈ 28 ⇒ hể cột cao hết cỡ là **số đè lên tiêu đề** (đo được 5 px
   * chồng nhau ở cả 6 bài biểu đồ cột thật: `g2-c13-l3`, `g3-c15-l2`, `g4-c1-l12`…).
   */
  const topY = 58 + leTieuDe;
  const plotH = baseY - topY;
  const slot = (W - TRUC_X - 16) / safe.length;
  const barW = Math.min(slot * 0.56, 62);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Biểu đồ cột"
      >
        {dongTieuDe.length > 0 && (
          <text
            x={W / 2}
            y="24"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill={P.ink}
          >
            {dongTieuDe.map((d, i) => (
              <tspan key={i} x={W / 2} dy={i === 0 ? 0 : 18}>
                {d}
              </tspan>
            ))}
          </text>
        )}

        {/* Lưới ngang */}
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <g key={i}>
            <line
              x1={TRUC_X}
              y1={baseY - f * plotH}
              x2={W - 16}
              y2={baseY - f * plotH}
              stroke={P.grid}
              strokeWidth="1.6"
            />
            <text
              x={TRUC_X - 8}
              y={baseY - f * plotH + 5}
              textAnchor="end"
              fontSize="13"
              fill={P.soft}
            >
              {Math.round(maxV * f)}
            </text>
          </g>
        ))}

        <line
          x1={TRUC_X}
          y1={baseY}
          x2={W - 16}
          y2={baseY}
          stroke={P.ink}
          strokeWidth="2.5"
        />
        <line
          x1={TRUC_X}
          y1={baseY}
          x2={TRUC_X}
          y2={topY - 8}
          stroke={P.ink}
          strokeWidth="2.5"
        />

        {safe.map((it, i) => {
          const h = (it.value / maxV) * plotH;
          const cx = TRUC_X + slot * i + slot / 2;
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
                {unit ? `${it.value} ${unit}` : it.value}
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

  /**
   * 🔴 BÁNH VÀ CHÚ GIẢI PHẢI XẾP LẠI CHO HẸP. Bản cũ đặt bánh kính 96 ở `cx = 150` và
   * chú giải từ `x = 300`, tổng bề rộng ~520 đơn vị ⇒ trên điện thoại phải kéo ngang.
   * Nay bánh nhỏ hơn (r = 62) và chú giải sát ngay bên phải, cả hình gọn trong 360 đơn vị.
   * Chữ chú giải dài nhất trong dữ liệu là "Tìm tỉ số % của hai số" (23 ký tự ≈ 161).
   */
  const W = VUA_HINH - 20;
  /**
   * Tiêu đề cũng phải ngắt dòng: ca thật ở bài `g5-c2-l8` là "3/4 = 75% — tỉ số phần trăm
   * là phân số có mẫu 100" — 51 ký tự ≈ 380 đơn vị, vẽ một dòng thì tràn mỗi bên ~10 đơn vị.
   */
  const dongTieuDe = title ? ngatDong(title, 44) : [];
  const leTieuDe = dongTieuDe.length > 1 ? (dongTieuDe.length - 1) * 18 : 0;
  const cx = 102;
  const cy = 120 + leTieuDe;
  const r = 62;
  /**
   * 🔴 CHÚ GIẢI CŨNG PHẢI NGẮT DÒNG. Nhãn dài nhất trong dữ liệu là
   * "Đo lường & chuyển động" (bài `g5-c5-l6`) — 23 ký tự nhưng chữ có dấu nên đo thật
   * ra ~190 đơn vị, vượt khung 19,6 đơn vị khi vẽ một dòng bên phải bánh.
   */
  const RONG_CHU_GIAI = 8.3; // chữ 13 đậm — ĐO THẬT, đừng ước theo 7,0
  const xChuGiai = 184;
  const xNhan = xChuGiai + 22;
  const soKyTu = Math.max(8, Math.floor((W - xNhan - 6) / RONG_CHU_GIAI));
  const chuGiai = safe.map((it) =>
    ngatDong(`${it.label}: ${it.percent}%`, soKyTu),
  );
  const CAO_DONG_GIAI = 16;
  const caoMuc = chuGiai.map((d) => Math.max(30, d.length * CAO_DONG_GIAI + 8));
  const yMuc = [];
  let yc = 72;
  for (const h of caoMuc) {
    yMuc.push(yc);
    yc += h;
  }
  const H = Math.max(cy + r + 26, yc + 4);
  const start = -Math.PI / 2;
  let acc = 0;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Biểu đồ hình quạt"
      >
        {dongTieuDe.length > 0 && (
          <text
            x={W / 2}
            y="24"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill={P.ink}
          >
            {dongTieuDe.map((d, i) => (
              <tspan key={i} x={W / 2} dy={i === 0 ? 0 : 18}>
                {d}
              </tspan>
            ))}
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
              x={xChuGiai}
              y={yMuc[i] + 2}
              width="16"
              height="16"
              rx="5"
              fill={SEG[i % SEG.length]}
            />
            <text
              x={xNhan}
              y={yMuc[i] + 15}
              fontSize="13"
              fontWeight="700"
              fill={P.ink}
            >
              {chuGiai[i].map((d, li) => (
                <tspan key={li} x={xNhan} dy={li === 0 ? 0 : CAO_DONG_GIAI}>
                  {d}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
