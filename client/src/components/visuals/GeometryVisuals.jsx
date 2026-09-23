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
  rightTriangle: "Hình tam giác vuông",
  parallelogram: "Hình bình hành",
  rhombus: "Hình thoi",
  trapezoid: "Hình thang",
  circle: "Hình tròn",
  quad: "Hình tứ giác",
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
  rightTriangle: [
    [80, 50],
    [80, 170],
    [200, 170],
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
  /**
   * TỨ GIÁC THƯỜNG — cố ý KHÔNG vuông, KHÔNG đều, bốn cạnh dài ngắn khác nhau.
   * 🔴 VÌ SAO CẦN: bài Lớp 2 `g2-c5-l6` dạy "hình TỨ GIÁC ABCD" mà lấy hình chữ nhật
   * làm minh hoạ thì trẻ dễ hiểu sai thành "tứ giác = hình chữ nhật". Sách giáo khoa
   * cũng vẽ một tứ giác chung rồi mới nói "hình vuông, hình chữ nhật CŨNG LÀ hình tứ giác".
   */
  quad: [
    [66, 46],
    [252, 62],
    [272, 178],
    [46, 166],
  ],
};

const FILL = {
  square: [P.blueSoft, P.blue],
  rectangle: [P.blueSoft, P.blue],
  rightTriangle: [P.roseSoft, P.rose],
  triangle: [P.roseSoft, P.rose],
  parallelogram: [P.amberSoft, P.amber],
  rhombus: [P.amberSoft, P.amber],
  trapezoid: [P.greenSoft, P.green],
  quad: [P.greenSoft, P.green],
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
/**
 * Hướng đặt TÊN ĐỈNH ra phía ngoài hình — viết cứng theo từng loại hình, KHÔNG tính
 * trung bình cộng (vừa khỏi phải đo, vừa không sợ `pts` rỗng ở hình tròn).
 * Thứ tự khớp đúng thứ tự điểm trong `SHAPE_POINTS`.
 */
const HUONG_CHU_DINH = {
  square: [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ],
  rectangle: [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ],
  rightTriangle: [
    [-1, -1],
    [-1, 1],
    [1, 1],
  ],
  parallelogram: [
    [-0.8, -0.8],
    [0.8, -0.8],
    [0.8, 0.8],
    [-0.8, 0.8],
  ],
  trapezoid: [
    [-0.8, -0.8],
    [0.8, -0.8],
    [0.8, 0.8],
    [-0.8, 0.8],
  ],
  rhombus: [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ],
  triangle: [
    [0, -1],
    [0.7, 0.7],
    [-0.7, 0.7],
  ],
  quad: [
    [-0.9, -0.7],
    [0.9, -0.5],
    [0.9, 0.8],
    [-0.9, 0.7],
  ],
};

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
  /**
   * TÊN TỪNG ĐỈNH, ví dụ `["A","B","C","D"]`. Có giá trị thì mỗi đỉnh được ghi đúng tên
   * của nó (và tự vẽ luôn chấm ở đỉnh, không cần `vertices`).
   *
   * 🔴 VÌ SAO CẦN. Bài Lớp 2 `g2-c5-l6` dạy "Hình tứ giác ABCD có 4 cạnh: AB, BC, CD, DA
   * và 4 đỉnh: A, B, C, D", nhưng hình chỉ ghi một chữ "đỉnh" chung. Người dùng báo:
   * "mô tả hình chữ nhật có cạnh AB và BC và 4 đỉnh A, B, C, D nhưng lại không ghi chú
   * A, B, C, D lên trên hình thì làm sao trẻ hiểu được?".
   */
  vertexLabels = [],
}) {
  const chuDinh = Array.isArray(vertexLabels)
    ? vertexLabels.filter(Boolean)
    : [];
  const coChuDinh = chuDinh.length > 0;
  /**
   * Ghi tên đỉnh thì phải HẠ ĐÁY khung xuống: chữ ở đỉnh dưới nằm quanh y ≈ 206, mà tên
   * hình vốn ở y = 228 ⇒ hai dòng chữ chồng nhau. Hình KHÔNG có tên đỉnh giữ nguyên
   * 320×240 như cũ (mọi số đo cũ không đổi).
   */
  const H = coChuDinh ? 266 : 240;
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
        viewBox={`0 0 320 ${H}`}
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

        {k !== "circle" && (vertices || coChuDinh) && (
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
            {coChuDinh
              ? pts.map(([vx, vy], i) => {
                  const [dx, dy] = (HUONG_CHU_DINH[k] ||
                    HUONG_CHU_DINH.rectangle)[i % pts.length];
                  return (
                    <text
                      key={`c${i}`}
                      x={vx + dx * 15}
                      y={vy + dy * 15 + 5}
                      textAnchor={
                        dx > 0.35 ? "start" : dx < -0.35 ? "end" : "middle"
                      }
                      fontSize="17"
                      fontWeight="900"
                      fill={stroke}
                    >
                      {chuDinh[i % chuDinh.length]}
                    </text>
                  );
                })
              : vertexLabel && (
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
            y={coChuDinh ? 254 : 228}
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

/**
 * `vertexLetter` + `armLetters`: GHI TÊN điểm lên hình.
 * 🔴 VÌ SAO CẦN: Lớp 3 `g3-c3-l4` dạy "Góc đỉnh A, cạnh AB và AC" và Lớp 4 `g4-c2-l5`
 * dạy "Góc nhọn: Đỉnh O, hai cạnh OA và OB" — nhưng hình chỉ có chữ "Góc vuông",
 * KHÔNG có chữ A, B, C hay O nào. Cùng họ lỗi người dùng báo ở hình tứ giác ABCD.
 * `armLetters[0]` = tia ngang (bên phải), `armLetters[1]` = tia chéo.
 */
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

/* ─────────────────────────── HÌNH KHỐI ───────────────────────────
 * solid: { kind: "cube"|"cuboid"|"cylinder"|"sphere", dims: {a,b,c}, label, formula }
 * Lớp 1 (CĐ 4) và lớp 2 (CĐ 9) chỉ nhận biết; lớp 5 (CĐ 3) tính diện tích và thể tích.
 */
const SOLID_NAME = {
  cube: "Khối lập phương",
  cuboid: "Khối hộp chữ nhật",
  compare: "Khối lập phương & Khối hộp chữ nhật",
  rubikOnTable: "Khối Rubik trên bàn",
  cylinder: "Khối trụ",
  sphere: "Khối cầu",
};

export function Solid({
  kind = "cuboid",
  dims = null,
  label = "",
  formula = "",
  /**
   * CHỮ GHI LÊN CẠNH KHỐI — `{ a: "a", b: "b", c: "c" }` cho hộp chữ nhật / lập phương.
   */
  sideLetters = null,
}) {
  const k = SOLID_NAME[kind] ? kind : "cuboid";
  const D = dims && typeof dims === "object" ? dims : {};
  const a = num(D.a, 0);
  const b = num(D.b, 0);
  const c = num(D.c, 0);
  const SL = sideLetters && typeof sideLetters === "object" ? sideLetters : {};

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
        {k === "cube" ? (
          <>
            {/* KHỐI LẬP PHƯƠNG: Mặt trước đúng là HÌNH VUÔNG 120 × 120 */}
            <polygon
              points="80,95 200,95 200,215 80,215"
              fill={P.blueSoft}
              stroke={P.blue}
              strokeWidth="3"
            />
            {/* Mặt trên */}
            <polygon
              points="80,95 130,50 250,50 200,95"
              fill={P.amberSoft}
              stroke={P.amber}
              strokeWidth="3"
            />
            {/* Mặt bên phải */}
            <polygon
              points="200,95 250,50 250,170 200,215"
              fill={P.roseSoft}
              stroke={P.rose}
              strokeWidth="3"
            />
            <line
              x1="80"
              y1="95"
              x2="80"
              y2="215"
              stroke={P.blue}
              strokeWidth="3"
            />
            {SL.a && (
              <>
                <text
                  x="66"
                  y="161"
                  textAnchor="end"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.blue}
                >
                  {SL.a}
                </text>
                <text
                  x="264"
                  y="116"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.rose}
                >
                  {SL.a}
                </text>
              </>
            )}
            <text
              x="170"
              y="238"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={P.ink}
            >
              Sáu mặt đều là hình vuông bằng nhau
            </text>
          </>
        ) : k === "cuboid" ? (
          <>
            {/* KHỐI HỘP CHỮ NHẬT: Mặt trước đúng là HÌNH CHỮ NHẬT DÀI 190 × 90 */}
            <polygon
              points="35,115 225,115 225,205 35,205"
              fill={P.blueSoft}
              stroke={P.blue}
              strokeWidth="3"
            />
            {/* Mặt trên */}
            <polygon
              points="35,115 85,70 275,70 225,115"
              fill={P.amberSoft}
              stroke={P.amber}
              strokeWidth="3"
            />
            {/* Mặt bên phải */}
            <polygon
              points="225,115 275,70 275,160 225,205"
              fill={P.roseSoft}
              stroke={P.rose}
              strokeWidth="3"
            />
            <line
              x1="35"
              y1="115"
              x2="35"
              y2="205"
              stroke={P.blue}
              strokeWidth="3"
            />
            {SL.c && (
              <text
                x="24"
                y="165"
                textAnchor="end"
                fontSize="18"
                fontWeight="900"
                fill={P.blue}
              >
                {SL.c}
              </text>
            )}
            {SL.a && (
              <text
                x="130"
                y="224"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill={P.blue}
              >
                {SL.a}
              </text>
            )}
            {SL.b && (
              <text
                x="260"
                y="195"
                fontSize="18"
                fontWeight="900"
                fill={P.rose}
              >
                {SL.b}
              </text>
            )}
            <text
              x="160"
              y="238"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={P.ink}
            >
              Có 6 mặt, các mặt đối diện là hình chữ nhật
            </text>
          </>
        ) : k === "compare" ? (
          <>
            {/* SO SÁNH 2 KHỐI CẠNH NHAU */}
            {/* 1. Khối lập phương (trái) */}
            <g>
              <polygon
                points="25,100 95,100 95,170 25,170"
                fill={P.blueSoft}
                stroke={P.blue}
                strokeWidth="2.5"
              />
              <polygon
                points="25,100 55,70 125,70 95,100"
                fill={P.amberSoft}
                stroke={P.amber}
                strokeWidth="2.5"
              />
              <polygon
                points="95,100 125,70 125,140 95,170"
                fill={P.roseSoft}
                stroke={P.rose}
                strokeWidth="2.5"
              />
              <line x1="25" y1="100" x2="25" y2="170" stroke={P.blue} strokeWidth="2.5" />
              <text x="75" y="195" textAnchor="middle" fontSize="14" fontWeight="800" fill={P.ink}>
                Khối lập phương
              </text>
              <text x="75" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill={P.blue}>
                6 mặt đều là hình vuông
              </text>
            </g>

            {/* 2. Khối hộp chữ nhật (phải) */}
            <g>
              <polygon
                points="160,115 270,115 270,170 160,170"
                fill={P.blueSoft}
                stroke={P.blue}
                strokeWidth="2.5"
              />
              <polygon
                points="160,115 195,85 305,85 270,115"
                fill={P.amberSoft}
                stroke={P.amber}
                strokeWidth="2.5"
              />
              <polygon
                points="270,115 305,85 305,140 270,170"
                fill={P.roseSoft}
                stroke={P.rose}
                strokeWidth="2.5"
              />
              <line x1="160" y1="115" x2="160" y2="170" stroke={P.blue} strokeWidth="2.5" />
              <text x="235" y="195" textAnchor="middle" fontSize="14" fontWeight="800" fill={P.ink}>
                Khối hộp chữ nhật
              </text>
              <text x="235" y="215" textAnchor="middle" fontSize="12" fontWeight="700" fill={P.amber}>
                Các mặt là hình chữ nhật
              </text>
            </g>
          </>
        ) : k === "rubikOnTable" ? (
          <>
            {/* KHỐI RUBIK Ở TRÊN BÀN */}
            {/* Mặt bàn gỗ */}
            <polygon
              points="15,160 75,115 325,115 265,160"
              fill="#fde68a"
              stroke="#d97706"
              strokeWidth="3"
            />
            <rect x="15" y="160" width="250" height="15" fill="#d97706" rx="2" />
            <rect x="25" y="175" width="14" height="42" fill="#b45309" rx="2" />
            <rect x="240" y="175" width="14" height="42" fill="#b45309" rx="2" />

            {/* Bóng đổ khối Rubik */}
            <ellipse cx="145" cy="148" rx="55" ry="12" fill="#000000" opacity="0.18" />

            {/* Khối Rubik 3x3 */}
            <g transform="translate(85, 45)">
              <rect x="0" y="35" width="84" height="84" fill="#0f172a" rx="3" />
              <polygon points="0,35 35,0 119,0 84,35" fill="#0f172a" />
              <polygon points="84,35 119,0 119,84 84,119" fill="#0f172a" />

              {/* Ô vuông mặt trước (3x3) */}
              <rect x="2" y="37" width="24" height="24" rx="2" fill="#ef4444" />
              <rect x="30" y="37" width="24" height="24" rx="2" fill="#22c55e" />
              <rect x="58" y="37" width="24" height="24" rx="2" fill="#ef4444" />
              <rect x="2" y="65" width="24" height="24" rx="2" fill="#ffffff" />
              <rect x="30" y="65" width="24" height="24" rx="2" fill="#ef4444" />
              <rect x="58" y="65" width="24" height="24" rx="2" fill="#eab308" />
              <rect x="2" y="93" width="24" height="24" rx="2" fill="#3b82f6" />
              <rect x="30" y="93" width="24" height="24" rx="2" fill="#22c55e" />
              <rect x="58" y="93" width="24" height="24" rx="2" fill="#ef4444" />

              {/* Ô bình hành mặt trên (3x3) - căn chỉnh hoàn toàn bên trong đa giác đen */}
              <polygon points="3,33 14,24 38,24 27,33" fill="#eab308" />
              <polygon points="15,22 26,13 50,13 39,22" fill="#ffffff" />
              <polygon points="27,11 38,2 62,2 51,11" fill="#3b82f6" />
              <polygon points="30,33 41,24 65,24 54,33" fill="#eab308" />
              <polygon points="42,22 53,13 77,13 66,22" fill="#eab308" />
              <polygon points="54,11 65,2 89,2 78,11" fill="#ffffff" />
              <polygon points="57,33 68,24 92,24 81,33" fill="#22c55e" />
              <polygon points="69,22 80,13 104,13 93,22" fill="#f97316" />
              <polygon points="81,11 92,2 116,2 105,11" fill="#eab308" />

              {/* Ô bình hành mặt phải (3x3) */}
              <polygon points="86,37 96,27 96,51 86,61" fill="#f97316" />
              <polygon points="86,65 96,55 96,79 86,89" fill="#3b82f6" />
              <polygon points="86,93 96,83 96,107 86,117" fill="#22c55e" />
              <polygon points="98,25 108,15 108,39 98,49" fill="#ffffff" />
              <polygon points="98,53 108,43 108,67 98,77" fill="#f97316" />
              <polygon points="98,81 108,71 108,95 98,105" fill="#3b82f6" />
              <polygon points="110,13 117,6 117,30 110,37" fill="#f97316" />
              <polygon points="110,41 117,34 117,58 110,65" fill="#22c55e" />
              <polygon points="110,69 117,62 117,86 110,93" fill="#f97316" />
            </g>

            <text
              x="170"
              y="238"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill={P.ink}
            >
              Khối Rubik ở trên mặt bàn
            </text>
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
          fontSize={k === "compare" ? "15" : "17"}
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
  boat: {
    ten: "Chiếc thuyền",
    hinh: "1 hình chữ nhật (thân) + 2 hình tam giác (buồm)",
    mau: P.blue,
  },
  fish: {
    ten: "Con cá",
    hinh: "1 hình thoi (thân) + 1 hình tam giác (đuôi)",
    mau: P.amber,
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
        <line
          x1="80"
          y1="72"
          x2="220"
          y2="72"
          stroke={P.paper}
          strokeWidth="3"
        />
        <line
          x1="80"
          y1="122"
          x2="220"
          y2="122"
          stroke={P.paper}
          strokeWidth="3"
        />
        <line
          x1="150"
          y1="27"
          x2="150"
          y2="72"
          stroke={P.paper}
          strokeWidth="3"
        />
        <line
          x1="112"
          y1="72"
          x2="112"
          y2="122"
          stroke={P.paper}
          strokeWidth="3"
        />
        <line
          x1="188"
          y1="72"
          x2="188"
          y2="122"
          stroke={P.paper}
          strokeWidth="3"
        />
        <line
          x1="150"
          y1="122"
          x2="150"
          y2="167"
          stroke={P.paper}
          strokeWidth="3"
        />
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
        <line
          x1="150"
          y1="22"
          x2="150"
          y2="158"
          stroke={P.blue}
          strokeWidth="4"
        />
        <line
          x1="82"
          y1="90"
          x2="218"
          y2="90"
          stroke={P.blue}
          strokeWidth="4"
        />
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
        <line
          x1="70"
          y1="135"
          x2="58"
          y2="182"
          stroke={P.amber}
          strokeWidth="6"
        />
        <line
          x1="230"
          y1="135"
          x2="242"
          y2="182"
          stroke={P.amber}
          strokeWidth="6"
        />
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
  if (kind === "boat")
    return (
      <>
        {/* Cột buồm */}
        <line
          x1="148"
          y1="20"
          x2="148"
          y2="120"
          stroke={P.ink}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Cánh buồm to (tam giác) */}
        <polygon
          points="146,25 80,120 146,120"
          fill={P.roseSoft}
          stroke={P.rose}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Cánh buồm nhỏ (tam giác) */}
        <polygon
          points="150,50 150,120 205,120"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Thân thuyền (chữ nhật) */}
        <rect
          x="65"
          y="120"
          width="170"
          height="42"
          rx="6"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="5"
        />
        {/* Gợn sóng nước */}
        <path
          d="M45,172 Q75,164 105,172 T165,172 T225,172 T265,172"
          fill="none"
          stroke={P.blue}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </>
    );
  if (kind === "fish")
    return (
      <>
        {/* Thân cá (hình thoi) */}
        <polygon
          points="135,35 210,100 135,165 60,100"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        {/* Mắt cá */}
        <circle cx="85" cy="100" r="7" fill={P.paper} stroke={P.ink} strokeWidth="2" />
        <circle cx="83" cy="100" r="3.5" fill={P.ink} />
        {/* Mang cá */}
        <path
          d="M110,75 Q125,100 110,125"
          fill="none"
          stroke={P.amber}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Đuôi cá (tam giác) */}
        <polygon
          points="210,100 270,55 270,145"
          fill={P.greenSoft}
          stroke={P.green}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Vây cá */}
        <polygon
          points="135,35 155,18 160,35"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polygon
          points="135,165 155,182 160,165"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Bong bóng nước */}
        <circle cx="42" cy="85" r="5" fill="none" stroke={P.blue} strokeWidth="2" />
        <circle cx="32" cy="70" r="3.5" fill="none" stroke={P.blue} strokeWidth="2" />
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
  label = "",
}) {
  const k = DO_VAT[kind] ? kind : "book";
  const vat = DO_VAT[k];
  const ten = label || vat.ten;
  const { hinh, mau } = vat;
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
  if (piece === "boat") {
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 180"
          {...svgFit(340)}
          role="img"
          aria-label="Ghép thuyền"
        >
          {/* Bên trái: 3 mảnh rời (1 chữ nhật + 2 tam giác) */}
          <g>
            {/* Buồm to */}
            <polygon
              points="60,20 25,85 60,85"
              fill={P.roseSoft}
              stroke={P.rose}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Buồm nhỏ */}
            <polygon
              points="68,40 68,85 105,85"
              fill={P.amberSoft}
              stroke={P.amber}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Thân thuyền */}
            <rect
              x="18"
              y="95"
              width="95"
              height="26"
              rx="4"
              fill={P.blueSoft}
              stroke={P.blue}
              strokeWidth="3"
            />
            <text
              x="65"
              y="148"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={P.ink}
            >
              1 chữ nhật + 2 tam giác
            </text>
          </g>

          {/* Mũi tên ghép */}
          {showResult && (
            <g>
              <line
                x1="126"
                y1="70"
                x2="168"
                y2="70"
                stroke={P.ink}
                strokeWidth="3"
              />
              <polygon
                points="168,70 156,64 156,76"
                fill={P.ink}
              />
              <text
                x="147"
                y="55"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={P.soft}
              >
                Ghép lại
              </text>
            </g>
          )}

          {/* Bên phải: Con thuyền hoàn chỉnh */}
          {showResult && (
            <g>
              {/* Cột buồm */}
              <line
                x1="252"
                y1="15"
                x2="252"
                y2="92"
                stroke={P.ink}
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Buồm to */}
              <polygon
                points="250,20 205,90 250,90"
                fill={P.roseSoft}
                stroke={P.rose}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Buồm nhỏ */}
              <polygon
                points="254,40 254,90 295,90"
                fill={P.amberSoft}
                stroke={P.amber}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Thân thuyền */}
              <rect
                x="195"
                y="92"
                width="114"
                height="28"
                rx="4"
                fill={P.blueSoft}
                stroke={P.blue}
                strokeWidth="3"
              />
              <text
                x="252"
                y="148"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.blue}
              >
                Chiếc thuyền
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

  if (piece === "fish") {
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 180"
          {...svgFit(340)}
          role="img"
          aria-label="Ghép con cá"
        >
          {/* Bên trái: 2 mảnh rời (1 hình thoi + 1 tam giác) */}
          <g>
            {/* Hình thoi (thân) */}
            <polygon
              points="60,25 96,65 60,105 24,65"
              fill={P.amberSoft}
              stroke={P.amber}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Tam giác (đuôi) */}
            <polygon
              points="106,65 138,40 138,90"
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <text
              x="75"
              y="148"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={P.ink}
            >
              1 hình thoi + 1 tam giác
            </text>
          </g>

          {/* Mũi tên ghép */}
          {showResult && (
            <g>
              <line
                x1="148"
                y1="65"
                x2="186"
                y2="65"
                stroke={P.ink}
                strokeWidth="3"
              />
              <polygon
                points="186,65 174,59 174,71"
                fill={P.ink}
              />
              <text
                x="167"
                y="50"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={P.soft}
              >
                Ghép lại
              </text>
            </g>
          )}

          {/* Bên phải: Con cá hoàn chỉnh */}
          {showResult && (
            <g>
              {/* Thân cá (hình thoi) */}
              <polygon
                points="248,25 288,65 248,105 208,65"
                fill={P.amberSoft}
                stroke={P.amber}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Mắt cá */}
              <circle cx="225" cy="65" r="4.5" fill={P.ink} />
              <circle cx="223" cy="63" r="1.5" fill={P.paper} />
              {/* Đuôi cá */}
              <polygon
                points="288,65 324,35 324,95"
                fill={P.greenSoft}
                stroke={P.green}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Đường ranh giới giữa 2 mảnh */}
              <line
                x1="288"
                y1="55"
                x2="288"
                y2="75"
                stroke={P.ink}
                strokeWidth="2"
                strokeDasharray="2 2"
              />
              <text
                x="266"
                y="148"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.amber}
              >
                Con cá
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
          {laVuong ? (
            // 4 hình vuông nhỏ xếp thành 1 hình vuông lớn
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
          ) : (
            // 2 tam giác vuông bằng nhau (một nửa của hình vuông, cắt theo đường chéo)
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
            </>
          )}

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

