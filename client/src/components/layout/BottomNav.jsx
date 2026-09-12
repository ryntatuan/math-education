import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Gamepad2, Trophy, User } from 'lucide-react'
import './BottomNav.css'

const navItems = [
  { to: '/', icon: Home, label: 'Trang chủ' },
  { to: '/learn', icon: BookOpen, label: 'Học' },
  { to: '/games', icon: Gamepad2, label: 'Trò chơi' },
  { to: '/challenges', icon: Trophy, label: 'Thử thách' },
  { to: '/profile', icon: User, label: 'Hồ sơ' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="bottom-nav hide-desktop hide-tablet">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to ||
          (to !== '/' && location.pathname.startsWith(to))

        return (
          <Link
            key={to}
            to={to}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-active' : ''}`}
          >
            <div className="bottom-nav-icon-wrap">
              <Icon size={22} />
              {isActive && (
                <motion.div
                  className="bottom-nav-indicator"
                  layoutId="bottom-nav-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <span className="bottom-nav-label">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
