// File này là PHẦN KHUNG (shell) — các slide/hình đã tách sang thư mục cùng tên.
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
import VisualBlocks from "../components/visuals/VisualBlock";
import { InteractiveContext } from "../components/visuals/interactiveFill";
import useUserStore from "../store/useUserStore";
import useProgressStore from "../store/useProgressStore";
import useAuthStore from "../store/useAuthStore";
import { getReward } from "../services/rewardService";
import curriculum from "../data/curriculum";
import {
  baoDangTrongBaiHoc,
  ngheNoiDung,
  taiNoiDung,
} from "../data/contentSource";
import { faceOf } from "../data/mascotFaces";
import soundManager from "../utils/soundManager";
import speechHelper from "../utils/speechHelper";
import fireConfetti from "../utils/confettiHelper";
import {
  logLessonOpen,
  logSlideReach,
  logLessonDone,
} from "../services/appEvents";
import "./LessonPage.css";
import { ConceptSlide } from "./lesson/conceptSlide.jsx";
import { DialogueSlide } from "./lesson/dialogueSlides.jsx";
import { QuizSlide } from "./lesson/quizSlide.jsx";
import { StorySlide } from "./lesson/storySlide.jsx";
import { SummarySlide } from "./lesson/summarySlide.jsx";
import { VisualSlide } from "./lesson/visualSlide.jsx";

