import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import BottomNav from "./components/layout/BottomNav";
import AuthModal from "./components/auth/AuthModal";
import DownloadAppModal from "./components/modals/DownloadAppModal";
import HomePage from "./pages/HomePage";
import GradePage, { ChapterPage } from "./pages/GradePage";
import MascotBubble from "./components/mascot/MascotBubble";
import LessonPage from "./pages/LessonPage";
import PracticePage from "./pages/PracticePage";
import GamesPage from "./pages/GamesPage";
import ChallengePage from "./pages/ChallengePage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import ParentDashboard from "./pages/ParentDashboard";
import StoriesPage from "./pages/StoriesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import useUserStore from "./store/useUserStore";
import useAuthStore from "./store/useAuthStore";
import { setupAutoSync } from "./services/syncService";
import {
  preloadRewardConfigs,
  refreshRewardConfigs,
} from "./services/rewardService";
import soundManager from "./utils/soundManager";
import useMobileLifecycle from "./hooks/useMobileLifecycle";
import ScrollToTop from "./components/common/ScrollToTop";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./App.css";

function AppLayout() {
  useMobileLifecycle();
  const location = useLocation();
  const isLessonRoute = location.pathname.startsWith("/lesson/");

  return (
    <div className={`app-container ${isLessonRoute ? "in-lesson-mode" : ""}`}>
      <Sidebar />
      {!isLessonRoute && <Header />}
      <main
        className={`page-wrapper ${isLessonRoute ? "page-wrapper-lesson" : ""}`}
      >
        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<Navigate to="/" replace />} />
            <Route
              path="/learn/:gradeId/:chapterId"
              element={<ChapterPage />}
            />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route
              path="/stories"
              element={<Navigate to="/games?tab=stories" replace />}
            />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/challenges" element={<ChallengePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      {!isLessonRoute && <BottomNav />}
      <AuthModal />
      <DownloadAppModal />
      {!isLessonRoute && (
        <MascotBubble
          text="Chào bạn! Hôm nay mình học toán nhé! 🎓"
          mood="happy"
          position="bottom-right"
        />
      )}
    </div>
  );
}

export default function App() {
  const soundEnabled = useUserStore((state) => state.soundEnabled);

  useEffect(() => {
    soundManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setupAutoSync();
    useAuthStore.getState().initAuth();
    // Làm mới bảng phần thưởng từ DB ở nền. Không chặn render — trong lúc
    // chờ, rewardService dùng cache localStorage hoặc giá trị mặc định.
    preloadRewardConfigs();

    // Nạp lại config khi người dùng quay lại tab/app. Nếu không có bước này,
    // một phiên mở lâu sẽ mãi dùng giá trị cũ dù Admin đã đổi —
    // preloadRewardConfigs() chỉ chạy 1 lần khi tải trang.
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshRewardConfigs();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ErrorBoundary>
        <AppLayout />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
