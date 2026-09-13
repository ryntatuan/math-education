import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, PenTool, Gamepad2, Trophy, ShieldCheck, Volume2, VolumeX, Sparkles, Headphones } from 'lucide-react'
import soundManager from '../../utils/soundManager'
import useUserStore from '../../store/useUserStore'
import './Sidebar.css'

const navItems = [
  { to: '/', label: 'Trang chủ', icon: Home, variant: 'home' },
  { to: '/learn', label: 'Học bài', icon: BookOpen, variant: 'learn' },
  { to: '/practice', label: 'Luyện tập', icon: PenTool, variant: 'practice' },
  { to: '/games', label: 'Trò chơi', icon: Gamepad2, variant: 'games' },
  { to: '/stories', label: 'Truyện toán', icon: Sparkles, variant: 'stories' },
  { to: '/challenges', label: 'Thử thách', icon: Trophy, variant: 'challenges' },
  { to: '/parent', label: 'Phụ huynh', icon: ShieldCheck, variant: 'parent' },
]

export default function Sidebar() {
  const location = useLocation()
  const { soundEnabled, toggleSound, autoSpeakLesson, toggleAutoSpeak } = useUserStore()

  return (
    <aside className="sidebar hide-mobile">
      {/* Brand Logo */}
      <div className="sidebar-brand">
        <Link
          to="/"
          className="sidebar-logo"
          onClick={() => soundManager.playClick()}
        >
          <span className="sidebar-logo-icon">🦉</span>
          <span className="sidebar-logo-text">Toán Vui</span>
        </Link>
      </div>

      {/* Main Navigation Items */}
      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, variant }) => {
          const isActive =
            location.pathname === to || (to !== '/' && location.pathname.startsWith(to))

          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-nav-item sidebar-item-${variant} ${isActive ? 'sidebar-item-active' : ''}`}
              onClick={() => soundManager.playClick()}
            >
              <div className="sidebar-item-icon-wrap">
                <Icon size={24} strokeWidth={2.4} />
              </div>
              <span className="sidebar-item-label">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="sidebar-footer">
        <div className="sidebar-audio-controls">
          <button
            type="button"
            className={`sidebar-sound-btn ${soundEnabled ? 'active' : 'muted'}`}
            onClick={() => {
              toggleSound()
              soundManager.playClick()
            }}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            <span>{soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}</span>
          </button>

          <button
            type="button"
            className={`sidebar-sound-btn sidebar-autospeak-btn ${autoSpeakLesson ? 'active' : ''}`}
            onClick={() => {
              toggleAutoSpeak()
              soundManager.playClick()
            }}
            title={autoSpeakLesson ? 'Tắt tự động đọc khi vào bài học' : 'Bật tự động đọc khi vào bài học'}
          >
            <Headphones size={18} />
            <span>{autoSpeakLesson ? 'Tự đọc bài: Bật' : 'Tự đọc bài: Tắt'}</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
