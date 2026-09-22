/**
 * Bộ vẽ HÌNH HỌC — Giai đoạn 1 của kế hoạch hình ảnh bài học.
 *
 * `ShapeGraphic` cũ chỉ có 5 hình (vuông, tròn, tam giác, chữ nhật, lập phương) và KHÔNG
 * ghi được số đo cạnh — mà lớp 3 dạy chu vi/diện tích, lớp 4 dạy hình bình hành, hình thoi,
 * hình thang, góc, lớp 5 dạy hình tròn và hình khối. File này bù đúng chỗ đó.
 *
 * Nguyên tắc giống `CoreVisuals.jsx`: SVG nội tuyến + `viewBox` + `width="100%"`; mọi tham
 * số có mặc định; KHÔNG bao giờ để trắng khung vì một giá trị lạ.
 */

import { CARD_STYLE, CAPTION_STYLE, svgFit, ngatDong } from "./visualTheme";

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

// Kiểu dáng dùng chung — xem `visualTheme.js`.
const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/* Danh sách hình phẳng được hỗ trợ. Tên hiển thị lấy từ đây nên KHÔNG BAO GIỜ trắng khung. */
const PLANE = {
  square: "Hình vuông",
  rectangle: "Hình chữ nhật",
  triangle: "Hình tam giác",
  parallelogram: "Hình bình hành",
  rhombus: "Hình thoi",
  trapezoid: "Hình thang",
  circle: "Hình tròn",
};

/* Toạ độ đỉnh cho từng hình, trên khung 320×240. */
const SHAPE_POINTS = {
  /**
   * 🔴 HÌNH VUÔNG PHẢI LÀ HÌNH VUÔNG THẬT. Bản cũ để [70,40]–[250,40]–[250,180]–[70,180]
   * = **180 × 140** — tức là một HÌNH CHỮ NHẬT dán nhãn "Hình vuông". Người dùng nhìn màn
   * hình rồi báo (bài `g1-c2-l5`: "diễn giải hình vuông nhưng lại đang vẽ hình chữ nhật"),
   * và lỗi này nằm ở **17 chỗ** của cả 5 lớp — trong đó có bài dạy "diện tích hình vuông =
   * cạnh × cạnh", nơi hình vẽ sai làm hỏng luôn ý niệm cạnh × cạnh.
   * Nay: 80→240 ngang và 30→190 dọc, đúng **160 × 160**.
   */
  square: [
    [80, 30],
    [240, 30],
    [240, 190],
    [80, 190],
  ],
  rectangle: [
    [50, 50],
    [270, 50],
    [270, 170],
    [50, 170],
  ],
  triangle: [
    [160, 30],
    [275, 185],
    [45, 185],
  ],
  parallelogram: [
    [95, 45],
    [280, 45],
    [225, 180],
    [40, 180],
  ],
  rhombus: [
    [160, 32],
    [280, 110],
    [160, 188],
    [40, 110],
  ],
  trapezoid: [
    [98, 45],
    [222, 45],
    [280, 180],
    [40, 180],
  ],
};

const FILL = {
  square: [P.blueSoft, P.blue],
  rectangle: [P.blueSoft, P.blue],
  triangle: [P.roseSoft, P.rose],
  parallelogram: [P.amberSoft, P.amber],
  rhombus: [P.amberSoft, P.amber],
  trapezoid: [P.greenSoft, P.green],
  circle: [P.amberSoft, P.amber],
};

/* ─────────────────────────── HÌNH PHẲNG (có ghi số đo) ───────────────────────────
 * planeShape: {
 *   kind: "square"|"rectangle"|"triangle"|"parallelogram"|"rhombus"|"trapezoid"|"circle",
 *   labels: ["8 cm", "5 cm", ...],   // ghi lần lượt lên các cạnh
 *   formula: "S = 8 × 5 = 40 cm²",
 *   showName: true
 * }
 * `labels` ghi số đo lên cạnh theo thứ tự — đúng cách SGK đánh số vào hình khi dạy
 * chu vi và diện tích.
 */
