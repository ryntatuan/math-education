import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Volume2, Sparkles, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar, { StarsDisplay } from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import curriculum from '../data/curriculum'
import soundManager from '../utils/soundManager'
import speechHelper from '../utils/speechHelper'
import syncService from '../services/syncService'
import confetti from 'canvas-confetti'
import './LessonPage.css'


// Find lesson across all grades/chapters
function findLesson(lessonId) {
  for (const grade of curriculum.grades) {
    for (const chapter of grade.chapters) {
      const lesson = chapter.lessons.find((l) => l.id === lessonId)
      if (lesson) return { lesson, chapter, grade }
    }
  }
  return null
}

export default function LessonPage() {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const { coins, addCoins, addXp, autoSpeakLesson, soundEnabled } = useUserStore()
  const { completeLesson, recordMistake, progressQuest } = useProgressStore()

  const found = findLesson(lessonId)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answerFeedback, setAnswerFeedback] = useState(null) // 'correct' | 'wrong' | null

  if (!found) {
    return (
      <div className="page-empty">
        <span style={{ fontSize: '4rem' }}>😕</span>
        <h2>Không tìm thấy bài học</h2>
        <Button onClick={() => navigate('/')}>Về trang chủ</Button>
      </div>
    )
  }

  const { lesson, chapter } = found
  const slides = lesson.slides
  const slide = slides[currentSlide]
  const totalSlides = slides.length
  const isLastSlide = currentSlide === totalSlides - 1
  const isQuizSlide = slide.type === 'quiz'

  // Count quiz slides and correct answers
  const quizSlides = slides.filter((s) => s.type === 'quiz')
  const totalQuizzes = quizSlides.length
  const correctAnswers = Object.values(quizAnswers).filter((a) => a.correct).length

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechHelper.stop()
    }
  }, [])

  // Auto-speak slide content if autoSpeakLesson is enabled
  useEffect(() => {
    speechHelper.stop()
    if (!autoSpeakLesson || !soundEnabled || showResult) return

    const timer = setTimeout(() => {
      const s = slides[currentSlide]
      if (!s) return

      let textToRead = ''
      if (s.type === 'quiz') {
        textToRead = s.content?.question || ''
      } else if (s.type === 'story' || s.type === 'visual') {
        textToRead = s.content?.text || ''
      } else if (s.type === 'concept') {
        textToRead = `${s.content?.title || ''}. ${s.content?.rule || ''}`
      } else if (s.type === 'summary') {
        textToRead = `${s.content?.title || ''}. ${s.content?.points ? s.content.points.join('. ') : ''}`
      }

      if (textToRead) {
        speechHelper.speak(textToRead)
      }
    }, 350)

    return () => {
      clearTimeout(timer)
      speechHelper.stop()
    }
  }, [currentSlide, autoSpeakLesson, soundEnabled, showResult, slides])

  const handleNext = () => {
    speechHelper.stop()
    if (isLastSlide) {
      // Finish lesson
      const stars = totalQuizzes === 0 ? 3 :
        correctAnswers === totalQuizzes ? 3 :
        correctAnswers >= totalQuizzes * 0.6 ? 2 : 1

      completeLesson(lessonId, stars)
      progressQuest('lesson_1', 1)
      progressQuest('stars_1', stars)
      addCoins(20)
      addXp(50)
      syncService.scheduleCloudSync()
      soundManager.playFanfare()
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })
      setShowResult(true)

    } else {
      soundManager.playClick()
      setCurrentSlide((prev) => prev + 1)
      setSelectedAnswer(null)
      setAnswerFeedback(null)
    }
  }

  const handlePrev = () => {
    speechHelper.stop()
    if (currentSlide > 0) {
      soundManager.playClick()
      setCurrentSlide((prev) => prev - 1)
      setSelectedAnswer(null)
      setAnswerFeedback(null)
    }
  }

  const handleQuizAnswer = (answer) => {
    if (answerFeedback) return // Already answered

    setSelectedAnswer(answer)
    const isCorrect = answer === slide.content.answer

    setAnswerFeedback(isCorrect ? 'correct' : 'wrong')
    setQuizAnswers((prev) => ({
      ...prev,
      [currentSlide]: { answer, correct: isCorrect },
    }))

    if (isCorrect) {
      soundManager.playCorrect()
      addCoins(10)
      progressQuest('quiz_1', 1)
    } else {
      soundManager.playWrong()
      recordMistake({
        lessonId,
        question: slide.content.question,
        options: slide.content.options,
        answer: slide.content.answer,
        explanation: slide.content.mascotHint || `Đáp án đúng là: ${slide.content.answer}`,
        grade: found?.grade?.id || 1,
        chapterTitle: found?.chapter?.name || 'Bài học',
      })
    }
  }

  const canGoNext = !isQuizSlide || answerFeedback !== null

  // Result Screen
  if (showResult) {
    const stars = totalQuizzes === 0 ? 3 :
      correctAnswers === totalQuizzes ? 3 :
      correctAnswers >= totalQuizzes * 0.6 ? 2 : 1

    return (
      <motion.div
        className="lesson-result"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="lesson-result-content">
          <motion.div
            className="result-emoji"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            {stars === 3 ? '🎉' : stars === 2 ? '👏' : '💪'}
          </motion.div>

          <h1>{stars === 3 ? 'Xuất sắc!' : stars === 2 ? 'Giỏi lắm!' : 'Tốt lắm!'}</h1>

          <div className="result-mascot-greeting">
            <span className="result-mascot-owl">🦉</span>
            <p className="result-mascot-message">
              {stars === 3
                ? 'Tuyệt vời! Bé đã hoàn thành bài học xuất sắc và nhận trọn vẹn phần thưởng!'
                : stars === 2
                ? 'Bé làm rất tốt! Hãy tiếp tục phát huy ở các bài học tiếp theo nhé!'
                : 'Cố gắng tuyệt vời! Bé đã hoàn thành bài học và nhận thêm điểm thưởng!'}
            </p>
          </div>

          <StarsDisplay stars={stars} maxStars={3} size="lg" />

          {/* Integrated Rewards Box */}
          <div className="result-rewards-card">
            <div className="result-reward-item">
              <span className="reward-icon">🪙</span>
              <div className="reward-info">
                <span className="reward-val number">+20</span>
                <span className="reward-label">Xu vàng</span>
              </div>
            </div>
            <div className="result-reward-item">
              <span className="reward-icon">⚡</span>
              <div className="reward-info">
                <span className="reward-val number">+50</span>
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

          <div className="result-actions">
            <Button variant="primary" size="lg" onClick={() => navigate(-1)} className="result-action-btn">
              Tiếp tục học →
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setCurrentSlide(0)
                setQuizAnswers({})
                setShowResult(false)
                setSelectedAnswer(null)
                setAnswerFeedback(null)
              }}
              className="result-action-btn"
            >
              Học lại bài này
            </Button>
          </div>

        </div>
      </motion.div>
    )
  }

  return (
    <div className="lesson-page">
      {/* Header */}
      <div className="lesson-header">
        <button
          className="btn-back-circle"
          onClick={() => {
            soundManager.playClick()
            navigate(-1)
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
          <span className="lesson-coins-pill number" title="Số xu hiện tại">
            🪙 {coins}
          </span>
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
          {slide.type === 'story' && (
            <StorySlide content={slide.content} />
          )}

          {slide.type === 'visual' && (
            <VisualSlide content={slide.content} />
          )}

          {slide.type === 'quiz' && (
            <QuizSlide
              content={slide.content}
              selectedAnswer={selectedAnswer}
              feedback={answerFeedback}
              onAnswer={handleQuizAnswer}
            />
          )}

          {slide.type === 'summary' && (
            <SummarySlide content={slide.content} />
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
          variant={isLastSlide ? 'success' : 'primary'}
          size="lg"
          iconRight={!isLastSlide ? <ArrowRight size={20} strokeWidth={2.5} /> : undefined}
          onClick={handleNext}
          disabled={!canGoNext}
          glow={canGoNext && isQuizSlide}
          className="lesson-nav-btn lesson-nav-btn-next"
        >
          {isLastSlide ? '🎉 Hoàn thành bài' : 'Tiếp tục'}
        </Button>
      </div>
    </div>
  )
}


// ---- Slide Components ----

function StorySlide({ content }) {
  const [speaking, setSpeaking] = useState(false)
  const moodEmoji = content.mascotMood === 'excited' ? '🤩' : content.mascotMood === 'proud' ? '😎' : content.mascotMood === 'thinking' ? '🤔' : '😊'

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop()
      setSpeaking(false)
    } else {
      speechHelper.speak(
        content.text,
        () => setSpeaking(true),
        () => setSpeaking(false)
      )
    }
  }

  return (
    <div className="slide-story-card">
      <div className="story-header-banner">
        <div className="story-card-top-tag">
          <Sparkles size={18} />
          <span>Bài Học Khám Phá</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? 'is-playing' : ''}`}
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
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="story-owl-emoji">🦉</span>
        <span className="story-mood-badge">{moodEmoji}</span>
      </motion.div>

      <div className="story-dialog-bubble">
        <p className="story-dialog-text">{content.text}</p>
      </div>
    </div>
  )
}

function VisualSlide({ content }) {
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop()
      setSpeaking(false)
    } else {
      speechHelper.speak(
        content.text,
        () => setSpeaking(true),
        () => setSpeaking(false)
      )
    }
  }

  return (
    <div className="slide-visual-card">
      <div className="visual-header-banner">
        <h2 className="slide-visual-text">{content.text}</h2>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? 'is-playing' : ''}`}
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
              <div className={`visual-emojis ${item.count <= 5 ? 'single-row-emojis' : 'ten-frame-emojis'}`}>
                {Array.from({ length: item.count }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="visual-emoji"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: j * 0.1, type: 'spring', stiffness: 300 }}
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
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
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

      {content.comparison && (
        <motion.div
          className="visual-operation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="number op-num">{content.comparison.left}</span>
          <span className="op-sign comparison-sign">{content.comparison.sign}</span>
          <span className="number op-num">{content.comparison.right}</span>
        </motion.div>
      )}
    </div>
  )
}

