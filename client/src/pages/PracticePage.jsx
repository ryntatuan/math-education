import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RotateCcw, Lightbulb, Flame, Award, CheckCircle2, XCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import MascotBubble from '../components/mascot/MascotBubble'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import { TOPICS, generateQuestion } from '../utils/exerciseGenerator'
import soundManager from '../utils/soundManager'
import confetti from 'canvas-confetti'
import './PracticePage.css'

export default function PracticePage() {
  const { grade: userGrade, addCoins, addXp } = useUserStore()
  const { addExerciseResult } = useProgressStore()

  const [selectedGrade, setSelectedGrade] = useState(userGrade || 1)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [sessionActive, setSessionActive] = useState(false)

  // Session state
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const TOTAL_QUESTIONS = 10

  const topicsList =
    selectedGrade === 1
      ? TOPICS.GRADE_1
      : selectedGrade === 2
      ? TOPICS.GRADE_2
      : TOPICS.GRADE_3

  const startSession = (topicId) => {
    setSelectedTopic(topicId)
    setQuestionIndex(0)
    setCorrectCount(0)
    setStreak(0)
    setTotalCoinsEarned(0)
    setIsFinished(false)
    setShowHint(false)
    setSelectedAnswer(null)
    setIsAnswered(false)

    const q = generateQuestion(selectedGrade, topicId)
    setCurrentQuestion(q)
    setSessionActive(true)
    soundManager.playClick()
  }

  const handleAnswer = (option) => {
    if (isAnswered) return

    setSelectedAnswer(option)
    setIsAnswered(true)

    const correct = option === currentQuestion.answer
    setIsCorrect(correct)

    if (correct) {
      soundManager.playCorrect()
      const newStreak = streak + 1
      setStreak(newStreak)
      setCorrectCount((prev) => prev + 1)
      const bonus = newStreak >= 3 ? 15 : 10
      setTotalCoinsEarned((prev) => prev + bonus)
      addCoins(bonus)
      addXp(20)
    } else {
      soundManager.playWrong()
      setStreak(0)
    }
  }

  const nextQuestion = () => {
    soundManager.playClick()
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      // Finished
      setIsFinished(true)
      soundManager.playFanfare()
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } })
      addExerciseResult(`grade${selectedGrade}_practice`, {
        score: correctCount,
        total: TOTAL_QUESTIONS,
        topic: selectedTopic,
      })
    } else {
      setQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowHint(false)
      const nextQ = generateQuestion(selectedGrade, selectedTopic)
      setCurrentQuestion(nextQ)
    }
  }

  // If in practice session
  if (sessionActive && !isFinished) {
    return (
      <div className="practice-session-container">
        {/* Top Header */}
        <div className="practice-header">
          <button
            className="btn-back"
            onClick={() => {
              setSessionActive(false)
              soundManager.playClick()
            }}
          >
            <ArrowLeft size={18} />
            <span>Thoát</span>
          </button>

          <div className="practice-progress-box">
            <span className="practice-question-counter">
              Câu {questionIndex + 1}/{TOTAL_QUESTIONS}
            </span>
            <ProgressBar
              value={questionIndex + 1}
              max={TOTAL_QUESTIONS}
              variant="primary"
              size="md"
            />
          </div>

          <div className="practice-streak-badge">
            <Flame
              size={22}
              className={streak >= 3 ? 'flame-hot animated' : 'flame-normal'}
            />
            <span>{streak}</span>
          </div>
        </div>

        {/* Question Area */}
        {currentQuestion && (
          <motion.div
            key={questionIndex}
            className="practice-card-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="practice-question-title">
              <h2>{currentQuestion.question}</h2>
            </div>

            {currentQuestion.visualDisplay && (
              <div className="practice-visual-display">
                {currentQuestion.visualDisplay}
              </div>
            )}

            {/* Answer Options */}
            <div className="practice-options-grid">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = 'option-btn'
                if (isAnswered) {
                  if (option === currentQuestion.answer) {
                    btnStyle += ' option-correct'
                  } else if (option === selectedAnswer) {
                    btnStyle += ' option-wrong'
                  } else {
                    btnStyle += ' option-disabled'
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    className={btnStyle}
                    whileHover={!isAnswered ? { scale: 1.03 } : {}}
                    whileTap={!isAnswered ? { scale: 0.97 } : {}}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span className="option-label number">{option}</span>
                    {isAnswered && option === currentQuestion.answer && (
                      <CheckCircle2 size={24} className="icon-status" />
                    )}
                    {isAnswered &&
                      option === selectedAnswer &&
                      option !== currentQuestion.answer && (
                        <XCircle size={24} className="icon-status" />
                      )}
                  </motion.button>
                )
              })}
            </div>

            {/* Feedback & Actions */}
            <div className="practice-footer">
              {!isAnswered ? (
                <div className="hint-container">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hint-btn"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb size={18} /> {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                  </Button>
                  {showHint && (
                    <motion.p
                      className="hint-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      💡 {currentQuestion.hint}
                    </motion.p>
                  )}
                </div>
              ) : (
                <motion.div
                  className="feedback-banner"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="feedback-message">
                    {isCorrect ? (
                      <span className="msg-correct">
                        🎉 Xuất sắc! Bạn trả lời đúng rồi!
                      </span>
                    ) : (
                      <span className="msg-wrong">
                        💪 Chưa chính xác. {currentQuestion.explanation}
                      </span>
                    )}
                  </div>
                  <Button variant="primary" size="md" onClick={nextQuestion}>
                    {questionIndex + 1 >= TOTAL_QUESTIONS ? 'Xem kết quả' : 'Câu tiếp theo →'}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Mascot companion */}
        <MascotBubble
          mood={
            isAnswered
              ? isCorrect
                ? streak >= 3
                  ? 'excited'
                  : 'happy'
                : 'think'
              : 'encourage'
          }
          text={
            isAnswered
              ? isCorrect
                ? streak >= 3
                  ? 'Siêu đỉnh! Đang có chuỗi đúng cực bốc! 🔥'
                  : 'Làm tốt lắm, tiếp tục nhé! 🌟'
                : 'Đừng nản, thử câu sau nào bạn ơi! 🦉'
              : 'Tập trung tính toán cẩn thận nha! ✏️'
          }
          position="bottom-right"
        />
      </div>
    )
  }

  // Summary Result Screen
  if (isFinished) {
    const accuracy = Math.round((correctCount / TOTAL_QUESTIONS) * 100)
    return (
      <motion.div
        className="practice-result-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="result-header">
          <span className="celebration-icon">
            {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '🌟' : '🌱'}
          </span>
          <h1>{accuracy >= 80 ? 'Thành tích xuất sắc!' : 'Luyện tập chăm chỉ!'}</h1>
          <p>Bạn đã hoàn thành phiên luyện tập 10 câu hỏi.</p>
        </div>

        <div className="result-stats-row">
          <div className="stat-box">
            <span className="stat-num number">{correctCount}/10</span>
            <span className="stat-desc">Câu trả lời đúng</span>
          </div>
          <div className="stat-box">
            <span className="stat-num number">{accuracy}%</span>
            <span className="stat-desc">Độ chính xác</span>
          </div>
          <div className="stat-box">
            <span className="stat-num number">+{totalCoinsEarned}</span>
            <span className="stat-desc">🪙 Xu vàng</span>
          </div>
        </div>

        <div className="result-actions">
          <Button
            variant="primary"
            size="lg"
            onClick={() => startSession(selectedTopic)}
          >
            <RotateCcw size={20} /> Luyện tập tiếp
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => {
              setSessionActive(false)
              setIsFinished(false)
              soundManager.playClick()
            }}
          >
            Chọn chủ đề khác
          </Button>
        </div>
      </motion.div>
    )
  }

  // Topic Selection Screen
  return (
    <div className="practice-page">
      <div className="practice-intro">
        <div className="practice-intro-text">
          <h1>✏️ Góc Luyện Tập Toán Học</h1>
          <p>
            Chọn chủ đề và thử thách tính nhẩm 10 câu để tích lũy xu vàng và nâng cấp độ!
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="grade-selector-tabs">
          {[1, 2, 3].map((g) => (
            <button
              key={g}
              className={`grade-tab-btn ${selectedGrade === g ? 'active' : ''}`}
              onClick={() => {
                setSelectedGrade(g)
                soundManager.playClick()
              }}
            >
              Lớp {g}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="topics-grid">
        {topicsList.map((t, idx) => (
          <motion.div
            key={t.id}
            className="topic-card"
            whileHover={{ y: -6, boxShadow: 'var(--shadow-xl)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startSession(t.id)}
          >
            <div className="topic-icon-wrap">{t.icon}</div>
            <div className="topic-content">
              <h3>{t.name}</h3>
              <span className="topic-badge">10 câu hỏi tương tác</span>
            </div>
            <Button variant="primary" size="sm" className="topic-start-btn">
              Bắt đầu →
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
