import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import useLeagueStore, {
  LEAGUE_TIERS,
  getLeagueRules,
  LEAGUE_STATUS_MESSAGES,
} from "../store/useLeagueStore";
import useUserStore from "../store/useUserStore";
import useAuthStore from "../store/useAuthStore";
import GuestChallengeLock from "../components/auth/GuestChallengeLock";
import "./LeaderboardPage.css";

export default function LeaderboardPage() {
  const { nickname, avatar } = useUserStore();
  const { activeChild, isGuest } = useAuthStore();
  const {
    currentTier,
    weekEndDate,
    checkWeekReset,
    getStandings,
    fetchCloudLeaderboard,
    _isLoadingCloud,
    lastPromotionStatus,
    dismissStatus,
  } = useLeagueStore();

  // Luật thăng/rớt lấy từ store getLeagueRules() — dùng CHUNG với ChallengePage,
  // khớp checkWeekReset(): vòng Vô Địch thăng top 5 / rớt từ hạng 6, Chung kết
  // không rớt (top 3 đoạt cúp), Cao Thủ chỉ thăng ở tuần chọn lọc.
  const {
    isTournament,
    isFinal,
    isBronze,
    canPromote,
    promoLimit,
    relegateStart,
    nextTier: nextTierData,
    standardTiers,
    tournamentTiers,
  } = getLeagueRules(currentTier);

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    checkWeekReset(nickname, avatar);
    fetchCloudLeaderboard();

    const updateTimer = () => {
      const end = new Date(weekEndDate).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Đang kết toán giải đấu...");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft(`${days} ngày ${hours} giờ ${minutes} phút`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [weekEndDate, checkWeekReset, nickname, avatar, fetchCloudLeaderboard]);

  const standings = getStandings(nickname, avatar, activeChild?.id);
  const currentTierData =
    LEAGUE_TIERS.find((t) => t.id === currentTier) || LEAGUE_TIERS[0];
  const currentTierIdx = LEAGUE_TIERS.findIndex((t) => t.id === currentTier);

  const top3 = standings.slice(0, 3);

  // Khách chưa đăng nhập: Yêu cầu đăng nhập để xem và thi đua bảng xếp hạng
  if (isGuest) {
    return (
      <div className="leaderboard-page">
        <GuestChallengeLock
          title="Đăng Nhập Để Tranh Tài Trên Bảng Xếp Hạng!"
          subtitle="Bảng Đấu Trường tuần với 5 giải đấu Đồng, Bạc, Vàng, Kim Cương, Cao Thủ chỉ dành riêng cho các thành viên. Hãy đăng nhập tài khoản để cùng thi đua với các bạn nhé!"
        />
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      {/* Promotion Status Alert if recent */}
      <AnimatePresence>
        {lastPromotionStatus && (
          <motion.div
            className={`league-status-banner ${lastPromotionStatus}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="status-text">
              {lastPromotionStatus === "promoted" ? (
                <>
                  🎉 <strong>Chúc mừng!</strong> Bé đã xuất sắc thăng hạng lên{" "}
                  <strong>{currentTierData.name}</strong>!
                </>
              ) : lastPromotionStatus === "relegated" ? (
                <>
                  💪 <strong>Cố lên nào!</strong> Bé đã chuyển sang{" "}
                  <strong>{currentTierData.name}</strong>. Hãy bứt phá tuần này
                  nhé!
                </>
              ) : LEAGUE_STATUS_MESSAGES[lastPromotionStatus] ? (
                <>
                  🏆 <strong>Tuyệt vời!</strong>{" "}
                  {LEAGUE_STATUS_MESSAGES[lastPromotionStatus]} Bé trở về thi
                  đấu ở <strong>Giải Cao Thủ</strong> nhé!
                </>
              ) : (
                <>
                  🛡️ <strong>Trụ hạng thành công!</strong> Bé tiếp tục thi đấu ở{" "}
                  <strong>{currentTierData.name}</strong>.
                </>
              )}
            </div>
            <button className="dismiss-btn" onClick={dismissStatus}>
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & League Tier Banner */}
      <div
        className="league-hero-card"
        style={{ "--tier-color": currentTierData.color }}
      >
        <div className="tier-info-header">
          <div className="tier-badge-main">
            <span className="tier-icon">{currentTierData.icon}</span>
            <div>
              <span className="tier-subtitle">Bảng Đấu Tuần Này</span>
              <h1 className="tier-name">{currentTierData.name}</h1>
            </div>
          </div>

          <div className="timer-pill">
            <Clock size={16} />
            <span>
              Còn lại: <strong>{timeLeft}</strong>
            </span>
          </div>
        </div>

        {/* League Tiers Road Map */}
        <div className="tiers-roadmap">
          {(isTournament ? tournamentTiers : standardTiers).map((tier, idx) => {
            const isCurrent = tier.id === currentTier;
            const baseIdx = isTournament ? idx + standardTiers.length : idx;
            const isUnlocked = baseIdx <= currentTierIdx;
            return (
              <div
                key={tier.id}
                className={`tier-step ${isCurrent ? "is-current" : ""} ${isUnlocked ? "is-unlocked" : ""}`}
              >
                <div className="step-circle">
                  <span>{tier.icon}</span>
                </div>
                <span className="step-label">{tier.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 3 Podium */}
      {top3.length >= 3 && (
        <div className="podium-container">
          {/* Rank 2 (Left) */}
          <div className="podium-column rank-2">
            <div className="podium-player">
              <span className="podium-avatar">{top3[1].avatar}</span>
              <strong className="podium-name">{top3[1].name}</strong>
              <span className="podium-xp number">{top3[1].weeklyXp} XP</span>
            </div>
            <div className="podium-pedestal pedestal-2">
              <span className="pedestal-rank number">2</span>
            </div>
          </div>

          {/* Rank 1 (Center) */}
          <div className="podium-column rank-1">
            <div className="crown-badge">👑</div>
            <div className="podium-player">
              <span className="podium-avatar golden-glow">
                {top3[0].avatar}
              </span>
              <strong className="podium-name">{top3[0].name}</strong>
              <span className="podium-xp number">{top3[0].weeklyXp} XP</span>
            </div>
            <div className="podium-pedestal pedestal-1">
              <span className="pedestal-rank number">1</span>
            </div>
          </div>

          {/* Rank 3 (Right) */}
          <div className="podium-column rank-3">
            <div className="podium-player">
              <span className="podium-avatar">{top3[2].avatar}</span>
              <strong className="podium-name">{top3[2].name}</strong>
              <span className="podium-xp number">{top3[2].weeklyXp} XP</span>
            </div>
            <div className="podium-pedestal pedestal-3">
              <span className="pedestal-rank number">3</span>
            </div>
          </div>
        </div>
      )}

      {/* Full Standings List */}
      <div className="standings-box">
        <div className="standings-legend">
          {isFinal ? (
            <div className="legend-item promo">
              <span className="text-yellow">🏆</span>
              <span>Hạng 1 - 3: Đoạt Cúp Vô Địch</span>
            </div>
          ) : canPromote ? (
            <div className="legend-item promo">
              <ArrowUpCircle size={16} className="text-emerald" />
              <span>
                Hạng 1 - {promoLimit}: Thăng hạng{" "}
                {nextTierData ? nextTierData.name : ""} 🟢
              </span>
            </div>
          ) : (
            <div className="legend-item">
              <span>🟡</span>
              <span>
                Tuần này Cao Thủ không xét thăng hạng — tích XP chờ Tuần Chọn
                Lọc
              </span>
            </div>
          )}
          {!isBronze && !isFinal && (
            <div className="legend-item relegate">
              <ArrowDownCircle size={16} className="text-rose" />
              <span>
                Hạng {relegateStart} - 10:{" "}
                {isTournament ? "Rớt về Cao Thủ" : "Rớt hạng"} 🔴
              </span>
            </div>
          )}
        </div>

        <div className="standings-list">
          {standings.map((player) => {
            const isPromotion =
              canPromote &&
              player.rank <= promoLimit &&
              (!isFinal || player.rank <= 3);
            const isRelegation =
              !isBronze && !isFinal && player.rank >= relegateStart;

            let rowCls = "standing-row";
            if (player.isUser) rowCls += " is-user-row";
            if (isPromotion) rowCls += " zone-promotion";
            if (isRelegation) rowCls += " zone-relegation";

            return (
              <div key={player.id} className={rowCls}>
                <div className="rank-badge-wrap">
                  <span className={`rank-number number rank-${player.rank}`}>
                    {player.rank === 1
                      ? "🥇"
                      : player.rank === 2
                        ? "🥈"
                        : player.rank === 3
                          ? "🥉"
                          : player.rank}
                  </span>
                </div>

                <div className="player-avatar-wrap">
                  <span className="player-avatar">{player.avatar}</span>
                </div>

                <div className="player-info-wrap">
                  <span className="player-name">
                    {player.name}
                    {player.isUser ? (
                      <span className="you-tag">Bạn</span>
                    ) : !player.isBot ? (
                      <span className="real-user-tag">✨ Bạn học</span>
                    ) : null}
                  </span>
                  <span className="zone-subtag">
                    {isPromotion
                      ? "Vùng Thăng Hạng 🟢"
                      : isRelegation
                        ? "Vùng Nguy Hiểm 🔴"
                        : "Vùng An Toàn ⚪"}
                  </span>
                </div>

                <div className="player-xp-wrap">
                  <span className="xp-value number">{player.weeklyXp}</span>
                  <span className="xp-unit">XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
