import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Award, Star, Flame, Trophy, Coins, User, Sparkles, Check, Edit2, ShoppingBag, LogIn, LogOut, UserPlus } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useAuthStore from '../store/useAuthStore'
import soundManager from '../utils/soundManager'
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
    children,
    activeChild,
    setAuthModalOpen,
    setSwitcherModalOpen,
    switchChild,
    signOut,
  } = useAuthStore()

  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(nickname)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

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

  const handleSaveName = () => {
    if (tempName.trim()) {
      setNickname(tempName.trim())
      setIsEditingName(false)
      soundManager.playClick()
    }
  }

  const ownedAvatars = Array.from(new Set([...(unlockedAvatars || ['👦', '👧']), avatar]))

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

      {/* Account & Cloud Sync / Multi-Child Section */}
      <div className="profile-account-card">
        <div className="account-card-header">
          <div className="account-card-title-group">
            <span className="account-icon">👨‍👩‍👧‍👦</span>
            <div>
              <h3>{isGuest ? 'Tài Khoản Phụ Huynh & Đám Mây' : 'Gia Đình & Đám Mây'}</h3>
              <p className="account-card-desc">
                {isGuest
                  ? 'Đăng nhập Google để sao lưu vĩnh viễn và tạo hồ sơ cho nhiều bé trong gia đình'
                  : `Tài khoản: ${user?.email || 'Phụ huynh'}`}
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
              <LogIn size={18} />
              <span>Đăng nhập bằng Google để lưu tiến độ</span>
            </button>
          </div>
        ) : (
          <div className="family-management-section">
            <div className="family-subhead-row">
              <h4>Hồ sơ các bé trong gia đình ({children.length})</h4>
              <button
                className="btn-add-child-link"
                onClick={() => {
                  soundManager.playClick()
                  setSwitcherModalOpen(true)
                }}
              >
                <UserPlus size={16} /> + Thêm bé mới
              </button>
            </div>

            <div className="family-children-row">
              {children.map((child) => {
                const isActive = child.id === activeChild?.id
                return (
                  <div
                    key={child.id}
                    className={`family-child-pill ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (!isActive) switchChild(child.id)
                    }}
                  >
                    <span className="pill-avatar">{child.avatar || '👦'}</span>
                    <div className="pill-info">
                      <span className="pill-name">{child.nickname}</span>
                      <span className="pill-grade">Lớp {child.grade}</span>
                    </div>
                    {isActive ? (
                      <span className="pill-active-tag">Đang học</span>
                    ) : (
                      <button className="pill-switch-btn">Chọn học</button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="account-bottom-actions">
              <button
                className="btn-logout"
                onClick={() => {
                  if (window.confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản phụ huynh?')) {
                    signOut()
                  }
                }}
              >
                <LogOut size={16} /> Đăng xuất tài khoản
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Summary Grid */}
      <div className="profile-stats-grid">
        <div className="p-stat-card">
          <div className="p-stat-icon icon-coins">🪙</div>
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
    </div>
  )
}

