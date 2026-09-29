/**
 * DẠNG BÀI “NỐI CẶP” — dạng “tap the pairs” của Duolingo, và cũng là dạng **“Nối theo mẫu”**
 * xuất hiện rất nhiều trong chương trình Lớp 1–3 (nối phép tính với kết quả, nối số với cách đọc,
 * nối đơn vị đo với số đo tương ứng).
 *
 * Luật chấm: bấm một thẻ bên TRÁI rồi một thẻ bên PHẢI. Đúng cặp thì cả hai khoá lại và xanh;
 * sai thì nháy đỏ rồi mở lại. Xong hết cặp là hoàn thành — bé vẫn có thể bấm “Làm lại”.
 *
 * ⚠️ Cột phải được ĐẢO THỨ TỰ (`xaoOnDinh`) để không còn cảnh “hàng nào cũng khớp hàng đấy”
 *    — nếu không, bài chỉ còn là bấm lần lượt từ trên xuống và bé không phải nghĩ gì.
 *
 * Dữ liệu: `{ question, pairs: [[trái, phải], ...], mascotHint }`
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Volume2 } from "lucide-react";
import speechHelper from "../../utils/speechHelper";
import {
  chuanHoa,
  daNoiHet,
  laCapDung,
  khoaCap,
  traiDaNoi,
  xaoOnDinh,
} from "./answerLogic.js";

export function MatchPairsSlide({ content, onDone }) {
  const pairs = content.pairs || [];
  const [chonTrai, setChonTrai] = useState(null);
  const [daNoi, setDaNoi] = useState([]);
  const [capSai, setCapSai] = useState(null);
  const [soLanSai, setSoLanSai] = useState(0);
  const [xong, setXong] = useState(false);

  /** Cột phải: đảo thứ tự một lần cho cả bài (xem ghi chú đầu file). */
  const [phai] = useState(() => xaoOnDinh(pairs.map((p) => p[1])));

  /** Thẻ TRÁI đã nối xong — dùng để khoá/xám thẻ (xem `traiDaNoi`). */
  const daNoiTrai = traiDaNoi(daNoi);
  const daNoiTraiCua = (trai) => daNoiTrai.has(chuanHoa(trai));

  const bamTrai = (trai) => {
    if (xong || daNoiTraiCua(trai)) return;
    setChonTrai(trai === chonTrai ? null : trai);
  };

  const bamPhai = (phaiValue) => {
    if (xong) return;
    // Cặp này đã nối rồi (thẻ phải thuộc một thẻ trái đã khoá) thì bỏ qua.
    const daKhoa = pairs.some(
      (p) => chuanHoa(p[1]) === chuanHoa(phaiValue) && daNoiTraiCua(p[0]),
    );
    if (daKhoa) return;
    if (!chonTrai) return;

    if (laCapDung(chonTrai, phaiValue, pairs)) {
      const moi = [...daNoi, khoaCap(chonTrai, phaiValue)];
      setDaNoi(moi);
      setChonTrai(null);
      // `daNoiHet` đếm cặp KHÔNG TRÙNG (nối lại cặp cũ không tính thêm).
      if (daNoiHet(moi, pairs)) {
        setXong(true);
        onDone?.({ isCorrect: true, soLanSai });
      }
    } else {
      setCapSai([chonTrai, phaiValue]);
      setSoLanSai((n) => n + 1);
      setTimeout(() => setCapSai(null), 600);
    }
  };

  const lamLai = () => {
    setDaNoi([]);
    setChonTrai(null);
    setCapSai(null);
    setXong(false);
  };

  return (
    <div className="slide-quiz-card match-pairs-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">🔗 Nối cặp cho đúng</span>
        <div className="quiz-header-actions">
          {soLanSai > 0 && !xong && (
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

      <div className="match-pairs-grid">
        <div className="match-col">
          {pairs.map(([trai]) => {
            const xongRoi = daNoiTraiCua(trai);
            const dangChon = chonTrai === trai;
            return (
              <motion.button
                key={trai}
                type="button"
                className={`match-item ${xongRoi ? "is-done" : ""} ${
                  dangChon ? "is-picked" : ""
                }`}
                onClick={() => bamTrai(trai)}
                disabled={xongRoi}
                whileTap={{ scale: 0.97 }}
              >
                {trai}
              </motion.button>
            );
          })}
        </div>

        <div className="match-col">
          {phai.map((p) => {
            const goc = pairs.find((x) => x[1] === p);
            const xongRoi = goc ? daNoiTraiCua(goc[0]) : false;
            const dangSai = capSai && capSai[1] === p;
            return (
              <motion.button
                key={p}
                type="button"
                className={`match-item ${xongRoi ? "is-done" : ""} ${
                  dangSai ? "is-wrong" : ""
                }`}
                onClick={() => bamPhai(p)}
                disabled={xongRoi}
                whileTap={{ scale: 0.97 }}
              >
                {p}
              </motion.button>
            );
          })}
        </div>
      </div>

      {xong ? (
        <div className="quiz-feedback quiz-feedback-correct">
          <span>
            🎉 Nối hết rồi!{" "}
            {soLanSai > 0
              ? `Bé thử ${soLanSai} lần sai — làm lại cho thật chắc nhé!`
              : "Không sai lần nào!"}
          </span>
        </div>
      ) : (
        <p className="match-pairs-progress">
          Đã nối {new Set(daNoi).size}/{pairs.length} cặp ·{" "}
          {chonTrai
            ? "bấm tiếp một ô bên phải"
            : "bấm một ô bên trái để bắt đầu"}
        </p>
      )}
    </div>
  );
}
