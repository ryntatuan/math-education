import { motion } from 'framer-motion'
import { Trophy, Flame, Gift, Lock, ArrowRight, Sparkles, Star, Users, Award, ShieldCheck } from 'lucide-react'
import Button from '../ui/Button'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './GuestChallengeLock.css'

export default function GuestChallengeLock({ title, subtitle }) {
  const { setAuthModalOpen } = useAuthStore()

  const handleLoginClick = () => {
    soundManager.playClick()
    setAuthModalOpen(true)
  }

  const benefits = [
    {
      icon: '🏆',
      title: 'Thi Đua Bảng Vàng Tuần',
      desc: 'Tranh tài điểm số thời gian thực với các bạn học trên toàn quốc và các đối thủ vui nhộn.',
    },
    {
      icon: '🚀',
      title: '5 Hạng Đấu Thử Thách',
      desc: 'Bứt phá từ Giải Đồng lên Bạc, Vàng, Kim Cương và vinh danh ở Giải Cao Thủ danh giá.',
    },
    {
      icon: '🎯',
      title: '3 Thử Thách Mỗi Ngày',
      desc: 'Rèn luyện các bài toán tư duy đặc biệt, duy trì chuỗi ngày streak học tập bền bỉ.',
    },
    {
      icon: '🎁',
      title: 'Mở Hộp Quà Bí Mật',
      desc: 'Nhận thưởng ngẫu nhiên hàng chục Xu vàng may mắn và điểm kinh nghiệm mỗi ngày.',
    },
  ]

  const sampleRivals = [
    { rank: 1, name: 'Bảo Nam', avatar: '🚀', xp: '185 XP', badge: '🥇' },
    { rank: 2, name: 'Tuệ Lâm', avatar: '🦄', xp: '160 XP', badge: '🥈' },
    { rank: 3, name: 'Khánh Vy', avatar: '🍓', xp: '140 XP', badge: '🥉' },
  ]

  return (
    <div className="guest-challenge-lock-container">
      {/* Hero Header Card */}
      <motion.div
        className="guest-lock-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="lock-floating-badge">
          <div className="trophy-pulse-icon">
            <Trophy size={48} className="trophy-svg" />
            <span className="sparkle-star">✨</span>
          </div>
        </div>

        <div className="league-tiers-preview">
          <span className="tier-tag bronze">🥉 Đồng</span>
          <span className="tier-tag silver">🥈 Bạc</span>
          <span className="tier-tag gold">🥇 Vàng</span>
          <span className="tier-tag diamond">💎 Kim Cương</span>
          <span className="tier-tag master">👑 Cao Thủ</span>
        </div>

        <h1 className="guest-lock-title">
          {title || 'Đăng Nhập Để Tham Gia Đấu Trường & Thử Thách!'}
        </h1>

        <p className="guest-lock-subtitle">
          {subtitle ||
            'Bảng xếp hạng thi đua và Thử thách mỗi ngày là tính năng đặc biệt dành riêng cho thành viên. Hãy đăng nhập tài khoản để tranh tài cùng các bạn học nhé!'}
        </p>

        <div className="guest-lock-action">
          <Button
            variant="primary"
            size="lg"
            className="guest-cta-login-btn"
            onClick={handleLoginClick}
          >
            <Sparkles size={20} />
            <span>Đăng Nhập Để Thi Đua Ngay</span>
            <ArrowRight size={18} />
          </Button>

          <span className="guest-login-note">
            <ShieldCheck size={16} /> Hoàn toàn miễn phí • Lưu giữ thành tích vĩnh viễn
          </span>
        </div>
      </motion.div>

      {/* Grid 4 Benefits */}
      <div className="guest-benefits-grid">
        {benefits.map((b, idx) => (
          <motion.div
            key={idx}
            className="benefit-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (idx + 1) }}
          >
            <span className="benefit-icon">{b.icon}</span>
            <div className="benefit-info">
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blurred Teaser Preview Section */}
      <div className="guest-teaser-wrapper">
        <div className="teaser-overlay-lock">
          <div className="overlay-lock-icon">
            <Lock size={32} />
          </div>
          <h3>Đấu Trường Thi Đua Đang Diễn Ra</h3>
          <p>Hàng ngàn bạn học đang tranh tài tuần này. Đăng nhập để ghi tên mình lên bảng vàng!</p>
          <Button variant="outline" size="sm" onClick={handleLoginClick}>
            Mở Khóa Bảng Đấu
          </Button>
        </div>

        {/* Blurred Content Background */}
        <div className="teaser-blurred-content" aria-hidden="true">
          <div className="teaser-podium">
            <div className="teaser-col rank-2">
              <span className="teaser-avatar">🦄</span>
              <strong>Tuệ Lâm</strong>
              <span>160 XP</span>
              <div className="pedestal p-2">2</div>
            </div>
            <div className="teaser-col rank-1">
              <div className="crown">👑</div>
              <span className="teaser-avatar">🚀</span>
              <strong>Bảo Nam</strong>
              <span>185 XP</span>
              <div className="pedestal p-1">1</div>
            </div>
            <div className="teaser-col rank-3">
              <span className="teaser-avatar">🍓</span>
              <strong>Khánh Vy</strong>
              <span>140 XP</span>
              <div className="pedestal p-3">3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
