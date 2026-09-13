import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Flame, Gift, CheckCircle2, ArrowRight, Star, Sparkles, RotateCcw } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import { generateQuestion } from '../utils/exerciseGenerator'
import soundManager from '../utils/soundManager'
import fireConfetti from '../utils/confettiHelper'
import './ChallengePage.css'

export default function ChallengePage() {
  const { grade, addCoins, addXp } = useUserStore()
  const {
    currentStreak,
    isDailyChallengeCompleted,
    completeDailyChallenge,
  } = useProgressStore()
  const { activeChild } = useAuthStore()

  const alreadyDone = isDailyChallengeCompleted()

  // Challenge items state
  const [activeTaskIndex, setActiveTaskIndex] = useState(null) // 0, 1, 2 or null
  const [tasksCompleted, setTasksCompleted] = useState([alreadyDone, alreadyDone, alreadyDone])
  const [questions, setQuestions] = useState([
    generateQuestion(grade),
    generateQuestion(grade),
    generateQuestion(grade),
  ])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [chestOpened, setChestOpened] = useState(alreadyDone)
  const [chestReward, setChestReward] = useState(0)

  // Đồng bộ trạng thái khi tài khoản thay đổi hoặc khi hoàn thành nhiệm vụ
  useEffect(() => {
    const done = isDailyChallengeCompleted()
    setTasksCompleted([done, done, done])
    setChestOpened(done)
  }, [alreadyDone, activeChild?.id])

  // Cập nhật câu hỏi mới theo đúng khối lớp
  useEffect(() => {
    setQuestions([
      generateQuestion(grade),
      generateQuestion(grade),
      generateQuestion(grade),
    ])
  }, [grade])

  const taskLevels = [
    { title: 'Thử thách 1: Khởi động', difficulty: 'Dễ', icon: '🟢', reward: '10 Xu' },
    { title: 'Thử thách 2: Tăng tốc', difficulty: 'Vừa', icon: '🟡', reward: '15 Xu' },
    { title: 'Thử thách 3: Bứt phá', difficulty: 'Khó', icon: '🔴', reward: '25 Xu' },
  ]

  const handleSelectTask = (idx) => {
    if (tasksCompleted[idx]) return
    setActiveTaskIndex(idx)
    setSelectedAnswer(null)
    setFeedback(null)
    soundManager.playClick()
  }

  const handleRefreshQuestion = () => {
    if (activeTaskIndex === null) return
    setQuestions((prev) => {
      const next = [...prev]
      next[activeTaskIndex] = generateQuestion(grade)
      return next
    })
    setSelectedAnswer(null)
    setFeedback(null)
    soundManager.playClick()
  }

  const handleAnswer = (option) => {
    if (feedback) return
    setSelectedAnswer(option)

    const q = questions[activeTaskIndex]
    const isCorrect = option === q.answer

    if (isCorrect) {
      soundManager.playCorrect()
      setFeedback('correct')
      fireConfetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } })
    } else {
      soundManager.playWrong()
      setFeedback('wrong')
      // Auto-retry with fresh question after 1.5s
      setTimeout(() => {
        setQuestions((prev) => {
          const next = [...prev]
          next[activeTaskIndex] = generateQuestion(grade)
          return next
        })
        setSelectedAnswer(null)
        setFeedback(null)
      }, 1500)
    }
  }

  const handleCompleteTask = () => {
    soundManager.playFanfare()
    const nextTasks = [...tasksCompleted]
    nextTasks[activeTaskIndex] = true
    setTasksCompleted(nextTasks)
    addCoins(activeTaskIndex === 0 ? 10 : activeTaskIndex === 1 ? 15 : 25)
    addXp(30)
    setActiveTaskIndex(null)
    setFeedback(null)
    setSelectedAnswer(null)

    // If all 3 finished
    if (nextTasks.every(Boolean)) {
      completeDailyChallenge()
    }
  }

  const openMysteryChest = () => {
    if (chestOpened) return
    const bonus = Math.floor(Math.random() * 30) + 20
    setChestReward(bonus)
    setChestOpened(true)
    addCoins(bonus)
    addXp(50)
    soundManager.playFanfare()
    fireConfetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } })
  }

  const allCompleted = tasksCompleted.every(Boolean)

  return (
    <div className="challenge-page">
      {/* Hero Header */}
      <div className="challenge-hero">
        <div className="streak-ribbon">
          <Flame size={32} className="flame-icon-active" />
          <div className="streak-text-box">
            <span className="streak-count number">{currentStreak} Ngày</span>
            <span className="streak-sub">Chuỗi học tập liên tiếp 🔥</span>
          </div>
        </div>

        <h1>🏆 Thử Thách Mỗi Ngày</h1>
        <p>Hoàn thành 3 thử thách hôm nay để duy trì chuỗi học và mở Hộp Quà Bí Mật!</p>
      </div>

      {/* Task Modal / Screen */}
      <AnimatePresence>
        {activeTaskIndex !== null && (
          <motion.div
            className="task-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="task-modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="task-modal-header">
                <h3>{taskLevels[activeTaskIndex].title}</h3>
                <span className="reward-tag">{taskLevels[activeTaskIndex].reward}</span>
              </div>

              <div className="task-question-body">
                <h2>{questions[activeTaskIndex].question}</h2>
                {questions[activeTaskIndex].visualDisplay && (
                  <div className="task-visual-box">
                    {questions[activeTaskIndex].visualDisplay}
                  </div>
                )}
              </div>

              {feedback === 'wrong' && (
                <motion.div
                  className="task-feedback-banner wrong"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>❌ Chưa đúng rồi! Đang đổi câu hỏi khác cho bé thử lại nhé...</span>
                </motion.div>
              )}

              {feedback === 'correct' && (
                <motion.div
                  className="task-feedback-banner correct"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>🎉 Hoan hô! Bé trả lời rất chính xác!</span>
                </motion.div>
              )}

              <div className="task-options-grid">
                {questions[activeTaskIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    className={`task-opt-btn ${
                      feedback === 'correct' && opt === questions[activeTaskIndex].answer
                        ? 'correct'
                        : feedback === 'wrong' && opt === selectedAnswer
                        ? 'wrong'
                        : ''
                    }`}
                    onClick={() => handleAnswer(opt)}
                    disabled={feedback !== null}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="task-modal-footer">
                {feedback !== 'correct' ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefreshQuestion}
                      disabled={feedback !== null}
                    >
                      <RotateCcw size={14} /> Đổi câu khác
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="task-close-btn"
                      onClick={() => {
                        setActiveTaskIndex(null)
                        setFeedback(null)
                        setSelectedAnswer(null)
                      }}
                    >
                      Tạm dừng
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="task-complete-btn"
                    onClick={handleCompleteTask}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={18} /> Hoàn thành
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 Tasks Cards */}
      <div className="challenge-tasks-grid">
        {taskLevels.map((task, idx) => (
          <motion.div
            key={idx}
            className={`task-item-card ${tasksCompleted[idx] ? 'completed' : ''}`}
            whileHover={!tasksCompleted[idx] ? { y: -4 } : {}}
            onClick={() => handleSelectTask(idx)}
          >
            <div className="task-status-icon">
              {tasksCompleted[idx] ? (
                <CheckCircle2 size={32} className="check-done" />
              ) : (
                <span className="task-level-dot">{task.icon}</span>
              )}
            </div>

            <div className="task-info">
              <h3>{task.title}</h3>
              <span className="task-difficulty-pill">{task.difficulty}</span>
            </div>

            <div className="task-reward-box">
              <span>{task.reward}</span>
              {!tasksCompleted[idx] ? (
                <Button variant="primary" size="sm">
                  Làm ngay <ArrowRight size={14} />
                </Button>
              ) : (
                <span className="done-label">Đã xong ✅</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mystery Chest Section */}
      <div className={`chest-reward-card ${allCompleted ? 'unlocked' : 'locked'}`}>
        <div className="chest-visual">
          <motion.div
            className="chest-icon"
            animate={allCompleted && !chestOpened ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {chestOpened ? '🎁' : '🔒'}
          </motion.div>
        </div>

        <div className="chest-details">
          <h2>{chestOpened ? 'Hộp Quà Đã Mở!' : 'Hộp Quà Ngày Bí Mật'}</h2>
          <p>
            {chestOpened
              ? `Bé đã nhận được +${chestReward} Xu vàng may mắn! Hãy quay lại ngày mai nhé!`
              : allCompleted
              ? 'Tuyệt vời! Cả 3 thử thách đã hoàn thành. Hãy mở quà nào!'
              : 'Hoàn thành đủ cả 3 bài thử thách hôm nay để mở khóa hộp quà!'}
          </p>
        </div>

        <div className="chest-action">
          {allCompleted && !chestOpened ? (
            <Button variant="warning" size="lg" onClick={openMysteryChest}>
              <Sparkles size={20} /> Mở Quà Ngay
            </Button>
          ) : chestOpened ? (
            <span className="claimed-badge">🎉 Đã nhận quà</span>
          ) : (
            <span className="locked-badge">Chưa mở khóa</span>
          )}
        </div>
      </div>
    </div>
  )
}
