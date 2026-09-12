import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar, { StarsDisplay } from '../components/ui/ProgressBar'
import MascotBubble from '../components/mascot/MascotBubble'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import curriculum from '../data/curriculum'
import soundManager from '../utils/soundManager'
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
  const { addCoins, addXp } = useUserStore()
  const { completeLesson } = useProgressStore()

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

  const handleNext = () => {
    if (isLastSlide) {
      // Finish lesson
      const stars = totalQuizzes === 0 ? 3 :
        correctAnswers === totalQuizzes ? 3 :
        correctAnswers >= totalQuizzes * 0.6 ? 2 : 1

      completeLesson(lessonId, stars)
      addCoins(20)
      addXp(50)
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
    } else {
      soundManager.playWrong()
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

          <StarsDisplay stars={stars} maxStars={3} size="lg" />

          <div className="result-stats">
            <div className="result-stat">
              <span className="result-stat-value number">{correctAnswers}/{totalQuizzes}</span>
              <span className="result-stat-label">Câu đúng</span>
            </div>
            <div className="result-stat">
              <span className="result-stat-value number">+20</span>
              <span className="result-stat-label">🪙 Xu</span>
            </div>
            <div className="result-stat">
              <span className="result-stat-value number">+50</span>
              <span className="result-stat-label">⚡ XP</span>
            </div>
          </div>

          <div className="result-actions">
            <Button variant="primary" size="lg" onClick={() => navigate(-1)}>
              Tiếp tục học →
            </Button>
            <Button variant="ghost" size="md" onClick={() => {
              setCurrentSlide(0)
              setQuizAnswers({})
              setShowResult(false)
              setSelectedAnswer(null)
              setAnswerFeedback(null)
            }}>
              Học lại
            </Button>
          </div>
        </div>

        <MascotBubble
          text={stars === 3 ? 'Tuyệt vời! Bạn giỏi quá! 🌟' : 'Cố gắng thêm nhé! 💪'}
          mood={stars === 3 ? 'celebrate' : 'encourage'}
          position="bottom-right"
        />
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
        <span className="lesson-slide-count number">
          {currentSlide + 1}/{totalSlides}
        </span>
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
          variant="ghost"
          size="md"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          <ArrowLeft size={18} /> Trước
        </Button>

        <Button
          variant={isLastSlide ? 'success' : 'primary'}
          size="lg"
          onClick={handleNext}
          disabled={!canGoNext}
          glow={canGoNext && isQuizSlide}
        >
          {isLastSlide ? '🎉 Hoàn thành' : 'Tiếp tục'}
          {!isLastSlide && <ArrowRight size={18} />}
        </Button>
      </div>
    </div>
  )
}

// ---- Slide Components ----

function StorySlide({ content }) {
  return (
    <div className="slide-story">
      <MascotBubble
        text={content.text}
        mood={content.mascotMood || 'happy'}
        position="inline"
        size="lg"
      />
    </div>
  )
}

function VisualSlide({ content }) {
  return (
    <div className="slide-visual">
      <p className="slide-visual-text">{content.text}</p>

      {content.items && (
        <div className="visual-items">
          {content.items.map((item, i) => (
            <div key={i} className="visual-item-group">
              {item.label && <span className="visual-label">{item.label}</span>}
              <div className="visual-emojis">
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
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
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
  return (
    <div className="slide-quiz">
      <h2 className="quiz-question">{content.question}</h2>

      {content.items && (
        <div className="visual-items quiz-visual">
          {content.items.map((item, i) => (
            <div key={i} className="visual-emojis">
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
              whileHover={!feedback ? { scale: 1.05 } : {}}
              whileTap={!feedback ? { scale: 0.95 } : {}}
            >
              <span className="number quiz-option-text">
                {typeof option === 'number' ? option : option}
              </span>
              {feedback && isCorrect && <CheckCircle2 size={20} className="quiz-icon-correct" />}
              {feedback && isSelected && !isCorrect && <XCircle size={20} className="quiz-icon-wrong" />}
            </motion.button>
          )
        })}
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`quiz-feedback quiz-feedback-${feedback}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {feedback === 'correct' ? (
              <>🎉 Chính xác! Giỏi lắm!</>
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
  return (
    <div className="slide-summary">
      <h2>{content.title}</h2>
      <div className="summary-points">
        {content.points.map((point, i) => (
          <motion.div
            key={i}
            className="summary-point"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            {point}
          </motion.div>
        ))}
      </div>
      <MascotBubble
        text="Hãy nhớ những điều này nhé!"
        mood={content.mascotMood || 'proud'}
        position="inline"
        size="md"
      />
    </div>
  )
}
