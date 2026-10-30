import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Sparkles, Lock } from "lucide-react";
import Button from "../ui/Button";
import GoogleIcon from "../common/GoogleIcon";
import ProgressBar from "../ui/ProgressBar";
import RewardClaimModal from "../modals/RewardClaimModal";
import useProgressStore from "../../store/useProgressStore";
import useAuthStore from "../../store/useAuthStore";
import soundManager from "../../utils/soundManager";
import fireConfetti from "../../utils/confettiHelper";
import { getReward } from "../../services/rewardService";
import "./DailyQuestsCard.css";

export default function DailyQuestsCard() {
  const { isGuest, setAuthModalOpen } = useAuthStore();
  const {
    dailyQuests,
    dailyQuestsClaimed,
    initOrResetDailyQuests,
    claimDailyQuestsReward,
  } = useProgressStore();
  const [showRewardModal, setShowRewardModal] = useState(false);
  const chestReward = getReward("quest.daily_claim") || { coins: 50, xp: 60 };

  useEffect(() => {
    if (!isGuest) {
      initOrResetDailyQuests();
    }
  }, [initOrResetDailyQuests, isGuest]);

  if (isGuest) {
    return (
      <div className="daily-quests-card guest-locked-quests">
        <div className="quests-header">
          <div className="quests-title-box">
            <div className="quests-icon-wrap">📋</div>
            <div>
              <h3>Nhiệm Vụ Mỗi Ngày</h3>
              <p>Rèn luyện thói quen học tập & tích lũy phần thưởng</p>
            </div>
          </div>
          <div className="quests-guest-locked-badge">
            <Lock size={13} />
            <span>Thành viên</span>
          </div>
        </div>

        <div className="guest-quests-preview">
          <div className="guest-quest-row-dimmed">
            <span>📖 Hoàn thành 2 bài học</span>
            <span className="locked-pill">
              <Lock size={11} /> +15 Xu
            </span>
          </div>
          <div className="guest-quest-row-dimmed">
            <span>🏎️ Chơi 1 ván mini game</span>
            <span className="locked-pill">
              <Lock size={11} /> +10 Xu
            </span>
          </div>
          <div className="guest-quest-row-dimmed">
            <span>🐾 Cho thú cưng ăn hoặc chơi</span>
            <span className="locked-pill">
              <Lock size={11} /> +10 Xu
            </span>
          </div>
        </div>

        <div className="guest-quests-cta-box">
          <p>
            💡 Đăng nhập tài khoản để mở khóa{" "}
            <strong>Nhiệm Vụ Hàng Ngày</strong> và mở Rương Quà Tặng (+50 Xu)
            mỗi ngày!
          </p>
          <Button
            variant="primary"
            size="sm"
            className="btn-unlock-quests"
            onClick={() => {
              soundManager.playClick();
              setAuthModalOpen(true);
            }}
          >
            <GoogleIcon size={16} />
            <span>Đăng nhập Google để kích hoạt</span>
          </Button>
        </div>
      </div>
    );
  }

  const completedCount = (dailyQuests || []).filter((q) => q.done).length;
  const totalCount = (dailyQuests || []).length;
  const allDone = completedCount === totalCount && totalCount > 0;

  const handleClaimChest = () => {
    if (dailyQuestsClaimed || !allDone) return;
    claimDailyQuestsReward();
    soundManager.playFanfare();
    setShowRewardModal(true);
    fireConfetti({ particleCount: 110, spread: 85, origin: { y: 0.55 } });
  };

  return (
    <div className="daily-quests-card">
      <div className="quests-header">
        <div className="quests-title-box">
          <div className="quests-icon-wrap">📋</div>
          <div>
            <h3>Nhiệm Vụ Mỗi Ngày</h3>
            <p>Hoàn thành để nhận Xu và XP mỗi ngày</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quests-progress-strip">
        <div className="quests-progress-labels">
          <span>Tiến độ nhiệm vụ</span>
          <span className="number">
            {completedCount} / {totalCount} xong
          </span>
        </div>
        <ProgressBar
          value={completedCount}
          max={totalCount}
          variant="warning"
          size="sm"
        />
      </div>

      {/* Quests List */}
      <div className="quests-list">
        {(dailyQuests || []).map((quest) => (
          <div
            key={quest.id}
            className={`quest-item-row ${quest.done ? "is-done" : ""}`}
          >
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
              <span className="quest-meta-row">
                <span className="quest-count-tag number">
                  {quest.current} / {quest.target}
                </span>
                {!isGuest ? (
                  <span className="quest-reward-pill number">
                    +{quest.reward} Xu &amp; +{quest.reward * 2} XP
                  </span>
                ) : (
                  <span className="quest-reward-pill guest-reward-tag">
                    Luyện tập
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Big Bonus Chest Footer */}
      <div className={`quests-bonus-box ${allDone ? "unlocked" : "locked"}`}>
        <div className="bonus-icon">
          {dailyQuestsClaimed ? "🎁" : allDone ? "✨🎁" : "🔒"}
        </div>
        <div className="bonus-text">
          <strong>
            {isGuest ? "Rương Thưởng Mỗi Ngày" : "Rương Thưởng Ngày"}
          </strong>
          <span>
            {allDone
              ? dailyQuestsClaimed
                ? "Đã nhận thưởng hôm nay!"
                : isGuest
                  ? "Hoàn thành xuất sắc nhiệm vụ hôm nay!"
                  : "Tuyệt vời! Bấm nhận +50 Xu & 60 XP!"
              : "Đủ 3 nhiệm vụ để nhận +50 Xu & 60 XP"}
          </span>
        </div>

        {allDone && !dailyQuestsClaimed ? (
          <Button variant="warning" size="sm" onClick={handleClaimChest}>
            <Sparkles size={14} /> Mở Quà
          </Button>
        ) : dailyQuestsClaimed ? (
          <button
            type="button"
            className="claimed-text-btn"
            onClick={() => {
              soundManager.playClick();
              setShowRewardModal(true);
            }}
            title="Bấm để xem lại phần thưởng"
          >
            Đã nhận ✅
          </button>
        ) : null}
      </div>

      <RewardClaimModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        title="Rương Thưởng Ngày!"
        subtitle="Bé đã hoàn thành xuất sắc cả 3 nhiệm vụ hôm nay!"
        coins={chestReward.coins}
        xp={chestReward.xp}
        chestIcon="🎁"
        mascotMessage="Bé chăm chỉ quá! Rô-bốt và Cú Mèo tặng bé rương quà siêu to này để khích lệ bé học tập mỗi ngày nhé! 🦉✨"
      />
    </div>
  );
}
