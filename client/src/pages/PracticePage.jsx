import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  RotateCcw,
  Flame,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Volume2,
} from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import CoinIcon from '../components/common/CoinIcon'
import GoogleIcon from '../components/common/GoogleIcon'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import { TOPICS, generateQuestion } from '../utils/exerciseGenerator'
import soundManager from '../utils/soundManager'
import speechHelper from '../utils/speechHelper'
import fireConfetti from '../utils/confettiHelper'
import RightSidebar from '../components/layout/RightSidebar'
import './HomePage.css'
import './PracticePage.css'

// Parse and format question visually, extracting emojis, SVG shapes, and equations
function parsePracticeQuestion(q) {
  if (!q) return { type: 'text_riddle', badge: '💡 Câu hỏi', title: '', content: '' }

  const visual = q.visualDisplay || q.shapeVisual || q.visual

  // 1. Has visual display (emojis to count, SVG shape, or real object icon)
  if (visual) {
    return {
      type: 'visual',
      title: q.question,
      visual,
    }
  }

  // 2. Question with colon (e.g. "Tính nhẩm: 8 + 5 = ?" or "Điền dấu: 15 ... 20")
  if (q.question && q.question.includes(':')) {
    const parts = q.question.split(':')
    const prompt = parts[0].trim() + ':'
    const equation = parts.slice(1).join(':').trim()
    return {
      type: 'calc',
      title: prompt,
      equation,
      icon: prompt.toLowerCase().includes('dấu') ? '⚖️' : '🧮',
    }
  }

  // 3. Math expression without colon (e.g. "12 + 5 = ?" or "15 - 7 = ?")
  const isMathExpr =
    q.question &&
    /^[\d\s+\-×x*÷/:=.<>?a-zA-Z]+$/.test(q.question) &&
    /[\d]/.test(q.question) &&
    /[+\-×x*÷/:=.<>]/.test(q.question)
  if (isMathExpr && q.question.length <= 25) {
    return {
      type: 'calc',
      title: 'Tính nhẩm:',
      equation: q.question,
      icon: '🧮',
    }
  }

  // 4. Word problem / Geometry / Riddle badges
  const textLow = (q.question || '').toLowerCase()
  let badge = '💡 Bài toán tư duy'
  if (
    textLow.includes('hình') ||
    textLow.includes('cạnh') ||
    textLow.includes('đo') ||
    textLow.includes('chu vi') ||
    textLow.includes('diện tích') ||
    textLow.includes('thể tích') ||
    textLow.includes('bán kính') ||
    textLow.includes('đường kính')
  ) {
    badge = '🔷 Câu hỏi hình học'
  } else if (textLow.includes('vận tốc') || textLow.includes('quãng đường') || textLow.includes('gặp nhau') || textLow.includes('đuổi kịp')) {
    badge = '🏎️ Bài toán chuyển động'
  } else if (textLow.includes('phân số') || textLow.includes('hỗn số')) {
    badge = '🍰 Bài toán phân số'
  } else if (textLow.includes('phần trăm') || textLow.includes('%')) {
    badge = '🏷️ Tỉ số phần trăm'
  } else if (textLow.includes('đổi:') || textLow.includes('tấn') || textLow.includes('tạ') || textLow.includes('yến') || textLow.includes('ha') || textLow.includes('thế kỉ')) {
    badge = '📏 Đại lượng & Đo lường'
  }

  return {
    type: 'text_riddle',
    badge,
    title: 'Câu hỏi:',
    content: q.question,
  }
}

