import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Gamepad2,
  BookOpen,
  Trophy,
  ArrowRight,
  RotateCcw,
  Play,
  CheckCircle2,
  Flame,
  Star,
  Download,
  Smartphone
} from 'lucide-react'
import MascotBubble from '../components/mascot/MascotBubble'
import PetWidget from '../components/pet/PetWidget'
import DailyQuestsCard from '../components/quests/DailyQuestsCard'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import useLeagueStore, { LEAGUE_TIERS } from '../store/useLeagueStore'
import useDownloadModalStore from '../store/useDownloadModalStore'
import { Capacitor } from '@capacitor/core'
import { detectDeviceOS, isIOS } from '../utils/deviceHelper'
import curriculum from '../data/curriculum'
import soundManager from '../utils/soundManager'
import './HomePage.css'

// 5 Lớp Học Toàn Diện (Lớp 1 đến Lớp 5)
const ALL_GRADES = [
  { id: 1, name: 'Lớp 1', emoji: '🌱', color: '#06b6d4' },
  { id: 2, name: 'Lớp 2', emoji: '🌿', color: '#10b981' },
  { id: 3, name: 'Lớp 3', emoji: '🌸', color: '#f59e0b' },
  { id: 4, name: 'Lớp 4', emoji: '🌲', color: '#ec4899' },
  { id: 5, name: 'Lớp 5', emoji: '🌳', color: '#8b5cf6' }
]

