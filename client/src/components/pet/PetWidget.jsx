import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Award, Utensils, Plus, Check, X, LogIn } from 'lucide-react'
import Button from '../ui/Button'
import GoogleIcon from '../common/GoogleIcon'
import ProgressBar from '../ui/ProgressBar'
import usePetStore, { PET_TYPES, FOOD_TYPES } from '../../store/usePetStore'
import useProgressStore from '../../store/useProgressStore'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import fireConfetti from '../../utils/confettiHelper'
import './PetWidget.css'

export default function PetWidget({ compact = false }) {
  const { isGuest, setAuthModalOpen } = useAuthStore()
  const {
    hasPet,
    petType,
    petName,
    hunger,
    happiness,
    level,
    exp,
    expForNextLevel,
    stage,
    inventory,
    petSpeech,
    adoptPet,
    feedPet,
    petPet,
  } = usePetStore()

  const { progressQuest } = useProgressStore()

  const [showAdoptModal, setShowAdoptModal] = useState(false)
  const [showGuestPetModal, setShowGuestPetModal] = useState(false)
  const [selectedPetType, setSelectedPetType] = useState('corgi')
  const [customName, setCustomName] = useState('')
  const [showFoodMenu, setShowFoodMenu] = useState(false)

  const currentPetInfo = PET_TYPES.find((p) => p.id === petType) || PET_TYPES[0]

  const handleFeed = (foodId) => {
    const success = feedPet(foodId)
    if (success) {
      soundManager.playCoin()
      fireConfetti({ particleCount: 35, spread: 50 })
      progressQuest('quest_pet', 1)
    } else {
      soundManager.playWrong()
    }
  }

  const handleConfirmAdopt = () => {
    adoptPet(selectedPetType, customName.trim() || undefined)
    setShowAdoptModal(false)
    soundManager.playFanfare()
    fireConfetti({ particleCount: 80, spread: 70 })
  }

  // Not adopted yet or guest account: Teaser / Locked card
  if (!hasPet || isGuest) {
    return (
      <div className={`pet-widget-card adopt-teaser ${compact ? 'compact-teaser' : ''}`}>
        {/* Animated background stars */}
        <div className="teaser-sparkles-bg" aria-hidden="true">
          <span className="sparkle-item sp-1">✨</span>
          <span className="sparkle-item sp-2">⭐</span>
          <span className="sparkle-item sp-3">🌟</span>
          <span className="sparkle-item sp-4">🐾</span>
          <span className="sparkle-item sp-5">💖</span>
        </div>

        <div className={`teaser-main-content ${compact ? 'compact' : ''}`}>
          <div className={`teaser-body-row ${compact ? 'compact' : ''}`}>
            <div className={`teaser-egg-wrap ${compact ? 'compact' : ''}`}>
              <span className="egg-aura-ring" />
              <motion.div
                className={`egg-display ${compact ? 'compact' : ''}`}
                animate={{ rotate: [-6, 6, -6], y: [0, -5, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="egg-art">🥚</span>
                <span className="egg-shimmer">✨</span>
              </motion.div>
            </div>

            <div className={`teaser-info ${compact ? 'compact' : ''}`}>
              <div className="teaser-badge">
                <Sparkles size={compact ? 12 : 14} /> {isGuest ? '🐾 Thú Cưng Học Toán' : (compact ? 'Ấp Trứng Kỳ Diệu' : 'Trứng Kỳ Diệu Đang Chờ Bé!')}
              </div>
              <h3>Thú Cưng Học Toán</h3>
              <p>
                {compact
                  ? 'Ấp nở Rồng Con 🐲, Corgi 🐶 cùng học toán!'
                  : <>Ấp nở <strong>Corgi 🐶, Mèo Con 🐱, Cú Mèo 🦉 hay Rồng Con 🐲</strong>! Cùng bé giải toán tích xu, cho ăn và xem thú cưng lớn khôn mỗi ngày!</>
                }
              </p>
            </div>
          </div>

          <div className={`teaser-action-area ${compact ? 'compact' : ''}`}>
            <motion.button
              type="button"
              className={`btn-adopt-special ${compact ? 'compact' : ''}`}
              onClick={() => {
                soundManager.playClick()
                if (isGuest) {
                  setShowGuestPetModal(true)
                } else {
                  setShowAdoptModal(true)
                }
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles size={compact ? 16 : 18} className="btn-sparkle-icon" />
              <span>Nhận Nuôi Ngay</span>
            </motion.button>
          </div>
        </div>

        {/* Adopt Modal */}
        <AnimatePresence>
          {showAdoptModal && (
            <div className="pet-adopt-overlay">
              <motion.div
                className="pet-adopt-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h2>🐾 Chọn Bạn Thú Cưng Của Bé</h2>
                <p>Hãy chọn quả trứng mà bé thích nhất để cùng nhau học toán nhé!</p>

                <div className="pet-choice-grid">
                  {PET_TYPES.map((p) => (
                    <div
                      key={p.id}
                      className={`pet-choice-card ${selectedPetType === p.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedPetType(p.id)
                        soundManager.playClick()
                      }}
                    >
                      <span className="pet-choice-icon">{p.icon}</span>
                      <h4>{p.name}</h4>
                      <p>{p.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pet-name-input-box">
                  <label>Đặt tên cho thú cưng (tùy chọn):</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Đậu Đậu, Miu Miu, Lửa Nhỏ..."
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={16}
                  />
                </div>

                <div className="pet-adopt-btns">
                  <Button variant="primary" size="lg" onClick={handleConfirmAdopt}>
                    <Check size={18} /> Nhận Nuôi Bạn Này
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setShowAdoptModal(false)}>
                    Để sau
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Guest Pet Locked / Intro Modal */}
        <AnimatePresence>
          {showGuestPetModal && (
            <div className="pet-adopt-overlay" onClick={() => setShowGuestPetModal(false)}>
              <motion.div
                className="pet-adopt-modal guest-pet-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  className="guest-pet-close-btn"
                  onClick={() => setShowGuestPetModal(false)}
                >
                  <X size={20} />
                </button>

                <div className="guest-pet-badge-icon">
                  <span className="guest-pet-egg">🥚</span>
                  <span className="guest-pet-lock-badge">🔒</span>
                </div>

                <h2>🐾 Thú Cưng Học Toán Dành Cho Thành Viên</h2>
                <p className="guest-pet-desc">
                  Để nuôi và chăm sóc thú cưng lớn khôn, bé cần tích lũy <strong>Xu Vàng</strong> qua mỗi bài học để mua thức ăn (Táo 🍎, Bánh mì 🥖, Thịt nướng 🍖...).
                </p>

                <div className="guest-pet-perks-box">
                  <h4>Quyền lợi khi đăng ký tài khoản:</h4>
                  <ul>
                    <li>🥚 <strong>Ấp nở 4 thú cưng độc quyền:</strong> Corgi 🐶, Mèo Con 🐱, Cú Mèo 🦉, Rồng Con 🐲</li>
                    <li>🪙 <strong>Tích lũy Xu Vàng</strong> để mua đồ ăn, giúp thú cưng tiến hóa lên cấp Vương Miện 👑</li>
                    <li>💖 <strong>Tương tác vui nhộn:</strong> Vuốt ve, cho ăn và lắng nghe thú cưng cổ vũ bé học tập</li>
                    <li>☁️ <strong>Bảo lưu vĩnh viễn</strong> dữ liệu thú cưng trên đám mây, không lo mất khi đổi máy</li>
                  </ul>
                </div>

                <div className="guest-pet-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    className="btn-guest-pet-login"
                    onClick={() => {
                      soundManager.playClick()
                      setShowGuestPetModal(false)
                      setAuthModalOpen(true)
                    }}
                  >
                    <GoogleIcon size={20} />
                    <span>Đăng nhập Google để nhận thú cưng</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setShowGuestPetModal(false)}
                  >
                    Để sau
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Pet already adopted: Interactive Companion Widget
  return (
    <div className={`pet-widget-card active-pet ${compact ? 'compact-pet' : ''}`}>
      <div className="pet-visual-area" onClick={petPet} title="Chạm để vuốt ve thú cưng">
        <motion.div
          className="pet-avatar-wrapper"
          whileHover={{ scale: 1.12, rotate: [0, -6, 6, 0] }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="pet-stage-emoji">{currentPetInfo.icon}</span>
          {stage === 'master' && <span className="pet-crown">👑</span>}
        </motion.div>

        <div className="pet-speech-bubble">
          <span>{petSpeech}</span>
        </div>
      </div>

      <div className="pet-details-area">
        <div className="pet-name-row">
          <div className="pet-title-tag">
            <h4>{petName}</h4>
            <span className="pet-level-badge number">Lv. {level}</span>
          </div>

          <button
            type="button"
            className={`food-menu-toggle-btn ${showFoodMenu ? 'active' : ''}`}
            onClick={() => {
              setShowFoodMenu(!showFoodMenu)
              soundManager.playClick()
            }}
          >
            <Utensils size={15} />
            <span>Cho ăn 🍎</span>
          </button>
        </div>

        {/* Level XP Bar */}
        <div className="pet-stat-bar-group">
          <div className="pet-stat-labels">
            <span>Tiến hóa ({stage === 'master' ? 'Thần Thú' : stage === 'teen' ? 'Trưởng thành' : 'Thú con'})</span>
            <span className="number">{exp} / {expForNextLevel} XP</span>
          </div>
          <ProgressBar value={exp} max={expForNextLevel} variant="warning" size="sm" />
        </div>

        {/* Hunger & Happiness stats */}
        <div className="pet-vitals-row">
          <div className="vital-item">
            <span className="vital-label">🍗 Độ no:</span>
            <span className="vital-val number">{hunger}%</span>
          </div>
          <div className="vital-item">
            <span className="vital-label">❤️ Độ vui:</span>
            <span className="vital-val number">{happiness}%</span>
          </div>
        </div>

        {/* Food Menu Dropdown */}
        <AnimatePresence>
          {showFoodMenu && (
            <motion.div
              className="pet-food-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span className="food-menu-title">Túi thức ăn toán học của bé:</span>
              <div className="food-items-row">
                {FOOD_TYPES.map((f) => {
                  const qty = inventory[f.id] || 0
                  return (
                    <button
                      key={f.id}
                      className="food-choice-btn"
                      disabled={qty <= 0}
                      onClick={() => handleFeed(f.id)}
                    >
                      <span className="food-emoji">{f.icon}</span>
                      <span className="food-name">{f.name}</span>
                      <span className="food-qty number">x{qty}</span>
                    </button>
                  )
                })}
              </div>
              <span className="food-hint">💡 Làm đúng câu hỏi ở các bài học để nhận thêm thức ăn nhé!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
