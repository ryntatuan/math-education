import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, Star, Flame, Trophy, Coins, User, Sparkles, Check, Edit2, ShoppingBag, LogIn, LogOut, ArrowRight, BookOpen } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import CoinIcon from '../components/common/CoinIcon'
import GoogleIcon from '../components/common/GoogleIcon'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import soundManager from '../utils/soundManager'
import { APP_VERSION } from '../config/appVersion'
import './ProfilePage.css'

const BADGES_DATA = [
  { id: 'first_lesson', name: '🌱 Bước Chân Đầu Tiên', desc: 'Hoàn thành bài học đầu tiên', icon: '🌱' },
  { id: 'streak_3', name: '🔥 Chăm Chỉ 3 Ngày', desc: 'Duy trì chuỗi học 3 ngày liên tiếp', icon: '🔥' },
  { id: 'stars_10', name: '⭐ Ngôi Sao Sáng', desc: 'Thu thập được 10 ngôi sao', icon: '⭐' },
  { id: 'level_5', name: '📚 Học Sinh Xuất Sắc', desc: 'Đạt cấp độ Level 5', icon: '📚' },
  { id: 'math_race_win', name: '🏎️ Tay Lái Vàng', desc: 'Chiến thắng vị trí số 1 cuộc đua toán', icon: '🏎️' },
  { id: 'coins_100', name: '🪙 Triệu Phú Nhí', desc: 'Tích lũy được hơn 100 xu vàng', icon: '🪙' },
  { id: 'perfect_quiz', name: '💯 Điểm Mười Đỏ Chói', desc: 'Đạt điểm tối đa trong một bài học', icon: '💯' },
  { id: 'grade_master', name: '👑 Thần Đồng Toán Học', desc: 'Vượt qua tất cả các bài học một khối lớp', icon: '👑' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const {
    nickname,
    avatar,
    unlockedAvatars = ['👦', '👧'],
    level,
    coins,
    xp,
    totalXpForNextLevel,
    grade,
    setNickname,
    setAvatar,
    setGrade,
  } = useUserStore()

  const { completedLessons, currentStreak, mathRaceWins = 0 } = useProgressStore()
  const {
    user,
    isGuest,
    activeChild,
    setAuthModalOpen,
    updateActiveChild,
    signOut,
  } = useAuthStore()

  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(nickname)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  // Đồng bộ tempName khi nickname thay đổi
  useEffect(() => {
    if (!isEditingName) {
      setTempName(nickname)
    }
  }, [nickname, isEditingName])

  // Calculate total stars
  const totalStars = Object.values(completedLessons).reduce(
    (sum, l) => sum + (l.stars || 0),
    0
  )
  const totalLessonsDone = Object.keys(completedLessons).length

  // Check badges unlocked
  const isBadgeUnlocked = (badgeId) => {
    if (badgeId === 'first_lesson') return totalLessonsDone >= 1
    if (badgeId === 'streak_3') return currentStreak >= 3
    if (badgeId === 'stars_10') return totalStars >= 10
    if (badgeId === 'level_5') return level >= 5
    if (badgeId === 'coins_100') return coins >= 100
    if (badgeId === 'perfect_quiz') return Object.values(completedLessons).some((l) => l.stars === 3)
    if (badgeId === 'math_race_win') return (mathRaceWins || 0) >= 1
    if (badgeId === 'grade_master') return totalLessonsDone >= 8
    return false
  }

  const handleSaveName = async () => {
    const trimmed = tempName.trim()
    if (trimmed) {
      setNickname(trimmed)
      if (!isGuest && activeChild) {
        await updateActiveChild({ nickname: trimmed })
      }
      setIsEditingName(false)
      soundManager.playClick()
    }
  }

  const ownedAvatars = Array.from(new Set([...(unlockedAvatars || ['👦', '👧']), avatar]))

  if (isGuest) {
    return (
      <div className="profile-page guest-mode-page">
        {/* Guest Header Card */}
        <div className="profile-header-card guest-header-card">
          <div className="profile-avatar-section">
            <div className="profile-avatar-circle guest-avatar-circle">
              <span className="avatar-emoji">👤</span>
            </div>
          </div>

          <div className="profile-info-section">
            <div className="name-row">
              <h2>Bạn Nhỏ</h2>
              <span className="badge-guest-pill">⚡ Khách Trải Nghiệm</span>
            </div>
            <div className="profile-grade-tag">
              <span>Học sinh Lớp {grade}</span>
            </div>
            <p className="guest-header-hint">
              Bạn đang học thử ở Chế độ Khách. Dữ liệu học tập chưa được lưu vĩnh viễn.
            </p>
          </div>
        </div>

        {/* Guest Notice & Limitations Card */}
        <motion.div
          className="profile-guest-notice-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="guest-notice-banner">
            <div className="guest-notice-icon-box">🌟</div>
            <div className="guest-notice-content">
              <h3>Bé Đang Trải Nghiệm Chế Độ Khách</h3>
              <p>
                Bé có thể tự do học và làm bài tập môn Toán Lớp {grade} hoàn toàn miễn phí.
                Để lưu giữ thành tích và mở khóa toàn bộ sân chơi trí tuệ, ba mẹ hãy đăng nhập tài khoản nhé!
              </p>
            </div>
          </div>

          <div className="guest-limitations-box">
            <h4>Các giới hạn ở Chế độ Khách:</h4>
            <div className="guest-limitations-grid">
              <div className="limit-item">
                <span className="limit-bullet">❌</span>
                <span>Không lưu trữ và hiển thị <strong>Xu Vàng, Cấp độ (Level)</strong> và <strong>Chuỗi ngày học (Streak)</strong></span>
              </div>
              <div className="limit-item">
                <span className="limit-bullet">❌</span>
                <span>Không có <strong>Bộ sưu tập huy hiệu</strong> thành tích và cửa hàng đổi nhân vật hoạt hình</span>
              </div>
              <div className="limit-item">
                <span className="limit-bullet">❌</span>
                <span>Không thể truy cập <strong>6 Mini Game rèn phản xạ</strong> và <strong>Truyện Toán tương tác</strong></span>
              </div>
              <div className="limit-item">
                <span className="limit-bullet">❌</span>
                <span>Không hiển thị <strong>Báo cáo năng lực Phụ huynh</strong> và đồng bộ đa thiết bị</span>
              </div>
            </div>
          </div>

          <div className="guest-cta-block">
            <button
              type="button"
              className="btn-guest-login-primary"
              onClick={() => {
                soundManager.playClick()
                setAuthModalOpen(true)
              }}
            >
              <GoogleIcon size={20} />
              <span>Đăng nhập bằng Google ngay</span>
            </button>
            <p className="guest-cta-subtext">
              ✨ Nhanh chóng trong 5 giây, bảo lưu toàn bộ tiến độ của bé
            </p>

            <div className="guest-cta-secondary">
              <button
                type="button"
                className="btn-guest-continue-learn"
                onClick={() => {
                  soundManager.playClick()
                  navigate('/learn')
                }}
              >
                <BookOpen size={18} />
                <span>Tiếp tục học bài miễn phí</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar-section">
          <div
            className="profile-avatar-circle"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            title="Nhấn để đổi nhân vật"
          >
            <span className="avatar-emoji">{avatar}</span>
            <span className="avatar-edit-badge">
              <Edit2 size={12} />
            </span>
          </div>

          {showAvatarPicker && (
            <motion.div
              className="avatar-picker-dropdown"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="avatar-grid-inner">
                {ownedAvatars.map((av, i) => (
                  <button
                    key={i}
                    className={`avatar-choice ${avatar === av ? 'active' : ''}`}
                    onClick={() => {
                      setAvatar(av)
                      if (!isGuest && activeChild) {
                        updateActiveChild({ avatar: av })
                      }
                      setShowAvatarPicker(false)
                      soundManager.playClick()
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
              <button
                className="avatar-shop-link-btn"
                onClick={() => {
                  setShowAvatarPicker(false)
                  navigate('/shop')
                }}
              >
                <ShoppingBag size={14} /> Mua thêm ở Cửa Hàng 🛍️
              </button>
            </motion.div>
          )}
        </div>

        <div className="profile-info-section">
          <div className="name-row">
            {!isEditingName ? (
              <>
                <h2>{nickname}</h2>
                <button
                  className="edit-icon-btn"
                  onClick={() => setIsEditingName(true)}
                >
                  <Edit2 size={16} />
                </button>
              </>
            ) : (
              <div className="name-edit-form">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={20}
                  autoFocus
                />
                <Button variant="primary" size="sm" onClick={handleSaveName}>
                  Lưu
                </Button>
              </div>
            )}
          </div>

          <div className="profile-grade-tag">
            <span>Học sinh Lớp {grade}</span>
          </div>

          {/* Level Progress */}
          <div className="level-bar-container">
            <div className="level-label-row">
              <span className="current-level">Level {level}</span>
              <span className="xp-fraction number">
                {xp} / {totalXpForNextLevel} XP
              </span>
            </div>
            <ProgressBar
              value={xp}
              max={totalXpForNextLevel}
              variant="warning"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Account & Cloud Sync Section */}
      <div className="profile-account-card">
        <div className="account-card-header">
          <div className="account-card-title-group">
            <span className="account-icon">☁️</span>
            <div>
              <h3>Tài Khoản & Đám Mây</h3>
              <p className="account-card-desc">
                {isGuest
                  ? 'Đăng nhập Google để sao lưu vĩnh viễn tiến độ học tập của bé'
                  : `Tài khoản liên kết: ${user?.email || 'Đã đăng nhập'}`}
              </p>
            </div>
          </div>

          <div className="account-status-badge">
            {isGuest ? (
              <span className="badge-guest">⚡ Chế độ Khách</span>
            ) : (
              <span className="badge-synced">
                <Check size={14} /> Đã đồng bộ đám mây
              </span>
            )}
          </div>
        </div>

        {isGuest ? (
          <div className="account-guest-actions">
            <button
              className="btn-google-login-profile"
              onClick={() => {
                soundManager.playClick()
                setAuthModalOpen(true)
              }}
            >
              <GoogleIcon size={18} />
              <span>Đăng nhập bằng Google để lưu tiến độ</span>
            </button>
          </div>
        ) : (
          <div className="account-bottom-actions">
            <button
              className="btn-logout"
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản này?')) {
                  signOut()
                }
              }}
            >
              <LogOut size={16} /> Đăng xuất tài khoản
            </button>
          </div>
        )}
      </div>

      {/* Stats Summary Grid */}
      <div className="profile-stats-grid">
        <div className="p-stat-card">
          <div className="p-stat-icon icon-coins">
            <CoinIcon size={28} />
          </div>
          <div className="p-stat-data">
            <span className="p-stat-num number">{coins}</span>
            <span className="p-stat-name">Xu Vàng</span>
          </div>
        </div>

        <div className="p-stat-card">
          <div className="p-stat-icon icon-stars">⭐</div>
          <div className="p-stat-data">
            <span className="p-stat-num number">{totalStars}</span>
            <span className="p-stat-name">Ngôi Sao</span>
          </div>
        </div>

        <div className="p-stat-card">
          <div className="p-stat-icon icon-streak">🔥</div>
          <div className="p-stat-data">
            <span className="p-stat-num number">{currentStreak} Ngày</span>
            <span className="p-stat-name">Chuỗi Học</span>
          </div>
        </div>

        <div className="p-stat-card">
          <div className="p-stat-icon icon-lessons">📖</div>
          <div className="p-stat-data">
            <span className="p-stat-num number">{totalLessonsDone}</span>
            <span className="p-stat-name">Bài Đã Học</span>
          </div>
        </div>
      </div>

      {/* Badges Collection Showcase */}
      <div className="badges-section">
        <div className="section-title-row">
          <h2>🎖️ Bộ Sưu Tập Huy Hiệu</h2>
          <span className="badges-count number">
            {BADGES_DATA.filter((b) => isBadgeUnlocked(b.id)).length} / {BADGES_DATA.length}
          </span>
        </div>

        <div className="badges-grid">
          {BADGES_DATA.map((badge) => {
            const unlocked = isBadgeUnlocked(badge.id)
            return (
              <motion.div
                key={badge.id}
                className={`badge-item-box ${unlocked ? 'unlocked' : 'locked'}`}
                whileHover={{ y: -4 }}
              >
                <div className="badge-visual-icon">
                  {unlocked ? badge.icon : '🔒'}
                </div>
                <div className="badge-details">
                  <h4>{badge.name}</h4>
                  <p>{badge.desc}</p>
                </div>
                {unlocked && <span className="unlocked-tag">Đã nhận ✨</span>}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* App Version Info Footer */}
      <div className="profile-version-footer">
        <span>Toán Vui v{APP_VERSION}</span>
      </div>
    </div>
  )
}

