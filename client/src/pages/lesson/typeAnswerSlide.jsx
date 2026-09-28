/**
 * DẠNG BÀI “NHẬP CÂU TRẢ LỜI” — bé TỰ BẤM SỐ trên bàn phím số.
 * Lấy từ ảnh Duolingo Math người dùng gửi (2026-09-28): `4 + 4 + 4 + 4 = ☐` với ô nhập và bàn
 * phím số 1–9, 0, xoá, rồi nút `KIỂM TRA`.
 *
 * VÌ SAO CẦN: SGK có rất nhiều câu “Tính rồi viết kết quả vào chỗ chấm” — hiện app chỉ có trắc
 * nghiệm 4 lựa chọn, tức là bé có thể ĐOÁN. Tự bấm số thì bé phải tính thật.
 *
 * BỐ CỤC theo ảnh (và theo đúng bài học của đợt trước):
 *   (1) hàng phép tính `4 + 4 + 4 + 4 = [ hộp ]` — hộp chỉ là KHUNG MẪU, LUÔN ĐỂ TRỐNG;
 *   (2) ô riêng bên dưới hiện SỐ BÉ GÕ (ô mẫu không hiện dữ liệu — người dùng đã nói rõ);
 *   (3) bàn phím số 0–9 + xoá một chữ số;
 *   (4) nút KIỂM TRA (mờ cho tới khi bé gõ ít nhất một chữ số).
 *
 * Dữ liệu: `{ question, expression, answer, mascotHint }`
 *   • `expression` — phép tính hiện to, viết tới dấu `=` (ví dụ `"4 + 4 + 4 + 4 ="`).
 *   • `answer` — số đúng (số tự nhiên). Luật chấm: `matchesNumber` — so theo GIÁ TRỊ nên bé gõ
 *     `16` hay `016` đều đúng, còn `1 6` (có dấu cách) là không phải số.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Delete, RotateCcw, Volume2 } from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import { matchesNumber } from "./answerLogic.js";

/** Số chữ số tối đa — đủ cho mọi bài trong SGK (lớn nhất là số có 6 chữ số). */
const TOI_DA_CHU_SO = 6;

export function TypeAnswerSlide({ content, onDone }) {
  const [nhap, setNhap] = useState("");
  const [daCham, setDaCham] = useState(false);
  const [dung, setDung] = useState(false);
  const [soLanSai, setSoLanSai] = useState(0);

  const bamSo = (chuSo) => {
    if (daCham) return;
    setNhap((n) => {
      if (n.length >= TOI_DA_CHU_SO) return n;
      // Gõ số 0 đầu tiên rồi gõ tiếp: thay luôn số 0 đó (`0` → `06` là chuyện không ai muốn).
      if (n === "0") return chuSo;
      return n + chuSo;
    });
  };

  const xoaMot = () => {
    if (daCham) return;
    setNhap((n) => n.slice(0, -1));
  };

  const kiemTra = () => {
    if (daCham || nhap === "") return;
    const ok = matchesNumber(nhap, content.answer);
    setDaCham(true);
    setDung(ok);
    if (!ok) setSoLanSai((n) => n + 1);
    onDone?.({ isCorrect: ok, daGo: nhap, soLanSai: soLanSai + (ok ? 0 : 1) });
  };

  const lamLai = () => {
    setNhap("");
    setDaCham(false);
    setDung(false);
  };

  return (
    <div className="slide-quiz-card type-answer-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">⌨️ Nhập kết quả</span>
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

      {/* (1) Hàng phép tính — hộp cuối là KHUNG MẪU, luôn trống (xem ghi chú đầu file). */}
      <div className="expr-frame">
        <span className="expr-text">{content.expression}</span>
        <span className="expr-box" aria-hidden="true" />
      </div>

      {/* (2) Ô hiện số bé gõ — ĐÂY mới là chỗ hiện dữ liệu. */}
      <div
        className={`type-answer-input ${nhap === "" ? "is-empty" : ""} ${
          daCham ? (dung ? "is-correct" : "is-wrong") : ""
        }`}
        aria-live="polite"
      >
        {nhap}
      </div>

      {/* (3) Bàn phím số: 1–9, rồi hàng cuối là 0 (giữa) và nút xoá (phải) như ảnh Duolingo. */}
      <div className="type-answer-keypad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <motion.button
            key={d}
            type="button"
            whileTap={{ scale: 0.94 }}
            className="type-answer-key"
            onClick={() => bamSo(d)}
            disabled={daCham}
          >
            {d}
          </motion.button>
        ))}
        <span className="type-answer-key is-blank" aria-hidden="true" />
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          className="type-answer-key"
          onClick={() => bamSo("0")}
          disabled={daCham}
        >
          0
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.94 }}
          className="type-answer-key is-delete"
          onClick={xoaMot}
          disabled={daCham || nhap === ""}
          aria-label="Xoá một chữ số"
          title="Xoá một chữ số"
        >
          <Delete size={30} />
        </motion.button>
      </div>

      {/* (4) Nút kiểm tra — chỉ bật khi bé đã gõ gì đó. */}
      <button
        type="button"
        className="quiz-check-btn type-answer-check"
        onClick={kiemTra}
        disabled={nhap === "" || daCham}
      >
        KIỂM TRA
      </button>

      {daCham && (
        <div
          className={`quiz-feedback quiz-feedback-${dung ? "correct" : "wrong"}`}
        >
          <span>
            {dung
              ? "🎉 Tuyệt vời! Bé tính đúng rồi."
              : `😅 ${content.mascotHint || `Đáp án đúng là ${content.answer}.`}`}
          </span>
        </div>
      )}
    </div>
  );
}
