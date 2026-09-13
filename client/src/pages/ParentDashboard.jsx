import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  ShieldCheck,
  BarChart3,
  Clock,
  Flame,
  Award,
  BookOpen,
  Settings,
  KeyRound,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import GuestFeatureLock from '../components/auth/GuestFeatureLock'
import curriculum from '../data/curriculum'
import soundManager from '../utils/soundManager'
import KnowledgeRadarChart from '../components/charts/KnowledgeRadarChart'
import './ParentDashboard.css'

// 5 Core Math Skill Domains aligned with Vietnam Primary Curriculum
const SKILL_DOMAINS = [
  {
    id: 'numbers',
    title: 'Số học & Nhận biết số',
    icon: '🔢',
    color: '#4facfe',
    chapters: ['g1-c1', 'g1-c3', 'g2-c1', 'g2-c5', 'g3-c3', 'g3-c7'],
    description: 'Đếm, đọc, viết, so sánh số và cấu tạo hệ thập phân',
  },
  {
    id: 'operations',
    title: 'Phép cộng & Phép trừ',
    icon: '➕',
    color: '#43e97b',
    chapters: ['g1-c2', 'g1-c4', 'g2-c2'],
    description: 'Cộng, trừ nhẩm và đặt tính có nhớ / không nhớ',
  },
  {
    id: 'multiplication',
    title: 'Bảng nhân & Bảng chia',
    icon: '✖️',
    color: '#fa709a',
    chapters: ['g2-c3', 'g2-c4', 'g3-c1', 'g3-c2'],
    description: 'Bảng cửu chương 2–9, phép nhân chia số nhiều chữ số',
  },
  {
    id: 'geometry',
    title: 'Hình học & Không gian',
    icon: '📐',
    color: '#a18cd1',
    chapters: ['g1-c5', 'g2-c7', 'g3-c5'],
    description: 'Nhận biết hình khối, góc, tính chu vi và diện tích',
  },
  {
    id: 'measurement',
    title: 'Đo lường & Giải toán có lời văn',
    icon: '📏',
    color: '#f6d365',
    chapters: ['g1-c6', 'g2-c6', 'g3-c4', 'g3-c6', 'g3-c8'],
    description: 'Đơn vị đo (cm, kg, lít, đồng), xem đồng hồ và bài toán lời văn',
  },
]

