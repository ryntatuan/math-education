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

import {
  CARD_STYLE,
  CAPTION_STYLE,
  captionText,
  svgFit,
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

  /**
   * Bbox ngang của MỌI thứ sẽ vẽ (hình + nhãn đỉnh + nhãn cạnh + tên hình) ⇒ dịch nội dung
   * để lề trái/phải bằng nhau. Chữ ước 8,5 đơn vị/ký tự cho cỡ 17–16, 7,4 cho cỡ 15.
   */
  const RONG_CHU = 8.5;
  let mx0 = Math.min(...pts.map((p) => p[0]));
  let mx1 = Math.max(...pts.map((p) => p[0]));
  if (k !== "circle") {
    /**
     * ⚠️ Nhãn “đỉnh”/tên đỉnh CHỈ được vẽ khi `vertices` hoặc `vertexLabels` có giá trị —
     * tính nó vào bbox khi hình không vẽ là **tự bịa ra chỗ trống** ⇒ dịch sai 19 đơn vị
     * (đã mắc: ca `planeShape #4`, hình vuông 5 cm bị đẩy lệch phải 38).
     */
    if (vertices || coChuDinh) {
      if (coChuDinh) {
        pts.forEach(([vx], i) => {
          const huong = (HUONG_CHU_DINH[k] || HUONG_CHU_DINH.rectangle)[
            i % pts.length
          ];
          const hx = huong ? huong[0] : 0;
          const xc = vx + hx * 15;
          const w = RONG_CHU * String(chuDinh[i % chuDinh.length] ?? "").length;
          if (hx > 0.35) mx1 = Math.max(mx1, xc + w);
          else if (hx < -0.35) mx0 = Math.min(mx0, xc - w);
          else {
            mx0 = Math.min(mx0, xc - w / 2);
            mx1 = Math.max(mx1, xc + w / 2);
          }
        });
      } else if (vertexLabel) {
        mx0 = Math.min(mx0, pts[0][0] - 8 - 7.4 * String(vertexLabel).length);
      }
    }
    lb.forEach((t, i) => {
      const m = edgeMid(i);
      if (!m || !t) return;
      mx0 = Math.min(mx0, m[0] - 30);
      mx1 = Math.max(mx1, m[0] + 30);
    });
  }
  if (showName) {
    const w = RONG_CHU * String(PLANE[k] ?? "").length;
    mx0 = Math.min(mx0, 160 - w / 2);
    mx1 = Math.max(mx1, 160 + w / 2);
  }
  const dxGiua = 160 - (mx0 + mx1) / 2;

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 320 ${H}`}
        {...svgFit(320)}
        role="img"
        aria-label={PLANE[k]}
      >
        {/**
         * 🔴 CANH GIỮA THEO NỘI DUNG THẬT. Nhãn đỉnh (A, B, C, D…) và nhãn cạnh vươn ra
         * hai bên KHÔNG đều nhau ⇒ đo được **12+ ca lệch phải 27–39 đơn vị** và 2 ca lệch
         * trái 35 (người dùng báo 2026-09-24: “sao không làm full và đều hai bên”). Đã thử
         * dịch khung một số cứng ⇒ bù quá tay (25 ca lệch trái). Nay **tính bbox** rồi dịch.
         */}
        <g transform={`translate(${dxGiua},0)`}>
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
        </g>
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
      <span style={caption}>{captionText(def.note, label)}</span>
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
                y="216"
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
              y="241"
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
              <line
                x1="25"
                y1="100"
                x2="25"
                y2="170"
                stroke={P.blue}
                strokeWidth="2.5"
              />
              <text
                x="75"
                y="195"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                Khối lập phương
              </text>
              <text
                x="75"
                y="215"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={P.blue}
              >
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
              <line
                x1="160"
                y1="115"
                x2="160"
                y2="170"
                stroke={P.blue}
                strokeWidth="2.5"
              />
              <text
                x="235"
                y="195"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                Khối hộp chữ nhật
              </text>
              <text
                x="235"
                y="215"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={P.amber}
              >
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
            <rect
              x="15"
              y="160"
              width="250"
              height="15"
              fill="#d97706"
              rx="2"
            />
            <rect x="25" y="175" width="14" height="42" fill="#b45309" rx="2" />
            <rect
              x="240"
              y="175"
              width="14"
              height="42"
              fill="#b45309"
              rx="2"
            />

            {/* Bóng đổ khối Rubik */}
            <ellipse
              cx="145"
              cy="148"
              rx="55"
              ry="12"
              fill="#000000"
              opacity="0.18"
            />

            {/* Khối Rubik 3x3 */}
            <g transform="translate(85, 45)">
              <rect x="0" y="35" width="84" height="84" fill="#0f172a" rx="3" />
              <polygon points="0,35 35,0 119,0 84,35" fill="#0f172a" />
              <polygon points="84,35 119,0 119,84 84,119" fill="#0f172a" />

              {/* Ô vuông mặt trước (3x3) */}
              <rect x="2" y="37" width="24" height="24" rx="2" fill="#ef4444" />
              <rect
                x="30"
                y="37"
                width="24"
                height="24"
                rx="2"
                fill="#22c55e"
              />
              <rect
                x="58"
                y="37"
                width="24"
                height="24"
                rx="2"
                fill="#ef4444"
              />
              <rect x="2" y="65" width="24" height="24" rx="2" fill="#ffffff" />
              <rect
                x="30"
                y="65"
                width="24"
                height="24"
                rx="2"
                fill="#ef4444"
              />
              <rect
                x="58"
                y="65"
                width="24"
                height="24"
                rx="2"
                fill="#eab308"
              />
              <rect x="2" y="93" width="24" height="24" rx="2" fill="#3b82f6" />
              <rect
                x="30"
                y="93"
                width="24"
                height="24"
                rx="2"
                fill="#22c55e"
              />
              <rect
                x="58"
                y="93"
                width="24"
                height="24"
                rx="2"
                fill="#ef4444"
              />

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
        <circle
          cx="85"
          cy="100"
          r="7"
          fill={P.paper}
          stroke={P.ink}
          strokeWidth="2"
        />
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
        <circle
          cx="42"
          cy="85"
          r="5"
          fill="none"
          stroke={P.blue}
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="70"
          r="3.5"
          fill="none"
          stroke={P.blue}
          strokeWidth="2"
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
              <polygon points="168,70 156,64 156,76" fill={P.ink} />
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
              <polygon points="186,65 174,59 174,71" fill={P.ink} />
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
                [59, 62],
                [209, 62],
                [263, 140],
                [153, 198],
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

/* ───────────────────── VỊ TRÍ & XẾP KHỐI (LỚP 1 — CHỦ ĐỀ 4) ─────────────────────
 * spatialScene: {
 *   mode: "topBottom" | "leftRight" | "frontBack" | "ballUnderTableQuiz" | "carLeftQuiz"
 *       | "dollCatTable" | "rabbitQueue" | "trainCars" | "trafficLight"
 *       | "maisCastle" | "lettersTHC" | "cubeComposite2x2" | "patternSequence"
 *       | "solidSort" | "movieRows" | "brickRows" | "diceFaces" | "cubeWalls",
 *   kind: "shape" | "color"   // chỉ dùng cho patternSequence
 *   round: 1 | 2              // chỉ dùng cho solidSort
 *   hideNumbers: true         // chỉ dùng cho trainCars (chế độ hỏi)
 *   showColors: true          // chỉ dùng cho trafficLight: hiện TÊN MÀU cạnh từng đèn
 *                             // (mặc định TẮT — câu hỏi “đèn trên cùng màu gì?” mà in
 *                             //  sẵn tên màu lên hình là cho luôn đáp án)
 *   front / back: số bạn mỗi hàng  // chỉ dùng cho movieRows (mặc định 4 và 6 — SGK tr.97,
 *                             // người dùng đếm lại trên sách: 4 + 6 = 10 bạn)
 *   pipFront / pipTop / pipRight: số chấm ở ba mặt nhìn thấy của con xúc xắc
 *                             // chỉ dùng cho diceFaces (mặc định 5 / 3 / 6 — ĐO từ SGK tr.100)
 *   note
 * }
 */

/**
 * Một khối gỗ vẽ ở góc nhìn đẳng cự — dùng cho các cảnh XẾP KHỐI.
 * `w` × `h` là MẶT TRƯỚC: tỉ lệ này là thứ duy nhất giúp bé phân biệt
 * "khối lập phương" (mặt trước vuông) với "khối hộp chữ nhật" (mặt trước dài).
 * ⇒ Vẽ khối lập phương thì `w === h`; vẽ khối hộp chữ nhật thì `w >= 2.5 × h`.
 */
const Block3D = ({
  x = 0,
  y = 0,
  w = 40,
  h = 40,
  d = 16,
  fill = "#fbbf24",
  stroke = "#b45309",
}) => {
  // 🔴 ÉP VỀ SỐ trước khi tính. Nếu người gọi truyền chuỗi (`y="62"`), phép `y + h`
  // thành "6220" ⇒ đa giác vẽ ra một vệt dài kỳ dị. Đã mắc thật 2026-09-24 ở
  // `patternSequence` — và nó KHÔNG sinh lỗi cú pháp, chỉ vẽ sai.
  const X = num(x, 0);
  const Y = num(y, 0);
  const W = num(w, 40);
  const H = num(h, 40);
  const D = num(d, 16);
  const dx = D * 0.6;
  const dy = D * 0.5;
  const top = `${X},${Y} ${X + dx},${Y - dy} ${X + W + dx},${Y - dy} ${X + W},${Y}`;
  const side = `${X + W},${Y} ${X + W + dx},${Y - dy} ${X + W + dx},${Y - dy + H} ${X + W},${Y + H}`;
  return (
    <g>
      <polygon points={top} fill={fill} />
      <polygon points={top} fill="#ffffff" opacity="0.45" />
      <polygon points={side} fill={fill} />
      <polygon points={side} fill="#000000" opacity="0.16" />
      <rect
        x={X}
        y={Y}
        width={W}
        height={H}
        rx="2"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
      />
      <polygon points={top} fill="none" stroke={stroke} strokeWidth="1.6" />
      <polygon points={side} fill="none" stroke={stroke} strokeWidth="1.6" />
    </g>
  );
};

/** Nhãn dạng “viên thuốc” — dùng chung cho các cảnh vị trí (chữ ≥ 14 đơn vị viewBox). */
const LabelPill = ({
  x = 0,
  y = 0,
  w = 120,
  text = "",
  fill = "#dbeafe",
  stroke = "#2563eb",
  color = "#1e40af",
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={26}
      rx={13}
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
    />
    <text
      x={x + w / 2}
      y={y + 18}
      textAnchor="middle"
      fontSize="14"
      fontWeight="800"
      fill={color}
    >
      {text}
    </text>
  </g>
);

/** Xếp các khối lập phương nhỏ thành một CHỮ CÁI (SGK tr.94: chữ T, H, C).
 *
 *  `cell` = khoảng cách giữa hai ô liền kề; `size` = cạnh khối vẽ ra.
 *  ⚠️ PHẢI để `size < cell` (chừa khe ~3 đơn vị). Khối dính sát nhau thì các nét
 *  chồng lên nhau và cả chữ thành MỘT MẢNG VUÔNG — bé không đọc ra chữ (đã bị phản hồi
 *  2026-09-24: “chữ THC nên vẽ rõ hơn”).
 */
const LetterBlocks = ({
  x = 0,
  y = 0,
  cells = [],
  cell = 26,
  size = 23,
  depth = 12,
  fill = "#fbbf24",
  stroke = "#b45309",
}) => (
  <g>
    {cells.map(([cx, cy], i) => (
      <Block3D
        key={i}
        x={x + cx * cell}
        y={y + cy * cell}
        w={size}
        h={size}
        d={depth}
        fill={fill}
        stroke={stroke}
      />
    ))}
  </g>
);

export function SpatialScene({
  mode = "topBottom",
  note = "",
  kind = "shape",
  round = 1,
  hideNumbers = false,
  showColors = false,
  front = 4,
  back = 6,
  pipFront = 5,
  pipTop = 3,
  pipRight = 6,
}) {
  if (mode === "topBottom" || mode === "ballUnderTableQuiz") {
    const isQuiz = mode === "ballUnderTableQuiz";
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 230"
          {...svgFit(340)}
          role="img"
          aria-label="Vị trí Trên - Dưới"
        >
          {/* Chân bàn phía sau (vẽ trước để mặt bàn che phần đỉnh) */}
          <line
            x1="102"
            y1="75"
            x2="102"
            y2="155"
            stroke="#92400e"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1="285"
            y1="75"
            x2="285"
            y2="155"
            stroke="#92400e"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Mặt bàn gỗ */}
          <polygon
            points="45,100 100,70 295,70 240,100"
            fill="#fde68a"
            stroke="#d97706"
            strokeWidth="3"
          />
          <rect x="45" y="100" width="195" height="12" fill="#d97706" rx="2" />

          {/* Chân bàn phía trước */}
          <line
            x1="55"
            y1="112"
            x2="55"
            y2="180"
            stroke="#b45309"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="230"
            y1="112"
            x2="230"
            y2="180"
            stroke="#b45309"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Mặt sàn */}
          <line
            x1="15"
            y1="180"
            x2="325"
            y2="180"
            stroke="#cbd5e1"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* QUYỂN SÁCH Ở TRÊN BÀN */}
          {!isQuiz && (
            <g>
              {/* Bóng đổ của quyển sách trên mặt bàn */}
              <ellipse
                cx="170"
                cy="87"
                rx="66"
                ry="11"
                fill="#78350f"
                opacity="0.32"
              />

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
              <line
                x1="108.5"
                y1="52"
                x2="108.5"
                y2="82"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              <line
                x1="231.5"
                y1="52"
                x2="231.5"
                y2="82"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

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
              <line
                x1="170"
                y1="56"
                x2="170"
                y2="85"
                stroke="#94a3b8"
                strokeWidth="1.8"
              />
              <line
                x1="168"
                y1="57"
                x2="168"
                y2="84"
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              <line
                x1="172"
                y1="57"
                x2="172"
                y2="84"
                stroke="#cbd5e1"
                strokeWidth="1"
              />

              {/* Nội dung trên trang trái: Tiêu đề xanh + các dòng chữ */}
              <line
                x1="118"
                y1="58"
                x2="142"
                y2="58"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="118"
                y1="64"
                x2="162"
                y2="64"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="118"
                y1="70"
                x2="160"
                y2="70"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="118"
                y1="76"
                x2="150"
                y2="76"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Nội dung trên trang phải: Hình tam giác, hình tròn minh hoạ + dòng chữ */}
              <polygon points="186,57 194,70 178,70" fill="#ef4444" />
              <circle cx="206" cy="64" r="6" fill="#3b82f6" />
              <line
                x1="178"
                y1="76"
                x2="222"
                y2="76"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Dải ruy-băng đỏ đánh dấu trang rủ xuống bàn */}
              <path
                d="M 170,62 Q 166,74 168,86 Q 169,93 166,98 L 170,95 L 174,98 Q 172,93 171,86 Q 173,74 170,62 Z"
                fill="#e11d48"
                stroke="#9f1239"
                strokeWidth="0.8"
              />

              {/* Nhãn Ở TRÊN */}
              <rect
                x="80"
                y="14"
                width="165"
                height="26"
                rx="13"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="1.5"
              />
              <text
                x="162"
                y="32"
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#1e40af"
              >
                ⬆️ Sách ở TRÊN bàn
              </text>
            </g>
          )}

          {/* QUẢ BÓNG Ở DƯỚI GẦM BÀN */}
          <g>
            <ellipse
              cx="145"
              cy="178"
              rx="20"
              ry="5"
              fill="#000000"
              opacity="0.15"
            />
            <circle
              cx="145"
              cy="158"
              r="18"
              fill="#fb923c"
              stroke="#c2410c"
              strokeWidth="2.5"
            />
            {/* Đường múi bóng */}
            <path
              d="M132,152 Q145,158 145,176"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M158,152 Q145,158 145,176"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M135,168 Q145,158 155,168"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Nhãn Ở DƯỚI */}
            {isQuiz ? (
              <>
                <rect
                  x="95"
                  y="196"
                  width="150"
                  height="26"
                  rx="13"
                  fill="#ffedd5"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                />
                <text
                  x="170"
                  y="214"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#9a3412"
                >
                  Vị trí của quả bóng?
                </text>
              </>
            ) : (
              <>
                <rect
                  x="75"
                  y="196"
                  width="190"
                  height="26"
                  rx="13"
                  fill="#ffedd5"
                  stroke="#ea580c"
                  strokeWidth="1.5"
                />
                <text
                  x="170"
                  y="214"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#9a3412"
                >
                  ⬇️ Quả bóng ở DƯỚI gầm bàn
                </text>
              </>
            )}
          </g>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  if (mode === "leftRight" || mode === "carLeftQuiz") {
    const isQuiz = mode === "carLeftQuiz";
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 230"
          {...svgFit(340)}
          role="img"
          aria-label="Vị trí Trái - Phải"
        >
          {/* Đường phân chia ở giữa */}
          <line
            x1="170"
            y1="15"
            x2="170"
            y2="190"
            stroke="#e2e8f0"
            strokeWidth="3"
            strokeDasharray="8 6"
          />

          {/* BÊN TRÁI: Chiếc ô tô */}
          <g>
            {!isQuiz && (
              <>
                <rect
                  x="25"
                  y="15"
                  width="120"
                  height="28"
                  rx="14"
                  fill="#dbeafe"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
                <text
                  x="85"
                  y="34"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#1e40af"
                >
                  ⬅️ Bên TRÁI
                </text>
              </>
            )}
            {/* Vẽ ô tô */}
            <g transform="translate(40, 70)">
              <path
                d="M20,25 L35,8 L65,8 L78,25 Z"
                fill="#60a5fa"
                stroke="#2563eb"
                strokeWidth="2.5"
              />
              <rect
                x="5"
                y="25"
                width="85"
                height="25"
                rx="5"
                fill="#3b82f6"
                stroke="#1d4ed8"
                strokeWidth="2.5"
              />
              <polygon points="36,11 62,11 62,23 25,23" fill="#dbeafe" />
              <circle cx="8" cy="35" r="4" fill="#fef08a" />
              <circle cx="25" cy="50" r="12" fill="#1e293b" />
              <circle cx="25" cy="50" r="5" fill="#cbd5e1" />
              <circle cx="70" cy="50" r="12" fill="#1e293b" />
              <circle cx="70" cy="50" r="5" fill="#cbd5e1" />
            </g>
            <text
              x="85"
              y="165"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill="#1e40af"
            >
              Chiếc ô tô
            </text>
          </g>

          {/* BÊN PHẢI: Quả bóng */}
          <g>
            {!isQuiz && (
              <>
                <rect
                  x="195"
                  y="15"
                  width="120"
                  height="28"
                  rx="14"
                  fill="#fce7f3"
                  stroke="#db2777"
                  strokeWidth="1.5"
                />
                <text
                  x="255"
                  y="34"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#9d174d"
                >
                  Bên PHẢI ➡️
                </text>
              </>
            )}
            {/* Vẽ quả bóng */}
            <g transform="translate(215, 70)">
              <ellipse
                cx="40"
                cy="62"
                rx="25"
                ry="6"
                fill="#000000"
                opacity="0.15"
              />
              <circle
                cx="40"
                cy="32"
                r="30"
                fill="#ec4899"
                stroke="#be185d"
                strokeWidth="3"
              />
              <circle
                cx="40"
                cy="32"
                r="14"
                fill="#fdf2f8"
                stroke="#be185d"
                strokeWidth="2"
              />
              <path
                d="M40,2 L40,62"
                stroke="#be185d"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </g>
            <text
              x="255"
              y="165"
              textAnchor="middle"
              fontSize="14"
              fontWeight="800"
              fill="#9d174d"
            >
              Quả bóng
            </text>
          </g>

          {/* Dòng kết luận phía dưới */}
          <rect
            x="25"
            y="192"
            width="290"
            height="28"
            rx="6"
            fill="#f8fafc"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          <text
            x="170"
            y="211"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#1e293b"
          >
            {isQuiz
              ? "Bé hãy xác định vị trí hai đồ vật"
              : "Ô tô ở bên TRÁI · Quả bóng ở bên PHẢI"}
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Lâu đài khối gỗ của bạn Mai (SGK tr.94) ────────────────────────────────
   * 🔴 ĐÁP ÁN ĐÚNG (người dùng chốt 2026-09-24): hàng nền có **5 khối lập phương**;
   * hàng giữa có **2 khối hộp chữ nhật màu đỏ**.
   * ⚠️ Vì vậy 5 khối hàng nền PHẢI vuông ở mặt trước (`w === h`), còn khối đỏ và khối
   * vàng tầng trên phải DÀI rõ (`w >= 2.5 × h`) — bé đếm bằng mắt, không đo.
   * ⚠️ KHÔNG vẽ chữ nào ghi số lượng: đây là câu hỏi ĐẾM, ghi đáp án lên hình là cho luôn. */
  if (mode === "maisCastle") {
    const BASE = 196;
    const S = 42;
    const GAP = 2;
    const bottomRow = [
      { fill: "#fbbf24", stroke: "#b45309" },
      { fill: "#38bdf8", stroke: "#0369a1" },
      { fill: "#fbbf24", stroke: "#b45309" },
      { fill: "#38bdf8", stroke: "#0369a1" },
      { fill: "#fbbf24", stroke: "#b45309" },
    ];
    const roofBase = BASE - S - 22 - 20;
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 240"
          {...svgFit(340)}
          role="img"
          aria-label="Mô hình khối gỗ của bạn Mai"
        >
          <line
            x1="18"
            y1={BASE + 10}
            x2="322"
            y2={BASE + 10}
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          {bottomRow.map((b, i) => (
            <Block3D
              key={"n" + i}
              x={40 + i * (S + GAP)}
              y={BASE - S}
              w={S}
              h={S}
              d={18}
              fill={b.fill}
              stroke={b.stroke}
            />
          ))}
          <Block3D
            x={86}
            y={BASE - S - 22}
            w={64}
            h={22}
            d={18}
            fill="#ef4444"
            stroke="#b91c1c"
          />
          <Block3D
            x={152}
            y={BASE - S - 22}
            w={64}
            h={22}
            d={18}
            fill="#ef4444"
            stroke="#b91c1c"
          />
          <Block3D
            x={104}
            y={roofBase}
            w={94}
            h={20}
            d={18}
            fill="#fbbf24"
            stroke="#b45309"
          />
          <polygon
            points={`${104 + 11},${roofBase - 9} ${198 + 11},${roofBase - 9} ${151 + 11},${roofBase - 43}`}
            fill="#ef4444"
          />
          <polygon
            points={`104,${roofBase} ${115},${roofBase - 9} ${162},${roofBase - 43} ${151},${roofBase - 34}`}
            fill="#ef4444"
          />
          <polygon
            points={`198,${roofBase} ${209},${roofBase - 9} ${162},${roofBase - 43} ${151},${roofBase - 34}`}
            fill="#ef4444"
            opacity="0.88"
          />
          <polygon
            points={`104,${roofBase} 198,${roofBase} 151,${roofBase - 34}`}
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="1.6"
          />
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Chữ T, H, C xếp bằng khối lập phương nhỏ (SGK tr.94) ────────────────────
   * Đáp án (đếm trên ảnh phóng to): T = 5 khối · H = 7 khối · C = 5 khối
   * ⇒ chữ H nhiều khối nhất; T và C bằng nhau. */
  if (mode === "lettersTHC") {
    const T = [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [1, 2],
    ];
    const H = [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    const C = [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 360 200"
          {...svgFit(360)}
          role="img"
          aria-label="Chữ T, H, C xếp bằng khối lập phương"
        >
          <LetterBlocks x={24} y={78} cells={T} />
          <LetterBlocks
            x={140}
            y={78}
            cells={H}
            fill="#38bdf8"
            stroke="#0369a1"
          />
          <LetterBlocks
            x={256}
            y={78}
            cells={C}
            fill="#fb923c"
            stroke="#c2410c"
          />
          <text
            x="180"
            y="192"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Mỗi ô vuông nhỏ là một khối lập phương
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Từ 8 khối lập phương nhỏ xếp thành khối lập phương lớn (SGK tr.100–101) ── */
  if (mode === "cubeComposite2x2") {
    const S = 24;
    const loose = [
      [15, 92],
      [41, 92],
      [67, 92],
      [93, 92],
      [15, 124],
      [41, 124],
      [67, 124],
      [93, 124],
    ];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 200"
          {...svgFit(340)}
          role="img"
          aria-label="Tám khối nhỏ xếp thành khối lập phương lớn"
        >
          {loose.map(([x, y], i) => (
            <Block3D key={"l" + i} x={x} y={y} w={S} h={S} d={10} />
          ))}
          <line
            x1="150"
            y1="118"
            x2="182"
            y2="118"
            stroke={P.soft}
            strokeWidth="3"
          />
          <polygon points="192,118 178,110 178,126" fill={P.soft} />
          {/* Lớp SAU vẽ trước để lớp trước che đúng chỗ (lệch đúng bằng độ sâu của khối) */}
          {[
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ].map(([cx, cy], i) => (
            <Block3D
              key={"b" + i}
              x={214 + cx * 26 + 6}
              y={92 + cy * 26 - 5}
              w={S}
              h={S}
              d={10}
              fill="#a5b4fc"
              stroke="#4338ca"
            />
          ))}
          {[
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
          ].map(([cx, cy], i) => (
            <Block3D
              key={"f" + i}
              x={214 + cx * 26}
              y={92 + cy * 26}
              w={S}
              h={S}
              d={10}
            />
          ))}
          <text
            x="66"
            y="176"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.soft}
          >
            8 khối nhỏ
          </text>
          <text
            x="252"
            y="190"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.soft}
          >
            Một khối lập phương lớn
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── MỘT HÀNG HÌNH PHẲNG theo thứ tự TRÁI → PHẢI (SGK tr.99, bài Phải – Trái) ──
   * 🔴 VÌ SAO CẦN: slide cũ chỉ có **BẢNG CHỮ** “thứ 1… thứ 4” mà không có hình ⇒ trẻ không
   * biết đang nói tới cách xếp nào (người dùng báo 2026-09-24: “hình không mô tả cụ thể”).
   * Đối chiếu ẢNH SGK tr.99 (`scratch/t99.png`): hàng ngang gồm **tam giác (xanh) · vuông
   * (vàng) · tròn (cam) · chữ nhật (đỏ)**, và câu hỏi “hình nào ở giữa tam giác và tròn?”.
   */
  if (mode === "shapeRow") {
    const o = 64;
    const yG = 34;
    const hinh = [
      { ten: "tam giác", cx: 56, ve: "tg", fill: "#22c55e", stroke: "#15803d" },
      {
        ten: "vuông",
        cx: 136,
        ve: "vuong",
        fill: "#facc15",
        stroke: "#a16207",
      },
      { ten: "tròn", cx: 216, ve: "tron", fill: "#f59e0b", stroke: "#b45309" },
      {
        ten: "chữ nhật",
        cx: 300,
        ve: "cn",
        fill: "#ef4444",
        stroke: "#b91c1c",
      },
    ];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 360 150"
          {...svgFit(360)}
          role="img"
          aria-label="Bốn hình xếp theo thứ tự từ trái sang phải"
        >
          {hinh.map((h, i) => (
            <g key={i}>
              {h.ve === "tg" && (
                <polygon
                  points={`${h.cx},${yG} ${h.cx + o / 2},${yG + o} ${h.cx - o / 2},${yG + o}`}
                  fill={h.fill}
                  stroke={h.stroke}
                  strokeWidth="2"
                />
              )}
              {h.ve === "vuong" && (
                <rect
                  x={h.cx - o / 2}
                  y={yG}
                  width={o}
                  height={o}
                  fill={h.fill}
                  stroke={h.stroke}
                  strokeWidth="2"
                />
              )}
              {h.ve === "tron" && (
                <circle
                  cx={h.cx}
                  cy={yG + o / 2}
                  r={o / 2}
                  fill={h.fill}
                  stroke={h.stroke}
                  strokeWidth="2"
                />
              )}
              {h.ve === "cn" && (
                <rect
                  x={h.cx - 42}
                  y={yG + 5}
                  width={84}
                  height={o - 10}
                  fill={h.fill}
                  stroke={h.stroke}
                  strokeWidth="2"
                />
              )}
              <text
                x={h.cx}
                y={yG + o + 20}
                textAnchor="middle"
                fontSize="12"
                fontWeight="800"
                fill={P.ink}
              >
                {h.ten}
              </text>
            </g>
          ))}
          <line
            x1="14"
            y1="124"
            x2="346"
            y2="124"
            stroke={P.grid}
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="14" y="142" fontSize="13" fontWeight="900" fill={P.blue}>
            ⬅ TRÁI
          </text>
          <text
            x="346"
            y="142"
            textAnchor="end"
            fontSize="13"
            fontWeight="900"
            fill={P.rose}
          >
            PHẢI ➡
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Chuỗi quy luật — HOẠT ĐỘNG BỔ SUNG (không thuộc SGK tr.101) ──────────────
   * kind = "shape" → hộp chữ nhật, lập phương, hộp chữ nhật, lập phương, hộp chữ nhật, [?]
   *                   ⇒ đáp án: khối LẬP PHƯƠNG
   * kind = "color" → đỏ, vàng, xanh, đỏ, vàng, [?] ⇒ đáp án: màu XANH */
  if (mode === "patternSequence") {
    const SLOT = 46;
    const isColor = kind === "color";
    const colors = ["#ef4444", "#f59e0b", "#22c55e", "#ef4444", "#f59e0b"];
    const shapes = ["cuboid", "cube", "cuboid", "cube", "cuboid"];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 150"
          {...svgFit(340)}
          role="img"
          aria-label="Dãy quy luật — tìm hình còn thiếu"
        >
          {(isColor ? colors : shapes).map((v, i) => {
            const x = 26 + i * SLOT;
            if (isColor)
              return (
                <circle
                  key={"c" + i}
                  cx={x + 15}
                  cy="72"
                  r="16"
                  fill={v}
                  stroke="#334155"
                  strokeWidth="1.6"
                />
              );
            return v === "cube" ? (
              <Block3D key={"s" + i} x={x + 6} y={58} w={28} h={28} d={10} />
            ) : (
              <Block3D
                key={"s" + i}
                x={x}
                y={62}
                w={40}
                h={20}
                d={10}
                fill="#38bdf8"
                stroke="#0369a1"
              />
            );
          })}
          <g>
            <rect
              x={26 + 5 * SLOT}
              y="42"
              width="42"
              height="42"
              rx="8"
              fill="#f8fafc"
              stroke={P.soft}
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text
              x={26 + 5 * SLOT + 21}
              y="74"
              textAnchor="middle"
              fontSize="24"
              fontWeight="900"
              fill={P.soft}
            >
              ?
            </text>
          </g>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Búp bê ở TRÊN bàn, mèo ở DƯỚI gầm bàn (SGK tr.96) ─────────────────────── */
  if (mode === "dollCatTable") {
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 250"
          {...svgFit(340)}
          role="img"
          aria-label="Búp bê ở trên bàn, con mèo ở dưới gầm bàn"
        >
          <line
            x1="16"
            y1="214"
            x2="324"
            y2="214"
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          {/* chân bàn phía sau (vẽ trước để mặt bàn che phần trên) */}
          <line
            x1="96"
            y1="102"
            x2="96"
            y2="196"
            stroke="#b45309"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="248"
            y1="102"
            x2="248"
            y2="196"
            stroke="#b45309"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* mặt bàn */}
          <polygon
            points="48,102 98,84 306,84 256,102"
            fill="#fde68a"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          <rect x="48" y="102" width="208" height="12" rx="3" fill="#d97706" />
          {/* chân bàn phía trước */}
          <line
            x1="60"
            y1="114"
            x2="60"
            y2="214"
            stroke="#92400e"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="244"
            y1="114"
            x2="244"
            y2="214"
            stroke="#92400e"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* BÚP BÊ — ngồi trên mặt bàn */}
          <g>
            <ellipse
              cx="122"
              cy="100"
              rx="26"
              ry="6"
              fill="#78350f"
              opacity="0.22"
            />
            <path
              d="M112,92 L112,74 L120,68 L132,70 L132,92 Z"
              fill="#60a5fa"
              stroke="#1d4ed8"
              strokeWidth="2"
            />
            <line
              x1="114"
              y1="92"
              x2="112"
              y2="104"
              stroke="#1d4ed8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="130"
              y1="92"
              x2="132"
              y2="104"
              stroke="#1d4ed8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="122"
              cy="56"
              r="14"
              fill="#fcd5ce"
              stroke="#e07a5f"
              strokeWidth="2"
            />
            <path
              d="M108,52 Q122,34 136,52 Q130,44 122,46 Q114,44 108,52"
              fill="#ef4444"
            />
            <circle cx="117" cy="57" r="1.8" fill="#334155" />
            <circle cx="127" cy="57" r="1.8" fill="#334155" />
            <path
              d="M118,63 q4,4 8,0"
              fill="none"
              stroke="#b45309"
              strokeWidth="1.6"
            />
            <line
              x1="110"
              y1="80"
              x2="96"
              y2="90"
              stroke="#e07a5f"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="134"
              y1="80"
              x2="148"
              y2="90"
              stroke="#e07a5f"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <LabelPill x={40} y={6} w={166} text="⬆️ Búp bê ở TRÊN bàn" />
          {/* CON MÈO — nằm dưới gầm bàn */}
          <g>
            <ellipse
              cx="196"
              cy="192"
              rx="40"
              ry="6"
              fill="#000000"
              opacity="0.12"
            />
            <ellipse
              cx="202"
              cy="174"
              rx="38"
              ry="20"
              fill="#fdba74"
              stroke="#c2410c"
              strokeWidth="2"
            />
            <path
              d="M176,168 q10,-8 18,0 M196,164 q10,-8 18,0 M216,168 q10,-8 16,0"
              fill="none"
              stroke="#c2410c"
              strokeWidth="2"
              opacity="0.5"
            />
            <circle
              cx="166"
              cy="160"
              r="16"
              fill="#fed7aa"
              stroke="#c2410c"
              strokeWidth="2"
            />
            <polygon
              points="152,152 156,132 168,146"
              fill="#fed7aa"
              stroke="#c2410c"
              strokeWidth="1.6"
            />
            <polygon
              points="176,146 186,130 176,144"
              fill="#fed7aa"
              stroke="#c2410c"
              strokeWidth="1.6"
            />
            <path
              d="M156,160 q6,6 12,0"
              fill="none"
              stroke="#7c2d12"
              strokeWidth="2"
            />
            <path
              d="M172,160 q6,6 12,0"
              fill="none"
              stroke="#7c2d12"
              strokeWidth="2"
            />
            <path
              d="M240,176 q24,-16 6,-34"
              fill="none"
              stroke="#c2410c"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          <LabelPill
            x={168}
            y={218}
            w={150}
            text="⬇️ Mèo ở DƯỚI bàn"
            fill="#ffedd5"
            stroke="#ea580c"
            color="#9a3412"
          />
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Ba chú thỏ: nâu TRƯỚC, khoang GIỮA, xám SAU — cà rốt ở phía trước (SGK tr.96) ── */
  if (mode === "rabbitQueue" || mode === "rabbitTurtleLeftRight") {
    const rabbit = (x, y, s, fill, stroke, earFill, patch) => (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <ellipse
          cx="30"
          cy="42"
          rx="26"
          ry="17"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.2"
        />
        {patch && (
          <path
            d="M14,32 q14,-8 26,2 q-12,10 -26,-2"
            fill={earFill}
            stroke={stroke}
            strokeWidth="1.6"
          />
        )}
        <circle
          cx="6"
          cy="26"
          r="13"
          fill={fill}
          stroke={stroke}
          strokeWidth="2.2"
        />
        <ellipse
          cx="-2"
          cy="6"
          rx="5.5"
          ry="15"
          transform="rotate(-14 -2 6)"
          fill={earFill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <ellipse
          cx="12"
          cy="4"
          rx="5.5"
          ry="15"
          transform="rotate(8 12 4)"
          fill={earFill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <circle cx="1" cy="24" r="2.2" fill="#1f2937" />
        <path
          d="M-4,30 q5,4 9,0"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.8"
        />
        <circle
          cx="54"
          cy="38"
          r="6"
          fill="#ffffff"
          stroke={stroke}
          strokeWidth="1.8"
        />
        <circle
          cx="22"
          cy="58"
          r="4"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.6"
        />
        <circle
          cx="42"
          cy="58"
          r="4"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.6"
        />
      </g>
    );
    const carrot = (x, y, s) => (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <path
          d="M-6,0 L6,0 L0,26 Z"
          fill="#fb923c"
          stroke="#c2410c"
          strokeWidth="1.6"
        />
        <path
          d="M0,0 q-10,-12 -14,-6 q8,4 12,10 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="1.4"
        />
        <path
          d="M0,0 q10,-12 14,-6 q-8,4 -12,10 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="1.4"
        />
      </g>
    );
    const turtle = (x, y, s) => (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <rect
          x="8"
          y="50"
          width="13"
          height="11"
          rx="4"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="1.8"
        />
        <rect
          x="54"
          y="50"
          width="13"
          height="11"
          rx="4"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="1.8"
        />
        <circle
          cx="74"
          cy="42"
          r="13"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="2.2"
        />
        <circle cx="79" cy="38" r="2.6" fill="#1f2937" />
        <path
          d="M79,47 q6,4 11,-1"
          fill="none"
          stroke="#15803d"
          strokeWidth="1.6"
        />
        <path
          d="M8,42 l-9,5 l9,5 Z"
          fill="#86efac"
          stroke="#15803d"
          strokeWidth="1.6"
        />
        <path
          d="M8,50 q2,-40 33,-40 q31,0 33,40 Z"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="2.4"
        />
        <path
          d="M18,48 q8,-26 23,-26 M44,48 q2,-28 22,-24"
          fill="none"
          stroke="#15803d"
          strokeWidth="1.8"
          opacity="0.7"
        />
      </g>
    );

    if (mode === "rabbitQueue") {
      return (
        <div style={card}>
          <svg
            viewBox="0 0 360 225"
            {...svgFit(360)}
            role="img"
            aria-label="Ba chú thỏ: thỏ nâu ở trước, thỏ khoang ở giữa, thỏ xám ở sau"
          >
            <line
              x1="14"
              y1="176"
              x2="346"
              y2="176"
              stroke="#86efac"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M14,176 h332"
              stroke="#4ade80"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={40 + i * 24}
                y1={182 + i * 2}
                x2={40 + i * 24}
                y2={190 + i * 2}
                stroke="#4ade80"
                strokeWidth="2"
              />
            ))}
            {carrot(58, 138, 0.9)}
            {carrot(96, 148, 0.75)}
            {rabbit(126, 96, 1, "#b45309", "#78350f", "#fde68a", false)}
            {rabbit(206, 100, 0.92, "#f5f5f4", "#78716c", "#e7e5e4", true)}
            {rabbit(280, 104, 0.85, "#a1a1aa", "#52525b", "#e4e4e7", false)}
            <LabelPill
              x={96}
              y={12}
              w={92}
              text="TRƯỚC"
              fill="#ffedd5"
              stroke="#ea580c"
              color="#9a3412"
            />
            <LabelPill x={182} y={20} w={86} text="GIỮA" />
            <LabelPill x={264} y={28} w={80} text="SAU" />
            <text
              x="180"
              y="212"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={P.soft}
            >
              Ba chú thỏ chạy về phía củ cà rốt
            </text>
          </svg>
          {note && (
            <span style={{ ...caption, color: P.ink, fontSize: 15 }}>
              {note}
            </span>
          )}
        </div>
      );
    }

    return (
      <div style={card}>
        <svg
          viewBox="0 0 320 205"
          {...svgFit(320)}
          role="img"
          aria-label="Bên trái là thỏ, bên phải là rùa"
        >
          <line
            x1="160"
            y1="20"
            x2="160"
            y2="150"
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          {rabbit(28, 76, 0.95, "#b45309", "#78350f", "#fde68a", false)}
          {turtle(174, 74, 0.95)}
          <LabelPill
            x={24}
            y={10}
            w={112}
            text="Bên TRÁI: thỏ"
            fill="#ffedd5"
            stroke="#ea580c"
            color="#9a3412"
          />
          <LabelPill
            x={184}
            y={10}
            w={114}
            text="Bên PHẢI: rùa"
            fill="#dcfce7"
            stroke="#15803d"
            color="#166534"
          />
          <text
            x="160"
            y="192"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Từ trái sang phải: thỏ rồi đến rùa
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Hàng ngang: Mai – Nam – Rô-bốt, từ trái sang phải (SGK tr.98) ──────────── */
  if (mode === "kidsLeftRight") {
    /**
     * 🔴 `kind` = "girl" thì vẽ BÍM + NƠ (Mai), "boy" thì tóc ngắn (Nam) — quy ước y hệt
     * `fiveFriends` bên `Grade1NumberVisuals.jsx`. Bản cũ ba bạn dùng **cùng một kiểu tóc**
     * nên trẻ không biết ai là bạn gái (người dùng báo 2026-09-24).
     */
    const kid = (x, y, shirt, pants, hair, kind = "boy") => (
      <g transform={`translate(${x},${y})`}>
        <ellipse
          cx="26"
          cy="122"
          rx="24"
          ry="5"
          fill="#000000"
          opacity="0.12"
        />
        <rect
          x="14"
          y="66"
          width="24"
          height="34"
          rx="8"
          fill={shirt}
          stroke="#475569"
          strokeWidth="1.8"
        />
        <line
          x1="16"
          y1="76"
          x2="4"
          y2="96"
          stroke={shirt}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="76"
          x2="48"
          y2="96"
          stroke={shirt}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect x="16" y="100" width="9" height="20" rx="3" fill={pants} />
        <rect x="27" y="100" width="9" height="20" rx="3" fill={pants} />
        {/* BÍM vẽ TRƯỚC đầu để nằm sau tóc */}
        {kind === "girl" && (
          <>
            <ellipse cx="9" cy="56" rx="6" ry="11" fill={hair} />
            <ellipse cx="43" cy="56" rx="6" ry="11" fill={hair} />
          </>
        )}
        <circle
          cx="26"
          cy="48"
          r="17"
          fill="#fcd5ce"
          stroke="#e07a5f"
          strokeWidth="1.8"
        />
        {kind === "girl" ? (
          <path
            d={`M9,48 q0,-24 17,-24 q17,0 17,24 q-7,-11 -17,-11 q-10,0 -17,11 Z`}
            fill={hair}
          />
        ) : (
          <path
            d={`M9,46 q6,-24 34,-2 q-4,-14 -17,-14 q-13,0 -17,16 Z`}
            fill={hair}
          />
        )}
        {kind === "girl" && <circle cx="18" cy="34" r="3.6" fill="#ec4899" />}
        <circle cx="20" cy="48" r="2" fill="#334155" />
        <circle cx="32" cy="48" r="2" fill="#334155" />
        <path
          d="M21,55 q5,5 10,0"
          fill="none"
          stroke="#b45309"
          strokeWidth="1.6"
        />
      </g>
    );
    return (
      <div style={card}>
        <svg
          viewBox="0 0 360 245"
          {...svgFit(360)}
          role="img"
          aria-label="Hàng ngang: Mai, Nam và Rô-bốt"
        >
          <text
            x="180"
            y="26"
            textAnchor="middle"
            fontSize="15"
            fontWeight="800"
            fill={P.soft}
          >
            TRÁI ⟶ PHẢI
          </text>
          <line
            x1="14"
            y1="176"
            x2="346"
            y2="176"
            stroke={P.grid}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {kid(24, 44, "#f472b6", "#be185d", "#78350f", "girl")}
          {kid(148, 44, "#60a5fa", "#1e40af", "#1f2937")}
          <g transform="translate(272,44)">
            <ellipse
              cx="26"
              cy="122"
              rx="26"
              ry="5"
              fill="#000000"
              opacity="0.12"
            />
            <rect
              x="12"
              y="64"
              width="30"
              height="38"
              rx="6"
              fill="#94a3b8"
              stroke="#475569"
              strokeWidth="1.8"
            />
            <rect x="18" y="74" width="18" height="12" rx="2" fill="#e2e8f0" />
            <line
              x1="16"
              y1="66"
              x2="6"
              y2="86"
              stroke="#94a3b8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="38"
              y1="66"
              x2="48"
              y2="86"
              stroke="#94a3b8"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect x="14" y="102" width="10" height="18" rx="3" fill="#64748b" />
            <rect x="30" y="102" width="10" height="18" rx="3" fill="#64748b" />
            <rect
              x="8"
              y="26"
              width="38"
              height="32"
              rx="6"
              fill="#cbd5e1"
              stroke="#475569"
              strokeWidth="1.8"
            />
            <circle cx="20" cy="42" r="4" fill="#1d4ed8" />
            <circle cx="34" cy="42" r="4" fill="#1d4ed8" />
            <rect x="22" y="52" width="10" height="4" rx="2" fill="#475569" />
            <line
              x1="27"
              y1="26"
              x2="27"
              y2="14"
              stroke="#475569"
              strokeWidth="2.5"
            />
            <circle cx="27" cy="12" r="4" fill="#ef4444" />
          </g>
          <LabelPill
            x={16}
            y={200}
            w={64}
            text="Mai"
            fill="#fce7f3"
            stroke="#db2777"
            color="#9d174d"
          />
          <LabelPill x={140} y={200} w={64} text="Nam" />
          <LabelPill
            x={262}
            y={200}
            w={88}
            text="Rô-bốt"
            fill="#e2e8f0"
            stroke="#475569"
            color="#334155"
          />
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Đoàn tàu: đầu máy + 4 toa đánh số 1–4 (SGK tr.96) ─────────────────────── */
  if (mode === "trainCars") {
    const cars = [
      { n: 1, fill: "#60a5fa", stroke: "#1d4ed8" },
      { n: 2, fill: "#4ade80", stroke: "#15803d" },
      { n: 3, fill: "#fbbf24", stroke: "#b45309" },
      { n: 4, fill: "#f472b6", stroke: "#be185d" },
    ];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 380 200"
          {...svgFit(380)}
          role="img"
          aria-label="Đoàn tàu: đầu máy và bốn toa đánh số 1, 2, 3, 4"
        >
          <line
            x1="6"
            y1="172"
            x2="374"
            y2="172"
            stroke="#94a3b8"
            strokeWidth="4"
          />
          <line
            x1="6"
            y1="181"
            x2="374"
            y2="181"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          {/* đầu máy */}
          <g>
            <rect
              x="14"
              y="96"
              width="70"
              height="52"
              rx="8"
              fill="#ef4444"
              stroke="#b91c1c"
              strokeWidth="2.2"
            />
            <rect
              x="48"
              y="70"
              width="32"
              height="28"
              rx="5"
              fill="#f87171"
              stroke="#b91c1c"
              strokeWidth="2.2"
            />
            <rect x="18" y="58" width="16" height="28" rx="3" fill="#475569" />
            <ellipse
              cx="26"
              cy="52"
              rx="12"
              ry="7"
              fill="#e2e8f0"
              opacity="0.85"
            />
            <circle cx="34" cy="152" r="13" fill="#334155" />
            <circle cx="34" cy="152" r="4.5" fill="#cbd5e1" />
            <circle cx="72" cy="152" r="13" fill="#334155" />
            <circle cx="72" cy="152" r="4.5" fill="#cbd5e1" />
          </g>
          {cars.map((c, i) => {
            const x = 96 + i * 70;
            return (
              <g key={c.n}>
                <rect
                  x={x}
                  y="104"
                  width="60"
                  height="46"
                  rx="7"
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth="2.2"
                />
                <rect
                  x={x + 7}
                  y="112"
                  width="46"
                  height="22"
                  rx="3"
                  fill="#ffffff"
                  opacity="0.7"
                />
                <text
                  x={x + 30}
                  y="130"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill={c.stroke}
                >
                  {hideNumbers ? "?" : c.n}
                </text>
                <circle cx={x + 15} cy="152" r="10" fill="#334155" />
                <circle cx={x + 15} cy="152" r="3.5" fill="#cbd5e1" />
                <circle cx={x + 45} cy="152" r="10" fill="#334155" />
                <circle cx={x + 45} cy="152" r="3.5" fill="#cbd5e1" />
              </g>
            );
          })}
          <text
            x="190"
            y="20"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Đầu máy ở phía trước, rồi đến toa 1 · 2 · 3 · 4
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Cột đèn giao thông ba màu (SGK tr.96) ───────────────────────────────────
   * 🔴 Canh giữa bằng cách dịch KHUNG NHÌN (`viewBox`), không đụng toạ độ hình vẽ.
   * Đo 2026-09-25: nội dung chiếm x = 72 → 298,2 trong khung 340 ⇒ lệch 30,2 đơn vị
   * (dư bên trái 72, bên phải 41,8). Dịch khung nhìn sang phải 15 ⇒ hai bên đều ~57. */
  if (mode === "trafficLight") {
    return (
      <div style={card}>
        <svg
          viewBox="15 0 340 320"
          {...svgFit(340)}
          role="img"
          aria-label="Cột đèn giao thông: đèn đỏ trên cùng, đèn vàng ở giữa, đèn xanh dưới cùng"
        >
          <rect x="95" y="292" width="70" height="12" rx="6" fill="#475569" />
          <rect x="120" y="238" width="20" height="58" rx="5" fill="#475569" />
          <rect
            x="72"
            y="42"
            width="116"
            height="204"
            rx="18"
            fill="#334155"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          <circle
            cx="130"
            cy="88"
            r="28"
            fill="#ef4444"
            stroke="#7f1d1d"
            strokeWidth="2"
          />
          <circle
            cx="130"
            cy="144"
            r="28"
            fill="#facc15"
            stroke="#854d0e"
            strokeWidth="2"
          />
          <circle
            cx="130"
            cy="200"
            r="28"
            fill="#22c55e"
            stroke="#14532d"
            strokeWidth="2"
          />
          <circle cx="121" cy="79" r="7" fill="#ffffff" opacity="0.5" />
          <line
            x1="196"
            y1="88"
            x2="216"
            y2="88"
            stroke={P.grid}
            strokeWidth="2.5"
          />
          <line
            x1="196"
            y1="144"
            x2="216"
            y2="144"
            stroke={P.grid}
            strokeWidth="2.5"
          />
          <line
            x1="196"
            y1="200"
            x2="216"
            y2="200"
            stroke={P.grid}
            strokeWidth="2.5"
          />
          <text x="222" y="82" fontSize="15" fontWeight="800" fill="#b91c1c">
            Trên cùng
          </text>
          {showColors && (
            <text x="222" y="102" fontSize="14" fontWeight="700" fill="#b91c1c">
              đèn đỏ
            </text>
          )}
          <text x="222" y="138" fontSize="15" fontWeight="800" fill="#a16207">
            Ở giữa
          </text>
          {showColors && (
            <text x="222" y="158" fontSize="14" fontWeight="700" fill="#a16207">
              đèn vàng
            </text>
          )}
          <text x="222" y="194" fontSize="15" fontWeight="800" fill="#15803d">
            Dưới cùng
          </text>
          {showColors && (
            <text x="222" y="214" fontSize="14" fontWeight="700" fill="#15803d">
              đèn xanh
            </text>
          )}
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Bộ bốn hình A, B, C, D để bé CHỌN khối (SGK tr.93) ───────────────────────
   * `round: 1` → "Những hình nào là KHỐI LẬP PHƯƠNG?"  (đáp án: A, C, E)
   * `round: 2` → "Những hình nào là KHỐI HỘP CHỮ NHẬT?" (đáp án: B, G)
   * Đây CHÍNH LÀ hình của SGK tr.100 (Bài 16, hoạt động 1) — đo lại mặt trước bằng
   * `scratch/in-khoi-abcg.py` trên ảnh 300 DPI: A 105×105, C vuông nhỏ, E 168×159 ⇒ VUÔNG
   * ⇒ ba khối lập phương; B rộng 114 mà cao ≥ 148, G dài theo chiều sâu ⇒ khối hộp chữ nhật;
   * D là khối TRỤ nên không thuộc hai loại trên (cố ý để bé phải loại trừ).
   * ⚠️ Không in chữ "lập phương"/"hộp chữ nhật" lên hình — đó là thứ bé phải tự gọi tên. */
  if (mode === "solidSort") {
    const cylinder = (x, y, w, h, fill, stroke) => (
      <g>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <ellipse
          cx={x + w / 2}
          cy={y}
          rx={w / 2}
          ry={w * 0.16}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
        />
        <ellipse
          cx={x + w / 2}
          cy={y + h}
          rx={w / 2}
          ry={w * 0.16}
          fill={fill}
          stroke={stroke}
          strokeWidth="1.8"
        />
      </g>
    );
    /** ĐẶT KHỐI LẬP PHƯƠNG THEO TÂM + ĐƯỜNG ĐÁY: `cx` là tâm mặt trước, `base` là đường đáy. */
    const cube = (cx, base, side, d, fill, stroke) => (
      <Block3D
        x={cx - side / 2}
        y={base - side}
        w={side}
        h={side}
        d={d}
        fill={fill}
        stroke={stroke}
      />
    );
    const tiles = [
      // Hàng trên: A (lập phương) · B (hộp chữ nhật cao) · C (lập phương nhỏ)
      {
        key: "A",
        color: "#0369a1",
        lx: 62,
        ly: 128,
        shape: cube(62, 104, 44, 16, "#38bdf8", "#0369a1"),
      },
      {
        key: "B",
        color: "#a16207",
        lx: 180,
        ly: 128,
        shape: (
          <Block3D
            x={165}
            y={40}
            w={30}
            h={64}
            d={14}
            fill="#fde047"
            stroke="#a16207"
          />
        ),
      },
      {
        key: "C",
        color: "#15803d",
        lx: 298,
        ly: 128,
        shape: cube(298, 104, 30, 12, "#4ade80", "#15803d"),
      },
      // Hàng dưới: D (khối trụ) · E (lập phương) · G (hộp chữ nhật dài)
      {
        key: "D",
        color: "#c2410c",
        lx: 62,
        ly: 228,
        shape: cylinder(39, 150, 46, 47, "#fdba74", "#c2410c"),
      },
      {
        key: "E",
        color: "#b91c1c",
        lx: 180,
        ly: 228,
        shape: cube(180, 204, 52, 18, "#f87171", "#b91c1c"),
      },
      {
        key: "G",
        color: "#be185d",
        lx: 298,
        ly: 228,
        shape: (
          <Block3D
            x={292}
            y={178}
            w={26}
            h={26}
            d={40}
            fill="#f9a8d4"
            stroke="#be185d"
          />
        ),
      },
    ];
    return (
      <div style={card}>
        <svg
          viewBox="0 0 360 240"
          {...svgFit(360)}
          role="img"
          aria-label={`Sáu hình A, B, C, D, E, G để bé tìm khối ${
            Number(round) === 2 ? "hộp chữ nhật" : "lập phương"
          }`}
        >
          <line
            x1="12"
            y1="104"
            x2="348"
            y2="104"
            stroke={P.grid}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="204"
            x2="348"
            y2="204"
            stroke={P.grid}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {tiles.map((t) => (
            <g key={t.key}>
              {t.shape}
              <text
                x={t.lx}
                y={t.ly}
                textAnchor="middle"
                fontSize="17"
                fontWeight="900"
                fill={t.color}
              >
                {t.key}
              </text>
            </g>
          ))}
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Hai hàng bạn ngồi xem phim hoạt hình (SGK tr.97) ─────────────────────────
   * `front` / `back` = số bạn mỗi hàng ⇒ **6 bạn hàng SAU và 4 bạn hàng TRƯỚC** (tổng 10).
   * Người dùng đếm lại trên SÁCH GIẤY ngày 2026-09-24 và xác nhận — ảnh quét tr.97 quá mờ,
   * nên đừng "đếm lại bằng mắt" trên bản scan rồi sửa số này thành khác.
   * ⚠️ KHÔNG in số lượng lên hình — đây là câu hỏi ĐẾM. */
  if (mode === "movieRows") {
    // ⚠️ Đừng đặt tên `front`/`back` cho biến cục bộ — nó CHE CHÍNH tham số cùng tên và
    // ném `Cannot access 'front' before initialization` (TDZ). Đã mắc thật 2026-09-24.
    const nFront = Math.max(1, Math.min(6, Number(front) || 4));
    const nBack = Math.max(1, Math.min(6, Number(back) || 6));
    const kid = (x, y, s, shirt, hair) => (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <ellipse cx="0" cy="44" rx="22" ry="4" fill="#000000" opacity="0.1" />
        <rect
          x="-15"
          y="18"
          width="30"
          height="26"
          rx="10"
          fill={shirt}
          stroke="#475569"
          strokeWidth="1.6"
        />
        <circle
          cx="0"
          cy="6"
          r="13"
          fill="#fcd5ce"
          stroke="#e07a5f"
          strokeWidth="1.6"
        />
        <path
          d={`M-13,2 q6,-16 26,-1 q-4,-10 -13,-10 q-9,0 -13,11 Z`}
          fill={hair}
        />
      </g>
    );
    const row = (n, y, s, shirt, hair, xa) => (
      <g>
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            {kid(xa + i * (34 * s), y, s, shirt[i % shirt.length], hair)}
          </g>
        ))}
      </g>
    );
    return (
      <div style={card}>
        <svg
          viewBox="0 0 380 264"
          {...svgFit(380)}
          role="img"
          aria-label="Hai hàng bạn cùng quay về phía ti vi"
        >
          <text
            x="190"
            y="18"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Hai hàng bạn cùng quay về phía ti vi
          </text>
          {/* Thứ tự BẮT BUỘC (người dùng chốt 2026-09-24): hàng sau → hàng trước → ti vi.
              Ti vi nằm DƯỚI CÙNG, KHÔNG chen giữa hai hàng; cả hai hàng đều quay về nó.
              Nhìn từ phía sau ti vi nên vẽ mặt lưng (không vẽ màn hình). */}
          <rect
            x="130"
            y="186"
            width="120"
            height="54"
            rx="7"
            fill="#475569"
            stroke="#1e293b"
            strokeWidth="2.4"
          />
          <rect x="141" y="197" width="98" height="32" rx="4" fill="#64748b" />
          <rect x="180" y="240" width="20" height="10" fill="#334155" />
          <rect x="158" y="249" width="64" height="8" rx="4" fill="#334155" />
          <line
            x1="16"
            y1="104"
            x2="366"
            y2="104"
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          <line
            x1="16"
            y1="177"
            x2="366"
            y2="177"
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          {row(
            nBack,
            58,
            0.92,
            ["#f97316", "#22c55e", "#ffffff", "#60a5fa", "#facc15", "#a78bfa"],
            "#1f2937",
            98,
          )}
          {row(
            nFront,
            126,
            1.08,
            ["#facc15", "#f472b6", "#ffffff", "#60a5fa"],
            "#78350f",
            135,
          )}
          <LabelPill
            x={6}
            y={54}
            w={60}
            text="SAU"
            fill="#f1f5f9"
            stroke="#94a3b8"
            color="#475569"
          />
          <LabelPill x={6} y={122} w={62} text="TRƯỚC" />
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Viên gạch xếp ba hàng (SGK tr.97) ────────────────────────────────────────
   * Hàng trên cùng 2 · hàng giữa 3 · hàng dưới cùng 4 ⇒ cả ba hàng 9 viên.
   * ⚠️ Vẽ đúng số đó và KHÔNG in chữ nào ghi số lượng. */
  if (mode === "brickRows") {
    const brick = (x, y) => (
      <g>
        <rect x={x} y={y - 7} width="64" height="7" rx="2" fill="#f97316" />
        <rect
          x={x}
          y={y}
          width="64"
          height="26"
          rx="3"
          fill="#c2410c"
          stroke="#7c2d12"
          strokeWidth="1.8"
        />
        <ellipse
          cx={x + 20}
          cy={y + 13}
          rx="5"
          ry="5.5"
          fill="#7c2d12"
          opacity="0.75"
        />
        <ellipse
          cx={x + 44}
          cy={y + 13}
          rx="5"
          ry="5.5"
          fill="#7c2d12"
          opacity="0.75"
        />
      </g>
    );
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 210"
          {...svgFit(340)}
          role="img"
          aria-label="Ba hàng viên gạch xếp chồng"
        >
          <line
            x1="16"
            y1="188"
            x2="324"
            y2="188"
            stroke={P.grid}
            strokeWidth="3"
            strokeDasharray="6 5"
          />
          {[0, 1, 2, 3].map((i) => (
            <g key={"d" + i}>{brick(40 + i * 68, 158)}</g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={"g" + i}>{brick(74 + i * 68, 125)}</g>
          ))}
          {[0, 1].map((i) => (
            <g key={"t" + i}>{brick(108 + i * 68, 92)}</g>
          ))}
          <text
            x="170"
            y="204"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Trên cùng · ở giữa · dưới cùng
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── Con xúc xắc: đếm chấm ở ba mặt nhìn thấy (SGK tr.100, Bài 16 hoạt động 2) ───
   * ĐO từ ảnh SGK 300 DPI (`scratch/crop-xucxac.png`): mặt TRƯỚC 5 chấm,
   * mặt TRÊN 3 chấm, mặt BÊN PHẢI 6 chấm. Cũng đúng quy luật xúc xắc thật
   * (5+2 = 3+4 = 6+1 = 7) nên số đo tự nó đã là bằng chứng chéo.
   * ⚠️ Xúc xắc PHẢI có 3 mặt nhìn thấy được — nhìn một mặt thì không hỏi được câu (b), (c).
   * ⚠️ Chấm vẽ theo phép nội suy song tuyến tính trên mặt hình bình hành, nếu rải chấm
   *    bằng toạ độ thẳng thì chấm mặt trên/bên sẽ trôi ra ngoài mặt khối. */
  if (mode === "diceFaces") {
    const PIPS = {
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
    const clampPips = (n) => Math.max(1, Math.min(6, Number(n) || 1));
    /** Rải chấm lên một MẶT hình bình hành: `A` là góc gốc, `B` theo hướng u, `D` theo hướng v. */
    const facePips = (n, A, B, D, r) =>
      (PIPS[clampPips(n)] || PIPS[1]).map(([u, v], i) => {
        const uu = 0.2 + 0.6 * u;
        const vv = 0.2 + 0.6 * v;
        return (
          <circle
            key={i}
            cx={A[0] + uu * (B[0] - A[0]) + vv * (D[0] - A[0])}
            cy={A[1] + uu * (B[1] - A[1]) + vv * (D[1] - A[1])}
            r={r}
            fill="#1f2937"
          />
        );
      });
    const S = 88;
    const x0 = 104;
    const y0 = 104;
    const dx = 44;
    const dy = 34;
    const frontA = [x0, y0];
    const frontB = [x0 + S, y0];
    const frontD = [x0, y0 + S];
    const topD = [x0 + dx, y0 - dy];
    const rightB = [x0 + S + dx, y0 - dy];
    return (
      <div style={card}>
        <svg
          viewBox="46 0 360 240"
          {...svgFit(360)}
          role="img"
          aria-label={`Con xúc xắc: mặt trước ${clampPips(pipFront)} chấm, mặt trên ${clampPips(
            pipTop,
          )} chấm, mặt bên phải ${clampPips(pipRight)} chấm`}
        >
          <polygon
            points={`${frontA[0]},${frontA[1]} ${frontB[0]},${frontB[1]} ${rightB[0]},${rightB[1]} ${topD[0]},${topD[1]}`}
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <polygon
            points={`${frontB[0]},${frontB[1]} ${rightB[0]},${rightB[1]} ${rightB[0]},${rightB[1] + S} ${frontB[0]},${frontB[1] + S}`}
            fill="#e2e8f0"
            stroke="#334155"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <rect
            x={x0}
            y={y0}
            width={S}
            height={S}
            rx="3"
            fill="#ffffff"
            stroke="#334155"
            strokeWidth="2.4"
          />
          {facePips(pipTop, frontA, frontB, topD, 6.5)}
          {facePips(pipRight, frontB, rightB, [frontB[0], frontB[1] + S], 6.5)}
          {facePips(pipFront, frontA, frontB, frontD, 8)}
          <LabelPill x={104} y={30} w={70} text="mặt trên" />
          <LabelPill
            x={244}
            y={98}
            w={104}
            text="mặt bên phải"
            fill="#ede9fe"
            stroke="#7c3aed"
            color="#5b21b6"
          />
          <LabelPill
            x={104}
            y={204}
            w={74}
            text="mặt trước"
            fill="#dcfce7"
            stroke="#16a34a"
            color="#15803d"
          />
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  /* ── So sánh số khối của hai hình (SGK tr.101, Bài 16 hoạt động 3) ───────────────
   * Đếm trên ảnh SGK 300 DPI: hình bên TRÁI = 2+2+2 (cột 2×3) + 2 khối bậc = 8 khối;
   * hình bên PHẢI = 4 cột × 2 tầng = 8 khối ⇒ "Hai hình có số khối bằng nhau" (đáp án b).
   * ⚠️ KHÔNG in số 8 lên hình — bé phải tự đếm; in số là cho luôn đáp án.
   * ⚠️ Khe hở bằng `pitch - size` (2 đơn vị) để bé nhìn ra TỪNG khối mà đếm. */
  if (mode === "cubeWalls") {
    const S = 24;
    const PITCH = 26;
    const D = 10;
    const BASE = 186;
    const wall = (x0, heights) => (
      <g>
        {heights.map((h, c) =>
          Array.from({ length: h }, (_, k) => (
            <Block3D
              key={`${c}-${k}`}
              x={x0 + c * PITCH}
              y={BASE - S - k * PITCH}
              w={S}
              h={S}
              d={D}
            />
          )),
        )}
      </g>
    );
    return (
      <div style={card}>
        <svg
          viewBox="0 0 340 220"
          {...svgFit(340)}
          role="img"
          aria-label="So sánh hai hình xếp từ khối lập phương nhỏ"
        >
          <line
            x1="20"
            y1="188"
            x2="150"
            y2="188"
            stroke={P.grid}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="176"
            y1="188"
            x2="312"
            y2="188"
            stroke={P.grid}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {wall(30, [3, 3, 2])}
          {wall(190, [2, 2, 2, 2])}
          <text
            x="84"
            y="210"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.soft}
          >
            Hình bên trái
          </text>
          <text
            x="242"
            y="210"
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill={P.soft}
          >
            Hình bên phải
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
      </div>
    );
  }

  // mode === "frontBack"
  return (
    <div style={card}>
      <svg
        viewBox="0 0 340 230"
        {...svgFit(340)}
        role="img"
        aria-label="Trước - Sau, Ở giữa"
      >
        {/* Đường đi / hàng kẻ */}
        <line
          x1="20"
          y1="160"
          x2="320"
          y2="160"
          stroke="#cbd5e1"
          strokeWidth="4"
        />
        <polygon points="325,160 310,152 310,168" fill="#94a3b8" />
        <text
          x="315"
          y="180"
          textAnchor="end"
          fontSize="11"
          fontWeight="700"
          fill="#64748b"
        >
          Hướng đi ➔
        </text>

        {/* 1. Đi đầu: Ở ĐẰNG TRƯỚC */}
        <g transform="translate(210, 60)">
          <circle
            cx="40"
            cy="50"
            r="30"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="3"
          />
          <circle cx="40" cy="50" r="14" fill="#dcfce7" />
          <text
            x="40"
            y="55"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#15803d"
          >
            1
          </text>
          <rect
            x="-5"
            y="-30"
            width="90"
            height="24"
            rx="12"
            fill="#dcfce7"
            stroke="#15803d"
            strokeWidth="1.5"
          />
          <text
            x="40"
            y="-14"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#15803d"
          >
            Ở TRƯỚC
          </text>
        </g>

        {/* 2. Ở GIỮA */}
        <g transform="translate(125, 60)">
          <circle
            cx="40"
            cy="50"
            r="30"
            fill="#eab308"
            stroke="#a16207"
            strokeWidth="3"
          />
          <circle cx="40" cy="50" r="14" fill="#fef9c3" />
          <text
            x="40"
            y="55"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#a16207"
          >
            2
          </text>
          <rect
            x="-5"
            y="-30"
            width="90"
            height="24"
            rx="12"
            fill="#fef9c3"
            stroke="#a16207"
            strokeWidth="1.5"
          />
          <text
            x="40"
            y="-14"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#a16207"
          >
            Ở GIỮA
          </text>
        </g>

        {/* 3. Đi cuối: Ở ĐẰNG SAU */}
        <g transform="translate(40, 60)">
          <circle
            cx="40"
            cy="50"
            r="30"
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="3"
          />
          <circle cx="40" cy="50" r="14" fill="#fee2e2" />
          <text
            x="40"
            y="55"
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#b91c1c"
          >
            3
          </text>
          <rect
            x="-5"
            y="-30"
            width="90"
            height="24"
            rx="12"
            fill="#fee2e2"
            stroke="#b91c1c"
            strokeWidth="1.5"
          />
          <text
            x="40"
            y="-14"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#b91c1c"
          >
            Ở SAU
          </text>
        </g>

        <rect
          x="25"
          y="195"
          width="290"
          height="26"
          rx="6"
          fill="#f8fafc"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />
        <text
          x="170"
          y="213"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill="#1e293b"
        >
          Xếp hàng: Số 1 ở TRƯỚC · Số 2 ở GIỮA · Số 3 ở SAU
        </text>
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );
}