// Sáu kiểu slide mà màn hình này ĐỌC ĐƯỢC — khớp đúng 6 nhánh vẽ bên dưới và danh
// sách `SLIDE_TYPES` của Admin. Dùng để nhận ra slide lạ thay vì vẽ ra thẻ trống.
const LOAI_SLIDE_HOP_LE = [
  "story",
  "concept",
  "visual",
  "dialogue",
  "quiz",
  "summary",
];

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
  const coBaiHoc = Boolean(found);

  // Đang trong bài thì `contentSource` KHÔNG được đổi cây rồi bắt app render lại —
  // bé sẽ bị đẩy về slide 1 giữa bài. Khai lúc vào, gỡ lúc ra.
  //
  // 🔴 Nhưng khi KHÔNG tìm thấy bài thì phải khai `false`: đó chính là điều kiện để
  //    màn hình "không tìm thấy bài" tự chữa (effect ngay dưới). Khai `true` ở đây
  //    sẽ khoá luôn đường tự chữa đó — và khoá im lặng, không báo lỗi gì.
  useEffect(() => {
    baoDangTrongBaiHoc(coBaiHoc);
    return () => baoDangTrongBaiHoc(false);
  }, [coBaiHoc]);

  /**
   * 🔴 BÀI KHÔNG CÓ TRONG CÂY ĐANG DÙNG — tự thử lại một lần, và tự vẽ lại.
   *
   * Hai tình huống rất khác nhau cùng dẫn tới màn hình này:
   *   • **Cache còn cũ**: bài vẫn nằm trong DB, nhưng cây trong `localStorage` chưa
   *     được cập nhật (số phiên bản vừa đổi). Tải lại là thấy bài, không cần bé làm gì.
   *   • **Bài đã bị xoá trong DB**: tải lại cũng không có. Màn hình vẫn đứng nguyên,
   *     nhưng đứng yên một cách ĐÚNG — không phải màn hình lỗi, và tiến độ đã học của
   *     bé còn nguyên (xoá bài không xoá `completedLessons`).
   *
   * `force: true` chỉ bỏ qua chốt chặn 5 giây, **không** bỏ qua phép so
   * `content_version` — cố ý: tải lại ~800 KB vì một đường dẫn gõ sai là không đáng.
   *
   * Vì cây mới được báo về qua `ngheNoiDung`, việc tăng `lanThuLai` chỉ để React vẽ
   * lại — sau đó `findLesson` chạy lại và tự quyết định.
   */
  const [, setLanThuLai] = useState(0);
  const daThuTaiLai = useRef(false);
  useEffect(() => {
    if (coBaiHoc) return;
    const huy = ngheNoiDung(() => setLanThuLai((n) => n + 1));
    if (!daThuTaiLai.current) {
      daThuTaiLai.current = true;
      taiNoiDung({ force: true });
    }
    return huy;
  }, [coBaiHoc]);
  const [currentSlide, setCurrentSlide] = useState(0);
  // GĐ 2b — mốc bắt đầu làm câu hỏi của slide hiện tại, dùng để tính `ms`
  // gửi lên `question_attempts`. Sang slide khác thì tính lại.
  const slideStartedAt = useRef(Date.now());
  useEffect(() => {
    slideStartedAt.current = Date.now();
    // Đợt 5.1 — bé tới slide nào (biết bé dừng lại ở đâu). Không chặn giao diện.
    logSlideReach(lessonId, currentSlide, found?.grade?.id);
    // `found` khai báo ở dưới trong cùng phạm vi hàm: effect chạy SAU khi render xong
    // nên giá trị đã sẵn sàng.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Đợt 5.1 — bé mở bài nào (1 lần cho mỗi bài).
  useEffect(() => {
    logLessonOpen(lessonId, found?.grade?.id);
  }, [lessonId, found?.grade?.id]);
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
        <p style={{ maxWidth: 460, textAlign: "center", opacity: 0.75 }}>
          Bài này có thể đã được người quản trị rút hoặc xoá. Tiến độ bé đã học
          vẫn được giữ nguyên — bé chọn một bài khác ở trang chủ nhé.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outline"
            onClick={() => {
              setLanThuLai((n) => n + 1);
              taiNoiDung({ force: true });
            }}
          >
            Thử tải lại nội dung
          </Button>
          <Button onClick={() => navigate("/")}>Về trang chủ</Button>
        </div>
      </div>
    );
  }

  // 🔴 BÀI KHÔNG CÓ SLIDE NÀO — phải chặn TRƯỚC khi đọc `slide.type`.
  //    Tới đây thì `found` đã có, nên trước đây màn hình chạy thẳng vào
  //    `{slide.type === "story" && …}` với `slide === undefined` ⇒ trắng trang kèm
  //    `Cannot read properties of undefined (reading 'type')`.
  //    Xảy ra thật khi một dòng `content_lessons` có `payload = null` hoặc
  //    `payload.slides = []` — đúng thứ một lệnh `UPDATE`/`INSERT` tay trong SQL
  //    Editor tạo ra được, và cũng là trạng thái của một bài vừa bị rút nội dung.
  if (totalSlides === 0) {
    return (
      <div className="page-empty">
        <span style={{ fontSize: "4rem" }}>🧩</span>
        <h2>Bài này chưa có nội dung</h2>
        <p style={{ maxWidth: 460, textAlign: "center", opacity: 0.75 }}>
          Người quản trị chưa thêm slide nào cho bài này. Bé chọn một bài khác ở
          trang chủ nhé.
        </p>
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
      // Đợt 5.1 — bé làm xong bài, kèm số sao (biết bài nào khó).
      logLessonDone(lessonId, stars, found?.grade?.id);

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
              <p className="guest-result-text">
                ⚠️ Ở chế độ Khách, tiến độ học của bé{" "}
                <strong>không được lưu lại</strong> — mở lại app là bắt đầu từ
                đầu.
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
    <div
      className="lesson-page"
      /**
       * MÀU NHẤN CỦA HÌNH = MÀU CHƯƠNG (xem `visualTheme.js`).
       * Đặt ở đây một lần cho cả trang; mọi hình bên trong dùng `var(--figure-accent)`.
       */
      style={{ "--figure-accent": found?.chapter?.color || undefined }}
    >
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
          {slide.type === "story" && (
            <InteractiveContext.Provider value={true}>
              <StorySlide content={slide.content} />
            </InteractiveContext.Provider>
          )}

          {slide.type === "concept" && (
            <InteractiveContext.Provider value={true}>
              <ConceptSlide content={slide.content} />
            </InteractiveContext.Provider>
          )}

          {slide.type === "visual" && (
            <InteractiveContext.Provider value={true}>
              <VisualSlide content={slide.content} />
            </InteractiveContext.Provider>
          )}

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

          {/* 🔴 Slide có kiểu LẠ (dữ liệu bị sửa tay ngoài giao diện Admin, hoặc một
              kiểu mới mà bản app này chưa biết). Trước đây rơi vào đây là một thẻ
              TRẮNG — trông y như app hỏng, mà không có lỗi nào trong console. */}
          {!LOAI_SLIDE_HOP_LE.includes(slide.type) && (
            <div className="page-empty" style={{ minHeight: "auto" }}>
              <span style={{ fontSize: "2.5rem" }}>🧩</span>
              <p style={{ maxWidth: 420, textAlign: "center", opacity: 0.75 }}>
                Slide này có kiểu lạ ({String(slide.type ?? "không có kiểu")})
                nên app chưa đọc được. Bé bấm <strong>Tiếp tục</strong> để sang
                slide sau nhé.
              </p>
            </div>
          )}
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