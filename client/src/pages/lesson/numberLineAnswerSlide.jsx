/**
 * DẠNG BÀI “TRẢ LỜI TRÊN TRỤC SỐ” — bé KÉO con trỏ tới vạch đúng.
 * Lấy từ ảnh Duolingo Math người dùng gửi (2026-09-28): `2 + 2 + 2 = 3 × ☐` rồi một TRỤC SỐ
 * bên dưới với các vạch 0 · 2 · 4 · 6 · 8 và con trỏ hình cái nhà để bé kéo.
 *
 * VÌ SAO CẦN: “tia số / trục số” là cách SGK Lớp 2–4 dạy đếm thêm, gấp lên, làm tròn. Kéo con trỏ
 * bắt bé ĐỌC VẠCH và ƯỚC LƯỢNG VỊ TRÍ — khác hẳn bấm một đáp án cho sẵn.
 *
 * BỐ CỤC theo ảnh: (1) hàng phép tính `2 + 2 + 2 = 3 × [ hộp ]` — hộp là KHUNG MẪU, luôn trống;
 * (2) TRỤC SỐ có vạch, nhãn số, và con trỏ kéo được; (3) nút KIỂM TRA (mờ tới khi bé chọn vạch).
 *
 * AI BẤM ĐƯỢC: kéo được (chuột/ngón tay) VÀ bấm thẳng vào nhãn số — nhiều bé nhỏ kéo không chính
 * xác bằng bấm, nên phải có cả hai đường. Bàn phím cũng chạy (← →).
 *
 * Dữ liệu: `{ question, expression, answer, min, max, step, mascotHint }`
 *   • Vạch = `min → max` mỗi bước `step`. `answer` PHẢI là một vạch, nếu không bài vô nghiệm
 *     (bé kéo đúng cũng không bao giờ chạm tới) — cổng soạn bài chặn điều đó.
 */
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Volume2 } from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import { matchesNumberLine, nearestTick, ticksOf } from "./answerLogic.js";

