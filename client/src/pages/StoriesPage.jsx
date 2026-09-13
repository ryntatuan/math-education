import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  RotateCcw,
  Coins,
  Star,
} from 'lucide-react'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import MATH_STORIES from '../data/storyData'
import useUserStore from '../store/useUserStore'
import useProgressStore from '../store/useProgressStore'
import soundManager from '../utils/soundManager'
import speechHelper from '../utils/speechHelper'
import confetti from 'canvas-confetti'
import './StoriesPage.css'

export default function StoriesPage() {
  const { addCoins, addXp } = useUserStore()
  const { updateStreak, progressQuest } = useProgressStore()

  const [activeStory, setActiveStory] = useState(null)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Start reading story
  const handleSelectStory = (story) => {
    setActiveStory(story)
    setSceneIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setIsCorrect(false)
    setIsFinished(false)
    soundManager.playClick()
  }

  // Handle question answer
  const handleAnswer = (option, currentScene) => {
    if (isAnswered) return
    setSelectedAnswer(option)
    setIsAnswered(true)

    const correct = option === currentScene.question.answer
    setIsCorrect(correct)

    if (correct) {
      soundManager.playCorrect()
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } })
    } else {
      soundManager.playWrong()
    }
  }

  // Next scene
  const handleNextScene = () => {
    soundManager.playClick()
    speechHelper.stop()
    setIsSpeaking(false)

    if (sceneIndex + 1 >= activeStory.scenes.length) {
      // Completed story
      setIsFinished(true)
      addCoins(activeStory.rewardCoins)
      addXp(activeStory.rewardXp)
      updateStreak()
      progressQuest('lesson_1', 1)
      soundManager.playFanfare()
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } })
    } else {
      setSceneIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
    }
  }

  // Read dialogue aloud
  const handleSpeakDialogue = (text) => {
    if (isSpeaking) {
      speechHelper.stop()
      setIsSpeaking(false)
      return
    }
    speechHelper.speak(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    )
  }

  // Active Story Player
  if (activeStory) {
    const scenes = activeStory.scenes
    const currentScene = scenes[sceneIndex]
    const hasQuestion = Boolean(currentScene?.question)
    const canProceed = !hasQuestion || (isAnswered && isCorrect)

    if (isFinished) {
      return (
        <div className="story-player-page">
          <motion.div
            className="story-completion-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="story-finish-icon">🏆</span>
            <h1>Chúc Mừng Bé Đã Hoàn Thành!</h1>
            <p className="story-finish-subtitle">
              Bé đã cùng các bạn muông thú hoàn thành xuất sắc câu chuyện <strong>"{activeStory.title}"</strong>!
            </p>

            <div className="story-reward-badge-box">
              <div className="reward-pill">
                <Coins size={20} className="reward-icon-gold" />
                <span className="number">+{activeStory.rewardCoins} Xu</span>
              </div>
              <div className="reward-pill">
                <Star size={20} className="reward-icon-blue" />
                <span className="number">+{activeStory.rewardXp} XP</span>
              </div>
            </div>

            <div className="finish-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleSelectStory(activeStory)}
              >
                <RotateCcw size={18} /> Đọc lại câu chuyện
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setActiveStory(null)
                  soundManager.playClick()
                }}
              >
                ← Chọn truyện khác
              </Button>
            </div>
          </motion.div>
        </div>
      )
    }

    return (
      <div className="story-player-page">
        {/* Navigation Bar */}
        <div className="story-nav-header">
          <button
            className="story-back-btn"
            onClick={() => {
              speechHelper.stop()
              setActiveStory(null)
              soundManager.playClick()
            }}
          >
            <ArrowLeft size={18} />
            <span>Thoát truyện</span>
          </button>

          <div className="story-progress-wrap">
            <span className="scene-counter number">
              Trang {sceneIndex + 1} / {scenes.length}
            </span>
            <ProgressBar
              value={sceneIndex + 1}
              max={scenes.length}
              variant="gradient"
              size="sm"
            />
          </div>
        </div>

        {/* Scene Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            className="scene-main-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Character & Background Atmosphere */}
            <div className="scene-visual-stage">
              <span className="scene-bg-emoji">{currentScene.background}</span>
              <motion.div
                className="scene-char-avatar"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="char-emoji">{currentScene.character}</span>
                <span className="char-name-tag">{currentScene.characterName}</span>
              </motion.div>
            </div>

            {/* Dialogue Bubble */}
            <div className="scene-dialogue-box">
              <p className="scene-dialogue-text">{currentScene.dialogue}</p>

              <button
                className={`scene-speak-btn ${isSpeaking ? 'is-speaking' : ''}`}
                onClick={() => handleSpeakDialogue(currentScene.dialogue)}
                title="Nghe kể chuyện bằng giọng nói"
              >
                <Volume2 size={20} />
                <span>{isSpeaking ? 'Đang đọc...' : 'Nghe đọc'}</span>
              </button>
            </div>

            {/* Math Puzzle (if present) */}
            {hasQuestion && (
              <div className="scene-question-box">
                <h3 className="scene-question-prompt">
                  🤔 {currentScene.question.prompt}
                </h3>

                <div className="scene-options-grid">
                  {currentScene.question.options.map((option, idx) => {
                    let optCls = 'scene-opt-btn'
                    if (isAnswered) {
                      if (option === currentScene.question.answer) optCls += ' is-correct'
                      else if (option === selectedAnswer) optCls += ' is-wrong'
                    }

                    return (
                      <button
                        key={idx}
                        className={optCls}
                        onClick={() => handleAnswer(option, currentScene)}
                        disabled={isAnswered}
                      >
                        <span className="number">{option}</span>
                        {isAnswered && option === currentScene.question.answer && (
                          <CheckCircle2 size={22} className="feedback-badge green" />
                        )}
                        {isAnswered && option === selectedAnswer && option !== currentScene.question.answer && (
                          <XCircle size={22} className="feedback-badge red" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Puzzle Feedback */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      className={`puzzle-feedback-banner ${isCorrect ? 'correct' : 'wrong'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {isCorrect ? (
                        <span>{currentScene.question.successMessage}</span>
                      ) : (
                        <span>💡 Gợi ý: {currentScene.question.hint} (Hãy bấm lại đáp án đúng nhé!)</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="scene-footer-actions">
              {sceneIndex > 0 ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    speechHelper.stop()
                    setIsSpeaking(false)
                    setSceneIndex((prev) => prev - 1)
                    setSelectedAnswer(null)
                    setIsAnswered(false)
                  }}
                >
                  <ArrowLeft size={18} /> Trang trước
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant={canProceed ? 'primary' : 'disabled'}
                size="lg"
                onClick={handleNextScene}
                disabled={!canProceed}
                glow={canProceed}
              >
                <span>{sceneIndex + 1 === scenes.length ? '🎉 Kết Thúc Truyện' : 'Tiếp theo'}</span>
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // Storybook Catalog Screen
  return (
    <div className="stories-catalog-page">
      <div className="stories-header">
        <div className="stories-title-wrap">
          <h1>📖 Xứ Sở Truyện Tranh Toán Học</h1>
          <p>
            Khám phá các chuyến phiêu lưu kỳ thú, giải đố tương tác và nhận vô vàn xu vàng cùng các bạn thú đáng yêu!
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="stories-grid">
        {MATH_STORIES.map((story) => (
          <motion.div
            key={story.id}
            className="story-card"
            style={{ '--story-cover': story.coverGradient }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectStory(story)}
          >
            <div className="story-cover-banner">
              <span className="story-hero-emoji">{story.icon}</span>
              <span className="story-grade-tag">{story.ageRange}</span>
            </div>

            <div className="story-body">
              <span className="story-topic-pill">{story.topic}</span>
              <h2 className="story-title">{story.title}</h2>
              <p className="story-description">{story.description}</p>

              <div className="story-meta-row">
                <div className="story-reward-wrap">
                  <span className="reward-tag number">🪙 +{story.rewardCoins} Xu</span>
                  <span className="reward-tag number">⭐ +{story.rewardXp} XP</span>
                </div>

                <Button variant="primary" size="sm">
                  Đọc Truyện →
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