/* ─────── ĐIỂM · ĐOẠN THẲNG · ĐƯỜNG THẲNG · ĐƯỜNG GẤP KHÚC · BA ĐIỂM THẲNG HÀNG ───────
 * pointLine: { kind: "segment"|"line"|"curve"|"polyline"|"collinear", points: ["A","B"], equalMarks, formula, label }
 *
 * 🔴 VÌ SAO PHẢI CÓ BỘ VẼ NÀY. Lớp 2 Chủ đề 5 dạy "đoạn thẳng AB", "đường gấp khúc ABCD",
 * "ba điểm thẳng hàng" — TÊN GỌI của hình CHÍNH LÀ các chữ A, B, C, D. Nhưng hình của
 * những bài đó lại là... **cái thước đo** (`ruler`), hoặc **không có hình nào**: chữ
 * A, B, C, D chỉ nằm trong `text` dạng hình vẽ bằng ký tự (`A •———• B`). Trẻ không nhìn
 * thấy một điểm nào, trong khi cả bài học nói về "điểm A", "đầu mút A và B".
 * Người dùng báo ở bài hình tứ giác: "…nhưng lại KHÔNG ghi chú A, B, C, D lên trên hình
 * thì làm sao trẻ hiểu được?".
 *
 * Chữ A, B, C, D chính là nội dung bài học, nên bộ vẽ này vẽ ĐIỂM (chấm tròn) + TÊN ĐIỂM:
 *   segment   A •————• B      (thêm điểm giữa: A •——•——• B ⇒ dạy trung điểm)
 *   line      —— A •————• B ——  (kéo dài mãi hai phía)
 *   curve     ~~~~~ (đường cong uốn lượn, để so sánh)
 *   polyline  A •———• B ╲ • C ╲ • D  (đường gấp khúc)
 *   collinear A •———• B ———• C  (ba điểm cùng nằm trên một đường thẳng)
 *   notCollinear  A •—• B   C↘  (C KHÔNG nằm trên đường thẳng AB)
 *   pointsOnly    A •    • B   (CHỈ hai điểm rời — cho câu hỏi "nối hai điểm A, B được
 *                               hình gì?": vẽ sẵn đoạn thẳng là cho luôn đáp án)
 */
