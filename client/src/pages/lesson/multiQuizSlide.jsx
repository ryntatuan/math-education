/**
 * DẠNG BÀI “CHỌN TẤT CẢ PHƯƠNG ÁN ĐÚNG” — lấy ý từ Duolingo Math (ảnh người dùng gửi 2026-09-28:
 * “Chọn tất cả các phương án thích hợp”).
 *
 * VÌ SAO CẦN: dạng cũ (`quiz`) chỉ có MỘT đáp án, nên không dạy được những câu rất hay gặp:
 *   • “Chọn tất cả các phép tính có kết quả bằng 10”
 *   • “Những số nào chia hết cho 5?”  • “Những hình nào là hình bình hành?”
 *   • “Đúng ghi Đ, sai ghi S” (nhiều mệnh đề cùng lúc)
 *
 * KHÁC `quiz` ở ba điểm: nhiều đáp án (mảng `answers`), chấm theo TẬP HỢP (thứ tự bấm không
 * quan trọng — xem `answerLogic.dungTatCa`), và phải có nút **Kiểm tra** để bé chọn xong mới chấm
 * (Duolingo cũng vậy: chọn xong rồi mới bấm kiểm tra).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import { dungTatCa, phuongAnChonSai, phuongAnBoSot } from "./answerLogic.js";

export function MultiQuizSlide({ content, onDone }) {
  const [daChon, setDaChon] = useState([]);
  const [daCham, setDaCham] = useState(false);
  const [dung, setDung] = useState(false);

  const options = content.options || [];
  const answers = content.answers || [];

  const bamPhuongAn = (opt) => {
    if (daCham) return;
    setDaChon((cu) =>
      cu.includes(opt) ? cu.filter((x) => x !== opt) : [...cu, opt],
    );
  };

  const kiemTra = () => {
    if (daCham || daChon.length === 0) return;
    const ketQua = dungTatCa(daChon, answers);
    setDaCham(true);
    setDung(ketQua);
    onDone?.({ isCorrect: ketQua, daChon });
  };

  const saiDaChon = daCham ? phuongAnChonSai(daChon, answers) : [];
  const boSot = daCham ? phuongAnBoSot(daChon, answers) : [];

  return (
    <div className="slide-quiz-card multi-quiz-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">✅ Chọn tất cả đáp án đúng</span>
        <div className="quiz-header-actions">
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

      <div className="multi-quiz-options">
        {options.map((opt, i) => {
          const chon = daChon.includes(opt);
          const lop = [
            "multi-quiz-option",
            chon ? "is-chosen" : "",
            daCham && answers.includes(opt) ? "is-correct" : "",
            daCham && saiDaChon.includes(opt) ? "is-wrong" : "",
            daCham && boSot.includes(opt) ? "is-missed" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <motion.button
              key={`${i}-${opt}`}
              type="button"
              className={lop}
              onClick={() => bamPhuongAn(opt)}
              disabled={daCham}
              whileTap={daCham ? {} : { scale: 0.97 }}
            >
              <span className={`multi-quiz-tick ${chon ? "on" : ""}`}>
                {chon ? "✓" : ""}
              </span>
              <span className="multi-quiz-text">{opt}</span>
              {daCham && answers.includes(opt) && (
                <CheckCircle2 size={22} className="quiz-icon-correct" />
              )}
              {daCham && saiDaChon.includes(opt) && (
                <XCircle size={22} className="quiz-icon-wrong" />
              )}
            </motion.button>
          );
        })}
      </div>

      {!daCham ? (
        <button
          type="button"
          className="quiz-check-btn"
          onClick={kiemTra}
          disabled={daChon.length === 0}
        >
          KIỂM TRA ({daChon.length} đã chọn)
        </button>
      ) : (
        <div
          className={`quiz-feedback quiz-feedback-${dung ? "correct" : "wrong"}`}
        >
          <span>
            {dung
              ? "🎉 Chính xác! Bé đã chọn đúng hết."
              : `😅 ${content.mascotHint || "Xem lại các đáp án được tô đỏ nhé!"}`}
          </span>
        </div>
      )}
    </div>
  );
}
