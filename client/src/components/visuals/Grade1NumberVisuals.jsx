/**
 * BỘ HÌNH CHO LỚP 1 — CHỦ ĐỀ 1 (Các số từ 0 đến 10), SGK tr.6–45.
 *
 * Vì sao tách khỏi `GeometryVisuals.jsx`: chủ đề này KHÔNG phải hình học — nó là ĐẾM,
 * SO SÁNH, TÁCH – GỘP. Trộn vào file hình học sẽ làm file đó phình thêm ~700 dòng mà
 * không liên quan gì tới hình khối.
 *
 * Khoá đăng ký: `numberScene` (xem `visualKeys.js` + `VisualBlock.jsx`).
 * Mọi kiểu đều nhận `mode`; các prop còn lại ghi ngay trên từng khối.
 *
 * ── QUY TẮC BẮT BUỘC (đã trả giá — danh sách ngay dưới đây) ─────────────
 *  • viewBox rộng ≤ 380 (điện thoại 375 px chỉ cho hình ~283 px bề rộng).
 *  • Mọi chữ trong SVG ≥ 14 đơn vị viewBox (≈ 11 px trên màn 375 px).
 *  • KHÔNG `minWidth` (gây cuộn ngang).
 *  • Ép mọi prop số về số bằng `num()`: prop truyền vào là CHUỖI thì `y + h` ra "6220"
 *    và hình vẽ sai mà KHÔNG hề báo lỗi cú pháp (đã mắc thật).
 *  • Đáp án KHÔNG được in lên hình (đếm là việc của bé).
 *
 * Nguồn số liệu của từng hình: lấy từ SGK, ghi rõ ở từng hình bên dưới.
 */

import { CARD_STYLE, CAPTION_STYLE, svgFit } from "./visualTheme";

import {
  useFillSlots,
  slotLook,
  FillBar,
  useInteractive,
} from "./interactiveFill";
import { MazePath } from "./interactiveMaze";

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

const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

/** Vị trí chấm kiểu XÚC XẮC (toạ độ chuẩn hoá 0..1 trên một ô 3×3).
 *  Dùng chấm kiểu xúc xắc chứ không phải hàng–cột đều: bé lớp 1 đã quen mặt xúc xắc,
 *  nhìn là nhận ra số lượng ngay mà không phải đếm từng chấm (SGK cũng dùng thẻ chấm kiểu này). */
