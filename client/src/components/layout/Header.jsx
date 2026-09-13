import { Link } from 'react-router-dom'
import { Users, ChevronDown } from 'lucide-react'
import Badge from '../ui/Badge'
import useUserStore from '../../store/useUserStore'
import useProgressStore from '../../store/useProgressStore'
import useAuthStore from '../../store/useAuthStore'
import soundManager from '../../utils/soundManager'
import './Header.css'

export default function Header() {
  const { nickname, coins, level, avatar } = useUserStore()
  const { currentStreak } = useProgressStore()
  const { isGuest, setAuthModalOpen, setSwitcherModalOpen } = useAuthStore()

  return (
    <header className="header">
      <div className="header-inner">
        {/* Mobile Logo (Visible only on mobile & tablet when sidebar is hidden) */}
        <div className="header-mobile-brand">
          <Link
            to="/"
            className="header-logo"
            onClick={() => soundManager.playClick()}
          >
            <span className="header-logo-icon">🦉</span>
            <span className="header-logo-text">Toán Vui</span>
          </Link>
        </div>

        {/* Desktop Greeting Info */}
        <div className="header-greeting-wrap hide-mobile">
          <span className="header-greeting-sparkle">✨</span>
          <span className="header-greeting-text">
            Chào mừng <strong>{nickname || 'Bé yêu'}</strong> đến với thế giới Toán Vui!
          </span>
        </div>

        {/* User Stats & Avatar */}
        <div className="header-stats">
          {currentStreak > 0 && (
            <Badge variant="streak" size="md" icon="🔥" title="Chuỗi ngày học liên tục">
              <span className="hide-mobile">{currentStreak} ngày</span>
              <span className="hide-desktop hide-tablet">{currentStreak}</span>
            </Badge>
          )}

          <Link to="/shop" style={{ textDecoration: 'none' }} title="Cửa hàng phần thưởng">
            <Badge variant="coin" size="md" icon="🪙">
              {coins}
            </Badge>
          </Link>

          <Badge variant="xp" size="md" icon="⚡" title="Cấp độ hiện tại" className="header-level-badge">
            Lv.{level}
          </Badge>

          {/* Auth or Child Switcher */}
          {isGuest ? (
            <button
              className="header-login-btn"
              onClick={() => {
                soundManager.playClick()
                setAuthModalOpen(true)
              }}
              title="Đăng nhập tài khoản để sao lưu đám mây"
            >
              <span className="header-login-icon">🔑</span>
              <span className="hide-mobile">Đăng nhập</span>
            </button>
          ) : (
            <button
              className="header-switch-btn"
              onClick={() => {
                soundManager.playClick()
                setSwitcherModalOpen(true)
              }}
              title="Đổi bé học"
            >
              <Users size={16} />
              <span className="hide-mobile">{nickname}</span>
              <ChevronDown size={14} className="hide-mobile" />
            </button>
          )}

          <Link
            to="/profile"
            className="header-avatar"
            title={`Hồ sơ của ${nickname}`}
            onClick={() => soundManager.playClick()}
          >
            <span>{avatar || '👦'}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