/** Hiện số kiểu Việt Nam: 1 000 (dấu cách phân cách nghìn). Vạch của bài học chỉ là số nhỏ. */
const hienSo = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function NumberLineAnswerSlide({ content, onDone }) {
  const ticks = ticksOf(content);
  const n = ticks.length;
  const [chon, setChon] = useState(null);
  const [daCham, setDaCham] = useState(false);
  const [dung, setDung] = useState(false);
  const [soLanSai, setSoLanSai] = useState(0);
  const [dangKeo, setDangKeo] = useState(false);
  const trackRef = useRef(null);

  /** Vị trí phần trăm của một vạch — khớp với cách xếp nhãn (mỗi nhãn một ô đều nhau). */
  const viTri = (giaTri) => {
    const i = ticks.indexOf(giaTri);
    if (i < 0) return 50;
    return ((i + 0.5) / n) * 100;
  };

  const chonTheoX = (clientX) => {
    const r = trackRef.current?.getBoundingClientRect();
    if (!r || r.width === 0 || n < 2) return;
    const ti = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setChon(nearestTick(ticks[0] + ti * (ticks[n - 1] - ticks[0]), ticks));
  };

  const chonVach = (giaTri) => {
    if (daCham) return;
    setChon(giaTri);
  };

  const bamPhim = (e) => {
    if (daCham) return;
    const i = chon === null ? -1 : ticks.indexOf(chon);
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setChon(ticks[Math.max(0, i - 1)]);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setChon(ticks[Math.min(n - 1, i + 1)]);
    }
  };

  const kiemTra = () => {
    if (daCham || chon === null) return;
    const ok = matchesNumberLine(chon, content.answer);
    setDaCham(true);
    setDung(ok);
    if (!ok) setSoLanSai((x) => x + 1);
    onDone?.({
      isCorrect: ok,
      daChon: chon,
      soLanSai: soLanSai + (ok ? 0 : 1),
    });
  };

  const lamLai = () => {
    setChon(null);
    setDaCham(false);
    setDung(false);
  };

  const lopChon = daCham ? (dung ? "is-correct" : "is-wrong") : "";

  return (
    <div className="slide-quiz-card number-line-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">📏 Trả lời trên trục số</span>
        <div className="quiz-header-actions">
          {daCham && !dung && (
            <button
              type="button"
              className="quiz-speak-btn"
              onClick={lamLai}
              title="Làm lại"
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button
            type="button"
            className="quiz-speak-btn"
            onClick={() => speechHelper.speak(content.question)}
            title="Nghe đọc câu hỏi"
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      <h2 className="quiz-question">{content.question}</h2>

      {/* (1) Hàng phép tính — hộp cuối là khung mẫu, luôn trống. */}
      <div className="expr-frame">
        <span className="expr-text">{content.expression}</span>
        <span className="expr-box" aria-hidden="true" />
      </div>

      {/* (2) TRỤC SỐ — kéo được, bấm nhãn được, bàn phím ← → được. */}
      {n >= 2 ? (
        <div
          ref={trackRef}
          className={`number-line ${dangKeo ? "is-dragging" : ""}`}
          role="slider"
          tabIndex={0}
          aria-label="Trục số, kéo hoặc bấm để chọn"
          aria-valuemin={ticks[0]}
          aria-valuemax={ticks[n - 1]}
          aria-valuenow={chon ?? ticks[0]}
          aria-valuetext={chon === null ? "chưa chọn" : hienSo(chon)}
          onPointerDown={(e) => {
            if (daCham) return;
            e.currentTarget.setPointerCapture?.(e.pointerId);
            setDangKeo(true);
            chonTheoX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dangKeo || daCham) return;
            chonTheoX(e.clientX);
          }}
          onPointerUp={(e) => {
            setDangKeo(false);
            e.currentTarget.releasePointerCapture?.(e.pointerId);
          }}
          onPointerCancel={() => setDangKeo(false)}
          onKeyDown={bamPhim}
        >
          <div className="number-line-labels">
            {ticks.map((t) => (
              <button
                key={t}
                type="button"
                className={`number-line-label ${
                  chon === t ? `is-picked ${lopChon}` : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  chonVach(t);
                }}
                disabled={daCham}
                aria-label={`Chọn ${t}`}
              >
                {hienSo(t)}
              </button>
            ))}
          </div>

          <div className="number-line-axis-wrap">
            <span
              className="number-line-axis"
              style={{ left: `${100 / (2 * n)}%`, right: `${100 / (2 * n)}%` }}
            />
            {ticks.map((t) => (
              <span
                key={t}
                className="number-line-tick"
                style={{ left: `${viTri(t)}%` }}
              />
            ))}
            {chon !== null && (
              <span
                className={`number-line-marker ${lopChon}`}
                style={{ left: `${viTri(chon)}%` }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      ) : (
        <p className="build-expr-hint">
          Trục số này chưa có đủ vạch để chọn (dữ liệu cần `min`, `max`,
          `step`).
        </p>
      )}

      {/* (3) Nút kiểm tra — chỉ bật khi bé đã chọn một vạch. */}
      <button
        type="button"
        className="quiz-check-btn number-line-check"
        onClick={kiemTra}
        disabled={chon === null || daCham}
      >
        KIỂM TRA
      </button>

      {!daCham && n >= 2 && (
        <p className="build-expr-hint">
          {chon === null
            ? "Kéo con trỏ trên trục số (hoặc bấm vào số) để chọn đáp án"
            : `Bé đang chọn: ${hienSo(chon)}`}
        </p>
      )}

      {daCham && (
        <div
          className={`quiz-feedback quiz-feedback-${dung ? "correct" : "wrong"}`}
        >
          <span>
            {dung
              ? "🎉 Tuyệt vời! Bé chọn đúng rồi."
              : `😅 ${content.mascotHint || `Đáp án đúng là ${hienSo(content.answer)}.`}`}
          </span>
        </div>
      )}
    </div>
  );
}
