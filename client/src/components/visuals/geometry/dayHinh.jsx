// dayHinh.jsx
// TÁCH RA TỪ: GeometryVisuals.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import {
  useEffect,
  useState,
} from "react";
import {
  useInteractive,
  useFillSlots,
  slotLook,
  FillBar,
} from "../interactiveFill";
import {
  svgFit,
} from "../visualTheme";
import {
  HinhNho,
} from "./hinhPhang.jsx";
import {
  MAU_HINH,
} from "./geometryData.jsx";
import {
  P,
} from "./geometryData.jsx";
import {
  TEN_HINH,
} from "./geometryData.jsx";
import {
  caption,
} from "./geometryData.jsx";
import {
  card,
} from "./geometryData.jsx";
import {
  mauCua,
} from "./geometryData.jsx";

export function PatternRow({
  shapes = [],
  colors = [],
  label = "",
  answers = [],
  options = ["circle", "triangle", "square"],
  hint = "Bé đọc theo lượt: cứ mấy hình thì quy luật lặp lại một lần?",
  onDone,
}) {
  const interactive = useInteractive();
  const ds = (Array.isArray(shapes) ? shapes : []).filter(
    (s) => s !== undefined && s !== null && s !== "",
  );
  const n = Math.max(1, ds.length);
  // 🔴 CỠ Ô + XUỐNG HÀNG (đo được 2026-09-26): ô 30 đơn vị trên khung ≥360 ⇒ tỉ lệ ~0,85
  // ⇒ ô chỉ còn ~25 px — trẻ không bấm nổi (chuẩn vùng chạm 44 px). Nay ô 44 đơn vị và khung
  // hẹp theo SỐ Ô MỖI HÀNG (tối đa 5) nên tự phóng to; dãy dài thì xuống hàng như sách in.
  const O = 44; // cạnh ô hình
  const G = 10; // khe giữa hai ô
  const B = 14; // lề hai bên
  const SO_MOI_HANG = 5;
  const soMoiHang = Math.min(n, SO_MOI_HANG);
  const soHang = Math.ceil(n / soMoiHang);
  const canRong = soMoiHang * O + (soMoiHang - 1) * G;
  const W = Math.max(160, canRong + B * 2);
  const x0 = (W - canRong) / 2;
  const yTop = 22;
  const hangCao = O + 16;
  const H = yTop + soHang * hangCao + 12;

  /** Vị trí các ô “?” — mỗi ô là MỘT chỗ bé điền, theo thứ tự đọc. */
  const oTrong = ds.map((k, i) => (k === "?" ? i : -1)).filter((i) => i >= 0);
  const dungHopDong =
    interactive &&
    oTrong.length > 0 &&
    Array.isArray(answers) &&
    answers.length === oTrong.length;
  const fill = useFillSlots(dungHopDong ? answers : []);
  const [reported, setReported] = useState(false);
  useEffect(() => {
    if (dungHopDong && fill.done && !reported && typeof onDone === "function") {
      setReported(true);
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill.done, dungHopDong]);

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label="Dãy hình lặp quy luật"
      >
        {ds.map((k, i) => {
          const hang = Math.floor(i / soMoiHang);
          const cot = i % soMoiHang;
          const x = x0 + cot * (O + G);
          const y = yTop + hang * hangCao;
          const cx = x + O / 2;
          const cy = y + O / 2;
          if (k === "?") {
            const slot = oTrong.indexOf(i);
            const bam = dungHopDong;
            const look = bam
              ? slotLook(fill, slot)
              : {
                  fill: P.amberSoft,
                  stroke: P.amber,
                  color: P.amber,
                  dash: true,
                };
            const daXong = bam && fill.solved[slot];
            const dangThu = bam && fill.picked[slot] !== null && !daXong;
            const hinhChon = bam ? fill.picked[slot] : null;
            const [f2, s2] = hinhChon
              ? mauCua(hinhChon, colors[i])
              : [null, null];
            return (
              <g
                key={i}
                onClick={() => bam && fill.setActive(slot)}
                style={{ cursor: bam ? "pointer" : "default" }}
              >
                <rect
                  x={x}
                  y={y}
                  width={O}
                  height={O}
                  rx="6"
                  fill={look.fill}
                  stroke={look.stroke}
                  strokeWidth="2.5"
                  strokeDasharray={look.dash ? "6 4" : undefined}
                />
                {daXong && (
                  <HinhNho
                    k={hinhChon}
                    x={x}
                    y={y}
                    O={O}
                    fill={f2}
                    stroke={s2}
                    net={2.6}
                  />
                )}
                {dangThu && (
                  <g opacity="0.55">
                    <HinhNho
                      k={hinhChon}
                      x={x}
                      y={y}
                      O={O}
                      fill={f2}
                      stroke={s2}
                      net={2.6}
                    />
                  </g>
                )}
                {!daXong && !dangThu && (
                  <text
                    x={cx}
                    y={cy + 8}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill={look.color}
                  >
                    ?
                  </text>
                )}
              </g>
            );
          }
          // ⚠️ KHÔNG đặt tên hai biến này là `fill`/`stroke`: `fill` đã là biến của
          // `useFillSlots` ở trên — trùng tên thì nhánh ô “?” ở trên đọc vào vùng cấm
          // (TDZ) và ném `Cannot access 'fill' before initialization`.
          const [mauHinh, vienHinh] = colors[i]
            ? [colors[i], colors[i]]
            : MAU_HINH[k] || MAU_HINH.square;
          return (
            <HinhNho
              key={i}
              k={k}
              x={x}
              y={y}
              O={O}
              fill={mauHinh}
              stroke={vienHinh}
              net={3}
            />
          );
        })}
      </svg>
      {label && <span style={{ ...caption, color: P.ink }}>{label}</span>}
      {dungHopDong && (
        <FillBar
          fill={fill}
          options={options}
          title="Bé chọn hình điền vào ô ?"
          hint={hint}
          tenOption={TEN_HINH}
          renderOption={(k) => (
            <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true">
              <HinhNho
                k={k}
                x={2}
                y={2}
                O={30}
                fill={mauCua(k)[0]}
                stroke={mauCua(k)[1]}
                net={2.4}
              />
            </svg>
          )}
        />
      )}
    </div>
  );
}

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
