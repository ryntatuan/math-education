import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, PenTool, Gamepad2, Trophy, User } from 'lucide-react'
import './BottomNav.css'

const navItems = [
  { to: '/', icon: Home, label: 'Trang chủ' },
  { to: '/learn', icon: BookOpen, label: 'Học' },
  { to: '/practice', icon: PenTool, label: 'Luyện tập' },
  { to: '/games', icon: Gamepad2, label: 'Trò chơi' },
  { to: '/challenges', icon: Trophy, label: 'Thử thách' },
  { to: '/profile', icon: User, label: 'Hồ sơ' },
]

export default function BottomNav() {
  const location = useLocation()

  const handleItemClick = (to) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }

  return (
    <nav className="bottom-nav">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive =
          location.pathname === to ||
          (to !== '/' && location.pathname.startsWith(to)) ||
          (to === '/games' && location.pathname.startsWith('/stories'))

        return (
          <Link
            key={to}
            to={to}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`}
            onClick={() => handleItemClick(to)}
          >
            <div className="bottom-nav-icon-wrap">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="bottom-nav-label">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
