import { useEffect, useState } from "react";
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
import BoosterTimer from "./components/layout/BoosterTimer";
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
import { ngheNoiDung, taiNoiDung } from "./data/contentSource";
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

  // Ask for a fresh content version on every screen change (home → chapter → lesson…).
  //
  // 🔴 WHY THIS EXISTS — measured, not guessed. The app can only know an admin changed
  // content by asking: there is no push channel. It used to ask at exactly two moments
  // (launch, and coming back to the tab), so a lesson an admin pulled stayed on screen
  // while the child sat on one screen — measured: 8 seconds idle, tree unchanged, cache
  // stuck at version 12. Kids tap between screens constantly, so asking on each route
  // change is the cheapest trigger that still catches "idle, then navigate".
  //
  // Cost: one small `app_config` read per screen change, throttled to 5s inside
  // `contentSource`; the ~800 KB tree is fetched only when the version actually changed.
  useEffect(() => {
    taiNoiDung();
  }, [location.pathname]);

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
      <BoosterTimer />
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
  // Số này chỉ để ÉP render lại khi nguồn nội dung vừa đổi — giá trị không dùng tới.
  const [, setPhienNoiDung] = useState(0);

  useEffect(() => {
    soundManager.setSoundEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    setupAutoSync();
    useAuthStore.getState().initAuth();
    // Làm mới bảng phần thưởng từ DB ở nền. Không chặn render — trong lúc
    // chờ, rewardService dùng cache localStorage hoặc giá trị mặc định.
    preloadRewardConfigs();

    // Nội dung bài học — lát 3d. Không chặn render: cache localStorage đã được đọc
    // ĐỒNG BỘ lúc nạp module, nên cây có sẵn ngay từ khung hình đầu tiên; hàm này chỉ
    // tải bản mới hơn ở nền rồi thay vào cho lần ĐỌC KẾ TIẾP (xem ghi chú đầu
    // `contentSource.js` về lý do không đổi nóng giữa phiên).
    taiNoiDung();

    // Nội dung vừa được thay (admin publish xong) ⇒ render lại để TRANG ĐANG MỞ đọc
    // cây mới. `contentSource` tự bỏ qua thông báo này khi đang có bài học mở — xem
    // ghi chú ở đó về lý do (đang học dở mà cây đổi thì bé bị đẩy về slide 1).
    const huyNghe = ngheNoiDung(() => setPhienNoiDung((p) => p + 1));

    // Nạp lại config khi người dùng quay lại tab/app. Nếu không có bước này,
    // một phiên mở lâu sẽ mãi dùng giá trị cũ dù Admin đã đổi —
    // preloadRewardConfigs() chỉ chạy 1 lần khi tải trang.
    //
    // `taiNoiDung()` ở đây là cùng lý do cho NỘI DUNG: nếu chỉ gọi lúc khởi động thì
    // admin publish xong, app đang mở sẽ **không bao giờ** biết (đo được: bé mở app
    // ở trang chương, admin publish, chờ 6s — tiêu đề vẫn cũ). Lần gọi này chỉ đọc
    // `content_version`; tải cả cây chỉ khi số đó ĐÃ ĐỔI.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        refreshRewardConfigs();
        taiNoiDung();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      huyNghe();
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
