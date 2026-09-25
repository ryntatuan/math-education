/**
 * BẢNG TÍNH — BẢNG CÓ Ô TRỐNG BÉ ĐIỀN ĐƯỢC (slide bài học + Luyện tập).
 *
 * 🔴 VÌ SAO CÓ FILE NÀY (yêu cầu người dùng 2026-09-25):
 *   “tất cả các dạng bài có điền vào ô trống KHÔNG được là slide tĩnh và đều có thể điền
 *    đáp án vào được; đảm bảo tất cả các dạng bài tập đều có đáp án để trẻ lựa chọn và
 *    tương tác”.
 *   Bản đầu tôi làm dang dạng `table` (bảng chỉ để NHÌN, ô `?` in cứng) — trẻ không bấm được
 *   gì. Nay dùng đúng bộ máy tương tác có sẵn (`useFillSlots` + `slotLook` + `FillBar`):
 *   bé bấm ô `?`, chọn số ở dải nút, app chấm NGAY (đúng → ô xanh, sai → ô đỏ, thử lại được),
 *   có đếm tiến độ và nút “Làm lại”.
 *
 * ⚠️ LUẬT REACT: `useFillSlots` PHẢI gọi ở đầu component, không gọi trong nhánh `if`
 * (xem ghi chú đầu `interactiveFill.jsx`).
 *
 * ⚠️ HỢP ĐỒNG DỮ LIỆU (có công cụ soát `scratch/soat-o-trong.mjs`):
 *   `rows`     — mảng các hàng; ô có giá trị = IN SẴN, ô `null` = Ô TRỐNG cần bé điền.
 *   `answers`  — đáp án của TỪNG ô trống, theo thứ tự đọc (trái → phải, trên → dưới).
 *                `answers.length` PHẢI bằng số ô `null` (sai số lượng thì bảng tự về dạng
 *                tĩnh để không sập, và công cụ soát sẽ báo lỗi dữ liệu).
 */

import { useEffect, useState } from "react";

import {
  useFillSlots,
  slotLook,
  FillBar,
  useInteractive,
} from "./interactiveFill";
import { CARD_STYLE, CAPTION_STYLE, svgFit, ngatDong } from "./visualTheme";

const P = {
  ink: "#1e293b",
  soft: "#64748b",
  grid: "#e2e8f0",
  violet: "#7c3aed",
  paper: "#ffffff",
  head: "#4c1d95",
  headSoft: "#ede9fe",
};

const card = CARD_STYLE;
const caption = CAPTION_STYLE;
const num = (v, fb) => (Number.isFinite(Number(v)) ? Number(v) : fb);