export default function HomePage() {
  const navigate = useNavigate()
  const { grade, setGrade } = useUserStore()
  const { getChapterProgress } = useProgressStore()
  const { currentTier } = useLeagueStore()

  const [semesterFilter, setSemesterFilter] = useState('all') // 'all' | 'sem1' | 'sem2'
  const { openDownloadModal } = useDownloadModalStore()
  const isNative = Capacitor.isNativePlatform()

  const currentGradeInfo = ALL_GRADES.find((g) => g.id === grade) || ALL_GRADES[0]
  const currentTierInfo = LEAGUE_TIERS.find((t) => t.id === currentTier) || LEAGUE_TIERS[0]

  // Dữ liệu chuẩn xác 10 chương từ curriculum.js cho mỗi lớp
  const currentGradeData = curriculum.grades.find((g) => g.id === grade) || curriculum.grades[0]
  const allChaptersForGrade = currentGradeData?.chapters || []

  // Lọc theo Học kỳ (linh hoạt theo số chương của từng lớp)
  const halfPoint = Math.ceil(allChaptersForGrade.length / 2)
  const displayedChapters = allChaptersForGrade.filter((_, idx) => {
    if (semesterFilter === 'sem1') return idx < halfPoint
    if (semesterFilter === 'sem2') return idx >= halfPoint
    return true
  })

  const handleSelectGrade = (newGradeId) => {
    setGrade(newGradeId)
    soundManager.playClick()
  }

  const handleChapterClick = (chapter) => {
    soundManager.playClick()
    navigate(`/learn/${grade}/${chapter.id}`)
  }

  return (
    <div className="home-dashboard-container">
      <div className="home-dashboard-2col">

        {/* =========================================================
            CỘT TRÁI (68%): TRỤC HỌC TẬP CHÍNH (Chọn Lớp & 10 Chương)
           ========================================================= */}
        <section className="learning-main-column">

          {/* 1. KHỐI CHỌN LỚP (5 CẤP ĐỘ RÕ RÀNG) */}
          <div className="home-grade-card">
            <div className="home-grade-header">
              <h2>📚 Chọn Lớp Của Bé</h2>
            </div>

            <div className="home-grade-grid">
              {ALL_GRADES.map((g) => {
                const isActive = grade === g.id
                return (
                  <motion.button
                    key={g.id}
                    type="button"
                    className={`home-grade-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectGrade(g.id)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <span className="grade-emoji">{g.emoji}</span>
                    <span className="grade-name">{g.name}</span>
                    {isActive && (
                      <motion.div
                        className="grade-check-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* 2. BỘ LỌC HỌC KỲ CHO 10 CHƯƠNG */}
          <div className="home-semester-bar">
            <div className="home-semester-tabs">
              <button
                type="button"
                className={`sem-pill-btn ${semesterFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSemesterFilter('all')}
              >
                <span className="hide-mobile">⭐ Tất cả ({allChaptersForGrade.length} Chương)</span>
                <span className="hide-desktop hide-tablet">⭐ Tất cả ({allChaptersForGrade.length})</span>
              </button>
              <button
                type="button"
                className={`sem-pill-btn ${semesterFilter === 'sem1' ? 'active' : ''}`}
                onClick={() => setSemesterFilter('sem1')}
              >
                <span className="hide-mobile">🌸 Học kỳ 1 (Chương 1 - 5)</span>
                <span className="hide-desktop hide-tablet">🌸 HK 1 (1 - 5)</span>
              </button>
              <button
                type="button"
                className={`sem-pill-btn ${semesterFilter === 'sem2' ? 'active' : ''}`}
                onClick={() => setSemesterFilter('sem2')}
              >
                <span className="hide-mobile">☀️ Học kỳ 2 (Chương 6 - 10)</span>
                <span className="hide-desktop hide-tablet">☀️ HK 2 (6 - 10)</span>
              </button>
            </div>

            <span className="home-current-grade-tag">
              {currentGradeInfo.emoji} Đang xem: {currentGradeInfo.name}
            </span>
          </div>

          {/* 3. LƯỚI 10 CHƯƠNG HỌC (2 CỘT X 5 HÀNG) */}
          <motion.div
            key={`${grade}-${semesterFilter}`}
            className="home-chapters-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            {displayedChapters.map((chapter, index) => {
              const totalLessons = chapter.lessons?.length || chapter.totalLessons || 12
              const progress = getChapterProgress
                ? getChapterProgress(chapter.id, totalLessons)
                : { completed: 0, total: totalLessons, percent: 0 }

              const isCompleted = progress.percent === 100
              const hasStarted = progress.completed > 0

              // Tách số chương và tên chương để hiển thị tối ưu trên mobile & desktop
              const match = chapter.name.match(/^(Chương\s+\d+)[:\s-]*(.+)$/i)
              const chapterTag = match ? match[1] : `Chương ${index + 1}`
              const chapterTitle = match ? match[2] : chapter.name
              const fullTitle = `${chapterTag}: ${chapterTitle}`

              return (
                <motion.div
                  key={`${grade}-${chapter.id}`}
                  className="home-chapter-card"
                  onClick={() => handleChapterClick(chapter)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="chapter-card-icon"
                    style={{
                      background: `${chapter.color || '#0284c7'}18`,
                      color: chapter.color || '#0284c7'
                    }}
                  >
                    <span>{chapter.icon || '🔢'}</span>
                  </div>

                  <div className="chapter-card-info">
                    <div className="chapter-card-header">
                      <span
                        className="chapter-tag-badge"
                        style={{
                          color: chapter.color || '#0284c7',
                          backgroundColor: `${chapter.color || '#0284c7'}15`,
                          borderColor: `${chapter.color || '#0284c7'}30`,
                        }}
                      >
                        {chapterTag}
                      </span>
                      <div
                        className={`chapter-stars-badge ${progress.earnedStars > 0
                          ? progress.earnedStars === progress.maxStars
                            ? 'perfect'
                            : 'active'
                          : 'empty'
                          }`}
                        title={`Đã tích lũy ${progress.earnedStars}/${progress.maxStars} sao`}
                      >
                        <span className="star-icon">⭐</span>
                        <span className="star-count">{progress.earnedStars}</span>
                        <span className="star-max">/{progress.maxStars}</span>
                      </div>
                    </div>

                    <h3 className="chapter-card-title" title={fullTitle}>
                      {chapterTitle}
                    </h3>

                    <p className="chapter-card-desc" title={chapter.description}>{chapter.description}</p>

                    <div className="chapter-card-footer">
                      <div className="chapter-progress-box">
                        <div className="chapter-progress-track">
                          <div
                            className="chapter-progress-fill"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <span className="chapter-progress-text number">
                          {progress.percent}% ({progress.completed}/{progress.total})
                        </span>
                      </div>

                      {isCompleted ? (
                        <button type="button" className="btn-chapter-pill done">
                          <RotateCcw size={13} />
                          <span>Ôn lại</span>
                        </button>
                      ) : hasStarted ? (
                        <button type="button" className="btn-chapter-pill continue">
                          <span>Học tiếp</span>
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button type="button" className="btn-chapter-pill start">
                          <span>Bắt đầu</span>
                          <Play size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* 4. PHÍM TẮT KHÁM PHÁ (Bottom Quick Launch Ribbon) */}
          <div className="home-quick-ribbon">
            <span className="ribbon-title">🚀 Khám phá thêm cùng Toán Vui:</span>
            <div className="ribbon-chips">
              <motion.button
                type="button"
                className="ribbon-chip-btn btn-chip-games"
                onClick={() => {
                  soundManager.playClick()
                  navigate('/games')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 size={16} />
                <span>6 Mini Game</span>
              </motion.button>

              <motion.button
                type="button"
                className="ribbon-chip-btn btn-chip-stories"
                onClick={() => {
                  soundManager.playClick()
                  navigate('/stories')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen size={16} />
                <span>Truyện Toán</span>
              </motion.button>

              <motion.button
                type="button"
                className="ribbon-chip-btn btn-chip-arena"
                onClick={() => {
                  soundManager.playClick()
                  navigate('/challenges')
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy size={16} />
                <span>Thử Thách</span>
              </motion.button>
            </div>
          </div>

        </section>

        {/* =========================================================
            CỘT PHẢI (32%): STICKY COMPANION GAMIFICATION BAR
           ========================================================= */}
        <aside className="companion-sticky-column">

          {/* 1. THÚ CƯNG MINI (Compact Mode) */}
          <PetWidget compact={true} />

          {/* 2. NHIỆM VỤ MỖI NGÀY CARD */}
          <DailyQuestsCard />

          {/* 3. ĐẤU TRƯỜNG MINI WIDGET */}
          <motion.div
            className="home-arena-mini-card"
            onClick={() => {
              soundManager.playClick()
              navigate('/challenges')
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="arena-mini-icon">
              <span>{currentTierInfo.icon || '🛡️'}</span>
            </div>
            <div className="arena-mini-info">
              <h4>Đấu Trường Giải Đấu</h4>
              <p>{currentTierInfo.name} • Đang thi đua</p>
              <span className="arena-link-text">Bấm xem bảng vàng xếp hạng →</span>
            </div>
          </motion.div>

          {/* 4. TẢI APP MOBILE CARD (Chỉ hiện trên trình duyệt web, tự ẩn trên mobile app) */}
          {!isNative && (
            <motion.div
              className="home-download-app-card"
              onClick={() => {
                soundManager.playClick()
                openDownloadModal()
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="download-card-header">
                <div className="download-card-robot-icon">
                  {isIOS() ? '🍎' : '🤖'}
                </div>
                <div className="download-card-meta">
                  <h4>{isIOS() ? 'Cài App Cho iPhone / iPad' : 'Cài App Toán Vui'}</h4>
                  <span className="download-tag-android">
                    {'Hoàn toàn miễn phí'}
                  </span>
                </div>
              </div>
              <p className="download-card-desc">
                {isIOS()
                  ? 'Cài về Màn hình chính để học toàn màn hình mượt mà không cần cài đặt phức tạp'
                  : 'Học toán mượt mà, cảm ứng tiện lợi trên điện thoại & máy tính bảng'}
              </p>
              <button type="button" className="btn-download-card-cta">
                <Download size={16} />
                <span>{isIOS() ? 'Xem Cách Cài Đặt (5 giây)' : 'Tải App Ngay (5.4 MB)'}</span>
              </button>
            </motion.div>
          )}

        </aside>

      </div>

      {/* Mascot Cú Mèo ở góc dưới màn hình */}
      <MascotBubble
        text="Chào bạn! Hôm nay mình học toán nhé! 🎓"
        mood="happy"
        position="bottom-right"
      />
    </div>
  )
}
