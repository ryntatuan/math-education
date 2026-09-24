/**
 * MÊ CUNG SỐ — BÉ TỰ NỐI ĐƯỜNG (SGK Lớp 1 tr.25).
 *
 * 🔴 VÌ SAO CÓ FILE NÀY. Trước đây hình vẽ SẴN đường đúng (do máy tìm bằng BFS) ⇒ bé chỉ
 * ngồi nhìn, không phải làm gì. Người dùng yêu cầu (2026-09-25): “đây là 1 dạng luyện tập,
 * hãy để cho trẻ tự nối, nếu ô được chọn nối đúng nguyên tắc thì hiện màu xanh, nếu sai
 * thì hiện màu đỏ, không nhất thiết phải là đường ngắn nhất”.
 *
 * LUẬT CHƠI (đúng như người dùng mô tả):
 *   1. Ô được nối phải NẰM KẾ BÊN ô vừa nối — trên, dưới, trái hoặc phải (không đi chéo).
 *   2. Ô đó phải THOẢ ĐỀ BÀI (ví dụ: số lớn hơn 4).
 *   Đúng cả hai ⇒ ô XANH và được nối vào đường. Sai ⇒ ô ĐỎ, không nối vào đường, bé bấm lại.
 *   KHÔNG bắt buộc đường ngắn nhất — đi vòng mà vẫn đúng luật tới được nhà là xong.
 *
 * Dùng chung cho cả SLIDE BÀI HỌC (`Grade1NumberVisuals` → `numberMaze`) và phần LUYỆN TẬP.
 */

import { useState } from "react";

import fireConfetti from "../../utils/confettiHelper";
import soundManager from "../../utils/soundManager";
import { CARD_STYLE, CAPTION_STYLE, svgFit } from "./visualTheme";

/** Bảng màu sao chép từ `Grade1NumberVisuals` (giữ nguyên mã màu để hình khớp nhau). */
const M = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  green: "#059669",
  greenSoft: "#d1fae5",
  red: "#e11d48",
  redSoft: "#ffe4e6",
  paper: "#ffffff",
};

const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

/** Ô này có thoả đề bài không? `rule = { op: ">", value: 4 }` ⇒ số > 4. */
export function cellFitsRule(value, rule) {
  const op = (rule && rule.op) || ">";
  const k = num(rule && rule.value, 0);
  const v = num(value, NaN);
  if (Number.isNaN(v)) return false;
  if (op === ">") return v > k;
  if (op === "<") return v < k;
  if (op === "=") return v === k;
  return true;
}

/** Lời đề bài cho bé đọc, suy ra từ `rule`. */
export const ruleText = (rule) => {
  const op = (rule && rule.op) || ">";
  const k = num(rule && rule.value, 0);
  return op === "<"
    ? `nhỏ hơn ${k}`
    : op === "="
      ? `bằng ${k}`
      : `lớn hơn ${k}`;
};

const sameCell = (a, b) => a[0] === b[0] && a[1] === b[1];

/**
 * @param grid    lưới số, `grid[hàng][cột]`
 * @param rule    `{ op, value }` — điều kiện để một ô được nối
 * @param onDone  gọi MỘT lần khi bé nối tới đích (dùng cho phần Luyện tập để tính điểm)
 */
