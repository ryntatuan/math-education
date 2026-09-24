/**
 * TRÒ CHƠI “MÊ CUNG VỀ NHÀ” — bé tự nối đường về nhà, TÍNH GIỜ và xếp 3 mốc sao.
 *
 * Mốc sao (người dùng chốt 2026-09-25):
 *   ≤ 15 giây  → ⭐⭐⭐  (thưởng bậc Vàng)
 *   16 – 30 giây → ⭐⭐   (bậc Bạc)
 *   hơn 30 giây → ⭐     (bậc Đồng)
 *
 * Mốc nằm trong `client/src/utils/mazeStarBands.js` — hai hàm THUẦN, kiểm bằng
 * `scratch/kiem-tra-sao-me-cung.mjs` (không cần mở app vẫn kiểm được đúng mép 15/16/30/31).
 *
 * 🔴 ĐỒNG HỒ CHẠY TỪ LÚC MÊ CUNG HIỆN RA, không phải từ cú bấm đầu tiên. Nếu tính từ cú bấm
 * đầu thì bé cứ ngồi ngắm bảng thoải mái rồi bấm thật nhanh là được 3 sao — mất hết ý nghĩa
 * của trò chơi tính giờ.
 *
 * 🔴 TÍNH THEO GIÂY NGUYÊN (làm tròn xuống) cho CẢ việc xếp sao LẪN con số hiện ra. Nếu xếp
 * sao theo mili-giây mà hiện ra giây thì có lúc màn hình ghi “15 giây” mà chỉ được 2 sao
 * (vì thực tế 15,4 giây) — bé và phụ huynh nhìn vào sẽ thấy như app chấm sai.
 *
 * Đồng hồ, pháo giấy, tiếng kèn khi về nhà do `MazePath` lo (dùng chung với bài học/Luyện tập).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Shuffle } from "lucide-react";

import Button from "../ui/Button";
import { MazePath } from "../visuals/interactiveMaze";
import { generateQuestion, mazeTopicId } from "../../utils/exerciseGenerator";
import { recordAttempt } from "../../services/attemptService";
import {
  BAND_ROWS,
  starsForMs,
  starsForSeconds,
  TIER_BY_STARS,
  TITLE_BY_STARS,
} from "../../utils/mazeStarBands";

const STAR_TEXT = { 3: "⭐⭐⭐", 2: "⭐⭐", 1: "⭐" };

/**
 * Mốc sao — mỗi mốc một THẺ riêng, tự xuống dòng theo từng thẻ.
 * Một dòng dài “Mốc: 3 sao: … · 2 sao: … · 1 sao: …” bị ngắt ở giữa cụm nên trông rất rối
 * khi khung hẹp (người dùng góp ý 2026-09-25).
 */
function StarBands({ className = "" }) {
  return (
    <div className={`maze-star-bands ${className}`.trim()}>
      {BAND_ROWS.map((row) => (
        <span key={row.stars} className={`maze-band-chip is-${row.stars}`}>
          {STAR_TEXT[row.stars]} {row.label}
        </span>
      ))}
    </div>
  );
}

/** Hàng 3 sao của màn kết quả — dùng lại đúng lớp CSS của các game khác cho đồng bộ. */
function StarRow({ stars }) {
  return (
    <div className="gameover-stars-container">
      {[1, 2, 3].map((star) => (
        <motion.div
          key={star}
          className={`gameover-star-wrapper ${star <= stars ? "active" : "inactive"}`}
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            delay: star * 0.15,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={star <= stars ? "#FFD700" : "#E0E0E0"}
            stroke={star <= stars ? "#D4AF37" : "#BDBDBD"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gameover-star-svg"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function MazeRaceGame({
  onBack,
  grade,
  grantReward,
  recordGamePlayed,
}) {
  const lop = Number(grade) >= 1 && Number(grade) <= 5 ? Number(grade) : 1;
  /** `roundId` tăng lên = ván mới (mê cung mới). */
  const [roundId, setRoundId] = useState(0);
  const [question, setQuestion] = useState(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [result, setResult] = useState(null);
  const [reward, setReward] = useState(null);
  const startedAtRef = useRef(0);

  // Mỗi ván: sinh mê cung MỚI và bắt đầu tính giờ từ đây
  useEffect(() => {
    setQuestion(generateQuestion(lop, mazeTopicId(lop)));
    setResult(null);
    setReward(null);
    setElapsedMs(0);
    startedAtRef.current = Date.now();
  }, [lop, roundId]);

  // Đồng hồ: đếm tới khi bé về nhà
  useEffect(() => {
    if (result || !question) return;
    const id = setInterval(
      () => setElapsedMs(Date.now() - startedAtRef.current),
      200,
    );
    return () => clearInterval(id);
  }, [result, question]);

  const handleDone = useCallback(() => {
    if (result || !question) return;
    const ms = Date.now() - startedAtRef.current;
    const stars = starsForMs(ms);
    setElapsedMs(ms);
    setResult({ ms, seconds: Math.floor(ms / 1000), stars });
    if (typeof grantReward === "function")
      setReward(grantReward(`game.tier_${TIER_BY_STARS[stars]}`));
    // Ghi lại lượt chơi như các game khác (khuôn `maze` + lớp, để biết bé yếu chỗ nào)
    recordAttempt({
      ref: question.ref,
      source: "game",
      topic: question.topic,
      grade: lop,
      isCorrect: true,
      startedAt: startedAtRef.current,
    });
    if (typeof recordGamePlayed === "function") recordGamePlayed();
  }, [result, question, grantReward, recordGamePlayed, lop]);

  const seconds = Math.floor(elapsedMs / 1000);
  const soSaoDangCo = result ? result.stars : starsForSeconds(seconds);

  return (
    <div className="mini-game-wrapper">
      <div className="game-top-bar">
        <button className="btn-back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Rời trò chơi</span>
        </button>
        <span className="game-title-text">🏠 Mê Cung Về Nhà</span>
        <div className="game-stats-group">
          <span className="timer-pill">
            <Clock size={16} /> {result ? result.seconds : seconds}s
          </span>
          <span className="score-pill">{STAR_TEXT[soSaoDangCo]}</span>
        </div>
      </div>

      {!result ? (
        <motion.div
          className="maze-game-stage"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StarBands />
          {question && (
            <MazePath
              key={roundId}
              grid={question.maze?.grid}
              rule={question.maze?.rule}
              note={question.note}
              onDone={handleDone}
            />
          )}
        </motion.div>
      ) : (
        <motion.div
          className="race-gameover-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <StarRow stars={result.stars} />
          <h2>{TITLE_BY_STARS[result.stars]}</h2>
          <p>
            Bé nối đường về nhà trong <strong>{result.seconds} giây</strong> —
            được <strong>{STAR_TEXT[result.stars]}</strong>.
          </p>
          <p className="maze-game-bands-title">Cách tính sao</p>
          <StarBands className="is-result" />

          <div className="rank-rewards-box">
            <span className="reward-item">🪙 +{reward?.coins ?? 0} Xu</span>
            <span className="reward-item">⭐ +{reward?.xp ?? 0} XP</span>
          </div>

          <div className="gameover-btns">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setRoundId((n) => n + 1)}
            >
              <Shuffle size={18} /> Mê cung khác
            </Button>
            <Button variant="outline" size="lg" onClick={onBack}>
              Quay lại danh sách game
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