function QuizSlide({ content, selectedAnswer, feedback, onAnswer }) {
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop()
      setSpeaking(false)
    } else {
      speechHelper.speak(
        content.question,
        () => setSpeaking(true),
        () => setSpeaking(false)
      )
    }
  }

  return (
    <div className="slide-quiz-card">
      <div className="quiz-header-banner">
        <span className="quiz-badge">❓ Câu Hỏi Thử Thách</span>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? 'is-playing' : ''}`}
          onClick={handleSpeak}
          title="Nghe đọc câu hỏi"
        >
          <Volume2 size={19} />
          <span>Nghe đọc</span>
        </button>
      </div>

      <h2 className="quiz-question">{content.question}</h2>

      {content.items && (
        <div className="visual-items quiz-visual">
          {content.items.map((item, i) => (
            <div key={i} className={`visual-emojis ${item.count <= 5 ? 'single-row-emojis' : 'ten-frame-emojis'}`}>
              {Array.from({ length: item.count }).map((_, j) => (
                <motion.span
                  key={j}
                  className="visual-emoji"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: j * 0.08, type: 'spring' }}
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
          const isSelected = selectedAnswer === option
          const isCorrect = option === content.answer
          let optionClass = 'quiz-option'

          if (feedback) {
            if (isCorrect) optionClass += ' quiz-option-correct'
            else if (isSelected && !isCorrect) optionClass += ' quiz-option-wrong'
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
              <span className="quiz-option-text">
                {option}
              </span>
              {feedback && isCorrect && <CheckCircle2 size={24} className="quiz-icon-correct" />}
              {feedback && isSelected && !isCorrect && <XCircle size={24} className="quiz-icon-wrong" />}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`quiz-feedback quiz-feedback-${feedback}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback === 'correct' ? (
              <>🎉 Chính xác! Bé làm giỏi lắm!</>
            ) : (
              <>😊 Đáp án đúng là: <strong className="number">{content.answer}</strong>. {content.mascotHint}</>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SummarySlide({ content }) {
  const [speaking, setSpeaking] = useState(false)

  const handleSpeak = () => {
    if (speaking) {
      speechHelper.stop()
      setSpeaking(false)
    } else {
      const fullText = `${content.title}. ${content.points ? content.points.join('. ') : ''}`
      speechHelper.speak(
        fullText,
        () => setSpeaking(true),
        () => setSpeaking(false)
      )
    }
  }

  return (
    <div className="slide-summary-card">
      <div className="summary-header-banner">
        <div className="summary-celebrate-badge">
          <Award size={18} />
          <span>Tổng Kết Bài Học</span>
        </div>
        <button
          type="button"
          className={`lesson-mini-voice-btn ${speaking ? 'is-playing' : ''}`}
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
  )
}
