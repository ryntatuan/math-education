/**
 * Bộ vẽ HÌNH cho nhóm SỐ và ĐO LƯỜNG — Giai đoạn 1 của kế hoạch hình ảnh bài học.
 *
 * VÌ SAO CÓ FILE NÀY. `LessonPage.jsx` đã có sẵn `ClockGraphic` và `ShapeGraphic` (5 hình
 * cơ bản) đọc từ dữ liệu, nhưng phần lớn chương trình không có cách vẽ nào: trục số, khung
 * 10 ô, khối chục–đơn vị, bảng hàng, thước đo, tiền Việt Nam, bảng số liệu.
 * Kết quả đo trước khi làm: **0/2438 slide có hình** — xem `scratch/kiem-tra-hinh-anh.mjs`.
 *
 * NGUYÊN TẮC CHUNG CỦA CẢ BỘ
 *  1. Tất cả vẽ bằng SVG nội tuyến, dùng `viewBox` + `width="100%"` ⇒ co giãn theo khung
 *     chứa, không có toạ độ cứng. Không tải ảnh từ mạng nên app vẫn chạy offline.
 *  2. Mọi tham số đều TUỲ CHỌN có mặc định hợp lý — dữ liệu thiếu khoá thì vẫn vẽ được
 *     một hình mẫu, KHÔNG ném lỗi và KHÔNG để trắng khung (bài học cũ: một giá trị lạ
 *     làm `ShapeGraphic` im lặng không vẽ gì).
 *  3. Số liệu trên hình LẤY TỪ DỮ LIỆU, không viết cứng — để hình luôn khớp nội dung bài.
 */

import { CARD_STYLE, CAPTION_STYLE } from "./visualTheme";

const PALETTE = {
  ink: "#1e293b",
  soft: "#64748b",
  line: "#94a3b8",
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
  grid: "#e2e8f0",
};

// Kiểu dáng dùng chung — xem `visualTheme.js` (không chép lại ở đây nữa).
const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const num = (v, fallback) =>
  Number.isFinite(Number(v)) ? Number(v) : fallback;

/* ─────────────────────────────── TRỤC SỐ (TIA SỐ) ───────────────────────────────
 * Dùng ở lớp 1–3: so sánh số, đếm thêm, cộng trừ trên tia, làm tròn số.
 *   numberLine: { from, to, step, marks: [..], hops: [{from, to, label}], label }
 * `hops` vẽ một vòng cung nhảy từ mốc này sang mốc khác — đúng cách SGK dạy "đếm thêm".
 */