export default function ParentDashboard() {
  const { isGuest } = useAuthStore()
  const {
    nickname,
    grade,
    coins,
    xp,
    level,
    soundEnabled,
    parentPin,
    setParentPin,
    toggleSound,
    setGrade,
  } = useUserStore()

  const { completedLessons, currentStreak, exerciseResults } = useProgressStore()

  if (isGuest) {
    return (
      <GuestFeatureLock
        icon="🛡️"
        badgeText="BẢO MẬT PHỤ HUYNH"
        title="Khu Vực Dành Riêng Cho Phụ Huynh Đăng Ký"
        subtitle="Đăng nhập tài khoản để xem báo cáo học tập chi tiết, theo dõi biểu đồ kỹ năng và cài đặt mã PIN bảo vệ cho bé."
        benefits={[
          'Xem báo cáo năng lực và biểu đồ radar 5 kỹ năng chuẩn Bộ GD&ĐT',
          'Theo dõi thời gian học, chuỗi chuyên cần (streak) và lịch sử làm bài',
          'Thiết lập mã PIN phụ huynh quản trị an toàn',
          'Xuất báo cáo kết quả học tập để đồng hành cùng con',
        ]}
      />
    )
  }

  // PIN security check
  const defaultPin = parentPin || '1234'
  const [pinInput, setPinInput] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)

  // Forgot PIN challenge state
  const [showForgotPinModal, setShowForgotPinModal] = useState(false)
  const [challengeQuestion, setChallengeQuestion] = useState(null)
  const [challengeAnswerInput, setChallengeAnswerInput] = useState('')
  const [challengeError, setChallengeError] = useState(false)
  const [resetPinStep, setResetPinStep] = useState(false)
  const [resetNewPin, setResetNewPin] = useState('')

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'progress' | 'skills' | 'settings'

  // Settings states
  const [currentPinInput, setCurrentPinInput] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinChangeError, setPinChangeError] = useState('')
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false)
  const [backupCode, setBackupCode] = useState(null)

  // Generate parent math challenge for PIN recovery
  const openForgotPin = useCallback(() => {
    // Generate an adult math problem: e.g. 17 × 4 = 68 or 28 + 47 = 75
    const a = Math.floor(Math.random() * 8) + 12 // 12 - 19
    const b = Math.floor(Math.random() * 6) + 4 // 4 - 9
    setChallengeQuestion({
      text: `${a} × ${b} = ?`,
      answer: a * b,
    })
    setChallengeAnswerInput('')
    setChallengeError(false)
    setResetPinStep(false)
    setResetNewPin('')
    setShowForgotPinModal(true)
  }, [])

  const handleVerifyChallenge = useCallback((e) => {
    e.preventDefault()
    if (parseInt(challengeAnswerInput, 10) === challengeQuestion?.answer) {
      setResetPinStep(true)
      setChallengeError(false)
      soundManager.playCorrect()
    } else {
      setChallengeError(true)
      soundManager.playWrong()
    }
  }, [challengeAnswerInput, challengeQuestion])

  const handleSaveResetPin = useCallback((e) => {
    e.preventDefault()
    if (/^\d{4}$/.test(resetNewPin)) {
      setParentPin(resetNewPin)
      setIsUnlocked(true)
      setShowForgotPinModal(false)
      soundManager.playCorrect()
    } else {
      setChallengeError(true)
    }
  }, [resetNewPin, setParentPin])

  const handleVerifyPin = useCallback((e) => {
    e.preventDefault()
    if (pinInput === defaultPin) {
      setIsUnlocked(true)
      setPinError(false)
      soundManager.playCorrect()
    } else {
      setPinError(true)
      soundManager.playWrong()
    }
  }, [pinInput, defaultPin])

  const handleChangePin = useCallback((e) => {
    e.preventDefault()
    setPinChangeError('')
    setPinChangeSuccess(false)

    if (currentPinInput !== defaultPin) {
      setPinChangeError('Mã PIN hiện tại không chính xác!')
      soundManager.playWrong()
      return
    }

    if (!/^\d{4}$/.test(newPin)) {
      setPinChangeError('Mã PIN mới phải gồm đúng 4 chữ số!')
      soundManager.playWrong()
      return
    }

    if (newPin !== confirmPin) {
      setPinChangeError('Mã PIN xác nhận không trùng khớp!')
      soundManager.playWrong()
      return
    }

    setParentPin(newPin)
    setPinChangeSuccess(true)
    setCurrentPinInput('')
    setNewPin('')
    setConfirmPin('')
    soundManager.playCorrect()
    setTimeout(() => setPinChangeSuccess(false), 4000)
  }, [currentPinInput, defaultPin, newPin, confirmPin, setParentPin])

  const handleGenerateBackup = useCallback(() => {
    const code = 'TV-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    setBackupCode(code)
    soundManager.playCoin()
  }, [])

  // Calculate actual stats dynamically with useMemo
  const totalLessons = useMemo(() => Object.keys(completedLessons).length, [completedLessons])
  const totalStars = useMemo(
    () => Object.values(completedLessons).reduce((sum, l) => sum + (l.stars || 0), 0),
    [completedLessons]
  )
  const estimatedMinutes = useMemo(
    () => (totalLessons > 0 ? totalLessons * 12 + currentStreak * 10 : 0),
    [totalLessons, currentStreak]
  )

  // ----------------------------------------------------
  // DYNAMIC SKILL EVALUATION ALGORITHM
  // Based strictly on lessons completed and star ratings
  // ----------------------------------------------------
  const skillsEvaluation = useMemo(() => {
    return SKILL_DOMAINS.map((domain) => {
      // Find all curriculum lessons that belong to this domain's chapters
      let domainTotalLessons = 0
      let domainCompletedLessons = []

      curriculum.grades.forEach((gr) => {
        gr.chapters.forEach((ch) => {
          if (domain.chapters.includes(ch.id)) {
            domainTotalLessons += ch.lessons.length
            ch.lessons.forEach((l) => {
              if (completedLessons[l.id]) {
                domainCompletedLessons.push({
                  lessonId: l.id,
                  lessonTitle: l.title,
                  stars: completedLessons[l.id].stars || 0,
                  completedAt: completedLessons[l.id].completedAt,
                })
              }
            })
          }
        })
      })

      const completedCount = domainCompletedLessons.length

      if (completedCount === 0) {
        return {
          ...domain,
          completedCount: 0,
          totalLessons: domainTotalLessons,
          percent: 0,
          scoreLabel: 'Chưa học',
          status: 'not_started', // not_started | in_progress | mastered
          statusBadge: 'Chưa học',
          starsEarned: 0,
          recommendation: `Bé chưa học nội dung này. Phụ huynh có thể mở các bài trong chương tương ứng để bé trải nghiệm!`,
        }
      }

      // Calculate score based on stars earned (out of 3)
      const totalStarsEarned = domainCompletedLessons.reduce((sum, item) => sum + item.stars, 0)
      const maxPossibleStars = completedCount * 3
      const accuracyScore = Math.round((totalStarsEarned / maxPossibleStars) * 100)

      let scoreLabel = 'Tốt'
      let status = 'in_progress'
      if (accuracyScore >= 90) {
        scoreLabel = 'Rất Tốt'
        status = 'mastered'
      } else if (accuracyScore >= 75) {
        scoreLabel = 'Tốt'
        status = 'in_progress'
      } else if (accuracyScore >= 60) {
        scoreLabel = 'Khá'
        status = 'in_progress'
      } else {
        scoreLabel = 'Cần Ôn Thêm'
        status = 'in_progress'
      }

      return {
        ...domain,
        completedCount,
        totalLessons: domainTotalLessons,
        percent: accuracyScore,
        scoreLabel: `${accuracyScore}% (${scoreLabel})`,
        status,
        statusBadge: scoreLabel,
        starsEarned: totalStarsEarned,
        recommendation:
          accuracyScore >= 80
            ? `Bé nắm rất vững kỹ năng này (${completedCount} bài đã hoàn thành). Hãy tiếp tục duy trì nhé!`
            : `Bé đã học ${completedCount} bài. Nên cho bé làm thêm bài tập luyện tập để củng cố kỹ năng.`,
      }
    })
  }, [completedLessons])

  // Recent completed lessons list
  const recentActivities = useMemo(() => {
    return Object.entries(completedLessons)
      .map(([lessonId, data]) => {
        const found = curriculum.grades
          .flatMap((g) => g.chapters)
          .flatMap((c) => c.lessons)
          .find((l) => l.id === lessonId)
        return {
          id: lessonId,
          title: found?.title || lessonId,
          stars: data.stars || 0,
          date: data.completedAt ? new Date(data.completedAt).toLocaleDateString('vi-VN') : 'Gần đây',
        }
      })
      .slice(-5)
      .reverse()
  }, [completedLessons])

  // Dynamic feedback from owl mascot
  const mascotAdvice = useMemo(() => {
    if (totalLessons === 0) {
      return `Bé ${nickname} chưa hoàn thành bài học nào. Ba mẹ hãy đồng hành cùng bé chọn bài học đầu tiên trong phần "Học bài" nhé! 🚀`
    }
    if (totalLessons < 3) {
      return `Bé ${nickname} vừa mới bắt đầu và đã hoàn thành ${totalLessons} bài học xuất sắc với ${totalStars} ⭐. Khởi đầu rất đáng khích lệ, ba mẹ hãy cùng bé duy trì 10–15 phút mỗi ngày nhé! 🌟`
    }
    const masteredSkills = skillsEvaluation.filter((s) => s.status === 'mastered')
    if (masteredSkills.length > 0) {
      return `Bé ${nickname} đang tiến bộ vượt bậc! Đặc biệt rất giỏi ở mảng "${masteredSkills[0].title}". Hãy tiếp tục phát huy ở các bài học tiếp theo nhé! 🦉🏆`
    }
    return `Bé ${nickname} rất chăm chỉ học tập với chuỗi ${currentStreak} ngày liên tiếp. Hãy tiếp tục khuyến khích bé hoàn thành các bài tập để nhận thêm huy hiệu và sao thưởng nhé!`
  }, [totalLessons, totalStars, currentStreak, nickname, skillsEvaluation])

  // If locked, show PIN entry modal
  if (!isUnlocked) {
    return (
      <div className="parent-lock-screen">
        <motion.div
          className="parent-lock-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="lock-icon-wrap">
            <Lock size={42} />
          </div>
          <h2>Khu Vực Dành Cho Phụ Huynh</h2>
          <p>
            Vui lòng nhập mã PIN 4 chữ số để xem báo cáo học tập và cài đặt ứng dụng.
          </p>
          <span className="default-pin-hint">
            💡 Mã PIN mặc định ban đầu là: <strong>1234</strong>
          </span>

          <form onSubmit={handleVerifyPin} className="pin-form">
            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value)
                setPinError(false)
              }}
              placeholder="••••"
              autoFocus
              className={pinError ? 'input-error' : ''}
            />
            {pinError && <span className="error-msg">Mã PIN chưa chính xác!</span>}
            <Button variant="primary" size="lg" type="submit">
              Xác Nhận Mở Khóa →
            </Button>
          </form>

          <button
            type="button"
            className="forgot-pin-btn"
            onClick={openForgotPin}
          >
            ❓ Quên mã PIN?
          </button>
        </motion.div>

        {/* FORGOT PIN CHALLENGE MODAL */}
        <AnimatePresence>
          {showForgotPinModal && (
            <div className="modal-overlay" onClick={() => setShowForgotPinModal(false)}>
              <motion.div
                className="forgot-pin-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="modal-icon-header">
                  <ShieldCheck size={36} color="#1c7ed6" />
                </div>
                <h3>Xác Thực Dành Riêng Cho Phụ Huynh</h3>
                <p>
                  Để bảo vệ tài khoản của bé, vui lòng giải phép tính dưới đây để khôi phục hoặc đặt lại mã PIN:
                </p>

                {!resetPinStep ? (
                  <form onSubmit={handleVerifyChallenge} className="challenge-form">
                    <div className="challenge-box">
                      <span className="challenge-math">{challengeQuestion?.text}</span>
                    </div>
                    <input
                      type="number"
                      value={challengeAnswerInput}
                      onChange={(e) => {
                        setChallengeAnswerInput(e.target.value)
                        setChallengeError(false)
                      }}
                      placeholder="Nhập kết quả"
                      autoFocus
                      className={challengeError ? 'input-error' : ''}
                    />
                    {challengeError && (
                      <span className="error-msg">Kết quả chưa đúng! Vui lòng thử lại.</span>
                    )}
                    <div className="modal-actions">
                      <Button
                        variant="outline"
                        size="md"
                        type="button"
                        onClick={() => setShowForgotPinModal(false)}
                      >
                        Hủy bỏ
                      </Button>
                      <Button variant="primary" size="md" type="submit">
                        Xác Nhận
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSaveResetPin} className="challenge-form">
                    <p className="success-step-msg">
                      ✅ Xác thực thành công! Vui lòng nhập mã PIN mới (4 chữ số):
                    </p>
                    <input
                      type="password"
                      maxLength={4}
                      value={resetNewPin}
                      onChange={(e) => setResetNewPin(e.target.value)}
                      placeholder="Nhập 4 chữ số mới"
                      autoFocus
                    />
                    <div className="modal-actions">
                      <Button variant="primary" size="md" type="submit">
                        Lưu PIN Mới & Mở Khóa
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="parent-dashboard-page">
      {/* Top Header */}
      <div className="parent-header">
        <div className="parent-title-group">
          <h1>👨‍👩‍👧 Bảng Điều Khiển Phụ Huynh</h1>
          <p>
            Theo dõi tiến trình học tập, sự tiến bộ và kỹ năng toán học thực tế của bé{' '}
            <strong>{nickname}</strong>.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsUnlocked(false)
            setPinInput('')
            soundManager.playClick()
          }}
        >
          <Lock size={16} /> Khóa lại
        </Button>
      </div>

      {/* Tabs Bar */}
      <div className="parent-tabs-bar">
        <button
          className={`p-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} /> Tổng Quan
        </button>
        <button
          className={`p-tab ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <BookOpen size={18} /> Tiến Độ Học
        </button>
        <button
          className={`p-tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <Award size={18} /> Đánh Giá Kỹ Năng
        </button>
        <button
          className={`p-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} /> Cài Đặt & Mật Khẩu
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="tab-content-section">
          <div className="parent-stats-grid">
            <div className="p-card stat-big">
              <div className="stat-icon-circle blue">
                <Clock size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{estimatedMinutes} phút</span>
                <span className="stat-lbl">Tổng thời gian học</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle orange">
                <Flame size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{currentStreak} ngày</span>
                <span className="stat-lbl">Chuỗi ngày chăm chỉ</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle green">
                <BookOpen size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{totalLessons} bài</span>
                <span className="stat-lbl">Bài học hoàn thành</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle yellow">
                <Award size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{totalStars} ⭐</span>
                <span className="stat-lbl">Ngôi sao tích lũy</span>
              </div>
            </div>
          </div>

          <div className="parent-feedback-card">
            <h3>🦉 Nhận xét của Cú Mèo Thông Thái:</h3>
            <p>{mascotAdvice}</p>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-card">
            <h3>🕒 Nhật Ký Học Tập Gần Đây</h3>
            {recentActivities.length === 0 ? (
              <div className="no-activity-state">
                <p>Bé chưa có lịch sử học tập. Hãy cho bé bắt đầu bài học đầu tiên nhé!</p>
              </div>
            ) : (
              <div className="activity-list">
                {recentActivities.map((act) => (
                  <div key={act.id} className="activity-row">
                    <div className="activity-title">
                      <span className="activity-icon">📖</span>
                      <span>{act.title}</span>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-stars">{'⭐'.repeat(act.stars)}</span>
                      <span className="activity-date">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROGRESS BY GRADE */}
      {activeTab === 'progress' && (
        <div className="tab-content-section">
          {curriculum.grades.map((gr) => {
            const allLessons = gr.chapters.flatMap((c) => c.lessons)
            const completedCount = allLessons.filter((l) => completedLessons[l.id]).length
            const percent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0

            return (
              <div key={gr.id} className="p-grade-progress-card">
                <div className="p-grade-header">
                  <div className="p-grade-title">
                    <span className="p-grade-icon">{gr.icon}</span>
                    <div>
                      <h3>
                        {gr.name} ({gr.ageRange})
                      </h3>
                      <p>{gr.description}</p>
                    </div>
                  </div>
                  <div className="p-grade-stats">
                    <span className="p-count-tag">
                      {completedCount} / {allLessons.length} bài
                    </span>
                    <span className="p-percent-tag number">{percent}%</span>
                  </div>
                </div>

                <ProgressBar value={percent} max={100} variant="primary" size="md" />

                <div className="chapters-mini-list">
                  {gr.chapters.map((ch) => {
                    const chLessons = ch.lessons
                    const chCompleted = chLessons.filter((l) => completedLessons[l.id]).length
                    const chPercent = Math.round((chCompleted / chLessons.length) * 100)
                    return (
                      <div key={ch.id} className="chapter-mini-row">
                        <span className="ch-name">{ch.name}</span>
                        <span
                          className={`ch-status number ${
                            chCompleted === chLessons.length ? 'done' : chCompleted > 0 ? 'doing' : ''
                          }`}
                        >
                          {chCompleted === 0
                            ? 'Chưa học'
                            : `${chCompleted}/${chLessons.length} bài (${chPercent}%)`}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* TAB 3: DYNAMIC SKILLS EVALUATION */}
      {activeTab === 'skills' && (
        <div className="tab-content-section">
          {/* Radar Spider Chart Visualization */}
          <KnowledgeRadarChart skills={skillsEvaluation} />

          <div className="skills-overview-card">
            <div className="skills-header-row">
              <div>
                <h3>🎯 Đánh Giá Năng Lực Toán Học Theo Chuẩn Bộ GD&ĐT</h3>
                <p>
                  Hệ thống tự động phân tích theo 5 mạch kiến thức cốt lõi dựa trên kết quả bài học thực tế của bé:
                </p>
              </div>
              <div className="skills-summary-pill">
                <span>
                  Đã học:{' '}
                  <strong>
                    {skillsEvaluation.filter((s) => s.completedCount > 0).length} / 5 kỹ năng
                  </strong>
                </span>
              </div>
            </div>

            <div className="skills-bars-list">
              {skillsEvaluation.map((skill) => {
                const isLearned = skill.completedCount > 0

                return (
                  <div
                    key={skill.id}
                    className={`skill-item-card ${isLearned ? 'is-learned' : 'is-unlearned'}`}
                  >
                    <div className="skill-item-header">
                      <div className="skill-title-block">
                        <span className="skill-icon">{skill.icon}</span>
                        <div>
                          <h4>{skill.title}</h4>
                          <p className="skill-desc">{skill.description}</p>
                        </div>
                      </div>

                      <div className="skill-score-block">
                        {isLearned ? (
                          <>
                            <span className="skill-score-val number">{skill.scoreLabel}</span>
                            <span className="skill-count-badge">
                              {skill.completedCount} bài đã hoàn thành
                            </span>
                          </>
                        ) : (
                          <span className="skill-unlearned-badge">Chưa học bài nào</span>
                        )}
                      </div>
                    </div>

                    <div className="skill-progress-wrap">
                      <ProgressBar
                        value={skill.percent}
                        max={100}
                        variant={skill.percent >= 80 ? 'success' : skill.percent >= 60 ? 'primary' : 'warning'}
                        size="sm"
                      />
                    </div>

                    <div className="skill-recommendation">
                      <span className="rec-icon">💡</span>
                      <span className="rec-text">{skill.recommendation}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS, PIN CHANGE & BACKUP */}
      {activeTab === 'settings' && (
        <div className="tab-content-section">
          {/* Security: Change PIN */}
          <div className="settings-block-card">
            <h3>🔒 Thay Đổi Mật Khẩu (Mã PIN Phụ Huynh)</h3>
            <p>
              Mã PIN giúp bảo vệ các cài đặt quan trọng và báo cáo riêng tư của con. Vui lòng ghi nhớ mã PIN này.
            </p>

            <form onSubmit={handleChangePin} className="pin-change-detailed-form">
              <div className="form-group-pin">
                <label>Mã PIN hiện tại:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  placeholder="Nhập 4 số hiện tại"
                  required
                />
              </div>

              <div className="form-group-pin">
                <label>Mã PIN mới:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="Nhập 4 số mới"
                  required
                />
              </div>

              <div className="form-group-pin">
                <label>Xác nhận mã PIN mới:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Nhập lại 4 số mới"
                  required
                />
              </div>

              {pinChangeError && <div className="pin-alert error">{pinChangeError}</div>}
              {pinChangeSuccess && (
                <div className="pin-alert success">
                  <CheckCircle2 size={18} /> Đã đổi mã PIN phụ huynh thành công!
                </div>
              )}

              <div className="form-action-pin">
                <Button variant="primary" size="md" type="submit">
                  Lưu Mật Khẩu Mới
                </Button>
              </div>
            </form>
          </div>

          {/* Preferences */}
          <div className="settings-block-card">
            <h3>⚙️ Tùy Chỉnh Học Tập</h3>

            <div className="setting-item-row">
              <div>
                <h4>Khối lớp của bé</h4>
                <p>Chọn chương trình học chính hiện tại cho bé</p>
              </div>
              <select
                value={grade}
                onChange={(e) => {
                  setGrade(Number(e.target.value))
                  soundManager.playClick()
                }}
                className="grade-select"
              >
                <option value={1}>Lớp 1 (6-7 tuổi)</option>
                <option value={2}>Lớp 2 (7-8 tuổi)</option>
                <option value={3}>Lớp 3 (8-9 tuổi)</option>
              </select>
            </div>

            <div className="setting-item-row">
              <div>
                <h4>Âm thanh & Hiệu ứng</h4>
                <p>Bật hoặc tắt âm thanh vui nhộn khi bé làm bài</p>
              </div>
              <Button
                variant={soundEnabled ? 'primary' : 'ghost'}
                size="sm"
                onClick={toggleSound}
              >
                {soundEnabled ? '🔊 Đang bật' : '🔇 Đang tắt'}
              </Button>
            </div>
          </div>

          {/* Backup */}
          <div className="settings-block-card">
            <h3>💾 Sao Lưu & Khôi Phục</h3>
            <p>
              Tạo mã khôi phục để dễ dàng đồng bộ tiến trình học sang thiết bị hoặc trình duyệt khác
              mà không sợ bị mất dữ liệu.
            </p>
            <div className="backup-action-row">
              <Button variant="outline" size="md" onClick={handleGenerateBackup}>
                <Download size={18} /> Tạo Mã Sao Lưu
              </Button>
              {backupCode && (
                <div className="backup-code-pill">
                  <span>
                    Mã sao lưu của bạn: <strong>{backupCode}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
