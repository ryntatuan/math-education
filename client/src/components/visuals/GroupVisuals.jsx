/**
 * BỘ HÌNH "NHÓM – PHẦN – GỘP/ BỚT" cho Lớp 1–4 (khoá `groupScene`).
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (lỗi người dùng phát hiện, ảnh chụp màn hình):
 *   `tenFrame` là KHUNG 10 Ô — chỉ đúng khi bản thân khung là nội dung bài (đếm cho đủ 10).
 *   Nhưng nó bị dùng cho những ý KHÁC HẲN, và hình vẽ RA SAI so với lời của bài:
 *     • "7 con cua, mỗi con 2 càng: 2 × 7 = 14 (cái càng)" → hình vẽ **10 con cua + 4 con cua**
 *       ⇒ bé hiểu là 14 CON CUA, hoàn toàn sai (đúng: 7 con, mỗi con 2 càng).
 *     • "3 khay, mỗi khay 2 quả" → hình vẽ **6 ô rời** ⇒ bé hiểu là 6 khay 1 quả.
 *     • "6 + 7: gộp đủ 10 rồi còn 3" → khung vẽ 10 ô CÙNG MỘT MÀU ⇒ không thấy 6 + 4 = 10.
 *   Kết luận: KHÔNG ép mọi phép toán vào khung. Mỗi ý dạy một hình đúng với ý đó:
 *     `sumGroups` (gộp mấy nhóm) · `takeAway` (bớt đi) · `makeTen` (gộp cho đủ 10)
 *     `equalGroups` (các nhóm BẰNG NHAU: khay, hộp, hoặc vật có nhiều phần: càng, cánh, bánh xe)
 *     `unknownGroups` (biết tổng + mỗi nhóm, tìm số nhóm).
 *
 * QUY TẮC CHUNG (giống các bộ vẽ khác — xem `docs/lesson_visuals_plan.md` §3):
 *   • viewBox rộng ≤ 380 · chữ ≥ 14 đơn vị · KHÔNG `minWidth` · ép số bằng `num()`.
 *   • Đáp án KHÔNG in lên hình nếu câu hỏi bắt bé tự tìm (trừ khi đặt `showResult`).
 */

import {
  CARD_STYLE,
  CAPTION_STYLE,
  svgFit,
  ACCENT,
  ACCENT_SOFT,
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
  green: "#059669",
  greenSoft: "#d1fae5",
  violet: "#7c3aed",
  violetSoft: "#ede9fe",
  paper: "#ffffff",
};

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);
const card = CARD_STYLE;
const caption = CAPTION_STYLE;

const Txt = ({
  x,
  y,
  s = 14,
  w = 700,
  fill = P.ink,
  anchor = "middle",
  children,
}) => (
  <text
    x={num(x)}
    y={num(y)}
    textAnchor={anchor}
    fontSize={s}
    fontWeight={w}
    fill={fill}
  >
    {children}
  </text>
);

const Em = ({ x, y, s = 18, ch, opacity = 1 }) => (
  <text
    x={num(x)}
    y={num(y)}
    textAnchor="middle"
    fontSize={s}
    opacity={opacity}
  >
    {ch}
  </text>
);

/**
 * Chữ thích dưới hình — TỰ THU NHỎ để không tràn khỏi viewBox.
 * Đo được: chữ thích dài 40 ký tự ở cỡ 15 rộng ~370 đơn vị > 360 ⇒ tràn ra hai bên.
 */
const Caption = ({ y, children, base = 15, fill = P.ink, maxW = 348 }) => {
  const s = String(children ?? "");
  if (s === "") return null;
  const size = Math.max(
    10,
    Math.min(base, Math.floor(maxW / (0.56 * s.length))),
  );
  return (
    <Txt x={180} y={y} s={size} fill={fill}>
      {s}
    </Txt>
  );
};

/** Một cái khay / đĩa / hộp rỗng. */
const Tray = ({ x, y, w, h, label = "", dash = false, fill = "#f8fafc" }) => (
  <g>
    <rect
      x={num(x)}
      y={num(y)}
      width={num(w)}
      height={num(h)}
      rx={10}
      fill={fill}
      stroke="#94a3b8"
      strokeWidth="2"
      strokeDasharray={dash ? "5 4" : undefined}
    />
    {label !== "" && (
      <Txt
        x={num(x) + num(w) / 2}
        y={num(y) + num(h) / 2 + 6}
        s={18}
        fill={P.blue}
      >
        {label}
      </Txt>
    )}
  </g>
);

