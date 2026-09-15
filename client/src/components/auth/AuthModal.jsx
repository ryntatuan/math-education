import { motion, AnimatePresence } from 'framer-motion'
import { X, Cloud, Smartphone, Gamepad2, Sparkles } from 'lucide-react'
import MascotIcon from '../common/MascotIcon'
import GoogleIcon from '../common/GoogleIcon'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './AuthModal.css'

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, signInWithGoogle, loading } = useAuthStore()

  if (!isAuthModalOpen) return null

  const handleClose = () => {
    soundManager.playClick()
    setAuthModalOpen(false)
  }

  const handleGoogleLogin = () => {
    soundManager.playClick()
    signInWithGoogle()
  }

  return (
    <AnimatePresence>
      <div className="auth-modal-overlay" onClick={handleClose}>
        <motion.div
          className="auth-modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button className="auth-modal-close" onClick={handleClose} aria-label="Đóng">
            <X size={20} />
          </button>

          {/* Header */}
          <div className="auth-modal-header">
            <div className="auth-mascot-badge">
              <MascotIcon size={32} />
              <span>✨</span>
            </div>
            <h2>Đăng Nhập Tài Khoản</h2>
            <p className="auth-modal-subtitle">
              Lưu trữ đám mây an toàn & đồng bộ tiến độ học tập cho bé
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="auth-benefits-list">
            <div className="auth-benefit-item">
              <div className="benefit-icon-box bg-blue">
                <Cloud size={20} />
              </div>
              <div className="benefit-text">
                <strong>Lưu trữ tiến độ vĩnh viễn</strong>
                <span>Không lo mất sao, xu hay cấp độ khi đổi máy tính/điện thoại</span>
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="benefit-icon-box bg-green">
                <Smartphone size={20} />
              </div>
              <div className="benefit-text">
                <strong>Đồng bộ đa thiết bị</strong>
                <span>Học trên máy tính bảng ở trường, về nhà học tiếp trên điện thoại</span>
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="benefit-icon-box bg-purple">
                <Gamepad2 size={20} />
              </div>
              <div className="benefit-text">
                <strong>Mở khóa toàn bộ trò chơi & đấu trường</strong>
                <span>Đua xe toán học, bắn bóng bay, tranh tài bảng xếp hạng tuần</span>
              </div>
            </div>

            <div className="auth-benefit-item bonus-highlight">
              <div className="benefit-icon-box bg-yellow">
                <Sparkles size={20} />
              </div>
              <div className="benefit-text">
                <strong>Tự động giữ nguyên tiến độ cũ</strong>
                <span>Toàn bộ kết quả bài học hiện tại sẽ được chuyển thẳng lên đám mây!</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="auth-modal-actions">
            <button
              className="google-signin-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <GoogleIcon size={22} />
              <span>{loading ? 'Đang kết nối...' : 'Tiếp tục với Google (Gmail)'}</span>
            </button>

            <button className="guest-continue-btn" onClick={handleClose}>
              Bé học thử tiếp (không cần đăng nhập)
            </button>
          </div>

          <p className="auth-privacy-note">
            🔒 Chúng tôi tôn trọng quyền riêng tư. Chỉ sử dụng thông tin Gmail để đồng bộ tiến độ học tập của các bé.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
