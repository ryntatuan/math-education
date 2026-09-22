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
  const chuDinh = Array.isArray(vertexLabels) ? vertexLabels.filter(Boolean) : [];
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
                  const [dx, dy] = (HUONG_CHU_DINH[k] || HUONG_CHU_DINH.rectangle)[
                    i % pts.length
                  ];
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
   *
   * 🔴 VÌ SAO CẦN. Lớp 5 dạy công thức bằng CHỮ: "Sxq = (a + b) × 2 × c", "V = a × b × c",
   * "V = a × a × a" — nhưng hình khối chỉ ghi SỐ ("dài 4, rộng 3, cao 2"). Trẻ phải tự
   * đoán xem chữ a trong công thức ứng với cạnh nào trên hình. Cùng họ lỗi với việc hình
   * tứ giác không ghi tên đỉnh A, B, C, D (người dùng báo 2026-09-22).
   *
   * Vị trí: `a` = cạnh DÀI dưới cùng, `b` = cạnh RỘNG (nghiêng, bên phải), `c` = cạnh
   * CAO (thẳng đứng, bên trái). Đúng cách sách giáo khoa ghi.
   *
   * ⚠️ KHỐI LẬP PHƯƠNG cố ý KHÔNG ghi chữ ở cạnh dưới: chỗ đó đã có câu "Sáu mặt đều là
   * hình vuông" ở y = 240, ghi thêm là hai dòng chữ chồng nhau. Lập phương ghi `a` ở cạnh
   * trên và cạnh đứng bên trái.
   */
  sideLetters = null,
}) {
  const k = SOLID_NAME[kind] ? kind : "cuboid";
  // Cùng lý do như `MotionDiagram`: mặc định `= {}` không chặn `null`.
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
            {/* Chữ a, b, c ghi lên ba cạnh — khớp công thức dùng chữ của Lớp 5. */}
            {SL.c && (
              <text
                x="46"
                y="161"
                textAnchor="end"
                fontSize="18"
                fontWeight="900"
                fill={P.blue}
              >
                {SL.c}
              </text>
            )}
            {k === "cuboid" && SL.a && (
              <text
                x="130"
                y="236"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fill={P.blue}
              >
                {SL.a}
              </text>
            )}
            {k === "cube" && SL.a && (
              /**
               * Lập phương: chữ `a` ở HAI cạnh đứng (trái và phải) — nhấn mạnh MỌI cạnh của
               * lập phương đều bằng `a` (đúng ý công thức V = a × a × a). Cố ý KHÔNG ghi ở
               * cạnh dưới vì chỗ đó đã có câu "Sáu mặt đều là hình vuông" (sẽ chồng chữ).
               */
              <>
                <text
                  x="46"
                  y="161"
                  textAnchor="end"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.blue}
                >
                  {SL.a}
                </text>
                <text
                  x="274"
                  y="116"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.rose}
                >
                  {SL.a}
                </text>
              </>
            )}
            {k === "cuboid" && SL.b && (
              <text
                x="244"
                y="201"
                fontSize="18"
                fontWeight="900"
                fill={P.rose}
              >
                {SL.b}
              </text>
            )}
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
            <text
              x="264"
              y="130"
              fontSize="17"
              fontWeight="900"
              fill={P.rose}
            >
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
            {(kind === "line" ? [92, 228] : chu.length >= 3 ? [46, 160, 274] : [46, 274]).map(
              (x, i, ds) => (
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
              ),
            )}
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
