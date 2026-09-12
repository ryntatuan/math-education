import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, PenTool, Gamepad2, Trophy, Flame, Star } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import MascotBubble from '../components/mascot/MascotBubble'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import curriculum from '../data/curriculum'
import './HomePage.css'

const gradeEmojis = ['🌱', '🌿', '🌳', '🌲', '🏔️']
const gradeColors = ['#4facfe', '#51CF66', '#FFE66D', '#FF6B6B', '#a18cd1']

const activities = [
  {
    id: 'learn',
    path: '/learn',
    icon: BookOpen,
    label: 'Học',
    description: 'Bài học tương tác',
    color: '#4facfe',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'practice',
    path: '/practice',
    icon: PenTool,
    label: 'Luyện tập',
    description: 'Bài tập thực hành',
    color: '#51CF66',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 'games',
    path: '/games',
    icon: Gamepad2,
    label: 'Trò chơi',
    description: '6 games vui nhộn',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'challenges',
    path: '/challenges',
    icon: Trophy,
    label: 'Thử thách',
    description: 'Thử thách hàng ngày',
    color: '#FFE66D',
    gradient: 'linear-gradient(135deg, #FFA94D 0%, #FF6B6B 100%)',
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { grade, setGrade, coins, xp, level, totalXpForNextLevel } = useUserStore()
  const { currentStreak, getChapterProgress } = useProgressStore()

  const gradeData = curriculum.grades.find((g) => g.id === grade) || curriculum.grades[0]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } },
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="hero-content">
          <div className="hero-greeting">
            <h1>Xin chào! 👋</h1>
            <p className="hero-subtitle">Hôm nay học gì nào?</p>
          </div>

          <div className="hero-stats">
            {currentStreak > 0 && (
              <motion.div
                className="streak-badge"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame size={18} className="streak-icon" />
                <span className="number">{currentStreak}</span>
                <span>ngày</span>
              </motion.div>
            )}

            <div className="xp-display">
              <div className="xp-info">
                <Star size={14} />
                <span className="number">Lv.{level}</span>
              </div>
              <ProgressBar
                value={xp}
                max={totalXpForNextLevel}
                variant="gradient"
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Floating decorations */}
        <div className="hero-decorations">
          {['✨', '🌟', '📐', '🔢', '➕'].map((emoji, i) => (
            <motion.span
              key={i}
              className={`floating-emoji floating-emoji-${i}`}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* Grade Selector */}
      <motion.section
        className="grade-section"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <h2 className="section-title">📚 Chọn lớp của bạn</h2>
        <div className="grade-grid">
          {curriculum.grades.map((g, index) => (
            <motion.button
              key={g.id}
              className={`grade-card ${grade === g.id ? 'grade-card-active' : ''}`}
              style={{
                '--grade-color': gradeColors[index],
                borderColor: grade === g.id ? gradeColors[index] : 'transparent',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGrade(g.id)}
            >
              <span className="grade-emoji">{gradeEmojis[index]}</span>
              <span className="grade-name">{g.name}</span>
              <span className="grade-age">{g.ageRange}</span>
              {grade === g.id && (
                <motion.div
                  className="grade-check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Activities Grid */}
      <motion.section
        className="activities-section"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <h2 className="section-title">🎯 Hoạt động</h2>
        <div className="activities-grid">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              className="activity-card"
              style={{ '--activity-gradient': activity.gradient }}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(activity.path)}
            >
              <div className="activity-icon-wrap">
                <activity.icon size={32} />
              </div>
              <h3 className="activity-label">{activity.label}</h3>
              <p className="activity-desc">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Current Grade Chapters Preview */}
      <motion.section
        className="chapters-preview"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="section-header">
          <h2 className="section-title">
            {gradeData.icon} {gradeData.name} — Các chương
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/learn')}
          >
            Xem tất cả →
          </Button>
        </div>

        <div className="chapters-grid">
          {gradeData.chapters.map((chapter, index) => {
            const totalLessons = chapter.lessons?.length || chapter.totalLessons || 12
            const progress = getChapterProgress ? getChapterProgress(chapter.id, totalLessons) : { completed: 0, total: totalLessons, percent: 0 }
            const isCompleted = progress.percent === 100
            const hasStarted = progress.completed > 0
            // Ensure title does not duplicate "Chương X: Chương X:"
            const displayTitle = chapter.name.startsWith('Chương') ? chapter.name : `Chương ${index + 1}: ${chapter.name}`

            return (
              <motion.div
                key={chapter.id}
                variants={itemVariants}
              >
                <Card
                  hoverable
                  onClick={() => navigate(`/learn/${grade}/${chapter.id}`)}
                  className="chapter-preview-card"
                >
                  <div className="chapter-preview-content">
                    <div
                      className="chapter-preview-icon"
                      style={{ background: chapter.color + '22', color: chapter.color }}
                    >
                      <span>{chapter.icon}</span>
                    </div>
                    <div className="chapter-preview-info">
                      <h4>{displayTitle}</h4>
                      <p>{chapter.description}</p>
                      <div className="chapter-preview-meta">
                        <Badge variant="default" size="sm">
                          📖 {totalLessons} bài học
                        </Badge>
                        {hasStarted && (
                          isCompleted ? (
                            <Badge variant="success" size="sm">
                              🏆 Hoàn thành ({progress.total}/{progress.total})
                            </Badge>
                          ) : (
                            <Badge variant="progress" size="sm">
                              ⭐ Đã học {progress.completed}/{progress.total}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Mascot */}
      <MascotBubble
        text="Chào bạn! Hôm nay mình học toán nhé! 🎓"
        mood="happy"
        position="bottom-right"
      />
    </div>
  )
}
