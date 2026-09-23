import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import "./BoosterTimer.css";

export default function BoosterTimer() {
  const activeBoosters = useUserStore((state) => state.activeBoosters || []);
  const cleanupBoosters = useUserStore((state) => state.cleanupBoosters);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeBooster, setActiveBooster] = useState(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const aliveBoosters = activeBoosters.filter(
        (b) => b.type === "XP" && b.expiresAt > now,
      );

      if (aliveBoosters.length < activeBoosters.length) {
        cleanupBoosters();
      }

      if (aliveBoosters.length === 0) {
        setActiveBooster(null);
        setTimeLeft(0);
        return;
      }

      // Lấy bùa có hệ số cao nhất
      const highestMultiplier = Math.max(
        ...aliveBoosters.map((b) => b.multiplier),
      );
      const bestBoosters = aliveBoosters.filter(
        (b) => b.multiplier === highestMultiplier,
      );

      // Nếu có nhiều bùa cùng hệ số cao nhất, lấy cái có thời gian còn lại dài nhất
      const bestBooster = bestBoosters.reduce((prev, current) =>
        prev.expiresAt > current.expiresAt ? prev : current,
      );

      setActiveBooster(bestBooster);
      setTimeLeft(
        Math.max(0, Math.floor((bestBooster.expiresAt - now) / 1000)),
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activeBoosters]);

  if (!activeBooster || timeLeft <= 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="booster-timer">
      <div className="booster-timer-icon">🚀</div>
      <div className="booster-timer-content">
        <span className="booster-timer-title">
          Nhân {activeBooster.multiplier} XP
        </span>
        <span className="booster-timer-time">{timeString}</span>
      </div>
    </div>
  );
}
