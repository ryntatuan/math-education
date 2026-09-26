// hinhKhoi.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  svgFit,
  ngatDong,
} from ".././visualTheme";
import {
  DO_VAT,
} from "./geometryData.jsx";
import {
  P,
} from "./geometryData.jsx";
import {
  SOLID_NAME,
} from "./geometryData.jsx";
import {
  caption,
} from "./geometryData.jsx";
import {
  card,
} from "./geometryData.jsx";
import {
  clamp,
} from "./geometryData.jsx";
import {
  num,
} from "./geometryData.jsx";

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

export function VeDoVat({ kind, windows }) {
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
