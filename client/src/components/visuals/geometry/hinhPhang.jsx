// hinhPhang.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  svgFit,
} from ".././visualTheme";
import {
  FILL,
} from "./geometryData.jsx";
import {
  HUONG_CHU_DINH,
} from "./geometryData.jsx";
import {
  P,
} from "./geometryData.jsx";
import {
  PLANE,
} from "./geometryData.jsx";
import {
  SHAPE_POINTS,
} from "./geometryData.jsx";
import {
  caption,
} from "./geometryData.jsx";
import {
  card,
} from "./geometryData.jsx";

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
  /**
   * 🔴 HÌNH TRÒN KHÔNG CÓ TOẠ ĐỘ ĐỈNH — nó được vẽ bằng `<circle cx=160 cy=115 r=78>`.
   * Bản cũ gọi thẳng `pts.map(...)` khi `pts` là `undefined` ⇒ React NÉM
   * "Cannot read properties of undefined (reading 'map')" và **cả slide không hiện**.
   *
   * Đã xảy ra thật ở **21 slide** của 4 lớp (`g1-c2-l2`, `g3-c3-l3`, `g5-c3-l4`…) — dữ liệu
   * đúng, chỉ bộ vẽ thiếu vế. Nay lấy sẵn bbox của đường tròn (160 ± 78) khi không có đỉnh.
   */
  let mx0 = pts ? Math.min(...pts.map((p) => p[0])) : 82;
  let mx1 = pts ? Math.max(...pts.map((p) => p[0])) : 238;
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

export function HinhNho({ k, x, y, O, fill, stroke, net = 3 }) {
  const cx = x + O / 2;
  const cy = y + O / 2;
  if (k === "circle")
    return (
      <circle
        cx={cx}
        cy={cy}
        r={O / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={net}
      />
    );
  if (k === "triangle")
    return (
      <polygon
        points={`${cx},${y} ${x + O},${y + O} ${x},${y + O}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={net}
        strokeLinejoin="round"
      />
    );
  if (k === "rectangle")
    return (
      <rect
        x={x}
        y={y + 5}
        width={O}
        height={O - 10}
        rx="3"
        fill={fill}
        stroke={stroke}
        strokeWidth={net}
      />
    );
  if (k === "rhombus")
    return (
      <polygon
        points={`${cx},${y} ${x + O},${cy} ${cx},${y + O} ${x},${cy}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={net}
        strokeLinejoin="round"
      />
    );
  return (
    <rect
      x={x}
      y={y}
      width={O}
      height={O}
      rx="4"
      fill={fill}
      stroke={stroke}
      strokeWidth={net}
    />
  );
}