export function PlaneShape({
  kind = "rectangle",
  labels = [],
  formula = "",
  showName = true,
  radiusLabel = "",
  /**
   * Đánh dấu ĐỈNH: chấm tròn ở mỗi đỉnh + nhãn "đỉnh".
   * 🔴 VÌ SAO CẦN: lời giảng nói "3 cạnh · 3 đỉnh" nhưng hình chỉ ghi chữ "cạnh" — người
   * dùng báo ở bài `g1-c2-l3` ("chỉ có cạnh chứ không có đỉnh"). Trẻ phải ĐẾM ĐƯỢC đỉnh
   * trên hình, không chỉ đọc chữ.
   */
  vertices = false,
  vertexLabel = "đỉnh",
}) {
  const k = PLANE[kind] ? kind : "rectangle";
  const [fill, stroke] = FILL[k];
  const lb = Array.isArray(labels) ? labels : [];
  const pts = SHAPE_POINTS[k];

  // Vị trí ghi nhãn: giữa mỗi cạnh.
  const edgeMid = (i) => {
    if (k === "circle") return null;
    const a = pts[i % pts.length];
    const b = pts[(i + 1) % pts.length];
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  };

  return (
    <div style={card}>
      <svg
        viewBox="0 0 320 240"
        {...svgFit(320)}
        role="img"
        aria-label={PLANE[k]}
      >
        {k === "circle" ? (
          <>
            <circle
              cx="160"
              cy="115"
              r="78"
              fill={fill}
              stroke={stroke}
              strokeWidth="3"
            />
            <circle cx="160" cy="115" r="3.5" fill={stroke} />
            {(radiusLabel || lb[0]) && (
              <>
                <line
                  x1="160"
                  y1="115"
                  x2="238"
                  y2="115"
                  stroke={stroke}
                  strokeWidth="2.4"
                  strokeDasharray="6 4"
                />
                <text
                  x="199"
                  y="107"
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill={stroke}
                >
                  {radiusLabel || lb[0]}
                </text>
              </>
            )}
          </>
        ) : (
          <polygon
            points={pts.map((p) => p.join(",")).join(" ")}
            fill={fill}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        )}

        {k !== "circle" && vertices && (
          <>
            {pts.map(([vx, vy], i) => (
              <circle
                key={`v${i}`}
                cx={vx}
                cy={vy}
                r="5.5"
                fill={stroke}
                stroke={P.paper}
                strokeWidth="2"
              />
            ))}
            {vertexLabel && (
              <text
                x={pts[0][0] - 8}
                y={pts[0][1] - 6}
                textAnchor="end"
                fontSize="15"
                fontWeight="800"
                fill={stroke}
              >
                {vertexLabel}
              </text>
            )}
          </>
        )}

        {k !== "circle" &&
          lb.map((t, i) => {
            const m = edgeMid(i);
            if (!m || !t) return null;
            return (
              <g key={i}>
                <rect
                  x={m[0] - 30}
                  y={m[1] - 13}
                  width="60"
                  height="24"
                  rx="7"
                  fill={P.paper}
                  opacity="0.92"
                />
                <text
                  x={m[0]}
                  y={m[1] + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="800"
                  fill={stroke}
                >
                  {t}
                </text>
              </g>
            );
          })}

        {showName && (
          <text
            x="160"
            y="228"
            textAnchor="middle"
            fontSize="16"
            fontWeight="800"
            fill={P.ink}
          >
            {PLANE[k]}
          </text>
        )}
      </svg>
      {formula && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
          {formula}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────── GÓC ───────────────────────────
 * angle: { kind: "acute"|"right"|"obtuse"|"straight", degrees, label, showSquare }
 * Lớp 4 (Chương 2) học góc nhọn, góc tù, góc bẹt, góc vuông.
 */
const ANGLE_DEF = {
  acute: { deg: 55, name: "Góc nhọn", color: P.rose, note: "bé hơn góc vuông" },
  right: { deg: 90, name: "Góc vuông", color: P.blue, note: "bằng góc vuông" },
  obtuse: {
    deg: 125,
    name: "Góc tù",
    color: P.amber,
    note: "lớn hơn góc vuông, bé hơn góc bẹt",
  },
  straight: {
    deg: 180,
    name: "Góc bẹt",
    color: P.violet,
    note: "bằng hai góc vuông",
  },
};

export function Angle({ kind = "right", degrees = null, label = "" }) {
  const def = ANGLE_DEF[kind] || ANGLE_DEF.right;
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
        viewBox="0 0 340 220"
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

        <text
          x={170}
          y="212"
          textAnchor="middle"
          fontSize="17"
          fontWeight="800"
          fill={def.color}
        >
          {def.name}
        </text>
      </svg>
      <span style={caption}>
        {def.note}
        {label ? ` · ${label}` : ""}
      </span>
    </div>
  );
}

/* ─────────────────────────── HÌNH TRÒN: TÂM, BÁN KÍNH, ĐƯỜNG KÍNH ───────────────────────────
 * circleParts: { radius: 4, diameter: 8, showCenter, showCircumference, label }
 * Lớp 3 (CĐ 3) và lớp 5 (CĐ 3 – chu vi, diện tích hình tròn).
 */
export function CircleParts({
  radius = null,
  diameter = null,
  showCenter = true,
  showCircumference = false,
  label = "",
}) {
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
          bán kính
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
          bán kính
        </text>

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
              O
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

/* ─────────────────────────── HÌNH KHỐI ───────────────────────────
 * solid: { kind: "cube"|"cuboid"|"cylinder"|"sphere", dims: {a,b,c}, label, formula }
 * Lớp 1 (CĐ 4) và lớp 2 (CĐ 9) chỉ nhận biết; lớp 5 (CĐ 3) tính diện tích và thể tích.
 */
const SOLID_NAME = {
  cube: "Khối lập phương",
  cuboid: "Khối hộp chữ nhật",
  cylinder: "Khối trụ",
  sphere: "Khối cầu",
};

export function Solid({
  kind = "cuboid",
  dims = null,
  label = "",
  formula = "",
}) {
  const k = SOLID_NAME[kind] ? kind : "cuboid";
  // Cùng lý do như `MotionDiagram`: mặc định `= {}` không chặn `null`.
  const D = dims && typeof dims === "object" ? dims : {};
  const a = num(D.a, 0);
  const b = num(D.b, 0);
  const c = num(D.c, 0);

  const dimText =
    k === "cube"
      ? a
        ? `cạnh ${a}`
        : ""
      : k === "cuboid"
        ? a && b && c
          ? `dài ${a}, rộng ${b}, cao ${c}`
          : ""
        : "";

  return (
    <div style={card}>
      <svg
        viewBox="0 0 340 250"
        {...svgFit(340)}
        role="img"
        aria-label={SOLID_NAME[k]}
      >
        {k === "cube" || k === "cuboid" ? (
          <>
            <polygon
              points="60,95 200,95 200,215 60,215"
              fill={P.blueSoft}
              stroke={P.blue}
              strokeWidth="3"
            />
            <polygon
              points="60,95 120,50 260,50 200,95"
              fill={P.amberSoft}
              stroke={P.amber}
              strokeWidth="3"
            />
            <polygon
              points="200,95 260,50 260,170 200,215"
              fill={P.roseSoft}
              stroke={P.rose}
              strokeWidth="3"
            />
            <line
              x1="60"
              y1="95"
              x2="60"
              y2="215"
              stroke={P.blue}
              strokeWidth="3"
            />
            {k === "cube" && (
              // ⚠️ Căn giữa theo BỀ RỘNG KHUNG (170), không phải 130: câu này dài 36 ký tự
              // (≈278 đơn vị) nên tâm ở 130 làm mép trái vượt ra ngoài khung 8,9 đơn vị.
              <text
                x="170"
                y="240"
                textAnchor="middle"
                fontSize="15"
                fontWeight="800"
                fill={P.ink}
              >
                Sáu mặt đều là hình vuông
              </text>
            )}
          </>
        ) : k === "cylinder" ? (
          <>
            <ellipse
              cx="170"
              cy="70"
              rx="66"
              ry="24"
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="3"
            />
            <rect
              x="104"
              y="70"
              width="132"
              height="118"
              fill={P.greenSoft}
              stroke="none"
            />
            <line
              x1="104"
              y1="70"
              x2="104"
              y2="188"
              stroke={P.green}
              strokeWidth="3"
            />
            <line
              x1="236"
              y1="70"
              x2="236"
              y2="188"
              stroke={P.green}
              strokeWidth="3"
            />
            <ellipse
              cx="170"
              cy="188"
              rx="66"
              ry="24"
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="3"
            />
            <text
              x="170"
              y="238"
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={P.ink}
            >
              Hai đáy là hình tròn bằng nhau
            </text>
          </>
        ) : (
          <>
            <circle cx="170" cy="128" r="80" fill={P.violet} opacity="0.18" />
            <circle
              cx="170"
              cy="128"
              r="80"
              fill="none"
              stroke={P.violet}
              strokeWidth="3"
            />
            <ellipse
              cx="170"
              cy="128"
              rx="80"
              ry="30"
              fill="none"
              stroke={P.violet}
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <ellipse
              cx="170"
              cy="128"
              rx="30"
              ry="80"
              fill="none"
              stroke={P.violet}
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <text
              x="170"
              y="240"
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={P.ink}
            >
              Tròn xoe như quả bóng
            </text>
          </>
        )}

        <text
          x="170"
          y="26"
          textAnchor="middle"
          fontSize="17"
          fontWeight="800"
          fill={P.ink}
        >
          {SOLID_NAME[k]}
        </text>
      </svg>
      {dimText && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
          {dimText}
        </span>
      )}
      {formula && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
          {formula}
        </span>
      )}
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ────────────────── ĐỒ VẬT CÓ DẠNG HÌNH (nhận biết hình trong đồ vật) ──────────────────
 * shapePicture: { kind: "book"|"clock"|"brick"|"roof"|"window"|"wheel"|"door"|"board"|"ball"|"house",
 *                 windows, note, showShape }
 *
 * 🔴 VÌ SAO CẦN. Chủ đề "Nhận biết các hình trong đồ vật quanh em" (Lớp 1 CĐ 2) trước đây chỉ
 * có EMOJI nhỏ nằm trong câu chữ (📕 ⭕ 🔺) — người dùng báo nguyên văn: "mô tả quyển sách quá
 * nhỏ, trẻ không thể nhìn thấy được". Đồ vật phải được VẼ TO, đúng hình dạng, kèm TÊN HÌNH,
 * để trẻ nhìn là thấy ngay hình dạng đó.
 *
 * Mọi hình do app tự vẽ bằng SVG (không dùng ảnh của sách nào) nên không vướng bản quyền.
 */
const DO_VAT = {
  book: { ten: "Quyển sách", hinh: "Hình chữ nhật", mau: P.blue },
  clock: { ten: "Mặt đồng hồ", hinh: "Hình tròn", mau: P.amber },
  brick: { ten: "Viên gạch lát nền", hinh: "Hình vuông", mau: P.blue },
  roof: { ten: "Mái nhà", hinh: "Hình tam giác", mau: P.rose },
  window: { ten: "Cửa sổ", hinh: "Hình vuông", mau: P.blue },
  wheel: { ten: "Bánh xe", hinh: "Hình tròn", mau: P.ink },
  door: { ten: "Cửa ra vào", hinh: "Hình chữ nhật", mau: P.amber },
  board: { ten: "Mặt bàn", hinh: "Hình chữ nhật", mau: P.amber },
  ball: { ten: "Quả bóng", hinh: "Hình tròn", mau: P.rose },
  house: {
    ten: "Ngôi nhà",
    hinh: "Tam giác (mái) · chữ nhật (thân) · vuông (cửa sổ)",
    mau: P.violet,
  },
};

/** Vẽ một đồ vật trong khung 300 × 200 (phần trên của viewBox). */
function VeDoVat({ kind, windows }) {
  const nWin = clamp(num(windows, 2), 0, 4);
  if (kind === "book")
    return (
      <>
        <rect
          x="55"
          y="35"
          width="190"
          height="130"
          rx="8"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="5"
        />
        <rect x="55" y="35" width="28" height="130" rx="8" fill={P.blue} />
        <rect
          x="248"
          y="48"
          width="14"
          height="104"
          rx="4"
          fill={P.paper}
          stroke={P.blue}
          strokeWidth="3"
        />
      </>
    );
  if (kind === "clock")
    return (
      <>
        <circle
          cx="150"
          cy="100"
          r="76"
          fill={P.paper}
          stroke={P.amber}
          strokeWidth="9"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const g = (i / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={i}
              x1={150 + 62 * Math.cos(g)}
              y1={100 + 62 * Math.sin(g)}
              x2={150 + 71 * Math.cos(g)}
              y2={100 + 71 * Math.sin(g)}
              stroke={P.amber}
              strokeWidth="3"
            />
          );
        })}
        <line
          x1="150"
          y1="100"
          x2="150"
          y2="58"
          stroke={P.ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="150"
          y1="100"
          x2="186"
          y2="100"
          stroke={P.ink}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="150" cy="100" r="6" fill={P.ink} />
      </>
    );
  if (kind === "brick")
    return (
      <>
        <rect
          x="75"
          y="22"
          width="150"
          height="150"
          rx="6"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="5"
        />
        <line x1="80" y1="72" x2="220" y2="72" stroke={P.paper} strokeWidth="3" />
        <line x1="80" y1="122" x2="220" y2="122" stroke={P.paper} strokeWidth="3" />
        <line x1="150" y1="27" x2="150" y2="72" stroke={P.paper} strokeWidth="3" />
        <line x1="112" y1="72" x2="112" y2="122" stroke={P.paper} strokeWidth="3" />
        <line x1="188" y1="72" x2="188" y2="122" stroke={P.paper} strokeWidth="3" />
        <line x1="150" y1="122" x2="150" y2="167" stroke={P.paper} strokeWidth="3" />
      </>
    );
  if (kind === "roof")
    return (
      <>
        <rect x="192" y="52" width="24" height="46" fill={P.amber} rx="3" />
        <polygon
          points="55,148 150,32 245,148"
          fill={P.roseSoft}
          stroke={P.rose}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </>
    );
  if (kind === "window")
    return (
      <>
        <rect
          x="80"
          y="20"
          width="140"
          height="140"
          rx="4"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="6"
        />
        <line x1="150" y1="22" x2="150" y2="158" stroke={P.blue} strokeWidth="4" />
        <line x1="82" y1="90" x2="218" y2="90" stroke={P.blue} strokeWidth="4" />
      </>
    );
  if (kind === "wheel")
    return (
      <>
        <circle
          cx="150"
          cy="100"
          r="76"
          fill={P.paper}
          stroke={P.ink}
          strokeWidth="14"
        />
        <circle
          cx="150"
          cy="100"
          r="46"
          fill="none"
          stroke={P.soft}
          strokeWidth="3"
        />
        {Array.from({ length: 6 }).map((_, i) => {
          const g = (i / 6) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={150 + 10 * Math.cos(g)}
              y1={100 + 10 * Math.sin(g)}
              x2={150 + 46 * Math.cos(g)}
              y2={100 + 46 * Math.sin(g)}
              stroke={P.soft}
              strokeWidth="3"
            />
          );
        })}
        <circle cx="150" cy="100" r="10" fill={P.soft} />
      </>
    );
  if (kind === "door")
    return (
      <>
        <rect
          x="95"
          y="15"
          width="110"
          height="160"
          rx="4"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="5"
        />
        <circle cx="186" cy="98" r="7" fill={P.amber} />
      </>
    );
  if (kind === "board")
    return (
      <>
        <rect
          x="45"
          y="35"
          width="210"
          height="100"
          rx="6"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="5"
        />
        <line x1="70" y1="135" x2="58" y2="182" stroke={P.amber} strokeWidth="6" />
        <line x1="230" y1="135" x2="242" y2="182" stroke={P.amber} strokeWidth="6" />
      </>
    );
  if (kind === "ball")
    return (
      <>
        <circle
          cx="150"
          cy="100"
          r="76"
          fill={P.roseSoft}
          stroke={P.rose}
          strokeWidth="6"
        />
        <path
          d="M104,66 Q150,40 196,66"
          fill="none"
          stroke={P.paper}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M104,134 Q150,160 196,134"
          fill="none"
          stroke={P.rose}
          strokeWidth="4"
          strokeDasharray="8 6"
        />
      </>
    );
  // house: mái tam giác + thân chữ nhật + N cửa sổ vuông (đúng như lời giảng)
  const dauCuaSo = 150 - (nWin * 44 - 8) / 2;
  return (
    <>
      <polygon
        points="50,112 150,22 250,112"
        fill={P.roseSoft}
        stroke={P.rose}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect
        x="72"
        y="112"
        width="156"
        height="86"
        fill={P.blueSoft}
        stroke={P.blue}
        strokeWidth="5"
      />
      {Array.from({ length: nWin }).map((_, i) => (
        <rect
          key={i}
          x={dauCuaSo + i * 44}
          y="132"
          width="36"
          height="36"
          rx="3"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="4"
        />
      ))}
    </>
  );
}

export function ShapePicture({
  kind = "book",
  windows = 2,
  note = "",
  showShape = true,
}) {
  const k = DO_VAT[kind] ? kind : "book";
  const { ten, hinh, mau } = DO_VAT[k];
  /**
   * 🔴 NHÃN TÊN HÌNH PHẢI NGẮT DÒNG. Ca thật `g1-c2-l7`: "Tam giác (mái) · chữ nhật
   * (thân) · vuông (cửa sổ)" — 49 ký tự ≈ 380 đơn vị trong khung rộng 300 ⇒ **tràn ra
   * ngoài 32 đơn vị mỗi bên** (phép đo trên trang hình thật bắt được ngay).
   */
  const dongHinh = showShape && hinh ? ngatDong(hinh, 34) : [];
  const H = 262 + Math.max(0, dongHinh.length - 1) * 22;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 300 ${H}`}
        {...svgFit(300)}
        role="img"
        aria-label={ten}
      >
        <VeDoVat kind={k} windows={windows} />
        <text
          x="150"
          y="222"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fill={P.ink}
        >
          {ten}
        </text>
        {dongHinh.length > 0 && (
          <text
            x="150"
            y="248"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill={mau}
          >
            {dongHinh.map((d, i) => (
              <tspan key={i} x="150" dy={i === 0 ? 0 : 22}>
                {d}
              </tspan>
            ))}
          </text>
        )}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );
}

/* ────────────────── GHÉP HÌNH — cho thấy CÁCH ghép ──────────────────
 * shapeJoin: { piece: "rightTriangle"|"square", pieces, note, showResult }
 *
 * 🔴 VÌ SAO CẦN. Lớp 1 CĐ 2 bài 6 dạy "ghép hai tam giác vuông thành một hình vuông", nhưng
 * hình minh hoạ cũ chỉ là MỘT hình chữ nhật kèm dòng chữ — người dùng báo: "diễn giải ghép 2
 * tam giác vuông tạo thành hình vuông nhưng hình minh họa không mô tả cách thức ghép, hình được
 * mô tả cũng là hình chữ nhật chứ không phải hình vuông".
 *
 * Nay vẽ đúng cách sách giáo khoa trình bày: HAI MẢNH RỜI (thấy được đường ghép) → mũi tên →
 * hình sau khi ghép (còn vạch đứt chỉ chỗ hai mảnh khít vào nhau).
 *
 * `showResult: false` = CHỈ vẽ hai mảnh rời, không vẽ hình kết quả — dùng cho CÂU HỎI "ghép lại
 * được hình gì?", nếu vẽ luôn hình kết quả thì câu hỏi mất hết ý nghĩa.
 */
export function ShapeJoin({
  piece = "rightTriangle",
  pieces = 2,
  note = "",
  showResult = true,
}) {
  const laVuong = piece === "square";
  const s = 108; // cạnh hình vuông kết quả
  const khe = 12; // khe giữa hai mảnh cho thấy chúng RỜI nhau
  const xKet = 176;
  const rongManh = laVuong ? 106 : s + khe;
  const yGiua = laVuong ? 53 : (s + khe) / 2;
  /** Không vẽ hình kết quả thì thu khung lại cho hai mảnh to hẳn lên. */
  const lech = showResult ? 0 : 20;
  const rongKhung = showResult ? 300 : rongManh + 40;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${rongKhung} 180`}
        {...svgFit(rongKhung)}
        role="img"
        aria-label="Ghép hình"
      >
        <g transform={lech ? `translate(${lech},0)` : undefined}>
        {laVuong
          ? // 4 hình vuông nhỏ xếp thành 1 hình vuông lớn
            Array.from({ length: 4 }).map((_, i) => (
              <rect
                key={i}
                x={(i % 2) * 56}
                y={Math.floor(i / 2) * 56}
                width="50"
                height="50"
                rx="4"
                fill={i % 3 === 0 ? P.amberSoft : P.roseSoft}
                stroke={i % 3 === 0 ? P.amber : P.rose}
                strokeWidth="3"
              />
            ))
          : // 2 tam giác vuông bằng nhau (một nửa của hình vuông, cắt theo đường chéo)
            <>
              <polygon
                points={`0,0 ${s},0 ${s},${s}`}
                fill={P.roseSoft}
                stroke={P.rose}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polygon
                points={`${khe},${khe} ${khe},${s + khe} ${s + khe},${s + khe}`}
                fill={P.amberSoft}
                stroke={P.amber}
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </>}

        {/* mũi tên "ghép lại" — chỉ vẽ khi CÓ hình kết quả */}
        {showResult && (
          <>
            <line
              x1={rongManh + 14}
              y1={yGiua}
              x2={xKet - 12}
              y2={yGiua}
              stroke={P.ink}
              strokeWidth="3"
            />
            <polygon
              points={`${xKet - 12},${yGiua} ${xKet - 24},${yGiua - 8} ${xKet - 24},${yGiua + 8}`}
              fill={P.ink}
            />
          </>
        )}

        {/* kết quả sau khi ghép */}
        {showResult && (
          <>
            <rect
              x={xKet}
              y="0"
              width={s}
              height={s}
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="4"
            />
            {!laVuong && (
              <>
                <line
                  x1={xKet}
                  y1="0"
                  x2={xKet + s}
                  y2={s}
                  stroke={P.green}
                  strokeWidth="3"
                  strokeDasharray="7 6"
                />
                <polygon
                  points={`${xKet},0 ${xKet + s},0 ${xKet + s},${s}`}
                  fill={P.rose}
                  fillOpacity="0.22"
                />
                <polygon
                  points={`${xKet},0 ${xKet},${s} ${xKet + s},${s}`}
                  fill={P.amber}
                  fillOpacity="0.22"
                />
              </>
            )}
            {laVuong &&
              [1, 2].map((i) => (
                <g key={i}>
                  <line
                    x1={xKet + i * (s / 2)}
                    y1="0"
                    x2={xKet + i * (s / 2)}
                    y2={s}
                    stroke={P.green}
                    strokeWidth="3"
                    strokeDasharray="7 6"
                  />
                </g>
              ))}
          </>
        )}

        <text
          x={rongManh / 2}
          y={s + 44}
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill={P.ink}
        >
          {laVuong ? "4 hình vuông" : `${pieces} hình tam giác`}
        </text>
        {showResult && (
          <text
            x={xKet + s / 2}
            y={s + 44}
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill={P.green}
          >
            1 hình vuông
          </text>
        )}
        </g>
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );
}
