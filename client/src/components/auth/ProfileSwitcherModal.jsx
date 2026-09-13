import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UserPlus, Check, Sparkles, ChevronRight, Award, Coins } from 'lucide-react'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './ProfileSwitcherModal.css'

const AVAILABLE_AVATARS = ['👦', '👧', '🦁', '🐰', '🐱', '🐼', '🦊', '🐶', '🦄', '🚀', '🦉', '🐯']

export default function ProfileSwitcherModal() {
  const {
    isSwitcherModalOpen,
    setSwitcherModalOpen,
    children,
    activeChild,
    switchChild,
    addChildProfile,
    isGuest,
    setAuthModalOpen,
  } = useAuthStore()

  const [isAdding, setIsAdding] = useState(false)
  const [newNickname, setNewNickname] = useState('')
  const [newGrade, setNewGrade] = useState(1)
  const [newAvatar, setNewAvatar] = useState('👦')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isSwitcherModalOpen) return null

  const handleClose = () => {
    soundManager.playClick()
    setIsAdding(false)
    setErrorMsg('')
    setSwitcherModalOpen(false)
  }

  const handleSelectChild = async (childId) => {
    if (activeChild?.id === childId) return
    await switchChild(childId)
  }

  const handleCreateChild = async (e) => {
    e.preventDefault()
    if (!newNickname.trim()) {
      setErrorMsg('Vui lòng nhập tên hoặc biệt danh của bé!')
      return
    }

    setSubmitting(true)
    setErrorMsg('')

    const newChild = await addChildProfile({
      nickname: newNickname.trim(),
      grade: Number(newGrade),
      avatar: newAvatar,
    })

    setSubmitting(false)

    if (newChild) {
      soundManager.playFanfare()
      setIsAdding(false)
      setNewNickname('')
      // Auto switch to newly created child
      await switchChild(newChild.id)
    } else {
      setErrorMsg('Có lỗi xảy ra khi tạo hồ sơ. Vui lòng thử lại.')
    }
  }

  return (
    <AnimatePresence>
      <div className="profile-switcher-overlay" onClick={handleClose}>
        <motion.div
          className="profile-switcher-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button className="switcher-close-btn" onClick={handleClose} aria-label="Đóng">
            <X size={20} />
          </button>

          {/* Header */}
          <div className="switcher-header">
            <div className="switcher-badge">👨‍👩‍👧‍👦</div>
            <h2>Đổi Bé Học</h2>
            <p>Chọn hồ sơ của bé hoặc tạo thêm tài khoản cho bé thứ hai trong gia đình</p>
          </div>

          {/* Notice for Guest Mode */}
          {isGuest && (
            <div className="switcher-guest-banner">
              <span>⚠️ Bạn đang dùng chế độ Khách. Đăng nhập tài khoản để thêm và quản lý nhiều bé!</span>
              <button
                className="switcher-login-now-btn"
                onClick={() => {
                  handleClose()
                  setAuthModalOpen(true)
                }}
              >
                Đăng nhập ngay 🔑
              </button>
            </div>
          )}

          {/* Children List */}
          <div className="children-list-container">
            {children.length === 0 ? (
              <div className="no-children-placeholder">
                <span className="placeholder-icon">🐣</span>
                <p>Chưa có danh sách bé trên đám mây.</p>
              </div>
            ) : (
              children.map((child) => {
                const isActive = child.id === activeChild?.id
                return (
                  <motion.div
                    key={child.id}
                    className={`child-profile-item ${isActive ? 'active' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectChild(child.id)}
                  >
                    <div className="child-item-avatar">{child.avatar || '👦'}</div>
                    <div className="child-item-info">
                      <div className="child-item-name-row">
                        <span className="child-name">{child.nickname}</span>
                        {isActive && (
                          <span className="active-tag">
                            <Check size={12} /> Đang học
                          </span>
                        )}
                      </div>
                      <div className="child-item-meta">
                        <span className="child-grade-badge">Lớp {child.grade}</span>
                        <span className="child-stat">Lv.{child.level || 1}</span>
                        <span className="child-stat">🪙 {child.coins || 0}</span>
                      </div>
                    </div>

                    {!isActive && (
                      <div className="child-select-action">
                        <ChevronRight size={20} />
                      </div>
                    )}
                  </motion.div>
                )
              })
            )}
          </div>

          {/* Add Child Section / Toggle */}
          {!isGuest && (
            <div className="add-child-section">
              {!isAdding ? (
                <button
                  className="add-child-trigger-btn"
                  onClick={() => {
                    soundManager.playClick()
                    setIsAdding(true)
                  }}
                >
                  <UserPlus size={18} />
                  <span>+ Thêm hồ sơ cho bé mới</span>
                </button>
              ) : (
                <form className="add-child-form" onSubmit={handleCreateChild}>
                  <h3>Tạo hồ sơ cho bé mới</h3>

                  {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

                  <div className="form-group">
                    <label>Tên hoặc biệt danh của bé:</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Bé Bông, Bin, Minh Anh..."
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                      maxLength={20}
                      autoFocus
                    />
                  </div>

                  <div className="form-group">
                    <label>Bé đang học lớp mấy?</label>
                    <div className="grade-selector-chips">
                      {[1, 2, 3, 4, 5].map((g) => (
                        <button
                          type="button"
                          key={g}
                          className={`grade-chip ${newGrade === g ? 'selected' : ''}`}
                          onClick={() => {
                            soundManager.playClick()
                            setNewGrade(g)
                          }}
                        >
                          Lớp {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Chọn biểu tượng yêu thích:</label>
                    <div className="avatar-selector-grid">
                      {AVAILABLE_AVATARS.map((av) => (
                        <button
                          type="button"
                          key={av}
                          className={`avatar-chip ${newAvatar === av ? 'selected' : ''}`}
                          onClick={() => {
                            soundManager.playClick()
                            setNewAvatar(av)
                          }}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions-row">
                    <button
                      type="button"
                      className="form-cancel-btn"
                      onClick={() => setIsAdding(false)}
                      disabled={submitting}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="form-submit-btn"
                      disabled={submitting}
                    >
                      {submitting ? 'Đang tạo...' : 'Tạo hồ sơ 🎉'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
