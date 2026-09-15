import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import MascotIcon from '../common/MascotIcon'
import GoogleIcon from '../common/GoogleIcon'
import useUserStore from '../../store/useUserStore'
import useProgressStore from '../../store/useProgressStore'
import useAuthStore from '../../store/useAuthStore'
import './Header.css'

export default function Header() {
  const { nickname, coins, level, avatar } = useUserStore()
  const { currentStreak } = useProgressStore()
  const { isGuest, setAuthModalOpen } = useAuthStore()

  return (
    <header className="header">
      <div className="header-inner">
        {/* Mobile Logo (Visible only on mobile & tablet when sidebar is hidden) */}
        <div className="header-mobile-brand">
          <Link
            to="/"
            className="header-logo"
          >
            <span className="header-logo-icon">
              <MascotIcon size={32} />
            </span>
            <span className="header-logo-text">Toán Vui</span>
          </Link>
        </div>

        {/* Desktop Greeting Info */}
        <div className="header-greeting-wrap hide-mobile">
          <span className="header-greeting-sparkle">✨</span>
          <span className="header-greeting-text">
            {isGuest ? (
              <>Chào mừng bạn đến với thế giới <strong>Toán Vui Vẻ</strong>!</>
            ) : (
              <>Chào mừng <strong>{nickname || 'Bé Yêu'}</strong> đến với thế giới Toán Vui!</>
            )}
          </span>
        </div>

        {/* User Stats & Avatar */}
        <div className="header-stats">
          {!isGuest && (
            <>
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
            </>
          )}

          {/* Auth or Profile Link */}
          {isGuest && (
            <button
              className="header-login-btn"
              onClick={() => setAuthModalOpen(true)}
              title="Đăng nhập tài khoản Google"
            >
              <GoogleIcon size={16} />
              <span className="header-login-label">Đăng nhập</span>
            </button>
          )}

          {/* Unified Profile Pill */}
          <Link
            to="/profile"
            className={`header-profile-pill ${isGuest ? 'header-profile-guest' : ''}`}
            title={isGuest ? 'Chế độ Khách (Bấm để xem)' : `Hồ sơ của ${nickname || 'Bé'}`}
          >
            <span className="header-avatar-circle">
              {isGuest ? '👤' : avatar || '👦'}
            </span>
            <span className={`header-profile-name ${!isGuest ? 'hide-mobile' : 'show-guest-mobile'}`}>
              {isGuest ? 'Khách' : nickname || 'Bé Yêu'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

