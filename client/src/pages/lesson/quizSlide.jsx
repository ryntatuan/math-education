// quizSlide.jsx
// TÁCH RA TỪ: LessonPage.jsx
// (di chuyển mã nguyên khối — không sửa nội dung)

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  Award,
  Lightbulb,
  MessageCircle,
  LogIn,
} from "lucide-react";
import Button from "../../components/ui/Button";
import GoogleIcon from "../../components/common/GoogleIcon";
import ProgressBar, { StarsDisplay } from "../../components/ui/ProgressBar";
import ReportQuestionButton from "../../components/report/ReportQuestionButton";
import { recordAttempt } from "../../services/attemptService";
import MascotIcon from "../../components/common/MascotIcon";
import CoinIcon from "../../components/common/CoinIcon";
import VisualBlocks from "../../components/visuals/VisualBlock";
import { InteractiveContext } from "../../components/visuals/interactiveFill";
import useUserStore from "../../store/useUserStore";
import useProgressStore from "../../store/useProgressStore";
import useAuthStore from "../../store/useAuthStore";
import { getReward } from "../../services/rewardService";
import curriculum from "../../data/curriculum";
import {
  baoDangTrongBaiHoc,
  ngheNoiDung,
  taiNoiDung,
} from "../../data/contentSource";
import { faceOf } from "../../data/mascotFaces";
import soundManager from "../../utils/soundManager";
import speechHelper from "../../utils/speechHelper";
import fireConfetti from "../../utils/confettiHelper";
import {
  logLessonOpen,
  logSlideReach,
  logLessonDone,
} from "../../services/appEvents";
import ".././LessonPage.css";
import { CalcFigures } from "./lessonGraphics.jsx";
import { SlideHead } from "./slideHead.jsx";

export function QuizSlide({
  content,
  selectedAnswer,
  feedback,
  onAnswer,
  lessonId,
  slideIndex,
}) {
  const [speaking, setSpeaking] = useState(false);
  const feedbackRef = useRef(null);

  // Auto-scroll feedback into view when revealed (above sticky bottom nav)
  useEffect(() => {
    if (feedback && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 120);
    }
  }, [feedback]);

  // Intelligently parse trailing counting emojis from question if content.items is not provided
  let displayQuestion = content.question || "";
  let countingItems = content.items;

  if (!countingItems && displayQuestion) {
    // Check if question ends with multiple emojis (e.g. "🍓🍓🍓" or "🦋🦋🦋🦋")
    const match = displayQuestion.match(
      /^(.*?)[\s]*((?:[\p{Extended_Pictographic}\uFE0F]\s*){2,})$/u,
    );
    if (match) {
      displayQuestion = match[1].trim();
      const emojis =
        match[2].match(/[\p{Extended_Pictographic}\uFE0F]/gu) || [];
      if (emojis.length > 0) {
        countingItems = [{ emoji: emojis[0], count: emojis.length }];
      }
    }
  }

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      speechHelper.speak(
        displayQuestion,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-quiz-card">
      <SlideHead
        label="Thử thách"
        speaking={speaking}
        onSpeak={handleSpeak}
        speakTitle="Nghe đọc câu hỏi"
      >
        <ReportQuestionButton
          lessonId={lessonId}
          slideIndex={slideIndex}
          questionText={content.question}
          correctAnswer={content.answer}
        />
      </SlideHead>

      <h2 className="quiz-question">{displayQuestion}</h2>

      {countingItems && (
        <div className="counting-items-tray-wrap">
          {countingItems.map((item, i) => (
            <div
              key={i}
              className={`counting-items-tray ${item.count <= 5 ? "single-row" : "ten-frame-grid"}`}
            >
              {Array.from({ length: item.count }).map((_, j) => (
                <motion.span
                  key={j}
                  className="counting-item-emoji"
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    delay: j * 0.08,
                    type: "spring",
                    stiffness: 260,
                  }}
                >
                  {item.emoji}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Hình minh hoạ câu hỏi — dùng CHUNG bộ vẽ với slide "hình ảnh" (thước, sơ đồ
          đoạn thẳng, biểu đồ…). Trước đây slide câu hỏi không vẽ gì, nên câu hỏi nhắc
          tới hình là bó không có gì để nhìn. Mặt đồng hồ cũng vậy: SGK in đồng hồ cho
          trẻ đọc giờ, nên câu hỏi "Đồng hồ chỉ mấy giờ?" phải có đồng hồ mới đúng bài. */}
      <CalcFigures content={content} />
      <VisualBlocks content={content} />

      <div
        className={`quiz-options${
          content.options.length === 3 &&
          content.options.every((o) => String(o).length <= 2)
            ? " quiz-options-3"
            : ""
        }`}
      >
        {content.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === content.answer;
          let optionClass = "quiz-option";

          if (feedback) {
            if (isCorrect) optionClass += " quiz-option-correct";
            else if (isSelected && !isCorrect)
              optionClass += " quiz-option-wrong";
          }

          return (
            <motion.button
              key={index}
              className={optionClass}
              onClick={() => onAnswer(option)}
              disabled={feedback !== null}
              whileHover={!feedback ? { scale: 1.03, y: -2 } : {}}
              whileTap={!feedback ? { scale: 0.97 } : {}}
            >
              <span className="quiz-option-text">{option}</span>
              {feedback && isCorrect && (
                <CheckCircle2 size={24} className="quiz-icon-correct" />
              )}
              {feedback && isSelected && !isCorrect && (
                <XCircle size={24} className="quiz-icon-wrong" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback message with auto-scroll ref */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            ref={feedbackRef}
            className={`quiz-feedback quiz-feedback-${feedback}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback === "correct" ? (
              <>🎉 Chính xác! Bé làm giỏi lắm!</>
            ) : (
              <>
                😊 Đáp án đúng là:{" "}
                <strong className="number">{content.answer}</strong>.{" "}
                {content.mascotHint}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
