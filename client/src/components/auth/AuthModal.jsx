import { motion, AnimatePresence } from 'framer-motion'
import { X, Cloud, Smartphone, Users, Sparkles, LogIn } from 'lucide-react'
import MascotIcon from '../common/MascotIcon'
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
                <span>Học trên máy tính bảng ở trường, về nhà học tiếp trên máy tính</span>
              </div>
            </div>

            <div className="auth-benefit-item">
              <div className="benefit-icon-box bg-purple">
                <Users size={20} />
              </div>
              <div className="benefit-text">
                <strong>Quản lý nhiều bé</strong>
                <span>Một tài khoản phụ huynh tạo riêng hồ sơ cho từng con (Lớp 1 - 5)</span>
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
              <svg className="google-icon" viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Tiếp tục với Google (Gmail)</span>
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
