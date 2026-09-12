import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'
import HomePage from './pages/HomePage'
import GradePage, { ChapterPage } from './pages/GradePage'
import LessonPage from './pages/LessonPage'
import PracticePage from './pages/PracticePage'
import GamesPage from './pages/GamesPage'
import ChallengePage from './pages/ChallengePage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'
import ParentDashboard from './pages/ParentDashboard'
import useUserStore from './store/useUserStore'
import soundManager from './utils/soundManager'
import './App.css'

export default function App() {
  const soundEnabled = useUserStore((state) => state.soundEnabled)

  useEffect(() => {
    soundManager.setSoundEnabled(soundEnabled)
  }, [soundEnabled])

  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <Header />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<GradePage />} />
            <Route path="/learn/:gradeId/:chapterId" element={<ChapterPage />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/challenges" element={<ChallengePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/parent" element={<ParentDashboard />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