export function NumberLine({
  from = 0,
  to = 10,
  step = 1,
  marks = [],
  hops = [],
  label = "",
}) {
  const a = num(from, 0);
  const b = Math.max(num(to, a + 10), a + 1);
  const s = Math.max(num(step, 1), 1);
  const W = 560;
  const H = hops.length ? 132 : 92;
  const padL = 26;
  const padR = 26;
  const axisY = H - 40;
  const span = b - a;
  const x = (v) => padL + ((v - a) / span) * (W - padL - padR);

  const ticks = [];
  for (let v = a; v <= b + 1e-9; v += s) ticks.push(Math.round(v * 1e6) / 1e6);
  const markSet = new Set(marks.map((m) => num(m, NaN)));

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Trục số"
      >
        <defs>
          <marker
            id="nlArrow"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="4.5"
            orient="auto"
          >
            <path d="M0,1 L9,4.5 L0,8 Z" fill={PALETTE.line} />
          </marker>
        </defs>

        <line
          x1={padL - 12}
          y1={axisY}
          x2={W - padR + 12}
          y2={axisY}
          stroke={PALETTE.line}
          strokeWidth="3"
          markerEnd="url(#nlArrow)"
        />

        {ticks.map((t) => {
          const hit = markSet.has(t);
          return (
            <g key={t}>
              <line
                x1={x(t)}
                y1={axisY - (hit ? 11 : 7)}
                x2={x(t)}
                y2={axisY + (hit ? 11 : 7)}
                stroke={hit ? PALETTE.blue : PALETTE.line}
                strokeWidth={hit ? 3 : 2}
              />
              <text
                x={x(t)}
                y={axisY + 30}
                textAnchor="middle"
                fontSize="15"
                fontWeight={hit ? 800 : 600}
                fill={hit ? PALETTE.blue : PALETTE.ink}
              >
                {t}
              </text>
            </g>
          );
        })}

        {hops.map((h, i) => {
          const x1 = x(num(h.from, a));
          const x2 = x(num(h.to, a));
          const r = Math.abs(x2 - x1) / 2;
          const right = x2 > x1;
          return (
            <g key={i}>
              <path
                d={`M${x1},${axisY - 12} A${r},${r} 0 0 ${right ? 1 : 0} ${x2},${axisY - 12}`}
                fill="none"
                stroke={PALETTE.violet}
                strokeWidth="2.5"
                strokeDasharray="5 4"
              />
              {h.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={axisY - 22 - r * 0.55}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill={PALETTE.violet}
                >
                  {h.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── KHUNG 10 Ô ───────────────────────────────
 * Cách SGK dạy "đếm thêm cho đủ 10" và "cộng qua 10". Bày sẵn từng ô vuông.
 *   tenFrame: { filled, total = 10, emoji = "🔴", extra = 0, label }
 * `extra` = số ô đã đầy TRƯỚC đó (để vẽ "7 ô đỏ + 3 ô xanh = 10").
 */
export function TenFrame({
  filled = 7,
  total = 10,
  emoji = "🔴",
  extra = 0,
  label = "",
}) {
  const t = clamp(num(total, 10), 1, 20);
  const f = clamp(num(filled, 0), 0, t);
  const e = clamp(num(extra, 0), 0, t - f);
  const perRow = t <= 10 ? 5 : 10;
  const rows = Math.ceil(t / perRow);
  const cell = 44;
  const W = perRow * cell + 4;
  const H = rows * cell + 4;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Khung 10 ô"
      >
        {Array.from({ length: t }).map((_, i) => {
          const r = Math.floor(i / perRow);
          const c = i % perRow;
          const on = i < f + e;
          const isExtra = i >= f && i < f + e;
          return (
            <g key={i}>
              <rect
                x={c * cell + 2}
                y={r * cell + 2}
                width={cell - 4}
                height={cell - 4}
                rx="7"
                fill={
                  !on
                    ? "#f8fafc"
                    : isExtra
                      ? PALETTE.greenSoft
                      : PALETTE.blueSoft
                }
                stroke={PALETTE.line}
                strokeWidth="2"
              />
              {on && (
                <>
                  <circle
                    cx={c * cell + cell / 2}
                    cy={r * cell + cell / 2}
                    r={cell * 0.28}
                    fill={isExtra ? PALETTE.green : PALETTE.blue}
                  />
                  <text
                    x={c * cell + cell / 2}
                    y={r * cell + cell / 2 + 5}
                    textAnchor="middle"
                    fontSize="15"
                  >
                    {emoji}
                  </text>
                </>
              )}
              {!on && (
                <text
                  x={c * cell + cell / 2}
                  y={r * cell + cell / 2 + 6}
                  textAnchor="middle"
                  fontSize="14"
                  fill={PALETTE.line}
                >
                  ○
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────── KHỐI CHỤC – ĐƠN VỊ (QUE TÍNH / KHỐI) ───────────────────────
 * Trực quan hoá "3 chục 4 đơn vị = 34". Mỗi chục là một thanh 10 ô; mỗi đơn vị một ô.
 *   baseTen: { tens, ones, label }
 */
export function BaseTenBlocks({ tens = 3, ones = 4, label = "" }) {
  const tn = clamp(num(tens, 0), 0, 9);
  const on = clamp(num(ones, 0), 0, 9);
  const rodW = 22;
  const rodH = 132;
  const gap = 14;
  const oneS = 22;
  const oneGap = 5;
  const W = tn * (rodW + gap) + on * (oneS + oneGap) + 40;
  const H = rodH + 58;

  const rodTop = (i) =>
    Array.from({ length: 10 }).map((_, k) => (
      <rect
        key={k}
        x={10 + i * (rodW + gap)}
        y={18 + k * (rodH / 10)}
        width={rodW}
        height={rodH / 10 - 2}
        rx="3"
        fill={PALETTE.amberSoft}
        stroke={PALETTE.amber}
        strokeWidth="1.6"
      />
    ));

  const onesStart = 10 + tn * (rodW + gap) + (tn ? gap : 0);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${Math.max(W, 220)} ${H}`}
        width="100%"
        role="img"
        aria-label="Khối chục và đơn vị"
      >
        {Array.from({ length: tn }).map((_, i) => (
          <g key={`t${i}`}>{rodTop(i)}</g>
        ))}
        {Array.from({ length: tn }).map((_, i) => (
          <text
            key={`tl${i}`}
            x={10 + i * (rodW + gap) + rodW / 2}
            y={rodH + 40}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={PALETTE.amber}
          >
            10
          </text>
        ))}
        {Array.from({ length: on }).map((_, i) => (
          <g key={`o${i}`}>
            <rect
              x={onesStart + i * (oneS + oneGap)}
              y={18 + rodH - oneS}
              width={oneS}
              height={oneS}
              rx="4"
              fill={PALETTE.blueSoft}
              stroke={PALETTE.blue}
              strokeWidth="1.6"
            />
            <text
              x={onesStart + i * (oneS + oneGap) + oneS / 2}
              y={rodH + 40}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={PALETTE.blue}
            >
              1
            </text>
          </g>
        ))}
      </svg>
      <span style={caption}>
        {tn} chục và {on} đơn vị = <b>{tn * 10 + on}</b>
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}

/* ─────────────────────────────── BẢNG HÀNG ───────────────────────────────
 * Dùng cho lớp 2–5: đọc/viết số, cấu tạo số, hàng của số thập phân.
 *   placeValue: { headers: ["Trăm","Chục","Đơn vị"], digits: [3,4,5], highlight: 1, label }
 */
export function PlaceValueTable({
  headers = ["Trăm", "Chục", "Đơn vị"],
  digits = [3, 4, 5],
  highlight = -1,
  label = "",
}) {
  const hs =
    Array.isArray(headers) && headers.length
      ? headers
      : ["Trăm", "Chục", "Đơn vị"];
  const ds = Array.isArray(digits) ? digits.slice(0, hs.length) : [];
  const W = 96 * hs.length + 16;
  const cellW = 96;
  const H = 132;
  const hi = num(highlight, -1);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Bảng hàng"
      >
        {hs.map((h, i) => (
          <g key={i}>
            <rect
              x={8 + i * cellW}
              y={10}
              width={cellW - 6}
              height={38}
              rx="8"
              fill={PALETTE.violetSoft}
              stroke={PALETTE.violet}
              strokeWidth="2"
            />
            <text
              x={8 + i * cellW + (cellW - 6) / 2}
              y={35}
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={PALETTE.violet}
            >
              {h}
            </text>
            <rect
              x={8 + i * cellW}
              y={48}
              width={cellW - 6}
              height={66}
              rx="8"
              fill={i === hi ? PALETTE.amberSoft : PALETTE.paper}
              stroke={i === hi ? PALETTE.amber : PALETTE.grid}
              strokeWidth={i === hi ? 3 : 2}
            />
            <text
              x={8 + i * cellW + (cellW - 6) / 2}
              y={94}
              textAnchor="middle"
              fontSize="34"
              fontWeight="800"
              fill={i === hi ? PALETTE.amber : PALETTE.ink}
            >
              {ds[i] ?? "–"}
            </text>
          </g>
        ))}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── THƯỚC ĐO ───────────────────────────────
 * Dạy đo độ dài lớp 1–3. Vẽ vạch cm (và nửa cm), có thể khoanh đoạn đang đo.
 *   ruler: { lengthCm = 10, measure: { from: 0, to: 6 }, unit = "cm", label }
 */
export function Ruler({
  lengthCm = 10,
  measure = null,
  unit = "cm",
  label = "",
}) {
  const L = clamp(num(lengthCm, 10), 2, 30);
  const pxPerCm = clamp(520 / L, 18, 56);
  const W = L * pxPerCm + 44;
  const H = 108;
  const y = 52;
  const mFrom = measure ? clamp(num(measure.from, 0), 0, L) : null;
  const mTo = measure ? clamp(num(measure.to, 0), 0, L) : null;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Thước đo"
      >
        <rect
          x="16"
          y={y}
          width={L * pxPerCm + 12}
          height="34"
          rx="5"
          fill="#fdf6e3"
          stroke={PALETTE.amber}
          strokeWidth="2.5"
        />
        {Array.from({ length: L * 2 + 1 }).map((_, i) => {
          const half = i % 2 === 1;
          const cm = i / 2;
          const X = 22 + cm * pxPerCm;
          return (
            <g key={i}>
              <line
                x1={X}
                y1={y}
                x2={X}
                y2={y + (half ? 9 : 16)}
                stroke={PALETTE.ink}
                strokeWidth={half ? 1.2 : 2}
              />
              {!half && (
                <text
                  x={X}
                  y={y + 30}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={PALETTE.ink}
                >
                  {cm}
                </text>
              )}
            </g>
          );
        })}
        <text
          x={W - 30}
          y={y + 22}
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={PALETTE.amber}
        >
          {unit}
        </text>

        {mFrom !== null && mTo !== null && mTo !== mFrom && (
          <g>
            <line
              x1={22 + mFrom * pxPerCm}
              y1={y - 14}
              x2={22 + mTo * pxPerCm}
              y2={y - 14}
              stroke={PALETTE.rose}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text
              x={22 + ((mFrom + mTo) / 2) * pxPerCm}
              y={y - 22}
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={PALETTE.rose}
            >
              {Math.round((mTo - mFrom) * 10) / 10} {unit}
            </text>
          </g>
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────────── TIỀN VIỆT NAM ───────────────────────────────
 * Lớp 2 (CĐ 11) và lớp 3 (CĐ 13) có hẳn bài về tiền.
 *   money: { notes: [20000, 5000, 2000], label }
 */
const NOTE_STYLE = {
  500: { bg: "#fee2e2", bd: "#dc2626" },
  1000: { bg: "#ede9fe", bd: "#7c3aed" },
  2000: { bg: "#fce7f3", bd: "#db2777" },
  5000: { bg: "#fef3c7", bd: "#d97706" },
  10000: { bg: "#dcfce7", bd: "#16a34a" },
  20000: { bg: "#dbeafe", bd: "#2563eb" },
  50000: { bg: "#e0e7ff", bd: "#4f46e5" },
  100000: { bg: "#ccfbf1", bd: "#0d9488" },
  200000: { bg: "#ffe4e6", bd: "#e11d48" },
  500000: { bg: "#f3e8ff", bd: "#9333ea" },
};

export function Money({ notes = [20000, 5000], label = "" }) {
  const ds = (Array.isArray(notes) ? notes : [])
    .map((n) => num(n, 0))
    .filter((n) => n > 0)
    .slice(0, 6);
  const shown = ds.length ? ds : [20000];
  const total = shown.reduce((s, n) => s + n, 0);
  const thousands = (n) =>
    n >= 1000 ? `${(n / 1000).toLocaleString("vi-VN")} 000` : `${n}`;

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {shown.map((n, i) => {
          const st = NOTE_STYLE[n] || { bg: "#f1f5f9", bd: PALETTE.line };
          return (
            <div
              key={i}
              style={{
                background: st.bg,
                border: `2.5px solid ${st.bd}`,
                borderRadius: 12,
                padding: "12px 16px",
                minWidth: 116,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: st.bd,
                  whiteSpace: "nowrap",
                }}
              >
                {thousands(n)}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: st.bd,
                  opacity: 0.85,
                }}
              >
                đồng
              </div>
            </div>
          );
        })}
      </div>
      <span style={caption}>
        Tổng: <b>{total.toLocaleString("vi-VN")} đồng</b>
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}

/* ─────────────────────────────── BẢNG SỐ LIỆU / BẢNG ĐƠN VỊ ───────────────────────────────
 * Lớp 2–5: biểu đồ tranh quy về bảng số liệu, bảng đơn vị đo, bảng thống kê.
 *   table: { headers: ["Đối tượng","Số lượng"], rows: [["Bóng đá", 12], ["Cầu lông", 8]], label }
 */
/**
 * Ngắt một chuỗi thành nhiều dòng vừa bề rộng ô.
 *
 * 🔴 VÌ SAO PHẢI TỰ NGẮT: SVG KHÔNG có tính năng tự xuống dòng như HTML — thẻ `<text>`
 * vẽ một dòng thẳng, chữ dài thì tràn ra ngoài ô và ĐÈ LÊN ô bên cạnh. Đã ĐO được thật
 * ở bài `g5-c4-l6`: ô "khoảng cách ban đầu : (v1 + v2)" dài ~33 ký tự, vẽ trong ô rộng
 * 132 px nên chữ chồng lên cột kế tiếp, không đọc được. Trước đó bảng luôn dùng bề rộng
 * cột CỐ ĐỊNH 132 px cho mọi nội dung, nên bảng nào có chữ dài cũng hỏng.
 *
 * Từ dài hơn cả ô (ví dụ tên không có dấu cách) thì cắt cứng để không tràn ra ngoài.
 */
function bocChu(giaTri, soKyTu) {
  const raw = String(giaTri ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (!raw) return [""];
  const gioiHan = Math.max(4, soKyTu);
  const dong = [];
  let cur = "";
  for (let tu of raw.split(" ")) {
    while (tu.length > gioiHan) {
      if (cur) {
        dong.push(cur);
        cur = "";
      }
      dong.push(tu.slice(0, gioiHan));
      tu = tu.slice(gioiHan);
    }
    const thu = cur ? `${cur} ${tu}` : tu;
    if (thu.length <= gioiHan) cur = thu;
    else {
      if (cur) dong.push(cur);
      cur = tu;
    }
  }
  if (cur) dong.push(cur);
  return dong.length ? dong : [""];
}

// Ước lượng bề rộng 1 ký tự ở cỡ chữ 15 đậm 700 (đủ dùng cho tiếng Việt có dấu).
const RONG_KY_TU = 7.6;
const LOT_O = 10; // lề trong mỗi ô
const CAO_DONG = 18;
const COT_MIN = 78;
const COT_MAX = 300;

export function Table({ headers = [], rows = [], label = "" }) {
  const hs = Array.isArray(headers) ? headers : [];
  const rs = Array.isArray(rows) ? rows : [];
  const soCot = Math.max(
    hs.length,
    ...rs.map((r) => (Array.isArray(r) ? r.length : 0)),
    1,
  );

  // Bề rộng mỗi cột = vừa đủ cho nội dung DÀI NHẤT của cột đó (trong khoảng cho phép).
  const beRongCot = Array.from({ length: soCot }, (_, c) => {
    let dai = String(hs[c] ?? "").length;
    for (const r of rs) {
      const o = Array.isArray(r) ? r : [r];
      dai = Math.max(dai, String(o[c] ?? "").length);
    }
    return clamp(Math.round(dai * RONG_KY_TU) + LOT_O * 2, COT_MIN, COT_MAX);
  });

  const mocX = [];
  let chay = 6;
  for (const w of beRongCot) {
    mocX.push(chay);
    chay += w;
  }
  const W = chay + 6;

  // Mỗi dòng cao theo ô có nhiều dòng chữ nhất.
  const hang = [];
  hang.push({
    o: Array.from({ length: soCot }, (_, c) =>
      bocChu(hs[c], Math.floor((beRongCot[c] - LOT_O * 2) / RONG_KY_TU)),
    ),
    dauBang: true,
  });
  for (const r of rs) {
    const o = Array.isArray(r) ? r : [r];
    hang.push({
      o: Array.from({ length: soCot }, (_, c) =>
        bocChu(o[c], Math.floor((beRongCot[c] - LOT_O * 2) / RONG_KY_TU)),
      ),
      dauBang: false,
    });
  }
  const caoHang = hang.map(
    (h) => Math.max(...h.o.map((d) => d.length)) * CAO_DONG + LOT_O * 2,
  );
  const H = 6 + caoHang.reduce((a, b) => a + b, 0) + 8;

  let y = 6;
  const hangVe = hang.map((h, i) => {
    const cao = caoHang[i];
    const node = { ...h, y, cao };
    y += cao;
    return node;
  });

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label="Bảng số liệu"
      >
        {hangVe.map((h, ri) =>
          h.o.map((dong, c) => {
            const x = mocX[c];
            const rong = beRongCot[c] - 4;
            const giua = x + rong / 2;
            const yDongDau =
              h.y + h.cao / 2 - ((dong.length - 1) * CAO_DONG) / 2 + 5;
            return (
              <g key={`${ri}-${c}`}>
                <rect
                  x={x}
                  y={h.y}
                  width={rong}
                  height={h.cao}
                  rx={h.dauBang ? 7 : 6}
                  fill={
                    h.dauBang
                      ? PALETTE.greenSoft
                      : ri % 2
                        ? "#f8fafc"
                        : PALETTE.paper
                  }
                  stroke={h.dauBang ? PALETTE.green : PALETTE.grid}
                  strokeWidth={h.dauBang ? 2 : 1.6}
                />
                <text
                  x={giua}
                  y={yDongDau}
                  textAnchor="middle"
                  fontSize={h.dauBang ? 14 : 15}
                  fontWeight={h.dauBang ? 800 : 700}
                  fill={h.dauBang ? PALETTE.green : PALETTE.ink}
                >
                  {dong.map((ln, li) => (
                    <tspan key={li} x={giua} dy={li === 0 ? 0 : CAO_DONG}>
                      {ln}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}