export function PointLine({
  kind = "segment",
  points = [],
  /** Vạch hai đoạn bằng nhau ở giữa (dạy TRUNG ĐIỂM: AM = MB). */
  equalMarks = false,
  formula = "",
  label = "",
}) {
  const chu = (Array.isArray(points) ? points : []).filter(Boolean);
  /** Ba kiểu vẽ theo chiều ngang; gấp khúc vẽ riêng theo toạ độ từng đỉnh. */
  const yNgang = 84;
  const H = kind === "polyline" ? 240 : 160;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 320 ${H}`}
        {...svgFit(320)}
        role="img"
        aria-label={
          kind === "polyline"
            ? "Đường gấp khúc"
            : kind === "collinear"
              ? "Ba điểm thẳng hàng"
              : kind === "notCollinear"
                ? "Ba điểm không thẳng hàng"
                : kind === "pointsOnly"
                  ? "Hai điểm A và B"
                  : kind === "curve"
                    ? "Đường cong"
                    : kind === "line"
                      ? "Đường thẳng"
                      : "Đoạn thẳng"
        }
      >
        {kind === "polyline" ? (
          <>
            {(() => {
              // A → B → C → D: ba đoạn thẳng nối tiếp, KHÔNG cùng nằm trên một đường.
              const dinh = [
                [46, 62],
                [196, 62],
                [250, 140],
                [140, 198],
              ];
              /** Hướng ghi tên từng đỉnh — viết cứng để chữ luôn nằm NGOÀI hình. */
              const huong = [
                [-1, 0.2],
                [0, -1],
                [1, 0.2],
                [0, 1],
              ];
              return (
                <>
                  <polyline
                    points={dinh.map((p) => p.join(",")).join(" ")}
                    fill="none"
                    stroke={P.ink}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {dinh.map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="5.5" fill={P.ink} />
                      <text
                        x={x + huong[i][0] * 16}
                        y={y + huong[i][1] * 16 + 5}
                        textAnchor={
                          huong[i][0] > 0.35
                            ? "start"
                            : huong[i][0] < -0.35
                              ? "end"
                              : "middle"
                        }
                        fontSize="17"
                        fontWeight="900"
                        fill={P.rose}
                      >
                        {chu[i] || ""}
                      </text>
                    </g>
                  ))}
                </>
              );
            })()}
          </>
        ) : kind === "curve" ? (
          <path
            d="M24,96 C66,18 104,158 160,88 C214,22 252,152 296,84"
            fill="none"
            stroke={P.violet}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ) : kind === "collinear" ? (
          <>
            <line
              x1="26"
              y1={yNgang}
              x2="294"
              y2={yNgang}
              stroke={P.ink}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {[70, 165, 260].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy={yNgang} r="5.5" fill={P.ink} />
                <text
                  x={x}
                  y={yNgang - 16}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="900"
                  fill={P.rose}
                >
                  {chu[i] || ""}
                </text>
              </g>
            ))}
          </>
        ) : kind === "notCollinear" ? (
          <>
            {/* Đường thẳng AB kéo dài (nét mờ) để thấy C KHÔNG nằm trên đó. */}
            <line
              x1="26"
              y1={yNgang}
              x2="294"
              y2={yNgang}
              stroke={P.ink}
              strokeWidth="2"
              strokeDasharray="7 6"
              opacity="0.4"
            />
            <line
              x1="46"
              y1={yNgang}
              x2="200"
              y2={yNgang}
              stroke={P.ink}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {[
              [46, "end", -13],
              [200, "middle", 0],
            ].map(([x, neo, lech], i) => (
              <g key={i}>
                <circle cx={x} cy={yNgang} r="5.5" fill={P.ink} />
                <text
                  x={x + lech}
                  y={yNgang - 16}
                  textAnchor={neo}
                  fontSize="17"
                  fontWeight="900"
                  fill={P.rose}
                >
                  {chu[i] || ""}
                </text>
              </g>
            ))}
            <circle cx="250" cy="124" r="5.5" fill={P.ink} />
            <text x="264" y="130" fontSize="17" fontWeight="900" fill={P.rose}>
              {chu[2] || ""}
            </text>
          </>
        ) : (
          <>
            {/* `line` = đường thẳng: kéo dài quá hai điểm; `segment` = chỉ trong hai điểm.
                Ba điểm (A · M · B) thì điểm giữa nằm CHÍNH GIỮA để thấy AM = MB. */}
            <line
              x1={kind === "line" ? 12 : 46}
              y1={yNgang}
              x2={kind === "line" ? 308 : 274}
              y2={yNgang}
              stroke={P.ink}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={kind === "pointsOnly" ? 0 : 1}
            />
            {(kind === "line"
              ? [92, 228]
              : chu.length >= 3
                ? [46, 160, 274]
                : [46, 274]
            ).map((x, i, ds) => (
              <g key={i}>
                <circle cx={x} cy={yNgang} r="5.5" fill={P.ink} />
                <text
                  x={x + (i === 0 ? -13 : i === ds.length - 1 ? 13 : 0)}
                  y={
                    kind === "line"
                      ? yNgang - 16
                      : i === 0 || i === ds.length - 1
                        ? yNgang + 26
                        : yNgang - 16
                  }
                  textAnchor={
                    kind === "line" || (i !== 0 && i !== ds.length - 1)
                      ? "middle"
                      : i === 0
                        ? "end"
                        : "start"
                  }
                  fontSize="17"
                  fontWeight="900"
                  fill={P.rose}
                >
                  {chu[i] || ""}
                </text>
              </g>
            ))}
            {kind === "segment" &&
              equalMarks &&
              [103, 217].map((x, i) => (
                <line
                  key={i}
                  x1={x}
                  y1={yNgang - 9}
                  x2={x}
                  y2={yNgang + 9}
                  stroke={P.green}
                  strokeWidth="3"
                />
              ))}
          </>
        )}
      </svg>
      {formula && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
          {formula}
        </span>
      )}
      {label && <span style={caption}>{label}</span>}
    </div>
  );
}

/* ─────────────────────────── VỊ TRÍ KHÔNG GIAN (LỚP 1 CĐ 4) ───────────────────────────
 * spatialScene: { mode: "topBottom"|"leftRight"|"frontBack"|"ballUnderTableQuiz"|"carLeftQuiz", note }
 */
export function SpatialScene({ mode = "topBottom", note = "" }) {
  if (mode === "topBottom" || mode === "ballUnderTableQuiz") {
    const isQuiz = mode === "ballUnderTableQuiz";
    return (
      <div style={card}>
        <svg viewBox="0 0 340 230" {...svgFit(340)} role="img" aria-label="Vị trí Trên - Dưới">
          {/* Chân bàn phía sau (vẽ trước để mặt bàn che phần đỉnh) */}
          <line x1="102" y1="75" x2="102" y2="155" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="285" y1="75" x2="285" y2="155" stroke="#92400e" strokeWidth="4.5" strokeLinecap="round" />

          {/* Mặt bàn gỗ */}
          <polygon
            points="45,100 100,70 295,70 240,100"
            fill="#fde68a"
            stroke="#d97706"
            strokeWidth="3"
          />
          <rect x="45" y="100" width="195" height="12" fill="#d97706" rx="2" />

          {/* Chân bàn phía trước */}
          <line x1="55" y1="112" x2="55" y2="180" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
          <line x1="230" y1="112" x2="230" y2="180" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />

          {/* Mặt sàn */}
          <line x1="15" y1="180" x2="325" y2="180" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4" />

          {/* QUYỂN SÁCH Ở TRÊN BÀN */}
          {!isQuiz && (
            <g>
              {/* Bóng đổ của quyển sách trên mặt bàn */}
              <ellipse cx="170" cy="87" rx="66" ry="11" fill="#78350f" opacity="0.32" />

              {/* Bìa sách cứng (màu đỏ mận) bên dưới các trang */}
              <path
                d="M 170,55 C 148,47 126,47 107,51 L 107,83 C 126,79 148,79 170,87 Z"
                fill="#b91c1c"
                stroke="#991b1b"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M 170,55 C 192,47 214,47 233,51 L 233,83 C 214,79 192,79 170,87 Z"
                fill="#b91c1c"
                stroke="#991b1b"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Gáy sách & mép trang sách (độ dày cuốn sách) */}
              <line x1="108.5" y1="52" x2="108.5" y2="82" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="231.5" y1="52" x2="231.5" y2="82" stroke="#cbd5e1" strokeWidth="2" />

              {/* Trang sách bên trái (trắng muốt, uốn cong tự nhiên) */}
              <path
                d="M 170,56 C 150,49 128,49 110,52 L 110,81 C 128,78 150,78 170,85 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Trang sách bên phải (trắng kem nhẹ) */}
              <path
                d="M 170,56 C 190,49 212,49 230,52 L 230,81 C 212,78 190,78 170,85 Z"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Nếp gấp rãnh gáy sách ở giữa */}
              <line x1="170" y1="56" x2="170" y2="85" stroke="#94a3b8" strokeWidth="1.8" />
              <line x1="168" y1="57" x2="168" y2="84" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="172" y1="57" x2="172" y2="84" stroke="#cbd5e1" strokeWidth="1" />

              {/* Nội dung trên trang trái: Tiêu đề xanh + các dòng chữ */}
              <line x1="118" y1="58" x2="142" y2="58" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="118" y1="64" x2="162" y2="64" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="118" y1="70" x2="160" y2="70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <line x1="118" y1="76" x2="150" y2="76" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

              {/* Nội dung trên trang phải: Hình tam giác, hình tròn minh hoạ + dòng chữ */}
              <polygon points="186,57 194,70 178,70" fill="#ef4444" />
              <circle cx="206" cy="64" r="6" fill="#3b82f6" />
              <line x1="178" y1="76" x2="222" y2="76" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

              {/* Dải ruy-băng đỏ đánh dấu trang rủ xuống bàn */}
              <path
                d="M 170,62 Q 166,74 168,86 Q 169,93 166,98 L 170,95 L 174,98 Q 172,93 171,86 Q 173,74 170,62 Z"
                fill="#e11d48"
                stroke="#9f1239"
                strokeWidth="0.8"
              />

              {/* Nhãn Ở TRÊN */}
              <rect x="80" y="14" width="165" height="26" rx="13" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
              <text x="162" y="32" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e40af">
                ⬆️ Sách ở TRÊN bàn
              </text>
            </g>
          )}

          {/* QUẢ BÓNG Ở DƯỚI GẦM BÀN */}
          <g>
            <ellipse cx="145" cy="178" rx="20" ry="5" fill="#000000" opacity="0.15" />
            <circle cx="145" cy="158" r="18" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
            {/* Đường múi bóng */}
            <path d="M132,152 Q145,158 145,176" fill="none" stroke="#ffffff" strokeWidth="2" />
            <path d="M158,152 Q145,158 145,176" fill="none" stroke="#ffffff" strokeWidth="2" />
            <path d="M135,168 Q145,158 155,168" fill="none" stroke="#ffffff" strokeWidth="2" />
            {/* Nhãn Ở DƯỚI */}
            {isQuiz ? (
              <>
                <rect x="95" y="196" width="150" height="26" rx="13" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
                <text x="170" y="214" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9a3412">
                  Vị trí của quả bóng?
                </text>
              </>
            ) : (
              <>
                <rect x="75" y="196" width="190" height="26" rx="13" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
                <text x="170" y="214" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9a3412">
                  ⬇️ Quả bóng ở DƯỚI gầm bàn
                </text>
              </>
            )}
          </g>
        </svg>
        {note && <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>}
      </div>
    );
  }

  if (mode === "leftRight" || mode === "carLeftQuiz") {
    const isQuiz = mode === "carLeftQuiz";
    return (
      <div style={card}>
        <svg viewBox="0 0 340 230" {...svgFit(340)} role="img" aria-label="Vị trí Trái - Phải">
          {/* Đường phân chia ở giữa */}
          <line x1="170" y1="15" x2="170" y2="190" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 6" />

          {/* BÊN TRÁI: Chiếc ô tô */}
          <g>
            {!isQuiz && (
              <>
                <rect x="25" y="15" width="120" height="28" rx="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <text x="85" y="34" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e40af">
                  ⬅️ Bên TRÁI
                </text>
              </>
            )}
            {/* Vẽ ô tô */}
            <g transform="translate(40, 70)">
              <path d="M20,25 L35,8 L65,8 L78,25 Z" fill="#60a5fa" stroke="#2563eb" strokeWidth="2.5" />
              <rect x="5" y="25" width="85" height="25" rx="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
              <polygon points="36,11 62,11 62,23 25,23" fill="#dbeafe" />
              <circle cx="8" cy="35" r="4" fill="#fef08a" />
              <circle cx="25" cy="50" r="12" fill="#1e293b" />
              <circle cx="25" cy="50" r="5" fill="#cbd5e1" />
              <circle cx="70" cy="50" r="12" fill="#1e293b" />
              <circle cx="70" cy="50" r="5" fill="#cbd5e1" />
            </g>
            <text x="85" y="165" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e40af">
              Chiếc ô tô
            </text>
          </g>

          {/* BÊN PHẢI: Quả bóng */}
          <g>
            {!isQuiz && (
              <>
                <rect x="195" y="15" width="120" height="28" rx="14" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
                <text x="255" y="34" textAnchor="middle" fontSize="13" fontWeight="800" fill="#9d174d">
                  Bên PHẢI ➡️
                </text>
              </>
            )}
            {/* Vẽ quả bóng */}
            <g transform="translate(215, 70)">
              <ellipse cx="40" cy="62" rx="25" ry="6" fill="#000000" opacity="0.15" />
              <circle cx="40" cy="32" r="30" fill="#ec4899" stroke="#be185d" strokeWidth="3" />
              <circle cx="40" cy="32" r="14" fill="#fdf2f8" stroke="#be185d" strokeWidth="2" />
              <path d="M40,2 L40,62" stroke="#be185d" strokeWidth="2" strokeDasharray="4 3" />
            </g>
            <text x="255" y="165" textAnchor="middle" fontSize="14" fontWeight="800" fill="#9d174d">
              Quả bóng
            </text>
          </g>

          {/* Dòng kết luận phía dưới */}
          <rect x="25" y="192" width="290" height="28" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="170" y="211" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e293b">
            {isQuiz
              ? "Bé hãy xác định vị trí hai đồ vật"
              : "Ô tô ở bên TRÁI · Quả bóng ở bên PHẢI"}
          </text>
        </svg>
        {note && <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>}
      </div>
    );
  }

  // mode === "frontBack"
  return (
    <div style={card}>
      <svg viewBox="0 0 340 230" {...svgFit(340)} role="img" aria-label="Trước - Sau, Ở giữa">
        {/* Đường đi / hàng kẻ */}
        <line x1="20" y1="160" x2="320" y2="160" stroke="#cbd5e1" strokeWidth="4" />
        <polygon points="325,160 310,152 310,168" fill="#94a3b8" />
        <text x="315" y="180" textAnchor="end" fontSize="11" fontWeight="700" fill="#64748b">
          Hướng đi ➔
        </text>

        {/* 1. Đi đầu: Ở ĐẰNG TRƯỚC */}
        <g transform="translate(210, 60)">
          <circle cx="40" cy="50" r="30" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          <circle cx="40" cy="50" r="14" fill="#dcfce7" />
          <text x="40" y="55" textAnchor="middle" fontSize="15" fontWeight="900" fill="#15803d">1</text>
          <rect x="-5" y="-30" width="90" height="24" rx="12" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
          <text x="40" y="-14" textAnchor="middle" fontSize="12" fontWeight="800" fill="#15803d">
            Ở TRƯỚC
          </text>
        </g>

        {/* 2. Ở GIỮA */}
        <g transform="translate(125, 60)">
          <circle cx="40" cy="50" r="30" fill="#eab308" stroke="#a16207" strokeWidth="3" />
          <circle cx="40" cy="50" r="14" fill="#fef9c3" />
          <text x="40" y="55" textAnchor="middle" fontSize="15" fontWeight="900" fill="#a16207">2</text>
          <rect x="-5" y="-30" width="90" height="24" rx="12" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" />
          <text x="40" y="-14" textAnchor="middle" fontSize="12" fontWeight="800" fill="#a16207">
            Ở GIỮA
          </text>
        </g>

        {/* 3. Đi cuối: Ở ĐẰNG SAU */}
        <g transform="translate(40, 60)">
          <circle cx="40" cy="50" r="30" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" />
          <circle cx="40" cy="50" r="14" fill="#fee2e2" />
          <text x="40" y="55" textAnchor="middle" fontSize="15" fontWeight="900" fill="#b91c1c">3</text>
          <rect x="-5" y="-30" width="90" height="24" rx="12" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.5" />
          <text x="40" y="-14" textAnchor="middle" fontSize="12" fontWeight="800" fill="#b91c1c">
            Ở SAU
          </text>
        </g>

        <rect x="25" y="195" width="290" height="26" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="170" y="213" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e293b">
          Xếp hàng: Số 1 ở TRƯỚC · Số 2 ở GIỮA · Số 3 ở SAU
        </text>
      </svg>
      {note && <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>}
    </div>
  );
}

