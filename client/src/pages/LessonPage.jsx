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
import Button from "../components/ui/Button";
import GoogleIcon from "../components/common/GoogleIcon";
import ProgressBar, { StarsDisplay } from "../components/ui/ProgressBar";
import ReportQuestionButton from "../components/report/ReportQuestionButton";
import { recordAttempt } from "../services/attemptService";
import MascotIcon from "../components/common/MascotIcon";
import CoinIcon from "../components/common/CoinIcon";
import useUserStore from "../store/useUserStore";
import useProgressStore from "../store/useProgressStore";
import useAuthStore from "../store/useAuthStore";
import usePetStore from "../store/usePetStore";
import { getReward } from "../services/rewardService";
import curriculum from "../data/curriculum";
import soundManager from "../utils/soundManager";
import speechHelper from "../utils/speechHelper";
import fireConfetti from "../utils/confettiHelper";
import "./LessonPage.css";

// Find lesson across all grades/chapters
function findLesson(lessonId) {
  for (const grade of curriculum.grades) {
    for (const chapter of grade.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId);
      if (lesson) return { lesson, chapter, grade };
    }
  }
  return null;
}

export default function LessonPage() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { isGuest, setAuthModalOpen } = useAuthStore();
  const { coins, grantReward, autoSpeakLesson, soundEnabled } = useUserStore();
  const { completeLesson, recordMistake, progressQuest, completedLessons } =
    useProgressStore();

  const found = findLesson(lessonId);
  const [currentSlide, setCurrentSlide] = useState(0);
  // GĐ 2b — mốc bắt đầu làm câu hỏi của slide hiện tại, dùng để tính `ms`
  // gửi lên `question_attempts`. Sang slide khác thì tính lại.
  const slideStartedAt = useRef(Date.now());
  useEffect(() => {
    slideStartedAt.current = Date.now();
  }, [currentSlide]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null); // 'correct' | 'wrong' | null

  // Phần thưởng THỰC SỰ đã cấp, lưu lại để hiển thị ở màn hình kết quả.
  // Không thể tính lại từ `isRelearning` ở render sau: completeLesson() đã
  // đánh dấu bài là hoàn thành, nên isRelearning thành true và màn hình sẽ
  // hiển thị nhầm giá trị của lesson.relearn (5 Xu) dù đã cộng 20 Xu.
  const [earnedReward, setEarnedReward] = useState(null);

  const lesson = found?.lesson;
  const _chapter = found?.chapter;
  const slides = lesson?.slides || [];
  const slide = slides[currentSlide];
  const totalSlides = slides.length;
  const isLastSlide = currentSlide === totalSlides - 1;
  const isQuizSlide = slide?.type === "quiz";

  // Count quiz slides and correct answers
  const quizSlides = slides.filter((s) => s.type === "quiz");
  const totalQuizzes = quizSlides.length;
  const correctAnswers = Object.values(quizAnswers).filter(
    (a) => a.correct,
  ).length;

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechHelper.stop();
    };
  }, []);

  // Auto-scroll to top whenever slide changes (prevents starting midway down next slide)
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      const pageWrapper = document.querySelector(".page-wrapper");
      if (pageWrapper) pageWrapper.scrollTop = 0;
      const lessonPage = document.querySelector(".lesson-page");
      if (lessonPage) lessonPage.scrollTop = 0;
    };

    scrollToTop();
    const raf = requestAnimationFrame(scrollToTop);
    const timer = setTimeout(scrollToTop, 60);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [currentSlide]);

  // Fire celebratory confetti when completing lesson and showing result
  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        fireConfetti({ particleCount: 90, spread: 75, origin: { y: 0.55 } });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [showResult]);

  // Auto-speak slide content if autoSpeakLesson is enabled
  useEffect(() => {
    speechHelper.stop();
    if (!autoSpeakLesson || !soundEnabled || showResult) return;

    const timer = setTimeout(() => {
      const s = slides[currentSlide];
      if (!s) return;

      let textToRead = "";
      if (s.type === "quiz") {
        textToRead = s.content?.question || "";
      } else if (s.type === "story" || s.type === "visual") {
        textToRead = s.content?.text || "";
      } else if (s.type === "concept") {
        const parts = [s.content?.title];
        if (s.content?.explanation) parts.push(s.content.explanation);
        if (s.content?.rule && s.content.rule !== s.content.explanation)
          parts.push(s.content.rule);
        if (s.content?.points) parts.push(s.content.points.join(". "));
        if (s.content?.example) {
          const ex = s.content.example;
          const exText =
            ex.text ||
            `${ex.question ? ex.question + ". " : ""}${ex.explanation || ""}`;
          parts.push(`Ví dụ: ${exText}`);
        }
        textToRead = parts.filter(Boolean).join(". ");
      } else if (s.type === "summary") {
        textToRead = `${s.content?.title || ""}. ${s.content?.points ? s.content.points.join(". ") : ""}`;
      }

      if (textToRead) {
        speechHelper.speak(textToRead);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      speechHelper.stop();
    };
  }, [currentSlide, autoSpeakLesson, soundEnabled, showResult, slides]);

  if (!found) {
    return (
      <div className="page-empty">
        <span style={{ fontSize: "4rem" }}>😕</span>
        <h2>Không tìm thấy bài học</h2>
        <Button onClick={() => navigate("/")}>Về trang chủ</Button>
      </div>
    );
  }

  const handleNext = () => {
    if (document.activeElement?.blur) document.activeElement.blur();
    speechHelper.stop();
    if (isLastSlide) {
      // Finish lesson
      const stars =
        totalQuizzes === 0
          ? 3
          : correctAnswers === totalQuizzes
            ? 3
            : correctAnswers >= totalQuizzes * 0.6
              ? 2
              : 1;

      completeLesson(lessonId, stars);
      progressQuest("quest_lesson", 1);

      try {
        usePetStore.getState().rewardFoodForStudy();
      } catch (e) {}

      const reward = grantReward(rewardKey, lessonId);
      setEarnedReward(reward);
      soundManager.playFanfare();
      setShowResult(true);
    } else {
      setCurrentSlide((prev) => prev + 1);
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  const handlePrev = () => {
    if (document.activeElement?.blur) document.activeElement.blur();
    speechHelper.stop();
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  const handleQuizAnswer = (answer) => {
    if (document.activeElement?.blur) document.activeElement.blur();
    if (answerFeedback) return; // Already answered

    setSelectedAnswer(answer);
    const isCorrect = answer === slide.content.answer;

    setAnswerFeedback(isCorrect ? "correct" : "wrong");
    setQuizAnswers((prev) => ({
      ...prev,
      [currentSlide]: { answer, correct: isCorrect },
    }));

    // GĐ 2b — ghi lại lượt trả lời để biết câu hỏi nào hỏng / kỹ năng nào yếu.
    // `ref` theo TỪNG CÂU (khác câu sinh tự động — câu viết tay có thể sai đáp án
    // riêng lẻ, nên phải chỉ đích danh).
    const questionRef = `lesson:${lessonId}:${currentSlide}`;
    recordAttempt({
      ref: questionRef,
      source: "lesson",
      lessonId,
      grade: found?.grade?.id || 1,
      isCorrect,
      startedAt: slideStartedAt.current,
    });

    if (isCorrect) {
      soundManager.playCorrect();
      grantReward("lesson.quiz_correct", lessonId);
    } else {
      soundManager.playWrong();
      recordMistake({
        lessonId,
        ref: questionRef,
        question: slide.content.question,
        options: slide.content.options,
        answer: slide.content.answer,
        explanation:
          slide.content.mascotHint || `Đáp án đúng là: ${slide.content.answer}`,
        grade: found?.grade?.id || 1,
        chapterTitle: found?.chapter?.name || "Bài học",
      });
    }
  };

  const canGoNext = !isQuizSlide || answerFeedback !== null;

  // Result Screen
  const isRelearning = completedLessons[lessonId] !== undefined;
  // Tra từ reward_configs — Admin đổi là app nhận ngay, không cần build lại.
  const rewardKey = isRelearning ? "lesson.relearn" : "lesson.complete";
  // Ưu tiên số ĐÃ CẤP (earnedReward) — xem ghi chú ở khai báo earnedReward.
  const { coins: finalCoins, xp: finalXp } =
    earnedReward ?? getReward(rewardKey);

  if (showResult) {
    const stars =
      totalQuizzes === 0
        ? 3
        : correctAnswers === totalQuizzes
          ? 3
          : correctAnswers >= totalQuizzes * 0.6
            ? 2
            : 1;

    return (
      <motion.div
        className="lesson-result"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="lesson-result-content">
          <motion.div
            className="result-emoji"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            {stars === 3 ? "🎉" : stars === 2 ? "👏" : "💪"}
          </motion.div>

          <h1>
            {stars === 3 ? "Xuất sắc!" : stars === 2 ? "Giỏi lắm!" : "Tốt lắm!"}
          </h1>

          <div className="result-mascot-greeting">
            <span className="result-mascot-owl">
              <MascotIcon size={36} />
            </span>
            <p className="result-mascot-message">
              {stars === 3
                ? "Tuyệt vời! Bé đã hoàn thành bài học xuất sắc và nhận trọn vẹn phần thưởng!"
                : stars === 2
                  ? "Bé làm rất tốt! Hãy tiếp tục phát huy ở các bài học tiếp theo nhé!"
                  : "Cố gắng tuyệt vời! Bé đã hoàn thành bài học và nhận thêm điểm thưởng!"}
            </p>
          </div>

          <StarsDisplay stars={stars} maxStars={3} size="lg" />

          {/* Conditional Rewards Box / Guest Notice */}
          {isGuest ? (
            <div className="guest-lesson-result-card">
              <div className="guest-result-badge-row">
                <span className="guest-result-pill">⚡ Chế độ Khách</span>
              </div>
              <p className="guest-result-text">
                💡 Đăng nhập tài khoản để tích lũy <strong>Xu Vàng</strong>,
                thăng cấp <strong>Level</strong> và mở khóa toàn bộ thành tích
                nhé!
              </p>
              <button
                type="button"
                className="btn-guest-result-login"
                onClick={() => setAuthModalOpen(true)}
              >
                <GoogleIcon size={18} />
                <span>Đăng nhập Google để nhận thưởng</span>
              </button>
            </div>
          ) : (
            <div className="result-rewards-card">
              <div className="result-reward-item">
                <span className="reward-icon">
                  <CoinIcon size={24} />
                </span>
                <div className="reward-info">
                  <span className="reward-val number">+{finalCoins}</span>
                  <span className="reward-label">Xu vàng</span>
                </div>
              </div>
              <div className="result-reward-item">
                <span className="reward-icon">⚡</span>
                <div className="reward-info">
                  <span className="reward-val number">+{finalXp}</span>
                  <span className="reward-label">Điểm XP</span>
                </div>
              </div>
              <div className="result-reward-item">
                <span className="reward-icon">⭐</span>
                <div className="reward-info">
                  <span className="reward-val number">+{stars}</span>
                  <span className="reward-label">Sao tích lũy</span>
                </div>
              </div>
            </div>
          )}

          <div className="result-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(-1)}
              className="result-action-btn"
            >
              Tiếp tục học →
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setCurrentSlide(0);
                setQuizAnswers({});
                setShowResult(false);
                setSelectedAnswer(null);
                setAnswerFeedback(null);
              }}
              className="result-action-btn"
            >
              Học lại bài này
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="lesson-page">
      {/* Header */}
      <div className="lesson-header">
        <button
          className="btn-back-circle"
          onClick={() => {
            soundManager.playClick();
            navigate(-1);
          }}
          title="Quay lại"
          aria-label="Quay lại"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="lesson-header-info">
          <h3>{lesson.title}</h3>
          <ProgressBar
            value={currentSlide + 1}
            max={totalSlides}
            variant="gradient"
            size="sm"
          />
        </div>
        <div className="lesson-header-right">
          {!isGuest && (
            <span className="lesson-coins-pill number" title="Số xu hiện tại">
              <CoinIcon size={14} /> {coins}
            </span>
          )}
          <span className="lesson-slide-count number">
            {currentSlide + 1}/{totalSlides}
          </span>
        </div>
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="lesson-slide"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {slide.type === "story" && <StorySlide content={slide.content} />}

          {slide.type === "concept" && <ConceptSlide content={slide.content} />}

          {slide.type === "visual" && <VisualSlide content={slide.content} />}

          {slide.type === "dialogue" && (
            <DialogueSlide
              content={slide.content}
              onAnswerRecorded={(isCorrect) => {
                // GĐ 2b — hội thoại cũng có câu hỏi, ghi lại như slide quiz
                recordAttempt({
                  ref: `lesson:${lessonId}:${currentSlide}`,
                  source: "lesson",
                  lessonId,
                  grade: found?.grade?.id || 1,
                  isCorrect,
                  startedAt: slideStartedAt.current,
                });
                if (isCorrect) {
                  soundManager.playCorrect();
                  grantReward("lesson.quiz_correct", lessonId);
                }
              }}
            />
          )}

          {slide.type === "quiz" && (
            <QuizSlide
              content={slide.content}
              selectedAnswer={selectedAnswer}
              feedback={answerFeedback}
              onAnswer={handleQuizAnswer}
              lessonId={lessonId}
              slideIndex={currentSlide}
            />
          )}

          {slide.type === "summary" && <SummarySlide content={slide.content} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="lesson-nav">
        <Button
          variant="outline"
          size="lg"
          icon={<ArrowLeft size={20} strokeWidth={2.5} />}
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className="lesson-nav-btn lesson-nav-btn-prev"
        >
          Trước
        </Button>

        <Button
          variant={isLastSlide ? "success" : "primary"}
          size="lg"
          iconRight={
            !isLastSlide ? (
              <ArrowRight size={20} strokeWidth={2.5} />
            ) : undefined
          }
          onClick={handleNext}
          disabled={!canGoNext}
          glow={canGoNext}
          className="lesson-nav-btn lesson-nav-btn-next"
        >
          {isLastSlide ? "🎉 Hoàn thành bài" : "Tiếp tục"}
        </Button>
      </div>
    </div>
  );
}

// ---- Slide Components ----

function StorySlide({ content }) {
  const [speaking, setSpeaking] = useState(false);
  const moodEmoji =
    content.mascotMood === "excited"
      ? "🤩"
      : content.mascotMood === "proud"
        ? "😎"
        : content.mascotMood === "thinking"
          ? "🤔"
          : "😊";

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      speechHelper.speak(
        content.text,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-story-card">
      <div className="story-header-banner">
        <div className="story-card-top-tag">
          <Sparkles size={18} />
          <span>Bài Học Khám Phá</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeak}
          title="Nghe đọc nội dung"
        >
          <Volume2 size={19} />
          <span>Nghe đọc</span>
        </button>
      </div>

      <motion.div
        className="story-mascot-hero"
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="story-owl-emoji">
          <MascotIcon size={52} />
        </span>
        <span className="story-mood-badge">{moodEmoji}</span>
      </motion.div>

      <div className="story-dialog-bubble">
        <p className="story-dialog-text">{content.text}</p>
      </div>
    </div>
  );
}

function VisualSlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      speechHelper.speak(
        content.text,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-visual-card">
      <div className="visual-header-banner">
        <h2 className="slide-visual-text">{content.text}</h2>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeak}
          title="Nghe đọc nội dung"
        >
          <Volume2 size={20} />
          <span>Nghe đọc</span>
        </button>
      </div>

      {content.items && (
        <div className="visual-items">
          {content.items.map((item, i) => (
            <div key={i} className="visual-item-group">
              {item.label && <span className="visual-label">{item.label}</span>}
              <div
                className={`visual-emojis ${item.count <= 5 ? "single-row-emojis" : "ten-frame-emojis"}`}
              >
                {Array.from({ length: item.count }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="visual-emoji"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: j * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    {item.emoji}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {content.number !== null && content.number !== undefined && (
        <motion.div
          className="visual-number"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          <span className="number">{content.number}</span>
        </motion.div>
      )}

      {content.operation && (
        <motion.div
          className="visual-operation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="number op-num">{content.operation.left}</span>
          <span className="op-sign">{content.operation.sign}</span>
          <span className="number op-num">{content.operation.right}</span>
          <span className="op-sign">=</span>
          <span className="number op-result">{content.operation.result}</span>
        </motion.div>
      )}

      {content.clock && (
        <ClockGraphic
          hour={content.clock.hour}
          minute={content.clock.minute}
          showLabels={content.clock.showLabels !== false}
          timeText={content.clock.timeText}
        />
      )}

      {content.comparison && (
        <motion.div
          className="visual-operation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="number op-num">{content.comparison.left}</span>
          <span className="op-sign comparison-sign">
            {content.comparison.sign}
          </span>
          <span className="number op-num">{content.comparison.right}</span>
        </motion.div>
      )}
    </div>
  );
}

// ---- Concept Slide & Educational Visuals ----

function ClockGraphic({
  hour = 12,
  minute = 0,
  showLabels = true,
  timeText = "",
  frameColor = "#3b82f6",
  shape = "circle",
  size = "md",
}) {
  const isSm = size === "sm";
  const isLg = size === "lg";
  const svgSize = isSm ? 120 : isLg ? 220 : 165;
  const cx = 110;
  const cy = 110;
  const r = 88;

  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const isSquare = shape === "square";
  const gradId = `clockFaceGrad-${hour}-${minute}-${shape}-${frameColor.replace("#", "")}`;

  return (
    <div className={`clock-graphic-container size-${size}`}>
      <div className="clock-svg-wrap">
        <svg
          viewBox="0 0 220 220"
          width={svgSize}
          height={svgSize}
          className="clock-svg"
        >
          <defs>
            <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </radialGradient>
            <filter
              id="clockShadow"
              x="-10%"
              y="-10%"
              width="130%"
              height="130%"
            >
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodOpacity="0.14"
              />
            </filter>
          </defs>

          {/* Clock Outer Rim */}
          {isSquare ? (
            <rect
              x={cx - r - 10}
              y={cy - r - 10}
              width={(r + 10) * 2}
              height={(r + 10) * 2}
              rx="28"
              fill="#ffffff"
              stroke={frameColor}
              strokeWidth="6"
              filter="url(#clockShadow)"
            />
          ) : (
            <circle
              cx={cx}
              cy={cy}
              r={r + 8}
              fill="#ffffff"
              stroke={frameColor}
              strokeWidth="6"
              filter="url(#clockShadow)"
            />
          )}

          {/* Clock Face Background */}
          {isSquare ? (
            <rect
              x={cx - r}
              y={cy - r}
              width={r * 2}
              height={r * 2}
              rx="20"
              fill={`url(#${gradId})`}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
          ) : (
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={`url(#${gradId})`}
              stroke="#e2e8f0"
              strokeWidth="1.5"
            />
          )}

          {/* 12 Hour Marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30 * (Math.PI / 180);
            const x1 = cx + (r - 4) * Math.sin(angle);
            const y1 = cy - (r - 4) * Math.cos(angle);
            const x2 = cx + (r - 12) * Math.sin(angle);
            const y2 = cy - (r - 12) * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? "#475569" : "#94a3b8"}
                strokeWidth={i % 3 === 0 ? "3" : "2"}
                strokeLinecap="round"
              />
            );
          })}

          {/* 12 Numbers */}
          {numbers.map((num) => {
            const angle = (num === 12 ? 0 : num * 30) * (Math.PI / 180);
            const nx = cx + (r - 24) * Math.sin(angle);
            const ny = cy - (r - 24) * Math.cos(angle) + 5;
            return (
              <text
                key={num}
                x={nx}
                y={ny}
                textAnchor="middle"
                fontSize={isSm ? "16" : "15"}
                fontWeight="800"
                fontFamily="var(--font-heading, sans-serif)"
                fill={
                  num === 12 || num === 3 || num === 6 || num === 9
                    ? "#0f172a"
                    : "#64748b"
                }
              >
                {num}
              </text>
            );
          })}

          {/* Hour Hand (Kim ngắn - Chỉ giờ) - Bold Orange */}
          <g transform={`rotate(${hourAngle}, ${cx}, ${cy})`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 48}
              stroke="#ea580c"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx},${cy - 52} ${cx - 5},${cy - 42} ${cx + 5},${cy - 42}`}
              fill="#ea580c"
            />
          </g>

          {/* Minute Hand (Kim dài - Chỉ phút) - Deep Blue */}
          <g transform={`rotate(${minuteAngle}, ${cx}, ${cy})`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - 68}
              stroke="#0284c7"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx},${cy - 72} ${cx - 4},${cy - 62} ${cx + 4},${cy - 62}`}
              fill="#0284c7"
            />
          </g>

          {/* Center Pin */}
          <circle
            cx={cx}
            cy={cy}
            r="6"
            fill="#1e293b"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx={cx} cy={cy} r="2.5" fill="#facc15" />
        </svg>
      </div>

      {/* Labels / Callouts */}
      {showLabels && (
        <div className="clock-labels-pill-row">
          <div className="clock-label-pill clock-label-hour">
            <span className="clock-dot-hour">🔴</span>
            <span>
              <strong>Kim ngắn:</strong> Chỉ <strong>GIỜ</strong> (chạy chậm)
            </span>
          </div>
          <div className="clock-label-pill clock-label-minute">
            <span className="clock-dot-minute">🔵</span>
            <span>
              <strong>Kim dài:</strong> Chỉ <strong>PHÚT</strong> (chạy nhanh)
            </span>
          </div>
        </div>
      )}

      {timeText && (
        <div className="clock-time-badge" style={{ borderColor: frameColor }}>
          <span>⏰ {timeText}</span>
        </div>
      )}
    </div>
  );
}

function ShapeGraphic({ shape, label }) {
  if (shape === "square") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <rect
            x="25"
            y="25"
            width="110"
            height="110"
            rx="8"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <text
            x="80"
            y="85"
            textAnchor="middle"
            fill="#1e40af"
            fontWeight="800"
            fontSize="14"
          >
            Hình vuông
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "circle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <circle
            cx="80"
            cy="80"
            r="55"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="3"
          />
          <text
            x="80"
            y="85"
            textAnchor="middle"
            fill="#854d0e"
            fontWeight="800"
            fontSize="14"
          >
            Hình tròn
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "triangle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <polygon
            points="80,20 20,135 140,135"
            fill="#fce7f3"
            stroke="#db2777"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text
            x="80"
            y="105"
            textAnchor="middle"
            fill="#9d174d"
            fontWeight="800"
            fontSize="14"
          >
            Hình tam giác
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "rectangle") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 200 140" width="180" height="120">
          <rect
            x="20"
            y="25"
            width="160"
            height="90"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="3"
          />
          <text
            x="100"
            y="75"
            textAnchor="middle"
            fill="#15803d"
            fontWeight="800"
            fontSize="14"
          >
            Hình chữ nhật
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  if (shape === "cube") {
    return (
      <div className="shape-graphic-card">
        <svg viewBox="0 0 160 160" width="140" height="140">
          <polygon
            points="80,25 130,55 80,85 30,55"
            fill="#bae6fd"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <polygon
            points="30,55 80,85 80,140 30,110"
            fill="#7dd3fc"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <polygon
            points="80,85 130,55 130,110 80,140"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <text
            x="80"
            y="155"
            textAnchor="middle"
            fill="#0369a1"
            fontWeight="800"
            fontSize="13"
          >
            Khối lập phương
          </text>
        </svg>
        {label && <span className="shape-label-text">{label}</span>}
      </div>
    );
  }
  return null;
}

function UniversalVisualGrid({ items = [], onCardClick }) {
  const [activeIdx, setActiveIdx] = useState(null);

  const handleCardClick = (item, idx) => {
    setActiveIdx(idx);
    soundManager.playClick();
    if (onCardClick) {
      onCardClick(item, idx);
    } else {
      const textToSpeak = `${item.period || item.title || ""}: ${item.timeText || ""}. ${item.desc || ""}`;
      speechHelper.speak(textToSpeak);
    }
  };

  return (
    <div className="universal-visual-grid">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className={`visual-grid-card ${activeIdx === idx ? "is-active" : ""}`}
          onClick={() => handleCardClick(item, idx)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.period && (
            <div
              className="visual-card-period-tag"
              style={{ borderLeftColor: item.clock?.frameColor || "#3b82f6" }}
            >
              <span>{item.period}</span>
            </div>
          )}
          {item.clock && (
            <div className="visual-card-clock">
              <ClockGraphic
                hour={item.clock.hour}
                minute={item.clock.minute}
                shape={item.clock.shape || "circle"}
                frameColor={item.clock.frameColor || "#3b82f6"}
                showLabels={false}
                size="sm"
              />
            </div>
          )}
          {item.timeText && (
            <div
              className="visual-card-time-pill"
              style={{ borderColor: item.clock?.frameColor || "#cbd5e1" }}
            >
              ⏰ {item.timeText}
            </div>
          )}
          {item.desc && <p className="visual-card-desc">{item.desc}</p>}
          <div className="visual-card-tap-hint">
            <Volume2 size={13} />
            <span>Chạm để nghe</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function MultiVisualGallery({ title, items = [] }) {
  const [activeId, setActiveId] = useState(null);

  const handleItemClick = (item, idx) => {
    setActiveId(idx);
    soundManager.playClick();
    const text = `${item.label || ""}: ${item.timeText || item.title || ""}`;
    speechHelper.speak(text);
  };

  return (
    <div className="multi-visual-gallery-wrap">
      {title && <h3 className="gallery-section-title">{title}</h3>}
      <div className="multi-visual-gallery">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className={`gallery-card ${activeId === idx ? "is-selected" : ""}`}
            onClick={() => handleItemClick(item, idx)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {item.badge && (
              <span className="gallery-card-badge">{item.badge}</span>
            )}
            {item.clock && (
              <ClockGraphic
                hour={item.clock.hour}
                minute={item.clock.minute}
                frameColor={item.clock.frameColor || "#3b82f6"}
                shape={item.clock.shape || "circle"}
                showLabels={false}
                size="sm"
              />
            )}
            {item.label && <h4 className="gallery-card-label">{item.label}</h4>}
            {item.timeText && (
              <div className="gallery-card-time">⏰ {item.timeText}</div>
            )}
            <div className="gallery-card-speak-badge">
              <Volume2 size={12} />
              <span>Chạm nghe</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DialogueScene({ content, onAnswerRecorded, isFullSlide = false }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const feedbackRef = useRef(null);

  // Auto-scroll feedback into view when revealed (above sticky bottom nav)
  useEffect(() => {
    if (feedbackState && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 120);
    }
  }, [feedbackState]);

  const characters = {
    nam: { name: "Bạn Nam", avatar: "👦" },
    mai: { name: "Bạn Mai", avatar: "👧" },
    robot: { name: "Bạn Rô-bốt", avatar: "🤖" },
    viet: { name: "Bạn Việt", avatar: "👦" },
    mi: { name: "Bạn Mi", avatar: "👧" },
    owl: { name: "Cú Mèo", avatar: "🦉" },
  };

  const handleSpeakDialogue = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
      return;
    }
    const lines = [];
    if (content.title) lines.push(content.title);
    if (content.dialogueList) {
      content.dialogueList.forEach((d) => {
        lines.push(`${d.name || d.character}: "${d.text}"`);
      });
    }
    if (content.question) lines.push(`Câu hỏi: ${content.question}`);
    speechHelper.speak(
      lines.join(". "),
      () => setSpeaking(true),
      () => setSpeaking(false),
    );
  };

  const handleOptionClick = (opt) => {
    if (feedbackState) return;
    setSelectedOption(opt);
    const isCorrect =
      opt === content.correctAnswer ||
      (content.isTrue && (opt.includes("Đúng") || opt === true)) ||
      (!content.isTrue && (opt.includes("Sai") || opt === false));

    if (isCorrect) {
      soundManager.playCorrect();
      setFeedbackState("correct");
      fireConfetti();
      speechHelper.speak(
        content.explanation || "Chính xác! Bé rất thông minh!",
      );
      if (onAnswerRecorded) onAnswerRecorded(true);
    } else {
      soundManager.playWrong();
      setFeedbackState("wrong");
      speechHelper.speak(
        content.explanation || "Chưa đúng rồi, bé hãy quan sát kỹ lại nhé!",
      );
      if (onAnswerRecorded) onAnswerRecorded(false);
    }
  };

  return (
    <div
      className={`dialogue-scene-card ${isFullSlide ? "is-full-slide" : ""}`}
    >
      <div className="dialogue-header">
        <div className="concept-tag">
          <MessageCircle size={18} />
          <span>{content.badge || "Giao Lưu Lớp Học"}</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeakDialogue}
          title="Nghe đối thoại"
        >
          <Volume2 size={20} />
          <span>Nghe đối thoại</span>
        </button>
      </div>

      {content.title && <h2 className="concept-title">{content.title}</h2>}

      {/* Focus Graphic (e.g. Clock showing 12h) */}
      {content.focusGraphic && (
        <div className="dialogue-focus-graphic">
          {content.focusGraphic.type === "clock" && (
            <ClockGraphic
              hour={content.focusGraphic.hour}
              minute={content.focusGraphic.minute}
              frameColor={content.focusGraphic.frameColor || "#eab308"}
              shape={content.focusGraphic.shape || "circle"}
              timeText={content.focusGraphic.timeText}
              showLabels={content.focusGraphic.showLabels || false}
              size={content.focusGraphic.size || "md"}
            />
          )}
        </div>
      )}

      {/* Classroom Speech Bubbles Stream */}
      <div className="dialogue-bubbles-stream">
        {content.dialogueList?.map((item, idx) => {
          const char = characters[item.character] || {
            name: item.name,
            avatar: "💬",
          };
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`dialogue-item ${isLeft ? "align-left" : "align-right"}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="dialogue-avatar-wrap">
                <span className="dialogue-avatar">{char.avatar}</span>
                <span className="dialogue-char-name">
                  {item.name || char.name}
                </span>
              </div>
              <div
                className={`dialogue-bubble ${isLeft ? "bubble-left" : "bubble-right"}`}
              >
                <p className="dialogue-text">"{item.text}"</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Question Section */}
      {content.question && (
        <div className="dialogue-interaction-box">
          <h4 className="dialogue-question-title">❓ {content.question}</h4>
          <div className="dialogue-options-row">
            {(content.options || ["Đúng rồi 👍", "Sai rồi 👎"]).map(
              (opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dialogue-opt-btn ${selectedOption === opt ? (feedbackState === "correct" ? "opt-correct" : "opt-wrong") : ""}`}
                  onClick={() => handleOptionClick(opt)}
                  disabled={feedbackState !== null}
                >
                  {opt}
                </button>
              ),
            )}
          </div>

          {feedbackState && (
            <motion.div
              ref={feedbackRef}
              className={`dialogue-feedback-card ${feedbackState === "correct" ? "is-correct" : "is-wrong"}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="feedback-header">
                <span>
                  {feedbackState === "correct"
                    ? "🎉 Giỏi lắm! +10 Xu"
                    : "💡 Cùng xem lại nhé:"}
                </span>
              </div>
              <p className="feedback-body">{content.explanation}</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function DialogueSlide({ content, onAnswerRecorded }) {
  return (
    <DialogueScene
      content={content}
      onAnswerRecorded={onAnswerRecorded}
      isFullSlide={true}
    />
  );
}

function ConceptSlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      const parts = [content.title];
      if (content.explanation) parts.push(content.explanation);
      if (content.rule && content.rule !== content.explanation)
        parts.push(content.rule);
      if (content.points) parts.push(content.points.join(". "));
      if (content.activityGrid) {
        content.activityGrid.forEach((item) => {
          parts.push(
            `${item.period || item.title || ""}: ${item.timeText || ""}. ${item.desc || ""}`,
          );
        });
      }
      if (content.gallery) {
        content.gallery.forEach((item) => {
          parts.push(`${item.label || ""}: ${item.timeText || ""}`);
        });
      }
      if (content.example) {
        const ex = content.example;
        const exText =
          ex.text ||
          `${ex.question ? ex.question + ". " : ""}${ex.explanation || ""}`;
        parts.push(`Ví dụ: ${exText}`);
      }
      const text = parts.filter(Boolean).join(". ");
      speechHelper.speak(
        text,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  // Check if explanation and rule are identical or redundant
  const showExplanation =
    content.explanation &&
    (!content.rule || content.explanation.trim() !== content.rule.trim());

  return (
    <div className="slide-concept-card">
      <div className="concept-header-banner">
        <div className="concept-tag">
          <Lightbulb size={18} />
          <span>{content.badge || "Khám Phá Cùng Bé"}</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeak}
          title="Nghe cô đọc bài học"
        >
          <Volume2 size={20} />
          <span>Nghe giảng</span>
        </button>
      </div>

      {content.title && <h2 className="concept-title">{content.title}</h2>}

      {/* 1. VISUAL HERO CENTER (Always prioritized first) */}
      {content.clock && (
        <ClockGraphic
          hour={content.clock.hour}
          minute={content.clock.minute}
          showLabels={content.clock.showLabels !== false}
          timeText={content.clock.timeText}
          frameColor={content.clock.frameColor || "#3b82f6"}
          shape={content.clock.shape || "circle"}
          size={content.clock.size || "lg"}
        />
      )}

      {content.shape && (
        <ShapeGraphic shape={content.shape} label={content.shapeLabel} />
      )}

      {/* 1b. UNIVERSAL VISUAL GRID (1-1 Visual Mapping) */}
      {content.activityGrid && (
        <UniversalVisualGrid items={content.activityGrid} />
      )}

      {/* 1c. MULTI-VISUAL GALLERY */}
      {content.gallery && (
        <MultiVisualGallery
          title={content.galleryTitle}
          items={content.gallery}
        />
      )}

      {/* 1d. EMBEDDED DIALOGUE SCENE */}
      {content.dialogue && <DialogueScene content={content.dialogue} />}

      {/* 2. CONCISE EXPLANATION (Only when not redundant with rule) */}
      {showExplanation && (
        <p className="concept-explanation">{content.explanation}</p>
      )}

      {/* 3. STEP BY STEP CARDS */}
      {content.steps && (
        <div className="concept-steps-grid">
          {content.steps.map((step, i) => (
            <motion.div
              key={i}
              className="concept-step-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="concept-step-badge">Bước {i + 1}</span>
              <h4 className="concept-step-title">{step.title}</h4>
              <p className="concept-step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. HIGHLIGHTED RULE PILL / BANNER */}
      {content.rule && (
        <motion.div
          className="concept-rule-box"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <span className="concept-rule-icon">⭐</span>
          <p className="concept-rule-body">{content.rule}</p>
        </motion.div>
      )}

      {/* 5. FRIENDLY WORKED EXAMPLE (Warm speech bubble with mascot) */}
      {content.example && (
        <div className="concept-example-box">
          <span className="concept-example-mascot">
            <MascotIcon size={32} />
          </span>
          <div className="concept-example-body">
            <span className="concept-example-tag">Ví dụ cùng bé:</span>
            <p className="concept-example-text">
              {content.example.text ? (
                content.example.text
              ) : (
                <>
                  {content.example.question && (
                    <span>{content.example.question} </span>
                  )}
                  {content.example.explanation && (
                    <strong>👉 {content.example.explanation}</strong>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* 6. BULLET POINTS */}
      {content.points && (
        <div className="concept-points-list">
          {content.points.map((pt, i) => (
            <div key={i} className="concept-point-item">
              <span className="concept-point-dot">✔</span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function QuizSlide({
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
      <div className="quiz-header-banner">
        <span className="quiz-badge">❓ Câu Hỏi Thử Thách</span>
        <div className="quiz-header-actions">
          <button
            type="button"
            className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
            onClick={handleSpeak}
            title="Nghe đọc câu hỏi"
          >
            <Volume2 size={19} />
            <span>Nghe đọc</span>
          </button>
          <ReportQuestionButton
            lessonId={lessonId}
            slideIndex={slideIndex}
            questionText={content.question}
            correctAnswer={content.answer}
          />
        </div>
      </div>

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

      <div className="quiz-options">
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

function SummarySlide({ content }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop();
      setSpeaking(false);
    } else {
      const fullText = `${content.title}. ${content.points ? content.points.join(". ") : ""}`;
      speechHelper.speak(
        fullText,
        () => setSpeaking(true),
        () => setSpeaking(false),
      );
    }
  };

  return (
    <div className="slide-summary-card">
      <div className="summary-header-banner">
        <div className="summary-celebrate-badge">
          <Award size={18} />
          <span>Tổng Kết Bài Học</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? "is-playing" : ""}`}
          onClick={handleSpeak}
          title="Nghe đọc tổng kết"
        >
          <Volume2 size={19} />
          <span>Nghe đọc</span>
        </button>
      </div>

      <h2 className="summary-title">{content.title}</h2>

      <div className="summary-points">
        {content.points.map((point, i) => (
          <motion.div
            key={i}
            className="summary-point"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="point-bullet">⭐</span>
            <span className="point-text">{point}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
