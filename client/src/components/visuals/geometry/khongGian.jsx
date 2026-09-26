// khongGian.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { svgFit } from ".././visualTheme";
import { P } from "./geometryData.jsx";
import { caption } from "./geometryData.jsx";
import { card } from "./geometryData.jsx";
import { num } from "./geometryData.jsx";

export const Block3D = ({
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

export const LabelPill = ({
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

export const LetterBlocks = ({
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
          /* TÓC HAI MÁI cho bé trai — đối xứng, không xéo một bên (người dùng báo 2026-09-26). */
          <path
            d={`M9,48 C9,28 16,24 26,24 C36,24 43,28 43,48 C40,41 34,37 28,35.5 C27,35.2 25,35.2 24,35.5 C18,37 12,41 9,48 Z`}
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
          d={`M-13,6 C-13,-6 -7,-9 0,-9 C7,-9 13,-6 13,6 C10.5,1.5 6,-0.5 2,-1.5 C1,-1.8 -1,-1.8 -2,-1.5 C-6,-0.5 -10.5,1.5 -13,6 Z`}
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
