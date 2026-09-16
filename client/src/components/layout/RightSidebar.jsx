import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Trophy } from 'lucide-react'
import PetWidget from '../pet/PetWidget'
import DailyQuestsCard from '../quests/DailyQuestsCard'
import useLeagueStore, { LEAGUE_TIERS } from '../../store/useLeagueStore'
import useDownloadModalStore from '../../store/useDownloadModalStore'
import { isIOS } from '../../utils/deviceHelper'
import { APP_VERSION } from '../../config/appVersion'
import soundManager from '../../utils/soundManager'
import { Capacitor } from '@capacitor/core'

export default function RightSidebar({ hideArenaSummary = false, hideOnMobile = false }) {
  const navigate = useNavigate()
  const { currentTier } = useLeagueStore()
  const { openModal: openDownloadModal } = useDownloadModalStore()
  
  const currentTierInfo = LEAGUE_TIERS.find(t => t.id === currentTier) || LEAGUE_TIERS[0]
  const isNative = Capacitor.isNativePlatform()

  return (
    <aside className={`companion-sticky-column ${hideOnMobile ? 'hide-on-mobile' : ''}`}>
      {/* 1. THÚ CƯNG MINI (Compact Mode) */}
      <PetWidget compact={true} />

      {/* 2. NHIỆM VỤ MỖI NGÀY CARD */}
      <DailyQuestsCard />

      {/* 3. ĐẤU TRƯỜNG MINI WIDGET (Conditional) */}
      {!hideArenaSummary && (
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
      )}

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
              <h4>{isIOS() ? 'Cài App Cho iPhone / iPad' : `Cài App Toán Vui (v${APP_VERSION})`}</h4>
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
            <span>{isIOS() ? 'Xem Cách Cài Đặt (5 giây)' : `Tải App v${APP_VERSION}`}</span>
          </button>
        </motion.div>
      )}
    </aside>
  )
}
