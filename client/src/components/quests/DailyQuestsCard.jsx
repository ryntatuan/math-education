import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Gift, Sparkles, Flame, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import useProgressStore from '../../store/useProgressStore'
import useUserStore from '../../store/useUserStore'
import soundManager from '../../utils/soundManager'
import confetti from 'canvas-confetti'
import './DailyQuestsCard.css'

export default function DailyQuestsCard() {
  const {
    currentStreak,
    dailyQuests,
    dailyQuestsClaimed,
    initOrResetDailyQuests,
    claimDailyQuestsBonus,
  } = useProgressStore()

  const { addCoins, addXp } = useUserStore()

  useEffect(() => {
    initOrResetDailyQuests()
  }, [initOrResetDailyQuests])

  const completedCount = (dailyQuests || []).filter((q) => q.done).length
  const totalCount = (dailyQuests || []).length
  const allDone = completedCount === totalCount && totalCount > 0

  const handleClaimChest = () => {
    if (dailyQuestsClaimed || !allDone) return
    claimDailyQuestsBonus()
    addCoins(50)
    addXp(60)
    soundManager.playFanfare()
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } })
  }

  return (
    <div className="daily-quests-card">
      <div className="quests-header">
        <div className="quests-title-box">
          <div className="quests-icon-wrap">📋</div>
          <div>
            <h3>Nhiệm Vụ Mỗi Ngày</h3>
            <p>Học 1 bài hoặc chơi 1 game bất kỳ để giữ chuỗi ngày học 🔥</p>
          </div>
        </div>

        <div className="quests-streak-badge">
          <Flame size={20} className="streak-fire-icon" />
          <span className="streak-val number">{currentStreak} Ngày</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quests-progress-strip">
        <div className="quests-progress-labels">
          <span>Tiến độ nhiệm vụ</span>
          <span className="number">{completedCount} / {totalCount} xong</span>
        </div>
        <ProgressBar value={completedCount} max={totalCount} variant="warning" size="sm" />
      </div>

      {/* Quests List */}
      <div className="quests-list">
        {(dailyQuests || []).map((quest) => (
          <div key={quest.id} className={`quest-item-row ${quest.done ? 'is-done' : ''}`}>
            <div className="quest-status-icon">
              {quest.done ? (
                <CheckCircle2 size={22} className="check-icon-green" />
              ) : (
                <Circle size={22} className="circle-icon-gray" />
              )}
            </div>

            <div className="quest-info-text">
              <span className="quest-title">
                {quest.icon} {quest.title}
              </span>
              <span className="quest-count-tag number">
                {quest.current} / {quest.target}
              </span>
            </div>

            <span className="quest-reward-pill number">+{quest.reward} Xu</span>
          </div>
        ))}
      </div>

      {/* Big Bonus Chest Footer */}
      <div className={`quests-bonus-box ${allDone ? 'unlocked' : 'locked'}`}>
        <div className="bonus-icon">
          {dailyQuestsClaimed ? '🎁' : allDone ? '✨🎁' : '🔒'}
        </div>
        <div className="bonus-text">
          <strong>Rương Thưởng Hoàn Thành Ngày (+50 Xu)</strong>
          <span>{allDone ? (dailyQuestsClaimed ? 'Đã nhận thưởng hôm nay!' : 'Tuyệt vời! Bấm nhận thưởng nào!') : 'Hoàn thành đủ 3 nhiệm vụ để mở rương!'}</span>
        </div>

        {allDone && !dailyQuestsClaimed ? (
          <Button variant="warning" size="sm" onClick={handleClaimChest}>
            <Sparkles size={14} /> Mở Quà
          </Button>
        ) : dailyQuestsClaimed ? (
          <span className="claimed-text">Đã nhận ✅</span>
        ) : null}
      </div>
    </div>
  )
}