/** Một "vật có nhiều phần" — phần được vẽ RÕ để bé đếm được (càng, cánh, bánh xe, bút trong hộp). */
const PartObject = ({ x, y, kind = "claw", k = 2, scale = 1 }) => {
  const s = scale;
  const body = (
    <ellipse
      cx={x}
      cy={y}
      rx={13 * s}
      ry={10 * s}
      fill="#cbd5e1"
      stroke="#475569"
      strokeWidth="1.8"
    />
  );
  const parts = [];
  if (kind === "claw") {
    parts.push(
      <ellipse
        key="l"
        cx={x - 17 * s}
        cy={y - 8 * s}
        rx={6 * s}
        ry={4 * s}
        fill="#f97316"
        stroke="#c2410c"
        strokeWidth="1.4"
      />,
      <ellipse
        key="r"
        cx={x + 17 * s}
        cy={y - 8 * s}
        rx={6 * s}
        ry={4 * s}
        fill="#f97316"
        stroke="#c2410c"
        strokeWidth="1.4"
      />,
      <circle key="a" cx={x} cy={y - 12 * s} r={3.5 * s} fill="#475569" />,
    );
  } else if (kind === "wing") {
    parts.push(
      <ellipse
        key="l"
        cx={x - 12 * s}
        cy={y - 3 * s}
        rx={9 * s}
        ry={6 * s}
        fill="#93c5fd"
        stroke="#2563eb"
        strokeWidth="1.4"
        transform={`rotate(-20 ${x - 12 * s} ${y - 3 * s})`}
      />,
      <ellipse
        key="r"
        cx={x + 12 * s}
        cy={y - 3 * s}
        rx={9 * s}
        ry={6 * s}
        fill="#93c5fd"
        stroke="#2563eb"
        strokeWidth="1.4"
        transform={`rotate(20 ${x + 12 * s} ${y - 3 * s})`}
      />,
      <circle
        key="h"
        cx={x}
        cy={y - 11 * s}
        r={4.5 * s}
        fill="#94a3b8"
        stroke="#475569"
        strokeWidth="1.3"
      />,
    );
  } else if (kind === "wheel") {
    // Vẽ ĐÚNG số bánh của xe (3 bánh: 1 trên + 2 dưới; 4 bánh: 2 trên + 2 dưới).
    const soBanh = Math.max(1, Math.min(num(k, 3), 8));
    const duoi = Math.ceil(soBanh / 2);
    const tren = soBanh - duoi;
    const row = (count, cy, tag) =>
      Array.from({ length: count }, (_, i) => {
        const cx = count === 1 ? x : x - 14 * s + (i * 28 * s) / (count - 1);
        return (
          <circle
            key={`w-${tag}-${i}`}
            cx={cx}
            cy={cy}
            r={5.5 * s}
            fill="#fff"
            stroke="#1e293b"
            strokeWidth="2"
          />
        );
      });
    parts.push(
      <line
        key="f1"
        x1={x - 14 * s}
        y1={y}
        x2={x + 14 * s}
        y2={y}
        stroke="#475569"
        strokeWidth="2.6"
      />,
      <line
        key="f2"
        x1={x - 6 * s}
        y1={y}
        x2={x - 12 * s}
        y2={y - 12 * s}
        stroke="#475569"
        strokeWidth="2.6"
      />,
      ...row(duoi, y + 2 * s, "d"),
      ...row(tren, y - 14 * s, "t"),
    );
  } else {
    // "box": hộp có k chiếc bút chì
    parts.push(
      <rect
        key="b"
        x={x - 15 * s}
        y={y - 8 * s}
        width={30 * s}
        height={20 * s}
        rx={3}
        fill="#fde68a"
        stroke="#b45309"
        strokeWidth="1.8"
      />,
      ...Array.from({ length: Math.max(1, Math.min(k, 8)) }, (_, i) => (
        <line
          key={`p${i}`}
          x1={
            x - 11 * s + (i * (22 * s)) / Math.max(1, Math.min(k, 8) - 1 || 1)
          }
          y1={y - 6 * s}
          x2={
            x - 11 * s + (i * (22 * s)) / Math.max(1, Math.min(k, 8) - 1 || 1)
          }
          y2={y - 16 * s}
          stroke={
            [
              "#ef4444",
              "#22c55e",
              "#3b82f6",
              "#eab308",
              "#a855f7",
              "#f97316",
              "#14b8a6",
              "#ec4899",
            ][i % 8]
          }
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      )),
    );
  }
  return (
    <g>
      {body}
      {parts}
    </g>
  );
};

