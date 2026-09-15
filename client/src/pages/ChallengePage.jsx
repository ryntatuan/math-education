import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Gift,
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  RotateCcw,
  RefreshCw,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
  Users,
  Award,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import useLeagueStore, { LEAGUE_TIERS } from '../store/useLeagueStore'
import { generateQuestion } from '../utils/exerciseGenerator'
import soundManager from '../utils/soundManager'
import fireConfetti from '../utils/confettiHelper'
import GuestChallengeLock from '../components/auth/GuestChallengeLock'
import './ChallengePage.css'

export default function ChallengePage() {
  const { grade, addCoins, addXp, nickname, avatar } = useUserStore()
  const {
    currentStreak,
    isDailyChallengeCompleted,
    completeDailyChallenge,
  } = useProgressStore()
  const { activeChild, isGuest } = useAuthStore()
  const {
    currentTier,
    weekEndDate,
    checkWeekReset,
    getStandings,
    fetchCloudLeaderboard,
    isLoadingCloud,
    lastPromotionStatus,
    dismissStatus,
  } = useLeagueStore()

  // Tab: 'arena' (Đấu Trường Thi Đua) hoặc 'daily' (Nhiệm Vụ Hằng Ngày)
  const [activeTab, setActiveTab] = useState('arena')
  const [timeLeft, setTimeLeft] = useState('')

  const alreadyDone = isDailyChallengeCompleted()

  // Challenge items state (Nhiệm vụ hằng ngày)
  const [activeTaskIndex, setActiveTaskIndex] = useState(null)
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

  // Đồng bộ giải đấu tuần & đếm ngược
  useEffect(() => {
    checkWeekReset(nickname, avatar)
    fetchCloudLeaderboard()

    const updateTimer = () => {
      const end = new Date(weekEndDate).getTime()
      const now = new Date().getTime()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft('Đang kết toán giải đấu...')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)

      setTimeLeft(`${days} ngày ${hours} giờ ${minutes} phút`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    return () => clearInterval(interval)
  }, [weekEndDate, checkWeekReset, nickname, avatar, fetchCloudLeaderboard])

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

  // Dữ liệu bảng xếp hạng giải đấu tuần
  const standings = getStandings(nickname, avatar, activeChild?.id)
  const currentTierData =
    LEAGUE_TIERS.find((t) => t.id === currentTier) || LEAGUE_TIERS[0]
  const currentTierIdx = LEAGUE_TIERS.findIndex((t) => t.id === currentTier)
  const nextTierData =
    currentTierIdx < LEAGUE_TIERS.length - 1 ? LEAGUE_TIERS[currentTierIdx + 1] : null

  const top3 = standings.slice(0, 3)

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

  // Nếu là tài khoản Khách (chưa đăng nhập): Yêu cầu đăng nhập để tham gia Đấu trường & Thử thách
  if (isGuest) {
    return (
      <div className="challenge-page">
        <GuestChallengeLock
          title="Đăng Nhập Để Tham Gia Đấu Trường & Thử Thách!"
          subtitle="Bảng xếp hạng thi đua tuần và 3 thử thách hằng ngày là tính năng đặc quyền dành riêng cho học sinh đã đăng nhập. Hãy đăng nhập để tranh tài cùng các bạn học nhé!"
        />
      </div>
    )
  }

  return (
    <div className="challenge-page">
      {/* Promotion Status Alert if recent */}
      <AnimatePresence>
        {lastPromotionStatus && (
          <motion.div
            className={`league-status-banner ${lastPromotionStatus}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="status-text">
              {lastPromotionStatus === 'promoted' ? (
                <>🎉 <strong>Chúc mừng!</strong> Bé đã xuất sắc thăng hạng lên <strong>{currentTierData.name}</strong>!</>
              ) : lastPromotionStatus === 'relegated' ? (
                <>💪 <strong>Cố lên nào!</strong> Bé đã chuyển sang <strong>{currentTierData.name}</strong>. Hãy bứt phá tuần này nhé!</>
              ) : (
                <>🛡️ <strong>Trụ hạng thành công!</strong> Bé tiếp tục thi đấu ở <strong>{currentTierData.name}</strong>.</>
              )}
            </div>
            <button className="dismiss-btn" onClick={dismissStatus}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab Switcher Header */}
      <div className="challenge-tabs-bar">
        <button
          className={`challenge-tab-btn ${activeTab === 'arena' ? 'active' : ''}`}
          onClick={() => setActiveTab('arena')}
        >
          <span>🏆 Đấu Trường Thi Đua</span>
        </button>

        <button
          className={`challenge-tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <span>🎯 Nhiệm Vụ Hằng Ngày</span>
          {allCompleted && <span className="tab-tag-done">✅</span>}
        </button>
      </div>

      {/* =========================================================
          TAB 1: ĐẤU TRƯỜNG THI ĐUA (LEADERBOARD)
          ========================================================= */}
      {activeTab === 'arena' && (
        <div className="arena-tab-content">
          {/* Hero Banner Giải Đấu */}
          <div className="league-hero-card" style={{ '--tier-color': currentTierData.color }}>
            <div className="tier-info-header">
              <div className="tier-badge-main">
                <span className="tier-icon">{currentTierData.icon}</span>
                <div>
                  <span className="tier-subtitle">Bảng Đấu Tuần Này</span>
                  <h1 className="tier-name">{currentTierData.name}</h1>
                </div>
              </div>

              <div className="tier-action-group">
                <div className="timer-pill">
                  <Clock size={16} />
                  <span>Còn lại: <strong>{timeLeft}</strong></span>
                </div>

                <button
                  className="refresh-cloud-btn"
                  onClick={() => {
                    soundManager.playClick()
                    fetchCloudLeaderboard()
                  }}
                  title="Cập nhật dữ liệu từ đám mây"
                  disabled={isLoadingCloud}
                >
                  <RefreshCw size={16} className={isLoadingCloud ? 'spinning' : ''} />
                  <span>{isLoadingCloud ? 'Đang tải...' : 'Làm mới'}</span>
                </button>
              </div>
            </div>

            {/* League Tiers Road Map */}
            <div className="tiers-roadmap">
              {LEAGUE_TIERS.map((tier, idx) => {
                const isCurrent = tier.id === currentTier
                const isUnlocked = idx <= currentTierIdx
                return (
                  <div
                    key={tier.id}
                    className={`tier-step ${isCurrent ? 'is-current' : ''} ${isUnlocked ? 'is-unlocked' : ''}`}
                  >
                    <div className="step-circle">
                      <span>{tier.icon}</span>
                    </div>
                    <span className="step-label">{tier.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top 3 Podium */}
          {top3.length >= 3 && (
            <div className="podium-container">
              {/* Rank 2 (Left) */}
              <div className="podium-column rank-2">
                <div className="podium-player">
                  <span className="podium-avatar">{top3[1].avatar}</span>
                  <strong className="podium-name">{top3[1].name}</strong>
                  <span className="podium-xp number">{top3[1].weeklyXp} XP</span>
                </div>
                <div className="podium-pedestal pedestal-2">
                  <span className="pedestal-rank number">2</span>
                </div>
              </div>

              {/* Rank 1 (Center) */}
              <div className="podium-column rank-1">
                <div className="crown-badge">👑</div>
                <div className="podium-player">
                  <span className="podium-avatar golden-glow">{top3[0].avatar}</span>
                  <strong className="podium-name">{top3[0].name}</strong>
                  <span className="podium-xp number">{top3[0].weeklyXp} XP</span>
                </div>
                <div className="podium-pedestal pedestal-1">
                  <span className="pedestal-rank number">1</span>
                </div>
              </div>

              {/* Rank 3 (Right) */}
              <div className="podium-column rank-3">
                <div className="podium-player">
                  <span className="podium-avatar">{top3[2].avatar}</span>
                  <strong className="podium-name">{top3[2].name}</strong>
                  <span className="podium-xp number">{top3[2].weeklyXp} XP</span>
                </div>
                <div className="podium-pedestal pedestal-3">
                  <span className="pedestal-rank number">3</span>
                </div>
              </div>
            </div>
          )}

          {/* Full Standings List */}
          <div className="standings-box">
            <div className="standings-legend">
              <div className="legend-item promo">
                <ArrowUpCircle size={16} className="text-emerald" />
                <span>Hạng 1 - 3: Thăng hạng {nextTierData ? nextTierData.name : ''} 🟢</span>
              </div>
              <div className="legend-item relegate">
                <ArrowDownCircle size={16} className="text-rose" />
                <span>Hạng 8 - 10: Vùng nguy hiểm 🔴</span>
              </div>
            </div>

            <div className="standings-list">
              {standings.map((player) => {
                const isPromotion = player.rank <= 3
                const isRelegation = player.rank >= 8

                let rowCls = 'standing-row'
                if (player.isUser) rowCls += ' is-user-row'
                if (isPromotion) rowCls += ' zone-promotion'
                if (isRelegation) rowCls += ' zone-relegation'

                return (
                  <div key={player.id} className={rowCls}>
                    <div className="rank-badge-wrap">
                      <span className={`rank-number number rank-${player.rank}`}>
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                      </span>
                    </div>

                    <div className="player-avatar-wrap">
                      <span className="player-avatar">{player.avatar}</span>
                    </div>

                    <div className="player-info-wrap">
                      <span className="player-name">
                        {player.name}
                        {player.isUser ? (
                          <span className="you-tag">Bạn</span>
                        ) : !player.is_bot ? (
                          <span className="real-user-tag">✨ Bạn học</span>
                        ) : player.role === 'hardworking' ? (
                          <span className="bot-tag bot-hardworking">🔥 Chăm chỉ</span>
                        ) : player.role === 'lazy' ? (
                          <span className="bot-tag bot-lazy">💤 Thong thả</span>
                        ) : (
                          <span className="bot-tag">🤖 Bạn học</span>
                        )}
                      </span>
                      <span className="zone-subtag">
                        {isPromotion ? 'Vùng Thăng Hạng 🟢' : isRelegation ? 'Vùng Nguy Hiểm 🔴' : 'Vùng An Toàn ⚪'}
                      </span>
                    </div>

                    <div className="player-xp-wrap">
                      <span className="xp-value number">{player.weeklyXp}</span>
                      <span className="xp-unit">XP</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Thông báo nếu bé chưa lọt vào Top 10 */}
            {standings.userRank > 10 && (
              <div className="out-of-top-banner">
                <div className="out-rank-info">
                  <span>📍 Vị trí hiện tại của bé:</span>
                  <strong>Hạng #{standings.userRank}</strong>
                </div>
                <span className="out-rank-hint">
                  Học thêm bài học để bứt phá và thế chỗ các đối thủ trong Top 10 nhé! 🚀
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: NHIỆM VỤ HẰNG NGÀY (DAILY QUESTS)
          ========================================================= */}
      {activeTab === 'daily' && (
        <div className="daily-tab-content">
          {/* Hero Header */}
          <div className="challenge-hero">
            <div className="streak-ribbon">
              <Flame size={32} className="flame-icon-active" />
              <div className="streak-text-box">
                <span className="streak-count number">{currentStreak} Ngày</span>
                <span className="streak-sub">Chuỗi học tập liên tiếp 🔥</span>
              </div>
            </div>

            <h1>🎯 Thử Thách Mỗi Ngày</h1>
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
      )}
    </div>
  )
}
