import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './GuestFeatureLock.css'

export default function GuestFeatureLock({
  icon = '🔒',
  badgeText = 'TÍNH NĂNG THÀNH VIÊN',
  title = 'Tính Năng Dành Riêng Cho Học Sinh Đăng Ký',
  subtitle = 'Hãy đăng nhập tài khoản để mở khóa đầy đủ nội dung, lưu trữ tiến độ học tập và nhận vô vàn phần thưởng hấp dẫn!',
  benefits = [
    {
      icon: '☁️',
      title: 'Sao Lưu Tiến Độ Vĩnh Viễn',
      desc: 'Bảo vệ thành tích học tập của bé trên mọi thiết bị máy tính, điện thoại, máy tính bảng.',
    },
    {
      icon: '🪙',
      title: 'Tích Lũy Xu & Mở Khóa Cấp Độ',
      desc: 'Nhận xu vàng sau mỗi bài học để đổi nhân vật yêu thích trong cửa hàng phần thưởng.',
    },
    {
      icon: '🎮',
      title: 'Trọn Bộ 6 Mini Game Vui Nhộn',
      desc: 'Vừa học vừa chơi, rèn luyện phản xạ tính nhẩm thần tốc cùng các bạn học.',
    },
    {
      icon: '📖',
      title: 'Kho Truyện Toán Kỳ Thú',
      desc: 'Khám phá thế giới toán học qua những câu chuyện tranh tương tác giàu cảm xúc.',
    },
  ],
  ctaText = 'Đăng Nhập Bằng Google Để Mở Khóa',
}) {
  const navigate = useNavigate()
  const { setAuthModalOpen } = useAuthStore()

  const handleLoginClick = () => {
    soundManager.playClick()
    setAuthModalOpen(true)
  }

  const handleBackHome = () => {
    soundManager.playClick()
    navigate('/')
  }

  return (
    <div className="guest-feature-lock-container">
      {/* Hero Card */}
      <motion.div
        className="feature-lock-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="feature-lock-floating-badge">
          <div className="feature-lock-icon-wrap">
            <span className="feature-main-emoji">{icon}</span>
            <div className="lock-sub-mini-badge">
              <Lock size={16} />
            </div>
          </div>
        </div>

        <div className="feature-tier-pill">
          <Sparkles size={14} />
          <span>{badgeText}</span>
        </div>

        <h1 className="feature-lock-title">{title}</h1>

        <p className="feature-lock-subtitle">{subtitle}</p>

        <div className="feature-lock-actions">
          <Button
            variant="primary"
            size="lg"
            className="feature-cta-login-btn"
            onClick={handleLoginClick}
          >
            <Sparkles size={18} />
            <span>{ctaText}</span>
            <ArrowRight size={18} />
          </Button>

          <Button
            variant="outline"
            size="md"
            className="feature-back-btn"
            onClick={handleBackHome}
          >
            <ArrowLeft size={16} />
            <span>Quay về trang chủ</span>
          </Button>

          <span className="feature-security-note">
            <ShieldCheck size={16} /> Hoàn toàn miễn phí 100% • Không thu bất kỳ khoản phí nào
          </span>
        </div>
      </motion.div>

      {/* Grid 4 Benefits */}
      <div className="feature-benefits-grid">
        {benefits.map((b, idx) => {
          const isObj = typeof b === 'object' && b !== null
          const bIcon = isObj ? b.icon : '✨'
          const bTitle = isObj ? b.title : b
          const bDesc = isObj ? b.desc : null

          return (
            <motion.div
              key={idx}
              className="feature-benefit-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1) }}
            >
              <span className="feature-benefit-icon">{bIcon}</span>
              <div className="feature-benefit-info">
                <h3>{bTitle}</h3>
                {bDesc && <p>{bDesc}</p>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