export function MazePath({
  grid = [],
  rule = { op: ">", value: 4 },
  note = "",
  onDone,
}) {
  const g = Array.isArray(grid) ? grid : [];
  const rows = g.length;
  const cols = g[0] ? g[0].length : 0;
  const goal = [rows - 1, cols - 1];

  /** Đường bé đã nối — luôn bắt đầu từ ô của TRƯỜNG (góc trên-trái). */
  const [path, setPath] = useState([[0, 0]]);
  /** Ô bé vừa bấm SAI (tô đỏ) và câu nhắc tương ứng. */
  const [wrong, setWrong] = useState(null);
  const [msg, setMsg] = useState(
    "Bé bấm ô NGAY CẠNH 🏫 để bắt đầu nối đường về nhà. Bấm lại một ô xanh để bỏ từ ô đó về sau.",
  );
  const [solved, setSolved] = useState(false);

  if (!rows || !cols) return null;

  const cw = 44;
  const chh = 42;
  const x0 = Math.round((360 - cols * cw) / 2);
  /**
   * `y0` = 54 (không phải 46): icon 🏫 cao 30 đơn vị nên phải chừa chỗ cho nó
   * KHÔNG đè lên dòng hướng dẫn ở y=14. Người dùng yêu cầu icon to cho dễ nhìn
   * (2026-09-25) — phóng to xong thì icon chồng lên chữ, hạ bảng xuống 8 đơn vị là hết.
   */
  const y0 = 60;
  const H = y0 + rows * chh + 44;
  const cx = (ci) => x0 + ci * cw + (cw - 4) / 2;
  const cy = (ri) => y0 + ri * chh + (chh - 4) / 2;
  /** Ô này đã nằm trong đường bé nối chưa (dùng ở phần vẽ để tô xanh). */
  const inPath = (ri, ci) => path.some(([r, c]) => r === ri && c === ci);

  const pick = (ri, ci) => {
    const value = num(g[ri][ci], 0);

    /**
     * 🔴 BẤM LẠI MỘT Ô ĐANG XANH = BỎ TỪ Ô ĐÓ VỀ SAU. Người dùng yêu cầu 2026-09-25:
     * “khi chọn sai đường thì không có cách nào đi lại… nếu tôi bấm lại vào ô 6 thì sẽ mất
     * ô 6 và ô 8, đường về nhà dừng lại ở ô 5 trước đó, sau đó tôi có thể bấm tiếp 6 và 5”.
     * Trước đây bấm vào ô đã nối bị coi là SAI ⇒ tô ĐỎ và bé bị KẸT, không đi lại được.
     */
    const daNoi = path.findIndex(([r, c]) => r === ri && c === ci);
    if (daNoi >= 0) {
      if (daNoi === 0) {
        setMsg("Đây là ô xuất phát 🏫 — bé bấm ô ngay cạnh để nối tiếp.");
        return;
      }
      setPath(path.slice(0, daNoi));
      setWrong(null);
      setSolved(false);
      setMsg(
        `Bé đã bỏ ô ${value} và các ô sau nó. Nối lại đường khác rồi về nhà nhé.`,
      );
      return;
    }
    if (solved) return;
    const [lr, lc] = path[path.length - 1];
    if (Math.abs(ri - lr) + Math.abs(ci - lc) !== 1) {
      setWrong([ri, ci]);
      setMsg(
        "Ô này KHÔNG nằm ngay cạnh ô bé vừa nối. Chỉ nối được ô ở trên, dưới, trái hoặc phải.",
      );
      return;
    }
    if (!cellFitsRule(value, rule)) {
      setWrong([ri, ci]);
      setMsg(
        `Ô số ${value} không ${ruleText(rule)} nên không được nối. Bé tìm ô khác nhé.`,
      );
      return;
    }

    const next = [...path, [ri, ci]];
    setPath(next);
    setWrong(null);
    if (sameCell([ri, ci], goal)) {
      setSolved(true);
      setMsg("🎉 Bé nối được đường về nhà rồi! Đường của bé đúng luật.");
      /**
       * CHÚC MỪNG y như các câu hỏi khác (người dùng yêu cầu 2026-09-25: "thêm hiệu ứng
       * chúc mừng hoặc âm thanh khi bé nối đường về nhà thành công"). `playFanfare`
       * cũng rung máy trên điện thoại và tự tôn trọng cài đặt tắt âm của app;
       * `fireConfetti` là pháo giấy app đang dùng ở Luyện tập / Nhiệm vụ / kết quả bài.
       */
      soundManager.playFanfare();
      fireConfetti({ particleCount: 120, spread: 85, origin: { y: 0.6 } });
      if (typeof onDone === "function") onDone(next.length);
    } else {
      setMsg("Đúng rồi! Bé nối tiếp ô kế bên.");
    }
  };

  const undo = () => {
    if (path.length <= 1) return;
    setPath(path.slice(0, -1));
    setWrong(null);
    /** Bỏ ô cuối cả khi đã về tới nhà ⇒ phải mở lại trạng thái “chưa xong”. */
    setSolved(false);
    setMsg("Bé đã bỏ ô cuối — nối lại nhé.");
  };

  const reset = () => {
    setPath([[0, 0]]);
    setWrong(null);
    setSolved(false);
    setMsg(
      "Bé bấm ô NGAY CẠNH 🏫 để bắt đầu nối đường về nhà. Bấm lại một ô xanh để bỏ từ ô đó về sau.",
    );
  };

  const btn = (label, onClick, disabled) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        minHeight: 44,
        padding: "0 14px",
        fontSize: 13,
        fontWeight: 800,
        borderRadius: 12,
        border: "2px solid #7c3aed",
        background: disabled ? "#f1f5f9" : "#ede9fe",
        color: disabled ? "#94a3b8" : "#5b21b6",
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={CARD_STYLE}>
      <svg
        viewBox={`0 0 360 ${H}`}
        {...svgFit(360)}
        role="img"
        aria-label={`Mê cung số — bé tự nối đường từ trường về nhà, chỉ nối ô ${ruleText(rule)}`}
      >
        <text
          x="180"
          y="14"
          textAnchor="middle"
          fontSize="13"
          fontWeight="800"
          fill={M.soft}
        >
          Bé nối đường từ trường về nhà, chỉ nối ô có số {ruleText(rule)}
        </text>
        <text x={cx(0)} y={y0 - 10} textAnchor="middle" fontSize="30">
          🏫
        </text>
        <text
          x={cx(cols - 1)}
          y={y0 + rows * chh + 36}
          textAnchor="middle"
          fontSize="30"
        >
          🏠
        </text>
        {g.map((row, ri) =>
          row.map((v, ci) => {
            const laSai = !!wrong && sameCell(wrong, [ri, ci]);
            const daNoi = inPath(ri, ci);
            const fill = laSai ? M.redSoft : daNoi ? M.greenSoft : M.paper;
            const stroke = laSai ? M.red : daNoi ? M.green : M.grid;
            return (
              <g
                key={`${ri}-${ci}`}
                onClick={() => pick(ri, ci)}
                style={{ cursor: solved ? "default" : "pointer" }}
              >
                <rect
                  x={x0 + ci * cw}
                  y={y0 + ri * chh}
                  width={cw - 4}
                  height={chh - 4}
                  rx={8}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="2"
                />
                <text
                  x={x0 + ci * cw + (cw - 4) / 2}
                  y={y0 + ri * chh + (chh - 4) / 2 + 6}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill={laSai ? M.red : daNoi ? M.green : M.ink}
                >
                  {String(num(v, 0))}
                </text>
                {/* Ô BẤM VÔ HÌNH phủ kín cả khe 4px giữa hai ô: bé bấm lệch ra
                    rìa ô vẫn ăn, không còn vùng chết nào. */}
                <rect
                  x={x0 + ci * cw}
                  y={y0 + ri * chh}
                  width={cw}
                  height={chh}
                  fill="none"
                  pointerEvents="all"
                />
              </g>
            );
          }),
        )}
        {path.length > 1 && (
          <polyline
            points={path.map(([ri, ci]) => `${cx(ci)},${cy(ri)}`).join(" ")}
            fill="none"
            stroke={M.green}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            /* Đường nối vẽ ĐÈ LÊN các ô và dày 14px — nếu không tắt bắt sự kiện
               thì nó nuốt cú bấm, bé phải tránh đường mới bấm được ô. */
            pointerEvents="none"
          />
        )}
      </svg>
      {note && (
        <span style={{ ...CAPTION_STYLE, color: M.ink, fontSize: 15 }}>
          {note}
        </span>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: solved ? M.green : M.soft,
            flexBasis: "100%",
            textAlign: "center",
          }}
        >
          {msg}
        </span>
        <span style={{ fontWeight: 800, fontSize: 14, color: "#0369a1" }}>
          Đã nối: {path.length} ô
        </span>
        {btn("Bỏ ô cuối", undo, path.length <= 1)}
        {btn("Làm lại", reset, false)}
      </div>
    </div>
  );
}