export function GroupScene({
  mode = "",
  note = "",
  // sumGroups
  groups = [],
  result = 0,
  showResult = true,
  // takeAway
  emoji = "🍬",
  total = 6,
  remove = 2,
  showLeft = false,
  // makeTen
  a = 9,
  b = 1,
  c = 3,
  eq = "",
  // equalGroups
  kind = "trays",
  n = 3,
  k = 2,
  partKind = "claw",
  hidePerGroup = false,
  pile = 0,
  captionText = "",
  // unknownGroups
  per = 5,
  // partKind "wheel" có thể là MẢNG số bánh mỗi xe
  wheels = [3, 3, 3],
}) {
  const box = (children, w, h, label) => (
    <div style={card}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        {...svgFit(w)}
        role="img"
        aria-label={label}
      >
        {children}
      </svg>
      {note && (
        <span style={{ ...caption, color: P.ink, fontSize: 15 }}>{note}</span>
      )}
    </div>
  );

  /* ── 1. GỘP MẤY NHÓM (3 quả + 2 quả = 5 quả) ────────────────────────────── */
  if (mode === "sumGroups") {
    const gs = groups.map((g) => ({
      ch: g.emoji || "⚽",
      n: Math.max(0, num(g.n, 0)),
    }));
    const per = 5;
    const cellW = 30;
    const wNhom = gs.map((g) => Math.max(1, Math.min(g.n, per)) * cellW + 12);
    // Tính TRƯỚC vị trí từng nhóm. (Bản đầu cộng dồn một biến `x` ngay trong lúc render
    // — chạy được nhưng rất dễ vỡ khi sửa thứ tự, nên đổi thành mảng vị trí.)
    const xs = [];
    let cur = 0;
    gs.forEach((g, i) => {
      xs.push(cur);
      cur += wNhom[i] + 30;
    });
    const wTong = cur + (showResult ? 74 : 20);
    const H = 96;
    const lech = Math.max(6, (360 - wTong) / 2);
    return box(
      <>
        {gs.map((g, i) => {
          const w = wNhom[i];
          const x = lech + xs[i];
          const inner = w - 12;
          const cots = Math.max(1, Math.min(g.n, per));
          return (
            <g key={i}>
              <rect
                x={x}
                y={12}
                width={w}
                height={62}
                rx={10}
                fill="#f8fafc"
                stroke={P.grid}
                strokeWidth="2"
              />
              {Array.from({ length: g.n }, (_, j) => (
                <Em
                  key={j}
                  x={x + 12 + (j % cots) * (inner / cots) + inner / cots / 2}
                  y={12 + 34 + Math.floor(j / cots) * 22}
                  ch={g.ch}
                  s="17"
                />
              ))}
              {i < gs.length - 1 && (
                <Txt x={x + w + 15} y={54} s={22} fill={P.soft}>
                  +
                </Txt>
              )}
            </g>
          );
        })}
        {showResult && (
          <g>
            <rect
              x={lech + cur - 10}
              y={26}
              width={72}
              height={34}
              rx={9}
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="2"
            />
            <Txt x={lech + cur + 26} y={50} s={18} fill="#065f46">
              {result > 0 ? `= ${num(result, 0)}` : "= ?"}
            </Txt>
          </g>
        )}
      </>,
      360,
      H,
      "Gộp các nhóm lại",
    );
  }

  /* ── 2. BỚT ĐI (6 cái kẹo bớt 2 còn 4) ───────────────────────────────────── */
  if (mode === "takeAway") {
    const t = Math.max(1, Math.min(num(total, 6), 10));
    const r = Math.min(Math.max(0, num(remove, 0)), t);
    const per = 5;
    const cell = 46;
    const rows = Math.ceil(t / per);
    const H = rows * 62 + 44;
    return box(
      <>
        {Array.from({ length: t }, (_, i) => {
          /** 🔴 Canh giữa dãy: bản cũ bắt đầu ở x = 40 ⇒ lệch trái 22, dư phải 60. */
          const lech = 180 - ((Math.min(t, per) - 1) * cell) / 2;
          const cx = lech + (i % per) * cell;
          const cy = 46 + Math.floor(i / per) * 62;
          const biBot = i >= t - r;
          return (
            <g key={i}>
              <Em x={cx} y={cy} ch={emoji} s="26" opacity={biBot ? 0.35 : 1} />
              {biBot && (
                <>
                  <line
                    x1={cx - 13}
                    y1={cy - 20}
                    x2={cx + 13}
                    y2={cy + 4}
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line
                    x1={cx + 13}
                    y1={cy - 20}
                    x2={cx - 13}
                    y2={cy + 4}
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>
          );
        })}
        <Txt x={180} y={H - 14} s={14} fill={P.soft}>
          {`Bớt đi ${r} — bé đếm xem còn lại mấy?`}
        </Txt>
        {showLeft && (
          <g>
            <rect
              x={296}
              y={H - 44}
              width={58}
              height={30}
              rx={8}
              fill={P.greenSoft}
              stroke={P.green}
              strokeWidth="2"
            />
            <Txt x={325} y={H - 22} s={17} fill="#065f46">
              {`= ${t - r}`}
            </Txt>
          </g>
        )}
      </>,
      360,
      H,
      "Bớt đi để tìm số còn lại",
    );
  }

  /* ── 3. GỘP CHO ĐỦ 10 (9 + 4 = 9 + 1 + 3) ───────────────────────────────── */
  if (mode === "makeTen") {
    const A = Math.max(0, Math.min(num(a, 9), 10));
    const B = Math.max(0, Math.min(num(b, 10 - A), 10 - A));
    const C = Math.max(0, num(c, 0));
    const cell = 30;
    const o = cell - 4;
    const xKhung = (360 - (10 * cell - 4)) / 2;
    const yKhung = 40;
    const yTach = 140;
    const nTach = B + C;
    const xTach = (360 - (nTach * cell - 4)) / 2;
    const H = 258;
    return box(
      <>
        {/* Khung 10 ô: phần ĐÃ CÓ (xanh) + phần THÊM CHO ĐỦ 10 (cam) — hai màu KHÁC nhau */}
        {Array.from({ length: 10 }, (_, i) => {
          const x = xKhung + i * cell;
          const laA = i < A;
          const laB = i >= A && i < A + B;
          return (
            <g key={i}>
              <rect
                x={x}
                y={yKhung}
                width={o}
                height={o}
                rx={6}
                fill={laA ? P.blueSoft : laB ? P.amberSoft : "#f8fafc"}
                stroke={laA ? P.blue : laB ? P.amber : P.grid}
                strokeWidth="2"
                strokeDasharray={laB ? "4 3" : undefined}
              />
              {(laA || laB) && (
                <circle
                  cx={x + o / 2}
                  cy={yKhung + o / 2}
                  r="6.5"
                  fill={laA ? P.blue : P.amber}
                />
              )}
            </g>
          );
        })}
        <Txt x={xKhung + (A * cell) / 2 - 2} y={92} s={14} fill={P.blue}>
          {`${A} đã có`}
        </Txt>
        {B > 0 && (
          <Txt
            x={Math.min(330, xKhung + (A + B / 2) * cell - 2)}
            y={92}
            s={14}
            fill="#92400e"
          >
            {`thêm ${B}`}
          </Txt>
        )}
        <Txt x={180} y={24} s={14} fill={P.soft}>
          {`Gộp cho đủ 10 ô`}
        </Txt>
        {/* ── TÁCH SỐ HẠNG THỨ HAI: (B + C) tách thành B và C ──────────────────
         * Trẻ phải THẤY 4 và 3 cùng nằm trong một số 7: hai phần vẽ LIỀN NHAU bằng
         * CÙNG một loại ô (chỉ khác màu), có câu “7 tách thành 4 và 3” ở trên và số
         * 4 · 3 ngay dưới từng phần. Bản cũ vẽ phần 3 thành một HỘP RỜI nên trẻ
         * không hiểu 4 và 3 ở đâu ra (người dùng báo 2026-09-24).
         */}
        <Txt x={180} y={122} s={14} fill={P.ink}>
          {C > 0
            ? `${nTach} tách thành ${B} và ${C}`
            : `${nTach} thêm cho đủ 10`}
        </Txt>
        {Array.from({ length: nTach }, (_, i) => {
          const x = xTach + i * cell;
          const laB = i < B;
          return (
            <g key={`t${i}`}>
              <rect
                x={x}
                y={yTach}
                width={o}
                height={o}
                rx={6}
                fill={laB ? P.amberSoft : P.greenSoft}
                stroke={laB ? P.amber : P.green}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle
                cx={x + o / 2}
                cy={yTach + o / 2}
                r="6.5"
                fill={laB ? P.amber : P.green}
              />
            </g>
          );
        })}
        <Txt x={xTach + (B * cell) / 2 - 2} y={192} s={14} fill="#92400e">
          {String(B)}
        </Txt>
        {C > 0 && (
          <Txt
            x={Math.min(340, xTach + (B + C / 2) * cell - 2)}
            y={192}
            s={14}
            fill="#065f46"
          >
            {String(C)}
          </Txt>
        )}
        <Txt x={180} y={222} s={15} fill={P.ink}>
          {eq || `${A} + ${B} = 10`}
        </Txt>
        <Txt x={180} y={246} s={15} fill={P.ink}>
          {C > 0 ? `10 + ${C} = ${10 + C}` : ""}
        </Txt>
      </>,
      360,
      H,
      "Gộp cho đủ 10 rồi cộng phần còn lại",
    );
  }

  /* ── 4. CÁC NHÓM BẰNG NHAU (khay / vật có nhiều phần) ────────────────────── */
  if (mode === "equalGroups") {
    const N = Math.max(1, Math.min(num(n, 3), 8));
    const K = Math.max(1, Math.min(num(k, 2), 8));
    if (kind === "parts") {
      // Vật lặp lại, mỗi vật có K phần nhìn thấy được (càng / cánh / bánh xe / bút trong hộp)
      const perRow = N > 3 ? 3 : N;
      const cellW = 96;
      const rows = Math.ceil(N / perRow);
      const H = rows * 92 + 52;
      const lech = (360 - perRow * cellW) / 2;
      return box(
        <>
          {Array.from({ length: N }, (_, i) => {
            const cx = lech + (i % perRow) * cellW + cellW / 2;
            const cy = 52 + Math.floor(i / perRow) * 92;
            const soPhan = partKind === "wheel" ? num((wheels || [])[i], 3) : K;
            return (
              <g key={i}>
                <PartObject x={cx} y={cy} kind={partKind} k={soPhan} />
                <Txt x={cx} y={cy + 34} s={14} fill={P.soft}>
                  {`${soPhan} ${partKind === "wheel" ? "bánh" : partKind === "wing" ? "cánh" : partKind === "claw" ? "càng" : "phần"}`}
                </Txt>
              </g>
            );
          })}
          <Caption y={H - 20}>{captionText}</Caption>
        </>,
        360,
        H,
        "Các vật có nhiều phần bằng nhau",
      );
    }
    // kind === "trays": N khay, mỗi khay K vật (hoặc "?" nếu hidePerGroup)
    const perRow = N > 4 ? 3 : N;
    // Bề rộng mỗi khay PHẢI co lại theo số khay một hàng — 4 khay × 104 = 416 > 360
    // viewBox ⇒ hình tràn ra ngoài (đo được 27 px mỗi bên).
    const cellW = Math.min(104, Math.floor(344 / perRow));
    const rows = Math.ceil(N / perRow);
    /**
     * 🔴 ĐỐNG KHÔNG ĐƯỢC CẮT BỚT. Bản cũ vẽ `Math.min(pile, 10)` ⇒ bài “Có 35 quả cam
     * chia đều vào 7 đĩa” chỉ hiện **10 quả**: trẻ đếm ra 10, hình nói khác lời bài.
     * Cùng họ với lỗi “im lặng kẹp số” đã gặp ở `tenFrame`. Nay vẽ ĐỦ, 12 món một hàng.
     */
    const perPileRow = 12;
    const soHangDong = pile > 0 ? Math.ceil(pile / perPileRow) : 0;
    const yDong = rows * 96 + 14;
    /** 🔴 Canh giữa dãy đống theo BỀ RỘNG THẬT của nó (không bắt đầu ở x = 26 nữa). */
    const x0Dong = (360 - ((Math.min(pile, perPileRow) - 1) * 27 + 16)) / 2 + 8;
    const H = rows * 96 + (pile > 0 ? 14 + soHangDong * 24 + 24 : 44);
    const lech = (360 - perRow * cellW) / 2;
    return box(
      <>
        {Array.from({ length: N }, (_, i) => {
          const x = lech + (i % perRow) * cellW;
          const y = 12 + Math.floor(i / perRow) * 96;
          return (
            <g key={i}>
              <Tray
                x={x}
                y={y}
                w={cellW - 14}
                h={78}
                label={hidePerGroup ? "?" : ""}
                dash={hidePerGroup}
              />
              {!hidePerGroup &&
                Array.from({ length: K }, (_, j) => (
                  <Em
                    key={j}
                    x={x + 16 + (j % 2) * 34 + 10}
                    y={y + 30 + Math.floor(j / 2) * 28}
                    ch={emoji}
                    s="22"
                  />
                ))}
            </g>
          );
        })}
        {pile > 0 && (
          <g>
            {Array.from({ length: pile }, (_, j) => (
              <Em
                key={j}
                x={x0Dong + (j % perPileRow) * 27}
                y={yDong + Math.floor(j / perPileRow) * 24}
                ch={emoji}
                s="16"
              />
            ))}
            <Caption y={H - 10} base={14} fill={P.soft}>
              {`Có ${pile} ${captionText || ""}`}
            </Caption>
          </g>
        )}
        {pile === 0 && <Caption y={H - 14}>{captionText}</Caption>}
      </>,
      360,
      H,
      "Các khay có số lượng bằng nhau",
    );
  }

  /* ── 5. BIẾT TỔNG VÀ MỖI NHÓM — TÌM SỐ NHÓM ─────────────────────────────── */
  if (mode === "unknownGroups") {
    const K = Math.max(1, Math.min(num(per, 5), 8));
    return box(
      <>
        {/* 🔴 Cả khối dịch phải 19 đơn vị để lề hai bên đều nhau (đo được trước đó: 16 / 54). */}
        <g transform="translate(19,0)">
          <rect
            x={16}
            y={26}
            width={120}
            height={72}
            rx={10}
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          {Array.from({ length: K }, (_, j) => (
            <Em
              key={j}
              x={34 + (j % 4) * 28}
              y={58 + Math.floor(j / 4) * 26}
              ch={emoji}
              s="20"
            />
          ))}
          <Txt x={76} y={114} s={14} fill={P.soft}>
            {`mỗi nhóm ${K}`}
          </Txt>
          <Txt x={160} y={72} s={22} fill={P.soft}>
            …
          </Txt>
          <Tray x={196} y={26} w={110} h={72} label="?" dash />
          <Txt x={251} y={114} s={14} fill={P.soft}>
            mấy nhóm?
          </Txt>
          <rect
            x={80}
            y={132}
            width={200}
            height={34}
            rx={9}
            style={{ fill: ACCENT_SOFT, stroke: ACCENT }}
            strokeWidth="2"
          />
          <Caption y={155} maxW={184} fill={P.ink}>
            {captionText}
          </Caption>
        </g>
      </>,
      360,
      178,
      "Tìm số nhóm khi biết tổng",
    );
  }

  // Không khớp kiểu nào — khung rỗng thay vì làm sập slide
  return box(
    <Txt x={180} y={30} s={14} fill={P.soft}>
      (chưa có hình cho kiểu này)
    </Txt>,
    360,
    44,
    "Chưa có hình",
  );
}

export default GroupScene;