export function BangTinh({
  headers = ["Phép tính", "Kết quả"],
  rows = [],
  answers = [],
  options = [],
  label = "",
  title = "Bé chọn số điền vào ô ?",
  hint = "Ô viền đứt là chỗ bé điền. Ô đỏ là chưa đúng — bé thử lại nhé.",
  onDone,
}) {
  const interactive = useInteractive();
  const hang = Array.isArray(rows) ? rows : [];
  const soOTong = hang.reduce(
    (a, r) => a + (Array.isArray(r) ? r.filter((c) => c === null).length : 0),
    0,
  );
  const dungHopDong = Array.isArray(answers) && answers.length === soOTong;
  const dapAn = dungHopDong ? answers : [];

  const fill = useFillSlots(dapAn);
  const [reported, setReported] = useState(false);

  /** Bàn giao cho trang Luyện tập (nếu có) — PHẢI trong `useEffect`, xem `interactiveDotCards`. */
  useEffect(() => {
    if (dungHopDong && fill.done && !reported && typeof onDone === "function") {
      setReported(true);
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill.done, dungHopDong]);

  const soCot = Math.max(2, headers.length);
  const W = 340;
  const le = 12;
  const rongBang = W - le * 2;
  const rongCot0 = Math.round(rongBang * 0.58);
  const rongCot1 = rongBang - rongCot0;
  const caoDau = 30;
  const caoHang = 28;
  const H = caoDau + hang.length * caoHang + 10;

  let k = -1; // đếm ô trống theo thứ tự đọc

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label={headers.join(" và ")}
      >
        {/* Dải tiêu đề */}
        <rect
          x={le}
          y="4"
          width={rongBang}
          height={caoDau}
          rx="8"
          fill={P.headSoft}
        />
        <text
          x={le + rongCot0 / 2}
          y={4 + caoDau / 2 + 5}
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill={P.head}
        >
          {headers[0]}
        </text>
        <text
          x={le + rongCot0 + rongCot1 / 2}
          y={4 + caoDau / 2 + 5}
          textAnchor="middle"
          fontSize="15"
          fontWeight="800"
          fill={P.head}
        >
          {headers[1] ?? ""}
        </text>

        {hang.map((r, i) => {
          const y = 4 + caoDau + i * caoHang;
          return (
            <g key={i}>
              <rect
                x={le}
                y={y}
                width={rongBang}
                height={caoHang}
                fill={i % 2 ? "#f8fafc" : P.paper}
                stroke={P.grid}
                strokeWidth="1"
              />
              <line
                x1={le + rongCot0}
                y1={y}
                x2={le + rongCot0}
                y2={y + caoHang}
                stroke={P.grid}
                strokeWidth="1"
              />
              <text
                x={le + rongCot0 / 2}
                y={y + caoHang / 2 + 5}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={P.ink}
              >
                {String(r[0] ?? "")}
              </text>
              {(() => {
                const cell = r[1];
                const cy = y + caoHang / 2;
                if (cell !== null)
                  return (
                    <text
                      x={le + rongCot0 + rongCot1 / 2}
                      y={cy + 5}
                      textAnchor="middle"
                      fontSize="15"
                      fontWeight="800"
                      fill={P.ink}
                    >
                      {String(cell ?? "")}
                    </text>
                  );
                k += 1;
                const oTrong = k;
                const laODangLam = interactive && dungHopDong;
                const look = laODangLam
                  ? slotLook(fill, oTrong)
                  : {
                      fill: "#fffbeb",
                      stroke: "#f59e0b",
                      color: "#b45309",
                      dash: true,
                    };
                const hien =
                  laODangLam && fill.picked[oTrong] !== null
                    ? String(fill.picked[oTrong])
                    : "?";
                return (
                  <g
                    onClick={() => laODangLam && fill.setActive(oTrong)}
                    style={{ cursor: laODangLam ? "pointer" : "default" }}
                  >
                    <rect
                      x={le + rongCot0 + 14}
                      y={y + 4}
                      width={rongCot1 - 28}
                      height={caoHang - 8}
                      rx="7"
                      fill={look.fill}
                      stroke={look.stroke}
                      strokeWidth="2.2"
                      strokeDasharray={look.dash ? "6 4" : undefined}
                    />
                    <text
                      x={le + rongCot0 + rongCot1 / 2}
                      y={cy + 6}
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="900"
                      fill={look.color}
                    >
                      {hien}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}
        <rect
          x={le}
          y="4"
          width={rongBang}
          height={caoDau + hang.length * caoHang}
          rx="8"
          fill="none"
          stroke="#c7d2fe"
          strokeWidth="1.6"
        />
      </svg>

      {interactive && dungHopDong ? (
        <FillBar
          fill={fill}
          options={options.length ? options : [1, 2, 3, 4, 5]}
          title={title}
          hint={hint}
        />
      ) : (
        label && <span style={{ ...caption, color: P.ink }}>{label}</span>
      )}
      {interactive && dungHopDong && label && (
        <span style={{ ...caption, color: P.soft, marginTop: 4 }}>
          {ngatDong(label, 46)[0]}
        </span>
      )}
    </div>
  );
}

export default BangTinh;
