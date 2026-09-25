/**
 * ĐẶT TÍNH DỌC — BÉ TỰ ĐIỀN KẾT QUẢ TỪNG HÀNG.
 *
 * 🔴 VÌ SAO CÓ FILE NÀY: “Đặt tính rồi tính” là dạng bài **phổ biến nhất** trong SGK Toán
 * 1–5 (Lớp 1 tr.46–71 và tr.88–105 gần như trang nào cũng có). Trước đây app chỉ có CÂU CHỮ
 * (“Đặt tính rồi tính: 32 + 14 = ?”) — trẻ **không nhìn thấy cột**, mà cả bài học “đặt tính
 * thẳng cột” nằm ở chỗ nhìn thấy cột. Nay bé bấm từng ô kết quả và chọn chữ số, đúng như SGK.
 *
 * ⚠️ KHÁC `bangTinh` Ở MỘT ĐIỂM QUAN TRỌNG: đáp án **không khai trong dữ liệu** mà do hàm
 * thuần tự tính từ `left`/`right`/`sign` ⇒ không thể có chuyện “dữ liệu lệch đáp án”, và
 * cũng không phải sửa hai chỗ khi muốn đổi số. Dữ liệu chỉ khai:
 *     `cotTinh: { left: 32, right: 14, sign: "+" }`
 *   `sign`: `"+"` · `"−"` · `"×"` (nhận cả `"-"` và `"*"`). Số thập phân viết dạng chuỗi `"15,82"`.
 *   `remember: true` — thêm hàng “nhớ” (cho phép cộng, và cho phép nhân khi thừa số thứ hai
 *   có MỘT chữ số; xem `tinhNho`).
 *   `blanks: "none"` — in sẵn kết quả (dùng cho slide VÍ DỤ, không phải bài tập).
 *
 * ⚠️ LUẬT REACT: `useFillSlots` phải gọi ở ĐẦU component, không gọi trong nhánh `if`.
 */

import { useEffect, useState } from "react";

import {
  useFillSlots,
  slotLook,
  FillBar,
  useInteractive,
} from "./interactiveFill";
import { CARD_STYLE, CAPTION_STYLE, svgFit, ngatDong } from "./visualTheme";
import { tachSo, tinhKetQua, tinhNho } from "./columnMath";

const P = {
  ink: "#1e293b",
  soft: "#64748b",
  violet: "#7c3aed",
  paper: "#f8fafc",
  oTrong: "#fffbeb",
};

const card = CARD_STYLE;
const caption = CAPTION_STYLE;

// ---------------------------------------------------------------- bộ vẽ

