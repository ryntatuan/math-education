import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'
import AuthModal from './components/auth/AuthModal'
import HomePage from './pages/HomePage'
import GradePage, { ChapterPage } from './pages/GradePage'
import LessonPage from './pages/LessonPage'
import PracticePage from './pages/PracticePage'
import GamesPage from './pages/GamesPage'
import ChallengePage from './pages/ChallengePage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import ParentDashboard from './pages/ParentDashboard'
import StoriesPage from './pages/StoriesPage'
import LeaderboardPage from './pages/LeaderboardPage'
import useUserStore from './store/useUserStore'
import useAuthStore from './store/useAuthStore'
import { setupAutoSync } from './services/syncService'
import soundManager from './utils/soundManager'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const isLessonRoute = location.pathname.startsWith('/lesson/')

  return (
    <div className={`app-container ${isLessonRoute ? 'in-lesson-mode' : ''}`}>
      <Sidebar />
      {!isLessonRoute && <Header />}
      <main className={`page-wrapper ${isLessonRoute ? 'page-wrapper-lesson' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<GradePage />} />
          <Route path="/learn/:gradeId/:chapterId" element={<ChapterPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/challenges" element={<ChallengePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/parent" element={<ParentDashboard />} />
        </Routes>
      </main>
      {!isLessonRoute && <BottomNav />}
      <AuthModal />
    </div>
  )
}

export default function App() {
  const soundEnabled = useUserStore((state) => state.soundEnabled)

  useEffect(() => {
    soundManager.setSoundEnabled(soundEnabled)
  }, [soundEnabled])

  useEffect(() => {
    setupAutoSync()
    useAuthStore.getState().initAuth()
  }, [])

  return (

    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