export default function PracticePage() {
  const { isGuest, setAuthModalOpen } = useAuthStore()
  const { grade: userGrade, addCoins, addXp } = useUserStore()
  const {
    addExerciseResult,
    recordMistake,
    resolveMistake,
    getDueMistakes,
    mistakesQueue,
    progressQuest,
  } = useProgressStore()

  // Navigation tab: 'practice' | 'mistakes'
  const [mainTab, setMainTab] = useState('practice')

  // Practice state
  const [selectedGrade, setSelectedGrade] = useState(userGrade || 1)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [sessionActive, setSessionActive] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [streak, setStreak] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0)
  const [totalXpEarned, setTotalXpEarned] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // Mistakes review state
  const [mistakeIndex, setMistakeIndex] = useState(0)
  const [mistakeSelected, setMistakeSelected] = useState(null)
  const [mistakeAnswered, setMistakeAnswered] = useState(false)
  const [mistakeIsCorrect, setMistakeIsCorrect] = useState(false)
  const [reviewFinished, setReviewFinished] = useState(false)

  const TOTAL_QUESTIONS = 10

  // Auto-scroll to top on question change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
  }, [questionIndex, mistakeIndex])

  const topicsList = TOPICS[`GRADE_${selectedGrade}`] || TOPICS.GRADE_1

  const dueMistakes = getDueMistakes ? getDueMistakes() : []
  const masteredCount = (mistakesQueue || []).filter((m) => m.mastered).length

  // Start regular practice
  const startSession = (topicId) => {
    setSelectedTopic(topicId)
    setQuestionIndex(0)
    setCorrectCount(0)
    setStreak(0)
    setTotalCoinsEarned(0)
    setTotalXpEarned(0)
    setIsFinished(false)
    setSelectedAnswer(null)
    setIsAnswered(false)

    const q = generateQuestion(selectedGrade, topicId)
    setCurrentQuestion(q)
    setSessionActive(true)
    soundManager.playClick()
  }

  const handleAnswer = (option) => {
    if (isAnswered) return
    if (document.activeElement?.blur) document.activeElement.blur()

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
      setTotalXpEarned((prev) => prev + 20)
      addXp(20)
      progressQuest('quiz_1', 1)
    } else {
      soundManager.playWrong()
      setStreak(0)
      // Record mistake into spaced repetition queue (preserve visualDisplay)
      recordMistake({
        question: currentQuestion.question,
        options: currentQuestion.options,
        answer: currentQuestion.answer,
        hint: currentQuestion.hint,
        explanation: currentQuestion.hint || `Đáp án đúng là: ${currentQuestion.answer}`,
        grade: selectedGrade,
        topic: selectedTopic,
        visualDisplay: currentQuestion.visualDisplay,
        type: currentQuestion.type,
      })
    }
  }

  const nextQuestion = () => {
    if (document.activeElement?.blur) document.activeElement.blur()
    soundManager.playClick()
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setIsFinished(true)
      soundManager.playFanfare()
      fireConfetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } })
      addExerciseResult(`grade${selectedGrade}_practice`, {
        score: correctCount,
        total: TOTAL_QUESTIONS,
        topic: selectedTopic,
      })
      progressQuest('game_1', 1)
    } else {
      setQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      const nextQ = generateQuestion(selectedGrade, selectedTopic)
      setCurrentQuestion(nextQ)
    }
  }

  // Mistake review handlers
  const handleMistakeAnswer = (option, currentItem) => {
    if (mistakeAnswered) return
    if (document.activeElement?.blur) document.activeElement.blur()

    setMistakeSelected(option)
    setMistakeAnswered(true)

    const isAnsCorrect = option === currentItem.answer
    setMistakeIsCorrect(isAnsCorrect)

    resolveMistake(currentItem.id, isAnsCorrect)

    if (isAnsCorrect) {
      soundManager.playCorrect()
      addCoins(15)
      addXp(30)
      progressQuest('quiz_1', 1)
      fireConfetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } })
    } else {
      soundManager.playWrong()
    }
  }

  const handleNextMistake = () => {
    soundManager.playClick()
    if (mistakeIndex + 1 >= dueMistakes.length) {
      setReviewFinished(true)
      soundManager.playFanfare()
      fireConfetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } })
    } else {
      setMistakeIndex((prev) => prev + 1)
      setMistakeSelected(null)
      setMistakeAnswered(false)
      setMistakeIsCorrect(false)
    }
  }

  // 1. Regular Practice Session Screen
  if (sessionActive && !isFinished) {
    return (
      <div className="practice-session-container">
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

          {!isGuest && (
            <div className="practice-streak-badge">
              <Flame
                size={22}
                className={streak >= 3 ? 'flame-hot animated' : 'flame-normal'}
              />
              <span className="number">{streak}</span>
            </div>
          )}
        </div>

        {/* Question & Interaction Area: 2-Column Responsive Layout (Aligned with GamesPage) */}
        <div className="practice-card-box">
          {(() => {
            const parsed = parsePracticeQuestion(currentQuestion)
            return (
              <div className="practice-interaction-grid">
                {/* Left Column: Question & Visual / Equation */}
                <div className="practice-question-column">
                  {parsed.type === 'text_riddle' ? (
                    <div className="practice-text-riddle-card">
                      <span className="practice-riddle-badge">{parsed.badge}</span>
                      <h2 className="practice-riddle-content">{parsed.content}</h2>
                      <button
                        type="button"
                        className="practice-speak-mini-btn"
                        onClick={() => speechHelper.speak(parsed.content)}
                        title="Nghe đọc câu hỏi"
                      >
                        <Volume2 size={18} />
                        <span>Nghe đọc</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="practice-q-header">
                        <h2 className="practice-q-text">{parsed.title}</h2>
                        <button
                          type="button"
                          className="practice-speak-mini-btn"
                          onClick={() => speechHelper.speak(parsed.title)}
                          title="Nghe đọc câu hỏi"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>

                      <div className="practice-visual-box">
                        {parsed.type === 'visual' ? (
                          typeof parsed.visual === 'string' &&
                          parsed.visual.trim().split(/\s+/).length > 1 ? (
                            <div className="practice-emoji-grid">
                              {parsed.visual.trim().split(/\s+/).map((item, idx) => (
                                <motion.span
                                  key={idx}
                                  className="practice-emoji-item"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                  {item}
                                </motion.span>
                              ))}
                            </div>
                          ) : typeof parsed.visual === 'string' ? (
                            <div className="practice-single-emoji">{parsed.visual}</div>
                          ) : (
                            <div className="practice-shape-wrapper">{parsed.visual}</div>
                          )
                        ) : (
                          <div className="practice-calc-card">
                            <span className="practice-calc-icon">{parsed.icon}</span>
                            <span className="practice-calc-equation number">{parsed.equation}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Right Column: 2x2 Fixed Chunky 3D Answer Buttons */}
                <div className="practice-answers-column">
                  {currentQuestion?.options.map((option, idx) => {
                    let optClass = `practice-opt-btn opt-pos-${idx}`
                    if (isAnswered) {
                      if (option === currentQuestion.answer) optClass += ' correct'
                      else if (option === selectedAnswer) optClass += ' wrong'
                    }

                    return (
                      <motion.button
                        key={`opt-${questionIndex}-${idx}`}
                        className={optClass}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        whileHover={!isAnswered ? { scale: 1.03, y: -2 } : {}}
                        whileTap={!isAnswered ? { scale: 0.97 } : {}}
                      >
                        <span className="opt-letter-badge">{['A', 'B', 'C', 'D'][idx]}</span>
                        <span className="opt-val-text number">{option}</span>
                        {isAnswered && option === currentQuestion.answer && (
                          <CheckCircle2 size={22} className="icon-feedback success" />
                        )}
                        {isAnswered &&
                          option === selectedAnswer &&
                          option !== currentQuestion.answer && (
                            <XCircle size={22} className="icon-feedback fail" />
                          )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          {/* Answer Feedback & Explanations */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                className={`practice-feedback-banner ${isCorrect ? 'is-correct' : 'is-wrong'}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="feedback-content">
                  <div className="feedback-text">
                    <strong>
                      {isCorrect ? '🎉 Tuyệt vời! Chính xác!' : '💪 Chưa đúng rồi! Đã lưu vào Sổ Bài Sai.'}
                    </strong>
                    {!isCorrect && (
                      <p className="correct-ans-note">
                        Đáp án đúng là: <span className="number">{currentQuestion.answer}</span>.{' '}
                        {currentQuestion.hint || currentQuestion.explanation}
                      </p>
                    )}
                  </div>
                  <Button
                    variant={isCorrect ? 'success' : 'primary'}
                    size="md"
                    onClick={nextQuestion}
                  >
                    {questionIndex + 1 >= TOTAL_QUESTIONS ? '🎉 Hoàn thành' : 'Câu tiếp theo →'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // 2. Regular Practice Finished Screen
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
          {!isGuest ? (
            <>
              <div className="stat-box">
                <span className="stat-num number">+{totalCoinsEarned}</span>
                <span className="stat-desc">
                  <CoinIcon size={14} /> Xu vàng
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-num number">+{totalXpEarned}</span>
                <span className="stat-desc">XP Kinh nghiệm</span>
              </div>
            </>
          ) : (
            <div className="stat-box">
              <span className="stat-num">Khách</span>
              <span className="stat-desc">Chế độ trải nghiệm</span>
            </div>
          )}
        </div>

        {isGuest && (
          <div
            className="practice-guest-hint"
            onClick={() => {
              soundManager.playClick()
              setAuthModalOpen(true)
            }}
          >
            <GoogleIcon size={18} />
            <span>Đăng nhập Google để tích lũy Xu vàng và Chuỗi ngày học!</span>
          </div>
        )}

        <div className="result-actions">
          <Button variant="primary" size="lg" onClick={() => startSession(selectedTopic)}>
            <RotateCcw size={20} /> Luyện tập tiếp
          </Button>
          <Button
            variant="outline"
            size="lg"
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

  // 3. Main Screen (with Tab Switching between Practice and Spaced Repetition Notebook)
  return (
    <div className="page-2col-layout">
      <div className="learning-main-column">
        <div className="practice-page">
      {/* Top Main Navigation Tabs */}
      <div className="practice-main-tabs">
        <button
          className={`main-tab-btn ${mainTab === 'practice' ? 'active' : ''}`}
          onClick={() => setMainTab('practice')}
        >
          <span className="tab-icon">✏️</span>
          <span>Luyện Tập Chủ Đề</span>
        </button>

        <button
          className={`main-tab-btn ${mainTab === 'mistakes' ? 'active' : ''}`}
          onClick={() => {
            setMainTab('mistakes')
            setMistakeIndex(0)
            setMistakeSelected(null)
            setMistakeAnswered(false)
            setReviewFinished(false)
          }}
        >
          <span className="tab-icon">🔄</span>
          <span>Sổ Tay Ôn Bài Sai</span>
          {dueMistakes.length > 0 && (
            <span className="due-badge number">{dueMistakes.length}</span>
          )}
        </button>
      </div>

      {/* TAB 1: REGULAR TOPICS PRACTICE */}
      {mainTab === 'practice' && (
        <>
          <div className="practice-intro">
            <div className="practice-intro-text">
              <h1>✏️ Góc Luyện Tập Toán Học</h1>
              <p>
                Chọn chủ đề và thử thách tính nhẩm 10 câu để tích lũy xu vàng và nâng cấp độ!
              </p>
            </div>

            <div className="grade-selector-tabs">
              {[1, 2, 3, 4, 5].map((g) => (
                <button
                  key={g}
                  className={`grade-tab-btn ${selectedGrade === g ? 'active' : ''}`}
                  onClick={() => setSelectedGrade(g)}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div className="topics-grid">
            {topicsList.map((t) => (
              <motion.div
                key={t.id}
                className="home-chapter-card"
                whileHover={{ borderColor: '#4ecdc4', boxShadow: '0 6px 0 #4ecdc4, 0 8px 20px rgba(78, 205, 196, 0.15)', y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startSession(t.id)}
                style={{ minHeight: '130px' }}
              >
                <div
                  className="chapter-card-icon"
                  style={{
                    background: '#f0fdfa',
                    color: '#0d9488'
                  }}
                >
                  <span>{t.icon}</span>
                </div>

                <div className="chapter-card-info">
                  <div className="chapter-card-header">
                    {t.chapter && (
                      <span
                        className="chapter-tag-badge"
                        style={{
                          color: '#a21caf',
                          backgroundColor: '#fdf4ff',
                          borderColor: '#f5d0fe',
                        }}
                      >
                        {t.chapter}
                      </span>
                    )}
                    <span
                      className="chapter-tag-badge"
                      style={{
                        color: '#0284c7',
                        backgroundColor: '#f0f9ff',
                        borderColor: '#bae6fd'
                      }}
                    >
                      10 câu tương tác
                    </span>
                  </div>

                  <h3 className="chapter-card-title">{t.name}</h3>
                  <p className="chapter-card-desc">Chinh phục 10 câu hỏi tương tác để rèn luyện phản xạ và nhận xu vàng.</p>

                  <div className="chapter-card-footer" style={{ marginTop: 'auto', paddingTop: '8px' }}>
                    <button type="button" className="topic-start-pill" style={{ width: '100%', justifyContent: 'center' }}>
                      <span>Vào Luyện Tập</span>
                      <span className="start-arrow">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* TAB 2: SPACED REPETITION MISTAKES NOTEBOOK */}
      {mainTab === 'mistakes' && (
        <div className="mistakes-review-container">
          <div className="mistakes-header">
            <div className="mistakes-title-wrap">
              <h1>🔄 Sổ Tay Ôn Tập Bài Sai (Spaced Repetition)</h1>
              <p>
                Ôn lại câu hỏi sau 1 ngày, 3 ngày, 7 ngày để khắc sâu kiến thức vào trí nhớ dài hạn.
              </p>
            </div>

            <div className="mastered-stats-pill">
              <ShieldCheck size={18} className="shield-icon" />
              <span>Đã thuộc làu: <strong>{masteredCount} câu</strong> 🏆</span>
            </div>
          </div>

          {/* Condition A: No mistakes due */}
          {dueMistakes.length === 0 || reviewFinished ? (
            <motion.div
              className="mistakes-empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="empty-icon-box">🌟</div>
              <h2>
                {reviewFinished ? 'Hoàn thành buổi ôn tập hôm nay! 🎉' : 'Tuyệt vời! Không có bài sai nào cần ôn!'}
              </h2>
              <p>
                {reviewFinished
                  ? 'Bé đã giải quyết tất cả bài tập cần ôn hôm nay. Hãy tiếp tục học các bài mới nhé!'
                  : 'Bé ghi nhớ kiến thức rất tốt! Khi gặp câu hỏi khó trong bài học hoặc luyện tập, hệ thống sẽ tự động lưu vào đây để nhắc bé ôn lại đúng lúc.'}
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setMainTab('practice')
                  soundManager.playClick()
                }}
              >
                Luyện tập chủ đề mới →
              </Button>
            </motion.div>
          ) : (
            /* Condition B: Active review session */
            (() => {
              const currentMistake = dueMistakes[mistakeIndex] || dueMistakes[0]
              const stageLabels = {
                1: 'Vòng 1: Ôn sau 1 ngày 🌱',
                2: 'Vòng 2: Ôn sau 3 ngày 🌿',
                3: 'Vòng 3: Ôn sau 7 ngày 🌳',
              }

              return (
                <div className="mistake-review-card">
                  <div className="mistake-card-top">
                    <span className="mistake-counter number">
                      Câu {mistakeIndex + 1} / {dueMistakes.length}
                    </span>
                    <span className="mistake-stage-badge">
                      {stageLabels[currentMistake.stage] || 'Ôn tập'}
                    </span>
                  </div>

                  {/* Interaction Area: 2-Column Responsive Layout for Mistake Review */}
                  {(() => {
                    const parsed = parsePracticeQuestion(currentMistake)
                    return (
                      <div className="practice-interaction-grid">
                        <div className="practice-question-column">
                          {parsed.type === 'text_riddle' ? (
                            <div className="practice-text-riddle-card">
                              <span className="practice-riddle-badge">{parsed.badge}</span>
                              <h2 className="practice-riddle-content">{parsed.content}</h2>
                              <button
                                type="button"
                                className="practice-speak-mini-btn"
                                onClick={() => speechHelper.speak(parsed.content)}
                                title="Nghe đọc câu hỏi"
                              >
                                <Volume2 size={18} />
                                <span>Nghe đọc</span>
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="practice-q-header">
                                <h2 className="practice-q-text">{parsed.title}</h2>
                                <button
                                  type="button"
                                  className="practice-speak-mini-btn"
                                  onClick={() => speechHelper.speak(parsed.title)}
                                  title="Nghe đọc câu hỏi"
                                >
                                  <Volume2 size={16} />
                                </button>
                              </div>

                              <div className="practice-visual-box">
                                {parsed.type === 'visual' ? (
                                  typeof parsed.visual === 'string' &&
                                  parsed.visual.trim().split(/\s+/).length > 1 ? (
                                    <div className="practice-emoji-grid">
                                      {parsed.visual.trim().split(/\s+/).map((item, idx) => (
                                        <motion.span
                                          key={idx}
                                          className="practice-emoji-item"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ delay: idx * 0.03, type: 'spring' }}
                                        >
                                          {item}
                                        </motion.span>
                                      ))}
                                    </div>
                                  ) : typeof parsed.visual === 'string' ? (
                                    <div className="practice-single-emoji">{parsed.visual}</div>
                                  ) : (
                                    <div className="practice-shape-wrapper">{parsed.visual}</div>
                                  )
                                ) : (
                                  <div className="practice-calc-card">
                                    <span className="practice-calc-icon">{parsed.icon}</span>
                                    <span className="practice-calc-equation number">{parsed.equation}</span>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Right column: 2x2 Chunky 3D buttons */}
                        <div className="practice-answers-column">
                          {(currentMistake.options || []).map((opt, idx) => {
                            let optCls = `practice-opt-btn opt-pos-${idx}`
                            if (mistakeAnswered) {
                              if (opt === currentMistake.answer) optCls += ' correct'
                              else if (opt === mistakeSelected) optCls += ' wrong'
                            }

                            return (
                              <motion.button
                                key={`mopt-${mistakeIndex}-${idx}`}
                                className={optCls}
                                onClick={() => handleMistakeAnswer(opt, currentMistake)}
                                disabled={mistakeAnswered}
                                whileHover={!mistakeAnswered ? { scale: 1.03, y: -2 } : {}}
                                whileTap={!mistakeAnswered ? { scale: 0.97 } : {}}
                              >
                                <span className="opt-letter-badge">{['A', 'B', 'C', 'D'][idx]}</span>
                                <span className="opt-val-text number">{opt}</span>
                                {mistakeAnswered && opt === currentMistake.answer && (
                                  <CheckCircle2 size={22} className="icon-feedback success" />
                                )}
                                {mistakeAnswered &&
                                  opt === mistakeSelected &&
                                  opt !== currentMistake.answer && (
                                    <XCircle size={22} className="icon-feedback fail" />
                                  )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}

                  {/* Feedback row */}
                  {mistakeAnswered && (
                    <motion.div
                      className={`mistake-feedback-box ${mistakeIsCorrect ? 'success' : 'wrong'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="feedback-msg">
                        <strong>
                          {mistakeIsCorrect
                            ? (isGuest
                                ? '🎉 Giỏi quá! Bé đã nhớ bài rồi!'
                                : '🎉 Giỏi quá! Bé đã nhớ bài rồi (+15 xu)!')
                            : '💡 Nhớ kỹ lời giải này nhé:'}
                        </strong>
                        <p>{currentMistake.explanation}</p>
                      </div>

                      <Button variant="primary" size="md" onClick={handleNextMistake}>
                        {mistakeIndex + 1 >= dueMistakes.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
                      </Button>
                    </motion.div>
                  )}
                </div>
              )
            })()
          )}
        </div>
      )}
        </div>
      </div>
      {/* CỘT PHẢI: WIDGET THÚ CƯNG & NHIỆM VỤ */}
      <RightSidebar hideOnMobile={true} />
    </div>
  )
}