const PIP_SPOTS = {
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

/** Vẽ `n` chấm trong khung `x,y,w,h` theo thế xúc xắc (lề 18% mỗi bên). */
const Pips = ({ n, x, y, w, h, r = 4.4, color = "#1e293b" }) => {
  const count = Math.max(1, Math.min(6, num(n, 1)));
  const spots = PIP_SPOTS[count] || PIP_SPOTS[1];
  return spots.map(([u, v], i) => (
    <circle
      key={i}
      cx={num(x) + num(w) * (0.18 + 0.64 * u)}
      cy={num(y) + num(h) * (0.18 + 0.64 * v)}
      r={r}
      fill={color}
    />
  ));
};

/** Ô chữ nhật bo góc kèm chữ ở giữa (dùng cho "?", số, nhãn A/B). */
const Tile = ({
  x,
  y,
  w = 44,
  h = 40,
  text = "",
  fill = "#ffffff",
  stroke = P.grid,
  color = P.ink,
  fs = 20,
  dash = false,
}) => (
  <g>
    <rect
      x={num(x)}
      y={num(y)}
      width={num(w)}
      height={num(h)}
      rx={8}
      fill={fill}
      stroke={stroke}
      strokeWidth="2"
      strokeDasharray={dash ? "5 4" : undefined}
    />
    {text !== "" && (
      <text
        x={num(x) + num(w) / 2}
        y={num(y) + num(h) / 2 + num(fs) * 0.36}
        textAnchor="middle"
        fontSize={fs}
        fontWeight="800"
        fill={color}
      >
        {text}
      </text>
    )}
  </g>
);

/** Một "vật" vẽ bằng emoji — đủ rõ với bé lớp 1 và không nặng như vẽ hình thật. */
const Item = ({ x, y, ch = "🐟", s = 18, opacity = 1 }) => (
  <text
    x={num(x)}
    y={num(y)}
    textAnchor="middle"
    fontSize={s}
    opacity={opacity}
    style={{ userSelect: "none" }}
  >
    {ch}
  </text>
);

/** Dãy `n` emoji, xếp tối đa `per` một hàng. Trả về mảng phần tử (dùng lại nhiều nơi).
 *  `prefix` phải KHÁC NHAU khi hai dãy là anh em ruột trong cùng một `<g>`, nếu không React
 *  báo "Encountered two children with the same key" (cùng khoá 0,1,2…). */
const itemsGrid = (
  n,
  x0,
  y0,
  ch,
  { per = 5, gapX = 30, gapY = 26, s = 18, prefix = "i" } = {},
) =>
  Array.from({ length: n }, (_, i) => (
    <Item
      key={`${prefix}${i}`}
      x={x0 + (i % per) * gapX}
      y={y0 + Math.floor(i / per) * gapY}
      ch={ch}
      s={s}
    />
  ));

/* ═══════════════════════════════════════════════════════════════════════════════
 * NumberScene — một khoá, nhiều kiểu (giống SpatialScene).
 * ═══════════════════════════════════════════════════════════════════════════════ */
/**
 * “Thẻ chấm” bản TƯƠNG TÁC: bé bấm ô giữa (hoặc ô “?”) rồi chọn dấu, app chấm NGAY.
 * Ca đã có `sign` sẵn là hàng MẪU in sẵn ⇒ bé không phải làm gì, giữ nguyên bản tĩnh.
 * Tách ra component riêng vì `useFillSlots` là hook (xem `interactiveFill.jsx`).
 */
function DotCardsCard({ left = 0, right = 0, note = "" }) {
  const l = Number(left) || 0;
  const r = Number(right) || 0;
  const answer = l > r ? ">" : l < r ? "<" : "=";
  const fill = useFillSlots([answer]);
  const look = slotLook(fill, 0, false);
  return (
    <div style={card}>
      <svg
        viewBox="0 0 360 152"
        {...svgFit(360)}
        role="img"
        aria-label="Hai thẻ chấm để bé so sánh — bé bấm ô dấu hỏi rồi chọn dấu"
      >
        <rect
          x="20"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={l} x={20} y={16} w={104} h={104} />
        <g onClick={() => fill.setActive(0)} style={{ cursor: "pointer" }}>
          {fill.active === 0 && !fill.solved[0] && (
            <rect
              x="144"
              y="40"
              width="72"
              height="56"
              rx="14"
              fill="none"
              stroke={P.violet}
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
          )}
          <Tile
            x="150"
            y="46"
            w={60}
            h={44}
            text={fill.picked[0] ?? "?"}
            fs={fill.picked[0] ? 26 : 24}
            fill={look.fill}
            stroke={look.stroke}
            color={look.color}
            dash={look.dash}
          />
        </g>
        <rect
          x="236"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={r} x={236} y={16} w={104} h={104} />
        <text
          x="180"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Bé đếm chấm hai thẻ rồi chọn dấu ở thanh dưới
        </text>
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
      <FillBar fill={fill} />
    </div>
  );
}

/**
 * “So sánh theo mẫu” bản TƯƠNG TÁC: bé bấm ô “?” rồi chọn dấu, app chấm NGAY.
 * Tách ra component riêng vì `useFillSlots` là hook — KHÔNG được gọi trong nhánh `if`
 * của `NumberScene` (hàm đó có nhiều `return` sớm ⇒ lệch số hook ⇒ React ném lỗi).
 */
function ComparePairsCard({ pairs = [], model = "", note = "" }) {
  /** Hàng “mẫu” đánh dấu `null` ⇒ không tính vào tiến độ và không cho bấm. */
  const answers = pairs.map(([l, r], i) =>
    i === 0 && model ? null : l > r ? ">" : l < r ? "<" : "=",
  );
  const fill = useFillSlots(answers);
  const H = pairs.length * 44 + 18;
  return (
    <div style={card}>
      <svg
        viewBox={`0 0 360 ${H}`}
        {...svgFit(360)}
        role="img"
        aria-label="So sánh theo mẫu — bé bấm ô dấu hỏi rồi chọn dấu"
      >
        {pairs.map(([l, r], i) => {
          const y = 10 + i * 44;
          const laMau = i === 0 && !!model;
          const look = slotLook(fill, i, laMau);
          return (
            <g key={i}>
              <rect
                x="22"
                y={y}
                width="104"
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={l} x={22} y={y} w={104} h={36} r={3.6} />
              <g
                onClick={laMau ? undefined : () => fill.setActive(i)}
                style={laMau ? undefined : { cursor: "pointer" }}
              >
                {!laMau && fill.active === i && (
                  <rect
                    x="134"
                    y={y - 5}
                    width="56"
                    height="46"
                    rx="12"
                    fill="none"
                    stroke={P.violet}
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                  />
                )}
                <Tile
                  x="140"
                  y={y}
                  w={44}
                  h={36}
                  text={laMau ? model : (fill.picked[i] ?? "?")}
                  fs={laMau || fill.picked[i] ? 22 : 20}
                  fill={look.fill}
                  stroke={look.stroke}
                  color={look.color}
                  dash={look.dash}
                />
              </g>
              <rect
                x="196"
                y={y}
                width="104"
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={r} x={196} y={y} w={104} h={36} r={3.6} />
              <text
                x="308"
                y={y + 25}
                fontSize="14"
                fontWeight="700"
                fill={P.soft}
              >
                {laMau ? "mẫu" : ""}
              </text>
            </g>
          );
        })}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
      <FillBar fill={fill} />
    </div>
  );
}

export function NumberScene({
  mode = "",
  note = "",
  // numberShow
  kind = "",
  // manyGroups
  groups = [],
  paired = false,
  unit = "",
  // addToReach
  have = 0,
  target = 0,
  a = 0,
  b = 0,
  emoji = "🥚",
  ask = "Bé chọn A hay B?",
  // countFiltered
  cols = 6,
  colored = [],
  labels = [],
  kinds = [],
  // sceneCount (số lượng do mình chọn — ghi ở bảng nguồn)
  legend = [],
  // numberTrain / numberBond / matchEqual / numberMaze / dotCards / comparePairs
  numbers = [],
  rows = [],
  /**
   * `answers` + `options` cho DÃY SỐ ĐIỀN ĐƯỢC (`kind: "ribbon"/"wagons"`): `answers` = số
   * đúng của TỪNG ô trống theo thứ tự đọc (thiếu ⇒ giữ bản tĩnh), `options` = các số cho bé
   * chọn (thiếu ⇒ bộ vẽ tự lấy mỗi đáp án cùng hai số kề).
   */
  answers = null,
  options = null,
  total = 0,
  parts = [],
  pairs = [],
  grid = [],
  left = null,
  right = null,
  sign = "",
  model = "",
  dotsOnly = true,
  // gridWalk
  startAt = 25,
}) {
  /**
   * `dx` (tuỳ chọn): dịch nội dung sang phải để lề hai bên đều nhau. Có kiểu vẽ cố tình chừa
   * chỗ bên phải cho nhãn nên nội dung nhìn LỆCH TRÁI — người dùng báo 2026-09-24.
   */
  /** Slide bài học thì cho bé BẤM trả lời; slide câu hỏi thì không (xem `interactiveFill.jsx`). */
  const interactive = useInteractive();
  const box = (children, w, h, label, dx = 0) => (
    <div style={card}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        {...svgFit(w)}
        role="img"
        aria-label={label}
      >
        {dx ? <g transform={`translate(${dx},0)`}>{children}</g> : children}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );

  /* ── 1. Năm bạn của bé (SGK tr.6) ─────────────────────────────────────────── */
  if (mode === "fiveFriends") {
    /**
     * 🔴 GIỚI TÍNH PHẢI NHÌN RA ĐƯỢC. Bản cũ vẽ **cùng một kiểu tóc** cho cả 5 bạn (chỉ khác
     * màu áo) ⇒ không ai biết Nam · Việt là bé trai, Mai · Mi là bé gái (người dùng báo
     * 2026-09-24). Nay: bé trai tóc ngắn; bé gái tóc dài + HAI BÍM + NƠ; Rô-bốt giữ nguyên.
     * Quy ước này dùng CHUNG với `kidsLeftRight` (GeometryVisuals).
     */
    const friends = [
      { name: "Nam", kind: "boy", shirt: "#60a5fa", hair: "#1f2937" },
      { name: "Mai", kind: "girl", shirt: "#f472b6", hair: "#78350f" },
      { name: "Rô-bốt", kind: "robot", shirt: "#94a3b8", hair: null },
      { name: "Việt", kind: "boy", shirt: "#4ade80", hair: "#1f2937" },
      { name: "Mi", kind: "girl", shirt: "#fbbf24", hair: "#78350f" },
    ];
    return box(
      <>
        <text
          x="180"
          y="20"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill={P.soft}
        >
          Năm bạn cùng học Toán với bé
        </text>
        <line
          x1="14"
          y1="116"
          x2="346"
          y2="116"
          stroke={P.grid}
          strokeWidth="3"
          strokeDasharray="6 5"
        />
        {friends.map((f, i) => {
          const x = 45 + i * 70;
          return (
            <g key={f.name}>
              <ellipse
                cx={x}
                cy={120}
                rx="20"
                ry="4"
                fill="#000000"
                opacity="0.08"
              />
              {f.hair ? (
                <>
                  {/* BÍM vẽ TRƯỚC đầu để nằm sau tóc */}
                  {f.kind === "girl" && (
                    <>
                      <ellipse
                        cx={x - 15}
                        cy="76"
                        rx="5"
                        ry="9"
                        fill={f.hair}
                      />
                      <ellipse
                        cx={x + 15}
                        cy="76"
                        rx="5"
                        ry="9"
                        fill={f.hair}
                      />
                    </>
                  )}
                  <circle
                    cx={x}
                    cy="70"
                    r="14"
                    fill="#fcd5ce"
                    stroke="#e07a5f"
                    strokeWidth="1.6"
                  />
                  {f.kind === "girl" ? (
                    <path
                      d={`M${x - 14},70 q0,-20 14,-20 q14,0 14,20 q-6,-9 -14,-9 q-8,0 -14,9 Z`}
                      fill={f.hair}
                    />
                  ) : (
                    <path
                      d={`M${x - 14},66 q6,-17 28,-1 q-4,-11 -14,-11 q-10,0 -14,12 Z`}
                      fill={f.hair}
                    />
                  )}
                  {f.kind === "girl" && (
                    <circle cx={x - 8} cy="58" r="3.2" fill="#ec4899" />
                  )}
                </>
              ) : (
                <>
                  <rect
                    x={x - 14}
                    y="56"
                    width="28"
                    height="28"
                    rx="6"
                    fill="#e2e8f0"
                    stroke="#475569"
                    strokeWidth="1.8"
                  />
                  <line
                    x1={x}
                    y1="56"
                    x2={x}
                    y2="46"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  <circle cx={x} cy="43" r="4" fill="#ef4444" />
                  <circle cx={x - 6} cy="68" r="3.4" fill="#1e293b" />
                  <circle cx={x + 6} cy="68" r="3.4" fill="#1e293b" />
                </>
              )}
              <rect
                x={x - 16}
                y="84"
                width="32"
                height="30"
                rx="9"
                fill={f.shirt}
                stroke="#475569"
                strokeWidth="1.6"
              />
              <text
                x={x}
                y="134"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                {f.name}
              </text>
            </g>
          );
        })}
      </>,
      360,
      145,
      "Năm bạn: Nam, Mai, Rô-bốt, Việt, Mi",
    );
  }

  /* ── 2. Bảng KHÁM PHÁ (SGK tr.8 và tr.14) ─────────────────────────────────── */
  // kind="tank"  : 0 → 5, bể cá + khối lập phương màu  (tr.8)
  // kind="living": 6 → 10, nhóm con vật / hoa           (tr.14)
  if (mode === "numberShow") {
    const CUBE = ["#facc15", "#fb923c", "#f87171", "#4ade80", "#60a5fa"];
    const tank = (n) => (
      <g>
        <rect
          x="14"
          y="0"
          width="196"
          height="27"
          rx="7"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {Array.from({ length: n }, (_, i) => (
          <rect
            key={i}
            x={22 + i * 34}
            y="5"
            width="26"
            height="17"
            rx="3"
            fill={CUBE[i % 5]}
            stroke="#475569"
            strokeWidth="1.4"
          />
        ))}
      </g>
    );
    const rowsSpec =
      kind === "tank"
        ? [
            { n: 1, word: "một" },
            { n: 2, word: "hai" },
            { n: 3, word: "ba" },
            { n: 4, word: "bốn" },
            { n: 5, word: "năm" },
            { n: 0, word: "không" },
          ]
        : [
            { n: 6, word: "sáu", ch: "🐝" },
            { n: 7, word: "bảy", ch: "🐦" },
            { n: 8, word: "tám", ch: "🌸" },
            { n: 9, word: "chín", ch: "⭐" },
            { n: 10, word: "mười", ch: "🐞" },
          ];
    const rowH = kind === "tank" ? 34 : 44;
    const H = rowsSpec.length * rowH + 12;
    return box(
      <>
        {rowsSpec.map((r, i) => {
          const y = 6 + i * rowH;
          return (
            <g key={r.n} transform={`translate(0,${y})`}>
              {kind === "tank"
                ? tank(r.n)
                : itemsGrid(r.n, 26, 20, r.ch, {
                    per: 5,
                    gapX: 34,
                    gapY: 22,
                    s: 17,
                  })}
              <text
                x="248"
                y="20"
                textAnchor="middle"
                fontSize="22"
                fontWeight="900"
                fill={P.ink}
              >
                {r.n}
              </text>
              <text
                x="286"
                y="19"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={P.soft}
              >
                {r.word}
              </text>
            </g>
          );
        })}
      </>,
      360,
      H,
      kind === "tank" ? "Các số 0, 1, 2, 3, 4, 5" : "Các số 6, 7, 8, 9, 10",
      20,
    );
  }

  /* ── 3. Nhiều NHÓM để so sánh / ghép đôi (SGK tr.20–23, 41, 44) ───────────── */
  if (mode === "manyGroups") {
    const gs = groups.map((g) => ({
      ch: g.emoji || "🐟",
      n: Math.max(0, num(g.n, 0)),
      label: g.label || "",
    }));
    const rowH = 42;
    // +32: chừa một dải riêng cho dòng chú thích. Không chừa thì chú thích đè lên
    // emoji của hàng cuối khi chỉ có 1 hàng (đo trên ca dữ liệu thật, 375 px).
    const H = gs.length * rowH + 32;
    return box(
      <>
        {gs.map((g, i) => {
          const y = 8 + i * rowH;
          const n = Math.min(g.n, 10);
          return (
            <g key={i}>
              <rect
                x="10"
                y={y}
                width="340"
                height={rowH - 6}
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              {itemsGrid(n, 34, y + 27, g.ch, {
                per: 10,
                gapX: 32,
                gapY: 0,
                s: 19,
              })}
              {g.label !== "" && (
                <text
                  x="326"
                  y={y + 27}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill={P.blue}
                >
                  {g.label}
                </text>
              )}
            </g>
          );
        })}
        {paired &&
          gs.length === 2 &&
          Array.from({ length: Math.min(gs[0].n, gs[1].n) }, (_, i) => (
            <line
              key={"p" + i}
              x1={34 + i * 32}
              y1={8 + 30}
              x2={34 + i * 32}
              y2={8 + rowH + 6}
              stroke={P.rose}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          ))}
        {unit !== "" && (
          <text
            x="180"
            y={H - 8}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            {unit}
          </text>
        )}
      </>,
      360,
      H,
      "Các nhóm đồ vật để so sánh",
    );
  }

  /* ── 4. CHO THÊM để đạt số lượng cho trước (SGK tr.12, 15, 18, 23) ────────── */
  if (mode === "addToReach") {
    const haveN = Math.max(0, num(have, 0));
    const aN = Math.max(0, num(a, 0));
    const bN = Math.max(0, num(b, 0));
    /** Điểm bắt đầu để một lưới `n` món **canh giữa** quanh trục `cx`. */
    const tam = (n2, cx, per2 = 5, gapX = 52) =>
      cx - ((Math.min(n2, per2) - 1) * gapX) / 2;
    return box(
      <>
        <rect
          x="10"
          y="8"
          width="340"
          height="44"
          rx="10"
          fill={P.amberSoft}
          stroke={P.amber}
          strokeWidth="2"
        />
        <text
          x="180"
          y="37"
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill="#92400e"
        >
          {`Cho thêm để có ${num(target, 0)}`}
        </text>
        <rect
          x="10"
          y="60"
          width="340"
          height="92"
          rx="12"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        {itemsGrid(haveN, tam(haveN, 180), 106, emoji, {
          per: 5,
          gapX: 52,
          gapY: 34,
          s: 24,
          prefix: "h",
        })}
        {/* HAI LỰA CHỌN A · B — để XUỐNG DƯỚI cho thoáng (người dùng báo 2026-09-24),
            mỗi hộp rộng 164 đơn vị, món canh giữa hộp. */}
        {[
          { chu: "A", n: aN, x: 14, mau: P.green, nen: P.greenSoft, p: "a" },
          { chu: "B", n: bN, x: 186, mau: P.violet, nen: "#ede9fe", p: "b" },
        ].map((o) => (
          <g key={o.chu}>
            <text
              x={o.x + 82}
              y="172"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill={o.mau}
            >
              {`${o.chu} — thêm ${o.n}`}
            </text>
            <rect
              x={o.x}
              y="180"
              width="164"
              height="52"
              rx="10"
              fill={o.nen}
              stroke={o.mau}
              strokeWidth="2"
            />
            {itemsGrid(o.n, tam(o.n, o.x + 82, 4, 38), 212, emoji, {
              per: 4,
              gapX: 38,
              gapY: 24,
              s: 22,
              prefix: o.p,
            })}
          </g>
        ))}
        <text
          x="180"
          y="248"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          {ask}
        </text>
      </>,
      360,
      258,
      "Chọn A hay B để cho thêm cho đủ",
    );
  }

  /* ── 5. ĐẾM THEO ĐIỀU KIỆN (SGK tr.11, 17) ───────────────────────────────── */
  // type="colored": cà rốt đã tô màu   |  type="labeled": con vật ghi số
  // type="legs"  : con vật có 6 chân
  if (mode === "countFiltered") {
    if (kind === "colored") {
      const n = Math.max(1, num(cols, 6));
      const set = Array.isArray(colored) ? colored.map((x) => num(x, -1)) : [];
      return box(
        <>
          {Array.from({ length: n }, (_, i) => (
            <Item
              key={i}
              x={30 + i * (300 / Math.max(1, n - 1))}
              y="58"
              ch="🥕"
              s="30"
              opacity={set.includes(i) ? 1 : 0.28}
            />
          ))}
          <text
            x="180"
            y="96"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé đếm xem có bao nhiêu củ đã tô màu
          </text>
        </>,
        360,
        108,
        "Cà rốt đã tô màu và chưa tô màu",
      );
    }
    if (kind === "labeled") {
      const ls = Array.isArray(labels) ? labels.map((x) => num(x, 0)) : [];
      return box(
        <>
          {ls.map((v, i) => {
            const x = 46 + (i % 5) * 68;
            const y = i < 5 ? 42 : 106;
            return (
              <g key={i}>
                <Item x={x} y={y} ch="🐔" s="26" />
                <Tile
                  x={x - 15}
                  y={y + 8}
                  w={30}
                  h={26}
                  text={String(v)}
                  fs={14}
                  stroke={P.grid}
                />
              </g>
            );
          })}
          <text
            x="180"
            y="152"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé đếm xem có bao nhiêu con ghi số 2
          </text>
        </>,
        360,
        164,
        "Đàn gà có ghi số ở mỗi con",
      );
    }
    // kind === "legs"
    const ks = Array.isArray(kinds) ? kinds : [];
    const LEGS = { ladybug: 6, beetle: 6, spider: 8, ant: 6, bee: 6 };
    return box(
      <>
        {ks.map((k, i) => {
          const legs = LEGS[k] || 6;
          const perSide = Math.max(2, Math.round(legs / 2));
          const cx = 52 + i * 66;
          const cy = 56;
          return (
            <g key={i}>
              {[-1, 1].map((s) =>
                Array.from({ length: perSide }, (_, j) => (
                  <line
                    key={`${s}-${j}`}
                    x1={cx + s * 8}
                    y1={cy - 6 + j * (14 / perSide)}
                    x2={cx + s * 28}
                    y2={cy - 16 + j * (28 / perSide)}
                    stroke="#334155"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                )),
              )}
              <ellipse
                cx={cx}
                cy={cy}
                rx="14"
                ry="11"
                fill="#cbd5e1"
                stroke="#334155"
                strokeWidth="1.8"
              />
              <circle
                cx={cx}
                cy={cy - 13}
                r="6.5"
                fill="#94a3b8"
                stroke="#334155"
                strokeWidth="1.6"
              />
              <text
                x={cx}
                y="98"
                textAnchor="middle"
                fontSize="14"
                fontWeight="800"
                fill={P.ink}
              >
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          );
        })}
        <text
          x="180"
          y="118"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Bé đếm chân để tìm con vật có 6 chân
        </text>
      </>,
      360,
      130,
      "Năm con vật để bé đếm chân",
    );
  }

  /* ── 6. ĐẾM TRONG TRANH CẢNH (SGK tr.13, 17, 39, 40) ─────────────────────── */
  // Số lượng từng loại là DO MÌNH CHỌN (ảnh quét không đủ rõ) — đã ghi ở bảng nguồn §7.
  if (mode === "sceneCount") {
    const SCENE = {
      farm: [
        ["🐄", 60, 60, 1],
        ["🐄", 120, 74, 1],
        ["☁️", 250, 34, 1],
        ["☁️", 300, 44, 1],
        ["☁️", 340, 30, 1],
        ["🐔", 200, 96, 1],
        ["🐔", 232, 78, 1],
        ["🐔", 268, 100, 1],
        ["🐔", 300, 84, 1],
        ["🌻", 40, 118, 1],
        ["🌻", 76, 128, 1],
        ["🌻", 112, 112, 1],
        ["🌻", 148, 124, 1],
        ["🌻", 180, 138, 1],
        ["☀️", 26, 30, 1],
        ["🐟", 246, 132, 1],
        ["🐟", 280, 142, 1],
        ["🐟", 314, 128, 1],
        ["🐟", 250, 166, 1],
        ["🐟", 210, 148, 1],
        ["🐟", 152, 164, 1],
      ],
      pond: [
        ["🐰", 56, 70, 1],
        ["🐰", 92, 86, 1],
        ["🐰", 128, 66, 1],
        ["🐰", 164, 88, 1],
        ["🌳", 240, 74, 1],
        ["🌳", 288, 92, 1],
        ["🌳", 336, 70, 1],
        ["🦆", 210, 130, 1],
        ["🦆", 248, 118, 1],
        ["🦆", 286, 136, 1],
        ["🦆", 322, 120, 1],
        ["🦆", 180, 150, 1],
        ["☁️", 40, 26, 1],
        ["☁️", 96, 22, 1],
        ["🐦", 150, 36, 1],
        ["🐦", 186, 26, 1],
        ["🐦", 222, 38, 1],
        ["🐦", 258, 28, 1],
        ["🐦", 294, 44, 1],
        ["🐦", 324, 32, 1],
      ],
      river: [
        ["🛶", 60, 60, 1],
        ["🛶", 140, 88, 1],
        ["🛶", 220, 62, 1],
        ["🌴", 290, 74, 1],
        ["🌴", 320, 96, 1],
        ["🌴", 250, 108, 1],
        ["🌴", 180, 126, 1],
        ["🏠", 40, 110, 1],
        ["🏠", 96, 130, 1],
        ["🐟", 150, 150, 1],
        ["🐟", 196, 166, 1],
        ["🐟", 242, 154, 1],
        ["🐟", 288, 144, 1],
        ["🐟", 326, 158, 1],
      ],
      field: [
        ["🐃", 60, 70, 1],
        ["🐃", 112, 86, 1],
        ["🐃", 164, 68, 1],
        ["🐃", 216, 88, 1],
        ["🐃", 268, 70, 1],
        ["🏠", 320, 60, 1],
        ["🏠", 296, 110, 1],
        ["🏠", 330, 104, 1],
        ["🌾", 40, 120, 1],
        ["🌾", 76, 132, 1],
        ["🌾", 112, 122, 1],
        ["🌾", 148, 136, 1],
        ["🌾", 184, 124, 1],
        ["🌾", 220, 138, 1],
        ["☀️", 28, 30, 1],
        ["☁️", 120, 30, 1],
        ["☁️", 180, 24, 1],
      ],
    };
    const items = SCENE[kind] || SCENE.farm;
    const lg = Array.isArray(legend) ? legend : [];
    const coNuoc = kind === "pond" || kind === "river";
    return box(
      <>
        <rect
          x="10"
          y="8"
          width="340"
          height="164"
          rx="12"
          fill={coNuoc ? "#e0f2fe" : "#f0fdf4"}
          stroke={P.grid}
          strokeWidth="2"
        />
        {coNuoc ? (
          <ellipse
            cx="180"
            cy="150"
            rx="150"
            ry="34"
            fill="#bae6fd"
            opacity="0.75"
          />
        ) : (
          kind === "farm" && (
            <ellipse
              cx="262"
              cy="150"
              rx="84"
              ry="24"
              fill="#bae6fd"
              opacity="0.8"
            />
          )
        )}
        {items.map(([ch, x, y], i) => (
          <Item key={i} x={x} y={y} ch={ch} s="20" />
        ))}
        <rect
          x="10"
          y="178"
          width="340"
          height={lg.length > 3 ? 62 : 34}
          rx="10"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        {lg.map((it, i) => {
          const x = 34 + (i % 3) * 112;
          const y = 178 + 22 + Math.floor(i / 3) * 30;
          return (
            <g key={i}>
              <Item x={x} y={y} ch={it.emoji} s="17" />
              <Tile
                x={x + 12}
                y={y - 17}
                w={34}
                h={24}
                text="?"
                fs={15}
                stroke={P.blue}
                color={P.blue}
              />
            </g>
          );
        })}
      </>,
      360,
      lg.length > 3 ? 246 : 218,
      "Tranh cảnh để bé đếm",
    );
  }

  /* ── 7. DÃY SỐ / TOA TÀU có ô trống (SGK tr.10, 16, 40) ──────────────────── */

  /**
   * Ô TRỐNG của dãy số — bộ vẽ nhận cả ba cách viết (`null`, `"?"`, chuỗi rỗng).
   * ⚠️ Bản đầu chỉ nhận `null` và `"?"`, nên dữ liệu ghi `""` sẽ vẽ ra **ô trống mà không có
   * dấu hỏi** ⇒ trẻ không biết đó là chỗ phải điền.
   */
  const laOTrong = (v) => v === null || v === "?" || v === "";

  /**
   * Toạ độ ô của DÃY DỌC (`kind = "ribbon"`) — MỘT NGUỒN DUY NHẤT cho cả bản tĩnh lẫn bản bé
   * điền được. (Trước đây công thức nằm ngay trong JSX; viết bản tương tác mà chép lại công
   * thức là hai bản sẽ lệch nhau ở lần sửa sau.)
   *
   * 🔴 TỰ XUỐNG DÒNG: dãy dài (SGK tr.5 có dãy **1 → 20**) không vừa một hàng — 20 ô × 32 đơn vị
   * = 640 > 360 nên `startX` ra **số âm** và hình vẽ tràn ra ngoài khung. Nay chia thành nhiều
   * hàng, mỗi hàng tối đa `MAX_O` ô và **mỗi hàng tự canh giữa** (hàng cuối ngắn vẫn cân).
   */
  const MAX_O = 11;
  function oRibbon(ns) {
    const hang = [];
    for (let i = 0; i < ns.length; i += MAX_O) {
      const phan = ns.slice(i, i + MAX_O);
      const startX = 180 - ((phan.length - 1) * 32 + 28) / 2;
      const y = 16 + hang.length * 44;
      hang.push(
        phan.map((v, j) => ({ v, x: startX + j * 32, y, w: 28, h: 34 })),
      );
    }
    return hang;
  }

  /** Toạ độ ĐẦU MÁY + từng TOA (`kind = "wagons"`). */
  function oWagons(rs) {
    return rs.map((r, i) => {
      const toa = Array.isArray(r) ? r : [];
      const y = 8 + i * 40;
      /** Canh giữa CẢ ĐOÀN theo số toa thật (bản cũ dồn đoàn 2 toa về trái — người dùng báo). */
      const x0 = (360 - (94 + Math.max(0, toa.length - 1) * 60)) / 2;
      return {
        i,
        x0,
        y,
        cells: toa.map((v, j) => ({
          v,
          x: x0 + 42 + j * 60,
          y,
          w: 52,
          h: 30,
        })),
      };
    });
  }

  /** Đầu máy tàu — dùng chung cho mọi cách vẽ. */
  function DauMay({ x0, y }) {
    return (
      <>
        <rect
          x={x0}
          y={y}
          width="34"
          height="30"
          rx="6"
          fill="#94a3b8"
          stroke="#475569"
          strokeWidth="1.6"
        />
        <circle cx={x0 + 10} cy={y + 33} r="4" fill="#475569" />
        <circle cx={x0 + 24} cy={y + 33} r="4" fill="#475569" />
      </>
    );
  }

  /**
   * DÃY SỐ / TOA TÀU — bản TĨNH và bản ĐIỀN ĐƯỢC dùng CHUNG một hàm vẽ.
   *
   * 🔴 VÌ SAO (yêu cầu người dùng 2026-09-25): “mọi ô trống phải điền được”. Trước đây dãy số
   * có ô `?` chỉ để NHÌN (chữ ghi “bé điền số còn thiếu” mà không có gì bấm được) — 2 slide
   * Lớp 1 (`g1-c1-l4`, `g1-c1-l11`) rơi đúng vào ca này và **không cổng nào bắt được**.
   *
   * `tinh` = true (hoặc thiếu `answers`) ⇒ giữ nguyên bản tĩnh: dùng cho slide CÂU HỎI, nơi bé
   * trả lời bằng các lựa chọn của câu hỏi chứ không bấm vào hình.
   */
  function TrainFill({
    kind = "wagons",
    numbers = [],
    rows = [],
    answers = [],
    options = [],
    note = "",
    tinh = false,
  }) {
    const laRibbon = kind === "ribbon";
    const hangRibbon = laRibbon ? oRibbon(numbers) : [];
    const hang = laRibbon ? [] : oWagons(rows);
    const dsO = (
      laRibbon ? hangRibbon.flat() : hang.flatMap((r) => r.cells)
    ).filter((o) => laOTrong(o.v));
    const choBam = !tinh && dsO.length > 0 && answers.length === dsO.length;
    const fill = useFillSlots(choBam ? answers : []);
    /** Ô nào là ô trống thứ mấy, theo thứ tự đọc (trái → phải, trên → dưới). */
    const viTri = new Map(dsO.map((o, i) => [o, i]));

    /**
     * Nút chọn: dữ liệu cho `options` thì dùng; không thì lấy mỗi đáp án cùng hai số kề —
     * đủ để bé phải đọc dãy số mới chọn đúng, mà thanh nút không dài vô tận. Bé bấm SAI thì
     * ô đỏ và bé thử lại (xem `interactiveFill.jsx`).
     */
    const dsChon = options.length
      ? options
      : [
          ...new Set(
            answers.flatMap((a) => [Number(a) - 1, Number(a), Number(a) + 1]),
          ),
        ]
          .filter((n) => Number.isFinite(n) && n >= 0)
          .sort((a, b) => a - b);

    const veO = (o, key) => {
      const slot = viTri.get(o);
      const look = choBam
        ? slotLook(fill, slot)
        : { fill: "#f8fafc", stroke: P.blue, color: P.blue, dash: true };
      const picked = choBam ? fill.picked[slot] : null;
      return (
        <g
          key={key}
          onClick={() => choBam && fill.setActive(slot)}
          style={{ cursor: choBam ? "pointer" : "default" }}
        >
          <Tile
            x={o.x}
            y={o.y}
            w={o.w}
            h={o.h}
            text={
              picked === null || picked === undefined ? "?" : String(picked)
            }
            fs={laRibbon ? 16 : 17}
            fill={look.fill}
            stroke={look.stroke}
            color={look.color}
            dash={look.dash}
          />
        </g>
      );
    };

    /**
     * Ô ĐÃ IN SẴN SỐ (không phải chỗ bé điền).
     * ⚠️ Hai kiểu vẽ là CỐ Ý, giữ đúng dáng cũ của từng kiểu: dãy dọc dùng `Tile` (ô bo tròn),
     * còn TOA TÀU dùng `Rect2` (thân toa viền đậm) — đổi hết sang `Tile` là mất dáng đoàn tàu.
     * Ô TRỐNG thì luôn dùng `Tile` vì cần màu phản hồi (tím đang chọn / xanh đúng / đỏ sai).
     */
    const veTinh = (o, key) => {
      if (laRibbon)
        return (
          <Tile
            key={key}
            x={o.x}
            y={o.y}
            w={o.w}
            h={o.h}
            text={String(num(o.v, 0))}
            fs={16}
            fill="#ffffff"
            stroke={P.grid}
            color={P.ink}
            dash={false}
          />
        );
      return (
        <g key={key}>
          <Rect2 x={o.x} y={o.y} w={o.w} h={o.h} />
          <text
            x={o.x + o.w / 2}
            y={o.y + 22}
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill={P.ink}
          >
            {String(num(o.v, 0))}
          </text>
        </g>
      );
    };

    const H = laRibbon ? hangRibbon.length * 44 + 26 : hang.length * 40 + 14;

    return (
      <div style={card}>
        <svg
          viewBox={`0 0 360 ${H}`}
          {...svgFit(360)}
          role="img"
          aria-label={
            laRibbon ? "Dãy số có ô trống" : "Các đoàn tàu có ô số còn thiếu"
          }
        >
          {laRibbon &&
            hangRibbon.map((r, i) => (
              <g key={i}>
                {r.map((o, j) =>
                  laOTrong(o.v) ? veO(o, `${i}-${j}`) : veTinh(o, `${i}-${j}`),
                )}
              </g>
            ))}
          {!laRibbon &&
            hang.map((r) => (
              <g key={r.i}>
                <DauMay x0={r.x0} y={r.y} />
                {r.cells.map((o, j) =>
                  laOTrong(o.v)
                    ? veO(o, `${r.i}-${j}`)
                    : veTinh(o, `${r.i}-${j}`),
                )}
              </g>
            ))}
          <text
            x="180"
            y={laRibbon ? H - 4 : H - 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={P.soft}
          >
            Bé điền số còn thiếu vào ô có dấu ?
          </text>
        </svg>
        {note && (
          <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
        )}
        {choBam && (
          <FillBar
            fill={fill}
            options={dsChon}
            title="Bé chọn số điền vào ô ?"
            hint="Ô màu đỏ chưa đúng — bé đọc lại cả dãy số rồi chọn lại nhé."
          />
        )}
      </div>
    );
  }

  if (mode === "numberTrain") {
    return (
      <TrainFill
        kind={kind}
        numbers={Array.isArray(numbers) ? numbers : []}
        rows={Array.isArray(rows) ? rows : []}
        answers={Array.isArray(answers) ? answers : []}
        options={Array.isArray(options) ? options : []}
        note={note}
        /**
         * Cho bấm CHỈ khi slide cho bấm VÀ dữ liệu có đủ đáp án cho từng ô trống; thiếu một
         * trong hai thì giữ bản tĩnh (không bao giờ vẽ ô trống mà bấm vào không được).
         */
        tinh={
          !interactive ||
          !Array.isArray(answers) ||
          answers.length !==
            (kind === "ribbon"
              ? Array.isArray(numbers)
                ? numbers
                : []
              : (Array.isArray(rows) ? rows : []).flatMap((r) =>
                  Array.isArray(r) ? r : [],
                )
            ).filter(laOTrong).length
        }
      />
    );
  }
  /* ── 8. TÁCH – GỘP: sơ đồ nhánh và bảng (SGK tr.33, 35, 37, 45) ──────────── */
  if (mode === "numberBond") {
    if (kind === "table") {
      const ps = Array.isArray(parts) ? parts : [];
      const H = ps.length * 40 + 16;
      return box(
        <>
          {ps.map((p, i) => {
            const y = 10 + i * 40;
            return (
              <g key={i}>
                <Tile
                  x={16}
                  y={y}
                  w={54}
                  h={34}
                  text={String(num(total, 0))}
                  fs={18}
                  fill={P.amberSoft}
                  stroke={P.amber}
                  color="#92400e"
                />
                <text
                  x={88}
                  y={y + 24}
                  fontSize="14"
                  fontWeight="700"
                  fill={P.soft}
                >
                  gồm
                </text>
                <text
                  x={128}
                  y={y + 24}
                  fontSize="17"
                  fontWeight="900"
                  fill={P.ink}
                >
                  {String(num(p, 0))}
                </text>
                <text
                  x={152}
                  y={y + 24}
                  fontSize="16"
                  fontWeight="800"
                  fill={P.soft}
                >
                  và
                </text>
                <Tile
                  x={176}
                  y={y}
                  w={54}
                  h={34}
                  text="?"
                  fs={18}
                  stroke={P.blue}
                  color={P.blue}
                  dash
                />
                <text
                  x="248"
                  y={y + 24}
                  fontSize="14"
                  fontWeight="700"
                  fill={P.soft}
                >
                  {`(${num(total, 0)} gồm ${num(p, 0)} và ?)`}
                </text>
              </g>
            );
          })}
        </>,
        360,
        H,
        "Bảng tách số",
      );
    }
    // kind === "bond": vòng tròn tổng + hai nhánh
    const t = num(total, 0);
    const blank = (v) => v === undefined || v === null || v === "";
    const l = blank(left) ? "?" : String(num(left, 0));
    const r2 = blank(right) ? "?" : String(num(right, 0));
    return box(
      <>
        <circle
          cx="180"
          cy="46"
          r="34"
          fill={P.blueSoft}
          stroke={P.blue}
          strokeWidth="2.5"
        />
        <text
          x="180"
          y="58"
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fill={P.blue}
        >
          {String(t)}
        </text>
        <line
          x1="152"
          y1="72"
          x2="98"
          y2="106"
          stroke={P.soft}
          strokeWidth="2.5"
        />
        <line
          x1="208"
          y1="72"
          x2="262"
          y2="106"
          stroke={P.soft}
          strokeWidth="2.5"
        />
        <Tile
          x={58}
          y={106}
          w={80}
          h={44}
          text={l}
          fs={22}
          stroke={P.amber}
          color="#92400e"
          fill={P.amberSoft}
          dash={l === "?"}
        />
        <Tile
          x={222}
          y={106}
          w={80}
          h={44}
          text={r2}
          fs={22}
          stroke={P.amber}
          color="#92400e"
          fill={P.amberSoft}
          dash={r2 === "?"}
        />
        <text
          x="180"
          y="172"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          {dotsOnly ? "Bé tách số ở trên thành hai phần" : ""}
        </text>
      </>,
      360,
      182,
      "Sơ đồ tách một số thành hai phần",
    );
  }

  /* ── 9. NỐI HAI NHÓM BẰNG NHAU (SGK tr.28, 39) ───────────────────────────── */
  if (mode === "matchEqual") {
    const ps = Array.isArray(pairs) ? pairs : [];
    const H = ps.length * 56 + 16;
    return box(
      <>
        {ps.map((p, i) => {
          const y = 10 + i * 56;
          const [L, R] = p;
          const lx = 12;
          const rx = 196;
          return (
            <g key={i}>
              <rect
                x={lx}
                y={y}
                width="152"
                height="48"
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              <rect
                x={rx}
                y={y}
                width="152"
                height="48"
                rx="10"
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              {itemsGrid(Math.min(num(L.n, 0), 5), lx + 26, y + 30, L.emoji, {
                per: 5,
                gapX: 27,
                gapY: 0,
                s: 17,
                prefix: "l",
              })}
              {itemsGrid(Math.min(num(R.n, 0), 5), rx + 26, y + 30, R.emoji, {
                per: 5,
                gapX: 27,
                gapY: 0,
                s: 17,
                prefix: "r",
              })}
            </g>
          );
        })}
        {ps.length > 0 && (
          <line
            x1="164"
            y1="34"
            x2="196"
            y2="34"
            stroke={P.green}
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
        )}
        <text
          x="180"
          y={H - 2}
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Nối hai nhóm có số lượng bằng nhau
        </text>
      </>,
      360,
      H + 8,
      "Các nhóm đồ vật để bé nối cặp bằng nhau",
    );
  }

  /* ── 10. MÊ CUNG SỐ (SGK tr.25) ──────────────────────────────────────────── */
  if (mode === "numberMaze" && interactive) {
    /**
     * BÉ TỰ NỐI ĐƯỜNG — người dùng yêu cầu 2026-09-25: “hãy để cho trẻ tự nối, nếu ô được
     * chọn nối đúng nguyên tắc thì hiện màu xanh, nếu sai thì hiện màu đỏ, không nhất thiết
     * phải là đường ngắn nhất”. Bộ vẽ dùng CHUNG với phần Luyện tập (interactiveMaze.jsx).
     */
    return (
      <MazePath
        grid={Array.isArray(grid) ? grid : []}
        rule={{ op: ">", value: 4 }}
        note={note}
      />
    );
  }
  if (mode === "numberMaze") {
    const g = Array.isArray(grid) ? grid : [];
    const soHang = g.length;
    const soCot = g[0] ? g[0].length : 6;
    const cw = 44;
    const chh = 42;
    const x0 = Math.round((360 - soCot * cw) / 2);
    const y0 = 46;
    const H = y0 + soHang * chh + 44;
    /** Còn dùng cho hai icon 🏫/🏠 của bản TĨNH (bản tương tác do `MazePath` tự vẽ). */
    const cx = (ci) => x0 + ci * cw + (cw - 4) / 2;
    /* Đường đi KHÔNG còn vẽ sẵn: bé tự nối (nhánh `interactive` ở trên). */
    return box(
      <>
        <text
          x="180"
          y="16"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={P.soft}
        >
          Đường Mai về nhà chỉ đi qua ô có số lớn hơn 4
        </text>
        {/* TRƯỜNG ở trên ô đầu, NHÀ ở dưới ô cuối — to gấp đôi bản cũ (fontSize 30 thay vì
             17) vì người dùng báo 2026-09-25: “icon trường và nhà cần làm to hơn cho dễ nhìn”. */}
        <text x={cx(0)} y="42" textAnchor="middle" fontSize="30">
          🏫
        </text>
        <text
          x={cx(soCot - 1)}
          y={y0 + soHang * chh + 36}
          textAnchor="middle"
          fontSize="30"
        >
          🏠
        </text>
        {g.map((row, ri) =>
          row.map((v, ci) => (
            <Tile
              key={`${ri}-${ci}`}
              x={x0 + ci * cw}
              y={y0 + ri * chh}
              w={cw - 4}
              h={chh - 4}
              text={String(num(v, 0))}
              fs={17}
            />
          )),
        )}
        {/* Đường đi KHÔNG vẽ sẵn — bé tự nối (nhánh `interactive` ở trên vẽ đường bé chọn). */}
      </>,
      360,
      H,
      "Mê cung số để bé tìm đường",
    );
  }

  /* ── 13. BẢNG 100 SỐ: sang phải 1 ô = thêm 1 · xuống 1 hàng = thêm 10 ────── */
  // 🔴 VÌ SAO LÀ BẢNG chứ không phải tia số: lời bài dạy "thêm 10 thì XUỐNG một hàng".
  // Tia số chỉ có MỘT hàng nên không thể diễn tả được điều đó — hình cũ vẽ mũi tên +10
  // chạy thẳng trên tia số, trái hẳn với lời giảng (người dùng phát hiện 2026-09-24).
  if (mode === "gridWalk") {
    const s0 = Math.max(1, Math.min(num(startAt, 25), 99));
    const rowStart = s0 - ((s0 - 1) % 10); // số đầu của hàng đang chứa `startAt`
    const cw = 30;
    const chh = 34;
    const x0 = 52;
    const y0 = 66;
    const rowY = [y0, y0 + chh + 4];
    const cx = (v) => x0 + ((v - rowStart) % 10) * cw + cw / 2;
    const bg = (v) =>
      v === s0
        ? { fill: P.blueSoft, stroke: P.blue }
        : v === s0 + 1
          ? { fill: P.amberSoft, stroke: P.amber }
          : v === s0 + 10
            ? { fill: P.greenSoft, stroke: P.green }
            : { fill: P.paper, stroke: P.grid };
    const line = rowY[0] + chh / 2;
    const line2 = rowY[1] + chh / 2;
    // Nếu `startAt` đứng ở cột cuối (số tròn chục) thì "sang phải" đã hết hàng —
    // bỏ mũi tên +1 thay vì vẽ sai hướng.
    const coKe = s0 % 10 !== 0;
    return box(
      <>
        <text x={x0} y="22" fontSize="14" fontWeight="800" fill={P.soft}>
          Bảng 100 số (mỗi hàng 10 số)
        </text>
        {[0, 1].map((ri) =>
          Array.from({ length: 10 }, (_, ci) => {
            const v = rowStart + ri * 10 + ci;
            const c = bg(v);
            return (
              <Tile
                key={v}
                x={x0 + ci * cw}
                y={rowY[ri]}
                w={cw - 2}
                h={chh - 2}
                text={String(v)}
                fs={15}
                fill={c.fill}
                stroke={c.stroke}
              />
            );
          }),
        )}
        {coKe && (
          <>
            <line
              x1={cx(s0)}
              y1="56"
              x2={cx(s0 + 1) - 9}
              y2="56"
              stroke={P.amber}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx(s0 + 1) - 9},51 ${cx(s0 + 1)},56 ${cx(s0 + 1) - 9},61`}
              fill={P.amber}
            />
            <text
              x={(cx(s0) + cx(s0 + 1)) / 2}
              y="44"
              textAnchor="middle"
              fontSize="15"
              fontWeight="800"
              fill={P.amber}
            >
              +1
            </text>
            <line
              x1={cx(s0)}
              y1="58"
              x2={cx(s0)}
              y2={rowY[0]}
              stroke={P.amber}
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <line
              x1={cx(s0 + 1)}
              y1="58"
              x2={cx(s0 + 1)}
              y2={rowY[0]}
              stroke={P.amber}
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
          </>
        )}
        <line
          x1="40"
          y1={line}
          x2="40"
          y2={line2 - 9}
          stroke={P.green}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <polygon
          points={`35,${line2 - 9} 40,${line2} 45,${line2 - 9}`}
          fill={P.green}
        />
        <text
          x="34"
          y={line + 6}
          textAnchor="end"
          fontSize="15"
          fontWeight="800"
          fill={P.green}
        >
          +10
        </text>
        <line
          x1="40"
          y1={line}
          x2={x0}
          y2={line}
          stroke={P.green}
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <line
          x1="40"
          y1={line2}
          x2={x0}
          y2={line2}
          stroke={P.green}
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
      </>,
      380,
      150,
      "Bảng 100 số: thêm 1 sang phải, thêm 10 xuống dưới",
    );
  }

  /* ── 11. THẺ CHẤM để so sánh (SGK tr.30, 31) ─────────────────────────────── */
  if (mode === "dotCards") {
    const l = num(left, 0);
    const r3 = num(right, 0);
    /** Slide bài học + KHÔNG có dấu in sẵn ⇒ bé tự bấm chọn dấu (bản tương tác). */
    if (interactive && !sign) {
      return <DotCardsCard left={l} right={r3} note={note} />;
    }
    return box(
      <>
        <rect
          x="20"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={l} x={20} y={16} w={104} h={104} />
        <Tile
          x="150"
          y="46"
          w={60}
          h={44}
          text={sign || "?"}
          fs={sign ? 26 : 24}
          fill={sign ? P.blueSoft : "#f8fafc"}
          stroke={sign ? P.blue : P.violet}
          color={sign ? P.blue : P.violet}
          dash={!sign}
        />
        <rect
          x="236"
          y="16"
          width="104"
          height="104"
          rx="12"
          fill="#ffffff"
          stroke={P.grid}
          strokeWidth="2"
        />
        <Pips n={r3} x={236} y={16} w={104} h={104} />
        <text
          x="180"
          y="140"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={P.soft}
        >
          Bé điền dấu &gt; , &lt; hoặc = vào ô giữa
        </text>
      </>,
      360,
      152,
      "Hai thẻ chấm để bé so sánh",
    );
  }

  /* ── 12. SO SÁNH THEO MẪU (SGK tr.25, 27, 42) ────────────────────────────── */
  if (mode === "comparePairs") {
    const ps = Array.isArray(pairs) ? pairs : [];
    /** Slide bài học ⇒ dùng bản TƯƠNG TÁC (bé bấm ô “?” rồi chọn dấu). */
    if (interactive && ps.length > 0) {
      return <ComparePairsCard pairs={ps} model={model} note={note} />;
    }
    const H = ps.length * 44 + 18;
    return box(
      <>
        {ps.map((p, i) => {
          const y = 10 + i * 44;
          const [l, r] = p;
          const isModel = i === 0 && !!model;
          const sig = isModel ? model : "";
          /**
           * 🔴 BỀ RỘNG DÙNG HẾT KHUNG, canh giữa hai bên. Bản cũ: hai thẻ 96 ở x=14 và x=174
           * rồi nhãn “mẫu” ở x=290 ⇒ nội dung dồn về TRÁI, dư hơn 90 đơn vị bên phải (người
           * dùng báo 2026-09-24: “sao không làm full và đều hai bên”).
           */
          const cardW = 104;
          return (
            <g key={i}>
              <rect
                x="22"
                y={y}
                width={cardW}
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={l} x={22} y={y} w={cardW} h={36} r={3.6} />
              <Tile
                x="140"
                y={y}
                w={44}
                h={36}
                text={isModel ? sig : "?"}
                fs={isModel ? 22 : 20}
                fill={isModel ? P.blueSoft : "#f8fafc"}
                stroke={isModel ? P.blue : P.violet}
                color={isModel ? P.blue : P.violet}
                dash={!isModel}
              />
              <rect
                x="196"
                y={y}
                width={cardW}
                height="36"
                rx="9"
                fill="#ffffff"
                stroke={P.grid}
                strokeWidth="2"
              />
              <Pips n={r} x={196} y={y} w={cardW} h={36} r={3.6} />
              <text
                x="308"
                y={y + 25}
                fontSize="14"
                fontWeight="700"
                fill={P.soft}
              >
                {isModel ? "mẫu" : ""}
              </text>
            </g>
          );
        })}
      </>,
      360,
      H,
      "Các cặp thẻ chấm để bé so sánh theo mẫu",
      10,
    );
  }

  // Không khớp kiểu nào — trả về khung rỗng thay vì làm sập slide.
  return box(
    <text x="180" y="30" textAnchor="middle" fontSize="14" fill={P.soft}>
      (chưa có hình cho kiểu này)
    </text>,
    360,
    44,
    "Chưa có hình",
  );
}

/** Thân toa tàu — tách riêng cho dễ đọc vòng lặp ở `numberTrain`. */
const Rect2 = ({ x, y, w, h }) => (
  <rect
    x={num(x)}
    y={num(y)}
    width={num(w)}
    height={num(h)}
    rx="6"
    fill="#ffffff"
    stroke="#475569"
    strokeWidth="1.8"
  />
);

export default NumberScene;