export function CotTinh({
  left,
  right,
  sign = "+",
  remember = false,
  blanks = "result",
  label = "",
  title = "Bé bấm ô “?” rồi chọn chữ số để điền kết quả",
  hint = "Ô viền đứt là chỗ bé điền. Ô đỏ là chưa đúng — bé thử lại nhé.",
  onDone,
}) {
  const interactive = useInteractive();
  // Dấu hiển thị: nhận cả biến thể gõ khác nhau trong dữ liệu (`-` và `−`, `*` và `×`).
  const dau =
    sign === "-" || sign === "−"
      ? "−"
      : sign === "*" || sign === "×"
        ? "×"
        : sign === ":" || sign === "÷"
          ? ":"
          : "+";
  const kq = tinhKetQua(left, right, dau);
  const a = tachSo(left);
  const b = tachSo(right);

  const cotThap = kq.cotThap;
  const cotNguyen = Math.max(
    a.nguyen.length,
    b.nguyen.length,
    kq.nguyen.length,
  );

  // Ba hàng chữ đã căn cột (dấu phẩy chiếm một ô riêng).
  const canPhai = (s, n) => " ".repeat(Math.max(0, n - s.length)) + s;
  const hangA =
    canPhai(a.nguyen, cotNguyen) +
    (cotThap ? `,${a.thap.padEnd(cotThap, " ")}` : "");
  const hangB =
    canPhai(b.nguyen, cotNguyen) +
    (cotThap ? `,${b.thap.padEnd(cotThap, " ")}` : "");
  const hangKQ =
    canPhai(kq.nguyen, cotNguyen) +
    (cotThap ? `,${kq.thap.padEnd(cotThap, " ")}` : "");

  // Ô trống = từng CHỮ SỐ của hàng kết quả, xếp theo thứ tự bé làm: từ PHẢI sang TRÁI.
  const viTriTrong = [];
  [...hangKQ].forEach((ch, i) => {
    if (ch >= "0" && ch <= "9") viTriTrong.push(i);
  });
  viTriTrong.reverse();

  const coNho = remember === true && (dau === "+" || dau === "×");
  const nhoTheoCot = coNho ? tinhNho(left, right, dau) : [];
  // ô nhớ: nhớ RA của cột i được viết ở cột i+1 (tức lệch sang TRÁI một ô)
  const oNho = [];
  if (coNho) {
    const soCot = hangKQ.length;
    nhoTheoCot.forEach((v, i) => {
      const viTri = soCot - 1 - i - 1; // cột i tính từ phải ⇒ vị trí trong chuỗi, lệch 1 sang trái
      if (v > 0 && viTri >= 0) oNho.push({ viTri, v });
    });
    oNho.reverse(); // bé làm từ phải sang trái
  }

  const laChia = dau === ":";
  const kqChia = laChia ? tinhKetQua(left, right, ":") : null;
  /**
   * ĐÁP ÁN theo thứ tự bé điền:
   *   • cộng/trừ/nhân: các chữ số hàng kết quả (phải → trái) rồi tới ô “nhớ”.
   *   • chia: các chữ số của THƯƠNG (TRÁI → PHẢI, đúng thứ tự bé chia) rồi tới ô SỐ DƯ.
   */
  const dapAn = laChia
    ? blanks === "none"
      ? []
      : [
          ...[...kqChia.nguyen].map(Number),
          ...(kqChia.du > 0 ? [kqChia.du] : []),
        ]
    : blanks === "none"
      ? []
      : [...viTriTrong.map((i) => Number(hangKQ[i])), ...oNho.map((o) => o.v)];

  const fill = useFillSlots(dapAn);
  /** Bấm được hay không — tính TRƯỚC mọi nhánh bố cục (nhánh chia dùng tới). */
  const laBamDuoc = interactive && dapAn.length > 0;
  // ⚠️ Không bấm được (slide câu hỏi/tóm tắt chẳng hạn) thì IN LUÔN KẾT QUẢ — tuyệt đối
  // không để ô “?” chết: đó đúng là lỗi “slide tĩnh mà có ô trống” người dùng đã báo.
  const inSanKetQua = blanks === "none" || !laBamDuoc;
  const [reported, setReported] = useState(false);
  useEffect(() => {
    if (
      fill.done &&
      dapAn.length &&
      !reported &&
      typeof onDone === "function"
    ) {
      setReported(true);
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill.done]);

  // ---- BỐ CỤC RIÊNG CHO PHÉP CHIA: số bị chia | vạch dọc | số chia, dưới vạch ngang là THƯƠNG.
  // Đúng cách SGK trình bày (48 : 4 viết 48 | 4 rồi thương 12 ở dưới). Bé điền các chữ số
  // thương từ TRÁI sang PHẢI, sau cùng điền ô SỐ DƯ (nếu phép chia có dư).
  if (laChia) {
    const oRong = 44;
    const oCao = 56;
    const coChu = 34;
    const a2 = tachSo(left);
    const b2 = tachSo(right);
    const thuong = [...kqChia.nguyen];
    const soCotA = a2.nguyen.length;
    const soCotPhai = Math.max(b2.nguyen.length, thuong.length, 1);
    const W = Math.max(210, (soCotA + soCotPhai) * oRong + 56);
    const xA = 14;
    const xVach = xA + soCotA * oRong + 8;
    const xPhai = xVach + 12;
    const y1 = 10;
    const y2 = y1 + oCao + 4;
    const H_ = y2 + oCao + 12;
    const xCell = (x0, i) => x0 + i * oRong;
    const chuSo = (ch, x, y, mau = P.ink, co = coChu, k) => (
      <text
        key={k}
        x={x + oRong / 2}
        y={y + oCao / 2 + 12}
        textAnchor="middle"
        fontSize={String(co)}
        fontWeight="800"
        fill={mau}
        fontFamily="var(--font-number, sans-serif)"
      >
        {ch}
      </text>
    );
    let kc = -1; // đếm ô trống của phép chia (khớp thứ tự `dapAn`)
    const oDien = (x, y, key) => {
      kc += 1;
      const o = kc;
      const look = laBamDuoc
        ? slotLook(fill, o)
        : { fill: P.oTrong, stroke: "#f59e0b", color: "#b45309", dash: true };
      const hien =
        laBamDuoc && fill.picked[o] !== null ? String(fill.picked[o]) : "?";
      return (
        <g
          key={key}
          onClick={() => laBamDuoc && fill.setActive(o)}
          style={{ cursor: laBamDuoc ? "pointer" : "default" }}
        >
          <rect
            x={x + 2}
            y={y + 4}
            width={oRong - 4}
            height={oCao - 8}
            rx="8"
            fill={look.fill}
            stroke={look.stroke}
            strokeWidth="2.4"
            strokeDasharray={look.dash ? "6 4" : undefined}
          />
          {chuSo(hien, x, y, look.color)}
        </g>
      );
    };
    return (
      <div style={card}>
        <svg
          viewBox={`0 0 ${W} ${H_}`}
          {...svgFit(W)}
          role="img"
          aria-label={`Đặt tính chia ${left} : ${right}`}
        >
          <rect
            x={xA - 8}
            y={2}
            width={W - 20}
            height={H_ - 8}
            rx="10"
            fill={P.paper}
          />
          {/* số bị chia */}
          {[...a2.nguyen].map((ch, i) =>
            chuSo(ch, xCell(xA, i), y1, P.ink, coChu, `a-${i}`),
          )}
          {/* vạch dọc + số chia */}
          <line
            x1={xVach}
            y1={y1 - 2}
            x2={xVach}
            y2={y2 + oCao - 10}
            stroke={P.ink}
            strokeWidth="2.4"
          />
          {[...b2.nguyen].map((ch, i) =>
            chuSo(ch, xCell(xPhai, i), y1, P.violet, coChu, `b-${i}`),
          )}
          <line
            x1={xPhai - 6}
            y1={y1 + oCao - 6}
            x2={xPhai + soCotPhai * oRong - 6}
            y2={y1 + oCao - 6}
            stroke={P.ink}
            strokeWidth="2"
          />
          {/* thương: ô bé điền, TRÁI sang PHẢI */}
          {thuong.map((ch, i) =>
            inSanKetQua
              ? chuSo(ch, xCell(xPhai, i), y2, P.ink, coChu, `q-${i}`)
              : oDien(xCell(xPhai, i), y2, `th-${i}`),
          )}
          {/* số dư (nếu có) — nằm dưới số bị chia, có nhãn “dư” */}
          {kqChia.du > 0 && (
            <>
              <text
                x={xA - 6}
                y={y2 + oCao / 2 + 8}
                textAnchor="start"
                fontSize="16"
                fontWeight="800"
                fill={P.soft}
              >
                dư
              </text>
              {inSanKetQua
                ? chuSo(String(kqChia.du), xA + 30, y2, P.ink, coChu, "du")
                : oDien(xA + 30, y2, "du")}
            </>
          )}
        </svg>
        {laBamDuoc ? (
          <FillBar
            fill={fill}
            options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            title={title}
            hint={hint}
          />
        ) : (
          label && <span style={{ ...caption, color: P.ink }}>{label}</span>
        )}
        {laBamDuoc && label && (
          <span style={{ ...caption, color: P.soft, marginTop: 4 }}>
            {ngatDong(label, 46)[0]}
          </span>
        )}
      </div>
    );
  }

  // ---- hình học ----
  // 🔴 CỠ Ô + CỠ KHUNG (người dùng báo 2026-09-26: “danh sách số để chọn quá lớn, đề bài quá nhỏ”).
  // `svgFit` cho ảnh rộng tối đa `viewBox × 1,6`, nên **khung càng hẹp thì hình càng to**.
  // Lấy khung = đúng bề rộng khối số + lề cho dấu phép tính ⇒ chữ số trong đề bài to hơn nút
  // chọn (nút 44 px theo `FillBar`), đúng thứ tự quan trọng: ĐỀ BÀI là chính, nút là phụ.
  const oRong = 44;
  const oCao = 56;
  const coChu = 34;
  const soCot = Math.max(hangA.length, hangB.length, hangKQ.length);
  const rongSo = soCot * oRong;
  const W = Math.max(150, rongSo + 56); // 56 = chỗ cho dấu +/− và lề phải
  const x0 = W - 14 - rongSo; // canh phải khối số
  const caoNho = coNho ? 30 : 0;
  const yA = 10 + caoNho;
  const yB = yA + oCao;
  const yKe = yB + oCao + 2;
  const yKQ = yKe + 6;
  const H = yKQ + oCao + 10;

  const xCell = (i) => x0 + i * oRong;

  const veChuSo = (ch, i, y) =>
    ch === " " || ch === "" ? null : (
      <text
        key={`${y}-${i}`}
        x={xCell(i) + oRong / 2}
        y={y + oCao / 2 + 10}
        textAnchor="middle"
        fontSize={ch === "," ? String(coChu - 4) : String(coChu)}
        fontWeight="800"
        fill={P.ink}
        fontFamily="var(--font-number, sans-serif)"
      >
        {ch}
      </text>
    );

  let k = -1; // đếm ô trống theo thứ tự điền
  const veODien = (i, y, key) => {
    k += 1;
    const o = k;
    const look = laBamDuoc
      ? slotLook(fill, o)
      : { fill: P.oTrong, stroke: "#f59e0b", color: "#b45309", dash: true };
    const hien =
      laBamDuoc && fill.picked[o] !== null ? String(fill.picked[o]) : "?";
    return (
      <g
        key={key}
        onClick={() => laBamDuoc && fill.setActive(o)}
        style={{ cursor: laBamDuoc ? "pointer" : "default" }}
      >
        <rect
          x={xCell(i) + 2}
          y={y + 4}
          width={oRong - 4}
          height={oCao - 8}
          rx="8"
          fill={look.fill}
          stroke={look.stroke}
          strokeWidth="2.4"
          strokeDasharray={look.dash ? "6 4" : undefined}
        />
        <text
          x={xCell(i) + oRong / 2}
          y={y + oCao / 2 + 10}
          textAnchor="middle"
          fontSize={String(coChu)}
          fontWeight="900"
          fill={look.color}
          fontFamily="var(--font-number, sans-serif)"
        >
          {hien}
        </text>
      </g>
    );
  };

  return (
    <div style={card}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        {...svgFit(W)}
        role="img"
        aria-label={`Đặt tính ${left} ${dau} ${right}`}
      >
        {/* nền sọc nhẹ cho khối số */}
        <rect
          x={x0 - 10}
          y={yA - 4}
          width={rongSo + 20}
          height={oCao * 2 + 10}
          rx="10"
          fill={P.paper}
        />

        {/* số hạng thứ nhất */}
        {[...hangA].map((ch, i) => veChuSo(ch, i, yA))}
        {/* dấu phép tính + số hạng thứ hai */}
        <text
          x={x0 - 12}
          y={yB + oCao / 2 + 12}
          textAnchor="end"
          fontSize="38"
          fontWeight="900"
          fill={P.violet}
        >
          {dau}
        </text>
        {[...hangB].map((ch, i) => veChuSo(ch, i, yB))}

        {/* gạch ngang */}
        <line
          x1={x0 - 8}
          y1={yKe}
          x2={x0 + rongSo + 8}
          y2={yKe}
          stroke={P.ink}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* hàng kết quả */}
        {inSanKetQua
          ? [...hangKQ].map((ch, i) => veChuSo(ch, i, yKQ))
          : [...hangKQ].map((ch, i) =>
              ch >= "0" && ch <= "9"
                ? veODien(i, yKQ, `kq-${i}`)
                : veChuSo(ch, i, yKQ),
            )}

        {/* ô “nhớ” — vẽ sau cùng nhưng đếm theo thứ tự đã xếp ở `oNho` */}
        {coNho &&
          oNho.map((o) => {
            k += 1;
            const idx = k;
            const look = laBamDuoc
              ? slotLook(fill, idx)
              : {
                  fill: P.oTrong,
                  stroke: "#f59e0b",
                  color: "#b45309",
                  dash: true,
                };
            const hien =
              laBamDuoc && fill.picked[idx] !== null
                ? String(fill.picked[idx])
                : "?";
            return (
              <g
                key={`nho-${o.viTri}`}
                onClick={() => laBamDuoc && fill.setActive(idx)}
                style={{ cursor: laBamDuoc ? "pointer" : "default" }}
              >
                <rect
                  x={xCell(o.viTri) + 7}
                  y={2}
                  width={oRong - 14}
                  height={22}
                  rx="6"
                  fill={look.fill}
                  stroke={look.stroke}
                  strokeWidth="2"
                  strokeDasharray={look.dash ? "5 3" : undefined}
                />
                <text
                  x={xCell(o.viTri) + oRong / 2}
                  y={18}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="900"
                  fill={look.color}
                >
                  {hien}
                </text>
              </g>
            );
          })}
      </svg>

      {laBamDuoc ? (
        <FillBar
          fill={fill}
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          title={title}
          hint={hint}
        />
      ) : (
        label && <span style={{ ...caption, color: P.ink }}>{label}</span>
      )}
      {laBamDuoc && label && (
        <span style={{ ...caption, color: P.soft, marginTop: 4 }}>
          {ngatDong(label, 46)[0]}
        </span>
      )}
    </div>
  );
}

export default CotTinh;
